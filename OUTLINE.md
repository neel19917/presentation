# FreightPOP TMS Deck — Content Outline

> **For marketing:** edit any text AFTER a `**Label:**` or list dash — that copy
> flows straight back into the presentation. Do not delete or reword the
> heading lines (`##`, `###`) or the bold labels themselves; the regenerator
> uses them as anchors. Bullets can be added/removed freely.
>
> **To regenerate the deck after editing:**
> `node tools/outline.js apply && npm run bundle`
> then reload the presentation (R in the presenter view).

- **Four step labels (every module):** Problem · Benefit · Live Demo · Validation

# TMS — Transportation Management

## TMS 01 — Shipping Rules Engine
- **Title line 1:** Shipping
- **Title line 2:** Rules Engine
- **Tagline:** Codify shipping logic into rules that run themselves
### Problem
- **Heading:** Every rep ships by their own playbook.
- **Body:** Which carrier for hazmat, when a guaranteed service is required, which account to bill — that logic lives in people's heads. New hires guess, veterans improvise, and compliance becomes a hope instead of a guarantee.
- **Quote:** Each of our sites had its own way of choosing carriers. No two did it the same.
- **Quote by:** — Operations Director, Industrial
### Benefit
- **Heading:** Turn tribal knowledge into rules that fire automatically.
- Route by weight, value, destination, hazmat, customer or SLA
- Force guaranteed service on critical lanes; block non-compliant carriers
- Apply the right GL code and billing account every time
- Rules run at quote time — no training, no memory required
- Change a rule once and it applies company-wide instantly
### Live Demo
- **Caption:** A hazmat order auto-routes to the only compliant carrier — no human decision.
### Validation
- **Stat:** 100%
- **Stat label:** rule compliance, every site
- **Proof:** Policy is enforced on every shipment automatically — no training, no memory, no exceptions.

## TMS 02 — Carrier Management
- **Title line 1:** Carrier
- **Title line 2:** Management
- **Tagline:** Every carrier and account, centrally controlled
### Problem
- **Heading:** Your carrier network lives in a spreadsheet — and someone's inbox.
- **Body:** Accounts, credentials, contracted rates and service rules are scattered across files and people. Onboarding a carrier is a project, and auditing who got used and why is nearly impossible.
- **Quote:** I send requests to four or five brokers every time I get a load, and they come back with rates.
- **Quote by:** — Logistics Manager, Food & Bev
### Benefit
- **Heading:** Run every carrier and account from one place.
- 1,500+ pre-built carrier integrations — parcel, LTL, FTL, ocean and air
- Store contracted rates, credentials and service rules centrally
- Add or swap carriers without an EDI project or IT ticket
- Control which carriers each site, user or lane can use
- One source of truth for spend and performance by carrier
### Live Demo
- **Caption:** Add a regional LTL carrier and turn it live across every site in minutes.
### Validation
- **Stat:** 1,500+
- **Stat label:** pre-built carrier integrations
- **Proof:** No per-carrier build and no EDI project. G2 reviewers describe comparing every carrier partner in a single window instead of managing a dozen logins. (Aaron A., Sr. Manager, Transportation · G2 review)

## TMS 03 — Rate Shopping
- **Title line 1:** Rate
- **Title line 2:** Shopping
- **Tagline:** Compare every carrier and mode in one screen
- **AI callout:** AI Accessorial Agent flags likely-missing accessorials — liftgate, residential, inside delivery — with a confidence score and address evidence, before the rate comes back wrong.
### Problem
- **Heading:** Your team visits every carrier portal. One at a time.
- **Body:** Open FedEx, then UPS, then the LTL site. Screenshot the rates, paste them to a spreadsheet, pick the cheapest, then go back to book — on every single shipment.
- **Quote:** We were logging into six different sites just to compare a single shipment.
- **Quote by:** — Shipping Lead, Manufacturing
### Benefit
- **Heading:** Compare every carrier and every mode in one screen.
- Shop parcel, LTL, FTL, ocean, rail and air simultaneously
- Contracted, spot and carrier rules in one view — no logins
- Select and book in a single action — no portal hopping
- Carrier rules applied automatically (hazmat, liftgate, residential)
- Your negotiated rates — FreightPOP doesn't mark them up
### Live Demo
- **Caption:** Instead of six carrier portals, every rate lands in one screen — book in under a minute.
### Validation
- **Stat:** Up to 30%
- **Stat label:** savings on freight spend
- **Proof:** “We have saved tens of thousands of dollars this year alone.” — Verified User in Consumer Goods, G2 review

## TMS 04 — Shipment Consolidation
- **Title line 1:** Shipment
- **Title line 2:** Consolidation
- **Tagline:** Combine orders into fewer, fuller loads
### Problem
- **Heading:** Orders ship the moment they drop — one box at a time.
- **Body:** Same-day, same-destination orders leave as separate parcels or half-empty LTL loads. You pay minimums and per-shipment fees over and over for freight that could have moved together.
- **Quote:** We were sending three separate LTL shipments to the same city in one week.
- **Quote by:** — Distribution Manager, Wholesale
### Benefit
- **Heading:** Combine orders into fewer, fuller loads — automatically.
- Group orders by destination, lane, ship date or customer
- Flag parcel orders that should move as one LTL shipment
- Pool LTL into volume or FTL when it's cheaper
- Honor delivery windows while waiting to consolidate
- See the savings of each consolidation before you commit
### Live Demo
- **Caption:** Five parcels to one metro collapse into a single LTL booking.
### Validation
- **Stat:** 1 load
- **Stat label:** instead of several, on poolable lanes
- **Proof:** Pay one minimum instead of five — on freight that was always headed the same way.

