# Calibrated Trust

**Category:** Generative UI — Trust (Inherited Law)  
**Layer:** Interaction / Content Design  
**Status:** Inherited UX law — elevated to structural requirement in generative UI

---

## Definition

Design must actively help users develop an accurate level of trust in AI-generated output — neither over-trusting (accepting everything uncritically) nor under-trusting (ignoring or distrusting all AI output). Calibrated trust is not a passive outcome of good design; it is a designed behavior.

---

## Why This Becomes Structural in Generative UI

In traditional UI, trust is implicit — a button does what it says, a form submits correctly, a table shows accurate data. Trust is earned by reliability, which is binary.

In generative UI, trust is calibrated — AI output is probabilistic, context-dependent, and sometimes wrong. Users must learn to evaluate AI output, not just receive it. This is a new cognitive task that the design must actively support.

**The two failure modes:**

**Over-trust:** User accepts AI output without evaluation. They don't ask how the projection was made, don't notice when a scenario assumes unrealistic returns, don't question a recommendation that doesn't fit their situation. This is dangerous in high-stakes domains (finance, health, legal).

**Under-trust:** User ignores AI output entirely, or interacts with it defensively. The product fails to provide value. Users may disengage or develop learned helplessness with AI features.

Calibrated trust sits between these — the user uses AI output as a starting point, evaluates it with their own judgment, and knows how to verify or push back.

---

## The Four Trust Calibration Signals

### 1. Confidence transparency
The AI should signal its own certainty level. Not every output is equally reliable, and design should make this visible.

**Patterns:**
- Confidence indicators on projections: "Based on historical data" vs. "Estimated — limited data available"
- Distinction between data-derived outputs and model-generated estimates
- Clear labeling when the AI is extrapolating beyond the user's actual data

### 2. Source and provenance visibility
Users trust output more — and more appropriately — when they can see what it's based on.

**Patterns:**
- "Based on your $2M portfolio, 7% assumed return, 20-year horizon"
- Footnotes or expandable provenance panels on generated projections
- Flagging when key inputs are missing or assumed

### 3. Edit and override affordances
Trust is calibrated when users feel in control. If they can change inputs, regenerate, or override, they engage more critically — and more productively.

**Patterns:**
- Visible edit affordances on every generated output (see: Intentional Seams)
- "What if I changed this?" as a first-class interaction pattern
- User overrides saved and honored in future generations

### 4. Error and uncertainty transparency
How a product handles failure is the ultimate trust signal. AI that fails gracefully and honestly earns more calibrated trust than AI that never visibly fails.

**Patterns:**
- Clear distinction between "I don't know" and "I got an error"
- Partial output with explicit uncertainty rather than a confident-sounding hallucination
- Error messages that explain what happened and what the user can do

---

## Trust Calibration by User Segment

Different users need different calibration support:

| User Type | Trust Risk | Design Response |
|---|---|---|
| First-time AI user | Over-trust — no prior AI experience to calibrate against | More explicit confidence signals, more prominent provenance, slower introduction of AI features |
| Skeptical / experienced user | Under-trust — may dismiss AI output | Lead with data provenance, offer high-detail expandable context, show track record |
| Expert user | Selective trust — trusts output in known domains, skeptical elsewhere | Allow expert to define trust parameters, expose methodology |
| HNW client (Evergreen) | High-stakes over-trust risk — financial decisions have major consequences | Persistent confidence signals, provenance always visible, explicit "verify with your advisor" affordances |

---

## Designing Against Over-Trust Specifically

In high-stakes generative products, over-trust is the more dangerous failure mode. Design interventions:

- **Never present AI output as definitive.** Use framing that invites evaluation: "Based on your inputs, one scenario to consider is..." rather than "Here is your retirement plan."
- **Surface uncertainty when it exists.** If the AI is extrapolating, say so. If data is incomplete, say so.
- **Build in friction for consequential actions.** If a user is about to take a significant action based on AI output, a confirmation step that re-states the basis of the AI's recommendation is appropriate.
- **Make the human advisor visible.** In a wealth management context, the AI is a tool, not a replacement. Design should keep the human relationship visible and accessible.

---

## Evergreen Application

- HNW clients are the highest-stakes over-trust segment — they make consequential financial decisions, often without deep technical literacy in AI
- Every generated financial projection should include visible provenance: what data it used, what it assumed, where it extrapolated
- "This projection is based on historical market performance and your stated inputs. Actual results will vary." is not a legal disclaimer — it's a trust calibration signal. Design it that way (readable, in context, not buried).
- The Evergreen Intelligence interface should include a persistent "verify with your advisor" affordance — not as a disclaimer, but as a designed behavior that reinforces the human-AI relationship
- When Evergreen Intelligence cannot produce a confident output (missing data, ambiguous inputs), it should say so explicitly — not fill the gap with a plausible-sounding estimate

---

## Related Laws

- **Interpretability** — interpretability is the mechanism for delivering confidence transparency
- **Intentional Seams** — seams deliver the edit/override affordances that support calibrated trust
- **Contextual Coherence** — coherence failures are the fastest way to break calibrated trust
- **Legible Generation** — showing the generation process is a trust-building signal
- **Graceful Degradation** — failure handling is the ultimate trust calibration moment

---

## Anti-Patterns

- Presenting AI projections as definitive ("Your retirement will fund until age 87")
- No visible indication of what data the AI used or assumed
- Hiding or minimizing confidence levels ("We think you're on track" when the model is extrapolating heavily)
- No way for the user to challenge, edit, or override an AI output
- Error messages that fail silently or deliver a generic fallback without explanation
- Designing AI features to feel like a black box — inputs go in, answers come out, nothing in between is visible
- Conflating "AI recommended" with "correct" in the UI hierarchy
