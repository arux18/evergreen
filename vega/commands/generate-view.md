# Command: /generate-view

Generates a complete UI view based on the specified view type and data context.

## Usage
```
/generate-view <view-type> [options]
```

## View Types

| Type | Skill | Description |
|---|---|---|
| `dashboard` | `render-dashboard` | Full dashboard with KPIs, chart, insights, transactions |
| `transactions` | `render-transaction-list` | Transaction list with filters |
| `budget` | `render-budget` | Budget tracking with category breakdown |
| `conversation` | `render-conversation` | Chat interface with AI assistant |
| `insight` | `render-insight` | Standalone insight detail view |
| `portfolio` | `render-dashboard` (variant) | Investment-focused dashboard |
| `goals` | `render-budget` (variant) | Savings goals progress view |

## Options

| Option | Values | Default | Description |
|---|---|---|---|
| `--device` | `desktop`, `mobile` | `desktop` | Target viewport (1440px or 390px) |
| `--theme` | `light`, `dark` | `light` | Color theme |
| `--density` | `compact`, `comfortable`, `spacious` | `comfortable` | Information density |
| `--state` | `loaded`, `loading`, `error`, `empty` | `loaded` | Which state to render |
| `--account` | account name/id | all | Filter to specific account |
| `--period` | `today`, `week`, `month`, `quarter`, `year`, `custom` | `month` | Time period |

## Examples

```bash
# Full desktop dashboard, loaded state
/generate-view dashboard

# Mobile transaction list for this month
/generate-view transactions --device mobile --period month

# Budget page showing loading state
/generate-view budget --state loading

# Dark mode dashboard
/generate-view dashboard --theme dark

# Compact density for power users
/generate-view transactions --density compact
```

## Execution Flow

1. Parse view type and options
2. Load the corresponding skill from `skills/`
3. Read required rule files (each skill specifies which)
4. Read `users/psychology.md` and `users/edge-cases.md` (always)
5. Generate the component composition following the skill layout
6. Apply device-specific adaptations if `--device mobile`
7. Apply theme if `--theme dark`
8. Apply density tokens if `--density` specified
9. Validate against `rules/accessibility/accessibility.md`
10. Return the generated view

## State Generation

When `--state` is specified, generate the view in that state:

- `loaded` — Full data, happy path
- `loading` — All skeleton loaders, no real data
- `error` — Error states on data-dependent sections
- `empty` — Empty states (new user, no data)

When no state is specified, generate `loaded` by default. The skill files document which components to use for each state.
