# Welcome Tour — Hemlock Styling Handoff

> **Purpose:** Complete restyling reference for converting the Welcome Tour (`Welcome_v1_2.html`) to match the Hemlock design system. Every change is documented — apply them all to reproduce `Welcome_v1_3.html`.

> **Source file:** `Welcome_v1_2.html` (original)
> **Target file:** `Welcome_v1_3.html` (restyled)
> **Design system:** `hemlock-library.lib.pen`

---

## 1. Font Loading

### Remove
- All embedded `@font-face` declarations with base64-encoded font data for EB Garamond and Heebo

### Replace With
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&family=Noto+Serif:wght@400;600&display=swap" rel="stylesheet">
```

### Rules
- **Primary font:** Heebo (all UI text)
- **Secondary font:** Noto Serif (serif headings in the intro overlay only)
- Noto Serif weights: 400 (Regular) or 600 (Semibold) only — **never 700 (Bold)**
- **No Inter, no EB Garamond, no Cormorant Garamond**

---

## 2. CSS Custom Properties

### Add to `:root`
| Token | Value | Usage |
|-------|-------|-------|
| `--icon-meta` | `#5E5954` | Metadata icon color (back button, skip text) |

### Add to `html[data-theme="dark"]`
| Token | Value | Usage |
|-------|-------|-------|
| `--icon-meta` | `#949895` | Dark mode metadata icon color |

### Keep unchanged
- All dark mode blue-black background values (`#1a1f2b`, `#141823`, `#0e1019`, etc.) — do **NOT** change these to Hemlock green-tinted neutrals

---

## 3. Intro Overlay (Tour Cards)

### Tour Card Container (`.tour-card`)
| Property | Before | After |
|----------|--------|-------|
| `border-radius` | `16px` | `12px` |

### Tour Right Panel (`.tour-right`)
| Property | Before | After |
|----------|--------|-------|
| `justify-content` | `center` | `flex-start` |

### Tour Navigation (`.tour-nav`)
| Property | Before | After |
|----------|--------|-------|
| `margin-top` | (none) | `auto` |

> This pins the dots + button to the bottom of the card so they don't jump when content length varies between slides.

### Tour Title (`.tour-title`)
| Property | Value |
|----------|-------|
| Font-family | `var(--font-serif)` (Noto Serif) |
| Font-weight | `400` or `600` (never 700) |

---

## 4. Buttons

### Primary Button (`.btn.primary`)
| Property | Before | After |
|----------|--------|-------|
| Background | `var(--accent)` / `#3A6AF8` | `#0e0e0e` |
| Color | `#fff` | `#EEEDEB` |
| Padding | varies | `12px 24px` |
| Font | varies | `600 16px var(--font-ui)` |
| Border-radius | varies | `9999px` (pill) |
| Hover bg | — | `#2D2926` |

### Outline/Pill Buttons (`.btn` without `.primary`, `.pill`)
| Property | Value |
|----------|-------|
| Padding | `8px 16px` (Hemlock Small) |
| Font | `600 14px var(--font-ui)` |
| Border | `1px solid #D5D3D0` |
| Color | `#2D2926` |
| Hover border | `#5E5954` |

### Skip Button (`.skip-next`)
| Property | Value |
|----------|-------|
| Color | `var(--icon-meta)` |
| Font | `400 14px var(--font-ui)` |
| Opacity | `.85` |
| Hover | `opacity: 1; text-decoration: underline; text-underline-offset: 3px` |

### Back Button — Replace Text with Icon
- **Remove** the `.back-next` text link entirely
- **Add** a `.back-up` icon button:

| Property | Value |
|----------|-------|
| Position | `absolute; top: 48px; right: 0` |
| Size | `36px × 36px` |
| Color | `var(--icon-meta)` |
| Border-radius | `50%` |
| Icon | Lucide `chevron-up` (`<polyline points="18 15 12 9 6 15">`) at 20px |
| Hover bg (light) | `#EEEDEB` |
| Hover bg (dark) | `#2D2926` |

- Do NOT show the back button on the first section (`t1`)
- JavaScript must dynamically create the button for each section

---

## 5. Typography

