# Consistent Voice

**Category:** Generative UI — Consistency  
**Layer:** Content Design / Design System  
**Status:** Emerging law — generative UI specific

---

## Definition

AI-generated UI that includes text — labels, descriptions, CTAs, explanations, callouts — risks producing different registers, tones, and personalities across calls. Voice consistency must be defined as a design system constraint, not left to the model. Tone is a design token.

---

## Core Principle

Traditional design systems govern visual consistency: color, type, spacing, component behavior. But in generative UI, the model is generating *content* — and content has voice. Two AI calls to the same endpoint can produce:

- "Your portfolio grew 12% this quarter."
- "Portfolio performance: +12% (Q3)"
- "Great news — you're up 12%!"

All three are technically correct. All three would feel like different products. None of them may match your actual brand voice.

This is a design system failure, not a model failure. The model has no brand loyalty — it defaults to whatever register fits the prompt. Voice constraints are the designer's responsibility to define and enforce.

---

## Voice as a Design Token

Voice tokens operate at the same level as visual tokens. They define:

| Token Type | Visual Equivalent | Voice Equivalent |
|---|---|---|
| Primary color | `--color-brand-primary` | Tone register (formal / conversational / expert) |
| Type scale | `--font-size-lg` | Sentence length range |
| Border radius | `--border-radius-md` | Punctuation style (em dashes vs. commas, etc.) |
| Spacing unit | `--spacing-4` | Information density (concise vs. explanatory) |
| Error color | `--color-danger` | Error message frame (apologetic / matter-of-fact / guiding) |

---

## The Four Voice Dimensions to Define

### 1. Register
The overall formality level. Must be explicitly defined and stable across all AI calls.

**Options:**
- **Expert peer** — knowledgeable, precise, assumes financial literacy (suitable for HNW clients)
- **Trusted advisor** — warm, clear, explains without condescending
- **Clinical/neutral** — data-forward, minimal personality, maximum precision

**Evergreen recommendation:** Expert peer with trusted advisor warmth. Never clinical. Never casual.

### 2. Framing
How the AI contextualizes positive, negative, and neutral data.

Define explicitly:
- How to frame underperformance (matter-of-fact, not alarming; solution-oriented)
- How to frame outperformance (confident acknowledgment, not celebratory)
- How to frame uncertainty (transparent about limits, not evasive)

### 3. Density
How much explanation accompanies a piece of data or recommendation.

Define a default and context-specific overrides:
- **Default:** One-sentence explanation with the data point
- **On request:** Expanded explanation with methodology
- **In alerts/callouts:** Single line only — no explanation inline

### 4. Sentence structure
Defines the grammatical and syntactic patterns the AI defaults to.

**Define:**
- Active vs. passive voice (always active for Evergreen)
- Whether numbers are written as numerals or words (always numerals for financial data)
- CTA phrasing patterns ("View your projection" not "Click here to see")
- Whether AI refers to the user in second person ("your portfolio") or third ("the portfolio")

---

## Implementation: Voice Constraints in Prompts

Voice tokens are implemented as system prompt constraints passed to every AI call that generates visible text. They should be:

1. **Explicit, not implied** — "Use second person ('your portfolio')" not "be friendly"
2. **Negative as well as positive** — "Do not use exclamation marks. Do not use 'great news' or 'congratulations'."
3. **Example-anchored** — provide one correct and one incorrect example for each constraint
4. **Testable** — each constraint should be verifiable by reading the output

### Example voice constraint block (for `.pencil/rules/voice.md`):

```
## Evergreen voice constraints

Register: Expert peer. Knowledgeable and precise. Assumes the reader is financially literate.

Never use:
- Exclamation marks
- "Great news", "Congratulations", "Amazing", "Exciting"
- Passive voice ("the portfolio was affected by...")
- Vague hedges ("it seems like", "you might want to consider maybe")

Always use:
- Second person: "your portfolio", "your projection"
- Numerals for all financial figures: 12%, $2M, 3.4x
- Active voice: "Your portfolio grew 12%"
- Present tense for current data: "Your allocation is..."
- Conditional framing for projections: "At this rate, your portfolio reaches..."

Error framing: Matter-of-fact, solution-oriented. 
  Correct: "This projection requires at least one active account. Connect an account to continue."
  Incorrect: "Oops! We couldn't load your projection. Please try again."

Density default: One sentence of context per data point. No inline methodology unless the user asks.
```

---

## Voice Drift: What to Watch For

Voice drift occurs when:
- Multiple AI calls in a session produce noticeably different registers
- AI-generated labels conflict with hardcoded copy in the shell
- Error messages use a different tone than success messages
- Short-form generated text (labels, badges) is clipped from longer-form generation and loses context

**Monitoring:**
- Include generated text in design QA as a first-class review item alongside visual QA
- Define a "voice review" step in the design-to-development handoff
- The `.pencil` voice rules file should be referenced in every AI call that produces visible text

---

## Evergreen Application

- Voice constraints belong in `.pencil/rules/voice.md` and should be passed as system prompt context to every Evergreen Intelligence API call
- The Evergreen Intelligence chat interface, generated insights, projection callouts, and alert messages all share one voice — define it once
- HNW clients are particularly sensitive to tone drift — they've worked with advisors who have consistent voices. AI that shifts register feels unreliable.
- Generated chart labels, axis labels, and data callouts are part of voice — they should follow the same density and register rules as paragraph text

---

## Related Laws

- **Contextual Coherence** — voice must match emotional context, not just brand guidelines
- **Intentional Seams** — generated text within seam affordances (labels, tooltips) follows voice rules
- **Calibrated Trust** — consistent voice is a primary trust signal
- **Interpretability** — provenance and explanation text follows voice constraints

---

## Anti-Patterns

- Different tone in error messages vs. success messages
- AI-generated copy that conflicts with hardcoded shell copy
- Exclamation marks or casual language in a professional financial context
- "Clinical" data dumps with no warmth in a product that positions itself as an advisor
- Generated text that switches between second and third person in the same response
- CTA copy that varies ("View details" / "See more" / "Click to expand") for the same action across generated components
- Voice constraints defined in a Notion doc but not enforced in system prompts
