# Evergreen Design System — Hemlock

> **Version:** 2.1.0
> **Last updated:** 2026-08-20
> **Visual canvas:** `hemlock-library.lib.pen`
> **Audience:** Freya (front-end engineering agent), gen-UI renderer, human designers/developers
> **Scope:** Everything — tokens (light + navy dark theme), accessibility, primitives, shell chrome, gen-UI components, charts, dashboard widgets, edge states

---

## How to read this file

This is the **single source of truth** for the Evergreen design system as implemented in `hemlock-library.lib.pen`. Both must stay in sync.

**For Freya / gen-UI renderer:**
- Every component uses a consistent pattern: **Name · Variants · States · Tokens · Keyboard/ARIA · Gen-UI invocation**
- Token references use `$` prefix (e.g., `$prim-blue-600`). In code, map to CSS custom properties or your framework's token system.
- Components marked `[PLANNED]` are specced but not yet in `.lib.pen`. Build to spec; canvas will follow.

**For gen-UI (AI output):**
- Section 13 defines the JSON invocation schema. When generating a component, emit that JSON shape.
- Prefer existing components over inventing new ones. Check section 04 (component selection rules) first.
- All gen-UI output renders in mainPanel. Chat messages render in chatPanel (shell chrome).

**Status legend:**
- `[SHIPPED]` — In `hemlock-library.lib.pen` and ready for implementation
- `[PLANNED]` — Specced here, not yet in `.lib.pen`
- `[FUTURE]` — Noted for completeness, not yet specced

---

## Table of Contents

- **00** How to read this file (above)
- **01** Design tokens
- **02** Typography system
- **03** Accessibility contract
- **04** Composition & layout rules
- **05** App layout: newNav · mainPanel · chatPanel
- **06** UI primitives
- **07** Cards & controls
- **08** Financial components
- **09** Charts & data visualization
- **10** Gen-UI affordances
- **11** Dashboard & widgets
- **12** Edge cases & states
- **13** Gen-UI invocation schema

---

## 01 · Design Tokens

### Theming model

Hemlock is a **two-theme system**. Every color token in `hemlock-library.lib.pen` is themed on the `🎨 Colors` axis with two modes: **Light** and **Dark** (navy).

- **T1 primitives (`prim-*`) are static** — the same paint in both modes. Both palettes (warm light neutrals AND the navy/navylight dark ramps) live side by side in T1.
- **T2/T3 semantics (`sem-*`) are themed** — every semantic token is a light/dark pair pointing at different primitives. The theme switches in this layer and only in this layer. 209 of 247 semantic color tokens carry a distinct dark value; the rest are deliberately identical in both modes (e.g. blue action colors that already pass contrast on navy).
- **Shadow colors (`shadow-*-color`) are themed but carry no `prim-` prefix** — they change per theme, so they are semantics by nature, named to read as one elevation family with `shadow-{size}-blur`/`y`. In dark mode they are **lifted** (black @ 50/60/70/85%) so elevation stays visible on navy.
- Components bind **only** to `sem-*` tokens (or non-color tokens like `radius-*`). Never to `prim-*`, never to raw hex.

Naming: `prim-{palette}-{step}` for primitives, `sem-{category}-{role}` for system semantics (T2), `sem-{component}{Role}{State}` for component tokens (T3).

### Color Primitives (T1, static)

#### Base

| Token | Value | Usage |
|---|---|---|
| `prim-base-white` | `#ffffff` | Absolute white |
| `prim-base-black` | `#000000` | Absolute black |

#### Gray ramp (warm neutrals)

| Token | Value | Usage |
|---|---|---|
| `prim-gray-50` | `#F8F7F6` | Lightest bg |
| `prim-gray-100` | `#EEEDEB` | Subtle bg, borders |
| `prim-gray-200` | `#D5D3D0` | Borders, dividers |
| `prim-gray-250` | `#C0BAB2` | Chat input focused border |
| `prim-gray-300` | `#B5B1AB` | Disabled, placeholders |
| `prim-gray-350` | `#A8A49E` | Chat input placeholder |
| `prim-gray-400` | `#8A8680` | Muted UI, icons |
| `prim-gray-500` | `#716E6A` | Tertiary text |
| `prim-gray-600` | `#5E5954` | Secondary text |
| `prim-gray-700` | `#403D3A` | Body text |
| `prim-gray-800` | `#2D2926` | Emphasis |
| `prim-gray-900` | `#0e0e0e` | Headers, primary text |

#### Taupe ramp (brand warm neutrals)

| Token | Value | Usage |
|---|---|---|
| `prim-taupe-100` | `#F7F5F0` | Nav/chat background |
| `prim-taupe-200` | `#EDEAE3` | Hover states, dividers |
| `prim-taupe-250` | `#E8E6E0` | Chat/nav dividers |
| `prim-taupe-300` | `#E3DFD6` | Active states, borders |
| `prim-taupe-350` | `#DCD8CB` | Chat/nav borders |
| `prim-taupe-400` | `#BCB49E` | Muted accents |
| `prim-taupe-500` | `#9D937B` | Tertiary elements |
| `prim-taupe-600` | `#877F68` | Secondary elements |
| `prim-taupe-700` | `#6C6451` | Emphasis |
| `prim-taupe-800` | `#4B4435` | Strong |
| `prim-taupe-900` | `#322C20` | Maximum contrast |

#### Navy ramp (dark theme surfaces)

| Token | Value | Usage |
|---|---|---|
| `prim-navy-50` | `#33476E` | Dark strongest border / focus |
| `prim-navy-100` | `#2E4066` | Dark strong borders |
| `prim-navy-200` | `#2A3A5C` | Dark emphasized borders |
| `prim-navy-300` | `#22314F` | Dark borders, pressed states |
| `prim-navy-400` | `#202C4E` | Dark emphasis surface |
| `prim-navy-500` | `#172642` | Dark active surface |
| `prim-navy-600` | `#18223A` | Dark raised surface |
| `prim-navy-700` | `#131C31` | Dark main surface / card bg |
| `prim-navy-800` | `#101729` | Dark page canvas |
| `prim-navy-900` | `#0C1222` | Dark deep surface |
| `prim-navy-950` | `#090E1B` | Dark app canvas, nav/chat bg |

#### Navylight ramp (dark theme text & icons)

| Token | Value | Usage |
|---|---|---|
| `prim-navylight-100` | `#3A485F` | Dark placeholder |
| `prim-navylight-200` | `#52637F` | Dark muted text |
| `prim-navylight-300` | `#697DA0` | Dark disabled text |
| `prim-navylight-400` | `#889CBF` | Dark muted icons |
| `prim-navylight-500` | `#9DAFCD` | Dark secondary text |
| `prim-navylight-600` | `#B3C1DB` | Dark body text |
| `prim-navylight-700` | `#C8D4E9` | Dark primary text |
| `prim-navylight-800` | `#D8E1F0` | Dark emphasis text |
| `prim-navylight-900` | `#E9EEF7` | Dark headers |

#### Blue ramp (accent)

| Token | Value | Usage |
|---|---|---|
| `prim-blue-100` | `#ebf0fe` | Selected backgrounds |
| `prim-blue-200` | `#c8d6fd` | Light highlights |
| `prim-blue-300` | `#a5bcfc` | Lighter blue |
| `prim-blue-400` | `#7094FB` | Medium accent |
| `prim-blue-500` | `#5A82F9` | Medium-strong; dark-mode primary accent |
| `prim-blue-600` | `#3a6af8` | Primary accent (light mode) |
| `prim-blue-700` | `#2952cc` | Hover |
| `prim-blue-800` | `#163196` | Dark blue surfaces |
| `prim-blue-900` | `#031e64` | Deepest accent |

#### Red ramp (error / expense)

| Token | Value | Usage |
|---|---|---|
| `prim-red-50` | `#ffeaea` |  |
| `prim-red-100` | `#fed5d4` |  |
| `prim-red-200` | `#fdaba9` |  |
| `prim-red-250` | `#FCA5A5` |  |
| `prim-red-300` | `#FC807E` |  |
| `prim-red-350` | `#F87171` |  |
| `prim-red-400` | `#fb5653` |  |
| `prim-red-500` | `#fa2c28` |  |
| `prim-red-600` | `#c82320` |  |
| `prim-red-700` | `#961a18` |  |
| `prim-red-800` | `#641210` |  |
| `prim-red-900` | `#320908` |  |

#### Green ramp (success / income / deposit)

| Token | Value | Usage |
|---|---|---|
| `prim-green-50` | `#e9fff0` |  |
| `prim-green-100` | `#a9fdc4` |  |
| `prim-green-200` | `#68fc97` |  |
| `prim-green-300` | `#27FB6B` |  |
| `prim-green-350` | `#4ADE80` |  |
| `prim-green-400` | `#1ebf51` |  |
| `prim-green-500` | `#148338` |  |
| `prim-green-600` | `#10642b` |  |
| `prim-green-700` | `#0b461e` |  |
| `prim-green-800` | `#062811` |  |
| `prim-green-900` | `#020a04` |  |

#### Orange ramp (warning / debt)

| Token | Value | Usage |
|---|---|---|
| `prim-orange-50` | `#fff1e9` |  |
| `prim-orange-100` | `#fee4d2` |  |
| `prim-orange-200` | `#fdc9a6` |  |
| `prim-orange-300` | `#fcad79` |  |
| `prim-orange-400` | `#FB924D` |  |
| `prim-orange-500` | `#fa7720` |  |
| `prim-orange-600` | `#c85f1a` |  |
| `prim-orange-700` | `#964713` |  |
| `prim-orange-800` | `#64300d` |  |
| `prim-orange-900` | `#321806` |  |

