# Dashboard — Nav and Chat Open

**Screen name:** Dashboard - Nav and Chat Open  
**Frame ID:** `2neTm`  
**Dimensions:** 1440 × 900px  
**Source:** `app-shell-dashboard.pen`

---

## Layout

Three-panel layout with horizontal flex, 8px gap, and `7px 8px 8px 8px` padding on a `#FFFFFF` background.

| Panel | Width | Background | Border Radius |
|-------|-------|------------|---------------|
| Sidebar | 240px | `#F7F5F0` | `0 12px 12px 0` |
| Main Content | fill (remaining) | transparent | — |
| Chat Panel | 360px | `#F7F5F0` | 12px |

---

## Sidebar (240px)

- **Padding:** 24px 20px
- **Layout:** vertical, space-between
- **Background:** `#F7F5F0`

### Logo
- **Text:** "evergreen" — Manrope 18px weight 500, `#2D2926`
- **Suffix:** ".ai" — Noto Serif 18px normal, `#1A1A1A`

### Navigation Sections

**Top-level:**
- Overview (active state)

**Net Worth section:**
- Overview
- Accounts
- Activity
- Investments
  - House & Property (indented, 24px left padding)
  - Equity (indented, 24px left padding)
- Wealth Score

**Planning section:**
- Lifetime Planning
- Tax Strategy
- Planning

**Nav item styling:**
- Font: 13px weight 500
- Color: `#5E5954` (default), `#2D2926` (active)
- Padding: 7px 12px
- Border radius: 8px
- Active background: `rgba(45, 41, 38, 0.08)`

### User Area (bottom)
- User avatar + name "Sylvia"

---

## Main Panel

### Header Row
- **Padding:** 20px 20px 8px 20px
- **Gap:** 8px
- **Greeting:** "Good morning, Sylvia" — Noto Serif 20px, `#2D2926`
- **Logo:** "evergreen.ai" — same styling as sidebar logo

### Intro Section
- **Padding:** 20px 0
- **Text:** "Let's check in with your money." — Noto Serif 40px, `#2D2926`

### Content Area
- **Padding:** 20px 48px
- **Gap:** 24px (vertical)
- **Two-column grid** with 48px gap between columns

---

## Cards

All cards share:
- **Background:** `#FFFFFF`
- **Border radius:** 12px
- **Shadow:** `0 0 12px rgba(45, 41, 38, 0.16)`
- **Header:** title (Heebo 16px weight 600, `#2D2926`) + icon (16×16)

### Left Column

#### Accounts Card
- **Padding:** 14px 24px, gap 10px
- **Subtext:** "4 linked · Updated today" — Heebo 12px, `#8A8680`
- **Entries:**

| Account | Type | Amount | Color |
|---------|------|--------|-------|
| Chase Checking | Checking · Primary | $12,450 | `#2D2926` |
| Marcus Savings | High-Yield Savings | $48,200 | `#2D2926` |
| Amex Platinum | Credit Card | -$1,840 | `#B91C1C` |
| Fidelity Brokerage | Investment Account | $370,840 | `#2D2926` |

- Account name: Heebo 13px weight 500
- Amount: Heebo 12px weight 600
- Type: Heebo 11px, `#8A8680`

#### Wealth Score Card
- **Padding:** 14px 24px, gap 12px
- **Ring:** 140×140px with 110px diameter track
  - Track: `#E8E5DE`, arc fill: `#2D8A4E`
- **Score:** "740" — Heebo 36px weight 700, `#2D2926`
- **Label:** "/ 1000" — Heebo 12px, `#8A8680`
- **Status:** "Good · +12 pts this month" — Heebo 13px weight 500, `#2D8A4E`

#### Investments Card
- **Padding:** 14px 24px, gap 12px
- **Stacked bar:** 10px height, segments:

| Segment | Color | Allocation | Value |
|---------|-------|------------|-------|
| US stocks | `#3A6AF8` | 50% | $185,420 |
| International stocks | `#6FA8FF` | 20% | $74,168 |
| Bonds | `#C79A3D` | 20% | $74,168 |
| Cash | `#8A8680` | 10% | $37,084 |

- Legend dot: 8×8px circles
- Label: Heebo 12px weight 500, `#2D2926`
- Value: Heebo 12px weight 500, `#5E5954`

#### Planning Card
- **Padding:** 14px 24px, gap 10px
- **Title:** "Planning" — Heebo 15px weight 600
- **Subheader:** "Next 10 days" — Heebo 12px, `#8A8680`
- **Bills:**

| Date | Name | Detail | Amount |
|------|------|--------|--------|
| APR 24 | Rent | Autopay · due in 2 days | $2,400.00 |
| APR 26 | Electric | ConEd · due in 4 days | $145.50 |
| APR 29 | Equinox | Gym · due in 7 days | $245.00 |
| MAY 01 | Internet | Verizon · due in 9 days | $89.99 |

- Date box: 38×38px, border radius 8px
  - Month: Heebo 9px weight 600, `#8A8680`
  - Day: Heebo 14px weight 600, `#2D2926`
- Bill name: Heebo 13px weight 600
- Bill detail: Heebo 11px, `#8A8680`
- Amount: Heebo 13px weight 600

### Right Column

