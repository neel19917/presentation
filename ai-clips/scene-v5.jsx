// scene-v3.jsx — Per-section clips with table-setter intros.
// Each chapter is its OWN clip (own scrubber, own play/pause, starts at 0:00).
// Picking a chapter from the menu remounts the Stage.
//
// Chapter timeline:
//   [0, introDur]     — table-setter overlay (white FreightPOP screen + value statement)
//   [introDur, total] — walkthrough (view + AI chat events)
//
// Events use LOCAL walkthrough time (the table-setter is added on top automatically).

function clampV4(v, a = 0, b = 1) { return Math.max(a, Math.min(b, v)); }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
function tweenV4(now, start, end, ease = easeInOutCubic) {
  if (now <= start) return 0;
  if (now >= end) return 1;
  return ease((now - start) / (end - start));
}

// Slower pace so it reads as a real UI session rather than a presentation
const PACE_V4 = 1.35;

// ── Chapter definitions ────────────────────────────────────────────────────
// Order matches the revision brief:
//   1 Load Planning · 2 Accessorials · 3 Rate Shop · 4 Exception
//   5 Agent Builder · 6 Invoice Audit · 7 Claims · 8 Executive MCP
const CHAPTERS_V4 = [
  // ── 1. LOAD PLANNING ────────────────────────────────────────────────────
  // Three internal phases: A new tab → B coaching → C execution
  {
    id: 'load-planning',
    nav: 'ai-load-planner',
    title: 'Load planning',
    sub: 'Coach the agent on your model',
    setter: {
      eyebrow: 'STEP 01 · LOAD PLANNING',
      headline: 'Planning that learns\nhow you ship.',
      sub: 'Coach the load planner on your consolidation rules once — it builds compliant loads automatically and sharpens with every correction.',
    },
    introDur: 4.0,
    dur: 34.0,
    view: (t) => <ViewLoadPlanning localT={t}/>,
    events: [
      // Phase A (0–4s): empty AI Load Planner page in view
      { at: 0.5, kind: 'status', text: 'AI Load Planner — new tab in your nav' },
      { at: 3.5, kind: 'clearStatus' },

      // Phase B (4–20s): user picks PDF path → upload → parse → cards fill → follow-ups
      { at: 4.0, kind: 'user', content: "Help me configure the load planner for my business." },
      { at: 5.5, kind: 'agent', content: "Three ways to get me up to speed:\n• Drop a PDF of your planning rules — I'll parse it\n• Teach me the rules conversationally\n• Step me through a Q&A\n\nPDF is fastest if you have one." },
      { at: 8.5, kind: 'user', content: null, attachment: { kind: 'doc', title: 'Logistics_Planning_Rules.pdf', body: '14 pages · uploaded' } },
      { at: 9.8, kind: 'status', text: 'Parsing your rules document…' },
      { at: 13.0, kind: 'clearStatus' },
      { at: 13.0, kind: 'agent', content: "Got it — extracted 5 rule categories from the PDF. Pre-filled the planner below. Two have gaps I'd like to confirm with you." },
      { at: 16.0, kind: 'agent', content: "Capacity isn't specified in your doc — should I target 85% fill? And no cadence was set — want me to build plans automatically every morning?" },
      { at: 18.4, kind: 'user', content: "85% works. Build them every morning at 6 AM." },
      { at: 19.6, kind: 'agent', content: "Done. I'll build plans every morning at 6:00 AM and hold them for your approval — nothing dispatches until you sign off." },

      // Phase C (20–34s): Autonomous 6 AM run → full plan overview (6 trucks) → drill into Truck #1
      { at: 20.5, kind: 'status', text: '6:00 AM scheduled run · analyzing 47 open orders…' },
      { at: 22.5, kind: 'clearStatus' },
      { at: 22.5, kind: 'agent', proactive: true, content: "This morning's run is ready — I built 6 trucks from your 47 open orders against your rules. Nothing dispatches until you approve." },
      { at: 26.0, kind: 'agent', content: "Opening Truck #1 — TRUCKLOAD 53FT · 45,000 lb · 78.5% volume · 5 stops · 1,180 mi · multi-stop. Honors your 85% target plus geography and required-arrival dates." },
      { at: 30.5, kind: 'agent', content: "Approve Truck #1 to dispatch, or review the other 5 first? I'll hold everything until you decide." },
    ],
  },

  // ── 2. ACCESSORIALS — Quote/Ship Address Validator + satellite ────────────
  {
    id: 'accessorials',
    nav: 'quote',
    title: 'Accessorials',
    sub: 'Address Validator — with satellite & AI recommendations',
    setter: {
      eyebrow: 'STEP 02 · ACCESSORIALS',
      headline: 'Quote accessorials\nright the first time.',
      sub: 'The Address Validator reads each destination with satellite and AI location intelligence, applies the right accessorials at quote, and remembers the location for next time.',
    },
    introDur: 3.5,
    dur: 16.0,
    view: (t) => <ViewAccessorials localT={t}/>,
    events: [
      { at: 0.3, kind: 'user', content: "Booking a shipment to O'Neil Storage — 2826 W Roosevelt St, Phoenix AZ. Verify the address and apply the right accessorials." },
      { at: 2.0, kind: 'status', text: 'Verifying address · pulling satellite imagery…' },
      { at: 4.5, kind: 'clearStatus' },
      { at: 4.5, kind: 'agent', content: "Address verified. Pulled satellite — O'Neil Storage is a storage facility on a shared lot off the SR-55 frontage, with no loading dock on the building. Freight comes off at ground level." },
      { at: 7.5, kind: 'agent', content: "Recommending two accessorials based on what I'm seeing:\n• Destination lift gate — no dock, ground-level unload\n• Limited access delivery — storage facilities bill as limited-access by default" },
      { at: 11.0, kind: 'user', content: "Save both as defaults for this address." },
      { at: 12.5, kind: 'agent', content: "Saved. Every future shipment to 2826 W Roosevelt St will pre-apply both accessorials — in quote/ship, batch booking, EDI, anywhere. No more surprise re-bills." },
    ],
  },

  // ── 3. RATE SHOP — pre-configured rules, then execute + book ────────────
  {
    id: 'rate-shop',
    nav: 'quote',
    title: 'Rate shop',
    sub: 'Run your rules, book, send docs',
    setter: {
      eyebrow: 'STEP 03 · RATE SHOP',
      headline: 'Your rules,\nexecuted in seconds.',
      sub: 'Rate shop every booking against your own price, service, and transit rules — then book and generate the documents in one step.',
    },
    introDur: 3.5,
    dur: 25.0,
    view: (t) => <ViewRateShop localT={t}/>,
    events: [
      { at: 0.3, kind: 'status', text: 'Loading your configured rate-shop rules…' },
      { at: 4.0, kind: 'clearStatus' },
      { at: 4.0, kind: 'agent', content: "Pulled your 4 active rules — cheapest preferred, ≥ 90% on-time, respect tight transit, preferred carriers. Standing by to shop." },
      { at: 6.5, kind: 'user', content: "Rate shop the load." },
      { at: 8.0, kind: 'status', text: 'Rate shopping 1 lane against your rules…' },
      { at: 10.0, kind: 'clearStatus' },
      { at: 10.0, kind: 'agent', content: "Based on your rule “cheapest carrier above 90% on-time,” Echo Global was selected at $1,048.13. Estes was $40 cheaper at 88% — below your floor, so I skipped it." },
      { at: 13.0, kind: 'user', content: "Book it. Generate the docs and send to the dock." },
      { at: 14.5, kind: 'status', text: 'Booking shipment & generating documents…' },
      { at: 16.2, kind: 'clearStatus' },
      { at: 16.2, kind: 'agent', content: "Booked. Shipment 11252388. Documents generated and ready for review:", attachment: { kind: 'docs', items: [
        { name: 'BOL_11252388.pdf', meta: 'Bill of Lading · 1 page' },
        { name: 'PackingList_11252388.pdf', meta: 'Packing List · 1 page' },
        { name: 'ShippingLabels_11252388.pdf', meta: 'Shipping Labels · 4x6' },
        { name: 'TruckloadManifest_11252388.pdf', meta: 'Truckload Manifest · FTL' },
      ]} },
    ],
  },

  // ── 4. PROACTIVE EXCEPTION — tracking dashboard + carrier outreach ──────
  {
    id: 'exception',
    nav: 'track',
    title: 'Proactive exception',
    sub: 'From tracking to outreach',
    setter: {
      eyebrow: 'STEP 04 · PROACTIVE EXCEPTION',
      headline: 'Catch exceptions\nbefore they escalate.',
      sub: 'The agent watches every shipment, flags a missed check-in, chases the carrier for a new ETA, and proactively updates your customer.',
    },
    introDur: 3.5,
    dur: 18.0,
    view: (t) => <ViewException localT={t}/>,
    events: [
      { at: 0.4, kind: 'status', text: 'Monitoring 47 active shipments…' },
      { at: 2.5, kind: 'clearStatus' },
      { at: 2.5, kind: 'agent', proactive: true, content: "Heads up — shipment 11252388 missed its check-in. I've emailed the carrier dispatch for an update." },
      { at: 6.0, kind: 'separator', text: '14 minutes later' },
      { at: 6.2, kind: 'agent', content: "Carrier response: truck broke down outside Indio, CA. They're swapping to a backup tractor — new ETA is 2 days later than original." },
      { at: 10.0, kind: 'agent', content: "I've already notified the delivery recipient with the new ETA window and an apology, per your agent build instructions. Watching for their reply." },
      // (previous 'want me to' / user reply removed — the agent is now acting autonomously per its config)
      { at: 14.5, kind: 'separator', text: 'recipient replied' },
      { at: 14.8, kind: 'agent', content: "Recipient confirmed the new window works. No action needed." },
    ],
  },

  // ── 5. AGENT BUILDER — Zapier-style node canvas ─────────────────────────
  {
    id: 'agent-builder',
    nav: 'reports',
    title: 'Agent Builder',
    sub: 'Type. Watch the workflow assemble.',
    setter: {
      eyebrow: 'STEP 05 · AGENT BUILDER',
      headline: 'Build any agent\nin plain language.',
      sub: 'Describe the workflow you want — the agent assembles the triggers, logic, and actions for you to review and activate.',
    },
    introDur: 3.5,
    dur: 20.0,
    view: (t) => <ViewAgentBuilder localT={t}/>,
    events: [
      { at: 0.3, kind: 'user', content: "Build me an invoice-audit agent. Pull invoices weekly, identify the cause of any discrepancy. If it's a missed accessorial, save it as a rule for that destination going forward. If the carrier's pushing back, escalate to our logistics lead. If it's within 5% tolerance, auto-approve and forward to AP. And post every run summary to #ops in Slack." },
      { at: 8.0, kind: 'status', text: 'Wiring workflow…' },
      { at: 10.0, kind: 'clearStatus' },
      { at: 10.0, kind: 'agent', content: "Built. 6 steps: pull → diagnose → branch (accessorial / carrier / tolerance) → recurring rule / escalate / auto-approve → notify Slack." },
      { at: 13.5, kind: 'agent', content: "Slack channel #ops detected and connected. Logistics lead is set to Marcus (from your org chart) — change?" },
      { at: 16.5, kind: 'user', content: "Marcus is right. Activate it." },
      { at: 18.0, kind: 'agent', content: "Activated. First run: Monday 8:00 AM." },
    ],
  },

  // ── 6. INVOICE AUDIT — runs the agent built in step 5 ───────────────────
  {
    id: 'invoice-audit',
    nav: 'audit',
    title: 'Invoice audit',
    sub: 'The auditor agent runs',
    setter: {
      eyebrow: 'STEP 06 · INVOICE AUDIT',
      headline: 'Turn your audit\ninto action.',
      sub: 'The auditor compares every freight invoice to the booking, flags discrepancies by root cause, and saves a rule so the miss never repeats.',
    },
    introDur: 3.5,
    dur: 22.0,
    view: (t) => <ViewInvoiceAudit localT={t}/>,
    events: [
      // Weekly pull (mirrors agent builder trigger)
      { at: 0.3, kind: 'status', text: 'Weekly invoice pull · 47 invoices from AP…' },
      { at: 2.0, kind: 'clearStatus' },
      { at: 2.0, kind: 'agent', proactive: true, content: "Weekly run started — 47 invoices pulled. Diagnosing each against booking + contract." },

      // Branch 1: missed accessorial — save recurring rule (matches agent builder step "If: missed accessorial · Save recurring rule")
      { at: 4.5, kind: 'agent', content: "INV-7842 — $75 discrepancy on shipment 11252101. Cause: destination lift gate charged but not on the booking. This is a miss on our side." },
      { at: 7.0, kind: 'agent', content: "Per your workflow, saving destination lift gate as a recurring rule for 2826 W Roosevelt St so we never miss it again. Confirm?" },
      { at: 9.5, kind: 'user', content: "Confirmed." },
      { at: 10.5, kind: 'agent', content: "Rule saved · invoice approved · forwarded to AP." },

      // Branch 2: carrier dispute — escalate to Marcus (matches agent builder step "If: carrier dispute · Escalate to Marcus")
      { at: 12.0, kind: 'separator', text: 'next exception' },
      { at: 12.3, kind: 'agent', content: "INV-7840 — $312 detention charge. Your gate-in/gate-out shows 1h 40m; carrier billed 3h. Per workflow, escalating to Marcus with timestamped evidence." },
      { at: 15.5, kind: 'agent', content: "Escalation sent to Marcus L. (Ops Lead). Awaiting his call before disputing carrier." },

      // Branch 3: within tolerance — auto-approve (matches "If: within 5% tolerance · Auto-approve · AP")
      { at: 17.0, kind: 'separator', text: 'remaining 44 invoices' },
      { at: 17.3, kind: 'agent', content: "44 of 47 within ±5% tolerance — auto-approved and forwarded to AP per workflow." },
      { at: 20.0, kind: 'agent', content: "Done. Weekly run complete — 1 rule saved, 1 escalated to Marcus, 44 auto-approved." },
    ],
  },

  // ── 7. CLAIMS — WMS receiving + resolution ──────────────────────────────
  {
    id: 'claims',
    nav: 'history',
    title: 'Claims',
    sub: 'From dock door to resolution',
    setter: {
      eyebrow: 'STEP 07 · CLAIMS',
      headline: 'From damage report\nto resolved claim.',
      sub: 'The agent files, documents, and tracks the claim to resolution — then writes the outcome back to the carrier’s performance record automatically.',
    },
    introDur: 3.5,
    dur: 20.5,
    view: (t) => <ViewClaim localT={t}/>,
    events: [
      // Proactive claim from WMS
      { at: 0.4, kind: 'agent', proactive: true, content: "WMS event — carrier Echo arrived at dock door 5. Goods received into inventory at Aisle B / Bin 14. Inspection flagged damage on 2 of 8 pallets." },
      { at: 4.0, kind: 'agent', content: "Photos attached from receiving. Want me to start a claim with Echo?", attachment: { kind: 'images', items: [
        { idx: 0, damaged: true },
        { idx: 1, damaged: true },
        { idx: 2, damaged: false },
        { idx: 3, damaged: false },
      ]} },
      { at: 6.5, kind: 'user', content: "Yes, file it." },
      { at: 8.0, kind: 'status', text: 'Filing claim with carrier…' },
      { at: 9.8, kind: 'clearStatus' },
      { at: 9.8, kind: 'agent', content: "Filed. Claim CLM-2089. Status: pending review. I'll watch for updates." },

      // Resolution update
      { at: 13.0, kind: 'separator', text: '6 days later' },
      { at: 13.3, kind: 'agent', proactive: true, content: "Claim CLM-2089 update: resolved. Echo approved the claim in full — $4,820 refund in process." },
      { at: 16.0, kind: 'agent', content: "And I've written it back to Echo Global's Carrier Performance report — on-time delivery drops to 88%, transit-time error is up, and the $4,820 claim is now on their record. Rate Shop will weight that on future lanes, and it'll surface at your next carrier review." },
    ],
  },

  // ── 8. EXECUTIVE — MCP four-up · no FreightPOP UI ────────────────────────
  {
    id: 'executive',
    nav: null, // No FP top nav — we're showing clients outside the TMS
    noPanel: true, // Hide the FreightPOP AI side chat — the 5 MCP boxes ARE the story
    title: 'Executive review',
    sub: 'Bring your own AI',
    setter: {
      eyebrow: 'STEP 08 · EXECUTIVE REVIEW',
      headline: 'Your agent\nof choice.',
      sub: 'Connect FreightPOP over MCP and pull your logistics data straight into Claude, Copilot, Slack, or any AI client your team already uses.',
    },
    introDur: 3.5,
    dur: 16.0,
    view: (t) => <ViewMCP localT={t}/>,
    events: [
      { at: 0.3, kind: 'status', text: 'Executives ask their AI tools — not yours.' },
      { at: 2.0, kind: 'clearStatus' },
      { at: 2.2, kind: 'user', content: "Which of our carriers are underperforming right now — and what is it costing us in delays and claims?" },
      { at: 4.5, kind: 'status', text: 'Calling FreightPOP MCP tools…' },
      { at: 8.5, kind: 'clearStatus' },
      { at: 8.5, kind: 'agent', content: "From your Carrier Performance report, Echo Global is the one to watch — on-time delivery dropped to 88% (below your 90% floor), transit-time error is up, and there are 3 open claims (~$11K). Want me to flag it for your next carrier review?" },
    ],
  },
];

