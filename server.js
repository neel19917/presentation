#!/usr/bin/env node
/**
 * LocalDemo server — zero external dependencies, works on Mac & Windows.
 *
 * Serves this folder on http://localhost:8123 and opens the launcher in the
 * default browser. Presenting is fully offline. A small dynamic API layer
 * (only active when you use the Generator / Editor) powers two authoring tools:
 *
 *   Generator  POST /api/generate      → proxies the FreightPOP Railway
 *                                         /api/deck-gen brain, writes the
 *                                         generated deck + one-pager into the kit.
 *   Editor     GET  /api/decks         → catalog of everything editable
 *              GET  /api/content        → current editable JSON for a target
 *              POST /api/content        → save edits (+ auto-rebundle the
 *                                         interactive deck when needed)
 *              POST /api/rebundle       → recompile the interactive deck
 *
 * Only the Generator needs internet (to reach Railway); everything else,
 * including the Editor's rebundle, runs locally.
 *
 *   node server.js            → port 8123
 *   PORT=9000 node server.js  → custom port
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const ROOT = __dirname;
const BASE_PORT = Number(process.env.PORT) || 8123;
const RAILWAY_BASE = process.env.RAILWAY_BASE || 'https://api.freightpopsales.com';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

// ═══════════════════════════════════════════════════════════════════════════
//  Dynamic API layer (Generator + Editor)
// ═══════════════════════════════════════════════════════════════════════════

// Editable interactive-deck systems → their content JSON files (src-deck).
const SYSTEMS = [
  { sys: 'tms', label: 'Transportation Management', file: 'features-tms.json' },
  { sys: 'wms', label: 'Warehouse Management', file: 'features-wms.json' },
  { sys: 'oms', label: 'Order Management', file: 'features-oms.json' },
  { sys: 'netsuite', label: 'NetSuite Demo Track', file: 'features-netsuite.json' },
  { sys: 'acumatica', label: 'Acumatica Demo Track', file: 'features-acumatica.json' },
];
const SRC_CONTENT = path.join(ROOT, 'src-deck', 'content');

// Editable data-driven pages. Each data file holds one or more globals wrapped
// in /*<DATA:name>*/ … /*</DATA:name>*/ sentinels so we can read/rewrite the
// JSON safely (no fragile JS parsing).
const PAGES = {
  'erp-integrations': { file: path.join(ROOT, 'modules', 'erp-integrations-data.js'), globals: ['FP_ERP_DATA'], label: 'ERP & Integrations page' },
  'roi-value': { file: path.join(ROOT, 'modules', 'roi-value-data.js'), globals: ['FP_ROI_DATA'], label: 'ROI / Value page' },
  'real-ui': { file: path.join(ROOT, 'modules', 'real-ui', 'shots-data.js'), globals: ['FP_SHOTS', 'FP_SHOT_ORDER'], label: 'Real Product screenshots' },
  'netsuite-partners': { file: path.join(ROOT, 'modules', 'netsuite-partners-data.js'), globals: ['FP_NS_PARTNERS'], label: 'NetSuite Partners page' },
  'acumatica-partners': { file: path.join(ROOT, 'modules', 'acumatica-partners-data.js'), globals: ['FP_ACU_PARTNERS'], label: 'Acumatica Partners page' },
  'stories': { file: path.join(ROOT, 'deck', 'stories.js'), globals: ['FP_STORIES'], label: 'Story mode scripts (presenter)' },
};

// Deck-screen copy edited directly inside src-deck/template.html via
// <!--<COPY:key>-->text<!--</COPY:key>--> sentinels (rebundle applies it).
const TEMPLATE_PATH = path.join(ROOT, 'src-deck', 'template.html');
const COPY_KEYS = ['heroTitle', 'heroSub', 'tmsHubTitle', 'tmsHubIntro'];
function readDeckCopy() {
  const src = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const out = {};
  for (const k of COPY_KEYS) {
    const m = src.match(new RegExp('<!--<COPY:' + k + '>-->([\\s\\S]*?)<!--</COPY:' + k + '>-->'));
    // Decode the HTML-escaping writeDeckCopy applies, so read→save round-trips
    // don't double-escape (&amp; → &amp;amp; …).
    out[k] = m ? m[1].replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&') : '';
  }
  return out;
}
function writeDeckCopy(data) {
  let src = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  for (const k of COPY_KEYS) {
    if (typeof data[k] !== 'string') continue;
    // Escape HTML so marketing text can't break the template markup.
    const safe = data[k].replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    src = src.replace(
      new RegExp('(<!--<COPY:' + k + '>-->)[\\s\\S]*?(<!--</COPY:' + k + '>-->)'),
      '$1' + safe.replace(/\$/g, '$$$$') + '$2'
    );
  }
  safeWrite(TEMPLATE_PATH, src);
}
const SYS_DATA_PATH = path.join(SRC_CONTENT, 'sys-data.json');
const WORKFLOWS_PATH = path.join(SRC_CONTENT, 'workflows.json');

