# Contextual Coherence

**Category:** Generative UI — Context  
**Layer:** Product Logic / AI Guardrails  
**Status:** Emerging law — generative UI specific

---

## Definition

Generated layouts, components, and content must be appropriate to the user's current emotional and situational context — not just technically correct or data-accurate. A generated UI that is factually right but contextually wrong is a product failure. Correct ≠ appropriate.

---

## Core Principle

Generative AI is good at producing technically valid output. It is not inherently good at understanding whether that output is *appropriate* for the moment it appears in.

A retirement calculator that generates a "You're on track — great work!" callout for a user who is 40% behind their savings goal is:
- Technically a valid component
- Correct in its structure and formatting
- Completely wrong for that user at that moment

Contextual coherence is the UX layer that catches this. It validates emotional and situational fit *before* output reaches the user.

This is a design responsibility, not a model responsibility. The model optimizes for output quality. The designer defines what "appropriate" means in this context, for this user, in this state.

---

## The Four Dimensions of Context

### 1. Emotional context
What is the user's likely emotional state given their data, history, and situation?

**Signals to design for:**
- User is behind on a goal
- User has experienced a recent loss or portfolio decline
- User is in a high-anxiety decision moment (market volatility, life event)
- User is in a positive/confident moment (strong returns, milestone reached)

**Rule:** Generated UI must never apply a positive frame to a negative situation, or vice versa.

### 2. Situational context
What is the user doing right now, and what do they need from this interaction?

**Signals to design for:**
- User is in exploration mode (browsing, comparing scenarios) vs. decision mode (ready to act)
- User is a first-time visitor vs. returning user with history
- User is responding to an alert vs. initiating a session
- User is on a specific task vs. open-ended session

**Rule:** Generated UI must match the mode the user is in — don't generate a decision-prompt UI when the user is in exploration mode.

### 3. Data context
What does the user's actual data say, and does the generated framing honor it?

**Signals to design for:**
- Portfolio performance (up/down, by how much, for how long)
- Goal progress (on track, behind, ahead)
- Account status (complete, incomplete, flagged)
- Time horizon (long runway vs. approaching target)

**Rule:** Data context drives framing. A user with a 30-year horizon and 10% behind gets a different frame than a user with a 2-year horizon and 10% behind.

### 4. Interaction history context
What has the user done in this session or prior sessions that should inform the current output?

**Signals to design for:**
- User has asked the same question multiple times (they may not be getting what they need)
- User has dismissed a recommendation before (don't regenerate it)
- User has expressed a preference (conservative vs. aggressive)
- User is in a follow-up interaction (acknowledge prior context, don't start from zero)

**Rule:** Generated UI should be aware of what came before it in the session. No cold-start behavior mid-conversation.

---

## The Contextual Coherence Validation Layer

Before any generated output reaches the user, it should pass through a validation layer that checks:

1. **Sentiment alignment** — does the tone of the output match the user's data context?
2. **Framing accuracy** — does the framing (positive/neutral/negative) match the actual situation?
3. **Mode match** — does the generated UI type match the interaction mode the user is in?
4. **History awareness** — does this output acknowledge or at least not contradict prior interactions?

This validation layer can be:
- **Rules-based:** explicit if/then logic defined in the design system (`.pencil/rules/context.md`)
- **Prompt-based:** context injected into every AI call that describes the user's current state
- **Hybrid:** rules-based for high-stakes checks, prompt-based for nuanced framing

---

## Contextual Coherence Rules (Evergreen Template)

```
## Contextual framing rules

### Goal progress framing
- User is on track (≥95% of goal): Use neutral-positive framing. Acknowledge progress, focus on next milestone.
- User is slightly behind (80–94% of goal): Use neutral framing. Focus on the gap as manageable. No alarm language.
- User is significantly behind (60–79% of goal): Use solution-oriented framing. Acknowledge gap plainly, lead with options.
- User is critically behind (<60% of goal): Use direct, matter-of-fact framing. No euphemisms. Lead with the most impactful action.

### Never use in negative contexts
- "Great work", "Congratulations", "You're doing great"
- Progress celebration UI (badges, confetti, milestone markers) 
- "On track" or "looking good" language

### Interaction mode detection
- If user is comparing scenarios: generate comparison UI, not recommendation UI
- If user is responding to an alert: acknowledge the alert first, then context
- If user is returning after >7 days: acknowledge the time gap, summarize what changed

### History awareness
- If a recommendation was dismissed in a prior session: do not regenerate it without new data
- If user expressed a risk preference: honor it in all subsequent generated scenarios
- If user is mid-task: continue the task, don't reset to a welcome/overview state
```

---

## Edge Cases to Design For

| Scenario | Coherent Response | Incoherent Response |
|---|---|---|
| User is 40% behind retirement goal | Matter-of-fact gap summary + top 3 actions | "You're making progress! Keep it up." callout |
| Market dropped 15% since last session | Acknowledge the change, show impact | Generate portfolio overview with no mention of the drop |
| User dismissed a scenario 3 times | Stop surfacing that scenario | Regenerate the same scenario again |
| User in comparison mode | Side-by-side scenario layout | Single recommendation card with "take action" CTA |
| User is a new account, no data yet | Onboarding-appropriate generation | Generate projection with blank/zero data |
| User just reached a milestone | Acknowledge it with appropriate warmth | Ignore it and generate the standard overview |

---

## Evergreen Application

- This law is the primary reason the `.pencil` folder's UX psychology documentation matters — it gives the AI the behavioral and emotional rules it needs to generate appropriate UI
- Financial context is uniquely high-stakes for coherence failures. A wrongly-framed projection for an HNW client is not just a UX issue — it's a trust and potentially a compliance issue.
- Define explicit contextual framing rules in `.pencil/rules/context.md` and inject them as system prompt context in every Evergreen Intelligence call
- The most common coherence failure at Evergreen: positive framing on negative data. Build an explicit rule that overrides model defaults for this case.
- Interaction history context should be passed to the model in every call — even a brief "user is returning after 14 days, portfolio down 8% since last visit" is enough to calibrate framing

---

## Related Laws

- **Consistent Voice** — voice rules must be applied within the emotional context defined here
- **Calibrated Trust** — coherence failures are the fastest way to destroy calibrated trust
- **Interpretability** — users who understand why an output was generated can better evaluate its contextual appropriateness
- **Graceful Degradation** — when context data is missing, the system must degrade to a neutral/safe frame, not a positive default

---

## Anti-Patterns

- Positive framing on negative user data
- Generating a "welcome back" overview when a user is mid-task
- Surfacing a previously-dismissed recommendation without new data
- Generating a decision-prompt UI when the user is in exploration mode
- Ignoring a significant data change (market drop, missed contribution) in the generated response
- Using the same framing template regardless of user goal progress
- No mechanism to pass user context (goal progress, interaction history) to the AI before generation
