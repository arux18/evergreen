# Hemlock Design System — HTML/CSS Handoff

> **Purpose:** Apply these changes to any HTML/CSS that references the old Evergreen design system tokens. Token names use the current Hemlock nomenclature (`--prim-*` primitives, `--sem-*` semantics) and every semantic token now has a **navy dark theme** value (see §16).
> **Source of truth:** `hemlock-library.lib.pen`
> **Date:** 2026-08-20 (token values synced 2026-09-28)
> **Engineering values:** `dark-mode-handoff/hemlock.light.css` and `hemlock.dark.css` are the complete, generated token files. If anything here disagrees with them, the CSS files win. See `dark-mode-handoff/README-DEV.md` for the required light-mode change and surface roles.

---

## 1. Font Family Changes

| Old | New | CSS |
|-----|-----|-----|
| `Cormorant Garamond` | `Noto Serif` | `font-family: 'Noto Serif', serif;` |
| `Inter` (if used anywhere) | `Heebo` | `font-family: 'Heebo', sans-serif;` |

**Rule:** Heebo is the only sans-serif. Noto Serif is the only serif. No other fonts.

```css
:root {
  --font-primary: 'Heebo', sans-serif;
  --font-secondary: 'Noto Serif', serif;
}
```

---

## 2. Color Ramp Replacements

### Gray (green-tinted → warm neutrals)

| Stop | OLD value | NEW value |
|------|-----------|-----------|
| 50 | `#F9FAF9` | `#F8F7F6` |
| 100 | `#EEEFEE` | `#EEEDEB` |
| 200 | `#D8D9D8` | `#D5D3D0` |
| 300 | `#B6B9B7` | `#B5B1AB` |
| 400 | `#949895` | `#8A8680` |
| 500 | `#727874` | `#716E6A` |
| 600 | `#575B58` | `#5E5954` |
| 700 | `#3B3E3C` | `#403D3A` |
| 800 | `#202220` | `#2D2926` |
| 900 | `#0E0E0E` | `#0e0e0e` |

### Taupe (NEW — add these)

```css
:root {
  --prim-taupe-100: #F7F5F0;
  --prim-taupe-200: #EDEAE3;
  --prim-taupe-300: #E3DFD6;
  --prim-taupe-400: #BCB49E;
  --prim-taupe-500: #9D937B;
  --prim-taupe-600: #877F68;
  --prim-taupe-700: #6C6451;
  --prim-taupe-800: #4B4435;
  --prim-taupe-900: #322C20;
}
```

### Navy & Navylight (NEW — dark theme palettes)

Dark-theme surfaces (navy) and dark-theme text/icons (navylight). Static primitives — they do not change per theme; the dark theme simply points semantic tokens at them.

```css
:root {
  --prim-navy-50: #33476E;
  --prim-navy-100: #2E4066;
  --prim-navy-200: #2A3A5C;
  --prim-navy-300: #22314F;
  --prim-navy-400: #202C4E;
  --prim-navy-500: #172642;
  --prim-navy-600: #18223A;
  --prim-navy-700: #131C31;
  --prim-navy-800: #101729;
  --prim-navy-900: #0C1222;
  --prim-navy-950: #090E1B;
}
```

```css
:root {
  --prim-navylight-100: #3A485F;
  --prim-navylight-200: #52637F;
  --prim-navylight-300: #697DA0;
  --prim-navylight-400: #889CBF;
  --prim-navylight-500: #9DAFCD;
  --prim-navylight-600: #B3C1DB;
  --prim-navylight-700: #C8D4E9;
  --prim-navylight-800: #D8E1F0;
  --prim-navylight-900: #E9EEF7;
}
```

### Dark status ramps & muted primitives (NEW)

```css
:root {
  --prim-reddark-100: #542427;
  --prim-reddark-200: #3A1B1E;
  --prim-reddark-300: #2C1518;
  --prim-greendark-100: #245234;
  --prim-greendark-200: #1A3A26;
  --prim-greendark-300: #12291C;
  --prim-orangedark-100: #5E3A18;
  --prim-orangedark-200: #472C13;
  --prim-orangedark-300: #33200F;
  --prim-skydark-100: #16304A;
  --prim-skydark-200: #10263C;
  --prim-green-350-muted: #74D791;
  --prim-orange-400-muted: #EA9C62;
  --prim-orange-500-muted: #E68550;
  --prim-red-350-muted: #E5807E;
  --prim-red-400-muted: #E56D66;
  --prim-sky-300-muted: #5CA8E7;
}
```

### Half-step primitives (NEW)

Exact chat/nav values promoted into the ramps:

```css
:root {
  --prim-gray-250: #C0BAB2;
  --prim-gray-350: #A8A49E;
  --prim-taupe-250: #E8E6E0;
  --prim-taupe-350: #DCD8CB;
  --prim-red-250: #FCA5A5;
  --prim-red-350: #F87171;
  --prim-green-350: #4ADE80;
  --prim-sky-250: #38BDF8;
}
```

### Blue (accent)

| Stop | OLD value | NEW value |
|------|-----------|-----------|
| 50 | `#F5F8FF` | *(removed — use blue-100)* |
| 100 | `#EBF0FE` | `#ebf0fe` |
| 200 | `#C8D6FD` | `#c8d6fd` |
| 300 | `#A3BCFC` | `#a5bcfc` |
| 400 | `#9BB3FC` | `#7094fb` |
| 500 | `#7094FB` | `#5a82f9` |
| 600 | `#3A6AF8` | `#3a6af8` |
| 700 | `#295CCC` | `#2952cc` |
| 800 | `#152354` | `#163196` |
| 900 | `#1E3A8A` | `#031e64` |

### Green (success / income)

```css
:root {
  --prim-green-50: #e9fff0;
  --prim-green-100: #a9fdc4;
  --prim-green-200: #68fc97;
  --prim-green-300: #27fb6b;
  --prim-green-400: #1ebf51;
  --prim-green-500: #148338;
  --prim-green-600: #10642b;
  --prim-green-700: #0b461e;
  --prim-green-800: #062811;
  --prim-green-900: #020a04;
}
```

### Red (error / expense)

```css
:root {
  --prim-red-50: #ffeaea;
  --prim-red-100: #fed5d4;
  --prim-red-200: #fdaba9;
  --prim-red-300: #fc807e;
  --prim-red-400: #fb5653;
  --prim-red-500: #fa2c28;
  --prim-red-600: #c82320;
  --prim-red-700: #961a18;
  --prim-red-800: #641210;
  --prim-red-900: #320908;
}
```

### Orange (warning / debt)

```css
:root {
  --prim-orange-50: #fff1e9;
  --prim-orange-100: #fee4d2;
  --prim-orange-200: #fdc9a6;
  --prim-orange-300: #fcad79;
  --prim-orange-400: #fb924d;
  --prim-orange-500: #fa7720;
  --prim-orange-600: #c85f1a;
  --prim-orange-700: #964713;
  --prim-orange-800: #64300d;
  --prim-orange-900: #321806;
}
```

### Sky (savings / info)

```css
:root {
  --prim-sky-50: #ebf6ff;
  --prim-sky-100: #aedcfe;
  --prim-sky-200: #72c2fe;
  --prim-sky-300: #35a8fd;
  --prim-sky-400: #2e90da;
  --prim-sky-500: #2679b6;
  --prim-sky-600: #1f6193;
  --prim-sky-700: #174a6f;
  --prim-sky-800: #10324c;
  --prim-sky-900: #081b28;
}
```

---

## 3. Semantic Color Mapping

Every semantic token is now a **light/dark pair**. Light values below are the `:root` defaults; dark values apply under `[data-theme="dark"]` (§16).

### Backgrounds

