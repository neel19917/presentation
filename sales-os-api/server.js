'use strict';
/**
 * deck-config-api — Sales OS
 * Serves the published deck configuration (public, CORS) and an admin panel to edit it.
 *   GET  /health
 *   GET  /api/config            published config (defaults ⊕ stored), ETag, no-cache
 *   GET  /api/defaults          the deck's built-in defaults
 *   POST /api/login             { password } → { token }
 *   GET  /api/session           (auth) validates a token
 *   PUT  /api/config            (auth) { data, note } → publish new revision
 *   POST /api/config/reset      (auth) { section? } → reset all or one top-level section to defaults
 *   GET  /api/revisions         (auth) list
 *   GET  /api/revisions/:v      (auth) fetch one
 *   POST /api/revisions/:v/restore (auth)
 *   /admin                      static admin panel
 */
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const { merge, clone } = require('./lib/merge');
const store = require('./lib/store');

const PORT = Number(process.env.PORT || 8080);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '*').split(',').map(s => s.trim());
const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
const DEFAULTS = JSON.parse(fs.readFileSync(path.join(__dirname, 'defaults.json'), 'utf8'));
const ADMIN_DIR = path.join(__dirname, 'admin');
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };

if (!ADMIN_PASSWORD) console.warn('[deck-config-api] ADMIN_PASSWORD is not set — admin writes are disabled');
if (!store.readCurrent()) { store.publish(clone(DEFAULTS), { by: 'system', note: 'Seeded from deck defaults' }); console.log('[deck-config-api] seeded config from defaults.json'); }

const sessions = new Map(); // token -> expiry
function newToken() { const t = crypto.randomBytes(24).toString('base64url'); sessions.set(t, Date.now() + SESSION_TTL_MS); return t; }
function authed(req) { const h = req.headers.authorization || ''; const t = h.startsWith('Bearer ') ? h.slice(7) : ''; const exp = sessions.get(t); if (!exp) return false; if (exp < Date.now()) { sessions.delete(t); return false; } sessions.set(t, Date.now() + SESSION_TTL_MS); return true; }
function safeEq(a, b) { const A = Buffer.from(String(a)), B = Buffer.from(String(b)); return A.length === B.length && crypto.timingSafeEqual(A, B); }

