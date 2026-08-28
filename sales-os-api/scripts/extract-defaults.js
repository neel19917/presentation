#!/usr/bin/env node
// Extracts the deck's built-in content into defaults.json so the admin panel starts from today's deck.
// Usage: node scripts/extract-defaults.js [path/to/FreightPOP TMS Sales Deck v17.dc.html]
const fs = require('fs'), path = require('path');
const deckPath = process.argv[2] || path.join(__dirname, '..', '..', 'FreightPOP TMS Sales Deck v17.dc.html');
const src = fs.readFileSync(deckPath, 'utf8');
const m = src.match(/<script type="text\/x-dc"[^>]*data-dc-script[^>]*data-props="([^"]*)"[^>]*>([\s\S]*?)<\/script>/);
if (!m) throw new Error('deck script not found');
const propsDecl = JSON.parse(m[1].replace(/&quot;/g, '"'));
class DCLogic { constructor() { this.props = {}; this.state = {}; } setState() {} forceUpdate() {} }
const noop = () => {}; const el = () => ({ style: {}, addEventListener: noop, removeEventListener: noop, querySelector: () => null, querySelectorAll: () => [] });
const win = { addEventListener: noop, removeEventListener: noop, localStorage: { getItem: () => null, setItem: noop }, location: { search: '' }, innerWidth: 1440, innerHeight: 810, document: { querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, addEventListener: noop, body: el() } };
const Component = new Function('DCLogic', 'StreamableLogic', 'React', 'window', 'document', 'localStorage', m[2] + '; return Component;')(DCLogic, DCLogic, {}, win, win.document, win.localStorage);
const c = new Component();
const mod = (f, cardTag) => ({
  num: f.num, name: f.name, t1: f.t1 || '', t2: f.t2 || '', tag: f.tag, cardTag: cardTag || '', enabled: true,
  problem: { heading: f.problem.heading, body: f.problem.body || '' },
  benefit: { heading: f.benefit.heading, bullets: f.benefit.bullets.slice() },
  demo: { caption: f.demo.caption, anim: f.demo.anim || '', ai: f.demo.ai || '', liveUrl: f.demo.liveUrl || '', progress: f.demo.progress || '' },
  roi: { stat: f.roi.stat, statLabel: f.roi.statLabel, proof: f.roi.proof, ev: { grade: f.roi.ev.grade, src: f.roi.ev.src || '', quote: f.roi.ev.quote || '', who: f.roi.ev.who || '' } }
});
const cardTagFor = (sys, num) => ((c.sysData[sys] || { cards: [] }).cards.find(x => x.num === num) || {}).tag || '';
const tmsH1 = (src.match(/<h1[^>]*>Transportation Management<\/h1>\s*<p[^>]*>([\s\S]*?)<\/p>/) || [])[1] || '';
const defaults = {
  settings: {
    startUrl: propsDecl.startUrl.default,
    showMarquee: propsDecl.showMarquee.default,
    mainMenuUrl: (src.match(/<iframe src="(https:\/\/[^"]+)" title="FreightPOP Platform Menu"/) || [])[1] || '',
    aiUrl: (src.match(/this\.props\.aiUrl \|\| "([^"]+)"/) || [])[1] || '',
    liveSiteUrl: (src.match(/this\.props\.liveSiteUrl \|\| "([^"]+)"/) || [])[1] || '',
    roiUrl: c.ROI_URL,
    liveUrls: c.LIVE_URLS,
    intro: { headline: 'AI Supply Chain Software', subtitle: 'Intelligence that moves your supply chain', cta: 'Get Started', urlCaption: 'www.freightpop.com' }
  },
  systems: {
    tms: { name: 'Transportation Management', kicker: 'Module Library', intro: tmsH1.replace(/\s+/g, ' ').trim(), modules: c.features.map(f => mod(f)) },
    wms: { name: c.sysData.wms.name, kicker: c.sysData.wms.kicker, intro: c.sysData.wms.intro, modules: c.wmsFeatures.map(f => mod(f, cardTagFor('wms', f.num))) },
    oms: { name: c.sysData.oms.name, kicker: c.sysData.oms.kicker, intro: c.sysData.oms.intro, modules: c.omsFeatures.map(f => mod(f, cardTagFor('oms', f.num))) }
  },
  nav: [
    { key: 'explore', label: 'Walkthrough', sub: 'Live product experience', enabled: true },
    { key: 'mainmenu', label: 'Main Menu', sub: 'Platform · 4 systems', enabled: true },
    { key: 'tms', label: 'TMS', sub: 'Module hub · 18 capabilities', enabled: true },
    { key: 'wms', label: 'WMS', sub: 'Warehouse capability library', enabled: true },
    { key: 'oms', label: 'OMS', sub: 'Order capability library', enabled: true },
    { key: 'workflows', label: 'Workflows', sub: '8 common customer flows', enabled: true },
    { key: 'carriers', label: 'Carriers', sub: 'Every mode · one network', enabled: true },
    { key: 'erp', label: 'Integrations', sub: '54 connected systems', enabled: true },
    { key: 'roadmap', label: 'Roadmap', sub: 'AI · platform direction', enabled: true },
    { key: 'onboarding', label: 'Onboarding', sub: 'What to expect', enabled: true },
    { key: 'ai', label: 'FreightPOP AI', sub: 'Intelligence layer', enabled: true },
    { key: 'roi', label: 'ROI', sub: 'Intake form · opens in a new tab', enabled: true }
  ],
  labels: {
    back: 'Back', menu: 'Menu', liveSite: 'Live Site', backToModule: 'Back to module', allModules: '← All modules', nextModule: 'Next module', backToModules: 'Back to modules',
    steps: ['Problem', 'Benefit', 'Live Demo', 'Validation'],
    stepEyebrows: ['The Problem', 'The Benefit', 'Live Demo', 'Validation & ROI'],
    demoTabs: { walkthrough: 'Walkthrough', ai: '✦ AI Demo', live: 'Live Site ↗', expand: '⛶ Expand' },
    openCard: 'Open', watchCard: 'Watch', copyLink: 'Link', linkCopied: 'Copied ✓'
  },
  pages: {
    tms: { eyebrow: 'FreightPOP TMS · Module Library' },
    workflows: { eyebrow: 'FreightPOP Platform · Workflows', h1: 'Common customer workflows.', lede: '{count} flows we set up for customers every week. Open one to watch it run end to end, step by step.' },
    roadmap: { eyebrow: 'FreightPOP Platform · Roadmap', h1: 'Where the product is headed.', lede: 'Two tracks of investment: agentic AI across the shipping lifecycle, and platform depth across the warehouse and the yard. Directional — sequence and scope evolve with customer input.', aiTitle: 'AI Product Roadmap', platformTitle: 'Platform Product Roadmap' },
    onboarding: { eyebrow: 'Onboarding · What to expect', h1: 'From kickoff to production.', lede: 'A dedicated customer success team runs the implementation with you. Milestones are set together at kickoff around your requirements.' }
  },
  ui: {
    uiScale: 1, navScale: 1, hubScale: 1, hubColumns: 3, featureScale: 1, demoMaxWidth: 1020, demoScale: 1, statSize: 84, introHeadlineSize: 108, introSubtitleSize: 36, cardMinHeight: 190
  },
  controls: {
    startView: 'intro', keyboardNav: true, showStepDots: true, showPagingArrows: true, showFullscreenPills: true, showLiveSitePill: true, showMenuButton: true, showBreadcrumb: true,
    showAiDemoTab: true, showLiveSiteTab: true, showExpandTab: true, demoAutoPlay: true, demoSpeed: 1, showValidationLibrary: true, showCopyLink: true
  },
  roadmap: { ai: c.roadmapAI.map(r => ({ ...r })), platform: c.roadmapPlatform.map(r => ({ ...r })) },
  onboarding: c.onboardingSteps.map(s => ({ num: s.num, label: s.label, lines: s.lines.slice() })),
  workflows: c.workflows.map(w => ({ num: w.num, title: w.title, tag: w.tag, src: w.src, enabled: true }))
};
const out = path.join(__dirname, '..', 'defaults.json');
fs.writeFileSync(out, JSON.stringify(defaults, null, 2) + '\n');
console.log('wrote', out, '—', defaults.systems.tms.modules.length, 'TMS /', defaults.systems.wms.modules.length, 'WMS /', defaults.systems.oms.modules.length, 'OMS modules,', defaults.workflows.length, 'workflows');