| Old token | New token | Light | Dark |
|-----------|-----------|-------|------|
| `--surface-primary` / `#FFFFFF` | `--sem-background-surface` | `#F7F5F0` | `#131C31` |
| `--surface-secondary` / `#F5F5F5` | `--sem-background-main` | `#FFFFFF` | `#101729` |
| `--surface-tertiary` / `#EBEBEB` | `--sem-background-light` | `#F8F7F6` | `#18223A` |

### Text

| Old token | New token | Light | Dark |
|-----------|-----------|-------|------|
| `--text-primary` / `#171717` | `--sem-text-header` | `#0e0e0e` | `#D8E1F0` |
| — | `--sem-text-body` | `#403D3A` | `#B3C1DB` |
| `--text-secondary` / `#525252` | `--sem-text-meta` | `#5E5954` | `#9DAFCD` |
| `--text-tertiary` / `#737373` | `--sem-text-placeholder` | `#716E6A` | `#52637F` |
| `--text-accent` / `#3A6AF8` | `--sem-text-action` | `#3a6af8` | `#5A82F9` |
| `--text-inverse` / `#FFFFFF` | `--sem-text-reverse` | `#ffffff` | `#0E0E0E` |
| — | `--sem-text-error` | `#c82320` | `#F87171` |
| — | `--sem-text-disabled` | `#B5B1AB` | `#3A485F` |
| — | `--sem-text-deposit` | `#148338` | `#4ADE80` |

### Borders

| Old token | New token | Light | Dark |
|-----------|-----------|-------|------|
| `--border-primary` / `#E5E5E5` | `--sem-borders-light` | `#EEEDEB` | `#202C4E` |
| `--border-secondary` / `#D4D4D4` | `--sem-borders-dark` | `#DCD8CB` | `#22314F` |
| `--border-focus` / `#3A6AF8` | `--sem-borders-focus` | `#0e0e0e` | `#7094FB59` |
| — | `--sem-borders-error` | `#c82320` | `#F87171` |

**Important:** the focus ring is **dark** (`prim-gray-900`) in light mode and a translucent blue glow (`#7094FB59`) in dark mode.

### Icons

| Old token | New token | Light | Dark |
|-----------|-----------|-------|------|
| — | `--sem-icons-full` | `#0e0e0e` | `#B3C1DB` |
| — | `--sem-icons-meta` | `#5E5954` | `#9DAFCD` |
| — | `--sem-icons-muted` | `#B5B1AB` | `#3A485F` |
| — | `--sem-icons-action` | `#3a6af8` | `#7094FB` |
| — | `--sem-icons-error` | `#c82320` | `#F87171` |
| — | `--sem-icons-reverse` | `#ffffff` | `#0E0E0E` |

---

## 4. Button Tokens

> **Changed again (2026-08):** the primary button is **blue** (`prim-blue-600`), not charcoal. All button colors below are the current Hemlock values; dark-theme values in comments.

### Primary Button

```css
.btn-primary {
  background: var(--sem-btnPrimaryBg);      /* #3a6af8 · dark #5A82F9 */
  color: var(--sem-btnPrimaryText);         /* #ffffff · dark #000000 */
}
.btn-primary:hover {
  background: var(--sem-btnPrimaryBgHover); /* #2952cc · dark #7094FB */
  color: var(--sem-btnPrimaryTextHover);    /* #ffffff · dark #090E1B */
}
.btn-primary:active {
  background: var(--sem-btnPrimaryBgActive);
  color: var(--sem-btnPrimaryTextActive);
}
.btn-primary:disabled {
  background: var(--sem-btnPrimaryBgDisabled); /* #c8d6fd · dark #163196 */
  color: var(--sem-btnPrimaryTextDisabled);
}
```

### Secondary Button (outline)

```css
.btn-secondary {
  background: transparent;
  border: 1px solid var(--sem-btnSecondaryBorder); /* #a5bcfc · dark #33476E */
  color: var(--sem-btnSecondaryText);              /* #3a6af8 · dark #7094FB */
}
.btn-secondary:hover {
  border-color: var(--sem-btnSecondaryBorderHover);
  color: var(--sem-btnSecondaryTextHover);
}
.btn-secondary:active {
  background: var(--sem-btnSecondaryBgActive);
  border-color: var(--sem-btnSecondaryBorderActive);
  color: var(--sem-btnSecondaryTextActive);
}
.btn-secondary:disabled {
  background: transparent;
  border-color: var(--sem-btnSecondaryBorderDisabled);
  color: var(--sem-btnSecondaryTextDisabled);
}
```

### Destructive Button

```css
.btn-destructive {
  background: var(--sem-btnDestructionBg);      /* #c82320 · dark #C82320 */
  color: var(--sem-btnDestructionText);
}
.btn-destructive:hover {
  background: var(--sem-btnDestructionBgHover);
  color: var(--sem-btnDestructionTextHover);
}
.btn-destructive:active {
  background: var(--sem-btnDestructionBgActive);
  color: var(--sem-btnDestructionTextActive);
}
```

### Link / Text Button

```css
.btn-link {
  color: var(--sem-btnLinkText);          /* #3a6af8 · dark #7094FB */
}
.btn-link:hover {
  color: var(--sem-btnLinkTextHover);
}
.btn-link:active {
  color: var(--sem-btnLinkTextActive);
}
```

---

## 5. Spacing Scale

Replace any old spacing values with this scale:

| Old token | Old value | New token | New value |
|-----------|-----------|-----------|-----------|
| `--space-1` | `4px` | `--spacing-3xs` | `4px` |
| `--space-2` | `8px` | `--spacing-2xs` | `8px` |
| `--space-3` | `12px` | `--spacing-xs` | `12px` |
| `--space-4` | `16px` | `--spacing-sm` | `16px` |
| `--space-5` | `20px` | *(use 24px)* | — |
| `--space-6` | `24px` | `--spacing-md` | `24px` |
| `--space-8` | `32px` | `--spacing-lg` | `32px` |
| `--space-10` | `40px` | `--spacing-xl` | `40px` |
| `--space-12` | `48px` | `--spacing-2xl` | `48px` |

Additional new stops:
```css
:root {
  --spacing-4xs: 2px;
  --spacing-3xs: 4px;
  --spacing-2xs: 8px;
  --spacing-xs: 12px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 40px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 72px;
  --spacing-5xl: 128px;
}
```

---

## 6. Border Radius

The radius scale is significantly larger now:

| Old token | Old value | New token | New value |
|-----------|-----------|-----------|-----------|
| `--radius-sm` | `4px` | `--radius-3xs` | `4px` |
| `--radius-md` | `6px` | `--radius-2xs` | `8px` |
| `--radius-lg` | `8px` | `--radius-2xs` | `8px` |
| `--radius-xl` | `12px` | `--radius-xs` | `12px` |
| `--radius-full` | `9999px` | `--radius-full` | `9999px` |

Full new scale:
```css
:root {
  --radius-none: 0px;
  --radius-4xs: 2px;
  --radius-3xs: 4px;
  --radius-2xs: 8px;
  --radius-xs: 12px;
  --radius-sm: 16px;
  --radius-md: 24px;
  --radius-lg: 32px;
  --radius-xl: 40px;
  --radius-2xl: 48px;
  --radius-3xl: 64px;
  --radius-4xl: 72px;
  --radius-5xl: 128px;
  --radius-full: 9999px;
}
```

**Key change:** What was `border-radius: 6px` (old md) should now be `border-radius: 8px` (`radius-2xs`). Cards that were `8px` should now be `12px` (`radius-xs`). Buttons use `radius-2xs` (8px), not `radius-full` (pill) — unless explicitly pill-shaped.

---

## 7. Shadows