// ── Chat state builder (local to walkthrough) ───────────────────────────────
function buildChatStateV4(events, localT) {
  const messages = [];
  let status = null;
  let pendingAttachment = null;
  for (const e of events) {
    if (localT < e.at) continue;
    switch (e.kind) {
      case 'user':
        messages.push({ role: 'user', content: e.content, attachment: e.attachment });
        status = null;
        break;
      case 'agent':
        messages.push({
          role: 'agent',
          content: e.content,
          attachment: e.attachment || pendingAttachment,
          proactive: e.proactive,
        });
        pendingAttachment = null;
        status = null;
        break;
      case 'attachment':
        // Standalone attachment from the user — render as a "user" message with attachment
        messages.push({ role: 'user', content: null, attachment: e.attachment });
        break;
      case 'separator':
        messages.push({ separator: e.text });
        break;
      case 'status':
        status = { text: e.text };
        break;
      case 'clearStatus':
        status = null;
        break;
    }
  }
  return { messages, status };
}

// ── Top-level switcher ─────────────────────────────────────────────────────
function FreightPOPVideoV5() {
  const [activeIdx, setActiveIdx] = React.useState(() => {
    try { return parseInt(localStorage.getItem('fp-v4-active') || '0', 10) || 0; }
    catch { return 0; }
  });
  React.useEffect(() => {
    try { localStorage.setItem('fp-v4-active', String(activeIdx)); } catch {}
  }, [activeIdx]);

  // Whether the next chapter mount should auto-play. False on first load so the
  // video waits for the user; flipped on once they pick a chapter from the pills.
  const [autoplayOnPick, setAutoplayOnPick] = React.useState(false);

  // Picking a chapter ALWAYS restarts that chapter from 0:00 — and auto-plays it.
  const handlePick = React.useCallback((newIdx) => {
    if (newIdx === activeIdx) return;
    const newId = CHAPTERS_V4[newIdx].id;
    try { localStorage.removeItem(`fp-v4-${newId}:t`); } catch {}
    setAutoplayOnPick(true);
    setActiveIdx(newIdx);
  }, [activeIdx]);

  const chapter = CHAPTERS_V4[activeIdx];
  const totalDur = (chapter.introDur + chapter.dur) * PACE_V4;

  return (
    <Stage
      key={chapter.id}
      width={1920}
      height={1080}
      duration={totalDur}
      background="#EEF1F5"
      persistKey={`fp-v4-${chapter.id}`}
      autoplay={autoplayOnPick}
    >
      <ChapterClipV4 chapter={chapter}/>
      <ChapterMenuV4 chapters={CHAPTERS_V4} activeIdx={activeIdx} onPick={handlePick}/>
    </Stage>
  );
}

