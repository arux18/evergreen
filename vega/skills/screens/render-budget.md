# Skill: Render Budget

Budget tracking with category breakdowns, progress, and AI analysis.

## When
User asks about budget / spending limits / categories. User asks "Am I on track?"

## Full page layout
```
Budget Page (fill_container)
├── Header: Title "Budget" + Month selector + "Edit Budget" (secondary)
├── Summary Card
│   ├── GenUI/Progressive Disclosure Summary ("Monthly Spending: $4,280 of $5,500 budget", 78%)
│   └── Gain First Summary (if comparing to last month)
├── Category Breakdown
│   ├── Section Header ("By Category" + sort toggle)
│   └── Budget Category Rows (sorted by % used desc)
│       ├── Over-budget FIRST → `GenUI/Budget Category Row/Over Budget`
│       ├── Near-budget (>80%)  → fill `$status.warning`
│       ├── On-track           → fill `$accent.default`
│       └── Under-utilized (<30%) → fill `$text.tertiary`
├── AI Analysis: AI Insight Card + Suggested Prompts
└── Financial Disclaimer (if projections)
```

## Embedded in dashboard (right column)
```
Budget Card
├── Card Header (Budget + overall % / progress ring)
├── Top 4–5 Budget Category Rows (sorted by % used desc)
├── Over-budget count (if any): "2 categories over budget"
└── "View Full Budget" link
```

## Progress bar color by utilization
| Utilization | Fill | Text |
|---|---|---|
| 0–80% | `$accent.default` | Normal |
| 81–99% | `$status.warning` | "Almost at limit" footnote |
| 100%+ | `$status.error` | Use Over Budget variant |

## Data binding
```
Budget Category Row:
  budgetCatIcon: $fin.expense-bg (or $status.error-bg if over)
  catIcon: lucide name (see render-transaction-list for mapping)
  budgetCategory, budgetSpent, budgetLimit
  budgetFill: width proportional to utilization (capped at container)
  budgetRemaining: "$XXX remaining" or "$XXX over budget"
  budgetPctUsed: "XX% used" or "XXX%"
```

## Sorting
- Default: % used descending (over-budget first)
- Over-budget always first regardless of sort; within that group, by $ over desc
- User can toggle: % used / $ spent / name

## States
| State | Display |
|---|---|
| Loading | Skeleton summary bar + 5 skeleton rows |
| No budget | `GenUI/Empty State`: "Set up your first budget to start tracking spending." |
| Budget set, no transactions | Categories at $0 with encouraging copy |
| All on track | Calm win: "All categories on track this month" (check, not confetti) |
| Multiple over | "2 of 8 categories over budget" (non-alarming) |
| Near month-end | "5 days remaining in this budget period" |

## Psychology
- Over-budget is information, not failure — never "failed" or "broken"
- Show remaining amount before over amount when possible
- If overall under-budget, lead with that even if individual categories are over
