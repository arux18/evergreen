---
description: Convert a Pencil.dev design to React + Tailwind code using the pencil-handoff skill
---

# /pencil-to-code

Run the Pencil → Code handoff on the current `.pen` file, a specific node in one, or a user-supplied Pencil reference.

## Behavior

1. Read the `pencil-handoff` skill at `.cursor/skills/pencil-handoff/SKILL.md` and follow its steps exactly.
2. Apply `.cursor/rules/pencil-component-matching.mdc` for every component decision.
3. Use `.cursor/prompts/pencil-implementation.md` as the generation template.
4. Emit the handoff summary defined in the skill's Output Format section.

## Arguments (optional)

- `<path-to-pen>` — target `.pen` file. Defaults to the currently focused file if it ends in `.pen`.
- `#<node-id>` — scope to a single Pencil node (e.g., `dashboard-example-test.pen#zkuNp`).
- `--target=<path>` — where to write the generated component. If omitted, ask the user; do not guess.
- `--library=<path>` — path to the consuming repo's component library (defaults to `packages/components`).

## Preconditions

- The target consumer repo is checked out and writable (or the user has agreed to paste output).
- Design tokens in `01-foundational-tokens.json` … `05-charts.json` are current.
- If the design references Pencil MCP resources, Pencil MCP is enabled in `.cursor/settings.json`.

## Do Not

- Do not edit `.pen` files.
- Do not modify existing library components.
- Do not hardcode colors, spacing, radii, or typography.
- Do not invent text content — copy from the design verbatim.
