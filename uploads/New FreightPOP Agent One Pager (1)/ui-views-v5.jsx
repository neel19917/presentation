// ui-views-v3.jsx — Per-chapter views for v3.
// Each view takes a `localT` (seconds within the chapter walkthrough) so it
// can express internal phases without needing the parent Stage to know.

// ───────────────────────────────────────────────────────────────────────────
// Shared helpers
// ───────────────────────────────────────────────────────────────────────────
const V3 = {
  // Convenience getters that match FP tokens
  pageBg: FP.bg,
  maps: '#E8EEE9',   // Google Maps washed-green tile background
  mapsRoad: '#FFFFFF',
  mapsLine: '#D4DBD2',
};

function v3Clamp(v, a = 0, b = 1) { return Math.max(a, Math.min(b, v)); }
function v3Ease(t) { return 1 - Math.pow(1 - t, 3); }

const V3ViewWrap = ({ children, padded = true }) => (
  <div style={{
    flex: 1, display: 'flex', flexDirection: 'column',
    minWidth: 0, overflow: 'hidden',
    background: FP.bg,
    fontFamily: fpFont.body,
  }}>{children}</div>
);

// Re-export DataTable concept — concise version for v3
function V3Table({ columns, rows, highlightIds = [], flagIds = [], footer = null }) {
  return (
    <div style={{ background: '#fff', borderRadius: 4, border: `1px solid ${FP.borderLight}`, overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: columns.map(c => c.w || '1fr').join(' '),
        padding: '14px 22px',
        borderBottom: `2px solid ${FP.borderLight}`,
        background: '#fff',
      }}>
        {columns.map((c, i) => (
          <div key={i} style={{
            fontSize: 11.5, color: FP.subtle, fontWeight: 600,
            letterSpacing: '0.04em',
          }}>{c.label}</div>
        ))}
      </div>
      {rows.map((row, ri) => {
        const isH = highlightIds.includes(row.id);
        const isF = flagIds.includes(row.id);
        return (
          <div key={ri} style={{
            display: 'grid',
            gridTemplateColumns: columns.map(c => c.w || '1fr').join(' '),
            padding: '12px 22px',
            borderBottom: `1px solid ${FP.borderLight}`,
            background: isF ? FP.redLight : (isH ? FP.blueRow : '#fff'),
            alignItems: 'center',
          }}>
            {columns.map((c, ci) => (
              <div key={ci} style={{
                fontSize: 13, color: FP.text,
                fontFamily: c.mono ? fpFont.mono : fpFont.body,
                fontWeight: c.bold ? 600 : 400,
                fontVariantNumeric: 'tabular-nums',
              }}>{typeof row[c.key] === 'function' ? row[c.key]() : row[c.key]}</div>
            ))}
          </div>
        );
      })}
      {footer && (
        <div style={{
          padding: '12px 22px', background: '#FAFBFD',
          borderTop: `1px solid ${FP.borderLight}`,
          display: 'flex', alignItems: 'center', gap: 14,
          fontSize: 12, color: FP.subtle,
        }}>{footer}</div>
      )}
    </div>
  );
}

// Simple crossfade between sub-phases of a chapter view
function PhaseCross({ phase, children }) {
  // children is a map: { [phaseKey]: el }
  const keys = Object.keys(children);
  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      {keys.map(k => (
        <div key={k} style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          opacity: k === phase ? 1 : 0,
          transform: k === phase ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 420ms ease, transform 420ms ease',
          pointerEvents: k === phase ? 'auto' : 'none',
        }}>{children[k]}</div>
      ))}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 1. LOAD PLANNING — Austin's "AI Load Planner" UI
//    A (0–6):  Empty AI Load Planner page (search + pill tabs + empty state)
//    B (6–18): Coaching — config cards pop in one-by-one as chat asks
//    C (18+):  Execution — Truck card with capacity bars + multi-stop table
// ───────────────────────────────────────────────────────────────────────────
const FP_MINT_V = '#0F7B6C';
const FP_INK_V = '#0B1117';

function ViewLoadPlanning({ localT = 0 }) {
  let phase = 'A';
  if (localT >= 20) phase = 'C';
  else if (localT >= 4) phase = 'B';

  return (
    <V3ViewWrap>
      <AILPHeader phase={phase}/>
      <PhaseCross phase={phase}>{{
        A: <LP_Empty/>,
        B: <LP_PDFSetup localT={localT - 4}/>,
        C: <LP_Execution localT={localT - 20}/>,
      }}</PhaseCross>
    </V3ViewWrap>
  );
}

// Custom AI Load Planner page header (replaces the underline-tab PageHeader)
function AILPHeader({ phase }) {
  return (
    <div style={{
      padding: '24px 32px 18px',
      background: '#fff',
      borderBottom: `1px solid ${FP.borderLight}`,
    }}>
      <div style={{
        fontSize: 22, fontWeight: 700, color: FP_INK_V,
        fontFamily: fpFont.heading, letterSpacing: '-0.012em',
      }}>AI Load Planner</div>
    </div>
  );
}

// Pill tabs — Open / Dispatched / In Transit
function AILPPills({ active = 'Open' }) {
  const pills = ['Open', 'Dispatched', 'In Transit'];
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      {pills.map(p => {
        const isActive = p === active;
        return (
          <div key={p} style={{
            padding: '8px 18px',
            borderRadius: 999,
            background: isActive ? FP_INK_V : '#fff',
            color: isActive ? '#fff' : FP_INK_V,
            border: `1px solid ${isActive ? FP_INK_V : '#D5D9DE'}`,
            fontSize: 13, fontWeight: 500,
            fontFamily: fpFont.heading,
            letterSpacing: '-0.005em',
            whiteSpace: 'nowrap',
          }}>{p}</div>
        );
      })}
    </div>
  );
}

// Search + filter funnel — matches Austin's empty-state screenshot
function AILPSearch() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: '#fff',
        border: `1px solid #D5D9DE`,
        borderRadius: 4,
        padding: '8px 14px',
        width: 260,
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <circle cx="6" cy="6" r="4.5" stroke="#A1A8B0" strokeWidth="1.4"/>
          <path d="M9.5 9.5L13 13" stroke="#A1A8B0" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <div style={{ flex: 1, fontSize: 13, color: '#A1A8B0' }}>Search</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: FP_INK_V, letterSpacing: '0.08em', fontFamily: fpFont.mono }}>GO</div>
      </div>
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path d="M2 4h16l-6 8v6l-4-2v-4L2 4z" stroke="#A1A8B0" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// Phase A: empty state — "No open plans. Create a new plan to get started."
function LP_Empty() {
  return (
    <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden' }}>
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderRadius: 6, padding: '18px 22px',
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <AILPSearch/>
        <div style={{ flex: 1 }}/>
        <AILPPills active="Open"/>
      </div>
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderTop: 'none',
        borderRadius: '0 0 6px 6px',
        minHeight: 360,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#A8AFB6',
        fontSize: 15, fontFamily: fpFont.heading, fontWeight: 400,
      }}>
        No open plans. Create a new plan to get started.
      </div>
    </div>
  );
}

