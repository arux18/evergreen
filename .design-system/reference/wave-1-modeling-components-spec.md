# Wave 1 Modeling Components — Design Spec

> **Purpose:** Spec the two highest-leverage blocker components for gen-UI financial modeling output.
> **Author:** Vega (Visual Design)
> **Status:** Draft — awaiting human approval before tokens/components are added to `gen-ui-design-system.lib.pen`
> **Scope:** `Slider` family and `Table/Cell` family
> **Blocks:** Gen-UI generation of financial modeling tools (scenario calculators, assumption panels, scenario comparison, amortization schedules, sensitivity matrices)

---

## Why these two first

An LLM generating a modeling tool without these will (a) reinvent sliders per session and (b) fall back to ad-hoc flex-row pseudo-tables. Both kill design coherence and accessibility. Shipping these unlocks ~80% of modeling tool output.

Token budget: both specs use **only existing tokens** in the `.lib.pen` variables block. No new tokens required at this stage. Three *optional* token additions are called out at the bottom.

---

## 1. `Slider` — interactive numeric range input

### Role

Primary input for any continuous numeric variable in a modeling tool: retirement age, savings rate, return assumption, home price, withdrawal rate, risk tolerance, time horizon.

### Variants

| Variant | When to use |
|---|---|
| `Slider/Single` | One value (e.g., "Annual savings rate") |
| `Slider/Range` | Two values, min + max (e.g., "Retire between 62 and 67") |
| `Slider/Stepped` | Discrete steps with tick marks (e.g., "1 / 3 / 5 / 10 year horizon") |

Each variant has the same state matrix.

### States

| State | Visual rule |
|---|---|
| Default | Track `$surface.tertiary`, fill `$accent.default`, thumb `$accent.default` with `$surface.primary` inner dot |
| Hover | Thumb scale 1.1, track unchanged |
| Active (dragging) | Thumb shadow `$shadow.color` at 8px blur; value popover appears above thumb |
| Focused (keyboard) | 2px outer ring `$border.focus`, 2px offset from thumb |
| Disabled | Track + fill + thumb at `$opacity.disabled` (0.4); pointer-events: none |
| Error | Fill `$status.error`; error message below in `$status.error` text |

### Anatomy

```
┌─ Label row ───────────────────────────────────────────────┐
│  {label}                              {value (large)}     │
│  {helper text}                                            │
└───────────────────────────────────────────────────────────┘
   ─────────────●─────────────────────────────────────────
   min                                              max
   {min format}                                {max format}
```

- **Label:** `$font.size.md` (14px), weight 500, `$text.primary`
- **Value readout:** `$font.size.xl` (20px), weight 600, `$text.primary`; right-aligned on same row as label
- **Helper text:** `$font.size.sm` (12px), `$text.tertiary`
- **Track height:** 4px
- **Fill:** `$accent.default`, left of thumb
- **Thumb:** 20×20px circle, `$accent.default`, 2px `$surface.primary` inner ring
- **Tap target:** invisible 44×44px hit area around thumb (WCAG 2.1 AA requirement)
- **Tick marks (stepped only):** 1×8px lines, `$border.primary`, centered on track
- **Min/max labels:** `$font.size.sm`, `$text.tertiary`, flanking ends of track

### Numeric formatting (built-in variants)

| Format | Example | Locale-aware |
|---|---|---|
| `currency` | $12,500 | Yes (US: `$`, EU: `€`, UK: `£`) |
| `percent` | 7.5% | Yes (normalize 0–1 internally, display × 100) |
| `number` | 10,000 | Yes (thousands separator) |
| `year` | 2045 | No (4-digit integer) |
| `duration` | 25 years | Configurable unit suffix |

### Value display modes

| Mode | Behavior | When to use |
|---|---|---|
| `inline` | Value always visible in label row, right-aligned | Default — highest readability |
| `popover` | Value floats above thumb only while dragging | When horizontal space is tight |
| `paired-input` | Editable text input beside slider, both bidirectionally synced | Modeling tools — lets user type exact value OR drag |

