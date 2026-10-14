# Navy Dark Theme — Developer Handoff

Everything here is canonical and current. Files:

- **hemlock.light.css** — every semantic token's light value under `:root`, generated from hemlock-library.lib.pen. Includes a **required light-mode change** (below).
- **hemlock.dark.css** — every semantic token's dark value, scoped to `html[data-theme="dark"]`, generated from the same library. Token names match the light file 1:1 — the theme is a pure variable flip: no new tokens, none removed, no markup changes.
- **hemlock.tokens.json** — every token with its light and dark values as structured data (the token it points at plus the resolved hex) for token pipelines. Replaces navy-dark.tokens.json.
- this README — surface roles and the non-CSS behaviors below.

Naming: T1 primitives = `prim-*`, semantics = `sem-*` (no `colors-` prefix). Chart tokens use the library names with `/` replaced by `-`, because CSS custom property names can't contain `/` (`chart-categorical/color-01` → `--chart-categorical-color-01`). Design-only tokens (`sem-iosChrome*` for the phone status-bar mockups, `sem-dotGrid`) are not part of the app and are excluded.

## Required light-mode change (ships with dark mode)

On Sep 28 the light values of two background tokens swapped so the app shell uses one token in both themes:

| Token | Light (new) | Light (was) | Dark (unchanged) |
|---|---|---|---|
| `sem-background-main` | `#FFFFFF` base-white | `#F7F5F0` taupe-100 | `#101729` navy-800 |
| `sem-background-surface` | `#F7F5F0` taupe-100 | `#FFFFFF` base-white | `#131C31` navy-700 |

`sem-chatInputBg` light now chains to `sem-background-main` (still white).

**No drop shadows on the chat or nav panels in light mode.** `sem-navShadow` now points at `sem-chatShadow` in both themes, so both panels have no shadow in light (the nav used to have a faint `#2D292628` shadow) and the same blue glow in dark (`0 2px 28px 0 #9BB3FC24`). `sem-navBorder` matches `sem-chatBorder`: taupe-350 in light, navy-50 in dark.

If the code only swaps the values, anything bound to `main` or `surface` changes color in light mode. Rebind each surface to the role below so the light app looks exactly as it does today.

## Dark-mode token retune (Oct 6, 2026)

Six dark values changed. Light values are unchanged, and no tokens were added or removed.

| Token | Dark (new) | Dark (was) | Why |
|---|---|---|---|
| `sem-borders-light` | `#202C4E` navy-400 | `#131C31` navy-700 | Row and table hairlines were invisible on `sem-background-main` and identical to `sem-background-surface` |
| `sem-text-meta` | `#9DAFCD` navylight-500 | `#697DA0` navylight-300 | Quiet labels (Total Net Balance, Banking, Investments, chart axes) read as disabled |
| `sem-icons-meta` | `#9DAFCD` navylight-500 | `#697DA0` navylight-300 | Stays matched with `sem-text-meta` |
| `sem-borders-disabled` | `#3A485F` navylight-100 | `#2A3A5C` navy-200 | Matches `sem-text-disabled`, so a disabled field's border, label, and value are one color (light already does this with gray-300) |
| `sem-scrim` | `#00000052` black 32% | `#00000073` black 45% | The page behind dialogs went nearly black |
| `sem-background-scrim` | `#00000052` black 32% | `#000000A3` black 64% | Same film as `sem-scrim` in dark |

**Secondary and outline buttons** (for example, Manage Accounts) bind text to `sem-btnSecondaryText` and the stroke to `sem-btnSecondaryBorder` in both themes — never `sem-text-meta` or a primitive. Those tokens are unchanged.

## Surface roles

| Role | Token | Light | Dark |
|---|---|---|---|
| App shell / page background | `sem-background-main` | `#FFFFFF` | `#101729` |
| Main content surface | `sem-background-surface` | `#F7F5F0` | `#131C31` |
| Cards, chart containers, small controls (checkbox, radio, select, date field, steps, carousel arrows, account selector), popups, bottom sheets, dialogs, modals, tooltips | `sem-background-elevated` | `#FFFFFF` | `#18223A` |

In light mode an elevated card on the white shell is white on white, so cards keep their `sem-borders-light` border or a shadow — a borderless card on the shell disappears.

## Implementation notes
1. **Theme flip**: everything keys off html[data-theme="dark"]. Light and dark are themed independently — never derive one from the other. **Default theme is DARK** (business-confirmed 2026-09-22, recorded in FE-1894): with no stored preference, the pre-paint inline script sets data-theme="dark". Keep the default a one-line config change.
2. **Chat close button scroll border**: 1px borders-strong fades in (200ms) only while chat content scrolls beneath (scrollTop > 4). Drive via a data-scrolled attribute set by a scroll listener + CSS attribute rule — not framework state (avoids re-render races with chat autoscroll; autoscroll fires only on new message / typing start).
3. **Disabled states**: opacity dim on outline + icon — 45% in dark, 38% in light. chatVoiceBgDisabled = transparent (the voice button is an outline button; no fill in any state except active).
4. **Alpha survives only for**: drawer scrim and modal overlay (`sem-scrim` / `sem-background-scrim`, black 32% in dark), focus ring rgba(112,148,251,0.35), chat and nav panel glow (sem-chatShadow, which sem-navShadow points at in both themes — DARK-ONLY; in light both panels have no shadow), chatVoicePulse #7094FB28, and the shadow-*-color tokens (dark: black @ 50/60/70/85% — lifted Aug 21 so elevation stays visible on navy; light: 8/10/12/16%). The nav panel matches the chat panel in both themes: `sem-navShadow` = `sem-chatShadow` (none in light, blue glow in dark) and `sem-navBorder` = the chat border (taupe-350 light, navy-50 dark). In light mode neither panel has a drop shadow. Render the dark glow on both panels as box-shadow: 0 2px 28px 0 #9BB3FC24 (matches chat-nav-refresh.pen). Every other state fill is an opaque navy step.
5. **Charts**: categorical palette is `--chart-categorical-color-01`…`15` (palette v5 — Azure, Teal, Iris, Plum, Ember), light and dark values in the two CSS files, same slot order. Assignment order randomized per chart, never repeat a hue within one chart; red/green reserved for gain/loss. Sequential ramp = `--chart-sequential-seq-100`…`700`, which point at the blue palette (dark: seq-100→prim-blue-800 … seq-700→prim-blue-200; light runs 100→100 … 700→700). `--chart-threshold` = sem-background-action, never orange. Chart backgrounds and tooltips use sem-background-elevated. Axis/label text uses Gothic A1 on text-meta — the color role is the canon part (it flips in dark); size is per-chart (e.g., 10px or text-size-2xs, per the chart master).
6. **WCAG checkpoints baked into values**: btnLink text (blue-400) = 6.2:1 on background-main; body text (navylight-600) ≥ 7:1 on surfaces; verify new pairings against navy-600/700/800/950.
7. **Typography is mode-agnostic**: Gothic A1 UI/body with tabular-nums on numerals; Noto Serif never above weight 600; button labels Gothic A1 12px regular uppercase 0.75px tracking (exempt: conversational pills).

Source-of-truth order: pen file (visuals) → hemlock.light.css / hemlock.dark.css (values) → Navy Evergreen.ai Prototype (v4) (interaction reference).
