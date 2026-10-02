> **Status 2026-10-01.** Written against the Aug 17 export. Since then the deck self-hosts the Rive wasm and
> hero `.riv` under `assets/` (see KNOWN-ISSUES), and the offline story moved to SalesOS
> (`freightpoppricer/docs/deck-offline-mode.md`: service worker, per-rep laptop kits). Section 1's
> "needs internet" list is therefore partly out of date; the rest still applies.

# Code Audit — what to know before shipping this to reps

A review of the "bad / fragile code pieces" in the package and what was (or
wasn't) done about each. Nothing here blocks a Netlify deploy.

## 1. External runtime dependencies (needs internet)

| Dependency | Where | Risk |
| --- | --- | --- |
| React 18.3.1 + ReactDOM + Babel from `unpkg.com` | `support.js` (all `.dc.html` pages) and both `ai-clips/*.html` pages | If unpkg is unreachable, pages render blank. Pinned versions + subresource integrity hashes are already in place on the ai-clips pages. |
| Google Fonts (`fonts.googleapis.com`) | Case Study / Why We Won sheets, several demos, all `uploads/*.html`, ai-clips | Graceful degradation — system fonts show if blocked. The deck itself self-hosts its fonts under `extracted/`. |
| Rive animation file from `info.freightpop.com` | Deck hero background | Hero orb simply doesn't appear if blocked; deck still works. |
| Two external Netlify embeds (`tubular-flan-14267b`, `genuine-conkies-86b264`) | Two deck slides (iframes) | Those are separate live sites owned by the team; if they go down, those two iframes show errors. Consider copying them into this repo later. |

**Verdict:** acceptable for sales reps on normal networks. To go fully
offline you'd need to vendor React/Babel and the fonts (~1 MB) — easy follow-up
if ever needed.

## 2. dc-runtime quirks (`support.js`, `extracted/2f9f3ff0-….js`)

- `COMPONENT_DIR = "."` — every `<dc-import name="X">` fetches
  `./X.dc.html` **relative to the deck's URL**. This is why all 37 demo files
  must live as flat siblings of the deck (they do).
- Components execute user-authored JS via Babel at runtime. Fine for a
  marketing site; don't add untrusted content to this folder.
- The runtime writes nothing to disk/network — presentation state lives in
  `localStorage` only (`fp-v4-*`, playhead positions, etc.). Two reps sharing
  a machine share that state; harmless.

## 3. Library ↔ deck navigation logic

- `Validation Library.dc.html` "Back to deck" (line ~61) is a plain anchor to
  `FreightPOP TMS Sales Deck v17.dc.html` — now present locally, so it works.
- When the library is opened *inside* the deck with `?feature=…`, a
  `postMessage` handshake closes the overlay instead of navigating. Both
  paths were traced and work with the local copy.
- Deck → library uses `libUrl: "Validation Library.dc.html?feature=" + …`
  (relative), so it works on any host/subpath.

## 4. Repairs made to truncated files

- `extracted/d4de3b32-….js` (Rive) — replaced with the official
  `@rive-app/canvas@2.21.6` UMD build (the original was the same library,
  truncated by the 256 KiB API cap). If deck animation behavior ever looks
  off, pin a different 2.x version here.
- `ai-clips/assets/image-data-urls.js` — truncated mid-entry; cut back to the
  last complete key and re-closed so it parses. See `KNOWN-ISSUES.md`.

## 5. Minor smells (left as-is, deliberately)

- `ShippingRulesDemo.dc.html` has a pre-existing authoring bug: `_seekAbs`
  and friends are defined *inside* the `restart` arrow function body in the
  source (lines ~528–536 of the component script). Babel still parses it and
  the demo's autoplay path works; only the seek buttons on that one demo are
  affected. This is faithful to the remote original — fix upstream in the
  design project if desired, then re-sync.
- The 8 `uploads/*.html` workflow videos are 8 near-identical copies of the
  same ~700-line player with different `window.__WF` data blobs. Fine for a
  static site; a maintenance pain only if you edit the player logic (edit all
  8 or template it).
- `BroadcastChannel` sync in `uploads/*.html` links playback across open tabs
  on the same origin. Intentional (deck embed syncs with a popped-out video),
  but can look spooky if a rep has two tabs open.
- Demos poll with `requestAnimationFrame` + `forceUpdate()` every frame.
  Heavy but standard for these authored animations; no fix needed.

## 6. What was verified

- Every `src`, `href`, `url()`, `<dc-import>`, and JS asset-path string across
  all 150 files resolves to a file on disk (automated check).
- Both repaired JS files pass `node --check`.
- All images on disk validated as their claimed type via `file` (except the
  three knowingly-truncated ones).
- Filenames match references byte-for-byte (spaces, hyphens — no em-dash
  traps).
