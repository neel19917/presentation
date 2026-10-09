# Integrations tab — proposed updates from Jira, Freshdesk, Confluence and production data

_2026-10-07 · Research run over the Sales OS RAG store (6,333 Jira tickets, 26,882 Freshdesk tickets, 7,456 Confluence chunks) and Snowflake shipment data. Five analysts, one per system group; every claim cites a ticket key, a wiki page or "snowflake". Internal layers (use cases, scope, customers as **not approved**, open tickets) are already merged into the deck behind the Detailed API view. **Public-facing edits below are proposals — nothing on the public card changed.**_

## How to read this

- **Apply** = change the public card (blurb, editions, how it connects, status, visibility). Needs your approval; edit in admin → Integrations.
- **Merged** = already in the deck's internal layers (use cases with ins/outs, scope, customers, tickets). Visible only with the Detailed API view (`?c=api`) until you flip a system's scope / customer visibility.
- Customers are listed from tickets and shipment data. None is marked *approved to name*; flip the switch per account once marketing has permission.

**Totals:** 51 systems analysed · 129 use cases · 361 customer links · 107 open tickets tracked.

## Summary

| System | Confidence | Use cases | Customers | Open tickets | Recommended card change |
|---|---|---|---|---|---|
| [netsuite](#netsuite) | high | 12 | 101 | 12 | new blurb, editions |
| [acumatica](#acumatica) | high | 7 | 16 | 6 | new blurb, editions |
| [dynamics](#dynamics) | medium | 7 | 15 | 8 | connects → api, new blurb, editions |
| [epicor](#epicor) | medium | 6 | 29 | 12 | new blurb, editions |
| [sap](#sap) | medium | 6 | 10 | 10 | new blurb, editions |
| [sage](#sage) | medium | 6 | 15 | 2 | connects → api, new blurb, editions |
| [syspro](#syspro) | medium | 5 | 10 | 4 | new blurb, editions |
| [quickbooks](#quickbooks) | medium | 5 | 14 | 3 | new blurb, editions |
| [infor](#infor) | medium | 6 | 12 | 1 | new blurb, editions |
| [oracle-erp](#oracle-erp) | low | 4 | 5 | 2 | new blurb, editions |
| [rootstock](#rootstock) | medium | 3 | 2 | 1 | new blurb, editions |
| [erp-one](#erp-one) | low | 1 | 1 | 0 | **hide**, new blurb, editions |
| [four51](#four51) | low | 1 | 2 | 3 | **hide**, new blurb |
| [tharstern](#tharstern) | medium | 1 | 2 | 0 | new blurb, editions |
| [lighthouse-syteline](#lighthouse-syteline) | low | 1 | 1 | 0 | **hide** |
| [fox-erp](#fox-erp) | low | 0 | 0 | 0 | **hide**, status → request |
| [direct-response](#direct-response) | low | 1 | 0 | 0 | **hide**, status → request |
| [invetrak](#invetrak) | low | 1 | 0 | 0 | **hide**, status → request |
| [made2manage](#made2manage) *(not in catalog)* | low | 0 | 0 | 0 | **hide** |
| [iqms](#iqms) *(not in catalog)* | low | 2 | 3 | 2 | **hide**, status → request, connects → api, editions |
| [macola](#macola) *(not in catalog)* | low | 1 | 1 | 0 | **hide**, status → request, connects → api, editions |
| [plex](#plex) *(not in catalog)* | low | 1 | 1 | 0 | **hide**, status → request |
| [odoo](#odoo) *(not in catalog)* | low | 1 | 3 | 0 | **hide**, status → request, connects → api, new blurb, editions |
| [fishbowl](#fishbowl) *(not in catalog)* | low | 0 | 0 | 0 | **hide**, status → request |
| [edi](#edi) | medium | 6 | 20 | 3 | new blurb, editions |
| [cubiscan](#cubiscan) | medium | 4 | 7 | 5 | new blurb, editions |
| [shiplink](#shiplink) | medium | 2 | 18 | 1 | new blurb |
| [extensiv](#extensiv) *(not in catalog)* | low | 1 | 3 | 2 | status → live, connects → api, new blurb, editions |
| [veracore](#veracore) | medium | 2 | 4 | 1 | new blurb |
| [brightpearl](#brightpearl) | medium | 3 | 6 | 3 | new blurb, editions |
| [logiwa](#logiwa) | low | 1 | 1 | 0 | new blurb |
| [shiphero](#shiphero) | low | 1 | 1 | 0 | **hide**, status → request |
| [snapfulfil](#snapfulfil) | low | 0 | 0 | 0 | **hide**, status → request |
| [zoho](#zoho) | medium | 1 | 3 | 0 | new blurb, editions |
| [mulesoft](#mulesoft) | low | 1 | 1 | 0 | connects → api, new blurb |
| [boomi](#boomi) | low | 2 | 3 | 0 | connects → api, new blurb |
| [celigo](#celigo) | low | 0 | 1 | 0 | **hide**, status → request, connects → api |
| [katana](#katana) *(not in catalog)* | low | 0 | 0 | 0 | **hide**, status → request |
| [cin7](#cin7) *(not in catalog)* | low | 0 | 0 | 0 | **hide**, status → request |
| [shopify](#shopify) | medium | 4 | 15 | 2 | connects → native, new blurb, editions |
| [bigcommerce](#bigcommerce) | medium | 1 | 3 | 1 | connects → native, new blurb |
| [woocommerce](#woocommerce) | low | 2 | 7 | 2 | connects → native, new blurb |
| [magento](#magento) | low | 2 | 3 | 1 | status → request, new blurb |
| [amazon](#amazon) *(not in catalog)* | low | 4 | 6 | 7 | status → live, connects → api, new blurb, editions |
| [salesforce](#salesforce) | low | 3 | 4 | 1 | status → request, new blurb |
| [hubspot](#hubspot) | low | 0 | 0 | 0 | **hide**, status → request |
| [samsara](#samsara) | medium | 5 | 5 | 5 | new blurb |
| [gomotive](#gomotive) | medium | 3 | 3 | 4 | new blurb |
| [trimble](#trimble) | low | 1 | 2 | 1 | status → roadmap, new blurb, editions |
| [tive](#tive) | low | 1 | 1 | 1 | new blurb |
| [fictiv](#fictiv) *(not in catalog)* | low | 1 | 1 | 1 | **hide** |

## Platform — FreightPOP External API and import architecture

Cross-cutting facts about how FreightPOP connects to any ERP. Three delivery mechanisms appear in the records: (1) the External API (REST, bearer token from an API-enabled account's user credentials; documented at api.freightpop.com/Help; 300 calls/min per account; API Gateway at external-api.freightpop.com with X-API-Key usage plans), used by 38 production tenants in the last 12 months (Snowflake) and by the NetSuite SuiteApp; (2) hard-coded plug-and-play connectors (NetSuite, QuickBooks, SAP, Epicor, Brightpearl, Business Central and others) run by the ERPOrdersImportService batch job plus live import on search; (3) 'ERP Automation' / ConfigurableERP, a data-driven mapper (GenericJsonMapper, IntegrationMappings, code snippets) that connects on-prem SQL through the FreightPOP VPN connector, FTP/SFTP files (CSV, Excel, EDI) and REST/GraphQL endpoints without new code. Every ERP integration shares the same shape: orders in, shipping truth out, approved freight invoices to AP, optional product catalog and tracking exports. Health is monitored by a daily ERP Health Check Log, Datadog alerts and Integration Transaction Notification emails. The deck's '1,500+ supported connections' claim and the 'On-prem agent' method wording are not backed by anything in these records (the agent is the VPN connector / ERP connector service).

**Objects / resources:** Orders (SO/PO/pick ticket/fulfillment); Shipments and quotes; Tracking events; Approved invoices (AP); Product catalog items; Address book / carrier / package lookups; Dock Scheduling appointments (planned)

**Triggers:** External API: on demand by the customer's system; Live import: user searches an order number; Batch import: ERPOrdersImportService task every ~15 min (goal; 15–30 actual), 2 companies in parallel, 15-min per-company timeout; Export: per shipment at ship time, after pickup, or daily file; AP export: nightly 10 PM PDT; Product catalog: nightly

**Documented endpoints:** POST /token/getToken — obtain bearer token (External APIs); rate/getRates/V4 and getRates — rate shop (SuiteApp 1.0.263, BF-12027); importOrders/V4 (SaveOrderV4) — submit orders to Order/PO Management (BBL-3736 page); getCarriers — carrier/service list (TT-9124); POST /token/impersonate — staff impersonation, 24-h token (BBL-6278 page, design); Docs: https://api.freightpop.com/Help ; environments api.freightpop.com, enterprise.freightpop.com, sandbox-api.freightpop.com, qa-api.freightpop.com; Internal: POST /Order/ImportOrders, GET /Order/UpdateItemFulfillmentsNetSuiteParallel, /Admin/CreateIntegraionInvoice, /Invoice/ImportInvoice

**Limits & caveats:** 300 API calls per minute per account (External APIs page); API Gateway standard plan proposed 'as low as 30 requests per minute' (API Gateway Documentation, not confirmed); API access requires the ChurnZero 'API Access Journey' (kickoff, Postman collection, api@freightpop.com support, ~30 days) before credentials are enabled; No invoice read API today (BF-11524 Groomed); no product GET endpoint (Freshdesk 69646); One ERP integration per account (FP-5486); Mapper cannot flatten arrays or map array-of-arrays (ERP Integration with GenericJsonMapper); Product catalog import is create-only (BF-11691); Customer ERP endpoints and FTP servers often require FreightPOP services server IP whitelisting (Freightpop Services Details)

**Auth:** External API: POST /token/getToken with an active user's credentials from a company flagged AllowFPApi; bearer token valid 14 days; X-API-Key via AWS API Gateway (external-api.freightpop.com) with Standard usage plan; staff impersonation endpoint POST /token/impersonate replacing the master password (BBL-6278 design). ERP connectors: per-ERP credentials stored on CompanyERP (NetSuite TBA, OData/REST tokens, SQL via VPN connector, SFTP with SSH fingerprint).

**Notes:** GenericJsonMapper JSON-to-JSON mappings (FromField, FromField.Sub, [0], [i] many-to-many, ## premappings) chosen from dropdowns built from JSON samples; JavaScript code snippets (JINT) for transforms; URL/header/parameter/body/response mapping groups for chained REST endpoints; SQL import/export/cancel queries with @OrderNumbers; FTP file mapping to CSV/Excel/EDI rows; carrier and payee mapping tables shared by all ERPs.

**Shared ins and outs (every ERP integration):**

- **External API – rate, ship, track from the customer's own system** — in: Rate requests (rate/getRates/V4), create shipment with or without a prior quote, submit orders to Sales Order / PO Management (importOrders V4 with carrier, payment terms, shipper address, items, shipment details with inner pieces), post external shipments, cancel shipment, lookups (carriers, packages, address book, products add/delete, users) · out: Rates, shipment confirmation with labels/documents (printed automatically when the API user has the printer connector running), shipment details, tracking get/update; resources exposed: Track, Shipment, Order, Quote, Rate, Address, Product, User
- **Order import (any ERP) → shipment** — in: Sales orders / pick tickets / fulfillments / POs with ship-to, product details, SO and PO numbers, ship via (carrier+service), payee, references; via plug-in API, on-prem SQL query, FTP file or REST endpoint; live on search or batch (~every 10–15 min) · out: Tracking, carrier, service, ship date, cost (discounted, list or markup) and status written back per shipment (or daily file); cancel query/file per shipment; carrier and payee mapping tables translate codes both ways
- **AP freight invoice export** — in: Approved invoices from Freight Audit (EDI 210, carrier API, upload, PDF parse, portal, broker) with GL code / location logic · out: Nightly (5:00 AM UTC / 10 PM PDT) export as ERP AP transaction (NetSuite vendor bill, P21, Business Central, Sage, QuickBooks), CSV to FTP/SFTP or SQL; failures logged to invoice ExportErrorMessage
- **Product catalog sync** — in: Item master from ERP (API, on-prem query or FTP file) daily; item numbers, descriptions, dims, weight, package types, bulk packaging, freight class, NMFC, HTS · out: None (one-way); today create-only — existing products are not refreshed (BF-11691)
- **Tracking status export** — in: Carrier tracking events (API, EDI 214, FTP track files) and manual updates · out: Latest status/comment/appointment date to ERP fields or files; hourly lambdas update in-transit shipments
- **ERP Automation as an inbound/outbound hub for WMS and Dock Scheduling** — in: External system calls a FreightPOP endpoint on an event; FreightPOP maps and passes data through (pattern DA-3778) · out: Appointment or WMS data pushed to the customer ERP on a configured status (open work)
- **Integration configuration portability** — in: ERP Automation exports a full integration to JSON and re-imports it (update existing or create new) · out: Proposed extension to Carrier Management for prod→sandbox cloning

**Cross-cutting open tickets:** BF-11896 Alley-Cassetty ERP re-import replaces sales-order rows instead of updating (~20-min row lifetime, 96% soft-deleted); BF-11752 TForce approved invoices not exporting to Dynamics Business Central (Star Industries); BF-11691 Product catalog sync should refresh existing products from the ERP (source of truth); create-only today; BF-11681 Export/import carrier configuration between accounts for prod→sandbox cloning, extending ERP Automation JSON export; BF-11524 External API for Freight Audit GetInvoices so customers can pull approved invoices into their AP system (Fenner Dunlop); BF-12061 Push Dock Scheduling appointment data to the customer ERP on a configured status via ERP Automation; TT-8725 Batch import orders/shipments from the ERP straight into Dock Scheduling (will-call customers); NOMAI-286 ERP Health Check Monitor (recurring task behind the ERP Health Check Log); BF-10614 Email Integrations@freightpop.com when a NetSuite AP export fails (extends existing Integration Transaction Notification); BF-7914 Show AP export response ('View Export') in the Audit grid for failed ERP exports; TT-9124 De-duplicate UPS services in getCarriers/getRates external API responses; FP-5486 Allow more than one ERP integration per account

**Gaps:** No evidence for the '1,500+ supported connections' figure; External API SLA, versioning policy and the live rate limit after the API Gateway rollout are not documented in these records; API Gateway rollout state (production stage, which customers have keys) is unknown; the page is a working doc with TODOs; Impersonation endpoint (BBL-6278) is a design page; no Jira status in this set; Which Snowflake external-api tenants call the API directly vs through ShipLink/partners is only known for Pro Plastics and Shiplink Global; Integration channel code 4 ('secondary import channel', 7 tenants) and code 6 are uninterpreted

**Proposed page-level edits:** Applies to integrations.generic.erp and the lede. Replace 'On-prem agent' with 'On-prem SQL via FreightPOP VPN connector' (ERP Integrations page; Laminate Technology SOP; FP-6626 'service installed on your server'). The lede's '1,500+ supported connections through the FreightPOP API, EDI and partner middleware' has no support in these records; either source it or drop the number. Public API facts safe to state: REST, documented at api.freightpop.com, token auth, sandbox environment, rate/ship/track/order/address/product endpoints. Do not state a rate limit publicly: internal docs give 300/min while the gateway plan discussion mentions 30/min. External API tenant count (38 in 12 months) is internal.

## Per system

### netsuite
<a id="netsuite"></a>

**Confidence:** high · **Deck card:** Oracle NetSuite (native, live)

NetSuite is FreightPOP's flagship ERP integration: 85 production tenants shipped through the NetSuite plug-in channel in the last 12 months (Snowflake), with 103 Jira tickets (39 open) and 120 Freshdesk tickets in the record set. Two products exist: (1) the FreightPOP-side 'plug and play' connector over SuiteTalk SOAP (token-based auth) that imports Sales Orders, Item Fulfillments, Transfer Orders, POs, RMAs and PO Inbound Shipments on a schedule or on demand and writes tracking, carrier, ship date, cost, package records and status back, exports approved freight invoices as Vendor Bills nightly and syncs the Item Master nightly; and (2) the FreightPOP SuiteApp ('NetSuite Native', installed from the SuiteApp marketplace) that adds a FreightPOP tab for rate shopping on Quote/SO/TO/PO/IF and shipping from the Item Fulfillment using the FreightPOP External API. Most open work is per-customer custom field mapping; structural open items are the SuiteTalk REST migration (NOMAI-350), NetSuite WMS transactions via REST (NOMAI-495, epic New) and product-catalog overwrite (BF-11691).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `native` (now `native`)
- Blurb → “FreightPOP's most implemented ERP integration. Sales orders, item fulfillments, transfer orders and purchase orders pull into FreightPOP on a schedule or on demand; tracking, carrier, ship date, freight cost and package details write back to the same NetSuite transaction; approved freight invoices post as vendor bills; and the FreightPOP SuiteApp lets teams rate shop and ship from the item fulfillment without leaving NetSuite.”
  - now: “The deepest ERP integration in the catalog — bilateral sync across every transaction type NetSuite ships or receives, plus a native FreightPOP app that quotes carriers from inside the NetSuite transaction window.”
- Editions → FreightPOP SuiteApp · installs from the NetSuite SuiteApp marketplace (current release line 1.0.26x, NetSuite 2026.1); NetSuite accounts with one or many subsidiaries (per-subsidiary or all-subsidiary configuration) (now: FreightPOP SuiteApp · installs from NetSuite › SuiteApps; NetSuite OneWorld and single-instance accounts)
- Into FreightPOP → Sales orders, item fulfillments, transfer orders and purchase orders import in batch or on demand, filtered by prefix and status; Item master syncs nightly into the product catalog with dims, weight, freight class, NMFC and HTS; PO inbound shipments and RMAs import on request; Hazmat flags, payment terms and up to six reference fields map from NetSuite custom fields
- Back to the system → Tracking, carrier, ship date and freight cost write to the sales order or item fulfillment at ship time or after carrier pickup; Package records with weight and tracking are created on the item fulfillment and its status is set to Shipped (configurable); Approved freight invoices export nightly as NetSuite vendor bills; Latest tracking status and appointment date update custom fields through delivery
- Methods → API connection (SuiteTalk, token-based auth); Native app inside NetSuite (SuiteApp); Real-time or scheduled batch
- Why: Keep depth=native and status=live. Remove or re-label three current claims: (1) 'WMS receipts, picks and inventory adjustments post back automatically' — NetSuite WMS via REST is an open epic with status New (NOMAI-495), no evidence it is live; (2) 'RMAs import — batch or real-time' — RMAs are real-time search only (NetSuite FAQ); (3) 'bilateral sync across every transaction type' — overstated; an account imports either SOs or IFs, not both. 'OneWorld' is not mentioned anywhere in the records; the SuiteApp supports multi-subsidiary configuration, so say that instead. The APM-script note on the current card (BayWa 2026-05) is not in this record set; keep only if sourced elsewhere. Frequency wording should be 'scheduled batch (about every 10–15 minutes)' given conflicting docs. Also open but not listed above: BF-10614 (AP export failure email), NOMAI-217 (Tilemart AP transaction), BF-9957 (SPS document generation epic), NOMAI-557 (Fictiv onboarding on Native), BF-10663 (SPS BOL number to NetSuite), FP-5486 (multiple ERPs per account).

**Merged — use cases (ins and outs):**

- **Sales order → shipment** — in: SO ship-to address, lines (item, qty, description, unit price), customer PO number, ship method (carrier+service via carrier mapping), subsidiary/location ID matched to FreightPOP address book for ship-from; Prefix include/exclude filters and status filter; optional total weight from transaction; payee from a mapped custom field (Prepaid/Collect/Third Party); Reference 1–6 custom fields (Ref1=SO#, Ref2=PO# by default) · out: Shipping cost (discounted, list or marked-up; to native Shipping Cost, Memo, both or a custom field; total, per package or per weight; optional % or flat markup), ship date, tracking number and carrier written to the SO; Export at ship time (default) or after carrier pickup confirmation; partial shipments supported when shipping from SOs _(source: Confluence: External Integrations – NetSuite (Sales Order Integration), Confluence: NetSuite FAQ, Confluence: FreightPOP-NetSuite Integration)_
- **Item fulfillment → shipment** — in: IFs in Picked/Packed/Shipped or custom status, searched by IF number, by SO (all linked IFs) or by Sales/Transfer Order; same header/line fields as SO plus package weights from the IF package tab, hazmat flag and FP Hazmat ID custom fields, inner pieces via custom package records · out: One NetSuite package record per tracking number with weight and commodity description; shipping cost; ship date; carrier; IF status set to Shipped (or Picked/Packed/no status update); cancel in FreightPOP resets IF to Packed and removes cost and tracking _(source: Confluence: External Integrations – NetSuite (Item Fulfillment Integration), Confluence: NetSuite FAQ, NOMAI-448, NOMAI-131)_
- **Transfer order → shipment** — in: Transfer orders via 'Sales/Transfer Orders' search type; batch TO import only enabled for specific tenants (ThomasFood, Thrasio) · out: 'Create Item Fulfillment' option builds an IF in NetSuite with the shipped TO lines; same shipping data write-back as SO/IF _(source: Confluence: FreightPOP-NetSuite Integration, Confluence: Background Jobs & Import Architecture, NOMAI-326)_
- **Purchase order inbound / RMA** — in: POs imported on search (prefix PO) or in batch (ImportPOsInBatch); RMAs (prefix R) imported on real-time search only; PO Inbound Shipments import when enabled with a status filter · out: PO export at ship time, after pickup or not at all: tracking, carrier, cost and expected receipt date to customer-specified PO fields (header or item level) _(source: Confluence: NetSuite FAQ, Confluence: FreightPOP-NetSuite Integration, Confluence: Background Jobs & Import Architecture, FP-5249)_
- **Tracking status write-back** — in: Carrier tracking events and manual updates in FreightPOP · out: Latest tracking status, latest tracking comment and appointment date to customer-created custom fields on the SO/IF (hourly on delivery day); hourly TddbsExport job re-sends Shipped status/tracking for IFs that missed the update _(source: Confluence: External Integrations – NetSuite (Item Fulfillment Integration), Confluence: Services and Jobs Catalog, Freshdesk 70968)_
- **AP freight invoice export (Vendor Bill)** — in: Approved invoices in the Freight Audit module with GL code (or 'Allow Auto Export with no GL Code') · out: One NetSuite Vendor Bill per approved invoice, nightly 10 PM PDT: vendor ID, invoice number, dates, due date, memo, location ID, invoice amount line and expense category (per shipment type parcel/non-parcel) mapped to GL _(source: Confluence: NetSuite FAQ, Confluence: NetSuite Known Issues, Confluence: Innovive - 19841, BF-8344, NOMAI-217)_
- **Item master → product catalog** — in: Inventory, Inventory Lot and Assembly/BOM items with FP custom item fields (dims, weight, freight class, NMFC, HTS, country of origin, UPC, package type, bulk pack L1–L3), full pull first run then modified-since nightly 10 PM PDT · out: None (one-way); SuiteApp also offers Master Product Data download/upload templates to mass-populate the FP item fields in NetSuite _(source: Confluence: NetSuite FAQ, Confluence: NetSuite Native Inside of NetSuite (Latest Version 2025.1), BF-11691, NOMAI-415)_
- **Quote and ship inside NetSuite (SuiteApp / NetSuite Native)** — in: FreightPOP tab on Quote, Sales Order, Transfer Order, Purchase Order and Item Fulfillment; ship-from by default address, transaction location, subsidiary or first line item location; carriers/services imported from FreightPOP as NetSuite Shipping Items; auto calc and dual rating (LTL + parcel in one rate shop) · out: Rate shop results (carrier, service, transit days, cost) applied to the transaction; shipping from the IF returns labels, pallet labels, BOL, packing slip and tracking, marks the IF Shipped and files documents and API requests on the IF History tab; optional return label on every shipment _(source: Confluence: NetSuite Native Inside of NetSuite (Latest Version 2025.1), Confluence: SuiteApp 1.0.263, BF-12027, TT-9124)_
- **EDI ASN via SPS Commerce NetSuite bundle** — in: Ship-to addresses flagged for SOPI/SOTI ASN type; SPS package definition IDs on predefined packages · out: SPS custom package/content records on the Item Fulfillment (carton index, qty, weight, tracking, UCC/SSCC) so SPS generates the 856 ASN; UCC labels printed from FreightPOP _(source: Confluence: SPS Commerce - Netsuite, Confluence: Per-Customer Customization Map (Pyramex), NOMAI-587, BF-10663)_
- **ERP order change review (Change Management)** — in: NetSuite updates to an order already allocated in FreightPOP create a pending -V1/-V2 copy with email notification · out: Reviewer accepts (promotes copy) or rejects; NetSuite-only feature behind ChangeManagementEnabled flag _(source: Confluence: Change Management (NetSuite) — Product & QA Reference)_
- **Custom field mapping (import and export)** — in: Per-company IntegrationMappings for SO import (type 32), PO import (29) and any NetSuite custom body/column field into FreightPOP fields · out: SO export (33) / PO export (30) mappings to custom fields, e.g. markup to custbody_actual_shippingcosts, Ref3 to custbody_bill_code, shipment ID to custbody_freightpop_shipid _(source: Confluence: NetSuite Custom SO Mappings, Confluence: NetSuite Purchase Order Custom Mappings, NOMAI-371, NOMAI-572, NOMAI-586, NOMAI-434)_
- **NetSuite WMS transactions via SuiteTalk REST (roadmap)** — in: PO Receipts, Inventory Adjustments, Customer RMAs, Vendor RTVs, Inbound/Outbound Transfers, Manufacturing/BOM via https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1/ · out: Not built: epic status New _(source: NOMAI-495, NOMAI-350)_

**Merged — customers (101; 79 live, none approved to name):** Clean Simple Eats, Avocado Green Brands, LLC, Everflow Supplies LLC, Mayne Inc, Spry Brands, GrowGeneration USA Inc, Nice North America LLC, Tessco LLC, Thomas Foods International USA, Rhythm Healthcare, Quality Resource Group, Vita, TDBBS LLC (unknown), Ledge Lounger, Alliance RV, Forma Brands LLC, Extreme Dimensions, Homemakers Furniture, Mayfield Industrial Door, LLC, BayWa r.e. Solar Systems LLC, Labrada Nutrition, Bruegmann USA, Workwell Technologies, Associated Packaging, Inc., Automatic Systems, Inc, Explore Scientific, GreenChem Industries LLC, Unique Appliances, TileMart, Urban Surfaces, Innovive, Clarus Glassboards LLC, Walker Tape Co, Total Home Supply, Champion Motorsports Group, Suja Life, LLC, Wilding Wallbeds, Best Sanitizers, Inc., Wirthco, WM. K. WALTHERS INC. … +61 more

**Merged — in flight / known issues:** BF-12021 Global-Pak wants ship-to email pulled from NetSuite custentity_packinglist_email (New); BF-11648 Expose fleet charge breakdown in the ERP import object so NetSuite-sourced cost merges with fleet charges (McCollister's) (In Testing); BF-11691 Product catalog sync should overwrite mapped fields on existing products (ERP as source of truth); today it is create-only (New); TT-9124 Suppress duplicate UPS services in getCarriers/getRates so the SuiteApp shipping-method dropdown stops showing duplicates (Tessco) (Ready to Test); BF-11259 McCollister's cost structure epic: migrating off AS400 onto NetSuite + FreightPOP (New); NOMAI-604 Avocado wants a calculated NetSuite IF field mapped to carrier insurance amount (New); NOMAI-602 Global-Pak wants container number, dispatch date, freight forwarder and booking fields written to NetSuite (New); NOMAI-601 Explore Scientific (WWEX) needs NetSuite HTS code field mapped on order import (New); NOMAI-586 Forma Brands wants the FreightPOP shipment ID written to custbody_freightpop_shipid on export (New); NOMAI-495 Epic: NetSuite WMS transactions (PO receipts, inventory adjustments, RMAs, RTVs, transfers, BOM) via SuiteTalk REST (New); NOMAI-403 BayWa r.e.: all orders default to the Joliet warehouse regardless of NetSuite ship-from location (Support Validation); NOMAI-350 Research REST endpoints for all transactions used today; SOAP web services will eventually be discontinued (New)

**Proof of capability (closed):** BF-12027 Markup rules now apply to getRates V4 used by the NetSuite SuiteApp (Tessco); NOMAI-448 Midco/Mayfield: IF export mapping adjusted so NetSuite can set ship date on Shipped status without permission errors; NOMAI-131 Uneekor: return tracking appended to IF package tracking instead of overwriting outbound tracking; NOMAI-434 BayWa r.e.: custom NetSuite sales order import mapping delivered; BF-9849 SPS Commerce documents integration backend/API connection (ASN beyond the NetSuite bundle); TT-8411 BayWa r.e.: shipment stop data pushed to Samsara after NetSuite signals ready for dispatch

**Gaps / could not confirm:** No evidence in the records that NetSuite WMS transactions (receipts, picks, inventory adjustments) are live — only the NOMAI-495 epic; 'OneWorld' edition support not stated anywhere; multi-subsidiary config is documented for the SuiteApp only; Exact batch cadence conflicts across docs (10 min vs 15 min vs 15–30 min); Snowflake account status codes are uninterpreted; 'live' here means shipments since 2026-07-01; SuiteApp install counts and SuiteApp-vs-plug-in split per tenant are not in the records; No public proof/reference approvals recorded; all customer names are internal; API version drift: engineering doc says WSDL 2024.2, SuiteApp release page says NetSuite 2026.1, NOMAI-350 says everyone is on 2025.2; 'PCM' in customer notes = Confluence page 'Per-Customer Customization Map'

### acumatica
<a id="acumatica"></a>

**Confidence:** high · **Deck card:** Acumatica (native, live)

Acumatica is FreightPOP's most documented ERP integration after NetSuite, with two delivery models: a Plug N Play API connector (FreightPOP imports Open sales orders, Open/unconfirmed shipments and purchase orders, then creates/updates the Acumatica shipment with packages, tracking, carrier and freight cost, confirms it, and can post AP bills) and a native carrier plug-in that runs rate shopping inside the Acumatica Sales Order / Shipment screens on top of the FreightPOP external API. Roughly a dozen named accounts run it today (General Data, Blackburn, D.P. Wagner, Tobacco Rag, Sonco, Ferris/PolyMem, Buffalo Seal, Shaw Ross, Whitehall, Baird Brothers); most issues in the last 12 months are write-back/confirm failures, batch-import gaps and package-name mismatches rather than missing capability. In-flight work is WMS-adjacent for D.P. Wagner (inventory adjustments, RTV, PO receipts) plus the native dual rate shop / auto-select best rate build for Acumatica 2025 R2 (BBL-5945). No Acumatica tenant appears in the Snowflake channel snapshot, so volumes cannot be confirmed from it.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `native` (now `native`)
- Blurb → “Connect Acumatica sales orders, shipments and purchase orders to FreightPOP. Ship from inside Acumatica with the FreightPOP carrier plug-in, or let FreightPOP import open orders, then write carrier, tracking and freight cost back to the Acumatica shipment and confirm it. Approved freight invoices post to Accounts Payable.”
  - now: “Bi-directional integration covering four core areas: outbound shipping from Sales Orders, outbound from Shipments, inbound freight from Purchase Orders, and AP export.”
- Editions → Native plug-in · rate shop and ship inside the Acumatica Sales Order / Shipment screens; Plug N Play · FreightPOP API connector for sales orders, shipments and purchase orders; Custom · External API for non-standard environments; Native dual rate shop and auto-select best rate · targeted for Acumatica 2025 R2 · in progress (now: Native plug-in · rate shop and auto-select inside the Acumatica Shipment screen; Plug N Play · bilateral sync through the FreightPOP External API; Custom · External API for non-standard environments; Native auto-select best rate · targeted for Acumatica 2025 R2 · roadmap)
- Into FreightPOP → Open sales orders import by batch or live lookup for rating, booking and execution; Open Acumatica shipments import — FreightPOP updates the existing record, not a copy; Purchase orders import to create inbound shipments (no write-back to the PO)
- Back to the system → Carrier, tracking, packages and freight cost written to the Acumatica shipment, which is then confirmed and the sales order closed; Approved freight invoices export to Accounts Payable as bills; SPS Commerce ASN export with SSCC for Acumatica orders packed in FreightPOP
- Methods → Acumatica REST API (username/password); Batch every 10–15 minutes plus real-time lookup; exports in real time; Native plug-in built on the FreightPOP external API
- Why: Keep the four-area story (SO, Shipment, PO, AP) — it matches the records. Remove 'User-to-printer mapping sends docs to the right station' from outFlows: nothing in Jira/Freshdesk/Confluence ties printer mapping to Acumatica. Add the PO 'import only' qualifier. Native auto-select best rate is real and in progress (BBL-5945 dev plan) but should stay flagged roadmap. The scope.mapping sentence citing 60 analysed accounts comes from FPPricer, not these records — keep only if that source is approved. Add limits (package name match, manual carrier, no cancellation export) to scope for reps.

**Merged — use cases (ins and outs):**

- **Sales order → shipment (Plug N Play)** — in: Open sales orders pulled by batch (every 10–15 min) or live by order number; Ship-to contact/address, line Quantity, InventoryID, LineDescription, UnitPrice, UOM, WarehouseID (matched to FreightPOP address book company id for ship-from), Ship Via (mapped to carrier), SOOrder.CustomerOrderNbr → PO number (Ref2) · out: FreightPOP creates the Acumatica Shipment, updates package lines with quantity and tracking, updates freight cost and carrier, confirms the shipment and closes out the sales order _(source: Confluence: Acumatica Plug N Play in FreightPOP, Confluence: Acumatica Plug N Play Field Mapping, Confluence: Acumatica REST API Integration, NOMAI-181, BF-12100)_
- **Acumatica shipment → FreightPOP (update existing record)** — in: Open, unconfirmed Acumatica shipments (Open or Picked status), with ship-to, product lines, carrier; Ref1/Ref2/unit price pulled from the linked sales order; SOShipment.ShipDate → required ship date (Shaw Ross, BBL-5763) · out: Update shipment packages + tracking (extra packages created if FreightPOP has more than Acumatica), update cost/carrier, confirm shipment — the existing Acumatica record is updated, not copied _(source: Confluence: Acumatica REST API Integration, Confluence: Acumatica Plug N Play in FreightPOP, Confluence: Korpack - 20048, Confluence: Shaw Ross - 19460, FD 71629)_
- **Purchase order inbound (import only)** — in: Purchase order transaction data for inbound shipments; Shaw Ross imports only POs whose ShipVia = FREIGHTPOP (BBL-5300) · out: None in the standard integration — no data is written back to the Acumatica PO. Customer-specific PO ETA-date export on tracking updates was scoped for Tobacco Rag (BBL-5697) _(source: Confluence: Acumatica Plug N Play in FreightPOP, Confluence: Shaw Ross - 19460, Confluence: Tobacco Rag Processors - 20285)_
- **AP freight invoice export (Bill)** — in: Approved carrier invoices in FreightPOP audit · out: Create Bill request to Acumatica AP (VendorID, VendorRef, BillDate, Branch, Location, PostPeriod, CreateBill…); AP date configurable per BBL-5697 backstory; custom GL logic built for Riva Floors (WM-2321) _(source: Confluence: Acumatica REST API Integration (AP Transaction), Confluence: Acumatica Plug n Play (CS export mappings), Confluence: Tobacco Rag Processors - 20285, Confluence: Riva Floors - 19856 - CHURNED)_
- **Native plug-in: rate shop and ship inside Acumatica** — in: Shop For Rates on the Sales Order / Shipment screen sends packages, dims, weight, freight class and accessorials to FreightPOP via the external API; FreightPOP carriers/services appear as Acumatica Ship Via codes · out: Selected rate populates Ship Via; Quick Process creates and confirms the shipment with freight cost, tracking/PRO per package, parcel or pallet labels and BOL attached to the shipment _(source: Confluence: Acumatica Demo Site, Confluence: Acumatica - Inside Acumatica (current version 2025 R1), Confluence: Acumatica ERP Customization, Confluence: Acumatica Shipment Screen Customization – Technical Documentation, FD 70485, FD 65705)_
- **SPS Commerce ASN export for Acumatica orders** — in: Acumatica sales orders packed in FreightPOP (FP Delivery / scan-to-verify flows) · out: Customer package identifier and SSCC generated so the SPS ASN export is valid; SSCC toggle independent of UCC labels _(source: BF-11999, BF-11758, BF-11727)_
- **WMS write-backs for Acumatica (in flight, D.P. Wagner)** — in: RTV / purchase return orders (import, blocked) · out: Inventory adjustments → Acumatica InventoryAdjustment (blocked), PO receipts export (PO validation), RTV export (PO validation); BOM Operations/Work Centers fields added to product catalog (done) _(source: NOMAI-115, NOMAI-249, NOMAI-293, NOMAI-114, BF-11653)_

**Merged — customers (16; 10 live, none approved to name):** General Data (20291), Blackburn Manufacturing (20074), D.P. Wagner (20331), Wind River Tobacco / Tobacco Rag Processors (20285), Sonco Worldwide (20205), Ferris Mfg / PolyMem (20259), Buffalo Seal (20390), Shaw Ross International Importers (19460), Whitehall Products, Baird Brothers Sawmill, Anchor Distributors (20405) (implementing), Korpack (20048) (unknown), Mold In Graphics / Polyfuze (20174) (unknown), Jack T Carter (19752) (unknown), Riva Floors (19856) (churned), Antebellum (unknown)

**Merged — in flight / known issues:** BF-12100 Buffalo Seal: Customer Order Nbr not landing in Reference 2 on SO import (In Testing); NOMAI-293 Plug N Play RTV (return to vendor) export (PO Validation); NOMAI-249 Plug N Play RTV import into outbound transactions (batch + realtime) (Blocked); NOMAI-115 WMS inventory adjustments → Acumatica InventoryAdjustment (Blocked); NOMAI-114 PO receipts export to Acumatica (PO Validation); BBL-5945 Native plug-in dual rate shop + auto-select best rate, target Acumatica 2025 R2 (status from Confluence dev plan, not in Jira export) (in progress)

**Proof of capability (closed):** BF-11999 SSCC generation toggle for Acumatica SPS ASN export; BF-11758 Customer package identifier in scan-to-verify packing for Acumatica/BC/NetSuite SPS export; BF-11653 BOM Operations and Work Centers synced from ERP into product catalog; NOMAI-181 Batch import now pulls all Open orders (Tobacco Rag); TT-8460 Third-party FedEx validation after billing address pulled from Acumatica; NOMAI-347 Internal Acumatica upgraded 2023 R2 → 2024 R2 → 2025 R2

**Gaps / could not confirm:** No Acumatica tenant appears in the Snowflake snapshot (codes 1/2/4/5/6/7 only), so 12-month shipment volumes per account cannot be confirmed; Current card's 'User-to-printer mapping' outflow has no evidence in these records; Exact REST endpoint paths beyond the sample /entity/Default/22.200.001/Shipment and the planned InventoryAdjustment/PurchaseReceipt calls are not written down; Whether Acumatica item-master/product catalog sync exists is not documented (only BOM fields via BF-11653); Status of BBL-5945 is from a Confluence dev plan marked 'in progress'; no Jira record in the export; Korpack, Mold In Graphics and Jack T Carter have no 2026 activity in the records

### dynamics
<a id="dynamics"></a>

**Confidence:** medium · **Deck card:** Microsoft Dynamics (native, live)

Records show four distinct Dynamics editions in play, each with a different connection method. Business Central: API-based sales-order and warehouse-shipment integrations in flight (Precious Cat, Krowne), a live AP freight-invoice export (Star Industries) and an SFTP CSV variant (1Concier); BC is also listed as a supported ERP in the ERPOrderImport batch service and in the SPS Commerce ASN export work. Finance & Operations: one live/maturing OData integration (Flair Flexible Packaging) covering sales orders, loads and voyages with write-back, still receiving mapping changes. NAV/Navision and GP: on-prem SQL connector integrations (NRP Jones Navision 18 via WWEX; Impex Fitness NAV; Logiquip, Keystone, EMIT, Niagara, Express Trading on GP). No record mentions Dynamics AX or the Microsoft AppSource listing, and zero Freshdesk tickets matched.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `native`)
- Blurb → “Connects Microsoft Dynamics to FreightPOP by edition: API integrations for Dynamics 365 Business Central and Finance & Operations, and on-prem SQL connector integrations for Dynamics NAV and GP. Orders, loads and warehouse shipments come in; carrier, tracking and freight cost go back, with approved freight invoices exported to Business Central AP.”
  - now: “Listed on Microsoft AppSource as a certified partner: bilateral integration with Dynamics 365 Business Central and Finance & Operations — orders in, rates and documents at shipping, tracking and freight cost written back to the Dynamics record.”
- Editions → Dynamics 365 Business Central · API (custom BC API) or SFTP CSV; Dynamics 365 Finance & Operations · OData data entities; Dynamics NAV / Navision · on-prem SQL connector; Dynamics GP (Great Plains) · on-prem SQL connector (now: Dynamics 365 Business Central · Microsoft AppSource; Dynamics 365 Finance & Operations / Supply Chain Management · Microsoft AppSource; Dynamics GP (Great Plains) · legacy; Dynamics AX · legacy; Dynamics NAV (SQL & NAV DB) · legacy)
- Into FreightPOP → Sales orders, warehouse shipments (BC) and loads/voyages (F&O) import with addresses, items, lot and PO data; Real-time pull by order number or scheduled batch import
- Back to the system → Carrier, service, tracking number and freight cost written back to the Dynamics record; Approved freight invoices exported to Business Central AP; SPS Commerce ASN data generated for BC-packed shipments
- Methods → OData / REST API (BC, F&O); On-prem SQL connector (NAV, GP); SFTP CSV file transfer (BC)
- Why: Current card claims 'native', AppSource certification, bilateral real-time sync and an AX edition. None of the records mention AppSource or AX; keep those claims only if marketing can source them elsewhere. Depth is better described as 'api' for BC/F&O and connector for NAV/GP. Remove 'Approved freight invoices export for AP' as a blanket claim unless scoped to BC (only BC AP export is evidenced). Keep the Western Computer / Clients First partner note only if sourced (Western Computer appears once as NRP Jones' support vendor).

**Merged — use cases (ins and outs):**

- **Sales order -> shipment (BC, NAV, F&O, GP)** — in: Sales order header and lines: ship-to/sold-to, location/warehouse code, items, quantities, customer PO, ship-to email/phone (NAV pulls these from the Customer table); F&O sales orders via Sales Order Headers V4 with cross-company filter; lot ID, data area ID, packing slip ID, requested ship/receipt dates · out: Carrier, service, tracking number, shipping cost and charges written back (NAV: INSERT into Posted Package table; GP: tracking number(s), freight amount, carrier name, notes on the GP sales order; F&O: carrier/service, rate, tracking number and URL on the packing slip transaction) _(source: NOMAI-222, NOMAI-223, NOMAI-392, NOMAI-342, NOMAI-599, NOMAI-49, Confluence: Logiquip - 17698, Confluence: Flair Integration Fields we map to, Confluence: Impex Fitness Inc - 18176)_
- **Warehouse shipment import/export (Business Central)** — in: BC warehouseShipments and warehouseShipmentLines (shipment number, location, ship-to, sales order no, customer PO) via a custom BC API (PW/BCFP/V2.0) · out: Package tracking number and shipment data back to the warehouse shipment (export in scope of the same ticket) _(source: NOMAI-424, NOMAI-566)_
- **Loads and voyages (F&O)** — in: Outbound loads with picked quantity, lot number, HTS code and product descriptions (WCIWHSLoadLines, ReleasedProductsV2/ProductsV2); inbound voyages treated as purchase orders with ship-from port and warehouse ship-to · out: Carrier and service code written to OutboundLoadHeaders.ShippingCarrierCode; packing slip data, rate and tracking exported _(source: NOMAI-49, NOMAI-538, NOMAI-394, Confluence: Flair Integration Fields we map to)_
- **AP freight invoice export (Business Central)** — in: Approved carrier invoices with GL code and carrier vendor ID from the Audit page · out: Approved invoices auto-exported to Business Central (currently failing for TForce invoices at Star Industries) _(source: BF-11752, BF-11743)_
- **SPS Commerce ASN export alongside BC orders** — in: BC orders packed in FreightPOP (FP Delivery / scan-to-pack) · out: Customer package identifiers and SSCC data feeding the SPS ASN export _(source: BF-9959, BF-11727, BF-11758)_
- **File-based BC integration (SFTP CSV)** — in: One CSV per order from Business Central via sftp://api.freightpop.com/Import · out: One export file per order with shipment data to /Export _(source: Confluence: 1Concier - 19623 (WM-1382))_
- **Purchase order inbound (GP)** — in: Purchase orders pulled into PO Management via on-prem SQL when the transaction starts with PO · out: — _(source: Confluence: Express Trading- 18777 (RS-160))_

**Merged — customers (15; 4 live, none approved to name):** Flair Flexible Packaging (Canada), Precious Cat (implementing), Krowne (implementing), Star Industries, NRP Jones (via WWEX) (implementing), Impex Fitness, 1Concier, Logiquip (unknown), Keystone Safety & Cleanroom (unknown), EMIT Technologies (unknown), Niagara Conservation (unknown), Express Trading (unknown), CTC Global (churned), CGW Abrasives (unknown), Marley Spoon (unknown)

**Merged — in flight / known issues:** BF-11752 TForce approved invoices not exporting to Business Central (AP export) (New); NOMAI-599 Final F&O sales-order mapping changes for Flair (New); NOMAI-538 Final F&O loads mapping changes for Flair (Work In Progress); NOMAI-394 F&O fields not populating (data area, lot ID, packing slip ID, ref 3) (Work In Progress); NOMAI-424 Business Central warehouse shipment import and export build (Assigned to Sprint); BF-11384 Testing for BF-11383: orders not importing to Business Central (New); NOMAI-342 Business Central open sales orders integration (New); NOMAI-221 Navision 18 on-prem SQL import/export epic (outbound sales orders) (New)

**Proof of capability (closed):** NOMAI-223 Navision 18 on-prem SQL export into Posted Package table; NOMAI-222 Navision 18 on-prem SQL import from Sales Header/Line/Item; NOMAI-392 Navision mapping change: ship-to email/phone from Customer table; NOMAI-49 F&O sales orders, loads and voyages mapped with carrier/service write-back; BF-9959 SPS Commerce <> FreightPOP integration for Business Central, part 2; BF-11758 Customer package identifier in scan-to-pack flow for Acumatica, BC and NetSuite SPS exports

**Gaps / could not confirm:** No record mentions Microsoft AppSource or any certification; No evidence of a Dynamics AX integration; Auth method for BC and F&O APIs not recorded; No Freshdesk tickets matched; support history for Dynamics customers is not visible here; Several GP customers (Logiquip, Keystone, EMIT, Niagara, Express Trading) do not appear in the Snowflake snapshot so live status is unknown; Jira 'customer' field for NRP Jones is WWEX (reseller); end-customer taken from ticket summary

### epicor
<a id="epicor"></a>

**Confidence:** medium · **Deck card:** Epicor (api, live)

Epicor is one of the most active integration families in the records, almost entirely Prophet 21 (P21) for distributors plus a smaller set of Epicor Kinetic manufacturers. P21 runs three ways: a plug-and-play API integration built on P21 OData views for import and the /uiserver0/api/v2/transaction endpoint for shipment and AP write-back (SouthernCarlson live, Berk Brands, Champion Products, Ascenso, Tarantin, Pewag/Wallingford's via ShipLink), on-prem SQL connector integrations (Fasteners & Fittings, Industrial Threaded Products, Midland Scientific, ASD Lighting, New World Imports) and SFTP AP voucher files (Calderon Textiles, ASD Lighting). Kinetic integrations are customer-specific REST builds: Trystar (Erp.BO.* services incl. AP invoice groups, documented on the Trystar Epicor Integration page), ATX Networks (BAQ-based, scoping through PM review), Vira Insight (on-prem connector + stored procedure, blocked/validating) and three WWEX-referred accounts (Leer, Nordic Ice, Winholt). Recent support load is real: write-back failures to P21, AP group creation stopping for Trystar, and connection timeouts after P21 cloud migrations.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connects Epicor Prophet 21 and Epicor Kinetic to FreightPOP. Pick tickets, pack slips and transfers come in by API or on-prem SQL connector; carrier, tracking and freight cost go back to the Epicor transaction, and approved freight invoices can post to AP.”
- Editions → Epicor Prophet 21 (P21) · API (OData views + transaction API) or on-prem SQL connector; Epicor Kinetic · REST (BAQ / Erp.BO services), customer-specific; Epicor Prelude · customer API (single account) (now: Epicor Kinetic / Epicor ERP; Epicor Prophet 21 (P21) · distribution)
- Into FreightPOP → Pick tickets, pack slips, sales orders, transfers and POs import with ship-to, items, carrier and payment terms; Search by pick ticket or order number; batch import or real-time pull
- Back to the system → Carrier, service, tracking number and freight cost written back to the P21 or Kinetic shipment; Approved freight invoices exported as AP vouchers or AP invoice groups
- Methods → P21 OData views and transaction API; Kinetic REST services / BAQs; On-prem SQL or ODBC connector; SFTP voucher files for AP
- Why: Card currently has empty blurb/flows. Keep P21 as the headline edition (most live accounts); position Kinetic as customer-specific API builds, not a packaged connector. Prelude is a one-off. Do not name customers externally.

**Merged — use cases (ins and outs):**

- **Pick ticket / pack slip -> shipment** — in: P21: pick ticket header and detail (pick_ticket_no, order_no, carrier_id, instructions, qty_to_pick, item_id), order header ship-to, address and inv_mast item data via OData views; search by pick ticket or order number; Kinetic: CustShips with ShipDtls filtered by company and a 'send to FreightPOP' checkbox, plus plant, customer, contact, ship-to and sales order lookups (Trystar); ATX via a BAQ (ATX_FreightPopData) incl. Incoterms and HTS · out: P21: carrier_id, tracking_no and freight_out posted to the Shipping transaction (TABPAGE_1 / TABPAGE_FREIGHT); Kinetic: carrier, service, package type, dims, weight, class, tracking number and pickup times to Erp.ShipHead / ShipHead_UD; freight cost added as a ShipMisc charge when order has a 'Prepd & Charge' misc line _(source: NOMAI-200, NOMAI-87, NOMAI-89, NOMAI-334, Confluence: Ascenso North America Tires - 20328, Confluence: Trystar Epicor Integration, NOMAI-90, Confluence: Industrial Threaded Products (ITP) - 19781)_
- **AP freight invoice export** — in: Approved carrier invoices with GL code and internal vendor ID · out: P21: voucher created through /uiserver0/api/v2/transaction (Pewag, Wallingford's) or voucher header/line CSV files over SFTP (Calderon, ASD Lighting); Kinetic: daily AP invoice group (MMddyyyy) created via APInvGrpSvc, invoice header via APInvoiceSvc with misc charge code P105 and GL update (Trystar) _(source: NOMAI-193, Confluence: Calderon Textiles -19895, Confluence: ASD Lighting - 19593, Confluence: Trystar Epicor Integration, NOMAI-429, FD 72785, FD 46235)_
- **Inbound POs, RMAs, receipts and transfers (P21)** — in: Purchase orders, RMAs and receipts (Berk Brands phase 2); transfer orders (SouthernCarlson) · out: Transfer shipment data back to P21 (fixed in NOMAI-553) _(source: NOMAI-203, NOMAI-373, NOMAI-233, NOMAI-553, FD 64387)_
- **Address book sync (Kinetic)** — in: Customer ship-to records from a Kinetic BAQ batch import with default carrier and accessorial rules · out: — _(source: BF-11655, NOMAI-438)_
- **Product catalog / NMFC and hazmat data (P21)** — in: Item NMFC, weight, freight class from P21 or the FreightPOP product catalog; hazmat code description parsed into UN ID, class, shipping name, packing group · out: — _(source: Confluence: Southern Carlson - 20226, NOMAI-358, NOMAI-458)_
- **Retailer label data via import (Kinetic)** — in: Customer Type and Walmart LPN location identifier mapped from Epicor order import for Walmart GNFR pallet labels · out: LPN exported to Epicor (mismatch bug fixed BF-11633/BF-11706) _(source: BF-10727, BF-10922, BF-11633, BF-11706)_

**Merged — customers (29; 10 live, none approved to name):** SouthernCarlson, Trystar, Tarantin Industries, Berk Brands (implementing), Vira Insight (implementing), ATX Networks (implementing), Champion Products / Lakeside Trucking, Ascenso Tires North America, Industrial Threaded Products, Pewag Traction Chain / Pewag Illinois / Wallingford's, Calderon Textiles, Lindfast Solutions Group (implementing), ASD Lighting, ALP Supply, General Pacific (unknown), Merits Health Products (unknown), Winholt (via WWEX) (unknown), Leer (via WWEX) (implementing), Nordic Ice (via WWEX) (implementing), Fasteners & Fittings (unknown), Pure Safety Group (unknown), Rubberlite (unknown), Midland Scientific (unknown), New World Imports (unknown), Field Fastener (unknown), Farwest Sports (unknown), Griffin Greenhouse Supplies (unknown), Draper (unknown), Iowa Rotocast Plastics (unknown)

**Merged — in flight / known issues:** NOMAI-606 Auto-fill UPS account from P21 OE_HEADER.UPS_CODE on collect shipments (New); NOMAI-598 Vira Insight Epicor import mapping updates (New); NOMAI-429 Add GL codes to P21 standard integration (Support Validation); NOMAI-402 Vira Insight Epicor import via stored procedure (order-release numbers, ref fields) (PO Validation); NOMAI-374 Vira Insight Epicor export (fp_ShipmentLines table) (Blocked); NOMAI-373 Berk Brands P21 inbound import (POs, RMA, receipts) phase 2 pt 2 (New); NOMAI-358 Parse P21 hazmat code description into UN ID, class, name, packing group (Code Review); NOMAI-304 Nordic Ice Epicor Kinetic 2023.0.21 API integration (pack lists, batch + real-time) (New); NOMAI-234 Berk Brands P21 on-prem ODBC integration epic (batch + real-time) (New); NOMAI-203 Berk Brands P21 plug-and-play inbound import phase 2 pt 1 (New); NOMAI-438 Leer Epicor Kinetic sales order import, address book and export (New); NOMAI-61 ATX Kinetic scoping: packing slips, transfers and POs, import and export (PM Review)

**Proof of capability (closed):** NOMAI-467 SouthernCarlson P21 integration moved to live environment; NOMAI-200 Berk Brands P21 plug-and-play outbound (OData views + transaction API); NOMAI-193 P21 AP transaction created for three Pewag/Wallingford's accounts via ShipLink; NOMAI-334 Ascenso P21: search and import by pick ticket or order number; NOMAI-90 ATX Epicor Kinetic scoping with BAQ import mapping; BF-11655 Leer Kinetic address book import de-duplication

**Gaps / could not confirm:** No Epicor-side auth/frequency standard: every Kinetic build differs; Most Epicor customers are absent from the Snowflake snapshot (on-prem connector traffic may not be captured), so live status for SOP-only accounts is unknown; Freshdesk bodies are empty; edition for Merits Health, General Pacific and Iowa Rotocast unconfirmed; Trystar Epicor Integration page last updated 2023-10-13; Garden State Ovens in its samples is Epicor demo data, not a customer; No evidence of Epicor Eclipse, Vision or other Epicor products

### sap
<a id="sap"></a>

**Confidence:** medium · **Deck card:** SAP (api, live)

SAP is a Core Four partner on paper, but in the records every live SAP connection is bespoke and one-directional: Shaw Ross's SAP feeds pick tickets and POs to FreightPOP by EDI (with a 945 back), MAT Holdings exchanges SFTP files with SAP, Advantech pulls inbound delivery notes from an SAP S/4HANA API-management endpoint (import only), and American Honda ships SAP deliveries that arrive in Order Management. There is a 2021-era SAP Business One Service Layer integration guide (FP-3936) and a long-open plan for National Public Seating, but no B1 tenant is confirmed live. A seven-story 'SAP 4Hana' epic (import, export, item master, AP, address book, inbound) was opened Sep 2025 and is untouched. FreightPOP's import service lists SAP as a supported ERP and the deck's 'freight invoices land in AP' claim is not evidenced for SAP.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “FreightPOP connects to SAP through APIs, EDI or file exchange. Deliveries, pick tickets and purchase orders flow into FreightPOP for rating and shipping, and shipping data returns to SAP, so SAP stays the system of record.”
  - now: “Enterprise ERP integration across the SAP family: orders flow in, shipping truth flows back, and freight invoices land in AP — SAP stays the system of record without anyone re-keying freight data.”
- Editions → SAP S/4HANA · API (inbound deliveries live; full connector in planning); SAP ECC · EDI or SFTP file exchange; SAP Business One · Service Layer API (documented; VAR enables the API) (now: SAP S/4HANA; SAP ECC; SAP Business One · SMB)
- Into FreightPOP → Deliveries / delivery notes and pick tickets import for rating and shipping; Purchase orders import for inbound tracking
- Back to the system → Ship confirmation returned by EDI 945 or file (customer-specific); Tracking, cost and carrier code to SAP Business One (per integration guide)
- Methods → Customer-hosted SAP API endpoints; EDI (pick ticket in, 945 out); SFTP file exchange
- Why: Current blurb says 'freight invoices land in AP' — no SAP AP export is evidenced (B1 AP planned for NPS; S/4HANA AP story is New). Drop or soften that line. 'Orders flow in, shipping truth flows back' is only partly true: Advantech is import-only and Shaw Ross's write-back is EDI 945. Keep the three editions but mark B1 as 'documented' and S/4HANA full connector as roadmap. Consider depth 'edi'/'api' hybrid; status 'live' is defensible only on a per-customer basis.

**Merged — use cases (ins and outs):**

- **SAP → EDI pick ticket / PO → shipment (Shaw Ross)** — in: Outbound: SAP sends the picking-ticket EDI file to the 3PL warehouse and to FreightPOP; Inbound/third party: all POs sent to FreightPOP by EDI, suppliers/forwarders update what ships · out: EDI 945 after shipping (turned off for the Lansdale location Aug 2023); AP export not stated _(source: Confluence: Shaw Ross - 19460, Confluence: Testing Plan - Export ('SAP Via EDI'))_
- **SAP S/4HANA inbound delivery notes via API (Advantech)** — in: FreightPOP calls the customer's SAP API Management endpoint (ANASTOSchedule?DNNumbers=…) with an API key; master DN or multiple DNs map to PO number (StoPoNumber), Ref3 DnNumber, Ref4 DnType, routes to UDF1/2, lot and line references · out: None — 'Export Integration Fields: NA' _(source: Confluence: Advantech - SAP 4 Hana API integration, Confluence: Advantech - 19668, Confluence: Advantech - Workflow Call, Confluence: SAP Technical Guide)_
- **SAP ↔ SFTP file transfer (MAT Holdings)** — in: Inbound and outbound orders from SAP by SFTP file · out: Export file back to SAP (fields not in retrieved chunk); 'MATHoldings' listed in export test plan _(source: Confluence: MAT Holdings Inc - Workflow Call, Confluence: Testing Plan - Export, snowflake sql-or-file-import 3,441 shipments/12m)_
- **SAP deliveries → shipping requests with compliance approvals (American Honda)** — in: SAP Deliveries (800XXXXX) and manual Shipping Requests (SRxxx) enter Order Management; hazmat and international compliance approval rules · out: Not documented in retrieved chunks _(source: Confluence: American Honda - 20079)_
- **SAP Business One order import + tracking/cost write-back (documented, not confirmed live)** — in: Service Layer Login, Orders, ShippingTypes, DeliveryNotes: ship-to, billing address, items with qty, unit price, dims, weight, carrier · out: Tracking number, cost, carrier code back to SAP B1; requires the customer's VAR to open the Service Layer API _(source: Confluence: SAP Business One Integration Guide (FP-3936), FP-7252, Confluence: National Public Seating - 17562)_
- **SAP S/4HANA productised connector (roadmap, untouched)** — in: Stories for import, inbound import, item master, address book · out: Stories for export, inbound export, AP _(source: NOMAI-76, NOMAI-77, NOMAI-78, NOMAI-79, NOMAI-80, NOMAI-81, NOMAI-82, NOMAI-83)_

**Merged — customers (10; 2 live, none approved to name):** Shaw Ross International Importers (19460), MAT Holdings (19711), Advantech (19668) (unknown), American Honda (20079) (unknown), National Public Seating (17562) (unknown), Silver Vase (17733) (unknown), Galata Chemicals (19620) (unknown), Voomi Supply / Ascenso (implementing), iHerb (unknown), Triathlon Batteries (unknown)

**Merged — in flight / known issues:** NOMAI-76 SAP S/4HANA scoping (public cloud only) — Voomi Supply/Ascenso (New); NOMAI-77 SAP S/4HANA order import (New); NOMAI-78 SAP S/4HANA export (New); NOMAI-79 SAP S/4HANA item master (New); NOMAI-80 SAP S/4HANA AP (New); NOMAI-81 SAP S/4HANA address book (New); NOMAI-82 SAP S/4HANA inbound import (New); NOMAI-83 SAP S/4HANA inbound export (New); FP-7252 National Public Seating SAP B1 integration (New (2021)); FP-5574 SAP: batch-import 'Validated' orders to Orders tab (Silver Vase) (New (2020))

**Proof of capability (closed):** WM-1611 Advantech SAP S/4HANA API inbound import (cited in Confluence, not in Jira export); FP-3936 SAP Business One Service Layer integration guide (cited in Confluence, not in Jira export)

**Gaps / could not confirm:** No SAP AP export evidence despite the current blurb; No field map for Shaw Ross EDI or MAT Holdings file formats in the retrieved chunks; SAP B1 live customer unconfirmed (NPS Snowflake comment says VAI AS/400); Advantech and American Honda current status unknown (no 2025–26 tickets); 'automotive-sap' case-study subject not identified in records; S/4HANA epic has no owner/dates beyond Sep 2025 creation; Walmart GNFR 'SAP #' tickets (BF-10327/10334/10335) are Walmart's SAP item numbers for VIRA Insight (Epicor) — not an SAP integration

### sage
<a id="sage"></a>

**Confidence:** medium · **Deck card:** Sage (bilateral, live)

'Sage' in FreightPOP's records is three different products with three different plumbing patterns. Sage X3 is the partner-sponsored one (Core Four, 100% VAR-sold) and is delivered either through the integration partner Ariox (Atlas Filtri, TIG Distributing), a direct SOAP/web-service integration (Dynarex: CAdxWebServiceXmlCC import + ZFP_UPDSDH export), an on-prem SQL connector (Gradus Group, 2021) or a custom API build (Once Upon a Farm, Fermob WIP). Sage 300 runs as a Plug N Play web-services connector with a documented AP export (Living Company, i6/DALB, Ennco, Material, A1 American). Sage 100 is file/SFTP or customer-built API (Accutemp, Marco Group, Prime Line AP, Industrial Service Solutions). Engineering has a 2025 'Sage X3 Connection Basics' design covering GraphQL, Data Integration API, SOAP and REST with OAuth2, and a NOMAI-431 'Sage X3 Working' story still in progress, so a productised X3 connector is being rebuilt rather than finished.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `bilateral`)
- Blurb → “Sage X3, Sage 300 and Sage 100 connect to FreightPOP through APIs, web services or file transfer. Orders and deliveries import for rate shopping and shipping, and carrier, tracking and freight cost write back to Sage. Approved freight invoices can post to Sage accounts payable.”
  - now: “Bi-directional Sage X3 integration: purchase orders, sales orders and shipments sync both ways; tracking numbers and status write back to the ERP automatically.”
- Editions → Sage X3 · API/web services, direct or through integration partner Ariox; Sage 300 · web-services connector with AP invoice export; Sage 100 · file transfer or customer-built API (now: Sage X3 · bi-directional)
- Into FreightPOP → Sage X3 deliveries, pick tickets or sales orders import for rate shopping and execution; Sage 300 orders import through Sage web services; Sage 100 orders import by scheduled file transfer
- Back to the system → Carrier, tracking/PRO, weight, package count and freight cost write back to the Sage X3 delivery; Tracking and cost write back to Sage 300 orders; approved freight invoices post to Sage 300 AP; Tracking and BOL number return to Sage 100 by file or API
- Methods → Sage X3 SOAP web services / API (OAuth2 for cloud); Sage 300 web services; SFTP file exchange; On-prem SQL connector (legacy)
- Why: Current card says 'purchase orders, sales orders and shipments sync both ways' for Sage X3 — records show deliveries/pick tickets/SOs in and tracking/cost out; PO sync is only evidenced as a Sage 300 UDF-total export (BBL-5070). Replace 'status updates sync back' with the concrete fields. Add Sage 300 and Sage 100 editions since most live Sage tenants are on them. Depth 'bilateral' is fair for X3/300 but there is no single productised connector yet (NOMAI-431 WIP) — say 'api'. Mention that X3 deals are VAR/partner-led (Core Four) only internally.

**Merged — use cases (ins and outs):**

- **Sage X3 delivery/pick ticket → shipment (SOAP / web services)** — in: Sage X3 deliveries (SDH number) or pick tickets batch-imported into Order Management; ship-from via address-book match, ship-to, product lines (ZITMREF, ZITMDES, weight/dims), carrier/service/payee (ZBPTNUM, ZMDL, ZEEICT) populated only when carrier mapping exists, SO number → Ref1 · out: Export to Sage X3 via CAdxWebServiceXmlCC (ZFP_UPDSDH): delivery number, PRO/tracking (master tracking only for multi-box parcel, BBL-4543), mapped carrier id, total weight, package count; cost to ZFREIGHT for parcel and ZQUOTE for LTL (BBL-4310) _(source: Confluence: Dynarex - 20084, Confluence: Dynarex - Workflow Call, Confluence: General information of Sage objects, Confluence: Atlas Filtri - 20082, Confluence: TIG Distributing - 19692)_
- **Sage X3 via Ariox (partner-built connector)** — in: Orders batch-imported from Sage X3 by Ariox into FreightPOP (Atlas Filtri: once-a-day import reported Oct 2026; TIG: import off PIC) · out: Carrier, service, master tracking number, discounted rate and list rate written back (TIG export fields) _(source: Confluence: Atlas Filtri - 20082, Confluence: TIG Distributing - 19692, FD 72780, FD 72750, FD 72804, TT-8525)_
- **Sage X3 on-prem SQL (VPN connector)** — in: Sales orders read from the X3 SQL backend through the FreightPOP VPN connector (ship-from/ship-to/product fields) · out: Not documented in the retrieved chunk _(source: Confluence: Gradus Group- 18804)_
- **Sage 300 order import + tracking/cost write-back (Plug N Play web services)** — in: Sage 300 orders via Sage web services; standard Sage 300 field map (WM-2527); packing-list template import for container shipments (Living Company) · out: Tracking and cost write-back to the order (i6/DALB outbound only; Material not exporting due to Sage-side issues); PO export of UDF totals (BBL-5070) _(source: Confluence: Living Company - 19873, Confluence: i6 / DALB - 17617, Confluence: Ennco Display Systems - 19618, Confluence: Material - 20273, BF-11860)_
- **AP freight invoice export to Sage 300** — in: Invoices approved in FreightPOP audit with GL code · out: Nightly POST to Sage 300 /AP/APInvoiceBatches with vendor number, invoice number, order number, dates, fiscal period (Living Company); Sage X3 AP included in Dynarex contract; Sage 100 AP built for Prime Line (NOMAI-294) _(source: Confluence: Living Company - 19873, Confluence: Dynarex - 20084, NOMAI-461 (timekeeping for NOMAI-294))_
- **Sage 100 via file transfer or customer-built API** — in: CSV over SFTP import (Accutemp, WM-1655) or orders pushed by the customer's own integration into the FreightPOP external API (Marco Group); Sage 100 import errors fixed for ISS (NOMAI-416) · out: CSV export over SFTP (Accutemp); carrier, service, tracking and BOL number back to Sage 100 (Marco Group) _(source: Confluence: AccuTemp Products, Inc - 19676, Confluence: Marco Group - 19675, NOMAI-416)_

**Merged — customers (15; 10 live, none approved to name):** Atlas Filtri North America (20082), TIG Distributing (19692, shows as Exodus Direct, LLC in Snowflake), Dynarex (20084), Marco Group (19675), DALB Inc. / i6 (17617), Accutemp Products (19676), Prime Line Packaging (20361), Living Company (19873) (unknown), Material (20273), A1 American (20395), Industrial Service Solutions (20334), Ennco Display Systems (19618) (unknown), Gradus Group (18804) (unknown), Once Upon a Farm (20165) (unknown), Fermob (20168) (implementing)

**Merged — in flight / known issues:** NOMAI-431 'Sage X3 Working' — productised Sage X3 connector build (Work In Progress); BBL-5974 Sage X3 test: first endpoint batch import returns nothing and breaks the next endpoint's foreach (from ERP Health Check Log, not in Jira export) (done per log)

**Proof of capability (closed):** BF-11860 Sage 300 line quantity now imports (was 0) — A1 American; NOMAI-416 Sage 100 import errors fixed — Industrial Service Solutions; NOMAI-461 Testing closed on NOMAI-294 Prime Line Packaging Sage 100 AP integration; TT-8525 Billing account used on shipments provided to TIG (Sage X3)

**Gaps / could not confirm:** No productised Sage X3 connector doc beyond 'Connection Basics' (options analysis) — which API path is live per customer is only in SOPs; Dynarex (5 locations) shows only 179 Snowflake shipments; whether most volume flows through another channel is unknown; 19692 tenant is named Exodus Direct in Snowflake but TIG Distributing in Jira/Confluence — volume attribution needs confirmation; No evidence of Sage item master / product catalog sync; No Sage Intacct or Sage 50 integration evidence (Sage 50 listed under 'not integrated'); Freshdesk status codes for the Oct 2026 Atlas Filtri outage are 'closed' but the thread says the system was down — current state unknown

### syspro
<a id="syspro"></a>

**Confidence:** medium · **Deck card:** SYSPRO (api, live)

SYSPRO integrations are customer-built rather than a product: every live account reads sales orders from the SYSPRO SQL database through the FreightPOP VPN connector (Natoli, Wintersteiger, Laminate Technology, Alley-Cassetty) and writes back through whatever SYSPRO exposes — the SYSPRO WCF REST Transaction/Post service for Natoli (freight cost + tracking as XML), Dispatch Note creation for Alley-Cassetty, or nothing (Laminate, import only). Three other SYSPRO shops (Sun Mountain, MEC, Professional Plastics) reach FreightPOP indirectly through ShipLink. Wintersteiger moved from SQL pull to pushing orders over the external API in July 2026. Active 2026 work is all Alley-Cassetty (brick distributor, own fleet): WMS allocation, dispatch export, consolidation and a re-import pattern that replaces order rows every ~20 minutes. A new SYSPRO epic for Cannonball HNP was opened Apr 2026.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “FreightPOP connects to SYSPRO through its database or SYSPRO web services. Sales orders import with ship-to, items and references for rate shopping and shipping, and freight cost and tracking write back to the SYSPRO order.”
- Editions → On-prem SQL · FreightPOP VPN connector reads SYSPRO sales orders; SYSPRO web services · freight cost and tracking posted back (Transaction/Post); Via ShipLink · SYSPRO shippers using ShipLink reach FreightPOP through the external API (now: —)
- Into FreightPOP → Sales orders with ship-to, line items, PO/SO references, HS codes and customer freight accounts
- Back to the system → Freight cost and tracking number posted to the SYSPRO sales order; Dispatch notes created from FreightPOP deliveries (custom); Approved freight invoices exported as a nightly file for SYSPRO AP
- Methods → On-prem SQL via VPN connector; SYSPRO WCF REST web services; SFTP file exchange
- Why: Card is currently empty; fill with the above. Keep depth 'api' but internally flag that there is no standard connector — each SYSPRO account is a custom SQL + export build (expect onboarding dev hours). Do not claim bidirectional for every edition: Laminate is import-only. Three of the seven SYSPRO logos are ShipLink customers, not direct integrations.

**Merged — use cases (ins and outs):**

- **Sales order → shipment (on-prem SQL via VPN connector)** — in: SorMaster sales order header/lines: order number (trailing 0 stripped), SO → Ref1, PO → Ref2, customer id/name, ship-to address and contact, product lines (quantity, UOM, item, description, package id), HS code from InvMaster+.HsCode, customer freight account from ArCustomer+.FreightAccount · out: Natoli: SYSPRO WCF REST /Rest/Transaction/Post XML with FreightCost (base) and FreightValue (markup) on the first order of the shipment and tracking number comment on every order; Wintersteiger: on-prem export via automation (fields not in retrieved chunk); Laminate Technology: no export _(source: Confluence: Natoli Engineering - 17783, Confluence: SYSPRO Integration - For Natoli Export, Confluence: Wintersteiger, Inc. - 19517, Confluence: Laminate Technology - 19536, NOMAI-430, NOMAI-571)_
- **Sales order → delivery → dispatch note (Alley-Cassetty, configurable ERP)** — in: SYSPRO sales orders imported via onpremSysproAlley (import integration 100); re-import replaces the OrderShipments row rather than updating it (BF-11896) · out: 'Alley Cassetty Export Dispatch V2' creates a SYSPRO Dispatch Note per order line with shipped quantity; delivery creation allocates/deallocates inventory on the SYSPRO sales order; per-request export logging (Token / CreateDispatch / CustomFields) via BBL-6221 _(source: NOMAI-16, NOMAI-164, Confluence: Alley-Cassetty - 20219, Confluence: BBL-6221: Export Execution with Per-Request Tracking and Partial Success for Multi-Step Exports, FD 72030, FD 63203)_
- **AP freight invoice export (file)** — in: Invoices approved in FreightPOP audit · out: Nightly .csv of approved invoices to an SFTP location hosted by FreightPOP for SYSPRO import (Laminate Technology); negative-value invoices rejected by SYSPRO _(source: Confluence: Laminate Technology - 19536, Confluence: Onboarding Integration Questions - Archive (Laminate Tech 6/30))_
- **SYSPRO → ShipLink → FreightPOP external API (indirect)** — in: ShipLink reads SYSPRO orders and calls FreightPOP external APIs to import, quote, ship and track · out: Handled by ShipLink; no SYSPRO write-back visible in FreightPOP _(source: Confluence: SUN Mountain Sports - 18230 (ShipLink), Confluence: MEC - 19783 (ShipLink), Confluence: Pro Plastics - 17983, FD 59022)_
- **Customer pushes orders via FreightPOP external API (Wintersteiger, since Jul 2026)** — in: Delivery IDs pushed as JSON by the customer's ERP process (replaced the SQL pull) · out: Not documented in records _(source: FD 69975, FD 69859, FD 70406, snowflake external-api 2,884 shipments/12m)_

**Merged — customers (10; 6 live, none approved to name):** Alley-Cassetty (20219; test tenant 20366), Natoli Engineering (17783), Wintersteiger, Inc. (19517), Laminate Technology (19536) (unknown), Sun Mountain Sports (18230), MEC Parts (19783), Professional Plastics (17983), Freight Optics (18509) (unknown), Cannonball HNP (implementing), GF Health (unknown)

**Merged — in flight / known issues:** BF-12190 Alley-Cassetty consolidation: removing a Hold Spot stop drops the SYSPRO SO # and delivery address from pick list/docs (New); BF-11896 Alley-Cassetty ERP re-import inserts new order rows and soft-deletes old ones (~20 min row lifetime) (New); NOMAI-476 Cannonball HNP – SYSPRO integration (epic) (New); NOMAI-16 Alley-Cassetty API integration epic: dispatch creation, WMS allocation, partial deliveries (New)

**Proof of capability (closed):** BF-11889 Shared SO across two warehouses no longer disappears after first warehouse ships; BF-11861 Natoli SYSPRO/Magic order search query sped up (deadlock fix); NOMAI-571 Natoli SYSPRO mapping change (Apr 2026); NOMAI-430 HS code and freight account pulled from SYSPRO/Magic for Natoli; NOMAI-164 Alley-Cassetty test integration created, production modified

**Gaps / could not confirm:** No standard SYSPRO field map or product doc; only the Natoli export doc and per-customer SOPs; Alley-Cassetty and Natoli volumes absent from Snowflake snapshot; Wintersteiger's post-Jul-2026 API export (if any) is undocumented; Cannonball HNP epic has no scope; Freight Optics (18509) listed on the EID SYSPRO page with no other evidence; No evidence of SYSPRO AP export other than CSV to SFTP

### quickbooks
<a id="quickbooks"></a>

**Confidence:** medium · **Deck card:** QuickBooks (api, live)

QuickBooks is a documented, in-production integration with two editions: QuickBooks Desktop (Pro/Premier/Enterprise) through the Intuit Web Connector, and QuickBooks Online through OAuth single sign-on. Orders (invoices, sales receipts or sales orders) import into FreightPOP and carrier, tracking and cost are written back to the chosen transaction; approved carrier invoices from Freight Invoice Audit post as Bills in QuickBooks Desktop. Snowflake shows five active QuickBooks Desktop tenants in the last 12 months (Tile Redi by far the largest). Support history is dominated by Web Connector connectivity and AP-export gaps rather than mapping defects; one tenant (Blades Group) is migrating off QuickBooks Desktop to Zoho.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Orders come in from QuickBooks, carrier, tracking and freight cost go back on the transaction, and approved carrier bills post to AP so the books match what shipped.”
  - now: “Connects shipping to your accounting — orders in, tracking and audited freight costs back, so the books reflect what actually shipped and what freight actually cost.”
- Editions → QuickBooks Desktop Pro / Premier / Enterprise (Intuit Web Connector); QuickBooks Online (now: QuickBooks Online; QuickBooks Desktop (Pro / Premier / Enterprise))
- Into FreightPOP → Invoices, sales receipts or sales orders with ship-to, items and references; Purchase orders for inbound receiving (Desktop)
- Back to the system → Carrier, service, tracking and freight cost written to the order (Ship Via, memo, line or custom field); Approved carrier invoices created as Bills in QuickBooks Desktop; AP and broker AR invoices in QuickBooks Online
- Methods → Intuit Web Connector (Desktop); REST API with OAuth sign-on (Online); Scheduled sync at the customer's interval
- Why: Current card says 'Addresses arrive validated at entry' — no record supports address validation as part of this integration; drop it. Editions are confirmed. Add 'Scheduled batch' is fair (Web Connector interval). Keep AP Bills claim; it is documented and in use (Murphy Door, Tile Redi). Do not describe QBO AR invoicing on the public card unless the audience is brokers.

**Merged — use cases (ins and outs):**

- **Order → shipment (QuickBooks Desktop via Web Connector)** — in: Invoices, Sales Receipts or Sales Orders (one type chosen per connection) pulled by last-modified date; initial Invoices pull is the last 6 months; Ship-to address, product details, PO/SO numbers, phone, shipping notes (customer-specific mapping for Elara Brands); Purchase Orders when the Purchasing role is granted (inbound workflow) · out: Carrier name to the Ship Via field when carriers are mapped; Carrier + service + tracking + cost to the Memo field or to the last line description; Tracking only to a named custom field; cost only to a custom field; Choice of discounted or list cost, plus optional percent or flat markup _(source: Confluence: QuickBooks Enterprise Setup, Confluence: QuickBooks-FreightPOP Integration Guide, Confluence: QuickBook Enterprise Integration Guide, BF-12098, NOMAI-422, BF-9651)_
- **Order → shipment (QuickBooks Online via REST API)** — in: Sales Receipts or Invoices (one type, not both) including ship-to address · out: Shipping information written back to the same transaction type on shipment _(source: Confluence: Quickbooks Online REST API Integration For Shippers, Confluence: Quickbooks Online REST API Integration For Brokers)_
- **AP freight bill export (QuickBooks Desktop)** — in: Approved, audited carrier invoices from Freight Invoice Audit (EDI, portal or manual) · out: A Bill per approved invoice in QuickBooks: Vendor from the carrier's Internal Vendor ID, RefNo = invoice number, line item = the Default GL item set in Freight Audit, description = carrier + tracking, qty 1, amount = invoice amount; Picked up by the Web Connector on its auto-run interval; shipper software only, not broker _(source: Confluence: QuickBook Enterprise - AP Transactions Setup, Confluence: QuickBooks Enterprise Bill (AP) Field Mapping, FD#65010, FD#56294, FD#45294, Confluence: RCA Items w/Next Steps - POs (BBL-6143, Tile Redi multi-company AP routing))_
- **AP transactions (QuickBooks Online)** — in: Approved non-parcel carrier invoices · out: One invoice per PRO number; FedEx LTL grouped into one invoice per shipment _(source: Confluence: Quickbooks Online - AP Transactions (FP-5381))_
- **AR invoices to customers (QuickBooks Online, broker accounts only)** — in: Shipments processed for a broker's customers · out: AR invoice per customer per parcel carrier created in QuickBooks Online by the nightly ARInvoiceService _(source: Confluence: Quickbooks Online - AR Invoices (FP-5174), Confluence: Freightpop Services Details (ARInvoiceService), Confluence: Services and Jobs Catalog)_

**Merged — customers (14; 5 live, none approved to name):** Tile Redi, Blades Group LLC, Complete Packaging Products, Inc, Elara Brands LLC, NAKS, Inc (unknown), Murphy Door Inc, Champion Products (implementing), Hollywood Racks (unknown), Handiramp / Handi Products (unknown), Crown Staple and Supply (unknown), OTAK Home Products (unknown), The Tierra Group (unknown), Motive Energy Systems (unknown), Thaan Charcoal (unknown)

**Merged — in flight / known issues:** NOMAI-588 Customer-specific mapping to import customer notes from QuickBooks for Elara Brands (New); FP-6080 Performance work on the QuickBooks Web Connector endpoint, one of the five slowest endpoints (New); FP-5486 Allow more than one ERP integration per account (e.g. import from NetSuite, export to QuickBooks) (New)

**Proof of capability (closed):** BF-12098 Shipping notes from QuickBooks now import on both batch and real-time import for Elara Brands; NOMAI-422 Fixed batch import for Elara Brands (QuickBooks); BF-9651 Fixed shipment cost not writing back to QuickBooks for Complete Packaging Products; FP-1054 Sage 300 integration modelled on the QuickBooks Enterprise export options

**Gaps / could not confirm:** No record of QuickBooks Online tenants in Snowflake (only Desktop is coded); QBO customer list unconfirmed; Which fields QBO imports beyond ship-to is cut off in the chunk; Whether QBD PO import/export is live for any current customer (Motive Energy page is undated); Internal Deep Dive - Clean Simple Eats mentions QuickBooks plug-and-play but CSE ships via the NetSuite plug-in; treat as marketing copy

### infor
<a id="infor"></a>

**Confidence:** medium · **Deck card:** Infor ERP (api, live)

Infor shows up as several products rather than one connector. SyteLine and Infor Visual run on the on-prem SQL connector (CIE, Cla-Val/Griswold, Jarvis Cutting Tools; Genesis Attachments reported a SyteLine write-back failure in Sep 2026). Infor CloudSuite Distribution (CSD) has a plug-and-play API integration with import and export (Alsco Industrial Products, Northern Radiator). Infor M3 has a customer-specific API build for Tri-West via WWEX (MWS410MI/MWS423MI), with part 2 in support validation. Northern Radiator also pushes Infor WMS orders into FreightPOP through importOrders/V3 and receives postShipping updates. Deck id is infor-erp; the separate infor-wms card is only evidenced by Northern Radiator.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connects Infor ERPs to FreightPOP: on-prem SQL connector for SyteLine and Infor Visual, API integration for CloudSuite Distribution and M3. Orders and deliveries come in; carrier, tracking and freight cost go back.”
- Editions → Infor SyteLine / CloudSuite Industrial · on-prem SQL connector; Infor Visual · on-prem SQL connector; Infor CloudSuite Distribution (CSD) · API; Infor M3 · ION API (customer-specific) (now: —)
- Into FreightPOP → Sales orders, pick tickets and deliveries with addresses, items and carrier terms
- Back to the system → Tracking number, carrier and freight amount written back to the Infor transaction
- Methods → On-prem SQL connector; REST API (CSD, M3 via ION); Infor WMS via FreightPOP import API
- Why: Deck card id is infor-erp (empty). Fill editions as above. The lighthouse-syteline card duplicates SyteLine and should be folded into this one (see lighthouse-syteline.json). infor-wms card: only Northern Radiator evidences it.

**Merged — use cases (ins and outs):**

- **Sales order / pick -> shipment (SyteLine, Visual: on-prem SQL)** — in: Ship-from and ship-to addresses, contacts, tax ID, items and quantities from SyteLine or Visual tables via the FreightPOP connector installed on the customer's server · out: Freight amount and tracking number pushed back to SyteLine (failure reported FD 72484) _(source: Confluence: CIE - 19534 (WM-1280), Confluence: Cla-Val / Griswold - 17641, Confluence: Jarvis Cutting Tools- 18797, FD 72484)_
- **Order import/export (Infor CSD plug-and-play API)** — in: Orders with ship-to phone and attention, carrier and third-party shipping info mapped on the integration page · out: Shipment data exported back to CSD (import and export confirmed for Northern Radiator) _(source: Confluence: Alsco Industrial Products - 19622 (WM-1339), Confluence: Northern Radiator- 19778 (BBL-4629))_
- **Delivery -> shipment with tracking write-back (Infor M3 API)** — in: Delivery header and address (MWS410MI/GetHead, GetAdr), pick detail, item data, package numbers (LstPackages PANR), delivery terms; DSTX free text mapped to shipping note · out: Tracking number per package via MWS423MI/ChangePackage; ETA write-back requested for containers _(source: NOMAI-332, NOMAI-413, NOMAI-15 (generic-erp))_
- **WMS orders in, shipping confirmation out (Infor WMS)** — in: Orders sent by the customer's Infor WMS to FreightPOP importOrders/V3 · out: Carrier code, tracking and rate posted to Infor WMS shipments/postShipping via mingle-ionapi _(source: Confluence: Northern Radiator- 19778)_
- **Custom API inbound/outbound without export (Infor Cloud 10)** — in: SO (outbound) and PO (inbound) data via a customer custom API · out: None at this time _(source: Confluence: KPS Global - 19683)_
- **AP integration via file transfer** — in: — · out: AP file to Infor (CoilCraft, PI-188) _(source: Confluence: CoilCraft Workflow & Site Expectations, Confluence: Coil Craft - 19917)_

**Merged — customers (12; 1 live, none approved to name):** Tri-West (via WWEX) (implementing), Genesis Attachments, CIE (unknown), Cla-Val / Griswold (unknown), Jarvis Cutting Tools (unknown), Alsco Industrial Products (unknown), Northern Radiator (unknown), KPS Global (unknown), WENDT (unknown), CoilCraft (unknown), Agri-Fab (unknown), Kelsan (churned)

**Merged — in flight / known issues:** NOMAI-413 Tri-West Infor M3 API updates part 2: package numbers, tracking export fix, ETA write-back (Support Validation)

**Proof of capability (closed):** NOMAI-332 Tri-West Infor M3 API first-iteration changes delivered; NOMAI-443 Testing for M3 updates part 2

**Gaps / could not confirm:** No Infor customer appears in the Snowflake snapshot, so live status is unknown except where a 2026 ticket exists; CSD auth and frequency not recorded; Only one open Jira; most knowledge is in SOP pages dated 2022-2024; 'Infor Sequel' on CoilCraft page is probably 'SQL', not a product

### oracle-erp
<a id="oracle-erp"></a>

**Confidence:** low · **Deck card:** Oracle ERP (api, live)

'Oracle ERP' in the records means three different products, each a one-customer custom build. JD Edwards: Federal Signal imports pick-slip orders through custom mapping and exports on ship to two customer API endpoints (PopJdeIn for JDE, PopUSbank for their bank system); HM.Clause's JDE v9 integration (PI-6) was still pending as of March 2024. Oracle Fusion Cloud: Glaukos calls a single customer-built endpoint for import and export (inbound, outbound, AP); Ichor receives inbound POs as xlsx files over the customer's SFTP and asked for a deeper API integration; Divergent is being scoped for inbound shipments only. There is no standard Oracle connector, no documented auth or frequency, and none of these accounts appear in the Snowflake snapshot under these names.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Custom integrations for Oracle JD Edwards and Oracle Fusion Cloud: orders or deliveries come in by API or file, and carrier, tracking and freight cost go back to the customer's endpoints.”
- Editions → Oracle JD Edwards · customer API endpoints; Oracle Fusion Cloud · customer-built API or SFTP file (now: —)
- Into FreightPOP → Pick slips, deliveries or purchase orders with items, trade data and carrier terms
- Back to the system → Carrier, tracking, rates and package data posted to the customer's JDE or Fusion endpoint
- Methods → Customer REST endpoints; SFTP file transfer
- Why: Card is empty today. Present as custom/professional-services work, not a packaged connector. Do not claim NetSuite here (NetSuite is Oracle-owned but has its own card).

**Merged — use cases (ins and outs):**

- **Pick slip / order -> shipment with dual export (JD Edwards)** — in: Order number, PO, customer number, ship-from/ship-to, terms, items with HTS, country of origin, ECCN, carrier/service/payee/account, references, Incoterms · out: To PopJdeIn API: order number, ship date, ship-from ID, carrier, markup and base rate, package IDs, tracking numbers, weights, printer name; To PopUSbank API: carrier service, master tracking, rates, payee, addresses, freight class, references _(source: Confluence: Federal Signal - 19543, Confluence: Federal Signal - 19543- DO NOT USE, FD 64395, FD 61675, FD 48499)_
- **Delivery/shipment number -> shipment, inbound, outbound and AP (Oracle Fusion Cloud, single custom endpoint)** — in: Header and line data: ship-from location, ship-to, sold-to, product details with ECCN, carrier, payee and account number (from Oracle header level) · out: Shipment data posted to the same endpoint; the customer's integrator (Trinamix) fans it out to Oracle APIs _(source: Confluence: Glaukos - Integration Call, Confluence: Glaukos - 19689, Confluence: Testing Plan (oracleGlaukosAPI))_
- **Inbound PO file transfer for vendor portal (Oracle Fusion Cloud)** — in: PO lines (item, qty, remaining qty, UoM, unit price, requested arrival date, supplier site) as xlsx on customer-hosted SFTP, twice daily · out: Export fields documented on SOP; customer asked for tracking back to Fusion _(source: Confluence: Ichor-19588 (WM-1310), Confluence: Onboarding Integration Questions - Archive)_
- **Inbound shipments only (Oracle Fusion) — scoping** — in: Import, export, cancel, product catalog listed as scope · out: — _(source: NOMAI-379, NOMAI-384)_

**Merged — customers (5; 2 live, none approved to name):** Federal Signal, Glaukos (unknown), Ichor Systems, Divergent (implementing), HM.Clause (unknown)

**Merged — in flight / known issues:** NOMAI-384 Divergent Oracle Fusion inbound shipments: import, export, cancel, product catalog (New); NOMAI-379 Scoping Oracle Fusion inbound shipments for Divergent (New)

**Proof of capability (closed):** TT-4484 Federal Signal FedEx ETD tooltip fix (JDE user account); BF-5258 Federal Signal international document printing fix

**Gaps / could not confirm:** No Oracle customer appears in the Snowflake snapshot by these names; No endpoint URLs, auth or frequency recorded for JDE or Fusion; Several JDE Freshdesk tickets have no company name; assumed Federal Signal but unconfirmed; Mark Andy appears as 'oracleMarkAndy' in the test plan with no product named

### rootstock
<a id="rootstock"></a>

**Confidence:** medium · **Deck card:** Rootstock (api, live)

Rootstock is a single-customer integration built for Mark Andy's Earth City location (company 19705). FreightPOP logs into Rootstock through the Salesforce SOAP API (username + password + security token), runs SOQL against rstk__sohdr__c / rstk__solines__r to pull open sales-order lines ready to ship, and on shipping inserts rstk__sydata__c records per line (shipped qty, tracking) so Rootstock can pick, pack and ship the order; list price (or discounted rate + 60%) is written back as freight. An AP export for Mark Andy is in progress but targets their Oracle database, not Rootstock. The integration is documented on three Confluence pages and selectable on the Integrations page, so it is a real connector, but there is no second customer and the account does not appear in the Snowflake snapshot.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “FreightPOP connects to Rootstock on Salesforce. Open sales order lines import with ship-to, items, HTS codes and hazmat flags for rate shopping and shipping, and shipped quantities, tracking and freight cost write back so the order is picked, packed and shipped in Rootstock.”
- Editions → Rootstock on Salesforce · API connector (sales orders) (now: —)
- Into FreightPOP → Open sales order lines with ship-from site, sold-to and ship-to (including override address), items with HTS code and country of origin, carrier and payee
- Back to the system → Shipped quantity and tracking per line written to Rootstock to complete pick, pack and ship; Freight cost written back to the order
- Methods → Salesforce SOAP/SOQL API with security token
- Why: Card is empty today; fill as above. Internally: one customer, no inbound flow, AP goes to Oracle not Rootstock, and 2026 support threads show write-back misses — treat as 'live, single reference' rather than a mature connector. Tag 'Salesforce-native' is accurate.

**Merged — use cases (ins and outs):**

- **Sales order → shipment (open lines ready to ship)** — in: Open sales-order lines via SOQL: ship-from from the first open line's ship site, sold-to and ship-to (OverrideShipToAddress when ShipToOverride = true), product lines with qty, UOM, description, unit price, HTS code, country of origin, required/ship dates, Ship Via carrier/service, payee and carrier account; any hazmat line creates one hazmat shipment-details line (UNID chosen manually) · out: rstk__sydata__c insert per product line: SoLine id, hard-coded transaction type, shipped qty, tracking number, backgroundprocessing = true — drives pick/pack/ship in Rootstock; freight cost written as list rate, else discounted rate + 60% (BBL-5823) _(source: Confluence: Rootstock ERP, Confluence: Rootstock Field Mapping, Confluence: RootStock ERP Order Import/Export Integration, Confluence: Mark Andy, Earth City location (Rootstock) - 19705, Confluence: Onboarding Integration Questions - Archive (Mark Andy))_
- **Source-system tagging ahead of account merge** — in: 'RootStock' written into Additional Details UDF1 on import (Oracle account writes 'Oracle') so merged accounts can tell orders apart · out: None _(source: Confluence: Mark Andy, Earth City location (Rootstock) - 19705, Confluence: Mark Andy Inc. - 17598)_
- **AP freight invoice export (to Oracle, for both Rootstock and Oracle orders)** — in: Approved invoices with line breakdown (freight, late fee, duty) · out: Rows into an Oracle export table: vendor id/site, invoice number/lines, amounts, dates, ORGID = Rootstock or Oracle, 3-segment GL (company / division / expense) chosen by source system, location and order type _(source: NOMAI-26, Confluence: Mark Andy, Earth City location (Rootstock) - 19705)_

**Merged — customers (2; 2 live, none approved to name):** Mark Andy, Earth City (19705), Mark Andy Inc. (17598)

**Merged — in flight / known issues:** NOMAI-26 Mark Andy AP export to Oracle with GL segments for Rootstock and Oracle orders (Work In Progress)

**Proof of capability (closed):** BBL-5823 Source-system tag on import and list/discounted+60% cost export (cited in Confluence, not in Jira export)

**Gaps / could not confirm:** No second Rootstock customer anywhere in Jira/Freshdesk/Confluence/Snowflake; Mark Andy absent from Snowflake snapshot, so volume unknown; Whether cost export is currently enabled (engineering doc vs CS SOP disagree); No inbound/PO or item-master flow documented; Root cause of 2026 export misses (FD 64952, FD 63317) not recorded

### erp-one
<a id="erp-one"></a>

**Confidence:** low · **Deck card:** ERP One (api, live)

One customer, Kinter, runs Advantive ERP One+ through FreightPOP's on-prem SQL connector (the integration overview lists ERP One as 'On-Prem SQL Connector'). Freshdesk tickets from Aug 2026 confirm tracking numbers and shipping charges write back to the ERP keyed on the order number (orders need a '-0001' suffix; editing Reference 6 for blind shipments breaks the write-back). Kinter ships heavily on the SQL/file import channel in Snowflake. No Jira or Confluence build documentation exists.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connects ERP One to FreightPOP through the on-prem SQL connector: orders come in, tracking and freight charges go back.”
- Editions → Advantive ERP One+ · on-prem SQL connector (now: —)
- Into FreightPOP → Orders by order number
- Back to the system → Tracking numbers and shipping charges
- Methods → On-prem SQL connector
- Why: Single-customer SQL connector mapping, not a product integration. Keep internal or fold into the generic on-prem SQL connector story.

**Merged — use cases (ins and outs):**

- **Order -> shipment with tracking and charges write-back** — in: Orders by order number (batch template import also used) · out: Tracking numbers and shipping charges written back to ERP One+ by order number _(source: FD 70027, FD 70028, FD 70278, FD 72140 (generic-erp))_

**Merged — customers (1; 1 live, none approved to name):** Kinter

**Gaps / could not confirm:** No build documentation or field mapping; Snowflake channel code is inferred; Vendor is Advantive (ERP One+), card logoDomain erp-one.com may be wrong

### four51
<a id="four51"></a>

**Confidence:** low · **Deck card:** Four51 (api, live)

Four51 (B2B commerce) orders are pushed to a FreightPOP listening app (FP-3289) and stored in Four51-specific tables (Four51Order, Four51Item, Four51Shipment, Four51Extrinsic); order import then reads those tables rather than calling Four51. Export is a ship notice posted to four51.com/ui/shipnoticerequest.hcf. One customer is evidenced: The Scan Group (Sitecore/Four51 storefront), with a 2026 open ticket about slow Four51 order queries and recurring 'Failed OrderRequest transaction' emails. Shipping Haus (broker) notes some of its customers use Four51.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Receives orders pushed from Four51 and sends a ship notice back after shipping.”
- Into FreightPOP → Orders with ship-to, requested carrier and line items
- Back to the system → Ship notice with shipment data
- Methods → Push listener + ship notice API
- Why: Single-customer, legacy (2014-era Sitecore storefront) integration. Suggest hiding from the prospect-facing grid or marking as request-only.

**Merged — use cases (ins and outs):**

- **Pushed order -> shipment with ship notice** — in: OrderId, OrderDate, AddressId/ship-to, requested carrier and service, line items (LineItemId, supplier part) via Four51 push · out: Ship notice to Four51 (production and test URLs documented) _(source: Confluence: Four51, Confluence: Four51 - Orders Table)_

**Merged — customers (2; 1 live, none approved to name):** The Scan Group, Shipping Haus (broker) (unknown)

**Merged — in flight / known issues:** FP-7191 Four51 orders table query slow on Orders page (Open); FP-6935 Add logging for systems not logged, including Four51 (New); TT-2868 Retire api.freightpop.com (also FTP host); move API users to enterprise.freightpop.com (New)

**Gaps / could not confirm:** Only one customer; not in Snowflake snapshot; Auth and listener endpoint not recorded; Freshdesk bodies empty

### tharstern
<a id="tharstern"></a>

**Confidence:** medium · **Deck card:** Tharstern (api, live)

Tharstern (print MIS) has a documented plug-and-play API integration: FreightPOP pulls delivery notes from /api/deliverynotes using the customer's Tharstern email, password and base URL, and writes ship date, carrier, service, tracking and freight rate back. Two customers are recorded: Suttle-Straus (live since 2024, orders pulled every minute by a dedicated lambda, several custom rules) and Bison Printing (2023, export issues at the time). Suttle-Straus opened a ticket in Sep 2026 about third-party shipments not exporting back. Neither customer appears in the Snowflake snapshot.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Pulls delivery notes from Tharstern into FreightPOP and writes ship date, carrier, service, tracking and freight rate back to the delivery note.”
- Editions → Tharstern MIS · REST API (now: —)
- Into FreightPOP → Delivery notes with addresses, product details, instructions and courier
- Back to the system → Ship date, carrier, service, tracking number and freight rate on the delivery note
- Methods → REST API, scheduled batch pull
- Why: Card is empty today; this is a real, documented integration with a live reference-grade customer. No Jira records matched, so open issues come from Freshdesk only (FD 71720 open Sep 2026).

**Merged — use cases (ins and outs):**

- **Delivery note -> shipment** — in: Delivery notes with ship-from, ship-to, product details, delivery instructions, courier/courier service, job and sales order numbers mapped to reference fields; only 'Dispatch'/'Printed' status, excluding Mail, 3PL, Internal and blank courier services · out: Ship date, carrier, carrier service, tracking number and freight rate written to the delivery note (Carton section); list rate for parcel, discounted rate for LTL; delivery note set to Dispatched _(source: Confluence: Tharstern, Confluence: Tharstern Technical Field Mapping, Confluence: Suttle-Strauss - 20052 (PI-249, PI-310, PI-322), Confluence: Suttle-Straus - Workflow Call)_

**Merged — customers (2; 1 live, none approved to name):** Suttle-Straus, Bison Printing (unknown)

**Gaps / could not confirm:** No Jira tickets matched 'tharstern'; PI-249/310/322/371 referenced on SOP were not in the export; Neither customer in the Snowflake snapshot; Internal Deep Dive page uses 'AI-powered' language and unverified metrics; do not reuse

### lighthouse-syteline
<a id="lighthouse-syteline"></a>

**Confidence:** low · **Deck card:** Lighthouse SyteLine (api, live)

This card looks mislabeled. In the records 'Lighthouse' is a FreightPOP customer (company 17430), an ecommerce shipper selling via Walmart, Zulily and others, that imports orders through the on-prem SQL connector with channel-based carrier rules; the integration overview lists 'Lighthouse — On-Prem SQL Connector' as a customer connection, not a vendor product. 'SyteLine' is Infor's ERP and is covered in infor.json (CIE, Cla-Val/Griswold, Genesis Attachments). Nothing in Jira, Freshdesk or Confluence references Lighthouse Systems or a Lighthouse SyteLine product.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Why: Remove this card. Fold SyteLine into the Infor card (editions list). If 'Lighthouse Systems' (lighthousesystems.com, a MES vendor) was intended, there is no evidence of any integration.

**Merged — use cases (ins and outs):**

- **Order import with channel rules (customer Lighthouse, SQL connector)** — in: Order number scanned from packing slip; itemsalessource field mapped to order type drives payee, account, carrier and service rules; autoship on import · out: — _(source: Confluence: Lighthouse - 17430 (FP-4156))_

**Merged — customers (1; 0 live, none approved to name):** Lighthouse (company 17430) (unknown)

**Gaps / could not confirm:** No evidence of a Lighthouse Systems or Lighthouse SyteLine integration; SyteLine evidence lives under Infor

### fox-erp
<a id="fox-erp"></a>

**Confidence:** low · **Deck card:** Fox ERP (api, live)

No evidence. The only matched record is a Freshdesk ticket about the address suggestion bar (FD 50351) that does not mention Fox ERP at all (regex false positive). No Jira, Confluence or Snowflake record names Fox ERP or any customer on it. Unverified catalog entry.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- Why: Hide from the grid or move to 'available on request' until someone can name a customer or a build.

**Gaps / could not confirm:** Zero records reference Fox ERP

### direct-response
<a id="direct-response"></a>

**Confidence:** low · **Deck card:** Direct Response (api, live)

Direct Response appears only as an option on the Integrations page and in one short ERP Integration Documents page: API key + URL authentication, real-time import of sales orders (ship-to, third-party account, product details, carrier) and export of shipped date, tracking number, cost and package information. No customer, Jira or Freshdesk record mentions it. The page text refers to 'Direct Response 300', which looks copied from a Sage 300 template. Unverified catalog entry.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Why: Hide or mark as request-only until a customer or build record is found. Card has no logo domain.

**Merged — use cases (ins and outs):**

- **Sales order -> shipment** — in: Sales order ship-to, third-party account info, product details, carrier · out: Shipped date, tracking number, cost, package information _(source: Confluence: Direct Response)_

**Gaps / could not confirm:** No customers or tickets; Page content appears templated ('Direct Response 300')

### invetrak
<a id="invetrak"></a>

**Confidence:** low · **Deck card:** Invetrak (api, live)

Invetrak (WMS) has a Confluence integration guide that opens with 'THIS HAS NEVER BEEN FULLY TESTED SINCE WE IMPLEMENTED'. It documents a shipment-number-keyed import and a confirm-shipment export against a dev base URL. No Jira, Freshdesk or customer record references Invetrak. This is an unverified catalog entry.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Why: Remove from the live grid or mark as available on request. No customer evidence and the only documentation says it was never fully tested.

**Merged — use cases (ins and outs):**

- **Shipment number -> shipment with confirmation** — in: Ship-to address, carrier, service, freight account payee, product details (item number, description, qty, price) · out: Shipment number, ship date, carrier, BOL number, tracking number _(source: Confluence: Invetrak Integration Guide)_

**Gaps / could not confirm:** No customers, tickets or production evidence; Auth and production URL unknown

### made2manage — not in the catalog
<a id="made2manage"></a>

**Confidence:** low

No evidence of a Made2Manage integration. Every matched record (2 Jira, 30 Freshdesk, 3 Confluence) is a false positive on 'M2M': WWEX Smallpack API correlation IDs ('WWEX-M2M-...') and the Lindfast 'M2M API' test-credential thread, which refer to WWEX's machine-to-machine API, not the Made2Manage ERP. Not a deck card; do not add one.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Why: Nothing to add. The _summary.json count of 1 customer for made2manage is an artifact of the regex.

**Gaps / could not confirm:** Zero genuine references

### iqms — not in the catalog
<a id="iqms"></a>

**Confidence:** low

IQMS / DelmiaWorks (Oracle-database manufacturing ERP) appears for two accounts. SaverSystems (20387) was scoped and built on the on-prem FreightPOP connector to the Oracle DB: outbound export done, inbound import/export closed, with Oracle table mappings (ORDERS, SHIP_TO, ARCUSTO, V_PS_TICKETS, SHIPMENTS). Monoflo International (20379) is at scoping for an outbound, inbound and AP integration on IQMS (tickets New). Best Sanitizers' SOP names IQMS but they now ship on the NetSuite SuiteApp per Snowflake. Not a deck card.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- How it connects → `api`
- Editions → IQMS / DelmiaWorks · on-prem connector to Oracle DB
- Into FreightPOP → Orders and pick tickets with ship-to and sold-to data
- Back to the system → Carrier, tracking and freight price to the shipments table
- Methods → On-prem SQL/Oracle connector
- Why: Not in deck. Could be listed as 'DelmiaWorks (IQMS)' under on-prem connector ERPs once Monoflo goes live.

**Merged — use cases (ins and outs):**

- **Order / pick ticket -> shipment (Oracle DB connector)** — in: ORDERS.ORDERNO, SHIP_TO address fields, ARCUSTO sold-to, V_PS_TICKETS must-ship date; realtime and batch · out: FREIGHT_DESCRIP (carrier + service), TRACKING_NUM, AUTO_FREIGHT_PRICE into SHIPMENTS; inbound export to SHIPMENTS by PACKSLIPNO _(source: NOMAI-271, NOMAI-275 (generic-erp), NOMAI-276 (generic-erp), NOMAI-277 (generic-erp))_
- **Outbound, inbound and AP (scoping)** — in: — · out: — _(source: NOMAI-270, NOMAI-264)_

**Merged — customers (3; 0 live, none approved to name):** SaverSystems (unknown), Monoflo International (implementing), Best Sanitizers (churned)

**Merged — in flight / known issues:** NOMAI-270 Monoflo IQMS integration: import, export and AP for outbound and some inbound (New); NOMAI-264 Monoflo IQMS scoping (New)

**Proof of capability (closed):** NOMAI-271 SaverSystems DelmiaWorks scoping with Oracle table mapping; NOMAI-275 SaverSystems outbound export to SHIPMENTS table

**Gaps / could not confirm:** No Snowflake evidence for SaverSystems or Monoflo; Frequency and AP details not documented

### macola — not in the catalog
<a id="macola"></a>

**Confidence:** low

One customer: Techlight (company 20270) has a Macola on-prem SQL export integration (integration ID 104) that writes shipment data into a Macola table (dbo.arshtfil_sql). A closed Jira ticket (NOMAI-420) changed the target table name at the customer's request and lists the exported fields. No import mapping, no Confluence build page beyond the customer SOP template, and Techlight is not in the Snowflake snapshot. Not currently a deck card.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- How it connects → `api`
- Editions → Macola (on-prem) · SQL connector
- Back to the system → Carrier, service, tracking, charges, weight and ship date written to the Macola shipment table
- Methods → On-prem SQL connector
- Why: Not in the deck today; add only as an internal 'we have done this once' note, not a public card.

**Merged — use cases (ins and outs):**

- **Shipment export to Macola order table (SQL)** — in: Orders by order number (import mapping not documented) · out: ord_no, shipment number, carrier, carrier service, tracking number, discounted/list/markup shipping charges, ship weight, master tracking, ship date, mode and complete flags written to dbo.arshtfil_sql _(source: NOMAI-420)_

**Merged — customers (1; 0 live, none approved to name):** Techlight (unknown)

**Proof of capability (closed):** NOMAI-420 Techlight Macola on-prem export table change

**Gaps / could not confirm:** Import side undocumented; Live status unknown; not in Snowflake

### plex — not in the catalog
<a id="plex"></a>

**Confidence:** low

No Plex integration exists in the records. Tofurky (company 19903) runs Plex, but the FreightPOP work for them (TT-3789) is a manual flow: the customer exports orders from Plex and uploads them as external shipments, then carriers (Lineage, CH Robinson, Sunrise) email tracking files that FreightPOP scrapes to SFTP and applies to those shipments. The other two matches (BF-11522 printer connector, FD 40908 Valterra billing) are regex noise. Not a deck card.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- Why: Do not add a Plex card. If asked, position as 'file/manual today, API on request'.

**Merged — use cases (ins and outs):**

- **Manual order upload + emailed carrier tracking files (not a Plex connection)** — in: External shipments uploaded manually from Plex exports; carrier tracking templates by email -> SFTP -> tracking update · out: — _(source: TT-3789, Confluence: Tofurky - Workflow Notes)_

**Merged — customers (1; 0 live, none approved to name):** Tofurky (unknown)

**Proof of capability (closed):** TT-3789 Tofurky emailed carrier tracking file import for manually uploaded shipments

**Gaps / could not confirm:** No Plex API or SQL integration evidenced

### odoo — not in the catalog
<a id="odoo"></a>

**Confidence:** low

FreightPOP has no Odoo connector: the internal 'List of ERPs which are not integrated' page says 'ODOO — we don't support this integration'. The one Odoo shipper in the records, CGS Mule (20070), had its third-party developer (Dymaxel) build Odoo → FreightPOP external API calls for order import, tracking/cost write-back and, in Sep 2026, an approved-invoice payload to a CGS endpoint. Two other Odoo mentions (OTRUSA, Fictiv) are prospects or workflow notes with no integration. No Jira tickets exist for Odoo.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- How it connects → `api`
- Blurb → “Odoo users can connect through the FreightPOP external API to send orders and receive carrier, tracking and cost back.”
- Editions → Via FreightPOP external API · customer or partner built
- Into FreightPOP → Orders pushed from Odoo through the external API
- Back to the system → Carrier, service, tracking and freight cost returned to Odoo
- Methods → FreightPOP external API
- Why: Not on the deck today and should not be shown as a native integration. If added, present as 'available through the external API' with status 'request'. Internal note: the only live example is partner-built (Dymaxel) and has a recurring support history.

**Merged — use cases (ins and outs):**

- **Odoo → FreightPOP external API (customer-built, CGS Mule)** — in: Orders posted by Dymaxel's Odoo integration: ship-from/ship-to, shipment details (package qty/type/dims/weight), product details (order/SO/PO numbers, lines), sometimes carrier/service; batch pushes; inbound POs also pushed (duplicates reported Feb 2026) · out: Tracking, markup and discounted rate, carrier, service and package info returned to Odoo to close the order; carrier service list imported into Odoo (duplicates reported); Sep 2026: FreightPOP to send approved-invoice payload to CGS test endpoint _(source: Confluence: CGS Mule - 20070, Confluence: CGS Mule Workflow and Site Expectations, FD 72405, FD 71363, FD 62109, FD 61200, FD 57665, FD 54215, FD 49858, FD 42027)_

**Merged — customers (3; 1 live, none approved to name):** CGS Mule (20070), OTRUSA (17328) (unknown), Fictiv (20437) (unknown)

**Proof of capability (closed):** BBL-3948 Odoo import-order endpoint issue for CGS Mule (cited in FD 42027, not in Jira export)

**Gaps / could not confirm:** No FreightPOP-built Odoo connector or roadmap ticket; Odoo-side field mapping unknown; Whether the Sep 2026 approved-invoice payload went live is unknown; Internal Odoo note cites a 6.1-era API doc — outdated

### fishbowl — not in the catalog
<a id="fishbowl"></a>

**Confidence:** low

There is no Fishbowl integration evidence. The only records are a vendor spam email listing Fishbowl Inventory among lead-list platforms and a sales-playbook 'WMS Context' page that names Fishbowl as a Tier 2 WMS example alongside FreightPOP WMS. Two D.P. Wagner SOP pages surfaced in retrieval but their text never mentions Fishbowl (D.P. Wagner's documented ERP is Acumatica). No Jira tickets, no customer SOP, no Snowflake tenant.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- Why: Do not add a Fishbowl card. If a prospect asks, the honest answer from the records is 'no current integration; possible via the external API or file import' — and Fishbowl is positioned internally as a WMS competitor, not a partner.

**Gaps / could not confirm:** No integration, customer, ticket or roadmap item for Fishbowl; Reason D.P. Wagner pages matched the Fishbowl search is not visible in the retrieved text

### edi
<a id="edi"></a>

**Confidence:** medium · **Deck card:** SPS Commerce (edi, live)

EDI in FreightPOP's records is mostly carrier EDI for Freight Invoice Audit: carriers drop 210 invoices (and ocean 310) on FreightPOP's SFTP, a nightly translator loads them into Audit, and 997 acks go back; 214 status files update tracking every four hours; a few customers tender by 204. Retailer EDI (856 ASN) is not sent by FreightPOP itself — it writes the package hierarchy and SSCCs into the ERP's SPS Commerce records (NetSuite, Acumatica, Business Central) and the EDI provider takes over. TrueCommerce appears once (a pending 945 for Keystone) and Cleo appears only as FedEx Freight's own EDI VAN migration. Order import by 850/940 exists in the regression suite. Dozens of customers have EDI 210 carrier setups; the integration team runs a steady queue of new carrier connections.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `edi` (now `edi`)
- Blurb → “Carriers send invoices and status by EDI straight into audit and tracking; for retailers that need an ASN, FreightPOP writes the carton and SSCC detail into your ERP's SPS Commerce records so your EDI provider can send the 856.”
- Editions → Carrier EDI 210 / 214 / 204 over SFTP; SPS Commerce ASN data via NetSuite, Acumatica or Business Central (now: —)
- Into FreightPOP → Carrier invoices (210, ocean 310) into Freight Invoice Audit; Carrier status (214) onto tracking; Orders by 850 / 940 file
- Back to the system → 997 acknowledgements to carriers; Load tenders (204) to carriers that support it; Package, SSCC, SCAC and tracking written to SPS Commerce records in the ERP
- Methods → SFTP file exchange; ERP write-back (SPS records)
- Why: Deck has sps-commerce, truecommerce and cleo cards but no general carrier-EDI card; the bulk of evidence is carrier 210/214. Suggest: sps-commerce = live (via ERP records, three ERPs); truecommerce = request/implementing (one 945 pending, no proof); cleo = not a FreightPOP integration — it is FedEx Freight's VAN; hide or fold into carrier EDI. Do not claim FreightPOP sends 856s directly.

**Merged — use cases (ins and outs):**

- **Carrier invoice intake (EDI 210 / 310) → Freight Invoice Audit** — in: Carrier 210 invoice files (and ocean 310 for Flair/Ocean Blue) uploaded by the carrier to FreightPOP's SFTP, routed by the customer's EDI Company Identifier (e.g. FPKYOCERA01); Nightly EDI Translator loads files to the EDI database and then into Audit; manual 'EDI Invoices Import' run available · out: 997 functional acknowledgements written to the carrier's 210-997 folder; Invoices matched to shipments by tracking/BOL, audited, then exported to AP/ERP, CSV over FTP or the weekly digest _(source: BF-11464, BF-11852, BF-11364, BF-11299, BF-11339, Confluence: ABF Carrier Invoice EDI, Confluence: Freightpop Services Details (EDI Translator), Confluence: Services and Jobs Catalog (EDIDataTranslator 2:00 AM PT), FD#72493, FD#72503, FD#72412)_
- **Tracking write-back from carriers (EDI 214)** — in: 214 shipment status files from carrier FTP/SFTP servers (pickup, in-transit, delivery, exceptions) · out: Tracking updates on the FreightPOP shipment record _(source: Confluence: Freightpop Services Details (update_214_tracking), Confluence: Services and Jobs Catalog (every 4 hours), Confluence: Shaw Ross EDI Carriers (214 tracking, WM-877))_
- **Load tender to carrier (EDI 204)** — in: Sunkist: 204 files from Prophet ERP create truckload, multi-stop and drayage orders (N1 SF/ST segments) · out: Shaw Ross: tenders sent to MODE by 204 (WM-877); Johanson tenders by EDI _(source: Confluence: Shaw Ross EDI Carriers, Confluence: Sunkist - 19732, FD#35556)_
- **Order import by EDI 850 / 940** — in: 850 purchase orders and 940 warehouse shipping orders dropped on SFTP (/Import/Inbound POs) and run through the import service · out: — _(source: BF-10833)_
- **Retailer ASN (EDI 856) via SPS Commerce in the ERP** — in: Ship-to address book flag for SPS export and message type SOPI/SOTI (or Pyramex custom body fields on the Item Fulfillment); SPS package definition IDs placed in Ref 1 of predefined packages · out: Package Definition, Package and Package Content custom records created in NetSuite by SOAP add(): dims, weight, carton index, qty, tracking, SSCC/UCC, SCAC; Same flow for Acumatica and Business Central customers; SSCC generated even without UCC labels (BF-11999) _(source: Confluence: SPS Commerce - Netsuite, Confluence: Per-Customer Customization Map (Pyramex), Confluence: NetSuite FAQ, BF-11999, BF-11758, BF-11727)_
- **Warehouse ship confirm to a VAN (EDI 945 → TrueCommerce)** — in: — · out: 945 file for TrueCommerce, pending completion for Keystone (PI-152) _(source: Confluence: Keystone Safety & Cleanroom - 19836)_

**Merged — customers (20; 10 live, none approved to name):** Global-Pak Inc (implementing), SouthernCarlson, Hyper Solutions, Kyocera Corporation, Shaw Ross (churned), Tile Redi (implementing), D.P. Wagner, Pyramex Safety Products, LLC, Flair Flexible Packaging, Buffalo Seal, IAA, Betco Corp, Berk Brands (implementing), Newegg (implementing), ePackageSupply (implementing), Keystone Safety & Cleanroom, Sunkist (unknown), Pewag (implementing), NAKS, Inc (unknown), Kelsan, Scentsy, Marco Group, Pet Warehouse Industry, Calendar Holdings, Redwood Materials, Pro Plastics, Galata Chemicals, Freespirit, Radio Engineering, Biodex, Griffin Greenhouse, Avocado, HST System (unknown)

**Merged — in flight / known issues:** BF-11912 CH Robinson LTL feed sends linear unit in inches and omits packagingUnitOfMeasure (PO Validation); BF-11524 External API to read approved Freight Audit invoices (Fenner Dunlop wants to pull into their AP) (Groomed); BF-11175 Testing for EDI file generated on export for Amazon (BF-11174) (New)

**Proof of capability (closed):** BF-11999 Generate SSCC codes for SPS ASN export without UCC labels (Acumatica); BF-11758 Customer package identifier in scan-to-pack flow for SPS (Acumatica, BC, NetSuite); BF-11852 WWEX EDI 210 invoices now match shipments for Buffalo Seal; BF-11339 Ocean EDI 310 invoices accepted for Flair; BF-11464 SFTP user setup from the UI for carrier EDI; BF-10833 EDI 850 and 940 order import regression fixed

**Gaps / could not confirm:** No Confluence page documents the carrier EDI 210 setup end to end; facts come from tickets and SOP pages; TrueCommerce: only one mention, status unknown; Cleo: carrier-side only; no FreightPOP–Cleo integration documented; Whether 204 tendering is active for any current customer; Which ERPs beyond NetSuite/Acumatica/BC support the SPS flow

### cubiscan
<a id="cubiscan"></a>

**Confidence:** medium · **Deck card:** Cubiscan (hardware, live)

Cubiscan is a live hardware integration with two documented modes: Real-Time, where the FreightPOP Connector on the warehouse network calls the scale's API when a user clicks the Cubiscan link on Quote/Ship, and Qbit-DB, where the dimensioner posts package data ahead of time to a per-device FreightPOP API endpoint and it auto-fills shipment details when the order is searched. Data flows one way into FreightPOP (dims, weight, and for the Contour pallet unit, images); nothing is written back to the device. Kyocera (multiple warehouses), Tile Redi, American Dawn and Keystone are active users, and Kyocera generates most of the ticket volume (Contour pictures, multi-pallet import, auto-connect).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `hardware` (now `hardware`)
- Blurb → “Set the package on the Cubiscan and its dimensions and weight land on the shipment, pulled live from the scale or sent ahead by the dimensioner, so quotes and freight class use real measurements.”
  - now: “The dimensioner talks straight to the shipment — certified dims and weight land on the record with no keyboard between the scale and the quote.”
- Editions → Cubiscan Real-Time (150, 325 and other networked models); Cubiscan Qbit-DB (1200, 1100); Cubiscan Contour (pallets, with images) (now: —)
- Into FreightPOP → Dimensions and weight applied to the shipment on click or auto-filled from pre-scanned data; Pallet images from Contour units
- Back to the system → License plate labels printed from FreightPOP for the dimensioning station
- Methods → FreightPOP Connector on the warehouse network; Device-to-FreightPOP API push
- Why: Current card's 'certified dims', 'the rate you quote is the rate you're billed' and 'fewer reclasses' are not supported by the records; the RCA shows the class calculation itself had a defect. Replace outFlows (nothing is written to the device). Keep frequency 'real-time' but add the Qbit-DB pre-scan mode and the Connector requirement.

**Merged — use cases (ins and outs):**

- **Real-time dimension pull → shipment details** — in: Length, width, height and weight for the package on the scale, requested on click via the scale's IP from the FreightPOP Connector; Models listed: 1200, 1100 AKL, 100, 110, 150, 25, 125, 325, 75, 75-Pro, 210, S9 · out: — _(source: Confluence: CUBISCAN SET UP, Confluence: Cubiscan (FreightPOP Manual), Confluence: Printers & Scales - V2, Confluence: Integrated Scale)_
- **Qbit-DB push → auto-populated shipment details** — in: Package records (identifier, pack type, net dims, net weight, timestamp, optional info) posted by the Cubiscan to a predefined FreightPOP External API endpoint carrying the company and device key; duplicates ignored; Stored in CubiscanInboundData and applied when the matching order is searched on Quote/Ship or in Order Management · out: — _(source: Confluence: Cubiscan (FreightPOP Manual), Confluence: Cubiscan QBIT-DB Technical Documentation (WM-1826), Confluence: How Do I Set Up Printers and Scales?, FD#72668, BF-9569)_
- **Pallet dimensioning with images (Cubiscan Contour)** — in: Pallet LPN scan, dims, weight and pictures captured by Contour software, imported when the order is imported; Kyocera uses the images for its audit process · out: FreightPOP prints license plate labels that the station scans _(source: BF-12197, BF-11612, BF-10686, FD#49416, FD#52248, FD#50126)_
- **Freight class auto-calculation from scanned dims** — in: Scanned dims and weight feed NMFC subclass auto-calculation · out: — _(source: Confluence: Freight class only calculating for first package with Cubiscan (RCA, DA-2095), FD#52118)_

**Merged — customers (7; 4 live, none approved to name):** Kyocera Corporation, Tile Redi, American Dawn, Keystone Safety & Cleanroom, Howard Miller Company (unknown), NAKS, Inc (unknown), ALP Supply (unknown)

**Merged — in flight / known issues:** BF-12197 Contour pallet dims not populating in FreightPOP for Kyocera LTL team (New); BF-11613 Testing for BF-11612 (Contour multi-pallet import) (New); BF-11539 Merge the two printer/scale connector agents into one connector (New); BF-10373 Simulation mode for Firebase publishers incl. Cubiscan data, for safe testing (New); BF-9569 Group several Cubiscan scales under one identifier for Qbit-DB (Ready to Groom)

**Proof of capability (closed):** BF-12175 Scale selection no longer resets after order import; BF-11612 Contour dimensions import fixed; BF-11910 Dimensioner default dropdown in user Printer & Scales preferences; BF-10686 Pictures and dimensions transfer from Cubiscan restored

**Gaps / could not confirm:** Exact External API path for Qbit-DB inbound data; Whether non-Cubiscan dimensioners are supported (FreightSnap exists as a separate card); Customer-level status for Howard Miller, ATN, PCS (FD#54677) and Keubix-era users

### shiplink
<a id="shiplink"></a>

**Confidence:** medium · **Deck card:** ShipLink (api, live)

ShipLink Global is both a referral/reseller partner and a connected system. As a partner, it was FreightPOP's one active 'integrated partner' in the 2023 playbook and brings LTL shippers who use ShipLink for parcel; its support manager (Amy Duren) files most of the 120 Freshdesk tickets on behalf of those customers, and almost all of them are carrier credentials, rates and label questions, not integration defects. As a connected system, ShipLink calls FreightPOP's External API: it sends the order and shows FreightPOP's UI inside ShipLink when it recognises an LTL order, then pulls back BOL/PRO, tracking, carrier, ship date and weight. FreightPOP provisions a companyname@shiplink.com user and API keys per customer. No ShipLink-specific connector code exists in the records.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “ShipLink handles parcel; when an order needs LTL it hands the shipment to FreightPOP through the API and pulls back BOL, PRO, carrier and tracking, so the warehouse works one screen.”
- Into FreightPOP → Orders with addresses, references, default pallet dims and ERP weight from ShipLink
- Back to the system → BOL and PRO number, ship date, weight, pallet count, tracking and carrier returned to ShipLink
- Methods → FreightPOP External API (per-customer keys); FreightPOP UI embedded in ShipLink
- Why: Keep the 'Partner' tag. Make clear on the internal card that there is no FreightPOP-built ShipLink connector; ShipLink consumes the public API. Reps should expect ShipLink's support team to be the first-line contact for these accounts.

**Merged — use cases (ins and outs):**

- **LTL order hand-off from ShipLink → FreightPOP shipment** — in: Ship From and Ship To (incl. email); Dimensions (default pallet size on ShipLink), total weight from the ERP, default freight class and commodity; Pick ticket into the SO field, PO number, delivery instructions, accessorials; Popcornopolis also received instructions in Ref 3/4 · out: BOL / PRO number, ship date, weight, number of pallets, tracking number, carrier name pulled back by ShipLink; ShipLink produces international documents (commercial invoice, SED, USMCA) after FreightPOP completes the shipment _(source: Confluence: Shiplink (EID), Confluence: FreightPOP and Shiplink, Confluence: PEScience-20311, Confluence: Green-Tek-19845, Confluence: Popcornolpolis - 18297, Confluence: Aqua ChemPacs- 19465)_
- **AP export for ShipLink-connected ERPs (built by FreightPOP, not ShipLink)** — in: Approved carrier invoices · out: Calderon Textiles: P21 voucher CSV over SFTP with GL logic; Pewag (three companies): P21 AP transactions via FreightPOP's P21 plug n play (NOMAI-193) _(source: Confluence: Calderon Textiles -19895, NOMAI-193, Confluence: Pewag SOP - 20318)_

**Merged — customers (18; 13 live, none approved to name):** Shiplink Global (partner tenant), Calderon Textiles, Eagle Industries of Louisiana, LLC, Coxreels, Rudolph Bros. & Co., Peak Trading Corp, Gencor Industries, Inc., Shrink Packaging Systems Corp, MEC PARTS, Sun Mountain Sports, Inc, Pewag (Pewag Illinois, Pewag Traction Chain, Wallingford's Inc-NH), PEScience, Bresco (Birmingham Restaurant Supply), Green-Tek (unknown), Midland Tool and Supply (unknown), Aqua ChemPacs (unknown), Berk Brands (implementing), Popcornopolis (churned)

**Merged — in flight / known issues:** NOMAI-234 Berk Brands P21 on-prem SQL integration to replace what ShipLink provides (email, true ASN), batch + real-time (New)

**Proof of capability (closed):** NOMAI-193 P21 AP transactions created for the three Pewag accounts connected through ShipLink; TT-8646 Averitt dynamic pricing setting saved correctly for Eagle Industries (ShipLink user)

**Gaps / could not confirm:** Specific External API endpoints ShipLink calls; Whether cost/charges are returned to ShipLink (Popcornopolis says costs; the EID export list does not include cost); Partner agreement terms and current referral volume; Status of Green-Tek, Midland Tool and Aqua ChemPacs accounts

### extensiv — not in the catalog
<a id="extensiv"></a>

**Confidence:** low

Extensiv (formerly 3PL Central / 3PL Warehouse Manager) is a new Plug n Play integration scoped and built in 2025–2026 for one 3PL account, Pacific Glory (paid for by WWEX). FreightPOP pulls orders from Extensiv's REST API with bearer-token credentials and, on shipment, confirms the order back with ship date, tracking, BOL, pickup date and freight charges. Import and export tickets are Done; the parent epic is still open and a second-location duplicate is requested. Most other 'Extensiv' Freshdesk hits are false matches on the word 'extensive'.

**Apply (public card):**
- Status → `live`
- How it connects → `api`
- Blurb → “Orders in a 3PL's Extensiv warehouse come into FreightPOP for rating and shipping, and the order is confirmed back with tracking, BOL and freight charges.”
- Editions → Extensiv 3PL Warehouse Manager (cloud)
- Into FreightPOP → Orders with ship-to, references and instructions; ship-from from the facility
- Back to the system → Ship confirmation with tracking or BOL, pickup date and freight charge
- Methods → REST API (Plug n Play)
- Why: Not in the current deck. Add as a WMS/3PL card. One customer, recently built — keep claims to the documented endpoints. Extensiv Order Manager (the ecommerce OMS) is not integrated.

**Merged — use cases (ins and outs):**

- **3PL order → shipment** — in: Order by ID with full detail: order number, reference/customer PO, notes/instructions, status, ship-from facility (resolved via GET /properties/facilities/{id}), ship-to name and address lines, created/modified dates · out: Order confirmed as shipped: confirmDate, trackingNumber (parcel), billOfLading (LTL/FTL), pickupDate, billing charge subtotal _(source: NOMAI-321, NOMAI-322, NOMAI-327, Confluence: Extensiv Plug n Play, Confluence: Extensiv Plug n Play -- Import Integration)_

**Merged — customers (3; 1 live, none approved to name):** Pacific Glory, Trampolines.com (unknown), Ledge Lounger (unknown)

**Merged — in flight / known issues:** NOMAI-475 Duplicate the Extensiv integration for Pacific Glory's second location credentials (New); NOMAI-318 Extensiv Plug n Play integration epic (New)

**Proof of capability (closed):** NOMAI-321 Extensiv Plug n Play import built; NOMAI-322 Extensiv Plug n Play export (order confirm) built; NOMAI-327 Extensiv 3PL Manager scoping

**Gaps / could not confirm:** Import schedule/frequency; Whether product lines and dims import (field table truncated); Pacific Glory go-live date and current health

### veracore
<a id="veracore"></a>

**Confidence:** medium · **Deck card:** VeraCore (api, live)

VeraCore is a documented, long-running 3PL/WMS integration over VeraCore's web services using a WMS web-service user. Users pull a Package ID, PPU ID (batch of packages) or Pick Slip into Quote/Ship; dims, weight, addresses, third-party account, flags and carrier mapping import, and after shipping FreightPOP writes tracking and per-package freight cost (parcel) back to the same transaction, with void flags on cancel. Active users are fulfillment houses (Exodus Direct, DG-Fulfillment, Pet Industry, G&B Fulfillment). Ticket history is light and operational (lookback window, slow import, residential flag mapping, duplicate ship).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Pull a package, PPU or pick slip from VeraCore, ship it, and tracking and per-package freight cost go back to the same transaction.”
- Into FreightPOP → Package, PPU or pick slip with dims, weight, addresses, third-party billing and service flags; Carrier and service from VeraCore service-code mapping
- Back to the system → Tracking and parcel cost per package written to VeraCore; cancellations flagged void
- Methods → VeraCore web services; Batch processing by PPU
- Why: Card is empty today; fill with the above. Category wms/3PL fits. Docs date from 2019–2021; confirm the API guides are still current before public claims.

**Merged — use cases (ins and outs):**

- **Package / PPU / Pick Slip → shipment** — in: Transaction by Package ID (P and M packages), PPU ID (many packages, one shipment per package) or Pick Slip (all packages); Dimensions and weight, package details, return contact/address (optional ship-from), ship-to company/attention/address; Carrier and service via VeraCore service-code mapping; third-party account number and address; flags (commercial/residential, COD, insurance, signature); OrderID → Ref1, PO number → Ref2; customer-specific Ref mapping from ProjectID (DG-Fulfillment, NS-1703) · out: Tracking information per package; Freight cost per package for parcel carriers; broker LTL cost exported with payee set to third party; true third-party shipments export $0.00; Weight only (not dims) on UpdateTracking; Void flag 'Y' on cancelled lines at next sync _(source: Confluence: VeraCore Configuration FAQ, Confluence: VeraCore Integration Guide, Confluence: VeraCore Example: Update Tracking Info, Confluence: VeraCore BillingOption Setup, FD#29933, FD#42788)_
- **Batch shipping by PPU ID** — in: PPU ID entered in Order Import field pulls all packages into a batch · out: All shipments processed and labels sent to the user's printer; failed shipments re-import next time _(source: Confluence: VeraCore Configuration FAQ, Confluence: FrightPop.ClientApp (deprecated) — batch Veracore processing, Confluence: DG-Fulfillment - 18461)_

**Merged — customers (4; 3 live, none approved to name):** Exodus Direct, LLC, DG-Fulfillment, Pet Industry (Pet Industry Warehouse), G&B Fulfillment / Grant & Bowman (unknown)

**Merged — in flight / known issues:** FP-7269 Speed up VeraCore order import (10–30 s load for DG-Fulfillment) (New)

**Proof of capability (closed):** NS-643 Exodus lookback changed to 10 days (from SOP); NS-1703 DG-Fulfillment Ref1/Ref2 mapping from ProjectID (from SOP)

**Gaps / could not confirm:** No Snowflake channel code for VeraCore; tenant status inferred from SOPs and tickets; Status of NS-643/NS-1703/FP-7277 not in the Jira extract; Whether the 2019 VeraCore web-service guides reflect the current REST developer portal

### brightpearl
<a id="brightpearl"></a>

**Confidence:** medium · **Deck card:** Brightpearl (api, live)

Brightpearl is a documented REST API integration (OAuth app token, data centre, account ID) that imports Sales Orders in configurable statuses or ships by Goods Out Note, and writes carrier, tracking and freight cost back to the sales order, setting the order/GON to shipped. It runs inside the ERPOrderImportService alongside NetSuite and others, with batch import added for Dan O's. Half a dozen retail/ecommerce accounts use it (Zline Kitchen, Prima Supply, Haworth, Top Fitness, Dan O's, CGS Mule). Brightpearl is also listed as a channel partner in the 2023 playbook. An AP (purchase invoice) export is described as a to-do, not confirmed built.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Sales orders ready to ship come in from Brightpearl, and carrier, tracking and freight cost go back on the order as it moves to shipped.”
- Editions → Brightpearl (REST public API) (now: —)
- Into FreightPOP → Sales orders in your chosen statuses, or by Goods Out Note, with ship-to, items and PO
- Back to the system → Carrier, tracking and freight cost on the sales order; order and goods-out note set to shipped
- Methods → REST API (OAuth app); Scheduled batch import available
- Why: Card is empty today. Do not claim AP export to Brightpearl — the AP page is a request for help, not a feature. Note the 200 calls/min limit internally.

**Merged — use cases (ins and outs):**

- **Sales order → shipment** — in: Sales orders in configured statuses (defaults 'Ready to ship' #17, 'Shipping in Process/Fulfilled' #69): ship-to, product details, PO number, defined carrier; Channel ID used to pick ship-from (Prima Supply, WM-1532) · out: Carrier, tracking number and freight cost on the sales order; export status set (typically 'Shipped') _(source: Confluence: BrightPearl REST API FAQ New, Confluence: FreightPOP BrightPearl Integration Setup (customer), Confluence: Prima Supply- 19572, FD#44504)_
- **Ship by Goods Out Note** — in: Order with at least one unshipped Goods Out Note; carrier/service from the GON · out: First GON event set to shipped with the matching user as event owner; order set to shipped only when 0–1 GONs remain _(source: Confluence: BrightPearl - Ship by Goods Out Note, Confluence: Haworth - FP 19688, Confluence: Top Fitness Store - 19185, FD#49033, FD#70114)_
- **Batch import into Order Management** — in: Sales orders pulled on a schedule by ERPOrderImportService (Dan O's customisation BBL-5781) · out: — _(source: Confluence: Dan O's Seasoning - 20297, Confluence: Services and Jobs Catalog, Confluence: Freightpop Services Details)_

**Merged — customers (6; 5 live, none approved to name):** Zline Kitchen, Prima Supply / Prima Coffee, Haworth Inc, Dan O's Seasoning, CGS Mule LLC, Top Fitness Store (unknown)

**Merged — in flight / known issues:** TT-8112 Cannot add a Brightpearl integration on the React Integrations page (test case) (New); FP-5255 Let users set import and export status IDs/names on the Brightpearl configuration screen (Open); FP-5185 Make the import order status configurable instead of hard-coded #17 (New)

**Proof of capability (closed):** TT-8088 Data Centre field pre-filled on the React Add Integration screen; BBL-5781 Batch import of Brightpearl sales orders into Order Management for Dan O's (from SOP); WM-1532 Channel ID drives ship-from for Prima Supply (from SOP)

**Gaps / could not confirm:** No Snowflake channel for Brightpearl; tenant status from SOPs/tickets; Whether AP purchase-invoice export was ever built; Statuses of RS-321, BBL-5781, WM-1532 not in the Jira extract

### logiwa
<a id="logiwa"></a>

**Confidence:** low · **Deck card:** Logiwa (api, live)

Logiwa is a built API integration: FreightPOP pulls Sales/Customer Orders and writes carrier, tracking and freight cost back to the Logiwa order on shipping. The EID overview lists it as cloud API real-time import/export plus a 10-minute batch import, and the services inventory lists Logiwa WMS APIs among third-party calls. The only customer evidence is EcomHalo (under the Next Level Distribution account), which went out of business; the SOP says the Logiwa integration is 'no longer in use'. No Jira or Freshdesk records.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Orders come in from Logiwa and carrier, tracking and freight cost go back on the order when it ships.”
- Into FreightPOP → Sales and customer orders with addresses and line items
- Back to the system → Carrier, tracking and freight cost on the Logiwa order
- Methods → REST API; Scheduled batch import
- Why: Capability exists and is documented but there is no active tenant. Keep visible as a built connector only if sales is comfortable with 'built, not currently in production'; otherwise set status to request.

**Merged — use cases (ins and outs):**

- **Sales/customer order → shipment** — in: Ship-from and ship-to (warehouse code, address code, address text, city, state, postal code, country, phone, email); Product details: pack quantity, item number, description, unit price · out: Carrier information, tracking number and freight cost on the Logiwa sales/customer order _(source: Confluence: Logiwa ERP, Confluence: ERP, WMS, E-commerce and Other Systems Integration Documents and Overview)_

**Merged — customers (1; 0 live, none approved to name):** EcomHalo (via Next Level Distribution - 19624) (churned)

**Proof of capability (closed):** WM-1372 Logiwa WMS integration for EcomHalo (from SOP)

**Gaps / could not confirm:** Authentication method and endpoints; Any current customer; Whether the connector still works against Logiwa's current API

### shiphero
<a id="shiphero"></a>

**Confidence:** low · **Deck card:** ShipHero (api, live)

ShipHero was integrated for a single customer, Avocado Green Brands (Brentwood Home): an AWS Lambda (avacado_shiphero_orders) runs every 15 minutes, queries ShipHero's GraphQL API and imports new orders into a staging table and Order Management. The SOP states FreightPOP does not update ShipHero (or Shopify) — import only. Avocado moved to the NetSuite integration in June 2024 and is now one of the largest NetSuite SuiteApp tenants, so the ShipHero path is likely retired. No Jira or Freshdesk records about ShipHero itself.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Into FreightPOP → Orders imported from ShipHero on a schedule
- Methods → GraphQL API (custom build)
- Why: Recommend hiding or marking 'on request': the only build was customer-specific, import-only, and superseded by NetSuite. If kept, say 'order import' only.

**Merged — use cases (ins and outs):**

- **Order import from ShipHero (Avocado)** — in: New and on-hold orders via GraphQL query, including tags/SKUs; pending orders updated in the staging table · out: None — 'FreightPOP will not update Shiphero or Shopify for now' _(source: Confluence: Services and Jobs Catalog (avacado_shiphero_orders, every 15 minutes, /Order/UpdateAvacadoShipHeroStagingOrders), Confluence: Freightpop Services Details, Confluence: ShipHero Integration Setup (K1-4240), Confluence: Avocado / Brentwood Home LLC - 19453, FD#29085)_

**Merged — customers (1; 0 live, none approved to name):** Avocado Green Brands / Brentwood Home (churned)

**Proof of capability (closed):** K1-4240 ShipHero integration setup incl. on-hold orders (from Engineering SOP)

**Gaps / could not confirm:** Whether the Lambda is still running; Any generic (non-Avocado) ShipHero connector

### snapfulfil
<a id="snapfulfil"></a>

**Confidence:** low · **Deck card:** SnapFulfil (api, live)

SnapFulfil appears only as a name ('Snapfulfill') in the list of integrations available on the Integrations page. There is no setup guide, no field mapping, no Jira ticket, no Freshdesk ticket and no customer SOP mentioning it. The other two 'snapfulfil' Confluence hits are stored-procedure listings with no SnapFulfil content.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Why: Card is currently 'live' and visible with no content. Records only prove a menu entry exists. Set to request/hidden until product confirms what the connector does and whether any tenant used it.

**Gaps / could not confirm:** Everything: flows, auth, customers, current state

### zoho
<a id="zoho"></a>

**Confidence:** medium · **Deck card:** Zoho Inventory (api, live)

Zoho Inventory is a documented Plug n Play REST integration using a Zoho server-based OAuth app (Client ID, Client Secret, Organization ID). A customer picks one transaction type — Sales Orders or Invoices — to import, and FreightPOP writes carrier, service, tracking and rate back to that same transaction. Field mapping is published. Water Expeditors is live with a customer-specific ship-to company ID mapping (NOMAI-227); Blades Group is migrating from QuickBooks Desktop to Zoho Books/Inventory in 2026 and has had Zoho set up for testing since 2024. Most of the 49 Freshdesk hits are Zoho Desk notification emails from Blades Group's IT helpdesk, not Zoho Inventory issues.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Sales orders or invoices come in from Zoho Inventory with addresses, items and dims, and carrier, service, tracking and rate go back on the same record.”
- Editions → Zoho Inventory (now: —)
- Into FreightPOP → Sales orders or invoices with ship-to, items, dims and references
- Back to the system → Carrier, service, tracking and rate written back to the transaction
- Methods → REST API with Zoho OAuth app (Plug n Play)
- Why: Deck id is zoho-inventory. FD#29649 (2023) notes FreightPOP is not listed in Zoho's own integration marketplace — connection is configured from the FreightPOP side.

**Merged — use cases (ins and outs):**

- **Sales order or invoice → shipment** — in: Ship-to (customer name, attention, address, city/state/zip/country, phone, contact email); Shipment details from items (quantity, unit, length, width, height, weight); Product details (SO number, line quantity, item name, description, rate, HTS); Delivery method → carrier; billing address → third-party details; account number, SO (Ref1), PO (Ref2), Ref3; Ship-to company ID from a Zoho customer field for address-book rules (Water Expeditors only) · out: Carrier, carrier service, tracking numbers, master tracking number, discounted/list/markup rate written back to the imported transaction _(source: Confluence: Zoho Inventory REST API Integration, Confluence: Zoho Inventory Field Mapping, Confluence: Water Expeditors, NOMAI-227)_

**Merged — customers (3; 1 live, none approved to name):** Water Expeditors LLC, Blades Group LLC (incl. Road Rescue Asphalt helpdesk) (implementing), Happen Ventures (Incharged) (unknown)

**Proof of capability (closed):** NOMAI-227 Zoho sales order import maps ship-to and ship-from company IDs for Water Expeditors

**Gaps / could not confirm:** No Snowflake channel code for Zoho; customer count from tickets/SOPs only; Zoho Books (accounting/AP) is not covered by any record — only Zoho Inventory; Whether invoice-type import is used by anyone

### mulesoft
<a id="mulesoft"></a>

**Confidence:** low · **Deck card:** MuleSoft (ipaas, live)

MuleSoft appears once: a 2022 sales SOP for Fictiv, whose MuleSoft layer was proposed as the integration point to rate, ship and track through FreightPOP's API and to push order data so users could process in the UI. There is no FreightPOP MuleSoft connector, no Jira, no Freshdesk ticket and no setup page. Fictiv today ships through the NetSuite plug-in (Snowflake), so the MuleSoft route was never evidenced in production.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `ipaas`)
- Blurb → “Point your MuleSoft flows at the FreightPOP API to rate, book, track and pull documents, and move the results into the systems MuleSoft already reaches.”
  - now: “Your integration platform, FreightPOP's full API surface — orchestrate orders, rates, booking, tracking and documents into anything the platform reaches.”
- Into FreightPOP → Orders, addresses and rate or booking requests sent from your flows to the FreightPOP API
- Back to the system → Rates, tracking, costs and documents read back by your flows
- Methods → FreightPOP REST API
- Why: Remove 'iPaaS connector' from methods and 'event-driven flows on shipment milestones' from outFlows — no webhook/event evidence in these records. Depth should be 'api' (customer-side iPaaS), not a FreightPOP-built ipaas connector. Blurb should avoid 'full API surface'.

**Merged — use cases (ins and outs):**

- **Customer iPaaS → FreightPOP External API (proposed, Fictiv 2022)** — in: Order info sent by MuleSoft so users can process shipments in the FreightPOP UI; rate, ship and track calls from their own UI · out: Rates, shipment confirmations and tracking returned via the API (as proposed) _(source: Confluence: Fictiv (Customer SOPs))_

**Merged — customers (1; 0 live, none approved to name):** Fictiv Inc (unknown)

**Gaps / could not confirm:** Any customer actually running MuleSoft against FreightPOP; Webhook/event support for milestone-driven flows

### boomi
<a id="boomi"></a>

**Confidence:** low · **Deck card:** Boomi (ipaas, live)

Boomi shows up as the customer's own iPaaS calling FreightPOP's External API, not as a FreightPOP connector. Proterra (Oracle ERP, with Birlasoft) went through SIT/UAT in late 2024 using a dedicated API user (proterraapi@freightpop.com, 'App Default Role') on enterprise.freightpop.com, mapping Oracle ASN carriers to FreightPOP carriers inside Boomi; Proterra Powered is an active External API tenant. A PCS Boomi developer hit token endpoint errors in 2024, and an unnamed NetSuite customer in 2026 asked why delivery status reaches NetSuite via Boomi one to two hours after the portal shows it. No Jira, SOP or setup page exists.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `ipaas`)
- Blurb → “Bring your Boomi processes: the FreightPOP API handles orders, rating, booking, tracking and documents, and Boomi moves them to and from your ERP.”
  - now: “Your integration platform, FreightPOP's full API surface — orchestrate orders, rates, booking, tracking and documents into anything the platform reaches.”
- Into FreightPOP → Orders, shipments and ASNs sent from your Boomi processes to the FreightPOP API
- Back to the system → Tracking, delivery status, costs and documents read back into Boomi for your ERP
- Methods → FreightPOP REST API
- Why: Same correction as MuleSoft: there is no FreightPOP Boomi connector; drop 'iPaaS connector' and 'event-driven' claims. Proterra is a real reference pattern (Oracle ↔ FreightPOP through Boomi) if approved. FD#30876 (Oracle/Wildflower external shipment registration) is an Oracle direct-API case, not Boomi.

**Merged — use cases (ins and outs):**

- **Customer Boomi process ↔ FreightPOP External API (Proterra, Oracle)** — in: Shipments/ASNs registered from Oracle via Boomi; carrier names mapped Oracle→FreightPOP in Boomi (seven matched carriers listed) · out: Shipment documents (packing slip, PDFs) and shipment data pulled back by Boomi _(source: FD#43102, FD#44654, FD#44795)_
- **Delivery status to NetSuite via Boomi (unnamed customer)** — in: — · out: Delivery status read from the FreightPOP API and posted to NetSuite; customer observed a 1–2 hour lag vs the portal _(source: FD#60348)_

**Merged — customers (3; 1 live, none approved to name):** Proterra Powered LLC, PCS (pcsww.com) (unknown), Unnamed NetSuite customer (unknown)

**Gaps / could not confirm:** Identity of the 2026 NetSuite/Boomi customer; Whether FreightPOP publishes any Boomi process templates; Documented latency between carrier status update, portal and API

### celigo
<a id="celigo"></a>

**Confidence:** low · **Deck card:** Celigo (ipaas, live)

There is no evidence of a Celigo integration. The only two Freshdesk hits are one Quality Resource Group thread (Feb 2026) about NetSuite orders importing into FreightPOP without items or ship-to; the visible text never names Celigo, and the customer's NetSuite admin describes the FreightPOP integration as 'entirely contained within their own system'. Quality Resource Group ships through the NetSuite SuiteApp per Snowflake. No Jira, Confluence or SOP mentions Celigo.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- How it connects → `api` (now `ipaas`)
- Methods → FreightPOP REST API
- Why: Current card claims 'Celigo flows move orders, shipments and freight data between FreightPOP, NetSuite and the rest of your stack' and lists 'Celigo integrator.io flows' as a method. Nothing in the records supports this. Either hide the card or reword to 'works with any iPaaS via the FreightPOP API' and remove the NetSuite-specific claim (NetSuite customers use the SuiteApp).

**Merged — customers (1; 0 live, none approved to name):** Quality Resource Group (unknown)

**Gaps / could not confirm:** Any customer or partner engagement with Celigo; Whether the QRG ticket mentions Celigo beyond the truncated text

### katana — not in the catalog
<a id="katana"></a>

**Confidence:** low

No evidence of a Katana integration. The single Confluence hit is the .NET 10 modernization assessment, which matched on an unrelated word. No Jira, Freshdesk, SOP or Snowflake record mentions Katana.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- Why: Not in the deck today; do not add. If a prospect asks, position as 'via FreightPOP API or file import' only.

**Gaps / could not confirm:** No records at all

### cin7 — not in the catalog
<a id="cin7"></a>

**Confidence:** low

No evidence of a Cin7 integration. The Sales playbook's 'WMS Context' page lists Cin7 Core as an example Tier 2 WMS in the market, and the one Freshdesk hit is a vendor spam email offering lead lists. No customer, ticket or setup page mentions Cin7.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request`
- Why: Not in the deck; do not add. Cin7 Core is referenced as a market comparison for FreightPOP WMS, not as an integration.

**Gaps / could not confirm:** No records at all

### shopify
<a id="shopify"></a>

**Confidence:** medium · **Deck card:** Shopify (api, live)

Shopify is a FreightPOP-built 'Plug N Play' e-commerce connection (Settings > Integrations > E-Commerce tab) that batch-imports PAID Shopify orders every 15 minutes and writes fulfillment, tracking, carrier and a chosen shipping cost back to the Shopify order. A separate FreightPOP app on the Shopify App Store returns shopping-cart rates at checkout. An older path through Essential Hub (EHub) still appears in some customer SOPs but the EHub e-commerce page is marked 'NOT USING ANYMORE'. Several accounts are live or going live on it in 2026 (ePackageSupply, Trampolines.com/WWEX, Saver Systems).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `native` (now `api`)
- Blurb → “Paid Shopify orders sync into FreightPOP every 15 minutes for rating, booking and fulfillment. Tracking, carrier and shipping cost post back to the Shopify order, and the FreightPOP Shopify app can show carrier rates at checkout.”
  - now: “Storefront orders flow straight into FreightPOP for rating, booking and fulfillment — and tracking flows back to the store and the customer.”
- Editions → Shopify; Shopify Plus (now: —)
- Into FreightPOP → Paid orders with ship-to, sold-to and line detail import every 15 minutes; Cart and destination details at checkout (Shopify app) for live rates
- Back to the system → Fulfillment with tracking number and carrier posted to the order; Shipping cost (discounted, list or marked-up) written to the order; Carrier rates returned to the storefront checkout
- Methods → Plug-and-play connection (Admin API token); Scheduled sync every 15 min; Shopify App Store app
- Why: Current card says 'Real-time' and 'Orders arrive ... as they're placed' — records say batch every 15 minutes and only PAID orders. 'Customer, address and line detail arrive validated' is not evidenced; drop 'validated'. 'Fulfillment status closes the order loop' is correct (fulfillment created). Add the checkout-rating app as a distinct capability. Keep demoGo as is.

**Merged — use cases (ins and outs):**

- **Sales order -> shipment (order import)** — in: Shopify orders in PAID status, polled every 15 minutes (first connection pulls the last 180 days; then only new/modified orders); Ship To from shipping_address (company, first+last name, address1, city, province_code, zip, country_code, phone); Sold To from billing_address; Lines: order_number (with Shopify prefix), fulfillable_quantity, sku, name, price, line id; UoM hard-coded 'EA' · out: — _(source: Confluence: Shopify (Plug N Play), Confluence: Shopify Setup (Plug N Play), Confluence: Shopify Field Mapping Details, Confluence: Shopify Direct Integration (Engineering SOP, WM-1471), Confluence: Update Brief: Shopify Integration -- Import Prefix Order Number, NOMAI-298)_
- **Fulfillment / tracking write-back** — in: Existing fulfillments on the Shopify order are read first to decide full vs partial fulfillment · out: Fulfillment created on the Shopify sales order (full or partial); Tracking number and carrier written to the order; Shipping cost exported to the order: Discounted Cost, List Cost or Markup Rate (chosen at setup) _(source: Confluence: Shopify Setup (Plug N Play), Confluence: Shopify (Plug N Play) Logs, Confluence: ePackageSupply - Workflow ('written back: Tracking # & carrier'), FD 69502)_
- **Shopping-cart rates at checkout (FreightPOP Shopify app)** — in: Cart/product and destination details from the storefront at checkout · out: Carrier rates / transit options shown to the shopper _(source: Confluence: Shopify (Shopping Cart Rating) (apps.shopify.com/freightpop), Confluence: Champion Products / Lakeside Trucking - 20310 (contract: 'pushing and pulling of order data along with shopping cart rates'), Confluence: ePackageSupply - Workflow ('API Plug N Play & Shopping cart rates'), FD 49149, FD 71958)_
- **Legacy: order import via Essential Hub (EHub)** — in: EHub polls the Shopify store; FreightPOP service pulls EHub orders every 10 minutes; one shipment-details line with total weight, no dims; order_store_name -> Customer Job · out: Shipment update posted back to the EHub order (per EHub API docs) _(source: Confluence: Ehub Order Import, Confluence: Shopify / Shopify Plus (EID), Confluence: Essential Hub (FM), Confluence: Ehub Ecommerce (NOT USING ANYMORE), Confluence: Bright People Foods, Inc - 18584)_

**Merged — customers (15; 7 live, none approved to name):** ePackageSupply (20409), Trampolines.com (20357, under WWEX), Saver Systems (20387) (implementing), Noho Homes (19637) (unknown), Hollywood Racks (19495), Kelsan (19542) (unknown), Bright People Foods (18584) (unknown), Avocado / Brentwood Home (19453), Champion Products / Lakeside Trucking (20310) (implementing), Proline Range Hoods (19641), Clean Simple Eats (20232), Uneekor (19882), Canada Mats (unknown), Great Sports (unknown), Beacon commerce (unknown)

**Merged — in flight / known issues:** NOMAI-274 Saver Systems integrations scoping — Shopify plug-in (outbound/inbound), auto-calc, parcel/LTL/TL (New); FP-3328 2019 'Ecommerce API integration' evaluation of api2cart (multi-cart aggregator); never progressed (Open)

**Proof of capability (closed):** NOMAI-545 ePackageSupply Shopify go-live, sandbox to production, pull 90 days of orders; NOMAI-387 ePackageSupply sandbox orders not importing — resolved; NOMAI-298 Trampolines.com (WWEX) orders importing without Shopify prefix — fixed; prefix now imported (Update Brief)

**Gaps / could not confirm:** No record of cancellation / order-edit sync from Shopify back into FreightPOP; Initial order history window is inconsistent across records (180 days vs 30 days 'standard'); No volume metrics tied specifically to the Shopify channel in Snowflake (plug-n-play tenants such as ePackage and Trampolines are absent from the snapshot); Shopify app pricing/plan details only appear in a customer question (FD 49149), not in internal docs; No evidence of inventory, product catalog or item-master sync with Shopify

### bigcommerce
<a id="bigcommerce"></a>

**Confidence:** medium · **Deck card:** BigCommerce (api, live)

BigCommerce is a FreightPOP-built public app in the BigCommerce marketplace (bigcommerce.com/apps/freightpop) that returns real-time shipping rates at checkout using the merchant's carriers, AutoCalc packaging and pricing rules in FreightPOP. It is a rating plugin only: internal docs state 'Orders do not automatically flow into FreightPOP' and the plugin stores no shipment data. Two accounts are documented on it (Blackburn Manufacturing via Proof Digital; Complete Packaging Products), both with sandbox-vs-production rate discrepancy tickets in 2025-2026.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `native` (now `api`)
- Blurb → “The FreightPOP app for BigCommerce shows shoppers live parcel and LTL rates at checkout, using your own carriers, packaging rules and markups in FreightPOP.”
  - now: “Storefront orders flow straight into FreightPOP for rating, booking and fulfillment — and tracking flows back to the store and the customer.”
- Into FreightPOP → Cart contents and destination at checkout
- Back to the system → Live carrier rates and transit options at checkout, with your markups and free-shipping rules
- Methods → BigCommerce marketplace app; Real-time API
- Why: Current card copies the Shopify blurb (orders flow in, tracking posts back). Internal docs explicitly say orders do not flow into FreightPOP and nothing is written back. Rewrite as a checkout-rating app. proofUrl https://www.freightpop.com/bigcommerce is confirmed in records.

**Merged — use cases (ins and outs):**

- **Shopping-cart rates at checkout** — in: Cart products, quantities and destination address sent from BigCommerce to FreightPOP at checkout (REST over HTTPS) · out: Shipping options returned: AutoCalc-packed parcel and LTL rates from configured carriers, with markups/discounts, free-shipping rules and display rules (lowest cost, lowest per transit date, all) _(source: Confluence: BigCommerce (Shopping Cart Rating), Confluence: BigCommerce (Shopping Cart Rating) - Work in Progress, Confluence: BigCommerce Plugin Installation & Initial Configuration, Confluence: BigCommerce (FM), Confluence: Blackburn Manufacturing - 20074)_

**Merged — customers (3; 2 live, none approved to name):** Blackburn Manufacturing (20074), Complete Packaging Products (20312), Prima Supply / Prima Coffee (unknown)

**Merged — in flight / known issues:** NOMAI-612 Complete Packaging: BigCommerce production rates do not match sandbox; production only quoting R&L (New)

**Proof of capability (closed):** NOMAI-388 Earlier pass on the same Complete Packaging sandbox/production rate mismatch

**Gaps / could not confirm:** No evidence of order import or tracking/fulfillment write-back for BigCommerce; Only two documented merchant accounts; no Snowflake channel attributable to BigCommerce; App Store review thread (FD 42007) shows pricing/listing details still being set in 2024; current listing terms not in records

### woocommerce
<a id="woocommerce"></a>

**Confidence:** low · **Deck card:** WooCommerce (api, live)

Two WooCommerce paths appear in the records. Current: a FreightPOP WordPress/WooCommerce plugin (wordpress.com/plugins/freightpop) for shopping-cart rating at checkout, configured with FreightPOP credentials, product settings, rate display and markup/discount rules. Legacy: order import through Essential Hub (EHub), where EHub developers connected the store with WooCommerce REST keys — used for Mid Atlantic Event Group in 2023, but the EHub e-commerce page is now marked 'NOT USING ANYMORE'. A 2022 NOMAI story 'WooCommerce integration' (ABC Co) remains New.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `native` (now `api`)
- Blurb → “The FreightPOP plugin for WooCommerce shows shoppers live carrier rates at checkout using your FreightPOP carriers and pricing rules. Order hand-off to FreightPOP is available through the FreightPOP API.”
  - now: “Storefront orders flow straight into FreightPOP for rating, booking and fulfillment — and tracking flows back to the store and the customer.”
- Into FreightPOP → Cart contents and destination at checkout
- Back to the system → Live carrier rates at checkout with your markups or discounts
- Methods → WordPress / WooCommerce plugin; FreightPOP API
- Why: Current card copies the Shopify blurb (orders flow in, tracking back). Only legacy EHub evidence supports order import, and that path is marked not in use. Reframe around checkout rating; mention order import only as API-based.

**Merged — use cases (ins and outs):**

- **Shopping-cart rates at checkout (WooCommerce plugin)** — in: Cart and destination details from the WordPress store at checkout · out: Carrier rates displayed to the shopper (cheapest/fastest display options; base vs list rate conditions; markups/discounts) _(source: Confluence: WooCommerce (Shopping Cart Rating), Confluence: WooCommerce (Shopping Cart Rating) - Setup, Confluence: Render Packaging (Skung Jars) Workflow and Site Expectations ('WooCommerce Shopping Cart integration Standard Plug N Play'))_
- **Legacy: order import via Essential Hub** — in: WooCommerce orders (order id/number, dates, totals, items, billing and shipping address, shipments) pulled by EHub and then by the FreightPOP EHub order-import service · out: Shipment update posted to the EHub order after shipping (EHub API) _(source: Confluence: WooCommerce (EID), Confluence: Essential Hub (FM), Confluence: Ehub Ecommerce (NOT USING ANYMORE), Confluence: Mid Atlantic Event Group - Workflow Call, Confluence: Onboarding Integration Questions - Archive (3/29-3/30/23 EHub WooCommerce setup))_

**Merged — customers (7; 0 live, none approved to name):** Mid Atlantic Event Group (unknown), Render Packaging (Skung Jars) (unknown), Federal Signal Corp. (unknown), Ice Barrel (unknown), ABC Co (17078) (unknown), Odyssey Logistics (unknown), Unishippers prospect (unnamed) (unknown)

**Merged — in flight / known issues:** NOMAI-53 WooCommerce integration for ABC Co, to be built with 'the automation' — open since 2022, updated 2026-04 (New); FP-3328 2019 api2cart evaluation (lists WooCommerce) — never progressed (Open)

**Gaps / could not confirm:** No current FreightPOP-native WooCommerce order import or tracking write-back evidenced; No Snowflake channel attributable to WooCommerce; Plugin listing details (wordpress.com/plugins/freightpop) beyond the setup page are not in records; Status of NOMAI-53 'automation' approach is unclear

### magento
<a id="magento"></a>

**Confidence:** low · **Deck card:** Adobe Commerce (Magento) (api, live)

There is no FreightPOP-built Magento / Adobe Commerce connector in the records. The only internal doc is 'Magento (Coming Soon)', which routes setup through the third-party Essential Hub (EHub) — and the EHub e-commerce page is marked 'NOT USING ANYMORE'. Where customers use Magento with FreightPOP today, their own developers call the FreightPOP external API (getRates) for shopping-cart rates (NAKS/HoodMart; ALP Supply planning the same for a new Magento/Adobe site).

**Apply (public card):**
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connect a Magento or Adobe Commerce store to FreightPOP through the FreightPOP API to return carrier rates at checkout and hand orders to FreightPOP for shipping.”
  - now: “Storefront orders flow straight into FreightPOP for rating, booking and fulfillment — and tracking flows back to the store and the customer.”
- Into FreightPOP → Rate requests from the storefront (via FreightPOP API)
- Back to the system → Carrier rates returned to checkout
- Methods → FreightPOP API (customer or partner built)
- Why: The deck's adobe-commerce card should not claim a native connector or automatic order import/tracking write-back; only API-based cart rating is evidenced. Consider status 'request' (available via API/partner build) rather than 'live'.

**Merged — use cases (ins and outs):**

- **Shopping-cart rates via FreightPOP external API (customer-built)** — in: Rate requests from the Magento storefront to FreightPOP getRates (V4) with address and product/dims · out: Carrier rates returned to the storefront _(source: Confluence: NAKS Workflow ('Magento they will have a developer call our APIs to be able to get shopping cart rates'), FD 57193, FD 31498, FD 62406)_
- **Order import via Essential Hub (documented as 'Coming Soon'; EHub path retired)** — in: Customer generates Magento API key/secret, access token/secret and site URL; EHub support connects the store; orders would arrive via the EHub order import service · out: — _(source: Confluence: Magento (Coming Soon), Confluence: Ehub Ecommerce (NOT USING ANYMORE), Confluence: eCommerce (FM) — Magento/Magento 2 listed as no longer supported by the third-party partner)_

**Merged — customers (3; 1 live, none approved to name):** NAKS Inc / HoodMart (20185), ALP Supply (implementing), Rocket Web client (unnamed) (unknown)

**Merged — in flight / known issues:** FP-3328 2019 evaluation of api2cart multi-cart aggregator (lists Magento) — never progressed (Open)

**Gaps / could not confirm:** No FreightPOP-owned Magento extension or marketplace listing found; No order import, fulfillment or tracking write-back evidence outside the retired EHub path; No Snowflake channel for Magento (NAKS volume is attributed to NetSuite/QuickBooks channels)

### amazon — not in the catalog
<a id="amazon"></a>

**Confidence:** low

erp-rag/amazon.json is empty, but live Jira/Confluence lookups (done because the brief pointed at TT-7231 / TT-6341) show three different 'Amazon' things. (1) Amazon Direct Fulfillment (ATS): a built, in-production module for Amazon vendor-program shipments — FreightPOP calls Amazon's SP-API to get the Amazon-assigned carrier/ship method and label, converts ZPL labels, confirms shipments, pulls tracking, and exports the carrier SCAC back to the ERP for ASNs (Mayne, Vita). (2) Amazon Parcel: a carrier-integration epic (ROTS-103) treating Amazon Shipping as a broker carrier (shipping, tracking, cancel, documents) with document retrieval released Aug 2026. (3) Amazon LTL / FTL (Amazon Freight as a carrier): TT-6341 'Amazon LTL' epic and its quoting/shipping/tracking/POD/cancel stories were all Closed in May 2026 with descriptions still reading 'Waiting on ROTS-92', and TT-7231 'Amazon FTL' is an empty New epic — treat as not delivered unless engineering confirms. Separately, Amazon (19469) is itself a FreightPOP shipper customer, and Thrasio is a NetSuite customer, not an Amazon integration. Evidence outside the local extract is marked 'live Jira' / 'live Confluence'.

**Apply (public card):**
- Status → `live`
- How it connects → `api`
- Blurb → “Ship Amazon Direct Fulfillment orders from FreightPOP: Amazon assigns the carrier, FreightPOP prints the compliant label, confirms the shipment and tracks it, and the carrier code flows back to your ERP for ASNs.”
- Editions → Amazon Direct Fulfillment (ATS); Amazon Shipping (Parcel)
- Into FreightPOP → Amazon-assigned carrier, ship method and label for Direct Fulfillment orders; Tracking and shipment documents from Amazon
- Back to the system → Label requests and shipment confirmations to Amazon; Carrier SCAC to your ERP for ASN filing
- Methods → API connection (Amazon SP-API)
- Why: No Amazon card exists in the deck today. If one is added, scope it to Amazon Direct Fulfillment (ATS) and Amazon Parcel; do not claim Amazon Freight LTL/FTL until engineering confirms TT-6341 outcome. Amazon the shipper and Thrasio are customers, not integrations.

**Merged — use cases (ins and outs):**

- **Amazon Direct Fulfillment (ATS) order -> label -> shipment confirmation** — in: Direct Fulfillment orders arrive via the customer's ERP integration (e.g., NetSuite order imported as 'Amazon Direct Fulfillment Standard Shipping'); Amazon assigns the carrier / ship method (e.g., UPS_GR_DF) and returns the label (ZPL) through the SP-API shipping label call · out: Shipping label request and shipment confirmation sent to Amazon (Shipping Label API, Shipment Confirmation API); Carrier SCAC captured and exported to the ERP (NetSuite custbody SCAC field) so the vendor can file compliant ASNs; Tracking pulled from Amazon GET /shipping/v2/tracking onto the FreightPOP shipment _(source: live Confluence: How Does Amazon Direct Fulfillment (ATS) Work in FreightPOP?, live Confluence: Technical Documentation: Amazon Shipping and Shipment Confirmation APIs Integration, live Confluence: Amazon Direct Fulfillment (ATS) Tracking Integration - Technical Documentation, live Confluence: Technical Documentation: Amazon Selling Partner API (SP-API) Integration, live Jira: NOMAI-167, live Jira: DA-2056, DA-2057, DA-2276, DA-3071, DA-3333, DA-3497)_
- **Amazon Parcel (Amazon Shipping as a broker carrier)** — in: Tracking and shipment documents retrieved from Amazon after booking · out: Shipment booking and cancel requests to Amazon Shipping API v2 (OAuth2 refresh-token flow against SP-API) _(source: live Confluence: Amazon Parcel, live Confluence: Amazon Parcel - Shipping / Tracking / Cancel / Documents, live Confluence: Update Brief: Amazon Parcel -- Document Retrieval (ROTS-232))_
- **Amazon LTL / FTL (Amazon Freight as an automation carrier) — status unclear** — in: — · out: — _(source: live Jira: TT-6341 (Epic, Closed 2026-05-22; backstory links Amazon Freight 2025 LTL inbound launch), live Jira: ROTS-9, ROTS-16, ROTS-17, ROTS-13, ROTS-14 (Closed; descriptions 'Waiting on ROTS-92'), live Jira: TT-7231 (Epic 'Amazon FTL', New, no description))_
- **Vendor compliance labels for Amazon (customer-specific)** — in: — · out: Amazon UCC / pallet labels generated on save shipment (Walthers, barcode = customer PO from NetSuite custom field) _(source: live Jira: BF-11233, BF-11235)_

**Merged — customers (6; 5 live, none approved to name):** Mayne Inc (19851), Vita (wearevita.com), Walthers, Amazon / Amazon Opstech Solutions (19469), Thrasio (20268), Ice Barrel (unknown)

**Merged — in flight / known issues:** DA-6837 Consolidate ATS label fixes (lineItemId, packing validation, piece-number errors) (Ready to Test); ROTS-1078 Amazon Direct Fulfillment — upload credentials documentation (New); DA-3476 Improvements to Amazon Direct Fulfillment integration (ATS) (New); TT-7231 Amazon FTL epic — empty placeholder (New); DA-1018 Amazon Direct Fulfillment (ATS) Integration epic (Groomed); ROTS-140 Amazon Shipping Integration epic (2023) (Ready to Scope); TT-4776 Amazon (shipper) — Mexico destinations wrongly sent to SAIA quoting (New)

**Proof of capability (closed):** DA-2056 Amazon Direct Fulfillment (ATS) - Part 1; DA-2276 ATS Part 3 - Tracking; DA-3071 ATS carrier-level mapping; DA-3333 Batch Ship from Orders for ATS; DA-3497 ATS label handling improvements; NOMAI-167 Vita — Amazon carrier SCAC exported to NetSuite for ASNs

**Gaps / could not confirm:** Local extract had zero Amazon records; all integration evidence here is from live Jira/Confluence titles and summaries, not the local JSON; Outcome of TT-6341 'Amazon LTL' (Closed) and child stories is unknown — could be cancelled or delivered; No Snowflake channel for Amazon; Mayne and Vita volumes not isolated; Amazon Parcel epic ROTS-103 status and live customers not confirmed; No marketplace (Seller Central order import) integration evidenced; 'Amazon Seller Fulfilled Prime' only appears in retired EHub list and a 2022 CRI page

### salesforce
<a id="salesforce"></a>

**Confidence:** low · **Deck card:** Salesforce (api, live)

No FreightPOP-built Salesforce connector appears in the records (one Jira hit, FP-3328, is a 2019 api2cart note; most Freshdesk hits are FreightPOP's own CRM or Flock Freight's Salesforce rollout). Where customers connect Salesforce, they or their agency build against the FreightPOP external API: NAKS/HoodMart quotes LTL (and asked for parcel) from Salesforce for sales reps and planned to pull tracking, carrier, service, rate and ship date back via getShipments or a webhook; Proline Range Hoods 'integrated to our site via our open API to Salesforce' in Dec 2022; integrator HULFT scoped a Salesforce-rates integration for OpenTron in 2022. WWEX asked in Feb 2025 whether the Salesforce integration listed on the website is active.

**Apply (public card):**
- Status → `request` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connect Salesforce to FreightPOP through the FreightPOP API so sales teams can quote freight from the CRM and pull tracking and cost back onto the order.”
  - now: “Puts shipment truth where your revenue team lives — sales and service answer 'where is my order?' from the CRM, without a trip to ops.”
- Into FreightPOP → Rate requests and orders from Salesforce via the FreightPOP API
- Back to the system → Carrier rates to Salesforce; Tracking, carrier, service, cost and ship date available via API or webhook
- Methods → FreightPOP API (customer or partner built)
- Why: Current blurb ('shipment truth where your revenue team lives', exception alerts to the relationship owner) is not evidenced. Only API-based rating and status pull are supported by records. Recommend status 'request' and removing 'Exception alerts reach the owner of the relationship'.

**Merged — use cases (ins and outs):**

- **Quote from Salesforce (customer-built on FreightPOP API)** — in: Rate requests from Salesforce (getRates) for sales reps; FPQuoteId and rate amount saved on the Salesforce order · out: Carrier rates returned to Salesforce _(source: Confluence: NAKS Workflow, FD 56497, FD 55552, FD 57193, FD 68691, FD 52402)_
- **Shipment status back to Salesforce (customer-built)** — in: — · out: Tracking, carrier, service, rate amount and shipped date pulled by the customer via getShipments API or webhook and written to the Salesforce order _(source: Confluence: NAKS Workflow ('They will either setup a webhook or call our getShipments API ... and update sales force'))_
- **Salesforce order -> FreightPOP shipment via open API** — in: Orders created from Salesforce through the FreightPOP external API · out: — _(source: Confluence: ProLine Range Hoods - 19641 ('has integrated to our site via our open API to Salesforce - 12.20.22'), snowflake external-api Proline Range Hoods 11,088 shipments/12m)_

**Merged — customers (4; 2 live, none approved to name):** NAKS Inc / HoodMart (20185), Proline Range Hoods (19641), OpenTron via HULFT (integrator) (unknown), WWEX (inquiry) (unknown)

**Merged — in flight / known issues:** FP-3328 2019 api2cart evaluation (lists Salesforce Commerce Cloud) — never progressed (Open)

**Gaps / could not confirm:** No FreightPOP-native Salesforce connector, package or documented setup; No evidence of exception alerts or shipment status surfaced inside Salesforce by FreightPOP; 90 Freshdesk hits were mostly FreightPOP's own CRM, Flock Freight notices and FedEx case emails — excluded

### hubspot
<a id="hubspot"></a>

**Confidence:** low · **Deck card:** HubSpot (api, live)

Every HubSpot record is about FreightPOP's own CRM: BF-9183 sends churn score and rolling 30-day parcel/non-parcel volume for each customer company to HubSpot daily (replacing ChurnZero), the FPEmailScheduler service runs a nightly 'HubSpot Contact Updates' job, and Partnerships uses Kiflo -> Airtable -> HubSpot. There is no record of a customer connecting their HubSpot to FreightPOP, and no Freshdesk ticket about it.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Status → `request` (now `live`)
- Why: The current card's blurb and flows (shipment status on the account, exception alerts to the relationship owner) have no supporting record. Recommend hiding the card or marking it 'request' (available via FreightPOP API, like Salesforce) until a customer deployment exists.

**Proof of capability (closed):** BF-9183 Internal: send churn and volume data to FreightPOP's HubSpot (company properties, daily)

**Gaps / could not confirm:** No customer HubSpot integration, request or inquiry found in Jira, Freshdesk or Confluence; Internal HubSpot sync details (BF-9183, FPEmailScheduler) are not sellable capabilities

### samsara
<a id="samsara"></a>

**Confidence:** medium · **Deck card:** Samsara (api, live)

Samsara is the most built-out ELD/telematics integration in the records and works at two levels. Carrier-level (BF-8877, for Sunkist Growers): a shipper's third-party carrier running Samsara grants an API key via a 'Request Access' email flow, and FreightPOP pulls vehicle location history onto the shipment. Fleet-level (TT-8410, for BayWa r.e.): the shipper connects its own Samsara account with an API token, picks vehicles as tracking devices, and FreightPOP pulls location history hourly and on click. On top of that, a 2026 'Push Routes to Samsara' feature (TT-8411/TT-8796/TT-9081) creates and updates Samsara routes from FreightPOP shipments (stops with addresses, SO numbers in stop notes, return-to-origin stop), triggered by a reference field, shipment creation or pickup event; a NetSuite-to-FreightPOP status API (TT-8243) feeds that trigger. Geofence-based automated milestones are available for all ELD providers (TT-7799).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connect Samsara, yours or your carrier's, to see truck location on each shipment, update milestones automatically with geofences, and push dispatch routes with stops and order numbers from FreightPOP to Samsara.”
- Into FreightPOP → Vehicle list and location history for shipments on your fleet; Location from a carrier's Samsara when the carrier grants access
- Back to the system → Routes with stops, addresses and sales order numbers pushed to Samsara; Automated pickup and delivery milestones from geofences
- Methods → API connection (API token); Hourly tracking sync; Event-driven route push
- Why: Card is currently empty. Fill blurb/flows as above; the bidirectional route push is unique to Samsara among the ELD cards. Hours-of-service, driver data and vehicle diagnostics are NOT evidenced — do not list.

**Merged — use cases (ins and outs):**

- **ELD location tracking on shipments (fleet-level)** — in: Vehicle list for device setup (GET /fleet/vehicles); Vehicle location history (GET /fleet/vehicles/locations/history) pulled hourly by the tracking Lambda and when a user clicks the tracking number · out: — _(source: TT-8410, Confluence: Samsara Fleet Integration, Confluence: ELD Tracking Integrations, Confluence: Tracking Devices - ELD)_
- **ELD tracking via a third-party carrier's Samsara (carrier-level)** — in: Carrier submits its Samsara API key through the emailed 'Submit API Token' landing page; vehicle chosen on Quote/Ship; location updates pulled every 6 hours or on click · out: 'Request ELD Tracking Access' email sent to the carrier's account rep _(source: BF-8877, Confluence: Dev plan for BF-8877, Confluence: Samsara Integration, Confluence: Tracking Devices - ELD, FD 61292)_
- **Route push to Samsara** — in: Trigger: designated reference field flag (e.g., set by the ERP), shipment creation, or pickup event · out: Samsara route created/updated (POST /fleet/routes, PATCH /fleet/routes/{id}) with origin, stops and destination addresses, SO numbers in stop-level notes, and a closing return-to-origin stop; external route id stored on the shipment _(source: TT-8411, TT-8796, TT-9081, TT-9202, TT-9203, TT-9127, FD 69173, FD 69388, FD 69685)_
- **Automated tracking milestones via geofencing** — in: ELD location compared to pickup/delivery coordinates against a configurable radius · out: Shipment status set to In Transit / Out for Delivery / Delivered automatically _(source: TT-7799, Confluence: Tracking Devices - ELD, TT-9479 (BayWa: geofencing not working))_
- **ERP status -> FreightPOP -> Samsara** — in: NetSuite calls a FreightPOP API endpoint with tracking number/shipment id and status when the order is ready for dispatch · out: Downstream Samsara route push _(source: TT-8243, TT-8411)_

**Merged — customers (5; 2 live, none approved to name):** BayWa r.e. Solar Systems (20392), Sunkist Growers (19732), Harcros (20481) (implementing), ALP Supply (unknown), William Lawton (prospect) (unknown)

**Merged — in flight / known issues:** BF-11908 [Fleet] Pull equipment info from Samsara (Harcros) (New); TT-9479 BayWa Samsara ELD not tracking and geofencing not working (seen via TT-9480 timekeeping task) (New); TT-8492 Testing timekeeping for TT-8410 fleet tracking (In Progress); TT-7891 Geofence radius accepts decimals when it should not (New); TT-3595 Original 2023 story 'Integration of ELD tracking provider Samsara' (New)

**Proof of capability (closed):** TT-7826 Samsara ELD Integration epic (BayWa); TT-8410 Fleet-level Samsara tracking (Part 1); TT-8411 Push stop info / routes to Samsara (Part 2); TT-8796 SO numbers to stop-level notes on route push (Part 3); TT-9081 Append return-to-origin stop on route push (Part 4); BF-8877 Carrier-level Samsara ELD integration (Sunkist)

**Gaps / could not confirm:** No evidence of HOS, driver, fuel or diagnostics data being pulled — only vehicle location; Snowflake does not isolate fleet/ELD shipments; BayWa volume is attributed to the NetSuite channel; Harcros equipment-info scope (BF-11908) is undefined

### gomotive
<a id="gomotive"></a>

**Confidence:** medium · **Deck card:** GoMotive (api, live)

Go Motive (Motive, formerly KeepTruckin) is a shipper-owned-fleet ELD integration built for Alley-Cassetty (BF-8440 / BF-8043, 2024-25) and extended for Korpack (asset gateways, TT-7988). The shipper authorizes via OAuth2 (redirect to the Motive app), picks vehicles or asset gateways as tracking devices on FreightPOP equipment, and FreightPOP pulls location data on a schedule, stores it, and shows it filtered by distance/time thresholds; geofence-based automated milestones were added for all ELDs (TT-7799), and a nightly sync maps Motive vehicle availability to FreightPOP equipment status. Data flows one way (pull only); the OAuth 'save triggers auth' behaviour has caused live breakage and a UI fix is in test (BF-11911).

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connect your Motive account to see truck and trailer location on every fleet shipment, set pickup and delivery milestones automatically with geofences, and keep equipment status in sync nightly.”
- Into FreightPOP → Vehicle and trailer (asset gateway) locations on fleet shipments; Vehicle availability to update equipment status nightly
- Back to the system → Automated pickup and delivery milestones from geofences
- Methods → OAuth 2.0 connection; Scheduled location sync
- Why: Card is empty today. Name on the card is 'GoMotive'; records use 'Go Motive' and the vendor brands as Motive. No data is pushed into Motive, so do not list route/dispatch push. HOS/driver data not evidenced.

**Merged — use cases (ins and outs):**

- **ELD location tracking on fleet shipments** — in: Vehicle and asset-gateway lists for device setup (GET /v1/vehicles-style lookup; GET https://api.gomotive.com/v1/assets); Vehicle / asset locations (asset: GET /v1/asset_locations/{id}) pulled by the ELD tracking job (every 15 min per TT-7980; original spec every 6 min) and on manual status change; stored and displayed by distance/time threshold · out: — _(source: BF-8440, BF-8043, TT-7988, TT-7980, Confluence: Go Motive integration, Confluence: Dev Plan for BF-8043, Confluence: Tracking Devices - ELD)_
- **Automated tracking milestones via geofencing** — in: Location updates compared to pickup/delivery coordinates with configurable radius · out: Shipment marked In Transit / Out for Delivery / Delivered automatically _(source: TT-7799, Confluence: Tracking Devices - ELD ('Motive Geofencing/Automated Tracking: Available (by FreightPOP)'))_
- **Equipment status sync** — in: Nightly read of Motive vehicle availability; In Service -> Active, Out Of Service -> Out of Service on matching FreightPOP equipment · out: — _(source: Confluence: How Do I Automatically Update Equipment Status Using Go Motive?, BF-10227 ('motive pull active/inactive'))_

**Merged — customers (3; 2 live, none approved to name):** Alley-Cassetty (20219), Korpack (20048), Motive Energy Systems (19552) (unknown)

**Merged — in flight / known issues:** BF-11911 Move Go Motive OAuth trigger from page Save to an 'Authenticate' button and add an integration status indicator (Ready to Test); BF-11757 Error when viewing Go Motive ELD tracking on an Alley-Cassetty shipment (New); BF-9561 Enable OAuth install from the Go Motive Marketplace (Groomed); BF-10011 Tracking device nickname not enforced unique (New)

**Proof of capability (closed):** BF-8440 Alley-Cassetty — integrate with Go Motive ELD; BF-8043 ELD: Go Motive Part 2; TT-7988 Korpack — add Motive asset gateways (trailers); TT-7980 Dedicated ELD tracking job every 15 min after missing updates; TT-7799 Geofencing logic in FreightPOP for all ELD providers; TT-8114 Go Motive authentication failures investigated and re-authenticated

**Gaps / could not confirm:** No HOS, driver or diagnostics data evidenced — location only; Fleet shipments are not integration-typed in Snowflake; no volume by channel; Exact Motive location endpoint for vehicles is not named in the records (only asset endpoints are)

### trimble
<a id="trimble"></a>

**Confidence:** low · **Deck card:** Trimble (api, live)

Trimble (ticketed as 'Trimble - Platform Science'; endpoints are the PeopleNet/pfmlogin OpenInterface) is the newest ELD provider, built for a WWEX fleet customer under TT-7805 ('[10h] Trimble ELD', Done) with a Part 2 story (BF-9456) still New. The engineering page states 'this integration is in development'. It follows the same ELD pattern (vehicle list for device setup, location history pulled hourly by the tracking Lambda, latest position on click) but with CustomerId/password auth, no geofencing, IP-whitelisted API, paginated history with a 1-minute cooldown and a 5,000-record MoreData loop. Treat as early-stage until a live customer is confirmed.

**Apply (public card):**
- Status → `roadmap` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Connect Trimble telematics to show truck location on fleet shipments in FreightPOP.”
- Editions → Trimble - Platform Science (PeopleNet) (now: —)
- Into FreightPOP → Vehicle list and location history for fleet shipments
- Methods → API connection (customer id and password); Hourly location sync
- Why: Card is empty and marked live. Records support 'built, first customer in progress' at best; recommend status 'roadmap' or 'implementing' and no geofence/automated-milestone claim for Trimble.

**Merged — use cases (ins and outs):**

- **ELD location tracking on fleet shipments** — in: Vehicle list (pnet_group_detail) to populate tracking devices; Latest vehicle position on click (loc_onetruck); All historical location updates for all vehicles pulled hourly by the tracking Lambda (oi_pnet_location_history), then filtered to the shipment's device · out: — _(source: TT-7805, Confluence: Dev Plan for BF-9132, Confluence: Trimble Integration, Confluence: ELD Tracking Integrations ('We also started working on Trimble'), TT-7976)_

**Merged — customers (2; 0 live, none approved to name):** WWEX (19734) — unnamed fleet customer (implementing), Tri-West (unknown)

**Merged — in flight / known issues:** BF-9456 Trimble ELD Part 2 (WWEX fleet customer) — template story, no scope written (New)

**Proof of capability (closed):** TT-7805 [10h] Trimble ELD — provider 'Trimble - Platform Science', device listing, hourly tracking; TT-7976 ELD updates for multistop shipments with Trimble device — fixed

**Gaps / could not confirm:** No confirmed live customer or production shipments on Trimble; Which Trimble product (Platform Science vs PeopleNet/Trimble Transportation) is unclear — ticket name and endpoints disagree; No HOS, driver or diagnostics data evidenced

### tive
<a id="tive"></a>

**Confidence:** low · **Deck card:** Tive (api, live)

Tive is a built tracker-device integration (epic RS-3344, 2023): a user adds a Tive device to a processed shipment from Shipment Details (or passes the device id through an ERP integration with custom dev); FreightPOP creates a matching shipment in the Tive platform (POST /public/v3/Shipments), then pulls tracker data (location, temperature, humidity, light, acceleration/shock, battery) and shipment status on the regular tracking schedule, filtering it by distance/time thresholds and blending it with carrier tracking if the customer chooses 'carrier and device'. Tive's departure/arrival marks the shipment In Transit / Delivered. Only one Jira ticket in the extract references Tive (TT-5945, Alley-Cassetty multi-stop updates), so live customer usage is thin. Tive is also listed as a Silver integration partner for outbound referrals.

**Apply (public card):**
- Status → `live` (now `live`)
- How it connects → `api` (now `api`)
- Blurb → “Attach a Tive tracker to a shipment and see its location and condition, temperature, humidity, light and shock, on the FreightPOP tracking timeline alongside carrier updates.”
  - now: “In-transit visibility from Tive trackers layered onto the FreightPOP shipment timeline — location and condition, live.”
- Into FreightPOP → Tracker location and condition readings (temperature, humidity, light, shock, battery) on the shipment timeline; Departure and arrival from Tive to set In Transit and Delivered
- Back to the system → Shipment created in the Tive platform when a tracker is attached in FreightPOP
- Methods → API connection
- Why: Current outFlow 'Alerts when a shipment deviates from plan' is not evidenced in FreightPOP (alert presets live in Tive). 'One tracking view across trackers and carrier feeds' is supported ('carrier and device' blend). Humidity is evidenced but not on the card.

**Merged — use cases (ins and outs):**

- **Tracker-based in-transit visibility** — in: Tracker data points (coordinates, address, temperature, humidity, light, acceleration G, motion, battery) via GET /public/v3/Shipments/{publicShipmentId}/trackerData; Shipment status / completed date via GET /public/v3/Shipments/{publicShipmentId}/status, used to set In Transit and Delivered · out: Shipment created in the Tive platform with device id, legs, from/to addresses and alert preset ids (POST /public/v3/Shipments) when the device is attached in FreightPOP _(source: live Confluence: Tracking Devices - Tive, Confluence: Tive Tracking (Engineering SOP), live Confluence: Tive Shipment, TT-5945)_

**Merged — customers (1; 1 live, none approved to name):** Alley-Cassetty (20219)

**Merged — in flight / known issues:** TT-5945 Alley-Cassetty multi-stop tracking edge cases — make per-stop delivered updates standard rather than Tive-only (Ready to Groom)

**Gaps / could not confirm:** No named live customers beyond an implied Alley-Cassetty reference; no Freshdesk tickets; No Snowflake signal (tracker usage is not an integration type); 'Tracking Devices - Tive', 'Tive Shipment' and 'Tive' pages were read from live Confluence; only one chunk of 'Tive Tracking' was in the local extract

### fictiv — not in the catalog
<a id="fictiv"></a>

**Confidence:** low

Fictiv is a customer (company 20437), not an integration system. In 2022 it was scoped as an Odoo + Mulesoft + EasyPost shop wanting to integrate through Mulesoft; in April 2026 it was onboarded on NetSuite (NOMAI-557: NetSuite native SuiteApp, Item Fulfillment transaction, AP export yes, with the FreightPOP app as fallback for shipments native cannot handle). Snowflake shows 619 shipments in 12 months on the NetSuite plug-in channel, last shipment 2026-08-13, account status 3. It should be listed as a customer under NetSuite (and historically Mulesoft), not as its own deck card.

**Apply (public card):**
- **Hide from the deck** (keep in catalog)
- Why: Do not create a Fictiv card. Add Fictiv Inc as a NetSuite (SuiteApp) customer with status live/low volume; the 2022 Mulesoft scoping can be cited on the Mulesoft iPaaS card as a scoped (not confirmed built) example.

**Merged — use cases (ins and outs):**

- **NetSuite Item Fulfillment -> shipment with AP export (customer deployment)** — in: Item Fulfillments from NetSuite via the native SuiteApp · out: Shipment data back to NetSuite; AP (freight invoice) export enabled _(source: NOMAI-557, Confluence: Fictiv - 20437, snowflake erp-plugin-netsuite)_

**Merged — customers (1; 1 live, none approved to name):** Fictiv Inc (20437)

**Merged — in flight / known issues:** NOMAI-557 Fictiv integration epic — NetSuite native, Item Fulfillment, AP (New)

**Gaps / could not confirm:** Whether the Mulesoft path was ever built is not recorded; No Freshdesk tickets; integration settings section of the SOP is blank

## Analyst notes by group

### group-a-notes.md

# Group A notes — NetSuite and platform (External API / import architecture)

Files: `proposals/netsuite.json` (~35 KB; over the ~25 KB guide because all 85 Snowflake tenants plus 16 non-Snowflake customers are listed with evidence — trim `customers` if size matters more than coverage) and `proposals/_platform.json` (~22 KB).

## What the records say that the current NetSuite card gets wrong
- "WMS receipts, picks and inventory adjustments post back automatically" is not live. The only evidence is NOMAI-495, an epic in status New describing NetSuite WMS transactions over SuiteTalk REST. Remove or move to roadmap.
- "RMAs import — batch or real-time": RMAs are real-time search only (NetSuite FAQ). POs, SOs, IFs, TOs and PO Inbound Shipments are the batch types.
- "Bilateral sync across every transaction type" overstates: an account imports Sales Orders or Item Fulfillments, not both, and IFs can only be shipped once (NetSuite FAQ).
- "OneWorld" appears nowhere. The SuiteApp documents per-subsidiary vs all-subsidiary configuration; say "single or multi-subsidiary accounts".
- The APM-script note (BayWa 2026-05) on the current card is not in this record set.

## Things the card under-sells (all cited in netsuite.json)
- Cost write-back is unusually configurable: discounted/list/marked-up, to Shipping Cost, Memo, both or a custom field; split total, per package or per weight; optional markup.
- Export timing "after carrier pickup" exists for customers who get missed pickups (queue drained 8 AM / 8 PM PST).
- Tracking status, comment and appointment date write to custom fields through delivery.
- Change Management: NetSuite order updates to allocated orders create reviewable -V1/-V2 copies (NetSuite only).
- SPS Commerce ASN support through the SPS NetSuite bundle (Pyramex, Tessco); SSCC without UCC labels shipped 2026-09 (BF-11999).
- The SuiteApp quotes from Quote, SO, TO, PO and IF; ships from IF; supports auto calc, dual LTL+parcel rating, return labels, master product data upload. Limits: no spot quotes, multi-stop, parcel hazmat, carrier creation.

## Cross-system observations
- The NetSuite plug-in and the SuiteApp are two different products that share one FreightPOP account; the SuiteApp is itself an External API consumer (getRates V4), so API-side bugs surface as "NetSuite" tickets (TT-9124 duplicate UPS services, BF-12027 markups).
- Batch cadence is documented three ways: 10 min (FAQ, setup page), 15 min (EID pages), "15 min goal, 15–30 actual" (Services and Jobs Catalog). Deck should say "about every 10–15 minutes".
- Per-customer code is the main maintenance burden: 28 customers have hard-coded logic in NetSuite.cs; raw company IDs (18095, 20172, 18395, 11024, 18698, 19518, 18748, 18565) are undocumented (Per-Customer Customization Map, Risk Areas). Newer customizations go through IntegrationMappings instead (NOMAI-4xx/5xx "custom DB mapping" tickets), which is the right direction for a reusable story.
- Most open NetSuite tickets are custom field mapping asks (Global-Pak, Avocado, Explore Scientific, Forma Brands, Suja, Ace Mart, Optimal). That is a sales point (mapping is routine) and a delivery cost (each needs a ticket).
- Support pattern Aug–Oct 2026: "Order Not Found" on IF import (Urban Surfaces, Contec, Total Home Supply, Nice, Labrada, Associated Packaging) and "data not exporting to NetSuite" (Agri Drain, Everflow SPP locations, Urban Surfaces, Mayne). Health Check Log ties many of these to BBL-6197. Worth a rep talking point about health monitoring, not a public claim.
- WWEX (Worldwide Express) resells FreightPOP to several NetSuite tenants (Explore Scientific, Optimal Max, Ace Mart, Bruegmann) — Jira customer shows "19734 - WWEX" even though the tenant is separate.
- Three Snowflake NetSuite tenants have no shipments since 2025 (Renvu, Yo Mama's, TDBBS Jan 2026); Us Water Systems last shipped June 2026. Treat as unknown, not live.
- McCollister's (AS400 → NetSuite + FreightPOP) and Fictiv (NetSuite Native with FP-app fallback) are implementing; Valentra uses NetSuite Native (Tanker equipment type) but is not in the 12-month snapshot.

## Platform findings worth a product/marketing decision
- Deck lede's "1,500+ supported connections" is unsupported by anything in the records.
- "On-prem agent" should be "FreightPOP VPN connector / on-prem SQL" — that is the documented mechanism (ERP Integrations page, Laminate Technology SOP, FP-6626 error text).
- External API has no invoice read (BF-11524, Fenner Dunlop ask) and no product GET (Draper, Freshdesk 69646). Do not imply full read coverage.
- Rate limit: internal page says 300 calls/min per account; API Gateway page floats a 30/min standard plan. Don't publish a number.
- SOAP end-of-life risk: NOMAI-350 (New) notes SuiteTalk SOAP will eventually be discontinued; the WSDL in use is 2024.2 while customers are on 2025.2/2026.1.
- Health-check practice exists (daily ERP Health Check Log with severity, Datadog "ERPOrderImport running >10 min" alert, Integration Transaction Notification emails) but is manual; NOMAI-286 is the monitor task in progress.

### group-b-notes.md

# Group B notes — Acumatica, Sage, SYSPRO, SAP, Rootstock, Odoo, Fishbowl

## Cross-system observations

1. **Snowflake blind spot.** The channel snapshot only carries INTEGRATIONTYPE codes 1/2/4/5/6/7. Not one Acumatica tenant (General Data, Blackburn, D.P. Wagner, Tobacco Rag, Sonco, Ferris, Buffalo Seal, Shaw Ross…), nor Mark Andy (Rootstock), nor the on-prem SYSPRO shops (Alley-Cassetty, Natoli, Laminate) appears in it. The Acumatica/Rootstock plug-n-play and the VPN-connector SQL integrations must sit under a code the snapshot excluded. Any "shipments through Acumatica" number for the deck has to come from a fresh query, not this file.
2. **Only two of seven are productised.** Acumatica has a real connector (Plug N Play + native plug-in) with field maps, known-issues page, demo site and release-tracked plug-in versions. Rootstock has a documented connector but one customer. Sage, SYSPRO and SAP are each a family of bespoke builds (SOAP, SQL/VPN, EDI, SFTP, customer-built API) stitched together by the configurable ERP framework. Odoo and Fishbowl have nothing of FreightPOP's own.
3. **Partner-led selling matters for three cards.** Acumatica, Sage X3 and SAP are "Core Four" partners with no-outreach rules; Acumatica and Sage X3 are 100% VAR-sold (CBIZ, i-Tech Support, Net at Work/Ariox, Martin & Associates show up as the VARs on live accounts). The deck's public cards should not imply direct partnership mechanics.
4. **"AP export" is only proven for Acumatica and Sage 300.** The SAP card currently says freight invoices land in AP; nothing in the records backs that. Rootstock's AP goes to Oracle, SYSPRO's is a nightly CSV to SFTP.
5. **Write-back is the support hotspot everywhere.** The recurring 2025–26 tickets across Acumatica (Blackburn, General Data), Rootstock (Mark Andy), SYSPRO (Alley-Cassetty dispatch) and Sage X3 (Atlas Filtri) are exports that say "success" but do not land, or confirms that do not fire. BBL-6221 (per-request export logging) is the engineering response and is worth mentioning internally.
6. **WMS pull-through.** D.P. Wagner (Acumatica) and Alley-Cassetty (SYSPRO) are driving ERP write-backs out of FreightPOP WMS: inventory adjustments, RTV, PO receipts, dispatch notes, BOM routing fields. These are the first "ERP + WMS" stories and are still in flight (NOMAI-115/249/293/114, NOMAI-16).
7. **Indirect integrations inflate logo counts.** Sun Mountain, MEC and Professional Plastics are SYSPRO shops but reach FreightPOP only through ShipLink; CGS Mule (Odoo) and Marco Group (Sage 100) are customer/partner-built external API users. Count them as external API, not as ERP connectors.

## Surprises

- Shaw Ross is in both the SAP and Acumatica piles: SAP feeds EDI today, and the SOP says they are moving shipments and POs to the Acumatica import (BBL-5342/5763/5300).
- Tenant 19692 is "TIG Distributing" in Jira/Confluence but "Exodus Direct, LLC" in Snowflake (95,680 external-api shipments). TIG is Exodus's sister company — the Sage X3 attribution needs a human check before anyone quotes that volume.
- National Public Seating's Snowflake ERP comment says "VAI AS/400" while Confluence/Jira plan an SAP B1 integration since 2021 — never confirmed live.
- A seven-story "SAP 4Hana" epic (NOMAI-76..83) has sat in New since Sep 2025; the scoping ticket's customer (Voomi Supply/Ascenso) lists FLXPoint/VIN as the system, so even the target ERP is unclear.
- Fictiv was an Odoo/EasyPost/Mulesoft prospect in 2022 and now ships on the NetSuite plug-in.
- Wintersteiger quietly switched from SQL pull to pushing orders over the external API in July 2026 — a pattern worth offering other SYSPRO/VPN-connector accounts.
- The internal "List of ERPs which are not integrated" page still cites an Odoo 6.1 API doc.

## Suggested deck actions

- Acumatica: keep as the flagship after NetSuite; remove the printer-mapping outflow; add PO "import only" and the limits list to internal scope.
- Sage: rename editions to X3 / 300 / 100 with their real methods; soften "both ways" to the fields actually written.
- SYSPRO and Rootstock: fill the empty cards with the evidence-based flows above; mark both as custom/single-pattern internally.
- SAP: drop the AP claim; mark S/4HANA connector and B1 as roadmap/documented.
- Odoo, Fishbowl: do not add cards; answer as "external API / file import" on request.

### group-c-notes.md

# Group C notes — dynamics, epicor, infor, made2manage, iqms, plex, macola, oracle-erp, lighthouse-syteline, fox-erp, erp-one, tharstern, four51, invetrak, direct-response

## Headline
- Only four of the fifteen are real, multi-customer integrations: **Epicor** (P21 heavy, Kinetic customer-specific), **Dynamics** (four editions, four connection styles), **Infor** (SyteLine/Visual SQL, CSD API, M3 API) and **Tharstern** (documented API, one live reference). Oracle is three one-off custom builds (JDE, Fusion x2). The rest are single-customer SQL mappings or empty catalog entries.
- Six cards have **no or false-positive evidence** and should be hidden or marked request-only: fox-erp, invetrak ("never fully tested" per its own guide), direct-response (templated page, no customer), lighthouse-syteline (mislabeled: Lighthouse is a customer, SyteLine is Infor), made2manage (all hits are WWEX "M2M" API noise), plex (Tofurky manual upload, not an integration).
- made2manage, iqms, plex and macola have no deck card today. Only iqms (DelmiaWorks, Monoflo in flight) might merit an internal mention later.

## Cross-system observations
- **Dynamics editions matter.** BC = API (custom BC API at api.businesscentral.dynamics.com, plus an SFTP CSV variant and AP export); F&O = OData entities (Flair, still iterating mappings); NAV = on-prem SQL (NRP Jones, Impex); GP = on-prem SQL (five SOPs, oldest cohort). No record mentions AppSource, AX, or "native". The current card's AppSource/certified/bilateral claims are unsupported by these sources.
- **Epicor is really two products.** P21 has a repeatable plug-and-play (OData views in, /uiserver0/api/v2/transaction out, AP vouchers) plus on-prem SQL and SFTP AP variants. Kinetic has no packaged connector: Trystar (REST middleware, Erp.BO services, AP groups), ATX (BAQ), Vira (stored procedure), Leer/Nordic Ice/Winholt (WWEX) are each bespoke. The "Trystar Epicor Integration" page is customer code (Trystar.cs/TrystarExport.cs), last updated 2023-10-13; its sample data (Garden State Ovens, EPIC06) is Epicor demo content, not a customer.
- **WWEX is a channel, not a customer.** Jira `customer` = "19734 - WWEX" on NRP Jones (Navision), Tri-West (M3), Leer, Nordic Ice, Winholt, WENDT, Lindfast threads. End-customer names had to be read from summaries. Any customer count by Jira field undercounts.
- **ShipLink accounts consume Epicor AP through FreightPOP** (Calderon Textiles, Pewag x2, Wallingford's): FreightPOP built only the AP/GL leg; shipping runs in ShipLink. They show in Snowflake under external-api, not an Epicor channel.
- **Snowflake rarely corroborates these systems.** Almost no Dynamics/Epicor/Infor/Oracle customer appears in the snapshot by name (exceptions: Flair, Impex, 1Concier, Kinter, Calderon, Pewag, Wallingford's, Draper). Either on-prem connector traffic is not captured by INTEGRATIONTYPE≠0 or names differ. Live status for SOP-only accounts is therefore "unknown" throughout.
- **Migrations seen in records:** Lindfast -> P21 (Jan 2026), Draper MacPac -> Kinetic Cloud, Kelsan Infor SXE -> P21 (Apr 2024), CTC Global GP -> NetSuite, Best Sanitizers IQMS -> NetSuite, a P21 on-prem -> Epicor Cloud migration that broke exports (FD 55145/55124, Sep 2025), Shaw raws -> Acumatica. Reps should ask about planned ERP moves.
- **Competitive note:** NetSuite Closed Lost Deal Analysis records Royal Bag lost in an RFP because "another TMS offered a turnkey P21 integration that scored higher" — relevant given how custom our P21 onboarding still is.
- **Support load concentrates on write-back.** Sep–Oct 2026 Freshdesk: Tarantin P21 write-back failing, ITP P21 rewrite issue, Trystar daily AP groups stopped 09/30, Genesis Attachments SyteLine freight/tracking not pushing, Suttle-Straus third-party shipments not exporting to Tharstern, Star Industries BC AP export (BF-11752). Worth a known-issues line for reps.
- **Platform facts reused by many of these:** ERPOrderImport batch service lists supported ERPs (NetSuite, Fulfil, Brightpearl, Epicor, SAP, CSI, EssentialHub, DynamicBusinessCentral, configurable on-prem and plug-and-play) and runs ~every 15 min; Tharstern has a dedicated per-minute lambda hard-coded to Suttle-Straus; Four51 depends on a listener that may live on api.freightpop.com, which TT-2868 proposes to retire. Belongs in _platform.json.

## Data-quality warnings for whoever merges
- Regex noise is heavy in small files: `\bnav\b` matched the navigation bar (dynamics), `m2m` matched WWEX API IDs (made2manage), `plex` matched "Printer Connector" text, `fox` matched nothing relevant. _summary.json customer counts for these are unreliable.
- Dynamics had zero Freshdesk matches, which is implausible for a live product; support history for BC/F&O/GP customers is simply not in this export.
- Freshdesk descriptions are empty for epicor/oracle/tharstern/four51 exports, so ticket subjects are the only signal.
- Deck id mapping: infor.json -> `infor-erp` (and partly `infor-wms`); lighthouse-syteline.json recommends deleting that card; made2manage/iqms/plex/macola have no card.

### group-d-notes.md

# Group D notes — QuickBooks, EDI, Cubiscan, ShipLink, Extensiv, VeraCore, Brightpearl, Logiwa, ShipHero, SnapFulfil, Katana, Cin7, Zoho, MuleSoft, Boomi, Celigo

## Deck id mapping
- `edi` has no deck card; the deck splits it into `sps-commerce`, `truecommerce`, `cleo`. Proposal written as `proposals/edi.json` with a `deckIds` field.
- `zoho` → deck `zoho-inventory`. `extensiv`, `katana`, `cin7` have no deck card (Extensiv is worth adding; the other two are not).

## Evidence strength, roughly ranked
1. **QuickBooks** — best-documented in the group (10+ EID pages, setup/AP/field mapping, known issues), five Desktop tenants in Snowflake. Online edition is documented but no QBO tenant is coded in Snowflake.
2. **Cubiscan** — strong docs (Real-Time vs Qbit-DB), active Jira stream, four live customers; Kyocera drives most tickets.
3. **VeraCore / Brightpearl / Zoho** — solid FAQ-style docs with field mappings; customers known from SOPs and tickets, not Snowflake.
4. **EDI** — many tickets and SOP pages, almost no reference documentation for carrier 210/214; SPS flow is well documented via NetSuite.
5. **ShipLink / Extensiv** — ShipLink is partner-heavy; Extensiv is new (2025–26) with one customer.
6. **Logiwa, ShipHero** — built, documented thinly, no active tenant (both effectively churned).
7. **MuleSoft, Boomi, Celigo, SnapFulfil, Katana, Cin7** — little to nothing.

## Cross-system observations
- **iPaaS cards overstate.** MuleSoft, Boomi and Celigo cards all say "iPaaS connector" and "event-driven flows on shipment milestones". Records show only customers' own iPaaS calling the FreightPOP External API (Proterra via Boomi is the one real case). No webhook/event evidence in these files. Recommend depth `api`, drop connector/event wording, hide Celigo.
- **Three "live, visible" WMS cards are empty and unproven**: SnapFulfil (menu entry only), ShipHero (one customer-specific import-only Lambda, superseded by NetSuite in 2024), Logiwa (EcomHalo churned). Suggest status `request` or hidden for SnapFulfil/ShipHero; Logiwa optional.
- **ShipLink partner vs system**: ~110 of 120 Freshdesk tickets are ShipLink support (Amy Duren) acting for shared customers on carrier credentials, rates, PRO books and printing. The "integration" is ShipLink consuming FreightPOP's External API with per-customer API gateway keys and embedding the FreightPOP UI. Snowflake confirms the ShipLink book as External API tenants (Calderon 12.6k, Eagle 6.3k, Coxreels 5.5k, Rudolph Bros 3.1k, Peak 2.8k…). FreightPOP separately built AP exports for ShipLink's P21 customers (Calderon SFTP CSV, Pewag plug n play) and is building a P21 on-prem integration to replace ShipLink for Berk Brands (NOMAI-234).
- **QuickBooks ↔ Zoho**: Blades Group (QBD tenant, 5.6k shipments) is migrating to Zoho Books/Inventory in 2026 with Direct Reach; sandbox quoted at 5 h × $225. Same customer generated the TECH-419 Web Connector write-back thread — expect churn from the QBD list.
- **NAKS** appears in both `quickbooks-desktop` (last shipment Oct 2025) and `erp-plugin-netsuite` (current) — moved to NetSuite.
- **Hollywood Racks** is the lone `type-6` Snowflake tenant; its SOP says QuickBooks for LTL and Shopify for parcel — type 6 may be a QuickBooks/Shopify variant.
- **EDI is really carrier EDI.** 210 invoice intake into Freight Invoice Audit is the dominant use case, with a continuous queue of new carrier connections (Global-Pak alone opened nine in Sep 2026). 856 ASNs are not sent by FreightPOP; it writes SPS package records into NetSuite/Acumatica/BC. TrueCommerce = one pending 945. Cleo = FedEx Freight's own VAN migration, not a FreightPOP integration.
- **Cubiscan outFlows on the current card are marketing**, not evidence ("certified dims", "rate you quote is the rate you're billed"). The RCA shows freight class was computed for the first package only. Data is one-way into FreightPOP; FreightPOP prints LPN labels the station scans.
- **FreightSnap** tickets live in cubiscan.json (NAKS); it is a separate dimensioner connection and already has its own deck card.
- **Order Import Tech Debt (BBL-6056)** and the Mar 2026 BBL RCA note integrations are the top bug source (unmapped legacy fields, parallel processing, un-conditioned customizations) — relevant caveat for every card in this group.

## Surprises
- Partner Activation Playbook (2023) named ShipLink the only active integrated partner and Brightpearl a channel partner; Cubiscan was "TBD (possibly)".
- Kyocera's Cubiscan Contour needs images for their audit process; Tile Redi wants to skip scanning entirely with SKU dims + auto pack (FD#60562).
- Fenner Dunlop asked for an External API to pull approved audit invoices (BF-11524) — first programmatic read of Audit data.

### group-e-notes.md

# Group E notes — e-commerce, CRM, ELD/telematics, visibility (12 systems)

Files: shopify, magento (deck id adobe-commerce), bigcommerce, woocommerce, amazon, salesforce, hubspot, samsara, gomotive, trimble, tive, fictiv.

## Cross-system observations

1. **The three e-commerce cards share one copied blurb and it is wrong for two of them.** Shopify is the only platform with a FreightPOP-built order import + fulfillment write-back ("Plug N Play": PAID orders every 15 min, tracking/carrier/cost back). BigCommerce and WooCommerce are checkout-rating plugins; the BigCommerce doc says outright "Orders do not automatically flow into FreightPOP." Order import for WooCommerce/Magento only ever existed via Essential Hub (EHub), whose page is titled "NOT USING ANYMORE".
2. **Shopify is batch, not real-time.** Deck says "Real-time" and "as they're placed"; docs say 15-minute batch, PAID only. Initial-history window conflicts (180 days in Confluence vs "standard 30" in NOMAI-545).
3. **Two Shopify products exist**: the plug-n-play connector (order sync) and the App Store app (shopping-cart rates). Contracts bundle them ("pushing and pulling of order data along with shopping cart rates", 5 hours setup).
4. **CRM cards (Salesforce, HubSpot) have no native integration behind them.** Salesforce usage is customer/agency-built on the external API (NAKS via Black Iron Group; Proline via open API). HubSpot evidence is 100% FreightPOP's own CRM plumbing (BF-9183 churn/volume push, nightly contact sync). Recommend Salesforce -> "request / via API", HubSpot -> hide or "request".
5. **ELD integrations are location-only.** Across Samsara, Go Motive, Trimble and Fleet Complete the records show vehicle lists + location history pulled hourly/every 15 min and FreightPOP-side geofence milestones (TT-7799). No HOS, driver, fuel or diagnostics data anywhere — do not put "HOS" on the cards. The one write-back is Samsara route push (POST/PATCH /fleet/routes), built for BayWa r.e. in 2026 with SO numbers in stop notes and a return-to-origin stop.
6. **Samsara has two architectures**: carrier-level (shipper's third-party carrier shares its API key via a "Request Access" email; Sunkist) and fleet-level (shipper's own token; BayWa). The RCA page notes the first Sunkist release missed requirements and needed expedited cleanup — worth knowing before promising timelines.
7. **Trimble is not live-grade.** TT-7805 is Done but the engineering page says "in development", Part 2 (BF-9456) is an unscoped template, no geofencing, IP-whitelisted API with 1-minute cooldown. Card currently says live; suggest roadmap/implementing.
8. **Go Motive's recurring breakage is an auth UX bug** (Save on the settings page re-triggers OAuth). Fix BF-11911 is in test (Sprint 142). Also: "Motive Energy Systems" in the records is a QuickBooks customer, not a Go Motive user — a regex false positive.
9. **Amazon is three things, none in the local extract.** (a) Amazon Direct Fulfillment (ATS) — built, live (Mayne, Vita), SP-API labels/confirmation/tracking, SCAC back to NetSuite for ASNs; (b) Amazon Parcel carrier (ROTS-103, documents released Aug 2026); (c) Amazon LTL/FTL carrier epics — TT-6341 Closed with children still saying "Waiting on ROTS-92", TT-7231 empty. Amazon (19469) is itself a shipper customer; Thrasio is a NetSuite customer (custom XPO Connect flag). No marketplace order import exists.
10. **Fictiv is a customer, not a system** (NetSuite SuiteApp onboarding 2026, 619 shipments/12m). Suggest folding into NetSuite customers; no card.

## Surprises / flags for reps

- Shopify tenants (ePackageSupply, Trampolines.com) are absent from the Snowflake integration snapshot, so Snowflake cannot size the Shopify channel. Fleet/ELD shipments are likewise not integration-typed.
- Blackburn (BigCommerce via Proof Digital) has a year of "no rates / sandbox vs production mismatch" tickets; Complete Packaging has the same pattern (NOMAI-612 open). Checkout-rating depends entirely on FreightPOP catalog/AutoCalc setup — a known onboarding trap.
- Beacon commerce (FD 68611) and William Lawton (FD 69154) are inbound prospects asking specifically for Shopify-LTL-at-checkout without own carrier accounts and for Samsara-integrated TMS respectively.
- Evidence marked "live Jira" / "live Confluence" in amazon.json and tive.json came from MCP lookups, not the local JSON, because the local extract had nothing (amazon) or one chunk (Tive). Everything else is from erp-rag files.
- Shared scratchpad hazard: another agent overwrote `scratchpad/dump.py` mid-run; I switched to `scratchpad/groupE/dumpE.py`.

## Method and limits

- Sources: Supabase `jira_tickets` (6,333), `freshdesk_tickets` (26,882), `confluence_embeddings` (7,456 chunks; 35 pages read in full), Snowflake `ORDERSHIPMENTS × COMPANIES` (12 months to 2026-10-07, ≥20 shipments, test tenants removed). Dump script: FPPricer `server/scripts/integrations-rag-dump.mjs`.
- Snowflake `INTEGRATIONTYPE` codes are inferred from column patterns (7 = NetSuite SuiteApp tenants, 5 = External API, 1 = QuickBooks Desktop, 2/4/6 unlabelled). Acumatica, Shopify, SYSPRO and fleet tenants are not integration-typed there, so their customer lists come from tickets only.
- Jira `customer` is often the reseller (WWEX, ShipLink); end customers were read from summaries where possible.
- Keyword matching: `infor` collides with "information" and `motive`/`m2m` have false positives; analysts filtered these by hand.
- Nothing here was verified with engineering. Treat endpoint names, cadences and rate limits as internal notes, not commitments.
