# Gen-UI Canvas v2 — Design Spec `[IN PROGRESS]`

The spec for AI-generated canvases in the mainPanel (one canvas per answered question, shown in a feed) and for the v2 flows built around them: the conversations nav and the plan interview. The visual source of truth is `gen-ui-canvas_v2.pen`. This file holds the rules. The values live in the .pen, and every component's layers and tokens are listed in the generated [component reference](gen-ui-canvas_v2.components.md). §13 explains how the three stay in sync.

| | |
|---|---|
| Canvas file | `pencil/design-system/in-progress/gen-ui-canvas_v2.pen` |
| Component reference | `gen-ui-canvas_v2.components.md`, generated from the .pen. Don't edit it by hand. |
| Built on | `hemlock-library.lib.pen` (imported as `g`), shell rules from `../complete/chat-nav-refresh.pen` |
| Previous version | `gen-ui-canvas_v1.pen` and `gen-ui-canvas_v1.md`, frozen Oct 13, 2026 |
| Checks | `node scripts/sync-gen-ui-spec.mjs` (§13) and `node scripts/check-hemlock-deps.mjs` (§12) |
| Default theme | **Dark.** Light is supported through tokens but is not the default. |

`gen-ui-canvas_v2.pen` is a regular `.pen`, not a `.lib.pen`: Pencil can't import a library into another library. When Hemlock can host it, the components here move into Hemlock unchanged.

**What changed from v1**

- **Library.** Essential Components holds the core canvas set in eleven sections. Everything else moved to More components (the Canvas Design Library board).
- **Added.** A chart library (bar, line, area and heatmap charts with hover states), the Horizontal Bar Chart (stacked and ranked, replacing the Before-After Bar) and its value-label rule (§7.3), the Toggle Row (replacing the Plan Mode Toggle), and the `chart-area-fade` token.
- **Retired.** The local font-ui token (UI text binds `$g:font-primary`, Gothic A1), the chat Canvas Link (the Canvas Chip replaces it), the Feed Divider Day variant, the Neutral accent variants, and v1's Saving & saved canvases flow, Question cards flow and Archive.

---

## 1 · Principles

1. **One answer, one canvas.** Every AI reply that produces gen-UI renders one canvas. Canvases never merge.
2. **Canvases are open sections.** No card chrome: a canvas never draws its own surface, border, radius, or shadow. The mainPanel supplies the surface. Blocks inside a canvas don't carry card chrome either.
3. **Every canvas can be saved.** Save sits in the canvas header. The Saved page itself is on hold (§8.4).
4. **Roles, not values.** Every color, spacing, radius, type size, line height, and shadow binds a Hemlock token. Never a primitive, never a hex. The exception is Hemlock's own: `prim-base-black` for labels on pale chart fills. The reference lists every value that still skips Hemlock (§5).
5. **Reuse Hemlock first.** Where Hemlock has the piece, use it and override only its content (label, icon, value). Don't override its font: Hemlock's `font-primary` is the UI font.

---

## 2 · File map

The file reads top to bottom in labeled bands. Each flow keeps a desktop row, a mobile row, and a notes row (spec notes, then sticky notes). Band numbers skip 03 and 05 because v2 dropped the Saving & saved canvases and Question cards flows; both are still in v1.

| Band | Frame | ID | What it is |
|---|---|---|---|
| 00 Start here | Start here | `dTxZw` | File map, naming key, status key |
| 01 Library | Essential Components | `rQNVD` | The core set, sections 01–11 (§7.1) |
| | Canvas / Text — Components | `Mxi2a` | Text sections: marker color, a text section in use |
| | Canvas / Number Markers — Components | `vQPhv` | Rank, list and takeaway markers as the screens use them |
| | Canvas Design Library (More components) | `KNbgW` | 01 Not in Hemlock, 02 Canvas widths, 03 Saved view & loading, 04 More blocks (§7.2) |
| | Nav / Conversations — Components | `gnGT8` | Desktop conversation rows and menu |
| | Nav / Conversations — Mobile Components | `bv5Vu` | Phone rows, menu, and touch annotations |
| | Q&A / Template — Components | `XAEUJ` | Question cards, the plan interview, and the first-version branches |
| | Q&A / Answer Controls — Components | `P4aoY` | Answer controls for the interview |
| | Tokens & type in this file | `nM8Nd` | Spec note |
| 02 Canvas feed | View - D - Canvas Feed | `mqkxi` | Baseline: 1440, nav and chat open, two canvases, toast |
| | View - D - Canvas Feed · Text-heavy response | `Zxsih` | A text-led answer |
| | View - L - Canvas Feed (theme check) | `Ic0Xr` | Light copy, only to prove every color flips |
| | View - M - Canvas Feed, · Text-heavy response, · Conversation inline | `n1zX2`, `ZppbO`, `H4r8n` | 393 phone |
| 04 Conversations nav | View - D - Conversations · 1 Default to · 6 Removed (Undo) | `B32PHz` to `PhNe3` | Rename, reorder, and remove (§8.5). Light check: `dTBrn`. |
| | View - M - Conversations · 1 Nav open to · 4 Drag | `W8Ew2r` to `Q1k4ay` | Phone version |
| 06 Q&A · Plan interview | View - D - Q&A · Plan interview · 0 to · 6 | `MPwbV` to `SfCkF` | Chat → interview → plan (§8.6) |
| | View - D - Retirement options · 30-year outlook | `I3YLRc` | A canvas answer, at the end of the desktop row |
| | View - M - Q&A · Plan interview · 0 to · 8 | `Nra7x` to `wOmCR` | Phone version, chat and canvases inline |

