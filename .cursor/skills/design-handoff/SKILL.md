---
name: design-handoff
description: >-
  Prepares design work in design-specs for engineering handoff: audits .pen files against the
  Hemlock rules, exports and verifies token CSS/JSON from hemlock-library.lib.pen, and writes
  agent-ready handoff docs (README-DEV.md for token/theme changes, HANDOFF.md for screens and
  flows). Use when Amanda says hand off, handoff, dev handoff, ready for dev/engineering, "for
  the engineers", or asks whether handoff files are complete or current.
---

# Design Handoff

Two kinds of handoff, often together:

- **Token / theme**: token values or roles change (dark mode, surface roles, shadows, chart palette). Deliverable: `hemlock.light.css`, `hemlock.dark.css`, `hemlock.tokens.json`, `README-DEV.md`.
- **Screen / flow**: screens and behavior in a design file (settings-passkey). Deliverable: a clean `.pen` file plus `HANDOFF.md`.

Linear is out of scope. Amanda manages tickets; touch Linear only if she asks.

## Non-negotiables

1. **The Hemlock library is read-only.** Never edit `hemlock-library.lib.pen` without asking Amanda first and getting a yes. The scripts here only read it.
2. **Ask, don't pick.** Role choices, near-match tokens that shift a color, deleting layers, and anything not settled by the library go to Amanda as an `AskQuestion` with a recommended option. Business decisions are recorded with who and the exact date she gives.
3. **Edit live, then verify the save.** Make design edits through the Pencil MCP so they appear on her canvas. Ask her to press Cmd+S in that file's tab, then re-read the file on disk. Never write a `.pen` that is open; Pencil overwrites it.
4. **Show, and check what you show.** Amanda is a designer: give her visuals and layer names, not JSON paths. Export images in a separate `execute` call from the one that built them, and open the image to confirm it is not blank before linking it.
5. **Match the rendered visual.** Copy what is visible, not hidden properties. Use real component variants (Card, Dialog) rather than recreating them.
6. **Commit only the handoff.** Stage the files you changed by path. Leave her other uncommitted work alone.

## Workflow

Copy and track:

```
Handoff progress:
- [ ] 1. Scope confirmed
- [ ] 2. Design files audited, findings approved, fixes applied and saved
- [ ] 3. Token package exported and checked (token/theme handoffs)
- [ ] 4. Handoff doc written (README-DEV.md and/or HANDOFF.md)
- [ ] 5. Engineer questions answered or listed as open
- [ ] 6. Visual proof checked
- [ ] 7. Committed and summarized
```

### 1. Scope

Confirm which `.pen` files and screens are in scope, which kind of handoff it is, and where the doc lives. For screen handoffs, default to `<pen folder>/<pen name>-handoff/HANDOFF.md` and confirm with Amanda the first time.

### 2. Audit the design files

Run against the saved file. Note that it reads disk, so ask for Cmd+S first if the file is open:

```bash
python3 .cursor/skills/design-handoff/scripts/audit_pen.py pencil/designs/<stage>/<file>.pen
```

It reports hardcoded hex, `prim-*` bindings, unknown tokens, non-Heebo fonts, surface-role suspects, chat/nav panel rules, dot grids, dev-note frames, and notes that overlap screens. Turn the output into a designer-language list grouped by what will change visually:

- **Breaks a handoff rule**: fix, usually no visual change in light mode.
- **Exact token match**: rebind, no visual change.
- **Near match**: name the color shift, and ask.
- **No sensible token**: list it. Brand logos, partner icons, illustrations and canvas arrows usually stay; confirm, don't assume.

Role rules and token mapping: [reference.md](reference.md). Get approval with `AskQuestion`, apply through the Pencil MCP, have her save, then re-run the audit until only approved leftovers remain.

**Live note-overlap check.** The script uses Pencil's usual 219px note height; this live check is authoritative:

```js
const R=[];Get((n,c)=>{if(c.depth===0){R.push({id:n.id,t:n.type,nm:n.name||'',x:c.bounds.x,y:c.bounds.y,w:c.bounds.width,h:c.bounds.height});c.skipChildren()}});
const ov=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h;
const N=R.filter(r=>r.t==='context'),O=R.filter(r=>r.t!=='context'&&!r.id.includes(':'));
for(const n of N){const h=O.filter(o=>ov(n,o));if(h.length)Print(n.id,n.nm,'|',h.map(o=>o.nm||o.id).join('; '))}
```

Notes sit 24px above their screen (`y = screen.y - note.h - 24`) and never cover a screen, an arrow, or another note.

### 3. Token package (token/theme handoffs)

```bash
python3 .cursor/skills/design-handoff/scripts/export_tokens.py --dry-run   # what would change
python3 .cursor/skills/design-handoff/scripts/export_tokens.py             # write dark-mode-handoff/
python3 .cursor/skills/design-handoff/scripts/check_tokens.py --refs       # must end "all tokens match"
```

The export keeps each CSS file's header and per-token comments. After it runs, update the header and comments for anything that changed: a dated line saying what changed and why. Design-only tokens (`sem-iosChrome*`, `sem-dotGrid`) are excluded automatically. Then sync any prose doc that repeats values (`hemlock-html-handoff.md`, `design-system.md`), or replace the repeated values with a pointer to the CSS.

### 4. Handoff doc

Use the templates in [templates.md](templates.md). Write for the engineers' AI agents first (next section); a human reading it should be able to skim the top block and know what to do.

### 5. Engineer questions

Go through [engineer-questions.md](engineer-questions.md). Answer what the design already settles. List the rest under **Open questions** for Amanda. Never fill a gap with a guess.

### 6. Visual proof

Before/after or light/dark screenshots of the key screens. Each image must be verified non-blank and embedded for Amanda to see.

### 7. Wrap up

Commit by path and push. Tell Amanda in plain language what changed, what is still open, and anything she must do (save, decide, paste a screenshot).

## Write for AI agents

Engineering works through AI agents with MCP access, so the handoff is read by a model before a person. Make every requirement findable, exact and checkable.

- **Agent brief first.** A short top block: what changes, in what order, how to verify, and what not to do.
- **Text carries every rule.** Screenshots illustrate. If something matters, it is also written down.
- **Exact names.** Token names as in the CSS (`--sem-background-elevated`), Hemlock component names (`component/Card/shadow`), `.pen` paths and node IDs for every screen, so an agent with the Pencil MCP can open the exact frame.
- **One source of truth, stated.** Say which file wins (CSS/JSON over prose, prose over screenshots). Point to values instead of copying them; copied values drift.
- **Testable acceptance criteria.** For example: "In both themes, every card, dialog, popup and input uses `--sem-background-elevated`."
- **A command they can run.** `check_tokens.py <their css files> [--prefix <theirs>] --refs` checks their implementation against the library.
- **Explicit don'ts.** Examples: "no `prefers-color-scheme`", "don't swap values without rebinding surfaces".
- **Decisions with provenance.** For example: "Default theme is dark, confirmed by the business Sep 22, 2026." Agents won't re-argue a dated decision.
- **Open questions marked TBD.** Agents treat unmarked gaps as permission to invent.
- **Stable headings, one concern per file.** Agents search by heading.

## Additional resources

- [reference.md](reference.md): surface roles, panel and shadow rules, hex-to-token mapping, lessons learned
- [templates.md](templates.md): README-DEV.md and HANDOFF.md templates
- [engineer-questions.md](engineer-questions.md): questions to settle before handoff
- [checklist.md](checklist.md): one-page checklist for Amanda
- Related skills: `semantic-color-tokens` (binding rules), `pencil-design` (Pencil MCP editing)
