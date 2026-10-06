// FreightPOP Deck Embed Helper — runs in the page world of app.freightpop.com, in every frame, before the app boots.
// Only acts when the app is framed (inside the sales deck). Top-level app tabs are untouched.
(() => {
  if (window.top === window.self) return;
  const ORIGIN = location.origin + "/";
  // 0. Tell the deck the helper is active (it hides its "install the helper" notice and shows "Helper on" in the toolbar).
  try { window.parent.postMessage({ type: "freightpop:helper", version: "1.0.0" }, "*"); } catch (e) {}
  const abs = (u) => { try { return new URL(String(u), location.href).href; } catch (e) { return ""; } };
  const toDeck = (href) => { try { window.parent.postMessage({ type: "freightpop:open", url: href }, "*"); return true; } catch (e) { return false; } };

  // 1. window.open(url, "_blank") to our own app → hand the URL to the deck (it opens a new deck tab). Anything else (exports to
  //    S3, external sites) keeps the native behaviour so downloads still work.
  const nativeOpen = window.open.bind(window);
  window.open = function (url, target, features) {
    const href = abs(url);
    if (href.startsWith(ORIGIN) && toDeck(href)) return null;
    return nativeOpen(url, target, features);
  };

  // 2. <a target="_blank" href="/app/#/…"> to our own app → same treatment (captured before React sees the click).
  document.addEventListener("click", (e) => {
    const a = e.target && e.target.closest ? e.target.closest("a[target='_blank'],a[target=_blank]") : null; if (!a) return;
    const href = abs(a.getAttribute("href")); if (!href.startsWith(ORIGIN)) return;
    if (toDeck(href)) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
})();
