/**
 * DECK MANIFEST — the single place that defines your presentation.
 *
 * Each slide entry:
 *   file    — HTML file under deck/ (usually deck/slides/…). ANY html works;
 *             it renders inside the stage. Design at 1920×1080 for crisp scaling.
 *   url     — alternative to `file`: embed a URL. Root-relative paths
 *             ("/Presentation/x.html") serve from this folder; https URLs work
 *             too (needs internet + must allow iframing).
 *   title   — shown in the presenter console + slide grid.
 *   section — groups slides in the grid overview (G).
 *   notes   — speaker notes (presenter screen only). Use \n for line breaks.
 *   fit     — "scale" (default: designed at 1920×1080, scaled to fit) or
 *             "native" (fills the screen at natural size — use for live,
 *             responsive, interactive demos).
 *   keys    — "relay" for app-style decks that have their OWN internal
 *             keyboard navigation (like the bundled TMS deck): arrows/Space/
 *             Enter/Esc are injected into both the presenter preview and the
 *             audience copy in lockstep instead of changing slides. Press R
 *             to reload/restart both copies together.
 *
 * To add a slide: drop an .html file in deck/slides/ and add one entry here.
 * Order in this array = presentation order.
 */
window.FP_DECK = {
  title: 'FreightPOP — TMS Deck (July 2026)',
  slides: [
    {
      url: '/Presentation/TMSDeck-dev.html',
      fit: 'native',
      keys: 'relay',
      sync: 'dc',       // full state + click/input/scroll sync via the injected bridge
      title: 'FreightPOP TMS Deck',
      section: 'Demo',
      notes:
        'FULLY SYNCED — every hotspot click, key press, screen change, search and scroll mirrors between this preview and the big screen (either direction).\n' +
        '→ / Space: advance · ←: back · Enter: select · Esc: close overlays\n' +
        'G: jump grid — includes every deck screen + every module with its 4 steps (Problem / Benefit / Live Demo / Validation)\n' +
        'A (or ↻ Replay anim): replay this screen\'s reveal animations on both screens\n' +
        'R: hard-restart both copies at the intro · B: blackout the big screen\n' +
        'Heads-up: the "Interactive Walkthrough" screen embeds an external site (needs internet, interactions inside it do NOT sync). Carrier/ERP logos also load from the internet.',
    },

    {
      url: '/modules/route-optimization-explainer.html',
      fit: 'native',
      title: 'Route Optimization — Step by Step',
      section: 'Demo',
      // Chapter chips in the G grid seek EVERY mounted copy of this video —
      // this slide and the embed inside the TMS deck's module 06 — via its
      // BroadcastChannel.
      videoChannel: 'fp-roadmap-video-sync',
      // Where this video lives inside the interactive deck (module 06 · Live
      // Demo) — chapter chips jump there instead of leaving the deck slide.
      deckHost: { view: 'feature', fi: 5, step: 2, sysKey: 'tms' },
      chapters: [
        { label: 'Intro', t: 0 }, { label: 'Import', t: 6 }, { label: 'Rules', t: 18 },
        { label: 'Optimize', t: 30 }, { label: 'Dispatch', t: 42 },
        { label: 'Track+POD', t: 54 }, { label: 'Result', t: 68 },
      ],
      notes:
        'Auto-plays (80s, loop it by pressing ← at the end). Space: play/pause · ←/→: chapter jump — all synced between this preview and the big screen automatically.\n' +
        'Chapters: Intro → Import → Rules → Optimize → Dispatch → Track+POD → Result.\n' +
        'PageUp/PageDown switch deck slides; arrows stay inside the video.',
    },

    // ── Starter slides (kept for reference — uncomment any to append) ────
    // { file: 'slides/01-title.html',         title: 'Title — One Login, All Your Freight', section: 'Starter', notes: '' },
    // { file: 'slides/02-problem.html',       title: 'The Problem',            section: 'Starter', notes: '' },
    // { file: 'slides/03-platform.html',      title: 'One Platform',           section: 'Starter', notes: '' },
    // { file: 'slides/04-modes.html',         title: 'Every Mode, One Login',  section: 'Starter', notes: '' },
    // { file: 'slides/05-rate-shopping.html', title: 'Rate Shopping',          section: 'Starter', notes: '' },
    // { file: 'slides/06-tracking.html',      title: 'Tracking & Visibility',  section: 'Starter', notes: '' },
    // { file: 'slides/07-audit.html',         title: 'Invoice Audit',          section: 'Starter', notes: '' },
    // { file: 'slides/08-integrations.html',  title: 'ERP & Integrations',     section: 'Starter', notes: '' },
    // { file: 'slides/09-analytics.html',     title: 'Analytics & Reporting',  section: 'Starter', notes: '' },
    // { file: 'slides/10-roi.html',           title: 'ROI',                    section: 'Starter', notes: '' },
    // { file: 'slides/11-live-demo.html',     title: 'Live Demo',              section: 'Starter', notes: '' },
    // { file: 'slides/12-closing.html',       title: 'Closing / Next Steps',   section: 'Starter', notes: '' },
  ],
};
