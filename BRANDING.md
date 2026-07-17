---
name: freightpop-brand
description: >
  FreightPOP brand design system — enforces visual consistency across webpages,
  charts, modules, PPTX exports, and Word documents. Use whenever generating,
  reviewing, or modifying any visual output.
user_invocable: true
---

# FreightPOP Brand Design System

You are the FreightPOP brand enforcer. Every visual artifact — web UI, chart,
reusable module, PowerPoint deck, or Word document — must conform to these
specifications. When generating or reviewing code/content, apply the rules from
the relevant section below.

---

## 1. Foundation Tokens (All Sections Share These)

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| **Navy** | `#051729` | Dark backgrounds, headers, sidebar, PPTX title slides |
| **Primary Blue** | `#4C8DDE` | CTAs, links, accent borders, chart primary series |
| **Dashboard Blue** | `#4088cf` | V2 dashboard inline styles (slightly darker) |
| **White** | `#FFFFFF` | Card backgrounds, inverse text |
| **Light Blue** | `#C1D4E9` | Muted text on navy, subtitle text on dark slides |
| **Soft Green** | `#C0D58A` | Secondary accent (sparingly) |
| **App Background** | `#F7F9FC` | Page canvas behind cards |

### Semantic Colors

| Meaning | Color | Background tint |
|---------|-------|-----------------|
| Success | `#22C55E` / text: `#16A34A` | `rgba(34,197,94,0.12)` |
| Warning | `#F59E0B` / text: `#92400E` | `rgba(245,158,11,0.10)` |
| Danger | `#EF4444` | `rgba(239,68,68,0.10)` |
| Info | `#4C8DDE` | `rgba(76,141,222,0.12)` |
| Purple | `#8B5CF6` | `rgba(139,92,246,0.10)` |

### Typography

- **Font:** Montserrat (fallback: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)
- **Weights:** Regular 400, Semibold 600, Bold 700, Extra Bold 800
- **Heading hierarchy:**
  - H1: 800 weight, Primary Blue `#4C8DDE`
  - H2: 700 weight, Light Blue `#C1D4E9` (dark surfaces) or Navy (light surfaces)
  - H3: 700 weight, White (on navy) or Navy (on white)
  - H4: 600 weight, Navy `#051729`
  - Body: 400 weight, Navy `#051729`
  - Caption/Subtle: 600 weight, `rgba(5,23,41,0.78)`

### Spacing Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| xs | 4px | `p-1` |
| sm | 8px | `p-2` |
| md | 12px | `p-3` |
| lg | 16px | `p-4` |
| xl | 24px | `p-6` |
| xxl | 32px | `p-8` |

### Border Radius

| Context | Value |
|---------|-------|
| Small elements | 8px |
| Cards | 12px |
| Modals | 16px |
| Pills/badges | 9999px (full round) |
| Chart bars | 4px |

### Shadows

| Context | Value |
|---------|-------|
| Card (light) | `0 1px 3px rgba(5,23,41,0.08)` |
| Card (elevated) | `0 4px 16px rgba(5,23,41,0.08)` |
| Tooltip | `0 8px 24px rgba(5,23,41,0.24)` |
| Modal | `0 25px 50px -12px rgba(5,23,41,0.28)` |

---

## 2. Webpages

Apply these rules when creating or modifying React components, HTML pages, or
any browser-rendered UI.

### Layout

- Max content width: **1440px**, centered
- Page padding: `px-4 py-6` (horizontal 16px, vertical 24px)
- Section gap: `space-y-6` (24px vertical rhythm)
- Header height: 60px, navy background, z-index 100
- Sidebar: navy `#051729` background, white text, blue `#4C8DDE` active indicator

### Cards

```
rounded-[12px] border bg-white p-4
border-color: #e5e7eb (light) or rgba(5,23,41,0.08) (V1)
shadow: 0 1px 3px rgba(5,23,41,0.08)
```

- Accent border: 3px top border in `#4C8DDE` for KPI/metric cards
- No card nesting — keep surfaces flat

### KPI Metrics (Dashboard Pattern)

```
Label:  9px, bold 700, uppercase, tracking 0.1em, color #64748b
Value:  24px (text-2xl), extra-bold 800, color #051729
Sub:    10px, medium 500, color #64748b
Trend:  10px, bold 700, green (#22C55E) for positive / red (#EF4444) for negative
```

### Buttons

