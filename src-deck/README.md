# src-deck — modularized deck source

Unbundled from `Presentation/TMSDeck-072026.html`. Rebuild with `npm run bundle`.

| Edit this | To change |
|---|---|
| `content/features-tms.json` | TMS modules — names, problem/benefit/demo/ROI copy |
| `content/features-wms.json` / `features-oms.json` | WMS / OMS modules |
| `content/sys-data.json` | System hub descriptions & cards |
| `content/step-names.json` | The 4 step labels |
| `content/placeholders.json` | Placeholder screens (ERP etc.) |
| `template.html` | Page markup, styles, screens, hotspots |
| `logic.js` | Navigation/state machine (views, keyboard, Rive) |
| `assets/*` | Images / Rive animation / fonts — replace a file, keep its name |

Do not remove the `@@FP_LOGIC@@` marker in template.html or the
`/*@fp-content:...*/null` markers in logic.js — the bundler fills them.
