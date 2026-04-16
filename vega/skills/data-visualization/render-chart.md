# Skill: Render Chart

Selects chart type by data shape and user intent.

## When
Visualizing financial data. User says "show me", "chart", "graph", "visualize". Insight card needs an embedded viz.

## Chart-type decision tree
```
Part of a whole
 ├── ≤6 categories     → Donut Chart
 ├── >6 categories     → Horizontal Bar Chart (sorted desc)
 └── Hierarchical      → Treemap Chart
Change over time (single)
 ├── Inline/small      → Sparkline Pattern
 ├── Trend focus       → Area Chart
 └── Price/market      → Candlestick Chart
Change over time (multi)
 ├── 2–4 series        → Multi-Series Area Chart
 └── Composition       → Stacked Bar Chart
Comparison (discrete)
 ├── ≤8 categories     → Bar Chart (vertical)
 ├── >8 categories     → Horizontal Bar Chart
 └── Two side-by-side  → Comparison Metric
Projection / probability → Monte Carlo Chart (always)
Flow / movement         → Sankey Flow Diagram
Waterfall / attribution → Waterfall Chart
Single metric health    → Gauge Chart
```

## Color rules
| Data type | Tokens |
|---|---|
| Categorical | `$chart.cat.1` … `$chart.cat.15` in order — never skip, never reuse within one chart |
| Sequential | `$chart.seq.100` (low) → `$chart.seq.800` (high), `$chart.seq.600` for highlight |
| Semantic | `$data.positive` (gain), `$data.negative` (loss), `$data.neutral`, `$data.highlight` |
| Financial categories | `$fin.income`, `$fin.expense`, `$fin.savings`, `$fin.investment`, `$fin.debt` |

## Formatting
- Y-axis currency: abbreviate on axes only ($0, $5K, $10K)
- Y-axis percent: 0%, 25%, 50%, 75%, 100%
- X-axis categories: truncate >12 chars with ellipsis
- Tooltips: exact values ("$14,281.37"), full date ("Apr 7, 2026"), series name if multi-series. Use `Chart Tooltip`.
- Legend: `Chart Legend/Horizontal` for ≤4 series, `Chart Legend/Vertical` for >4. Always include (accessibility).

## States
| State | Display |
|---|---|
| Loading | `GenUI/Skeleton/Chart Area` matching chart dimensions |
| No data | "Not enough data to generate this chart. Check back after [timeframe]." |
| Partial | Available data + `GenUI/AI Error State` noting missing range |
| Error | `GenUI/Error State` in chart container |

## Context-specific
| Context | Max height | Notes |
|---|---|---|
| Dashboard | 300px | One chart visible at a time; default `Area Chart` for net worth/portfolio |
| AI chat bubble | 200px | No legend if single series; minimal axis labels; summary text above |
| Detail view | 400px | Full axis labels, legend, tooltips, summary stats below |

## Monte Carlo (projections)
Always include: `GenUI/Financial Disclaimer` below, confidence bands (P10–P90), target line if goal exists, summary stats (P10 / Median / P90 / Success Rate).
