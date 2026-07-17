# modules/ — videos, demos & modular embeds

Self-contained HTML pieces that plug into the presentation system:

- as a **slide** in the tradeshow deck (`deck/manifest.js` → `url: '/modules/<file>.html'`)
- as a **Live Demo embed inside a TMS-deck module** (`src-deck/content/features-*.json`
  → `demo.embed: '../modules/<file>.html?theme=deck&embed=1'`, then `npm run bundle -- --activate`)
- as an **MP4** (`node tools/render-video.mjs --url "http://localhost:8123/modules/<file>.html?render=1" --out dist/<file>.mp4`)

**Start a new module with the scaffolder** (uses `_video-template.html` — the
engine, brand, logo, sync, URL modes and controls all pre-wired; you only
write scenes + apply(t)):

```
node tools/new-module.js dock-scheduling "Dock Scheduling, step by step."
```

**QA gate — run after any edit** (11 automated checks: FPVideo contract, deterministic seek, control-bar buttons incl. chapter arrows, theme toggle, key forwarding, caption-occlusion sweep, emoji scan + review screenshots in 4 modes):

```
node tools/qa-video.mjs --name <module-name>
```

Conventions (already true in the template):
- deterministic timeline — every visual computed from t; implement `window.FPVideo {duration, seek, play, pause}`
- URL modes: `?render=1` (chrome hidden, for MP4/QA) · `?seek=<s>` (static frame) ·
  `?theme=deck` (navy/teal deck skin) · `?embed=1` (loops + hands arrow keys to the host deck)
- brand: BRANDING.md · no emoji · real FreightPOP logo (base64-embedded)