| Variant | Background | Text | Hover |
|---------|-----------|------|-------|
| Primary | `#4C8DDE` | white | `#3F7FCE` |
| Secondary | `#051729` | white | `#0B223B` |
| Tertiary | white | navy | border `rgba(5,23,41,0.12)` |

- Border radius: 8px
- Focus ring: `rgba(76,141,222,0.24)` 2px offset

### Tables

- Header: `#F7F9FC` background, navy `#051729` text, bold 700
- Row border: `rgba(5,23,41,0.08)`
- Hover: `rgba(76,141,222,0.06)`
- Selected row: `rgba(76,141,222,0.10)`
- Secondary text in rows: `rgba(5,23,41,0.75)`

### Badges & Pills

- Pills: `rounded-full px-3 py-1 text-[11px] font-bold`
- Badges: `rounded-md px-2 py-0.5 text-[10px] font-bold`
- Use semantic color backgrounds at 10-12% opacity with full-saturation text

### Modals

- Overlay: `rgba(5,23,41,0.5)`
- Container: white, 16px radius, heavy shadow
- Header: navy `#051729` background with white text (V1) or white background (V2)
- Footer: `#f8fafc` background with top border
- Body: `px-5 py-3`, scrollable

### Inputs & Forms

- Background: white
- Text: `#051729` (full navy contrast)
- Placeholder: `rgba(5,23,41,0.55)`
- Border: `rgba(5,23,41,0.22)`, focus: `#4C8DDE` + ring `rgba(76,141,222,0.24)`
- Labels: bold 700, navy

### Dark Sections (Hero, Sidebar, Banners)

- Background: `#051729`
- Primary text: white
- Secondary text: `#C1D4E9`
- Muted text: `rgba(255,255,255,0.72)`
- Borders: `rgba(255,255,255,0.16)`

---

## 3. Charts and Data Visualization

Apply when creating Chart.js, Recharts, or any data visualization.

### Series Palette (use in order)

| Index | Color | Name |
|-------|-------|------|
| 0 | `#4C8DDE` | Primary Blue |
| 1 | `#22C55E` | Green |
| 2 | `#F59E0B` | Amber |
| 3 | `#8B5CF6` | Purple |
| 4 | `#EC4899` | Pink |
| 5 | `#06B6D4` | Cyan |
| 6 | `#84CC16` | Lime |
| 7 | `#6366F1` | Indigo |
| 8 | `#EF4444` | Red |
| 9 | `#14B8A6` | Teal |
| 10 | `#F97316` | Orange |
| 11 | `#A855F7` | Violet |

### Bar Charts

- Default bar: `rgba(76,141,222,0.20)` (muted blue)
- Highlighted bar: `#4C8DDE`
- Selected bar: `#051729` (full navy)
- Bar corner radius: 4px (top corners only)
- Closed-Won mode: green `#16A34A`, dimmed `rgba(22,163,74,0.35)`

### Donut / Doughnut Charts

- Cutout: 68% inner radius
- Border width: 0 (no segment borders)
- "Others" slice: `rgba(5,23,41,0.08)`
- Legend: external, positioned below or right

### Funnel Charts (Sales Pipeline)

| Stage | Color |
|-------|-------|
| MQL | `#4C8DDE` |
| SAL | `#8B5CF6` |
| Demo | `#F59E0B` |
| Proposal | `#EC4899` |
| Won | `#22C55E` |
| Lost | `#EF4444` |

### Axes & Grid

- Grid lines: `rgba(5,23,41,0.08)` (light mode), `rgba(255,255,255,0.12)` (dark mode)
- Axis line: `rgba(5,23,41,0.16)`
- Tick labels: `#475569`, 11px, Montserrat
- No unnecessary gridlines — keep visuals clean

### Tooltips

- Background: `#051729` (navy)
- Text: white, 12px padding
- Secondary text: `#C1D4E9`
- Border: `rgba(255,255,255,0.12)`
- Shadow: `0 8px 24px rgba(5,23,41,0.24)`
- Value highlights: `#4C8DDE` bold 700

### Chart Container Rules

- White card background with 12px radius
- Title: bold 700, navy, above chart
- Subtitle: `rgba(5,23,41,0.78)`, semibold 600
- Minimum chart height: 240px
- Responsive — scale down gracefully, never truncate labels

---

## 4. Modules (Reusable Components)

Apply when building shared/reusable React components, slide content blocks,
or embeddable widgets.

### Card Module

```tsx
// Standard card wrapper
<div style={{
  background: '#FFFFFF',
  borderRadius: 12,
  border: '1px solid rgba(5,23,41,0.08)',
  boxShadow: '0 1px 3px rgba(5,23,41,0.08)',
  padding: 16,
}}>
```

