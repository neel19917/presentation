/**
 * GUIDED STORY MODE — beat sheets for a scripted, rep-guided walkthrough.
 *
 * A story is an ordered list of BEATS. Each beat carries a `script` (what the
 * rep says) and a target — one or more of:
 *   slide: <manifest index | url substring>   → jump the deck to a manifest slide
 *   dc:    { view, fi, step, sysKey }          → jump BOTH screens into an
 *                                                interactive-deck screen/module/step
 *   video: { channel, t }                      → seek a film to a chapter time
 * Targets run in order slide → dc → video, so a beat can (e.g.) surface an
 * in-deck film with `dc` and seek it with `video`. All jumps reuse the presenter's
 * existing primitives (deck.goto / dcGoto / videoSeek), which already broadcast to
 * the audience window — so the big screen follows automatically. No new sync.
 *
 * Story mode is PRESENTER-ONLY (the script overlay never shows on the audience
 * screen) and opt-in; free navigation stays the default.
 *
 * ── Editing for marketing ──────────────────────────────────────────────────
 * Add/adjust beats freely. `dc` module indices (fi) are 0-based within a system:
 *   TMS: 0 Rules · 1 Carrier Mgmt · 2 Rate Shopping · 3 Consolidation ·
 *        4 Multi-Leg · 5 Route Optimization · 6 Batch · 7 Auto Dispatch ·
 *        8 Dock · 9 Analytics & Reporting · 10 Freight & Invoice Audit ·
 *        11 Tracking & Visibility
 *   NetSuite: 0 Quote&Ship · 1 Order-to-Ship Sync · 2 Catalog · 3 Change Mgmt ·
 *             4 Consolidation · 5 Inbound PO · 6 Partners
 *   Acumatica: 0 Ship Inside · 1 Dual Rate Shop · 2 Order Sync · 3 AP Export ·
 *              4 Product Catalog · 5 Partners
 *   step: 0 Problem · 1 Benefit · 2 Live Demo · 3 Validation
 */
