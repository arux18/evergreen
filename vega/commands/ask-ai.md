# Command: /ask-ai

Open a conversational AI session or send a single question.

**Usage:** `/ask-ai [question]`

No question → opens conversation view with welcome state and suggested prompts.

## Question routing
| Type | Detected by keywords | Skill | Response format |
|---|---|---|---|
| Balance/status | "how much", "what's my", "balance" | `render-conversation` | `Chat Bubble/AI` (text) |
| Spending analysis | "spend", "cost", "expense", "category" | `render-insight` via `render-conversation` | `Chat Bubble/AI Rich` (with chart) |
| Budget check | "budget", "on track", "over" | `render-budget` via `render-conversation` | `Chat Bubble/AI Rich` (with budget rows) |
| Comparison | "compare", "vs", "versus", "difference" | `render-chart` via `render-conversation` | `Chat Bubble/AI Rich` (comparison) |
| Projection | "forecast", "retire", "projection", "what if" | `render-chart` (Monte Carlo) via `render-conversation` | `Chat Bubble/AI Rich` + Disclaimer |
| Recommendation | "how can I", "should I", "optimize", "reduce" | `render-insight` via `render-conversation` | `Chat Bubble/AI Rich` + Recommendation Card |
| General | anything else | `render-conversation` | `Chat Bubble/AI` (text) |

## Options
| Option | Values | Default |
|---|---|---|
| `--device` | `desktop`, `mobile` | `desktop` |
| `--context` | `dashboard`, `transactions`, `budget`, `standalone` | `standalone` |

## Response rules
- Always: confidence indicator if analysis/projection · disclaimer if recommendation/projection · 2–3 follow-up prompts
- Memory: track context across turns; "Show that by week" → "that" = prior analysis
- Don't re-show dismissed insights within the same session
- Escalate depth on request: summary → detail → raw data
