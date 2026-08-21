# Hemlock dark mode review artifacts

Baselines and gate screenshots for the `hemlock-dark-theme` work. **Status: shipped (2026-08-20).** The navy dark theme is live in `hemlock-library.lib.pen` on the `🎨 Colors` axis (Light / Dark), using the current `prim-*` / `sem-*` token nomenclature.

## Single-theme experiment (steps)

- `step0-light/` — pre-change light baselines
- `step1-light/` … `step4-light/`, `step3-dark/`, `step4-dark/` — intermediate gate captures
- `step5-light/` — final light regression (must match `step0-light/`)
- `step5-dark/` — dark mode captures for design sign-off
- `axis-rename-light/` — regression after the theme axis rename

## Two-theme migration (phases)

- `two-themes/pre-phase1-light/` … `two-themes/phase4-dark/` — light/dark captures per phase
- `two-themes/PHASE5-HANDOFF.md` — phase 5 handoff notes
- `two-themes/phase3-deferred-hex-report.md` — deferred literal-hex report

## Current canon

The final token values these captures were validated against are documented in:

- `../design-system.md` §01 (full light/dark token tables)
- `../hemlock-html-handoff.md` §15–16 (CSS custom properties + dark override block)
- `../set-variables-args-only.json` (raw themed variable map)

Historical folders are retained as the audit trail; do not update them.
