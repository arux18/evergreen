# Handoff Checklist (for Amanda)

A quick pass before anything goes to engineering. The agent does the heavy lifting. This is what to look for and confirm.

## Before
- [ ] I know which files and screens are in this handoff.
- [ ] Every file in scope is saved (Cmd+S in each tab, including the library if it changed).

## Design file
- [ ] No hardcoded colors, except brand logos, partner icons and illustrations I've approved.
- [ ] The screen background is main; content areas are surface; cards, inputs, popups and dialogs are elevated.
- [ ] Chat and nav panels have no shadow in light and the blue glow in dark.
- [ ] Heebo everywhere (Noto Serif only where I chose it).
- [ ] Dev notes are context notes, sitting above their screens, not covering anything.
- [ ] No dot grids.
- [ ] The file looks right in both light and dark.

## Handoff package
- [ ] Token changes: the light CSS, dark CSS and tokens JSON were regenerated, and the check says "all tokens match the library".
- [ ] The handoff doc starts with a short brief: what to build, in what order, how to verify, what not to do.
- [ ] Every screen is listed with its desktop and mobile node.
- [ ] States are covered: hover, focus, disabled, loading, empty, error, success.
- [ ] Each business decision says who confirmed it and the date.
- [ ] Anything undecided is marked TBD, not guessed.
- [ ] Screenshots load and aren't blank.

## After
- [ ] Only the handoff files were committed; my other work is untouched.
- [ ] I've read the summary and answered any open questions.
