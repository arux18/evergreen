# User Goals — Personal Finance Generative UI

## Primary Goals (why they open the app)

### 1. "Am I okay?"
The single most common reason users check a finance app. They want immediate reassurance that their financial picture is stable.
- **What satisfies this**: Portfolio total visible within 1s, trend direction (up/down), no alarming notifications
- **What breaks this**: Slow loads, missing data, unexplained negative numbers

### 2. "Where did my money go?"
Transaction review and spending analysis. Users want to understand recent activity.
- **What satisfies this**: Categorized transactions, spending by category, comparison to average
- **What breaks this**: Uncategorized transactions, no time-period context, walls of undifferentiated line items

### 3. "Am I on track?"
Goal tracking against budgets, savings targets, and retirement projections.
- **What satisfies this**: Progress bars with clear percentages, projected completion dates, AI-powered forecasts
- **What breaks this**: Goals without context, no indication of pace, overwhelming detail

### 4. "What should I do?"
Actionable recommendations — the highest-value AI capability.
- **What satisfies this**: Specific, quantified recommendations with impact projections ("save $3,200/yr in taxes")
- **What breaks this**: Vague advice ("save more"), recommendations without context, no way to act or dismiss

## Secondary Goals

### 5. "Show me something I didn't know"
Proactive insights — the AI surfaces patterns the user hasn't asked about.
- Anomaly detection (unusual spending)
- Opportunity identification (tax-loss harvesting, rate arbitrage)
- Trend analysis (spending drift over 6 months)

### 6. "Help me plan"
Scenario modeling — "what if I increase my 401(k)?" / "when can I retire?"
- Monte Carlo projections
- Side-by-side comparisons
- Sensitivity analysis

### 7. "Prove it to me"
Audit and verification — users periodically want to verify the AI is working correctly.
- Source attribution on every insight
- Ability to see underlying transactions
- Confidence indicators and disclaimers

## Goal → Component Mapping

| Goal | Primary Components |
|---|---|
| "Am I okay?" | KPI Card (Value Up/Down/Neutral), Sparkline Card, Gain First Summary |
| "Where did my money go?" | Transaction Items, Budget Category Row, Filter Row, Donut/Bar Charts |
| "Am I on track?" | Progress Bar Card, Monte Carlo Chart, AI Confidence indicators |
| "What should I do?" | AI Recommendation Card, AI Insight Card, Suggested Prompts |
| "Show me something I didn't know" | AI Insight Card (proactive), Inline Data Mentions, Calm Notification |
| "Help me plan" | Monte Carlo Chart, Comparison Metric, Waterfall Chart, Candlestick Chart |
| "Prove it to me" | Financial Disclaimer, Data Freshness Badge, AI Confidence, Holdings Table |