#### Sky ramp (savings / info)

| Token | Value | Usage |
|---|---|---|
| `prim-sky-50` | `#ebf6ff` |  |
| `prim-sky-100` | `#aedcfe` |  |
| `prim-sky-200` | `#72c2fe` |  |
| `prim-sky-250` | `#38BDF8` |  |
| `prim-sky-300` | `#35a8fd` |  |
| `prim-sky-400` | `#2e90da` |  |
| `prim-sky-500` | `#2679b6` |  |
| `prim-sky-600` | `#1f6193` |  |
| `prim-sky-700` | `#174a6f` |  |
| `prim-sky-800` | `#10324c` |  |
| `prim-sky-900` | `#081b28` |  |

#### Dark-mode status ramps

Short ramps used by dark-mode status semantics (washes and strong fills tuned for navy surfaces):

| Token | Value | Usage |
|---|---|---|
| `prim-reddark-100` | `#542427` |  |
| `prim-reddark-200` | `#3A1B1E` |  |
| `prim-reddark-300` | `#2C1518` |  |
| `prim-greendark-100` | `#245234` |  |
| `prim-greendark-200` | `#1A3A26` |  |
| `prim-greendark-300` | `#12291C` |  |
| `prim-orangedark-100` | `#5E3A18` |  |
| `prim-orangedark-200` | `#472C13` |  |
| `prim-orangedark-300` | `#33200F` |  |
| `prim-skydark-100` | `#16304A` |  |
| `prim-skydark-200` | `#10263C` |  |

#### Muted status primitives

Softened status colors for de-emphasized data (e.g. inactive chart series):

| Token | Value | Usage |
|---|---|---|
| `prim-green-350-muted` | `#74D791` |  |
| `prim-orange-400-muted` | `#EA9C62` |  |
| `prim-orange-500-muted` | `#E68550` |  |
| `prim-red-350-muted` | `#E5807E` |  |
| `prim-red-400-muted` | `#E56D66` |  |
| `prim-sky-300-muted` | `#5CA8E7` |  |

### Semantic Colors (T2/T3, themed)

Every table below shows the **Light** and **Dark** bindings. Cells show the primitive reference and its resolved hex.

#### Background & surface

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-background-action` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Background action |
| `sem-background-disabled` | `$prim-gray-50` → `#F8F7F6` | `$prim-navy-700` → `#131C31` | Background disabled |
| `sem-background-elevated` | `$prim-base-white` → `#ffffff` | `$prim-navy-600` → `#18223A` | Background elevated |
| `sem-background-error` | `$prim-red-50` → `#ffeaea` | `$prim-reddark-200` → `#3A1B1E` | Background error |
| `sem-background-error-strong` | `$prim-red-200` → `#fdaba9` | `$prim-reddark-100` → `#542427` | Background error strong |
| `sem-background-highlight` | `$prim-blue-100` → `#ebf0fe` | `$prim-skydark-100` → `#16304A` | Background highlight |
| `sem-background-hover` | `$prim-gray-50` → `#F8F7F6` | `$prim-navy-500` → `#172642` | Background hover |
| `sem-background-info` | `$prim-sky-50` → `#ebf6ff` | `$prim-skydark-200` → `#10263C` | Background info |
| `sem-background-info-strong` | `$prim-sky-100` → `#aedcfe` | `$prim-skydark-100` → `#16304A` | Background info strong |
| `sem-background-light` | `$prim-gray-50` → `#F8F7F6` | `$prim-navy-600` → `#18223A` | Subtle section bg |
| `sem-background-main` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-800` → `#101729` | Page canvas, nav/chat bg |
| `sem-background-muted` | `$prim-gray-200` → `#D5D3D0` | `$prim-navy-50` → `#33476E` | Background muted |
| `sem-background-rowHover` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-500` → `#172642` | Background row hover |
| `sem-background-rowPressed` | `$prim-taupe-200` → `#EDEAE3` | `$prim-navy-400` → `#202C4E` | Background row pressed |
| `sem-background-subtle` | `$prim-gray-100` → `#EEEDEB` | `$prim-navy-600` → `#18223A` | Background subtle |
| `sem-background-success` | `$prim-green-50` → `#e9fff0` | `$prim-greendark-300` → `#12291C` | Background success |
| `sem-background-success-bold` | `$prim-green-600` → `#10642b` | `$prim-green-500` → `#148338` | Background success bold |
| `sem-background-success-soft` | `$prim-green-100` → `#a9fdc4` | `$prim-greendark-200` → `#1A3A26` | Background success soft |
| `sem-background-success-strong` | `$prim-green-200` → `#68fc97` | `$prim-greendark-100` → `#245234` | Background success strong |
| `sem-background-sunken` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-900` → `#0C1222` | Background sunken |
| `sem-background-surface` | `$prim-base-white` → `#ffffff` | `$prim-navy-700` → `#131C31` | Main surface / card bg |
| `sem-background-warning` | `$prim-orange-50` → `#fff1e9` | `$prim-orangedark-300` → `#33200F` | Background warning |
| `sem-background-warning-strong` | `$prim-orange-200` → `#fdc9a6` | `$prim-orangedark-100` → `#5E3A18` | Background warning strong |

#### Borders

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-borders-action` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Borders action |
| `sem-borders-action-subtle` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Borders action subtle |
| `sem-borders-dark` | `$prim-taupe-350` → `#DCD8CB` | `$prim-navy-300` → `#22314F` | Emphasized borders |
| `sem-borders-disabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-navy-200` → `#2A3A5C` | Borders disabled |
| `sem-borders-error` | `$prim-red-600` → `#c82320` | `$prim-red-350` → `#F87171` | Error state borders |
| `sem-borders-error-strong` | `$prim-red-700` → `#961a18` | `$prim-red-250` → `#FCA5A5` | Borders error strong |
| `sem-borders-error-subtle` | `$prim-red-100` → `#fed5d4` | `$prim-reddark-100` → `#542427` | Borders error subtle |
| `sem-borders-focus` | `$prim-gray-900` → `#0e0e0e` | `#7094FB59` | Focus ring |
| `sem-borders-focus-inverted` | `$prim-base-white` → `#ffffff` | `$prim-gray-900` → `#0E0E0E` | Focus ring on dark bg |
| `sem-borders-hover` | `$prim-gray-400` → `#8A8680` | `$prim-navy-50` → `#33476E` | Borders hover |
| `sem-borders-info` | `$prim-sky-100` → `#aedcfe` | `$prim-skydark-100` → `#16304A` | Borders info |
| `sem-borders-light` | `$prim-gray-100` → `#EEEDEB` | `$prim-navy-700` → `#131C31` | Default borders |
| `sem-borders-muted` | `$prim-gray-200` → `#D5D3D0` | `$prim-navy-200` → `#2A3A5C` | Borders muted |
| `sem-borders-strong` | `$prim-gray-250` → `#C0BAB2` | `$prim-navy-50` → `#33476E` | Borders strong |
| `sem-borders-success` | `$prim-green-100` → `#a9fdc4` | `$prim-greendark-100` → `#245234` | Borders success |
| `sem-borders-warning` | `$prim-orange-100` → `#fee4d2` | `$prim-orangedark-100` → `#5E3A18` | Borders warning |

#### Text

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-text-action` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Links, action text |
| `sem-text-body` | `$prim-gray-700` → `#403D3A` | `$prim-navylight-600` → `#B3C1DB` | Body text |
| `sem-text-body-error` | `$prim-red-800` → `#641210` | `$prim-red-250` → `#FCA5A5` | Error body text |
| `sem-text-deposit` | `$prim-green-500` → `#148338` | `$prim-green-350` → `#4ADE80` | Income / deposit values |
| `sem-text-disabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-navylight-100` → `#3A485F` | Disabled text |
| `sem-text-error` | `$prim-red-600` → `#c82320` | `$prim-red-350` → `#F87171` | Error messages |
| `sem-text-error-body-strong` | `$prim-red-700` → `#961a18` | `$prim-red-250` → `#FCA5A5` | Text error body strong |
| `sem-text-error-title` | `$prim-red-600` → `#c82320` | `$prim-red-350` → `#F87171` | Text error title |
| `sem-text-header` | `$prim-gray-900` → `#0e0e0e` | `$prim-navylight-800` → `#D8E1F0` | Headings, primary |
| `sem-text-info-title` | `$prim-sky-600` → `#1f6193` | `$prim-sky-250` → `#38BDF8` | Text info title |
| `sem-text-meta` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-300` → `#697DA0` | Secondary / helper |
| `sem-text-placeholder` | `$prim-gray-500` → `#716E6A` | `$prim-navylight-200` → `#52637F` | Placeholder text |
| `sem-text-reverse` | `$prim-base-white` → `#ffffff` | `$prim-gray-900` → `#0E0E0E` | Text on inverse surfaces |
| `sem-text-strong` | `$prim-gray-800` → `#2D2926` | `$prim-navylight-800` → `#D8E1F0` | Text strong |
| `sem-text-subtle` | `$prim-gray-400` → `#8A8680` | `$prim-navylight-200` → `#52637F` | Text subtle |
| `sem-text-success-body` | `$prim-green-700` → `#0b461e` | `$prim-green-350-muted` → `#74D791` | Text success body |
| `sem-text-success-title` | `$prim-green-600` → `#10642b` | `$prim-green-350` → `#4ADE80` | Text success title |
| `sem-text-warning-body` | `$prim-orange-700` → `#964713` | `$prim-orange-400-muted` → `#EA9C62` | Text warning body |
| `sem-text-warning-title` | `$prim-orange-600` → `#c85f1a` | `$prim-orange-400` → `#FB924D` | Text warning title |

