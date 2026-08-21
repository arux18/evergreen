# Tokens sync log

Reference library (read-only): `pencil/design-system/in-progress/hemlock-library.lib.pen`.

Regenerate primitive RGB lines in `colors.css`: `node scripts/sync-tokens-from-hemlock.mjs`

---

## Primitives (`tokens/colors.css`)

| | |
|--|--|
| **Source of truth** | Hemlock `variables`: every `prim-*` color entry (115 primitives). Since the two-theme restructure (Aug 2026), variable values are per-theme lists — primitives are static, so the script takes the Light entry and warns if Dark differs. |
| **Naming** | `--prim-*` (was `--color-*` before the Aug 2026 restructure). |
| **Excluded** | `shadow-*-color` — themed shadow colors are semantics, not paint; they live in `pencil/design-system/dark-mode-handoff/` with their light/dark pairs. |
| **Removed (historical)** | `--color-clay-*`, `--color-violet-*`, `--color-olive-*` (dropped from Hemlock long ago). |

## Semantics (`tokens/colors.ts`)

| | |
|--|--|
| **Updated (2026-08-21)** | All var refs moved `--color-*` → `--prim-*`; added navy / navylight / *-dark / *-muted / half-step ramps; semantic shortcuts realigned to canon light values (primary button is **blue**, not charcoal; chat send = blue-600; chat shadow is dark-only = `transparent` in light; chatVoice pulse = blue-600 @ 16%). |
| **Dark values** | Not in this file — the dark theme ships via `pencil/design-system/dark-mode-handoff/hemlock.dark.css` (`html[data-theme="dark"]` overrides) and `navy-dark.tokens.json`. |
| **Removed** | `text`: `header-success`, `header-error`, `body-error`, `body-success`. `icons`: `feature-dark`, `feature-white`. Entire `clay`, `violet`, `olive` scales. |
| **Added (earlier)** | `nav` (bg, text, icon, states, shadow). `chat` (bg, border, divider, text, input, chips, shadow). `chatVoice` (active, waveform, timer, pulse). |
| **Updated (earlier)** | `text.disabled` → gray-300. Link/button text: blue-600 / blue-700 / blue-800. `btnLinkTextActive` renamed **`btnLinkTextPressed`**. |
