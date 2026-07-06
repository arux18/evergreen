# Hemlock Design System — HTML/CSS Handoff

> **Purpose:** Apply these changes to any HTML/CSS that references the old Evergreen design system tokens.
> **Source of truth:** `hemlock-library.lib.pen`
> **Date:** 2026-07-06

---

## 1. Font Family Changes

| Old | New | CSS |
|-----|-----|-----|
| `Cormorant Garamond` | `Noto Serif` | `font-family: 'Noto Serif', serif;` |
| `Inter` (if used anywhere) | `Heebo` | `font-family: 'Heebo', sans-serif;` |

**Rule:** Heebo is the only sans-serif. Noto Serif is the only serif. No other fonts.

```css
:root {
  --font-family-primary: 'Heebo', sans-serif;
  --font-family-secondary: 'Noto Serif', serif;
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
  --color-taupe-100: #F7F5F0;
  --color-taupe-200: #EDEAE3;
  --color-taupe-300: #E3DFD6;
  --color-taupe-400: #BCB49E;
  --color-taupe-500: #9D937B;
  --color-taupe-600: #877F68;
  --color-taupe-700: #6C6451;
  --color-taupe-800: #4B4435;
  --color-taupe-900: #322C20;
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
  --color-green-50: #e9fff0;
  --color-green-100: #a9fdc4;
  --color-green-200: #68fc97;
  --color-green-300: #27fb6b;
  --color-green-400: #1ebf51;
  --color-green-500: #148338;
  --color-green-600: #10642b;
  --color-green-700: #0b461e;
  --color-green-800: #062811;
  --color-green-900: #020a04;
}
```

### Red (error / expense)

```css
:root {
  --color-red-50: #ffeaea;
  --color-red-100: #fed5d4;
  --color-red-200: #fdaba9;
  --color-red-300: #fc807e;
  --color-red-400: #fb5653;
  --color-red-500: #fa2c28;
  --color-red-600: #c82320;
  --color-red-700: #961a18;
  --color-red-800: #641210;
  --color-red-900: #320908;
}
```

### Orange (warning / debt)

```css
:root {
  --color-orange-50: #fff1e9;
  --color-orange-100: #fee4d2;
  --color-orange-200: #fdc9a6;
  --color-orange-300: #fcad79;
  --color-orange-400: #fb924d;
  --color-orange-500: #fa7720;
  --color-orange-600: #c85f1a;
  --color-orange-700: #964713;
  --color-orange-800: #64300d;
  --color-orange-900: #321806;
}
```

### Sky (savings / info)

```css
:root {
  --color-sky-50: #ebf6ff;
  --color-sky-100: #aedcfe;
  --color-sky-200: #72c2fe;
  --color-sky-300: #35a8fd;
  --color-sky-400: #2e90da;
  --color-sky-500: #2679b6;
  --color-sky-600: #1f6193;
  --color-sky-700: #174a6f;
  --color-sky-800: #10324c;
  --color-sky-900: #081b28;
}
```

---

## 3. Semantic Color Mapping

### Backgrounds

| Old token | New token | New value |
|-----------|-----------|-----------|
| `--surface-primary` / `#FFFFFF` | `--colors-background-surface` | `#ffffff` |
| `--surface-secondary` / `#F5F5F5` | `--colors-background-main` | `#F7F5F0` (taupe-100) |
| `--surface-tertiary` / `#EBEBEB` | `--colors-background-light` | `#F8F7F6` (gray-50) |

### Text

| Old token | New token | New value |
|-----------|-----------|-----------|
| `--text-primary` / `#171717` | `--colors-text-header` | `#0e0e0e` (gray-900) |
| — | `--colors-text-body` | `#403D3A` (gray-700) |
| `--text-secondary` / `#525252` | `--colors-text-meta` | `#5E5954` (gray-600) |
| `--text-tertiary` / `#737373` | `--colors-text-placeholder` | `#B5B1AB` (gray-300) |
| `--text-accent` / `#3A6AF8` | `--colors-text-action` | `#3a6af8` (blue-600) |
| `--text-inverse` / `#FFFFFF` | `--colors-text-reverse` | `#ffffff` |
| — | `--colors-text-error` | `#c82320` (red-600) |
| — | `--colors-text-disabled` | `#B5B1AB` (gray-300) |
| — | `--colors-text-deposit` | `#148338` (green-500) |

