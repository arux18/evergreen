# Legible Generation

**Category:** Generative UI — Trust  
**Layer:** Interaction / Motion  
**Status:** Emerging law — generative UI specific

---

## Definition

Users must be able to *see* that UI is being generated. The process of generation — not just the output — is a primary trust signal. Streaming, skeleton-to-content transitions, and progressive build patterns are not performance conveniences; they are the mechanism by which users accept and trust AI-generated output.

---

## Core Principle

Static interfaces deliver finished states. Generative interfaces are in a process. That process, made visible, does two things:

1. **Sets expectations** — users understand an AI is working, not that the product is broken
2. **Primes acceptance** — watching content build incrementally lowers resistance to AI output vs. receiving a sudden, opaque result

Hiding the generation process — delivering output as an instant, complete artifact — removes these trust-building moments and makes errors feel more jarring when they occur.

---

## The Generation Visibility Spectrum

### 1. Initiation signal
The moment a user action triggers generation, the interface must respond immediately — even before any output exists.

**Patterns:**
- Input bar transitions to a "sent" or "processing" state
- A typing/thinking indicator appears in the canvas zone
- A skeleton or placeholder appears in the location where output will arrive

### 2. Active generation signal
While generation is in progress, the user needs a continuous visible indication that work is happening.

**Patterns:**
- Streaming text — characters or words appear progressively
- Progressive skeleton reveal — skeleton components fill in section by section
- Animated thinking indicator (e.g. pulsing dots, animated icon)
- Subtle canvas zone border change to signal "active"

### 3. Completion signal
The moment generation ends must be clearly marked. Abrupt stops feel broken; a clear resolution feels intentional.

**Patterns:**
- Thinking indicator disappears
- Final content snaps into place (with a subtle fade, not a jump)
- Input bar returns to ready state
- Action affordances appear on the generated content (edit, regenerate, copy)

---

## Design Decisions

### Skeleton states are design artifacts, not engineering placeholders
Skeletons should reflect the approximate shape of the expected output. A skeleton that looks nothing like the final content creates a jarring transition. Design skeletons in lockstep with the components they precede.

### Streaming is preferable to delayed delivery
For text-heavy output: stream it. Users who see text arriving progressively feel engaged and in control. Users who wait for a full response then receive it in one instant feel passive and surprised.

### The thinking state is its own design problem
"Thinking" is a distinct phase (before output starts) from "generating" (output is streaming). These need different visual treatments:
- **Thinking:** uncertainty, latency, AI is processing — dots, pulse, ambient animation
- **Generating:** output arriving, forward progress — streaming text, progressive reveal

### Don't animate shell layers during generation
Motion should be contained to the generative canvas. Animating nav, header, or persistent controls during generation is distracting and breaks Output Anchoring.

---

## Generation States to Design

| State | What the user sees |
|---|---|
| Idle | Shell + empty canvas + ready input |
| Initiated | Input transitions; skeleton or indicator appears in canvas |
| Thinking | Thinking animation in canvas; shell unchanged |
| Generating | Content streaming/building; thinking indicator gone |
| Complete | Full content visible; action affordances appear |
| Error | Error state in canvas; input returns to ready |
| Interrupted | Partial content with clear truncation signal; reset affordance |

---

## Evergreen Application

- The Evergreen Intelligence "thinking" and "typing" states are the primary implementation of this law
- The empty state (before any interaction) is the canvas's idle state — it should communicate *readiness*, not emptiness
- Streaming text responses for financial projections or explanations build trust incrementally — especially important for HNW clients who are skeptical of AI
- When generating a chart or data visualization, reveal the skeleton of the chart structure first, then populate data — not a blank-to-full-chart jump

---

## Related Laws

- **Output Anchoring** — what stays stable while generation is visible
- **Calibrated Trust** — legible generation is the primary mechanism for building calibrated trust
- **Reversibility** — the completion state is where reversibility affordances appear
- **Graceful Degradation** — error states are part of the generation visibility spectrum

---

## Anti-Patterns

- Delivering complete AI output with no visible generation process ("instant appearing" content)
- Using a full-page spinner that hides the shell entirely
- Skeleton states that don't match the shape of the output they precede
- No distinction between "thinking" and "generating" states
- Stopping generation with no completion signal
- Animating nav or header elements during generation
- Auto-scrolling the page during streaming in a way that disorients the user
