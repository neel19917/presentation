// clip-standalone.jsx — renders ONE chapter of the v5 video with no chrome:
// no table-setter intro, no product top nav, no chapter pills, no controls.
// Loops continuously.

function ClipStage({ width = 1920, height = 1080, duration, background = '#EEF1F5', children }) {
  const [time, setTime] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const hostRef = React.useRef(null);

  React.useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const measure = () => setScale(Math.max(0.05, Math.min(el.clientWidth / width, el.clientHeight / height)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  React.useEffect(() => {
    let raf, last = null;
    const step = (ts) => {
      if (last != null) setTime(p => { const n = p + (ts - last) / 1000; return n >= duration ? 0 : n; });
      last = ts;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  const ctx = React.useMemo(() => ({ time, duration, playing: true, setTime }), [time, duration]);
  return (
    <div ref={hostRef} style={{ position: 'absolute', inset: 0, background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ width, height, background, position: 'relative', overflow: 'hidden', transform: `scale(${scale})`, transformOrigin: 'center center', flex: '0 0 auto' }}>
        <TimelineContext.Provider value={ctx}>{children}</TimelineContext.Provider>
      </div>
    </div>
  );
}

function BareClip({ chapter }) {
  const stageTime = useTime();
  const localT = stageTime / PACE_V4;
  const { messages, status } = buildChatStateV4(chapter.events, localT);
  const panelProgress = Math.max(0, Math.min(1, (stageTime - 0.1) / 0.9));
  return (
    <div style={{ position: 'absolute', inset: 0, background: FP.bg, fontFamily: fpFont.body, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <div style={{ flex: 1, position: 'relative', display: 'flex', minWidth: 0, overflow: 'hidden' }}>
          {chapter.view(localT, chapter.dur)}
        </div>
        {!chapter.noPanel && (
          <AIPanel messages={messages} status={status} openProgress={panelProgress} open={panelProgress > 0.1} chapter={chapter.title}/>
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
    <ClipStage duration={chapter.dur * PACE_V4}><BareClip chapter={chapter}/></ClipStage>
  );
}

Object.assign(window, { ClipStage, BareClip, renderClip });
