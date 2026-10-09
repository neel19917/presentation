# Live Site deep links

> **Hosting moved (2026-10-05):** the deck is served by SalesOS from `FPPricer/public/deck/` (see `docs/DEPLOYMENT.md`). Paths below that say "the deck site" now mean `freightpopsales.com/deck/`.

Status 2026-10-02. Every module's **Live Site ↗** tab (Live Demo step) and the top-bar **Live Site** pill
open a specific page of `app.freightpop.com` instead of the generic Quote/Ship screen.

## Where the URL comes from

Resolution order in `FreightPOP TMS Sales Deck v17.dc.html` (`renderVals`):

1. `module.demo.liveUrl` — per module. Published via deck-config-api (`systems.<tms|wms|oms>.modules[].demo.liveUrl`,
   editable in SalesOS → admin → Sales Deck → modules → "live URL"). **The published config wins over the deck's
   built-in default**: the stored document carries every module with a `liveUrl` string (empty = "use the system
   default"), so changing the default in this file alone does nothing until a new revision is published.
2. `settings.liveUrls.<system>` — per system fallback (`tms` → quote-ship, `oms` → order-management, `wms` → wms).
3. `LIVE_URL_DEFAULT` — quote-ship.

The top-bar pill: when a module is open (or was open when the pill was clicked — `preLiveView`), it opens that
module's URL; otherwise `settings.liveSiteUrl` (quote-ship). Before 2026-10-02 it always opened quote-ship.

## The mapping (deck defaults = published config revision 18)

Base: `https://app.freightpop.com/app/#/`

| System | # | Module | Route | Evidence |
|---|---|---|---|---|
| TMS | 01 | Shipping Rules Engine | `company/rules?tab=shipping-approval-rule` | `CompanyRules` route constant; `/company/rules` 109 sessions. `tab` value = `ShippingApprovalRule="shipping-approval-rule"` in the lazy chunk `types-*.js` (not the main bundle); `FormRules-*.js` navigates to `CompanyRules?tab=<that>` (verified 2026-10-05) |
| TMS | 02 | Carrier Management | `carrier-management` | route constant; 963 sessions |
| TMS | 03 | Rate Shopping | `quote-ship` | route constant; 128,554 sessions |
| TMS | 04 | Spot Quoting & Bid Portal | `quote-ship` | shipper side starts a spot quote from Quote/Ship; the bid portal is per-UUID (`spot-quote/:id`) and carrier-facing |
| TMS | 05 | Address Validator & Accessorials | `quote-ship` | demo mirrors Quote/Ship |
| TMS | 06 | Shipment Consolidation | `order-management` | demo mirrors Order Management grid |
| TMS | 07 | Pooling & Cross-Dock | `pooling` | `Pooling` route constant; 4 sessions |
| TMS | 08 | Multi-Leg Shipments | `multileg-consolidation/create` | `MultilegConsolidationCreate` route constant |
| TMS | 09 | Batch Shipping | `order-management` | demo mirrors Order Management |
| TMS | 10 | Parcel Shipping | `quote-ship` | demo mirrors Quote/Ship |
| TMS | 11 | Documents & BOL Control | `history` | demo is Shipment Details → Documents; a shipment needs an id, History is the list it is opened from. Alternative: `company/documents-and-labels` (settings) |
| TMS | 12 | Fleet & Dispatch | `fleet` | `Fleet` route constant; 26 sessions |
| TMS | 13 | Route Optimization | `route-optimization` | route constant; 10 sessions |
| TMS | 14 | Driver App & POD | `track` | POD lands on the tracked shipment; the driver app is mobile |
| TMS | 15 | Tracking & Notifications | `track` | route constant; 9,829 sessions |
| TMS | 16 | Freight Invoice Audit | `audit` | route constant; 1,423 sessions |
| TMS | 17 | Reporting & Analytics | `analytics` | route constant; 384 sessions (demo is "Analytics — Freight Spend") |
| TMS | 18 | Dock Scheduling | `dock-scheduling/docks` | `DockSchedulingDocks` route constant; 68 sessions |
| WMS | 01 | Guided Receiving | `wms/receipts` | `WmsReceiptsTransactions` |
| WMS | 02 | License Plating, Lot, and Serialization | `wms/company` | `WmsTenantSettings` — demo is Settings → Warehouses → Rules (Use License Plates / Lots) |
| WMS | 03 | Put-Away & Bin Transfers | `wms/bin-transfers` | `WmsBinTransfers` |
| WMS | 04 | Order Picking & Fulfillment | `wms/picking` | `WmsPicking`; 20 sessions |
| WMS | 05 | Inventory Visibility & Adjustments | `wms/inventory-levels` | `WmsInventoryLevels` (adjustments: `wms/adjustment-transactions`) |
| WMS | 06 | Cycle Counting | `wms/cycle-counts` | `WmsCycleCounts` |
| OMS | 01 | Order Management and Intake | `order-management` | route constant; 15,371 sessions |
| OMS | 02 | Product Detail & Auto Pack | `product-and-packaging` | `ProductAndPackaging`; 300 sessions — demo is Product Catalog → Specs and Packaging |
| OMS | 03 | Order Consolidation | `order-management` | demo mirrors Order Management |
| OMS | 04 | Inbound Order Management | `order-management?tab=inbound-transactions` | tab enum `InboundTransactions="inbound-transactions"` in the app bundle |
| OMS | 05 | Order-to-Fulfillment Handoff | `order-management` | the handoff starts at the order |

Unchanged from before: 11 modules already had the right URL. Changed: 18 (15 were falling back to the system default).

### Evidence

- **Route table**: the production React bundle (`app.freightpop.com/app/assets/index-BukWAC4E.js`, 1.87 MB, fetched
  2026-10-02) contains the route-constant enum (`QuoteShip="/quote-ship"`, `WmsReceiptsTransactions="/wms/receipts"`, …)
  and the Order Management tab enum (`sales-orders`, `outbound-transactions`, `inbound-transactions`,
  `services-management`, `roi-calculation`, `load-planning-agent`).
- **Session counts**: Appcues `session_started` page URLs, 90 days to 2026-09-24, production host only
  (`freightpoppricer/metrics/Appcues_Tenant_URLs_and_Sandboxes_2026-09-24.xlsx`, "Unique URLs" sheet; 195 production
  URLs, 248,037 sessions). Query strings were dropped in that extract, so `?tab=` values are verified from the
  bundle only.
- **Framing**: `GET app.freightpop.com/app/` returns no `X-Frame-Options` / `Content-Security-Policy` header, so the
  iframe embed is allowed. Not verified: whether the app keeps the `#/…` deep link across its login redirect, and
  whether a signed-in session is visible inside the deck's iframe (third-party storage partitioning). Reps should
  be signed in to the demo tenant in the same browser.

## Tabs inside the live embed (2026-10-02)

Both live views — the module's **Live Demo → Live Site** tab and the full-screen **Live Site** pill view — now carry a
browser-style tab strip, so several FreightPOP pages can be open side by side *inside the deck* instead of in separate
browser tabs.

- The first tab is the context page (the module's `liveUrl`, or the pill's URL). **＋ New tab** lists every page the deck
  knows (the 29 module pages de-duplicated to 23 app pages, labelled by app page name — "Order Management", "WMS · Receipts" —
  not by module name, because several modules share a page) plus **Paste a URL…** for anything else.
- Up to 6 tabs (`LIVE_SLOTS`). Each tab is a fixed iframe slot that stays mounted while hidden, so switching tabs keeps the
  page where you left it. Closing a tab frees its slot (later tabs shift down and reload). The tab list is shared by both
  views and persists for the session; opening a different module's Live Site adds/activates that module's page.
- **↗** on the right of the strip opens the active tab in a real browser tab when that is what you want.
- Page names live in `LIVE_PAGE_NAMES` (keyed by the route after `#/`); unknown routes are humanised from the path.

What the deck cannot do on its own: catch a page the *app itself* opens with `window.open` / `target="_blank"` — the frame is
cross-origin, so the popup lands in a real browser tab (with its own, unpartitioned login). **Correction 2026-10-05:** the 2026-10-02 note
here said the app had no `window.open`; that grep missed React's `target:"_blank"` props and the lazy chunks. The History page's
transactions section (`SectionTransactionsHistory-*.js`) does `window.open(${origin}/app/#${route}, "_blank")` for the **truck icon**
("open transaction") and `window.open(…TransactionsHistoryListExcel…)` for the Excel export. That is what pops a rep out of the embed.

**The fix is a one-line change in the app, plus a listener the deck already has.** When framed, the app should hand the URL to its
parent instead of opening a tab:

```js
const url = `${window.location.origin}/app/#${route}`;
if (window.top !== window.self) window.parent.postMessage({ type: "freightpop:open", url }, "*");
else window.open(url, "_blank");
```

The deck listens for `message` events **from `https://app.freightpop.com` only**, accepts `{ type: "freightpop:open", url }` where `url`
starts with `https://app.freightpop.com/`, and opens it as a new deck tab (an already-open URL is activated; with all 6 slots taken the
active tab is replaced). Verified headless with a stub app page: truck → new "Track" tab; a foreign URL, a duplicate, and a message
from the deck's own window are ignored. Until the app change ships, the **↗** button in the toolbar is the way back into a browser tab.

### Working around it without the product team (2026-10-05)

Ranked by how well they work:

1. **Browser extension — built and verified: `deck-embed-extension/`** (install page + zip served by SalesOS at `freightpopsales.com/deck/deck-embed-extension/`).
   A 20-line MV3 content script runs in every `app.freightpop.com` frame before the app boots (`world: "MAIN"`, `all_frames`).
   When the app is framed it rewrites `window.open` and `target="_blank"` links that point at the app itself into the
   `freightpop:open` message above; external links and file exports keep the native behaviour, and top-level app tabs are
   untouched. Verified in Chromium with the deck: truck click → "Shipment Details · 47851298" deck tab, no popup; `_blank`
   link → deck tab; external `window.open` → real tab; top-level app page → native new tab. One-time install per rep:
   `chrome://extensions` → Developer mode → Load unpacked (README in the folder). Chrome 137+ no longer honours
   `--load-extension` from the command line, so the offline kit cannot auto-load it; it is a manual 30-second step.
2. **Serve the deck from a `*.freightpop.com` host** (e.g. `deck.freightpop.com` → the fpdeck Netlify site). Does not stop the
   popup, but makes the frame *same-site* with the app, so the rep's normal browser login works inside the deck and the popup
   tab no longer asks to sign in again. DNS + Netlify custom domain; pairs well with (1).
3. **Same-origin mirror proxy** (deck host proxies `/app/*` → `app.freightpop.com`): would make the frame same-origin, letting the
   deck override `contentWindow.open`, read the real in-app route for the address bar and use native back/forward. **Not viable
   as-is:** the app derives its API host from the page hostname (`xie()` in the bundle: `app` → `appbe.freightpop.com`;
   `localhost` → `http://localhost:26264`), so under another host it calls the wrong backend, and even with a rewritten bundle the
   API would need CORS for the deck origin or a second proxy. Only worth it if the API team cooperates — which defeats the premise.
4. **`sandbox` without `allow-popups` on the frames:** the browser blocks the popup silently, so the rep stays in the deck but
   the truck icon does nothing. Kept out of the deck on purpose; a dead click in a demo is worse than a stray tab.
Login inside the frame: the email/password form renders framed (checked headless); the **OIDC Login** button
redirects to an identity provider that refuses framing, so SSO users should sign in to app.freightpop.com in the same
browser first.

Verified headless (Playwright, Chromium 1234): open module 02 live → strip shows "Carrier Management"; ＋ New tab → menu
of 23 pages; add Order Management and WMS · Receipts → 3 iframes, only the active one displayed; switch back; close one;
Live Site pill shows the same tabs; Back to deck. No page errors.

### Browser chrome: address bar, ← → ⟳ (2026-10-05)

Under the tab strip both live views now carry a browser toolbar: **←** / **→**, **⟳**, an **address bar**, **Go** and **↗**.

- **Address bar.** Shows the active tab's URL and follows tab switches. Type and press **Enter** (or **Go**) to open the
  address as a **new tab**, which becomes active — the page you were on stays in its tab. An address that is already open
  activates that tab instead of duplicating it; when all 6 slots are taken the active tab is replaced. **⇧Enter** (or
  ⌘/Ctrl+Enter) replaces the active tab in place; **Esc** reverts. Accepted forms: a route
  (`wms/receipts`, `/track`, `#/audit`, `order-management?tab=inbound-transactions` → `https://app.freightpop.com/app/#/…`),
  a bare host (`app.freightpop.com/app/#/audit` → `https://…`), or any full `http(s)://` URL. Any site can be typed, but a site
  that sends `X-Frame-Options` / `frame-ancestors` will refuse to render inside the frame — the ↗ button opens it in a real tab.
  Keys typed in the address bar never reach the deck's keyboard navigation (arrow keys, Esc, …).
- **← / →** walk the pages the *deck* sent that tab to (⇧Enter replacements, the module's page). The badge at the bottom-left names the active tab's real host and page. The frames are
  cross-origin, so the deck cannot see where the rep clicked *inside* the app; the address bar therefore shows the last
  URL the deck navigated the tab to, not the app's current in-app route. **⟳** remounts the active frame and reloads that URL.
- **Shared sign-in across tabs.** Every tab is an `app.freightpop.com` frame under the same top-level page, so all of them
  share one cookie jar and `localStorage` (browsers partition third-party storage *by top-level site*, and all our frames
  sit under the same one). Sign in once in any tab and every tab — and every tab opened later — is signed in. The frames
  carry `allow="… storage-access"` so the app could call the Storage Access API if it ever does.
- **Not shared: the rep's normal browser login.** When the deck is served from `fpdeck.netlify.app` or `freightpopsales.com`,
  `app.freightpop.com` is a *cross-site* frame, so Chrome/Safari/Firefox give it a separate, partitioned cookie jar — being
  signed in to the app in a regular tab does not sign the deck's frames in (reps sign in once inside the deck instead, which
  then covers every tab). To make the browser login carry into the deck, serve the deck from a `*.freightpop.com` host
  (e.g. `deck.freightpop.com` → the fpdeck Netlify site): same site as the app means no partitioning, one login everywhere.
  That is a DNS + Netlify custom-domain change, not a deck change.

Verified headless (Playwright, Chromium 1234, app stubbed): module 02 live → bar shows `#/carrier-management`; type
`wms/receipts` + Enter → frame navigates, tab relabels "WMS · Receipts", deck `?go=` unchanged; ← / → move between the two;
⇧Enter `track` → second tab; bare-host and full-URL forms; arrows/Esc inside the bar leave the deck where it is; ⟳ keeps
2 frames; clicking a tab updates the bar; Live Site pill view shows the same tabs plus the module's page, one address bar.

## Integrations tab (2026-10-06)

**Audit.** The tab was a static overlay outside the deck app (`#fpErpGuide`, lines ≈1235–1551): 54 hardcoded rows, Google-favicon
logos, 16 hand-written detail pages + 5 generic category texts, its own search/filters/Esc handling. Not editable in Sales OS, not
deep-linkable below `?go=erp`, invisible to tracked-link screen events and to deck versions. The nav said "54 connected systems" but
counted editions of one system as systems (5 Dynamics rows, 3 SAP, 2 QuickBooks, 2 Epicor). ShipLink (on the public partner page) was
missing. Content was otherwise consistent with freightpop.com/integration-partners and the FPPricer ERP integration analyses.

**Now.** A deck-native screen rendered from `integrations` in the config (admin → Integrations): `{ eyebrow, h1, lede, footnote,
apiUrl, partnersUrl, categories[], depths[], implementationPartners[], featured[], generic{category}, items[] }`. Each item:
`id, name, category, editions[] (strings; append " · legacy" / " · roadmap" to flag), depth (native | bilateral | api | edi | ipaas |
hardware), tags[], logoDomain | logo, status (live | request | roadmap), blurb, inFlows[], outFlows[], methods[], proofUrl, demoGo`.
Versions of one system are editions on one card — 47 systems · 59 editions. Verified enrichments: NetSuite SuiteApp; Acumatica native
plug-in / Plug N Play / custom API with native auto-select targeted for 2025 R2 (roadmap chip); Dynamics 365 BC + F&O on Microsoft
AppSource, GP/AX/NAV marked legacy; Sage X3 bi-directional; SAP B1 / ECC / S/4HANA; partner pages and customer stories as proof links.
Screen: category + "how it connects" chips, search (`/`), stat chips, 3-column cards with edition chips and a depth badge, a detail
drawer (editions, into / back-to flows, methods, "See it in the deck →" to a module demo, proof link, copy link), implementation-partner
strip, API / partner-directory links. Deep links: `?go=erp` or `?go=integrations`, `?go=erp/<id>` opens the drawer (ids in the admin);
the Link button and tracked-link `screen` events carry the id. Esc closes the drawer, then leaves the tab. Nav subtitle and lede
substitute `{systems}` / `{editions}` (the legacy "54 connected systems" string is mapped automatically). **Deck versions:**
`overlay.integrations.featured` (ids) pins those systems first with a ★ and adds a "★ Your stack" filter — set under Deck versions →
Your stack. Logos: an approved `logo` URL wins; otherwise the vendor favicon, hidden on error (no inline handlers — the runtime passes
`onerror` attributes through literally). Still unverified in the catalog (kept, not asserted beyond the generic text): Oracle ERP, Fox ERP,
ERP One, Direct Response, Tharstern, Lighthouse SyteLine, Four51, Invetrak. The Carriers tab is still a static overlay (`#fpCarrierGuide`).

### Integration scope · Detailed API view · visibility (2026-10-07)

Some integration detail is not ready to share, so visibility is per system, per section, and gated by one control:

- **`visible`** (per system, default true). Off = the system stays in the catalog (admin) but never renders: not in tiles, stats, the
  nav count, search, or `?go=erp/<id>` (the deep link falls back to the tab).
- **`scope`** (per system): `{ objects[], triggers[], frequency, auth, api[] ("METHOD /path — purpose"), mapping, limits[] }`. Seeded
  from verified docs for NetSuite, Acumatica, Dynamics, Sage X3 and Cubiscan; `auth` and `api` are empty everywhere because no
  per-system endpoint or auth detail is confirmed — the admin fills them in. Top level: `apiSurface[]` (the public API page's
  capabilities) and `apiNote`.
- **`scopeVisibility`** (per system): `public` → the "Integration scope" block (objects, triggers, frequency, auth) shows in every deck;
  `internal` (default) → only when the Detailed API view is on; `hidden` → never.
- **`controls.detailedApiView`** (default **off**). On: the drawer shows the scope for `internal` systems plus a **Detailed API view**
  button that opens a panel with the FreightPOP API surface, endpoints, mapping / implementation notes and limits. Per link `?c=api` /
  `?c=noapi`; per deck version under Deck versions → Presentation; deep link `?go=erp/<id>/api` opens the panel directly (the `/api`
  suffix is ignored while the control is off, and the Link button only writes it when the panel is on).

**Layer 2 (2026-10-07).** Per system: `useCases[] { title, in[], out[], note }` (public — product capability, no names),
`customers[] { name, status live|implementing|churned|unknown, approved, note }` with `customersVisibility` (public → only *approved*
names on the card as "Also running on FreightPOP"; internal (default) → every name with status in the Detailed API view; hidden → never),
`tickets[] { key, summary, status, url, why }` + `ticketsAsOf` (Detailed API view, "In flight & known issues"). Seeded from the Sales OS
RAG store and Snowflake by five analysts — 118 use cases, 343 customer links (none approved), 95 open tickets; proposals for the public
cards in `docs/integrations-proposals-2026-10-07.md`. Internal Ops view: Sales OS `/sales-ops/integrations`.

Reminder: everything in `/api/config` is public, including `internal` scope, customer names, tickets and hidden systems — the gate is in the deck, not the API.
Keep anything truly confidential out of the config; the control hides it from prospects, not from someone reading the JSON.
Admin: Integrations → each system has Visible, Scope visibility, the scope fields and two preview links ("Open in deck",
"Detailed API view") pointing at `freightpopsales.com/deck/view`; Presentation controls → "Detailed API view (Integrations)".

## Hotkeys · hero video · helper notice (2026-10-05)

**Hotkeys.** Press **?** anywhere in the deck for the list. Letters are gated by `controls.hotkeys` (admin → Presentation controls →
"Letter hotkeys"; per link `?c=nohotkeys`); arrow keys stay under the existing "Arrow-key / Esc navigation" toggle. Keys typed into an
input (the Live Site address bar) never trigger them.

| Key | Does |
|---|---|
| `?` | Show / hide the hotkey list |
| `← →` | Previous / next screen or step (as before) |
| `1`–`4` | In a module: Problem · Benefit · Live Demo · Validation |
| `V` | Intro hero video (the Rive animation) on / off for this session |
| `M` | Jump-to menu |
| `H` | Main menu |
| `B` | Back |
| `L` | Live Site, full screen |
| `F` | On the Live Demo step: Expand the demo (Esc collapses). On Live Site / ROI / Walkthrough / Main menu: browser fullscreen |
| `T` or `/` | Focus the Live Site address bar (then type a route, Enter opens a new tab) |
| `[` `]` | Previous / next Live Site tab |
| `K` | Copy a link to this screen |
| `Esc` | Close the list / menu / Live Site / ROI view, or step back |

**Hero video.** `controls.heroVideo` (default on; admin toggle "Intro hero video"; per link `?c=novideo`) and the `V` hotkey. Off
pauses both Rive instances (the static intro overlay's and the deck's) and hides their canvases, leaving the navy intro with the
headline. Deck versions can override it (Deck versions → Presentation → "Intro hero video").

**Live Site helper notice.** When the deck loads it shows a bottom-right card — "Keep FreightPOP inside the deck." — with **Get the
helper ↗** (→ `settings.helperUrl`, default `https://freightpopsales.com/deck/deck-embed-extension/`, the extension's install page that
serves the zip) and **Not now** (hides it for 7 days, `localStorage fp.helperDismissed`). The extension announces itself from inside
every framed app page (`{ type: "freightpop:helper", version }`), which hides the notice for good and turns the Live Site toolbar
pill from "Install helper ↗" into a green "Helper on". Admin: Presentation controls → "Show the install notice"; per link `?c=nohelper`.

## Host-page deep links (2026-10-05)

When the deck is framed by a host page on the same origin (SalesOS `/deck/freightpop-supply-chain` → `/deck/view`), two messages
keep the deep link in the host's address bar: the deck posts `{ type: "freightpop:go", go, search }` from `_syncUrl` on every screen
change, and the host may post `{ type: "freightpop:host", base }` (same origin only), after which the deck's **Link** button copies
`base + ?go=…` instead of its own frame URL. Hosts that do not speak the protocol are unaffected.

## Typography pass (2026-10-05)

The deck and every companion page were brought onto the FreightPOP brand type system (brand guidelines v20 §2, §8, §12, §13):
DM Sans 500 for eyebrows (11px, .08em, uppercase), buttons/pills (14px, sentence case, no tracking), badges and labels; Manrope 500
tabular numerals for step/module numbers; Manrope 500 for the ROI stat; body copy ≤ 15px at weight 400. DM Mono now appears only
where it is code or a URL: the address bar, the host badge, the access-token field. Companion pages load
`Manrope 400/500 · DM Sans 300/400/500 (+italic) · DM Mono 400/500` from Google Fonts (no 700 — the browser would fake it), the
42 demo screens dropped the `Segoe UI` stack for DM Sans, and every `font-weight 600–900` outside `@font-face` became 500.
Demos still mirror the app's layout and copy; only the typeface changed (user decision, a deliberate departure from CLAUDE.md's
"mirror the app" rule for fonts). Nav items stay 12px: with 12 tabs the top bar already overflows at 1280px, and 13px hid two more.

