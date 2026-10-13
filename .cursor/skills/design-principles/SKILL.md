---
name: design-principles
description: Apply Gestalt principles and the Laws of UX when designing or reviewing Evergreen interfaces. Use when generating layouts, components, or screens, when auditing a design for grouping, hierarchy, affordance, or cognitive-load problems, or when deciding how a generated UI component should be structured.
---

# Design Principles — Gestalt & the Laws of UX

## Skill Type: Reasoning

Apply these as constraints, not suggestions. The brand standards in the non-negotiables section are rigid — never soften those.

**Related:** `.cursor/rules/gen-ui-design-laws/` covers AI-specific laws (trust, legibility, reversibility, failure states). This skill covers the classical layer underneath. `.cursor/rules/hemlock-design-system.mdc` covers tokens and components.

---

The timeless layer. Tokens change, components get renamed, frameworks get replaced — these do not. Use this skill as the reasoning substrate underneath any Evergreen design work.

## Two modes

**Generate mode** — you are producing a layout, component, screen, or generated-UI response. Apply Part 1 and Part 2 as constraints *while building*, not as a review afterward. Every grouping decision, every emphasis decision, every target size is a principle decision whether or not it is made consciously.

**Critique mode** — you are reviewing an existing design. Walk Part 4's audit sequence in order. Name the principle by name in every finding; "this feels cluttered" is not a finding, "proximity is ambiguous — the 16px gap inside the card equals the 16px gap between cards, so the eye cannot tell where one group ends" is.

In both modes: **a principle is only useful if it produces a number, a rule, or a specific change.** Never restate a law without saying what it forces you to do.

---

## Part 1 — Gestalt: how the eye groups before the brain reads

Gestalt governs what users perceive as *belonging together*. It fires pre-attentively, in milliseconds, before any label is read. Getting grouping wrong means the user must consciously undo your layout to understand the data — which in a financial product reads as distrust.

**Proximity** — elements close together are one group.
- Rule: the gap *inside* a group must be at most half the gap *between* groups. Aim for 1:2 minimum, 1:3 when there is no other separator.
- Evergreen: an account row's balance, label, and change indicator are one cluster; the gap to the next account must visibly exceed it. If you find yourself adding a divider to clarify grouping, the spacing ratio is wrong — fix the spacing first.
- Failure signature: uniform spacing everywhere. Uniform spacing communicates nothing.

**Common region** — a shared container beats proximity, every time.
- Rule: a card, a filled background, or a border creates a group even when spacing contradicts it. Because it is the strongest cue, it is also the easiest to overuse.
- Rule: use exactly one grouping mechanism per boundary. Card + border + divider + extra gap is four cues doing one job; pick the card.
- Evergreen: cards carry Hemlock radius (never 0px) and a taupe or neutral surface. Nested cards are almost always a hierarchy problem — flatten to one level and use spacing for the inner groups.

**Similarity** — elements sharing a visual property are read as the same kind of thing.
- Rule: one visual variable carries one meaning across the whole surface. If weight signals hierarchy, weight cannot also signal state. If color signals category, color cannot also signal positive/negative.
- Evergreen: this is why the categorical chart palette contains no true green — green is reserved for the gain semantic, and a category that happens to be green would be read as "positive" by similarity alone.
- Failure signature: two things that look alike behave differently, or two things that behave alike look different.

**Continuity** — the eye follows lines and continues along paths.
- Rule: every element in a column shares one left edge. A broken alignment axis costs more legibility than it buys emphasis.
- Evergreen: numerals right-align and use tabular figures so the decimal forms a continuous vertical line. This is non-negotiable in tables — a ragged decimal column is unscannable.

**Closure** — the mind completes incomplete shapes.
- Rule: you can imply a container with three sides, a partial border, or aligned corners. Cheaper than a full card, and it reduces visual noise on dense screens.
- Use for: chart plot areas, table groupings, segmented controls.

**Figure/ground** — one layer must read as foreground.
- Rule: elevation, contrast, or saturation — pick one and commit. Ambiguous figure/ground is the single most common cause of "this looks flat and confusing."
- Evergreen: the warm taupe/gray palette is low-contrast by design, so figure/ground has to be carried deliberately by surface elevation and the gray-900 primary. Do not assume contrast will happen on its own.

