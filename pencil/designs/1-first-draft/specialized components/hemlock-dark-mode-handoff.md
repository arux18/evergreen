# Hemlock Dark Mode — Specialized Component Handoff

> **Purpose:** Complete dark-mode styling reference for specialized HTML components built on **Component Template v2.0**. You already have the light-mode values — this document gives you the **dark values** from the Hemlock design system, keyed to the template's own CSS custom properties, with the Hemlock semantic token each one maps to (so future library updates can be diffed against this file).
>
> **Companion file:** `Component Template v2.0 (Hemlock Dark).html` — a working duplicate of the template with every dark value below already applied. Open it in a browser, switch the Theme toggle to Dark, and treat it as the visual source of truth. The pristine template is `Component Template v2.0.html` (same folder).
>
> **Source of truth chain:** `hemlock-library.lib.pen` (the Hemlock library — `sem-*` semantic tokens on the `🎨 Colors` Light/Dark axis, resolving to `prim-*` primitives) ← `Evergreen.ai_DarkMode_DesignHandoff` package (Amanda, 2026-08-20). The `.pen` library and that package were verified value-identical on 2026-08-20.
>
> **Supersedes:** the dark-mode columns of `_Archive/hemlock-component-styling-handoff.md` and the built-in dark block of `_Archive/Component Template.html`. Light-mode values in the archived doc are unaffected.

---

## 1. How to Apply

Dark mode is activated by `html[data-theme="dark"]`. Every value in this document lives in one of two dark-scoped custom-property blocks (copy-paste blocks in §10):

1. The **core block** on `html[data-theme="dark"]` — surfaces, text, borders, accents, status, charts, shadows.
2. The **widget block** on `html[data-theme="dark"] #appMain, html[data-theme="dark"] .t2-rd-backdrop` — the `--tk-*` layer (buttons, dropdowns, checks, radios, switches, sliders, segmented controls).

Light mode: **no changes.** Your existing light values stay exactly as they are.

---

## 2. System Rules (read before styling anything)

These are the Hemlock dark-theme principles baked into every value below. They come from the approved Aug 20 design rulings.

1. **Elevation = lighter surface, not shadow.** The navy ramp runs `navy-950 #090E1B` (darkest) → `navy-50 #33476E` (lightest). Page sits on `navy-800`, cards on `navy-700`, raised tiles/headers/tooltips/menus on `navy-600`. A thing that floats is *lighter*, not outlined or shadow-lifted. Shadows still exist but they deepen (see §9) — they support, they don't carry.
2. **State fills are opaque navy steps — never alpha.** Hover `navy-500 #172642`, pressed `navy-400 #202C4E`. Alpha survives in exactly five places: the modal/drawer scrim, the focus ring, the chat glow, the voice pulse, and chart area washes. Everything else is opaque (semi-transparent fills bleed through sticky table columns).
3. **Blue is the primary accent; sky is informational only.** Actions, links, selected states = blue (`prim-blue-400/500`). Info tiles, info icons, informational alerts = sky (`prim-sky-250 #38BDF8`). **Dark info is no longer purple** — the template v2.0's purple info tiles (`#9A86FF`) are superseded.
4. **Primary buttons carry BLACK text in dark.** `sem-btnPrimaryBg` = `prim-blue-500 #5A82F9` with `sem-btnPrimaryText` = `prim-base-black #000000` (hover text: `navy-950 #090E1B`). White-on-blue is a light-mode-only pairing.
5. **Statuses are desaturated for navy.** Success `green-350 #4ADE80`, error `red-350 #F87171`, warning `orange-400 #FB924D`, with `-muted` steps for body copy. Status *surfaces* are the flattened `*dark` tint primitives (e.g. `greendark-300 #12291C`) — opaque, not rgba washes.
6. **Text uses the navylight ramp.** Headers `navylight-800 #D8E1F0`, body `navylight-600 #B3C1DB`, meta `navylight-300 #697DA0`, subtle/captions `navylight-200 #52637F`. The old template dark text values (`#EAF0FF`, `#9DB0D2`, `#C9D4EA`) are superseded.
7. **Borders shift roles in dark.** `sem-borders-light` (the light-mode default hairline) becomes `navy-700 #131C31` — *the same value as the surface*, so on-surface hairlines deliberately disappear and lightness does the separating. Where a **visible** outline is needed, use `sem-borders-muted #2A3A5C`; emphasized rules/control outlines use `sem-borders-strong #33476E`. The template mapping in §3 already makes this choice for you.

---

## 3. Core Tokens (template var → Hemlock token → dark value)

Light values are listed for reference only — they are yours already and do not change. "Was (v2.0)" is the template's superseded built-in dark value.

### Surfaces

| Template var | Hemlock token | Light | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|---|
| `--page-bg` | `sem-background-main` → `prim-navy-800` | `#FFFFFF` | **`#101729`** | `#101729` | Unchanged — the template already matched. |
| `--surface-1` | `sem-background-surface` → `prim-navy-700` | `#FFFFFF` | **`#131C31`** | `#0E1524` | Cards, inputs, table cells, rows. |
| `--surface-2` | `sem-background-light` → `prim-navy-600` | `#F8F7F6` | **`#18223A`** | `#121B2E` | Also `sem-background-elevated` / `sem-background-subtle` resolve here — raised tiles, table headers, tooltips, modals. |
| `--nest` | `sem-background-subtle` → `prim-navy-600` | `#F8F7F6` | **`#18223A`** | `#131C30` | Nested containers. |
| `--calc-bg` | `sem-background-sunken` → `prim-navy-900` | `#F7F5F0` | **`#0C1222`** | `#12203C` | Sunken panels (calculator body). |

### Text

| Template var | Hemlock token | Light | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|---|
| `--ink` | `sem-text-header` → `prim-navylight-800` | `#0E0E0E` | **`#D8E1F0`** | `#EAF0FF` | Headings, primary text. |
| `--text-body` | `sem-text-body` → `prim-navylight-600` | `#403D3A` | **`#B3C1DB`** | `#C9D4EA` | Body copy. |
| `--muted` | `sem-text-meta` → `prim-navylight-300` | `#5E5954` | **`#697DA0`** | `#9DB0D2` | Labels, secondary text. ≈4.1:1 on `--surface-1` — use for labels/meta, not small body copy (body copy is `--text-body`). |
| `--faint` | `sem-text-subtle` → `prim-navylight-200` | `#767169` | **`#52637F`** | `#8A9BBF` | Captions, disclosures. |
| `--inverse` | `sem-text-reverse` → `prim-gray-900` | `#FFFFFF` | **`#0E0E0E`** | `#0B1220` | Text on inverted fills. |

