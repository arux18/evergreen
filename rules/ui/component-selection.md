# Component Selection Rules

When the agent generates UI, it must select components based on data type, user intent, and context. These rules are deterministic — not suggestions.

## Data Type → Component Mapping

### Single Value Display
| Data characteristic | Component | Example |
|---|---|---|
| Currency with trend | `Component/KPI Card/Value Up` or `Value Down` | Portfolio value with daily change |
| Currency with sparkline | `KPI Sparkline Card` | Monthly revenue with mini trend |
| Currency neutral (no trend) | `Component/KPI Card/Neutral` | Total return since inception |
| Percentage with direction | Use KPI card + badge row | "18.7% total return" |

### Comparisons
| Scenario | Component | Rule |
|---|---|---|
| Two time periods | `GenUI/Comparison Metric` | Always label both periods explicitly |
| Before/after a change | `GenUI/Comparison Metric` | Show delta badge with direction |
| Budget vs. actual | `GenUI/Budget Category Row` | Progress bar required |
| Multiple metrics side-by-side | KPI card row (3-4 cards) | Use horizontal layout, fill_container width |

### Lists & Tables
| Data | Component | Rule |
|---|---|---|
| Recent transactions | `GenUI/Transaction Item` variants | Always show category icon + merchant + amount |
| Holdings/positions | `Component/Holdings Table` | Must include asset name, price, change, value |
| Budget categories | `GenUI/Budget Category Row` | Must include progress bar + remaining amount |
| Account list | `Component/Account Card` or Accordion | Group by account type |

### Charts & Visualizations
| Data shape | Component | When to use |
|---|---|---|
| Part-of-whole | `Donut Chart`, `Pie Chart Card` | Spending by category, asset allocation |
| Time series (1 metric) | `Area Chart`, `Sparkline Pattern` | Portfolio value over time |
| Time series (multi) | `Multi-Series Area Chart` | Comparing multiple accounts |
| Categorical comparison | `Bar Chart`, `Horizontal Bar Chart` | Monthly spending by category |
| Composition over time | `Stacked Bar Chart` | Income vs. expense by month |
| Flow/movement | `Sankey Flow Diagram` | Money flow between accounts |
| Projection/forecast | `Monte Carlo Chart` | Retirement projections |
| Threshold/gauge | `Gauge Chart` | Budget utilization |
| Hierarchical | `Treemap Chart` | Spending hierarchy |
| Market data | `Candlestick Chart` | Stock/crypto price action |
| Waterfall/attribution | `Waterfall Chart` | Net worth change attribution |

### AI-Generated Content
| Content type | Component | Rule |
|---|---|---|
| Proactive insight | `GenUI/AI Insight Card` | Must include data highlight + actions |
| Actionable recommendation | `GenUI/AI Recommendation Card` | Must include impact metrics + CTA |
| Conversational response | `GenUI/Chat Bubble/AI` | For text-only responses |
| Response with data | `GenUI/Chat Bubble/AI Rich` | For responses that include charts/tables |
| Thinking/processing | `GenUI/AI Thinking State` | For operations <5s |
| Long processing | `GenUI/AI Progress Bar` | For operations >5s |

## Quick Action Chips

When placing interactive chips on an `$ai.surface` background (inside chat bubbles, insight cards, etc.):
- Use `$ai.chip-surface` fill (not `$surface.secondary` — insufficient contrast on ai.surface)
- Use `$ai.chip-border` as a 1px inside stroke
- Include a leading icon in `$ai.accent` to signal interactivity
- Use `$text.primary` for label text, `$font.size.sm`, weight 500
- Pill shape: `$radius.full`

For action buttons NOT on ai.surface (on cards, dialogs, pages), use the standard `Btn/*` components instead.

## Composition Rules

### KPI Row
- Always 3 or 4 cards, never 1 or 2 or 5+
- First card should be the primary metric (portfolio total, net worth)
- Cards must use `fill_container` width for equal distribution

### Transaction List
- Always preceded by a `GenUI/Filter Row`
- Group by date with date headers
- Maximum 20 visible transactions before pagination/load-more
- Pending transactions appear at top, visually distinguished

### AI Insights Section
- Maximum 3 visible insights before "See all"
- Highest confidence/impact first
- Always include a `GenUI/Financial Disclaimer` below AI projections

### Dashboard Layout
- Sidebar (280px) + Main content (fill_container)
- Main content order: KPI row → Primary chart → AI insights → Recent transactions
- Never show more than 2 chart components visible simultaneously without scrolling
