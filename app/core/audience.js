/**
 * Audience window — the clean output for the external monitor.
 * Follows presenter state over FPSync; can also navigate on its own
 * (arrow keys / clicks) and the presenter follows.
 */
(function () {
  const { createStage, createDeck, bindKeys, slides } = window.FPFramework;

  const stage = createStage(document.getElementById('audience-stage'));
  const blackout = document.getElementById('blackout');
  const progress = document.getElementById('progress');
  const hint = document.getElementById('audience-hint');

  const deck = createDeck({
    role: 'audience-' + Math.random().toString(36).slice(2, 7),
    render(state) {
      const slide = slides[state.i];
      if (!slide) return;
      stage.load(slide, state.s);
      stage.setStep(state.s);
      blackout.classList.toggle('on', state.black);
      progress.style.width = (((state.i + 1) / slides.length) * 100) + '%';
      document.title = 'FreightPOP — ' + slide.title;
    },
  });
  deck.bindSteps(() => stage.stepsTotal);
  stage.onSteps((total) => deck.clampStep(total));
  deck.onRelay((key) => stage.sendKey(key));
  deck.onReload(() => stage.reload());

  // Deck-bridge sync: local interactions broadcast out; remote ones apply here.
  stage.onDc((d) => {
    if (d.kind === 'ready') { deck.dcHello(); return; } // pull current truth from the presenter
    deck.dcBroadcast({ kind: d.kind, state: d.state, path: d.path, value: d.value, top: d.top, left: d.left });
  });
  deck.onDcRemote((payload) => stage.sendDc(payload));

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => { /* needs a user gesture first */ });
  }
  bindKeys(deck, { f: toggleFullscreen, F: toggleFullscreen });
  document.addEventListener('dblclick', toggleFullscreen);

  // Fade the setup hint after 6s (and permanently once fullscreen).
  setTimeout(() => hint.classList.add('gone'), 6000);
  document.addEventListener('fullscreenchange', () => hint.classList.add('gone'));

  // Auto-hide the cursor when idle.
  let cursorTimer = null;
  document.addEventListener('mousemove', () => {
    document.body.classList.remove('hide-cursor');
    clearTimeout(cursorTimer);
    cursorTimer = setTimeout(() => document.body.classList.add('hide-cursor'), 2500);
  });

  // First paint from persisted state, then ask the presenter (if any) for truth.
  deck.applyRemote(deck.state);
  FPSync.send({ type: 'hello', from: 'audience' });
})();
