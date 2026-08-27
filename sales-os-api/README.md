# deck-config-api — Sales OS

Config API + admin panel for the FreightPOP sales deck. Runs on Railway (project `steadfast-patience`, service `deck-config-api`), zero npm dependencies, JSON stored on a Railway volume at `/data` with a revision history.

- **Admin panel:** `https://deck-config-api-production.up.railway.app/admin`
- **Public config:** `GET https://deck-config-api-production.up.railway.app/api/config`

## What the admin can change

| Section | Controls |
|---|---|
| Settings & links | Walkthrough / Main-menu / FreightPOP AI / Live Site / ROI URLs, per-system live deep links, intro headline/subtitle/CTA/caption, logo marquee on/off |
| Tabs & navigation | Enable/disable, reorder and rename the 12 top-bar tabs (also drives the Jump-to menu tiles and their subtitles) |
| Appearance & size | Whole-deck scale, top-bar scale, hub scale + card columns + card min-height, module-page scale, demo stage width + scale, validation stat size, intro headline/subtitle size |
| Presentation controls | Start screen, keyboard navigation, breadcrumb, Live Site pill, Menu button, step dots, prev/next arrows, fullscreen pills, AI / Live Site / Expand demo tabs, demo autoplay + speed, Validation Library on step 4 |
| Labels & text | Step tab names + eyebrows, button labels, demo tab labels, card link text |
| Page headings | Eyebrow / H1 / lede for the TMS, WMS, OMS hubs and the Workflows, Roadmap, Onboarding pages |
| TMS / WMS / OMS modules | Enable/disable, reorder; every piece of copy per module: name, card title, tagline, problem, benefit bullets, demo caption / key / AI key / live URL, ROI stat, label, grade, proof, quote, source |
| Roadmap · Onboarding · Workflows | Add / remove / reorder / edit items; enable/disable workflows |
| History & reset | Every publish is a revision (last 60); restore any; reset a section or everything to the deck defaults |

## How the deck uses it

`FreightPOP TMS Sales Deck v17.dc.html` fetches `CONFIG_URL` on mount (`?configUrl=…` or the `configUrl` design prop override it; `?configUrl=off` disables). The response is overlaid on the deck's built-in defaults, so if the API is unreachable the deck runs exactly as authored. Changes take effect the next time the deck loads.

## API

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | – | liveness + current version |
| GET | `/api/config` | – | published config (defaults ⊕ stored), `ETag`, `X-Config-Version`, CORS `*` |
| GET | `/api/defaults` | – | the deck's built-in defaults |
| POST | `/api/login` | – | `{ password }` → `{ token }` (12 h session) |
| GET | `/api/session` | Bearer | validate token |
| PUT | `/api/config` | Bearer | `{ data, note }` → publish a new revision |
| POST | `/api/config/reset` | Bearer | `{ section? }` → reset one section or everything |
| GET | `/api/revisions` · `/api/revisions/:v` | Bearer | history |
| POST | `/api/revisions/:v/restore` | Bearer | republish an old revision |

## Environment

| Var | Purpose |
|---|---|
| `ADMIN_PASSWORD` | required for any write; set in Railway → Variables (rotate there any time) |
| `DATA_DIR` | `/data` (Railway volume). Falls back to `./data` locally |
| `ALLOWED_ORIGINS` | comma-separated origins for CORS; default `*` (config is public read-only) |
| `PORT` | provided by Railway |

## Run locally

```bash
ADMIN_PASSWORD=dev node server.js          # http://localhost:8080/admin
# point a local deck at it:
#   .../FreightPOP%20TMS%20Sales%20Deck%20v17.dc.html?configUrl=http://localhost:8080/api/config
```

## Refresh defaults after editing the deck

```bash
npm run defaults   # regenerates defaults.json from ../FreightPOP TMS Sales Deck v17.dc.html
```
New modules or fields appear in the admin automatically (stored config is merged over defaults by module `num` / nav `key`).

## Deploy

```bash
railway up sales-os-api --path-as-root -s deck-config-api   # from the repo root
```