## TMS 05 — Multi-Leg Shipments
- **Title line 1:** Multi-Leg
- **Title line 2:** Shipments
- **Tagline:** Plan and track door-to-door, every leg
- **AI callout:** Predictive ETAs and ocean Last Free Date on every leg; the exception agent surfaces slips before they turn into detention or demurrage.
### Problem
- **Heading:** Hand-offs are where shipments go dark.
- **Body:** A load that moves drayage to linehaul to final mile touches multiple carriers and systems. Every hand-off is a re-key, a phone call, and a blind spot the moment something slips.
- **Quote:** Once it leaves the port we're calling around just to find out where it is.
- **Quote by:** — Import Manager, Retail
### Benefit
- **Heading:** Plan and track door-to-door across every leg.
- Build multi-leg moves — drayage, linehaul, final mile — as one shipment
- Assign the right carrier and rate to each leg
- Unified tracking and milestones across all legs and carriers
- Documents and costs roll up to a single shipment record
- An exception on any leg surfaces in one place
### Live Demo
- **Caption:** Track a port-to-door move across three carriers on one timeline.
### Validation
- **Stat:** 1 record
- **Stat label:** for every leg, every carrier
- **Proof:** One shipment record spans drayage, linehaul and final mile — no hand-off blind spots.

## TMS 06 — Route Optimization
- **Title line 1:** Route
- **Title line 2:** Optimization
- **Tagline:** Fewer miles, tighter windows, lower cost
- **AI callout:** AI cost-model optimization — pin a stop and re-run to compare routes and land on the cheapest compliant plan in seconds.
### Problem
- **Heading:** Routes are built by whoever knows the territory.
- **Body:** Stop sequencing and load assignment ride on tribal knowledge. Trucks run extra miles, deadhead, and miss the tighter delivery windows that better planning would have caught.
- **Quote:** Our routing is basically whatever the dispatcher remembers works.
- **Quote by:** — Transportation Supervisor, Food
### Benefit
- **Heading:** Optimize stops, loads and lanes automatically.
- Sequence multi-stop routes for minimum miles and time
- Respect delivery windows, vehicle capacity and driver hours
- Balance loads across available equipment
- Compare optimized vs. manual plans side by side
- Feed optimized routes straight into dispatch
### Live Demo
- **Caption:** From raw orders to proof of delivery — watch the full flow, step by step.
### Validation
- **Stat:** 40%
- **Stat label:** average increase in on-time deliveries
- **Proof:** Smarter sequencing means less fuel, more stops per truck, and delivery windows you actually hit.

## TMS 07 — Batch Shipping
- **Title line 1:** Batch
- **Title line 2:** Shipping
- **Tagline:** Rate, label and book hundreds at once
### Problem
- **Heading:** Peak days mean one label at a time.
- **Body:** When volume spikes, your team rate-shops, labels and books orders individually — the same clicks, hundreds of times. Throughput is capped by headcount, and errors climb with fatigue.
- **Quote:** On a big release day we're just printing labels for hours.
- **Quote by:** — Fulfillment Lead, E-commerce
### Benefit
- **Heading:** Rate, label and book hundreds of orders at once.
- Select a batch and rate-shop every order simultaneously
- Generate all labels and documents in a single run
- Apply shipping rules across the whole batch automatically
- Catch address and compliance errors before they ship
- Hand the entire batch to the carrier in one action
### Live Demo
- **Caption:** An entire batch rate-shopped, labeled and booked in a single pass.
### Validation
- **Stat:** 1 click
- **Stat label:** to book and dispatch an entire batch
- **Proof:** Throughput scales with order volume, not headcount. One G2 reviewer bulk-quotes hundreds of locations from a single spreadsheet and reports it saved him days of work. (Andrew B., Vice President · G2 review)

## TMS 08 — Auto Dispatch
- **Title line 1:** Auto
- **Title line 2:** Dispatch
- **Tagline:** Qualifying orders book themselves
### Problem
- **Heading:** Booking is a queue your team works by hand.
- **Body:** Every approved order waits for someone to pick the carrier, confirm the rate and tender the load. The work adds no value — but the delay and the typos do.
- **Quote:** There's always a stack of orders waiting for someone to book them.
- **Quote by:** — Logistics Coordinator, Manufacturing
### Benefit
- **Heading:** Let qualifying orders book themselves.
- Auto-select carrier and rate using your rules engine
- Tender, confirm and generate documents with no human touch
- Set guardrails — only orders that meet criteria auto-dispatch
- Exceptions route to a person; everything else just ships
- Tracking and costs flow back to your systems automatically
### Live Demo
- **Caption:** An approved order books, tenders and labels itself end to end.
### Validation
- **Stat:** 95%
- **Stat label:** reduction in shipment processing time
- **Proof:** “It makes the complex simple.” — Kenny K., Supply Chain Manager, Medical Devices, Capterra review. Qualifying orders book themselves; your team manages only the exceptions.

## TMS 09 — Dock Scheduling
- **Title line 1:** Dock
- **Title line 2:** Scheduling
- **Tagline:** Self-service dock appointments
### Problem
- **Heading:** The dock runs on phone calls and a whiteboard.
- **Body:** Carriers arrive whenever, the yard backs up, and detention charges pile on while labor sits idle or scrambles. Nobody upstream knows what's hitting the dock today.
- **Quote:** Trucks show up unannounced and we eat the detention.
- **Quote by:** — Warehouse Manager, CPG
### Benefit
- **Heading:** Give carriers self-service dock appointments.
- Carriers book dock slots against your real capacity online
- Level appointments to your labor and door availability
- Tie appointments to inbound and outbound shipments automatically
- Cut detention with predictable, enforced arrival windows
- Give the floor a live view of what's arriving and when
### Live Demo
- **Caption:** A carrier self-books a dock slot that lands on the floor's schedule.
### Validation
- **Stat:** 1 calendar
- **Stat label:** for carriers, docks and labor
- **Proof:** Predictable arrival windows level your labor and stop surprise detention charges.

# WMS — Warehouse Management

