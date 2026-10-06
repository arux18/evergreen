# OpenUI Priority Styling — Text & Spacing

> **Status (2026-08-13):** Findings 1–5 are **resolved** (canonical Hemlock-value tokens, explicit line-heights, P0 restyle, lint gate). **Palette decision (show-list):** the GenUI palette will **not** show `Callout`, `RadialChart`, or `PieChart`; it **will** show `DonutChart` (in place of PieChart), `RadarChart`, `ScatterChart`, and `TextCallout`. RadarChart + ScatterChart have been re-added to `openui-charts-v2.lib.pen` (v2 is now the single chart lib). See "Shown-palette decisions" below.
>
> _Earlier status (2026-08-10): canonical token sync, P0 restyle, lint script._

Priority list for customized Hemlock styling of the OpenUI component libraries (`openui-*.lib.pen`), focused on typography, spacing, and content-pattern usage (paragraphs vs. bullet lists vs. callouts). Companion to `openui-components-handoff.md`.

**How to implement:** `openui-implementation-contract.md` — one file, every shown component (palette + layout/type/spacing/hover). **LOCKED:** shared chart chrome, BarChart, HorizontalBarChart, LineChart/AreaChart (full curved, minis straight), SingleStackedBarChart, Mini charts, DonutChart (include light **and** dark token values). Other sections are **DRAFT (as-drawn)** while restyling continues — update the contract when Pencil changes; do not treat DRAFT as a freeze. Do not add per-component `*-implementation.md` files. Pencil libs go with that markdown as visual QA.

**Epic priority order (2026-08-20, per design):** high-priority items are ① **all BarChart variants** (locked, ready now), ② **all Table variants** (`openui-data-display.lib.pen` — after charts), ③ **headers/text** (`openui-content.lib.pen` — after charts). HeatmapChart ships in the same Sept 1 work order at **low priority**. **OPEN reminder — Q16:** heatmap text contrast per theme is deferred; remind design before locking heatmap text colors.

Audit basis: all 8 OpenUI lib files, cross-referenced against `hemlock-library.lib.pen` (351 components, 1,044 tokens), the vendor catalog (`@openuidev/react-ui` `genui-lib` source, 2026-08-13), and the approved screens that import OpenUI (`login.pen`, `settings-contact-us.pen`, `settings-menu.pen`, `View-Presentation-Ideation.pen`).

## Shown-palette decisions (2026-08-13)

| Component | Decision | Consequence |
|-----------|----------|-------------|
| **Callout** | NOT shown | Removed from P0 styling list. TextCallout becomes the **only** status-note component — its vendor-spec rebuild (variant + title + description, incl. `danger`) moves up in priority (backlog B4). |
| **TextCallout** | Shown | Now carries all in-answer status duty that Callout used to cover. |
| **PieChart** | NOT shown | DonutChart replaces it. Note: the vendor library still ships "pie" — the removal must also happen in the LLM palette/catalog copy, or the model may still emit PieChart (see CAL-927 prohibited list). |
| **RadialChart** | NOT shown | Consistent with the vendor catalog, which never had it. Exists only in the legacy `openui-charts.lib.pen` (v1), which is now superseded by v2. |
| **DonutChart** | Shown (in place of PieChart) | Lives in v2; styling as per P3. |
| **RadarChart** | NOT shown (2026-08-17) | Cut from v2 (had been briefly re-added). May return later. Note: this now **aligns** with CAL-927, which removed Radar from the production palette. |
| **ScatterChart** | NOT shown (2026-08-17) | Cut from v2 alongside Radar; may return later. Divergence note: CAL-927 kept Scatter — our cut is a product decision beyond the tickets. |
| **HeatmapChart** | Shown (2026-08-17) | Ported from Hemlock's `component/HeatmapChart` into v2 — **two variants**: default (sequential blue scale) and **Positive-Negative** (diverging red/green via `colors-background-error-strong` / `colors-background-success-*`). Variant selection is description-driven — the catalog copy must say when to use each (see note below). |

---

## Cross-Cutting Findings (fix these first — they affect every component)

