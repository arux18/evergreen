# Handoff Templates

Fill in every bracket. Delete sections that truly don't apply. Don't leave them empty. Unknowns go under **Open questions** as TBD.

## README-DEV.md (token / theme handoff)

Lives in the token package folder (for example `pencil/design-system/in-progress/dark-mode-handoff/`).

```markdown
# [Theme or token change] — Developer Handoff

## Agent brief
- **Change:** [one sentence]
- **Do in order:** 1. [load CSS files] 2. [rebind surfaces by role] 3. [behavior changes]
- **Verify:** from a design-specs checkout, `python3 .cursor/skills/design-handoff/scripts/check_tokens.py <your css files> [--prefix <your var prefix>] --refs` reports "all tokens match the library".
- **Don't:** [e.g. derive dark from light; use prefers-color-scheme; swap values without rebinding]
- **Source of truth:** CSS/JSON values > this README > screenshots.

## Files
- `hemlock.light.css`: every token's light value under `:root`.
- `hemlock.dark.css`: dark values under `html[data-theme="dark"]`, same names 1:1.
- `hemlock.tokens.json`: every token with light/dark `value` (hex) and `ref` (the token it points at).
- This README: roles and behavior the CSS can't express.

Naming: primitives `prim-*`, semantics `sem-*`; chart names replace `/` with `-`. Design-only tokens excluded: [list].

## Required changes
[Table: token | new value | old value | why. Dated.]

## Surface roles
[Role | token table: shell = main, content = surface, cards/controls/floating = elevated.]

## Implementation notes
1. [Behavior: theme default and persistence, state transitions, disabled styling, alpha exceptions, charts, typography.]

## Decisions
- [Decision], confirmed by [who] on [date].

## Acceptance criteria
- [ ] [Testable statement, e.g. "check_tokens.py passes against the app CSS"]
- [ ] [e.g. "With no stored preference, first paint is dark with no flash"]

## Open questions
- TBD: [question] (owner: Amanda)
```

## HANDOFF.md (screen / flow handoff)

Default location: `<pen folder>/<pen name>-handoff/HANDOFF.md`.

```markdown
# [Feature] — Design Handoff

## Agent brief
- **Build:** [one sentence]
- **Design file:** `pencil/designs/<stage>/<file>.pen` (open with the Pencil MCP; node IDs below)
- **Tokens:** Hemlock only, per `dark-mode-handoff/hemlock.*.css`; no hardcoded colors except the brand art listed below.
- **Components:** [Hemlock components used, e.g. `component/Card`, `component/Input/focus`]
- **Don't:** [e.g. invent copy, add states not shown, restyle Hemlock components]
- **Source of truth:** this doc + the .pen file > screenshots.

## Screens
| Step | Screen | Desktop node | Mobile node | Notes |
|---|---|---|---|---|
| 01 | [name] | `[id]` | `[id]` | [one line] |

## Flow
[Numbered path with branches, e.g. "01 Continue → 02; Cancel → entry context". Include every exit.]

## States and behavior
For each screen: default, loading, empty, error, success, disabled; what triggers each; timers/cooldowns with exact durations; focus and keyboard behavior.

## Copy
Exact strings as in the design, or "see node `[id]`". Error and helper text included.

## Responsive
Desktop vs mobile differences; breakpoints; what reflows, hides or becomes a bottom sheet.

## Themes
Works in light and dark via tokens. Note anything that looks different on purpose.

## Hardcoded on purpose
[Brand logos, partner icons, illustrations: layer names and why.]

## Decisions
- [Decision], confirmed by [who] on [date].

## Acceptance criteria
- [ ] [Testable statement per screen or flow branch]

## Open questions
- TBD: [question] (owner: Amanda)
```
