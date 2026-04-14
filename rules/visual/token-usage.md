# Token Usage Rules

These rules ensure every generated UI uses the design system tokens consistently. Hardcoded values are never acceptable.

## Color Token Selection

### Backgrounds
| Context | Token | Hex (light) |
|---|---|---|
| Page background | `$surface.primary` | #FFFFFF |
| Card/component background | `$surface.primary` | #FFFFFF |
| Secondary/nested background | `$surface.secondary` | #F5F5F5 |
| Highlighted/active section | `$surface.tertiary` | #EBEBEB |
| AI-generated content | `$ai.surface` | #F8F7FF |
| AI action chips (on ai.surface) | `$ai.chip-surface` | #FFFFFF |
| Elevated overlay (modal, dropdown) | `$surface.elevated` | #FFFFFF |

### Text
| Context | Token |
|---|---|
| Primary headings and values | `$text.primary` |
| Body text, descriptions | `$text.secondary` |
| Labels, metadata, timestamps | `$text.tertiary` |
| Links and interactive text | `$text.accent` |
| Text on accent-colored backgrounds | `$text.on-accent` |
| Text on dark/inverse backgrounds | `$text.inverse` |

### Financial Semantics
| Context | Foreground Token | Background Token |
|---|---|---|
| Income/deposits | `$fin.income` | `$fin.income-bg` |
| Expenses/withdrawals | `$fin.expense` | `$fin.expense-bg` |
| Savings/goals | `$fin.savings` | `$fin.savings-bg` |
| Investments/portfolio | `$fin.investment` | `$fin.investment-bg` |
| Debt/liabilities | `$fin.debt` | `$fin.debt-bg` |

### Data Visualization
| Context | Token |
|---|---|
| Positive trend/gain | `$data.positive` |
| Negative trend/loss | `$data.negative` |
| Neutral/unchanged | `$data.neutral` |
| Highlighted data point | `$data.highlight` |
| Chart categorical series | `$chart.cat.1` through `$chart.cat.15` |
| Chart sequential scale | `$chart.seq.50` through `$chart.seq.900` |

### Status
| Context | Foreground | Background |
|---|---|---|
| Success/complete | `$status.success` | `$status.success-bg` |
| Warning/caution | `$status.warning` | `$status.warning-bg` |
| Error/failure | `$status.error` | `$status.error-bg` |
| Info/neutral | `$status.info` | `$status.info-bg` |

## Typography

| Element | Font Family | Size Token | Weight |
|---|---|---|---|
| Page titles | `$font.primary` (Heebo) | `$font.size.2xl`–`$font.size.3xl` | 700 |
| Section headings | `$font.primary` | `$font.size.lg`–`$font.size.xl` | 600 |
| Card titles | `$font.primary` | `$font.size.md`–`$font.size.lg` | 600 |
| Body text | `$font.primary` | `$font.size.md` | 400 |
| Small labels | `$font.primary` | `$font.size.sm`–`$font.size.xs` | 500 |
| Financial values (large) | `$font.secondary` (Cormorant Garamond) | `$font.size.2xl`–`$font.size.3xl` | normal |
| Financial values (inline) | `$font.primary` | `$font.size.md` | 600 |
| Masked account numbers | `$font.mono` (JetBrains Mono) | `$font.size.sm` | 400 |

## Spacing

| Context | Token |
|---|---|
| Page padding | `$space.8` (32px) |
| Section gap | `$space.6` (24px) |
| Card internal padding | `$space.5`–`$space.6` (20–24px) |
| Card grid gap | `$space.4` (16px) |
| Form field gap | `$space.4` (16px) |
| Button group gap | `$space.3` (12px) |
| Tight element gap | `$space.2` (8px) |
| Minimal gap | `$space.1` (4px) |

## Border Radius

| Element | Token |
|---|---|
| Cards, modals | `$radius.xl` (12px) |
| Buttons, inputs | `$radius.md` (6px) |
| Badges, chips | `$radius.full` (9999px) |
| Small elements, tags | `$radius.sm` (4px) |
| Chart containers | `$radius.lg` (8px) |

## Shadows
- Cards at rest: no shadow (border only)
- Modals/dialogs: `shadow` effect with `$shadow.color`, blur 24, offset y:8
- Dropdowns: `shadow` effect with `$shadow.color`, blur 16, offset y:4
- Tooltips: `shadow` effect with `$shadow.color`, blur 8, offset y:2
