# Command: /analyze-spending

AI spending analysis rendered as insight cards with supporting viz.

**Usage:** `/analyze-spending [category] [options]`

## Options
| Option | Values | Default |
|---|---|---|
| `category` | any spending category | all |
| `--period` | `month`, `quarter`, `year`, `custom` | `month` |
| `--compare` | `previous`, `average`, `budget` | `average` |
| `--format` | `insight`, `chat`, `detail` | `insight` |
| `--device` | `desktop`, `mobile` | `desktop` |

## Output formats

| Format | Component composition |
|---|---|
| `insight` | `GenUI/AI Insight Card`: observation + highlight row (this period · baseline · delta) + actions + AI Confidence + Disclaimer (if projection) |
| `chat` | `GenUI/Chat Bubble/AI Rich`: summary + embedded chart (bar by category, area for trend) + quick-action chips + suggested prompts |
| `detail` | Full page: KPI cards (total spent · vs budget · vs last period) + category breakdown (Donut or Horizontal Bar) + time trend chart + top transactions table + AI recommendations + related insights |

## Content

**Observation pattern:** "Your [category] expenses [increased/decreased] [X]% this [period] compared to your [baseline]. This is primarily driven by [N] transactions [qualifier]."

**Qualifier examples:** "over $75 in the last two weeks" · "at [merchant] (5 transactions totaling $X)" · "in the [subcategory] subcategory"

## Comparison baselines
| `--compare` | Label | Calculation |
|---|---|---|
| `previous` | "vs. last [period]" | Same category, previous period |
| `average` | "vs. [N]-month average" | Rolling average (3-month default) |
| `budget` | "vs. budget" | Against set budget limit |

Skills used: `render-insight`, `render-chart`. Rules used: `content-voice`, `data-formatting`.
