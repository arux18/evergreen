# App Shell PRD — Design Extraction for Amanda Ribeiro

> **Source:** App Shell PRD v0.6 (APPROVED 2026-04-30)
> **Extracted by:** Vega (AI Design Agent)
> **Date:** 2026-04-30
> **Purpose:** Everything from the PRD that Amanda needs to design, decide, or be aware of — stripped of engineering plumbing.

---

## Your Role in This PRD

You are named as the owner of **four design Considerations** in this PRD. All four share the same gate:

> **Engineering-determined — designs are blocking only when engineering flags them as necessary to proceed.**

This means: you are not blocking engineering from starting, but they will come to you when they need designs to continue. You control naming, layout, interaction patterns, and visual treatment.

**Your Considerations:**
1. Chat Experience UI Designs
2. App Shell Designs
3. Voice Input Designs
4. Naming Conventions (all tile, tab, and navigation labels are provisional)

---

## Design Surfaces — Full Inventory

Every surface listed below is `DRAFT` status and pending your Pencil.dev designs. This is your deliverable checklist.

### App Shell (3 surfaces)
| Surface | Key Requirements |
|---|---|
| **Three-panel layout — desktop** | Left nav sidebar + center workspace + right chat panel. Sidebar collapse to zero width. >=600px viewport. |
| **Mobile layout — single-panel** | <=599px. Chat panel spans 100% width. Single-panel flow. |
| **Fullscreen overlay** | Mirrored sidebar, header with title + controls, tab bar, scrollable content body. Animated transition from tile grid position. |

### Tile Grid (1 surface)
| Surface | Key Requirements |
|---|---|
| **Tile grid + Dashboard tab** | Responsive CSS grid. Fixed column/row span multipliers. Row height scales with width. Each tile: header, fullscreen expand button, content preview. Fixed default layout (not user-editable). |

### Chat Panel (3 surfaces)
| Surface | Key Requirements |
|---|---|
| **Chat panel chrome** | Slide-in from right edge. Desktop: configurable width via left-edge drag handle. Header: title "Chat" + close button. |
| **Chat prompt area** | New Chat button + mic button + Send button. Enter = send, Shift+Enter = newline. |
| **Chat loading/error states** | Loading: animated rotating thinking messages ("Thinking...", "Analyzing your request..."). Error: fixed copy (see FR-040). |

### Chat Experience (4 surfaces)
| Surface | Key Requirements |
|---|---|
| **Chat response routing — text vs. View vs. navigation** | AI chooses channel. Text-only stays in chat. View content renders in center workspace. Navigation changes the page + short chat message. |
| **View panel — progressive content rendering** | Replaces/overlays tile dashboard. Uses Gen UI components. New content appends below previous. Scrollable. Blank on new chat (not back to tiles). |
| **New chat confirmation flow** | Confirmation prompt warning current chat + View will be cleared. On confirm: store, clear, blank View. |
| **Context-aware interactions** | AI fills form inputs, manipulates page data, generates on-page visualizations. |

### In-Page Chat (1 surface)
| Surface | Key Requirements |
|---|---|
| **In-page chat input** | On-page text input that functions as extension of sidebar chat. Generates responses in context of current page data. (Detailed mechanism deferred to PFM PRD.) |

### Voice Input (6 surfaces)
| Surface | Key Requirements |
|---|---|
| **Mic button — idle state** | Visible in chat prompt area on all viewports (desktop + mobile web). |
| **Mic button — active recording** | Clear visual indicator that mic is live (e.g., animated waveform, pulsing indicator, color change). |
| **Mic button — permission-denied** | Mic icon with blocked indicator + explanatory message + step-by-step browser guidance ("Click the lock icon in your browser's address bar -> Site Settings -> Microphone -> Allow, then refresh the page"). Persists until permission granted. |
| **Mic button — STT error state** | Displayed on Cartesia WebSocket error. Visual treatment, messaging, and recovery flow are yours to define. |
| **Max duration reached state** | Recording auto-terminates at 150 seconds. Needs a state treatment. |
| **Mobile web mic + recording states** | All mic states adapted for <=599px viewport. |

**Total: 18 design surfaces.**

---

## Naming — You Own Final Copy

Every label below is a **provisional working label** that engineering is treating as a placeholder. You set the final names.

### Top-Level Navigation Items (current working labels)
1. Dashboard (id:1)
2. Net Worth (id:2)
3. Planning (id:3)
4. Advice (id:4)

### Sub-Tabs Per Nav Item (current working labels)
| Nav Item | Sub-Tabs |
|---|---|
| Dashboard | "Dashboard" |
| Net Worth | Accounts, Add Accounts, Holdings, Transactions |
| Planning | Budget, Cash Flow, Lifetime Planning |
| Advice | AI Advisors, Videos & Blogs |

### Other Provisional Labels
- "Chat" (chat panel header title)
- "New Chat" button
- All tile names
- All UI strings in loading/error states (error copy for FR-040 is fixed — see below)

---

## Fixed Copy (Do Not Change)

These strings are specified in the PRD and are not provisional:

**Chat error message (FR-040):**
> "We ran into an issue and were unable to process your request. Please try again, and contact support if the issue persists."

**Financial disclaimer (required on all AI projections):**
> "This is not financial advice. Projections are estimates based on historical data and may not reflect future results."

---

## Interaction Patterns to Design

### Three-Panel Desktop Layout
- Left sidebar: expand/collapse per nav item, drag-to-reorder nav items, collapse to zero width
- Center workspace: tile grid (default) / View panel (during chat) / app pages (on AI navigation)
- Right chat panel: slide-in from right, left-edge drag handle for resize, offsets center workspace
- **Independent sidebar state**: main dashboard and fullscreen overlay track expand/collapse separately

