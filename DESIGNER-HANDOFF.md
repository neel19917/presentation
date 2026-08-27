# FreightPOP Sales Presentation — Designer Handoff & System Reference

**Source folder:** `~/Desktop/FreightPOP/homepage Hero/`
**Compiled:** 2026-08-27
**Audience:** a visual / product designer joining the project who has never opened a Claude Design file. This document explains what the presentation *is*, how it is put together, every screen and component in it, the exact tokens it uses, where the content lives, and where the design has drifted. It is written so a designer can rebuild any screen in Figma (or restyle the real thing) without opening the code.

> **How to use this document.** Part 1 is the orientation (read it first, ~10 minutes). Part 2 is the main sales deck, screen by screen. Part 3 is the design system (colors, type, spacing, motion, components) consolidated from every file. Part 4 covers the 43 "cooking demo" mini-apps that play inside the deck. Part 5 covers the Validation Library (customer proof) and the Case Study / Why-We-Won sheets. Part 6 is the static web port. Part 7 lists drift, gaps and recommendations. Appendices hold the raw catalogs (every file, every string, every color).

---

## Table of contents

- **Part 1 — Orientation**
  - 1.1 What this presentation is (in one paragraph)
  - 1.2 The three layers: deck → module flow → embedded demo
  - 1.3 What a `.dc.html` file is (Claude Design format), and how the runtime renders it
  - 1.4 Folder map, at a glance
  - 1.5 Glossary
- **Part 2 — The Sales Deck (`FreightPOP TMS Sales Deck v17.dc.html`)**
  - 2.1 Information architecture and the view state machine
  - 2.2 Global chrome: top nav, breadcrumb, Live Site pill, Menu
  - 2.3 Screen: Intro (static overlay, 1920×1080 frame, Rive orb, logo marquee)
  - 2.4 Screen: Interactive Walkthrough (embedded Netlify)
  - 2.5 Screen: Main Menu (embedded Netlify + hotspots)
  - 2.6 Screen: TMS Hub (18 module cards)
  - 2.7 Screen: WMS / OMS Capability Hubs
  - 2.8 Screen: Feature sub-flow — Problem / Benefit / Live Demo / Validation
  - 2.9 Screen: Workflows hub + Workflow player
  - 2.10 Screen: Carrier Integrations (static layer)
  - 2.11 Screen: ERP & System Integrations (static layer) + per-integration detail page
  - 2.12 Screen: Product Roadmap
  - 2.13 Screen: Onboarding
  - 2.14 Screen: FreightPOP AI (embedded)
  - 2.15 Screen: Live Site
  - 2.16 Overlay: Jump-to menu
  - 2.17 Overlay: Validation Library
  - 2.18 Complete module content — TMS (18), WMS (6), OMS (5)
  - 2.19 Evidence grades (Measured / Reported / Modeled / Platform)
  - 2.20 Keyboard, fullscreen and paging behavior
  - 2.21 External dependencies and URLs
- **Part 3 — Design System (consolidated)**
  - 3.1 Color tokens
  - 3.2 Typography
  - 3.3 Spacing, radii, borders, shadows
  - 3.4 Motion
  - 3.5 Component library (deck-side)
  - 3.6 Component library (demo-side / FreightPOP app chrome)
  - 3.7 Iconography
  - 3.8 Brand token reference (from `uploads/FreightPOP Brand Token Reference.html`)
- **Part 4 — Cooking Demos (43 mini-apps)**
  - 4.1 What a cooking demo is · 4.2 Shared anatomy · 4.3 Catalog (TMS 20 · OMS 9 · WMS 10 · AI 4 · ai-clips kit) · 4.4 Nav variants · 4.5 Wiring summary
- **Part 5 — Validation Library, Case Studies, Why We Won**
  - 5.1 Shared sheet chassis · 5.2 Case Study anatomy + per-study table · 5.3 Why We Won anatomy + per-sheet table · 5.4 Library data model · 5.5 Library UI · 5.6 Internal audit (24 findings) · 5.7 Validation & ROI Plan · 5.8 Transition Preview
- **Part 6 — Static port (`Homepage Hero/`)**
  - 6.1 Files · 6.2 Layout shell · 6.3 Views · 6.4 styles.css · 6.5 doc-page / image-slot
- **Part 7 — Drift, gaps, and recommendations**
  - 7.1 Content/claims · 7.2 Colour · 7.3 Type · 7.4 Deck layout · 7.5 Demos · 7.6 Sheets · 7.7 Port · 7.8 Recommended sequence
- **Appendices**
  - A. Complete file inventory
  - B. Every external URL
  - C. Color frequency tables
  - D. Runtime (`support.js`) reference for developers
  - E. Supporting materials (`uploads/`, `ai-clips/`, `scraps/`, `extracted/`, `notes/`)

---

# Part 1 — Orientation

## 1.1 What this presentation is

This folder is a **self-running, browser-based sales presentation for FreightPOP** — a TMS / WMS / OMS ("AI Supply Chain Software") vendor. It is not a slide deck in the PowerPoint sense. It is a single-page web application, authored in **Claude Design** (`.dc.html` files), that a sales rep drives with the arrow keys or a mouse during a live call. It opens on a full-bleed animated intro ("AI Supply Chain Software — Intelligence that moves your supply chain"), moves to an interactive product walkthrough, then to a platform menu with four systems (TMS, WMS, OMS, ERP), and from there into a **module library**: 18 TMS modules, 6 WMS modules, 5 OMS modules. Every module follows the same four-beat story — **Problem → Benefit → Live Demo → Validation** — where the "Live Demo" beat plays a hand-built, animated replica of the real FreightPOP screen (a "cooking demo"), and the "Validation" beat opens a searchable library of customer proof (G2 quotes, headline stats, case-study PDFs rendered as HTML sheets, and one-page "Why We Won" competitive summaries). Around the module library sit supporting sections: Workflows (8 end-to-end flows), Carrier Integrations (a searchable grid of ~200 carriers across 8 modes), ERP & System Integrations (54 systems with per-integration detail pages), Product Roadmap (9 AI + 4 platform initiatives), Onboarding (6 steps), a FreightPOP AI embed, and a link to a live ROI intake form.

The whole thing is dark-themed (navy `#051729`), uses three Google fonts (**Manrope** for display, **DM Sans** for body, **DM Mono** for labels/eyebrows), and one accent (**teal `#3DD6B5`**) with a secondary blue (`#4088CF`). It is designed for a 16:9 laptop/projector at roughly 1440×810 to 1920×1080.

## 1.2 The three layers

It helps to think of the presentation as three nested layers:

| Layer | What it is | File(s) | Who designs it |
|---|---|---|---|
| **1. Deck shell** | Navigation, hubs, module flow, roadmap, onboarding, integrations. Dark brand theme. | `FreightPOP TMS Sales Deck v17.dc.html` | Brand/marketing design |
| **2. Cooking demos** | 43 mini-apps that replicate real FreightPOP app screens (light theme, mirrors the product UI) and auto-play a scripted scenario with a caption bar. Mounted inside the deck's "Live Demo" step via `<dc-import name="…">`. | `*Demo.dc.html` (43 files) + `Cooking Demo Reference.dc.html` | Product-UI-faithful design (see CLAUDE.md rule below) |
| **3. Proof library** | The Validation Library (tabbed, searchable proof browser) and the documents it opens: 8 multi-page Case Study sheets and 15 one-page Why We Won sheets, letter-size, print-styled. Loaded in an iframe from the deck's "Validation" step. | `Validation Library.dc.html`, `Case Study - *.dc.html` (8), `Why We Won - *.dc.html` (15), plus the static port in `Homepage Hero/` | Editorial/print design |

A non-negotiable project rule (from `CLAUDE.md`) governs layer 2:

> When the user supplies a screenshot of a FreightPOP screen, mirror it VERY closely in every cooking demo and AI demo: same page title and tabs, same toolbar buttons in the same order, same card titles, same field labels and layout, same column set, same row action icons, same footer/pager, same modal structure and button labels. Do not invent cards, columns, chips, status badges, panels or confirmation windows that are not in the real UI. If a piece of information has no home in the real screen, leave it out and let the rep speak to it.

So: **layer 1 and layer 3 are brand-expressive; layer 2 is deliberately un-creative** — it must look like the product, not like the deck.

## 1.3 What a `.dc.html` file is

Every `.dc.html` file is a Claude Design "component document". Structurally it is a normal HTML file with four parts:

1. **`<head>`** — loads the runtime: `extracted/2f9f3ff0-….js` (React + ReactDOM bundle) and `extracted/d4de3b32-….js` (the `dc-runtime`, also present un-minified as `support.js`).
2. **`<x-dc><helmet>…</helmet>`** — the "helmet" holds `@font-face` declarations (fonts are vendored into `extracted/*.woff2`), global `<style>` (resets, scrollbars, `@keyframes`), and `<link rel="preconnect">` tags.
3. **`<x-dc>` template body** — plain HTML with **inline styles** (there are almost no CSS classes anywhere in the project; every element carries a full `style="…"` string) plus a tiny template language:
   - `{{ expr }}` — binds text or an attribute to a value returned from the component's `renderVals()`.
   - `<sc-if value="{{ bool }}">…</sc-if>` — conditional render. `hint-placeholder-val` tells the editor which branch to show at design time.
   - `<sc-for list="{{ arr }}" as="x">…</sc-for>` — repeat. `hint-placeholder-count` tells the editor how many to fake.
   - `style-hover="…"` — hover-state styles, applied by the runtime.
   - `ref="{{ fn }}"`, `onclick="{{ fn }}"` — DOM refs and handlers.
   - `<dc-import name="RateShopDemo" hint-size="100%,580px">` — mounts another `.dc.html` file (by file name, minus extension) inline, as a child component. This is how the deck embeds the 43 demos.
   - `data-screen-label="…"` — names a screen for the Claude Design editor's screen list.
4. **`<script type="text/x-dc" data-dc-script data-props="{…}">`** — a `class Component extends DCLogic` with React-like `state`, `setState`, lifecycle methods, and a `renderVals()` that returns the bag of values the template binds to. `data-props` declares designer-editable props (`editor: "text" | "boolean"`, `default`, `section`) that show up as controls in the Claude Design properties panel.

**Consequence for a designer:** there is no stylesheet to restyle. Colors, sizes and spacing are repeated inline thousands of times. Part 3 of this document is the *de facto* token sheet extracted from those inline strings; any redesign should start by agreeing on that token sheet, then either (a) re-authoring in Claude Design with the new values, or (b) porting to a real stylesheet as was done for the Validation Library in `Homepage Hero/`.

## 1.4 Folder map

```
homepage Hero/                             (174 MB, ~700 files)
├── FreightPOP TMS Sales Deck v17.dc.html   ← THE DECK (223 KB, 2,701 lines)
├── Cooking Demo Reference.dc.html          ← rules + patterns for building demos
├── *Demo.dc.html  ×43                      ← cooking demos (TMS/WMS/OMS/AI/Fleet/Admin)
├── Validation Library.dc.html              ← proof browser (110 KB)
├── Validation Library (internal audit).dc.html
├── Validation & ROI Plan.dc.html
├── Transition Preview.dc.html
├── Case Study - *.dc.html  ×8              ← multi-page letter sheets
├── Why We Won - *.dc.html  ×15             ← one-page letter sheets
├── support.js                              ← dc-runtime, readable source (1,841 lines)
├── doc-page.js / image-slot.js             ← web components used by the sheets
├── deck_bundle.html                        ← bundling shell
├── CLAUDE.md                               ← project rule (UI fidelity)
├── Homepage Hero/                          ← static, framework-free port of the Validation Library (git repo)
│   ├── index.html · app.js · data.js · styles.css
│   ├── Case Study - *.html ×8 · Why We Won - *.html ×15
│   ├── assets/cs/ · assets/wwy/            ← hero photos + 408×528 page thumbnails
│   └── design-source/                      ← copies of the .dc.html originals
├── extracted/                              ← vendored fonts (12 woff2), logos (14 png), runtime js
├── uploads/                                ← reference screenshots (~90 png), 8 workflow HTML players, brand token reference, source PDFs, videos
├── ai-clips/                               ← standalone React "AI agent" clips (rate-shop, invoice-audit)
├── assets/                                 ← misc demo media (maps, POD photo, rate-shop mp4)
├── screenshots/                            ← QA screenshots of demos (fleet calendar, route-opt menu, tracking icons…)
├── scraps/                                 ← working files (deck-clean.html, autopack frames, case-study PDFs)
└── notes/                                  ← WMS transcript distillations (license plating, lot, serial, RMA)
```

## 1.5 Glossary

| Term | Meaning in this project |
|---|---|
| **Deck** | `FreightPOP TMS Sales Deck v17.dc.html` — the shell app. |
| **Module / Feature** | One capability (e.g. "Rate Shopping"). 18 TMS + 6 WMS + 5 OMS = 29 total. |
| **Step** | One of the four beats inside a module: 01 Problem, 02 Benefit, 03 Live Demo, 04 Validation. |
| **Cooking demo** | A scripted, auto-playing replica of a FreightPOP screen, built as its own `.dc.html`, mounted at Step 03. Named after cooking-show "here's one I made earlier". |
| **AI demo** | A cooking demo variant showing the FreightPOP AI copilot/agent acting on the screen. Four are `.dc.html` (`AiAccessorialAgentDemo`, `AiAuditingDemo`, `AiAutoConsolidationDemo`, `AiCopilotDemo`); two are iframe clips (`ai-clips/rate-shop.html`, `ai-clips/invoice-audit.html`). |
| **Validation Library** | The tabbed proof browser opened at Step 04, filtered to the module's feature tag. |
| **Sheet** | A letter-size (8.5×11 in) HTML document — Case Study (multi-page) or Why We Won (one page) — rendered with `<doc-page>` web components. |
| **Hub / Pillar page** | A grid-of-cards landing (TMS Hub, WMS Hub, OMS Hub, Workflows). |
| **Static layer** | A section rendered *outside* the React app as plain DOM (Intro, ERP Guide, Carrier Guide), toggled by polling which `<section data-screen-label>` is visible. |
| **Eyebrow** | The small DM Mono uppercase label with a 26×1.5 px teal dash before it (e.g. "FREIGHTPOP TMS · MODULE LIBRARY"). |
| **Evidence grade** | The colored pill on Step 04: Measured / Reported / Modeled / Platform. |
| **dc-runtime** | The JS that turns `.dc.html` into a React app (`support.js`). |


---

# Part 2 — The Sales Deck

File: `FreightPOP TMS Sales Deck v17.dc.html` · 223 KB · 2,701 lines · helmet ends at line 300, template lines 301–841, static layers 843–1525, component script 1529–2699.

## 2.1 Information architecture and the view state machine

The deck has a single piece of state that decides what is on screen: `state.view`. Everything else (which module `fi`, which step `step`, which system `sysKey`, overlays `menuOpen`, `liveOn`, `aiOn`, `demoExpanded`, workflow index `wfi`) is scoped inside a view.

```
intro ──→ explore ──→ mainmenu ──┬──→ hub (TMS, 18 cards) ──→ feature(tms, fi, step 0..3)
  ▲          ▲            ▲      ├──→ wms (6 cards)        ──→ feature(wms, fi, step 0..3)
  │          │            │      ├──→ oms (5 cards)        ──→ feature(oms, fi, step 0..3)
  └──────────┴────────────┘      ├──→ erp        (static ERP Integration Guide layer)
     Back / Esc / ←              ├──→ carriers   (static Carrier Network layer)
                                 ├──→ workflows ──→ workflows + wfi≥0 (Workflow Player)
                                 ├──→ roadmap
                                 ├──→ onboarding
                                 ├──→ ai         (iframe)
                                 ├──→ livesite   (iframe; returns to preLiveView)
                                 └──→ ROI        (window.open, new tab)

feature step 3 (Validation) additionally opens the Validation Library overlay (iframe) on top.
menuOpen (Jump-to) is an overlay available from every non-intro view.
```

**Linear "presentation" path** (what ArrowRight does): `intro → explore → mainmenu → hub → feature[0].step0 → step1 → step2 → step3 → hub`. In a feature, ArrowRight advances the step; after step 4 it returns to the hub ("Back to modules" / "Next module" button decides). Every non-linear section is reached from the Main Menu hotspots, the top nav links, or the Jump-to menu.

**Views and the screens they render** (from `data-screen-label`):

| `view` | Screen label | z-index | Background | Notes |
|---|---|---|---|---|
| `intro` | Intro | 500 (static overlay) | `#051729` | Rendered outside React as `#fpIntroOverlay`; the React `<section>` is an empty 10-z placeholder the overlay polls. |
| `explore` | Interactive Walkthrough | 20 | `#051729` | iframe to `startUrl` prop (default `https://tubular-flan-14267b.netlify.app/embed.html`). Four draggable/resizable hotspot rectangles (TMS/WMS/OMS/ERP) persisted in `localStorage["fpWtHotspots_v7"]`. |
| `mainmenu` | Main Menu | 20 | `#051729` | iframe to `https://idyllic-elf-b22a7e.netlify.app/`; four fixed click hotspots (left 6.1%/right 10%, top 3.2%/bottom 0.9%, 30.2% × 19–19.5%). |
| `hub` | TMS Hub | 20 | `#051729` | 3-col grid, 18 cards. |
| `wms` / `oms` | System Capabilities | 20 | `#051729` | 3-col grid, 6 / 5 cards. Same card component as hub with a `tag` line. |
| `erp` | System Placeholder | 20 | `#051729` | React section is empty (radial gradients only); the static `#fpErpGuide` layer draws the real content on top (z 100, top 53 px). |
| `carriers` | Carriers | 20 | `#051729` | Same pattern: empty React section, static `#fpCarrierGuide` on top. |
| `feature` | Feature | 20 | alternates `#051729` (even `fi`) / `#0A2540` (odd `fi`) | Steps rendered via four `sc-if` variants of the step rail. |
| `workflows` (wfi −1) | Workflows | 20 | `#051729` | 3-col grid, 8 cards (copy says "Eight flows…"). |
| `workflows` (wfi ≥0) | Workflow Player | 20 | `#051729` | iframe to `uploads/0N-….html?theme=deck`. |
| `roadmap` | Roadmap | 20 | `#051729` | Two horizontal timelines: 9 AI + 4 Platform. |
| `onboarding` | Onboarding | 20 | **`#0A2540`** (only pillar page on the lighter navy) | 6-step horizontal timeline. |
| `ai` | FreightPOP AI | 20 | `#051729` | iframe to `aiUrl` (default `https://genuine-conkies-86b264.netlify.app/`). |
| `livesite` | Live Site | 20 | `#051729` / iframe bg `#fff` | iframe to `https://app.freightpop.com/app/#/quote-ship`. |
| — | Validation Library overlay | 400 | `#051729` | iframe `Validation Library.dc.html?feature=<tag>`; shown when `view==="feature" && step===3`. |
| — | Jump-to menu | 400 | `rgba(2,16,29,.95)` + blur 14 | `menuOpen`. |

The root element is `height:100vh; width:100vw; overflow:hidden; background:#051729; font-family:'DM Sans'` with `touch-action:pan-y`. Every screen is `position:absolute; inset:0` and scrolls internally (`overflow-y:auto`). Pillar pages use `padding:104px 48px 56px` (104 = 53 px nav + 51 px breathing room); the Feature page uses `padding:96px 48px 96px` (bottom room for the step-dots pill). Content is centred at `max-width:1200px` (Roadmap and Onboarding widen to `1320px`; the static guides to `1700px`).

**Background atmosphere.** Every pillar page has the same two radial gradients under the content, pointer-events none:

```
radial-gradient(640px 640px at 82% -6%, rgba(64,136,207,.30), rgba(64,136,207,.12) 42%, transparent 70%),
radial-gradient(560px 560px at 6% 108%, rgba(61,214,181,.10), transparent 65%)
```
— a blue glow top-right, a faint teal glow bottom-left. The Feature page uses a slightly smaller pair (`620px at 86% -8%` / `520px at 4% 110%`), Onboarding a larger one (`700px at 88% 0%` at `.34`). The ERP/Carriers placeholder uses `680px at 50% -12%` (centred). A designer recreating this in Figma: two soft ellipses, blue `#4088CF` @ 30 % → 0, teal `#3DD6B5` @ 10 % → 0.

## 2.2 Global chrome

### 2.2.1 Top nav (`<nav>`, visible on every view except Intro)

- Position: `absolute; top:0; left:0; right:0; z-index:200`.
- Box: `padding:14px 36px; background:rgba(5,23,41,.82); backdrop-filter:blur(12px); border-bottom:1px solid rgba(255,255,255,.08)`. Rendered height ≈ **53 px** (this number is hard-coded everywhere as the offset for content below: `top:53px`, `padding-top:53px`).
- Layout: three flex groups, `justify-content:space-between; gap:24px`.

**Left group** (`gap:14px; min-width:200px`):
1. **Back button** — `display:flex; gap:7px; color:#FFFFFF; font-size:12px; font-weight:500; padding:8px 13px; border:1px solid rgba(255,255,255,.16); border-radius:6px`. Hover: `border-color:rgba(61,214,181,.5); color:#3DD6B5`. Icon: 14 px chevron-left, stroke 2.2. Label "Back". Behaviour is contextual (`goBack`): explore→intro, workflow player→workflows grid, mainmenu→explore, hub→mainmenu, feature→its hub, anything else→mainmenu.
2. **FreightPOP logo** — `extracted/25e71771-….png`, `height:20px`, click → Intro.
3. **Divider** — `1×18px rgba(255,255,255,.18)`.
4. **Breadcrumb** — DM Mono 11 px, `letter-spacing:.05em`, uppercase. Crumb 0 and crumb 1 in `#7A96B0`, separators "/" in `#3D5670`, the leaf in `#3DD6B5` (ellipsised). Examples: `MAIN MENU / TRANSPORTATION MANAGEMENT / Rate Shopping`, `MAIN MENU / WORKFLOWS / Standard Outbound`, `INTERACTIVE WALKTHROUGH`.

**Centre group** — 12 nav links, horizontally scrollable with hidden scrollbar (`gap:2px`):
`Walkthrough · Main Menu · TMS · WMS · OMS · Workflows · Carriers · Integrations · Roadmap · Onboarding · FreightPOP AI · ROI`.
- Idle: `padding:7px 11px; border-radius:6px; font-size:12px; font-weight:500; color:#B5CDE0`. Hover: `color:#3DD6B5`.
- Active: `color:#3DD6B5; background:rgba(61,214,181,.10); box-shadow:inset 0 0 0 1px rgba(61,214,181,.35)`.

**Right group:**
1. **Live Site pill** — `gap:8px; color:#3DD6B5; font-size:12px; font-weight:500; padding:8px 14px; border:1px solid rgba(61,214,181,.38); background:rgba(61,214,181,.10); border-radius:6px; margin-right:8px`. Leading 7 px teal dot with `box-shadow:0 0 0 3px rgba(61,214,181,.22)` (a "live" indicator). Trailing 12 px external-link icon. Hover: `background:rgba(61,214,181,.20); border-color:rgba(61,214,181,.65)`.
2. **Menu button** — same shape as Back (`padding:8px 14px`, white, `rgba(255,255,255,.16)` border), 14 px 2×2 grid icon, label "Menu". Toggles the Jump-to overlay.

### 2.2.2 Eyebrow (section label) — used on every pillar page

```
font-family:'DM Mono'; font-size:12px; font-weight:500; letter-spacing:.16em; text-transform:uppercase; color:#3DD6B5; margin-bottom:16px;
display:flex; align-items:center; gap:11px;
  ├─ <span> width:26px; height:1.5px; background:#3DD6B5   (leading dash)
  └─ text, e.g. "FreightPOP TMS · Module Library"
```
Inside a feature, the sub-eyebrow is smaller: `font-size:11px; letter-spacing:.14em; gap:10px`, dash `22×1.5px` ("The Problem", "The Benefit", "Live Demo", "Validation & ROI").

### 2.2.3 Page header block

```
display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:40px;
  ├─ <h1> Manrope 400, 58–60px, line-height 1.02, letter-spacing -.02em, #fff, margin 0
  └─ <p>  DM Sans 300, 16px, line-height 1.5, #B5CDE0, max-width 380–460px
```
Sizes by page: TMS Hub 60 px; WMS/OMS hub 58 px; Workflows 58 px; Roadmap 54 px; Onboarding 54 px; ERP/Carrier guides 48 px; per-integration detail 44 px.

### 2.2.4 Floating pills (bottom-left/right controls on iframe screens)

- **Fullscreen pill** — `position:absolute; bottom:26px; left:26px; padding:11px 18px; border-radius:999px; background:rgba(5,23,41,.82); border:1px solid rgba(255,255,255,.22); color:#fff; DM Mono 11px; letter-spacing:.10em; uppercase` → "⛶ Fullscreen". On Live Site there is also "← Back to deck" at `left:26px` and Fullscreen shifted to `left:196px`.
- **Next-section CTA** (Walkthrough only) — `bottom:26px; right:26px; padding:15px 26px; background:#3DD6B5; border-radius:999px; color:#051729; DM Sans 15px 500; box-shadow:0 10px 30px rgba(61,214,181,.35)`. Two-line label: tiny DM Mono 9 px uppercase "NEXT SECTION" over "Main Menu", plus a 22×13 arrow.

## 2.3 Screen: Intro

The intro is **not** part of the React tree. It is a fixed overlay `#fpIntroOverlay` (`position:fixed; inset:0; z-index:500; background:#051729; display:flex; center`) containing a **fixed 1920×1080 frame** `#fpFrame` that is `transform: scale(min(vw/1920, vh/1080))` to fit the window — i.e. the intro is a true 16:9 artboard, letter-boxed. This is the only screen designed at a fixed pixel size; everything else is fluid.

Layers inside the 1920×1080 frame:

| z | Element | Spec |
|---|---|---|
| 0 | `<canvas id="fpHeroCanvas">` | **Rive** animation `fp_hero-background.riv` (artboard "Main", state machine "State Machine 1", `Fit.Layout/Cover`, centred). Loaded from `https://info.freightpop.com/hubfs/FP Sales Assets/2026 Assets/Rive - Marketing Use Only/fp_hero-background.riv`. This is the moving "orb" background. |
| 3 | URL caption | `top:52px; left:72px` — "www.freightpop.com", DM Sans 23 px 500, `letter-spacing:.5px`, `#B5CDE0`. |
| 3 | Logo | `top:46px; right:64px; width:248px` — FreightPOP wordmark, white, inline base64 PNG (257×50). |
| 2 | Headline block (centred) | `<h1>` "AI Supply Chain Software" — Manrope **400, 108 px**, line-height 1.05, letter-spacing −.02em, white. `<p>` "Intelligence that moves your supply chain" — DM Sans 400, 36 px, line-height 1.4, `#B5CDE0`, `margin-top:22px`. |
| 2 | CTA | `margin-top:78px` — "Get Started" + 26×14 arrow. `padding:20px 44px; border-radius:6px; background:#3DD6B5; color:#051729; DM Sans 20px 500; box-shadow:0 8px 30px rgba(61,214,181,.40)`. Hover bg `#5FE0C4`. Pulses: `fpPulse 3.2s ease-in-out 3.4s infinite` (shadow 30 px @.40 → 44 px @.70). Click → dispatches ArrowRight → `explore`. |
| 2 | Logo marquee | `bottom:48px`, full width. 11 customer logos, each `padding:0 68px; opacity:.8`, heights 42–80 px (most 46 px), `filter:brightness(0) invert(1)` (forced white) except one (`9577c1e1…png`, 80 px, `filter:none`). Track is cloned once and translated `−oneSet/1200 px per frame` (≈ 20 s per loop at 60 fps). Prop `showMarquee` (boolean) can hide it. |

**Sequenced fade-ins** (`data-fp-fade="delay,duration,translateUp"`, cubic ease-out `1−(1−k)^3`):
- Headline block: delay 600 ms, 1300 ms, rises 16 px.
- CTA: delay 2000 ms, 1200 ms, rises 16 px.
- URL caption + logo: delay 3400 ms, 1200 ms.
- Marquee: delay 3900 ms, 1300 ms.

Total intro choreography ≈ 5.2 s before everything is settled; CTA pulse begins at 3.4 s.

Visibility is polled every 250 ms: the overlay shows whenever the React `<section data-screen-label="Intro">` is displayed, and hides for 800 ms immediately after the CTA is clicked to avoid flicker. The Rive instance pauses when hidden.

## 2.4 Screen: Interactive Walkthrough (`explore`)

- Full-bleed iframe (`padding-top:53px`) to the `startUrl` prop — a separately hosted Netlify build of the FreightPOP interactive product tour. **Not in this folder**; treat as an external dependency.
- Over the iframe: a `pointer-events:none` wrapper at `top:53px` holding four hotspot `<div>`s (`pointer-events:auto; border-radius:12px; cursor:pointer`) positioned in **percent** of the wrapper. Defaults: TMS `l 11.5 t 15.9 w 30.2 h 17`, WMS `l 57.2 t 15.9`, OMS `l 11.5 t 66.0`, ERP `l 57.2 t 66.0`. The hotspots have `onDown`/`onResize` handlers wired (pointer-capture drag; saved to `localStorage`), but the template only binds `onclick`, so in v17 they are click-through targets only.
- Bottom-right "Next section → Main Menu" CTA; bottom-left Fullscreen pill.
- Keyboard: → / PageDown → Main Menu; ← / Esc → Intro.

## 2.5 Screen: Main Menu (`mainmenu`)

- iframe to `https://idyllic-elf-b22a7e.netlify.app/` — a 2×2 "platform · 4 systems" graphic (TMS / WMS / OMS / ERP). Also external.
- Four fixed hotspots (no drag): TMS top-left, WMS top-right, OMS bottom-left, ERP bottom-right. Each `30.2%` wide, `19–19.5%` tall; left column at `left:6.1%`, right column at `right:10%`; top row `top:3.2%`, bottom row `bottom:0.9%`. Titles ("Transportation Management", "Warehouse Management", "Order Management", "ERP Integrations") appear as tooltips.
- Fullscreen pill bottom-left. Keyboard: → → TMS Hub; ← / Esc → Walkthrough.

## 2.6 Screen: TMS Hub (`hub`)

- Eyebrow: "FreightPOP TMS · Module Library".
- H1 (60 px): "Transportation Management".
- Lede (max 380 px): "Eighteen capabilities, one platform — rated 4.8/5 on G2 and 4.7/5 on Capterra. Open a module to see the problem it kills, the payoff, a live demo, and the proof."
- **Card grid**: `grid-template-columns:repeat(3,1fr); gap:24px`, 18 cards (6 rows).

**Module card** (the most-reused component in the deck):
```
background:#0A2540; border:1px solid rgba(255,255,255,.10); border-radius:16px; padding:24px;
display:flex; flex-direction:column; gap:16px; min-height:190px;
box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
transition: transform/border-color/background-color/box-shadow 200ms cubic-bezier(.2,0,0,1)

hover: transform:translateY(-4px); border-color:rgba(61,214,181,.85); background:#0E3153;
       box-shadow:inset 0 1px 0 rgba(255,255,255,.10), 0 0 0 1px rgba(61,214,181,.45), 0 20px 56px rgba(61,214,181,.22)

├─ header row: DM Mono 12px letter-spacing .1em #3DD6B5 "01"  +  1px hairline fading right (linear-gradient(90deg, rgba(61,214,181,.35), rgba(61,214,181,0)))
├─ title: Manrope 500 22px line-height 1.2 letter-spacing -.01em #fff   (t1 + " " + t2, e.g. "Rate Shopping")
└─ footer row (margin-top:auto; align-items:flex-end; justify-content:space-between)
     ├─ tag: DM Sans 13px line-height 1.45 #B5CDE0 max-width 185px
     └─ "Open →": DM Mono 10.5px letter-spacing .08em uppercase #3DD6B5 + 16×9 arrow
```
The WMS/OMS/Workflows variant puts the tag as a full-width line (`13.5px; line-height 1.5`) and the "Open →" / "Watch →" link alone at the bottom; `gap:14px; min-height:196px; title 21px`.

Cards enter with a cascade (`fpSettle .44s cubic-bezier(.22,1,.32,1.06)`, `delay = min(i×34, 460) ms`), header fades in (`fpFadeIn .3s`).

## 2.7 Screen: WMS / OMS Capability Hubs (`wms`, `oms`)

Same layout as the TMS Hub. Content:

- **WMS** — eyebrow "FreightPOP WMS · Capability Library"; H1 "Warehouse Management"; lede: "A warehouse layer built natively into FreightPOP — one vendor for WMS, TMS and OMS. The floor, the freight and the order share a single record, so stock and shipping never fall out of sync. Open a module for the problem, the payoff, a live demo, and the proof." Six cards: 01 Guided Receiving · 02 License Plating, Lot, and Serialization · 03 Put-Away & Bin Transfers · 04 Order Picking & Fulfillment · 05 Inventory Visibility & Adjustments · 06 Cycle Counting.
- **OMS** — eyebrow "FreightPOP OMS · Capability Library"; H1 "Order Management"; lede: "The workspace where every order arrives, gets its freight detail and is prepared — then handed to warehouse picking and to the TMS for rating and booking, with no re-entry. …" Five cards: 01 Order Management and Intake · 02 Product Detail & Auto Pack · 03 Order Consolidation · 04 Inbound Order Management · 05 Order-to-Fulfillment Handoff.

(Card tag copy for all eleven is in §2.18.)

## 2.8 Screen: Feature sub-flow (`feature`)

This is the heart of the deck: one screen, four steps, 29 modules. Background alternates `#051729` / `#0A2540` by module index so consecutive modules feel like page turns.

### Header
```
row (gap 14, margin-bottom 10):
  ├─ chip "MODULE 03 / 18": DM Mono 11px 500, letter-spacing .12em, #3DD6B5 on rgba(61,214,181,.12), padding 5px 10px, radius 5px
  └─ tag: DM Mono 12px, letter-spacing .08em, uppercase, #7A96B0  (e.g. "COMPARE EVERY CARRIER AND MODE IN ONE SCREEN")
<h2> feat.name: Manrope 400 38px, line-height 1.08, letter-spacing -.02em, #fff, margin 0 0 22px
```
`modTotal` zero-pads to two digits ("/ 18", "/ 06", "/ 05").

### Step rail
`grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:34px`. Four tiles, each `padding:13px 16px; border-radius:12px; flex-column; gap:6px; transition:all .2s ease` with a DM Mono 11 px number and a Manrope 500 14.5 px label (Problem / Benefit / Live Demo / Validation). Three states:

| State | Background | Border | Number | Label | Extra |
|---|---|---|---|---|---|
| **Active** | `rgba(61,214,181,.12)` | `1px solid rgba(61,214,181,.5)` | `#3DD6B5` | `#fff` | `box-shadow:0 0 22px rgba(61,214,181,.18)` |
| **Completed** (before active) | `rgba(255,255,255,.04)` | `1px solid rgba(255,255,255,.14)` | `#3DD6B5` | `#B5CDE0` | |
| **Upcoming** | `rgba(255,255,255,.02)` | `1px solid rgba(255,255,255,.07)` | `#7A96B0` | `#7A96B0` | |

(The rail is authored as four full copies under `sc-if`, one per active step, so the editor shows a clean state and there is no transition lag.)

### Step 01 — Problem
Container `max-width:820px`. Sub-eyebrow "The Problem". `<h3>` Manrope 500 `clamp(27px, 5.1vh, 38px)`, line-height 1.12, letter-spacing −.015em, `text-wrap:pretty`. `<p>` DM Sans 300 `clamp(16px, 2.9vh, 20px)`, line-height 1.55, `#B5CDE0`, `max-width:700px`. (Note the viewport-relative clamps — the Problem step is the only place type scales with window height.)

### Step 02 — Benefit
Sub-eyebrow "The Benefit". `<h3>` Manrope 500 30 px, line-height 1.14, `max-width:820px; margin-bottom:28px`. Bullets in a two-column grid (`gap:14px 40px`), each row:
```
display:flex; gap:14px; align-items:flex-start; border-bottom:1px solid rgba(255,255,255,.08); padding-bottom:14px
  ├─ 24px circle rgba(61,214,181,.14) with 13px teal check (stroke 3)
  └─ DM Sans 15.5px line-height 1.45 #FFFFFF
```
Bullet counts range 5–10 per module (OMS modules carry the most).

### Step 03 — Live Demo
Centred column. Header row (max 1020 px): sub-eyebrow "Live Demo" left; right a **segmented pill group** (`gap:8px`), each pill `padding:9px 16px; border-radius:999px; DM Mono 10.5px; letter-spacing .10em; uppercase; transition all .2s`:
- **Walkthrough** (default on) · **✦ AI Demo** (only if the module has an `ai` key) · **Live Site ↗** · **⛶ Expand**.
- Pill on: `background:rgba(61,214,181,.14); color:#3DD6B5; border:1px solid rgba(61,214,181,.45)`. Off: `background:rgba(255,255,255,.03); color:#7E97AC; border:1px solid rgba(255,255,255,.14)`.

Demo stage (`max-width:1020px`):
- **Walkthrough** → `<dc-import name="…Demo" hint-size="100%,580px">` — the cooking demo renders at 1020 px wide, naturally ~580 px tall.
- **AI Demo** → either a `dc-import` of one of the four AI demos, or an iframe to `ai-clips/rate-shop.html` / `ai-clips/invoice-audit.html` (bg `#0a0a0a`) with a caption badge "FreightPOP AI · {module}".
- **Live Site** → iframe (`height:640px`, bg `#fff`) to the module's `liveUrl` (`app.freightpop.com/app/#/…`) inside a framed box: `border-radius:16px; border:1px solid rgba(255,255,255,.16); box-shadow:0 0 64px rgba(61,214,181,.12); background:#0A2540`, with a bottom-left badge "app.freightpop.com · {module}" (`rgba(5,23,41,.86)`, teal DM Mono 11 px, `padding:7px 13px; radius 8px`).
- **No demo built** → a dashed placeholder card: `max-width:880px; aspect-ratio:16/9; background:#0A2540; border:1.5px dashed rgba(255,255,255,.20); border-radius:16px`, top-left "▸ LIVE DEMO · {module}" label, an 84 px pulsing teal play button, and a fake progress bar (`height:4px`) filled to `feat.demo.progress` (a per-module percentage, 20–82 %).
- **Expand** → portals the stage to `#dc-root`, requests fullscreen, and scales the 1020 px demo by `min(w/1020, h/natH)`; an "✕ Exit Fullscreen" pill appears at `top:18px; right:22px` (z-index max). Esc collapses.

