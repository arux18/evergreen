# Data Visualization Design Token Specification

> **Purpose:** Complete token system for designing and building financial data visualization components. Covers Figma variables, CSS custom properties, and AI-agent-readable markdown handoff. Feed this spec to an LLM (e.g., Cursor IDE) to generate any financial chart or UI with brand consistency.
>
> **Scope:** Monte Carlo simulations, stock option calculators, retirement planners, portfolio dashboards, tax planning tools, and any data-rich financial interface.
>
> **Modes:** Light + Dark. **Fonts:** Heebo (UI + numbers), Cormorant Garamond (headings). **Palette:** Warm/cool categorical, neutral gray ramp (Gen UI lib.pen), Blue accent (#3A6AF8 light / #7094FB dark).

---

### Table of Contents

1. **Foundation Tokens** — Colors, typography, spacing, radius, shadows, motion, opacity
2. **Component Tokens** — **Form layout, content sections/panels**, inputs, dropdowns, sliders, toggles, checkboxes, segmented controls, date pickers, cards, KPI cards, badges, buttons, number inputs, progress bars, alerts, modals, popovers, tabs, **step indicator/wizard, comparison table, sparkline-in-table, timeline scrubber**
3. **Data Visualization Tokens** — Area, bar, line, donut, sparkline, scatter, histogram, heatmap, grouped/stacked bar, waterfall, gauge, **projected vs. actual overlay, benchmark/comparison line, candlestick/OHLC, Sankey/flow, treemap** + shared chart tokens (axes, grid, tooltip, legend, **secondary axis**) + threshold lines, **vertical event markers**, annotation callouts, confidence bands, data point states, interactions (crosshair, brush, animation, series toggle, zoom)
4. **Table Tokens** — Header, row, cell, pagination, expand, **collapse toggle, event-highlighted rows**
5. **Content Typography** — 11 semantic type styles
6. **States & Special Conditions** — Empty, skeleton/loading, focus rings
7. **Responsive Breakpoints** — sm/md/lg/xl
8. **Number Formatting** — Currency, percentage, basis points, probability, change values, **date/time formats**
9. **Canvas Rendering Guide** — CSS var reading, DPR scaling, font strings, color helpers, dash patterns, responsive chart behavior

---

## 1. Foundation Tokens

### Color Primitives

Foundation JSON and `gen-ui-design-system.lib.pen` share these resolved values.

| Token | Light Value | Dark Value | Usage |
| ----- | ----------- | ---------- | ----- |
| `color.base.canvas` | `#FFFFFF` | `#0E0E0E` | App canvas (Pencil: `base.canvas`; dark matches `gray.50` dark) |
| `color.base.white` | `#FFFFFF` | — | Absolute white (`white`; not theme-swapped) |

| Token            | Light Value | Dark Value | Usage              |
| ---------------- | ----------- | ---------- | ------------------ |
| `color.gray.50`  | `#F7F7F8`   | `#0E0E0E`  | Lightest neutral / dark base   |
| `color.gray.100` | `#E8E8EA`   | `#1A1A1A`  | Subtle background / dark card    |
| `color.gray.200` | `#D1D1D6`   | `#3A3A3C`  | Borders / dark nested            |
| `color.gray.300` | `#AEAEB2`   | `#535356`  | Disabled / dark border           |
| `color.gray.400` | `#8E8E93`   | `#6C6C70`  | Muted UI                         |
| `color.gray.500` | `#6C6C70`   | `#8E8E93`  | Tertiary text                    |
| `color.gray.600` | `#535356`   | `#AEAEB2`  | Secondary text, data.neutral     |
| `color.gray.700` | `#3A3A3C`   | `#D1D1D6`  | Emphasis                         |
| `color.gray.800` | `#2C2C2E`   | `#E8E8EA`  | Strong borders                 |
| `color.gray.900` | `#0E0E0E`   | `#F7F7F8`  | Primary text (theme-resolved)  |

| Token             | Value       | Usage                                            |
| ----------------- | ----------- | ------------------------------------------------ |
| `color.blue.50`   | `#F5F8FF`   | Lightest tint                                    |
| `color.blue.100`  | `#EBF0FE`   | Lightest blue (selected backgrounds in light mode) |
| `color.blue.200`  | `#C8D6FD`   | Very light backgrounds, subtle highlights        |
| `color.blue.300`  | `#A3BCFC`   | Lighter blue                                     |
| `color.blue.400`  | `#9BB3FC`   | Light blue (hover states in dark mode)           |
| `color.blue.500`  | `#7094FB`   | Medium blue (primary accent in dark mode)        |
| `color.blue.600`  | `#3A6AF8`   | Primary accent (CTAs, interactive elements in light mode) |
| `color.blue.700`  | `#295CCC`   | Dark blue (hover states in light mode)           |
| `color.blue.800`  | `#1E3A8A`   | Dark blue surfaces (accent subtle, AI, surfaces)   |
| `color.blue.900`  | `#152354`   | Deepest accent / pressed                         |

#### Red (destructive / error)

| Token            | Value     | Usage                                                  |
| ---------------- | --------- | ------------------------------------------------------ |
| `color.red.50`   | `#FEF2F2` | Lightest wash (destructive.subtle light, status.error-bg light, fin.expense-bg light) |
| `color.red.200`  | `#FECACA` | Icon/text destructive-pressed in dark mode             |
| `color.red.300`  | `#FCA5A5` | Destructive.pressed in dark mode                       |
| `color.red.400`  | `#F87171` | Status error / icon destructive / data.negative dark   |
| `color.red.500`  | `#EF4444` | Destructive default in dark mode                       |
| `color.red.700`  | `#B91C1C` | Destructive default light (status.error / data.negative / fin.expense light) |
| `color.red.800`  | `#991B1B` | Destructive hover light (icon/text destructive-hover light) |
| `color.red.900`  | `#450A0A` | Destructive pressed light (destructive.subtle dark)    |

#### Green / Amber / Orange / Purple / Sky / Info (status & financial)

| Token              | Value     | Usage |
| ------------------ | --------- | ----- |
| `color.green.50`   | `#F0FDF4` | success-bg / income-bg light |
| `color.green.400`  | `#4ADE80` | success / data.positive / fin.income dark |
| `color.green.700`  | `#15803D` | success / data.positive / fin.income light |
| `color.green.800`  | `#166534` | reserved (swatch only) |
| `color.green.900`  | `#052E16` | success-bg / income-bg dark |
| `color.amber.400`  | `#FBBF24` | status warning dark |
| `color.amber.700`  | `#C25700` | status warning light |
| `color.orange.50`  | `#FFF7ED` | warning-bg / debt-bg light |
| `color.orange.400` | `#FB923C` | fin.debt dark (chart.cat.13) |
| `color.orange.700` | `#C2410C` | fin.debt light |
| `color.orange.800` | `#9A3412` | reserved (swatch only) |
| `color.orange.900` | `#451A03` | warning-bg / debt-bg dark |
| `color.purple.50`  | `#F5F3FF` | fin.investment-bg light |
| `color.purple.400` | `#A78BFA` | fin.investment dark (chart.cat.8) |
| `color.purple.700` | `#7C3AED` | fin.investment light |
| `color.purple.800` | `#5B21B6` | reserved (swatch only) |
| `color.purple.900` | `#2E1065` | fin.investment-bg dark |
| `color.sky.50`     | `#F0F9FF` | fin.savings-bg light |
| `color.sky.400`    | `#38BDF8` | fin.savings dark (chart.cat.6) |
| `color.sky.700`    | `#0369A1` | fin.savings light |
| `color.sky.800`    | `#075985` | reserved (swatch only) |
| `color.sky.900`    | `#082F49` | fin.savings-bg dark |
| `color.info.50`    | `#EFF6FF` | status info-bg light |
| `color.info.400`   | `#60A5FA` | status info dark |
| `color.info.700`   | `#2563EB` | status info light |
| `color.info.950`   | `#172554` | status info-bg dark |


### Semantic Colors


> **Naming convention:** All semantic state suffixes use kebab-case `-default`, `-hover`, `-pressed`, `-subtle`, `-bg`. Background tokens use the `-bg` suffix (e.g. `status.error-bg`), matching `gen-ui-design-system.lib.pen`.

#### Surface & Border

| Token                        | Light Value         | Dark Value          | Usage                          |
| ---------------------------- | ------------------- | ------------------- | ------------------------------ |
| `color.surface.primary`      | `#FFFFFF`           | `#0E0E0E`           | Main background (`base.canvas` + `gray.50`) |
| `color.surface.secondary`    | `#F7F7F8`           | `#1A1A1A`           | Card/panel (`gray.50` / `gray.100`) |
| `color.surface.tertiary`     | `#E8E8EA`           | `#3A3A3C`           | Nested surfaces (`gray.100` / `gray.200`) |
| `color.surface.elevated`     | `#FFFFFF`           | `#3A3A3C`           | Raised (`base.canvas` / `gray.200` dark) |
| `color.surface.inverse`      | `#0E0E0E`           | `#F7F7F8`           | Inverse bars (`gray.900` both) |
| `color.surface.accent`       | `#EBF0FE`           | `#1E3A8A`           | Accent wash (`blue.100` / `blue.800`) |
| `color.surface.overlay`      | `rgba(0,0,0,0.5)`  | `rgba(0,0,0,0.7)`  | Modal/dropdown backdrops       |
| `color.border.default`       | `#E8E8EA`           | `#535356`           | Default (`gray.100` / `gray.300`) |
| `color.border.strong`        | `#D1D1D6`           | `#6C6C70`           | Emphasized (`gray.200` / `gray.400`) |
| `color.border.focus`         | `#3A6AF8`           | `#7094FB`           | Focus rings (`blue.600` / `blue.500`) |
| `color.border.accent`        | `#3A6AF8`           | `#7094FB`           | Accent borders / outlined buttons (`blue.600` / `blue.500`) |

#### Text

| Token                          | Light Value | Dark Value | Usage                          |
| ------------------------------ | ----------- | ---------- | ------------------------------ |
| `color.text.primary`           | `#0E0E0E`   | `#F7F7F8`  | Primary text (`gray.900`)      |
| `color.text.secondary`         | `#535356`   | `#AEAEB2`  | Secondary/helper (`gray.600`)  |
| `color.text.tertiary`          | `#6C6C70`   | `#8E8E93`  | Placeholder, caption (`gray.500`) |
| `color.text.inverse`           | `#FFFFFF`   | `#0E0E0E`  | On inverse (`white` / `gray.50` dark) |
| `color.text.link`              | `#3A6AF8`   | `#7094FB`  | Interactive links              |
| `color.text.accent`            | `#3A6AF8`   | `#7094FB`  | Accent text (links, ghost-button labels = `blue.600` / `blue.500`) |
| `color.text.accent-hover`      | `#295CCC`   | `#9BB3FC`  | Accent text hover (`blue.700` / `blue.400`) |
| `color.text.accent-pressed`    | `#152354`   | `#A3BCFC`  | Accent text pressed (`blue.900` / `blue.300`) |
| `color.text.on-accent`         | `#FFFFFF`   | `#FFFFFF`  | Text on accent fill (white, not theme-swapped) |
| `color.text.destructive`       | `#B91C1C`   | `#F87171`  | Destructive text (`red.700` / `red.400`) |
| `color.text.destructive-hover` | `#991B1B`   | `#FCA5A5`  | Destructive text hover (`red.800` / `red.300`) |
| `color.text.destructive-pressed`| `#450A0A`  | `#FECACA`  | Destructive text pressed (`red.900` / `red.200`) |
| `color.text.on-destructive`    | `#FFFFFF`   | `#FFFFFF`  | Text on destructive fill (white) |

#### Icon

| Token                            | Light Value | Dark Value | Usage                          |
| -------------------------------- | ----------- | ---------- | ------------------------------ |
| `color.icon.accent`              | `#3A6AF8`   | `#7094FB`  | Accent icon (ghost button, link) (`blue.600` / `blue.500`) |
| `color.icon.accent-hover`        | `#295CCC`   | `#9BB3FC`  | Accent icon hover (`blue.700` / `blue.400`) |
| `color.icon.accent-pressed`      | `#152354`   | `#A3BCFC`  | Accent icon pressed (`blue.900` / `blue.300`) |
| `color.icon.destructive`         | `#B91C1C`   | `#F87171`  | Destructive icon (`red.700` / `red.400`) |
| `color.icon.destructive-hover`   | `#991B1B`   | `#FCA5A5`  | Destructive icon hover (`red.800` / `red.300`) |
| `color.icon.destructive-pressed` | `#450A0A`   | `#FECACA`  | Destructive icon pressed (`red.900` / `red.200`) |
| `color.icon.on-destructive`      | `#FFFFFF`   | `#FFFFFF`  | Icon on destructive fill (white) |

#### Accent (interactive primary)

| Token                  | Light Value | Dark Value | Usage                          |
| ---------------------- | ----------- | ---------- | ------------------------------ |
| `color.accent.default` | `#3A6AF8`   | `#7094FB`  | Primary actions, active states (`blue.600` / `blue.500`) |
| `color.accent.hover`   | `#295CCC`   | `#9BB3FC`  | Primary hover (`blue.700` / `blue.400`) |
| `color.accent.pressed` | `#152354`   | `#A3BCFC`  | Primary pressed (`blue.900` / `blue.300`) |
| `color.accent.subtle`  | `#EBF0FE`   | `#1E3A8A`  | Selected backgrounds, accent wash (`blue.100` / `blue.800`) |

> **Renamed (legacy → current):** `accent.primary` → `accent.default`, `accent.primary-hover` → `accent.hover`, `accent.primary-subtle` → `accent.subtle`. New: `accent.pressed`.

#### Destructive (delete / dangerous actions)

> Distinct from `status.error`, which communicates UI validation/system state. Use `destructive.*` for user-initiated destructive intent (delete buttons, "Discard changes", etc.).

| Token                      | Light Value | Dark Value | Usage                          |
| -------------------------- | ----------- | ---------- | ------------------------------ |
| `color.destructive.default`| `#B91C1C`   | `#EF4444`  | Destructive primary fill (`red.700` / `red.500`) |
| `color.destructive.hover`  | `#991B1B`   | `#F87171`  | Destructive hover (`red.800` / `red.400`) |
| `color.destructive.pressed`| `#450A0A`   | `#FCA5A5`  | Destructive pressed (`red.900` / `red.300`) |
| `color.destructive.subtle` | `#FEF2F2`   | `#450A0A`  | Destructive subtle bg / outlined hover (`red.50` / `red.900`) |

#### Status (UI state)

| Token                 | Light Value | Dark Value | Usage                |
| --------------------- | ----------- | ---------- | -------------------- |
| `color.status.error`  | `#B91C1C`   | `#F87171`  | Error states         |
| `color.status.error-bg`| `#FEF2F2`  | `#450A0A`  | Error background     |
| `color.status.warning`| `#C25700`   | `#FBBF24`  | Warning states       |
| `color.status.warning-bg`| `#FFF7ED`| `#451A03`  | Warning background   |
| `color.status.success`| `#15803D`   | `#4ADE80`  | Success states       |
| `color.status.success-bg`| `#F0FDF4`| `#052E16`  | Success background   |
| `color.status.info`   | `#2563EB`   | `#60A5FA`  | Informational states |
| `color.status.info-bg`| `#EFF6FF`   | `#172554`  | Informational background |

> **Renamed:** `status.*-subtle` → `status.*-bg` (matches Pencil naming).

#### Financial Semantic (income / expense / savings / debt / investment)

| Token                       | Light Value | Dark Value | Usage              |
| --------------------------- | ----------- | ---------- | ------------------ |
| `color.fin.income`          | `#15803D`   | `#4ADE80`  | Income (`green.700` / `green.400`) |
| `color.fin.income-bg`       | `#F0FDF4`   | `#052E16`  | Income chip bg (`green.50` / `green.900`) |
| `color.fin.expense`         | `#B91C1C`   | `#F87171`  | Expense (`red.700` / `red.400`) |
| `color.fin.expense-bg`      | `#FEF2F2`   | `#450A0A`  | Expense chip bg (`red.50` / `red.900`) |
| `color.fin.savings`         | `#0369A1`   | `#38BDF8`  | Savings (`sky.700` / `sky.400`) |
| `color.fin.savings-bg`      | `#F0F9FF`   | `#082F49`  | Savings chip bg (`sky.50` / `sky.900`) |
| `color.fin.debt`            | `#C2410C`   | `#FB923C`  | Debt (`orange.700` / `orange.400`) |
| `color.fin.debt-bg`         | `#FFF7ED`   | `#451A03`  | Debt chip bg (`orange.50` / `orange.900`) |
| `color.fin.investment`      | `#7C3AED`   | `#A78BFA`  | Investment (`purple.700` / `purple.400`) |
| `color.fin.investment-bg`   | `#F5F3FF`   | `#2E1065`  | Investment chip bg (`purple.50` / `purple.900`) |

### Data Value Colors

> **Why separate from status colors?** Status colors communicate UI state (validation errors, form success). Data colors communicate financial meaning (gains vs. losses). Keeping them independent avoids visual confusion when a table cell shows a negative return alongside an error-state input.

| Token                        | Light Value         | Dark Value          | Usage                          |
| ---------------------------- | ------------------- | ------------------- | ------------------------------ |
| `color.data.positive`        | `#15803D`           | `#4ADE80`           | Gains, positive returns        |
| `color.data.negative`        | `#B91C1C`           | `#F87171`           | Losses, negative returns       |
| `color.data.neutral`         | `#535356`           | `#AEAEB2`           | Zero change, breakeven (`gray.600`) |
| `color.data.positive-subtle` | `rgba(21,128,61,0.08)` | `rgba(74,222,128,0.10)` | Positive badge/cell bg    |
| `color.data.negative-subtle` | `rgba(185,28,28,0.08)` | `rgba(248,113,113,0.10)` | Negative badge/cell bg   |

### Chart Categorical Palette (15 Series, Priority-Ordered)

> **Usage rule:** Always assign colors in priority order — cat.1 first, cat.2 second, and so on. These are high-saturation colors designed for maximum distinguishability. Some have dark-mode overrides for contrast accessibility on the dark canvas (~`#0E0E0E`).

| Token                | Light Value | Dark Value | Usage priority |
| -------------------- | ----------- | ---------- | -------------- |
| `color.chart.cat.1`  | `#8951F0`   | `#8951F0`  | 1st series     |
| `color.chart.cat.2`  | `#06B6D4`   | `#06B6D4`  | 2nd series     |
| `color.chart.cat.3`  | `#312E81`   | `#4338CA`  | 3rd series     |
| `color.chart.cat.4`  | `#3B82F6`   | `#3B82F6`  | 4th series     |
| `color.chart.cat.5`  | `#0F766E`   | `#14B8A6`  | 5th series     |
| `color.chart.cat.6`  | `#38BDF8`   | `#38BDF8`  | 6th series     |
| `color.chart.cat.7`  | `#2DD4BF`   | `#2DD4BF`  | 7th series     |
| `color.chart.cat.8`  | `#A78BFA`   | `#A78BFA`  | 8th series     |
| `color.chart.cat.9`  | `#C026D3`   | `#C026D3`  | 9th series     |
| `color.chart.cat.10` | `#E73CAE`   | `#E73CAE`  | 10th series    |
| `color.chart.cat.11` | `#E879A8`   | `#E879A8`  | 11th series    |
| `color.chart.cat.12` | `#92400E`   | `#EA580C`  | 12th series    |
| `color.chart.cat.13` | `#FB923C`   | `#FB923C`  | 13th series    |
| `color.chart.cat.14` | `#CA8A04`   | `#EAB308`  | 14th series    |
| `color.chart.cat.15` | `#FACC15`   | `#FDE68A`  | 15th series    |

### Chart Sequential Ramp (Single-Hue for Area Charts)

Matches `chart.seq.*` in Gen UI lib.pen (chart ramp may differ from UI `blue.*` at some steps).

| Token                  | Value     | Usage         |
| ---------------------- | --------- | ------------- |
| `color.chart.seq.50`  | `#F5F8FF` | Lightest tint |
| `color.chart.seq.100` | `#EBF0FE` | Lightest fill |
| `color.chart.seq.200` | `#C8D6FD` | Light fill    |
| `color.chart.seq.300` | `#A5BCFC` | Medium-light  |
| `color.chart.seq.400` | `#7094FB` | Medium        |
| `color.chart.seq.500` | `#5A82F9` | Medium-strong |
| `color.chart.seq.600` | `#3A6AF8` | Strong        |
| `color.chart.seq.700` | `#2952CC` | Dark fill     |
| `color.chart.seq.800` | `#1E3F8F` | Darker fill   |
| `color.chart.seq.900` | `#152B60` | Darkest fill  |

### Typography Scale

#### Font Families

| Token                  | Value            | Usage                          |
| ---------------------- | ---------------- | ------------------------------ |
| `font.family.primary`  | `Heebo`              | Primary UI font — body copy, numbers, labels (sans-serif, Google Fonts) |
| `font.family.secondary`| `Cormorant Garamond` | Headings, editorial content (serif, Google Fonts)                       |

#### Font Sizes

| Token             | Mobile | Desktop | Usage                                    |
| ----------------- | ------ | ------- | ---------------------------------------- |
| `font.size.2xs`   | `10px` | `10px`  | Micro labels, legal fine print           |
| `font.size.xs`    | `10px` | `12px`  | Chart tick labels, fine print            |
| `font.size.sm`    | `12px` | `14px`  | Axis labels, table cells, helper text    |
| `font.size.base`  | `14px` | `16px`  | Body text, input values                  |
| `font.size.md`    | `16px` | `18px`  | Emphasized body, dropdown items          |
| `font.size.lg`    | `18px` | `20px`  | Section titles, card headers             |
| `font.size.xl`    | `20px` | `24px`  | Page titles, large KPI values            |
| `font.size.2xl`   | `24px` | `30px`  | Large headings                           |
| `font.size.3xl`   | `30px` | `36px`  | Hero headings                            |
| `font.size.4xl`   | `36px` | `48px`  | Hero numbers, dashboard KPIs             |
| `font.size.5xl`   | `48px` | `60px`  | Display text                             |
| `font.size.6xl`   | `60px` | `72px`  | Extra-large display                      |
| `font.size.7xl`   | `72px` | `96px`  | Jumbo display                            |
| `font.size.8xl`   | `96px` | `112px` | Maximum display                          |

> **Breakpoint**: Mobile sizes apply below `breakpoint.md` (768px). Desktop sizes apply at and above `breakpoint.md`.

#### Font Weights (Heebo)

| Token                    | Heebo Style  | CSS Numeric | Usage                          |
| ------------------------ | ------------ | ----------- | ------------------------------ |
| `font.weight.light`      | `Light`      | `300`       | Decorative, large display text (Heebo only) |
| `font.weight.regular`    | `Regular`    | `400`       | Body, labels (Heebo only)      |
| `font.weight.semibold`   | `SemiBold`   | `600`       | Subtitles, emphasis, all Cormorant Garamond headings |
| `font.weight.bold`       | `Bold`       | `700`       | Section headers, table headers |

> **Cormorant Garamond weight floor:** Never set Cormorant Garamond below `500`. Weights 300–400 render with hairline strokes that are difficult to read on most screens. Use `600` (semibold) as the default for all headings; `500` (medium) only when a deliberately lighter display feel is needed.

#### Line Heights

| Token                  | Mobile | Desktop | Usage                          |
| ---------------------- | ------ | ------- | ------------------------------ |
| `font.lineheight.2xs`  | `12px` | `12px`  | Micro labels                   |
| `font.lineheight.xs`   | `12px` | `16px`  | Fine print, tick labels        |
| `font.lineheight.sm`   | `16px` | `20px`  | Helper text, table cells       |
| `font.lineheight.base` | `20px` | `24px`  | Body text                      |
| `font.lineheight.md`   | `24px` | `28px`  | Emphasized body                |
| `font.lineheight.lg`   | `28px` | `28px`  | Section titles                 |
| `font.lineheight.xl`   | `28px` | `32px`  | Page titles                    |
| `font.lineheight.2xl`  | `32px` | `36px`  | Large headings                 |
| `font.lineheight.3xl`  | `36px` | `40px`  | Hero headings                  |
| `font.lineheight.4xl`  | `40px` | `48px`  | Hero numbers                   |
| `font.lineheight.5xl`  | `48px` | `60px`  | Display text                   |
| `font.lineheight.6xl`  | `60px` | `72px`  | Extra-large display            |
| `font.lineheight.7xl`  | `72px` | `96px`  | Jumbo display                  |
| `font.lineheight.8xl`  | `96px` | `112px` | Maximum display                |

#### Letter Spacing

| Token                      | Value     | Usage                    |
| -------------------------- | --------- | ------------------------ |
| `font.letterspacing.tight` | `-0.01em` | Large headings           |
| `font.letterspacing.normal`| `0em`     | Body                     |
| `font.letterspacing.wide`  | `0.05em`  | All-caps labels, overlines|

### Spacing Scale (4px Base)

| Token     | Value  | Usage                        |
| --------- | ------ | ---------------------------- |
| `space.1` | `4px`  | Tight internal gaps          |
| `space.2` | `8px`  | Icon-to-label, checkbox gap  |
| `space.3` | `12px` | Input padding, cell padding  |
| `space.4` | `16px` | Card padding, section gaps   |
| `space.5` | `20px` | Component spacing            |
| `space.6` | `24px` | Group spacing                |
| `space.8` | `32px` | Section dividers             |
| `space.10`| `40px` | Major section gaps           |
| `space.12`| `48px` | Page-level spacing           |

### Border Radius

| Token         | Value    | Usage                    |
| ------------- | -------- | ------------------------ |
| `radius.none` | `0px`    | Table cells, chart areas |
| `radius.sm`   | `4px`    | Inputs, tags, small rects |
| `radius.md`   | `6px`    | Cards, dropdowns         |
| `radius.lg`   | `8px`    | Modals, panels           |
| `radius.xl`   | `12px`   | Large containers         |
| `radius.full` | `9999px` | Buttons, pills, toggle thumbs |

### Elevation / Shadows

| Token             | Light Value                     | Dark Value                      |
| ----------------- | ------------------------------- | ------------------------------- |
| `shadow.sm`       | `0 1px 2px rgba(0,0,0,0.05)`   | `0 1px 3px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)`    |
| `shadow.md`       | `0 4px 6px rgba(0,0,0,0.07)`   | `0 4px 8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)`   |
| `shadow.lg`       | `0 10px 15px rgba(0,0,0,0.1)`  | `0 10px 20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)`  |
| `shadow.dropdown` | `0 4px 12px rgba(0,0,0,0.12)`  | `0 4px 16px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)`   |
| `shadow.tooltip`  | `0 2px 8px rgba(0,0,0,0.15)`   | `0 2px 10px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)`   |

### Motion / Easing

| Token                    | Value                            | Usage                     |
| ------------------------ | -------------------------------- | ------------------------- |
| `motion.duration.fast`   | `100ms`                          | Hover states, toggles     |
| `motion.duration.normal` | `200ms`                          | Dropdowns, tooltips       |
| `motion.duration.slow`   | `300ms`                          | Modals, chart transitions |
| `motion.easing.default`  | `cubic-bezier(0.4, 0, 0.2, 1)`  | Standard ease             |
| `motion.easing.in`       | `cubic-bezier(0.4, 0, 1, 1)`    | Exiting elements          |
| `motion.easing.out`      | `cubic-bezier(0, 0, 0.2, 1)`    | Entering elements         |
| `motion.easing.spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful bounces       |

### Opacity

| Token                          | Value  | Usage                    |
| ------------------------------ | ------ | ------------------------ |
| `opacity.disabled`             | `0.38` | Disabled elements        |
| `opacity.hover-overlay`        | `0.04` | Hover tint               |
| `opacity.pressed-overlay`      | `0.08` | Active/pressed tint      |
| `opacity.chart-area-fill`      | `0.15` | Area chart fill          |
| `opacity.chart-area-fill-hover`| `0.25` | Area chart fill on hover |

---

## 2. Component Tokens

### Form Layout

> Horizontal and vertical groupings of labeled form fields. Used for parameter bars (stock option inputs, simulation controls) and settings panels.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `form.group.gap`                   | `space.4` (16px)   |
| `form.group.direction`             | `row` (horizontal default) or `column` |
| `form.group.wrap`                  | `wrap`             |
| `form.field.min-width`             | `120px`            |
| `form.field.label.font-size`       | `font.size.xs` (11px) |
| `form.field.label.font-weight`     | `font.weight.medium` |
| `form.field.label.color`           | `text.secondary`   |
| `form.field.label.text-transform`  | `uppercase`        |
| `form.field.label.letter-spacing`  | `wide` (0.05em)    |
| `form.field.label.margin-bottom`   | `space.1` (4px)    |
| `form.action.align`               | `flex-end` (bottom-aligned with inputs) |

> **Parameter bar pattern:** A single-row form layout used at the top of calculators and simulation tools. Fields wrap on narrow screens. The action button (e.g., "Regenerate") aligns to the bottom of the row so it sits flush with the input fields.

### Content Section / Panel

> Repeating card-like content blocks that organize a page into distinct sections (e.g., "Single Scenario", "Monte Carlo Simulation"). Each section has a title, optional subtitle, and a white card surface.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `section.bg`                       | `surface.primary`  |
| `section.radius`                   | `radius.lg` (12px) |
| `section.padding`                  | `space.6` (24px)   |
| `section.shadow`                   | `shadow.sm`        |
| `section.gap`                      | `space.6` (24px) between sections |
| `section.title.font-size`          | `font.size.lg` (18px) |
| `section.title.font-weight`        | `font.weight.semibold` |
| `section.title.font-family`        | `font.family.primary` |
| `section.title.color`              | `text.primary`     |
| `section.title.margin-bottom`      | `space.2` (8px)    |
| `section.subtitle.font-size`       | `font.size.sm` (13px) |
| `section.subtitle.color`           | `text.secondary`   |
| `section.subtitle.margin-bottom`   | `space.4` (16px)   |
| `section.page-bg`                  | `surface.secondary` (gray background behind sections) |

### Input Fields

| Token                    | Default            | Hover              | Focus              | Disabled           | Error              |
| ------------------------ | ------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `input.bg`               | `surface.primary`  | `surface.primary`  | `surface.primary`  | `surface.secondary`| `surface.primary`  |
| `input.border`           | `border.default`   | `border.strong`    | `accent.default`   | `border.default`   | `status.error`     |
| `input.border-width`     | `1px`              | `1px`              | `2px`              | `1px`              | `2px`              |
| `input.text`             | `text.primary`     | `text.primary`     | `text.primary`     | `text.tertiary`    | `text.primary`     |
| `input.placeholder`      | `text.tertiary`    | `text.tertiary`    | `text.tertiary`    | `text.tertiary`    | `text.tertiary`    |
| `input.icon`             | `text.secondary`   | `text.primary`     | `accent.default`   | `text.tertiary`    | `status.error`     |
| `input.radius`           | `radius.md`        | —                  | —                  | —                  | —                  |
| `input.padding-x`        | `space.3`          | —                  | —                  | —                  | —                  |
| `input.padding-y`        | `space.2`          | —                  | —                  | —                  | —                  |
| `input.height`           | `36px`             | —                  | —                  | —                  | —                  |
| `input.font-size`        | `font.size.md`     | —                  | —                  | —                  | —                  |
| `input.label.font-size`  | `font.size.sm`     | —                  | —                  | —                  | —                  |
| `input.label.font-weight`| `font.weight.medium`| —                 | —                  | —                  | —                  |
| `input.helper.font-size` | `font.size.xs`     | —                  | —                  | —                  | —                  |
| `input.helper.color`     | `text.secondary`   | —                  | —                  | —                  | `status.error`     |

### Dropdown / Select

| Token                            | Value                              |
| -------------------------------- | ---------------------------------- |
| `dropdown.trigger.*`             | Inherits all `input.*` tokens above|
| `dropdown.chevron.size`          | `16px`                             |
| `dropdown.chevron.color`         | `text.secondary`                   |
| `dropdown.menu.bg`               | `surface.primary`                  |
| `dropdown.menu.border`           | `border.default`                   |
| `dropdown.menu.radius`           | `radius.md`                        |
| `dropdown.menu.shadow`           | `shadow.dropdown`                  |
| `dropdown.menu.max-height`       | `280px`                            |
| `dropdown.menu.padding`          | `space.1`                          |
| `dropdown.item.padding-x`        | `space.3`                          |
| `dropdown.item.padding-y`        | `space.2`                          |
| `dropdown.item.radius`           | `radius.sm`                        |
| `dropdown.item.font-size`        | `font.size.md`                     |
| `dropdown.item.color`            | `text.primary`                     |
| `dropdown.item.hover-bg`         | `accent.subtle`            |
| `dropdown.item.selected-bg`      | `accent.subtle`            |
| `dropdown.item.selected-color`   | `accent.default`                   |
| `dropdown.item.selected-icon`    | Checkmark, `accent.default`        |
| `dropdown.item.disabled-color`   | `text.tertiary`                    |
| `dropdown.divider.color`         | `border.default`                   |
| `dropdown.divider.margin-y`      | `space.1`                          |

### Slider / Range

| Token                       | Value                              |
| --------------------------- | ---------------------------------- |
| `slider.track.height`       | `4px`                              |
| `slider.track.radius`       | `radius.full`                      |
| `slider.track.bg`           | `gray.200` / `gray.700` (dark)     |
| `slider.track.fill`         | `accent.default`                   |
| `slider.track.fill-disabled`| `gray.300`                         |
| `slider.thumb.size`         | `18px`                             |
| `slider.thumb.bg`           | `accent.default`                   |
| `slider.thumb.border`       | `2px solid surface.primary`        |
| `slider.thumb.shadow`       | `shadow.sm`                        |
| `slider.thumb.hover-scale`  | `1.15`                             |
| `slider.thumb.active-scale` | `1.0`                              |
| `slider.thumb.focus-ring`   | `0 0 0 3px accent.subtle`  |
| `slider.thumb.disabled-bg`  | `gray.300`                         |
| `slider.label.font-size`    | `font.size.sm`                     |
| `slider.value.font-size`    | `font.size.sm`                     |
| `slider.value.font-weight`  | `font.weight.semibold`             |
| `slider.tick.height`        | `6px`                              |
| `slider.tick.width`         | `1px`                              |
| `slider.tick.color`         | `gray.300`                         |
| `slider.thumb-label.position` | `above thumb` (absolute, centered) |
| `slider.thumb-label.font`   | `type.body` (primary, base, regular) |
| `slider.thumb-label.color`  | `text.primary`                     |
| `slider.endpoint.font`      | `type.overline` (primary, xs, semibold, wide) |
| `slider.endpoint.color`     | `text.tertiary`                    |
| `slider.endpoint.text-transform` | `uppercase`                    |
| `slider.track.margin-x`     | `space.2` (inset from endpoint labels) |

### Toggle / Switch

| Token              | Off        | On               | Disabled   |
| ------------------ | ---------- | ---------------- | ---------- |
| `toggle.track.bg`  | `gray.300` | `accent.default` | `gray.200` |
| `toggle.track.width`| `36px`    | —                | —          |
| `toggle.track.height`| `20px`   | —                | —          |
| `toggle.track.radius`| `radius.full`| —            | —          |
| `toggle.thumb.size`| `16px`     | —                | `16px`     |
| `toggle.thumb.bg`  | `surface.primary` | `surface.primary` | `gray.100` |
| `toggle.thumb.shadow`| `shadow.sm`| `shadow.sm`    | none       |
| `toggle.thumb.offset-x`| `2px` | `18px`           | —          |

### Checkbox & Radio

| Token                    | Value                                          |
| ------------------------ | ---------------------------------------------- |
| `checkbox.size`          | `18px`                                         |
| `checkbox.radius`        | `radius.sm` (checkbox), `radius.full` (radio)  |
| `checkbox.border`        | `1.5px solid border.strong`                    |
| `checkbox.border-checked`| `1.5px solid accent.default`                   |
| `checkbox.bg`            | `surface.primary`                              |
| `checkbox.bg-checked`    | `accent.default`                               |
| `checkbox.icon-color`    | `surface.primary`                              |
| `checkbox.icon-size`     | `12px`                                         |
| `checkbox.focus-ring`    | `0 0 0 3px accent.subtle`              |
| `checkbox.gap`           | `space.2`                                      |
| `checkbox.label.font-size`| `font.size.md`                                |

### Segmented Control / Tab Selector

| Token                           | Value              |
| ------------------------------- | ------------------ |
| `segmented.bg`                  | `surface.secondary`|
| `segmented.radius`              | `radius.md`        |
| `segmented.padding`             | `space.1`          |
| `segmented.item.padding-x`     | `space.4`          |
| `segmented.item.padding-y`     | `space.2`          |
| `segmented.item.radius`        | `radius.sm`        |
| `segmented.item.font-size`     | `font.size.sm`     |
| `segmented.item.font-weight`   | `font.weight.medium`|
| `segmented.item.color`         | `text.secondary`   |
| `segmented.item.active-bg`     | `surface.primary`  |
| `segmented.item.active-color`  | `text.primary`     |
| `segmented.item.active-shadow` | `shadow.sm`        |

### Date Picker

| Token                           | Value              |
| ------------------------------- | ------------------ |
| `datepicker.trigger.*`          | Inherits `input.*` tokens |
| `datepicker.calendar.bg`        | `surface.primary`  |
| `datepicker.calendar.shadow`    | `shadow.dropdown`  |
| `datepicker.calendar.radius`    | `radius.lg`        |
| `datepicker.calendar.padding`   | `space.4`          |
| `datepicker.header.font-size`   | `font.size.md`     |
| `datepicker.header.font-weight` | `font.weight.semibold`|
| `datepicker.nav-icon.size`      | `20px`             |
| `datepicker.day.size`           | `32px`             |
| `datepicker.day.font-size`      | `font.size.sm`     |
| `datepicker.day.radius`         | `radius.full`      |
| `datepicker.day.hover-bg`       | `accent.subtle`|
| `datepicker.day.selected-bg`    | `accent.default`   |
| `datepicker.day.selected-color` | `text.inverse`     |
| `datepicker.day.today-border`   | `1px solid accent.default`|
| `datepicker.day.outside-color`  | `text.tertiary`    |
| `datepicker.range-bg`           | `accent.subtle`|

### Card

> The base container for dashboard panels, chart wrappers, and content groups.

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `card.bg`                      | `surface.secondary`|
| `card.border`                  | `1px solid border.default` |
| `card.radius`                  | `radius.lg`        |
| `card.shadow`                  | `shadow.md`        |
| `card.padding`                 | `space.6`          |
| `card.hover-border`            | `border.strong`    |
| `card.hover-shadow`            | `shadow.lg`        |
| `card.transition`              | `200ms ease`       |
| `card.header.padding-bottom`   | `space.4`          |
| `card.header.border-bottom`    | `1px solid border.default` |
| `card.header.title.font-size`  | `font.size.lg`     |
| `card.header.title.font-weight`| `font.weight.semibold` |
| `card.body.padding-y`          | `space.4`          |
| `card.footer.padding-top`      | `space.4`          |
| `card.footer.border-top`       | `1px solid border.default` |

### KPI Card

> Hero metric display with trend indicator. Extends `card.*` tokens.

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `kpi.value.font-size`          | `font.size.4xl`    |
| `kpi.value.font-weight`        | `font.weight.bold` |
| `kpi.value.font-family`        | `font.family.primary` |
| `kpi.value.color`              | `text.primary`     |
| `kpi.value.color-positive`     | `data.positive`    |
| `kpi.value.color-negative`     | `data.negative`    |
| `kpi.value.color-accent`       | `accent.default`   |
| `kpi.value.color-warning`      | `status.warning`   |
| `kpi.value.letter-spacing`     | `tight`            |
| `kpi.subtitle.font-size`       | `font.size.sm`     |
| `kpi.subtitle.color`           | `text.secondary`   |
| `kpi.subtitle.margin-top`      | `space.1`          |
| `kpi.trend.font-size`          | `font.size.xs`     |
| `kpi.trend.font-weight`        | `font.weight.semibold` |
| `kpi.trend.font-family`        | `font.family.primary` |
| `kpi.trend.positive-color`     | `data.positive`    |
| `kpi.trend.negative-color`     | `data.negative`    |
| `kpi.trend.neutral-color`      | `data.neutral`     |
| `kpi.trend.arrow-size`         | `12px`             |
| `kpi.trend.badge-padding`      | `space.1 space.2` (4px 8px) |
| `kpi.trend.badge-radius`       | `radius.sm` (4px)  |
| `kpi.trend.badge-bg-positive`  | `data.positive-subtle` |
| `kpi.trend.badge-bg-negative`  | `data.negative-subtle` |
| `kpi.sparkline.height`         | `chart.sparkline.height` |
| `kpi.sparkline.margin-top`     | `space.3`          |

### Badge / Chip

> **Shape rule:** Badges and data value chips always use `radius.sm` (4px) — rounded rectangles, never pills. This visually distinguishes non-interactive status indicators from pill-shaped interactive buttons (`radius.full`).

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `badge.height-sm`              | `20px`             |
| `badge.height-md`              | `24px`             |
| `badge.height-lg`              | `28px`             |
| `badge.padding`                | `space.1 space.2` (4px 8px) |
| `badge.radius`                 | `radius.sm` (4px)  |
| `badge.font-size`              | `font.size.xs`     |
| `badge.font-weight`            | `font.weight.semibold` |
| `badge.icon-size`              | `12px`             |
| `badge.icon-gap`               | `space.1`          |
| `badge.positive.bg`            | `data.positive-subtle` |
| `badge.positive.text`          | `data.positive`    |
| `badge.negative.bg`            | `data.negative-subtle` |
| `badge.negative.text`          | `data.negative`    |
| `badge.neutral.bg`             | `surface.tertiary` |
| `badge.neutral.text`           | `text.secondary`   |
| `badge.accent.bg`              | `accent.subtle` |
| `badge.accent.text`            | `accent.default`   |

### Button

| Token                          | Primary              | Secondary                    | Ghost                              | Destructive                  |
| ------------------------------ | -------------------- | ---------------------------- | ---------------------------------- | ---------------------------- |
| `button.*.bg`                  | `accent.default`     | `transparent`                | `transparent`                      | `destructive.default`        |
| `button.*.text`                | `text.on-accent`     | `text.accent`                | `text.secondary`                   | `text.on-destructive`        |
| `button.*.icon`                | `text.on-accent`     | `icon.accent`                | `text.secondary`                   | `icon.on-destructive`        |
| `button.*.border`              | `none`               | `1px solid border.accent`    | `none`                             | `none`                       |
| `button.*.hover-bg`            | `accent.hover`       | `accent.subtle`              | `surface.tertiary`                 | `destructive.hover`          |
| `button.*.hover-text`          | `text.on-accent`     | `text.accent-hover`          | `text.accent-hover`                | `text.on-destructive`        |
| `button.*.hover-icon`          | `text.on-accent`     | `icon.accent-hover`          | `icon.accent-hover`                | `icon.on-destructive`        |
| `button.*.active-bg`           | `accent.pressed`     | `accent.subtle`              | `surface.tertiary`                 | `destructive.pressed`        |
| `button.*.active-text`         | `text.on-accent`     | `text.accent-pressed`        | `text.accent-pressed`              | `text.on-destructive`        |
| `button.*.active-icon`         | `text.on-accent`     | `icon.accent-pressed`        | `icon.accent-pressed`              | `icon.on-destructive`        |
| `button.*.disabled-opacity`    | `0.38`               | `0.38`                       | `0.38`                             | `0.38`                       |

> **Icon-only buttons** (`IconBtn/Primary | Secondary | Ghost | Destructive`) inherit the same colour mapping; size variants (`md` 36×36, `sm` 28×28) keep `radius.full` and the same focus ring.

| Token                          | Value (all variants) |
| ------------------------------ | -------------------- |
| `button.height-sm`             | `28px`               |
| `button.height-md`             | `36px`               |
| `button.height-lg`             | `44px`               |
| `button.padding-sm`            | `space.2 space.3`    |
| `button.padding-md`            | `space.2 space.4`    |
| `button.padding-lg`            | `space.3 space.6`    |
| `button.radius`                | `radius.full`        |
| `button.font-size-sm`          | `font.size.sm`       |
| `button.font-size-md`          | `font.size.base`     |
| `button.font-size-lg`          | `font.size.md`       |
| `button.font-weight`           | `font.weight.semibold` |
| `button.icon-size`             | `16px`               |
| `button.icon-gap`              | `space.2`            |
| `button.focus-ring`            | `0 0 0 3px accent.subtle` |
| `button.active-scale`          | `0.98`               |
| `button.transition`            | `150ms ease`         |

### Number Input / Stepper

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `numberinput.height`           | `36px`             |
| `numberinput.font-family`      | `font.family.primary` |
| `numberinput.font-size`        | `font.size.base`   |
| `numberinput.text-align`       | `right`            |
| `numberinput.border`           | inherits `input.border` |
| `numberinput.radius`           | `radius.md`        |
| `numberinput.padding`          | `space.2 space.3`  |
| `numberinput.stepper-width`    | `28px`             |
| `numberinput.stepper-bg`       | `transparent`      |
| `numberinput.stepper-hover-bg` | `surface.tertiary` |
| `numberinput.stepper-icon-size`| `12px`             |
| `numberinput.stepper-icon-color`| `text.secondary`  |
| `numberinput.stepper-border`   | `1px solid border.default` |
| `numberinput.stepper-radius`   | `radius.sm`        |

### Progress / Meter Bar

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `progress.height`              | `6px`              |
| `progress.height-lg`           | `10px`             |
| `progress.radius`              | `radius.full`      |
| `progress.track-bg`            | `gray.200` / `gray.700` (dark) |
| `progress.fill-bg`             | `accent.default`   |
| `progress.fill-positive`       | `data.positive`    |
| `progress.fill-warning`        | `status.warning`   |
| `progress.fill-error`          | `status.error`     |
| `progress.fill-animation`      | `300ms ease-out`   |
| `progress.label.font-size`     | `font.size.xs`     |
| `progress.label.font-family`   | `font.family.primary` |
| `progress.label.color`         | `text.secondary`   |
| `progress.label.placement`     | `right` (default)  |
| `progress.milestone.size`      | `4px`              |
| `progress.milestone.color`     | `gray.400`         |
| `progress.milestone.radius`    | `radius.full`      |

### Alert / Banner

**Shared tokens (all variants):**

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `alert.padding`                | `space.3 space.4` (12px 16px) |
| `alert.radius`                 | `radius.md` (8px)  |
| `alert.border-left-width`      | `4px`              |
| `alert.font-size`              | `font.size.sm` (13px) |
| `alert.title.font-weight`      | `weight.semibold` (500) |
| `alert.title.margin-bottom`    | `2px`              |
| `alert.body.font-size`         | `12px`             |
| `alert.body.color`             | `text.secondary` (subtle) / `rgba(255,255,255,0.85)` (filled) |
| `alert.icon-size`              | `16px`             |
| `alert.icon-gap`               | `space.3` (12px)   |
| `alert.dismiss-size`           | `16px`             |
| `alert.dismiss-color`          | `text.tertiary`    |
| `alert.button.padding`         | `4px 12px`         |
| `alert.button.font-size`       | `12px`             |
| `alert.button.radius`          | `radius.full`      |
| `alert.button.border`          | `1px solid` matching status color |

**Status variants — subtle (left-border accent, tinted background):**

| Token                          | Info               | Success            | Warning            | Error              |
| ------------------------------ | ------------------ | ------------------ | ------------------ | ------------------ |
| `alert.{status}.bg`            | `status.info-bg` | `status.success-bg` | `status.warning-bg` | `status.error-bg` |
| `alert.{status}.border`        | `status.info`      | `status.success`   | `status.warning`   | `status.error`     |
| `alert.{status}.icon-color`    | `status.info`      | `status.success`   | `status.warning`   | `status.error`     |
| `alert.{status}.button-color`  | `status.info`      | `status.success`   | `status.warning`   | `status.error`     |

**Layout variants:** title+description, description-only, with action button, with dismiss (×) icon.

**Icon mapping:** Info → circled "i", Success → circled checkmark, Warning → triangle, Error → circled ×. All 16×16 SVG, 1.5px stroke.

### Modal / Dialog

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `modal.width-sm`               | `400px`            |
| `modal.width-md`               | `560px`            |
| `modal.width-lg`               | `720px`            |
| `modal.padding`                | `space.6`          |
| `modal.radius`                 | `radius.xl`        |
| `modal.shadow`                 | `shadow.lg`        |
| `modal.bg`                     | `surface.primary`  |
| `modal.backdrop-bg`            | `surface.overlay`  |
| `modal.backdrop-blur`          | `4px`              |
| `modal.header.font-size`       | `font.size.lg`     |
| `modal.header.font-weight`     | `font.weight.semibold` |
| `modal.header.padding-bottom`  | `space.4`          |
| `modal.header.border-bottom`   | `1px solid border.default` |
| `modal.body.padding-y`         | `space.4`          |
| `modal.footer.padding-top`     | `space.4`          |
| `modal.footer.border-top`      | `1px solid border.default` |
| `modal.close-icon-size`        | `20px`             |
| `modal.close-icon-color`       | `text.tertiary`    |
| `modal.animation.entrance`     | `200ms ease-out (fade + scale 0.95→1)` |
| `modal.animation.exit`         | `150ms ease-in`    |

### Popover

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `popover.max-width`            | `320px`            |
| `popover.padding`              | `space.3`          |
| `popover.radius`               | `radius.md`        |
| `popover.shadow`               | `shadow.dropdown`  |
| `popover.bg`                   | `surface.primary`  |
| `popover.border`               | `1px solid border.default` |
| `popover.arrow-size`           | `8px`              |
| `popover.arrow-offset`         | `12px`             |
| `popover.animation`            | `150ms ease-out (fade + translate-y 4px→0)` |
| `popover.z-index`              | `1000`             |

### Tab Bar

> Full-width navigation tabs with underline indicator. Distinct from `segmented.*` (pill-style toggle).

| Token                          | Value              |
| ------------------------------ | ------------------ |
| `tabs.border-bottom`           | `1px solid border.default` |
| `tabs.indicator.height`        | `2px`              |
| `tabs.indicator.color`         | `accent.default`   |
| `tabs.indicator.radius`        | `radius.full`      |
| `tabs.indicator.animation`     | `200ms ease`       |
| `tabs.item.padding-x`          | `space.4`          |
| `tabs.item.padding-y`          | `space.3`          |
| `tabs.item.font-size`          | `font.size.sm`     |
| `tabs.item.font-weight`        | `font.weight.regular` |
| `tabs.item.color`              | `text.secondary`   |
| `tabs.item.hover-color`        | `text.primary`     |
| `tabs.item.active-color`       | `accent.default`   |
| `tabs.item.active-font-weight` | `font.weight.semibold` |
| `tabs.item.gap`                | `space.1`          |
| `tabs.item.icon-size`          | `16px`             |

### Step Indicator / Wizard

> Multi-step flows: onboarding, contribution setup, rebalance confirmation, account opening.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `stepper.orientation`              | `horizontal` (default), `vertical` |
| `stepper.step-size`                | `32px`             |
| `stepper.step-font-size`           | `font.size.sm`     |
| `stepper.step-font-weight`         | `font.weight.semibold` |
| `stepper.connector-height`         | `2px`              |
| `stepper.connector-gap`            | `0px` (flush to circle) |
| `stepper.step-gap`                 | `space.2`          |
| `stepper.label.font-size`          | `font.size.sm`     |
| `stepper.label.max-width`          | `120px`            |
| `stepper.pending.bg`               | `surface.tertiary` |
| `stepper.pending.border`           | `border.default`   |
| `stepper.pending.text`             | `text.tertiary`    |
| `stepper.pending.connector`        | `border.default`   |
| `stepper.active.bg`                | `accent.default`   |
| `stepper.active.border`            | `accent.default`   |
| `stepper.active.text`              | `#FFFFFF`          |
| `stepper.active.label-color`       | `text.primary`     |
| `stepper.active.label-weight`      | `font.weight.semibold` |
| `stepper.active.connector`         | `accent.default`   |
| `stepper.complete.bg`              | `accent.default`   |
| `stepper.complete.border`          | `accent.default`   |
| `stepper.complete.icon`            | `#FFFFFF` (checkmark, 14px) |
| `stepper.complete.connector`       | `accent.default`   |
| `stepper.complete.label-color`     | `text.secondary`   |
| `stepper.error.bg`                 | `status.error`     |
| `stepper.error.border`             | `status.error`     |
| `stepper.error.icon`               | `#FFFFFF` (×, 14px) |

### Comparison Table

> Side-by-side scenario analysis: Roth conversion vs. no conversion, portfolio A vs. B, tax strategy outcomes.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `comparison.header.bg`             | `surface.secondary` |
| `comparison.header.font-weight`    | `font.weight.semibold` |
| `comparison.scenario-label.font-size`| `font.size.md`   |
| `comparison.scenario-label.font-weight`| `font.weight.bold` |
| `comparison.divider`               | `2px solid border.strong` |
| `comparison.delta-column.width`    | `80px`             |
| `comparison.delta-column.bg`       | `surface.tertiary` |
| `comparison.delta-positive.color`  | `data.positive`    |
| `comparison.delta-negative.color`  | `data.negative`    |
| `comparison.delta-neutral.color`   | `data.neutral`     |
| `comparison.delta-positive.bg`     | `data.positive-subtle` |
| `comparison.delta-negative.bg`     | `data.negative-subtle` |
| `comparison.delta.font-family`     | `font.family.primary` |
| `comparison.delta.font-size`       | `font.size.sm`     |
| `comparison.highlight-row.bg`      | `accent.subtle` |
| `comparison.winner-badge.radius`   | `radius.sm` (4px)  |
| `comparison.winner-badge.font-size`| `font.size.xs`     |
| `comparison.winner-badge.color`    | `data.positive`    |
| `comparison.winner-badge.bg`       | `data.positive-subtle` |

### Sparkline-in-Table

> Inline mini-charts embedded in table cells for per-row trend visualization (e.g., 7d/30d holding performance).

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `table.sparkline.width`            | `64px`             |
| `table.sparkline.height`           | `24px`             |
| `table.sparkline.stroke-width`     | `1.5px`            |
| `table.sparkline.positive-color`   | `data.positive`    |
| `table.sparkline.negative-color`   | `data.negative`    |
| `table.sparkline.neutral-color`    | `text.tertiary`    |
| `table.sparkline.area-fill-opacity`| `0.05`             |
| `table.sparkline.endpoint-dot`     | `2px` radius       |
| `table.sparkline.cell-padding`     | `space.2 space.3`  |
| `table.sparkline.align`            | `center`           |

### Timeline Scrubber

> Dual-handle range component used to visualize and control time-based events on a chart (e.g., stock option exercise/sale dates, Roth conversion windows, rebalance periods). Sits below the chart and is spatially linked to the x-axis. Unlike a form slider, this is a *chart companion component* — it shows phases, milestones, and event labels along a temporal track.

**Track:**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.track.height`            | `4px`              |
| `timeline.track.bg`               | `gray.200` / `gray.600` (dark) |
| `timeline.track.radius`            | `radius.full`      |
| `timeline.track.margin-top`        | `space.4` (below legend) |

**Range fill (highlighted segment between handles):**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.range.fill`              | `accent.subtle` / `cat-N` at `0.20` |
| `timeline.range.fill-opacity`      | `0.25`             |
| `timeline.range.border`            | `none`             |
| `timeline.range.height`            | `timeline.track.height` (matches track) |

> The range fill can use `accent.subtle` for single-color timelines, or interpolate between two `cat-N` handle colors for multi-event timelines. Keep opacity low so the track baseline remains visible.

**Handles (draggable event markers):**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.handle.size`             | `14px`             |
| `timeline.handle.border`           | `2px solid surface.primary` |
| `timeline.handle.shadow`           | `shadow.sm`        |
| `timeline.handle.radius`           | `radius.full`      |
| `timeline.handle.hover-scale`      | `1.2`              |
| `timeline.handle.active-scale`     | `1.0`              |
| `timeline.handle.focus-ring`       | `0 0 0 3px` handle color at `0.25` |
| `timeline.handle.cursor`           | `grab` / `grabbing` |

> Each handle gets its own semantic color via a `color` prop — not a single shared token. For a stock option calculator: Exercise handle = `accent.default`, Sale handle = `cat-5` (teal). This allows at-a-glance identification of which event each dot represents.

**Handle color assignment (by event type):**

| Event Type       | Handle Color       | Usage                          |
| ---------------- | ------------------ | ------------------------------ |
| `exercise`       | `accent.default`   | Option exercise date           |
| `sale`           | `cat-5`            | Stock sale / liquidity event   |
| `conversion`     | `cat-2`            | Roth conversion window         |
| `rebalance`      | `cat-3`            | Portfolio rebalance trigger    |
| `vest`           | `cat-7`            | Vesting cliff / milestone      |
| `custom`         | `cat-8`            | User-defined event             |

**Milestone labels (pill-style, anchored to track):**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.label.font-size`         | `font.size.xs` (11px) |
| `timeline.label.font-weight`       | `font.weight.medium` |
| `timeline.label.padding`           | `space.1 space.2` (4px 8px) |
| `timeline.label.radius`            | `radius.sm` (6px)  |
| `timeline.label.bg`                | Handle color at `0.10` opacity |
| `timeline.label.border`            | Handle color at `0.25` opacity, `1px` |
| `timeline.label.text-color`        | Handle color (full) |
| `timeline.label.offset-y`          | `-24px` (above track) or `8px` (below) |
| `timeline.label.connector-width`   | `1px`              |
| `timeline.label.connector-color`   | Handle color at `0.30` |
| `timeline.label.connector-style`   | `solid`            |
| `timeline.label.font-family`       | `font.family.primary` |
| `timeline.label.date-font-family`  | `font.family.primary` |

> Label format: stacked two-line pill — event name on line 1, date on line 2 (e.g., "Exercise:" / "Sep '27"). Uses `font.family.primary` throughout; add `font-variant-numeric: tabular-nums` for date alignment. Text is centered within the pill with `white-space: nowrap` to prevent additional line wrapping. Pills are positioned with `bottom: 21px` inside the scrubber track, centered on their handle's x-position via `transform: translateX(-50%)`. This stacked format prevents overlap at narrow widths while keeping labels visually connected to their markers.

**Phase segments (named regions between milestones):**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.phase.font-size`         | `font.size.xs` (11px) |
| `timeline.phase.font-weight`       | `font.weight.regular` |
| `timeline.phase.color`             | `text.tertiary`    |
| `timeline.phase.text-transform`    | `none`             |
| `timeline.phase.align`             | `center` (within phase span) |
| `timeline.phase.offset-y`          | `12px` (below track) |

> Phase names describe the period between two milestones: "Cliff", "Vesting", "Hold Period", "LTCG Window". Positioned centered below the track segment they describe.

**Vertical event connector (links scrubber to chart):**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.connector.width`         | `1px`              |
| `timeline.connector.color`         | Handle color at `0.40` |
| `timeline.connector.style`         | `dashed`           |
| `timeline.connector.dash-array`    | `4 3`              |

> Dashed vertical line extends from the timeline handle upward through the full chart height, visually linking the scrubber position to the chart data. Uses the same color as the handle it connects to.

**Chart-area event labels (above the chart):**

> Plain text labels ("Exercise", "Sale") are positioned inside the chart area div using `position: absolute` at the same `left` percentage as their corresponding event marker line, with `top: -18px` and `transform: translateX(-50%)`. This ensures labels track their markers at any viewport width.

**Layout:**

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `timeline.width`                   | `100%` (matches chart plot area) |
| `timeline.padding-x`              | Aligns with `chart.padding.left` / `chart.padding.right` |
| `timeline.gap-to-chart`            | `space.3` (12px above legend, or directly below chart if no legend) |
| `timeline.min-width`               | `390px`            |

---

## 3. Data Visualization Tokens

> **Chart background rule:** In light mode, charts render on `#FFFFFF` (surface.primary). In dark mode, charts use the dark surface.primary. Chart containers always use `background: var(--surface-primary)` — never gray or tinted surfaces.
>
> **Chart text scaling rule:** Chart text (axis labels, titles, annotations) must NEVER scale with the chart. Use fixed pixel dimensions on SVGs (`width="460" height="220"`) instead of `width:100%;height:auto`. Wrap in `overflow-x:auto` if the chart may exceed the container width.

### Area Chart

| Token                              | Value            |
| ---------------------------------- | ---------------- |
| `chart.area.stroke-width`          | `2px`            |
| `chart.area.fill-opacity`          | `0.15`           |
| `chart.area.fill-opacity-hover`    | `0.25`           |
| `chart.area.gradient-start-opacity`| `0.25`           |
| `chart.area.gradient-end-opacity`  | `0.02`           |
| `chart.area.dots`                  | `none`           |

> **Area chart dots:** Area charts never show data point dots. The line and gradient fill are sufficient.
| `chart.area.curve-type`            | `monotoneX`      |

### Bar Chart

| Token                       | Value                            |
| --------------------------- | -------------------------------- |
| `chart.bar.radius`          | `0px` (no corner radius)         |
| `chart.bar.gap-ratio`       | `0.3` (30% of category width)    |
| `chart.bar.group-gap-ratio` | `0.15` (15% between grouped bars)|
| `chart.bar.min-width`       | `4px`                            |
| `chart.bar.hover-opacity`   | `0.8`                            |
| `chart.bar.inactive-opacity`| `0.3`                            |

### Shared Chart Tokens

| Token                           | Light Value         | Dark Value          |
| ------------------------------- | ------------------- | ------------------- |
| `chart.axis.line-color`         | `gray.300`          | `gray.600`          |
| `chart.axis.line-width`         | `1px`               | `1px`               |
| `chart.axis.label.font-size`    | `font.size.xs`      | `font.size.xs`      |
| `chart.axis.label.color`        | `text.secondary`    | `text.secondary`    |
| `chart.axis.label.font-weight`  | `font.weight.regular`| `font.weight.regular`|
| `chart.axis.title.font-size`    | `font.size.sm`      | `font.size.sm`      |
| `chart.axis.title.font-weight`  | `font.weight.medium`| `font.weight.medium`|
| `chart.axis.title.color`        | `text.primary`      | `text.primary`      |

#### Secondary Axis (Dual Y-Axis)

> Used when a chart has two Y-axes with different units (e.g., dollar value on the left, stock price on the right). The secondary axis is visually subordinate to the primary axis to establish clear hierarchy.

| Token                                  | Light Value         | Dark Value          |
| -------------------------------------- | ------------------- | ------------------- |
| `chart.axis.secondary.line-color`      | `gray.200`          | `gray.700`          |
| `chart.axis.secondary.line-width`      | `1px`               | `1px`               |
| `chart.axis.secondary.line-style`      | `dashed`            | `dashed`            |
| `chart.axis.secondary.line-dash`       | `4 3`               | `4 3`               |
| `chart.axis.secondary.label.font-size` | `font.size.xs`      | `font.size.xs`      |
| `chart.axis.secondary.label.color`     | `text.tertiary`     | `text.tertiary`     |
| `chart.axis.secondary.label.font-weight`| `font.weight.regular`| `font.weight.regular`|
| `chart.axis.secondary.title.font-size` | `font.size.xs`      | `font.size.xs`      |
| `chart.axis.secondary.title.color`     | `text.tertiary`     | `text.tertiary`     |
| `chart.axis.secondary.title.font-weight`| `font.weight.regular`| `font.weight.regular`|
| `chart.axis.secondary.position`        | `right`             | `right`             |

> The secondary axis uses `text.tertiary` for labels and an optional dashed axis line. This visual demotion prevents it from competing with the primary axis for attention. Grid lines are drawn from the primary axis only — never both — to avoid visual clutter.

| `chart.grid.line-color`         | `gray.100`          | `gray.800`          |
| `chart.grid.line-width`         | `1px`               | `1px`               |
| `chart.grid.line-style`         | `dashed`            | `dashed`            |
| `chart.grid.line-dash`          | `4 4`               | `4 4`               |
| `chart.tick.length`             | `4px`               | `4px`               |
| `chart.tick.color`              | `gray.300`          | `gray.600`          |
| `chart.padding.top`             | `space.4`           | `space.4`           |
| `chart.padding.right`           | `space.4`           | `space.4`           |
| `chart.padding.bottom`          | `space.8`           | `space.8`           |
| `chart.padding.left`            | `space.10`          | `space.10`          |

### Tooltip

| Token                       | Light Value         | Dark Value          |
| --------------------------- | ------------------- | ------------------- |
| `chart.tooltip.bg`          | `surface.primary`   | `gray.100`          |
| `chart.tooltip.text`        | `text.primary`      | `gray.900`          |
| `chart.tooltip.border`      | `border.default`    | `gray.200`          |
| `chart.tooltip.font-size`   | `font.size.sm`      | `font.size.sm`      |
| `chart.tooltip.line-height` | `1.2`               | `1.2`               |
| `chart.tooltip.padding`     | `6px 10px`          | `6px 10px`          |
| `chart.tooltip.radius`      | `radius.md` (6px)   | `radius.md` (6px)   |
| `chart.tooltip.shadow`      | `shadow.tooltip`    | `shadow.tooltip`    |
| `chart.tooltip.max-width`   | `240px`             | `240px`             |
| `chart.tooltip.swatch-size` | `8px`               | `8px`               |
| `chart.tooltip.swatch-radius`| `radius.full` (circle) | `radius.full` (circle) |
| `chart.tooltip.swatch-alignment`| `flex center` (`display:flex;align-items:center`) | same |
| `chart.tooltip.series-row-gap`| `2px`              | `2px`               |
| `chart.tooltip.series-label.color`| `text.secondary`| `text.secondary`    |
| `chart.tooltip.series-value.font-family`| `font.family.primary`| `font.family.primary` |
| `chart.tooltip.series-value.font-weight`| `font.weight.semibold`| `font.weight.semibold` |
| `chart.tooltip.header.font-size`| `font.size.xs`   | `font.size.xs`      |
| `chart.tooltip.header.color`   | `text.tertiary`   | `text.tertiary`     |
| `chart.tooltip.header.margin-bottom`| `3px`        | `3px`               |
| `chart.tooltip.divider`        | `1px solid border.default` | `1px solid border.default` |
| `chart.tooltip.divider.margin-bottom` | `4px`     | `4px`               |
| `chart.tooltip.max-height`     | `240px` (scrollable) | `240px`          |
| `chart.tooltip.total-row.font-weight`| `font.weight.bold` | `font.weight.bold` |
| `chart.tooltip.total-row.gap`       | `space.2` (8px)    | `space.2` (8px)    |
| `chart.tooltip.total-row.border-top`| `1px solid border.default` | `1px solid border.default` |
| `chart.tooltip.offset-x`       | `12px`            | `12px`              |
| `chart.tooltip.offset-y`       | `8px`             | `8px`               |
| `chart.tooltip.pointer`        | `none` (no caret) | `none`              |

### Legend

| Token                        | Value                |
| ---------------------------- | -------------------- |
| `chart.legend.font-size`     | `font.size.sm`       |
| `chart.legend.font-weight`   | `font.weight.regular`|
| `chart.legend.color`         | `text.secondary`     |
| `chart.legend.gap`           | `space.4`            |
| `chart.legend.swatch-size`   | `12px`               |
| `chart.legend.swatch-radius` | `radius.sm`          |
| `chart.legend.swatch-gap`    | `space.2`            |
| `chart.legend.placement`     | `bottom` (default), `right`, `top` |
| `chart.legend.max-rows`      | `2` (wraps, then scroll) |
| `chart.legend.item-cursor`   | `pointer` (click-to-toggle) |
| `chart.legend.item-hover-color`| `text.primary`     |
| `chart.legend.inactive-opacity`| `0.35`             |
| `chart.legend.inactive-swatch`| Series color at `0.35` opacity |
| `chart.legend.inactive-text-decoration`| `line-through` |
| `chart.legend.toggle-transition`| `150ms ease-out`  |
| `chart.legend.value.font-family`| `font.family.primary` |
| `chart.legend.value.font-size` | `font.size.xs`     |
| `chart.legend.value.color`    | `text.tertiary`     |

### Threshold & Reference Lines

> Three distinct line types for financial overlays. Each has its own visual treatment so users can distinguish at a glance.

| Token                              | Goal Line          | Benchmark Line     | Limit Line         |
| ---------------------------------- | ------------------ | ------------------ | ------------------ |
| `chart.threshold.*.line-color`     | `status.warning`   | `accent.default`   | `status.error`     |
| `chart.threshold.*.line-width`     | `1.5px`            | `1.5px`            | `2px`              |
| `chart.threshold.*.line-style`     | `dashed`           | `dotted`           | `solid`            |
| `chart.threshold.*.dash-array`     | `6 4`              | `3 3`              | `—`                |
| `chart.threshold.*.label.font-size`| `font.size.xs`     | `font.size.xs`     | `font.size.xs`     |
| `chart.threshold.*.label.color`    | `status.warning`   | `accent.default`   | `status.error`     |
| `chart.threshold.*.label.bg`       | `surface.primary`  | `surface.primary`  | `surface.primary`  |
| `chart.threshold.*.label.padding`  | `space.1 space.2`  | `space.1 space.2`  | `space.1 space.2`  |

### Annotation Callout

| Token                                | Value              |
| ------------------------------------ | ------------------ |
| `chart.annotation.callout-bg`        | `surface.primary`  |
| `chart.annotation.callout-border`    | `border.default`   |
| `chart.annotation.callout-radius`    | `radius.md`        |
| `chart.annotation.callout-shadow`    | `shadow.sm`        |
| `chart.annotation.callout-padding`   | `space.2 space.3`  |
| `chart.annotation.callout-font-size` | `font.size.xs`     |
| `chart.annotation.connector-width`   | `1px`              |
| `chart.annotation.connector-color`   | `gray.400`         |
| `chart.annotation.connector-style`   | `solid`            |
| `chart.annotation.dot-radius`        | `4px`              |
| `chart.annotation.dot-fill`          | `accent.default`   |

### Vertical Event Markers

> Full-height dashed vertical lines that mark specific time-based events on a chart (exercise dates, sale dates, conversion windows, vesting cliffs). Unlike horizontal threshold/reference lines which mark *value* targets, vertical event markers mark *time* events. When a timeline scrubber is present below the chart, these lines visually connect the scrubber handles to the chart plot area.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.event.line-width`                 | `1px`              |
| `chart.event.line-style`                 | `dashed`           |
| `chart.event.line-dash`                  | `4 3`              |
| `chart.event.line-opacity`               | `0.50`             |
| `chart.event.label.font-size`            | `font.size.xs` (11px) |
| `chart.event.label.font-weight`          | `font.weight.medium` |
| `chart.event.label.padding`              | `space.1 space.2` (4px 8px) |
| `chart.event.label.radius`               | `radius.sm` (6px)  |
| `chart.event.label.offset-y`             | Top of chart plot area |
| `chart.event.label.bg`                   | Event color at `0.10` |
| `chart.event.label.border`               | Event color at `0.25`, `1px` |
| `chart.event.label.text-color`           | Event color (full) |
| `chart.event.dot.radius`                 | `3px`              |
| `chart.event.dot.fill`                   | Event color        |
| `chart.event.dot.stroke`                 | `surface.primary`  |
| `chart.event.dot.stroke-width`           | `2px`              |

> Each event marker inherits its color from the `timeline.handle` event type mapping (e.g., Exercise = `accent.default`, Sale = `cat-5`). Labels are positioned inside the chart area div with `position: absolute` at the same `left%` as their marker line, using `top: -18px; transform: translateX(-50%)` so they remain centered above their marker at any viewport width. The line extends downward to meet the timeline scrubber. An optional dot at the intersection with a data series provides precise reading.
>
> **Line weight for clip-path strokes:** Use a 1% vertical gap between top and bottom polygon edges (≈1.5px on a 176px chart) for consistent perpendicular thickness across both steep and flat segments. A larger gap (e.g., 2%) causes visible thickness variation on steep slopes.

**Event color assignment:** Reuses the same color mapping as `timeline.handle.*` — see the Timeline Scrubber component in Section 2. This ensures visual continuity between the chart annotations and the scrubber controls.

### Confidence Level Bands

> Maps statistical percentile ranges to visual opacity. Used in Monte Carlo simulations, probability cones, and forecast bands. Bands layer from widest (faintest) to narrowest (most opaque).

| Token                            | Fill Opacity | Border Opacity | Usage                          |
| -------------------------------- | ------------ | -------------- | ------------------------------ |
| `chart.confidence.99`            | `0.06`       | `0`            | 99th percentile — widest band  |
| `chart.confidence.95`            | `0.08`       | `0`            | 95th percentile                |
| `chart.confidence.90`            | `0.12`       | `0.15`         | 90th percentile (common)       |
| `chart.confidence.75`            | `0.18`       | `0.20`         | 75th percentile                |
| `chart.confidence.50`            | `0.25`       | `0.30`         | 50th percentile — narrowest    |
| `chart.confidence.median-width`  | `2.5px`      | —              | Median (P50) line stroke       |
| `chart.confidence.median-style`  | `solid`      | —              | Median line style              |
| `chart.confidence.endpoint-dot`  | `5px`        | —              | Dot radius at band endpoints   |
| `chart.confidence.endpoint-fill` | `accent.default` | —          | Endpoint dot fill color        |
| `chart.confidence.endpoint-stroke`| `surface.primary`| —         | Endpoint dot border color      |
| `chart.confidence.layer-order`   | widest first | —              | Visual stacking: 99 → 50       |

### Data Point States

> Universal states for any interactive chart element — dots, bars, bubbles, etc.

| Token                              | Default            | Hover              | Selected           | Disabled           |
| ---------------------------------- | ------------------ | ------------------ | ------------------ | ------------------ |
| `chart.datapoint.opacity`          | `1.0`              | `1.0`              | `1.0`              | `0.38`             |
| `chart.datapoint.scale`            | `1.0`              | `1.2`              | `1.0`              | `1.0`              |
| `chart.datapoint.stroke-width`     | `0`                | `2px`              | `2px`              | `0`                |
| `chart.datapoint.stroke-color`     | `—`                | `surface.primary`  | `accent.default`   | `—`                |
| `chart.datapoint.shadow`           | `none`             | `shadow.sm`        | `shadow.sm`        | `none`             |
| `chart.datapoint.cursor`           | `default`          | `pointer`          | `pointer`          | `not-allowed`      |
| `chart.datapoint.transition`       | `—`                | `150ms ease-out`   | `150ms ease-out`   | `—`                |

### Confidence Bands / Fan Chart

> Used in Monte Carlo simulations and forecast projections. Shows probability distribution over time.

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.band.fill-color`            | `accent.default`                 |
| `chart.band.stroke-color`          | `accent.default`                 |
| `chart.band.curve-type`            | `monotoneX`                      |
| `chart.band.label.font-size`       | `font.size.xs`                   |
| `chart.band.label.font-family`     | `font.family.primary`            |
| `chart.band.label.color`           | `text.secondary`                 |
| `chart.band.label.offset`          | `6px` (outside right edge)       |

> Band fill opacities are defined in `chart.confidence.*` above. Use `chart.threshold.goal` for the target line overlay.

### Donut / Ring Chart

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.donut.inner-radius-ratio`   | `0.6`                            |
| `chart.donut.segment-corner-radius`| `1px` (all four corners of each segment) |
| `chart.donut.segment-gap`          | `2.5deg`                         |
| `chart.donut.segment-stroke-width` | `1px`                            |
| `chart.donut.segment-stroke-opacity`| `1.0` (always full, selected or not) |
| `chart.donut.segment-fill-opacity.default` | `0.1` (unselected / idle)  |
| `chart.donut.segment-fill-opacity.selected`| `1.0`                      |
| `chart.donut.segment-fill-opacity.hover`   | `0.25`                     |
| `chart.donut.hover-scale`          | `1.03` (slight pop on hover)     |
| `chart.donut.hover-shadow`         | `shadow.sm`                      |
| `chart.donut.center-value.font-size`| `font.size.2xl`                 |
| `chart.donut.center-value.font-weight`| `font.weight.bold`            |
| `chart.donut.center-value.font-family`| `font.family.primary`         |
| `chart.donut.center-value.color`   | `text.primary`                   |
| `chart.donut.center-label.font-size`| `font.size.sm`                  |
| `chart.donut.center-label.color`   | `text.secondary`                 |
| `chart.donut.segment-label.font-size`| `font.size.xs`                 |
| `chart.donut.animation.duration`   | `600ms`                          |
| `chart.donut.animation.easing`     | `motion.easing.out`              |

> **Segment rendering rules:**
> Each segment is drawn as an annular sector `<path>` (outer arc → radial edge → inner arc → radial edge → close). Apply a **1 px corner radius** to all four corners using quadratic Bézier curves (inset each corner by `radius / arc-radius` radians on the arc side and `radius` px on the radial side, then `Q` through the true corner point). The **2.5 deg gap** between segments is dead space — no fill, no stroke. Stroke is always `1 px` at `100 %` opacity in the segment's categorical color. When segments are selectable (e.g., clicking to filter), all unselected segments render their fill at `10 %` opacity; the selected segment renders at `100 %` fill opacity. On hover over an unselected segment, fill rises to `25 %` opacity as a preview.

### Sparkline

> Small inline charts for table cells, KPI cards, or dashboard widgets. Minimal ornamentation.

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.sparkline.stroke-width`     | `1.5px`                          |
| `chart.sparkline.height`           | `32px`                           |
| `chart.sparkline.area-fill-opacity`| `0.07`                           |
| `chart.sparkline.area-gradient`    | `linear: fill-color → transparent`|
| `chart.sparkline.endpoint-dot-radius`| `3px`                          |
| `chart.sparkline.endpoint-dot-fill`| series color                     |
| `chart.sparkline.curve-type`       | `monotoneX`                      |
| `chart.sparkline.margin`           | `space.1`                        |
| `chart.sparkline.positive-color`   | `data.positive`                  |
| `chart.sparkline.negative-color`   | `data.negative`                  |

### Scatter / Bubble Chart

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.scatter.dot-size-min`       | `6px`                            |
| `chart.scatter.dot-size-max`       | `48px`                           |
| `chart.scatter.dot-opacity`        | `0.75`                           |
| `chart.scatter.dot-border-width`   | `1.5px`                          |
| `chart.scatter.dot-border-color`   | `surface.primary`                |
| `chart.scatter.hover-scale`        | `1.2`                            |
| `chart.scatter.active-opacity`     | `1.0`                            |
| `chart.scatter.inactive-opacity`   | `0.15`                           |
| `chart.scatter.crosshair`          | `true` (show on hover)           |
| `chart.scatter.quadrant-line-color`| `gray.300`                       |
| `chart.scatter.quadrant-line-style`| `dashed`                         |

### Histogram

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.histogram.bin-gap-ratio`    | `0.05`                           |
| `chart.histogram.bar-radius`       | `0px` (no corner radius)         |
| `chart.histogram.bar-fill`         | `accent.default`                 |
| `chart.histogram.bar-hover-opacity`| `0.85`                           |
| `chart.histogram.bar-inactive-opacity`| `0.3`                         |
| `chart.histogram.goal-fill-above`  | `data.positive` at `0.75` opacity|
| `chart.histogram.goal-fill-below`  | `gray.400` at `0.5` opacity      |
| `chart.histogram.distribution-line`| `2px solid accent.hover` |
| `chart.histogram.distribution-fill`| `accent.default` at `0.08`       |

> Goal-aware coloring: bins above a threshold use `data.positive`, bins below use a muted gray.

### Heatmap

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.heatmap.cell-gap`           | `1px`                            |
| `chart.heatmap.cell-radius`        | `radius.sm`                      |
| `chart.heatmap.cell-min-size`      | `32px`                           |
| `chart.heatmap.text-font-size`     | `font.size.xs`                   |
| `chart.heatmap.text-font-weight`   | `font.weight.semibold`           |
| `chart.heatmap.text-color-on-light`| `#171717`                        |
| `chart.heatmap.text-color-on-dark` | `#FFFFFF`                        |
| `chart.heatmap.text-contrast-threshold` | `0.5` (switch at 50% lightness)|
| `chart.heatmap.color-scale-positive`| sequential ramp `seq.100→seq.700`|
| `chart.heatmap.color-scale-negative`| `#FEE2E2→#B91C1C` (red ramp)    |
| `chart.heatmap.color-scale-diverging`| red → `gray.100` → blue (accent) |
| `chart.heatmap.label-font-size`    | `font.size.xs`                   |
| `chart.heatmap.label-color`        | `text.secondary`                 |

### Grouped & Stacked Bar Chart

| Token                                   | Value                            |
| --------------------------------------- | -------------------------------- |
| `chart.groupedbar.gap-between-groups`   | `0.3` (30% of group width)       |
| `chart.groupedbar.gap-within-group`     | `0.05` (5% between bars)         |
| `chart.stackedbar.segment-gap`          | `0px` (flush segments)           |
| `chart.stackedbar.segment-radius`       | `0px` (no corner radius)         |
| `chart.stackedbar.value-label.font-size`| `font.size.xs`                  |
| `chart.stackedbar.value-label.font-family`| `font.family.primary`         |
| `chart.stackedbar.value-label.color-inside`| auto (light on dark, dark on light)|
| `chart.stackedbar.value-label.color-outside`| `text.secondary`            |
| `chart.stackedbar.value-label.min-segment`| `24px` (hide label if smaller) |
| `chart.stackedbar.total-label.font-size`| `font.size.sm`                  |
| `chart.stackedbar.total-label.font-weight`| `font.weight.semibold`        |

### Line Chart

> Distinct from area chart — no fill below the line. Supports multiple series with varied stroke styles.

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.line.stroke-width`          | `2px`                            |
| `chart.line.stroke-width-thin`     | `1.5px`                          |
| `chart.line.stroke-width-thick`    | `3px`                            |
| `chart.line.stroke-style-solid`    | `solid`                          |
| `chart.line.stroke-style-dashed`   | `dashed` (`6 4`)                 |
| `chart.line.stroke-style-dotted`   | `dotted` (`2 3`)                 |
| `chart.line.curve-type`            | `monotoneX`                      |
| `chart.line.endpoint-dot-radius`   | `4px`                            |
| `chart.line.endpoint-dot-fill`     | series color                     |
| `chart.line.endpoint-dot-stroke`   | `surface.primary`                |
| `chart.line.endpoint-dot-stroke-width`| `2px`                         |
| `chart.line.hover-stroke-width`    | `3px`                            |
| `chart.line.inactive-opacity`      | `0.15`                           |
| `chart.line.marker-radius`         | `0` (hidden by default)          |
| `chart.line.marker-radius-hover`   | `4px`                            |

### Waterfall Chart

> Cash flow analysis, cumulative gain/loss decomposition.

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.waterfall.connector-width`  | `1px`                            |
| `chart.waterfall.connector-style`  | `dashed`                         |
| `chart.waterfall.connector-color`  | `gray.400`                       |
| `chart.waterfall.connector-dash`   | `4 3`                            |
| `chart.waterfall.positive-fill`    | `data.positive`                  |
| `chart.waterfall.negative-fill`    | `data.negative`                  |
| `chart.waterfall.total-fill`       | `accent.default`                 |
| `chart.waterfall.subtotal-fill`    | `accent.default` at `0.6`        |
| `chart.waterfall.bar-radius`       | `0px` (no corner radius)         |
| `chart.waterfall.bar-width-ratio`  | `0.6`                            |
| `chart.waterfall.value-label.font-size`  | `font.size.xs`              |
| `chart.waterfall.value-label.font-family`| `font.family.primary`       |
| `chart.waterfall.value-label.offset`     | `space.1` above bar          |

### Gauge / Meter

> Risk score, portfolio health, probability meters.

| Token                              | Value                            |
| ---------------------------------- | -------------------------------- |
| `chart.gauge.arc-angle`            | `240deg` (start 150°, end 390°)  |
| `chart.gauge.arc-width`            | `12px`                           |
| `chart.gauge.track-color`          | `gray.200` / `gray.700` (dark)   |
| `chart.gauge.track-opacity`        | `0.3`                            |
| `chart.gauge.fill-color`           | `accent.default`                 |
| `chart.gauge.fill-color-warning`   | `status.warning`                 |
| `chart.gauge.fill-color-error`     | `status.error`                   |
| `chart.gauge.needle-width`         | `2px`                            |
| `chart.gauge.needle-color`         | `text.primary`                   |
| `chart.gauge.needle-cap-radius`    | `4px`                            |
| `chart.gauge.center-value.font-size`| `font.size.2xl`                 |
| `chart.gauge.center-value.font-weight`| `font.weight.bold`            |
| `chart.gauge.center-value.font-family`| `font.family.primary`         |
| `chart.gauge.scale-label.font-size`| `font.size.2xs`                  |
| `chart.gauge.scale-label.color`    | `text.tertiary`                  |
| `chart.gauge.min-max-label.font-size`| `font.size.xs`                 |
| `chart.gauge.animation.duration`   | `800ms`                          |
| `chart.gauge.animation.easing`     | `motion.easing.out`              |

### Projected vs. Actual Overlay

> Forecast paths overlaid on historical data — retirement projections, portfolio growth estimates, income forecasts.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.projected.stroke-style`           | `dashed` (`10 5`)  |
| `chart.projected.stroke-width`           | `2px`              |
| `chart.projected.stroke-opacity`         | `0.7`              |
| `chart.projected.fill-opacity`           | `0.05`             |
| `chart.projected.color`                  | `status.warning`   |
| `chart.projected.transition-dot`         | `4px` radius, series color fill |
| `chart.projected.transition-dot-stroke`  | `surface.primary`, `2px` |
| `chart.projected.label`                  | `"Projected"`, `font.weight.medium`, `status.warning`, `font.size.xs` |
| `chart.projected.label.placement`        | `top: 2%; right: 0` (top-right, above projected line) |
| `chart.actual.stroke-style`             | `solid`            |
| `chart.actual.stroke-width`             | `2px`              |
| `chart.actual.stroke-color`             | `cat-1`            |
| `chart.actual.fill-opacity`             | `0.12`             |
| `chart.actual.label`                    | `"Actual"`, `font.weight.medium`, `cat-1`, `font.size.xs` |
| `chart.actual.label.placement`          | `top: 80%; left: 6%` (bottom-left, below actual line) |

### Benchmark / Comparison Line

> Reference lines for indices, targets, or peer averages overlaid on primary chart data.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.benchmark.stroke-color`           | `text.tertiary`    |
| `chart.benchmark.stroke-width`           | `1.5px`            |
| `chart.benchmark.stroke-style`           | `dotted` (`2 3`)   |
| `chart.benchmark.label.font-size`        | `font.size.xs`     |
| `chart.benchmark.label.font-family`      | `font.family.primary` |
| `chart.benchmark.label.color`            | `text.tertiary`    |
| `chart.benchmark.label.placement`        | `right-end` (aligned to last data point) |
| `chart.benchmark.label.bg`              | `surface.primary` at `0.8` |
| `chart.benchmark.label.padding`          | `2px 6px`          |
| `chart.benchmark.label.radius`           | `radius.sm`        |
| `chart.benchmark.hover-stroke-width`     | `2.5px`            |
| `chart.benchmark.hover-label.font-weight`| `font.weight.semibold` |

### Candlestick / OHLC Chart

> Market data visualization — open, high, low, close per time period.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.candlestick.body-width-ratio`     | `0.6`              |
| `chart.candlestick.body-radius`          | `0px`              |
| `chart.candlestick.wick-width`           | `1px`              |
| `chart.candlestick.up-fill`             | `data.positive`    |
| `chart.candlestick.up-stroke`           | `data.positive`    |
| `chart.candlestick.down-fill`           | `data.negative`    |
| `chart.candlestick.down-stroke`         | `data.negative`    |
| `chart.candlestick.flat-color`          | `data.neutral`     |
| `chart.candlestick.hover-opacity`       | `1.0`              |
| `chart.candlestick.inactive-opacity`    | `0.4`              |
| `chart.candlestick.volume-bar-opacity`  | `0.2`              |
| `chart.candlestick.volume-height-ratio` | `0.2` (of chart height) |
| `chart.candlestick.volume-gap`          | `space.2`          |

### Sankey / Flow Diagram

> Money movement visualization — income → expense → savings, account transfers, tax-lot flows.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.sankey.node-width`                | `14px`             |
| `chart.sankey.node-radius`               | `radius.xs` (2px)  |
| `chart.sankey.node-gap`                  | `space.4` (16px)   |
| `chart.sankey.node-color`                | Categorical palette (auto-assigned by index) |
| `chart.sankey.node-label.font-size`      | `font.size.sm`     |
| `chart.sankey.node-label.font-family`    | `font.family.primary` |
| `chart.sankey.node-label.color`          | `text.primary`     |
| `chart.sankey.node-label.gap`            | `space.2`          |
| `chart.sankey.node-value.font-family`    | `font.family.primary` |
| `chart.sankey.node-value.font-size`      | `font.size.xs`     |
| `chart.sankey.node-value.color`          | `text.secondary`   |
| `chart.sankey.link-opacity`              | `0.25`             |
| `chart.sankey.link-hover-opacity`        | `0.6`              |
| `chart.sankey.link-color-method`         | Inherit from source node |
| `chart.sankey.link-curve`                | Cubic Bézier (horizontal) |
| `chart.sankey.min-link-width`            | `1px`              |
| `chart.sankey.layout-padding`            | `space.6`          |
| `chart.sankey.animation.duration`        | `500ms`            |
| `chart.sankey.animation.easing`          | `motion.easing.inOut` |

> **Flow alignment rule:** All outgoing flows from a source node must stack contiguously from the top of the node bar with no gaps. The sum of all outgoing stroke widths must equal the node bar height exactly — rescale stroke widths proportionally if rounding causes a mismatch. Flows arriving at a destination node should stack from the top of that bar as well. This ensures the colored streams tile flush against their solid-color bar headers.

### Treemap

> Hierarchical allocation breakdown — portfolio → sector → industry → holding.

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.treemap.cell-padding`             | `clamp(6px, 1vw, 16px)` — responsive |
| `chart.treemap.cell-radius`              | `radius.sm`        |
| `chart.treemap.cell-stroke`              | `surface.primary`, `2px` |
| `chart.treemap.cell-color`               | Categorical palette (by top-level group) |
| `chart.treemap.depth-opacity-scale`      | Depth 0: `1.0`, Depth 1: `0.7`, Depth 2: `0.45` |
| `chart.treemap.height`                   | `clamp(160px, 22vw, 240px)` — responsive |
| `chart.treemap.label.font-size-lg`       | `clamp(15px, 2.5vw, 24px)` (largest cell, e.g., spans 2 rows) |
| `chart.treemap.label.font-size-md`       | `clamp(12px, 2vw, 18px)` (medium cells) |
| `chart.treemap.label.font-size-sm`       | `clamp(11px, 1.6vw, 16px)` (small cells) |
| `chart.treemap.label.hidden-threshold`   | Cell width < `30px` |
| `chart.treemap.label.color`              | `#FFFFFF` (on saturated fills) |
| `chart.treemap.label.font-weight`        | `font.weight.medium` |
| `chart.treemap.value.font-family`        | `font.family.primary` |
| `chart.treemap.value.font-size`          | Same as label tier (`font-size-lg/md/sm`) — matches label size for legibility |
| `chart.treemap.value.font-weight`        | `font.weight.semibold` (600) |
| `chart.treemap.value.color`              | `rgba(255,255,255,0.9)` |
| `chart.treemap.hover-stroke`             | `#FFFFFF`, `2px`   |
| `chart.treemap.selected-stroke`          | `accent.default`, `2px` |
| `chart.treemap.breadcrumb.font-size`     | `font.size.sm`     |
| `chart.treemap.breadcrumb.color`         | `text.secondary`   |
| `chart.treemap.breadcrumb.separator`     | `›`                |
| `chart.treemap.breadcrumb.active-color`  | `text.primary`     |
| `chart.treemap.animation.duration`       | `400ms`            |
| `chart.treemap.animation.easing`         | `motion.easing.inOut` |

### Chart Interaction Tokens

#### Crosshair / Hover Line

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.interaction.crosshair.width`      | `1px`              |
| `chart.interaction.crosshair.color`      | `gray.400`         |
| `chart.interaction.crosshair.opacity`    | `0.6`              |
| `chart.interaction.crosshair.style`      | `solid`            |
| `chart.interaction.crosshair.snap`       | `true` (nearest point)|
| `chart.interaction.crosshair.vertical`   | `true`             |
| `chart.interaction.crosshair.horizontal` | `false` (opt-in)   |

#### Brush / Range Selection

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.brush.selection-fill`             | `accent.subtle` |
| `chart.brush.selection-opacity`          | `0.20`             |
| `chart.brush.handle-width`              | `4px`              |
| `chart.brush.handle-color`              | `accent.default`   |
| `chart.brush.handle-radius`             | `radius.sm`        |
| `chart.brush.handle-height`             | `24px`             |
| `chart.brush.mask-opacity`              | `0.06`             |
| `chart.brush.border-color`              | `accent.default`   |

#### Chart Animations

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.animation.bar-grow`               | `300ms ease-out` (from baseline) |
| `chart.animation.bar-stagger`            | `30ms` (per bar)   |
| `chart.animation.line-draw`              | `500ms ease-out` (path reveal)   |
| `chart.animation.area-fade`              | `200ms ease-out` (after line)    |
| `chart.animation.dot-pop`                | `150ms ease-out` (scale 0→1)    |
| `chart.animation.fan-reveal`             | `400ms ease-out` (band by band) |
| `chart.animation.fan-stagger`            | `80ms` (per band)  |
| `chart.animation.donut-spin`             | `600ms ease-out`   |
| `chart.animation.gauge-sweep`            | `800ms ease-out`   |
| `chart.animation.number-count`           | `400ms` (value counter) |

#### Series Toggle / Inactive States

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.series.inactive-line-opacity`     | `0.15`             |
| `chart.series.inactive-area-opacity`     | `0.05`             |
| `chart.series.inactive-bar-opacity`      | `0.20`             |
| `chart.series.inactive-dot-opacity`      | `0.15`             |
| `chart.series.transition-duration`       | `200ms`            |
| `chart.series.transition-easing`         | `motion.easing.default` |

#### Zoom Controls

| Token                                    | Value              |
| ---------------------------------------- | ------------------ |
| `chart.zoom.min-scale`                   | `1.0`              |
| `chart.zoom.max-scale`                   | `5.0`              |
| `chart.zoom.button-size`                 | `32px`             |
| `chart.zoom.button-radius`              | `radius.md`        |
| `chart.zoom.button-bg`                  | `surface.secondary` |
| `chart.zoom.button-border`              | `border.default`    |
| `chart.zoom.button-icon-size`           | `16px`             |
| `chart.zoom.button-gap`                 | `space.1`          |
| `chart.zoom.animation-duration`         | `200ms`            |

---

## 4. Table Tokens

| Token                          | Light Value                  | Dark Value                   |
| ------------------------------ | ---------------------------- | ---------------------------- |
| `table.header.bg`              | `surface.secondary`          | `surface.secondary`          |
| `table.header.text`            | `text.primary`               | `text.primary`               |
| `table.header.font-size`       | `font.size.sm`               | `font.size.sm`               |
| `table.header.font-weight`     | `font.weight.semibold`       | `font.weight.semibold`       |
| `table.header.padding`         | `space.3 space.4`            | `space.3 space.4`            |
| `table.header.border-bottom`   | `2px solid border.strong`    | `2px solid border.strong`    |
| `table.header.sort-icon-size`  | `14px`                       | `14px`                       |
| `table.header.sort-icon-color` | `text.tertiary`              | `text.tertiary`              |
| `table.header.sort-icon-active`| `accent.default`             | `accent.default`             |
| `table.header.sticky-shadow`   | `shadow.sm`                  | `shadow.sm`                  |
| `table.row.bg`                 | `surface.primary`            | `surface.primary`            |
| `table.row.bg-alt`             | `surface.secondary`          | `surface.secondary`          |
| `table.row.bg-hover`           | `accent.subtle`      | `accent.subtle`      |
| `table.row.bg-selected`        | `accent.subtle`      | `accent.subtle`      |
| `table.row.border-bottom`      | `1px solid border.default`   | `1px solid border.default`   |
| `table.cell.padding`           | `space.3 space.4`            | `space.3 space.4`            |
| `table.cell.font-size`         | `font.size.sm`               | `font.size.sm`               |
| `table.cell.text`              | `text.primary`               | `text.primary`               |
| `table.cell.numeric.font-family`| `font.family.primary`       | `font.family.primary`        |
| `table.cell.numeric.text-align`| `right`                      | `right`                      |
| `table.pagination.height`      | `48px`                       | `48px`                       |
| `table.pagination.font-size`   | `font.size.sm`               | `font.size.sm`               |
| `table.expand-icon.size`       | `16px`                       | `16px`                       |
| `table.expand-indent`          | `space.6`                    | `space.6`                    |

#### Table Collapse Toggle

> Show/hide toggle for large data tables (e.g., "Hide Single-Scenario Monthly Data (60 rows)"). Placed directly above or below the table.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `table.collapse.toggle-font-size`  | `font.size.sm`     |
| `table.collapse.toggle-font-weight`| `font.weight.medium` |
| `table.collapse.toggle-color`      | `accent.default`   |
| `table.collapse.toggle-cursor`     | `pointer`          |
| `table.collapse.toggle-icon-size`  | `14px`             |
| `table.collapse.toggle-icon-gap`   | `space.1` (4px)    |
| `table.collapse.animation`         | `200ms ease-out`   |

#### Event-Highlighted Table Rows

> Row highlighting for time-based events in data tables (e.g., exercise date row, sale date row in a stock option table). Each event type uses its own color from the timeline handle mapping.

| Token                              | Value              |
| ---------------------------------- | ------------------ |
| `table.row.event-bg`              | Event color at `0.08` opacity |
| `table.row.event-border-left`      | `3px solid` event color |
| `table.row.event-text-weight`      | `font.weight.medium` |

> Color mapping reuses `timeline.handle.*` event types: Exercise = `accent.default`, Sale = `cat-5`. The row gets a tinted background and a left-border accent stripe matching the event color.

---

## 5. Content Typography

> **Font key:** `primary` = Heebo, `secondary` = Cormorant Garamond
>
> Heebo is used for all body copy and numbers. Use `font-variant-numeric: tabular-nums` when numbers are stacked vertically and need to appear aligned (table columns, calculation breakdowns, tooltip value lists).
>
> **Cormorant Garamond minimum weight rule:** Never use Cormorant Garamond below `font-weight: 500`. Its high-contrast design with delicate hairline strokes means `400` (regular) renders visually thin — closer to a light weight on most screens. All headings and display text using `secondary` (Cormorant Garamond) must use `semibold` (600) or higher. If you need a lighter feel, use `500` (medium) as the floor.

| Token               | Font        | Size   | Weight      | Line Height | Letter Spacing | Color            |
| ------------------- | ----------- | ------ | ----------- | ----------- | -------------- | ---------------- |
| `type.page-title`   | `secondary` | `2xl`  | `semibold`  | `2xl`       | `tight`        | `text.primary`   |
| `type.section-title` | `primary`  | `lg`   | `semibold`  | `lg`        | `normal`       | `text.primary`   |
| `type.subtitle`     | `primary`   | `md`   | `semibold`  | `md`        | `normal`       | `text.secondary` |
| `type.body`         | `primary`   | `base` | `regular`   | `base`      | `normal`       | `text.primary`   |
| `type.caption`      | `primary`   | `sm`   | `regular`   | `sm`        | `normal`       | `text.secondary` |
| `type.overline`     | `primary`   | `xs`   | `semibold`  | `xs`        | `wide`         | `text.tertiary`  |
| `type.label`        | `primary`   | `sm`   | `semibold`  | `sm`        | `normal`       | `text.primary`   |
| `type.helper`       | `primary`   | `xs`   | `regular`   | `xs`        | `normal`       | `text.secondary` |
| `type.kpi-value`    | `primary`   | `4xl`  | `bold`      | `4xl`       | `tight`        | `text.primary`   |
| `type.data-value`   | `primary`   | `sm`   | `regular`   | `sm`        | `normal`       | `text.primary`   |
| `type.code`         | `primary`   | `sm`   | `regular`   | `sm`        | `normal`       | `text.primary`   |

---

## 6. States & Special Conditions

### Empty States

| Token                        | Value            |
| ---------------------------- | ---------------- |
| `empty.layout.align`         | `center`         |
| `empty.layout.justify`       | `center`         |
| `empty.icon-size`            | `48px`           |
| `empty.icon-color`           | `text.tertiary`  |
| `empty.icon-style`           | `linear (1.5px)` |
| `empty.title.font-size`      | `font.size.lg`   |
| `empty.title.color`          | `text.secondary` |
| `empty.description.font-size`| `font.size.md`   |
| `empty.description.color`    | `text.tertiary`  |
| `empty.description.max-width`| `320px`          |

### Skeleton / Loading States

| Token                         | Light Value                                                            | Dark Value                                                               |
| ----------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `skeleton.bg`                 | `gray.100`                                                             | `gray.800`                                                               |
| `skeleton.gradient`           | `linear-gradient(91.58deg, #F2F3F2 0.12%, #FFFFFF 43.3%, #F2F3F2 100%)` | `linear-gradient(91.58deg, gray.800 0.12%, gray.700 43.3%, gray.800 100%)` |
| `skeleton.gradient.size`      | `200% 100%`                                                            | `200% 100%`                                                              |
| `skeleton.radius`             | `radius.sm`                                                            | `radius.sm`                                                              |
| `skeleton.animation`          | `skeleton-sweep 1.5s ease-in-out infinite`                             | `skeleton-sweep 1.5s ease-in-out infinite`                               |
| `skeleton.animation.keyframes`| `0% { background-position: 200% 0 } → 100% { background-position: -200% 0 }` | same                                                              |

### Focus Rings

| Token                | Value              |
| -------------------- | ------------------ |
| `focus.ring-width`   | `2px`              |
| `focus.ring-offset`  | `2px`              |
| `focus.ring-color`   | `color.border.focus`|

---

## 7. Responsive Breakpoints

| Token            | Value    | Behavior                                        |
| ---------------- | -------- | ------------------------------------------------ |
| `breakpoint.sm`  | `390px`  | Single-column stack; collapse multi-column grids |
| `breakpoint.md`  | `768px`  | Side-by-side layout; mobile font sizes below     |
| `breakpoint.lg`  | `1024px` | Full dashboard grid                              |
| `breakpoint.xl`  | `1280px` | Extended chart widths                            |

### Column Collapse

Layouts with two or more columns remain side-by-side until `breakpoint.sm` (390px). Below 390px, all multi-column grids collapse to a single column. Do **not** collapse columns at 768px — only at 390px.

### Chart Rendering — No SVG for Standard Charts

> **Critical rule:** Never use SVG for standard charts (area, line, bar, waterfall, candlestick, scatter, histogram, projected/actual, benchmark, dual y-axis). SVG distorts everything when the container resizes — text becomes illegible, circles become ovals, and stroke widths become inconsistent. Every chart element must be an HTML element that responds independently to container width.

**Pure HTML/CSS for everything:**

- **Text** (axes, labels, legends, tooltips): HTML `<span>` / `<div>` with CSS `font-size`. Never SVG `<text>`.
- **Area fills / line shapes:** CSS `clip-path: polygon(...)` on a `<div>` with `background` color or gradient. Polygon points use percentages so they scale with the container.
- **Data dots:** `<div>` with `border-radius: 50%` and `position: absolute`. Always perfect circles regardless of container aspect ratio.
- **Scrubber / reference lines:** `<div>` with `width: 1px` and `background: repeating-linear-gradient(to bottom, ...)` for dashes.
- **Stroke lines:** CSS `clip-path: polygon(...)` creating a thin (~1% height) band that follows the data shape. Use `background` for solid or `repeating-linear-gradient` for dashed. A 1% gap produces consistent perpendicular thickness across steep and flat segments; larger gaps (2%+) cause visible weight variation on slopes.
- **Grid lines:** CSS `<div>` with `border-top` at percentage positions.
- **Bars:** `<div>` with percentage heights in a flex container.

**Exceptions where SVG is acceptable:**

- **Donut, gauge:** Fixed-size centered SVG (e.g., `width: 260px; height: 260px`). These do not shrink, so distortion is not a concern.
- **Sankey / flow diagrams:** Fixed-size SVG inside `overflow-x: auto` scroll wrapper. Complex spatial relationships justify fixed layout.
- **Sparklines:** Tiny inline SVGs (≤64×24px). Purely decorative, no text.
- **Icons:** Small fixed-size SVGs for UI icons (checkmarks, status indicators).

**Tooltip viewport containment:**

> Tooltips must never overflow the chart container. If positioning a tooltip to the right of the scrubber line would cause it to overflow the right edge, position it to the LEFT of the scrubber instead. Use `right: 4px` as a safe fallback when the scrubber is in the right third of the chart.

**Chart structure (pure CSS):**

```html
<div style="display:flex;align-items:stretch;overflow:visible">
  <!-- Y-axis labels (HTML) -->
  <div style="display:flex;flex-direction:column;justify-content:space-between;
              height:[H]px;padding-right:8px;flex-shrink:0">
    <span style="font-size:11px;color:var(--text-tertiary)">$40K</span>
    ...
  </div>
  <!-- Chart area -->
  <div style="flex:1;height:[H]px;position:relative;
              border-left:1px solid var(--border-default);
              border-bottom:1px solid var(--border-default);
              overflow:visible">
    <!-- Grid lines (CSS divs) -->
    <div style="position:absolute;left:0;right:0;top:25%;
                border-top:1px solid var(--border-default);opacity:0.5"></div>
    <!-- Area fill (clip-path polygon, percentages) -->
    <div style="position:absolute;left:0;top:0;width:100%;height:100%;
                clip-path:polygon(0% 75%, 25% 50%, 50% 30%, 75% 20%,
                100% 25%, 100% 100%, 0% 100%);
                background:linear-gradient(to bottom,
                color-mix(in srgb, var(--seq-500) 25%, transparent),
                color-mix(in srgb, var(--seq-500) 2%, transparent))"></div>
    <!-- Stroke line (thin clip-path band) -->
    <div style="position:absolute;left:0;top:0;width:100%;height:100%;
                clip-path:polygon(0% 74%, 25% 49%, 50% 29%, 75% 19%,
                100% 24%, 100% 26%, 75% 21%, 50% 31%, 25% 51%, 0% 76%);
                background:var(--seq-500)"></div>
    <!-- Data dot (always a perfect circle) -->
    <div style="position:absolute;left:75%;top:20%;width:8px;height:8px;
                border-radius:50%;background:var(--seq-500);
                transform:translate(-50%,-50%)"></div>
    <!-- Scrubber line (CSS dashed) -->
    <div style="position:absolute;left:75%;top:0;width:1px;height:100%;
                background:repeating-linear-gradient(to bottom,
                var(--text-tertiary) 0, var(--text-tertiary) 3px,
                transparent 3px, transparent 5px);opacity:0.6"></div>
    <!-- Tooltip (HTML, positioned inside viewport) -->
    <div style="position:absolute;top:10%;right:4px;...">...</div>
  </div>
</div>
<!-- X-axis labels (HTML) -->
<div style="display:flex;margin-left:[y-axis-width];
            justify-content:space-between;margin-top:6px">
  <span style="font-size:11px;color:var(--text-tertiary)">Jan</span>
  ...
</div>
```

### Minimum Width Rule

> All extended chart components (Timeline Scrubber, Dual Y-Axis + Event Markers, and their containers) must set `min-width: 390px`. This prevents label collisions and layout breakage at narrow viewports while still allowing the component to be responsive above that threshold.

### Horizontal Scroll Policy

> **Rule:** Horizontal scroll containers (`overflow-x: auto`) should only be used when the content **cannot** be made width-responsive without losing meaning or legibility. Default to responsive sizing; scroll is the exception, not the rule.

**Use horizontal scroll for:** data tables with many columns, Sankey / flow diagrams with fixed spatial relationships, and any chart where reflowing or compressing would misrepresent the data.

**Do not use horizontal scroll for:** standard line, area, bar, donut, scatter, histogram, waterfall, candlestick, gauge, sparkline, or confidence-band charts. These must use the pure HTML/CSS approach described above (clip-path polygons, percentage positioning, CSS gradients).

---

## 8. Number Formatting Conventions

| Context                  | Format              | Example         |
| ------------------------ | ------------------- | --------------- |
| Currency                 | `$#,###`            | `$1,234`        |
| Currency (compact)       | `$#.#K` / `$#.#M`  | `$1.2M`         |
| Currency (cents)         | `$#,###.##`         | `$1,234.56`     |
| Percentage               | `#.#%`              | `12.4%`         |
| Change percentage        | `±#.#%`             | `+12.4%`, `−3.2%` |
| Basis points             | `###bp`             | `125bp`         |
| Probability              | `#%`                | `87%`           |
| Ratio                    | `#.##x`             | `1.25x`         |
| Large integers           | `#,###`             | `1,234,567`     |
| Large integers (compact) | `#.#K` / `#.#M`    | `1.2M`          |
| Decimals                 | `#.##`              | `3.14`          |
| Year                     | `####`              | `2025`          |
| Age                      | `##`                | `65`            |
| Abbreviation threshold   | `> 9,999`           | Numbers above this get abbreviated |

> **Sign convention:** Positive values use `+` prefix and `data.positive` color. Negative values use `−` (minus sign, not hyphen) and `data.negative` color. Zero uses no prefix and `data.neutral` color.

> **Font:** All numeric values use `font.family.primary` (Heebo). In stacked/tabular contexts (table columns, tooltip value lists, calculation breakdowns), add `font-variant-numeric: tabular-nums` for vertical alignment.

### Date & Time Formatting

> Axis labels, tooltips, and table cells use these formats based on the data's time granularity and available space.

| Granularity       | Full Format          | Compact Format    | Axis Label Example     |
| ----------------- | -------------------- | ----------------- | ---------------------- |
| Intraday          | `h:mm A`             | `h:mm`            | `9:30 AM`              |
| Daily             | `MMM D, YYYY`        | `MMM D`           | `Jan 15`               |
| Weekly            | `MMM D`              | `M/D`             | `Jan 15`               |
| Monthly           | `MMMM YYYY`          | `MMM 'YY`         | `Jan '26`              |
| Quarterly         | `Q# YYYY`            | `Q#'YY`           | `Q1 '26`               |
| Annual            | `YYYY`               | `'YY`             | `2026`                 |
| Range (tooltip)   | `MMM D – MMM D, YYYY`| `M/D – M/D`      | `Jan 1 – Mar 31, 2026` |
| Age-based axis    | `Age ##`             | `##`              | `Age 65`               |

> **Zoom-level rules:** When a chart axis spans > 10 years, use annual labels. 2–10 years → quarterly or `MMM 'YY`. < 2 years → monthly or daily. < 1 month → daily or intraday. Tooltip always shows the full format regardless of axis density.

> **Font:** Date labels on chart axes use `font.family.primary` (Heebo). Use `font-variant-numeric: tabular-nums` when dates appear in a stacked/tabular context requiring vertical alignment.

---

## 9. Canvas Rendering Guide (for LLM Code Generation)

> This section tells Cursor IDE how to render charts using Canvas 2D while consuming design tokens from CSS custom properties.

### Reading CSS Variables in JavaScript

```
// Cache at chart init — do NOT call getComputedStyle per frame
function getTokens() {
  const s = getComputedStyle(document.documentElement);
  return {
    accentPrimary:    s.getPropertyValue('--accent-primary').trim(),
    textPrimary:      s.getPropertyValue('--text-primary').trim(),
    textSecondary:    s.getPropertyValue('--text-secondary').trim(),
    textTertiary:     s.getPropertyValue('--text-tertiary').trim(),
    surfacePrimary:   s.getPropertyValue('--surface-primary').trim(),
    surfaceSecondary: s.getPropertyValue('--surface-secondary').trim(),
    borderDefault:    s.getPropertyValue('--border-default').trim(),
    gridColor:        s.getPropertyValue('--gray-100').trim(),
    // … extend as needed
  };
}
```

### Theme Detection

```
const isDark = document.documentElement.dataset.theme === 'dark';
// Re-read tokens when theme changes
```

### Device Pixel Ratio (DPR) Scaling

```
const dpr = window.devicePixelRatio || 1;
canvas.width  = rect.width  * dpr;
canvas.height = rect.height * dpr;
canvas.style.width  = rect.width  + 'px';
canvas.style.height = rect.height + 'px';
ctx.scale(dpr, dpr);
// All subsequent coordinates use CSS pixels, NOT device pixels
```

### Canvas Font Strings

| Token                    | Canvas Font String                                        |
| ------------------------ | --------------------------------------------------------- |
| `font.family.primary`   | `'400 14px "Heebo", -apple-system, sans-serif'`           |
| `font.family.secondary` | `'600 18px "Cormorant Garamond", Georgia, serif'`         |
| Axis labels              | `'400 11px "Heebo", -apple-system, sans-serif'`           |
| Chart title              | `'600 16px "Heebo", -apple-system, sans-serif'`           |
| Tooltip value (stacked)  | `'600 13px "Heebo", -apple-system, sans-serif'`           |

### Color with Opacity (Canvas)

```
// Use rgba for transparency — hex doesn't support alpha in Canvas 2D
ctx.fillStyle = 'rgba(79, 70, 229, 0.15)';  // accent.default at 15%

// Helper: hex + opacity → rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
```

### Chart Padding Convention

```
// Standard padding object — consistent across all chart types
const pad = { top: 24, right: 60, bottom: 48, left: 64 };
// Right padding larger when endpoint labels are shown
// Bottom padding larger when x-axis has rotated labels
// Left padding varies with y-axis label width (measure longest label)
```

### Dash Patterns

| Style    | Canvas `setLineDash()` | Usage                          |
| -------- | ---------------------- | ------------------------------ |
| Solid    | `[]`                   | Median lines, limit lines      |
| Dashed   | `[6, 4]`               | Goal lines, grid lines         |
| Dotted   | `[2, 3]`               | Benchmark lines                |
| Long dash| `[10, 5]`              | Projected/forecast lines       |

### Responsive Chart Behavior

| Breakpoint     | Chart Height | Font Scale | Padding Reduction |
| -------------- | ------------ | ---------- | ----------------- |
| `≥ 1024px` (lg)| `380px`     | `1.0×`     | None              |
| `768–1023px`   | `320px`      | `0.9×`     | Reduce right/left by 25% |
| `< 768px` (sm) | `260px`      | `0.85×`    | Reduce all by 30%, hide y-axis title |
