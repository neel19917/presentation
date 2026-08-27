/* Validation Library — vanilla JS port of design-source/Validation Library.dc.html
 * Depends on data.js (S5, DATA, FEATURE_GROUPS, TABS) and the sheet HTML files + assets/ next to it. */
(function () {
  "use strict";

  const GRID_TABS = ["whywewon", "casestudies", "recognition", "stats", "facts"];
  // Sheet iframes: doc-page.js lays out letter pages (816×1056) inside 48px/24px host padding
  // and the standalone sheets add a 96px gap between pages, so the visible frame is 864×1152 and every further page starts 1152px lower.
  const FRAME_W = 864, FRAME_H = 1152, PAGE_STRIDE = 1152;
  const BIG_STATS = [
    { v: "30%", k: "savings on annual freight spend" },
    { v: "95%", k: "reduction in shipment processing time" },
    { v: "40%", k: "average increase in on-time deliveries" },
    { v: "15%", k: "savings via invoice auditing" }
  ];

  const state = { tab: "overview", q: "", tag: "", i: 0, flipped: false, rail: true,
                  drill: false, grid: false, sheetOpen: false, pg: 1, grp: "",
                  sheetS: 0, zoomS: 0, gw: 0, gh: 0 };

  const root = document.getElementById("vl");
  const els = {
    tabs: document.getElementById("vl-tabs"),
    rail: document.getElementById("vl-rail"),
    main: document.getElementById("vl-main"),
    stage: document.getElementById("vl-stage"),
    zoom: document.getElementById("vl-zoom"),
    q: document.getElementById("vl-q")
  };

  /* ---------- helpers ---------- */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cssUrl = (u) => "url('" + String(u).replace(/'/g, "%27").replace(/"/g, "%22") + "')";
  const mono = "font-family:'DM Mono',monospace;";
  const sheetUrl = (d) => (d && d.sheet) ? d.sheet.replace(/\.dc\.html$/, ".html") : "";
  const slug = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return DATA.filter((d) => {
      if (state.tag && (d.tags || []).indexOf(state.tag) < 0) return false;
      if (q) {
        // search spans every category, not just the open tab
        return [d.label, d.title, d.quote, d.body, d.who, d.industry, d.company, d.erp, (d.tags || []).join(" ")]
          .join(" ").toLowerCase().indexOf(q) > -1;
      }
      if (state.tab === "overview") return true;
      if (state.tab !== "all" && d.cat !== state.tab) return false;
      return true;
    });
  }

  function fitGrid(n, w, h, docMode) {
    const gap = 12;
    const MIN_W = 168, MIN_H = 196;
    // body budget from what actually renders: padding + title + sub + tag row
    const bodyFor = (cardW, showSub, tagRows) => 29 + 40 + (showSub ? 18 : 0) + tagRows * 26;
    if (docMode) {
      // document tabs: card follows the page aspect so the preview reads at a glance
      const bodyH = 27 + 40 + 24;
      let c = Math.max(1, Math.min(6, Math.floor((w + gap) / (186 + gap))));
      let cardW = Math.min(244, (w - gap * (c - 1)) / c);
      let cardH = Math.round(cardW * 1.294) + bodyH;
      const rows = Math.ceil(n / c);
      const fits = rows * cardH + gap * (rows - 1) <= h;
      if (fits) {
        const grow = Math.min(1.25, (h - gap * (rows - 1)) / (rows * cardH));
        cardW = Math.min(268, cardW * grow);
        cardH = Math.round(cardW * 1.294) + bodyH;
      }
      return { cols: c, cardW: Math.floor(cardW), cardH: Math.round(cardH), gap: gap, fits: fits,
               showSub: false, tagRows: 1, maxTags: cardW < 230 ? 1 : 2, wellH: Math.round(cardW * 1.294) };
    }
    let best = null;
    for (let c = 1; c <= 8; c++) {
      const rows = Math.ceil(n / c);
      const cardW = (w - gap * (c - 1)) / c;
      const cardH = (h - gap * (rows - 1)) / rows;
      if (cardW < MIN_W || cardH < MIN_H) continue;
      const score = -(Math.abs(cardW - 208) / 208 + Math.abs(cardH - 232) / 232);
      if (!best || score > best.score) best = { cols: c, cardW: Math.min(262, cardW), cardH: cardH, gap: gap, fits: true, score: score };
    }
    if (!best) {
      // cannot show all at a legible size — pack to the floor and scroll
      const c = Math.max(1, Math.min(8, Math.floor((w + gap) / (MIN_W + gap))));
      best = { cols: c, cardW: (w - gap * (c - 1)) / c, cardH: MIN_H, gap: gap, fits: false, score: 0 };
    }
    best.cardH = Math.min(262, Math.floor(best.cardH));
    best.showSub = best.cardH >= 190;
    best.tagRows = 1;
    best.maxTags = best.cardW < 230 ? 1 : (best.cardW < 300 ? 2 : 3);
    best.wellH = Math.max(64, best.cardH - bodyFor(best.cardW, best.showSub, best.tagRows));
    return best;
  }

  function derive() {
    const shown = filtered();
    const hasQ = !!state.q.trim();
    const isBoard = !state.drill && (hasQ || (state.tab !== "overview" && (!!state.tag || state.tab === "reviews")));
    const isGrid = !isBoard && !!state.grid && GRID_TABS.indexOf(state.tab) > -1;
    const isOverview = state.tab === "overview" && !state.tag && !state.q;
    const isDetail = !isOverview && !isGrid && !isBoard;
    const i = Math.min(state.i, Math.max(0, shown.length - 1));
    const d = shown[i];
    const pool = DATA.filter((x) => state.tab === "overview" || state.tab === "all" || x.cat === state.tab);
    const tagCounts = {};
    pool.forEach((x) => (x.tags || []).forEach((t) => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    const activeTab = TABS.filter((t) => t.id === state.tab)[0] || { id: "all", label: "All validation" };
    const docMode = state.tab === "casestudies" || state.tab === "whywewon";
    const fit = fitGrid(Math.max(1, shown.length), state.gw || 600, state.gh || 400, docMode);
    return { shown, hasQ, isBoard, isGrid, isOverview, isDetail, i, d, pool, tagCounts, activeTab, fit };
  }

  /* ---------- templates ---------- */
  function tabsHtml() {
    return TABS.map((t) => {
      const c = t.id === "overview" ? "" : DATA.filter((x) => x.cat === t.id).length;
      const on = state.tab === t.id;
      return '<span class="vl-tab" data-act="tab" data-id="' + esc(t.id) + '" style="font-weight:' + (on ? 700 : 400) +
        ';background:' + (on ? "#3DD6B5" : "rgba(255,255,255,.03)") + ';color:' + (on ? "#051729" : "#9DB6CC") +
        ';border:1px solid ' + (on ? "#3DD6B5" : "rgba(255,255,255,.12)") + ';">' + esc(t.label) +
        ' <span class="vl-mono" style="font-size:9px;opacity:.55;">' + c + '</span></span>';
    }).join("");
  }

  function railHtml(D) {
    if (!state.rail) {
      return '<div class="vl-rail vl-rail-closed" data-act="toggleRail">' +
        '<span style="color:#3DD6B5;font-size:13px;line-height:1;">›</span>' +
        '<span class="vl-mono" style="font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;color:#8FA9C0;writing-mode:vertical-rl;">Features</span></div>';
    }
    const tag = state.tag, tc = D.tagCounts;
    let h = '<div class="vl-rail vl-rail-open">' +
      '<div class="vl-rail-head"><span class="vl-mono" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8FA9C0;white-space:nowrap;">By feature</span>' +
      '<span data-act="toggleRail" style="cursor:pointer;color:#8FA9C0;font-size:15px;line-height:1;flex:none;padding:2px 4px;">‹</span></div>' +
      '<div class="vl-rail-scroll">' +
      '<div data-act="pickAll" style="padding:12px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;background:' + (tag ? "transparent" : "rgba(61,214,181,.1)") + ';border-left:3px solid ' + (tag ? "transparent" : "#3DD6B5") + ';">' +
      '<span style="font-size:15px;font-weight:' + (tag ? 400 : 700) + ';color:' + (tag ? "#9DB6CC" : "#fff") + ';white-space:nowrap;flex:1 1 auto;min-width:0;letter-spacing:-.01em;">Everything</span>' +
      '<span class="vl-mono" style="font-size:11px;color:#8FA9C0;flex:none;">' + D.pool.length + '</span></div>';
    FEATURE_GROUPS.forEach((g) => {
      const items = g.items.filter((n) => tc[n]);
      if (!items.length) return;
      const holdsActive = items.indexOf(tag) > -1;
      const open = state.grp === g.name || (!state.grp && holdsActive);
      const count = D.pool.filter((x) => (x.tags || []).some((t) => items.indexOf(t) > -1)).length;
      h += '<div style="margin-top:6px;">' +
        '<div data-act="grp" data-name="' + esc(g.name) + '" style="padding:12px 18px;cursor:pointer;display:flex;align-items:center;gap:10px;background:' +
        (holdsActive ? "rgba(61,214,181,.1)" : (open ? "rgba(255,255,255,.04)" : "transparent")) + ';border-top:1px solid rgba(255,255,255,.06);">' +
        '<span class="vl-mono" style="font-size:13px;color:#3DD6B5;flex:none;width:9px;line-height:1;">' + (open ? "–" : "+") + '</span>' +
        '<span style="font-size:15px;font-weight:600;color:' + (holdsActive ? "#3DD6B5" : "#EAF3F9") + ';letter-spacing:-.01em;flex:1 1 auto;min-width:0;">' + esc(g.name) + '</span>' +
        '<span class="vl-mono" style="font-size:11px;color:#8FA9C0;flex:none;">' + count + '</span></div>';
      if (open) {
        h += '<div style="padding:4px 0 8px;">' + items.map((n) => {
          const on = tag === n;
          return '<div data-act="tag" data-name="' + esc(n) + '" style="padding:9px 18px 9px 37px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:8px;background:' +
            (on ? "rgba(61,214,181,.1)" : "transparent") + ';border-left:3px solid ' + (on ? "#3DD6B5" : "transparent") + ';">' +
            '<span style="font-size:13.5px;font-weight:' + (on ? 600 : 400) + ';color:' + (on ? "#fff" : "#9DB6CC") + ';line-height:1.35;flex:1 1 auto;min-width:0;">' + esc(n) + '</span>' +
            '<span class="vl-mono" style="font-size:11px;color:' + (on ? "#3DD6B5" : "#8FA9C0") + ';flex:none;">' + tc[n] + '</span></div>';
        }).join("") + '</div>';
      }
      h += '</div>';
    });
    return h + '</div></div>';
  }

  function tagChip(n, act, fs, pad) {
    const on = state.tag === n;
    return '<span class="vl-hv-tag" data-act="' + act + '" data-name="' + esc(n) + '" style="font-size:' + fs + ';cursor:pointer;background:' +
      (on ? "rgba(61,214,181,.18)" : "rgba(255,255,255,.03)") + ';color:' + (on ? "#3DD6B5" : "#9DB6CC") + ';border:1px solid ' +
      (on ? "rgba(61,214,181,.5)" : "rgba(255,255,255,.12)") + ';border-radius:999px;padding:' + pad + ';white-space:nowrap;">' + esc(n) + '</span>';
  }

  function overviewHtml() {
    const libs = TABS.filter((t) => t.id !== "overview").map((t) =>
      '<span class="vl-hv-lib" data-act="lib" data-id="' + esc(t.id) + '" style="padding:8px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.03);cursor:pointer;display:flex;align-items:baseline;gap:8px;">' +
      '<span style="font-size:11.5px;color:#E6F0F7;white-space:nowrap;">' + esc(t.label) + '</span>' +
      '<span class="vl-mono" style="font-size:9.5px;color:#8FA9C0;">' + DATA.filter((x) => x.cat === t.id).length + '</span></span>').join("");
    return '<div style="animation:vlSlide .28s ease-out;display:flex;flex-direction:column;gap:clamp(14px,3vh,30px);">' +
      '<div><div style="font-size:clamp(18px,3.2vh,28px);font-weight:700;letter-spacing:-.03em;line-height:1.15;max-width:640px;text-wrap:pretty;">What FreightPOP customers see</div>' +
      '<div style="font-size:clamp(11.5px,1.8vh,14px);font-weight:300;color:#A8BECF;margin-top:8px;max-width:600px;line-height:1.55;">Results customers report across freight cost, processing time and delivery performance.</div></div>' +
      '<div style="position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1px;border:1px solid rgba(61,214,181,.24);border-radius:12px;overflow:hidden;background:rgba(255,255,255,.07);box-shadow:0 0 40px -18px rgba(61,214,181,.45);">' +
      BIG_STATS.map((s) => '<div style="position:relative;background:rgba(6,26,44,.7);padding:clamp(16px,2.8vh,26px) clamp(16px,1.6vw,22px);overflow:hidden;">' +
        '<div style="position:absolute;top:-40px;left:-20px;width:130px;height:100px;border-radius:50%;background:radial-gradient(circle,rgba(61,214,181,.18),rgba(61,214,181,0) 70%);pointer-events:none;"></div>' +
        '<div style="position:relative;font-size:clamp(30px,6.4vh,60px);font-weight:700;color:#3DD6B5;letter-spacing:-.04em;line-height:1;">' + esc(s.v) + '</div>' +
        '<div class="vl-mono" style="position:relative;font-size:clamp(9.5px,1.4vh,11.5px);letter-spacing:.09em;text-transform:uppercase;color:#A8BECF;margin-top:11px;line-height:1.45;">' + esc(s.k) + '</div></div>').join("") +
      '</div><div style="display:flex;gap:7px;flex-wrap:wrap;">' + libs + '</div></div>';
  }

  function gridHtml(D) {
    const fit = D.fit;
    let h = "";
    if (state.tag) {
      h += '<div style="flex:none;display:flex;align-items:center;gap:9px;padding-bottom:12px;">' +
        '<span class="vl-mono" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#8FA9C0;">Filtered by</span>' +
        '<span data-act="clearGridTag" style="font-size:10.5px;color:#3DD6B5;cursor:pointer;border:1px solid rgba(61,214,181,.45);background:rgba(61,214,181,.1);border-radius:999px;padding:3px 10px;white-space:nowrap;">' + esc(state.tag) + ' ✕</span></div>';
    }
    h += '<div id="vl-gridBox" style="width:100%;flex:1 1 auto;min-height:0;overflow-x:hidden;overflow-y:' + (fit.fits ? "hidden" : "auto") + ';animation:vlSlide .28s ease-out;">' +
      '<div style="display:grid;grid-template-columns:repeat(' + fit.cols + ', ' + Math.floor(fit.cardW) + 'px);grid-auto-rows:' + fit.cardH + 'px;gap:' + fit.gap + 'px;justify-content:start;align-content:start;">';
    D.shown.forEach((x, n) => {
      const art = x.thumb || x.logo || "";
      const fig = !art && x.figures && x.figures[0];
      const company = x.company || x.title || x.label;
      const wellH = fit.wellH;
      const figSize = Math.max(20, Math.min(46, Math.round(Math.min(wellH * 0.42, (fit.cardW - 36) / Math.max(3, String((fig && fig.v) || "").length) * 1.7))));
      const figKSize = wellH < 110 ? 9 : 10;
      const sub = (fit.showSub ? (fig ? (x.who || "") : (x.industry || x.who || "")) : "") || "";
      const allTags = x.tags || [];
      const tags = allTags.slice(0, fit.maxTags);
      const hasMore = allTags.length > fit.maxTags;
      let well;
      if (x.thumb) {
        well = '<div role="img" aria-label="' + esc(company) + '" style="width:100%;height:100%;background-image:' + cssUrl(art) + ';background-size:cover;background-position:top center;background-repeat:no-repeat;background-color:#0A1F33;"></div>';
      } else if (x.logo) {
        well = '<div style="width:100%;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;padding:18px 20px;box-sizing:border-box;">' +
          '<div role="img" aria-label="' + esc(company) + '" style="width:100%;height:100%;background-image:' + cssUrl(art) + ';background-size:contain;background-position:center;background-repeat:no-repeat;"></div></div>';
      } else if (fig) {
        well = '<div style="position:absolute;inset:0;background:radial-gradient(80% 120% at 22% 0%,rgba(61,214,181,.16) 0%,rgba(61,214,181,0) 64%),#0A1F33;"></div>' +
          '<div style="position:relative;text-align:center;padding:14px 18px;">' +
          '<div style="font-size:' + figSize + 'px;font-weight:700;color:#3DD6B5;letter-spacing:-.04em;line-height:1.05;text-shadow:0 0 30px rgba(61,214,181,.4);white-space:nowrap;">' + esc(fig.v) + '</div>' +
          '<div class="vl-mono" style="font-size:' + figKSize + 'px;letter-spacing:.09em;text-transform:uppercase;color:#A8BECF;margin-top:9px;line-height:1.4;max-width:200px;margin-left:auto;margin-right:auto;">' + esc(fig.k) + '</div></div>';
      } else {
        well = '<div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(181,205,224,.05) 1px,transparent 1px) 0 0 / 28px 28px,linear-gradient(to bottom,rgba(181,205,224,.05) 1px,transparent 1px) 0 0 / 28px 28px,#0A1F33;"></div>' +
          '<div class="vl-mono" style="position:relative;width:34px;height:34px;border-radius:50%;border:1px solid rgba(127,182,232,.4);background:rgba(127,182,232,.1);display:flex;align-items:center;justify-content:center;font-size:11px;color:#7FB6E8;">' +
          esc(String(company || "?").trim().charAt(0).toUpperCase()) + '</div>';
      }
      h += '<div class="vl-hv-card" style="border:1px solid rgba(255,255,255,.11);border-radius:12px;background:rgba(6,26,44,.6);backdrop-filter:blur(6px);overflow:hidden;display:flex;flex-direction:column;min-height:0;">' +
        '<div data-act="open" data-n="' + n + '" style="position:relative;flex:1 1 auto;min-height:' + wellH + 'px;cursor:pointer;background:#0A1F33;display:flex;align-items:center;justify-content:center;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.08);">' + well + '</div>' +
        '<div style="flex:0 0 auto;min-width:0;padding:9px 12px 10px;display:flex;flex-direction:column;gap:6px;overflow:hidden;">' +
        '<div data-act="open" data-n="' + n + '" style="cursor:pointer;flex:0 0 auto;">' +
        (!fig ? '<div style="font-size:15.5px;font-weight:700;letter-spacing:-.02em;line-height:1.25;text-wrap:pretty;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + esc(company) + '</div>' : '') +
        '<div class="vl-mono" style="font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8FA9C0;margin-top:5px;line-height:1.4;">' + esc(sub) + '</div></div>' +
        '<div style="display:flex;gap:4px;flex-wrap:nowrap;margin-top:auto;flex:0 0 auto;height:22px;overflow:hidden;align-items:center;">' +
        tags.map((t) => {
          const on = state.tag === t;
          return '<span class="vl-hv-tag" data-act="gtag" data-name="' + esc(t) + '" style="font-size:10px;cursor:pointer;background:' + (on ? "rgba(61,214,181,.14)" : "rgba(255,255,255,.04)") +
            ';color:' + (on ? "#3DD6B5" : "#9DB6CC") + ';border:1px solid ' + (on ? "rgba(61,214,181,.5)" : "rgba(255,255,255,.11)") + ';border-radius:999px;padding:2px 7px;white-space:nowrap;">' + esc(t) + '</span>';
        }).join("") +
        (hasMore ? '<span class="vl-mono" data-act="open" data-n="' + n + '" style="font-size:10px;color:#8FA9C0;cursor:pointer;padding:2px 4px;">+' + Math.max(0, allTags.length - fit.maxTags) + '</span>' : '') +
        '</div></div></div>';
    });
    return h + '</div></div>';
  }

  function boardHtml(D) {
    const shown = D.shown;
    const boardTitle = D.hasQ ? "“" + state.q.trim() + "”" : (state.tag || D.activeTab.label);
    const quotes = shown.map((x, n) => ({ x, n })).filter((o) => o.x.quote);
    const docs = shown.map((x, n) => ({ x, n })).filter((o) => o.x.sheet);
    const notes = shown.map((x, n) => ({ x, n })).filter((o) => !o.x.quote && !o.x.sheet && !(o.x.figures && o.x.figures.length));
    const seen = {}, figs = [];
    shown.forEach((x, n) => (x.figures || []).forEach((f) => {
      const k = f.v + "|" + f.k;
      if (seen[k]) return;
      seen[k] = 1;
      figs.push({ v: f.v, k: f.k, n: n });
    }));
    const parts = [];
    const fCount = Math.min(4, figs.length);
    if (fCount) parts.push(fCount + (fCount === 1 ? " number" : " numbers"));
    if (quotes.length) parts.push(quotes.length + (quotes.length === 1 ? " quote" : " quotes"));
    if (docs.length) parts.push(docs.length + (docs.length === 1 ? " document" : " documents"));
    const side = shown.filter((x) => x.sheet || (!x.quote && !x.sheet)).length;
    const boardCols = (!quotes.length || !side) ? "minmax(0,1fr)" : "minmax(0,1.35fr) minmax(0,.9fr)";
    const hasSide = shown.some((x) => x.sheet || (!x.quote && !(x.figures && x.figures.length)));

    let h = '<div style="flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:clamp(9px,1.7vh,17px);animation:vlSlide .28s ease-out;">' +
      '<div style="flex:none;display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;">' +
      '<div style="font-size:clamp(19px,3.1vh,27px);font-weight:700;letter-spacing:-.03em;line-height:1.2;white-space:nowrap;">' + esc(boardTitle) + '</div>' +
      '<span class="vl-mono" style="font-size:11px;letter-spacing:.11em;text-transform:uppercase;color:#8FA9C0;white-space:nowrap;">' + esc(parts.join("  ·  ")) + '</span>' +
      ((state.tag || D.hasQ) ? '<span class="vl-mono" data-act="clearAll" style="font-size:10px;letter-spacing:.11em;text-transform:uppercase;color:#3DD6B5;cursor:pointer;white-space:nowrap;">clear ✕</span>' : '') +
      '</div>';
    if (!shown.length) {
      h += '<div style="flex:none;font-size:15px;color:#8FA9C0;line-height:1.6;">No validation matches that yet. Try a feature name, a company, or a word from a quote.</div>';
    }
    if (figs.length) {
      h += '<div style="flex:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:1px;border:1px solid rgba(61,214,181,.24);border-radius:12px;overflow:hidden;background:rgba(255,255,255,.07);box-shadow:0 0 40px -18px rgba(61,214,181,.45);">' +
        figs.slice(0, 4).map((f) => '<div class="vl-hv-fig" data-act="bfig" data-n="' + f.n + '" style="position:relative;background:rgba(6,26,44,.7);padding:clamp(16px,2.8vh,26px) clamp(16px,1.6vw,22px);cursor:pointer;overflow:hidden;">' +
          '<div style="position:absolute;top:-40px;left:-20px;width:130px;height:100px;border-radius:50%;background:radial-gradient(circle,rgba(61,214,181,.18),rgba(61,214,181,0) 70%);pointer-events:none;"></div>' +
          '<div style="position:relative;font-size:clamp(40px,7.4vh,68px);font-weight:700;color:#3DD6B5;letter-spacing:-.04em;line-height:1;">' + esc(f.v) + '</div>' +
          '<div class="vl-mono" style="position:relative;font-size:11.5px;letter-spacing:.09em;text-transform:uppercase;color:#A8BECF;margin-top:11px;line-height:1.45;">' + esc(f.k) + '</div></div>').join("") + '</div>';
    }
    h += '<div style="flex:1 1 auto;min-height:0;display:grid;grid-template-columns:' + boardCols + ';gap:clamp(12px,1.7vw,24px);">';
    if (quotes.length) {
      h += '<div style="min-width:0;min-height:0;display:flex;flex-direction:column;">' +
        '<div class="vl-mono" style="flex:none;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8FA9C0;padding-bottom:9px;">In their words · ' + quotes.length + '</div>' +
        '<div style="flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));grid-auto-rows:min-content;gap:10px;align-content:start;">' +
        quotes.map((o) => '<div class="vl-hv-quote" data-act="bquote" data-n="' + o.n + '" style="border:1px solid rgba(255,255,255,.11);border-radius:10px;background:rgba(6,26,44,.62);padding:11px 13px 10px;cursor:pointer;display:flex;flex-direction:column;gap:7px;">' +
          '<div style="font-size:14.5px;font-weight:300;line-height:1.5;color:#EAF3F9;letter-spacing:-.005em;text-wrap:pretty;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;">“' + esc(o.x.quote) + '”</div>' +
          '<div style="display:flex;align-items:center;gap:7px;">' +
          (o.x.stars > 0 ? '<span style="font-size:10.5px;letter-spacing:.06em;color:#F2B441;flex:none;">★★★★★</span>' : '') +
          '<span class="vl-mono" style="font-size:9px;letter-spacing:.09em;text-transform:uppercase;color:#8FA9C0;line-height:1.35;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(o.x.who || "") + '</span></div></div>').join("") +
        '</div></div>';
    }
    if (hasSide) {
      h += '<div style="min-width:0;min-height:0;display:flex;flex-direction:column;gap:12px;overflow-y:auto;overflow-x:hidden;">';
      if (docs.length) {
        h += '<div style="flex:none;"><div class="vl-mono" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8FA9C0;padding-bottom:9px;">Documents · ' + docs.length + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fill,176px);gap:12px;justify-content:start;">' +
          docs.map((o) => '<div data-act="bdoc" data-n="' + o.n + '" style="cursor:pointer;display:flex;flex-direction:column;gap:5px;">' +
            '<div class="vl-hv-doc" role="img" aria-label="' + esc(o.x.company || o.x.label) + '" style="width:100%;aspect-ratio:408 / 528;background-image:' + (o.x.thumb ? cssUrl(o.x.thumb) : "none") + ';background-size:cover;background-position:top center;border:1px solid rgba(255,255,255,.13);border-radius:5px;box-shadow:0 6px 18px -8px rgba(0,0,0,.75);"></div>' +
            '<div style="font-size:11px;color:#C3D5E3;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + esc(o.x.company || o.x.label) + '</div></div>').join("") +
          '</div></div>';
      }
      if (notes.length) {
        h += '<div style="flex:none;"><div class="vl-mono" style="font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#8FA9C0;padding-bottom:11px;">Also proves it · ' + notes.length + '</div>' +
          '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:10px;">' +
          notes.map((o) => '<div class="vl-hv-quote" data-act="bnote" data-n="' + o.n + '" style="cursor:pointer;border:1px solid rgba(255,255,255,.11);border-left:3px solid rgba(61,214,181,.55);border-radius:10px;background:rgba(6,26,44,.62);padding:13px 15px;display:flex;flex-direction:column;gap:8px;">' +
            '<div style="font-size:17px;font-weight:500;color:#EAF3F9;line-height:1.3;letter-spacing:-.01em;text-wrap:pretty;">' + esc(o.x.title || o.x.label) + '</div>' +
            '<div class="vl-mono" style="font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:#8FA9C0;">' + esc(o.x.who || "") + '</div></div>').join("") +
          '</div></div>';
      }
      h += '</div>';
    }
    return h + '</div></div>';
  }

  function frameGeom(d) {
    const pages = (d && d.pages) || 1;
    return { pages: pages, frameH: FRAME_H + PAGE_STRIDE * (pages - 1), shift: -PAGE_STRIDE * ((state.pg || 1) - 1) };
  }

  function detailHtml(D) {
    const d = D.d;
    if (!d) return '<div style="color:#8FA9C0;font-size:13.5px;">Nothing matches. Clear the filters or pick another feature.</div>';
    if (d.sheet) {
      const g = frameGeom(d), src = sheetUrl(d);
      const kind = d.cat === "casestudies" ? "Case study" : "Why We Won · one-pager";
      return '<div id="vl-sheetBox" data-act="openSheet" style="width:100%;flex:1 1 auto;min-height:0;display:flex;align-items:center;justify-content:center;animation:vlSlide .28s ease-out;cursor:zoom-in;">' +
        '<div id="vl-sheetScale" style="position:relative;width:' + FRAME_W + 'px;height:' + FRAME_H + 'px;flex:none;transform-origin:center center;transform:scale(' + (state.sheetS || 0.34) + ');border-radius:4px;overflow:hidden;box-shadow:0 30px 90px -30px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.14);">' +
        '<iframe class="vl-frame" title="' + esc(d.company) + '" scrolling="no" src="' + esc(src) + '" style="width:' + FRAME_W + 'px;height:' + g.frameH + 'px;border:0;display:block;background:#fff;pointer-events:none;transform:translateY(' + g.shift + 'px);"></iframe>' +
        '</div></div>' +
        '<div style="flex:none;display:flex;align-items:center;gap:14px;padding-top:10px;">' +
        '<span class="vl-mono" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#8FA9C0;">' + kind + '</span>' +
        (g.pages > 1 ? '<span class="vl-mono" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#fff;">' + g.pages + ' pages</span>' : '') +
        '<span class="vl-mono" data-act="openSheet" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#3DD6B5;cursor:pointer;">' + (g.pages > 1 ? "Enlarge to read all ⤢" : "Enlarge ⤢") + '</span>' +
        '<a class="vl-mono" href="' + esc(src) + '" target="_blank" rel="noopener" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#8FA9C0;text-decoration:none;">New tab →</a></div>';
    }
    // plain item (stats, reviews, recognition, platform facts)
    let h = '<div style="max-width:880px;animation:vlSlide .28s ease-out;display:flex;flex-direction:column;min-height:0;">';
    if (d.logo) {
      h += '<div style="flex:none;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:8px;padding:10px 14px;margin-bottom:clamp(9px,1.8vh,15px);align-self:flex-start;width:clamp(120px,17vw,168px);height:clamp(48px,8.4vh,66px);box-shadow:0 3px 14px rgba(0,0,0,.28);">' +
        '<div role="img" aria-label="' + esc(d.label || "") + '" style="width:100%;height:100%;background-image:' + cssUrl(d.logo) + ';background-size:contain;background-position:center;background-repeat:no-repeat;"></div></div>';
    }
    h += '<div style="flex:none;display:flex;align-items:center;gap:11px;margin-bottom:clamp(8px,1.8vh,18px);">' +
      (d.stars > 0 ? '<span style="font-size:16px;letter-spacing:.14em;color:#F2B441;flex:none;">' + S5 + '</span>' : '') +
      '<span class="vl-mono" style="font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:#8FA9C0;white-space:nowrap;flex:none;">' + esc(d.meta || "") + '</span></div>';
    if (d.quote) h += '<div style="flex:none;font-size:clamp(21px,3.7vh,33px);font-weight:300;line-height:1.4;color:#F2F8FC;letter-spacing:-.015em;text-wrap:pretty;margin-bottom:clamp(10px,2vh,20px);">“' + esc(d.quote) + '”</div>';
    if (d.title) h += '<div style="flex:none;font-size:clamp(21px,3.6vh,32px);font-weight:700;letter-spacing:-.03em;line-height:1.16;text-wrap:pretty;margin-bottom:clamp(10px,2vh,20px);">' + esc(d.title) + '</div>';
    if (d.figures && d.figures.length) {
      h += '<div style="flex:none;display:flex;gap:clamp(16px,2.6vw,34px);flex-wrap:wrap;margin-bottom:clamp(10px,2vh,20px);padding:clamp(9px,1.7vh,17px) 0;border-top:1px solid rgba(255,255,255,.1);border-bottom:1px solid rgba(255,255,255,.1);">' +
        d.figures.map((f) => '<div><div style="font-size:clamp(25px,5vh,42px);font-weight:700;color:#3DD6B5;letter-spacing:-.035em;line-height:1;">' + esc(f.v) + '</div>' +
          '<div class="vl-mono" style="font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:#8FA9C0;margin-top:clamp(5px,1vh,9px);max-width:150px;line-height:1.4;">' + esc(f.k) + '</div></div>').join("") + '</div>';
    }
    if (d.body) h += '<div style="flex:0 1 auto;min-height:0;overflow:hidden;font-size:clamp(14px,2.2vh,18px);font-weight:300;line-height:1.6;color:#B9CBD9;text-wrap:pretty;max-width:780px;">' + esc(d.body) + '</div>';
    h += '<div style="flex:none;margin-top:clamp(12px,2.4vh,26px);display:flex;flex-direction:column;gap:clamp(6px,1.2vh,11px);"><div style="display:flex;align-items:baseline;gap:9px;">' +
      '<span class="vl-mono" style="font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:#8FA9C0;flex:none;">Who</span>' +
      '<span style="font-size:14px;color:#C3D5E3;line-height:1.45;">' + esc(d.who || "") + '</span></div></div>';
    return h + '</div>';
  }

  function stageHtml(D) {
    const { shown, isBoard, isGrid, isOverview, isDetail, i, d, activeTab } = D;
    const notOverview = !isOverview && !isBoard;
    const stageHeading = state.tag ? "Validation for " + state.tag : (activeTab.id === "all" ? "All validation" : activeTab.label);
    let h = "";
    if (notOverview) {
      h += '<div style="flex:none;padding:10px clamp(26px,3.6vw,54px) 0;display:flex;align-items:baseline;gap:10px;">' +
        '<span class="vl-mono" style="font-size:11px;letter-spacing:.13em;text-transform:uppercase;color:#3DD6B5;white-space:nowrap;flex:none;">' + esc(stageHeading) + '</span>' +
        '<span class="vl-mono" style="font-size:11px;color:#8FA9C0;flex:none;white-space:nowrap;">' + shown.length + (shown.length === 1 ? " item" : " items") + '</span></div>';
    }
    h += '<div class="vl-body">';
    if (isOverview) h += overviewHtml();
    else if (isGrid) h += gridHtml(D);
    else if (isBoard) h += boardHtml(D);
    else h += detailHtml(D);
    h += '</div>';

    const showProves = !isGrid && !isBoard && state.tab !== "overview" && !!(d && d.tags && d.tags.length);
    if (showProves) {
      h += '<div style="flex:none;padding:9px clamp(26px,3.6vw,54px) 0;"><div style="display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;max-width:720px;">' +
        '<span class="vl-mono" style="font-size:8.5px;letter-spacing:.13em;text-transform:uppercase;color:#8FA9C0;flex:none;">Proves</span>' +
        '<div style="display:flex;gap:5px;flex-wrap:wrap;">' + d.tags.map((t) => tagChip(t, "tag", "11.5px", "4px 11px")).join("") + '</div></div></div>';
    }
    const showStrip = !isGrid && !isBoard && state.tab !== "overview" && shown.length > 1 && shown.length <= 16;
    if (showStrip) {
      h += '<div class="vl-strip" style="flex:none;box-sizing:border-box;padding:9px clamp(26px,3.6vw,54px) 0;display:flex;gap:5px;flex-wrap:nowrap;overflow:hidden;align-items:center;">' +
        shown.map((x, n) => {
          const on = n === i;
          return '<span class="vl-mono" data-act="strip" data-n="' + n + '" title="' + esc(x.label || "") + '" style="flex:none;width:26px;height:26px;border-radius:6px;cursor:pointer;background:' + (on ? "rgba(61,214,181,.12)" : "rgba(255,255,255,.02)") +
            ';border:1px solid ' + (on ? "rgba(61,214,181,.5)" : "rgba(255,255,255,.1)") + ';display:flex;align-items:center;justify-content:center;font-size:10px;color:' + (on ? "#fff" : "#9DB6CC") + ';font-weight:' + (on ? 700 : 400) + ';">' + (n + 1) + '</span>';
        }).join("") + '</div>';
    }
    if (isDetail) {
      const canBackToBoard = !!state.drill && (D.hasQ || !!state.tag || state.tab === "reviews");
      const canBackToGrid = GRID_TABS.indexOf(state.tab) > -1;
      const hasFilter = !!(state.tag || state.q || state.tab !== "overview");
      const boardTitle = D.hasQ ? "“" + state.q.trim() + "”" : (state.tag || activeTab.label);
      const nav = 'width:32px;height:32px;border-radius:50%;border:1px solid rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#B5CDE0;font-size:13px;flex:none;';
      h += '<div style="flex:none;padding:10px clamp(26px,3.6vw,54px) 11px;display:flex;align-items:center;gap:14px;">' +
        '<span data-act="prev" style="' + nav + '">←</span><span data-act="next" style="' + nav + '">→</span>' +
        '<span class="vl-mono" style="font-size:10.5px;color:#8FA9C0;letter-spacing:.08em;flex:none;">' + (shown.length ? (i + 1) + " / " + shown.length : "0 / 0") + '</span>' +
        (canBackToBoard ? '<span data-act="backToBoard" style="font-size:10.5px;color:#3DD6B5;cursor:pointer;white-space:nowrap;flex:none;">← back to ' + esc(boardTitle) + '</span>' : '') +
        (canBackToGrid ? '<span data-act="backToGrid" style="font-size:10.5px;color:#3DD6B5;cursor:pointer;white-space:nowrap;flex:none;">all stories</span>' : '') +
        (hasFilter ? '<span data-act="clearAll" style="font-size:10.5px;color:#3DD6B5;cursor:pointer;white-space:nowrap;flex:none;">clear filters</span>' : '') +
        '<div style="flex:1;min-width:0;height:2px;background:rgba(255,255,255,.09);border-radius:2px;overflow:hidden;"><div style="height:100%;width:' + (shown.length ? Math.round(((i + 1) / shown.length) * 100) : 0) + '%;background:#3DD6B5;"></div></div></div>';
    }
    return h;
  }

  function zoomHtml(D) {
    const d = D.d;
    if (!(state.sheetOpen && d && d.sheet)) return "";
    const g = frameGeom(d);
    const btn = mono + "font-size:14px;color:#3DD6B5;cursor:pointer;padding:2px 9px;border:1px solid rgba(61,214,181,.4);border-radius:6px;line-height:1.3;";
    return '<div data-act="closeSheet" style="position:absolute;inset:0;z-index:40;background:rgba(2,10,18,.9);backdrop-filter:blur(6px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:22px;cursor:zoom-out;animation:vlSlide .2s ease-out;">' +
      '<div id="vl-zoomBox" style="flex:1 1 auto;min-height:0;width:100%;display:flex;align-items:center;justify-content:center;">' +
      '<div id="vl-zoomScale" style="position:relative;width:' + FRAME_W + 'px;height:' + FRAME_H + 'px;flex:none;transform-origin:center center;transform:scale(' + (state.zoomS || 0.5) + ');border-radius:3px;overflow:hidden;box-shadow:0 40px 120px -30px rgba(0,0,0,.9);background:#fff;">' +
      '<iframe class="vl-frame" title="' + esc(d.company) + '" scrolling="no" src="' + esc(sheetUrl(d)) + '" style="width:' + FRAME_W + 'px;height:' + g.frameH + 'px;border:0;display:block;background:#fff;transform:translateY(' + g.shift + 'px);"></iframe>' +
      '</div></div>' +
      '<div data-act="stopClose" style="flex:none;display:flex;align-items:center;gap:14px;cursor:default;">' +
      (g.pages > 1 ? '<span data-act="pagePrev" style="' + btn + '">←</span>' +
        '<span id="vl-pageLabel" class="vl-mono" style="font-size:10px;letter-spacing:.12em;color:#fff;">' + (state.pg || 1) + ' / ' + g.pages + '</span>' +
        '<span data-act="pageNext" style="' + btn + '">→</span>' : '') +
      '<span class="vl-mono" style="font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#8FA9C0;">Esc to close</span></div></div>';
  }

  /* ---------- rendering & measurement ---------- */
  const ro = new ResizeObserver(() => { fitSheet(); fitGridBox(); });

  function observe() {
    ro.disconnect();
    ["vl-sheetBox", "vl-zoomBox", "vl-gridBox"].forEach((id) => { const el = document.getElementById(id); if (el) ro.observe(el); });
  }

  function fitSheet() {
    const box = document.getElementById("vl-sheetBox"), sc = document.getElementById("vl-sheetScale");
    if (box && sc) {
      const s = Math.min(box.clientWidth / FRAME_W, box.clientHeight / FRAME_H);
      if (s > 0 && Math.abs(s - (state.sheetS || 0)) > 0.004) state.sheetS = s;
      sc.style.transform = "scale(" + (state.sheetS || 0.34) + ")";
    }
    const zb = document.getElementById("vl-zoomBox"), zs = document.getElementById("vl-zoomScale");
    if (zb && zs) {
      const s = Math.min(zb.clientWidth / FRAME_W, zb.clientHeight / FRAME_H);
      if (s > 0 && Math.abs(s - (state.zoomS || 0)) > 0.004) state.zoomS = s;
      zs.style.transform = "scale(" + (state.zoomS || 0.5) + ")";
    }
  }

  function fitGridBox() {
    const el = document.getElementById("vl-gridBox");
    if (!el) return;
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    if (Math.abs(w - (state.gw || 0)) > 2 || Math.abs(h - (state.gh || 0)) > 2) { state.gw = w; state.gh = h; render(); }
  }

  function applyFrames(d) {
    const g = frameGeom(d);
    root.querySelectorAll(".vl-frame").forEach((f) => { f.style.transform = "translateY(" + g.shift + "px)"; });
    const lbl = document.getElementById("vl-pageLabel");
    if (lbl) lbl.textContent = (state.pg || 1) + " / " + g.pages;
  }

  function renderOverlay(D) {
    D = D || derive();
    els.zoom.innerHTML = zoomHtml(D);
    applyFrames(D.d);
    observe();
    fitSheet();
  }

  function render() {
    const D = derive();
    els.tabs.innerHTML = tabsHtml();
    els.main.style.gridTemplateColumns = (state.rail ? "266px" : "38px") + " minmax(0,1fr)";
    els.rail.innerHTML = railHtml(D);
    els.stage.innerHTML = stageHtml(D);
    if (els.q.value !== state.q) els.q.value = state.q;
    renderOverlay(D);
    fitGridBox();
  }

  function setState(patch, overlayOnly) {
    Object.assign(state, patch);
    if (overlayOnly) renderOverlay(); else render();
  }

  function step(n) {
    const len = filtered().length;
    if (!len) return;
    setState({ i: (state.i + n + len) % len, flipped: false, sheetOpen: false, pg: 1 });
  }

  function page(n) {
    const shown = filtered();
    const d = shown[Math.min(state.i, Math.max(0, shown.length - 1))];
    const total = (d && d.pages) || 1;
    setState({ pg: Math.min(total, Math.max(1, (state.pg || 1) + n)) }, true);
  }

  /* ---------- events ---------- */
  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el || !root.contains(el)) return;
    const act = el.dataset.act, name = el.dataset.name, id = el.dataset.id, n = +el.dataset.n;
    const shown = filtered();
    switch (act) {
      case "tab":
      case "lib":
        setState({ tab: id, i: 0, drill: false, grid: GRID_TABS.indexOf(id) > -1, sheetOpen: false, tag: "" }); break;
      case "toggleRail": setState({ rail: !state.rail }); break;
      case "pickAll": setState({ tag: "", i: 0, drill: false, tab: state.tab === "all" ? "overview" : state.tab, sheetOpen: false }); break;
      case "grp": {
        const D = derive();
        const g = FEATURE_GROUPS.filter((x) => x.name === name)[0];
        const items = g ? g.items.filter((t) => D.tagCounts[t]) : [];
        const open = state.grp === name || (!state.grp && items.indexOf(state.tag) > -1);
        setState({ grp: open ? "—none—" : name });
        break;
      }
      case "tag": setState({ tag: state.tag === name ? "" : name, i: 0, drill: false, tab: state.tab === "overview" ? "all" : state.tab, sheetOpen: false }); break;
      case "gtag": setState({ tag: state.tag === name ? "" : name, i: 0, drill: false, grid: true }); break;
      case "clearGridTag": setState({ tag: "", i: 0, drill: false, grid: true }); break;
      case "open": { const x = shown[n]; setState({ grid: false, i: n, flipped: false, sheetOpen: !!(x && x.sheet), pg: 1 }); break; }
      case "clearAll": setState({ tab: "overview", tag: "", q: "", i: 0, drill: false, sheetOpen: false }); break;
      case "bfig": { const x = shown[n]; setState({ drill: true, i: n, sheetOpen: !!(x && x.sheet), pg: 1, flipped: false }); break; }
      case "bquote":
      case "bnote": setState({ drill: true, i: n, sheetOpen: false, pg: 1, flipped: false }); break;
      case "bdoc": setState({ drill: true, i: n, sheetOpen: true, pg: 1, flipped: false }); break;
      case "openSheet": setState({ sheetOpen: true, pg: 1 }, true); break;
      case "closeSheet": setState({ sheetOpen: false, pg: 1 }, true); break;
      case "stopClose": break;
      case "pagePrev": page(-1); break;
      case "pageNext": page(1); break;
      case "prev": step(-1); break;
      case "next": step(1); break;
      case "backToBoard": setState({ drill: false, sheetOpen: false }); break;
      case "backToGrid": setState({ grid: true, sheetOpen: false }); break;
      case "strip": setState({ i: n, flipped: false }); break;
      case "backToDeck": {
        // inside the deck: close the overlay in place. standalone: follow the link.
        // the deck opens this with ?feature=… ; anywhere else the link just loads the deck
        let inDeck = false;
        try { inDeck = new URLSearchParams(window.location.search).has("feature") && window.parent !== window; } catch (err) {}
        if (inDeck) {
          e.preventDefault();
          try { window.parent.postMessage({ fpCloseLib: true }, "*"); } catch (err) {}
          try { if (window.top && window.top !== window.parent) window.top.postMessage({ fpCloseLib: true }, "*"); } catch (err) {}
        }
        break;
      }
    }
  });

  els.q.addEventListener("input", (e) => setState({ q: e.target.value, i: 0, drill: false, sheetOpen: false }));

  window.addEventListener("keydown", (e) => {
    if (e.target && /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === "Escape" && state.sheetOpen) { setState({ sheetOpen: false, pg: 1 }, true); return; }
    if (state.sheetOpen) {
      if (e.key === "ArrowRight") page(1);
      if (e.key === "ArrowLeft") page(-1);
      return;
    }
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
  });
  window.addEventListener("resize", () => { fitSheet(); fitGridBox(); });

  /* ---------- boot ---------- */
  try {
    const p = new URLSearchParams(window.location.search).get("feature");
    const hits = p ? DATA.filter((d) => (d.tags || []).indexOf(p) > -1).length : 0;
    if (p && hits) Object.assign(state, { tag: p, tab: "all", i: 0, grid: false });
  } catch (e) {}
  render();
})();