window.FP_STORIES = {

  generic: {
    name: 'The One-Platform Story',
    vertical: 'Cross-industry',
    beats: [
      { dc: { view: 'intro' },
        script: 'This is FreightPOP — the AI supply chain platform. One login replaces every carrier portal, the spreadsheets, the manual audit and the re-keying. Let me show you what that actually means for your team.' },
      { slide: '/modules/freightpop-ai.html', video: { channel: 'fp-freightpop-ai-video-sync', t: 0 },
        script: 'Underneath the execution layer there\'s an intelligent one — five AI agents that recommend, answer, predict, optimize and catch. Everything you\'re about to see is powered by these.' },
      { dc: { view: 'feature', fi: 2, step: 2, sysKey: 'tms' },
        script: 'Start with the everyday win: rate shopping. Every carrier, every mode, on one screen — and the Accessorial Agent flags the liftgate or residential surcharge before the rate ever comes back wrong.' },
      { dc: { view: 'feature', fi: 5, step: 2, sysKey: 'tms' }, video: { channel: 'fp-roadmap-video-sync', t: 0 },
        script: 'For multi-stop freight, the AI cost model builds the cheapest compliant route — not whatever the dispatcher remembers. Pin a stop, re-run, done.' },
      { dc: { view: 'netsuite' },
        script: 'And it lives inside the ERP you already run. Here\'s the NetSuite demo track — quote, rate, book and audit without ever leaving the Sales Order.' },
      { slide: '/modules/roi-value.html',
        script: 'Here\'s what it\'s worth. GrowGeneration saves half a million a year at a 10x return. Drag the sliders to your volume — this number is yours, not a case study\'s.' },
      { dc: { view: 'mainmenu' },
        script: 'One platform. Every mode, every ERP, every freight dollar audited, with AI doing the watching. That\'s FreightPOP — let\'s talk about your lanes.' },
    ]
  },

  manufacturing: {
    name: 'Manufacturing',
    vertical: 'Manufacturing',
    beats: [
      { dc: { view: 'intro' },
        script: 'For a manufacturer, freight touches everything — inbound raw materials, outbound finished goods, and an ERP in the middle. FreightPOP runs all of it from one place.' },
      { dc: { view: 'feature', fi: 5, step: 2, sysKey: 'netsuite' },
        script: 'Start upstream: inbound POs from your suppliers, tracked all the way to the dock. The AI exception agent flags the delay before it stops the line — not after.' },
      { dc: { view: 'feature', fi: 0, step: 2, sysKey: 'netsuite' },
        script: 'Outbound finished goods ship straight from the ERP Sales Order — no re-keying into a separate tool. AutoCalc builds the pallets and cartons from the order lines automatically.' },
      { dc: { view: 'feature', fi: 5, step: 1, sysKey: 'tms' },
        script: 'Distribution runs on the AI cost model, not tribal knowledge — the cheapest compliant multi-stop route, every time.' },
      { slide: '/modules/roi-value.html',
        script: 'For a plant shipping thousands of loads a month, the rate-shopping and audit savings compound fast. Let\'s put your numbers in.' },
    ]
  },

  distribution: {
    name: 'Distribution',
    vertical: 'Distribution & Wholesale',
    beats: [
      { dc: { view: 'intro' },
        script: 'Distribution is volume — thousands of parcel and LTL shipments, tight margins on every one. FreightPOP is built for exactly that.' },
      { dc: { view: 'feature', fi: 2, step: 2, sysKey: 'tms' },
        script: 'Rate shop every carrier and mode on one screen and auto-select the cheapest compliant rate. On your volume, a few points per shipment is real money.' },
      { dc: { view: 'feature', fi: 3, step: 1, sysKey: 'tms' },
        script: 'Consolidate orders heading the same direction into a single booking — fewer shipments, lower cost, less handling.' },
      { dc: { view: 'feature', fi: 10, step: 1, sysKey: 'tms' },
        script: 'Then audit every carrier invoice automatically. The overcharges nobody has time to catch by hand — the AI radar catches them and names the cause.' },
      { slide: '/modules/roi-value.html',
        script: 'Rate shopping plus audit recovery, at your shipment count — here\'s the annual number.' },
    ]
  },

  foodbev: {
    name: 'Food & Beverage',
    vertical: 'Food & Beverage',
    beats: [
      { dc: { view: 'intro' },
        script: 'In food and beverage, on-time is non-negotiable and every day of delay is spoilage. Visibility is the whole game — and that\'s where FreightPOP starts.' },
      { dc: { view: 'feature', fi: 11, step: 1, sysKey: 'tms' },
        script: 'One live map from booking to delivery, across every carrier and mode — and the AI exception agent flags a slip before the customer, or the product, is ever at risk.' },
      { dc: { view: 'feature', fi: 4, step: 1, sysKey: 'tms' },
        script: 'Multi-leg and cold-chain lanes are tracked end to end, with ocean Last Free Date flagged early so demurrage never blindsides you.' },
      { dc: { view: 'feature', fi: 2, step: 2, sysKey: 'tms' },
        script: 'And it\'s still rate-shopped and booked in one screen, so speed never costs you margin.' },
      { slide: '/modules/roi-value.html',
        script: 'Fewer spoiled loads, fewer expedite penalties, lower freight spend — let\'s estimate what that\'s worth to you.' },
    ]
  },

  '3pl': {
    name: '3PL',
    vertical: 'Third-Party Logistics',
    beats: [
      { dc: { view: 'intro' },
        script: 'As a 3PL you ship for dozens of customers across every carrier — and you answer for all of it. FreightPOP gives you one control tower over the whole book.' },
      { dc: { view: 'feature', fi: 2, step: 2, sysKey: 'tms' },
        script: 'Rate shop across your entire carrier network on one screen, per client — the best compliant rate without logging into ten portals.' },
      { dc: { view: 'feature', fi: 9, step: 1, sysKey: 'tms' },
        script: 'Carrier, lane and cost scorecards per client — the reporting your customers keep asking for, built in, so QBRs take minutes not weeks.' },
      { dc: { view: 'feature', fi: 10, step: 1, sysKey: 'tms' },
        script: 'Audit every carrier invoice automatically — protect your margin on the freight you\'re reselling before an overcharge ever gets paid.' },
      { dc: { view: 'feature', fi: 11, step: 1, sysKey: 'tms' },
        script: 'And give every customer proactive visibility — the exceptions come to you, so your team stops fielding "where\'s my order" calls all day.' },
      { slide: '/modules/roi-value.html',
        script: 'Margin protected, headcount freed, customers retained — here\'s the estimate for your operation.' },
    ]
  },

};