---

## 3 · Tokens

All tokens come from Hemlock (`g:`). This file defines two local ones:

| Token | Value | Why |
|---|---|---|
| `nav-themeToggleIcon` | `moon` (Light) / `sun` (Dark) | Mirrors the same token in chat-nav-refresh.pen for the copied nav |
| `chart-area-fade` | transparent (`#00000000`) | End stop of the area-chart fades. Hemlock's only transparent color is the nav's `sem-navFadeTransparent`. |

UI text binds `$g:font-primary` (Gothic A1). Editorial type binds `$g:font-secondary` (Noto Serif).

---

## 4 · Type roles

The masters are in Essential Components › 01 Type Roles. The reference lists each role's tokens; this table says what each role is for.

| Role | Use | Rules |
|---|---|---|
| `Type / Eyebrow` | Topic kicker above a canvas title | Caps, tracking +1 |
| `Type / Title` | Canvas headline | One per canvas |
| `Type / Deck` | Lede under the title | Max 680 wide |
| `Type / Meta` | Asked-at, sources, byline | |
| `Type / H2` | Section heading inside a canvas | |
| `Type / H3` | Card, rail, and sub-section heading | |
| `Type / Body` | Running text | About 75 characters a line at most (680 wide in Single) |
| `Type / Body Small` | Card text, notes, step detail | |
| `Type / Label` | Module, chart, and stat labels | Caps, tracking +1 |
| `Type / Stat Value` | Headline numbers | Tabular numerals. `sem-text-header`; deposit and error colors only when the number is signed |
| `Type / Caption` | Source line under charts and photos | Required under every chart and photo |
| `Type / Footnote` | Canvas footer disclaimers | |
| `Type / Pull Quote` | One emphasized idea per canvas | Sits in `Canvas / Pull Quote`, with a 2px `sem-borders-strong` left rule |
| `Type / Group Label` | Groups line items in a plan | |

Title, Deck, H2, H3, Pull Quote and Group Label bind `font-secondary`; the rest bind `font-primary`. Sizes bind `text-size-*` with the matching `line-height-*`, in desktop and mobile modes.

Numbers: use tabular numerals for stat values, table cells, and money. Right-align numeric table columns.

Caps tracking (+1) has no Hemlock token yet (§10).

---

## 5 · Not in Hemlock

The reference's **Not bound to Hemlock** table lists, component by component, every value that skips Hemlock: raw numbers and colors, fonts typed by name, missing line heights, and local tokens. It's regenerated from the .pen, so it's always current. Bind each one unless it's a deliberate exception:

| Exception | Why |
|---|---|
| `prim-base-black` labels on chart fills | Hemlock's categorical fills are pale in both themes |
| `Canvas / Hairline` uses `sem-borders-muted` | Hemlock's Separator (`sem-borders-light`) barely shows on dark |
| The Saved state of `Canvas / Save Button` and the Active state of `Chat / Canvas Chip` keep the Pressed look at rest | Hemlock's Button has no toggle state yet (§10) |
| Caps tracking +1 on every caps label (Eyebrow, Label, Table Header Row, Canvas Chip, Talk) | No Hemlock letter-spacing token (§10) |
| Weight 300 on Deck and Pull Quote | Hemlock keeps light for large display text |
| `chart-area-fade` | No transparent color outside the nav (§3) |

Hemlock has no tokens for letter-spacing, font weight, icon size (it uses 12, 14, 16, 20, and 24), stroke width, or opacity, so the reference prints those plainly instead of flagging them.

The reference covers components only. Screens copy the nav and chat from chat-nav-refresh.pen and inherit its leftovers; `node scripts/lint-pen-spacing.mjs` checks their spacing.

### Chart colors

