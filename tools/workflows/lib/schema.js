'use strict';

const { ICON_NAMES } = require('./icons');
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function isString(v) { return typeof v === 'string' && v.trim().length > 0; }
function isHex(v)    { return typeof v === 'string' && HEX_RE.test(v); }

/**
 * Validate a WorkflowInput object.
 * Returns { valid: true } or { valid: false, errors: string[] }
 */
function validate(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Input must be a JSON object'] };
  }

  // ── META ──────────────────────────────────────────────────────────
  if (!data.meta || typeof data.meta !== 'object') {
    errors.push('meta object is required');
  } else {
    const m = data.meta;
    ['company', 'tagline', 'title', 'phone', 'email', 'website'].forEach(f => {
      if (!isString(m[f])) errors.push(`meta.${f} must be a non-empty string`);
    });
    if (!isHex(m.primaryColor))
      errors.push('meta.primaryColor must be a valid 6-digit hex color (e.g. "#4088cf")');
    if (m.phaseDuration !== undefined) {
      const d = Number(m.phaseDuration);
      if (!Number.isInteger(d) || d < 2000 || d > 60000)
        errors.push('meta.phaseDuration must be an integer between 2000 and 60000 (ms)');
    }
    if (m.clientLogoUrl !== undefined && m.clientLogoUrl !== null && m.clientLogoUrl !== '') {
      if (typeof m.clientLogoUrl !== 'string')
        errors.push('meta.clientLogoUrl must be a string URL');
    }
    if (m.clientLogoSize !== undefined && !['sm', 'lg'].includes(m.clientLogoSize))
      errors.push('meta.clientLogoSize must be "sm" or "lg"');
  }

  // ── PHASES ────────────────────────────────────────────────────────
  if (!Array.isArray(data.phases)) {
    errors.push('phases must be an array');
  } else {
    if (data.phases.length < 2 || data.phases.length > 8)
      errors.push(`phases must have 2–8 items (got ${data.phases.length})`);

    data.phases.forEach((p, i) => {
      const pfx = `phases[${i}]`;
      if (!isString(p.label))  errors.push(`${pfx}.label must be a non-empty string`);
      if (!isString(p.title))  errors.push(`${pfx}.title must be a non-empty string`);
      if (!isString(p.desc))   errors.push(`${pfx}.desc must be a non-empty string`);
      if (!isHex(p.color))     errors.push(`${pfx}.color must be a valid 6-digit hex color`);
      if (!ICON_NAMES.includes(p.icon))
        errors.push(`${pfx}.icon must be one of: ${ICON_NAMES.join(', ')}`);

      const hasSteps    = Array.isArray(p.steps) && p.steps.length > 0;
      const hasBranches = Array.isArray(p.branches) && p.branches.length > 0;

      if (!hasSteps && !hasBranches)
        errors.push(`${pfx} must have either steps or branches`);
      if (hasSteps && hasBranches)
        errors.push(`${pfx} cannot have both steps and branches`);

      if (hasSteps) {
        if (p.steps.length > 10)
          errors.push(`${pfx}.steps must have at most 10 items`);
        p.steps.forEach((s, si) => {
          if (!isString(s)) errors.push(`${pfx}.steps[${si}] must be a non-empty string`);
        });
      }

      // Optional phase-level notes
      if (p.notes !== undefined) {
        if (!Array.isArray(p.notes) || p.notes.some(n => typeof n !== 'string'))
          errors.push(`${pfx}.notes must be an array of strings`);
      }

      // Optional data-layer fields
      if (p.inputs !== undefined) {
        if (!Array.isArray(p.inputs) || p.inputs.some(s => !isString(s)))
          errors.push(`${pfx}.inputs must be an array of non-empty strings`);
      }
      if (p.outputs !== undefined) {
        if (!Array.isArray(p.outputs) || p.outputs.some(s => !isString(s)))
          errors.push(`${pfx}.outputs must be an array of non-empty strings`);
      }
      if (p.processing !== undefined) {
        if (!Array.isArray(p.processing) || p.processing.some(s => !isString(s)))
          errors.push(`${pfx}.processing must be an array of non-empty strings`);
      }
      if (p.systems !== undefined) {
        if (!Array.isArray(p.systems) || p.systems.some(s => !isString(s)))
          errors.push(`${pfx}.systems must be an array of non-empty strings`);
      }
      if (p.passthrough !== undefined && typeof p.passthrough !== 'string')
        errors.push(`${pfx}.passthrough must be a string`);

      if (hasBranches) {
        if (p.branches.length < 2 || p.branches.length > 5)
          errors.push(`${pfx}.branches must have 2–5 items (got ${p.branches.length})`);
        p.branches.forEach((b, bi) => {
          const bpfx = `${pfx}.branches[${bi}]`;
          if (!isString(b.label)) errors.push(`${bpfx}.label must be a non-empty string`);
          if (!isHex(b.color))    errors.push(`${bpfx}.color must be a valid 6-digit hex color`);
          if (!Array.isArray(b.steps) || b.steps.length === 0)
            errors.push(`${bpfx}.steps must be a non-empty array`);
          else
            b.steps.forEach((s, si) => {
              if (!isString(s)) errors.push(`${bpfx}.steps[${si}] must be a non-empty string`);
            });
          // Optional branch-level notes
          if (b.notes !== undefined) {
            if (!Array.isArray(b.notes) || b.notes.some(n => typeof n !== 'string'))
              errors.push(`${bpfx}.notes must be an array of strings`);
          }
        });
      }
    });
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

module.exports = { validate };