Caption under the stage: DM Sans italic 16 px, `#B5CDE0`, centred, `max-width:760px; margin-top:22px` — e.g. *"One order rated across every connected carrier and mode at once."*

The bottom step-dots pill is hidden on this step (`notDemo`) so the demo has the full height.

### Step 04 — Validation & ROI
Header row: sub-eyebrow "Validation & ROI" + **evidence pill** (`DM Mono 10px; letter-spacing .12em; uppercase; padding 5px 11px; radius 999`) coloured by grade (§2.19).

Two-column grid `.85fr 1.15fr; gap:48px; align-items:center`:
- **Left — hero stat**: Manrope 400 **84 px**, line-height .95, letter-spacing −.03em, `#3DD6B5`, tabular nums, `text-shadow:0 0 48px rgba(61,214,181,.35)`; below it DM Sans 16 px `#B5CDE0` label. Stats are often words, not numbers ("Every rate", "1 request", "Priced upfront", "Self-service").
- **Right — proof card**: `background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12); border-left:3px solid #3DD6B5; border-radius:0 12px 12px 0; padding:26px 28px; box-shadow:inset 0 1px 0 rgba(255,255,255,.05), 0 0 36px rgba(61,214,181,.06)`. Proof sentence DM Sans 300 18 px white. If a quote exists: divider `rgba(255,255,255,.12)`, italic 15.5 px `#B5CDE0` quote in curly quotes, DM Mono 10.5 px `#7A96B0` attribution.

Below: "SOURCE" row (DM Mono 10 px `#5E7C96` label + 13 px `#8FA9C0` text) and a legend line (11.5 px `#5E7C96`): *"Measured — from customer data. Reported — a customer or reviewer said it, unquantified. Modeled — benchmark math against your inputs, not yet measured. Platform — a capability you can verify today."*

Buttons (`margin-top:26px; gap:14px`): ghost **"← All modules"** (`padding:13px 22px; border:1.5px solid rgba(255,255,255,.22); radius 6px; #fff 14px 500`) and primary **"Next module →"** / **"Back to modules →"** (`padding:13px 24px; background:#3DD6B5; color:#051729; radius 6px`).

While on this step the **Validation Library overlay** (§2.17) is open on top, so in practice the rep sees the library first and closes it ("Back to module") to reveal this ROI layout.

### Paging controls (all steps)
- Prev/Next chevrons: `48px` circles at `top:50%; left/right:20px`, `background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.16); backdrop-filter:blur(6px)`, 20 px chevrons.
- Step dots pill (hidden on step 03): `bottom:24px; centred; background:rgba(5,23,41,.6); border:1px solid rgba(255,255,255,.10); radius 999; padding:11px 18px; blur 6`. Four 8 px dots (`rgba(255,255,255,.28)`), active one stretched to `24px` wide `#3DD6B5` (`transition:all .3s`). Divider `1×13px`, then DM Mono 11 px `#7A96B0` counter "02 / 04".

## 2.9 Screen: Workflows (`workflows`) and Workflow Player

- Eyebrow "FreightPOP Platform · Workflows"; H1 "Common customer workflows."; lede "Eight flows we set up for customers every week. Open one to watch it run end to end, step by step." (the count word is computed from the array length).
- 8 cards (WMS-style card with "Watch →"):

| # | Title | Tag | Player file |
|---|---|---|---|
| 01 | Standard Outbound | Order in, rates shopped, label printed, tracking back to the ERP — the everyday outbound flow end to end. | `uploads/01-freightpop-outbound.html` |
| 02 | Inbound Receiving | POs become tracked inbound shipments — visibility from vendor dock to your receiving door. | `uploads/02-freightpop-inbound.html` |
| 03 | Parcel Shipping | High-volume small package: rate shop across parcel accounts, print, manifest and track in one pass. | `uploads/03-parcel-shipping.html` |
| 04 | LTL Freight | Quote, book, BOL and pickup for palletized freight — contracted and broker rates side by side. | `uploads/04-ltl-workflow.html` |
| 05 | Ocean Freight | Container-level international visibility — bookings, milestones and documents on one timeline. | `uploads/05-ocean-freight.html` |
| 06 | Returns & Reverse Logistics | Customer-initiated returns with pre-approved labels — reverse moves as controlled as outbound. | `uploads/06-returns-workflow.html` |
| 07 | Spot Quote & Truckload | Blast a load to your broker network, compare responses and award — no email chains. | `uploads/07-spot-quote.html` |
| 08 | Standard Route Optimization | Fleet and driver records, orders staged for own-fleet delivery, optimized and reviewed, dispatched to the driver and confirmed back in FreightPOP. | `uploads/08-route-optimization.html` |

- **Player**: full-bleed iframe to `src + "?theme=deck"`, Fullscreen pill. Back → grid. All eight player files exist in `uploads/` (~33 KB each). Each is a self-contained **1920×1080 animated explainer** (`#stage` scaled to the viewport) with its own light palette — `--navy #051729, --blue #4c8dde, --blue-deep #2d6cc0, --light-blue #c1d4e9, --bg #f7f9fc, --teal #3dd6b5, --green #1f7a54` — and the timeline Intro card → N phases → Result card ("One flow. Zero re-keying." with three stats "N phases, one system / Rules do the work / Synced everywhere"). `?theme=deck` is read by the player to match the deck's dark chrome. Note the players' blue `#4c8dde` is **not** the brand blue `#4088CF` (see Part 7).

## 2.10 Screen: Carrier Integrations (static layer `#fpCarrierGuide`)

Rendered as plain DOM (`position:fixed; top:53px; z-index:100`) whenever the React "Carriers" section is visible. Container `max-width:1700px; padding:48px 56px 40px`.

- Eyebrow "FreightPOP TMS · Carrier Network"; H1 (48 px) "Every mode. One network."; lede (15.5 px, max 460) "Parcel, LTL, truckload, air, ocean, rail, auto and intermodal carriers — part of FreightPOP's 1,500+ carrier and system integrations."
- **Search** input: `padding:12px 18px; border-radius:999px; border:1px solid rgba(255,255,255,.18); background:rgba(255,255,255,.06); DM Sans 14px; color:#fff`, placeholder "Search carriers".
- **Filter pills** (right-aligned, `gap:8px`): All · Parcel · LTL · Truckload · Air · Ocean · Rail · Auto · Intermodal. Idle `border:1px solid rgba(255,255,255,.22); transparent; padding 8px 16px; DM Sans 13px 500; #B5CDE0; radius 999`. Hover border `rgba(61,214,181,.5)` + white text. **Active: `background:#4088CF; border-color:#4088CF; color:#fff; box-shadow:0 0 18px rgba(64,136,207,.30)`** — note the active filter is *blue*, not teal; this is the main place `#4088CF` is used as a fill.
- **Grid**: `repeat(6, minmax(0,1fr)); gap:16px`, scrolls internally, `scrollbar-gutter:stable`.
- **Carrier card**: `background:#0A2540; border:1px solid rgba(255,255,255,.10); border-radius:12px; padding:14px 16px; height:72px; box-shadow:inset 0 1px 0 rgba(255,255,255,.06)`. Left: 40 px white logo tile (`radius 8px; inset ring rgba(5,23,41,.08)`) showing a Clearbit logo (`https://logo.clearbit.com/<domain>`) → Google favicon fallback → initial letter (Manrope 500 17 px `#051729`). Right: name (Manrope 500 14 px, ellipsis) over modes (DM Mono 9.5 px `.06em` uppercase `#7A96B0`, e.g. "LTL · TRUCKLOAD").
- Cards stagger in with `fpSettle .44s`, `delay min(i×16, 420) ms`.
- Data: ~190 unique carrier names compiled from eight mode arrays (Parcel 33, LTL 113, Truckload 19, Air 9, Ocean 5, Rail 6, Auto 7, Intermodal 2), with a 160-entry `LOGO_MAP` of name → domain. Not every carrier has a logo mapping (falls back to an initial).

## 2.11 Screen: ERP & System Integrations (static layer `#fpErpGuide`) + detail page

Same shell as Carriers. Eyebrow "FreightPOP ERP · Integration Guide"; H1 "Connect the systems you already run."; lede "Direct connections across ERP, WMS, EDI, ELD and commerce platforms — part of FreightPOP's 1,500+ carrier and system integrations." Search placeholder "Search integrations". Filters: All · ERP · WMS · EDI · ELD · Business Systems.

**54 integrations** (alphabetised in the grid): ELD (4) GoMotive, AT&T Fleet Complete, Samsara, Trimble · ERP (24) Acumatica, Infor ERP, Microsoft Dynamics 365 Business Central, Dynamics GP, Dynamics AX, Dynamics NAV, Dynamics 365 F&O, Oracle ERP, SYSPRO, Fox ERP, Rootstock, Sage, SAP Business One, SAP ECC, SAP S/4HANA, Epicor, Epicor Prophet 21, Oracle NetSuite, QuickBooks Desktop, QuickBooks Online, ERP One, Direct Response, Lighthouse SyteLine, Tharstern · WMS (9) Infoplus, Logiwa, VeraCore, Invetrak, SnapFulfil, Infor WMS, FULFIL IO, Zoho Inventory, ShipHero · EDI (3) SPS Commerce, TrueCommerce, Cleo · Business Systems (14) Brightpearl, Four51, Salesforce, HubSpot, Shopify, Adobe Commerce (Magento), BigCommerce, WooCommerce, Cubiscan, FreightSnap, MuleSoft, Boomi, Celigo, Tive.

Integration card = carrier card without the modes line (name 14.5 px); hover `border-color:rgba(61,214,181,.5); box-shadow:0 0 20px rgba(61,214,181,.12)`; click opens a **detail page** (`#fpIntDetail`, `position:absolute; inset:0; background:#051729`, `max-width:1240px; padding:44px 56px 64px`):

```
[← All integrations]   ghost pill: border 1px rgba(255,255,255,.22), radius 999, padding 9px 18px, DM Sans 13px 500 #B5CDE0
68px logo tile (radius 14)  +  DM Mono 11.5px .14em uppercase #3DD6B5 tags ("ERP · FINANCE · INVENTORY")
                              +  <h1> Manrope 400 44px name
<p> blurb: DM Sans 300 16px/1.6 #B5CDE0 max 760px
┌─ 2-col grid gap 20 ─────────────────────────────────────────────────────────┐
│ flow card: bg #0A2540, border rgba(255,255,255,.10), radius 14, padding 24 26 │
│   "INTO FREIGHTPOP" (teal) · list with "→" teal marks     |  "BACK TO <NAME>" (blue #4088CF) · "←" blue marks  │
│   items: DM Sans 300 14.5px/1.55 #D7E5F0                                                                  │
└──────────────────────────────────────────────────────────────────────────────┘
"HOW IT CONNECTS" (DM Mono 11px #7A96B0) → chips: border 1px rgba(61,214,181,.4), radius 999, padding 8px 16px, DM Mono 11px .08em uppercase #3DD6B5  (e.g. API CONNECTION · NATIVE APP INSIDE NETSUITE · REAL-TIME OR SCHEDULED BATCH)
footnote 12.5px #7A96B0: "Grounded in FreightPOP integration documentation. Exact field mapping and scope are confirmed during onboarding."
```
Bespoke detail copy exists for NetSuite, Acumatica, QuickBooks (×2), MuleSoft/Boomi, Celigo, the four e-commerce platforms, Cubiscan/FreightSnap, Tive, Salesforce/HubSpot; everything else falls back to a per-category generic (ERP / WMS / EDI / ELD / Business Systems). Esc closes the detail first, then the deck handles it.

## 2.12 Screen: Product Roadmap (`roadmap`)

`max-width:1320px`. Eyebrow "FreightPOP Platform · Roadmap"; H1 (54 px) "Where the product is headed."; lede "Two tracks of investment: agentic AI across the shipping lifecycle, and platform depth across the warehouse and the yard. Directional — sequence and scope evolve with customer input."

Two **horizontal timelines**, each: section title row (Manrope 500 26 px + hairline gradient + DM Mono 11 px count "9 INITIATIVES" / "4 INITIATIVES"), a 1 px track at `top:9px` (`linear-gradient(90deg, rgba(61,214,181,.15), rgba(61,214,181,.55), rgba(61,214,181,.15))`), and a grid of nodes:

- **AI Product Roadmap** — `repeat(9,1fr); gap:16px`. Node: 18 px teal dot with `0 0 0 5px rgba(61,214,181,.14)` halo; label Manrope 500 17 px **teal**; body DM Sans 300 12.5 px `#B5CDE0`.
  1 Copilot v.1 — AI-powered shipment execution assistant · 2 Accessorial Agent — Smarter, automated accessorial cost control · 3 Load Planning Agent — Automated load consolidation and planning · 4 MCP — Scalable AI infrastructure for reliability and integrations · 5 Copilot v.2 — End-to-end AI operations and decision automation · 6 Tracking & Invoice Agent — Proactive tracking and exception resolution · 7 Claims Agent — Automated claims handling and recovery · 8 Customer Agent Builder — Build and deploy your own AI agents · 9 Control Tower — Real-time, AI-driven supply chain visibility.
- **Platform Product Roadmap** — `repeat(4,1fr); gap:28px`, **blue** track/dots (`#4088CF`, halo `.18`); label Manrope 500 20 px white; body 13.5 px.
  1 WMS Expansion — Advanced warehouse workflows and scalability · 2 Yard Management — End-to-end yard visibility and asset control · 3 RFP — Streamlined carrier sourcing and rate management · 4 Text Support — Real-time SMS communication for shipments and appointments.

Teal = AI track, blue = platform track: this is the clearest semantic use of the two accents in the deck.

## 2.13 Screen: Onboarding (`onboarding`)

Background `#0A2540` (lighter navy — the only pillar page that does this). Eyebrow "Onboarding · What to expect"; H1 (54 px) "From kickoff to production."; lede "A dedicated customer success team runs the implementation with you. Milestones are set together at kickoff around your requirements."

Six-node timeline (`repeat(6,1fr); gap:24px`, teal track/dots): DM Mono 11 px number `#7A96B0`, Manrope 500 24 px label, 13 px lines (300).

| # | Label | Lines |
|---|---|---|
| 01 | Kickoff | Introduce the CS team for implementation · Discuss unique requirements |
| 02 | Milestones | Establish milestones for onboarding with FreightPOP · Agree on the training, testing and go-live plan |
| 03 | Setup | Set preferences for your workflow · Add carriers and rates · Finish any development and connect to ERP or WMS |
| 04 | Training | Train key personnel on admin setup, shipping, reports and dashboards · All shippers attend the training sessions |
| 05 | Testing | Validate the setup against your shipping requirements with test data |
| 06 | Production | Users adopt FreightPOP as their primary supply chain solution · You see the value of the system as expected |

## 2.14 Screen: FreightPOP AI (`ai`)
Full-bleed iframe (`allow="clipboard-write; microphone"`) to `aiUrl` prop, default `https://genuine-conkies-86b264.netlify.app/`. External.

## 2.15 Screen: Live Site (`livesite`)
Full-bleed iframe to `https://app.freightpop.com/app/#/quote-ship` (white bg). Pills: "← Back to deck" (returns to the view it was opened from) and "⛶ Fullscreen". Reached from the nav's Live Site pill on any view.

## 2.16 Overlay: Jump-to menu (`menuOpen`)

`position:absolute; inset:0; z-index:400; background:rgba(2,16,29,.95); backdrop-filter:blur(14px); padding:56px 64px; animation:fpFadeIn .25s`. Content max 1200 px.

- Header: eyebrow "Jump to" + 40 px round close button (`border:1px solid rgba(255,255,255,.18)`, 16 px ✕).
- **Top-level tiles** — 2-col grid, `gap:14px`: `background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.12); radius 12; padding 22px 24px`; active: `background:rgba(61,214,181,.1); border:1.5px solid #3DD6B5; box-shadow:0 0 26px rgba(61,214,181,.16)`. Label Manrope 500 21 px + sub 13 px `#B5CDE0`:
  Intro — Full-screen overview · Interactive Walkthrough — Live product experience · Main Menu — Platform · 4 systems · Transportation Management — Module hub · 18 capabilities · Workflows — 7 common customer flows *(stale: there are 8)* · Carrier Integrations — Every mode · one network · ERP & System Integrations — 54 connected systems · Product Roadmap — AI · platform direction · Onboarding — What to expect · FreightPOP AI — Intelligence layer · ROI — Intake form · opens in a new tab.
- Three module sections, each with a DM Mono 11 px `#7A96B0` header ("TRANSPORTATION MANAGEMENT · 18 MODULES", "WAREHOUSE MANAGEMENT · 6 MODULES", "ORDER MANAGEMENT · 5 MODULES") and a 3-col grid (`gap:12px`) of small tiles (`rgba(255,255,255,.03); border rgba(255,255,255,.10); radius 12; padding 16px 18px`; active as above with `0 0 22px` glow): DM Mono 11 px teal number, Manrope 500 17 px name.

## 2.17 Overlay: Validation Library

Shown at `feature` step 3. `position:absolute; top:53px; inset-x:0; bottom:0; z-index:400; background:#051729`. A slim header bar (`padding:12px 22px; border-bottom:1px solid rgba(255,255,255,.09); background:rgba(4,18,31,.85)`) with a "Back to module" ghost button (same spec as nav Back), a DM Mono 11 px `.13em` uppercase teal label "Validation library", and the active feature tag in `#7A96B0`. Below: an iframe to `Validation Library.dc.html?feature=<tag>`. The library posts `{ fpCloseLib: true }` to the parent to close itself; the deck listens for it. Feature-name → library-tag remaps: "Inbound Order Management" → "Third-Party & Inbound"; "Order Management and Intake" → "Order Intake"; "Product Detail & Auto Pack" → "Auto Pack"; "Address Validator & Accessorials" → "Address & Accessorial Checks"; all others map to themselves.

## 2.18 Complete module content

Every module is a data object with the same shape. A designer laying out a module page should expect these field lengths:

| Field | Where it appears | Typical length |
|---|---|---|
| `num` | card, chip, menu | "01"–"18" |
| `t1` + `t2` (TMS only) | hub card title (two words, e.g. "Rate" + "Shopping") | 2–3 words |
| `name` | h2, breadcrumb leaf, menu | 2–5 words |
| `tag` | hub card, feature header (uppercase) | 6–11 words |
| `problem.heading` | Step 01 h3 | 5–10 words (OMS 01–04: a full 25–40-word sentence, see drift) |
| `problem.body` | Step 01 p | 35–55 words (OMS 01–04: empty) |
| `benefit.heading` | Step 02 h3 | 5–9 words |
| `benefit.bullets[]` | Step 02 grid | 5–10 items, 8–16 words each |
| `demo.caption` | Step 03 italic caption | 10–18 words |
| `demo.progress` | placeholder progress bar | "20%"–"82%" |
| `demo.anim` | which `*Demo.dc.html` mounts | key |
| `demo.ai` | which AI demo is offered | key or absent |
| `demo.liveUrl` | Live Site tab | app.freightpop.com deep link or absent |
| `roi.stat` / `roi.statLabel` | Step 04 84 px stat + label | 1–3 words / 4–8 words |
| `roi.ev` | grade, source, optional quote + who | |
| `roi.proof` | Step 04 proof card | 15–30 words |

### 2.18.1 TMS — 18 modules

| # | Name | Card tag | Demo (`anim` → file) | AI | Live URL (`app.freightpop.com/app/#/…`) | Evidence grade | Stat |
|---|---|---|---|---|---|---|---|
| 01 | Shipping Rules Engine | Codify shipping logic — and let qualifying orders book themselves | `rules` → ShippingRulesDemo | `copilot` → AiCopilotDemo | `company/rules?tab=shipping-approval-rule` | Platform | **100%** rule compliance, every site |
| 02 | Carrier Management | Every carrier and account, centrally controlled | `carrier` → CarrierMgmtDemo | — | `carrier-management` | Platform | **1,500+** carrier and system connections, built in-house |
| 03 | Rate Shopping | Compare every carrier and mode in one screen | `rate` → RateShopDemo | `clipRate` → ai-clips/rate-shop.html | `quote-ship` | Reported (G2 · Francisco A.) | **Every rate** on one screen, every time |
| 04 | Spot Quoting & Bid Portal | One request out, every bid back in one place | `spot` → SpotQuoteDemo | — | — | Platform | **1 request** to bid an entire carrier network |
| 05 | Address Validator & Accessorials | Catch the surcharge before the carrier does | `accessorial` → AccessorialDemo | `accessorial` → AiAccessorialAgentDemo | `quote-ship` | Modeled | **Priced upfront** not discovered on the invoice |
| 06 | Shipment Consolidation | Combine orders into fewer, fuller loads | `consol` → ConsolidationDemo | `consol` → AiAutoConsolidationDemo | `order-management` | Modeled | **Fewer loads** for the same freight |
| 07 | Pooling & Cross-Dock | Truckload the long haul, LTL the last mile | `pool` → PoolingDemo | — | — | Modeled | **1 linehaul** instead of twenty |
| 08 | Multi-Leg Shipments | Plan and track door-to-door, every leg | `multileg` → MultiLegDemo | — | — | Platform | **1 record** for every leg, every carrier |
| 09 | Batch Shipping | Rate, label and book hundreds at once | `batch` → BatchShipDemo | — | `order-management` | Reported (G2 · Catherine C.) | **1 click** to book and dispatch an entire batch |
| 10 | Parcel Shipping | Every parcel carrier rated on the same screen as freight | `parcel` → ParcelDemo | — | `quote-ship` | Platform | **One screen** for parcel and freight |
| 11 | Documents & BOL Control | Every document generated, printed and correctable | `docs` → DocsBolDemo | — | `quote-ship` | Platform | **One booking** produces every document |
| 12 | Fleet & Dispatch | Your trucks and your carriers on one board | `fleet` → FleetDispatchDemo | — | — | Modeled | **One board** for assets and carriers |
| 13 | Route Optimization | Fewer miles, tighter windows, lower cost | `route` → RouteOptDemo | — | `route-optimization` | Modeled | **Fewer miles** for the same stops |
| 14 | Driver App & POD | Weights, status and proof from the driver's phone | `driver` → DriverPodDemo | — | — | Modeled | **At the dock** not days later |
| 15 | Tracking & Notifications | One screen for every shipment, and customers who stop asking | `tracknote` → TrackNotifyDemo | — | — | Reported | **Self-service** status for everyone who asks |
| 16 | Freight Invoice Audit | Every invoice checked against what you approved | `audit` → InvoiceAuditDemo | `clipAudit` → ai-clips/invoice-audit.html | — | **Measured** (Buffalo Seal & Gasket) | **Line by line** audited automatically |
| 17 | Reporting & Analytics | Spend, service and carrier performance on demand | `reports` → ReportsDemo | — | — | Reported (Software Advice) | **Quoted vs. actual** on every shipment |
| 18 | Dock Scheduling | Self-service dock appointments | `dock` → DockSchedDemo | — | — | Reported (Callaway Blue) | **Self-service** carrier appointments |

**Full copy, TMS modules** (Problem heading → body · Benefit heading → bullets · Demo caption · Proof):

**01 Shipping Rules Engine**
- Problem: *Every rep ships by their own playbook.* — Which carrier for hazmat, when a guaranteed service is required, which account to bill — that logic lives in people's heads. New hires guess, veterans improvise, and every routine order still waits on a human to click ship.
- Benefit: *Turn tribal knowledge into rules that fire automatically.* — Route by weight, value, destination, hazmat, customer or SLA · Big-box and collect freight route to the customer's carrier and account automatically · Force guaranteed service on critical lanes; block non-compliant carriers · Auto dispatch: orders that satisfy a rule quote, book and label with no human touch · Crawl-walk-run — automate the low-hanging lanes first, then widen the rules
- Demo caption: A routing rule is defined once — then quotes, books and dispatches every qualifying shipment on its own.
- Proof: Policy is enforced on every shipment automatically — and the orders that qualify never wait on a person. Source: "Rules engine — platform capability. Anchor Distributing target: 80–90% hands-off auto-ship."

**02 Carrier Management**
- Problem: *Your carrier network lives in a spreadsheet — and someone's inbox.* — Accounts, credentials, contracted rates and service rules are scattered across files and people. Onboarding a carrier is a project, and auditing who got used and why is nearly impossible.
- Benefit: *Run every carrier and account from one place.* — 1,500+ in-house carrier integrations — parcel, LTL, FTL, ocean and air · Load contracted rates, fuel surcharges and rate sheets for carriers without an API · Add or swap carriers without an EDI project or IT ticket · Carrier ratings on claims and on-time so cheapest isn't automatically best · Control which carriers each site, user or lane can use
- Demo caption: Add a regional LTL carrier and turn it live across every site in minutes.
- Proof: No aggregator in the middle — faster data, fewer failures, and no per-transaction toll. Source: "1,500+ connections built in-house, no aggregator. Verifiable in the integrations catalog."

**03 Rate Shopping**
- Problem: *Nobody knows what the cheapest option was.* — Rating means portals, phone calls and PDFs. Under time pressure the team ships with whoever answered first, and the savings are invisible because no one ever saw the alternatives.
- Benefit: *Every rate, every mode, side by side — in one screen.* — Parcel, LTL, truckload and international rated from the same page · Contracted, negotiated and program rates all compared together · Transit days, guaranteed options and accessorials shown with the price · Adjust weight or dims and re-rate in place — no going back a screen · The system tells you which carriers didn't rate, and why
- Demo caption: One order rated across every connected carrier and mode at once.
- Proof: Rate shopping and invoice audit are the two largest line items in customer savings models. Quote: "Saved us a TON of money in both shipment costs and payroll costs due to the saved time." — G2 review, Francisco A.

**04 Spot Quoting & Bid Portal**
- Problem: *Finding a truck means emailing ten carriers.* — Every spot load starts a round of individual emails, then a scramble to compare replies buried in an inbox. Nothing is apples-to-apples, nothing is auditable, and the load waits.
- Benefit: *Bid one load to a whole network in a single click.* — Spot quote groups by region, equipment or lane — ping the network, not one rep · Requests can go out automatically the moment an order lands, based on its destination · Carriers bid in a scoped portal — no login, only the details you choose to share · Require a quote number and a cost breakdown: freight, fuel, accessorials · Bids land beside your API and contracted rates for a true side-by-side
- Demo caption: One load bid to an East Coast group — responses land next to the API rates.
- Proof: Spot bids stop living in an inbox and become a comparable, auditable record.

**05 Address Validator & Accessorials**
- Problem: *The accessorial shows up on the invoice.* — A residential delivery quoted as commercial. A liftgate nobody flagged. The quote looked right, the invoice didn't, and by then the margin on that shipment is gone.
- Benefit: *Validate the stop and the service before you rate it.* — Addresses validated at entry — origin and destination, US, Canada and Mexico · Residential and liftgate flagged automatically, and only when the freight warrants it · Dock, appointment and inside-delivery conditions surfaced before booking · Accessorials priced into the quote so the invoice matches what you approved · Defaults per customer or location for the exceptions you already know about
- Demo caption: A pallet to a residential stop auto-flags residential and liftgate before rating.
- Proof: Accessorials caught at quote time are the difference between a quoted rate and a real one. Source: "No customer metric yet. Modeled from your LTL count × surprise-charge rate."

**06 Shipment Consolidation**
- Problem: *Orders ship the moment they drop — one box at a time.* — Same-day, same-destination orders leave as separate parcels or half-empty LTL loads. You pay minimums and per-shipment fees over and over for freight that could have moved together.
- Benefit: *The system finds the loads that belong together.* — Same-destination and same-customer orders surfaced as consolidation candidates · Hypothetical consolidation: hold and combine until a weight or capacity target is hit · Multi-stop opportunities flagged during order entry, not after booking · Consolidated freight rated and booked as one shipment, one BOL · Each original order keeps its own tracking and writeback
- Demo caption: Four same-city orders combine into one LTL load — and one bill.
- Proof: One shipment instead of three means one minimum, one booking and one invoice to audit.

**07 Pooling & Cross-Dock**
- Problem: *Every small order pays for its own long haul.* — Twenty LTL shipments to the same region each buy their own linehaul. The freight is going to the same place — you're just paying twenty times to get it there.
- Benefit: *Pool the region, break it down locally.* — Group regional orders onto one truckload to a cross-dock or pool point · Final mile released as LTL or local delivery from the pool · Every child shipment tracked under the parent move — no hand-off blind spots · Works for two-leg flows where a partner warehouse reworks freight · Compare pooled cost against shipping each order direct
- Demo caption: Twenty Northeast orders pool onto one linehaul, then break to LTL final mile.
- Proof: Pooling converts a pile of LTL minimums into one truckload rate plus short local moves.

**08 Multi-Leg Shipments**
- Problem: *One shipment becomes three disconnected records.* — Drayage, linehaul and final mile each live in a different system with a different reference number. Nobody can answer where the freight is without opening three screens and doing math.
- Benefit: *One record spans every leg and every carrier.* — Build ocean, drayage, linehaul and final mile as legs of one move · Each leg gets its own movement ID, carrier, rate and documents · Status rolls up to one shipment timeline · Handoffs are visible — you see the gap before the customer does · Total landed cost accumulates across legs
- Demo caption: Track a port-to-door move across three carriers on one timeline.
- Proof: One shipment record spans drayage, linehaul and final mile — no hand-off blind spots.

**09 Batch Shipping**
- Problem: *Peak days mean one label at a time.* — When volume spikes, your team rate-shops, labels and books orders individually — the same clicks, hundreds of times. Throughput is capped by headcount, and errors climb with fatigue.
- Benefit: *Process the whole queue in one pass.* — Select hundreds of orders and rate-shop, label and book them together · Labels print in the order you selected them — no re-sorting at the printer · Large batches supported without the print-count errors of legacy tools · Exceptions pulled out for review instead of stopping the batch · Throughput scales with volume, not with headcount
- Demo caption: An entire batch rate-shopped, labeled and booked in a single pass.
- Proof: Throughput scales with order volume, not headcount. One G2 reviewer bulk-quotes hundreds of locations from a single screen. Quote: "I spend many many hours quoting customers with hundreds or thousands of locations… This feature alone has saved me days of work in the last couple of months." — G2 review, Catherine C.

**10 Parcel Shipping**
- Problem: *Parcel lives in its own system.* — A separate tool for parcel means a separate login, separate rates and no way to ask the only question that matters on a borderline order: should this go parcel or LTL? Dimensional rules quietly decide it for you.
- Benefit: *One screen for parcel, LTL and truckload.* — Rate parcel against LTL on the same order and pick the cheaper mode · Dimensional weight applied per carrier so the gray-area orders price honestly · Multi-carrier parcel accounts, labels and manifests from one place · Return labels and default return processing built in · Batch parcel days handled from the same queue as freight
- Demo caption: A 23 lb order rated parcel and LTL side by side — DIM rules included.
- Proof: Mode choice becomes a priced comparison instead of a habit. Source: "Parcel included at no additional cost — verifiable in any quote."

**11 Documents & BOL Control**
- Problem: *The paperwork is assembled by hand.* — BOLs, packing lists, pallet labels and manifests get built in separate places, printed from separate screens, and corrected with a pen. When a weight changes after pickup, the document and the invoice disagree.
- Benefit: *Generate it all at ship time — and fix it after.* — BOL, packing list, pallet labels and manifests produced on booking · Customer-specific and third-party BOL formats for big-box routing requirements · Documents route to the right printer by user or station · Edit a BOL after the fact — weight, class, mode — with permissioned, tracked changes · PRO number blocks assigned electronically instead of from a sticker sheet
- Demo caption: A variable-weight load re-weighed after pickup — BOL corrected, record updated.
- Proof: Reconciled weights on the BOL are what make the invoice audit defensible.

**12 Fleet & Dispatch**
- Problem: *The dispatch plan is a whiteboard and a phone.* — Assets, drivers and daily trips are tracked by hand. When a customer closes early or a load moves to tomorrow, someone re-plans on the fly and calls everyone affected — if they remember.
- Benefit: *Plan the day by dragging loads onto trucks.* — Equipment profiles with weight and capacity tolerances and max daily trips · Assign a truck, driver, tracking device or warehouse to any asset · Drag a load between trucks or to another day — the carrier is notified · Same board for owned assets and third-party carriers · ELD and telematics feeds push assignments to the driver's phone
- Demo caption: A Monday load drags to Tuesday — the truck and the carrier both update.
- Proof: Re-planning a day is a drag-and-drop, not a round of phone calls. Source: "No customer metric yet. Alley-Cassetty ran 15 locations on separate spreadsheets and pegboards pre-FreightPOP."

**13 Route Optimization**
- Problem: *Routes are built from memory.* — A dispatcher sequences stops by instinct. Trucks backtrack, windows get missed, and nobody can prove whether a different order of stops would have been cheaper.
- Benefit: *Optimize the sequence, then adjust by hand.* — Sequence multi-stop routes for minimum miles and time · Respect delivery windows, vehicle capacity and driver availability · Balance loads across available equipment; overflow rolls to the next truck · Drag a stop to re-order it — manual adjustments are recorded · Compare optimized vs. manual plans side by side
- Demo caption: A 12-stop day re-sequences to cut total drive time.
- Proof: Sequencing happens before the day starts, not during it. The saving is drive time and fuel, computed from your own stop counts.

**14 Driver App & POD**
- Problem: *Proof of delivery arrives days later.* — Signed paperwork rides back in a cab, gets scanned when someone has time, and a weight captured at pickup is relayed by text or not at all. Billing and claims wait on paper.
- Benefit: *The driver closes the loop from the dock.* — Free mobile app for your drivers and your carriers' drivers · Actual picked weight entered at pickup and fed straight to the record · Status updates — picked up, in transit, delivered — with comments · Photo and signature POD uploaded from the phone, instantly on the shipment · POD can be required before a driver is allowed to mark delivered
- Demo caption: A driver marks delivered — photo POD and signature land on the shipment.
- Proof: Weight and proof captured at the stop are what make same-day billing and fast claims possible.

**15 Tracking & Notifications**
- Problem: *"Where's my order?" lands on the shipping desk.* — Tracking lives in carrier portals and the ERP, so customer service asks the shipping team, who look it up by hand. Every status question costs two people time, and exceptions are found by the customer first.
- Benefit: *Every shipment, every carrier, one live view.* — All in-transit freight and parcel on one screen with a calendar view · Late and at-risk shipments flagged before the customer calls · Branded, Amazon-style tracking emails to your customers, automatically · Trigger notifications on real events — only once the carrier has picked up · Give CSRs, sales and customers scoped tracking access so they self-serve
- Demo caption: A late shipment flags on the board and the customer is already notified.
- Proof: Proactive notification removes the highest-volume interruption on the shipping desk. Source: "Alley-Cassetty intake: the coordinator fields status calls all day. Callaway Blue had once-daily visibility only."

**16 Freight Invoice Audit**
- Problem: *Freight invoices get paid, not checked.* — Auditing means comparing a carrier bill to a quote nobody saved, line by line, across hundreds of invoices. So bills get approved on faith — and reweighs, reclasses and phantom accessorials are paid in full.
- Benefit: *Automatic variance detection on every bill.* — Invoices matched to the original quote line by line, automatically · Reweighs, reclasses and unapproved accessorials flagged for dispute · EDI invoices ingested from connected carriers; broker bills uploaded · Approved invoices export to AP as bills or vendor bills · Nothing auto-pays — approval stays with your team
- Demo caption: A reweigh on a carrier invoice is caught against the quoted rate and queued for dispute.
- Proof: Invoice audit and rate shopping are the two largest components of customer savings models. Source (Measured): "Buffalo Seal & Gasket, closed won Dec 2025 — a single $225 carrier discrepancy, inside a $140,294 modeled annual savings case."

**17 Reporting & Analytics**
- Problem: *Reporting means exporting and rebuilding.* — Freight spend by lane, carrier or customer takes a data pull and a spreadsheet. By the time the analysis exists the quarter is over, and no two people build it the same way.
- Benefit: *The numbers are already in the system.* — Built-in reports for spend, mode mix, carrier performance and on-time · Filter by site, customer, lane or date and export to Excel when you want to · Dashboards scoped per role so each team sees its own numbers · Direct warehouse access for Power BI and your own BI stack · Quoted vs. actual cost captured on every shipment, ready to analyze
- Demo caption: Spend by carrier and lane, filtered live — no export required.
- Proof: Carrier negotiations and mode decisions run on your own data instead of the carrier's. Quote: "The reporting allowed us to save considerable money by illuminating which carriers can deliver each kind of product at the lowest cost and highest service levels." — Software Advice review

**18 Dock Scheduling**
- Problem: *The dock runs on phone calls and a whiteboard.* — Carriers arrive whenever, the yard backs up, and detention charges pile on while labor sits idle or scrambles. Nobody upstream knows what's hitting the dock today.
- Benefit: *Let carriers book their own slots.* — Publish dock availability; carriers pick and confirm their own appointments · Door and equipment needs captured at booking — forklift, liftgate, dock or drop · Appointments imported or created in bulk, per door and per site · Live schedule view for the floor — most customers run it on a screen in the warehouse · Inbound and outbound on the same calendar
- Demo caption: A carrier books its own dock slot — the warehouse board updates live.
- Proof: A known arrival schedule is what turns dock labor from reactive into planned. Source: "Callaway Blue intake, Jun 2026: 20 docks run on Excel and clipboards, no no-show tracking. Measured results due at their 90-day review."

### 2.18.2 WMS — 6 modules

