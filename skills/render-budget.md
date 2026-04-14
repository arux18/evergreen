# Skill: Render Budget

Generates budget tracking views with category breakdowns, progress indicators, and AI-powered spending analysis.

## When to Use
- User asks about budget, spending limits, or categories
- User asks "Am I on track?"
- Agent needs to show budget utilization in any context

## Required Reading Before Execution
1. `rules/ui/component-selection.md` — budget component selection
2. `users/psychology.md` — over-budget anxiety, calm presentation
3. `users/edge-cases.md` — zero budget, over-budget, no budget set
4. `rules/ui/data-formatting.md` — currency and percentage formatting

## Layout Structure

### Full Budget Page
```
Budget Page (fill_container)
├── Header Row
│   ├── Page Title ("Budget") + Month selector
│   └── "Edit Budget" button (secondary)
├── Summary Card
│   ├── GenUI/Progressive Disclosure Summary
│   │   ├── Summary: "Monthly Spending: $4,280 of $5,500 budget"
│   │   ├── Percentage: "78%"
│   │   └── Expandable detail slot
│   └── Gain First Summary (if comparing to last month)
├── Category Breakdown
│   ├── Section Header ("By Category" + sort toggle)
│   ├── Budget Category Rows (sorted by % used, descending)
│   │   ├── Over-budget categories FIRST (GenUI/Budget Category Row/Over Budget)
│   │   ├── Near-budget categories (>80%) — use $status.warning for fill
│   │   ├── On-track categories — use $accent.default for fill
│   │   └── Under-utilized categories (<30%) — use $text.tertiary for fill
│   └── "Add Category" button (if <10 categories)
├── AI Analysis Section
│   ├── AI Insight Card (spending trend analysis)
│   └── Suggested Prompts ("What's driving my food spending?", etc.)
└── Financial Disclaimer (if any projections shown)
```

### Embedded in Dashboard
```
Budget Card (in right column)
├── Card Header ("Budget" + progress ring or percentage)
├── Top 4-5 Budget Category Rows (sorted by % used, desc)
├── Over-budget count: "2 categories over budget" (if applicable)
└── "View Full Budget" link
```

## Component Selection

### Progress Bar Colors by Utilization
| Utilization | Fill Color | Text Treatment |
|---|---|---|
| 0-60% | `$accent.default` | Normal |
| 61-80% | `$accent.default` | Normal |
| 81-99% | `$status.warning` | "Almost at limit" footnote |
| 100%+ | `$status.error` | Use Over Budget variant |

### Category Icon Mapping
Same as transaction category icons in `render-transaction-list.md`. Budget categories and transaction categories share the same icon set.

## Budget Row Data Binding

```
Budget Category Row fields:
  budgetCatIcon: fill color (fin.expense-bg or status.error-bg if over)
  catIcon: lucide icon name matching category
  budgetCategory: category name
  budgetSpent: "$X,XXX" current spend
  budgetLimit: "$X,XXX" budget limit
  budgetFill: width proportional to utilization (capped at container width)
  budgetRemaining: "$XXX remaining" or "$XXX over budget"
  budgetPctUsed: "XX% used" or "XXX%"
```

## Sorting Rules
- Default sort: percentage used, descending (over-budget first)
- Over-budget categories always appear first, regardless of sort
- Within over-budget group: sort by dollar amount over, descending
- User can toggle: by % used, by $ spent, by category name

## States

| State | Display |
|---|---|
| Loading | Skeleton: summary bar + 5 skeleton rows |
| No budget set | `GenUI/Empty State`: "Set up your first budget to start tracking spending. We'll suggest categories based on your transactions." |
| Budget set, no transactions yet | Show budget categories with $0 spent, encouraging messaging |
| All categories on track | Celebratory but calm: "All categories on track this month" (green check, not confetti) |
| Multiple over-budget | Show count prominently but not alarmingly: "2 of 8 categories are over budget" |
| Near end of month | Add context: "5 days remaining in this budget period" |

## Psychology Rules
- Over-budget is information, not failure. Never use language like "failed" or "broken"
- Show the remaining amount before the over amount when possible
- If user is under budget overall, lead with that even if individual categories are over
- Don't send push notifications for approaching budget limits unless user opted in