const GENERATED_DIR = path.join(ROOT, 'modules', 'generated');
const GEN_INDEX = path.join(ROOT, 'deck', 'generated-index.js');

function readBody(req) {
  return new Promise((resolve) => {
    let b = '';
    req.on('data', (c) => { b += c; if (b.length > 8e6) req.destroy(); });
    req.on('end', () => resolve(b));
    req.on('error', () => resolve(b));
  });
}
function sendJson(res, code, obj) {
  const s = JSON.stringify(obj);
  res.writeHead(code, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(s);
}
function slugify(s) {
  return String(s || 'deck').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 48) || 'deck';
}
// Atomic write + one-level .bak backup.
function safeWrite(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  if (fs.existsSync(file)) { try { fs.copyFileSync(file, file + '.bak'); } catch (e) {} }
  const tmp = file + '.tmp-' + process.pid;
  fs.writeFileSync(tmp, content);
  fs.renameSync(tmp, file);
}

// The FPPricer .env holds EC2_API_KEY — the kit borrows it (same lookup as tools/package.js).
function loadApiKey() {
  if (process.env.EC2_API_KEY) return process.env.EC2_API_KEY;
  const home = os.homedir();
  const candidates = [
    path.join(home, 'Desktop', 'FPPricer', 'server', '.env'),
    path.join(home, 'Desktop', 'FPPricer', '.env'),
  ];
  for (const p of candidates) {
    try { const m = fs.readFileSync(p, 'utf8').match(/^EC2_API_KEY=(.+)$/m); if (m) return m[1].trim(); } catch (e) {}
  }
  return null;
}

// ── Data-file (page) read / write via /*<DATA:name>*/ sentinels ────────────
function readPageData(pageId) {
  const p = PAGES[pageId];
  if (!p) throw new Error('unknown page ' + pageId);
  const src = fs.readFileSync(p.file, 'utf8');
  const out = {};
  for (const g of p.globals) {
    const re = new RegExp('/\\*<DATA:' + g + '>\\*/([\\s\\S]*?)/\\*</DATA:' + g + '>\\*/');
    const m = src.match(re);
    out[g] = m ? JSON.parse(m[1]) : null;
  }
  return out;
}
function writePageData(pageId, dataByGlobal) {
  const p = PAGES[pageId];
  if (!p) throw new Error('unknown page ' + pageId);
  let src = fs.readFileSync(p.file, 'utf8');
  for (const g of p.globals) {
    if (!(g in dataByGlobal)) continue;
    const json = JSON.stringify(dataByGlobal[g], null, 2);
    const re = new RegExp('(/\\*<DATA:' + g + '>\\*/)[\\s\\S]*?(/\\*</DATA:' + g + '>\\*/)');
    src = src.replace(re, '$1' + json.replace(/\$/g, '$$$$') + '$2');
  }
  safeWrite(p.file, src);
}

function runBundle() {
  return new Promise((resolve) => {
    const bundle = path.join(ROOT, 'tools', 'bundle.js');
    if (!fs.existsSync(bundle)) { resolve({ ok: false, error: 'tools/bundle.js not present in this copy of the kit' }); return; }
    const child = spawn(process.execPath, [bundle], { cwd: ROOT });
    let out = '';
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { out += d; });
    child.on('close', (code) => resolve({ ok: code === 0, log: out.slice(-2000) }));
    child.on('error', (e) => resolve({ ok: false, error: e.message }));
  });
}

