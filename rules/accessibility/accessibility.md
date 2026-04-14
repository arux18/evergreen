# Accessibility Rules

Accessibility is not optional. Every generated component must meet WCAG 2.1 AA. These rules are enforced, not aspirational.

## Color & Contrast

### Minimum Contrast Ratios
| Element | Minimum Ratio | Standard |
|---|---|---|
| Body text on backgrounds | 4.5:1 | WCAG AA |
| Large text (18px+ or 14px+ bold) | 3:1 | WCAG AA |
| UI components and borders | 3:1 | WCAG AA |
| Non-text indicators (icons) | 3:1 | WCAG AA |

### Color Must Not Be the Only Indicator
Financial data uses color semantically (green = gain, red = loss). This is insufficient alone:
- **Always pair color with icons**: arrow-up for positive, arrow-down for negative, minus for neutral
- **Always pair color with text labels**: "+2.4%" not just a green number
- **Budget progress bars**: include percentage text alongside color fill
- **Chart data**: include legends with pattern/shape differentiation, not just color

### Dark Mode Considerations
All tokens support light/dark themes. The agent must:
- Never hardcode hex colors — always use token variables
- Test that `$data.positive` and `$data.negative` maintain contrast in both modes
- Ensure `$ai.surface` provides sufficient contrast for text in dark mode

## Typography

### Minimum Sizes
| Context | Minimum Size | Token |
|---|---|---|
| Body text | 14px | `$font.size.md` |
| Small labels/metadata | 11px | `$font.size.xs` |
| Never go below | 10px | — |
| Financial values | 14px minimum | — |

### Line Height
- Body text: 1.4–1.5 line-height ratio
- Financial values: default (no line-height override)
- Multi-line descriptions: always set `lineHeight: 1.5`

## Touch & Click Targets

### Minimum Sizes
| Element | Minimum Size | Notes |
|---|---|---|
| Buttons | 44x44px | Includes padding |
| Icon buttons | 44x44px | Icon can be smaller, tap target must be 44px |
| List items | 44px height | Full row is the tap target |
| Filter chips | 32px height minimum | With adequate padding |
| Checkboxes / toggles | 44x44px tap target | Visual element can be smaller |

### Spacing Between Targets
- Minimum 8px gap between adjacent interactive elements
- Recommended 12px+ for destructive actions next to safe actions

## Screen Reader Text

### Financial Data Patterns
| Visual Display | Screen Reader Text |
|---|---|
| +2.4% | "increased by two point four percent" |
| -$1,247.80 | "decreased by one thousand two hundred forty-seven dollars and eighty cents" |
| $284,392.50 | "two hundred eighty-four thousand three hundred ninety-two dollars and fifty cents" |
| 84% (budget) | "eighty-four percent of budget used" |
| Green up arrow | "trending up" (via aria-label) |

### Component Announcements
| Component | Announcement Pattern |
|---|---|
| KPI Card | "[Label]: [Value], [trend direction] [change]" |
| Transaction Item | "[Merchant], [category], [amount], [date]" |
| AI Insight Card | "AI Insight: [title]. [body text]" |
| Loading skeleton | "Loading [content type]..." |
| Error state | "Error: [title]. [description]. [available actions]" |

## Keyboard Navigation

### Focus Order
1. Primary navigation (sidebar)
2. Page header actions
3. KPI cards (left to right)
4. Main content (top to bottom, left to right)
5. Secondary actions

### Focus Indicators
- Visible focus ring on all interactive elements
- Use `$border.focus` token for focus ring color
- Minimum 2px focus ring width
- Focus ring must have 3:1 contrast against adjacent colors

### Keyboard Shortcuts
- `Tab`: Move focus forward
- `Shift+Tab`: Move focus backward
- `Enter`/`Space`: Activate focused element
- `Escape`: Close modals, dismiss dropdowns
- Arrow keys: Navigate within component groups (tabs, radio groups)

## Motion & Animation

### Reduced Motion
- All animations must respect `prefers-reduced-motion: reduce`
- When reduced motion is preferred: instant transitions, no skeleton shimmer
- Use `$motion.*` tokens so animations can be globally disabled
- Never use motion as the only way to convey information

### Animation Guidelines
- Loading skeletons: subtle shimmer only, never pulsing
- Chart transitions: fade-in, never bouncing or springing
- Value changes: brief highlight, never flashing
- No auto-playing animations that can't be paused
