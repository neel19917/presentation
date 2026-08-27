# Homepage Hero — FreightPOP Validation Library

Self-contained, dependency-free build of the **Validation Library** ("What customers say") from the
Claude Design project *Sales deck rate shopping demo*. Plain HTML / CSS / JS — no framework, no build step.

## Run it

The sheets load in iframes, so serve the folder over HTTP rather than opening `index.html` from disk:

```bash
cd "Homepage Hero"
python3 -m http.server 8000      # then open http://localhost:8000/
```

Any static host (Netlify, Vercel, S3, GitHub Pages, HubSpot file hosting…) works — upload the folder as-is.

Deep link a feature: `index.html?feature=Rate%20Shopping` (any tag name used in `data.js`).

## What's in the folder

| Path | Purpose |
| --- | --- |
| `index.html` | Page shell (top bar, feature rail, stage) — loads fonts, `styles.css`, `data.js`, `app.js` |
| `app.js` | All behaviour: overview, grid, board, detail, sheet preview + zoom, rail, search, keyboard |
| `data.js` | The 86 validation items + feature groups + tabs (verbatim from the design). Edit this to add/change content |
| `styles.css` | Base styles, animations, hover states |
| `Case Study - *.html` (8) | Multi-page case-study sheets (standalone; also open fine on their own) |
| `Why We Won - *.html` (15) | One-page "Why we won" sheets |
| `doc-page.js`, `image-slot.js` | Web components the sheets depend on |
| `assets/cs/`, `assets/wwy/` | Cover photos, page thumbnails, FreightPOP logo used by the sheets and cards |
| `design-source/` | Original Claude Design files (`*.dc.html`, `support.js`) for reference only — they need the Claude Design runtime and are not used by the page |

## Behaviour notes

* Tabs: Overview · Headline stats · 5★ reviews · Case studies · Why we won · Recognition · Platform.
  Grid tabs open as a card grid; picking a feature in the rail (or searching) opens the board view;
  clicking any card/quote/number/document drills into the detail view with ←/→ stepping and a 1–16 strip.
* Sheet detail: click the page (or "Enlarge") for the zoom overlay; ←/→ page through multi-page case
  studies, Esc closes. Each sheet page is rendered at a 1152 px stride (letter page + 96 px gap).
* Keyboard: ←/→ step items (or pages when zoomed), Esc closes the zoom.
* "Back to deck" links to `FreightPOP TMS Sales Deck v17.dc.html` (not included here). When the library
  is embedded in the deck with `?feature=…`, the button instead posts `{ fpCloseLib: true }` to the parent.
* The single external image is the Inc. logo on the Recognition item (loaded from freightpop.com).
* Fonts (Manrope, DM Mono, DM Sans) load from Google Fonts.

## Editing content

Everything the page shows lives in `data.js`. Each item has `cat` (tab), `label`, optional `quote`, `title`,
`body`, `figures: [{v,k}]`, `who`, `meta`, `stars`, `tags` (feature names from `FEATURE_GROUPS`), and for
documents `sheet`, `pages`, `thumb`. To add a sheet, drop the standalone HTML in this folder, add a
`page-*.jpg` thumbnail (408×528) under `assets/`, and reference both from a new item.
