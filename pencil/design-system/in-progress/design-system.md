# Evergreen Design System — Hemlock

> **Version:** 2.0.0
> **Last updated:** 2026-07-06
> **Visual canvas:** `hemlock-library.lib.pen`
> **Audience:** Freya (front-end engineering agent), gen-UI renderer, human designers/developers
> **Scope:** Everything — tokens, accessibility, primitives, shell chrome, gen-UI components, charts, dashboard widgets, edge states

---

## How to read this file

This is the **single source of truth** for the Evergreen design system as implemented in `hemlock-library.lib.pen`. Both must stay in sync.

**For Freya / gen-UI renderer:**
- Every component uses a consistent pattern: **Name · Variants · States · Tokens · Keyboard/ARIA · Gen-UI invocation**
- Token references use `$` prefix (e.g., `$color-blue-600`). In code, map to CSS custom properties or your framework's token system.
- Components marked `[PLANNED]` are specced but not yet in `.lib.pen`. Build to spec; canvas will follow.

**For gen-UI (AI output):**
- Section 13 defines the JSON invocation schema. When generating a component, emit that JSON shape.
- Prefer existing components over inventing new ones. Check section 04 (component selection rules) first.
- All gen-UI output renders in mainPanel. Chat messages render in chatPanel (shell chrome).

**Status legend:**
- `[SHIPPED]` — In `hemlock-library.lib.pen` and ready for implementation
- `[PLANNED]` — Specced here, not yet in `.lib.pen`
- `[FUTURE]` — Noted for completeness, not yet specced

---

## Table of Contents

- **00** How to read this file (above)
- **01** Design tokens
- **02** Typography system
- **03** Accessibility contract
- **04** Composition & layout rules
- **05** App layout: newNav · mainPanel · chatPanel
- **06** UI primitives
- **07** Cards & controls
- **08** Financial components
- **09** Charts & data visualization
- **10** Gen-UI affordances
- **11** Dashboard & widgets
- **12** Edge cases & states
- **13** Gen-UI invocation schema

---

## 01 · Design Tokens

### Color Primitives

Foundation variables in `hemlock-library.lib.pen`.

| Token | Value | Usage |
|---|---|---|
| `color-base-white` | `#ffffff` | Absolute white |
| `color-base-black` | `#000000` | Absolute black |

#### Gray ramp (warm neutrals)

| Token | Value | Usage |
|---|---|---|
| `color-gray-50` | `#F8F7F6` | Lightest bg |
| `color-gray-100` | `#EEEDEB` | Subtle bg, borders |
| `color-gray-200` | `#D5D3D0` | Borders, dividers |
| `color-gray-300` | `#B5B1AB` | Disabled, placeholders |
| `color-gray-400` | `#8A8680` | Muted UI, icons |
| `color-gray-500` | `#716E6A` | Tertiary text |
| `color-gray-600` | `#5E5954` | Secondary text |
| `color-gray-700` | `#403D3A` | Body text |
| `color-gray-800` | `#2D2926` | Emphasis |
| `color-gray-900` | `#0e0e0e` | Headers, primary text |

#### Taupe ramp (brand warm neutrals)

| Token | Value | Usage |
|---|---|---|
| `color-taupe-100` | `#F7F5F0` | Nav/chat background |
| `color-taupe-200` | `#EDEAE3` | Hover states, dividers |
| `color-taupe-300` | `#E3DFD6` | Active states, borders |
| `color-taupe-400` | `#BCB49E` | Muted accents |
| `color-taupe-500` | `#9D937B` | Tertiary elements |
| `color-taupe-600` | `#877F68` | Secondary elements |
| `color-taupe-700` | `#6C6451` | Emphasis |
| `color-taupe-800` | `#4B4435` | Strong |
| `color-taupe-900` | `#322C20` | Maximum contrast |

#### Blue ramp (accent)

| Token | Value | Usage |
|---|---|---|
| `color-blue-100` | `#ebf0fe` | Selected backgrounds |
| `color-blue-200` | `#c8d6fd` | Light highlights |
| `color-blue-300` | `#a5bcfc` | Lighter blue |
| `color-blue-400` | `#7094fb` | Medium accent |
| `color-blue-500` | `#5a82f9` | Medium-strong |
| `color-blue-600` | `#3a6af8` | Primary accent |
| `color-blue-700` | `#2952cc` | Hover |
| `color-blue-800` | `#163196` | Dark blue surfaces |
| `color-blue-900` | `#031e64` | Deepest accent |

#### Red ramp (error / expense)

| Token | Value | Usage |
|---|---|---|
| `color-red-50` | `#ffeaea` | Error/expense bg |
| `color-red-100` | `#fed5d4` | Light error bg |
| `color-red-200` | `#fdaba9` | Light error |
| `color-red-300` | `#fc807e` | Medium error |
| `color-red-400` | `#fb5653` | Error/expense text |
| `color-red-500` | `#fa2c28` | Strong error |
| `color-red-600` | `#c82320` | Error borders, destructive |
| `color-red-700` | `#961a18` | Dark error |
| `color-red-800` | `#641210` | Error text on light bg |
| `color-red-900` | `#320908` | Deepest error |

#### Green ramp (success / income / deposit)

| Token | Value | Usage |
|---|---|---|
| `color-green-50` | `#e9fff0` | Success/income bg |
| `color-green-100` | `#a9fdc4` | Light success |
| `color-green-200` | `#68fc97` | Medium-light success |
| `color-green-300` | `#27fb6b` | Medium success |
| `color-green-400` | `#1ebf51` | Success accent |
| `color-green-500` | `#148338` | Income/deposit text |
| `color-green-600` | `#10642b` | Dark success |
| `color-green-700` | `#0b461e` | Darker success |
| `color-green-800` | `#062811` | Deep success |
| `color-green-900` | `#020a04` | Deepest success |

#### Orange ramp (warning / debt)

| Token | Value | Usage |
|---|---|---|
| `color-orange-50` | `#fff1e9` | Warning/debt bg |
| `color-orange-100` | `#fee4d2` | Light warning |
| `color-orange-200` | `#fdc9a6` | Medium-light warning |
| `color-orange-300` | `#fcad79` | Medium warning |
| `color-orange-400` | `#fb924d` | Warning accent |
| `color-orange-500` | `#fa7720` | Strong warning |
| `color-orange-600` | `#c85f1a` | Dark warning |
| `color-orange-700` | `#964713` | Darker warning |
| `color-orange-800` | `#64300d` | Deep warning |
| `color-orange-900` | `#321806` | Deepest warning |

