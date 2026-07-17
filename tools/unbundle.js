#!/usr/bin/env node
/**
 * unbundle.js — explode a "bundled page" deck (single self-extracting .html)
 * into an editable source tree at src-deck/:
 *
 *   src-deck/
 *     shell.html          the outer loader with @@FP_MANIFEST@@ / @@FP_TEMPLATE@@ /
 *                         @@FP_EXTRES@@ markers where the payloads were
 *     template.html       the real page (markup + CSS), with the deck's logic
 *                         script replaced by an @@FP_LOGIC@@ marker
 *     logic.js            the deck component (state machine, navigation) with
 *                         content arrays replaced by /*@fp-content:...* / markers
 *     content/*.json      ALL editable copy: modules per system, step names,
 *                         system descriptions, placeholders — edit these freely
 *     assets/<uuid>.<ext> decoded binary assets (swap a png to change art)
 *     assets/manifest.json  uuid → file/mime/compressed map
 *     ext_resources.json  asset-id → uuid map used by window.__resources
 *
 * Usage:  node tools/unbundle.js [Presentation/TMSDeck-072026.html] [--force]
 *
 * Rebuild with tools/bundle.js. Round trip is content-lossless.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const force = process.argv.includes('--force');
const INPUT = path.resolve(ROOT, args[0] || 'Presentation/TMSDeck-072026.html');
const OUT = path.join(ROOT, 'src-deck');

// Content fields extracted from the logic class into editable JSON.
// key = marker name + json filename; field = class-field name in the source.
const CONTENT_FIELDS = [
  { key: 'step-names', field: 'stepNames' },
  { key: 'placeholders', field: 'placeholders' },
  { key: 'sys-data', field: 'sysData' },
  { key: 'features-tms', field: 'features' },
  { key: 'features-wms', field: 'wmsFeatures' },
  { key: 'features-oms', field: 'omsFeatures' },
];

const EXT_BY_MIME = {
  'image/png': '.png', 'image/jpeg': '.jpg', 'image/gif': '.gif', 'image/webp': '.webp',
  'image/svg+xml': '.svg', 'text/javascript': '.js', 'application/javascript': '.js',
  'application/wasm': '.wasm', 'text/plain': '.txt', 'text/css': '.css',
  'font/woff2': '.woff2', 'font/woff': '.woff', 'video/mp4': '.mp4', 'application/json': '.json',
};

function fail(msg) { console.error('✖ ' + msg); process.exit(1); }

// Balanced-bracket extraction of `field = [...]` / `field = {...}` from JS source.
function extractField(src, field) {
  const re = new RegExp('(^|\\n)(\\s*)' + field + '\\s*=\\s*([\\[{])');
  const m = re.exec(src);
  if (!m) return null;
  const open = m[3];
  const close = open === '[' ? ']' : '}';
  const exprStart = m.index + m[0].length - 1;
  let depth = 0, inStr = null, esc = false;
  for (let j = exprStart; j < src.length; j++) {
    const c = src[j];
    if (esc) { esc = false; continue; }
    if (inStr) {
      if (c === '\\') esc = true;
      else if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = c; continue; }
    if (c === '/' && src[j + 1] === '/') { j = src.indexOf('\n', j); if (j === -1) break; continue; }
    if (c === open) depth++;
    else if (c === close) {
      depth--;
      if (depth === 0) {
        return {
          declStart: m.index + m[1].length,   // start of `<indent>field =`
          exprStart, exprEnd: j + 1,
          indent: m[2],
          text: src.slice(exprStart, j + 1),
        };
      }
    }
  }
  return null;
}

function sliceScriptPayload(src, marker) {
  const start = src.indexOf(marker);
  if (start === -1) return null;
  const bodyStart = start + marker.length;
  const end = src.indexOf('</script>', bodyStart);
  if (end === -1) return null;
  return { bodyStart, end, body: src.slice(bodyStart, end) };
}

// ── Load & carve the outer shell ─────────────────────────────────────────
if (!fs.existsSync(INPUT)) fail('Input not found: ' + INPUT);
if (fs.existsSync(OUT) && !force) fail('src-deck/ already exists — pass --force to overwrite it.');
const src = fs.readFileSync(INPUT, 'utf8');

const manifestSlot = sliceScriptPayload(src, '<script type="__bundler/manifest">');
const templateSlot = sliceScriptPayload(src, '<script type="__bundler/template">');
const extResSlot = sliceScriptPayload(src, '<script type="__bundler/ext_resources">');
if (!manifestSlot || !templateSlot) fail('Not a bundled page (missing __bundler/manifest or __bundler/template).');

let manifest, template, extResources;
try { manifest = JSON.parse(manifestSlot.body); } catch (e) { fail('manifest JSON: ' + e.message); }
try { template = JSON.parse(templateSlot.body); } catch (e) { fail('template JSON: ' + e.message); }
try { extResources = extResSlot ? JSON.parse(extResSlot.body) : []; } catch (e) { fail('ext_resources JSON: ' + e.message); }

// Build shell.html with markers (replace later slots first so indexes hold).
const slots = [
  { slot: manifestSlot, marker: '@@FP_MANIFEST@@' },
  { slot: templateSlot, marker: '@@FP_TEMPLATE@@' },
  ...(extResSlot ? [{ slot: extResSlot, marker: '@@FP_EXTRES@@' }] : []),
].sort((a, b) => b.slot.bodyStart - a.slot.bodyStart);
let shell = src;
for (const { slot, marker } of slots) shell = shell.slice(0, slot.bodyStart) + marker + shell.slice(slot.end);

// ── Assets ───────────────────────────────────────────────────────────────
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });
fs.mkdirSync(path.join(OUT, 'content'), { recursive: true });

const assetIndex = [];
for (const [uuid, entry] of Object.entries(manifest)) {
  const raw = Buffer.from(entry.data, 'base64');
  const bytes = entry.compressed ? zlib.gunzipSync(raw) : raw;
  const file = uuid + (EXT_BY_MIME[entry.mime] || '.bin');
  fs.writeFileSync(path.join(OUT, 'assets', file), bytes);
  assetIndex.push({ uuid, file, mime: entry.mime, compressed: !!entry.compressed });
}
fs.writeFileSync(path.join(OUT, 'assets', 'manifest.json'), JSON.stringify(assetIndex, null, 2));
fs.writeFileSync(path.join(OUT, 'ext_resources.json'), JSON.stringify(extResources, null, 2));

// ── Logic out of the template ────────────────────────────────────────────
const xdcOpen = template.match(/<script type="text\/x-dc"[^>]*>/);
if (!xdcOpen) fail('No <script type="text/x-dc"> logic script found in template.');
const logicStart = xdcOpen.index + xdcOpen[0].length;
const logicEnd = template.indexOf('</script>', logicStart);
let logic = template.slice(logicStart, logicEnd);
const templateOut = template.slice(0, logicStart) + '\n@@FP_LOGIC@@\n' + template.slice(logicEnd);

// ── Content out of the logic ─────────────────────────────────────────────
const extracted = [];
for (const { key, field } of CONTENT_FIELDS) {
  const hit = extractField(logic, field);
  if (!hit) { console.warn('  ⚠ field not found, left inline: ' + field); continue; }
  let value;
  try { value = new Function('return (' + hit.text + ')')(); } catch (e) {
    console.warn('  ⚠ field not plain data, left inline: ' + field + ' (' + e.message + ')');
    continue;
  }
  // Round-trip guard: JSON must reproduce the evaluated value exactly.
  const json = JSON.stringify(value, null, 2);
  if (JSON.stringify(JSON.parse(json)) !== JSON.stringify(value)) {
    console.warn('  ⚠ field not JSON-safe, left inline: ' + field);
    continue;
  }
  fs.writeFileSync(path.join(OUT, 'content', key + '.json'), json + '\n');
  logic = logic.slice(0, hit.exprStart) + '/*@fp-content:' + key + '*/null' + logic.slice(hit.exprEnd);
  extracted.push(field + ' → content/' + key + '.json');
}

