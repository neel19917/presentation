#!/usr/bin/env node
/**
 * LocalDemo static server — zero dependencies, works on Mac & Windows.
 *
 * Serves this folder on http://localhost:8123 and opens the launcher in the
 * default browser. Everything is local — no internet needed at the booth.
 *
 *   node server.js            → port 8123
 *   PORT=9000 node server.js  → custom port
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = __dirname;
const BASE_PORT = Number(process.env.PORT) || 8123;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
};

// ── Bundled-deck bridge injection ─────────────────────────────────────────
// "Bundled page" exports (like Presentation/TMSDeck-072026.html) carry their
// real page as a JSON string in <script type="__bundler/template">. To sync
// hotspots/clicks/state across the presenter and audience windows, we inject
// two things into that template — in memory only, the file on disk is never
// touched:
//   1. `window.__fpApp = this` inside the deck component's componentDidMount,
//      exposing the live app instance.
//   2. app/core/deck-bridge.js inline at the end of the template, which wires
//      state sync, click/input/scroll mirroring, the screen map, and replay.
const deckCache = new Map(); // finalPath -> { mtimeMs, bridgeMtimeMs, data }

function injectDeckBridge(finalPath, src) {
  const bridgePath = path.join(ROOT, 'app', 'core', 'deck-bridge.js');
  if (src.includes('data-fp-bridge')) return null; // bridge already baked in by tools/bundle.js
  const marker = '<script type="__bundler/template">';
  const start = src.indexOf(marker);
  if (start === -1) return null;
  const bodyStart = start + marker.length;
  const end = src.indexOf('</script>', bodyStart);
  if (end === -1) return null;

  let stat, bstat;
  try { stat = fs.statSync(finalPath); bstat = fs.statSync(bridgePath); } catch (e) { return null; }
  const hit = deckCache.get(finalPath);
  if (hit && hit.mtimeMs === stat.mtimeMs && hit.bridgeMtimeMs === bstat.mtimeMs) return hit.data;

  let tpl;
  try { tpl = JSON.parse(src.slice(bodyStart, end)); } catch (e) { return null; }

  // 1. Expose the app instance the moment it mounts.
  tpl = tpl.replace(
    'componentDidMount() {',
    'componentDidMount() { try { window.__fpApp = this; window.dispatchEvent(new Event("fp-app-ready")); } catch (e) {}'
  );

  // 2. Append the bridge (inline — blob/relative URLs don't resolve in there).
  const bridge = fs.readFileSync(bridgePath, 'utf8').replace(/<\/script>/gi, '<\\/script>');
  const bridgeTag = '\n<script data-fp-bridge>' + bridge + '\n</script>';
  tpl = tpl.includes('</body>') ? tpl.replace('</body>', bridgeTag + '</body>') : tpl + bridgeTag;

  // JSON.stringify leaves "</" unescaped — a literal "</script>" inside the
  // JSON would terminate the carrier <script> tag early and shred the page.
  // Escape it the same way the original bundler does.
  const tplJson = JSON.stringify(tpl).replace(/<\//g, '<\\/');
  const out = src.slice(0, bodyStart) + tplJson + src.slice(end);
  deckCache.set(finalPath, { mtimeMs: stat.mtimeMs, bridgeMtimeMs: bstat.mtimeMs, data: out });
  return out;
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/' || urlPath === '') urlPath = '/app/index.html';

  // Resolve inside ROOT only (block ../ traversal).
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }

  fs.stat(filePath, (err, stat) => {
    let finalPath = filePath;
    if (!err && stat.isDirectory()) finalPath = path.join(filePath, 'index.html');
    fs.readFile(finalPath, (err2, data) => {
      if (err2) { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('Not found: ' + urlPath); return; }

      // Bundled decks get the sync bridge injected on the way out.
      if (finalPath.endsWith('.html')) {
        const src = data.toString('utf8');
        if (src.includes('__bundler/template')) {
          const injected = injectDeckBridge(finalPath, src);
          if (injected) data = Buffer.from(injected, 'utf8');
        }
      }

      res.writeHead(200, {
        'Content-Type': MIME[path.extname(finalPath).toLowerCase()] || 'application/octet-stream',
        // No caching — edits to slides show up on refresh, always.
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  });
});

function openBrowser(url) {
  if (process.env.NO_OPEN) return; // NO_OPEN=1 → don't auto-launch a browser
  const p = process.platform;
  if (p === 'darwin') spawn('open', [url], { stdio: 'ignore', detached: true }).unref();
  else if (p === 'win32') spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true }).unref();
  else spawn('xdg-open', [url], { stdio: 'ignore', detached: true }).unref();
}

function listen(port, attemptsLeft) {
  server.once('error', (err) => {
    if (err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      console.log(`Port ${port} busy, trying ${port + 1}…`);
      listen(port + 1, attemptsLeft - 1);
    } else {
      console.error('Could not start server:', err.message);
      process.exit(1);
    }
  });
  server.listen(port, () => {
    const url = `http://localhost:${port}/app/index.html`;
    console.log('');
    console.log('  FreightPOP LocalDemo running');
    console.log(`  →  ${url}`);
    console.log('');
    console.log('  Presenter view : your laptop screen');
    console.log('  Audience view  : drag to the external monitor, press F for fullscreen');
    console.log('');
    console.log('  Ctrl+C to stop.');
    openBrowser(url);
  });
}

listen(BASE_PORT, 10);
