# Hemlock Component Template — Styling Handoff

> **Purpose:** Complete styling reference for applying the Hemlock design system to specialized component HTML templates. Pass this to any agent building or restyling components.

---

## 1. Design Tokens (`:root` CSS Custom Properties)

### Core Surfaces & Text

| Token | Value | Usage |
|-------|-------|-------|
| `--surface-1` | `#FFFFFF` | Primary background (cards, inputs, rows) |
| `--surface-2` | `#F8F7F6` | Secondary background |
| `--nest` | `#F8F7F6` | Nested container bg |
| `--border` | `#EEEDEB` | Default borders |
| `--border-strong` | `#D5D3D0` | Emphasized borders (search input, section dividers) |
| `--ink` | `#0e0e0e` | Primary text, headings |
| `--muted` | `#5E5954` | Secondary text, labels |
| `--faint` | `#8A8680` | Tertiary text, captions |
| `--inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--page-bg` | `#FFFFFF` | Page background |

### Accent & Blue Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#3a6af8` | Primary accent (blue-600) |
| `--accent-hover` | `#2952cc` | Accent hover state (blue-700) |
| `--accent-subtle` | `#ebf0fe` | Accent background tint (blue-100) |
| `--accent-fill` | `rgba(58,106,248,0.15)` | 15% accent overlay |

### Taupe Palette (Tables, Segmented Controls)

| Token | Value | Usage |
|-------|-------|-------|
| `--taupe-100` | `#F7F5F0` | Table headers, segmented control bg, hover rows |
| `--taupe-pressed` | `#EDEAE3` | Pressed/active row state |
| `--taupe-border` | `#E3DFD6` | Taupe border accent |
| `--calc-bg` | `#F7F5F0` | Calculator panel bg (same as taupe-100) |

### Categorical Colors (Charts)

| Token | Value | Notes |
|-------|-------|-------|
| `--cat1` / `--cat-1` | `#3A6AF8` | Blue-600 (primary series) |
| `--cat2` / `--cat-2` | `#06B6D4` | Teal |
| `--cat3` / `--cat-3` | `#163196` | Blue-800 (dark blue) |
| `--cat4` / `--cat-4` | `#7aa0f9` | Blue-400 (light blue) |
| `--cat5` / `--cat-5` | `#0F766E` | Dark teal |
| `--cat6` / `--cat-6` | `#CA8A04` | Gold / `#38BDF8` Sky |
| `--cat7` | `#FB923C` | Orange |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--pos` | `#148338` | Positive/success |
| `--neg` | `#c82320` | Negative/error |
| `--warn` | `#c85f1a` | Warning/orange |
| `--pros-accent` | `#148338` | Pros tile accent |
| `--pros-bg` | `rgba(20,131,56,.07)` | Pros tile background |
| `--pros-border` | `rgba(20,131,56,.25)` | Pros tile border |
| `--cons-accent` | `#c82320` | Cons tile accent |
| `--cons-bg` | `rgba(200,35,32,.06)` | Cons tile background |
| `--cons-border` | `rgba(200,35,32,.22)` | Cons tile border |
| `--info-accent` | `#3A6AF8` | Info tile accent (blue-600) |
| `--info-bg` | `rgba(58,106,248,.06)` | Info tile background |
| `--info-border` | `rgba(58,106,248,.24)` | Info tile border |

### Shadows

| Token | Value |
|-------|-------|
| `--tile-shadow` | `0 4px 12px #0000001A` |
| `--panel-shadow-hover` | `0 8px 24px #0000001F` |
| `--modal-shadow` | `0 16px 40px #00000029` |

### Button Tokens