### Base Text Size
| Context | Before | After |
|---------|--------|-------|
| `.qlabel` | `18px` | `16px` |
| `.lead` | `18px` | `16px` |
| `#rankWrap .rank-note` | `18px` | `16px` |
| `.slider-block .sl-label` | `18px` | `16px` |
| `#bracketWrap caption` | `18px` | `16px` |
| Inline JS-generated locality qlabel | `19px` | Remove the inline `font-size:19px` |

### Keep at 18px (intentional headlines)
- `.track-headline`
- `.home-block-title`
- `.map-title`

---

## 6. Input Fields — Hemlock Floating-Label Pattern

### Container (`.hf-row`)
| Property | Before | After |
|----------|--------|-------|
| Display | — | `flex; flex-direction: column; gap: 2px` |
| Border | on inner `<input>` | `1px solid #D5D3D0` (on container) |
| Border-radius | `6px` | `4px` |
| Padding | on inner `<input>` | `8px 16px 6px` |
| Background | `var(--surface-1)` | `#ffffff` |
| Cursor | — | `text` |
| Transition | — | `border-color .15s` |

### Container Focus (`.hf-row:focus-within`)
| Property | Value |
|----------|-------|
| Border | `2px solid #0e0e0e` |
| Padding | `7px 15px 5px` (compensates for thicker border) |

### Label Inside Container (`.hf-row span`)
| Property | Value |
|----------|-------|
| Font | `400 14px/1.2 var(--font-ui)` |
| Color | `#5E5954` |

### Input Value (`.hf-row input`)
| Property | Value |
|----------|-------|
| Font | `400 16px/1.5 var(--font-ui)` |
| Border | `none` |
| Padding | `0` |
| Background | `transparent` |
| Color | `#403D3A` |
| Outline | `none` |

### Dark Mode
| Selector | Property | Value |
|----------|----------|-------|
| `.hf-row` | border-color | `var(--border)` |
| `.hf-row` | background | `transparent` |
| `.hf-row:focus-within` | border-color | `var(--ink)` |
| `.hf-row span` | color | `#949895` |
| `.hf-row input` | color | `var(--ink)` |

### Life Plan Form Labels (`.lp-form .hf-row span`)
| Property | Before | After |
|----------|--------|-------|
| Font-size | `16px` | `14px` |
| Color | `var(--ink)` | `#5E5954` |

---

## 7. Select Dropdown (`.wc-select`)

| Property | Before | After |
|----------|--------|-------|
| Padding | `8px 12px` | `12px 40px 12px 16px` |
| Background | `var(--surface-1)` | `#ffffff` |
| Color | `var(--ink)` | `#403D3A` |
| Appearance | browser native | `-webkit-appearance: none; appearance: none` |
| Chevron | browser native | Custom Lucide `chevron-down` SVG as `background-image` |

### Custom Chevron
```css
background: #ffffff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%238A8680' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
```
- Icon: Lucide `chevron-down`, 20px, `#8A8680`
- Position: `right 14px center`

### Focus State
| Property | Value |
|----------|-------|
| Border | `2px solid #0e0e0e` |
| Padding | `11px 39px 11px 15px` (compensates) |
| Outline | `none` |

---

## 8. Equity Form Inputs (`.eq-in`)

| Property | Before | After |
|----------|--------|-------|
| Padding | `8px 12px` | `10px 16px` |
| Font | `font-size: 16px` | `400 16px/1.5 var(--font-ui)` |
| Background | `var(--calc-bg)` | `#ffffff` |
| Color | `var(--ink)` | `#403D3A` |

### Focus State
| Property | Value |
|----------|-------|
| Border | `2px solid #0e0e0e` |
| Padding | `9px 15px` (compensates) |

---

## 9. Checkboxes — Hemlock Custom Style

### Remove
- All `accent-color` usage on checkboxes
- All browser-native checkbox rendering

### Base Style (`input[type="checkbox"]`)
| Property | Value |
|----------|-------|
| `-webkit-appearance` | `none !important` |
| `-moz-appearance` | `none !important` |
| `appearance` | `none !important` |
| Width | `20px !important` |
| Height | `20px !important` |
| Min-width / min-height | `20px` |
| Border | `1px solid #D5D3D0` |
| Border-radius | `4px` |
| Background | `#fff` |
| Position | `relative` |
| Margin | `0` |
| Padding | `0` |
| Box-sizing | `border-box` |

