> **Status 2026-10-01.** Plan written against the Aug 17 export, before the repo's Aug 27–31 work
> (deck-config-api, tracked links, deck versions, audit fixes). Check `git log` before acting on any item here.

# FreightPOP Presentation — Full Code, Refactor & Security Remediation Plan

> **Status:** ready to execute. Every finding below was verified by running a command, not by
> inspection alone. Line numbers are as-of this audit; re-verify with the check script before
> editing, since Phase 1 edits shift later line numbers within the same file.

## Table of contents

- [0. Context & scope](#0-context--scope)
- [1. Method — the "typecheck" this project never had](#1-method)
- [2. Findings index](#2-findings-index)
- [3. Phase 1 — Correctness bugs (exact edits)](#3-phase-1--correctness-bugs)
- [4. Phase 2 — Security integrity (exact edits)](#4-phase-2--security-integrity)
- [5. Phase 3 — Cleanup & refactor (exact edits)](#5-phase-3--cleanup--refactor)
- [6. Recorded, not fixed](#6-recorded-not-fixed)
- [7. The check script](#7-the-check-script)
- [8. Verification protocol](#8-verification-protocol)
- [9. Execution order & risk](#9-execution-order--risk)
- [10. Appendix — evidence log](#10-appendix--evidence-log)

---

## 0. Context & scope

`~/Desktop/FreightPOP/Presentation` is a static sales-presentation site assembled by downloading
a Claude Design project over an API. It contains:

| Component | Files | Size |
| --- | --- | --- |
| Sales deck | `FreightPOP TMS Sales Deck v17.dc.html` | 223,247 B / 2,701 lines |
| Validation library | `Validation Library.dc.html` | — |
| Demo components | 37 × `*Demo.dc.html` | 1.41 MB / 13,130 lines |
| Detail sheets | 8 × `Case Study - *`, 15 × `Why We Won - *` | — |
| Workflow players | 8 × `uploads/0*.html` | 262 KB |
| AI clips | `ai-clips/` — 2 HTML + 6 `.jsx` | — |
| Runtime | `support.js`, `doc-page.js`, `image-slot.js`, 2 × `extracted/*.js` | — |
| **Total** | **163 files** | **7.4 MB** |

**There is no build system** — no `package.json`, `tsconfig.json`, `.eslintrc`, or CI anywhere in
this folder. Nothing here has ever been syntax-checked or linted. The multi-fetch download
corrupted several files in ways that are invisible until a browser renders them.

### Decisions already taken (from you)

| Question | Your answer | Effect on this plan |
| --- | --- | --- |
| Public exposure of sales intel | *"I will put behind my Sales OS"* | Exposure handled at hosting layer. §4.1 reframed as defence-in-depth + one thing to confirm. |
| Five unreachable demo files | *"record it and add to the plan"* | §6 — documented, no code change. |
| Depth | *"All three phases"* | All of §3, §4, §5 in scope. |

### The single governing constraint on refactoring

`support.js:38-55` (`parseDcText`) reads **only** two things out of a `.dc.html` file:

1. the innerHTML of `<x-dc>`, and
2. the body of `<script type="text/x-dc" data-dc-script>`.

Everything else in those files is invisible to the runtime. Critically, **`.dc.html` files are
re-synced from the Claude Design project**, so any local edit inside those two regions is
overwritten on the next sync — silently. A refactor is *sync-safe* only if it touches files or
regions the design tool does not own. This determines what is in Phase 3 versus what is filed
upstream.

---

## 1. Method

This is the closest thing this project can have to a typecheck. All six steps are automated in
§7.

| # | Check | How | Result |
| --- | --- | --- | --- |
| 1 | Parse every embedded component script | Extract all 62 `<script data-dc-script>` blocks → `node --check` (Node 25 parses class fields natively) | **2 of 62 FAIL** |
| 2 | HTML tag balance | Walk `<div>`/`</div>` inside every `<x-dc>` | **3 of 62 imbalanced** |
| 3 | Duplicate class members | Depth-1 member scan of every class body | **2 duplicates found** |
| 4 | Template vars ↔ `renderVals()` | Diff `{{ x }}` and `ref="{{ x }}"` against returned keys, **both directions** | **2 mismatches** |
| 5 | Standalone JS/JSX | `node --check` on 6 `.js`; Babel parse on 6 `.jsx` | all clean |
| 6 | Binary + supply-chain integrity | `file` + EOF-marker check on 74 assets; `cmp` vendored libs vs upstream | 3 truncated, vendor authentic |

---

## 2. Findings index

| ID | Severity | Title | File(s) | Phase |
| --- | --- | --- | --- | --- |
| **P0** | 🔴 Critical | Two demos fail to parse → red error box on screen | `RateShopDemo`, `ShippingRulesDemo` | 1 |
| **P1** | 🔴 Critical | Runaway 120 ms timer forever + teardown never runs | Deck | 1 |
| **P2** | 🟠 High | Library renders an empty column on common searches | `Validation Library` | 1 |
| **P3** | 🟡 Medium | Stray `</div>` breaks template nesting | 3 demos | 1 |
| **P4** | 🟢 Low | Dead code / no-ops / unbound ref | 8 locations | 3 |
| **S1** | ⚪ Info | Sales intel in bundle (handled by Sales OS) | Deck, sheets, `docs/` | 2 |
| **S2** | 🔴 High | Unsandboxed 3rd-party iframes, one granted microphone | Deck | 2 |
| **S3** | 🟠 Medium | No security headers at all | `netlify.toml` | 2 |
| **S4** | 🟡 Med-Low | `postMessage` receiver with no origin check | Deck | 2 |
| **S5** | 🟢 Low | Clearbit leaks integration/prospect catalogue | Deck | 3 |
| **R1** | — | `uploads/` 93.6 % duplicated | `uploads/` | 3 |
| **R2** | — | Two divergent dc-runtimes shipped | Deck head | 3 |
| **R3** | — | Deck contains a second, independent app | Deck `:842-1528` | 3 |
| **R6** | — | Keyframe-prefix fork (15/16) | 31 demos | 3 |
| **U1/U2** | — | 1,595 duplicated lines — **must be fixed upstream** | 37 demos | upstream |

---

## 3. Phase 1 — Correctness bugs

### 3.1 P0 — `RateShopDemo` and `ShippingRulesDemo` do not parse

**Evidence**

```
$ node --check RateShopDemo.0.js
SyntaxError: Unexpected token '{'   (at _seekAbs(t) { … )
$ node --check ShippingRulesDemo.0.js
SyntaxError: Unexpected token '{'
⇒ PARSE OK: 60    PARSE FAILED: 2
```

**Root cause.** Six class members were spliced *into* the body of the `restart` arrow function,
stranding `restart`'s real statements below them. Because `_seekAbs(t)` and `{` are on the **same
line**, ASI cannot insert a semicolon, so it is a hard parse error rather than a call followed by
a block.

**Blast radius.** `support.js:1635` calls `evalDcLogic` → throws → caught at `:1643-1651` →
`r.logicError` set → `support.js:1013` picks it up → `:1024-1029` renders:

```js
h("div", { className: "sc-logic-error", "data-omelette-chrome": "" }, renderErr)
```

styled at `support.js:114-116`:

```css
.sc-logic-error{position:absolute;top:8px;left:8px;z-index:2147483647;max-width:60ch;
  padding:6px 10px;background:#b00020;color:#fff;font:12px/1.4 ui-monospace,monospace;
  border-radius:4px;white-space:pre-wrap;pointer-events:none}
```

→ **a bright red box with the raw JS error, at maximum z-index, over a frozen frame.** No
animation, blank timecode, dead play/scrub/restart, every `{{ }}` empty. Both are mounted by the
deck at `FreightPOP TMS Sales Deck v17.dc.html:558-559`, on adjacent slides — and rate shopping is
the deck's flagship feature.

**Current (broken) — `RateShopDemo.dc.html:397-409`**

```js
  restart = (e) => {
  _seekAbs(t) { const p = this.anim.playing; this.seek(Math.max(0, Math.min(this.DUR - 0.05, t))); this.anim.playing = p; if (p) this._start(); this.forceUpdate(); }
  back10 = (e) => { if (e) e.stopPropagation(); this._seekAbs(this.t - 10); };
  fwd10 = (e) => { if (e) e.stopPropagation(); this._seekAbs(this.t + 10); };
  tPlay = (e) => { if (e) e.stopPropagation(); this.togglePlay(); };
  scrub = (e) => { if (e) e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); this._seekAbs(((e.clientX - r.left) / r.width) * this.DUR); };
  _fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
    if (e) e.stopPropagation();
    this.seek(0);
    if (!this.anim.playing) { this.anim.playing = true; }
    this._start();
    this.forceUpdate();
  };
```

**Target (fixed)** — canonical form, matching the 34 healthy files (reference
`AutoPackDemo.dc.html:413-419`):

```js
  restart = (e) => {
    if (e) e.stopPropagation();
    this.seek(0);
    if (!this.anim.playing) { this.anim.playing = true; }
    this._start();
    this.forceUpdate();
  };
  _seekAbs(t) { const p = this.anim.playing; this.seek(Math.max(0, Math.min(this.DUR - 0.05, t))); this.anim.playing = p; if (p) this._start(); this.forceUpdate(); }
  back10 = (e) => { if (e) e.stopPropagation(); this._seekAbs(this.t - 10); };
  fwd10 = (e) => { if (e) e.stopPropagation(); this._seekAbs(this.t + 10); };
  tPlay = (e) => { if (e) e.stopPropagation(); this.togglePlay(); };
  scrub = (e) => { if (e) e.stopPropagation(); const r = e.currentTarget.getBoundingClientRect(); this._seekAbs(((e.clientX - r.left) / r.width) * this.DUR); };
  _fmt(s) { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
```

**Edit** — this is a *pure reorder*; no character of code changes, only line order:

| File | Move | To |
| --- | --- | --- |
| `RateShopDemo.dc.html` | lines **398-403** | immediately after line **409** (`};`) |
| `ShippingRulesDemo.dc.html` | lines **333-338** | immediately after line **344** (`};`) |

**Pre-validated.** I applied exactly this transform to scratch copies:

```
--- parse check on the FIXED versions ---
PASS  fixed_RateShopDemo.js
PASS  fixed_ShippingRulesDemo.js
RateShopDemo:      50 template vars, unresolved -> NONE
ShippingRulesDemo: 50 template vars, unresolved -> NONE
```

> ⚠️ **`docs/CODE-AUDIT.md` is wrong about this bug.** It claims *"Babel still parses it and the
> demo's autoplay path works; only the seek buttons on that one demo are affected."* Both halves
> are false, and it misses `RateShopDemo` entirely. Corrected in §5.7.

---

### 3.2 P1 — Deck: runaway 120 ms timer + dead teardown

Two defects that compound each other.

#### (a) The Rive hero subsystem is entirely dead and spins forever

`renderVals` exposes the refs at `:2624`, and they are defined at `:2209-2210`:

```js
2209:  setHeroWrap  = (el) => { this.heroWrap  = el; };
2210:  setHeroFrame = (el) => { this.heroFrame = el; };
2624:  setRoot: this.setRoot, setHeroWrap: this.setHeroWrap, setHeroFrame: this.setHeroFrame,
```

But the template **never binds them**. Every `ref="{{ }}"` in the entire `<x-dc>` region
(lines 11–841):

```
ref="{{ setAnimBox }}"   ref="{{ setDemoBox }}"   ref="{{ setHotWrap }}"
ref="{{ setRoot }}"      ref="{{ setSectionFs }}"
```

So `this.heroFrame` is permanently `undefined`, and `startRive()` at `:2476` never escapes its
first guard:

```js
  startRive() {
    const frame = this.heroFrame;                                     // undefined
    const canvas = frame && frame.querySelector("canvas[data-fp-hero-canvas]");
    if (!canvas) { this._riveT = setTimeout(() => this.startRive(), 120); return; }   // ← re-arms forever
```

`grep -c 'data-fp-hero-canvas'` = **1** — the only occurrence is that line itself. The selector
exists in no markup. Result: **an infinite ~8×/second timer for the life of every page load.**

It would fail even if it ran — it points at `assets/fp_hero-background.riv` (`:2487`) and
`assets/rive.wasm` (`:2484`), and `find . -name '*.riv' -o -name '*.wasm'` returns **empty**.

The hero that actually works is a *different*, plain-JS `startRive()` at `:890`, inside the
static-intro block, which uses an absolute HubSpot URL.

#### (b) `componentWillUnmount` declared twice — the real one is shadowed

```
$ duplicate-member scan
FreightPOP_TMS_Sales_Deck_v17: componentWillUnmount at lines [2249, 2435]
```

```js
2249:  componentWillUnmount() {
2250:    if (this._onKey)    window.removeEventListener("keydown", this._onKey);
2251:    if (this.ro)        this.ro.disconnect();
2252:    if (this._onResize) window.removeEventListener("resize", this._onResize);
2253:    if (this._riveT)    clearTimeout(this._riveT);           // ← would have killed (a)
2254:    try { if (this.riveInst && this.riveInst.cleanup) this.riveInst.cleanup(); } catch (e) {}
2255:  }
…
2435:  componentWillUnmount() { this._portalBack(); }              // ← wins; 2250-2254 never run
```

**Consequences**

- The `clearTimeout` that would stop the runaway timer in (a) never executes.
- On remount (dc-runtime hot-swaps via `registry.bump`), the stale **capturing** `keydown`
  listener survives → **one arrow-key press advances the deck two steps**.
- `_libMsg` (registered `:2243`) and the four listeners bound in `_setDemoBox` (`:2378-2382`) are
  removed by *neither* version.

**Fix**

1. **Delete the dead hero subsystem** (~45 lines): `setHeroWrap` (`:2209`), `setHeroFrame`
   (`:2210`), `initHero`, `fitHero` (`:2468`), `startRive` (`:2476`), and the `this.riveInst` /
   `this.ro` / `this._riveT` fields; remove `setHeroWrap`/`setHeroFrame` from the `renderVals`
   return at `:2624`. **This alone kills the runaway timer.**
2. **Merge the two `componentWillUnmount`s** — keep `:2249`, append `this._portalBack();`, delete
   `:2435` entirely.
3. **Add the missing removals** to the surviving method:
   ```js
   if (this._libMsg) window.removeEventListener("message", this._libMsg);
   ```
   plus teardown for the four `_setDemoBox` listeners.
4. After step 1 the `ro` / `_riveT` / `riveInst` lines in the merged teardown become dead — drop
   them in the same pass.

---

### 3.3 P2 — Validation Library: blank right-hand column

Two predicates that must agree, don't.

```js
1311:  boardCols: (function () {
1312:    const q    = shown.filter((x) => x.quote).length;
1313:    const side = shown.filter((x) => x.sheet || (!x.quote && !x.sheet)).length;      // ← A
1314:    if (!q)    return "minmax(0,1fr)";
1315:    if (!side) return "minmax(0,1fr)";
1316:    return "minmax(0,1.35fr) minmax(0,.9fr)";
1317:  })(),
…
1350:  hasBoardSide: shown.some((x) => x.sheet || (!x.quote && !(x.figures && x.figures.length))),  // ← B
```

For a **figures-only** record (no `quote`, no `sheet`, has `figures`):

| Predicate | Evaluation | Counts as side? |
| --- | --- | --- |
| A (`boardCols`) | `false \|\| (true && true)` | ✅ yes |
| B (`hasBoardSide`) | `false \|\| (true && !(truthy))` → `false \|\| false` | ❌ no |

Consumers disagree accordingly:

- `:247` — `grid-template-columns:{{ boardCols }}` → splits `1.35fr / 0.9fr`
- `:268` — `<sc-if value="{{ hasBoardSide }}">` → renders **nothing**

**Symptom:** a large dead gutter occupying the right 0.9fr of the board. `DATA` holds **10
figures-only records** out of 86; **19 of 374** distinct search terms trigger it, including
`saved` (8 results), `supply` (7), `more` (5), plus `increase`, `auditing`, `reduction`. The
library is the site's landing page (`netlify.toml` rewrites `/` to it).

**Fix** — hoist one predicate and use it in both places:

```js
// single source of truth
const isSideRecord = (x) => x.sheet || (!x.quote && !(x.figures && x.figures.length));
```

then `:1313` becomes `const side = shown.filter(isSideRecord).length;` and `:1350` becomes
`hasBoardSide: shown.some(isSideRecord),`.

> **Decide which semantic is intended.** Using B (above) means figures-only records are *not*
> side content, so the board stays single-column for those searches — visually correct and the
> smaller behavioural change. Using A instead would render figures in the right column, which
> may be the original design intent. **B is the safe default**; confirm against the design.

---

### 3.4 P3 — Stray `</div>` in three files

```
$ tag-balance walk over <x-dc>
RateShopDemo.dc.html        176 <div   177 </div   +1
ShippingRulesDemo.dc.html   100 <div   101 </div   +1
UsersRolesDemo.dc.html       70 <div    71 </div   +1
IMBALANCED FILES: 3 of 62
```

**Current — `ShippingRulesDemo.dc.html:217-221`** (others identical modulo line numbers):

```html
  <sc-if value="{{ paused }}" hint-placeholder-val="{{ false }}">
    <div style="position:absolute;left:16px;bottom:66px;…">PAUSED</div>   <!-- opened AND closed -->
      <div style="width:76px;height:76px;border-radius:50%;…">…</div>     <!-- orphan play-circle -->
    </div>                                                                <!-- STRAY -->
  </sc-if>
```

The stray tag prematurely closes the demo wrapper `<div>` opened near line 21, which cascades:
`</sc-if>` becomes stray too, and the whole subtree after the PAUSED indicator mis-nests. The
orphan circle has **no `position` property**, so it would render as a loose black circle in normal
flow. `grep -l 'width:76px;height:76px'` matches **only these 3 files** — leftover from a
half-removed feature.

**Target** — the canonical form used by the other 59 demos (reference
`WmsPickingDemo.dc.html:128-130`):

```html
  <sc-if value="{{ paused }}" hint-placeholder-val="{{ false }}">
    <div style="position:absolute;left:16px;bottom:66px;…">PAUSED</div>
  </sc-if>
```

**Edit** — delete both the orphan circle line and the stray `</div>`:

| File | Delete lines |
| --- | --- |
| `RateShopDemo.dc.html` | **270-271** |
| `ShippingRulesDemo.dc.html` | **219-220** |
| `UsersRolesDemo.dc.html` | **151-152** |

> Note: `UsersRolesDemo` is unreachable from the deck (§6), so its instance has no live impact —
> but the file is still served standalone, so fix it anyway.

---

## 4. Phase 2 — Security integrity

### 4.1 S1 — Confirm the Sales OS actually gates static assets ⚪

You're putting this behind your Sales OS, which resolves the exposure question at the hosting
layer. Two things worth confirming, because static-asset auth is the usual gap:

- Does the Sales OS gate **`/*.dc.html`, `/assets/*`, `/uploads/*`, `/docs/*`** — or only the page
  shell? A shell-only gate leaves every file directly fetchable.
- Is the underlying Netlify origin still reachable directly (e.g. `random-name.netlify.app`)? If
  so, the Sales OS gate can be bypassed by going straight to origin.

**For the record**, what is in the bundle: named-deal notes at deck `:1931`
(*"Buffalo Seal & Gasket, closed won Dec 2025 — a single $225 carrier discrepancy, inside a
$140,294 modeled annual savings case."*), `:1971`, `:1995`, `:1631`; **9** occurrences of
*"No customer metric yet"* (a labelled list of which ROI claims have no proof behind them);
**15** `Why We Won - *.dc.html` win/loss analyses naming customers and displaced incumbents;
**8** case studies with customer financials ($24K / $500K / $1.5M); and `docs/CODE-AUDIT.md`,
which is a written inventory of this site's weak points.

**Do regardless (defence-in-depth):** add `robots.txt`, exclude `docs/` from the deploy, delete
`.DS_Store`.

### 4.2 S2 — Unsandboxed third-party iframes, one granted microphone 🔴

```
$ grep -o '<iframe[^>]*>' → 10 iframes
$ sandbox: 0 occurrences    referrerpolicy: 0 occurrences
```

| Deck line | Origin | `allow` | `sandbox` |
| --- | --- | --- | --- |
| **`:789`** (default `:2620`) | `genuine-conkies-86b264.netlify.app` | `clipboard-write; microphone` | ❌ |
| `:380` | `idyllic-elf-b22a7e.netlify.app` | `fullscreen` | ❌ |
| `:363` (defaults `:1529`, `:2501`) | `tubular-flan-14267b.netlify.app/embed.html` | `fullscreen` | ❌ |
| `:780` | `app.freightpop.com` (first-party) | `fullscreen; clipboard-write` | ❌ |

```html
789:  <iframe src="{{ aiUrl }}" title="FreightPOP AI" allow="clipboard-write; microphone"></iframe>
2620:  aiUrl: this.props.aiUrl || "https://genuine-conkies-86b264.netlify.app/",
```

**Why this is real, not theoretical.** Without `sandbox`, a framed page can set
`window.top.location` on a user gesture — i.e. **redirect a live customer demo to an attacker
page**. Line 789 additionally delegates **microphone** permission. And those are Netlify
*auto-generated* names, not owned domains: if any of those three sites is ever deleted, the
subdomain becomes re-registrable by anyone — a textbook subdomain-takeover path straight into a
trusted frame inside your sales deck, with a mic grant attached. The deck has a long shelf life,
which is exactly when this bites.

**Fix — per iframe:**

```html
<iframe src="{{ aiUrl }}" title="FreightPOP AI"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerpolicy="no-referrer"
        allow="clipboard-write"></iframe>
```

- `sandbox` **without** `allow-top-navigation` → kills the redirect vector.
- `microphone` removed unless a demo genuinely needs it. If it does, scope it:
  `allow="microphone https://genuine-conkies-86b264.netlify.app"`.
- Apply the same `sandbox` + `referrerpolicy` to `:380` and `:363`.

**Strategic fix:** vendor those three embeds into this repo so they stop being third-party at all.
That eliminates the entire finding class.

### 4.3 S3 — No security headers 🟠

`netlify.toml` is 23 lines: `[build]` + three `[[redirects]]`. No `[[headers]]`, and no `_headers`
or `_redirects` file exists.

**Append to `netlify.toml`:**

```toml
[[headers]]
  for = "/*"
  [headers.values]
    # Neutralises the S2 microphone grant at the top level
    Permissions-Policy   = "microphone=(), camera=(), geolocation=(), payment=()"
    Referrer-Policy      = "strict-origin-when-cross-origin"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options      = "SAMEORIGIN"
```

**Deliberately NOT adding a strict CSP.** The dc-runtime legitimately compiles fetched component
code with `new Function` (`support.js:774`, `:1148`) and `window.Babel.transform` (`:1141`), so any
CSP here requires `'unsafe-eval'`. That is a real decision with real limits, not a checkbox —
treat it as separate work. `Permissions-Policy` alone gets most of the S2 benefit.

### 4.4 S4 — `postMessage` receiver with no origin check 🟡

```js
2243:  this._libMsg = (e) => { if (e && e.data && e.data.fpCloseLib) this.closeLib(); };
2244:  window.addEventListener("message", this._libMsg);
```

`grep` for `e.origin` / `event.origin` across the whole tree: **zero results.** This receiver is
reachable from the third-party frames in S2.

**Impact is genuinely low** — `closeLib()` is a UI state toggle, not a privileged action; worst
case is someone closing the library overlay mid-demo. Fix because it's two lines:

```js
this._libMsg = (e) => {
  if (e.origin !== window.location.origin) return;
  if (e && e.data && e.data.fpCloseLib) this.closeLib();
};
```

The library sends it from the same origin (`Validation Library.dc.html:1302-1303`), so this is
safe. Also register the matching `removeEventListener` in the merged teardown (§3.2).

**Checked and cleared — not findings:**

- `support.js:1337` validates the theme value against a `"light"`/`"dark"` allowlist before use,
  and it only reaches `applyCanvasBg()` (two hardcoded constants). Not exploitable.
- `uploads/*.html:336` use **`BroadcastChannel`**, which is same-origin by specification — not a
  cross-origin receiver at all. All 8 have distinct channel names (`fp-wf-<slug>-video-sync`).

---

## 5. Phase 3 — Cleanup & refactor

### 5.1 P4 — Dead code and no-ops

| # | File:line | Issue | Action |
| --- | --- | --- | --- |
| a | deck `:364`, `:1541`, `:2624` | `{{ setHotWrap }}` is bound as a `ref` at `:364` and defined at `:1541`, but **not returned by `renderVals()`** — the only unbound template var in all 62 files. `this._hotWrap` stays `null`; `:1545` silently falls back to `offsetParent`; console fills with `[dc-runtime] … never resolved`. | Add `setHotWrap: this.setHotWrap,` to the `renderVals` return |
| b | `SpotQuoteDemo.dc.html:1146`, `:1179` | `SPOT` declared twice — objects vs pairs. Later wins, so `:1146` is dead and `:1211`'s `r.src`/`r.best`/`r.carrier` are all `undefined`. **Harmless today**: its output `rateRows` is never referenced by the template (`grep rateRows` in `<x-dc>` = 0) — the `sc-for` lists are `apiRows`/`spotRows`/`quoteRows`/etc. So it is ~40 lines of dead work per frame at 60 fps. | Rename `:1146` → `SPOT_RATES`, `:1179` → `SPOT_CARRIERS`; point `:1211` at the former, `:1272` at the latter |
| c | `WmsReceivingDemo.dc.html:361` | `cancelAnimationFrame(this._settleRaf)` — `_settleRaf` is never assigned anywhere in the file. | Delete the call |
| d | `DockSchedDemo.dc.html:356` | keyframe `{ t: 54.4, s: {} }` with `DUR = 54` — `_tick` loops via `seek(0)` at `t >= DUR`, so unreachable | Delete |
| e | `MultiLegDemo.dc.html:358` | keyframe `{ t: 57.6, s: {} }` with `DUR = 57` — unreachable | Delete |
| f | deck | Dead members: `stepNames` (`:1577`), `placeholders` (`:1579-1585`) + `phAbbr`/`phName`/`phTag` (`:2638`), `goStart` alias (`:2636`), `isIntro` (`:2634`) — all with **0 template consumers**. Unused `@keyframes fpFadeUp` (`:293`), `fpMarquee` (`:295`). | Delete |
| g | 5 demos | Unused `@keyframes`: `rsSpin` (`AiAuditingDemo`, `SpotQuoteDemo`), `srSpin` (`CarrierMgmtDemo`), `dpToast` (`DriverPodDemo`), `ibFade` (`OmsThirdPartyDemo`) | Delete |
| h | `ai-clips/scene-v5.jsx:321`, `:341` | `activeIdx` seeded from `localStorage` unvalidated → a stale out-of-range index makes `chapter` `undefined` → `chapter.introDur` throws → blank page. Not currently reachable (both shipped pages call `renderClip(id)`), but latent. | Clamp: `Math.min(idx, CHAPTERS_V4.length - 1)` |

### 5.2 S5 — Vendor the Clearbit logos 🟢

```js
1117, 1456:  var clearbit = item.logoDomain ? ("https://logo.clearbit.com/" + item.logoDomain) : "";
1058, 1060:  hardcoded e.g. https://logo.clearbit.com/lighthousesystems.com
```

Every deck view fires one request per logo to Clearbit, keyed by partner/ERP domain, carrying a
full `Referer` (no `Referrer-Policy` until §4.3 lands). Clearbit therefore learns your integration
catalogue, and via referrer which deck page and which rep session. The `onerror` fallback hits
Google favicon endpoints.

**Fix:** download the logos into `assets/logos/` and reference locally — the same treatment the
deck's fonts already got. Removes a runtime dependency *and* the leak.

### 5.3 R1 — Consolidate `uploads/` ⭐ biggest sync-safe win

**Measured**

```
All 8 files: exactly 369 lines each
diff 01 vs 02..07  →  163c163              (ONE line: the window.__WF blob)
diff 01 vs 08      →  6c6, 163c163, 191c191, 194,196c194,196
Identical shell:   30,802 bytes × 7
__WF blob:         1,742 – 2,931 bytes
REDUNDANT:         2,576 lines / 215,614 bytes (210 KB)
```

Deck references are a **single contiguous block** at `:2348-2355`, one `src:` per entry. No other
file references `uploads/`. That is the entire blast radius.

`08-route-optimization.html` has already drifted: `<title>` (`:6`), `#end-h1` (`:191`), and 3
end-card entries (`:194-196`). Files 01–07 all still carry the generic
`<title>FreightPOP — Workflow</title>`.

**Target structure**

```
uploads/
  player.html          ← 01's shell, with __WF replaced by a fetch
  wf/01.json … 08.json ← 1.7–2.9 KB each
```

`player.html` boot:

```js
const wf = new URLSearchParams(location.search).get('wf') || '01';
fetch(`wf/${encodeURIComponent(wf)}.json`)
  .then(r => r.json())
  .then(data => { window.__WF = data; boot(); });
```

JSON schema — hoist `08`'s drifted strings so it stops being a fork:

```jsonc
{
  "meta":    { "company": "...", "title": "...", "tagline": "..." },
  "phases":  [ /* unchanged */ ],
  "channel": "fp-wf-08-route-optimization-video-sync",
  "end":     { "h1": "One route. One dispatch.", "cards": [ {"n":"01","t":"…","d":"…"}, … ] }
}
```

Deck edit — `:2348-2355`, change each `src:` to `"uploads/player.html?wf=NN"`.

- **Saves 2,576 lines / 210 KB** (2.8 % of the package)
- **Risk: LOW** — static same-origin fetch, no build step, one 8-line deck edit
- **Sync-safe: ✅** — `uploads/` contains no `<x-dc>` and is outside the design-tool component graph
- `BroadcastChannel` sync preserved — `channel` is already a `__WF` field

**Lower-risk alternative** if you'd rather not touch the deck at all: keep the 8 filenames as
5-line wrappers that set `window.__WF = {…}` inline and then `<script src="player.js">`. Zero deck
edits, saves ~205 KB.

**Precedent:** `ai-clips/` already solves this correctly — `rate-shop.html` and
`invoice-audit.html` are 36-line shells differing by 3 lines, both calling `renderClip('<key>')`
against shared `.jsx` modules. `uploads/` is the same problem solved the wrong way.

### 5.4 R2 — Point the deck at `./support.js`

```
support.js                                    66,404 B  sha256 c60c4908…  ← loaded by 61 of 62 pages
extracted/2f9f3ff0-006b-4b8b-acaa-fc35ca444bea.js  60,151 B  sha256 e0650b10…  ← loaded ONLY by the deck (:5)
```

They are **different builds**, not copies. `support.js` is newer: it adds an
`if (!window.__resources)` guard around the self-refetch, and maps **26 event handlers the deck's
runtime does not know**:

```
AnimationEnd AnimationIteration AnimationStart DragEnd DragEnter DragLeave DragOver DragStart
GotPointerCapture LostPointerCapture MouseMove MouseOut MouseOver PointerCancel PointerDown
PointerEnter PointerLeave PointerMove PointerOut PointerOver PointerUp TouchCancel TouchEnd
TouchMove TouchStart TransitionEnd
```

**Current impact: none** — `grep` confirms no demo uses any of them today. But this means **a
component renders under two different runtimes depending on whether it is opened standalone or
inside the deck.** Any future hover, drag, or touch interaction added to a demo will work
standalone and silently no-op in the deck — the hardest class of bug to diagnose.

**Fix:** change deck line 5 to `<script src="support.js"></script>`; delete
`extracted/2f9f3ff0-….js` (60 KB). **Risk LOW, sync-safe ✅** (head edit, outside `<x-dc>`).
Retest the deck end-to-end afterwards — this is the one Phase 3 item that touches how the whole
deck boots.

### 5.5 R3 — Extract the deck's static-intro block

Deck lines **842-1528** (58,098 B / 687 lines) are a **second, independent application** sitting
outside `<x-dc>`: four plain `<script>` blocks (103 + 17 + 296 + 180 lines) with their own
`startRive` / `startFades` / `startMarquee` / `fit` / `openDetail` / `closeDetail` / `createCard` /
`applyFilters` / `renderPills` / `buildLogo`, an inline base64 PNG, and a 100+ entry LTL carrier
array.

`parseDcText` ignores this region entirely, so it is **sync-safe ✅** to extract into
`deck-intro.html` + `deck-intro.js`. Removes 687 lines / 58 KB from a 2,701-line file and
separates two apps that currently share one document. **Risk MEDIUM** — needs careful retest of
the intro screen.

### 5.6 R6 — Normalise keyframe prefixes

A clean **15/16 fork** from two generations of copy-paste:

| Prefix pair | Split |
| --- | --- |
| `srClick` / `rsClick` | 16 / 15 files |
| `srFadeUp` / `rsFadeUp` | 15 / 15 |
| `srSpin` / `rsSpin` | 4 / 5 |
| `srBlink` / `rsBlink` | 2 / 9 |

**No file contains both** — confirming two lineages, not a merge. Functionally identical. Pick one
prefix and normalise. Cosmetic, LOW risk, but ❌ **not sync-safe** — do it upstream or accept it
will drift back.

### 5.7 Correct the two docs files

Both `docs/CODE-AUDIT.md` and `docs/KNOWN-ISSUES.md` were written earlier in this project and
contain errors:

1. **`docs/CODE-AUDIT.md` §5** claims the P0 bug *"still parses"*, that *"the demo's autoplay path
   works"*, and that *"only the seek buttons on that one demo are affected"* — and names only
   `ShippingRulesDemo`. **All false.** It is a hard parse error, the component never evaluates,
   the demo renders a red error banner, and `RateShopDemo` is affected identically. Rewrite
   against §3.1.
2. **`docs/KNOWN-ISSUES.md`** states the download cap is *"256 KiB per file"*, while its own table
   says 192 KiB. Both are half-right: **the cap is 256 KiB of API payload**, and because binaries
   are base64-encoded (4/3 expansion), that yields exactly **192 KiB = 196,608 bytes** of actual
   file. Text files hit 256 KiB directly. All three truncated images are exactly 196,608 B —
   confirming the mechanism. (`:96` repeats the same wrong number and needs the same fix.)
3. **`docs/DEPLOYMENT.md` §"Locking it down for reps only"** now describes a world that no longer
   applies. It says *"The site is public by default"* and recommends *"Obscure URL — zero cost,
   zero friction, no real security"* as option 1, closing with *"Content here is
   marketing/validation material (public quotes, G2/Capterra reviews), so option 1 or 2 is
   usually enough."* That characterisation is wrong on the evidence in §4.1 — the bundle also
   contains named closed-won deals, win/loss analyses, and customer financials. Replace the
   section with the Sales OS gating model and the two origin-bypass checks from §4.1.
4. **`docs/CODE-AUDIT.md` §1** lists the Rive hero as a working external dependency
   (*"Hero orb simply doesn't appear if blocked; deck still works"*). After §3.2a deletes the
   dead subsystem, that row should describe only the `:890` HubSpot-hosted intro hero. §1 also
   flags the two external Netlify embeds as merely an uptime risk — add the subdomain-takeover
   and sandbox findings from §4.2.

### 5.8 Do NOT do locally — file upstream ⛔

The two largest wins in the codebase are also the two that fight the sync workflow.

| Refactor | Duplication measured | Would save |
| --- | --- | --- |
| **`DCPlayer` base class** — `anim`/`t`/`_ki`/`scaleVal`/`componentDidMount`/`componentWillUnmount`/`setWrap`/`_measure`/`_start`/`_tick`/`_applyFrame`/`seek`/`togglePlay`/`restart`/`_seekAbs`/`back10`/`fwd10`/`tPlay`/`scrub`/`_fmt` | **37 of 37** demos; **~825 lines** across **20 drifted variants** | ~750 lines |
| **`PlayerChrome.dc.html`** — transport bar, scrub track, PAUSED chip, ripple, cursor | **37 of 37** demos; **~770 template lines**; `{{ tBtn }}` ×148, byte-identical in all 37 | ~710 lines |

Drift detail: `componentWillUnmount` alone has **6 variants**; `_measure` has **4 different width
sources** (`offsetWidth` ×26, `getBoundingClientRect().width - 2` ×5, `clientWidth` ×3, and
`DriverPodDemo` dividing by **1020** instead of 1440); `restart` has 5.

**Why not locally.** `evalDcLogic` (`support.js:772-783`) is
`new Function("DCLogic","StreamableLogic","React", src)` — a shared base must live on `window`,
which means adding `<script src="./player-base.js">` to **all 38 heads** (37 demos for standalone
use + the deck for embedded use, because `parseDcText` drops demo `<head>` scripts when
`dc-import`ed). Then the next design-tool sync re-emits the full inline block, which **silently
shadows the base class rather than erroring** — so the refactor is reverted and nobody notices.

**Action:** file both as requests against the Claude Design project, to be authored as shared
components *there*, then re-synced. If that's not possible, these 1,595 duplicated lines are the
honest cost of the workflow and should be accepted rather than fought.

**Prerequisite for either:** `DockSchedDemo`, `RouteOptDemo`, and `SpotQuoteDemo` **redefine
`tBtn` a second time** for an unrelated button style. Rename those before any shared-chrome work.

**Not feasible at all:** splitting the deck's `class Component` across files. `updateJs`
(`support.js:1631-1645`) requires exactly one `class Component extends DCLogic` per file, and the
runtime has no mixin or partial-class mechanism.

---

## 6. Recorded, not fixed

Per your decision — documented, no code change.

### 6.1 Five demo files can never render

The deck gates each demo on `feat.demo.anim === "<key>"` (`:2660-2690`), but the feature data's
29 `demo:{}` blocks never emit four of those keys, and one AI key is misspelled:

| Flag | Deck line | Required | Present in data? | Orphaned file | Size |
| --- | --- | --- | --- | --- | --- |
| `demoODetail` | 2675 | `anim: "odetail"` | ✗ (0 occurrences) | `OmsProductDetailDemo.dc.html` | 19,449 B |
| `demoOReturns` | 2677 | `anim: "oreturns"` | ✗ | `ReturnsPortalDemo.dc.html` | 18,220 B |
| `demoUsers` | 2678 | `anim: "users"` | ✗ | `UsersRolesDemo.dc.html` | 30,721 B |
| `demoOorders` | 2683 | `anim: "oorders"` | ✗ | `OmsOrderMgmtDemo.dc.html` | 23,052 B |
| `aiAudit` | 2644 | `ai: "audit"` | ✗ — data has `ai: "clipAudit"` | `AiAuditingDemo.dc.html` | 21,763 B |

Sanity check: a working key like `anim: "rate"` returns 1 occurrence. **113,205 B / 1,113 lines**
that no click path in the deck reaches. The files still work if opened directly.

Also dead: `demoRateShop`'s `feat.demo.anim === true` branch — `grep -c 'anim: true'` = **0**.

**If you ever want them live:** add the four missing `anim:` values to the intended feature blocks
and change `ai: "clipAudit"` → `ai: "audit"` (or change the flag at `:2644` to match the data).

### 6.2 Three truncated images (cannot be recovered via the API)

All exactly **196,608 bytes** — the base64 truncation boundary:

| File | Used by | Symptom |
| --- | --- | --- |
| `assets/pod-photo.png` | `DriverPodDemo.dc.html:143`, `:168` (full-bleed `object-fit:cover`) | No `IEND` chunk; renders partially or not at all |
| `assets/wwy/sunbelt-solomon-hero.jpg` | `Why We Won - Sunbelt Solomon.dc.html:33` (CSS `background-image`) | No `FF D9` EOI; top portion renders, grey below |
| `extracted/9577c1e1-….png` | deck `:872`, partner-logo strip | No `IEND`. Conspicuous — it's the only logo at `height:80px` with `filter:none` |

The other 71 binaries are clean: all PNGs have a valid signature + `IEND`, all JPEGs end `FF D9`,
and all 16 WOFF2 files' internal length field at byte offset 8 matches actual file size exactly.

**Fix if you have originals:** drop full-size files over these paths. Nothing else changes.

### 6.3 Missing files referenced in code

| Path | Referenced from | Note |
| --- | --- | --- |
| `assets/rive.wasm` | deck `:2484` | Part of the dead hero subsystem (§3.2a) — resolved by deleting it |
| `assets/fp_hero-background.riv` | deck `:2487` | Same |
| `assets/pallet-damaged-{1,2}.png` | `ai-clips/ui-views-v5.jsx` | Absent from the source project too; only used by a "Claims" chapter neither shipped clip renders |
| `assets/pallet-intact-{1,2}.png` | same | Same |
| `FP_IMG['accessorial-satellite.png']` | `ai-clips/ui-views-v5.jsx:1370` | `image-data-urls.js` defines only 3 keys; lost during truncation repair. Only reachable via the Accessorials chapter, which neither shipped clip renders |

---

## 7. The check script

Save as `tools/check-code.sh`. This is what found every bug in §3 and is the only typecheck this
project can have. Run it before and after every change, and after every design-tool re-sync.

```bash
#!/usr/bin/env bash
# tools/check-code.sh — static checks for a build-less dc-runtime site
set -uo pipefail
cd "$(dirname "$0")/.."
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
fail=0

echo "== 1. parse every embedded component script =="
python3 - "$TMP" <<'PY'
import re, sys, glob, os
out = sys.argv[1]
pat = re.compile(r'<script[^>]*data-dc-script[^>]*>(.*?)</script>', re.S)
for f in sorted(glob.glob("*.dc.html")):
    s = open(f, encoding="utf-8", errors="ignore").read()
    for i, m in enumerate(pat.finditer(s)):
        open(os.path.join(out, f.replace(" ", "_").replace(".dc.html", "") + f".{i}.js"),
             "w", encoding="utf-8").write(m.group(1))
PY
ok=0; bad=0
for f in "$TMP"/*.js; do
  if node --check "$f" >/dev/null 2>&1; then ok=$((ok+1))
  else bad=$((bad+1)); echo "  FAIL $(basename "$f")"; node --check "$f" 2>&1 | head -3; fi
done
echo "  PARSE OK: $ok   FAILED: $bad"; [ "$bad" -ne 0 ] && fail=1

echo "== 2. HTML tag balance inside <x-dc> =="
python3 - <<'PY' || exit 1
import re, glob, sys
bad = 0
for f in sorted(glob.glob("*.dc.html")):
    s = open(f, encoding="utf-8", errors="ignore").read()
    m = re.search(r'<x-dc>(.*?)</x-dc>', s, re.S)
    if not m: continue
    t = m.group(1)
    o, c = len(re.findall(r'<div[\s>]', t)), len(re.findall(r'</div>', t))
    if o != c:
        bad += 1; print(f"  IMBALANCED {f}: <div {o}  </div {c}  delta {c-o:+d}")
print(f"  IMBALANCED FILES: {bad}")
sys.exit(1 if bad else 0)
PY
[ $? -ne 0 ] && fail=1

echo "== 3. duplicate class members =="
python3 - "$TMP" <<'PY' || exit 1
import re, sys, glob, os
found = 0
for p in sorted(glob.glob(os.path.join(sys.argv[1], "*.js"))):
    src = open(p, encoding="utf-8", errors="ignore").read()
    i = src.find("class Component")
    if i < 0: continue
    body, depth, members = src[src.index("{", i)+1:], 0, {}
    for ln in body.split("\n"):
        if depth == 0:
            m = re.match(r'^([A-Za-z_$][\w$]*)\s*(=|\()', ln.strip())
            if m: members.setdefault(m.group(1), 0)
            if m: members[m.group(1)] += 1
        depth += ln.count("{") - ln.count("}")
        if depth < 0: break
    for k, v in members.items():
        if v > 1: found += 1; print(f"  DUPLICATE {os.path.basename(p)}: {k} ×{v}")
print(f"  DUPLICATES: {found}")
sys.exit(1 if found else 0)
PY
[ $? -ne 0 ] && fail=1

echo "== 4. standalone JS =="
for f in *.js ai-clips/assets/*.js extracted/*.js; do
  [ -e "$f" ] || continue
  node --check "$f" >/dev/null 2>&1 || { echo "  FAIL $f"; fail=1; }
done
echo "  checked $(ls *.js ai-clips/assets/*.js extracted/*.js 2>/dev/null | wc -l | tr -d ' ') files"

echo "== 5. truncated binaries (base64 boundary = 196608 B) =="
find . \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) -size -196609c -size +196607c \
  -exec echo "  SUSPECT {}" \;

[ "$fail" -eq 0 ] && echo "ALL CHECKS PASSED" || echo "CHECKS FAILED"
exit "$fail"
```

**Expected output after Phase 1:**

```
PARSE OK: 62   FAILED: 0
IMBALANCED FILES: 0
DUPLICATES: 0
ALL CHECKS PASSED
```

**A 5th check worth adding manually** (harder to script reliably): the template-var ↔ `renderVals`
diff in *both* directions. It is what caught `setHotWrap` (bound but not returned) and
`setHeroWrap`/`setHeroFrame` (returned but not bound).

---

## 8. Verification protocol

### 8.1 Static

Run `tools/check-code.sh`. All five sections must pass.

### 8.2 Browser

A local server is already running on **:8080** (PID **35632**); stop it with `kill 35632` when
done, or restart with:

```bash
cd ~/Desktop/FreightPOP/Presentation && python3 -m http.server 8080
```

| # | Check | Expected |
| --- | --- | --- |
| 1 | Open `RateShopDemo.dc.html` and `ShippingRulesDemo.dc.html` standalone | **No red error box.** Animation runs; play/pause, scrub, ±10 s, restart all respond; timecode advances |
| 2 | Same two demos **inside the deck** | Identical behaviour to standalone |
| 3 | `UsersRolesDemo.dc.html` | No stray black circle; PAUSED chip sits bottom-left |
| 4 | Deck → DevTools ▸ Performance ▸ record 10 s idle | **No repeating 120 ms timer** (P1a). Before the fix you will see ~8 wakeups/second |
| 5 | Deck → navigate away and back, then press → once | Advances **exactly one** step (P1b) |
| 6 | Deck → Console | No `[dc-runtime] … never resolved` warnings (P4a) |
| 7 | Library → search `saved`, `supply`, `more` | No blank right-hand gutter (P2) |
| 8 | Deck → open the AI panel; DevTools ▸ Elements | iframe has `sandbox` and no `microphone` in `allow` (S2) |
| 9 | `curl -sI http://localhost:8080/` after deploy | `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, `X-Frame-Options` present (S3) |
| 10 | After R1 — all 8 workflow videos from the deck | Each plays; `BroadcastChannel` sync between deck and popped-out player still works |
| 11 | After R2 — spot-check 6 demos inside the deck | All render and animate on the newer runtime |
| 12 | After R3 — the intro screen | Fades, marquee, carrier cards, filters, detail open/close all work |

### 8.3 Regression watch

R2 and R3 are the two Phase 3 items that can break the deck globally. Do them **last**, one at a
time, with a full pass of checks 1-7 after each.

---

## 9. Execution order & risk

| Step | Work | Files | Risk | Reversible |
| --- | --- | --- | --- | --- |
| 1 | P0 reorder ×2 | `RateShopDemo`, `ShippingRulesDemo` | 🟢 Low — pure line move, pre-validated | ✅ |
| 2 | P3 stray `</div>` ×3 | + `UsersRolesDemo` | 🟢 Low — matches 59 other files | ✅ |
| 3 | P2 predicate unification | `Validation Library` | 🟡 Med — pick the intended semantic (§3.3) | ✅ |
| 4 | P1a delete dead hero subsystem | Deck | 🟡 Med — ~45 lines; verify the `:890` hero still runs | ✅ |
| 5 | P1b merge `componentWillUnmount` + add removals | Deck | 🟢 Low | ✅ |
| 6 | P4a `setHotWrap` in `renderVals` | Deck | 🟢 Low | ✅ |
| — | **▶ run checks + browser 1-7** | | | |
| 7 | S3 headers | `netlify.toml` | 🟢 Low — config only | ✅ |
| 8 | S2 iframe sandbox | Deck | 🟡 Med — verify each embed still functions | ✅ |
| 9 | S4 origin check | Deck | 🟢 Low | ✅ |
| 10 | S1 robots.txt, drop `docs/` + `.DS_Store` | root, `netlify.toml` | 🟢 Low | ✅ |
| — | **▶ run checks + browser 8-9** | | | |
| 11 | P4b-h cleanup | 7 files | 🟢 Low | ✅ |
| 12 | S5 vendor Clearbit logos | Deck + `assets/` | 🟢 Low | ✅ |
| 13 | **R1** uploads consolidation | `uploads/`, deck `:2348-2355` | 🟢 Low — sync-safe, 210 KB | ✅ |
| 14 | **R2** point deck at `support.js` | Deck `:5` | 🟡 Med — **retest whole deck** | ✅ |
| 15 | **R3** extract static intro | Deck `:842-1528` | 🟠 Med-High — 687 lines | ✅ |
| 16 | R6 keyframe prefixes | 31 demos | 🟢 Low, ❌ not sync-safe | ✅ |
| 17 | Correct `docs/*` | `docs/` | 🟢 Low | ✅ |
| 18 | File U1/U2 upstream | — | — | — |

**Totals if all executed:** ~3,300 lines and ~330 KB removed; 2 dead demos revived; 1 runaway
timer killed; 3 listener leaks closed; 4 security fixes landed.

---

## 10. Appendix — evidence log

Commands run and their key output, for reproducibility.

```
# no build tooling exists
$ ls -a | grep -E 'package.json|tsconfig|eslint'        → (none)

# 1. parse check
$ extract 62 dc-script blocks; node --check each
  PARSE OK: 60    PARSE FAILED: 2
  RateShopDemo.0.js:114      SyntaxError: Unexpected token '{'
  ShippingRulesDemo.0.js:100 SyntaxError: Unexpected token '{'

# 1b. fix pre-validation (scratch copies, project untouched)
  PASS  fixed_RateShopDemo.js
  PASS  fixed_ShippingRulesDemo.js
  RateShopDemo / ShippingRulesDemo: 50 template vars, unresolved -> NONE

# 2. tag balance
  RateShopDemo 176/177 (+1); ShippingRulesDemo 100/101 (+1); UsersRolesDemo 70/71 (+1)
  IMBALANCED FILES: 3 of 62
$ grep -l 'width:76px;height:76px' *.dc.html   → exactly those 3

# 3. duplicate members
  Deck: componentWillUnmount [2249, 2435]
  SpotQuoteDemo: SPOT [1146, 1179]

# 4. template-var binding
$ awk 'NR>=11 && NR<=841' deck | grep -o 'ref="{{ [a-z]* }}"' | sort -u
  setAnimBox setDemoBox setHotWrap setRoot setSectionFs      ← no setHeroFrame/setHeroWrap
$ grep -c 'data-fp-hero-canvas' deck            → 1  (inside startRive itself)
$ find . -name '*.riv' -o -name '*.wasm'        → (empty)
$ grep -c 'rateRows' <x-dc> of SpotQuoteDemo    → 0

# 5. deck demo reachability
$ grep -c 'anim: "odetail"'  → 0     'anim: "oreturns"' → 0
$ grep -c 'anim: "users"'    → 0     'anim: "oorders"'  → 0
$ grep -c 'anim: "rate"'     → 1     (sanity)

# 6. runtimes
  support.js                    66,404 B  sha256 c60c4908…  ← 61 pages
  extracted/2f9f3ff0-….js       60,151 B  sha256 e0650b10…  ← deck only
  26 event-handler mappings present in the former, absent in the latter

# 7. supply chain
$ cmp extracted/d4de3b32-….js <(curl -sL unpkg.com/@rive-app/canvas@2.21.6/rive.js)
  IDENTICAL — sha384 7312b899…; npm dist integrity sha512-4AKFgGCC38zm…

# 8. security
$ grep -o '<iframe[^>]*>' → 10;  sandbox: 0;  referrerpolicy: 0
$ deck:789  allow="clipboard-write; microphone"  → genuine-conkies-86b264.netlify.app (:2620)
$ grep -rn 'e.origin|event.origin'  → 0 results
$ grep -c '\[\[headers\]\]' netlify.toml  → 0;  _headers / _redirects → absent
$ __resources assignments → 0 (12 reads)  ⇒ cdnScriptFor SRI-drop branch is dead code
$ secrets scan (keys/tokens/JWT/PEM/AKIA) → only mock UI labels; PII uses reserved 555-01xx

# 9. binaries
  3 files exactly 196,608 B and missing EOF markers; other 71 clean; 16/16 WOFF2 valid

# 10. duplication
  uploads: 8 × 369 lines; 01 vs 02..07 differ by ONE line; 215,614 B redundant
  player boilerplate: 37/37 demos, ~825 lines, 20 variants
  transport-bar markup: 37/37 demos, ~770 lines, {{ tBtn }} ×148
  keyframe fork: srClick 16 / rsClick 15 — no file contains both
```
