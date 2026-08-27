'use strict';
// JSON-file store on the Railway volume (DATA_DIR, default /data or ./data). Keeps a revision per publish.
const fs = require('fs'), path = require('path');
const DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data');
try { fs.mkdirSync(DIR, { recursive: true }); } catch (e) { console.error('[store] cannot create DATA_DIR', DIR, e.message); }
const REV = path.join(DIR, 'revisions');
fs.mkdirSync(REV, { recursive: true });
const CUR = path.join(DIR, 'config.json');
function readCurrent() { try { return JSON.parse(fs.readFileSync(CUR, 'utf8')); } catch { return null; } }
function writeAtomic(file, obj) { const tmp = file + '.tmp'; fs.writeFileSync(tmp, JSON.stringify(obj, null, 2)); fs.renameSync(tmp, file); }
function publish(data, meta) {
  const prev = readCurrent();
  const doc = { version: (prev ? prev.version : 0) + 1, updatedAt: new Date().toISOString(), updatedBy: meta.by || 'admin', note: meta.note || '', data };
  writeAtomic(CUR, doc);
  writeAtomic(path.join(REV, String(doc.version).padStart(5, '0') + '.json'), doc);
  prune(60);
  return doc;
}
function listRevisions() {
  return fs.readdirSync(REV).filter(f => f.endsWith('.json')).sort().reverse().map(f => {
    try { const d = JSON.parse(fs.readFileSync(path.join(REV, f), 'utf8')); return { version: d.version, updatedAt: d.updatedAt, updatedBy: d.updatedBy, note: d.note, size: fs.statSync(path.join(REV, f)).size }; } catch { return null; }
  }).filter(Boolean);
}
function readRevision(v) { try { return JSON.parse(fs.readFileSync(path.join(REV, String(v).padStart(5, '0') + '.json'), 'utf8')); } catch { return null; } }
function prune(keep) { const files = fs.readdirSync(REV).filter(f => f.endsWith('.json')).sort(); while (files.length > keep) fs.unlinkSync(path.join(REV, files.shift())); }
module.exports = { DIR, readCurrent, publish, listRevisions, readRevision };
