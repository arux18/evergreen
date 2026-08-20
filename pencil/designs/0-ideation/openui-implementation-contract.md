# OpenUI implementation contract

**Audience:** engineering and coding agents wrapping `@openuidev/react-ui`.  
**Visual QA:** the matching `openui-*.lib.pen` in this folder.  
**This file is the source of truth for code.** If Pencil and this file disagree, update this file with design — do not improvise in the wrapper.

One file, every shown component, inclusive of palette **and** layout / type / spacing / hover / states. Do not add `openui-*-implementation.md` per component.

| Artifact | Job |
|---|---|
| **This file** | How production must render (MUST / MUST NOT, tokens, QA) |
| `openui-*.lib.pen` | Visual QA — pixel check against the variant named in each section |
| `openui-components-handoff.md` | What exists, when to use it, LLM catalog copy |
| `openui-styling-priorities.md` | What to style / lock next |
| `hemlock-library.lib.pen` | Token names and values (libs copy locally; do not invent new hex/px) |

Most OpenUI Lang props are data (`labels`, `series`, text). Styling is **renderer-side**. If the wrapper is wrong, every instance in production is wrong — the model cannot emit `barGap`.

### Handoff package

Give engineering:

1. This markdown file.
2. The Pencil libs listed under **Visual files** (not `openui-charts.lib.pen` unless they are still supporting the legacy ideation screen).

---

## Status

| Status | Meaning |
|---|---|
| **LOCKED** | Design accepted. Implement exactly. Shipping vendor default for that behavior is a fail. |
| **DRAFT (as-drawn)** | Snapshot of Pencil **right now**, while restyling is still in progress on that file. **Not shippable.** More Hemlock styling will land on these components; when it does, update this section (and Pencil) together. Do not freeze DRAFT as the production look. |
| **NOT SHOWN** | Do not put in the GenUI palette. Do not implement as a chat response component. |
| **NOT PORTED** | No `.pen` yet. No implementation rules here. |

**Engineering implements LOCKED only.** DRAFT exists so the handoff file stays complete as we restyle layout, content, data-display, forms, actions, feedback, and the remaining charts — not so wrappers ship early. If Pencil and a DRAFT section disagree, Pencil + a contract edit win; do not invent a third interpretation. LOCKED chart pieces today: **shared chrome**, **BarChart**, **HorizontalBarChart**, **LineChart/AreaChart** (full = curved `monotone`, minis = straight `linear`), **SingleStackedBarChart**, **Mini charts** (sparkline only). Still DRAFT: DonutChart (restyled 2026-08-20, awaiting visual accept) and HeatmapChart (Sept 1 WO, low priority; Q16 deferred).

### Section template (for promoting DRAFT → LOCKED)

```md
## ComponentName

**Status:** LOCKED
**Visual:** `openui-….lib.pen` (variant names)

### Vendor defaults that fail
### MUST / MUST NOT
### Constants (copy-paste)
### Visual QA
```

---

## Visual files

| File | Components |
|---|---|
| `openui-layout.lib.pen` | Card, CardHeader, Stack, Tabs, Accordion, Carousel, Separator, Steps, Modal |
| `openui-content.lib.pen` | TextContent, MarkDownRenderer |
| `openui-data-display.lib.pen` | ListBlock, ListItem, Table, Col, Tag, TagBlock, CodeBlock, Image, ImageBlock, ImageGallery |
| `openui-forms.lib.pen` | Form, FormControl, Label, Input, TextArea, Select, CheckBox*, Radio*, Switch*, Slider, DatePicker |
| `openui-actions.lib.pen` | Button, IconButton, Buttons, FollowUpBlock, FollowUpItem |
| `openui-feedback.lib.pen` | TextCallout, MessageLoading, Skeleton, TableSkeleton *(Callout is NOT SHOWN)* |
| `openui-charts-v2.lib.pen` | Shown charts (v2 is the only chart lib for new work) |
| `openui-charts.lib.pen` | **Legacy v1** — only `View-Presentation-Ideation.pen` still imports it. Do not implement from v1. |
| `openui-restyle-before-after.pen` | Review board, not a component lib. |

Chat shells (FullScreen, Copilot, BottomTray, ToolCall, ToolResult) are **NOT PORTED**.

---

## Cross-cutting (every component)

1. **Hemlock tokens only** — `$spacing-*`, `$typo-primary-*`, `$colors-*`, `$radius-*`, chart scales. No new hex/px that Hemlock already names.
2. **Heebo** for all text. No Inter. Noto Serif only if a section explicitly says so (none do today).
3. **Theme palette is not enough** when vendor hardcodes layout (Recharts `barGap`, tooltip `cursor`, custom SVG shapes). Those need a **wrapper**, not `createTheme`.
4. **Do not invent DOM wrappers** to fake a vendor behavior away. Fix the actual prop/shape.
5. **Do not apply `05-charts.json` ratio tokens** (`gapRatio`, `groupGapRatio`) to OpenUI chart wrappers.
6. Chat content lives in a container **min 360px / max 1024px** unless a section says otherwise. Charts/cards are `width: 100%` inside that.
7. **One body-prose spec.** Reading text is `typo-primary-base-regular` — 16px, line-height 1.5, `$colors-text-body`. Lists, markdown paragraphs, and TextCallout body use this. Do not pick a smaller “list size.”
8. **Line-height is always explicit.** Never leave font auto (~1.47 for Heebo).
9. **fontFamily, fontSize, and fontWeight come from the same scale step.**
10. **Spacing** is `$spacing-*` only: 2 / 4 / 8 / 12 / 16 / 24 / 32 (`none` / `3xs` / `2xs` / `xs` / `sm` / `md` / `lg`).
11. **Buttons are pills** — `$radius-full` (9999). Cards/containers are `$radius-sm` (16) unless a section says `$radius-xs` (12).
12. **Chat composition:** one Card per response; FollowUpBlock last; TextCallout never leads; no Callout; no Stack in chat (vendor R1). See handoff R1–R8.

### Type roles

