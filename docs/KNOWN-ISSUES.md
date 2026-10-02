> **Status 2026-10-01.** The five truncated files listed below were only truncated in the local export —
> the git repo has them in full (`assets/pod-photo.png` 2.9 MB, `extracted/9577c1e1-….png` 1.5 MB,
> `assets/wwy/sunbelt-solomon-hero.jpg` 226 KB, `ai-clips/assets/image-data-urls.js` 1.15 MB, the Rive runtime
> `extracted/d4de3b32-….js` 301 KB = `@rive-app/webgl2@2.35.3`). Linking this folder to the repo restored them.
> New on 2026-10-01: `assets/rive.wasm` (the matching 2.35.3 wasm) and `assets/fp_hero-background.riv` were
> added — the deck's hero loader asked for both and got 404s, so the hero fell back to unpkg/jsdelivr online
> and had nothing offline. The `pallet-*.png` fallbacks below are still absent (unchanged).

# Known Issues

Everything below stems from one hard limit: the Claude Design file API caps
downloads at **256 KiB per file**. Five files in the project are larger than
that. Two (JavaScript) were fixed; three (images) cannot be fully recovered
through the API and remain partial.

## Fixed

| File | Problem | Fix applied |
| --- | --- | --- |
| `extracted/d4de3b32-….js` | Rive runtime (used by the deck's hero background animation) cut off mid-file → syntax error, `window.rive` never defined, deck retries forever | Replaced with the official `@rive-app/canvas@2.21.6` UMD build from unpkg (byte-identical wrapper, verified to parse). The deck's Rive orb loads normally. |
| `ai-clips/assets/image-data-urls.js` | Base64 image bundle cut off mid-string → syntax error, both AI clip pages would fail to boot | Truncated back to the last complete entry and re-closed. The 3 FreightPOP logo images survive; the 4th key (`accessorial-satellite.png`) was lost — it is only used by the "Accessorials" chapter, which neither embedded clip (`rate-shop.html`, `invoice-audit.html`) renders. |

## Unfixable via the API (partial images)

| File | Used by | Effect |
| --- | --- | --- |
| `assets/wwy/sunbelt-solomon-hero.jpg` | Why We Won — Sunbelt Solomon sheet | JPEG truncated at 192 KiB; browsers render the top portion of the photo, bottom may be grey. |
| `assets/pod-photo.png` | `DriverPodDemo.dc.html` | PNG truncated; renders partially or not at all in the POD photo slot. |
| `extracted/9577c1e1-….png` | One partner-logo strip in the Sales Deck (80 px high) | PNG truncated; that single logo may render partially. |

If you have the original images (marketing assets folder / HubSpot), drop the
full-size files over these paths and redeploy — nothing else needs to change.

## Missing in the original project (not a copy defect)

- `ai-clips` references `assets/pallet-damaged-{1,2}.png` and
  `assets/pallet-intact-{1,2}.png` as fallbacks for the "Claims" chapter.
  These files **do not exist in the remote Claude Design project either**
  (API returns 404). Neither embedded clip renders that chapter, so nothing
  user-visible breaks.
- `.image-slots.state.json` (the library's logo/hero image-slot sidecar) does
  not exist remotely — the empty logo slots in the library viewer match the
  original. `image-slot.js` handles the 404 gracefully.

## Cosmetic / by design

- The deck template references like `{{ sheetSrc }}` / `{{ libUrl }}` flagged
  by naive link checkers are dc-runtime template placeholders, not broken
  links.
