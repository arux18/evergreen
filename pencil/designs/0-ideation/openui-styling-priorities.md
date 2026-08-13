# OpenUI Priority Styling — Text & Spacing

> **Status (2026-08-10):** Findings 1–5 are now **resolved** — all 8 libs carry canonical Hemlock-value tokens (base = 16px), line-heights are set explicitly everywhere to Hemlock ratios, P0 components were restyled (body prose = 16/1.5), and `lint-openui-text-styles.py` enforces the rules. See "Type & Spacing Rules" in `openui-components-handoff.md`. The priority tiers below remain the roadmap for the remaining Hemlock-equivalent work (P1–P3).

Priority list for customized Hemlock styling of the OpenUI component libraries (`openui-*.lib.pen`), focused on typography, spacing, and content-pattern usage (paragraphs vs. bullet lists vs. callouts). Companion to `openui-components-handoff.md`.

Audit basis: all 8 OpenUI lib files, cross-referenced against `hemlock-library.lib.pen` (351 components, 1,044 tokens) and the approved screens that import OpenUI (`login.pen`, `contact-us.pen`, `settings-menu.pen`, `View-Presentation-Ideation.pen`).

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
| **TextCallout** | feedback | No Hemlock equivalent — must be built. Current spec: `padding: [$spacing-xs, $spacing-sm]`, `gap: $spacing-xs`, `$hover.bg` fill, `$radius` corner, accent bar in `$text.secondary`, text sm-regular with no line-height. Needs Hemlock surface/text tokens and a defined text size. |
| **Callout** (info / success / warning / error) | feedback | Hemlock equivalent exists (7 variants) — verify the mapping and retire the OpenUI copy. Title sm-semibold + body sm-regular need line-heights; confirm `callout.*.bg/border/icon` tokens map to Hemlock status colors (the migrate script already has this mapping). |

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
| **All chart components** | charts, charts-v2 | Axis labels, tick text, tooltips, and legends all use xs-regular/xs-semibold on `$colors-text-meta/body` — token-bind these and set line-heights. **Consolidate v1 and v2 first**: the two files duplicate ~20 components (v2 swaps Pie/Radar/Scatter/Radial for Donut). Styling work done before deduplication will be thrown away. Note Hemlock already ships a full styled chart set (Bar, Donut, Gauge, KpiCard, Sparkline, ChartTooltip, ChartLegend, etc.) — evaluate whether OpenUI charts should be retired in favor of those instead of restyled. |

---

## Content-Pattern Usage Rules (paragraphs vs. bullets vs. callouts)

Styling priorities above assume these usage conventions, so each pattern has exactly one styled home:

| Pattern | Use | Not for |
|---------|-----|---------|
| **Paragraph** (TextContent, or markdown `p` via MarkDownRenderer) | Default for all prose. Narrative answers, explanations, summaries. Medium/base (16px) is the default body size; small for timestamps/meta; large/large-heavy for lead-ins and section titles. | Anything that is a set of discrete comparable items. |
| **Bullet list** (markdown list via MarkDownRenderer) | Short unordered items inside a flowing AI answer — the inline default. | Items needing titles, descriptions, tags, or actions. |
| **ListBlock / ListItem** | Structured lists that stand on their own: "Next steps", checklists, numbered procedures, radio-selectable options. Has its own header (title + subtitle). | Inline lists mid-paragraph — use markdown bullets instead. |
| **TextCallout** | Inline emphasis of a single key sentence or figure inside an answer (e.g. a portfolio value or key takeaway). | Warnings/errors — too weak; multi-sentence content — too small. |
| **Callout** | Out-of-band status communication: info, success, warning, error. Always has a title + body. | Emphasizing ordinary answer content — use TextCallout. |

Because both list components and both callout components must be visually consistent with TextContent, **P0 items must be styled as one system, not as isolated components** — the body text size, line-height, and block spacing chosen for TextContent cascade into MarkDownRenderer, ListBlock, TextCallout, and Callout.
