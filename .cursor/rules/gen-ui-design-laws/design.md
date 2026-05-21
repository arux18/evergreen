# design.md — App Shell

**Product:** Evergreen.ai App Shell  
**PRD Version:** 1.4 (Approved 2026-04-30)  
**Designer:** Amanda Ribeiro (Pencil.dev)  
**Status:** In progress — this file evolves alongside designs  
**Audience:** Engineers, AI coding agents (Cursor/Claude Code), Design, Product

---

## What This File Is

This is the design-intent document for the Evergreen App Shell. It translates the PRD's functional requirements into visual specs, component behavior, interaction patterns, states, and edge cases — written for both human developers and AI coding tools.

Everything here answers: **what should this look and feel like, and why.**

For the "what does it do" → see the [App Shell PRD](https://linear.app/evergreen-money/project/app-shell-59a162f5ab67).  
For the generative UI design principles that govern this product → see the law files in this same directory.

---

## Governing Design Laws

These laws are not suggestions — they are structural constraints. Every component in this shell must comply. Laws are documented in full in this directory; inline notes appear below only where a law directly shapes a specific design decision.

| Law | File | How It Governs This Shell |
|---|---|---|
| Output Anchoring | `output-anchoring.md` | Sidebar, header, and input bar are immovable (Layer 1–2). Only the center workspace canvas is AI-owned (Layer 3). |
| Legible Generation | `legible-generation.md` | All AI responses must show thinking → generating → complete states. No instant-appearing content. |
| Reversibility | `reversibility.md` | New Chat requires confirmation. View content appends, never silently replaces. Prior session stored before clearing. |
| Intentional Seams | `intentional-seams.md` | The boundary between shell chrome and generative canvas is the primary architectural seam — defined once in the design system. |
| Consistent Voice | `consistent-voice.md` | All AI-generated text — chat, View, labels, errors — follows a single voice definition. Tone is a design token. |
| Contextual Coherence | `contextual-coherence.md` | AI response framing must match the user's data context and emotional state. Positive framing on negative data is a product failure. |
| Calibrated Trust | `calibrated-trust.md` | Financial projections include visible provenance. Confidence levels are surfaced, not hidden. "Verify with your advisor" is a designed affordance. |
| Interpretability | `interpretability.md` | Every generated output must answer "why this?" within one interaction. Provenance is progressive disclosure, never buried. |
| Graceful Degradation | `graceful-degradation.md` | AI failures show in the canvas only — shell stays stable. No blank canvases. Every error has a path forward. |

---

## Terminology

These terms are used throughout this file and the PRD. Use them consistently in code, components, and comments.

| Term | Scope | Meaning |
|---|---|---|
| **View** | Client-facing | The center workspace content area when displaying AI-generated responses. Used in all user-facing copy. |
| **Feed** | Internal | The scrolling display within the View — a vertically-scrolling list of canvases accumulated during a chat session. |
| **Canvas** | Internal | An independent, self-contained AI response unit rendered using the Gen UI component library. |
| **Feed canvas** | Internal | A canvas posted to the feed during a chat session. Static after rendering, appends below previous canvases. |
| **Page canvas** | Internal | A canvas rendered on a specific app page (e.g., PFM Transactions). Overwritten on each new AI response, not appended. |
| **Shell** | Internal | The persistent structural frame — sidebar, header, chat panel chrome. Never generated, never touched by AI. |

---

## Naming Disclaimer

All tile names, navigation labels, tab names, and UI strings in this file are **provisional working labels**. Final naming will be set as designs are finalized. Engineering should treat all strings as placeholders and centralize copy so final names can be applied without rework to component logic.

---

## 1. App Shell — Three-Panel Layout

### 1.1 Layout Structure

The shell is a three-panel workspace replacing the current two-panel layout for AI env users.

```
┌─────────────────────────────────────────────────────────┐
│                      Header (Layer 1)                   │
├────────┬──────────────────────────────┬─────────────────┤
│        │                              │                 │
│  Left  │     Center Workspace         │   Right Chat    │
│  Nav   │     (Layer 3 — Canvas)       │   Panel         │
│ Sidebar│                              │   (Layer 2+3)   │
│        │  Dashboard (tile grid)       │                 │
│(Layer 1│       — or —                 │  Chat history   │
│  + 2)  │  View (AI-generated feed)    │  + prompt area  │
│        │       — or —                 │                 │
│        │  App page (navigated)        │                 │
│        │                              │                 │
├────────┴──────────────────────────────┴─────────────────┤
│                   (mobile: single panel)                │
└─────────────────────────────────────────────────────────┘
```

**Shell layer assignments** (per Output Anchoring):

| Layer | Zone | AI Can Touch? | Behavior During Generation |
|---|---|---|---|
| Layer 1 — Immovable | Header, sidebar nav, branding, user identity | Never | No animations, no content shifts, no conditional rendering |
| Layer 2 — Persistent Controls | Chat input bar, Send/Mic/New Chat buttons, sidebar expand/collapse | Never | Always interactive, even during active generation |
| Layer 3 — Generative Canvas | Center workspace content area | Yes — this is the only AI-owned zone | Scrolls internally, never pushes shell layers, contains its own loading/error/empty/success states |

**Why this matters:** When the AI generates content, only the canvas changes. Users always know where they are. The frame never moves.

### 1.2 Left Sidebar Navigation

**Structure:**

- Three top-level items: Dashboard, Net Worth, Planning (provisional names)
- Each item expands/collapses to show sub-tabs
- Dashboard has no sub-tabs — selecting it shows the tile grid directly
- Net Worth sub-tabs: Accounts, Add Accounts, Holdings, Transactions
- Planning sub-tabs: Budget, Cash Flow, Lifetime Planning

**Behavior:**

- Sidebar collapses to zero width, freeing full viewport for center workspace
- Collapse/expand state is **independent** between main dashboard context and fullscreen overlay context (user can have sidebar open on dashboard but collapsed in a fullscreen tile)
- On mobile (≤599px): sidebar is accessed through a **modal menu**, not a persistent panel

### 1.3 Center Workspace — Three Modes

The center workspace serves triple duty. It displays one of three content types at any given time:

| Mode | What's Shown | When |
|---|---|---|
| **Dashboard** | Responsive tile grid — fixed layout, not user-editable | Default on app open; selected via sidebar |
| **View** | AI-generated feed of canvases (scrollable, appending) | When AI produces rich content during a chat session |
| **App Page** | Standard page navigated by user or AI | When user navigates via sidebar or AI navigates per confirmed request |

**Transition behavior:**

- Dashboard → View: triggered when AI generates first View content in a session. Dashboard is replaced, not overlaid.
- View → Blank: triggered on New Chat confirmation. View clears to blank state (does NOT revert to dashboard).
- View → App Page: triggered on confirmed AI navigation. Standard route change.
- Any mode → Dashboard: user selects Dashboard in sidebar.

### 1.4 Tile Grid Dashboard

- Responsive grid — column count adjusts by viewport width
- Row height scales with available width
- Each tile has fixed width and height multipliers (spanning multiple grid cells)
- Layout is fixed and not user-editable (no drag, resize, or close)
- Default landing view when user opens the app

**Tile anatomy:**

- Header (title)
- Fullscreen expand button
- Content preview area

**Tile expand:** Clicking the expand button triggers an animated transition from the tile's grid position into the fullscreen overlay.

**Tile error state:** If tile data fails to load, the affected tile (not the whole dashboard) shows an error message. Per Graceful Degradation: no blank tiles, no generic errors — explain what's wrong and offer a next action.

### 1.5 Fullscreen Overlay

When a tile expands, the overlay includes:

- Mirrored left sidebar (independent collapse state from main dashboard)
- Header with title and controls
- Tab bar corresponding to the active navigation item's sub-tabs
- Scrollable content body

Active tab persists when navigating away and returning.

### 1.6 Responsive Behavior

**Single breakpoint: 599px**

| Viewport | Experience |
|---|---|
| ≥600px | Desktop three-panel: sidebar + center workspace + chat panel |
| ≤599px | Mobile single-panel: modal sidebar, fixed bottom chat input, fullscreen chat expansion |

**Mobile-specific patterns:**

| Pattern | Behavior |
|---|---|
| Chat input | Fixed to bottom of screen, always visible |
| Chat expansion | Tapping input or starting a conversation expands chat to fullscreen |
| Chat minimize | User can minimize back to fixed bottom input — chat history preserved |
| Sidebar | Modal menu, not persistent |
| View switching | When AI generates View content while user is in expanded chat, user can switch to View from within the chat |
| AI navigation | Chat auto-minimizes, center workspace shows target page |
| Back navigation | User can navigate "back" from expanded View or fullscreen tile to return to dashboard |

---

## 2. Chat Experience

### 2.1 Chat Panel Chrome

**Desktop (≥600px):**

- Open by default on app load
- Slides in from right edge
- Width is resizable via left-edge drag handle
- Offsets center workspace (does not overlay)
- Closeable via close button in header; persistent entry point to reopen

**Chat header:** Title "Chat" + close button.

**Prompt area (bottom of panel):**

- New Chat button
- Mic button (voice input — see Section 3)
- Text input field (multiline via Shift+Enter)
- Send button (also triggered by Enter key)

### 2.2 Response Routing

The AI determines the best channel for each response. This is the core design pattern of the chat experience.

| Response Type | Where It Renders | When to Use | Chat Panel Behavior |
|---|---|---|---|
| **Text-only** | Chat panel only | Simple factual answers, confirmations | 2–3 sentence response, no View generated |
| **View content** | Center workspace (View panel) | Tables, charts, visualizations, detailed content, anything exceeding 2–3 sentences | 2–3 sentence summary in chat + rich content in View |
| **Navigation** | Center workspace (route change) | User's query is best served by an existing app page or tool | AI suggests navigation in chat → user confirms → AI navigates + sends confirmation message |

**The 2–3 sentence boundary** is a concrete, testable threshold. If a response would exceed this in the chat panel, it routes to the View. The chat panel is always a concise conversational anchor.

**Every AI response produces a chat message** — even when View content or navigation also occurs. The user never sees content appear in the View without an accompanying message in chat explaining what was generated.

> **Contextual Coherence applies here:** The AI's choice of response type must feel appropriate to the query. A user asking "what's my net worth?" should get a quick text answer. A user asking "break down my portfolio allocation" should get a View with a visualization. Misrouted responses feel jarring and break trust.

### 2.3 Navigation Flow (Two-Step Confirmation)

Navigation is never silent. The AI does not move the user without permission.

**Flow:**

1. **Suggestion** — AI presents a navigation suggestion in chat: "I can take you to the Retirement Calculator. Would you like me to navigate there?"
2. **Confirmation** — User confirms in chat
3. **Navigation + Confirmation** — AI navigates center workspace to target page, keeps chat open, sends a completion message: "Done — I've opened the Budget tool and highlighted your monthly breakdown."

The suggestion message describes any planned page actions (pre-filling forms, highlighting data) so the user knows what to expect before confirming.

> **Calibrated Trust shapes this:** Requiring confirmation prevents the AI from silently disrupting context. The user remains in control. This is especially important for HNW clients making consequential financial decisions.

### 2.4 View Panel Behavior

- Renders in the center workspace, replacing the dashboard when AI generates View content
- Uses the full **Generative UI component library** — text, tables, visualizations
- **Progressive append:** New View content appends below previous content (never replaces). The View is scrollable. Each canvas in the feed is static after rendering.
- **View-Chat coupling:** Each View is linked to its originating chat session. When stored, the associated View content is stored with it.
- **New Chat clears View:** On New Chat confirmation, View clears to blank (does not revert to dashboard). Blank state persists until new chat generates content.

> **Reversibility shapes this:** Append-not-replace is a structural decision. Users need to scroll back through what the AI generated. Prior content is never silently destroyed. The New Chat confirmation exists specifically to prevent accidental loss.

> **Legible Generation shapes this:** When the AI generates View content, the user must see the generation process — thinking indicator in chat, then progressive reveal in the canvas. No instant-appearing charts or tables.

### 2.5 View Panel Generation States

| State | Canvas Behavior | Chat Panel Behavior | Shell Behavior |
|---|---|---|---|
| **Idle** | Dashboard visible (or blank if mid-session with no View content yet) | Ready for input | Unchanged |
| **Thinking** | Unchanged — no premature canvas activity | Animated thinking indicator with rotating messages ("Thinking…", "Analyzing your request…") | Unchanged |
| **Generating (text-only)** | Unchanged | Streaming text response | Unchanged |
| **Generating (View)** | Skeleton/placeholder appears, then content streams in progressively | Short summary streams in chat | Unchanged |
| **Complete** | Full content visible; action affordances appear | Response complete | Unchanged |
| **Error** | Error state in canvas zone only (if View was expected) | Error message: "We ran into an issue and were unable to process your request. Please try again later if the issue persists." | Unchanged — shell never degrades |

**Design the skeleton states:** Skeletons should reflect the approximate shape of the expected output. A chart skeleton looks like a chart. A table skeleton looks like a table. Per Legible Generation: skeletons are design artifacts, not engineering placeholders.

### 2.6 Context Awareness

The AI is not a generic chatbot — it is spatially and data-aware.

| Context Type | What the AI Knows | How It Uses It |
|---|---|---|
| **Page awareness** | Which page the user is currently viewing | Tailors responses to current context without user re-explaining |
| **Data awareness** | Full content displayed on the current page (data, visualizations, dynamic content) | Answers questions about what the user sees ("What does this transaction mean?") |
| **Input awareness** | Values user has entered or modified on forms | Reasons about in-progress work ("Is this budget realistic given my income?") |
| **App knowledge** | All pages and tools available in the app | Recommends/navigates to tools the user might not know exist |

**Active page interaction:** The AI can manipulate data on the current page — fill form inputs, adjust values, generate on-page visualizations. This goes beyond read-only awareness.

**In-page chat input:** On supported pages, an on-page text input functions as an extension of the sidebar chat. Messages entered here appear in the sidebar chat panel; responses are generated in the context of the current page's data.

### 2.7 Session Management

| Event | What Happens |
|---|---|
| **User sends first message** | Session becomes active |
| **Chat panel closed and reopened** | Full chat history preserved — appears exactly as it was |
| **User clicks New Chat** | Confirmation dialog warns current chat and View will be cleared |
| **User confirms New Chat** | Current session (chat + View) is persisted → chat and View clear → blank state until new message |
| **User cancels New Chat** | Nothing changes, session continues |
| **User logs out or session expires** | Session stored, new login gets a blank chat and blank View |

**Transcript persistence:** All chat sessions are stored (chat transcript + linked View content) for compliance (SEC 17a-4, FINRA 3110), reporting, and future product use. Storage failures retry silently — never block the user's chat experience.

---

## 3. Voice Input

### 3.1 Interaction Model

**Hybrid tap-to-start + auto-silence:**

1. User taps mic button → microphone permission requested (if not already granted)
2. Permission granted → recording starts → mic button enters active recording visual state
3. Recording auto-stops after **2.0 seconds of continuous silence** — or user taps mic button again to stop manually
4. Final transcript is appended to existing chat input field contents (does not replace)
5. User reviews/edits transcribed text, then manually submits via Send or Enter

**Key constraints:**

- Maximum recording duration: **150 seconds (2.5 minutes)**
- One active recording session per user at a time
- Intermediate transcripts are NOT shown — only the final transcript populates the input field
- Voice input does NOT auto-submit — user must manually send
- English only (v1)
- Web only — desktop and mobile browsers (no native iOS/Android)

### 3.2 Mic Button States

| State | Visual Treatment | Trigger |
|---|---|---|
| **Idle** | Default mic icon | No recording in progress |
| **Active recording** | Clear visual indicator that mic is live (e.g., animated waveform, pulsing indicator, color change) | User tapped mic, permission granted, recording in progress |
| **Permission denied** | Mic icon with blocked indicator + inline error message | User tapped mic but browser permission previously denied |
| **Error** | Error visual state + dismissible error message | Cartesia service error or connection failure |
| **Max duration reached** | Recording auto-stops, transitions to processing/idle | 150-second limit hit |

### 3.3 Permission Denied State

This follows the **industry-standard pattern** (used by ChatGPT Voice and other production voice interfaces):

- Mic icon with a blocked/denied visual indicator
- Explanatory message
- Step-by-step browser guidance: "Click the lock icon in your browser's address bar → Site Settings → Microphone → Allow, then refresh the page"
- Persists until user successfully grants permission

### 3.4 Voice Error States

| Error | What Happens | User Recovery |
|---|---|---|
| **Cartesia service error** | Recording terminates, partial transcript discarded, error state shown | Dismiss error → retry (new recording session) |
| **Connection failure / timeout** | Recording terminates, error state shown | Dismiss error → retry |
| **Max duration reached** | Recording auto-stops normally | Final transcript committed to input field as usual |

> **Graceful Degradation applies:** Error messages must be plain-language, not technical. Every error shows a clear next action. Voice errors never affect the shell or chat panel — only the mic button and its associated UI.

### 3.5 Transcript Handling

- Final transcript appended to whatever is already in the chat input field (supports combining typed + spoken + additional spoken content into one message)
- Transcribed text lands in an editable state — user can review, edit, delete, or add more
- No intermediate/partial transcripts shown during recording

---

## 4. Universal Component Architecture

This is the architectural foundation for the "AI is the app" vision.

**Core rule:** All pages in the app shell are built with the **Generative UI component library**. Fixed content pages and AI-generated content use the same components.

**Why this matters for design:**

- A user viewing a fixed page and a user viewing AI-generated content on the same page experience the **same visual quality and component behavior**
- The AI can generate content on **any page** — not just the View panel — including PFM screens (Accounts, Holdings, Transactions)
- Fixed pages and generated pages are structurally identical. Users cannot distinguish between them based on component quality.

**Future scope enabled (not delivered now):**

- User-created custom pages built from the same component library
- Per-user AI page customization

The current architecture must not create structural barriers to these future capabilities.

> **Intentional Seams shapes this:** Even though fixed and generated content use the same components, the boundary between shell chrome and the generative canvas is still an architectural seam. Subtle signals (defined once in the design system) mark where AI-generated content begins and ends — supporting trust without screaming "THIS IS AI."

---

## 5. States & Edge Cases — Comprehensive Reference

### 5.1 Shell-Level States

| State | Shell Behavior | Canvas Behavior |
|---|---|---|
| App load | Three-panel layout renders. Sidebar + chat panel default to open (desktop). | Dashboard tile grid loads as default. |
| AI feature unavailable | Shell fully functional. | Canvas shows unavailable state with plain-language explanation. Per Graceful Degradation: surface last-known static data with timestamp if possible. |
| Slow network | Shell unchanged, Layer 2 controls remain interactive. | Generation indicator visible in canvas. |

### 5.2 Chat States

| State | Chat Panel | View Panel |
|---|---|---|
| No messages yet | Empty state — communicates readiness, not emptiness | Dashboard visible |
| Thinking | Animated rotating messages | Unchanged |
| Streaming text response | Text appears progressively | Unchanged |
| Streaming View response | 2–3 sentence summary streams | Skeleton → progressive content reveal |
| Navigation suggestion | Suggestion message appears, awaiting confirmation | Unchanged |
| Navigation confirmed | Confirmation message sent | Center workspace navigates to target page |
| Error | Error message with guidance to retry | Unchanged (or error in canvas if View was expected) |
| New Chat requested | Confirmation dialog | Unchanged |
| New Chat confirmed | Chat clears | View clears to blank |

### 5.3 Voice States

| State | Mic Button | Chat Input Field | Chat Panel |
|---|---|---|---|
| Idle | Default icon | Editable, may have typed content | Normal |
| Recording | Active indicator (pulsing/waveform) | Unchanged (no intermediate transcripts) | Normal |
| Silence detected → auto-stop | Transitions to idle | Final transcript appended | Normal |
| Manual stop | Transitions to idle | Final transcript appended | Normal |
| Max duration reached | Transitions to idle | Final transcript appended | Normal |
| Permission denied | Blocked indicator | Unchanged | Inline error with browser guidance |
| Cartesia error | Error state | Unchanged (partial transcript discarded) | Dismissible error message |

### 5.4 Edge Cases

| Scenario | Designed Response | Law Reference |
|---|---|---|
| AI generates View content but chat message fails | Show partial state — View content visible, chat shows error with retry. Never wipe the View. | Graceful Degradation, Reversibility |
| User asks "what's on this page?" but page data hasn't loaded | AI acknowledges the page is loading and waits, or responds with what it knows. Never fabricate page data. | Calibrated Trust, Contextual Coherence |
| AI generates a financial projection with assumed inputs | Projection must show visible provenance: what data was used, what was assumed, where it extrapolated. Never present assumptions as user-provided data. | Calibrated Trust, Interpretability |
| User is behind on a financial goal | Matter-of-fact framing. No "Great work!" or celebration UI. Lead with the gap and actionable options. | Contextual Coherence |
| Multiple View canvases in a long session cause performance issues | Feed scrolls internally, never pushes shell. Monitor for performance regression in long sessions. | Output Anchoring |
| User closes chat panel mid-generation | Generation continues. When chat panel reopens, full history including the completed response is visible. | Reversibility |
| AI navigates user but target page fails to load | Chat confirmation message should acknowledge the failure. Center workspace shows page error state. Chat remains open with guidance. | Graceful Degradation |
| Voice transcript contains sensitive financial data | Transcript lands in editable input field for user review before submission. Raw audio is never stored. Privacy policy must disclose Cartesia as sub-processor. | CCPA compliance |
| AI-generated text conflicts in tone with hardcoded shell copy | All text — generated and hardcoded — follows the same voice definition. Voice constraints are enforced in system prompts. | Consistent Voice |

---

## 6. Accessibility Requirements

WCAG 2.1 AA compliance across all shell components. This is not optional — it's a compliance and regulatory requirement.

| Area | Requirements |
|---|---|
| Keyboard navigation | All interactive controls operable via keyboard — chat input, fullscreen overlays, View panel content, mic button |
| Screen readers | ARIA labels on all controls. Focus management on panel open/close. ARIA live regions for: recording state changes, chat response type changes, error messages, thinking/generating state transitions |
| Color contrast | All text and interactive elements meet AA contrast ratios |
| AI-generated content | Proper semantic structure, alt text for visualizations, keyboard navigability, screen reader support |
| Voice input | Mic button states announced to screen readers. Permission-denied and error states accessible. |

---

## 7. Performance Targets

| Metric | Target | Context |
|---|---|---|
| Shell initial render (LCP) | < 2.5s | Google Core Web Vitals "Good" — aligns with fintech benchmarks |
| Chat first-token display | < 3s | Time from user submit to first visible AI response token |
| View content initial render | < 1s | After AI response received — first component visible |
| Voice transcript commit | < 3s | From final word spoken (inclusive of 2s silence window) |

---

## 8. What This File Does NOT Cover

- **Implementation specifics** — backend architecture, API contracts, code patterns → see TDDs
- **Component library specs** — individual Gen UI component APIs and props → see Generative UI project docs
- **Final visual designs** — Figma files, pixel specs, color values → provided separately via Pencil.dev as designs are finalized
- **Compliance implementation** — SEC 17a-4, FINRA 3110 storage implementation → see PRD Section 8 and TDDs

---

## Related Files

| File | What It Contains |
|---|---|
| `output-anchoring.md` | Shell layer definitions, immovable structure rules |
| `legible-generation.md` | Generation visibility spectrum, thinking vs. generating states |
| `reversibility.md` | Undo/reset patterns, version awareness |
| `intentional-seams.md` | Seam types, component-level affordances |
| `consistent-voice.md` | Voice tokens, tone constraints, drift monitoring |
| `contextual-coherence.md` | Framing rules by context, emotional/situational fit |
| `calibrated-trust.md` | Trust calibration signals, over-trust prevention |
| `interpretability.md` | Provenance layers, progressive disclosure model |
| `graceful-degradation.md` | Degradation spectrum, error state design |
| `README.md` | Index of all laws, dependency map, suggested placement |