| Data | Tokens |
|---|---|
| Categorical series | `chart-categorical/color-01` to `chart-categorical/color-15`, in Hemlock's priority order: series 1 = 01, series 2 = 02, and so on. Never skip ahead. |
| Sequential (one measure, low → high) | `chart-sequential/seq-100` to `chart-sequential/seq-700` |
| Targets and reference lines | `chart-threshold` |
| Labels on categorical fills | `prim-base-black` |
| Hemlock charts in a plot slot | Keep their own tokens |

---

## 6 · Layout

### View area

From chat-nav-refresh: no header bar. The view area is max 1024 wide, with at least 40px of gutter on each side. `contentColumn` padding is `[spacing-md, spacing-xl, spacing-2xl, spacing-xl]` (24, 40, 48, 40).

| Viewport | Nav | Chat | Canvas width |
|---|---|---|---|
| 1440 | 240 open | 360 open | 744 |
| 1440 | 240 open | closed (FAB) | 1024 |
| 1440 | closed | closed | 1024 |
| 393 phone | opens from the right, over a scrim | inline with the canvases | 345 (24 gutters) |

Nav and chat are pinned to the viewport; only the mainPanel scrolls. On phones the chat and its canvases are one stream (§7.5).

### Canvas anatomy

```
Canvas / Canvas            vertical, gap spacing-lg, no fill, no border
├─ Canvas / Header         Top Row (Eyebrow · Save, share, more) / Title / Deck / Meta Row
├─ Canvas / Rule / Strong  2px sem-borders-strong, once, directly under the header
├─ Slot / Modules          vertical, gap spacing-lg; templates separated by Canvas / Hairline
└─ Canvas / Footer         1px sem-borders-muted top rule · Footnote · feedback
```

**Vertical rhythm inside a canvas** (set 2026-10-09):

| Between | Gap |
|---|---|
| Header, rule, modules, footer (`Canvas / Canvas`) | `spacing-lg` |
| Modules and hairlines (`Slot / Modules`) | `spacing-lg` |
| Blocks stacked inside a template slot | `spacing-md` |
| Text sections (`Slot / Content` in text-led modules) | `spacing-xl` |
| A section's H2 and its blocks | `spacing-md` |
| Paragraph / With Heading: H3 → Body | `spacing-xs` |
| List items (`Slot / Items`) | `spacing-xs`; `spacing-md` when items have leads |

The header stack is `spacing-sm`. Header actions: `Canvas / Save Button`, then Hemlock `Button/sm/text/icon-only` for share and more. Every button is a Hemlock pill (`radius-full`).

### Templates

The model picks a template by name for each module and fills its named slots with blocks. Templates never nest. Column rules are slot borders (`sem-borders-muted`, left 1px), not separate nodes. Below 720 wide, every multi-column template stacks into one column in slot order.

| Template | Component | Slots | Columns | Breakpoints |
|---|---|---|---|---|
| `single` | `Canvas / Template / Single` | content | 1 | Body max 680 |
| `stat-strip` | `Canvas / Template / Stat Strip` | stat1–stat4 | 2–4 equal, cell inset `spacing-md` | Hide unused cells; 2×2 under 720 |
| `lead-rail` | `Canvas / Template / Lead + Rail` | lead, rail | Lead fills, rail 280, gutter `spacing-lg` | Rail drops below the lead under 880 |
| `two-up` | `Canvas / Template / Two-up` | a, b | 2 × 1fr, gutter `spacing-lg` | Stacks under 720 |
| `three-up` | `Canvas / Template / Three-up` | a, b, c | 3 × 1fr, gutter `spacing-lg` | 2 + 1 under 880; stacks under 720 |
| `plan-split` | `Canvas / Template / Plan Split` | ingredients, steps | Ingredients 280, steps fill | Ingredients stick (top `spacing-md`); under 720 they collapse into an accordion above the steps |

Each slot's placeholder names the blocks it accepts. The stat-strip cells, for example, accept Stat and Fact only.

---

## 7 · Components

Names match the components in `gen-ui-canvas_v2.pen`. The reference lists every layer and token; this section says what each group is for, plus the rules the values can't show.

### 7.1 Essential Components

