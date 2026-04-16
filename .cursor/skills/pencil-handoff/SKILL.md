---
name: Pencil Handoff
description: Use when converting a Pencil.dev design (.pen file or Pencil MCP reference) into React + Tailwind implementation code. Matches design elements to existing components and enforces exact token usage.
---

# Pencil Handoff

Orchestrates the design → code workflow for Pencil.dev specs.

## When to Use

- A `.pen` file in `.pencil/` or `.design-system/` is the source of truth for a new UI
- User asks to "implement this design", "build this from Pencil", or runs `/pencil-to-code`
- A Linear issue or PR comment references a Pencil design that needs implementation

Do NOT use this skill for:
- Figma handoffs (no Figma MCP is configured here)
- Design review/critique (use Vega's review capabilities instead)
- Editing `.pen` files (see `.cursor/rules/pencil-pen-file-editing.mdc`)

## Inputs

1. Pencil design spec — one of:
   - A `.pen` file path in this repo
   - Pencil MCP reference (if Pencil MCP is enabled in `.cursor/settings.json`)
   - A user-provided JSON excerpt of the Pencil node tree
2. Target component library location (defaults to `packages/components` in the consuming repo; confirm with the user if absent)
3. Target tokens:
   - Foundational: `01-foundational-tokens.json`
   - Components: `02-components-and-states.json`
   - Spacing/shadows: `03-spacing-and-shadows.json`
   - Tables: `04-tables.json`
   - Charts: `05-charts.json`
   - Reference spec: `.design-system/reference/design-tokens-spec.md`

## Steps

1. **Load the Pencil spec.** Read the `.pen` file or fetch via Pencil MCP. Treat the `children` tree as the layout graph and the `variables` map as the token dictionary. `$token.name` references in `fill`, `stroke`, etc. map to entries in `variables`.
2. **Resolve tokens to semantic names.** For every `$token` reference, look up its value(s) and find the matching semantic token in `design-tokens-spec.md` (e.g., `$bg-primary` → `color.surface.primary`). Never hardcode the hex value in generated code.
3. **Match design elements to components.** Apply `.cursor/rules/pencil-component-matching.mdc`. For each Pencil frame/node, decide:
   - Is there an existing component in the target library? If yes, use it unmodified.
   - If no, is a new component needed, or can composition of primitives solve it?
4. **Generate code using `.cursor/prompts/pencil-implementation.md`** as the generation template. Output:
   - A single React component file (TypeScript, `.tsx`)
   - Tailwind classes keyed off the Evergreen preset / CSS vars
   - Props typed, states covered (hover/focus/disabled/loading/empty/error where applicable)
5. **Verify fidelity.** Check spacing (4px grid, `space.*` tokens), typography (`Heebo` for UI, `Cormorant Garamond` for headings), text content (verbatim from the `.pen`), and dark-mode parity.
6. **Run accessibility check.** If the consumer has Vega available, invoke `vega scan-code` (see `vega/tools.py`) on the generated file. Otherwise, apply the checks from `vega/rules/accessibility/accessibility.md` inline.
7. **Emit handoff summary.** Post a brief with: components used, new components created, tokens referenced, states covered, open questions.

## Constraints (Iron Law)

- **Never modify existing library components.** If a component in the target library matches, use it as-is.
- **Never hardcode design values.** Every color, spacing, radius, and typography value must resolve to a token.
- **Text is verbatim.** Copy every label, caption, and number exactly as written in the `.pen` — do not paraphrase.
- **One source of truth.** Pencil is authoritative here; do not blend in Figma, Storybook, or ad-hoc specs.
- **Do not edit `.pen` files via Shell/Node.** Follow `.cursor/rules/pencil-pen-file-editing.mdc`.

## Output Format

```
## Pencil → Code Handoff: <frame name>

**Source:** <path>.pen#<node id>
**Generated:** <path>/<Component>.tsx

### Components used (library, unmodified)
- <Component> — matched <pencil node type/name>

### New components created
- <Component> — rationale

### Tokens referenced
- color.*, space.*, radius.*, font.*

### States covered
default, hover, focus, disabled, loading, empty, error

### Accessibility
- contrast: pass/fail per pair
- semantic HTML + ARIA: notes
- keyboard order: notes

### Open questions
- <anything unresolved>
```

## Related Files

- Rule: `.cursor/rules/pencil-component-matching.mdc`
- Command: `.cursor/commands/pencil-to-code.md`
- Prompt: `.cursor/prompts/pencil-implementation.md`
- Pen editing rule: `.cursor/rules/pencil-pen-file-editing.mdc`
- Vega agent spec: `vega/AGENT.md`
- Token spec: `.design-system/reference/design-tokens-spec.md`
