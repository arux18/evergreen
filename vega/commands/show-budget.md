# Command: /show-budget

Renders the budget tracking view with category breakdowns and AI analysis.

## Usage
```
/show-budget [options]
```

## Options

| Option | Values | Default | Description |
|---|---|---|---|
| `--period` | `month`, `custom` | Current month | Budget period |
| `--view` | `full`, `summary`, `card` | `full` | Output size |
| `--sort` | `usage`, `amount`, `name` | `usage` | Category sort order |
| `--device` | `desktop`, `mobile` | `desktop` | Target viewport |
| `--state` | `loaded`, `loading`, `error`, `empty` | `loaded` | Render state |

## Examples

```bash
# Full budget view, current month
/show-budget

# Summary card for dashboard embedding
/show-budget --view card

# Mobile budget sorted by amount spent
/show-budget --device mobile --sort amount

# Show what empty state looks like
/show-budget --state empty
```

## Output Views

### `full` — Full Budget Page
Uses `skills/render-budget.md` full layout:
- Progressive disclosure summary at top
- All category rows sorted as specified
- AI analysis section
- Suggested prompts for deeper analysis

### `summary` — Budget Summary
Condensed single-card format:
- Overall % used with progress bar
- Top 3 categories (over-budget first)
- "View Full Budget" CTA

### `card` — Dashboard Card
For embedding in dashboard right column:
- Card header with overall percentage
- Top 4-5 category rows
- Over-budget count if applicable
- "View Full Budget" link

## Execution Flow

1. Parse options
2. Load `skills/render-budget.md`
3. Load `users/psychology.md` (over-budget anxiety)
4. Load `users/edge-cases.md` (zero budget, no transactions)
5. Sort categories by specified order
6. Select row variants (normal vs. over-budget)
7. Generate AI analysis if data available
8. Compose view in requested format
9. Apply device adaptations if mobile
