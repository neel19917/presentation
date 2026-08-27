// AI Intelligence panel — restyled to match FreightPOP's blue Material aesthetic.

function AIPanel({ messages = [], typingText = null, status = null, open = true, openProgress = 1, chapter = null }) {
  const width = 440;
  const translateX = (1 - openProgress) * width;
  return (
    <div style={{
      width, flexShrink: 0,
      background: '#FFFFFF',
      borderLeft: `1px solid ${FP.borderLight}`,
      display: 'flex', flexDirection: 'column',
      transform: `translateX(${translateX}px)`,
      transition: 'transform 320ms cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: open ? '-12px 0 32px rgba(27, 42, 78, 0.06)' : 'none',
      fontFamily: fpFont.body,
      height: '100%',
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: `1px solid ${FP.borderLight}`,
        display: 'flex', alignItems: 'center', gap: 12,
        background: '#fff',
      }}>
        <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 36, height: 36, display: 'block' }}/>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: FP.textDark, fontFamily: fpFont.heading, letterSpacing: '-0.005em' }}>
            FreightPOP AI
          </div>
          <div style={{ fontSize: 11, color: FP.subtle, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: FP.green }}/>
            Connected to your TMS
          </div>
        </div>
        {chapter && (
          <div style={{
            fontSize: 10, fontWeight: 700, color: FP.blue,
            padding: '4px 9px', borderRadius: 4,
            background: FP.blueLight,
            letterSpacing: '0.06em', fontFamily: fpFont.mono,
          }}>{chapter}</div>
        )}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, padding: '16px 20px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 10,
        justifyContent: 'flex-end',
        background: '#FAFBFD',
      }}>
        {messages.map((m, i) => (
          <Message key={i} {...m} />
        ))}
        {status && <AgentStatus {...status} />}
      </div>

      {/* Input area */}
      <div style={{
        padding: '14px 20px 18px',
        background: '#fff',
        borderTop: `1px solid ${FP.borderLight}`,
      }}>
        <div style={{
          background: '#fff',
          border: `1.5px solid ${typingText ? FP.blue : FP.borderInput}`,
          borderRadius: 4,
          padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          minHeight: 22,
          transition: 'border-color 200ms',
        }}>
          <div style={{
            flex: 1, fontSize: 13.5, color: typingText ? FP.text : FP.muted,
            lineHeight: 1.4,
          }}>
            {typingText ? (
              <>
                {typingText}
                <span style={{
                  display: 'inline-block', width: 2, height: 14,
                  background: FP.blue, marginLeft: 1,
                  verticalAlign: 'middle',
                  animation: 'fp-blink 0.8s steps(2) infinite',
                }}/>
              </>
            ) : (
              'Ask FreightPOP AI anything…'
            )}
          </div>
          <div style={{
            width: 30, height: 30, borderRadius: 4,
            background: typingText ? FP.blue : '#F1F5F9',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l10-5-3 12-2-5-5-2z" fill={typingText ? '#fff' : FP.muted}/>
            </svg>
          </div>
        </div>
        <div style={{
          display: 'flex', gap: 8, marginTop: 8,
          fontSize: 11, color: FP.muted,
          fontFamily: fpFont.mono,
        }}>
          <span>⌘K</span><span>·</span><span>shift+enter for new line</span>
        </div>
      </div>
    </div>
  );
}

