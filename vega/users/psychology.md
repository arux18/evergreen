# User Psychology Rules

## Loading & anxiety
- Skeleton screens within 100ms. Never spinners on data-heavy views.
- Skeletons must match loaded-state layout exactly (no layout shift).
- Error states explain what happened, confirm data is safe, provide recovery.

## Loss aversion (2× stronger than gain satisfaction)
- Show gains before losses in any summary. Use `GenUI/Gain First Summary`.
- Reserve `$data.negative` red for: destructive confirmations, over-budget, losses >5%.
- Minor negatives (daily P&L down $12, <1% change) use `$text.secondary`.

## Trust & control
- Never round financial numbers. Show $4,281.37, not "about $4,300."
- Every AI recommendation has a dismiss/decline option. Never auto-execute.
- Show data sources, last-synced timestamps, and confidence on AI content.

## Decision fatigue
- Progressive disclosure: summary first, detail on tap.
- Maximum 3 action options at once. More → overflow menu.
- Default/primary button is always the conservative option ("Keep Account Connected", not "Remove").

## Anti-patterns
- Never red banners for minor changes
- Never prominent $0.00 on empty accounts — provide context + CTA
- Never auto-execute financial actions
- Never urgent/alarming UI — use `GenUI/Calm Notification`
- Never bury the portfolio total below the fold