## ROI tab — in the deck, not a browser tab (2026-10-02)

The **ROI** top-bar tab used to `window.open` the intake form in a new browser tab — the only thing in the deck that did.
It now opens a full-screen in-deck view like Live Site (iframe + "← Back to deck", "⛶ Fullscreen" and "Open in new tab ↗"
pills), deep-linkable as `?go=roi`, tracked as screen `roi`.

`settings.roiMode` (admin → Settings & links → "ROI tab opens"):

| Value | Behaviour |
|---|---|
| `auto` (default) | In the deck when the form can be framed from the deck's origin, else a new browser tab. The form's CSP is `frame-ancestors 'self' …` (freightpopsales.com `netlify.toml`), so "can be framed" means same origin. When the deck is served by SalesOS (`/deck/view` — freightpopsales.com, or `localhost:8888` in dev) and the form is on freightpopsales.com, the form's origin is swapped for the deck's: the same SalesOS app serves both routes, so prod and the dev server both embed. On `fpdeck.netlify.app` (deck served at `/deck`, different origin) it still opens a browser tab. |
| `embed` | Always in the deck. Only correct after the deck's origin is added to the form's `frame-ancestors`. |
| `tab` | Always a new browser tab (the behaviour before 2026-10-02). |

The offline kit hides the ROI tab (`data-hide=…,roi` in the boot script), so none of this applies there.

