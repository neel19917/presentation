# Live Site deep links

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
| TMS | 01 | Shipping Rules Engine | `company/rules?tab=shipping-approval-rule` | `CompanyRules` route constant; `/company/rules` 109 sessions. **The `tab` value is not in the React route table** (kept from the previous author; harmless if ignored) |
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

## Changing a link

- One module, now: SalesOS → admin → Sales Deck → module → live URL → publish (new revision, live on next deck load).
- The deck default (what `reset` and the offline kit's config snapshot fall back to): edit `liveUrl` in the module's
  `demo: { … }` in the deck file, run `cd sales-os-api && npm run defaults`, commit both, push `main`
  (Netlify auto-deploys fpdeck), then publish a revision so the stored document matches.
