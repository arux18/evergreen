# OpenUI Generation Prompt — Net Worth / Accounts Panel

> Source design: `pencil/designs/4-approved/pfm-screens.pen` → frame `mainPanel` (`rb9SX`)
> Target: an agent generating inside the Pencil document using the imported **OpenUI** component library (the `O:`-prefixed reusable components).

---

## ⚠️ Read this first — reuse existing components, do NOT rebuild

This view already exists as first-class components in the OpenUI library. Generation MUST reuse them instead of approximating with generic `Card` / `TextContent` / `Image` primitives. Approximating is what makes the output look wrong (boxed rows, missing logos, missing chevrons, inline balances).

| Need | Use this component (id) | Do NOT use |
|---|---|---|
| Whole accounts list (sections + rows + separators) | `component/AccountList` (`O:vHoxK`) | a stack of `Card/subtle` |
| A single account row | `component/AccountListItem` (`O:OowGc`) | `Card` + manual text |
| The balance figure | `component/MoneyText` (`O:AXiZv`) and variants (`/negative` `O:eLUi9`) | plain text |
| Logo when image is unavailable | `component/InstitutionLogo/fallback` (`O:qVfyr`) | a blank/broken image |

The fastest correct path: **instance `component/AccountList` (`O:vHoxK`) and override its descendants with the sample data below.** It already provides section headers, logos, chevrons, inset 1px separators between rows, right-aligned `MoneyText`, and red negative balances. If you instead need to build the list dynamically, instance `component/AccountListItem` (`O:OowGc`) once per account and place a separator frame between consecutive rows in a section.

---

## `component/AccountListItem` (`O:OowGc`) — descendant override keys

When instancing a row (`{ type: "ref", ref: "O:OowGc", width: "fill_container", descendants: { ... } }`), bind data via these descendant ids:

| Field | Descendant key | Notes |
|---|---|---|
| Account name + mask | `O:cFWeZ` → `content` | e.g. `"Wells Fargo Checking (••1234)"` (mask uses `••`, not `x`) |
| Account type subtitle | `O:AKuhp` → `content` | e.g. `"Checking"` |
| Refreshed timestamp | `O:q44Ur` → `content` | e.g. `"Refreshed 9:12 AM"` |
| Balance | `O:b9l3e0` → `content` | right-aligned MoneyText; for negatives also set `fill: "$O:colors-text-error"` and use a leading `-` |
| Institution logo (image) | `O:jUFzC/O:m4IDL` → `fill` | `{ type: "image", mode: "fill", enabled: true, url: "images/<bank>-logo.png" }` |
| Institution logo (fallback) | replace `O:jUFzC` | swap the whole logo node for `component/InstitutionLogo/fallback` (`O:qVfyr`) and set its `initials` text (`O:fv1WB`) to the 2-letter code when no logo image exists |
| Chevron (already present) | `O:nxWvD` | leave as-is; it is `chevron-right`, do not remove |

Separator between rows (inside a section): a `fill_container` frame, `padding: [0, "$O:spacing-sm", 0, 52]`, containing a 1px-tall rectangle filled `$O:colors-borders-light`. Omit the separator after the **last** row in each section.

Section header: a text node, `$O:typo-primary-xs-semibold-*`, fill `$O:colors-text-meta`, all-caps label, wrapped in a frame with `padding: ["$O:spacing-xs", "$O:spacing-sm"]`.

Section order: **BANKING → INVESTMENTS → CREDIT & LOANS**. Section gap: `$O:spacing-lg`.

## Headline (above the list)

- Left, vertical, gap `$O:spacing-3xs`: all-caps `NET WORTH` (`$O:typo-primary-sm-semibold`, fill `$O:color-gray-500`, letter-spacing 1) over the total value (`$O:typo-primary-3xl-semibold`, fill `$O:color-gray-900`, letter-spacing -0.5).
- Right, horizontal, gap `$O:spacing-sm`, bottom-aligned: two outline buttons `component/Button/outline/icon-left` (`O:Ropw1`) — `+ Add Accounts` (icon `plus`) and `⚙ Manage Institutions` (icon `settings`), each `padding: [8,12]`, label 14px, `width: fit_content`.
- Headline frame uses `justifyContent: "space_between"`, `width: fill_container`.

The whole panel is a vertical frame, white background, `padding: [20, 40]`, `gap: $O:spacing-xl`, `width: fill_container`.

---

## Token reference (for any node built fresh)