| # | Name | Card tag | Demo | Grade | Stat |
|---|---|---|---|---|---|
| 01 | Guided Receiving | Scan-based PO receipts, validated at the door | `wreceive` → WmsReceivingDemo | Modeled | **At the door** discrepancies caught, not at month-end |
| 02 | License Plating, Lot, and Serialization | Move a pallet, not a serial number | `wlp` → LicensePlateDemo | Platform | **1 scan** moves a pallet — serials, lots and all |
| 03 | Put-Away & Bin Transfers | Directed moves, and bins that fit how you work | `wbins` → BinTransferDemo | Platform | **0 ghost moves** every relocation is a scanned transaction |
| 04 | Order Picking & Fulfillment | Guided picks on rugged mobile scanners | `wpick` → WmsPickingDemo | Platform | **Scan-verified** every pick, before it reaches packing |
| 05 | Inventory Visibility & Adjustments | Live stock across every site — fixable on the spot | `winv` → WmsInventoryDemo | Platform | **All sites** in one live inventory view |
| 06 | Cycle Counting | Count continuously, not catastrophically | `wcount` → WmsCycleCountDemo | Modeled | **0 shutdowns** counting runs alongside operations |

Hub card tags (longer, shown on the WMS hub): 01 "Scan-based PO receipts with expected-item validation, partial receipts with save-and-resume, and receive-to-bin or receive-to-dock flexibility." · 02 "Associate items, serials and lots to one scannable license plate — move a pallet, not a serial number, with custom LP naming conventions." · 03 "Directed put-away from receiving and QA, single-item splits across bins, and bins flexible enough to be jobs, trucks or a painted line down the warehouse." · 04 "Guided sales and transfer order picking on rugged mobile scanners — bin-directed, short-key confirms, optional approval gates before writeback." · 05 "Real-time inventory across every site with lot and expiration tracking, on-the-spot write-offs from the scanner, and photo capture for QA and RMA." · 06 "Scheduled ABC or full-warehouse counts, blind counting, variance review with approve-or-recount, and automatic ERP adjustment writeback."

**Full copy, WMS**

**01 Guided Receiving** — Problem: *Receiving runs on a clipboard and a guess.* POs get re-keyed at the dock, big containers take days with no way to pause and resume, and over- or short-receipts surface at month-end — long after the truck is gone. · Benefit: *Receive against the PO — validated as you scan.* Import the PO straight from TMS inbound — the truck you tracked is the receipt you work · Expected-item validation as you scan: under, complete and over flagged live · Partial receipts save and resume — supplemental receipts continue until the PO closes · Receive to a put-away bin or to the dock — your flow, either way · Approval posts a purchase receipt to your ERP automatically · Caption: An inbound PO is scan-received, validated against expected quantities and posted to the ERP. · Proof: One vendor for TMS and WMS: the shipment you tracked inbound becomes the receipt you post — zero re-keying. Source: "No live WMS customer metric yet — Alley-Cassetty is still in pilot."

**02 License Plating, Lot, and Serialization** — Problem: *Serialized and lot-controlled stock moves one scan at a time.* A pallet of serialized units can't move until someone scans every serial on it, and lot codes live on paper or in a spreadsheet — so expiry, recall and traceability questions turn into a warehouse walk. Multi-section warehouses relocate stock all day, so the scanning never ends, or worse, it just gets skipped. · Benefit: *One license plate carries the whole pallet.* Associate items, serials and lot codes to a single scannable license plate · One scan moves the pallet — every serial and lot code travels with it · Lot codes captured at receipt and carried through put-away, picks and shipment · Custom LP naming conventions: PO number, job number, or an auto-increment schema · LPs work everywhere — receipts, put-away, transfers, picks and adjustments · Print barcode labels at receipt so every pallet is scannable from day one · Caption: A pallet of 48 serialized units changes bins with a single license-plate scan. · Proof: The pallet is the unit of work. Serialized and lot-controlled handling stops being the reason moves don't get recorded.

**03 Put-Away & Bin Transfers** — Problem: *Stock moves, the system doesn't.* Put-away is tribal knowledge and bin-to-bin moves happen off the record — a forklift relocates a pallet and the software never hears about it. The next picker walks to a bin that's been empty for a week. · Benefit: *Direct every put-away, record every move.* Directed put-away from receiving and QA to the right bin · Split a single item across up to ten destination bins in one move · Consolidate many items into one bin — with live remaining-quantity checks · Bins are whatever you need: zones, trucks, jobs — even a painted line down the warehouse · License-plate aware: full pallets keep their plate through the move · Caption: One received item splits across a zone, a truck and a job bin — in a single recorded move. · Proof: The bin the system shows is the bin the forklift finds.

**04 Order Picking & Fulfillment** — Problem: *Pickers walk the aisles with a printout.* Paper pick lists can't verify anything. Wrong items and short picks surface at packing — or at the customer — and nobody upstream can see what's picked and what's still waiting. · Benefit: *Scan-guided picking from sales and transfer orders.* Open sales orders and transfer orders become picking tickets — no re-keying · Bin-directed picks on rugged mobile scanners · Short-key confirms a full bin quantity in one tap · Live line status as the pick progresses — picked, partial, waiting · Optional post and approval gates before inventory writes back · Caption: A sales order is scan-picked bin by bin — approved, posted and handed to the TMS to ship. · Proof: Errors stop at the shelf — and because WMS and TMS are one vendor, the picked order books freight without a handoff.

**05 Inventory Visibility & Adjustments** — Problem: *Every site keeps its own version of the truth.* Stock levels differ by system and by site. Sales promises what the warehouse doesn't have, damaged stock sits on the books for months, and nobody has proof of what condition anything arrived in. · Benefit: *One live view — correctable where you stand.* Real-time inventory across every warehouse and site in one view · Lot and expiration tracking on every unit · Write off damaged stock from the scanner, on the spot — no back-office ticket · Photo capture on inbound and outbound for QA and vendor RMA documentation · Every adjustment is a recorded transaction that posts to your ERP · Caption: Water-damaged stock is written off at the bin — photo attached, adjustment posted to the ERP. · Proof: One vendor for WMS and TMS means the stock you see is net of everything picked, packed and already on a truck.

**06 Cycle Counting** — Problem: *The annual count shuts the building down.* Counting means stopping — so it happens once a year, variances pile up unseen for months, and the write-off lands all at once with no way to say where accuracy went wrong. · Benefit: *Scheduled, blind, scan-driven counts.* Scheduled counts — ABC by velocity, or full-warehouse annual · Blind counts: the counter sees the shelf, not the expected number · Variances surface immediately with approve-or-recount review · Approved adjustments write back to NetSuite automatically · No shutdown — counts run alongside daily operations · Caption: A blind count surfaces one variance — reviewed, approved and posted to NetSuite. · Proof: Small, continuous counts keep accuracy high and turn the year-end write-off into a non-event.

### 2.18.3 OMS — 5 modules

| # | Name | Card tag | Demo | Live URL | Grade | Stat |
|---|---|---|---|---|---|---|
| 01 | Order Management and Intake | Orders arrive on their own, and one queue holds them all | `osales` → OmsSalesOrderDemo | `order-management` | Reported (G2 + Callaway Blue) | **Zero** re-keying to start a shipment |
| 02 | Product Detail & Auto Pack | Catalog detail in, calculated pallets out | `opack` → AutoPackDemo | `order-management` | Platform | **Rated right** the first time |
| 03 | Order Consolidation | Same destination, one load | `oconsol` → OmsConsolidationDemo | `order-management` | Modeled | **One minimum** instead of two |
| 04 | Inbound Order Management | Purchase orders tracked like the freight they are | `othird` → OmsThirdPartyDemo | `order-management` | Platform | **One queue** for inbound as well as outbound |
| 05 | Order-to-Fulfillment Handoff | One record from capture to carrier | `ohandoff` → OrderHandoffDemo | `order-management` | Reported (Buffalo Seal & Gasket) | **1 record** from capture to carrier |

⚠ **Content-shape drift in OMS 01–04:** the `problem.heading` holds a full paragraph and `problem.body` is empty, so Step 01 renders a 25–40-word sentence at h3 size (clamp 27–38 px) with no supporting paragraph. E.g. OMS 01 heading: *"Orders can come in from multiple systems. Without the right order management tools, shipping teams rely on spreadsheets, emails, and disconnected systems to figure out what needs to ship, when, and how."* A designer should decide whether the Problem step needs a "long-heading" variant or whether these four should be split into heading + body like the other 25.

**Full copy, OMS**

**01 Order Management and Intake** — Benefit: *Orders arrive on their own, into one workspace.* For most customers the ERP is integrated, so released orders import automatically · The integration is configured to your rules — which orders, at which status, to which site · ERP and storefront sync on a schedule so the queue fills itself · Bulk import from a CSV template when there's no integration yet · Look up a single order by number and pull it straight into Quote & Ship · Filter and pre-set the intake trigger: status, prefix, site, required ship date · Configure the grid so each team sees only the orders it ships · One queue for sales orders, outbound, inbound, services and ROI orders · Select orders in the grid to quote, spot quote, ship, create a delivery or split (9 bullets) · Caption: Orders land in the queue on their own — ERP sync, bulk import and single-order lookup. · Proof: The order arrives with its addresses, lines and detail already attached. Quote: "An extra number here or there when manually keyed has killed us on shipments in the past. This problem is virtually eliminated now." — G2 review

**02 Product Detail & Auto Pack** — Problem heading: *Most teams don't know what an order will cost to ship until after it is packed. That means freight decisions get made without one of the biggest pieces of the equation: how the order will actually be packed.* · Benefit: *Every line arrives quote-ready, and packs itself.* Items pull from the product catalog with dims, weights and ERP serial numbers · Freight class and NMFC assigned automatically; saved package types per SKU · Hazmat from the UN/NA catalog with DG paperwork and BOL language · That item detail feeds auto-pack: handling units, dims and weight calculated · Bulk pack rules define what a full case and a full pallet actually are · Item-level thresholds palletize a SKU on their own once the quantity is hit · Company-level thresholds palletize the shipment on weight, volume or box count · The routing guide then reads pallet count and box count to pick carrier and service · Fulfillment kits for orders that always ship the same way · International detail — country of origin, values, documentation — captured at entry (10 bullets) · Caption: Catalog detail, predefined packages and routing guide rules — then freight cost before anything is packed. · Proof: Accurate class, dims and pack math at entry are what stop reclass and reweigh charges downstream.

**03 Order Consolidation** — Problem heading: *Orders headed to the same place ship as separate freight. Each one looks fine on its own, so nobody sees the LTL minimums, labels, BOLs and pickups stacking up.* · Benefit: *Combine before you book, not after.* Orders matching on street, city, state and zip group into one shipment automatically · Several LTL shipments become one FTL, which is where the freight spend drops · Multi-stop truckloads built by selecting the orders and processing them as one load · Fewer labels, BOLs and carrier pickups for the warehouse to manage · Consolidate Selected works from the Order Management grid, even for a single order · Add or remove orders after the load is saved, up until pickup · Consolidated orders lock in Order Management, so nothing ships twice · Each original order keeps its own tracking and ERP writeback (8) · Caption: Same-destination orders selected in the grid, consolidated into one load, rated once. · Proof: The saving is invisible per order and material per month. Source: "Shares the consolidation model — deliberately not counted twice."

**04 Inbound Order Management** — Problem heading: *Inbound freight is a phone call and a guess at an arrival date, so the dock finds out what is coming when the truck shows up.* · Benefit: *Inbound POs live in the same system as everything else.* Purchase orders arrive in the Open Inbound Transactions tab from the ERP · Vendor freight created as a tracked inbound shipment, not an email thread · Rate and book inbound moves on your own carriers and accounts · Arrival dates and tracking visible before the truck reaches the dock · The inbound record becomes the receipt the warehouse works against · Caption: Inbound POs in one queue, rated, booked and tracked to the dock. · Proof: Inbound is often the least visible half of the freight spend.

**05 Order-to-Fulfillment Handoff** — Problem: *Three vendors own three pieces of the same order.* The order system, the warehouse system and the freight system come from different vendors, so the order is entered once, re-entered to pick it and re-entered to ship it. Every copy drifts, the integrations between them are somebody's side job, and when the handoff breaks nobody owns it. · Benefit: *One vendor, one record, capture to fulfillment.* Open orders flow into WMS picking with no re-keying · Picked and packed orders return to the TMS quote-ready · Tracking, carrier, freight cost and ship date write back to the ERP record · Partial ships and backorders stay tied to the parent order · OMS, WMS and TMS are one system, so there is no middleware to build or re-sync · One contract, one login and one team accountable for the whole handoff · Caption: OMS, WMS and TMS on one record — and what one vendor for all three buys you. · Proof: No re-entry between order, warehouse and freight means no reconciliation between them. Source: "Buffalo Seal & Gasket — the owner called freight cost written back to the ERP order 'a big deal' for invoicing."

### 2.18.4 Demos referenced by the deck vs. demos that exist

The deck's `<dc-import>` switch lists **33 demo names**. The folder contains **43 `*Demo.dc.html`** files. Demos present in the folder but **not wired into any module** (orphans, or superseded versions): `AutoDispatchDemo`, `CycleCountDemo` (superseded by `WmsCycleCountDemo`), `WmsAdjustmentDemo`, `WmsOrderPickingDemo` (vs. `WmsPickingDemo`), `WmsBinTransferDemo` (vs. `BinTransferDemo`), `OmsHazmatDemo`, `OmsOrderMgmtDemo` (`oorders` key exists in the switch but no module uses it), `ReturnsPortalDemo` (`oreturns` key, no module), `OmsProductDetailDemo` (`odetail` key, no module), `UsersRolesDemo` (`users` key, no module). Detail per demo in Part 4.

## 2.19 Evidence grades

Every module's Step 04 carries one of four grades; the pill colours are the only place the deck uses **amber** and **light-blue** text:

| Grade | Meaning (from the on-screen legend) | Pill bg | Text | Border | Count (29 modules) |
|---|---|---|---|---|---|
| **Measured** | from customer data | `rgba(61,214,181,.14)` | `#3DD6B5` | `rgba(61,214,181,.45)` | 1 (Invoice Audit) |
| **Reported** | a customer or reviewer said it, unquantified | `rgba(232,181,74,.14)` | `#E8B54A` | `rgba(232,181,74,.42)` | 7 |
| **Modeled** | benchmark math against your inputs, not yet measured | `rgba(122,150,176,.14)` | `#9DB6CC` | `rgba(122,150,176,.38)` | 9 |
| **Platform** | a capability you can verify today | `rgba(64,136,207,.16)` | `#7FB6E8` | `rgba(64,136,207,.45)` | 12 |

## 2.20 Keyboard, fullscreen and paging behaviour

| Context | → / PageDown | ← / PageUp | Esc |
|---|---|---|---|
| Intro | → Walkthrough | — | — |
| Walkthrough | → Main Menu | → Intro | → Intro |
| Main Menu | → TMS Hub | → Walkthrough | → Walkthrough |
| Hub / WMS / OMS / ERP / Carriers / Roadmap / Onboarding / AI | — | → Main Menu | → Main Menu |
| Workflows grid | — | → Main Menu | → Main Menu |
| Workflow player | — | → Workflows grid | → Workflows grid |
| Feature | next step (after 04 → hub) | previous step (before 01 → hub) | → hub |
| Jump-to open | — | — | close menu |
| Demo expanded | — | — | exit fullscreen (captured before deck handler) |
| Inside ERP/Carrier guide | keys swallowed (typing in search) | | closes detail page first |

Fullscreen: the Walkthrough, Main Menu, Workflow Player and Live Site sections have a "⛶ Fullscreen" pill that requests element fullscreen on the section. The demo stage "Expand" portals the demo out of the React tree to `#dc-root` and scales it to fit.

Mouse: hub cards, nav links, breadcrumb crumbs, step rail tiles, step dots, prev/next chevrons, Jump-to tiles all navigate. There is no swipe/touch handling beyond `touch-action:pan-y`.

## 2.21 External dependencies and URLs used by the deck

| Purpose | URL | Notes |
|---|---|---|
| Interactive walkthrough | `https://tubular-flan-14267b.netlify.app/embed.html` | `startUrl` prop; editable in Claude Design |
| Main Menu graphic | `https://idyllic-elf-b22a7e.netlify.app/` | hard-coded |
| FreightPOP AI | `https://genuine-conkies-86b264.netlify.app/` | `aiUrl` prop (not declared in data-props; JS fallback) |
| Live app | `https://app.freightpop.com/app/#/quote-ship`, `#/order-management`, `#/wms`, `#/carrier-management`, `#/route-optimization`, `#/company/rules?tab=shipping-approval-rule` | Requires the rep to be logged in |
| ROI intake | `https://freightpopsales.com/freightpop-intake-form?link=MGER4f9Y` | opens new tab |
| Rive hero | `https://info.freightpop.com/hubfs/FP Sales Assets/2026 Assets/Rive - Marketing Use Only/fp_hero-background.riv` (static intro) / `assets/fp_hero-background.riv` (React fallback — **file not present in `assets/`**) | plus `window.rive` runtime expected on the page |
| Logos | `https://logo.clearbit.com/<domain>` → `https://www.google.com/s2/favicons?sz=128&domain=<domain>` | carrier + integration tiles; ~250 remote requests when those pages open |
| Fonts | vendored `extracted/*.woff2` (Manrope 400/600, DM Sans 300/400/500/600, DM Mono 400/500); `preconnect` to fonts.googleapis.com remains | |
| Workflow players | `uploads/0N-*.html?theme=deck` | all 8 present |
| Validation Library | `Validation Library.dc.html?feature=…` | same folder |
| AI clips | `ai-clips/rate-shop.html`, `ai-clips/invoice-audit.html` | same folder |

---

# Part 3 — Design System (consolidated)

There is no token file in the project; every value below was extracted from inline styles. Names in the first column are **proposed** token names for a Figma library / CSS variables — they do not exist in the code yet. Three palettes coexist: the **deck** (dark navy + teal), the **sheets** (white letter pages with navy/teal/red), and the **demos** (light FreightPOP product UI). §3.1–3.5 cover the deck and the sheets; §3.6 covers the demos' product-UI recreation; §3.8 reproduces the standalone brand token reference found in `uploads/`.

## 3.1 Color tokens

### 3.1.1 Deck (dark theme)

| Proposed token | Value | Role / where used |
|---|---|---|
| `navy-900` | `#051729` | Root background, intro, nav base, most pillar pages, ERP/carrier layers, sheet dark bands, CTA text colour. **The** brand navy. |
| `navy-950` | `#02101d` | Scrollbar track. (`#04121F` in the library port / `rgba(4,18,31,.85)` library overlay header; `rgba(2,16,29,.95)` Jump-to overlay.) |
| `navy-800` | `#0A2540` | Card fill (module, carrier, integration, flow cards), demo stage frame, alternate feature-page bg, Onboarding page bg. |
| `navy-700` | `#0E3153` | Card **hover** fill. |
| `navy-600` | `#1a3a55` | Scrollbar thumb. |
| `teal-400` | `#3DD6B5` | Primary accent: eyebrows, active states, hero stat, CTA fill, links, dots, "live" indicator, AI-track roadmap. |
| `teal-300` | `#5FE0C4` | CTA hover fill (intro). (`#5FE3C6` link hover in library port.) |
| `blue-500` | `#4088CF` | Secondary accent: active filter pill fill, platform-track roadmap, "Back to <system>" flow list, top-right ambient glow. |
| `blue-300` | `#7FB6E8` | "Platform" evidence-pill text; library initial-badge ring. |
| `amber-400` | `#E8B54A` | "Reported" evidence-pill text (only amber in the deck). |
| `text-primary` | `#FFFFFF` | Headings, primary text on dark. |
| `text-secondary` | `#B5CDE0` | Body copy, ledes, sub-labels, idle nav links, intro subtitle. |
| `text-tertiary` | `#7A96B0` | Breadcrumb, feature tag, upcoming step tiles, menu section labels, counters, carrier modes. (`#7E97AC` on segmented pill idle text; `#7A93AC` on sheets — near-duplicates, see Part 7.) |
| `text-muted` | `#8FA9C0` | Source text on Validation step. |
| `text-faint` | `#5E7C96` | "SOURCE" label, evidence legend. |
| `text-crumb-sep` | `#3D5670` | Breadcrumb separators (also sheet body ink on light pages). |
| `text-flow-item` | `#D7E5F0` | Integration detail flow-list items. |
| `modeled-text` | `#9DB6CC` | "Modeled" evidence-pill text. |
| `hairline-08` | `rgba(255,255,255,.08)` | Nav bottom border, benefit bullet dividers, legend divider. |
| `hairline-10` | `rgba(255,255,255,.10)` | Card borders (module/carrier/integration/flow), step-dots pill border, menu tile borders. |
| `hairline-12` | `rgba(255,255,255,.12)` | Proof card border, top menu tile border, quote divider. |
| `hairline-16` | `rgba(255,255,255,.16)` | Back/Menu button borders, live-box frame, prev/next chevron border. |
| `hairline-18/22` | `rgba(255,255,255,.18)` / `.22` | Nav divider, search input border, close button; ghost pill borders, filter pills, "All modules" button (`1.5px`). |
| `surface-02/03/04/06` | `rgba(255,255,255,.02/.03/.04/.06)` | Upcoming step tile / segmented pill idle / completed step tile & menu tiles & proof card / prev-next chevrons & search input. |
| `teal-10/12/14/16` | `rgba(61,214,181,.10/.12/.14/.16)` | Live Site pill bg & active nav bg / module chip & active step tile / check-circle, active pill, Measured pill & Jump-to active tile / — |
| `teal-border-35/38/45/50/85` | `rgba(61,214,181,.35/.38/.45/.5/.85)` | Active nav inset ring / Live Site pill border / active pill border & Measured border & card hover ring / active step tile border & hover borders / card hover border |
| `teal-glow` | `rgba(61,214,181,.18/.22/.35/.40/.70)` | Step-tile glow `0 0 22px` / card hover `0 20px 56px` / stat text-shadow & CTA shadow / intro CTA / CTA pulse peak |
| `blue-glow` | `rgba(64,136,207,.30/.26/.12/.10)` | Active filter shadow `0 0 18px`; page ambient gradients |
| `overlay-nav` | `rgba(5,23,41,.82)` | Nav bar, fullscreen pills. `.86` demo badges, `.88` exit-fullscreen pill, `.6` step-dots pill. |

### 3.1.2 Sheets (light letter pages) — additional tokens

| Proposed token | Value | Role |
|---|---|---|
| `teal-700` | `#0F7B6C` | Deep teal for light backgrounds: eyebrows, stat units, "With FreightPOP", highlighted border, link colour. |
| `teal-800` | `#0A5C51` | Link hover. |
| `teal-icon` | `#3AC7A8` | WWW win-card icon stroke. |
| `teal-leader` | `#9FE0CE` | Teal leader lines, win-icon ring. |
| `teal-tint` | `#EAF7F3` / `#F0F8F6` / `#F3FAF8` | Teal-tinted gradient stops. |
| `red-600` | `#D32F2F` | Challenge numerals, "Before" / "The Challenge" labels. |
| `red-leader` | `#F0BFC4` | Pink leader lines, challenge badge border. |
| `red-tint` | `#FDEFF1` | Challenge badge gradient stop. |
| `ink-900` | `#051729` | Primary ink on white. |
| `ink-800` | `#16324C` | Secondary heading ink, thesis paragraphs. |
| `ink-600` | `#3D5670` | Body text on white, running header. |
| `ink-400` | `#7A93AC` | Page counters, "Before" body, stat sub-labels. |
| `ink-on-dark` | `#B5CDE0` / `#C8DAE9` | Kicker/footer text / cover lede. |
| `line-200` | `#D0DCE8` | Dividers. |
| `line-100` | `#E2EAF3` | Card borders. |
| `blue-tint` | `#F1F6FB` / `#F4F8FC` / `#FBFDFE` | Cool card / column gradient stops. |
| `star-gold` | `#F2B441` | Library star ratings. |

### 3.1.3 Semantic pairings to preserve
- **Teal `#3DD6B5` (dark) ↔ `#0F7B6C` (light)** are the same accent at two luminances. Never use `#3DD6B5` as text on white (fails contrast) — the sheets already switch correctly.
- **Teal = FreightPOP/after/AI; Blue `#4088CF` = platform/secondary/"back to their system"; Red `#D32F2F` = before/problem** (sheets only — the deck never uses red).
- Evidence grades: teal Measured, amber Reported, grey-blue Modeled, blue Platform.

## 3.2 Typography

Three families, vendored as woff2 in `extracted/` (deck) or loaded from Google Fonts (sheets, library, demos).

| Family | Weights loaded | Weights actually used | Role |
|---|---|---|---|
| **Manrope** | deck 400/600; sheets 400/500/700; library 200–800 | 300, 400, 500, (600/700 library only) | Display: every h1/h2/h3, card titles, stats, CTA-adjacent labels. Deck headings are **weight 400** (light, editorial), cards 500. |
| **DM Sans** | 300/400/500/600 | 300, 400, 500 | Body, ledes, buttons, nav links, bullets. Body copy is often **300**. |
| **DM Mono** | 400/500 | 400, 500 | Eyebrows, chips, breadcrumbs, counters, tags — always small (9–12 px), uppercase, tracked .05–.24em. |

### 3.2.1 Deck type scale (px unless noted)

| Role | Family / weight | Size | Line-height | Tracking | Colour |
|---|---|---|---|---|---|
| Intro h1 | Manrope 400 | 108 | 1.05 | −.02em | #fff |
| Intro subtitle | DM Sans 400 | 36 | 1.4 | 0 | #B5CDE0 |
| Intro URL caption | DM Sans 500 | 23 | — | .5px | #B5CDE0 |
| Intro CTA | DM Sans 500 | 20 | — | 0 | #051729 |
| Validation hero stat | Manrope 400 | 84 | .95 | −.03em | #3DD6B5 (+ 48 px glow) |
| Hub h1 | Manrope 400 | 60 / 58 | 1.02 | −.02em | #fff |
| Roadmap / Onboarding h1 | Manrope 400 | 54 | 1.02 | −.02em | #fff |
| Static guide h1 | Manrope 400 | 48 | 1.04 | −.02em | #fff |
| Integration detail h1 | Manrope 400 | 44 | 1.05 | −.02em | #fff |
| Feature h2 (module name) | Manrope 400 | 38 | 1.08 | −.02em | #fff |
| Problem h3 | Manrope 500 | clamp(27, 5.1vh, 38) | 1.12 | −.015em | #fff |
| Benefit h3 | Manrope 500 | 30 | 1.14 | −.01em | #fff |
| Roadmap section h2 | Manrope 500 | 26 | — | −.01em | #fff |
| Onboarding step label | Manrope 500 | 24 | 1.15 | −.01em | #fff |
| Module card title | Manrope 500 | 22 / 21 | 1.2 | −.01em | #fff |
| Jump-to top tile | Manrope 500 | 21 | — | −.01em | #fff |
| Platform roadmap label | Manrope 500 | 20 | 1.18 | −.01em | #fff |
| Jump-to module tile / AI roadmap label | Manrope 500 | 17 | 1.18 | −.01em | #fff / #3DD6B5 |
| Carrier/integration card name | Manrope 500 | 14 / 14.5 | — | −.01em | #fff |
| Step rail label | Manrope 500 | 14.5 | — | −.01em | #fff / #B5CDE0 / #7A96B0 |
| Problem body | DM Sans 300 | clamp(16, 2.9vh, 20) | 1.55 | | #B5CDE0 |
| Proof sentence | DM Sans 300 | 18 | 1.55 | | #fff |
| Lede | DM Sans 300 | 16 / 15.5 | 1.5 | | #B5CDE0 |
| Demo caption | DM Sans 400 italic | 16 | 1.5 | | #B5CDE0 |
| Stat label | DM Sans 400 | 16 | 1.4 | | #B5CDE0 |
| Benefit bullet | DM Sans 400 | 15.5 | 1.45 | | #fff |
| Evidence quote | DM Sans 400 italic | 15.5 | 1.5 | | #B5CDE0 |
| Flow list item | DM Sans 300 | 14.5 | 1.55 | | #D7E5F0 |
| Buttons (primary/ghost) | DM Sans 500 | 14 | | | #051729 / #fff |
| Card tag / menu sub / onboarding lines | DM Sans 400 or 300 | 13 / 13.5 | 1.45–1.5 | | #B5CDE0 |
| Filter pill | DM Sans 500 | 13 | | | #B5CDE0 / #fff |
| Roadmap body | DM Sans 300 | 12.5 / 13.5 | 1.45–1.5 | | #B5CDE0 |
| Nav links, Back, Menu, Live Site | DM Sans 500 | 12 | | | #B5CDE0 / #fff / #3DD6B5 |
| Source text | DM Sans 400 | 13 | 1.5 | | #8FA9C0 |
| Evidence legend | DM Sans 400 | 11.5 | 1.6 | | #5E7C96 |
| Eyebrow (page) | DM Mono 500 | 12 | | .16em upper | #3DD6B5 |
| Eyebrow (step) | DM Mono 400 | 11 | | .14em upper | #3DD6B5 |
| Feature tag | DM Mono 400 | 12 | | .08em upper | #7A96B0 |
| Module chip | DM Mono 500 | 11 | | .12em | #3DD6B5 |
| Breadcrumb / counters / menu section | DM Mono 400 | 11 | | .05–.13em upper | #7A96B0 / #3DD6B5 |
| Segmented pill / fullscreen pill | DM Mono 400 | 10.5 / 11 | | .10em upper | #7E97AC / #3DD6B5 / #fff |
| Evidence pill | DM Mono 400 | 10 | | .12em upper | grade colour |
| "Open →" card link | DM Mono 400 | 10.5 | | .08em upper | #3DD6B5 |
| Carrier modes line | DM Mono 400 | 9.5 | | .06em upper | #7A96B0 |
| Next-section micro label | DM Mono 400 | 9 | | .12em upper | #051729 @ .7 |

### 3.2.2 Sheet type scale
See §5.1–5.3. Summary: Manrope 300 for pull quotes/thesis (20–26), 400 for H1 (40–86), H2 (42), stats (40/46/56/62), footer (30/24/22/21); 500 for h3 (16–21) and tile titles (17). DM Sans 400 at 16/1.62 (lede), 15/1.7 and 15.5/1.72 (body), 14/1.6, 13/1.5–1.55, 12–13 (footer). DM Mono 400 at 10 (.24/.22/.18/.16em), 9.5 (.16 / .12em), 10.5 (.1em), 11 (badge numerals). Display tracking: −.03em H1, −.025em H2, −.02em stats/footers, −.015em h3/quotes, −.01em 16–17 px.

## 3.3 Spacing, radii, borders, shadows

**Spacing rhythm (deck):** the layout uses a loose 2 px base with recurring values 6 · 8 · 9 · 10 · 11 · 12 · 13 · 14 · 16 · 18 · 20 · 22 · 24 · 26 · 28 · 34 · 36 · 40 · 44 · 48 · 56 · 64. Key structural numbers: nav height **53**; page padding **104 / 48 / 56** (top/sides/bottom), feature page **96 / 48 / 96**; content max **1200** (1320 wide pages, 1700 guides, 1240 detail, 1020 demo stage, 880 demo placeholder, 820 problem column, 760 caption, 700 problem body); card grid gap **24**; menu grid gap **12–14**; step rail gap **12**; benefit grid gap **14 × 40**; roadmap node gap **16 / 28**; onboarding gap **24**; carrier grid gap **16**.

**Radii:**

| Radius | Used for |
|---|---|
| 5 px | module chip |
| 6 px | Back/Menu/Live Site buttons, nav links, primary & ghost buttons, intro CTA |
| 8 px | logo tile (40 px), demo badges, scrollbar thumb |
| 12 px | step rail tiles, Jump-to tiles, carrier/integration cards, hotspots, proof card right side |
| 14 px | integration flow cards, large logo tile (68 px) |
| 16 px | module cards, live-box frame, demo placeholder |
| 999 px | pills (segmented, filter, floating, evidence, method chips, step dots) |
| 50 % | prev/next chevrons, close button, dots, check circles, play button |

**Borders:** 1 px hairlines everywhere; 1.5 px only for the active Jump-to tile, the "All modules" ghost button and the dashed demo placeholder; 3 px for the proof card's teal left rule.

**Shadows (deck):**

| Name | Value | Used on |
|---|---|---|
| card-rest | `inset 0 1px 0 rgba(255,255,255,.06)` | all cards (a 1 px top highlight) |
| card-hover | `inset 0 1px 0 rgba(255,255,255,.10), 0 0 0 1px rgba(61,214,181,.45), 0 20px 56px rgba(61,214,181,.22)` | module cards |
| int-card-hover | `0 0 20px rgba(61,214,181,.12)` | integration cards |
| step-active | `0 0 22px rgba(61,214,181,.18)` | active step tile |
| pill-active-blue | `0 0 18px rgba(64,136,207,.30)` | active filter pill |
| menu-active | `0 0 26px rgba(61,214,181,.16)` / `0 0 22px …14` | Jump-to active tiles |
| live-box | `0 0 64px rgba(61,214,181,.12)` | demo/live frame |
| placeholder | `inset 0 1px 0 rgba(255,255,255,.05), 0 0 64px rgba(61,214,181,.09)` | dashed demo placeholder |
| proof-card | `inset 0 1px 0 rgba(255,255,255,.05), 0 0 36px rgba(61,214,181,.06)` | Validation proof card |
| cta | `0 8px 30px rgba(61,214,181,.40)` → pulse to `0 8px 44px rgba(61,214,181,.70)` | intro CTA |
| cta-float | `0 10px 30px rgba(61,214,181,.35)` | Walkthrough next-section pill |
| exit-fs | `0 6px 22px rgba(0,0,0,.4)` | exit fullscreen pill |
| stat-glow | `text-shadow: 0 0 48px rgba(61,214,181,.35)` | 84 px stat |
| live-dot | `0 0 0 3px rgba(61,214,181,.22)` | Live Site indicator dot |
| node-halo | `0 0 0 5px rgba(61,214,181,.14/.16)` / `rgba(64,136,207,.18)` | roadmap/onboarding dots |

**Blur:** `backdrop-filter: blur(12px)` nav; `blur(14px)` Jump-to overlay; `blur(6px)` chevrons and step-dots pill.

## 3.4 Motion

| Name | Definition | Where |
|---|---|---|
| `fpPulse` | `0%,100% { box-shadow:0 8px 30px rgba(61,214,181,.40) } 50% { box-shadow:0 8px 44px rgba(61,214,181,.70) }` | Intro CTA `3.2s ease-in-out 3.4s infinite`; demo placeholder play button `2.6s` |
| `fpFadeUp` | opacity 0→1, translateY 16→0 | (declared; intro uses JS fades instead) |
| `fpFadeIn` | opacity 0→1 | Jump-to overlay `.25s ease`; pillar page header `.3s ease` |
| `fpMarquee` | translateX 0 → −50 % | (declared; marquee is JS-driven) |
| `fpReveal` | opacity 0→1, translateY 28→0 | Non-pillar content blocks `.7s cubic-bezier(.22,.7,.25,1)` (feature steps) |
| `fpSettle` | opacity 0→1, translateY 12→0, scale .965→1 | Card cascades `.44s cubic-bezier(.22,1,.32,1.06)`, stagger `min(i×34, 460) ms` (hubs) or `min(i×16, 420) ms` (carrier/integration grids) |
| hover transitions | `200ms cubic-bezier(.2,0,0,1)` (cards), `.2s ease` (tiles, pills), `.3s ease` (step dots), `.15s ease` (nav link colour) | |
| intro fades | JS, `ease = 1−(1−k)^3`, per-element delay/duration (600/1300, 2000/1200, 3400/1200, 3900/1300 ms), 16 px rise | Intro |
| logo marquee | JS, `oneSet/1200 px per 16 ms` ≈ 20 s per loop | Intro |
| card hover lift | `translateY(-4px)` | module cards |

The library port adds `vlSlide` (.28s/.2s), `vlDriftA` 26s, `vlDriftB` 34s, `vlPulse` 18s for the background orbs.

## 3.5 Component library — deck side

Each entry: name · anatomy · states · where used. Specs are in §2; this is the index a designer would turn into Figma components.

| # | Component | Variants / states | Used on |
|---|---|---|---|
| 1 | **Top nav** | crumb depth 1/2/3; 12 links each idle/hover/active | all non-intro views |
| 2 | **Ghost button (small)** — Back / Menu / Back to module | idle, hover (teal border+text) | nav, library overlay |
| 3 | **Live Site pill** | idle, hover | nav |
| 4 | **Eyebrow** | page (12 px / 26 dash), step (11 px / 22 dash) | every page |
| 5 | **Page header** (h1 + lede) | h1 60/58/54/48/44 | pillar pages |
| 6 | **Module card** | TMS (t1+t2, tag+Open), WMS/OMS/Workflow (title, tag, Open/Watch); rest, hover | hubs |
| 7 | **Module chip** "MODULE 03 / 18" | — | feature header |
| 8 | **Step rail tile** | active / completed / upcoming | feature |
| 9 | **Step dots pill** | 4 positions | feature (not on demo step) |
| 10 | **Prev/Next chevron** | — | feature |
| 11 | **Check bullet** | — | Benefit step |
| 12 | **Segmented pill group** (Walkthrough / AI Demo / Live Site / Expand) | on / off | Live Demo step |
| 13 | **Demo stage frame** (live box) | normal (1020 max, r16, glow) / expanded (fullscreen) | Live Demo step |
| 14 | **Demo placeholder** (dashed, play, progress) | — | modules without a demo |
| 15 | **Corner badge** "app.freightpop.com · X" | — | live/AI frames |
| 16 | **Evidence pill** | Measured / Reported / Modeled / Platform | Validation step |
| 17 | **Hero stat** (84 px) + label | — | Validation step |
| 18 | **Proof card** (left teal rule) | with / without quote | Validation step |
| 19 | **Source row + legend** | — | Validation step |
| 20 | **Primary button** (teal) / **Ghost button (large)** | — | Validation step |
| 21 | **Timeline** (track + node) | teal / blue; 9 / 4 / 6 columns | Roadmap, Onboarding |
| 22 | **Search input** (pill) | — | Carrier/ERP guides |
| 23 | **Filter pill** | idle / hover / active (blue) | Carrier/ERP guides |
| 24 | **Logo tile** | 40 px / 68 px; image / initial fallback | Carrier/ERP cards & detail |
| 25 | **Carrier card** (name + modes) / **Integration card** (name) | rest / hover | guides |
| 26 | **Integration detail page** | with bespoke or generic copy | ERP guide |
| 27 | **Flow card** (Into / Back to) | teal / blue | integration detail |
| 28 | **Method chip** | — | integration detail |
| 29 | **Floating pill** (Fullscreen / Back to deck / Exit fullscreen) | — | iframe screens |
| 30 | **Next-section CTA** | — | Walkthrough |
| 31 | **Jump-to overlay** — top tile / module tile | rest / active | menu |
| 32 | **Validation Library overlay header** | — | feature step 4 |
| 33 | **Intro artboard** (1920×1080): h1, subtitle, CTA, URL, logo, marquee, Rive canvas | fade sequence | intro |
| 34 | **Hotspot** (transparent, r12) | — | walkthrough, main menu |