| Role | Spec | Color | Used for |
|---|---|---|---|
| Body prose | `typo-primary-base-regular` 16 / lh 1.5 | `$colors-text-body` `#403D3A` | Paragraphs, markdown `p`/`li`, ListItem, TextCallout body |
| Meta | `typo-primary-sm-regular` 14 / lh 1.4286 | `$colors-text-meta` `#5E5954` | Subtitles, hints, captions, timestamps |
| Block title | `typo-primary-sm-semibold` 14 / lh 1.4286 | `$colors-text-header` `#0e0e0e` | ListBlock header, chip-adjacent titles |
| Emphasis | `typo-primary-base-semibold` 16 / lh 1.5 | `$colors-text-header` | Markdown headings/bold, CardHeader title |
| Lead-in | `typo-primary-md-regular` 18 / lh 1.5556 | `$colors-text-body` | TextContent large |
| Section title | `typo-primary-lg-semibold` 20 / lh 1.4 | `$colors-text-header` | TextContent large-heavy |
| Caption | `typo-primary-xs-*` 12 / lh 1.3333 | meta or body per section | Chart axes, table headers, image credit |
| Action / link | same size as surrounding text | `$colors-text-action` / `$colors-btnLinkText` `#3a6af8` | Markdown links, active tabs |

### Shared palette (light **and** dark)

Wrappers **MUST** bind these tokens (or the matching CSS variables), not bake the light hex. Dark values are from `openui-charts-v2.lib.pen` / Hemlock `🎨 Colors → Dark`. A blank Dark cell means the token is **the same in both themes** (Hemlock does this too).

> **Token sync 2026-08-20 (Hemlock round 1).** Hemlock light/dark tokens were updated and charts-v2 was re-synced: surface dark is now `#1C2943`, meta dark `#889CBF`, `seq-100` dark `#163196`, success-bold dark `#74D791`, shadow-lg dark `#00000073`, and tooltips now sit on the new `$colors-background-elevated`. Hemlock will keep evolving — re-sync this table and charts-v2 on each round.

| Token | Light | Dark | Use |
|---|---|---|---|
| `$colors-background-main` | `#F7F5F0` | | Page / taupe canvas (Select default fill) |
| `$colors-background-surface` | `#FFFFFF` | `#1C2943` | Cards, chart chrome, fields |
| `$colors-background-elevated` | `#FFFFFF` | `#22314F` | **Tooltips**, popovers — anything floating above a surface. In dark, elevation = lighter navy, not shadow alone. |
| `$color-taupe-100` | `#F7F5F0` | | Table header, code header, FollowUpItem default |
| `$color-taupe-200` | `#EDEAE3` | | Card sunk, TextCallout, FollowUpItem hover, SelectItem selected |
| `$color-taupe-300` | `#E3DFD6` | | FollowUpItem pressed |
| `$colors-borders-light` | `#EEEDEB` | `#131E34` | Default hairline (cards, chart stroke, separators, grid) |
| `$colors-borders-dark` | `#DCD8CB` * | | Field borders, outlined card, code block stroke. *Hemlock `#D5D3D0` — actions/forms use chat-chip `#DCD8CB`. Implement `#DCD8CB` until Hemlock reconciles (handoff B8). |
| `$colors-borders-strong` | `#C0BAB2` | | Pressed chip border (if needed) |
| `$color-gray-50` | `#F8F7F6` | | Do not use for FollowUp chips (masters are taupe) |
| `$color-gray-100` | `#EEEDEB` | `#EEEDEB` | Disabled field fill, skeleton surface, image placeholder. **No dark variant** (same as Hemlock `$gray-100`). |
| `$color-gray-200` | `#D5D3D0` | `#D5D3D0` | Switch off track, slider track, carousel inactive dots. **No dark variant** (same as Hemlock `$gray-200`). |
| `$colors-text-header` | `#0e0e0e` | `#D8E1F0` | Titles, values, primary labels |
| `$colors-text-body` | `#403D3A` | `#B3C1DB` | Body |
| `$colors-text-meta` | `#5E5954` | `#889CBF` | Secondary |
| `$colors-text-placeholder` | `#716E6A` forms / `#B5B1AB` Hemlock | | Disabled/placeholder. Forms lib uses `#716E6A`. |
| `$colors-text-reverse` | `#FFFFFF` | `#0e0e0e` | Text on saturated fills. Inverts with theme — verify heatmap cells in dark (see HeatmapChart). |
| `$colors-text-error` / `$colors-borders-error` | `#c82320` | | Error text and error field stroke |
| `$colors-borders-focus` | `#0e0e0e` | | Input focus ring |
| `$colors-text-deposit` | `#148338` | | Positive table amounts |
| `$colors-text-action` / `$colors-btnLinkText` | `#3a6af8` | | Links, active tab |
| `$colors-icons-meta` | `#5E5954` | | Icons |
| `$colors-icons-muted` | `#B5B1AB` | | Disabled select chevron |

### Blue ramp (actions + form controls)

| Token | Hex |
|---|---|
| `$color-blue-100` | `#ebf0fe` |
| `$color-blue-200` | `#c8d6fd` |
| `$color-blue-300` | `#a5bcfc` |
| `$color-blue-600` | `#3a6af8` |
| `$color-blue-700` | `#2952cc` |
| `$color-blue-800` | `#163196` |

### Chart categorical (shown series colors)

Use these Hemlock chart tokens — not vendor OpenUI hues. Categorical **do** have dark values (lighter/desaturated). Bind the token; do not hardcode the light hex on fills, strokes, or area gradients.

| Token | Light | Dark | Typical use in v2 |
|---|---|---|---|
| `$chart-categorical/color-01` | `#8951F0` | `#b198f0` | Horizontal bar row 1, donut Housing |
| `$chart-categorical/color-04` | `#3B82F6` | `#7aa0f5` | BarChart Income, Line benchmark, MiniBar, Area liabilities |
| `$chart-categorical/color-07` | `#2DD4BF` | `#84e6cc` | BarChart Spending, Area assets, MiniArea |
| `$chart-categorical/color-08` | `#A78BFA` | `#c7baf7` | Stacked segment 4 |
| `$chart-categorical/color-09` | `#C026D3` | `#db74e6` | Line portfolio, MiniLine, donut Food |
| `$chart-categorical/color-10` | `#E73CAE` | `#f485be` | Stacked segment 1 |
| `$chart-categorical/color-13` | `#FB923C` | `#f0985a` | Horizontal bar / donut Transport |
| `$chart-categorical/color-14` | `#CA8A04` | `#d9a02e` | Stacked segment 3 |
| `$chart-categorical/color-15` | `#FACC15` | `#f3de6f` | Horizontal bar last |

### Chart sequential + diverging (heatmap)

Dark sequential **inverts** (matches Hemlock navy sequential): in light, darker blue = larger; in dark, **lighter** blue = larger. As of the 2026-08-20 Hemlock sync, `seq-100` now has a proper dark value (`#163196`, Hemlock `$blue-800`) — the old pale-cells-on-navy problem is fixed.

