# Questions Engineers Usually Ask

Settle each one from the design, or list it under **Open questions** as TBD. Never answer one by guessing.

## States
- What does every interactive element look like on hover, pressed, focus (keyboard), disabled and loading?
- What is shown while data loads: skeleton, spinner or nothing? After how long?
- Empty state: no data yet, no results, or everything removed?
- Error states: field-level, screen-level, network or timeout? What does retry do?
- Success: toast, inline message, or a new screen? Does it auto-dismiss, and after how long?

## Flow
- Where does every button and link go, including Cancel, Back and closing a modal?
- What happens on refresh, deep link or browser back in the middle of the flow?
- Timers and cooldowns: exact durations, and what the countdown shows.
- Limits: max attempts, lockouts, character limits, validation rules and when validation fires.

## Content
- Is all copy final? Which strings are placeholders?
- Long content: truncate, wrap or scroll? Long names, large numbers, many items?
- Dates, currency and number formats.

## Layout
- Breakpoints, and what changes at each (stack, hide, become a bottom sheet).
- Min and max widths; what stretches and what stays fixed.
- Scroll behavior: what's sticky, what scrolls, scroll shadows or borders.

## Theme and tokens
- Do both light and dark exist for every screen? Anything intentionally different?
- Any color not on a token, and why (brand art only)?
- Which Hemlock component is each element, and which variant?

## Motion
- Transitions and durations (for example, a 200ms border fade-in). Respect reduced-motion?

## Accessibility
- Focus order and focus trap in modals; what receives focus on open and close.
- Screen-reader labels for icon-only buttons; live-region announcements for errors and timers.
- Contrast checked in both themes for new color pairings.

## Analytics and flags
- Events to fire, if Amanda has specified them.
- Is the feature behind a flag, and what shows when it's off?
