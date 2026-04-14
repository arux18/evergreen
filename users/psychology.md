# User Psychology — Wealth Management & Personal Finance

These behavioral truths must inform every screen, component, and micro-interaction the agent generates.

## Core Emotional States

### Money Anxiety
- Users feel anxiety when portfolio values aren't immediately visible on load. **Never show a blank screen or spinner when financial data is loading — always use skeleton screens that mirror the shape of the data they're waiting for.**
- The moment between "I opened the app" and "I can see my money" is the highest-anxiety moment. Minimize it. Skeleton loaders must appear within 100ms.
- Users catastrophize when data is missing. A failed API call feels like "my money is gone." Error states must always reassure: explain what happened, confirm data is safe, and provide a clear recovery action.

### Loss Aversion
- Loss aversion is ~2x stronger than gain satisfaction (Kahneman & Tversky). **Always show gains before losses in data presentation.** The `GenUI/Gain First Summary` component enforces this.
- Red should be used sparingly and never for primary actions. Red is reserved for:
  - Destructive confirmations (delete, disconnect)
  - Over-budget indicators
  - Significant negative deltas (>5% loss)
- For normal negative values (daily P&L down $12), use `$text.secondary` — not `$data.negative`. Reserve alarm colors for genuinely alarming situations.

### Trust & Control
- Trust is built through calm typography, muted colors, and precision. **Never round financial numbers unless the user explicitly chose a summary view.** Show $4,281.37, not "about $4,300."
- Users need to feel in control. Every AI recommendation must have a dismiss/decline option. Never auto-execute financial actions.
- Transparency builds trust: always show data sources, last-synced timestamps, and confidence levels on AI-generated insights.

### Decision Fatigue
- Users who check finances daily are prone to decision fatigue. Progressive disclosure prevents overwhelm — show the summary, let them drill down.
- Never present more than 3 action options at once. If more are needed, use a "More options" overflow.
- Default states should be safe states. The primary/default button in any financial action should be the conservative option (e.g., "Keep Account Connected" over "Remove Account").

## Anti-Patterns to Avoid

| Never do this | Do this instead |
|---|---|
| Show a red banner for minor negative changes | Use neutral secondary text color |
| Display $0.00 prominently on a new/empty account | Provide encouraging context + CTA |
| Auto-execute any financial recommendation | Always require explicit user confirmation |
| Use urgent/alarming UI patterns for notifications | Use the `GenUI/Calm Notification` component |
| Show loading spinners for data-heavy views | Always use skeleton screens |
| Round financial numbers without user consent | Show precise values with full cents |
| Bury the portfolio total below the fold | It must be the first visible number |
| Present losses without gains context | Use gain-first pattern |