### Borders

| Template var | Hemlock token | Light | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|---|
| `--border` | `sem-borders-muted` → `prim-navy-200` | `#EEEDEB` | **`#2A3A5C`** | `#243350` | The template uses `--border` wherever a *visible* component outline is needed (inputs, tiles, menus), so it maps to the muted step. See the note below. |
| `--border-strong` | `sem-borders-strong` → `prim-navy-50` | `#D5D3D0` | **`#33476E`** | `#33476E` | Section rules, control outlines. Template already matched. |
| `--taupe-border` | `sem-borders-dark` → `prim-navy-300` | `#E3DFD6` | **`#22314F`** | `#243350` | Taupe-accent borders (calc panel). |
| `--hairline` | — (static) | `#595959` | **`#595959`** | `#595959` | Unchanged; video-thumb outline + no-chrome insets. |

> **Border mapping note.** By light-value identity `--border` (#EEEDEB) equals `sem-borders-light`, whose dark value is `navy-700 #131C31` — *identical to the surface*, i.e. invisible. That is intentional in Hemlock (rule §2.7): on-surface hairlines vanish and elevation separates. The template collapses "hairline" and "component outline" into one var, so this handoff maps `--border` to the **visible** role (`sem-borders-muted`). If your component wants the pure Hemlock divider-less look (e.g. dark tables without row rules), use `sem-borders-light #131C31` for those specific dividers.

### Accent & interaction

| Template var | Hemlock token | Light | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|---|
| `--accent` | `sem-background-action` / `sem-text-action` → `prim-blue-500` | `#3A6AF8` | **`#5A82F9`** | `#5A86FF` | Primary accent. |
| `--accent-hover` | `sem-btnPrimaryBgHover` → `prim-blue-400` | `#2952CC` | **`#7094FB`** | `#8FB0FF` | Hover steps go *lighter* in dark. |
| `--accent-subtle` | `sem-background-highlight` → `prim-skydark-100` | `#EBF0FE` | **`#16304A`** | `rgba(58,106,248,.18)` | Now opaque (rule §2.2). |
| `--accent-fill` | derived: `prim-blue-500` @ 15% | `rgba(58,106,248,0.15)` | **`rgba(90,130,249,0.15)`** | — (not overridden) | Chart area wash — one of the surviving alphas. |
| `--brand-blue` | alias of `--accent` | `var(--accent)` | **`var(--accent)`** | same | No change needed. |
| `--row-hover` | `sem-background-rowHover` → `prim-navy-500` | `var(--taupe-100)` | **`#172642`** | `#12203C` | Opaque — sticky columns. |
| `--row-pressed` | `sem-background-rowPressed` → `prim-navy-400` | `var(--taupe-pressed)` | **`#202C4E`** | `#1B2C4F` | Opaque. |
| `--taupe-100` | `sem-background-rowHover` → `prim-navy-500` | `#F7F5F0` | **`#172642`** | `#141E36` | Tab band, taupe surfaces. |
| `--taupe-pressed` | `sem-background-rowPressed` → `prim-navy-400` | `#EDEAE3` | **`#202C4E`** | `#1B2C4F` | |

### Secondary accents

These template vars have no 1:1 Hemlock accent role; they map to the nearest chart-palette entries. Flagged for future reconciliation.

| Template var | Nearest Hemlock token | Light | **Dark (new)** | Was (v2.0) |
|---|---|---|---|---|
| `--accent-2` (teal) | `sem-chart-cat-7` | `#2FD4C4` *(yours)* | **`#84E6CC`** | `#2FD4C4` |
| `--accent-3` (purple — KPI overlines) | `sem-chart-cat-1` | — | **`#B198F0`** | `#9A86FF` |
| `--accent-4` (gold) | `sem-chart-cat-14` | — | **`#D9A02E`** | `#E3B972` |

### Status & semantic accents

| Template var | Hemlock token | Light | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|---|
| `--pos` | `sem-text-deposit` → `prim-green-350` | `#148338` | **`#4ADE80`** | `#34D399` | |
| `--pos-strong` | `sem-text-success-title` → `prim-green-350` | `#148338` | **`#4ADE80`** | `#5FE0A8` | Pros titles/strips. |
| `--pos-mid` | `sem-text-success-body` → `prim-green-350-muted` | `#22C55E` | **`#74D791`** | — | Nearest role (success body copy). |
| `--pos-soft` | `prim-green-350` (static paint) | `#4ADE80` | **`#4ADE80`** | — | Same both modes. |
| `--neg` | `sem-text-error` → `prim-red-350` | `#C82320` | **`#F87171`** | `#F87171` | |
| `--neg-strong` | `sem-text-error-body-strong` → `prim-red-250` | `#C82320` | **`#FCA5A5`** | `#FCA5A5` | Cons titles/strips. |
| `--neg-soft` | `prim-red-350` (static paint) | `#F87171` | **`#F87171`** | — | Same both modes. |
| `--warn` | `sem-text-warning-title` → `prim-orange-400` | `#C85F1A` | **`#FB924D`** | — | |
| `--info` | `sem-icons-info` → `prim-sky-250` | `#3A6AF8` *(yours)* | **`#38BDF8`** | `#9A86FF` | **Sky, not purple** (rule §2.3). Info-tile strip. |
| `--info-title` | `sem-text-info-title` → `prim-sky-250` | `#3A6AF8` *(yours)* | **`#38BDF8`** | `#C3B4FF` | Info-tile title. |
| `--orange` | — (no Hemlock role) | `#EA580C` | **`#EA580C`** | — | Retained; flag if a role is minted. |

### Status tile surfaces (pros / cons / info)

Dark tiles are **flat opaque token surfaces** — the v2.0 translucent gradients are retired.

| Template var | Hemlock token | Light (yours) | **Dark (new)** | Was (v2.0, via gradient rules) |
|---|---|---|---|---|
| `--pros-bg` | `sem-background-success` → `prim-greendark-300` | `rgba(20,131,56,.07)` | **`#12291C`** | `rgba(52,211,153,0.16)` gradient |
| `--pros-border` | `sem-borders-success` → `prim-greendark-100` | `rgba(20,131,56,.25)` | **`#245234`** | `rgba(52,211,153,0.32)` |
| `--cons-bg` | `sem-background-error` → `prim-reddark-200` | `rgba(200,35,32,.06)` | **`#3A1B1E`** | `rgba(248,113,113,0.15)` gradient |
| `--cons-border` | `sem-borders-error-subtle` → `prim-reddark-100` | `rgba(200,35,32,.22)` | **`#542427`** | `rgba(248,113,113,0.30)` |
| `--info-bg` | `sem-background-info` → `prim-skydark-200` | `rgba(58,106,248,.06)` | **`#10263C`** | purple gradient |
| `--info-border` | `sem-borders-info` → `prim-skydark-100` | `rgba(58,106,248,.24)` | **`#16304A`** | `rgba(154,134,255,0.32)` |

Related warning-surface roles (no template vars yet, available if your component needs them): `sem-background-warning #33200F`, `sem-background-warning-strong #5E3A18`, `sem-borders-warning #5E3A18`.

---

## 4. Widget Token Layer (`--tk-*`)

Scoped to `#appMain` and `.t2-rd-backdrop`. Buttons follow the `sem-btnPrimary*` family; selection controls follow the slider/toggle/icon action roles.

| Template var | Hemlock token | **Dark (new)** | Was (v2.0) | Notes |
|---|---|---|---|---|
| `--tk-accent` | `sem-sliderAccent` / `sem-toggleKnobOn` / `sem-icons-action` → `prim-blue-400` | **`#7094FB`** | `#0075FF` | Checks, radios, switches, slider fill, dropdown selected border, focus icons. |
| `--tk-accent-hover` | `sem-btnLinkTextHover` → `prim-blue-300` | **`#A5BCFC`** | `#9BB3FC` | |
| `--tk-accent-subtle` | `sem-background-highlight` → `prim-skydark-100` | **`#16304A`** | `#152354` | Selected fills + the template's focus rings. For your real components the dedicated focus token is `sem-borders-focus: rgba(112,148,251,0.35)`. |
| `--tk-btn-accent` | `sem-btnPrimaryBg` → `prim-blue-500` | **`#5A82F9`** | `#0075FF` | |
| `--tk-btn-accent-hover` | `sem-btnPrimaryBgHover` → `prim-blue-400` | **`#7094FB`** | `#3392FF` | |
| `--tk-text-inverse` | `sem-btnPrimaryText` → `prim-base-black` | **`#000000`** | `#FFFFFF` | **Black label on primary buttons** (rule §2.4). Also the checkbox glyph on the blue-400 checked box. |
| `--tk-text-1/2/3` | `sem-text-header/meta/subtle` | **`var(--ink)` / `var(--muted)` / `var(--faint)`** | same refs | Resolve to the new navylight values. |
| `--tk-surface-1/2` | `sem-background-surface/light` | **`var(--surface-1)` / `var(--surface-2)`** | same refs | |
| `--tk-surface-3` | `sem-background-muted` → `prim-navy-500` | **`#172642`** | `#1B2C4F` | |
| `--tk-border` | `sem-borders-muted` → `prim-navy-200` | **`var(--border)` = `#2A3A5C`** | `var(--border)` | |
| `--tk-border-strong` | `sem-borders-strong` → `prim-navy-50` | **`var(--border-strong)` = `#33476E`** | `var(--border-strong)` | Also unchecked check/radio rings (was a brightened one-off `#5E6E90`). |
| `--tk-error` | `sem-text-error` → `prim-red-350` | **`#F87171`** | `#F87171` | |
| `--tk-error-subtle` | `sem-background-error` → `prim-reddark-200` | **`#3A1B1E`** | `#450A0A` | |
| `--tk-track` | `sem-sliderTrack` → `prim-navy-300` | **`#22314F`** | `#26324C` | |
| `--tk-off` | `sem-toggleTrackOff` → `prim-navy-500` | **`#172642`** | `#33476E` | |
| `--tk-thumb-dis` | `sem-background-disabled` → `prim-navy-700` | **`#131C31`** | `#141E36` | |
| `--tk-shadow-sm` | `prim-shadow-sm-color` (28%) | **`0 1px 3px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)`** | `…0.5…` | |
| `--tk-shadow-dd` | `prim-shadow-lg-color` (45%) | **`0 4px 16px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05)`** | `…0.6…` | |

Two rule-level notes applied in the companion HTML:

- **Toggle thumb** stays white in dark (`sem-toggleKnob #FFFFFF` both modes) — the template's thumb reads `--tk-surface-1`, so the dark build adds `html[data-theme="dark"] .tkt-thumb{background:#FFFFFF;}`.
- **Selected dropdown items** use `--tk-btn-accent` + `--tk-text-inverse` (blue-500 fill, black label) — the old white-on-accent pairing fails contrast on blue-400.

---

## 5. Buttons — Full Hemlock Matrix (resolved hex, dark)

For components that draw their own buttons rather than the `--tk-*` widgets. Light values are in your existing spec; dark below. Disabled dim: **45% opacity** in dark (38% light).

| Family / state | Bg | Text | Border |
|---|---|---|---|
| **Primary** rest | `#5A82F9` (blue-500) | `#000000` (black!) | — |
| Primary hover | `#7094FB` | `#090E1B` (navy-950) | — |
| Primary pressed | `#3A6AF8` | `#000000` | — |
| Primary disabled | `#163196` (blue-800) | `#5A82F9` | — |
| **Primary Inverted** rest | `#131C31` (navy-700) | `#7094FB` | `#33476E` (navy-50) |
| Primary Inverted hover | `#172642` | `#A5BCFC` | `#5A82F9` |
| Primary Inverted pressed | `#202C4E` | `#A5BCFC` | `#33476E` |
| Primary Inverted disabled | `#131C31` | `#3A485F` | `#22314F` |
| **Secondary (outline)** rest | transparent | `#7094FB` | `#33476E` |
| Secondary hover | `#172642` | `#A5BCFC` | `#5A82F9` |
| Secondary pressed | `#202C4E` | `#A5BCFC` | `#5A82F9` |
| Secondary disabled | transparent | `#3A485F` | `#22314F` |
| **Secondary Inverted** (white-alpha; identical both modes) | transparent / hover+pressed `#FFFFFF1A` | `#FFFFFF` (pressed `#D5D3D0`, disabled `#B5B1AB`) | `#D5D3D0` (hover `#FFFFFF`, pressed transparent, disabled `#B5B1AB`) |
| **Destruction** rest | `#C82320` (red is paint) | `#EEEDEB` | — |
| Destruction hover | `#FA2C28` | `#FFFFFF` | — |
| Destruction pressed | `#961A18` | `#FFFFFF` | — |
| Destruction disabled | `#22314F` | `#3A485F` | — |
| **Link (text button)** rest | transparent | `#7094FB` (WCAG 6.2:1 on bg-main) | — |
| Link hover | `#172642` | `#A5BCFC` | — |
| Link pressed | `#202C4E` | `#5A82F9` | `#5A82F9` (border pressed) |
| Link disabled | transparent | `#3A485F` | — |

---

## 6. Charts

### Categorical palette (`--cat1..7` → `sem-chart-cat-1..7`)

The full Hemlock categorical set is 15 colors; the template exposes the first 7. **Heads-up:** the Hemlock *light* palette differs from the template's current light values (Hemlock cat-1 is purple `#8951F0`; the template's is blue `#3A6AF8`). Light is out of scope here — but flag the divergence when light reconciliation happens.

