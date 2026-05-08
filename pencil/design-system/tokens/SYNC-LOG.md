# Tokens sync log

Reference library (read-only): `pencil/design-system/in-progress/hemlock-library.lib.pen`.

Regenerate primitive RGB lines in `colors.css`: `node scripts/sync-tokens-from-hemlock.mjs`

---

## Primitives (`tokens/colors.css`)

| | |
|--|--|
| **Source of truth** | Hemlock `variables`: every `color-*` entry whose value is a `#RRGGBB` hex (`70` primitives). |
| **Removed (historical)** | `--color-clay-*`, `--color-violet-*` (dropped from Hemlock). |
| **Removed (historical)** | `--color-olive-50` … `--color-olive-900` — palette removed from Hemlock; leftover canvas labels in `.pen` do not define these variables. |
| **Updated** | Gray scale and remaining `--color-*` primitives synced from Hemlock on each `sync-tokens-from-hemlock.mjs` run. |

---

## Semantics (`tokens/colors.ts`)

| | |
|--|--|
| **Removed** | `text`: `header-success`, `header-error`, `body-error`, `body-success`. `icons`: `feature-dark`, `feature-white`. Entire `clay` and `violet` scales. Entire **`olive`** scale (no Hemlock primitives). |
| **Added** | `nav` (bg, text, icon, states, shadow). `chat` (bg, border, divider, text, input, chips, shadow). `chatVoice` (active, waveform, timer, pulse). |
| **Updated** | `text.disabled` → gray-300. `btnPrimaryTextDisabled` → gray-400. `btnPrimaryInvertedTextDisabled` & `btnSecondaryInvertedTextDisabled` → gray-300. Link/button text: blue-600 / blue-700 / blue-800, disabled gray-300. `btnLinkTextActive` renamed **`btnLinkTextPressed`** (aligned with `$colors-btnLinkTextPressed`). |