**Common fate** — things that move together are one group.
- Rule: elements that animate on the same curve and timing are perceived as a unit. Staggered animation *breaks* grouping — use it to separate, not decorate.
- Evergreen: during a long-running AI operation, every affordance that resolves together (approve/cancel/abort) must transition together or the user will not understand they were one decision.

**Prägnanz (simplicity)** — the eye resolves toward the simplest interpretation available.
- Rule: if a layout has an ambiguous reading, users take the simplest one, not the intended one. When you catch yourself explaining a layout, the layout has lost.

---

## Part 2 — Laws of UX: how attention and effort behave

**Fitts's Law** — acquisition time scales with distance and inversely with target size.
- Touch targets ≥ 44×44px; pointer targets ≥ 32×32px. Padding counts; the visible glyph does not.
- Primary actions go where the thumb already is. Destructive actions go far from primary ones — physical distance is a real safety mechanism.
- Screen edges and corners are effectively infinite targets. Use them for persistent chrome.
- Evergreen: pill buttons have generous horizontal padding, which enlarges the target for free. Do not shrink pill padding to fit a layout — change the layout.

**Hick's Law** — decision time scales with the number and complexity of choices.
- Cap simultaneous choices at 5–7. Beyond that, group, stage, or default.
- A sensible pre-selected default removes a decision entirely — the cheapest UX win available.
- Evergreen: the 9-account-type nav is over the limit by design, which is exactly why the segmented-control / underline-tab work matters. Grouping and scroll affordance carry the load that raw choice count cannot.

**Miller's Law** — working memory holds roughly 4–7 chunks.
- Chunk anything long: account numbers, routing numbers, dates, large currency figures.
- Never make a user hold a value from one screen to compare on another. Bring the comparison to them.

**Jakob's Law** — users expect your product to work like the other products they use.
- Follow financial-product convention unless you have a specific reason not to: negatives in parentheses or with a minus, currency symbol leading, right-aligned numerals, newest-first transactions, date ranges left-to-right.
- Deviating from convention is a budget. Spend it on the one thing that is genuinely differentiated, and be conventional everywhere else.

**Tesler's Law (conservation of complexity)** — every system has irreducible complexity; the only question is who absorbs it.
- Rule: name explicitly who eats the complexity in any simplification — the user, the designer, or the engineer. "We simplified it" with no answer means it was pushed onto the user.
- Evergreen: tax-lot handling, account-type rules, and contribution limits are irreducibly complex. The design job is to move that complexity into defaults, progressive disclosure, and AI explanation — not to hide it and let it surface as an error later.

**Von Restorff (isolation effect)** — the thing that differs is the thing that is remembered.
- Rule: exactly one emphasized element per view. Two primary buttons means zero primary buttons.
- Evergreen: gray-900 pill = the single primary action. If a screen needs two, one of them is secondary — decide which.

**Serial position effect** — first and last items are recalled best.
- Put the most important item first and the action last. The middle of a long list is where things go to be ignored.

**Aesthetic-usability effect** — polished interfaces are perceived as more usable, and users forgive their flaws.
- In a financial product this is a trust mechanism, not vanity. Misaligned edges and inconsistent radii read as "this company is careless with my money."
- Corollary and warning: polish masks usability problems in testing. Never take "it looks good" as evidence that it works.

**Doherty threshold** — interaction stays fluid below ~400ms.
- Under 400ms: no loading state at all. 400ms–2s: skeleton matching final layout. Over 2s: progress with an indication of what is happening.
- Skeletons, not spinners. A skeleton reserves layout and prevents the shift that breaks proximity and continuity mid-render.

**Zeigarnik effect** — incomplete tasks stay in memory.
- Show progress on multi-step flows. A visible incomplete state pulls users back; an invisible one just gets abandoned.

**Goal-gradient effect** — motivation increases with visible proximity to the goal.
- Front-load progress. A funding or onboarding flow that starts at "1 of 6" with step one already complete finishes at a higher rate than one that starts at zero.

**Postel's Law** — be liberal in what you accept, conservative in what you emit.
- Inputs accept `$1,200`, `1200`, `1,200.00`. Normalize silently. Never reject a value the user clearly meant.