// ── Single chapter clip ────────────────────────────────────────────────────
function ChapterClipV4({ chapter }) {
  const stageTime = useTime();
  const introDur = chapter.introDur * PACE_V4;
  const totalDur = (chapter.introDur + chapter.dur) * PACE_V4;
  // localT runs negative during the table-setter, then 0..chapter.dur for the walkthrough.
  const localT = (stageTime - introDur) / PACE_V4;
  const walkthroughActive = stageTime > introDur - 0.4;

  // Table-setter opacity: full for [0, introDur-0.5], fade out across [-0.5, +0.4]
  const setterFadeOut = clampV4((stageTime - (introDur - 0.5)) / 0.9);
  const setterOpacity = 1 - setterFadeOut;

  // Walkthrough fade-in: rises across [introDur-0.3, introDur+0.4]
  const walkFadeIn = clampV4((stageTime - (introDur - 0.3)) / 0.7);

  const view = walkthroughActive ? chapter.view(Math.max(0, localT), chapter.dur) : null;
  const { messages, status } = buildChatStateV4(chapter.events, Math.max(0, localT));

  const panelProgress = tweenV4(stageTime, introDur + 0.2, introDur + 1.4, easeOutCubic);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: FP.bg, fontFamily: fpFont.body,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Walkthrough layer (always present, but faded in) */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        opacity: walkFadeIn,
        transform: `translateY(${(1 - walkFadeIn) * 8}px)`,
      }}>
        {chapter.nav && <TopNav active={chapter.nav}/>}
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <div style={{ flex: 1, position: 'relative', display: 'flex', minWidth: 0, overflow: 'hidden' }}>
            {view}
          </div>
          {!chapter.noPanel && (
            <AIPanel
              messages={messages}
              status={status}
              openProgress={panelProgress}
              open={panelProgress > 0.1}
              chapter={chapter.title}
            />
          )}
        </div>
        {/* Reserve space for the chapter menu so it doesn't overlap */}
        <div style={{ height: 80, flexShrink: 0 }}/>
      </div>

      {/* Table-setter overlay */}
      {setterOpacity > 0.01 && (
        <TableSetterV4
          setter={chapter.setter}
          progress={1 - setterFadeOut}
          time={stageTime}
        />
      )}
    </div>
  );
}

