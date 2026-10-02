#!/usr/bin/env node
// Type/shape check of the deck's built-in content + cross-check against defaults.json and the published config.
//   npm run check              (in sales-os-api)        exit 1 on any failure
//
// 1. The deck script parses and its Component constructs (same harness as extract-defaults.js).
// 2. Every module (tms/wms/oms) has the fields the admin, the deck and the kit rely on, with the right types:
//    num "NN", name, tag, problem.heading, benefit.bullets[], demo.caption, demo.anim (unique, non-empty),
//    demo.liveUrl (absolute https URL on app.freightpop.com), roi.stat/statLabel, roi.ev.grade in the known set.
// 3. defaults.json is what extract-defaults.js would write now (else: `npm run defaults` and commit it).
// 4. The published deck-config-api revision carries the same module liveUrls as the deck defaults (drift = warning:
//    the admin may override on purpose) and no module is left without one (failure).
// The route-level check (does #/wms/receipts exist in the app?) lives in the kit repo: `npm run crosscheck` there.
'use strict';
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const deckPath = process.argv[2] || path.join(__dirname, '..', '..', 'FreightPOP TMS Sales Deck v17.dc.html');
const API = process.env.DECK_CONFIG_API || 'https://deck-config-api-production.up.railway.app';
let failures = 0, warnings = 0;
const ok = m => console.log('  ✓ ' + m), bad = m => { failures++; console.log('  ✗ ' + m); }, warn = m => { warnings++; console.log('  ! ' + m); };

// 1. parse + construct
console.log(`Deck — ${path.basename(deckPath)}`);
const src = fs.readFileSync(deckPath, 'utf8');
const m = src.match(/<script type="text\/x-dc"[^>]*data-dc-script[^>]*data-props="([^"]*)"[^>]*>([\s\S]*?)<\/script>/);
if (!m) { bad('deck script block not found'); process.exit(1); }
class DCLogic { constructor() { this.props = {}; this.state = {}; } setState() {} forceUpdate() {} }
const noop = () => {}; const el = () => ({ style: {}, addEventListener: noop, removeEventListener: noop, querySelector: () => null, querySelectorAll: () => [] });
const win = { addEventListener: noop, removeEventListener: noop, localStorage: { getItem: () => null, setItem: noop }, location: { search: '' }, innerWidth: 1440, innerHeight: 810, document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, addEventListener: noop, body: el() } };
let c;
try {
  const Component = new Function('DCLogic', 'StreamableLogic', 'React', 'window', 'document', 'localStorage', m[2] + '; return Component;')(DCLogic, DCLogic, {}, win, win.document, win.localStorage);
  c = new Component(); ok(`script parses and constructs (${(m[2].length / 1024).toFixed(0)} KB)`);
} catch (e) { bad(`deck script does not run: ${e.message}`); process.exit(1); }