// Phase B: PDF setup — user drops a rules PDF; parser extracts; cards fill in;
// two need follow-up confirmation.
function LP_PDFSetup({ localT = 0 }) {
  // Sub-timeline (relative to start of Phase B):
  //   0    method picker visible (3 ways: PDF / chat / Q&A) — PDF preselected at 1.5
  //   4.5  PDF appears in the upload zone
  //   5.8  parsing animation begins
  //   9.0  parse complete — first 3 cards populate
  //   12.0 last 2 cards appear with "needs your input" status
  //   14.4 last 2 confirmed → both go green
  const methodOp = v3Clamp(1 - (localT - 1.0) / 0.6) * 0 + 1; // always visible (faded)
  const pdfDropped = localT > 4.0;
  const dropOp = v3Clamp((localT - 4.0) / 0.6);
  const parsing = localT > 5.8 && localT < 9.0;
  const parseProgress = v3Clamp((localT - 5.8) / 3.0);
  const parsed = localT > 9.0;

  const cards = [
    { id: 'geo',   title: 'Geography',           body: 'All open orders for all customers',                     parseAt: 9.2,  gap: false },
    { id: 'dates', title: 'Date Windows',        body: 'All open orders · no ship date cutoff',             parseAt: 9.2,  gap: false },
    { id: 'truck', title: 'Truck Constraints',   body: 'TRUCKLOAD 53FT · no max miles limit',               parseAt: 9.2, gap: false },
    { id: 'cap',   title: 'Capacity Thresholds', body: '85% capacity utilization', parseAt: 12.0, gap: true, confirmedAt: 14.6, gapPrompt: 'Not in PDF — recommend 85%' },
    { id: 'sched', title: 'Schedule',            body: 'Daily 6:00 AM · build & hold for approval', parseAt: 12.0, gap: true, confirmedAt: 14.6, gapPrompt: 'Not in PDF — set a cadence?' },
  ];

  return (
    <div style={{ padding: '14px 32px 16px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Method picker */}
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderRadius: 6, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{ fontSize: 12, color: FP.subtle, fontWeight: 600, letterSpacing: '0.04em', fontFamily: fpFont.mono }}>SETUP METHOD</div>
        <div style={{ width: 1, height: 18, background: FP.borderLight }}/>
        {[
          { id: 'pdf', label: 'Upload your rules PDF', active: true },
          { id: 'chat', label: 'Teach me conversationally', active: false },
          { id: 'qa', label: 'Step me through Q & A', active: false },
        ].map((m) => (
          <div key={m.id} style={{
            padding: '7px 14px', borderRadius: 999,
            border: `1px solid ${m.active ? FP_INK_V : '#D5D9DE'}`,
            background: m.active ? FP_INK_V : '#fff',
            color: m.active ? '#fff' : FP.text,
            fontSize: 12.5, fontWeight: 500, fontFamily: fpFont.heading,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {m.active && <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            {m.label}
          </div>
        ))}
      </div>

      {/* Two-column body: PDF upload zone (left) + Config cards (right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* PDF upload zone */}
        <div style={{
          background: '#fff', border: `1.5px dashed ${pdfDropped ? FP_MINT_V : '#C7D1DC'}`,
          borderRadius: 6, padding: 18,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 12, transition: 'border-color 300ms',
          position: 'relative', overflow: 'hidden',
        }}>
          {!pdfDropped && (
            <>
              <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
                <rect x="11" y="6" width="20" height="26" rx="2" stroke="#A1A8B0" strokeWidth="1.4" fill="#fff"/>
                <path d="M16 14h10 M16 19h10 M16 24h6" stroke="#A1A8B0" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M21 32v6 M17 36l4 4 4-4" stroke={FP_MINT_V} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div style={{ fontSize: 13, color: FP.subtle, textAlign: 'center' }}>Drop your planning rules PDF<br/>or click to browse</div>
            </>
          )}
          {pdfDropped && (
            <div style={{ width: '100%', opacity: dropOp, transform: `translateY(${(1-dropOp)*8}px)`, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* PDF preview thumbnail */}
              <div style={{
                background: '#FFF', border: `1px solid #D5D9DE`,
                borderRadius: 4, padding: 12,
                display: 'flex', flexDirection: 'column', gap: 8,
                boxShadow: '0 4px 12px rgba(15,23,42,0.06)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 30, height: 38, borderRadius: 2,
                    background: '#FFF1F1',
                    border: `1px solid #E5908F`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: fpFont.mono, fontSize: 9.5, fontWeight: 700,
                    color: '#C13D3C',
                  }}>PDF</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: FP.textDark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Logistics_Planning_Rules.pdf</div>
                    <div style={{ fontSize: 10.5, color: FP.subtle }}>14 pages · 312 KB</div>
                  </div>
                </div>
                {/* Lines as 'document content' preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 4 }}>
                  {[88, 92, 64, 78, 50].map((w, i) => (
                    <div key={i} style={{ height: 4, width: `${w}%`, background: i === 0 ? '#5A6168' : '#D5D9DE', borderRadius: 1 }}/>
                  ))}
                </div>
              </div>
              {parsing && (
                <div>
                  <div style={{ fontSize: 11, color: FP.subtle, fontWeight: 600, letterSpacing: '0.04em', marginBottom: 4, fontFamily: fpFont.mono }}>PARSING · {Math.round(parseProgress * 100)}%</div>
                  <div style={{ height: 4, background: '#F0F2F5', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${parseProgress * 100}%`, height: '100%', background: FP_MINT_V, transition: 'width 200ms' }}/>
                  </div>
                </div>
              )}
              {parsed && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px', borderRadius: 4,
                  background: '#E7F3F0', border: `1px solid ${FP_MINT_V}`,
                  fontSize: 11.5, color: FP_MINT_V, fontWeight: 600,
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke={FP_MINT_V} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Parsed · 5 categories extracted
                </div>
              )}
            </div>
          )}
        </div>

        {/* Config cards — always present from phase start; only the body + status chip change. */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignContent: 'start' }}>
          {cards.map((c) => {
            const populated = localT >= c.parseAt;
            const confirmed = c.gap && c.confirmedAt && localT >= c.confirmedAt;
            const needsInput = populated && c.gap && !confirmed;
            const fromPdf = populated && !c.gap;
            // Border / background colors
            let borderColor = '#DDE1E5';
            let borderLeft = `1px solid ${borderColor}`;
            let ribbon = '#fff';
            if (needsInput) { borderColor = '#E2A23A'; borderLeft = `3px solid #E2A23A`; ribbon = '#FFF8EC'; }
            else if (confirmed) { borderColor = '#C7E5DC'; borderLeft = `3px solid ${FP_MINT_V}`; ribbon = '#fff'; }
            else if (fromPdf) { borderColor = '#C7DAF1'; borderLeft = `3px solid ${FP.blue}`; ribbon = '#fff'; }
            return (
              <div key={c.id} style={{
                background: ribbon,
                border: `1px solid ${borderColor}`,
                borderLeft,
                borderRadius: 6,
                padding: '12px 14px',
                transition: 'background 280ms ease-out, border-color 280ms ease-out',
                minHeight: 76,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    fontSize: 13.5, fontWeight: 700, color: FP_INK_V,
                    fontFamily: fpFont.heading, letterSpacing: '-0.005em',
                  }}>{c.title}</div>
                  <div style={{ flex: 1 }}/>
                  {/* Status chip — the only thing that changes visually over time */}
                  {confirmed ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 10, fontWeight: 700, color: FP_MINT_V,
                      letterSpacing: '0.06em', fontFamily: fpFont.mono,
                    }}>
                      <svg width="9" height="9" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke={FP_MINT_V} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      CONFIRMED
                    </div>
                  ) : needsInput ? (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 10, fontWeight: 700, color: '#B07315',
                      letterSpacing: '0.06em', fontFamily: fpFont.mono,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: 3, background: '#E2A23A', animation: 'fp-pulse 1.2s ease-in-out infinite' }}/>
                      NEEDS YOU
                    </div>
                  ) : fromPdf ? (
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: FP.blue,
                      letterSpacing: '0.06em', fontFamily: fpFont.mono,
                    }}>FROM PDF</div>
                  ) : (
                    <div style={{
                      fontSize: 10, fontWeight: 700, color: '#9CA3AF',
                      letterSpacing: '0.06em', fontFamily: fpFont.mono,
                    }}>WAITING</div>
                  )}
                </div>
                <div style={{
                  marginTop: 8, fontSize: 12.5,
                  color: needsInput ? '#7A5C20' : (populated ? '#4D5562' : '#9CA3AF'),
                  lineHeight: 1.45,
                  fontStyle: populated ? 'normal' : 'italic',
                  transition: 'color 280ms ease-out',
                }}>{
                  needsInput ? c.gapPrompt
                  : populated ? c.body
                  : 'Awaiting setup…'
                }</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Phase C: Autonomous 6 AM run output.
//   localT 0–6 : plan overview — all 6 trucks the agent built, awaiting approval
//   localT 6+  : drill into Truck #1 (5 stops, required-arrival + distance per stop)
function LP_Execution({ localT = 0 }) {
  const sub = localT < 6 ? 'overview' : 'detail';
  return (
    <div style={{ padding: '14px 32px 20px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <PhaseCross phase={sub}>{{
        overview: <LP_PlanOverview localT={localT}/>,
        detail: <LP_TruckDetail localT={localT - 6}/>,
      }}</PhaseCross>
    </div>
  );
}

// Plan overview — the full day's plan: 6 trucks, before drilling into one.
function LP_PlanOverview({ localT = 0 }) {
  const cardReveal = v3Clamp(localT / 0.5);
  const trucks = [
    { n: 1, equip: 'TRUCKLOAD 53FT',   weight: '45,000 lb', fill: 78.5, stops: 5, miles: '1,180 mi', focus: true },
    { n: 2, equip: 'TRUCKLOAD 53FT',   weight: '42,300 lb', fill: 71.2, stops: 4, miles: '940 mi' },
    { n: 3, equip: 'LTL CONSOLIDATED', weight: '18,600 lb', fill: 88.0, stops: 6, miles: '1,420 mi' },
    { n: 4, equip: 'TRUCKLOAD 48FT',   weight: '39,800 lb', fill: 83.4, stops: 3, miles: '610 mi' },
    { n: 5, equip: 'TRUCKLOAD 53FT',   weight: '44,100 lb', fill: 76.9, stops: 5, miles: '2,050 mi' },
    { n: 6, equip: 'PARTIAL TL',       weight: '22,400 lb', fill: 85.5, stops: 4, miles: '760 mi' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, minHeight: 0 }}>
      {/* Pill tabs */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <AILPPills active="Open"/>
      </div>

      {/* Plan card */}
      <div style={{
        background: '#fff', border: `1px solid #DDE1E5`, borderRadius: 8, overflow: 'hidden',
        opacity: cardReveal, transform: `translateY(${(1 - cardReveal) * 12}px)`,
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      }}>
        {/* Header strip */}
        <div style={{
          padding: '14px 18px', background: '#F7F9FB', borderBottom: `1px solid #E5E8ED`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: FP_INK_V, fontFamily: fpFont.heading, letterSpacing: '-0.005em' }}>
              Today's plan — 6 trucks built
            </div>
            <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 4 }}>
              6:00 AM scheduled run · 47 open orders consolidated · honors your rules
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: '#FFF8EC', border: `1px solid #E2A23A`,
            fontSize: 10.5, fontWeight: 700, color: '#B07315',
            letterSpacing: '0.06em', fontFamily: fpFont.mono,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: '#E2A23A', animation: 'fp-pulse 1.2s ease-in-out infinite' }}/>
            AWAITING APPROVAL
          </div>
        </div>

        {/* Trucks table */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '90px 1.4fr 130px 1.2fr 90px 120px 110px',
            padding: '12px 18px', borderBottom: `1px solid ${FP.borderLight}`, gap: 12,
          }}>
            {['Truck', 'Equipment', 'Weight', '% to Capacity', 'Stops', 'Distance', ''].map((h, i) => (
              <div key={i} style={{ fontSize: 11, color: FP.subtle, fontWeight: 600, letterSpacing: '0.02em', textAlign: i === 6 ? 'right' : 'left' }}>{h}</div>
            ))}
          </div>
          {/* Body */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {trucks.map((t, i) => {
              const rowOp = v3Clamp((localT - (0.6 + i * 0.22)) / 0.4);
              const focus = t.focus;
              return (
                <div key={t.n} style={{
                  display: 'grid', gridTemplateColumns: '90px 1.4fr 130px 1.2fr 90px 120px 110px',
                  padding: '13px 18px', gap: 12, alignItems: 'center',
                  borderBottom: `1px solid #F2F4F7`,
                  borderLeft: focus ? `3px solid ${FP.blue}` : '3px solid transparent',
                  background: focus ? '#F3F8FE' : '#fff',
                  opacity: rowOp, transform: `translateX(${(1 - rowOp) * -6}px)`,
                  fontSize: 13, color: FP.text, fontVariantNumeric: 'tabular-nums',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TruckGlyph/>
                    <span style={{ fontWeight: 700, color: FP_INK_V }}>#{t.n}</span>
                  </div>
                  <div style={{ fontWeight: 600, color: FP_INK_V, letterSpacing: '-0.005em' }}>{t.equip}</div>
                  <div>{t.weight}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 80, height: 6, background: '#EDF0F3', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{ width: `${t.fill}%`, height: '100%', background: t.fill >= 85 ? '#56A34E' : FP.blue }}/>
                    </div>
                    <span style={{ fontSize: 12 }}>{t.fill.toFixed(1)}%</span>
                  </div>
                  <div>{t.stops} stops</div>
                  <div>{t.miles}</div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{
                      padding: '5px 12px', borderRadius: 6,
                      border: `1px solid ${focus ? FP.blue : '#D5D9DE'}`,
                      color: focus ? FP.blue : FP.subtle,
                      fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em',
                      fontFamily: fpFont.heading, whiteSpace: 'nowrap',
                    }}>{focus ? 'OPENING…' : 'REVIEW'}</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Footer */}
          <div style={{
            padding: '12px 18px', borderTop: `1px solid ${FP.borderLight}`, background: '#FAFBFD',
            display: 'flex', alignItems: 'center', gap: 18, fontSize: 12, color: FP.subtle,
          }}>
            <span><strong style={{ color: FP_INK_V }}>6</strong> trucks</span>
            <span><strong style={{ color: FP_INK_V }}>27</strong> stops</span>
            <span><strong style={{ color: FP_INK_V }}>47</strong> orders</span>
            <div style={{ flex: 1 }}/>
            <div style={{
              padding: '8px 16px', borderRadius: 6, background: FP_INK_V, color: '#fff',
              fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', fontFamily: fpFont.heading,
            }}>APPROVE ALL &amp; DISPATCH</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Drill-in: Truck #1 detail card — 5 stops, required-arrival + distance per stop.
function LP_TruckDetail({ localT = 0 }) {
  const truckReveal = v3Clamp(localT / 0.6);
  const stopRows = [
    { stop: 1, order: 'ORD-TEST-2-12-21-0057', from: '1234 Distribution Pkwy, Los Angeles, CA, 90040', to: '456 Airport Rd, Rancho Cucamonga, CA, 91801',          weight: '1,950 lb',  hu: 13, ship: '—', arrival: '4/28/2026', distance: '48 mi' },
    { stop: 2, order: 'ORD-TEST-2-12-21-0096', from: '1234 Distribution Pkwy, Los Angeles, CA, 90040', to: '330 Business Park Rd, San Diego, CA, 92169',           weight: '13,600 lb', hu: 17, ship: '—', arrival: '4/29/2026', distance: '172 mi', alt: true },
    { stop: 3, order: 'ORD-TEST-2-12-21-0061', from: '1234 Distribution Pkwy, Los Angeles, CA, 90040', to: '2856 Commerce Park Blvd Unit 9, Las Vegas, NV, 89193', weight: '24,000 lb', hu: 16, ship: '—', arrival: '5/2/2026',  distance: '332 mi' },
    { stop: 4, order: 'ORD-TEST-2-12-21-0085', from: '1234 Distribution Pkwy, Los Angeles, CA, 90040', to: '3400 Commerce Dr, Tucson, AZ, 85701',                  weight: '180 lb',    hu: 6,  ship: '—', arrival: '5/4/2026',  distance: '410 mi', alt: true },
    { stop: 5, order: 'ORD-TEST-2-12-21-0033', from: '1234 Distribution Pkwy, Los Angeles, CA, 90040', to: '2826 W Roosevelt St, Phoenix, AZ, 85009',              weight: '5,270 lb',  hu: 10, ship: '—', arrival: '5/5/2026',  distance: '218 mi' },
  ];
  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      {/* Back link + pill tabs */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 600, color: FP.blue, fontFamily: fpFont.heading }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 3L5 7l4 4" stroke={FP.blue} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All 6 trucks
        </div>
        <div style={{ flex: 1 }}/>
        <AILPPills active="Open"/>
        <div style={{ flex: 1 }}/>
        <div style={{ width: 96 }}/>
      </div>

      {/* Truck card */}
      <div style={{
        background: '#fff', border: `1px solid #DDE1E5`,
        borderRadius: 8, overflow: 'hidden',
        opacity: truckReveal,
        transform: `translateY(${(1 - truckReveal) * 12}px)`,
        flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0,
      }}>
        {/* Header strip */}
        <div style={{
          padding: '14px 18px',
          background: '#F7F9FB',
          borderBottom: `1px solid #E5E8ED`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <TruckGlyph/>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: FP_INK_V, fontFamily: fpFont.heading, letterSpacing: '-0.005em' }}>
              Truck #1 — TRUCKLOAD 53FT | 45,000 lb / 45,000 lb (MAX)
            </div>
            <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 4 }}>
              Max Volume: 3,930.21 · Packed Volume: 3,083.94 · Percent to Capacity: 78.50%
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <Chip text="Multi-Stop" icon="multi"/>
          <Chip text="78.5% Full" tone="success"/>
          <Chip text="1,180 mi"/>
          <Chip text="5 Stops"/>
          <div style={{
            padding: '8px 16px', borderRadius: 6,
            background: FP_INK_V, color: '#fff',
            fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em',
            fontFamily: fpFont.heading,
            whiteSpace: 'nowrap',
          }}>APPROVE &amp; DISPATCH</div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: '#A1A8B0' }}>
            <path d="M3 4h8 M4 4v8h6V4 M5.5 4V2.5h3V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Capacity bars */}
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${FP.borderLight}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11.5, color: FP.subtle, fontWeight: 500, marginBottom: 4 }}>Weight: 45,000 / 45,000 lbs (MAX)</div>
            <div style={{ height: 6, background: '#F0F2F5', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '100%', height: '100%', background: '#D63D3D' }}/>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11.5, color: FP.subtle, fontWeight: 500, marginBottom: 4 }}>Volume: 3,084 / 3,930 cu ft (MAX)</div>
            <div style={{ height: 6, background: '#F0F2F5', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: '78.5%', height: '100%', background: '#56A34E' }}/>
            </div>
          </div>
        </div>

        {/* Stops table */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 180px 1.4fr 1.4fr 80px 50px 100px 110px 90px 30px',
            padding: '12px 18px',
            borderBottom: `1px solid ${FP.borderLight}`,
            gap: 8,
            background: '#fff',
          }}>
            {['Stop', 'Order #', 'Ship-From', 'Ship-To', 'Weight', 'HU', 'Req. Ship Date', 'Req. Arrival Date', 'Distance', ''].map((h, i) => (
              <div key={i} style={{ fontSize: 11, color: FP.subtle, fontWeight: 600, letterSpacing: '0.02em' }}>{h}</div>
            ))}
          </div>
          {/* Body */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {stopRows.map((r, i) => (
              <div key={i} style={{
                display: 'grid',
                gridTemplateColumns: '50px 180px 1.4fr 1.4fr 80px 50px 100px 110px 90px 30px',
                padding: '10px 18px', gap: 8, alignItems: 'center',
                borderBottom: `1px solid #F2F4F7`,
                background: r.alt ? '#F7F9FB' : '#fff',
                fontSize: 12.5, color: FP.text,
                fontVariantNumeric: 'tabular-nums',
              }}>
                <div>{r.stop}</div>
                <div style={{ fontFamily: fpFont.mono, fontSize: 11 }}>{r.order}</div>
                <div style={{ color: '#5A6168' }}>{r.from}</div>
                <div style={{ color: '#5A6168' }}>{r.to}</div>
                <div>{r.weight}</div>
                <div>{r.hu}</div>
                <div style={{ color: FP.subtle }}>{r.ship}</div>
                <div>{r.arrival}</div>
                <div>{r.distance}</div>
                <div style={{ color: '#A1A8B0' }}>×</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ text, tone = 'neutral', icon = null }) {
  const fg = tone === 'success' ? FP_MINT_V : FP_INK_V;
  return (
    <div style={{
      padding: '6px 12px', borderRadius: 999,
      border: `1px solid #D5D9DE`,
      fontSize: 12, fontWeight: 600,
      color: fg, fontFamily: fpFont.heading,
      whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 5,
    }}>
      {icon === 'multi' && (
        <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6h6 M5 3l3 3-3 3" stroke={fg} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      {text}
    </div>
  );
}

function TruckGlyph() {
  return (
    <svg width="30" height="22" viewBox="0 0 32 22" fill="none">
      <rect x="1" y="4" width="18" height="13" rx="1" stroke={FP_INK_V} strokeWidth="1.4"/>
      <path d="M19 8 H26 L30 12 V17 H19 Z" stroke={FP_INK_V} strokeWidth="1.4" fill="none"/>
      <circle cx="7" cy="18.5" r="2.2" stroke={FP_INK_V} strokeWidth="1.4" fill="#fff"/>
      <circle cx="23" cy="18.5" r="2.2" stroke={FP_INK_V} strokeWidth="1.4" fill="#fff"/>
    </svg>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 2. ACCESSORIALS — shipment page w/ address-verify modal + Google Maps panel
// ───────────────────────────────────────────────────────────────────────────
function ViewAccessorials({ localT = 0 }) {
  // Timeline:
  //   0      Quote/Ship page is up; user has typed the ship-to and clicked VERIFY ADDRESSES
  //   0.5    Address Validator modal opens
  //   0–3.5  "Verifying…" — spinner + progress
  //   2–4    Satellite tile fades in (under the scan line)
  //   4+     Verified · annotations on the map
  //   7.5+   AI recommendations populate (lift gate + limited access)
  //   11+    User has saved as defaults → both pinned + toggles flip on in the page behind
  const verifying = localT < 4.0;
  const verifyProgress = v3Clamp(localT / 4.0);
  const verified = localT >= 4.0;
  const mapsReveal = v3Clamp((localT - 2.0) / 2.0);
  const savedDefaults = localT > 11.5;
  const modalOp = v3Clamp((localT - 0.0) / 0.5);

  return (
    <V3ViewWrap>
      {/* Quote/Ship page in the background — dimmed while the modal is up */}
      <div style={{ position: 'relative', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <QuoteShipBehind savedDefaults={savedDefaults}/>

        {/* Modal scrim */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(15, 23, 42, 0.32)',
          opacity: modalOp,
          transition: 'opacity 280ms ease-out',
        }}/>

        {/* Address Validator modal */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) translateY(${(1 - modalOp) * 8}px)`,
          width: 'min(1100px, calc(100% - 80px))',
          maxHeight: 'calc(100% - 60px)',
          background: '#fff', borderRadius: 8,
          boxShadow: '0 24px 60px rgba(15,23,42,0.30)',
          opacity: modalOp,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '18px 24px',
            background: '#F3F5F8',
            borderBottom: `1px solid ${FP.borderLight}`,
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              fontSize: 20, fontWeight: 700, color: FP.textDark,
              fontFamily: fpFont.heading, letterSpacing: '-0.012em',
            }}>Address Validator</div>
            <div style={{ flex: 1 }}/>
            <div style={{
              width: 24, height: 24, borderRadius: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: FP.subtle, fontSize: 18,
            }}>×</div>
          </div>

          {/* Body */}
          <div style={{
            flex: 1, minHeight: 0,
            display: 'grid', gridTemplateColumns: '340px 1fr',
            gap: 0,
          }}>
            {/* Left rail — verification + recs */}
            <div style={{
              padding: 24,
              borderRight: `1px solid ${FP.borderLight}`,
              display: 'flex', flexDirection: 'column', gap: 14,
              overflow: 'hidden', minHeight: 0,
            }}>
              {/* Ship From verified row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 10,
                  background: FP.green, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: FP.textDark, fontFamily: fpFont.heading }}>Ship From Address</div>
                  <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 6, letterSpacing: '0.04em', fontWeight: 600 }}>CURRENT ADDRESS</div>
                  <div style={{ fontSize: 13, color: FP.textDark, fontWeight: 600, marginTop: 4 }}>1 Rancho Cir, Lake Forest, CA, 92630, US</div>
                </div>
              </div>

              <div style={{ height: 1, background: FP.borderLight }}/>

              {/* Ship To verifying / verified */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: 10,
                  background: verified ? FP.green : '#fff',
                  border: `2px solid ${verified ? FP.green : FP.blue}`,
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginTop: 1,
                }}>
                  {verified
                    ? <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <div style={{ width: 8, height: 8, border: `2px solid ${FP.blue}`, borderTopColor: 'transparent', borderRadius: 5, animation: 'fp-pulse 0.8s linear infinite' }}/>
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: FP.textDark, fontFamily: fpFont.heading }}>Ship To Address</div>
                  <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 6, letterSpacing: '0.04em', fontWeight: 600 }}>{verified ? 'CURRENT ADDRESS' : `VERIFYING… ${Math.round(verifyProgress * 100)}%`}</div>
                  <div style={{ fontSize: 13, color: FP.textDark, fontWeight: 600, marginTop: 4, lineHeight: 1.45 }}>2826 W Roosevelt St, Phoenix, AZ, 85009, US</div>
                  <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 4 }}>O'Neil Storage</div>
                </div>
              </div>

              {/* AI accessorial recommendations — appear after verified */}
              {verified && (
                <>
                  <div style={{ height: 1, background: FP.borderLight }}/>
                  <div style={{ opacity: v3Clamp((localT - 4.5) / 0.4) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 16, height: 16 }}/>
                      <div style={{ fontSize: 11, color: FP.subtle, fontWeight: 700, letterSpacing: '0.06em', fontFamily: fpFont.mono }}>FREIGHTPOP AI</div>
                    </div>
                    <div style={{ fontSize: 13, color: FP.textDark, lineHeight: 1.5, marginBottom: 10 }}>
                      Based on satellite imagery, this destination needs:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <AccessorialRec
                        label="Destination lift gate"
                        reason="No dock — ground-level unload"
                        opacity={v3Clamp((localT - 7.5) / 0.5)}
                        accepted={savedDefaults}
                        saved={savedDefaults}
                      />
                      <AccessorialRec
                        label="Limited-access delivery"
                        reason="Storage facility · shared lot"
                        opacity={v3Clamp((localT - 8.0) / 0.5)}
                        accepted={savedDefaults}
                        saved={savedDefaults}
                      />
                    </div>
                  </div>
                </>
              )}

              <div style={{ flex: 1 }}/>

              {/* Action row */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{
                  padding: '10px 18px', borderRadius: 4,
                  border: `1px solid ${FP.textDark}`,
                  fontSize: 12, fontWeight: 700, color: FP.textDark,
                  letterSpacing: '0.06em', fontFamily: fpFont.heading,
                }}>CLOSE</div>
                <div style={{ flex: 1 }}/>
                {verified && (
                  <div style={{
                    padding: '10px 18px', borderRadius: 4,
                    background: savedDefaults ? FP.green : FP.blue,
                    color: '#fff',
                    fontSize: 12, fontWeight: 700,
                    letterSpacing: '0.06em', fontFamily: fpFont.heading,
                    display: 'flex', alignItems: 'center', gap: 6,
                    opacity: v3Clamp((localT - 4.5) / 0.5),
                  }}>
                    {savedDefaults && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {savedDefaults ? 'SAVED AS DEFAULTS' : 'SAVE AS DEFAULTS'}
                  </div>
                )}
              </div>
            </div>

            {/* Right — satellite map */}
            <div style={{
              position: 'relative',
              background: '#3a3a3a',
              overflow: 'hidden',
              minHeight: 420,
              display: 'flex', flexDirection: 'column',
            }}>
              <MapsPanel reveal={mapsReveal} verified={verified}/>
            </div>
          </div>
        </div>
      </div>
    </V3ViewWrap>
  );
}

// Quote/Ship page that sits behind the Address Validator modal.
// Mirrors the user's screenshot — Locations, Schedule Pickup, Shipment Details,
// Favorite Accessorials. The accessorial toggles flip on once defaults save.
function QuoteShipBehind({ savedDefaults }) {
  const infoDot = (
    <div style={{
      width: 13, height: 13, borderRadius: 7,
      border: `1px solid ${FP.subtle}`, color: FP.subtle,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 700, fontFamily: 'serif',
    }}>i</div>
  );
  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0, background: '#C7DBEF' }}>
      {/* Page header — white band: title + tabs (left) and order-import actions (right) */}
      <div style={{ background: '#fff', padding: '14px 28px 0', borderBottom: `1px solid ${FP.borderLight}`, flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: FP.textDark, fontFamily: fpFont.heading, letterSpacing: '-0.012em' }}>Quote/Ship</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginTop: 8, gap: 24 }}>
          {/* Tabs */}
          <div style={{ display: 'flex' }}>
            {['GENERAL', 'PRODUCT DETAILS', 'ADDITIONAL DETAILS', 'DOCUMENTS'].map((tab) => {
              const active = tab === 'GENERAL';
              return (
                <div key={tab} style={{
                  padding: '10px 16px', fontSize: 12.5, fontWeight: 700, letterSpacing: '0.06em',
                  color: active ? FP.blue : FP.subtle,
                  borderBottom: active ? `2px solid ${FP.blue}` : '2px solid transparent',
                  fontFamily: fpFont.heading, whiteSpace: 'nowrap',
                }}>{tab}</div>
              );
            })}
          </div>
          <div style={{ flex: 1 }}/>
          {/* Order import + outlined actions + process date */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 8 }}>
            <div style={{
              flex: '0 0 280px', position: 'relative', display: 'flex', alignItems: 'center', gap: 8,
              background: '#fff', border: `1px solid ${FP.borderInput}`, borderRadius: 4,
              padding: '11px 12px',
            }}>
              <div style={{ position: 'absolute', top: -7, left: 10, padding: '0 4px', background: '#fff', fontSize: 10.5, color: FP.subtle, letterSpacing: '0.04em' }}>Order Import</div>
              <FakeGearIcon/>
              <div style={{ flex: 1, fontSize: 12.5, color: FP.subtle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Use a comma to separate orders</div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={FP.subtle} strokeWidth="1.4"/><path d="M9.5 9.5L13 13" stroke={FP.subtle} strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            {['START CONSOLIDATION', 'RECENT QUOTES', 'TEMPLATES'].map((t) => (
              <div key={t} style={{
                padding: '11px 14px', borderRadius: 4, border: `1px solid ${FP.blue}`,
                color: FP.blue, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em',
                fontFamily: fpFont.heading, whiteSpace: 'nowrap',
              }}>{t}</div>
            ))}
            <div style={{ width: 148 }}>
              <FakeField label="Process Date" value="05/29/2026" trailing={<FakeCalIcon/>}/>
            </div>
          </div>
        </div>
      </div>

      {/* Blue body */}
      <div style={{ flex: 1, padding: '16px 28px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      {/* Two-column body — matches Quote/Ship layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignContent: 'start', flex: 1, minHeight: 0 }}>
        {/* LEFT COL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Locations */}
          <FakePanel title="Locations" right={<FakeToggleRow label="Search by Zip" on={false}/>}>
            <FakeField label="Ship From" value="FreightPOP Demo, 1 Rancho Cir, Lake Forest, CA, 92..." actions={[<FakeMiniBtn key="a" leadingPencil>FORM</FakeMiniBtn>, <FakeMiniBtn key="b">ADDRESS BOOK</FakeMiniBtn>]} icon="search"/>
            <FakeLabelRow text="↕ SWAP FROM & TO"/>
            <FakeField label="Ship To" value="O'Neil Storage, 2826 W Roosevelt St, Phoenix, AZ" actions={[<FakeMiniBtn key="a" leadingPencil>FORM</FakeMiniBtn>, <FakeMiniBtn key="b">ADDRESS BOOK</FakeMiniBtn>]} icon="search"/>
            <div style={{ marginTop: 8, color: FP.blue, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: 6, fontFamily: fpFont.heading }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke={FP.blue} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              VERIFY ADDRESSES
            </div>
          </FakePanel>

          {/* Shipment Details */}
          <FakePanel title="Shipment Details" right={<FakeGearIcon/>}>
            {/* Row summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '4px 0', borderBottom: `1px solid ${FP.borderLight}`, paddingBottom: 8 }}>
              <div style={{ color: FP.subtle, fontSize: 18, transform: 'rotate(90deg)' }}>⋯</div>
              <div style={{ color: FP.subtle, fontSize: 16 }}>⋮⋮</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark }}>0   0x0x0 @ 0 lb</div>
              <div style={{ fontSize: 12, color: FP.subtle }}>Generic Product</div>
              <div style={{ flex: 1 }}/>
              <div style={{ color: FP.blue, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>CUBISCAN</div>
              <div style={{ color: FP.subtle, fontSize: 14 }}>⋯</div>
            </div>
            {/* Quantity / Type / Container Type / Inner Pieces */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <FakeField label="Quantity" value="0" trailing={<FakeIconBtn/>}/>
              <FakeField label="Type" placeholder="" icon="search"/>
              <FakeField label="Container Type" placeholder="" dropdown info/>
              <div style={{
                padding: '10px 14px', borderRadius: 4, border: `1px solid ${FP.blue}`,
                color: FP.blue, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: fpFont.heading, textAlign: 'center', alignSelf: 'stretch',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>INNER PIECES</div>
            </div>
            {/* Length / Width / Height / Weight */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <FakeField label="Length" placeholder="" trailing="in"/>
              <FakeField label="Width" placeholder="" trailing="in"/>
              <FakeField label="Height" placeholder="" trailing="in"/>
              <FakeField label="Weight (per piece)" placeholder="" trailing="lb"/>
            </div>
            {/* Freight Class / NMFC / Density / Cubic Ft */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>
              <FakeField label="Freight Class" placeholder="" dropdown info/>
              <FakeField label="NMFC" placeholder="" trailing={<FakeIconBtn/>}/>
              <FakeField label="Density" placeholder="" readOnly/>
              <FakeField label="Cubic Ft" placeholder="" readOnly/>
            </div>
            {/* Description */}
            <FakeField label="Description" value="Generic Product" icon="search"/>
            {/* Non Stackable / Hazmat / References */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <FakeToggleRow label="Non Stackable" on={true}/>
                <FakeToggleRow label="Hazmat" on={false}/>
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{
                padding: '8px 16px', borderRadius: 4, border: `1px solid ${FP.blue}`,
                color: FP.blue, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: fpFont.heading,
              }}>REFERENCES</div>
            </div>
            {/* Add package */}
            <div style={{ display: 'flex', marginTop: 6 }}>
              <div style={{
                padding: '9px 16px', borderRadius: 4, border: `1px solid ${FP.blue}`,
                color: FP.blue, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: fpFont.heading, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontSize: 14, lineHeight: 1, fontWeight: 700 }}>+</span> ADD PACKAGE
              </div>
            </div>
          </FakePanel>
        </div>

        {/* RIGHT COL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Schedule Pickup */}
          <FakePanel title="Schedule Pickup" right={<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><FakeChevUp/>{infoDot}</div>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FakeField label="Pickup Date" placeholder="MM/DD/YYYY" trailing={<FakeCalIcon/>}/>
              <FakeField label="Delivery Date" placeholder="MM/DD/YYYY" trailing={<FakeCalIcon/>}/>
              <FakeField label="Ready Time" placeholder="hh:mm aa" trailing={<FakeClockIcon/>}/>
              <FakeField label="Open Time" placeholder="hh:mm aa" trailing={<FakeClockIcon/>}/>
              <FakeField label="Cutoff Time" placeholder="hh:mm aa" trailing={<FakeClockIcon/>}/>
              <FakeField label="Close Time" placeholder="hh:mm aa" trailing={<FakeClockIcon/>}/>
              <FakeField label="Transit Days" placeholder="" info readOnly/>
              <FakeField label="Pickup Request Email" placeholder="" info/>
              <FakeField label="Dock" placeholder="" icon="search" info/>
              <FakeField label="Equipment" placeholder="0 selected" dropdown info/>
            </div>
          </FakePanel>

          {/* Favorite Accessorials */}
          <FakePanel title="Favorite Accessorials">
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
              <FakeToggleRow label="Destination Lift Gate" on={savedDefaults} highlight={savedDefaults}/>
              <FakeToggleRow label="Limited Access Delivery" on={savedDefaults} highlight={savedDefaults}/>
              <FakeToggleRow label="Residential Delivery" on={false}/>
            </div>
          </FakePanel>

          {/* Carrier */}
          <FakePanel title="Carrier">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FakeField label="Carrier" value="Rate Shop" icon="search"/>
              <FakeField label="Service" placeholder="" icon="search"/>
              <FakeField label="Payee" value="Sender" dropdown/>
              <FakeField label="Payment Type" value="Prepaid (Carrier Account Selected Will Be Cha" />
            </div>
            {/* Account Details + Details button */}
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
              <FakeField label="Account Details" placeholder="" trailing={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: FP.subtle, fontSize: 14, lineHeight: 1 }}>×</span>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={FP.subtle} strokeWidth="1.4"/><path d="M9.5 9.5L13 13" stroke={FP.subtle} strokeWidth="1.4" strokeLinecap="round"/></svg>
                </div>
              }/>
              <div style={{
                padding: '0 16px', borderRadius: 4, border: `1px solid ${FP.borderInput}`,
                color: FP.subtle, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: fpFont.heading, display: 'flex', alignItems: 'center', gap: 6,
                background: '#F4F5F7', whiteSpace: 'nowrap',
              }}>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10l1-3 6-6 2 2-6 6-3 1z" stroke={FP.subtle} strokeWidth="1" fill="none" strokeLinejoin="round"/></svg>
                DETAILS
              </div>
            </div>
            {/* Confirmation Email + Send Notification */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FakeField label="Confirmation Email" placeholder=""/>
              <FakeField label="Send Notification" value="05/29/2026" trailing={<FakeCalIcon/>}/>
            </div>
            {/* Carrier toggles */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', marginTop: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FakeToggleRow label="Do Not Use Carrier API When Shipping" on={false}/>
                {infoDot}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FakeToggleRow label="Notify Upon Delivery" on={false}/>
                {infoDot}
              </div>
            </div>
          </FakePanel>
        </div>
      </div>
      </div>

      {/* Bottom action bar — white band spanning full width */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 28px', flexShrink: 0,
        background: '#fff', borderTop: `1px solid ${FP.borderLight}`,
      }}>
        <div style={{ fontSize: 12, color: FP.subtle }}>Total Handling Units: 0</div>
        <div style={{ fontSize: 12, color: FP.subtle }}>Total Weight: 0 LB</div>
        <div style={{ fontSize: 12, color: FP.subtle }}>Total Linear Feet: 0</div>
        <div style={{ flex: 1 }}/>
        <FakeBtn>⋯</FakeBtn>
        <FakeBtn>CLEAR SHIPMENT</FakeBtn>
        <FakeBtn>PREVIEW BOL</FakeBtn>
        <FakeBtn>SAVE SHIPMENT</FakeBtn>
        <FakeBtn>SPOT QUOTE</FakeBtn>
        <FakeBtn filled>RATE SHOP</FakeBtn>
      </div>
    </div>
  );
}

function FakeGearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 13a3 3 0 100-6 3 3 0 000 6z" stroke={FP.subtle} strokeWidth="1.3"/><path d="M10 1v2 M10 17v2 M1 10h2 M17 10h2 M3.5 3.5l1.5 1.5 M15 15l1.5 1.5 M3.5 16.5l1.5-1.5 M15 5l1.5-1.5" stroke={FP.subtle} strokeWidth="1.3" strokeLinecap="round"/></svg>
  );
}
function FakeChevUp() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 10l4-4 4 4" stroke={FP.subtle} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>;
}
function FakeCalIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" rx="1" stroke={FP.subtle} strokeWidth="1.2"/><path d="M2 6h12 M5 2v2 M11 2v2" stroke={FP.subtle} strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function FakeClockIcon() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke={FP.subtle} strokeWidth="1.2"/><path d="M8 4.5V8l2.5 1.5" stroke={FP.subtle} strokeWidth="1.2" strokeLinecap="round"/></svg>;
}
function FakeIconBtn() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="2" width="10" height="12" rx="1" stroke={FP.subtle} strokeWidth="1.2"/><path d="M5 6h6 M5 9h6 M5 12h4" stroke={FP.subtle} strokeWidth="1.2" strokeLinecap="round"/></svg>;
}

function FakeBtn({ children, filled = false }) {
  return (
    <div style={{
      padding: '7px 14px', borderRadius: 4,
      background: filled ? FP.navy : '#fff',
      color: filled ? '#fff' : FP.blue,
      border: `1px solid ${filled ? FP.navy : FP.blue}`,
      fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
      fontFamily: fpFont.heading, whiteSpace: 'nowrap',
    }}>{children}</div>
  );
}
function FakeMiniBtn({ children, leadingPencil = false }) {
  return (
    <div style={{
      padding: '5px 10px', borderRadius: 3,
      border: `1px solid ${FP.blue}`, color: FP.blue,
      fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
      fontFamily: fpFont.heading, whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center', gap: 5,
    }}>
      {leadingPencil && (
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10l1-3 6-6 2 2-6 6-3 1z" stroke={FP.blue} strokeWidth="1" fill="none" strokeLinejoin="round"/></svg>
      )}
      {children}
    </div>
  );
}
function FakePanel({ title, right, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 4,
      border: `1px solid ${FP.borderLight}`,
      padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 12,
      minHeight: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: FP.textDark, fontFamily: fpFont.heading, letterSpacing: '-0.005em' }}>{title}</div>
        <div style={{ flex: 1 }}/>
        {right}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
function FakeField({ label, value = '', placeholder = '', actions = [], icon = null, dropdown = false, info = false, trailing = null, readOnly = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 8 }}>
      <div style={{
        flex: 1, position: 'relative',
        border: `1px solid ${FP.borderInput}`, borderRadius: 4,
        padding: '17px 12px 7px',
        background: readOnly ? '#F4F5F7' : '#fff',
        display: 'flex', alignItems: 'center', gap: 6,
        minHeight: 42,
      }}>
        <div style={{ position: 'absolute', top: -7, left: 10, padding: '0 4px', background: '#fff', fontSize: 10.5, color: FP.subtle, letterSpacing: '0.04em', whiteSpace: 'nowrap', maxWidth: 'calc(100% - 20px)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
        <div style={{ flex: 1, fontSize: 12.5, color: value ? FP.textDark : FP.subtle, fontWeight: value ? 500 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value || placeholder}</div>
        {icon === 'search' && (
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke={FP.subtle} strokeWidth="1.4"/><path d="M9.5 9.5L13 13" stroke={FP.subtle} strokeWidth="1.4" strokeLinecap="round"/></svg>
        )}
        {dropdown && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M3 4l3 4 3-4" stroke={FP.subtle} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
        {typeof trailing === 'string' && (
          <div style={{ fontSize: 11.5, color: FP.subtle }}>{trailing}</div>
        )}
        {trailing && typeof trailing !== 'string' && trailing}
        {info && (
          <div style={{
            width: 13, height: 13, borderRadius: 7,
            border: `1px solid ${FP.subtle}`, color: FP.subtle,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 700, fontFamily: 'serif',
          }}>i</div>
        )}
      </div>
      {actions}
    </div>
  );
}
function FakeLabelRow({ text }) {
  return <div style={{ color: FP.blue, fontSize: 11.5, fontWeight: 700, letterSpacing: '0.04em', padding: '4px 0' }}>{text}</div>;
}
function FakeToggleRow({ label, on = false, highlight = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: 30, height: 16, borderRadius: 10,
        background: on ? FP.blue : '#C5CDD7',
        position: 'relative',
        transition: 'background 280ms',
        boxShadow: highlight ? `0 0 0 3px ${FP.blueLight}` : 'none',
      }}>
        <div style={{
          position: 'absolute', top: 1, left: on ? 15 : 1,
          width: 14, height: 14, borderRadius: 7,
          background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'left 280ms cubic-bezier(0.4,0,0.2,1)',
        }}/>
      </div>
      <div style={{ fontSize: 13, color: FP.textDark, fontWeight: highlight ? 600 : 400 }}>{label}</div>
    </div>
  );
}

function SiteDetailRow({ label, value, warn = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '4px 0', borderBottom: `1px dashed ${FP.borderLight}` }}>
      <div style={{ fontSize: 11.5, color: FP.subtle }}>{label}</div>
      <div style={{ fontSize: 12.5, color: warn ? '#B07315' : FP.textDark, fontWeight: 500, textAlign: 'right' }}>{value}</div>
    </div>
  );
}

function AccessorialRec({ label, reason, opacity, accepted, saved = false }) {
  return (
    <div style={{
      opacity,
      transition: 'opacity 280ms, background 240ms, border-color 240ms',
      padding: '10px 12px',
      background: accepted ? FP.greenLight : FP.blueLight,
      border: `1px solid ${accepted ? FP.green : FP.blue}`,
      borderRadius: 4,
      display: 'flex', alignItems: 'flex-start', gap: 10,
    }}>
      <div style={{
        width: 18, height: 18, borderRadius: 4,
        background: accepted ? FP.green : '#fff',
        border: `1.5px solid ${accepted ? FP.green : FP.blue}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginTop: 1,
      }}>
        {accepted && <svg width="10" height="10" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark }}>{label}</div>
        <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 2 }}>{reason}</div>
      </div>
      <StatusPill text={saved ? 'SAVED' : (accepted ? 'ON' : 'AI')} variant={saved ? 'success' : (accepted ? 'success' : 'info')}/>
    </div>
  );
}

// Real satellite imagery (Google Maps screenshot) with Google-Maps-style chrome
// + AI annotations overlaid.
function MapsPanel({ reveal = 1, verified = false }) {
  return (
    <div style={{
      position: 'relative',
      background: '#3a3a3a',
      overflow: 'hidden',
      flex: 1, minHeight: 0,
    }}>
      {/* Real satellite image as the base */}
      <img
        src={window.FP_IMG['accessorial-satellite.png']}
        alt="Satellite imagery — 2826 W Roosevelt St, Phoenix"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* AI annotation overlay */}
      <svg width="100%" height="100%" viewBox="0 0 952 488" preserveAspectRatio="xMidYMid slice" style={{ display: 'block', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {/* Address label badge */}
        {verified && (
          <g style={{ opacity: reveal }}>
            <rect x="240" y="160" width="200" height="34" rx="4" fill="#fff" stroke="#0F172A" strokeWidth="1.2"/>
            <circle cx="260" cy="177" r="7" fill="#EA4335" stroke="#fff" strokeWidth="1.5"/>
            <text x="274" y="181" fontSize="13" fontFamily="DM Sans, sans-serif" fontWeight="600" fill="#0F172A">O'Neil Storage · 2826 W</text>
          </g>
        )}

        {/* Annotation 1 — no marked dock on building face */}
        <g opacity={reveal}>
          <line x1="500" y1="220" x2="540" y2="100" stroke="#FFB300" strokeWidth="2" strokeDasharray="6 4"/>
          <circle cx="500" cy="220" r="6" fill="#FFB300" stroke="#fff" strokeWidth="1.5"/>
          <rect x="460" y="70" width="180" height="26" rx="3" fill="#FFB300"/>
          <text x="550" y="88" textAnchor="middle" fontSize="12" fill="#1B0F00" fontFamily="DM Sans, sans-serif" fontWeight="700">no loading dock</text>
        </g>

        {/* Annotation 2 — single bay shared access */}
        <g opacity={reveal}>
          <line x1="430" y1="370" x2="180" y2="450" stroke="#FFB300" strokeWidth="2" strokeDasharray="6 4"/>
          <circle cx="430" cy="370" r="6" fill="#FFB300" stroke="#fff" strokeWidth="1.5"/>
          <rect x="70" y="438" width="220" height="26" rx="3" fill="#FFB300"/>
          <text x="180" y="456" textAnchor="middle" fontSize="12" fill="#1B0F00" fontFamily="DM Sans, sans-serif" fontWeight="700">shared access off SR-55</text>
        </g>

        {/* Annotation 3 — freeway-adjacent */}
        <g opacity={reveal}>
          <line x1="800" y1="240" x2="860" y2="130" stroke="#FFB300" strokeWidth="2" strokeDasharray="6 4"/>
          <circle cx="800" cy="240" r="6" fill="#FFB300" stroke="#fff" strokeWidth="1.5"/>
          <rect x="778" y="100" width="170" height="26" rx="3" fill="#FFB300"/>
          <text x="863" y="118" textAnchor="middle" fontSize="12" fill="#1B0F00" fontFamily="DM Sans, sans-serif" fontWeight="700">storage facility</text>
        </g>
      </svg>

      {/* Google-Maps-style controls */}
      <div style={{
        position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6,
      }}>
        <div style={{
          background: '#fff', borderRadius: 2,
          padding: '5px 11px', fontSize: 11.5, fontWeight: 700,
          color: FP.textDark, fontFamily: fpFont.body,
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}>Satellite</div>
        <div style={{
          background: '#fff', borderRadius: 2,
          padding: '5px 11px', fontSize: 11.5, fontWeight: 500,
          color: FP.subtle, fontFamily: fpFont.body,
          boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
        }}>Map</div>
      </div>
      {/* Zoom controls */}
      <div style={{
        position: 'absolute', top: 12, right: 12,
        display: 'flex', flexDirection: 'column',
        background: '#fff', borderRadius: 2,
        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }}>
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#333', borderBottom: '1px solid #E5E5E5' }}>+</div>
        <div style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: '#333' }}>−</div>
      </div>
      {/* Attribution */}
      <div style={{
        position: 'absolute', bottom: 8, right: 12,
        background: 'rgba(255,255,255,0.92)',
        borderRadius: 2, padding: '2px 6px',
        fontSize: 10, color: '#444',
        fontFamily: fpFont.body,
      }}>Imagery ©2026 · Map data ©2026</div>
      <div style={{
        position: 'absolute', bottom: 8, left: 12,
        background: 'rgba(0,0,0,0.55)', color: '#fff',
        borderRadius: 2, padding: '2px 7px',
        fontSize: 10, fontFamily: fpFont.body,
      }}>200 ft</div>
      {/* Scan effect on reveal */}
      {reveal < 1 && (
        <div style={{
          position: 'absolute', left: 0, right: 0,
          top: `${reveal * 100}%`,
          height: 2, background: FP.blue,
          boxShadow: `0 0 16px ${FP.blue}`,
          opacity: 0.7,
        }}/>
      )}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 3. RATE SHOP — table + book/dock animation
// ───────────────────────────────────────────────────────────────────────────
function ViewRateShop({ localT = 0 }) {
  const shopping = localT > 8.0 && localT < 9.0;     // "Rate shopping…" spinner
  const ratesShown = localT >= 9.0;                  // results populate
  const picked = localT > 10.0;                      // Echo flagged as the AI pick + BOOK appears
  const booking = localT > 14.5 && localT < 16.2;    // booking in progress
  const booked = localT > 16.2;                      // → navigates to Shipment Details
  const rates = [
    { carrier: 'Echo Global', service: 'LTL Standard', transit: '2 days', perf: 94, price: '$1,048.13', best: true, allowed: true },
    { carrier: 'XPO Logistics', service: 'LTL Standard', transit: '2 days', perf: 96, price: '$1,142.40', allowed: true },
    { carrier: 'FedEx Freight Priority', service: 'LTL Priority', transit: '2 days', perf: 92, price: '$1,218.55', allowed: true },
    { carrier: 'Old Dominion', service: 'LTL Standard', transit: '3 days', perf: 97, price: '$1,283.90', allowed: true },
    { carrier: 'Saia LTL Freight', service: 'LTL Standard', transit: '2 days', perf: 91, price: '$1,341.20', allowed: true },
    { carrier: 'Estes Express', service: 'LTL Standard', transit: '3 days', perf: 88, price: '$1,008.00', allowed: false },
    { carrier: 'Forward Air', service: 'LTL Standard', transit: '4 days', perf: 89, price: '$1,156.80', allowed: false },
  ];

  // After booking, FreightPOP navigates to the Shipment Details page.
  if (booked) return <RateShopBooked localT={localT}/>;

  return (
    <V3ViewWrap>
      <PageHeader
        title="Quote/Ship — Rate Shop"
        tabs={['GENERAL', 'PRODUCT DETAILS', 'ADDITIONAL DETAILS', 'DOCUMENTS']}
        activeTab="GENERAL"
        actions={null}
      />
      <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden' }}>
        {/* Rules bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
          padding: '10px 14px', background: '#fff',
          border: `1px solid ${FP.blue}`, borderLeft: `4px solid ${FP.blue}`,
          borderRadius: 4,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: FP.blue, fontFamily: fpFont.mono, letterSpacing: '0.06em' }}>ACTIVE RULES</div>
          <div style={{ width: 1, height: 18, background: FP.borderLight }}/>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Cheapest preferred', '≥ 90% on-time', 'Respect tight transit', 'Preferred carriers'].map((t, i) => (
              <StatusPill key={i} text={t} variant="info"/>
            ))}
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontSize: 12, color: FP.subtle }}>Lane: <strong style={{ color: FP.textDark }}>LAX → PHX</strong> · 22,400 lb</div>
        </div>

        {/* Before rate shop runs — empty prompt; while running — spinner */}
        {!ratesShown ? (
          <div style={{
            background: '#fff', borderRadius: 4, border: `1px solid ${FP.borderLight}`,
            minHeight: 360, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 14, color: FP.subtle,
          }}>
            {shopping ? (
              <>
                <div style={{ width: 26, height: 26, border: `3px solid ${FP.blueLight}`, borderTopColor: FP.blue, borderRadius: 13, animation: 'fp-spin 0.8s linear infinite' }}/>
                <div style={{ fontSize: 15, fontFamily: fpFont.heading }}>Rate shopping this lane against your rules…</div>
              </>
            ) : (
              <>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="17" cy="17" r="11" stroke="#C0C7CF" strokeWidth="2"/>
                  <path d="M25 25l9 9" stroke="#C0C7CF" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div style={{ fontSize: 15, fontFamily: fpFont.heading }}>Rate shop this lane to compare carrier options.</div>
                <div style={{ fontSize: 12.5 }}>Lane LAX → PHX · 22,400 lb · LTL</div>
              </>
            )}
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 4, border: `1px solid ${FP.borderLight}`, overflow: 'hidden' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '24px 1.4fr 1.2fr 110px 110px 120px 90px',
              padding: '12px 20px', borderBottom: `2px solid ${FP.borderLight}`, gap: 12,
            }}>
              {['', 'Carrier', 'Service', 'Transit', 'Performance', 'Total', ''].map((h, i) => (
                <div key={i} style={{ fontSize: 11.5, color: FP.subtle, fontWeight: 600, letterSpacing: '0.04em' }}>{h}</div>
              ))}
            </div>
            {rates.map((r, i) => {
              const rowOp = v3Clamp((localT - (9.0 + i * 0.12)) / 0.4);
              return (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '24px 1.4fr 1.2fr 110px 110px 120px 90px',
                  padding: '12px 20px', gap: 12, alignItems: 'center',
                  borderBottom: i < rates.length - 1 ? `1px solid ${FP.borderLight}` : 'none',
                  background: (picked && r.best) ? FP.blueRow : (!r.allowed ? '#FAFBFC' : '#fff'),
                  opacity: (r.allowed ? 1 : 0.55) * rowOp,
                  transform: `translateY(${(1 - rowOp) * 6}px)`,
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 8,
                    border: `2px solid ${(picked && r.best) ? FP.blue : FP.borderInput}`,
                    background: (picked && r.best) ? FP.blue : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{(picked && r.best) && <div style={{ width: 6, height: 6, borderRadius: 3, background: '#fff' }}/>}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark, display: 'flex', alignItems: 'center', gap: 8 }}>
                    {r.carrier}
                    {picked && r.best && <StatusPill text="AI PICK" variant="info"/>}
                  </div>
                  <div style={{ fontSize: 12.5, color: FP.subtle }}>{r.service}</div>
                  <div style={{ fontSize: 12.5, color: FP.text }}>{r.transit}</div>
                  <div>
                    <StatusPill text={`${r.perf}%`} variant={r.perf >= 90 ? 'success' : 'danger'}/>
                    {!r.allowed && <span style={{ fontSize: 10, color: FP.red, marginLeft: 6 }}>below floor</span>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: FP.textDark, fontVariantNumeric: 'tabular-nums' }}>{r.price}</div>
                  <div>{r.best && picked && (booking
                    ? <StatusPill text="BOOKING…" variant="info"/>
                    : <MatButton size="sm" variant="filled">BOOK</MatButton>
                  )}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </V3ViewWrap>
  );
}

// Post-booking: FreightPOP navigates to the Shipment Details page —
// Shipment Confirmation summary + generated documents (BOL preview), matching the real UI.
function RateShopBooked({ localT = 0 }) {
  const t = localT - 16.2;
  const panelOp = v3Clamp(t / 0.5);
  const docsOp = v3Clamp((t - 0.4) / 0.5);
  const emailed = t > 1.0;
  const fields = [
    { label: 'Quote Id', value: '44313785' },
    { label: 'Shipment Id', value: '11252388' },
    { label: 'Shipment Quote', value: '$ 1,048.13' },
    { label: 'Quote', value: 'Q44313785' },
  ];
  const docs = [
    { name: 'BOL_11252388.pdf', meta: 'Bill of Lading · 1 page' },
    { name: 'PackingList_11252388.pdf', meta: 'Packing List · 1 page' },
    { name: 'ShippingLabel_11252388.pdf', meta: 'Shipping Label · 4×6' },
  ];
  return (
    <V3ViewWrap>
      <PageHeader
        title="Shipment Details"
        tabs={['GENERAL', 'PRODUCT DETAILS', 'ADDITIONAL DETAILS', 'DOCUMENTS']}
        activeTab="GENERAL"
        actions={null}
      />
      {/* Warning banner — verbatim from the FP UI */}
      <div style={{
        margin: '14px 32px 0', padding: '12px 16px',
        background: '#FBF6E7', border: `1px solid #E7D9A8`, borderRadius: 4,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12.5, color: '#5C5326', fontWeight: 600,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l6 11H2L8 2z" stroke="#B59A3A" strokeWidth="1.3" fill="none" strokeLinejoin="round"/><path d="M8 7v3 M8 11.6v.1" stroke="#B59A3A" strokeWidth="1.3" strokeLinecap="round"/></svg>
        Changes made to the shipment information may cause the carrier to change the quote provided. Each carrier treats this differently.
      </div>

      <div style={{
        flex: 1, minHeight: 0, padding: '14px 32px 20px',
        display: 'grid', gridTemplateColumns: '1.25fr 0.9fr', gap: 18, overflow: 'hidden',
      }}>
        {/* LEFT — Shipment Confirmation + Documents */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, opacity: panelOp, transform: `translateY(${(1 - panelOp) * 10}px)`, minHeight: 0 }}>
          <FakePanel title="Shipment Confirmation" right={<div style={{ fontSize: 11, fontWeight: 700, color: FP.blue, letterSpacing: '0.04em' }}>ADD A LEG</div>}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {fields.map((f) => <FakeField key={f.label} label={f.label} value={f.value} readOnly/>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr auto', gap: 12, alignItems: 'stretch', marginTop: 4 }}>
              <FakeField label="Confirmation Email" value="dock@yourcompany.com" readOnly/>
              <div style={{
                padding: '0 18px', borderRadius: 4, border: `1px solid ${FP.blue}`,
                color: FP.blue, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                fontFamily: fpFont.heading, display: 'flex', alignItems: 'center',
              }}>RESEND</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <FakeField label="Base Cost" value="$ 1,048.13" readOnly/>
              <FakeField label="Markup Rate" value="$ 0.00" readOnly/>
            </div>
          </FakePanel>

          <FakePanel title="Documents" right={<div style={{ fontSize: 11, color: FP.subtle, fontFamily: fpFont.mono, letterSpacing: '0.04em' }}>3 GENERATED</div>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, opacity: docsOp }}>
              {docs.map((d, i) => (
                <div key={d.name} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 12px', border: `1px solid ${FP.borderLight}`, borderRadius: 4,
                  background: i === 0 ? FP.blueRow : '#fff',
                  opacity: v3Clamp((t - 0.4 - i * 0.12) / 0.4),
                }}>
                  <div style={{
                    width: 26, height: 32, borderRadius: 2, background: '#FFF1F1',
                    border: `1px solid #E5908F`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: fpFont.mono, fontSize: 8, fontWeight: 700, color: '#C13D3C', flexShrink: 0,
                  }}>PDF</div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: FP.textDark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                    <div style={{ fontSize: 11, color: FP.subtle }}>{d.meta}</div>
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: FP.blue, letterSpacing: '0.06em', fontFamily: fpFont.heading }}>VIEW</div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: FP.subtle, letterSpacing: '0.06em', fontFamily: fpFont.heading }}>DOWNLOAD</div>
                </div>
              ))}
            </div>
            {/* Email-to-dock action (the agent was asked to send to the dock) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
              {emailed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, color: FP.green, fontWeight: 600 }}>
                  <svg width="13" height="13" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke={FP.green} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Emailed labels & BOL link to dock@yourcompany.com
                </div>
              ) : <div style={{ fontSize: 12, color: FP.subtle }}>Sending to dock@yourcompany.com…</div>}
              <div style={{ flex: 1 }}/>
              <div style={{
                padding: '8px 16px', borderRadius: 4, background: FP.navy, color: '#fff',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', fontFamily: fpFont.heading, whiteSpace: 'nowrap',
              }}>EMAIL SHIPPING LABELS / BOL LINK</div>
            </div>
          </FakePanel>
        </div>

        {/* RIGHT — generated BOL preview, styled like a real FP document */}
        <div style={{ opacity: docsOp, transform: `translateY(${(1 - docsOp) * 10}px)`, minHeight: 0 }}>
          <BookedDocPreview/>
        </div>
      </div>

      {/* Generated documents — each opens in its own window, cascading from the upper-left */}
      <DocPopupWindows localT={localT}/>

      {/* Success toast — bottom-left, verbatim from the FP UI */}
      <div style={{
        position: 'absolute', left: 28, bottom: 24,
        background: '#F4F8EC', border: `1px solid #CBDFA6`, borderRadius: 6,
        padding: '12px 16px', boxShadow: '0 10px 28px rgba(15,23,42,0.14)',
        display: 'flex', alignItems: 'flex-start', gap: 10, maxWidth: 420,
        opacity: panelOp, transform: `translateY(${(1 - panelOp) * 12}px)`,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginTop: 1, flexShrink: 0 }}><circle cx="9" cy="9" r="7.5" stroke="#6FA23A" strokeWidth="1.4"/><path d="M5.5 9l2.5 2.5 4.5-5" stroke="#6FA23A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#3F4D2A' }}>Success</div>
          <div style={{ fontSize: 12, color: '#566234', marginTop: 2 }}>Shipment Processed Successfully (Quote Id: 44313785 · Shipment Id: 11252388)</div>
        </div>
      </div>
    </V3ViewWrap>
  );
}

// A generated Bill of Lading, styled like a real FreightPOP document.
function BookedDocPreview() {
  return (
    <div style={{
      background: '#525659', borderRadius: 6, height: '100%',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      border: `1px solid ${FP.borderLight}`,
    }}>
      {/* PDF viewer chrome */}
      <div style={{
        height: 34, background: '#3a3d40', display: 'flex', alignItems: 'center', gap: 10,
        padding: '0 12px', color: '#E5E7EA', fontSize: 11.5, fontFamily: fpFont.mono,
      }}>
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>BOL_11252388.pdf</span>
        <span style={{ opacity: 0.7 }}>1 / 1</span>
        <span style={{ opacity: 0.7, fontSize: 14 }}>⌄</span>
      </div>
      {/* The page */}
      <div style={{ flex: 1, padding: 14, display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{
          background: '#fff', width: '100%', maxWidth: 360, borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)', padding: 18,
          display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <img src={window.FP_IMG['freightpop-logo-full.png']} alt="FreightPOP" style={{ height: 18 }}/>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#1B2A4E', fontFamily: fpFont.heading, letterSpacing: '-0.01em' }}>BILL OF LADING</div>
          </div>
          <div style={{ height: 1, background: '#E5E8ED' }}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { h: 'SHIP FROM', l: ['FreightPOP Demo', '1 Rancho Cir', 'Lake Forest, CA 92630'] },
              { h: 'SHIP TO', l: ["O'Neil Storage", '2826 W Roosevelt St', 'Phoenix, AZ 85009'] },
            ].map((b) => (
              <div key={b.h}>
                <div style={{ fontSize: 7, fontWeight: 700, color: '#9098A2', letterSpacing: '0.08em', marginBottom: 3 }}>{b.h}</div>
                {b.l.map((x, i) => <div key={i} style={{ fontSize: 8.5, color: i === 0 ? '#1B2A4E' : '#5A6168', fontWeight: i === 0 ? 700 : 400, lineHeight: 1.5 }}>{x}</div>)}
              </div>
            ))}
          </div>
          {/* mini table */}
          <div style={{ border: `1px solid #D9DEE3`, borderRadius: 2, overflow: 'hidden', marginTop: 2 }}>
            {['CARRIER · Echo Global · PRO 11252388', 'PIECES 16 · WEIGHT 22,400 lb · CLASS 70', 'PAYMENT Prepaid · TERMS EXW'].map((r, i) => (
              <div key={i} style={{ fontSize: 8, color: '#5A6168', padding: '5px 7px', borderBottom: i < 2 ? '1px solid #EAEDF0' : 'none', fontFamily: fpFont.mono }}>{r}</div>
            ))}
          </div>
          {[92, 70, 84, 60].map((w, i) => <div key={i} style={{ height: 3, width: `${w}%`, background: '#E3E7EB', borderRadius: 1 }}/>)}
        </div>
      </div>
    </div>
  );
}

// Generated documents that pop open in their own large PDF-viewer windows,
// cascading from the upper-left of the screen — mirrors the real FreightPOP
// "documents generated" behavior shown in the product demo.
function DocPopupWindows({ localT = 0 }) {
  const t = localT - 16.2;
  const wins = [
    { id: 'bol',      name: 'BOL_11252388.pdf',            kind: 'bol',      title: 'BILL OF LADING',    pages: 1, at: 0.6 },
    { id: 'list',     name: 'PackingList_11252388.pdf',    kind: 'list',     title: 'PACKING LIST',      pages: 1, at: 1.5 },
    { id: 'label',    name: 'ShippingLabels_11252388.pdf', kind: 'label',    title: 'SHIPPING LABELS',   pages: 1, at: 2.4 },
    { id: 'manifest', name: 'TruckloadManifest_11252388.pdf', kind: 'manifest', title: 'TRUCKLOAD MANIFEST', pages: 1, at: 3.3 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {wins.map((w, i) => (
        <DocWindow key={w.id} {...w} idx={i} z={10 + i} appear={t - w.at}/>
      ))}
    </div>
  );
}

function DocWindow({ name, kind, title, pages = 1, idx = 0, z, appear }) {
  const op = v3Clamp(appear / 0.5);
  if (op <= 0) return null;
  const ease = 1 - Math.pow(1 - op, 3);
  const left = 0 + idx * 36;
  const top = 0 + idx * 36;
  return (
    <div style={{
      position: 'absolute', left, top, width: 1000,
      height: 786, zIndex: z,
      background: '#525659', borderRadius: 2, overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(15,23,42,0.40), 0 8px 24px rgba(15,23,42,0.24)',
      display: 'flex', flexDirection: 'column',
      opacity: op,
      transform: `translateY(${(1 - ease) * 22}px)`,
      transformOrigin: 'top left',
    }}>
      {/* PDF viewer toolbar — dark chrome bar */}
      <div style={{
        height: 48, flexShrink: 0, background: '#323639',
        display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px',
        color: '#CDD0D3', fontSize: 18,
      }}>
        {/* hamburger */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        <span style={{ fontSize: 17, color: '#E8EAEC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 360 }}>{name}</span>
        <div style={{ flex: 1 }}/>
        {/* page nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, color: '#CDD0D3' }}>
          <span style={{ fontFamily: fpFont.mono }}>1</span>
          <span style={{ width: 30, height: 26, border: '1px solid #5A5E61', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fpFont.mono, fontSize: 14, color: '#E8EAEC' }}>1</span>
          <span style={{ color: '#8A8E91' }}>/ {pages}</span>
        </div>
        <div style={{ width: 1, height: 22, background: '#4A4E51' }}/>
        {/* zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>−</span>
          <span style={{ fontSize: 14, fontFamily: fpFont.mono, border: '1px solid #5A5E61', borderRadius: 3, padding: '3px 8px', color: '#E8EAEC' }}>73%</span>
          <span style={{ fontSize: 20, lineHeight: 1 }}>+</span>
        </div>
        <div style={{ width: 1, height: 22, background: '#4A4E51' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#CDD0D3' }}>
          {/* fit */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 7V3h4M15 7V3h-4M3 11v4h4M15 11v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          {/* rotate */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M14 7a5.5 5.5 0 10.5 4.5M14 3v4h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {/* download */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2v9M5.5 7.5L9 11l3.5-3.5M3.5 15h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {/* print */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 7V2.5h8V7M5 13H3.5V7h11v6H13M5 11h8v4H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
          {/* more */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="3.5" r="1.4" fill="currentColor"/><circle cx="9" cy="9" r="1.4" fill="currentColor"/><circle cx="9" cy="14.5" r="1.4" fill="currentColor"/></svg>
        </div>
      </div>

      {/* Body: thumbnail rail + page area */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Thumbnail rail */}
        <div style={{
          width: 168, flexShrink: 0, background: '#414549', overflow: 'hidden',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '20px 0',
        }}>
          {Array.from({ length: pages }).map((_, p) => (
            <div key={p} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 104, height: 134, background: '#fff', borderRadius: 1,
                outline: p === 0 ? '3px solid #5B9BD5' : '1px solid #2C2F31',
                overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.35)',
              }}>
                <div style={{ transform: 'scale(0.135)', transformOrigin: 'top left', width: 770, pointerEvents: 'none' }}>
                  <DocPage kind={kind} page={p}/>
                </div>
              </div>
              <span style={{ fontSize: 12, color: '#B7BBBE', fontFamily: fpFont.mono }}>{p + 1}</span>
            </div>
          ))}
        </div>
        {/* Page viewport */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', justifyContent: 'center', padding: '24px 0', minWidth: 0 }}>
          <div style={{
            width: 770, background: '#fff', alignSelf: 'flex-start',
            boxShadow: '0 4px 18px rgba(0,0,0,0.45)',
          }}>
            <DocPage kind={kind} page={0}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// A full letter-style document page, designed at 770px content width so the
// thumbnail can scale it down and the viewport can show it large.
function DocPage({ kind, page = 0 }) {
  if (kind === 'bol') return <DocPageBOL/>;
  if (kind === 'list') return <DocPageList/>;
  if (kind === 'label') return <DocPageLabel/>;
  if (kind === 'manifest') return <DocPageManifest/>;
  return null;
}

const docBox = { border: '1px solid #2C2C2C', display: 'flex', flexDirection: 'column' };
const docCell = (extra) => ({ borderRight: '1px solid #2C2C2C', padding: '5px 7px', fontSize: 12, color: '#222', ...extra });

const DOC_BLUE = '#4F8FC9';

function DocSecBar({ children, style }) {
  return (
    <div style={{ background: DOC_BLUE, color: '#fff', textAlign: 'center', fontSize: 12.5, fontWeight: 600, padding: '4px 0', letterSpacing: '0.02em', ...style }}>{children}</div>
  );
}

function DocBarcode({ h = 46, n = 58 }) {
  return (
    <div style={{ display: 'flex', gap: 1.4, height: h, alignItems: 'stretch' }}>
      {Array.from({ length: n }).map((_, i) => <div key={i} style={{ flex: (i * 7) % 3 === 0 ? 2.4 : 1, background: (i * 5) % 4 === 0 ? 'transparent' : '#111' }}/>)}
    </div>
  );
}

// ── BILL OF LADING ──────────────────────────────────────────────────────────
function DocPageBOL() {
  const ld = { fontSize: 11.5, color: '#222', lineHeight: 1.5 };
  const tplShip = '0.7fr 0.9fr 0.6fr 2fr 0.9fr 1fr 0.9fr';
  return (
    <div style={{ padding: '28px 34px 12px', color: '#222', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1.2fr', alignItems: 'start', gap: 12, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, color: '#222', marginBottom: 4 }}>Pro #:</div>
          <div style={{ border: '1px solid #2C2C2C', height: 54 }}/>
        </div>
        <div style={{ textAlign: 'center', paddingTop: 6 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: DOC_BLUE, fontFamily: fpFont.heading, letterSpacing: '0.01em' }}>Bill of Lading</div>
          <div style={{ fontSize: 11.5, color: DOC_BLUE, marginTop: 2 }}>BOL#: SHP-11252388</div>
        </div>
        <div style={{ textAlign: 'right', paddingTop: 4 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: '#222', fontFamily: fpFont.mono }}>09/08/2025</div>
          <div style={{ fontSize: 15, fontWeight: 800, color: '#222', marginTop: 4, letterSpacing: '0.04em' }}>Echo Global</div>
          <div style={{ fontSize: 11.5, color: '#222', marginTop: 2 }}>Service: <b>TRUCKLOAD</b></div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 18, fontSize: 11.5, marginBottom: 10 }}>
        <span style={{ fontWeight: 700 }}>Payment Terms</span>
        <span>&#9744; Prepaid</span><span>&#9744; Collect</span><span>&#9745; 3rd Party</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 0.5fr' }}>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>Shipper</DocSecBar>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>Consignee</DocSecBar>
        <DocSecBar>Stop # 1 of 1</DocSecBar>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', border: '1px solid #2C2C2C', borderTop: 'none' }}>
        <div style={{ ...ld, borderRight: '1px solid #2C2C2C', padding: '8px 10px' }}>
          FreightPOP Demo<br/>1 Rancho Cir<br/>Lake Forest, CA, 92630, US<br/>9497651574
        </div>
        <div style={{ ...ld, padding: '8px 10px' }}>
          O'Neil Storage<br/>2826 W Roosevelt St<br/>Phoenix, AZ, 85009, US<br/>test@freightpop.com
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 8 }}>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>Order Number</DocSecBar>
        <DocSecBar>PO Number</DocSecBar>
      </div>
      <div style={{ height: 22, border: '1px solid #2C2C2C', borderTop: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ borderRight: '1px solid #2C2C2C' }}/><div/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginTop: 8 }}>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>Pickup Instructions</DocSecBar>
        <DocSecBar>Delivery Instructions</DocSecBar>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #2C2C2C', borderTop: 'none' }}>
        <div style={{ ...ld, fontSize: 10.5, borderRight: '1px solid #2C2C2C', padding: '6px 10px' }}>
          These Are Instructions For Pickup. 123122<br/>Carrier Provided Quote Number: Q37163061
        </div>
        <div style={{ padding: '6px 10px', minHeight: 30 }}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: 8 }}>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>Billing Party</DocSecBar>
        <DocSecBar style={{ borderRight: '1px solid #fff' }}>International Broker</DocSecBar>
        <DocSecBar style={{ background: '#D8362A' }}>Hazmat Info</DocSecBar>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', border: '1px solid #2C2C2C', borderTop: 'none' }}>
        <div style={{ ...ld, fontSize: 10.5, borderRight: '1px solid #2C2C2C', padding: '6px 10px' }}>
          FreightPOP<br/>1 Rancho Cir<br/>Lake Forest, CA, 92630, US<br/>9999999999
        </div>
        <div style={{ borderRight: '1px solid #2C2C2C' }}/><div/>
      </div>
      <DocSecBar style={{ marginTop: 8 }}>Shipment Information</DocSecBar>
      <div style={{ border: '1px solid #2C2C2C', borderTop: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: tplShip, borderBottom: '1px solid #2C2C2C' }}>
          {['Qty HU', 'TYPE', 'HM', 'DESCRIPTION', 'PIECES', 'WEIGHT', 'NMFC'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 10.5, borderRight: i < 6 ? '1px solid #2C2C2C' : 'none' })}>{h}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: tplShip, borderBottom: '1px solid #ccc' }}>
          {['12', 'PALLET', '', 'Generic Product   DIMS 48X40X12 IN', '', '1,800.0 LB', ''].map((c, i) => <div key={i} style={docCell({ fontSize: 11, borderRight: i < 6 ? '1px solid #2C2C2C' : 'none' })}>{c}</div>)}
        </div>
        {Array.from({ length: 3 }).map((_, r) => (
          <div key={r} style={{ display: 'grid', gridTemplateColumns: tplShip, borderBottom: r < 2 ? '1px solid #ccc' : 'none', height: 20 }}>
            {Array.from({ length: 7 }).map((_, i) => <div key={i} style={{ borderRight: i < 6 ? '1px solid #2C2C2C' : 'none' }}/>)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PACKING LIST ──────────────────────────────────────────────────────────
function DocPageList() {
  const ld = { fontSize: 11.5, color: '#333', lineHeight: 1.5 };
  const tpl = '0.7fr 0.6fr 0.7fr 1fr 0.9fr 1.4fr 1.6fr 1fr';
  return (
    <div style={{ padding: '30px 34px 16px', color: '#222', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#222', letterSpacing: '-0.01em' }}>Packing List</div>
        <div style={{ fontSize: 11.5, color: '#333', lineHeight: 1.7 }}>
          <div><span style={{ color: '#777' }}>Date (MM/DD/YYYY):</span> <b>09/08/2025</b></div>
          <div><span style={{ color: '#777' }}>Order Number:</span></div>
          <div><span style={{ color: '#777' }}>Shipment ID:</span> <b>11252388</b></div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#222', marginBottom: 3 }}>SHIP FROM:</div>
          <div style={ld}>FreightPOP Demo<br/>1 Rancho Cir<br/>Lake Forest, CA, 92630<br/>9497651574, TEST@freightpop.com</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#222', marginBottom: 3 }}>SHIP TO:</div>
          <div style={ld}>O'Neil Storage<br/>2826 W Roosevelt St<br/>Phoenix, AZ, 85009<br/>9999999999, test@freightpop.com</div>
        </div>
      </div>
      <div style={{ ...docBox, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr 1fr' }}>
          {['PO Number', 'SO Number', 'CARRIER', 'PAYER'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 11, borderRight: i < 3 ? '1px solid #2C2C2C' : 'none' })}>{h}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr 1fr', borderTop: '1px solid #2C2C2C' }}>
          {['', '', 'Echo Global', 'Prepaid'].map((v, i) => <div key={i} style={docCell({ fontSize: 11, borderRight: i < 3 ? '1px solid #2C2C2C' : 'none', minHeight: 18 })}>{v}</div>)}
        </div>
      </div>
      <div style={{ ...docBox, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {['Incoterms', 'Payment Terms', 'Due Date'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 11, borderRight: i < 2 ? '1px solid #2C2C2C' : 'none' })}>{h}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid #2C2C2C' }}>
          {['EXW', '', ''].map((v, i) => <div key={i} style={docCell({ fontSize: 11, borderRight: i < 2 ? '1px solid #2C2C2C' : 'none', minHeight: 18 })}>{v}</div>)}
        </div>
      </div>
      <div style={{ ...docBox, marginBottom: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: tpl }}>
          {['Line No', 'Qty', 'UOM', 'Item#', 'SKU', 'Serial Numbers', 'DESCRIPTION', 'Package ID'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 10, borderRight: i < 7 ? '1px solid #2C2C2C' : 'none' })}>{h}</div>)}
        </div>
        <div style={{ height: 22, borderTop: '1px solid #2C2C2C' }}/>
      </div>
      <div style={{ ...docBox, marginBottom: 14 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {['Total Items: 0', 'Total Packages: 13', 'Total Weight: 3600 lbs'].map((v, i) => <div key={i} style={docCell({ fontSize: 11.5, fontWeight: 700, borderRight: i < 2 ? '1px solid #2C2C2C' : 'none' })}>{v}</div>)}
        </div>
      </div>
      <div style={{ border: '1px solid #2C2C2C', padding: '8px 12px', fontSize: 9, color: '#333', lineHeight: 1.55 }}>
        <div style={{ textAlign: 'center', fontWeight: 700, marginBottom: 4 }}>Package ID: 1-1 TRUCKLOAD 0X0X0 1800 In/Lb</div>
        Package ID: 2-1 PALLET 48X40X12 150 In/Lb &middot; 2-2 PALLET 48X40X12 150 In/Lb &middot; 2-3 PALLET 48X40X12 150 In/Lb &middot; 2-4 PALLET 48X40X12 150 In/Lb &middot; 2-5 PALLET 48X40X12 150 In/Lb &middot; 2-6 PALLET 48X40X12 150 In/Lb &middot; 2-7 PALLET 48X40X12 150 In/Lb &middot; 2-8 PALLET 48X40X12 150 In/Lb &middot; 2-9 PALLET 48X40X12 150 In/Lb &middot; 2-10 PALLET 48X40X12 150 In/Lb &middot; 2-11 PALLET 48X40X12 150 In/Lb &middot; 2-12 PALLET 48X40X12 150 In/Lb<br/>Tracking Number: FRTPOP-341271380
      </div>
      <div style={{ fontSize: 8.5, color: '#666', marginTop: 8, lineHeight: 1.5 }}>The shipping location certifies that this invoice is accurate and authentic. These commodities, technologies, or software were exported in accordance with the applicable export regulations.</div>
    </div>
  );
}

// ── SHIPPING LABEL ──────────────────────────────────────────────────────────
function DocPageLabel() {
  const red = { color: '#D8362A', fontWeight: 700 };
  const bd = '1px solid #2C2C2C';
  return (
    <div style={{ padding: 26, color: '#222', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: bd }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: bd }}>
          <div style={{ borderRight: bd, padding: '8px 10px', fontSize: 11.5, lineHeight: 1.5 }}>
            <div style={red}>FROM :</div>FreightPOP Demo<br/>1 Rancho Cir<br/>Lake Forest, CA, 92630<br/>9497651574
          </div>
          <div style={{ padding: '8px 10px', fontSize: 11.5, lineHeight: 1.5 }}>
            <div style={red}>TO :</div>O'Neil Storage<br/>2826 W Roosevelt St<br/>Phoenix, AZ, 85009<br/>9999999999
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: bd }}>
          <div style={{ borderRight: bd, padding: '8px 10px' }}>
            <div style={{ fontSize: 11.5 }}>To Zip :&nbsp;&nbsp;85009</div>
            <div style={{ marginTop: 8 }}><DocBarcode h={52} n={50}/></div>
          </div>
          <div style={{ padding: '8px 10px', fontSize: 11.5, lineHeight: 1.5 }}>
            <div style={red}>Mark For :</div>O'Neil Storage<br/>2826 W Roosevelt St<br/>Phoenix, AZ, 85009<br/>9999999999
          </div>
        </div>
        <div style={{ borderBottom: bd, textAlign: 'center', fontSize: 11.5, padding: '9px 0' }}>PONumber:</div>
        <div style={{ borderBottom: bd, textAlign: 'center', fontSize: 11.5, padding: '9px 0' }}>Label Create Date:09/08/2025</div>
        <div style={{ borderBottom: bd, padding: '8px 12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5 }}><span>Description:</span><span>QTY: 0</span></div>
          <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>UPC:</div>
          <div style={{ fontSize: 26, fontWeight: 700, textAlign: 'center', margin: '8px 0' }}>Category:</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: bd }}>
          <div style={{ borderRight: bd, padding: '9px 12px', fontSize: 11.5 }}>POOL ID:</div>
          <div style={{ padding: '9px 12px', fontSize: 11.5 }}>Store #:</div>
        </div>
        <div style={{ borderBottom: bd, padding: '9px 12px', fontSize: 11.5 }}>Event :</div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontSize: 11.5, marginBottom: 8 }}>(00) Serial Container Number:</div>
          <DocBarcode h={50} n={74}/>
        </div>
      </div>
    </div>
  );
}

// ── TRUCKLOAD SHIPPING MANIFEST ───────────────────────────────────────────────
function DocPageManifest() {
  const bd = '1px solid #2C2C2C';
  const ld = { fontSize: 11, color: '#333', lineHeight: 1.5 };
  const tplD = '0.6fr 2fr 0.9fr 1.1fr 0.7fr 1fr 0.8fr';
  const line = { flex: 1, borderBottom: '1px solid #999' };
  return (
    <div style={{ padding: '28px 34px 14px', color: '#222', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', fontSize: 19, fontWeight: 700, color: DOC_BLUE, marginBottom: 18, fontFamily: fpFont.heading }}>Truckload Shipping Manifest</div>
      <div style={{ marginBottom: 8, fontSize: 11 }}><span style={{ fontWeight: 700 }}>Date :</span> 9/8/2025</div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700 }}>Shipper</div>
        <div style={ld}>FreightPOP Demo<br/>1 Rancho Cir<br/>Lake Forest, CA, 92630<br/>9497651574</div>
      </div>
      <DocSecBar>Carrier Information</DocSecBar>
      <div style={{ border: bd, borderTop: 'none', padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 14, columnGap: 30, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, fontSize: 11.5 }}><span style={{ fontWeight: 700 }}>Carrier Name</span><span>Echo Global</span></div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11.5, alignItems: 'baseline' }}><span style={{ fontWeight: 700 }}>Driver Name</span><span style={line}/></div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11.5, alignItems: 'baseline' }}><span style={{ fontWeight: 700 }}>Trailer No.:</span><span style={line}/></div>
        <div style={{ display: 'flex', gap: 8, fontSize: 11.5, alignItems: 'baseline' }}><span style={{ fontWeight: 700 }}>Seal No.:</span><span style={line}/></div>
      </div>
      <DocSecBar>Pickups &amp; Deliveries</DocSecBar>
      <div style={{ border: bd, borderTop: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 2.4fr 1fr 1.4fr', borderBottom: bd, background: '#F4F6F8' }}>
          {['Type (P/D)', 'Location', 'Date/Hours', 'BOL/Ref 1 /Ref 2'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 10, borderRight: i < 3 ? bd : 'none' })}>{h}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '0.6fr 2.4fr 1fr 1.4fr' }}>
          <div style={docCell({ fontSize: 11, borderRight: bd })}>P</div>
          <div style={docCell({ fontSize: 10.5, borderRight: bd })}>FreightPOP Demo, 1 Rancho Cir, Lake Forest, CA, 92630, US</div>
          <div style={docCell({ borderRight: bd })}/>
          <div style={docCell({ borderRight: 'none' })}/>
        </div>
      </div>
      <div style={{ border: bd, borderTop: 'none', marginBottom: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: tplD, borderBottom: bd, background: '#F4F6F8' }}>
          {['Type (P/D)', 'Location', 'Date/Hours', 'BOL/Ref 1 /Ref 2', 'Quantity', 'Package Type', 'Total Weight'].map((h, i) => <div key={h} style={docCell({ fontWeight: 700, fontSize: 9.5, borderRight: i < 6 ? bd : 'none' })}>{h}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: tplD }}>
          <div style={docCell({ fontSize: 11, borderRight: bd })}>D</div>
          <div style={docCell({ fontSize: 10, borderRight: bd })}>O'Neil Storage, 2826 W Roosevelt St, Phoenix, AZ, 85009, US</div>
          <div style={docCell({ fontSize: 9.5, borderRight: bd })}>09/08/2025</div>
          <div style={docCell({ borderRight: bd })}/>
          <div style={docCell({ fontSize: 11, borderRight: bd })}>12</div>
          <div style={docCell({ fontSize: 10.5, borderRight: bd })}>PALLET</div>
          <div style={docCell({ fontSize: 11, borderRight: 'none' })}>1800</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: tplD, marginBottom: 18 }}>
        <div/><div/><div/>
        <div style={{ textAlign: 'right', fontSize: 12, fontWeight: 700, padding: '4px 7px' }}>Grand Total</div>
        <div style={{ fontSize: 11, padding: '4px 7px' }}>12</div>
        <div/>
        <div style={{ fontSize: 11, padding: '4px 7px' }}>1800</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 40, rowGap: 16, marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 11.5 }}><span style={{ fontWeight: 700 }}>Shipper's Signature:</span><span style={line}/></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 11.5 }}><span style={{ fontWeight: 700 }}>Driver's Signature:</span><span style={line}/></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 11.5 }}><span style={{ fontWeight: 700 }}>Date</span><span style={line}/></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 11.5 }}><span style={{ fontWeight: 700 }}>Date</span><span style={line}/></div>
      </div>
      <div style={{ textAlign: 'right', fontSize: 11.5, fontWeight: 700 }}>Shipment ID: 11252388</div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 4. EXCEPTION — tracking dashboard + carrier email correspondence
