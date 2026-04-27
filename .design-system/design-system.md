# Evergreen Design System

> **Version:** 1.0.0
> **Last updated:** 2026-04-27
> **Visual canvas:** `.design-system/gen-ui-design-system.lib.pen`
> **Audience:** Freya (front-end engineering agent), gen-UI renderer, human designers/developers
> **Scope:** Everything — tokens, accessibility, primitives, shell chrome, gen-UI components, charts, dashboard widgets, edge states

---

## How to read this file

This is the **single source of truth** for the Evergreen design system as implemented in code. The companion `.lib.pen` file is the visual canvas for design review — both must stay in sync.

**For Freya / gen-UI renderer:**
- Every component uses a consistent 7-field pattern: **Name · Role · Variants · States · Tokens · Keyboard/ARIA · Gen-UI invocation**
- Token references use `$` prefix (e.g., `$accent.default`). In code, map to CSS custom properties or your framework's token system.
- Components marked `[PLANNED]` are specced but not yet in `.lib.pen`. Build to spec; canvas will follow.

**For gen-UI (AI output):**
- Section 13 defines the JSON invocation schema. When generating a component, emit that JSON shape.
- Prefer existing components over inventing new ones. Check section 04 (component selection rules) first.
- All gen-UI output renders in mainPanel. Chat messages render in chatPanel (shell chrome).

**Status legend:**
- `[SHIPPED]` — In `.lib.pen` and ready for implementation
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

Foundation JSON and `gen-ui-design-system.lib.pen` share these resolved values.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color.base.canvas` | `#FFFFFF` | `#0E0E0E` | App canvas |
| `color.base.white` | `#FFFFFF` | — | Absolute white (not theme-swapped) |

#### Gray ramp (green-tinted neutrals)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `gray.50` | `#F9FAF9` | `#0E0E0E` | Lightest / dark base |
| `gray.100` | `#EEEFEE` | `#202220` | Subtle bg / dark card |
| `gray.200` | `#D8D9D8` | `#3B3E3C` | Borders / dark nested |
| `gray.300` | `#B6B9B7` | `#6B6F6C` | Disabled / dark border |
| `gray.400` | `#949895` | `#7E8480` | Muted UI |
| `gray.500` | `#727874` | `#7E8480` | Tertiary text |
| `gray.600` | `#575B58` | `#949895` | Secondary text |
| `gray.700` | `#3B3E3C` | `#B6B9B7` | Emphasis |
| `gray.800` | `#202220` | `#D8D9D8` | Strong borders |
| `gray.900` | `#0E0E0E` | `#EEEFEE` | Primary text |
| `gray.950` | `#030712` | `#F9FAF9` | Maximum contrast |

#### Blue ramp (accent)

| Token | Value | Usage |
|---|---|---|
| `blue.50` | `#F5F8FF` | Lightest tint |
| `blue.100` | `#EBF0FE` | Selected backgrounds (light) |
| `blue.200` | `#C8D6FD` | Very light highlights |
| `blue.300` | `#A3BCFC` | Lighter blue |
| `blue.400` | `#9BB3FC` | Hover states (dark) |
| `blue.500` | `#7094FB` | Primary accent (dark) |
| `blue.600` | `#3A6AF8` | Primary accent (light) |
| `blue.700` | `#295CCC` | Hover (light) |
| `blue.800` | `#152354` | Dark blue surfaces |
| `blue.900` | `#1E3A8A` | Deepest accent |

#### Status & financial color primitives

| Token | Light | Dark | Usage |
|---|---|---|---|
| `color.red.50` | `#FEF2F2` | — | Error/expense bg (light) |
| `color.red.400` | — | `#F87171` | Error/expense (dark) |
| `color.red.700` | `#B91C1C` | — | Error/expense (light) |
| `color.green.50` | `#F0FDF4` | — | Success/income bg (light) |
| `color.green.400` | — | `#4ADE80` | Success/income (dark) |
| `color.green.700` | `#15803D` | — | Success/income (light) |
| `color.amber.400` | — | `#FBBF24` | Warning (dark) |
| `color.amber.700` | `#C25700` | — | Warning (light) |
| `color.orange.50` | `#FFF7ED` | — | Debt bg (light) |
| `color.orange.400` | — | `#FB923C` | Debt (dark) |
| `color.orange.700` | `#C2410C` | — | Debt (light) |
| `color.purple.50` | `#F5F3FF` | — | Investment bg (light) |
| `color.purple.400` | — | `#A78BFA` | Investment (dark) |
| `color.purple.700` | `#7C3AED` | — | Investment (light) |
| `color.sky.50` | `#F0F9FF` | — | Savings bg (light) |
| `color.sky.400` | — | `#38BDF8` | Savings (dark) |
| `color.sky.700` | `#0369A1` | — | Savings (light) |
| `color.info.400` | — | `#60A5FA` | Info (dark) |
| `color.info.700` | `#2563EB` | — | Info (light) |

### Semantic Colors

#### Surface & border

| Token | Light | Dark | Usage |
|---|---|---|---|
| `surface.primary` | `#FFFFFF` | `#111111` | Main background |
| `surface.secondary` | `#F5F5F5` | `#1A1A1A` | Card/panel |
| `surface.tertiary` | `#EBEBEB` | `#242424` | Nested surfaces |
| `surface.elevated` | `#FFFFFF` | `#242424` | Raised elements |
| `surface.inverse` | `#111111` | `#F5F5F5` | Inverse bars |
| `surface.accent` | `#EBF0FE` | `#152354` | Accent wash |
| `surface.overlay` | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` | Modal backdrops |
| `border.primary` | `#E5E5E5` | `#4A4D4B` | Default borders |
| `border.secondary` | `#D4D4D4` | `#626562` | Emphasized borders |
| `border.focus` | `#3A6AF8` | `#7094FB` | Focus rings |
| `border.accent` | `#3A6AF8` | `#7094FB` | Accent borders |