**Peak-end rule** — experiences are judged by their most intense moment and their ending.
- Design the confirmation, not just the form. The end of a funding flow or a completed AI action is disproportionately what the user remembers.

---

## Part 3 — Where these laws relocate in generative UI

> **This section is deliberately short.** The generative-UI doctrine lives in `.cursor/rules/gen-ui-design-laws/` — output anchoring, legible generation, reversibility, intentional seams, consistent voice, contextual coherence, calibrated trust, interpretability, graceful degradation. Read those for anything about AI behavior, trust, or failure states. What follows is only the part that is specifically about *these* classical laws changing enforcement point.

In the generated canvas you are not placing elements, you are writing the constraints that decide placement. The laws still hold; they just stop being things a designer applies by eye.

**Grouping becomes a component contract, not a spacing decision.** An agent cannot eyeball a 1:2 ratio. Proximity and common region must be structural: each component owns its own container and internal spacing, and composition happens by stacking components — never by an agent choosing arbitrary gaps. If a generation can get grouping wrong, the schema is underspecified.

**Hick's Law applies to the component library itself.** Too many near-identical components makes intent routing unreliable. Fewer, more semantically distinct components beat a large library with overlapping meanings — this is a Hick problem aimed at the model, not the user.

**Von Restorff must be enforced by the intent map.** A response can easily emit three components each claiming primary emphasis. "Exactly one emphasized element" has to live in the generation constraints, not in a designer's review.

**Doherty becomes a layout-stability problem.** Reserve space before content arrives. A component that pops in and reflows destroys the grouping the user was mid-way through reading — worse than a slower render that stays stable.

**Aesthetic-usability carries extra weight.** A slightly-off generated component does not read as a rendering bug — it reads as *the AI got the answer wrong*. See `calibrated-trust.md`.

For stable shell zones see `output-anchoring.md`; for same-input-same-output consistency see `contextual-coherence.md` and `consistent-voice.md`.

---

## Part 4 — Critique sequence

Run in this order. Early steps constrain later ones; do not jump to polish.

1. **Squint / 2-second pass** — what is seen first? Is that the intended priority? (Figure/ground, Von Restorff)
2. **Grouping pass** — cover the labels. Do the visual groups still match the logical groups? (Proximity, common region, similarity)
3. **Alignment pass** — how many distinct left edges exist? Can any be eliminated? (Continuity)
4. **Decision pass** — count choices at each decision point. Count required steps. (Hick, Tesler)
5. **Target pass** — measure interactive elements. Check distance between primary and destructive. (Fitts)
6. **Convention pass** — where does this depart from financial-product norms, and was that departure earned? (Jakob)
7. **State pass** — loading, empty, error, one item, many items, longest realistic string, largest realistic number. (Doherty, Postel)
8. **System pass** — hardcoded values, off-token spacing, non-Hemlock radii or colors.

Output findings as: **principle violated → specific observation → concrete fix → severity**. Severity is 🔴 breaks comprehension or blocks the task, 🟡 adds friction, 🟢 polish. Always include what already works — a critique with no positives is not calibrated.

---

## Evergreen non-negotiables

These are brand standards, not judgment calls. Violating one is always a 🔴 finding.

- **Radius**: rounded throughout; buttons are pill-shaped (full radius). No 0px corners anywhere.
- **Type**: Noto Serif for headings and display; Heebo for body and UI.
- **Color**: warm taupe and gray neutrals; gray-900 (`#0E0E0E`) is the primary action color.
- **Charts**: 15-color categorical palette, no true green in it (green belongs to the gain semantic). Sequential blue ramp for area charts. Performance charts are not colored by direction; discrete gain/loss values keep their existing semantic red and green.
- **Tokens**: use Hemlock tokens. Never hardcode a hex value, spacing value, or radius.
- **Tone**: formal, appropriate to a premium financial audience.

## Anti-patterns

- Naming a principle without producing a change from it.
- Adding a divider to fix grouping that spacing should have fixed.
- Two primary actions on one view.
- Uniform spacing used as a substitute for a grouping decision.
- Nested cards standing in for information hierarchy.
- Justifying a convention break with "it's more modern."
- Reviewing only the happy path — empty, error, and overflow states are where principles actually fail.
