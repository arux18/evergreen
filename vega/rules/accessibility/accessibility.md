# Accessibility Rules (WCAG 2.1 AA minimum — enforced)

> **Purpose:** Governs how Vega evaluates accessibility violations. Contains concrete WCAG thresholds, the tiered severity model, the exception registry, and escalation rules. Vega MUST consult this file before flagging any accessibility issue.

---

## Standards & Thresholds

### Contrast (minimum)


| Element                                | Ratio |
| -------------------------------------- | ----- |
| Body text                              | 4.5:1 |
| Large text (18px+ or 14px+ bold)       | 3:1   |
| UI components, borders, non-text icons | 3:1   |


### Color is never the only indicator

- Trend: color + arrow icon (up/down/minus) + text label ("+2.4%")
- Budget progress: color fill + percentage text
- Charts: legend + pattern/shape, not color alone
- All tokens support light/dark — never hardcode hex

### Typography minimums


| Context          | Min  | Token           |
| ---------------- | ---- | --------------- |
| Body text        | 14px | `$font.size.md` |
| Small labels     | 11px | `$font.size.xs` |
| Absolute floor   | 10px | —               |
| Financial values | 14px | —               |


Line height: body 1.4–1.5; multi-line descriptions always `lineHeight: 1.5`.

### Touch / click targets


| Element               | Min                                       |
| --------------------- | ----------------------------------------- |
| Buttons, icon buttons | 44×44px (tap target; icon can be smaller) |
| List items            | 44px height (whole row is target)         |
| Filter chips          | 32px height with adequate padding         |
| Checkboxes / toggles  | 44×44px tap target                        |


Gaps: 8px min between adjacent interactive elements; 12px+ between destructive and safe actions.

### Screen reader patterns


| Visual         | Announcement                                                                 |
| -------------- | ---------------------------------------------------------------------------- |
| +2.4%          | "increased by two point four percent"                                        |
| -$1,247.80     | "decreased by one thousand two hundred forty-seven dollars and eighty cents" |
| 84% (budget)   | "eighty-four percent of budget used"                                         |
| Green up arrow | "trending up" (via aria-label)                                               |


Component announcement patterns: `KPI Card` → "[Label]: [Value], [trend] [change]". `Transaction Item` → "[Merchant], [category], [amount], [date]". `AI Insight` → "AI Insight: [title]. [body]". Loading → "Loading [content type]…". Error → "Error: [title]. [description]. [actions]".

### Focus

- Visible ring on every interactive element: `$border.focus`, ≥2px, 3:1 contrast against adjacent colors
- Order: sidebar → header actions → KPI row (L→R) → main content (top→bottom, L→R) → secondary actions

### Motion

- All animations respect `prefers-reduced-motion: reduce` → instant transitions, no shimmer
- Use `$motion.`* tokens so motion can be globally disabled
- Never use motion as the only way to convey information
- Loading: subtle shimmer only (never pulse). Chart transitions: fade (never bounce/spring). Values: brief highlight (never flash).

---

## Severity Model

Not all WCAG violations carry equal user impact. Vega classifies every finding into one of three tiers based on **what the user is trying to do**, not just whether a spec threshold is met.

### 🔴 Must-Fix — Blocks Approval

A violation is must-fix when it affects a user's ability to **understand critical information, complete a task, or make a financial decision**.

**Applies when the element is:**

- Financial data (balances, returns, projections, transaction amounts)
- Interactive (buttons, links, form inputs, toggles, sliders)
- Navigation (menus, tabs, breadcrumbs, skip links)
- Status/feedback (alerts, errors, confirmations, progress indicators)
- Data visualization labels, axes, or legends that convey meaning
- Any element where misreading or missing it could lead to a wrong financial decision

**Thresholds:**

- Text contrast below **3.0:1** on any element → always must-fix
- Text contrast below **4.5:1** on financial data, interactive elements, or primary content → must-fix
- Missing keyboard access on any interactive element → must-fix
- Missing form labels → must-fix
- Missing alt text on informational images/charts → must-fix
- Focus indicator completely removed with no replacement → must-fix
- Touch target below 44×44px on any interactive element → must-fix
- Color used as the only indicator for financial data → must-fix

