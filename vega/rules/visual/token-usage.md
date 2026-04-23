# Token Usage

Hardcoded values are never acceptable. All selections below.

## Backgrounds
| Context | Token |
|---|---|
| Page / card | `$surface.primary` |
| Secondary / nested | `$surface.secondary` |
| Highlighted / active | `$surface.tertiary` |
| AI-generated content | `$ai.surface` |
| AI action chips on `$ai.surface` | `$ai.chip-surface` |
| Modal / dropdown overlay | `$surface.elevated` |

## Text
| Context | Token |
|---|---|
| Primary headings, values | `$text.primary` |
| Body, descriptions | `$text.secondary` |
| Labels, metadata, timestamps | `$text.tertiary` |
| Links, interactive text | `$text.accent` |
| Accent text hover | `$text.accent-hover` |
| Accent text pressed | `$text.accent-pressed` |
| Destructive text (delete labels, error) | `$text.destructive` |
| Destructive text hover | `$text.destructive-hover` |
| Destructive text pressed | `$text.destructive-pressed` |
| On accent background | `$text.on-accent` |
| On destructive background | `$text.on-destructive` |
| On dark/inverse | `$text.inverse` |

## Icons
| Context | Token |
|---|---|
| Default icon (matches text colour) | `$text.secondary` / `$text.primary` |
| Accent icon (ghost / link) | `$icon.accent` |
| Accent icon hover | `$icon.accent-hover` |
| Accent icon pressed | `$icon.accent-pressed` |
| Destructive icon | `$icon.destructive` |
| Destructive icon hover | `$icon.destructive-hover` |
| Destructive icon pressed | `$icon.destructive-pressed` |
| Icon on destructive fill | `$icon.on-destructive` |

## Accent / Destructive fills (buttons, selections)
| Context | Accent | Destructive |
|---|---|---|
| Default fill | `$accent.default` | `$destructive.default` |
| Hover fill | `$accent.hover` | `$destructive.hover` |
| Pressed fill | `$accent.pressed` (fill: `blue.900` in light and dark — matches `gen-ui-design-system.lib.pen`) | `$destructive.pressed` |
| Subtle wash / selected bg | `$accent.subtle` | `$destructive.subtle` |
| Border | `$border.accent` | `$destructive.default` |

## Financial semantics
| Type | FG | BG |
|---|---|---|
| Income | `$fin.income` | `$fin.income-bg` |
| Expense | `$fin.expense` | `$fin.expense-bg` |
| Savings | `$fin.savings` | `$fin.savings-bg` |
| Investment | `$fin.investment` | `$fin.investment-bg` |
| Debt | `$fin.debt` | `$fin.debt-bg` |

## Data viz
| Context | Token |
|---|---|
| Positive / gain | `$data.positive` |
| Negative / loss | `$data.negative` |
| Neutral / unchanged | `$data.neutral` |
| Highlighted point | `$data.highlight` |
| Chart categorical | `$chart.cat.1`–`$chart.cat.15` (in order, never skip or reuse within one chart) |
| Chart sequential | `$chart.seq.50`–`$chart.seq.900` (low→high intensity) |

## Status
| Type | FG | BG |
|---|---|---|
| Success | `$status.success` | `$status.success-bg` |
| Warning | `$status.warning` | `$status.warning-bg` |
| Error | `$status.error` | `$status.error-bg` |
| Info | `$status.info` | `$status.info-bg` |

> Status tokens describe UI state (validation / system messages). Use `$destructive.*` for destructive UI actions (delete buttons), and `$data.*` / `$fin.*` for financial value semantics. Never reuse `$status.error` for delete-button fills or losses.

## Typography
| Element | Family | Size | Weight |
|---|---|---|---|
| Page titles | `$font.primary` (Heebo) | `$font.size.2xl`–`3xl` | 700 |
| Section headings | `$font.primary` | `$font.size.lg`–`xl` | 600 |
| Card titles | `$font.primary` | `$font.size.md`–`lg` | 600 |
| Body | `$font.primary` | `$font.size.md` | 400 |
| Small labels | `$font.primary` | `$font.size.sm`–`xs` | 500 |
| Large financial values | `$font.secondary` (Cormorant Garamond) | `$font.size.2xl`–`3xl` | normal |
| Inline financial values | `$font.primary` | `$font.size.md` | 600 |
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

## Radius
| Element | Token |
|---|---|
| Cards, modals | `$radius.xl` (12px) |
| Buttons, inputs | `$radius.md` (6px) |
| Badges, chips | `$radius.full` (9999px) |
| Small tags | `$radius.sm` (4px) |
| Chart containers | `$radius.lg` (8px) |

## Shadows
- Cards at rest: none (border only)
- Modals: `$shadow.color`, blur 24, offset y:8
- Dropdowns: `$shadow.color`, blur 16, offset y:4
- Tooltips: `$shadow.color`, blur 8, offset y:2
