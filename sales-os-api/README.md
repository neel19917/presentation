# deck-config-api — Sales OS

Config API + admin panel for the FreightPOP sales deck. Runs on Railway (project `steadfast-patience`, service `deck-config-api`), zero npm dependencies, JSON stored on a Railway volume at `/data` with a revision history.

- **Admin panel (Sales OS):** freightpopsales.com → ⚙️ admin → **Sales Deck** tab (uses your CPQ login)
- **Standalone admin (fallback):** `https://deck-config-api-production.up.railway.app/admin` (password)
- **Public config:** `GET https://deck-config-api-production.up.railway.app/api/config`

## What the admin can change

| Section | Controls |
|---|---|
| Settings & links | Walkthrough / Main-menu / FreightPOP AI / Live Site / ROI URLs, ROI tab mode (in-deck / new browser tab / auto), per-system live deep links, Live Site helper (browser extension) install page URL, intro headline/subtitle/CTA/caption, logo marquee on/off |
| Tabs & navigation | Enable/disable, reorder and rename the 12 top-bar tabs (also drives the Jump-to menu tiles and their subtitles) |
| Deck versions | Per-AE / per-prospect overlays on the base: tabs, start screen, chrome, custom slide decks; share-link builder |
| Appearance & size | Whole-deck scale, top-bar scale, hub scale + card columns + card min-height, module-page scale, demo stage width + scale, validation stat size, intro headline/subtitle size |
| Presentation controls | Start screen, keyboard navigation, letter hotkeys (? lists them), intro hero video on/off, Live Site helper install notice, breadcrumb, Live Site pill, Menu button, Link (copy deep link) button, step dots, prev/next arrows, fullscreen pills, AI / Live Site / Expand demo tabs, demo autoplay + speed, Validation Library on step 4 |
| Labels & text | Step tab names + eyebrows, button labels, demo tab labels, card link text |
| Page headings | Eyebrow / H1 / lede for the TMS, WMS, OMS hubs and the Workflows, Roadmap, Onboarding pages |
| TMS / WMS / OMS modules | Enable/disable, reorder; every piece of copy per module: name, card title, tagline, problem, benefit bullets, demo caption / key / AI key / live URL, ROI stat, label, grade, proof, quote, source |
| Integrations | The Integrations tab: headings, categories, every system (name, id, editions/versions, how it connects, status, blurb, into / back-to flows, methods, tags, proof link, demo deep link), implementation partners; deck versions pin a prospect's stack. Per system: **Visible in the deck**, **Scope visibility** (public / detailed view only / hidden) and the integration scope (objects, triggers, frequency, auth, endpoints, mapping notes, limits); the **Detailed API view** control (Presentation controls, default off; `?c=api`, `?go=erp/<id>/api`) gates the internal detail; per system also use cases (ins/outs, public), customers (visibility + approved switch) and a Jira ticket snapshot (detailed view only). Note: the API itself is public — the gate is in the deck |
| Roadmap · Onboarding · Workflows | Add / remove / reorder / edit items; enable/disable workflows |
| History & reset | Every publish is a revision (last 200, `KEEP_REVISIONS`; each is logged on the server); restore any; reset a section or everything to the deck defaults |

## How the deck uses it

`FreightPOP TMS Sales Deck v17.dc.html` fetches `CONFIG_URL` on mount (`?configUrl=…` or the `configUrl` design prop override it; `?configUrl=off` disables). The response is overlaid on the deck's built-in defaults, so if the API is unreachable the deck runs exactly as authored. Changes take effect the next time the deck loads.

## Deep links, tab gating and per-link controls (deck)

Every screen has a URL. The deck keeps the address bar in sync as you present (so copy it any time, or use the **Link** button in the top bar), and any link opens straight there:

| Param | Example | Meaning |
|---|---|---|
| `go` | `?go=tms/03-rate-shopping/demo` · `?go=wms/02/benefit` · `?go=workflows/04-ltl-freight` · `?go=erp/netsuite` · `?go=roadmap` · `?go=menu` | Where to open. Modules by number or name slug; step = `problem` / `benefit` / `demo` / `validation`; add `/ai` or `/live` on the demo step. Slide decks from a version open by their id (`?go=why-acme/2`). |
| `tabs` | `?tabs=tms,wms,workflows` | Only these tabs exist for the viewer (top bar, Jump-to, walkthrough hotspots, arrow keys). `intro`, `explore`, `mainmenu` count as tabs. |
| `hide` | `?hide=roi,ai` | Remove these tabs instead. |
| `lock` | `?go=tms/03/demo&lock=1` | Gate to the linked tab only and drop the Menu button — the viewer stays where the link put them. |
| `c` | `?c=nomenu,nokeys,speed=1.5` | Presentation controls for this link only: `menu keys crumbs livepill live ai expand dots arrows fs lib autoplay link video hotkeys helper` (prefix `no` to turn off), `speed=`. |
| `v` | `?v=acme-foods` | Open a **deck version** (below). Combines with everything above. |

The same params work after `#`, and the site root (`/?go=…`) forwards them to the deck file.

## Tracked share links (`/l/<code>`)