function listGenerated() {
  try {
    const src = fs.readFileSync(GEN_INDEX, 'utf8');
    const m = src.match(/window\.FP_GENERATED\s*=\s*([\s\S]*?);?\s*$/);
    return m ? JSON.parse(m[1]) : [];
  } catch (e) { return []; }
}
function writeGeneratedIndex(list) {
  const header = '// Auto-maintained by server.js /api/generate — list of generated decks. Do not hand-edit.\n';
  safeWrite(GEN_INDEX, header + 'window.FP_GENERATED = ' + JSON.stringify(list, null, 2) + ';\n');
}

// ── Editor catalog ─────────────────────────────────────────────────────────
function buildCatalog() {
  const interactive = [];
  for (const s of SYSTEMS) {
    try {
      const arr = JSON.parse(fs.readFileSync(path.join(SRC_CONTENT, s.file), 'utf8'));
      interactive.push({ sys: s.sys, label: s.label, target: 'feat:' + s.sys, editable: fs.existsSync(SRC_CONTENT), modules: arr.map((m) => ({ num: m.num, name: m.name })) });
    } catch (e) { /* src-deck not present in this (packaged) copy */ }
  }
  const pages = Object.keys(PAGES).filter((id) => fs.existsSync(PAGES[id].file)).map((id) => ({ id, target: 'page:' + id, label: PAGES[id].label }));
  const generated = listGenerated().map((g) => ({ slug: g.slug, title: g.title, target: 'gen:' + g.slug }));
  // Deck screens beyond the modules: hero/hub copy, system hub screens, workflows.
  const deckScreens = [];
  if (fs.existsSync(TEMPLATE_PATH)) deckScreens.push({ target: 'deck:copy', label: 'Hero & TMS hub copy' });
  if (fs.existsSync(SYS_DATA_PATH)) {
    try {
      const sd = JSON.parse(fs.readFileSync(SYS_DATA_PATH, 'utf8'));
      for (const key of Object.keys(sd)) deckScreens.push({ target: 'deck:sysdata#' + key, label: (sd[key].name || key.toUpperCase()) + ' hub screen' });
    } catch (e) {}
  }
  if (fs.existsSync(WORKFLOWS_PATH)) deckScreens.push({ target: 'deck:workflows', label: 'Shipping Workflows section' });
  return { interactive, deckScreens, pages, generated, canRebundle: fs.existsSync(path.join(ROOT, 'tools', 'bundle.js')) && fs.existsSync(SRC_CONTENT) };
}