- Use `v2.cls.card` class fragment for Tailwind: `rounded-[12px] border bg-white p-4`
- KPI accent: 3px top border `#4C8DDE`

### KPI Module

```
┌──────────────────────────┐
│ LABEL (9px, uppercase)   │  ← #64748b, tracking 0.1em
│ $1.2M                    │  ← 24px, extra-bold 800, #051729
│ +12.3% vs last quarter   │  ← 10px, bold 700, #22C55E
└──────────────────────────┘
```

### Badge Module

| Variant | Background | Text |
|---------|-----------|------|
| Info | `rgba(76,141,222,0.12)` | `#4C8DDE` |
| Success | `rgba(34,197,94,0.12)` | `#16A34A` |
| Warning | `rgba(245,158,11,0.10)` | `#D97706` |
| Danger | `rgba(239,68,68,0.10)` | `#DC2626` |
| Neutral | `rgba(5,23,41,0.08)` | `#051729` |
| New | `rgba(124,58,237,0.10)` | `#7C3AED` |

### Table Module

- Header row: `#F7F9FC` bg, navy text, bold, sticky
- Data cells: `px-2 py-2`, vertical align middle
- Row hover: `rgba(76,141,222,0.06)`
- Selected: `rgba(76,141,222,0.10)`
- Alternating rows: not used — rely on borders + hover

### Section Header Module

```
┌─────────────────────────────────────┐
│ Section Title        [Filter] [+]   │  ← 24px extra-bold, navy
│ Supporting description              │  ← 14px medium, #64748b
└─────────────────────────────────────┘
```

### Presentation Slide Modules

Slides follow a consistent structure:
- Full-bleed background (navy for title/closing, white for content)
- Title position: top-left, bold
- Content area: centered, max-width 90% of slide
- Footer: subtle branding stripe or "FreightPOP" watermark

### Vertical/Industry Badges

Each industry gets a unique color pair (10% opacity background, full-saturation text):

| Industry | Text | Background |
|----------|------|-----------|
| Building Materials | `#F97316` | `rgba(249,115,22,0.10)` |
| eCommerce | `#8B5CF6` | `rgba(139,92,246,0.10)` |
| Technology | `#4C8DDE` | `rgba(76,141,222,0.10)` |
| Food & Beverage | `#22C55E` | `rgba(34,197,94,0.10)` |
| Healthcare | `#14B8A6` | `rgba(20,184,166,0.10)` |
| Automotive | `#EF4444` | `rgba(239,68,68,0.10)` |
| Manufacturing | `#6366F1` | `rgba(99,102,241,0.10)` |

---

## 5. PPTX (PowerPoint Exports)

Apply when generating `.pptx` files via PptxGenJS or similar libraries.
The codebase uses `pptxgenjs` (v4.0.1).

### Slide Dimensions

- Layout: `LAYOUT_WIDE` (13.33" x 7.5")
- Author metadata: `FreightPOP`

### Title Slide

- Background: navy `051729` (strip `#` for PptxGenJS)
- Company name: 32pt, bold, Primary Blue `4C8DDE`, positioned (0.5, 2.2)
- Subtitle: 24pt, bold, white `FFFFFF`, positioned (0.5, 3.1)
- Descriptor line: 12pt, Light Blue `C1D4E9`, positioned (0.5, 4.0)

### Content Slides

- Header bar: navy rectangle, full width, 0.65" tall at top
  ```js
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 0, w: 13.3, h: 0.65,
    fill: { color: '051729' }
  });
  ```
- Header text: 14pt, bold, white, positioned (0.4, 0.12)
- Content area: starts at y=1.0, padded 0.5" from edges
- Chart area: `{ x: 0.5, y: 1, w: 12.2, h: 4.2 }`

### Chart Colors in PPTX

- Use `chartColors` array with stripped hex values (no `#`)
- Bar charts: `['4C8DDE']` for single series
- Multi-series: `['4C8DDE', '22C55E', 'F59E0B', '8B5CF6']`
- Doughnut: use full series palette, legend enabled

### KPI Slides

- Navy background
- Large value: 48pt, extra-bold, white
- Label: 14pt, Light Blue `C1D4E9`
- Supporting metric: 18pt, Primary Blue `4C8DDE`

### Typography in PPTX

- Font: `Montserrat` throughout
- Title: 32pt bold
- Slide header: 14pt bold
- Body text: 11-12pt regular
- Footnotes: 9pt, Light Blue `C1D4E9`