**Share & track links** in either admin builds a link from a filterable picker (tab, module step, workflow, a version's slide) plus what the viewer may see (tabs, lock, chrome flags), then either copies the plain deep link or creates a **tracked short link**: `https://<deck host>/l/<code>` (Netlify proxies `/l/*` to this API). Access is **open**, a **generated access token** (default — `XXXX-XXXX`, shown once, stored hashed, case/dash-insensitive, rotatable with *New token*; a one-click `…/l/<code>?tk=<token>` variant is offered too) or a **password you choose**. Opening it shows a branded gate page, then redirects into the deck with `t=<code>&k=<session>`; the deck reports `screen`, `play` (Live Demo step, AI tab, workflow player, walkthrough) and `beat` (time) events. Per link: views, unique viewers, plays, time, last viewed, top screens; per viewer: the screens in order, device, IP. Links can be turned off, deleted, or given an expiry. Stored at `DATA_DIR/links/<code>.json` (scrypt password hash; sessions capped at 500).

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
| GET · POST | `/api/links` | Bearer | list (with stats) · create `{ name, recipient, note, access: token|password|open, password?, expiresAt?, params: { v, go, tabs, hide, lock, c } }` → `{ link, shortUrl, deckUrl, token, tokenUrl }` (token only returned here) |
| GET · PATCH · DELETE | `/api/links/:code` | Bearer | detail with sessions · update (`disabled`, `rotateToken`, `access`, `password`, `params`, …) · delete |

## Security

- **Public, by design:** `GET /api/config`, `GET /api/config?v=<slug>` and `GET /api/defaults` — the deck loads them without a login
  (CORS `*`). They carry deck content and URLs only; the publisher identity and revision note are stripped unless the caller is an
  admin. Everything typed into the admin ends up here, so no internal notes, pricing or customer contact details in module copy.
- **Admin:** every write and all of versions / links / revisions need a Bearer token — the admin password (constant-time compare,
  400 ms delay on failure) or Supabase SSO restricted to `@ADMIN_EMAIL_DOMAIN` with an Admin / Super Admin profile. Sessions are
  24 random bytes, 12 h sliding, in memory.
- **Lockout:** 10 failures in 15 minutes lock the client IP for 15 minutes (`429`, `Retry-After`) on `/api/login`, the tracked-link
  gate (`/l/<code>`, also per link code) and `/api/t/<code>/unlock`. Tune with `LOCK_AFTER`, `LOCK_WINDOW_MIN`, `LOCK_MIN`.
- **Deck versions:** new versions get a random 6-character slug suffix (`?v=acme-foods-k7m2pq`) because any slug resolves publicly.
  Versions created before 2026-10-05 keep their short slugs — recreate (clone) the sensitive ones.
- **Tracked links:** tokens / passwords are scrypt-hashed; wrong guesses wait 500 ms and count toward the lockout.
- **Headers:** `X-Content-Type-Options`, `Referrer-Policy: no-referrer`, HSTS, `Permissions-Policy`; HTML gets
  `Content-Security-Policy: frame-ancestors` (default allows SalesOS and localhost; set `FRAME_ANCESTORS`). No `X-Frame-Options: DENY`
  because SalesOS embeds the admin.
- **Deck hosting:** since 2026-10-05 the deck is static in the SalesOS repo (`FPPricer/public/deck/`, synced by its `scripts/sync-deck.mjs`) and served at `freightpopsales.com/deck/view` behind the `deck-gate` edge function (tracked-link session or signed-in rep). The old separate deck site (fpdeck.netlify.app) is being retired; until then it is still behind Netlify's site-wide password — every file, including this API's source, returns 401 without it.
  In production nobody types that password: SalesOS (freightpopsales.com) serves the deck at `/deck/view` through its `deck-gate`
  edge function, which admits a tracked-link session or a signed-in rep and fetches the deck from fpdeck with the password cookie
  server-side; production `DECK_URL` points there, so `/l/<code>` → gate page → `freightpopsales.com/deck/view`. The password is
  therefore a server-to-server secret (`DECK_SITE_COOKIE` in SalesOS and in the kit), not something reps or prospects use. Rotate it
  in both places together; or retire the separate deck site by hosting the deck files inside the SalesOS repo (see
  `docs/DEPLOYMENT.md`).

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
| `LOCK_AFTER` · `LOCK_WINDOW_MIN` · `LOCK_MIN` | brute-force lockout: failures (10) within a window (15 min) lock for (15 min) |
| `FRAME_ANCESTORS` | CSP `frame-ancestors` for HTML responses; default `'self' https://freightpopsales.com https://*.freightpopsales.com http://localhost:* http://127.0.0.1:*` |
| `PORT` | provided by Railway |

## Run locally

```bash
ADMIN_PASSWORD=dev node server.js          # http://localhost:8080/admin
# point a local deck at it:
#   .../FreightPOP%20TMS%20Sales%20Deck%20v17.dc.html?configUrl=http://localhost:8080/api/config
```

## Check the deck before pushing

```bash
npm run check      # parses the deck, type-checks all 29 modules' fields, confirms defaults.json is current and the published config matches
```
Route-level verification (does `#/wms/receipts` exist in the app?) is `npm run crosscheck` in the kit repo — see `../docs/LIVE-SITE-LINKS.md`.

## Refresh defaults after editing the deck

```bash
npm run defaults   # regenerates defaults.json from ../FreightPOP TMS Sales Deck v17.dc.html
```
New modules or fields appear in the admin automatically (stored config is merged over defaults by module `num` / nav `key`).

## Deploy

```bash
railway up sales-os-api --path-as-root -s deck-config-api   # from the repo root
```
