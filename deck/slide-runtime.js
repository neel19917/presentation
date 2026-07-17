/**
 * slide-runtime.js — include this at the end of every slide:
 *   <script src="../slide-runtime.js"></script>
 *
 * Gives a slide two abilities:
 *
 * 1. BUILD STEPS ("fragments"): any element with data-step="1..n" starts
 *    hidden and reveals as the presenter advances. Multiple elements may
 *    share a step number (they appear together).
 *
 * 2. KEY FORWARDING: navigation keys pressed while focus is inside the
 *    slide iframe are forwarded to the framework, so arrows always work —
 *    except when typing in an input/textarea (for interactive demo slides).
 */
(function () {
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-step]'));
  var total = 0;
  els.forEach(function (e) { total = Math.max(total, parseInt(e.getAttribute('data-step'), 10) || 0); });

  function apply(n) {
    els.forEach(function (e) {
      var step = parseInt(e.getAttribute('data-step'), 10) || 0;
      e.classList.toggle('fp-hidden', step > n);
    });
  }
  // Open a slide directly with ?step=N (or ?step=all) to preview it revealed.
  var m = /[?&]step=(all|\d+)/.exec(location.search);
  apply(m ? (m[1] === 'all' ? 999 : parseInt(m[1], 10)) : 0);

  function report() {
    if (window.parent !== window) window.parent.postMessage({ fp: 'steps', total: total }, '*');
  }

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.fp === 'setStep') apply(Math.max(0, d.n | 0));
    if (d.fp === 'hello') report();
  });

  // Forward presentation keys to the parent window (unless typing).
  var NAV_KEYS = ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp',
    'Home', 'End', ' ', 'b', 'B', '.', 'g', 'G', 'f', 'F', 't', 'T', 'Escape'];
  window.addEventListener('keydown', function (e) {
    if (window.parent === window) return;
    var t = e.target;
    if (t && t.matches && t.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (NAV_KEYS.indexOf(e.key) !== -1) {
      window.parent.postMessage({ fp: 'key', key: e.key }, '*');
      e.preventDefault();
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', report);
  else report();
})();
