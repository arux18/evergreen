# Color Tokens & Theming: How We Do It (T1 → T2 → T3)

A short guide to Hemlock color tokens. Three tiers, one direction rule, the theme lives in one place.

---

## Three tiers

**T1 — Primitives** (`prim-*`)
Raw palette values: `prim-blue-600 = #3a6af8`, `prim-gray-100 = #EEEDEB`, `prim-navy-700 = #131C31`.
- No meaning attached, just color. "Blue-600", never "button color".
- **Static. A primitive has no light/dark version** — it's paint in a can.
- Both palettes (the light grays/taupe AND the dark navy/navylight) live here side by side as equal paint sets.

**T2 — Semantic** (`sem-background-*`, `sem-text-*`, `sem-borders-*`, `sem-icons-*`)
Roles with meaning: `sem-background-surface`, `sem-text-body`, `sem-borders-error`.
- Answers "what is it for", not "which color is it".
- **This is where the theme lives.** Every T2 token is a pair of values:

```
sem-text-body:
  light → $prim-gray-700
  dark  → $prim-navylight-600
```

- Dark mode = the same list of roles pointing at different primitives. Nothing is computed from light — dark values are authored by hand, deliberately.

**T3 — Component tokens** (`sem-btnPrimaryBg`, `sem-tagText`, `sem-sliderTrack`)
Roles inside a specific component, with states: bg/text/border × default/hover/active/disabled.
- Create T3 **only when a component needs independent control** (buttons, toggle, tag, slider). Card or Separator live happily on T2 — don't mint tokens for the sake of minting.
- T3 is usually an alias to T2/T1, also as a light/dark pair.

---

## The one hard rule: reference direction

```
component → T3 → T2 → T1
```

- A component is **never** colored with a primitive directly, and never with a raw hex.
- If there's no fitting T2/T3 token for your case — **create one**, don't reach for the primitive. That's how `sem-background-rowHover`, `sem-icons-warning-strong`, and `sem-scrollbarThumb` were born.
- A hand-typed hex in a mockup is debt that will surface with the very first theme.

Why this is non-negotiable: a theme switches by swapping values in **one** layer (T2). If components sit on primitives, you either rewire hundreds of bindings or end up theming the primitives (see "mistakes" below).

---

## Adding a new color: checklist

1. **Missing primitive?** Add it to T1 (both palettes, if the color will have a dark counterpart — e.g., a new navy step).
2. **Create or find the T2 role.** Name it by purpose: `sem-background-warning`, not `sem-orange-light`. Set **both** values right away: light and dark.
3. **The dark value is a decision, not an inversion.** A saturated light-theme color usually fails contrast on a dark surface — pick a lighter/softer step (ours: `prim-blue-600` in light → `prim-blue-500` in dark).
4. **Check contrast in BOTH themes:** text ≥ 4.5:1, large text and UI graphics ≥ 3:1 (WCAG AA). Disabled states are exempt.
5. **Bind the component to the role**, not to the primitive.
6. **Add a swatch to the Token Gallery** in the right section (T1 → Primitives, T2 → System, T3 → Component) — in **both** the light and dark galleries.

## Naming (our convention)

- T1: `prim-{palette}-{step}` → `prim-navy-300`
- T2: `sem-{category}-{role}[-{modifier}]` → `sem-background-error-strong`, `sem-text-error-title`
- T3: `sem-{component}{Role}{State}` → `sem-btnPrimaryBgHover`, `sem-toggleTrackOff`
- Intent steps: `-soft` (100) / base (50 for washes, 400–600 for accents) / `-strong` (200/600) — uniform across info/success/warning/error.

---

## Common mistakes

1. **Theming primitives.** Tempting ("let gray-100 be navy in dark") — we went through this ourselves as a temporary bridge, then removed it. The problem: the primitive loses its meaning (a "gray-100" that is actually dark blue), and the blast radius is uncontrollable — everything referencing it shifts at once. Correct: primitives stay static; the switch happens in T2.
2. **Recoloring a background/text pair separately.** They are coupled by contrast: if you invert a button's background, you must invert its text (our Destruction case: white on `#F87171` = 2.77 — a hard contrast fail).
3. **Minting T3 for everything.** T3 is for stateful components with their own logic. Everything else is T2.
4. **One token carrying two meanings.** `gray-50` used to be both the hover background and the disabled background — visually identical, semantically different. Split them: `background-hover` and `background-disabled` may point at the same primitive today and diverge in dark tomorrow when the design wants it.
5. **Dark as auto-inversion.** Shadows get weaker (dark themes lean on borders instead), elevation works by lightening the surface, accents become lighter and softer. Every value is a decision.

---

## Cheat sheet (live examples from our file)

```
T1  prim-taupe-100 = #F7F5F0           ← static paint
T1  prim-navy-500  = #172642           ← static paint (dark palette)

T2  sem-background-rowHover:
      light → $prim-taupe-100
      dark  → $prim-navy-500           ← the theme switches HERE

T3  sem-btnPrimaryBg:
      light → $prim-blue-600           (accent on a light surface)
      dark  → $prim-blue-500           (a step lighter so it doesn't glare on dark)

Component AccountRow/hover → fill: $sem-background-rowHover   ← the only correct way
```

Self-test with one question: **"If a third theme lands tomorrow (high-contrast, a brand theme), how many places do we edit?"** The correct answer: one layer — T2.