| Token | Light | Dark |
|---|---|---|
| `$chart-sequential/seq-100` | `#ebf0fe` | `#163196` |
| `$chart-sequential/seq-200` | `#c8d6fd` | `#2952CC` |
| `$chart-sequential/seq-400` | `#7094FB` | `#5A82F9` |
| `$chart-sequential/seq-600` | `#3a6af8` | `#A5BCFC` |
| `$colors-background-success-bold` | `#10642b` | `#74D791` |
| `$colors-background-success-strong` | `#68fc97` | `#245234` |
| `$colors-background-success-soft` | `#a9fdc4` | `#1A3A26` |
| `$colors-background-error-strong` | `#fdaba9` | `#542427` |

**Heatmap text in dark — OPEN (Q16, deferred by design 2026-08-20; remind before locking heatmap).** seq-100 dark is now deep navy, so `$colors-text-header` (`#D8E1F0` dark) reads fine on it, and seq-600 dark (`#A5BCFC` pale) with `$colors-text-reverse` (`#0e0e0e` dark) is fine. The unresolved part is the mid-ramp (seq-400 dark `#5A82F9` under header text) and which cells flip between header/reverse per theme. Do not lock heatmap text colors until design answers Q16.

### Radius

| Token | px | Use |
|---|---|---|
| `$radius-3xs` | 4 | Tag, checkbox, legend swatch (bar/area), tooltip-adjacent |
| `$radius-2xs` | 8 | Chart tooltip, code block, image, input field, table header |
| `$radius-xs` | 12 | Form container, heatmap cells, TextCallout, carousel slides |
| `$radius-sm` | 16 | Card, chart chrome, modal dialog |
| `$radius-full` | 9999 | Buttons, chips, tabs indicator, steps circles, radios, switches |

---

## Index

| Component | Status | Visual file |
|---|---|---|
| **BarChart** | **LOCKED** | charts-v2 |
| **HorizontalBarChart** | **LOCKED** | charts-v2 |
| **LineChart / AreaChart** | **LOCKED** — full charts curved, minis straight (2026-08-20) | charts-v2 |
| DonutChart | DRAFT — restyled 2026-08-20 (HTML template port), awaiting visual accept | charts-v2 |
| **SingleStackedBarChart** | **LOCKED** (2026-08-20) | charts-v2 |
| **MiniLineChart / MiniAreaChart / MiniBarChart** | **LOCKED** (2026-08-20) | charts-v2 |
| HeatmapChart | DRAFT — in Sept 1 WO, **low priority**; Q16 text contrast deferred | charts-v2 |
| **ChartTooltip / Legend (shared chrome)** | **LOCKED** | charts-v2 |
| TextContent | DRAFT | content |
| MarkDownRenderer | DRAFT | content |
| ListBlock / ListItem | DRAFT | data-display |
| Card / CardHeader | DRAFT | layout |
| Stack / Separator | DRAFT | layout |
| Tabs / TabItem | DRAFT | layout |
| Accordion / AccordionItem | DRAFT | layout |
| Carousel | DRAFT | layout |
| Steps / StepsItem | DRAFT | layout |
| Modal | DRAFT | layout |
| Table / Col | DRAFT | data-display |
| Tag / TagBlock | DRAFT | data-display |
| CodeBlock | DRAFT | data-display |
| Image / ImageBlock / ImageGallery | DRAFT | data-display |
| Form / FormControl / Label | DRAFT | forms |
| Input / TextArea | DRAFT | forms |
| Select / SelectItem | DRAFT | forms |
| CheckBox* / Radio* / Switch* | DRAFT | forms |
| Slider / DatePicker | DRAFT | forms |
| Button / IconButton / Buttons | DRAFT | actions |
| FollowUpBlock / FollowUpItem | DRAFT | actions |
| TextCallout | DRAFT — vendor rebuild still open (B4) | feedback |
| MessageLoading / Skeleton / TableSkeleton | DRAFT | feedback |
| Callout | **NOT SHOWN** | feedback (do not ship) |
| PieChart / RadialChart / RadarChart / ScatterChart | **NOT SHOWN** | — |
| SectionBlock / SectionItem | **NOT PORTED** | — |
| Chat shells | **NOT PORTED** | — |

---

## Shared chart chrome

**Status:** LOCKED  
**Visual:** every chart in `openui-charts-v2.lib.pen`

Applies to Bar / HorizontalBar / Line / Area / Donut / Stacked unless a section overrides. Tokens below are theme-aware (light **and** dark).

| Part | Rule |
|---|---|
| Chart card | fill `$colors-background-surface`, stroke `$colors-borders-light` 1px, padding `$spacing-md` (24), gap `$spacing-sm` (16), radius `$radius-sm` (16), width 100% in the 360–1024 chat column |
| Axis / category labels | `typo-primary-xs-regular` 12 / lh 1.3333 / `$colors-text-meta` |
| Legend | gap `$spacing-sm` between items; item gap `$spacing-2xs` (bar/line/area) or `$spacing-3xs` (stacked); label `xs-regular` `$colors-text-body` |
| Legend swatch (fill series) | 10×10, `$radius-3xs` |
| Legend swatch (line series) | 10×2 rectangle, no radius |
| Legend swatch (donut / stacked) | 10×10, `$radius-full` |
| Tooltip | fill **`$colors-background-elevated`** (`#FFFFFF` / dark `#22314F` — per Hemlock `component/ChartTooltip`, 2026-08-20 sync), stroke `$colors-borders-light` 1px, pad `[$spacing-2xs, $spacing-xs]` (8 / 12), gap `$spacing-3xs`, radius `$radius-2xs` |
| Tooltip shadow | outer shadow, y `$shadow-lg-y` (8), blur `$shadow-lg-blur` (24), color `$shadow-lg-color` (`#0000001F` / dark `#00000073`) |
| Tooltip header | `xs-semibold` `$colors-text-meta` |
| Tooltip label | `xs-regular` `$colors-text-body` |
| Tooltip value | `xs-semibold` `$colors-text-header` |
| Tooltip marker | 8×8 ellipse, series color |
| Hover dim | non-active series/bars/segments **opacity 0.3**; active 1.0 |
| Hover cursor | **no** gray full-height/width band (`ChartTooltip` `cursor={false}`) |
| Grid (line/area) | `$colors-borders-light`, 1px |
| Plot line | 2px, series color |
| Scrubber | 1px `$colors-text-meta`; dots 8×8 series fill |

