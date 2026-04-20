---
name: Pencil Implementation
description: Template for generating React + TypeScript + Tailwind code from a Pencil.dev design spec
---

You are generating implementation code for a Pencil.dev design.

## Inputs you will receive

- A Pencil spec: either raw JSON from a `.pen` file, a Pencil MCP payload, or a node subtree rooted at a specific id.
- The target component library path (default `packages/components`).
- The Evergreen token files:
  - `01-foundational-tokens.json` (color primitives, type, spacing, radius, shadow, motion, opacity)
  - `02-components-and-states.json` (component + state tokens)
  - `03-spacing-and-shadows.json`
  - `04-tables.json`
  - `05-charts.json`
  - `.design-system/reference/design-tokens-spec.md` (semantic mapping and canonical names)

## Rules (non-negotiable)

1. **Library first.** If a component in the target library matches the Pencil node, import it unmodified. See `.cursor/rules/pencil-component-matching.mdc` for the mapping table and decision order.
2. **Tokens only.** Every color, spacing, radius, shadow, font, and size must resolve to a semantic token. Never emit literal hex, rgba, px spacing, or font-family strings.
3. **Tailwind or CSS variables** — prefer the project's Tailwind preset if one exists; otherwise consume CSS custom properties (`var(--color-accent-primary)`). Never use both in the same file.
4. **Exact copy.** Labels, helper text, numbers, and units are copied verbatim from the `.pen`. No paraphrasing, no Lorem Ipsum.
5. **States.** Every interactive element must cover `default`, `hover`, `focus-visible`, `active`, `disabled` at minimum. Add `loading`, `empty`, `error`, `success` where the Pencil design defines them or where semantics require.
6. **Accessibility.** Semantic HTML first. Contrast ≥ 4.5:1 body / ≥ 3:1 large. Touch targets ≥ 44×44px. Honour `prefers-reduced-motion`. Provide `aria-*` only where semantic HTML is insufficient.
7. **Dark mode.** If a Pencil variable defines light + dark values, rely on the CSS variable to switch. Do not branch on `dark:` classes for token-covered values.
8. **Typed props.** All props typed; prefer discriminated unions for variant props; no `any`.
9. **No dead code.** No narration comments, no TODOs, no console logs, no commented-out blocks.
10. **Idempotent.** Running the handoff again with the same inputs must produce the same file byte-for-byte.

## Output

Produce exactly two blocks, in this order.

### 1. Component file

A single TypeScript React component (`.tsx`). Top of file: imports. Below: types, then the component, then a default export if the library convention uses it.

### 2. Handoff summary

Use the format defined in `.cursor/skills/pencil-handoff/SKILL.md` under "Output Format":

```
## Pencil → Code Handoff: <frame name>

**Source:** <path>.pen#<node id>
**Generated:** <path>/<Component>.tsx

### Components used (library, unmodified)
### New components created
### Tokens referenced
### States covered
### Accessibility
### Open questions
```

## Procedure

1. Parse the `.pen` subtree. Resolve every `$token` reference against the file's `variables` map, then against the semantic names in `design-tokens-spec.md`. If a token can't be resolved, stop and list it under Open questions.
2. Walk the tree top-down. For each node, decide: library component, composition of primitives, or new component (in that order). Record the decision.
3. Emit the `.tsx`. Imports ordered: stdlib (none), then library, then local, then types.
4. Emit the summary. Every listed token must appear in the generated code; every listed component must be imported.
5. If anything blocks generation (missing library, unresolvable token, ambiguous layout), stop at the earliest blocking step, emit only the summary with the Open questions populated, and request clarification.

## Do Not

- Do not modify existing library components.
- Do not create components in this `design-specs` repo — they go in the consumer.
- Do not edit `.pen` files (see `.cursor/rules/pencil-pen-file-editing.mdc`).
- Do not guess a token value — resolve it or stop.
- Do not rewrite copy for tone, brevity, or grammar.
