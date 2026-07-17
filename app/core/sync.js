/**
 * Cross-window sync between the Presenter and Audience windows.
 *
 * Messages go over BOTH BroadcastChannel AND a localStorage write, because
 * browsers may throttle BroadcastChannel delivery to backgrounded windows
 * (exactly what an audience window on the second monitor can be). Receivers
 * de-duplicate by message id, so double delivery is harmless and single-path
 * failure is invisible.
 */
window.FPSync = (function () {
  const CHANNEL = 'fp-localdemo-sync';
  const listeners = [];
  const seen = [];               // recent message ids (bounded ring)
  let bc = null;

  function deliver(msg) {
    if (!msg) return;
    if (msg._id) {
      if (seen.indexOf(msg._id) !== -1) return;
      seen.push(msg._id);
      if (seen.length > 200) seen.splice(0, 100);
    }
    listeners.forEach((f) => { try { f(msg); } catch (e) { console.error('[FPSync listener]', e); } });
  }

  if ('BroadcastChannel' in window) {
    bc = new BroadcastChannel(CHANNEL);
    bc.onmessage = (e) => deliver(e.data);
  }
  window.addEventListener('storage', (e) => {
    if (e.key === CHANNEL && e.newValue) {
      try { deliver(JSON.parse(e.newValue)); } catch (err) { /* ignore */ }
    }
  });

  return {
    send(msg) {
      msg._id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      if (bc) { try { bc.postMessage(msg); } catch (e) { /* non-cloneable — storage path still goes */ } }
      try { localStorage.setItem(CHANNEL, JSON.stringify(msg)); } catch (e) { /* quota — bc path still goes */ }
    },
    on(fn) { listeners.push(fn); },
  };
})();
