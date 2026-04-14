# Data Formatting Rules

Consistent formatting builds trust. These rules apply everywhere — no exceptions.

## Currency

| Context | Format | Example |
|---|---|---|
| Account balances | `$X,XXX.XX` | $14,281.37 |
| Transaction amounts (expense) | `-$X,XXX.XX` | -$127.43 |
| Transaction amounts (income) | `+$X,XXX.XX` | +$4,250.00 |
| KPI card values | `$XXX,XXX.XX` | $284,392.50 |
| Small values (<$1) | `$0.XX` | $0.47 |
| Negative net worth | `-$X,XXX.XX` | -$2,340.00 |

### Never Do
- Never abbreviate: no "$4.2K" or "$1.2M" unless the user has explicitly set summary mode
- Never omit cents: $4,281 is wrong, $4,281.00 is correct
- Never omit the dollar sign
- Never use parentheses for negatives: ($127.43) is accounting notation, not consumer UI

## Percentages

| Context | Format | Example |
|---|---|---|
| Small changes (<10%) | One decimal place | +2.4%, -0.8% |
| Large changes (>=10%) | Whole number | +23%, -15% |
| Budget utilization | Whole number | 84% |
| Asset allocation | One decimal if <10%, whole if >=10% | 7.2%, 34% |
| AI confidence | Not shown as number — use confidence badges | High/Medium/Low |

### Always Include
- Direction indicator: always prefix with + or -
- Comparison baseline: "+23% vs. 3-month average" not just "+23%"
- Color coding: positive = `$data.positive`, negative = `$data.negative` (only for significant changes)

## Dates

| Context | Format | Example |
|---|---|---|
| Transaction date | `Mon D, YYYY` | Apr 7, 2026 |
| Date range | `Mon D – Mon D, YYYY` | Mar 1 – Apr 9, 2026 |
| Relative recent | `Today`, `Yesterday`, `Mon D` | Today, Yesterday, Apr 5 |
| Relative past | `X days ago`, `X weeks ago` | 3 days ago |
| Timestamp | `H:MM AM/PM` | 2:34 PM |
| Last synced | Relative | "Just now", "3 hours ago", "Yesterday" |

### Never Do
- Never use MM/DD/YYYY format (ambiguous internationally)
- Never use 24-hour time in consumer UI
- Never show seconds precision

## Large Numbers

| Range | Display | Example |
|---|---|---|
| <$1,000 | Full with cents | $847.50 |
| $1,000 – $999,999 | Full with commas and cents | $284,392.50 |
| $1M – $999M | Full with commas and cents | $1,284,392.50 |
| >$1B | Not applicable for personal finance | — |

## Trend Indicators

| Change | Color Token | Icon | Text Treatment |
|---|---|---|---|
| Significant positive (>1%) | `$data.positive` | arrow-up | Bold weight |
| Significant negative (>1%) | `$data.negative` | arrow-down | Bold weight |
| Minor positive (<1%) | `$text.secondary` | arrow-up | Normal weight |
| Minor negative (<1%) | `$text.secondary` | arrow-down | Normal weight |
| Neutral / flat | `$data.neutral` | minus | Normal weight |

## Account Number Masking
- Always mask: show last 4 digits only
- Format: `····1234` (using middle dots, not asterisks)
- Use `$font.mono` (JetBrains Mono) for masked numbers
