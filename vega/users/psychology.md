# Psychology & UX Principles

Behavioral rules (from psychology) and non-negotiable UX principles. Applied to every screen, component, and interaction.

## Loading & anxiety
- Skeleton screens within 100ms. Never spinners on data-heavy views.
- Skeletons must match loaded-state layout exactly (no layout shift).
- Error states explain what happened, confirm data is safe, provide recovery.

## Loss aversion (2× stronger than gain satisfaction)
- **Show the money first.** Portfolio/net-worth/balance is the first meaningful content on load. Before charts, insights, nav. Skeleton order: KPI value → trend → chart → details.
- **Gain-first** in any summary. Use `GenUI/Gain First Summary`.
- Reserve `$data.negative` red for: destructive confirmations, over-budget, losses >5%.
- Minor negatives (daily P&L down $12, <1% change) use `$text.secondary`.

## Trust & control
- Never round financial numbers. Show $4,281.37, not "about $4,300."
- Show data sources, last-synced timestamps, and confidence on AI content.
- Every AI recommendation has a dismiss/decline option. Never auto-execute financial actions.

## Decision fatigue
- **Progressive disclosure.** Summary layer answers "Am I okay?"; detail answers "Why, and what should I do?" Use `GenUI/Progressive Disclosure Summary`.
- Maximum 3 action options at once. More → overflow menu.
- Default/primary button is always the conservative option ("Keep Account Connected", not "Remove").

## Destructive actions
- Every destructive action requires a `GenUI/Confirmation Dialog`.
- Safe option is visually dominant; destructive option is text-only, never a filled button.

## Primary action placement
- Primary action above the fold on mobile (never buried).
- Dashboard: "Add account" / "Ask AI". Transactions: search/filter. Budget: "Adjust". Insight: primary CTA.

## Calm over urgent
- No pulsing animations on financial data.
- No countdown timers except real market deadlines.
- No `!` in copy. No red primary buttons.
- Notifications use `GenUI/Calm Notification`.

## Precision over brevity
- Always cents.
- Always the date range ("Mar 1 – Apr 9", not "this month").
- Always the baseline ("+23% vs. 3-month average").
- Always the data source ("across 12 transactions" / "from Chase Checking").

## AI transparency
- `$ai.surface` + sparkle icon on every AI-generated element.
- Show confidence level when applicable. Disclaimer on projections.
- No certainty words ("will", "definitely") — use "may", "estimated", "based on".
- Always offer dismiss.

## Accessibility (see also `rules/accessibility/accessibility.md`)
- 4.5:1 contrast for text.
- Color + icon + label (never color alone).
- Visible focus states. 44×44px touch targets.
- Screen reader announces full values.

## Three states required per data component
Loading (skeleton), error (with recovery), empty (with encouragement + CTA). A component missing any of these is incomplete.

## Consistent formatting
See `rules/ui/data-formatting.md`.