## WMS HUB — Warehouse Management
- **Kicker:** Capability Library
- **Intro:** A warehouse layer built natively into FreightPOP — receiving, picking, packing and inventory share one record with your shipping, so stock and freight never fall out of sync.
- **Card 01:** Warehouse & Bin Setup — Configure multiple warehouses and bins (Standard, Overflow, Picking), then enable License Plates, Lot IDs, lot expiration and up to three custom identifiers per site.
- **Card 02:** Receiving — Import POs from TMS inbound, capture carrier, PRO, dock and arrival, then allocate to bins with license-plate and lot tracking. Approval posts a purchase receipt to your ERP.
- **Card 03:** Picking — Turn open sales orders into picking tickets at header or line level. Mobile-first scan or License-Plate picking with take-full-bin, splits and Ready-to-Pick → Pick Completed status.
- **Card 04:** Pick & Pack — Scan-to-verify packing into packages, scale-driven weights and saved package types, with close-pack control and documents printed to match what was packed.
- **Card 05:** Inventory & Bin Transfers — Read-only inventory across every warehouse with cross-field search and Excel export, plus bin-to-bin moves — single-item splits or many-to-one — with license-plate support.

## WMS 01 — Warehouse & Bin Setup
- **Tagline:** Model the floor you actually run
### Problem
- **Heading:** The system's warehouse isn't your warehouse.
- **Body:** Bins, lots and license plates exist on the floor but not in the software. When the digital layout doesn't match the physical one, every downstream scan, count and pick inherits the gap.
- **Quote:** Our system says the part is 'in the warehouse.' Which shelf? Nobody knows.
- **Quote by:** — Inventory Manager, Industrial Distribution
### Benefit
- **Heading:** Configure a digital layout that mirrors the floor.
- Set up multiple warehouses with Standard, Overflow and Picking bins
- Enable License Plates and Lot IDs with lot expiration
- Add up to three custom identifiers per site
- Match each site's real rack-and-bin structure, not a generic map
- One shared record with shipping, so stock and freight stay in sync
### Live Demo
- **Caption:** A new site goes live — warehouses, bins and license plates configured to match the floor.
### Validation
- **Stat:** 1:1
- **Stat label:** digital layout to physical floor
- **Proof:** When bins, lots and license plates mirror reality, every downstream scan means something.

## WMS 02 — Receiving
- **Tagline:** From dock door to ERP receipt in one flow
### Problem
- **Heading:** Inbound runs on a clipboard.
- **Body:** POs get re-keyed at the dock, paperwork waits on a desk, and the ERP finds out about received stock days later. Inventory is always a step behind what's actually on the shelf.
- **Quote:** Receiving paperwork sat on a desk until Friday, so inventory was always behind.
- **Quote by:** — Warehouse Supervisor, CPG
### Benefit
- **Heading:** Receive against the PO and post it the moment it lands.
- Import POs straight from TMS inbound — no re-keying
- Capture carrier, PRO, dock and arrival at the door
- Allocate to bins with license-plate and lot tracking
- Catch discrepancies at the dock, not at month-end
- Approval posts a purchase receipt to your ERP automatically
### Live Demo
- **Caption:** An inbound PO is received, allocated to bins and posted to the ERP in one flow.
### Validation
- **Stat:** 1 flow
- **Stat label:** from dock door to ERP receipt
- **Proof:** Receiving posts the purchase receipt the moment it's approved — inventory and finance see the same truth.

## WMS 03 — Picking
- **Tagline:** Scan-verified picks from open sales orders
### Problem
- **Heading:** Pickers walk the aisles with a printout.
- **Body:** Paper pick lists can't verify anything. Wrong items and short picks surface at packing — or at the customer — and nobody upstream can see what's picked and what's still waiting.
- **Quote:** Pickers walked the aisles with a printout, and we found the mistakes at packing.
- **Quote by:** — Fulfillment Manager, E-commerce
### Benefit
- **Heading:** Turn open orders into scan-verified picking tickets.
- Generate picking tickets at header or line level
- Mobile-first scan picking or License-Plate picking
- Take-full-bin and split picks without workarounds
- Live Ready-to-Pick → Pick Completed status for every ticket
- A wrong item can't be scanned — errors stop at the shelf
### Live Demo
- **Caption:** A sales order becomes a picking ticket and is scan-picked to completion on mobile.
### Validation
- **Stat:** Scan-verified
- **Stat label:** every pick, before it reaches packing
- **Proof:** Errors surface at the shelf — not at the customer's dock.

## WMS 04 — Pick & Pack
- **Tagline:** Documents that match what was packed
### Problem
- **Heading:** The paperwork and the pallet tell different stories.
- **Body:** Cartons are guessed, weights are estimated, and documents are printed before the freight is final. When the BOL doesn't match the pallet, you pay for it in reclasses and disputes.
- **Quote:** The BOL said one thing and the pallet said another.
- **Quote by:** — Shipping Lead, Wholesale
### Benefit
- **Heading:** Pack by scan, weigh by scale, print to match.
- Scan-to-verify items into each package
- Scale-driven weights captured as you pack
- Saved package types for repeatable cartonization
- Close-pack control so nothing ships half-verified
- Documents print to match exactly what was packed
### Live Demo
- **Caption:** Items scan into cartons, the scale writes the weight, and matching docs print.
### Validation
- **Stat:** Exact match
- **Stat label:** documents to the physical pallet
- **Proof:** What ships is what was scanned — the paperwork can't drift from the freight.

