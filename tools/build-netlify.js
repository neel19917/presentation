#!/usr/bin/env node
/**
 * build-netlify.js — stage a Netlify-ready static bundle at dist/netlify/.
 *
 *   node tools/build-netlify.js      (or: npm run netlify)
 *
 * The deck build (Presentation/TMSDeck-dev.html) already has the sync bridge
 * baked in by tools/bundle.js, so the site is fully static — no server.js
 * needed. This tool copies the static assets, adds a root redirect so the
 * deploy URL opens the launcher, and prints deploy instructions.
 *
 * Deploy:
 *   • Drag-drop:  app.netlify.com/drop  →  drop the dist/netlify folder
 *   • CLI:        npx netlify deploy --dir dist/netlify --prod
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'dist', 'netlify');

// Static assets that make up the site. NO server.js / start scripts — Netlify
// serves the files directly, and the deck bridge is already baked into the build.
const INCLUDE = ['app', 'deck', 'Presentation', 'modules', 'BRANDING.md'];

// 1. Make sure the deck is freshly built (bridge baked in) before shipping.
try {
  execSync('node tools/bundle.js', { cwd: ROOT, stdio: 'pipe' });
} catch (e) {
  console.warn('  ⚠ tools/bundle.js failed — shipping the existing Presentation/TMSDeck-dev.html');
}
if (!fs.existsSync(path.join(ROOT, 'Presentation', 'TMSDeck-dev.html'))) {
  console.error('✖ Presentation/TMSDeck-dev.html missing — run `npm run bundle` first.');
  process.exit(1);
}

// 2. Stage.
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
for (const item of INCLUDE) {
  const from = path.join(ROOT, item);
  if (!fs.existsSync(from)) { console.warn('  ⚠ missing, skipped: ' + item); continue; }
  fs.cpSync(from, path.join(OUT, item), { recursive: true, filter: (s) => !path.basename(s).startsWith('.DS_Store') });
}

// 3. Root redirect → the launcher (app/index.html).
// _redirects: 200 rewrite so the deploy URL serves the launcher at "/".
fs.writeFileSync(path.join(OUT, '_redirects'), '/            /app/index.html   200\n');
// Fallback root index.html (in case _redirects is ignored on some host).
fs.writeFileSync(path.join(OUT, 'index.html'),
  '<!doctype html><meta charset="utf-8"><title>FreightPOP Demo</title>' +
  '<meta http-equiv="refresh" content="0; url=/app/index.html">' +
  '<link rel="canonical" href="/app/index.html">' +
  '<body style="font-family:system-ui;background:#051729;color:#fff;padding:40px">' +
  'Opening the FreightPOP demo… <a style="color:#3dd6b5" href="/app/index.html">continue</a>.</body>\n');
// netlify.toml — publish this folder as-is; long-cache the big immutable assets.
fs.writeFileSync(path.join(OUT, 'netlify.toml'),
  '# FreightPOP LocalDemo — static deploy (deck bridge is baked in; no functions)\n' +
  '[build]\n  publish = "."\n\n' +
  '[[headers]]\n  for = "/Presentation/*"\n  [headers.values]\n    Cache-Control = "public, max-age=3600"\n\n' +
  '[[headers]]\n  for = "/modules/*"\n  [headers.values]\n    Cache-Control = "public, max-age=3600"\n');

// 4. Report.
function dirSize(p) {
  let n = 0;
  for (const e of fs.readdirSync(p, { withFileTypes: true })) {
    const fp = path.join(p, e.name);
    n += e.isDirectory() ? dirSize(fp) : fs.statSync(fp).size;
  }
  return n;
}
const mb = (dirSize(OUT) / 1024 / 1024).toFixed(1);
console.log('✔ Netlify bundle staged at dist/netlify/ (' + mb + ' MB)');
console.log('');
console.log('Deploy one of two ways:');
console.log('  • Drag-drop:  open  https://app.netlify.com/drop  and drop the  dist/netlify  folder');
console.log('  • CLI:        npx netlify deploy --dir dist/netlify --prod');
console.log('');
console.log('The deploy URL opens the launcher. Present from /app/presenter.html on your laptop,');
console.log('open /app/audience.html on the booth screen — both same-origin, so they stay in sync.');
console.log('Note: carrier/ERP logos and the "Interactive Walkthrough" screen load from the internet.');