**Gen-UI rule:** for financial modeling contexts, AI should prefer `paired-input` unless explicitly constrained.

### Keyboard interaction

| Key | Action |
|---|---|
| ← / ↓ | Decrement by `step` (default 1) |
| → / ↑ | Increment by `step` |
| Shift + ← / → | Decrement/increment by 10× `step` |
| Home | Jump to `min` |
| End | Jump to `max` |
| PageDown | Decrement by 10% of range |
| PageUp | Increment by 10% of range |
| Tab | Move to next focusable element |

For `Slider/Range`, Tab moves between the two thumbs; each thumb is independently focusable.

### ARIA pattern

```html
<div role="group" aria-labelledby="slider-label-id">
  <label id="slider-label-id">Annual savings rate</label>
  <div
    role="slider"
    aria-valuemin="0"
    aria-valuemax="50"
    aria-valuenow="15"
    aria-valuetext="15 percent"
    aria-orientation="horizontal"
    tabindex="0"
  />
</div>
```

- Always include `aria-valuetext` for formatted values (`"15 percent"`, not `"15"`)
- For `Slider/Range`, use two sibling `role="slider"` elements, each with `aria-label` ("Minimum", "Maximum")
- Announce on change (debounced 300ms): `"{label}: {aria-valuetext}"`

### Accessibility requirements

- Contrast: fill `$accent.default` on track `$surface.tertiary` must be ≥3:1 (UI component minimum per `vega/rules/accessibility/accessibility.md`). Current tokens pass: `#3A6AF8` on `#EBEBEB` ≈ 4.6:1 ✓
- Touch target: 44×44px around thumb
- Focus ring: ≥2px, 3:1 contrast to adjacent surface (`$border.focus`)
- Motion: thumb drag respects `prefers-reduced-motion: reduce` → no thumb scale on hover, no shadow animation
- Color-alone rule: value must be readable as text, not inferred from fill position alone
- Error state: must include text error, not only fill color

### Gen-UI invocation pattern

When an AI generates a `Slider`, it emits this JSON shape. The gen-UI renderer hydrates it into the component.

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

`bindTo` is a dotted path into the modeling tool's state — the renderer wires two-way binding automatically.

### Component inventory to add (11 components)

Single:
- `Slider/Single/Default`
- `Slider/Single/Hover`
- `Slider/Single/Active`
- `Slider/Single/Focused`
- `Slider/Single/Disabled`
- `Slider/Single/Error`

Range:
- `Slider/Range/Default`
- `Slider/Range/Active`

Stepped:
- `Slider/Stepped/Default`

Readouts (standalone, reusable in popover mode):
- `Slider/Value Popover`
- `Slider/Tick Label`

---

## 2. `Table` — structured data grid

### Role

Generic data table for holdings, amortization schedules, scenario comparison, assumption tables, sensitivity matrices, tax tables, fee breakdowns, cap tables, any multi-row × multi-column financial data.

**Not a replacement for:** `GenUI/Transaction Item`, `GenUI/Budget Category Row`, or other bespoke financial rows. These keep their place for semantic finance contexts. `Table` is for everything else.

### Primitives (9 reusable components)

| Primitive | Role |
|---|---|
| `Table/Container` | Outer frame, controls density, manages overflow |
| `Table/Header` | Column header strip; supports sorting |
| `Table/Header Cell` | Single column header with sort affordance |
| `Table/Row` | Data row; hover + selected states |
| `Table/Row/Expanded` | Expandable drill-down row (child content below) |
| `Table/Cell/Text` | Left-aligned text |
| `Table/Cell/Numeric` | Right-aligned, tabular-numeric, optional format |
| `Table/Cell/Editable` | Inline-editable cell (input or dropdown) |
| `Table/Total Row` | Footer row with totals, bold, top border `$border.primary` |

### Cell content variants (format-aware, not new components)