## 3.6 Component library — demo side (the FreightPOP product UI, as reproduced)

This is the **light, product-faithful** system used inside the 43 cooking demos. It is *not* the brand system: the CLAUDE.md fidelity rule requires it to look like `app.freightpop.com`. Values are the dominant ones; §4.4 and Part 7 list the variants.

### 3.6.1 Palette (demo/product)

| Role | Hex | Count* | Notes |
|---|---|---|---|
| Primary blue (buttons, links, active tab underline, focus, ripple, FAB) | `#4088CF` | 995 | OMS-family alt: `#2C6DB5` (139) |
| Pressed primary | `#1557B0` / `#1565C0` | 31 / – | |
| AI user bubble / AI ripple | `#2E7CE4` | 16 | |
| Top nav | `#0B1A2E` | 73 | variants `#122B45`, `#0B2039`, `#16324E`, `#12293F` |
| Page background | `#E9EEF5` | – | variants `#F1F4F8`, `#EEF2F8`, `#DCE7F5`, `#EAEFF7`, `#EAEFF5`, `#EEF2F7`, `#EFF3F9`, `#fff` |
| Card header fill | `#F3F6FA` | 79 | |
| Page-title ink | `#14263C` / `#1B2B3D` | 76 / 91 | variant `#1A1A1A` in 5 newer grid demos |
| Primary text / card titles | `#24354A` | 579 | |
| Table header text | `#3A4B60` | 203 | |
| Input value text | `#2A3B50` | 129 | |
| Secondary text, tab labels, cancel text, floating labels | `#5E7186` | 684 | OMS-family floating labels are **amber `#B57A13`** (82) |
| Icons, placeholders, disabled | `#8A97A8` / `#9AA7B8` | 487 / 162 | |
| Input & secondary-button borders | `#C6D0DC` | 283 | |
| Outline-blue button border | `#B9CDE8` | 173 | |
| Card header border / row dividers | `#E1E7EF` / `#EDF1F6` / `#DDE4EC` / `#E4E9EF` | 277 / 114 / 186 / 90 | |
| Selected-row / hover tint | `#EAF3FF` / `#EAF1FB` / `#F7FAFF` | 15 / – / – | best-rate row `#F6FBF9` |
| Success green | `#3B9E4E` (icons), `#2E5E33` (text), `#E7F4E4` (fill), `#0F8A6D`/`#DCF5EE` (chip) | 68 / 56 / 29 / 31 / 14 | |
| Amber / warning | `#B57A13`, `#9A6B12`, `#E8A33D`, `#FDF6E7`, `#FFF3CF`, `#F0D9A6` | | |
| Red / danger | `#C0392B` (LATE, over-capacity), `#D3372C` (trash), `#B3261E` (HAZMAT text), `#FFF3F2`/`#F3C2BE` (HAZMAT pill) | 26 | |
| Purple | `#EDE7FA` / `#5B4B9E` | 1 / 2 | `Disputed` pill only |
| Tracking status set | Booked `#4EA8E0` · In Transit `#1A3E6E` · Delivered `#9AA7B8` · No Tracking `#E8912A` · Delayed `#B3261E` · Issue `#9E2A22` | | FleetDispatch/Track |
| Demo overlay teal (caption, progress, transport) | `#3DD6B5` / `#8FE8D4` | 583 / 86 | **not a product colour** |
| Overlay scrim | `rgba(5,23,41,.86)` | 113 | caption + transport bar |

*Count = occurrences across the 43 files.

### 3.6.2 Type (demo/product)
- App chrome: `'Segoe UI','Helvetica Neue',Arial,sans-serif` (set once on the 1440 canvas).
- Weights: **700 dominant** (every button, tab, label — 1,091 uses), 600 (card titles, active nav — 242), 400 (87), 500 (22), 300 (9).
- Page title 19–20 px / 700 (`#14263C`; 22 px in some OMS); sub-tabs 11 px / 700 / `.05em` uppercase `#5E7186`; card titles 14 px / 600 `#24354A`; buttons 10–12.5 px / 700 / `.04–.06em` uppercase; floating labels 10–10.5 px; body 12–13.5 px; grid header 11 px / 700.
- Demo overlay: DM Mono 12 px `.08em` uppercase (caption), DM Mono time label.

### 3.6.3 Radii, shadows, layout
- Radii: 4 px (buttons/inputs — 527), 3 px (OMS family — 421), 6 px (cards; `6px 6px 0 0` headers — 260), 8 px (modals, AI panel, caption), 15 px (round search), 22 px (transport pill), 999 / 9 px (chips), 50 %.
- Shadows: card `0 1px 3px rgba(16,42,67,.10)`; modal `0 18px 50px rgba(5,20,40,.4)`; FAB `0 2px 8px rgba(64,136,207,.35)`; focus ring `0 0 0 3–4px rgba(64,136,207,.14–.18)`; AI panel `0 12px 44px rgba(10,30,55,.28)`; drawer `-14px 0 40px rgba(5,20,40,.24)`.
- Layout: absolute positioning throughout; top nav 52; title bar 64 (`top:52; padding 7px 36px 0`); content from y≈132; cards `left:30px`, gutters 16–20; card header 36 (also 32/40/44); inputs 42 px tall with floating label `top:-7px; left:10px; background:#fff; padding:0 4px`.

### 3.6.4 Components

| Component | Spec | Where |
|---|---|---|
| **Top nav** | see §4.4 | 41 demos |
| **Title bar + sub-tabs** | 64 px white, `border-bottom 1px #E1E7EF`; 20/700 title; uppercase 11 px tabs, active `#4088CF` + `2.5px` underline `padding-bottom 6px`; optional 30–34 px `#4088CF` `+` FAB top-right | ~36 |
| **Card** | white, r6, `0 1px 3px rgba(16,42,67,.10)`, 36 px header `#F3F6FA` with 14/600 title, `border-bottom 1px #E1E7EF` | all app demos |
| **Floating-label input** | 42 px, `border 1px #C6D0DC` r4; label 10.5 px `#5E7186` floated at `top:-7px` on white; focus border `#4088CF` + ring | Quote/Ship family, Wms forms, UsersRoles, CarrierMgmt, Pooling |
| **Primary button** | `#4088CF` fill, white 10.5–11.5 px 700 `.04–.05em` uppercase, `padding 8–11px 15–22px`, r4; pressed `#1557B0` | RATE SHOP, SHIP IT, CONFIRM, SUBMIT, PROCESS TRANSFER, OPTIMIZE, DISPATCH |
| **Primary (OMS family)** | outlined `1px #B9CDE8` r3, text `#2C6DB5` 10.5/700 | SHIP, SAVE |
| **Secondary (outline blue)** | `1px #B9CDE8` r4, `#4088CF` 10.5/700, `padding 10px 12px` | SAVE SHIPMENT, PREVIEW BOL, SPOT QUOTE |
| **Neutral / cancel** | `1px #C6D0DC` r4, `#5E7186` 10.5–11/700, `padding 11px 16–24px` | CANCEL, CLOSE (CLEAR SHIPMENT uses `#24354A`) |
| **Disabled** | `1px #E4E9EF`, `#A9B4C0` | |
| **Danger** | none exists as a button — red only as pills/icons | |
| **Quote/Ship bottom bar** | `Total Outer Handling Units · Total Handling Units · Total Weight · Total Linear Feet` + `CLEAR SHIPMENT | PREVIEW BOL | SAVE SHIPMENT | SPOT QUOTE | RATE SHOP` | 11 demos |
| **Quote/Ship header toolbar** | `Order Import` field + `START CONSOLIDATION | RECENT QUOTES | TEMPLATES` + `Process Date` | 8 |
| **Data grid** | header 30 px `border-top/bottom 1px #E4E9EF`, 11/700 `#3A4B60` (title-case in grid demos, uppercase 10.5 `.06em` in rate/audit tables); rows 48 px (`#E1E7EF`) or 46 px (`#EDF1F6`), 34 compact; no zebra; selected `#EAF3FF`; checkbox 14×14 `1.5px #93A2B4` r2; order numbers as `#4088CF` links; row action icons (details / edit / truck / red trash) | all grid demos |
| **Pager** | `Results Per Page: 50 · 1–19 of 19` with `‹ 1 ›` | grids |
| **Selection action bar (OMS)** | full-width `#4088CF` bar "N Selected" + white outlined buttons `QUOTE SELECTED | SPOT QUOTE SELECTED | SHIP SELECTED | CONSOLIDATE SELECTED | CREATE DELIVERY | AUTO SPLIT DELIVERIES | CREATE SAVED SHIPMENT FOR SELECTED | SHOW SELECTED | CLEAR SELECTED` | 9 |
| **Rates grid** | `Carrier | Service | Delivery Days | Discounted Rate | Marked Up Rate | Rating | Carrier Nickname` + `LOWEST RATE` chip | 9 |
| **Address Validator modal** | side-by-side map tiles + suggestion radios + `USE SELECTED ADDRESS` / `APPLY & FLAG ACCESSORIALS` | RateShop, Accessorial, AiAccessorialAgent |
| **Modal** | backdrop `rgba(64,136,207,.18–.24)` (blue tint); white r8 (or 6), `0 18px 50px rgba(5,20,40,.4)`, `.3s` fade-up; 15–17/600 title + ×; footer buttons right (CANCEL left of primary) or left `CLOSE` in OMS | all |
| **Drawer** | right slide, `-14px 0 40px` shadow | FILTER SALES ORDERS, ADD PACKAGE |
| **`···` more-menu popover** | | Consolidation, RouteOpt |
| **Chips** | green `#DCF5EE/#0F8A6D` 9.5/700 `.06em` `padding 2.5px 7px` r9 (`LOWEST RATE`, `NEW`); hazmat `#FFF3F2/#B3261E` `1px #F3C2BE` r999; neutral `#F3F6FA/#4A5B70` (`READY`) | |
| **Status pills** | `LATE` `#C0392B` white; `APPROVED`/`PAID`; `Disputed` purple; `COMPLETED` `#E7F4E4/#2E5E33` | Track, Audit, CycleCount |
| **Toast / success strip** | `#E7F4E4` r6 strip, or white card `border-left 4px #3B9E4E` `0 10px 30px rgba(5,20,40,.18)` | 12+ |
| **Warning strip** | `#FDF6E7` `1px #F0D9A6` | SpotQuote |
| **Toggle** | 34×18 r9 on `#4088CF`, off `#C6D0DC` | |
| **FreightPOP AI panel (light)** | 472×550 white, header "FreightPOP AI" + `New chat` chip `#EAF1FB/#4088CF`, user bubbles `#2E7CE4`, assistant `#F4F5F7`, input "Ask FreightPOP AI…" | AiCopilot, AiAccessorialAgent, AiAutoConsolidation |
| **FreightPOP AI panel (dark)** | 834×640 `#0B1A2E`, `1px rgba(61,214,181,.34)` | AiAuditing |
| **Browser-in-browser chrome** | URL bar + page | ReturnsPortal, TrackNotify, DockSched, SpotQuote |
| **Email render** | | SpotQuote |
| **Document render** (BOL, Pick Slip, PDF preview) | | DocsBol, SpotQuote, WmsOrderPicking, OmsThirdParty |
| **Phone mockup** | 300 px, r34 bezel `#3C4550→#171D24`, status bar `#123457` | DriverPod |
| **Rugged-scanner mockup** | | WmsPicking, WmsInventory, WmsBinTransfer |
| **Calendar / week board** with capacity bars | | FleetDispatch, DockSched |
| **Map tile + polyline** | | RouteOpt |
| **KPI tile strip** | | InvoiceAudit, Reports, WmsCycleCount, AiAuditing |
| **Charts** | pies (FleetDispatch), bars (Reports) | |
| **Explainer rails** ⚠ | `QUOTE READINESS RAIL`, `TMS HANDOFF RAIL`, `LEDGER RAIL`, "why these fired", `Notifications Fired`, `WHY THIS FLAGGED`, `How it runs` — **invented panels that violate the fidelity rule** | OmsProductDetail, WmsPicking, BinTransfer, Accessorial, TrackNotify, InvoiceAudit, AutoDispatch |
| **Dark marketing slide** | deck-style navy + Manrope | OmsSalesOrder opener, OrderHandoff (entire), LicensePlate scene 2 |
| **Demo overlay** (caption, transport, progress, cursor, ripple, PAUSED) | §4.2 | 42 (OrderHandoff has none) |

## 3.7 Iconography

All icons are inline SVG, 24-unit viewBox, `fill:none; stroke:currentColor; stroke-width:2.2; stroke-linecap/linejoin:round` (Lucide/Feather style). Sizes: 14 px (nav buttons), 12 px (external link), 13 px check (stroke 3), 16 px close, 20 px chevrons. The arrow used on CTAs and card links is a custom 26×14 path `M1 7h22M18 1l6 6-6 6` (stroke 2), rendered at 26×14, 22×13 or 16×9. Glyph characters are also used as icons: ⛶ (fullscreen), ✕, ✦ (AI), ↗, ←, →, ▸. Sheets' WWW win cards use 14 px Lucide-style icons stroked `#3AC7A8`.

## 3.8 Brand token reference (`uploads/FreightPOP Brand Token Reference.html`)

A separate, leadership-facing token sheet — "FreightPOP - Brand System / Token & Component Reference … Visual examples for every design token and component across all five project phases. For leadership review and design team reference." Legend chips: **Confirmed · Proposed - needs approval · Needs input**. Only Phases 1–4 are present. This is the closest thing the project has to an official design system, and it is **website/marketing-oriented (light theme)**; the deck's dark theme borrows its navy/teal/blue but adds many tints not defined here (see §3.1 and Part 7). Reproduced verbatim:

### `:root`
```css
--navy:          #051729;
--blue:          #4088CF;
--mint-deep:     #0F7B6C;  /* updated from #136E72 */
--mint-bright:   #3DD6B5;
--white:         #FFFFFF;
--surf-subtle:       #F4F7FB;
--surf-card:         #E8EFF7;
--surf-dark-raised:  #0A2540;
--txt-secondary:     #3D5670;
--txt-muted:         #7A96B0;
--txt-on-dark:       #FFFFFF;
--txt-sec-on-dark:   #B5CDE0;
--txt-muted-on-dark: #7A96B0;
--fb-success:    #2E7D32;
--fb-warning:    #F59E0B;
--fb-error:      #D32F2F;
--fb-info:       #1565C0;
--border-default:   #D0DCE8;
--border-emphasis:  #7A96B0;
--border-focus:     #0F7B6C;
--border-accent:    #4088CF;
--chart-1: #4088CF; --chart-2: #0F7B6C; --chart-3: #3AADBC;
--chart-4: #0A3D6B; --chart-5: #4CAF85; --chart-6: #7A96B0;
--page-bg: #F4F7FB;
--card-bg: #FFFFFF;
```
Base: `body { font-family:'DM Sans'; font-size:15px; line-height:1.5; color:var(--navy) }`; `h1–h5 { font-family:'Manrope'; line-height:1.1 }`; `h1,h2 { font-weight:400 }`; `h3–h5 { font-weight:500 }`.

### Phase 1 — Foundation

**1A Color palette** ("single source of truth… CMYK and Pantone values to be confirmed before first commercial print run")

| Token | Hex | Use |
|---|---|---|
| color-brand-navy | #051729 | Primary brand color. Dark backgrounds, nav bar, body text on light surfaces. |
| color-brand-blue | #4088CF | Headlines, accents, primary CTAs on white. Data viz series 1. |
| color-brand-white | #FFFFFF | Page backgrounds, reversed text on dark surfaces. |
| color-accent-mint-deep | #0F7B6C | Buttons, links, focus rings on light backgrounds. Data viz series 2. |
| color-accent-mint-bright | #3DD6B5 | Buttons, highlights, CTAs on dark backgrounds. 9.9:1 on navy. |
| color-extended-sky-teal | #3AADBC | Data viz series 3. Supporting UI accents. |
| color-extended-deep-navy | #0A3D6B | Data viz series 4. Dark illustrative elements. |
| color-extended-sage | #4CAF85 | Data viz series 5. Positive trend indicators. |
| color-extended-slate | #7A96B0 | Data viz series 6. Neutral baselines, muted UI text. |
| color-feedback-success | #2E7D32 | Confirmations, completed states, positive metrics. |
| color-feedback-warning | #F59E0B | Alerts, delays, attention-needed states. |
| color-feedback-error | #D32F2F | Failures, validation errors, critical alerts. |
| color-feedback-info | #1565C0 | Informational banners, neutral notifications. |

**1B Semantic tokens** ("Proposed values… To be reviewed and confirmed before locking.")

| Token | Value | Use |
|---|---|---|
| color-surface-page | #FFFFFF | Main page background |
| color-surface-subtle | #F4F7FB | Section fills, zebra rows, input backgrounds |
| color-surface-card | #E8EFF7 | Card fills on white backgrounds |
| color-surface-dark | #051729 | Dark backgrounds, hero sections |
| color-surface-dark-raised | #0A2540 | Cards and panels on dark backgrounds |
| color-text-primary | #051729 | Primary heading or body copy on white |
| color-text-secondary | #3D5670 | Subheadings, metadata, and caption text |
| color-text-muted | #7A96B0 | Placeholder text, disabled labels, helper text |
| color-text-primary-on-dark | #FFFFFF | Primary heading or body copy on navy |
| color-text-secondary-on-dark | #B5CDE0 | Subheadings, metadata, captions on dark surfaces |
| color-text-muted-on-dark | #7A96B0 | Placeholder text and disabled labels on dark surfaces |
| color-text-accent-on-dark | #3DD6B5 | Links and highlights on dark backgrounds |
| color-border-default | #D0DCE8 | card outlines, inputs, dividers |
| color-border-emphasis | #7A96B0 | hover state borders, selected rows |
| color-border-focus | #0F7B6C | keyboard focus rings |
| color-border-accent | #4088CF | selected state, active tab, highlighted card |

**1C Typography scale** — "Headings: Manrope 400, line-height 1.1, letter-spacing -0.02em at large sizes / -0.01em at smaller sizes. H3/H4 use Manrope 500 for legibility at smaller sizes. Body: DM Sans 400, line-height 1.5 (website/marketing context). Exact sizes shown here as recommended values to be confirmed."

| Style | Spec | Sample |
|---|---|---|
| Display | Manrope 400 / 56px / lh 1.05 / ls −0.02em | Supply chain, simplified. |
| H1 | Manrope 400 / 40px / lh 1.1 / ls −0.02em | Transportation Management System |
| H2 | Manrope 400 / 32px / lh 1.1 / ls −0.01em | Rate Shopping & Carrier Management |
| H3 | Manrope 500 / 24px / lh 1.1 / ls −0.01em | Auto Dispatch & Route Optimization |
| H4 | Manrope 500 / 18px / lh 1.2 / ls 0 | Invoice Auditing and Analytics |
| Body large | DM Sans 400 / 18px / lh 1.5 | |
| Body default | DM Sans 400 / 15px / lh 1.5 | |
| Body small | DM Sans 400 / 13px / lh 1.5 | |
| Caption | DM Sans 400 / 12px / lh 1.4 | Last updated April 16, 2026 · 3 min read |
| Label | DM Sans 500 / 12px / lh 1 | Annual savings |
| Overline | DM Sans 500 / 11px / ls 0.08em / uppercase | Transportation Management |

(Note: the deck uses **DM Mono** for overlines/eyebrows, whereas this sheet specifies DM Sans 500. See Part 7.)

**1D Spacing scale** — "Base-4 system."

| Token | Value | Typical use |
|---|---|---|
| space-1 | 4px | Gap between an icon and its label; gap between a badge and inline text |
| space-2 | 8px | Padding inside tags and badges; gap between stacked form label and input |
| space-3 | 12px | Gap between nav items; button internal padding; gap between icon and card title |
| space-4 | 16px | Internal card padding (small); gap between form fields; gap between heading and subheading |
| space-6 | 24px | Standard card padding; gap between sections within a card; margin below section heading |
| space-8 | 32px | Gap between cards in a grid; gap between hero heading and CTA |
| space-12 | 48px | Vertical padding for a page section block; gap between major content sections |
| space-16 | 64px | Large section breaks; top/bottom padding on hero sections and full-width banners |

**1E Shadow elevation** — "Shadow color is keyed to brand navy rgba(5,23,41,...) rather than pure black."

| Token | Use | Value |
|---|---|---|
| shadow-none | Flat surfaces, table rows, tags | none + border 1px solid border-default |
| shadow-xs | Input fields, small badges | 0 1px 2px rgba(5,23,41,0.05) |
| shadow-sm | Cards at rest, dropdowns | 0 1px 4px rgba(5,23,41,0.07), 0 1px 2px rgba(5,23,41,0.04) |
| shadow-md | Hover state cards, popovers | 0 4px 12px rgba(5,23,41,0.08), 0 1px 4px rgba(5,23,41,0.04) |
| shadow-lg | Modals, command palettes | 0 8px 24px rgba(5,23,41,0.10), 0 2px 6px rgba(5,23,41,0.05) |
| shadow-xl | Overlays, side drawers | 0 16px 40px rgba(5,23,41,0.12), 0 4px 10px rgba(5,23,41,0.06) |

**1F Border radius** — "radius-lg (12px) is the recommended default card radius."

| Token | px | Use |
|---|---|---|
| radius-none | 0 | Full-bleed images, flush table edges |
| radius-xs | 4 | Tags, badges, code snippets |
| radius-sm | 6 | Buttons, inputs, chips |
| radius-md | 8 | Icon containers, tooltips |
| radius-lg ★ | 12 | Cards, panels, modals — default |
| radius-xl | 16 | Feature cards, hero sections |
| radius-2xl | 24 | Marketing callout blocks |
| radius-full | pill | Pills, avatars, toggles |

**1G Data visualization palette** — Series 1 Brand blue #4088CF · 2 Mint deep #0F7B6C · 3 Sky teal #3AADBC · 4 Deep navy #0A3D6B · 5 Sage green #4CAF85 · 6 Slate neutral #7A96B0.

### Phase 2 — Core interactive components
- **2A Buttons** (`.btn`: DM Sans 500 14px, padding 10px 20px, radius 6). Primary light: `#0F7B6C`/#fff, hover `#0A5C51`, active `#073D36`, focus `outline 2px solid #0F7B6C; offset 3px`, disabled `#A8CCC8`. Primary dark: `#3DD6B5` fill + `#051729` text, hover `#2EB89A`, active `#239B80`, disabled `bg #1A4040 / text #3D5670`. Ghost light: `1.5px solid #0F7B6C`, hover `rgba(15,123,108,.06)`. Ghost dark: `1.5px solid #3DD6B5`, hover `rgba(61,214,181,.1)`. Samples "Get a demo" / "Learn more".
- **2B Form elements** — input DM Sans 14px; `padding 9px 12px; radius 6; border 1px #D0DCE8`; focus `border #0F7B6C; box-shadow 0 0 0 3px rgba(15,123,108,.1)`; error `border #D32F2F; shadow rgba(211,47,47,.08)`; disabled bg `#F4F7FB`.
- **2C Navigation** — bar `#051729`, height 56; items 14px, `padding 8px 14px; radius 6`; default `#7A96B0`, hover `#fff` + `rgba(255,255,255,.06)`, active `#3DD6B5`, CTA teal fill + navy text. Items: FreightPOP · Solutions · Integrations · Resources · Pricing · About · Get a demo.
- **2D Feedback** — Success bg #E8F5E9 / #2E7D32 · Warning #FFF8E1 / #F59E0B · Error #FFEBEE / #D32F2F · Info #E3F0FB / #1565C0.
- **2E Accordion** — header `#FFFFFF`, open `#F4F7FB`; items Customer Information / Analysis Information / Shipping Information ("Appears in the ROI tool and on product pages").

### Phase 3 — Content and marketing components
- **3A Cards** — feature card `radius 12; padding 24px 20px; border 1px #D0DCE8; shadow-sm`, hover shadow-md; icon block 40×40 r10; title Manrope 500 15px; body 13px `#3D5670`. Stat callout Manrope 500 40px with accent span `#0F7B6C`: "30% reduction in freight spend", "1,500+ pre-built carrier integrations", "Inc. 5000 fastest growing logistics tech, 2024 and 2025".
- **3B Badges / tags / toggle chips** — badge 12px 500, `padding 4px 12px`, pill (TMS, WMS, OMS, Active, Pending, Integration); toggle chips unselected `bg #E8EFF7; #3D5670; border #D0DCE8`, selected `bg rgba(15,123,108,.1); #0F7B6C; border #0F7B6C`.
- **3C Logo / integration grid** — 5-col cells 56 px tall, r8, `shadow 0 1px 2px rgba(5,23,41,.05)`; "logo color treatment (full color vs grayscale) to be confirmed."

### Phase 4 — Product and data UI components
- **4A Data tables** — header bg `#F4F7FB`, text `#3D5670` 12px 500, sort header `#4088CF` with ↓; row hover `#F4F7FB`, selected `rgba(64,136,207,.06)`, error `rgba(211,47,47,.04)`.
- **4B Empty states** — card r12, `padding 56px 24px`; icon 48 px `#7A96B0`; heading Manrope 500 16px; body 13px. "No shipping data available" / "Add shipping data".

---

# Part 4 — Cooking Demos (43 mini-apps)

## 4.1 What a cooking demo is

A cooking demo is a **self-contained `.dc.html` that reconstructs one FreightPOP screen at 1440 × 810 and auto-plays a scripted scenario** — a synthetic cursor moves, fields type themselves, modals open, a caption strip names each step, a teal progress bar runs along the bottom. It is mounted inside the deck's Live Demo step at 1020 px wide (so the 1440 canvas is scaled ×0.708, giving the ~580 px natural height the deck expects). The deck can also "Expand" it to fullscreen.

The internal reference document `Cooking Demo Reference.dc.html` (dated July 28, 2026, "35 demos · 1440×810 canvas each") describes the intent verbatim:

> "Each one is a 1440×810 reconstruction of the real app — dark navy top nav with the FreightPOP mark, global search, the module tabs, the white page-title bar with its sub-tabs, and grey-blue cards with #F3F6FA headers. A synthetic cursor moves, clicks ripple, fields type themselves, and a teal caption strip in the lower left names the current step while a teal progress bar runs along the bottom. Click the frame to pause, use the circular arrow to replay, and Expand to blow it up full-screen. No demo shows a real login or real customer data — the companies, orders and PROs are invented; the screens, fields and behaviour are not."

The reference also grades fidelity in three tiers (its own colour swatches):
- **`#0F8A6D` Built from documented screens** (Confluence articles): Rate Shopping, Pooling & Cross-Dock, Users/Roles, Parcel Shipping, Address & Accessorials, Shipping Rules, Carrier Management, Dock Scheduling, the WMS set — "Field names, dropdown options and behaviours should match what a prospect sees in the app."
- **`#146F8C` Built from transcripts and workflow logic**: Spot Quoting, Documents & BOL, Tracking & Notifications, Invoice Audit, Reporting, Order Management, Hazmat detail, Third-Party & Inbound — "Safe to demo; don't promise pixel parity."
- **`#B03A2E` Inferred — verify before a technical audience**: Fleet & Dispatch, Driver App & POD — "modelled on how reps describe them, not on a screenshot."

⚠ The reference is a month stale: it lists 35 demos; the folder now has 43 (the four `Ai*` demos and the four 2025-08 `Wms*` rebuilds are missing from it), and ~14 of the 35 have been rebuilt with different content and step counts since. It also describes a "circular arrow to replay" and an "Expand" button that do not exist inside the demos (Expand lives in the deck; the demos have a transport bar). Treat Part 4 of this document, not the reference, as current.

## 4.2 Shared anatomy of every demo

```
<div wrapper aspect-ratio 1440/810; border-radius:16px; border:1px solid rgba(255,255,255,.16);
     box-shadow:0 0 64px rgba(61,214,181,.12); background:#0A2540; overflow:hidden>
  <div canvas 1440×810; transform:scale(k); font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; background:#E9EEF5>
    ├─ TOP NAV (52px, #0B1A2E)            — logo · search pill · ✦ AI BETA · NEW EXPERIENCE · DASHBOARD · module tabs · avatar
    ├─ TITLE BAR (64px, #fff)             — 20px/700 page title · uppercase 11px sub-tabs (active #4088CF, 2.5px underline) · optional FAB
    ├─ CONTENT (from y≈132)               — cards with #F3F6FA 36px headers, grids, modals, drawers
    ├─ CURSOR (23×23 SVG arrow)           — transition:transform .6s cubic-bezier(.45,.05,.25,1)
    ├─ CLICK RIPPLE                       — 38px ring, border 3px #4088CF, scale .35→1.7, .5s
    ├─ CAPTION STRIP (bottom-left)        — rgba(5,23,41,.86) · #3DD6B5 · DM Mono 12px .08em uppercase · padding 8px 14px · r8 · "NN · Sentence"
    ├─ TRANSPORT BAR (bottom-right)       — rgba(5,23,41,.86) pill r22 · teal SVG buttons: |◀ back to start · ◀◀ −10s · ▶/❚❚ · ▶▶ +10s · "0:11 / 0:24" (DM Mono, #8FE8D4)
    └─ PROGRESS TRACK (bottom, 12px)      — rgba(5,23,41,.16) track · #3DD6B5 fill @.9 · click to scrub
  PAUSED state: "PAUSED" DM Mono badge above caption + 76px centred play circle rgba(5,23,41,.85)
```

**Props (`data-props`, identical in 42 of 43):** `$preview 1180×700` · `speed` (range 0.5–2, step 0.25, unit "x", default 1) · `autoPlay` (boolean, default true). SpotQuote uses step 0.1; DriverPod has no `autoPlay`.

**Engine:** `requestAnimationFrame` tick, `t += dt × speed`, loops at `DUR`. Steps are keyframes `KF = [{ t: seconds, s: { …state } }]` applied cumulatively; captions are `cap:` strings. **No click-to-advance anywhere** — timing is fixed; clicking the frame toggles pause. Typewriter fields use `TYPERS = [{ t0, dur, field, text }]` with a blinking `1.5×13px #4088CF` caret. Reveals use `translateY(8px)→0 .3s` with `i × .09–.12s` stagger; modals `translateY(14px) scale(.985)`; drawers slide from the right. Focus highlight: input border `#4088CF` + `0 0 0 3px rgba(64,136,207,.18)`.

**Durations:** 18 s (OmsOrderMgmt) to 109 s (SpotQuote); median ≈ 24 s; the 2025-08 WMS rebuilds run 40–80 s.

## 4.3 Catalog

