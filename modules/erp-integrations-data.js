// ERP & Integrations page data
// Edit via app/edit.html (Editor) or here. Sentinels let the kit server rewrite the JSON safely.
window.FP_ERP_DATA = /*<DATA:FP_ERP_DATA>*/{
  "kicker": "FreightPOP × Your Stack",
  "title": "Ships with your ERP",
  "intro": "FreightPOP connects to the ERP you already run — natively inside it, or bilaterally through its API — plus the hardware on your dock. Rate, book, document, track and reconcile freight without leaving the system of record.",
  "links": [
    {
      "label": "All Integrations",
      "url": "https://www.freightpop.com/integrations"
    },
    {
      "label": "NetSuite SuiteApp",
      "url": "https://www.suiteapp.com/FreightPOP"
    },
    {
      "label": "Acumatica Marketplace",
      "url": "https://www.acumatica.com/marketplace/"
    },
    {
      "label": "Partner Program",
      "url": "https://www.freightpop.com/partners"
    },
    {
      "label": "Case Studies",
      "url": "https://www.freightpop.com/case-studies"
    },
    {
      "label": "Book a Demo",
      "url": "https://www.freightpop.com/demo"
    }
  ],
  "erps": [
    {
      "name": "NetSuite",
      "flavor": "native",
      "modes": "Certified SuiteApp (inside NetSuite) + bilateral",
      "tag": "Quote, rate shop, book, track and audit on the Sales Order / Item Fulfillment. AutoCalc + Auto Select Best Option, invoice audit, bi-directional sync every 10 min — no middleware. The proven alternative to native Ship Central.",
      "link": "https://www.suiteapp.com/FreightPOP"
    },
    {
      "name": "Acumatica",
      "flavor": "native",
      "modes": "Native carrier plug-in (inside Acumatica) + Plug & Play bilateral",
      "tag": "Rate shop and book from the Acumatica Sales Order; AutoCalc packaging, dual rate shop & auto-select best rate (2025 R2), per-user printers. Plug & Play adds SO / Shipment / PO / RMA import, item sync, AP + Return-to-Vendor export and tracking writeback. Certified Acumatica ISV partner."
    },
    {
      "name": "SAP S/4HANA",
      "flavor": "bilateral",
      "modes": "Bilateral (Public Cloud)",
      "tag": "Import Sales Orders and Purchase Orders; rate, book and generate documents, then write carrier, cost and tracking back. Fulfillment maps to SAP's Outbound Delivery model rather than NetSuite-style Item Fulfillment."
    },
    {
      "name": "Sage X3",
      "flavor": "bilateral",
      "modes": "Bilateral (SOAP web services)",
      "tag": "Orders flow in and out over Sage X3 SOAP pools; rate, book, print, and write carrier + tracking back to the transaction. Supports custom transaction entries (e.g. purchase-order POH) for non-standard configurations."
    },
    {
      "name": "Microsoft Dynamics 365 — Business Central",
      "flavor": "bilateral",
      "modes": "Bilateral (token auth · OData/SOAP)",
      "tag": "Token-based connection into Business Central; integrates the Posted Sales Shipment transaction for rating, booking and tracking writeback. SPS Commerce EDI bundle supported."
    },
    {
      "name": "Microsoft Dynamics 365 — Finance & Operations",
      "flavor": "bilateral",
      "modes": "Bilateral (ERP Automation / External API)",
      "tag": "Connect F&O / F&SCM through FreightPOP's ERP Automation and External API — order import, multi-carrier rating and booking, document generation, and carrier + cost + tracking writeback."
    }
  ],
  "hardware": [
    {
      "name": "Cubiscan",
      "flavor": "hardware",
      "modes": "Dimensioning & weighing · partner",
      "tag": "Capture verified dimensions and weight from the Cubiscan device straight into FreightPOP, so rating, packaging and BOLs use measured data — not guesses. Eliminates dimension mix-ups and reclass surprises at the dock. FreightPOP × Cubiscan partner enablement in progress.",
      "link": "https://cubiscan.com/"
    }
  ]
}/*</DATA:FP_ERP_DATA>*/;
