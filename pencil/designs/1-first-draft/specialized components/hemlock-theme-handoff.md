# Hemlock Theme — Specialized Component Handoff (Light + Dark)

> **Purpose:** Complete two-theme styling reference for specialized HTML components built on **Component Template v2.0**, keyed to the template's own CSS custom properties, with the Hemlock token each one maps to (so future library updates can be diffed against this file).
>
> **The two themes follow different rules (Amanda, 2026-08-21):**
> - **Light = integrity-preserving.** The template's original light design is kept. Each value is annotated with the Hemlock token it already equals; the handful of values with no exact Hemlock equivalent are snapped to the *nearest* Hemlock step (all near-invisible deltas, listed in §4).
> - **Dark = Hemlock redesign.** Dark values come from the Hemlock library's navy dark theme and supersede the template v2.0 built-in dark block entirely.
>
> **Companion file:** `Component Template v2.0 (Hemlock).html` — a working duplicate of the template with both themes applied. The pristine template is `Component Template v2.0.html` (same folder).
>
> **Source of truth chain:** `hemlock-library.lib.pen` (the Hemlock library — `sem-*` semantic tokens on the `🎨 Colors` Light/Dark axis, resolving to `prim-*` primitives) ← `Evergreen.ai_DarkMode_DesignHandoff` package (2026-08-20). The `.pen` library and that package were verified value-identical on 2026-08-20.
>
> **Supersedes:** `_Archive/hemlock-component-styling-handoff.md` and the built-in dark block of `_Archive/Component Template.html`.

---

## 1. How to Apply

Dark mode is activated by `html[data-theme="dark"]`. Values live in two custom-property blocks per theme (copy-paste blocks in §10):

1. The **core block** — `:root` (light) / `html[data-theme="dark"]` — surfaces, text, borders, accents, status, charts, shadows.
2. The **widget block** — scoped to `#appMain, .t2-rd-backdrop` — the `--tk-*` layer (buttons, dropdowns, checks, radios, switches, sliders, segmented controls).

---

## 2. System Rules

These Hemlock dark-theme principles (approved Aug 20) govern every dark value. Light is exempt where noted — light keeps the template's original treatments.

1. **Elevation = lighter surface, not shadow (dark).** The navy ramp runs `navy-950 #090E1B` (darkest) → `navy-50 #33476E` (lightest). The app shell sits on `navy-800 #101729` (`sem-background-main`); the component surface — **including the template's `--page-bg` and card, which are both the surface role** — is `navy-700 #131C31`; raised tiles/headers/tooltips/menus are `navy-600 #18223A`. A thing that floats is *lighter*. Shadows still exist but deepen (§9) — they support, they don't carry.
2. **The template "page" is the component's surface, not the app shell.** `--page-bg` → `sem-background-surface` (white light / `#131C31` dark). The host app supplies `sem-background-main` behind the embedded component.
3. **Dark state fills are opaque navy steps — never alpha.** Hover `navy-500 #172642`, pressed `navy-400 #202C4E`. Alpha survives in exactly five places: scrims, the focus ring, the chat glow, the voice pulse, and chart washes. (Light keeps its original alpha washes for status tiles — they're exact Hemlock primitives at low opacity.)
4. **Blue is the primary accent; sky is informational (dark).** Dark info tiles/icons are sky (`prim-sky-250 #38BDF8`) — **not purple**. Light info stays accent-blue per the integrity ruling; flag to design if cross-theme consistency is ever wanted.
5. **Primary buttons carry BLACK text in dark.** `sem-btnPrimaryBg` `#5A82F9` + `sem-btnPrimaryText` `#000000` (hover text `navy-950`). White-on-blue is light-mode-only.
6. **Dark statuses are desaturated:** success `green-350 #4ADE80`, error `red-350 #F87171`, warning `orange-400 #FB924D`, with `-muted` steps for body copy. Dark status *surfaces* are the flattened `*dark` tint primitives (opaque).
7. **Dark text uses the navylight ramp:** headers `#D8E1F0`, body `#B3C1DB`, meta `#697DA0`, subtle `#52637F`.
8. **Borders shift roles in dark.** `sem-borders-light` dark is `navy-700 #131C31` — same value as the surface, so on-surface hairlines deliberately vanish. The template's `--border` therefore carries `sem-borders-light` in light (`#EEEDEB`) but `sem-borders-muted` in dark (`#2A3A5C`, the visible-outline role); `--border-strong` carries `sem-borders-muted` in light (`#D5D3D0`) but `sem-borders-strong` in dark (`#33476E`). The per-mode role split is intentional — the template collapses four Hemlock border roles into two vars.

---

## 3. Core Tokens (template var → Hemlock mapping, both themes)

"Light" is the template's original value (kept — exact token matches unless marked *snapped*). "Dark" is the Hemlock redesign; "was (v2.0)" is the superseded template dark value.

### Surfaces

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) | was (v2.0) |
|---|---|---|---|---|---|
| `--page-bg` | `#FFFFFF` | `sem-background-surface` | **`#131C31`** | `sem-background-surface` (navy-700) | `#101729` |
| `--surface-1` | `#FFFFFF` | `sem-background-surface` | **`#131C31`** | `sem-background-surface` | `#0E1524` |
| `--surface-2` | `#F8F7F6` | `sem-background-light` | **`#18223A`** | `sem-background-light` / `-elevated` (navy-600) | `#121B2E` |
| `--nest` | `#F8F7F6` | `sem-background-subtle` | **`#18223A`** | `sem-background-subtle` | `#131C30` |
| `--calc-bg` | `#F7F5F0` | `sem-background-sunken` | **`#0C1222`** | `sem-background-sunken` (navy-900) | `#12203C` |

In dark, `--page-bg` = `--surface-1` = `#131C31`: page and card are the same flat surface, outline-defined (the template's original rev MJ dark design). Raised elements inside sit one step lighter (`#18223A`).

### Text

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) | was (v2.0) |
|---|---|---|---|---|---|
| `--ink` — **rev HK13 (reverted)** | `#0E0E0E` | `sem-text-header` | **`#D8E1F0`** | `sem-text-header` (navylight-800) | `#EAF0FF` |
| `--heading` — **new, rev HK13** | **`#2952CC`** | **`sem-btnPrimaryBgHover`** (blue-700) | **`#7094FB`** | `sem-btnPrimaryBgHover` (blue-400) | — |
| `--text-header` — **new, rev HK9** | `#0E0E0E` | `sem-text-header` | **`#D8E1F0`** | `sem-text-header` (navylight-800) | — |
| `--text-body` | `#403D3A` | `sem-text-body` | **`#B3C1DB`** | `sem-text-body` (navylight-600) | `#C9D4EA` |
| `--muted` | `#5E5954` | `sem-text-meta` | **`#697DA0`** | `sem-text-meta` (navylight-300) | `#9DB0D2` |
| `--faint` | `#8A8680` ⚠ *changed from `#767169` — ruling C* | `sem-text-subtle` | **`#52637F`** | `sem-text-subtle` (navylight-200) | `#8A9BBF` |
| `--inverse` | `#FFFFFF` | `sem-text-reverse` | **`#0E0E0E`** | `sem-text-reverse` (gray-900) | `#0B1220` |

