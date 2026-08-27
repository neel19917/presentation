'use strict';
// Deep-merge stored config over defaults so new deck defaults (e.g. a new module) still appear
// even if the stored document predates them. Arrays of objects are merged by a stable key
// (num / key / id / label / title); stored order wins; items only in defaults are appended.
const KEYS = ['num', 'key', 'id', 'label', 'title'];
const isObj = v => v && typeof v === 'object' && !Array.isArray(v);
function keyOf(o) { if (!isObj(o)) return undefined; for (const k of KEYS) if (o[k] !== undefined) return k + ':' + o[k]; }
function merge(def, stored) {
  if (stored === undefined) return clone(def);
  if (Array.isArray(def) && Array.isArray(stored)) {
    if (def.length && isObj(def[0]) && keyOf(def[0])) {
      const defMap = new Map(def.map(d => [keyOf(d), d]));
      const seen = new Set();
      const out = stored.map(s => { const k = keyOf(s); seen.add(k); return defMap.has(k) ? merge(defMap.get(k), s) : clone(s); });
      for (const d of def) if (!seen.has(keyOf(d))) out.push(clone(d));
      return out;
    }
    return clone(stored); // primitive arrays: stored wins wholesale
  }
  if (isObj(def) && isObj(stored)) {
    const out = {};
    for (const k of new Set([...Object.keys(def), ...Object.keys(stored)])) out[k] = merge(def[k], stored[k]);
    return out;
  }
  return clone(stored);
}
function clone(v) { return v === undefined ? undefined : JSON.parse(JSON.stringify(v)); }
module.exports = { merge, clone };