**MUST NOT:** vendor `--openui-highlight` tooltip cursor; inner SVG hairlines on bars; `05-charts.json` gap ratios.

---

## BarChart

**Status:** LOCKED  
**Visual:** `openui-charts-v2.lib.pen` — BarChart / Default, Default / Hover, Single Series, Single Series / Hover  
**Also:** `HorizontalBarChart` is **ranking only** (one bar per row). There is no grouped two-series HorizontalBarChart in v2 — do not invent inner-pair `barGap` for it. Thickness matches this section (`24px`).

### Vendor defaults that fail

| Vendor default | Why it fails |
|---|---|
| `BAR_CATEGORY_GAP = "20%"` | % of each x-axis **band**. Leftover width goes *between the two bars in a pair*. Pairs split as the chart grows. |
| `BAR_GAP = 10` plus % category gap | Inner-pair gap does not stay fixed. |
| `BAR_WIDTH = 16` (scroll math only) | Bars stay too thin; layout still stretches the pair. |
| Tooltip `cursor` fill `--openui-highlight` | Gray rectangle behind the whole category on hover. |
| `LineInBarShape` inner `<line>` | Hairline down the middle of each bar. |

**Do not** wrap bars in a transparent DOM container to hide the gray hover. The gray is Recharts’ tooltip **cursor**, not a layout wrapper.

### Layout

Container: chat card, `min-width: 360px`, `max-width: 1024px`. Chart is `width: 100%` inside that card.

| Token | Value | Recharts prop | Grows with chart width? |
|---|---|---|---|
| Bar thickness | `24px` (`$spacing-md`) | `barSize` **and** `maxBarSize` | **No** |
| Gap inside a pair | `4px` (`$spacing-3xs`) | `barGap` | **No** |
| Gap between x-axis categories | min `16px` (`$spacing-sm`); remainder of plot width | `barCategoryGap` **in px, computed** | **Yes** |

Series colors (Default): Income `$chart-categorical/color-04`, Spending `$chart-categorical/color-07`. Single series: `color-04`.

### MUST

1. `barSize` and `maxBarSize` are **pixels**, same value (`24`). Bars never stretch to fill the band.
2. `barGap` is **pixels** (`4`). Never `"10%"`, never `"20%"`, never omitted.
3. `barCategoryGap` is **pixels**, computed from leftover plot width. Never `"20%"`. Never a percentage.
4. Leftover width goes **only** into `barCategoryGap`. It must not increase bar width or inner-pair gap.
5. Hover: `ChartTooltip` `cursor={false}` (or `fill: "transparent"`). Non-hovered bars at **30% opacity**; hovered category at 100%.
6. No inner hairline. Do not render `LineInBarShape`’s inner `<line>`.

### MUST NOT

- Ship stock OpenUI `BarChart` unwrapped.
- Use `%` for `barGap` or `barCategoryGap`.
- Add a gray (or any) full-height highlight behind a category.
- Put leftover space into side-only padding *instead of* category gap (months would not separate).
- Apply `05-charts.json` `bar.gapRatio` / `groupGapRatio`.

### Constants (copy-paste)

```ts
const BAR_SIZE = 24; // $spacing-md — thicker than vendor 16
const BAR_GAP = 4;   // $spacing-3xs — inner-pair; pixels only
const CATEGORY_GAP_MIN = 16; // $spacing-sm

function barCategoryGapPx(
  plotWidth: number,
  categoryCount: number,
  seriesCount: number,
): number {
  const pairWidth = seriesCount * BAR_SIZE + (seriesCount - 1) * BAR_GAP;
  const leftover = plotWidth - categoryCount * pairWidth;
  return Math.max(CATEGORY_GAP_MIN, leftover / categoryCount);
}

// <BarChart
//   barSize={BAR_SIZE}
//   maxBarSize={BAR_SIZE}
//   barGap={BAR_GAP}
//   barCategoryGap={barCategoryGapPx(plotWidth, data.length, seriesCount)}
// >
//   <ChartTooltip cursor={false} />
```

Single-series: `seriesCount = 1`. Do not apply this grouped-pair math to HorizontalBarChart (no grouped variant).

### Visual QA (required before merge)

Measure at **360px** and **1024px** plot widths, same data (6 categories, 2 series):

| Check | Pass |
|---|---|
| Inner-pair gap is **4px at both widths** (±1px) | |
| Category gap is **larger at 1024 than at 360** | |
| Bar width is **24px at both widths** | |
| Hover: **no** gray/tinted full-height band | |
| Hover: other categories ~30% opacity; tooltip present | |
| **No** vertical hairline inside bars | |
| Pairs still read as a unit at 1024 (label centered under the *pair*, not in a hole between the two bars) | |

**Fail example:** at 1024px the two bars in one category sit far apart with the label in the empty middle.

### Linear / blueprint paste

```
OpenUI BarChart wrapper — see openui-implementation-contract.md #BarChart
- barSize = maxBarSize = 24px; never stretch
- barGap = 4px (inner pair); NEVER percent
- barCategoryGap = leftover px between categories; NEVER "20%"
- ChartTooltip cursor={false}; no LineInBarShape hairline
- Hover: non-active bars 30% opacity
- QA: inner-pair gap identical at 360 and 1024; category gap grows; bars stay 24px
Visual: pencil/designs/0-ideation/openui-charts-v2.lib.pen
```

---

## HorizontalBarChart

**Status:** LOCKED  
**Visual:** `openui-charts-v2.lib.pen` — HorizontalBarChart / Default (`xbSBV`), Hover (`Mz3z5`)

Ranking chart: **one bar per row**. Demo colors `color-01, 13, 07, 09, 15` (bind to series data, not forever to row index). There is **no** grouped two-series HorizontalBarChart component — skip inner-pair `barGap`.

### Layout

| Token | Value | Grows with chart height? |
|---|---|---|
| Bar thickness (bar height) | `24px` (`$spacing-md`) — same as vertical BarChart | **No** |
| Row gap (between categories) | min `8px` (`$spacing-2xs`); remainder of plot height | **Yes** |
| Label column | 70px, `xs-regular` `$colors-text-meta` | No |
| Bar length | proportional to value; unused track is empty, not a % gap | — |

Pencil PlotArea on the masters: `layout: vertical`, `gap: $spacing-2xs`. Same leftover idea as BarChart, on the **category (row) axis**.

### MUST

