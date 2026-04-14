# Content & Voice Rules

Every piece of text the agent generates — from button labels to AI insights — must follow these rules.

## Tone

### The Voice Is: Calm, Precise, Empowering
- **Calm**: Never urgent, never alarming, never judgmental about financial decisions
- **Precise**: Specific numbers, specific dates, specific sources
- **Empowering**: Frame insights as tools for the user's decision, not directives

### The Voice Is NOT:
- Panicky ("Your spending is out of control!")
- Vague ("Consider adjusting your budget")
- Patronizing ("Great job saving $20!")
- Salesy ("Upgrade now to unlock your financial potential!")

## AI-Generated Text Patterns

### Insights
| Pattern | Example |
|---|---|
| Observation + comparison + driver | "Your dining expenses increased 23% this month compared to your 3-month average. This is primarily driven by 4 transactions over $75." |
| Never use | "Warning: You're spending too much on dining!" |

### Recommendations
| Pattern | Example |
|---|---|
| Action + quantified impact + reasoning | "Increasing your 401(k) from 6% to 10% could save $3,200 in taxes this year and add ~$180K to retirement by age 65." |
| Never use | "You should save more for retirement." |

### Confidence Language
| Confidence Level | Language |
|---|---|
| High (>80%) | "Based on 24 months of data..." |
| Medium (50-80%) | "Based on available data, it appears..." |
| Low (<50%) | "With limited data, we estimate..." |
| Projection | "Based on historical patterns, this may..." |
| Never use | "Will", "Definitely", "Guaranteed", "You need to" |

### Error Messages
| Pattern | Example |
|---|---|
| What happened + reassurance + action | "We couldn't connect to Chase right now. Your data is safe — this is usually a temporary issue. Try again, or we'll auto-retry in 15 minutes." |
| Never use | "Error 500: Connection failed" |

## Button & Action Labels

### Primary Actions (what user should do)
- "View Details" (not "Click here")
- "Apply Recommendation" (not "Do it")
- "Connect Account" (not "Add")
- "Set Up Auto Transfer" (not "Start")

### Destructive Actions (what undoes something)
- "Remove Account" (not "Delete")
- "Dismiss" (not "Delete" or "Remove forever")
- "Cancel Transfer" (not "Stop")

### Safe/Cancel Actions (the escape hatch)
- "Keep Account Connected" (not just "Cancel")
- "Not Now" (not "Cancel" or "Dismiss")
- "Go Back" (not "Cancel")

The safe option should describe the safe outcome, not just negate the action.

## Numbers in Text

### Never
- "about $4,300" — show $4,281.37
- "around 20%" — show 23.1%
- "a few transactions" — show "4 transactions"
- "recently" — show "in the last 2 weeks"

### Always
- Include the comparison baseline: "23% higher than your 3-month average"
- Include the time period: "this month" / "Mar 1 – Apr 9"
- Include the data source when relevant: "across 12 transactions"
- Use ~ only for projections, never for actual data

## Empty State Copy

| State | Tone | Example |
|---|---|---|
| New user, no data | Welcoming, encouraging | "Welcome! Connect your first account to start tracking your finances." |
| No results for filter | Helpful, suggestive | "No transactions found for this period. Try adjusting the date range." |
| Goal not started | Motivating, not pushy | "Ready to start your Emergency Fund? Even $25/month makes a difference over time." |
| Zero balance | Contextual, forward-looking | "You just opened this account. Set up automatic transfers to start building." |

## Disclaimer Text

Required on all AI projections and recommendations:

> "This is not financial advice. Projections are estimates based on historical data and may not reflect future results."

Use `GenUI/Financial Disclaimer` component. Never omit. Never rephrase to sound less serious.