### Checked State (`input[type="checkbox"]:checked`)
| Property | Value |
|----------|-------|
| Border | `2px solid #0e0e0e` |
| Background | white with Lucide `check` icon as SVG background-image |

### Checkmark Icon
```css
background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%230e0e0e' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E") no-repeat center;
```
- Icon: Lucide `check` (`<polyline points="20 6 9 17 4 12">`)
- Size: 14×14px
- Color: `#0e0e0e`
- Stroke-width: `2` (Lucide default — NOT 3)

### Dark Mode
| State | Property | Value |
|-------|----------|-------|
| Unchecked | border-color | `#D5D3D0` |
| Unchecked | background-color | `transparent` |
| Checked | border-color | `#fff` |
| Checked | background | transparent + white Lucide check icon |

### Checkbox Label (`.check-item`)
| Property | Value |
|----------|-------|
| Font | `400 16px/1.5 var(--font-ui)` |
| Color | `#403D3A` (dark mode: `var(--ink)`) |
| Gap | `12px` |

### Checkrow (`.checkrow`)
| Property | Value |
|----------|-------|
| Font | `400 16px/1.5 var(--font-ui)` |
| Color | `#403D3A` (dark mode: `var(--ink)`) |
| Gap | `12px` |
| Margin | `8px 0 32px` |
| Cursor | `pointer` |

---

## 10. Radios

| Property | Before | After |
|----------|--------|-------|
| Size | `18px` | `20px × 20px` |
| Accent-color | `var(--accent)` | `var(--accent)` (kept for radios) |

---

## 11. Sliders

| Property | Before | After |
|----------|--------|-------|
| Track height | varies | `4px` |
| Thumb size | varies | `20px × 20px` |
| Thumb border | varies | `2px solid #fff` |
| Thumb shadow | varies | `0 1px 3px rgba(0,0,0,0.2)` |

---

## 12. Tables — Hemlock DetailSection Pattern

### Base Table (`.wc-table`)
| Property | Before | After |
|----------|--------|-------|
| Font | `font-size: 16px` | `400 14px/1.43 var(--font-ui)` |

### Header Row (`thead`)
| Property | Before | After |
|----------|--------|-------|
| Background | none | `#F7F5F0` |
| Border-radius | none | `8px 8px 0 0` (top corners) |
| Dark mode bg | — | `var(--surface-2)` |

### Header Cells (`th`)
| Property | Before | After |
|----------|--------|-------|
| Font | `600 14px, color: var(--muted)` | `600 14px, color: #0e0e0e` |
| Padding | `11px 14px` | `14px 16px` |
| Border-bottom | `1px solid var(--border)` | `1px solid #EEEDEB` |

### First Header Cell
```css
.wc-table thead th:first-child { border-radius: 8px 0 0 0; }
.wc-table thead th:last-child { border-radius: 0 8px 0 0; }
```

### Data Cells (`td`)
| Property | Before | After |
|----------|--------|-------|
| Height | auto | `52px` |
| Padding | `11px 14px` | `14px 16px` |
| Color | inherited | `#403D3A` |
| Border-bottom | `1px solid var(--border)` | `1px solid #EEEDEB` |

### First Column (`td:first-child`)
| Property | Value |
|----------|-------|
| Text-align | `left` |
| Color | `#5E5954` (label gray) |

### Value Columns (`td:not(:first-child)`)
| Property | Value |
|----------|-------|
| Font | `600 16px/1.5 var(--font-ui)` |

> **Exception:** If a cell contains non-numeric text, use regular `400 14px` body text instead.

### Last Row
```css
.wc-table tr:last-child td { border-bottom: none; }
```

### Total Row (`.total`)
| Property | Before | After |
|----------|--------|-------|
| Border-top | `2px solid var(--border-strong)` | `2px solid #D5D3D0` |

### Tax Tables (`#taxWrap`)
| Property | Before | After |
|----------|--------|-------|
| Cell padding | `3px 11px` | `8px 16px` |
| Header border | `1.5px solid var(--muted)` | `1px solid #EEEDEB` |
| Header padding-bottom | `6px` | `12px` |
| First body row padding-top | `13px` | `16px` |
| Fine print padding-left | `11px` | `16px` |
| Total row padding-top | `6px` | `12px` |

