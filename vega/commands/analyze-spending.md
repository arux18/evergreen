# Command: /analyze-spending

Triggers an AI spending analysis and renders the results as insight cards with supporting visualizations.

## Usage
```
/analyze-spending [category] [options]
```

## Parameters

| Parameter | Description | Default |
|---|---|---|
| `category` | Specific spending category to analyze | All categories |

## Options

| Option | Values | Default | Description |
|---|---|---|---|
| `--period` | `month`, `quarter`, `year`, `custom` | `month` | Analysis time period |
| `--compare` | `previous`, `average`, `budget` | `average` | Comparison baseline |
| `--format` | `insight`, `chat`, `detail` | `insight` | Output format |
| `--device` | `desktop`, `mobile` | `desktop` | Target viewport |

## Examples

```bash
# Analyze all spending this month vs. 3-month average
/analyze-spending

# Analyze dining spending this quarter
/analyze-spending dining --period quarter

# Analyze groceries compared to budget, in chat format
/analyze-spending groceries --compare budget --format chat

# Full detail view of subscription spending
/analyze-spending subscriptions --format detail
```

## Output Formats

### `insight` (default)
Renders a standalone `GenUI/AI Insight Card` with:
- Observation text (what changed)
- Highlight row (this period, baseline, delta)
- Action buttons
- AI Confidence indicator
- Financial Disclaimer (if projections included)

### `chat`
Renders inside a `GenUI/Chat Bubble/AI Rich` with:
- Summary text
- Embedded chart (bar chart by category, or area chart for trend)
- Quick action chips for follow-up
- Suggested prompts

### `detail`
Renders a full-page analysis view:
- Summary KPI cards (total spent, vs budget, vs last period)
- Category breakdown chart (Donut or Horizontal Bar)
- Time trend chart (spending over weeks/months)
- Top transactions table (largest in period)
- AI recommendations (if savings opportunities found)
- Related insights

## Execution Flow

1. Parse category and options
2. Load `skills/render-insight.md`
3. Load `rules/ui/data-formatting.md` for number formatting
4. Load `rules/ui/content-voice.md` for text generation
5. Analyze spending data against comparison baseline
6. Determine confidence level based on data availability
7. Select chart type using `skills/render-chart.md` decision tree
8. Generate insight text following content-voice patterns
9. Compose output in requested format
10. Add confidence indicator and disclaimer if applicable

## Content Generation

### Observation Pattern
"Your [category] expenses [increased/decreased] [X]% this [period] compared to your [baseline]. This is primarily driven by [N] transactions [qualifier]."

### Qualifier Examples
- "over $75 in the last two weeks"
- "at [merchant name] (5 transactions totaling $X)"
- "in the [subcategory] subcategory"

### Comparison Baselines
| `--compare` value | Label | Calculation |
|---|---|---|
| `previous` | "vs. last [period]" | Same category, previous period |
| `average` | "vs. [N]-month average" | Rolling average (3-month default) |
| `budget` | "vs. budget" | Against set budget limit |
