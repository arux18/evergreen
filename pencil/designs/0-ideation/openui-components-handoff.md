# OpenUI Component Library — Hemlock Design System

When creating screens in Pencil, use the OpenUI component library below. All components **MUST** be styled following the Hemlock design system exactly — reference `pencil/design-system/in-progress/hemlock-library.lib.pen` for variables, tokens, and component styling conventions. Do not deviate from Hemlock's visual language (pill-shaped buttons, Heebo font, token-based colors, etc.).

## Source of Truth (read first)

**Our `.pen` libraries are a design port of the vendor component library `@openuidev/react-ui`** ([thesysdev/openui](https://github.com/thesysdev/openui), docs at openui.com). Production renders the vendor library when `flags.rolloutGenUiDsLibrary` is ON (`app-shell.tsx` — read the ternary, not the flag name). Therefore:

1. **Component names, props, and variants in our port must match the vendor catalog exactly** — engineering renders what the vendor library supports, not what we draw.
2. Where our port currently differs, it is listed in the **Vendor parity backlog** below and gets fixed file by file.
3. Vendor component descriptions and prompt rules quoted here were pulled from `packages/react-ui/src/genui-lib/` on 2026-08-13.

## Design Tokens (Hemlock)

| Token | Value | Usage |
|-------|-------|-------|
| `colors-background-main` | `#F7F5F0` | Page/surface background |
| `colors-background-surface` | `#FFFFFF` | Card/sheet surfaces |
| `colors-borders-dark` | `#D5D3D0` | Default borders* |
| `colors-borders-light` | `#EEEDEB` | Subtle borders/dividers |
| `colors-text-header` | `#0e0e0e` | Headings, titles |
| `colors-text-body` | `#403D3A` | Body text |
| `colors-text-meta` | `#5E5954` | Secondary/muted text |
| `colors-text-placeholder` | `#B5B1AB` | Disabled/placeholder text |
| `color-taupe-100/200/300` | `#F7F5F0` / `#EDEAE3` / `#E3DFD6` | Chip surfaces (default/hover/pressed) |
| `colors-borders-strong` | `#C0BAB2` | Pressed-state chip border (actions lib) |
| `color-blue-100…800` | `#ebf0fe` … `#163196` | Actions-lib button system (blue ramp) |
| Primary Font | Heebo | All text |
| Secondary Font | Noto Serif | Decorative/editorial only when specified |
| Button radius | `$radius-full` | ALL buttons are pill-shaped |
| Standard radius | `$radius-xs` (12px) | Cards, dropdowns, containers |
| Chip radius | 24px | Follow-up chips/pills |

\* In `openui-actions.lib.pen`, chip borders use `#DCD8CB` to match the product's chat chips (`chat.chip.border` in `app-shell-dashboard-view.pen`). Reconcile with Hemlock's `colors-borders-dark` (`#D5D3D0`) upstream later.

## Available OpenUI Components

Build screens using ONLY the components listed below. **"Vendor description" is what engineering's library actually renders.** Port status legend: **ported** = matches vendor · **differs** = works but diverges, fix scheduled (see backlog) · **not ported** = exists in vendor, no `.pen` component yet.

### Layout

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **Card** | The chat response container. In chat: every response is a single Card, children stack vertically | ported |
| **CardHeader** | Title + subtitle header within a card | ported |
| **Stack** | Flex container — root of the **general-purpose** library only. Never used in chat responses | ported |
| **Tabs / TabItem** | Switch between sections inside a card | ported |
| **Accordion** | Expandable/collapsible sections (see also SectionBlock) | ported |
| **SectionBlock / SectionItem** | Collapsible sections for long responses (reports, FAQs); auto-opens sections as they stream in. Each SectionItem: unique value id, trigger label, content array | **not ported** |
| **Carousel** | Horizontally scrollable slides. Every slide must use the same component structure in the same order | ported |
| **Separator** | Visual divider | ported |
| **Steps** | Step-by-step progress indicator | ported |
| **Modal** | Overlay dialog | ported |

### Content

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **TextContent** | Text block. Supports markdown. Sizes: `small` \| `default` \| `large` \| `small-heavy` \| `large-heavy` | **differs** — ours has 4 sizes (`small`/`medium`/`large`/`large-heavy`); vendor has 5, named differently (backlog B1) |
| **MarkDownRenderer** | Renders markdown text with optional container variant | ported |

### Data Display

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **ListBlock / ListItem** | "A list of items with **number or image indicators**. Each item can optionally have an **action**" (title, subtitle, image, actionLabel) — clickable rows | **differs** — ours renders static bullets with no indicators or actions (backlog B2) |
| **Table / Col** | Data table with typed columns | ported |
| **Tag / TagBlock** | Small label / group of tags | ported |
| **CodeBlock** | Formatted code display | ported |
| **Image / ImageBlock / ImageGallery** | Image, image with caption, grid of images | ported |

### Forms

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **Form / FormControl / Label** | Form container + label/input/hint wrapper. One FormControl per field so controls stream progressively; Form always takes explicit Buttons | ported |
| **Input / TextArea / Select** | Text inputs and dropdown | ported |
| **CheckBoxGroup/Item, RadioGroup/Item, SwitchGroup/Item** | Boolean and choice controls | ported |
| **Slider / DatePicker** | Range slider / date selection | ported |

### Actions

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **Button / Buttons / IconButton** | primary / secondary / ghost variants | ported (blue system, 2026-08-10) |
| **FollowUpBlock / FollowUpItem** | "List of clickable follow-up suggestions placed at the **end** of a response" | ported (taupe chips, 2026-08-10) |

### Feedback

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| ~~**Callout**~~ | Status banner. Variants: `neutral` \| `info` \| `warning` \| `success` (vendor maps `error` → warning) | **removed from the shown palette (2026-08-13)** — TextCallout carries all status duty; backlog B3 retires it from the port |
| **TextCallout** | Compact status note: `variant` (neutral/info/warning/success/danger) + `title` + `description`. **The only status-note component in the shown palette** | **differs** — ours is a single-sentence emphasis bar, no title/variants (backlog B4, now the top feedback-lib priority) |
| **MessageLoading** | Animated loading indicator | ported |
| **Skeleton / TableSkeleton** | Loading placeholders (TableSkeleton is what Table renders while queries load) | ported |

### Charts

`openui-charts-v2.lib.pen` is the single chart library — v1 (`openui-charts.lib.pen`) is legacy, kept only because `View-Presentation-Ideation.pen` still imports it. **Shown set:** BarChart, HorizontalBarChart, LineChart, AreaChart, **DonutChart** (in place of PieChart), SingleStackedBarChart, Mini* (line/area/bar), **HeatmapChart** (added 2026-08-17). **Not shown:** PieChart, RadialChart; RadarChart and ScatterChart cut 2026-08-17 (may return later).

### Chat surfaces (OpenUI Chat Library)

| Component | Vendor description | Port status |
|-----------|--------------------|-------------|
| **FullScreen / Copilot / BottomTray** | Chat shell layouts (full-page, sidebar, floating tray) | **not ported** |
| **ToolCall / ToolResult** | Tool invocation / result display | **not ported** |
| **AgentInterface** | The vendor's complete chat surface component (thread sidebar, composer, artifact workspace) — reference only, not a design component | n/a |

## Content & Composition Rules (design + engineering)

Each rule is given twice: **Design** = what we do in Pencil; **Prompt copy** = the sentence engineering can drop into catalog/prompt text. Lines marked **[vendor]** are quoted verbatim from the vendor's prompt rules; **[Evergreen]** are ours.

### R1 — A chat response is one Card

- **Design:** the entire AI answer is a single Card; content stacks vertically. Never compose multi-card answers in chat.
- **Prompt copy [vendor]:** "Every response is a single Card(children) — children stack vertically automatically. No layout params are needed on Card. Card is the only layout container. Do NOT use Stack. Use Tabs to switch between sections, Carousel for horizontal scroll."

### R2 — Paragraphs lead; titles are TextContent large-heavy

- **Design:** prose is always TextContent (or markdown inside it). The title at the top of a response is `TextContent` `large-heavy`. Never open a response with a banner.
- **Prompt copy [vendor pattern]:** `title = TextContent("...", "large-heavy")` is the standard title idiom. **[Evergreen]:** "Lead with a paragraph, not a Callout — callouts are for status, never headlines."

### R3 — Bullets vs. ListBlock: clickability decides

- **Design:** a list inside flowing prose = markdown bullets. Use ListBlock **only** when the items are options or steps the user can click to select (ListBlock rows support actions, titles, subtitles, images).
- **Prompt copy [vendor]:** "Use ListBlock when presenting a set of options or steps the user can click to select."
- **Prompt copy [Evergreen]:** "Plain, non-actionable lists belong in markdown bullets inside text — never ListBlock."

### R4 — Status notes: TextCallout only (Callout is not in the palette)

- **Design:** TextCallout is the only in-answer status component — one compact note (variant + title + description), never a headline, never the opening element. Callout is **not shown** (removed 2026-08-13); do not use it in new screens.
- **Prompt copy [Evergreen]:** "Do not use Callout. Status inside an answer goes in a TextCallout (variant + title + description), and never leads the response — lead with a paragraph."

### R5 — Long answers fold into sections

- **Design:** reports, FAQs, and long structured answers use SectionBlock with collapsible SectionItems instead of walls of text.
- **Prompt copy [vendor]:** "Use SectionBlock to group long responses into collapsible sections — good for reports, FAQs, and structured content. Use SectionItem inside SectionBlock: each item needs a unique value id, a trigger (header label), and a content array."

### R6 — FollowUpBlock closes the response

- **Design:** FollowUpBlock is always the last element in the Card — 2–4 chips phrased as the user's next actions.
- **Prompt copy [vendor]:** "Use FollowUpBlock at the END of a Card to suggest what the user can do or ask next."

### R7 — Tables vs. charts (Evergreen)

- **Design:** Table for exact figures (holdings, transactions, account data). Charts for trends, compositions, and comparisons. Line charts only for true time series — never smooth/interpolate between real observations.
- **Prompt copy [Evergreen]:** "Use Table for exact figures; use charts only for trends or comparisons. Never imply motion between real observations with smoothed chart lines."

## Vendor parity backlog (piece-by-piece, file by file)

No `.pen` changes yet — each item gets its own visual review in Pencil before commit.

| # | File | Item | Vendor truth |
|---|------|------|--------------|
| B1 | `openui-content.lib.pen` | TextContent sizes | Vendor: `small` \| `default` \| `large` \| `small-heavy` \| `large-heavy`. Rename `medium`→`default`, add `small-heavy` |
| B2 | `openui-data-display.lib.pen` | ListBlock/ListItem | Vendor: number/image indicators, optional subtitle + image + action (clickable). Ours: static bullets |
| B3 | `openui-feedback.lib.pen` | Retire Callout from the port | Callout removed from the shown palette 2026-08-13 — strip the 4 Callout variants after confirming nothing references them |
| B4 | `openui-feedback.lib.pen` | TextCallout rebuild | Vendor: variant + title + description compact status note |
| B5 | `openui-charts-v2.lib.pen` | Chart consolidation | **Done 2026-08-17:** v2 is the single lib; shown set finalized (Donut replaces Pie; HeatmapChart added from Hemlock; Radar/Scatter cut, may return). v1 kept as legacy for `View-Presentation-Ideation.pen`. Remaining: P3 style pass on the shown set |
| B6 | `openui-layout.lib.pen` | Add SectionBlock/SectionItem | Collapsible, stream-aware sections |
| B7 | new `openui-chat.lib.pen` | Port chat surfaces | FullScreen, Copilot, BottomTray, ToolCall, ToolResult |
| B8 | all | Border token reconciliation | Actions-lib chip border `#DCD8CB` vs Hemlock `colors-borders-dark` `#D5D3D0` — pick one upstream |

## Usage Notes

- In chat surfaces, the root is **Card**; **Stack** is the root only for standalone/general-purpose layouts (vendor rule R1)
- Use **Card** for grouped content sections — use `variant: "sunk"` for nested cards
- **Form** requires explicit `buttons` (use a Buttons component)
- Charts accept `labels` (x-axis) and `series` (data arrays)
- All interactive components should show appropriate states based on context
- Reference the Hemlock library for exact variable names when styling

## Type & Spacing Rules (binding for all OpenUI screens)

The OpenUI libs carry local tokens that mirror the Hemlock scale and values 1:1 (verified against `hemlock-library.lib.pen`). Never redefine a token value inside a lib or screen — if a value needs to change, it changes in Hemlock first.

### Type roles — one spec per role

| Role | Spec | Used for |
|------|------|----------|
| **Body prose** | `typo-primary-base-regular` — 16px, line-height 1.5, `$colors-text-body` | **All** reading text: TextContent/medium paragraphs, MarkDownRenderer paragraphs and bullets, ListBlock/ListItem items, TextCallout, Callout body |
| **Meta** | `typo-primary-sm-regular` — 14px, line-height 1.43, `$colors-text-meta` | Subtitles, descriptions, hints, captions, timestamps |
| **Block title** | `typo-primary-sm-semibold` — 14px, line-height 1.43, `$colors-text-header` | ListBlock header, Callout title, chip labels |
| **Emphasis** | `typo-primary-base-semibold` — 16px, line-height 1.5, `$colors-text-header` | MarkDownRenderer headings and bold inline, CardHeader/Card titles |
| **Lead-in** | `typo-primary-md-regular` — 18px, line-height 1.56, `$colors-text-body` | TextContent/large |
| **Section title** | `typo-primary-lg-semibold` — 20px, line-height 1.4, `$colors-text-header` | TextContent/large-heavy |
| **Caption** | `typo-primary-xs-*` — 12px, line-height 1.33 | Chart axes, table meta, image captions |

### Rules

1. **Body prose has exactly one spec.** Bullets in a ListBlock are body prose and render at 16px, identical to a MarkDownRenderer paragraph. No component picks its own reading size.
2. **Line-height is always explicit.** Never leave it unset (font auto ≈ 1.47 for Heebo produces inconsistent rhythm across sizes). Use the ratio from the table above for the token's scale step.
3. **fontFamily, fontSize, and fontWeight must come from the same scale step** — e.g. `$typo-primary-sm-semibold-*` together, never sm family with base size.
4. **All spacing uses `$spacing-*` tokens** (2/4/8/12/16/24/32). No hardcoded padding or gaps.
5. **Lint before approval:** run `python3 lint-openui-text-styles.py` (in this folder). It must report 0 errors before a screen using these libs is approved.
