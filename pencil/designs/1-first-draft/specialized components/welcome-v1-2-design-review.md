# Welcome V1.2 — Design Review Against Hemlock

> **Date:** 2026-07-06
> **Source file:** `Welcome_v1_2.html`
> **Reviewed against:** Hemlock design system (`hemlock-library.lib.pen`) and `design-system.md`
> **Scope:** Deviations only — items that match Hemlock are omitted

---

## Intro Overlay (User-Confirmed Notes)

- **Button background**: Change from `var(--accent)` / `#3A6AF8` to `#0e0e0e`
- **Button font size**: Currently `18px` → change to `16px` (`$font.size.md`)
- **Serif font**: Currently `EB Garamond` → must be `Noto Serif`. Weights 400 or 600 only, never 700
- **Eyebrow color in blue**: Approved to keep — matches carousel navigation
- **Button hidden on mobile**: Tour card uses `height: 100vh; min-height: 100vh` with `flex: 0 0 50%` for both panels. Content overflows past viewport bottom. Needs `overflow-y: auto` on tour card or scrollable flex layout

### Additional Overlay Issues

| Element | Current | Hemlock Target | Issue |
|---|---|---|---|
| `.tour-body` text color | `#3F3F46` (hardcoded) | `$text.secondary` = `#525252` | Wrong gray; not a Hemlock token |
| `.tour-title` color | `#171717` (hardcoded) | Should use `var(--ink)` | Hardcoded won't swap in dark mode |
| `.tour-body` font size | `15px` | `$font.size.md` = `16px` or `$font.size.sm` = `14px` | 15px not on type scale |
| `.tour-title` font size | `26px` | `$font.size.2xl` = `30px` or `$font.size.xl` = `24px` | 26px not on type scale |
| Tour card border-radius | `16px` | `$radius.xl` = `12px` | Not a Hemlock radius token |
| Tour dot inactive color | `#D4D4D8` | `$gray.200` = `#D8D9D8` | Hemlock grays are green-tinted |

---

## Typography: Global Font Change Required

```css
/* Current */
--font-serif: 'EB Garamond', Georgia, serif;

/* Required */
--font-serif: 'Noto Serif', Georgia, serif;
```

Embedded base64 `@font-face` declarations must be replaced with Noto Serif woff2 files. Only weights 400 and 600; remove 500 and 700.

---

## Typography: Font Sizes Off the Type Scale

| Element | Current | Hemlock Token | Target |
|---|---|---|---|
| `body` base font | `18px` | `$font.size.md` | `16px` |
| `.btn` / `.pill` font | `18px` | `$font.size.md` | `16px` |
| `.skip-next`, `.back-next` | `18px` | `$font.size.md` | `16px` |
| `.hf-row input`, `.wc-select` | `17px` | `$font.size.md` | `16px` |
| `.slider-block .sl-label` | `19px` | `$font.size.lg` | `18px` |
| `.slider-block .sl-val` | `22px` | `$font.size.xl` | `24px` |
| `.eyebrow` / `.tour-eyebrow` | `13px` | `$type.overline` | `12px` |
| `.qlabel` | `clamp(17px,1.9vw,21px)` | `$font.size.lg` | `18px` |
| `.lead` | `clamp(18px,2vw,22px)` | `$font.size.lg` | `18px` |
| `.rank-note` | `15px` | `$font.size.md` | `16px` |
| `.check-item`, `.radio-row`, `.eq-row` | `18px` | `$font.size.md` | `16px` |
| `.home-block-title` | `19px` | `$font.size.lg` | `18px` |
| `.tour-body` | `15px` | `$font.size.md` | `16px` |
| `.tour-title` | `26px` | `$font.size.xl` or `$font.size.2xl` | `24px` or `30px` |

## Typography: Line Height

| Element | Current | Hemlock | Target |
|---|---|---|---|
| `body` | `1.6` | `1.4–1.5` | `1.5` |

---

## Colors: Dark Mode Mismatches