function cors(req, res) {
  const origin = req.headers.origin;
  const allow = ALLOWED_ORIGINS.includes('*') ? '*' : (origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]);
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, If-None-Match');
  res.setHeader('Access-Control-Expose-Headers', 'ETag, X-Config-Version');
  if (allow !== '*') res.setHeader('Vary', 'Origin');
}
function send(res, code, body, headers = {}) {
  const isObj = body !== null && typeof body === 'object' && !Buffer.isBuffer(body);
  const payload = isObj ? JSON.stringify(body) : body;
  res.writeHead(code, Object.assign({ 'Content-Type': isObj ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }, headers));
  res.end(payload);
}
function readJson(req, limit = 4 * 1024 * 1024) {
  return new Promise((resolve, reject) => { let size = 0; const chunks = []; req.on('data', c => { size += c.length; if (size > limit) { reject(new Error('payload too large')); req.destroy(); } else chunks.push(c); }); req.on('end', () => { try { resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}); } catch (e) { reject(new Error('invalid JSON')); } }); req.on('error', reject); });
}
function published() { const cur = store.readCurrent(); const data = merge(DEFAULTS, cur ? cur.data : undefined); return { version: cur ? cur.version : 0, updatedAt: cur ? cur.updatedAt : null, updatedBy: cur ? cur.updatedBy : null, note: cur ? cur.note : '', data }; }
function validate(data) {
  const errs = [];
  if (!data || typeof data !== 'object') return ['data must be an object'];
  for (const k of ['settings', 'systems', 'nav', 'labels', 'pages', 'ui', 'controls', 'roadmap', 'onboarding', 'workflows']) if (data[k] === undefined) errs.push(`missing section: ${k}`);
  if (data.systems) for (const s of ['tms', 'wms', 'oms']) { const sys = data.systems[s]; if (!sys || !Array.isArray(sys.modules)) errs.push(`systems.${s}.modules must be an array`); else sys.modules.forEach((m, i) => { if (!m.num || !m.name) errs.push(`systems.${s}.modules[${i}] needs num and name`); }); }
  if (data.ui) for (const [k, v] of Object.entries(data.ui)) if (typeof v !== 'number' || !isFinite(v)) errs.push(`ui.${k} must be a number`);
  if (data.nav && (!Array.isArray(data.nav) || data.nav.some(n => !n.key))) errs.push('nav must be an array of {key,label,enabled}');
  return errs;
}
function serveStatic(res, rel) {
  const file = path.normalize(path.join(ADMIN_DIR, rel)); if (!file.startsWith(ADMIN_DIR)) return send(res, 403, 'forbidden');
  fs.readFile(file, (err, buf) => { if (err) return send(res, 404, 'not found'); res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' }); res.end(buf); });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const p = url.pathname; const m = req.method;
  cors(req, res);
  if (m === 'OPTIONS') return send(res, 204, '');
  try {
    if (p === '/health') return send(res, 200, { ok: true, version: published().version, dataDir: store.DIR });
    if (p === '/' ) { res.writeHead(302, { Location: '/admin/' }); return res.end(); }
    if (p === '/admin' || p === '/admin/') return serveStatic(res, 'index.html');
    if (p.startsWith('/admin/')) return serveStatic(res, p.slice('/admin/'.length));

    if (p === '/api/config' && m === 'GET') {
      const doc = published(); const body = JSON.stringify(doc); const etag = '"' + crypto.createHash('sha1').update(body).digest('hex').slice(0, 16) + '"';
      if (req.headers['if-none-match'] === etag) return send(res, 304, '', { ETag: etag });
      return send(res, 200, body, { 'Content-Type': 'application/json; charset=utf-8', ETag: etag, 'X-Config-Version': String(doc.version), 'Cache-Control': 'no-cache' });
    }
    if (p === '/api/defaults' && m === 'GET') return send(res, 200, { data: DEFAULTS });
    if (p === '/api/login' && m === 'POST') {
      const body = await readJson(req);
      if (!ADMIN_PASSWORD || !safeEq(body.password || '', ADMIN_PASSWORD)) { await new Promise(r => setTimeout(r, 400)); return send(res, 401, { error: 'invalid password' }); }
      return send(res, 200, { token: newToken(), ttlMs: SESSION_TTL_MS });
    }
    // ---- authenticated ----
    if (p.startsWith('/api/')) {
      if (!authed(req)) return send(res, 401, { error: 'unauthorized' });
      if (p === '/api/session' && m === 'GET') return send(res, 200, { ok: true });
      if (p === '/api/config' && m === 'PUT') {
        const body = await readJson(req); const errs = validate(body.data);
        if (errs.length) return send(res, 400, { error: 'validation failed', details: errs });
        const doc = store.publish(body.data, { by: body.by || 'admin', note: body.note || '' });
        return send(res, 200, { ok: true, version: doc.version, updatedAt: doc.updatedAt });
      }
      if (p === '/api/config/reset' && m === 'POST') {
        const body = await readJson(req); const cur = published().data;
        const data = body.section ? Object.assign({}, cur, { [body.section]: clone(DEFAULTS[body.section]) }) : clone(DEFAULTS);
        if (body.section && DEFAULTS[body.section] === undefined) return send(res, 400, { error: 'unknown section' });
        const doc = store.publish(data, { by: body.by || 'admin', note: body.section ? `Reset ${body.section} to defaults` : 'Reset everything to defaults' });
        return send(res, 200, { ok: true, version: doc.version, data });
      }
      if (p === '/api/revisions' && m === 'GET') return send(res, 200, { revisions: store.listRevisions() });
      let rm = p.match(/^\/api\/revisions\/(\d+)$/); if (rm && m === 'GET') { const d = store.readRevision(rm[1]); return d ? send(res, 200, d) : send(res, 404, { error: 'no such revision' }); }
      rm = p.match(/^\/api\/revisions\/(\d+)\/restore$/); if (rm && m === 'POST') { const d = store.readRevision(rm[1]); if (!d) return send(res, 404, { error: 'no such revision' }); const doc = store.publish(d.data, { by: 'admin', note: `Restored revision ${d.version}` }); return send(res, 200, { ok: true, version: doc.version, data: doc.data }); }
    }
    send(res, 404, { error: 'not found' });
  } catch (e) { console.error(e); send(res, e.message === 'invalid JSON' || e.message === 'payload too large' ? 400 : 500, { error: e.message }); }
});
server.listen(PORT, () => console.log(`[deck-config-api] listening on :${PORT} · data at ${store.DIR}`));
