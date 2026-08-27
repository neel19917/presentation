# Code Audit — FreightPOP Sales Presentation (`beta` / `main`)

**Date:** 2026-08-27 · **Scope:** every script in the repo — 48 Claude Design component scripts (`.dc.html`), 20 inline scripts (deck static layers, 8 workflow players, ai-clips shells), 7 standalone JS files (`support.js`, `doc-page.js`, `image-slot.js`, static-port `app.js`/`data.js`), all 72 `.dc.html` templates, and a headless-Chrome load of every page plus a scripted walk through all 29 deck modules × 4 steps.

## Method

| Layer | Tool | What it catches |
|---|---|---|
| Static lint | ESLint 9 — `no-undef`, `no-redeclare`, `no-dupe-class-members`, `no-dupe-keys`, `no-const-assign`, `no-unreachable`, `no-unused-vars`, … | undeclared variables, duplicate members, dead code |
| Type check | TypeScript 5 `--allowJs --checkJs` (strict off) against a `DCLogic` declaration | type mismatches, missing properties, bad calls |
| Template ↔ logic | custom script: instantiates each `Component`, calls `renderVals()` for every view/state, diffs the returned keys against every `{{ root }}` in the template (accounting for `sc-for as=` vars and `data-props`) | bindings that render empty, dead keys, missing `dc-import` targets, missing local `src`/`href` files |
| Runtime | puppeteer-core + installed Chrome over `python3 -m http.server`: load all 75 pages; for the deck, click every hub card and step through Problem → Benefit → Live Demo (+ AI Demo where offered) → Validation; capture `pageerror`, console errors, failed/4xx requests | real crashes, eval failures, missing assets |