// ───────────────────────────────────────────────────────────────────────────
function ViewException({ localT = 0 }) {
  const showAlert = localT > 2.0;
  const showCarrierReply = localT > 6.0;
  const showNotification = localT > 14.5;

  // Shipments table — matches the real Track / In Transit grid
  const allRows = [
    { id: 'r1', notes: true,  ts: ['booked','shipped','tracking','delivered'], late: 'on-time', cur: 'In Transit', cmt: 'Picked up', date: '05/22/2026', tn: 'FRTPOP-220043372', carrier: 'No Carrier' },
    { id: 'r2', notes: true,  ts: ['booked','shipped','tracking'],              late: 'late',    cur: 'In Transit', cmt: 'No update 6h',    date: '05/20/2026', tn: '11252388',       carrier: 'Echo Global', flag: true },
    { id: 'r3', notes: false, ts: ['booked','shipped','tracking'],              late: 'on-time', cur: 'In Transit', cmt: 'Origin scan',     date: '05/22/2026', tn: 'FRTPOP-220043370', carrier: 'XPO' },
    { id: 'r4', notes: true,  ts: ['booked','shipped','tracking','delivered'],  late: 'on-time', cur: 'Delivered',  cmt: 'POD on file',     date: '05/19/2026', tn: 'FRTPOP-220043369', carrier: 'R+L Carriers' },
    { id: 'r5', notes: false, ts: ['booked','shipped'],                          late: 'on-time', cur: 'Booked',     cmt: 'Awaiting pickup', date: '05/22/2026', tn: 'FRTPOP-220043368', carrier: 'FedEx Freight' },
    { id: 'r6', notes: true,  ts: ['booked','shipped','tracking'],              late: 'on-time', cur: 'In Transit', cmt: 'Linehaul',        date: '05/21/2026', tn: 'FRTPOP-220043367', carrier: 'Old Dominion' },
    { id: 'r7', notes: false, ts: ['booked','shipped','tracking','delivered'],  late: 'on-time', cur: 'Delivered',  cmt: 'POD on file',     date: '05/19/2026', tn: 'FRTPOP-220043366', carrier: 'Saia LTL' },
  ];

  return (
    <V3ViewWrap>
      <div style={{
        padding: '20px 32px 0', background: '#fff',
        borderBottom: `1px solid ${FP.borderLight}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: FP.textDark, fontFamily: fpFont.heading, letterSpacing: '-0.012em' }}>Track</div>
          <div style={{ flex: 1 }}/>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: FP.blue, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, fontWeight: 400,
          }}>+</div>
        </div>
        {/* Underline tabs */}
        <div style={{ display: 'flex', gap: 28, marginTop: 16 }}>
          {['IN TRANSIT', 'CONTAINER OCEAN', 'CONTAINER DRAYAGE', 'FLEET', 'TRACK A SHIPMENT'].map((t, i) => {
            const active = i === 0;
            return (
              <div key={t} style={{
                padding: '10px 0',
                fontSize: 12, fontWeight: 700,
                color: active ? FP.blue : FP.subtle,
                letterSpacing: '0.06em',
                fontFamily: fpFont.body,
                borderBottom: `2px solid ${active ? FP.blue : 'transparent'}`,
              }}>{t}</div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: '18px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14, background: FP.bg }}>
        {/* Pie chart row */}
        <div style={{
          background: '#fff', border: `1px solid ${FP.borderLight}`, borderRadius: 4,
          padding: '18px 22px',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
        }}>
          <TrackPieBlock
            title="Total Shipments"
            slices={[
              { label: 'Outbound', value: 356, color: '#0668B3' },
              { label: 'Inbound',  value: 18,  color: '#9CA3AF' },
              { label: '3rd Party', value: 59, color: '#6FA8E3' },
            ]}
            total={433}
          />
          <TrackPieBlock
            title={showAlert ? 'Shipments with Delays/Issues' : 'Shipments with Delays/Issues'}
            slices={[
              { label: 'Outbound Delays/Issues', value: showAlert ? 332 : 331, color: '#0668B3' },
              { label: 'Inbound Delays/Issues',  value: 17,                   color: '#9CA3AF' },
              { label: '3rd Party Delays/Issues', value: 59,                  color: '#6FA8E3' },
            ]}
            total={showAlert ? 408 : 407}
            pulse={showAlert}
          />
        </div>

        {/* Alert bar — AI flagged the exception */}
        {showAlert && (
          <div style={{
            padding: '12px 16px',
            background: FP.redLight, border: `1px solid ${FP.red}`,
            borderLeft: `4px solid ${FP.red}`, borderRadius: 4,
            display: 'flex', alignItems: 'center', gap: 12,
            opacity: v3Clamp((localT - 2.0) / 0.5),
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6.5" stroke={FP.red} strokeWidth="1.5" fill="none"/><path d="M8 5v4 M8 11v.5" stroke={FP.red} strokeWidth="1.5" strokeLinecap="round"/></svg>
            <div style={{ fontSize: 13, color: FP.textDark }}>
              FreightPOP AI flagged shipment <strong>11252388</strong> · no carrier update in 6h · dispatch emailed
            </div>
          </div>
        )}

        {/* Filter row: search · funnel · filter pills · view toggles */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          padding: '10px 14px', background: '#fff',
          border: `1px solid ${FP.borderLight}`, borderRadius: 4,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#fff', border: `1px solid #D5D9DE`, borderRadius: 4,
            padding: '7px 14px', width: 220,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#A1A8B0" strokeWidth="1.4"/>
              <path d="M9.5 9.5L13 13" stroke="#A1A8B0" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <div style={{ flex: 1, fontSize: 13, color: '#A1A8B0' }}>Search</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: FP.textDark, letterSpacing: '0.08em', fontFamily: fpFont.mono }}>GO</div>
          </div>
          <svg width="18" height="20" viewBox="0 0 20 22" fill="none">
            <path d="M2 4h16l-6 8v6l-4-2v-4L2 4z" stroke="#A1A8B0" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
          </svg>
          {['Outbound', 'Inbound', '3rd Party', 'Return Shipments'].map((p) => (
            <div key={p} style={{
              padding: '7px 16px', borderRadius: 999,
              border: `1px solid #C7D1DC`,
              color: FP.subtle, fontSize: 13, fontWeight: 500,
              fontFamily: fpFont.heading,
            }}>{p}</div>
          ))}
          <div style={{ flex: 1 }}/>
          <div style={{ display: 'flex', border: `1px solid #C7D1DC`, borderRadius: 4, overflow: 'hidden' }}>
            {['INTERNAL', 'EXTERNAL', 'BOTH'].map((s, i) => (
              <div key={s} style={{
                padding: '7px 14px',
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
                color: i === 0 ? FP.blue : FP.subtle,
                background: i === 0 ? '#fff' : '#fff',
                borderRight: i < 2 ? `1px solid #C7D1DC` : 'none',
              }}>{s}</div>
            ))}
          </div>
        </div>

        {/* Data table */}
        <div style={{ background: '#fff', border: `1px solid ${FP.borderLight}`, borderRadius: 4, overflow: 'hidden', flex: 1, minHeight: 0, display: 'flex' }}>
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '32px 60px 140px 110px 120px 140px 110px 1.1fr 110px',
              padding: '12px 16px',
              borderBottom: `2px solid ${FP.borderLight}`,
              gap: 12, alignItems: 'center',
              fontSize: 11.5, fontWeight: 600, color: FP.subtle, letterSpacing: '0.04em',
            }}>
              <div></div>
              <div>Notes</div>
              <div>Tracking Status</div>
              <div>Late/On-Time</div>
              <div>Current Status</div>
              <div>Tracking Comment</div>
              <div>Process Date</div>
              <div>Tracking Number</div>
              <div>Carrier</div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {allRows.map((r, i) => (
                <TrackRow key={r.id} row={r} alt={i % 2 === 1}/>
              ))}
            </div>
          </div>
          {/* Right rail: AI carrier outreach thread (compact) */}
          <div style={{
            width: 360, flexShrink: 0,
            borderLeft: `1px solid ${FP.borderLight}`,
            background: '#FAFBFD',
            display: 'flex', flexDirection: 'column',
          }}>
            <CarrierThreadPanel localT={localT} showReply={showCarrierReply} showNotification={showNotification}/>
          </div>
        </div>
      </div>
    </V3ViewWrap>
  );
}

