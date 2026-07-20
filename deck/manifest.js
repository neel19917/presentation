/**
 * DECK MANIFEST — the single place that defines your presentation.
 *
 * Each slide entry:
 *   file    — HTML file under deck/ (usually deck/slides/…). ANY html works;
 *             it renders inside the stage. Design at 1920×1080 for crisp scaling.
 *   url     — alternative to `file`: embed a URL. Root-relative paths
 *             ("/Presentation/x.html") serve from this folder; https URLs work
 *             too (needs internet + must allow iframing).
 *   title   — shown in the presenter console + slide grid.
 *   section — groups slides in the grid overview (G).
 *   notes   — speaker notes (presenter screen only). Use \n for line breaks.
 *   fit     — "scale" (default: designed at 1920×1080, scaled to fit) or
 *             "native" (fills the screen at natural size — use for live,
 *             responsive, interactive demos).
 *   keys    — "relay" for app-style decks that have their OWN internal
 *             keyboard navigation (like the bundled TMS deck): arrows/Space/
 *             Enter/Esc are injected into both the presenter preview and the
 *             audience copy in lockstep instead of changing slides. Press R
 *             to reload/restart both copies together.
 *
 * To add a slide: drop an .html file in deck/slides/ and add one entry here.
 * Order in this array = presentation order.
 */
