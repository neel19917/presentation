/**
 * Presenter console — current + next previews, speaker notes, timer, clock,
 * slide grid, blackout badge, "open audience window" button.
 */
(function () {
  const { createStage, createDeck, bindKeys, slides, deckDef } = window.FPFramework;

  const el = (id) => document.getElementById(id);
  el('deck-title').textContent = deckDef.title || '';

  const stageCur = createStage(el('stage-current'));
  const stageNext = createStage(el('stage-next'));

  // ── Render ─────────────────────────────────────────────────────────────
  function render(state) {
    const slide = slides[state.i];
    if (!slide) return;

    stageCur.load(slide, state.s);
    stageCur.setStep(state.s);
    el('stage-current').classList.toggle('blacked', state.black);
    el('black-badge').classList.toggle('on', state.black);
    syncShield(slide);

    // App-style slide with relayed keys — there's no "next slide" preview,
    // the whole deck lives inside this one slide.
    if (slide.keys === 'relay') {
      el('next-label').textContent = slide.sync === 'dc'
        ? 'Interactive deck — every click, key and screen change syncs live'
        : 'Interactive deck — arrow keys are relayed to the big screen';
      el('pos').textContent = (state.i + 1) + ' / ' + slides.length;
      el('section').textContent = slide.section || '';
      el('slide-title').textContent = slide.title || '';
      if (slide.sync === 'dc') renderDcStatus();
      else el('step-ind').textContent = 'live relay';
      const notesEl = el('notes');
      if (slide.notes) { notesEl.textContent = slide.notes; notesEl.classList.remove('notes-empty'); }
      markGridActive(state.i);
      return;
    }

    // Next preview: remaining build on this slide, else the next slide.
    const total = stageCur.stepsTotal;
    if (state.s < total) {
      el('next-label').textContent = 'Next: build step ' + (state.s + 1) + ' of ' + total;
      stageNext.load(slide, state.s + 1);
      stageNext.setStep(state.s + 1);
    } else if (state.i < slides.length - 1) {
      const nxt = slides[state.i + 1];
      el('next-label').textContent = 'Next: ' + nxt.title;
      stageNext.load(nxt, 999); // fully revealed preview
      stageNext.setStep(999);
    } else {
      el('next-label').textContent = 'Next: — end of deck —';
    }

    el('pos').textContent = (state.i + 1) + ' / ' + slides.length;
    el('section').textContent = slide.section || '';
    el('slide-title').textContent = slide.title || '';
    el('step-ind').textContent = total > 0 ? ('build ' + Math.min(state.s, total) + '/' + total) : '';

    const notes = el('notes');
    if (slide.notes) { notes.textContent = slide.notes; notes.classList.remove('notes-empty'); }
    else { notes.textContent = 'No notes for this slide.'; notes.classList.add('notes-empty'); }

    markGridActive(state.i);
    updateVideoControls();
  }

  const deck = createDeck({ role: 'presenter', render });
  deck.bindSteps(() => stageCur.stepsTotal);
  stageCur.onSteps((total) => { deck.clampStep(total); render(deck.state); });
  deck.onRelay((key) => stageCur.sendKey(key));
  deck.onReload(() => { stageCur.reload(); dcState = null; renderDcStatus(); });

  // ── Deck-bridge sync (interactive bundled decks) ───────────────────────
  // Local interactions (in the preview OR keyboard) broadcast to all windows;
  // remote interactions (someone clicking the big screen) apply here too.
  let dcInfo = null;   // screen map reported by the deck
  let dcState = null;  // latest known internal state {view, fi, step, sysKey}
  stageCur.onDc((d) => {
    if (d.kind === 'ready') {
      dcInfo = d.info || dcInfo;
      dcState = d.state || dcState;
      buildGrid();
      buildConfig();
      renderDcStatus();
      // Re-announce truth so any already-open audience window aligns.
      if (d.state) deck.dcBroadcast({ kind: 'state', state: d.state });
      return;
    }
    if (d.kind === 'state') { dcState = d.state; renderDcStatus(); }
    deck.dcBroadcast({ kind: d.kind, state: d.state, path: d.path, value: d.value, top: d.top, left: d.left });
  });
  deck.onDcRemote((payload) => {
    stageCur.sendDc(payload);
    if (payload && payload.kind === 'state') { dcState = payload.state; renderDcStatus(); }
  });
  // A late-joining window asked for the current state — our copy answers.
  deck.onDcHello(() => stageCur.sendDc({ kind: 'get' }));

  // Jump every window's copy to a specific internal screen.
  function dcGoto(statePatch) {
    const full = Object.assign({ menuOpen: false }, statePatch);
    stageCur.sendDc({ kind: 'state', state: full });
    deck.dcBroadcast({ kind: 'state', state: full });
    dcState = Object.assign({}, dcState, full);
    renderDcStatus();
  }
  // Replay the current screen's reveal animations everywhere.
  function dcReplay() {
    stageCur.sendDc({ kind: 'replay' });
    deck.dcBroadcast({ kind: 'replay' });
  }

  const SYS_NAMES = { tms: 'Transportation Management', wms: 'Warehouse Management', oms: 'Order Management' };
  function renderDcStatus() {
    const slide = slides[deck.state.i];
    if (!slide || slide.sync !== 'dc') return;
    let text = 'live sync';
    if (dcState) {
      if (dcState.view === 'feature') {
        const feats = (dcInfo && dcInfo.featureSets && dcInfo.featureSets[dcState.sysKey]) || [];
        const f = feats[dcState.fi];
        const stepName = (dcInfo && dcInfo.stepNames && dcInfo.stepNames[dcState.step]) || ('step ' + (dcState.step + 1));
        text = (SYS_NAMES[dcState.sysKey] || dcState.sysKey) + ' · ' + (f ? f.num + ' ' + f.name : 'module ' + (dcState.fi + 1)) + ' · ' + stepName + ' (' + (dcState.step + 1) + '/4)';
      } else {
        const screen = dcInfo && dcInfo.screens && dcInfo.screens.find((s) => s.state.view === dcState.view);
        text = screen ? screen.label : dcState.view;
      }
    }
    el('step-ind').textContent = text;
    markGridActive(deck.state.i);
    updateVideoControls();
  }

  // ── Preview shield (relay slides) ──────────────────────────────────────
  // Clicking inside the preview copy of an app-style deck would advance ONLY
  // the preview and desync it from the big screen. A transparent shield
  // swallows clicks by default; "Preview: locked/live" toggles it for the
  // times you really want to mouse around the preview (press R to resync).
  // With deck-bridge sync (sync: "dc"), preview clicks mirror to the big
  // screen, so the preview starts LIVE. For relay-only decks (no bridge),
  // clicks would desync the copies, so those start locked.
  let previewLive = null; // null = follow the slide's default
  const shield = document.createElement('div');
  shield.className = 'stage-shield';
  shield.title = 'Preview is click-locked — use the "Preview" button in the top bar to unlock';
  el('stage-current').appendChild(shield);
  const shieldBtn = document.createElement('button');
  shieldBtn.className = 'pbtn';
  shieldBtn.id = 'btn-shield';
  shieldBtn.addEventListener('click', () => {
    const slide = slides[deck.state.i];
    previewLive = !isPreviewLive(slide);
    syncShield(slide);
  });
  el('btn-grid').before(shieldBtn);
  function isPreviewLive(slide) {
    if (previewLive !== null) return previewLive;
    return !!(slide && slide.sync === 'dc'); // synced decks default to live
  }
  function syncShield(slide) {
    const relay = !!(slide && slide.keys === 'relay');
    const live = isPreviewLive(slide);
    shield.style.display = relay && !live ? 'block' : 'none';
    shieldBtn.style.display = relay ? '' : 'none';
    shieldBtn.textContent = live ? 'Preview: live 🖱' : 'Preview: locked 🔒';
    el('btn-replay').style.display = slide && slide.sync === 'dc' ? '' : 'none';
  }

  // ── Timer & clock ──────────────────────────────────────────────────────
  let timerStart = null;   // epoch ms when started
  let timerAccum = 0;      // ms accumulated while paused
  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    const mm = String(m).padStart(2, '0'), sss = String(ss).padStart(2, '0');
    return h > 0 ? h + ':' + mm + ':' + sss : mm + ':' + sss;
  }
  function tick() {
    const elapsed = timerAccum + (timerStart ? Date.now() - timerStart : 0);
    el('timer').textContent = fmt(elapsed);
    el('timer').classList.toggle('running', !!timerStart);
    el('clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(tick, 500);
  tick();

  function toggleTimer() {
    if (timerStart) { timerAccum += Date.now() - timerStart; timerStart = null; el('btn-timer').textContent = 'Start timer'; }
    else { timerStart = Date.now(); el('btn-timer').textContent = 'Pause timer'; }
    tick();
  }
  function resetTimer() { timerStart = timerStart ? Date.now() : null; timerAccum = 0; tick(); }
  el('btn-timer').addEventListener('click', toggleTimer);
  el('btn-timer-reset').addEventListener('click', resetTimer);

  // Auto-start the timer on the first forward navigation.
  const origNext = deck.next.bind(deck);
  deck.next = function () { if (!timerStart && timerAccum === 0) toggleTimer(); origNext(); };

  // ── Audience window ────────────────────────────────────────────────────
  el('btn-audience').addEventListener('click', () => {
    window.open('audience.html', 'fp-audience', 'width=1280,height=720');
  });

  // ── Slide grid overlay ─────────────────────────────────────────────────
  const overlay = el('grid-overlay');
  const gridContent = el('grid-content');

  // Seek every mounted copy of a video over its BroadcastChannel. Sent twice —
  // a freshly-mounted embed iframe may not be listening yet on the first send.
  const videoChannels = {};
  const videoLastSeen = {}; // channel -> last time a live video reported state
  const videoLastT = {};    // channel -> last reported playhead (for [ / ] chapter stepping)
  function videoChan(channel) {
    if (!videoChannels[channel]) {
      videoChannels[channel] = new BroadcastChannel(channel);
      // videos broadcast {t, playing} while playing — mirror it in the console
      videoChannels[channel].onmessage = (e) => {
        const m = e.data || {};
        if (typeof m.t === 'number') { videoLastSeen[channel] = Date.now(); videoLastT[channel] = m.t; updateVcTime(m.t, !!m.playing); }
      };
    }
    return videoChannels[channel];
  }
  function videoSeek(channel, t) {
    const msg = { t: t, playing: true };
    videoLastT[channel] = t; // BroadcastChannel doesn't echo to sender — track our own seeks
    videoChan(channel).postMessage(msg);
    // Retry ONLY when no live video has reported recently (iframe still
    // mounting). Retrying against a live video re-seeks it 1.3s later —
    // that was the visible "refreshing twice".
    const live = Date.now() - (videoLastSeen[channel] || 0) < 5000;
    if (!live) setTimeout(() => videoChan(channel).postMessage(msg), 1300);
  }

  // ── Video transport strip (side panel) ─────────────────────────────────
  // Visible whenever a synced video is on screen: the video slide itself, or
  // the interactive deck sitting on a module that embeds one (deckHost).
  function activeVideoSlide() {
    const cur = slides[deck.state.i] || {};
    if (cur.videoChannel) return cur;
    if (cur.sync === 'dc' && dcState) {
      return slides.find((s) => s.videoChannel && s.deckHost &&
        dcState.view === s.deckHost.view && dcState.fi === s.deckHost.fi &&
        dcState.step === s.deckHost.step && dcState.sysKey === s.deckHost.sysKey) || null;
    }
    return null;
  }
  let vcSlide = null;
  function updateVideoControls() {
    const v = activeVideoSlide();
    el('video-controls').classList.toggle('on', !!v);
    if (!v || v === vcSlide) { if (!v) vcSlide = null; return; }
    vcSlide = v;
    videoChan(v.videoChannel); // ensure the time mirror is listening
    // Push the presenter's persisted video settings into this freshly-mounted
    // copy (theme + auto-pause). Sent twice — the embed iframe may still be
    // loading on the first push.
    pushVideoSettings(v.videoChannel);
    setTimeout(() => pushVideoSettings(v.videoChannel), 1300);
    const wrap = el('vc-chapters');
    wrap.innerHTML = '';
    (v.chapters || []).forEach((c) => {
      const chip = document.createElement('span');
      chip.className = 'step-chip';
      chip.textContent = c.label;
      chip.addEventListener('click', () => videoSeek(v.videoChannel, c.t));
      wrap.appendChild(chip);
    });
  }
  function pushVideoSettings(channel) {
    videoChan(channel).postMessage({ cmd: 'theme', deck: videoThemeDark });
    videoChan(channel).postMessage({ cmd: 'autopause', on: videoAutoPause });
  }
  function updateVcTime(t, playing) {
    const m = Math.floor(t / 60), s = String(Math.floor(t % 60)).padStart(2, '0');
    el('vc-time').textContent = (playing ? '▸ ' : '❚❚ ') + m + ':' + s;
  }
  el('vc-toggle').addEventListener('click', () => { if (vcSlide) videoChan(vcSlide.videoChannel).postMessage({ cmd: 'toggle' }); });
  el('vc-restart').addEventListener('click', () => { if (vcSlide) videoSeek(vcSlide.videoChannel, 0); });

  // ── Config panel: live-module coverage + video theme + auto-pause ──────
  function allVideoChannels() {
    return slides.filter((s) => s.videoChannel).map((s) => s.videoChannel);
  }
  // Persisted presenter defaults: videos default to the WHITE (light) theme,
  // and auto-pause after each section is ON — both stick until changed here.
  let videoThemeDark = localStorage.getItem('fp-video-theme') === 'dark'; // default false = white
  let videoAutoPause = localStorage.getItem('fp-video-autopause') !== 'off'; // default true
  function setVideoTheme(deck) {
    videoThemeDark = deck;
    localStorage.setItem('fp-video-theme', deck ? 'dark' : 'white');
    allVideoChannels().forEach((ch) => videoChan(ch).postMessage({ cmd: 'theme', deck: deck }));
    el('cfg-theme-dark').classList.toggle('active', deck);
    el('cfg-theme-light').classList.toggle('active', !deck);
  }
  function setVideoAutoPause(on) {
    videoAutoPause = on;
    localStorage.setItem('fp-video-autopause', on ? 'on' : 'off');
    allVideoChannels().forEach((ch) => videoChan(ch).postMessage({ cmd: 'autopause', on: on }));
    el('cfg-autopause').classList.toggle('active', on);
    el('cfg-autopause').textContent = on ? 'Pause each section: ON' : 'Pause each section: OFF';
  }

  // ── Video keyboard shortcuts (act on whichever video is on screen) ─────
  function withVideo(fn) {
    return () => { const v = activeVideoSlide(); if (v) fn(v); };
  }
  function videoChapterStep(v, dir) {
    const chs = v.chapters || [];
    if (!chs.length) return;
    const t = videoLastT[v.videoChannel] || 0;
    let idx = 0;
    chs.forEach((c, i) => { if (c.t <= t + 0.5) idx = i; });
    const next = chs[Math.max(0, Math.min(chs.length - 1, idx + dir))];
    videoSeek(v.videoChannel, next.t);
  }
  const videoKeys = {
    p: withVideo((v) => videoChan(v.videoChannel).postMessage({ cmd: 'toggle' })),
    '[': withVideo((v) => videoChapterStep(v, -1)),
    ']': withVideo((v) => videoChapterStep(v, +1)),
    0: withVideo((v) => videoSeek(v.videoChannel, 0)),
    w: withVideo(() => setVideoTheme(!videoThemeDark)),
    s: withVideo(() => setVideoAutoPause(!videoAutoPause)),
  };
  videoKeys.P = videoKeys.p; videoKeys.W = videoKeys.w; videoKeys.S = videoKeys.s;
  for (let d = 1; d <= 9; d++) {
    videoKeys[String(d)] = withVideo((v) => { const c = (v.chapters || [])[d - 1]; if (c) videoSeek(v.videoChannel, c.t); });
  }
  el('cfg-theme-dark').addEventListener('click', () => setVideoTheme(true));
  el('cfg-theme-light').addEventListener('click', () => setVideoTheme(false));
  el('cfg-autopause').addEventListener('click', () => setVideoAutoPause(!videoAutoPause));
  // Reflect persisted defaults in the Config UI (video pushes happen on mount).
  el('cfg-theme-dark').classList.toggle('active', videoThemeDark);
  el('cfg-theme-light').classList.toggle('active', !videoThemeDark);
  el('cfg-autopause').classList.toggle('active', videoAutoPause);
  el('cfg-autopause').textContent = videoAutoPause ? 'Pause each section: ON' : 'Pause each section: OFF';

  function buildConfig() {
    const wrap = el('cfg-modules');
    wrap.innerHTML = '';
    if (!dcInfo || !dcInfo.featureSets) { el('cfg-summary').textContent = 'Waiting for the interactive deck…'; return; }
    let live = 0, total = 0;
    Object.keys(dcInfo.featureSets).forEach((sysKey) => {
      const feats = dcInfo.featureSets[sysKey];
      if (!feats || !feats.length) return;
      const sysEl = document.createElement('div');
      sysEl.className = 'cfg-sys';
      sysEl.textContent = SYS_NAMES[sysKey] || sysKey.toUpperCase();
      wrap.appendChild(sysEl);
      feats.forEach((f, fi) => {
        total++;
        if (f.hasDemo) live++;
        const row = document.createElement('div');
        row.className = 'cfg-mod' + (f.hasDemo ? ' is-live' : '');
        row.innerHTML = '<span class="n"></span><span class="t"></span><span class="badge"></span>';
        row.querySelector('.n').textContent = f.num;
        row.querySelector('.t').textContent = f.name;
        const badge = row.querySelector('.badge');
        badge.textContent = f.hasDemo ? 'LIVE' : 'PLANNED';
        badge.className = 'badge ' + (f.hasDemo ? 'live' : 'planned');
        if (f.hasDemo) {
          row.title = 'Jump both screens to this live demo';
          row.addEventListener('click', () => dcGoto({ view: 'feature', fi: fi, step: 2, sysKey: sysKey }));
        }
        wrap.appendChild(row);
      });
    });
    el('cfg-summary').textContent = live + ' of ' + total + ' module demos live · ' + (total - live) + ' planned (future buildout)';
  }

  function gridSection(name) {
    const wrap = document.createElement('div');
    wrap.className = 'grid-section';
    wrap.innerHTML = '<div class="grid-section-name"></div>';
    wrap.querySelector('.grid-section-name').textContent = name;
    const inner = document.createElement('div');
    inner.className = 'grid-slides';
    wrap.appendChild(inner);
    gridContent.appendChild(wrap);
    return inner;
  }

  function buildGrid() {
    gridContent.innerHTML = '';

    // Manifest slides.
    let currentSection = null, sectionEl = null;
    slides.forEach((s, i) => {
      const sec = s.section || 'Deck';
      if (sec !== currentSection) { currentSection = sec; sectionEl = gridSection(sec); }
      const b = document.createElement('button');
      b.className = 'gslide';
      b.dataset.i = i;
      b.innerHTML = '<div class="n">' + (i + 1) + '</div><div class="t"></div>';
      b.querySelector('.t').textContent = s.title;
      b.addEventListener('click', () => { deck.goto(i); closeGrid(); });
      // Video slides expose chapter chips — clicking seeks every mounted copy
      // of the video (this slide AND any in-deck embeds) over its channel.
      if (s.chapters && s.videoChannel) {
        const stepsEl = document.createElement('div');
        stepsEl.className = 'steps';
        b.classList.add('dc-feature');
        s.chapters.forEach((c) => {
          const chip = document.createElement('span');
          chip.className = 'step-chip';
          chip.textContent = c.label;
          chip.addEventListener('click', (e) => {
            e.stopPropagation();
            const cur = slides[deck.state.i] || {};
            if (cur.sync === 'dc' && s.deckHost) dcGoto(s.deckHost); // surface the in-deck embed
            else if (deck.state.i !== i) deck.goto(i);
            videoSeek(s.videoChannel, c.t);
            closeGrid();
          });
          stepsEl.appendChild(chip);
        });
        b.appendChild(stepsEl);
      }
      sectionEl.appendChild(b);
    });

    // Extracted internal screens of the synced interactive deck.
    if (dcInfo) {
      if (dcInfo.screens && dcInfo.screens.length) {
        const secEl = gridSection('Deck screens (live jump — both screens)');
        dcInfo.screens.forEach((s) => {
          const b = document.createElement('button');
          b.className = 'gslide dc-screen';
          b.dataset.dcView = s.state.view;
          b.innerHTML = '<div class="t"></div>';
          b.querySelector('.t').textContent = s.label;
          b.addEventListener('click', () => { dcGoto(s.state); closeGrid(); });
          secEl.appendChild(b);
        });
      }
      const stepNames = dcInfo.stepNames && dcInfo.stepNames.length ? dcInfo.stepNames : ['Problem', 'Benefit', 'Live Demo', 'Validation'];
      Object.keys(dcInfo.featureSets || {}).forEach((sysKey) => {
        const feats = dcInfo.featureSets[sysKey];
        if (!feats || !feats.length) return;
        const secEl = gridSection((SYS_NAMES[sysKey] || sysKey.toUpperCase()) + ' — modules');
        feats.forEach((f, fi) => {
          const b = document.createElement('button');
          b.className = 'gslide dc-feature';
          b.dataset.dcSys = sysKey;
          b.dataset.dcFi = fi;
          b.innerHTML = '<div class="n"></div><div class="t"></div><div class="steps"></div>';
          b.querySelector('.n').textContent = f.num;
          b.querySelector('.t').textContent = f.name;
          const stepsEl = b.querySelector('.steps');
          stepNames.forEach((sn, si) => {
            const chip = document.createElement('span');
            chip.className = 'step-chip';
            chip.dataset.dcStep = si;
            chip.textContent = sn;
            chip.title = f.name + ' — ' + sn;
            chip.addEventListener('click', (e) => {
              e.stopPropagation();
              dcGoto({ view: 'feature', fi: fi, step: si, sysKey: sysKey });
              closeGrid();
            });
            stepsEl.appendChild(chip);
          });
          b.addEventListener('click', () => { dcGoto({ view: 'feature', fi: fi, step: 0, sysKey: sysKey }); closeGrid(); });
          secEl.appendChild(b);
        });
      });
    }
    updateGridActive();
  }

  function updateGridActive() {
    const i = deck.state.i;
    gridContent.querySelectorAll('.gslide').forEach((b) => b.classList.remove('active'));
    gridContent.querySelectorAll('.step-chip').forEach((c) => c.classList.remove('active'));
    if (dcState && slides[i] && slides[i].sync === 'dc') {
      if (dcState.view === 'feature') {
        const fb = gridContent.querySelector('.dc-feature[data-dc-sys="' + dcState.sysKey + '"][data-dc-fi="' + dcState.fi + '"]');
        if (fb) {
          fb.classList.add('active');
          const chip = fb.querySelector('.step-chip[data-dc-step="' + dcState.step + '"]');
          if (chip) chip.classList.add('active');
        }
      } else {
        const sb = gridContent.querySelector('.dc-screen[data-dc-view="' + dcState.view + '"]');
        if (sb) sb.classList.add('active');
      }
    }
    gridContent.querySelectorAll('.gslide[data-i]').forEach((b) => b.classList.toggle('active', Number(b.dataset.i) === i && !(slides[i] && slides[i].sync === 'dc' && dcState)));
  }
  function markGridActive() { updateGridActive(); }
  function openGrid() { overlay.classList.add('open'); }
  function closeGrid() { overlay.classList.remove('open'); }
  function toggleGrid() { overlay.classList.toggle('open'); }
  buildGrid();
  el('btn-grid').addEventListener('click', toggleGrid);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeGrid(); });

  // ── Notes font size ────────────────────────────────────────────────────
  let notesSize = Number(localStorage.getItem('fp-notes-size')) || 15;
  function applyNotesSize() {
    document.documentElement.style.setProperty('--notes-size', notesSize + 'px');
    localStorage.setItem('fp-notes-size', String(notesSize));
  }
  applyNotesSize();
  el('notes-bigger').addEventListener('click', () => { notesSize = Math.min(28, notesSize + 1); applyNotesSize(); });
  el('notes-smaller').addEventListener('click', () => { notesSize = Math.max(11, notesSize - 1); applyNotesSize(); });

  // ── Keys ───────────────────────────────────────────────────────────────
  el('btn-replay').addEventListener('click', dcReplay);
  bindKeys(deck, Object.assign({
    g: toggleGrid, G: toggleGrid,
    t: resetTimer, T: resetTimer,
    a: dcReplay, A: dcReplay,
    Escape: closeGrid,
  }, videoKeys));
  // Escape is relayed into synced decks (to close their overlays), so close
  // the grid with a listener of our own too.
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeGrid(); });

  // Paint immediately from persisted state and tell any audience windows.
  deck.announce();
})();
