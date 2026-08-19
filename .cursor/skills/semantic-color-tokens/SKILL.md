---
name: semantic-color-tokens
description: "Use when setting, changing, reviewing, or copying any fill, stroke, or text color in a .pen file, Hemlock component, OpenUI library, or design-system token — including hex, rgb, or `$color-*` primitive bindings."
---

# Semantic Color Tokens

## Skill Type: Rigid

Follow this exactly. Do not adapt, skip, or soften.

## The Iron Law

**NEVER BIND A DESIGN COLOR TO A PRIMITIVE OR A RAW VALUE.**

Light and dark themes switch in the semantic layer. A fill on `$color-gray-700` or `#403D3A` is stuck in light-mode paint and will not theme.

**Violating the letter of the rules is violating the spirit of the rules.** Binding `$color-blue-600` because "it looks like the action color" is the same as hardcoding hex.

## Three tiers (Hemlock)

| Tier | Pattern | Example | Allowed on components? |
|------|---------|---------|------------------------|
| **T1 Primitive** | `$color-{palette}-{step}` (singular `color-`) | `$color-blue-600`, `$color-gray-700`, `$color-taupe-100` | **No** |
| **T2 Semantic** | `$colors-{category}-{role}` (plural `colors-`) | `$colors-text-body`, `$colors-background-surface`, `$colors-borders-error` | **Yes — default** |
| **T3 Component** | `$colors-{component}{Role}{State}` | `$colors-btnPrimaryBg`, `$colors-tagText` | **Yes — only if that component already has T3** |

T1 is static paint. It has no light/dark pair. T2 is where the theme lives: the same role points at different primitives per mode. T3 is a named alias for a stateful component, also a light/dark pair.

Canonical write-up: `pencil/design-system/in-progress/token-guide-t1-t2-t3.md`.

## Before every color bind

1. Name the **role**, not the hue: body text, surface, error border, action icon, chart series 1.
2. Bind a **T2** token that matches that role. Use **T3** only when this component already owns independent state tokens.
3. If no T2/T3 exists: **create a semantic token** (light **and** dark values, named by purpose) and bind that. Do not fall through to a primitive.
4. If the role is unclear: **ask**. Do not pick the primitive that matches light-mode appearance.

Reference direction is one way:

```
component → T3 → T2 → T1
```

Never skip to T1 from a component.

## Forbidden

- Raw hex / rgb / rgba (`#3A6AF8`, `255 255 255`)
- Primitive refs: `$color-blue-600`, `$color-gray-700`, `$color-red-500`, `$color-navy-app`
- Picking a semantic by "it looks like this gray in light mode"
- Theming primitives (making `color-gray-100` mean navy in dark)
- Local tokens that alias a primitive to skip the semantic layer

## Allowed

- T2 role tokens on fills, strokes, and text
- T3 component tokens on the component they belong to
- **Defining** T1 primitives inside `hemlock-library.lib.pen` (the paint cans themselves). Consuming them on a component or screen is still forbidden.
- Raster images / photographs (not tokenizable)

## Red Flags — STOP Immediately

If you catch yourself thinking ANY of these, you are rationalizing:

- "It's a token, so it's fine" (`$color-blue-600` is a token — and still a primitive)
- "It looks the same in light mode"
- "There's no semantic for this, I'll just use the primitive"
- "It's only a mockup / restyle / before-after"
- "I'll wrap the primitive in a local variable"
- "Dark mode isn't in scope for this file"

**ALL of these mean: STOP. Bind a T2/T3 role, or create one. Do not use the primitive.**

## Rationalization Prevention

| Excuse | Reality |
|--------|---------|
| "It's a token" | Only T2/T3 tokens theme. T1 is paint. Check the name: singular `color-` + hue + step = primitive. |
| "Looks the same in light" | Dark mode remaps the **role**. A gray-700 body in light is not gray-700 in dark. |
| "No semantic exists" | Create `colors-{category}-{role}` with light **and** dark now. That is how `background-rowHover` was born. |
| "Just a mockup" | A hex in a mockup is the first theme bug. Bind the role from the start. |
| "Local alias to a primitive" | That alias still will not switch with the theme. Alias T2, or mint a new T2. |
| "This file isn't themed yet" | Bind roles anyway. Theme adoption is swapping T2 values, not rewiring every fill. |

## Self-test

**If a third theme lands tomorrow, how many places do we edit?** The only correct answer is one layer — T2.
