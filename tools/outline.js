#!/usr/bin/env node
/**
 * outline.js — round-trip the deck's marketing copy through OUTLINE.md.
 *
 *   node tools/outline.js export   → write OUTLINE.md from src-deck/content/*.json
 *   node tools/outline.js apply    → parse OUTLINE.md back into the content JSON
 *                                    (then `npm run bundle` regenerates the deck)
 *
 * Marketing edits ONLY the text in OUTLINE.md. Structure lines (## / ### / the
 * bold field labels) are anchors the parser needs — the text after them is fair
 * game. Technical fields (embeds, progress %, asset paths) stay in the JSON and
 * never appear in the outline.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'src-deck', 'content');
const OUTLINE = path.join(ROOT, 'OUTLINE.md');

const SYSTEMS = [
  { key: 'TMS', file: 'features-tms.json', label: 'TMS — Transportation Management' },
  { key: 'WMS', file: 'features-wms.json', label: 'WMS — Warehouse Management' },
  { key: 'OMS', file: 'features-oms.json', label: 'OMS — Order Management' },
  { key: 'NETSUITE', file: 'features-netsuite.json', label: 'NETSUITE — ERP Demo Track' },
];

const readJson = (f) => JSON.parse(fs.readFileSync(path.join(CONTENT, f), 'utf8'));
const writeJson = (f, d) => fs.writeFileSync(path.join(CONTENT, f), JSON.stringify(d, null, 2) + '\n');
// Values live on one line in the outline; strip newlines so the parser stays line-based.
const oneLine = (s) => String(s == null ? '' : s).replace(/\s*\n\s*/g, ' ').trim();

// ── export ───────────────────────────────────────────────────────────────────
function exportOutline() {
  const steps = readJson('step-names.json');
  const sys = readJson('sys-data.json');
  const L = [];

  L.push('# FreightPOP TMS Deck — Content Outline');
  L.push('');
  L.push('> **For marketing:** edit any text AFTER a `**Label:**` or list dash — that copy');
  L.push('> flows straight back into the presentation. Do not delete or reword the');
  L.push('> heading lines (`##`, `###`) or the bold labels themselves; the regenerator');
  L.push('> uses them as anchors. Bullets can be added/removed freely.');
  L.push('>');
  L.push('> **To regenerate the deck after editing:**');
  L.push('> `node tools/outline.js apply && npm run bundle`');
  L.push('> then reload the presentation (R in the presenter view).');
  L.push('');
  L.push(`- **Four step labels (every module):** ${steps.join(' · ')}`);
  L.push('');

  for (const s of SYSTEMS) {
    const mods = readJson(s.file);
    L.push(`# ${s.label}`);
    L.push('');

    // System hub screen (wms/oms have one; tms is the main deck)
    const hub = sys[s.key.toLowerCase()];
    if (hub) {
      L.push(`## ${s.key} HUB — ${oneLine(hub.name)}`);
      L.push(`- **Kicker:** ${oneLine(hub.kicker)}`);
      L.push(`- **Intro:** ${oneLine(hub.intro)}`);
      for (const c of hub.cards || []) {
        L.push(`- **Card ${c.num}:** ${oneLine(c.title)} — ${oneLine(c.tag)}`);
      }
      L.push('');
    }

    for (const m of mods) {
      // Emit a field line only when the source value exists — apply() only
      // touches fields whose line is present, so nulls survive the round trip.
      const F = (label, v) => { if (v != null) L.push(`- **${label}:** ${oneLine(v)}`); };
      L.push(`## ${s.key} ${m.num} — ${oneLine(m.name)}`);
      F('Title line 1', m.t1);
      F('Title line 2', m.t2);
      F('Tagline', m.tag);
      L.push('### Problem');
      F('Heading', m.problem?.heading);
      F('Body', m.problem?.body);
      F('Quote', m.problem?.quote?.text);
      F('Quote by', m.problem?.quote?.who);
      L.push('### Benefit');
      F('Heading', m.benefit?.heading);
      for (const b of m.benefit?.bullets || []) L.push(`- ${oneLine(b)}`);
      L.push('### Live Demo');
      F('Caption', m.demo?.caption);
      L.push('### Validation');
      F('Stat', m.roi?.stat);
      F('Stat label', m.roi?.statLabel);
      F('Proof', m.roi?.proof);
      L.push('');
    }
  }

  fs.writeFileSync(OUTLINE, L.join('\n'));
  console.log(`✔ Wrote ${path.relative(ROOT, OUTLINE)} (${SYSTEMS.map(s => `${readJson(s.file).length} ${s.key}`).join(', ')} modules)`);
}

