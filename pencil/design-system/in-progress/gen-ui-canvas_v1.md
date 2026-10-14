# Gen-UI Canvas v1 — Design Spec `[IN PROGRESS]`

The canonical spec for AI-generated canvases in the mainPanel: one canvas per answered question, shown in a feed, each one saveable. The visual source of truth is `gen-ui-canvas_v1.pen`; this file and that canvas must stay in sync.

| | |
|---|---|
| Canvas file | `pencil/design-system/in-progress/gen-ui-canvas_v1.pen` |
| Built on | `hemlock-library.lib.pen` (imported as `g`), shell rules from `../complete/chat-nav-refresh.pen` |
| Exploration record | `pencil/designs/0-ideation/New-Library-Editorial-Inspired-Q4.pen` (not a source of truth) |
| Hemlock check | `node scripts/check-hemlock-deps.mjs` (see §12) |
| Default theme | **Dark.** Light is supported through tokens but is not the default. |

`gen-ui-canvas_v1.pen` is a regular `.pen`, not a `.lib.pen`: Pencil can't import a library into another library. When Hemlock can host it, the components here move into Hemlock unchanged.

---

## 1 · Principles

1. **One answer, one canvas.** Every AI reply that produces gen-UI renders one canvas. Canvases never merge.
2. **Canvases are open sections.** No card chrome: a canvas never draws its own surface, border, radius, or shadow. The mainPanel supplies the surface. Blocks inside a canvas don't carry card chrome either.
3. **Every canvas can be saved.** Save sits in the canvas header. Saved canvases are snapshots (§8.4).
4. **Roles, not values.** Every color, size, radius, and spacing binds a Hemlock token. Never a primitive, never a hex. Exceptions are Hemlock's own: `prim-base-white` / `prim-base-black` (used for labels on pale chart fills).
5. **Reuse Hemlock first.** Where Hemlock has the piece (Tag, DataValueIndicator, Collapse, Checkbox, ToggleSwitch, SegmentedControl, DonutChart, Sparkline, ImageBlock, Button), canvases use it and only override the font (§3).

---

## 2 · Files and frames

| Frame | ID | What it is |
|---|---|---|
| Canvas Design Library | `KNbgW` | Sections 01–07: type roles, not in Hemlock, canvas widths, shell, templates, blocks, chat ↔ canvas |
| View - D - Canvas Feed | `mqkxi` | 1440 desktop, nav + chat open, two canvases (one saved), toast |
| View - D - Saved Canvases | `Jo1xS` | Saved page: title, filter, sort, 2-column tile grid, chat closed to FAB |
| View - D - Saved Canvas (Opened) | `rJLpC` | A saved canvas opened from Saved, with the Snapshot Bar |
| View - L - Canvas Feed (theme check) | `Ic0Xr` | Light copy of the feed, only to prove every color flips |

The file reads top to bottom: 00 Start here (file map and naming key), 01 Library (every component board), 02–06 flows (a desktop row, a mobile row and a notes row each), and 07 Archive (superseded work). Each section's spec notes and sticky notes sit in its notes row.

---

## 3 · Tokens

All tokens come from Hemlock. This file defines two local tokens:

| Token | Value | Why |
|---|---|---|
| `font-ui` | `Gothic A1` | Started as an exploration stand-in for `$g:font-primary` (then Heebo). Hemlock `font-primary` is Gothic A1 since 2026-10-14, so `font-ui` can point at `$g:font-primary`. Hemlock instances inside canvases override their text to `font-ui` for the same reason. |
| `nav-themeToggleIcon` | `moon` (Light) / `sun` (Dark) | Mirrors the same token in chat-nav-refresh.pen for the copied nav. |

Editorial type uses `$g:font-secondary` (Noto Serif).

---

## 4 · Type roles

Masters are `Type / <Role>` components. Sizes and line heights are Hemlock tokens (`text-size-*`, `line-height-*`, desktop/mobile modes).