// ── Table-setter intro ─────────────────────────────────────────────────────
// New brand mint accent — used across all table-setter scenes
const FP_MINT = '#0F7B6C';
const FP_MINT_TINT = '#E7F3F0';

function TableSetterV4({ setter, progress, time }) {
  // Subtle entrance animation
  const inP = clampV4(time / 0.6);
  const enter = easeOutCubic(inP);

  // Reveal cascade
  const lockupOp = clampV4(time / 0.5);
  const eyebrowOp = clampV4((time - 0.5) / 0.5);
  const headlineOp = clampV4((time - 0.85) / 0.6);
  const subOp = clampV4((time - 1.25) / 0.6);
  const accentOp = clampV4((time - 1.6) / 0.5);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: '#FFFFFF',
      opacity: progress,
      zIndex: 60,
      paddingBottom: 80, // matches the reserved chapter-menu strip below
      fontFamily: fpFont.heading, // Manrope across the board
    }}>
      {/* Lockup — top-left brand stamp, not the focal point */}
      <div style={{
        position: 'absolute', top: 56, left: 72,
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: lockupOp,
        transform: `translateY(${(1 - enter) * -6}px)`,
      }}>
        <img
          src={window.FP_IMG['freightpop-logo-full.png']}
          alt="FreightPOP"
          style={{ height: 38, width: 'auto', display: 'block' }}
        />
        <div style={{ width: 1, height: 22, background: '#D9DEE3' }}/>
        <div style={{
          fontFamily: fpFont.heading, fontWeight: 600,
          fontSize: 16, letterSpacing: '0.04em',
          color: FP_MINT,
          textTransform: 'uppercase',
        }}>AI</div>
      </div>

      {/* Centered editorial stack — eyebrow, headline, sub */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 120px 200px',
      }}>
        {/* Eyebrow */}
        <div style={{
          fontSize: 14, fontWeight: 600, letterSpacing: '0.22em',
          color: FP_MINT, fontFamily: fpFont.mono,
          marginBottom: 32,
          opacity: eyebrowOp,
          transform: `translateY(${(1 - eyebrowOp) * 10}px)`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ width: 28, height: 2, background: FP_MINT, borderRadius: 1 }}/>
          {setter.eyebrow}
        </div>

        {/* Headline — Manrope 500, type-spec ratio scaled up for 1920×1080 canvas */}
        <div style={{
          fontFamily: fpFont.heading,
          fontWeight: 500,
          fontSize: 112,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#0B1117',
          textWrap: 'pretty',
          whiteSpace: 'pre-line',
          maxWidth: 1400,
          opacity: headlineOp,
          transform: `translateY(${(1 - headlineOp) * 18}px)`,
        }}>{setter.headline}</div>

        {/* Sub */}
        <div style={{
          marginTop: 36,
          fontFamily: fpFont.heading,
          fontWeight: 400,
          fontSize: 26,
          lineHeight: 1.4,
          letterSpacing: '-0.005em',
          color: '#5C6670',
          maxWidth: 900,
          opacity: subOp,
          transform: `translateY(${(1 - subOp) * 12}px)`,
        }}>{setter.sub}</div>
      </div>

      {/* Bottom-left accent bar */}
      <div style={{
        position: 'absolute', left: 120, bottom: 156,
        width: 64, height: 3, borderRadius: 2,
        background: FP_MINT,
        opacity: accentOp,
      }}/>
    </div>
  );
}

