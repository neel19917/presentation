/* Sales OS · Deck Admin — vanilla JS, no build. Talks to the deck-config-api in the same origin. */
(() => {
const API = '';
const DECK_PREVIEW = 'https://beta--fpdeck.netlify.app/deck';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = { token: localStorage.getItem('fp_admin_token') || '', cfg: null, meta: null, defaults: null, dirty: false, section: localStorage.getItem('fp_admin_section') || 'settings', open: {}, revisions: [], variants: null, v: null, vDirty: false, share: { go: '', lock: false, flags: [], tabs: null, filter: '' }, links: null, shortBase: '', linkOpen: null, linkDetail: null };
const app = $('#app');

// ---------- api ----------
async function api(path, opts = {}) {
  const r = await fetch(API + path, Object.assign({ headers: Object.assign({ 'Content-Type': 'application/json' }, S.token ? { Authorization: 'Bearer ' + S.token } : {}) }, opts));
  if (r.status === 401 && path !== '/api/login') { S.token = ''; localStorage.removeItem('fp_admin_token'); render(); throw new Error('Session expired — please log in again'); }
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error ? (j.error + (j.details ? ': ' + j.details.join('; ') : '')) : ('HTTP ' + r.status));
  return j;
}
function toast(msg, err) { const t = document.createElement('div'); t.className = 'toast' + (err ? ' err' : ''); t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), err ? 6000 : 2800); }
const get = (o, p) => p.split('.').reduce((a, k) => (a == null ? a : a[k]), o);
const set = (o, p, v) => { const ks = p.split('.'); let a = o; for (const k of ks.slice(0, -1)) { if (a[k] == null) a[k] = /^\d+$/.test(k) ? [] : {}; a = a[k]; } a[ks[ks.length - 1]] = v; };
function markDirty() { S.dirty = true; renderStatus(); }

// ---------- boot ----------
async function boot() {
  if (!S.token) return render();
  try { await api('/api/session'); await load(); } catch (e) { S.token = ''; render(); }
}
async function load() {
  const [c, d] = await Promise.all([api('/api/config'), api('/api/defaults')]);
  S.cfg = c.data; S.meta = c; S.defaults = d.data; S.dirty = false; render();
}
async function publish() {
  const note = prompt('Optional note for this revision (what changed?)', '') ?? '';
  try { const r = await api('/api/config', { method: 'PUT', body: JSON.stringify({ data: S.cfg, note }) }); toast('Published · version ' + r.version); await load(); } catch (e) { toast(e.message, true); }
}
async function resetSection(section) {
  if (!confirm(`Reset ${section ? '“' + section + '”' : 'EVERYTHING'} to the deck defaults? This publishes immediately.`)) return;
  try { const r = await api('/api/config/reset', { method: 'POST', body: JSON.stringify({ section }) }); toast('Reset published · version ' + r.version); await load(); } catch (e) { toast(e.message, true); }
}