#### Net Worth Card
- **Padding:** 14px 24px, gap 6px
- **Amount:** "$2,412,840" — Noto Serif 46px, `#2D2926`
- **Change:** "+$184,320 ytd (+8.3%)" — Heebo 13px, `#15803D`

#### Tax Strategy Card
- **Padding:** 12px 16px, gap 8px
- **Info title:** "Tax Optimization Strategies" — Heebo 14px weight 600
- **Body:** Heebo 12px, `#5E5954`
- **Bullet points:**
  - Tax-Loss Harvesting — Offset gains by selling underperforming assets at a loss.
  - Asset Location — Place holdings in the right account types for tax efficiency.
  - Contribution Timing — Maximize 401(k), IRA, and HSA contributions.
- Bullets: Heebo 11px, `#5E5954`

#### Activity Card (Hover State)
- **Padding:** 14px 24px, gap 12px
- **Border:** 1px solid `rgba(58, 106, 248, 0.3)` (accent hover)
- **Shadow:** `0 0 15px rgba(41, 92, 204, 0.4)` (blue glow)
- **Transactions:**

| Name | Category | Amount | Color |
|------|----------|--------|-------|
| Whole Foods Market | Groceries · Apr 19 | -$142.50 | `#B91C1C` |
| Salary Deposit | Income · Apr 15 | +$9,250.00 | `#15803D` |
| Netflix | Entertainment · Apr 14 | -$17.99 | `#B91C1C` |

- Dot: 8×8px circle — expense `#B91C1C`, income `#15803D`
- Name: Heebo 13px, `#2D2926`
- Detail: Heebo 11px, `#5E5954`
- Amount: Heebo 13px weight 500

#### Lifetime Planning Card
- **Padding:** 14px 24px, gap 16px
- **Projection:** "On track for **$16.8M** at 65"
  - Label: Heebo 11px, `#5E5954`
  - Value: Heebo 11px weight 600, `#2D2926`
- **Bar chart:** 5 bars, gradient `#3A6AF8` → `#6FA8FF`

| Age | Amount | Bar Height |
|-----|--------|------------|
| Now | $2.4M | 20px |
| 40 | $3.8M | 35px |
| 50 | $7.2M | 55px |
| 60 | $12.5M | 78px |
| 65 | $16.8M | 100px |

- Bar width: 36px, border radius 4px 4px 0 0
- Amount: Heebo 9px weight 500 (weight 600 for highlights)
- Age label: Heebo 10px

---

## Chat Panel (360px)

- **Background:** `#F7F5F0`
- **Border:** 1px solid `#DCD8CB`
- **Border radius:** 12px
- **Shadow:** `0 2px 28px 2px rgba(45, 41, 38, 0.16)`
- **Layout:** vertical, space-between

### Chat Header
- **Collapse button:** 28×28px, icon `#5E5954`
- **Title:** "Chat" — Noto Serif 16px, `#2D2926`

### Chat Messages
- **Greeting:** "Ask me any financial question..." — Noto Serif 20px, `#2D2926`
- **Chip:** "How can I offset large capital gains?"
  - Background: `#F7F5F0`, border `#DCD8CB`
  - Font: Heebo 14px, `#5E5954`
  - Border radius: 20px, padding 8px 16px

### Chat Input
- **Input field:** white background, 12px border radius, 1px border `#DCD8CB`
- **Placeholder:** "Ask me any financial question..." — Heebo 14px, `#8A8680`
- **Buttons:**
  - Voice button: 34×34px
  - New Chat button: "New Chat" — Heebo 12px weight 500
  - Send button: 34×34px circle, `#2D2926` background, white icon

---

## Typography Summary

| Element | Font | Size | Weight | Color |
|---------|------|------|--------|-------|
| Greeting | Noto Serif | 20px | normal | `#2D2926` |
| Intro heading | Noto Serif | 40px | normal | `#2D2926` |
| Card title | Heebo | 16px | 600 | `#2D2926` |
| Net worth amount | Noto Serif | 46px | normal | `#2D2926` |
| Wealth score number | Heebo | 36px | 700 | `#2D2926` |
| Body text | Heebo | 13px | 500 | `#2D2926` |
| Secondary text | Heebo | 12px | normal | `#5E5954` |
| Muted text | Heebo | 11px | normal | `#8A8680` |
| Logo "evergreen" | Manrope | 18px | 500 | `#2D2926` |
| Logo ".ai" | Noto Serif | 18px | normal | `#1A1A1A` |
| Chat title | Noto Serif | 16px | normal | `#2D2926` |

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#FFFFFF` | App shell background |
| Surface | `#F7F5F0` | Sidebar, chat panel |
| Card | `#FFFFFF` | Card backgrounds |
| Text Primary | `#2D2926` | Headings, values |
| Text Secondary | `#5E5954` | Body copy, descriptions |
| Text Muted | `#8A8680` | Labels, subtitles |
| Border | `#DCD8CB` | Chat panel border |
| Positive | `#15803D` | Income, gains |
| Negative | `#B91C1C` | Expenses, credit balance |
| Score Green | `#2D8A4E` | Wealth score arc + status |
| Accent Blue | `#3A6AF8` | US stocks, chart bars |
| Accent Light Blue | `#6FA8FF` | International stocks |
| Accent Gold | `#C79A3D` | Bonds |
| Hover Glow | `rgba(41,92,204,0.4)` | Activity card hover shadow |