| Token | Light (Hemlock) | **Dark** | Token | Light (Hemlock) | **Dark** |
|---|---|---|---|---|---|
| cat-1 | `#8951F0` | **`#B198F0`** | cat-9 | `#C026D3` | **`#DB74E6`** |
| cat-2 | `#06B6D4` | **`#5FD3E6`** | cat-10 | `#E73CAE` | **`#F485BE`** |
| cat-3 | `#312E81` | **`#8480D9`** | cat-11 | `#E879A8` | **`#E89FB0`** |
| cat-4 | `#3B82F6` | **`#7AA0F5`** | cat-12 | `#92400E` | **`#CE7E5B`** |
| cat-5 | `#0F766E` | **`#4FC0A6`** | cat-13 | `#FB923C` | **`#F0985A`** |
| cat-6 | `#38BDF8` | **`#84D2F7`** | cat-14 | `#CA8A04` | **`#D9A02E`** |
| cat-7 | `#2DD4BF` | **`#84E6CC`** | cat-15 | `#FACC15` | **`#F3DE6F`** |
| cat-8 | `#A78BFA` | **`#C7BAF7`** | | | |

### Sequential ramp (`sem-chart-seq-*`) — blue palette, depth reversed in dark

| Token | Light | **Dark** |
|---|---|---|
| seq-100 | `#EBF0FE` (blue-100) | **`#163196`** (blue-800) |
| seq-200 | `#C8D6FD` | **`#2952CC`** |
| seq-300 | `#A5BCFC` | **`#3A6AF8`** |
| seq-400 | `#7094FB` | **`#5A82F9`** |
| seq-500 | `#5A82F9` | **`#7094FB`** |
| seq-600 | `#3A6AF8` | **`#A5BCFC`** |
| seq-700 | `#2952CC` | **`#C8D6FD`** |