| Role | Font | Size | Weight | Line height | Color | Notes |
|---|---|---|---|---|---|---|
| Eyebrow | font-ui | `text-size-2xs` | 600 | `line-height-2xs` | `sem-text-meta` | Uppercase, letter-spacing +1 |
| Title | font-secondary | `text-size-2xl` | 400 | `line-height-2xl` | `sem-text-header` | Canvas headline, one per canvas |
| Deck | font-secondary | `text-size-lg` | 300 | `line-height-lg` | `sem-text-body` | Max width 680 |
| Meta | font-ui | `text-size-xs` | 400 | `line-height-xs` | `sem-text-meta` | Asked time, question, scope |
| H2 | font-secondary | `text-size-xl` | 400 | `line-height-xl` | `sem-text-header` | Module heading |
| H3 | font-secondary | `text-size-md` | 400 | `line-height-md` | `sem-text-header` | Sub-heading, tile title |
| Body | font-ui | `text-size-base` | 400 | `line-height-base` | `sem-text-body` | Max width 680 in Single |
| Body Small | font-ui | `text-size-sm` | 400 | `line-height-sm` | `sem-text-body` | Rail and step copy |
| Label | font-ui | `text-size-2xs` | 600 | `line-height-2xs` | `sem-text-meta` | Uppercase, +1; stat and chart labels |
| Stat Value | font-ui | `text-size-2xl` | 600 | `line-height-2xl` | `sem-text-header` | Tabular numerals |
| Caption | font-ui | `text-size-xs` | 400 | `line-height-xs` | `sem-text-meta` | Chart and image captions |
| Footnote | font-ui | `text-size-2xs` | 400 | `line-height-2xs` | `sem-text-meta` | Sources, disclaimers |
| Pull Quote | font-secondary italic | `text-size-lg` | 300 | `line-height-lg` | `sem-text-header` | 2px `sem-borders-action` left rule |
| Group Label | font-secondary italic | `text-size-sm` | 400 | `line-height-sm` | `sem-text-meta` | Groups inside a rail |

Numbers: use tabular numerals (`font-variant-numeric: tabular-nums`) for stat values, table cells, and money. Right-align numeric table columns.

Letter-spacing on uppercase labels (+1) has no Hemlock token yet. Proposal: add `letter-spacing-caps` to Hemlock.

---

## 5 · Component tokens

Every value comes from Hemlock, so the spec names tokens, not values. Look the values up in Hemlock. Each component carries its own bindings in the `.pen`, and §4 and §7 list them. The library's **02 Not in Hemlock** section (`w7Te6`) lists only the gaps. This section covers the chart color rule and everything that doesn't come from Hemlock.

### Chart colors