1. Thickness is **pixels** (`24`). Bars never stretch taller to fill the plot.
2. Leftover plot height goes **only** into row gap. It must not increase bar thickness.
3. Hover: `ChartTooltip` `cursor={false}`. Non-hovered bars at **30% opacity**; hovered row at 100%; tooltip as shared chrome. **No** gray band.
4. Series fills use `$chart-categorical/color-*` tokens (light **and** dark).

### MUST NOT

- Invent a grouped/side-by-side HorizontalBarChart or an inner-pair 4px gap.
- Use `%` for bar thickness or row gap.
- Add a gray (or any) full-width highlight behind a row.
- Apply `05-charts.json` gap ratios.

### Constants (copy-paste)

```ts
const HBAR_THICKNESS = 24; // $spacing-md
const HBAR_ROW_GAP_MIN = 8; // $spacing-2xs

function horizontalRowGapPx(
  plotHeight: number,
  categoryCount: number,
): number {
  const leftover = plotHeight - categoryCount * HBAR_THICKNESS;
  return Math.max(HBAR_ROW_GAP_MIN, leftover / categoryCount);
}
```

### Visual QA

Measure at short and tall plot heights (same 5 rows):

| Check | Pass |
|---|---|
| Bar thickness is **24px** at both heights | |
| Row gap is **larger** when the plot is taller | |
| Hover: **no** gray/tinted full-width band | |
| Hover: other rows ~30% opacity; tooltip present | |

---

## LineChart / AreaChart

**Status:** LOCKED (2026-08-20)  
**Visual:** LineChart Default / Hover / Single Series; AreaChart Default / Hover / Single Series

**Interpolation (decided 2026-08-20, matches Pencil as-drawn):**

| Surface | Recharts | Looks like |
|---|---|---|
| LineChart / AreaChart (full) | `type="monotone"` | **Smooth** curve through the points (Pencil paths are cubic Béziers) |
| MiniLine / MiniArea | `type="linear"` | **Straight** segments (Pencil minis are polylines) |

This supersedes handoff R7's "straight everywhere" for full-size charts. Monotone (not `natural`/`basis`) so the curve never overshoots the data points.

| Token | Value |
|---|---|
| Stroke | 2px series **token** (theme-aware) |
| Grid | 1px `$colors-borders-light` (dark `#131E34`) |
| Hover | vertical scrubber 1px `$colors-text-meta`; 8px dots on each series at the hovered x; tooltip as shared chrome; **`cursor={false}` — no gray band** |
| Area fill | linear gradient 180°; opaque stop = series token (`$chart-categorical/color-*`); transparent stop = `#00000000`. Do **not** hardcode light hex (`#2DD4BF` / `#3B82F6`) — that stays light-teal in dark mode. |
| Demo series | Line: Portfolio `color-09`, Benchmark `color-04`. Area: Assets `color-07`, Liabilities `color-04` |

**MUST NOT:** gray Recharts tooltip cursor; hardcoded light-only area fills; `type="natural"` or `basis` smoothing (overshoots data).

---

## DonutChart

**Status:** DRAFT — restyled 2026-08-20 from the Component Template v2.0 HTML (hover, tooltip, center labels); awaiting visual accept  
**Visual:** Donut Chart (`of7TM`), Hover (`Ah1gA`)  
**Not shown:** PieChart — do not implement pie.

| Token | Value |
|---|---|
| Diameter | 140px in the 360 card (scale with card; keep inner ratio) |
| Inner radius | **0.75** of outer — thinner ring than the old 0.55, per the HTML template; the bigger hole is what fits the center labels |
| Slice gaps | 2.5° angular gap between slices |
| **Center labels** | stacked and centered in the hole: **value** `base-semibold` (16) `$colors-text-header` + **label** `xs-regular` (12) `$colors-text-meta`. Demo: “$4,250” / “Monthly Spend”. Always the total — hover does not swap the center. |
| Body layout | donut + legend, gap `$spacing-md` |
| Legend | vertical, gap `$spacing-2xs`, round swatches |
| Hover | active slice 1.0, **all other slices dim to 0.3**; tooltip per shared chrome |
| Tooltip rows | header = slice name; row 1 marker + “Share” + `40%`; row 2 marker + “Value” + `$1,700` (share **and** absolute value, per HTML template) |

Demo slices: Housing `color-01`, Food `color-09`, Transport `color-13`, Other `color-07`.

---

## SingleStackedBarChart

**Status:** LOCKED (2026-08-20 — hover-dims-others confirmed)  
**Visual:** Default (`F2doj6`), Hover (`y9VCqa`)

| Token | Value |
|---|---|
| Title | `base-semibold` header |
| Bar height | **32px**, width 100% |
| Segments | flush (no gap); widths = share of total |
| Legend | gap `$spacing-sm`; item gap `$spacing-3xs`; round 10×10 swatches |
| Hover | active segment 1.0; others 0.3; tooltip; no gray cursor |

Demo: `color-10`, `07`, `14`, `08`.

---

## MiniLineChart / MiniAreaChart / MiniBarChart

**Status:** LOCKED (2026-08-20 — **sparkline only** confirmed: no axes, no legend, no tooltip, no hover state)  
**Visual:** `vkAPW`, `NjGWt`, `ggreE` — 160px wide sparkline cards

| Token | Value |
|---|---|
| Card | surface, `$colors-borders-light`, pad `$spacing-2xs` (8), `$radius-sm` |
| MiniLine | `color-09`, 2px, no axes/legend/tooltip; **straight segments** (`type="linear"`) |
| MiniArea | `color-07` line + matching fade fill (token → `#00000000`, same as AreaChart); **straight segments** |
| MiniBar | `color-04`, gap `$spacing-3xs` between bars; bars **may** fill the sparkline width (not the 24px BarChart rule) |

**MUST NOT:** apply BarChart `barSize=24` / leftover category-gap math to MiniBarChart.

---

## HeatmapChart

**Status:** DRAFT — include in the Sept 1 work order at **LOW priority** (decided 2026-08-20). Q16 (text contrast per theme) deferred — remind design before locking.  
**Visual:** HeatmapChart (`OFPgw`), Positive-Negative (`ZHtoG`)

| Token | Value |
|---|---|
| Card | same shared chart chrome |
| Cell grid gap | `$spacing-xs` (12) |
| Cell | min height 80, pad `$spacing-sm`, radius `$radius-xs`, gap `$spacing-2xs` inside |
| Cell label | `xs-semibold` |
| Cell value | `sm-semibold` |
| Text on dark/saturated cells | `$colors-text-reverse` (seq-600 and success-bold in the demo) |
| Text on light cells | `$colors-text-header` |
| Title | `md-semibold` header |
| Description | `base-regular` meta |
| Default scale | sequential blue `seq-100…600` |
| Positive-Negative | success-bold / strong / soft vs error-strong |

