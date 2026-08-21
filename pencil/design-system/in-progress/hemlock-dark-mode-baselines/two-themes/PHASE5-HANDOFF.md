# Hemlock two-themes playbook — Phase 5 handoff

> **⚠️ SUPERSEDED (2026-08-20).** This document describes an intermediate experiment state and is retained only as an audit trail. The dark theme has since **shipped**: the axis is now `🎨 Colors` (`Light` / `Dark`), tokens were renamed to `prim-*` / `sem-*`, and the navy palette replaced the values below. Current canon: `../../design-system.md` and `../../hemlock-html-handoff.md`.

Branch: `hemlock-dark-theme` (do **not** merge to `develop`)

## Axis / themes
- Axis: `mode` (unchanged; do not rename)
- Themes: `{"mode": ["light", "dark"]}` (light = default)

## Phase 1 — Semantic tokens themed
**69** remaining `colors-*` tokens converted to light/dark slots:
- Text/icons/borders (11): disabled, action, deposit, reverse, error, placeholder, body-error, icons-meta/error, borders-focus/error
- Full button matrix (primary / inverted / secondary / inverted / destruction / link)
- Shadows & chat: `colors-chatShadow`, `shadow-sm/md/lg/overlay-color`

## Phase 2 — Primitives themed
**37** primitives: gray, taupe, blue, red, green, orange, sky scales.
- `color-green-500` light kept `#148338`
- `color-base-white` **not** themed (stays white)

## Phase 3 — Hex rebinds
Applied:
- `#ffffff` → `$color-base-white` (102)
- `#3a6af8` → `$color-blue-600` (41)
- `#00000000` kept (2)

Deferred (see `phase3-deferred-hex-report.md`):
- Near-miss: `#DCFCE7`, `#166534`, `#DC2626`
- Off-system: `#eeefee`, `#cccccc`, `#202220`, `#727874`, `#949895`, `#CBD5E1`, `#64748B`

## Phase 4 — Dark showcase frames
Added (disk IDs):
| ID | Name | theme |
|----|------|-------|
| hbnH3 | Wave 1 / P1 Atoms (Dark) | dark |
| FIEkS | Wave 2 / P2 Molecules (Dark) | dark |
| l1hVF | Wave 3 / P3 Organisms (Dark) | dark |
| Z4cps | Token Gallery (Dark) | dark |

Originals pinned `theme: {mode: light}`. Dark frames use **refs** to the same component masters (not detached copies).
Token Gallery (Dark) root fill set to `$colors-background-main` for dark chrome.

**Note:** Pencil editor may still hold alternate dark-frame IDs (`Mig5R`, `c2qhp`, `i5hkW`, `wwToK`) in buffer. Prefer disk; close without saving stale buffer and reopen if needed.

## Gate results
- Light Waves / Gallery vs `pre-phase1-light`: **byte-identical**
- Dark Waves: navy backgrounds (~19,28,49) — coherent dark
- Token Gallery Dark: themed variable swatches resolve; page still dominated by white swatch cards (`$color-base-white` unthemed) + deferred CodeBlock hexes — expected until Phase 3 off-system cleanup

## Themed variable count
~136 themed color variables (prior charts/semantics + Phase 1 + Phase 2)

## Review screenshots
`pencil/design-system/in-progress/hemlock-dark-mode-baselines/two-themes/phase4-dark/`
`pencil/design-system/in-progress/hemlock-dark-mode-baselines/two-themes/phase4-light/`

## Known open (playbook)
- Amanda finalizing dark color values
- 22 gradient fills left untouched
- chat-ui / charts-v2 theming = separate task