// ── Generated deck read/write (deck-data.js via sentinel) ──────────────────
function readGenDeck(slug) {
  const f = path.join(GENERATED_DIR, slug, 'deck-data.js');
  const src = fs.readFileSync(f, 'utf8');
  const m = src.match(/\/\*<DATA:FP_GEN_DECK>\*\/([\s\S]*?)\/\*<\/DATA:FP_GEN_DECK>\*\//);
  return m ? JSON.parse(m[1]) : null;
}
function writeGenDeck(slug, deck) {
  const f = path.join(GENERATED_DIR, slug, 'deck-data.js');
  const json = JSON.stringify(deck, null, 2);
  const body = '// Generated deck data — editable via app/edit.html. Sentinels let the server rewrite it safely.\n'
    + 'window.FP_GEN_DECK = /*<DATA:FP_GEN_DECK>*/' + json + '/*</DATA:FP_GEN_DECK>*/;\n';
  safeWrite(f, body);
}

// ── Write a full generated deck (manifest + slides data + one-pager) ───────
function persistGeneratedDeck(deckSpec, onePagerHtml, meta) {
  const title = (deckSpec && deckSpec.deck_title) || (meta && meta.brief) || 'FreightPOP Deck';
  const slug = slugify(title) + '-' + Date.now().toString(36).slice(-4);
  const slides = (deckSpec && Array.isArray(deckSpec.slides)) ? deckSpec.slides : [];
  writeGenDeck(slug, { slug, title, created: new Date().toISOString(), slides });

  const hasOnePager = !!(onePagerHtml && onePagerHtml.trim());
  if (hasOnePager) safeWrite(path.join(GENERATED_DIR, slug, 'one-pager.html'), onePagerHtml);

  // Manifest — one slide per SlideSpec (rendered by the shared gen-slide.html), plus the one-pager.
  const manSlides = slides.map((s, i) => ({
    url: '/modules/generated/gen-slide.html?deck=' + slug + '&i=' + i,
    fit: 'native',
    title: (s && (s.title || s.heading || s.stat || s.section)) ? String(s.title || s.heading || s.stat || s.section).slice(0, 60) : ('Slide ' + (i + 1)),
    section: 'Generated Deck',
  }));
  if (hasOnePager) manSlides.push({ url: '/modules/generated/' + slug + '/one-pager.html', fit: 'native', title: 'One-Pager', section: 'One-Pager' });
  const manifest = '// Generated by the FreightPOP deck generator. window.FP_DECK for app/generated.html?deck=' + slug + '\n'
    + 'window.FP_DECK = ' + JSON.stringify({ title, slides: manSlides }, null, 2) + ';\n';
  safeWrite(path.join(ROOT, 'deck', 'manifest-generated-' + slug + '.js'), manifest);

  const list = listGenerated().filter((g) => g.slug !== slug);
  list.unshift({ slug, title, created: new Date().toISOString(), hasOnePager });
  writeGeneratedIndex(list);

  return { slug, presentUrl: '/app/generated.html?deck=' + slug, onePagerUrl: hasOnePager ? '/modules/generated/' + slug + '/one-pager.html' : null };
}

// ── Generator: proxy Railway /api/deck-gen, poll, persist ──────────────────
async function handleGenerate(body) {
  const key = loadApiKey();
  if (!key) return { code: 500, obj: { error: 'No EC2_API_KEY found. Set it in the environment or in ~/Desktop/FPPricer/.env to use the generator.' } };
  let brief;
  try { brief = JSON.parse(body || '{}'); } catch (e) { return { code: 400, obj: { error: 'invalid JSON body' } }; }

  const start = await fetch(RAILWAY_BASE + '/api/deck-gen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Api-Key': key },
    body: JSON.stringify(brief),
  });
  if (!start.ok && start.status !== 202) {
    const t = await start.text();
    return { code: 502, obj: { error: 'Railway deck-gen failed: ' + start.status + ' ' + t.slice(0, 300) } };
  }
  const startJson = await start.json().catch(() => ({}));
  const jobId = startJson.jobId || startJson.job_id || startJson.id;
  if (!jobId) return { code: 502, obj: { error: 'deck-gen did not return a jobId', raw: startJson } };

  // Poll up to ~5 min.
  const deadline = Date.now() + 5 * 60 * 1000;
  let result = null, status = 'running';
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 3000));
    const pr = await fetch(RAILWAY_BASE + '/api/deck-gen/' + jobId, { headers: { 'X-Api-Key': key } });
    if (!pr.ok) continue;
    const pj = await pr.json().catch(() => ({}));
    status = pj.status || status;
    if (status === 'complete' || status === 'completed' || status === 'done') { result = pj.result || pj; break; }
    if (status === 'error' || status === 'failed') return { code: 502, obj: { error: 'deck-gen job failed: ' + (pj.error || 'unknown') } };
  }
  if (!result) return { code: 504, obj: { error: 'deck-gen timed out' } };

  const persisted = persistGeneratedDeck(result.deckSpec || result.deck_spec, result.onePagerHtml || result.one_pager_html, brief);
  return { code: 200, obj: Object.assign({ ok: true, jobId, grounding: result.grounding || null }, persisted) };
}