## WMS 05 — Inventory & Bin Transfers
- **Tagline:** One live view, scanned moves
### Problem
- **Heading:** Every cycle count is a surprise.
- **Body:** Stock levels differ by system and by site, and bin-to-bin moves happen off the record. The count in the software and the count on the shelf drift apart until an audit forces a reckoning.
- **Quote:** Every cycle count was a surprise.
- **Quote by:** — Operations Manager, Manufacturing
### Benefit
- **Heading:** See every warehouse in one view — and scan every move.
- Read-only inventory across every warehouse in one screen
- Cross-field search to find any item, lot or license plate
- Export any view to Excel for counts and reporting
- Bin-to-bin transfers — single-item splits or many-to-one
- License-plate support so grouped stock moves as one unit
### Live Demo
- **Caption:** Search an item across every site, then move it bin-to-bin with a scan.
### Validation
- **Stat:** All sites
- **Stat label:** in one live inventory view
- **Proof:** Every move is a scanned transaction, so the count you see is the count on the shelf.

# OMS — Order Management

## OMS HUB — Order Management
- **Kicker:** Capability Library
- **Intro:** The workspace where every sales order is captured, detailed and prepared — then handed to warehouse picking and to the TMS for rating and booking, with no re-entry.
- **Card 01:** Sales Order Management — Create or import sales orders in one workspace. Ship From/To pull from your address book, Google or an integration, with US, Canada and Mexico address validation.
- **Card 02:** Product & Shipment Detail — Pull items from the product catalog with ERP serial numbers; auto freight class/NMFC, saved package types, hazmat (UN/NA catalog, DG, BOL) and ocean container details.
- **Card 03:** Order Consolidation — Combine multiple orders heading to the same destination into a single, lower-cost shipment.
- **Card 04:** Auto Pack — Auto-calculate packaging, handling units and weight — with fulfillment kits and rules — so every order is quote-ready and accurate.
- **Card 05:** Returns & Portals — Generate parcel return labels with default return processing, and give customers and vendors permission-scoped self-service portals.
- **Card 06:** Order-to-Fulfillment Handoff — Open sales orders flow into WMS picking and into the TMS for rate shopping, booking and tracking — one record, no re-keying.

## OMS 01 — Sales Order Management
- **Tagline:** Capture every order once, cleanly
- **AI callout:** Ask Copilot about any order in plain language — status, landed cost, exceptions — answered from your live shipment data.
### Problem
- **Heading:** The same order gets typed three times.
- **Body:** Orders arrive by email, portal and ERP — then get re-keyed into whatever system comes next. Every re-entry is a chance for a wrong address, a wrong quantity, a wrong day.
- **Quote:** We typed the same order into three systems.
- **Quote by:** — Customer Service Manager, Distribution
### Benefit
- **Heading:** Create or import every order in one workspace.
- Create or import sales orders into a single workspace
- Ship From / Ship To pull from your address book, Google or an integration
- US, Canada and Mexico address validation at entry
- Every order starts clean — downstream systems inherit good data
- No re-entry between order capture and fulfillment
### Live Demo
- **Caption:** An order imports, addresses validate, and it's ready for fulfillment — no re-entry.
### Validation
- **Stat:** 1 entry
- **Stat label:** per order, across every system
- **Proof:** Captured once, the order carries itself into picking, rating and booking. One G2 reviewer reports system integration eliminated hand-typed errors entirely. (William G., Transport Manager · G2 review)

## OMS 02 — Product & Shipment Detail
- **Tagline:** Quote-ready orders with compliance built in
### Problem
- **Heading:** The freight details show up at the dock — not at order entry.
- **Body:** Freight class, NMFC, hazmat paperwork and container details get filled in late or guessed. Quotes bounce, reclasses land on invoices, and compliance is a scramble.
- **Quote:** Half our LTL quotes bounced because the class was wrong.
- **Quote by:** — Traffic Manager, Industrial
### Benefit
- **Heading:** Pull the detail from the catalog — right the first time.
- Items pull from the product catalog with ERP serial numbers
- Auto freight class and NMFC on every line
- Saved package types applied consistently
- Hazmat built in — UN/NA catalog, DG details and BOL
- Ocean container details captured on the order itself
### Live Demo
- **Caption:** An item pulls from the catalog with class, NMFC and hazmat docs pre-filled.
### Validation
- **Stat:** Quote-ready
- **Stat label:** orders, with class and compliance built in
- **Proof:** Rates come back right the first time because the shipment detail was right at entry.

## OMS 03 — Order Consolidation
- **Tagline:** Same destination, one shipment
### Problem
- **Heading:** Orders to the same door ship as separate freight.
- **Body:** Two orders, same customer, same day — and they leave as two shipments with two minimums, two bookings and two tracking records. The waste is invisible because each order looks fine on its own.
- **Quote:** Two orders, same customer, same day — two shipments.
- **Quote by:** — Distribution Manager, Wholesale
### Benefit
- **Heading:** Combine same-destination orders into one shipment.
- Group multiple orders heading to the same destination
- Consolidate before rating, so the savings are real
- One rate, one booking, one set of documents
- One tracking record for the combined move
- Your customer gets one delivery instead of several
### Live Demo
- **Caption:** Three same-destination orders collapse into one lower-cost shipment.
### Validation
- **Stat:** 1 shipment
- **Stat label:** for orders sharing a destination
- **Proof:** Pay for one move instead of several on freight that was always going to the same door.

## OMS 04 — Auto Pack
- **Tagline:** Packaging, units and weight — calculated, not guessed
### Problem
- **Heading:** Quotes are built on guessed weights.
- **Body:** At order entry nobody knows the cartons, handling units or final weight — so the quote is an estimate and the invoice is a correction. The difference settles itself on your freight bill.
- **Quote:** We quoted off guessed weights and settled the difference later.
- **Quote by:** — Logistics Analyst, Consumer Goods
### Benefit
- **Heading:** Auto-calculate the pack before the quote.
- Auto-calculate packaging, handling units and weight per order
- Fulfillment kits pack multi-item bundles consistently
- Packing rules apply your logic on every order
- Every order is quote-ready and accurate at entry
- The rate you quote is built on the freight you'll ship
### Live Demo
- **Caption:** An order auto-packs into the right cartons with calculated weight — instantly quote-ready.
### Validation
- **Stat:** Auto-built
- **Stat label:** handling units, packaging and weights
- **Proof:** Accurate dims and weights at entry mean the rate you quote is the rate you pay.

