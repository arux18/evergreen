# Skill: Render Conversation

Generates the conversational AI interface — the chat-based generative UI where users ask questions and receive rich responses.

## When to Use
- User is in chat/conversation mode with the AI
- User asks a natural language question about their finances
- Agent needs to compose a response with embedded visualizations

## Required Reading Before Execution
1. `rules/ui/content-voice.md` — AI response tone and patterns
2. `rules/ui/component-selection.md` — which viz to embed in responses
3. `users/psychology.md` — calm, precise, empowering
4. `users/personas.md` — tailor complexity to user type

## Layout Structure

### Conversation View
```
Conversation Page (fill_container)
├── Header
│   ├── AI Avatar + "Financial Assistant"
│   ├── Data Freshness Badge
│   └── "New Conversation" button
├── Message Thread (vertical, gap: 16, scrollable)
│   ├── AI Welcome Message (Chat Bubble/AI)
│   │   └── "Hi! I can help you understand your finances..."
│   ├── Suggested Prompts Row (initial suggestions)
│   ├── User Message (Chat Bubble/User)
│   ├── AI Response (Chat Bubble/AI or AI Rich)
│   ├── Follow-up Suggested Prompts
│   ├── User Message
│   ├── AI Response
│   └── ... (conversation continues)
├── Input Area (fixed bottom)
│   ├── Text input with placeholder "Ask about your finances..."
│   ├── Suggested prompt chips (context-aware, above input)
│   └── Send button
└── Trust Signal Bar (below input, subtle)
```

## Response Types & Components

### Text-Only Response
**Component**: `GenUI/Chat Bubble/AI`
**When**: Simple factual answer, no data visualization needed

```
User: "How much is in my checking account?"
AI: "Your Chase Checking balance is $4,892.57 as of today. This includes a pending $67.99 charge from Amazon."
```

### Rich Response with Data
**Component**: `GenUI/Chat Bubble/AI Rich`
**When**: Response benefits from a chart, table, or structured data

```
User: "How much did I spend on dining this month?"
AI:
├── Text: "You've spent $847.50 on dining this month across 12 transactions."
├── Content Slot: [Horizontal Bar Chart — top 5 restaurants by spend]
├── Inline Data Mentions: "+18% vs. 3-month average"
└── Quick Actions: "Show by week" | "Compare to last month" | "Set a budget"
```

### Rich Response with Recommendation
**Component**: `GenUI/Chat Bubble/AI Rich` → content slot contains `GenUI/AI Recommendation Card`

```
User: "How can I save on taxes?"
AI:
├── Text: "Based on your income and current 401(k) contribution..."
├── Content Slot: [AI Recommendation Card with tax impact metrics]
└── Quick Actions: "Calculate exact savings" | "Show other options"
```

### Rich Response with Multiple Items
**Component**: `GenUI/Chat Bubble/AI Rich` → content slot contains multiple components

```
User: "Show me my net worth breakdown"
AI:
├── Text: "Your total net worth is $342,580.25. Here's the breakdown:"
├── Content Slot: [Donut Chart — asset allocation]
├── Content Slot: [Accordion sections — accounts by type]
├── AI Confidence indicator
└── Quick Actions: "Show over time" | "Compare to last year"
```

## Response Composition Rules

### Always Include
1. **Direct answer first** — answer the question in the first sentence
2. **Supporting data** — chart, table, or structured metrics
3. **Context** — comparison baseline, time period, data source
4. **Follow-up actions** — 2-3 suggested prompts for deeper analysis

### Never Include
- Uncertain assertions without confidence qualifiers
- Financial advice without disclaimer
- More than 3 follow-up suggestions
- Multiple charts in one response (split into conversation turns)

### Quick Action Selection
Quick actions should be contextual follow-ups based on the current response:

| Response Topic | Suggested Quick Actions |
|---|---|
| Spending analysis | "Show by week", "Compare to last month", "Set a budget" |
| Account balance | "Show recent transactions", "Show trend", "Set up alert" |
| Investment performance | "Show allocation", "Compare to benchmark", "Tax implications" |
| Budget status | "Show biggest category", "Forecast month-end", "Adjust budget" |
| Goal progress | "Run projection", "What if I increase?", "Show milestones" |

## AI Processing States

### Thinking (short operation, <5s)
```
AI Avatar + GenUI/AI Thinking State
"Analyzing your spending patterns..."
```

### Processing (long operation, >5s)
```
AI Avatar + GenUI/AI Progress Bar
"Generating forecast" — 67% progress
```

### Streaming Response
```
AI Avatar + Chat Bubble frame
GenUI/Streaming Line: text appearing word by word with cursor
Then: content slot loads (chart/table appears after text completes)
```

### Error During Response
```
AI Avatar + GenUI/AI Error State
"Analysis couldn't complete. Some data sources are temporarily unavailable."
+ "Try again" action
```

## Conversation Starters (Welcome State)

For new conversations, show 4 suggested prompts tailored to what's most relevant:

```
GenUI/Suggested Prompts Row:
├── "What's my biggest expense this month?"
├── "Am I on track for my savings goals?"
├── "Show me a forecast of my retirement savings"
└── "Analyze my recurring subscriptions"
```

Prompts should rotate based on:
- Time of month (early = "How's my budget looking?", late = "Month-end summary")
- Recent events (large transaction = "Tell me about that $X charge")
- Unread insights (new anomaly = "You noticed something about my spending?")

## Mobile Adaptations
- Chat bubbles: max-width 85% of screen
- Charts in content slot: simplified, 160px max height
- Quick actions: horizontally scrollable row
- Suggested prompts: full-width, stacked vertically
