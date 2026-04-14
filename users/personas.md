# User Personas — Personal Finance Generative UI

## Persona 1: The Anxious Checker — "Sarah"
**Frequency**: Daily, sometimes multiple times/day
**Primary goal**: "Am I okay?"
**Behavior**: Opens app, checks portfolio total, checks today's change, closes app. Total session: 15-30 seconds.
**Emotional state**: Low-grade financial anxiety. Reassurance-seeking.
**What she needs**:
- Instant portfolio value on load (skeleton → number in <1s)
- Gain-first presentation (show the green before the red)
- Calm, stable UI — no alarming changes in layout between sessions
- A single, reliable number she trusts

**What drives her away**:
- Slow loading / spinners
- Layout shifts that make her think something changed
- Unexplained negative numbers without context
- Push notifications about small changes

**Design implications**:
- The dashboard KPI row is the most important component for this persona
- Loading skeletons must exactly match the layout of the loaded state (no layout shift)
- Sub-$50 daily changes should use `$text.secondary`, not `$data.negative`

---

## Persona 2: The Optimizer — "Marcus"
**Frequency**: Weekly, deep sessions
**Primary goal**: "What should I do?"
**Behavior**: Reviews AI recommendations, runs scenarios, adjusts allocations. Total session: 5-15 minutes.
**Emotional state**: Analytical, control-seeking. Wants to feel smart about money.
**What he needs**:
- Quantified recommendations with specific dollar impact
- Comparison tools (this allocation vs. that allocation)
- Monte Carlo projections he can adjust
- Confidence indicators so he knows what to trust

**What drives him away**:
- Vague recommendations ("consider saving more")
- Inability to see underlying data/methodology
- AI that can't explain its reasoning
- Feature gates on the tools he actually needs

**Design implications**:
- AI Recommendation Cards must always show impact numbers
- Every insight needs a "View Details" drill-down
- Progressive disclosure is critical — summary for quick scan, detail for deep analysis
- AI Confidence indicators should always be visible on projections

---

## Persona 3: The Set-and-Forgetter — "Priya"
**Frequency**: Monthly, triggered by notifications or statements
**Primary goal**: "Am I on track?"
**Behavior**: Checks if budgets and goals are on track, reviews monthly summary. Total session: 2-5 minutes.
**Emotional state**: Low engagement, wants minimum viable attention.
**What she needs**:
- Monthly summary at a glance (one screen, no scrolling)
- Progress bars with clear on-track/off-track indicators
- Proactive AI insights ("Here's what happened this month")
- Minimal interaction required

**What drives her away**:
- Information overload
- Having to configure or customize anything
- Alerts about things she can't or doesn't want to act on
- Complex UI that requires learning

**Design implications**:
- The AI Insight Card is her primary touchpoint
- Suggested Prompts must be specific and actionable ("Show my March summary")
- Budget Category Rows should immediately show on-track vs. over-budget
- The conversation UI should let her ask simple questions and get simple answers

---

## Persona 4: The Crisis Responder — "David"
**Frequency**: Sporadic, triggered by life events (job loss, large expense, market crash)
**Primary goal**: "Help me plan" + "Am I okay?"
**Behavior**: Urgent, focused sessions during financial stress. Total session: 15-30 minutes.
**Emotional state**: High anxiety, potentially panicked. Needs clarity, not complexity.
**What he needs**:
- Clear, factual presentation of current state
- Scenario tools ("What if I cut spending by $500/mo?")
- AI recommendations ranked by urgency/impact
- Reassurance through completeness (show everything, hide nothing)

**What drives him away**:
- Anything that feels like it's hiding bad news
- Slow AI responses when he needs answers now
- Generic advice that doesn't account for his specific situation
- Dark patterns or upsells during a vulnerable moment

**Design implications**:
- Error states and loading states are disproportionately important (he'll encounter them during outages/volatility)
- AI Progress Bar must show real progress, not fake animation
- Never show permission-gated features during high-anxiety flows
- Confirmation dialogs must be extra clear and calming
