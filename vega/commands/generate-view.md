# Command: /generate-view

Generate a complete UI view from the specified view type and data context.

**Usage:** `/generate-view <view-type> [options]`

## View types
| Type | Skill |
|---|---|
| `dashboard` | `render-dashboard` |
| `transactions` | `render-transaction-list` |
| `budget` | `render-budget` |
| `conversation` | `render-conversation` |
| `insight` | `render-insight` |
| `portfolio` | `render-dashboard` (variant) |
| `goals` | `render-budget` (variant) |

## Options
| Option | Values | Default |
|---|---|---|
| `--device` | `desktop` (1440px), `mobile` (390px) | `desktop` |
| `--theme` | `light`, `dark` | `light` |
| `--density` | `compact`, `comfortable`, `spacious` | `comfortable` |
| `--state` | `loaded`, `loading`, `error`, `empty` | `loaded` |
| `--account` | account name/id | all |
| `--period` | `today`, `week`, `month`, `quarter`, `year`, `custom` | `month` |

## State semantics
| `--state` | What to render |
|---|---|
| `loaded` | Full data, happy path |
| `loading` | Skeleton loaders, no real data |
| `error` | Error states on data-dependent sections |
| `empty` | Empty states (new user, no data) |

Each skill specifies its loading/error/empty components in its States table.
