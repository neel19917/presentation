// ROI / Value page data
// Edit via app/edit.html (Editor) or here. Sentinels let the kit server rewrite the JSON safely.
window.FP_ROI_DATA = /*<DATA:FP_ROI_DATA>*/{
  "kicker": "FreightPOP · Value",
  "title": "The ROI of one platform",
  "intro": "One login replaces the carrier portals, the spreadsheets, the manual audit and the re-keying. Here is what that has been worth to shippers already running FreightPOP — and a live estimate for a shipper your size.",
  "results": [
    {
      "stat": "$500K",
      "label": "saved per year on freight",
      "source": "GrowGeneration"
    },
    {
      "stat": "10×",
      "label": "return on the FreightPOP investment",
      "source": "GrowGeneration"
    },
    {
      "stat": "50%",
      "label": "lower shipping cost while doubling volume",
      "source": "Uneekor"
    },
    {
      "stat": "95%",
      "label": "faster order processing",
      "source": "Everflow"
    }
  ],
  "estimator": {
    "intro": "Drag to match your operation — the estimate updates live.",
    "inputs": [
      {
        "key": "shipments",
        "label": "Shipments per month",
        "min": 100,
        "max": 20000,
        "step": 100,
        "value": 2000,
        "fmt": "int"
      },
      {
        "key": "avgCost",
        "label": "Average freight cost / shipment",
        "min": 40,
        "max": 1200,
        "step": 10,
        "value": 180,
        "fmt": "usd"
      },
      {
        "key": "rateShop",
        "label": "Rate-shopping savings",
        "min": 0,
        "max": 25,
        "step": 1,
        "value": 12,
        "fmt": "pct",
        "help": "Savings from comparing every carrier + auto-selecting the best compliant rate."
      },
      {
        "key": "audit",
        "label": "Invoice-audit recovery",
        "min": 0,
        "max": 8,
        "step": 1,
        "value": 2,
        "fmt": "pct",
        "help": "Overcharges recovered when every carrier invoice is audited against the booked rate."
      }
    ],
    "disclaimer": "Illustrative estimate from the inputs above — not a guarantee. Rate-shopping and audit-recovery percentages vary by lane mix, carrier contracts and current process."
  },
  "links": [
    {
      "label": "Customer Success",
      "url": "https://www.freightpop.com/customer-success"
    },
    {
      "label": "Case Studies",
      "url": "https://www.freightpop.com/case-studies"
    },
    {
      "label": "Book a Demo",
      "url": "https://www.freightpop.com/demo"
    }
  ]
}/*</DATA:FP_ROI_DATA>*/;
