/* Sales OS · Deck Admin — vanilla JS, no build. Talks to the deck-config-api in the same origin. */
(() => {
const API = '';
const DECK_PREVIEW = 'https://beta--fpdeck.netlify.app/FreightPOP%20TMS%20Sales%20Deck%20v17.dc.html';
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const S = { token: localStorage.getItem('fp_admin_token') || '', cfg: null, meta: null, defaults: null, dirty: false, section: localStorage.getItem('fp_admin_section') || 'settings', open: {}, revisions: [] };
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
  ['grp', 'System'], ['history', 'History & reset']
];
const counts = () => ({ tms: S.cfg.systems.tms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.tms.modules.length, wms: S.cfg.systems.wms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.wms.modules.length, oms: S.cfg.systems.oms.modules.filter(m => m.enabled).length + '/' + S.cfg.systems.oms.modules.length, nav: S.cfg.nav.filter(n => n.enabled).length + '/' + S.cfg.nav.length, workflows: S.cfg.workflows.filter(w => w.enabled).length + '/' + S.cfg.workflows.length });

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
  el.innerHTML = k === 'settings' ? sectionSettings() : k === 'nav' ? sectionNav() : k === 'ui' ? sectionUi() : k === 'controls' ? sectionControls() : k === 'labels' ? sectionLabels() : k === 'pages' ? sectionPages() : ['tms', 'wms', 'oms'].includes(k) ? sectionModules(k) : k === 'roadmap' ? sectionRoadmap() : k === 'onboarding' ? sectionOnboarding() : k === 'workflows' ? sectionWorkflows() : sectionHistory();
  if (k === 'history') loadRevisions();
  document.querySelectorAll('.rail button[data-sec]').forEach(b => b.classList.toggle('active', b.dataset.sec === k));
}
function renderStatus() { const s = $('#status'); if (!s) return; s.className = 'status' + (S.dirty ? ' dirty' : ''); s.innerHTML = `<span class="dot"></span><span class="msg">${S.dirty ? 'Unsaved changes — publish to update the deck.' : 'All changes published. The deck picks up the published version on its next load.'}</span><button class="btn" data-action="discard" ${S.dirty ? '' : 'disabled'}>Discard</button><button class="btn primary" data-action="publish" ${S.dirty ? '' : 'disabled'}>Save & publish</button>`; }

// ---------- events (delegated) ----------
app.addEventListener('input', e => {
  const t = e.target; const p = t.dataset.path; if (!p) return;
  let v = t.type === 'checkbox' ? t.checked : t.value;
  if (t.dataset.type === 'number') { v = Number(v); const vs = document.querySelector(`[data-val="${p}"]`); if (vs) vs.textContent = v; }
  if (t.tagName === 'SELECT' && t.dataset.path.startsWith('ui.')) v = Number(v);
  set(S.cfg, p, v); markDirty();
  if (t.type === 'checkbox') { const row = t.closest('.row'); if (row) row.classList.toggle('off', !t.checked); renderRailCounts(); }
});
app.addEventListener('change', e => { const t = e.target; if (t.tagName === 'SELECT' && t.dataset.path) { let v = t.value; if (t.dataset.path.startsWith('ui.')) v = Number(v); set(S.cfg, t.dataset.path, v); markDirty(); } });
app.addEventListener('click', async e => {
  const b = e.target.closest('button,a'); if (!b) return;
  if (b.dataset.sec) { S.section = b.dataset.sec; localStorage.setItem('fp_admin_section', S.section); renderSection(); return; }
  const a = b.dataset.action; if (!a) return;
  const list = b.dataset.list ? get(S.cfg, b.dataset.list) : null; const i = Number(b.dataset.i);
  if (a === 'up' || a === 'down') { const j = a === 'up' ? i - 1 : i + 1; if (j < 0 || j >= list.length) return; [list[i], list[j]] = [list[j], list[i]]; markDirty(); renderSection(); }
  else if (a === 'rm') { list.splice(i, 1); markDirty(); renderSection(); }
  else if (a === 'add') { list.push(''); markDirty(); renderSection(); }
  else if (a === 'add-obj') { list.push(JSON.parse(b.dataset.tpl)); markDirty(); renderSection(); }
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