Shadow colors are themed tokens named `--shadow-{size}-color` — no `prim-` prefix, because a value that changes per theme is a semantic, not a primitive. In dark mode the alpha is **lifted** so elevation stays visible on navy.

| Color token | Light | Dark |
|------|-------|------|
| `--shadow-sm-color` | `#00000014` (8%) | `#00000080` (50%) |
| `--shadow-md-color` | `#0000001A` (10%) | `#00000099` (60%) |
| `--shadow-lg-color` | `#0000001F` (12%) | `#000000B3` (70%) |
| `--shadow-overlay-color` | `#00000029` (16%) | `#000000D9` (85%) |

Composite shadows (geometry is theme-invariant; only the color resolves differently):

| Old | New CSS |
|-----|---------|
| `--shadow-sm` | `0 1px 2px var(--shadow-sm-color)` |
| `--shadow-md` | `0 4px 12px var(--shadow-md-color)` |
| `--shadow-lg` | `0 8px 24px var(--shadow-lg-color)` |
| `--shadow-dropdown` | `0 4px 12px var(--shadow-md-color)` (same as md) |
| `--shadow-overlay` | `0 16px 40px var(--shadow-overlay-color)` |

```css
:root {
  --shadow-sm-color: #00000014;
  --shadow-md-color: #0000001A;
  --shadow-lg-color: #0000001F;
  --shadow-overlay-color: #00000029;
  --shadow-sm: 0 1px 2px var(--shadow-sm-color);
  --shadow-md: 0 4px 12px var(--shadow-md-color);
  --shadow-lg: 0 8px 24px var(--shadow-lg-color);
  --shadow-overlay: 0 16px 40px var(--shadow-overlay-color);
}
```

(Dark values for the four colors live in the §16 override block. Scrims are a separate role — `--sem-background-scrim` — not part of the shadow ramp.)

---

## 8. Motion / Transitions

| Old token | Old value | New token | New value |
|-----------|-----------|-----------|-----------|
| `--motion-fast` | `150ms` | `--duration-fast` | `150ms` |
| `--motion-normal` | `250ms` | `--duration-base` | `200ms` |
| `--motion-slow` | `400ms` | `--duration-slow` | `300ms` |

```css
:root {
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --easing-exit: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## 9. Typography Scale

| Size name | Font size | Line height |
|-----------|-----------|-------------|
| `2xs` | `11px` | `14px` |
| `xs` | `12px` | `16px` |
| `sm` | `14px` | `20px` |
| `base` | `16px` | `24px` |
| `md` | `18px` | `28px` |
| `lg` | `20px` | `28px` |
| `xl` | `24px` | `32px` |
| `2xl` | `30px` | `36px` |
| `3xl` | `36px` | `40px` |
| `4xl` | `48px` | `52px` |
| `5xl` | `56px` | `64px` |
| `6xl` | `64px` | `72px` |
| `7xl` | `80px` | `84px` |
| `8xl` | `96px` | `96px` |

**Mapping old → new:**

| Old | Old size | New | New size |
|-----|----------|-----|----------|
| `font.size.xs` | 12px | `xs` | 12px |
| `font.size.sm` | 14px | `sm` | 14px |
| `font.size.md` | 16px | `base` | 16px |
| `font.size.lg` | 18px | `md` | 18px |
| `font.size.xl` | 24px | `xl` | 24px |
| `font.size.2xl` | 30px | `2xl` | 30px |
| `font.size.3xl` | 36px | `3xl` | 36px |
| `font.size.4xl` | 48px | `4xl` | 48px |
| `font.size.5xl` | 60px | `5xl` | 56px ⚠️ |
| `font.size.display` | 64px | `6xl` | 64px |
| `font.size.hero` | 80px | `7xl` | 80px |

⚠️ Note: old 5xl was 60px, new 5xl is 56px. Adjust accordingly.

---

## 10. Z-Index (NEW — add to all projects)

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-popover: 200;
  --z-sticky: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-toast: 600;
  --z-tooltip: 700;
}
```

---

## 11. Navigation Panel Styling

```css
.nav-panel {
  background: var(--sem-navBg);                /* #F7F5F0 · dark #090E1B */
  border-right: 1px solid var(--sem-navBorder); /* #DCD8CB · dark #33476E */
}
.nav-item {
  color: var(--sem-navTextPrimary);            /* #2D2926 · dark #D8E1F0 */
}
.nav-item:hover {
  background: var(--sem-navHoverBg);           /* #EDEAE3 · dark #18223A */
  color: var(--sem-navHoverText);
}
.nav-item.active {
  background: var(--sem-navActiveBg);          /* #DCD8CB · dark #18223A */
}
.nav-item .icon {
  color: var(--sem-navIcon);                   /* #8A8680 · dark #9DAFCD */
}
.nav-item-secondary {
  color: var(--sem-navTextSecondary);          /* #5E5954 · dark #9DAFCD */
}
.nav-divider {
  border-color: var(--sem-navDivider);         /* #E8E6E0 · dark #22314F */
}
```

---

## 12. Chat Panel Styling

```css
.chat-panel {
  background: var(--sem-chatBg);               /* #F7F5F0 · dark #090E1B */
  border-left: 1px solid var(--sem-chatBorder); /* #DCD8CB · dark #33476E */
}
.chat-input {
  background: var(--sem-chatInputBg);          /* #ffffff · dark #090E1B */
  border: 1px solid var(--sem-chatInputBorder);
  color: var(--sem-chatTextPrimary);
}
.chat-input:focus {
  border-color: var(--sem-chatInputBorderActive);
}
.chat-input::placeholder {
  color: var(--sem-chatPlaceholder);           /* #A8A49E · dark #52637F */
}
.chat-send-btn {
  background: var(--sem-chatSendBg);           /* #3a6af8 · dark #5A82F9 — BLUE, not charcoal */
  color: var(--sem-chatSendIcon);
}
.chat-send-btn:hover { background: var(--sem-chatSendBgHover); }
.chat-send-btn:active { background: var(--sem-chatSendBgPressed); }
.chat-send-btn:disabled { background: var(--sem-chatSendBgDisabled); }
.chat-bubble-user {
  background: var(--sem-chatBubbleUser);       /* #F7F5F0 · dark #18223A */
  border: 1px solid var(--sem-chatBubbleUserBorder);
}
.chat-bubble-ai {
  background: var(--sem-chatBubbleAi);         /* transparent in both themes */
}
.chat-divider {
  border-color: var(--sem-chatDivider);        /* #E8E6E0 · dark #131C31 */
}
.chat-chip:hover { background: var(--sem-chatChipHover); }
.chat-chip:active { background: var(--sem-chatChipPressed); }
.chat-text-primary { color: var(--sem-chatTextPrimary); }
.chat-text-secondary { color: var(--sem-chatTextSecondary); }
```

---

## 13. Chart Colors

Categorical palette v5 (`chart-categorical/color-01`…`15`). Light values below; dark overrides are in §16. Assign in this order.

```css
:root {
  --chart-categorical-color-01: #7B96F1; /* chart-categorical/color-01 */
  --chart-categorical-color-02: #89B6F9;
  --chart-categorical-color-03: #95C5FB;
  --chart-categorical-color-04: #74D5D1;
  --chart-categorical-color-05: #51CCD0;
  --chart-categorical-color-06: #19B6CC;
  --chart-categorical-color-07: #B985DE;
  --chart-categorical-color-08: #BAA9F5;
  --chart-categorical-color-09: #BDBBFC;
  --chart-categorical-color-10: #E6B1E5;
  --chart-categorical-color-11: #E59FD4;
  --chart-categorical-color-12: #E37BA8;
  --chart-categorical-color-13: #E2903F;
  --chart-categorical-color-14: #FAA38E;
  --chart-categorical-color-15: #FEB0AF;
}
```

