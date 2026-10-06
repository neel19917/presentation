// clip-standalone.jsx — renders ONE chapter of the v5 video with no product chrome:
// no table-setter intro, no chapter pills. Loops continuously.
// Player controls sit in a strip BELOW the 1920x1080 stage (never over the app),
// matching the deck's standard demo player: progress bar with a tick per step,
// "Step N of M" + step label, Back to start · Previous step · Play/Pause ·
// Next step · m:ss / m:ss. Clicking the stage toggles play.

// Steps per clip, in LOCAL walkthrough time (seconds before PACE_V4 scaling).
// Each step starts on the chat event it names.
const CLIP_STEPS = {
  'rate-shop': [
    { at: 0,    label: 'Load your rate-shop rules' },
    { at: 6.5,  label: 'Rate shop the load' },
    { at: 10.0, label: 'Carrier picked by your rules' },
    { at: 13.0, label: 'Book it and send the documents' },
    { at: 16.2, label: 'Booked \u2014 documents generated' },
  ],
  'invoice-audit': [
    { at: 0,    label: 'Weekly invoice pull' },
    { at: 4.5,  label: 'INV-7842 \u2014 missed lift gate found' },
    { at: 9.5,  label: 'Rule saved, invoice approved' },
    { at: 12.0, label: 'INV-7840 \u2014 detention escalated' },
    { at: 17.0, label: 'In-tolerance invoices approved' },
    { at: 20.0, label: 'Weekly run summary' },
  ],
};

const PLAYER_H = 75; // 56px at the deck's 1440-wide canvas, scaled to this 1920-wide stage

function fmtClock(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }

