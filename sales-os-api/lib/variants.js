'use strict';
// Deck versions ("variants"): thin overlays an AE keeps on top of the published base config.
// Each lives at DATA_DIR/variants/<slug>.json:
//   { slug, name, owner, note, createdAt, updatedAt, updatedBy,
//     overlay: { nav?, controls?, settings?, labels?, pages?, ui?, systems?, workflows?, roadmap?, onboarding? }   (partial — merged over the base)
//     slides:  [ { id, label, sub, enabled, pages: [ { eyebrow, h1, lede, bullets:[], image, embed } ] } ] }        (custom tabs the base doesn't have)
// The deck asks for /api/config?v=<slug> and gets base ⊕ overlay, plus `slides` and a nav entry per slide deck.
// Publishing a new base never touches a variant: the merge is done at read time, so AEs never regenerate anything.
const fs = require('fs'), path = require('path');
const { merge, clone } = require('./merge');
const store = require('./store');
const DIR = path.join(store.DIR, 'variants');
fs.mkdirSync(DIR, { recursive: true });

const SLUG_RE = /^[a-z0-9][a-z0-9-]{1,48}$/;
const isSlug = s => SLUG_RE.test(String(s || ''));
const slugify = s => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
const file = slug => path.join(DIR, slug + '.json');
const now = () => new Date().toISOString();

function read(slug) { if (!isSlug(slug)) return null; try { return JSON.parse(fs.readFileSync(file(slug), 'utf8')); } catch { return null; } }
function list() {
  return fs.readdirSync(DIR).filter(f => f.endsWith('.json')).map(f => read(f.slice(0, -5))).filter(Boolean)
    .map(v => ({ slug: v.slug, name: v.name, owner: v.owner || '', note: v.note || '', createdAt: v.createdAt, updatedAt: v.updatedAt, updatedBy: v.updatedBy || '', slideDecks: (v.slides || []).length, slidePages: (v.slides || []).reduce((n, d) => n + ((d.pages || []).length), 0), tabsOff: ((v.overlay || {}).nav || []).filter(n => n.enabled === false).length }))
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
}
function writeAtomic(f, obj) { const tmp = f + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(obj, null, 2)); fs.renameSync(tmp, f); }

// Only the fields an AE may set; everything else is derived.
function sanitizeSlides(slides) {
  if (!Array.isArray(slides)) return [];
  const seen = new Set();
  return slides.map((d, i) => {
    let id = slugify(d.id || d.label || 'slides-' + (i + 1)) || 'slides-' + (i + 1);
    while (seen.has(id)) id += '-2'; seen.add(id);
    return { id, label: String(d.label || 'Custom').slice(0, 60), sub: String(d.sub || '').slice(0, 120), enabled: d.enabled !== false,
      pages: (Array.isArray(d.pages) ? d.pages : []).map(p => ({ eyebrow: String(p.eyebrow || '').slice(0, 120), h1: String(p.h1 || '').slice(0, 200), lede: String(p.lede || '').slice(0, 1200),
        bullets: (Array.isArray(p.bullets) ? p.bullets : []).map(b => String(b).slice(0, 400)).filter(Boolean).slice(0, 12), image: String(p.image || '').slice(0, 2000), embed: String(p.embed || '').slice(0, 2000) })) };
  });
}
function save(slug, body, by) {
  if (!isSlug(slug)) throw Object.assign(new Error('slug must be 2-49 chars: a-z 0-9 -'), { status: 400 });
  const prev = read(slug);
  const overlay = body.overlay && typeof body.overlay === 'object' && !Array.isArray(body.overlay) ? clone(body.overlay) : (prev ? prev.overlay : {});
  if (overlay && overlay.slides !== undefined) delete overlay.slides; // slides are top-level on the variant, never in the overlay
  const doc = { slug, name: String(body.name || (prev && prev.name) || slug).slice(0, 80), owner: String(body.owner ?? (prev ? prev.owner : '') ?? '').slice(0, 120), note: String(body.note ?? (prev ? prev.note : '') ?? '').slice(0, 400),
    createdAt: prev ? prev.createdAt : now(), updatedAt: now(), updatedBy: by || 'admin', overlay: overlay || {}, slides: sanitizeSlides(body.slides !== undefined ? body.slides : (prev ? prev.slides : [])) };
  writeAtomic(file(slug), doc);
  return doc;
}
function remove(slug) { if (!isSlug(slug)) return false; try { fs.unlinkSync(file(slug)); return true; } catch { return false; } }
function cloneTo(fromSlug, toSlug, name, by) { const src = read(fromSlug); if (!src) return null; return save(toSlug, { name: name || (src.name + ' (copy)'), owner: src.owner, note: src.note, overlay: src.overlay, slides: src.slides }, by); }

// base (already defaults ⊕ stored) ⊕ variant overlay, + slides, + a nav entry for every slide deck the overlay's nav doesn't already place
function resolve(baseData, variant) {
  const ov = Object.assign({}, variant.overlay || {}); const ovNav = Array.isArray(ov.nav) ? ov.nav : null; delete ov.nav;
  const data = merge(baseData, ov);
  if (ovNav) {
    const baseNav = Array.isArray(data.nav) ? data.nav : [];
    const full = baseNav.every(b => ovNav.some(n => n.key === b.key));
    // a full list (what the admin writes) sets the order; a partial one patches rows in place so the top bar keeps the base order
    data.nav = full ? ovNav.map(n => Object.assign({}, baseNav.find(b => b.key === n.key) || {}, n))
      : baseNav.map(b => Object.assign({}, b, ovNav.find(n => n.key === b.key) || {})).concat(ovNav.filter(n => !baseNav.some(b => b.key === n.key)).map(clone));
  }
  const slides = (variant.slides || []).filter(d => d.enabled !== false);
  data.slides = slides;
  const nav = Array.isArray(data.nav) ? data.nav : [];
  for (const d of slides) if (!nav.some(n => n.key === 's:' + d.id)) nav.push({ key: 's:' + d.id, label: d.label, sub: d.sub || '', enabled: true });
  data.nav = nav.filter(n => !String(n.key).startsWith('s:') || slides.some(d => 's:' + d.id === n.key)); // drop nav rows for slide decks that no longer exist / are off
  return data;
}
module.exports = { DIR, isSlug, slugify, read, list, save, remove, cloneTo, resolve };