> ⚠ **`--faint` ruling C (Amanda, 2026-08-21):** the template had darkened `--faint` to `#767169` for WCAG AA on small disclosure text. The canon `sem-text-subtle` value `#8A8680` is restored; the AA miss (≈3.5:1 on white) is accepted and **flagged to design**. If a component needs AA small text in this slot, `sem-text-placeholder #716E6A` passes.

> **Heading ink — rev HK13 (Amanda, 2026-08-22), supersedes rev HK9:** rev HK9 had remapped `--ink` globally to brand blue, which also colored non-header text (heatmap tile labels, data values). Rev HK13 splits the roles: **`--ink` is back to neutral `sem-text-header`** for body/emphasis/data text, and a **new `--heading` var carries `sem-btnPrimaryBgHover`** (`#2952CC` light / `#7094FB` dark — 6.6:1 / ~5.9:1 ✓) applied ONLY to true headings: the component title (`.sc-comp-title`), section titles (`h2`, `.sc-title`), and chart titles (`.t2ck-title`). `--text-header` remains as a neutral alias used by the table rules (totals bar, row labels per rev HK10). The accessible view keeps its own white/black ink overrides.

> **Component title sizing — rev HK9 (Amanda, 2026-08-21):** `.sc-comp-title` rides `--fs-comp-title` = **24px desktop / 20px narrow** (was 22/18). The accessible view scales ×1.5: 36px desktop / 30px narrow. (`--fs-sec-title` 18/15 and `--fs-pick` 16/14 are unchanged.)

### Borders

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) | was (v2.0) |
|---|---|---|---|---|---|
| `--border` | `#EEEDEB` | `sem-borders-light` | **`#2A3A5C`** | `sem-borders-muted` (navy-200) | `#243350` |
| `--border-strong` | `#D5D3D0` | `sem-borders-muted` | **`#33476E`** | `sem-borders-strong` (navy-50) | `#33476E` |
| `--taupe-border` | `#E3DFD6` | `prim-taupe-300` (exact; nearest semantic: `sem-borders-dark #DCD8CB`) | **`#22314F`** | `sem-borders-dark` (navy-300) | `#243350` |
| `--hairline` | `#595959` | — static, both modes | `#595959` | — | `#595959` |

See §2.8 for why `--border`/`--border-strong` carry different Hemlock roles per mode. If a component wants the pure Hemlock divider-less dark look (e.g. tables without row rules), use `sem-borders-light` dark `#131C31` for those dividers.

### Accent & interaction

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) | was (v2.0) |
|---|---|---|---|---|---|
| `--accent` | `#3A6AF8` | `sem-background-action` / `sem-text-action` (blue-600) | **`#5A82F9`** | same roles (blue-500) | `#5A86FF` |
| `--accent-hover` | `#2952CC` | `sem-btnPrimaryBgHover` (blue-700) | **`#7094FB`** | `sem-btnPrimaryBgHover` (blue-400 — hover goes *lighter* in dark) | `#8FB0FF` |
| `--accent-subtle` | `#EBF0FE` | `sem-background-highlight` (blue-100) | **`#16304A`** | `sem-background-highlight` (skydark-100, opaque) | `rgba(58,106,248,.18)` |
| `--accent-fill` | `rgba(58,106,248,0.15)` | `prim-blue-600` @ 15% | **`rgba(90,130,249,0.15)`** | `prim-blue-500` @ 15% (chart wash — surviving alpha) | — |
| `--brand-blue` | `var(--accent)` | alias | `var(--accent)` | alias | — |
| `--row-hover` | `var(--taupe-100)` `#F7F5F0` | `sem-background-rowHover` | **`#172642`** | `sem-background-rowHover` (navy-500, opaque) | `#12203C` |
| `--row-pressed` | `var(--taupe-pressed)` `#EDEAE3` | `sem-background-rowPressed` | **`#202C4E`** | `sem-background-rowPressed` (navy-400, opaque) | `#1B2C4F` |
| `--taupe-100` | `#F7F5F0` | `sem-background-rowHover` | **`#172642`** | `sem-background-rowHover` | `#141E36` |
| `--taupe-pressed` | `#EDEAE3` | `sem-background-rowPressed` | **`#202C4E`** | `sem-background-rowPressed` | `#1B2C4F` |

### Secondary accents (dark-only vars)

`--accent-2/3/4` exist only in the dark block (light rules never read them). No 1:1 Hemlock accent roles exist; they map to nearest chart-palette entries — flagged.

| Template var | **Dark (new)** | Nearest Hemlock | was (v2.0) |
|---|---|---|---|
| `--accent-2` (teal) | **`#84E6CC`** | `sem-chart-cat-7` dark | `#2FD4C4` |
| `--accent-3` (purple — KPI overlines) | **`#B198F0`** | `sem-chart-cat-1` dark | `#9A86FF` |
| `--accent-4` (gold) | **`#D9A02E`** | `sem-chart-cat-14` dark | `#E3B972` |

### Status & semantic accents

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) | was (v2.0) |
|---|---|---|---|---|---|
| `--pos` | `#148338` | `sem-text-deposit` (green-500) | **`#4ADE80`** | `sem-text-deposit` (green-350) | `#34D399` |
| `--pos-strong` | `#148338` | `sem-text-deposit` | **`#4ADE80`** | `sem-text-success-title` | `#5FE0A8` |
| `--pos-mid` | `#1EBF51` *snapped from `#22C55E`* | `sem-icons-success` | **`#74D791`** | `sem-text-success-body` (green-350-muted) | — |
| `--pos-soft` | `#4ADE80` | `prim-green-350` (static) | `#4ADE80` | same | — |
| `--neg` | `#C82320` | `sem-text-error` (red-600) | **`#F87171`** | `sem-text-error` (red-350) | `#F87171` |
| `--neg-strong` | `#C82320` | `sem-text-error` | **`#FCA5A5`** | `sem-text-error-body-strong` (red-250) | `#FCA5A5` |
| `--neg-soft` | `#F87171` | `prim-red-350` (static) | `#F87171` | same | — |
| `--warn` | `#C85F1A` | `sem-text-warning-title` (orange-600) | **`#FB924D`** | `sem-text-warning-title` (orange-400) | — |
| `--info` | `#3A6AF8` | `sem-icons-action` (accent blue — integrity ruling) | **`#38BDF8`** | `sem-icons-info` (sky-250 — **sky, not purple**) | `#9A86FF` |
| `--info-title` | `#3A6AF8` | `sem-text-action` | **`#38BDF8`** | `sem-text-info-title` (sky-250) | `#C3B4FF` |
| `--orange` | `#EA580C` | — (no Hemlock role; retained) | `#EA580C` | — | — |

