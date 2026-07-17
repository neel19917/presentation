# Deploy to Netlify

The kit is fully static — the interactive deck has its sync bridge baked into
the build, so no server or functions are needed.

## One command

```
npm run netlify        # → dist/netlify/  (static, deploy-ready)
```

Then deploy that folder either way:

- **Drag-drop:** open <https://app.netlify.com/drop> and drop the `dist/netlify` folder.
- **CLI:** `npx netlify deploy --dir dist/netlify --prod`

The deploy URL opens the launcher. Present from `/app/presenter.html` on your
laptop; open `/app/audience.html` on the booth screen. Both are same-origin, so
presenter ↔ audience stay in sync (clicks, keys, videos, workflows — everything).

## What's in the bundle

`app/` (presenter + audience + launcher), `deck/` (manifest), `Presentation/`
(the built deck with the bridge baked in), `modules/` (videos + the 7 workflow
explainers), `BRANDING.md`, plus `_redirects` + `netlify.toml` + a root
`index.html` so `/` opens the launcher.

## Notes

- **Needs internet for a few things:** carrier/ERP logos and the deck's
  "Interactive Walkthrough" screen load from external sites. Everything else
  (deck, videos, workflows) is embedded and works offline — which is why the
  double-click local kit is still the safest booth setup.
- **Rebuild before deploying** after editing the deck (`npm run bundle`),
  a video/workflow (`npm run workflows`), or content — `npm run netlify` runs
  the deck build for you, but regenerate workflows/videos first if you changed them.
- **Auth:** this is a public deploy. To gate it, add Netlify password protection
  (Site settings → Access) or Netlify Identity — no code change needed.
