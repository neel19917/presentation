#!/usr/bin/env node
/**
 * package.js — build a rep-ready distribution of the demo kit.
 *
 *   node tools/package.js                 → dist/FreightPOP-DemoKit-v<version>.zip + dist/site/
 *   node tools/package.js --publish       → also upload the zip to the sales portal
 *                                           (POST api.freightpopsales.com/api/demo-kit/upload)
 *   node tools/package.js --notes "..."   → release notes stored with the version
 *
 * The zip contains everything a rep needs: unzip → double-click the start
 * script → present. dist/site/ is the same tree, ready to drag onto any
 * static host. Version comes from package.json — bump it per release.
 *
 * --publish auth: reads EC2_API_KEY from the environment, or from
 * ~/Desktop/FPPricer/.env / ~/Desktop/FPPricer/server/.env.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = path.join(DIST, 'site');
const argv = process.argv.slice(2);
const publish = argv.includes('--publish');
const notes = argv.includes('--notes') ? argv[argv.indexOf('--notes') + 1] : '';

const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
const version = pkg.version;
const zipName = `FreightPOP-DemoKit-v${version}.zip`;

// What ships. src-deck/tools/dist stay home — reps get the runnable kit only.
const INCLUDE = ['app', 'deck', 'Presentation', 'modules', 'docs', 'server.js',
  'start-mac.command', 'start-windows.bat', 'install-mac.command', 'install-windows.bat',
  // src-deck + tools ship so the in-kit Editor can rebundle the interactive deck
  // (tools/bundle.js is zero-dep Node) and the Generator can write assets.
  'src-deck', 'tools', 'README.md', 'BRANDING.md'];

// ── Stage dist/site ───────────────────────────────────────────────────────
fs.rmSync(SITE, { recursive: true, force: true });
fs.mkdirSync(SITE, { recursive: true });
for (const item of INCLUDE) {
  const from = path.join(ROOT, item);
  if (!fs.existsSync(from)) { console.warn('  ⚠ missing, skipped: ' + item); continue; }
  fs.cpSync(from, path.join(SITE, item), {
    recursive: true,
    filter: (src) => !path.basename(src).startsWith('.DS_Store'),
  });
}

fs.writeFileSync(path.join(SITE, 'VERSION.json'), JSON.stringify({
  version,
  builtAt: new Date().toISOString(),
  builtBy: os.userInfo().username,
  notes,
}, null, 2));

fs.writeFileSync(path.join(SITE, 'QUICKSTART.md'), `# FreightPOP Demo Kit — Quick Start (v${version})

**Mac:** double-click \`start-mac.command\`  ·  **Windows:** double-click \`start-windows.bat\`
(Needs Node.js — free from nodejs.org — installed once.)

1. Plug in the booth monitor → set it to **Extended display** (Mac: System Settings → Displays · Win: Win+P → Extend).
2. In the launcher, open **Presenter view** (stays on your laptop).
3. Click **"Open audience window"** → drag it to the big screen → click it once → press **F**.
4. Present. Both screens stay in sync — clicks, keys, everything, both directions.

| Key | Does |
|---|---|
| → / Space | advance |
| ← | back |
| G | jump grid — every screen & module |
| A | replay this screen's animations |
| B | blackout the big screen |
| R | restart both screens at the intro |

Runs fully offline (only carrier/ERP logos and the embedded walkthrough need internet).
Full docs: README.md · Brand rules: BRANDING.md
`);

// ── Zip ───────────────────────────────────────────────────────────────────
const zipPath = path.join(DIST, zipName);
fs.rmSync(zipPath, { force: true });
execFileSync('zip', ['-r', '-X', '-q', zipPath, '.'], { cwd: SITE });
const size = fs.statSync(zipPath).size;
console.log(`✔ ${path.relative(ROOT, zipPath)} (${(size / 1024 / 1024).toFixed(1)} MB)`);
console.log(`✔ dist/site/ ready for static hosting`);

// ── Publish to the sales portal ───────────────────────────────────────────
if (publish) {
  (async () => {
    let key = process.env.EC2_API_KEY;
    if (!key) {
      for (const envFile of [
        path.join(os.homedir(), 'Desktop/FPPricer/server/.env'),
        path.join(os.homedir(), 'Desktop/FPPricer/.env'),
      ]) {
        if (!fs.existsSync(envFile)) continue;
        const m = fs.readFileSync(envFile, 'utf8').match(/^EC2_API_KEY=(.+)$/m);
        if (m) { key = m[1].trim().replace(/^["']|["']$/g, ''); break; }
      }
    }
    if (!key) { console.error('✖ --publish: EC2_API_KEY not found (env or FPPricer .env files).'); process.exit(1); }

    console.log(`… uploading v${version} (${(size / 1024 / 1024).toFixed(1)} MB) to the sales portal`);
    const r = await fetch('https://api.freightpopsales.com/api/demo-kit/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/zip',
        'X-Api-Key': key,
        'X-Kit-Version': version,
        'X-Kit-Notes': encodeURIComponent(notes || ''),
      },
      body: fs.readFileSync(zipPath),
    });
    const body = await r.text();
    if (!r.ok) { console.error(`✖ upload failed: HTTP ${r.status} ${body.slice(0, 300)}`); process.exit(1); }
    console.log('✔ published — reps can now download it from the sales portal (Sales Deck menu → Tradeshow Demo Kit)');
    console.log('  ' + body.slice(0, 200));
  })();
}
