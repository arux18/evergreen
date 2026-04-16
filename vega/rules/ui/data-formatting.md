# Data Formatting

## Currency
| Context | Format | Example |
|---|---|---|
| Balances, KPI values | `$X,XXX.XX` | $284,392.50 |
| Expense (transaction) | `-$X,XXX.XX` | -$127.43 |
| Income (transaction) | `+$X,XXX.XX` | +$4,250.00 |
| Negative net worth | `-$X,XXX.XX` | -$2,340.00 |
| Small values (<$1) | `$0.XX` | $0.47 |

**Never:** abbreviate (no "$4.2K" unless user chose summary mode), omit cents, omit `$`, or use accounting parens `(…)`.

## Percentages
| Context | Format | Example |
|---|---|---|
| Changes <10% | One decimal | +2.4%, -0.8% |
| Changes ≥10% | Whole number | +23%, -15% |
| Budget utilization | Whole number | 84% |
| Asset allocation | Decimal if <10%, whole if ≥10% | 7.2%, 34% |
| AI confidence | Badges (High/Medium/Low), never numeric | — |

Always: direction prefix (`+` / `-`), baseline context ("+23% vs. 3-month average"), color (only for significant changes).

## Dates
| Context | Format | Example |
|---|---|---|
| Transaction date | `Mon D, YYYY` | Apr 7, 2026 |
| Date range | `Mon D – Mon D, YYYY` | Mar 1 – Apr 9, 2026 |
| Relative recent | Today / Yesterday / `Mon D` | Apr 5 |
| Relative past | "X days ago" / "X weeks ago" | 3 days ago |
| Timestamp | `H:MM AM/PM` | 2:34 PM |
| Last synced | Relative | "3 hours ago" |

**Never:** MM/DD/YYYY (ambiguous), 24-hour time in consumer UI, seconds precision.

## Trend indicators
| Change | Color | Icon | Weight |
|---|---|---|---|
| Significant positive (>1%) | `$data.positive` | arrow-up | Bold |
| Significant negative (>1%) | `$data.negative` | arrow-down | Bold |
| Minor positive (<1%) | `$text.secondary` | arrow-up | Normal |
| Minor negative (<1%) | `$text.secondary` | arrow-down | Normal |
| Neutral / flat | `$data.neutral` | minus | Normal |

## Account numbers
- Mask all but last 4: `····1234` (middle dots, not asterisks)
- Use `$font.mono` (JetBrains Mono)