// 2. module shape
const GRADES = new Set(['Platform', 'Reported', 'Modeled', 'Measured', 'Customer', 'Verified']);
const systems = { tms: c.features, wms: c.wmsFeatures, oms: c.omsFeatures };
const anims = new Map(); let count = 0;
const isStr = v => typeof v === 'string' && v.trim().length > 0;
for (const [sys, list] of Object.entries(systems)) {
  if (!Array.isArray(list) || !list.length) { bad(`${sys}: no modules array`); continue; }
  for (const f of list) {
    count++; const id = `${sys} ${f.num} ${f.name}`; const errs = [];
    if (!/^\d{2}$/.test(String(f.num))) errs.push('num must be "NN"');
    for (const k of ['name', 'tag']) if (!isStr(f[k])) errs.push(`${k} missing`);
    if (!f.problem || !isStr(f.problem.heading)) errs.push('problem.heading missing');
    if (!f.benefit || !Array.isArray(f.benefit.bullets) || !f.benefit.bullets.length) errs.push('benefit.bullets empty');
    if (!f.demo || !isStr(f.demo.caption)) errs.push('demo.caption missing');
    if (!f.demo || !isStr(f.demo.anim)) errs.push('demo.anim missing'); else { if (anims.has(f.demo.anim)) errs.push(`demo.anim "${f.demo.anim}" duplicates ${anims.get(f.demo.anim)}`); anims.set(f.demo.anim, id); }
    if (!f.demo || !isStr(f.demo.liveUrl)) errs.push('demo.liveUrl missing (module would fall back to the system default)');
    else { let u = null; try { u = new URL(f.demo.liveUrl); } catch {} if (!u || u.protocol !== 'https:' || u.host !== 'app.freightpop.com' || !u.pathname.startsWith('/app') || !u.hash.startsWith('#/')) errs.push(`demo.liveUrl not an https://app.freightpop.com/app/#/… URL: ${f.demo.liveUrl}`); }
    if (!f.roi || !isStr(f.roi.stat) || !isStr(f.roi.statLabel)) errs.push('roi.stat/statLabel missing');
    if (!f.roi || !f.roi.ev || !GRADES.has(f.roi.ev.grade)) errs.push(`roi.ev.grade "${f.roi && f.roi.ev && f.roi.ev.grade}" not in ${[...GRADES].join('/')}`);
    if (errs.length) bad(`${id}: ${errs.join('; ')}`);
  }
}
if (count) ok(`${count} modules (${Object.entries(systems).map(([s, l]) => `${s} ${(l || []).length}`).join(', ')}) — shape OK where not listed above`);
for (const [k, v] of Object.entries(c.LIVE_URLS || {})) { try { const u = new URL(v); if (u.host !== 'app.freightpop.com') throw 0; } catch { bad(`LIVE_URLS.${k} invalid: ${v}`); } }
if (!c.ROI_URL || !/^https:\/\//.test(c.ROI_URL)) bad(`ROI_URL invalid: ${c.ROI_URL}`);

// 3. defaults.json in sync
console.log('\ndefaults.json');
const defaultsPath = path.join(__dirname, '..', 'defaults.json');
const tmp = path.join(require('os').tmpdir(), `fp-deck-defaults-${process.pid}.json`);
try {
  // extract-defaults writes to ../defaults.json; run it against a copy of the tree is overkill — re-run it and diff the result with git.
  const before = fs.readFileSync(defaultsPath, 'utf8');
  execFileSync(process.execPath, [path.join(__dirname, 'extract-defaults.js'), deckPath], { stdio: 'ignore' });
  const after = fs.readFileSync(defaultsPath, 'utf8');
  if (before === after) ok('defaults.json matches the deck');
  else { fs.writeFileSync(tmp, after); fs.writeFileSync(defaultsPath, before); bad(`defaults.json is stale — run \`npm run defaults\` and commit it (fresh copy left at ${tmp})`); }
} catch (e) { bad(`could not regenerate defaults: ${e.message}`); }

// 4. published config
(async () => {
  console.log(`\nPublished config — ${API}`);
  try {
    const live = await (await fetch(API + '/api/config')).json();
    console.log(`  revision ${live.version} (${live.updatedAt})`);
    let drift = 0, missing = 0;
    for (const [sys, list] of Object.entries(systems)) {
      const pubMods = (((live.data || {}).systems || {})[sys] || {}).modules || [];
      for (const f of list || []) {
        const p = pubMods.find(x => x.num === f.num);
        if (!p) { warn(`${sys} ${f.num} not in the published config (new module? publish a revision)`); continue; }
        const pu = (p.demo || {}).liveUrl || '';
        if (!pu) { missing++; bad(`${sys} ${f.num} ${p.name}: published liveUrl empty`); }
        else if (pu !== f.demo.liveUrl) { drift++; warn(`${sys} ${f.num} ${p.name}: published ${pu} ≠ deck default ${f.demo.liveUrl}`); }
      }
    }
    if (!drift && !missing) ok('published module liveUrls = deck defaults');
  } catch (e) { warn(`published config not reachable: ${e.message}`); }
  console.log(`\n${failures ? `✗ ${failures} failed` : '✓ all checks passed'}${warnings ? `, ${warnings} warning${warnings > 1 ? 's' : ''}` : ''}`);
  process.exit(failures ? 1 : 0);
})();