## OMS 05 — Returns & Portals
- **Tagline:** Self-service returns, scoped access
### Problem
- **Heading:** Every return starts with a phone call.
- **Body:** Customers and vendors email for labels, then email again for status. Your team plays switchboard for a process that should run itself — and every handoff adds a day.
- **Quote:** Every return started with a phone call and ended with someone forwarding a label.
- **Quote by:** — Customer Service Lead, E-commerce
### Benefit
- **Heading:** Let customers and vendors serve themselves.
- Generate parcel return labels with default return processing
- Customer portals scoped to their own orders and shipments
- Vendor portals with permission-scoped access
- Labels and status live in the portal — not in your inbox
- Your team handles exceptions, not routine requests
### Live Demo
- **Caption:** A customer self-serves a return label from their portal — no ticket, no call.
### Validation
- **Stat:** Self-service
- **Stat label:** returns for customers and vendors
- **Proof:** Labels and status live in the portal, scoped to exactly what each party should see.

## OMS 06 — Order-to-Fulfillment Handoff
- **Tagline:** One record from capture to carrier
### Problem
- **Heading:** Order, warehouse and freight systems each keep their own copy.
- **Body:** The order system, the WMS and shipping never quite agree — because every handoff is a re-key. Status lives in three places and the customer's question lands in a fourth.
- **Quote:** The order system, the warehouse and shipping never agreed.
- **Quote by:** — IT Director, Manufacturing
### Benefit
- **Heading:** One record flows from order to pick to booked freight.
- Open sales orders flow straight into WMS picking
- The same record hands off to the TMS for rate shopping and booking
- Tracking and status flow back to the order automatically
- No re-keying at any handoff, in either direction
- One place to answer “where is my order?”
### Live Demo
- **Caption:** One sales order flows through picking, rating and booking untouched.
### Validation
- **Stat:** 0 re-keys
- **Stat label:** from order capture to carrier booking
- **Proof:** One record moves through OMS, WMS and TMS — nothing is typed twice. A G2 reviewer running a WMS integration reports manual work mostly eliminated and shipping errors down. (Tony C., Purchasing & Systems Manager · G2 review)

# NETSUITE — ERP Demo Track

## NETSUITE HUB — FreightPOP inside NetSuite
- **Kicker:** ERP Demo Track · SuiteApp
- **Intro:** A certified SuiteApp plus a bilateral integration: quote, book, track and reconcile freight without leaving the NetSuite record. 134 NetSuite shippers run FreightPOP today.
- **Card 01:** Quote & Ship Inside NetSuite — Rate shop and book without leaving the Sales Order
- **Card 02:** Order-to-Ship Sync — Orders flow in, tracking and cost flow back — automatically
- **Card 03:** Product Catalog & AutoCalc — Item dims and weights sync so rating is instant and accurate
- **Card 04:** Order Change Management — When NetSuite orders change, review and accept — nothing ships stale
- **Card 05:** Consolidation & Optimization — Combine NetSuite orders into fewer, cheaper shipments
- **Card 06:** Inbound PO Visibility — Import purchase orders and track inbound freight to the dock
- **Card 07:** Partners & Case Studies — The NetSuite ecosystem we implement with — and the shippers who prove it

## NETSUITE 01 — Quote & Ship Inside NetSuite
- **Title line 1:** Quote & Ship
- **Title line 2:** Inside NetSuite
- **Tagline:** Rate shop and book without leaving the Sales Order
### Problem
- **Heading:** Rating happens outside the ERP — so nobody does it.
- **Body:** The order lives in NetSuite, but rates live in carrier portals and email threads. Reps bounce between tabs, paste rates into spreadsheets, and the freight cost your team quotes rarely matches the freight cost you pay.
- **Quote:** I need to go back and send emails to our carriers and compare those quotes, pick one… then do the documents we need to do in NetSuite, send the packing list, the BOL, all that.
- **Quote by:** — Logistics Coordinator, NetSuite shipper (discovery call)
### Benefit
- **Heading:** The FreightPOP tab lives on the NetSuite transaction.
- Quote, rate shop and book on Quotes, Sales Orders and Item Fulfillments — inside NetSuite
- AutoCalc rates the transaction automatically; dual rate shop compares contract and spot
- Auto Select Best Option books the cheapest compliant rate with zero clicks
- Accessorials supported on the transaction; services filter by subsidiary
- Freight cost at the Quote stage — know your margin before you commit
- The proven alternative to NetSuite's native Ship Central — an existing SuiteApp, not a build-from-scratch project
### Live Demo
- **Caption:** The certified SuiteApp rates, books, tracks and audits a NetSuite order end to end — watch the full flow.
### Validation
- **Stat:** 0
- **Stat label:** carrier portals opened to book a shipment
- **Proof:** Rating, booking, documents and tracking all happen on the NetSuite record via the FreightPOP SuiteApp — built for NetSuite 2026.1, updated continuously, and chosen over NetSuite's native Ship Central by shippers who want it working in weeks, not a build project.

