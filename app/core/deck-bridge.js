/**
 * deck-bridge.js — injected INSIDE the bundled deck by server.js (in memory,
 * on the fly; the original .html on disk is never modified).
 *
 * server.js also injects `window.__fpApp = this` into the deck component's
 * componentDidMount, so this bridge can reach the live app instance.
 *
 * What it does (runs inside every stage iframe, presenter and audience):
 *   1. STATE SYNC  — wraps app.setState; every state change (view, feature,
 *      step, menu) posts a snapshot to the parent, which broadcasts it to all
 *      windows. Remote windows apply it with setState. Absolute state = no drift.
 *   2. DOM MIRROR  — clicks, text input and scrolling are replayed by CSS
 *      path, covering the DOM-only widgets (carrier/ERP guides) that don't go
 *      through app state.
 *   3. SCREEN MAP  — reports the deck's full internal structure (views,
 *      feature sets, step names) so the presenter can build a jump grid.
 *   4. REPLAY      — re-runs the active screen's reveal animations (and
 *      restarts the intro Rive animation) on demand.
 */
(function () {
  'use strict';
  if (window.__fpBridgeInstalled) return;
  window.__fpBridgeInstalled = true;
  if (window.parent === window) return; // only meaningful inside the stage

  var app = null;
  var applying = false;   // true while applying a remote event (suppresses echo)

  function post(msg) {
    try { msg.fp = 'dc'; window.parent.postMessage(msg, '*'); } catch (e) { /* detached */ }
  }

  // ── App state sync ─────────────────────────────────────────────────────
  function snapshot() {
    if (!app || !app.state) return null;
    var s = app.state;
    return { view: s.view, fi: s.fi, step: s.step, wfi: s.wfi, sysKey: s.sysKey, menuOpen: s.menuOpen };
  }

  function describe() {
    var info = { featureSets: {}, stepNames: [], screens: [] };
    try {
      info.stepNames = (app.stepNames || []).slice();
      Object.keys(app.featureSets || {}).forEach(function (k) {
        info.featureSets[k] = app.featureSets[k].map(function (f) {
          return {
            num: f.num, name: f.name, tag: f.tag,
            // live-module map for the presenter's Config panel
            hasDemo: !!(f.demo && f.demo.embed),
            demoEmbed: (f.demo && f.demo.embed) || null,
          };
        });
      });
      info.screens = [
        { label: 'Intro',                    state: { view: 'intro' } },
        { label: 'Interactive Walkthrough',  state: { view: 'explore' } },
        { label: 'Main Menu',                state: { view: 'mainmenu' } },
        { label: 'TMS — Module Hub',         state: { view: 'hub', sysKey: 'tms' } },
        { label: 'WMS — Warehouse',          state: { view: 'wms', sysKey: 'wms' } },
        { label: 'OMS — Orders',             state: { view: 'oms', sysKey: 'oms' } },
        { label: 'Carrier Integrations',     state: { view: 'carriers' } },
        { label: 'Shipping Workflows',       state: { view: 'workflows' } },
        { label: 'ERP & System Integrations', state: { view: 'erp' } },
      ];
    } catch (e) { /* partial info is fine */ }
    return info;
  }

  function install(instance) {
    if (app) return;
    app = instance;
    var orig = app.setState.bind(app);
    var scheduled = false;
    app.setState = function (patch, cb) {
      var r = orig(patch, cb);
      if (!applying && !scheduled) {
        scheduled = true;
        // Coalesce bursts into one post. setTimeout, NOT requestAnimationFrame:
        // rAF never fires in occluded/background windows, which would silence
        // the bridge exactly when a window is covered by another.
        setTimeout(function () {
          scheduled = false;
          post({ kind: 'state', state: snapshot() });
        }, 0);
      }
      return r;
    };
    post({ kind: 'ready', info: describe(), state: snapshot() });
  }

  if (window.__fpApp) install(window.__fpApp);
  window.addEventListener('fp-app-ready', function () { if (window.__fpApp) install(window.__fpApp); });
  var poll = setInterval(function () {
    if (window.__fpApp) { install(window.__fpApp); clearInterval(poll); }
  }, 200);

  function applyState(state) {
    if (!app || !state) return;
    // The guard only needs to cover the synchronous setState call (our wrapper
    // hook fires inside it). Reset synchronously — a guard parked on rAF/timers
    // can stay stuck in background windows and mute the bridge (real bug).
    applying = true;
    try { app.setState(state); } catch (e) { /* ignore */ }
    applying = false;
  }

  function replay() {
    if (!app) return;
    try { app._navKey = null; } catch (e) {}
    try { app.revealActive(); } catch (e) {}
    // Intro: kick the Rive hero back into motion from the top.
    try {
      if (app.state && app.state.view === 'intro' && app.riveInst) {
        if (app.riveInst.reset) app.riveInst.reset({ artboard: 'Main', stateMachines: 'State Machine 1' });
        app.riveInst.play();
      }
    } catch (e) { /* rive is decorative — never fail the replay */ }
  }

  // ── DOM mirroring (clicks / input / scroll) ────────────────────────────
  function pathOf(el) {
    if (!(el instanceof Element)) el = el && el.parentElement;
    if (!el) return null;
    var parts = [];
    var node = el;
    while (node && node !== document.documentElement) {
      if (node.id) { parts.unshift('#' + (window.CSS && CSS.escape ? CSS.escape(node.id) : node.id)); return parts.join(' > '); }
      var parent = node.parentElement;
      if (!parent) return null;
      var idx = 1, sib = node;
      while ((sib = sib.previousElementSibling)) idx++;
      parts.unshift(node.tagName.toLowerCase() + ':nth-child(' + idx + ')');
      node = parent;
    }
    parts.unshift('html');
    return parts.join(' > ');
  }

  function find(path) {
    try { return path ? document.querySelector(path) : null; } catch (e) { return null; }
  }

  document.addEventListener('click', function (e) {
    if (applying || !e.isTrusted) return; // only real user clicks; replays are untrusted
    var p = pathOf(e.target);
    if (p) post({ kind: 'click', path: p });
  }, true);

  document.addEventListener('input', function (e) {
    if (applying) return;
    var t = e.target;
    if (!t || !('value' in t)) return;
    var p = pathOf(t);
    if (p) post({ kind: 'input', path: p, value: t.value });
  }, true);

  var scrollTimers = {};
  document.addEventListener('scroll', function (e) {
    var t = e.target === document ? document.scrollingElement : e.target;
    if (!t || !(t instanceof Element)) return;
    if (t.__fpIgnoreScrollUntil && Date.now() < t.__fpIgnoreScrollUntil) return;
    var p = pathOf(t);
    if (!p) return;
    clearTimeout(scrollTimers[p]);
    scrollTimers[p] = setTimeout(function () {
      post({ kind: 'scroll', path: p, top: t.scrollTop, left: t.scrollLeft });
    }, 80);
  }, true);

  // ── Keyboard forwarding ────────────────────────────────────────────────
  // Keys the deck itself does NOT handle bubble up to the presenter/audience
  // frame, so presenter shortcuts (P, [, ], 1-9, 0, W, G, B, A…) keep working
  // while focus sits inside the deck (e.g. right after clicking a hotspot).
  var FORWARD_KEYS = ['p', 'P', '[', ']', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'w', 'W', 's', 'S', 'g', 'G', 'b', 'B', 'a', 'A', 't', 'T', '.', 'Home', 'End'];
  window.addEventListener('keydown', function (e) {
    if (window.parent === window) return;
    var t = e.target;
    if (t && t.matches && t.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (FORWARD_KEYS.indexOf(e.key) !== -1) {
      try { window.parent.postMessage({ fp: 'key', key: e.key }, '*'); } catch (err) {}
      e.preventDefault();
    }
  });

  // ── Remote events from the framework ───────────────────────────────────
  window.addEventListener('message', function (e) {
    var d = e.data || {};
    // keys forwarded by nested iframes (e.g. an embedded demo video) — pass up
    if (d.fp === 'key' && d.key && window.parent !== window) {
      try { window.parent.postMessage({ fp: 'key', key: d.key }, '*'); } catch (err) {}
      return;
    }
    if (d.fp !== 'dcApply' || !d.payload) return;
    var pl = d.payload;
    if (pl.kind === 'state') { applyState(pl.state); return; }
    if (pl.kind === 'replay') { replay(); return; }
    if (pl.kind === 'get') { if (app) post({ kind: 'ready', info: describe(), state: snapshot() }); return; }
    if (pl.kind === 'click') {
      var el = find(pl.path);
      if (el) { applying = true; try { el.click(); } catch (err) {} applying = false; }
      return;
    }
    if (pl.kind === 'input') {
      var inp = find(pl.path);
      if (inp && 'value' in inp) {
        applying = true;
        try { inp.value = pl.value; inp.dispatchEvent(new Event('input', { bubbles: true })); } catch (err) {}
        applying = false;
      }
      return;
    }
    if (pl.kind === 'scroll') {
      var sc = find(pl.path);
      if (sc) {
        sc.__fpIgnoreScrollUntil = Date.now() + 250;
        try { sc.scrollTop = pl.top; sc.scrollLeft = pl.left; } catch (err) {}
      }
    }
  });
})();
