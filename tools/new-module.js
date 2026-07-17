#!/usr/bin/env node
/**
 * new-module.js — scaffold a new video/demo module from the template.
 *
 *   node tools/new-module.js <kebab-name> "<Title>"
 *   e.g. node tools/new-module.js dock-scheduling "Dock Scheduling, step by step."
 *
 * Creates modules/<kebab-name>.html from modules/_video-template.html with:
 *   - the real FreightPOP logo embedded (base64, offline-safe)
 *   - a unique sync channel (fp-<name>-video-sync)
 *   - the title filled in
 * Then prints the snippets for deck/manifest.js (slide + chapter chips) and
 * src-deck content (in-deck Live Demo embed).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const [name, title] = process.argv.slice(2);
if (!name || !/^[a-z0-9-]+$/.test(name)) {
  console.error('Usage: node tools/new-module.js <kebab-name> "<Title>"');
  process.exit(1);
}
const out = path.join(ROOT, 'modules', name + '.html');
if (fs.existsSync(out)) { console.error('✖ already exists: ' + path.relative(ROOT, out)); process.exit(1); }

let tpl = fs.readFileSync(path.join(ROOT, 'modules', '_video-template.html'), 'utf8');

// Real white FreightPOP logo (from the deck's own assets).
const logoFile = path.join(ROOT, 'src-deck', 'assets', '25e71771-bccb-4402-bdd9-42e9e67ab502.png');
const logoTag = fs.existsSync(logoFile)
  ? '<img class="logo-img logo-lg" alt="FreightPOP" src="data:image/png;base64,' + fs.readFileSync(logoFile).toString('base64') + '">'
  : '<div style="font-family:Manrope;font-weight:800;font-size:44px;">Freight<b style="color:#4c8dde">POP</b></div>';

const channel = 'fp-' + name + '-video-sync';
tpl = tpl
  .replace('@@LOGO@@', logoTag)
  .replace('@@CHANNEL@@', channel)
  .replace('<title>FreightPOP — Video Module Template</title>', '<title>FreightPOP — ' + (title || name) + '</title>')
  .replace('Your title here.', title || 'Your title here.');

fs.writeFileSync(out, tpl);
console.log('✔ created modules/' + name + '.html');
console.log('\nNext steps:');
console.log('1. Build your scenes: markup in #stage + choreography in apply(t). Update CH chapters.');
console.log('\n2. Slide in the tradeshow deck — add to deck/manifest.js slides:');
console.log(`   {
     url: '/modules/${name}.html', fit: 'native',
     title: '${title || name}', section: 'Demo',
     videoChannel: '${channel}',
     chapters: [ { label: 'Intro', t: 0 } /* …match CH… */ ],
     notes: 'Space: play/pause · arrows: chapters — synced across screens.',
   },`);
console.log("\n3. In-deck Live Demo embed — in src-deck/content/features-*.json set the module's:");
console.log(`   "demo": { "embed": "../modules/${name}.html?theme=deck&embed=1", "caption": "…" }`);
console.log('   then: npm run bundle -- --activate');
console.log(`\n4. MP4: node tools/render-video.mjs --url "http://localhost:8123/modules/${name}.html?render=1" --out dist/${name}.mp4`);
