# Generative UI Design Laws

A reference library of UX principles for designing AI-powered, generative UI products. Each file documents one law — its definition, core principle, design decisions, edge cases, and Evergreen-specific application.

---

## New Laws — Specific to Generative UI

These laws do not exist in traditional UX frameworks. They emerge specifically from the properties of generative AI interfaces.

| Law | File | Core concern |
|---|---|---|
| Output Anchoring | `output-anchoring.md` | Stable shell zones that AI never touches |
| Legible Generation | `legible-generation.md` | Making the generation process visible as a trust signal |
| Reversibility | `reversibility.md` | Undo, reset, and version awareness for dynamic content |
| Intentional Seams | `intentional-seams.md` | Affordances that show users where they can intervene |
| Consistent Voice | `consistent-voice.md` | Tone as a design token — enforced across all AI calls |
| Contextual Coherence | `contextual-coherence.md` | Correct ≠ appropriate — emotional and situational fit |

---

## Inherited Laws — Elevated to Structural Requirements

These laws existed in traditional UX but become structural requirements (not just principles) when designing generative UI.

| Law | File | Why it's now structural |
|---|---|---|
| Calibrated Trust | `calibrated-trust.md` | AI output is probabilistic — over/under-trust both cause harm |
| Interpretability | `interpretability.md` | AI causality is opaque by default — must be designed visible |
| Graceful Degradation | `graceful-degradation.md` | AI fails in novel, silent ways — failure is a designed state |

---

## How to Use These Files

Each file follows a consistent structure:

1. **Definition** — one-paragraph summary of the law
2. **Core principle** — why this matters in generative UI specifically
3. **Design decisions** — specific, actionable guidance
4. **Edge cases** — a table of scenarios and designed responses
5. **Evergreen application** — how this law applies to Evergreen AI/Intelligence
6. **Related laws** — cross-references
7. **Anti-patterns** — what to avoid

---

## Suggested Placement

These files are designed to live in the `.pencil` folder structure alongside the codebase:

```
.pencil/
  rules/
    generative-ui-laws/
      output-anchoring.md
      legible-generation.md
      reversibility.md
      intentional-seams.md
      consistent-voice.md
      contextual-coherence.md
      calibrated-trust.md
      interpretability.md
      graceful-degradation.md
      README.md          ← this file
```

These files are intended to be readable by both engineers and AI tools (Cursor, Claude, etc.) as shared product intelligence — not just design documentation.

---

## Dependency Map

Some laws are prerequisites for others. Build in this order:

```
Output Anchoring
  └── Graceful Degradation (requires stable shell)
      └── Legible Generation (failure states are part of generation visibility)

Calibrated Trust
  ├── Interpretability (primary mechanism for delivering trust)
  ├── Intentional Seams (edit affordances that support trust)
  └── Contextual Coherence (coherence failures break trust fastest)

Consistent Voice
  └── Contextual Coherence (voice must match emotional context)

Reversibility
  └── Intentional Seams (seams are where reversibility affordances live)
```