#### Sky ramp (savings / info)

| Token | Value | Usage |
|---|---|---|
| `color-sky-50` | `#ebf6ff` | Savings/info bg |
| `color-sky-100` | `#aedcfe` | Light info |
| `color-sky-200` | `#72c2fe` | Medium-light info |
| `color-sky-300` | `#35a8fd` | Medium info |
| `color-sky-400` | `#2e90da` | Info accent |
| `color-sky-500` | `#2679b6` | Savings text |
| `color-sky-600` | `#1f6193` | Dark info |
| `color-sky-700` | `#174a6f` | Darker info |
| `color-sky-800` | `#10324c` | Deep info |
| `color-sky-900` | `#081b28` | Deepest info |

### Semantic Colors

#### Background & surface

| Token | Resolves to | Usage |
|---|---|---|
| `colors-background-surface` | `$color-base-white` | Main surface / card bg |
| `colors-background-main` | `$color-taupe-100` | Page canvas, nav/chat bg |
| `colors-background-light` | `$color-gray-50` | Subtle section bg |

#### Borders

| Token | Resolves to | Usage |
|---|---|---|
| `colors-borders-light` | `$color-gray-100` | Default borders |
| `colors-borders-dark` | `$color-gray-200` | Emphasized borders |
| `colors-borders-error` | `$color-red-600` | Error state borders |
| `colors-borders-focus` | `$color-gray-900` | Focus ring (dark) |
| `colors-borders-focus-inverted` | `$color-base-white` | Focus ring on dark bg |

#### Text

| Token | Resolves to | Usage |
|---|---|---|
| `colors-text-header` | `$color-gray-900` | Headings, primary |
| `colors-text-body` | `$color-gray-700` | Body text |
| `colors-text-meta` | `$color-gray-600` | Secondary / helper |
| `colors-text-placeholder` | `$color-gray-300` | Placeholder text |
| `colors-text-disabled` | `$color-gray-300` | Disabled text |
| `colors-text-action` | `$color-blue-600` | Links, action text |
| `colors-text-error` | `$color-red-600` | Error messages |
| `colors-text-body-error` | `$color-red-800` | Error body text |
| `colors-text-deposit` | `$color-green-500` | Income / deposit values |
| `colors-text-reverse` | `$color-base-white` | Text on dark surfaces |

#### Icons

| Token | Resolves to | Usage |
|---|---|---|
| `colors-icons-full` | `$color-gray-900` | Primary icons |
| `colors-icons-meta` | `$color-gray-600` | Secondary icons |
| `colors-icons-muted` | `$color-gray-300` | Disabled icons |
| `colors-icons-action` | `$color-blue-600` | Interactive icons |
| `colors-icons-error` | `$color-red-600` | Error icons |
| `colors-icons-reverse` | `$color-base-white` | Icons on dark bg |

#### Button — Primary

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnPrimaryBg` | `$color-gray-900` | Default fill |
| `colors-btnPrimaryBgHover` | `$color-gray-800` | Hover fill |
| `colors-btnPrimaryBgActive` | `$color-gray-700` | Pressed fill |
| `colors-btnPrimaryBgDisabled` | `$color-gray-200` | Disabled fill |
| `colors-btnPrimaryText` | `$color-gray-100` | Default text |
| `colors-btnPrimaryTextHover` | `$color-base-white` | Hover text |
| `colors-btnPrimaryTextActive` | `$color-base-white` | Pressed text |
| `colors-btnPrimaryTextDisabled` | `$color-gray-400` | Disabled text |

#### Button — Primary Inverted

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnPrimaryInvertedBg` | `$color-gray-50` | Default fill |
| `colors-btnPrimaryInvertedBgHover` | `$color-base-white` | Hover fill |
| `colors-btnPrimaryInvertedBgActive` | `$color-gray-100` | Pressed fill |
| `colors-btnPrimaryInvertedBgDisabled` | `$color-gray-50` | Disabled fill |
| `colors-btnPrimaryInvertedText` | `$color-gray-700` | Default text |
| `colors-btnPrimaryInvertedTextHover` | `$color-gray-900` | Hover text |
| `colors-btnPrimaryInvertedTextActive` | `$color-gray-700` | Pressed text |
| `colors-btnPrimaryInvertedTextDisabled` | `$color-gray-300` | Disabled text |

#### Button — Secondary

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnSecondaryBg` | `#00000000` | Transparent fill |
| `colors-btnSecondaryBgHover` | `#00000000` | Hover fill |
| `colors-btnSecondaryBgActive` | `$color-gray-100` | Pressed fill |
| `colors-btnSecondaryBgDisabled` | `#00000000` | Disabled fill |
| `colors-btnSecondaryBorder` | `$color-gray-200` | Default border |
| `colors-btnSecondaryBorderHover` | `$color-gray-600` | Hover border |
| `colors-btnSecondaryBorderActive` | `$color-gray-100` | Pressed border |
| `colors-btnSecondaryBorderDisabled` | `$color-gray-200` | Disabled border |
| `colors-btnSecondaryText` | `$color-gray-800` | Default text |
| `colors-btnSecondaryTextHover` | `$color-gray-800` | Hover text |
| `colors-btnSecondaryTextActive` | `$color-gray-700` | Pressed text |
| `colors-btnSecondaryTextDisabled` | `$color-gray-400` | Disabled text |

#### Button — Secondary Inverted

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnSecondaryInvertedBg` | `#00000000` | Transparent fill |
| `colors-btnSecondaryInvertedBgHover` | `#ffffff1a` | Hover fill (white 10%) |
| `colors-btnSecondaryInvertedBgActive` | `#ffffff1a` | Pressed fill |
| `colors-btnSecondaryInvertedBgDisabled` | `#00000000` | Disabled fill |
| `colors-btnSecondaryInvertedBorder` | `$color-gray-200` | Default border |
| `colors-btnSecondaryInvertedBorderHover` | `$color-base-white` | Hover border |
| `colors-btnSecondaryInvertedBorderActive` | `#00000000` | Pressed border |
| `colors-btnSecondaryInvertedBorderDisabled` | `$color-gray-300` | Disabled border |
| `colors-btnSecondaryInvertedText` | `$color-base-white` | Default text |
| `colors-btnSecondaryInvertedTextHover` | `$color-base-white` | Hover text |
| `colors-btnSecondaryInvertedTextActive` | `$color-gray-200` | Pressed text |
| `colors-btnSecondaryInvertedTextDisabled` | `$color-gray-300` | Disabled text |