### Chat Response Routing (3 channels)
1. **Text-only**: short answer stays in chat panel only
2. **View content**: short summary in chat + rich content (tables, visualizations) rendered in center workspace View panel
3. **Navigation**: short explanation in chat + center workspace navigates to target page, chat stays open

### View Panel Behavior
- Replaces/overlays the tile dashboard when AI generates View content
- Progressive: new content appends below previous, scrollable
- On "New Chat": clears to blank (does NOT revert to tile dashboard)
- Always accompanied by a chat message (never View content without chat explanation)

### New Chat Flow
1. User clicks "New Chat"
2. Confirmation prompt: "Starting a new chat will clear the current chat and View"
3. On confirm: store current session, clear chat + View, present blank state
4. On cancel: return to current session

### Voice Input Interaction Model
- **Tap to start** -> browser permission prompt (if first time)
- **Auto-stop on 2.0s silence** OR **manual tap to stop** OR **auto-stop at 150s max**
- Transcribed text **appends** to existing chat input field content (does not replace)
- User must manually submit (no auto-submit)
- One active voice session per user at a time
- Tapping mic while recording = stop current session

### Fullscreen Overlay
- Animated transition from tile's grid position into fullscreen
- Mirrored sidebar (own expand/collapse state), header, tab bar, scrollable content body
- Active tab persists across re-renders

---

## Responsive Requirements

| Breakpoint | Experience |
|---|---|
| **>=600px (desktop)** | Three-panel: left nav + center workspace + right chat panel. Chat panel resizable via drag handle. |
| **<=599px (mobile)** | Single-panel. Chat panel spans 100% viewport width. |

This is the **only** breakpoint. All layout, navigation, and chat panel behavior follows this single split.

---

## Accessibility Requirements (WCAG 2.1 AA)

Per our `rules/accessibility/accessibility.md`, every surface in this PRD must meet:

### Must-Fix (blocks approval)
- **Contrast**: 4.5:1 for body text, 3:1 for large text and UI components
- **Keyboard**: every interactive element must be keyboard operable — sidebar drag-and-drop, chat input, fullscreen overlays, View panel content, mic button states
- **Touch targets**: 44x44px minimum on all interactive elements (mic button, send button, new chat button, close button, tile expand button, nav items)
- **Focus indicators**: visible ring on every interactive element, >=2px, 3:1 contrast
- **ARIA live regions**: must announce recording state changes, chat response type changes, error messages
- **Semantic structure**: AI-generated View content must have proper heading hierarchy, alt text for visualizations, keyboard navigability
- **Color not sole indicator**: all state changes (recording active, error, permission denied) must use more than color alone

### Voice Input Specific
- Screen reader announcements for mic state transitions (idle -> recording -> processing -> committed / error)
- Permission-denied state must be announced, not just visually displayed
- `prefers-reduced-motion`: recording animations (waveform, pulse) must respect this — instant transitions, no shimmer

### Focus Order for Shell
Per our accessibility rules, the focus order should follow:
> sidebar -> header actions -> KPI row (L->R) -> main content (top->bottom, L->R) -> secondary actions

---

## Dependencies on Your Work

| What Depends on You | Who's Waiting | Urgency |
|---|---|---|
| App shell layout designs | Engineering (when they flag it) | Engineering-determined |
| Chat experience + View panel designs | Engineering (when they flag it) | Engineering-determined |
| Voice input UI states | Engineering (when they flag it) | Engineering-determined |
| Final naming for all labels | Engineering (treating current names as placeholders) | Engineering-determined |
| Gen UI component library | All pages in the new app (FR-062) | Minimum viable set before any page development begins |

### What You Depend On
| Dependency | Status | Impact |
|---|---|---|
| Gen UI component library | In-flight | View panel content, all pages — this is the universal rendering foundation |
| AI backend decision (titan-1 vs CopilotKit) | Engineering consideration | Affects response types and what the chat can do |
| PFM PRD | Pending | Defines in-page chat input behavior on PFM pages |

---

## Risks That Touch Design

| Risk | Your Exposure |
|---|---|
| **Design rework from in-flight UI work** | Medium likelihood, medium impact. Mitigation: engineering treats naming/layout/interaction details as provisional. Centralize copy and components so final designs apply without rework. |
| **Final naming differs from provisional labels** | Medium likelihood, low impact. Engineering knows all strings are placeholders. |
| **Gen UI library not ready** | Medium likelihood, critical impact. This blocks ALL page development. The library is now the universal foundation, not just for View panel. |

---

## What's Explicitly Out of Scope (Don't Design These)

- Chat history / viewing past sessions
- Cross-session memory
- Multiple chat windows
- Saving/pinning/retrieving Views
- Two-way voice (AI speaking back)
- Tile customization (drag, resize, close)
- "My Dashboard" tab
- Fullscreen split view
- Native iOS/Android
- Language selection beyond English
- User-created custom pages
- Per-user AI page customization

---

## Key Summary

**18 design surfaces** across app shell, chat, View panel, and voice input — all in `DRAFT` status pending your Pencil.dev work.

**You own final naming** for all nav items, tabs, tiles, and UI strings (except the fixed error copy).

**Your gate is discretionary**: engineering starts without waiting for final designs, but will flag when they need them. This gives you parallel runway, but expect engineering to come knocking on specific surfaces as they reach them.

**Highest design priority**: the transition between tile dashboard and View panel content — the PRD explicitly calls this out as needing design attention to avoid user disorientation. Also, the mic button state matrix (6 states across desktop + mobile) is a dense interaction pattern that will need careful state coverage.

**Accessibility is non-negotiable**: WCAG 2.1 AA across everything, with particular attention to ARIA live regions for chat response routing and voice input state changes.