// Pie chart block — matches the screenshot style (left legend, right donut/pie)
function TrackPieBlock({ title, slices, total, pulse = false }) {
  const sum = slices.reduce((a, s) => a + s.value, 0) || 1;
  // Build pie slices
  const cx = 80, cy = 80, r = 70;
  let angle = -Math.PI / 2;
  const arcs = slices.map((s) => {
    const frac = s.value / sum;
    const a1 = angle;
    const a2 = angle + frac * Math.PI * 2;
    angle = a2;
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
    const large = (a2 - a1) > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
  });
  return (
    <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
      <div style={{ flex: 1 }}/>
      <div>
        <div style={{ fontSize: 18, fontWeight: 400, color: FP.textDark, fontFamily: fpFont.heading, marginBottom: 14, letterSpacing: '-0.005em' }}>{title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 14, height: 14, background: s.color, borderRadius: 2 }}/>
              <div style={{ fontSize: 13.5, color: FP.textDark, fontWeight: 600 }}>{s.label}: <span style={{ fontVariantNumeric: 'tabular-nums' }}>{s.value}</span></div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
            <div style={{ width: 14, height: 14, background: '#E5EDF6', borderRadius: 2 }}/>
            <div style={{ fontSize: 13.5, color: FP.textDark, fontWeight: 600 }}>Total: <span style={{ fontVariantNumeric: 'tabular-nums' }}>{total}</span></div>
          </div>
        </div>
      </div>
      <svg width="160" height="160" style={{ flexShrink: 0 }}>
        {arcs.map((d, i) => (
          <path key={i} d={d} fill={slices[i].color}/>
        ))}
      </svg>
      <div style={{ flex: 1 }}/>
    </div>
  );
}