| Section | Components | Rules |
|---|---|---|
| 01 Type roles | `Type / Eyebrow` through `Type / Group Label` | §4 |
| 02 Canvas shell | `Canvas / Canvas`, `Canvas / Header` (Default, With Media), `Canvas / Rule / Strong`, `Canvas / Hairline`, `Canvas / Footer`, `Canvas / Feed Divider / Default`, `Canvas / Save Button` (7 states), `Canvas / Toast` (Saved, Removed) | §6. With Media puts a media slot beside Title and Deck for an ImageBlock, an illustration, or a compact chart. Saving: §7.4. |
| 03 Layout templates | `Canvas / Template` (six) | §6 |
| 04 Text | `Canvas / Paragraph` (Default, With Heading), `Canvas / List Item` (Bullet and Number, each With Lead; Bullet / Nested), `Canvas / List` (Bulleted, Numbered), `Canvas / Number Marker` | The marker (diamond bullet or round number) sits in an absolute column with a padding inset, so wrapped lines align with the first. |
| 05 Numbers | `Canvas / Stat` (Default, Positive, Negative), `Canvas / Fact`, `Canvas / Ranked Row`, `Canvas / Breakdown Row` | Stat = Label + Stat Value + Hemlock DataValueIndicator. Ranked Row = rank, name and meta, value, Hemlock Tag. Breakdown Row is a Ranked Row without the rank. |
| 06 Tables | `Canvas / Table` (Header Row, Row, Row Highlight, Total Row) | Numeric columns right-aligned, with tabular numerals. Row Highlight fills `sem-background-highlight`; secondary text on it uses `sem-text-body`, not meta. Total Row has a `sem-borders-strong` top rule. |
| 07 Charts | `Canvas / Bar Chart`, `Canvas / Line Chart`, `Canvas / Area Chart` (each Default and Single Series with their Hover states, plus Mini), `Canvas / Horizontal Bar Chart` (stacked and Ranked, each with Hover), `Canvas / Heatmap Chart` (Default, Positive-Negative), `Canvas / Chart Frame`, `Canvas / Legend Item` (Line, Swatch), `Canvas / Chart Annotation`, `Canvas / Value Label`, `Canvas / Target Bar` | Bar chart widths, per the board: at max width the chart caps at 400 and the extra width becomes side margin; at medium widths the bars scale down; when narrow, the gap between bars in a category collapses first, and the gaps between categories stay. Bar value labels: §7.3. Hemlock charts in use: `DonutChart/with-legend` (allocation) and Sparkline (table trends). |
| 08 Editorial | `Canvas / Pull Quote`, `Canvas / Takeaway` (with Mobile and No Icon variants), `Canvas / Tip`, `Canvas / Text Link` (Default, External) | Takeaway leads with a Lucide icon chosen by meaning. Tip uses Hemlock's info callout roles. Text Link is `sem-text-action` with arrow-right, or arrow-up-right when External. |
| 09 Controls | `Canvas / Toggle Row` (On, Off), `Q&A / Answer / Amount Slider`, `Canvas / Stepper`, `Canvas / Line Item` | Inputs for what-if answers. Toggle Row wraps Hemlock ToggleSwitch. Amount Slider: label left, value right, Hemlock Slider below with its track filling the card. Stepper: − and + are Hemlock `Button/sm/outline/icon-only`. |
| 10 Chat ↔ canvas | `Chat / Canvas Chip` (Default, Hover, Pressed, Active) | §7.5 |
| 11 Hemlock in canvases | Hemlock `Collapse/open` and `Collapse`, `SegmentedControl`, `ImageBlock/caption-credit` | Where Hemlock has the right component, a canvas uses it directly: Collapse for expandable details, SegmentedControl to choose an option or range, ImageBlock for editorial photos (§7.6). |

### 7.2 More components, nav, and Q&A

| Board · section | Components | Rules |
|---|---|---|
| More components · 03 Saved view & loading | `Canvas / Snapshot Bar` (Snapshot, Live), `Canvas / Skeleton`, `Saved / Tile` (Default, Hover) | Skeleton holds the space while an answer streams; Save shows Disabled until the canvas is done. Snapshot Bar and Saved Tile wait for the Saved page (§8.4). |
| More components · 04 More blocks | `Canvas / Icon Tile`, `Canvas / Media Slot` (Icon, Illustration), `Canvas / Teaser Card`, `Canvas / Plan Check Item`, `Canvas / Entity Chip`, `Canvas / Progress`, `Canvas / Plan Step` (Done, Active, Upcoming), `Canvas / Timeline Item` (Active, Upcoming), `Canvas / Note Input`, `Canvas / Saved Note` | Three image kinds: charts and data graphics (Chart Frame), editorial photos (Hemlock ImageBlock), illustrations and icons (Media Slot). Teaser Card is for three-up related plans and explainers. Plan steps use Hemlock Checkbox and Tag; the Active step is marked by a 2px `sem-borders-action` left rule and no fill. Progress has one segment per step. Notes are private notes on a plan. |
| Nav / Conversations | `Nav / Conversation Item` (Default, Hover, Active, Menu Open, Renaming, Dragging), `Nav / Menu Item` (Default, Hover, Destructive), `Nav / Conversation Menu` | §8.5 |
| Nav / Conversations, mobile | `Nav / Conversation Item / Mobile` (Default, Active, Lifted), `Nav / Menu Item / Mobile` (Default, Pressed, Destructive), `Nav / Conversation Menu / Mobile`, `Annotation / Touch` (Tap, Hold) | §8.5. The annotations draw touch hints, not UI. |
| Q&A / Template | The plan interview set: `Q&A / Plan interview` (Story Token, Story, Topic Step: Done, Current, Upcoming; Topic Track; Focus Question). Earlier versions, kept as components: `Q&A / Question Card` (Current, Answered, Up next; Follow-up / Current, Answered), `Q&A / Progress`, `Q&A / Follow-up Note`, `Q&A / Follow-up Group`, `Q&A / Talk` (on hold), `Q&A / Branch Card` (Not started, Hover, In progress, Completed), `Q&A / Connector`, `Q&A / Branch Header` | §8.6 |
| Q&A / Answer Controls | `Q&A / Answer / Number Stepper`, `Q&A / Answer / Yes-No` (Unselected, Selected), `Q&A / Answer / Single Choice` (Unselected, Selected), `Q&A / Answer / Multi-select`, `Q&A / Answer / Option Tile` (Default, Selected) | Selected states use Hemlock's pressed outline tokens. |