| Data | Tokens |
|---|---|
| Categorical series | `chart-categorical/color-01` → `color-15`, assigned in Hemlock's priority order: series 1 = 01, series 2 = 02, and so on. Never skip ahead. |
| Sequential (one measure, low → high) | `chart-sequential/seq-100` → `seq-700` |
| Targets and reference lines | `chart-threshold` |
| Labels on categorical fills | `prim-base-black` (Hemlock's fills are pale in both themes) |
| Hemlock charts in a plot slot | Keep their own tokens |

### Off Hemlock

Values in this file that aren't Hemlock tokens, or that don't match Hemlock's own components and rules. The library's 02 Not in Hemlock section has the short version. **Hardcoded** means the number is on Hemlock's scale but typed in instead of bound to the token, so binding it changes nothing visually. **Off-scale** means no Hemlock token has that value.

| Component | Off Hemlock |
|---|---|
| Every component | `font-ui` is local: Gothic A1, matching `font-primary` (Gothic A1 since 2026-10-14). It's also overridden onto every Hemlock instance in a canvas. |
| Type / Eyebrow, Type / Label, Table / Header Row, Chat / Canvas Link kicker | +1 letter-spacing. Hemlock sets tracking to 0. Its caps labels (KpiCard, TableHeaderCell) are `text-size-xs`, 600, no tracking. |
| Type / Deck, Type / Pull Quote | Weight 300. Hemlock keeps light for large display text. |
| Canvas / Hairline | `sem-borders-muted`. Hemlock's Separator uses `sem-borders-light`. This one is deliberate, because `sem-borders-light` barely shows on dark. |
| Canvas / Feed Divider | `sem-navDivider` is the nav's own token. Hemlock content dividers use Separator (`sem-borders-light`). The 56 gap between canvases is off-scale (48 = `spacing-2xl`, 64 = `spacing-3xl`). Radius 99999 isn't `radius-full`, and a 1px rule needs no radius. |
| Canvas / Save Button | Saved keeps the Pressed style at rest (`aria-pressed`). Hemlock's Button has no toggle state yet, so code needs a pressed prop. |
| Canvas / Toast | Padding 14 is off-scale. |
| Saved / Tile | Padding 20 is off-scale, and the stat gap 2 is hardcoded. The sparkline is a hand-drawn path (`chart-categorical/color-01`, `#00000000` fill) instead of Hemlock's Sparkline (`sem-text-deposit`, 1.5). Hemlock's Card uses `sem-borders-light`, `radius-sm`, and padding `spacing-md`. |
| Canvas / Template | Placeholder gap 4 is hardcoded (design only). |
| Canvas / Ranked Row | Gaps 2 and 4 are hardcoded. |
| Canvas / Table / Header Row | `text-size-2xs` with +1 letter-spacing. Hemlock's TableHeaderCell is `text-size-xs`, 600, no tracking. |
| Canvas / Chart Frame | Gridlines use `sem-borders-dark` and the baseline `sem-borders-strong`. Hemlock charts use `sem-borders-light` (grid) and `sem-borders-dark` (axis line). The area fades from `chart-categorical/color-01` to `#00000000` at 25%. Hemlock's AreaChart goes `seq-300` → `seq-100` at 50%, with a `seq-500` line at 2. Axis padding 6 is off-scale. Hemlock's chart rules put the legend at the bottom and the chart on `sem-background-elevated`. Here the legend is in the header and the chart sits on `sem-background-main`. |
| Canvas / Legend Item | Gap 6 is off-scale, and the line marker's radius 2 is hardcoded. Hemlock's ChartLegend uses a square 8×8 marker, gap `spacing-3xs`, and a `text-size-sm` label in `sem-text-body`. |
| Canvas / Chart Annotation | Gap 4 is hardcoded. The point's border uses a text token (`sem-text-header`). |
| Canvas / Before-After Bar | The series skip Hemlock's priority order: 01, 04, 08, 13 instead of 01–04. Gap 2 and padding 8 are hardcoded. |
| Canvas / Target Bar | The target marker uses `sem-text-header`. Hemlock's token for targets and reference lines is `chart-threshold`. |
| Canvas / Pull Quote | Padding 4 is hardcoded. |
| Canvas / Tip | Hand-built callout. Hemlock's Callout (info) uses `sem-background-info`, `sem-borders-info`, `sem-icons-info`, and `sem-text-info-title`. |
| Canvas / Text Link | Gap 6 is off-scale. Hemlock's text button uses `sem-btnLinkText`, label 500, icon 16, and gap `spacing-3xs`. |
| Canvas / Icon Tile | Icon 22. Hemlock uses 12, 14, 16, 20, and 24, and has no icon-size tokens. |
| Canvas / Teaser Card | Gap 4 is hardcoded. |
| Canvas / Plan Check Item | Gap 6 is off-scale. |
| Canvas / Stepper | Gap 2 is hardcoded. |
| Canvas / Line Item | Weight 700. Every other canvas value is 600, and so is Hemlock's MoneyText. Gap 2 is hardcoded. |
| Canvas / Entity Chip | Padding `[2, 8, 2, 6]`: 6 is off-scale, and 2, 8, and gap 4 are hardcoded. Icon 11. Hemlock's `Tag/icon-left` covers this: `sem-tagBg`, `sem-tagText`, `radius-3xs`, padding `[spacing-3xs, spacing-2xs]`, icon 12, label 400. |
| Canvas / Progress | Gap 4 is hardcoded. |
| Canvas / Plan Step | Done and Upcoming set fill and border to `#00000000`. Leave them unset instead. |
| Canvas / Timeline Item | The connector uses the nav token `sem-navDivider`. Padding 3 is off-scale, and gaps 2 and 4 are hardcoded. Hemlock's Steps use an indicator fill of `sem-background-elevated` with a `sem-borders-action` (active) or `sem-borders-light` border, and Separators (`sem-borders-light`) as connectors. |
| Canvas / Note Input | Uses the chat panel's input tokens (`sem-chatInputBg`, `sem-chatInputBorder`) inside a canvas. Hemlock's Textarea uses `sem-background-surface`, `sem-borders-dark`, `radius-3xs`, and `font-primary` at `text-size-base`. |
| Canvas / Saved Note | Gap 4 is hardcoded. |
| Chat / Canvas Link | Padding `[10, 12, 10, 10]`: 10 is off-scale, and 12 plus gaps 12, 4, and 2 are hardcoded. The kicker has +1 letter-spacing. The Hover go icon uses a text token (`sem-chatTextPrimary`); the other states use `sem-chatIcon`. |
| Views: nav and chat copied from chat-nav-refresh.pen | The nav logo uses Manrope and Spectral. There are literal sizes 13 (nav items) and 14 (chat text; this file now binds chat text to `text-size-base`, §7.5), +1.2 tracking on nav section labels, radii 4 and 6, and off-scale paddings like `[7, 10, 7, 24]`. Nav and chat shadows have a literal y 2 and blur 28, prompt chips use line height 1.25, and some strokes are 0.5. Fix these in chat-nav-refresh.pen. In this file, `contentColumn` padding 40 / 48 is hardcoded (`spacing-xl` / `spacing-2xl`). |

**Contrast status (Hemlock as of Sep 28):** `sem-text-meta` is under AA for small text in dark: 4.28:1 on `sem-background-main`, 4.07:1 on `sem-background-surface`, 3.79:1 on `sem-background-elevated`. The fix is happening in Hemlock. Every meta role here binds the token, so the new value flows through. Re-run §12 after the update.

---

## 6 · Layout

### View area

From chat-nav-refresh: no header bar; the view area is max 1024 wide with a gutter of at least 40px on each side. `contentColumn` padding is `[spacing-md, 40, 48, 40]`.

| Viewport | Nav | Chat | Canvas width |
|---|---|---|---|
| 1440 | 240 open | 360 open | 744 |
| 1440 | 240 open | closed (FAB) | 1024 |
| 1440 | closed | closed | 1024 |

Nav and chat are pinned to the viewport; only the mainPanel scrolls.

### Canvas anatomy

```
Canvas / Canvas            vertical, gap spacing-lg, no fill, no border
├─ Canvas / Header         Top Row (Eyebrow · Save, share, more) / Title / Deck / Meta Row
├─ Canvas / Rule / Strong  2px sem-borders-strong, once, directly under the header
├─ Slot / Modules          vertical, gap spacing-lg; templates separated by Canvas / Hairline
└─ Canvas / Footer         1px sem-borders-muted top rule · Footnote · Helpful? 👍 👎
```

**Vertical rhythm inside a canvas** (loosened 2026-10-09; each value moved up one step):

| Between | Gap |
|---|---|
| Header, rule, modules, footer (`Canvas / Canvas`) | `spacing-lg` |
| Modules and hairlines (`Slot / Modules`) | `spacing-lg` |
| Blocks stacked inside any template slot | `spacing-md` |
| Text sections (`Slot / Content` in text-led modules) | `spacing-xl` |
| A section's H2 and its blocks | `spacing-md` |
| Paragraph / With Heading: H3 → Body | `spacing-xs` |
| List items (`Slot / Items`) | `spacing-xs`; `spacing-md` when items have leads |

The header stack (`spacing-sm`) and horizontal gutters (below) are unchanged.

Header actions: `Canvas / Save Button` (Hemlock `Button/sm/outline/icon-left`), then Hemlock `Button/sm/text/icon-only` for share and more. Every button is a Hemlock pill (`radius-full`).

### Templates

The model picks a template by name for each module and fills its named slots with blocks. Templates never nest. Column rules are slot borders (`sem-borders-muted`, left 1px), not separate nodes.

| Template | Slots | Columns | Breakpoints |
|---|---|---|---|
| `single` | content | 1 | Body max 680 |
| `stat-strip` | stat1–stat4 | 2–4 equal, cell inset spacing-md | Hide unused cells; 2×2 under 720 |
| `lead-rail` | lead, rail | lead fills, rail 280, gutter spacing-lg | Rail drops below lead under 880 |
| `two-up` | a, b | 2 × 1fr, gutter spacing-lg | Stacks under 720 |
| `three-up` | a, b, c | 3 × 1fr, gutter spacing-lg | 2 + 1 under 880; stacks under 720 |
| `plan-split` | ingredients, steps | ingredients 280, steps fill | Ingredients sticky (top spacing-md); under 720 they collapse into an accordion above the steps |

Each slot lists its recommended blocks in the `.pen` (`slot` property), e.g. the stat-strip cells accept Stat and Fact only.

---

## 7 · Components

Names match the components in `gen-ui-canvas_v1.pen`.

### 7.1 Canvas shell

| Component | Variants | Spec |
|---|---|---|
| `Canvas / Canvas` | — | §6 anatomy. Width fills the view area. |
| `Canvas / Header` | Default, With Media | With Media puts a 360×220 media slot (`sem-background-subtle`, `radius-2xs`) beside Title + Deck; it takes an ImageBlock, illustration, or compact chart. |
| `Canvas / Rule / Strong`, `Canvas / Hairline` | — | 2px `sem-borders-strong`; 1px `sem-borders-muted` |
| `Canvas / Footer` | — | Footnote (sources, sync time, AI disclaimer) + feedback buttons |
| `Canvas / Feed Divider` | Default, Day | 1px `sem-navDivider`, gap 56 between canvases. Day adds a centered Label (TODAY, YESTERDAY, OCT 4) when the date changes. |
| `Canvas / Skeleton` | — | Holds the space while the answer streams: status line, title and deck bars, three block placeholders (`sem-background-subtle`, `radius-3xs` / `radius-2xs`). Save shows Disabled. |

### 7.2 Saving

**`Canvas / Save Button`** — seven presets, each an instance of Hemlock `Button/sm/outline/icon-left`: height 28, `radius-full`, padding `[0, spacing-xs, 0, spacing-2xs]`, gap `spacing-3xs`, icon 16, label `text-size-sm` 500. Colors, shape, and size come from Hemlock; a preset only sets the icon, the label, and the `font-ui` override.

| State | Hemlock variant | Icon | Label |
|---|---|---|---|
| Default | `outline/icon-left` | bookmark | Save |
| Hover | `outline/icon-left/hover` | bookmark | Save |
| Pressed | `outline/icon-left/pressed` | bookmark | Save |
| Saving | `outline/icon-left/loading` | bookmark | Saving… |
| Saved | `outline/icon-left/pressed` | bookmark-check | Saved |
| Saved Hover | `outline/icon-left/hover` | bookmark-minus | Remove |
| Disabled | `outline/icon-left/disabled` | bookmark | Save |

Outline, not secondary: Hemlock's secondary is outline plus an opaque fill (`sem-btnPrimaryInvertedBg`), which matters only on another surface or when floating (Snapshot Bar, New Canvas Pill). Save sits on `sem-background-main` in every header, so outline is the lighter, matching choice.

Saved is a toggle that's on, so it keeps the Pressed style at rest (`sem-btnSecondaryBgActive`, `sem-btnSecondaryBorderPressed`, `sem-btnSecondaryTextActive`). Label contrast: 7.31:1 dark, 4.57:1 light.

**`Canvas / Toast`** — Saved ("Canvas saved · View saved | Undo", circle-check `sem-icons-success`) and Removed ("Removed from saved · Undo", bookmark-x `sem-icons-meta`). Fill `sem-background-elevated`, border `sem-borders-dark`, radius `radius-xs`, padding `[spacing-2xs, spacing-3xs, spacing-2xs, 14]`, gap 0, shadow `shadow-md-*`, 44 tall. Icon and message sit in a Content group (gap `spacing-xs`). View saved and Undo are Hemlock `Button/sm/text`; their 12px side padding spaces them from the message, the 1px `sem-borders-muted` divider (Saved only), and the edge. Bottom-center of the view area, 24px above the viewport edge, 5 seconds.

**`Saved / Tile`** — Default and Hover. 488 wide in the 1024 grid; fill `sem-background-elevated` (Hover `sem-background-hover`), border `sem-borders-dark` (Hover `sem-borders-strong`), radius `radius-xs`, padding 20, gap spacing-xs. Top row: type Eyebrow (REPORT, PLAN, EXPLAINER) + "Saved Oct 6". Title (H3), source question (Meta), preview (stat + optional sparkline between `sem-borders-muted` rules), bottom row: "Data as of …" + Refresh (Hemlock `Button/sm/text`, Freshness gap 0), and on hover/focus the actions pin to Dashboard, share, remove. Stat values are `sem-text-header`; use `sem-text-deposit` only for a positive delta.

**`Canvas / Snapshot Bar`** — Snapshot and Live. Fill `sem-background-surface`, radius `radius-2xs`, padding `[spacing-2xs, spacing-2xs, spacing-2xs, spacing-sm]`. Snapshot: history icon (`sem-icons-meta`), "Snapshot from Oct 6, 9:41 AM. Balances and prices may have changed since.", Hemlock `Button/sm/secondary/icon-left` "Refresh with today's data". Live: circle-check (`sem-icons-success`), "Live. Rerun with today's data at 10:12 AM. Your saved copy from Oct 6 is unchanged.", `Button/sm/secondary` "Update saved copy".

### 7.3 Blocks

Blocks fill template slots. None carry card chrome.

| Group | Components | Notes |
|---|---|---|
| Numbers | `Canvas / Stat` (Default, Positive, Negative), `Canvas / Fact`, `Canvas / Ranked Row` | Stat = Label + Stat Value + Hemlock DataValueIndicator (Default/Negative) or Body Small. Ranked Row = rank, name + meta, value, Hemlock Tag. |
| Tables | `Canvas / Table` (Header Row, Row, Row Highlight, Total Row) | Numeric columns right-aligned, tabular numerals. Row Highlight fills `sem-background-highlight`; secondary text on it uses `sem-text-body`, not meta. Total Row has a `sem-borders-strong` top rule. |
| Charts | `Canvas / Chart Frame`, `Canvas / Legend Item` (Line, Swatch), `Canvas / Chart Annotation`, `Canvas / Value Label`, `Canvas / Before-After Bar`, `Canvas / Target Bar` | Chart Frame = header (Label wraps; legend hugs, gap spacing-md) + plot slot + axis + caption. The plot slot takes Hemlock charts in their `/no-card` variants. Gridlines `sem-borders-dark`, baseline `sem-borders-strong`. |
| Editorial | `Canvas / Pull Quote`, `Canvas / Takeaway`, `Canvas / Tip` | Takeaway = number + lead + Body Small. Tip sits on `sem-background-highlight` with a lightbulb in `sem-icons-action`; its label uses `sem-text-header`. |
| Links | `Canvas / Text Link` (Default, External) | `sem-text-action`, arrow-right / arrow-up-right |
| Media | `Canvas / Icon Tile`, `Canvas / Media Slot` (Icon, Illustration), Hemlock `ImageBlock/caption-credit` | Three image kinds: charts and data graphics (Chart Frame), editorial photos (ImageBlock), illustrations and icons (Media Slot) |
| Teaser | `Canvas / Teaser Card` | Media + Eyebrow + H3 + Body Small + meta + link; for three-up related plans and explainers |
| Plan controls | `Canvas / Plan Mode Toggle`, `Canvas / Plan Check Item`, `Canvas / Stepper`, `Canvas / Line Item`, `Canvas / Entity Chip` | Plan Mode wraps Hemlock ToggleSwitch, outlined with `sem-borders-muted`. Stepper: label column wraps; − and + are Hemlock `Button/sm/outline/icon-only`, gap spacing-2xs. |
| Plan steps | `Canvas / Progress`, `Canvas / Plan Step` (Done, Active, Upcoming), `Canvas / Timeline Item` (Active, Upcoming) | Steps use Hemlock Checkbox and Tag. The Active step is marked by a 2px `sem-borders-action` left rule, no fill, so its links stay on `sem-background-main`. Progress has one segment per step. |
| Notes | `Canvas / Note Input`, `Canvas / Saved Note` | Private notes on a plan |

### 7.4 Hemlock components used inside canvases

`Collapse` / `Collapse/open`, `SegmentedControl`, `DonutChart`, `Sparkline`, `ImageBlock/caption-credit`, `Tag`, `DataValueIndicator`, `Checkbox`, `ToggleSwitch/on`, `Button/sm/*`. Each instance overrides its text to `font-ui` and nothing else.

Exception: `DonutChart` takes no overrides. Hemlock builds it as a Card instance with filled slot content, and Pencil can't save an override on anything inside an imported component's slot. Saving fails with "pen.dev can't save your changes", and `~/Library/Logs/Pen/main.log` shows `Failed to serialize the document … reading 'id'`. The same applies to every Hemlock component built on a Card slot: AreaChart, AreaChartMultiSeries, BarChart, DonutChart, GaugeChart, KpiCard, FollowUpBlock, SectionBlock, and their variants.

### 7.5 Chat ↔ canvas

**`Chat / Canvas Link`** — Default, Hover, In View, Saved. 320 wide inside the 360 chat panel. Fill `sem-chatBg` (Hover `sem-chatChipHover`), border `sem-chatBorder` (In View `sem-borders-action`), radius `radius-xs`, padding `[10, 12, 10, 10]`, gap 12. Thumb 36×36 `sem-chatChipBg` with the canvas type icon (layout-dashboard report, list-checks plan, book-open explainer) in `sem-chatIcon`. Kicker (font-ui 2xs, 600, +1, `sem-chatTextSecondary`): REPORT / PLAN / EXPLAINER; Saved adds the bookmark-check icon (`sem-icons-action`) and "· SAVED". Title: font-ui `text-size-sm`, `sem-chatTextPrimary`. Go icon arrow-left (`sem-chatIcon`; In View `sem-icons-action`).

**Reply pattern** — AI text → Canvas Link (or Canvas Chip) → Prompt Chips. Chips only under the latest AI reply.

**Chat text and spacing** (2026-10-09; applies to every chat surface, desktop panel and phone):

| Part | Spec |
|---|---|
| Message text (question bubbles, AI replies) and input text | `text-size-base` / `line-height-base` (Body). Chat text is body text. 16px also keeps iOS Safari from zooming the input on focus. |
| Turn | A `Turn` frame: the question, then an `AI response` frame. |
| Question → AI response | `spacing-lg` |
| Inside an AI response (text → link or chip → prompt chips) | `spacing-md`; paragraphs `spacing-xs` |
| Between turns | `spacing-2xl`. On phones, `spacing-4xl` after a turn whose answer is an inline canvas. |
| AI text → inline canvas (phones) | `spacing-2xl` |
| Question bubble padding | `[spacing-sm, spacing-md]` |
| Prompt chips | Match chat-nav-refresh.pen (M852E, N4zCC, F1IhIS): Hemlock `Button/sm/outline` with only the label content overridden (Hemlock's `font-primary` 14 medium, no `font-ui`). `chipRow`s 8 apart, chips 8 apart, no top padding, greedy wrap, max 3, cleared on a new turn. |

**`Feed / New Canvas Pill`** — Hemlock `Button/sm/secondary/icon-right`, "New canvas" + arrow-down, `shadow-md-*`.

Chat atoms (messages, chips, input, close FAB) come from chat-nav-refresh.pen. As of 2026-10-09 this file is ahead of it: message and input text is `text-size-base`, and chat spacing follows the table above. chat-nav-refresh.pen still has 14px chat text and 14/16 message gaps (see §10).

---

## 8 · Behavior

### 8.1 Feed

- Order mirrors the chat: oldest at top, newest at the bottom.
- When an answer starts, scroll the feed so the new canvas header sits spacing-md below the mainPanel top, then stream into a Skeleton. Respect `prefers-reduced-motion` (jump, don't animate).
- If the user has scrolled up when a canvas arrives, don't move them. Show the New Canvas Pill (bottom-center, 24px above the viewport edge; 8px above the toast if both show). Hide it once the newest header is in view.
- Feed Divider between canvases; Day divider when the date changes.

### 8.2 Saving

```
Default ──press──▶ Saving ──ok──▶ Saved ──press──▶ Default (Removed toast)
   ▲                  │
   └──── error ◀──────┘   (toast: "Couldn't save. Retry")
Disabled while the canvas streams, while offline, or for canvases with no data.
```

- Save from the header, the Saved Tile, or by keyboard. Undo in the toast reverses the last save or removal.
- The chat Canvas Link for that canvas mirrors the saved state.
- The nav Saved count updates on save and removal.

### 8.3 Chat ↔ canvas anchoring

- Clicking a Canvas Link scrolls to its canvas and moves focus to the canvas title.
- Exactly one link is In View: the canvas whose header is nearest the top of the view area. Update on scroll (throttled).
- Sending a message clears chips from earlier turns.

### 8.4 Saved canvases: snapshot vs live

- Saving stores a snapshot: the canvas JSON (§9) with its data values, the original question, `askedAt`, and `dataAsOf`.
- Opening a saved canvas renders the snapshot under the Snapshot Bar. The Save button shows Saved.
- Refresh reruns the original question with today's data and swaps the bar to Live. The stored snapshot doesn't change until the user picks Update saved copy.
- Saved page: page title in the page container (no header bar). Filter: Hemlock SegmentedControl (All · Reports · Plans · Explainers). Sort: text button (Recently saved, Oldest, A–Z). Grid: 2 columns of Saved / Tile, gap 48 across and 32 down, 1 column under 720. "Showing 6 of 12" + Show more.
- Pin to Dashboard turns a tile into a Dashboard widget (design-system.md §11; widgets use compact variants).

### 8.5 Accessibility

| Element | Pattern |
|---|---|
| Feed | `role="feed"` with each canvas as `role="article"` (`aria-labelledby` its title, `aria-posinset` / `aria-setsize`); `aria-busy="true"` while a canvas streams |
| Canvas title | `h2`; module headings `h3` |
| Save | `button` with `aria-pressed`; label "Save canvas" / "Remove from saved"; `aria-pressed="true"` renders the Pressed style |
| Toast | `role="status"` (polite); Undo and View saved are buttons |
| Canvas Link | link to `#canvas-{id}`; `aria-current="true"` when In View |
| Plan steps | real checkboxes with the step text as label; Progress is `role="progressbar"` with `aria-valuenow` / `aria-valuemax` |
| Stepper | `role="spinbutton"` with `aria-valuetext` ("60 stocks, 40 bonds") |
| Saved Tile | the tile is a link to the canvas; actions are buttons, visible on hover and on focus-within |
| Charts | a text summary in the caption; data table available on request |

---

## 9 · Gen-UI JSON

Extends design-system.md §13. The model emits one canvas object per answer; the renderer hydrates it into the components above.

```json
{
  "component": "Canvas",
  "id": "cnv_8f3k2",
  "type": "report",
  "question": "How are my investment accounts performing?",
  "askedAt": "2026-10-06T09:41:00-04:00",
  "dataAsOf": "2026-10-06T06:00:00-04:00",
  "header": {
    "eyebrow": "Investments · Year-to-date review",
    "title": "Your investments have seen recent success.",
    "deck": "Across your seven linked accounts, money in has far outpaced money out this year.",
    "scope": "7 linked accounts",
    "media": null
  },
  "modules": [
    {
      "template": "stat-strip",
      "slots": {
        "stat1": [{ "component": "Stat", "variant": "default", "label": "Money in", "value": 248857, "format": "currency",
                    "delta": { "direction": "up", "value": 12, "format": "percent", "period": "vs. 2025" } }],
        "stat2": [{ "component": "Stat", "variant": "default", "label": "Money out", "value": 68096, "format": "currency" }],
        "stat3": [{ "component": "Stat", "variant": "positive", "label": "Net flow", "value": 179761, "format": "currency",
                    "note": "Fresh capital added this year" }],
        "stat4": [{ "component": "Stat", "variant": "default", "label": "Biggest month", "value": "August",
                    "delta": { "direction": "up", "value": 25000, "format": "currency", "period": "net" } }]
      }
    },
    {
      "template": "lead-rail",
      "slots": {
        "lead": [{
          "component": "ChartFrame",
          "label": "Net flow, cumulative",
          "legend": [{ "kind": "line", "label": "Net flow", "color": "$chart-categorical/color-01" },
                     { "kind": "swatch", "label": "Contributions", "color": "$chart-categorical/color-02" }],
          "plot": { "component": "AreaChart", "variant": "no-card", "data": { "series": [{ "label": "Net flow", "values": [] }] } },
          "caption": "Contributions, dividends and transfers in, minus money out. Source: 7 linked accounts, as of Oct. 5."
        }],
        "rail": [
          { "component": "Label", "text": "Top contributors, net" },
          { "component": "RankedRow", "rank": 1, "name": "Vanguard", "meta": "Brokerage", "value": 87800, "format": "currency", "tag": "49% of net" },
          { "component": "RankedRow", "rank": 2, "name": "Fidelity", "meta": "401(k)", "value": 54300, "format": "currency", "tag": "30% of net" },
          { "component": "Takeaway", "number": 1, "lead": "You're ahead of your savings goal.",
            "body": "At this pace you'll contribute about $298,000 this year, $28,000 above plan." }
        ]
      }
    }
  ],
  "footer": { "footnote": "Figures reflect 7 linked accounts synced Oct. 6, 2026, 6:00 AM.", "feedback": true },
  "saved": { "state": "saved", "savedAt": "2026-10-06T10:05:00-04:00", "snapshotId": "snp_41aa" }
}
```

Rules for the model:

- `type` is `report`, `plan`, or `explainer`. It sets the Saved Tile eyebrow and the Canvas Link icon.
- Use 1–4 modules. `stat-strip` cells take `Stat` or `Fact` only. Templates never nest.
- Values are raw numbers plus a `format`; the renderer formats them. Colors are token names, never hex.
- `saved` is owned by the client, not the model. The model never sets it.
- Plans add a `plan-split` module whose `steps` slot holds `PlanStep` objects (`state`: `done` / `active` / `upcoming`, `body`, `account`, `action` link) and whose `ingredients` slot holds `PlanModeToggle`, `PlanCheck`, `Stepper`, and `LineItem`.

---

## 10 · Open decisions

| Topic | Status |
|---|---|
| Nav: CANVASES section with Feed and Saved | Proposal. Belongs in chat-nav-refresh.pen; needs sign-off. |
| Nav active item token | chat-nav-refresh binds `sem-borders-dark`; this file uses `sem-navActiveBg`, the matching role. |
| `sem-text-meta` in dark | Under AA (§5). Fix in progress in Hemlock. |
| UI font | Gothic A1 via `font-ui`. Production `font-primary` is also Gothic A1 (since 2026-10-14). |
| Caps letter-spacing token | Proposal: `letter-spacing-caps` in Hemlock. |
| Text on `sem-background-highlight` | `sem-text-action` (3.85 dark / 4.01 light) and `sem-text-meta` (3.24 dark) fail AA on it, so this file keeps links and meta off highlight surfaces. `sem-text-deposit` measures 4.25:1 on it in light (Row Highlight net values). Needs a Hemlock pairing decision. |
| Saved snapshot retention | Open: how long snapshots are kept, and whether Refresh replaces them by default. |
| Off-Hemlock values | §5 lists them. Hardcoded values can be bound to their tokens with no visual change. Off-scale values and the rebuilt components (Entity Chip, Note Input, Tip, Legend Item) need a design call. |
| Toggle buttons in Hemlock | Save's Saved state shows `Button/sm/outline/icon-left/pressed` at rest. Hemlock's Button needs a `pressed` prop (or `[aria-pressed="true"]` styles) to render it in code. |
| Hemlock housekeeping | `colDate` (instance of `TableHeaderCell/sorted-desc`) has a stale override pointing at a node that no longer exists (`V5Ss9`). Harmless here; worth cleaning in Hemlock. |
| Chat spec vs chat-nav-refresh.pen | Chat text `text-size-base` and the turn spacing (§7.5) were applied file-wide here on 2026-10-09. chat-nav-refresh.pen, the source of the chat atoms, hasn't been updated yet. |

---

## 11 · When Hemlock changes

1. Update `hemlock-library.lib.pen`.
2. Reopen `gen-ui-canvas_v1.pen` in Pencil so it picks up the new library, and save it.
3. Run the check (§12). Fix every BREAKING finding; review every REVIEW finding and the contrast table.
4. When the result is accepted, rewrite the baseline with `--write-baseline` and commit it with the Hemlock change.

## 12 · Hemlock dependency check

```
node scripts/check-hemlock-deps.mjs                       # gen-ui-canvas_v1.pen by default
node scripts/check-hemlock-deps.mjs path/to/file.pen      # any file that imports Hemlock
node scripts/check-hemlock-deps.mjs --write-baseline      # record the accepted Hemlock values
node scripts/check-hemlock-deps.mjs --json --strict       # CI-style: exit 1 on BREAKING
```

It reports tokens and components that no longer exist, instance overrides whose target node moved, token values that changed since `gen-ui-canvas_v1.hemlock-baseline.json`, and WCAG contrast for the text roles the canvases use, in both themes.
