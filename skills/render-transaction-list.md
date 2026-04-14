# Skill: Render Transaction List

Generates a transaction list view with filtering, categorization, and contextual AI analysis.

## When to Use
- User asks to see transactions, recent activity, or spending history
- User asks "Where did my money go?"
- Agent needs to display transaction data in any context

## Required Reading Before Execution
1. `rules/ui/component-selection.md` — transaction component selection
2. `rules/ui/data-formatting.md` — currency, dates, amounts
3. `users/edge-cases.md` — pending, empty, error states
4. `users/psychology.md` — loss aversion on transaction displays

## Layout Structure

### Full Page View
```
Transaction List Page (fill_container)
├── Header Row
│   ├── Page Title ("Transactions")
│   ├── Date Range Pill (GenUI/Date Range Pill)
│   └── Search Input (if available)
├── Filter Row (GenUI/Filter Row)
│   ├── Account filter chip
│   ├── Category filter chip(s)
│   ├── Date filter chip
│   └── Amount filter chip
├── Summary Bar (optional, when filters active)
│   └── "Showing 47 transactions · Total: -$3,842.50"
├── Transaction Groups (grouped by date)
│   ├── Date Header ("Today", "Yesterday", "Apr 5, 2026")
│   │   ├── Transaction Item (expense/income/pending)
│   │   ├── Transaction Item
│   │   └── ...
│   ├── Date Header
│   │   └── ...
│   └── ...
├── Load More / Pagination
└── Trust Signal Bar
```

### Embedded View (in dashboard or card)
```
Transaction Section
├── Section Header ("Recent Transactions" + "View All")
├── Filter Row (simplified — 2-3 chips max)
└── Transaction Items (5-8 items, no date grouping)
```

## Component Selection

### Transaction Type → Variant
| Type | Component | Icon | Amount Color |
|---|---|---|---|
| Expense | `GenUI/Transaction Item` | Category icon | `$fin.expense` |
| Income/deposit | `GenUI/Transaction Item/Income` | Building icon | `$fin.income` |
| Pending | `GenUI/Transaction Item/Pending` | Clock icon, 0.6 opacity | `$text.secondary` |
| Transfer (internal) | Custom: neutral style | arrows-right-left icon | `$text.primary` |
| Refund | Custom: positive style | rotate-ccw icon | `$fin.income` |

### Category → Icon Mapping
| Category | Lucide Icon | Color Token |
|---|---|---|
| Groceries/Food | `shopping-cart` | `$fin.expense` |
| Dining/Restaurants | `utensils` | `$fin.expense` |
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

## Data Binding

```
Transaction Item fields:
  txnCategoryIcon: fill color by category
  txnIcon: icon name by category (see mapping above)
  txnMerchant: merchant/payee name
  txnMeta: "[Category] · [Date]"
  txnAmount: formatted amount with +/- prefix
  txnBalanceAfter: "Bal: $X,XXX.XX" (optional, hide if no running balance)
```

## Formatting Rules

### Amounts
- Expenses: `-$127.43` in `$fin.expense`
- Income: `+$4,250.00` in `$fin.income`
- Pending: `-$67.99` in `$text.secondary` (no bold)
- Always include cents

### Dates
- Today's transactions: "Today"
- Yesterday: "Yesterday"
- This week: day name "Monday"
- Older: "Apr 5, 2026"
- Pending: show "Pending" badge instead of date

### Grouping
- Group by date in full-page view
- No grouping in embedded/card view
- Pending transactions always appear first, above dated groups

## States

| State | What to Show |
|---|---|
| Loading | 5-8 skeleton rows matching transaction item layout |
| Empty (no transactions) | `GenUI/Empty State`: "No transactions yet. Connect your bank account to start tracking." |
| Empty (filter returns nothing) | Inline message: "No transactions match your filters. Try adjusting the date range or category." |
| Error (API failure) | `GenUI/Error State`: "Unable to load transactions. Your data is safe — this is usually temporary." |
| Partial (some accounts failed) | `GenUI/Partial Data State` above the list: "Showing transactions from 3 of 5 accounts." |
| Pending only | Show pending items with note: "No completed transactions in this period." |

## AI Integration

When transactions are displayed, the agent may surface:
- **Inline anomaly flags**: A subtle `GenUI/Inline Data Mention/Negative` next to unusual amounts
- **Category summary**: Above the list — "You spent $847.50 on dining this month (18% above average)"
- **Suggested prompts**: Below the list — "Show me a breakdown by category", "Compare to last month"

## Pagination
- Default: 20 transactions per page
- Mobile: 15 transactions per page
- "Load More" button (not infinite scroll — user controls the pace)
- Show total count: "Showing 20 of 142 transactions"
