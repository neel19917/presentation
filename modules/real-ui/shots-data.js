/**
 * REAL FREIGHTPOP UI SCREENSHOTS — pulled from Confluence (Knowledge Center +
 * ERP Integration Documents), served as local assets so the deck stays offline.
 *
 * ✏️  EDIT ME — this is the single source of truth for both the deck's
 * "Real Product UI" section (modules/product-ui.html) and the standalone
 * screenshot deck (app/screens.html). Change a caption or move an AI callout
 * here and both pick it up on reload — no rebuild.
 *
 * Each shot:
 *   file     — PNG in modules/screenshots/assets/
 *   kicker   — small mono label
 *   title    — headline
 *   caption  — one-line description (shown as-is; the real product, not a mock)
 *   source   — Confluence page the screenshot came from
 *   overlays — AI-augmentation callouts (violet). Coordinates are PERCENT of the
 *              image box, so they scale. `ring` boxes the UI element the AI acts
 *              on; `label` anchors the callout chip; a connector line is drawn
 *              between them.
 */
window.FP_SHOTS = {
  'copilot-om': {
    file: 'copilot-om.png',
    kicker: 'FreightPOP AI · Copilot',
    title: 'Ask the product to do it.',
    caption: 'The FreightPOP AI Copilot, live on Order Management — navigate, search, create orders and consolidate by typing or speaking plain English.',
    source: 'KC · How Do I Use the FreightPOP AI Copilot?',
    overlays: [
      { ring: { x: 72, y: 22, w: 27.5, h: 73 }, label: { x: 40, y: 44 }, text: 'Natural-language Copilot — “consolidate selected”, “create a sales order”, “switch to items view”.' },
      { ring: { x: 80, y: 1, w: 18, h: 6 }, label: { x: 49, y: 2 }, text: 'AI analytics, reporting & invoice-audit — one click away in the nav.' },
    ],
  },
  'copilot-quoteship': {
    file: 'copilot-quoteship.png',
    kicker: 'FreightPOP AI · Copilot',
    title: 'One sentence fills the shipment.',
    caption: '“Set ship-to Disneyland, 1 pallet 30×30×30 400 lb, add lift gate” — the Copilot completes the Quote/Ship form and confirms every field it changed.',
    source: 'KC · How Do I Use the FreightPOP AI Copilot?',
    overlays: [
      { ring: { x: 72, y: 2, w: 27.5, h: 45 }, label: { x: 40, y: 12 }, text: 'The Copilot set Ship-To, the package, weight and the accessorial — from one instruction.' },
      { ring: { x: 41, y: 49, w: 17, h: 6 }, label: { x: 17, y: 62 }, text: 'Destination Lift Gate — toggled on automatically.' },
    ],
  },
  'accessorial-howitworks': {
    file: 'accessorial-howitworks.png',
    kicker: 'FreightPOP AI · Accessorial Agent',
    title: 'The surcharge, caught before the rate.',
    caption: 'Shipping to a stadium? The Accessorial Agent flags the accessorials a lane like this usually needs — before the rate comes back wrong.',
    source: 'KC · How Do I Use the Accessorial Agent?',
    overlays: [
      { ring: { x: 0.5, y: 91, w: 28, h: 8 }, label: { x: 33, y: 74 }, text: 'AI Accessorial Agent flags likely-missing accessorials (liftgate, residential, limited access).' },
      { ring: { x: 31, y: 25, w: 18, h: 7 }, label: { x: 52, y: 18 }, text: 'Suggestions surface on Verify Addresses — accept in one click.' },
    ],
  },
  'acu-shopforrates': {
    file: 'acu-shopforrates.png',
    kicker: 'FreightPOP × Acumatica',
    title: 'Rate & pack, inside Acumatica.',
    caption: 'The certified FreightPOP plug-in — Shop For Rates, AutoCalc packaging and carrier selection, native on the Acumatica Sales Order.',
    source: 'EID · Acumatica Native — Rating & Shipping from Sales Orders',
    overlays: [
      { ring: { x: 18, y: 28, w: 17, h: 5 }, label: { x: 40, y: 19 }, text: 'AutoCalc builds packages, inner & inner-most pieces from the SO lines.' },
      { ring: { x: 1, y: 8, w: 97, h: 22 }, label: { x: 30, y: 41 }, text: 'Dual rate shop + auto-select best rate — without leaving the ERP.' },
    ],
  },
};

// Order the standalone screenshot deck + gallery walk through the shots.
window.FP_SHOT_ORDER = ['copilot-om', 'copilot-quoteship', 'accessorial-howitworks', 'acu-shopforrates'];
