# Interpretability

**Category:** Generative UI — Trust (Inherited Law)  
**Layer:** Content Design / Information Architecture  
**Status:** Inherited UX law — elevated to structural requirement in generative UI

---

## Definition

Users must be able to understand *why* an AI produced a given output, not just *what* it produced. Interpretability is the design of transparency into AI reasoning — made visible, contextual, and actionable.

---

## Why This Becomes Structural in Generative UI

In traditional UI, interpretability is implied — a search result appears because you searched for it, a filter result appears because you applied a filter. Causality is user-initiated and obvious.

In generative UI, causality is opaque. The AI produces output based on inputs, context, model weights, and prior conversation — none of which are visible to the user by default. This creates:

- **Confusion** when output doesn't match expectations ("Why is it showing me this?")
- **Over-trust** when output seems authoritative but is based on incomplete or assumed data
- **Inability to course-correct** when the user can't identify what to change to get a better output

Interpretability design closes this gap. It makes AI reasoning legible — not by exposing model internals, but by surfacing the *inputs, assumptions, and logic* that produced the output.

---

## The Three Interpretability Layers

### Layer 1 — Input provenance
What data did the AI use to produce this output?

This is the most fundamental interpretability signal. Every generated output should be able to answer: "This was generated using X."

**Patterns:**
- Inline provenance summary: "Based on your $2M portfolio, 7% assumed return, 20-year horizon"
- Expandable "how this was calculated" panel
- Highlighted or annotated inputs when they are critical to the output
- Clear flagging when key inputs were assumed rather than provided by the user

### Layer 2 — Reasoning transparency
How did the AI get from inputs to this specific output?

This layer is more complex — it requires surfacing the logic, not just the data. For non-technical users, this doesn't mean exposing model reasoning; it means explaining the step the AI took in plain language.

**Patterns:**
- One-sentence explanation accompanying each generated recommendation: "Shifting 10% to bonds reduces volatility by an estimated 15% at your time horizon."
- "Why this?" expandable panel on any generated recommendation or insight
- Scenario comparison that shows how different inputs produce different outputs (demonstrating reasoning by example)
- Surfacing the factor that had the most influence on the output: "Your retirement age assumption is the most sensitive variable in this projection."

### Layer 3 — Uncertainty disclosure
Where is the AI less confident, and where is it extrapolating?

This is the most trust-critical interpretability layer. It prevents over-trust by making the limits of AI knowledge visible.

**Patterns:**
- Confidence ranges instead of point estimates: "Your portfolio is projected to reach $4.2M–$5.8M by 2045, depending on market conditions"
- Explicit flagging of extrapolated values: "Return rate assumed at 7% — based on historical average"
- "Missing data" indicators when the AI is working with incomplete inputs
- "High uncertainty" labels on outputs that are speculative or highly variable

---

## Interpretability vs. Information Overload

Interpretability must be *available* without being *obtrusive*. Not every user wants to see the reasoning behind every output — and frontloading explanations for every generated element creates cognitive overload.

**The progressive disclosure model:**

| Level | What's shown | How |
|---|---|---|
| Default | Output only | Clean, scannable output with no explanation |
| On hover | Brief provenance | Tooltip or inline summary appears |
| On click/expand | Full reasoning | "Why this?" panel opens with full explanation |
| On request | Methodology | User asks "how was this calculated?" — AI explains in detail |

**Rule:** Interpretability information should always be one interaction away from the primary output. Never buried, never forced.

---

## Interpretability in Practice: Evergreen Examples

### Generated retirement projection
- **Default:** Chart showing projection range with a one-line provenance summary below
- **Hover:** "Based on your actual Evergreen portfolio + 7% assumed return"
- **Expand:** Full methodology panel — contribution assumptions, return assumptions, inflation adjustment, time horizon
- **On request:** "How was this calculated?" → full step-by-step explanation

### Generated portfolio recommendation
- **Default:** Recommendation card with the recommendation
- **Hover:** "Suggested because your equity allocation is 15% above your stated risk tolerance"
- **Expand:** "Why this recommendation?" → the reasoning, alternatives considered, and what would change the recommendation

### Generated scenario comparison
- **Default:** Side-by-side scenarios
- **Hover on a difference:** "This scenario assumes 8% return vs. 7% in the base scenario"
- **Expand:** Full input comparison panel

---

## Evergreen Application

- Interpretability is not a compliance feature for Evergreen — it's a product differentiator. Advisors who explain their reasoning retain clients. Evergreen Intelligence should do the same.
- The `.pencil/rules/` folder should include an `interpretability.md` that defines what provenance information is included in every AI call's system prompt — the model needs to know what it should be able to explain
- For HNW clients: "Why this?" is not an edge case. It's an expected question. Build the expandable reasoning panel as a first-class component, not an afterthought.
- Uncertainty disclosure is especially important for long-horizon projections (20–30 years). Never show a point estimate for a 30-year projection — always show a range, and always explain what variables drive the range.

---

## Related Laws

- **Calibrated Trust** — interpretability is the primary mechanism for delivering calibrated trust
- **Intentional Seams** — input provenance seams are the visual implementation of Layer 1 interpretability
- **Contextual Coherence** — interpretability information must be contextually appropriate (don't explain positive scenarios with apologetic language)
- **Consistent Voice** — explanations and provenance text follow voice constraints

---

## Anti-Patterns

- Point estimates on long-horizon projections with no uncertainty range
- "AI recommended" with no explanation of why
- Provenance buried in a tooltip that only power users discover
- "How this works" documentation that lives in a help center, not in the product
- Hiding assumed values — presenting extrapolated data as if it were user-provided
- Explaining the methodology in technical terms the user doesn't understand
- No way for the user to ask "why?" within the interface itself
- Uncertainty disclosure that reads as a disclaimer rather than a transparency feature