// Compact tracking row matching screenshot
function TrackRow({ row, alt }) {
  const lateLabel = row.late === 'late' ? 'LATE' : 'ON-TIME';
  const lateBg = row.late === 'late' ? '#E04545' : '#5BA363';
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '32px 60px 140px 110px 120px 140px 110px 1.1fr 110px',
      padding: '11px 16px',
      borderBottom: `1px solid #F2F4F7`,
      gap: 12, alignItems: 'center',
      background: row.flag ? FP.redLight : (alt ? '#FAFBFD' : '#fff'),
      fontSize: 12.5, color: FP.text,
      fontVariantNumeric: 'tabular-nums',
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: 2, border: `1.5px solid #C7D1DC`,
      }}/>
      <div>
        {row.notes && (
          <div style={{
            width: 22, height: 22, border: `1px solid #C7D1DC`, borderRadius: 2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <rect x="2" y="2" width="8" height="9" rx="0.5" stroke="#5A6168" strokeWidth="0.9"/>
              <path d="M4 5h4 M4 7h3" stroke="#5A6168" strokeWidth="0.9" strokeLinecap="round"/>
            </svg>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {['booked','shipped','tracking','delivered'].map((s) => {
          const active = row.ts.includes(s);
          return (
            <div key={s} style={{
              width: 24, height: 24, border: `1px solid #D5D9DE`, borderRadius: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: active ? '#E8F0FB' : '#fff',
              color: active ? FP.blue : '#C0C7CF',
            }}>
              <TrackStatusGlyph kind={s} active={active}/>
            </div>
          );
        })}
      </div>
      <div>
        <div style={{
          display: 'inline-flex', padding: '4px 12px', borderRadius: 999,
          background: lateBg, color: '#fff',
          fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em',
          fontFamily: fpFont.mono,
        }}>{lateLabel}</div>
      </div>
      <div style={{ color: FP.text }}>{row.cur}</div>
      <div style={{ color: FP.subtle }}>{row.cmt}</div>
      <div>{row.date}</div>
      <div style={{ color: FP.blue, fontWeight: 600, fontFamily: fpFont.mono, fontSize: 12 }}>{row.tn}</div>
      <div style={{ color: FP.subtle }}>{row.carrier}</div>
    </div>
  );
}

function TrackStatusGlyph({ kind, active }) {
  const c = active ? '#0668B3' : '#C0C7CF';
  if (kind === 'booked') return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="2" y="2" width="8" height="9" rx="0.5" stroke={c} strokeWidth="1"/><path d="M4 5h4 M4 7h2.5" stroke={c} strokeWidth="0.9" strokeLinecap="round"/></svg>;
  if (kind === 'shipped')   return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 8L7 2L11 6" stroke={c} strokeWidth="1" fill="none" strokeLinecap="round"/><circle cx="3" cy="10" r="0.9" fill={c}/><circle cx="9" cy="10" r="0.9" fill={c}/></svg>;
  if (kind === 'tracking')  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="4" width="7" height="5" rx="0.5" stroke={c} strokeWidth="1"/><path d="M8 5h2l1.5 1.5V9H8" stroke={c} strokeWidth="1" fill="none"/><circle cx="3" cy="10" r="0.9" stroke={c} strokeWidth="0.8" fill="#fff"/><circle cx="9" cy="10" r="0.9" stroke={c} strokeWidth="0.8" fill="#fff"/></svg>;
  if (kind === 'delivered') return <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 7l2 2 6-6" stroke={c} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  return null;
}

function CarrierThreadPanel({ localT, showReply, showNotification }) {
  return (
    <div style={{
      background: 'transparent',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
      flex: 1, minHeight: 0,
    }}>
      <div style={{
        padding: '12px 16px', borderBottom: `1px solid ${FP.borderLight}`,
        background: '#fff', display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="1" stroke={FP.subtle} strokeWidth="1.4"/>
          <path d="M2 4l6 5 6-5" stroke={FP.subtle} strokeWidth="1.4" fill="none"/>
        </svg>
        <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark, fontFamily: fpFont.heading }}>AI carrier outreach</div>
      </div>
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1, overflow: 'hidden' }}>
        {/* Outbound from FP AI */}
        <ThreadMessage
          from="FreightPOP AI → echo.dispatch@echo.com"
          time="just now"
          body="Hi — no check-in received from driver on 11252388 (LAX→PHX) for 6h. Can you confirm status / ETA? — automated request"
          tone="out"
          show
        />
        {/* Reply */}
        {showReply && (
          <ThreadMessage
            from="Echo dispatch ← Marco T."
            time="14m later"
            body="Truck broke down outside Indio, CA. Swapping to backup tractor in next hour. New ETA: Wed 4–6 PM (+2 days from original)."
            tone="in"
            show={v3Clamp((localT - 6.0) / 0.5)}
          />
        )}
        {/* Notification to recipient */}
        {showNotification && (
          <ThreadMessage
            from="FreightPOP AI → ops@oneilstorage.com"
            time="just now"
            body="Hi O'Neil Storage — your shipment from FreightPOP Demo is delayed due to a carrier breakdown. New delivery window: Wed 4–6 PM. Apologies for the inconvenience. Reply here if the new window doesn't work."
            tone="out"
            show={v3Clamp((localT - 14.5) / 0.5)}
            highlight
          />
        )}
      </div>
    </div>
  );
}

