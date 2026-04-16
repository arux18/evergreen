# Accessibility Rules (WCAG 2.1 AA minimum — enforced)

## Contrast (minimum)
| Element | Ratio |
|---|---|
| Body text | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| UI components, borders, non-text icons | 3:1 |

## Color is never the only indicator
- Trend: color + arrow icon (up/down/minus) + text label ("+2.4%")
- Budget progress: color fill + percentage text
- Charts: legend + pattern/shape, not color alone
- All tokens support light/dark — never hardcode hex

## Typography minimums
| Context | Min | Token |
|---|---|---|
| Body text | 14px | `$font.size.md` |
| Small labels | 11px | `$font.size.xs` |
| Absolute floor | 10px | — |
| Financial values | 14px | — |

Line height: body 1.4–1.5; multi-line descriptions always `lineHeight: 1.5`.

## Touch / click targets
| Element | Min |
|---|---|
| Buttons, icon buttons | 44×44px (tap target; icon can be smaller) |
| List items | 44px height (whole row is target) |
| Filter chips | 32px height with adequate padding |
| Checkboxes / toggles | 44×44px tap target |

Gaps: 8px min between adjacent interactive elements; 12px+ between destructive and safe actions.

## Screen reader patterns
| Visual | Announcement |
|---|---|
| +2.4% | "increased by two point four percent" |
| -$1,247.80 | "decreased by one thousand two hundred forty-seven dollars and eighty cents" |
| 84% (budget) | "eighty-four percent of budget used" |
| Green up arrow | "trending up" (via aria-label) |

Component announcement patterns: `KPI Card` → "[Label]: [Value], [trend] [change]". `Transaction Item` → "[Merchant], [category], [amount], [date]". `AI Insight` → "AI Insight: [title]. [body]". Loading → "Loading [content type]…". Error → "Error: [title]. [description]. [actions]".

## Focus
- Visible ring on every interactive element: `$border.focus`, ≥2px, 3:1 contrast against adjacent colors
- Order: sidebar → header actions → KPI row (L→R) → main content (top→bottom, L→R) → secondary actions

## Motion
- All animations respect `prefers-reduced-motion: reduce` → instant transitions, no shimmer
- Use `$motion.*` tokens so motion can be globally disabled
- Never use motion as the only way to convey information
- Loading: subtle shimmer only (never pulse). Chart transitions: fade (never bounce/spring). Values: brief highlight (never flash).