#### Icons

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-icons-action` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Interactive icons |
| `sem-icons-error` | `$prim-red-600` → `#c82320` | `$prim-red-350` → `#F87171` | Error icons |
| `sem-icons-error-soft` | `$prim-red-400` → `#fb5653` | `$prim-red-350-muted` → `#E5807E` | Icons error soft |
| `sem-icons-full` | `$prim-gray-900` → `#0e0e0e` | `$prim-navylight-600` → `#B3C1DB` | Primary icons |
| `sem-icons-info` | `$prim-sky-300` → `#35a8fd` | `$prim-sky-250` → `#38BDF8` | Icons info |
| `sem-icons-info-strong` | `$prim-sky-400` → `#2e90da` | `$prim-sky-300` → `#35A8FD` | Icons info strong |
| `sem-icons-meta` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-300` → `#697DA0` | Secondary icons |
| `sem-icons-muted` | `$prim-gray-300` → `#B5B1AB` | `$prim-navylight-100` → `#3A485F` | Disabled icons |
| `sem-icons-reverse` | `$prim-base-white` → `#ffffff` | `$prim-gray-900` → `#0E0E0E` | Icons on inverse bg |
| `sem-icons-subtle` | `$prim-gray-400` → `#8A8680` | `$prim-navylight-200` → `#52637F` | Icons subtle |
| `sem-icons-success` | `$prim-green-400` → `#1ebf51` | `$prim-green-350` → `#4ADE80` | Icons success |
| `sem-icons-success-strong` | `$prim-green-600` → `#10642b` | `$prim-green-300` → `#27FB6B` | Icons success strong |
| `sem-icons-warning` | `$prim-orange-400` → `#FB924D` | `$prim-orange-400` → `#FB924D` | Icons warning |
| `sem-icons-warning-strong` | `$prim-orange-600` → `#c85f1a` | `$prim-orange-500-muted` → `#E68550` | Icons warning strong |

#### Button — Primary

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnPrimaryBg` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Btn primary bg |
| `sem-btnPrimaryBgHover` | `$prim-blue-700` → `#2952cc` | `$prim-blue-400` → `#7094FB` | Btn primary bg hover |
| `sem-btnPrimaryBgActive` | `$prim-blue-800` → `#163196` | `$prim-blue-600` → `#3A6AF8` | Btn primary bg active |
| `sem-btnPrimaryBgDisabled` | `$prim-blue-200` → `#c8d6fd` | `$prim-blue-800` → `#163196` | Btn primary bg disabled |
| `sem-btnPrimaryText` | `$prim-base-white` → `#ffffff` | `$prim-base-black` → `#000000` | Btn primary text |
| `sem-btnPrimaryTextHover` | `$prim-base-white` → `#ffffff` | `$prim-navy-950` → `#090E1B` | Btn primary text hover |
| `sem-btnPrimaryTextActive` | `$prim-base-white` → `#ffffff` | `$prim-base-black` → `#000000` | Btn primary text active |
| `sem-btnPrimaryTextDisabled` | `$prim-base-white` → `#ffffff` | `$prim-blue-500` → `#5A82F9` | Btn primary text disabled |

#### Button — Primary Inverted

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnPrimaryInvertedBg` | `$prim-base-white` → `#ffffff` | `$prim-navy-700` → `#131C31` | Btn primary inverted bg |
| `sem-btnPrimaryInvertedBgHover` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Btn primary inverted bg hover |
| `sem-btnPrimaryInvertedBgActive` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Btn primary inverted bg active |
| `sem-btnPrimaryInvertedBgDisabled` | `$prim-base-white` → `#ffffff` | `$prim-navy-700` → `#131C31` | Btn primary inverted bg disabled |
| `sem-btnPrimaryInvertedText` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Btn primary inverted text |
| `sem-btnPrimaryInvertedTextHover` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Btn primary inverted text hover |
| `sem-btnPrimaryInvertedTextActive` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Btn primary inverted text active |
| `sem-btnPrimaryInvertedTextDisabled` | `$prim-blue-300` → `#a5bcfc` | `$prim-navylight-100` → `#3A485F` | Btn primary inverted text disabled |
| `sem-btnPrimaryInvertedBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Btn primary inverted border |
| `sem-btnPrimaryInvertedBorderHover` | `$prim-blue-300` → `#a5bcfc` | `$prim-blue-500` → `#5A82F9` | Btn primary inverted border hover |
| `sem-btnPrimaryInvertedBorderActive` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Btn primary inverted border active |
| `sem-btnPrimaryInvertedBorderDisabled` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-300` → `#22314F` | Btn primary inverted border disabled |

#### Button — Secondary

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnSecondaryBg` | `#00000000` | `#00000000` | Btn secondary bg |
| `sem-btnSecondaryBgHover` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Btn secondary bg hover |
| `sem-btnSecondaryBgActive` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Btn secondary bg active |
| `sem-btnSecondaryBgDisabled` | `#00000000` | `#00000000` | Btn secondary bg disabled |
| `sem-btnSecondaryText` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Btn secondary text |
| `sem-btnSecondaryTextHover` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Btn secondary text hover |
| `sem-btnSecondaryTextActive` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Btn secondary text active |
| `sem-btnSecondaryTextDisabled` | `$prim-blue-300` → `#a5bcfc` | `$prim-navylight-100` → `#3A485F` | Btn secondary text disabled |
| `sem-btnSecondaryBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Btn secondary border |
| `sem-btnSecondaryBorderHover` | `$prim-blue-300` → `#a5bcfc` | `$prim-blue-500` → `#5A82F9` | Btn secondary border hover |
| `sem-btnSecondaryBorderActive` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Btn secondary border active |
| `sem-btnSecondaryBorderPressed` | `$prim-blue-300` → `#a5bcfc` | `$prim-blue-500` → `#5A82F9` | Btn secondary border pressed |
| `sem-btnSecondaryBorderDisabled` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-300` → `#22314F` | Btn secondary border disabled |

#### Button — Secondary Inverted

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnSecondaryInvertedBg` | `#00000000` | `#00000000` | Btn secondary inverted bg |
| `sem-btnSecondaryInvertedBgHover` | `#ffffff1a` | `#FFFFFF1A` | Btn secondary inverted bg hover |
| `sem-btnSecondaryInvertedBgActive` | `#ffffff1a` | `#FFFFFF1A` | Btn secondary inverted bg active |
| `sem-btnSecondaryInvertedBgDisabled` | `#00000000` | `#00000000` | Btn secondary inverted bg disabled |
| `sem-btnSecondaryInvertedText` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Btn secondary inverted text |
| `sem-btnSecondaryInvertedTextHover` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Btn secondary inverted text hover |
| `sem-btnSecondaryInvertedTextActive` | `$prim-gray-200` → `#D5D3D0` | `$prim-gray-200` → `#D5D3D0` | Btn secondary inverted text active |
| `sem-btnSecondaryInvertedTextDisabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-gray-300` → `#B5B1AB` | Btn secondary inverted text disabled |
| `sem-btnSecondaryInvertedBorder` | `$prim-gray-200` → `#D5D3D0` | `$prim-gray-200` → `#D5D3D0` | Btn secondary inverted border |
| `sem-btnSecondaryInvertedBorderHover` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Btn secondary inverted border hover |
| `sem-btnSecondaryInvertedBorderActive` | `#00000000` | `#00000000` | Btn secondary inverted border active |
| `sem-btnSecondaryInvertedBorderDisabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-gray-300` → `#B5B1AB` | Btn secondary inverted border disabled |

#### Button — Destructive

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnDestructionBg` | `$prim-red-600` → `#c82320` | `$prim-red-600` → `#C82320` | Btn destruction bg |
| `sem-btnDestructionBgHover` | `$prim-red-500` → `#fa2c28` | `$prim-red-500` → `#FA2C28` | Btn destruction bg hover |
| `sem-btnDestructionBgActive` | `$prim-red-700` → `#961a18` | `$prim-red-700` → `#961A18` | Btn destruction bg active |
| `sem-btnDestructionBgDisabled` | `$prim-gray-200` → `#D5D3D0` | `$prim-navy-300` → `#22314F` | Btn destruction bg disabled |
| `sem-btnDestructionText` | `$prim-gray-100` → `#EEEDEB` | `$prim-gray-100` → `#EEEDEB` | Btn destruction text |
| `sem-btnDestructionTextHover` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Btn destruction text hover |
| `sem-btnDestructionTextActive` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Btn destruction text active |
| `sem-btnDestructionTextDisabled` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-100` → `#3A485F` | Btn destruction text disabled |

#### Button — Link

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-btnLinkBg` | `#00000000` | `#00000000` | Btn link bg |
| `sem-btnLinkBgHover` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Btn link bg hover |
| `sem-btnLinkBgActive` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Btn link bg active |
| `sem-btnLinkBgDisabled` | `#00000000` | `#00000000` | Btn link bg disabled |
| `sem-btnLinkText` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Btn link text |
| `sem-btnLinkTextHover` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Btn link text hover |
| `sem-btnLinkTextActive` | `$prim-blue-800` → `#163196` | `$prim-blue-500` → `#5A82F9` | Btn link text active |
| `sem-btnLinkTextPressed` | `$prim-blue-800` → `#163196` | `$prim-blue-500` → `#5A82F9` | Btn link text pressed |
| `sem-btnLinkTextDisabled` | `$prim-blue-300` → `#a5bcfc` | `$prim-navylight-100` → `#3A485F` | Btn link text disabled |
| `sem-btnLinkBorderPressed` | `$prim-blue-700` → `#2952cc` | `$prim-blue-500` → `#5A82F9` | Btn link border pressed |

