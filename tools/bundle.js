#!/usr/bin/env node
/**
 * bundle.js — reassemble a single-file deck from src-deck/ (see unbundle.js).
 *
 *   node tools/bundle.js                          → Presentation/TMSDeck-dev.html
 *   node tools/bundle.js --out Presentation/X.html
 *   node tools/bundle.js --activate               → also point deck/manifest.js at the output
 *   node tools/bundle.js --no-embed-bridge        → skip baking the sync bridge in
 *
 * The sync bridge is EMBEDDED by default, so the built deck syncs presenter ↔
 * audience on ANY static host (Netlify, S3, a rep's laptop) — not only behind
 * server.js (whose on-the-fly injection skips files that already have it).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src-deck');
const argv = process.argv.slice(2);
const outArg = argv.includes('--out') ? argv[argv.indexOf('--out') + 1] : 'Presentation/TMSDeck-dev.html';
const OUT = path.resolve(ROOT, outArg);
const activate = argv.includes('--activate');
const embedBridge = !argv.includes('--no-embed-bridge');

function fail(msg) { console.error('✖ ' + msg); process.exit(1); }
function read(p) { return fs.readFileSync(path.join(SRC, p), 'utf8'); }

if (!fs.existsSync(SRC)) fail('src-deck/ not found — run `npm run unbundle` first.');

// ── 1. Content → logic ───────────────────────────────────────────────────
let logic = read('logic.js');
const contentDir = path.join(SRC, 'content');
for (const f of fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'))) {
  const key = f.replace(/\.json$/, '');
  const marker = '/*@fp-content:' + key + '*/null';
  if (!logic.includes(marker)) { console.warn('  ⚠ no marker in logic.js for content/' + f + ' — skipped'); continue; }
  const json = JSON.stringify(JSON.parse(fs.readFileSync(path.join(contentDir, f), 'utf8')));
  logic = logic.split(marker).join(json);
}
const leftover = logic.match(/\/\*@fp-content:[^*]+\*\/null/);
if (leftover) fail('Marker without a matching content file: ' + leftover[0]);
if (logic.includes('</script>')) fail('logic.js must not contain the literal "</script>" — it would break the template.');

// ── 2. Logic → template ──────────────────────────────────────────────────
let template = read('template.html');
if (!template.includes('@@FP_LOGIC@@')) fail('template.html is missing the @@FP_LOGIC@@ marker.');
template = template.replace('@@FP_LOGIC@@', () => logic);

// ── 3. Bake the sync bridge in (same transform server.js does on the fly) ─
if (embedBridge) {
  template = template.replace(
    'componentDidMount() {',
    'componentDidMount() { try { window.__fpApp = this; window.dispatchEvent(new Event("fp-app-ready")); } catch (e) {}'
  );
  const bridge = fs.readFileSync(path.join(ROOT, 'app', 'core', 'deck-bridge.js'), 'utf8').replace(/<\/script>/gi, '<\\/script>');
  const tag = '\n<script data-fp-bridge>' + bridge + '\n</script>';
  template = template.includes('</body>') ? template.replace('</body>', tag + '</body>') : template + tag;
}

// ── 4. Assets → manifest ─────────────────────────────────────────────────
const assetIndex = JSON.parse(read('assets/manifest.json'));
const manifest = {};
for (const a of assetIndex) {
  const bytes = fs.readFileSync(path.join(SRC, 'assets', a.file));
  manifest[a.uuid] = {
    mime: a.mime,
    compressed: !!a.compressed,
    data: (a.compressed ? zlib.gzipSync(bytes) : bytes).toString('base64'),
  };
}
const extResources = JSON.parse(read('ext_resources.json'));

// ── 5. Payloads → shell ──────────────────────────────────────────────────
// Escape "</" so a literal "</script>" inside the JSON can't terminate the
// carrier <script> tag (the original bundler does the same).
const esc = (s) => s.replace(/<\//g, '<\\/');
let out = read('shell.html');
for (const [marker, payload] of [
  ['@@FP_MANIFEST@@', esc(JSON.stringify(manifest))],
  ['@@FP_TEMPLATE@@', esc(JSON.stringify(template))],
  ['@@FP_EXTRES@@', esc(JSON.stringify(extResources))],
]) {
  if (out.includes(marker)) out = out.replace(marker, () => payload);
  else if (marker !== '@@FP_EXTRES@@') fail('shell.html is missing ' + marker);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log('✔ Built ' + path.relative(ROOT, OUT) + ' (' + (out.length / 1024 / 1024).toFixed(1) + ' MB' + (embedBridge ? ', sync bridge embedded' : '') + ')');

// ── 6. --activate: point deck/manifest.js at the build ───────────────────
if (activate) {
  const manifestJs = path.join(ROOT, 'deck', 'manifest.js');
  const mSrc = fs.readFileSync(manifestJs, 'utf8');
  const urlPath = '/' + path.relative(ROOT, OUT).split(path.sep).join('/');
  if (!/url: '\/Presentation\/[^']+'/.test(mSrc)) {
    console.warn('  ⚠ could not find the deck url line in deck/manifest.js — update it manually.');
  } else {
    const next = mSrc.replace(/url: '\/Presentation\/[^']+'/, "url: '" + urlPath + "'");
    if (next !== mSrc) fs.writeFileSync(manifestJs, next);
    console.log('✔ deck/manifest.js points at ' + urlPath);
  }
}
