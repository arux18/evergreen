# Skill: Render Dashboard

Generates a personal finance dashboard view. This is the primary screen users see on app launch.

## When to Use
- User asks to see their dashboard, overview, or home screen
- Agent needs to compose a full-screen financial summary
- Generating a "Am I okay?" view (see `users/goals.md`)

## Required Reading Before Execution
1. `rules/visual/token-usage.md` — all token selections
2. `rules/ui/component-selection.md` — component mapping
3. `users/psychology.md` — gain-first, anxiety reduction
4. `users/ux-principles.md` — show the money first, progressive disclosure

## Layout Structure

```
Dashboard (1440 x fit_content)
├── Sidebar (280px, fill height)
│   ├── Logo / Wordmark
│   ├── Nav Items (Dashboard [active], Transactions, Budget, Goals, Investments)
│   └── Footer (Settings, User avatar)
├── Main Content (fill_container, vertical, padding: 32, gap: 24)
│   ├── Header Row (horizontal, space_between)
│   │   ├── Page Title ("Dashboard") + Date Range Pill
│   │   └── Action Buttons (Ask AI, Notifications)
│   ├── Data Freshness Badge (if data >1hr old → stale variant)
│   ├── KPI Row (horizontal, gap: 16) ← SHOW THE MONEY FIRST
│   │   ├── KPI Card: Net Worth (Value Up/Down) ← always first
│   │   ├── KPI Card: Monthly Spending vs Budget
│   │   ├── KPI Card: Savings Rate
│   │   └── KPI Card: Investment Return
│   ├── Primary Chart Section
│   │   └── Area Chart or Multi-Series Area Chart (net worth over time)
│   ├── Two-Column Layout (horizontal, gap: 24)
│   │   ├── Left Column (fill_container)
│   │   │   ├── AI Insights Section
│   │   │   │   ├── Section Header ("AI Insights" + "See All")
│   │   │   │   ├── AI Insight Card (max 2 visible)
│   │   │   │   └── Financial Disclaimer (below any projections)
│   │   │   └── Recent Transactions
│   │   │       ├── Section Header ("Recent" + "View All")
│   │   │       ├── Filter Row
│   │   │       └── Transaction Items (5-8 items)
│   │   └── Right Column (360px)
│   │       ├── Budget Progress Card
│   │       │   └── Budget Category Rows (top 4-5 categories)
│   │       ├── Goals Progress Card
│   │       │   └── Progress Bar items
│   │       └── Account Summary (Accordion sections by type)
│   └── Trust Signal Bar (bottom of content)
```

## Component Selection Rules

### KPI Cards
- Net worth trending up → `Component/KPI Card/Value Up`
- Net worth trending down → `Component/KPI Card/Value Down`
- Neutral metric (total return %) → `Component/KPI Card/Neutral`
- With sparkline → `KPI Sparkline Card`

### States to Generate
Every section MUST have three states:

| Section | Loading | Error | Empty |
|---|---|---|---|
| KPI Row | 4x `GenUI/Skeleton/KPI Value` | `GenUI/AI Error State` inline | Show $0.00 with `GenUI/Zero Balance State` pattern |
| Chart | `GenUI/Skeleton/Chart Area` | `GenUI/Error State` | "Connect an account to see trends" |
| AI Insights | `GenUI/AI Thinking State` | `GenUI/AI Error State` | "Not enough data yet" |
| Transactions | 5x `GenUI/Skeleton/Card` rows | `GenUI/Error State` | `GenUI/Empty State` with "Connect Account" CTA |
| Budget | Skeleton bars | Error inline | "Set up your first budget" |

### Conditional Elements
- **Stale data (>1hr)**: Show `GenUI/Stale Data Indicator` below header
- **Partial accounts**: Show `GenUI/Partial Data State` above KPI row
- **AI recommendations available**: Show `GenUI/AI Recommendation Card` in left column
- **Over-budget categories**: Use `GenUI/Budget Category Row/Over Budget` variant

## Data Binding

When the agent has real data, bind to these component fields:

```
KPI Card fields: kpiLabel, kpiValue, kpiPct, kpiSub
Transaction Item fields: txnMerchant, txnMeta, txnAmount, txnBalanceAfter, txnIcon, txnCategoryIcon fill
Budget Row fields: budgetCategory, budgetSpent, budgetLimit, budgetRemaining, budgetPctUsed, budgetFill width, catIcon
```

## Psychology Checklist
- [ ] Portfolio/net worth value is the FIRST visible number
- [ ] Gains shown before losses in any summary
- [ ] No alarming red on minor negative changes (<1%)
- [ ] All AI content has sparkle icon + `$ai.surface` background
- [ ] Financial disclaimer present below any projection
- [ ] Confirmation dialog wired to any destructive action
- [ ] Skeleton loaders match exact layout of loaded state