#### Controls (toggle · tag · slider · pagination · misc)

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-dragHandle` | `$prim-gray-900` → `#0e0e0e` | `$prim-navylight-600` → `#B3C1DB` | Drag handle |
| `sem-paginationDot` | `$prim-gray-200` → `#D5D3D0` | `$prim-navy-300` → `#22314F` | Pagination dot |
| `sem-paginationDotActive` | `$prim-gray-700` → `#403D3A` | `$prim-navylight-600` → `#B3C1DB` | Active pagination dot |
| `sem-progressFill` | `$sem-btnPrimaryBgActive` → `#163196` | `$sem-btnPrimaryBgActive` → `#3A6AF8` | Progress bar fill |
| `sem-scrollbarThumb` | `$prim-gray-300` → `#B5B1AB` | `$prim-navy-300` → `#22314F` | Scrollbar thumb |
| `sem-sliderAccent` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Slider filled track / thumb |
| `sem-sliderAccentDisabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-navy-50` → `#33476E` | Slider disabled accent |
| `sem-sliderTrack` | `$prim-gray-200` → `#D5D3D0` | `$prim-navy-300` → `#22314F` | Slider track |
| `sem-tagBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-blue-900` → `#031E64` | Tag background |
| `sem-tagBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Tag border |
| `sem-tagText` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Tag text |
| `sem-toggleKnob` | `$prim-base-white` → `#ffffff` | `$prim-base-white` → `#FFFFFF` | Toggle knob |
| `sem-toggleKnobOn` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Toggle knob (on) |
| `sem-toggleLoadingTrack` | `$prim-gray-100` → `#EEEDEB` | `$prim-navy-600` → `#18223A` | Toggle loading track |
| `sem-toggleTrackOff` | `$prim-taupe-200` → `#EDEAE3` | `$prim-navy-500` → `#172642` | Toggle track (off) |
| `sem-toggleTrackOn` | `$prim-blue-100` → `#ebf0fe` | `$prim-blue-900` → `#031E64` | Toggle track (on) |

#### Navigation

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-navActiveBg` | `$prim-taupe-350` → `#DCD8CB` | `$prim-navy-600` → `#18223A` | Active item bg |
| `sem-navBg` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-950` → `#090E1B` | Nav panel bg |
| `sem-navBorder` | `$prim-taupe-350` → `#DCD8CB` | `#00000000` | Nav border |
| `sem-navDivider` | `$prim-taupe-250` → `#E8E6E0` | `$prim-navy-300` → `#22314F` | Nav section divider |
| `sem-navHoverBg` | `$prim-taupe-200` → `#EDEAE3` | `$prim-navy-600` → `#18223A` | Item hover bg |
| `sem-navHoverText` | `$prim-gray-800` → `#2D2926` | `$prim-navylight-800` → `#D8E1F0` | Item hover text |
| `sem-navIcon` | `$prim-gray-400` → `#8A8680` | `$prim-navylight-500` → `#9DAFCD` | Nav icons |
| `sem-navPressedBg` | `$prim-taupe-300` → `#E3DFD6` | `$prim-navy-400` → `#202C4E` | Pressed item bg |
| `sem-navShadow` | `#2D292628` | `#00000000` | Nav panel shadow |
| `sem-navTextDisabled` | `$prim-gray-300` → `#B5B1AB` | `$prim-navylight-100` → `#3A485F` | Disabled nav text |
| `sem-navTextPrimary` | `$prim-gray-800` → `#2D2926` | `$prim-navylight-800` → `#D8E1F0` | Primary nav text |
| `sem-navTextSecondary` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-500` → `#9DAFCD` | Secondary nav text |

#### Nav toggle & settings buttons

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-navSettingsHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Settings hover bg |
| `sem-navSettingsIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Settings button icon |
| `sem-navSettingsPressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Settings pressed bg |
| `sem-navSettingsPressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Settings pressed icon |
| `sem-navToggleBg` | `$sem-btnPrimaryInvertedBg` → `#ffffff` | `$prim-navy-600` → `#18223A` | Nav toggle bg |
| `sem-navToggleBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Nav toggle border |
| `sem-navToggleHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Nav toggle hover bg |
| `sem-navToggleHoverBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Nav toggle hover border |
| `sem-navToggleIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Nav toggle icon |
| `sem-navTogglePressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Nav toggle pressed bg |
| `sem-navTogglePressedBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Nav toggle pressed border |
| `sem-navTogglePressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Nav toggle pressed icon |

#### Chat — panel & messages

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-chatBg` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-950` → `#090E1B` | Chat panel bg |
| `sem-chatBorder` | `$prim-taupe-350` → `#DCD8CB` | `$prim-navy-50` → `#33476E` | Chat panel border |
| `sem-chatBubbleAi` | `#FFFFFF00` | `#FFFFFF00` | AI message bg (transparent) |
| `sem-chatBubbleUser` | `$prim-taupe-100` → `#F7F5F0` | `$prim-navy-600` → `#18223A` | User message bg |
| `sem-chatBubbleUserBorder` | `$prim-taupe-350` → `#DCD8CB` | `#00000000` | User message border |
| `sem-chatChipHover` | `$prim-taupe-200` → `#EDEAE3` | `$prim-navy-500` → `#172642` | Chip hover bg |
| `sem-chatChipPressed` | `$prim-taupe-300` → `#E3DFD6` | `$prim-navy-400` → `#202C4E` | Chip pressed bg |
| `sem-chatDivider` | `$prim-taupe-250` → `#E8E6E0` | `$prim-navy-700` → `#131C31` | Message divider |
| `sem-chatIcon` | `$prim-gray-600` → `#5E5954` | `$prim-blue-300` → `#A5BCFC` | Chat header icons |
| `sem-chatPlaceholder` | `$prim-gray-350` → `#A8A49E` | `$prim-navylight-200` → `#52637F` | Input placeholder |
| `sem-chatShadow` | `#2D292628` | `#9BB3FC24` | Input field shadow |
| `sem-chatTextPrimary` | `$prim-gray-800` → `#2D2926` | `$prim-blue-100` → `#EBF0FE` | Primary chat text |
| `sem-chatTextSecondary` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-600` → `#B3C1DB` | Secondary chat text |

#### Chat — input field

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-chatInputBg` | `$sem-background-surface` → `#ffffff` | `$prim-navy-950` → `#090E1B` | Input field bg |
| `sem-chatInputBorder` | `$prim-taupe-250` → `#E8E6E0` | `$prim-navy-500` → `#172642` | Input border |
| `sem-chatInputBorderActive` | `$prim-gray-250` → `#C0BAB2` | `$prim-navy-50` → `#33476E` | Input border (focused) |
| `sem-chatInputBorderRecording` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Input border while recording |
| `sem-chatRecordingDot` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` | Recording indicator dot |

#### Chat — send & stop buttons

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-chatSendBg` | `$sem-btnPrimaryBg` → `#3a6af8` | `$sem-btnPrimaryBg` → `#5A82F9` | Send button bg |
| `sem-chatSendBgDisabled` | `$sem-btnPrimaryBgDisabled` → `#c8d6fd` | `$sem-btnPrimaryBgDisabled` → `#163196` | Send disabled bg |
| `sem-chatSendBgHover` | `$sem-btnPrimaryBgHover` → `#2952cc` | `$sem-btnPrimaryBgHover` → `#7094FB` | Send hover bg |
| `sem-chatSendBgPressed` | `$sem-btnPrimaryBgActive` → `#163196` | `$sem-btnPrimaryBgActive` → `#3A6AF8` | Send pressed bg |
| `sem-chatSendIcon` | `$sem-btnPrimaryText` → `#ffffff` | `$sem-btnPrimaryText` → `#000000` | Send button icon |
| `sem-chatStopBg` | `$sem-btnPrimaryBg` → `#3a6af8` | `$sem-btnPrimaryBg` → `#5A82F9` | Stop button bg |
| `sem-chatStopBgHover` | `$sem-btnPrimaryBgHover` → `#2952cc` | `$sem-btnPrimaryBgHover` → `#7094FB` | Stop hover bg |
| `sem-chatStopBgPressed` | `$sem-btnPrimaryBgActive` → `#163196` | `$sem-btnPrimaryBgActive` → `#3A6AF8` | Stop pressed bg |
| `sem-chatStopIcon` | `$sem-btnPrimaryText` → `#ffffff` | `$sem-btnPrimaryText` → `#000000` | Stop button icon |

#### Chat — voice & close buttons

| Token | Light | Dark | Usage |
|---|---|---|---|
| `sem-chatCloseBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Close button border |
| `sem-chatCloseHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Close hover bg |
| `sem-chatCloseIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Close button icon |
| `sem-chatClosePressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Close pressed bg |
| `sem-chatClosePressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Close pressed icon |
| `sem-chatVoiceActiveBg` | `$prim-blue-600` → `#3a6af8` | `$sem-btnPrimaryBg` → `#5A82F9` | Voice active bg |
| `sem-chatVoiceActiveIcon` | `$sem-btnPrimaryText` → `#ffffff` | `$sem-btnPrimaryText` → `#000000` | Voice active icon |
| `sem-chatVoiceBgDisabled` | `$sem-btnPrimaryBgDisabled` → `#c8d6fd` | `#00000000` | Voice disabled bg |
| `sem-chatVoiceBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` | Voice button border |
| `sem-chatVoiceCancelIcon` | `$prim-gray-400` → `#8A8680` | `$prim-navylight-400` → `#889CBF` | Voice cancel icon |
| `sem-chatVoiceHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` | Voice hover bg |
| `sem-chatVoiceIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` | Voice button icon |
| `sem-chatVoicePressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` | Voice pressed bg |
| `sem-chatVoicePressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` | Voice pressed icon |
| `sem-chatVoicePulse` | `#3A6AF828` | `#7094FB28` | Voice pulse ring |
| `sem-chatVoiceTimer` | `$prim-gray-600` → `#5E5954` | `$prim-navylight-500` → `#9DAFCD` | Timer text |
| `sem-chatVoiceWaveform` | `$prim-blue-400` → `#7094FB` | `$prim-blue-400` → `#7094FB` | Waveform color |