// ---------- field helpers (data-path binding) ----------
const text = (p, label, help, opts = {}) => `<div class="field"><label>${esc(label)}</label>${opts.multi ? `<textarea data-path="${p}" ${opts.rows ? 'rows="' + opts.rows + '"' : ''}>${esc(get(S.cfg, p))}</textarea>` : `<input type="text" data-path="${p}" value="${esc(get(S.cfg, p))}">`}${help ? `<div class="help">${esc(help)}</div>` : ''}</div>`;
const num = (p, label, min, max, step, help) => `<div class="field"><label>${esc(label)}</label><div class="range"><input type="range" data-path="${p}" data-type="number" min="${min}" max="${max}" step="${step}" value="${get(S.cfg, p)}"><span class="val" data-val="${p}">${get(S.cfg, p)}</span></div>${help ? `<div class="help">${esc(help)}</div>` : ''}</div>`;
const toggle = (p, label, help) => `<div class="field"><label class="toggle"><input type="checkbox" data-path="${p}" data-type="bool" ${get(S.cfg, p) ? 'checked' : ''}><span class="sw"></span><span>${esc(label)}</span></label>${help ? `<div class="help">${esc(help)}</div>` : ''}</div>`;
const select = (p, label, options, help) => `<div class="field"><label>${esc(label)}</label><select data-path="${p}">${options.map(o => `<option value="${esc(o[0])}" ${String(get(S.cfg, p)) === String(o[0]) ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select>${help ? `<div class="help">${esc(help)}</div>` : ''}</div>`;
const listBullets = (p, label) => { const arr = get(S.cfg, p) || []; return `<div class="field"><label>${esc(label)}</label><div class="bullets">${arr.map((b, i) => `<div class="b"><input type="text" data-path="${p}.${i}" value="${esc(b)}"><button class="btn sm danger" data-action="rm" data-list="${p}" data-i="${i}" title="Remove">✕</button></div>`).join('')}<div><button class="btn sm" data-action="add" data-list="${p}">+ Add line</button></div></div></div>`; };
const rowActs = (listPath, i, len, editKey) => `<div class="acts"><button data-action="up" data-list="${listPath}" data-i="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">↑</button><button data-action="down" data-list="${listPath}" data-i="${i}" ${i === len - 1 ? 'disabled' : ''} title="Move down">↓</button>${editKey ? `<button class="edit" data-action="toggle-edit" data-key="${editKey}">${S.open[editKey] ? 'Close' : 'Edit'}</button>` : ''}</div>`;
const enable = (p) => `<label class="toggle" title="Show / hide"><input type="checkbox" data-path="${p}" data-type="bool" ${get(S.cfg, p) ? 'checked' : ''}><span class="sw"></span></label>`;

// ---------- sections ----------
const SECTIONS = [
  ['grp', 'Deck'], ['settings', 'Settings & links'], ['nav', 'Tabs & navigation'], ['ui', 'Appearance & size'], ['controls', 'Presentation controls'], ['labels', 'Labels & text'], ['pages', 'Page headings'],
  ['grp', 'Modules'], ['tms', 'TMS modules'], ['wms', 'WMS modules'], ['oms', 'OMS modules'],
  ['grp', 'Sections'], ['roadmap', 'Roadmap'], ['onboarding', 'Onboarding'], ['workflows', 'Workflows'],
  ['grp', 'Versions & links'], ['versions', 'Deck versions'], ['links', 'Share & track links'],
  ['grp', 'System'], ['history', 'History & reset']
];
const counts = () => ({ versions: S.variants ? String(S.variants.length) : '', tms: S.cfg.systems.tms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.tms.modules.length, wms: S.cfg.systems.wms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.wms.modules.length, oms: S.cfg.systems.oms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.oms.modules.length, nav: S.cfg.nav.filter(n => n.enabled).length + '/' + S.cfg.nav.length, workflows: S.cfg.workflows.filter(w => w.enabled).length + '/' + S.cfg.workflows.length });

function sectionSettings() {
  return `<div class="eyebrow">Settings & links</div><h1>Where the deck points</h1>
  <div class="card"><h3>Embedded experiences</h3><p class="hint">Full-screen iframes the deck opens. Must allow embedding (X-Frame-Options / CSP).</p><div class="grid2">
    ${text('settings.startUrl', 'Interactive walkthrough URL')}${text('settings.mainMenuUrl', 'Main menu graphic URL')}${text('settings.aiUrl', 'FreightPOP AI URL')}${text('settings.liveSiteUrl', 'Live Site (nav pill) URL')}${text('settings.roiUrl', 'ROI intake form URL', 'Opens in a new tab')}
  </div></div>
  <div class="card"><h3>Live app deep links (per system)</h3><p class="hint">Used by the “Live Site” tab inside a module when the module has no link of its own.</p><div class="grid3">${text('settings.liveUrls.tms', 'TMS')}${text('settings.liveUrls.wms', 'WMS')}${text('settings.liveUrls.oms', 'OMS')}</div></div>
  <div class="card"><h3>Intro screen</h3><div class="grid2">${text('settings.intro.headline', 'Headline')}${text('settings.intro.subtitle', 'Subtitle')}${text('settings.intro.cta', 'Button label')}${text('settings.intro.urlCaption', 'Top-left caption')}</div><div style="margin-top:12px">${toggle('settings.showMarquee', 'Show customer-logo marquee at the bottom of the intro')}</div></div>`;
}
function sectionNav() {
  const nav = S.cfg.nav;
  return `<div class="eyebrow">Tabs & navigation</div><h1>Top-bar tabs and Jump-to menu</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">Toggle a tab off to hide it from the top bar and the Jump-to menu. Reorder with the arrows. The label is what the tab says; the subtitle shows on its Jump-to tile.</p>
  <div class="list">${nav.map((n, i) => `<div class="row ${n.enabled ? '' : 'off'}"><span class="num">${String(i + 1).padStart(2, '0')}</span><div class="grid2" style="gap:8px 12px"><div class="field"><label>Tab label · <span style="color:var(--teal)">${esc(n.key)}</span></label><input type="text" data-path="nav.${i}.label" value="${esc(n.label)}"></div><div class="field"><label>Jump-to subtitle</label><input type="text" data-path="nav.${i}.sub" value="${esc(n.sub || '')}"></div></div><div class="acts">${enable('nav.' + i + '.enabled')}${rowActs('nav', i, nav.length)}</div></div>`).join('')}</div>`;
}
function sectionUi() {
  return `<div class="eyebrow">Appearance & size</div><h1>Make things bigger or smaller</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">Scales are multipliers (1.0 = as designed). They apply live the next time the deck loads.</p>
  <div class="card"><h3>Global</h3><div class="grid2">${num('ui.uiScale', 'Whole deck scale', 0.7, 1.4, 0.05, 'Scales every screen — use for small laptops or big projectors')}${num('ui.navScale', 'Top bar scale', 0.8, 1.4, 0.05)}</div></div>
  <div class="card"><h3>Hubs (TMS / WMS / OMS / Workflows)</h3><div class="grid3">${num('ui.hubScale', 'Hub content scale', 0.7, 1.4, 0.05)}${select('ui.hubColumns', 'Card columns', [[2, '2 columns'], [3, '3 columns'], [4, '4 columns']])}${num('ui.cardMinHeight', 'Card min height (px)', 140, 280, 10)}</div></div>
  <div class="card"><h3>Module pages</h3><div class="grid3">${num('ui.featureScale', 'Module page scale', 0.7, 1.4, 0.05, 'Problem / Benefit / Validation content')}${num('ui.demoMaxWidth', 'Demo stage width (px)', 760, 1400, 20)}${num('ui.demoScale', 'Demo stage scale', 0.7, 1.3, 0.05)}${num('ui.statSize', 'Validation stat size (px)', 48, 140, 2)}</div></div>
  <div class="card"><h3>Intro</h3><div class="grid2">${num('ui.introHeadlineSize', 'Headline size (px)', 60, 160, 2)}${num('ui.introSubtitleSize', 'Subtitle size (px)', 20, 56, 1)}</div></div>`;
}
function sectionControls() {
  return `<div class="eyebrow">Presentation controls</div><h1>How the deck behaves in the room</h1>
  <div class="card"><h3>Start & navigation</h3><div class="grid2">${select('controls.startView', 'Start screen', [['intro', 'Intro (animated hero)'], ['explore', 'Interactive walkthrough'], ['mainmenu', 'Main menu'], ['hub', 'TMS module hub']])}${toggle('controls.keyboardNav', 'Arrow-key / Esc navigation', 'Turn off if a clicker sends stray keys')}</div></div>
  <div class="card"><h3>Chrome</h3><div class="grid3">${toggle('controls.showBreadcrumb', 'Breadcrumb in top bar')}${toggle('controls.showLiveSitePill', '“Live Site” pill in top bar')}${toggle('controls.showMenuButton', '“Menu” (Jump-to) button')}${toggle('controls.showStepDots', 'Step dots under module pages')}${toggle('controls.showPagingArrows', 'Prev / Next arrows on module pages')}${toggle('controls.showFullscreenPills', '“⛶ Fullscreen” pills on embedded screens')}</div></div>
  <div class="card"><h3>Live Demo step</h3><div class="grid3">${toggle('controls.showAiDemoTab', '“✦ AI Demo” tab (where available)')}${toggle('controls.showLiveSiteTab', '“Live Site ↗” tab')}${toggle('controls.showExpandTab', '“⛶ Expand” tab')}${toggle('controls.demoAutoPlay', 'Demos auto-play on open')}${num('controls.demoSpeed', 'Demo playback speed', 0.5, 2, 0.25)}${toggle('controls.showValidationLibrary', 'Open Validation Library on step 4', 'Off = show the ROI layout directly')}</div></div>`;
}
function sectionLabels() {
  const L = 'labels.';
  return `<div class="eyebrow">Labels & text</div><h1>Buttons, step tabs and small labels</h1>
  <div class="card"><h3>Step tabs (module pages)</h3><div class="grid2">${[0, 1, 2, 3].map(i => text(L + 'steps.' + i, 'Step ' + (i + 1) + ' tab')).join('')}${[0, 1, 2, 3].map(i => text(L + 'stepEyebrows.' + i, 'Step ' + (i + 1) + ' eyebrow')).join('')}</div></div>
  <div class="card"><h3>Buttons</h3><div class="grid3">${text(L + 'back', 'Back')}${text(L + 'menu', 'Menu')}${text(L + 'liveSite', 'Live Site pill')}${text(L + 'backToModule', 'Back to module (library)')}${text(L + 'allModules', 'All modules')}${text(L + 'nextModule', 'Next module')}${text(L + 'backToModules', 'Back to modules (last module)')}${text(L + 'openCard', 'Hub card link')}${text(L + 'watchCard', 'Workflow card link')}</div></div>
  <div class="card"><h3>Live Demo tabs</h3><div class="grid2">${text(L + 'demoTabs.walkthrough', 'Walkthrough')}${text(L + 'demoTabs.ai', 'AI demo')}${text(L + 'demoTabs.live', 'Live site')}${text(L + 'demoTabs.expand', 'Expand')}</div></div>`;
}
function sectionPages() {
  return `<div class="eyebrow">Page headings</div><h1>Hub and section copy</h1>
  <div class="card"><h3>TMS hub</h3><div class="grid2">${text('pages.tms.eyebrow', 'Eyebrow')}${text('systems.tms.name', 'Title (H1)')}</div>${text('systems.tms.intro', 'Lede', '', { multi: true })}</div>
  <div class="card"><h3>WMS hub</h3><div class="grid2">${text('systems.wms.kicker', 'Eyebrow (after “FreightPOP WMS ·”)')}${text('systems.wms.name', 'Title (H1)')}</div>${text('systems.wms.intro', 'Lede', '', { multi: true })}</div>
  <div class="card"><h3>OMS hub</h3><div class="grid2">${text('systems.oms.kicker', 'Eyebrow (after “FreightPOP OMS ·”)')}${text('systems.oms.name', 'Title (H1)')}</div>${text('systems.oms.intro', 'Lede', '', { multi: true })}</div>
  ${['workflows', 'roadmap', 'onboarding'].map(k => `<div class="card"><h3>${k[0].toUpperCase() + k.slice(1)}</h3><div class="grid2">${text('pages.' + k + '.eyebrow', 'Eyebrow')}${text('pages.' + k + '.h1', 'Title (H1)')}</div>${text('pages.' + k + '.lede', 'Lede', k === 'workflows' ? '{count} is replaced with the number of enabled workflows' : '', { multi: true })}${k === 'roadmap' ? `<div class="grid2" style="margin-top:12px">${text('pages.roadmap.aiTitle', 'AI track title')}${text('pages.roadmap.platformTitle', 'Platform track title')}</div>` : ''}</div>`).join('')}`;
}
function sectionModules(sys) {
  const base = `systems.${sys}.modules`; const mods = get(S.cfg, base);
  const names = { tms: 'TMS', wms: 'WMS', oms: 'OMS' };
  return `<div class="eyebrow">${names[sys]} modules</div><h1>${esc(get(S.cfg, 'systems.' + sys + '.name'))}</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">Toggle a module off to hide it from the hub, the Jump-to menu and arrow-key paging. Reorder with the arrows. “Edit” opens every piece of copy for the four steps.</p>
  <div class="list">${mods.map((m, i) => { const key = sys + ':' + m.num; return `<div class="row ${m.enabled ? '' : 'off'}"><span class="num">${esc(m.num)}</span><div><div class="title">${esc(m.name)}</div><div class="sub">${esc(m.tag)}</div></div><div class="acts">${enable(base + '.' + i + '.enabled')}${rowActs(base, i, mods.length, key)}</div></div>${S.open[key] ? moduleEditor(sys, base + '.' + i, m) : ''}`; }).join('')}</div>`;
}
function moduleEditor(sys, p, m) {
  const grades = [['Measured', 'Measured'], ['Reported', 'Reported'], ['Modeled', 'Modeled'], ['Platform', 'Platform']];
  return `<div class="editor">
    <div class="grid3">${text(p + '.name', 'Module name')}${sys === 'tms' ? text(p + '.t1', 'Card title line 1') + text(p + '.t2', 'Card title line 2') : text(p + '.cardTag', 'Hub card description')}</div>
    <div style="margin-top:12px">${text(p + '.tag', 'Tagline (under the module name, uppercase)')}</div>
    <h3 style="margin:18px 0 8px"><span class="pill teal">01</span> ${esc(S.cfg.labels.stepEyebrows[0])}</h3>${text(p + '.problem.heading', 'Heading')}<div style="margin-top:8px">${text(p + '.problem.body', 'Body', '', { multi: true })}</div>
    <h3 style="margin:18px 0 8px"><span class="pill teal">02</span> ${esc(S.cfg.labels.stepEyebrows[1])}</h3>${text(p + '.benefit.heading', 'Heading')}<div style="margin-top:8px">${listBullets(p + '.benefit.bullets', 'Bullets')}</div>
    <h3 style="margin:18px 0 8px"><span class="pill teal">03</span> ${esc(S.cfg.labels.stepEyebrows[2])}</h3><div class="grid2">${text(p + '.demo.caption', 'Caption under the demo')}${text(p + '.demo.liveUrl', 'Live Site URL for this module')}${text(p + '.demo.anim', 'Demo key', 'Which cooking demo mounts (e.g. rate, rules, wreceive). Blank = placeholder card.')}${text(p + '.demo.ai', 'AI demo key', 'copilot · accessorial · consol · audit · clipRate · clipAudit — blank = no AI tab')}</div>
    <h3 style="margin:18px 0 8px"><span class="pill teal">04</span> ${esc(S.cfg.labels.stepEyebrows[3])}</h3><div class="grid3">${text(p + '.roi.stat', 'Big stat')}${text(p + '.roi.statLabel', 'Stat label')}${select(p + '.roi.ev.grade', 'Evidence grade', grades)}</div><div style="margin-top:8px">${text(p + '.roi.proof', 'Proof sentence', '', { multi: true })}</div><div class="grid2" style="margin-top:8px">${text(p + '.roi.ev.quote', 'Quote (optional)', '', { multi: true })}${text(p + '.roi.ev.who', 'Quote attribution')}</div><div style="margin-top:8px">${text(p + '.roi.ev.src', 'Source line')}</div>
  </div>`;
}
function sectionRoadmap() {
  const lane = (p, title) => { const arr = get(S.cfg, p); return `<div class="card"><h3>${esc(title)} <span class="pill">${arr.length}</span></h3><div class="list">${arr.map((r, i) => `<div class="row"><span class="num">${String(i + 1).padStart(2, '0')}</span><div class="grid2" style="gap:8px 12px"><div class="field"><label>Label</label><input type="text" data-path="${p}.${i}.label" value="${esc(r.label)}"></div><div class="field"><label>Body</label><input type="text" data-path="${p}.${i}.body" value="${esc(r.body)}"></div></div><div class="acts">${rowActs(p, i, arr.length)}<button class="btn sm danger" data-action="rm" data-list="${p}" data-i="${i}">✕</button></div></div>`).join('')}<div><button class="btn sm" data-action="add-obj" data-list="${p}" data-tpl='{"label":"New item","body":""}'>+ Add item</button></div></div></div>`; };
  return `<div class="eyebrow">Roadmap</div><h1>Two tracks</h1>${lane('roadmap.ai', S.cfg.pages.roadmap.aiTitle)}${lane('roadmap.platform', S.cfg.pages.roadmap.platformTitle)}`;
}
function sectionOnboarding() {
  const arr = S.cfg.onboarding;
  return `<div class="eyebrow">Onboarding</div><h1>Six steps</h1><div class="list">${arr.map((s, i) => `<div class="row"><span class="num">${esc(s.num)}</span><div><div class="field"><label>Step label</label><input type="text" data-path="onboarding.${i}.label" value="${esc(s.label)}"></div><div style="margin-top:8px">${listBullets('onboarding.' + i + '.lines', 'Lines')}</div></div><div class="acts">${rowActs('onboarding', i, arr.length)}<button class="btn sm danger" data-action="rm" data-list="onboarding" data-i="${i}">✕</button></div></div>`).join('')}<div><button class="btn sm" data-action="add-obj" data-list="onboarding" data-tpl='{"num":"0${arr.length + 1}","label":"New step","lines":[""]}'>+ Add step</button></div></div>`;
}
function sectionWorkflows() {
  const arr = S.cfg.workflows;
  return `<div class="eyebrow">Workflows</div><h1>Customer flows</h1><div class="list">${arr.map((w, i) => `<div class="row ${w.enabled ? '' : 'off'}"><span class="num">${esc(w.num)}</span><div class="grid2" style="gap:8px 12px"><div class="field"><label>Title</label><input type="text" data-path="workflows.${i}.title" value="${esc(w.title)}"></div><div class="field"><label>Player file / URL</label><input type="text" data-path="workflows.${i}.src" value="${esc(w.src)}"></div><div class="field" style="grid-column:1/-1"><label>Description</label><input type="text" data-path="workflows.${i}.tag" value="${esc(w.tag)}"></div></div><div class="acts">${enable('workflows.' + i + '.enabled')}${rowActs('workflows', i, arr.length)}</div></div>`).join('')}</div>`;
}
function sectionHistory() {
  return `<div class="eyebrow">History & reset</div><h1>Revisions</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">Every publish is kept (last 60). Restoring publishes that revision as a new version.</p>
  <div class="card"><div id="revs">Loading…</div></div>
  <div class="card"><h3>Reset to deck defaults</h3><p class="hint">Publishes immediately. Resets one area, or everything.</p><div style="display:flex;flex-wrap:wrap;gap:8px">${['settings', 'nav', 'ui', 'controls', 'labels', 'pages', 'systems', 'roadmap', 'onboarding', 'workflows'].map(s => `<button class="btn sm" data-action="reset" data-section="${s}">${s}</button>`).join('')}<button class="btn sm danger" data-action="reset" data-section="">Everything</button></div></div>`;
}
async function loadRevisions() { try { const r = await api('/api/revisions'); const el = $('#revs'); if (!el) return; el.innerHTML = r.revisions.map(v => `<div class="hist"><span class="v">v${v.version}</span><span>${esc(v.note || '—')} <span style="color:var(--txt3)">· ${esc(v.updatedBy)}</span></span><span style="color:var(--txt3);font-size:12px">${new Date(v.updatedAt).toLocaleString()}</span><button class="btn sm" data-action="restore" data-v="${v.version}" ${S.meta && v.version === S.meta.version ? 'disabled' : ''}>${S.meta && v.version === S.meta.version ? 'Current' : 'Restore'}</button></div>`).join('') || 'No revisions yet.'; } catch (e) { toast(e.message, true); } }

// ---------- deck versions (variants) ----------
// A version = the published base ⊕ a small overlay (tabs on/off + order, start screen, chrome) + custom slide decks.
// The deck opens it with ?v=<slug>; the merge happens on the API at read time, so republishing the base never breaks a version.
const DECK_FILE = DECK_PREVIEW;
const slugify = s => String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
const vtext = (p, label, help, opts = {}) => `<div class="field"><label>${esc(label)}</label>${opts.multi ? `<textarea data-root="v" data-path="${p}" rows="${opts.rows || 3}">${esc(get(S.v, p))}</textarea>` : `<input type="text" data-root="v" data-path="${p}" value="${esc(get(S.v, p))}" ${opts.ph ? `placeholder="${esc(opts.ph)}"` : ''}>`}${help ? `<div class="hint">${esc(help)}</div>` : ''}</div>`;
const vtoggle = (p, label, help) => `<div class="field"><label class="toggle"><input type="checkbox" data-root="v" data-path="${p}" data-type="bool" ${get(S.v, p) !== false ? 'checked' : ''}><span class="sw"></span><span>${esc(label)}</span></label>${help ? `<div class="hint">${esc(help)}</div>` : ''}</div>`;
const vselect = (p, label, options) => `<div class="field"><label>${esc(label)}</label><select data-root="v" data-path="${p}">${options.map(o => `<option value="${esc(o[0])}" ${String(get(S.v, p)) === String(o[0]) ? 'selected' : ''}>${esc(o[1])}</option>`).join('')}</select></div>`;
const vacts = (listPath, i, len) => `<button data-root="v" data-action="up" data-list="${listPath}" data-i="${i}" ${i === 0 ? 'disabled' : ''} title="Move up">↑</button><button data-root="v" data-action="down" data-list="${listPath}" data-i="${i}" ${i === len - 1 ? 'disabled' : ''} title="Move down">↓</button>`;
const vbullets = (p, label) => { const arr = get(S.v, p) || []; return `<div class="field"><label>${esc(label)}</label><div class="bullets">${arr.map((b, i) => `<div class="b"><input type="text" data-root="v" data-path="${p}.${i}" value="${esc(b)}"><button data-root="v" data-action="rm" data-list="${p}" data-i="${i}" title="Remove">×</button></div>`).join('')}<button class="btn sm" data-root="v" data-action="add" data-list="${p}">+ Add bullet</button></div></div>`; };
async function loadVariants() { try { S.variants = (await api('/api/variants')).variants; } catch (e) { S.variants = []; toast(e.message, true); } renderSection(); renderRailCounts(); }
function baseNav() { return S.cfg.nav.map(n => ({ key: n.key, label: n.label, sub: n.sub || '', enabled: n.enabled !== false })); }
// materialise the overlay's nav so every tab (base + this version's slide decks) has a row to toggle / reorder
function ensureVNav() {
  const ov = S.v.overlay = S.v.overlay || {}; const cur = Array.isArray(ov.nav) ? ov.nav : []; const out = [];
  for (const n of cur) if (!String(n.key).startsWith('s:') || S.v.slides.some(d => 's:' + d.id === n.key)) out.push(n);
  for (const b of baseNav()) if (!out.some(n => n.key === b.key)) out.push(b);
  for (const d of S.v.slides) if (!out.some(n => n.key === 's:' + d.id)) out.push({ key: 's:' + d.id, label: d.label, sub: d.sub || '', enabled: d.enabled !== false });
  ov.nav = out; ov.controls = Object.assign({ startView: S.cfg.controls.startView, showMenuButton: S.cfg.controls.showMenuButton, keyboardNav: S.cfg.controls.keyboardNav, showBreadcrumb: S.cfg.controls.showBreadcrumb, showLiveSitePill: S.cfg.controls.showLiveSitePill, showCopyLink: S.cfg.controls.showCopyLink !== false }, ov.controls || {});
}
function sectionVersions() {
  if (S.v) return variantEditor();
  const rows = S.variants === null ? '<p class="hint">Loading…</p>' : !S.variants.length ? '<p class="hint">No versions yet. Create one above — it starts as an exact copy of the published deck.</p>'
    : S.variants.map(v => `<div class="row"><span class="num">v</span><div><div class="title">${esc(v.name)} <span class="pill">?v=${esc(v.slug)}</span></div><div class="sub">${esc(v.owner || '—')} · ${v.slideDecks} slide deck${v.slideDecks === 1 ? '' : 's'} (${v.slidePages} page${v.slidePages === 1 ? '' : 's'}) · ${v.tabsOff} tab${v.tabsOff === 1 ? '' : 's'} off · updated ${new Date(v.updatedAt).toLocaleString()} by ${esc(v.updatedBy || '—')}</div></div><div class="acts"><a class="btn sm" target="_blank" rel="noopener" href="${DECK_FILE}?v=${encodeURIComponent(v.slug)}">Open ↗</a><button class="btn sm" data-action="var-edit" data-slug="${esc(v.slug)}">Edit</button><button class="btn sm" data-action="var-clone" data-slug="${esc(v.slug)}">Clone</button><button class="btn sm" data-action="var-del" data-slug="${esc(v.slug)}" title="Delete">🗑</button></div></div>`).join('');
  return `<div class="eyebrow">Deck versions</div><h1>One base deck, many versions</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">A version sits on top of the published deck: turn tabs on or off, reorder them, pick a start screen and add your own slide decks. Publishing the base later flows into every version automatically — nothing is regenerated. Send a version with its link (<code>?v=slug</code>); deep links, tab gating and <code>lock=1</code> all work on top.</p>
  <div class="card"><h3>New version</h3><div class="grid3"><div class="field"><label>Name</label><input type="text" id="nv-name" placeholder="e.g. Acme Foods · LTL + NetSuite"></div><div class="field"><label>Owner (AE)</label><input type="text" id="nv-owner" placeholder="name or email"></div><div class="field"><label>&nbsp;</label><button class="btn primary" data-action="var-new">Create version</button></div></div></div>
  <div class="card"><h3>Versions ${S.variants ? `<span class="pill">${S.variants.length}</span>` : ''}</h3><div class="list">${rows}</div></div>`;
}
function variantEditor() {
  const v = S.v; ensureVNav(); const nav = v.overlay.nav;
  const tabRows = nav.map((n, i) => `<div class="row ${n.enabled === false ? 'off' : ''}"><span class="num">${String(i + 1).padStart(2, '0')}</span><div class="grid2" style="gap:8px 12px"><div class="field"><label>Tab label · <span style="color:var(--teal)">${esc(n.key)}</span></label><input type="text" data-root="v" data-path="overlay.nav.${i}.label" value="${esc(n.label)}"></div><div class="field"><label>Jump-to subtitle</label><input type="text" data-root="v" data-path="overlay.nav.${i}.sub" value="${esc(n.sub || '')}"></div></div><div class="acts"><label class="toggle" title="Show / hide"><input type="checkbox" data-root="v" data-path="overlay.nav.${i}.enabled" data-type="bool" ${n.enabled !== false ? 'checked' : ''}><span class="sw"></span></label>${vacts('overlay.nav', i, nav.length)}</div></div>`).join('');
  const decks = v.slides.map((d, di) => { const dp = `slides.${di}`; const key = 'sd:' + di; return `<div class="row ${d.enabled === false ? 'off' : ''}"><span class="num">${String(di + 1).padStart(2, '0')}</span><div class="grid2" style="gap:8px 12px">${vtext(dp + '.label', 'Tab label')}${vtext(dp + '.sub', 'Jump-to subtitle')}</div><div class="acts"><label class="toggle" title="Show / hide"><input type="checkbox" data-root="v" data-path="${dp}.enabled" data-type="bool" ${d.enabled !== false ? 'checked' : ''}><span class="sw"></span></label><a class="btn sm" target="_blank" rel="noopener" title="Preview this deck" href="${DECK_FILE}?v=${encodeURIComponent(v.slug)}&go=${esc(slugify(d.id || d.label))}">↗</a>${vacts('slides', di, v.slides.length)}<button class="btn sm primary" data-action="toggle-edit" data-key="${key}">${S.open[key] ? 'Close' : 'Edit pages'} (${(d.pages || []).length})</button><button class="btn sm" data-root="v" data-action="dup" data-list="slides" data-i="${di}" title="Duplicate deck">⧉</button><button class="btn sm" data-root="v" data-action="rm" data-list="slides" data-i="${di}" title="Remove deck">🗑</button></div></div>
    ${S.open[key] ? `<div class="editor">${(d.pages || []).map((p, pi) => { const pp = `${dp}.pages.${pi}`; return `<div class="card" style="margin-bottom:12px"><h3 style="display:flex;justify-content:space-between;align-items:center"><span><span class="pill teal">${String(pi + 1).padStart(2, '0')}</span> Page</span><span class="acts"><a class="btn sm" target="_blank" rel="noopener" title="Preview this page" href="${DECK_FILE}?v=${encodeURIComponent(v.slug)}&go=${esc(slugify(d.id || d.label))}${pi ? '/' + (pi + 1) : ''}">Preview ↗</a>${vacts(dp + '.pages', pi, d.pages.length)}<button class="btn sm" data-root="v" data-action="dup" data-list="${dp}.pages" data-i="${pi}" title="Duplicate page">⧉</button><button class="btn sm" data-root="v" data-action="rm" data-list="${dp}.pages" data-i="${pi}" title="Remove page">🗑</button></span></h3>
      <div class="grid2">${vtext(pp + '.eyebrow', 'Eyebrow (small teal line)', '', { ph: d.label })}${vtext(pp + '.h1', 'Headline')}</div>
      <div style="margin-top:8px">${vtext(pp + '.lede', 'Body text', 'Blank line = new paragraph', { multi: true, rows: 3 })}</div>
      <div style="margin-top:8px">${vbullets(pp + '.bullets', 'Bullets')}</div>
      <div class="grid3" style="margin-top:8px">${vtext(pp + '.image', 'Image URL', 'PNG/JPG/SVG/GIF')}${vtext(pp + '.embed', 'Embed URL', 'Video or page in a 16:9 frame when there is no image — must allow framing')}${vselect(pp + '.layout', 'Media position', [['right', 'Right of the text'], ['left', 'Left of the text'], ['below', 'Below the text (full width)']])}</div></div>`; }).join('')}
      <button class="btn sm" data-root="v" data-action="add-obj" data-list="${dp}.pages" data-tpl='${esc(JSON.stringify({ eyebrow: '', h1: 'New slide', lede: '', bullets: [], image: '', embed: '', layout: 'right' }))}'>+ Add page</button></div>` : ''}`; }).join('');
  return `<div class="eyebrow">Deck versions · ${esc(v.slug)}</div><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap"><h1 style="margin:0">${esc(v.name)}</h1><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-action="var-back">← All versions</button><a class="btn sm" target="_blank" rel="noopener" href="${DECK_FILE}?v=${encodeURIComponent(v.slug)}">Open this version ↗</a><button class="btn sm primary" data-action="var-save">Save version</button></div></div>
  <p class="hint" style="color:var(--txt3);margin:10px 0 18px">Link for this version: <code>${esc(DECK_FILE)}?v=${esc(v.slug)}</code> · Everything not changed here follows the published base.</p>
  <div class="card"><h3>About</h3><div class="grid3">${vtext('name', 'Name')}${vtext('owner', 'Owner (AE)')}${vtext('note', 'Note', 'Who it is for, what is different')}</div></div>
  <div class="card"><h3>Tabs in this version</h3><p class="hint">Toggle off what this prospect should not see; drag order with the arrows. Your slide decks appear here as tabs too.</p><div class="list">${tabRows}</div></div>
  <div class="card"><h3>Your slide decks <span class="pill">${v.slides.length}</span></h3><p class="hint">Each deck is a tab in the top bar and the Jump-to menu; its pages step with the arrow keys. Headline + body + bullets, with an optional image or embed on the right.</p><div class="list">${decks}</div><button class="btn sm" data-root="v" data-action="add-obj" data-list="slides" data-tpl='${esc(JSON.stringify({ id: '', label: 'Custom', sub: '', enabled: true, pages: [{ eyebrow: '', h1: 'New slide', lede: '', bullets: [], image: '', embed: '', layout: 'right' }] }))}'>+ Add slide deck</button></div>
  <div class="card"><h3>Presentation</h3><div class="grid3">${vselect('overlay.controls.startView', 'Start screen', [['intro', 'Intro (animated hero)'], ['explore', 'Interactive walkthrough'], ['mainmenu', 'Main menu'], ['hub', 'TMS module hub']])}${vtoggle('overlay.controls.showMenuButton', '“Menu” (Jump-to) button')}${vtoggle('overlay.controls.keyboardNav', 'Arrow-key / Esc navigation')}${vtoggle('overlay.controls.showBreadcrumb', 'Breadcrumb')}${vtoggle('overlay.controls.showLiveSitePill', '“Live Site” pill')}${vtoggle('overlay.controls.showCopyLink', '“Link” (copy deep link) button')}</div></div>
  <h3 style="margin:22px 0 10px">Share this version</h3>${shareCard()}
  <div class="status ${S.vDirty ? 'dirty' : ''}" id="vstatus"><span class="dot"></span><span class="msg">${S.vDirty ? 'Unsaved changes to this version.' : 'Version saved. Opens live at ?v=' + esc(v.slug) + '.'}</span><button class="btn" data-action="var-back">Back</button><button class="btn primary" data-action="var-save" ${S.vDirty ? '' : 'disabled'}>Save version</button></div>`;
}
function renderVStatus() { const el = $('#vstatus'); if (!el) return; el.className = 'status' + (S.vDirty ? ' dirty' : ''); el.querySelector('.msg').textContent = S.vDirty ? 'Unsaved changes to this version.' : 'Version saved.'; el.querySelector('[data-action="var-save"]').disabled = !S.vDirty; }
// ---------- share & track links ----------
// Where the link opens (filterable, grouped), what the viewer may see (tabs / lock / chrome), then either the plain deep
// link or a tracked short link (/l/<code>, optional password) with views · viewers · plays · time per link and per viewer.
const enc = v => encodeURIComponent(String(v)).replace(/%2F/gi, '/').replace(/%3A/gi, ':').replace(/%2C/gi, ',');
const TAB_GO = { explore: 'explore', mainmenu: 'menu', tms: 'tms', wms: 'wms', oms: 'oms', workflows: 'workflows', carriers: 'carriers', erp: 'erp', roadmap: 'roadmap', onboarding: 'onboarding', ai: 'ai' };
function shareTargets() {
  const t = [];
  for (const n of S.cfg.nav.filter(n => n.enabled !== false && TAB_GO[n.key])) t.push({ go: TAB_GO[n.key], label: n.label, group: 'Tabs', tab: n.key });
  for (const sys of ['tms', 'wms', 'oms']) for (const m of S.cfg.systems[sys].modules.filter(m => m.enabled !== false)) { const g = sys.toUpperCase() + ' modules'; t.push({ go: `${sys}/${m.num}`, label: `${m.num} · ${m.name}`, group: g, tab: sys }); t.push({ go: `${sys}/${m.num}/demo`, label: `${m.num} · ${m.name} → Live Demo`, group: g, tab: sys }); }
  for (const w of S.cfg.workflows.filter(w => w.enabled !== false)) t.push({ go: `workflows/${w.num}`, label: `${w.num} · ${w.title}`, group: 'Workflows', tab: 'workflows' });
  if (S.v) for (const d of S.v.slides.filter(d => d.enabled !== false)) { const id = slugify(d.id || d.label); (d.pages || []).forEach((pg, i) => t.push({ go: i ? `${id}/${i + 1}` : id, label: `${d.label} · ${String(i + 1).padStart(2, '0')} ${pg.h1 || ''}`.trim(), group: 'Your slides', tab: 's:' + id })); }
  return t;
}
function shareTabs() { const t = S.cfg.nav.filter(n => n.enabled !== false).map(n => ({ key: n.key, label: n.label })); if (S.v) for (const d of S.v.slides.filter(d => d.enabled !== false)) { const k = 's:' + slugify(d.id || d.label); if (!t.some(x => x.key === k)) t.push({ key: k, label: d.label }); } return t; }
function shareParams() { const tabs = shareTabs(); const p = {}; if (S.v) p.v = S.v.slug; if (S.share.go) p.go = S.share.go; if (!S.share.lock && S.share.tabs && S.share.tabs.length < tabs.length) p.tabs = S.share.tabs.join(','); if (S.share.lock) p.lock = '1'; if (S.share.flags.length) p.c = S.share.flags.join(','); return p; }
function shareUrl() { const p = shareParams(); const q = Object.keys(p).map(k => k + '=' + enc(p[k])).join('&'); return DECK_PREVIEW + (q ? '?' + q : ''); }
function refreshShareUrl() { const out = $('#share-url'); if (out) out.value = shareUrl(); const code = $('#share-code'); if (code) { const p = shareParams(); code.textContent = Object.keys(p).map(k => k + '=' + p[k]).join(' · ') || '(start screen)'; } }
function shareListHtml() {
  const f = (S.share.filter || '').trim().toLowerCase(); const all = shareTargets(); const items = f ? all.filter(t => (t.label + ' ' + t.group + ' ' + t.go).toLowerCase().includes(f)) : all;
  const groups = new Map(); for (const t of items) { if (!groups.has(t.group)) groups.set(t.group, []); groups.get(t.group).push(t); }
  const row = (go, label, mono) => `<button class="share-row ${S.share.go === go ? 'on' : ''}" data-action="share-go" data-go="${esc(go)}"><span>${esc(label)}</span><code>${esc(mono)}</code></button>`;
  let h = row('', 'Start screen (as configured)', '—');
  if (!items.length) h += `<div class="hint" style="padding:10px 12px">Nothing matches “${esc(f)}”.</div>`;
  for (const [g, arr] of groups) h += `<div class="share-grp">${esc(g)}</div>` + arr.map(t => row(t.go, t.label, t.go)).join('');
  return h;
}
function shareCard() {
  const tabs = shareTabs(); const target = shareTargets().find(t => t.go === S.share.go);
  const FLAGS = [['nomenu', 'No Menu button'], ['nokeys', 'No arrow keys'], ['nocrumbs', 'No breadcrumb'], ['nolivepill', 'No Live Site pill'], ['nolink', 'No Link button'], ['noai', 'No AI demo tab'], ['nolive', 'No Live Site tab']];
  const sw = (on, label, action, extra, off) => `<button class="sw-btn ${on ? 'on' : ''} ${off ? 'dis' : ''}" data-action="${action}" ${extra} ${off ? 'disabled' : ''}><span class="sw"></span><span>${esc(label)}</span></button>`;
  const p = shareParams();
  return `<div class="card"><h3>Where the link opens ${S.v ? `<span class="pill">version · ${esc(S.v.name)}</span>` : ''}</h3>
  <div class="grid2" style="align-items:start">
    <div><input type="search" data-root="share" data-path="filter" value="${esc(S.share.filter || '')}" placeholder="Filter screens — try “rate”, “netsuite”, “workflow”, “roadmap”…"><div class="share-list" id="share-list">${shareListHtml()}</div></div>
    <div><div class="field"><label>Viewer can see</label><div class="sw-wrap">${sw(S.share.lock, 'Lock to the linked tab only', 'share-lock', '')}${tabs.map(t => sw(S.share.lock ? (target ? target.tab === t.key : false) : !S.share.tabs || S.share.tabs.includes(t.key), t.label, 'share-tab', `data-key="${esc(t.key)}"`, S.share.lock)).join('')}</div></div>
      <div class="field" style="margin-top:10px"><label>Presentation</label><div class="sw-wrap">${FLAGS.map(f => sw(S.share.flags.includes(f[0]), f[1], 'share-flag', `data-flag="${f[0]}"`)).join('')}</div></div></div>
  </div>
  <div class="field" style="margin-top:12px"><label>Deep link (untracked)</label><div style="display:flex;gap:8px"><input type="text" id="share-url" readonly value="${esc(shareUrl())}" style="flex:1;font-family:'DM Mono',monospace;font-size:12px"><button class="btn sm" data-action="share-copy">Copy</button><a class="btn sm" target="_blank" rel="noopener" href="${esc(shareUrl())}">Open ↗</a></div><div class="hint" style="font-family:'DM Mono',monospace" id="share-code">${esc(Object.keys(p).map(k => k + '=' + p[k]).join(' · ') || '(start screen)')}</div></div></div>
  <div class="card"><h3>Send it as a tracked link</h3><p class="hint">A short code that opens the deck exactly as set above and records every open — who, when, which screens, which demos played and for how long. Add a password for investors or anyone outside the deal.</p>
    <div class="grid3"><div class="field"><label>Recipient</label><input type="text" id="lk-recipient" placeholder="Jane Doe · Acme Capital"></div><div class="field"><label>Link name</label><input type="text" id="lk-name" placeholder="Investor deck · Series B"></div><div class="field"><label>Password (optional)</label><input type="text" id="lk-password" autocomplete="off" placeholder="leave blank for an open link"></div></div>
    <div style="margin-top:10px"><button class="btn primary" data-action="link-create">+ Create & copy link</button></div></div>
  <div class="card"><h3 style="display:flex;justify-content:space-between;align-items:center"><span>Tracked links ${S.links ? `<span class="pill">${S.links.filter(l => !S.v || l.params.v === S.v.slug).length}</span>` : ''}</span><button class="btn sm" data-action="link-refresh">Refresh</button></h3>${linksTableHtml()}</div>`;
}
const fmtDur = s => s < 60 ? s + 's' : s < 3600 ? Math.round(s / 60) + 'm' : (s / 3600).toFixed(1) + 'h';
const fmtWhen = iso => iso ? new Date(iso).toLocaleString() : '—';
function linksTableHtml() {
  if (S.links === null) return '<p class="hint">Loading…</p>';
  const rows = S.links.filter(l => !S.v || l.params.v === S.v.slug);
  if (!rows.length) return `<p class="hint">No tracked links yet${S.v ? ' for this version' : ''}.</p>`;
  return `<table class="lk"><thead><tr><th>Link</th><th>Opens at</th><th class="r">Views</th><th class="r">Viewers</th><th class="r">Plays</th><th class="r">Time</th><th>Last viewed</th><th></th></tr></thead><tbody>${rows.map(l => `
    <tr class="${l.disabled || l.expired ? 'off' : ''}"><td><b>${esc(l.name)}</b> ${l.protected ? '🔒' : ''}${l.disabled ? ' <span class="pill">OFF</span>' : ''}${l.expired ? ' <span class="pill">EXPIRED</span>' : ''}<div class="sub">${esc(l.recipient || '—')} · <a href="#" data-action="link-copy" data-url="${esc(S.shortBase + l.code)}">${esc(S.shortBase + l.code)}</a></div></td>
      <td><code>${esc((l.params.v ? 'v=' + l.params.v + ' ' : '') + (l.params.go || '(start)') + (l.params.lock ? ' 🔒' : ''))}</code></td><td class="r">${l.views}</td><td class="r">${l.uniqueViewers}</td><td class="r">${l.plays}</td><td class="r">${fmtDur(l.seconds)}</td><td class="sub">${fmtWhen(l.lastViewed)}</td>
      <td class="r"><button class="btn sm" data-action="link-views" data-code="${l.code}">${S.linkOpen === l.code ? 'Hide' : 'Views'}</button> <button class="btn sm" data-action="link-toggle" data-code="${l.code}" data-on="${l.disabled ? 1 : 0}">${l.disabled ? 'Turn on' : 'Turn off'}</button> <button class="btn sm" data-action="link-del" data-code="${l.code}" title="Delete">🗑</button></td></tr>
    ${S.linkOpen === l.code ? `<tr><td colspan="8" class="detail">${linkDetailHtml()}</td></tr>` : ''}`).join('')}</tbody></table>`;
}
function linkDetailHtml() {
  const d = S.linkDetail; if (!d) return '<span class="hint">Loading…</span>'; if (!d.sessions.length) return '<span class="hint">Not opened yet.</span>';
  return `${d.topScreens.length ? `<div class="hint" style="margin-bottom:8px"><b>Most viewed:</b> ${d.topScreens.map(t => esc(t.go) + ' (' + t.n + ')').join(' · ')}</div>` : ''}
  <table class="lk sm"><thead><tr><th>Opened</th><th>Last seen</th><th class="r">Time</th><th class="r">Plays</th><th>Screens</th><th>Device</th></tr></thead><tbody>${d.sessions.map(s => `<tr><td>${fmtWhen(s.startedAt)}</td><td>${fmtWhen(s.lastSeen)}</td><td class="r">${fmtDur(s.seconds)}</td><td class="r">${s.plays}</td><td><code>${esc(s.screens.map(x => x.go).join(' → ') || '—')}</code></td><td class="sub">${esc((s.ua || '').replace(/^Mozilla\/5\.0 \(([^)]*)\).*$/, '$1').slice(0, 48))}${s.ip ? ' · ' + esc(s.ip) : ''}</td></tr>`).join('')}</tbody></table>`;
}
async function loadLinks() { try { const r = await api('/api/links'); S.links = r.links; S.shortBase = r.shortBase || ''; } catch (e) { S.links = []; toast(e.message, true); } renderSection(); }
async function linkAction(a, b) {
  if (a === 'link-refresh') { S.links = null; return loadLinks(); }
  if (a === 'link-copy') { try { await navigator.clipboard.writeText(b.dataset.url); toast('Short link copied'); } catch (e) { toast(b.dataset.url, true); } return; }
  if (a === 'link-create') {
    const recipient = ($('#lk-recipient').value || '').trim(), name = ($('#lk-name').value || '').trim(), password = $('#lk-password').value || ''; const target = shareTargets().find(t => t.go === S.share.go);
    try { const r = await api('/api/links', { method: 'POST', body: JSON.stringify({ name: name || (recipient ? 'Deck for ' + recipient : target ? 'Deck · ' + target.label : 'Shared deck'), recipient, password, params: shareParams() }) }); toast('Tracked link created · ' + r.shortUrl); try { await navigator.clipboard.writeText(r.shortUrl); } catch (e) {} S.links = null; await loadLinks(); } catch (e) { toast(e.message, true); }
    return;
  }
  const code = b.dataset.code;
  if (a === 'link-views') { if (S.linkOpen === code) { S.linkOpen = null; S.linkDetail = null; renderSection(); return; } S.linkOpen = code; S.linkDetail = null; renderSection(); try { S.linkDetail = await api('/api/links/' + code); } catch (e) { toast(e.message, true); } renderSection(); }
  else if (a === 'link-toggle') { try { await api('/api/links/' + code, { method: 'PATCH', body: JSON.stringify({ disabled: b.dataset.on === '1' ? false : true }) }); S.links = null; await loadLinks(); } catch (e) { toast(e.message, true); } }
  else if (a === 'link-del') { if (!confirm('Delete this link and its view history? People holding it will see “link not available”.')) return; try { await api('/api/links/' + code, { method: 'DELETE' }); if (S.linkOpen === code) S.linkOpen = null; S.links = null; await loadLinks(); } catch (e) { toast(e.message, true); } }
}
function sectionLinks() { return `<div class="eyebrow">Share & track links</div><h1>Send the deck to one person</h1><p class="hint" style="color:var(--txt3);margin:10px 0 18px">Pick where the deck opens and what the viewer may see, then copy the plain deep link — or create a tracked short link (optionally password-protected) and watch views, plays and time per viewer.</p>${shareCard()}`; }
async function variantAction(a, b) {
  if (a === 'var-new') { const name = ($('#nv-name').value || '').trim(); const owner = ($('#nv-owner').value || '').trim(); const slug = slugify(name); if (!slug || slug.length < 2) return toast('Give the version a name first', true); if (S.variants.some(v => v.slug === slug)) return toast('A version with that name already exists', true);
    try { const r = await api('/api/variants/' + slug, { method: 'PUT', body: JSON.stringify({ name, owner, overlay: {}, slides: [] }) }); toast('Created ' + r.variant.name); await loadVariants(); S.v = r.variant; S.vDirty = false; S.share = { go: '', lock: false, flags: [], tabs: null, filter: '' }; renderSection(); } catch (e) { toast(e.message, true); } }
  else if (a === 'var-edit') { try { const v = await api('/api/variants/' + b.dataset.slug); delete v.resolved; S.v = v; S.vDirty = false; S.share = { go: '', lock: false, flags: [], tabs: null, filter: '' }; renderSection(); } catch (e) { toast(e.message, true); } }
  else if (a === 'var-back') { if (S.vDirty && !confirm('Discard unsaved changes to this version?')) return; S.v = null; S.vDirty = false; await loadVariants(); }
  else if (a === 'var-save') { for (const d of S.v.slides) if (!d.id) d.id = slugify(d.label); try { const r = await api('/api/variants/' + S.v.slug, { method: 'PUT', body: JSON.stringify(S.v) }); S.v = r.variant; S.vDirty = false; toast('Saved · opens at ?v=' + r.variant.slug); renderSection(); } catch (e) { toast(e.message, true); } }
  else if (a === 'var-clone') { const name = prompt('Name for the copy', ''); if (!name) return; try { const r = await api('/api/variants/' + b.dataset.slug + '/clone', { method: 'POST', body: JSON.stringify({ name, slug: slugify(name) }) }); toast('Cloned as ' + r.variant.name); await loadVariants(); } catch (e) { toast(e.message, true); } }
  else if (a === 'var-del') { if (!confirm('Delete this version? Links to ?v=' + b.dataset.slug + ' will fall back to the base deck.')) return; try { await api('/api/variants/' + b.dataset.slug, { method: 'DELETE' }); toast('Deleted'); await loadVariants(); } catch (e) { toast(e.message, true); } }
}

// ---------- render ----------
function render() {
  if (!S.token) { app.innerHTML = `<div class="login"><form id="login"><div class="eyebrow">Sales OS</div><h1>Deck Admin</h1><p style="color:var(--txt2);margin:0">Edit the FreightPOP sales deck — settings, tabs, sizing, copy and presentation controls — without touching the files.</p><div class="field"><label>Admin password</label><input type="password" id="pw" autofocus autocomplete="current-password"></div><button class="btn primary" type="submit">Sign in</button><div id="lerr" style="color:var(--red);font-size:12.5px"></div></form></div>`; $('#login').onsubmit = async e => { e.preventDefault(); try { const r = await api('/api/login', { method: 'POST', body: JSON.stringify({ password: $('#pw').value }) }); S.token = r.token; localStorage.setItem('fp_admin_token', r.token); await load(); } catch (err) { $('#lerr').textContent = err.message; } }; return; }
  if (!S.cfg) { app.innerHTML = '<div class="login"><p>Loading…</p></div>'; return; }
  const c = counts();
  app.innerHTML = `<div class="shell"><aside class="rail"><div class="brand"><div class="eyebrow">Sales OS</div><h2 style="margin-top:8px">Deck Admin</h2><small>v${S.meta.version} · ${S.meta.updatedAt ? new Date(S.meta.updatedAt).toLocaleString() : ''}</small></div>
    ${SECTIONS.map(([k, l]) => k === 'grp' ? `<div class="grp">${l}</div>` : `<button data-sec="${k}" class="${S.section === k ? 'active' : ''}">${l}${c[k] ? `<span class="n">${c[k]}</span>` : ''}</button>`).join('')}
    <div style="flex:1"></div><button data-action="logout">Sign out</button></aside>
    <main class="main"><div class="topbar"><span class="meta">CONFIG API · /api/config · version ${S.meta.version}</span><a class="preview" target="_blank" rel="noopener" href="${DECK_PREVIEW}?fpcfg=${Date.now()}">Open beta deck ↗</a></div><div id="sec"></div></main></div>
    <div class="status" id="status"></div>`;
  renderSection(); renderStatus();
}
function renderSection() {
  const el = $('#sec'); const k = S.section;
  el.innerHTML = k === 'settings' ? sectionSettings() : k === 'nav' ? sectionNav() : k === 'ui' ? sectionUi() : k === 'controls' ? sectionControls() : k === 'labels' ? sectionLabels() : k === 'pages' ? sectionPages() : ['tms', 'wms', 'oms'].includes(k) ? sectionModules(k) : k === 'roadmap' ? sectionRoadmap() : k === 'versions' ? sectionVersions() : k === 'links' ? sectionLinks() : k === 'onboarding' ? sectionOnboarding() : k === 'workflows' ? sectionWorkflows() : sectionHistory();
  if (k === 'history') loadRevisions();
  if (k === 'versions' && S.variants === null) loadVariants();
  if ((k === 'links' || (k === 'versions' && S.v)) && S.links === null) loadLinks();
  renderStatus();
  document.querySelectorAll('.rail button[data-sec]').forEach(b => b.classList.toggle('active', b.dataset.sec === k));
}
function renderStatus() { const s = $('#status'); if (!s) return; s.style.display = (S.v || S.section === 'links') ? 'none' : ''; /* a version has its own save bar; links publish nothing */ s.className = 'status' + (S.dirty ? ' dirty' : ''); s.innerHTML = `<span class="dot"></span><span class="msg">${S.dirty ? 'Unsaved changes — publish to update the deck.' : 'All changes published. The deck picks up the published version on its next load.'}</span><button class="btn" data-action="discard" ${S.dirty ? '' : 'disabled'}>Discard</button><button class="btn primary" data-action="publish" ${S.dirty ? '' : 'disabled'}>Save & publish</button>`; }

// ---------- events (delegated) ----------
app.addEventListener('input', e => {
  const t = e.target; const p = t.dataset.path; if (!p) return;
  let v = t.type === 'checkbox' ? t.checked : t.value;
  if (t.dataset.root === 'v') { set(S.v, p, t.dataset.type === 'number' ? Number(v) : v); S.vDirty = true; if (t.type === 'checkbox') { const row = t.closest('.row'); if (row) row.classList.toggle('off', !t.checked); } renderVStatus(); return; }
  if (t.dataset.root === 'share') { if (p === 'filter') { S.share.filter = v; const l = $('#share-list'); if (l) l.innerHTML = shareListHtml(); return; } if (t.type === 'checkbox') { if (p === 'lock') S.share.lock = t.checked; else S.share.flags = S.share.flags.filter(f => f !== p).concat(t.checked ? [p] : []); } else S.share[p] = v; refreshShareUrl(); return; }
  if (t.dataset.type === 'number') { v = Number(v); const vs = document.querySelector(`[data-val="${p}"]`); if (vs) vs.textContent = v; }
  if (t.tagName === 'SELECT' && t.dataset.path.startsWith('ui.')) v = Number(v);
  set(S.cfg, p, v); markDirty();
  if (t.type === 'checkbox') { const row = t.closest('.row'); if (row) row.classList.toggle('off', !t.checked); renderRailCounts(); }
});
app.addEventListener('change', e => { const t = e.target; if (t.tagName === 'SELECT' && t.dataset.root === 'v') { set(S.v, t.dataset.path, t.value); S.vDirty = true; renderVStatus(); return; } if (t.tagName === 'SELECT' && t.dataset.root === 'share') { S.share[t.dataset.path] = t.value; const out = $('#share-url'); if (out) out.value = shareUrl(); return; } if (t.tagName === 'SELECT' && t.dataset.path) { let v = t.value; if (t.dataset.path.startsWith('ui.')) v = Number(v); set(S.cfg, t.dataset.path, v); markDirty(); } });
app.addEventListener('click', async e => {
  const b = e.target.closest('button,a'); if (!b) return;
  if (b.dataset.sec) { S.section = b.dataset.sec; localStorage.setItem('fp_admin_section', S.section); if (S.section === 'links') S.share = { go: '', lock: false, flags: [], tabs: null, filter: '' }; renderSection(); return; }
  const a = b.dataset.action; if (!a) return;
  const onV = b.dataset.root === 'v'; const root = onV ? S.v : S.cfg; const dirty = onV ? () => { S.vDirty = true; renderVStatus(); } : markDirty;
  const list = b.dataset.list ? get(root, b.dataset.list) : null; const i = Number(b.dataset.i);
  if (a === 'up' || a === 'down') { const j = a === 'up' ? i - 1 : i + 1; if (j < 0 || j >= list.length) return; [list[i], list[j]] = [list[j], list[i]]; dirty(); renderSection(); }
  else if (a === 'rm') { list.splice(i, 1); dirty(); renderSection(); }
  else if (a === 'add') { list.push(''); dirty(); renderSection(); }
  else if (a === 'add-obj') { list.push(JSON.parse(b.dataset.tpl)); dirty(); renderSection(); }
  else if (a.startsWith('var-')) { await variantAction(a, b); }
  else if (a === 'share-copy') { const out = $('#share-url'); try { await navigator.clipboard.writeText(out.value); toast('Link copied'); } catch (err) { out.select(); toast('Select and copy the link', true); } }
  else if (a === 'share-go') { S.share.go = b.dataset.go || ''; const l = $('#share-list'); if (l) l.innerHTML = shareListHtml(); refreshShareUrl(); }
  else if (a === 'share-tab') { const all = shareTabs().map(t => t.key); const cur = S.share.tabs || all; const k = b.dataset.key; const next = cur.includes(k) ? cur.filter(x => x !== k) : cur.concat([k]); S.share.tabs = next.length === all.length ? null : next; renderSection(); }
  else if (a === 'share-lock') { S.share.lock = !S.share.lock; renderSection(); }
  else if (a === 'share-flag') { const f = b.dataset.flag; S.share.flags = S.share.flags.includes(f) ? S.share.flags.filter(x => x !== f) : S.share.flags.concat([f]); renderSection(); }
  else if (a.startsWith('link-')) { await linkAction(a, b); }
  else if (a === 'dup') { const c = JSON.parse(JSON.stringify(list[i])); if (b.dataset.list === 'slides') { c.id = ''; c.label = (c.label || '') + ' copy'; } list.splice(i + 1, 0, c); dirty(); renderSection(); }
  else if (a === 'toggle-edit') { S.open[b.dataset.key] = !S.open[b.dataset.key]; renderSection(); }
  else if (a === 'publish') publish();
  else if (a === 'discard') { if (confirm('Discard unsaved changes?')) load(); }
  else if (a === 'reset') resetSection(b.dataset.section || undefined);
  else if (a === 'restore') { if (confirm('Restore version ' + b.dataset.v + '? This publishes it as a new version.')) { try { const r = await api('/api/revisions/' + b.dataset.v + '/restore', { method: 'POST' }); toast('Restored as version ' + r.version); await load(); S.section = 'history'; renderSection(); } catch (err) { toast(err.message, true); } } }
  else if (a === 'logout') { S.token = ''; localStorage.removeItem('fp_admin_token'); S.cfg = null; render(); }
});
function renderRailCounts() { const c = counts(); document.querySelectorAll('.rail button[data-sec]').forEach(b => { const n = b.querySelector('.n'); if (n && c[b.dataset.sec]) n.textContent = c[b.dataset.sec]; }); }
window.addEventListener('beforeunload', e => { if (S.dirty) { e.preventDefault(); e.returnValue = ''; } });
boot();
})();