| Element | Current | Hemlock Dark Token | Action |
|---|---|---|---|
| `.btn.primary` dark bg | `#4f6fd6` | `$accent.default` = `#7094FB` | Use Hemlock token |
| `.btn.primary:hover` dark bg | `#5d7ce0` | `$accent.hover` = `#9BB3FC` | Use Hemlock token |
| `#wcMain` dark bg | `#1a1f2b → #141823 → #0e1019` | `$surface.primary` = `#111111` | Blue-tinted → use green-tinted neutrals |
| `body` dark bg | `#0e1019` | `$gray.50` = `#0E0E0E` | Use exact token |
| `.tour-card` dark bg | `#1d2024` | `$surface.secondary` = `#1A1A1A` | Use Hemlock surface token |
| `.tour-left` dark gradient | `#18243f → #0a1020` | Not Hemlock tokens | Use neutral palette |
| `.tour-right` dark gradient | `#26292e → #1b1e22` | Not Hemlock tokens | Use neutral palette |

## Colors: Other

| Element | Current | Hemlock Token |
|---|---|---|
| `.home-block-title` border | `1px solid #222` | `var(--border-strong)` |
| `.st` (state map tile) border | `#1E66F0` | `$accent.default` = `#3A6AF8` |

---

## Spacing: Off the 4px Grid

| Current | Used On | Grid Target |
|---|---|---|
| `14px` | `.btn-row` gap, `.eyebrow` margin-bottom, `.checklist` gap | `12px` or `16px` |
| `18px` | `h1` margin-bottom, `.name-form` column gap | `16px` or `20px` |
| `22px` | `#t3a h2` margin-bottom, `.hint` margin-top | `20px` or `24px` |
| `26px` | `h2` margin-bottom | `24px` or `28px` |
| `30px` | `.slider-block` margin, `.next-wrap` margin-top | `32px` |
| `34px` | `.lead` margin-bottom | `32px` or `36px` |
| `42px` | `#t2a h2` margin-bottom | `40px` or `44px` |
| `46px` | `#t4a h2` margin-bottom | `44px` or `48px` |
| `50px` | `.eyebrow` padding-top | `48px` |
| `44px` | `.tour-right` horizontal padding | `40px` or `48px` |
| `56px` | `#wcMain` padding | `48px` |
| `11px` | Input vertical padding | `8px` |
| `13px` | Input horizontal padding | `12px` |
| `10px` | `.pillset` gap | `8px` or `12px` |

---

## Border Radius Mismatches

| Element | Current | Hemlock Token | Target |
|---|---|---|---|
| Inputs (`.eq-in`, `.hf-row input`, `.wc-select`) | `8px` | `$radius.md` | `6px` |
| Tour card | `16px` | `$radius.xl` | `12px` |

---

## Component Spec Mismatches

### Inputs
- **Height**: ~39px (from padding) → Hemlock specifies `36px`
- **Padding**: `11px 13px` → `$space.2` (8px) vertical, `$space.3` (12px) horizontal
- **Border**: Uses `$border-strong` → should use `$border.primary` for default state

### Sliders
- **Track height**: `6px` → `4px`
- **Thumb size**: `18×18px` → `20×20px` with 2px `$surface.primary` inner ring
- **Tap target**: 18px visual only → needs `44×44px` invisible hit area

### Checkboxes
- **Size**: `19×19px` → `18×18px`
- **Border radius**: Browser default → `$radius.sm` = `4px`

---

## Accessibility Gaps

1. **No focus ring styles**: No `:focus` or `:focus-visible` rules exist. Hemlock requires `$border.focus` ring (2px, 2px offset) on every interactive element
2. **Pill touch targets**: `.pill` at ~42px height, below 44px minimum
3. **Checkbox/radio touch targets**: 18–19px visual, need 44×44px invisible tap target
4. **Slider tap target**: Thumb is 18px, needs 44×44px hit area

---

## UX Polish

1. **Inconsistent eyebrow casing in source**: `Your family`, `Your taxes` vs `YOUR NAME`, `YOUR RESIDENCE`. CSS applies uppercase, but source should be consistent
2. **Skip link styling**: `#t3aSkip` is a plain text link — would be cleaner as `Btn/Ghost` pattern
3. **First section divider**: `.eyebrow` border-top on `t1` is unnecessary (nothing above it)
4. **Form label size inconsistency**: `.hf-row span` = `14px` vs `.lp-form .hf-row span` = `18px` — same pattern, should use one size (`$type.label` = `14px`)
5. **State map tile border**: Uses `#1E66F0` — not in Hemlock palette
