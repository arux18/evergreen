# Skill: Render Chart

Generates data visualizations for financial data. Selects the right chart type based on data shape and user intent.

## When to Use
- Agent needs to visualize financial data
- User asks to "show me", "chart", "graph", or "visualize" something
- An insight card needs an embedded visualization

## Required Reading Before Execution
1. `rules/ui/component-selection.md` — chart type selection (Charts & Visualizations table)
2. `rules/visual/token-usage.md` — chart color tokens
3. `users/psychology.md` — calm presentation, gain-first
4. `rules/ui/data-formatting.md` — axis labels, tooltips

## Chart Type Decision Tree

```
What shape is the data?
├── Part of a whole (allocation, breakdown)
│   ├── ≤6 categories → Donut Chart
│   ├── >6 categories → Horizontal Bar Chart (sorted descending)
│   └── Hierarchical → Treemap Chart
├── Change over time (single metric)
│   ├── Inline/small → Sparkline Pattern
│   ├── Trend focus → Area Chart
│   └── Price/market data → Candlestick Chart
├── Change over time (multiple metrics)
│   ├── 2-4 series → Multi-Series Area Chart
│   └── Composition → Stacked Bar Chart
├── Comparison (discrete categories)
│   ├── ≤8 categories → Bar Chart (vertical)
│   ├── >8 categories → Horizontal Bar Chart
│   └── Two values side-by-side → Comparison Metric component
├── Projection / probability
│   └── Always → Monte Carlo Chart
├── Flow / movement
│   └── Money flow → Sankey Flow Diagram
├── Attribution / waterfall
│   └── Net worth change breakdown → Waterfall Chart
└── Single metric health
    └── Budget utilization → Gauge Chart
```

## Color Rules

### Categorical Data (different items)
Use `$chart.cat.1` through `$chart.cat.15` in order:
1. `$chart.cat.1` (#8951F0) — purple
2. `$chart.cat.2` (#06B6D4) — cyan
3. `$chart.cat.3` — indigo
4. `$chart.cat.4` (#3B82F6) — blue
5. `$chart.cat.5` — teal
...and so on. Never skip numbers. Never reuse within one chart.

### Sequential Data (intensity scale)
Use `$chart.seq.50` through `$chart.seq.900`:
- Low values: `$chart.seq.100` (lightest)
- High values: `$chart.seq.800` (darkest)
- Highlighted value: `$chart.seq.600`

### Semantic Data (positive/negative)
- Gains/growth: `$data.positive`
- Losses/decline: `$data.negative`
- Neutral/baseline: `$data.neutral`
- Highlighted point: `$data.highlight`

### Financial Category Colors
When chart categories map to financial types:
- Income items: `$fin.income`
- Expense items: `$fin.expense`
- Savings items: `$fin.savings`
- Investment items: `$fin.investment`
- Debt items: `$fin.debt`

## Chart Anatomy

Every chart component must include:

```
Chart Container (card with border)
├── Chart Header
│   ├── Title (text.primary, 14-16px, semibold)
│   ├── Subtitle or date range (text.secondary, 12px)
│   └── (optional) Time period selector tabs
├── Chart Legend (horizontal or vertical)
│   └── Color dot + label for each series
├── Chart Body
│   ├── Y-axis labels (text.tertiary, 11px)
│   ├── X-axis labels (text.tertiary, 11px)
│   ├── Grid lines (border.primary, 0.5px, dashed)
│   └── Data visualization
├── (optional) Chart Tooltip on hover/tap
│   └── Date + values with formatting
└── (optional) Summary stats row below chart
```

## Formatting Rules

### Axis Labels
- Y-axis (currency): $0, $5K, $10K, $15K (abbreviate on axes only)
- Y-axis (percentage): 0%, 25%, 50%, 75%, 100%
- X-axis (time): Jan, Feb, Mar... or Q1, Q2... or 2023, 2024...
- X-axis (categories): Full names, truncate with ellipsis if >12 chars

### Tooltips
- Always show exact values (not abbreviated): "$14,281.37"
- Always show the date: "Apr 7, 2026"
- Always show the series name if multi-series
- Use `Chart Tooltip` component

### Legend
- Use `Chart Legend/Horizontal` for ≤4 series
- Use `Chart Legend/Vertical` for >4 series
- Always include legend (never rely on color alone — accessibility)

## States

| State | Display |
|---|---|
| Loading | `GenUI/Skeleton/Chart Area` matching chart dimensions |
| No data | "Not enough data to generate this chart. Check back after [timeframe]." |
| Partial data | Show available data + `GenUI/AI Error State` noting missing range |
| Error | `GenUI/Error State` within chart container |

## Context-Specific Rules

### In Dashboard
- Maximum chart height: 300px
- Single chart visible at a time (don't stack charts)
- Default to Area Chart for net worth / portfolio value

### In AI Response (Chat Bubble)
- Maximum chart height: 200px
- Simplified: no legend if single series, minimal axis labels
- Always include summary text above the chart

### In Detail View
- Full-width, up to 400px height
- Full axis labels, legend, and tooltip support
- Include summary stats row below

### Projections (Monte Carlo)
- ALWAYS include `GenUI/Financial Disclaimer` below
- ALWAYS show confidence bands (P10-P90)
- ALWAYS include target line if goal exists
- Show summary stats: P10 (worst), Median, P90 (best), Success Rate