---

## 14. Quick Checklist for Applying Changes

- [ ] Replace all `Cormorant Garamond` → `Noto Serif`
- [ ] Replace all `Inter` → `Heebo`
- [ ] Rename all custom properties: `--color-*` → `--prim-*`, `--colors-*` → `--sem-*`
- [ ] Update gray hex values (green-tint → warm neutrals)
- [ ] Add taupe ramp variables
- [ ] Add navy + navylight ramps (dark theme palettes)
- [ ] Add dark status ramps (`--prim-reddark-*`, `--prim-greendark-*`, `--prim-orangedark-*`, `--prim-skydark-*`) and muted primitives
- [ ] Replace green/red/orange/sky ramps entirely (different color science)
- [ ] Primary button and chat send button are **blue** (`prim-blue-600`), not charcoal
- [ ] Focus ring: dark (`prim-gray-900`) in light mode, translucent blue in dark mode
- [ ] Update all spacing token names (`space-N` → `spacing-Nxs/sm/md/lg/xl`)
- [ ] Update radius values (old scale was much smaller)
- [ ] Shadow colors (`--shadow-*-color`, no `prim-` prefix) are themed: black @ 8/10/12/16% in light, **lifted to 50/60/70/85% in dark** so elevation stays visible on navy
- [ ] Reduce `--motion-normal` from 250ms → 200ms; `--motion-slow` from 400ms → 300ms
- [ ] Add z-index layer tokens
- [ ] Apply nav/chat taupe backgrounds (light) and navy backgrounds (dark)
- [ ] Add the `[data-theme="dark"]` override block (§16)
- [ ] Verify no `#F9FAF9`, `#EEEFEE`, `#D8D9D8` etc. remain (old gray values)

---

## 15. Complete CSS Custom Properties Block

Copy-paste this as your root variables (light theme defaults):