### Chart Palettes

#### Categorical (15 series, priority-ordered)

Source: `chart-palette-v5/evergreen-chart-palette-v5.css` (Evergreen Categorical Chart Palette v5). Five of the six v5 families (Azure, Teal, Iris, Plum, Ember — Cyan intentionally omitted), three steps each, in sequence order. No true green, so nothing competes with the gain/loss colors. Fills are pale in both themes — labels sitting on a fill must be dark ink.

| Token | Light | Dark | Family | v5 slot | Priority |
|---|---|---|---|---|---|
| `chart-categorical/color-01` | `#7B96F1` | `#7993EE` | Azure | `--cat15` | 1st |
| `chart-categorical/color-02` | `#89B6F9` | `#86B3F5` | Azure | `--cat1` | 2nd |
| `chart-categorical/color-03` | `#95C5FB` | `#93C2F8` | Azure | `--cat29` | 3rd |
| `chart-categorical/color-04` | `#74D5D1` | `#71D2CE` | Teal | `--cat10` | 4th |
| `chart-categorical/color-05` | `#51CCD0` | `#4FCACE` | Teal | `--cat18` | 5th |
| `chart-categorical/color-06` | `#19B6CC` | `#1ABAD0` | Teal | `--cat22` | 6th |
| `chart-categorical/color-07` | `#B985DE` | `#B682DB` | Iris | `--cat3` | 7th |
| `chart-categorical/color-08` | `#BAA9F5` | `#B7A6F2` | Iris | `--cat13` | 8th |
| `chart-categorical/color-09` | `#BDBBFC` | `#BBB8F9` | Iris | `--cat21` | 9th |
| `chart-categorical/color-10` | `#E6B1E5` | `#E3AEE2` | Plum | `--cat28` | 10th |
| `chart-categorical/color-11` | `#E59FD4` | `#E39CD1` | Plum | `--cat24` | 11th |
| `chart-categorical/color-12` | `#E37BA8` | `#E27BA7` | Plum | `--cat5` | 12th |
| `chart-categorical/color-13` | `#E2903F` | `#E59342` | Ember | `--cat14` | 13th |
| `chart-categorical/color-14` | `#FAA38E` | `#F8A18D` | Ember | `--cat2` | 14th |
| `chart-categorical/color-15` | `#FEB0AF` | `#FBADAC` | Ember | `--cat16` | 15th |

Always assign in priority order.

#### Sequential ramp (single-hue blue)

| Token | Resolves to | Usage |
|---|---|---|
| `chart-sequential/seq-100` | `$prim-blue-100` → `#ebf0fe` | Lightest fill |
| `chart-sequential/seq-200` | `$prim-blue-200` → `#c8d6fd` | Light fill |
| `chart-sequential/seq-300` | `$prim-blue-300` → `#a5bcfc` | Medium-light |
| `chart-sequential/seq-400` | `$prim-blue-400` → `#7094FB` | Medium |
| `chart-sequential/seq-500` | `$prim-blue-500` → `#5A82F9` | Medium-strong |
| `chart-sequential/seq-600` | `$prim-blue-600` → `#3a6af8` | Strong |
| `chart-sequential/seq-700` | `$prim-blue-700` → `#2952cc` | Darkest fill |
| `chart-threshold` | `$sem-background-action` → `#3a6af8` | Threshold / reference lines |

### Spacing

| Token | Value | Usage |
|---|---|---|
| `spacing-4xs` | `2px` | Hairline gaps |
| `spacing-3xs` | `4px` | Tight internal gaps |
| `spacing-2xs` | `8px` | Icon-to-label, checkbox gap |
| `spacing-xs` | `12px` | Input padding, cell padding |
| `spacing-sm` | `16px` | Card padding, compact gaps |
| `spacing-md` | `24px` | Component spacing, section gaps |
| `spacing-lg` | `32px` | Section dividers |
| `spacing-xl` | `40px` | Major section gaps |
| `spacing-2xl` | `48px` | Page-level spacing |
| `spacing-3xl` | `64px` | Large page gaps |
| `spacing-4xl` | `72px` | Major layout gaps |
| `spacing-5xl` | `128px` | Maximum spacing |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | `0px` | Table cells, chart areas |
| `radius-4xs` | `2px` | Hairline rounding |
| `radius-3xs` | `4px` | Tags, small badges |
| `radius-2xs` | `8px` | Inputs, buttons, chips |
| `radius-xs` | `12px` | Cards, dropdowns, chat input & bubbles |
| `radius-sm` | `16px` | Panels, modals |
| `radius-md` | `24px` | Large containers, chat chips |
| `radius-lg` | `32px` | Extra-large containers |
| `radius-xl` | `40px` | Rounded panels |
| `radius-2xl` | `48px` | Large rounded surfaces |
| `radius-3xl` | `64px` | Hero elements |
| `radius-4xl` | `72px` | Feature elements |
| `radius-5xl` | `128px` | Maximum rounding |
| `radius-full` | `9999px` | Pills, circles, toggle thumbs |

### Elevation / Shadows

Each shadow is defined by y-offset and blur (`shadow-{size}-y`, `shadow-{size}-blur`) plus a themed color (`shadow-{size}-color`). Shadow colors change per theme, so they are semantics by nature — they carry no `prim-` prefix, keeping the elevation scale reading as one family. In dark mode they are **lifted** (much higher alpha black) so elevation stays visible on navy surfaces.

| Shadow | Y-offset | Blur | Light color | Dark color | Usage |
|---|---|---|---|---|---|
| `shadow-sm` | `1px` | `2px` | `#00000014` | `#00000080` | Subtle elevation |
| `shadow-md` | `4px` | `12px` | `#0000001A` | `#00000099` | Cards, dropdowns |
| `shadow-lg` | `8px` | `24px` | `#0000001F` | `#000000B3` | Modals, popovers |
| `shadow-overlay` | `16px` | `40px` | `#00000029` | `#000000D9` | Full overlays |

In dark mode, elevation leans on lightened surfaces, and shadows get **stronger**, not weaker — a shadow that disappears isn't doing its job. (The one colored glow is `sem-chatShadow`: a soft blue halo on the chat panel, dark-only. Scrims are a separate role — `sem-background-scrim` — and are not part of the shadow ramp.)

### Motion / Easing

| Token | Value | Usage |
|---|---|---|
| `duration-fast` | `150ms` | Hover, toggles |
| `duration-base` | `200ms` | Dropdowns, tooltips |
| `duration-slow` | `300ms` | Modals, chart transitions |
| `easing-standard` | `cubic-bezier(0.2, 0, 0, 1)` | Default transitions |
| `easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `easing-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |

### Z-Index

| Token | Value | Usage |
|---|---|---|
| `z-base` | `0` | Default stacking |
| `z-dropdown` | `100` | Dropdown menus |
| `z-popover` | `200` | Popovers, tooltips |
| `z-sticky` | `300` | Sticky headers |
| `z-overlay` | `400` | Backdrop overlays |
| `z-modal` | `500` | Modal dialogs |
| `z-toast` | `600` | Toast notifications |
| `z-tooltip` | `700` | Tooltips (topmost) |

---

## 02 · Typography System

### Font Families

| Token | Value | Usage |
|---|---|---|
| `font-primary` | Heebo | UI font — body, numbers, labels, all UI text |
| `font-secondary` | Noto Serif | Headings, editorial content |

Font families are themed on the `🆎 Typography` axis (`desktop` / `mobile`) — currently identical in both modes.

### Type Scale

Type sizes and line heights are separate token families: `text-size-{step}` (px) and `line-height-{step}` (unitless ratio). Line height in px = size × ratio.

| Size token | Font size | Line height | Usage |
|---|---|---|---|
| `2xs` | `11px` | `14px` | Fine print, chart ticks |
| `xs` | `12px` | `16px` | Axis labels, helper text |
| `sm` | `14px` | `20px` | Table cells, captions, meta |
| `base` | `16px` | `24px` | Body text (default) |
| `md` | `18px` | `28px` | Section subtitles |
| `lg` | `20px` | `28px` | Section titles, card headers |
| `xl` | `24px` | `32px` | Page titles |
| `2xl` | `30px` | `36px` | Large headings |
| `3xl` | `36px` | `40px` | Hero headings |
| `4xl` | `48px` | `52px` | Hero numbers, KPIs |
| `5xl` | `56px` | `64px` | Display text |
| `6xl` | `64px` | `72px` | Large display |
| `7xl` | `80px` | `84px` | Hero |
| `8xl` | `96px` | `96px` | Maximum display |

### Font Weights

| Weight token | Value | Usage |
|---|---|---|
| `light` | `300` | Large display text only |
| `regular` | `400` | Body, labels |
| `semibold` | `600` | Section headers, emphasis |
| `bold` | `700` | Table headers, KPI values |

### Token naming pattern

The `.pen` file exposes typography as three flat token families:

- `font-primary` / `font-secondary` — family names (`Heebo`, `Noto Serif`)
- `text-size-{2xs…8xl}` — font size in px (e.g. `text-size-sm` → `14`)
- `line-height-{2xs…8xl}` — unitless ratio (e.g. `line-height-sm` → `1.4286`, so 14px × 1.4286 = 20px)

Weights are applied per text style in the design, not tokenized.

### Typography Rules

1. **Heebo for all UI and numbers.** Noto Serif for headings/editorial only.
2. **Tabular-nums** (`font-variant-numeric: tabular-nums`) on all right-aligned numeric columns.
3. **Line height:** follows the scale (e.g., base = 24px for 16px text).
4. **Financial values** minimum `sm` (14px) — never smaller.
5. **Letter spacing:** all tokens define `0` letter-spacing. Apply tight (-0.01em) only for large display headings in code.

---

## 03 · Accessibility Contract

**Standard:** WCAG 2.1 AA minimum, AAA aspirational.

### Contrast

| Element | Min ratio |
|---|---|
| Body text | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| UI components, borders, non-text icons | 3:1 |

### Color is never the only indicator

- **Trend:** color + arrow icon (up/down/minus) + text label ("+2.4%")
- **Budget progress:** color fill + percentage text
- **Charts:** legend + pattern/shape, not color alone
- **Negative numbers:** color + minus sign + optional parentheses

### Touch / click targets

| Element | Min |
|---|---|
| Buttons, icon buttons | 44×44px tap target (icon can be smaller) |
| List items | 44px height (whole row is target) |
| Filter chips | 32px height with adequate padding |
| Checkboxes / toggles / slider thumbs | 44×44px tap target |

Gaps: 8px min between adjacent interactive elements; 12px+ between destructive and safe actions.

### Screen reader patterns

| Visual | Announcement |
|---|---|
| +2.4% | "increased by two point four percent" |
| -$1,247.80 | "decreased by one thousand two hundred forty-seven dollars and eighty cents" |
| 84% (budget) | "eighty-four percent of budget used" |
| Green up arrow | "trending up" (via aria-label) |

### Focus

- Visible ring on every interactive element: `$sem-borders-focus` (dark) or `$sem-borders-focus-inverted` (on dark bg), ≥2px, 3:1 contrast
- Order: newNav → mainPanel header → KPI row (L→R) → main content (top→bottom, L→R) → chatPanel

### Motion

- All animations respect `prefers-reduced-motion: reduce` → instant transitions, no shimmer
- Use `$duration-*` and `$easing-*` tokens so motion can be globally disabled
- Never use motion as the only way to convey information

---

## 04 · Composition & Layout Rules

### Component Selection (data → component)

#### Single value

| Data | Component |
|---|---|
| Currency with trend | `KpiCard` (positive variant) or `KpiCard/negative` |
| Currency with sparkline | `KpiCard/with-sparkline` |
| Currency neutral | `KpiCard/neutral` |
| Percentage with direction | `KpiCard` + `DataValueIndicator` |

#### Comparisons

| Scenario | Component | Rule |
|---|---|---|
| Two time periods | Comparison metrics row | Label both periods |
| Before/after | Delta badge with direction | `DataValueIndicator` |
| Budget vs actual | Budget category row | Progress bar required |
| Multi-metric side-by-side | KpiCard row (3–4) | Horizontal, `fill_container` |

#### Lists & tables

| Data | Component |
|---|---|
| Recent transactions | `TransactionRow` / `TransactionTable` |
| Holdings / positions | `HoldingsRow` / `HoldingsTable` |
| Account list | `AccountRow` / `AccountRowGroup` |
| Detail information | `DetailRow` / `DetailSection` |
| Generic list items | `ListRow` variants |

#### Charts (data shape → chart type)

| Shape | Component |
|---|---|
| Part-of-whole | `DonutChart` |
| Time series (1 metric) | `AreaChart` |
| Time series (multi) | `AreaChartMultiSeries` |
| Categorical comparison | `BarChart` |
| Flow / movement | `SankeyDiagram` |
| Projection / forecast | `ProjectedVsActualChart` |
| Threshold / gauge | `GaugeChart` |
| Hierarchical | `TreemapChart` |
| Market data | `CandlestickChart` |
| Waterfall / attribution | `WaterfallChart` |
| Heat intensity | `HeatmapChart` |
| Benchmark comparison | `BenchmarkComparisonChart` |
| Timeline navigation | `TimelineScrubberChart` |
| Two-axis correlation | `DualAxisChart` |
| Inline trend | `Sparkline` |

### Dashboard composition rules

- **KPI row:** always 3 or 4 cards (never 1, 2, or 5+). Primary metric first. `fill_container` width.
- **Transaction list:** preceded by filter row. Group by date. Max 20 visible → pagination. Pending at top.
- **Dashboard grid:** 2-column fixed grid. Widgets are card-sized views. See §11.

### Content voice

- **Tone:** Calm, precise, empowering. Never panicky, vague, patronizing, or salesy.
- **Insight pattern:** Observation + comparison + driver
- **Recommendation pattern:** Action + quantified impact + reasoning
- **Error pattern:** What happened + reassurance + action
- **Numbers:** Always exact values, always with baseline, period, and source. Never approximate actuals.
- **Disclaimer (required on all projections):** "This is not financial advice. Projections are estimates based on historical data and may not reflect future results."

---

## 05 · App Layout: newNav · mainPanel · chatPanel

### Three-panel architecture

```
┌──────────┬─────────────────────────────────────┬───────────────┐
│  newNav  │            mainPanel                │  chatPanel    │
│  (left)  │         (content area)              │   (right)     │
│          │                                     │               │
│  ↔       │  Gen-UI renders here:               │  ↔            │
│  collaps │  · dashboards, charts, tables       │  collapsible  │
│  ible    │  · scenario tools                   │               │
│          │  · any AI-generated financial tool   │  Persistent   │
│  Nav     │                                     │  chat with    │
│  links,  │  Mode 1: Single view                │  the AI       │
│  acct    │  Mode 2: Dashboard (widget grid)    │               │
│  switch  │                                     │  Input, msgs, │
│          │                                     │  history      │
└──────────┴─────────────────────────────────────┴───────────────┘
```

### Layout tokens

- Nav background: `$sem-navBg` (light `$prim-taupe-100` / dark `$prim-navy-950`)
- Nav border: `$sem-navBorder` (light `$prim-taupe-350` / dark transparent — dark nav is borderless)
- Chat background: `$sem-chatBg` (light `$prim-taupe-100` / dark `$prim-navy-950`)
- Chat border: `$sem-chatBorder` (light `$prim-taupe-350` / dark `$prim-navy-50`)
- Main surface: `$sem-background-surface` (light `$prim-base-white` / dark `$prim-navy-700`)

### Layout behavior

| Behavior | Rule |
|---|---|
| **Collapse** | When chatPanel or newNav collapses, mainPanel expands to fill. |
| **Rendering split** | chatPanel = conversation (input surface). mainPanel = gen-UI output (output surface). |
| **Single view** | mainPanel always shows one view at a time. No tabs. |
| **Dashboard mode** | Dashboard is a special mainPanel view with a 2-column widget grid. See §11. |

### Shell chrome components `[SHIPPED]`

| Component | Location | Role |
|---|---|---|
| `AccountSelector/closed` | Nav panel | Account switcher (collapsed) |
| `AccountSelector/open` | Nav panel | Account switcher (expanded with list) |
| `AccountSelector/open-hover` | Nav panel | Account switcher item hover |

---

## 06 · UI Primitives `[SHIPPED]`

### Buttons

| Variant | Fill | Text | Border |
|---|---|---|---|
| `Button` (primary) | `$sem-btnPrimaryBg` | `$sem-btnPrimaryText` | none |
| `Button/secondary` | transparent | `$sem-btnSecondaryText` | `$sem-btnSecondaryBorder` |
| `Button/outline` | transparent | `$sem-btnSecondaryText` | `$sem-btnSecondaryBorder` |
| `Button/text` | transparent | `$sem-btnLinkText` | none |

Sub-variants with icons: `/icon-left`, `/icon-right`

**States per variant:** Default, Hover, Active, Disabled (all token-driven via semantic button colors)
**Shape:** `$radius-2xs` (8px)
**Focus ring:** `$sem-borders-focus`, 2px

### Input Fields

| Variant | Description |
|---|---|
| `Input` | Default state |
| `Input/filled` | Has value |
| `Input/focus` | Focused |
| `Input/no-label` | Without label |
| `Input/disabled` | Disabled |
| `Input/error` | Error state |
| `Input/error-icon` | Error with icon |
| `Input/icon-right` | With trailing icon |

### Textarea

| Variant | Description |
|---|---|
| `Textarea` | Default |
| `Textarea/hover` | Hovered |
| `Textarea/focus` | Focused |
| `Textarea/filled` | Has value |
| `Textarea/disabled` | Disabled |
| `Textarea/error` | Error state |

### Select / Dropdown

| Variant | Description |
|---|---|
| `Select` | Default state |
| `Select/selected` | Has selection |
| `Select/open` | Menu open |
| `Select/hover` | Hovered |
| `Select/focus` | Focused |
| `Select/disabled` | Disabled |
| `Select/error` | Error state |
| `Select/floating-label` | Floating label variant |

### Toggle Switch

| Variant | Description |
|---|---|
| `ToggleSwitch` | Off state |
| `ToggleSwitch/on` | On state |
| `ToggleSwitch/disabled` | Disabled |
| `ToggleSwitch/loading` | Loading state |

### Checkbox & Radio