## NETSUITE 02 — Order-to-Ship Sync
- **Title line 1:** Order-to-Ship
- **Title line 2:** Sync
- **Tagline:** Orders flow in, tracking and cost flow back — automatically
- **AI callout:** Predictive delivery ETAs write back into NetSuite automatically — no manual status chasing on open sales orders.
### Problem
- **Heading:** Every shipment gets keyed twice.
- **Body:** The order is typed into NetSuite, re-typed into the shipping tool, then the tracking number and final cost get typed back by hand. Manual data entry and copy-paste between systems are the two most common pains NetSuite shippers bring to us.
- **Quote:** I would not need to manually check a checkbox or select a drop-down… in order for that to happen, right?
- **Quote by:** — IT lead, NetSuite shipper (integration scoping call)
### Benefit
- **Heading:** A closed loop between NetSuite and your freight.
- Sales Orders and Item Fulfillments import in real time — or search-and-import from the Quote/Ship page
- Tracking number, carrier and actual cost write back to the fulfillment automatically
- Latest tracking status visible directly on the NetSuite record
- SPS Commerce EDI supported — transaction-level tracking, multiple fulfillments per order
- Batch import handles high-volume days without babysitting
### Live Demo
- **Caption:** An order imports from NetSuite, books with the best carrier, and writes tracking + cost back to the fulfillment — no re-keying.
### Validation
- **Stat:** 2×
- **Stat label:** data entry eliminated on every shipment
- **Proof:** Order data is entered once, in NetSuite. FreightPOP handles the round trip — the #1 and #2 pains NetSuite shippers report both disappear.

## NETSUITE 03 — Product Catalog & AutoCalc
- **Title line 1:** Product Catalog
- **Title line 2:** & AutoCalc
- **Tagline:** Item dims and weights sync so rating is instant and accurate
### Problem
- **Heading:** Rating is only as good as your item data.
- **Body:** Dimensions, weights and freight classes live in the item master — or in someone's memory. When they don't flow to rating, every quote is a guess and every reclass is a surcharge.
- **Quote:** We're trying to manually go through 9,000 part numbers to figure out what we need.
- **Quote by:** — Operations lead, NetSuite shipper (discovery call)
### Benefit
- **Heading:** The item master drives rating — automatically.
- FreightPOP fields (dims, weight, freight class) on NetSuite items — including assembly items
- AutoCalc configuration toggles sync from the item master; no double configuration
- Auto-packaging logic builds shipments from catalog data
- Update the item once in NetSuite — rating everywhere reflects it
### Live Demo
- **Caption:** A fulfillment rates itself from item-master dims and weights — no manual measuring, no guessed freight class.
### Validation
- **Stat:** 9,000+
- **Stat label:** SKUs rated straight from the item master
- **Proof:** However large the catalog, item data syncs once and every quote uses it — accurate rates and fewer carrier reclass adjustments.

## NETSUITE 04 — Order Change Management
- **Title line 1:** Order Change
- **Title line 2:** Management
- **Tagline:** When NetSuite orders change, review and accept — nothing ships stale
### Problem
- **Heading:** The order changed after you planned the freight.
- **Body:** Quantities move, addresses change, lines get added — after the shipment is already allocated. Without a control point, the wrong freight ships against the old version of the order.
- **Quote:** That has to be done so that we're not getting 2,000 orders weekly that are just going to sit there.
- **Quote by:** — Operations program lead, NetSuite shipper (rollout planning call)
### Benefit
- **Heading:** Every ERP change gets a checkpoint.
- Updates to an already-allocated order create a pending review copy — nothing is silently overwritten
- Side-by-side comparison shows exactly which fields changed
- Accept or reject in one click, with email notifications to the right people
- Auto-accept rules clear low-risk changes without a human in the loop
- High-volume order flow keeps moving — only real conflicts stop
### Live Demo
- **Caption:** A NetSuite order update arrives after allocation — FreightPOP shows the diff side-by-side and the planner accepts it in one click.
### Validation
- **Stat:** 100%
- **Stat label:** of order changes reviewed before they ship
- **Proof:** Change management catches ERP updates against allocated shipments — the wrong-version shipment stops happening.

## NETSUITE 05 — Consolidation & Optimization
- **Title line 1:** Consolidation
- **Title line 2:** & Optimization
- **Tagline:** Combine NetSuite orders into fewer, cheaper shipments
### Problem
- **Heading:** Ten orders, ten shipments — one truck's worth of freight.
- **Body:** Orders ship the moment they're ready, one at a time, because combining them by hand is slow and error-prone. The savings from consolidation are real, but nobody has time to hunt for them.
- **Quote:** We want to do it as quickly and efficiently as possible to have cost-savings realization — but not create so many manual processes that we stop shipping.
- **Quote by:** — Transportation manager, NetSuite shipper (evaluation call)
### Benefit
- **Heading:** Consolidation is a window, not a project.
- Consolidation window inside NetSuite Native — select orders, rate them as one
- Combine ERP-imported and manual orders in the same shipment
- Zone-skipping support for parcel-heavy flows
- Compare the consolidated rate against shipping individually — take the savings when they're real
### Live Demo
- **Caption:** Three NetSuite orders to the same region combine into one rated LTL shipment — the savings show before booking.
### Validation
- **Stat:** N→1
- **Stat label:** orders combined into a single rated shipment
- **Proof:** Consolidation runs where the orders already live, so the cheapest way to ship is also the easiest.

## NETSUITE 06 — Inbound PO Visibility
- **Title line 1:** Inbound PO
- **Title line 2:** Visibility
- **Tagline:** Import purchase orders and track inbound freight to the dock
- **AI callout:** The AI exception agent predicts inbound delays and flags ocean Last Free Date before demurrage hits the PO.
### Problem
- **Heading:** Inbound is a black hole until it hits the dock.
- **Body:** Purchase orders go out, then silence. Receiving finds out a shipment arrived when the truck is in the yard, and production plans around inventory that may or may not be on a trailer somewhere.
- **Quote:** I find out a PO shipped when the truck shows up at the dock.
- **Quote by:** — Receiving lead (illustrative persona)
### Benefit
- **Heading:** Inbound freight, tracked like outbound.
- Import purchase orders from NetSuite for inbound shipments
- Book and track inbound freight in FreightPOP alongside outbound
- Tracking updates export back to the NetSuite PO record
- Receiving sees what's arriving and when — before the truck does
- Feeds straight into WMS receiving when you run FreightPOP's warehouse layer
### Live Demo
- **Caption:** A NetSuite PO becomes a tracked inbound shipment — status updates flow back to the PO until it reaches the dock.
### Validation
- **Stat:** PO→POD
- **Stat label:** inbound tracked end to end
- **Proof:** The PO record in NetSuite carries live tracking until delivery — receiving and planning finally see inbound the way customers see outbound.

