# Color Tokens & Theming: How We Do It (T1 → T2 → T3)

A short guide to Hemlock color tokens. Three tiers, one direction rule, the theme lives in one place.

---

## Three tiers

**T1 — Primitives** (`color-*`)
Raw palette values: `color-blue-600 = #3a6af8`, `color-gray-100 = #EEEDEB`, `color-navy-surface = #131C31`.
- No meaning attached, just color. "Blue-600", never "button color".
- **Static. A primitive has no light/dark version** — it's paint in a can.
- Both palettes (the light grays/taupe AND the dark navy/navylight) live here side by side as equal paint sets.

**T2 — Semantic** (`colors-background-*`, `colors-text-*`, `colors-borders-*`, `colors-icons-*`)
Roles with meaning: `colors-background-surface`, `colors-text-body`, `colors-borders-error`.
- Answers "what is it for", not "which color is it".
- **This is where the theme lives.** Every T2 token is a pair of values:

```
colors-text-body:
  light → $color-gray-700
  dark  → $color-navylight-600
```

- Dark mode = the same list of roles pointing at different primitives. Nothing is computed from light — dark values are authored by hand, deliberately.

**T3 — Component tokens** (`colors-btnPrimaryBg`, `colors-tagText`, `colors-sliderTrack`)
Roles inside a specific component, with states: bg/text/border × default/hover/active/disabled.
- Create T3 **only when a component needs independent control** (buttons, toggle, tag, slider). Card or Separator live happily on T2 — don't mint tokens for the sake of minting.
- T3 is usually an alias to T2/T1, also as a light/dark pair.

---

## The one hard rule: reference direction

```
component → T3 → T2 → T1
```

- A component is **never** colored with a primitive directly, and never with a raw hex.
- If there's no fitting T2/T3 token for your case — **create one**, don't reach for the primitive. That's how `background-rowHover`, `icons-warning-strong`, and `scrollbarThumb` were born.
- A hand-typed hex in a mockup is debt that will surface with the very first theme.

Why this is non-negotiable: a theme switches by swapping values in **one** layer (T2). If components sit on primitives, you either rewire hundreds of bindings or end up theming the primitives (see "mistakes" below).

---

## Adding a new color: checklist

1. **Missing primitive?** Add it to T1 (both palettes, if the color will have a dark counterpart — e.g., a new navy step).
2. **Create or find the T2 role.** Name it by purpose: `colors-background-warning`, not `colors-orange-light`. Set **both** values right away: light and dark.
3. **The dark value is a decision, not an inversion.** A saturated light-theme color usually fails contrast on a dark surface — pick a lighter/softer step (ours: `blue-600` in light → the `blue-400` equivalent in dark).
4. **Check contrast in BOTH themes:** text ≥ 4.5:1, large text and UI graphics ≥ 3:1 (WCAG AA). Disabled states are exempt.
5. **Bind the component to the role**, not to the primitive.
6. **Add a swatch to the Token Gallery** in the right section (T1 → Primitives, T2 → System, T3 → Component).

## Naming (our convention)

- T1: `color-{palette}-{step}` → `color-navy-border-300`
- T2: `colors-{category}-{role}[-{modifier}]` → `colors-background-error-strong`, `colors-text-warning-title`
- T3: `colors-{component}{Role}{State}` → `colors-btnPrimaryBgHover`, `colors-toggleTrackOff`
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
T1  color-taupe-100 = #F7F5F0          ← static paint
T1  color-navy-app  = #090E1B          ← static paint (dark palette)

T2  colors-background-rowHover:
      light → $color-taupe-100
      dark  → $color-navy-app          ← the theme switches HERE

T3  colors-btnPrimaryBg:
      light → $color-blue-600          (accent on a light surface)
      dark  → $color-blue-500          (a step lighter so it doesn't glare on dark)

Component AccountRow/hover → fill: $colors-background-rowHover   ← the only correct way
```

Self-test with one question: **"If a third theme lands tomorrow (high-contrast, a brand theme), how many places do we edit?"** The correct answer: one layer — T2.