// ── apply ────────────────────────────────────────────────────────────────────
function applyOutline() {
  if (!fs.existsSync(OUTLINE)) { console.error('OUTLINE.md not found — run `node tools/outline.js export` first.'); process.exit(1); }
  const lines = fs.readFileSync(OUTLINE, 'utf8').split('\n');

  const field = (l) => { const m = l.match(/^- \*\*([^*]+):\*\*\s*(.*)$/); return m ? { label: m[1].trim(), value: m[2].trim() } : null; };

  const data = {}; // key -> modules array
  for (const s of SYSTEMS) data[s.key] = readJson(s.file);
  const sys = readJson('sys-data.json');
  let steps = readJson('step-names.json');

  let curMod = null;       // module object being filled
  let curHub = null;       // hub object being filled
  let curStep = null;      // 'Problem' | 'Benefit' | 'Live Demo' | 'Validation'
  let bullets = null;      // collected benefit bullets
  const flushBullets = () => { if (curMod && bullets) curMod.benefit.bullets = bullets; bullets = null; };
  let applied = 0;

  for (const raw of lines) {
    const l = raw.trimEnd();

    let m = l.match(/^## (TMS|WMS|OMS|NETSUITE) HUB — /);
    if (m) { flushBullets(); curMod = null; curStep = null; curHub = sys[m[1].toLowerCase()]; curHub._cards = 0; continue; }

    m = l.match(/^## (TMS|WMS|OMS|NETSUITE) (\d+) — (.*)$/);
    if (m) {
      flushBullets(); curHub = null; curStep = null;
      curMod = (data[m[1]] || []).find(x => x.num === m[2]);
      if (!curMod) { console.warn(`⚠ ${m[1]} ${m[2]} not found in JSON — skipped`); continue; }
      curMod.name = m[3].trim(); applied++;
      continue;
    }

    m = l.match(/^### (Problem|Benefit|Live Demo|Validation)$/);
    if (m) { flushBullets(); curStep = m[1]; continue; }
    if (l.startsWith('# ')) { flushBullets(); curMod = null; curHub = null; curStep = null; continue; }

    const f = field(l);

    if (f && f.label === 'Four step labels (every module)') {
      const parts = f.value.split('·').map(x => x.trim()).filter(Boolean);
      if (parts.length === 4) steps = parts;
      continue;
    }

    if (curHub) {
      if (!f) continue;
      if (f.label === 'Kicker') curHub.kicker = f.value;
      else if (f.label === 'Intro') curHub.intro = f.value;
      else {
        const cm = f.label.match(/^Card (\d+)$/);
        if (cm) {
          const card = (curHub.cards || []).find(c => c.num === cm[1]);
          const [title, ...rest] = f.value.split('—');
          if (card && title) { card.title = title.trim(); if (rest.length) card.tag = rest.join('—').trim(); }
        }
      }
      continue;
    }

    if (!curMod) continue;

    if (curStep === 'Benefit' && !f && l.startsWith('- ')) { (bullets = bullets || []).push(l.slice(2).trim()); continue; }
    if (!f) continue;

    if (!curStep) {
      if (f.label === 'Title line 1') curMod.t1 = f.value;
      else if (f.label === 'Title line 2') curMod.t2 = f.value;
      else if (f.label === 'Tagline') curMod.tag = f.value;
    } else if (curStep === 'Problem') {
      curMod.problem = curMod.problem || {};
      if (f.label === 'Heading') curMod.problem.heading = f.value;
      else if (f.label === 'Body') curMod.problem.body = f.value;
      else if (f.label === 'Quote') { curMod.problem.quote = curMod.problem.quote || {}; curMod.problem.quote.text = f.value; }
      else if (f.label === 'Quote by') { curMod.problem.quote = curMod.problem.quote || {}; curMod.problem.quote.who = f.value; }
    } else if (curStep === 'Benefit') {
      if (f.label === 'Heading') { curMod.benefit = curMod.benefit || {}; curMod.benefit.heading = f.value; }
    } else if (curStep === 'Live Demo') {
      if (f.label === 'Caption') { curMod.demo = curMod.demo || {}; curMod.demo.caption = f.value; }
    } else if (curStep === 'Validation') {
      curMod.roi = curMod.roi || {};
      if (f.label === 'Stat') curMod.roi.stat = f.value;
      else if (f.label === 'Stat label') curMod.roi.statLabel = f.value;
      else if (f.label === 'Proof') curMod.roi.proof = f.value;
    }
  }
  flushBullets();

  for (const s of SYSTEMS) writeJson(s.file, data[s.key]);
  for (const k of Object.keys(sys)) delete sys[k]._cards;
  writeJson('sys-data.json', sys);
  writeJson('step-names.json', steps);
  console.log(`✔ Applied OUTLINE.md → src-deck/content/ (${applied} modules). Now run: npm run bundle`);
}

const cmd = process.argv[2];
if (cmd === 'export') exportOutline();
else if (cmd === 'apply') applyOutline();
else { console.log('Usage: node tools/outline.js export|apply'); process.exit(1); }