## NETSUITE 07 — Partners & Case Studies
- **Title line 1:** Partners
- **Title line 2:** & Proof
- **Tagline:** The NetSuite ecosystem we implement with — and the shippers who prove it
### Problem
- **Heading:** A shipping platform is only as good as its rollout.
- **Body:** NetSuite projects live and die by the implementation. Bolting on a shipping tool the VAR has never seen adds risk to a go-live that is already high-stakes.
- **Quote:** Our NetSuite partner runs the project — anything we add has to work with them, not around them.
- **Quote by:** — IT director (illustrative persona)
### Benefit
- **Heading:** We ship with the NetSuite partner ecosystem, not around it.
- Referred and co-implemented by NetSuite VARs — AppFiciency, ScaleNorth, NetDynamic, Beyond Cloud and more
- Technology partners like RF-SMART pair barcode/WMS workflows with FreightPOP shipping
- Certified SuiteApp distributed through the SuiteApp marketplace
- Case studies across distribution, manufacturing and multi-location retail
- 134 NetSuite shippers live — references available in your vertical
### Live Demo
- **Caption:** Implementation partners and customer case studies — the live list, with links.
### Validation
- **Stat:** 134
- **Stat label:** NetSuite shippers live on FreightPOP
- **Proof:** Won together with the NetSuite partner ecosystem — the rollout risk question has been answered 134 times.

# ACUMATICA — ERP Demo Track

## ACUMATICA HUB — FreightPOP inside Acumatica
- **Kicker:** ERP Demo Track · Certified ISV
- **Intro:** A certified Acumatica ISV: rate shop, book, track and reconcile freight natively inside Acumatica, or bilaterally through its API. Native plug-in + Plug & Play — pick the model that fits the account.
- **Card 01:** Ship Inside Acumatica — Rate shop and book from the Acumatica Sales Order — no system switching
- **Card 02:** Dual Rate Shop & Auto-Select — Compare contract and spot, auto-pick the best rate — in Acumatica
- **Card 03:** Plug & Play Order Sync — Orders flow in, tracking and cost flow back — bilateral, API-driven
- **Card 04:** AP & Return-to-Vendor Export — Carrier invoices become Acumatica AP Bills — coded and ready
- **Card 05:** Product Catalog & AutoCalc — Item dims and weights drive instant, accurate rating
- **Card 06:** Partners & Case Studies — A certified Acumatica ISV — and the shippers who prove it

## ACUMATICA 01 — Ship Inside Acumatica
- **Title line 1:** Ship Inside
- **Title line 2:** Acumatica
- **Tagline:** Rate shop and book from the Acumatica Sales Order — no system switching
### Problem
- **Heading:** Shipping lives in a second window.
- **Body:** The order is in Acumatica, but rating and labels happen in a standalone shipping tool. Reps re-key the order, bounce between screens, and the freight cost on the SO is a guess until someone books it somewhere else.
- **Quote:** Our old tool took three to five minutes to process a single parcel shipment — outside the ERP.
- **Quote by:** — Operations lead, Acumatica shipper (illustrative persona)
### Benefit
- **Heading:** A FreightPOP carrier plug-in, native inside Acumatica.
- Rate shop and book directly from the Acumatica Sales Order and Shipment screens
- Installed as an Acumatica customization package — talks to FreightPOP over the External API
- AutoCalc builds packages, inner pieces and inner-most pieces from the SO lines
- Labels and documents print automatically to each user's mapped printer
- Runs on Acumatica 2025 R1 / R2 — no middleware, no separate shipping station
### Live Demo
- **Caption:** A rep rate shops and books an Acumatica Sales Order without ever leaving Acumatica — labels print themselves.
### Validation
- **Stat:** 0
- **Stat label:** windows switched to book a shipment
- **Proof:** The certified FreightPOP plug-in lives on the Acumatica transaction — rate, book, print and track without leaving the ERP.

## ACUMATICA 02 — Dual Rate Shop & Auto-Select
- **Title line 1:** Dual Rate Shop
- **Title line 2:** & Auto-Select
- **Tagline:** Compare contract and spot, auto-pick the best rate — in Acumatica
### Problem
- **Heading:** The cheapest rate is the one nobody had time to find.
- **Body:** With one carrier account and a manual pick, reps default to the familiar carrier. Contract versus spot never gets compared, and the savings sitting in a better lane go unclaimed on every order.
- **Quote:** Each rep just used whichever carrier they knew. No two shipped the same way.
- **Quote by:** — Logistics manager, Acumatica shipper (illustrative persona)
### Benefit
- **Heading:** Optimized packaging plus best-rate selection, on the Acumatica screen.
- Dual Rate Shop compares contract and spot rates side by side
- Auto-Select Best Rate books the cheapest compliant option automatically
- Extends the existing Shop-for-Rates experience — parcel, LTL and FTL
- Optimized packaging calc feeds accurate rates, not guesses
- Targeting Acumatica 2025 R2
### Live Demo
- **Caption:** An Acumatica order rate shops contract vs spot and auto-selects the best compliant rate — zero manual carrier choice.
### Validation
- **Stat:** Best
- **Stat label:** compliant rate, every order
- **Proof:** Dual rate shop + auto-select runs inside Acumatica, so the cheapest compliant rate is the default — not the carrier a rep happened to remember.