#### Button — Destructive

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnDestructionBg` | `$color-red-600` | Default fill |
| `colors-btnDestructionBgHover` | `$color-red-500` | Hover fill |
| `colors-btnDestructionBgActive` | `$color-red-700` | Pressed fill |
| `colors-btnDestructionBgDisabled` | `$color-gray-200` | Disabled fill |
| `colors-btnDestructionText` | `$color-gray-100` | Default text |
| `colors-btnDestructionTextHover` | `$color-base-white` | Hover text |
| `colors-btnDestructionTextActive` | `$color-base-white` | Pressed text |
| `colors-btnDestructionTextDisabled` | `$color-gray-600` | Disabled text |

#### Button — Link

| Token | Resolves to | Usage |
|---|---|---|
| `colors-btnLinkText` | `$color-blue-600` | Default text |
| `colors-btnLinkTextHover` | `$color-blue-700` | Hover text |
| `colors-btnLinkTextActive` | `$color-sky-500` | Active text |
| `colors-btnLinkTextPressed` | `$color-blue-800` | Pressed text |
| `colors-btnLinkTextDisabled` | `$color-gray-300` | Disabled text |

#### Navigation

| Token | Resolves to | Usage |
|---|---|---|
| `colors-navBg` | `$color-taupe-100` | Nav panel bg |
| `colors-navBorder` | `$color-taupe-300` | Nav border |
| `colors-navDivider` | `$color-taupe-200` | Nav section divider |
| `colors-navHoverBg` | `$color-taupe-200` | Item hover bg |
| `colors-navHoverText` | `$color-gray-800` | Item hover text |
| `colors-navActiveBg` | `$color-taupe-300` | Active item bg |
| `colors-navPressedBg` | `$color-taupe-300` | Pressed item bg |
| `colors-navIcon` | `$color-gray-400` | Nav icons |
| `colors-navTextPrimary` | `$color-gray-800` | Primary nav text |
| `colors-navTextSecondary` | `$color-gray-600` | Secondary nav text |
| `colors-navTextDisabled` | `$color-gray-300` | Disabled nav text |
| `colors-navShadow` | `#2D292628` | Nav shadow |

#### Chat

| Token | Resolves to | Usage |
|---|---|---|
| `colors-chatBg` | `$color-taupe-100` | Chat panel bg |
| `colors-chatBorder` | `$color-taupe-300` | Chat panel border |
| `colors-chatDivider` | `$color-taupe-200` | Message divider |
| `colors-chatBubbleUser` | `$color-taupe-100` | User message bg |
| `colors-chatInputBg` | `$color-base-white` | Input field bg |
| `colors-chatPlaceholder` | `$color-gray-400` | Input placeholder |
| `colors-chatTextPrimary` | `$color-gray-800` | Primary chat text |
| `colors-chatTextSecondary` | `$color-gray-600` | Secondary chat text |
| `colors-chatSendBg` | `$color-gray-800` | Send button bg |
| `colors-chatChipHover` | `$color-taupe-200` | Chip hover bg |
| `colors-chatChipPressed` | `$color-taupe-300` | Chip pressed bg |
| `colors-chatShadow` | `#2D292628` | Chat shadow |
| `colors-chatVoiceActiveBg` | `$color-blue-600` | Voice active bg |
| `colors-chatVoiceActiveIcon` | `$color-base-white` | Voice active icon |
| `colors-chatVoicePulse` | `$color-blue-100` | Voice pulse ring |
| `colors-chatVoiceWaveform` | `$color-blue-400` | Waveform color |
| `colors-chatVoiceTimer` | `$color-gray-600` | Timer text |

### Chart Palettes

#### Categorical (15 series, priority-ordered)

| Token | Value | Priority |
|---|---|---|
| `chart-categorical/color-01` | `#8951F0` | 1st |
| `chart-categorical/color-02` | `#06B6D4` | 2nd |
| `chart-categorical/color-03` | `#312E81` | 3rd |
| `chart-categorical/color-04` | `#3B82F6` | 4th |
| `chart-categorical/color-05` | `#0F766E` | 5th |
| `chart-categorical/color-06` | `#38BDF8` | 6th |
| `chart-categorical/color-07` | `#2DD4BF` | 7th |
| `chart-categorical/color-08` | `#A78BFA` | 8th |
| `chart-categorical/color-09` | `#C026D3` | 9th |
| `chart-categorical/color-10` | `#E73CAE` | 10th |
| `chart-categorical/color-11` | `#E879A8` | 11th |
| `chart-categorical/color-12` | `#92400E` | 12th |
| `chart-categorical/color-13` | `#FB923C` | 13th |
| `chart-categorical/color-14` | `#CA8A04` | 14th |
| `chart-categorical/color-15` | `#FACC15` | 15th |

Always assign in priority order.

#### Sequential ramp (single-hue blue)

| Token | Resolves to | Usage |
|---|---|---|
| `chart-sequential/seq-100` | `$color-blue-100` | Lightest fill |
| `chart-sequential/seq-200` | `$color-blue-200` | Light fill |
| `chart-sequential/seq-300` | `$color-blue-300` | Medium-light |
| `chart-sequential/seq-400` | `$color-blue-400` | Medium |
| `chart-sequential/seq-500` | `$color-blue-500` | Medium-strong |
| `chart-sequential/seq-600` | `$color-blue-600` | Strong |
| `chart-sequential/seq-700` | `$color-blue-700` | Darkest fill |

### Spacing

| Token | Value | Usage |
|---|---|---|
| `spacing-4xs` | `2px` | Hairline gaps |
| `spacing-3xs` | `4px` | Tight internal gaps |
| `spacing-2xs` | `8px` | Icon-to-label, checkbox gap |
| `spacing-xs` | `12px` | Input padding, cell padding |
| `spacing-sm` | `16px` | Card padding, compact gaps |
| `spacing-md` | `24px` | Component spacing, section gaps |
| `spacing-lg` | `32px` | Section dividers |
| `spacing-xl` | `40px` | Major section gaps |
| `spacing-2xl` | `48px` | Page-level spacing |
| `spacing-3xl` | `64px` | Large page gaps |
| `spacing-4xl` | `72px` | Major layout gaps |
| `spacing-5xl` | `128px` | Maximum spacing |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | `0px` | Table cells, chart areas |
| `radius-4xs` | `2px` | Hairline rounding |
| `radius-3xs` | `4px` | Tags, small badges |
| `radius-2xs` | `8px` | Inputs, buttons, chips |
| `radius-xs` | `12px` | Cards, dropdowns |
| `radius-sm` | `16px` | Panels, modals |
| `radius-md` | `24px` | Large containers |
| `radius-lg` | `32px` | Extra-large containers |
| `radius-xl` | `40px` | Rounded panels |
| `radius-2xl` | `48px` | Large rounded surfaces |
| `radius-3xl` | `64px` | Hero elements |
| `radius-4xl` | `72px` | Feature elements |
| `radius-5xl` | `128px` | Maximum rounding |
| `radius-full` | `9999px` | Pills, circles, toggle thumbs |