| Token | Value |
|-------|-------|
| `--btnPrimary-bg` | `#3a6af8` |
| `--btnPrimary-hover` | `#2952cc` |
| `--btnPrimary-text` | `#ffffff` |
| `--btnSecondary-bg` | `transparent` |
| `--btnSecondary-border` | `#D5D3D0` |
| `--btnSecondary-hover` | `#F8F7F6` |
| `--btnSecondary-text` | `#0e0e0e` |
| `--btnDestruction-bg` | `#c82320` |
| `--btnDestruction-text` | `#ffffff` |
| `--btnLink-text` | `#3a6af8` |
| `--btnLink-hover` | `#2952cc` |

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-4xs` | `2px` |
| `--space-3xs` | `4px` |
| `--space-2xs` | `6px` |
| `--space-xs` | `8px` |
| `--space-sm` | `12px` |
| `--space-md` | `16px` |
| `--space-lg` | `20px` |
| `--space-xl` | `24px` |
| `--space-2xl` | `32px` |
| `--space-3xl` | `40px` |
| `--space-4xl` | `48px` |
| `--space-5xl` | `64px` |

### Border-Radius Scale

| Token | Value |
|-------|-------|
| `--radius-4xs` | `2px` |
| `--radius-3xs` | `4px` |
| `--radius-2xs` | `6px` |
| `--radius-xs` | `8px` |
| `--radius-sm` | `10px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `20px` |
| `--radius-2xl` | `24px` |
| `--radius-3xl` | `32px` |
| `--radius-full` | `9999px` |

### Typography

| Token | Value |
|-------|-------|
| `--font-ui` | `'Heebo', -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif` |
| `--font-serif` | `'Noto Serif', Georgia, serif` |

---

## 2. Global Typography

