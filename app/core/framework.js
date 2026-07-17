/**
 * FreightPOP LocalDemo — shared deck engine.
 *
 * Used by BOTH presenter.html and audience.html. Three pieces:
 *
 *   createStage(container)  — renders one slide (an iframe) scaled to fit.
 *       Slides are designed at 1920×1080 and CSS-transform-scaled; slides
 *       marked `fit: "native"` in the manifest fill the stage at natural
 *       size instead (best for live interactive demos / responsive apps).
 *
 *   createDeck({role, render}) — the state machine {slide, step, blackout}.
 *       State persists to localStorage and broadcasts over FPSync, so any
 *       window (presenter or audience) can drive and the rest follow.
 *
 *   bindKeys(deck, extra)   — shared keyboard map. Slides forward their own
 *       keydown events to the parent (see deck/slide-runtime.js), so nav
 *       works even when focus is inside a slide iframe.
 */
(function () {
  const STATE_KEY = 'fp-localdemo-state';
  const DESIGN_W = 1920;
  const DESIGN_H = 1080;

  const deckDef = window.FP_DECK || { title: 'Deck', slides: [] };
  const slides = deckDef.slides;

  // ── Stage ──────────────────────────────────────────────────────────────
  function createStage(container) {
    container.classList.add('fp-stage');
    const inner = document.createElement('div');
    inner.className = 'fp-stage-inner';
    container.appendChild(inner);

    let iframe = null;
    let current = null;
    let pendingStep = 0;
    let stepsTotal = 0;
    const stepsListeners = [];

    function srcFor(slide) { return slide.url ? slide.url : '../deck/' + slide.file; }

    function relayout() {
      if (!current) return;
      if ((current.fit || 'scale') === 'native') {
        inner.style.width = '100%';
        inner.style.height = '100%';
        inner.style.transform = 'translate(-50%, -50%)';
      } else {
        const k = Math.min(container.clientWidth / DESIGN_W, container.clientHeight / DESIGN_H) || 1;
        inner.style.width = DESIGN_W + 'px';
        inner.style.height = DESIGN_H + 'px';
        inner.style.transform = `translate(-50%, -50%) scale(${k})`;
      }
    }

    function load(slide, step) {
      if (current === slide) { setStep(step); return; }
      current = slide;
      pendingStep = step || 0;
      stepsTotal = 0;
      inner.innerHTML = '';
      iframe = document.createElement('iframe');
      iframe.className = 'fp-frame';
      iframe.setAttribute('allow', 'fullscreen; autoplay');
      iframe.src = srcFor(slide);
      inner.appendChild(iframe);
      relayout();
    }

    function setStep(n) {
      pendingStep = n;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage({ fp: 'setStep', n: n }, '*');
      }
    }

    // Dispatch a synthetic keydown INTO the slide (same-origin iframes only).
    // Used by `keys: "relay"` slides — app-style decks with their own internal
    // keyboard navigation (they don't include slide-runtime.js).
    function sendKey(key) {
      try {
        if (!iframe || !iframe.contentDocument) return;
        iframe.contentDocument.dispatchEvent(new KeyboardEvent('keydown', { key: key, bubbles: true, cancelable: true }));
      } catch (e) { /* cross-origin url slide — can't relay */ }
    }

    function reload() {
      if (iframe && current) { const s = current; current = null; load(s, pendingStep); }
    }

    // Messages from the slide: build steps (slide-runtime.js) and deck-bridge
    // events (state changes, mirrored clicks/inputs/scrolls, screen map).
    const dcListeners = [];
    window.addEventListener('message', (e) => {
      if (!iframe || e.source !== iframe.contentWindow) return;
      const d = e.data || {};
      if (d.fp === 'steps') {
        stepsTotal = d.total || 0;
        setStep(pendingStep); // re-apply once the slide is ready
        stepsListeners.forEach((f) => f(stepsTotal));
      }
      if (d.fp === 'dc') dcListeners.forEach((f) => f(d));
    });

    // Push a bridge event INTO this stage's copy of the deck.
    function sendDc(payload) {
      if (iframe && iframe.contentWindow) iframe.contentWindow.postMessage({ fp: 'dcApply', payload: payload }, '*');
    }
    window.addEventListener('resize', relayout);

    return {
      load,
      setStep,
      sendKey,
      sendDc,
      reload,
      relayout,
      onSteps(f) { stepsListeners.push(f); },
      onDc(f) { dcListeners.push(f); },
      get stepsTotal() { return stepsTotal; },
      get slide() { return current; },
    };
  }

  // ── Deck state machine ─────────────────────────────────────────────────
  function createDeck(opts) {
    const role = opts.role;
    const render = opts.render;
    const state = { i: 0, s: 0, black: false };
    try { Object.assign(state, JSON.parse(localStorage.getItem(STATE_KEY) || '{}')); } catch { /* fresh start */ }

    let stepsTotalFn = () => 0;

    function clamp() {
      state.i = Math.max(0, Math.min(slides.length - 1, state.i | 0));
      state.s = Math.max(0, state.s | 0);
      state.black = !!state.black;
    }

    function commit(broadcast) {
      clamp();
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
      render(state);
      if (broadcast !== false) {
        FPSync.send({ type: 'state', i: state.i, s: state.s, black: state.black, from: role });
      }
    }

    const deck = {
      state,
      slides,
      bindSteps(fn) { stepsTotalFn = fn; },
      next() {
        if (state.s < stepsTotalFn()) state.s += 1;
        else if (state.i < slides.length - 1) { state.i += 1; state.s = 0; }
        commit();
      },
      prev() {
        if (state.s > 0) state.s -= 1;
        // 999 = "fully revealed"; both windows clamp identically via clampStep
        // once the previous slide reports its real step count.
        else if (state.i > 0) { state.i -= 1; state.s = 999; }
        commit();
      },
      goto(i) { state.i = i; state.s = 0; commit(); },
      first() { deck.goto(0); },
      last() { deck.goto(slides.length - 1); },
      toggleBlack() { state.black = !state.black; commit(); },
      // Called when a stage learns the real step count — normalize the
      // "fully revealed" placeholder without re-broadcasting (every window
      // computes the same clamp on the same slide).
      clampStep(total) {
        if (state.s > total) { state.s = total; localStorage.setItem(STATE_KEY, JSON.stringify(state)); render(state); }
      },
      applyRemote(msg) { state.i = msg.i | 0; state.s = msg.s | 0; state.black = !!msg.black; commit(false); },
      announce() { commit(true); },
      // ── Relay mode (keys: "relay" slides) ──────────────────────────────
      // The key is applied to THIS window's stage(s) and broadcast so every
      // other window applies it to its own copy — lockstep navigation.
      relayKey(key) { relayListeners.forEach((f) => f(key)); FPSync.send({ type: 'relayKey', key: key, from: role }); },
      relayKeyLocal(key) { relayListeners.forEach((f) => f(key)); },
      onRelay(fn) { relayListeners.push(fn); },
      // Reload the current slide in every window (recovery / restart-at-intro).
      reloadSlide() { reloadListeners.forEach((f) => f()); FPSync.send({ type: 'reloadSlide', from: role }); },
      onReload(fn) { reloadListeners.push(fn); },
      // ── Deck-bridge sync (sync: "dc" slides) ───────────────────────────
      // A bridge event from THIS window's copy — broadcast so every other
      // window applies it to its own copy. (The local copy already did it.)
      dcBroadcast(payload) { FPSync.send({ type: 'dc', payload: payload, from: role }); },
      onDcRemote(fn) { dcRemoteListeners.push(fn); },
      // Late joiners ask whoever has a live copy to re-announce full state.
      dcHello() { FPSync.send({ type: 'dcHello', from: role }); },
      onDcHello(fn) { dcHelloListeners.push(fn); },
    };
    const relayListeners = [];
    const reloadListeners = [];
    const dcRemoteListeners = [];
    const dcHelloListeners = [];

    FPSync.on((msg) => {
      if (!msg || msg.from === role) return;
      if (msg.type === 'state') deck.applyRemote(msg);
      if (msg.type === 'relayKey') relayListeners.forEach((f) => f(msg.key));
      if (msg.type === 'reloadSlide') reloadListeners.forEach((f) => f());
      if (msg.type === 'dc') dcRemoteListeners.forEach((f) => f(msg.payload));
      if (msg.type === 'dcHello' && role === 'presenter') dcHelloListeners.forEach((f) => f());
      // A late-joining window asks for the current state.
      if (msg.type === 'hello' && role === 'presenter') commit(true);
    });

    return deck;
  }

  // ── Keyboard ───────────────────────────────────────────────────────────
  // Keys handed to an app-style slide (keys: "relay") instead of the deck.
  const RELAY_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', ' ', 'PageDown', 'PageUp', 'Enter', 'Escape'];

  function bindKeys(deck, extra) {
    extra = extra || {};
    function handle(key) {
      const slide = slides[deck.state.i];
      if (slide && slide.keys === 'relay' && RELAY_KEYS.indexOf(key) !== -1) {
        // With deck-bridge state sync (sync: "dc"), inject the key into the
        // LOCAL copy only — the resulting state change syncs the other
        // windows. Broadcasting the key too would double-advance on races.
        if (slide.sync === 'dc') deck.relayKeyLocal(key);
        else deck.relayKey(key);
        return true;
      }
      if (key === 'r' || key === 'R') { deck.reloadSlide(); return true; }
      switch (key) {
        case 'ArrowRight': case 'ArrowDown': case ' ': case 'PageDown': deck.next(); return true;
        case 'ArrowLeft': case 'ArrowUp': case 'PageUp': deck.prev(); return true;
        case 'Home': deck.first(); return true;
        case 'End': deck.last(); return true;
        case 'b': case 'B': case '.': deck.toggleBlack(); return true;
        default:
          if (extra[key]) { extra[key](); return true; }
          return false;
      }
    }
    window.addEventListener('keydown', (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && t.matches && t.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (handle(e.key)) e.preventDefault();
    });
    // Keys forwarded from inside slide iframes (deck/slide-runtime.js).
    window.addEventListener('message', (e) => {
      const d = e.data || {};
      if (d.fp === 'key') handle(d.key);
    });
    return handle;
  }

  window.FPFramework = { createStage, createDeck, bindKeys, slides, deckDef, DESIGN_W, DESIGN_H };
})();