function ThreadMessage({ from, time, body, tone, show = 1, highlight = false }) {
  const isOut = tone === 'out';
  return (
    <div style={{
      opacity: show, transform: `translateY(${(1 - show) * 8}px)`,
      transition: 'opacity 320ms, transform 320ms',
      padding: '10px 12px',
      background: highlight ? FP.blueLight : (isOut ? '#F1F5F9' : '#fff'),
      border: `1px solid ${highlight ? FP.blue : FP.borderLight}`,
      borderRadius: 4,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: FP.subtle, fontWeight: 600, letterSpacing: '0.04em' }}>
        <span>{from}</span>
        <span>{time}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 12.5, color: FP.text, lineHeight: 1.5 }}>{body}</div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 5. AGENT BUILDER — Zapier-style node canvas
// ───────────────────────────────────────────────────────────────────────────
function ViewAgentBuilder({ localT = 0 }) {
  // 6 nodes assemble over time
  const nodes = [
    { id: 'n1', kind: 'trigger', title: 'Weekly invoice pull', sub: 'Monday 8:00 AM PT', icon: '⏱', col: 0, row: 1, at: 1.2 },
    { id: 'n2', kind: 'action',  title: 'Diagnose discrepancy', sub: 'Compare invoice vs. booking', icon: '🔎', col: 1, row: 1, at: 3.0 },
    { id: 'n3', kind: 'branch',  title: 'If: missed accessorial', sub: 'Save recurring rule', icon: '📌', col: 2, row: 0, at: 5.2 },
    { id: 'n4', kind: 'branch',  title: 'If: carrier dispute',    sub: 'Escalate to Marcus',     icon: '↗',  col: 2, row: 1, at: 6.4 },
    { id: 'n5', kind: 'branch',  title: 'If: within 5% tolerance', sub: 'Auto-approve · AP',     icon: '✓',  col: 2, row: 2, at: 7.6 },
    { id: 'n6', kind: 'action',  title: 'Post to Slack #ops',     sub: 'Run summary',             icon: '#',  col: 3, row: 1, at: 9.0 },
  ];

  // Canvas grid — 4 columns × 3 rows
  const colW = 220;
  const rowH = 120;
  const xOf = (c) => 40 + c * (colW + 60);
  const yOf = (r) => 40 + r * (rowH + 30);

  const visible = (at) => localT > at - 0.1;
  const aliveT = (at) => v3Clamp((localT - at) / 0.5);

  // Edges: trigger → diagnose → 3 branches → slack
  const edges = [
    { from: 'n1', to: 'n2', at: 2.8 },
    { from: 'n2', to: 'n3', at: 5.0 },
    { from: 'n2', to: 'n4', at: 6.2 },
    { from: 'n2', to: 'n5', at: 7.4 },
    { from: 'n3', to: 'n6', at: 8.8 },
    { from: 'n4', to: 'n6', at: 8.9 },
    { from: 'n5', to: 'n6', at: 9.0 },
  ];

  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  return (
    <V3ViewWrap>
      <PageHeader
        title="Agent Builder"
        tabs={['NEW AGENT', 'MY AGENTS', 'TEMPLATES', 'RUN HISTORY']}
        activeTab="NEW AGENT"
        actions={<div style={{ display: 'flex', gap: 8 }}>
          <MatButton size="sm">SAVE AS DRAFT</MatButton>
          <MatButton size="sm" variant="filled">{localT > 17 ? 'ACTIVATED' : 'ACTIVATE'}</MatButton>
        </div>}
      />
      <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Agent header */}
        <div style={{
          padding: '12px 16px',
          background: '#fff', border: `1px solid ${FP.borderLight}`,
          borderRadius: 4, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 32, height: 32, display: 'block' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: FP.textDark, fontFamily: fpFont.heading }}>Weekly Invoice Auditor</div>
            <div style={{ fontSize: 11.5, color: FP.subtle, marginTop: 2 }}>{localT < 10 ? 'Assembling from your description…' : 'Configured · ready to activate'}</div>
          </div>
          <StatusPill text={localT > 17 ? 'LIVE' : (localT > 10 ? 'READY' : 'BUILDING')} variant={localT > 17 ? 'success' : (localT > 10 ? 'info' : 'warn')}/>
        </div>

        {/* Workflow canvas */}
        <div style={{
          flex: 1, minHeight: 0,
          background: 'radial-gradient(circle at 1px 1px, #D5DBE3 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundColor: '#FFFFFF',
          border: `1px solid ${FP.borderLight}`, borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* SVG layer for edges */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {edges.map((e, i) => {
              const a = byId[e.from], b = byId[e.to];
              const x1 = xOf(a.col) + colW;
              const y1 = yOf(a.row) + rowH / 2;
              const x2 = xOf(b.col);
              const y2 = yOf(b.row) + rowH / 2;
              const cx = (x1 + x2) / 2;
              const t = v3Clamp((localT - e.at) / 0.45);
              if (t <= 0) return null;
              // Draw the line as a dashed path that "draws in"
              const total = Math.hypot(x2 - x1, y2 - y1);
              return (
                <g key={i} opacity={t}>
                  <path d={`M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`}
                        stroke={FP.blue} strokeWidth="2" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={total}
                        strokeDashoffset={total * (1 - t)}/>
                  {/* arrowhead */}
                  <polygon
                    points={`${x2},${y2} ${x2 - 8},${y2 - 4} ${x2 - 8},${y2 + 4}`}
                    fill={FP.blue} opacity={t}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((n) => {
            const t = aliveT(n.at);
            if (!visible(n.at)) return null;
            const x = xOf(n.col), y = yOf(n.row);
            return (
              <div key={n.id} style={{
                position: 'absolute', left: x, top: y,
                width: colW, height: rowH,
                background: n.kind === 'trigger' ? FP.navy : '#fff',
                color: n.kind === 'trigger' ? '#fff' : FP.textDark,
                border: `1.5px solid ${n.kind === 'trigger' ? FP.navy : (n.kind === 'branch' ? FP.amber : FP.blue)}`,
                borderRadius: 6,
                padding: 14,
                opacity: t, transform: `scale(${0.92 + 0.08 * t})`,
                transition: 'opacity 220ms, transform 220ms',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.08)',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: 4,
                    background: n.kind === 'trigger' ? 'rgba(255,255,255,0.12)' : (n.kind === 'branch' ? FP.amberLight : FP.blueLight),
                    color: n.kind === 'trigger' ? '#fff' : (n.kind === 'branch' ? FP.amber : FP.blue),
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700,
                  }}>{n.icon}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.7, letterSpacing: '0.08em', fontFamily: fpFont.mono }}>
                    {n.kind.toUpperCase()}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, fontFamily: fpFont.heading }}>{n.title}</div>
                <div style={{ fontSize: 11.5, opacity: 0.7, lineHeight: 1.3 }}>{n.sub}</div>
              </div>
            );
          })}

          {/* Connected integrations footer */}
          {localT > 12 && (
            <div style={{
              position: 'absolute', bottom: 14, left: 14, right: 14,
              padding: '10px 14px',
              background: '#fff', border: `1px solid ${FP.borderLight}`, borderRadius: 4,
              display: 'flex', alignItems: 'center', gap: 14,
              opacity: v3Clamp((localT - 12) / 0.5),
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: FP.subtle, letterSpacing: '0.06em', fontFamily: fpFont.mono }}>CONNECTED</div>
              <IntegrationChip name="Slack" color="#4A154B" letter="#"/>
              <IntegrationChip name="Outlook" color="#0078D4" letter="O"/>
              <IntegrationChip name="Carrier Mgmt" color={FP.blue} letter="C"/>
              <IntegrationChip name="AP / NetSuite" color="#0E1F44" letter="N"/>
              <div style={{ flex: 1 }}/>
              <div style={{ fontSize: 11.5, color: FP.subtle }}>Escalation: <strong style={{ color: FP.textDark }}>Marcus L.</strong> (Ops Lead)</div>
            </div>
          )}
        </div>
      </div>
    </V3ViewWrap>
  );
}

