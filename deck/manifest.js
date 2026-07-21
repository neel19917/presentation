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
  title: 'FreightPOP — The AI Supply Chain Platform',
  slides: [
    // ══ PLATFORM ══ the interactive driver: full TMS/WMS/OMS + NetSuite track
    {
      url: '/Presentation/TMSDeck-dev.html',
      fit: 'native',
      keys: 'relay',
      sync: 'dc',       // full state + click/input/scroll sync via the injected bridge
      title: 'FreightPOP — AI Supply Chain OS',
      section: 'Platform',
      notes:
        'FULLY SYNCED — every hotspot click, key press, screen change, search and scroll mirrors between this preview and the big screen (either direction).\n' +
        '→ / Space: advance · ←: back · Enter: select · Esc: close overlays\n' +
        'G: jump grid — includes every deck screen + every module with its 4 steps (Problem / Benefit / Live Demo / Validation)\n' +
        'A (or ↻ Replay anim): replay this screen\'s reveal animations on both screens\n' +
        'R: hard-restart both copies at the intro · B: blackout the big screen\n' +
        'Heads-up: the "Interactive Walkthrough" screen embeds an external site (needs internet, interactions inside it do NOT sync). Carrier/ERP logos also load from the internet.',
    },

    // ══ AI ══ the flagship differentiator
    {
      url: '/modules/freightpop-ai.html',
      fit: 'native',
      title: 'FreightPOP AI — Freight That Thinks Ahead',
      section: 'AI',
      videoChannel: 'fp-freightpop-ai-video-sync',
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Recommend', t: 7 }, { label: 'Answer', t: 26 },
        { label: 'Predict', t: 44 }, { label: 'Optimize', t: 60 }, { label: 'Catch', t: 76 }, { label: 'Result', t: 90 },
      ],
      notes:
        'Auto-plays (102s). The AI flagship: Accessorial Agent (map + Street View + confidence recs, audit-trail attribution) → Copilot Q&A → predictive Last Free Date / ETAs into NetSuite → cost-model route optimization with pin-and-rerun → invoice-audit radar.\n' +
        'All five are REAL, shipping features (June 2026 release). Premium FreightPOP AI lineup.\n' +
        'REAL demo language (Invoice Audit demo, Jul 10 2026): agent names the variance cause ("$75 liftgate we weren\'t expecting") and offers to save the rule to that destination; on detention it compares driver-logged time vs carrier-billed time against the loaded contract and escalates the dispute through the carrier on the customer\'s behalf. Accessorial Agent checks the address history AND Google Earth for a loading dock. Anchor pain: one prospect had 3,600 carrier invoices sitting unreconciled.',
    },

    // ══ NETSUITE DEMO TRACK ══ 6 films in module order (also embedded in the deck's NetSuite track)
    {
      url: '/modules/netsuite-suiteapp.html',
      fit: 'native',
      title: 'NetSuite 01 — Quote & Ship Inside NetSuite',
      section: 'NetSuite Demo Track',
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
        'Published results shown: GrowGeneration $500K/yr + 10x ROI · Uneekor 50% cost · Everflow 95% faster processing.\n' +
        'COMPETITIVE (from live NetSuite evals, Jul 2026): position against NetSuite native "Ship Central" — FreightPOP is an existing SuiteApp, not a build-from-scratch project, live in weeks not months. #1 reason customers cite for choosing/keeping FreightPOP: support responsiveness. Multi-entity shippers: services filter by subsidiary.',
    },

    {
      url: '/modules/netsuite-order-sync.html',
      fit: 'native',
      title: 'NetSuite 02 — Order-to-Ship Sync',
      section: 'NetSuite Demo Track',
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
      title: 'NetSuite 03 — Product Catalog & AutoCalc',
      section: 'NetSuite Demo Track',
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
      title: 'NetSuite 04 — Order Change Management',
      section: 'NetSuite Demo Track',
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
      title: 'NetSuite 05 — Consolidation & Optimization',
      section: 'NetSuite Demo Track',
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
      title: 'NetSuite 06 — Inbound PO Visibility',
      section: 'NetSuite Demo Track',
      videoChannel: 'fp-netsuite-inbound-po-video-sync',
      deckHost: { view: 'feature', fi: 5, step: 2, sysKey: 'netsuite' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'The PO', t: 6 }, { label: 'Import', t: 19 },
        { label: 'Track', t: 32 }, { label: 'Writeback', t: 47 }, { label: 'Result', t: 60 },
      ],
      notes: 'Auto-plays (82s). NetSuite PO → tracked inbound shipment → milestone timeline to the dock → tracking writes back to the PO.',
    },

    // ══ ACUMATICA DEMO TRACK ══ 5 films in module order (also embedded in the deck's Acumatica track;
    // module 06 "Partners & Proof" is the editable modules/acumatica-partners.html, reachable inside the deck)
    {
      url: '/modules/acumatica-ship-inside.html',
      fit: 'native',
      title: 'Acumatica 01 — Ship Inside Acumatica',
      section: 'Acumatica Demo Track',
      videoChannel: 'fp-acumatica-ship-inside-video-sync',
      deckHost: { view: 'feature', fi: 0, step: 2, sysKey: 'acumatica' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Order', t: 6 }, { label: 'AutoCalc', t: 19 },
        { label: 'Rate+Book', t: 33 }, { label: 'Print', t: 48 }, { label: 'Result', t: 62 },
      ],
      notes:
        'Auto-plays (82s). Space: play/pause · ←/→: chapter jump — synced between preview and big screen.\n' +
        'A certified FreightPOP carrier plug-in, native inside Acumatica: rate shop + book from the Sales Order, AutoCalc packages from SO lines, labels auto-print to mapped user printers, tracking writes back — zero windows switched. Acumatica 2025 R1/R2, no middleware.\n' +
        'Grounded in Confluence ERP Integration Docs (space EID). Anchor pain: legacy tool took 3–5 min per parcel outside the ERP.',
    },

    {
      url: '/modules/acumatica-rate-shop.html',
      fit: 'native',
      title: 'Acumatica 02 — Dual Rate Shop & Auto-Select',
      section: 'Acumatica Demo Track',
      videoChannel: 'fp-acumatica-rate-shop-video-sync',
      deckHost: { view: 'feature', fi: 1, step: 2, sysKey: 'acumatica' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Default', t: 6 }, { label: 'Rate Shop', t: 19 },
        { label: 'Auto-Select', t: 34 }, { label: 'Result', t: 56 },
      ],
      notes: 'Auto-plays (78s). Dual Rate Shop compares contract vs spot side by side; Auto-Select books the cheapest compliant option — no manual carrier pick. Targeting Acumatica 2025 R2. Saves $51.10 vs the rep\'s default carrier in the demo scenario.',
    },

    {
      url: '/modules/acumatica-order-sync.html',
      fit: 'native',
      title: 'Acumatica 03 — Plug & Play Order Sync',
      section: 'Acumatica Demo Track',
      videoChannel: 'fp-acumatica-order-sync-video-sync',
      deckHost: { view: 'feature', fi: 2, step: 2, sysKey: 'acumatica' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Import', t: 6 }, { label: 'Item Sync', t: 20 },
        { label: 'Book', t: 33 }, { label: 'Writeback', t: 46 }, { label: 'Result', t: 62 },
      ],
      notes: 'Auto-plays (82s). Bilateral Plug & Play: imports SO/RMA/Shipment/PO, stock-item sync keeps the catalog aligned, carrier + tracking + cost write back onto the Acumatica transaction. OAuth (ROPC) to the External API — no middleware. Data entered once, in Acumatica.',
    },

    {
      url: '/modules/acumatica-ap-export.html',
      fit: 'native',
      title: 'Acumatica 04 — AP & Return-to-Vendor Export',
      section: 'Acumatica Demo Track',
      videoChannel: 'fp-acumatica-ap-export-video-sync',
      deckHost: { view: 'feature', fi: 3, step: 2, sysKey: 'acumatica' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Problem', t: 6 }, { label: 'Post AP', t: 18 },
        { label: 'Returns', t: 33 }, { label: 'PO/Terms', t: 47 }, { label: 'Result', t: 62 },
      ],
      notes: 'Auto-plays (80s). Completed shipment costs post to Acumatica AP as coded Bills (GL 5040 · Freight Out); Return-to-Vendor exports as RTV; PO integration tracks inbound freight Created→Received; shipping terms map from native or custom fields. The reconciliation backlog stops accumulating.',
    },

    {
      url: '/modules/acumatica-product-catalog.html',
      fit: 'native',
      title: 'Acumatica 05 — Product Catalog & AutoCalc',
      section: 'Acumatica Demo Track',
      videoChannel: 'fp-acumatica-product-catalog-video-sync',
      deckHost: { view: 'feature', fi: 4, step: 2, sysKey: 'acumatica' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Item', t: 6 }, { label: 'Sync', t: 20 },
        { label: 'AutoCalc', t: 34 }, { label: 'Edit', t: 48 }, { label: 'Result', t: 62 },
      ],
      notes: 'Auto-plays (80s). Item dims + weights sync from Acumatica stock items (6,000+); AutoCalc builds Packages / Inner Pieces / Inner-Most Pieces from the SO lines; edit an item once and every quote re-rates. Accurate packaging = accurate rates, fewer carrier reclass surprises.',
    },

    // ══ PLATFORM CAPABILITIES ══ TMS gap films (also embedded as TMS modules 10-12)
    {
      url: '/modules/tms-analytics-reporting.html',
      fit: 'native',
      title: 'Analytics & Reporting',
      section: 'Platform Capabilities',
      videoChannel: 'fp-tms-analytics-reporting-video-sync',
      deckHost: { view: 'feature', fi: 9, step: 2, sysKey: 'tms' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Problem', t: 7 }, { label: 'Dashboards', t: 20 },
        { label: 'Scorecards', t: 38 }, { label: 'Drill', t: 54 }, { label: 'Result', t: 70 },
      ],
      notes: 'Auto-plays (82s). Freight data trapped in portals/spreadsheets/PDFs → prebuilt dashboards (spend by carrier/lane/mode) → carrier scorecards → drill from a chart to the shipments. AI surfaces the outliers. Ground: Confluence flagged analytics as a pain ("reports unusable").',
    },
    {
      url: '/modules/tms-invoice-audit.html',
      fit: 'native',
      title: 'Freight & Invoice Audit',
      section: 'Platform Capabilities',
      videoChannel: 'fp-tms-invoice-audit-video-sync',
      deckHost: { view: 'feature', fi: 10, step: 2, sysKey: 'tms' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Problem', t: 6 }, { label: 'Match', t: 22 },
        { label: 'Flag', t: 38 }, { label: 'Save Rule', t: 56 }, { label: 'Result', t: 70 },
      ],
      notes: 'Auto-plays (82s). REAL Jul 2026 invoice-audit demo: 3,600 unreconciled invoices → match to booked rate, in-tolerance auto-approve → $75 liftgate variance flagged, AI radar names the cause and offers to save the rule to the address → detention dispute vs contract. The overcharges that got paid, caught.',
    },
    {
      url: '/modules/tms-tracking-visibility.html',
      fit: 'native',
      title: 'Tracking & Visibility',
      section: 'Platform Capabilities',
      videoChannel: 'fp-tms-tracking-visibility-video-sync',
      deckHost: { view: 'feature', fi: 11, step: 2, sysKey: 'tms' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Blind spot', t: 7 }, { label: 'Live map', t: 22 },
        { label: 'Milestones', t: 39 }, { label: 'AI agent', t: 55 }, { label: 'Result', t: 70 },
      ],
      notes: 'Auto-plays (82s). Status trapped in a dozen carrier sites → one live map (parcel/LTL/FTL/ocean) → milestone timeline booking→POD → AI exception agent predicts a slip + flags ocean Last Free Date before demurrage. The exceptions come to you.',
    },

    // ══ INTEGRATIONS ══ ERP + hardware connections (editable page; also the deck's ERP screen)
    {
      url: '/modules/erp-integrations.html',
      fit: 'native',
      title: 'ERP & Systems Integrations',
      section: 'Integrations',
      // Same page renders inside the deck's main-menu ERP quadrant (view: erp).
      deckHost: { view: 'erp' },
      notes:
        'Editable showcase — modules/erp-integrations.html (EDIT ME data block). Native vs bilateral vs hardware.\n' +
        'ERPs: NetSuite (SuiteApp, Ship Central alternative) · Acumatica (native plug-in + Plug & Play, certified ISV) · SAP S/4HANA (Public Cloud, Outbound Delivery) · Sage X3 (SOAP) · Dynamics 365 Business Central (token/OData, Posted Sales Shipments, SPS bundle) · Dynamics 365 F&O (ERP Automation / External API).\n' +
        'Hardware: Cubiscan — verified dims/weight into FreightPOP (no dimension mix-ups / reclass). Partner enablement in progress.\n' +
        'Grounded in Confluence ERP Integration Docs + Fathom (Jul 2026). Also opens from the Platform deck main-menu ERP quadrant.',
    },

    // ══ VALUE ══ ROI / value slide with an interactive savings estimator
    {
      url: '/modules/roi-value.html',
      fit: 'native',
      title: 'The ROI of One Platform',
      section: 'Value',
      notes:
        'Editable showcase — modules/roi-value.html (EDIT ME data block). Published customer results + a LIVE savings estimator (drag the sliders; annual savings recompute in real time).\n' +
        'Published stats: GrowGeneration $500K/yr + 10x ROI · Uneekor 50% lower cost (2x volume) · Everflow 95% faster processing — verified on freightpop.com/customer-success.\n' +
        'Estimator is an ILLUSTRATIVE model (shipments × avg cost × 12 → rate-shopping % + invoice-audit % savings). Tune the assumptions to the room; disclaimer is shown on the slide.',
    },

    // ══ EXPLAINERS ══ standalone deep-dive films
    {
      url: '/modules/route-optimization-explainer.html',
      fit: 'native',
      title: 'Route Optimization — Step by Step',
      section: 'Explainers',
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
