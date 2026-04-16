# Skill: Render Dashboard

Primary screen users see on app launch. Answers "Am I okay?"

## When
User asks to see dashboard / overview / home. Agent composes a full-screen financial summary.

## Layout
```
Dashboard (1440 × fit_content)
├── Sidebar (280px, fill height)
│   ├── Logo / Wordmark
│   ├── Nav (Dashboard [active], Transactions, Budget, Goals, Investments)
│   └── Footer (Settings, user avatar)
└── Main Content (fill_container, vertical, padding:32, gap:24)
    ├── Header Row (horizontal, space_between)
    │   ├── Title "Dashboard" + Date Range Pill
    │   └── Action Buttons (Ask AI, Notifications)
    ├── Data Freshness Badge (if data >1hr → stale variant)
    ├── KPI Row (horizontal, gap:16)          ← SHOW THE MONEY FIRST
    │   ├── Net Worth (Value Up/Down)         ← always first
    │   ├── Monthly Spending vs Budget
    │   ├── Savings Rate
    │   └── Investment Return
    ├── Primary Chart
    │   └── Area / Multi-Series Area (net worth over time)
    ├── Two-Column (horizontal, gap:24)
    │   ├── Left (fill_container)
    │   │   ├── AI Insights ("AI Insights" + "See All" · max 2 cards · Financial Disclaimer below projections)
    │   │   └── Recent Transactions ("Recent" + "View All" · Filter Row · 5–8 items)
    │   └── Right (360px)
    │       ├── Budget Progress Card (top 4–5 categories)
    │       ├── Goals Progress Card
    │       └── Account Summary (Accordion by type)
    └── Trust Signal Bar
```

## KPI card selection
| Condition | Component |
|---|---|
| Net worth trending up | `Component/KPI Card/Value Up` |
| Net worth trending down | `Component/KPI Card/Value Down` |
| Neutral metric (total return %) | `Component/KPI Card/Neutral` |
| With sparkline | `KPI Sparkline Card` |

## States (every section must have all three)
| Section | Loading | Error | Empty |
|---|---|---|---|
| KPI Row | 4× `GenUI/Skeleton/KPI Value` | `GenUI/AI Error State` inline | $0.00 with `GenUI/Zero Balance State` |
| Chart | `GenUI/Skeleton/Chart Area` | `GenUI/Error State` | "Connect an account to see trends" |
| AI Insights | `GenUI/AI Thinking State` | `GenUI/AI Error State` | "Not enough data yet" |
| Transactions | 5× `GenUI/Skeleton/Card` | `GenUI/Error State` | `GenUI/Empty State` + "Connect Account" CTA |
| Budget | Skeleton bars | Error inline | "Set up your first budget" |

## Conditional elements
- Stale data (>1hr) → `GenUI/Stale Data Indicator` below header
- Partial accounts → `GenUI/Partial Data State` above KPI row
- AI recommendations available → `GenUI/AI Recommendation Card` in left column
- Over-budget categories → `GenUI/Budget Category Row/Over Budget` variant

## Data binding
```
KPI Card: kpiLabel, kpiValue, kpiPct, kpiSub
Transaction Item: txnMerchant, txnMeta, txnAmount, txnBalanceAfter, txnIcon, txnCategoryIcon fill
Budget Row: budgetCategory, budgetSpent, budgetLimit, budgetRemaining, budgetPctUsed, budgetFill width, catIcon
```

## Psychology checklist
- [ ] Net worth is the FIRST visible number
- [ ] Gains shown before losses
- [ ] No alarming red on minor negatives (<1%)
- [ ] All AI content uses sparkle icon + `$ai.surface`
- [ ] Financial Disclaimer below projections
- [ ] Confirmation dialog on destructive actions
- [ ] Skeletons match exact loaded layout
