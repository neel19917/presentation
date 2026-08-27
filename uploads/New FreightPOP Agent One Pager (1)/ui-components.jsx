// FreightPOP UI primitives — matching the real product design language.
// Top nav (not sidebar), Material-style components, blue accent.

const FP = {
  // Navy header
  navy: '#1B2A4E',
  navyDeep: '#152141',
  navyLine: '#2A3A5F',
  // Material-style primary blue
  blue: '#1976D2',
  blueDark: '#1565C0',
  blueLight: '#E3F2FD',
  blueRow: '#E8F1FB',
  // Body & cards
  bg: '#EEF1F5',
  cardBg: '#F7F9FC',
  panel: '#FFFFFF',
  // Text
  text: '#1F2937',
  textDark: '#0F172A',
  subtle: '#6B7280',
  muted: '#9CA3AF',
  // Borders
  border: '#D5DBE3',
  borderLight: '#E5E8ED',
  borderInput: '#B0B7C2',
  // Status
  red: '#D32F2F',
  redLight: '#FFEBEE',
  green: '#2E7D32',
  greenLight: '#E8F5E9',
  amber: '#F57C00',
  amberLight: '#FFF3E0',
};

const fpFont = {
  // DM Sans for body, Manrope for headings
  body: '"DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  heading: '"Manrope", "DM Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"Roboto Mono", "JetBrains Mono", ui-monospace, monospace',
};

// ── Top navigation bar (horizontal) ─────────────────────────────────────────
function TopNav({ active = 'dashboard' }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'ai-load-planner', label: 'AI Load Planner', ai: true },
    { id: 'quote', label: 'Quote/Ship' },
    { id: 'route', label: 'Route Optimization' },
    { id: 'pooling', label: 'Pooling' },
    { id: 'batch', label: 'Batch Ship' },
    { id: 'track', label: 'Track' },
    { id: 'history', label: 'History' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'Reports' },
    { id: 'audit', label: 'Audit' },
  ];
  return (
    <div style={{
      height: 72, flexShrink: 0,
      background: FP.navy,
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      color: '#fff',
      fontFamily: fpFont.body,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 32 }}>
        <img src={window.FP_IMG['freightpop-logo-white.png']} alt="FreightPOP" style={{ height: 44, width: 'auto', display: 'block' }}/>
      </div>

      {/* New experience / Dashboard pill toggles */}
      <div style={{ display: 'flex', gap: 6, marginRight: 24 }}>
        <div style={{
          padding: '7px 14px', borderRadius: 4,
          background: FP.blue, color: '#fff',
          fontSize: 11.5, fontWeight: 700, letterSpacing: '0.05em',
        }}>NEW EXPERIENCE</div>
        <div style={{
          padding: '7px 14px',
          color: '#fff',
          fontSize: 11.5, fontWeight: 700, letterSpacing: '0.05em',
        }}>DASHBOARD</div>
      </div>
      <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.15)', marginRight: 18 }}/>

      {/* Nav items */}
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <div key={it.id} style={{
              padding: '8px 12px',
              fontSize: 13.5,
              color: '#fff',
              fontWeight: isActive ? 600 : 400,
              opacity: isActive ? 1 : 0.85,
              borderBottom: isActive ? `2px solid ${FP.blue}` : '2px solid transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {it.ai && (
                <span style={{
                  width: 6, height: 6, borderRadius: 3,
                  background: '#0F7B6C', display: 'inline-block',
                  boxShadow: '0 0 0 2px rgba(15,123,108,0.18)',
                }}/>
              )}
              {it.label}
            </div>
          );
        })}
      </div>

      {/* Avatar with notification badge */}
      <div style={{ position: 'relative', marginLeft: 16 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: '#E0E7EE',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="6.5" r="3" fill={FP.muted}/>
            <path d="M2.5 17c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" fill={FP.muted}/>
          </svg>
        </div>
        <div style={{
          position: 'absolute', top: -2, right: -2,
          width: 18, height: 18, borderRadius: 9,
          background: FP.red, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10, fontWeight: 700,
          border: `2px solid ${FP.navy}`,
        }}>3</div>
      </div>
    </div>
  );
}

function FreightPOPLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 16L16 4l12 12-12 12L4 16z" stroke="#fff" strokeWidth="2.4" strokeLinejoin="round"/>
      <path d="M11 16l5-5 5 5-5 5-5-5z" fill={FP.blue} stroke="#fff" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Page header (title + tab row) ───────────────────────────────────────────
