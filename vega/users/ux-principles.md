# UX Principles — Generative UI for Personal Finance

These principles are non-negotiable. Every generated screen, component composition, and interaction must satisfy them. They are ordered by priority.

## 1. Progressive Disclosure
Don't show complexity until the user needs it. Every screen has two layers:
- **Summary layer**: Visible by default. One key metric, one trend indicator, one action.
- **Detail layer**: Revealed on tap/click. Full breakdown, AI insights, historical comparison.

Use `GenUI/Progressive Disclosure Summary` as the pattern. The summary must answer: "Am I okay?" The detail must answer: "Why, and what should I do?"

## 2. Every Destructive Action Requires Confirmation
No exceptions. This includes:
- Disconnecting a bank account
- Deleting a budget or goal
- Removing a transaction category
- Canceling a recurring transfer
- Dismissing an AI recommendation permanently

Use `GenUI/Confirmation Dialog`. The safe option (cancel/keep) must be visually dominant. The destructive option must be text-only, never a filled button.

## 3. Never Bury a Primary Action Below the Fold on Mobile
The most important action on any screen must be visible without scrolling:
- Dashboard: "Add account" or "Ask AI"
- Transaction list: search/filter bar
- Budget: "Adjust budget" button
- AI insight: the primary CTA ("View Details", "Apply Recommendation")

## 4. Show the Money First
The portfolio total / net worth / account balance must be the first meaningful content visible on load. Before charts. Before insights. Before navigation. The user opened the app to see a number. Show it.

Skeleton loading order:
1. KPI value (skeleton, then real)
2. Trend indicator
3. Chart
4. Supporting details

## 5. Calm Over Urgent
Financial UI must feel stable and reassuring:
- No pulsing animations on financial data
- No countdown timers on decisions (except actual market deadlines)
- No exclamation marks in UI copy
- No red primary buttons (red is only for destructive secondary actions)
- Notifications use `GenUI/Calm Notification` — success green, not alert red

## 6. Precision Over Brevity
- Always show cents: $4,281.37, not $4,281
- Always show the date range context: "Mar 1 – Apr 9" not "this month"
- Always show the comparison baseline: "+23% vs. 3-month average" not just "+23%"
- Always show the data source: "Based on 142 transactions" or "from Chase Checking"

## 7. AI Must Be Transparent
Every AI-generated element must:
- Be visually distinguished (use `$ai.surface` background, sparkle icon)
- Show confidence level when applicable
- Include a disclaimer on projections/forecasts
- Never use certainty language ("will", "definitely") — use "may", "estimated", "based on"
- Always offer a way to dismiss or disagree

## 8. Accessibility is Not Optional
- Minimum 4.5:1 contrast ratio for all text (WCAG AA)
- Financial positive/negative must not rely solely on color — use icons (arrow-up/down) + text labels
- All interactive elements need visible focus states
- Screen reader text must say "increased by twenty-three percent", not just show "+23%"
- Touch targets minimum 44x44px on mobile

## 9. Consistent Data Formatting
See `rules/ui/data-formatting.md` for the full specification. Key rules:
- Currency: always `$X,XXX.XX` with commas and cents
- Percentages: one decimal for changes <10%, whole numbers for >10%
- Dates: "Apr 7, 2026" format (never MM/DD/YYYY)
- Large numbers: never abbreviate without user preference (no "$4.2K")

## 10. Error States Are First-Class Citizens
Every component that fetches data must have:
- A loading state (skeleton)
- An error state (with explanation + recovery)
- An empty state (with encouragement + CTA)

If you build a component without these three states, it is incomplete.
