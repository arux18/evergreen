# Edge Cases — State → Component

## Loading
| State | Component |
|---|---|
| Initial load | `GenUI/Skeleton/Card` + skeleton primitives (never spinners) |
| AI generating | `GenUI/AI Thinking State`, `GenUI/AI Progress Bar` |
| Streaming | `GenUI/Streaming Line` |
| Partial load | Show loaded sections immediately; never block on slowest API |

## Empty
| State | Component |
|---|---|
| New user, no portfolio | `GenUI/Empty State` — encouraging copy + CTA |
| Zero balance | `GenUI/Zero Balance State` — never prominent $0.00 |
| No transactions in range | `GenUI/Empty State` variant — suggest adjusting range |
| No AI insights yet | Calm variant — "Not enough data yet" |

## Error
| State | Component |
|---|---|
| API failure | `GenUI/Error State` — explain + recovery |
| Partial API failure | `GenUI/AI Error State` — show what loaded |
| Bank connection lost | `GenUI/Partial Data State` + reconnect CTAs |
| AI analysis failed | `GenUI/AI Error State` — "Analysis couldn't complete" (never "Error") |
| Rate limited | `GenUI/Rate Limited State` — usage + reset time |

## Data integrity
| State | Component |
|---|---|
| Stale data (>1hr) | `GenUI/Stale Data Indicator` + refresh |
| Conflicting data | `GenUI/Conflicting Data State` — recommend bank value |
| Partial accounts | `GenUI/Partial Data State` — "3 of 5 accounts" |
| Freshness | `GenUI/Data Freshness Badge` — Live/Recent/Stale |

## Permission & access
| State | Component |
|---|---|
| Premium-gated | `GenUI/Permission Gated Card` — blurred preview + what they get |
| Requires re-auth | Inline reconnect banner (never full-screen block) |
| Rate limited | `GenUI/Rate Limited State` |

## Financial edge cases
- Negative net worth: factual, never alarming colors on the total
- >$1M: still precise to cents unless user chose summary mode
- <$1 changes: `$text.tertiary`, don't highlight
- Pending: `GenUI/Transaction Item/Pending` — 0.6 opacity + "Pending" badge
- Disputed: flag icon + "Under review"
- Recurring vs one-time: recurring-icon indicator

## AI edge cases
- Low confidence: always `GenUI/AI Confidence/Low` + disclaimer
- Contradictory insight: qualify with "Based on available data"
- Outdated analysis: show generation time + offer re-run
- Dismissed recommendation: don't re-show for 30 days
- Multiple competing recommendations: rank by impact, max 3, "See all" for more
