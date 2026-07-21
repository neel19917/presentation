# FreightPOP LocalDemo

A local, offline presentation framework for tradeshows. Any HTML file becomes a
slide; a **Presenter view** on your laptop drives an **Audience view** on the
external monitor, PowerPoint-style — but every slide is real HTML, so slides can
be fully interactive product demos.

Works on **Mac and Windows**. Needs no internet at the booth.

## Start it

### Brand-new computer, nothing installed → use the installer

| OS | Do this |
|---|---|
| Mac | double-click **`install-mac.command`** |
| Windows | double-click **`install-windows.bat`** |

These work on a **fresh Mac or Windows PC with nothing installed** — no Node, no
Homebrew, no admin password. If Node.js isn't already on the machine, the
installer downloads a **private, self-contained copy of Node** into a local
`.node/` folder (using tools that already ship with the OS: `curl`/`tar` on Mac,
PowerShell on Windows) and runs the demo from there. Nothing touches the system;
delete the LocalDemo folder and it's all gone. First run needs internet for the
one-time ~40 MB Node download; every run after that is fully offline and instant.

### Already have Node → just launch

| OS | Do this |
|---|---|
| Mac | double-click **`start-mac.command`** |
| Windows | double-click **`start-windows.bat`** |
| Any terminal | `node server.js` |

The launcher opens at `http://localhost:8123` (if 8123 is busy it walks up to the
next free port).

> **Mac first run:** if Gatekeeper blocks the `.command` file, right-click →
> Open → Open. If it says "permission denied", run
> `chmod +x start-mac.command` once.

## Tradeshow setup (2 screens)

1. Plug in the monitor. Set it to **Extended display**, not mirrored
   (Mac: System Settings → Displays. Windows: Win+P → Extend).
2. Open **Presenter view** — keep it on the laptop screen.
3. Click **“Open audience window”** in the top bar.
4. Drag the audience window onto the big screen, click it once, press **F**
   (or double-click) for fullscreen.
5. Present from the laptop. Both windows stay in sync automatically —
   whichever window has focus, the arrow keys work.

## Controls

| Key | Action |
|---|---|
| `→` `↓` `Space` `PgDn` | next (advances build steps first) |
| `←` `↑` `PgUp` | back |
| `Home` / `End` | first / last slide |
| `B` or `.` | blackout the audience screen (great between visitors) |
| `G` | slide grid — click any slide to jump (presenter) |
| `F` | fullscreen (audience window) |
| `T` | reset timer (presenter) |

The presenter console shows: current slide, next slide / next build step,
speaker notes (A+/A− to resize), an elapsed timer (auto-starts on your first
advance), and the wall clock.

## Build your deck — the 10x version

Everything lives in **`deck/`**:

```
deck/
  manifest.js       ← THE deck definition: order, titles, sections, notes
  theme.css         ← FreightPOP brand styles shared by slides
  slide-runtime.js  ← build steps + key forwarding (include in every slide)
  slides/           ← one HTML file per slide
```

### Add a slide

1. Drop `my-slide.html` into `deck/slides/` (copy an existing slide as a template).
2. Add one entry to the `slides` array in `deck/manifest.js`:

```js
{
  file: 'slides/my-slide.html',
  title: 'My Slide',
  section: 'Product',      // groups slides in the G overview
  notes: 'What to say.\nSecond line.',
},
```

Array order = presentation order. Refresh the browser — no rebuild step.

### Slide rules

- Design at **1920×1080** (the framework scales it to any screen).
- Link `../theme.css` and include `<script src="../slide-runtime.js"></script>`
  at the end of `<body>`.
- **Build steps:** add `data-step="1"`, `data-step="2"`, … to any elements.
  They start hidden and reveal on each `→`. Same number = appear together.

### Fully-synced interactive decks (`sync: 'dc'` — the current TMS deck)

