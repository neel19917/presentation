'use strict';
// Tracked share links: a short code that opens the deck at a chosen place (version, screen, gating), optionally behind a
// password, and records who opened it and what they looked at. Stored at DATA_DIR/links/<code>.json:
//   { code, name, recipient, note, createdAt, createdBy, disabled, expiresAt,
//     params: { v, go, tabs, hide, lock, c },          → appended to the deck URL
//     passwordHash, salt,                                → optional gate (scrypt)
//     sessions: [ { sid, startedAt, lastSeen, ua, ip, screens: [{ t, go }], plays, seconds } ] }
// Flow: GET /l/<code> → (gate page if password) → 302 /deck?…&t=<code>&k=<session key>. The deck posts events to
// /api/t/<code>/event with that key; the key is minted here so a stale or forged one is simply rejected.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const store = require('./store');
const DIR = path.join(store.DIR, 'links');
fs.mkdirSync(DIR, { recursive: true });
const CODE_RE = /^[a-z0-9]{5,12}$/;
const now = () => new Date().toISOString();
const file = code => path.join(DIR, code + '.json');
const writeAtomic = (f, obj) => { const tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(obj, null, 2)); fs.renameSync(tmp, f); };
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'; // no 0/o/1/l/i — codes get read out loud
function newCode(len = 6) { const b = crypto.randomBytes(len); let s = ''; for (let i = 0; i < len; i++) s += ALPHABET[b[i] % ALPHABET.length]; return s; }
function hash(pw, salt) { return crypto.scryptSync(String(pw), salt, 32).toString('hex'); }

function read(code) { code = String(code || '').toLowerCase(); if (!CODE_RE.test(code)) return null; try { return JSON.parse(fs.readFileSync(file(code), 'utf8')); } catch { return null; } }
function save(doc) { writeAtomic(file(doc.code), doc); return doc; }
function remove(code) { code = String(code || '').toLowerCase(); if (!CODE_RE.test(code)) return false; try { fs.unlinkSync(file(code)); return true; } catch { return false; } }

const PARAM_KEYS = ['v', 'go', 'tabs', 'hide', 'lock', 'c'];
function cleanParams(p) { const out = {}; if (!p || typeof p !== 'object') return out; for (const k of PARAM_KEYS) if (p[k] !== undefined && p[k] !== null && String(p[k]) !== '' && String(p[k]) !== 'false') out[k] = k === 'lock' ? '1' : String(p[k]).slice(0, 300); return out; }
function create(body, by) {
  let code = String(body.code || '').toLowerCase(); if (!CODE_RE.test(code) || read(code)) { do code = newCode(); while (read(code)); }
  const doc = { code, name: String(body.name || 'Shared deck').slice(0, 120), recipient: String(body.recipient || '').slice(0, 200), note: String(body.note || '').slice(0, 400),
    createdAt: now(), createdBy: by || 'admin', disabled: false, expiresAt: body.expiresAt ? String(body.expiresAt).slice(0, 40) : null,
    params: cleanParams(body.params), sessions: [] };
  if (body.password) { doc.salt = crypto.randomBytes(8).toString('hex'); doc.passwordHash = hash(body.password, doc.salt); }
  return save(doc);
}
function update(code, body) {
  const doc = read(code); if (!doc) return null;
  if (body.name !== undefined) doc.name = String(body.name).slice(0, 120);
  if (body.recipient !== undefined) doc.recipient = String(body.recipient).slice(0, 200);
  if (body.note !== undefined) doc.note = String(body.note).slice(0, 400);
  if (body.disabled !== undefined) doc.disabled = !!body.disabled;
  if (body.expiresAt !== undefined) doc.expiresAt = body.expiresAt ? String(body.expiresAt).slice(0, 40) : null;
  if (body.params !== undefined) doc.params = cleanParams(body.params);
  if (body.password !== undefined) { if (body.password) { doc.salt = crypto.randomBytes(8).toString('hex'); doc.passwordHash = hash(body.password, doc.salt); } else { delete doc.salt; delete doc.passwordHash; } }
  return save(doc);
}
function isExpired(doc) { return !!(doc.expiresAt && Date.parse(doc.expiresAt) < Date.now()); }
function checkPassword(doc, pw) { if (!doc.passwordHash) return true; if (!pw) return false; const a = Buffer.from(hash(pw, doc.salt)), b = Buffer.from(doc.passwordHash); return a.length === b.length && crypto.timingSafeEqual(a, b); }

