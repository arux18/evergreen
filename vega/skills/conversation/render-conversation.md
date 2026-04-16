# Skill: Render Conversation

Chat-based generative UI. User asks questions; agent responds with text + embedded viz.

## When
User is in chat mode · natural-language question about finances · response needs embedded visualization.

## Layout
```
Conversation (fill_container)
├── Header: AI Avatar + "Financial Assistant" · Data Freshness Badge · "New Conversation"
├── Message Thread (vertical, gap:16, scrollable)
│   ├── AI Welcome Message (Chat Bubble/AI)
│   ├── Suggested Prompts Row (initial)
│   ├── User Message (Chat Bubble/User)
│   ├── AI Response (Chat Bubble/AI or AI Rich)
│   ├── Follow-up Suggested Prompts
│   └── … (continues)
├── Input Area (fixed bottom): text input + context chips + send
└── Trust Signal Bar (subtle)
```

## Response types
| Type | Component | When |
|---|---|---|
| Text-only | `GenUI/Chat Bubble/AI` | Simple factual answer, no viz |
| Rich with data | `GenUI/Chat Bubble/AI Rich` | Benefits from chart/table/structured data |
| Rich with recommendation | `AI Rich` → slot contains `GenUI/AI Recommendation Card` | Actionable recommendation |
| Rich with multiple items | `AI Rich` → slot contains multiple components | Multi-part answer |

## Rich response anatomy
```
├── Text: direct answer in first sentence
├── Content Slot: chart / table / card (use component-selection rules)
├── Inline Data Mentions (key figures)
├── AI Confidence indicator (if analysis/projection)
├── Financial Disclaimer (if projection/recommendation)
└── Quick Actions: 2–3 follow-up suggested prompts
```

## Composition rules
Always: direct answer first · supporting data · context (baseline, period, source) · 2–3 follow-up prompts.
Never: uncertain assertions without confidence · advice without disclaimer · >3 follow-ups · multiple charts in one response (split across turns).

## Quick actions by topic
| Topic | Suggested quick actions |
|---|---|
| Spending analysis | "Show by week", "Compare to last month", "Set a budget" |
| Account balance | "Show recent transactions", "Show trend", "Set up alert" |
| Investment performance | "Show allocation", "Compare to benchmark", "Tax implications" |
| Budget status | "Show biggest category", "Forecast month-end", "Adjust budget" |
| Goal progress | "Run projection", "What if I increase?", "Show milestones" |

## Processing states
| State | Display |
|---|---|
| Thinking (<5s) | AI Avatar + `GenUI/AI Thinking State` — "Analyzing your spending patterns…" |
| Processing (>5s) | AI Avatar + `GenUI/AI Progress Bar` — "Generating forecast" + % |
| Streaming | AI Avatar + `GenUI/Streaming Line` → content slot loads after text |
| Error | AI Avatar + `GenUI/AI Error State` — "Analysis couldn't complete." + "Try again" |

## Welcome state (new conversation)
Show 4 suggested prompts, rotating by:
- Time of month (early → "How's my budget looking?", late → "Month-end summary")
- Recent events (large transaction → "Tell me about that $X charge")
- Unread insights (new anomaly → "You noticed something about my spending?")

Example defaults:
- "What's my biggest expense this month?"
- "Am I on track for my savings goals?"
- "Show me a forecast of my retirement savings"
- "Analyze my recurring subscriptions"

## Mobile
- Chat bubbles: max-width 85%
- Charts in slot: simplified, max 160px height
- Quick actions: horizontal scroll row
- Suggested prompts: full-width, stacked