Variant is description-driven (catalog copy): sequential for magnitude; diverging for gain/loss vs benchmark.

**Dark-mode contrast (Q16 — deferred 2026-08-20, remind design):** the 2026-08-20 token sync fixed the worst case — seq-100 dark is now `#163196`, so header text (`#D8E1F0` dark) reads fine on the Energy cell. Still open: mid-ramp cells (seq-400 dark `#5A82F9`) under header text, and the general rule for which cells use header vs reverse text per theme. Sequential scale **inverts** in dark (lighter = larger). Bind tokens; do not bake light hex.

---

## TextContent

**Status:** DRAFT (as-drawn)  
**Visual:** `openui-content.lib.pen`  
**Vendor gap (B1):** vendor sizes are `small` \| `default` \| `large` \| `small-heavy` \| `large-heavy`. Ours: `small` / `medium` / `large` / `large-heavy`. Map `medium` → vendor `default`. `small-heavy` not ported.

| Size | Type | Color |
|---|---|---|
| small | `typo-primary-sm-regular` 14 / 1.4286 | body |
| medium (`default`) | `typo-primary-base-regular` 16 / 1.5 | body |
| large | `typo-primary-md-regular` 18 / 1.5556 | body |
| large-heavy | `typo-primary-lg-semibold` 20 / 1.4 | header |

No extra padding on the component — Card supplies inset. Width 100%.

Response title idiom: `TextContent` large-heavy. Never open with a banner.

---

## MarkDownRenderer

**Status:** DRAFT (as-drawn)  
**Visual:** `mdRnd01`

| Element | Rule |
|---|---|
| Block gap | `$spacing-sm` (16) |
| Heading | `base-semibold` header, lh 1.5 |
| Paragraph | `base-regular` body; internal stack gap `$spacing-3xs` if split |
| Bold | `base-semibold` header, same size as body |
| List indent | `padding-left: $spacing-sm` |
| List item gap | `$spacing-3xs` between items; `$spacing-2xs` between bullet and text |
| Bullet + item text | **body 16**, not sm |
| Link | `base-regular` `$colors-text-action` `#3a6af8` |

**MUST:** markdown bullets are body prose (16px), identical to TextContent medium.

---

## ListBlock / ListItem

**Status:** DRAFT (as-drawn)  
**Visual:** `lsBlk1`, `lsItm1`  
**Vendor gap (B2):** vendor supports number/image indicators and row actions. Ours are static `•` markers. Style the current port; do not invent clickable rows until B2 is designed.

| Part | Rule |
|---|---|
| Block gap | `$spacing-sm` |
| Header title | `sm-semibold` header |
| Header subtitle | `sm-regular` meta; header stack gap `$spacing-3xs` |
| Row | pad `[$spacing-2xs, 0]`; marker-to-text gap `$spacing-2xs` |
| Marker + text | `base-regular` body (16 / 1.5) |
| Row separator | 1px `$colors-borders-light` (omit after last) |

Use ListBlock only for standalone option/step lists. Inline bullets stay in markdown (handoff R3).

---

## Card / CardHeader

**Status:** DRAFT (as-drawn)  
**Visual:** Card default `lCyKe`, Elevated `C8bVq`, Outlined `crdOut1`, Sunk `0o5Mwf`; CardHeader `aWGXmp`

Chat: **every response is one Card**; children stack. `variant: "sunk"` for nested cards.

| Variant | Fill | Stroke | Pad | Gap | Radius |
|---|---|---|---|---|---|
| default | surface | `$colors-borders-light` 1 | `$spacing-md` | `$spacing-sm` | `$radius-sm` |
| elevated | surface | `$colors-borders-light` (shadow `$shadow-sm-*` if vendor elevated maps to shadow — Pencil still shows hairline) | same | same | same |
| outlined | surface | `$colors-borders-dark` 1 | same | same | same |
| sunk | `$color-taupe-200` | none | same | same | same |

CardHeader: gap `$spacing-3xs`; title `base-semibold` header; subtitle `sm-regular` meta.

**MUST NOT:** implement the demo black/white button inside the Card masters as the product Button. Chat actions use **Button** from `openui-actions.lib.pen`.

---

## Stack / Separator

**Status:** DRAFT (as-drawn)

**Stack:** not used in chat responses (vendor R1). General-purpose only. Demo gap `$spacing-sm`, pad `$spacing-md`. Do not ship the taupe demo fill as a required Stack color — Stack is a layout primitive (gap + direction). Default gap `$spacing-sm`.

**Separator:** 1px `$colors-borders-light`. Horizontal = full width × 1px. Vertical = 1px × full height.

---

## Tabs / TabItem

**Status:** DRAFT (as-drawn)  
**Visual:** Tabs `QnwgE`, TabItem Active `cNNnGg` / Inactive `ZZhScV`

| State | Label | Indicator |
|---|---|---|
| Active | `sm-semibold` `$colors-btnLinkText` `#3a6af8` | 2px full-width bar, same blue, `$radius-full` |
| Inactive | `sm-regular` `$colors-text-body` | none |

Tab row: gap `$spacing-2xs`; tab height 40; active has top pad `$spacing-xs` so the indicator sits on the bottom edge. Hairline under the tab list: `$colors-borders-light`.

---

## Accordion / AccordionItem

**Status:** DRAFT (as-drawn)

| Part | Rule |
|---|---|
| Trigger height | 56 |
| Trigger title | `base-regular` body (not semibold) |
| Chevron | 20×20, `$colors-text-body` |
| Open body | `sm-regular` body; gap `$spacing-xs` under trigger; item pad bottom `$spacing-md` |
| Between items | Separator 1px light, horizontal inset `$spacing-md` |

---

## Carousel

**Status:** DRAFT (as-drawn)  
**Visual:** `GeREkW`

Slides: same structure/order (vendor). Slide card: surface, light border, pad `$spacing-sm`, gap `$spacing-2xs`, `$radius-xs`, width 200 in demo. Title `sm-semibold` header; value `lg-semibold` body. Peek slide opacity 0.5. Dots: 8×8; active `$colors-text-header`; inactive `$color-gray-200`; gap `$spacing-2xs`. Track gap `$spacing-sm`.

---

## Steps / StepsItem

**Status:** DRAFT (as-drawn)

