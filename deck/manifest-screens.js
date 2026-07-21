/**
 * SCREENSHOT DECK VARIANT — a standalone "version of this deck" built entirely
 * from real FreightPOP UI screenshots (pulled from Confluence), AI-augmented
 * with callout overlays. Reuses the same presenter/audience engine as the main
 * deck; loaded by app/screens.html instead of the main manifest.
 *
 * Slides come from modules/real-ui/ (shot.html?id=… renders one annotated
 * screenshot; product-ui.html is the as-is gallery). Edit the shots + callouts
 * in modules/real-ui/shots-data.js — one source of truth for both decks.
 */
window.FP_DECK = {
  title: 'FreightPOP — The Real Product (AI-Augmented)',
  slides: [
    {
      url: '/modules/product-ui.html',
      fit: 'native',
      title: 'This Isn\'t a Mockup — Real UI',
      section: 'Overview',
      notes: 'The live FreightPOP product, straight from the docs: AI Copilot, Accessorial Agent, certified ERP plug-ins. The following slides augment each real screen with AI-callout overlays.',
    },
    {
      url: '/modules/real-ui/shot.html?id=copilot-om',
      fit: 'native',
      title: 'AI Copilot — Order Management',
      section: 'AI-Augmented Screenshots',
      notes: 'REAL Order Management screen. AI overlays: the natural-language Copilot panel ("consolidate selected", "create a sales order") + AI analytics/reporting/audit in the nav.',
    },
    {
      url: '/modules/real-ui/shot.html?id=copilot-quoteship',
      fit: 'native',
      title: 'AI Copilot — Quote / Ship',
      section: 'AI-Augmented Screenshots',
      notes: 'REAL Quote/Ship screen. One instruction ("set ship-to Disneyland, 1 pallet 400 lb, add lift gate") filled the form; overlays show the fields the Copilot set.',
    },
    {
      url: '/modules/real-ui/shot.html?id=accessorial-howitworks',
      fit: 'native',
      title: 'Accessorial Agent',
      section: 'AI-Augmented Screenshots',
      notes: 'REAL Locations/Verify Addresses screen shipping to a stadium. Overlays: the AI Accessorial Agent flags likely-missing accessorials before the rate, surfaced on Verify Addresses.',
    },
    {
      url: '/modules/real-ui/shot.html?id=acu-shopforrates',
      fit: 'native',
      title: 'Ship Inside Acumatica',
      section: 'AI-Augmented Screenshots',
      notes: 'REAL Acumatica "Shop For Rates" plug-in. Overlays: AutoCalc builds packages/inner pieces from the SO; dual rate shop + auto-select best rate, native on the Sales Order.',
    },
  ],
};
