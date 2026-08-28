# deck-config-api — Sales OS

Config API + admin panel for the FreightPOP sales deck. Runs on Railway (project `steadfast-patience`, service `deck-config-api`), zero npm dependencies, JSON stored on a Railway volume at `/data` with a revision history.

- **Admin panel (Sales OS):** freightpopsales.com → ⚙️ admin → **Sales Deck** tab (uses your CPQ login)
- **Standalone admin (fallback):** `https://deck-config-api-production.up.railway.app/admin` (password)
- **Public config:** `GET https://deck-config-api-production.up.railway.app/api/config`

## What the admin can change

| Section | Controls |
|---|---|
| Settings & links | Walkthrough / Main-menu / FreightPOP AI / Live Site / ROI URLs, per-system live deep links, intro headline/subtitle/CTA/caption, logo marquee on/off |
| Tabs & navigation | Enable/disable, reorder and rename the 12 top-bar tabs (also drives the Jump-to menu tiles and their subtitles) |
| Deck versions | Per-AE / per-prospect overlays on the base: tabs, start screen, chrome, custom slide decks; share-link builder |
| Appearance & size | Whole-deck scale, top-bar scale, hub scale + card columns + card min-height, module-page scale, demo stage width + scale, validation stat size, intro headline/subtitle size |
| Presentation controls | Start screen, keyboard navigation, breadcrumb, Live Site pill, Menu button, Link (copy deep link) button, step dots, prev/next arrows, fullscreen pills, AI / Live Site / Expand demo tabs, demo autoplay + speed, Validation Library on step 4 |
| Labels & text | Step tab names + eyebrows, button labels, demo tab labels, card link text |
| Page headings | Eyebrow / H1 / lede for the TMS, WMS, OMS hubs and the Workflows, Roadmap, Onboarding pages |
| TMS / WMS / OMS modules | Enable/disable, reorder; every piece of copy per module: name, card title, tagline, problem, benefit bullets, demo caption / key / AI key / live URL, ROI stat, label, grade, proof, quote, source |
| Roadmap · Onboarding · Workflows | Add / remove / reorder / edit items; enable/disable workflows |
| History & reset | Every publish is a revision (last 60); restore any; reset a section or everything to the deck defaults |

## How the deck uses it

`FreightPOP TMS Sales Deck v17.dc.html` fetches `CONFIG_URL` on mount (`?configUrl=…` or the `configUrl` design prop override it; `?configUrl=off` disables). The response is overlaid on the deck's built-in defaults, so if the API is unreachable the deck runs exactly as authored. Changes take effect the next time the deck loads.

## Deep links, tab gating and per-link controls (deck)

Every screen has a URL. The deck keeps the address bar in sync as you present (so copy it any time, or use the **Link** button in the top bar), and any link opens straight there:

| Param | Example | Meaning |
|---|---|---|
| `go` | `?go=tms/03-rate-shopping/demo` · `?go=wms/02/benefit` · `?go=workflows/04-ltl-freight` · `?go=roadmap` · `?go=menu` | Where to open. Modules by number or name slug; step = `problem` / `benefit` / `demo` / `validation`; add `/ai` or `/live` on the demo step. Slide decks from a version open by their id (`?go=why-acme/2`). |
| `tabs` | `?tabs=tms,wms,workflows` | Only these tabs exist for the viewer (top bar, Jump-to, walkthrough hotspots, arrow keys). `intro`, `explore`, `mainmenu` count as tabs. |
| `hide` | `?hide=roi,ai` | Remove these tabs instead. |
| `lock` | `?go=tms/03/demo&lock=1` | Gate to the linked tab only and drop the Menu button — the viewer stays where the link put them. |
| `c` | `?c=nomenu,nokeys,speed=1.5` | Presentation controls for this link only: `menu keys crumbs livepill live ai expand dots arrows fs lib autoplay link` (prefix `no` to turn off), `speed=`. |
| `v` | `?v=acme-foods` | Open a **deck version** (below). Combines with everything above. |