### 🟡 Should-Fix — Flagged, Tracked, Non-Blocking

A violation is should-fix when it's a **real accessibility gap** but the user impact is lower — they can still complete their task, the information is available through other means, or the element is secondary.

**Applies when the element is:**

- Secondary/supporting text (captions, metadata, timestamps, helper text)
- Decorative or supplementary UI (badges, tags, section dividers)
- Redundant information (text that duplicates what's already conveyed elsewhere)
- Non-critical illustrations or decorative images

**Thresholds:**

- Text contrast between **3.0:1 and 4.5:1** on secondary content → should-fix
- Large text (18px+ or 14px+ bold) between **3.0:1 and 4.5:1** → should-fix (AA-large still passes)
- Missing alt text on decorative images (should be `alt=""`) → should-fix
- Animation without `prefers-reduced-motion` on non-essential transitions → should-fix
- Screen reader announcement pattern doesn't match the template above but content is still accessible → should-fix

**Tracking:** Should-fix items get logged. Vega includes them in audit reports. The team reviews them periodically and either fixes or promotes to known exception.

### 🔵 Known Exception — Registered, No Action

A known exception is an **intentional deviation** from WCAG that the team has reviewed and accepted. Vega does not flag, nag, or re-report these. They exist in the Exception Registry below.

**An exception must have:**

1. A unique ID (EX-001, EX-002, etc.)
2. The specific WCAG criterion being violated
3. What element/component is affected
4. The measured value vs. the required value
5. **Why** — the design rationale for the deviation
6. **Mitigation** — what alternative access is provided (if any)
7. **Review date** — when this exception should be reconsidered
8. Who approved it

---

## Exception Registry



*No exceptions registered yet. Use the template above to add the first one.*

---

## Escalation Rules

**When Vega is unsure about the tier:**
If a violation doesn't clearly fit must-fix or should-fix, Vega defaults to **should-fix** and flags it for human triage. Vega never silently downgrades a potential must-fix.

**When the team disagrees with Vega's classification:**
The human reviewer can override Vega's tier in the PR/Linear comment. If the override should be permanent (i.e., it applies to future audits too), it gets added to the Exception Registry.

**When a should-fix keeps getting deferred:**
If the same should-fix appears in 3+ consecutive audits without action, Vega escalates it to must-fix in the next audit and notes: *"This has been flagged in [N] audits without resolution — escalating."*

**When an exception expires:**
When the current date passes an exception's review date, Vega re-flags it as should-fix and notes: *"Exception EX-XXX is due for review. Re-evaluate or extend the review date."*

---

## Vega's Decision Flowchart

```
Violation detected
       │
       ▼
Is it in the Exception Registry?
       │
  YES ──► 🔵 Known Exception — log, don't flag
       │
  NO ───► Does it affect financial data, interactive elements,
       │   navigation, or task completion?
       │
  YES ──► Is contrast below 3.0:1 OR is it a missing
       │   keyboard/label/focus/touch-target issue?
       │
  YES ──► 🔴 Must-Fix (blocks approval)
       │
  NO ───► Is contrast between 3.0:1 and 4.5:1
       │   on primary content?
       │
  YES ──► 🔴 Must-Fix (blocks approval)
       │
  NO ───► 🟡 Should-Fix (tracked, non-blocking)
       │
  ◄─────► Is it secondary/decorative content?
       │
  YES ──► 🟡 Should-Fix (tracked, non-blocking)
       │
  NO ───► Default to 🟡 Should-Fix, flag for human triage
```

---

## How to Register a New Exception

Ask Vega: *"Register an accessibility exception for [element/component]"*

Vega will:

1. Measure the actual violation (contrast ratio, missing attribute, etc.)
2. Draft the exception entry using the template above
3. Post it for human approval
4. **Only after human approval:** add it to the Exception Registry in this file

