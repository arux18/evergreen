# OpenUI Component Library — Hemlock Design System

When creating screens in Pencil, use the OpenUI component library below. All components **MUST** be styled following the Hemlock design system exactly — reference `pencil/design-system/in-progress/hemlock-library.lib.pen` for variables, tokens, and component styling conventions. Do not deviate from Hemlock's visual language (pill-shaped buttons, Heebo font, token-based colors, etc.).

## Design Tokens (Hemlock)

| Token | Value | Usage |
|-------|-------|-------|
| `$bg` | `#F7F5F0` | Page/surface background |
| `$border` | `#DCD8CB` | Default borders |
| `$text.primary` | `#2D2926` | Primary text |
| `$text.secondary` | `#5E5954` | Secondary/muted text |
| `$text.disabled` | `#B5B1AB` | Disabled text |
| `$hover.bg` | `#EDEAE3` | Hover state backgrounds |
| `$pressed.bg` | `#E3DFD6` | Pressed state backgrounds |
| `$active.bg` | `#DCD8CB` | Active/selected backgrounds |
| `$divider` | `#E8E6E0` | Dividers and separators |
| `$icon` | `#8A8680` | Default icon color |
| `$shadow` | `#2D292628` | Drop shadow color |
| `$btn.primary.bg` | `#3C3C3C` | Primary button fill |
| `$btn.primary.hover` | `#4F4F4F` | Primary button hover |
| `$btn.primary.pressed` | `#2A2A2A` | Primary button pressed |
| `$btn.primary.text` | `#FFFFFF` | Primary button label |
| `$btn.primary.disabled.bg` | `#D4D1CA` | Disabled button fill |
| Primary Font | Heebo | All text |
| Secondary Font | Noto Serif | Decorative/editorial only when specified |
| Button radius | 999px (`$radius.full`) | ALL buttons are pill-shaped |
| Standard radius | 12px (`$radius`) | Cards, dropdowns, containers |
| Chip radius | 24px (`$chip.radius`) | Follow-up chips/pills |

## Available OpenUI Components

Build screens using ONLY the components listed below. Each component has interaction states (Default, Hover, Pressed, Disabled where applicable).

### Layout

| Component | Description |
|-----------|-------------|
| **Stack** | Flex container — vertical or horizontal, with gap, alignment, justification, and wrap |
| **Card** | Elevated container with optional variant (default, sunk, outlined) |
| **CardHeader** | Title + subtitle header within a card |
| **Tabs** | Tab container with multiple TabItems |
| **TabItem** | Individual tab (value, trigger label, content) |
| **Accordion** | Expandable/collapsible sections |
| **Carousel** | Horizontally scrollable card set |
| **Separator** | Visual divider between sections |
| **Steps** | Step-by-step progress indicator |
| **Modal** | Overlay dialog |

### Charts

| Component | Description |
|-----------|-------------|
| **BarChart** | Vertical bar chart with labels and series |
| **LineChart** | Line chart with data points |
| **AreaChart** | Filled line chart |
| **PieChart** | Pie/donut chart |
| **RadarChart** | Spider/radar chart |
| **ScatterChart** | XY scatter plot |
| **HorizontalBarChart** | Horizontal bar chart |
| **RadialChart** | Radial/gauge chart |
| **SingleStackedBarChart** | Single stacked bar |

### Data Display

| Component | Description |
|-----------|-------------|
| **Table** | Data table with columns (Col) |
| **Col** | Table column definition (label, data, type) |
| **Tag** | Small label/badge |
| **TagBlock** | Group of tags |
| **CodeBlock** | Formatted code display |
| **Image** | Single image |
| **ImageBlock** | Image with caption/context |
| **ImageGallery** | Grid of images |
| **ListBlock** | Ordered/unordered list container |
| **ListItem** | Individual list entry |

### Forms

| Component | Description |
|-----------|-------------|
| **Form** | Form container (name, fields, buttons) |
| **FormControl** | Label + input + optional hint wrapper |
| **Label** | Form field label |
| **Input** | Text input (supports types: text, email, password, number, url) |
| **TextArea** | Multi-line text input |
| **Select** | Dropdown selector |
| **CheckBoxGroup** | Group of checkboxes |
| **CheckBoxItem** | Individual checkbox |
| **RadioGroup** | Group of radio buttons |
| **RadioItem** | Individual radio option |
| **SwitchGroup** | Group of toggles |
| **SwitchItem** | Individual toggle switch |
| **Slider** | Range slider |
| **DatePicker** | Date selection input |

### Actions

| Component | Description |
|-----------|-------------|
| **Button** | Clickable button — variants: primary (dark), secondary (outlined), ghost |
| **Buttons** | Horizontal button group |
| **IconButton** | Icon-only circular button — same variants as Button |
| **FollowUpBlock** | Container for suggested follow-up actions |
| **FollowUpItem** | Individual follow-up chip/pill with arrow |

### Feedback

| Component | Description |
|-----------|-------------|
| **Callout** | Highlighted info/warning/error/success block |
| **TextCallout** | Inline text emphasis block |
| **MessageLoading** | Animated loading indicator |
| **Skeleton** | Content placeholder (loading state) |
| **TableSkeleton** | Table-shaped placeholder |

### Content

| Component | Description |
|-----------|-------------|
| **TextContent** | Rich text block with size variants (small, medium, large, large-heavy) |
| **MarkDownRenderer** | Rendered markdown content |

### Chat (OpenUI Chat Library)

| Component | Description |
|-----------|-------------|
| **FullScreen** | Full-page chat layout with thread sidebar |
| **Copilot** | Sidebar chat layout |
| **BottomTray** | Floating/collapsible tray chat |
| **ToolCall** | Tool invocation display |
| **ToolResult** | Tool result display |

## Usage Notes

- Prefer **Stack** as the root layout container for screens
- Use **Card** for grouped content sections — use `variant: "sunk"` for nested cards
- **Form** requires explicit `buttons` (use a Buttons component)
- Charts accept `labels` (x-axis) and `series` (data arrays)
- All interactive components should show appropriate states based on context
- Reference the Hemlock library for exact variable names when styling