## ACUMATICA 03 — Plug & Play Order Sync
- **Title line 1:** Plug & Play
- **Title line 2:** Order Sync
- **Tagline:** Orders flow in, tracking and cost flow back — bilateral, API-driven
### Problem
- **Heading:** Every shipment gets keyed twice.
- **Body:** The order is typed into Acumatica, re-typed into shipping, then tracking and freight cost get typed back by hand. Manual data entry between disconnected systems is where the day disappears.
- **Quote:** We were copy-pasting order data into the shipping tool and the tracking number back into the ERP, all day.
- **Quote by:** — Fulfillment supervisor, Acumatica shipper (illustrative persona)
### Benefit
- **Heading:** A bilateral connection, operated from inside FreightPOP.
- Imports every Acumatica order type — Sales Orders (SO) and Return Merchandise (RM/RMA)
- Pulls Acumatica Shipments and Purchase Orders for inbound and outbound freight
- Stock-item sync keeps the FreightPOP catalog aligned with Acumatica
- Carrier, tracking number and rate write back onto the Acumatica transaction
- OAuth (ROPC) auth to the Acumatica API — no middleware to run
### Live Demo
- **Caption:** An Acumatica Sales Order imports into FreightPOP, books, and writes carrier + tracking + cost straight back — no re-keying.
### Validation
- **Stat:** 2×
- **Stat label:** data entry eliminated per shipment
- **Proof:** Order data is entered once, in Acumatica. The Plug & Play integration handles the round trip — SO/RMA/Shipment/PO in, carrier + tracking + cost back.

## ACUMATICA 04 — AP & Return-to-Vendor Export
- **Title line 1:** AP & Return-to
- **Title line 2:** Vendor Export
- **Tagline:** Carrier invoices become Acumatica AP Bills — coded and ready
- **AI callout:** Freight invoices auto-reconcile before they post — the AI audit radar names the variance cause (an unexpected liftgate, a detention charge) and offers to save the rule so AP stops re-catching it.
### Problem
- **Heading:** Freight bills pile up, uncoded.
- **Body:** Carrier invoices arrive by email and PDF, then someone hand-keys each one into Acumatica AP with a GL code. Returns to vendors add another manual export. Accounting is always behind and always guessing at the coding.
- **Quote:** Reconciling carrier bills into AP by hand is a job nobody has time for.
- **Quote by:** — Accounting lead, Acumatica shipper (illustrative persona)
### Benefit
- **Heading:** Freight AP and returns, exported into Acumatica automatically.
- Completed shipment costs export to Acumatica as AP Bills with vendor + GL coding
- Return-to-Vendor (RTV) export handles reverse-logistics shipments
- Purchase Order integration tracks inbound freight from creation to receipt
- Shipping terms map from native or custom Acumatica fields
- Accurate carrier cost on the record — no manual bill entry
### Live Demo
- **Caption:** A booked shipment posts its carrier cost to Acumatica AP as a coded Bill, and a return exports as an RTV — no manual entry.
### Validation
- **Stat:** Auto
- **Stat label:** AP bills + RTV posted to Acumatica
- **Proof:** Carrier invoices post to Acumatica AP with the right GL code, and returns export as RTV — the reconciliation backlog stops accumulating.

## ACUMATICA 05 — Product Catalog & AutoCalc
- **Title line 1:** Product Catalog
- **Title line 2:** & AutoCalc
- **Tagline:** Item dims and weights drive instant, accurate rating
### Problem
- **Heading:** Rating is only as good as your item data.
- **Body:** Dimensions, weights and packaging live in someone's head or a spreadsheet. When they don't flow to rating, every quote is a guess and every carrier reclass is a surcharge nobody expected.
- **Quote:** If the dimensions aren't right, the rate isn't right — and we eat the reclass.
- **Quote by:** — Warehouse manager, Acumatica shipper (illustrative persona)
### Benefit
- **Heading:** The FreightPOP catalog, populated from your Acumatica items.
- AutoCalc computes Packages, Inner Pieces and Inner-Most Pieces from the SO lines + catalog
- Item dimensions and weights feed rating automatically — no manual package entry
- Populate the catalog from Acumatica stock items; keep it synced going forward
- Accurate packaging means accurate rates and fewer carrier reclass adjustments
- The prerequisite that makes AutoCalc and dual rate shop work
### Live Demo
- **Caption:** An Acumatica order auto-builds its packages from item dims and weights — the rate is right the first time.
### Validation
- **Stat:** 0
- **Stat label:** manual package entries at rate time
- **Proof:** Item data syncs once from Acumatica; AutoCalc builds the shipment and every quote uses measured dims — accurate rates, fewer reclass surprises.

## ACUMATICA 06 — Partners & Case Studies
- **Title line 1:** Partners
- **Title line 2:** & Proof
- **Tagline:** A certified Acumatica ISV — and the shippers who prove it
### Problem
- **Heading:** A shipping add-on is only as good as its fit with Acumatica.
- **Body:** Acumatica is highly customizable, so a bolt-on shipping tool that the VAR has never seen adds risk to a go-live that's already high-stakes. Teams want a proven, certified integration — not a science project.
- **Quote:** We needed shipping that our Acumatica partner already knew how to implement.
- **Quote by:** — IT director (illustrative persona)
### Benefit
- **Heading:** Certified, partner-backed, and already winning.
- Certified Acumatica ISV — a listed, supported integration, not a from-scratch build
- Native plug-in and Plug & Play bilateral — pick the model that fits the account
- Implemented alongside the Acumatica VAR ecosystem
- Won accounts displacing legacy shipping tools
- Setup guides, field mapping and known-issue references maintained continuously
### Live Demo
- **Caption:** Certified Acumatica ISV, implementation partners and customer proof — the live list, with links.
### Validation
- **Stat:** ISV
- **Stat label:** certified Acumatica integration
- **Proof:** Buffalo Seal & Gasket chose FreightPOP for Acumatica LTL & Parcel over a legacy tool that took 3–5 minutes per parcel — a certified integration, implemented with the Acumatica partner ecosystem.
