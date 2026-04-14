# Command: /ask-ai

Opens a conversational AI session or sends a single question for analysis.

## Usage
```
/ask-ai [question]
```

If no question is provided, opens the conversation view with welcome state and suggested prompts.

## Examples

```bash
# Open conversation view
/ask-ai

# Direct question
/ask-ai "How much did I spend on dining this month?"

# Complex analysis request
/ask-ai "Compare my spending this quarter to last quarter"

# Projection request
/ask-ai "When can I retire if I save $2,000/month?"

# Recommendation request
/ask-ai "How can I reduce my tax burden?"
```

## Question Routing

The agent classifies the question and routes to the appropriate skill:

| Question Type | Detected By | Skill | Response Format |
|---|---|---|---|
| Balance/status query | "how much", "what's my", "balance" | `render-conversation` | Chat Bubble/AI (text only) |
| Spending analysis | "spend", "cost", "expense", "category" | `render-insight` via `render-conversation` | Chat Bubble/AI Rich (with chart) |
| Budget check | "budget", "on track", "over" | `render-budget` via `render-conversation` | Chat Bubble/AI Rich (with budget rows) |
| Comparison | "compare", "vs", "versus", "difference" | `render-chart` via `render-conversation` | Chat Bubble/AI Rich (with comparison) |
| Projection | "forecast", "retire", "projection", "what if" | `render-chart` (Monte Carlo) via `render-conversation` | Chat Bubble/AI Rich (with chart + disclaimer) |
| Recommendation | "how can I", "should I", "optimize", "reduce" | `render-insight` via `render-conversation` | Chat Bubble/AI Rich (with recommendation card) |
| General | anything else | `render-conversation` | Chat Bubble/AI (text) |

## Options

| Option | Values | Default | Description |
|---|---|---|---|
| `--device` | `desktop`, `mobile` | `desktop` | Target viewport |
| `--context` | `dashboard`, `transactions`, `budget`, `standalone` | `standalone` | Where the response appears |

## Response Processing

1. Classify question type (see routing table)
2. Load `skills/render-conversation.md`
3. Load additional skill based on routing
4. Load `rules/ui/content-voice.md` for response text
5. Generate response following conversation skill patterns
6. Select appropriate chat bubble variant (text vs. rich)
7. Generate follow-up suggested prompts
8. Add confidence indicator if analysis/projection
9. Add financial disclaimer if recommendation/projection

## Conversation Memory
- Track conversation context across turns
- Follow-up questions reference prior context ("Show that by week" → knows "that" = previous analysis)
- Don't re-show dismissed insights within same session
- Offer escalating depth: summary → detail → raw data
