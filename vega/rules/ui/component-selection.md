# Component Selection — Data → Component

Deterministic rules. Not suggestions.

## Single value
| Data | Component |
|---|---|
| Currency with trend | `Component/KPI Card/Value Up` or `Value Down` |
| Currency with sparkline | `KPI Sparkline Card` |
| Currency neutral (no trend) | `Component/KPI Card/Neutral` |
| Percentage with direction | KPI card + badge row |

## Comparisons
| Scenario | Component | Rule |
|---|---|---|
| Two time periods | `GenUI/Comparison Metric` | Label both periods |
| Before/after change | `GenUI/Comparison Metric` | Delta badge with direction |
| Budget vs actual | `GenUI/Budget Category Row` | Progress bar required |
| Multi-metric side-by-side | KPI card row (3–4) | Horizontal, `fill_container` |

## Lists & tables
| Data | Component | Rule |
|---|---|---|
| Recent transactions | `GenUI/Transaction Item` variants | Category icon + merchant + amount |
| Holdings / positions | `Component/Holdings Table` | Asset, price, change, value |
| Budget categories | `GenUI/Budget Category Row` | Progress bar + remaining |
| Account list | `Component/Account Card` or Accordion | Group by type |

## Charts (data shape → chart)
| Shape | Component |
|---|---|
| Part-of-whole | `Donut Chart`, `Pie Chart Card` |
| Time series (1 metric) | `Area Chart`, `Sparkline Pattern` |
| Time series (multi) | `Multi-Series Area Chart` |
| Categorical comparison | `Bar Chart`, `Horizontal Bar Chart` |
| Composition over time | `Stacked Bar Chart` |
| Flow / movement | `Sankey Flow Diagram` |
| Projection / forecast | `Monte Carlo Chart` |
| Threshold / gauge | `Gauge Chart` |
| Hierarchical | `Treemap Chart` |
| Market data | `Candlestick Chart` |
| Waterfall / attribution | `Waterfall Chart` |

## AI-generated content
| Content | Component | Rule |
|---|---|---|
| Proactive insight | `GenUI/AI Insight Card` | Data highlight + actions |
| Actionable recommendation | `GenUI/AI Recommendation Card` | Impact metrics + CTA |
| Conversational text | `GenUI/Chat Bubble/AI` | Text only |
| Response with data | `GenUI/Chat Bubble/AI Rich` | Embeds charts/tables |
| Thinking (<5s) | `GenUI/AI Thinking State` | |
| Long processing (>5s) | `GenUI/AI Progress Bar` | |

## Quick action chips on `$ai.surface`
- Fill: `$ai.chip-surface` (not `$surface.secondary`)
- 1px inside stroke: `$ai.chip-border`
- Leading icon in `$ai.accent`
- Label: `$text.primary`, `$font.size.sm`, weight 500
- Shape: `$radius.full`

For action buttons NOT on `$ai.surface` → use standard `Btn/*` components.

## Composition rules
- **KPI row:** always 3 or 4 cards (never 1, 2, or 5+). Primary metric first. `fill_container` width.
- **Transaction list:** preceded by `GenUI/Filter Row`. Group by date. Max 20 visible → pagination. Pending at top.
- **AI insights section:** max 3 visible → "See all". Highest confidence/impact first. `GenUI/Financial Disclaimer` below projections.
- **Dashboard:** Sidebar (280px) + Main (`fill_container`). Order: KPI row → primary chart → AI insights → recent transactions. Max 2 chart components visible without scrolling.
