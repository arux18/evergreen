# Gen-UI Canvas v2 — Component reference

Generated from `gen-ui-canvas_v2.pen` by `scripts/sync-gen-ui-spec.mjs`. Don't edit this file: change the .pen, then run the script. It belongs to the spec, [gen-ui-canvas_v2.md](gen-ui-canvas_v2.md).

How to read it:

- Each component lists its layers and what they bind. Token names are Hemlock's, without the `g:` prefix.
- **Bold** marks a value that isn't bound to a Hemlock token: a raw number or color, a missing font, size or line height, or `(local)` for one of this file's own tokens.
- In a family, the first variant lists every layer; the others list only the layers that differ.
- An instance names its master (a component in this file, or a Hemlock one) and the properties it overrides.
- Annotation components are exempt: they draw touch hints, not UI.

## Contents

- [Not bound to Hemlock](#not-bound-to-hemlock) (216 values in 70 components)
- Essential Components (`rQNVD`, 100 components): 01 Type Roles · 02 Canvas Shell · 03 Layout Templates · 04 Text · 05 Numbers · 06 Tables · 07 Charts · 08 Editorial · 09 Controls · 10 Chat ↔ Canvas
- Canvas Design Library (`KNbgW`, 19 components): 03 Saved View & Loading · 04 More Blocks
- Nav / Conversations — Components (`gnGT8`, 10 components): Conversation Item · 6 states · Conversation Menu
- Nav / Conversations — Mobile Components (`bv5Vu`, 9 components): Mobile Conversation Item · Mobile Menu · Touch Annotations
- Q&A / Template — Components (`XAEUJ`, 22 components): Question Card · Question cards · Follow-ups · Plan interview · Branches · first version · Branch Header · first version
- Q&A / Answer Controls — Components (`P4aoY`, 8 components): Number Stepper · Yes-No · Single Choice · Multi-select

## Not bound to Hemlock

216 values in 70 components skip Hemlock. Bind each one to its token, or record in the spec why it stays.

| Component | Values |
|---|---|
| `Q&A / Answer / Yes-No / Unselected` | Yes › Label: font Gothic A1 · No › Label: font Gothic A1 |
| `Q&A / Answer / Yes-No / Selected` | Yes › Label: font Gothic A1 · No › Label: font Gothic A1 |
| `Q&A / Answer / Single Choice / Unselected` | Yes › Label: font Gothic A1 · No › Label: font Gothic A1 |
| `Q&A / Answer / Single Choice / Selected` | Yes › Label: font Gothic A1 · No › Label: font Gothic A1 |
| `Q&A / Answer / Option Tile / Default` | Checkbox › Label: font Gothic A1 |
| `Q&A / Answer / Option Tile / Selected` | Checkbox › Label: font Gothic A1 |
| `Q&A / Question Card / Current` | Actions › Skip › Label: font Gothic A1 · Actions › Continue › Label: font Gothic A1 |
| `Q&A / Plan interview / Focus Question` | Actions › Primary › Continue › Label: font Gothic A1 · Actions › Skip › Label: font Gothic A1 |
| `Q&A / Branch Header` | Back › Label: font Gothic A1 |
| `Canvas / Snapshot Bar / Snapshot` | Action › Label: font Gothic A1 |
| `Canvas / Snapshot Bar / Live` | Action › Label: font Gothic A1 |
| `Saved / Tile / Default` | Root: padding 20 · Preview › Stat: gap 2 · Preview › Sparkline: fill #00000000 · Bottom Row › Freshness › Refresh › Label: font Gothic A1 |
| `Saved / Tile / Hover` | Root: padding 20 · Preview › Stat: gap 2 · Preview › Sparkline: fill #00000000 · Bottom Row › Freshness › Refresh › Label: font Gothic A1 |
| `Canvas / Teaser Card` | Card Meta › Time: gap 4 · Card Meta › Tag › Label: font Gothic A1 |
| `Canvas / Plan Check Item` | Root: gap 6 |
| `Canvas / Entity Chip` | Root: gap 4 · Root: padding 2 · Root: padding 8 · Root: padding 2 · Root: padding 6 |
| `Canvas / Progress` | Root: gap 4 |
| `Canvas / Plan Step / Done` | Root: fill #00000000 · Root: border #00000000 · Checkbox › Label: font Gothic A1 · Checkbox › Helper: font Gothic A1 |
| `Canvas / Plan Step / Active` | Content › Top › Tag › Label: font Gothic A1 |
| `Canvas / Plan Step / Upcoming` | Root: fill #00000000 · Root: border #00000000 |
| `Canvas / Timeline Item / Active` | Rail: gap 4 · Rail: padding 3 · Text: gap 2 |
| `Canvas / Timeline Item / Upcoming` | Rail: gap 4 · Rail: padding 3 · Text: gap 2 |
| `Canvas / Saved Note` | Root: gap 4 |
| `Canvas / Save Button / Default` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Hover` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Pressed` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Saving` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Saved` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Saved Hover` | Root › Label: font Gothic A1 |
| `Canvas / Save Button / Disabled` | Root › Label: font Gothic A1 |
| `Canvas / Toast / Saved` | Root: padding 14 · View saved › Label: font Gothic A1 · Undo › Label: font Gothic A1 |
| `Canvas / Toast / Removed` | Root: padding 14 · Undo › Label: font Gothic A1 |
| `Canvas / Feed Divider / Default` | Root: radius 99999 |
| `Canvas / Template / Single` | Slot / Content › Placeholder: gap 4 |
| `Canvas / Template / Stat Strip` | Slot / Stat 1 › Placeholder: gap 4 · Slot / Stat 2 › Placeholder: gap 4 · Slot / Stat 3 › Placeholder: gap 4 · Slot / Stat 4 › Placeholder: gap 4 |
| `Canvas / Template / Lead + Rail` | Slot / Lead › Placeholder: gap 4 · Slot / Rail › Placeholder: gap 4 |
| `Canvas / Template / Two-up` | Slot / A › Placeholder: gap 4 · Slot / B › Placeholder: gap 4 |
| `Canvas / Template / Three-up` | Slot / A › Placeholder: gap 4 · Slot / B › Placeholder: gap 4 · Slot / C › Placeholder: gap 4 |
| `Canvas / Template / Plan Split` | Slot / Ingredients › Placeholder: gap 4 · Slot / Steps › Placeholder: gap 4 |
| `Canvas / Stat / Default` | Delta › indicatorText: font Gothic A1 |
| `Canvas / Stat / Negative` | Delta › indicatorText: font Gothic A1 |
| `Canvas / Ranked Row` | Right › Tag › Label: font Gothic A1 |
| `Canvas / Breakdown Row` | Right › Tag › Label: font Gothic A1 |
| `Canvas / Bar Chart / Default` | PlotArea › BarGroup ×6 › Label: line height 1.333 (×6) · Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Bar Chart / Default / Hover` | PlotArea › BarGroup ×3 › Label: line height 1.333 (×3) · PlotArea › BarGroup › Label: line height 1.333 · PlotArea › BarGroup ×2 › Label: line height 1.333 (×2) · PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttValue: line height 1.333 · Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Bar Chart / Single Series` | PlotArea › BarGroup ×6 › Label: line height 1.333 (×6) |
| `Canvas / Bar Chart / Single Series / Hover` | PlotArea › BarGroup ×3 › Label: line height 1.333 (×3) · PlotArea › BarGroup › Label: line height 1.333 · PlotArea › BarGroup ×2 › Label: line height 1.333 (×2) · PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 |
| `Canvas / Line Chart / Default` | Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Line Chart / Default / Hover` | PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttValue: line height 1.333 · Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Line Chart / Single Series / Hover` | PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 |
| `Canvas / Area Chart / Default` | PlotArea › Area-Liabilities: fill stop `chart-area-fade` (local token) · PlotArea › Area-Assets: fill stop `chart-area-fade` (local token) · Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Area Chart / Default / Hover` | PlotArea › Area-Liabilities: fill stop `chart-area-fade` (local token) · PlotArea › Area-Assets: fill stop `chart-area-fade` (local token) · PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow (2) › ttValue: line height 1.333 · Legend › LegendItem › Label: line height 1.333 · Legend › LegendItem (2) › Label: line height 1.333 |
| `Canvas / Area Chart / Single Series` | PlotArea › Area: fill stop `chart-area-fade` (local token) |
| `Canvas / Area Chart / Single Series / Hover` | PlotArea › Area: fill stop `chart-area-fade` (local token) · PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 |
| `Canvas / Area Chart / Mini` | PlotArea › Area: fill stop `chart-area-fade` (local token) |
| `Canvas / Chart Frame` | Slot / Plot › Area: fill stop #00000000 · Slot / Plot › Line: fill #00000000 · Axis: padding 6 · Legend › Canvas / Legend Item / Line: gap 6 · Legend › Canvas / Legend Item / Line › Swatch: radius 2 · Legend › Canvas / Legend Item / Swatch: gap 6 |
| `Canvas / Legend Item / Line` | Root: gap 6 · Swatch: radius 2 |
| `Canvas / Legend Item / Swatch` | Root: gap 6 |
| `Canvas / Horizontal Bar Chart` | Row 1 › Bar: gap 2 · Row 1 › Bar › Segment: padding 8 · Row 1 › Bar › Segment (2): padding 8 · Row 1 › Bar › Segment (3): padding 8 · Row 1 › Bar › Segment (4): padding 8 · Row 2 › Bar: gap 2 · Row 2 › Bar › Segment: padding 8 · Row 2 › Bar › Segment (2): padding 8 · Row 2 › Bar › Segment (3): padding 8 · Row 2 › Bar › Segment (4): padding 8 · Row 3 › Bar: gap 2 · Row 3 › Bar › Segment: padding 8 · Row 3 › Bar › Segment (2): padding 8 · Row 3 › Bar › Segment (3): padding 4 · Row 3 › Bar › Segment (4): padding 8 · Legend: padding 4 · Legend: padding 104 |
| `Canvas / Horizontal Bar Chart / Hover` | Row 1 › Bar: gap 2 · Row 1 › Bar › Segment: padding 8 · Row 1 › Bar › Segment (2): padding 8 · Row 1 › Bar › Segment (3): padding 8 · Row 1 › Bar › Segment (4): padding 8 · Row 2 › Bar: gap 2 · Row 2 › Bar › Segment: padding 8 · Row 2 › Bar › Segment (2): padding 8 · Row 2 › Bar › Segment (3): padding 8 · Row 2 › Bar › Segment (4): padding 8 · Row 3 › Bar: gap 2 · Row 3 › Bar › Segment: padding 8 · Row 3 › Bar › Segment (2): padding 8 · Row 3 › Bar › Segment (3): padding 4 · Row 3 › Bar › Segment (4): padding 8 · Legend: padding 4 · Legend: padding 104 · ChartTooltip › ttHeader: line height 1.333 · ChartTooltip › ttValueRow › ttLabel: line height 1.333 · ChartTooltip › ttValueRow › ttValue: line height 1.333 |
| `Canvas / Horizontal Bar Chart / Ranked / Default` | PlotArea › BarRow › Label: line height 1.333 · PlotArea › BarRow (2) › Label: line height 1.333 · PlotArea › BarRow (3) › Label: line height 1.333 · PlotArea › BarRow (4) › Label: line height 1.333 · PlotArea › BarRow (5) › Label: line height 1.333 |
| `Canvas / Horizontal Bar Chart / Ranked / Hover` | PlotArea › BarRow › Label: line height 1.333 · PlotArea › BarRow (2) › Label: line height 1.333 · PlotArea › BarRow (3) › Label: line height 1.333 · PlotArea › BarRow (4) › Label: line height 1.333 · PlotArea › BarRow (5) › Label: line height 1.333 · PlotArea › ChartTooltip › ttHeader: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttLabel: line height 1.333 · PlotArea › ChartTooltip › ttValueRow › ttValue: line height 1.333 |
| `Canvas / Heatmap Chart / Default` | component/Card › chartContent › cellGrid › Tech › text: line height 1.333 · component/Card › chartContent › cellGrid › Tech › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Health › text: line height 1.333 · component/Card › chartContent › cellGrid › Health › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Finance › text: line height 1.333 · component/Card › chartContent › cellGrid › Finance › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Energy › text: line height 1.333 · component/Card › chartContent › cellGrid › Energy › text (2): line height 1.429 · component/Card › chartContent › CardHeader › Title: line height 1.556 · component/Card › chartContent › CardHeader › Description: line height 1.5 |
| `Canvas / Heatmap Chart / Positive-Negative` | component/Card › chartContent › cellGrid › Tech › text: line height 1.333 · component/Card › chartContent › cellGrid › Tech › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Health › text: line height 1.333 · component/Card › chartContent › cellGrid › Health › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Finance › text: line height 1.333 · component/Card › chartContent › cellGrid › Finance › text (2): line height 1.429 · component/Card › chartContent › cellGrid › Energy › text: line height 1.333 · component/Card › chartContent › cellGrid › Energy › text (2): line height 1.429 · component/Card › chartContent › CardHeader › Title: line height 1.556 · component/Card › chartContent › CardHeader › Description: line height 1.5 |
| `Canvas / Chart Annotation` | Root: gap 4 |
| `Canvas / Pull Quote` | Root: padding 4 · Root: padding 4 |
| `Canvas / Text Link / Default` | Root: gap 6 |
| `Canvas / Text Link / External` | Root: gap 6 |
| `Canvas / Stepper` | Text: gap 2 |
| `Canvas / Line Item` | Item: gap 2 |

## Essential Components

Board `rQNVD`.

### 01 Type Roles

#### Type / Eyebrow · `oOoEA`

- Root — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`

#### Type / Title · `klzVo`

- Root — `font-secondary` · `text-size-2xl` / `line-height-2xl` · 400 · `sem-text-header`

#### Type / Deck · `z2AQA`

- Root — `font-secondary` · `text-size-lg` / `line-height-lg` · 300 · `sem-text-body`

#### Type / Meta · `CidK2`

- Root — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`

#### Type / H2 · `YtPAT`

- Root — `font-secondary` · `text-size-xl` / `line-height-xl` · 400 · `sem-text-header`

#### Type / H3 · `ruR5E`

- Root — `font-secondary` · `text-size-md` / `line-height-md` · 400 · `sem-text-header`

#### Type / Body · `Kx375`

- Root — `font-primary` · `text-size-base` / `line-height-base` · 400 · `sem-text-body`

#### Type / Body Small · `XrFIL`

- Root — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-body`

#### Type / Label · `PM4CR`

- Root — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`

#### Type / Stat Value · `tIKWx`

- Root — `font-primary` · `text-size-2xl` / `line-height-2xl` · 600 · `sem-text-header`

#### Type / Caption · `iLj5Z`

- Root — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`

#### Type / Footnote · `UouYf`

- Root — `font-primary` · `text-size-2xs` / `line-height-2xs` · 400 · `sem-text-meta`

#### Type / Pull Quote · `tGtAA`

- Root — `font-secondary` · `text-size-lg` / `line-height-lg` · 300 · italic · `sem-text-header`

#### Type / Group Label · `VpEDP`

- Root — `font-secondary` · `text-size-sm` / `line-height-sm` · 400 · italic · `sem-text-meta`

### 02 Canvas Shell

#### Canvas / Canvas · `j7rUcl`

- Root — width 1024 · gap `spacing-lg`
- Header — `Canvas / Header / Default` · Icon Button / share: hidden · Meta Row: hidden
- Rule — `Canvas / Rule / Strong`
- Slot / Modules — gap `spacing-lg`
- Slot / Modules › Module 1 — `Canvas / Template / Stat Strip`
- Slot / Modules › Hairline — `Canvas / Hairline`
- Slot / Modules › Module 2 — `Canvas / Template / Lead + Rail`
- Footer — `Canvas / Footer`

#### Canvas / Save Button

Variants: Default `FFsG5` · Hover `WGneY` · Pressed `IeRSa` · Saving `aqP8A` · Saved `WND4l` · Saved Hover `Q9jAcN` · Disabled `Cnmqt`

**Default**

- Root — Hemlock `Button/sm/outline/icon-left` · Icon: `bookmark` · Label: "Save", **Gothic A1**

**Hover**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/hover` · Icon: `bookmark` · Label: "Save", **Gothic A1**

**Pressed**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/pressed` · Icon: `bookmark` · Label: "Save", **Gothic A1**

**Saving**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/loading` · Icon: `bookmark` · Label: "Saving…", **Gothic A1**

**Saved**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/pressed` · Icon: `bookmark-check` · Label: "Saved", **Gothic A1**

**Saved Hover**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/hover` · Icon: `bookmark-minus` · Label: "Remove", **Gothic A1**

**Disabled**, differs from Default:

- Root — Hemlock `Button/sm/outline/icon-left/disabled` · Icon: `bookmark` · Label: "Save", **Gothic A1**

#### Canvas / Toast

Variants: Saved `omG7x` · Removed `EzzFp`

**Saved**

- Root — padding [`spacing-2xs`, `spacing-3xs`, `spacing-2xs`, **14**] · fill `sem-background-elevated` · border `sem-borders-dark` 1 · radius `radius-xs` · shadow y `shadow-md-y` blur `shadow-md-blur` `shadow-md-color`
- Content — gap `spacing-xs`
- Content › Icon — circle-check 16 · `sem-icons-success`
- Content › Message — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- View saved — Hemlock `Button/sm/text` · Label: "View saved", **Gothic A1**
- Sep — fill `sem-borders-muted`
- Undo — Hemlock `Button/sm/text` · Label: "Undo", **Gothic A1**

**Removed**, differs from Saved:

- Content › Icon — bookmark-x 16 · `sem-icons-meta`
- View saved — not in this variant
- Sep — not in this variant

#### Canvas / Header

Variants: Default `yPyjS` · With Media `kLpYM`

**Default**

- Root — width 1024 · gap `spacing-sm`
- Top Row › Eyebrow — `Type / Eyebrow`
- Top Row › Actions — gap `spacing-3xs`
- Top Row › Actions › Save — `Canvas / Save Button / Default`
- Top Row › Actions › Icon Button / share — Hemlock `Button/sm/text/icon-only` · Icon: `share`
- Top Row › Actions › Icon Button / ellipsis — Hemlock `Button/sm/text/icon-only` · Icon: `ellipsis`
- Title — `Type / Title`
- Deck — `Type / Deck`
- Meta Row — gap `spacing-2xs`
- Meta Row › Asked Icon — message-square 12 · `sem-icons-meta`
- Meta Row › Asked — `Type / Meta`
- Meta Row › Dot — `Type / Meta`
- Meta Row › Question Link — `Type / Meta` · fill `sem-text-body`
- Meta Row › Dot (2) — `Type / Meta`
- Meta Row › Scope — `Type / Meta`

**With Media**, differs from Default:

- Body — gap `spacing-lg`
- Body › Text Column — gap `spacing-sm`
- Body › Text Column › Title — `Type / Title`
- Body › Text Column › Deck — `Type / Deck`
- Body › Text Column › Meta Row — gap `spacing-2xs`
- Body › Text Column › Meta Row › Asked Icon — message-square 12 · `sem-icons-meta`
- Body › Text Column › Meta Row › Asked — `Type / Meta`
- Body › Text Column › Meta Row › Dot — `Type / Meta`
- Body › Text Column › Meta Row › Question Link — `Type / Meta` · fill `sem-text-body`
- Body › Text Column › Meta Row › Dot (2) — `Type / Meta`
- Body › Text Column › Meta Row › Scope — `Type / Meta`
- Body › Media Slot — fill `sem-background-subtle` · radius `radius-2xs`
- Body › Media Slot › Hint — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Title — not in this variant
- Deck — not in this variant
- Meta Row — not in this variant
- Meta Row › Asked Icon — not in this variant
- Meta Row › Asked — not in this variant
- Meta Row › Dot — not in this variant
- Meta Row › Question Link — not in this variant
- Meta Row › Dot (2) — not in this variant
- Meta Row › Scope — not in this variant

#### Canvas / Footer · `NvFIG`

- Root — width 1024 · gap `spacing-lg` · padding [`spacing-sm`, 0, 0, 0] · border `sem-borders-muted` top 1
- Footnote — `Type / Footnote`

#### Canvas / Feed Divider / Default · `LrD7m`

- Root — width 1024, height 1 · fill `sem-navDivider` · radius **99999**

### 03 Layout Templates

#### Canvas / Template

Variants: Single `ILQey` · Stat Strip `PlGIV` · Lead + Rail `oHke0` · Two-up `OyK0w` · Three-up `n6kKP` · Plan Split `GL8VJ`

**Single**

- Root — width 1024
- Slot / Content — gap `spacing-md`
- Slot / Content › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Content › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Content › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`

**Stat Strip**, differs from Single:

- Slot / Stat 1 — gap `spacing-md` · padding [0, `spacing-md`, 0, 0]
- Slot / Stat 1 › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Stat 1 › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Stat 1 › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Stat 2 — gap `spacing-md` · padding [0, `spacing-md`] · border `sem-borders-muted` left 1
- Slot / Stat 2 › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Stat 2 › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Stat 2 › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Stat 3 — gap `spacing-md` · padding [0, `spacing-md`] · border `sem-borders-muted` left 1
- Slot / Stat 3 › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Stat 3 › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Stat 3 › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Stat 4 — gap `spacing-md` · padding [0, `spacing-md`] · border `sem-borders-muted` left 1
- Slot / Stat 4 › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Stat 4 › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Stat 4 › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Content — not in this variant
- Slot / Content › Placeholder — not in this variant
- Slot / Content › Placeholder › Slot Name — not in this variant
- Slot / Content › Placeholder › Accepts — not in this variant

**Lead + Rail**, differs from Single:

- Slot / Lead — gap `spacing-md` · padding [0, `spacing-lg`, 0, 0]
- Slot / Lead › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Lead › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Lead › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Rail — gap `spacing-md` · padding [0, 0, 0, `spacing-lg`] · border `sem-borders-muted` left 1
- Slot / Rail › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Rail › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Rail › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Content — not in this variant
- Slot / Content › Placeholder — not in this variant
- Slot / Content › Placeholder › Slot Name — not in this variant
- Slot / Content › Placeholder › Accepts — not in this variant

**Two-up**, differs from Single:

- Slot / A — gap `spacing-md` · padding [0, `spacing-lg`, 0, 0]
- Slot / A › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / A › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / A › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / B — gap `spacing-md` · padding [0, 0, 0, `spacing-lg`] · border `sem-borders-muted` left 1
- Slot / B › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / B › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / B › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Content — not in this variant
- Slot / Content › Placeholder — not in this variant
- Slot / Content › Placeholder › Slot Name — not in this variant
- Slot / Content › Placeholder › Accepts — not in this variant

**Three-up**, differs from Single:

- Slot / A — gap `spacing-md` · padding [0, `spacing-md`, 0, 0]
- Slot / A › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / A › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / A › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / B — gap `spacing-md` · padding [0, `spacing-md`] · border `sem-borders-muted` left 1
- Slot / B › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / B › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / B › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / C — gap `spacing-md` · padding [0, 0, 0, `spacing-md`] · border `sem-borders-muted` left 1
- Slot / C › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / C › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / C › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Content — not in this variant
- Slot / Content › Placeholder — not in this variant
- Slot / Content › Placeholder › Slot Name — not in this variant
- Slot / Content › Placeholder › Accepts — not in this variant

**Plan Split**, differs from Single:

- Slot / Ingredients — gap `spacing-md` · padding [0, `spacing-lg`, 0, 0]
- Slot / Ingredients › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Ingredients › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Ingredients › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Steps — gap `spacing-md` · padding [0, 0, 0, `spacing-lg`] · border `sem-borders-muted` left 1
- Slot / Steps › Placeholder — gap **4** · padding `spacing-sm` · fill `sem-background-subtle` · radius `radius-2xs`
- Slot / Steps › Placeholder › Slot Name — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`
- Slot / Steps › Placeholder › Accepts — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Slot / Content — not in this variant
- Slot / Content › Placeholder — not in this variant
- Slot / Content › Placeholder › Slot Name — not in this variant
- Slot / Content › Placeholder › Accepts — not in this variant

#### Canvas / Hairline · `RsUtZ`

- Root — width 1024, height 1 · fill `sem-borders-muted`

#### Canvas / Rule / Strong · `YPMZV`

- Root — width 1024, height 2 · fill `sem-borders-strong`

### 04 Text

#### Canvas / Paragraph

Variants: Default `hudPL` · With Heading `B6jEHh`

**Default**

- Body — `Type / Body`

**With Heading**, differs from Default:

- Root — gap `spacing-xs`
- Heading — `Type / H3`

#### Canvas / List Item

Variants: Bullet `mFkFo` · Number `d9CFwF`

**Bullet**

- Root — padding [0, 0, 0, `spacing-sm`]
- Marker — padding [`spacing-4xs`, 0, 0, 0]
- Marker › Strut (sets the first-line box) — `font-primary` · `text-size-base` / `line-height-base` · 400 · no color
- Marker › Diamond — fill `sem-icons-info-strong`
- Text — `Type / Body`

**Number**, differs from Bullet:

- Root — padding [0, 0, 0, `spacing-lg`]
- Marker — `Canvas / Number Marker`
- Marker › Strut (sets the first-line box) — not in this variant
- Marker › Diamond — not in this variant

#### Canvas / List Item / Bullet

Variants: With Lead `N6Lpyg` · Nested `dFDAC`

**With Lead**

- Root — padding [0, 0, 0, `spacing-sm`]
- Marker — padding [`spacing-4xs`, 0, 0, 0]
- Marker › Strut (sets the first-line box) — `font-primary` · `text-size-base` / `line-height-base` · 400 · no color
- Marker › Diamond — fill `sem-icons-info-strong`
- Text — gap `spacing-3xs`
- Text › Lead — `font-primary` · `text-size-base` / `line-height-base` · 600 · `sem-text-header`
- Text › Body — `Type / Body`

**Nested**, differs from With Lead:

- Item — padding [0, 0, 0, `spacing-sm`]
- Item › Marker — padding [`spacing-4xs`, 0, 0, 0]
- Item › Marker › Strut (sets the first-line box) — `font-primary` · `text-size-base` / `line-height-base` · 400 · no color
- Item › Marker › Diamond (hollow) — border `sem-icons-info-strong` 1
- Item › Text — `Type / Body`
- Marker — not in this variant
- Marker › Strut (sets the first-line box) — not in this variant
- Marker › Diamond — not in this variant
- Text — not in this variant
- Text › Lead — not in this variant
- Text › Body — not in this variant

#### Canvas / List Item / Number / With Lead · `PcUIC`

- Root — padding [0, 0, 0, `spacing-lg`]
- Marker — `Canvas / Number Marker` · Number: "2"
- Text — gap `spacing-3xs`
- Text › Lead — `font-primary` · `text-size-base` / `line-height-base` · 600 · `sem-text-header`
- Text › Body — `Type / Body`

#### Canvas / Number Marker · `CKjCu`

- Root — width 24, height 24 · fill `sem-background-subtle` · radius `radius-full`
- Number — `font-secondary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`

#### Canvas / List

Variants: Bulleted `rp7Ar` · Numbered `UPoj3`

**Bulleted**

- Slot / Items — gap `spacing-xs`
- Slot / Items › Item — `Canvas / List Item / Bullet` · Text: "You raised your automatic Vanguard tran…"
- Slot / Items › Item (nested) — `Canvas / List Item / Bullet / Nested` · Text: "It now moves $6,000 on the first of eac…"
- Slot / Items › Item (2) — `Canvas / List Item / Bullet` · Text: "Your 401(k) contributions now get a 4% …"
- Slot / Items › Item (3) — `Canvas / List Item / Bullet` · Text: "August was your biggest month: $25,000 …"

**Numbered**, differs from Bulleted:

- Slot / Items › Item 1 — `Canvas / List Item / Number` · Number: "1" · Text: "Exchange $12,400 in your Fidelity 401(k…"
- Slot / Items › Item 2 — `Canvas / List Item / Number` · Number: "2" · Text: "Use $24,800 of settled cash at Vanguard…"
- Slot / Items › Item 3 — `Canvas / List Item / Number` · Number: "3" · Text: "In your Schwab Roth IRA, move $12,400 f…"
- Slot / Items › Item — not in this variant
- Slot / Items › Item (nested) — not in this variant
- Slot / Items › Item (2) — not in this variant
- Slot / Items › Item (3) — not in this variant

### 05 Numbers

#### Canvas / Stat

Variants: Default `p5zwWk` · Positive `wwcrE` · Negative `zfUx9`

**Default**

- Root — width 220 · gap `spacing-3xs`
- Label — `Type / Label`
- Stat Value — `Type / Stat Value` · fill `sem-text-header`
- Delta — Hemlock `DataValueIndicator` · indicatorText: **Gothic A1**, "▲ 12% vs. 2025"

**Positive**, differs from Default:

- Stat Value — `Type / Stat Value` · fill `sem-text-deposit`
- Body Small — `Type / Body Small` · fill `sem-text-meta`
- Delta — not in this variant

**Negative**, differs from Default:

- Stat Value — `Type / Stat Value` · fill `sem-text-error`
- Delta — Hemlock `DataValueIndicator/negative` · indicatorText: **Gothic A1**, "▼ 40% since March"

#### Canvas / Fact · `dRspi`

- Root — gap `spacing-3xs`
- Label — `Type / Label`
- Value — `font-primary` · `text-size-lg` / `line-height-lg` · 600 · `sem-text-header`

#### Canvas / Ranked Row · `G1aer3`

- Root — width 300 · padding [`spacing-xs`, 0] · border `sem-borders-muted` bottom 1
- Left — gap `spacing-xs`
- Left › Rank — fill `sem-background-subtle` · radius `radius-3xs`
- Left › Rank › Number — `font-secondary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Left › Name Col — gap `spacing-4xs`
- Left › Name Col › Name — `font-primary` · `text-size-base` / `line-height-base` · 600 · `sem-text-header`
- Left › Name Col › Meta — `Type / Meta`
- Right — gap `spacing-3xs`
- Right › Value — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-deposit`
- Right › Tag — Hemlock `Tag` · Label: **Gothic A1**, "39% of inflows"

#### Canvas / Breakdown Row · `q5l5w4`

- Root — width 300 · padding [`spacing-xs`, 0] · border `sem-borders-muted` bottom 1
- Left — gap `spacing-xs`
- Left › Name Col — gap `spacing-4xs`
- Left › Name Col › Name — `font-primary` · `text-size-base` / `line-height-base` · 600 · `sem-text-header`
- Left › Name Col › Meta — `Type / Meta`
- Right — gap `spacing-3xs`
- Right › Value — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-deposit`
- Right › Tag — Hemlock `Tag` · Label: **Gothic A1**, "49% of net"

### 06 Tables

#### Canvas / Table

Variants: Header Row `uDOjL` · Row `x6jHZo` · Row Highlight `tHRBM` · Total Row `yItVY`

**Header Row**

- Root — height 32 · border `sem-borders-strong` bottom 1
- Cell 1 — padding [0, `spacing-xs`]
- Cell 1 › Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`
- Cell 2 — padding [0, `spacing-xs`]
- Cell 2 › Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`
- Cell 3 — padding [0, `spacing-xs`]
- Cell 3 › Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`
- Cell 4 — padding [0, `spacing-xs`]
- Cell 4 › Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`
- Cell 5 — padding [0, `spacing-xs`]
- Cell 5 › Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-meta`

**Row**, differs from Header Row:

- Root — height 44 · border `sem-borders-muted` bottom 1
- Cell 1 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Cell 2 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-meta`
- Cell 3 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Cell 4 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Cell 5 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-deposit`

**Row Highlight**, differs from Header Row:

- Root — height 44 · fill `sem-background-highlight` · border `sem-borders-muted` bottom 1
- Cell 1 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Cell 2 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-body`
- Cell 3 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Cell 4 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Cell 5 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-deposit`

**Total Row**, differs from Header Row:

- Root — height 44 · border `sem-borders-strong` top 1
- Cell 1 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Cell 2 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-meta`
- Cell 3 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Cell 4 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Cell 5 › Text — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-deposit`

### 07 Charts

#### Canvas / Bar Chart

Variants: Default `NyOwi` · Single Series `ETBfC` · Mini `QPtat`

**Default**

- Root — width 368, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea — gap `spacing-sm`
- PlotArea › BarGroup ×6 — gap `spacing-3xs`
- PlotArea › BarGroup ×6 › BarsRow — gap `spacing-3xs`
- PlotArea › BarGroup ×6 › BarsRow › Bar-Income — fill `chart-categorical/color-04`
- PlotArea › BarGroup ×6 › BarsRow › Bar-Spending — fill `chart-categorical/color-07`
- PlotArea › BarGroup ×6 › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-04` · radius `radius-full`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-07` · radius `radius-full`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

**Single Series**, differs from Default:

- Root — width 368, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · radius `radius-sm`
- PlotArea › BarGroup ×6 › Bar — fill `chart-categorical/color-04`
- PlotArea › BarGroup ×6 › BarsRow — not in this variant
- PlotArea › BarGroup ×6 › BarsRow › Bar-Income — not in this variant
- PlotArea › BarGroup ×6 › BarsRow › Bar-Spending — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

**Mini**, differs from Default:

- Root — width 160, height 100 · padding `spacing-2xs` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- PlotArea — gap `spacing-3xs`
- PlotArea › Bar1 — fill `chart-categorical/color-04`
- PlotArea › Bar2 — fill `chart-categorical/color-04`
- PlotArea › Bar3 — fill `chart-categorical/color-04`
- PlotArea › Bar4 — fill `chart-categorical/color-04`
- PlotArea › Bar5 — fill `chart-categorical/color-04`
- PlotArea › Bar6 — fill `chart-categorical/color-04`
- PlotArea › Bar7 — fill `chart-categorical/color-04`
- PlotArea › Bar8 — fill `chart-categorical/color-04`
- Title — not in this variant
- PlotArea › BarGroup ×6 — not in this variant
- PlotArea › BarGroup ×6 › BarsRow — not in this variant
- PlotArea › BarGroup ×6 › BarsRow › Bar-Income — not in this variant
- PlotArea › BarGroup ×6 › BarsRow › Bar-Spending — not in this variant
- PlotArea › BarGroup ×6 › Label — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

#### Canvas / Bar Chart / Default / Hover · `w7hS1x`

- Root — width 368, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea — gap `spacing-sm`
- PlotArea › BarGroup ×3 — gap `spacing-3xs` · opacity 0.3
- PlotArea › BarGroup ×3 › BarsRow — gap `spacing-3xs`
- PlotArea › BarGroup ×3 › BarsRow › Bar-Income — fill `chart-categorical/color-04`
- PlotArea › BarGroup ×3 › BarsRow › Bar-Spending — fill `chart-categorical/color-07`
- PlotArea › BarGroup ×3 › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarGroup — gap `spacing-3xs`
- PlotArea › BarGroup › BarsRow — gap `spacing-3xs`
- PlotArea › BarGroup › BarsRow › Bar-Income — fill `chart-categorical/color-04`
- PlotArea › BarGroup › BarsRow › Bar-Spending — fill `chart-categorical/color-07`
- PlotArea › BarGroup › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarGroup ×2 — gap `spacing-3xs` · opacity 0.3
- PlotArea › BarGroup ×2 › BarsRow — gap `spacing-3xs`
- PlotArea › BarGroup ×2 › BarsRow › Bar-Income — fill `chart-categorical/color-04`
- PlotArea › BarGroup ×2 › BarsRow › Bar-Spending — fill `chart-categorical/color-07`
- PlotArea › BarGroup ×2 › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- PlotArea › ChartTooltip › ttValueRow (2) — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow (2) › ttMarker — fill `chart-categorical/color-07`
- PlotArea › ChartTooltip › ttValueRow (2) › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow (2) › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-04` · radius `radius-full`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-07` · radius `radius-full`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

#### Canvas / Bar Chart / Single Series / Hover · `d9j7rQ`

- Root — width 368, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea — gap `spacing-sm`
- PlotArea › BarGroup ×3 — gap `spacing-3xs`
- PlotArea › BarGroup ×3 › Bar — fill `chart-categorical/color-04` · opacity 0.3
- PlotArea › BarGroup ×3 › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarGroup — gap `spacing-3xs`
- PlotArea › BarGroup › Bar — fill `chart-categorical/color-04`
- PlotArea › BarGroup › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarGroup ×2 — gap `spacing-3xs`
- PlotArea › BarGroup ×2 › Bar — fill `chart-categorical/color-04` · opacity 0.3
- PlotArea › BarGroup ×2 › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`

#### Canvas / Line Chart

Variants: Default `LxQsD` · Single Series `Nn2no` · Mini `O5i8Jx`

**Default**

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › GridLine1 — border `sem-borders-light` 1
- PlotArea › GridLine2 — border `sem-borders-light` 1
- PlotArea › GridLine3 — border `sem-borders-light` 1
- PlotArea › GridLine4 — border `sem-borders-light` 1
- PlotArea › GridLine5 — border `sem-borders-light` 1
- PlotArea › Line-Benchmark — border `chart-categorical/color-04` 2
- PlotArea › Line-Portfolio — border `chart-categorical/color-09` 2
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-09`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-04`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

**Single Series**, differs from Default:

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · radius `radius-sm`
- PlotArea › Line — border `chart-categorical/color-09` 2
- PlotArea › Line-Benchmark — not in this variant
- PlotArea › Line-Portfolio — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

**Mini**, differs from Default:

- Root — width 160, height 100 · padding `spacing-2xs` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- PlotArea › Line — border `chart-categorical/color-09` 2
- Title — not in this variant
- PlotArea › GridLine1 — not in this variant
- PlotArea › GridLine2 — not in this variant
- PlotArea › GridLine3 — not in this variant
- PlotArea › GridLine4 — not in this variant
- PlotArea › GridLine5 — not in this variant
- PlotArea › Line-Benchmark — not in this variant
- PlotArea › Line-Portfolio — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

#### Canvas / Line Chart / Default / Hover · `ElSij`

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › GridLine1 — border `sem-borders-light` 1
- PlotArea › GridLine2 — border `sem-borders-light` 1
- PlotArea › GridLine3 — border `sem-borders-light` 1
- PlotArea › GridLine4 — border `sem-borders-light` 1
- PlotArea › GridLine5 — border `sem-borders-light` 1
- PlotArea › Line-Benchmark — border `chart-categorical/color-04` 2
- PlotArea › Line-Portfolio — border `chart-categorical/color-09` 2
- PlotArea › Scrubber — border `sem-text-meta` 1
- PlotArea › ScrubDot-Portfolio — fill `chart-categorical/color-09`
- PlotArea › ScrubDot-Benchmark — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-09`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- PlotArea › ChartTooltip › ttValueRow (2) — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow (2) › ttMarker — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip › ttValueRow (2) › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow (2) › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-09`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-04`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

#### Canvas / Line Chart / Single Series / Hover · `mJtk2`

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › GridLine1 — border `sem-borders-light` 1
- PlotArea › GridLine2 — border `sem-borders-light` 1
- PlotArea › GridLine3 — border `sem-borders-light` 1
- PlotArea › GridLine4 — border `sem-borders-light` 1
- PlotArea › GridLine5 — border `sem-borders-light` 1
- PlotArea › Line — border `chart-categorical/color-09` 2
- PlotArea › Scrubber — border `sem-text-meta` 1
- PlotArea › ScrubDot — fill `chart-categorical/color-09`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`

#### Canvas / Area Chart

Variants: Default `AvuH5` · Single Series `TDDT9` · Mini `Rhfmz`

**Default**

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › Area-Liabilities — fill linear gradient `chart-categorical/color-04` → `chart-area-fade` (local)
- PlotArea › Area-Assets — fill linear gradient `chart-categorical/color-07` → `chart-area-fade` (local)
- PlotArea › Line-Assets — border `chart-categorical/color-07` 2
- PlotArea › Line-Liabilities — border `chart-categorical/color-04` 2
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-07` · radius `radius-full`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-04` · radius `radius-full`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

**Single Series**, differs from Default:

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · radius `radius-sm`
- PlotArea › Area — fill linear gradient `chart-categorical/color-07` → `chart-area-fade` (local)
- PlotArea › Line — border `chart-categorical/color-07` 2
- PlotArea › Area-Liabilities — not in this variant
- PlotArea › Area-Assets — not in this variant
- PlotArea › Line-Assets — not in this variant
- PlotArea › Line-Liabilities — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

**Mini**, differs from Default:

- Root — width 160, height 100 · padding `spacing-2xs` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- PlotArea › Area — fill linear gradient `chart-categorical/color-07` → `chart-area-fade` (local)
- PlotArea › Line — border `chart-categorical/color-07` 2
- Title — not in this variant
- PlotArea › Area-Liabilities — not in this variant
- PlotArea › Area-Assets — not in this variant
- PlotArea › Line-Assets — not in this variant
- PlotArea › Line-Liabilities — not in this variant
- Legend — not in this variant
- Legend › LegendItem — not in this variant
- Legend › LegendItem › Swatch — not in this variant
- Legend › LegendItem › Label — not in this variant
- Legend › LegendItem (2) — not in this variant
- Legend › LegendItem (2) › Swatch — not in this variant
- Legend › LegendItem (2) › Label — not in this variant

#### Canvas / Area Chart / Default / Hover · `E3cL6X`

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › Area-Liabilities — fill linear gradient `chart-categorical/color-04` → `chart-area-fade` (local)
- PlotArea › Area-Assets — fill linear gradient `chart-categorical/color-07` → `chart-area-fade` (local)
- PlotArea › Line-Assets — border `chart-categorical/color-07` 2
- PlotArea › Line-Liabilities — border `chart-categorical/color-04` 2
- PlotArea › Scrubber — border `sem-text-meta` 1
- PlotArea › ScrubDot-Assets — fill `chart-categorical/color-07`
- PlotArea › ScrubDot-Liabilities — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-07`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- PlotArea › ChartTooltip › ttValueRow (2) — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow (2) › ttMarker — fill `chart-categorical/color-04`
- PlotArea › ChartTooltip › ttValueRow (2) › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow (2) › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- Legend — gap `spacing-sm`
- Legend › LegendItem — gap `spacing-2xs`
- Legend › LegendItem › Swatch — fill `chart-categorical/color-07` · radius `radius-full`
- Legend › LegendItem › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- Legend › LegendItem (2) — gap `spacing-2xs`
- Legend › LegendItem (2) › Swatch — fill `chart-categorical/color-04` · radius `radius-full`
- Legend › LegendItem (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`

#### Canvas / Area Chart / Single Series / Hover · `xcG2q`

- Root — width 360 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea › Area — fill linear gradient `chart-categorical/color-07` → `chart-area-fade` (local)
- PlotArea › Line — border `chart-categorical/color-07` 2
- PlotArea › Scrubber — border `sem-text-meta` 1
- PlotArea › ScrubDot — fill `chart-categorical/color-07`
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-07`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`

#### Canvas / Chart Frame · `I1GZ91`

- Root — width 760 · gap `spacing-xs`
- Chart Header — gap `spacing-md`
- Chart Header › Label — `Type / Label` · fill `sem-text-header`
- Slot / Plot › Gridline ×3 — fill `sem-borders-dark`
- Slot / Plot › Area — fill linear gradient `chart-categorical/color-01` → **#00000000** · opacity 0.25
- Slot / Plot › Line — fill **#00000000** · border `chart-categorical/color-01` 2.5
- Slot / Plot › Baseline — fill `sem-borders-strong`
- Axis — padding [0, **6**]
- Axis › Meta ×6 — `Type / Meta`
- Legend — gap `spacing-sm`
- Legend › Canvas / Legend Item / Line — gap **6**
- Legend › Canvas / Legend Item / Line › Swatch — fill `chart-categorical/color-01` · radius **2**
- Legend › Canvas / Legend Item / Line › Meta — `Type / Meta`
- Legend › Canvas / Legend Item / Swatch — gap **6**
- Legend › Canvas / Legend Item / Swatch › Swatch — fill `chart-categorical/color-02` · radius `radius-full`
- Legend › Canvas / Legend Item / Swatch › Meta — `Type / Meta`
- Caption — `Type / Caption`

#### Canvas / Legend Item

Variants: Line `OJ54r` · Swatch `Jj1Oq`

**Line**

- Root — gap **6**
- Swatch — fill `chart-categorical/color-01` · radius **2**
- Meta — `Type / Meta`

**Swatch**, differs from Line:

- Swatch — fill `chart-categorical/color-02` · radius `radius-full`

#### Canvas / Horizontal Bar Chart

Variants: Horizontal Bar Chart `v6rhh` · Hover `T702P0`

**Horizontal Bar Chart**

- Root — width 460 · gap `spacing-sm`
- Title — `Type / Label` · fill `sem-text-header`
- Row 1 — gap `spacing-xs`
- Row 1 › Label — `Type / Label`
- Row 1 › Bar — gap **2** · radius `radius-3xs`
- Row 1 › Bar › Segment — padding [0, 0, 0, **8**] · fill `chart-categorical/color-01`
- Row 1 › Bar › Segment › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 1 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04`
- Row 1 › Bar › Segment (2) › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 1 › Bar › Segment (3) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-08`
- Row 1 › Bar › Segment (3) › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 1 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13`
- Row 1 › Bar › Segment (4) › Value — off
- Row 2 — gap `spacing-xs`
- Row 2 › Label — `Type / Label`
- Row 2 › Bar — gap **2** · radius `radius-3xs`
- Row 2 › Bar › Segment — padding [0, 0, 0, **8**] · fill `chart-categorical/color-01`
- Row 2 › Bar › Segment › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 2 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04`
- Row 2 › Bar › Segment (2) › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 2 › Bar › Segment (3) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-08`
- Row 2 › Bar › Segment (3) › Value — off
- Row 2 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13`
- Row 2 › Bar › Segment (4) › Value — off
- Row 3 — gap `spacing-xs`
- Row 3 › Label — `Type / Label`
- Row 3 › Bar — gap **2** · radius `radius-3xs`
- Row 3 › Bar › Segment — padding [0, 0, 0, **8**] · fill `chart-categorical/color-01`
- Row 3 › Bar › Segment › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 3 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04`
- Row 3 › Bar › Segment (2) › Value — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `prim-base-black`
- Row 3 › Bar › Segment (3) — padding [0, 0, 0, **4**] · fill `chart-categorical/color-08`
- Row 3 › Bar › Segment (3) › Value — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · `prim-base-black`
- Row 3 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13`
- Row 3 › Bar › Segment (4) › Value — off
- Legend — gap `spacing-md` · padding [**4**, 0, 0, **104**]
- Legend › Legend Stocks — `Canvas / Legend Item / Swatch` · Swatch: `chart-categorical/color-01` · Meta: "Stocks"
- Legend › Legend Bonds — `Canvas / Legend Item / Swatch` · Swatch: `chart-categorical/color-04` · Meta: "Bonds"
- Legend › Legend Cash — `Canvas / Legend Item / Swatch` · Swatch: `chart-categorical/color-08` · Meta: "Cash"
- Legend › Legend Other — `Canvas / Legend Item / Swatch` · Swatch: `chart-categorical/color-13` · Meta: "Other"

**Hover**, differs from Horizontal Bar Chart:

- Row 1 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04` · opacity 0.3
- Row 1 › Bar › Segment (3) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-08` · opacity 0.3
- Row 1 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13` · opacity 0.3
- Row 2 › Bar › Segment — padding [0, 0, 0, **8**] · fill `chart-categorical/color-01` · opacity 0.3
- Row 2 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04` · opacity 0.3
- Row 2 › Bar › Segment (3) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-08` · opacity 0.3
- Row 2 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13` · opacity 0.3
- Row 3 › Bar › Segment — padding [0, 0, 0, **8**] · fill `chart-categorical/color-01` · opacity 0.3
- Row 3 › Bar › Segment (2) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-04` · opacity 0.3
- Row 3 › Bar › Segment (3) — padding [0, 0, 0, **4**] · fill `chart-categorical/color-08` · opacity 0.3
- Row 3 › Bar › Segment (4) — padding [0, 0, 0, **8**] · fill `chart-categorical/color-13` · opacity 0.3
- ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- ChartTooltip › ttValueRow — gap `spacing-2xs`
- ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-01`
- ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`

#### Canvas / Horizontal Bar Chart / Ranked

Variants: Default `WenOV` · Hover `I0BwEc`

**Default**

- Root — width 360, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · radius `radius-sm`
- Title — `Type / Label` · fill `sem-text-header`
- PlotArea — gap `spacing-2xs`
- PlotArea › BarRow — gap `spacing-2xs`
- PlotArea › BarRow › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarRow › Bar — fill `chart-categorical/color-01`
- PlotArea › BarRow (2) — gap `spacing-2xs`
- PlotArea › BarRow (2) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarRow (2) › Bar — fill `chart-categorical/color-13`
- PlotArea › BarRow (3) — gap `spacing-2xs`
- PlotArea › BarRow (3) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarRow (3) › Bar — fill `chart-categorical/color-07`
- PlotArea › BarRow (4) — gap `spacing-2xs`
- PlotArea › BarRow (4) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarRow (4) › Bar — fill `chart-categorical/color-09`
- PlotArea › BarRow (5) — gap `spacing-2xs`
- PlotArea › BarRow (5) › Label — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-meta`
- PlotArea › BarRow (5) › Bar — fill `chart-categorical/color-15`

**Hover**, differs from Default:

- Root — width 360, height 266 · gap `spacing-sm` · padding `spacing-md` · fill `sem-background-main` · border `sem-borders-light` · radius `radius-sm`
- PlotArea › BarRow (2) › Bar — fill `chart-categorical/color-13` · opacity 0.3
- PlotArea › BarRow (3) › Bar — fill `chart-categorical/color-07` · opacity 0.3
- PlotArea › BarRow (4) › Bar — fill `chart-categorical/color-09` · opacity 0.3
- PlotArea › BarRow (5) › Bar — fill `chart-categorical/color-15` · opacity 0.3
- PlotArea › ChartTooltip — gap `spacing-3xs` · padding [`spacing-2xs`, `spacing-xs`] · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-2xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- PlotArea › ChartTooltip › ttHeader — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-meta`
- PlotArea › ChartTooltip › ttValueRow — gap `spacing-2xs`
- PlotArea › ChartTooltip › ttValueRow › ttMarker — fill `chart-categorical/color-01`
- PlotArea › ChartTooltip › ttValueRow › ttLabel — `font-primary` · `text-size-xs` / **1.333** · 400 · `sem-text-body`
- PlotArea › ChartTooltip › ttValueRow › ttValue — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`

#### Canvas / Heatmap Chart

Variants: Default `jN09Z` · Positive-Negative `fPkqY`

**Default**

- Root — width 520
- component/Card — gap `spacing-sm` · padding `spacing-md` · fill `sem-background-elevated` · border `sem-borders-light` 1 · radius `radius-sm`
- component/Card › chartContent — gap `spacing-sm`
- component/Card › chartContent › cellGrid — gap `spacing-xs`
- component/Card › chartContent › cellGrid › Tech — gap `spacing-2xs` · padding `spacing-sm` · fill `chart-sequential/seq-600` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Tech › text — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-reverse`
- component/Card › chartContent › cellGrid › Tech › text (2) — `font-primary` · `text-size-sm` / **1.429** · 600 · `sem-text-reverse`
- component/Card › chartContent › cellGrid › Health — gap `spacing-2xs` · padding `spacing-sm` · fill `chart-sequential/seq-400` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Health › text — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- component/Card › chartContent › cellGrid › Health › text (2) — `font-primary` · `text-size-sm` / **1.429** · 600 · `sem-text-header`
- component/Card › chartContent › cellGrid › Finance — gap `spacing-2xs` · padding `spacing-sm` · fill `chart-sequential/seq-200` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Finance › text — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- component/Card › chartContent › cellGrid › Finance › text (2) — `font-primary` · `text-size-sm` / **1.429** · 600 · `sem-text-header`
- component/Card › chartContent › cellGrid › Energy — gap `spacing-2xs` · padding `spacing-sm` · fill `chart-sequential/seq-100` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Energy › text — `font-primary` · `text-size-xs` / **1.333** · 600 · `sem-text-header`
- component/Card › chartContent › cellGrid › Energy › text (2) — `font-primary` · `text-size-sm` / **1.429** · 600 · `sem-text-header`
- component/Card › chartContent › CardHeader — gap `spacing-3xs`
- component/Card › chartContent › CardHeader › Title — `font-primary` · `text-size-md` / **1.556** · 600 · `sem-text-header`
- component/Card › chartContent › CardHeader › Description — `font-primary` · `text-size-base` / **1.5** · 400 · `sem-text-meta`

**Positive-Negative**, differs from Default:

- component/Card › chartContent › cellGrid › Tech — gap `spacing-2xs` · padding `spacing-sm` · fill `sem-background-success-bold` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Health — gap `spacing-2xs` · padding `spacing-sm` · fill `sem-background-success-strong` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Finance — gap `spacing-2xs` · padding `spacing-sm` · fill `sem-background-success-soft` · radius `radius-xs`
- component/Card › chartContent › cellGrid › Energy — gap `spacing-2xs` · padding `spacing-sm` · fill `sem-background-error-strong` · radius `radius-xs`

#### Canvas / Chart Annotation · `rtLLf`

- Root — gap **4**
- Meta — `Type / Meta` · fill `sem-text-body`
- Tick — fill `sem-borders-strong`
- Point — fill `sem-background-main` · border `sem-text-header` 2

#### Canvas / Value Label · `oXXQd`

- Value — `font-primary` · `text-size-md` / `line-height-md` · 600 · `sem-text-deposit`
- Meta — `Type / Meta`

#### Canvas / Target Bar · `qosSb`

- Root — width 300 · gap `spacing-2xs`
- Track › Track Bg — fill `sem-background-subtle` · radius `radius-full`
- Track › Fill — fill `chart-categorical/color-01` · radius `radius-full`
- Track › Target — fill `sem-text-header`
- Labels › Meta — `Type / Meta` · fill `sem-text-header`
- Labels › Meta (2) — `Type / Meta`

### 08 Editorial

#### Canvas / Pull Quote · `YwMu2`

- Root — width 420 · padding [**4**, 0, **4**, `spacing-md`] · border `sem-borders-strong` left 2
- Pull Quote — `Type / Pull Quote`

#### Canvas / Takeaway

Variants: Takeaway `y3LxQD` · Mobile `F5OBoV` · No Icon `hRwXI`

**Takeaway**

- Root — width 420 · gap `spacing-sm`
- Icon Col — padding [`spacing-4xs`, 0]
- Icon Col › Icon — target 24 · `sem-icons-info-strong`
- Text — `Canvas / Takeaway / No Icon`

**Mobile**, differs from Takeaway:

- Root — width 345 · gap `spacing-xs`
- Icon Col — padding [`spacing-3xs`, 0]
- Icon Col › Icon — target 20 · `sem-icons-info-strong`
- Takeaway — `Canvas / Takeaway / No Icon / Mobile`
- Text — not in this variant

**No Icon**, differs from Takeaway:

- Root — width 420 · gap `spacing-3xs`
- Lead — `font-primary` · `text-size-lg` / `line-height-lg` · 600 · `sem-text-header`
- Body — `Type / Body`
- Icon Col — not in this variant
- Icon Col › Icon — not in this variant
- Text — not in this variant

#### Canvas / Tip · `Y25lV`

- Root — width 420 · gap `spacing-sm` · padding `spacing-sm` · fill `sem-background-info` · border `sem-borders-info` 1 · radius `radius-2xs`
- Icon — lightbulb 16 · `sem-icons-info-strong`
- Text — gap `spacing-3xs`
- Text › Label — `Type / Label` · fill `sem-text-info-title`
- Text › Body Small — `Type / Body Small`

#### Canvas / Text Link

Variants: Default `UzFW3` · External `q6i5a0`

**Default**

- Root — gap **6**
- Label — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-action`
- Arrow — arrow-right 14 · `sem-icons-action`

**External**, differs from Default:

- Arrow — arrow-up-right 14 · `sem-icons-action`

#### Canvas / Takeaway / No Icon / Mobile · `Wvrxk`

- Root — width 345 · gap `spacing-3xs`
- Lead — `font-primary` · `text-size-md` / `line-height-md` · 600 · `sem-text-header`
- Body — `Type / Body`

### 09 Controls

#### Canvas / Toggle Row

Variants: On `K7zV9` · Off `E7JWWg`

**On**

- Root — gap `spacing-xs` · padding [`spacing-2xs`, `spacing-sm`, `spacing-2xs`, `spacing-2xs`] · border `sem-borders-muted` 1 · radius `radius-xs`
- Toggle — Hemlock `ToggleSwitch/on` · padding `spacing-4xs` · fill `sem-borders-action` · Thumb: width 20, height 20, `sem-toggleKnob`, effect
- Text › Label — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Text › Meta — `Type / Meta`

**Off**, an instance of On:

- Toggle: `sem-borders-strong`, justifyContent start

#### Canvas / Stepper · `FBHpW`

- Root — width 280 · gap `spacing-2xs` · padding [`spacing-xs`, `spacing-xs`, `spacing-xs`, `spacing-sm`] · border `sem-borders-muted` 1 · radius `radius-2xs`
- Text — gap **2**
- Text › Label — `Type / Label`
- Text › Meta — `Type / Meta`
- Controls — gap `spacing-2xs`
- Controls › Decrease — Hemlock `Button/sm/outline/icon-only` · Icon: `minus`
- Controls › Value — `font-primary` · `text-size-lg` / `line-height-lg` · 600 · `sem-text-header`
- Controls › Increase — Hemlock `Button/sm/outline/icon-only` · Icon: `plus`

#### Canvas / Line Item · `H38cA`

- Root — width 280 · gap `spacing-xs`
- Amount — `font-primary` · `text-size-sm` / `line-height-sm` · 700 · `sem-text-header`
- Item — gap **2**
- Item › Name — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Item › Meta — `Type / Meta`

#### Q&A / Answer / Amount Slider · `u0hk6h`

- Root — gap `spacing-xs`
- Value Row — gap `spacing-sm`
- Value Row › Label — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-body`
- Value Row › Value — `font-primary` · `text-size-base` / `line-height-base` · 600 · `sem-text-strong`
- Slider — Hemlock `Slider` · Track: width fill_container · Fill: layoutPosition absolute, width 244 · Thumb: layoutPosition absolute, x 234

### 10 Chat ↔ Canvas

#### Chat / Canvas Chip

Variants: Default `e3X8mE` · Hover `h2aMqM` · Pressed `zoN4E` · Active `keFmQ`

**Default**

- Root — height 28 · gap `spacing-3xs` · padding [0, `spacing-xs`] · fill `sem-btnPrimaryInvertedBg` · border `sem-btnPrimaryInvertedBorder` 1 · radius `radius-full`
- Arrow — arrow-left 16 · `sem-btnPrimaryInvertedText`
- Label — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · tracking 1 · `sem-btnPrimaryInvertedText`
- Type Icon — off

**Hover**, an instance of Default:

- fill `sem-btnPrimaryInvertedBgHover` · border `sem-btnPrimaryInvertedBorderHover` · Arrow: `sem-btnPrimaryInvertedTextHover` · Label: `sem-btnPrimaryInvertedTextHover` · Type Icon: `sem-btnPrimaryInvertedTextHover`

**Pressed**, an instance of Default:

- fill `sem-btnPrimaryInvertedBgActive` · border `sem-btnPrimaryInvertedBorderActive` · Arrow: `sem-btnPrimaryInvertedTextActive` · Label: `sem-btnPrimaryInvertedTextActive` · Type Icon: `sem-btnPrimaryInvertedTextActive`

**Active**, an instance of Pressed:

- no overrides

## Canvas Design Library

Board `KNbgW`.

### 03 Saved View & Loading

#### Canvas / Snapshot Bar

Variants: Snapshot `BdZXA` · Live `FpdFq`

**Snapshot**

- Root — width 1024 · gap `spacing-xs` · padding [`spacing-2xs`, `spacing-2xs`, `spacing-2xs`, `spacing-sm`] · fill `sem-background-surface` · radius `radius-2xs`
- Icon — history 16 · `sem-icons-meta`
- Message — `Type / Body Small`
- Action — Hemlock `Button/sm/secondary/icon-left` · Icon: `refresh-cw` · Label: "Refresh with today’s data", **Gothic A1**

**Live**, differs from Snapshot:

- Icon — circle-check 16 · `sem-icons-success`
- Action — Hemlock `Button/sm/secondary` · Label: "Update saved copy", **Gothic A1**

#### Canvas / Skeleton · `lnmmP`

- Root — width 1024 · gap `spacing-sm`
- Top Row › Status — gap `spacing-2xs`
- Top Row › Status › Spinner — loader-circle 14 · `sem-icons-action`
- Top Row › Status › Status Text — `Type / Meta`
- Top Row › Save — `Canvas / Save Button / Disabled`
- Bar ×4 — fill `sem-background-subtle` · radius `radius-3xs`
- Blocks — gap `spacing-lg` · padding [`spacing-sm`, 0, 0, 0]
- Blocks › Block ×3 — fill `sem-background-subtle` · radius `radius-2xs`

#### Saved / Tile

Variants: Default `cgBBF` · Hover `z4kDd`

**Default**

- Root — width 488 · gap `spacing-xs` · padding **20** · fill `sem-background-elevated` · border `sem-borders-dark` 1 · radius `radius-xs`
- Top Row › Type — `Type / Eyebrow` · fill `sem-text-meta`
- Top Row › Saved Date — `Type / Meta`
- Title — `Type / H3`
- Question — `Type / Meta`
- Preview — gap `spacing-md` · padding [`spacing-xs`, 0] · border `sem-borders-muted` top 1 bottom 1
- Preview › Stat — gap **2**
- Preview › Stat › Label — `Type / Label`
- Preview › Stat › Value — `Type / Stat Value` · size `text-size-xl` · line height `line-height-xl` · fill `sem-text-header`
- Preview › Sparkline — fill **#00000000** · border `chart-categorical/color-01` 2
- Bottom Row › Freshness › As Of — `Type / Meta`
- Bottom Row › Freshness › Refresh — Hemlock `Button/sm/text` · Label: "Refresh", **Gothic A1**
- Bottom Row › Actions — gap `spacing-3xs` · opacity 0
- Bottom Row › Actions › Icon Button / layout-dashboard — Hemlock `Button/sm/text/icon-only` · Icon: `layout-dashboard`
- Bottom Row › Actions › Icon Button / share — Hemlock `Button/sm/text/icon-only` · Icon: `share`
- Bottom Row › Actions › Icon Button / bookmark-minus — Hemlock `Button/sm/text/icon-only` · Icon: `bookmark-minus`

**Hover**, differs from Default:

- Root — width 488 · gap `spacing-xs` · padding **20** · fill `sem-background-hover` · border `sem-borders-strong` 1 · radius `radius-xs`
- Bottom Row › Actions — gap `spacing-3xs`

### 04 More Blocks

#### Canvas / Icon Tile · `GcLeb`

- Root — width 48, height 48 · fill `sem-background-highlight` · radius `radius-full`
- Icon — sprout 22 · `sem-icons-full`

#### Canvas / Media Slot

Variants: Icon `NruGw` · Illustration `tvXy4`

**Icon**

- Root — width 300, height 150 · fill `sem-background-subtle` · radius `radius-2xs`
- Icon Tile — `Canvas / Icon Tile`

**Illustration**, differs from Icon:

- Slot / Illustration › Placeholder — image 28 · `sem-icons-subtle`
- Icon Tile — not in this variant

#### Canvas / Teaser Card · `wqRVF`

- Root — width 300 · gap `spacing-xs`
- Media — `Canvas / Media Slot / Icon`
- Eyebrow — `Type / Eyebrow`
- H3 — `Type / H3`
- Body Small — `Type / Body Small`
- Card Meta › Time — gap **4**
- Card Meta › Time › Icon — timer 12 · `sem-icons-meta`
- Card Meta › Time › Meta — `Type / Meta`
- Card Meta › Tag — Hemlock `Tag` · Label: **Gothic A1**, "Easy"
- Link — `Canvas / Text Link / Default` · Label: "Start plan"

#### Canvas / Plan Check Item · `IPnje`

- Root — gap **6**
- Icon — circle-check 14 · `sem-icons-success`
- Label — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`

#### Canvas / Entity Chip · `gl2qI`

- Root — gap **4** · padding [**2**, **8**, **2**, **6**] · fill `sem-background-subtle` · radius `radius-full`
- Icon — landmark 11 · `sem-icons-meta`
- Label — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-header`

#### Canvas / Progress · `J953y`

- Root — gap **4** · padding [0, 0, `spacing-xs`, 0]
- Segment 1 — fill `sem-progressFill` · radius `radius-full`
- Segment 2 — fill `sem-background-subtle` · radius `radius-full`
- Segment 3 — fill `sem-background-subtle` · radius `radius-full`
- Segment 4 — fill `sem-background-subtle` · radius `radius-full`

#### Canvas / Plan Step

Variants: Done `PGL7N` · Active `Y50jpq` · Upcoming `UxGNd`

**Done**

- Root — gap `spacing-sm` · padding `spacing-sm` · fill **#00000000** · border **#00000000** · radius `radius-2xs`
- Checkbox — Hemlock `Checkbox/checked` · LabelColumn: hidden · Label: **Gothic A1** · Helper: **Gothic A1**
- Content — gap `spacing-2xs`
- Content › Top — gap `spacing-xs`
- Content › Top › Label — `Type / Label` · font `font-primary` · fill `sem-text-meta`
- Content › Top › Tag — Hemlock `Tag` · Label: `font-primary`, "Done"
- Content › Body — `Type / Body` · font `font-primary` · fill `sem-text-meta`
- Content › Meta Row — gap `spacing-sm`
- Content › Meta Row › Account — `Canvas / Entity Chip` · Label: "Fidelity 401(k)", `font-primary`
- Content › Meta Row › Meta — `Type / Meta` · font `font-primary`

**Active**, differs from Done:

- Root — gap `spacing-sm` · padding `spacing-sm` · border `sem-borders-action` left 2 · radius `radius-none`
- Checkbox — Hemlock `Checkbox/no-label`
- Content › Top › Label — `Type / Label` · fill `sem-text-header`
- Content › Top › Tag — Hemlock `Tag` · Label: **Gothic A1**, "Up next"
- Content › Body — `Type / Body` · fill `sem-text-body`
- Content › Meta Row › Account — `Canvas / Entity Chip` · Label: "Vanguard brokerage"
- Content › Meta Row › Open — `Canvas / Text Link / External` · Label: "Open Vanguard"
- Content › Meta Row › Meta — not in this variant

**Upcoming**, differs from Done:

- Checkbox — Hemlock `Checkbox/no-label`
- Content › Top › Label — `Type / Label` · fill `sem-text-meta`
- Content › Body — `Type / Body` · fill `sem-text-body`
- Content › Meta Row › Account — `Canvas / Entity Chip` · Label: "Schwab Roth IRA"
- Content › Meta Row › Open — `Canvas / Text Link / External` · Label: "Open Schwab"
- Content › Top › Tag — not in this variant
- Content › Meta Row › Meta — not in this variant

#### Canvas / Timeline Item

Variants: Active `IJrnY` · Upcoming `l66yVy`

**Active**

- Root — gap `spacing-sm`
- Rail — gap **4** · padding [**3**, 0, 0, 0]
- Rail › Dot — fill `sem-background-action` · border `sem-background-action` 2
- Rail › Connector — fill `sem-navDivider`
- Text — gap **2** · padding [0, 0, `spacing-xs`, 0]
- Text › Label — `Type / Label` · fill `sem-text-header`
- Text › Body Small — `Type / Body Small`

**Upcoming**, differs from Active:

- Rail › Dot — fill `sem-background-main` · border `sem-borders-strong` 2
- Rail › Connector — off
- Text › Label — `Type / Label` · fill `sem-text-meta`

#### Canvas / Note Input · `N2ThpG`

- Root — height 84 · padding `spacing-xs` · fill `sem-chatInputBg` · border `sem-chatInputBorder` 1 · radius `radius-2xs`
- Placeholder — `font-secondary` · `text-size-sm` / `line-height-sm` · 400 · italic · `sem-text-placeholder`

#### Canvas / Saved Note · `Q0Whet`

- Root — gap **4** · padding `spacing-xs` · fill `sem-background-elevated` · radius `radius-2xs`
- Label — `Type / Label`
- Body Small — `Type / Body Small`

## Nav / Conversations — Components

Board `gnGT8`.

### Conversation Item · 6 states

#### Nav / Conversation Item

Variants: Default `tZj2h` · Hover `lBP3t` · Active `Pwd5S` · Menu Open `nDdgS` · Renaming `xJ348` · Dragging `pcWGL`

**Default**

- Root — padding [0, `spacing-4xs`, 0, `spacing-3xs`] · radius `radius-3xs`
- Handle Slot › Grip — off
- Title Wrap — padding [`spacing-2xs`, `spacing-3xs`, `spacing-2xs`, `spacing-2xs`]
- Title Wrap › Title — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-navTextSecondary`
- More — Hemlock `Button/sm/text/icon-only` · opacity 0 · Icon: `ellipsis-vertical`

**Hover**, an instance of Default:

- fill `sem-navHoverBg` · Grip: shown · Title: "Lifetime plan", `sem-navHoverText` · More: opacity 1

**Active**, an instance of Default:

- fill `sem-navActiveBg` · Title: "Investments this year", `sem-navTextPrimary`, fontWeight 600 · More: opacity 1

**Menu Open**, an instance of Default:

- fill `sem-navHoverBg` · Title: "Retirement accounts", `sem-navHoverText` · More: replaced

**Renaming**, differs from Default:

- Root — height 36 · padding [0, `spacing-xs`, 0, `spacing-md`] · fill `sem-background-surface` · border `sem-borders-focus` 2 · radius `radius-3xs`
- Selection — fill `sem-background-highlight`
- Selection › Value — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Handle Slot › Grip — not in this variant
- Title Wrap — not in this variant
- Title Wrap › Title — not in this variant
- More — not in this variant

**Dragging**, an instance of Default:

- fill `sem-background-elevated` · border `sem-borders-dark` 1 · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color` · Grip: shown · Title: "Lifetime plan", `sem-navTextPrimary`

### Conversation Menu

#### Nav / Menu Item

Variants: Default `aM8rd` · Hover `P4z9l` · Destructive `vQNxQ`

**Default**

- Root — width 168 · gap `spacing-2xs` · padding [`spacing-2xs`, `spacing-xs`] · radius `radius-3xs`
- Icon — pencil 16 · `sem-icons-full`
- Label — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`

**Hover**, an instance of Default:

- fill `sem-background-rowHover`

**Destructive**, an instance of Default:

- Icon: `trash-2`, `sem-icons-error` · Label: "Remove", `sem-text-error`

#### Nav / Conversation Menu · `qAjRe`

- Root — width 168 · padding `spacing-3xs` · fill `sem-background-elevated` · border `sem-borders-dark` 1 · radius `radius-2xs` · shadow y `shadow-md-y` blur `shadow-md-blur` `shadow-md-color`
- Rename — `Nav / Menu Item / Default` · Icon: `pencil` · Label: "Rename"
- Remove — `Nav / Menu Item / Destructive`

## Nav / Conversations — Mobile Components

Board `bv5Vu`.

### Mobile Conversation Item

#### Nav / Conversation Item / Mobile

Variants: Default `Dzp8l` · Active `UbZ4V` · Lifted `UXSAx`

**Default**

- Root — width 208 · padding [`spacing-3xs`, 0, `spacing-3xs`, `spacing-3xs`] · radius `radius-2xs`
- Handle Slot › Grip — off
- Title Wrap — padding [`spacing-2xs`, `spacing-3xs`]
- Title Wrap › Title — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-navTextSecondary`
- More — Hemlock `Button/md/text/icon-only` · Icon: `ellipsis-vertical`

**Active**, an instance of Default:

- fill `sem-navActiveBg` · Title: "Investments this year", `sem-navTextPrimary`, fontWeight 600

**Lifted**, an instance of Default:

- fill `sem-background-elevated` · border `sem-borders-dark` 1 · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color` · Grip: shown · Title: "Lifetime plan", `sem-navTextPrimary` · More: opacity 0

### Mobile Menu

#### Nav / Menu Item / Mobile

Variants: Default `JAba5` · Pressed `MT05z` · Destructive `s2IwEP`

**Default**

- Root — width 192 · gap `spacing-xs` · padding [`spacing-xs`, `spacing-sm`] · radius `radius-2xs`
- Icon — pencil 20 · `sem-icons-full`
- Label — `font-primary` · `text-size-base` / `line-height-base` · 400 · `sem-text-header`

**Pressed**, an instance of Default:

- fill `sem-background-rowPressed`

**Destructive**, an instance of Default:

- Icon: `trash-2`, `sem-icons-error` · Label: "Remove", `sem-text-error`

#### Nav / Conversation Menu / Mobile · `KZBRv`

- Root — width 200 · padding `spacing-3xs` · fill `sem-background-elevated` · border `sem-borders-dark` 1 · radius `radius-xs` · shadow y `shadow-lg-y` blur `shadow-lg-blur` `shadow-lg-color`
- Rename — `Nav / Menu Item / Mobile / Default`
- Remove — `Nav / Menu Item / Mobile / Destructive`
- Hint — gap `spacing-3xs` · padding [`spacing-3xs`, 0, 0, 0]
- Hint › Hairline — fill `sem-borders-muted`
- Hint › Hint Row — gap `spacing-2xs` · padding [`spacing-2xs`, `spacing-sm`, `spacing-xs`, `spacing-sm`]
- Hint › Hint Row › Icon — hand 16 · `sem-icons-meta`
- Hint › Hint Row › Text — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-body`

### Touch Annotations

#### Annotation / Touch

Variants: Tap `S3xs5` · Hold `FDUV1`

**Tap**

- Root — width 40, height 40
- Finger — fill `sem-text-header` · opacity 0.28

**Hold**, differs from Tap:

- Root — width 64, height 64
- Haptic Ring — border `sem-text-header` 2 · opacity 0.5

## Q&A / Template — Components

Board `XAEUJ`.

### Question Card

#### Q&A / Talk · `k2PZZ`

- Root — gap `spacing-3xs`
- Advisor — Hemlock `Avatar` · image: image
- Label — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · tracking 1 · `sem-text-action`

#### Q&A / Question Card

Variants: Current `JB1eh` · Answered `t7lJN`

**Current**

- Root — width 544 · gap `spacing-md` · padding `spacing-md` · fill `sem-background-elevated` · border `sem-borders-action` 2 · radius `radius-sm` · shadow y `shadow-md-y` blur `shadow-md-blur` `shadow-md-color`
- Header — gap `spacing-sm`
- Header › Head Text — gap `spacing-2xs`
- Header › Head Text › Question Number — `Type / Label`
- Header › Head Text › Question — `Type / H2` · size `text-size-lg` · line height `line-height-lg`
- Header › Head Text › Helper — `Type / Body Small`
- Header › Talk — `Q&A / Talk`
- Answer — gap `spacing-sm`
- Answer › Answer Placeholder — fill `sem-background-subtle` · radius `radius-2xs`
- Answer › Answer Placeholder › Placeholder Label — `Type / Caption`
- Actions › Skip — Hemlock `Button/sm/text` · Label: "Skip", **Gothic A1**
- Actions › Continue — Hemlock `Button/sm/default` · Label: "Continue", **Gothic A1**

**Answered**, an instance of Current:

- border `sem-borders-light` 1 · opacity 0.6 · Question Number: "QUESTION 5" · Question: "Sarah, what do you earn each year?" · Helper: "Salary, wages and bonuses, before tax." · Actions: hidden

### Question cards · Follow-ups

#### Q&A / Progress · `xRxKu`

- Root — gap `spacing-2xs`
- Row › Count — `font-primary` · `text-size-xs` / `line-height-xs` · 600 · `sem-text-body`
- Row › Added — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-meta`
- Track — fill `sem-background-subtle` · radius `radius-full`
- Track › Fill — fill `sem-progressFill` · radius `radius-full`

#### Q&A / Follow-up Note · `Uabar`

- Root — gap `spacing-2xs` · padding [0, 0, 0, `spacing-3xs`]
- Icon Box › Icon — corner-down-right 16 · `sem-icons-full`
- Text Column — gap `spacing-4xs`
- Text Column › Title — `font-primary` · `text-size-sm` / `line-height-sm` · 600 · `sem-text-header`
- Text Column › Topics — `font-primary` · `text-size-xs` / `line-height-xs` · 400 · `sem-text-body`

#### Q&A / Question Card / Up next · `Lf18m`

- Root — gap `spacing-sm` · padding [`spacing-sm`, `spacing-md`] · border `sem-borders-dark` 1 · radius `radius-sm`
- Text — gap `spacing-4xs`
- Text › Question Number — `Type / Label`
- Text › Question — `Type / Body Small` · fill `sem-text-meta`
- Up next — `Type / Meta`

#### Q&A / Follow-up Group · `t8jGHo`

- Root — gap `spacing-xs` · padding [`spacing-xs`, 0, 0, 0]
- Note — `Q&A / Follow-up Note`
- Body — padding [0, 0, 0, `spacing-2xs`]
- Body › Follow-ups — gap `spacing-sm` · padding [0, 0, 0, `spacing-md`] · border `sem-borders-muted` left 2
- Body › Follow-ups › Up next — `Q&A / Question Card / Up next`

#### Q&A / Question Card / Follow-up

Variants: Current `nOxdR` · Answered `N4c8W`

**Current**

- Root — `Q&A / Question Card / Current` · Question Number: "QUESTION 8 · SOCIAL SECURITY" · Question: size `text-size-md`, line height `line-height-md`, "When do you plan to start Social Securi…" · Talk: hidden

**Answered**, differs from Current:

- Root — `Q&A / Question Card / Answered` · FXnPp: "QUESTION 7 · DIVIDENDS & INTEREST" · yiTPV: size `text-size-md`, line height `line-height-md`, "About how much do dividends and interes…" · P5PfzY: hidden

### Plan interview

#### Q&A / Plan interview

Variants: Story Token `f0ZbS` · Story `duNl3` · Topic Track `Q2I6m` · Focus Question `H9DS0h`

**Story Token**

- Root — padding [0, 0, `spacing-4xs`, 0] · border `sem-borders-action` bottom 1
- Value — `font-secondary` · `text-size-md` / `line-height-md` · 400 · `sem-text-header`

**Story**, differs from Story Token:

- Root — gap `spacing-2xs`
- Head › Label — `Type / Label`
- Lines › Line 1 › Run — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 1 › Token · Sarah — `Q&A / Plan interview / Story Token` · Value: "Sarah"
- Lines › Line 1 › Run (2) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 1 › Token · 52 — `Q&A / Plan interview / Story Token` · Value: "52"
- Lines › Line 1 › Run (3) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 1 › Token · a partner — `Q&A / Plan interview / Story Token` · Value: "a partner"
- Lines › Line 1 › Run (4) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 1 › Token · no children — `Q&A / Plan interview / Story Token` · Value: "no children"
- Lines › Line 1 › Run (5) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 2 › Run — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 2 › Token · $100,000 — `Q&A / Plan interview / Story Token` · Value: "$100,000"
- Lines › Line 2 › Run (2) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 3 › Token · dividends — `Q&A / Plan interview / Story Token` · Value: "dividends"
- Lines › Line 3 › Run — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 3 › Token · Social Security — `Q&A / Plan interview / Story Token` · Value: "Social Security"
- Lines › Line 3 › Run (2) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Lines › Line 3 › Token · other income — `Q&A / Plan interview / Story Token` · Value: "other income"
- Lines › Line 3 › Run (3) — `font-secondary` · `text-size-md` / `line-height-md` · 300 · `sem-text-body`
- Value — not in this variant

**Topic Track**, differs from Story Token:

- Root — gap `spacing-2xs`
- Label — `Type / Label`
- Steps — gap `spacing-2xs`
- Steps › Dividends — `Q&A / Plan interview / Topic Step / Done`
- Steps › Dash — fill `sem-borders-muted`
- Steps › Social Security — `Q&A / Plan interview / Topic Step / Current`
- Steps › Dash (2) — fill `sem-borders-muted`
- Steps › Other income — `Q&A / Plan interview / Topic Step / Upcoming`
- Value — not in this variant

**Focus Question**, differs from Story Token:

- Root — gap `spacing-md` · padding [`spacing-3xs`, 0, `spacing-3xs`, `spacing-md`] · border `sem-borders-action` left 2
- Head — gap `spacing-2xs`
- Head › Topic — `Type / Eyebrow` · fill `sem-text-meta`
- Head › Question line — gap `spacing-2xs`
- Head › Question line › Question — `Type / Title` · size `text-size-lg` · line height `line-height-lg`
- Head › Question line › Why we ask icon — off
- Head › Why we ask tooltip — off
- Head › Helper — `Type / Body`
- Answer › Stepper — `Q&A / Answer / Number Stepper` · Value: "67" · Unit: "years old"
- Actions — gap `spacing-xs`
- Actions › Primary — gap `spacing-3xs`
- Actions › Primary › Continue — Hemlock `Button/md/default` · Label: "Continue", **Gothic A1**
- Actions › Primary › Key hint — `Type / Meta`
- Actions › Skip — Hemlock `Button/md/text` · Label: "Skip for now", **Gothic A1**
- Value — not in this variant

#### Q&A / Plan interview / Topic Step

Variants: Done `WPfmD` · Current `M9KR5r` · Upcoming `VUjlY`

**Done**

- Root — gap `spacing-3xs`
- Icon — circle-check 16 · `sem-icons-success`
- Label — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-body`

**Current**, an instance of Done:

- Icon: `circle-dot`, `sem-icons-action` · Label: "Social Security", `sem-text-header`, fontWeight 600

**Upcoming**, an instance of Done:

- Icon: `circle`, `sem-icons-muted` · Label: "Other income", `sem-text-meta`

### Branches · first version

#### Q&A / Branch Card

Variants: Not started `rLECU` · Hover `THs4X` · In progress `KKyEy` · Completed `ILLz0`

**Not started**

- Root — width 168 · gap `spacing-3xs` · padding `spacing-sm` · fill `sem-background-elevated` · border `sem-borders-dark` 1 · radius `radius-xs` · shadow y `shadow-sm-y` blur `shadow-sm-blur` `shadow-sm-color`
- Title — `font-secondary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-header`
- Reason — off
- Status — gap `spacing-3xs`
- Status › Status Text — `font-primary` · `text-size-2xs` / `line-height-2xs` · 600 · `sem-text-action`
- Status › Status Icon — arrow-right 12 · `sem-icons-action`

**Hover**, an instance of Not started:

- fill `sem-background-hover` · border `sem-borders-strong`

**In progress**, an instance of Not started:

- Status Text: "1 of 3 answered"

**Completed**, an instance of Not started:

- Title: "Dividends & interest Q&A" · Status Text: "Completed", `sem-text-body` · Status Icon: `check`, `sem-icons-success`

#### Q&A / Connector · `m80EU`

- Root — width 32, height 8
- Line — fill `sem-borders-strong`
- Arrowhead — fill `sem-borders-strong`

### Branch Header · first version

#### Q&A / Branch Header · `bqA9w`

- Root — width 744 · gap `spacing-2xs`
- Back — Hemlock `Button/sm/text/icon-left` · Icon: `arrow-left` · Label: "Main questions", **Gothic A1**
- Breadcrumb — `Type / Label`
- Title — `Type / H2`
- Desc — `Type / Body Small`

## Q&A / Answer Controls — Components

Board `P4aoY`.

### Number Stepper

#### Q&A / Answer / Number Stepper · `N5NxSL`

- Pill Group — gap `spacing-xs` · padding [`spacing-3xs`, `spacing-sm`, `spacing-3xs`, `spacing-3xs`] · fill `sem-background-sunken` · radius `radius-full`
- Pill Group › Decrease — Hemlock `Button/md/secondary/icon-only` · Icon: `minus`
- Pill Group › Value — `Type / Stat Value`
- Pill Group › Increase — Hemlock `Button/md/secondary/icon-only` · Icon: `plus`
- Pill Group › Unit — `font-primary` · `text-size-sm` / `line-height-sm` · 400 · `sem-text-meta`

### Yes-No

#### Q&A / Answer / Yes-No

Variants: Unselected `Ka5D2` · Selected `P4OZHZ`

**Unselected**

- Root — gap `spacing-2xs`
- Yes — Hemlock `Button/md/outline` · Label: "Yes", **Gothic A1**
- No — Hemlock `Button/md/outline` · Label: "No", **Gothic A1**

**Selected**, differs from Unselected:

- Yes — Hemlock `Button/md/outline/icon-left/pressed` · Icon: `check` · Label: "Yes", **Gothic A1**

### Single Choice

#### Q&A / Answer / Single Choice

Variants: Unselected `zMqCW` · Selected `nJ7E4`

**Unselected**

- Root — gap `spacing-sm`
- Yes — Hemlock `Radio` · ControlRow: width fill_container · LabelColumn: width fill_container · Label: "Yes", **Gothic A1**, size `text-size-sm`, line height `line-height-sm` · Helper: hidden
- No — Hemlock `Radio` · ControlRow: width fill_container · LabelColumn: width fill_container · Label: "No", **Gothic A1**, size `text-size-sm`, line height `line-height-sm` · Helper: hidden

**Selected**, differs from Unselected:

- Yes — Hemlock `Radio/checked` · LabelColumn: width fill_container · Label: "Yes", **Gothic A1**, size `text-size-sm`, line height `line-height-sm` · Helper: hidden

### Multi-select

#### Q&A / Answer / Multi-select · `vg9vK`

- Root — gap `spacing-md`
- Options — gap `spacing-2xs`
- Options › Row 1 — gap `spacing-2xs`
- Options › Row 1 › Dividends & interest — `Q&A / Answer / Option Tile / Selected` · Label: "Dividends & interest"
- Options › Row 1 › Rental income — `Q&A / Answer / Option Tile / Default` · Label: "Rental income"
- Options › Row 2 — gap `spacing-2xs`
- Options › Row 2 › Pension — `Q&A / Answer / Option Tile / Default` · Label: "Pension"
- Options › Row 2 › Social Security — `Q&A / Answer / Option Tile / Selected` · Label: "Social Security"
- Options › Row 3 — gap `spacing-2xs`
- Options › Row 3 › Business income — `Q&A / Answer / Option Tile / Default` · Label: "Business income"
- Options › Row 3 › Other income — `Q&A / Answer / Option Tile / Selected` · Label: "Other income"
- Total — `Q&A / Answer / Amount Slider` · Label: "Total outside income per year" · Value: "$0" · Fill: width 10 · Thumb: x 0

#### Q&A / Answer / Option Tile

Variants: Default `E6JOI2` · Selected `ho2bd`

**Default**

- Root — padding `spacing-xs` · border `sem-borders-muted` 1 · radius `radius-xs`
- Checkbox — Hemlock `Checkbox` · ControlRow: width fill_container · LabelColumn: width fill_container · Label: "Rental income", **Gothic A1**, size `text-size-sm`, line height `line-height-sm` · Helper: hidden

**Selected**, differs from Default:

- Root — padding `spacing-xs` · fill `sem-background-highlight` · border `sem-btnSecondaryBorderPressed` 1 · radius `radius-xs`
- Checkbox — Hemlock `Checkbox/checked` · LabelColumn: width fill_container · Label: "Dividends & interest", **Gothic A1**, size `text-size-sm`, line height `line-height-sm` · Helper: hidden
