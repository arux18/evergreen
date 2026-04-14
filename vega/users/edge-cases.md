# Edge Cases — Every State the UI Must Handle

If an edge case isn't designed, an AI will generate the happy path and skip it. This document ensures every state is accounted for. Each maps to a component in the design system.

## Data Loading States

| State | Component | Rule |
|---|---|---|
| Initial load | `GenUI/Skeleton/Card`, individual skeleton primitives | Always skeleton screens, never spinners for data-heavy views |
| AI generating | `GenUI/AI Thinking State`, `GenUI/AI Progress Bar` | Show what the AI is doing in plain language |
| Streaming response | `GenUI/Streaming Line` | Show text as it arrives with cursor indicator |
| Partial load | Show loaded sections immediately | Never hold the full screen for the slowest API |

## Empty States

| State | Component | Rule |
|---|---|---|
| Empty portfolio (new user) | `GenUI/Empty State` | Show encouraging copy + CTA, never a blank screen |
| Zero balance account | `GenUI/Zero Balance State` | Never show $0.00 prominently — provide context ("You just opened this account") |
| No transactions in range | `GenUI/Empty State` (variant) | Suggest adjusting date range or filters |
| No AI insights available | Calm empty variant | "Not enough data yet — check back after your first month" |

## Error States

| State | Component | Rule |
|---|---|---|
| API failure | `GenUI/Error State` | Always explain what happened + what to do next |
| Partial API failure | `GenUI/AI Error State` | Show what loaded, explain what didn't |
| Bank connection lost | `GenUI/Partial Data State` | Show which accounts are affected + reconnect CTAs |
| AI analysis failed | `GenUI/AI Error State` | "Analysis couldn't complete" — never "Error" |
| Rate limited | `GenUI/Rate Limited State` | Show usage, time until reset, upgrade option |

## Data Integrity States

| State | Component | Rule |
|---|---|---|
| Stale data (>1hr old) | `GenUI/Stale Data Indicator` | Show last sync time + refresh action |
| Conflicting data | `GenUI/Conflicting Data State` | Explain both values, recommend bank value |
| Partial account data | `GenUI/Partial Data State` | "Showing 3 of 5 accounts" — never silently omit |
| Data freshness | `GenUI/Data Freshness Badge` | Live (green dot), Recent (no indicator), Stale (yellow dot) |

## Permission & Access States

| State | Component | Rule |
|---|---|---|
| Premium feature gated | `GenUI/Permission Gated Card` | Show blurred preview + what they'll get |
| Requires re-auth | Inline reconnect banner | Never block the whole screen for one account |
| Rate limited | `GenUI/Rate Limited State` | Show quota usage + time remaining |

## Financial Edge Cases

| State | Rule |
|---|---|
| Negative net worth | Show factually, never judgmentally. No alarming colors on the total. |
| Very large numbers (>$1M) | Still show precise to cents unless user chose summary mode |
| Very small changes (<$1) | Don't highlight trivially — use `$text.tertiary` |
| Pending transactions | Use `GenUI/Transaction Item/Pending` with reduced opacity + "Pending" badge |
| Disputed transactions | Show flag icon + "Under review" status |
| Recurring vs. one-time | Visually distinguish with a recurring icon indicator |

## AI-Specific Edge Cases

| State | Rule |
|---|---|
| Low confidence prediction | Always show `GenUI/AI Confidence/Low` + disclaimer |
| Contradictory insight | "Based on available data" qualifier — never assert certainty |
| Outdated analysis | Show when it was generated + offer to re-run |
| Recommendation the user already declined | Don't re-show for 30 days |
| Multiple competing recommendations | Rank by impact, show max 3, "See all" for more |
