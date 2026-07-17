#!/usr/bin/env node
/**
 * build-workflows.js — generate the shipping-workflow EXPLAINER videos.
 *
 *   node tools/build-workflows.js      (or: npm run workflows)
 *
 * Each tools/workflows/definitions/<slug>.json {meta, phases[]} is injected into
 * tools/workflows/explainer-template.html → modules/workflows/<slug>.html: a
 * step-by-step animated explainer (same engine/look as the route-optimization
 * video — dashboard mockup, phase pipeline, step captions, chapters, control
 * bar, presenter sync, auto-pause, white/dark theme). Chapters = phases.
 *
 * Cross-checks src-deck/content/workflows.json (item slug ↔ generated file).
 * Edit the definitions (phases/steps/branches) and re-run.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { validate } = require('./workflows/lib/schema');

const ROOT = path.join(__dirname, '..');
const DEFS = path.join(ROOT, 'tools', 'workflows', 'definitions');
const TEMPLATE = path.join(ROOT, 'tools', 'workflows', 'explainer-template.html');
const OUT = path.join(ROOT, 'modules', 'workflows');
const LOGO_FILE = path.join(ROOT, 'src-deck', 'assets', '25e71771-bccb-4402-bdd9-42e9e67ab502.png');

function fail(msg) { console.error('✖ ' + msg); process.exit(1); }

fs.mkdirSync(OUT, { recursive: true });
const tpl = fs.readFileSync(TEMPLATE, 'utf8');
const logo = fs.existsSync(LOGO_FILE) ? 'data:image/png;base64,' + fs.readFileSync(LOGO_FILE).toString('base64') : '';

const defs = fs.readdirSync(DEFS).filter((f) => f.endsWith('.json')).sort();
if (!defs.length) fail('no definitions in tools/workflows/definitions/');

const built = [];
for (const file of defs) {
  const slug = file.replace(/\.json$/, '');
  let data;
  try { data = JSON.parse(fs.readFileSync(path.join(DEFS, file), 'utf8')); } catch (e) { fail(file + ': invalid JSON — ' + e.message); }
  const errors = validate(data);
  if (errors && errors.length) fail(file + ': schema errors —\n  ' + errors.join('\n  '));

  const wf = { meta: data.meta, phases: data.phases, channel: 'fp-wf-' + slug + '-video-sync' };
  const json = JSON.stringify(wf).replace(/<\//g, '<\\/'); // never terminate the <script> early
  let html = tpl.replace('@@WF_DATA@@', () => json).replace('@@LOGO@@', () => logo);
  if (html.includes('@@WF_DATA@@') || html.includes('@@LOGO@@')) fail(slug + ': template markers not replaced');

  fs.writeFileSync(path.join(OUT, slug + '.html'), html);
  built.push(slug);
  console.log('✔ modules/workflows/' + slug + '.html (' + data.phases.length + ' phases) — ' + (data.meta.title || slug));
}

// ── cross-check the deck's content JSON ───────────────────────────────────
const contentPath = path.join(ROOT, 'src-deck', 'content', 'workflows.json');
if (fs.existsSync(contentPath)) {
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  const slugs = (content.items || []).map((i) => i.slug);
  const missing = slugs.filter((s) => !built.includes(s));
  if (missing.length) fail('content/workflows.json references slugs with no generated diagram: ' + missing.join(', '));
  const orphans = built.filter((s) => !slugs.includes(s));
  if (orphans.length) console.warn('  ⚠ generated but not referenced by content/workflows.json: ' + orphans.join(', '));
  console.log('✔ content cross-check: ' + slugs.length + ' cards ↔ diagrams OK');
}
console.log('Done — ' + built.length + ' workflow explainer(s).');
