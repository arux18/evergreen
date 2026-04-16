# User Personas

| Persona | Frequency | Primary Goal | Session | Primary UI Pattern |
|---|---|---|---|---|
| **Anxious Checker** (Sarah) | Daily | "Am I okay?" | 15–30s | Dashboard KPI row — skeleton must match loaded layout exactly, no layout shift |
| **Optimizer** (Marcus) | Weekly | "What should I do?" | 5–15min | AI Recommendation Card with quantified impact; every insight has "View Details" drill-down |
| **Set-and-Forgetter** (Priya) | Monthly | "Am I on track?" | 2–5min | AI Insight Card as primary touchpoint; single-screen monthly summary |
| **Crisis Responder** (David) | Sporadic (life events) | "Help me plan" | 15–30min | Error/loading states must be flawless; real-progress bars; no permission gates in flow |

## Key rules derived from personas

- Sub-$50 daily changes use `$text.secondary`, never `$data.negative` (Sarah)
- AI Recommendation Cards must always include impact numbers in dollars (Marcus)
- Budget Category Rows must show on-track vs over-budget at a glance (Priya)
- Never show upsells or permission-gated features during high-anxiety flows (David)