fs.writeFileSync(path.join(OUT, 'logic.js'), logic);
fs.writeFileSync(path.join(OUT, 'template.html'), templateOut);
fs.writeFileSync(path.join(OUT, 'shell.html'), shell);
fs.writeFileSync(path.join(OUT, 'SOURCE.json'), JSON.stringify({ input: path.relative(ROOT, INPUT), unbundledAt: new Date().toISOString() }, null, 2));

fs.writeFileSync(path.join(OUT, 'README.md'), `# src-deck — modularized deck source

Unbundled from \`${path.relative(ROOT, INPUT)}\`. Rebuild with \`npm run bundle\`.

| Edit this | To change |
|---|---|
| \`content/features-tms.json\` | TMS modules — names, problem/benefit/demo/ROI copy |
| \`content/features-wms.json\` / \`features-oms.json\` | WMS / OMS modules |
| \`content/sys-data.json\` | System hub descriptions & cards |
| \`content/step-names.json\` | The 4 step labels |
| \`content/placeholders.json\` | Placeholder screens (ERP etc.) |
| \`template.html\` | Page markup, styles, screens, hotspots |
| \`logic.js\` | Navigation/state machine (views, keyboard, Rive) |
| \`assets/*\` | Images / Rive animation / fonts — replace a file, keep its name |

Do not remove the \`@@FP_LOGIC@@\` marker in template.html or the
\`/*@fp-content:...*/null\` markers in logic.js — the bundler fills them.
`);

console.log('✔ Unbundled ' + path.relative(ROOT, INPUT) + ' → src-deck/');
console.log('  assets: ' + assetIndex.length + ' · template: ' + (templateOut.length / 1024).toFixed(0) + ' KB · logic: ' + (logic.length / 1024).toFixed(0) + ' KB');
extracted.forEach((l) => console.log('  ' + l));
