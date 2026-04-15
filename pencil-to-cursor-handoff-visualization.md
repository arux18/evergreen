# Pencil.dev → Cursor Handoff: Visual Reference

## Overview

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

---

## 1. Skill (`.cursor/skills/pencil-handoff/SKILL.md`)

**Purpose:** Orchestrates the full handoff workflow

```yaml
---
name: Pencil Handoff
description: Convert Pencil.dev designs to implementation code
---

## When to Use
When a design from Pencil.dev needs to become working code in Cursor.

## Steps
1. Fetch design spec from Pencil.dev (JSON/metadata export)
2. Match design elements to available components in `packages/components`
3. Generate code using matched components and exact design tokens
4. Verify output matches the Pencil spec for spacing, typography, and content

## Key Constraint
If a component exists in `packages/components` that matches the design, 
use it without modification.
```

---

## 2. Rule (`.cursor/rules/pencil-component-matching.mdc`)

**Purpose:** Deterministic mapping from design elements to code components

| Design Element | Component | Source |
|---|---|---|
| Metric with trend | `KpiCard` | `packages/components` |
| Button | `Button` | `packages/components` |
| Data table | `DataTable` | `packages/components` |
| Form input | `Input` | `packages/components` |

**Spacing & Typography:**
- ✅ Use Tailwind design tokens from `tailwind.config.js`
- ✅ Match Pencil spacing exactly (no approximations)
- ✅ Use text exactly as specified in the Pencil design

---

## 3. Command (`.cursor/commands/pencil-to-code.json`)

**Purpose:** One-click execution in Cursor

```json
{
  "name": "pencil-to-code",
  "description": "Convert Pencil.dev design to code",
  "steps": [
    {
      "prompt": "Fetch the Pencil.dev design spec for the current context. 
                 Identify which components from packages/components match 
                 the design elements. Generate implementation code with exact 
                 spacing, typography, and content from the Pencil spec."
    }
  ]
}
```

**Usage:** Type `/pencil-to-code` in Cursor chat

---

## 4. Prompt (`.cursor/prompts/pencil-implementation.md`)

**Purpose:** Template for code generation

```markdown
---
name: Pencil Implementation
description: Generate code from Pencil.dev design spec
---

You are implementing a Pencil.dev design in code.

## Input
- Pencil.dev design spec (JSON/metadata)
- Available components in `packages/components`

## Rules
1. Check `packages/components` first — if a component matches, use it unchanged
2. Apply spacing and typography exactly per the Pencil spec
3. Use Tailwind design tokens for colors, fonts, and spacing
4. Keep text content exactly as shown in the Pencil design

## Output
- Single React component file
- TypeScript types
- Tailwind classes only
```

---

## Component Relationships

```
┌─────────────────────────────────────────────────────────────────┐
│                         SKILL (Orchestrator)                    │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Calls → RULE (Decision Maker)                            │  │
│  │         "Which component should I use?"                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Triggers → COMMAND (Action Runner)                        │  │
│  │            `/pencil-to-code` execution                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Uses → PROMPT (Generation Template)                       │  │
│  │         "Generate code following these rules..."         │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                  │
│                              ▼                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Output: React component with matched components           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Key Principles

| Principle | Application |
|-----------|-------------|
| **Component Reuse** | Never modify existing `packages/components` components |
| **Design Fidelity** | Match Pencil spacing, typography, and text exactly |
| **Token Consistency** | Use Tailwind config tokens, not hardcoded values |
| **Single Source** | Pencil.dev is the design authority, not Figma or other tools |

---

## File Locations

```
.cursor/
├── skills/
│   └── pencil-handoff/
│       └── SKILL.md                    ← Skill (orchestration)
├── rules/
│   └── pencil-component-matching.mdc   ← Rule (decision logic)
├── commands/
│   └── pencil-to-code.json             ← Command (one-click action)
└── prompts/
    └── pencil-implementation.md        ← Prompt (generation template)
```

---

## Quick Reference

| Component | Role | File Extension |
|---|---|---|
| **Skill** | Orchestrates workflow | `.md` in `skills/` folder |
| **Rule** | Makes component decisions | `.mdc` in `rules/` folder |
| **Command** | Executes the handoff | `.json` in `commands/` folder |
| **Prompt** | Generates code from template | `.md` in `prompts/` folder |