| Variant | Description |
|---|---|
| `Checkbox` | Unchecked |
| `Checkbox/checked` | Checked |
| `Checkbox/no-label` | Without label |
| `Checkbox/with-error` | Error state |
| `Radio` | Unselected |
| `Radio/checked` | Selected |
| `Radio/no-label` | Without label |
| `Radio/with-error` | Error state |

### Slider

| Variant | Description |
|---|---|
| `Slider` | Default |
| `Slider/hover` | Hovered |
| `Slider/focus` | Focused |
| `Slider/disabled` | Disabled |
| `Slider/show-value` | With value display |
| `Slider/show-value-range-labels` | With min/max labels |

### DatePicker

| Variant | Description |
|---|---|
| `DatePicker` | Default |
| `DatePicker/filled` | Has date |
| `DatePicker/focus` | Focused |
| `DatePicker/disabled` | Disabled |
| `DatePicker/error` | Error state |
| `DatePicker/description` | With helper text |
| `DatePicker/no-label` | Without label |
| `DatePicker/open` | Calendar open |

### Label

| Variant | Description |
|---|---|
| `Label` | Standard label |
| `Label/description` | With description |
| `Label/required` | With required indicator |
| `Label/required-description` | Required + description |
| `Label/disabled` | Disabled state |

### Tag

| Variant | Description |
|---|---|
| `Tag` | Default |
| `Tag/icon-left` | With leading icon |
| `Tag/icon-right` | With trailing icon |
| `Tag/large` | Large size |
| `Tag/large/icon-left` | Large with leading icon |
| `Tag/large/icon-right` | Large with trailing icon |

---

## 07 · Cards & Controls `[SHIPPED]`

### Card

| Variant | Description |
|---|---|
| `Card` | Default card container |
| `Card/subtle` | Reduced emphasis |
| `Card/shadow` | With drop shadow |
| `Card/no-border` | Borderless |
| `Card/dense` | Compact padding |
| `Card/sm` | Small size |
| `Card/lg` | Large size |

### CardHeader

| Variant | Description |
|---|---|
| `CardHeader` | Title only |
| `CardHeader/description` | Title + description |
| `CardHeader/action` | Title + action button |
| `CardHeader/description-action` | Title + description + action |
| `CardHeader/divider` | With bottom divider |
| `CardHeader/dense` | Compact spacing |

### Callout (Alert)

| Variant | Description |
|---|---|
| `Callout` | Info (default) |
| `Callout/neutral` | Neutral tone |
| `Callout/success` | Success state |
| `Callout/warning` | Warning state |
| `Callout/error` | Error state |
| `Callout/title-only` | Without body |
| `Callout/dismissible` | With close button |
| `Callout/action` | With action button |

### Tabs

| Component | Variant | Description |
|---|---|---|
| `TabItem` | — | Default tab |
| `TabItem/hover` | — | Hovered |
| `TabItem/selected` | — | Active tab |
| `TabItem/disabled` | — | Disabled |
| `TabsGroup` | — | 3-tab group (first selected) |
| `TabsGroup/2-tabs` | — | 2-tab group |
| `TabsGroup/mid-selected` | — | Middle tab active |
| `TabsGroup/last-selected` | — | Last tab active |
| `TabsGroup/4-tabs` | — | 4-tab group |
| `TabsGroup/with-disabled` | — | Group with disabled tab |

### Segmented Control

| Variant | Description |
|---|---|
| `SegmentedControl` | 3-item (first selected) |
| `SegmentedControl/2-items` | 2-item group |
| `SegmentedControl/mid-selected` | Middle selected |
| `SegmentedControl/last-selected` | Last selected |
| `SegmentedControl/4-items` | 4-item group |
| `SegmentedControl/fill` | Fill container width |
| `SegmentedControl/with-disabled` | With disabled item |

### SegmentItem (child of SegmentedControl)

| Variant | Description |
|---|---|
| `SegmentItem` | Default |
| `SegmentItem/hover` | Hovered |
| `SegmentItem/selected` | Active |
| `SegmentItem/disabled` | Disabled |

### Accordion

| Variant | Description |
|---|---|
| `Accordion` | Default (first item open) |
| `Accordion/2-items` | 2-item |
| `Accordion/4-items` | 4-item |
| `Accordion/mid-open` | Middle item open |
| `Accordion/last-open` | Last item open |
| `Accordion/all-closed` | All collapsed |
| `Accordion/multiple-open` | Multiple expanded |

### Collapse

| Variant | Description |
|---|---|
| `Collapse` | Collapsed |
| `Collapse/open` | Expanded |

### ModalDrawer

| Variant | Description |
|---|---|
| `ModalDrawer` | Default |
| `ModalDrawer/with-actions` | With action buttons |
| `ModalDrawer/scroll` | Scrollable content |
| `ModalDrawer/mobile` | Mobile variant |
| `ModalDrawer/mobile/scroll` | Mobile scrollable |
| `ModalDrawer/mobile/with-actions` | Mobile with actions |

### Steps

| Variant | Description |
|---|---|
| `Steps` | Default horizontal steps |
| `Steps/h3-mid` | Mid-step active |
| `Steps/h5` | 5-step variant |
| `Steps/no-labels` | Icons only |
| `Steps/vertical` | Vertical layout |

### ListRow

| Variant | Description |
|---|---|
| `ListRow` | Default |
| `ListRow/with-description` | With subtitle |
| `ListRow/with-border` | With bottom border |
| `ListRow/with-description-border` | Subtitle + border |
| `ListRow/hover` | Hovered |
| `ListRow/disabled` | Disabled |
| `ListRow/long-content` | Overflow handling |
| `ListRow/no-chevron` | Without disclosure arrow |
| `ListRow/no-chevron-description` | No chevron + subtitle |
| `ListRow/no-chevron-border` | No chevron + border |
| `ListRow/no-chevron-description-border` | No chevron + subtitle + border |

### Avatar

| Variant | Description |
|---|---|
| `Avatar` | Image avatar |
| `Avatar/fallback` | Initials fallback |
| `Avatar/icon` | Icon avatar |

### Pagination

| Variant | Description |
|---|---|
| `PaginationDot` | Default dot |
| `PaginationDot/active` | Active dot |
| `PaginationDot/disabled` | Disabled dot |

### Badge

| Variant | Description |
|---|---|
| `Badge New` | New indicator |
| `Badge Changed` | Changed indicator |
| `Badge Deleted` | Deleted indicator |

### CodeBlock

| Variant | Description |
|---|---|
| `CodeBlock` | Default (with language header) |
| `CodeBlock/json` | JSON syntax |
| `CodeBlock/css` | CSS syntax |
| `CodeBlock/no-header` | Without header |
| `CodeBlock/copied` | Copy confirmed state |
| `CodeBlock/error` | Error state |

### Separator

| Component | Description |
|---|---|
| `Separator` | Horizontal divider line |

### Stack

| Component | Description |
|---|---|
| `Stack` | Vertical spacing utility |

---

## 08 · Financial Components `[SHIPPED]`

### TransactionRow

| Variant | Description |
|---|---|
| `TransactionRow` | Default transaction |
| `TransactionRow/hover` | Hovered state |
| `TransactionRow/pressed` | Pressed state |
| `TransactionRow/pending` | Pending transaction |

### TransactionTable (composed)

| Variant | Description |
|---|---|
| `TransactionTable` | Default table |
| `TransactionTable/hover` | Row hover |
| `TransactionTable/pressed` | Row pressed |
| `TransactionTableHeader` | Column headers |

### AccountRow

| Variant | Description |
|---|---|
| `AccountRow` | Default account item |
| `AccountRow/hover` | Hovered |
| `AccountRow/pressed` | Pressed |
| `AccountRow/error` | Error state |

### AccountRowGroup

| Variant | Description |
|---|---|
| `AccountRowGroup` | Grouped accounts |
| `AccountRowGroup/hover` | Group hover |
| `AccountRowGroup/pressed` | Group pressed |

### HoldingsRow

| Variant | Description |
|---|---|
| `HoldingsRow` | Default holding |
| `HoldingsRow/hover` | Hovered |
| `HoldingsRow/pressed` | Pressed |

### HoldingsTable (composed)

| Variant | Description |
|---|---|
| `HoldingsTable` | Default |
| `HoldingsTable/hover` | Row hover |
| `HoldingsTable/pressed` | Row pressed |
| `HoldingsTableHeader` | Column headers |

### DetailRow

| Variant | Description |
|---|---|
| `DetailRow` | Default label-value pair |
| `DetailRow/money` | Currency formatted |
| `DetailRow/positive` | Positive value (green) |
| `DetailRow/negative` | Negative value (red) |
| `DetailRow/muted` | Muted styling |
| `DetailRow/transaction-negative` | Transaction expense |
| `DetailRow/transaction-positive` | Transaction income |

### DetailHeader & DetailSection

| Component | Description |
|---|---|
| `DetailHeader` | Section header in detail view |
| `DetailHeader/with-eyebrow` | With category eyebrow |
| `DetailSection` | Grouped detail rows |

### DetailDrawer

| Variant | Description |
|---|---|
| `DetailDrawer` | Desktop drawer |
| `DetailDrawer/mobile` | Mobile full-screen |

### MoneyText

| Variant | Description |
|---|---|
| `MoneyText` | Default currency display |
| `MoneyText/positive` | Positive (green) |
| `MoneyText/negative` | Negative (red) |
| `MoneyText/muted` | Muted color |
| `MoneyText/sm` | Small size |
| `MoneyText/lg` | Large size |

### DataValueIndicator