### Borders

| Old token | New token | New value |
|-----------|-----------|-----------|
| `--border-primary` / `#E5E5E5` | `--colors-borders-light` | `#EEEDEB` (gray-100) |
| `--border-secondary` / `#D4D4D4` | `--colors-borders-dark` | `#D5D3D0` (gray-200) |
| `--border-focus` / `#3A6AF8` | `--colors-borders-focus` | `#0e0e0e` (gray-900) |
| — | `--colors-borders-error` | `#c82320` (red-600) |

**Important:** Focus ring is now **dark** (`gray-900`) not blue.

### Icons

```css
:root {
  --colors-icons-full: #0e0e0e;    /* gray-900 — primary */
  --colors-icons-meta: #5E5954;    /* gray-600 — secondary */
  --colors-icons-muted: #B5B1AB;   /* gray-300 — disabled */
  --colors-icons-action: #3a6af8;  /* blue-600 — interactive */
  --colors-icons-error: #c82320;   /* red-600 — error */
  --colors-icons-reverse: #ffffff; /* white — on dark bg */
}
```

---

## 4. Button Tokens

### Primary Button (was blue, NOW dark/charcoal)

```css
.btn-primary {
  background: #0e0e0e;      /* gray-900 (was blue-600) */
  color: #EEEDEB;           /* gray-100 */
}
.btn-primary:hover {
  background: #2D2926;      /* gray-800 */
  color: #ffffff;
}
.btn-primary:active {
  background: #403D3A;      /* gray-700 */
  color: #ffffff;
}
.btn-primary:disabled {
  background: #D5D3D0;      /* gray-200 */
  color: #8A8680;           /* gray-400 */
}
```

### Secondary Button (outline)

```css
.btn-secondary {
  background: transparent;
  border: 1px solid #D5D3D0;  /* gray-200 */
  color: #2D2926;              /* gray-800 */
}
.btn-secondary:hover {
  border-color: #5E5954;       /* gray-600 */
  color: #2D2926;
}
.btn-secondary:active {
  background: #EEEDEB;        /* gray-100 */
  border-color: #EEEDEB;
  color: #403D3A;             /* gray-700 */
}
.btn-secondary:disabled {
  background: transparent;
  border-color: #D5D3D0;      /* gray-200 */
  color: #8A8680;             /* gray-400 */
}
```

### Destructive Button

```css
.btn-destructive {
  background: #c82320;      /* red-600 */
  color: #EEEDEB;           /* gray-100 */
}
.btn-destructive:hover {
  background: #fa2c28;      /* red-500 */
  color: #ffffff;
}
.btn-destructive:active {
  background: #961a18;      /* red-700 */
  color: #ffffff;
}
```

### Link / Text Button

```css
.btn-link {
  color: #3a6af8;           /* blue-600 */
}
.btn-link:hover {
  color: #2952cc;           /* blue-700 */
}
.btn-link:active {
  color: #2679b6;           /* sky-500 */
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

| Old | New CSS |
|-----|---------|
| `--shadow-sm` | `0 1px 2px #00000014` |
| `--shadow-md` | `0 4px 12px #0000001A` |
| `--shadow-lg` | `0 8px 24px #0000001F` |
| `--shadow-dropdown` | `0 4px 12px #0000001A` (same as md) |
| `--shadow-overlay` | `0 16px 40px #00000029` |