### 7.3 Bar value labels

`Canvas / Horizontal Bar Chart`, stacked. Every segment has a Value label (`font-primary`, 600, `prim-base-black` on the pale categorical fills). Size it to its segment:

| When the label… | Size | Segment left padding |
|---|---|---|
| fits at 12px | `text-size-xs` / `line-height-xs` | `spacing-2xs` (8) |
| fits only at 11px | `text-size-2xs` / `line-height-2xs` | `spacing-3xs` (4) |
| doesn't fit at 11px | Value off; the value stays in the hover tooltip | — |

"Fits" means padding + label width + 2px clear before the segment's edge. In code, measure the rendered label and recheck when the chart resizes. In Pencil, use these widths as a guide:

| Label | Needs at 12px | Needs at 11px |
|---|---|---|
| One digit (7%) | 30 | 22 |
| Two digits (15%) | 36 | 28 |
| 100% | 44 | 34 |

Hemlock has no size below `text-size-2xs`, so labels never go smaller than 11px.

Hover keeps the hovered segment (or bar, in Ranked) solid, dims everything else to 30%, and shows a tooltip just above the row.

### 7.4 Saving

**`Canvas / Save Button`**: seven presets, each an instance of a Hemlock `Button/sm/outline/icon-left` variant. A preset sets only the variant, the icon, and the label.

| State | Hemlock variant | Icon | Label |
|---|---|---|---|
| Default | `outline/icon-left` | bookmark | Save |
| Hover | `outline/icon-left/hover` | bookmark | Save |
| Pressed | `outline/icon-left/pressed` | bookmark | Save |
| Saving | `outline/icon-left/loading` | bookmark | Saving… |
| Saved | `outline/icon-left/pressed` | bookmark-check | Saved |
| Saved Hover | `outline/icon-left/hover` | bookmark-minus | Remove |
| Disabled | `outline/icon-left/disabled` | bookmark | Save |

Outline, not secondary: Hemlock's secondary is outline plus an opaque fill, which matters only on another surface or when floating. Save sits on `sem-background-main` in every header, so outline is the lighter, matching choice. Saved is a toggle that's on, so it keeps the Pressed style at rest.

**`Canvas / Toast`**: Saved ("Canvas saved", then View saved | Undo) and Removed ("Removed from saved", then Undo). View saved and Undo are Hemlock `Button/sm/text`. The toast sits bottom-center of the view area, 24px above the viewport edge, for 5 seconds, and pauses while hovered or focused. The conversations nav reuses Removed with its own copy (§8.5).

### 7.5 Chat ↔ canvas

**`Chat / Canvas Chip`**: every AI turn that renders a canvas posts a chip under the AI text. The chip leads with arrow-left, because the feed sits to the left of the chat, then names the canvas in caps. It hugs its label and truncates with an ellipsis past the chat column. Its type icon is off by default. Active keeps the Pressed look at rest, like Save's Saved state, and marks the canvas in view (§8.3). The chip doesn't show saved state; the canvas Save button carries it.

**Reply pattern**: AI text → Canvas Chip → prompt chips, all in one AI turn. Prompt chips sit under the latest AI reply only.

**Phones**: the chat and its canvases are one inline stream. An inline canvas drops its Canvas Chip, since the canvas is right there, and hides the header's quoted question, since the bubble above shows it.

**Chat text and spacing** (2026-10-09; every chat surface, desktop panel and phone):

