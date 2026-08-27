// Validation Library data — extracted verbatim from design-source/Validation Library.dc.html
// (S5, DATA, FEATURE_GROUPS, TABS). Edit here to add or change items.
const S5 = "★★★★★";

const DATA = [
  // ——— Headline stats (published figures) ———
  { cat: "stats", stars: 0, label: "30% average savings on annual freight spend",
    title: "30% average savings on annual freight spend",
    figures: [{ v: "30%", k: "average savings on annual freight spend" }],
    body: "This is freight shipping cost, not labor. Rate shop contracted, negotiated and marketplace rates side by side across parcel, LTL, FTL, ocean, rail and international air, then let routing rules pick the winner. Published range across our materials is 10–30% depending on mode mix and current carrier discipline.",
    who: "FreightPOP published figure", meta: "Customer-reported",
    tags: ["Rate Shopping", "ROI", "Carrier Management", "Spot Quoting & Bid Portal"] },

  { cat: "stats", stars: 0, label: "95% reduction in shipment processing time",
    title: "95% reduction in shipment processing time",
    figures: [{ v: "95%", k: "reduction in shipment processing time" }],
    body: "Comes from the whole chain working together: orders sync in automatically, packaging and weights are calculated rather than keyed, rules select the carrier, and auto-dispatch tenders against your routing guide without a person touching it. Also stated as 5–10 minutes saved per shipment.",
    who: "FreightPOP published figure", meta: "Customer-reported",
    tags: ["Order Management and Intake", "Product Detail & Auto Pack", "Shipping Rules Engine", "Rate Shopping"] },

  { cat: "stats", stars: 0, label: "40% average increase in on-time deliveries",
    title: "40% average increase in on-time deliveries",
    figures: [{ v: "40%", k: "more on-time deliveries" }],
    body: "Sequenced routes, appointments that carriers can self-schedule, and tracking that surfaces a late load while there is still time to act on it.",
    who: "FreightPOP published figure", meta: "Customer-reported",
    tags: ["Route Optimization", "Tracking & Notifications", "Dock Scheduling", "Fleet & Dispatch"] },

  { cat: "stats", stars: 0, label: "8–15% savings through invoice auditing",
    title: "8–15% savings through invoice auditing",
    figures: [{ v: "8–15%", k: "of freight spend recovered" }],
    body: "Duplicate charges, incorrect accessorials and rate discrepancies typically account for 8 to 15% of total freight spend. Every carrier invoice is matched against the original quote and flagged before payment, so only audited costs reach your ERP.",
    who: "FreightPOP published figure", meta: "Customer-reported",
    tags: ["Freight Invoice Audit", "ROI", "Documents & BOL Control"] },

  { cat: "stats", stars: 0, label: "$500K–$1.5M estimated annual savings at a global manufacturer",
    title: "$500K–$1.5M in estimated annual savings",
    figures: [{ v: "$500K–$1.5M", k: "estimated annual savings" }],
    body: "A leading Japanese automotive manufacturer, 200,000 employees, running SAP S/4HANA. Savings estimated across streamlined freight procurement, rate shopping, tracking and invoicing after replacing separate workflows per business unit.",
    who: "Global Automotive Manufacturer case study", meta: "Estimated annual savings — case study figure",
    tags: ["ROI", "ERP Integration", "Rate Shopping", "Freight Invoice Audit", "Reporting & Analytics"] },

  { cat: "stats", stars: 0, label: "$35k saved in under a year at Prima Supply",
    title: "$35k saved in under a year, on a third more volume",
    figures: [{ v: "$35k", k: "saved in under a year" }, { v: "+33%", k: "volume on the same warehouse team" }],
    body: "Prima Supply, a Louisville restaurant and coffee equipment supplier running four brands through Brightpearl and BigCommerce. Savings came from labor and freight together — one-step label printing, barcode-driven order lookup, brand-specific carrier accounts and rate comparison.",
    who: "Prima Supply case study", meta: "Customer-reported",
    tags: ["ROI", "ERP Integration", "Rate Shopping", "Parcel Shipping", "Shipping Rules Engine", "Tracking & Notifications"] },

  { cat: "stats", stars: 0, label: "$0 to add a carrier",
    title: "No per-carrier setup fee",
    figures: [{ v: "$0", k: "to add a carrier" }],
    body: "Elgen Manufacturing adds, removes and updates carriers themselves with no increase to monthly cost — so trying a new carrier is a service decision, not a budget one. Their previous TMS required a support request for every change.",
    who: "Elgen Manufacturing case study", meta: "Customer-reported",
    tags: ["Carrier Management", "ROI", "Spot Quoting & Bid Portal", "Rate Shopping"] },

  { cat: "stats", stars: 0, label: "1,500+ integrations, 99.99% uptime",
    title: "1,500+ integrations on 99.99% uptime",
    figures: [{ v: "1,500+", k: "carrier and system connections" }, { v: "99.99%", k: "platform uptime" }],
    body: "Carriers, ERPs, WMSs and rate marketplaces, built on our own API technology rather than resold through an aggregator.",
    who: "FreightPOP platform", meta: "Verify live",
    tags: ["Carrier Management", "Company"] },

  // ——— Case studies (real multi-page documents) ———
  { cat: "casestudies", stars: 0, sheet: "Case Study - Kyocera.dc.html", pages: 6, thumb: "assets/cs/page-kyocera.jpg",
    label: "Kyocera Document Solutions America + Oracle ERP", company: "Kyocera Document Solutions America", industry: "Document technology · 5 US facilities", erp: "Oracle ERP",
    title: "2 carriers to 1,500+ rate-shopped", who: "Christian Mannino, Director of Logistics",
    tags: ["Rate Shopping", "Carrier Management", "ERP Integration", "Tracking & Notifications", "Reporting & Analytics", "Parcel Shipping"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Newegg.dc.html", pages: 6, thumb: "assets/cs/page-newegg.jpg",
    label: "Newegg + WMS + in-house systems", company: "Newegg", industry: "Consumer electronics e-commerce · parcel & freight", erp: "WMS + in-house systems",
    title: "20 shipments per person became 60+", who: "Kai Chang, Senior Logistics Analyst",
    tags: ["Rate Shopping", "Carrier Management", "Tracking & Notifications", "ERP Integration", "Order Management and Intake", "Parcel Shipping", "Reporting & Analytics"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Miami Beef.dc.html", pages: 7, thumb: "assets/cs/page-miami-beef.jpg",
    label: "Miami Beef + NetSuite", company: "Miami Beef", industry: "Protein distribution · cold chain LTL & FTL", erp: "NetSuite",
    title: "Excel to a NetSuite-integrated TMS", who: "Miami Beef operations",
    tags: ["ERP Integration", "Rate Shopping", "Carrier Management", "Dock Scheduling", "Freight Invoice Audit", "Documents & BOL Control", "Reporting & Analytics", "Spot Quoting & Bid Portal"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Uneekor.dc.html", pages: 5, thumb: "assets/cs/page-uneekor.jpg",
    label: "Uneekor + NetSuite", company: "Uneekor", industry: "Golf simulation technology · international parcel", erp: "NetSuite",
    title: "50% lower shipping cost, 2× volume", who: "Uneekor logistics",
    tags: ["ERP Integration", "Rate Shopping", "Tracking & Notifications", "Parcel Shipping", "Carrier Management", "ROI", "Reporting & Analytics"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - 4Wall Entertainment.dc.html", pages: 5, thumb: "assets/cs/page-4wall.jpg",
    label: "4Wall Entertainment", company: "4Wall Entertainment", industry: "Entertainment services · North America & Europe", erp: "",
    title: "Request at 2pm, carrier by 4:30", who: "Michael Teixeira, Logistics Coordinator",
    tags: ["Carrier Management", "Tracking & Notifications", "Inbound Order Management", "Rate Shopping", "Spot Quoting & Bid Portal"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Citrus Co-Op.dc.html", pages: 5, thumb: "assets/cs/page-citrus-coop.jpg",
    label: "Global Citrus Cooperative + ERP integrated", company: "Global Citrus Cooperative", industry: "Agriculture · perishable & international freight", erp: "ERP integrated",
    title: "Manual workflows to automated shipping", who: "Citrus Co-Op logistics",
    tags: ["ERP Integration", "Rate Shopping", "Tracking & Notifications", "Carrier Management", "Address Validator & Accessorials", "Reporting & Analytics"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Automotive Manufacturer.dc.html", pages: 6, thumb: "assets/cs/page-automotive.jpg",
    label: "Global Automotive Manufacturer + SAP S/4HANA", company: "Global Automotive Manufacturer", industry: "Automotive · 200,000 employees, global inbound and outbound", erp: "SAP S/4HANA",
    title: "$500K–$1.5M in estimated annual savings", who: "Case study",
    tags: ["ERP Integration", "Rate Shopping", "Freight Invoice Audit", "Tracking & Notifications", "Inbound Order Management", "Reporting & Analytics"] },

  { cat: "casestudies", stars: 0, sheet: "Case Study - Once Upon a Farm.dc.html", pages: 5, thumb: "assets/cs/page-once-upon-a-farm.jpg",
    label: "Once Upon a Farm + Sage X3", company: "Once Upon a Farm", industry: "Organic food · refrigerated LTL & parcel", erp: "Sage X3",
    title: "One connected shipping workflow", who: "Once Upon a Farm logistics",
    tags: ["ERP Integration", "Order Management and Intake", "Carrier Management", "Tracking & Notifications", "Freight Invoice Audit", "Documents & BOL Control", "Inbound Order Management", "Reporting & Analytics"] },

  // ——— Why we won (real one-pagers) ———
  { cat: "whywewon", stars: 0, sheet: "Why We Won - Uneekor.dc.html", thumb: "assets/wwy/page-uneekor.jpg",
    label: "Uneekor + NetSuite", company: "Uneekor", industry: "Precision golf simulation technology", erp: "NetSuite",
    tags: ["ROI", "ERP Integration", "Tracking & Notifications", "Shipping Rules Engine", "Rate Shopping", "Carrier Management", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Winholt.dc.html", thumb: "assets/wwy/page-winholt.jpg",
    label: "Winholt", company: "Winholt", industry: "Material handling & food service manufacturing", erp: "",
    tags: ["ERP Integration", "Order Management and Intake", "Inbound Order Management", "Tracking & Notifications", "Documents & BOL Control", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Associated Packaging.dc.html", thumb: "assets/wwy/page-associated-packaging.jpg",
    label: "Associated Packaging + NetSuite", company: "Associated Packaging", industry: "Packaging distribution · 12 branches", erp: "NetSuite",
    tags: ["ERP Integration", "Carrier Management", "Rate Shopping", "Freight Invoice Audit", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Beaumont Juice.dc.html", thumb: "assets/wwy/page-beaumont-juice.jpg",
    label: "Beaumont Juice + NetSuite", company: "Beaumont Juice", industry: "Multi-brand juice manufacturing", erp: "NetSuite",
    tags: ["ERP Integration", "Order Consolidation", "Shipment Consolidation", "Route Optimization", "Dock Scheduling", "Fleet & Dispatch"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Clean Simple Eats.dc.html", thumb: "assets/wwy/page-clean-simple-eats.jpg",
    label: "Clean Simple Eats + NetSuite", company: "Clean Simple Eats", industry: "Clean-label supplements & meal plans", erp: "NetSuite",
    tags: ["ROI", "ERP Integration", "Rate Shopping", "Carrier Management", "Tracking & Notifications", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - DP Wagner.dc.html", thumb: "assets/wwy/page-dp-wagner.jpg",
    label: "DP Wagner + Acumatica", company: "DP Wagner", industry: "Manufacturing & 3PL · 175,000 sq ft", erp: "Acumatica",
    tags: ["ERP Integration", "Guided Receiving", "Put-Away & Bin Transfers", "Order Picking & Fulfillment", "Inventory Visibility & Adjustments", "Cycle Counting", "Documents & BOL Control"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Automobile Manufacturer.dc.html", thumb: "assets/wwy/page-automobile-manufacturer.jpg",
    label: "Automobile Manufacturer + SAP S/4HANA", company: "Automobile Manufacturer", industry: "Automotive · 4M+ vehicles sold annually", erp: "SAP S/4HANA",
    tags: ["ERP Integration", "Tracking & Notifications", "Inbound Order Management", "Freight Invoice Audit", "Rate Shopping", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Flair Packaging.dc.html", thumb: "assets/wwy/page-flair-packaging.jpg",
    label: "Flair Packaging + Microsoft Dynamics 365", company: "Flair Packaging", industry: "Sustainable packaging solutions", erp: "Microsoft Dynamics 365",
    tags: ["ERP Integration", "Multi-Leg Shipments", "Order Management and Intake", "Documents & BOL Control", "Tracking & Notifications", "Carrier Management"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Mark Andy.dc.html", thumb: "assets/wwy/page-mark-andy.jpg",
    label: "Mark Andy + Rootstock", company: "Mark Andy", industry: "Flexographic & digital label presses", erp: "Rootstock",
    tags: ["ERP Integration", "Inbound Order Management", "Tracking & Notifications", "Reporting & Analytics", "Carrier Management"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Once Upon a Farm.dc.html", thumb: "assets/wwy/page-once-upon-a-farm.jpg",
    label: "Once Upon a Farm + Sage X3", company: "Once Upon a Farm", industry: "Organic snacks & meals for kids", erp: "Sage X3",
    tags: ["ERP Integration", "Onboarding", "Support", "Documents & BOL Control", "Tracking & Notifications", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Pyramex.dc.html", thumb: "assets/wwy/page-pyramex.jpg",
    label: "Pyramex + NetSuite", company: "Pyramex", industry: "Personal protective equipment", erp: "NetSuite",
    tags: ["ERP Integration", "Product Detail & Auto Pack", "Shipment Consolidation", "Rate Shopping", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Sonco Worldwide.dc.html", thumb: "assets/wwy/page-sonco-worldwide.jpg",
    label: "Sonco Worldwide + Acumatica", company: "Sonco Worldwide", industry: "Fencing, construction supplies & shade", erp: "Acumatica",
    tags: ["ERP Integration", "Carrier Management", "Rate Shopping", "Shipment Consolidation", "Order Management and Intake", "Tracking & Notifications", "Parcel Shipping"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Sunbelt Solomon.dc.html", thumb: "assets/wwy/page-sunbelt-solomon.jpg",
    label: "Sunbelt Solomon + ERP via ShipLink", company: "Sunbelt Solomon", industry: "Electrical power & transformer lifecycle", erp: "ERP via ShipLink",
    tags: ["ERP Integration", "Documents & BOL Control", "Freight Invoice Audit", "Carrier Management", "Rate Shopping", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Sunkist Growers.dc.html", thumb: "assets/wwy/page-sunkist-growers.jpg",
    label: "Sunkist Growers", company: "Sunkist Growers", industry: "Citrus production & global distribution", erp: "",
    tags: ["ERP Integration", "Tracking & Notifications", "Carrier Management", "Reporting & Analytics"] },

  { cat: "whywewon", stars: 0, sheet: "Why We Won - Alley-Cassetty Brick.dc.html", thumb: "assets/wwy/page-alley-cassetty-brick.jpg",
    label: "Alley-Cassetty Brick & Stone + SYSPRO", company: "Alley-Cassetty Brick & Stone", industry: "Building materials · 15 yards, 115+ trucks", erp: "SYSPRO",
    tags: ["ERP Integration", "Inventory Visibility & Adjustments", "Put-Away & Bin Transfers", "Order Picking & Fulfillment", "Fleet & Dispatch"] },

  // ——— 5-star reviews ———
  { cat: "reviews", stars: 5, label: "70% of freight request time saved",
    quote: "It saves us 70% of our freight request time.",
    figures: [{ v: "70%", k: "less time spent requesting freight" }],
    body: "Instead of emailing different carriers per shipment, the shipment details go in once and instant or spot rates come back automatically.",
    who: "Sr. Supply Chain Analyst · Wholesale", meta: "Verified review",
    tags: ["Spot Quoting & Bid Portal", "Rate Shopping", "ROI"] },

  { cat: "reviews", stars: 5, label: "Freed up a full-time logistics role",
    quote: "It has freed up our logistics person to do other things that he could not do before.",
    body: "Cites ease of operations, tracking and bill auditing. Using as many freight providers as they like keeps the competition — and the cost — in their favour.",
    who: "Distribution Center Manager", meta: "Verified review",
    tags: ["Freight Invoice Audit", "Rate Shopping", "Tracking & Notifications", "Reporting & Analytics", "Spot Quoting & Bid Portal"] },

  { cat: "reviews", stars: 5, label: "Materials reach the project without delay",
    quote: "FreightPOP has helped us achieve comprehensive supply chain management, increase confidence in material delivery times to the site, reduce downtime, and keep project activities on track.",
    who: "Planning and Project Control Engineer · Construction", meta: "Verified review",
    body: "Also cites customs paperwork and bills of lading, and alerts that reach the whole team so everyone can track orders.",
    tags: ["Tracking & Notifications", "Documents & BOL Control", "Multi-Leg Shipments"] },

  { cat: "reviews", stars: 5, label: "Multiple bookings at a time",
    quote: "Using FreightPOP every day for quoting, I can say it is very user-friendly and most importantly, it saves you a lot of time. We are able to complete multiple bookings at a time.",
    who: "Logistics Coordinator · Logistics and Supply Chain", meta: "Verified review",
    tags: ["Batch Shipping", "Rate Shopping"] },

  { cat: "reviews", stars: 5, label: "Unlimited logins",
    quote: "Unlimited logins, cloud base, simplicity.",
    who: "Director of Logistics · Automotive", meta: "Verified review",
    tags: ["ROI"] },

  { cat: "reviews", stars: 5, label: "Seamless WMS integration",
    quote: "Pretty seamless integration with VeraCore. Easy to use and feature-rich. Processes both small parcel and LTL shipments.",
    who: "Purchasing / Systems Manager · Warehousing", meta: "Verified review",
    tags: ["ERP Integration", "Parcel Shipping", "Rate Shopping"] },

  { cat: "reviews", stars: 5, label: "One system instead of many",
    quote: "Saved time on booking shipments. Saved money on freight costs. Eliminates the need to use multiple systems to get the best rates and transit times.",
    who: "Warehouse Supervisor · Computer Hardware", meta: "Verified review",
    body: "Also cites the ability to import their own carriers and rates.",
    tags: ["Rate Shopping", "Carrier Management", "ROI", "Multi-Leg Shipments"] },

  { cat: "reviews", stars: 5, label: "Daily booking process streamlined",
    quote: "FreightPOP has streamlined our daily shipment booking process increasing our overall efficiency.",
    who: "International Logistics Manager · Consumer Goods", meta: "Verified review",
    tags: ["Multi-Leg Shipments", "Order Management and Intake"] },

  { cat: "reviews", stars: 5, label: "Rate shop and tender in one flow",
    quote: "My team loves using FreightPOP. It is easy to create a shipment, rate shop it and tender it to the carrier.",
    who: "Director, Fulfillment & Logistics · Cosmetics", meta: "Verified review",
    body: "Chose FreightPOP on cost and ease of set up.",
    tags: ["Rate Shopping", "Carrier Management"] },

  { cat: "reviews", stars: 5, label: "Time and money, easily",
    quote: "You can compare time and prices, track the shipments easily and analyze the information through graphics. With this app you can save money and time easily.",
    who: "Analyst · Logistics", meta: "Verified review",
    tags: ["Rate Shopping", "Tracking & Notifications", "Reporting & Analytics"] },

  { cat: "reviews", stars: 5, label: "Fits the business perfectly",
    quote: "Ease of use! Helpful, quick support. Fits our needs for our business perfectly.",
    who: "Shipping Manager · Marketing and Advertising", meta: "Verified review",
    body: "On downsides: “Not any cons. When a problem arises, FreightPOP is quick to address.”",
    tags: ["Support", "Onboarding"] },

  { cat: "reviews", stars: 5, label: "Support answers any situation",
    quote: "Customer service is very quick to help with any situation you come up with. The web page itself is easy to use.",
    who: "Shipping Manager · Furniture", meta: "Verified review",
    tags: ["Support"] },

  { cat: "reviews", stars: 5, label: "They build what you ask for",
    quote: "They work with you to improve their software directly and make it much easier to use. They respond in a timely manner to any inquiries or issues.",
    who: "Director of Timing Technology · Sports", meta: "Verified review",
    tags: ["Support"] },

  { cat: "reviews", stars: 5, label: "Adapted to fit our needs",
    quote: "This software does exactly what I need and if I find a function that needs improvement the company responds so quickly to adapt the software to fit my needs.",
    who: "Administrator", meta: "Verified review",
    tags: ["Support"] },

  { cat: "reviews", stars: 5, label: "Good value for the investment",
    quote: "Friendly user interface, highly flexible support/development team.",
    who: "Manager, Supply Chain Analytics · Furniture", meta: "Verified review",
    body: "Review titled “Good value for the investment.”",
    tags: ["ROI", "Support"] },

  { cat: "reviews", stars: 5, label: "Every shipment captured, in and out",
    quote: "We use it everyday for every shipment both freight and parcel, it gives us a great solution to capture the data from every shipment both incoming and outgoing.",
    who: "Sr. Manager, Distribution Centers · Non-Profit", meta: "Verified review",
    body: "Cites ease of setup and how quickly the team got used to the platform.",
    tags: ["Parcel Shipping", "Inbound Order Management", "Reporting & Analytics", "Onboarding"] },

  { cat: "reviews", stars: 5, label: "50% reduction in shipping cost",
    quote: "We have already seen a 50% reduction in our shipping cost from previous year, and with 20% sales growth.",
    figures: [{ v: "50%", k: "lower shipping cost year over year" }, { v: "20%", k: "sales growth over the same period" }],
    body: "Titled “Best Decision We Made in 2023.” They compare rates to ensure they ship at the lowest rate, and audit all of their shipping invoices.",
    who: "Shipper on NetSuite", meta: "Verified review",
    tags: ["ROI", "Rate Shopping"] },

  { cat: "reviews", stars: 0, badge: "Case study", label: "Add as many carriers as we want",
    quote: "Some TMS systems charge by carrier set up, but FreightPOP allowed us to add as many carriers as we want, without adding to our monthly cost. We can try out new carriers and spot quote across multiple carriers to ensure we are getting the best rates. FreightPOP doesn't nickel and dime users for change requests or customizations — the FreightPOP team can easily and quickly adapt the software to support us.",
    who: "Christian Mannino · Director of Logistics, Elgen Manufacturing", meta: "Case study quote",
    body: "HVAC parts and metal framing, New Jersey, shipping across the US, Canada and South America.",
    tags: ["Carrier Management", "Spot Quoting & Bid Portal", "Rate Shopping", "ROI", "Support"] },

  { cat: "reviews", stars: 0, badge: "Case study", label: "The old TMS couldn't do what a TMS should",
    quote: "As a user, I didn't have the ability to make simple adjustments — any and all setting and carrier changes required reaching out to the software company to perform the updates. The system simply wasn't flexible, and couldn't perform the functions that a TMS should be able to, right out the box.",
    who: "Christian Mannino · Director of Logistics, Elgen Manufacturing", meta: "Case study quote — on their previous TMS",
    body: "Useful against incumbent TMS vendors that gate configuration behind a support ticket.",
    tags: ["Carrier Management", "Support", "Onboarding"] },

  { cat: "reviews", stars: 0, badge: "Case study", label: "The ERP is the brains, updated all day",
    quote: "Brightpearl is the brains of our entire operation — it knows our inventory levels and sales velocity. All that information is seamlessly updated across all our systems throughout the day.",
    who: "Michael Miller · Data and Integration Manager, Prima Coffee", meta: "Case study quote",
    body: "Four brands, one warehouse. Shipping used to sit outside the Brightpearl and BigCommerce stack, so every brand's freight was quoted, labeled and tracked by hand in a separate system.",
    tags: ["ERP Integration", "Order Management and Intake", "Tracking & Notifications"] },

  { cat: "reviews", stars: 5, label: "Every carrier and broker on one platform",
    quote: "FreightPOP has brought all of that into a single platform, along with new carriers and brokers, allowing us to get the best rate every time in an efficient and scalable way.",
    body: "Titled “Saved us Tons of Time!” On the ERP link: the integration “has been consistent and reliable.”",
    who: "Shipper on NetSuite", meta: "Verified review",
    tags: ["Rate Shopping", "Carrier Management", "ERP Integration"] },

  { cat: "reviews", stars: 5, label: "ERP integration took minutes",
    quote: "The actual integration portion took a matter of minutes and works seamlessly. We now save countless time and prevented countless mistakes.",
    body: "No more copying and pasting shipping data, or worrying about whether a carrier pickup was scheduled.",
    who: "Shipper on NetSuite", meta: "Verified review",
    tags: ["ERP Integration", "Order Management and Intake", "Tracking & Notifications", "Onboarding"] },

  { cat: "reviews", stars: 5, label: "Used every day to compare rates",
    quote: "I use FreightPOP everyday to compare the rates of all my shippers and make sure I'm getting the best rates on my shipment.",
    body: "Also cites it as a great place for tracking and all shipment details.",
    who: "Zagg · shipping team", meta: "Verified review",
    tags: ["Rate Shopping", "Tracking & Notifications"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Recouped the investment in 3 months",
    quote: "Overwhelmingly positive — we recouped our investment in the platform in 3 months.",
    who: "Sr. Manager, Transportation · Food & Beverages", meta: "Verified review",
    body: "He chose FreightPOP for pre-negotiated LTL rates and the ease of onboarding every transportation partner onto a single platform.",
    tags: ["ROI", "Rate Shopping", "Carrier Management"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "New hires run complex shipments in week two",
    quote: "Shipments like that took me a very long time to learn and build up to, now my team members do that their 2nd week on the job.",
    who: "Manager, Supply Chain · Medical Devices", meta: "Verified review",
    body: "On what he would change: “I love FreightPOP, I would change nothing about it.”",
    tags: ["Onboarding", "Documents & BOL Control"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Reporting revealed the cheapest carrier per product",
    quote: "The reporting allowed us to save considerable money by illuminating which carriers can deliver each kind of product at the lowest cost.",
    who: "IS Manager · Furniture, 201–500 employees", meta: "Verified review",
    body: "A single system managing custom rates across 85 carriers, from an envelope to a 450 lb custom bar delivered into a customer's home. Their API integration cut manual entry and several touches for the shipping team.",
    tags: ["Reporting & Analytics", "Carrier Management", "Order Management and Intake"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "LTL pricing down, audit already paying for itself",
    quote: "FreightPOP has supported my one person department, and has already brought our LTL pricing down.",
    who: "Logistics Manager · Building Materials", meta: "Verified review",
    body: "Ships roughly 400 flatbed and truckload shipments a month across more than 100 carriers. On invoice auditing: it “has already delivered on its part of the investment.”",
    tags: ["Rate Shopping", "Freight Invoice Audit", "Tracking & Notifications"] },

  { cat: "reviews", badge: "G2", stars: 5, label: "Bulk quoting saved days of work",
    quote: "This feature alone has saved me days of work in the last couple of months.",
    who: "Logistics lead · on the bulk quote feature", meta: "Verified review",
    body: "She quotes customers with hundreds or thousands of locations. Previously entry by entry; now a spreadsheet upload returns a line-by-line quote.",
    tags: ["Batch Shipping", "Spot Quoting & Bid Portal"] },

  { cat: "reviews", badge: "G2", stars: 5, label: "Money saved in freight and in payroll",
    quote: "It really has made a huge difference in how we manage shipments and saved us a TON of money in both shipment costs and payroll costs.",
    who: "Sales Representative · Construction", meta: "Verified review",
    tags: ["Rate Shopping", "ROI"] },

  { cat: "reviews", badge: "G2", stars: 5, label: "Keying errors virtually eliminated",
    quote: "An extra number here or there when manually keyed has killed us on shipments in the past. This problem is virtually eliminated now.",
    who: "Verified reviewer · on ERP integration", meta: "Verified review",
    tags: ["Order Management and Intake", "Order-to-Fulfillment Handoff"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Freight and parcel in one place",
    quote: "This platform has made my job so much easier! I don't have to jump back and forth between platforms anymore.",
    who: "Logistics Manager · Sporting Goods", meta: "Verified review",
    body: "Chose FreightPOP specifically because parcel and freight could be done in one platform.",
    tags: ["Parcel Shipping", "Rate Shopping", "ERP Integration"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "The software just works",
    quote: "The software just works. They have fabulous tech support.",
    who: "IT Director · Medical Devices", meta: "Verified review",
    body: "Switched from Kinetic. When they changed ERP systems, their users asked for FreightPOP back and an interface was built.",
    tags: ["Carrier Management", "Support"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "A great investment",
    quote: "Very positive, was a great investment for our company, it does exactly what we were looking for.",
    who: "SCM Analyst · Automotive, 1,001–5,000 employees", meta: "Verified review",
    body: "Cites ease of use, rate shopping across carriers, and cost tracking.",
    tags: ["ROI", "Rate Shopping", "Reporting & Analytics"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Every carrier on one platform",
    quote: "Having all carriers integrated to one platform makes for easy decision making when shipping freight.",
    who: "Logistics Specialist · Consumer Electronics, 501–1,000 employees", meta: "Verified review",
    body: "Also notes quick turnaround when adding new carriers from the pre-integrated pool.",
    tags: ["Carrier Management", "Rate Shopping"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Time, money and customer satisfaction",
    quote: "It has not only saved us time and money but has also improved our overall customer satisfaction.",
    who: "Manager · Arts and Crafts", meta: "Verified review",
    tags: ["ROI", "Tracking & Notifications"] },

  { cat: "reviews", stars: 5, label: "Two quoting steps became one",
    quote: "FreightPOP reduced our freight quoting workload from two entries to just one.",
    who: "Director of Technology · Building Materials", meta: "Verified review",
    body: "Titled “A Game Changer for LTL Freight Shippers.” One quote-and-ship platform with shared history, and more carriers in the bidding competition at no extra overhead per quote.",
    tags: ["Rate Shopping", "Spot Quoting & Bid Portal", "Carrier Management"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "International shipping got simpler",
    quote: "FreightPOP made it much easier and simpler to ship international shipments.",
    who: "System Administrator · Wholesale", meta: "Verified review",
    body: "On downsides: “None — the platform is just great.” Cites address validation, scale integration and rapid succession shipping.",
    tags: ["Multi-Leg Shipments", "Documents & BOL Control"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Answers within minutes",
    quote: "Issues are fixed promptly, questions are answered within minutes.",
    who: "Operations and Analytics · Logistics and Supply Chain", meta: "Verified review",
    body: "“The true value lies in their customer service.”",
    tags: ["Support"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Rolled out to every location at once",
    quote: "We have multiple locations and were able to roll out to all of them right away.",
    who: "Director of Equipment Management · Hospital & Health Care", meta: "Verified review",
    tags: ["Onboarding"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Easy from day one",
    quote: "Simple roll out and easy to use from day one.",
    who: "Director, Distribution & Logistics", meta: "Verified review",
    tags: ["Onboarding", "Support"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Shipping across every carrier",
    quote: "Used other TMS's but this one is the best I've found so far, especially at its price.",
    who: "Ecommerce Coordinator · Apparel & Fashion", meta: "Verified review",
    body: "Previously spent significant time calling carriers to track shipments for customers.",
    tags: ["Parcel Shipping", "Tracking & Notifications", "Rate Shopping"] },

  { cat: "reviews", stars: 5, label: "A reliable shipping history to analyze",
    quote: "Our business now has a reliable history of all of our shipping, giving us better data to analyze our process and our shipping costs.",
    who: "Shipping Specialist · Consumer Goods", meta: "Verified review",
    tags: ["Reporting & Analytics", "Freight Invoice Audit"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Accurate, and out the door on time",
    quote: "Meets our needs and allows us to ship seamlessly and gets product out of our facility to our shippers quickly.",
    who: "Branch Manager · Oil & Energy", meta: "Verified review",
    tags: ["Order Management and Intake"] },

  { cat: "reviews", badge: "Capterra", stars: 5, label: "Set up in seconds",
    quote: "Easy software to set up, literally in seconds after you sign up to their portal.",
    who: "Management · E-commerce and logistics", meta: "Verified review",
    tags: ["Onboarding"] },

  // ——— Recognition ———
  { cat: "recognition", stars: 0, label: "Ranked by Inc. seven times",
    logo: "https://www.freightpop.com/hs-fs/hubfs/Inc.%20In%20the%20News%20Logo.png",
    title: "Ranked by Inc. seven times",
    figures: [{ v: "7×", k: "Inc. rankings since 2022" }],
    body: "Inc. 5000: No. 319 in 2022 with 1,789% three-year growth and 15th in Logistics & Transportation, No. 252 in 2024 at 1,618%, No. 562 in 2025 at 732%, and named again for 2026. Inc. Regionals Pacific: ranked in 2023, 2024, 2025 and 2026, in the top 20% every year. The 2026 listing followed a record year approaching $25M revenue on roughly 800% three-year growth.",
    who: "Inc. · Inc. Regionals Pacific", meta: "2022–2026 — hold the 2026 mention until the list publishes",
    tags: ["Company"] },

  { cat: "recognition", stars: 0, label: "Best in support — G2 and Capterra",
    title: "Recognized for support, not just software",
    body: "Badged for support quality on both G2 and Capterra, earned from verified customer reviews rather than analyst opinion.",
    who: "G2 · Capterra", meta: "Awarded on customer reviews",
    tags: ["Company", "Support", "Onboarding"] },

  { cat: "recognition", stars: 0, label: "EY Entrepreneur Of The Year",
    title: "EY Entrepreneur Of The Year — winner, and a 2026 finalist",
    body: "Founder and CEO Kurt Johnson has won EY Entrepreneur Of The Year, and is a finalist again for the 2026 Pacific Southwest award.",
    who: "Ernst & Young US", meta: "Finalist, 2026",
    tags: ["Company"] },

  // ——— Platform facts ———
  { cat: "facts", badge: "Platform", stars: 0, label: "Uptime monitored against a published target",
    title: "Uptime monitored against a published target",
    body: "The platform your shipping runs on stays up. Every integration is monitored, and outages are measured against the published availability target.",
    who: "FreightPOP", meta: "Confirm whether 99.99% is a contractual SLA or an internal measurement",
    tags: ["Company"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "SOC 2 compliant",
    title: "SOC 2 compliant",
    body: "Independently audited controls covering security, availability and confidentiality — the answer to the security review your IT team will run before signing.",
    who: "Third-party audit", meta: "Confirm type and current period before sharing externally",
    tags: ["Company"] },

  { cat: "facts", badge: "Case study", stars: 0, label: "One platform for air, ocean, LTL and parcel",
    title: "A single-mode TMS could not see the whole chain",
    body: "A leading US plastics distributor serving airline and aerospace ran a TMS that only supported outbound LTL, with no way to compare parcel and LTL rates together. FreightPOP replaced it across every US location with air, ocean, LTL, parcel, inbound and outbound on one platform, and PO-linked pre-alerts keeping sales and purchasing in sync. Reported result: immediate cost savings and optimized inbound and outbound shipping through the COVID-19 demand spike.",
    who: "US plastics distributor case study", meta: "Customer-reported, no published figure",
    tags: ["Rate Shopping", "Parcel Shipping", "Inbound Order Management", "Tracking & Notifications", "Multi-Leg Shipments"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "Integrations built and maintained in-house",
    title: "No middleware between you and your ERP",
    body: "Every connection is built and maintained by FreightPOP engineers. There is no third-party integration layer to license, no second vendor to call when something breaks, and no waiting on someone else's roadmap.",
    who: "FreightPOP", meta: "Platform architecture",
    tags: ["ERP Integration", "Carrier Management", "Onboarding", "Support"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "Engineers who came from freight",
    title: "Built by people who have run freight",
    body: "The team building the product came out of logistics, not just software. It shows up in the details — the edge cases that only matter if you have actually had to tender a load or fight a chargeback.",
    who: "FreightPOP", meta: "Team background",
    tags: ["Company", "Support"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "AI built in, not bolted on",
    title: "AI in the workflow, not beside it",
    body: "Copilot assistance and background agents work inside rate shopping, dispatch, tracking and freight audit — the same screens your team already uses, rather than a separate AI product to adopt.",
    who: "FreightPOP", meta: "Product architecture",
    tags: ["Company", "Rate Shopping", "Freight Invoice Audit", "Tracking & Notifications"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "Dedicated implementation manager",
    title: "One named person owns your go-live",
    body: "Every account gets a dedicated implementation manager through onboarding — a single point of contact who knows your integration, not a ticket queue.",
    who: "FreightPOP", meta: "Standard onboarding",
    tags: ["Onboarding", "Support", "ERP Integration"] },

  { cat: "facts", badge: "Platform", stars: 0, label: "1,500+ connections, built in-house",
    title: "1,500+ carrier and system connections",
    figures: [{ v: "1,500+", k: "carriers, ERPs and systems" }],
    body: "Built with our own API technology rather than resold through an aggregator. Verifiable in the integrations catalog during the demo.",
    who: "FreightPOP platform", meta: "Verify live",
    tags: ["Carrier Management", "ERP Integration"] }
];

const FEATURE_GROUPS = [
  { name: "TMS", items: ["Shipping Rules Engine", "Carrier Management", "Rate Shopping", "Spot Quoting & Bid Portal", "Address Validator & Accessorials", "Shipment Consolidation", "Pooling & Cross-Dock", "Multi-Leg Shipments", "Batch Shipping", "Parcel Shipping", "Documents & BOL Control", "Fleet & Dispatch", "Route Optimization", "Driver App & POD", "Tracking & Notifications", "Freight Invoice Audit", "Reporting & Analytics", "Dock Scheduling"] },
  { name: "OMS", items: ["Order Management and Intake", "Product Detail & Auto Pack", "Order Consolidation", "Inbound Order Management", "Order-to-Fulfillment Handoff"] },
  { name: "WMS", items: ["Guided Receiving", "License Plating, Lot, and Serialization", "Put-Away & Bin Transfers", "Order Picking & Fulfillment", "Inventory Visibility & Adjustments", "Cycle Counting"] },
  { name: "Across the platform", items: ["ROI", "ERP Integration", "Onboarding", "Support", "Company"] }
];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "stats", label: "Headline stats" },
  { id: "reviews", label: "5★ reviews" },
  { id: "casestudies", label: "Case studies" },
  { id: "whywewon", label: "Why we won" },
  { id: "recognition", label: "Recognition" },
  { id: "facts", label: "Platform" }
];
