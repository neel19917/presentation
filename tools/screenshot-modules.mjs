#!/usr/bin/env node
// screenshot-modules.mjs — capture still keyframes from every explainer module.
//
// Usage:
//   node tools/screenshot-modules.mjs [--out screenshots] [--width 1920] [--height 1080]
//     [--frames 0.12,0.35,0.6,0.85]   (fractions of FPVideo.duration)
//     [--only route-optimization]      (substring filter on module name)
//
// Follows render-video.mjs's zero-dep approach: built-in fetch + WebSocket,
// headless Chrome over CDP, the repo's own server.js for file serving.
// Modules expose window.FPVideo { duration, seek(t) } — each requested
// fraction is seeked, settled, and captured as PNG:
//   <out>/<module>/<module>-kf<N>-<sec>s.png

import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync, mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, basename } from 'node:path';
import net from 'node:net';
import process from 'node:process';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ROOT = join(import.meta.dirname, '..');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) continue;
  const v = process.argv[i + 1];
  if (v === undefined || v.startsWith('--')) args[a.slice(2)] = true;
  else { args[a.slice(2)] = v; i++; }
}
const OUT_DIR = join(ROOT, String(args.out || 'screenshots'));
const WIDTH = Number(args.width ?? 1920);
const HEIGHT = Number(args.height ?? 1080);
const FRACTIONS = String(args.frames || '0.12,0.35,0.6,0.85').split(',').map(Number).filter(f => f >= 0 && f <= 1);
const ONLY = args.only ? String(args.only) : null;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findFreePort(preferred) {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once('error', () => {
      const srv2 = net.createServer();
      srv2.once('error', reject);
      srv2.listen(0, '127.0.0.1', () => { const p = srv2.address().port; srv2.close(() => resolve(p)); });
    });
    srv.listen(preferred, '127.0.0.1', () => { srv.close(() => resolve(preferred)); });
  });
}

class CDP {
  constructor(ws) {
    this.ws = ws; this.id = 0; this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      let msg; try { msg = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString()); } catch { return; }
      if (msg.id !== undefined && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`CDP ${msg.error.code}: ${msg.error.message}`));
        else resolve(msg.result);
      }
    });
    ws.addEventListener('close', () => { for (const { reject } of this.pending.values()) reject(new Error('CDP closed')); this.pending.clear(); });
  }
  static connect(wsUrl) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl);
      ws.addEventListener('open', () => resolve(new CDP(ws)));
      ws.addEventListener('error', () => reject(new Error(`connect failed: ${wsUrl}`)));
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }
  async eval(expression, { awaitPromise = false } = {}) {
    const res = await this.send('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
    if (res.exceptionDetails) throw new Error(`evaluate failed: ${res.exceptionDetails.exception?.description || res.exceptionDetails.text}`);
    return res.result?.value;
  }
  close() { try { this.ws.close(); } catch {} }
}

let chromeProc = null, serverProc = null, userDataDir = null, cdp = null, done = false;
function cleanup() {
  if (done) return; done = true;
  try { cdp?.close(); } catch {}
  for (const p of [chromeProc, serverProc]) if (p && p.exitCode === null) { try { p.kill('SIGKILL'); } catch {} }
  if (userDataDir) { try { rmSync(userDataDir, { recursive: true, force: true }); } catch {} }
}
process.on('SIGINT', () => { cleanup(); process.exit(130); });
process.on('exit', cleanup);

async function main() {
  // 1. file server (repo's own server.js)
  const serverPort = await findFreePort(8123);
  serverProc = spawn('node', [join(ROOT, 'server.js')], { env: { ...process.env, PORT: String(serverPort) }, stdio: 'ignore' });
  await sleep(800);

  // 2. headless chrome
  const cdpPort = await findFreePort(9333);
  userDataDir = mkdtempSync(join(tmpdir(), 'fpshot-chrome-'));
  chromeProc = spawn(CHROME, [
    '--headless=new', '--use-angle=metal', `--remote-debugging-port=${cdpPort}`,
    `--window-size=${WIDTH},${HEIGHT}`, `--user-data-dir=${userDataDir}`,
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    'about:blank',
  ], { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    try {
      const list = await (await fetch(`http://127.0.0.1:${cdpPort}/json`)).json();
      target = list.find(t => t.type === 'page');
    } catch { /* chrome not up yet */ }
  }
  if (!target) throw new Error('Chrome CDP target never appeared');
  cdp = await CDP.connect(target.webSocketDebuggerUrl);
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: HEIGHT, deviceScaleFactor: 2, mobile: false });

  // 3. modules
  const modules = readdirSync(join(ROOT, 'modules'))
    .filter(f => f.endsWith('.html') && !f.startsWith('_'))
    .filter(f => !ONLY || f.includes(ONLY))
    .sort();
  console.log(`${modules.length} module(s) → ${OUT_DIR} @ ${WIDTH}x${HEIGHT}@2x, keyframes: ${FRACTIONS.join(', ')}`);

  const manifest = [];
  for (const file of modules) {
    const name = basename(file, '.html');
    const dir = join(OUT_DIR, name);
    mkdirSync(dir, { recursive: true });
    await cdp.send('Page.navigate', { url: `http://127.0.0.1:${serverPort}/modules/${file}` });
    // wait for FPVideo (video-style modules) — fall back to a single settled shot
    let duration = null;
    for (let i = 0; i < 40; i++) {
      await sleep(250);
      duration = await cdp.eval('window.FPVideo && Number(window.FPVideo.duration) || null').catch(() => null);
      if (duration) break;
    }
    if (duration) {
      try { await cdp.eval('window.FPVideo.pause && window.FPVideo.pause()'); } catch {}
      let n = 0;
      for (const f of FRACTIONS) {
        const t = Math.min(duration - 0.05, Math.max(0, duration * f));
        await cdp.eval(`window.FPVideo.seek(${t.toFixed(3)})`);
        await sleep(400); // let seeked frame settle (fonts, transitions)
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
        const out = join(dir, `${name}-kf${++n}-${t.toFixed(1)}s.png`);
        writeFileSync(out, Buffer.from(shot.data, 'base64'));
        manifest.push({ module: name, file: basename(out), t: Number(t.toFixed(1)) });
        console.log(`  ${name} @ ${t.toFixed(1)}s ✓`);
      }
    } else {
      await sleep(1500);
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
      const out = join(dir, `${name}-static.png`);
      writeFileSync(out, Buffer.from(shot.data, 'base64'));
      manifest.push({ module: name, file: basename(out), t: null });
      console.log(`  ${name} (static — no FPVideo) ✓`);
    }
  }
  writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`done — ${manifest.length} screenshots across ${modules.length} modules`);
}

main().then(() => { cleanup(); process.exit(0); }).catch((e) => { console.error('FATAL:', e.message); cleanup(); process.exit(1); });