| Element | Font | Size | Weight | Color | Line-Height |
|---------|------|------|--------|-------|-------------|
| Body base | `--font-ui` (Heebo) | 16px | 400 | `--ink` (#0e0e0e) | 1.5 |
| h2 (Section Title) | `--font-serif` (Noto Serif) | 20px | 400 | `--ink` | — |
| `.ec-title` (Section Title) | `--font-serif` (Noto Serif) | 20px | 400 | `--ink` | — |
| `.ec-desc` (Body copy / intro paragraphs) | Heebo | 16px | 400 | `#403D3A` (text-body) | 1.5 |
| `.cs-ov-text p, li` (Guidance body) | Heebo | 16px | 400 | `#403D3A` (text-body) | 1.5 |
| Label text (table labels, field labels) | Heebo | 12–14px | 500–600 | `--muted` (#5E5954) | — |

---

## 3. Segmented Control (Navigation Tabs)

### Container (`.sc-tabs`)

| Property | Value |
|----------|-------|
| Display | `flex` with `flex-wrap: wrap` |
| Gap | `var(--space-3xs)` (4px) between items |
| Background | `var(--taupe-100)` (#F7F5F0) |
| Border | `none` |
| Border-radius | `var(--radius-2xl)` (24px) |
| Padding | `var(--space-xs)` (8px) all sides |
| Margin | `var(--space-xl)` top, `var(--space-2xl)` bottom |
| Align-items | `center` |

### Tab Buttons (`.sc-tabs button`)

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Color | `#403D3A` (text-body) |
| Border | `0` |
| Border-radius | `var(--radius-full)` (pill) |
| Padding | `8px 24px` |
| Font-size | `14px` |
| Font-weight | `400` |
| Font-family | `var(--font-ui)` |
| Line-height | `1.43` |
| White-space | `nowrap` |
| Transition | `all 150ms ease` |
| Hover color | `var(--ink)` |

### Active Tab (`.sc-tabs button.on`)

| Property | Value |
|----------|-------|
| Background | `var(--surface-1)` (white) |
| Color | `var(--ink)` |
| Font-weight | `600` |
| Border-radius | `var(--radius-full)` |
| Box-shadow | `0 1px 2px rgba(0,0,0,0.08)` |

---

## 4. Card Container

| Property | Value |
|----------|-------|
| Background | `var(--surface-1)` |
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-xl)` top/sides, `var(--space-3xl)` bottom |
| Box-shadow | `var(--tile-shadow)` |
| Margin-bottom | `var(--space-2xl)` |

---

## 5. Section Headers / Dividers

| Property | Value |
|----------|-------|
| Border-top | `1px solid var(--border-strong)` (#D5D3D0) |
| Padding-top | `var(--space-xl)` (24px) |
| Margin-bottom | `var(--space-xl)` (24px) |
| Chevron | **Hidden** (`display:none`) — sections are always expanded |
| Cursor | Default (no pointer — not clickable) |

---

## 6. Option Tiles (`.sc-plan-card`)

### Container

| Property | Value |
|----------|-------|
| Display | `flex`, `flex-direction: column` |
| Gap | `var(--space-2xs)` (6px) |
| Padding | `var(--space-md)` (16px) |
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-md)` (12px) |
| Background | `var(--surface-1)` (white) |
| Grid | `repeat(auto-fill, minmax(215px, 1fr))` with `var(--space-sm)` gap |
| Transition | `transform .16s ease, box-shadow .16s ease, border-color .16s ease` |

### Hover State

| Property | Value |
|----------|-------|
| Border-color | `#ebf0fe` (blue-100) |
| Transform | `translateY(-2px)` |
| Box-shadow | `0 8px 24px rgba(58,106,248,.12)` |

### Title (`.pc-name`)

| Property | Value |
|----------|-------|
| Font-weight | `600` |
| Font-size | `16px` |
| Color | `#3a6af8` (blue-600) |
| Layout | `flex`, `space-between`, with chevron `::after` |
| Chevron | 7px CSS chevron (border-right + border-top, rotated 45deg) |

### Body Copy (`.pc-line`)

| Property | Value |
|----------|-------|
| Font-size | `13px` |
| Color | `#403D3A` (text-body) |
| Line-height | `1.45` |

---

## 7. Tables (DetailSection Pattern)

### Container Wrapper

| Property | Value |
|----------|-------|
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-xs)` (8px) |
| Overflow | `auto` |
| Background | `var(--surface-1)` |

### Table Base

| Property | Value |
|----------|-------|
| Border-collapse | `separate` |
| Border-spacing | `0` |
| Font-size | `14px` |
| Font-family | `var(--font-ui)` |
| Line-height | `1.43` |
| Width | `100%` |

### Header Row (`thead th`)

| Property | Value |
|----------|-------|
| Background | `var(--taupe-100)` (#F7F5F0) |
| Color | `var(--ink)` (#0e0e0e) |
| Font-weight | `600` |
| Font-size | `14px` |
| Padding | `12px 16px` |
| Border-bottom | `1px solid var(--accent-subtle)` (#ebf0fe — blue-100) |
| Border-radius | `8px 0 0 0` (first), `0 8px 0 0` (last) — top corners only |
| Vertical-align | `middle` |
| No vertical borders | `border-right: none` |

### Data Cells (`td`)

| Property | Value |
|----------|-------|
| Height | `52px` |
| Padding | `16px` |
| Color | `#403D3A` (text-body) |
| Border-bottom | `1px solid var(--border)` |
| No vertical borders | `border-right: none` |
| White-space | `nowrap` |
| Numeric values | `font-variant-numeric: tabular-nums` |

### First Column (Sticky Label)

| Property | Value |
|----------|-------|
| Position | `sticky; left: 0` |
| Font-weight | `600` |
| Color | `var(--ink)` |
| Text-align | `left` |

### Row Hover State

| Property | Value |
|----------|-------|
| Background | `var(--taupe-100)` (#F7F5F0) |
| First cell border-radius | `12px 0 0 12px` |
| Last cell border-radius | `0 12px 12px 0` |
| Transition | `background 150ms ease` |

### Row Pressed/Active State

| Property | Value |
|----------|-------|
| Background | `var(--taupe-pressed)` (#EDEAE3) |
| First cell border-radius | `12px 0 0 12px` |
| Last cell border-radius | `0 12px 12px 0` |

### Links in Tables

| Property | Value |
|----------|-------|
| Color | `var(--accent)` (#3a6af8) |
| Text-decoration | `none` (underline on hover) |

---

## 8. Sort Icons (Table Headers)

### Layout

- **Position:** Inline with header text (not absolute)
- **Margin-left:** `2px` between text and icon
- **Vertical-align:** `middle`
- **Wraps underneath** text when column is narrow

### Default (Unsorted)

| Property | Value |
|----------|-------|
| Icon | Lucide `chevrons-up-down` (both arrows) |
| Size | `16px × 16px` |
| Color | `#0e0e0e` (colors-icons-full) |

### Active (Sorted)

| Property | Value |
|----------|-------|
| Icon | Lucide `chevron-up` (ascending) or `chevron-down` (descending) |
| Size | `16px × 16px` |
| Color | `#3A6AF8` (colors-icons-action / blue-600) |

### SVG Markup

```html
<!-- Unsorted (both directions) -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>

<!-- Ascending -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>

<!-- Descending -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
```

---

## 9. Search Input

### Text Input

| Property | Value |
|----------|-------|
| Background | `var(--surface-1)` |
| Border | `1px solid var(--border-strong)` (#D5D3D0) |
| Border-right | `0` (merged with button) |
| Border-radius | `var(--radius-xs) 0 0 var(--radius-xs)` (8px left corners) |
| Padding | `9px var(--space-sm)` |
| Font-size | `14px` |
| Color | `var(--ink)` |

### Search Button (Magnifying Glass)

| Property | Value |
|----------|-------|
| Width | `42px` |
| Background | `#3A6AF8` (blue-600) |
| Border | `1px solid #3A6AF8` |
| Border-radius | `0 var(--radius-xs) var(--radius-xs) 0` (8px right corners) |
| Icon color | `var(--inverse)` (white) |
| Icon | Lucide `search` (18px) |

---

## 10. Blue Label Chips (`.quick-calc-note`)

| Property | Value |
|----------|-------|
| Background | `#3A6AF8` (blue-600) |
| Color | `#ffffff` (white) |
| Font-size | `11px` |
| Font-weight | `600` |
| Text-transform | `uppercase` |
| Letter-spacing | `.03em` |
| Border-radius | `4px` |
| Padding | `3px 10px` |
| Display | `inline-flex` |

---

## 11. Pros/Cons/Info Tiles (`.ec-box`)

### Common Structure

- Left accent strip: `6px` wide, absolutely positioned, full height
- Left corners squared (0 radius), right corners `var(--radius-xs)` (8px)
- Padding-left: `28px` (clears the strip)
- Title (h4): `13px`, `uppercase`, `letter-spacing: .05em`, `600` weight

### Pros (`.ec-box.pros`)

| Property | Value |
|----------|-------|
| Background | `linear-gradient(90deg, var(--pros-bg), #ffffff)` |
| Border-color | `var(--pros-border)` |
| Title color | `var(--pros-accent)` (#148338) |
| Accent strip | `var(--pros-accent)` |

### Cons (`.ec-box.cons`)

| Property | Value |
|----------|-------|
| Background | `linear-gradient(90deg, var(--cons-bg), #ffffff)` |
| Border-color | `var(--cons-border)` |
| Title color | `var(--cons-accent)` (#c82320) |
| Accent strip | `var(--cons-accent)` |

### Info (`.ec-box.info`)

| Property | Value |
|----------|-------|
| Background | `linear-gradient(90deg, var(--info-bg), #ffffff)` |
| Border-color | `var(--info-border)` |
| Title color | `var(--info-accent)` (#3A6AF8) |
| Accent strip | `var(--info-accent)` |

---

## 12. Chart Toolbar Buttons

### Default (`.tmpl-toolbar button`)

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Color | `var(--btnLink-text)` (#3a6af8) |
| Border | `1px solid var(--btnLink-text)` |
| Border-radius | `var(--radius-full)` (pill) |
| Padding | `var(--space-2xs) var(--space-sm)` (6px 12px) |
| Font-size | `13px` |

### Active (`.tmpl-toolbar button.on`)

| Property | Value |
|----------|-------|
| Background | `var(--btnPrimary-bg)` (#3a6af8) |
| Color | `var(--btnPrimary-text)` (white) |
| Border-color | `var(--btnPrimary-bg)` |

---

## 13. Routing Chips (`.sc-chip`)

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Border | `1px solid var(--btnLink-text)` |
| Color | `var(--btnLink-text)` (#3a6af8) |
| Border-radius | `var(--radius-full)` (pill) |
| Padding | `var(--space-3xs) var(--space-sm)` (4px 12px) |
| Font-size | `12.5px` |
| Hover bg | `var(--accent-subtle)` |

---

## 14. Calculator Panel

| Property | Value |
|----------|-------|
| Background | `var(--calc-bg)` (#F7F5F0) |
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-md)` (12px) |
| Padding | `var(--space-lg)` (20px) |
| Field labels | 12px, 500 weight, `var(--muted)` |
| Input height | `36px` |
| Input border | `1px solid var(--border)`, radius `var(--radius-xs)` |
| Input font | `14px`, `var(--font-ui)` |

### KPI Cards (`.cs-kpi`)

| Property | Value |
|----------|-------|
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-sm)` (10px) |
| Padding | `14px var(--space-md)` |
| Label | 12px, `var(--muted)` |
| Value | 22px, 600 weight, `var(--ink)`, `tabular-nums` |

---

## 15. Video Thumbnails

| Property | Value |
|----------|-------|
| Aspect-ratio | `16/9` |
| Border-radius | `var(--radius-sm)` (10px) |
| Gradient overlay | left-to-right dark fade for text readability |
| Title | White, 17px (full), 11px (small), 700 weight |
| Play icon | Circle + triangle SVG, white |

### Small (`.vthumb-sm`)

| Property | Value |
|----------|-------|
| Width | `200px` |
| Max-width | `40%` |
| Float | `right` |
| Margin | `2px 0 12px 20px` |

---

## 16. Video Modal

| Property | Value |
|----------|-------|
| Background | `var(--surface-1)` |
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-md)` |
| Box-shadow | `var(--modal-shadow)` |
| Width | `560px`, `max-width: 100%` |
| Backdrop | `var(--backdrop)` (rgba(45,41,38,0.34)) |

---

## 17. Disclaimer/Footer

| Property | Value |
|----------|-------|
| Border-top | `1px solid var(--border-strong)` |
| Margin-top | `var(--space-lg)` |
| Padding-top | `var(--space-md)` |
| Font-size | `12px` |
| Line-height | `1.6` |
| Color | `var(--faint)` (#8A8680) |

---

## 18. Theme/Language Toggle (`.tmpl-seg`)

| Property | Value |
|----------|-------|
| Display | `inline-flex` |
| Gap | `var(--space-3xs)` (4px) |
| Padding | `var(--space-3xs)` (4px) |
| Background | `var(--surface-2)` |
| Border | `1px solid var(--border)` |
| Border-radius | `var(--radius-sm)` (10px) |
| Button font | 14px, 500 weight |
| Button padding | `var(--space-2xs) var(--space-md)` (6px 16px) |
| Active button | white bg, `var(--ink)` color, 600 weight, subtle shadow |

---

## 19. Responsive Behavior

### Gutter Tiers (by component width via JS)

| Tier | Width | Padding |
|------|-------|---------|
| xs | < 600px | 24px |
| md | 600–1099px | 36px |
| lg | ≥ 1100px | 56px; content capped at 1100px, centered |

### Mobile Overrides (`#appMain.main-narrow`)

- Segmented control buttons: `min-height: 44px` (touch targets)
- Intro video moves below paragraph, stacks vertically
- Category grid collapses to single column at < 599px
- Step rows collapse to single column

---

## 20. Icon Conventions

| Context | Color | Size |
|---------|-------|------|
| Default icons | `#0e0e0e` (colors-icons-full) | 16px |
| Interactive/action icons | `#3A6AF8` (colors-icons-action) | 16px |
| Muted icons | `#5E5954` (colors-icons-meta) | varies |
| Disabled icons | `#B5B1AB` (colors-icons-muted) | varies |
| Icons on dark bg | `#FFFFFF` (colors-icons-reverse) | varies |
| Icon library | **Lucide** | — |

---

## 21. Key Color Mappings Summary

| Role | Hex | Token |
|------|-----|-------|
| Primary text | `#0e0e0e` | `--ink` |
| Body text | `#403D3A` | text-body |
| Secondary text | `#5E5954` | `--muted` |
| Caption text | `#8A8680` | `--faint` |
| Primary accent | `#3A6AF8` | blue-600 / `--accent` |
| Accent hover | `#2952CC` | blue-700 |
| Dark accent | `#163196` | blue-800 |
| Accent tint/bg | `#ebf0fe` | blue-100 / `--accent-subtle` |
| Table header bg | `#F7F5F0` | `--taupe-100` |
| Row hover bg | `#F7F5F0` | `--taupe-100` |
| Row pressed bg | `#EDEAE3` | `--taupe-pressed` |
| Default border | `#EEEDEB` | `--border` |
| Strong border | `#D5D3D0` | `--border-strong` |
| Success | `#148338` | `--pos` |
| Error | `#c82320` | `--neg` |

---

## 22. What NOT to Do

- **No purple.** All accent/categorical colors use the blue palette from Hemlock.
- **No `var(--ink)` for body copy.** Body paragraphs use `#403D3A` (text-body), not `#0e0e0e`.
- **No vertical table borders.** Only bottom borders on rows.
- **No accordion chevrons.** Sections are always expanded, no collapse functionality.
- **No hardcoded gray sort arrows.** Use Lucide SVG icons with `currentColor`.
- **No `position:absolute` on sort icons.** They flow inline with header text.
- **No Inter font.** Always use Heebo (primary) or Noto Serif (section headings only).