Columns: file · size · duration · keyframes · nav variant (§4.4) · the FreightPOP screen reproduced (titles, tabs, toolbar, columns — verbatim) · captions (the rep's on-screen narration, verbatim, in order). **Deck wiring** shows which module mounts it (from §2.18) or ORPHAN.

### TMS

**RateShopDemo** — 53 KB · 24 s · 27 KF · Nav A · Deck: TMS 03 Rate Shopping ("the flagship demo").
Screens: `Quote/Ship` → `Quote/Ship (Quote Id: 45842185)` → `Shipment Details (Shipment Id: 14554382)`. Tabs `GENERAL | PRODUCT DETAILS | ADDITIONAL DETAILS | DOCUMENTS`. Cards `Locations`, `Shipment Details`, `Schedule Pickup`, `Carrier`, `Favorite Accessorials`. Modal `Address Validator` (`USE SELECTED ADDRESS`). `Rates` grid `Carrier | Service | Delivery Days | Discounted Rate | Marked Up Rate | Rating | Carrier Nickname` with `LOWEST RATE` chip; rows 3 Day Freight 48405.40 USD (best) · 2 Day 48960.74 · 1 Day 58328.44 · First Freight 126223.54. Booked: `Shipment Confirmation`/`General`, `CHANGE LOG`, `VIEW ALL QUOTES`, `Q45842185`, `RESEND`. Bottom bar `CLEAR SHIPMENT | PREVIEW BOL | SAVE SHIPMENT | SPOT QUOTE | RATE SHOP` → `CANCEL SHIPMENT | EMAIL SHIPPING LABELS/BOL LINK | SAVE`. Fields: Ship From, Ship To, Quantity, Type, Length, Width, Height, Weight (per piece), Freight Class, NMFC, Description, Pickup Date, Delivery Date, Ready Time, Close Time, Carrier, Payee, Confirmation Email, Send Notification. Typed: "University of Tennessee, Knoxville, TN", 10, 48, 40, 60, 150.
Captions: 01 · Enter origin & destination — 02 · Validate the address — 03 · Describe the freight — 04 · One carrier: Rate Shop — 05 · Every carrier & mode, one screen — 06 · Booked — labels, BOL & tracking.

**SpotQuoteDemo** — 144 KB (largest) · **109 s** · 126 KF · Nav: `#12293F`, no search/AI BETA, tabs `Orders|Quote/Ship|Batch Ship|Track|History|Analytics|Reports|Audit`, notification badge on avatar; second "CARRIER PORTAL HEADER" · Deck: TMS 04.
Screens (17 sections): `Add Carrier: User Defined Carrier` (tabs `GENERAL | CONFIGURE SERVICES | MANAGE CARRIER | CARRIER LANES | CONTACTS | USERS (81) | ACCESSORIALS | CARRIER PROS`; cards `Contact Information`, `Carrier Portal`), `Quote/Ship`, `Spot Quote` request modal (`Bid cutoff`, `Cost Breakdown`), the carrier's request email, carrier `Spot Quote` page, `Quote submitted to Harborline Industrial, LLC`, `Message Center` (`MARK ALL AS READ`), `Rates` with `Rate Breakdown: Ridgeline Carriers - LTL` ($3,285.00), `Bill of Lading` preview (`HU TYPE | HM | DESCRIPTION | PIECES | WEIGHT | CLASS | NMFC`), `PRO/Tracking Number` (`SHIP IT`, `I DON'T HAVE A PRO/TRACKING NUMBER`), `Shipment Details (Shipment Id: 13374884)`, award email, `Confirm Pickup` (`Accept`, `Pickup Information`), `Documents` (`PRINT SHIPPING LABELS/BOL | PRINT RATE CONFIRMATION | UPLOAD DOCUMENT | SELECT ALL`), carrier spot-quote list with bid position. Settings menu: Switch User Control, User Profile, User Manager, Knowledge Center, Address Book, Company, Carrier Management, Integrations.
Captions (51): 01 · A user-defined carrier takes five fields — 01 · Ship-from zips live on the General tab — 02 · Contacts are their own tab — 02 · Quote request, pickup request, tracking update — 03 · Carrier Portal — activate it on the carrier — 03 · No POD upload, no delivered status — 03 · And invoices have to arrive as PDFs — 04 · Ship From is already yours — 04 · Three pallets — 04 · Freight class and NMFC populate from the dims and weight — 04 · Totals calculate at the bottom — 05 · SO and PO on Additional Information — 05 · Back up to Schedule Pickup — 06 · Rate shop it first — 06 · API rates come back — all of them high — 06 · Spot quote sits on the same grid — 07 · Bid cutoff date and time — 07 · Ship date and arrive-by — 07 · Instructions ride with the request — 08 · Send to a group, not one carrier at a time — 07 · Three carriers in one send — not three emails *(numbering regresses)* — 08 · This is the email every carrier gets — 08 · Same request, same terms, to all three — 08 · They answer from the email itself — 08 · The carrier clicks the link — 09 · The link opens their spot quote page — 09 · They enter the rate on the quote card — 09 · A cost breakdown, when you require one — 09 · Submitted — it goes straight back to the shipper — 10 · The carrier keeps an emailed copy of what they sent — 11 · A badge on the profile icon — a spot quote came back — 11 · Notifications opens the message center — 11 · The message links straight back to the quote — 12 · Ridgeline answered — the other two are still pending — 12 · Compare it against the API rates before you ship — 12 · The carrier-provided cost breakdown — 12 · And a preview of the BOL — 13 · Ship it — 13 · Shipment processed — tracking and BOL generated — 13 · Then schedule the pickup — 14 · The winning carrier is notified automatically — 14 · Rate, pickup window and the documents they owe you — 15 · Accept or decline, straight from the email — 15 · Accepting opens their pickup confirmation in the portal — 15 · FreightPOP fills a tracking number in for them — 15 · The carrier can replace it with their own — 16 · Every shipment document is generated in FreightPOP — 16 · Every document FreightPOP can generate for a shipment — 16 · BOL, labels, manifests, customs forms — generated off the shipment — 17 · A high-level pass over the carrier portal — 17 · Including spot quote rankings — position only, never a competitor's price.

**AccessorialDemo** — 48 KB · 21 s · 15 KF · Nav B · frame bg `#EEF2F8` · Deck: TMS 05.
Screens: Quote/Ship GENERAL…DOCUMENTS; toolbar `START CONSOLIDATION | RECENT QUOTES | TEMPLATES`; `FORM`, `ADDRESS BOOK`, `VERIFY ADDRESSES`, `CUBISCAN`; modal `Address Validator` with `APPLY & FLAG ACCESSORIALS`; rates `Carrier | Service | Days | Base | Residential | Lift Gate | Quoted Total`; chips `RESIDENTIAL + LIFT GATE PRICED IN`, `LOWEST`. Typed "418 Sycamore Ln, Marietta, GA, 30060". Uses `assets/av-map-from.png` / `av-map-to.png` (460×210). ⚠ Includes an invented "why these fired" side panel.
Captions: 01 · Enter the ship-to address — 02 · Verify the addresses before rating — 03 · The validator returns the carrier's own classification — 04 · Only the accessorials this freight actually needs — 05 · Applied to the shipment before a rate is pulled — 06 · Rate with the surcharges in the number — 07 · The quote already says what the invoice will say.

**ParcelDemo** — 27 KB · 22 s · 11 KF · Nav A · Deck: TMS 10.
Screens: `Quote/Ship`; cards `Locations`, `Shipment Details`, `Dimensional Weight` (`ACTUAL WEIGHT`, `BILLABLE WEIGHT`, `DIM Factor Override (this account)`, `L × W × H (in)`), `Rates` `Carrier | Service | Days | Packaging | Billable Wt | Rate | Marked Up`; footer `CHEAPEST PARCEL $31.84` / `CHEAPEST LTL $142.60`. Typed "18 × 14 × 12".
Captions: 01 · A 23 lb box — parcel or freight? — 02 · Dimensional weight is computed as you type — 03 · Rated on whichever is higher — actual or DIM — 04 · Contracted DIM factor can override the default — 05 · Rate parcel and LTL in one pass — 06 · Every parcel carrier, on the same screen as freight — 07 · The mode decision stops being a guess.

**ShippingRulesDemo** — 38 KB · 26 s · 25 KF · Nav A (last tab `Company`) · Deck: TMS 01.
Screens: rules tabs `GENERAL | SHIPPING APPROVAL RULE | DISPATCHING | LOCATIONS | DOCUMENTS`; cards `Shipping Approval Rules`, `Approval Rules`; modal `Add Shipping Approval Rule` (`RULE CRITERIA`, `RULE APPROVERS`, `RULE DECLINE REASONS`; Rule Name, Use Rule In, Field Name, Operator, Field Value; `CANCEL | SAVE RULE`). Ship scene: `Shipment Approval Status` (`PENDING`→`APPROVED`), modal `Approval Required` (`Approval Password (override)`, `SUBMIT FOR APPROVAL`), bar `CLEAR SHIPMENT | PREVIEW BOL | SAVE SHIPMENT | SHIP`. Typed "Hazmat Approval".
Captions: 01 · Open the rules engine — 02 · Define the rule once — 03 · Live company-wide, instantly — 04 · A hazmat order comes in — 05 · The rule fires at ship time — 06 · Approved — full audit trail.

**UsersRolesDemo** — 30 KB · 21 s · 22 KF · Nav: no AI BETA, tabs end `Settings` · **ORPHAN** (switch key `users`, no module).
Screens: `Users` grid `Name | Email | User Type | Role | Warehouse | Visibility | Active` (`EXPORT`, `ADD USER`); `Add User` (tabs `GENERAL | SCREENS | ADVANCED SETTINGS`; badge `CLONED FROM M. TORRES`; First Name, Last Name, Email, Telephone, User Type, Role, Assigned Carriers, Warehouses, Managers, User Markup, Weight Verification; `USER VISIBILITY` radios; `CANCEL | SAVE USER`). Typed Dana / Alvarez / dalvarez@northlandsupply.com / (949) 555-0182.
Captions: 01 · Settings › User Manager — 02 · Clone the shipping manager — keep the setup, change the person — 03 · Role decides what they can open — 04 · Tracking and history only — no settings, no rates — 05 · Scope the shipments they can see — 06 · Optional user-level markup protects margin — 07 · Save — unlimited users, no seat cost — 08 · Live in seconds.

**CarrierMgmtDemo** — 22 KB · 24 s · 14 KF · Nav A (last tab `Carrier Management`) · Deck: TMS 02.
Screens: `Carrier Management`; tabs `CARRIERS | CONNECTIONS | FLEET | RATE TABLES`; `Registered Carriers` `Carrier | Mode | Account / Nickname | Sites | Connection | Enabled`; modal `Add Carrier — LTL` (`ACCOUNT CREDENTIALS`, `USE AT SITES`; Carrier, Mode, Account Number, API Key, Nickname, Payment Type; `CANCEL | SAVE CARRIER`). Typed "SAIA LTL Freight".
Captions: 01 · Every carrier, one grid — 02 · Add a regional LTL carrier — 03 · Turn it on at every site — 04 · Connection verifies live — 05 · Rating on the next quote — no EDI project.

**ConsolidationDemo** — 40 KB · 32 s · 30 KF · Nav B · Deck: TMS 06.
Screens: `Order Management`; tabs `OPEN SALES ORDERS | OPEN OUTBOUND TRANSACTIONS | OPEN INBOUND TRANSACTIONS | SERVICES MANAGEMENT | ROI CALCULATION`; toolbar `ORDERS | ITEMS | AUTO DISPATCH | BATCHES | FILTERS`; drawer `FILTER SALES ORDERS` (Order Import, Ship To Company, Ship To, Shipment Details, Created Date; `CLEAR ALL | APPLY FILTERS`); modal `Shipment Consolidation` (`SHIPPED SEPARATELY` vs `CONSOLIDATED`, `YOU SAVE`, `CANCEL | CREATE CONSOLIDATED SHIPMENT`); badge `MERGED ORDERS`; orders SO-99120/99126/99131/99138.
Captions: 01 · A day's open sales orders — nineteen of them — 02 · Filter Sales Orders — 03 · Only orders that allow consolidation — 04 · One created date — 19 orders down to 7 — 05 · Click the column title to sort — one customer, together — 06 · Four to the Denver metro — the Phoenix order stays behind — 07 · See the savings before you commit — 08 · One shipment — orders locked and linked.

**PoolingDemo** — 35 KB · 26 s · 23 KF · Nav A (no AI BETA) · Deck: TMS 07.
Screens: `Pooling Transactions` (tab `OPEN`; `Pool ID | Pool Reference | Pooling Date | Ship From | Pooling Point | Linehaul | Shipments | Status | Total`; `PRINT LABELS`, `ADD NEW`), `New Pooling Transaction` (Pool Reference, Pooling Date, Ship From Address, Pooling Point, Truckload / Intermodal Carrier, Equipment Type, From Main Location, From Pooling Point), `Shipments to Pool`, `Quote Comparison` (`INDIVIDUAL SHIPMENTS` vs `POOLING TOTAL`), modal `Add Shipments to Pool 10442`; `ADD SHIPMENTS`, `PROCESS POOLING`, `CANCEL`. Pooling points: Dixie Freight Hub — Atlanta, GA (3PL · $1,100), Keystone Cross-Dock — Bethlehem, PA ($1,450), Great Lakes DC — Chicago, IL (Carrier hub · $980). Typed "NE-POOL-WK31".
Captions: 01 · Pooling sits beside Ship in the nav — 02 · Pool ID is automatic — you give it a reference — 03 · Pick the cross-dock — an address flagged as a pooling point — 04 · Linehaul and final mile both default to Rate Shop — 05 · Add the Northeast shipments — 06 · Twenty LTL loads, one origin — 07 · Quote both ways at once — 08 · Individual vs pooled — with the cross-dock fee inside — 09 · Process the pool — 10 · One linehaul BOL, twenty final-mile BOLs.

**MultiLegDemo** — 50 KB · 57 s · 42 KF · Nav A (no Batch Ship) · frame bg `#EEF2F7` · **wrapper aspect 1440/872** (only non-810) · Deck: TMS 08.
Screens: Quote/Ship → Shipment Details (`ADD A LEG | SCHEDULE PICKUP | CANCEL SHIPMENT | EMAIL SHIPPING LABELS/BOL LINK | SAVE`) → `MOVEMENT MODAL` (`ADD SHIPMENT TO MOVEMENT`, `ADD ANOTHER LEG`, `CLOSE`; Movement 60798) → Multi-Stop stop list (`ADD STOP`, `OPTIMIZE STOPS`).
Captions (no 08): 01 · Leg one is processed — the shipment record — 02 · ADD A LEG opens the movement window — 03 · Find the correlated Movement ID — 04 · Movement 60798 — leg one sits at sequence 1 — 05 · Attach this shipment to the movement — 06 · This shipment lands on the movement at sequence 2 — 07 · Close the window and quote leg two — 09 · Leg two is quoted and processed on its own carrier — 10 · Old Dominion on leg two — same movement, same references — 11 · One movement, two carriers, no re-keying — 12 · A fresh Quote/Ship — nothing entered yet — 13 · Enter the ship-to address — one origin, one destination — 14 · One truckload — and the Multi-Stop toggle appears with it — 15 · Turn Multi-Stop on — 16 · Locations becomes a stop list — stop 3 is empty — 17 · Fill in the third stop — 18 · Stops drag to reorder — 19 · The stop list re-sequences itself — 20 · ADD STOP appends another stop — 21 · Fill in the fourth stop — 22 · One carrier's record houses every stop.

**BatchShipDemo** — 40 KB · 38 s · 39 KF · Nav B · Deck: TMS 09.
Screens: `Order Management` OMS tabs; toolbar `ORDERS | ITEMS | METRICS | AUTO DISPATCH | BATCHES | FILTERS`; action bar `QUOTE SELECTED | SPOT QUOTE SELECTED | SHIP SELECTED | CONSOLIDATE SELECTED | CREATE SAVED SHIPMENT FOR SELECTED | SHOW SELECTED | CLEAR SELECTED`; modals `Quote Orders`, `Ship Orders`, `Pickup Scheduling`, `BATCHES` (`CONFIRM | CANCEL | CLOSE`); success toast.
Captions: 01 · Nine open outbound transactions — 02 · Pick the orders for the batch — 03 · Quote Selected — one confirm for the set — 04 · Orders grey out and lock while the batch runs — 05 · Rates come back across the whole set — 06 · Every batch, with its status — 07 · Same start: select the orders — 08 · Ship Selected — printing type and pickup settings — 09 · Confirmed — the batch creates and the orders lock — 10 · Labels and documents generated across the batch — 11 · Both batches, in one place.

**DocsBolDemo** — 27 KB · 21 s · 13 KF · Nav A (no AI BETA) · Deck: TMS 11.
Screens: `Shipment Details (Shipment Id: 14571908)`, DOCUMENTS tab; `Documents` card (per-doc `PREVIEW | PRINT | EMAIL | EMAIL DOC LINK`; `Printer Routing`; `CORRECT WEIGHT`, `PRINT ALL`); `Bill of Lading — Preview` (`STRAIGHT BILL OF LADING`, FP-14571908, SHIP FROM/SHIP TO/CARRIER/PRO NUMBER/TERMS; `QTY | TYPE | DESCRIPTION | CLASS | NMFC | WEIGHT`; `SPECIAL INSTRUCTIONS`, `SHIPPER SIGNATURE`, `CHANGE LOG`); modal `Correct Shipment Weight` (Actual Weight, Reason). Typed "1,412".
Captions: 01 · Every document generated the moment it books — 02 · BOL, labels, packing list, DG paperwork — all on the record — 03 · Printers routed per document, per dock — 04 · The carrier reweighs it at the terminal — 05 · Correct it once — with a reason on the record — 06 · BOL reissued as v2 — the old one is superseded, not lost — 07 · Reprint to the dock, notify the carrier.

**FleetDispatchDemo** — 44 KB · 24 s · 16 KF · Nav B · Deck: TMS 12. (Reference fidelity: *inferred*.)
Screens: `Track`; tabs `IN TRANSIT | CONTAINER OCEAN | FLEET | TRACK A SHIPMENT`; chart panel (pies "Total Shipments" / "Shipments with Delays/Issues"); toolbar (Search/GO, filter, pills Transfers/Outbound/Inbound/Return Shipments/Show Recently Delivered, Locations `1 selected`, list/calendar toggle); list view (Notes, Tracking Status icon strip, `LATE` red pills, Tracking Comment, Current Status, Process Date, Tracking Number, Carrier Connection, Carrier Name + row icons); calendar view (`TODAY`, `August 2026`, `SAVE`, `Display By: Detailed View`, per-day capacity bars `0/7 … 193/239`, Load Capacity popover, legend Booked/Pickup/In Transit/Out for Delivery/Delivered/No Tracking/Delayed/Issue/Unknown). Over-capacity red `#C0392B`, amber `#D9A227`, green `#8CBF3F`.
Captions: 01 · Fleet shipments live on the Track page — 02 · The exception is right on the grid — not picked up, late — 03 · Same page, calendar view — the week as the dispatch board — 04 · Every day shows how full it is — 05 · Load capacity per truck, on the day itself — 06 · Shipment info without leaving the board — 07 · Move the load to a day with room — 08 · The driver and the customer both get the new date — 09 · Back on the grid — new process date, comment updated.

**RouteOptDemo** — 61 KB · 50 s · 55 KF · Nav (no AI BETA) · `$preview` height 740; **canvas 1440×870 in a 1440/810 wrapper** (bottom 60 px clipped) · Deck: TMS 13.
Screens: Order Management grid with action bar `QUOTE SELECTED | SPOT QUOTE SELECTED | SHIP SELECTED | CREATE DELIVERY | AUTO SPLIT DELIVERIES | CREATE SAVED SHIPMENT FOR SELECTED | SHOW SELECTED | CLEAR SELECTED`, `···` menu ending `Lock for Route Optimization`; `Routing` › `PLAN ROUTE` (cards LOCATION, EQUIPMENT `TRUCKLOAD`/`ADD EQUIPMENT`, ROUTE METRICS, ORDERS tabs `UNASSIGNED | READY FOR OPTIMIZATION | READY FOR DISPATCH`; bar `CANCEL | SAVE | OPTIMIZE | DISPATCH`); modals `ADD EQUIPMENT` (`ADD SELECTED EQUIPMENT`), `Route Overview` (TRUCK #1/#3 tabs, map, Stop 2…7, `SAVE | VIEW SHIPMENTS`).
Captions: 01 · Order Management — the orders you want routed — 02 · Select the orders intended for optimization — 03 · Open the ··· in the selection bar — 04 · Lock for Route Optimization — 05 · Over to Route Optimization — 06 · Plan a route — 07 · Pick the warehouse you are routing out of — 08 · The locked orders load in under Unassigned — 09 · Add the trucks available for this run — 10 · Select the orders and move them to Ready for Optimization — 11 · They land on the Ready for Optimization tab — 12 · Optimize — 13 · Stops, distance and trip time come back — 14 · View/Edit Route opens the map — 15 · Toggle between the trucks on the run — 16 · Drag and drop to resequence stops — 17 · Each stop carries its orders and open/close times — 18 · Save and dispatch straight from here.

**DriverPodDemo** — 42 KB · 40 s · 22 KF · **structural outlier**: `$preview 1440×810`, no `autoPlay`, inner canvas **1020×580**, Google Fonts (Manrope, DM Mono, Saira, Montserrat) + `image-slot.js`, own keyframes `dp*`, **no FreightPOP top nav** · Deck: TMS 14. (Reference fidelity: *inferred*.)
Layout: left `Driver · mobile` 300 px phone (bezel `#3C4550→#171D24`, status bar `#123457`, 9:41) running the driver app (`FLEET`, `IN TRANSIT` list: Cascade Hardware Supply / Brightline Foods / Ironwood Tool & Die; Update Tracking Status modal `SAVE | CANCEL`; `POD · SHIPMENT 11357034`); right: desktop `Track` record (tabs `CONTAINER OCEAN | CONTAINER DRAYAGE | TRACK A SHIPMENT`, milestones Booked/Picked up/In transit/Delivered, notification `INTERNAL | EXTERNAL | BOTH`). Uses `assets/pod-photo.png` (1448×1086).
Captions (two "09"): 01 · The driver's own app — every load assigned to them — 02 · One tap on the load's status icon — 03 · Update Tracking Status — PICKED UP — 04 · Save — 05 · The load reads InTransit on the driver's list — 06 · Same second, on the shipper's shipment record — 07 · At the dock — DELIVERED — 08 · Tap DELIVERED — 09 · Comment, then who signed for it — 09 · Upload POD — straight from the phone — 10 · The driver photographs the delivered freight — 11 · Photo attaches to the shipment — 12 · Save — 13 · Off the driver's In Transit list — 14 · Shipper side: delivered, POD on file — 15 · Customer notified automatically, POD attached.

**TrackNotifyDemo** — 21 KB · 20 s · 10 KF · Nav A (no AI BETA) · Deck: TMS 15.
Screens: `Track`; tabs `ALL ACTIVE | DELIVERED TODAY`; `NOTIFICATION SETTINGS`; panels `Active Shipments — every carrier, one screen` (`Carrier | Lane | Last Milestone | ETA | Status`), `Notifications Fired — S-4472118` ⚠ invented, `What the customer sees` (browser-in-browser `track.northlandsupply.com/S-4472118`, `NORTHLAND SUPPLY`, `Arriving Wed, Jul 29`, `LAST SCAN`, `YOUR PO PO-99413`).
Captions: 01 · Every carrier's milestones on one screen — 02 · A carrier scan turns into an exception — 03 · The customer was told before they asked — 04 · Your brand, your domain — not the carrier's site — 05 · The tracking call stops happening — 06 · Exceptions get worked, not discovered.

**InvoiceAuditDemo** — 22 KB · 21 s · 9 KF · Nav A (no AI BETA) · Deck: TMS 16.
Screens: `Freight Invoice Audit`; KPI notes; grid `Carrier Invoices — matched against the rate you approved` `Invoice | Carrier | Shipment | PRO | Quoted | Invoiced | Variance | Reason | Status` (pills `APPROVED`, `PAID`, `Disputed` purple `#EDE7FA/#5B4B9E`); modal `Invoice ODFL-771902 — Old Dominion · Shipment 14571908` (`CHARGE | QUOTED | INVOICED | VARIANCE`; `WHY THIS FLAGGED` ⚠ invented, `SUPPORTING DOCS`, `CONTRACT`; `APPROVE AS BILLED | QUEUE DISPUTE`).
Captions: 01 · Every carrier invoice, matched line by line — 02 · Under $5 auto-approves — humans see the rest — 03 · A reweigh on a variable-weight load — 04 · Quoted vs invoiced, charge by charge — 05 · The reweigh is real — the re-rate is wrong — 06 · Dispute with the paperwork already attached — 07 · Nothing gets paid on trust.

**ReportsDemo** — 21 KB · 22 s · 11 KF · Nav A (no AI BETA) · Deck: TMS 17.
Screens: `Analytics — Freight Spend`; tabs `SPEND | CARRIER SCORECARD | SAVED REPORTS`; filters Period/Site/Mode/Customer; `SCHEDULE | EXPORT XLSX | SAVE VIEW`; `Spend by Carrier` bar chart; lanes `LANE | LOADS | SPEND | ON-TIME`.
Captions: 01 · Freight spend, current — not a month-end export — 02 · Filter to one site and the whole page follows — 03 · Narrow to LTL — 04 · Drill into a carrier's lanes — 05 · Save the view or schedule it to a mailbox — 06 · Nobody exports to a spreadsheet to answer this.

**DockSchedDemo** — 46 KB · 54 s · 47 KF · Nav A (last tab `Dock Scheduling`) · Deck: TMS 18.
Screens: `Dock Scheduling — Lake Forest DC · Wed 07/23`; tabs `DOCK GRID | APPOINTMENTS | GENERAL | SETTINGS`; hours 8:00–16:00; `Unscheduled Shipments`; `Scheduling Link` (`COPY LINK | REGENERATE`, `REQUIRED VALIDATION`, `BOOKING WINDOW`, `RESCHEDULE CUTOFF`); `APPOINTMENT DETAILS` (`APPOINTMENT | DOCUMENTS`, `SAVE | CANCEL`); carrier portal `Shipments Requiring an Appointment` (`SHIPMENT | FACILITY | DELIVERY DATE | FREIGHT | STATUS`); `Book Appointment · Shipment 14554391` (`AVAILABLE WINDOWS · LIVE DOCK CAPACITY`, `CONFIRM APPOINTMENT`); toast `Appointment APPT-2208 confirmed`; shareable link page (`CONTINUE`).
Captions: 01 · The dock day, at a glance — 02 · One pickup still unscheduled — 03 · Drag it straight onto an open door and window — 04 · Dock 2, 10:00 — checked against real capacity — 05 · Appointment Details opens on the drop — 06 · Carrier, date, dock, direction and window are already set — 07 · Assign the equipment for that window — 08 · Saved — dock, window and equipment all held — 09 · One: the carrier portal — Book Appointment on eligible shipments — 10 · Live availability — only windows the dock rules allow — 11 · The carrier selects their own time slot — 12 · Confirmed — and they can reschedule from the portal too — 13 · Two: a shareable scheduling link — Dock Scheduling → General — 14 · Copy it and send it to any carrier — 15 · No login — they validate with a tracking number or BOL — 16 · Same live availability, same dock rules — 17 · Either way it lands on your dock grid the moment they book.

**AutoDispatchDemo** — 22 KB · 24 s · 11 KF · Nav A (last tab `Company`) · **ORPHAN** (no switch key; reference: "built and working but no card currently points at it").
Screens: tabs `GENERAL | SHIPPING APPROVAL RULES | DISPATCHING | ORDER TYPES | MARKUPS`; `Auto Dispatching — Outbound Transactions` (Run Schedule, Exceptions Route To; `SAVE`), `How it runs` ⚠ invented, `Outbound Transactions` (`OUTBOUND | INBOUND | HISTORY`; "Auto Dispatch active" green dot).
Captions: 01 · Set the guardrails once — 02 · Rules Engine picks the carrier — 03 · The queue works itself — 04 · Book, tender, label — no clicks — 05 · Exceptions route to a person.

### OMS

**OmsSalesOrderDemo** — 34 KB · 46 s · 17 KF · Nav C · Google Fonts · Deck: OMS 01.
Opens on a **dark marketing graphic** "ORDER SOURCES" — *Five ways an order gets into FreightPOP*: 01 Automated ERP / WMS integration · 02 Real-time live pull · 03 Manual order creation · 04 EDI and API · 05 FreightPOP Deliveries (FPD) — then tours all five OMS tabs. Grid columns: sales `Order Number, Consolidation Number, Quote Id, Shipment Id, Shipment Details, Customer Job, Order Type, Ship From Company Id, Ship From`; inbound `PO Number, Order Type, Ship From Company Id, Ship From Company Name, Ship From Attention To, Ship From Address…`; services `Service Id, Service Status, Service Source, Vendor Company Id, Vendor Company Name, Vendor PO, Customer Company Id, Customer Company Name, Customer PO, Service Date`. Action bar as RouteOpt.
Captions: 01 · One queue — every order lands here — 02 · Most orders arrive on their own, from the ERP — 03 · The rest come in live, by hand, over EDI or as a partial pick — 04 · Open Sales Orders — everything waiting to ship — 05 · Open Outbound Transactions — 06 · Outbound work with totals and auto dispatch — 07 · Open Inbound Transactions — 08 · Inbound POs, batched for receiving — 09 · Services Management — 10 · Vendor services against customer POs — 11 · ROI Calculation — 12 · ROI orders, quoted and shipped — 13 · Back to Open Sales Orders — 14 · One workspace, five views of the same order book — 15 · Tick an order — 16 · Every action for that selection appears above the grid.

**OmsOrderMgmtDemo** — 22 KB · **18 s** (shortest) · 11 KF · Nav C · blue `#2C6DB5` · **ORPHAN** (key `oorders`).
Screens: `Order Management`; OMS tabs; toolbar `ORDERS | ITEMS | AUTO DISPATCH | BATCHES | FILTERS`; `SHOW SELECTED | CLEAR SELECTED`.
Captions: 01 · Every open sales order in one queue — 02 · Tick the orders you want to work — 03 · The action bar appears over the grid — 04 · Quote, spot quote or ship the whole selection — 05 · Create a delivery, auto split, or save the shipment — 06 · Everything the selection can do, from one bar.

**OmsProductDetailDemo** — 19 KB · 22 s · 6 KF · Nav D · **ORPHAN** (key `odetail`).
Screens: `Order SO-99207 — Add Line Item`; tabs `ITEMS | ADDRESSES | DOCUMENTS | ADDITIONAL DETAILS`; `LINE ITEM` panel (`PRODUCT CATALOG`, `HAZMAT`, `FREIGHT CLASS`, `NMFC`, `PACKAGE TYPE`, `WEIGHT / UNIT`, UN1993, PG III, CHEMTREC, serial SL-77219); `QUOTE READINESS RAIL` ⚠ invented.
Captions: 01 · Add a line — start typing the item — 02 · The catalog match pulls in — ERP serial and all — 03 · Class, NMFC and packaging auto-fill — 04 · Hazmat detail applies from the UN/NA catalog — 05 · Ocean detail lives on the order itself — 06 · Quote-ready — right the first time.

**OmsHazmatDemo** — 23 KB · 22 s · 10 KF · Nav A (no AI BETA/DASHBOARD) · **ORPHAN**.
Screens: `Order SO-118461 — Great Basin Hardware`; tabs `GENERAL | PRODUCT DETAILS | ADDITIONAL DETAILS | DOCUMENTS (n)`; `Line Items` (`SKU | DESCRIPTION | QTY | PACKAGE | DIMS (IN) | WEIGHT | CLASS | NMFC | FLAGS`, `HAZMAT` pill `#FFF3F2/#B3261E`), `Dangerous Goods`, `Documents Queued`. Typed "acetone cleaner".
Captions: 01 · Order lines come from the catalog, not from typing — 02 · Add a line from the product catalog — 03 · The catalog already knows it's hazardous — 04 · Class, NMFC and DG data land with the item — 05 · DG paperwork queues itself — 06 · Carriers that can't take class 3 never get rated.

**OmsConsolidationDemo** — 55 KB · 52 s · 31 KF · Nav C · Deck: OMS 03.
Screens: OMS grid + action bar → `CONSOLIDATE ORDERS` modal (`CONFIRM | CANCEL`) → Quote/Ship General (full field set incl. Pickup Request Email, Dock, Equipment, Carrier, Service, Payee, Payment Type, Location) → `RATES` (`Carrier | Mode / Service | Transit | Est. Delivery | Total`) → `DASHBOARD` drawer (`Processed Shipments`, `Saved Shipments`, `Pending Spot Quotes`, `Schedules Pickups` [sic], `Open Orders`) → `SAVED SHIPMENTS` modal (`Shipment Id | Shipment Date | Order Number | Inner Pieces Count | Handling Units | Shipment Weight`; `EXPORT | CLOSE`).
Captions: 01 · Order Management, Open Outbound Transactions — 02 · Three orders, same delivery address — 03 · Selecting them brings up the action bar — 04 · Consolidate Selected — 05 · Confirm the consolidation — 06 · One saved shipment, three orders on it — 07 · The orders carry the consolidation number now — 08 · The saved shipment lives on your dashboard — 09 · Dashboard — 10 · Saved Shipments, last 10 days — 11 · The consolidated shipment is at the top — 12 · All three order numbers on one shipment record — 13 · Open it in Quote/Ship — 14 · The consolidated load, ready to rate — 15 · Rate shop it once — 16 · Rates open on their own screen — 17 · One booking instead of three — $2,910 separately — 18 · Orders can still be added or removed until pickup — 19 · One shipment, one BOL, one pickup.

**AutoPackDemo** — 53 KB · 62 s · 38 KF · Nav C (no AI BETA) · 5 scenes · Deck: OMS 02.
Screens: `Product Catalog` (`Item Number, Description, Category, Length(in), Width(in), Height(in), Weight(lbs), Freight Class`) → `CREATE PRODUCT` (tabs `GENERAL | SPECS AND PACKAGING | BILL OF MATERIALS | CUSTOM FIELD GROUPS`; Item Number *, Manufacturer, Description, UPC, SKU, Size, U/M *, Manufactured Date, Category, Price, Currency, Country of Origin, Freight Class, NMFC, HTS Code) → `Predefined Package Types` (`Package Name, Package Type, L/W/H, Max Weight(lbs), Minimum Weight In…, Minimum % Volume…`) + `ADD PACKAGE` drawer → `Company Rules — Routing Guide` (`Rule Name, Priority, Rule Summary, Active, Last Modified, Last Modified By`) → Quote/Ship + Rates (`SHIP`). Source material: `scraps/autopack-*.png` from the Confluence "How to Use Volume Calculation for Auto Pack" PDF.
Captions: 01 · Product Catalog — where the freight detail starts — 02 · Add a product — 03 · Create Product — General — 04 · Item number, description, unit of measure — 05 · Category and pallet-quantity thresholds live on the item — 06 · Freight class and NMFC live on the item — 07 · Saved — the item is quote-ready — 08 · Predefined Package Types — the boxes you actually own — 09 · Add a package — 10 · Name it and pick the type — 11 · Dimensions, weight caps and fill limits per package — 12 · The calculation only packs into these — 13 · Company Rules — Routing Guide — 14 · Add a rule for palletized freight — 15 · Auto Pack runs first, the routing guide reads its result — 16 · Pallet count, box count and weight are all rule conditions — 17 · Quote/Ship, Product Details — nothing packed yet — 18 · The order lines come in from the catalog — 19 · Add the rest of the lines — 20 · Auto Pack calculates the units behind the scenes — 21 · Rate shop the calculated pack — 22 · Rates, off a pack nobody built by hand — 23 · The routing guide picked carrier and service from the pack — 24 · Freight cost is known before anyone packs a box.

**OmsThirdPartyDemo** — 47 KB · 57 s · 19 KF · Nav C · Deck: OMS 04 (Inbound Order Management).
Screens: `OPEN INBOUND TRANSACTIONS` (PO-45118) → Quote/Ship inbound (`Ship From · vendor on the PO`, `Ship To · your warehouse`) → Rates (`SHIP`).
Captions (skips 04–06): 01 · Open Inbound Transactions — every PO on its way to you — 02 · Purchase orders arrive from the ERP with the vendor on them — 03 · Vendor contact, ship-to facility, dates, line detail, ERP fields — 07 · Every field the PO carries, in one queue — 08 · Back to the front of the record — 09 · Open the PO to move it — 10 · The PO becomes a shipment you control — 11 · Ship From is the vendor on the purchase order — 12 · Ship To is your own dock — 13 · Handling units and class come off the PO lines — 14 · Rate it on your carriers, not the vendor's — 15 · Rates on inbound freight, on your accounts — 16 · Book it — 17 · Back in the queue with a carrier and an arrival date — 18 · The dock can see what is coming before it arrives — 19 · Incoming inventory is visible before it reaches the warehouse — 20 · Procurement freight in the same system as fulfillment.

**OrderHandoffDemo** — 14 KB (smallest) · 22 s · 10 KF · **not an app reconstruction** · Deck: OMS 05.
A dark (`#051729`) **marketing motion graphic** in DM Sans/Manrope: eyebrow "Order to fulfillment", headline "One order, from capture to fulfillment.", three cards OMS `Order Management` / WMS `Warehouse` / TMS (each `#0A2540`, r16, teal travelling-dot flow lines), then four benefit rows: No integration to maintain · One record end to end · One contract, one support call · Decisions made once. **No captions, no cursor, no nav, no logo.** Stylistically it belongs to the deck (layer 1), not to the demos.

**ReturnsPortalDemo** — 18 KB · 22 s · 7 KF · Nav D · **ORPHAN** (key `oreturns`).
Screens: browser-in-browser `portal.freightpop.com/crestline — Customer Portal` (`SCOPED · YOUR ORDERS ONLY`, `REQUEST RETURN`) → `OPS SIDE` `FREIGHTPOP · ORDERS`.
Captions: 01 · The customer's portal — scoped to them — 02 · A delivered order needs a return — 03 · Item and reason — right in the portal — 04 · Label generates itself — default return processing — 05 · Your side: an RMA appeared, not a ticket — 06 · Your team handles exceptions, not requests.

### WMS

**WmsReceivingDemo** — 48 KB · 48 s · 36 KF · Nav E · frame bg `#fff` · Deck: WMS 01. Mirrors `uploads/pasted-1786739372516-0.png` (see `notes/`).
Screens: `Receipts Transactions` grid (`Transaction ID | PO Number | Created Date | Submitted Date | Vendor ID | Vendor Name | Warehouse Name | Created By | Status`; `+` FAB) → modal `Import Purchase Order` (Warehouses, PO Number *; `IMPORT PO | CANCEL`) → `New Receipt Transaction` (tabs `GENERAL | DOCUMENTS`, PO-45131, `VIEW ADDRESS`) → Edit Receipt (item table `ITEM NUMBER | DESCRIPTION | QTY ORDERED | TOTAL RECEIVED | BIN ALLOCATIONS | ACTIONS`; allocation fields License Plate, Bin, Quantity Received, Lot ID, Lot Expiration) → footer `POST | SUBMIT | SAVE | CANCEL`.
Captions (two "13"): 01 · Receipts Transactions — every inbound receipt in one queue — 02 · Add a new receipt — 03 · Import the purchase order — 04 · Vendor and PO detail pull in — no re-keying — 05 · Carrier, tracking and arrival recorded at the door — 06 · Saved — the receipt is in the queue, status Open — 07 · Open the receipt to start receiving — 08 · Product details sit on the same receipt — scroll down — 09 · Scan the item — expected quantities already known — 10 · Receive to a bin — 11 · Scan the license plate — the pallet, not the pieces — 12 · Lot and expiration captured at receipt — 13 · Second line, its own license plate — 13 · Partial receipt — 500 of 998 on this line — 14 · Submit for approval — 15 · Submitting returns to the receipts queue — 16 · Approved while the receipt sits in the queue — 17 · Reopen the receipt to post it — 18 · Approved — POST is now available — 19 · Posted — inventory and ERP in step.

**WmsOrderPickingDemo** — 54 KB · 76 s · 49 KF · starts Nav A, crosses into WMS · **ORPHAN** (superset of WmsPickingDemo, which the deck mounts).
Screens: TMS `Order Management` line-level grid (`Order Number | Product Number | Quantity to Ship | Original Quantity | Quantity Left | Item Description | Ship From Company Id | Ship To Company Id | Ship To`; `CREATE DELIVERY`; `CONFIRM | CANCEL`) → WMS `OPEN PICKING TRANSACTIONS` (`Transaction ID | PO Number | SO Number | Shipment ID | Created Date | Submitted Date | Warehouse Name | Created By | Status`) → `Pick Slip` document (SO Number/CARRIER/PAYER/USER; `Line No | Qty to Pick | ITEM NO | DESCRIPTION | Qty Picked`) → picking transaction FPD38792566 (`GENERAL`, `LOT NUMBER`, `POST | SUBMIT | SAVE`).
Captions (27): 01 · Open sales orders, down to the line item — 02 · Pick the lines that are actually shipping — 03 · Create delivery — 04 · Confirm — two products become a delivery — 05 · Cross into the WMS from the same login — 06 · Picking — the delivery is waiting as a picking transaction — 07 · Print the pick list for a paper-driven floor — 08 · Bins, lots and quantities on the slip — nothing to look up — 09 · Or work it on the screen — open the transaction — 10 · Two lines to pick, nothing picked yet — 11 · Open the first line — 12 · Every bin holding the item, with what is available — 13 · Take ten, or take the whole bin in one tap — 14 · Confirm the pick — 15 · Line one turns green and the count is live — 16 · Second line, two bins to choose from — 17 · Fifteen of two hundred available — 18 · Both lines complete — 19 · Save the progress — 20 · Back in the queue, status Open — a second picker could take it over — 21 · Reopen it to submit — 22 · The lot numbers picked from are on the record — 23 · Submit — 24 · Back out to the queue — status Submitted, waiting on the supervisor — 25 · The supervisor opens it to post — 26 · Post, and the fulfillment writes back to the ERP — 27 · One record from sales order to fulfillment, no re-keying.

**WmsBinTransferDemo** — 47 KB · **80 s** (longest WMS) · 68 KF · Nav E variant (tabs `Picking | Receipts | Bin Transfers | Transactions | Inventory | Generate | Settings`) · **ORPHAN** (the deck mounts the older BinTransferDemo).
Screens: `WMS / Bin Transfers`; `Transfer Mode` cards `Single Item to Multiple Bins` / `Multiple Items to Single Bin`; fields Warehouse, License Plate, From Bin, Item Number, From Qty, License Plate 1 *, To Bin 1, Qty, To Bin 2, To Bin, Select Item, Quantity; `PROCESS TRANSFER`; ends on a scanner mockup.
Captions (30): 01 · Bin Transfers — putaway and moves inside the warehouse — 02 · Pick the warehouse — one at a time, nothing else opens until you do — 03 · Single item to multiple bins — the putaway split — 04 · From Bin lists every bin in that warehouse — 05 · Item list is filtered to that bin — quantity and lot come with it — 06 · Quantity defaults to everything available — 07 · First destination — primary pick face — 08 · Remaining stays orange while the split is short — 09 · Split the balance to a second bin — up to ten — 10 · Overstock takes the rest — bins already used are off the list — 11 · Balanced — remaining reads zero in green — 12 · Process the transfer — 13 · The same page handles consolidation — 14 · Multiple items to a single bin — 15 · From and To bins have to differ — the system enforces it — 16 · Take part of the line, not all of it — 17 · Add lines until the move is complete — 18 · One transaction back to the ERP, not one per line — 19 · A warehouse that runs license plates looks like this — 20 · The License Plate field appears once the warehouse uses them — 21 · Scan the plate and the items populate themselves — 22 · The destination gets its own plate, then its bin — 23 · A whole pallet moves on one plate, not 499 scans — 24 · The same page on a scanner in the aisle — 25 · Bin Transfers — 26 · Warehouse first, same as the desktop — 27 · From the receiving bin — 28 · Quantity defaults to what is there — 29 · Split across bins here too, with the same remaining check — 30 · Process it from the aisle.

**WmsCycleCountDemo** — 38 KB · 48 s · 27 KF · Nav E · Deck: WMS 06.
Screens: `Cycle Counts`; KPI `TOTAL BATCHES | IN PROGRESS | COMPLETED`; `NEW BATCH`; grid `Batch Name | Warehouse | Count T… | Status | Blind | T… | Coun… | Created | Created By`; create batch (`Filter by Warehouse`, item picker `Item Number | Description | Bin | Qty on Hand`, `CANCEL | CREATE BATCH`); count task (`BACK TO BATCHES`, `SAVE`); variance review (`TOTAL TASKS | MATCHES | TOTAL VARIANCES`, `COUNT TYPE`, `ITEM NUMBER | DESCRIPTION | STATUS`; SKU-1002 / A-01-02).
Captions: 01 · Cycle Counts — counts run while the warehouse keeps working — 02 · Start a new batch — 03 · Name it, pick the warehouse — 04 · Full count, partial count, or ABC analysis — 05 · Partial count opens the item picker below — 06 · Choose the item and bin combinations to count — 07 · Create the batch — 08 · The count task lands on the floor — task 1 of 2 — 09 · Widget Alpha — 48 expected, 48 on the shelf — 10 · Save and move to the next task — 11 · Task 2 of 2 — 12 · Widget Beta — 100 expected, only 90 there — 13 · Save and review the variances — 14 · One match, one variance — 90 counted against 100 expected — 15 · The variance is typed and quantified before anyone decides — 16 · Approve, and the system makes the adjustment — 17 · Reject instead, and the count goes back to the floor until it resolves.

**WmsAdjustmentDemo** — 36 KB · 40 s · 28 KF · Nav E · **ORPHAN** (the deck mounts WmsInventoryDemo for WMS 05).
Screens: `Adjustment Transactions`; tab `OPEN TRANSACTIONS`; grid `Transaction Id | Date | Type | Warehouse | User | Status`; fields Warehouses, Warehouse *, License Plate, Qty *; footer `POST | SUBMIT | SAVE | CANCEL`.
Captions: 01 · Adjustment Transactions — every inventory correction on the record — 02 · Add a new adjustment — 03 · Warehouse first — nothing else opens until it is set — 04 · Adjustment in, or adjustment out — 05 · Adjustment out — stock is leaving without a shipment — 06 · Say why, in the record — 07 · Scan the license plate — 08 · The pallet's item, bin, lot and expiration come with it — 09 · Adjust out only what is missing — 6 of 499 — 10 · Save — 11 · Saved — status Open, and nothing has reached the ERP yet — 12 · Reopen it to submit — 13 · Submit the adjustment — 14 · Submitted — attributed to the user who scanned it — 15 · Reopen once more to post it — 16 · Post — the adjustment writes back to the ERP — 17 · Posted — the count on the floor and the count in the ERP match.

**LicensePlateDemo** — 36 KB · 58 s · 32 KF · Nav F (56 px `#0B2039`, "WMS · Powered by FreightPOP", `Settings` active) · frame bg `#EAEFF7` · accent `#2C6DB5` · Deck: WMS 02.
Screens: `WAREHOUSE RULES` (`Add New Warehouse`, tabs `GENERAL | RULES | SECTIONS`, `CANCEL | SAVE`) → `THE THREE IDENTIFIERS` (dark explainer cards — marketing, not app) → `MOVING A PLATE` (plate LP-1001, items ITEM-0007/0012, bins `RECEIVING-QA` → `PICK-A-114`, scan-line animation).
Captions: 01 · Identifiers are set per warehouse, on the Rules tab — 02 · Use License Plates — on, and now mandatory in this warehouse — 03 · Auto generate plates from a prefix and a starting number — 04 · LP-1001 onward, no numbering by hand — 05 · Lot ids on — batch-level traceability — 06 · Lot expiration for anything with a shelf life — 07 · Additional identifiers for anything else you track — 08 · The same tab decides whether picking has to be scanned — 09 · …and what prints on the pick slip — 10 · Category, hazmat id and your own fields can print with it — 11 · Save — every transaction here now carries these ids — 12 · Three identifiers, three different jobs — 13 · A license plate identifies a container or pallet — move it as one unit — 14 · A lot identifies a batch — recalls and expiration dates live here — 15 · A serial identifies one item — unit-level history and warranty — 16 · Serials import from the ERP and can print on the BOL and packing slip — 17 · On the floor: one plate holding 48 units, 2 lots and 36 serials — 18 · Scan the plate… — 19 · …and the bin fills itself from the plate — 20 · A full move keeps the original plate — 21 · Every lot and serial moved with it — 22 · Pick less than the plate and the system splits it for you — 23 · Move a pallet, not a serial number.

**BinTransferDemo** (older) — 19 KB · 24 s · 7 KF · Nav D + WMS sub-tabs `RECEIPTS | PICKING | BIN TRANSFERS | TRANSACTIONS | INVENTORY | CYCLE COUNTS` · Deck: WMS 03.
Screens: `WMS — Bin Transfers · Lake Forest DC`; `FROM SIDE` (`RECEIVING-QA`, `QTY TO MOVE`), `TO SIDE — SPLITS` (`ZONE-A-114`, `TRUCK-04`, `JOB-1189`, `REMAINING`), `LEDGER RAIL` ⚠ invented (TRX-88421/2/3), `PROCESS TRANSFER`.
Captions: 01 · Received stock, ready for put-away — 02 · Scan the item out of QA — 03 · 600 to the fast-pick zone — 04 · 250 to a service truck — a truck is a bin — 05 · 148 to a job — remaining hits zero, green — 06 · Three recorded moves — who, what, when.

**CycleCountDemo** (older) — 20 KB · 24 s · 8 KF · Nav D + WMS sub-tabs · **ORPHAN** (superseded by WmsCycleCountDemo).
Screens: `WMS — Cycle Counts · Lake Forest DC`; `BATCHES` (`SCHEDULED`, `ANNUAL · DEC`), `BLIND COUNT ENTRY` (`ZONE-A-114 · ITEM-0001`, `COUNTED`, `SUBMIT COUNT`), `VARIANCE REVIEW` (`APPROVE ADJUSTMENT | RECOUNT`).
Captions: 01 · Counts run on a schedule — no shutdown — 02 · Zone A fast movers — a blind count starts — 03 · Scan the bin, count what's there — 04 · One bin doesn't match — flagged instantly — 05 · Variance review: approve or recount — 06 · Approved — adjustment writes back to NetSuite.

**WmsInventoryDemo** — 20 KB · 24 s · 8 KF · Nav D + WMS sub-tabs · Deck: WMS 05.
Screens: `WMS — Inventory · All Locations`; grid `SITE / BIN | LOT | EXPIRATION | LICENSE PLATE | QTY`; `ADJUSTMENT PANEL` (`QTY OUT`, `SAVE | POST`), ERP toast.
Captions: 01 · One item, searched across nine sites — 02 · Reno: a picker finds water-damaged stock — 03 · Write it off on the spot — from the scanner — 04 · Photos attach — QA proof, vendor RMA — 05 · Posted — the live view is already right — 06 · Nine sites, one truth — lots, plates, expiry.

**WmsPickingDemo** — 22 KB · 25 s · 11 KF · Nav D + WMS sub-tabs · Deck: WMS 04.
Screens: `WMS — Picking · Lake Forest DC`; `TICKET GRID` (`PRINT PICK LIST`; `FPD-30412 · SO-99120`, `FPD-30413 · TO-2281`, `READY`), `RUGGED SCANNER` mockup (ITEM-0001/0003), `TMS HANDOFF RAIL` ⚠ invented.
Captions: 01 · A sales order became a picking ticket — 02 · Open it on the rugged scanner — 03 · Bin-directed scan — line goes green — 04 · Partial — yellow until the line is filled — 05 · One short-key confirms the full quantity — 06 · Optional approval gate before writeback — 07 · Posted — the TMS record updates itself — 08 · Picked order books freight — one vendor.

### AI demos (not in the July reference)

**AiCopilotDemo** — 28 KB · 24 s · 15 KF · Nav A at **56 px** · frame bg `#DCE7F5` · Deck: TMS 01 AI tab.
Quote/Ship form + right-side `FreightPOP AI` panel (472×550; `New chat` chip `#EAF1FB/#4088CF`; placeholder *Hi! Try: "Set ship from city to Los Angeles", "Add a package", "Set order number to ORD-001"…*; user bubbles `#2E7CE4` white r8; assistant bubbles `#F4F5F7`; typing dots; suggestion chips; input "Ask FreightPOP AI…"). Q1 "Add three boxes, ten by ten by ten, fifty pounds each add accessorial destination lift gate" → A1 "I set package 1 to: 3 × Box, each 50 lb, 10 × 10 × 10 inches — and added the Destination Lift Gate accessorial. Anything else…"; Q2 "run the rate shop for me" → "Rate shop started — fetching rates now…"; `Rate results · Quote Id 44268596`.
Captions: 01 · Ask instead of filling the form — 02 · Plain language, no menu hunting — 03 · CoPilot fills the shipment out — 04 · Then run the work, same way — 05 · Every carrier priced, hands off the keyboard — 06 · Order to rates without opening a single tab.

**AiAccessorialAgentDemo** — 43 KB · 26 s · 17 KF · Nav A · frame bg `#DCE7F5` · Deck: TMS 05 AI tab.
Quote/Ship with `Accessorials` card, `Address Validator` modal, `FreightPOP AI` panel. Q1 "Ship one pallet, 640 lb, to 418 Sycamore Ln, Marietta GA 30060"; Q2 "yes, add both". Chips `VALIDATED · RESIDENTIAL · NO DOCK`, `ADDED BY AI`, `SAVED`. Accessorials: Residential Delivery 38.50 · Destination Lift Gate 95.00 · Delivery Appointment Required 45.00 · Inside Delivery 110.00 · Notify Before Delivery 0.00.
Captions: 01 · A pallet going to a house — 02 · Ask for the shipment in plain language — 03 · Validated at entry, not at rating — 04 · Two accessorials, with the reason for each — 05 · Applied automatically in the validator — 06 · On the shipment, not in a note — 07 · Priced into the quote, not the invoice — 08 · No guesswork, no after-the-fact fees.

**AiAutoConsolidationDemo** — 29 KB · 26 s · 13 KF · Nav B · Deck: TMS 06 AI tab.
OMS grid + `FREIGHTPOP AI CHAT`. Prompt "find all shipments with the same ship-to address as Summit Foods Group".
Captions: 01 · Nine open orders, each headed out on its own — 02 · Just ask, in plain language — 03 · The assistant reads the whole grid — 04 · Four orders share a customer and a metro — 05 · One click to consolidate — 06 · One consolidated shipment — orders locked and linked.

**AiAuditingDemo** — 21 KB · 19 s · 14 KF · Nav A (no Pooling/Batch Ship) · (not wired — TMS 16 uses the `ai-clips/invoice-audit.html` clip instead).
`Freight Audit`; tabs `INVOICES | DISPUTES | ACCRUALS | SETTLEMENTS`; left `Upload carrier invoice`; right **dark** AI panel (834×640, `#0B1A2E`, `border:1px solid rgba(61,214,181,.34)` — the only in-app teal); `Matched against quote FP-40218`; `LINE ITEM | QUOTED | INVOICED | DELTA | STATUS`; lines Linehaul, Residential Delivery, Destination Lift Gate, Fuel Surcharge, Quoted total, `Reweigh · 640 lb → 812 lb`, `Detention · 2 hr`; amber flag `2 DISCREPANCIES · $267.00`.
Captions: 01 · The invoice arrives as a PDF — 02 · FreightPOP AI reads it — 3 pages, 41 lines — 03 · Every line compared to what was quoted — 04 · Two charges the quote never agreed to — 05 · Straight into dispute, no line-by-line review — 06 · $267 recovered without a manual audit.

### The `ai-clips/` kit (iframe AI demos)

`ai-clips/rate-shop.html` and `ai-clips/invoice-audit.html` are **not** dc-runtime files; they are a separate React 18 + Babel video kit (`animations.jsx` engine, `ui-components.jsx` product primitives, `ui-views-v5.jsx` 3,480-line screen library, `ai-panel-v5.jsx` 440 px chat panel, `scene-v5.jsx` 8 chapters, `clip-standalone.jsx` 1920×1080 stage). They use **their own product palette** — `navy #1B2A4E, blue #1976D2, blueLight #E3F2FD, bg #EEF1F5, cardBg #F7F9FC, text #1F2937, border #D5DBE3, red #D32F2F, green #2E7D32, amber #F57C00` — and Roboto Mono, and a 72 px navy top nav with tabs `Orders · Quote/Ship · Route Optimization · Pooling · Track · History · Analytics · Reports · Audit`. The eight chapters (`PACE 1.35`): 1 Load planning (34 s) · 2 Accessorials (16 s; O'Neil Storage, 2826 W Roosevelt St, Phoenix) · 3 Rate shop (25 s; "Echo Global was selected at $1,048.13. Estes was $40 cheaper at 88%"; shipment 11252388) · 4 Proactive exception (18 s; truck breakdown outside Indio, CA) · 5 Agent Builder (20 s; Slack #ops) · 6 Invoice audit (22 s; INV-7842 $75 lift gate, INV-7840 $312 detention, 44/47 auto-approved) · 7 Claims (20.5 s; CLM-2089, $4,820) · 8 Executive review / MCP (16 s; Claude `#D97757`, Microsoft Copilot `#0A7E3E`, Slack/Teams `#4A154B`, NetSuite/Power BI `#0E1F44`, FreightPOP AI `#2A6FDB`). Each chapter opens on a white "table-setter" slide: eyebrow "STEP 0N · …" in `#0F7B6C`, headline Manrope 500 **112 px** `#0B1117`, sub 26 px `#5C6670`. An earlier drop of the same kit with all 8 chapters as pages lives in `uploads/New FreightPOP Agent One Pager (1)/`. Four pallet photos referenced by the Claims chapter (`assets/pallet-*.png`) are missing (SVG fallback).

## 4.4 Nav variants (the six generations of app chrome)

| Variant | Height / bg | Distinguishing features | Files |
|---|---|---|---|
| **A** (canonical) | 52 px `#0B1A2E` | round search pill 190×30 r15, `✦ AI BETA`, `NEW EXPERIENCE` (`#4088CF` 10.5px 700, `padding 7px 12px` r4), `DASHBOARD`, tabs 12px `#C7D3E0` (active white 600): `Orders | Quote/Ship | Route Optimization | Pooling | Batch Ship | Track | History | Analytics | Reports | Audit`, 30 px avatar | ~22 (RateShop, Parcel, ShippingRules, CarrierMgmt, Pooling, MultiLeg, DocsBol, TrackNotify, InvoiceAudit, Reports, DockSched, AutoDispatch, OmsHazmat, Ai*…) |
| **B** | 52 px `#122B45` | everything right-aligned after logo, **square** search 170×26 r4, badges 9.5px `padding 6px 10px` r3, tabs 11.5px `#DCE6F0` | Accessorial, AiAutoConsolidation, BatchShip, Consolidation, FleetDispatch, RouteOpt |
| **C** | **44 px** `#0B2039` | search offset `margin-left:170px`, 28 px avatar, divider `#2C4460`; paired with blue `#2C6DB5`, r3, amber floating labels | OmsOrderMgmt, OmsSalesOrder, OmsThirdParty, OmsConsolidation, AutoPack |
| **D** | 52 px `#0B1A2E` | `WMS` module tab (`Orders|Quote/Ship|Track|WMS|History`) + uppercase WMS sub-tabs `RECEIPTS | PICKING | BIN TRANSFERS | TRANSACTIONS | INVENTORY | CYCLE COUNTS` | BinTransfer, CycleCount, WmsInventory, WmsPicking, OmsProductDetail, ReturnsPortal |
| **E** | **56 px** `#16324E` | standalone "WMS" product header (logo 20 px + `WMS` 20px/700), right-aligned tabs `Picking | Receipts | History | Bin Transfers | Transactions | Inventory | Cycle Counts | Manufacturing | Analytics | Settings`, avatar `#42586F` | WmsReceiving, WmsAdjustment, WmsCycleCount, WmsBinTransfer (variant tab set) |
| **F** | 56 px `#0B2039` | WMS header with `Powered by FreightPOP` 7 px sub-line | LicensePlate |
| — | `#12293F` | no search / AI BETA; notification badge | SpotQuote |
| — | 56 px `#0B1A2E` | Nav A at 56 | AiCopilot |
| — | none | | DriverPod, OrderHandoff |

## 4.5 Wiring summary

| Deck mounts (33) | Orphans (10) |
|---|---|
| RateShop, ShippingRules, CarrierMgmt, Consolidation, MultiLeg, RouteOpt, BatchShip, DockSched, WmsReceiving, LicensePlate, BinTransfer, WmsPicking, WmsInventory, WmsCycleCount, OmsSalesOrder, OmsProductDetail*, OmsConsolidation, AutoPack, ReturnsPortal*, OrderHandoff, UsersRoles*, SpotQuote, Accessorial, Pooling, Parcel, DocsBol, FleetDispatch, DriverPod, TrackNotify, InvoiceAudit, Reports, OmsOrderMgmt*, OmsThirdParty + AI: AiAccessorialAgent, AiAuditing*, AiAutoConsolidation, AiCopilot | AutoDispatch, CycleCount (→ WmsCycleCount), WmsAdjustment, WmsOrderPicking (→ WmsPicking), WmsBinTransfer (→ BinTransfer), OmsHazmat, and the four starred keys above whose switch entry exists but **no module sets that `anim`/`ai` value**: OmsProductDetail (`odetail`), ReturnsPortal (`oreturns`), UsersRoles (`users`), OmsOrderMgmt (`oorders`), AiAuditing (`audit` ai key — TMS 16 uses `clipAudit`) |

Net: **28 demos actually reachable** from a module today; 15 are built but unreachable.

---

# Part 5 — Validation Library, Case Studies, Why We Won

This is layer 3: the proof. It has two halves — the **documents** (23 letter-size sheets) and the **browser** that surfaces them (the Validation Library). §5.1–5.3 describe the sheets; §5.4 the library data model; the library UI itself is described in §5.5 (from the `.dc.html`) and again in Part 6 for the static port, which is the version most likely to ship on the website.

## 5.1 Shared sheet chassis (all 23 sheets)

Every Case Study and Why We Won `.dc.html` uses the same wrapper:

```html
<x-dc>
  <helmet>
    Google Fonts: Manrope 400/500/700 · DM Sans 400/500/700 · DM Mono 400/500
    <style> doc-page:not(:defined){visibility:hidden}  a{color:#0F7B6C}  a:hover{color:#0A5C51} </style>
    <script src="./doc-page.js"></script>  <script src="./image-slot.js"></script>
  </helmet>
  <doc-page margin="0">
    <section class="page" data-screen-label="01 Cover" style="display:flex;flex-direction:column;height:11in;max-height:11in;overflow:hidden;font-family:'DM Sans';…">
    <section class="page" data-screen-label="02 About" …>
    …
  </doc-page>
</x-dc>
<script data-dc-script type="text/plain"></script>   <!-- empty: no runtime logic -->
```

**Page geometry — memorise these numbers:**
- Page = **US Letter 8.5 × 11 in = 816 × 1056 px** (1 in = 96 px). Fixed, full-bleed (`margin="0"`), `overflow:hidden`. Nothing reflows; content is authored to fill the page.
- `<doc-page>` puts the page on a "desk" with `padding:48px 24px`, so the first page's frame is **864 × 1152 px**; the port adds a `margin-top:96px` between pages so each page sits at a **1152 px stride**. Thumbnails are **408 × 528 px** (exactly half of 816 × 1056).
- Print: `@page { size: 8.5in 11in; margin:0 }`, `print-color-adjust:exact`, page breaks between `.page` sections, shadows/radii removed.

**Shared surface treatments:**
- **Grid texture** on every page: a 48 × 48 px hairline grid from two `linear-gradient` layers. Light pages: `rgba(5,23,41,.04)` (case studies) / `.043` (WWW) over `#FFFFFF`. Dark pages: `rgba(181,205,224,.07)` (CS cover) / `.08` (WWW hero) over `#051729`, plus a teal glow `radial-gradient(70% 90% at 0% 0%, rgba(61,214,181,.16) 0%, transparent 60%)`.
- **Logo**: `assets/wwy/freightpop-logo.png` (257 × 50, white wordmark). CS cover 28 px tall, CS footer 24 px, WWW hero 20 px (absolute `top:22px; right:34px`) or 26 px in the header variant.
- **Photos**: 7 of 8 case-study covers use `<image-slot id shape="rect" fit="cover" placeholder="Drop the cover photo (…)" src="assets/cs/…jpg">`; Uneekor CS and all 15 WWW sheets use a plain `background-image` div. Outside the Claude Design editor `image-slot` is read-only and just shows `src`.
- **Fonts**: Manrope 300/400/500 for display (700 is loaded but never used in sheets), DM Sans 400 body, DM Mono 400 labels.

## 5.2 Case Study sheet anatomy (8 documents, 5–7 pages)

### Page 01 — Cover (dark `#051729`)
```
padding: 54px 56px 34px · flex column · justify-content: space-between
├─ header row: logo (h 28) ··· "CASE STUDY" DM Mono 10px, tracking .24em, uppercase, #3DD6B5
├─ kicker: DM Mono 10px .22em uppercase #B5CDE0, segments joined with " · "   e.g. "Protein Distribution · LTL & FTL · NetSuite"
├─ <h1> Manrope 400, 58–86px, line-height .98–1.02, tracking -.03em, max-width 560–660px, white + one <span style="color:#3DD6B5"> phrase
├─ rule: 64 × 2px #3DD6B5
├─ lede: DM Sans 16px/1.62 #C8DAE9, max-width 560–620px
└─ photo band: height 320 / 330 / 340px, <image-slot> + scrim
      linear-gradient(to bottom, #051729 0%, rgba(5,23,41,.55) 22%, rgba(5,23,41,.05) 60%, rgba(5,23,41,.35) 100%)
```

### Pages 02…N — interior (white)
- **Running header** `padding:34px 56px 0`: left DM Mono 10px .22em uppercase `#3D5670` "**{Customer} × FreightPOP**"; right DM Mono 10px .18em `#7A93AC` "**02 / 07**".
- **Body** `flex:1; padding:42–46px 56px 36–40px; gap 20–36px`.
- **Section eyebrow** DM Mono 10px .24em uppercase **`#0F7B6C`** (deep teal — the light-page equivalent of `#3DD6B5`): "About", "The Challenges", "Business Impact", "Results", "Key Insights", "In their words", "Custom Workflow Solution", "Implementation Approach", "Integration Spotlight".
- **H2** Manrope 400 **42 px**, line-height 1.05, tracking −.025em, max-width 620–640.
- **Two-column intro copy** `grid 1fr 1fr; gap 34px`; DM Sans 15px/1.7 `#3D5670`.
- **Fact tile** (the workhorse card):
  ```
  border:1px solid #E2EAF3; border-radius:16px; padding:18px 20px 20px;
  background: linear-gradient(135deg, #F1F6FB 0%, #FFFFFF 42%, #FFFFFF 68%, #F0F8F6 100%);
  box-shadow: 0 1px 2px rgba(5,23,41,.04), 0 4px 14px rgba(5,23,41,.05);
  ├─ label DM Mono 10px .16em #0F7B6C   ("×2", "2001", "Phase 01", "01")
  └─ title Manrope 500 17px
  grid: repeat(2|3, 1fr); gap 14px
  ```
  **Highlighted** variant: `border:2px solid #0F7B6C; radius 18px; background: linear-gradient(135deg,#F0F8F6,#FFFFFF 55%,#F0F8F6); shadow …, 0 8px 24px rgba(5,23,41,.07)`.
- **Dark callout / pull-quote block**: `border-radius:20px; background: radial-gradient(70% 160% at 100% 0%, rgba(61,214,181,.16), transparent 62%), #051729; padding 30–38px 34–40px`. Eyebrow DM Mono 10px .22em `#3DD6B5` ("The tipping point", "Throughput per person"); quote Manrope **300** 21–23px/1.46 tracking −.015em white; attribution name 14px white, title 13px `#B5CDE0`.
- **Challenges list** (Miami Beef, Automotive): stacked rows divided by `1px #D0DCE8`; each row has a red numeral DM Mono 10px .18em **`#D32F2F`** "01", Manrope 500 20px `#16324C` h3, a `1px #F0BFC4` leader line filling the row, body DM Sans 14px/1.6 `#3D5670`.
- **Before / With FreightPOP table** (Newegg, Kyocera, 4Wall, Citrus, OUAF, Uneekor): headers DM Mono 10px .22em — "**Before**" `#D32F2F`, "**With FreightPOP**" `#0F7B6C` (padding-left 40); rows `grid 1fr 1fr; border-top:1px solid #D0DCE8`; right cell `border-left:1px solid #D0DCE8; padding-left:36px`. Left: numeral `#D32F2F` + leader `#F0BFC4`, h3 Manrope 500 17px `#16324C`, body 13px `#7A93AC`. Right: numeral `#0F7B6C` + leader `#9FE0CE`, h3 `#051729`, body 13px `#3D5670`. → **Red = before/problem, teal = after/FreightPOP** is the sheets' core semantic pairing.
- **Big-number stats**: Manrope 400 at 40 (Newegg/Kyocera), 46 ($ ranges), 56 (Automotive) or 62 px (Uneekor), line-height 1, tracking −.03em; unit (`%`, `+`, `×`) in `<span style="color:#0F7B6C">`; sub-label 17px `#7A93AC`.
- **Section-end accent** `height:8px; background: linear-gradient(to right, #3DD6B5 0%, rgba(61,214,181,0) 42%)`.
- **Dark quote band** (Results pages): `radial-gradient(60% 150% at 0% 0%, rgba(61,214,181,.14), transparent 60%), #051729; padding 34px 56px 36px`; quote Manrope 300 20px/1.5 white.

### Final page — Key Insights + footer
Eyebrow "Key Insights" / "Why {Customer} Chose FreightPOP" / "Insights"; thesis Manrope 300 **26px**/1.42 `#16324C`; 64 × 2 teal rule; paragraph 15.5px/1.72 `#3D5670`.
**Footer** (identical on all 8): `background: radial-gradient(60% 140% at 100% 0%, rgba(61,214,181,.14), transparent 60%), #051729; padding 40px 56px 44px; align-items:flex-end; justify-content:space-between`. Left: logo 24 px + Manrope 400 30px white "Have questions?<br>Contact us." Right (right-aligned): Manrope 22px `#3DD6B5` "(949) 454-4602", 13px `#B5CDE0` "sales@freightpop.com", "www.freightpop.com".

### 5.2.1 Per-study table

| File | Customer / kicker | Pages (screen labels) | Cover H1 (size) | Photo band | Headline stats | Key quote |
|---|---|---|---|---|---|---|
| `Case Study - Miami Beef.dc.html` | Miami Beef (Young American Food Brands) — "Protein Distribution · LTL & FTL · NetSuite" | **7**: 01 Cover · 02 About · 03 Challenges · 04 Custom Workflow Solution · 05 Implementation · 06 Business Impact · 07 Why FreightPOP | "Modernizing Freight Operations for a *Global Protein Distributor*" (58) | 320, `assets/cs/miami-beef-hero.jpg` (1000×750) | No numeric stats. About tiles: "×2 Production and shipping facilities", "Cold chain", "LTL & FTL Multi-broker outbound", "Requirement NetSuite ERP–integrated". Three workflow cards with mono flow lines "Order → Shipment → Cost → NetSuite", "Rate Discovery → Tendering → Tracking → Performance Review", "Invoice Receipt → Audit → Vendor Bill → Reporting". Phases 01 Onboarding / 02 Configuration / 03 Testing & Adoption. | Tipping-point callout: "As they prepared a new Miami facility with 6 dock doors and a tight readiness timeline, Excel-based freight and shipping processes became a clear bottleneck." (unattributed) |
| `Case Study - Newegg.dc.html` | Newegg — "Consumer Electronics E-commerce · Parcel & Freight" | **6**: Cover · About · Challenges & Solutions · Business Impact · Results · Key Insights | "Newegg *Commerce*" (62) | 330, `newegg-hero.jpg` | Tiles "2001 Online retailer since", "N. America Fulfillment center network", "Next Overseas shipment expansion". Impact: **~20** shipments → **60+** in the same time; **50–70%** less time on shipment tasks. | "We have one employee who used to arrange about 20 shipments. Now, that same employee can complete 60 or more shipments in the same amount of time." — Kai Chang, Senior Logistics Analyst & Project Manager |
| `Case Study - Kyocera.dc.html` | Kyocera Document Solutions America (KDA) — "Document Technology · Parcel & Freight" | **6**: Cover · About · Challenges & Solutions · Carrier Leverage · Results · Key Insights | "Kyocera Document *Solutions America*" (62) | 330, `kyocera-hero.jpg` (1000×563) | Tiles "×3 Regional distribution hubs", "×1 Parts distribution center", "×1 National returns center". Impact: **2** carriers → **1,500+** rate-shopped. | "Prior to FreightPOP, we limited ourselves to two carriers as it would not be realistic to rate shop every shipment manually…forcing our legacy carriers to follow suit." — Christian Mannino, Director of Logistics |
| `Case Study - 4Wall Entertainment.dc.html` | 4Wall Entertainment — "Entertainment Services · North America & Europe" | **5**: Cover · About · Challenges & Solutions · Business Impact · Key Insights | "4Wall Entertainment" (62) | 340, `4wall-hero.jpg` | "The operation, in numbers": **23** years, **2** continents, **300+** carrier integrations. H2 "Three bottlenecks, three fixes". | "I've put a request in as late as two o'clock in FreightPOP's system, and a carrier has shown up by 4:30…" — Michael Teixeira, Logistics & Cross Rentals Coordinator |
| `Case Study - Automotive Manufacturer.dc.html` | Global Automotive Manufacturer (anonymised) — "Automotive Manufacturing · SAP S/4HANA" | **6**: Cover · About · Challenges · Solutions · Business Impact · Key Insights | "Global Automotive Manufacturer" (62) | 340, `automotive-hero.jpg` | About: **200,000** employees, **4M+** vehicles 2024, **1.5M** US. Results (56 px): **15%** freight cost reduction, **3%** invoice-audit savings, **40%** faster fulfillment, **40%** on-time improvement; **$500K–$1.5M** est. annual savings (46 px). Page 04 uses a flat `linear-gradient(160deg,#F4F8FC,#FBFDFE 55%,#F3FAF8)` instead of the grid. | none |
| `Case Study - Citrus Co-Op.dc.html` | Global Citrus Cooperative (anonymised) — "Agriculture · Perishable Freight" | **5**: Cover · About · Challenges & Solutions · Tive Integration · Insights | "Global Citrus Cooperative" (66) | 340, `citrus-coop-hero.jpg` | No numeric stats. 5-row Before/With table. Page 04 "Integration Spotlight — Tive and FreightPOP" with chips: Location · Temperature · Humidity · Shock · Light exposure · Live alerts. | none |
| `Case Study - Once Upon a Farm.dc.html` | Once Upon a Farm — "Organic Food & Beverage · Refrigerated LTL & Parcel" | **5**: Cover · About · Challenges & Solutions · Business Impact · Insights | "Once Upon a Farm" (62) | 330, `once-upon-a-farm-hero.jpg` | Tiles "Nationwide Retail distribution reach", "Sage X3 Accounting system of record", "Multi-carrier". 5-row Before/With table. H2 "One connected shipping workflow". | Callout "The outcome": "Automated workflows, a live view of every load, and a clean data path into Sage X3…" |
| `Case Study - Uneekor.dc.html` | Uneekor — "Golf Simulation · NetSuite ERP" | **5**: Cover · About · Challenges & Solutions · Business Impact · Key Insights | "Uneekor" (**86**, lh .98) | 340, **background-image** `uneekor-hero.jpg` (pos 50% 42%) | Results (62 px): **50%** shipping cost ↓, **50%** time-to-close ↓, **2×** volume w/o headcount, **20%** CSAT ↑. | Callout "How Uneekor Leverages FP" (no attributed quote) |

## 5.3 Why We Won sheet anatomy (15 one-pagers)

Single letter page, top to bottom:

**1. Hero band (dark)** — `flex-shrink:0; height:2.65in` (Alley-Cassetty 2.6in; six sheets have **no fixed height** — see drift). `display:grid; grid-template-columns: 1.62fr 1fr` (Alley 1.95fr; Associated/Winholt 1.3fr). Background = teal radial glow + 48 px grid `rgba(181,205,224,.08)` + `#051729`.
- Left cell `padding:30px 32px 30px 46px`: H1 Manrope 400 **40–64 px**, line-height 1.02, tracking −.03em, white with the second word in teal (`Mark <span>Andy</span>`, `Alley-Cassetty <span>Brick & Stone</span>`). Description DM Sans 14px/1.6 `#B5CDE0`.
- Alley-Cassetty only: hero pull-quote Manrope 14px white + DM Mono 10px `#3DD6B5` "— Suzi Johnson".
- Associated Packaging / Winholt variant: logo in an inline `<header>` (26 px) then **industry chips** — DM Mono 9.5px .12em uppercase `#3DD6B5`, `border:1px solid rgba(61,214,181,.38); border-radius:9999px; padding:4px 10px` ("Packaging", "Distribution" / "Manufacturing", "Food Service", "Distribution").
- All others: logo absolute `top:22px; right:34px; height:20px`.
- Right cell `data-slot="hero"`: `background-image` photo with per-sheet `background-position`, two scrims — `linear-gradient(to right, #051729 0%, rgba(5,23,41,.62) 26%, rgba(5,23,41,.12) 72%, …)` and a 96 px top fade `rgba(5,23,41,.55)→0`.

**2. Two-column body** `grid 1fr 1fr`:
- Left **"The Challenge"** (DM Mono 10px .22em uppercase **`#D32F2F`**), `padding:14px 32px 14px 46px; border-right:1px solid #D0DCE8`. Items (`data-slot="challenges"`) in `repeat(3,135px); gap 20px` (fixed) or `repeat(3|4,1fr); gap 14px` (fluid). Each: `grid 26px 1fr; gap 12px`; **numbered badge** 26 × 26 circle `background: linear-gradient(150deg,#FFFFFF,#FDEFF1); border:1px solid #F0BFC4;` DM Mono 11px `#D32F2F` "01"; h3 Manrope 500 16px/1.25 tracking −.01em; body DM Sans 13px/1.55 `#3D5670`.
- Right **"Why FreightPOP Won"** (DM Mono 10px .22em uppercase **`#0F7B6C`**), `padding:14px 46px 14px 32px; background: linear-gradient(160deg,#F4F8FC 0%,#FBFDFE 55%,#F3FAF8 100%)`. Items (`data-slot="wins"`) are **cards** (fact-tile recipe: `#E2EAF3` border, r16, 135° gradient, dual shadow, `padding:13px 18px 14px`) with a 26 px icon circle `linear-gradient(150deg,#FFFFFF,#EAF7F3); border:1px solid #9FE0CE` containing a 14 × 14 Lucide-style stroke icon in **`#3AC7A8`** (link, eye, bar-chart, layers, refresh-clock, dollar, truck, boxes).

**3. Stats row** (`data-slot="stats"`) — `grid repeat(4,1fr); background:#FFFFFF; border-top:1px solid #D0DCE8; padding:12px 46px 14px`; each cell `grid-template-rows:14px auto auto; gap 7px; padding 0 20px`, `1px #D0DCE8` dividers. Label DM Mono 9.5px .16em uppercase `#0F7B6C`; value Manrope 400 **40px**/1 tracking −.02em with the unit in `#0F7B6C`; caption 13px/1.35 `#3D5670`.

**4. Footer** — `radial-gradient(60% 140% at 100% 0%, rgba(61,214,181,.14), transparent 60%), #051729; padding:16px 46px 18px`. Left: Manrope 400 24px white "See FreightPOP in action." + 13px `#B5CDE0` "Book a custom demo today." Right: DM Mono 10px .18em `#B5CDE0` "Talk to us", Manrope 21px `#3DD6B5` "(949) 454-4602", 12px `#B5CDE0` "sales@freightpop.com · www.freightpop.com".

There is **no** "competitors considered" or deal-facts block on any sheet; the previous system is expressed inside the challenge copy.

### 5.3.1 Per-sheet table

"Generic" stats row = **Shipping Costs 30%** "Average reduction in shipping costs" · **Processing Time 95%** "Average decrease in (shipment) processing time" · **On-Time Delivery 40%** "Average increase in on-time deliveries" · **Invoice Auditing 15%** "Average freight spend savings with (invoice) auditing".

| Sheet | H1 (size) | Industry / description | Challenges (h3) | Wins (h3) | Stats row | Hero image (px) |
|---|---|---|---|---|---|---|
| Mark Andy | Mark **Andy** (64) | Flexographic & digital label presses | Fragmented multi-division operations (five divisions) · Incomplete third-party shipping data · No ERP integration (Rootstock) | Seamless Rootstock ERP integration · Enhanced visibility and tracking · Advanced reporting and analytics | Generic | `mark-andy-hero.jpg` 678×452 |
| Alley-Cassetty Brick | Alley-Cassetty **Brick & Stone** (50) | 145-yr building-materials mfr, Nashville; 15 locations, 115+ trucks, ~50,000 deliveries/yr — "All of it, until FreightPOP, on paper." | No inventory visibility · Zero warehouse standardization (pegboards, Excel, Word) · Paper-based pick tickets (SYSPRO) · Partial loads, returns, and reps in the dark | WMS with real bin management · Native SYSPRO integration · Partial load & return tracking · Self-serve visibility for reps | **49,680** deliveries/yr · **15** yards · **115+** trucks · **100%** paperless dispatch | `alley-cassetty-brick-hero.jpg` 900×675 |
| Automobile Manufacturer | Global Automobile<br>**Manufacturer** (40) | 4M+ vehicles sold annually | Disconnected systems, missed deliveries · No SAP S/4HANA integration · Minimal inbound and outbound visibility · Manual procurement and invoicing | Centralized TMS eliminated silos · SAP S/4HANA integration · Real-time visibility · Automated procurement & invoicing | **15%** shipping costs · 95% · 40% · **5%** invoice auditing | `automobile-manufacturer-hero.jpg` 900×675 |
| Associated Packaging | Associated<br>Packaging (52) | Chips: Packaging, Distribution; 12 branches | Twelve branches, twelve processes · Carrier management that fought back · No line of sight across operations | One platform, 12 branches · NetSuite integration · Centralized carrier management | Generic | `associated-packaging-hero.jpg` 900×675 |
| Beaumont Juice | Beaumont Juice (52) | Multi-brand juice (Perricone Farms, Natalie's) | Two NetSuite environments, one broken workflow · Manual routing jammed six docks · Multi-stop planning with no automation | Orders consolidated across subsidiaries · Drag-and-drop multi-stop routing · Automated dock scheduling | Generic | `beaumont-juice-hero.jpg` 900×1080 |
| Clean Simple Eats | Clean Simple Eats (52) | Clean-label protein/supplements | No link between NetSuite and shipping · Carrier-by-carrier website hopping · $24K a month in avoidable spend | NetSuite integration, end to end · Real-time tracking and AI insights · Automated rate shopping | **$300K** annual savings · 95 · 40 · 15 | `clean-simple-eats-hero.jpg` 900×1158 |
| DP Wagner | DP Wagner (58) | Mfr + 3PL, Powder Springs GA, 175,000 sq ft; Walmart/Target/Costco/Home Depot/Amazon | Inventory tools outgrown · Manual BarTender labels · No WMS-to-ERP sync | A WMS built for a 3PL floor · Automated retailer labels · Acumatica integration, plus EDI | **33** dock doors · **175K** sq ft · **100%** label compliance · **0** manual BarTender steps | `dp-wagner-hero.jpg` 900×675 |
| Flair Packaging | Flair Packaging (56) | Sustainable packaging | No Microsoft Dynamics 365 integration · Slow onboarding, limited visibility · Manual HS code and origin management | Microsoft Dynamics 365 integration · Automated compliance data · PO/SO-level tracking | Generic | `flair-packaging-hero.jpg` 770×434 |
| Once Upon a Farm | Once Upon a Farm (52) | Organic kids snacks | A hard go-live deadline · No Sage X3 integration · Disorganized workflows | Personalized implementation support · Seamless Sage X3 integration · Optimized shipping processes | Generic | `once-upon-a-farm-hero.jpg` 900×600 |
| Pyramex | Pyramex (64) | PPE | Limited insight into shipping · No NetSuite integration · No automation to scale on | Native NetSuite integration · Optimized packaging configurations · Shipping automation | Generic | `pyramex-hero.jpg` 900×900 |
| Sonco Worldwide | Sonco Worldwide (56) | Fencing, construction supplies, shade; government contracting | No freight management or tracking · A limited carrier network · Manual shipping processes | Native Acumatica integration · Automated multi-mode shipping · Centralized shipment management | Generic | `sonco-worldwide-hero.jpg` 733×550 |
| Sunbelt Solomon | Sunbelt Solomon (55) | Electrical power / transformer lifecycle | Rigid homegrown middleware · Manual BOLs and invoicing · Month-end invoicing bottleneck · Single-3PL dependence (4 rows @ 98 px) | Direct ERP connection via ShipLink · Automated BOL and invoice workflows · Expanded carrier access (3 rows @ 135 px) | Generic | `sunbelt-solomon-hero.jpg` 900×1200 |
| Sunkist Growers | Sunkist Growers (56) | Citrus, global distribution | Limited tracking and visibility · Retailer rejections · No ERP integration | Tracking system and ERP integration · Carrier integrations · Streamlined, automated shipping | Generic | `sunkist-growers-hero.jpg` 900×635 |
| Uneekor | Uneekor (58) | Golf simulation | Limited scalability · Manual shipping workflows · Carrier management inefficiencies (3) | Real-time visibility · Automated dispatch · AI-driven insights · Native NetSuite integration (4) | **50%** shipping costs ↓ · **20%** CSAT · **50%** time-to-close · **2x** volume | `uneekor-hero.jpg` 900×675 |
| Winholt | Winholt (60) | Chips: Manufacturing, Food Service, Distribution | A 40% error rate on manual entry · An unreliable logistics provider · No centralized shipping control | ERP integration killed the rekeying · One place for inbound and outbound · Visibility the whole team can act on | Generic | `winholt-hero.jpg` 900×675 |

Only Alley-Cassetty carries a customer quote on the WWW sheet.

## 5.4 Validation Library data model (`Homepage Hero/data.js`, mirrored in the `.dc.html`)

**86 items** across 6 categories: `stats` 8 · `casestudies` 8 · `whywewon` 15 · `reviews` 44 · `recognition` 3 · `facts` 8. Badges: Capterra 16, G2 3, "Case study" 4, Platform 7. 12 items carry `figures`.

Item shape: `{ cat, stars, label, quote?, title?, body?, figures?: [{v,k}], who, meta, tags[], badge?, sheet?, pages?, thumb?, company?, industry?, erp?, logo? }`.

**Tabs (7):** `overview` "Overview" · `stats` "Headline stats" · `reviews` "5★ reviews" · `casestudies` "Case studies" · `whywewon` "Why we won" · `recognition` "Recognition" · `facts` "Platform".

**Feature groups (4 groups, 34 tags)** — these are the same names as the deck's modules, which is how `?feature=` deep-links work:
- **TMS (18)**: Shipping Rules Engine · Carrier Management · Rate Shopping · Spot Quoting & Bid Portal · Address Validator & Accessorials · Shipment Consolidation · Pooling & Cross-Dock · Multi-Leg Shipments · Batch Shipping · Parcel Shipping · Documents & BOL Control · Fleet & Dispatch · Route Optimization · Driver App & POD · Tracking & Notifications · Freight Invoice Audit · Reporting & Analytics · Dock Scheduling
- **OMS (5)**: Order Management and Intake · Product Detail & Auto Pack · Order Consolidation · Inbound Order Management · Order-to-Fulfillment Handoff
- **WMS (6)**: Guided Receiving · License Plating, Lot, and Serialization · Put-Away & Bin Transfers · Order Picking & Fulfillment · Inventory Visibility & Adjustments · Cycle Counting
- **Across the platform (5)**: ROI · ERP Integration · Onboarding · Support · Company

Tag usage: Rate Shopping 40 · ERP Integration 32 · Carrier Management 30 · Tracking & Notifications 29 · Reporting & Analytics 24 · ROI 18 · Support 15 … **Zero-item tags** (hidden from the rail): Pooling & Cross-Dock, Driver App & POD, License Plating, Lot, and Serialization.

⚠ The deck's `LIB_TAG_MAP` remaps four module names to tags ("Third-Party & Inbound", "Order Intake", "Auto Pack", "Address & Accessorial Checks") that **do not exist** in `FEATURE_GROUPS` — those deep-links land on an unfiltered library. See Part 7.

**Headline stats strip** (`BIG_STATS`): **30%** savings on annual freight spend · **95%** reduction in shipment processing time · **40%** average increase in on-time deliveries · **15%** savings via invoice auditing. Top-bar scores: **4.8** average rating · **95%** user satisfaction.

Representative items (verbatim):
1. stats — "30% average savings on annual freight spend" · figure `30%` · who "FreightPOP published figure" · meta "Customer-reported".
2. stats — "$500K–$1.5M in estimated annual savings" · who "Global Automotive Manufacturer case study".
3. stats — "1,500+ integrations on 99.99% uptime" · figures `1,500+` "carrier and system connections", `99.99%` "platform uptime" · meta "Verify live".
4. casestudies — sheet "Case Study - Kyocera.dc.html", pages 6, thumb `assets/cs/page-kyocera.jpg`, company "Kyocera Document Solutions America", industry "Document technology · 5 US facilities", erp "Oracle ERP", title "2 carriers to 1,500+ rate-shopped", who "Christian Mannino, Director of Logistics".
5. whywewon — sheet "Why We Won - Alley-Cassetty Brick.dc.html", label "Alley-Cassetty Brick & Stone + SYSPRO", industry "Building materials · 15 yards, 115+ trucks", erp "SYSPRO".
6. reviews (5★) — "It saves us 70% of our freight request time." · figure `70%` "less time spent requesting freight" · who "Sr. Supply Chain Analyst · Wholesale" · meta "Verified review".
7. reviews (5★, NetSuite) — "We have already seen a 50% reduction in our shipping cost from previous year, and with 20% sales growth." · body 'Titled "Best Decision We Made in 2023."…'
8. reviews (badge "Case study", 0 stars) — "Some TMS systems charge by carrier set up, but FreightPOP allowed us to add as many carriers as we want, without adding to our monthly cost…" — Christian Mannino · Director of Logistics, Elgen Manufacturing.
9. recognition — "Ranked by Inc. seven times" · logo from freightpop.com · figure `7×` "Inc. rankings since 2022" · meta "2022–2026 — hold the 2026 mention until the list publishes".
10. facts (Platform) — "SOC 2 compliant" · meta "Confirm type and current period before sharing externally".

Note the `meta` field doubles as an **internal usage note** ("hold the 2026 mention…", "Confirm type…"); a designer building the public-facing version should decide whether `meta` is shown or hidden.

## 5.5 The Validation Library UI (`Validation Library.dc.html`, deck version)

The `.dc.html` is the design source; the static port in Part 6 is a faithful re-implementation. Differences are listed in Part 7. Design canvas preview `1280 × 800` (`$preview`); the page is `height:100vh; min-height:440px; overflow:hidden`.

**Palette (library-specific):** page `#04121F`; rail `rgba(5,23,41,.6)` + blur 8; top bar `rgba(4,18,31,.55)` + blur 10; cards `rgba(6,26,44,.6–.7)`; image wells `#0A1F33`; text tints `#EAF3F9` (headings), `#E6F0F7`, `#DCEAF4`, `#C3D5E3`, `#B9CBD9` (body), `#A8BECF` (sub), `#9DB6CC` (inactive), `#8FA9C0` (mono labels), `#7E97AC`; teal `#3DD6B5`, hover `#5FE3C6`; stars `#F2B441`; sky `#7FB6E8` / `rgba(127,182,232,…)` for the ERP pill and initial badge.

### Top bar
`border-bottom:1px solid rgba(255,255,255,.08); padding:11px 26px; gap:14px`.
1. **"‹ Back to deck"** — `padding:7px 11px; border:1px solid rgba(255,255,255,.18); radius 6; color #DCEAF4; 11.5px 500`; hover teal border/text. Inside the deck (has `?feature` and `window.parent !== window`) it posts `{fpCloseLib:true}` instead of navigating.
2. **Kicker** "What customers / say" — DM Mono 9px .15em uppercase `#3DD6B5`, two lines.
3. **Tabs** — pills `11px; padding 6px 10px; radius 999`, count in DM Mono 9px @ .55 opacity. Active `bg #3DD6B5; color #051729; weight 700`; inactive `bg rgba(255,255,255,.03); color #9DB6CC; border rgba(255,255,255,.12)`. Overview · Headline stats 8 · 5★ reviews 44 · Case studies 8 · Why we won 15 · Recognition 3 · Platform 8.
4. **Scores** — value 13.5px 700 white, label DM Mono 7.5px .1em uppercase `#7E97AC`: "4.8 average rating", "95% user satisfaction".
5. **Search** — 118 px, `border 1px rgba(255,255,255,.14); radius 6; padding 7px 10px`, ⌕ glyph `#8FA9C0`, input Manrope 11.5px.

### Feature rail (266 px, collapses to 38 px)
- Header "By feature" DM Mono 10px .14em uppercase `#8FA9C0` + "‹" collapse; `padding 12px 18px; border-bottom rgba(255,255,255,.07)`.
- "Everything N" row 15px; active `bg rgba(61,214,181,.1); border-left:3px solid #3DD6B5; #fff 700`.
- Group rows (TMS / OMS / WMS / Across the platform) `padding 12px 18px; border-top rgba(255,255,255,.06)`; caret `+`/`–` DM Mono 13px teal; name 15px 600 `#EAF3F9` (teal when holding the active tag); count DM Mono 11px `#8FA9C0`; open bg `rgba(255,255,255,.04)`.
- Tag rows `padding 9px 18px 9px 37px; 13.5px/1.35`; active as "Everything" (weight 600).

### Stage views
- **Overview**: title "What FreightPOP customers see" `clamp(18px,3.2vh,28px) 700 −.03em`; sub `clamp(11.5px,1.8vh,14px) 300 #A8BECF`; **bigStats strip** — outer `border 1px rgba(61,214,181,.24); radius 12; gap 1px; background rgba(255,255,255,.07)` (the 1 px gaps read as hairlines), `box-shadow 0 0 40px -18px rgba(61,214,181,.45)`; cells `rgba(6,26,44,.7); padding clamp(16,2.8vh,26) clamp(16,1.6vw,22)` with a 130×100 teal glow blob top-left; number `clamp(30px,6.4vh,60px) 700 #3DD6B5 −.04em`; label DM Mono `clamp(9.5,1.4vh,11.5) .09em uppercase #A8BECF`. Library chips below: `padding 8px 13px; radius 999; border rgba(255,255,255,.13); bg rgba(255,255,255,.03)`; name 11.5px `#E6F0F7`, count DM Mono 9.5px; hover teal ring `0 0 0 3px rgba(61,214,181,.08), 0 0 22px -4px rgba(61,214,181,.45)`.
- **Grid**: measured by `ResizeObserver` and packed by `fitGrid(n,w,h)` (gap 12). Card `border 1px rgba(255,255,255,.11); radius 12; bg rgba(6,26,44,.6); blur 6`; hover `border rgba(61,214,181,.5); shadow 0 0 26px -8px rgba(61,214,181,.4)`. Well variants: **page** thumbnail (cover, top-center), **logo** (white panel, `padding 18px 20px`, contain), **bare** (28 px navy grid + 34 px circle `border rgba(127,182,232,.4); bg rgba(127,182,232,.1)` with initial in DM Mono 11px `#7FB6E8`), **figure** (teal radial wash + big number `700 #3DD6B5 −.04em; text-shadow 0 0 30px rgba(61,214,181,.4)`). Body `padding 9px 12px 10px`: title 15.5px 700 −.02em (2-line clamp), sub DM Mono 9px .09em uppercase `#8FA9C0`, tag pills `10px; padding 2px 7px` (`bg rgba(255,255,255,.04); #9DB6CC; border rgba(255,255,255,.11)`; active teal), "+N".
- **Board**: title `clamp(19px,3.1vh,27px) 700 −.03em`; summary "4 numbers · 12 quotes · 3 documents" DM Mono 11px .11em uppercase `#8FA9C0`; "clear ✕" DM Mono 10px teal. Figures strip (≤ 4) reuses the bigStats container at `clamp(40px,7.4vh,68px)`; cell hover `rgba(10,38,62,.86)`. Columns `minmax(0,1.35fr) minmax(0,.9fr)`. Quote cards `repeat(auto-fill, minmax(268px,1fr))`, `radius 10; bg rgba(6,26,44,.62); padding 11px 13px 10px`; quote 14.5px 300 `#EAF3F9`/1.5 (4-line clamp); stars ★★★★★ 10.5px .06em `#F2B441`; who DM Mono 9px .09em uppercase. Document thumbs 176 px `aspect-ratio 408/528; radius 5; border rgba(255,255,255,.13); shadow 0 6px 18px -8px rgba(0,0,0,.75)`; caption 11px `#C3D5E3`. Note cards `border-left 3px solid rgba(61,214,181,.55); radius 10`, title 17px 500.
- **Detail**: three sub-layouts — **sheet** (864×1152 page box scaled to fit, `radius 4; shadow 0 30px 90px -30px rgba(0,0,0,.85), 0 0 0 1px rgba(255,255,255,.14)`, iframe `pointer-events:none`, `cursor:zoom-in`, footer DM Mono 8.5px: "Why We Won · one-pager" / "N pages" / "Enlarge ⤢" / "New tab →"); **flip** (a dormant 720×≤400 3D flip card, `perspective 1600px`, front `#071E31` with ERP pill `rgba(127,182,232,.14)/#7FB6E8`, conic-gradient percentage ring, `<image-slot>` logo 74×26 and hero; back `#08243B` with "Before" `#F0A0A0` bullets and "With FreightPOP" teal bullets — **no data item sets `flip`, so this never renders**); **plain** (optional white logo card `radius 8; padding 10px 14px; width clamp(120px,17vw,168px); height clamp(48px,8.4vh,66px)`, stars 16px `#F2B441` + meta DM Mono 10.5px uppercase, quote `clamp(21px,3.7vh,33px) 300 #F2F8FC/1.4 −.015em`, title `clamp(21px,3.6vh,32px) 700 −.03em`, figures row with `1px rgba(255,255,255,.1)` rules and values `clamp(25px,5vh,42px) 700 teal`, body `clamp(14px,2.2vh,18px) 300 #B9CBD9 max 780px`, who row). Below: "Proves" tag pills 11.5px, numbered strip (1 < items ≤ 16; 26×26 r6 DM Mono 10px; active `rgba(61,214,181,.12)` + teal border), pager (32 px circles `border rgba(255,255,255,.18); #B5CDE0`, "i / n" DM Mono 10.5px .08em, links 10.5px teal, 2 px progress bar `rgba(255,255,255,.09)` → teal).
- **Zoom overlay** (z 40): `rgba(2,10,18,.9)` + blur 6, `cursor:zoom-out`, `vlSlide .2s`; page 864×1152 scaled by `zoomScale` (default .5), `radius 3; shadow 0 40px 120px -30px rgba(0,0,0,.9); bg #fff`; controls ← → DM Mono 14px teal `padding 2px 9px; border 1px rgba(61,214,181,.4); radius 6`, "1 / 6" DM Mono 10px .12em white, "Esc to close" DM Mono 9px .14em uppercase `#8FA9C0`.

**Motion:** every view swap runs `vlSlide .28s ease-out` (opacity 0→1, translateY 7→0). Background orbs drift 26 s / 34 s and pulse 18 s.

### The data (86 items) — category summaries
- **stats (8):** "30% average savings on annual freight spend" · "95% reduction in shipment processing time" · "40% average increase in on-time deliveries" · "8–15% savings through invoice auditing" · "$500K–$1.5M in estimated annual savings" (Global Automotive Manufacturer) · "$35k saved in under a year, on a third more volume" (Prima Supply) · "No per-carrier setup fee" ($0, Elgen) · "1,500+ integrations on 99.99% uptime".
- **casestudies (8):** Kyocera (Oracle ERP, 6 pp, "2 carriers to 1,500+ rate-shopped") · Newegg (6 pp, "20 shipments per person became 60+") · Miami Beef (NetSuite, 7 pp, "Excel to a NetSuite-integrated TMS") · Uneekor (NetSuite, 5 pp, "50% lower shipping cost, 2× volume") · 4Wall (5 pp, "Request at 2pm, carrier by 4:30") · Global Citrus Cooperative (5 pp, "Manual workflows to automated shipping") · Global Automotive Manufacturer (SAP S/4HANA, 6 pp, "$500K–$1.5M in estimated annual savings") · Once Upon a Farm (Sage X3, 5 pp, "One connected shipping workflow").
- **whywewon (15):** the 15 sheets in §5.3, each with ERP and a one-line label ("Alley-Cassetty Brick & Stone + SYSPRO").
- **reviews (44):** 5★ verified reviews (Capterra ×16, G2 ×3) plus 3 "Case study"-badged quotes (Christian Mannino ×2 — Elgen Manufacturing; Michael Miller — Prima Coffee). Labels such as "70% of freight request time saved", "Freed up a full-time logistics role", "Recouped the investment in 3 months", "New hires run complex shipments in week two", "Bulk quoting saved days of work", "Keying errors virtually eliminated", "Set up in seconds", "The software just works", "A Game Changer for LTL Freight Shippers".
- **recognition (3):** "Ranked by Inc. seven times" (7×; remote Inc. logo; meta "hold the 2026 mention until the list publishes") · "Recognized for support, not just software" (G2 · Capterra) · "EY Entrepreneur Of The Year — winner, and a 2026 finalist" (Kurt Johnson).
- **facts (8):** "Uptime monitored against a published target" (meta "Confirm whether 99.99% is a contractual SLA or an internal measurement") · "SOC 2 compliant" (meta "Confirm type and current period…") · "A single-mode TMS could not see the whole chain" (US plastics distributor) · "No middleware between you and your ERP" · "Built by people who have run freight" · "AI in the workflow, not beside it" · "One named person owns your go-live" · "1,500+ carrier and system connections".

## 5.6 `Validation Library (internal audit).dc.html` — the evidence audit

An **internal** grading tool with the same visual language but a simpler IA: a single-item stage plus a 246 px right rail list; no grid/board/sheets. Tabs: **All 24 · Quotes 5 · Cases 5 · Wins 3 · Metrics 4 · Facts 4 · Do not use 3**. The "Do not use" tab is styled red when active (`bg rgba(179,38,30,.2); color #F08A82; border rgba(179,38,30,.5)`). Feature `<select>` (`bg rgba(255,255,255,.04); border rgba(255,255,255,.14); radius 6; #B5CDE0; 11.5px`) and a 132 px search.

**Evidence grades used here** (note "Baseline" replaces the deck's "Modeled" and the colours are reassigned): Measured `#3DD6B5` on `rgba(61,214,181,.13)` · Reported `#E8B54A` on `rgba(232,181,74,.13)` · **Baseline** `#7FB6E8` on `rgba(127,182,232,.13)` · **Platform** `#9DB6CC` · **Do not use** `#F08A82` on `rgba(179,38,30,.14)`. (In the deck, Platform is blue `#7FB6E8` and Modeled is grey `#9DB6CC` — the two systems swap those colours. See Part 7.)

Stage: grade pill + "kind · company" (DM Mono 9.5px uppercase `#6E869C`), title `clamp(18px,3.5vh,30px) 700`, italic quote `clamp(14px,2.4vh,21px) 300 #DCEAF4`, figures `clamp(21px,4.4vh,36px)` teal, body 300 `#A8BECF`, "Source" and "Proves" rows (DM Mono 8.5px .13em `#546F87`). Rail rows: 5 px grade dot, company DM Mono 8px uppercase `#6E869C`, title 11.5px; active `bg rgba(61,214,181,.08); border-left 2px teal`.

**The 24 findings** (kind · company · grade · title):
1. Win analysis · Buffalo Seal & Gasket · Measured · "The only complete dollar model we own" — $140,294 modeled annual savings; $23,661 ARR, 3-year term; 5.9× savings to spend (Closed Won analysis, Dec 22 2025)
2. Discovery · Buffalo Seal & Gasket · Measured · "What the legacy TMS was costing them" — 3–5 min per parcel in Starship; 20–30 packages unshipped daily
3. Win analysis · Buffalo Seal & Gasket · Measured · "A $225 discrepancy sold freight audit"
4. Reference · Buffalo Seal & Gasket · Reported · "Freight cost back on the ERP order"
5. G2 review · Catherine C. · Reported · "Bulk quoting — our strongest testimony"
6. G2 review · Francisco A. · Reported · "Savings in freight and in payroll"
7. G2 review · Anonymous · Reported · "Keying errors gone after ERP integration"
8. Software Advice · Anonymous · Reported · "Reporting changed which carriers they used" (85 carriers on one system)
9. Aggregate · G2 · Reported · "Third-party standing" — 4.8★ / 39 reviews; 9.7 quality of support; 9.6 ease of use; 57.9% mid-market
10. Case study intake · Alley-Cassetty · Baseline · "Largest operation on record — pre-FreightPOP baseline" — 49,680 deliveries/yr; 115+ trucks; 15 locations; ~4,000 FTL & 10,000 invoices/month; Excel/Word/pegboards
11. Case study intake · Alley-Cassetty · Reported · "The coordinator fields status calls all day"
12. Case study intake · Callaway Blue · Baseline · "Dock scheduling before software" — 20 docks; 1× schedule refresh per day; measured results due at 90-day review
13. Case study intake · Callaway Blue · Baseline · "Every PO re-keyed from a printed PDF"
14. Closed lost · Hero Bread · Measured · "Where our ROI questions failed" — "The questions asked would not be great for determining our ROI."
15. Partner training · Acumatica · Baseline · "Where ROI actually lands" — 100+ freight shipments/month threshold
16. Benchmark · ROI tool spec · Baseline · "Modeled savings ranges" — 5–15% rate shopping; 1–3% invoice audit recovery
17. Target · Anchor Distributing · Baseline · "Automation ceiling in a live account" — 80–90% shipments hands-off (a goal, not measured)
18. Platform fact · FreightPOP · Platform · "Carrier network, built in-house" — 1,500+
19. Platform fact · "No per-seat pricing"
20. Platform fact · "Parcel included at no extra cost"
21. Platform fact · "Free driver app, yours and your carriers'"
22. Retired claim · GetApp listing · **Do not use** · "Up to 30% freight spend reduction"
23. Retired claim · Unsourced · **Do not use** · "40% increase in on-time deliveries" — "No source exists in Confluence, Fathom or any of our listings. Removed from the Route Optimization card. Do not reintroduce."
24. Standing gap · All accounts · **Do not use** · "Any post-go-live percentage" — 0 post-implementation metrics on file

⚠ **Content conflict for the designer/writer to be aware of:** the public library (§5.5) and the static port still headline **"40% average increase in on-time deliveries"** and **"30% average savings"** — and every generic Why-We-Won stats row repeats 30 / 95 / 40 / 15 — which this audit grades "Do not use". Any redesign of the stats strip should get those four numbers re-confirmed before they are set in type.

## 5.7 `Validation & ROI Plan.dc.html` — internal working document

A **light-theme, printable, flowing document** rendered through `<x-import component-from-global-scope="doc-page" from="./doc-page.js">` (no fixed pages). Fonts: DM Mono 400/500 + **Inter Tight** 400–700 (the only file in the project using Inter Tight). Text `#12212F`, 11 pt; links `#0A6E5C` (hover navy underline); header rule `border-bottom:3px solid #051729`; stat cards `border 1px #D6DEE5; radius 8; padding 13px`, label DM Mono 8pt `#6B7A88`, value 19pt 700 `#051729`.

- Eyebrow: "FreightPOP · Sales Deck · Internal working doc". Title **"Validation & ROI Plan"** (23pt 700 −.02em). Standfirst: "What proof each of the 35 demo cards needs, what evidence actually exists today, and the math for a live per-feature ROI calculator that sums to one number at the end of the pitch."
- Three stat cards: **Hard $ proof today — 1** (Buffalo Seal & Gasket) · **Post-go-live metrics — 0** ("Every case-study intake grades Quantified Results 1/5") · **Third-party standing — 4.8 / 39** (G2).
- **1. The three-layer rule** — "Every card carries at most three proof objects, and never a bare adjective." Metric ("Ranges beat point estimates: 5–15% reads as honest, 12.4% reads as invented.") · Testimony · ROI math ("Shown as low / likely / high, never a single number.").
- **2. Evidence inventory** — table Evidence · Detail · Source · Grade (A/B/C). Fourteen rows including Buffalo Seal ROI model (A), ROI tool benchmark ranges (A, "Mode-Level ROI spec, Jan 2026"), Alley-Cassetty baseline (B), Callaway Blue baseline (B), four review testimonies (B), "Up to 30% freight spend reduction" (C, GetApp), "40% increase in on-time deliveries" (C, "Unsourced — deck copy only"), ROI qualification threshold (A, "Acumatica partner training, May 2026"), Known calculator failure (A, Hero Bread). Net read: "our freight-cost math is defensible, our labor math is anecdotal, and we have no post-implementation numbers from any customer."
- **3. Live ROI calculator — architecture** — Profile captured once (8 inputs: annual freight spend by mode; shipment count by mode; headcount + loaded hourly rate; minutes per shipment; carrier invoices/month; dock appointments/week + docks; locations + owned trucks; incumbent TMS cost) · Three bands, always · Every line is defeasible · No double counting · Two profiles, not one · Ledger behaviour during the pitch (persistent strip "Savings identified so far"; closing screen with three-band total, subscription cost, payback months, one-click export; "Buffalo Seal's model ran 5.9× ARR"). **This is a designed-but-unbuilt feature**: the deck has no ledger strip today.
- **4. Per-card validation map** — three tables: Transportation 19 cards, Order management 10 cards, Warehouse 6 cards (35 total — the deck now has 29, so six cards named here were merged or cut: Users & Roles, Sales Order Intake vs Order Management grid, Quote & Ship / Product Detail split, Hazmat / Class & NMFC, Third-Party / Collect, Returns Portal). Notable notes: Rate Shopping "Σ S_m × 5–15% — the anchor line of the whole model"; Route Optimization "Fix required. The 40% on-time claim has no source."; Quote & Ship / Product Detail "Fix first: these two cards' animations are swapped."; "WMS is our thinnest evidence area".
- **5. Gaps to close, in order** — 1 Strip the two unsourced numbers · 2 Fix the two structural defects (swapped OMS 03/04 animations, orphaned AutoDispatchDemo) · 3 Run three customer interviews (Alley-Cassetty / Bill Westman, Callaway Blue at 90 days, Buffalo Seal at one year) · 4 Get one measured case study published · 5 Add the cost-reduction profile · 6 Wire the ledger.
- Sources footer lists Confluence intakes (Alley-Cassetty, Callaway Blue, Miami Beef, VIRA, Suja, Forma, DP Wagner, Thomas Foods), Closed Won Buffalo Seal & Gasket, Closed Lost Hero Bread and Traverse City, Mode-Level ROI Tool spec, Acumatica Partnership training, WMS Context; public G2, Software Advice, GetApp. "No figure in this document is invented."

## 5.8 `Transition Preview.dc.html` — motion study

Canvas-mode study (`<meta name="design_doc_mode" content="canvas">`), page `#02101D`. Title **"Four ways into a new page"**, "Replay all" pill. Four 300 px panes (`#041b2d`, r16) each run the same mock TMS hub (6 cards: 01 Rate Shopping · 02 Spot Quoting · 03 Load Tendering · 04 Address Validator · 05 Freight Audit · 06 Documents) → detail page, with a different transition:

| # | Name | Description | Parameters |
|---|---|---|---|
| A | Stagger + scale-settle | "Cards assemble on a 45ms cascade from scale(.96)." | `fpSettle .42s cubic-bezier(.22,1,.32,1.15)`, delay `i × 45ms`, from `translateY(10px) scale(.96)` |
| B | Directional slide | "Enters from the side you navigated from." | `fpSlideR/L` translateX ±46px, `.34s cubic-bezier(.22,.9,.28,1)` |
| C | Clip wipe + teal edge | "Vertical reveal with the accent rule racing ahead." | `fpWipe .52s cubic-bezier(.65,0,.35,1)` (`clip-path inset(0 100% 0 0) → inset(0)`) + 3 px `#3DD6B5` bar with `0 0 22px 4px rgba(61,214,181,.55)` glow (`fpBar`) |
| D | Card-to-page zoom | "Page grows out of the card you clicked." | `fpZoomIn` scale .8→1 / `fpZoomOut` 1.14→1, `.38s cubic-bezier(.22,.9,.28,1)`, `transform-origin` = clicked card centre |

**Outcome:** the shipped deck adopted **A** (as `fpSettle .44s cubic-bezier(.22,1,.32,1.06)`, 34 ms cascade) for hubs and a plain `fpReveal` lift for feature steps; B–D were not adopted. The library uses only `vlSlide`.

---

# Part 6 — The static port (`Homepage Hero/`)

A dependency-free rebuild of the Validation Library, meant to be hosted anywhere (Netlify, HubSpot file hosting…) and embedded on the website — hence the working name "Homepage Hero". Git repo, single commit `09fdb9c` "Homepage Hero: standalone FreightPOP Validation Library" (2026-08-25), no remote. `design-source/` holds byte-identical copies of the 23 sheet `.dc.html`, `Validation Library.dc.html` and `support.js` for reference only.

## 6.1 Files

| File | Role |
|---|---|
| `index.html` (45 lines) | Shell: `<title>What customers say — FreightPOP Validation Library</title>`; Google Fonts Manrope 200–800 + DM Mono 400/500; loads `styles.css`, `data.js`, `app.js`. |
| `app.js` (578 lines) | All behaviour, vanilla IIFE. |
| `data.js` (503 lines) | The 86 items, `TABS`, `FEATURE_GROUPS`, `BIG_STATS`. |
| `styles.css` (55 lines) | Base, layout classes, animations, hover classes. |
| `Case Study - *.html` ×8, `Why We Won - *.html` ×15 | Standalone sheets — the `.dc.html` with the runtime wrapper stripped (16-line diff each) plus `<style id="vl-page-gap">doc-page > .page + .page{margin-top:96px} @media print{…margin-top:0}</style>`. |
| `doc-page.js`, `image-slot.js` | Web components the sheets need (see §6.5). |
| `assets/cs/` | 8 hero JPGs (1000×750; Kyocera 1000×563) + 8 `page-*.jpg` thumbnails, all **408×528**. |
| `assets/wwy/` | 15 hero JPGs (678×452 → 900×1200) + 15 `page-*.jpg` 408×528 + `freightpop-logo.png` 257×50. |

Serve over HTTP (`python3 -m http.server 8000`) — the sheets load in iframes. Deep link: `index.html?feature=Rate%20Shopping`.

## 6.2 Layout shell

```
#vl.vl-root  (100vh, background #04121F, font Manrope)
├─ #vl-zoom            (overlay mount)
├─ .vl-bg              decorative: 56px grid rgba(143,169,192,.07) masked radially;
│                      three blurred orbs — teal rgba(61,214,181,.20) 58vw drifting 26s,
│                      blue rgba(64,136,207,.22) 52vw 34s, teal .13 46vw pulsing 18s; vignette rgba(4,18,31,.72)
├─ .vl-top             top bar
│    ├─ .vl-back "‹ Back to deck"      → FreightPOP TMS Sales Deck v17.dc.html (or postMessage fpCloseLib when embedded with ?feature)
│    ├─ .vl-kicker  DM Mono 9px teal "What customers / say"
│    ├─ #vl-tabs    Overview · Headline stats · 5★ reviews · Case studies · Why we won · Recognition · Platform
│    ├─ .vl-scores  "4.8 average rating" · "95% user satisfaction"
│    └─ .vl-search  "⌕" + input placeholder "Search" (118px)
└─ #vl-main  grid 266px | minmax(0,1fr)      (rail collapses to 38px)
     ├─ rail (By feature)
     └─ stage (overview | grid | board | detail)
```

Note the port's page background is **`#04121F`** — one step darker than the deck's `#051729`. Inside the deck's overlay the two navies sit next to each other (deck header bar on `#051729`, library iframe on `#04121F`).

## 6.3 Views

- **Overview** — heading "What FreightPOP customers see" (Manrope 700, clamp 18–28px), sub "Results customers report across freight cost, processing time and delivery performance.", 4-cell BIG_STATS strip (border `rgba(61,214,181,.24)`, r12, cells `rgba(6,26,44,.7)`, numbers teal 700 clamp 30–60px), then pill links to each library with counts.
- **Grid** (tabs: whywewon, casestudies, recognition, stats, facts) — auto-fit cards. Document tabs use page-aspect cards (card width ≤ 244→268 px, `cardH = cardW × 1.294 + 91`, ≤ 6 columns, thumbnail well `background-size:cover; top center` on `#0A1F33`). Other tabs target 208×232 (min 168×196, max 262); the well shows a logo on white, a teal big figure, or an initial in a `#7FB6E8` ring. Card: `border:1px solid rgba(255,255,255,.11); r12; background rgba(6,26,44,.6); backdrop-filter blur(6px)`; title 15.5px 700; sub DM Mono 9px; tag chips 10px pills with "+N" overflow.
- **Board** (when searching, when a feature tag is set, or on the reviews tab) — title (tag / "query" / tab label) + DM Mono summary "N numbers · N quotes · N documents" + "clear ✕"; up to 4 de-duplicated figures; two columns `1.35fr / .9fr`: "In their words · N" quote cards (Manrope 300 14.5px, 4-line clamp, ★★★★★ in `#F2B441`) and a side column "Documents · N" (176 px thumbs, `aspect-ratio 408/528`, r5) + "Also proves it · N" note cards (teal left border). Empty state: "No validation matches that yet. Try a feature name, a company, or a word from a quote."
- **Detail** — sheet items render an `<iframe>` of the standalone `.html` inside `#vl-sheetScale` (864×1152, scaled ≈ .34, `pointer-events:none; cursor:zoom-in`); caption DM Mono 8.5px "Case study" / "Why We Won · one-pager", "N pages", "Enlarge ⤢" / "Enlarge to read all ⤢", "New tab →". Plain items: optional logo plate (white, r8), stars + meta, quote (300, clamp 21–33px, `#F2F8FC`), title (700, clamp 21–32px), figures row (teal 700, clamp 25–42px), body (300, `#B9CBD9`), "Who" line. Below: "Proves" tag chips, a 1–16 numbered strip (26×26, r6), nav row ← → "i / N", "← back to {board}", "all stories", "clear filters", 2 px teal progress bar.
- **Zoom** — full overlay `rgba(2,10,18,.9)` + blur(6px), `cursor:zoom-out`; same 864×1152 frame scaled ≈ .5; multi-page "←  1 / 7  →" (DM Mono 14px teal, bordered r6) and "Esc to close". Pages are stepped by translating the iframe `−1152·(n−1)` px.
- **Rail** — closed = 38 px column "›" + vertical "Features"; open = "By feature" header, "Everything N" row, four FEATURE_GROUPS accordions with "+/–" carets and per-tag counts; only tags with ≥ 1 item in the current pool are shown.
- **Search** — filters label/title/quote/body/who/industry/company/erp/tags across all categories.
- **Keyboard** — ←/→ step items (or pages when zoomed), Esc closes zoom; ignored while typing in an input.
- **Embedding contract** — `?feature=<tag>` opens the board pre-filtered (`{tag, tab:"all", grid:false}`); "Back to deck" with `?feature` present and `window.parent !== window` posts `{ fpCloseLib:true }` to parent and top instead of navigating.
- **External dependencies** — Google Fonts; one remote image (`https://www.freightpop.com/hs-fs/hubfs/Inc.%20In%20the%20News%20Logo.png`). Nothing else.

## 6.4 `styles.css`

`body{background:#04121F}`, `a{color:#3DD6B5} a:hover{color:#5FE3C6}`, 7 px scrollbars `rgba(255,255,255,.16)`, `.vl-strip` hides scrollbars, `select option{background:#0A2540}`. Keyframes: `vlSlide` (opacity 0→1, translateY 7→0; used at .28s/.2s), `vlDriftA` 26s, `vlDriftB` 34s, `vlPulse` 18s. Hover classes `.vl-hv-lib` (teal border/bg + `0 0 0 3px rgba(61,214,181,.08), 0 0 22px -4px rgba(61,214,181,.45)`), `.vl-hv-card`, `.vl-hv-tag`, `.vl-hv-fig`, `.vl-hv-quote`, `.vl-hv-doc` — all .18 s transitions to teal. (In the `.dc.html` original these were `style-hover` attributes.)

## 6.5 `<doc-page>` and `<image-slot>` (web components)

**`<doc-page>`** (37 KB, shadow DOM)
- Modes: *flowing* (browser paginates at print) vs *explicit* (direct `<section class="page">` children → one fixed page each). All sheets are explicit.
- Attributes: `size` = `letter` (default) | `a4` | `legal`; `orientation="landscape"`; `width`/`height`; `margin` (default .75in; sheets use `0`); `content-width`/`content-height`.
- Slots: default, `slot="header"`, `slot="footer"` (flowing only).
- Renders a desk `:host{background:#f5f5f4; padding:48px 24px}` → `.sheet` (white, r7, shadow `0 2px 10px rgba(20,20,19,.12)`); paginated pages get `aspect-ratio 8.5/11`, `overflow:hidden`, r7, shadow `0 2px 10px rgba(0,0,0,.25)`, `margin-top:1rem` (port overrides to 96 px).
- Print: injects `@page{size:8.5in 11in; margin:0}`, `break-before:page` per page, kills radii/shadows/filters/animations, `text-wrap: balance` on headings and `pretty` on paragraphs.

**`<image-slot>`** (65 KB)
- Attributes: `id` (persistence key), `shape` = `rect|rounded|circle|pill` (default rounded, `radius` 12), `mask`, `fit` = `cover|contain`, `placeholder`, `src`, `credit`, `credit-href`.
- `:host{display:block; width:100%; height:100%; aspect-ratio:3/2}` — fills its wrapper.
- Editor-only features (drop, pan/zoom, `#c96442` corner handles, `.image-slots.state.json` persistence via `window.omelette.writeFile`) are inert outside Claude Design; the port just shows `src`.

---

# Part 7 — Drift, gaps and recommendations

Everything below was observed in the files; nothing is speculative. Items are grouped by the decision a designer would need to make. Severity: 🔴 affects what a prospect sees · 🟠 inconsistency a redesign should resolve · 🟡 housekeeping.

## 7.1 Content / claims

1. 🔴 **Unsourced headline numbers are still live.** The Validation Library (both `.dc.html` and the static port), every generic Why-We-Won stats row, and the brand token reference's sample stat callout show **30% savings · 95% processing time · 40% on-time · 15% audit**. The internal audit grades "Up to 30% freight spend reduction" and "40% increase in on-time deliveries" as **Do not use** ("No source exists… Do not reintroduce"), and the ROI Plan lists "Strip the two unsourced numbers" as gap #1. Before any redesign of the stats strip or WWW stats row, get the four numbers re-confirmed or replaced (the ROI Plan proposes ranges: 5–15% rate shopping, 1–3% audit recovery).
2. 🔴 **Deck → library deep-links break for four modules.** `LIB_TAG_MAP` sends "Inbound Order Management" → "Third-Party & Inbound", "Order Management and Intake" → "Order Intake", "Product Detail & Auto Pack" → "Auto Pack", "Address Validator & Accessorials" → "Address & Accessorial Checks", but the library's `FEATURE_GROUPS` uses the module names verbatim. Those Validation steps open an unfiltered library. Fix: delete the four remaps.
3. 🔴 **OMS 01–04 Problem step is heading-only.** `problem.heading` carries a 25–40-word paragraph and `problem.body` is empty, so the step renders one long h3 (27–38 px) and nothing else. Either split into heading + body like the other 25 modules, or design a "long-heading" variant.
4. 🟠 **Jump-to menu says "7 common customer flows"; there are 8** (the Workflows page itself computes "Eight").
5. 🟠 **Three library feature tags have zero items** (Pooling & Cross-Dock, Driver App & POD, License Plating, Lot, and Serialization) — those modules' Validation step shows an empty board. Either source proof or hide the tag.
6. 🟠 **Attribution conflict:** the library credits "Christian Mannino, Director of Logistics" to Kyocera on the case-study item and to **Elgen Manufacturing** on a review item. One is wrong.
7. 🟠 **Automotive case study claims 3% audit savings** vs the 15% used everywhere else; Automobile Manufacturer WWW uses 15% shipping-cost / 5% audit. Decide whether per-customer figures override the generic row (they should) and remove the generic row where a real figure exists.
8. 🟡 `meta` strings in library data are internal notes ("hold the 2026 mention until the list publishes", "Confirm type and current period before sharing externally") and render on screen. Decide whether `meta` is public copy.
9. 🟡 Typo "Schedules Pickups" in OmsConsolidationDemo dashboard drawer. Caption numbering errors: SpotQuote (08→07), DriverPod (two 09), WmsReceiving (two 13), MultiLeg (no 08), OmsThirdParty (03→07).

## 7.2 Colour system

10. 🟠 **Three colour systems coexist** and only partially agree with the brand token reference:
    - *Deck (dark)*: navy `#051729` / raised `#0A2540` / hover `#0E3153`, teal `#3DD6B5`, blue `#4088CF`, text `#B5CDE0` / `#7A96B0` — **matches** the token sheet's dark tokens, but adds ~15 undeclared tints (`#7E97AC`, `#8FA9C0`, `#5E7C96`, `#3D5670`-as-separator, `#D7E5F0`, `#9DB6CC`, `#7FB6E8`, `#E8B54A`, `#5FE0C4`, `#0E3153`, `#02101D`, `#1A3A55`).
    - *Library*: page `#04121F` (darker than navy-900), plus `#0A1F33`, `#071E31`, `#08243B`, and text tints `#EAF3F9 #E6F0F7 #DCEAF4 #C3D5E3 #B9CBD9 #A8BECF #9DB6CC #8FA9C0`, star gold `#F2B441`, sky `#7FB6E8`. None are in the token sheet.
    - *Demos*: product blue `#4088CF` (correct) but a second blue `#2C6DB5` in the OMS family, and 400+ distinct hexes overall.
    - *ai-clips*: an entirely different product palette (`#1B2A4E`, `#1976D2`, `#EEF1F5`).
    - *Workflow players*: blue `#4c8dde` / `#2d6cc0`, not `#4088CF`.
    **Recommendation:** adopt §3.1 as the single token sheet, mapping each stray hex to the nearest token; the library's `#04121F` should become `#051729` unless a deliberate "deeper" surface is added to the system.
11. 🟠 **Near-duplicate greys:** `#7A96B0` (deck tertiary) vs `#7E97AC` (deck pill idle) vs `#7A93AC` (sheet muted) — three values doing one job. Likewise `#3D5670` is a breadcrumb *separator* in the deck and *body text* on the sheets.
12. 🟠 **Evidence-grade colours are swapped between the deck and the internal audit:** deck Platform = blue `#7FB6E8`, Modeled = grey `#9DB6CC`; audit Baseline = blue `#7FB6E8`, Platform = grey `#9DB6CC`. Pick one mapping (and one vocabulary — "Modeled" vs "Baseline").
13. 🟡 `#3DD6B5` teal appears inside the product UI in AiAuditingDemo's panel border — the only place demo content (not overlay) uses the brand accent. Product blue would be correct.

## 7.3 Typography

14. 🟠 **Eyebrow/overline font disagrees with the token sheet:** the deck, sheets and library use **DM Mono** for every overline; the brand reference specifies **DM Sans 500 11px .08em**. Decide which is canonical — DM Mono is the more distinctive choice and is used ~150 times.
15. 🟠 **Heading weight:** deck h1s are Manrope **400**, matching the token sheet; but card titles/h3 are 500 (also matching). The library uses Manrope **700** for headings and stat numbers — off-system. Sheets load Manrope/DM Sans 700 and never use them.
16. 🟡 The deck vendors Manrope 400/600 only but uses weight 500 extensively (the variable font covers it); the sheets' Google Fonts request 400/500/700. Align the requested weights to 300/400/500 everywhere.
17. 🟡 Only the Problem step uses viewport-relative type (`clamp(27px, 5.1vh, 38px)`); every other step is fixed px. Either make all steps fluid or none.

## 7.4 Layout / chrome (deck)

18. 🟠 **Onboarding is the only pillar page on `#0A2540`**; every other pillar is `#051729`. Feature pages alternate. Decide whether alternation is a deliberate rhythm (then apply it to pillars too) or drop it.
19. 🟠 **Static layers vs React sections.** Intro, ERP guide and Carrier guide are plain DOM polled every 250 ms for visibility. Visually fine, but they cannot use `style-hover`, `sc-for`, or the deck's reveal animations, and they hard-code `top:53px`. Any nav-height change breaks three screens.
20. 🟠 The Interactive Walkthrough hotspots are drag/resize-capable in code but only `onclick` is bound in the template; hotspot geometry is in `localStorage` (`fpWtHotspots_v7`) so it differs per machine.
21. 🟡 Two runtimes ship: `support.js` (used by all sibling `.dc.html`) and `extracted/2f9f3ff0….js` (an older dc-runtime build loaded by the deck). Consolidate to one.
22. 🟡 Rive fallback paths `assets/fp_hero-background.riv` and `assets/rive.wasm` don't exist in `assets/` (the static intro loads from HubSpot; the bundle has them as blobs). Offline the intro orb is blank.

## 7.5 Cooking demos

23. 🔴 **Fidelity-rule violations (CLAUDE.md):** invented side panels exist in OmsProductDetail (`QUOTE READINESS RAIL`), WmsPicking (`TMS HANDOFF RAIL`), BinTransfer (`LEDGER RAIL`), Accessorial ("why these fired"), TrackNotify (`Notifications Fired`), InvoiceAudit (`WHY THIS FLAGGED`), AutoDispatch (`How it runs`). OrderHandoff and the OmsSalesOrder opener are marketing slides, not app screens. These should be removed or moved to the deck's Benefit step.
24. 🔴 **Six top-nav generations** (§4.4): heights 44/52/56, five navy values, round vs square search, AI BETA present in 23 / absent in 20, differing tab sets. Pick the current production chrome (screenshot it) and rebuild all 41 navs to it.
25. 🔴 **Three WMS chromes**: WMS-as-a-TMS-tab (D), standalone WMS header (E), "Powered by FreightPOP" (F). Superseded pairs remain: BinTransfer/WmsBinTransfer, CycleCount/WmsCycleCount, WmsPicking/WmsOrderPicking, WmsInventory/WmsAdjustment — and the deck mounts the **older** one in three of four cases.
26. 🟠 **Page background** varies across 10 values (`#E9EEF5` majority); **page-title ink** across three (`#14263C`, `#1A1A1A`, `#1B2B3D`); **title size** 19/20/22.
27. 🟠 **Canvas geometry outliers:** RouteOpt canvas 1440×870 in a 1440/810 wrapper (bottom 60 px clipped); MultiLeg wrapper 1440/872; DriverPod 1020×580 canvas and no `autoPlay`. All should be 1440×810.
28. 🟠 **Caption strip bottom offset** varies 24–78 px (64 in 19 files) and collides with different bottom bars. Standardise.
29. 🟠 **Reference document is stale** (July 28; 35 demos, ~14 rebuilt since; describes a "circular arrow to replay" and "Expand" that aren't in the demos). Regenerate it from this Part 4, or retire it.
30. 🟡 10 orphaned demos (§4.5). Decide per demo: wire (UsersRoles, AutoDispatch, OmsHazmat, ReturnsPortal have no module today), replace the older twin (WmsCycleCount, WmsBinTransfer, WmsOrderPicking, WmsAdjustment), or delete.
31. 🟡 Keyframe-name prefixes (`rs*`, `sr*`, `om*`, `oc*`, `ib*`, `ap*`, `dp*`, `oh*`) for identical animations — harmless, but a shared stylesheet would remove ~2,000 lines.

## 7.6 Sheets

32. 🟠 **Why-We-Won hero geometry is inconsistent:** fixed `2.65in` + `1.62fr 1fr` on 9 sheets; `2.6in` + `1.95fr` on Alley-Cassetty; **no height** on 6 (Associated Packaging, Winholt, Automobile Manufacturer, Beaumont Juice, Clean Simple Eats, DP Wagner); H1 40–64 px; two logo placements (absolute vs header-with-chips). Define one master with variants for "has chips" and "has quote".
33. 🟠 Item rows: fixed `repeat(3,135px); gap 20px` vs fluid `repeat(3|4,1fr); gap 14px`; Sunbelt mixes 4×98 px challenges with 3×135 px wins; Uneekor 3 challenges vs 4 wins. Stat dividers `border-left` (most) vs `border-right` (Alley, Uneekor). Generic stat captions differ by a word ("processing time" vs "shipment processing time").
34. 🟠 Case-study covers: photo band 320/330/340 px; H1 58–86 px; Uneekor uses `background-image` not `<image-slot>`; Automotive p.04 drops the grid texture; challenge presentation is a list in 2 studies and a Before/With table in 6; running-header names are inconsistently shortened ("Kyocera KDA", "Citrus Co-Op", "4Wall").
35. 🟡 Kyocera and Newegg p.02 style an `<h3>` at 42 px identical to the H2 — heading-level ambiguity.

## 7.7 Static port vs design source

36. 🟡 Port is content-identical (16-line wrapper diff per sheet + the 96 px page-gap rule). Differences: hover states moved from `style-hover` attributes to `.vl-hv-*` classes (intent-equivalent, not pixel-verified); dormant flip-card view dropped; `MAX_H=320`, `suf:"on average"`, `GENERIC_FIGURES` dead code dropped. Opening a sheet `.html` directly shows the `<doc-page>` desk (`#f5f5f4`, 48/24 px padding). "Back to deck" 404s standalone (points to a file only in the parent folder).

## 7.8 Recommended sequence for a designer

1. **Lock the token sheet** (§3.1–3.3 + §3.8 reconciled): one navy scale (add `#04121F` only if intentional), one grey scale (collapse the three ~`#7A96B0`s), the two teals, one blue, the four evidence colours, the sheet reds. Publish as Figma variables + a CSS `:root`.
2. **Rebuild the deck-side component library** in Figma from §3.5 (34 components) — module card, step rail, evidence pill, proof card, timeline node, filter pill, logo tile, floating pill — with the states listed.
3. **Screenshot the live product** (Quote/Ship, Order Management, Track, WMS Receipts, Carrier Management, Settings) and define **one** app-chrome master for the demos (nav, title bar, card, grid, modal, buttons). Then rebuild the 43 demos' chrome to it and delete the invented rails.
4. **Design the four content fixes** that need a layout decision: OMS long-heading Problem step; empty-board state for tag-less modules; stats strip with confirmed numbers; `meta` visibility.
5. **Normalise the sheets**: one WWW master (hero height, grid, logo placement, stats dividers), one CS cover (photo band, H1 size), consistent challenge presentation.
6. **Retire or regenerate** the Cooking Demo Reference from Part 4; resolve the 10 orphan demos; align the library evidence vocabulary with the deck.
7. Only then: any visual refresh (motion, gradients, type) — applied to tokens, not inline strings.

---

# Appendices

## Appendix A — Complete file inventory (top level, `.dc.html`)

| Size (bytes) | File | Layer |
|---|---|---|
| 48,909 | `AccessorialDemo.dc.html` | TMS demo (layer 2) |
| 43,739 | `AiAccessorialAgentDemo.dc.html` | AI demo (layer 2) |
| 21,763 | `AiAuditingDemo.dc.html` | AI demo (layer 2) |
| 29,594 | `AiAutoConsolidationDemo.dc.html` | AI demo (layer 2) |
| 29,176 | `AiCopilotDemo.dc.html` | AI demo (layer 2) |
| 22,822 | `AutoDispatchDemo.dc.html` | TMS demo (layer 2) |
| 54,221 | `AutoPackDemo.dc.html` | OMS demo (layer 2) |
| 40,870 | `BatchShipDemo.dc.html` | TMS demo (layer 2) |
| 19,478 | `BinTransferDemo.dc.html` | WMS demo (layer 2) |
| 23,046 | `CarrierMgmtDemo.dc.html` | TMS demo (layer 2) |
| 24,951 | `Case Study - 4Wall Entertainment.dc.html` | Case study sheet (layer 3) |
| 31,071 | `Case Study - Automotive Manufacturer.dc.html` | Case study sheet (layer 3) |
| 28,572 | `Case Study - Citrus Co-Op.dc.html` | Case study sheet (layer 3) |
| 34,958 | `Case Study - Kyocera.dc.html` | Case study sheet (layer 3) |
| 35,271 | `Case Study - Miami Beef.dc.html` | Case study sheet (layer 3) |
| 34,997 | `Case Study - Newegg.dc.html` | Case study sheet (layer 3) |
| 30,456 | `Case Study - Once Upon a Farm.dc.html` | Case study sheet (layer 3) |
| 25,340 | `Case Study - Uneekor.dc.html` | Case study sheet (layer 3) |
| 40,672 | `ConsolidationDemo.dc.html` | TMS demo (layer 2) |
| 37,153 | `Cooking Demo Reference.dc.html` | Internal document |
| 20,227 | `CycleCountDemo.dc.html` | WMS demo (layer 2) |
| 46,766 | `DockSchedDemo.dc.html` | TMS demo (layer 2) |
| 27,941 | `DocsBolDemo.dc.html` | TMS demo (layer 2) |
| 42,671 | `DriverPodDemo.dc.html` | TMS demo (layer 2) |
| 45,282 | `FleetDispatchDemo.dc.html` | TMS demo (layer 2) |
| 223,247 | `FreightPOP TMS Sales Deck v17.dc.html` | Deck (layer 1) |
| 22,749 | `InvoiceAuditDemo.dc.html` | TMS demo (layer 2) |
| 37,308 | `LicensePlateDemo.dc.html` | WMS demo (layer 2) |
| 51,382 | `MultiLegDemo.dc.html` | TMS demo (layer 2) |
| 56,652 | `OmsConsolidationDemo.dc.html` | OMS demo (layer 2) |
| 23,632 | `OmsHazmatDemo.dc.html` | OMS demo (layer 2) |
| 23,052 | `OmsOrderMgmtDemo.dc.html` | OMS demo (layer 2) |
| 19,449 | `OmsProductDetailDemo.dc.html` | OMS demo (layer 2) |
| 35,216 | `OmsSalesOrderDemo.dc.html` | OMS demo (layer 2) |
| 48,275 | `OmsThirdPartyDemo.dc.html` | OMS demo (layer 2) |
| 14,597 | `OrderHandoffDemo.dc.html` | OMS demo (layer 2) |
| 27,677 | `ParcelDemo.dc.html` | TMS demo (layer 2) |
| 35,888 | `PoolingDemo.dc.html` | TMS demo (layer 2) |
| 54,642 | `RateShopDemo.dc.html` | TMS demo (layer 2) |
| 21,181 | `ReportsDemo.dc.html` | TMS demo (layer 2) |
| 18,220 | `ReturnsPortalDemo.dc.html` | OMS demo (layer 2) |
| 62,353 | `RouteOptDemo.dc.html` | TMS demo (layer 2) |
| 38,713 | `ShippingRulesDemo.dc.html` | TMS demo (layer 2) |
| 147,953 | `SpotQuoteDemo.dc.html` | TMS demo (layer 2) |
| 21,496 | `TrackNotifyDemo.dc.html` | TMS demo (layer 2) |
| 8,778 | `Transition Preview.dc.html` | Motion study |
| 30,721 | `UsersRolesDemo.dc.html` | TMS demo (layer 2) |
| 32,903 | `Validation & ROI Plan.dc.html` | Internal document |
| 26,009 | `Validation Library (internal audit).dc.html` | Internal tool |
| 109,927 | `Validation Library.dc.html` | Proof browser (layer 3) |
| 18,469 | `Why We Won - Alley-Cassetty Brick.dc.html` | Why We Won sheet (layer 3) |
| 15,936 | `Why We Won - Associated Packaging.dc.html` | Why We Won sheet (layer 3) |
| 17,671 | `Why We Won - Automobile Manufacturer.dc.html` | Why We Won sheet (layer 3) |
| 15,661 | `Why We Won - Beaumont Juice.dc.html` | Why We Won sheet (layer 3) |
| 15,435 | `Why We Won - Clean Simple Eats.dc.html` | Why We Won sheet (layer 3) |
| 15,550 | `Why We Won - DP Wagner.dc.html` | Why We Won sheet (layer 3) |
| 15,604 | `Why We Won - Flair Packaging.dc.html` | Why We Won sheet (layer 3) |
| 15,506 | `Why We Won - Mark Andy.dc.html` | Why We Won sheet (layer 3) |
| 15,501 | `Why We Won - Once Upon a Farm.dc.html` | Why We Won sheet (layer 3) |
| 15,533 | `Why We Won - Pyramex.dc.html` | Why We Won sheet (layer 3) |
| 15,546 | `Why We Won - Sonco Worldwide.dc.html` | Why We Won sheet (layer 3) |
| 16,347 | `Why We Won - Sunbelt Solomon.dc.html` | Why We Won sheet (layer 3) |
| 15,467 | `Why We Won - Sunkist Growers.dc.html` | Why We Won sheet (layer 3) |
| 16,428 | `Why We Won - Uneekor.dc.html` | Why We Won sheet (layer 3) |
| 16,106 | `Why We Won - Winholt.dc.html` | Why We Won sheet (layer 3) |
| 36,974 | `WmsAdjustmentDemo.dc.html` | WMS demo (layer 2) |
| 48,437 | `WmsBinTransferDemo.dc.html` | WMS demo (layer 2) |
| 39,223 | `WmsCycleCountDemo.dc.html` | WMS demo (layer 2) |
| 20,314 | `WmsInventoryDemo.dc.html` | WMS demo (layer 2) |
| 55,430 | `WmsOrderPickingDemo.dc.html` | WMS demo (layer 2) |
| 22,351 | `WmsPickingDemo.dc.html` | WMS demo (layer 2) |
| 48,898 | `WmsReceivingDemo.dc.html` | WMS demo (layer 2) |

Supporting files: `support.js` (dc-runtime, 1,841 lines) · `doc-page.js` (757) · `image-slot.js` (1,225) · `deck_bundle.html` (180 lines, 3.96 MB self-extracting v16 export) · `CLAUDE.md` · `notes/wms-lp-lot-serial-reference.md`, `notes/wms-call-applied-digital-2026-06-09.md` · `Homepage Hero/` (static port, see Part 6) · `extracted/` (28) · `uploads/` (285) · `ai-clips/` (7 + assets) · `assets/` (4 + cs/24 + wwy/47) · `screenshots/` (28) · `scraps/` (~20).

## Appendix B — Every external host referenced

| Host | Used by | Purpose |
|---|---|---|
| `fonts.googleapis.com` / `fonts.gstatic.com` | sheets, library, demos, port | Manrope, DM Sans, DM Mono, Inter Tight (ROI Plan), Roboto Mono (ai-clips), Saira/Montserrat (DriverPod, unused) |
| `unpkg.com` | dc-runtime, ai-clips | React 18.3.1, ReactDOM 18.3.1, @babel/standalone 7.29.0 |
| `app.freightpop.com` | deck | 39 deep links: `/app/#/quote-ship`, `#/order-management`, `#/carrier-management`, `#/route-optimization`, `#/wms`, `#/company/rules?tab=shipping-approval-rule` |
| `www.freightpop.com` | library | `hs-fs/hubfs/Inc.%20In%20the%20News%20Logo.png`; marketing site |
| `info.freightpop.com` | deck intro | `fp_hero-background.riv` (HubSpot-hosted Rive file) |
| `freightpopsales.com` | deck | `/freightpop-intake-form?link=MGER4f9Y` (ROI) |
| `tubular-flan-14267b.netlify.app` | deck | Interactive Walkthrough (`startUrl`, v17) |
| `willowy-chimera-d486b0.netlify.app` | v16 bundle, `scraps/wt-probe.html` | previous walkthrough |
| `idyllic-elf-b22a7e.netlify.app` | deck | Main Menu platform graphic |
| `genuine-conkies-86b264.netlify.app` | deck | FreightPOP AI (`aiUrl`) |
| `logo.clearbit.com` | deck | carrier / integration logos |
| `www.google.com/s2/favicons` | deck | logo fallback |
| `fathom.video` | notes | WMS call recording 703092733 |
| `unsplash.com` | image-slot.js | credit link (editor only) |

## Appendix C — Colour frequency tables (raw)

### C.1 Deck (`FreightPOP TMS Sales Deck v17.dc.html`)
```
  84 #3DD6B5
  33 #051729
  31 #B5CDE0
  27 #7A96B0
  15 #FFFFFF
  11 #0A2540
   7 #4088CF
   4 #7E97AC
   3 #0E3153
   2 #5E7C96
   2 #3D5670
   1 #E8B54A
   1 #D7E5F0
   1 #9DB6CC
   1 #8FA9C0
   1 #7FB6E8
   1 #5FE0C4
   1 #1A3A55
   1 #0A0A0A
   1 #02101D
```

### C.2 All 43 cooking demos (top 50)
```
 995 #4088CF
 684 #5E7186
 583 #3DD6B5
 579 #24354A
 487 #8A97A8
 283 #C6D0DC
 277 #E1E7EF
 203 #3A4B60
 186 #DDE4EC
 173 #B9CDE8
 162 #9AA7B8
 139 #2C6DB5
 129 #2A3B50
 120 #3C4B5C
 114 #EDF1F6
 104 #E3E9F0
  93 #7A8798
  91 #1B2B3D
  90 #E4E9EF
  89 #4A5B70
  89 #33465C
  86 #8FE8D4
  82 #B57A13
  79 #F3F6FA
  76 #14263C
  73 #0B1A2E
  68 #3B9E4E
  57 #EAF3FF
  56 #2E5E33
  55 #0A2540
  53 #F7F9FB
  50 #051729
  46 #C7D3E0
  39 #6D7C8C
  37 #93A2B4
  33 #FAFBFD
  31 #1557B0
  31 #0F8A6D
  29 #E7F4E4
  26 #C0392B
  24 #F5F7FA
  23 #DCE6F1
  21 #E9EEF5
  21 #C9D4E0
  21 #C3D8F3
  21 #B9C3CF
  21 #1A2634
  20 #9A6B12
  19 #EDEDED
  18 #B5CDE0
```

### C.3 All 23 sheets
```
 464 #FFFFFF
 316 #3D5670
 297 #0F7B6C
 169 #051729
 142 #D0DCE8
 122 #F0F8F6
 121 #E2EAF3
 114 #F1F6FB
 104 #D32F2F
  91 #3DD6B5
  89 #B5CDE0
  83 #7A93AC
  82 #F0BFC4
  79 #9FE0CE
  53 #EAF7F3
  53 #3AC7A8
  52 #FDEFF1
  52 #16324C
  23 #0A5C51
  16 #FBFDFE
  16 #F4F8FC
  16 #F3FAF8
  11 #C8DAE9
```

### C.4 Most frequent rgba() in the demos
```
 113 rgba(5,23,41,.86)      caption + transport scrim
  83 rgba(16,42,67,.10)     card shadow
  43 rgba(61,214,181,.12)   frame glow
  43 rgba(255,255,255,.16)  frame border
  41 rgba(5,20,40,.45)      cursor drop-shadow
  39 rgba(5,23,41,.16)      progress track
  17 rgba(5,20,40,.4)       modal shadow
  14 rgba(10,25,45,.45)
   7 rgba(64,136,207,.35)   FAB shadow
```

## Appendix D — dc-runtime (`support.js`) reference for developers

`support.js` is a generated bundle ("GENERATED from dc-runtime/src/*.ts — Rebuild with `cd dc-runtime && bun run build`"). It turns a `.dc.html` into a live React app at load time; there is no build step for the design files.

**Boot:** injects `x-dc{display:none!important}` → loads React/ReactDOM 18.3.1 from unpkg (or from `window.__resources` blobs in bundle mode; Babel 7.29 lazily for `.jsx` imports) → `parseDcDocument` takes `<x-dc>.innerHTML` as template, `script[data-dc-script]` as logic + `data-props` → replaces `<x-dc>` with `<div id="dc-root">` → compiles the template, `new Function("DCLogic","StreamableLogic","React", src)` the logic → renders. Without `$preview` in data-props it adds `html,body{height:100%}#dc-root{height:100%}` (full-page mode). `dcNameFromPath` = last URL segment minus `.dc.html`/`.html` → the component name and sibling-fetch key.

**Template language:** `{{ expr }}` (dotted/bracket paths, literals, `!x`, `==/!=/===/!==` only — *not* JS; values from `renderVals()` merged over props; whole-attribute holes pass raw values so `onclick="{{ fn }}"` passes a function) · `style="…"` → React style object; `class`→`className`, `for`→`htmlFor`; ~40 `on*` events mapped · `<sc-for list as hint-placeholder-count>` (exposes item + `$index`) · `<sc-if value hint-placeholder-val>` · `style-hover` / `style-<pseudo>` → generated `.scpN:hover{…!important}` class · `ref` · `<helmet>` hoisted to `<head>` once; `<meta name="design_doc_mode" content="canvas">` switches to canvas mode · `<x-import component="Name" from="./file.js|.jsx">` or `component-from-global-scope="doc-page"` (custom elements polled 50 ms up to 30 s; `hint-size` placeholder) · `<dc-import name="Sibling">` fetches `./Sibling.dc.html`, mounts it as a child (`dc-props` spreads an object; circular imports error) · `data-screen-label` is **not** a directive — the editor uses it to name artboards · `data-dc-tpl="N"` stamped on every node for editor mapping · tables/selects wrapped as `sc-raw-*` during parse.

**Logic:** `class Component extends DCLogic` — `props`, `state`, `setState`, `forceUpdate`, lifecycle, `renderVals()`. Wrapper is an error boundary (red `.sc-logic-error` pill `#b00020`). Hot-swap preserves state.

**`data-props`:** `$preview {width,height}` = canvas preview size; other keys `{ editor: "text"|"boolean"|"range"…, default, min, max, step, unit, tsType, section }` → properties-panel controls, grouped by `section`.

**Editor bridge:** `window.__dcUpdate(name, "html"|"js"|"props", content, streaming)` (skeleton shimmer while streaming), `__dcRegistry`, `__dcTemplateSource`, `postMessage({type:"__dc_booted"})`.

**Bundle mode:** `window.__resources` / `__resourceBlobs` redirect every fetch to in-memory blobs — how `deck_bundle.html` works offline (manifest of 28 uuid assets, gzip-compressed text inflated via `DecompressionStream`, uuids string-replaced in the template).

**Print:** `@media print { @page{margin:.5cm} … animation-duration:.001s; backdrop-filter:none }` baked in.

## Appendix E — Supporting materials

### E.1 `uploads/` (285 entries)
- **Workflow players** `01-freightpop-outbound.html` … `08-route-optimization.html` (~33 KB each; 1920×1080 self-contained animated explainers; loaded by the deck's Workflows section with `?theme=deck`).
- `03 Rate Shop.html`, `06 Invoice Audit.html` — identical to `ai-clips/rate-shop.html` / `invoice-audit.html`.
- `FreightPOP Brand Token Reference.html` (68 KB) — §3.8.
- `FreightPOP_TMS_Sales_Deck_v16 (2).html` (3.96 MB) — identical to `deck_bundle.html`.
- **Standalone single-file exports** of all 8 case studies (656 KB–2.8 MB) and 15 Why We Won sheets (438 KB–3.8 MB) — bundled `<title>Bundled Page</title>` versions predating the `.dc.html` sources.
- **PDFs:** `Automobile Manufacturer Case Study (3).pdf`, `Elgen Case Study (1).pdf`, `Plastics Manufacturer Case Study (1).pdf`, `Prima Supply Case Study (1).pdf` (6 pp each — the original designed case studies; Elgen/Plastics/Prima have **no** HTML sheet yet but are quoted in the library), `KC-How to Use Volume Calculation for Auto Pack….pdf` (9 pp Confluence print — source for AutoPackDemo).
- `Standard Route Optimization.json` (Lucidchart export, 13 blocks) + `.png` (1392×1181) — source for RouteOptDemo and workflow 08.
- `jam-video.webm` (19.7 MB, 3456×2234) — a Jam screen recording; `rates hopping video.mp4` = `assets/rate-shop-demo.mp4` (1906×858, 28.3 s).
- `New FreightPOP Agent One Pager (1)/` — earlier ai-clips drop with all 8 chapter pages.
- `files (1)/` — 8 product screenshots 866×1644 of the driver-app tracking/POD flow (`01_track-list-in-transit` … `08_track-list-delivered`) — the real-UI reference for DriverPodDemo.
- **223 `pasted-*.png`** reference screenshots of the real app (Jul–Aug 2026; e.g. 2556×1260, 2017×837, 1803×892), 13 `Screenshot 2026-0x-xx *.png`, `6.png`. `pasted-1786739372516-0.png` is the WMS receipt edit screen documented in `notes/`.

### E.2 `ai-clips/`
`rate-shop.html`, `invoice-audit.html` (React 18 + Babel from unpkg; body `#0a0a0a`; DM Sans/Manrope/Roboto Mono), `animations.jsx` (21.9 KB engine: Easing, Sprite, Stage, PlaybackBar), `ui-components.jsx` (13.6 KB product primitives, palette `FP`), `ui-views-v5.jsx` (195 KB, 3,480 lines of screens), `ai-panel-v5.jsx` (14.4 KB chat panel), `scene-v5.jsx` (29 KB, 8 chapters), `clip-standalone.jsx` (3.5 KB), `assets/image-data-urls.js` (1.15 MB: `freightpop-diamond.png`, `freightpop-logo-white.png`, `freightpop-logo-full.png`, `accessorial-satellite.png`). Missing: `assets/pallet-damaged-1/2.png`, `pallet-intact-1/2.png`.

### E.3 `scraps/`
`deck-clean.html` (224 KB — the v16 deck un-bundled with `extracted/` paths; parent of v17) · `wt-probe.html` (iframe embed test) · `uneekor-body.html` (WWW Uneekor body fragment) · `cs/automotive.html`, `csbody/automotive.html`, `csimg/automotive.webp` (1200×900) · `autopack-2-0.png` … `autopack-6-5.png` (figures from the Auto Pack PDF) · `cs-auto/elgen/plastics/prima.pdf` (copies of the uploads PDFs).

### E.4 `extracted/` (28 — the deck bundle's manifest, unpacked)
- JS: `2f9f3ff0-….js` (60 KB, older dc-runtime), `d4de3b32-….js` (301 KB, Rive runtime).
- Extensionless: `48fd743f-…` (33 KB, `.riv` — artboards "SuperParticleRing", "math", "noise"), `e600d573-…` (2.26 MB, Rive wasm).
- Fonts (12 woff2): DM Mono 400/500 (latin, latin-ext); DM Sans variable 300–600 (latin, latin-ext); Manrope variable 400–600 (latin, latin-ext, cyrillic, cyrillic-ext, greek, vietnamese).
- Images (12 PNG): `25e71771-…` 257×50 FreightPOP wordmark (nav); 11 marquee logos (`b9b698cf` 3840×2160, `6ad711cc` 960×290, `ed1eaf9d` 900×190, `d7342358` 512×231, `951316e5` 1442×165, `146f2300` 1432×532, `f9a1aeb1` 1646×305, `f077e63e` 2560×1026, `e796ecf7` 1488×452, `44b10122` 1280×322, `9577c1e1` 1024×1024 full-colour badge shown at 80 px with `filter:none`).

### E.5 `assets/`
`av-map-from.png`, `av-map-to.png` (460×210 — Address Validator maps) · `pod-photo.png` (1448×1086 — DriverPod) · `rate-shop-demo.mp4` (1906×858, 28.3 s) · `cs/` 8 hero JPGs (1000×750; Kyocera 1000×563), 8 `page-*.jpg` + 8 `shot-*.png` at 408×528 · `wwy/` 15 hero JPGs (678×452 → 900×1200), 15 `page-*.jpg`, 15 `shot-*.png`, `freightpop-logo.png` 257×50.

### E.6 `screenshots/` (28, Aug 25)
QA captures **of the demos themselves** (caption strip visible), not of the real app: `01/02/03-fleet-new`, `01/02-fleet-cal*`, `fleet-drag*`, `track-icons*` → FleetDispatchDemo · `ro-menu*`, `ro-map` → RouteOptDemo · `01/02/03-d`, `mc` → SpotQuoteDemo · `intake` → OmsSalesOrderDemo (headline overlaps the card column in this capture) · `slip`, `01/02-slip2` → WmsOrderPickingDemo.

### E.7 `notes/`
`wms-lp-lot-serial-reference.md` — distilled Applied Digital WMS call (Robert Buntin, Jun 9 2026, Fathom 703092733): license plating (up to 50,000 serialized micro-inverters per shipment, ~10,000 per pallet, one-scan moves, PO/job naming, reprint from receiving), lot tracking (inline at receipt; Inventory view shows lot + LP + location), serialization (NetSuite forces per-touch serial scans; irreversible once on), RMA receiving (same screen as PO and transfer receipt), Save / Submit / Post semantics, photos (~10 per transaction). Includes the reference-screen spec for `app.freightpop.com/app/#/wms/receipts/1734/edit`. `wms-call-applied-digital-2026-06-09.md` — pointer record. Pending: serialization screen and RMA entry-point screenshots.

---

*End of document.*
