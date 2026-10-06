# FreightPOP Deck Embed Helper (browser extension)

**Problem.** Inside the sales deck's Live Site embed, some FreightPOP app actions call `window.open(…, "_blank")` — the
History page's truck icon ("open transaction"), exports — and the browser opens a real tab, leaving the deck (and asking the
rep to sign in again, because the new tab has a different cookie jar from the embedded frame). A cross-origin frame cannot be
intercepted by the deck itself; the proper fix is a one-line change in the app (see `../docs/LIVE-SITE-LINKS.md`).

**Workaround, no product team needed.** This extension runs a 20-line script in every `app.freightpop.com` frame *before*
the app boots. When the app is framed, it rewrites `window.open` (and `target="_blank"` links) that point at the app itself
to `window.parent.postMessage({ type: "freightpop:open", url })` — the exact message the deck already listens for. The deck
opens the page as a new deck tab. Top-level app tabs are not affected; links to other sites and file exports keep working.

## Install (one time, per rep, ~30 seconds)

1. Chrome / Edge / Brave → `chrome://extensions` → turn on **Developer mode** (top right).
2. **Load unpacked** → pick this folder (`deck-embed-extension`). Reps without the repo: download `https://freightpopsales.com/deck/deck-embed-extension.zip`, unzip it, and pick the unzipped folder.
3. Reload the deck. In a module's Live Site tab, open History and click a truck icon: it opens as a new deck tab.

Offline-kit reps: the folder ships inside the kit; load it the same way.

## Notes

- Manifest V3, `world: "MAIN"` (Chrome 111+, Edge 111+). No permissions requested; nothing is read or sent anywhere.
- The script does nothing when `window.top === window.self`, so normal use of app.freightpop.com is unchanged.
- If the app team ships the postMessage change, this extension becomes redundant and can be removed.
