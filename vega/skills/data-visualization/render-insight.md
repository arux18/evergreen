# Skill: Render Insight

Generates AI-powered financial insight displays. Used when the agent surfaces a proactive observation, anomaly, or pattern.

## When to Use
- Agent detects a spending anomaly
- Agent identifies a savings opportunity
- Agent completes a portfolio analysis
- User asks "What should I know?" or "Any insights?"

## Required Reading Before Execution
1. `rules/ui/content-voice.md` — AI language patterns, confidence language
2. `users/psychology.md` — never alarm, always empower
3. `rules/ui/data-formatting.md` — precise numbers, always
4. `users/edge-cases.md` — confidence levels, disclaimers

## Insight Types & Components

### Type 1: Spending Anomaly
**Component**: `GenUI/AI Insight Card`
**Pattern**: Observation + comparison + driver

```
Layout:
├── Insight Header (sparkle icon + "Spending Insight" + "Just now")
├── Body text: "[Category] expenses increased [X]% this month compared to your [baseline]. This is primarily driven by [N] transactions over $[threshold]."
├── Highlight Row (3 metrics):
│   ├── This Month: $X,XXX (fin.expense color)
│   ├── [Baseline]: $X,XXX (text.primary)
│   └── Change: +XX% (data.negative)
├── Actions: "View Details" + "Dismiss"
└── AI Confidence indicator (if <80% confidence)
```

### Type 2: Savings Opportunity
**Component**: `GenUI/AI Recommendation Card`
**Pattern**: Action + quantified impact + reasoning

```
Layout:
├── Recommendation Header (lightbulb icon + impact badge)
├── Title: "[Specific action verb] [specific target]"
├── Body: "Based on [data source], [action] could [quantified benefit]. [Additional context]."
├── Impact Row (2-3 metrics):
│   ├── Primary benefit: $X,XXX/yr (status.success)
│   ├── Secondary benefit: description (status.success)
│   └── Cost/trade-off: $XXX/mo (text.primary)
├── Actions: "Apply Recommendation" (primary) + "Learn More" (secondary)
└── Financial Disclaimer
```

### Type 3: Trend Analysis
**Component**: `GenUI/AI Insight Card` + embedded chart
**Pattern**: Observation + visualization + suggested action

```
Layout:
├── Insight Header (sparkle icon + "Trend Analysis")
├── Body text: summary of trend
├── Embedded chart (Area Chart or Bar Chart — use component-selection rules)
├── Inline Data Mentions for key figures
└── Actions: "Explore Trend" + "Dismiss"
```

### Type 4: Portfolio Alert
**Component**: `GenUI/AI Insight Card` (with `$status.info-bg` highlight)
**Pattern**: What changed + impact + what to do

```
Layout:
├── Insight Header (sparkle icon + "Portfolio Update")
├── Body: factual description, never alarming
├── Comparison Metric (before vs. after)
├── AI Confidence indicator
└── Actions: "View Portfolio" + "Dismiss"
```

## Content Generation Rules

### Language
- Observation, not judgment: "increased 23%" not "spending is too high"
- Specific, not vague: "4 transactions over $75 in the last two weeks" not "several large purchases recently"
- Empowering, not directive: "could save $3,200" not "you need to save"
- See `rules/ui/content-voice.md` for full patterns

### Confidence Levels
| Data Available | Confidence | Display |
|---|---|---|
| 24+ months of transactions | High | `GenUI/AI Confidence/High` |
| 6-24 months | Medium | `GenUI/AI Confidence/Medium` |
| <6 months | Low | `GenUI/AI Confidence/Low` + qualifier text |
| Projection/forecast | Always low-medium | Always show `GenUI/Financial Disclaimer` |

### Numbers
- Always show the exact comparison: "+23% vs. 3-month average"
- Always show transaction count: "across 12 transactions"
- Always show the time period: "this month (Mar 1 – Apr 9)"
- Never round: $1,847.50 not "about $1,850"

## States

| State | Component | Behavior |
|---|---|---|
| Generating insight | `GenUI/AI Thinking State` | "Analyzing your spending patterns..." |
| Streaming response | `GenUI/Streaming Line` | Text appears word by word |
| Analysis failed | `GenUI/AI Error State` | "Analysis couldn't complete — partial results shown below" |
| No insights available | Calm empty text | "Not enough data for insights yet. Check back after your first full month." |
| User dismissed insight | Remove from view | Don't re-show for 30 days |

## Composition in Context

### In Dashboard
- Maximum 2 insight cards visible, then "See all insights"
- Highest confidence/impact first
- Always below the KPI row (never above — show the money first)

### In Conversation
- Wrap in `GenUI/Chat Bubble/AI Rich` with content slot
- Add `GenUI/Suggested Prompts` below for follow-up questions
- Quick actions: "Show by week", "Compare to last month", "Set a budget alert"

### Standalone Detail View
- Full-width insight card
- Expanded chart below
- Related transactions list
- Related recommendations