function Message({ role, content, tools, summary, attachment, separator, proactive }) {
  if (separator) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        margin: '4px 0', color: FP.muted, fontSize: 11,
        fontFamily: fpFont.mono,
      }}>
        <div style={{ flex: 1, height: 1, background: FP.borderLight }}/>
        <span style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600 }}>{separator}</span>
        <div style={{ flex: 1, height: 1, background: FP.borderLight }}/>
      </div>
    );
  }

  if (role === 'user') {
    // Prospect / "Your Employee" — RIGHT-aligned
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: FP.textDark,
          letterSpacing: '0.02em', whiteSpace: 'nowrap',
        }}>Your Employee</div>
        {content && (
          <div style={{
            maxWidth: '92%',
            background: '#14495A', color: '#fff',
            padding: '10px 14px', borderRadius: 18,
            fontSize: 13.5, lineHeight: 1.5,
            whiteSpace: 'pre-line',
          }}>
            {content}
          </div>
        )}
        {attachment && (
          <div style={{ maxWidth: '92%', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ maxWidth: '92%', width: 'auto' }}>
              <AttachmentCard {...attachment}/>
            </div>
          </div>
        )}
      </div>
    );
  }

  // FreightPOP — LEFT-aligned
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 700, color: FP.textDark,
        letterSpacing: '0.02em', whiteSpace: 'nowrap',
      }}>
        <img src={window.FP_IMG['freightpop-diamond.png']} alt="" style={{ width: 14, height: 14, display: 'block' }}/>
        FreightPOP
      </div>
      <div style={{ maxWidth: '92%', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}>
        {proactive && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            fontSize: 10, fontWeight: 700, color: FP.red,
            padding: '2px 7px', borderRadius: 3,
            background: FP.redLight,
            letterSpacing: '0.06em',
          }}>
            <span style={{ width: 5, height: 5, borderRadius: 3, background: FP.red }}/>
            PROACTIVE ALERT
          </div>
        )}
        {content && (
          <div style={{
            background: '#fff',
            border: `1px solid ${FP.borderLight}`,
            padding: '10px 14px', borderRadius: 4,
            fontSize: 13.5, lineHeight: 1.55, color: FP.text,
            whiteSpace: 'pre-line',
          }}>
            {content}
          </div>
        )}
        {tools && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
            {tools.map((t, i) => <ToolCall key={i} {...t} />)}
          </div>
        )}
        {attachment && <AttachmentCard {...attachment} />}
        {summary && (
          <div style={{
            width: '100%',
            background: '#fff',
            border: `1px solid ${FP.borderLight}`,
            borderRadius: 4,
            padding: '10px 14px',
          }}>
            {summary.map((row, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 12, padding: '4px 0',
                borderTop: i > 0 ? `1px solid ${FP.borderLight}` : 'none',
                marginTop: i > 0 ? 4 : 0, paddingTop: i > 0 ? 8 : 0,
                gap: 12,
              }}>
                <span style={{ color: FP.subtle }}>{row[0]}</span>
                <span style={{ color: FP.textDark, fontWeight: 600, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>{row[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ToolCall({ name, args, status = 'done' }) {
  return (
    <div style={{
      background: '#F1F5F9',
      border: `1px solid ${FP.borderLight}`,
      borderRadius: 4,
      padding: '7px 11px',
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 11.5, fontFamily: fpFont.mono,
      color: FP.text,
    }}>
      <div style={{
        width: 13, height: 13, borderRadius: 3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: status === 'running' ? FP.amberLight : FP.greenLight,
        color: status === 'running' ? FP.amber : FP.green,
      }}>
        {status === 'running' ? (
          <div style={{
            width: 5, height: 5, borderRadius: 3,
            background: 'currentColor',
            animation: 'fp-pulse 0.8s ease-in-out infinite',
          }}/>
        ) : (
          <svg width="9" height="9" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </div>
      <span style={{ color: FP.subtle }}>tool:</span>
      <span style={{ fontWeight: 600 }}>{name}</span>
      {args && <span style={{ color: FP.subtle, fontSize: 10.5 }}>{args}</span>}
    </div>
  );
}

function AgentStatus({ text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      color: FP.subtle, fontSize: 12.5,
      alignSelf: 'flex-start',
    }}>
      <div style={{ display: 'flex', gap: 3 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: 3,
            background: FP.blue,
            animation: `fp-bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
          }}/>
        ))}
      </div>
      <span style={{ fontStyle: 'italic' }}>{text}</span>
    </div>
  );
}

function AttachmentCard({ kind, title, body, items }) {
  if (kind === 'doc') {
    return (
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderRadius: 4, padding: 12,
        display: 'flex', gap: 10, alignItems: 'center',
        width: '100%',
      }}>
        <div style={{
          width: 32, height: 40, borderRadius: 3,
          background: FP.redLight,
          border: `1px solid ${FP.red}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: fpFont.mono, fontSize: 9.5, fontWeight: 700,
          color: FP.red,
        }}>PDF</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: FP.textDark }}>{title}</div>
          <div style={{ fontSize: 11, color: FP.subtle, marginTop: 2 }}>{body}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8 M8 4l3 3-3 3" stroke={FP.subtle} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
    );
  }
  if (kind === 'docs') {
    // List of generated documents (Rate-shop — BOL / Packing slip / Label etc.)
    return (
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderRadius: 4, padding: 8,
        display: 'flex', flexDirection: 'column', gap: 6,
        width: '100%',
      }}>
        {items.map((d, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '6px 6px',
            borderRadius: 3,
          }}>
            <div style={{
              width: 26, height: 32, borderRadius: 2,
              background: '#FFF1F1',
              border: `1px solid #E5908F`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: fpFont.mono, fontSize: 8.5, fontWeight: 700,
              color: '#C13D3C',
              flexShrink: 0,
            }}>PDF</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: FP.textDark, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
              <div style={{ fontSize: 10.5, color: FP.subtle, marginTop: 1 }}>{d.meta}</div>
            </div>
            <div style={{
              fontSize: 9.5, fontWeight: 700,
              color: FP.blue, fontFamily: fpFont.mono,
              letterSpacing: '0.06em',
            }}>PREVIEW</div>
          </div>
        ))}
      </div>
    );
  }
  if (kind === 'images') {
    // Grid of receiving / damage photos. Items: [{idx, damaged}]
    return (
      <div style={{
        background: '#fff', border: `1px solid ${FP.borderLight}`,
        borderRadius: 4, padding: 8, width: '100%',
      }}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: FP.subtle,
          letterSpacing: '0.06em', fontFamily: fpFont.mono,
          marginBottom: 6,
        }}>RECEIVING PHOTOS · {items.length} ATTACHED</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {items.map((p, i) => (
            <ChatDamagePhoto key={i} idx={p.idx} damaged={p.damaged}/>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Compact damage-photo thumbnail used inside chat attachments — mirrors the
// main view's image-slot by sharing the same id so a single user drop fills
// both places.
function ChatDamagePhoto({ idx, damaged }) {
  const photos = window.PALLET_PHOTOS || [];
  return (
    <div style={{
      aspectRatio: '4 / 3', borderRadius: 3,
      border: `1px solid ${damaged ? FP.red : '#3a4540'}`,
      position: 'relative', overflow: 'hidden',
      background: '#0e0f12',
    }}>
      <img src={photos[idx]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      {damaged && (
        <div style={{
          position: 'absolute', bottom: 3, right: 3,
          fontSize: 7, fontWeight: 700, color: '#fff',
          background: FP.red, padding: '1px 3px', borderRadius: 1.5,
          fontFamily: fpFont.mono, letterSpacing: '0.04em',
        }}>DMG</div>
      )}
    </div>
  );
}

Object.assign(window, {
  AIPanel, Message, ToolCall, AgentStatus, AttachmentCard,
});