> **Cross-theme note (flagged):** light info is accent-blue, dark info is sky. Also `--pos-strong`/`--neg-strong` intensify in light (`= --pos`/`--neg`) but use distinct desaturated steps in dark. Both are consequences of light-integrity + dark-redesign; revisit if cross-theme consistency is wanted.

### Status tile surfaces (pros / cons / info)

Light keeps the original primitive-alpha washes painted as a wash-to-white gradient. Dark uses **flat opaque darktint surfaces** (v2.0's translucent dark gradients are retired).

| Template var | Light (kept) | = Hemlock (light) | **Dark (new)** | Hemlock (dark) |
|---|---|---|---|---|
| `--pros-bg` | `rgba(20,131,56,.07)` | `prim-green-500` @ 7% | **`#12291C`** | `sem-background-success` (greendark-300) |
| `--pros-border` | `rgba(20,131,56,.25)` | `prim-green-500` @ 25% | **`#245234`** | `sem-borders-success` (greendark-100) |
| `--cons-bg` | `rgba(200,35,32,.06)` | `prim-red-600` @ 6% | **`#3A1B1E`** | `sem-background-error` (reddark-200) |
| `--cons-border` | `rgba(200,35,32,.22)` | `prim-red-600` @ 22% | **`#542427`** | `sem-borders-error-subtle` (reddark-100) |
| `--info-bg` | `rgba(58,106,248,.06)` | `prim-blue-600` @ 6% | **`#10263C`** | `sem-background-info` (skydark-200) |
| `--info-border` | `rgba(58,106,248,.24)` | `prim-blue-600` @ 24% | **`#16304A`** | `sem-borders-info` (skydark-100) |

Warning-surface roles (no template vars yet, available if needed): light `sem-background-warning #FFF1E9` / dark `#33200F`; `-strong` `#FDC9A6` / `#5E3A18`.

### Scrim

| Template var | Light (kept) | **Dark (new)** | Token |
|---|---|---|---|
| `--backdrop` | `rgba(45,41,38,0.34)` | **`rgba(0,0,0,0.64)`** | **`sem-background-scrim`** — added to `hemlock-library.lib.pen` 2026-08-21 (`#2D292657` light / `#000000A3` dark). Note: `shadow-overlay-color` is the *shadow-ramp* color (16% light / 85% black dark — lifted Aug 21) used inside `box-shadow`s, not a scrim role — hence the new token. (The two used to coincide in dark at 64%; the overlay shadow was lifted to 85% on Aug 21 so elevation reads on navy.) |

---

## 4. Light-Mode Deltas (the complete list)

Everything else in light renders pixel-identically. These are the only values that changed, all snapped to the nearest Hemlock step:

| Var | Was | Now | Why |
|---|---|---|---|
| `--faint` | `#767169` | **`#8A8680`** | Ruling C — canon `sem-text-subtle`; AA miss accepted + flagged (§3 Text). **The only visible change.** |
| `--pos-mid` | `#22C55E` | **`#1EBF51`** | `sem-icons-success` — nearest step. |
| `--cat4` | `#7AA0F9` | **`#7094FB`** | `prim-blue-400` — nearest step. |
| `--tk-accent-hover`, `--tk-btn-accent-hover` | `#295CCC` | **`#2952CC`** | Canon blue-700 (the template's own comment flags the near-miss). |
| `--tk-text-1/2/3` | `#171717`/`#525252`/`#737373` | **`#0E0E0E`/`#5E5954`/`#716E6A`** | gray-900 / gray-600 / gray-500 (`sem-text-header`/`-meta`/`-placeholder`). |
| `--tk-surface-2/3` | `#F5F5F5`/`#EBEBEB` | **`#F8F7F6`/`#EEEDEB`** | gray-50 / gray-100. |
| `--tk-border` / `--tk-border-strong` | `#E5E5E5`/`#D4D4D4` | **`#EEEDEB`/`#D5D3D0`** | `sem-borders-light` / `sem-borders-muted`. |
| `--tk-error` / `--tk-error-subtle` | `#B91C1C`/`#FEE2E2` | **`#C82320`/`#FFEAEA`** | red-600 / red-50. |
| `--tk-track` / `--tk-off` / `--tk-thumb-dis` | `#D8D9D8`/`#B6B9B7`/`#EEEFEE` | **`#D5D3D0`/`#EDEAE3`/`#EEEDEB`** | gray-200 / taupe-200 / gray-100. `--tk-off` now takes Hemlock's own `sem-toggleTrackOff` (rev HK; was gray-300). |
| `--tk-ton` / `--tk-border-input` / `--tk-focus` *(new, rev HK)* | — | **`#EBF0FE`/`#DCD8CB`/`#0E0E0E`** | `sem-toggleTrackOn` (blue-100) / `sem-borders-dark` (taupe-350, input+checkbox outlines) / `sem-borders-focus` (gray-900 — checked check glyph, radio dot & ring). |
| `--tk-shadow-sm` | 5% black | **8% black** | `shadow-sm-color`. |

---

## 5. Widget Token Layer (`--tk-*`), dark

Scoped to `#appMain` and `.t2-rd-backdrop`. Buttons follow `sem-btnPrimary*`; selection controls follow the slider/toggle/icon action roles.

| Template var | Hemlock token | **Dark (new)** | was (v2.0) |
|---|---|---|---|
| `--tk-accent` | `sem-sliderAccent` / `sem-toggleKnobOn` / `sem-icons-action` (blue-400) | **`#7094FB`** | `#0075FF` |
| `--tk-accent-hover` | `sem-btnLinkTextHover` (blue-300) | **`#A5BCFC`** | `#9BB3FC` |
| `--tk-accent-subtle` | `sem-background-highlight` (skydark-100) | **`#16304A`** | `#152354` |
| `--tk-btn-accent` | `sem-btnPrimaryBg` (blue-500) | **`#5A82F9`** | `#0075FF` |
| `--tk-btn-accent-hover` | `sem-btnPrimaryBgHover` (blue-400) | **`#7094FB`** | `#3392FF` |
| `--tk-text-inverse` | `sem-btnPrimaryText` | **`#000000`** (black label on dark primary fills) | `#FFFFFF` |
| `--tk-text-1/2/3` | `sem-text-header/meta/subtle` | **`var(--ink)`/`var(--muted)`/`var(--faint)`** | same refs |
| `--tk-surface-1/2` | `sem-background-surface/light` | **`var(--surface-1)`/`var(--surface-2)`** | same refs |
| `--tk-surface-3` | `sem-background-muted` (navy-500) | **`#172642`** | `#1B2C4F` |
| `--tk-border` / `--tk-border-strong` | per §2.8 | **`var(--border)`/`var(--border-strong)`** | same refs |
| `--tk-error` / `--tk-error-subtle` | `sem-text-error` / `sem-background-error` | **`#F87171`/`#3A1B1E`** | `#F87171`/`#450A0A` |
| `--tk-track` / `--tk-off` / `--tk-thumb-dis` | `sem-sliderTrack` / `sem-toggleTrackOff` / `sem-background-disabled` | **`#22314F`/`#172642`/`#131C31`** | `#26324C`/`#33476E`/`#141E36` |
| `--tk-ton` / `--tk-border-input` / `--tk-focus` *(new, rev HK)* | `sem-toggleTrackOn` / `sem-borders-dark` / `sem-borders-focus`* | **`#031E64`/`#22314F`/`#7094FB`** | — |
| `--tk-shadow-sm` | `shadow-sm-color` 50% | **`0 1px 3px rgba(0,0,0,0.50), 0 0 0 1px rgba(255,255,255,0.04)`** | 50% |
| `--tk-shadow-dd` | `shadow-lg-color` 70% | **`0 4px 16px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.05)`** | 60% |

Rule-level companions applied in the HTML:

- **Toggle (rev HK, per ToggleSwitch master):** OFF = `sem-toggleTrackOff` track + WHITE `sem-toggleKnob` knob (both modes); ON = **pale `sem-toggleTrackOn` track** (blue-100 light / blue-900 dark) with a **blue `sem-toggleKnobOn` knob** (= `--tk-accent`). The old accent-filled on-track is retired.
- **Checkbox / radio (rev HK, per Checkbox master):** 20px box, `$radius-3xs` 4, resting 1px `sem-borders-dark` outline. **Checked is an OUTLINE style** — box stays surface, 2px `sem-borders-focus` ring, 14px check glyph (or 10px radio dot) in the same focus ink. The old filled-accent box is retired.
- **Inputs / selects (rev HK, per Input & Select masters):** `$radius-3xs` 4 (was 6), 1px `sem-borders-dark`. The compact 36px height is kept — the master's 58px floating-label field is a different size class.
- **Slider (rev HK, per Slider master):** 20px `sem-sliderAccent` thumb with a 2px WHITE stroke (both modes).
- **Buttons (rev HK, per Button masters):** label weight 500 (was 600); pill radius, gap 8. The master's single size = the template's `-lg` class (12/24 pad, 16px).
- **Selected dropdown items (dark)** use `--tk-btn-accent` + `--tk-text-inverse` (blue-500 fill, black label) — white-on-accent fails contrast on blue-400.
- **Unchecked check/radio rings (dark)** use `var(--tk-border-strong)` `#33476E` (replaces the one-off `#5E6E90`).
- *`sem-borders-focus` dark caveat:* the token is `rgba(112,148,251,0.35)` — a focus-RING alpha. A 35%-alpha check glyph is illegible, so `--tk-focus` dark uses **full-opacity blue-400 `#7094FB`**; flagged for design.

---

## 6. Buttons — Full Hemlock Matrix (resolved hex, dark)

For components that draw their own buttons rather than the `--tk-*` widgets. Light values equal the template's current light spec. Disabled dim: **45% opacity** dark (38% light).

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

## 7. Charts

### Template series slots (`--cat1..15`) — rev HK/HK3

**Both modes carry the full Hemlock categorical palette** (`--cat1..15` = `chart-categorical/color-01..15`, table below), superseding the old 7-slot blue-led light palette — the earlier series-discontinuity flag is **resolved** (a series keeps its hue family across themes).

**Assignment rules (rev HK3, per design 2026-08-21 — supersedes rev HK2's stride/pool-exclusion scheme):**

1. **The pool is the FULL curated palette in its designed order** (`color-01..15`). Do not skip, filter, or stride through it — the adjacency of the curated order is intentional. *(Rev HK2 dropped color-05/-07/-12 and walked with strides; both retired — they scrambled the palette and changed the donut, which was already correct.)*
2. **Every chart INSTANCE rotates the palette from its own seeded offset.** The seed hashes the chart's English title **plus the variant id**, so two variants of the same chart (default vs compact vs no-card) start at different colors — no "same three colors in every variant of an area chart" — while hover/resize/theme re-renders stay deterministic.
3. **The pos/neg STATUS inks are never series colors.** `sem-text-deposit` (green) / `sem-text-error` (red) and the status backgrounds are reserved for positive/negative semantics (waterfall gains/losses, diverging heatmap, deltas). The categorical palette itself contains no semantic green/red, so no pool filtering is needed.
4. **Axis tick labels are never series-tinted** — always 11px `sem-text-meta`, both axes (dual-axis included; the legend carries the series-to-axis mapping).
5. Past one full palette pass, colors recycle at 62% then 38% tints (donut rule).
6. **The dual donut walks the same palette** — group colors come from the per-instance rotation (not a fixed color-01..04), and each group's outer-ring subdivisions are alpha tints of the parent color.
7. Diverging heatmap (positive-negative) uses the **status background tokens** per `openui-charts-v2` `HeatmapChart/positive-negative`: positives bucket into `sem-background-success-soft/-strong/-bold` (bold takes `sem-text-reverse`), negatives take `sem-background-error-strong`; all other tiles take `sem-text-header`. *(Q16: per-theme heatmap text contrast is still open with design — do not lock text inks yet.)*

### Hemlock categorical palette (full 15, both modes)

| Token | Light | Dark | Token | Light | Dark |
|---|---|---|---|---|---|
| cat-1 | `#8951F0` | `#B198F0` | cat-9 | `#C026D3` | `#DB74E6` |
| cat-2 | `#06B6D4` | `#5FD3E6` | cat-10 | `#E73CAE` | `#F485BE` |
| cat-3 | `#312E81` | `#8480D9` | cat-11 | `#E879A8` | `#E89FB0` |
| cat-4 | `#3B82F6` | `#7AA0F5` | cat-12 | `#92400E` | `#CE7E5B` |
| cat-5 | `#0F766E` | `#4FC0A6` | cat-13 | `#FB923C` | `#F0985A` |
| cat-6 | `#38BDF8` | `#84D2F7` | cat-14 | `#CA8A04` | `#D9A02E` |
| cat-7 | `#2DD4BF` | `#84E6CC` | cat-15 | `#FACC15` | `#F3DE6F` |
| cat-8 | `#A78BFA` | `#C7BAF7` | | | |

### Sequential ramp (`sem-chart-seq-*`) — blue palette, depth reversed in dark

| Token | Light | Dark | | Token | Light | Dark |
|---|---|---|---|---|---|---|
| seq-100 | `#EBF0FE` | `#163196` | | seq-500 | `#5A82F9` | `#7094FB` |
| seq-200 | `#C8D6FD` | `#2952CC` | | seq-600 | `#3A6AF8` | `#A5BCFC` |
| seq-300 | `#A5BCFC` | `#3A6AF8` | | seq-700 | `#2952CC` | `#C8D6FD` |
| seq-400 | `#7094FB` ⚠ | `#5A82F9` | | | | |

> ⚠ **seq-400 light PREVIEW (pending Amanda, 2026-08-22):** the template currently ships `--seq4:#85A0FC` light as a live preview to even out the ramp's mid jump (`#A5BCFC → #7094FB` is its widest step). Hemlock's `sem-chart-seq-400` is still `#7094FB`. If approved, Hemlock gains a `prim-blue-350 #85A0FC` primitive and `seq-400` rebinds to it in light (dark unchanged); if rejected, the template reverts to `#7094FB`.

### Threshold & scaffold

- `sem-chart-threshold` → `sem-background-action`: `#3A6AF8` light / **`#5A82F9`** dark. **Never orange.**
- Chart scaffold (rev HK, per ChartAxisGrid master): gridlines = `sem-borders-light` (`#EEEDEB` light / `sem-borders-muted #2A3A5C` dark — visibility ruling), axis/zero line = `sem-borders-dark` light / `sem-borders-strong` dark; tick labels 11px `sem-text-meta`.
- Area washes keep alpha: `--accent-fill` `rgba(58,106,248,0.15)` light / `rgba(90,130,249,0.15)` dark.
- Diverging heatmap tile values (rev HK2): light `#A9FDC4`/`#68FC97`/`#10642B` (+`#FDABA9` neg), dark `#1A3A26`/`#245234`/`#148338` (+`#542427` neg); bold-tile ink = `sem-text-reverse` (`#FFFFFF` light / `#0E0E0E` dark).

---

## 8. Component Recipes (dark)

What the companion HTML applies. Dark gradients from v2.0 are **retired in favor of flat token surfaces** (§2.1). Light treatments are unchanged.

| Component | v2.0 dark treatment | **Hemlock dark treatment** |
|---|---|---|
| Page body | flat `#101729` | **flat `var(--page-bg)` `#131C31`** (`sem-background-surface`) |
| Card (chrome tile) | same-as-page, outline-defined | Same principle — `var(--surface-1)` `#131C31` = page, outline-defined, 1px blue-tint ring kept |
| Tab band (`.sc-tabs-wrap`) | `#141E36` | **`var(--taupe-100)` `#172642`** |
| Option tiles (`.sc-plan-card`) | vertical gradient | **flat `var(--surface-2)` `#18223A`**, border `var(--border-strong)`; hover **flat `var(--row-hover)` `#172642`** + border `var(--accent)` + `0 10px 24px rgba(0,0,0,0.60)` |
| Generic boxes (`.sc-box`), checklist cards | gradients | **flat `var(--surface-2)` `#18223A`** |
| Pros / Cons / Info tiles | translucent green/red/**purple** gradients | **flat opaque `var(--pros-bg)`/`var(--cons-bg)`/`var(--info-bg)`** with token borders — info is **sky** |
| Table headers (data + compare) — **rev HK11 (Amanda)** | gradient | **band = `sem-btnPrimaryBgHover` + ink = `sem-btnPrimaryText`** (via `--accent-hover`/`--inverse`: `#2952CC`/white light — 6.6:1 ✓; `#7094FB`/`#0E0E0E` dark — 6.9:1 ✓), 12px semibold uppercase kept. **Why this token: its light value equals seq-700's raw `#2952CC`, but its dark value is the hand-tuned mid blue — not the seq ramp's glaring pale end (raw seq-700, rev HK10) and not the vivid blue-600 (BgActive, rev HK7).** Token-symmetric — same tokens both modes, zero dark-block overrides. |
| Table row hover / pressed — **rev HK12** | `#12203C`/`#1B2C4F` | **hover `seq-200` / pressed `seq-300`** (`#C8D6FD`/`#A5BCFC` light, `#2952CC`/`#3A6AF8` dark), both themes on both tables. *(Rev HK12 swapped hover with the totals bar per design — hover was seq-100 — and stepped pressed to seq-300 to stay distinct. The default states now equal the frozen-column steps, so both tables match.)* **Rows stay square in all states** — the 12px hover/pressed end-caps are retired. Non-table hovers (plan cards, comparison pills, nudge buttons) stay on `sem-background-rowHover`/`-rowPressed`. |
| **FROZEN-COLUMN RULE — rev HK6 (general rule, any table built from this template)** | — | **When a table's frozen/pinned column carries the `seq-100` highlight, its row states step one ramp step deeper than the column tint: hover = `seq-200`, pressed = `seq-300`** (`--table-row-hover-fz`/`--table-row-pressed-fz`) — otherwise the hover wash is indistinguishable from the always-on column tint. *(Since rev HK12 the DEFAULT states land on the same steps — hover `seq-200` / pressed `seq-300` — so both tables currently match; the `-fz` vars are kept separate in case they diverge again.)* Applied to the Compare Options table in the template. |
| Totals bar (`tr.sc-total`) — **rev HK12** | taupe `var(--taupe-100)` | **`chart-sequential/seq-100` band + `--text-header` ink** (`#EBF0FE`/`#0E0E0E` light — 17:1 ✓; `#163196`/`#D8E1F0` dark — 9.4:1 ✓) — token-symmetric, rides `--table-total-bg:var(--seq1)`. *(Rev HK12 swapped this with the row hover — totals was seq-200.)* **Not interactive — no hover/pressed** (row-state rules exclude `.sc-total`). |
| Table row labels (sticky/frozen column text) — **rev HK10** | `var(--ink)` | **`--text-header`** (`sem-text-header`: `#0E0E0E` light / `#D8E1F0` dark) — row labels stay NEUTRAL in both modes. Brand blue is for headings only (`--heading`, rev HK13), not table labels — blue labels next to blue links and blue bands made dark tables a wall of blues. Dark frozen column: 9.4:1 ✓ (was 3.8:1 marginal with blue ink). |
| Compare-table frozen column — rev HK5/HK6 | `var(--surface-1)` | **`chart-sequential/seq-100`** (`#EBF0FE` pale blue light / `#163196` deep navy dark) — highlights the pinned Topic column (`seq-200` was tried and softened same day). Triggers the FROZEN-COLUMN RULE above. |
| Sticky-column edge shadow | `rgba(0,0,0,.6)` | **`rgba(0,0,0,0.70)`** (`shadow-lg-color`) |
| Sort affordance — rev HK6 | unsorted `#8695B5`, sorted white | **Only the sorted column shows a chevron** (single, up/down — minimal, no header crowding), **and the table loads with a default sort (first column, ascending)** so one chevron is always visible from first paint — that's the discoverability cue (supersedes rev HK5's resting glyphs on every column). Active chevron ink rides **`--table-head-ink`** so it always matches the band (rev HK11: `sem-btnPrimaryText` via `--inverse` — white light / `#0E0E0E` dark). |
| KPI cards (`.sc-kpi`) | gradient, purple bar `#9A86FF` | **flat `var(--surface-2)`**, top bar `var(--accent-3)` **`#B198F0`** (`sem-chart-cat-1`, flagged) |
| Calculator body | purple radial + navy gradient | **flat `var(--calc-bg)` `#0C1222`**, border `var(--taupe-border)` `#22314F`, shadow `0 18px 42px rgba(0,0,0,0.70)` |
| Tooltips (`#t2Tip`, `.t2ck-tip`) | gradients / `#17263F` | **flat `var(--surface-2)` `#18223A`**, border `var(--border-strong)` |
| Dropdown menus (single-select) | `#070A10` | **`#090E1B`** (`prim-navy-950`) |
| Selected dropdown item | accent bg + white text | **blue-500 bg + black text** (`--tk-btn-accent` + `--tk-text-inverse`) |
| Check/radio unchecked rings | `#5E6E90` | **`var(--tk-border-strong)` `#33476E`** |
| Toggle thumb | navy (`--tk-surface-1`) | **`#FFFFFF`** (`sem-toggleKnob`) |
| Row-detail modal | gradient; scrim `rgba(20,32,60,0.62)` | **flat `var(--surface-2)`**; scrim **`rgba(0,0,0,0.64)`** (`sem-background-scrim`) |
| Modal / video backdrop (`--backdrop`) | `rgba(225,230,240,0.22)` | **`rgba(0,0,0,0.64)`** (`sem-background-scrim`) |
| Disclosure top rules (gradient border-image) | `rgba(90,134,255,.55)→rgba(47,212,196,.18)` | **`rgba(90,130,249,0.55)→rgba(132,230,204,0.18)`** — re-derived from blue-500 + cat-7 |
| Select chevron (native) | `#A3A3A3` | **`#697DA0`** (`sem-icons-meta`) |
| Attention badges (`.sc-title-badge`) | `#6E52FF` both modes | **unchanged `#6E52FF`** — no Hemlock role; flagged |
| Hero ombre / video posters | brand gradients | **unchanged** — outside the token system |

---

## 9. Shadows, Overlays & Focus

| Role | Hemlock token | Light | Dark |
|---|---|---|---|
| Small (controls) | `shadow-sm-color` | black @ 8% | black @ 50% |
| Medium (panels, hover lifts) | `shadow-md-color` | black @ 10% | black @ 60% |
| Large (dropdowns, tiles) | `shadow-lg-color` | black @ 12% | black @ 70% |
| Shadow overlay (modal box-shadows) | `shadow-overlay-color` | black @ 16% | black @ 85% |
| **Scrim (backdrops)** | **`sem-background-scrim`** | `#2D292657` (`rgba(45,41,38,0.34)`) | `#000000A3` (`rgba(0,0,0,0.64)`) |

Template mappings — light (unchanged): `--tile-shadow` 10%, `--panel-shadow-hover` 12%, `--modal-shadow` 16%. Dark (lifted Aug 21 so elevation reads on navy): `--tile-shadow: 0 0 0 1px rgba(120,150,255,0.06), 0 16px 40px rgba(0,0,0,0.70)` · `--panel-shadow-hover: 0 8px 24px rgba(0,0,0,0.60)` · `--modal-shadow: 0 16px 40px rgba(0,0,0,0.85)`.

**Focus:** `sem-borders-focus` — light `#0E0E0E`, dark `rgba(112,148,251,0.35)` (blue-400 @ 35%). Pattern: `box-shadow: 0 0 0 3px <value>;`. `sem-borders-focus-inverted`: `#FFFFFF` light / `#0E0E0E` dark.

---

## 10. Copy-Paste Blocks

Exactly what `Component Template v2.0 (Hemlock).html` ships. Light `:root` (only the color-relevant lines; layout scales unchanged):

```css
:root{
  --surface-1:#FFFFFF; --surface-2:#F8F7F6; --nest:#F8F7F6;      /* sem-background-surface / -light / -subtle */
  --border:#EEEDEB; --border-strong:#D5D3D0;                     /* sem-borders-light / sem-borders-muted */
  --ink:#0E0E0E; --text-header:#0E0E0E; --muted:#5E5954; --faint:#8A8680; --inverse:#FFFFFF;  /* rev HK13: --ink back to sem-text-header (neutral); --text-header = its table-scoped alias; -meta / -subtle (ruling C) / -reverse */
  --heading:#2952CC;              /* rev HK13: heading-only ink = sem-btnPrimaryBgHover (comp title, h2/.sc-title, chart titles) */
  --accent:#3A6AF8; --accent-hover:#2952CC; --accent-subtle:#EBF0FE;   /* action blue-600 / btnPrimaryBgHover blue-700 / background-highlight */
  --calc-bg:#F7F5F0;                                             /* sem-background-sunken */
  --pos:#148338; --pos-mid:#1EBF51; --neg:#C82320; --warn:#C85F1A;
  --pos-soft:#4ADE80; --neg-soft:#F87171;
  --page-bg:#FFFFFF;                                             /* sem-background-surface — host app supplies background-main */
  --taupe-100:#F7F5F0; --taupe-pressed:#EDEAE3; --taupe-border:#E3DFD6;  /* rowHover / rowPressed / prim-taupe-300 */
  --grid:#EEEFEE; --grid2:#D8D9D8; --axis:#B6B9B7; --zero:#B6B9B7; --det:#5E5954; --orange:#EA580C;  /* untokenized — retained */
  --accent-fill:rgba(58,106,248,0.15);
  --cat1:#3A6AF8; --cat2:#06B6D4; --cat3:#163196; --cat4:#7094FB;
  --cat5:#0F766E; --cat6:#CA8A04; --cat7:#FB923C;                /* blue-led palette kept; all exact Hemlock paints */
  --tile-shadow:0 4px 12px rgba(0,0,0,0.10); --panel-shadow-hover:0 8px 24px rgba(0,0,0,0.12);
  --modal-shadow:0 16px 40px rgba(0,0,0,0.16);
  --backdrop:rgba(45,41,38,0.34);                                /* sem-background-scrim */
  --pos-strong:#148338; --neg-strong:#C82320; --info:#3A6AF8; --info-title:#3A6AF8; --hairline:#595959;
  --pros-bg:rgba(20,131,56,.07); --pros-border:rgba(20,131,56,.25);   /* prim-green-500 washes */
  --cons-bg:rgba(200,35,32,.06); --cons-border:rgba(200,35,32,.22);   /* prim-red-600 washes */
  --info-bg:rgba(58,106,248,.06); --info-border:rgba(58,106,248,.24); /* prim-blue-600 washes */
  --text-body:#403D3A;
  --row-hover:var(--taupe-100); --row-pressed:var(--taupe-pressed);   /* NON-table hovers only (plan cards, pills, nudges) */
  --seq1:#EBF0FE; --seq2:#C8D6FD; --seq3:#A5BCFC; --seq4:#7094FB;    /* sem-chart-seq-100..400 — NOTE: template currently previews seq4 #85A0FC (pending, see §7) */
  --seq5:#5A82F9; --seq6:#3A6AF8; --seq7:#2952CC;                    /* sem-chart-seq-500..700 */
  --table-head-bg:var(--accent-hover); --table-head-ink:var(--inverse);  /* rev HK11: sem-btnPrimaryBgHover band + sem-btnPrimaryText ink */
  --table-total-bg:var(--seq1);                                          /* rev HK12: totals bar seq-100 (+ --text-header ink) */
  --table-row-hover:var(--seq2); --table-row-pressed:var(--seq3);        /* rev HK12: hover seq-200 / pressed seq-300 */
  --table-row-hover-fz:var(--seq2); --table-row-pressed-fz:var(--seq3);  /* rev HK6 frozen-column steps — currently equal to the defaults */
}

#appMain,.t2-rd-backdrop{  /* light widget layer — nearest-Hemlock snaps */
  --tk-accent:#3A6AF8; --tk-accent-hover:#2952CC; --tk-accent-subtle:#EBF0FE;
  --tk-btn-accent:#3A6AF8; --tk-btn-accent-hover:#2952CC;
  --tk-text-inverse:#FFFFFF; --tk-text-1:#0E0E0E; --tk-text-2:#5E5954; --tk-text-3:#716E6A;
  --tk-surface-1:#FFFFFF; --tk-surface-2:#F8F7F6; --tk-surface-3:#EEEDEB;
  --tk-border:#EEEDEB; --tk-border-strong:#D5D3D0;
  --tk-error:#C82320; --tk-error-subtle:#FFEAEA;
  --tk-track:#D5D3D0; --tk-off:#EDEAE3; --tk-thumb-dis:#EEEDEB;
  --tk-ton:#EBF0FE; --tk-border-input:#DCD8CB; --tk-focus:#0E0E0E;
  --tk-shadow-sm:0 1px 3px rgba(0,0,0,0.08);
  --tk-shadow-dd:0 4px 12px rgba(0,0,0,0.12);
}
```

Dark:

```css
html[data-theme="dark"]{
  /* surfaces */
  --surface-1:#131C31;            /* sem-background-surface (prim-navy-700) */
  --surface-2:#18223A;            /* sem-background-light / -elevated / -subtle (prim-navy-600) */
  --nest:#18223A;                 /* sem-background-subtle */
  --page-bg:#131C31;              /* sem-background-surface — the template "page" is the component surface; the host app supplies sem-background-main #101729 */
  --calc-bg:#0C1222;              /* sem-background-sunken (prim-navy-900) */
  /* borders */
  --border:#2A3A5C;               /* sem-borders-muted (prim-navy-200) — visible-outline role; pure hairlines = sem-borders-light #131C31 */
  --border-strong:#33476E;        /* sem-borders-strong (prim-navy-50) */
  --taupe-border:#22314F;         /* sem-borders-dark (prim-navy-300) */
  /* text */
  --ink:#D8E1F0;                  /* rev HK13: back to sem-text-header (prim-navylight-800) — neutral body/data ink */
  --heading:#7094FB;              /* rev HK13: heading-only ink = sem-btnPrimaryBgHover dark (prim-blue-400) */
  --text-header:#D8E1F0;          /* sem-text-header (prim-navylight-800) — neutral ink for totals bar + table row labels */
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
  --seq1:#163196; --seq2:#2952CC; --seq3:#3A6AF8; --seq4:#5A82F9;  /* sem-chart-seq — ramp self-inverts in dark */
  --seq5:#7094FB; --seq6:#A5BCFC; --seq7:#C8D6FD;
  /* NO table-var overrides here: --table-head-bg/-ink, --table-total-bg and the row-state vars ride
     --accent-hover/--inverse and the seq ramp, which theme-flip on their own (token-symmetric, rev HK10-HK12) */
  --grid:#26324C; --grid2:#26324C; --axis:#5E6E90;                 /* no Hemlock tokens yet — reference values */
  /* shadows & scrims */
  --tile-shadow:0 0 0 1px rgba(120,150,255,0.06),0 16px 40px rgba(0,0,0,0.70);  /* shadow-lg-color 70% */
  --panel-shadow-hover:0 8px 24px rgba(0,0,0,0.60);                             /* shadow-md-color 60% */
  --modal-shadow:0 16px 40px rgba(0,0,0,0.85);                                  /* shadow-overlay-color 85% */
  --backdrop:rgba(0,0,0,0.64);                                                  /* sem-background-scrim */
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
  --tk-ton:#031E64;               /* sem-toggleTrackOn (prim-blue-900) */
  --tk-border-input:#22314F;      /* sem-borders-dark (prim-navy-300) */
  --tk-focus:#7094FB;             /* sem-borders-focus — FULL blue-400; token's 35% ring alpha is illegible as a glyph */
  --tk-shadow-sm:0 1px 3px rgba(0,0,0,0.50),0 0 0 1px rgba(255,255,255,0.04);   /* shadow-sm-color */
  --tk-shadow-dd:0 4px 16px rgba(0,0,0,0.70),0 0 0 1px rgba(255,255,255,0.05);  /* shadow-lg-color */
}

/* rule-level companions (see §5/§8) */
html[data-theme="dark"] .tkt-thumb{background:#FFFFFF;}  /* sem-toggleKnob — white both modes */
```

---

## 11. Values With No Hemlock Role (retained, flagged)

| Value | Where | Status |
|---|---|---|
| `--hero-1..8` / `--hero-ombre` | hero glow, video posters | Brand gradients — outside the token system. Unchanged both modes. |
| `.sc-title-badge #6E52FF` | LISTINGS / CALCULATOR badges | Bill's rev E ruling (both modes). No `sem-` badge role exists yet. |
| `--grid / --grid2 / --axis / --zero / --det` | chart scaffold | Original values retained both modes. Candidates for future `sem-chart-*` scaffold tokens. |
| `--orange #EA580C` | chart/status extra | No Hemlock role; unchanged. |
| `--hairline #595959` | video-thumb outline, no-chrome insets | Static by design. |

## 12. Open Flags for Design

1. **`--faint` AA miss (ruling C):** `#8A8680` on white ≈ 3.5:1 — fails AA for small text. `sem-text-placeholder #716E6A` passes if needed.
2. **Chart series discontinuity:** `--cat1` is blue in light, purple in dark (§7).
3. **Info color discontinuity:** accent-blue in light, sky in dark (§3).
4. **`--accent-2/3/4`, `--pos-mid`:** nearest-role mappings, not exact tokens.
5. **Badge `#6E52FF`, hero gradients, chart scaffold:** unmapped (§11).

---

## 13. WCAG Notes

- `sem-btnLinkText` dark (`#7094FB` on `#101729`): **6.2:1** — approved ruling.
- Dark primary buttons: black-on-blue-500 passes AA (that's *why* dark buttons are black-text).
- `sem-text-meta` dark (`#697DA0` on `#131C31`): ≈4.1:1 — labels/meta only; body copy uses `sem-text-body #B3C1DB`.
- `--faint` light `#8A8680`: see flag §12.1.
- Disabled states exempt (dim: 45% dark / 38% light).

---

## 14. What NOT To Do

- **No purple info tiles in dark.** Dark info is sky. Purple survives only in the chart palette and the (flagged) badge.
- **No white text on dark primary buttons.** Dark primary = black text on blue-500.
- **No alpha state fills in dark.** Hover/pressed/selected are opaque navy steps. Alpha only for: scrims, focus ring, chat glow, voice pulse, chart washes (and light's original status-tile washes).
- **No light-tinted scrims in dark.** Dark scrim = black @ 64% (`sem-background-scrim`).
- **No gradient tile/header backgrounds in dark.** Elevation = one lighter navy step, flat. (Light keeps its original wash-to-white tile treatment.)
- **No taupe in dark.** Every taupe role maps to a navy step (`#172642` / `#202C4E` / `#22314F`).
- **No hand-picked navy.** If a navy isn't one of the 11 ramp steps (`#33476E #2E4066 #2A3A5C #22314F #202C4E #172642 #18223A #131C31 #101729 #0C1222 #090E1B`), it's wrong.
- **No orange chart thresholds.** Threshold = action blue.
- **No redesigning light.** Light is integrity-locked: original values, nearest-Hemlock annotations. Don't "modernize" light treatments to match dark.
- **Don't "improve" any hex.** If a value looks wrong, flag it to the design team; don't substitute.

---

## Appendix A — Full Hemlock Semantic Reference

Complete `sem-*` set from `hemlock-library.lib.pen`, resolved to hex, for future diffing. Format: token → dark primitive = dark hex (light hex in parentheses).

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
| sem-background-scrim | — literal | `#000000A3` | `#2D292657` |
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

Resolved dark matrix in §6. Raw refs: `sem-btnPrimary*`, `sem-btnPrimaryInverted*`, `sem-btnSecondary*`, `sem-btnSecondaryInverted*`, `sem-btnDestruction*`, `sem-btnLink*` — all present in `hemlock-library.lib.pen`.

### Chat & Nav (different surface — not used by the component template; listed for completeness)

The `sem-chat*` (24 tokens) and `sem-nav*` (19 tokens) families theme the chat panel and navigation, per `chat-nav-refresh.pen`. Key dark anchors: `sem-chatBg #090E1B`, `sem-chatInputBg #090E1B`, `sem-chatBorder #33476E`, `sem-chatTextPrimary #EBF0FE` (prim-blue-100), `sem-chatShadow` glow `0 0 32px rgba(155,179,252,0.14), 0 0 10px rgba(155,179,252,0.10)` (dark-only; light is none), `sem-navBg #090E1B`, `sem-navBorder transparent`. If a component ever embeds in those surfaces, pull values from `hemlock-library.lib.pen` directly.

---

## Primitives Quick Reference (paint — mode-agnostic)

- **navy** (50→950, lightest→darkest): `#33476E #2E4066 #2A3A5C #22314F #202C4E #172642 #18223A #131C31 #101729 #0C1222 #090E1B`
- **navylight** (100→900, darkest→lightest): `#3A485F #52637F #697DA0 #889CBF #9DAFCD #B3C1DB #C8D4E9 #D8E1F0 #E9EEF7`
- **blue** (100→900): `#EBF0FE #C8D6FD #A5BCFC #7094FB #5A82F9 #3A6AF8 #2952CC #163196 #031E64`
- **gray** (50→900): `#F8F7F6 #EEEDEB #D5D3D0 #C0BAB2(250) #B5B1AB #A8A49E(350) #8A8680 #716E6A #5E5954 #403D3A #2D2926 #0E0E0E`
- **taupe** (100→900): `#F7F5F0 #EDEAE3 #E8E6E0(250) #E3DFD6 #DCD8CB(350) #BCB49E #9D937B #877F68 #6C6451 #4B4435 #322C20`
- **darktints:** skydark `#16304A #10263C` · greendark `#245234 #1A3A26 #12291C` · orangedark `#5E3A18 #472C13 #33200F` · reddark `#542427 #3A1B1E #2C1518`
- **status accents (dark):** green-350 `#4ADE80` (+muted `#74D791`) · red-350 `#F87171` / red-250 `#FCA5A5` (+muted `#E5807E`) · orange-400 `#FB924D` (+muted `#EA9C62`) · sky-250 `#38BDF8`
- **shadow colors:** light 8/10/12/16% black · dark 50/60/70/85% black (lifted Aug 21 so elevation reads on navy) · scrim: `sem-background-scrim` `#2D292657` light / `#000000A3` dark