```css
:root {
  /* Fonts */
  --font-primary: 'Heebo', sans-serif;
  --font-secondary: 'Noto Serif', serif;

  /* Primitives (static in both themes) */
  /* Base */
  --prim-base-white: #ffffff;
  --prim-base-black: #000000;

  /* Gray */
  --prim-gray-50: #F8F7F6;
  --prim-gray-100: #EEEDEB;
  --prim-gray-200: #D5D3D0;
  --prim-gray-250: #C0BAB2;
  --prim-gray-300: #B5B1AB;
  --prim-gray-350: #A8A49E;
  --prim-gray-400: #8A8680;
  --prim-gray-500: #716E6A;
  --prim-gray-600: #5E5954;
  --prim-gray-700: #403D3A;
  --prim-gray-800: #2D2926;
  --prim-gray-900: #0e0e0e;

  /* Taupe */
  --prim-taupe-100: #F7F5F0;
  --prim-taupe-200: #EDEAE3;
  --prim-taupe-250: #E8E6E0;
  --prim-taupe-300: #E3DFD6;
  --prim-taupe-350: #DCD8CB;
  --prim-taupe-400: #BCB49E;
  --prim-taupe-500: #9D937B;
  --prim-taupe-600: #877F68;
  --prim-taupe-700: #6C6451;
  --prim-taupe-800: #4B4435;
  --prim-taupe-900: #322C20;

  /* Navy */
  --prim-navy-50: #33476E;
  --prim-navy-100: #2E4066;
  --prim-navy-200: #2A3A5C;
  --prim-navy-300: #22314F;
  --prim-navy-400: #202C4E;
  --prim-navy-500: #172642;
  --prim-navy-600: #18223A;
  --prim-navy-700: #131C31;
  --prim-navy-800: #101729;
  --prim-navy-900: #0C1222;
  --prim-navy-950: #090E1B;

  /* Navylight */
  --prim-navylight-100: #3A485F;
  --prim-navylight-200: #52637F;
  --prim-navylight-300: #697DA0;
  --prim-navylight-400: #889CBF;
  --prim-navylight-500: #9DAFCD;
  --prim-navylight-600: #B3C1DB;
  --prim-navylight-700: #C8D4E9;
  --prim-navylight-800: #D8E1F0;
  --prim-navylight-900: #E9EEF7;

  /* Blue */
  --prim-blue-100: #ebf0fe;
  --prim-blue-200: #c8d6fd;
  --prim-blue-300: #a5bcfc;
  --prim-blue-400: #7094FB;
  --prim-blue-500: #5A82F9;
  --prim-blue-600: #3a6af8;
  --prim-blue-700: #2952cc;
  --prim-blue-800: #163196;
  --prim-blue-900: #031e64;

  /* Red */
  --prim-red-50: #ffeaea;
  --prim-red-100: #fed5d4;
  --prim-red-200: #fdaba9;
  --prim-red-250: #FCA5A5;
  --prim-red-300: #FC807E;
  --prim-red-350: #F87171;
  --prim-red-350-muted: #E5807E;
  --prim-red-400: #fb5653;
  --prim-red-400-muted: #E56D66;
  --prim-red-500: #fa2c28;
  --prim-red-600: #c82320;
  --prim-red-700: #961a18;
  --prim-red-800: #641210;
  --prim-red-900: #320908;

  /* Reddark */
  --prim-reddark-100: #542427;
  --prim-reddark-200: #3A1B1E;
  --prim-reddark-300: #2C1518;

  /* Green */
  --prim-green-50: #e9fff0;
  --prim-green-100: #a9fdc4;
  --prim-green-200: #68fc97;
  --prim-green-300: #27FB6B;
  --prim-green-350: #4ADE80;
  --prim-green-350-muted: #74D791;
  --prim-green-400: #1ebf51;
  --prim-green-500: #148338;
  --prim-green-600: #10642b;
  --prim-green-700: #0b461e;
  --prim-green-800: #062811;
  --prim-green-900: #020a04;

  /* Greendark */
  --prim-greendark-100: #245234;
  --prim-greendark-200: #1A3A26;
  --prim-greendark-300: #12291C;

  /* Orange */
  --prim-orange-50: #fff1e9;
  --prim-orange-100: #fee4d2;
  --prim-orange-200: #fdc9a6;
  --prim-orange-300: #fcad79;
  --prim-orange-400: #FB924D;
  --prim-orange-400-muted: #EA9C62;
  --prim-orange-500: #fa7720;
  --prim-orange-500-muted: #E68550;
  --prim-orange-600: #c85f1a;
  --prim-orange-700: #964713;
  --prim-orange-800: #64300d;
  --prim-orange-900: #321806;

  /* Orangedark */
  --prim-orangedark-100: #5E3A18;
  --prim-orangedark-200: #472C13;
  --prim-orangedark-300: #33200F;

  /* Sky */
  --prim-sky-50: #ebf6ff;
  --prim-sky-100: #aedcfe;
  --prim-sky-200: #72c2fe;
  --prim-sky-250: #38BDF8;
  --prim-sky-300: #35a8fd;
  --prim-sky-300-muted: #5CA8E7;
  --prim-sky-400: #2e90da;
  --prim-sky-500: #2679b6;
  --prim-sky-600: #1f6193;
  --prim-sky-700: #174a6f;
  --prim-sky-800: #10324c;
  --prim-sky-900: #081b28;

  /* Skydark */
  --prim-skydark-100: #16304A;
  --prim-skydark-200: #10263C;

  /* Semantics — light values (overridden by [data-theme="dark"]) */
  --sem-background-action: var(--prim-blue-600);
  --sem-background-disabled: var(--prim-gray-50);
  --sem-background-elevated: var(--prim-base-white);
  --sem-background-error: var(--prim-red-50);
  --sem-background-error-strong: var(--prim-red-200);
  --sem-background-highlight: var(--prim-blue-100);
  --sem-background-hover: var(--prim-gray-50);
  --sem-background-info: var(--prim-sky-50);
  --sem-background-info-strong: var(--prim-sky-100);
  --sem-background-light: var(--prim-gray-50);
  --sem-background-main: var(--prim-base-white);
  --sem-background-muted: var(--prim-gray-200);
  --sem-background-rowHover: var(--prim-taupe-100);
  --sem-background-rowPressed: var(--prim-taupe-200);
  --sem-background-subtle: var(--prim-gray-100);
  --sem-background-success: var(--prim-green-50);
  --sem-background-success-bold: var(--prim-green-600);
  --sem-background-success-soft: var(--prim-green-100);
  --sem-background-success-strong: var(--prim-green-200);
  --sem-background-sunken: var(--prim-taupe-100);
  --sem-background-surface: var(--prim-taupe-100);
  --sem-background-warning: var(--prim-orange-50);
  --sem-background-warning-strong: var(--prim-orange-200);
  --sem-borders-action: var(--prim-blue-600);
  --sem-borders-action-subtle: var(--prim-blue-300);
  --sem-borders-dark: var(--prim-taupe-350);
  --sem-borders-disabled: var(--prim-gray-300);
  --sem-borders-error: var(--prim-red-600);
  --sem-borders-error-strong: var(--prim-red-700);
  --sem-borders-error-subtle: var(--prim-red-100);
  --sem-borders-focus: var(--prim-gray-900);
  --sem-borders-focus-inverted: var(--prim-base-white);
  --sem-borders-hover: var(--prim-gray-400);
  --sem-borders-info: var(--prim-sky-100);
  --sem-borders-light: var(--prim-gray-100);
  --sem-borders-muted: var(--prim-gray-200);
  --sem-borders-strong: var(--prim-gray-250);
  --sem-borders-success: var(--prim-green-100);
  --sem-borders-warning: var(--prim-orange-100);
  --sem-btnDestructionBg: var(--prim-red-600);
  --sem-btnDestructionBgActive: var(--prim-red-700);
  --sem-btnDestructionBgDisabled: var(--prim-gray-200);
  --sem-btnDestructionBgHover: var(--prim-red-500);
  --sem-btnDestructionText: var(--prim-gray-100);
  --sem-btnDestructionTextActive: var(--prim-base-white);
  --sem-btnDestructionTextDisabled: var(--prim-gray-600);
  --sem-btnDestructionTextHover: var(--prim-base-white);
  --sem-btnLinkBg: #00000000;
  --sem-btnLinkBgActive: var(--prim-blue-200);
  --sem-btnLinkBgDisabled: #00000000;
  --sem-btnLinkBgHover: var(--prim-blue-100);
  --sem-btnLinkBorderPressed: var(--prim-blue-700);
  --sem-btnLinkText: var(--prim-blue-600);
  --sem-btnLinkTextActive: var(--prim-blue-800);
  --sem-btnLinkTextDisabled: var(--prim-blue-300);
  --sem-btnLinkTextHover: var(--prim-blue-700);
  --sem-btnLinkTextPressed: var(--prim-blue-800);
  --sem-btnPrimaryBg: var(--prim-blue-600);
  --sem-btnPrimaryBgActive: var(--prim-blue-800);
  --sem-btnPrimaryBgDisabled: var(--prim-blue-200);
  --sem-btnPrimaryBgHover: var(--prim-blue-700);
  --sem-btnPrimaryInvertedBg: var(--prim-base-white);
  --sem-btnPrimaryInvertedBgActive: var(--prim-blue-200);
  --sem-btnPrimaryInvertedBgDisabled: var(--prim-base-white);
  --sem-btnPrimaryInvertedBgHover: var(--prim-blue-100);
  --sem-btnPrimaryInvertedBorder: var(--prim-blue-300);
  --sem-btnPrimaryInvertedBorderActive: var(--prim-blue-300);
  --sem-btnPrimaryInvertedBorderDisabled: var(--prim-blue-100);
  --sem-btnPrimaryInvertedBorderHover: var(--prim-blue-300);
  --sem-btnPrimaryInvertedText: var(--prim-blue-600);
  --sem-btnPrimaryInvertedTextActive: var(--prim-blue-700);
  --sem-btnPrimaryInvertedTextDisabled: var(--prim-blue-300);
  --sem-btnPrimaryInvertedTextHover: var(--prim-blue-700);
  --sem-btnPrimaryText: var(--prim-base-white);
  --sem-btnPrimaryTextActive: var(--prim-base-white);
  --sem-btnPrimaryTextDisabled: var(--prim-base-white);
  --sem-btnPrimaryTextHover: var(--prim-base-white);
  --sem-btnSecondaryBg: #00000000;
  --sem-btnSecondaryBgActive: var(--prim-blue-200);
  --sem-btnSecondaryBgDisabled: #00000000;
  --sem-btnSecondaryBgHover: var(--prim-blue-100);
  --sem-btnSecondaryBorder: var(--prim-blue-300);
  --sem-btnSecondaryBorderActive: var(--prim-blue-300);
  --sem-btnSecondaryBorderDisabled: var(--prim-blue-100);
  --sem-btnSecondaryBorderHover: var(--prim-blue-300);
  --sem-btnSecondaryBorderPressed: var(--prim-blue-300);
  --sem-btnSecondaryInvertedBg: #00000000;
  --sem-btnSecondaryInvertedBgActive: #ffffff1a;
  --sem-btnSecondaryInvertedBgDisabled: #00000000;
  --sem-btnSecondaryInvertedBgHover: #ffffff1a;
  --sem-btnSecondaryInvertedBorder: var(--prim-gray-200);
  --sem-btnSecondaryInvertedBorderActive: #00000000;
  --sem-btnSecondaryInvertedBorderDisabled: var(--prim-gray-300);
  --sem-btnSecondaryInvertedBorderHover: var(--prim-base-white);
  --sem-btnSecondaryInvertedText: var(--prim-base-white);
  --sem-btnSecondaryInvertedTextActive: var(--prim-gray-200);
  --sem-btnSecondaryInvertedTextDisabled: var(--prim-gray-300);
  --sem-btnSecondaryInvertedTextHover: var(--prim-base-white);
  --sem-btnSecondaryText: var(--prim-blue-600);
  --sem-btnSecondaryTextActive: var(--prim-blue-700);
  --sem-btnSecondaryTextDisabled: var(--prim-blue-300);
  --sem-btnSecondaryTextHover: var(--prim-blue-700);
  --sem-cardShadow: var(--shadow-sm-color);     /* resolves per theme via the shadow color */
  --sem-chatBg: var(--prim-taupe-100);
  --sem-chatBorder: var(--prim-taupe-350);
  --sem-chatBubbleAi: #FFFFFF00;
  --sem-chatBubbleUser: var(--prim-taupe-100);
  --sem-chatBubbleUserBorder: var(--prim-taupe-350);
  --sem-chatChipHover: var(--prim-taupe-200);
  --sem-chatChipPressed: var(--prim-taupe-300);
  --sem-chatCloseBorder: var(--prim-blue-300);
  --sem-chatCloseHoverBg: var(--prim-blue-100);
  --sem-chatCloseIcon: var(--prim-blue-600);
  --sem-chatClosePressedBg: var(--prim-blue-200);
  --sem-chatClosePressedIcon: var(--prim-blue-700);
  --sem-chatDivider: var(--prim-taupe-250);
  --sem-chatIcon: var(--prim-gray-600);
  --sem-chatInputBg: var(--sem-background-main);
  --sem-chatInputBorder: var(--prim-taupe-250);
  --sem-chatInputBorderActive: var(--prim-gray-250);
  --sem-chatInputBorderRecording: var(--prim-blue-600);
  --sem-chatPlaceholder: var(--prim-gray-350);
  --sem-chatRecordingDot: var(--prim-blue-600);
  --sem-chatSendBg: var(--sem-btnPrimaryBg);
  --sem-chatSendBgDisabled: var(--sem-btnPrimaryBgDisabled);
  --sem-chatSendBgHover: var(--sem-btnPrimaryBgHover);
  --sem-chatSendBgPressed: var(--sem-btnPrimaryBgActive);
  --sem-chatSendIcon: var(--sem-btnPrimaryText);
  --sem-chatShadow: #00000000;                  /* light is explicitly none; dark gets a blue glow (§16) */
  --sem-chatStopBg: var(--sem-btnPrimaryBg);
  --sem-chatStopBgHover: var(--sem-btnPrimaryBgHover);
  --sem-chatStopBgPressed: var(--sem-btnPrimaryBgActive);
  --sem-chatStopIcon: var(--sem-btnPrimaryText);
  --sem-chatTextPrimary: var(--prim-gray-800);
  --sem-chatTextSecondary: var(--prim-gray-600);
  --sem-chatVoiceActiveBg: var(--prim-blue-600);
  --sem-chatVoiceActiveIcon: var(--sem-btnPrimaryText);
  --sem-chatVoiceBgDisabled: var(--sem-btnPrimaryBgDisabled);
  --sem-chatVoiceBorder: var(--prim-blue-300);
  --sem-chatVoiceCancelIcon: var(--prim-gray-400);
  --sem-chatVoiceHoverBg: var(--prim-blue-100);
  --sem-chatVoiceIcon: var(--prim-blue-600);
  --sem-chatVoicePressedBg: var(--prim-blue-200);
  --sem-chatVoicePressedIcon: var(--prim-blue-700);
  --sem-chatVoicePulse: #3A6AF828;
  --sem-chatVoiceTimer: var(--prim-gray-600);
  --sem-chatVoiceWaveform: var(--prim-blue-400);
  --sem-dragHandle: var(--prim-gray-900);
  --sem-icons-action: var(--prim-blue-600);
  --sem-icons-error: var(--prim-red-600);
  --sem-icons-error-soft: var(--prim-red-400);
  --sem-icons-full: var(--prim-gray-900);
  --sem-icons-info: var(--prim-sky-300);
  --sem-icons-info-strong: var(--prim-sky-400);
  --sem-icons-meta: var(--prim-gray-600);
  --sem-icons-muted: var(--prim-gray-300);
  --sem-icons-reverse: var(--prim-base-white);
  --sem-icons-subtle: var(--prim-gray-400);
  --sem-icons-success: var(--prim-green-400);
  --sem-icons-success-strong: var(--prim-green-600);
  --sem-icons-warning: var(--prim-orange-400);
  --sem-icons-warning-strong: var(--prim-orange-600);
  --sem-navActiveBg: var(--prim-taupe-350);
  --sem-navBg: var(--prim-taupe-100);
  --sem-navBorder: var(--prim-taupe-350);
  --sem-navDivider: var(--prim-taupe-250);
  --sem-navHoverBg: var(--prim-taupe-200);
  --sem-navHoverText: var(--prim-gray-800);
  --sem-navIcon: var(--prim-gray-400);
  --sem-navPressedBg: var(--prim-taupe-300);
  --sem-navSettingsHoverBg: var(--prim-blue-100);
  --sem-navSettingsIcon: var(--prim-blue-600);
  --sem-navSettingsPressedBg: var(--prim-blue-200);
  --sem-navSettingsPressedIcon: var(--prim-blue-700);
  --sem-navShadow: var(--sem-chatShadow);       /* none in light, same as chat (Sep 28) */
  --sem-navTextDisabled: var(--prim-gray-300);
  --sem-navTextPrimary: var(--prim-gray-800);
  --sem-navTextSecondary: var(--prim-gray-600);
  --sem-navToggleBg: var(--sem-btnPrimaryInvertedBg);
  --sem-navToggleBorder: var(--prim-blue-300);
  --sem-navToggleHoverBg: var(--prim-blue-100);
  --sem-navToggleHoverBorder: var(--prim-blue-300);
  --sem-navToggleIcon: var(--prim-blue-600);
  --sem-navTogglePressedBg: var(--prim-blue-200);
  --sem-navTogglePressedBorder: var(--prim-blue-300);
  --sem-navTogglePressedIcon: var(--prim-blue-700);
  --sem-paginationDot: var(--prim-gray-200);
  --sem-paginationDotActive: var(--prim-gray-700);
  --sem-progressFill: var(--sem-btnPrimaryBgActive);
  --sem-scrollbarThumb: var(--prim-gray-300);
  --sem-sliderAccent: var(--prim-blue-600);
  --sem-sliderAccentDisabled: var(--prim-gray-300);
  --sem-sliderTrack: var(--prim-gray-200);
  --sem-tagBg: var(--prim-blue-100);
  --sem-tagBorder: var(--prim-blue-300);
  --sem-tagText: var(--prim-blue-700);
  --sem-text-action: var(--prim-blue-600);
  --sem-text-body: var(--prim-gray-700);
  --sem-text-body-error: var(--prim-red-800);
  --sem-text-deposit: var(--prim-green-500);
  --sem-text-disabled: var(--prim-gray-300);
  --sem-text-error: var(--prim-red-600);
  --sem-text-error-body-strong: var(--prim-red-700);
  --sem-text-error-title: var(--prim-red-600);
  --sem-text-header: var(--prim-gray-900);
  --sem-text-info-title: var(--prim-sky-600);
  --sem-text-meta: var(--prim-gray-600);
  --sem-text-placeholder: var(--prim-gray-500);
  --sem-text-reverse: var(--prim-base-white);
  --sem-text-strong: var(--prim-gray-800);
  --sem-text-subtle: var(--prim-gray-400);
  --sem-text-success-body: var(--prim-green-700);
  --sem-text-success-title: var(--prim-green-600);
  --sem-text-warning-body: var(--prim-orange-700);
  --sem-text-warning-title: var(--prim-orange-600);
  --sem-toggleKnob: var(--prim-base-white);
  --sem-toggleKnobOn: var(--prim-blue-600);
  --sem-toggleLoadingTrack: var(--prim-gray-100);
  --sem-toggleTrackOff: var(--prim-taupe-200);
  --sem-toggleTrackOn: var(--prim-blue-100);

  /* Spacing */
  --spacing-4xs: 2px;
  --spacing-3xs: 4px;
  --spacing-2xs: 8px;
  --spacing-xs: 12px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 40px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  --spacing-4xl: 72px;
  --spacing-5xl: 128px;

  /* Radius */
  --radius-none: 0px;
  --radius-4xs: 2px;
  --radius-3xs: 4px;
  --radius-2xs: 8px;
  --radius-xs: 12px;
  --radius-sm: 16px;
  --radius-md: 24px;
  --radius-lg: 32px;
  --radius-xl: 40px;
  --radius-2xl: 48px;
  --radius-3xl: 64px;
  --radius-4xl: 72px;
  --radius-5xl: 128px;
  --radius-full: 9999px;

  /* Shadows (colors are themed — see dark block) */
  --shadow-sm-color: #00000014;
  --shadow-md-color: #0000001A;
  --shadow-lg-color: #0000001F;
  --shadow-overlay-color: #00000029;
  --shadow-sm: 0 1px 2px var(--shadow-sm-color);
  --shadow-md: 0 4px 12px var(--shadow-md-color);
  --shadow-lg: 0 8px 24px var(--shadow-lg-color);
  --shadow-overlay: 0 16px 40px var(--shadow-overlay-color);

  /* Motion */
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
  --easing-standard: cubic-bezier(0.2, 0, 0, 1);
  --easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --easing-exit: cubic-bezier(0.4, 0, 1, 1);

  /* Z-Index */
  --z-base: 0;
  --z-dropdown: 100;
  --z-popover: 200;
  --z-sticky: 300;
  --z-overlay: 400;
  --z-modal: 500;
  --z-toast: 600;
  --z-tooltip: 700;

  /* Chart Categorical — palette v5, chart-categorical/color-01..15 */
  --chart-categorical-color-01: #7B96F1;
  --chart-categorical-color-02: #89B6F9;
  --chart-categorical-color-03: #95C5FB;
  --chart-categorical-color-04: #74D5D1;
  --chart-categorical-color-05: #51CCD0;
  --chart-categorical-color-06: #19B6CC;
  --chart-categorical-color-07: #B985DE;
  --chart-categorical-color-08: #BAA9F5;
  --chart-categorical-color-09: #BDBBFC;
  --chart-categorical-color-10: #E6B1E5;
  --chart-categorical-color-11: #E59FD4;
  --chart-categorical-color-12: #E37BA8;
  --chart-categorical-color-13: #E2903F;
  --chart-categorical-color-14: #FAA38E;
  --chart-categorical-color-15: #FEB0AF;
}
```