Re-run: `node scratchpad/audit/extract.js && eslint src/ && tsc -p tsconfig.json && node templates.js && node deckwalk.js` (tooling lives outside the repo; see this file's history for the scripts).

## Findings — fixed in this commit

| # | Severity | File | Problem | Fix |
|---|---|---|---|---|
| 1 | **Critical** | `RateShopDemo.dc.html` (module 03, the flagship demo) | `SyntaxError: Unexpected token '{'` — the `restart = (e) => {` class field had lost its body; the transport-bar methods (`_seekAbs … _fmt`) had been inserted *inside* it and the original body lines were left orphaned after `_fmt`. The dc-runtime logged **"logic class eval FAILED … the template renders with props only"** — in the live deck the demo showed a frozen frame with no animation, no captions, no cursor. | Restored the one-line `restart` body used by every other demo; removed the 6 orphaned lines. Verified headless: clock advances, captions resolve, zero errors. |
| 2 | **Critical** | `ShippingRulesDemo.dc.html` (module 01) | Identical corruption to #1. | Same fix. Verified headless. |
| 3 | Medium | `FreightPOP TMS Sales Deck v17.dc.html` | Two `componentWillUnmount()` definitions — the second (`this._portalBack()`) silently overrode the first, so the keydown listener, resize listener, `ResizeObserver`, Rive timer and Rive instance were never cleaned up. The `message` listener (`fpCloseLib`) was never removed either. | Merged into one method; added `removeEventListener("message", …)`. |
| 4 | Medium | `FreightPOP TMS Sales Deck v17.dc.html` | Template uses `ref="{{ setHotWrap }}"` but `renderVals()` never returned `setHotWrap`, so the Walkthrough hotspot wrapper ref was undefined (drag/resize fell back to `offsetParent`). | Added `setHotWrap` to `renderVals()`. |
| 5 | Medium | `FreightPOP TMS Sales Deck v17.dc.html` (Carriers + Integrations static layers) | Logos load from `https://logo.clearbit.com/<domain>` first — **that host no longer has a DNS record** (Clearbit Logo API retired). Every one of ~250 logo tiles waited on a failed lookup before falling back to Google's favicon service. | Removed Clearbit from the chain; tiles go straight to `www.google.com/s2/favicons?sz=128&domain=…` with the initial-letter fallback unchanged. Two `logoCandidates` entries (ERP One, Lighthouse SyteLine) converted to `logoDomain`. |
| 6 | Low | `SpotQuoteDemo.dc.html` | Duplicate class member `SPOT` — an array of bid objects (used by a legacy `rateRows` list) was overridden by a later array of `[carrier, nick]` pairs (used by `spotRows`). No visible effect because `rateRows` is not referenced in the template, but the override made the legacy path compute garbage. | Renamed the first to `SPOT_BIDS` and pointed its only consumer at it. |

After fixes: **ESLint 0 errors** (excluding audit-harness artefacts), **template audit 0 missing bindings / 0 missing files / 0 eval failures**, **headless walk of all 29 modules: 0 page errors, 0 console errors** (network noise aside — see below).

## Findings — not fixed (judgement calls, listed for the owner)

| # | Severity | Where | Detail | Suggested action |
|---|---|---|---|---|
| 7 | Low | deck | On first paint the raw template contains 7 `<iframe src="{{ libUrl }}">`-style elements; the browser requests the literal `{{ … }}` URLs (7 × 404) and one `<path d="{{ mapPath }}">` in RouteOptDemo logs an SVG parse error before the runtime hydrates. Harmless; the old presentation-kit branch fixed the same "unhydrated-iframe 404 flash". | Guard iframe `src` behind hydration (e.g. render iframes only after mount, or use a `data-src` pattern the runtime supports). |
| 8 | Low | deck (React hero path) | `startRive()` looks for `canvas[data-fp-hero-canvas]` inside `heroFrame`; the template has neither (the intro is the static overlay), so it re-arms a 120 ms timer forever, and the Rive runtime logs `TypeError: Cannot read properties of null (reading 'T')` once on load. Fallback paths `assets/fp_hero-background.riv` / `assets/rive.wasm` do not exist in the repo. | Delete the dead React `initHero/startRive/fitHero` code (the static overlay owns the hero), or add the missing assets. |
| 9 | Low | Carriers / Integrations | Google's favicon service returns 404 for a handful of domains (canpar.ca, cn.ca, gls-canada.com, loomis-express.com, foxerp.com) → initial-letter tile. | Host logos locally for the ~200 carriers/systems (also removes the external dependency). |
| 10 | Low | `SpotQuoteDemo.dc.html` | `a.cFocus` is read at one line (`c1/c2/c3` field styles) but never set in the initial state or any keyframe, and `c1/c2/c3` are not used by the template → dead code. | Delete the line. |
| 11 | Low | `Validation Library.dc.html` | `renderVals()` returns `tag`, `onTag`, `tagOptions`, `sheetPages` which the template never uses; the "flip card" detail layout is dead (no data item sets `flip`). Static port already dropped these. | Remove dead code. |
| 12 | Low | `Homepage Hero/app.js` | Unused variable `slug` (L36). | Remove. |
| 13 | Info | sheets | Every Case Study / Why We Won page requests `.image-slots.state.json` (404) — `image-slot.js` looking for editor-persisted state. Expected outside Claude Design; harmless. | None, or ship an empty `{}` file to silence it. |
| 14 | Info | site | No `favicon.ico` (404 on every load). | Add one. |

## Type-check result (TypeScript `checkJs`)

241 diagnostics, **none of which are real defects** after review:

- 48 × `TS2300 Duplicate identifier 'Component'` — audit artefact (every component script declares `class Component`; they never share a scope at runtime).
- 10 × `TS2451` redeclare `S5/DATA/TABS/FEATURE_GROUPS` — artefact of checking `data.js` alongside its consumer.
- 165 × `TS2339` "Property X does not exist" — DOM typing noise (`Element` vs `HTMLElement` `.style`/`.value`/`.src`), custom-element private members (`_ensurePrintSizingMeta`…), expando flags (`__fpInit`, `__fpDone`, `__host`), and `fitGrid()` fields assigned after object creation (`showSub`, `tagRows`, `maxTags`, `wellH`).
- 9 × `TS2551` `webkitFullscreenElement` / `webkitExitFullscreen` — intentional vendor-prefixed fallbacks.
- 4 × `TS2365` arithmetic on `string | number` — tuple literals like `["PO Number", 150]` inferred as union; widths are numeric at runtime.
- 2 × `TS2304 fpStaggerIn` — defined on `window` by a sibling inline script.
- 2 × `TS2769` `.concat()` with an extra `isNew` field — union widening, fine.
- 1 × `TS2345` in generated `support.js`.

`no-undef` hits for `DATA/TABS/FEATURE_GROUPS/S5` (cross-file globals from `data.js`), `createImageBitmap` and `BroadcastChannel` (browser globals) are likewise false positives.

## Verdict

**Good to go** for the sales deck, all 43 demos, the Validation Library and the sheets, with items 1–6 fixed. Items 7–14 are cleanliness/performance and can be scheduled. External dependencies that remain live and reachable as of this audit: the three Netlify embeds (walkthrough, platform menu, FreightPOP AI), the HubSpot-hosted Rive file, `app.freightpop.com` deep links, Google Fonts, unpkg (React), Google favicon service.