Circle 32×32, `$radius-full`. Connector 40×2.

| State | Circle | Glyph | Label |
|---|---|---|---|
| Complete | `$colors-text-header` | 16 icon reverse | `xs-regular` header |
| Active | `$colors-btnLinkText` | `sm-semibold` reverse | `xs-semibold` header |
| Upcoming | surface + light border | `sm-semibold` meta | `xs-regular` meta |

Item gap `$spacing-2xs`. List pad `[$spacing-sm, 0]`.

---

## Modal

**Status:** DRAFT (as-drawn)  
**Visual:** `0Jdtu5`

| Part | Rule |
|---|---|
| Overlay | `#00000066` |
| Dialog | surface, light border 1, pad `$spacing-md`, gap `$spacing-sm`, `$radius-sm`, ~320 wide in demo |
| Title | `base-semibold` header |
| Close | 18 icon meta |
| Body | `sm-regular` body |
| Actions | gap `$spacing-2xs`; pills. Cancel: light border, `sm-semibold` body. Confirm: **use actions Primary Button**, not the demo `$colors-text-header` fill |

---

## Table / Col

**Status:** DRAFT (as-drawn)  
**Visual:** Table `uvSyt`, Col `f5qGbV`

| Part | Rule |
|---|---|
| Header row | fill `$color-taupe-100`, pad `[$spacing-xs, $spacing-xs]`, gap `$spacing-sm`, radius `$radius-2xs` on top |
| Header label | `xs-semibold` meta, letter-spacing 0.5 |
| Sort icon | 12×12 meta |
| Body row | pad `[$spacing-xs, $spacing-sm]`, gap `$spacing-sm`, hairline `$colors-borders-light` |
| Body cell | `sm-regular` body |
| Positive amount | `$colors-text-deposit` `#148338` |

---

## Tag / TagBlock

**Status:** DRAFT (as-drawn)

Pad `[$spacing-3xs, $spacing-2xs]`, `$radius-3xs`, `xs-regular` (Large = `sm-regular`). TagBlock gap `$spacing-2xs`, wrap.

| Variant | Fill | Text |
|---|---|---|
| Default | `$color-blue-100` `#ebf0fe` | `$color-blue-700` `#2952cc` |
| Pending | `$color-orange-100` `#fee4d2` | `$color-orange-700` `#964713` |
| Error | `$color-red-100` `#fed5d4` | `$color-red-700` `#961a18` |
| Positive | `$color-green-100` `#a9fdc4` | `$color-green-700` `#0b461e` |

---

## CodeBlock

**Status:** DRAFT (as-drawn)

Stroke `$colors-borders-dark` 1, `$radius-2xs`. Header: `$color-taupe-100`, pad `[$spacing-3xs, $spacing-sm]`; language `xs-semibold` meta; copy control `xs-regular` meta + 12 icon. Body: `$color-gray-900` `#0e0e0e`, pad `$spacing-sm`, gap `$spacing-3xs`; code `sm-regular` `$colors-text-reverse`. (Pencil uses Heebo; if engineering has a monospace token, keep size/weight/color and only swap family with design approval.)

---

## Image / ImageBlock / ImageGallery

**Status:** DRAFT (as-drawn)

Image: `$color-gray-100` well, `$radius-2xs`; placeholder gradient `#D5D3D0` → `#EEEDEB`. Icon 32 meta (gallery cells 20). ImageBlock: gap `$spacing-2xs`; caption `sm-regular` body; credit `xs-regular` meta. Gallery: 2×2, gap `$spacing-2xs`, cell height 120 in demo.

---

## Form / FormControl / Label

**Status:** DRAFT (as-drawn)

**Form:** surface, `$colors-borders-dark` 1, pad `$spacing-md`, gap `$spacing-md`, `$radius-xs`. Title `md-semibold` header. Always takes explicit Buttons (vendor). Submit in demo is full-width Primary.

**Label:** `sm-semibold` header. Required asterisk `$colors-text-error`.

**FormControl:** gap `$spacing-3xs` (label → field → hint). Hint `xs-regular` meta. Error `xs-regular` `$colors-text-error`. Error field stroke `$colors-borders-error` (Input error uses 1.5px; FormControl error 1px — implement **1.5px** on error to match Input).

---

## Input / TextArea

**Status:** DRAFT (as-drawn)

Field: surface, pad `[$spacing-xs, $spacing-sm]`, `$radius-2xs`, value/placeholder `sm-regular`.

| State | Stroke | Fill | Text |
|---|---|---|---|
| Default | `$colors-borders-dark` 1 | surface | placeholder `$colors-text-placeholder` |
| Focused / filled | `$colors-borders-focus` **2px** `#0e0e0e` | surface | body |
| Error | `$colors-borders-error` **1.5px** | surface | body + error message xs |
| Disabled | dark 1 | `$color-gray-100` | placeholder; label also placeholder |

TextArea min height 100; same states (Filled in Pencil = focused 2px).

---

## Select / SelectItem

**Status:** DRAFT (as-drawn)

Control: fill `$colors-background-main` (taupe page), stroke dark 1, pad `[$spacing-xs, $spacing-sm]`, `$radius-xs` (12 — not the input’s 8). Placeholder `sm-regular` meta; filled value header. Chevron 16 `$colors-icons-meta`. Focused: `$colors-btnPrimaryBg` 2px. Disabled: fill `$colors-borders-light`, muted chevron.

Menu: surface, dark stroke, pad `$spacing-3xs`, `$radius-xs`. Item pad `[$spacing-xs, $spacing-sm]`, radius 8 (`$radius-2xs`). Selected: `$color-taupe-200`. Default: transparent.

---

## CheckBox / Radio / Switch

**Status:** DRAFT (as-drawn)

Groups: label `sm-semibold` header; item gap `$spacing-2xs` (SwitchGroup `$spacing-sm` between items). Item label `sm-regular` body. Disabled: opacity 0.5 + placeholder label.

| Control | Size | Unchecked | Checked / on |
|---|---|---|---|
| Checkbox | 18, `$radius-3xs` | surface, dark stroke 1.5 | `$color-blue-600` fill, 12 reverse check |
| Radio | 18 circle | surface, dark stroke 1.5 | ring `$color-blue-600` 2px + 8px inner dot |
| Switch | track 40×22 `$radius-full`; thumb 16 | track `$color-gray-200` | track `$color-blue-600`; white thumb |

---

## Slider / DatePicker

**Status:** DRAFT (as-drawn)