---

## 16. Dark Theme Override Block (NEW)

The navy dark theme. Apply by setting `data-theme="dark"` on `<html>` or `<body>`. Only semantic tokens (and the four shadow colors) change — primitives stay untouched.

```css
[data-theme="dark"] {
  --sem-background-action: var(--prim-blue-500);
  --sem-background-disabled: var(--prim-navy-700);
  --sem-background-elevated: var(--prim-navy-600);
  --sem-background-error: var(--prim-reddark-200);
  --sem-background-error-strong: var(--prim-reddark-100);
  --sem-background-highlight: var(--prim-skydark-100);
  --sem-background-hover: var(--prim-navy-500);
  --sem-background-info: var(--prim-skydark-200);
  --sem-background-info-strong: var(--prim-skydark-100);
  --sem-background-light: var(--prim-navy-600);
  --sem-background-main: var(--prim-navy-800);
  --sem-background-muted: var(--prim-navy-50);
  --sem-background-rowHover: var(--prim-navy-500);
  --sem-background-rowPressed: var(--prim-navy-400);
  --sem-background-subtle: var(--prim-navy-600);
  --sem-background-success: var(--prim-greendark-300);
  --sem-background-success-bold: var(--prim-green-500);
  --sem-background-success-soft: var(--prim-greendark-200);
  --sem-background-success-strong: var(--prim-greendark-100);
  --sem-background-sunken: var(--prim-navy-900);
  --sem-background-surface: var(--prim-navy-700);
  --sem-background-warning: var(--prim-orangedark-300);
  --sem-background-warning-strong: var(--prim-orangedark-100);
  --sem-borders-action: var(--prim-blue-500);
  --sem-borders-action-subtle: var(--prim-navy-50);
  --sem-borders-dark: var(--prim-navy-300);
  --sem-borders-disabled: var(--prim-navylight-100);
  --sem-borders-error: var(--prim-red-350);
  --sem-borders-error-strong: var(--prim-red-250);
  --sem-borders-error-subtle: var(--prim-reddark-100);
  --sem-borders-focus: #7094FB59;
  --sem-borders-focus-inverted: var(--prim-gray-900);
  --sem-borders-hover: var(--prim-navy-50);
  --sem-borders-info: var(--prim-skydark-100);
  --sem-borders-light: var(--prim-navy-400);
  --sem-borders-muted: var(--prim-navy-200);
  --sem-borders-strong: var(--prim-navy-50);
  --sem-borders-success: var(--prim-greendark-100);
  --sem-borders-warning: var(--prim-orangedark-100);
  --sem-btnDestructionBgDisabled: var(--prim-navy-300);
  --sem-btnDestructionTextDisabled: var(--prim-navylight-100);
  --sem-btnLinkBgActive: var(--prim-navy-400);
  --sem-btnLinkBgHover: var(--prim-navy-500);
  --sem-btnLinkBorderPressed: var(--prim-blue-500);
  --sem-btnLinkText: var(--prim-blue-400);
  --sem-btnLinkTextActive: var(--prim-blue-500);
  --sem-btnLinkTextDisabled: var(--prim-navylight-100);
  --sem-btnLinkTextHover: var(--prim-blue-300);
  --sem-btnLinkTextPressed: var(--prim-blue-500);
  --sem-btnPrimaryBg: var(--prim-blue-500);
  --sem-btnPrimaryBgActive: var(--prim-blue-600);
  --sem-btnPrimaryBgDisabled: var(--prim-blue-800);
  --sem-btnPrimaryBgHover: var(--prim-blue-400);
  --sem-btnPrimaryInvertedBg: var(--prim-navy-700);
  --sem-btnPrimaryInvertedBgActive: var(--prim-navy-400);
  --sem-btnPrimaryInvertedBgDisabled: var(--prim-navy-700);
  --sem-btnPrimaryInvertedBgHover: var(--prim-navy-500);
  --sem-btnPrimaryInvertedBorder: var(--prim-navy-50);
  --sem-btnPrimaryInvertedBorderActive: var(--prim-navy-50);
  --sem-btnPrimaryInvertedBorderDisabled: var(--prim-navy-300);
  --sem-btnPrimaryInvertedBorderHover: var(--prim-blue-500);
  --sem-btnPrimaryInvertedText: var(--prim-blue-400);
  --sem-btnPrimaryInvertedTextActive: var(--prim-blue-300);
  --sem-btnPrimaryInvertedTextDisabled: var(--prim-navylight-100);
  --sem-btnPrimaryInvertedTextHover: var(--prim-blue-300);
  --sem-btnPrimaryText: var(--prim-base-black);
  --sem-btnPrimaryTextActive: var(--prim-base-black);
  --sem-btnPrimaryTextDisabled: var(--prim-blue-500);
  --sem-btnPrimaryTextHover: var(--prim-navy-950);
  --sem-btnSecondaryBgActive: var(--prim-navy-400);
  --sem-btnSecondaryBgHover: var(--prim-navy-500);
  --sem-btnSecondaryBorder: var(--prim-navy-50);
  --sem-btnSecondaryBorderActive: var(--prim-navy-50);
  --sem-btnSecondaryBorderDisabled: var(--prim-navy-300);
  --sem-btnSecondaryBorderHover: var(--prim-blue-500);
  --sem-btnSecondaryBorderPressed: var(--prim-blue-500);
  --sem-btnSecondaryText: var(--prim-blue-400);
  --sem-btnSecondaryTextActive: var(--prim-blue-300);
  --sem-btnSecondaryTextDisabled: var(--prim-navylight-100);
  --sem-btnSecondaryTextHover: var(--prim-blue-300);
  --sem-chatBg: var(--prim-navy-950);
  --sem-chatBorder: var(--prim-navy-50);
  --sem-chatBubbleUser: var(--prim-navy-600);
  --sem-chatBubbleUserBorder: #00000000;
  --sem-chatChipHover: var(--prim-navy-500);
  --sem-chatChipPressed: var(--prim-navy-400);
  --sem-chatCloseBorder: var(--prim-navy-50);
  --sem-chatCloseHoverBg: var(--prim-navy-500);
  --sem-chatCloseIcon: var(--prim-blue-400);
  --sem-chatClosePressedBg: var(--prim-navy-400);
  --sem-chatClosePressedIcon: var(--prim-blue-300);
  --sem-chatDivider: var(--prim-navy-700);
  --sem-chatIcon: var(--prim-blue-300);
  --sem-chatInputBg: var(--prim-navy-950);
  --sem-chatInputBorder: var(--prim-navy-500);
  --sem-chatInputBorderActive: var(--prim-navy-50);
  --sem-chatInputBorderRecording: var(--prim-blue-500);
  --sem-chatPlaceholder: var(--prim-navylight-200);
  --sem-chatRecordingDot: var(--prim-blue-500);
  --sem-chatSendBg: var(--sem-btnPrimaryBg);
  --sem-chatSendBgDisabled: var(--sem-btnPrimaryBgDisabled);
  --sem-chatSendBgHover: var(--sem-btnPrimaryBgHover);
  --sem-chatSendBgPressed: var(--sem-btnPrimaryBgActive);
  --sem-chatSendIcon: var(--sem-btnPrimaryText);
  --sem-chatShadow: #9BB3FC24;
  --sem-chatStopBg: var(--sem-btnPrimaryBg);
  --sem-chatStopBgHover: var(--sem-btnPrimaryBgHover);
  --sem-chatStopBgPressed: var(--sem-btnPrimaryBgActive);
  --sem-chatStopIcon: var(--sem-btnPrimaryText);
  --sem-chatTextPrimary: var(--prim-blue-100);
  --sem-chatTextSecondary: var(--prim-navylight-600);
  --sem-chatVoiceActiveBg: var(--sem-btnPrimaryBg);
  --sem-chatVoiceActiveIcon: var(--sem-btnPrimaryText);
  --sem-chatVoiceBgDisabled: #00000000;
  --sem-chatVoiceBorder: var(--prim-navy-50);
  --sem-chatVoiceCancelIcon: var(--prim-navylight-400);
  --sem-chatVoiceHoverBg: var(--prim-navy-500);
  --sem-chatVoiceIcon: var(--prim-blue-400);
  --sem-chatVoicePressedBg: var(--prim-navy-400);
  --sem-chatVoicePressedIcon: var(--prim-blue-300);
  --sem-chatVoicePulse: #7094FB28;
  --sem-chatVoiceTimer: var(--prim-navylight-500);
  --sem-dragHandle: var(--prim-navylight-600);
  --sem-icons-action: var(--prim-blue-400);
  --sem-icons-error: var(--prim-red-350);
  --sem-icons-error-soft: var(--prim-red-350-muted);
  --sem-icons-full: var(--prim-navylight-600);
  --sem-icons-info: var(--prim-sky-250);
  --sem-icons-info-strong: var(--prim-sky-300);
  --sem-icons-meta: var(--prim-navylight-500);
  --sem-icons-muted: var(--prim-navylight-100);
  --sem-icons-reverse: var(--prim-gray-900);
  --sem-icons-subtle: var(--prim-navylight-200);
  --sem-icons-success: var(--prim-green-350);
  --sem-icons-success-strong: var(--prim-green-300);
  --sem-icons-warning-strong: var(--prim-orange-500-muted);
  --sem-navActiveBg: var(--prim-navy-600);
  --sem-navBg: var(--prim-navy-950);
  --sem-navBorder: var(--prim-navy-50);         /* same as chat border (Sep 28) */
  --sem-navDivider: var(--prim-navy-300);
  --sem-navHoverBg: var(--prim-navy-600);
  --sem-navHoverText: var(--prim-navylight-800);
  --sem-navIcon: var(--prim-navylight-500);
  --sem-navPressedBg: var(--prim-navy-400);
  --sem-navSettingsHoverBg: var(--prim-navy-500);
  --sem-navSettingsIcon: var(--prim-blue-400);
  --sem-navSettingsPressedBg: var(--prim-navy-400);
  --sem-navSettingsPressedIcon: var(--prim-blue-300);
  --sem-navShadow: var(--sem-chatShadow);       /* same blue glow as chat (Sep 28) */
  --sem-navTextDisabled: var(--prim-navylight-100);
  --sem-navTextPrimary: var(--prim-navylight-800);
  --sem-navTextSecondary: var(--prim-navylight-500);
  --sem-navToggleBg: var(--prim-navy-600);
  --sem-navToggleBorder: var(--prim-navy-50);
  --sem-navToggleHoverBg: var(--prim-navy-500);
  --sem-navToggleHoverBorder: var(--prim-navy-50);
  --sem-navToggleIcon: var(--prim-blue-400);
  --sem-navTogglePressedBg: var(--prim-navy-400);
  --sem-navTogglePressedBorder: var(--prim-navy-50);
  --sem-navTogglePressedIcon: var(--prim-blue-300);
  --sem-paginationDot: var(--prim-navy-300);
  --sem-paginationDotActive: var(--prim-navylight-600);
  --sem-progressFill: var(--sem-btnPrimaryBgActive);
  --sem-scrollbarThumb: var(--prim-navy-300);
  --sem-sliderAccent: var(--prim-blue-400);
  --sem-sliderAccentDisabled: var(--prim-navy-50);
  --sem-sliderTrack: var(--prim-navy-300);
  --sem-tagBg: var(--prim-blue-900);
  --sem-tagBorder: var(--prim-navy-50);
  --sem-tagText: var(--prim-blue-300);
  --sem-text-action: var(--prim-blue-500);
  --sem-text-body: var(--prim-navylight-600);
  --sem-text-body-error: var(--prim-red-250);
  --sem-text-deposit: var(--prim-green-350);
  --sem-text-disabled: var(--prim-navylight-100);
  --sem-text-error: var(--prim-red-350);
  --sem-text-error-body-strong: var(--prim-red-250);
  --sem-text-error-title: var(--prim-red-350);
  --sem-text-header: var(--prim-navylight-800);
  --sem-text-info-title: var(--prim-sky-250);
  --sem-text-meta: var(--prim-navylight-500);
  --sem-text-placeholder: var(--prim-navylight-200);
  --sem-text-reverse: var(--prim-gray-900);
  --sem-text-strong: var(--prim-navylight-800);
  --sem-text-subtle: var(--prim-navylight-200);
  --sem-text-success-body: var(--prim-green-350-muted);
  --sem-text-success-title: var(--prim-green-350);
  --sem-text-warning-body: var(--prim-orange-400-muted);
  --sem-text-warning-title: var(--prim-orange-400);
  --sem-toggleKnobOn: var(--prim-blue-400);
  --sem-toggleLoadingTrack: var(--prim-navy-600);
  --sem-toggleTrackOff: var(--prim-navy-500);
  --sem-toggleTrackOn: var(--prim-blue-900);

  /* Chart categorical — palette v5 dark (chart-categorical/color-01..15) */
  --chart-categorical-color-01: #7993EE;
  --chart-categorical-color-02: #86B3F5;
  --chart-categorical-color-03: #93C2F8;
  --chart-categorical-color-04: #71D2CE;
  --chart-categorical-color-05: #4FCACE;
  --chart-categorical-color-06: #1ABAD0;
  --chart-categorical-color-07: #B682DB;
  --chart-categorical-color-08: #B7A6F2;
  --chart-categorical-color-09: #BBB8F9;
  --chart-categorical-color-10: #E3AEE2;
  --chart-categorical-color-11: #E39CD1;
  --chart-categorical-color-12: #E27BA7;
  --chart-categorical-color-13: #E59342;
  --chart-categorical-color-14: #F8A18D;
  --chart-categorical-color-15: #FBADAC;

  /* Themed shadow colors — lifted black so elevation reads on navy */
  --shadow-sm-color: #00000080;
  --shadow-md-color: #00000099;
  --shadow-lg-color: #000000B3;
  --shadow-overlay-color: #000000D9;
}
```