function ClipStage({ width = 1920, height = 1080, duration, steps = [], background = '#EEF1F5', children }) {
  const [time, setTime] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [scale, setScale] = React.useState(1);
  const hostRef = React.useRef(null);
  const boxH = height + PLAYER_H;

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setScale(Math.max(0.05, Math.min(el.clientWidth / width, el.clientHeight / boxH)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, boxH]);

  React.useEffect(() => {
    if (!playing) return;
    let raf, last = null;
    const step = (ts) => {
      if (last != null) setTime(p => { const n = p + (ts - last) / 1000; return n >= duration ? 0 : n; });
      last = ts;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, playing]);

  const seek = (t) => setTime(Math.max(0, Math.min(duration - 0.05, t)));
  const stepIdx = (() => { let i = 0; steps.forEach((s, j) => { if (time + 0.05 >= s.t) i = j; }); return i; })();
  const stop = (fn) => (e) => { e.stopPropagation(); fn(); };
  const restart = () => { seek(0); setPlaying(true); };
  const prevStep = () => { if (!steps.length) return; const back = time - steps[stepIdx].t > 1.5 ? stepIdx : Math.max(0, stepIdx - 1); seek(steps[back].t); };
  const nextStep = () => { if (stepIdx + 1 < steps.length) seek(steps[stepIdx + 1].t); };
  const scrub = (e) => { e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * duration); };

  const mint = '#3DD6B5';
  const btn = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, cursor: 'pointer' };
  const ctx = React.useMemo(() => ({ time, duration, playing, setTime }), [time, duration, playing]);
  return (
    <div ref={hostRef} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width, height: boxH, position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center', flex: '0 0 auto' }}>
        <div onClick={() => setPlaying(p => !p)} style={{ position: 'absolute', left: 0, top: 0, width, height, background, overflow: 'hidden', cursor: 'pointer' }}>
          <TimelineContext.Provider value={ctx}>{children}</TimelineContext.Provider>
          {!playing && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
              <div style={{ width: 101, height: 101, borderRadius: '50%', background: 'rgba(5,23,41,.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderLeft: `29px solid ${mint}`, borderTop: '19px solid transparent', borderBottom: '19px solid transparent', marginLeft: 8 }}/>
              </div>
            </div>
          )}
        </div>
        {/* PLAYER (below the app, never over it) */}
        <div style={{ position: 'absolute', left: 0, top: height, width, height: PLAYER_H, background: '#051729', borderTop: '1px solid rgba(255,255,255,.10)', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', boxSizing: 'border-box' }}>
          <div onClick={scrub} title="Jump to a point" style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 13, background: 'rgba(255,255,255,.08)', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, height: 13, width: Math.min(100, (time / duration) * 100).toFixed(2) + '%', background: mint, pointerEvents: 'none' }}/>
            {steps.map((s, k) => (
              <div key={k} onClick={stop(() => seek(s.t))} title={s.label} style={{ position: 'absolute', top: 0, left: ((s.t / duration) * 100).toFixed(2) + '%', width: 18, marginLeft: -9, height: 13, cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: 3, height: 13, background: k <= stepIdx ? '#051729' : 'rgba(255,255,255,.45)' }}/>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 27, right: 27, top: 13, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 27 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
              {steps.length > 0 && <span style={{ color: '#7A96B0', fontFamily: "'DM Mono', monospace", fontSize: 16, letterSpacing: '.06em' }}>Step {stepIdx + 1} of {steps.length}</span>}
              {steps.length > 0 && <span style={{ color: '#FFFFFF', fontWeight: 500, fontSize: 20, overflow: 'hidden', textOverflow: 'ellipsis' }}>{steps[stepIdx].label}</span>}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div onClick={stop(restart)} title="Back to start" style={btn}><svg width="20" height="20" viewBox="0 0 24 24"><rect x="4" y="4" width="2.6" height="16" fill={mint}/><path d="M20 4 L20 20 L8.5 12 Z" fill={mint}/></svg></div>
              <div onClick={stop(prevStep)} title="Previous step" style={btn}><svg width="21" height="21" viewBox="0 0 24 24"><path d="M11.5 5 L11.5 19 L2 12 Z" fill={mint}/><path d="M22 5 L22 19 L12.5 12 Z" fill={mint}/></svg></div>
              <div onClick={stop(() => setPlaying(p => !p))} title="Play / Pause" style={btn}>
                {playing
                  ? <span style={{ display: 'flex', gap: 4 }}><span style={{ width: 5, height: 20, background: mint, display: 'block' }}/><span style={{ width: 5, height: 20, background: mint, display: 'block' }}/></span>
                  : <span style={{ width: 0, height: 0, borderLeft: `16px solid ${mint}`, borderTop: '11px solid transparent', borderBottom: '11px solid transparent', display: 'block', marginLeft: 4 }}/>}
              </div>
              <div onClick={stop(nextStep)} title="Next step" style={btn}><svg width="21" height="21" viewBox="0 0 24 24"><path d="M2 5 L2 19 L11.5 12 Z" fill={mint}/><path d="M12.5 5 L12.5 19 L22 12 Z" fill={mint}/></svg></div>
              <span style={{ color: '#8FE8D4', fontFamily: "'DM Mono', monospace", fontSize: 16, letterSpacing: '.06em', marginLeft: 11 }}>{fmtClock(time)} / {fmtClock(duration)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BareClip({ chapter }) {
  const stageTime = useTime();
  const localT = stageTime / PACE_V4;
  const { messages, status } = buildChatStateV4(chapter.events, localT);
  const panelProgress = 1;
  const NAV_BY_CHAPTER = { 'rate-shop': 'quote', 'invoice-audit': 'audit', 'accessorials': 'quote', 'load-planning': 'orders', 'exception': 'track', 'claims': 'audit' };
  return (
    <div style={{ position: 'absolute', inset: 0, background: FP.bg, fontFamily: fpFont.body, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <TopNav active={NAV_BY_CHAPTER[chapter.id] || 'dashboard'}/>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', minWidth: 0, overflow: 'hidden' }}>
          {chapter.view(localT, chapter.dur)}
        </div>
        {!chapter.noPanel && (
          (chapter.id === 'invoice-audit' || chapter.id === 'rate-shop') ? (
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, display: 'flex', boxShadow: '-14px 0 40px rgba(11,17,23,0.22)', zIndex: 40 }}>
              <AIPanel messages={messages} status={status} openProgress={1} open chapter={chapter.title}/>
            </div>
          ) : (
            <AIPanel messages={messages} status={status} openProgress={1} open chapter={chapter.title}/>
          )
        )}
      </div>
    </div>
  );
}

function renderClip(chapterId) {
  const chapter = CHAPTERS_V4.find(c => c.id === chapterId);
  if (!chapter) { throw new Error('Unknown chapter: ' + chapterId); }
  document.title = 'FreightPOP AI — ' + chapter.title;
  ReactDOM.createRoot(document.getElementById('root')).render(
    <ClipStage duration={chapter.dur * PACE_V4} steps={(CLIP_STEPS[chapter.id] || []).map(s => ({ t: s.at * PACE_V4, label: s.label }))}><BareClip chapter={chapter}/></ClipStage>
  );
}

Object.assign(window, { ClipStage, BareClip, renderClip, CLIP_STEPS });