**Slider:** label `sm-semibold` header + value `sm-regular` meta. Track 4px `$color-gray-200` `$radius-full`; fill `$color-blue-600`; thumb 18, white fill, blue stroke 2. Disabled opacity 0.5, gray fill/stroke.

**DatePicker:** same field chrome as Input default; calendar icon 16 meta; placeholder vs body for empty/filled.

---

## Button / IconButton / Buttons

**Status:** DRAFT (as-drawn)  
**Visual:** `openui-actions.lib.pen`

All buttons **pills** `$radius-full`. Label: Heebo **16px** / weight 600 / lh 1.5 (`$typo-primary-base-semibold-font-size`; family token is sm — **size wins: 16**). Pad `[$spacing-2xs, $spacing-sm]` (8 / 16). IconButton: **44×44**, icon 20. Buttons group: gap `$spacing-xs` (12), horizontal.

### Primary

| State | Fill | Text/icon |
|---|---|---|
| Default | `$colors-btnPrimaryBg` `#3a6af8` | `$colors-btnPrimaryText` `#ffffff` |
| Hover | `$colors-btnPrimaryBgHover` `#2952cc` | white |
| Pressed | `$colors-btnPrimaryBgActive` `#163196` | white |
| Disabled | `$colors-btnPrimaryBgDisabled` `#c8d6fd` | `$colors-btnPrimaryTextDisabled` white |

### Secondary (outline / inverted)

| State | Fill | Text/icon |
|---|---|---|
| Default | `$colors-btnPrimaryInvertedBg` white | `$color-blue-600` |
| Hover | `$color-blue-100` | `$color-blue-600` |
| Pressed | `$color-blue-200` | `$color-blue-700` |
| Disabled | white | `$colors-text-placeholder` (actions: `#a5bcfc`) |

Pencil secondary has no visible blue border on default — fill white, blue label. Do not add a gray border.

### Ghost

| State | Fill | Text/icon |
|---|---|---|
| Default | transparent `$colors-btnSecondaryBg` | `$color-blue-600` |
| Hover | `$colors-btnSecondaryBgHover` `#ebf0fe` | `$color-blue-700` |
| Pressed | `$colors-btnSecondaryBgActive` `#c8d6fd` | `$color-blue-800` |
| Disabled | transparent | `$color-blue-300` |

---

## FollowUpBlock / FollowUpItem

**Status:** DRAFT (as-drawn)

Always **last** in the Card (handoff R6). 2–4 chips.

**FollowUpItem** is the chip source of truth (the composed FollowUpBlock still shows `$color-gray-50` — **do not implement gray-50**; use taupe):

| State | Fill |
|---|---|
| Default | `$color-taupe-100` `#F7F5F0` |
| Hover | `$color-taupe-200` `#EDEAE3` |
| Pressed | `$color-taupe-300` `#E3DFD6` |

Chip: pad `[$spacing-xs, $spacing-sm]` (12 / 16), gap `$spacing-2xs`, `$radius-full`. Label `sm-regular` **header** (`#0e0e0e`), lh 1.4286. Arrow 14 `$colors-icons-meta`.

**FollowUpBlock:** title `xs-semibold` meta (e.g. “Follow up”); chips wrap, gap `$spacing-2xs`.

Chip radius in product chat is 24px visual (full pill). Border: optional `$colors-borders-dark` `#DCD8CB` to match `chat.chip.border` — masters currently have **no** stroke; match masters (no border) unless chat chips already stroke in product.

---

## TextCallout

**Status:** DRAFT (as-drawn) — **vendor rebuild still open (B4)**  
**Visual:** `NIJUB`  
**NOT SHOWN:** Callout. TextCallout is the only in-answer status note.

**As drawn today (implement this until B4 ships):**

| Part | Rule |
|---|---|
| Fill | `$color-taupe-200` |
| Pad | `[$spacing-xs, $spacing-sm]` |
| Gap | `$spacing-xs` |
| Radius | `$radius-xs` |
| Accent bar | 3×24, `$colors-text-meta`, radius 2 |
| Text | `base-regular` body (16 / 1.5) |

**Vendor target (B4, do not fake variants until designed):** `neutral` \| `info` \| `warning` \| `success` \| `danger` + title + description. Callout color ramps already in the feedback lib (sky/green/orange/red 50/100/600) are for that rebuild — **not** for shipping Callout.

Never lead a response with TextCallout (handoff R4).

---

## MessageLoading / Skeleton / TableSkeleton

**Status:** DRAFT (as-drawn)

**MessageLoading:** fill `$color-taupe-200`, pad `$spacing-sm`, gap `$spacing-2xs`, `$radius-xs`. Dots 8×8: placeholder / meta / placeholder (middle darker).

**Skeleton:** fill `$color-gray-100`, pad `$spacing-md`, gap `$spacing-sm`, `$radius-xs`. Bars 12px tall, radius 4, shimmer gradient `$color-gray-200` → `$color-gray-100` → `$color-gray-200`.

**TableSkeleton:** surface, dark stroke 1, `$radius-xs`. Header `$color-taupe-100`; rows surface; same shimmer bars; pad `[$spacing-xs, $spacing-md]`; col gap `$spacing-sm`.

---

## Callout — NOT SHOWN

Do not add Callout to the GenUI palette. Do not emit it from the LLM. Status duty is TextCallout only. Four variants remain in `openui-feedback.lib.pen` for B3 cleanup — **not a production component**.

If someone implements from the file by mistake: Info/Success/Warning/Error use sky/green/orange/red 50 fill, 100 stroke, 600 icon; pad `$spacing-sm`; gap `$spacing-xs`; `$radius-xs`; title `sm-semibold` header; message `base-regular` body.

---

## Not shown / not ported

| Item | Rule |
|---|---|
| PieChart | Not shown. Use DonutChart. |
| RadialChart | Not shown. v1 only. |
| RadarChart / ScatterChart | Cut 2026-08-17. May return. |
| SectionBlock / SectionItem | Not ported (B6). |
| FullScreen / Copilot / BottomTray / ToolCall / ToolResult | Not ported (B7). |

---

## Visual QA (every DRAFT component)

Before merge of a wrapper:

1. Open the **Visual** `.pen` named in the section.
2. Compare at **360px** (and **1024px** if the component is a chart or Card).
3. Check: type size + line-height, colors, padding/gap, radius, hover/disabled if designed.
4. Fail if vendor Inter, vendor gray hover cursor on charts, stretched BarChart pairs, or Callout/Pie in the palette.

BarChart additionally requires the LOCKED checklist in that section.