window.FP_DECK = {
  title: 'FreightPOP — TMS Deck (July 2026)',
  slides: [
    {
      url: '/Presentation/TMSDeck-dev.html',
      fit: 'native',
      keys: 'relay',
      sync: 'dc',       // full state + click/input/scroll sync via the injected bridge
      title: 'FreightPOP TMS Deck',
      section: 'Demo',
      notes:
        'FULLY SYNCED — every hotspot click, key press, screen change, search and scroll mirrors between this preview and the big screen (either direction).\n' +
        '→ / Space: advance · ←: back · Enter: select · Esc: close overlays\n' +
        'G: jump grid — includes every deck screen + every module with its 4 steps (Problem / Benefit / Live Demo / Validation)\n' +
        'A (or ↻ Replay anim): replay this screen\'s reveal animations on both screens\n' +
        'R: hard-restart both copies at the intro · B: blackout the big screen\n' +
        'Heads-up: the "Interactive Walkthrough" screen embeds an external site (needs internet, interactions inside it do NOT sync). Carrier/ERP logos also load from the internet.',
    },

    {
      url: '/modules/route-optimization-explainer.html',
      fit: 'native',
      title: 'Route Optimization — Step by Step',
      section: 'Demo',
      // Chapter chips in the G grid seek EVERY mounted copy of this video —
      // this slide and the embed inside the TMS deck's module 06 — via its
      // BroadcastChannel.
      videoChannel: 'fp-roadmap-video-sync',
      // Where this video lives inside the interactive deck (module 06 · Live
      // Demo) — chapter chips jump there instead of leaving the deck slide.
      deckHost: { view: 'feature', fi: 5, step: 2, sysKey: 'tms' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Import', t: 6 }, { label: 'Rules', t: 18 },
        { label: 'Optimize', t: 30 }, { label: 'Dispatch', t: 42 },
        { label: 'Track+POD', t: 54 }, { label: 'Result', t: 68 },
      ],
      notes:
        'Auto-plays (80s, loop it by pressing ← at the end). Space: play/pause · ←/→: chapter jump — all synced between this preview and the big screen automatically.\n' +
        'Chapters: Intro → Import → Rules → Optimize → Dispatch → Track+POD → Result.\n' +
        'PageUp/PageDown switch deck slides; arrows stay inside the video.',
    },

    {
      url: '/modules/netsuite-suiteapp.html',
      fit: 'native',
      title: 'NetSuite SuiteApp — Ship From Inside NetSuite',
      section: 'Demo',
      // Also embedded inside the deck's NetSuite track (module 01 · Live Demo).
      videoChannel: 'fp-netsuite-suiteapp-video-sync',
      deckHost: { view: 'feature', fi: 0, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Order', t: 6 }, { label: 'AutoCalc', t: 20 },
        { label: 'Book', t: 33 }, { label: 'Sync', t: 46 }, { label: 'Audit', t: 59 },
        { label: 'Proof', t: 71 }, { label: 'Results', t: 84 },
      ],
      notes:
        'Auto-plays (96s). Space: play/pause · ←/→: chapter jump — synced between preview and big screen.\n' +
        'Chapters: Intro → Order → AutoCalc → Book → Sync → Audit → Proof (customer quotes) → Results (published stats).\n' +
        'Talking points: Built for NetSuite certified · bi-directional sync every 10 min, no middleware · AutoCalc + Auto Select Best Option · invoice audit before posting.\n' +
        'Published results shown: GrowGeneration $500K/yr + 10x ROI · Uneekor 50% cost · Everflow 95% faster processing.',
    },

    {
      url: '/modules/freightpop-ai.html',
      fit: 'native',
      title: 'FreightPOP AI — Freight That Thinks Ahead',
      section: 'Demo',
      videoChannel: 'fp-freightpop-ai-video-sync',
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Recommend', t: 7 }, { label: 'Answer', t: 26 },
        { label: 'Predict', t: 44 }, { label: 'Optimize', t: 60 }, { label: 'Catch', t: 76 }, { label: 'Result', t: 90 },
      ],
      notes:
        'Auto-plays (102s). The AI flagship: Accessorial Agent (map + Street View + confidence recs, audit-trail attribution) → Copilot Q&A → predictive Last Free Date / ETAs into NetSuite → cost-model route optimization with pin-and-rerun → invoice-audit radar.\n' +
        'All five are REAL, shipping features (June 2026 release). Premium FreightPOP AI lineup.',
    },

    {
      url: '/modules/netsuite-order-sync.html',
      fit: 'native',
      title: 'NetSuite — Order-to-Ship Sync',
      section: 'Demo',
      videoChannel: 'fp-netsuite-order-sync-video-sync',
      deckHost: { view: 'feature', fi: 1, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Import', t: 6 }, { label: 'Book', t: 19 },
        { label: 'Writeback', t: 32 }, { label: 'EDI', t: 45 }, { label: 'Proof', t: 58 }, { label: 'Result', t: 71 },
      ],
      notes: 'Auto-plays (84s). Orders import → book → tracking/cost writeback → EDI/batch → pain stats (149/141 of 463 deals) → zero re-keys.',
    },

    {
      url: '/modules/netsuite-product-catalog.html',
      fit: 'native',
      title: 'NetSuite — Product Catalog & AutoCalc',
      section: 'Demo',
      videoChannel: 'fp-netsuite-product-catalog-video-sync',
      deckHost: { view: 'feature', fi: 2, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Item', t: 6 }, { label: 'Sync', t: 20 },
        { label: 'Rate', t: 34 }, { label: 'Update', t: 48 }, { label: 'Result', t: 62 },
      ],
      notes: 'Auto-plays (82s). NetSuite item record → catalog sync (9,000+ SKUs) → instant rating → edit-once ripple → no reclass surprises.',
    },

    {
      url: '/modules/netsuite-change-management.html',
      fit: 'native',
      title: 'NetSuite — Order Change Management',
      section: 'Demo',
      videoChannel: 'fp-netsuite-change-management-video-sync',
      deckHost: { view: 'feature', fi: 3, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Planned', t: 6 }, { label: 'Change', t: 18 },
        { label: 'Compare', t: 31 }, { label: 'Accept', t: 45 }, { label: 'Flow', t: 58 }, { label: 'Result', t: 70 },
      ],
      notes: 'Auto-plays (84s). Allocated shipment → ERP update creates pending copy → side-by-side diff → accept/auto-accept → nothing ships stale.',
    },

    {
      url: '/modules/netsuite-consolidation.html',
      fit: 'native',
      title: 'NetSuite — Consolidation & Optimization',
      section: 'Demo',
      videoChannel: 'fp-netsuite-consolidation-video-sync',
      deckHost: { view: 'feature', fi: 4, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Orders', t: 6 }, { label: 'Combine', t: 20 },
        { label: 'Rate', t: 33 }, { label: 'Ship', t: 48 }, { label: 'Result', t: 62 },
      ],
      notes: 'Auto-plays (82s). 3 Reno-area orders → combine → $762.30 vs $486.90 (save 36%) → one booking, two stops → GrowGeneration stats.',
    },

    {
      url: '/modules/netsuite-inbound-po.html',
      fit: 'native',
      title: 'NetSuite — Inbound PO Visibility',
      section: 'Demo',
      videoChannel: 'fp-netsuite-inbound-po-video-sync',
      deckHost: { view: 'feature', fi: 5, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'The PO', t: 6 }, { label: 'Import', t: 19 },
        { label: 'Track', t: 32 }, { label: 'Writeback', t: 47 }, { label: 'Result', t: 60 },
      ],
      notes: 'Auto-plays (82s). NetSuite PO → tracked inbound shipment → milestone timeline to the dock → tracking writes back to the PO.',
    },

    // ── Starter slides (kept for reference — uncomment any to append) ────
    // { file: 'slides/01-title.html',         title: 'Title — One Login, All Your Freight', section: 'Starter', notes: '' },
    // { file: 'slides/02-problem.html',       title: 'The Problem',            section: 'Starter', notes: '' },
    // { file: 'slides/03-platform.html',      title: 'One Platform',           section: 'Starter', notes: '' },
    // { file: 'slides/04-modes.html',         title: 'Every Mode, One Login',  section: 'Starter', notes: '' },
    // { file: 'slides/05-rate-shopping.html', title: 'Rate Shopping',          section: 'Starter', notes: '' },
    // { file: 'slides/06-tracking.html',      title: 'Tracking & Visibility',  section: 'Starter', notes: '' },
    // { file: 'slides/07-audit.html',         title: 'Invoice Audit',          section: 'Starter', notes: '' },
    // { file: 'slides/08-integrations.html',  title: 'ERP & Integrations',     section: 'Starter', notes: '' },
    // { file: 'slides/09-analytics.html',     title: 'Analytics & Reporting',  section: 'Starter', notes: '' },
    // { file: 'slides/10-roi.html',           title: 'ROI',                    section: 'Starter', notes: '' },
    // { file: 'slides/11-live-demo.html',     title: 'Live Demo',              section: 'Starter', notes: '' },
    // { file: 'slides/12-closing.html',       title: 'Closing / Next Steps',   section: 'Starter', notes: '' },
  ],
};
