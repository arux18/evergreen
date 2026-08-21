# Color Tokens & Theming: How We Do It (T1 → T2 → T3)

A short guide to Hemlock color tokens. Three tiers, one direction rule, the theme lives in one place.

---

## Three tiers

**T1 — Primitives** (`prim-*`)
Raw palette values: `prim-blue-600 = #3A6AF8`, `prim-gray-100 = #EEEDEB`, `prim-navy-surface = #131C31`.
- No meaning attached, just color. "Blue-600", never "button color".
- **Static. A primitive has the same value in light and dark** — it's paint in a can.
- Both palettes (the light grays/taupe AND the dark navy/navylight) live here side by side as equal paint sets.

**T2 — Semantic** (`sem-background-*`, `sem-text-*`, `sem-borders-*`, `sem-icons-*`)
Roles with meaning: `sem-background-surface`, `sem-text-body`, `sem-borders-error`.
- Answers "what is it for", not "which color is it".
- **This is where the theme lives.** Every T2 token is a pair of values:

```
sem-text-body:
  Light → $prim-gray-700
  Dark  → $prim-navylight-600
```

- Dark mode = the same list of roles pointing at different primitives. Nothing is computed from light — dark values are authored by hand, deliberately.

**T3 — Component tokens** (`sem-btnPrimaryBg`, `sem-tagText`, `sem-sliderTrack`)
Roles inside a specific component, with states: bg/text/border × default/hover/active/disabled.
- Create T3 **only when a component needs independent control** (buttons, toggle, tag, slider). Card or Separator live happily on T2 — don't mint tokens for the sake of minting.
- T3 is usually an alias to T2/T1, also as a Light/Dark pair. T3 may also alias another T3 (`sem-chatSendBg = $sem-btnPrimaryBg`).

**Shadow colors** (`shadow-sm-color` … `shadow-overlay-color`)
Shadow colors are semantic by nature — they change per theme — but they are named **without** a prefix so the elevation scale reads as one family alongside `shadow-{size}-blur` / `shadow-{size}-y`. Treat them as T2: components may bind them directly for elevation effects.
- In dark mode shadows are **lifted, not removed**: black at a much higher alpha (sm 50% / md 60% / lg 70% / overlay 85%) so elevation stays visible on navy surfaces. Component-specific shadow colors (`sem-cardShadow`, `sem-navShadow`, `sem-chatShadow`) alias these or author their own pair.

---

## The one hard rule: reference direction

```
component → T3 → T2 → T1
```

- A component is **never** colored with a primitive directly, and never with a raw hex.
- If there's no fitting T2/T3 token for your case — **create one**, don't reach for the primitive. That's how `sem-background-rowHover`, `sem-icons-warning-strong`, and `sem-scrollbarThumb` were born.
- A hand-typed hex in a mockup is debt that will surface with the very first theme.
- Exceptions: Token Gallery swatches (they document the paint itself), and `prim-base-white` / `prim-base-black` as universal constants.

Why this is non-negotiable: a theme switches by swapping values in **one** layer (T2). If components sit on primitives, you either rewire hundreds of bindings or end up theming the primitives (see "mistakes" below).

---

## Adding a new color: checklist

1. **Missing primitive?** Add it to T1 (both palettes, if the color will have a dark counterpart — e.g., a new navy step). Same value in both modes.
2. **Create or find the T2 role.** Name it by purpose: `sem-background-warning`, not `sem-orange-light`. Set **both** values right away: Light and Dark.
3. **The dark value is a decision, not an inversion.** A saturated light-theme color usually fails contrast on a dark surface — pick a lighter/softer step (ours: `prim-blue-600` in light → the `prim-blue-400` equivalent in dark).
4. **Check contrast in BOTH themes:** text ≥ 4.5:1, large text and UI graphics ≥ 3:1 (WCAG AA). Disabled states are exempt.
5. **Bind the component to the role**, not to the primitive.
6. **Add a swatch to the Token Gallery** in the right section (T1 → Primitives, T2 → System, T3 → Component).

## Naming (our convention)

- T1: `prim-{palette}-{step}` → `prim-navy-border-300`
- T2: `sem-{category}-{role}[-{modifier}]` → `sem-background-error-strong`, `sem-text-warning-title`
- T3: `sem-{component}{Role}{State}` → `sem-btnPrimaryBgHover`, `sem-toggleTrackOff`
- Shadow colors: `shadow-{size}-color` → `shadow-md-color` (no prefix; pairs with `shadow-{size}-blur` / `shadow-{size}-y`)
- Charts: `chart-categorical/color-{nn}`, `chart-sequential/seq-{step}`
- Intent steps: `-soft` (100) / base (50 for washes, 400–600 for accents) / `-strong` (200/600) — uniform across info/success/warning/error.
- Hex values are uppercase (`#0E0E0E`, not `#0e0e0e`) so theme pairs diff cleanly.

---

## Common mistakes

1. **Theming primitives.** Tempting ("let gray-100 be navy in dark") — we went through this ourselves as a temporary bridge, then removed it. The problem: the primitive loses its meaning (a "gray-100" that is actually dark blue), and the blast radius is uncontrollable — everything referencing it shifts at once. Correct: primitives stay static; the switch happens in T2. (Shadow colors are the deliberate exception — they are semantics by nature, which is why they don't carry the `prim-` prefix.)
2. **Recoloring a background/text pair separately.** They are coupled by contrast: if you invert a button's background, you must invert its text (our Destruction case: white on `#F87171` = 2.77 — a hard contrast fail).
3. **Minting T3 for everything.** T3 is for stateful components with their own logic. Everything else is T2.
4. **One token carrying two meanings.** `gray-50` used to be both the hover background and the disabled background — visually identical, semantically different. Split them: `sem-background-hover` and `sem-background-disabled` may point at the same primitive today and diverge in dark tomorrow when the design wants it.
5. **Dark as auto-inversion.** Every value is a decision: elevation works by lightening the surface, accents become lighter and softer, and shadows get **stronger** (higher alpha), not weaker — a shadow that disappears in dark mode isn't doing its job.

---

## Cheat sheet (live examples from our file)

```
T1  prim-taupe-100 = #F7F5F0           ← static paint
T1  prim-navy-app  = #090E1B           ← static paint (dark palette)

T2  sem-background-rowHover:
      Light → $prim-taupe-100
      Dark  → $prim-navy-app           ← the theme switches HERE

T3  sem-btnPrimaryBg:
      Light → $prim-blue-600           (accent on a light surface)
      Dark  → $prim-blue-500           (a step lighter so it doesn't glare on dark)

Shadow  shadow-md-color:
      Light → #0000001A                (black 10%)
      Dark  → #00000099                (black 60% — lifted to stay visible)

Component AccountRow/hover → fill: $sem-background-rowHover   ← the only correct way
```

Self-test with one question: **"If a third theme lands tomorrow (high-contrast, a brand theme), how many places do we edit?"** The correct answer: one layer — T2.

---

*Note: colors aren't the only theme dimension. Typography carries its own `desktop`/`mobile` modes (`text-size-*`, `line-height-*`, `font-primary` = Heebo, `font-secondary` = Noto Serif). Spacing/radius and effects/motion are single-mode (`Default`).*