### Threshold & scaffold

- `sem-chart-threshold` → `sem-background-action`: **`#5A82F9`** dark (`#3A6AF8` light). **Never orange.**
- Chart scaffold (`--grid #26324C`, `--grid2 #26324C`, `--axis #5E6E90`) has **no Hemlock tokens yet** — these are the accepted AreaChart reference-sheet values, retained as-is. Flag for future tokenization.
- Area washes keep alpha (rule §2.2): `--accent-fill: rgba(90,130,249,0.15)` dark.

---

## 7. Component Recipes (dark)

What the companion HTML applies, rule by rule. Gradients from v2.0's dark treatments are **retired in favor of flat token surfaces** (rule §2.1).

| Component | v2.0 dark treatment | **Hemlock dark treatment** |
|---|---|---|
| Page body | flat `#101729` | Same — `var(--page-bg)` `#101729` (`sem-background-main`). |
| Card (chrome tile) | same flat color as page, outline-defined | **`var(--surface-1)` `#131C31`** — the card now sits one step *lighter* than the page (elevation, §2.1), keeping its 1px blue-tint ring. |
| Tab band (`.sc-tabs-wrap`) | `#141E36` | **`var(--taupe-100)` `#172642`** |
| Option tiles (`.sc-plan-card`) | vertical gradient `#121B2E→#0E1524` | **flat `var(--surface-2)` `#18223A`**, border `var(--border-strong)`; hover **flat `var(--row-hover)` `#172642`** + border `var(--accent)` + `0 10px 24px rgba(0,0,0,0.36)` |
| Generic boxes (`.sc-box`), checklist cards | gradients | **flat `var(--surface-2)` `#18223A`** |
| Pros / Cons / Info tiles | translucent green/red/**purple** gradients | **flat opaque `var(--pros-bg)` / `var(--cons-bg)` / `var(--info-bg)`** with their token borders — info is **sky** (§3). Titles/strips via `--pos-strong` / `--neg-strong` / `--info-title` / `--info`. |
| Table headers (data + compare) | gradient `#17263F→#101A2E` | **flat `var(--surface-2)` `#18223A`** (`sem-background-elevated`) |
| Row hover / pressed | `#12203C` / `#1B2C4F` | **`#172642` / `#202C4E`** — opaque (sticky columns, §2.2) |
| Sticky-column edge shadow | `rgba(0,0,0,.6)` | **`rgba(0,0,0,0.45)`** (`prim-shadow-lg-color`) |
| Sort arrows | unsorted `#8695B5`, sorted **white** | unsorted **`#52637F`** (`sem-icons-subtle`), sorted **`#7094FB`** (`sem-icons-action`) |
| KPI cards (`.sc-kpi`) | gradient `#111A2C→#0D1421`, purple top bar `#9A86FF` | **flat `var(--surface-2)`**, top bar `var(--accent-3)` → **`#B198F0`** (`sem-chart-cat-1` — nearest role, flagged) |
| Calculator body | purple radial + navy gradient | **flat `var(--calc-bg)` `#0C1222`** (`sem-background-sunken`), border `var(--taupe-border)` `#22314F`, shadow `0 18px 42px rgba(0,0,0,0.45)` |
| Tooltips (`#t2Tip`, `.t2ck-tip`) | gradients / `#17263F` | **flat `var(--surface-2)` `#18223A`** (elevated), border `var(--border-strong)` |
| Dropdown menus (single-select) | `#070A10` | **`#090E1B`** (`prim-navy-950` — the deleted `#070A10`'s successor step) |
| Selected dropdown item | `--tk-accent` bg + white text | **`--tk-btn-accent` `#5A82F9` bg + `--tk-text-inverse` `#000000` text** |
| Check/radio unchecked rings | `#5E6E90` one-off | **`var(--tk-border-strong)` `#33476E`** |
| Toggle thumb | `--tk-surface-1` (navy) | **`#FFFFFF`** (`sem-toggleKnob`, both modes) |
| Row-detail modal | gradient; scrim `rgba(20,32,60,0.62)` | **flat `var(--surface-2)`**; scrim **`rgba(0,0,0,0.64)`** (`prim-shadow-overlay-color`) |
| Modal / video backdrop (`--backdrop`) | light-tinted `rgba(225,230,240,0.22)` | **`rgba(0,0,0,0.64)`** — scrims are black in dark (§2.2) |
| Disclosure top rules (gradient border-image) | `rgba(90,134,255,.55)→rgba(47,212,196,.18)` | **`rgba(90,130,249,0.55)→rgba(132,230,204,0.18)`** — re-derived from the new accent + cat-7 |
| Select chevron (native) | `#A3A3A3` glyph | **`#697DA0`** (`sem-icons-meta`) |
| Attention badges (`.sc-title-badge`) | `#6E52FF` both modes | **unchanged `#6E52FF`** — no Hemlock role exists; Bill's rev E ruling stands until a `sem-` badge role is minted. Flagged. |
| Hero ombre / video posters (`--hero-1..8`) | brand radial gradient | **unchanged** — brand gradient, outside the token system. |

---

## 8. Focus

- Canonical dark focus ring: **`sem-borders-focus: rgba(112,148,251,0.35)`** (blue-400 @ 35% — one of the surviving alphas). Light's focus is `gray-900`.
- Recommended pattern: `box-shadow: 0 0 0 3px rgba(112,148,251,0.35);`
- The template's `--tk-*` widgets reuse `--tk-accent-subtle` (`#16304A`, opaque) for both the ring and selected fills — acceptable inside the template, but new components should bind the dedicated focus token.
- `sem-borders-focus-inverted` (focus on inverted fills): `#0E0E0E` dark.

---

## 9. Shadows & Overlays

Dark shadows deepen; they don't replace surface elevation (§2.1).

| Role | Hemlock token | Light | **Dark** |
|---|---|---|---|
| Small (controls) | `prim-shadow-sm-color` | black @ 8% | **black @ 28%** (`#00000047`) |
| Medium (panels, hover lifts) | `prim-shadow-md-color` | black @ 10% | **black @ 36%** (`#0000005C`) |
| Large (dropdowns, tiles) | `prim-shadow-lg-color` | black @ 12% | **black @ 45%** (`#00000073`) |
| Overlay / scrim / modal | `prim-shadow-overlay-color` | black @ 16% | **black @ 64%** (`#000000A3`) |

Template mappings: `--tile-shadow: 0 0 0 1px rgba(120,150,255,0.06), 0 16px 40px rgba(0,0,0,0.45)` · `--panel-shadow-hover: 0 8px 24px rgba(0,0,0,0.36)` · `--modal-shadow: 0 16px 40px rgba(0,0,0,0.64)` · `--backdrop: rgba(0,0,0,0.64)`.

---

## 10. Copy-Paste Dark Blocks

These are exactly the blocks applied in `Component Template v2.0 (Hemlock Dark).html`.

```css
html[data-theme="dark"]{
  /* surfaces */
  --surface-1:#131C31;            /* sem-background-surface (prim-navy-700) */
  --surface-2:#18223A;            /* sem-background-light / -elevated / -subtle (prim-navy-600) */
  --nest:#18223A;                 /* sem-background-subtle */
  --page-bg:#101729;              /* sem-background-main (prim-navy-800) */
  --calc-bg:#0C1222;              /* sem-background-sunken (prim-navy-900) */
  /* borders */
  --border:#2A3A5C;               /* sem-borders-muted (prim-navy-200) — visible-outline role; pure hairlines = sem-borders-light #131C31 */
  --border-strong:#33476E;        /* sem-borders-strong (prim-navy-50) */
  --taupe-border:#22314F;         /* sem-borders-dark (prim-navy-300) */
  /* text */
  --ink:#D8E1F0;                  /* sem-text-header (prim-navylight-800) */
  --text-body:#B3C1DB;            /* sem-text-body (prim-navylight-600) */
  --muted:#697DA0;                /* sem-text-meta (prim-navylight-300) */
  --faint:#52637F;                /* sem-text-subtle (prim-navylight-200) */
  --inverse:#0E0E0E;              /* sem-text-reverse (prim-gray-900) */
  /* accent & interaction */
  --accent:#5A82F9;               /* sem-background-action / sem-text-action (prim-blue-500) */
  --accent-hover:#7094FB;         /* sem-btnPrimaryBgHover (prim-blue-400) */
  --accent-subtle:#16304A;        /* sem-background-highlight (prim-skydark-100, opaque) */
  --accent-fill:rgba(90,130,249,0.15);  /* derived: prim-blue-500 @ 15% — chart wash (alpha survives) */
  --accent-2:#84E6CC;             /* nearest: sem-chart-cat-7 */
  --accent-3:#B198F0;             /* nearest: sem-chart-cat-1 — KPI overlines */
  --accent-4:#D9A02E;             /* nearest: sem-chart-cat-14 */
  --row-hover:#172642;            /* sem-background-rowHover (prim-navy-500, opaque) */
  --row-pressed:#202C4E;          /* sem-background-rowPressed (prim-navy-400, opaque) */
  --taupe-100:#172642;            /* sem-background-rowHover */
  --taupe-pressed:#202C4E;        /* sem-background-rowPressed */
  /* status */
  --pos:#4ADE80;                  /* sem-text-deposit (prim-green-350) */
  --pos-strong:#4ADE80;           /* sem-text-success-title */
  --pos-mid:#74D791;              /* sem-text-success-body (prim-green-350-muted) */
  --neg:#F87171;                  /* sem-text-error (prim-red-350) */
  --neg-strong:#FCA5A5;           /* sem-text-error-body-strong (prim-red-250) */
  --warn:#FB924D;                 /* sem-text-warning-title (prim-orange-400) */
  --info:#38BDF8;                 /* sem-icons-info (prim-sky-250) — SKY, not purple */
  --info-title:#38BDF8;           /* sem-text-info-title (prim-sky-250) */
  --pros-bg:#12291C;   --pros-border:#245234;   /* sem-background-success / sem-borders-success */
  --cons-bg:#3A1B1E;   --cons-border:#542427;   /* sem-background-error / sem-borders-error-subtle */
  --info-bg:#10263C;   --info-border:#16304A;   /* sem-background-info / sem-borders-info */
  /* charts */
  --cat1:#B198F0; --cat2:#5FD3E6; --cat3:#8480D9; --cat4:#7AA0F5;
  --cat5:#4FC0A6; --cat6:#84D2F7; --cat7:#84E6CC;                  /* sem-chart-cat-1..7 */
  --grid:#26324C; --grid2:#26324C; --axis:#5E6E90;                 /* no Hemlock tokens yet — reference values */
  /* shadows & scrims */
  --tile-shadow:0 0 0 1px rgba(120,150,255,0.06),0 16px 40px rgba(0,0,0,0.45);  /* prim-shadow-lg-color 45% */
  --panel-shadow-hover:0 8px 24px rgba(0,0,0,0.36);                             /* prim-shadow-md-color 36% */
  --modal-shadow:0 16px 40px rgba(0,0,0,0.64);                                  /* prim-shadow-overlay-color 64% */
  --backdrop:rgba(0,0,0,0.64);                                                  /* prim-shadow-overlay-color */
  /* brand hero ombre — outside the token system, unchanged */
  --hero-1:#7094FB; --hero-2:#5873C0; --hero-3:#3F5185; --hero-4:#334067;
  --hero-5:#273049; --hero-6:#1A1F2C; --hero-7:#14161D; --hero-8:#0E0E0E;
  --hero-ombre:radial-gradient(120% 130% at 50% 100%,#7094FB 0%,#5873C0 18%,#3F5185 34%,#334067 46%,#273049 58%,#1A1F2C 70%,#14161D 80%,#0E0E0E 90%);
}