`Presentation/TMSDeck-072026.html` is a self-navigating HTML app ("bundled
page" export). Its manifest entry has `keys: 'relay'` + `fit: 'native'` +
`sync: 'dc'`, which turns on deep sync via a bridge the server injects into
the deck **in memory** (the file on disk is never modified):

- **Everything mirrors, both directions**: hotspot clicks, key presses, screen
  changes, module/step navigation, search typing (carrier/ERP guides filter
  live on both screens) and scrolling. Click in the presenter preview or on
  the big screen — the other side follows.
- **G grid extracts the deck's internals**: all 8 deck screens plus every
  module of TMS/WMS/OMS with per-step chips (Problem / Benefit / Live Demo /
  Validation). Clicking jumps BOTH screens straight there.
- **A** (or the **↻ Replay anim** button) replays the current screen's reveal
  animations on both screens — great when a new visitor walks up mid-module.
- **R** hard-restarts both copies at the intro.
- The footer status line always shows where the deck is
  (e.g. "Transportation Management · 03 Rate Shopping · Validation (4/4)").
- The preview starts **live** (clicks are safe — they sync). The
  "Preview: live/locked" button can still lock it.
- Known limits: the "Interactive Walkthrough" screen embeds an external site —
  interactions *inside that embed* can't sync (cross-origin), and it needs
  internet. Hover-only effects don't mirror (nothing to replay).

For app-style decks **without** the bundler structure, use `keys: 'relay'`
alone: arrow keys are relayed to both copies in lockstep, mouse is per-window,
R resyncs.

### Interactive / live demo slides

Any slide can be a working app — a calculator, a clickable product mock, a video.

- **Local HTML app:** put it in `deck/slides/`, set `fit: 'native'` in its
  manifest entry so it fills the screen at natural size (skips 1920×1080 scaling).
- **Live URL:** use `url: 'https://…'` instead of `file:` (needs internet, and
  some sites refuse to be iframed — test before the show).
- Mouse/typing inside a demo slide works normally; arrow keys still navigate
  the deck unless you're typing in a text field.

### Speaker notes, sections, theme

- Notes support `\n` line breaks and show only on the presenter screen.
- `section:` labels group the grid overview — use them liberally in a big deck
  (e.g. Intro / Platform / TMS / WMS / Integrations / Pricing / Demo / Close).
- Rebrand or restyle everything in one place: `deck/theme.css`.

## Shipping Workflows (animated flow diagrams)

The deck has a **Standard Shipping Workflows** screen (main menu + presenter G grid) — a card grid of 7 flows that each open an **explainer-style video** (same engine/look as the route-optimization video — FreightPOP dashboard mockup, phase pipeline, animated step captions, chapters = phases, control bar, presenter sync, auto-pause, white/dark theme).

- Edit definitions in `tools/workflows/definitions/*.json` (phases/steps/branches/colors), then `npm run workflows` injects each into `tools/workflows/explainer-template.html` → `modules/workflows/*.html`.
- Edit card names/taglines/order in `src-deck/content/workflows.json`, then `node tools/bundle.js --activate`.
- `npm run workflows` cross-checks that every card slug has a diagram (fails otherwise).

## Modularize → iterate → rebuild (the deck pipeline)

The bundled deck is not a dead end — it round-trips through an editable
source tree:

```
npm run unbundle          # Presentation/TMSDeck-072026.html → src-deck/
# …edit src-deck/ (see the table below)…
npm run bundle            # src-deck/ → Presentation/TMSDeck-dev.html (bridge baked in)
npm run bundle -- --activate   # …and point deck/manifest.js at the new build
```

| Edit | To change |
|---|---|
| `src-deck/content/features-tms.json` (+ wms/oms) | Every module's name & Problem/Benefit/Demo/ROI copy — **no code** |
| `src-deck/content/sys-data.json`, `step-names.json`, `placeholders.json` | Hub descriptions, step labels, placeholder screens |
| `src-deck/template.html` | Markup, styles, screens, hotspots |
| `src-deck/logic.js` | Navigation / state machine |
| `src-deck/assets/*` | Images, Rive animation, fonts — swap a file, keep its name |

Builds embed the sync bridge, so they work on any static host, not just this
server. `BRANDING.md` (the FreightPOP brand design system — colors, type,
spacing) is included here and in every packaged kit — follow it for any new
screens or slides.

## Deploy to Netlify (hosted)

`npm run netlify` → `dist/netlify/`, then drop it at app.netlify.com/drop or `npx netlify deploy --dir dist/netlify --prod`. Fully static (deck bridge baked in). See **NETLIFY.md**.

## Deploy at scale (reps)

```
npm run package                       # → dist/FreightPOP-DemoKit-v<version>.zip + dist/site/
npm run package -- --publish --notes "what changed"
```

`--publish` uploads the zip to the sales portal (Railway → private
`demo-kits` Supabase Storage bucket). Reps then download it from
**freightpopsales.com → Sales Deck menu → “Tradeshow Demo Kit”** — always the
latest published version, auth-gated, served via a 1-hour signed URL.

- Bump `version` in `package.json` per release; every version's zip is kept
  in the bucket (`latest.json` points at the newest).
- A rep's flow: download zip → unzip → double-click the start script →
  present (see `QUICKSTART.md`, generated into every package).
- `dist/site/` is the same tree ready for static hosting (Netlify drag-drop)
  if you ever want a hosted, online version — sync works there too because
  the bridge is baked into the built deck.

## How sync works (FYI)

Both windows are the same origin (`localhost`), so they share state via
`BroadcastChannel` + `localStorage`. The presenter is the source of truth; an
audience window opened late catches up automatically. You can even open a second
audience window (e.g. a second booth screen) — they all follow.

## Troubleshooting

- **Audience window not following?** Both windows must come from the same
  `http://localhost:<port>` origin — don't open one via double-clicking the
  HTML file (`file://`).
- **Fullscreen won't start from the presenter** — browsers require a click in
  the target window first. Click the audience window once, then press `F`.
- **A slide looks cut off** — it's probably taller than 1080px. Keep slide
  content inside the 1920×1080 canvas, or mark it `fit: 'native'` and let it
  scroll.
- **Port in use** — the server auto-tries the next 10 ports; check the terminal
  for the actual URL.