function IntegrationChip({ name, color, letter }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <div style={{ width: 22, height: 22, borderRadius: 4, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{letter}</div>
      <div style={{ fontSize: 12, color: FP.text, fontWeight: 500 }}>{name}</div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 6. INVOICE AUDIT — two scenarios over time
// ───────────────────────────────────────────────────────────────────────────
function ViewInvoiceAudit({ localT = 0 }) {
  const focus = localT >= 12 ? 'INV-7840' : 'INV-7842';
  const inv7842Approved = localT > 10;
  const inv7840Escalated = localT > 15.5;
  const toleranceApproved = localT > 17.3;
  const slackPosted = localT > 19.5;
  const rows = [
    { id: 'i1', inv: 'INV-7842', shipment: '11252101', carrier: 'Echo Global', amount: '$1,732.00',
      variance: () => <span style={{ color: focus === 'INV-7842' ? FP.amber : FP.subtle, fontWeight: 600 }}>+$75 lift gate</span>,
      cause: () => <span style={{ color: FP.text }}>{localT > 4 ? 'Missed accessorial · ours' : '—'}</span>,
      status: () => <StatusPill text={inv7842Approved ? 'RULE SAVED' : 'REVIEW'} variant={inv7842Approved ? 'success' : 'warn'}/>,
    },
    { id: 'i2', inv: 'INV-7840', shipment: '11252100', carrier: 'Echo Global', amount: '$2,148.00',
      variance: () => <span style={{ color: focus === 'INV-7840' ? FP.red : FP.subtle, fontWeight: 600 }}>+$312 detention</span>,
      cause: () => <span style={{ color: FP.text }}>{localT > 12.3 ? 'Carrier dispute · contract' : '—'}</span>,
      status: () => <StatusPill text={inv7840Escalated ? 'ESCALATED' : (localT > 12 ? 'REVIEW' : '—')} variant={inv7840Escalated ? 'warn' : (localT > 12 ? 'warn' : 'neutral')}/>,
    },
    { id: 'i3', inv: 'INV-7839', shipment: '11252099', carrier: 'XPO', amount: '$1,240.00', variance: '—', cause: () => <span style={{ color: FP.subtle }}>{toleranceApproved ? 'Within ±5% · auto' : '—'}</span>, status: () => <StatusPill text={toleranceApproved ? 'AUTO-APPROVED' : '—'} variant={toleranceApproved ? 'success' : 'neutral'}/> },
    { id: 'i4', inv: 'INV-7838', shipment: '11252098', carrier: 'FedEx Freight', amount: '$890.00', variance: '—', cause: () => <span style={{ color: FP.subtle }}>{toleranceApproved ? 'Within ±5% · auto' : '—'}</span>, status: () => <StatusPill text={toleranceApproved ? 'AUTO-APPROVED' : '—'} variant={toleranceApproved ? 'success' : 'neutral'}/> },
    { id: 'i5', inv: 'INV-7837', shipment: '11252097', carrier: 'Old Dominion', amount: '$1,620.00', variance: '—', cause: () => <span style={{ color: FP.subtle }}>{toleranceApproved ? 'Within ±5% · auto' : '—'}</span>, status: () => <StatusPill text={toleranceApproved ? 'AUTO-APPROVED' : '—'} variant={toleranceApproved ? 'success' : 'neutral'}/> },
    { id: 'i6', inv: 'INV-7836', shipment: '11252096', carrier: 'Saia LTL', amount: '$985.00', variance: '—', cause: () => <span style={{ color: FP.subtle }}>{toleranceApproved ? 'Within ±5% · auto' : '—'}</span>, status: () => <StatusPill text={toleranceApproved ? 'AUTO-APPROVED' : '—'} variant={toleranceApproved ? 'success' : 'neutral'}/> },
  ];

  return (
    <V3ViewWrap>
      <PageHeader
        title="Audit"
        tabs={['INVOICES', 'FLAGGED', 'DISPUTES', 'RULES']}
        activeTab="FLAGGED"
        actions={<MatButton size="sm" variant="filled">RUN AUDIT</MatButton>}
      />
      <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <FpKPI label="Audited" value="47"/>
          <FpKPI label="Auto-approved" value={toleranceApproved ? '44' : '0'} deltaColor={FP.green}/>
          <FpKPI label="Rules saved" value={inv7842Approved ? '1' : '0'} delta="prevent future miss" deltaColor={FP.green}/>
          <FpKPI label="Escalated" value={inv7840Escalated ? '1' : '0'} delta={inv7840Escalated ? 'to Marcus L.' : ''} deltaColor={FP.amber}/>
        </div>

        {/* Focus scenario card */}
        <FocusedInvoice
          inv={focus}
          localT={localT}
          inv7842Approved={inv7842Approved}
          inv7840Escalated={inv7840Escalated}
        />

        <V3Table
          columns={[
            { key: 'inv', label: 'Invoice', w: '110px', bold: true, mono: true },
            { key: 'shipment', label: 'Shipment', w: '110px', mono: true },
            { key: 'carrier', label: 'Carrier', w: '140px' },
            { key: 'amount', label: 'Amount', w: '100px', bold: true },
            { key: 'variance', label: 'Variance', w: '150px' },
            { key: 'cause', label: 'AI cause', w: '170px' },
            { key: 'status', label: 'Status', w: '140px' },
          ]}
          rows={rows}
          highlightIds={[focus === 'INV-7842' ? 'i1' : 'i2']}
        />

        {/* Slack post UI removed per direction — the agent narrates the recap in the chat */}
      </div>
    </V3ViewWrap>
  );
}

function FocusedInvoice({ inv, localT, inv7842Approved, inv7840Escalated }) {
  if (inv === 'INV-7842') {
    return (
      <div style={{
        padding: '14px 18px', background: '#fff',
        border: `1px solid ${FP.amber}`, borderLeft: `4px solid ${FP.amber}`,
        borderRadius: 4, display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: FP.amber, fontFamily: fpFont.mono, letterSpacing: '0.06em' }}>MISSED ACCESSORIAL · OURS</div>
        <div style={{ width: 1, height: 24, background: FP.borderLight }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark }}>INV-7842 · $75 lift gate not on booking</div>
          <div style={{ fontSize: 12, color: FP.subtle, marginTop: 3 }}>{inv7842Approved ? 'Recurring rule saved for 2826 W Roosevelt St · invoice approved · forwarded to AP' : 'Per workflow: save as recurring rule for this destination so we never miss it again'}</div>
        </div>
        <StatusPill text={inv7842Approved ? 'RULE SAVED' : 'AWAITING YOU'} variant={inv7842Approved ? 'success' : 'warn'}/>
      </div>
    );
  }
  return (
    <div style={{
      padding: '14px 18px', background: '#fff',
      border: `1px solid ${FP.red}`, borderLeft: `4px solid ${FP.red}`,
      borderRadius: 4, display: 'flex', alignItems: 'center', gap: 16,
      opacity: v3Clamp((localT - 12) / 0.4),
    }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: FP.red, fontFamily: fpFont.mono, letterSpacing: '0.06em' }}>CARRIER DISPUTE · ESCALATE</div>
      <div style={{ width: 1, height: 24, background: FP.borderLight }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: FP.textDark }}>INV-7840 · $312 detention (1h 40m vs. 3h billed)</div>
        <div style={{ fontSize: 12, color: FP.subtle, marginTop: 3 }}>{inv7840Escalated ? 'Per workflow: escalated to Marcus L. with timestamped gate-in/gate-out evidence' : 'Drafting escalation packet…'}</div>
      </div>
      <StatusPill text={inv7840Escalated ? 'TO MARCUS L.' : 'DRAFTING'} variant="warn"/>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 7. CLAIMS — WMS receiving + resolution
// ───────────────────────────────────────────────────────────────────────────
function ViewClaim({ localT = 0 }) {
  const filed = localT > 9.5;
  const resolved = localT > 13.0;
  const scoreUpdated = localT > 16.0;
  return (
    <V3ViewWrap>
      <PageHeader
        title={resolved ? 'Claims · CLM-2089' : 'Claims'}
        tabs={['ALL CLAIMS', 'PENDING', 'IN REVIEW', 'RESOLVED']}
        activeTab={resolved ? 'RESOLVED' : (filed ? 'IN REVIEW' : 'PENDING')}
        actions={<MatButton size="sm" variant="filled">{resolved ? 'VIEW REFUND' : (filed ? 'TRACK' : 'FILE CLAIM')}</MatButton>}
      />
      <div style={{ padding: '20px 32px', flex: 1, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        {/* Left: WMS receiving event + evidence */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SectionCard
            title="WMS Receiving · Dock Door 5"
            action={<StatusPill text={resolved ? 'CLAIM RESOLVED' : (filed ? 'CLAIM FILED' : 'DAMAGE DETECTED')} variant={resolved ? 'success' : (filed ? 'info' : 'danger')}/>}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
              {[
                { label: 'Carrier', value: 'Echo Global' },
                { label: 'Inbound shipment', value: '11252389' },
                { label: 'Received at', value: 'Aisle B / Bin 14' },
                { label: 'Pallets received', value: '8 of 8' },
                { label: 'Damaged', value: '2 pallets' },
                { label: 'Receiver', value: 'D. Ramirez' },
              ].map((kv, i) => (
                <div key={i}>
                  <div style={{ fontSize: 10.5, color: FP.subtle, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{kv.label}</div>
                  <div style={{ fontSize: 13, color: FP.textDark, marginTop: 4, fontWeight: 500 }}>{kv.value}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: FP.subtle, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8 }}>RECEIVING PHOTOS (AUTO-CAPTURED)</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {[0,1,2,3].map((i) => (
                <DamagePhoto key={i} idx={i} damaged={i < 2}/>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Claim packet">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { kind: 'PDF', name: 'Receiving inspection report', meta: 'WMS · auto', color: 'red' },
                { kind: 'IMG', name: 'Damage photos (4)', meta: 'auto-attached', color: 'blue' },
                { kind: 'CSV', name: 'BOL & POD records', meta: 'pulled', color: 'green' },
              ].map((d, i) => {
                const bg = { red: FP.redLight, blue: FP.blueLight, green: FP.greenLight }[d.color];
                const fg = { red: FP.red, blue: FP.blue, green: FP.green }[d.color];
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '8px 12px', border: `1px solid ${FP.borderLight}`, borderRadius: 4,
                  }}>
                    <div style={{
                      width: 30, height: 36, borderRadius: 3,
                      background: bg, border: `1px solid ${fg}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: fpFont.mono, fontSize: 9, fontWeight: 700, color: fg,
                    }}>{d.kind}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 500, color: FP.textDark }}>{d.name}</div>
                      <div style={{ fontSize: 11, color: FP.subtle, marginTop: 2 }}>{d.meta}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        </div>

        {/* Right: claim status / resolution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <SectionCard title="Claim status">
            <ClaimTimeline localT={localT} filed={filed} resolved={resolved}/>
          </SectionCard>
          <div style={{
            padding: 18, borderRadius: 4,
            background: resolved ? FP.greenLight : FP.navy,
            color: resolved ? FP.textDark : '#fff',
            border: resolved ? `1px solid ${FP.green}` : 'none',
          }}>
            <div style={{ fontSize: 10.5, opacity: resolved ? 0.7 : 0.7, fontWeight: 700, letterSpacing: '0.06em' }}>
              {resolved ? 'OUTCOME' : 'CLAIM AMOUNT'}
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, marginTop: 6, fontVariantNumeric: 'tabular-nums' }}>$4,820.00</div>
            <div style={{ fontSize: 12.5, marginTop: 6, opacity: 0.9 }}>
              {resolved ? 'Carrier approved in full · refund in process' : (filed ? 'Filed with Echo · pending review' : 'Awaiting your approval to file')}
            </div>
          </div>

          {/* Carrier performance update — the claim doesn't just close; it updates Echo's scorecard */}
          {scoreUpdated && (
            <SectionCard
              title="Carrier performance · Echo Global"
              action={<StatusPill text="PERFORMANCE UPDATED" variant="warn"/>}
            >
              <div style={{ opacity: v3Clamp((localT - 16.0) / 0.5), display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                  {[
                    { label: 'On-Time Delivery', value: '88%', from: '94%', worse: true, down: true },
                    { label: 'On-Time Pickup', value: '96%', from: '96%', worse: false },
                    { label: 'Transit Time Error', value: '1.4 days', from: '0.3 days', worse: true },
                    { label: 'Number of Claims', value: '2', from: '1', worse: true },
                    { label: 'Claim Amount', value: '$6,060', from: '$1,240', worse: true },
                    { label: 'Non-Conformances', value: '3', from: '2', worse: true },
                  ].map((m) => (
                    <div key={m.label} style={{ border: `1px solid ${FP.borderLight}`, borderRadius: 4, padding: '9px 11px' }}>
                      <div style={{ fontSize: 9.5, color: FP.subtle, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{m.label}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: FP.textDark, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>{m.value}</div>
                      <div style={{ fontSize: 10.5, color: m.worse ? FP.red : FP.subtle, fontWeight: 600, marginTop: 2 }}>{m.worse ? (m.down ? '▼' : '▲') : '—'} from {m.from}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'flex-start', gap: 8,
                  padding: '10px 12px', background: FP.blueLight, borderRadius: 4,
                  fontSize: 12, color: FP.textDark, lineHeight: 1.45,
                }}>
                  <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 14, height: 14, marginTop: 1, flexShrink: 0 }}/>
                  Written back to Echo's Carrier Performance report. Rate Shop will weight this on future lanes — and surface it at your next carrier review.
                </div>
              </div>
            </SectionCard>
          )}
        </div>
      </div>
    </V3ViewWrap>
  );
}

// Real warehouse pallet photos (split from the uploaded receiving grid).
// idx 0,1 = damaged (top-right, bottom-left of original); idx 2,3 = intact.
const PALLET_PHOTOS = [
  (window.__resources && window.__resources.palletDamaged1) || 'assets/pallet-damaged-1.png',
  (window.__resources && window.__resources.palletDamaged2) || 'assets/pallet-damaged-2.png',
  (window.__resources && window.__resources.palletIntact1) || 'assets/pallet-intact-1.png',
  (window.__resources && window.__resources.palletIntact2) || 'assets/pallet-intact-2.png',
];
const PALLET_FILE = ['IMG_2840', 'IMG_2842', 'IMG_2836', 'IMG_2838'];
window.PALLET_PHOTOS = PALLET_PHOTOS;

function DamagePhoto({ idx, damaged }) {
  // Real photo from the receiving grid.
  return (
    <div style={{
      aspectRatio: '4 / 3', borderRadius: 4,
      border: `2px solid ${damaged ? FP.red : FP.borderLight}`,
      position: 'relative', overflow: 'hidden',
      background: '#0e0f12',
    }}>
      <img src={PALLET_PHOTOS[idx]} alt={damaged ? 'Damaged pallet' : 'Intact pallet'}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      <div style={{
        position: 'absolute', top: 6, left: 6,
        fontSize: 9, fontFamily: fpFont.mono, color: '#fff',
        background: 'rgba(0,0,0,0.55)', padding: '2px 5px', borderRadius: 2,
        letterSpacing: '0.06em', pointerEvents: 'none',
      }}>PHOTO {idx + 1}</div>
      <div style={{
        position: 'absolute', top: 6, right: 6,
        fontSize: 8, fontFamily: fpFont.mono, color: 'rgba(255,255,255,0.85)',
        background: 'rgba(0,0,0,0.45)', padding: '2px 5px', borderRadius: 2,
        letterSpacing: '0.04em', pointerEvents: 'none',
      }}>{PALLET_FILE[idx]}</div>
      {damaged && (
        <div style={{
          position: 'absolute', bottom: 6, right: 6,
          fontSize: 9, fontWeight: 700, color: '#fff',
          background: FP.red, padding: '2px 6px', borderRadius: 2,
          letterSpacing: '0.06em', pointerEvents: 'none',
        }}>DAMAGE</div>
      )}
    </div>
  );
}

// Photoreal-ish pallet rendering in SVG. `idx` seeds small variations so the
// four tiles don't look identical; `damaged` swaps in crushed/torn cargo.
function PalletSVG({ idx = 0, damaged = false }) {
  const uid = `pal${idx}${damaged ? 'd' : ''}`;
  // Per-tile variation
  const hueShift = [0, 8, -6, 4][idx % 4];
  const boxBase = `hsl(${28 + hueShift}, 42%, 58%)`;
  const boxDark = `hsl(${28 + hueShift}, 40%, 44%)`;
  const boxLight = `hsl(${30 + hueShift}, 46%, 67%)`;
  return (
    <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        {/* Warehouse back wall + floor lighting */}
        <linearGradient id={`${uid}-wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b2f36"/>
          <stop offset="0.55" stopColor="#3a3f47"/>
          <stop offset="1" stopColor="#23262b"/>
        </linearGradient>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b5e63"/>
          <stop offset="1" stopColor="#3c3e42"/>
        </linearGradient>
        <radialGradient id={`${uid}-spot`} cx="0.5" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22"/>
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0"/>
        </radialGradient>
        {/* Cardboard shading */}
        <linearGradient id={`${uid}-boxF`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={boxLight}/>
          <stop offset="1" stopColor={boxBase}/>
        </linearGradient>
        <linearGradient id={`${uid}-boxS`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={boxDark}/>
          <stop offset="1" stopColor={boxBase}/>
        </linearGradient>
        {/* Wood */}
        <linearGradient id={`${uid}-wood`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9925e"/>
          <stop offset="1" stopColor="#8a6a40"/>
        </linearGradient>
        {/* Shrink-wrap sheen */}
        <linearGradient id={`${uid}-wrap`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.30"/>
          <stop offset="0.25" stopColor="#ffffff" stopOpacity="0.05"/>
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.22"/>
          <stop offset="0.75" stopColor="#ffffff" stopOpacity="0.04"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.18"/>
        </linearGradient>
        <filter id={`${uid}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="n"/>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0"/>
          <feComposite operator="in" in2="SourceGraphic"/>
          <feBlend in2="SourceGraphic" mode="multiply"/>
        </filter>
      </defs>

      {/* Environment */}
      <rect x="0" y="0" width="400" height="190" fill={`url(#${uid}-wall)`}/>
      <rect x="0" y="180" width="400" height="120" fill={`url(#${uid}-floor)`}/>
      {/* Rack uprights in background */}
      <rect x="24" y="20" width="10" height="170" fill="#d97b2a" opacity="0.5"/>
      <rect x="366" y="20" width="10" height="170" fill="#d97b2a" opacity="0.5"/>
      <rect x="20" y="58" width="360" height="7" fill="#c96e1f" opacity="0.35"/>
      {/* Contact shadow */}
      <ellipse cx="200" cy="250" rx="135" ry="22" fill="#000" opacity="0.38"/>

      {/* ── Pallet ── */}
      <g>
        {/* top deck */}
        <polygon points="92,232 308,232 322,250 78,250" fill={`url(#${uid}-wood)`}/>
        {/* deck board gaps */}
        <g stroke="#5e4727" strokeWidth="2" opacity="0.6">
          <line x1="120" y1="232" x2="112" y2="250"/>
          <line x1="160" y1="232" x2="155" y2="250"/>
          <line x1="200" y1="232" x2="200" y2="250"/>
          <line x1="240" y1="232" x2="245" y2="250"/>
          <line x1="280" y1="232" x2="288" y2="250"/>
        </g>
        {/* front face / blocks */}
        <rect x="78" y="250" width="244" height="20" fill="#7a5c34"/>
        <rect x="90" y="250" width="26" height="20" fill="#6b5029"/>
        <rect x="187" y="250" width="26" height="20" fill="#6b5029"/>
        <rect x="284" y="250" width="26" height="20" fill="#6b5029"/>
      </g>

      {damaged ? (
        /* ── DAMAGED CARGO: crushed top box, leaning stack, torn wrap ── */
        <g>
          {/* lower tier — intact-ish but shifted */}
          <polygon points="96,150 250,150 262,232 84,232" fill={`url(#${uid}-boxF)`}/>
          <polygon points="250,150 304,162 314,232 262,232" fill={`url(#${uid}-boxS)`}/>
          {/* tape seam */}
          <line x1="173" y1="150" x2="173" y2="232" stroke="#caa877" strokeWidth="3" opacity="0.7"/>
          {/* crushed / dented top box, leaning right */}
          <polygon points="104,96 250,86 256,150 96,150" fill={`url(#${uid}-boxF)`}/>
          {/* dent — caved-in top edge */}
          <polygon points="150,92 196,104 232,88 232,98 196,114 150,102" fill={boxDark} opacity="0.85"/>
          {/* torn corner revealing inner content */}
          <polygon points="232,108 256,116 256,150 236,150" fill="#3a2c1c"/>
          <polygon points="238,120 252,126 250,144 240,144" fill="#d8c7a0" opacity="0.8"/>
          {/* crack lines */}
          <g stroke="#5b3f26" strokeWidth="1.6" fill="none" opacity="0.8">
            <path d="M120 118 l14 10 l-6 12"/>
            <path d="M170 110 l8 16"/>
          </g>
          {/* fallen box on the floor to the right */}
          <polygon points="300,206 352,196 360,232 306,236" fill={`url(#${uid}-boxS)`}/>
          <polygon points="300,206 352,196 348,182 296,190" fill={boxLight} opacity="0.9"/>
          {/* torn shrink wrap — loose flap */}
          <path d="M96 150 q-14 30 6 70 q40 14 90 8 l-2 -8 q-44 6 -78 -8 q-16 -34 -6 -62 z"
                fill={`url(#${uid}-wrap)`} opacity="0.55"/>
          <path d="M250 96 q26 8 30 54 l-8 2 q-6 -40 -26 -48 z" fill="#ffffff" opacity="0.12"/>
        </g>
      ) : (
        /* ── INTACT CARGO: clean shrink-wrapped stack ── */
        <g>
          {/* lower tier */}
          <polygon points="96,150 250,150 262,232 84,232" fill={`url(#${uid}-boxF)`}/>
          <polygon points="250,150 304,162 314,232 262,232" fill={`url(#${uid}-boxS)`}/>
          {/* upper tier */}
          <polygon points="100,78 246,78 250,150 96,150" fill={`url(#${uid}-boxF)`}/>
          <polygon points="246,78 298,92 304,162 250,150" fill={`url(#${uid}-boxS)`}/>
          {/* tape seams */}
          <g stroke="#caa877" strokeWidth="3" opacity="0.7">
            <line x1="173" y1="78" x2="173" y2="232"/>
          </g>
          <g stroke="#b89a6a" strokeWidth="2" opacity="0.5">
            <line x1="96" y1="150" x2="250" y2="150"/>
          </g>
          {/* shrink wrap over whole stack */}
          <polygon points="100,78 246,78 262,232 84,232" fill={`url(#${uid}-wrap)`} opacity="0.5"/>
          <polygon points="246,78 298,92 314,232 262,232" fill="#ffffff" opacity="0.08"/>
          {/* wrap banding lines */}
          <g stroke="#ffffff" strokeWidth="2" opacity="0.18">
            <line x1="88" y1="130" x2="306" y2="142"/>
            <line x1="86" y1="185" x2="310" y2="196"/>
          </g>
          {/* diagonal sheen streak */}
          <polygon points="120,80 150,80 110,232 84,232" fill="#ffffff" opacity="0.10"/>
        </g>
      )}

      {/* global grain + spotlight */}
      <rect x="0" y="0" width="400" height="300" filter={`url(#${uid}-grain)`} opacity="0.5"/>
      <rect x="0" y="0" width="400" height="300" fill={`url(#${uid}-spot)`}/>
    </svg>
  );
}
window.PalletSVG = PalletSVG;

function ClaimTimeline({ localT, filed, resolved }) {
  const steps = [
    { label: 'WMS damage event', at: 0.4, done: true },
    { label: 'Claim filed with carrier', at: 9.0, done: filed },
    { label: 'Carrier review', at: 10.5, done: filed },
    { label: 'Claim resolved · refund issued', at: 13.0, done: resolved },
    { label: 'Echo Global performance updated', at: 16.0, done: resolved && localT > 16.0 },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map((s, i) => {
        const reached = localT > s.at;
        const tone = s.done && reached ? FP.green : FP.subtle;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 22, height: 22, borderRadius: 11,
              background: s.done && reached ? FP.green : '#F1F5F9',
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>
              {s.done && reached
                ? <svg width="11" height="11" viewBox="0 0 12 12"><path d="M2 6l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : i + 1}
            </div>
            <div style={{ flex: 1, fontSize: 13, color: tone === FP.green ? FP.textDark : FP.subtle, fontWeight: tone === FP.green ? 500 : 400 }}>{s.label}</div>
          </div>
        );
      })}
    </div>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// 8. EXECUTIVE REVIEW — bring-your-own-AI · five equal MCP client windows
// ───────────────────────────────────────────────────────────────────────────
const EXEC_ASK = "Which of our carriers are underperforming right now — and what is it costing us in delays and claims?";
const EXEC_TOOLS = [
  { name: 'freightpop.get_carrier_performance', result: '14 carriers scored' },
  { name: 'freightpop.get_ontime_performance', result: '88% · below 90% target' },
  { name: 'freightpop.get_transit_performance', result: 'transit-time error rising' },
  { name: 'freightpop.list_open_claims',       result: '3 open · $11.0K exposure' },
  { name: 'freightpop.get_lane_margin',        result: '2 lanes below target' },
];
const EXEC_CLIENTS = [
  { brand: 'Claude',             sub: 'Anthropic',            color: '#D97757', icon: '✳', d: 0.0 },
  { brand: 'Microsoft Copilot',  sub: 'Microsoft 365',        color: '#0A7E3E', icon: 'C', d: 0.15 },
  { brand: 'Slack / Teams',      sub: 'ask in a channel',     color: '#4A154B', icon: '#', d: 0.3 },
  { brand: 'NetSuite / Power BI', sub: 'your ERP or BI tool', color: '#0E1F44', icon: 'N', d: 0.45 },
  { brand: 'FreightPOP AI',      sub: 'native chat in the TMS', color: '#2A6FDB', icon: '◆', d: 0.6 },
];

function ViewMCP({ localT = 0 }) {
  return (
    <V3ViewWrap>
      <div style={{ padding: '24px 32px 22px', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, background: '#F4F6FA' }}>
        {/* Title strip */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: FP.textDark, fontFamily: fpFont.heading, letterSpacing: '-0.012em', whiteSpace: 'nowrap' }}>Bring your own AI</div>
          <div style={{ fontSize: 13, color: FP.subtle, whiteSpace: 'nowrap' }}>— your data, queried from any MCP client</div>
        </div>

        {/* Central FreightPOP MCP node */}
        <div style={{
          padding: '11px 18px', background: FP.navy, color: '#fff',
          borderRadius: 6, display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
        }}>
          <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 26, height: 26, display: 'block', filter: 'brightness(1.4)' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, fontFamily: fpFont.heading, letterSpacing: '-0.005em' }}>FreightPOP MCP server</div>
            <div style={{ fontSize: 11.5, opacity: 0.78, marginTop: 2 }}>Your data · your model · query from any MCP-compatible AI client</div>
          </div>
          <StatusPill text="LIVE" variant="success"/>
        </div>

        {/* Five equal MCP client windows — same question, answered via FreightPOP MCP */}
        <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
          {EXEC_CLIENTS.map((c) => <MCPWindow key={c.brand} client={c} localT={localT}/>)}
        </div>
      </div>
    </V3ViewWrap>
  );
}

// One MCP client window. Collapsed tool summary expands to reveal each call +
// result, then Done — Claude-style — then the answer. All windows are equal size.
function MCPWindow({ client, localT = 0 }) {
  const d = client.d || 0;
  const askOp = v3Clamp((localT - (1.0 + d)) / 0.5);
  const toolsShown = localT > 2.5 + d;
  const expanded = localT > 3.2 + d;
  const loadingDone = localT > 3.9 + d;
  const toolAt = (i) => 4.2 + d + i * 0.55;
  const toolsDone = localT > toolAt(EXEC_TOOLS.length - 1) + 0.5;
  const answerOp = v3Clamp((localT - (toolAt(EXEC_TOOLS.length - 1) + 1.1)) / 0.6);
  return (
    <div style={{
      minHeight: 0, background: '#fff', borderRadius: 8, overflow: 'hidden',
      border: '1px solid ' + FP.borderLight, display: 'flex', flexDirection: 'column',
      boxShadow: '0 3px 10px rgba(15,23,42,0.07)',
    }}>
      {/* Window chrome */}
      <div style={{ padding: '9px 11px', background: '#FBFCFD', borderBottom: '1px solid ' + FP.borderLight, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FC615D' }}/>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FDBC40' }}/>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: '#34C748' }}/>
        </div>
        <div style={{ width: 1, height: 13, background: FP.borderLight, marginLeft: 3 }}/>
        <div style={{ width: 19, height: 19, borderRadius: 4, background: client.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 700, fontFamily: fpFont.heading, flexShrink: 0 }}>{client.icon}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: FP.textDark, fontFamily: fpFont.heading, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{client.brand}</div>
          <div style={{ fontSize: 9, color: FP.subtle, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{client.sub}</div>
        </div>
        <div style={{ fontSize: 8, fontWeight: 700, padding: '2px 5px', borderRadius: 3, background: FP.greenLight, color: FP.green, fontFamily: fpFont.mono, letterSpacing: '0.04em', flexShrink: 0 }}>MCP</div>
      </div>

      {/* Conversation */}
      <div style={{ flex: 1, minHeight: 0, padding: '12px 12px', display: 'flex', flexDirection: 'column', gap: 9, overflow: 'hidden' }}>
        {/* Ask */}
        <div style={{
          alignSelf: 'flex-end', maxWidth: '92%',
          background: '#EEF1F5', color: FP.textDark,
          padding: '8px 10px', borderRadius: 9, borderBottomRightRadius: 2,
          fontSize: 11, lineHeight: 1.45,
          opacity: askOp, transform: 'translateY(' + ((1 - askOp) * 5) + 'px)',
        }}>{EXEC_ASK}</div>

        {/* Tool summary */}
        {toolsShown && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: '#6B6557', fontWeight: 500 }}>
              {toolsDone ? (
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#9C8F6E" strokeWidth="1.4"/><path d="M5 8l2 2 4-4.5" stroke="#9C8F6E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              ) : (
                <span style={{ width: 11, height: 11, border: '2px solid #D8D0BC', borderTopColor: '#9C8F6E', borderRadius: 6, display: 'inline-block', animation: 'fp-spin 0.8s linear infinite' }}/>
              )}
              <span>{toolsDone ? 'Used 5 tools · loaded tools' : 'Querying FreightPOP…'}</span>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: expanded ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'transform 240ms', marginLeft: 'auto' }}><path d="M3 4.5l3 3 3-3" stroke="#9C8F6E" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>

            {expanded && (
              <div style={{ marginTop: 8, marginLeft: 4, paddingLeft: 10, borderLeft: '2px solid #E4DECF', display: 'flex', flexDirection: 'column', gap: 7 }}>
                {/* Loading tools */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.4" stroke="#A29B86" strokeWidth="1.3"/><path d="M9.3 9.3L13 13" stroke="#A29B86" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: 10.5, color: '#6B6557' }}>Loading tools</span>
                  <MCPResultChip done={loadingDone}/>
                </div>
                {/* Tool rows */}
                {EXEC_TOOLS.map((tl, i) => {
                  const rowOp = v3Clamp((localT - (toolAt(i) - 0.5)) / 0.4);
                  const done = localT > toolAt(i) + 0.5;
                  if (rowOp <= 0) return null;
                  return (
                    <div key={tl.name} style={{ opacity: rowOp }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 11, height: 11, flexShrink: 0 }}/>
                        <span style={{ fontSize: 10, fontFamily: fpFont.mono, color: '#A6A199', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tl.name}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 17, marginTop: 3 }}>
                        <MCPResultChip done={done}/>
                        <span style={{ fontSize: 10, color: done ? '#A6A199' : '#C2BCB0', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{done ? tl.result : 'running…'}</span>
                      </div>
                    </div>
                  );
                })}
                {/* Done */}
                {toolsDone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-7" stroke="#1F8A5B" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span style={{ fontSize: 10.5, color: '#1F8A5B', fontWeight: 600 }}>Done</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Answer */}
        {answerOp > 0.02 && (
          <div style={{
            alignSelf: 'flex-start', maxWidth: '96%',
            background: '#F7F8FA', border: '1px solid #E7E9ED',
            borderRadius: 10, borderBottomLeftRadius: 2,
            padding: '9px 11px',
            fontSize: 10.5, lineHeight: 1.5, color: '#2C2A24',
            opacity: answerOp, transform: 'translateY(' + ((1 - answerOp) * 5) + 'px)',
          }}>
            Pulling your <strong>Carrier Performance report</strong>: <strong>Echo Global</strong> is the one to watch — a $4,820 claim and a breakdown delay dropped on-time delivery to <strong>88%</strong> (below your 90% floor) and pushed transit-time error up. There are also <strong>3 open claims</strong> (~$11K). Flag Echo for your next carrier review?
          </div>
        )}
      </div>
    </div>
  );
}

function MCPResultChip({ done }) {
  return (
    <span style={{
      fontSize: 8.5, fontWeight: 700, fontFamily: fpFont.mono, letterSpacing: '0.05em',
      padding: '1px 5px', borderRadius: 3,
      background: done ? '#EAF2EC' : '#F0EDE4', color: done ? '#1F8A5B' : '#A29B86',
    }}>Result</span>
  );
}

// ───────────────────────────────────────────────────────────────────────────
// Exports
// ───────────────────────────────────────────────────────────────────────────
Object.assign(window, {
  ViewLoadPlanning, ViewAccessorials, ViewRateShop,
  ViewException, ViewAgentBuilder, ViewInvoiceAudit,
  ViewClaim, ViewMCP,
});
