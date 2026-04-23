# Pencil.dev → Cursor Handoff: Visual Reference

This document lives in the **`design-specs`** repository. It describes two related workflows:

1. **In-repo design system** — Pencil libraries, `.pen` files, and JSON/Markdown token artifacts stay aligned with each other.
2. **Downstream implementation** — Designs and tokens inform generated UI code in a **consumer application** (component library path such as `packages/components`, Tailwind or CSS variables).

The Skill → Rule → Command → Prompt chain below targets **workflow (2)**. Workflow **(1)** uses separate Cursor rules and files listed under [Design system & token sync](#design-system--token-sync-in-this-repo).

---

## Overview

High-level flow from design spec to generated UI code:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Pencil.dev    │────▶│     Skill       │────▶│  Generated Code │
│   (Design Spec) │     │ (Orchestration) │     │  (React + TW)   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   Rule (Decide) │
                        │  Component Match│
                        └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │ Command (Execute│
                        │  pencil-to-code │
                        └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │ Prompt (Generate│
                        │   Template)     │
                        └─────────────────┘
```

**Authority:** For UI layout and copy, **Pencil** is the source of truth. For **resolved token values** when generating code from this repo, use the foundational JSON files and [`design-tokens-spec.md`](.design-system/reference/design-tokens-spec.md) — not ad-hoc hex or legacy names.

---

## Design system & token sync (in this repo)

Before or alongside implementation, designers and agents keep **primitives → semantics** consistent across artifacts:

```
┌──────────────────────────────┐     ┌─────────────────────────────┐
│  gen-ui-design-system.lib.pen │────▶│  01-foundational-tokens.json │
│  (variables; light/dark)       │     │  02-components-and-states…   │
└──────────────────────────────┘     │  03-spacing-and-shadows.json │
         │                            │  04-tables.json / 05-charts… │
         │                            └─────────────────────────────┘
         │                                          │
         ▼                                          ▼
┌──────────────────────────────┐     ┌─────────────────────────────┐
│  Other .pen documents          │     │  design-tokens-spec.md       │
│  (.pencil/, screens)           │     │  design-token-gallery.html   │
└──────────────────────────────┘     └─────────────────────────────┘
```

**Principles:**

- Semantic tokens use names like `accent.default`, `text.secondary`, `destructive.hover` (see variables in the library `.pen` and the spec). Prefer **`$token.name`** references on the canvas over raw hex.
- After changing variables in Pencil, sync the JSON/spec/gallery when the team agrees the Pencil file is canonical (see repo history for examples).

**Editing `.pen` files from Cursor:** The Pencil extension keeps its own model. Follow [`.cursor/rules/pencil-pen-file-editing.mdc`](.cursor/rules/pencil-pen-file-editing.mdc) — use editor diffs and **Review** so changes apply to the canvas.

---

## Data visualization (parallel track)

Chart-heavy work may reference:

- [`.pencil/pencil-data-viz-design-system.lib.pen`](.pencil/pencil-data-viz-design-system.lib.pen) when applicable, or chart tokens embedded in Gen UI.
- [`05-charts.json`](05-charts.json), [`vega/rules/`](vega/rules/), and chart sections in [`design-tokens-spec.md`](.design-system/reference/design-tokens-spec.md).

The same **token-first** rule applies: resolve categorical / sequential chart colors from documented tokens, not one-off hex in generated code.

---

## 1. Skill (`.cursor/skills/pencil-handoff/SKILL.md`)

**Status:** 🔜 **Planned** — not present in the repo yet. The prompt template references this skill for a structured handoff summary.

**Purpose:** Orchestrate the full handoff workflow (fetch spec → match components → emit code → verify).

```yaml
---
name: Pencil Handoff
description: Convert Pencil.dev designs to implementation code
---

## When to Use
When a design from Pencil.dev needs to become working code in Cursor.

## Steps
1. Obtain the design spec (e.g. `.pen` JSON subtree, exported metadata, or MCP payload)
2. Match design elements to components in the target library (`packages/components` in the consumer app unless overridden)
3. Resolve all colors/spacing/type to **semantic tokens** from this repo’s JSON + spec — no literals
4. Generate code using matched components and exact spacing, typography, and copy from Pencil
5. Verify output against the spec

## Key Constraint
If a component exists in the target library that matches the design, use it **without modification**.
```

---

## 2. Rule (`.cursor/rules/pencil-component-matching.mdc`)

**Status:** 🔜 **Planned** — referenced by [`pencil-implementation.md`](.cursor/prompts/pencil-implementation.md); create when the team locks the component mapping table.

**Purpose:** Deterministic mapping from design elements to code components.

| Design Element | Component | Source |
|---|---|---|
| Metric with trend | `KpiCard` | `packages/components` |
| Button | `Button` | `packages/components` |
| Data table | `DataTable` | `packages/components` |
| Form input | `Input` | `packages/components` |

**Spacing, typography & color:**

- Resolve spacing, radius, fonts, and **semantic colors** via project tokens (Tailwind theme tied to [`01-foundational-tokens.json`](01-foundational-tokens.json), or CSS variables), not arbitrary `px` / hex.
- Match Pencil spacing and copy exactly (no approximations or paraphrasing).

---

## 3. Command (`.cursor/commands/pencil-to-code.json`)

**Status:** 🔜 **Planned** — wire up when your Cursor version supports project commands at this path.

**Purpose:** One-click execution in Cursor.

```json
{
  "name": "pencil-to-code",
  "description": "Convert Pencil.dev design to code",
  "steps": [
    {
      "prompt": "Fetch the Pencil.dev design spec for the current context. Identify which components from packages/components match the design elements. Generate implementation code with exact spacing, typography, content, and semantic tokens from the Pencil spec and Evergreen token files."
    }
  ]
}
```

**Usage (once configured):** type `/pencil-to-code` in Cursor chat.

---

## 4. Prompt (`.cursor/prompts/pencil-implementation.md`)

**Status:** ✅ **Present** — this is the active generation template.

**Purpose:** Template for code generation. It already requires:

- Inputs: `.pen` JSON / MCP payload, paths under [`01-foundational-tokens.json`](01-foundational-tokens.json), [`02-components-and-states.json`](02-components-and-states.json), [`design-tokens-spec.md`](.design-system/reference/design-tokens-spec.md), etc.
- **Tokens only** in output (no literal hex/rgba/`px` where a token exists).
- No edits to `.pen` from code generation (see `pencil-pen-file-editing.mdc`).
- Consumer components live in the **application repo**, not in `design-specs`.

Read the full file for non-negotiable rules and output format.

---

## Optional: Pencil canvas ↔ disk (`.cursor/rules/pencil-pen-file-editing.mdc`)

**Status:** ✅ **Present**

**Purpose:** Ensures edits to `.pen` files sync with the Pencil extension (Review workflow). Not part of the Skill chain above, but required whenever agents or developers edit library or screen `.pen` files from Cursor.

---

## Component Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                         SKILL (Orchestrator)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Calls → RULE (Decision Maker)                            │  │
│  │         "Which component should I use?"                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Triggers → COMMAND (Action Runner)                       │  │
│  │            `/pencil-to-code` execution                     │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Uses → PROMPT (Generation Template)                      │  │
│  │         "Generate code following these rules..."           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Output: React component with matched components + tokens │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Principles

| Principle | Application |
|-----------|-------------|
| **Component reuse** | Do not modify existing components in the consumer `packages/components` library; compose or wrap instead. |
| **Design fidelity** | Match Pencil spacing, typography, and **copy** exactly. |
| **Token consistency** | Use **semantic** design tokens from this repo’s JSON + [`design-tokens-spec.md`](.design-system/reference/design-tokens-spec.md); map to Tailwind/CSS variables in the app — **no hardcoded hex, rgb, or ad-hoc spacing** where a token exists. |
| **Naming** | Prefer tokens such as `accent.default`, `status.error-bg`, `destructive.hover` — aligned with Pencil variables and foundational JSON (not legacy `accent.primary` unless the codebase still aliases it). |
| **Single source for UI chrome** | Pencil library + synced JSON/spec are authoritative for Evergreen UI tokens; Figma or other tools are secondary unless explicitly adopted. |

---

## File Locations

```
.cursor/
├── skills/
│   └── pencil-handoff/
│       └── SKILL.md                    🔜 Skill (orchestration)
├── rules/
│   ├── pencil-component-matching.mdc   🔜 Rule (component ↔ design mapping)
│   └── pencil-pen-file-editing.mdc    ✅ Rule (how to edit .pen + variables)
├── commands/
│   └── pencil-to-code.json             🔜 Command (one-click)
└── prompts/
    └── pencil-implementation.md       ✅ Prompt (generation template)

design-specs repo root (token & spec artifacts — examples):
├── .design-system/gen-ui-design-system.lib.pen   ← Gen UI library (variables + components)
├── 01-foundational-tokens.json
├── 02-components-and-states.json
├── 03-spacing-and-shadows.json
├── 04-tables.json
├── 05-charts.json
└── .design-system/reference/design-tokens-spec.md
```

---

## Quick Reference

| Artifact | Role | Typical extension |
|---|---|---|
| **Skill** | Orchestrates workflow | `.md` under `skills/` |
| **Rule** | Decisions or guardrails | `.mdc` under `rules/` |
| **Command** | Runs a bundled action | `.json` under `commands/` |
| **Prompt** | Generation template | `.md` under `prompts/` |

---

## Revision notes

- **2026:** Document expanded for `design-specs`: dual workflow (token sync vs code handoff), `.pen` editing rule, chart branch, planned vs existing Cursor files, semantic token naming aligned with Pencil + foundational JSON.