### Elevation / Shadows

Each shadow is defined by three sub-tokens (y-offset, blur, color):

| Shadow | Y-offset | Blur | Color | Usage |
|---|---|---|---|---|
| `shadow-sm` | `1px` | `2px` | `#00000014` (8%) | Subtle elevation |
| `shadow-md` | `4px` | `12px` | `#0000001A` (10%) | Cards, dropdowns |
| `shadow-lg` | `8px` | `24px` | `#0000001F` (12%) | Modals, popovers |
| `shadow-overlay` | `16px` | `40px` | `#00000029` (16%) | Full overlays |

### Motion / Easing

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | `150ms` | Hover, toggles |
| `duration-base` | `200ms` | Dropdowns, tooltips |
| `duration-slow` | `300ms` | Modals, chart transitions |
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default transitions |
| `easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |

### Z-Index

| Token | Value | Usage |
|---|---|---|
| `z-base` | `0` | Default stacking |
| `z-dropdown` | `100` | Dropdown menus |
| `z-popover` | `200` | Popovers, tooltips |
| `z-sticky` | `300` | Sticky headers |
| `z-overlay` | `400` | Backdrop overlays |
| `z-modal` | `500` | Modal dialogs |
| `z-toast` | `600` | Toast notifications |
| `z-tooltip` | `700` | Tooltips (topmost) |

---

## 02 · Typography System

### Font Families

| Token | Value | Usage |
|---|---|---|
| `font-family-primary` | Heebo | UI font — body, numbers, labels, all UI text |
| `font-family-secondary` | Noto Serif | Headings, editorial content |

### Type Scale

The typography system uses a `typo-{family}-{size}-{weight}` naming convention. Each token set includes `font-family`, `font-size`, `font-weight`, `letter-spacing`, and `line-height`.

| Size token | Font size | Line height | Usage |
|---|---|---|---|
| `2xs` | `11px` | `14px` | Fine print, chart ticks |
| `xs` | `12px` | `16px` | Axis labels, helper text |
| `sm` | `14px` | `20px` | Table cells, captions, meta |
| `base` | `16px` | `24px` | Body text (default) |
| `md` | `18px` | `28px` | Section subtitles |
| `lg` | `20px` | `28px` | Section titles, card headers |
| `xl` | `24px` | `32px` | Page titles |
| `2xl` | `30px` | `36px` | Large headings |
| `3xl` | `36px` | `40px` | Hero headings |
| `4xl` | `48px` | `52px` | Hero numbers, KPIs |
| `5xl` | `56px` | `64px` | Display text |
| `6xl` | `64px` | `72px` | Large display |
| `7xl` | `80px` | `84px` | Hero |
| `8xl` | `96px` | `96px` | Maximum display |

### Font Weights

| Weight token | Value | Usage |
|---|---|---|
| `light` | `300` | Large display text only |
| `regular` | `400` | Body, labels |
| `semibold` | `600` | Section headers, emphasis |
| `bold` | `700` | Table headers, KPI values |

### Token naming pattern

Full token example: `typo-primary-sm-semibold-font-size` → `14`

Pattern: `typo-{primary|secondary}-{size}-{weight}-{property}`

Available properties: `font-family`, `font-size`, `font-weight`, `letter-spacing`, `line-height`

Link variants append `-link` before the property: `typo-primary-sm-semibold-link-font-weight`

### Typography Rules

1. **Heebo for all UI and numbers.** Noto Serif for headings/editorial only.
2. **Tabular-nums** (`font-variant-numeric: tabular-nums`) on all right-aligned numeric columns.
3. **Line height:** follows the scale (e.g., base = 24px for 16px text).
4. **Financial values** minimum `sm` (14px) — never smaller.
5. **Letter spacing:** all tokens define `0` letter-spacing. Apply tight (-0.01em) only for large display headings in code.

---

## 03 · Accessibility Contract

**Standard:** WCAG 2.1 AA minimum, AAA aspirational.

### Contrast

| Element | Min ratio |
|---|---|
| Body text | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| UI components, borders, non-text icons | 3:1 |

### Color is never the only indicator

- **Trend:** color + arrow icon (up/down/minus) + text label ("+2.4%")
- **Budget progress:** color fill + percentage text
- **Charts:** legend + pattern/shape, not color alone
- **Negative numbers:** color + minus sign + optional parentheses

### Touch / click targets

| Element | Min |
|---|---|
| Buttons, icon buttons | 44×44px tap target (icon can be smaller) |
| List items | 44px height (whole row is target) |
| Filter chips | 32px height with adequate padding |
| Checkboxes / toggles / slider thumbs | 44×44px tap target |

Gaps: 8px min between adjacent interactive elements; 12px+ between destructive and safe actions.

### Screen reader patterns

| Visual | Announcement |
|---|---|
| +2.4% | "increased by two point four percent" |
| -$1,247.80 | "decreased by one thousand two hundred forty-seven dollars and eighty cents" |
| 84% (budget) | "eighty-four percent of budget used" |
| Green up arrow | "trending up" (via aria-label) |

### Focus

- Visible ring on every interactive element: `$colors-borders-focus` (dark) or `$colors-borders-focus-inverted` (on dark bg), ≥2px, 3:1 contrast
- Order: newNav → mainPanel header → KPI row (L→R) → main content (top→bottom, L→R) → chatPanel

### Motion

- All animations respect `prefers-reduced-motion: reduce` → instant transitions, no shimmer
- Use `$duration-*` and `$easing-*` tokens so motion can be globally disabled
- Never use motion as the only way to convey information

---

## 04 · Composition & Layout Rules

### Component Selection (data → component)

#### Single value

| Data | Component |
|---|---|
| Currency with trend | `KpiCard` (positive variant) or `KpiCard/negative` |
| Currency with sparkline | `KpiCard/with-sparkline` |
| Currency neutral | `KpiCard/neutral` |
| Percentage with direction | `KpiCard` + `DataValueIndicator` |

#### Comparisons

| Scenario | Component | Rule |
|---|---|---|
| Two time periods | Comparison metrics row | Label both periods |
| Before/after | Delta badge with direction | `DataValueIndicator` |
| Budget vs actual | Budget category row | Progress bar required |
| Multi-metric side-by-side | KpiCard row (3–4) | Horizontal, `fill_container` |

#### Lists & tables

| Data | Component |
|---|---|
| Recent transactions | `TransactionRow` / `TransactionTable` |
| Holdings / positions | `HoldingsRow` / `HoldingsTable` |
| Account list | `AccountRow` / `AccountRowGroup` |
| Detail information | `DetailRow` / `DetailSection` |
| Generic list items | `ListRow` variants |

#### Charts (data shape → chart type)

| Shape | Component |
|---|---|
| Part-of-whole | `DonutChart` |
| Time series (1 metric) | `AreaChart` |
| Time series (multi) | `AreaChartMultiSeries` |
| Categorical comparison | `BarChart` |
| Flow / movement | `SankeyDiagram` |
| Projection / forecast | `ProjectedVsActualChart` |
| Threshold / gauge | `GaugeChart` |
| Hierarchical | `TreemapChart` |
| Market data | `CandlestickChart` |
| Waterfall / attribution | `WaterfallChart` |
| Heat intensity | `HeatmapChart` |
| Benchmark comparison | `BenchmarkComparisonChart` |
| Timeline navigation | `TimelineScrubberChart` |
| Two-axis correlation | `DualAxisChart` |
| Inline trend | `Sparkline` |

### Dashboard composition rules

- **KPI row:** always 3 or 4 cards (never 1, 2, or 5+). Primary metric first. `fill_container` width.
- **Transaction list:** preceded by filter row. Group by date. Max 20 visible → pagination. Pending at top.
- **Dashboard grid:** 2-column fixed grid. Widgets are card-sized views. See §11.

### Content voice

- **Tone:** Calm, precise, empowering. Never panicky, vague, patronizing, or salesy.
- **Insight pattern:** Observation + comparison + driver
- **Recommendation pattern:** Action + quantified impact + reasoning
- **Error pattern:** What happened + reassurance + action
- **Numbers:** Always exact values, always with baseline, period, and source. Never approximate actuals.
- **Disclaimer (required on all projections):** "This is not financial advice. Projections are estimates based on historical data and may not reflect future results."

---

## 05 · App Layout: newNav · mainPanel · chatPanel

### Three-panel architecture

```
┌──────────┬─────────────────────────────────────┬───────────────┐
│  newNav  │            mainPanel                │  chatPanel    │
│  (left)  │         (content area)              │   (right)     │
│          │                                     │               │
│  ↔       │  Gen-UI renders here:               │  ↔            │
│  collaps │  · dashboards, charts, tables       │  collapsible  │
│  ible    │  · scenario tools                   │               │
│          │  · any AI-generated financial tool   │  Persistent   │
│  Nav     │                                     │  chat with    │
│  links,  │  Mode 1: Single view                │  the AI       │
│  acct    │  Mode 2: Dashboard (widget grid)    │               │
│  switch  │                                     │  Input, msgs, │
│          │                                     │  history      │
└──────────┴─────────────────────────────────────┴───────────────┘
```

### Layout tokens

- Nav background: `$colors-navBg` (`$color-taupe-100`)
- Nav border: `$colors-navBorder` (`$color-taupe-300`)
- Chat background: `$colors-chatBg` (`$color-taupe-100`)
- Chat border: `$colors-chatBorder` (`$color-taupe-300`)
- Main surface: `$colors-background-surface` (`$color-base-white`)

### Layout behavior

| Behavior | Rule |
|---|---|
| **Collapse** | When chatPanel or newNav collapses, mainPanel expands to fill. |
| **Rendering split** | chatPanel = conversation (input surface). mainPanel = gen-UI output (output surface). |
| **Single view** | mainPanel always shows one view at a time. No tabs. |
| **Dashboard mode** | Dashboard is a special mainPanel view with a 2-column widget grid. See §11. |

### Shell chrome components `[SHIPPED]`

| Component | Location | Role |
|---|---|---|
| `AccountSelector/closed` | Nav panel | Account switcher (collapsed) |
| `AccountSelector/open` | Nav panel | Account switcher (expanded with list) |
| `AccountSelector/open-hover` | Nav panel | Account switcher item hover |

---

## 06 · UI Primitives `[SHIPPED]`

### Buttons

| Variant | Fill | Text | Border |
|---|---|---|---|
| `Button` (primary) | `$colors-btnPrimaryBg` | `$colors-btnPrimaryText` | none |
| `Button/secondary` | transparent | `$colors-btnSecondaryText` | `$colors-btnSecondaryBorder` |
| `Button/outline` | transparent | `$colors-btnSecondaryText` | `$colors-btnSecondaryBorder` |
| `Button/text` | transparent | `$colors-btnLinkText` | none |

Sub-variants with icons: `/icon-left`, `/icon-right`

**States per variant:** Default, Hover, Active, Disabled (all token-driven via semantic button colors)
**Shape:** `$radius-2xs` (8px)
**Focus ring:** `$colors-borders-focus`, 2px

### Input Fields

| Variant | Description |
|---|---|
| `Input` | Default state |
| `Input/filled` | Has value |
| `Input/focus` | Focused |
| `Input/no-label` | Without label |
| `Input/disabled` | Disabled |
| `Input/error` | Error state |
| `Input/error-icon` | Error with icon |
| `Input/icon-right` | With trailing icon |

### Textarea

| Variant | Description |
|---|---|
| `Textarea` | Default |
| `Textarea/hover` | Hovered |
| `Textarea/focus` | Focused |
| `Textarea/filled` | Has value |
| `Textarea/disabled` | Disabled |
| `Textarea/error` | Error state |

### Select / Dropdown

| Variant | Description |
|---|---|
| `Select` | Default state |
| `Select/selected` | Has selection |
| `Select/open` | Menu open |
| `Select/hover` | Hovered |
| `Select/focus` | Focused |
| `Select/disabled` | Disabled |
| `Select/error` | Error state |
| `Select/floating-label` | Floating label variant |

### Toggle Switch

| Variant | Description |
|---|---|
| `ToggleSwitch` | Off state |
| `ToggleSwitch/on` | On state |
| `ToggleSwitch/disabled` | Disabled |
| `ToggleSwitch/loading` | Loading state |

### Checkbox & Radio

| Variant | Description |
|---|---|
| `Checkbox` | Unchecked |
| `Checkbox/checked` | Checked |
| `Checkbox/no-label` | Without label |
| `Checkbox/with-error` | Error state |
| `Radio` | Unselected |
| `Radio/checked` | Selected |
| `Radio/no-label` | Without label |
| `Radio/with-error` | Error state |

### Slider

| Variant | Description |
|---|---|
| `Slider` | Default |
| `Slider/hover` | Hovered |
| `Slider/focus` | Focused |
| `Slider/disabled` | Disabled |
| `Slider/show-value` | With value display |
| `Slider/show-value-range-labels` | With min/max labels |

### DatePicker

| Variant | Description |
|---|---|
| `DatePicker` | Default |
| `DatePicker/filled` | Has date |
| `DatePicker/focus` | Focused |
| `DatePicker/disabled` | Disabled |
| `DatePicker/error` | Error state |
| `DatePicker/description` | With helper text |
| `DatePicker/no-label` | Without label |
| `DatePicker/open` | Calendar open |

### Label

| Variant | Description |
|---|---|
| `Label` | Standard label |
| `Label/description` | With description |
| `Label/required` | With required indicator |
| `Label/required-description` | Required + description |
| `Label/disabled` | Disabled state |

### Tag

| Variant | Description |
|---|---|
| `Tag` | Default |
| `Tag/icon-left` | With leading icon |
| `Tag/icon-right` | With trailing icon |
| `Tag/large` | Large size |
| `Tag/large/icon-left` | Large with leading icon |
| `Tag/large/icon-right` | Large with trailing icon |

---

## 07 · Cards & Controls `[SHIPPED]`

### Card

| Variant | Description |
|---|---|
| `Card` | Default card container |
| `Card/subtle` | Reduced emphasis |
| `Card/shadow` | With drop shadow |
| `Card/no-border` | Borderless |
| `Card/dense` | Compact padding |
| `Card/sm` | Small size |
| `Card/lg` | Large size |

### CardHeader

| Variant | Description |
|---|---|
| `CardHeader` | Title only |
| `CardHeader/description` | Title + description |
| `CardHeader/action` | Title + action button |
| `CardHeader/description-action` | Title + description + action |
| `CardHeader/divider` | With bottom divider |
| `CardHeader/dense` | Compact spacing |

### Callout (Alert)

| Variant | Description |
|---|---|
| `Callout` | Info (default) |
| `Callout/neutral` | Neutral tone |
| `Callout/success` | Success state |
| `Callout/warning` | Warning state |
| `Callout/error` | Error state |
| `Callout/title-only` | Without body |
| `Callout/dismissible` | With close button |
| `Callout/action` | With action button |

### Tabs

| Component | Variant | Description |
|---|---|---|
| `TabItem` | — | Default tab |
| `TabItem/hover` | — | Hovered |
| `TabItem/selected` | — | Active tab |
| `TabItem/disabled` | — | Disabled |
| `TabsGroup` | — | 3-tab group (first selected) |
| `TabsGroup/2-tabs` | — | 2-tab group |
| `TabsGroup/mid-selected` | — | Middle tab active |
| `TabsGroup/last-selected` | — | Last tab active |
| `TabsGroup/4-tabs` | — | 4-tab group |
| `TabsGroup/with-disabled` | — | Group with disabled tab |

### Segmented Control

| Variant | Description |
|---|---|
| `SegmentedControl` | 3-item (first selected) |
| `SegmentedControl/2-items` | 2-item group |
| `SegmentedControl/mid-selected` | Middle selected |
| `SegmentedControl/last-selected` | Last selected |
| `SegmentedControl/4-items` | 4-item group |
| `SegmentedControl/fill` | Fill container width |
| `SegmentedControl/with-disabled` | With disabled item |

### SegmentItem (child of SegmentedControl)

| Variant | Description |
|---|---|
| `SegmentItem` | Default |
| `SegmentItem/hover` | Hovered |
| `SegmentItem/selected` | Active |
| `SegmentItem/disabled` | Disabled |

### Accordion

| Variant | Description |
|---|---|
| `Accordion` | Default (first item open) |
| `Accordion/2-items` | 2-item |
| `Accordion/4-items` | 4-item |
| `Accordion/mid-open` | Middle item open |
| `Accordion/last-open` | Last item open |
| `Accordion/all-closed` | All collapsed |
| `Accordion/multiple-open` | Multiple expanded |

### Collapse

| Variant | Description |
|---|---|
| `Collapse` | Collapsed |
| `Collapse/open` | Expanded |

### ModalDrawer

| Variant | Description |
|---|---|
| `ModalDrawer` | Default |
| `ModalDrawer/with-actions` | With action buttons |
| `ModalDrawer/scroll` | Scrollable content |
| `ModalDrawer/mobile` | Mobile variant |
| `ModalDrawer/mobile/scroll` | Mobile scrollable |
| `ModalDrawer/mobile/with-actions` | Mobile with actions |

### Steps

| Variant | Description |
|---|---|
| `Steps` | Default horizontal steps |
| `Steps/h3-mid` | Mid-step active |
| `Steps/h5` | 5-step variant |
| `Steps/no-labels` | Icons only |
| `Steps/vertical` | Vertical layout |

### ListRow

| Variant | Description |
|---|---|
| `ListRow` | Default |
| `ListRow/with-description` | With subtitle |
| `ListRow/with-border` | With bottom border |
| `ListRow/with-description-border` | Subtitle + border |
| `ListRow/hover` | Hovered |
| `ListRow/disabled` | Disabled |
| `ListRow/long-content` | Overflow handling |
| `ListRow/no-chevron` | Without disclosure arrow |
| `ListRow/no-chevron-description` | No chevron + subtitle |
| `ListRow/no-chevron-border` | No chevron + border |
| `ListRow/no-chevron-description-border` | No chevron + subtitle + border |

### Avatar

| Variant | Description |
|---|---|
| `Avatar` | Image avatar |
| `Avatar/fallback` | Initials fallback |
| `Avatar/icon` | Icon avatar |

### Pagination

| Variant | Description |
|---|---|
| `PaginationDot` | Default dot |
| `PaginationDot/active` | Active dot |
| `PaginationDot/disabled` | Disabled dot |

### Badge

| Variant | Description |
|---|---|
| `Badge New` | New indicator |
| `Badge Changed` | Changed indicator |
| `Badge Deleted` | Deleted indicator |

### CodeBlock

| Variant | Description |
|---|---|
| `CodeBlock` | Default (with language header) |
| `CodeBlock/json` | JSON syntax |
| `CodeBlock/css` | CSS syntax |
| `CodeBlock/no-header` | Without header |
| `CodeBlock/copied` | Copy confirmed state |
| `CodeBlock/error` | Error state |

### Separator

| Component | Description |
|---|---|
| `Separator` | Horizontal divider line |

### Stack

| Component | Description |
|---|---|
| `Stack` | Vertical spacing utility |

---

## 08 · Financial Components `[SHIPPED]`

### TransactionRow

| Variant | Description |
|---|---|
| `TransactionRow` | Default transaction |
| `TransactionRow/hover` | Hovered state |
| `TransactionRow/pressed` | Pressed state |
| `TransactionRow/pending` | Pending transaction |

### TransactionTable (composed)

| Variant | Description |
|---|---|
| `TransactionTable` | Default table |
| `TransactionTable/hover` | Row hover |
| `TransactionTable/pressed` | Row pressed |
| `TransactionTableHeader` | Column headers |

### AccountRow

| Variant | Description |
|---|---|
| `AccountRow` | Default account item |
| `AccountRow/hover` | Hovered |
| `AccountRow/pressed` | Pressed |
| `AccountRow/error` | Error state |

### AccountRowGroup

| Variant | Description |
|---|---|
| `AccountRowGroup` | Grouped accounts |
| `AccountRowGroup/hover` | Group hover |
| `AccountRowGroup/pressed` | Group pressed |

### HoldingsRow

| Variant | Description |
|---|---|
| `HoldingsRow` | Default holding |
| `HoldingsRow/hover` | Hovered |
| `HoldingsRow/pressed` | Pressed |

### HoldingsTable (composed)

| Variant | Description |
|---|---|
| `HoldingsTable` | Default |
| `HoldingsTable/hover` | Row hover |
| `HoldingsTable/pressed` | Row pressed |
| `HoldingsTableHeader` | Column headers |

### DetailRow

| Variant | Description |
|---|---|
| `DetailRow` | Default label-value pair |
| `DetailRow/money` | Currency formatted |
| `DetailRow/positive` | Positive value (green) |
| `DetailRow/negative` | Negative value (red) |
| `DetailRow/muted` | Muted styling |
| `DetailRow/transaction-negative` | Transaction expense |
| `DetailRow/transaction-positive` | Transaction income |

### DetailHeader & DetailSection

| Component | Description |
|---|---|
| `DetailHeader` | Section header in detail view |
| `DetailHeader/with-eyebrow` | With category eyebrow |
| `DetailSection` | Grouped detail rows |

### DetailDrawer

| Variant | Description |
|---|---|
| `DetailDrawer` | Desktop drawer |
| `DetailDrawer/mobile` | Mobile full-screen |

### MoneyText

| Variant | Description |
|---|---|
| `MoneyText` | Default currency display |
| `MoneyText/positive` | Positive (green) |
| `MoneyText/negative` | Negative (red) |
| `MoneyText/muted` | Muted color |
| `MoneyText/sm` | Small size |
| `MoneyText/lg` | Large size |

### DataValueIndicator

| Variant | Description |
|---|---|
| `DataValueIndicator` | Positive trend (green + up arrow) |
| `DataValueIndicator/negative` | Negative trend (red + down arrow) |
| `DataValueIndicator/neutral` | Neutral (gray + dash) |

### TableHeaderCell

| Variant | Description |
|---|---|
| `TableHeaderCell` | Default |
| `TableHeaderCell/sortable` | With sort affordance |
| `TableHeaderCell/sorted-asc` | Sorted ascending |
| `TableHeaderCell/sorted-desc` | Sorted descending |

### Swatch Card

| Component | Description |
|---|---|
| `Swatch Card` | Color swatch display card |

---

## 09 · Charts & Data Visualization `[SHIPPED]`

### Chart types in the system

| Chart | Component name | Variants |
|---|---|---|
| Area | `AreaChart` | default, `/compact`, `/no-card` |
| Multi-Series Area | `AreaChartMultiSeries` | default, `/compact` |
| Bar | `BarChart` | default, `/compact`, `/with-tooltip`, `/no-card` |
| Donut | `DonutChart` | default, `/pressed`, `/with-legend`, `/compact`, `/hover`, `/static-filled` |
| Gauge | `GaugeChart` | default, `/compact`, `/with-min-max`, `/warning`, `/success` |
| KPI Sparkline | `KpiCard/with-sparkline` | (variant of KpiCard) |
| Waterfall | `WaterfallChart` | default, `/with-positive-negative`, `/compact`, `/no-card`, `/with-tooltip` |
| Heatmap | `HeatmapChart` | default, `/positive-negative`, `/compact`, `/with-labels` |
| Candlestick | `CandlestickChart` | default, `/compact`, `/with-grid`, `/no-card`, `/with-tooltip` |
| Projected vs Actual | `ProjectedVsActualChart` | default, `/with-today-marker`, `/compact`, `/no-card`, `/with-tooltip` |
| Benchmark Comparison | `BenchmarkComparisonChart` | default, `/with-labels`, `/compact`, `/no-card`, `/with-tooltip` |
| Treemap | `TreemapChart` | default, `/with-values`, `/with-tooltip`, `/compact`, `/no-card` |
| Sankey | `SankeyDiagram` | default, `/compact`, `/with-values`, `/with-tooltip`, `/no-card` |
| Timeline Scrubber | `TimelineScrubberChart` | default, `/with-events`, `/with-tooltip`, `/compact`, `/no-card` |
| Dual Axis | `DualAxisChart` | default, `/with-tooltip`, `/with-events`, `/compact`, `/no-card` |
| Sparkline (inline) | `Sparkline` | default, `/negative`, `/neutral`, `/with-value`, `/compact` |

### Shared chart primitives

| Component | Variants | Role |
|---|---|---|
| `ChartTooltip` | default, `/multi-series`, `/with-total`, `/compact` | Tooltip overlay |
| `ChartLegend` | default, `/inline-bottom`, `/vertical`, `/compact` | Static legend |
| `InteractiveLegend` | default, `/active`, `/inactive`, `/disabled`, `/compact` | Clickable legend |
| `ChartAxisGrid` | default, `/axis-line`, `/reference-line`, `/full-grid` | Axis & grid lines |
| `ThresholdLine` | default (goal), `/benchmark`, `/limit` | Reference lines |

### Chart design rules

- **Background:** always `$colors-background-surface` (white). Never gray or tinted.
- **Axis labels:** `xs` size (12px), `$colors-text-meta`
- **Tooltip:** `$colors-background-surface` bg, `shadow-md`, max 240px
- **Legend:** bottom placement default, click-to-toggle via `InteractiveLegend`
- **Threshold lines:** Goal = dashed, Benchmark = dotted, Limit = solid
- **Chart text scaling:** NEVER scale text with chart. Use fixed pixel sizes.

---

## 10 · Gen-UI Affordances `[SHIPPED]`

### Content blocks

| Component | Variants | Role |
|---|---|---|
| `FollowUpBlock` | default, `/with-body-text`, `/compact`, `/horizontal`, `/four-actions`, `/text-buttons`, `/hug` | Suggested action chips |
| `ListBlock` | default, `/compact`, `/numbered`, `/checklist`, `/with-tags`, `/interactive`, `/long-content`, `/radio-list` | Structured list content |
| `SectionBlock` | default, `/with-callout`, `/with-list`, `/with-accordion`, `/compact`, `/long-content` | Section with rich content |

### Image & media

| Component | Variants | Role |
|---|---|---|
| `Image` | default, `/loading`, `/error` | Single image |
| `ImageBlock` | default, `/caption-credit`, `/no-caption`, `/loading`, `/error`, `/centered` | Image with metadata |
| `ImageGallery` | default, `/with-captions`, `/two-column`, `/three-column`, `/mixed-aspect-ratio`, `/with-header`, `/compact` | Multi-image gallery |
| `Carousel` | default, `/image-with-caption`, `/multi-card`, `/with-header`, `/controls-disabled-start`, `/controls-disabled-end` | Swipeable content |

### Text content

| Component | Description |
|---|---|
| `TextContent` | Rich text block for AI responses |

### KPI Cards

| Variant | Description |
|---|---|
| `KpiCard` | Default (positive trend) |
| `KpiCard/negative` | Negative trend |
| `KpiCard/neutral` | No trend |
| `KpiCard/accent` | Accent-colored |
| `KpiCard/with-sparkline` | With inline sparkline |
| `KpiCard/compact` | Compact size |

---

## 11 · Dashboard & Widgets `[PLANNED]`

### Dashboard model

The dashboard is a special mainPanel view containing a **2-column fixed grid** of widget cards. Each widget is a compact preview of a saved or AI-suggested view.

### Widget behavior

| Rule | Detail |
|---|---|
| **Grid** | 2 columns, fixed. Not freeform. |
| **Widget chrome** | Header with title + right-chevron. Click title → full view. |
| **Controls (desktop)** | Hidden until hover: drag handle for rearrange |
| **Controls (mobile)** | No inline controls; user opens view to interact |
| **Widget content** | Read-only compact preview. Full interaction in opened view. |
| **First-time user** | AI suggests default layout. No empty dashboard state. |

### Compact rendering rule

Every gen-UI component that can appear as a widget needs a **compact variant**:

- KpiCard: use `/compact` variant
- Charts: use `/compact` variant (simplified, no axis labels)
- Tables: show first 3 rows + "View all" link
- ListBlock: use `/compact` variant

---

## 12 · Edge Cases & States `[PLANNED]`

Edge state components are specced for future implementation:

| Component | Role |
|---|---|
| Empty State | No data yet — icon + title + description + CTA |
| Error State | System error — icon + title + description + retry |
| AI Error State | AI-specific failure — softer tone |
| Partial Data State | Some data available, some missing |
| Zero Balance State | Account exists but balance is $0 |
| Permission Gated Card | Feature behind auth/upgrade |
| Rate Limited State | Too many requests |
| Conflicting Data State | Data sources disagree |

---

## 13 · Gen-UI Invocation Schema

When the AI generates a component, it emits a JSON object. The gen-UI renderer hydrates it into the matching Hemlock component.

### KpiCard

```json
{
  "component": "KpiCard",
  "variant": "default",
  "label": "Portfolio Value",
  "value": 168209,
  "format": "currency",
  "trend": { "direction": "up", "value": 2.4, "format": "percent", "period": "vs. last month" }
}
```

### TransactionTable

```json
{
  "component": "TransactionTable",
  "transactions": [
    { "merchant": "Whole Foods", "category": "Groceries", "amount": -127.43, "date": "2026-07-05", "status": "posted" }
  ],
  "showHeader": true
}
```

### AreaChart

```json
{
  "component": "AreaChart",
  "variant": "default",
  "title": "Net Worth Over Time",
  "data": { "series": [{ "label": "Total", "values": [] }] },
  "xAxis": { "label": "Month", "format": "date" },
  "yAxis": { "label": "Value", "format": "currency" }
}
```

### DonutChart

```json
{
  "component": "DonutChart",
  "variant": "with-legend",
  "title": "Spending by Category",
  "data": [
    { "label": "Housing", "value": 2400, "color": "$chart-categorical/color-01" },
    { "label": "Food", "value": 800, "color": "$chart-categorical/color-02" }
  ]
}
```

### FollowUpBlock

```json
{
  "component": "FollowUpBlock",
  "variant": "default",
  "actions": ["View transactions", "Set budget alert", "Compare months"]
}
```

### ListBlock

```json
{
  "component": "ListBlock",
  "variant": "numbered",
  "items": [
    { "text": "Reduce dining spend by $200/month" },
    { "text": "Increase emergency fund contribution" },
    { "text": "Rebalance investment portfolio" }
  ]
}
```

### SectionBlock

```json
{
  "component": "SectionBlock",
  "variant": "with-callout",
  "title": "Retirement Readiness",
  "body": "Your current savings rate puts you on track for retirement at age 67.",
  "callout": { "type": "success", "message": "You're ahead of 72% of peers in your age group." }
}
```

### DetailDrawer

```json
{
  "component": "DetailDrawer",
  "variant": "default",
  "header": { "title": "Chase Sapphire", "eyebrow": "Credit Card" },
  "sections": [
    {
      "rows": [
        { "label": "Current Balance", "value": "$4,231.00", "variant": "money" },
        { "label": "Available Credit", "value": "$15,769.00", "variant": "positive" }
      ]
    }
  ]
}
```

---

*Maintained by Vega. Visual canvas: `hemlock-library.lib.pen`. Both must stay in sync — same commit, no exceptions.*