| Part | Spec |
|---|---|
| Message text (question bubbles, AI replies) and input text | `text-size-base` / `line-height-base`. Chat text is body text. 16px also keeps iOS Safari from zooming the input on focus. |
| Turn | A Turn frame: the question, then an AI response frame |
| Question → AI response | `spacing-lg` |
| Inside an AI response (text → chip → prompt chips) | `spacing-md`; paragraphs `spacing-xs` |
| Between turns | `spacing-2xl`. On phones, `spacing-4xl` after a turn whose answer is an inline canvas. |
| AI text → inline canvas (phones) | `spacing-2xl` |
| Question bubble padding | `[spacing-sm, spacing-md]` |
| Prompt chips | Hemlock `Button/sm/outline`, overriding only the label content (no font override). Chip rows 8 apart, chips 8 apart, no top padding, greedy wrap, max 3, cleared on a new turn. |

**Feed / New Canvas Pill**: Hemlock `Button/sm/secondary/icon-right`, "New canvas" + arrow-down, `shadow-md`.

Chat atoms (messages, chips, input, close FAB) belong to chat-nav-refresh.pen. They're copied here to show the views in place; don't edit them here.

### 7.6 Hemlock components inside canvases

The canvas components use Hemlock's Button, Tag, DataValueIndicator, Checkbox, Radio, ToggleSwitch, Slider, and Avatar. Canvases also use Collapse, SegmentedControl, and ImageBlock directly (Essential Components › 11), and DonutChart and Sparkline in charts. The reference shows each instance in a component and what it overrides.

Override only content. Never override a font: Hemlock's `font-primary` is already Gothic A1, so every font override is a leftover to remove (the reference lists them as fonts typed by name).

**Card-slot components take no overrides.** Hemlock builds AreaChart, AreaChartMultiSeries, BarChart, DonutChart, GaugeChart, KpiCard, FollowUpBlock, SectionBlock, and their variants as Card instances with filled slot content. Pencil can't save an override on anything inside an imported component's slot: saving fails with "pen.dev can't save your changes", and the Pen log shows `Failed to serialize the document … reading 'id'`.

---

## 8 · Behavior

### 8.1 Feed

