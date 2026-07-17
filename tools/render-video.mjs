#!/usr/bin/env node
// render-video.mjs — deterministic HTML-animation → MP4 render pipeline.
//
// Usage:
//   node tools/render-video.mjs --url <http url> --out <path.mp4> \
//     [--fps 30] [--width 1920] [--height 1080] [--from 0] [--to duration]
//
// The target page must implement:
//   window.FPVideo = { duration, seek(t), play(), pause() }
//
// Zero npm deps: Node >= 22 built-in fetch + WebSocket, ffmpeg, headless Chrome.

import { spawn, execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync, statSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import net from 'node:net';
import process from 'node:process';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FFMPEG = '/opt/homebrew/bin/ffmpeg';
const FFPROBE = '/opt/homebrew/bin/ffprobe';

// ---------- CLI parsing ----------

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const val = argv[i + 1];
    if (val === undefined || val.startsWith('--')) {
      args[key] = true;
    } else {
      args[key] = val;
      i++;
    }
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
if (!args.url || !args.out) {
  console.error(
    'Usage: node tools/render-video.mjs --url <http url> --out <path.mp4> ' +
      '[--fps 30] [--width 1920] [--height 1080] [--from 0] [--to duration]'
  );
  process.exit(1);
}

const URL_ = String(args.url);
const OUT = String(args.out);
const FPS = Number(args.fps ?? 30);
const WIDTH = Number(args.width ?? 1920);
const HEIGHT = Number(args.height ?? 1080);
const FROM = Number(args.from ?? 0);
const TO_ARG = args.to !== undefined ? Number(args.to) : undefined;

for (const [name, v] of [['fps', FPS], ['width', WIDTH], ['height', HEIGHT], ['from', FROM]]) {
  if (!Number.isFinite(v) || v < 0) {
    console.error(`Invalid --${name}: ${v}`);
    process.exit(1);
  }
}

// ---------- helpers ----------

function findFreePort(preferred = 9333) {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once('error', () => {
      // preferred taken — ask the OS for any free port
      const srv2 = net.createServer();
      srv2.once('error', reject);
      srv2.listen(0, '127.0.0.1', () => {
        const port = srv2.address().port;
        srv2.close(() => resolve(port));
      });
    });
    srv.listen(preferred, '127.0.0.1', () => {
      srv.close(() => resolve(preferred));
    });
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- minimal CDP client over built-in WebSocket ----------

class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    ws.addEventListener('message', (ev) => {
      let msg;
      try {
        msg = JSON.parse(typeof ev.data === 'string' ? ev.data : ev.data.toString());
      } catch {
        return;
      }
      if (msg.id !== undefined && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`CDP ${msg.error.code}: ${msg.error.message}`));
        else resolve(msg.result);
      }
    });
    ws.addEventListener('close', () => {
      for (const { reject } of this.pending.values()) {
        reject(new Error('CDP websocket closed'));
      }
      this.pending.clear();
    });
  }

  static connect(wsUrl) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(wsUrl);
      ws.addEventListener('open', () => resolve(new CDP(ws)));
      ws.addEventListener('error', () => reject(new Error(`Failed to connect to ${wsUrl}`)));
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
    const res = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise,
      returnByValue: true,
    });
    if (res.exceptionDetails) {
      const d = res.exceptionDetails;
      const desc = d.exception?.description || d.text || 'unknown error';
      throw new Error(`Page evaluate failed: ${desc}`);
    }
    return res.result?.value;
  }

  close() {
    try { this.ws.close(); } catch {}
  }
}

// ---------- cleanup registry ----------

let chromeProc = null;
let userDataDir = null;
let ffmpegProc = null;
let cdp = null;
let cleanedUp = false;

function cleanup() {
  if (cleanedUp) return;
  cleanedUp = true;
  try { cdp?.close(); } catch {}
  if (ffmpegProc && ffmpegProc.exitCode === null) {
    try { ffmpegProc.stdin.destroy(); } catch {}
    try { ffmpegProc.kill('SIGKILL'); } catch {}
  }
  if (chromeProc && chromeProc.exitCode === null) {
    try { chromeProc.kill('SIGKILL'); } catch {}
  }
  if (userDataDir) {
    // Chrome's SIGKILL is asynchronous and helper processes can briefly
    // recreate files — retry removal a few times (synchronously, since this
    // also runs from the 'exit' handler).
    for (let i = 0; i < 10; i++) {
      try { rmSync(userDataDir, { recursive: true, force: true }); } catch {}
      if (!existsSync(userDataDir)) break;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100); // sync 100ms sleep
    }
  }
}

process.on('SIGINT', () => {
  console.error('\nInterrupted — cleaning up...');
  cleanup();
  process.exit(130);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(143);
});
process.on('exit', cleanup);

// ---------- main ----------

