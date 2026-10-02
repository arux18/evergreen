# Design Handoff Reference

Values here describe the rules, not the paint. The paint lives in `hemlock-library.lib.pen` and the generated CSS. If they disagree with this file, the library wins; flag the drift to Amanda.

## Surface roles

| Role | Token |
|---|---|
| App shell / page / screen background | `sem-background-main` |
| Main content area inside the shell | `sem-background-surface` |
| Cards, chart containers and tooltips, controls (inputs, OTP digits, checkbox, radio, select, date field, steps, carousel arrows, account selector), popups, bottom sheets, dialogs, modals, drawers | `sem-background-elevated` |

- Light: main and elevated are both white, so a card on the shell needs its `sem-borders-light` border or a shadow. A borderless white card on white disappears.
- Leave documentation artboards, GenUI state boards, swatch cards and annotation backgrounds on `main`. Assign roles per layer, never by blanket search-and-replace.

## Panels and shadows

- Chat and nav panels: effect color `sem-chatShadow` / `sem-navShadow`, offset 0/2, blur 28. Light has no shadow; dark is the blue glow `0 2px 28px 0 #9BB3FC24`. Border `sem-chatBorder` / `sem-navBorder`.
- Every other drop shadow uses `shadow-sm-color`, `shadow-md-color`, `shadow-lg-color` or `shadow-overlay-color`. The old `prim-shadow-*` names are gone.
- `sem-chatInputBg` light chains to `sem-background-main`.

## Fonts

Heebo everywhere. Noto Serif only where Amanda asked for it, never above weight 600. The logo wordmark (Manrope/Spectral) is brand artwork; confirm before touching it.

## Mapping hardcoded colors (light values)

Pick by **role**, then check that the light value matches. These are the exact matches used in settings-passkey (Oct 2026):

| Hardcoded | Layer role | Token |
|---|---|---|
| `#FFFFFF` | screen / bottom bar | `sem-background-main` |
| `#FFFFFF` | input, OTP digit, field | `sem-background-elevated` |
| `#0E0E0E` | text, caret | `sem-text-header` |
| `#0E0E0E` | status-bar icons | `sem-icons-full` |
| `#0E0E0E` | focused/filled input border | `sem-borders-focus` |
| `#0E0E0E` | ink (black) button fill | `sem-btnInkBg` |
| `#3A6AF8` | link text | `sem-text-action` |
| `#D5D3D0` | disabled button fill | `sem-background-muted` |
| `#8A8680` | disabled label | `sem-text-subtle` |
| `#0000001A` | dialog shadow | `shadow-md-color` |

Near matches Amanda approved: `#D8D9D8` → `sem-borders-muted` (`#D5D3D0`) and `#575B58` → `sem-text-meta` (`#5E5954`). Any other near match is a new question.

To find candidates for a hex, resolve every `sem-*` token's light value from the library and list exact matches first, then the nearest few by RGB distance. Present role-appropriate options, not just the closest color.

## Usually left hardcoded (confirm each time)

Brand logos and partner marks (Apple, Google, 1Password), illustrations, the logo wordmark, white flow arrows on the canvas, raster images. Disabled fills (`enabled: false`) are invisible; ignore them.

## Lessons learned

| What went wrong | Rule now |
|---|---|
| Edited Hemlock gallery captions without asking | Ask before any library edit, however small |
| Edited `.pen` files on disk while they were open; Pencil overwrote them | Edit through the MCP; Amanda saves; verify the save on disk |
| Amanda saved but the library tab had closed, so the change never saved | Ask her to save in the specific tab and confirm on disk |
| A comparison image exported blank and was reported as fine | Export in a separate call; open the image before sharing |
| A mock showed cards with borders and shadows they don't have | Build from the real component variants |
| A blanket rebind moved 16 state artboards to elevated | Assign roles per layer; documentation boards stay on main |
| The dark CSS was missing 50 tokens | Generate with `export_tokens.py`; gate on `check_tokens.py` |
| A prose doc repeated values that went stale | Point to the CSS instead of copying values |
| Dev notes overlapped screens by 9px | Notes sit 24px above their screen; run the live overlap check |
| A decision date was written as the day it was recorded | Use the date Amanda gives for the decision |
