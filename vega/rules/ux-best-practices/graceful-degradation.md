# Graceful Degradation

**Category:** Generative UI — Resilience (Inherited Law)  
**Layer:** Interaction / System Design  
**Status:** Inherited UX law — elevated to structural requirement in generative UI

---

## Definition

AI features must fail in ways that leave users able to act, understand what happened, and recover without assistance. In generative UI, degradation is not an edge case — it is a designed state with its own UX. Failure handling is a first-class design problem.

---

## Why This Becomes Structural in Generative UI

Traditional software fails in known, bounded ways — a form submission fails, an image doesn't load, a network request times out. These failures are predictable, testable, and finite.

Generative AI fails in novel ways:
- Output is technically returned but factually wrong
- Output is partially correct and partially hallucinated
- Output is correct but contextually inappropriate
- Output is correct but in the wrong format or tone
- The model times out or returns an empty response
- The model returns a confident-sounding output based on incomplete data

In all of these cases, the user may not know the AI has failed. There is no 404 for a bad projection, no error code for a mis-framed recommendation. This makes degradation design more critical — and more complex — than in traditional software.

**The core rule:** When an AI feature fails in any of the above ways, the user must always be able to:
1. Understand that something went wrong (or is limited)
2. Take a meaningful next action
3. Not be left with false confidence in bad output

---

## The Degradation Spectrum

Graceful degradation operates across a spectrum from partial limitation to full failure:

| Degradation Level | What's happening | Design response |
|---|---|---|
| **Limited** | AI working but with reduced data or confidence | Surface confidence level; flag missing data; show output with explicit caveats |
| **Partial** | AI returned output but it's incomplete | Show what was generated; clearly mark where output is truncated; offer retry |
| **Degraded** | AI returned output but it may be unreliable | Show output with explicit uncertainty; offer human escalation |
| **Failed** | AI returned no output or a clear error | Show a meaningful error state; offer fallback path; never show a blank canvas |
| **Unavailable** | AI feature is down or unreachable | Fall back to static/manual experience; be explicit that AI is unavailable |

---

## The Four Degradation Design Principles

### 1. Never show a blank canvas
The empty state and the error state are different things. An error state must always include:
- A plain-language explanation of what happened
- A specific next action the user can take
- A way to contact support or escalate if needed

A blank canvas — white space with no signal — is never acceptable as a failure state.

### 2. Preserve what exists
When generation fails mid-stream, preserve any partial output rather than replacing it with an error. A partial answer with a clear truncation marker is more useful than an error that wipes the canvas.

### 3. Fail to safety, not to silence
When the AI cannot produce confident output, it must say so — not fill the gap with a plausible-sounding estimate. A financial product that generates a confident-sounding projection based on assumed data is not degrading gracefully; it is degrading silently and dangerously.

"I don't have enough data to generate this projection. Connect your accounts or provide your portfolio details to continue." is graceful degradation.

A projection generated from assumed values with no disclosure is a trust failure.

### 4. Always provide a path forward
Every error and limitation state must include at least one actionable next step:
- Retry the request
- Modify the inputs and try again
- Fall back to a manual/static experience
- Contact a human advisor
- Learn more about what data is needed

---

## Degradation States to Design

### Error state
When the AI feature fails completely.

**Required elements:**
- Plain-language explanation (not a technical error code)
- What the user can do next (specific, not generic "try again")
- Escalation path if the action-oriented option fails

**Example:**
> "We weren't able to generate your retirement projection right now. This sometimes happens when market data is unavailable. You can try again in a moment, or reach out to your Evergreen advisor directly."

### Partial output state
When generation was interrupted or incomplete.

**Required elements:**
- Clear visual marker showing where output ends
- Explanation of what's missing and why
- Retry affordance that restores the full generation attempt

### Low-confidence state
When the AI has produced output but with reduced certainty.

**Required elements:**
- Confidence indicator on the output
- Explicit disclosure of what data was assumed or missing
- Invitation to provide better data for a more accurate result

### Unavailable state
When the AI feature is temporarily down.

**Required elements:**
- Honest, plain-language explanation
- Explicit timeline if known ("We're working on it — check back in a few minutes")
- Fallback to a manual or static experience if one exists
- No hiding or minimizing — don't pretend the feature is working in a degraded way

---

## Shell Behavior During Degradation

A critical principle: **shell layers must never degrade with the AI feature.**

When the generative canvas fails:
- Layer 1 (header, nav) remains unchanged
- Layer 2 (input bar, persistent controls) remains interactive
- Only the canvas zone shows the degradation state

This is why Output Anchoring is a prerequisite for Graceful Degradation — a stable shell is what allows the canvas to fail without the whole product feeling broken.

---

## Evergreen Application

- Financial AI that fails silently is not just a UX problem — it's a compliance risk. Every Evergreen Intelligence failure must be explicit, auditable, and honest.
- The most dangerous degradation failure at Evergreen: generating a projection based on assumed data with no disclosure. Build explicit rules that prevent this: "If portfolio data is incomplete, generate a limited-confidence state, not a full projection."
- Design a "limited data" state for Evergreen Intelligence that is explicitly different from the standard output state — different visual treatment, explicit data gap disclosure, and a CTA to connect accounts or provide missing information
- Human escalation paths are especially important for HNW clients. Every degradation state should include a way to reach an advisor — not as a fallback of last resort, but as a designed part of the experience.
- When Evergreen Intelligence is unavailable: surface a static version of key data (last known portfolio value, last generated projection) with a clear timestamp — better than a blank canvas.

---

## Related Laws

- **Output Anchoring** — shell stability is a prerequisite for graceful canvas degradation
- **Calibrated Trust** — graceful degradation is the ultimate trust calibration moment
- **Legible Generation** — the generation visibility spectrum includes failure states
- **Reversibility** — partial output recovery is a degradation concern
- **Contextual Coherence** — error framing must be contextually appropriate

---

## Anti-Patterns

- Blank canvas with no signal when AI fails
- Technical error codes shown to end users ("Error 503: upstream timeout")
- Silent failure — AI returns a plausible-looking output based on bad data with no disclosure
- Full-page error states that hide the shell entirely
- Generic "Something went wrong. Please try again." with no specific guidance
- Wiping partial output when generation fails mid-stream
- No escalation path — user is stuck with no way forward
- Pretending the AI feature is working when it's in a degraded state
- Using the same error state for "AI failed" and "you don't have enough data" — these are different problems and need different design responses
