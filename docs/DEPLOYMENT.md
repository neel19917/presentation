> **Status 2026-10-01.** This folder is now a git checkout of `neel19917/presentation` (`main`), and the
> Netlify site **fpdeck** (`fpdeck.netlify.app`, site id `1ce8b9bc-0e3d-4f04-bcfa-28b0a0cdbe7f`) builds from
> that branch on every push — so **deploy = commit + push to `main`**, not drag-and-drop or `netlify deploy`.
> Reps and prospects reach the deck through `freightpopsales.com/deck/view` (SalesOS edge gate, repo
> `freightpoppricer`), never the netlify.app host; the site is password-locked for the public.
> The rest of this page is the original Aug 2026 export guide and is kept for reference.

# Deploying the FreightPOP Presentation to Netlify

This folder is a **self-contained static site**. No build step, no framework, no
server code. It is a complete local copy of the Claude Design project
(`f67377f7-de94-467f-bfd4-94744c633713`) — both the Validation Library **and**
the full Sales Deck with every demo it imports.

| What | Files |
| --- | --- |
| Validation Library | `Validation Library.dc.html` |
| Sales Deck | `FreightPOP TMS Sales Deck v17.dc.html` |
| Runtime | `support.js`, `doc-page.js`, `image-slot.js` |
| Library detail sheets | 8 × `Case Study - *.dc.html`, 15 × `Why We Won - *.dc.html` |
| Deck demo components | 37 × `*Demo.dc.html` (imported live by the deck) |
| AI clips | `ai-clips/` (2 player pages + 6 JSX modules + image data) |
| Workflow videos | `uploads/01-*.html` … `uploads/08-*.html` |
| Deck assets | `extracted/` (14 png, 10 woff2 fonts, dc-runtime + Rive JS) |
| Library images | `assets/cs/` (16 files), `assets/wwy/` (31 files) |
| Demo images | `assets/av-map-*.png`, `assets/pod-photo.png` |
| Netlify config | `netlify.toml` |

Total: ~150 files. Every internal link and asset reference has been verified to
resolve on disk (see `KNOWN-ISSUES.md` for the four files the design API
truncated and how they were handled).

## URLs after deploy

- `/` → Validation Library (rewrite; deep links `/?feature=...` still work)
- `/deck` → Sales Deck (redirect)
- `/library` → Validation Library (redirect)
- "Back to deck" in the library now loads the real deck; every deck demo,
  AI clip, and workflow video is served from this same site.

## Option A — drag-and-drop (fastest)

1. Go to <https://app.netlify.com/drop>.
2. Drag the entire `Presentation` folder onto the page.
3. Netlify gives you a URL like `https://random-name.netlify.app`. Done.

## Option B — Netlify CLI (repeatable)

```bash
npm install -g netlify-cli
cd ~/Desktop/FreightPOP/Presentation
netlify deploy --prod --dir .
```

## Option C — Git-connected site (best for updates)

1. Put this folder in a Git repo (GitHub/GitLab).
2. In Netlify: **Add new site → Import an existing project**, pick the repo.
3. Build command: *(leave empty)*. Publish directory: `.` (or the subfolder).
4. Every push auto-deploys.

## Testing locally before you deploy

```bash
cd ~/Desktop/FreightPOP/Presentation
python3 -m http.server 8080
# Library: http://localhost:8080/Validation%20Library.dc.html
# Deck:    http://localhost:8080/FreightPOP%20TMS%20Sales%20Deck%20v17.dc.html
```

(The `/`, `/deck` and `/library` rewrites are Netlify features, so locally you
must use the full filenames. Everything else behaves identically.)

## Locking it down for reps only (optional)

The site is public by default. Options, cheapest first:

1. **Obscure URL** — keep the random `*.netlify.app` name and only share the
   link internally. Zero cost, zero friction, no real security.
2. **Password protection** — Netlify **Site protections**: one shared password
   for the whole site. Requires a paid plan tier.
3. **Netlify Identity / SSO** — per-user logins; more setup, only worth it if
   the content is genuinely sensitive.

Content here is marketing/validation material (public quotes, G2/Capterra
reviews), so option 1 or 2 is usually enough.

## Custom domain (optional)

Netlify → **Domain management** → add e.g. `library.freightpop.com`, then
create the CNAME record it asks for. HTTPS is automatic.

## Things to know after deploy

- **Internet is required by the viewer's browser** — the dc-runtime pulls
  React from unpkg.com, several pages load Google Fonts, the deck's Rive hero
  animation streams its `.riv` file from info.freightpop.com, and two deck
  slides embed external Netlify sites (tubular-flan / genuine-conkies). Fine
  for reps on normal networks; it will not work fully offline. Details in
  `CODE-AUDIT.md`.
- **Deep links** — `/?feature=Rate%20Shopping` style URLs open the library
  pre-filtered; these survive the root rewrite and are safe to share.
- **Truncated assets** — three images hit the design API's 256 KiB download
  cap and are partially cut off; two JS files hit the same cap and were
  repaired/replaced. See `KNOWN-ISSUES.md`.