async function main() {
  const port = await findFreePort(9333);
  userDataDir = mkdtempSync(join(tmpdir(), 'fpvideo-chrome-'));

  console.log(`Launching headless Chrome (CDP port ${port})...`);
  chromeProc = spawn(
    CHROME,
    [
      '--headless=new',
      '--use-angle=metal',
      `--remote-debugging-port=${port}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      `--user-data-dir=${userDataDir}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--hide-scrollbars',
      '--disable-background-timer-throttling',
      '--disable-renderer-backgrounding',
      'about:blank',
    ],
    { stdio: ['ignore', 'ignore', 'pipe'] }
  );
  let chromeStderr = '';
  chromeProc.stderr.on('data', (d) => { chromeStderr += d; });
  chromeProc.on('exit', (code) => {
    if (!cleanedUp) {
      console.error(`Chrome exited unexpectedly (code ${code})\n${chromeStderr.slice(-2000)}`);
    }
  });

  // Wait for the DevTools HTTP endpoint.
  const base = `http://127.0.0.1:${port}`;
  let versionOk = false;
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`${base}/json/version`);
      if (r.ok) { versionOk = true; break; }
    } catch {}
    await sleep(200);
  }
  if (!versionOk) throw new Error('Chrome DevTools endpoint never came up');

  // Create a target for the URL.
  const newRes = await fetch(`${base}/json/new?${encodeURIComponent(URL_)}`, { method: 'PUT' });
  if (!newRes.ok) throw new Error(`PUT /json/new failed: ${newRes.status} ${await newRes.text()}`);
  const target = await newRes.json();
  if (!target.webSocketDebuggerUrl) throw new Error('No webSocketDebuggerUrl in /json/new response');

  console.log(`Connecting CDP to target ${target.id} (${URL_})...`);
  cdp = await CDP.connect(target.webSocketDebuggerUrl);

  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // Wait (up to 30s) for the FPVideo contract + fonts.
  console.log('Waiting for window.FPVideo and document.fonts.ready...');
  const deadline = Date.now() + 30_000;
  let ready = false;
  while (Date.now() < deadline) {
    try {
      ready = await cdp.eval(
        `typeof window.FPVideo === 'object' && window.FPVideo !== null && window.FPVideo.duration > 0`
      );
    } catch {
      ready = false; // page may still be navigating
    }
    if (ready) break;
    await sleep(250);
  }
  if (!ready) throw new Error('Timed out (30s) waiting for window.FPVideo with duration > 0');
  await cdp.eval('document.fonts.ready.then(() => true)', { awaitPromise: true });

  const duration = await cdp.eval('window.FPVideo.duration');
  await cdp.eval('window.FPVideo.pause && window.FPVideo.pause(); true');

  const from = Math.max(0, FROM);
  const to = Math.min(TO_ARG ?? duration, duration);
  if (to <= from) throw new Error(`Empty time range: --from ${from} --to ${to} (duration ${duration}s)`);

  const totalFrames = Math.round((to - from) * FPS) + 1; // inclusive of the final frame
  console.log(
    `Rendering ${totalFrames} frames @ ${FPS}fps, ${WIDTH}x${HEIGHT}, t=${from}s..${to}s (page duration ${duration}s)`
  );

  // Spawn ffmpeg.
  ffmpegProc = spawn(
    FFMPEG,
    [
      '-y',
      '-f', 'image2pipe',
      '-framerate', String(FPS),
      '-i', '-',
      '-c:v', 'libx264',
      '-preset', 'medium',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      OUT,
    ],
    { stdio: ['pipe', 'ignore', 'pipe'] }
  );
  let ffErr = '';
  ffmpegProc.stderr.on('data', (d) => { ffErr += d; if (ffErr.length > 65536) ffErr = ffErr.slice(-32768); });
  const ffmpegExit = new Promise((resolve, reject) => {
    ffmpegProc.on('error', reject);
    ffmpegProc.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with code ${code}\n${ffErr.slice(-2000)}`))
    );
  });
  ffmpegProc.stdin.on('error', () => {}); // avoid EPIPE crash; exit handler reports the real error

  const writeFrame = (buf) =>
    new Promise((resolve, reject) => {
      if (ffmpegProc.exitCode !== null) return reject(new Error('ffmpeg exited early'));
      ffmpegProc.stdin.write(buf, (err) => (err ? reject(err) : resolve()));
    });

  const startedAt = Date.now();
  for (let i = 0; i < totalFrames; i++) {
    const t = Math.min(from + i / FPS, duration);
    // Seek synchronously renders state at t; then wait a double-rAF for the compositor.
    await cdp.eval(
      `window.FPVideo.seek(${t}); new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))).then(()=>true)`,
      { awaitPromise: true }
    );
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png' });
    await writeFrame(Buffer.from(shot.data, 'base64'));

    if ((i + 1) % 30 === 0 || i + 1 === totalFrames) {
      const pct = Math.round(((i + 1) / totalFrames) * 100);
      const elapsed = ((Date.now() - startedAt) / 1000).toFixed(1);
      console.log(`frame ${i + 1}/${totalFrames} (${pct}%) — ${elapsed}s elapsed`);
    }
  }

  ffmpegProc.stdin.end();
  await ffmpegExit;

  // Report.
  const size = statSync(OUT).size;
  let probed = 'unknown';
  try {
    probed = execFileSync(FFPROBE, [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'csv=p=0',
      OUT,
    ]).toString().trim();
  } catch {}
  console.log(`\nDone: ${OUT}`);
  console.log(`Size: ${(size / 1024 / 1024).toFixed(2)} MB (${size} bytes)`);
  console.log(`Duration: ${probed}s`);
}

main()
  .then(() => {
    cleanup();
    process.exit(0);
  })
  .catch((err) => {
    console.error(`\nError: ${err.message}`);
    cleanup();
    process.exit(1);
  });