// ---- sessions & events ----
const MAX_SESSIONS = 500, MAX_SCREENS = 400;
function openSession(doc, meta) {
  const sid = crypto.randomBytes(12).toString('base64url');
  doc.sessions.push({ sid, startedAt: now(), lastSeen: now(), ua: String(meta.ua || '').slice(0, 200), ip: String(meta.ip || '').slice(0, 64), screens: [], plays: 0, seconds: 0 });
  if (doc.sessions.length > MAX_SESSIONS) doc.sessions.splice(0, doc.sessions.length - MAX_SESSIONS);
  save(doc); return sid;
}
function event(doc, sid, ev) {
  const s = doc.sessions.find(x => x.sid === sid); if (!s) return false;
  const t = now(); s.lastSeen = t;
  const type = String(ev.type || '');
  if (type === 'screen') { const go = String(ev.go || '').slice(0, 200); if (!s.screens.length || s.screens[s.screens.length - 1].go !== go) { s.screens.push({ t, go }); if (s.screens.length > MAX_SCREENS) s.screens.shift(); } }
  else if (type === 'play') { s.plays += 1; const go = String(ev.go || '').slice(0, 200); if (go) s.lastPlay = go; }
  else if (type === 'beat') { const sec = Math.min(120, Math.max(0, Number(ev.seconds) || 0)); s.seconds += sec; }
  save(doc); return true;
}
function summary(doc) {
  const ss = doc.sessions || [];
  const seconds = ss.reduce((n, s) => n + (s.seconds || 0), 0), plays = ss.reduce((n, s) => n + (s.plays || 0), 0);
  const screenCounts = {}; for (const s of ss) for (const sc of s.screens) screenCounts[sc.go || '(start)'] = (screenCounts[sc.go || '(start)'] || 0) + 1;
  const top = Object.entries(screenCounts).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([go, n]) => ({ go, n }));
  return { code: doc.code, name: doc.name, recipient: doc.recipient, note: doc.note, createdAt: doc.createdAt, createdBy: doc.createdBy, disabled: !!doc.disabled, expiresAt: doc.expiresAt || null, expired: isExpired(doc), protected: !!doc.passwordHash, params: doc.params,
    views: ss.length, uniqueViewers: new Set(ss.map(s => s.ip + '|' + s.ua)).size, plays, seconds, lastViewed: ss.length ? ss[ss.length - 1].lastSeen : null, topScreens: top };
}
function detail(doc) { return Object.assign(summary(doc), { sessions: (doc.sessions || []).slice().reverse().map(s => ({ sid: s.sid, startedAt: s.startedAt, lastSeen: s.lastSeen, ua: s.ua, ip: s.ip, seconds: s.seconds, plays: s.plays, screens: s.screens, lastPlay: s.lastPlay || null })) }); }
function list() { return fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => read(f.slice(0, -5))).filter(Boolean).map(summary).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))); }

// deck URL for a link: base + its params (readable: / : , stay unencoded) + tracking code / session key
function deckHref(base, doc, extra) { const q = deckQuery(doc, extra); return q ? base + (base.includes('?') ? '&' + q.slice(1) : q) : base; }
function deckQuery(doc, extra) {
  const p = Object.assign({}, doc.params, extra || {}); const parts = [];
  for (const k of Object.keys(p)) if (p[k] !== undefined && p[k] !== '') parts.push(k + '=' + encodeURIComponent(String(p[k])).replace(/%2F/gi, '/').replace(/%3A/gi, ':').replace(/%2C/gi, ','));
  return parts.length ? '?' + parts.join('&') : '';
}

// the gate page (password) — plain HTML, deck styling
function gatePage(doc, opts) {
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const msg = opts.error ? `<p style="color:#FF8A80;font-size:13px;margin:0 0 12px">${esc(opts.error)}</p>` : '';
  const body = opts.unavailable
    ? `<h1>This link isn't available</h1><p>${esc(opts.unavailable)}</p>`
    : `<h1>${esc(doc.name || 'FreightPOP sales deck')}</h1><p>${doc.recipient ? 'Prepared for ' + esc(doc.recipient) + '. ' : ''}Enter the password you were given to open the deck.</p>${msg}
       <form method="post" action="${esc(opts.action)}"><input type="password" name="password" placeholder="Password" autofocus required autocomplete="current-password"><button type="submit">Open the deck →</button></form>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(doc.name || 'FreightPOP')} · FreightPOP</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>html,body{margin:0;min-height:100%;background:#051729;color:#B5CDE0;font:15px/1.5 'DM Sans',system-ui,sans-serif}body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:radial-gradient(700px 700px at 88% 0%,rgba(64,136,207,.34),rgba(64,136,207,.12) 44%,transparent 72%),radial-gradient(560px 560px at 4% 110%,rgba(61,214,181,.12),transparent 65%),#051729}
.card{width:min(440px,92vw);padding:40px 40px 36px;border-radius:16px;border:1px solid rgba(255,255,255,.14);background:rgba(10,37,64,.75);backdrop-filter:blur(12px);box-shadow:0 0 64px rgba(61,214,181,.10)}.eyebrow{font:500 11px/1 'DM Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#3DD6B5;display:flex;align-items:center;gap:10px;margin-bottom:22px}.eyebrow:before{content:"";width:22px;height:1.5px;background:#3DD6B5}
h1{font:400 30px/1.1 'Manrope',sans-serif;letter-spacing:-.02em;color:#fff;margin:0 0 12px}p{margin:0 0 22px;font-weight:300}input{width:100%;box-sizing:border-box;padding:13px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:#fff;font:15px 'DM Sans',sans-serif;outline:none}input:focus{border-color:#3DD6B5;box-shadow:0 0 0 3px rgba(61,214,181,.18)}
button{margin-top:12px;width:100%;padding:13px 16px;border:0;border-radius:8px;background:#3DD6B5;color:#051729;font:500 15px 'DM Sans',sans-serif;cursor:pointer}button:hover{filter:brightness(1.06)}.foot{margin-top:26px;font:11px 'DM Mono',monospace;letter-spacing:.08em;color:#7A96B0}</style></head>
<body><div class="card"><div class="eyebrow">FreightPOP · Private link</div>${body}<div class="foot">www.freightpop.com</div></div></body></html>`;
}
module.exports = { DIR, CODE_RE, read, list, create, update, remove, isExpired, checkPassword, openSession, event, summary, detail, deckQuery, deckHref, gatePage };