#### Text

| Token | Light | Dark | Usage |
|---|---|---|---|
| `text.primary` | `#171717` | `#F5F5F5` | Primary text |
| `text.secondary` | `#525252` | `#A3A3A3` | Secondary/helper |
| `text.tertiary` | `#737373` | `#8A8A8A` | Placeholder, caption |
| `text.inverse` | `#FFFFFF` | `#111111` | On inverse surfaces |
| `text.accent` | `#3A6AF8` | `#7094FB` | Links, accent text |
| `text.on-accent` | `#FFFFFF` | `#FFFFFF` | On accent fill |

#### Accent (interactive primary)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `accent.default` | `#3A6AF8` | `#7094FB` | Primary actions |
| `accent.hover` | `#295CCC` | `#9BB3FC` | Hover |
| `accent.pressed` | `#1E3F8F` | `#1E3F8F` | Pressed fill |
| `accent.subtle` | `#EBF0FE` | `#152354` | Selected backgrounds |

#### Destructive

| Token | Light | Dark | Usage |
|---|---|---|---|
| `destructive.default` | `#B91C1C` | `#EF4444` | Destructive primary |
| `destructive.hover` | `#991B1B` | `#F87171` | Destructive hover |
| `destructive.pressed` | `#450A0A` | `#FCA5A5` | Destructive pressed |
| `destructive.subtle` | `#FEF2F2` | `#450A0A` | Destructive bg |

#### Status (UI state)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `status.error` | `#B91C1C` | `#F87171` | Error states |
| `status.error-bg` | `#FEF2F2` | `#450A0A` | Error background |
| `status.warning` | `#C25700` | `#FBBF24` | Warning states |
| `status.warning-bg` | `#FFF7ED` | `#451A03` | Warning background |
| `status.success` | `#15803D` | `#4ADE80` | Success states |
| `status.success-bg` | `#F0FDF4` | `#052E16` | Success background |
| `status.info` | `#2563EB` | `#60A5FA` | Info states |
| `status.info-bg` | `#EFF6FF` | `#172554` | Info background |

#### Financial semantic

| Token | Light | Dark | Usage |
|---|---|---|---|
| `fin.income` | `#15803D` | `#4ADE80` | Income |
| `fin.income-bg` | `#F0FDF4` | `#052E16` | Income chip bg |
| `fin.expense` | `#B91C1C` | `#F87171` | Expense |
| `fin.expense-bg` | `#FEF2F2` | `#450A0A` | Expense chip bg |
| `fin.savings` | `#0369A1` | `#38BDF8` | Savings |
| `fin.savings-bg` | `#F0F9FF` | `#082F49` | Savings chip bg |
| `fin.debt` | `#C2410C` | `#FB923C` | Debt |
| `fin.debt-bg` | `#FFF7ED` | `#451A03` | Debt chip bg |
| `fin.investment` | `#7C3AED` | `#A78BFA` | Investment |
| `fin.investment-bg` | `#F5F3FF` | `#2E1065` | Investment chip bg |

#### Data value colors

| Token | Light | Dark | Usage |
|---|---|---|---|
| `data.positive` | `#15803D` | `#4ADE80` | Gains |
| `data.negative` | `#B91C1C` | `#F87171` | Losses |
| `data.neutral` | `#525252` | `#A3A3A3` | Zero change |
| `data.highlight` | `#3A6AF8` | `#7094FB` | Highlighted data |

#### AI namespace

| Token | Light | Dark | Usage |
|---|---|---|---|
| `ai.accent` | `#3A6AF8` | `#7094FB` | AI brand accent |
| `ai.surface` | `#EBF0FE` | `#172554` | AI content bg |
| `ai.border` | `#EBF0FE` | `#152354` | AI card border |
| `ai.chip-surface` | `#FFFFFF` | `#242424` | Prompt chip bg |
| `ai.chip-border` | `#EBF0FE` | `#152354` | Prompt chip border |
| `ai.gradient-start` | `#3A6AF8` | — | AI gradient |
| `ai.gradient-end` | `#2952CC` | — | AI gradient |

### Chart Palettes

#### Categorical (15 series, priority-ordered)

| Token | Light | Dark | Priority |
|---|---|---|---|
| `chart.cat.1` | `#8951F0` | `#8951F0` | 1st |
| `chart.cat.2` | `#06B6D4` | `#06B6D4` | 2nd |
| `chart.cat.3` | `#312E81` | `#4338CA` | 3rd |
| `chart.cat.4` | `#3B82F6` | `#3B82F6` | 4th |
| `chart.cat.5` | `#0F766E` | `#14B8A6` | 5th |
| `chart.cat.6` | `#38BDF8` | `#38BDF8` | 6th |
| `chart.cat.7` | `#2DD4BF` | `#2DD4BF` | 7th |
| `chart.cat.8` | `#A78BFA` | `#A78BFA` | 8th |
| `chart.cat.9` | `#C026D3` | `#C026D3` | 9th |
| `chart.cat.10` | `#E73CAE` | `#E73CAE` | 10th |
| `chart.cat.11` | `#E879A8` | `#E879A8` | 11th |
| `chart.cat.12` | `#92400E` | `#EA580C` | 12th |
| `chart.cat.13` | `#FB923C` | `#FB923C` | 13th |
| `chart.cat.14` | `#CA8A04` | `#EAB308` | 14th |
| `chart.cat.15` | `#FACC15` | `#FDE68A` | 15th |

Always assign in priority order. Dark-mode overrides exist on slots 3, 5, 12, 14, 15 for contrast on dark canvas.

