# Skill: Render Transaction List

Transaction list with filtering, categorization, contextual AI.

## When
User asks to see transactions / recent activity / spending history. "Where did my money go?"

## Full page layout
```
Transaction List (fill_container)
├── Header: Title "Transactions" + Date Range Pill + Search
├── Filter Row (GenUI/Filter Row): Account · Category · Date · Amount chips
├── Summary Bar (when filters active): "Showing 47 transactions · Total: -$3,842.50"
├── Transaction Groups (by date)
│   ├── Date Header ("Today", "Yesterday", "Apr 5, 2026")
│   │   └── Transaction Items…
│   └── …
├── Load More (not infinite scroll — user controls pace)
└── Trust Signal Bar
```

## Embedded view (dashboard or card)
```
Section Header ("Recent Transactions" + "View All")
Filter Row (2–3 chips max)
Transaction Items (5–8, no date grouping)
```

## Type → variant
| Type | Component | Icon | Amount color |
|---|---|---|---|
| Expense | `GenUI/Transaction Item` | Category icon | `$fin.expense` |
| Income | `GenUI/Transaction Item/Income` | Building icon | `$fin.income` |
| Pending | `GenUI/Transaction Item/Pending` | Clock icon, 0.6 opacity | `$text.secondary` |
| Transfer (internal) | Custom neutral | arrows-right-left | `$text.primary` |
| Refund | Custom positive | rotate-ccw | `$fin.income` |

## Category → icon
| Category | Icon | Color |
|---|---|---|
| Groceries/Food | `shopping-cart` | `$fin.expense` |
| Dining | `utensils` | `$fin.expense` |
| Transportation | `car` | `$fin.expense` |
| Housing/Rent | `home` | `$fin.expense` |
| Utilities | `zap` | `$fin.expense` |
| Shopping | `shopping-bag` | `$fin.expense` |
| Entertainment | `film` | `$fin.expense` |
| Healthcare | `heart` | `$fin.expense` |
| Subscriptions | `repeat` | `$fin.expense` |
| Salary/Payroll | `building-2` | `$fin.income` |
| Investment return | `trending-up` | `$fin.investment` |
| Transfer | `arrow-right-left` | `$text.secondary` |
| Savings deposit | `piggy-bank` | `$fin.savings` |

## Data binding
```
Transaction Item:
  txnCategoryIcon: fill by category
  txnIcon: lucide name by category
  txnMerchant: merchant/payee
  txnMeta: "[Category] · [Date]"
  txnAmount: formatted with +/- prefix
  txnBalanceAfter: "Bal: $X,XXX.XX" (hide if no running balance)
```

## Formatting
- Expenses: `-$127.43` in `$fin.expense`
- Income: `+$4,250.00` in `$fin.income`
- Pending: `-$67.99` in `$text.secondary`, no bold
- Always include cents
- Dates: "Today", "Yesterday", weekday this week, then `Apr 5, 2026`
- Pending shows "Pending" badge, not a date
- Group by date in full-page view; no grouping in embedded

## States
| State | Display |
|---|---|
| Loading | 5–8 skeleton rows matching layout |
| Empty (no transactions) | `GenUI/Empty State`: "No transactions yet. Connect your bank account to start tracking." |
| Empty (filter) | Inline: "No transactions match your filters. Try adjusting the date range or category." |
| Error | `GenUI/Error State`: "Unable to load transactions. Your data is safe — this is usually temporary." |
| Partial | `GenUI/Partial Data State`: "Showing transactions from 3 of 5 accounts." |
| Pending only | "No completed transactions in this period." |

## AI integration (optional)
- Inline anomaly flags: subtle `GenUI/Inline Data Mention/Negative` next to unusual amounts
- Category summary above list: "You spent $847.50 on dining this month (18% above average)"
- Suggested prompts below list: "Show me a breakdown by category", "Compare to last month"

## Pagination
Desktop: 20/page. Mobile: 15/page. "Load More" button. Show total: "Showing 20 of 142 transactions".
