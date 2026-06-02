# OpenUI Generation Prompt — Net Worth / Accounts Panel

> Source design: `pencil/designs/4-approved/pfm-screens.pen` → frame `mainPanel` (`rb9SX`)
> Target tool: [OpenUI](https://github.com/wandb/openui) — paste the **Prompt** section below into OpenUI to generate the component, then feed it the **Sample Data** as the rendering input.

---

## Prompt

Build a **Net Worth / Accounts panel** for a personal finance management (PFM) web app. It is a single light-themed content column on a white background that summarizes a user's total net worth and lists every linked financial account grouped by category.

### Overall layout
- A vertical column, full width of its container, max-width ~640px, with `20px 40px` padding and `32px` vertical gaps between major sections.
- White (`#FFFFFF`) background, no outer card or shadow.
- Font family: **Heebo** (Google Fonts), with a system sans-serif fallback. Numbers should use `font-variant-numeric: tabular-nums`.

### 1. Headline row (top)
- Left side, stacked vertically with a `4px` gap:
  - An all-caps overline label `NET WORTH` — 12px, weight 600, color `#727874` (gray-500), letter-spacing `1px`.
  - The total net worth value (e.g. `$1,169,200`) — 30px, weight 600, color `#0E0E0E` (gray-900), letter-spacing `-0.5px`.
- Right side, a horizontal group of two **outline (secondary) buttons** with `8px` gap, vertically bottom-aligned with the value:
  - `+ Add Accounts` (leading `plus` icon, 16px).
  - `⚙ Manage Institutions` (leading `settings` icon, 16px).
  - Buttons: pill/rounded outline style, `8px 12px` padding, 14px label, 1px gray border (`#D8D9D8`), gray-700 text (`#3B3E3C`), transparent fill, subtle hover background.
- The headline row uses `space-between` so the value sits left and the buttons sit right.

### 2. Account sections (repeated)
Render one section per account category, in this order: **BANKING**, **INVESTMENTS**, **CREDIT & LOANS**. Each section is a vertical stack with `12px` gap:
- A section header: all-caps category name — 12px, weight 600, color `#727874` (gray-500), letter-spacing `1.5px`.
- A vertical list of account rows with `8px` gap.

### 3. Account row (the core repeating element)
Each row is a horizontal, vertically-centered flex container, full width, `12px` padding, `12px` gap, `4px` corner radius, with a 1px bottom divider (`#EEEFEE`, gray-100) on all rows **except the last row in each section**. Rows are clickable (cursor pointer, subtle hover background).

Row contents, left → right:
1. **Institution logo** — a 32×32 rounded square (`4px` radius), image filling the box (`object-fit: cover`). If no logo, show a neutral circular fallback with the institution's initial.
2. **Info block** (grows to fill remaining space, vertical stack, `2px` gap):
   - **Name row**: account name + last-4 (e.g. `Wells Fargo Checking (x1234)`) — 14px, weight 600, color `#3B3E3C` (gray-700) — followed by a small `chevron-right` icon (14px, gray-700) indicating the row is tappable into a detail view.
   - **Account type** subtitle (e.g. `Checking`) — 12px, regular, color `#727874` (gray-500).
   - **Last refreshed** timestamp (e.g. `Refreshed 9:12 AM`) — 14px, regular, color `#727874` (gray-500).
3. **Balance** (right-aligned) — the account balance — 14px, weight 600, color `#202220` (gray-800). Negative balances (credit cards, loans) render with a leading minus sign (use the real minus `−`, e.g. `−$2,400`).

### Design tokens (Evergreen design system, light mode)
| Role | Token | Value |
|---|---|---|
| Page background | `color.gray.50` / white | `#FFFFFF` |
| Headings / balance | `color.gray.800` | `#202220` |
| Net worth value | `color.gray.900` | `#0E0E0E` |
| Primary text (account name) | `color.gray.700` | `#3B3E3C` |
| Secondary text (labels, subtitles, timestamps) | `color.gray.500` | `#727874` |
| Dividers / borders | `color.gray.100` | `#EEEFEE` |
| Row / button radius | `radius.sm` | `4px` |
| Row & button padding | `space.3` | `12px` |
| Major section gap | `space.8` | `32px` |
| Section internal gap | `space.3` | `12px` |
| Row list gap | `space.2` | `8px` |
| Font (UI + numbers) | `font.family.primary` | `Heebo` |

### Implementation requirements
- Drive **all** content from the JSON in the Sample Data section — do **not** hardcode account names, balances, or logos in the markup. Iterate over `sections[].accounts[]`.
- Format the section's header from `section.label`; format the total from `netWorth.formattedTotal`.
- A balance is negative when `account.balance < 0`; render it with the `−` glyph and the formatted absolute value.
- The bottom divider must be suppressed on the last account row of each section.
- Output should be responsive (column reflows on narrow viewports; the headline buttons wrap below the value under ~480px).
- Use semantic, accessible markup: the row should be a button or link with an accessible name, and the chevron should be `aria-hidden`.

---

## Sample Data

```json
{
  "netWorth": {
    "total": 1169200,
    "currency": "USD",
    "formattedTotal": "$1,169,200",
    "asOf": "2026-06-02T09:12:00-04:00"
  },
  "sections": [
    {
      "id": "banking",
      "label": "BANKING",
      "accounts": [
        {
          "id": "acct_wf_checking",
          "institution": "Wells Fargo",
          "name": "Wells Fargo Checking",
          "mask": "1234",
          "type": "Checking",
          "logo": "images/wellsfargo-logo.png",
          "balance": 12400,
          "formattedBalance": "$12,400",
          "refreshedAt": "2026-06-02T09:12:00-04:00",
          "refreshedLabel": "Refreshed 9:12 AM"
        },
        {
          "id": "acct_ally_savings",
          "institution": "Ally",
          "name": "Ally High-Yield Savings",
          "mask": "9087",
          "type": "Savings",
          "logo": "images/ally-logo.png",
          "balance": 52850,
          "formattedBalance": "$52,850",
          "refreshedAt": "2026-06-02T09:05:00-04:00",
          "refreshedLabel": "Refreshed 9:05 AM"
        },
        {
          "id": "acct_marcus_savings",
          "institution": "Marcus",
          "name": "Marcus 2-month CD",
          "mask": "2210",
          "type": "CD",
          "logo": "images/marcus-logo.png",
          "balance": 32600,
          "formattedBalance": "$32,600",
          "refreshedAt": "2026-06-02T08:58:00-04:00",
          "refreshedLabel": "Refreshed 8:58 AM"
        }
      ]
    },
    {
      "id": "investments",
      "label": "INVESTMENTS",
      "accounts": [
        {
          "id": "acct_schwab_brokerage",
          "institution": "Charles Schwab",
          "name": "Schwab Brokerage",
          "mask": "3456",
          "type": "Brokerage",
          "logo": "images/schwab-logo.png",
          "balance": 620000,
          "formattedBalance": "$620,000",
          "refreshedAt": "2026-06-02T09:01:00-04:00",
          "refreshedLabel": "Refreshed 9:01 AM"
        },
        {
          "id": "acct_fidelity_401k",
          "institution": "Fidelity",
          "name": "Fidelity 401(k)",
          "mask": "7781",
          "type": "Retirement",
          "logo": "images/fidelity-logo.png",
          "balance": 318400,
          "formattedBalance": "$318,400",
          "refreshedAt": "2026-06-02T09:03:00-04:00",
          "refreshedLabel": "Refreshed 9:03 AM"
        },
        {
          "id": "acct_vanguard_roth",
          "institution": "Vanguard",
          "name": "Vanguard Roth IRA",
          "mask": "4420",
          "type": "Retirement",
          "logo": "images/vanguard-logo.png",
          "balance": 145900,
          "formattedBalance": "$145,900",
          "refreshedAt": "2026-06-02T09:00:00-04:00",
          "refreshedLabel": "Refreshed 9:00 AM"
        },
        {
          "id": "acct_coinbase",
          "institution": "Coinbase",
          "name": "Coinbase Wallet",
          "mask": "0093",
          "type": "Crypto",
          "logo": "images/coinbase-logo.png",
          "balance": 18650,
          "formattedBalance": "$18,650",
          "refreshedAt": "2026-06-02T09:08:00-04:00",
          "refreshedLabel": "Refreshed 9:08 AM"
        }
      ]
    },
    {
      "id": "credit_loans",
      "label": "CREDIT & LOANS",
      "accounts": [
        {
          "id": "acct_chase_sapphire",
          "institution": "Chase",
          "name": "Chase Sapphire Preferred",
          "mask": "5588",
          "type": "Credit Card",
          "logo": "images/chase-logo.png",
          "balance": -2400,
          "formattedBalance": "−$2,400",
          "refreshedAt": "2026-06-02T09:10:00-04:00",
          "refreshedLabel": "Refreshed 9:10 AM"
        },
        {
          "id": "acct_wf_mortgage",
          "institution": "Wells Fargo",
          "name": "Wells Fargo Mortgage",
          "mask": "1102",
          "type": "Mortgage",
          "logo": "images/wellsfargo-logo.png",
          "balance": -418500,
          "formattedBalance": "−$418,500",
          "refreshedAt": "2026-06-02T07:45:00-04:00",
          "refreshedLabel": "Refreshed 7:45 AM"
        },
        {
          "id": "acct_nelnet_student",
          "institution": "Nelnet",
          "name": "Nelnet Student Loan",
          "mask": "2019",
          "type": "Student Loan",
          "logo": "images/nelnet-logo.png",
          "balance": -28600,
          "formattedBalance": "−$28,600",
          "refreshedAt": "2026-06-02T07:45:00-04:00",
          "refreshedLabel": "Refreshed 7:45 AM"
        },
        {
          "id": "acct_auto_loan",
          "institution": "Capital One",
          "name": "Capital One Auto Loan",
          "mask": "6634",
          "type": "Auto Loan",
          "logo": "images/capitalone-logo.png",
          "balance": -15400,
          "formattedBalance": "−$15,400",
          "refreshedAt": "2026-06-02T07:45:00-04:00",
          "refreshedLabel": "Refreshed 7:45 AM"
        }
      ]
    }
  ]
}
```