### Bracket Tables (`#bracketWrap`)
| Property | Before | After |
|----------|--------|-------|
| First column font-weight | `700` | `600` |
| First column color | inherited | `#403D3A` |
| Removed | `.few` size variant (17px for ≤5 rows) | — |

### Remove from taxWrap
```css
/* REMOVE these rules — no longer needed */
#wcMain:not(.narrow) #taxWrap .wc-table th,
#wcMain:not(.narrow) #taxWrap .wc-table td { font-size: 16px; }
```

---

## 13. Map Tile States (`.st`)

| State | Before | After |
|-------|--------|-------|
| Hover outline | `2px solid #E11D48` (red) | `2px solid #2D2926` |
| Selected outline | `4px solid #E11D48` (red) | `3px solid #0e0e0e` |
| Dark hover | — | `outline-color: #EEEDEB` |
| Dark selected | — | `outline-color: #fff` |

> Red was removed because it looked like an error state.

---

## 14. Scrollable Areas

### Remove `overflow:auto` from these inline styles:
| Element | Before | After |
|---------|--------|-------|
| `#bracketWrap` | `style="overflow:auto"` | no style attribute |
| `#taxWrap` | `style="overflow:auto"` | no style attribute |

> These wrappers sit inside the already-scrollable `#wcMain`. A nested scrollbar is unnecessary.

---

## 15. Focus Ring Styles

### Add these `:focus-visible` rules (none existed before):

```css
.btn:focus-visible, .pill:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 2px;
}
input[type=range]:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 4px;
}
input[type="checkbox"]:focus-visible, input[type=radio]:focus-visible {
  outline: 2px solid var(--accent); outline-offset: 2px;
}
.hf-row input:focus-visible { outline: none; }
select:focus-visible, .eq-in:focus-visible { outline: none; }
```

> For inputs and selects with the Hemlock focus border (2px #0e0e0e), the `outline` is set to `none` — the border change IS the focus indicator.

---

## 16. Mobile Responsiveness

### Tour Card Mobile Fix (`#wcMain.narrow .tour-card`)
| Property | Before | After |
|----------|--------|-------|
| overflow-y | none | `auto` |
| flex direction | — | `column` |
| min-height | — | `100vh` |

> Fixes the issue where the "Get started" button was hidden below the viewport on mobile because content pushed it off-screen.

---

## 17. Spacing Alignment (4px Grid)

Various padding/margin values were adjusted to align with the 4px spacing grid. Key changes:

| Element | Property | Before | After |
|---------|----------|--------|-------|
| `.tour-card` | border-radius | `16px` | `12px` |
| Various inputs | border-radius | `6px` | `4px` |
| Dark mode checkbox | border-radius | varies | `4px` |

---

## 18. Dark Mode — What NOT to Change

These dark mode values must remain exactly as they are:

| Property | Value | Reason |
|----------|-------|--------|
| `#wcMain` background | `linear-gradient(160deg,#1a1f2b,#141823,#0e1019)` | Intentional blue-black |
| `body` background | `#0e1019` | Matches gradient |
| Tour left panel | `linear-gradient(180deg,#18243f,#0a1020)` | Deep blue |
| Tour right panel | `linear-gradient(150deg,#26292e,#1b1e22)` | Charcoal |
| Tour card bg | `#1d2024` | Dark surface |
| Tour card border | `1px solid #5a5e63` | Subtle edge |

Do **not** replace these with Hemlock's green-tinted neutrals. The blue-black palette is a deliberate design choice for this feature.

---

## 19. What NOT to Do

- **No EB Garamond.** Use Noto Serif for serif text.
- **No Inter.** Use Heebo for all UI text.
- **No `accent-color` on checkboxes.** Use the custom Lucide check icon pattern.
- **No browser-native select chevrons.** Use the custom SVG `chevron-down`.
- **No red map hover/selected states.** Use neutral dark colors.
- **No `overflow: auto` on table wrappers.** Only `#wcMain` scrolls.
- **No 18px base text.** Base body text is always 16px.
- **No CSS `::after` fake checkmarks.** Use the Lucide check SVG as a background-image.
- **No green-tinted dark mode backgrounds.** Keep the blue-black values.
- **No Noto Serif Bold (700).** Only Regular (400) and Semibold (600).
