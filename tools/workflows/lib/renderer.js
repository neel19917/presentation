'use strict';

const fs   = require('fs');
const path = require('path');
const { buildIconsJs } = require('./icons');

const TEMPLATE_PATH = path.join(__dirname, '..', 'workflow.template.html');

/** Convert "#4088cf" → "64,136,207" */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r},${g},${b}`;
}

/** Enrich a raw phase (add step string + rgb) */
function enrichPhase(phase, index, total) {
  return Object.assign({}, phase, {
    step:     `Phase ${index + 1} of ${total}`,
    rgb:      hexToRgb(phase.color),
    steps:       phase.steps    || null,
    branches:    phase.branches
      ? phase.branches.map(b => Object.assign({}, b, { rgb: hexToRgb(b.color) }))
      : null,
    badge:       phase.badge       || null,
    inputs:      phase.inputs      || null,
    outputs:     phase.outputs     || null,
    processing:  phase.processing  || null,
    systems:     phase.systems     || null,
    passthrough: phase.passthrough || null
  });
}

/** Simple HTML-safe escape for meta strings inserted into HTML attributes/text */
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Render a WorkflowInput into a complete HTML string.
 * workflowData must already be validated.
 */
function render(workflowData) {
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');
  const { meta, phases, icons } = workflowData;
  const total    = phases.length;
  const enriched = phases.map((p, i) => enrichPhase(p, i, total));

  const primaryRgb = hexToRgb(meta.primaryColor);
  const websiteText = meta.website.replace(/^https?:\/\//, '');

  const logoSizeCls = (meta.clientLogoSize === 'sm') ? 'tb-client-logo--sm' : 'tb-client-logo--lg';
  const clientLogoHtml = (meta.clientLogoUrl && meta.clientLogoUrl.trim())
    ? `<div class="tb-div"></div><img class="tb-client-logo ${logoSizeCls}" src="${meta.clientLogoUrl}" alt="${esc(meta.company)} logo" onerror="this.style.display='none'">`
    : '';

  return template
    .replace('{{META_TITLE}}',          esc(`${esc(meta.company)} — ${esc(meta.title)}`))
    .replace('{{META_COMPANY}}',        esc(meta.company))
    .replace('{{META_TAGLINE}}',        esc(meta.tagline))
    .replace('{{META_WORKFLOW_TITLE}}', esc(meta.title))
    .replace('{{META_CLIENT_LOGO}}',    clientLogoHtml)
    .replace('{{META_PHONE}}',          esc(meta.phone))
    .replace('{{META_EMAIL}}',          esc(meta.email))
    .replace('{{META_WEBSITE_HREF}}',   meta.website)
    .replace('{{META_WEBSITE_TEXT}}',   esc(websiteText))
    .replace(/\{\{PRIMARY_RGB\}\}/g,    primaryRgb)
    .replace('{{PRIMARY_COLOR}}',       meta.primaryColor)
    .replace('{{PHASE_DUR}}',           String(meta.phaseDuration || 10000))
    .replace('{{PHASES_JSON}}',         JSON.stringify(enriched, null, 2))
    .replace('{{ICONS_JS}}',            buildIconsJs(icons));
}

module.exports = { render, hexToRgb, enrichPhase };
