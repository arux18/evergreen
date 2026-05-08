# Tokens sync log

Reference library (read-only): `pencil/design-system/in-progress/hemlock-library.lib.pen`.

Regenerate primitive RGB lines in `colors.css`: `node scripts/sync-tokens-from-hemlock.mjs`

---

## Primitives (`tokens/colors.css`)

| | |
|--|--|
| **Removed** | `--color-clay-200`, `--color-clay-400`, `--color-clay-600`, `--color-violet-50`, `--color-violet-500` |
| **Updated** | Full gray scale `--color-gray-50`–`900` and other `--color-*` hex primitives from Hemlock (80 total) |

---

## Semantics (`tokens/colors.ts`)

| | |
|--|--|
| **Removed** | `text`: `header-success`, `header-error`, `body-error`, `body-success`. `icons`: `feature-dark`, `feature-white`. Entire `clay` and `violet` scales. |
| **Added** | `nav` (bg, text, icon, states, shadow). `chat` (bg, border, divider, text, input, chips, shadow). `chatVoice` (active, waveform, timer, pulse). |
| **Updated** | `text.disabled` → gray-300. `btnPrimaryTextDisabled` → gray-400. `btnPrimaryInvertedTextDisabled` & `btnSecondaryInvertedTextDisabled` → gray-300. Link/button text: blue-600 / blue-700 / blue-800, disabled gray-300. `btnLinkTextActive` renamed **`btnLinkTextPressed`** (aligned with `$colors-btnLinkTextPressed`). |