| Variant | Description |
|---|---|
| `DataValueIndicator` | Positive trend (green + up arrow) |
| `DataValueIndicator/negative` | Negative trend (red + down arrow) |
| `DataValueIndicator/neutral` | Neutral (gray + dash) |

### TableHeaderCell

| Variant | Description |
|---|---|
| `TableHeaderCell` | Default |
| `TableHeaderCell/sortable` | With sort affordance |
| `TableHeaderCell/sorted-asc` | Sorted ascending |
| `TableHeaderCell/sorted-desc` | Sorted descending |

### Swatch Card

| Component | Description |
|---|---|
| `Swatch Card` | Color swatch display card |

---

## 09 · Charts & Data Visualization `[SHIPPED]`

### Chart types in the system

| Chart | Component name | Variants |
|---|---|---|
| Area | `AreaChart` | default, `/compact`, `/no-card` |
| Multi-Series Area | `AreaChartMultiSeries` | default, `/compact` |
| Bar | `BarChart` | default, `/compact`, `/with-tooltip`, `/no-card` |
| Donut | `DonutChart` | default, `/pressed`, `/with-legend`, `/compact`, `/hover`, `/static-filled` |
| Gauge | `GaugeChart` | default, `/compact`, `/with-min-max`, `/warning`, `/success` |
| KPI Sparkline | `KpiCard/with-sparkline` | (variant of KpiCard) |
| Waterfall | `WaterfallChart` | default, `/with-positive-negative`, `/compact`, `/no-card`, `/with-tooltip` |
| Heatmap | `HeatmapChart` | default, `/positive-negative`, `/compact`, `/with-labels` |
| Candlestick | `CandlestickChart` | default, `/compact`, `/with-grid`, `/no-card`, `/with-tooltip` |
| Projected vs Actual | `ProjectedVsActualChart` | default, `/with-today-marker`, `/compact`, `/no-card`, `/with-tooltip` |
| Benchmark Comparison | `BenchmarkComparisonChart` | default, `/with-labels`, `/compact`, `/no-card`, `/with-tooltip` |
| Treemap | `TreemapChart` | default, `/with-values`, `/with-tooltip`, `/compact`, `/no-card` |
| Sankey | `SankeyDiagram` | default, `/compact`, `/with-values`, `/with-tooltip`, `/no-card` |
| Timeline Scrubber | `TimelineScrubberChart` | default, `/with-events`, `/with-tooltip`, `/compact`, `/no-card` |
| Dual Axis | `DualAxisChart` | default, `/with-tooltip`, `/with-events`, `/compact`, `/no-card` |
| Sparkline (inline) | `Sparkline` | default, `/negative`, `/neutral`, `/with-value`, `/compact` |

### Shared chart primitives

| Component | Variants | Role |
|---|---|---|
| `ChartTooltip` | default, `/multi-series`, `/with-total`, `/compact` | Tooltip overlay |
| `ChartLegend` | default, `/inline-bottom`, `/vertical`, `/compact` | Static legend |
| `InteractiveLegend` | default, `/active`, `/inactive`, `/disabled`, `/compact` | Clickable legend |
| `ChartAxisGrid` | default, `/axis-line`, `/reference-line`, `/full-grid` | Axis & grid lines |
| `ThresholdLine` | default (goal), `/benchmark`, `/limit` | Reference lines |

### Chart design rules

- **Background:** always `$sem-background-surface` (white in light, `$prim-navy-700` in dark). Never gray or tinted.
- **Axis labels:** `xs` size (12px), `$sem-text-meta`
- **Tooltip:** `$sem-background-surface` bg, `shadow-md`, max 240px
- **Legend:** bottom placement default, click-to-toggle via `InteractiveLegend`
- **Threshold lines:** Goal = dashed, Benchmark = dotted, Limit = solid
- **Chart text scaling:** NEVER scale text with chart. Use fixed pixel sizes.

---

## 10 · Gen-UI Affordances `[SHIPPED]`

### Content blocks

| Component | Variants | Role |
|---|---|---|
| `FollowUpBlock` | default, `/with-body-text`, `/compact`, `/horizontal`, `/four-actions`, `/text-buttons`, `/hug` | Suggested action chips |
| `ListBlock` | default, `/compact`, `/numbered`, `/checklist`, `/with-tags`, `/interactive`, `/long-content`, `/radio-list` | Structured list content |
| `SectionBlock` | default, `/with-callout`, `/with-list`, `/with-accordion`, `/compact`, `/long-content` | Section with rich content |

### Image & media

| Component | Variants | Role |
|---|---|---|
| `Image` | default, `/loading`, `/error` | Single image |
| `ImageBlock` | default, `/caption-credit`, `/no-caption`, `/loading`, `/error`, `/centered` | Image with metadata |
| `ImageGallery` | default, `/with-captions`, `/two-column`, `/three-column`, `/mixed-aspect-ratio`, `/with-header`, `/compact` | Multi-image gallery |
| `Carousel` | default, `/image-with-caption`, `/multi-card`, `/with-header`, `/controls-disabled-start`, `/controls-disabled-end` | Swipeable content |

### Text content

| Component | Description |
|---|---|
| `TextContent` | Rich text block for AI responses |

### KPI Cards

| Variant | Description |
|---|---|
| `KpiCard` | Default (positive trend) |
| `KpiCard/negative` | Negative trend |
| `KpiCard/neutral` | No trend |
| `KpiCard/accent` | Accent-colored |
| `KpiCard/with-sparkline` | With inline sparkline |
| `KpiCard/compact` | Compact size |

---

## 11 · Dashboard & Widgets `[PLANNED]`

### Dashboard model

The dashboard is a special mainPanel view containing a **2-column fixed grid** of widget cards. Each widget is a compact preview of a saved or AI-suggested view.

### Widget behavior

| Rule | Detail |
|---|---|
| **Grid** | 2 columns, fixed. Not freeform. |
| **Widget chrome** | Header with title + right-chevron. Click title → full view. |
| **Controls (desktop)** | Hidden until hover: drag handle for rearrange |
| **Controls (mobile)** | No inline controls; user opens view to interact |
| **Widget content** | Read-only compact preview. Full interaction in opened view. |
| **First-time user** | AI suggests default layout. No empty dashboard state. |

### Compact rendering rule

Every gen-UI component that can appear as a widget needs a **compact variant**:

- KpiCard: use `/compact` variant
- Charts: use `/compact` variant (simplified, no axis labels)
- Tables: show first 3 rows + "View all" link
- ListBlock: use `/compact` variant

---

## 12 · Edge Cases & States `[PLANNED]`

Edge state components are specced for future implementation:

| Component | Role |
|---|---|
| Empty State | No data yet — icon + title + description + CTA |
| Error State | System error — icon + title + description + retry |
| AI Error State | AI-specific failure — softer tone |
| Partial Data State | Some data available, some missing |
| Zero Balance State | Account exists but balance is $0 |
| Permission Gated Card | Feature behind auth/upgrade |
| Rate Limited State | Too many requests |
| Conflicting Data State | Data sources disagree |

---

## 13 · Gen-UI Invocation Schema

When the AI generates a component, it emits a JSON object. The gen-UI renderer hydrates it into the matching Hemlock component.

### KpiCard

```json
{
  "component": "KpiCard",
  "variant": "default",
  "label": "Portfolio Value",
  "value": 168209,
  "format": "currency",
  "trend": { "direction": "up", "value": 2.4, "format": "percent", "period": "vs. last month" }
}
```

### TransactionTable

```json
{
  "component": "TransactionTable",
  "transactions": [
    { "merchant": "Whole Foods", "category": "Groceries", "amount": -127.43, "date": "2026-07-05", "status": "posted" }
  ],
  "showHeader": true
}
```

### AreaChart

```json
{
  "component": "AreaChart",
  "variant": "default",
  "title": "Net Worth Over Time",
  "data": { "series": [{ "label": "Total", "values": [] }] },
  "xAxis": { "label": "Month", "format": "date" },
  "yAxis": { "label": "Value", "format": "currency" }
}
```

### DonutChart

```json
{
  "component": "DonutChart",
  "variant": "with-legend",
  "title": "Spending by Category",
  "data": [
    { "label": "Housing", "value": 2400, "color": "$chart-categorical/color-01" },
    { "label": "Food", "value": 800, "color": "$chart-categorical/color-02" }
  ]
}
```

### FollowUpBlock

```json
{
  "component": "FollowUpBlock",
  "variant": "default",
  "actions": ["View transactions", "Set budget alert", "Compare months"]
}
```

### ListBlock

```json
{
  "component": "ListBlock",
  "variant": "numbered",
  "items": [
    { "text": "Reduce dining spend by $200/month" },
    { "text": "Increase emergency fund contribution" },
    { "text": "Rebalance investment portfolio" }
  ]
}
```

### SectionBlock

```json
{
  "component": "SectionBlock",
  "variant": "with-callout",
  "title": "Retirement Readiness",
  "body": "Your current savings rate puts you on track for retirement at age 67.",
  "callout": { "type": "success", "message": "You're ahead of 72% of peers in your age group." }
}
```

### DetailDrawer

```json
{
  "component": "DetailDrawer",
  "variant": "default",
  "header": { "title": "Chase Sapphire", "eyebrow": "Credit Card" },
  "sections": [
    {
      "rows": [
        { "label": "Current Balance", "value": "$4,231.00", "variant": "money" },
        { "label": "Available Credit", "value": "$15,769.00", "variant": "positive" }
      ]
    }
  ]
}
```

---

*Maintained by Vega. Visual canvas: `hemlock-library.lib.pen`. Both must stay in sync — same commit, no exceptions.*