| # | Finding | Impact |
|---|---------|--------|
| 1 | **Type scale drift in `openui-content.lib.pen`.** Its local type tokens run one full step smaller than Hemlock: base = 14px (Hemlock 16), sm = 12px (Hemlock 14), md = 16px (Hemlock 18), lg = 18px (Hemlock 20). | Every paragraph, list, and markdown block renders visibly smaller than the rest of the product. This is the single highest-impact text issue. |
| 2 | **No lib imports Hemlock.** All 8 files define their own local copy of tokens (21–69 per file) with zero `imports`. The `migrate-openui-hemlock-tokens.py` script exists but has not been run (and does not cover `content` or `charts`). | Token values drift silently; a Hemlock update never propagates. |
| 3 | **Line-height is not token-bound anywhere.** Outside the content lib, `lineHeight` is unset on ~95% of text nodes (falls back to font default). Content lib hardcodes raw multipliers (1.5 / 1.3) instead of Hemlock's `typo-primary-*-line-height` tokens (24px base / 20px sm). | Inconsistent vertical rhythm; spacing between text blocks is unpredictable. |
| 4 | **`openui-actions.lib.pen` has no spacing/radius tokens at all** — 42 hardcoded padding values (e.g. chips at `[10, 16]`, gaps at `8`) and legacy `$text.primary` / `$text.secondary` fills. | Buttons and follow-up chips (used in 3 approved screens) are off-system. |
| 5 | **List text size is inconsistent between list components.** `MarkDownRenderer` list items use base size; `ListBlock`/`ListItem` use sm size. | Two visually different bullet styles depending on which component the AI output picks. |
| 6 | **The OpenUI Chat Library referenced in the handoff doc does not exist.** No `.pen` file contains FullScreen, Copilot, BottomTray, ToolCall, or ToolResult. | The 5 chat-shell components have no source of truth at all. |

---

## P0 — Critical (carry every AI text response)

These components decide how paragraphs, bullet points, and emphasis render in chat. Style these first.

| Component | File | What needs custom styling |
|-----------|------|---------------------------|
| **MarkDownRenderer** | content | No Hemlock equivalent exists — must be built. Define the full type ramp for markdown output (headings, paragraph, bold/inline emphasis, links), block spacing (currently `gap: $spacing-sm`), paragraph internal spacing (`$spacing-3xs`), list indent (`padding-left: $spacing-sm`) and bullet style. Bind all sizes/line-heights to Hemlock `typo-primary-*` tokens. This component owns the paragraphs-vs-bullets decision in practice. |
| **TextContent** (small / medium / large / large-heavy) | content | Fix the type-scale drift (Finding 1): map small → `typo-primary-sm` (14px), medium → `base` (16px), large → `md` (18px), large-heavy → `lg-semibold` (20px). Replace raw `lineHeight: 1.5 / 1.3` with the matching `-line-height` tokens. |
| **ListBlock / ListItem** | data-display | Align item text to base size (match MarkDownRenderer lists — Finding 5). Token-bind the bullet marker (currently a literal `•` text node), item gap (`$spacing-2xs`), row padding (`[$spacing-2xs, 0]`), and header title/subtitle styles. Hemlock already has a `ListBlock` with 8 variants — reconcile the two rather than maintaining both. |
| **TextCallout** | feedback | **Elevated to sole status-note component** (Callout is not shown). Rebuild to vendor spec (backlog B4): variant (neutral/info/warning/success/danger) + title + description, all on Hemlock tokens. Current port is only a single-sentence emphasis bar: `padding: [$spacing-xs, $spacing-sm]`, `gap: $spacing-xs`, `$hover.bg` fill, `$radius` corner, accent bar in `$text.secondary`. |

~~Callout~~ — **removed from the shown palette (2026-08-13)**; no styling work. The OpenUI copy gets retired with the feedback-lib cleanup (backlog B3).

## P1 — High (frame the text content)

| Component | File | What needs custom styling |
|-----------|------|---------------------------|
| **CardHeader** | layout | Title (base-semibold) + subtitle (sm-regular, `$colors-text-meta`) with `gap: $spacing-3xs` — bind line-heights; align with Hemlock `CardHeader` (6 variants incl. dense). |
| **Card** (default / elevated / outlined / sunk) | layout | Padding `$spacing-md`, gap `$spacing-sm`, radius `$radius-sm` — confirm against Hemlock Card variants (sm / dense / lg). Remove the embedded button's hardcoded `#FFFFFF` label fill. |
| **FollowUpBlock / FollowUpItem** | actions | Highest-traffic chat action after buttons. Replace hardcoded chip padding `[10, 16]` and gap `8` with spacing tokens; replace legacy `$text.primary/secondary` with `$colors-text-*`; chip label sm-regular needs a defined line-height. Hemlock `FollowUpBlock` (7 variants) already exists — reconcile. |
| **Button / IconButton / Buttons** | actions | All 42 hardcoded paddings → spacing tokens (Finding 4). Fix the label token mismatch (`fontFamily` from the sm scale + `fontSize` from the base scale — pick one scale). Ghost/link variants use `$color-blue-600/700/800` — confirm blue is an approved Hemlock accent for actions or remap. IconButton has no Hemlock equivalent (Hemlock Button only has icon-left/right) — needs to be built or folded into Button. |
| **Accordion / AccordionItem** | layout | Header text style + weight, expand/collapse icon spacing, body text padding. Hemlock equivalent exists — verify mapping. |
| **Modal** | layout | Overlay padding, title style, body text spacing. Hemlock has `ModalDrawer` — confirm Modal vs ModalDrawer is an intentional distinction. |
| **Stack / Separator** | layout | Pure spacing components — make gap/padding token-bound so every composed screen inherits the Hemlock rhythm. |
| **Tabs / TabItem** | layout | Tab label size/weight for active vs inactive; tab bar padding/gap. Hemlock `TabsGroup`/`TabItem` exist — reconcile. |

