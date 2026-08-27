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
    { id: 'orders', label: 'Orders' },
    { id: 'quote', label: 'Quote/Ship' },
    { id: 'route', label: 'Route Optimization' },
    { id: 'pooling', label: 'Pooling' },
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
      padding: '0 18px 0 14px',
      color: '#fff',
      fontFamily: fpFont.body,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginRight: 26 }}>
        <img src={window.FP_IMG['freightpop-logo-white.png']} alt="FreightPOP" style={{ height: 46, width: 'auto', display: 'block' }}/>
      </div>

      {/* Search */}
      <div style={{
        width: 240, height: 38, borderRadius: 4, background: '#fff',
        display: 'flex', alignItems: 'center', gap: 9, padding: '0 12px', marginRight: 18,
      }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.6" stroke={FP.subtle} strokeWidth="1.4"/><path d="M10.6 10.6L14 14" stroke={FP.subtle} strokeWidth="1.4" strokeLinecap="round"/></svg>
        <span style={{ fontSize: 13, color: FP.muted }}>Search</span>
      </div>

      {/* AI BETA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginRight: 16, whiteSpace: 'nowrap' }}>
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
          <path d="M10 2.4l1.5 4.1 4.1 1.5-4.1 1.5L10 13.6 8.5 9.5 4.4 8l4.1-1.5L10 2.4z" fill="#fff"/>
          <path d="M15.6 12.6l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9z" fill="#fff"/>
        </svg>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>AI BETA</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 14 }}>
        <div style={{
          padding: '9px 15px', borderRadius: 3,
          background: FP.blue, color: '#fff',
          fontSize: 12.5, fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap',
        }}>NEW EXPERIENCE</div>
        <div style={{
          padding: '9px 13px', color: '#fff',
          fontSize: 12.5, fontWeight: 700, letterSpacing: '0.03em', whiteSpace: 'nowrap',
        }}>DASHBOARD</div>
      </div>
      <div style={{ width: 1, height: 26, background: 'rgba(255,255,255,0.22)', marginRight: 10 }}/>

      <div style={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center' }}>
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <div key={it.id} style={{
              padding: '8px 11px',
              fontSize: 14.5,
              color: '#fff',
              fontWeight: isActive ? 700 : 500,
              opacity: isActive ? 1 : 0.92,
              borderBottom: isActive ? '2px solid #4D9BE0' : '2px solid transparent',
              whiteSpace: 'nowrap',
            }}>{it.label}</div>
          );
        })}
      </div>

      <div style={{ position: 'relative', marginLeft: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 22,
          background: '#E0E7EE',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden',
        }}>
          <svg width="30" height="30" viewBox="0 0 18 18">
            <circle cx="9" cy="6" r="3.4" fill="#8C98A6"/>
            <path d="M1.8 17c0-3.6 3.2-6.2 7.2-6.2s7.2 2.6 7.2 6.2" fill="#8C98A6"/>
          </svg>
        </div>
        <div style={{
          position: 'absolute', top: -1, right: -1,
          width: 19, height: 19, borderRadius: 10,
          background: '#D8362A', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 10.5, fontWeight: 700,
          border: '2px solid ' + FP.navy,
        }}>1</div>
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