// ── Chapter selector (pill row, lives below walkthrough) ───────────────────
function ChapterMenuV4({ chapters, activeIdx, onPick }) {
  const [hover, setHover] = React.useState(-1);
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 80, flexShrink: 0,
      background: '#0F172A',
      borderTop: `1px solid #1E293B`,
      padding: '14px 28px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 8,
      fontFamily: fpFont.body,
      zIndex: 70,
    }}>
      {chapters.map((c, i) => {
        const isActive = i === activeIdx;
        const isHover = i === hover;
        const emph = isActive || isHover;
        return (
          <div
            key={c.id}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(-1)}
            onClick={() => onPick(i)}
            style={{
              cursor: 'pointer',
              padding: emph ? '10px 18px' : '9px 14px',
              borderRadius: 999,
              background: isActive ? FP.blue : (isHover ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)'),
              border: `1px solid ${isActive ? FP.blue : (isHover ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)')}`,
              display: 'flex', alignItems: 'center', gap: 9,
              transition: 'all 180ms ease',
              transform: emph ? 'translateY(-2px) scale(1.04)' : 'scale(1)',
              boxShadow: isActive ? '0 6px 16px rgba(25,118,210,0.4)' : 'none',
            }}
          >
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              background: isActive ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11.5, fontWeight: 700,
              fontFamily: fpFont.mono,
              color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
              letterSpacing: '0.04em',
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div style={{
              fontSize: emph ? 16.5 : 15.5,
              fontWeight: 600,
              color: isActive ? '#fff' : (isHover ? '#fff' : 'rgba(255,255,255,0.78)'),
              fontFamily: fpFont.heading,
              letterSpacing: '-0.005em',
              whiteSpace: 'nowrap',
            }}>{c.title}</div>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { FreightPOPVideoV5, CHAPTERS_V4, buildChatStateV4, PACE_V4 });