| Role | Token | Light value |
|---|---|---|
| Heading / balance | `colors-text-header` / `color.gray.800` | `#202220` |
| Net worth total | `color.gray.900` | `#0E0E0E` |
| Account name | `colors-text-header` / `color.gray.700` | `#3B3E3C` |
| Secondary / meta text | `colors-text-meta` / `color.gray.500` | `#727874` |
| Negative balance | `colors-text-error` | red |
| Divider | `colors-borders-light` / `color.gray.100` | `#EEEFEE` |
| Row hover / pressed | `color-taupe-100` / `color-taupe-200` | taupe fills |
| Logo fallback bg | `color.gray.200` | `#D8D9D8` |
| Row radius | `radius-2xs` | small |
| Row padding / gap | `spacing-sm` | — |
| Font | `font.family.primary` | Heebo |

---

## Caveats observed in prior generation

1. **Logos render blank** if `images/<bank>-logo.png` paths don't resolve in the target context. When in doubt, use `component/InstitutionLogo/fallback` (`O:qVfyr`) with 2-letter initials so rows never look broken.
2. **Do not wrap each row in a card.** Rows are flat with inset separators; the only "card" is the implicit panel background.
3. **Balances are right-aligned** (`textAlign: "right"` via `MoneyText`), not inline beside the name.
4. **Keep the chevron** (`chevron-right`) after each account name — it signals the row opens a detail drawer.

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
          "initials": "WF",
          "balance": 12400,
          "formattedBalance": "$12,400",
          "refreshedLabel": "Refreshed 9:12 AM"
        },
        {
          "id": "acct_ally_savings",
          "institution": "Ally",
          "name": "Ally High-Yield Savings",
          "mask": "5678",
          "type": "Savings",
          "logo": "images/ally-logo.png",
          "initials": "AL",
          "balance": 32000,
          "formattedBalance": "$32,000",
          "refreshedLabel": "Refreshed 9:14 AM"
        },
        {
          "id": "acct_marcus_cd",
          "institution": "Marcus",
          "name": "Marcus 12-month CD",
          "mask": "9012",
          "type": "CD",
          "logo": "images/marcus-logo.png",
          "initials": "MA",
          "balance": 2800,
          "formattedBalance": "$2,800",
          "refreshedLabel": "Refreshed 8:55 AM"
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
          "initials": "CS",
          "balance": 620000,
          "formattedBalance": "$620,000",
          "refreshedLabel": "Refreshed 9:01 AM"
        },
        {
          "id": "acct_fidelity_401k",
          "institution": "Fidelity",
          "name": "Fidelity 401(k)",
          "mask": "7890",
          "type": "401(k)",
          "logo": "images/fidelity-logo.png",
          "initials": "FI",
          "balance": 480000,
          "formattedBalance": "$480,000",
          "refreshedLabel": "Refreshed 8:58 AM"
        },
        {
          "id": "acct_vanguard_roth",
          "institution": "Vanguard",
          "name": "Vanguard Roth IRA",
          "mask": "2345",
          "type": "Roth IRA",
          "logo": "images/vanguard-logo.png",
          "initials": "VG",
          "balance": 180000,
          "formattedBalance": "$180,000",
          "refreshedLabel": "Refreshed 8:48 AM"
        },
        {
          "id": "acct_coinbase",
          "institution": "Coinbase",
          "name": "Coinbase Wallet",
          "mask": "0011",
          "type": "Crypto",
          "logo": "images/coinbase-logo.png",
          "initials": "CB",
          "balance": 22000,
          "formattedBalance": "$22,000",
          "refreshedLabel": "Refreshed 9:05 AM"
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
          "mask": "5558",
          "type": "Credit",
          "logo": "images/chase-logo.png",
          "initials": "CH",
          "balance": -2400,
          "formattedBalance": "-$2,400",
          "refreshedLabel": "Refreshed 9:10 AM"
        },
        {
          "id": "acct_wf_mortgage",
          "institution": "Wells Fargo",
          "name": "Wells Fargo Mortgage",
          "mask": "1100",
          "type": "Mortgage",
          "logo": "images/wellsfargo-logo.png",
          "initials": "WF",
          "balance": -168000,
          "formattedBalance": "-$168,000",
          "refreshedLabel": "Refreshed 7:42 AM"
        },
        {
          "id": "acct_nelnet_student",
          "institution": "Nelnet",
          "name": "Nelnet Federal Direct Loan",
          "mask": "2200",
          "type": "Student Loan",
          "logo": "images/nelnet-logo.png",
          "initials": "NL",
          "balance": -8200,
          "formattedBalance": "-$8,200",
          "refreshedLabel": "Refreshed 6:30 AM"
        },
        {
          "id": "acct_auto_loan",
          "institution": "Capital One",
          "name": "Capital One Auto Loan",
          "mask": "3300",
          "type": "Auto Loan",
          "logo": null,
          "initials": "CO",
          "balance": -1400,
          "formattedBalance": "-$1,400",
          "refreshedLabel": "Refreshed 5:15 AM"
        }
      ]
    }
  ]
}
```