## P2 — Medium (structured data & forms)

| Component | File | What needs custom styling |
|-----------|------|---------------------------|
| **Table / Col** | data-display | No generic Hemlock table exists (only Transaction/Holdings-specific ones). Define header cell (xs-semibold, meta color), body cell (sm-regular), row padding, and column gap as tokens. |
| **Form / FormControl / Label** | forms | Label → input gap, hint/error text (xs-regular, `$colors-text-error`), section spacing. Clean up mixed legacy `$text.*` and current `$colors-text-*` fills. Hemlock has `Label` variants but no Form scaffolding — build or document the gap. |
| **Tag / TagBlock** | data-display | Status text colors currently use raw `$color-blue/orange/red/green-700` — map to Hemlock semantic status tokens; tag padding and icon gap to spacing tokens. |
| **CodeBlock** | data-display | Code surface tokens (`$colors-code-bg` etc. — migrate script maps these to `color-gray-900` / `$colors-text-reverse`); confirm monospace font choice and padding. |
| **MessageLoading / Skeleton / TableSkeleton** | feedback | No Hemlock equivalents. Low text content, but skeleton surface tokens (`$skeleton.bg/shimmer`) need mapping to Hemlock taupe scale. |
| **Steps / StepsItem** | layout | Step label + description text styles, connector spacing. Hemlock `Steps` exists — verify. |
| **Image / ImageBlock / ImageGallery / Carousel** | data-display, layout | Caption/credit text (xs-regular, meta color) and caption spacing only — otherwise low priority. |

## P3 — Lower (charts)

| Component | File | What needs custom styling |
|-----------|------|---------------------------|
| **Shown chart components** | charts-v2 | Axis labels, tick text, tooltips, and legends all use xs-regular/xs-semibold on `$colors-text-meta/body` — token-bind these and set line-heights. **All shown chart rules live in `openui-implementation-contract.md`.** LOCKED: shared chrome, BarChart, HorizontalBarChart, Line/Area (full curved `monotone`, minis straight `linear`), SingleStackedBar, Mini charts, DonutChart (HTML template port, accepted 2026-08-20) — all light + dark. HeatmapChart low priority (Q16 contrast deferred). **v2 is the single chart lib.** Shown set: BarChart, HorizontalBarChart, LineChart, AreaChart, DonutChart (replaces PieChart), SingleStackedBarChart, Mini*, HeatmapChart. Not shown: PieChart, RadialChart; RadarChart + ScatterChart cut 2026-08-17. |

---

## Content-Pattern Usage Rules (paragraphs vs. bullets vs. callouts)

Styling priorities above assume these usage conventions, so each pattern has exactly one styled home:

| Pattern | Use | Not for |
|---------|-----|---------|
| **Paragraph** (TextContent, or markdown `p` via MarkDownRenderer) | Default for all prose. Narrative answers, explanations, summaries. Medium/base (16px) is the default body size; small for timestamps/meta; large/large-heavy for lead-ins and section titles. | Anything that is a set of discrete comparable items. |
| **Bullet list** (markdown list via MarkDownRenderer) | Short unordered items inside a flowing AI answer — the inline default. | Items needing titles, descriptions, tags, or actions. |
| **ListBlock / ListItem** | Structured lists that stand on their own: "Next steps", checklists, numbered procedures, radio-selectable options. Has its own header (title + subtitle). | Inline lists mid-paragraph — use markdown bullets instead. |
| **TextCallout** | The **only** in-answer status component (variant + title + description per vendor spec; e.g. a key figure or takeaway with status color). | Headlines; multi-sentence content. |
| ~~Callout~~ | **Not shown** (removed from the palette, 2026-08-13). Status duty moved to TextCallout. | — |

Because the list components and TextCallout must be visually consistent with TextContent, **P0 items must be styled as one system, not as isolated components** — the body text size, line-height, and block spacing chosen for TextContent cascade into MarkDownRenderer, ListBlock, and TextCallout.