// ── API router (returns true if it handled the request) ────────────────────
async function handleApi(req, res, urlPath, query) {
  try {
    if (req.method === 'GET' && urlPath === '/api/health') { sendJson(res, 200, { ok: true, hasKey: !!loadApiKey() }); return true; }

    if (req.method === 'GET' && urlPath === '/api/decks') { sendJson(res, 200, buildCatalog()); return true; }

    if (req.method === 'GET' && urlPath === '/api/content') {
      const target = query.get('target') || '';
      if (target.startsWith('feat:')) {
        const sys = target.slice(5);
        const s = SYSTEMS.find((x) => x.sys === sys);
        if (!s) { sendJson(res, 404, { error: 'unknown system' }); return true; }
        const data = JSON.parse(fs.readFileSync(path.join(SRC_CONTENT, s.file), 'utf8'));
        sendJson(res, 200, { target, kind: 'feature-set', label: s.label, data });
      } else if (target.startsWith('page:')) {
        const id = target.slice(5);
        sendJson(res, 200, { target, kind: 'page', label: (PAGES[id] || {}).label || id, data: readPageData(id) });
      } else if (target.startsWith('gen:')) {
        const slug = target.slice(4);
        sendJson(res, 200, { target, kind: 'generated-deck', data: readGenDeck(slug) });
      } else if (target === 'deck:copy') {
        sendJson(res, 200, { target, kind: 'deck-copy', label: 'Hero & TMS hub copy', data: readDeckCopy() });
      } else if (target.startsWith('deck:sysdata#')) {
        const key = target.slice('deck:sysdata#'.length);
        const sd = JSON.parse(fs.readFileSync(SYS_DATA_PATH, 'utf8'));
        if (!sd[key]) { sendJson(res, 404, { error: 'unknown hub ' + key }); return true; }
        sendJson(res, 200, { target, kind: 'sys-hub', label: (sd[key].name || key) + ' hub', data: sd[key] });
      } else if (target === 'deck:workflows') {
        sendJson(res, 200, { target, kind: 'workflows', label: 'Shipping Workflows section', data: JSON.parse(fs.readFileSync(WORKFLOWS_PATH, 'utf8')) });
      } else { sendJson(res, 400, { error: 'unknown target ' + target }); }
      return true;
    }

    if (req.method === 'POST' && urlPath === '/api/content') {
      const body = await readBody(req);
      let payload;
      try { payload = JSON.parse(body || '{}'); } catch (e) { sendJson(res, 400, { error: 'invalid JSON' }); return true; }
      const { target, data } = payload;
      if (typeof target !== 'string' || data == null) { sendJson(res, 400, { error: 'target + data required' }); return true; }
      if (target.startsWith('feat:')) {
        const sys = target.slice(5);
        const s = SYSTEMS.find((x) => x.sys === sys);
        if (!s) { sendJson(res, 404, { error: 'unknown system' }); return true; }
        safeWrite(path.join(SRC_CONTENT, s.file), JSON.stringify(data, null, 2) + '\n');
        const rb = await runBundle();
        sendJson(res, 200, { ok: true, rebundled: rb.ok, rebundleLog: rb.ok ? undefined : (rb.error || rb.log) });
      } else if (target.startsWith('page:')) {
        writePageData(target.slice(5), data);
        sendJson(res, 200, { ok: true, rebundled: false });
      } else if (target.startsWith('gen:')) {
        writeGenDeck(target.slice(4), data);
        sendJson(res, 200, { ok: true, rebundled: false });
      } else if (target === 'deck:copy') {
        writeDeckCopy(data);
        const rb = await runBundle();
        sendJson(res, 200, { ok: true, rebundled: rb.ok, rebundleLog: rb.ok ? undefined : (rb.error || rb.log) });
      } else if (target.startsWith('deck:sysdata#')) {
        const key = target.slice('deck:sysdata#'.length);
        const sd = JSON.parse(fs.readFileSync(SYS_DATA_PATH, 'utf8'));
        if (!sd[key]) { sendJson(res, 404, { error: 'unknown hub ' + key }); return true; }
        sd[key] = data;
        safeWrite(SYS_DATA_PATH, JSON.stringify(sd, null, 2) + '\n');
        const rb = await runBundle();
        sendJson(res, 200, { ok: true, rebundled: rb.ok, rebundleLog: rb.ok ? undefined : (rb.error || rb.log) });
      } else if (target === 'deck:workflows') {
        safeWrite(WORKFLOWS_PATH, JSON.stringify(data, null, 2) + '\n');
        const rb = await runBundle();
        sendJson(res, 200, { ok: true, rebundled: rb.ok, rebundleLog: rb.ok ? undefined : (rb.error || rb.log) });
      } else { sendJson(res, 400, { error: 'unknown target' }); }
      return true;
    }

    if (req.method === 'POST' && urlPath === '/api/rebundle') {
      const rb = await runBundle();
      sendJson(res, rb.ok ? 200 : 500, rb);
      return true;
    }

    if (req.method === 'POST' && urlPath === '/api/generate') {
      const body = await readBody(req);
      const { code, obj } = await handleGenerate(body);
      sendJson(res, code, obj);
      return true;
    }

    return false; // not an API route → fall through to static
  } catch (e) {
    sendJson(res, 500, { error: e.message || String(e) });
    return true;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
//  Bundled-deck bridge injection (unchanged) — see header for details.
// ═══════════════════════════════════════════════════════════════════════════
const deckCache = new Map(); // finalPath -> { mtimeMs, bridgeMtimeMs, data }

function injectDeckBridge(finalPath, src) {
  const bridgePath = path.join(ROOT, 'app', 'core', 'deck-bridge.js');
  if (src.includes('data-fp-bridge')) return null; // bridge already baked in by tools/bundle.js
  const marker = '<script type="__bundler/template">';
  const start = src.indexOf(marker);
  if (start === -1) return null;
  const bodyStart = start + marker.length;
  const end = src.indexOf('</script>', bodyStart);
  if (end === -1) return null;

  let stat, bstat;
  try { stat = fs.statSync(finalPath); bstat = fs.statSync(bridgePath); } catch (e) { return null; }
  const hit = deckCache.get(finalPath);
  if (hit && hit.mtimeMs === stat.mtimeMs && hit.bridgeMtimeMs === bstat.mtimeMs) return hit.data;

  let tpl;
  try { tpl = JSON.parse(src.slice(bodyStart, end)); } catch (e) { return null; }

  tpl = tpl.replace(
    'componentDidMount() {',
    'componentDidMount() { try { window.__fpApp = this; window.dispatchEvent(new Event("fp-app-ready")); } catch (e) {}'
  );

  const bridge = fs.readFileSync(bridgePath, 'utf8').replace(/<\/script>/gi, '<\\/script>');
  const bridgeTag = '\n<script data-fp-bridge>' + bridge + '\n</script>';
  tpl = tpl.includes('</body>') ? tpl.replace('</body>', bridgeTag + '</body>') : tpl + bridgeTag;

  const tplJson = JSON.stringify(tpl).replace(/<\//g, '<\\/');
  const out = src.slice(0, bodyStart) + tplJson + src.slice(end);
  deckCache.set(finalPath, { mtimeMs: stat.mtimeMs, bridgeMtimeMs: bstat.mtimeMs, data: out });
  return out;
}

const server = http.createServer((req, res) => {
  const parsed = new URL(req.url || '/', 'http://localhost');
  let urlPath = decodeURIComponent(parsed.pathname);
  if (urlPath === '/' || urlPath === '') urlPath = '/app/index.html';

  // Dynamic API layer first (Generator / Editor). Everything else is static.
  if (urlPath.startsWith('/api/')) {
    handleApi(req, res, urlPath, parsed.searchParams).then((handled) => {
      if (!handled) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('No API route: ' + urlPath); }
    });
    return;
  }

  // Resolve inside ROOT only (block ../ traversal).
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.stat(filePath, (err, stat) => {
    let finalPath = filePath;
    if (!err && stat.isDirectory()) finalPath = path.join(filePath, 'index.html');
    fs.readFile(finalPath, (err2, data) => {
      if (err2) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found: ' + urlPath); return; }

      if (finalPath.endsWith('.html')) {
        const src = data.toString('utf8');
        if (src.includes('__bundler/template')) {
          const injected = injectDeckBridge(finalPath, src);
          if (injected) data = Buffer.from(injected, 'utf8');
        }
      }

      res.writeHead(200, {
        'Content-Type': MIME[path.extname(finalPath).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });
});

function openBrowser(url) {
  if (process.env.NO_OPEN) return; // NO_OPEN=1 → don't auto-launch a browser
  const p = process.platform;
  if (p === 'darwin') spawn('open', [url], { stdio: 'ignore', detached: true }).unref();
  else if (p === 'win32') spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true }).unref();
  else spawn('xdg-open', [url], { stdio: 'ignore', detached: true }).unref();
}

function listen(port, attemptsLeft) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`Port ${port} busy, trying ${port + 1}…`);
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error('Could not start server:', err.message);
      process.exit(1);
    }
  });
  server.listen(port, () => {
    const url = `http://localhost:${port}/app/index.html`;
    console.log('');
    console.log('  FreightPOP LocalDemo running');
    console.log(`  →  ${url}`);
    console.log('');
    console.log('  Presenter view : your laptop screen');
    console.log('  Audience view  : drag to the external monitor, press F for fullscreen');
    console.log('');
    console.log('  Ctrl+C to stop.');
    openBrowser(url);
  });
}

listen(BASE_PORT, 10);