html[data-theme="dark"] #appMain,
html[data-theme="dark"] .t2-rd-backdrop{
  --tk-accent:#7094FB;            /* sem-sliderAccent / sem-toggleKnobOn / sem-icons-action (prim-blue-400) */
  --tk-accent-hover:#A5BCFC;      /* sem-btnLinkTextHover (prim-blue-300) */
  --tk-accent-subtle:#16304A;     /* sem-background-highlight; dedicated focus token = rgba(112,148,251,0.35) */
  --tk-btn-accent:#5A82F9;        /* sem-btnPrimaryBg (prim-blue-500) */
  --tk-btn-accent-hover:#7094FB;  /* sem-btnPrimaryBgHover (prim-blue-400) */
  --tk-text-inverse:#000000;      /* sem-btnPrimaryText — BLACK label on dark primary buttons */
  --tk-text-1:var(--ink); --tk-text-2:var(--muted); --tk-text-3:var(--faint);
  --tk-surface-1:var(--surface-1); --tk-surface-2:var(--surface-2);
  --tk-surface-3:#172642;         /* sem-background-muted (prim-navy-500) */
  --tk-border:var(--border); --tk-border-strong:var(--border-strong);
  --tk-error:#F87171;             /* sem-text-error */
  --tk-error-subtle:#3A1B1E;      /* sem-background-error (prim-reddark-200) */
  --tk-track:#22314F;             /* sem-sliderTrack (prim-navy-300) */
  --tk-off:#172642;               /* sem-toggleTrackOff (prim-navy-500) */
  --tk-thumb-dis:#131C31;         /* sem-background-disabled (prim-navy-700) */
  --tk-shadow-sm:0 1px 3px rgba(0,0,0,0.28),0 0 0 1px rgba(255,255,255,0.04);   /* prim-shadow-sm-color */
  --tk-shadow-dd:0 4px 16px rgba(0,0,0,0.45),0 0 0 1px rgba(255,255,255,0.05);  /* prim-shadow-lg-color */
}