| Format | Alignment | Token for negative |
|---|---|---|
| `text` | left | `$text.primary` |
| `number` | right, tabular-nums | `$text.primary` |
| `currency` | right, tabular-nums | `$fin.expense` (negative) / `$text.primary` (positive) |
| `percent` | right, tabular-nums | `$data.negative` / `$data.positive` |
| `delta` | right, tabular-nums + arrow | `$data.negative` / `$data.positive` / `$data.neutral` |
| `status` | left, badge | `$status.*` family |
| `date` | left or right | `$text.primary` |

**Numeric alignment rule:** every numeric column must use `font-variant-numeric: tabular-nums` so column digits align. (This is the workaround for `$font.mono` being aliased to Heebo — see critique Minor #1.)

### Anatomy

```
┌─ Table/Container ─────────────────────────────────────────┐
│  ┌─ Table/Header ──────────────────────────────────────┐ │
│  │ Asset ↕        Shares       Price       Value ↕    │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ Table/Row (hover) ─────────────────────────────────┐ │
│  │ VTSAX          1,420.50     $112.34     $159,522   │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ Table/Row ─────────────────────────────────────────┐ │
│  │ VBTLX          850.20       $10.22      $8,687     │ │
│  └─────────────────────────────────────────────────────┘ │
│  ┌─ Table/Total Row ───────────────────────────────────┐ │
│  │ Total                                   $168,209   │ │
│  └─────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### States

**Table/Row states**

| State | Visual |
|---|---|
| Default | Fill `$surface.primary`, bottom border `$border.primary` 1px |
| Hover | Fill `$surface.secondary` |
| Selected | Fill `$surface.accent`, left 2px bar `$accent.default` |
| Focused (keyboard) | 2px outer ring `$border.focus`, inset |
| Expanded | Chevron rotated 90°, child content below at `$surface.secondary` |

**Table/Header Cell states**

| State | Visual |
|---|---|
| Default | Fill `$surface.secondary`, text `$text.secondary`, weight 600, `$font.size.sm` |
| Sortable / Unsorted | ↕ icon at `$text.tertiary` |
| Sortable / Ascending | ↑ icon at `$text.primary` |
| Sortable / Descending | ↓ icon at `$text.primary` |
| Sticky | Same as Default + bottom border `$border.secondary` 1px + shadow when scrolled |

**Table/Cell/Editable states**

| State | Visual |
|---|---|
| Default | Renders as read-only text; dotted 1px underline `$border.secondary` to signal editability |
| Hover | Fill `$surface.secondary` + cursor: text |
| Editing | Becomes text input with `$border.focus` 2px, `$surface.primary` fill |
| Error | 2px `$status.error` border + error text below at `$font.size.sm`, `$status.error` |
| Disabled | `$opacity.disabled` (0.4), no underline, pointer-events: none |

### Density

Table respects `$density.compact|comfortable|spacious` tokens:

| Density | Row height | Cell padding | Use case |
|---|---|---|---|
| `compact` | 32px | `$density.compact.padding` (8) | Large datasets, amortization tables |
| `comfortable` | 44px | `$density.comfortable.padding` (16) | Default — touch-friendly |
| `spacious` | 56px | `$density.spacious.padding` (24) | Summary tables, marketing |

Gen-UI rule: default to `comfortable` unless row count > 50, then `compact`.

### Sticky / frozen behavior

- `Table/Header` with `sticky: true` → pins to top of scrollable viewport, adds `$shadow.color` drop shadow when scrolled underneath
- First column `frozen: true` → pins left, adds right border `$border.primary`
- Both can be true simultaneously for scenario comparison tables

### Keyboard interaction

| Key | Action |
|---|---|
| Tab | Enter table → first interactive cell; then exit table |
| Arrow keys | Move between cells within table |
| Enter | Activate cell (expand row / start editing editable cell) |
| Escape | Cancel editing / exit table |
| Space | Toggle row selection (if selectable) |
| Home / End | First / last cell in row |
| Ctrl+Home / Ctrl+End | First / last cell in table |

### ARIA pattern

```html
<table role="table" aria-label="Portfolio holdings" aria-rowcount="24" aria-colcount="4">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="none">Asset</th>
      <th role="columnheader" aria-sort="descending">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row" aria-rowindex="2">
      <td role="cell">VTSAX</td>
      <td role="cell">$159,522</td>
    </tr>
  </tbody>
</table>
```

- `aria-sort` on sortable headers: `"none" | "ascending" | "descending"`
- `aria-rowcount` / `aria-colcount` required for virtualized tables (total count ≠ rendered count)
- Editable cells: `role="gridcell"` + `aria-readonly="false"`, and the child input gets its own `aria-label` mirroring the column header
- Announce on sort change: `"Sorted by {column}, {direction}"`
- Announce on row selection: `"{row label} selected"`

### Accessibility requirements

- All numeric cells: right-aligned, tabular-nums, min `$font.size.md` (14px per `vega/rules/accessibility/accessibility.md`)
- Negative numbers: color + minus sign + optional parentheses (never color alone)
- Sortable header: `≥3:1` contrast on sort icon, and state is announced to screen readers (not just visual)
- Editable cell: 44×44px minimum tap target; dotted underline affordance is not color-dependent
- Row hover and selected states must be distinguishable without color (selected uses left bar AND fill)

### Gen-UI invocation pattern

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
    { "id": "vtsax", "asset": "VTSAX", "shares": 1420.5, "price": 112.34, "value": 159522 },
    { "id": "vbtlx", "asset": "VBTLX", "shares": 850.2,  "price": 10.22,  "value": 8687 }
  ],
  "totalRow": { "value": 168209 },
  "editable": ["shares"],
  "expandable": false,
  "stickyHeader": true
}
```

### Component inventory to add (13 components)

- `Table/Container`
- `Table/Header Cell/Default`
- `Table/Header Cell/Sortable Asc`
- `Table/Header Cell/Sortable Desc`
- `Table/Row/Default`
- `Table/Row/Hover`
- `Table/Row/Selected`
- `Table/Row/Expanded`
- `Table/Cell/Text`
- `Table/Cell/Numeric`
- `Table/Cell/Editable/Default`
- `Table/Cell/Editable/Editing`
- `Table/Total Row`

---

## Optional token additions (for consideration, not required)

| Token | Value | Why |
|---|---|---|
| `focus.ring.width` | `2` (number) | Codify the ≥2px focus ring width so every component agrees |
| `focus.ring.offset` | `2` (number) | Codify the 2px offset from the focused element |
| `table.row.height.compact` | `32` | Convenience; can also derive from `$density.compact.*` |

These are nice-to-haves. Do not add them without approval — flagging only.

---

## What this spec does NOT cover

- **Responsive behavior below 768px:** both components need a mobile strategy. Table in particular usually collapses to a vertical card stack on narrow viewports. Spec this in Wave 2.
- **Virtualization:** for tables >100 rows. Implementation concern, not a design concern — Freya owns.
- **Export / copy semantics:** "copy as CSV" on table, "copy value" on slider. Spec this in Wave 2.
- **Chart crosslinks:** slider dragging live-updates connected chart. Spec this as part of the `Scenario Switcher` gen-UI pattern in Wave 1 follow-up.

---

## Handoff

When this spec is approved:

1. **Design (Vega):** Add the 24 new reusable components to `.design-system/gen-ui-design-system.lib.pen` using existing tokens only. Post a diff PR for Amanda to review before merging.
2. **Engineering (Freya):** Implement React components in `packages/components/` matching this spec. Use existing tokens, match state matrix 1:1, ship with unit tests for keyboard + ARIA.
3. **Gen-UI (renderer):** Extend the component registry so AI JSON output (see invocation patterns above) hydrates to the correct component.

Tokens used: already in the system. Zero new tokens required for Wave 1.

⏳ **Awaiting human approval before I add components to `.lib.pen`.**

— Vega

*"If someone has to think about it, we haven't finished designing it."*