function PageHeader({ title, tabs, activeTab, actions }) {
  return (
    <div style={{
      padding: '20px 32px 0',
      background: '#fff',
      borderBottom: `1px solid ${FP.borderLight}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', minHeight: 36 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: FP.textDark, letterSpacing: '-0.012em', fontFamily: fpFont.heading, whiteSpace: 'nowrap' }}>
          {title}
        </div>
        <div style={{ flex: 1 }}/>
        {actions}
      </div>
      {tabs && (
        <div style={{ display: 'flex', gap: 0, marginTop: 16, overflow: 'hidden' }}>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <div key={tab} style={{
                padding: '10px 16px',
                fontSize: 12.5, fontWeight: 600, letterSpacing: '0.06em',
                color: isActive ? FP.blue : FP.subtle,
                borderBottom: isActive ? `2px solid ${FP.blue}` : '2px solid transparent',
                fontFamily: fpFont.body,
                whiteSpace: 'nowrap',
              }}>
                {tab}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Material-style outlined button ──────────────────────────────────────────
function MatButton({ variant = 'outlined', children, color = FP.blue, size = 'md' }) {
  const base = {
    fontFamily: fpFont.body,
    fontSize: size === 'sm' ? 11.5 : 13,
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: size === 'sm' ? '6px 12px' : '8px 16px',
    borderRadius: 4,
    border: variant === 'filled' ? 'none' : `1px solid ${color}`,
    background: variant === 'filled' ? color : 'transparent',
    color: variant === 'filled' ? '#fff' : color,
    display: 'inline-flex', alignItems: 'center', gap: 6,
    whiteSpace: 'nowrap',
  };
  return <div style={base}>{children}</div>;
}

// ── Material-style outlined input ───────────────────────────────────────────
function MatInput({ label, value, icon, width = 220, filled = false }) {
  const hasValue = value && value.length > 0;
  return (
    <div style={{
      position: 'relative',
      width,
      height: 44,
      border: `1px solid ${filled || hasValue ? FP.blue : FP.borderInput}`,
      borderRadius: 4,
      background: '#fff',
      padding: '0 12px',
      display: 'flex', alignItems: 'center',
      fontFamily: fpFont.body,
    }}>
      {/* Floating label */}
      <div style={{
        position: 'absolute',
        top: hasValue || filled ? -7 : 12,
        left: hasValue || filled ? 8 : 12,
        fontSize: hasValue || filled ? 10.5 : 13,
        color: hasValue || filled ? FP.blue : FP.subtle,
        background: hasValue || filled ? '#fff' : 'transparent',
        padding: hasValue || filled ? '0 4px' : 0,
        transition: 'all 200ms',
        pointerEvents: 'none',
        fontWeight: 500,
      }}>
        {label}
      </div>
      <div style={{ flex: 1, fontSize: 13.5, color: FP.text }}>{value}</div>
      {icon}
    </div>
  );
}

// ── Material-style toggle ───────────────────────────────────────────────────
function MatToggle({ on, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 34, height: 14, borderRadius: 7,
        background: on ? 'rgba(25, 118, 210, 0.4)' : 'rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: -3, left: on ? 17 : -1,
          width: 20, height: 20, borderRadius: 10,
          background: on ? FP.blue : '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'left 200ms',
        }}/>
      </div>
      {label && <div style={{ fontSize: 13, color: FP.text }}>{label}</div>}
    </div>
  );
}

// ── Section card ────────────────────────────────────────────────────────────
function SectionCard({ title, action, children, padding = 18 }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${FP.borderLight}`,
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      {title && (
        <div style={{
          padding: '12px 16px',
          background: FP.cardBg,
          borderBottom: `1px solid ${FP.borderLight}`,
          display: 'flex', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 14, fontWeight: 600, color: FP.textDark,
            fontFamily: fpFont.heading, letterSpacing: '-0.005em',
          }}>{title}</div>
          <div style={{ flex: 1 }}/>
          {action}
        </div>
      )}
      <div style={{ padding }}>
        {children}
      </div>
    </div>
  );
}

// ── KPI card (compact) ──────────────────────────────────────────────────────
function FpKPI({ label, value, delta, deltaColor }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${FP.borderLight}`,
      borderRadius: 4,
      padding: 16,
      flex: 1, minWidth: 0,
      fontFamily: fpFont.body,
    }}>
      <div style={{
        fontSize: 11, color: FP.subtle, fontWeight: 600,
        letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}>
        <div style={{
          fontSize: 28, fontWeight: 600, color: FP.textDark,
          letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums',
          fontFamily: fpFont.heading,
        }}>{value}</div>
        {delta && (
          <div style={{
            fontSize: 11.5, fontWeight: 600,
            color: deltaColor || FP.green,
          }}>{delta}</div>
        )}
      </div>
    </div>
  );
}

// ── Action chip / status pill ───────────────────────────────────────────────
function StatusPill({ text, variant = 'info' }) {
  const v = {
    info: { bg: FP.blueLight, fg: FP.blueDark },
    success: { bg: FP.greenLight, fg: FP.green },
    warn: { bg: FP.amberLight, fg: FP.amber },
    danger: { bg: FP.redLight, fg: FP.red },
    neutral: { bg: '#F1F5F9', fg: FP.subtle },
  }[variant] || { bg: FP.blueLight, fg: FP.blueDark };
  return (
    <span style={{
      display: 'inline-block',
      padding: '3px 9px', borderRadius: 4,
      background: v.bg, color: v.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
      fontFamily: fpFont.body,
      whiteSpace: 'nowrap',
    }}>{text}</span>
  );
}

// ── Floating action button ──────────────────────────────────────────────────
function FAB() {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 20,
      background: FP.blue, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(25,118,210,0.3)',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16"><path d="M8 3v10 M3 8h10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
    </div>
  );
}

Object.assign(window, {
  FP, fpFont,
  TopNav, FreightPOPLogo, PageHeader,
  MatButton, MatInput, MatToggle,
  SectionCard, FpKPI, StatusPill, FAB,
});
