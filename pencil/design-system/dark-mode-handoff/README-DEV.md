# Navy Dark Theme — Developer Handoff

Everything here is canonical and current. Three files:

- **hemlock.dark.css** — every semantic token's dark value, scoped to html[data-theme="dark"]. Variable naming: T1 primitives = prim-*, semantics = sem-* (no colors- prefix). Token names match the light set 1:1 — the theme is a pure variable flip: no new tokens, none removed, no markup changes.
- **navy-dark.tokens.json** — the same values as structured data (primitive refs preserved) for token pipelines.
- this README — the non-CSS behaviors below.

## Implementation notes
1. **Theme flip**: everything keys off html[data-theme="dark"]. Light and dark are themed independently — never derive one from the other.
2. **Chat close button scroll border**: 1px borders-strong fades in (200ms) only while chat content scrolls beneath (scrollTop > 4). Drive via a data-scrolled attribute set by a scroll listener + CSS attribute rule — not framework state (avoids re-render races with chat autoscroll; autoscroll fires only on new message / typing start).
3. **Disabled states**: opacity dim on outline + icon — 45% in dark, 38% in light. chatVoiceBgDisabled = transparent (the voice button is an outline button; no fill in any state except active).
4. **Alpha survives only for**: drawer scrim, modal overlay, focus ring rgba(112,148,251,0.35), chat panel glow (sem-chatShadow — DARK-ONLY; light mode is explicitly none), chatVoicePulse #7094FB28, and the shadow-*-color tokens (dark: black @ 50/60/70/85% — lifted Aug 21 so elevation stays visible on navy; light: 8/10/12/16%). Every other state fill is an opaque navy step.
5. **Charts (dark)**: categorical palette per the token set; assignment order randomized per chart, never repeat a hue within one chart; red/green reserved for gain/loss. Sequential ramp = the sem-chart-seq tokens, which point at the blue palette (dark: seq-100→prim-blue-800 … seq-700→prim-blue-200; light runs 100→100 … 700→700). chart-threshold = sem-background-action, never orange. Axis labels 10px Heebo on text-meta.
6. **WCAG checkpoints baked into values**: btnLink text (blue-400) = 6.2:1 on background-main; body text (navylight-600) ≥ 7:1 on surfaces; verify new pairings against navy-700/800/950.
7. **Typography is mode-agnostic**: Heebo UI/body with tabular-nums on numerals; Noto Serif never above weight 600; button labels Heebo 12px regular uppercase 0.75px tracking (exempt: conversational pills).

Source-of-truth order: pen file (visuals) → hemlock.dark.css (values) → Navy Evergreen.ai Prototype (v4) (interaction reference).
