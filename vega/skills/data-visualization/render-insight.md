# Skill: Render Insight

AI-powered proactive observations, anomalies, savings opportunities.

## When
Spending anomaly detected · savings opportunity found · portfolio analysis complete · user asks "What should I know?"

## Insight types

### 1. Spending anomaly → `GenUI/AI Insight Card`
```
├── Header: sparkle icon + "Spending Insight" + timestamp
├── Body: "[Category] expenses increased [X]% this [period] vs. [baseline]. Driven by [N] transactions over $[threshold]."
├── Highlight Row (3 metrics): This [period] · [Baseline] · Change (+XX%)
├── Actions: "View Details" + "Dismiss"
└── AI Confidence (if <80%)
```

### 2. Savings opportunity → `GenUI/AI Recommendation Card`
```
├── Header: lightbulb icon + impact badge
├── Title: "[Action verb] [specific target]"
├── Body: "Based on [data source], [action] could [quantified benefit]."
├── Impact Row (2–3): Primary $X,XXX/yr ($status.success) · Secondary · Cost/trade-off
├── Actions: "Apply Recommendation" (primary) + "Learn More"
└── Financial Disclaimer
```

### 3. Trend analysis → `GenUI/AI Insight Card` + embedded chart
```
├── Header: sparkle + "Trend Analysis"
├── Body: trend summary
├── Embedded chart (use render-chart decision tree)
├── Inline Data Mentions for key figures
└── Actions: "Explore Trend" + "Dismiss"
```

### 4. Portfolio alert → `GenUI/AI Insight Card` (`$status.info-bg`)
```
├── Header: sparkle + "Portfolio Update"
├── Body: factual, never alarming
├── Comparison Metric (before vs after)
├── AI Confidence
└── Actions: "View Portfolio" + "Dismiss"
```

## Confidence levels
| Data available | Confidence | Display |
|---|---|---|
| 24+ months | High | `GenUI/AI Confidence/High` |
| 6–24 months | Medium | `GenUI/AI Confidence/Medium` |
| <6 months | Low | `GenUI/AI Confidence/Low` + qualifier |
| Projection/forecast | Always show `GenUI/Financial Disclaimer` |

## Numbers
- Exact comparison: "+23% vs. 3-month average"
- Transaction count: "across 12 transactions"
- Period: "this month (Mar 1 – Apr 9)"
- Never round

## States
| State | Behavior |
|---|---|
| Generating | `GenUI/AI Thinking State` — "Analyzing your spending patterns…" |
| Streaming | `GenUI/Streaming Line` |
| Failed | `GenUI/AI Error State` — "Analysis couldn't complete" |
| None available | Calm empty — "Not enough data for insights yet." |
| Dismissed | Remove from view; don't re-show for 30 days |

## Composition context
- **Dashboard:** max 2 cards → "See all insights". Highest confidence/impact first. Always below KPI row.
- **Conversation:** wrap in `GenUI/Chat Bubble/AI Rich`; add `GenUI/Suggested Prompts` below.
- **Detail view:** full-width card + expanded chart + related transactions + related recommendations.