```css
:root {
  --shadow-sm: 0 1px 2px #00000014;
  --shadow-md: 0 4px 12px #0000001A;
  --shadow-lg: 0 8px 24px #0000001F;
  --shadow-overlay: 0 16px 40px #00000029;
}
```

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
  background: #F7F5F0;          /* taupe-100 */
  border-right: 1px solid #E3DFD6; /* taupe-300 */
}
.nav-item {
  color: #2D2926;               /* gray-800 */
}
.nav-item:hover {
  background: #EDEAE3;          /* taupe-200 */
  color: #2D2926;
}
.nav-item.active {
  background: #E3DFD6;          /* taupe-300 */
}
.nav-item .icon {
  color: #8A8680;               /* gray-400 */
}
.nav-item-secondary {
  color: #5E5954;               /* gray-600 */
}
.nav-divider {
  border-color: #EDEAE3;        /* taupe-200 */
}
```

---

## 12. Chat Panel Styling

```css
.chat-panel {
  background: #F7F5F0;          /* taupe-100 */
  border-left: 1px solid #E3DFD6; /* taupe-300 */
}
.chat-input {
  background: #ffffff;
  color: #2D2926;               /* gray-800 */
}
.chat-input::placeholder {
  color: #8A8680;               /* gray-400 */
}
.chat-send-btn {
  background: #2D2926;          /* gray-800 */
  color: #ffffff;
}
.chat-bubble-user {
  background: #F7F5F0;          /* taupe-100 */
}
.chat-divider {
  border-color: #EDEAE3;        /* taupe-200 */
}
.chat-chip:hover {
  background: #EDEAE3;          /* taupe-200 */
}
.chat-chip:active {
  background: #E3DFD6;          /* taupe-300 */
}
.chat-text-primary {
  color: #2D2926;               /* gray-800 */
}
.chat-text-secondary {
  color: #5E5954;               /* gray-600 */
}
```

---

## 13. Chart Colors

Categorical palette (unchanged values, but use these token names):

```css
:root {
  --chart-cat-01: #8951F0;
  --chart-cat-02: #06B6D4;
  --chart-cat-03: #312E81;
  --chart-cat-04: #3B82F6;
  --chart-cat-05: #0F766E;
  --chart-cat-06: #38BDF8;
  --chart-cat-07: #2DD4BF;
  --chart-cat-08: #A78BFA;
  --chart-cat-09: #C026D3;
  --chart-cat-10: #E73CAE;
  --chart-cat-11: #E879A8;
  --chart-cat-12: #92400E;
  --chart-cat-13: #FB923C;
  --chart-cat-14: #CA8A04;
  --chart-cat-15: #FACC15;
}
```

---

## 14. Quick Checklist for Applying Changes

- [ ] Replace all `Cormorant Garamond` → `Noto Serif`
- [ ] Replace all `Inter` → `Heebo`
- [ ] Update gray hex values (green-tint → warm neutrals)
- [ ] Add taupe ramp variables
- [ ] Update blue-400 from `#9BB3FC` → `#7094fb`
- [ ] Update blue-500 from `#7094FB` → `#5a82f9`
- [ ] Update blue-800 from `#152354` → `#163196`
- [ ] Update blue-900 from `#1E3A8A` → `#031e64`
- [ ] Replace green/red/orange/sky ramps entirely (different color science)
- [ ] Change primary button: blue → dark charcoal (`gray-900`)
- [ ] Change focus ring: blue → dark (`gray-900`)
- [ ] Update all spacing token names (`space-N` → `spacing-Nxs/sm/md/lg/xl`)
- [ ] Update radius values (old scale was much smaller)
- [ ] Update shadow values (simpler, single-layer)
- [ ] Reduce `--motion-normal` from 250ms → 200ms
- [ ] Reduce `--motion-slow` from 400ms → 300ms
- [ ] Add z-index layer tokens
- [ ] Apply nav panel taupe background
- [ ] Apply chat panel taupe background
- [ ] Verify no `#F9FAF9`, `#EEEFEE`, `#D8D9D8` etc. remain (old gray values)

---

## 15. Complete CSS Custom Properties Block

Copy-paste this as your root variables:

```css
:root {
  /* Fonts */
  --font-family-primary: 'Heebo', sans-serif;
  --font-family-secondary: 'Noto Serif', serif;

  /* Gray */
  --color-gray-50: #F8F7F6;
  --color-gray-100: #EEEDEB;
  --color-gray-200: #D5D3D0;
  --color-gray-300: #B5B1AB;
  --color-gray-400: #8A8680;
  --color-gray-500: #716E6A;
  --color-gray-600: #5E5954;
  --color-gray-700: #403D3A;
  --color-gray-800: #2D2926;
  --color-gray-900: #0e0e0e;

  /* Taupe */
  --color-taupe-100: #F7F5F0;
  --color-taupe-200: #EDEAE3;
  --color-taupe-300: #E3DFD6;
  --color-taupe-400: #BCB49E;
  --color-taupe-500: #9D937B;
  --color-taupe-600: #877F68;
  --color-taupe-700: #6C6451;
  --color-taupe-800: #4B4435;
  --color-taupe-900: #322C20;

  /* Blue */
  --color-blue-100: #ebf0fe;
  --color-blue-200: #c8d6fd;
  --color-blue-300: #a5bcfc;
  --color-blue-400: #7094fb;
  --color-blue-500: #5a82f9;
  --color-blue-600: #3a6af8;
  --color-blue-700: #2952cc;
  --color-blue-800: #163196;
  --color-blue-900: #031e64;

  /* Red */
  --color-red-50: #ffeaea;
  --color-red-100: #fed5d4;
  --color-red-200: #fdaba9;
  --color-red-300: #fc807e;
  --color-red-400: #fb5653;
  --color-red-500: #fa2c28;
  --color-red-600: #c82320;
  --color-red-700: #961a18;
  --color-red-800: #641210;
  --color-red-900: #320908;

  /* Green */
  --color-green-50: #e9fff0;
  --color-green-100: #a9fdc4;
  --color-green-200: #68fc97;
  --color-green-300: #27fb6b;
  --color-green-400: #1ebf51;
  --color-green-500: #148338;
  --color-green-600: #10642b;
  --color-green-700: #0b461e;
  --color-green-800: #062811;
  --color-green-900: #020a04;

  /* Orange */
  --color-orange-50: #fff1e9;
  --color-orange-100: #fee4d2;
  --color-orange-200: #fdc9a6;
  --color-orange-300: #fcad79;
  --color-orange-400: #fb924d;
  --color-orange-500: #fa7720;
  --color-orange-600: #c85f1a;
  --color-orange-700: #964713;
  --color-orange-800: #64300d;
  --color-orange-900: #321806;

  /* Sky */
  --color-sky-50: #ebf6ff;
  --color-sky-100: #aedcfe;
  --color-sky-200: #72c2fe;
  --color-sky-300: #35a8fd;
  --color-sky-400: #2e90da;
  --color-sky-500: #2679b6;
  --color-sky-600: #1f6193;
  --color-sky-700: #174a6f;
  --color-sky-800: #10324c;
  --color-sky-900: #081b28;

  /* Semantic: Background */
  --colors-background-surface: #ffffff;
  --colors-background-main: var(--color-taupe-100);
  --colors-background-light: var(--color-gray-50);

  /* Semantic: Text */
  --colors-text-header: var(--color-gray-900);
  --colors-text-body: var(--color-gray-700);
  --colors-text-meta: var(--color-gray-600);
  --colors-text-placeholder: var(--color-gray-300);
  --colors-text-disabled: var(--color-gray-300);
  --colors-text-action: var(--color-blue-600);
  --colors-text-error: var(--color-red-600);
  --colors-text-deposit: var(--color-green-500);
  --colors-text-reverse: #ffffff;

  /* Semantic: Borders */
  --colors-borders-light: var(--color-gray-100);
  --colors-borders-dark: var(--color-gray-200);
  --colors-borders-error: var(--color-red-600);
  --colors-borders-focus: var(--color-gray-900);

  /* Semantic: Icons */
  --colors-icons-full: var(--color-gray-900);
  --colors-icons-meta: var(--color-gray-600);
  --colors-icons-muted: var(--color-gray-300);
  --colors-icons-action: var(--color-blue-600);
  --colors-icons-error: var(--color-red-600);
  --colors-icons-reverse: #ffffff;

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

  /* Shadows */
  --shadow-sm: 0 1px 2px #00000014;
  --shadow-md: 0 4px 12px #0000001A;
  --shadow-lg: 0 8px 24px #0000001F;
  --shadow-overlay: 0 16px 40px #00000029;

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

  /* Chart Categorical */
  --chart-cat-01: #8951F0;
  --chart-cat-02: #06B6D4;
  --chart-cat-03: #312E81;
  --chart-cat-04: #3B82F6;
  --chart-cat-05: #0F766E;
  --chart-cat-06: #38BDF8;
  --chart-cat-07: #2DD4BF;
  --chart-cat-08: #A78BFA;
  --chart-cat-09: #C026D3;
  --chart-cat-10: #E73CAE;
  --chart-cat-11: #E879A8;
  --chart-cat-12: #92400E;
  --chart-cat-13: #FB923C;
  --chart-cat-14: #CA8A04;
  --chart-cat-15: #FACC15;
}
```
