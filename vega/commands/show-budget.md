# Command: /show-budget

Budget tracking view with category breakdowns and AI analysis.

**Usage:** `/show-budget [options]`

## Options
| Option | Values | Default |
|---|---|---|
| `--period` | `month`, `custom` | current month |
| `--view` | `full`, `summary`, `card` | `full` |
| `--sort` | `usage`, `amount`, `name` | `usage` |
| `--device` | `desktop`, `mobile` | `desktop` |
| `--state` | `loaded`, `loading`, `error`, `empty` | `loaded` |

## Output views
| View | Composition |
|---|---|
| `full` | Full page per `render-budget` — progressive disclosure summary + all category rows + AI analysis + suggested prompts |
| `summary` | Single condensed card — overall % with progress bar + top 3 categories (over-budget first) + "View Full Budget" CTA |
| `card` | Dashboard right column — header + top 4–5 rows + over-budget count + "View Full Budget" link |

Sort order is always: over-budget first, then by `--sort` value within remaining rows.

Skill used: `render-budget`. Rules used: `component-selection`, `data-formatting`.