## Checks

- **`cd sales-os-api && npm run check`** (`scripts/check-deck.js`): the deck script parses and constructs; all 29 modules
  have the fields the admin/deck/kit rely on with the right types (`num`, `name`, `tag`, `problem.heading`,
  `benefit.bullets`, `demo.caption`, unique `demo.anim`, `demo.liveUrl` as an `https://app.freightpop.com/app/#/…` URL,
  `roi.stat`/`statLabel`, known `roi.ev.grade`); `defaults.json` is what `npm run defaults` would write; the published
  config carries the same module `liveUrl`s (drift = warning, empty = failure). Exit 1 on failure. Run it before pushing.
- **`npm run crosscheck -- --deck "<path to the deck file>"`** in the kit repo (`~/Projects/freightpop-deck-kit`,
  `crosscheck.mjs`): resolves every Live Site URL against the production app's own route table (read from
  `app.freightpop.com/app/assets/index-*.js`), checks `?tab=` values against the bundle's tab enums, pings the external
  links, and compares the packed offline kit file-by-file with the deck site. This is the check that says "that page
  exists in the app"; `npm run check` here cannot know that.
- `tab=shipping-approval-rule` on Shipping Rules used to warn: the enum is in a lazy `types-*.js` chunk, not the main bundle. Since 2026-10-05 `crosscheck.mjs` looks unknown tab values up in those chunks (fetched once, on first miss), so the check is clean.

## Changing a link

- One module, now: SalesOS → admin → Sales Deck → module → live URL → publish (new revision, live on next deck load).
- The deck default (what `reset` and the offline kit's config snapshot fall back to): edit `liveUrl` in the module's
  `demo: { … }` in the deck file, run `cd sales-os-api && npm run defaults`, commit both, push `main`
  (Netlify auto-deploys fpdeck), then publish a revision so the stored document matches.