- Each conversation is its own feed (§8.5). Order mirrors the chat: oldest at top, newest at the bottom.
- When an answer starts, scroll the feed so the new canvas header sits `spacing-md` below the mainPanel top, then stream into a `Canvas / Skeleton`. Respect `prefers-reduced-motion` (jump, don't animate).
- If the user has scrolled up when a canvas arrives, don't move them. Show the New Canvas Pill (bottom-center, 24px above the viewport edge; 8px above the toast if both show). Hide it once the newest header is in view.
- `Canvas / Feed Divider / Default` sits between canvases.

### 8.2 Saving

```
Default ──press──▶ Saving ──ok──▶ Saved ──press──▶ Default (Removed toast)
   ▲                  │
   └──── error ◀──────┘   (toast: "Couldn't save. Retry")
Disabled while the canvas streams, while offline, or for canvases with no data.
```

- Save from the canvas header or by keyboard. Undo in the toast reverses the last save or removal.
- The Canvas Chip doesn't mirror the saved state (§7.5).

### 8.3 Chat ↔ canvas anchoring

- Clicking a Canvas Chip scrolls the feed so its canvas header sits `spacing-md` below the mainPanel top, and moves focus to the canvas title.
- Exactly one chip is Active: the one whose canvas header is nearest the top of the view area. Update on scroll (throttled).
- Sending a message clears the prompt chips from earlier turns.

### 8.4 Saved canvases (on hold)

On 2026-10-07 the CONVERSATIONS nav section replaced CANVASES (Feed and Saved). Saved is dropped for now and comes back as Library. Save still works in the canvas header, and these v1 rules carry over for when the page returns:

- Saving stores a snapshot: the canvas JSON (§9) with its data values, the original question, `askedAt`, and `dataAsOf`.
- Opening a saved canvas renders the snapshot under the `Canvas / Snapshot Bar`. Refresh reruns the original question with today's data and swaps the bar to Live. The stored snapshot doesn't change until the user picks Update saved copy.
- Saved canvases from a removed conversation stay saved; they're snapshots.

### 8.5 Conversations nav

CONVERSATIONS sits below YOUR MONEY and takes the rest of the nav height. Opening a conversation loads its chat in the chat panel and its canvases in the mainPanel. The full behavior is in the 04 spec notes. In short:

- **Order** is manual. New conversations go on top, and new activity never reshuffles the list. Titles wrap to two lines, then truncate. The open conversation is Active, with `aria-current="page"`.
- **Move** by dragging. The handle appears on hover or focus, and the carried row lifts with `shadow-lg`. Fallbacks stay invisible to people who drag: clicking the handle picks the row up and drops it, and keyboard and screen-reader users get Move up / Move down, with a live region announcing each step.
- **Rename** inline, from More › Rename or a double-click. Enter or clicking away saves; Esc cancels.
- **Remove** at once from More › Remove, with a 5-second Undo toast ("Conversation removed · Undo"). Removing the open conversation starts a new, empty one.
- **Phones**: the nav opens from the right over a scrim. More shows on every row. Press and hold lifts a row and opens the same menu; moving the finger drags it.

| Spec note | ID |
|---|---|
| Structure & order | `DqYA0` |
| Moving rows | `KpTBX` |
| Rename & remove | `i4T4Gx` |
| Tokens & Hemlock gaps | `T6zUb` |
| Mobile | `VZnBK` |

### 8.6 Plan interview

A request in chat ("Help me build a long-term financial projection.") starts a structured interview that ends in a plan canvas. The desktop flow is 0–6: the conversation, first question, pick what applies, follow-up, edit an answer, review, and plan ready. On desktop the plan starts a new conversation; on phones it stays in the same thread. The phone flow is 0–8: it adds a chat step and "plan so far", and ends back in the chat.

- One question is in focus at a time, as an open section with the active-step left rule (the Plan Step pattern), not a card.
- Answered questions collapse into the "What I know so far" sentence. Each answer is a token that reopens its question in place, so the page stops growing.
- Follow-ups stay real questions, shown as a topic track ("Outside income · 2 of 3").
- Progress is by section, with time left, never by question count.
- "Your plan, so far" shows the live result and the change from the last answer. "Why we ask" explains the current question with numbers.
- Keyboard: Enter continues; number keys pick options.
- Desktop edits open a popover centered over `sem-scrim`, using the conversation menu's surface recipe, not a drawer.
- Phones: the interview gets its own screen with an icon-only Back. The rail becomes a section strip at the top, plus a pinned "Your plan, so far" bar above Continue, in the thumb zone.

Inspiration and trade-offs are in spec note `XrTc8`. The components are the Plan interview set on the Q&A board (`Q&A / Plan interview`), plus the answer controls on `P4aoY`.

### 8.7 Accessibility

| Element | Pattern |
|---|---|
| Feed | `role="feed"` with each canvas as `role="article"` (`aria-labelledby` its title, `aria-posinset` / `aria-setsize`); `aria-busy="true"` while a canvas streams |
| Canvas title | `h2`; module headings `h3` |
| Save | `button` with `aria-pressed`; label "Save canvas" / "Remove from saved"; `aria-pressed="true"` renders the Pressed style |
| Toast | `role="status"` (polite); Undo and View saved are buttons |
| Canvas Chip | Link to `#canvas-{id}`; `aria-current="true"` when Active |
| Conversations nav | The open row has `aria-current="page"`; moves are announced in a polite live region |
| Plan steps | Real checkboxes with the step text as label; Progress is `role="progressbar"` with `aria-valuenow` / `aria-valuemax` |
| Stepper | `role="spinbutton"` with `aria-valuetext` ("60 stocks, 40 bonds") |
| Toggle Row | Hemlock ToggleSwitch, labeled by the row text |
| Charts | A text summary in the caption; data table available on request |

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
          { "component": "Takeaway", "icon": "target", "lead": "You're ahead of your savings goal.",
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

- `type` is `report`, `plan`, or `explainer`. It sets the chip's type icon (when shown) and the Saved Tile eyebrow.
- Use 1–4 modules. `stat-strip` cells take `Stat` or `Fact` only. Templates never nest.
- Values are raw numbers plus a `format`; the renderer formats them. Colors are token names, never hex.
- `saved` is owned by the client, not the model. The model never sets it.
- Plans add a `plan-split` module whose `steps` slot holds `PlanStep` objects (`state`: `done` / `active` / `upcoming`, `body`, `account`, `action` link) and whose `ingredients` slot holds `ToggleRow`, `PlanCheck`, `Stepper`, and `LineItem`.

---

## 10 · Open decisions

| Topic | Status |
|---|---|
| New conversation entry point | Not designed. Proposal: a "+" on the CONVERSATIONS header (Hemlock `Button/sm/text/icon-only` on desktop). |
| Nav hierarchy | Sticky note: Accounts, Money Movement, Advisor, Conversations. |
| Report status | Sticky note: show a report's progress in the chat header, where "Chat" used to appear. |
| Type / H2 size | `Type / H2` binds `text-size-xl`. Hemlock's heading scale puts H1 at `text-size-xl` and H2 at `text-size-lg`. |
| Caps letter-spacing token | Proposal: `letter-spacing-caps` in Hemlock, for the caps labels in §5. |
| Chart chrome | The chart library's Bar, Line, and Area charts draw their own fill and rounded corners, and most variants a border too. Principle 2 rules that out for blocks inside a canvas. |
| Chart series order | Hemlock assigns categorical colors in priority order (§5), but the Horizontal Bar Chart's segments use 01, 04, 08, 13 and the Bar Chart's series 04 and 07. |
| Feed gap | The views put 56 between canvases, which is off-scale. chat-nav-refresh.pen moved its feed to `spacing-2xl` (48) on 2026-10-14. |
| Action color on marks | The Plan Step Active rule (`sem-borders-action`) and the Amount Slider value (`sem-text-action`) use action roles on things that aren't clickable. On 2026-10-09, action color was reserved for actions. |
| Toggle buttons in Hemlock | Save's Saved and the Canvas Chip's Active show a Pressed variant at rest. Hemlock's Button needs a `pressed` prop (or `[aria-pressed="true"]` styles) to render it in code. |
| Text on `sem-background-highlight` | `sem-text-deposit` measures 4.25:1 on it in light (Row Highlight net values), under AA. Needs a Hemlock pairing decision. |
| Saved page | On hold until Library (§8.4). Open: how long snapshots are kept, and whether Refresh replaces them by default. |
| Review notes on the canvas | Four notes, not applied yet: titles could also use H2 or H3, not only eyebrow-style text; make bullets a bit larger and better centered on the text; add a horizontal version of the ranked numbers component; default to one column, make two columns equal, and keep charts full width, with the components around them formatted to fit. The last one conflicts with the 400 cap on bar charts (§7.1). |
| The file's own notes | `nM8Nd` and the 11 Hemlock in Canvases board text still describe font-ui. The 02 Canvas Shell and 03 Layout Templates board text still put `spacing-md` between modules (the components use `spacing-lg`) and still mention the Feed Divider Day variant and Saved in the nav. |
| Chat spec vs chat-nav-refresh.pen | Chat text is `text-size-base` here (§7.5). chat-nav-refresh.pen, the source of the chat atoms, still sets its messages in `text-size-sm`. |
| Hemlock housekeeping | `colDate` (an instance of `TableHeaderCell/sorted-desc`) has a stale override pointing at a node that no longer exists. Harmless here; worth cleaning in Hemlock. |

---

## 11 · When Hemlock changes

1. Update `hemlock-library.lib.pen`.
2. Reopen `gen-ui-canvas_v2.pen` in Pencil so it picks up the new library, and save it.
3. Run the Hemlock check (§12). Fix every BREAKING finding; review every REVIEW finding and the contrast table.
4. Run the spec sync (§13). Renamed tokens and changed values show up in the reference.
5. When the result is accepted, write the Hemlock baseline with `--write-baseline` and commit it with the Hemlock change.

## 12 · Hemlock dependency check

```
node scripts/check-hemlock-deps.mjs pencil/design-system/in-progress/gen-ui-canvas_v2.pen                   # report
node scripts/check-hemlock-deps.mjs pencil/design-system/in-progress/gen-ui-canvas_v2.pen --write-baseline  # record the accepted Hemlock values
node scripts/check-hemlock-deps.mjs pencil/design-system/in-progress/gen-ui-canvas_v2.pen --json --strict   # CI-style: exit 1 on BREAKING
```

It reports tokens and components that no longer exist, instance overrides whose target node moved, token values that changed since `gen-ui-canvas_v2.hemlock-baseline.json`, and WCAG contrast for the text roles the canvases use, in both themes. Without a path, the script checks v1. v2 has no Hemlock baseline yet; write one once the current Hemlock values are accepted.

## 13 · Keeping this spec in sync

The .pen keeps changing, and this spec has to change with it. Three files move together:

| File | Holds | Updated by |
|---|---|---|
| `gen-ui-canvas_v2.pen` | The design, and every value | Designing |
| `gen-ui-canvas_v2.components.md` | Every component's layers and tokens, and every value that skips Hemlock | The script, from the .pen |
| `gen-ui-canvas_v2.md` (this file) | Rules, behavior, and decisions | Hand, prompted by the script |

After every change to the .pen, before committing it:

1. Save the .pen in Pencil.
2. Run `node scripts/sync-gen-ui-spec.mjs`. It rewrites the component reference, then lists what this spec has to catch up on:
   - **CHANGED**: components, frames, notes, board text, and local tokens added, removed, renamed, or edited since the spec was last reviewed, with the lines here that mention each component
   - **STALE**: names, IDs, and tokens this spec mentions that no longer exist
   - **MISSING**: components this spec never mentions
   - It also checks the notes inside the .pen for names and tokens that no longer exist.
3. Update this spec for everything it lists. Write rules and decisions here; values belong in the .pen, and the reference picks them up.
4. Run `node scripts/sync-gen-ui-spec.mjs --write-baseline` to record the review in `gen-ui-canvas_v2.spec-baseline.json`.
5. Commit the .pen, this spec, the reference, and the baseline together.

`node scripts/sync-gen-ui-spec.mjs --check --strict` writes nothing and exits 1 when the reference is out of date or anything is listed, for CI or a pre-commit hook.