### Color Quick Reference (hex without `#` for PptxGenJS)

| Token | Value |
|-------|-------|
| Navy | `051729` |
| Blue | `4C8DDE` |
| White | `FFFFFF` |
| Light Blue | `C1D4E9` |
| Green | `22C55E` |
| Red | `EF4444` |
| Amber | `F59E0B` |
| Purple | `8B5CF6` |

---

## 6. Word Documents (DOCX)

Apply when generating `.docx` files, writing structured reports, or producing
content intended for Word/Google Docs formatting.

### Page Setup

- Paper: Letter (8.5" x 11")
- Margins: 1" all sides (standard)
- Line spacing: 1.15 for body, 1.0 for headings
- Paragraph spacing: 6pt after

### Heading Styles

| Level | Size | Weight | Color | Spacing Before |
|-------|------|--------|-------|---------------|
| Title | 28pt | 800 | `#4C8DDE` | 0pt |
| H1 | 22pt | 700 | `#051729` | 24pt |
| H2 | 16pt | 700 | `#051729` | 18pt |
| H3 | 13pt | 600 | `#4C8DDE` | 12pt |
| H4 | 11pt | 600 | `#051729` | 8pt |

### Body Text

- Font: Montserrat, 11pt, Regular 400
- Color: `#051729`
- Line height: 1.15x

### Document Header

- Left: FreightPOP logo or "FreightPOP" in bold Primary Blue
- Right: Date in 9pt, `#64748b`
- Separator: 1px line in `rgba(5,23,41,0.12)`

### Document Footer

- Center: Page number, 9pt, `#64748b`
- Left: "Confidential" in 8pt italic, `#64748b`

### Tables in Documents

- Header row: `#051729` background, white text, bold
- Alternating rows: white / `#F7F9FC`
- Cell padding: 6pt horizontal, 4pt vertical
- Border: 0.5pt, `#e5e7eb`
- Font size: 10pt

### Callout Boxes

| Type | Left Border | Background | Icon Color |
|------|------------|-----------|-----------|
| Info | `#4C8DDE` (3pt) | `rgba(76,141,222,0.08)` | `#4C8DDE` |
| Success | `#22C55E` (3pt) | `rgba(34,197,94,0.08)` | `#22C55E` |
| Warning | `#F59E0B` (3pt) | `rgba(245,158,11,0.08)` | `#F59E0B` |
| Danger | `#EF4444` (3pt) | `rgba(239,68,68,0.08)` | `#EF4444` |

### Inline Formatting

- **Bold values:** 700 weight, navy
- **Highlighted metrics:** 700 weight, `#4C8DDE`
- **Links:** `#4C8DDE`, underlined
- **Code/technical:** 10pt monospace, `#051729` on `rgba(5,23,41,0.06)` background

### ROI Report Document Structure

When generating a Word-format ROI report:

1. **Cover page** — Navy banner across top, company name in 28pt blue, "ROI Analysis" subtitle in white, prepared-by/date in light blue
2. **Executive Summary** — 1 page max, key metrics as a 2x2 grid table (Total Savings, ROI %, Payback Period, Annual Spend)
3. **Current State Analysis** — Bullet points with challenge icons, shipping mode breakdown table
4. **Savings Breakdown** — Table with category, estimated savings, percentage of total
5. **Implementation Timeline** — Phase table with milestones
6. **Appendix** — Detailed assumptions, methodology notes

---

## General Rules

1. **Never mix V1 and V2 blues** in the same visual surface. Pick one and stay consistent within the component.
2. **Montserrat everywhere** — no fallback to system fonts in exports (PPTX/DOCX must embed or specify Montserrat).
3. **Navy is the anchor** — `#051729` is the brand's gravity. Headers, dark sections, sidebars, title slides all default to navy.
4. **Blue is the accent** — `#4C8DDE` draws attention to CTAs, links, KPI borders, chart primaries. Never use it as a background for large areas.
5. **10% opacity rule** — Semantic/status backgrounds use their color at 10-12% opacity. Never use full-saturation backgrounds for badges/alerts.
6. **Respect the series palette order** — Charts always start with blue, then green, amber, purple. Don't skip or reorder.
7. **Shadows are subtle** — FreightPOP uses low-opacity navy-tinted shadows, never black. The brand feels professional and clean, not heavy.
8. **Extra-bold for impact** — KPI values, page titles, and hero numbers use 800 weight. Everything else is 600-700.