/* rule-level companions (see §7) */
html[data-theme="dark"] .tkt-thumb{background:#FFFFFF;}  /* sem-toggleKnob — white both modes */
```

---

## 11. Values With No Hemlock Role (retained, flagged)

| Value | Where | Status |
|---|---|---|
| `--hero-1..8` / `--hero-ombre` | hero glow, video posters | Brand gradient — outside the token system. Unchanged. |
| `.sc-title-badge #6E52FF` | LISTINGS / CALCULATOR badges | Bill's rev E ruling (both modes). No `sem-` badge role exists yet. |
| `--grid / --grid2 / --axis` | chart scaffold | AreaChart reference-sheet values. Candidates for future `sem-chart-*` scaffold tokens. |
| `--orange #EA580C` | chart/status extra | No Hemlock role; unchanged. |
| `--zero #B6B9B7`, `--det #5E5954` | chart scaffold (not dark-overridden in v2.0 either) | Consider `--axis` / `--muted` respectively if they surface in your component. |
| `--hairline #595959` | video-thumb outline, no-chrome insets | Static by design. |

---

## 12. WCAG Notes

- `sem-btnLinkText` dark (`#7094FB` on `#101729`): **6.2:1** — approved ruling.
- Primary button black-on-blue-500: passes AA (this is *why* dark buttons are black-text).
- `sem-text-meta` (`#697DA0`) on `sem-background-surface` (`#131C31`): ≈4.1:1 — labels and meta only; body copy must use `sem-text-body` (`#B3C1DB`).
- Disabled states are exempt (dim: 45% dark / 38% light).
- Check both themes at AA: text ≥ 4.5:1, large text & UI graphics ≥ 3:1.

---

## 13. What NOT To Do (dark edition)

- **No purple info tiles.** Dark info is sky (`#38BDF8` titles/strips, `#10263C` surface). Purple survives only in the chart categorical palette and the (flagged) title badge.
- **No white text on primary buttons.** Dark primary = black text on blue-500.
- **No alpha state fills.** Hover/pressed/selected are opaque navy steps. Alpha only for: scrim, focus ring, chat glow, voice pulse, chart washes.
- **No light-tinted scrims.** Dark scrim = black @ 64%.
- **No gradient tile/header backgrounds.** Elevation = one lighter navy step, flat.
- **No taupe in dark.** Every taupe role maps to a navy step (`#172642` / `#202C4E` / `#22314F`).
- **No reusing the old template dark text values** (`#EAF0FF`, `#9DB0D2`, `#C9D4EA`, `#8A9BBF`) — the navylight ramp is canon.
- **No hand-picked navy.** If a navy isn't one of the 11 ramp steps (`#33476E #2E4066 #2A3A5C #22314F #202C4E #172642 #18223A #131C31 #101729 #0C1222 #090E1B`), it's wrong.
- **No orange thresholds in charts.** Threshold = action blue.
- **Don't "improve" any hex.** If a value looks wrong, flag it to the design team; don't substitute.

---

## Appendix A — Full Hemlock Semantic Reference (dark)

Complete `sem-*` set from `hemlock-library.lib.pen`, resolved to hex, for future diffing. Format: `token → dark primitive = dark hex` (light hex in parentheses).

### Backgrounds

| Token | Dark ref | Dark | (Light) |
|---|---|---|---|
| sem-background-main | prim-navy-800 | `#101729` | `#F7F5F0` |
| sem-background-surface | prim-navy-700 | `#131C31` | `#FFFFFF` |
| sem-background-elevated | prim-navy-600 | `#18223A` | `#FFFFFF` |
| sem-background-light | prim-navy-600 | `#18223A` | `#F8F7F6` |
| sem-background-subtle | prim-navy-600 | `#18223A` | `#EEEDEB` |
| sem-background-sunken | prim-navy-900 | `#0C1222` | `#F7F5F0` |
| sem-background-hover | prim-navy-500 | `#172642` | `#F8F7F6` |
| sem-background-rowHover | prim-navy-500 | `#172642` | `#F7F5F0` |
| sem-background-rowPressed | prim-navy-400 | `#202C4E` | `#EDEAE3` |
| sem-background-muted | prim-navy-500 | `#172642` | `#D5D3D0` |
| sem-background-disabled | prim-navy-700 | `#131C31` | `#F8F7F6` |
| sem-background-action | prim-blue-500 | `#5A82F9` | `#3A6AF8` |
| sem-background-highlight | prim-skydark-100 | `#16304A` | `#EBF0FE` |
| sem-background-info | prim-skydark-200 | `#10263C` | `#EBF6FF` |
| sem-background-info-strong | prim-skydark-100 | `#16304A` | `#AEDCFE` |
| sem-background-success | prim-greendark-300 | `#12291C` | `#E9FFF0` |
| sem-background-success-soft | prim-greendark-200 | `#1A3A26` | `#A9FDC4` |
| sem-background-success-strong | prim-greendark-100 | `#245234` | `#68FC97` |
| sem-background-success-bold | prim-green-500 | `#148338` | `#10642B` |
| sem-background-warning | prim-orangedark-300 | `#33200F` | `#FFF1E9` |
| sem-background-warning-strong | prim-orangedark-100 | `#5E3A18` | `#FDC9A6` |
| sem-background-error | prim-reddark-200 | `#3A1B1E` | `#FFEAEA` |
| sem-background-error-strong | prim-reddark-100 | `#542427` | `#FDABA9` |

### Borders

| Token | Dark ref | Dark | (Light) |
|---|---|---|---|
| sem-borders-light | prim-navy-700 | `#131C31` | `#EEEDEB` |
| sem-borders-muted | prim-navy-200 | `#2A3A5C` | `#D5D3D0` |
| sem-borders-strong | prim-navy-50 | `#33476E` | `#C0BAB2` |
| sem-borders-dark | prim-navy-300 | `#22314F` | `#DCD8CB` |
| sem-borders-hover | prim-navy-50 | `#33476E` | `#8A8680` |
| sem-borders-disabled | prim-navy-200 | `#2A3A5C` | `#B5B1AB` |
| sem-borders-focus | rgba(112,148,251,0.35) | `#7094FB59` | `#0E0E0E` |
| sem-borders-focus-inverted | prim-gray-900 | `#0E0E0E` | `#FFFFFF` |
| sem-borders-action | prim-blue-500 | `#5A82F9` | `#3A6AF8` |
| sem-borders-action-subtle | prim-navy-50 | `#33476E` | `#A5BCFC` |
| sem-borders-info | prim-skydark-100 | `#16304A` | `#AEDCFE` |
| sem-borders-success | prim-greendark-100 | `#245234` | `#A9FDC4` |
| sem-borders-warning | prim-orangedark-100 | `#5E3A18` | `#FEE4D2` |
| sem-borders-error | prim-red-350 | `#F87171` | `#C82320` |
| sem-borders-error-strong | prim-red-250 | `#FCA5A5` | `#961A18` |
| sem-borders-error-subtle | prim-reddark-100 | `#542427` | `#FED5D4` |

### Text

| Token | Dark ref | Dark | (Light) |
|---|---|---|---|
| sem-text-header | prim-navylight-800 | `#D8E1F0` | `#0E0E0E` |
| sem-text-strong | prim-navylight-800 | `#D8E1F0` | `#2D2926` |
| sem-text-body | prim-navylight-600 | `#B3C1DB` | `#403D3A` |
| sem-text-meta | prim-navylight-300 | `#697DA0` | `#5E5954` |
| sem-text-subtle | prim-navylight-200 | `#52637F` | `#8A8680` |
| sem-text-placeholder | prim-navylight-200 | `#52637F` | `#716E6A` |
| sem-text-disabled | prim-navylight-100 | `#3A485F` | `#B5B1AB` |
| sem-text-action | prim-blue-500 | `#5A82F9` | `#3A6AF8` |
| sem-text-reverse | prim-gray-900 | `#0E0E0E` | `#FFFFFF` |
| sem-text-deposit | prim-green-350 | `#4ADE80` | `#148338` |
| sem-text-error | prim-red-350 | `#F87171` | `#C82320` |
| sem-text-error-title | prim-red-350 | `#F87171` | `#C82320` |
| sem-text-error-body-strong | prim-red-250 | `#FCA5A5` | `#961A18` |
| sem-text-body-error | prim-red-250 | `#FCA5A5` | `#641210` |
| sem-text-info-title | prim-sky-250 | `#38BDF8` | `#1F6193` |
| sem-text-success-title | prim-green-350 | `#4ADE80` | `#10642B` |
| sem-text-success-body | prim-green-350-muted | `#74D791` | `#0B461E` |
| sem-text-warning-title | prim-orange-400 | `#FB924D` | `#C85F1A` |
| sem-text-warning-body | prim-orange-400-muted | `#EA9C62` | `#964713` |

### Icons

| Token | Dark ref | Dark | (Light) |
|---|---|---|---|
| sem-icons-full | prim-navylight-600 | `#B3C1DB` | `#0E0E0E` |
| sem-icons-meta | prim-navylight-300 | `#697DA0` | `#5E5954` |
| sem-icons-subtle | prim-navylight-200 | `#52637F` | `#8A8680` |
| sem-icons-muted | prim-navylight-100 | `#3A485F` | `#B5B1AB` |
| sem-icons-action | prim-blue-400 | `#7094FB` | `#3A6AF8` |
| sem-icons-reverse | prim-gray-900 | `#0E0E0E` | `#FFFFFF` |
| sem-icons-info | prim-sky-250 | `#38BDF8` | `#35A8FD` |
| sem-icons-info-strong | prim-sky-300 | `#35A8FD` | `#2E90DA` |
| sem-icons-success | prim-green-350 | `#4ADE80` | `#1EBF51` |
| sem-icons-success-strong | prim-green-300 | `#27FB6B` | `#10642B` |
| sem-icons-warning | prim-orange-400 | `#FB924D` | `#FB924D` |
| sem-icons-warning-strong | prim-orange-500-muted | `#E68550` | `#C85F1A` |
| sem-icons-error | prim-red-350 | `#F87171` | `#C82320` |
| sem-icons-error-soft | prim-red-350-muted | `#E5807E` | `#FB5653` |

### Component tokens (toggle / tag / slider / misc)

| Token | Dark ref | Dark | (Light) |
|---|---|---|---|
| sem-toggleKnob | prim-base-white | `#FFFFFF` | `#FFFFFF` |
| sem-toggleKnobOn | prim-blue-400 | `#7094FB` | `#3A6AF8` |
| sem-toggleTrackOff | prim-navy-500 | `#172642` | `#EDEAE3` |
| sem-toggleTrackOn | prim-blue-900 | `#031E64` | `#EBF0FE` |
| sem-toggleLoadingTrack | prim-navy-600 | `#18223A` | `#EEEDEB` |
| sem-tagBg | prim-blue-900 | `#031E64` | `#EBF0FE` |
| sem-tagText | prim-blue-300 | `#A5BCFC` | `#2952CC` |
| sem-sliderTrack | prim-navy-300 | `#22314F` | `#D5D3D0` |
| sem-sliderAccent | prim-blue-400 | `#7094FB` | `#3A6AF8` |
| sem-sliderAccentDisabled | prim-navy-50 | `#33476E` | `#B5B1AB` |
| sem-paginationDot | prim-navy-300 | `#22314F` | `#D5D3D0` |
| sem-paginationDotActive | prim-navylight-600 | `#B3C1DB` | `#403D3A` |
| sem-dragHandle | prim-navylight-600 | `#B3C1DB` | `#0E0E0E` |
| sem-scrollbarThumb | prim-navy-300 | `#22314F` | `#B5B1AB` |
| sem-progressFill | = btnPrimaryBgActive | `#3A6AF8` | `#163196` |

### Buttons

Resolved matrix in §5. Raw refs: `sem-btnPrimary*`, `sem-btnPrimaryInverted*`, `sem-btnSecondary*`, `sem-btnSecondaryInverted*`, `sem-btnDestruction*`, `sem-btnLink*` — all present in `hemlock-library.lib.pen` with the §5 values.

### Chat & Nav (different surface — not used by the component template; listed for completeness)

The `sem-chat*` (24 tokens) and `sem-nav*` (19 tokens) families theme the chat panel and navigation, per `chat-nav-refresh.pen`. Key dark anchors: `sem-chatBg #090E1B`, `sem-chatInputBg #090E1B`, `sem-chatBorder #33476E`, `sem-chatTextPrimary #EBF0FE` (prim-blue-100), `sem-chatShadow` glow `0 0 32px rgba(155,179,252,0.14), 0 0 10px rgba(155,179,252,0.10)` (dark-only; light is none), `sem-navBg #090E1B`, `sem-navBorder transparent`. If your component ever embeds in those surfaces, pull values from `hemlock-library.lib.pen` directly.

---

## Primitives Quick Reference (paint — mode-agnostic)

- **navy** (50→950, lightest→darkest): `#33476E #2E4066 #2A3A5C #22314F #202C4E #172642 #18223A #131C31 #101729 #0C1222 #090E1B`
- **navylight** (100→900, darkest→lightest): `#3A485F #52637F #697DA0 #889CBF #9DAFCD #B3C1DB #C8D4E9 #D8E1F0 #E9EEF7`
- **blue** (100→900): `#EBF0FE #C8D6FD #A5BCFC #7094FB #5A82F9 #3A6AF8 #2952CC #163196 #031E64`
- **darktints:** skydark `#16304A #10263C` · greendark `#245234 #1A3A26 #12291C` · orangedark `#5E3A18 #472C13 #33200F` · reddark `#542427 #3A1B1E #2C1518`
- **status accents (dark):** green-350 `#4ADE80` (+muted `#74D791`) · red-350 `#F87171` / red-250 `#FCA5A5` (+muted `#E5807E`) · orange-400 `#FB924D` (+muted `#EA9C62`) · sky-250 `#38BDF8`
- **shadow colors:** light 8/10/12/16% black · dark 28/36/45/64% black