#### Sequential ramp (single-hue blue)

| Token | Value | Usage |
|---|---|---|
| `chart.seq.50` | `#F5F8FF` | Lightest tint |
| `chart.seq.100` | `#EBF0FE` | Lightest fill |
| `chart.seq.200` | `#C8D6FD` | Light fill |
| `chart.seq.300` | `#A5BCFC` | Medium-light |
| `chart.seq.400` | `#7094FB` | Medium |
| `chart.seq.500` | `#5A82F9` | Medium-strong |
| `chart.seq.600` | `#3A6AF8` | Strong |
| `chart.seq.700` | `#2952CC` | Dark fill |
| `chart.seq.800` | `#1E3F8F` | Darker fill |
| `chart.seq.900` | `#152B60` | Darkest fill |

### Spacing (4px base grid)

| Token | Value | Usage |
|---|---|---|
| `space.1` | `4px` | Tight internal gaps |
| `space.2` | `8px` | Icon-to-label, checkbox gap |
| `space.3` | `12px` | Input padding, cell padding |
| `space.4` | `16px` | Card padding, section gaps |
| `space.5` | `20px` | Component spacing |
| `space.6` | `24px` | Group spacing |
| `space.8` | `32px` | Section dividers |
| `space.10` | `40px` | Major section gaps |
| `space.12` | `48px` | Page-level spacing |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius.none` | `0px` | Table cells, chart areas |
| `radius.sm` | `4px` | Inputs, tags, badges |
| `radius.md` | `6px` | Cards, dropdowns |
| `radius.lg` | `8px` | Modals, panels |
| `radius.xl` | `12px` | Large containers |
| `radius.full` | `9999px` | Buttons, pills, toggle thumbs |

### Elevation / Shadows

| Token | Light | Dark |
|---|---|---|
| `shadow.sm` | `0 1px 2px rgba(0,0,0,0.05)` | `0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)` |
| `shadow.md` | `0 4px 6px rgba(0,0,0,0.07)` | `0 4px 8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)` |
| `shadow.lg` | `0 10px 15px rgba(0,0,0,0.1)` | `0 10px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)` |
| `shadow.dropdown` | `0 4px 12px rgba(0,0,0,0.12)` | `0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)` |
| `shadow.tooltip` | `0 2px 8px rgba(0,0,0,0.15)` | `0 2px 10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)` |

### Motion / Easing

| Token | Value | Usage |
|---|---|---|
| `motion.fast` | `150ms` | Hover, toggles |
| `motion.normal` | `250ms` | Dropdowns, tooltips |
| `motion.slow` | `400ms` | Modals, chart transitions |
| `motion.easing.default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard |
| `motion.easing.in` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |
| `motion.easing.out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |

### Opacity

| Token | Value | Usage |
|---|---|---|
| `opacity.disabled` | `0.4` | Disabled elements |
| `opacity.hover` | `0.06` | Hover tint |
| `opacity.pressed` | `0.1` | Active/pressed tint |
| `opacity.skeleton` | `0.08` | Skeleton loading |

### Density

| Scale | Gap | Padding | Usage |
|---|---|---|---|
| `density.compact` | `4px` | `8px` | Large datasets, >50 rows |
| `density.comfortable` | `8px` | `16px` | Default — touch-friendly |
| `density.spacious` | `16px` | `24px` | Summary, marketing |

### Focus Ring

| Token | Value |
|---|---|
| `focus.ring-width` | `2px` |
| `focus.ring-offset` | `2px` |
| `focus.ring-color` | `$border.focus` |

### Responsive Breakpoints

| Token | Value | Behavior |
|---|---|---|
| `breakpoint.sm` | `390px` | Single-column stack |
| `breakpoint.md` | `768px` | Side-by-side; mobile font sizes below |
| `breakpoint.lg` | `1024px` | Full dashboard grid |
| `breakpoint.xl` | `1280px` | Extended chart widths |

---

## 02 · Typography System

### Font Families

| Token | Value | Usage |
|---|---|---|
| `font.primary` | Heebo | UI font — body, numbers, labels |
| `font.secondary` | Cormorant Garamond | Headings, editorial content |
| `font.mono` | Heebo (with `tabular-nums`) | Monospaced numeric contexts |

**Cormorant Garamond weight floor:** never below `500`. Weights 300–400 render hairline strokes. Use `600` (semibold) as default for all headings.

### Type Scale

| Token | Mobile | Desktop | Usage |
|---|---|---|---|
| `font.size.xs` | `10px` | `12px` | Chart ticks, fine print |
| `font.size.sm` | `12px` | `14px` | Axis labels, table cells, helper text |
| `font.size.md` | `14px` | `16px` | Body text (min for body per a11y) |
| `font.size.lg` | `16px` | `18px` | Section titles, card headers |
| `font.size.xl` | `20px` | `24px` | Page titles, large KPI values |
| `font.size.2xl` | `24px` | `30px` | Large headings |
| `font.size.3xl` | `32px` | `36px` | Hero headings |
| `font.size.4xl` | `40px` | `48px` | Hero numbers, dashboard KPIs |
| `font.size.5xl` | `48px` | `60px` | Display text |
| `font.size.display` | `64px` | `64px` | Display |
| `font.size.hero` | `80px` | `80px` | Hero |

Mobile sizes apply below `breakpoint.md` (768px).

### Font Weights

| Token | Value | Usage |
|---|---|---|
| `font.weight.light` | `300` | Large display text only |
| `font.weight.regular` | `400` | Body, labels |
| `font.weight.medium` | `500` | Subtitles, emphasis |
| `font.weight.semibold` | `600` | Section headers, all Cormorant headings |
| `font.weight.bold` | `700` | Table headers, KPI values |

### Semantic Type Styles

| Token | Font | Size | Weight | Letter Spacing | Color |
|---|---|---|---|---|---|
| `type.page-title` | secondary | 2xl | semibold | tight | `$text.primary` |
| `type.section-title` | primary | lg | semibold | normal | `$text.primary` |
| `type.subtitle` | primary | md | semibold | normal | `$text.secondary` |
| `type.body` | primary | base | regular | normal | `$text.primary` |
| `type.caption` | primary | sm | regular | normal | `$text.secondary` |
| `type.overline` | primary | xs | semibold | wide (0.05em) | `$text.tertiary` |
| `type.label` | primary | sm | semibold | normal | `$text.primary` |
| `type.helper` | primary | xs | regular | normal | `$text.secondary` |
| `type.kpi-value` | primary | 4xl | bold | tight | `$text.primary` |
| `type.data-value` | primary | sm | regular | normal | `$text.primary` |

### Typography Rules

1. **Heebo for all UI and numbers.** Cormorant Garamond for headings/editorial only.
2. **Tabular-nums** (`font-variant-numeric: tabular-nums`) on all right-aligned numeric columns.
3. **Line height:** body 1.4–1.5; multi-line descriptions always `lineHeight: 1.5`.
4. **Financial values** minimum `$font.size.md` (14px) — never smaller.
5. **Letter spacing:** `tight` (-0.01em) for large headings, `wide` (0.05em) for all-caps overlines, `normal` for everything else.

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
- All tokens support light/dark — never hardcode hex

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

Component announcements: `KPI Card` → "[Label]: [Value], [trend] [change]". `Transaction Item` → "[Merchant], [category], [amount], [date]". `AI Insight` → "AI Insight: [title]. [body]". Loading → "Loading [content type]…". Error → "Error: [title]. [description]. [actions]".

### Focus

- Visible ring on every interactive element: `$border.focus`, ≥2px, 3:1 contrast against adjacent colors
- Order: newNav → mainPanel header → KPI row (L→R) → main content (top→bottom, L→R) → chatPanel

### Motion

- All animations respect `prefers-reduced-motion: reduce` → instant transitions, no shimmer
- Use `$motion.*` tokens so motion can be globally disabled
- Never use motion as the only way to convey information
- Loading: subtle shimmer only (never pulse). Chart transitions: fade (never bounce/spring). Values: brief highlight (never flash).

### Severity Model

| Tier | Criteria | Blocks approval? |
|---|---|---|
| 🔴 Must-Fix | Affects financial data, interactive elements, navigation, or task completion; contrast below 3.0:1; missing keyboard access/labels/focus/touch targets | Yes |
| 🟡 Should-Fix | Secondary content, decorative elements; contrast between 3.0:1–4.5:1 on secondary | No (tracked) |
| 🔵 Known Exception | Registered deviation with rationale, mitigation, review date, and approval | No action |

---

## 04 · Composition & Layout Rules

### Component Selection (data → component)

#### Single value

| Data | Component |
|---|---|
| Currency with trend | `KPI Card/Positive` or `KPI Card/Negative` |
| Currency with sparkline | `KPI Sparkline Card` |
| Currency neutral | `KPI Card/Neutral` |
| Percentage with direction | KPI card + badge row |

#### Comparisons

| Scenario | Component | Rule |
|---|---|---|
| Two time periods | `GenUI/Comparison Metric` | Label both periods |
| Before/after | `GenUI/Comparison Metric` | Delta badge with direction |
| Budget vs actual | `Budget/Category Row` | Progress bar required |
| Multi-metric side-by-side | KPI card row (3–4) | Horizontal, `fill_container` |

#### Lists & tables

| Data | Component |
|---|---|
| Recent transactions | `Transaction/*` variants |
| Holdings / positions | `Table` with frozen first column |
| Budget categories | `Budget/Category Row` |
| Account list | `Card` or Accordion, grouped by type |
| Amortization / schedules | `Table` (compact density) |
| Scenario comparison | `Table` with comparison tokens |

#### Charts (data shape → chart type)

| Shape | Component |
|---|---|
| Part-of-whole | `Donut Chart`, `Pie Chart Card` |
| Time series (1 metric) | `Area Chart`, `Sparkline Pattern` |
| Time series (multi) | `Multi-Series Area Chart` |
| Categorical comparison | `Bar Chart`, `Horizontal Bar Chart` |
| Composition over time | `Stacked Bar Chart` |
| Flow / movement | `Sankey Flow Diagram` |
| Projection / forecast | `Monte Carlo Chart` |
| Threshold / gauge | `Gauge Chart` |
| Hierarchical | `Treemap Chart` |
| Market data | `Candlestick Chart` |
| Waterfall / attribution | `Waterfall Chart` |

#### AI-generated content

| Content | Component |
|---|---|
| Proactive insight | `GenUI/AI Insight Card` |
| Actionable recommendation | `GenUI/AI Recommendation Card` |
| Conversational text | `Chat/AI` (in chatPanel) |
| Response with data | `Chat/AI Preview` (chatPanel) + full view (mainPanel) |
| Thinking (<5s) | `GenUI/AI Thinking State` |
| Long processing (>5s) | `GenUI/AI Progress Bar` |

### Dashboard composition rules

- **KPI row:** always 3 or 4 cards (never 1, 2, or 5+). Primary metric first. `fill_container` width.
- **Transaction list:** preceded by filter row. Group by date. Max 20 visible → pagination. Pending at top.
- **AI insights section:** max 3 visible → "See all". Highest confidence/impact first. `GenUI/Financial Disclaimer` below projections.
- **Dashboard grid:** 2-column fixed grid. Widgets are card-sized views. See §11.

### Content voice

- **Tone:** Calm, precise, empowering. Never panicky, vague, patronizing, or salesy.
- **Insight pattern:** Observation + comparison + driver
- **Recommendation pattern:** Action + quantified impact + reasoning
- **Error pattern:** What happened + reassurance + action
- **Confidence language:** High (>80%) → "Based on 24 months of data…" / Medium (50–80%) → "Based on available data, it appears…" / Low (<50%) → "With limited data, we estimate…"
- **Never use:** "will", "definitely", "guaranteed", "you need to"
- **Numbers:** Always exact values, always with baseline, period, and source. Never approximate actuals.
- **Disclaimer (required on all projections):** "This is not financial advice. Projections are estimates based on historical data and may not reflect future results." Use `GenUI/Financial Disclaimer`. Never omit.

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

### Layout behavior

| Behavior | Rule |
|---|---|
| **Collapse** | When chatPanel or newNav collapses, mainPanel expands to fill. Nav icon and chat icon move into mainPanel header. Small gutter maintained. |
| **Rendering split** | chatPanel = conversation (input surface). mainPanel = gen-UI output (output surface). Pattern B: chat bubble shows summary/preview; mainPanel owns full interactive rendering. |
| **Single view** | mainPanel always shows one view at a time — most recent chat context or a saved/pinned view from history. No tabs. |
| **Dashboard mode** | Dashboard is a special mainPanel view with a 2-column widget grid. See §11. |

### Shell chrome components `[PLANNED]`

| Component | Location | Role |
|---|---|---|
| `Shell/NewNav` | Left panel | Navigation links, account switcher, collapse affordance |
| `Shell/NewNav/Collapsed` | Left panel | Icon-only state |
| `Shell/ChatPanel` | Right panel | Chat conversation container |
| `Shell/ChatPanel/Collapsed` | Right panel | Chat icon state |
| `Shell/MainPanel/Header` | Top of center | Page title, breadcrumb-or-back, collapsed icons (nav + chat), view actions (save, pin) |
| `Chat/User` | chatPanel | User message bubble |
| `Chat/AI` | chatPanel | AI text-only response bubble |
| `Chat/AI Preview` | chatPanel | Summary card + "View in main panel" link (Pattern B bridge) |
| `Chat/Typing Indicator` | chatPanel | Dots during AI response |
| `Chat/Streaming Line` | chatPanel | Streamed text during generation |
| `GenUI/Prompt Chip` | chatPanel | Suggested prompt buttons |

---

## 06 · UI Primitives `[SHIPPED]` unless noted

### Buttons

| Variant | Fill | Text | Border |
|---|---|---|---|
| `Btn/Primary` | `$accent.default` | `$text.on-accent` | none |
| `Btn/Secondary` | transparent | `$text.accent` | `1px $border.accent` |
| `Btn/Outline` | transparent | `$text.primary` | `1px $border.primary` |
| `Btn/Ghost` | transparent | `$text.secondary` | none |
| `Btn/Destructive` | `$destructive.default` | `$text.on-accent` | none |

**Sizes:** `Sm` (28px height, `$font.size.sm`), `Md` (36px, `$font.size.md`), `Lg` (44px)
**States per variant:** Default, Hover, Active, Disabled
**Shape:** `$radius.full` (pill)
**Focus ring:** `$border.focus`, 2px, 2px offset

### Input Fields

**States:** Default, Focused, Error, Disabled

| State | Border | Border width |
|---|---|---|
| Default | `$border.primary` | 1px |
| Focused | `$accent.default` | 2px |
| Error | `$status.error` | 2px |
| Disabled | `$border.primary`, opacity `$opacity.disabled` | 1px |

Height: 36px. Padding: `$space.2` vertical, `$space.3` horizontal. Radius: `$radius.md`. Font: `$font.size.md`.

### Dropdown / Select

Trigger inherits `Input/*` tokens. Menu: `$surface.primary`, `$shadow.dropdown`, `$radius.md`. Item hover: `$accent.subtle`. Selected: checkmark + `$accent.default` text.

**States:** Default, Filled, Open (with menu)

### Toggle / Switch

Track: 36×20px, `$radius.full`. Off: `$gray.300`. On: `$accent.default`. Thumb: 16px, `$surface.primary`.

### Checkbox & Radio

18×18px. Checkbox: `$radius.sm`. Radio: `$radius.full`. Checked: `$accent.default` fill + white icon. Focus ring: `$border.focus`.

### Slider `[PLANNED]`

Primary input for continuous numeric variables in modeling tools.

**Variants:** `Slider/Single`, `Slider/Range`, `Slider/Stepped`
**States:** Default, Hover, Active (dragging), Focused, Disabled, Error

| Element | Token |
|---|---|
| Track | 4px height, `$surface.tertiary` bg |
| Fill | `$accent.default`, left of thumb |
| Thumb | 20×20px, `$accent.default`, 2px `$surface.primary` inner ring |
| Tap target | 44×44px invisible hit area |
| Label | `$font.size.md`, weight 500, `$text.primary` |
| Value readout | `$font.size.xl`, weight 600, `$text.primary`, right-aligned |
| Tick marks (stepped) | 1×8px, `$border.primary` |

**Numeric formats:** `currency` ($12,500), `percent` (7.5%), `number` (10,000), `year` (2045), `duration` (25 years)

**Value display modes:**
- `inline` — value always visible in label row (default)
- `popover` — floats above thumb while dragging
- `paired-input` — editable input synced bidirectionally (preferred for modeling)

**Keyboard:** ←/→ = step, Shift+←/→ = 10× step, Home/End = min/max, PageUp/Down = 10% of range

**ARIA:** `role="slider"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext` (formatted: "15 percent", not "15")

### Table `[PLANNED]`

Generic data grid for holdings, amortization, scenarios, assumptions, sensitivity, tax tables.

**Primitives:** `Table/Container`, `Table/Header Cell`, `Table/Row`, `Table/Row/Expanded`, `Table/Cell/Text`, `Table/Cell/Numeric`, `Table/Cell/Editable`, `Table/Total Row`

**Row states:** Default (`$surface.primary`), Hover (`$surface.secondary`), Selected (`$surface.accent` + left 2px bar), Focused (2px `$border.focus` ring), Expanded (chevron rotated, child below)

**Header Cell states:** Default, Sortable/Unsorted (↕), Ascending (↑), Descending (↓), Sticky (+shadow)

**Cell formats:** text (left), number (right, tabular-nums), currency (right, negative = `$fin.expense`), percent (right, `$data.*`), delta (right + arrow), status (badge), date

**Density:**
| Scale | Row height | Padding | Use case |
|---|---|---|---|
| compact | 32px | `$density.compact.padding` | >50 rows, amortization |
| comfortable | 44px | `$density.comfortable.padding` | Default |
| spacious | 56px | `$density.spacious.padding` | Summary |

**Sticky header:** pins to viewport top + `$shadow.color` when scrolled
**Frozen column:** first column pins left + right border

**Keyboard:** Arrow keys between cells, Enter to edit/expand, Escape to cancel, Tab enters/exits table

**ARIA:** `role="table"`, `aria-sort` on sortable headers, `aria-rowcount`/`aria-colcount` for virtualized tables, editable cells use `role="gridcell"` + `aria-readonly="false"`

### Stepper / Number Input `[PLANNED]`

36px height, `$font.primary`, right-aligned. Stepper buttons: 28px wide, ±, `$surface.tertiary` hover.

### Date Picker `[PLANNED]`

Trigger inherits `Input/*`. Calendar popup: `$surface.primary`, `$shadow.dropdown`, `$radius.lg`. Day cells: 32px, `$radius.full`. Selected: `$accent.default` fill. Today: `1px solid $accent.default`. Range: `$accent.subtle` wash between endpoints.

---

## 07 · Cards & Controls `[SHIPPED]`

### Card

Base container. `$surface.secondary` fill, `1px $border.primary`, `$radius.lg`, `$shadow.md`, `$space.6` padding. Hover: `$border.secondary` + `$shadow.lg`.

### KPI Card

| Variant | Trend color | Badge bg |
|---|---|---|
| `KPI Card/Positive` | `$data.positive` | `$data.positive` at 8% |
| `KPI Card/Negative` | `$data.negative` | `$data.negative` at 8% |

Value: `$font.size.4xl`, `$font.weight.bold`. Subtitle: `$font.size.sm`, `$text.secondary`.

### Alert

4 status variants: Success, Error, Warning, Info. `4px` left border in status color. Status-tinted bg. Shared: `$radius.md`, `$space.3 $space.4` padding.

### Progress Bar

6px track, `$radius.full`. Fill: `$accent.default` (normal), `$data.positive` (on track), `$status.warning` (attention), `$status.error` (over limit).

### Tab Bar

Underline indicator: 2px, `$accent.default`. Item: `$text.secondary` default, `$accent.default` active, weight `semibold` when active.

### Segmented Control

Pill-style toggle. Container: `$surface.secondary`, `$radius.md`. Active segment: `$surface.primary`, `$shadow.sm`, `$text.primary`. Inactive: `$text.secondary`.

### Badge

| Variant | Text | Background |
|---|---|---|
| `Badge/Positive` | `$data.positive` | `$data.positive` at 8% |
| `Badge/Negative` | `$data.negative` | `$data.negative` at 8% |
| `Badge/Neutral` | `$text.secondary` | `$surface.tertiary` |
| `Badge/Category` | `$accent.default` | `$accent.subtle` |

Shape: `$radius.sm` (4px) — always rounded rectangle, never pill. Badges are non-interactive.

### Modal `[PLANNED]`

Widths: sm (400px), md (560px), lg (720px). `$radius.xl`, `$shadow.lg`, `$surface.primary`. Backdrop: `$surface.overlay` + 4px blur. Animation: 200ms ease-out fade+scale.

### Popover `[PLANNED]`

Max 320px. `$radius.md`, `$shadow.dropdown`. Animation: 150ms ease-out fade+translate-y.

---

## 08 · Financial Components `[SHIPPED]`

### Transaction

3 variants: `Transaction/Expense`, `Transaction/Income`, `Transaction/Pending`

Anatomy: category icon (28×28 circle with tinted bg) + merchant name + meta (date, category) + amount (right-aligned) + balance

Pending: badge "Pending" in `$status.warning-bg` / `$status.warning` text

### Budget Category Row

2 variants: `Budget/Category Row` (normal), `Budget/Category Row/Over` (over budget)

Anatomy: category icon + name + spent/limit + progress bar + remaining + % used

Over: progress fill in `$status.error`, remaining text in `$status.error`

### Comparison Table `[token-specced]`

Side-by-side scenario analysis. Header: `$surface.secondary`. Divider: `2px $border.secondary`. Delta column: `$surface.tertiary`, 80px wide. Highlight row: `$accent.subtle`. Winner badge: `$data.positive` text on `$data.positive` at 8%.

---

## 09 · Charts & Data Visualization `[SHIPPED]`

### Chart types in the system

| Chart | Component name | Status |
|---|---|---|
| Donut | `Donut Chart` | Shipped |
| Sparkline | `Sparkline Pattern` | Shipped |
| Area | `Area Chart Pattern` | Shipped |
| Multi-Series Area | `Multi-Series Area Chart` | Shipped |
| Stacked Bar | `Stacked Bar Chart` | Shipped |
| Horizontal Bar | `Horizontal Bar Chart` | Shipped |
| Pie | `Pie Chart Card` | Shipped |
| Monte Carlo | `Monte Carlo Chart` | Shipped |
| Waterfall | `Waterfall Chart` | Shipped |
| Candlestick | `Candlestick Chart` | Shipped |
| Gauge | `Gauge Chart` | Shipped |
| Sankey | `Sankey Flow Diagram` | Shipped |
| Treemap | `Treemap Chart` | Shipped |
| KPI Sparkline | `KPI Sparkline Card` | Shipped |
| Line (standalone) | — | Token-specced, no canvas component |
| Scatter / Bubble | — | Token-specced, no canvas component |
| Histogram | — | Token-specced, no canvas component |
| Heatmap | — | Token-specced, no canvas component |

### Shared chart tokens

Full chart token tables (axis, grid, tooltip, legend, threshold lines, annotations, confidence bands, data point states, interactions, animations) are defined in `design-tokens-spec.md` §3. Key highlights:

- **Background:** always `$surface.primary`. Never gray or tinted.
- **Axis labels:** `$font.size.xs`, `$text.secondary`
- **Tooltip:** `$surface.primary` bg, `$shadow.tooltip`, max 240px, no caret
- **Legend:** bottom placement default, click-to-toggle, inactive at 35% opacity + strikethrough
- **Threshold lines:** Goal = dashed `$status.warning`, Benchmark = dotted `$accent.default`, Limit = solid `$status.error`
- **Confidence bands:** 99th→50th percentile, opacity 0.06→0.25, widest first
- **Chart text scaling:** NEVER scale text with chart. Use fixed pixel SVG dimensions. Wrap in `overflow-x: auto` if needed.
- **No SVG for standard charts.** Pure HTML/CSS with clip-path polygons. Exceptions: donut, gauge, Sankey, sparklines.

### Chart primitives (reusable sub-components)

| Component | Role |
|---|---|
| `Chart Tooltip` | Shared tooltip with swatch + value rows |
| `Chart Legend/Horizontal` | Bottom-placed legend strip |
| `Chart Legend/Vertical` | Right-placed legend column |
| `Chart Bar` | Single bar primitive |

---

## 10 · Gen-UI Affordances `[SHIPPED]`

### AI lifecycle states

| Component | Role | Where |
|---|---|---|
| `GenUI/Typing Indicator` | Dots animation during generation | chatPanel |
| `GenUI/Streaming Line` | Text streams in real-time | chatPanel |
| `GenUI/AI Thinking State` | "Working on it" (<5s) | chatPanel or mainPanel |
| `GenUI/AI Progress Bar` | Long processing (>5s) | mainPanel |

### Skeletons

7 variants: `Skeleton/Text`, `Skeleton/Text Short`, `Skeleton/Heading`, `Skeleton/Avatar`, `Skeleton/Chart`, `Skeleton/Bar`, `Skeleton/KPI Value`

Skeleton bg: `$gray.100` / `$gray.800`. Gradient sweep animation 1.5s. Respects `prefers-reduced-motion`.

### AI content cards

| Component | Role | Anatomy |
|---|---|---|
| `GenUI/AI Insight Card` | Proactive insight | Header + data highlight + body + action chips |
| `GenUI/AI Recommendation Card` | Actionable recommendation | Header + impact metrics + badge + CTA |

### Chat components (shell chrome — in chatPanel)

| Component | Role |
|---|---|
| `GenUI/Chat/User` | User message bubble |
| `GenUI/Chat/AI` | AI text response |
| `GenUI/Chat/AI Rich` | AI response with embedded content |
| `Chat/AI Preview` `[PLANNED]` | Summary card + "View in main panel" link |

### Prompt & filter chips

| Component | Tokens |
|---|---|
| `GenUI/Prompt Chip` | `$ai.chip-surface`, `$ai.chip-border`, `$ai.accent` icon, `$radius.full` |
| `GenUI/Filter Chip` | Same family, toggle-able |
| `GenUI/Filter Chip/Active` | `$accent.subtle` fill when selected |
| `GenUI/Date Range Pill` | Display-only date range indicator |

### Data mentions (inline in AI text)

| Variant | Color |
|---|---|
| `GenUI/Data Mention/Positive` | `$data.positive` |
| `GenUI/Data Mention/Negative` | `$data.negative` |
| `GenUI/Data Mention/Neutral` | `$data.neutral` |

### Trust & confidence

| Component | Role |
|---|---|
| `GenUI/Confidence/High` | Green indicator, "Based on 24 months…" |
| `GenUI/Confidence/Medium` | Amber indicator, "Based on available data…" |
| `GenUI/Confidence/Low` | Red indicator, "With limited data…" |
| `GenUI/Trust Signal Bar` | Source + freshness + confidence in a row |
| `GenUI/Stale Data Indicator` | "Data as of [date]" warning |
| `GenUI/Freshness/Live` | Green dot, real-time data |
| `GenUI/Freshness/Stale` | Amber dot, data may be outdated |
| `GenUI/Financial Disclaimer` | Required on all projections. Never omit. |
| `GenUI/Calm Notification` | Non-intrusive notification card |

### Interaction & safety

| Component | Role |
|---|---|
| `GenUI/Confirmation Dialog` | "Are you sure?" before consequential actions |
| `GenUI/Gain First Summary` | Leads with gains before losses (loss aversion UX) |
| `GenUI/Conflicting Data State` | When data sources disagree |

---

## 11 · Dashboard & Widgets `[PLANNED]`

### Dashboard model

The dashboard is a special mainPanel view containing a **2-column fixed grid** of widget cards. Each widget is a compact preview of a saved or AI-suggested view.

### Dashboard components

| Component | Role |
|---|---|
| `Dashboard/Grid` | 2-column fixed layout container with gutter (`$space.4`) |
| `Widget/Container` | Card frame — holds header + compact gen-UI content |
| `Widget/Header` | Title + right-chevron → click opens full view in mainPanel |
| `Widget/Hover Controls` | Drag handle (desktop only, appears on hover) |
| `Dashboard/Customize Panel` | Overlay/drawer with widget list + checkboxes |
| `Dashboard/Customize Item` | Row: widget name + toggle + drag-to-reorder |
| `Dashboard/AI Default Layout` | First-time state: AI-suggested arrangement |

### Widget behavior

| Rule | Detail |
|---|---|
| **Grid** | 2 columns, fixed. Not freeform. |
| **Widget chrome** | Header with title + right-chevron. Click title → full view. |
| **Controls (desktop)** | Hidden until hover: drag handle for rearrange |
| **Controls (mobile)** | No inline controls; user opens view to interact |
| **Widget content** | Read-only compact preview. Full interaction in opened view. |
| **Customization** | "Customize" button on dashboard → panel with selectable widget list (check/uncheck) |
| **Rearrange** | Drag/drop in edit mode (desktop). Mobile TBD. |
| **First-time user** | AI suggests default layout. No empty dashboard state. |

### Compact rendering rule

Every gen-UI component that can appear as a widget needs a **compact variant** — specifically, how it renders at ~half-width column card size. Guidelines:

- KPI Card: keep value + trend, hide sparkline
- Chart: reduce to sparkline-level fidelity (no axis labels, no legend, simplified shape)
- Table: show first 3 rows + "View all" link, hide pagination
- Insight Card: title + 1-line summary, hide action chips

---

## 12 · Edge Cases & States `[SHIPPED]`

| Component | Role |
|---|---|
| `GenUI/Empty State` | No data yet — icon + title + description + CTA |
| `GenUI/Error State` | System error — icon + title + description + retry |
| `GenUI/AI Error State` | AI-specific failure — different icon, softer tone |
| `GenUI/Partial Data State` | Some data available, some missing — show what we have + explanation |
| `GenUI/Zero Balance State` | Account exists but balance is $0 — congratulatory or encouraging tone |
| `GenUI/Permission Gated Card` | Feature behind auth/upgrade — explain + CTA |
| `GenUI/Rate Limited State` | Too many requests — "Try again in X minutes" |
| `GenUI/Conflicting Data State` | Data sources disagree — show both + explanation |

### Mobile & Dark Mode `[SHIPPED]`

All components have dark mode variants in `.lib.pen` (section "01–12 Dark" mirrors each light section). Mobile dashboard layout (`Mobile/Dashboard`) exists for reference.

---

## 13 · Gen-UI Invocation Schema

When the AI generates a component, it emits a JSON object. The gen-UI renderer hydrates it into the matching component.

### Slider

```json
{
  "component": "Slider",
  "variant": "paired-input",
  "label": "Annual savings rate",
  "helperText": "Share of pre-tax income saved each year",
  "format": "percent",
  "min": 0,
  "max": 50,
  "step": 0.5,
  "value": 15,
  "locale": "en-US",
  "bindTo": "assumptions.savingsRate"
}
```

### Table

```json
{
  "component": "Table",
  "density": "comfortable",
  "columns": [
    { "id": "asset", "label": "Asset", "format": "text", "sortable": true, "frozen": true },
    { "id": "shares", "label": "Shares", "format": "number", "sortable": true },
    { "id": "price", "label": "Price", "format": "currency", "sortable": true },
    { "id": "value", "label": "Value", "format": "currency", "sortable": true, "defaultSort": "desc" }
  ],
  "rows": [
    { "id": "vtsax", "asset": "VTSAX", "shares": 1420.5, "price": 112.34, "value": 159522 }
  ],
  "totalRow": { "value": 168209 },
  "editable": ["shares"],
  "stickyHeader": true
}
```

### KPI Card

```json
{
  "component": "KPICard",
  "variant": "positive",
  "label": "Portfolio Value",
  "value": 168209,
  "format": "currency",
  "trend": { "direction": "up", "value": 2.4, "format": "percent", "period": "vs. last month" }
}
```

### AI Insight Card

```json
{
  "component": "AIInsightCard",
  "title": "Dining spend is rising",
  "body": "Your dining expenses increased 23% this month vs. your 3-month average.",
  "dataHighlight": { "value": 23, "format": "percent", "direction": "up" },
  "confidence": "high",
  "actions": ["View transactions", "Set budget alert"]
}
```

### Chart (example: Monte Carlo)

```json
{
  "component": "Chart",
  "type": "monteCarlo",
  "title": "Retirement Projection",
  "data": { "percentiles": ["p10", "p25", "p50", "p75", "p90"], "series": "..." },
  "goal": { "value": 2000000, "label": "Target: $2M" },
  "xAxis": { "label": "Year", "format": "year" },
  "yAxis": { "label": "Portfolio Value", "format": "currency" }
}
```

### Dashboard Widget

```json
{
  "component": "Widget",
  "title": "Portfolio Overview",
  "viewId": "saved-view-uuid",
  "compact": true,
  "content": { "component": "KPICard", "..." : "..." }
}
```

### Chat/AI Preview (Pattern B bridge)

```json
{
  "component": "ChatAIPreview",
  "title": "Retirement Projection Ready",
  "summary": "Your Monte Carlo simulation shows an 82% chance of reaching $2M by age 65.",
  "thumbnail": "monteCarlo",
  "viewId": "generated-view-uuid"
}
```

---

*Maintained by Vega. Visual canvas: `.design-system/gen-ui-design-system.lib.pen`. Both must stay in sync — same commit, no exceptions.*