The same params work after `#`, and the site root (`/?go=…`) forwards them to the deck file.

## Tracked share links (`/l/<code>`)

**Share & track links** in either admin builds a link from a filterable picker (tab, module step, workflow, a version's slide) plus what the viewer may see (tabs, lock, chrome flags), then either copies the plain deep link or creates a **tracked short link**: `https://<deck host>/l/<code>` (Netlify proxies `/l/*` to this API). Optional password. Opening it shows a branded gate page, then redirects into the deck with `t=<code>&k=<session>`; the deck reports `screen`, `play` (Live Demo step, AI tab, workflow player, walkthrough) and `beat` (time) events. Per link: views, unique viewers, plays, time, last viewed, top screens; per viewer: the screens in order, device, IP. Links can be turned off, deleted, or given an expiry. Stored at `DATA_DIR/links/<code>.json` (scrypt password hash; sessions capped at 500).

Short deck URL: `/deck?…` is a Netlify 200-rewrite of the deck file (the API's `GET /deck` 302s there too; `DECK_URL` env, default `https://beta--fpdeck.netlify.app/deck`).

## Deck versions (one base, many decks)

A version is a thin overlay an AE keeps on top of the published base: tabs on/off and their order, start screen and chrome, plus **custom slide decks** (headline, body, bullets, image or embed per page; each deck becomes a tab). The deck opens it with `?v=<slug>`; the API merges base ⊕ overlay at read time, so publishing a new base flows into every version — nobody regenerates anything. Create, edit, clone and delete versions under **Deck versions** in the admin; the **Share a link** card there builds `?v=…&go=…&lock=1` links.

Stored at `DATA_DIR/variants/<slug>.json` as `{ slug, name, owner, note, overlay, slides }`.

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
| GET | `/api/config?v=<slug>` | – | published config with a version's overlay + slides applied (`variant` in the body; `null` if unknown → base) |
| GET | `/api/variants` | Bearer | list versions |
| GET · PUT · DELETE | `/api/variants/:slug` | Bearer | read (with `resolved`), create/update `{ name, owner, note, overlay, slides }`, delete |
| POST | `/api/variants/:slug/clone` | Bearer | `{ name, slug? }` → copy |
| GET · POST | `/l/:code` | – | gate page (password) → 302 into the deck with `t`/`k` |
| GET | `/deck?…` | – | 302 to `DECK_URL` with the same query |
| GET | `/api/t/:code/check?k=` | – | `{ ok, protected, name, recipient, dead }` — the deck decides whether to show its lock screen |
| POST | `/api/t/:code/unlock` | – | `{ password }` → `{ k }` (deck lock screen) |
| POST | `/api/t/:code/event` | – | `{ k, type: screen|play|beat, go?, seconds? }` |
| GET · POST | `/api/links` | Bearer | list (with stats) · create `{ name, recipient, note, password?, expiresAt?, params: { v, go, tabs, hide, lock, c } }` → `{ link, shortUrl, deckUrl }` |
| GET · PATCH · DELETE | `/api/links/:code` | Bearer | detail with sessions · update (`disabled`, `password`, `params`, …) · delete |

## Environment

| Var | Purpose |
|---|---|
| `ADMIN_PASSWORD` | required for any write; set in Railway → Variables (rotate there any time) |
| `DATA_DIR` | `/data` (Railway volume). Falls back to `./data` locally |
| `SUPABASE_URL`, `SUPABASE_ANON_KEY` | enables **Sales OS (CPQ) single sign-on**: the CPQ's admin tab sends the user's Supabase access token as the Bearer; the API verifies it with the project, requires `@ADMIN_EMAIL_DOMAIN` and, when readable, an Admin / Super Admin `user_profiles.user_type` |
| `ADMIN_EMAIL_DOMAIN` | default `freightpop.com` |
| `DECK_URL` | where tracked links land; default `https://beta--fpdeck.netlify.app/deck` |
| `SHORT_BASE` | base for short links shown in the admin; default `DECK_URL` minus `/deck` + `/l/` |
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
