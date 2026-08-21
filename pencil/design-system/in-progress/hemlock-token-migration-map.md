# Token Migration Map → Hemlock Library

**Generated:** 2026-08-20
**Status:** ✅ **MIGRATION EXECUTED** (2026-08-20) — `chat-nav-refresh.pen` now consumes `hemlock-library.lib.pen` exclusively; `chat-ui.lib.pen` has been unlinked. See "Resolution" at the end of this document. This map is retained as the audit record of how every source token was mapped.

> **Post-migration note (2026-08-21):** the `prim-shadow-*-color` targets referenced below were renamed to `shadow-*-color` (shadow colors are semantics, not paint) and their dark alphas were lifted from 28/36/45/64% to 50/60/70/85%. The mapping logic is unaffected.
**Hemlock target:** `pencil/design-system/in-progress/hemlock-library.lib.pen` (439 variables — 21 semantic tokens were minted during execution, see Resolution)
**Sources:**
- `pencil/design-system/complete/chat-ui.lib.pen` — 47 local tokens
- `pencil/design-system/complete/chat-nav-refresh.pen` — 1412 tokens (local + imported legacy namespaces)

**Method:** every source token was resolved through its reference chain to concrete light/dark values via the Pencil MCP, mapped to a Hemlock token by naming rule or role dictionary, then value-verified against the resolved Hemlock values.

**Status legend:**
- ✓ exact — light and dark resolved values match Hemlock
- ◐ light matches — light matches; source had no real dark value (old libs were light-only)
- ~ role match — correct role mapping, but the value was intentionally updated in Hemlock (e.g. send button went blue)
- ? by value — no naming rule; suggested because the light value is identical; confirm the role before using
- ✗ no equivalent — nothing in Hemlock; see note

> **Correction from earlier analysis (2026-08-20):** chat-ui.lib.pen contains only **47 tokens**. The 1,412-token superset belongs to **chat-nav-refresh.pen**; an earlier read raced and attributed it to both files.

---

## Part A — chat-ui.lib.pen (47 tokens)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `chat.text.primary` | #2D2926 | `sem-chatTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `nav.text.primary` | #2D2926 | `sem-navTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `chat.text.secondary` | #5E5954 | `sem-chatTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `nav.text.secondary` | #5E5954 | `sem-navTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.bg` | #F7F5F0 | `sem-chatBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `nav.bg` | #F7F5F0 | `sem-navBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `chat.border` | #DCD8CB | `sem-chatBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `nav.border` | #DCD8CB | `sem-navBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `chat.divider` | #E8E6E0 | `sem-chatDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `nav.divider` | #E8E6E0 | `sem-navDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `chat.text.placeholder` | #A8A49E | `sem-chatPlaceholder` | #A8A49E / #3A485F | ◐ light matches | dark differs: #A8A49E vs #3A485F |
| `chat.input.bg` | #FFFFFF | `sem-chatInputBg` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #FFFFFF vs #1C2943 |
| `chat.send.bg` | #3C3C3C | `sem-chatSendBg` | #3A6AF8 / #7094FB | ~ role match | value updated by design: #3C3C3C vs #3A6AF8 / #7094FB |
| `chat.bubble.user.bg` | #F7F5F0 | `sem-chatBubbleUser` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `chat.bubble.user.border` | #DCD8CB | `sem-chatBubbleUserBorder` | #DCD8CB / #00000000 | ✓ exact | resolved 2026-08-20: dedicated token minted |
| `chat.chip.bg` | #F7F5F0 | `sem-background-main` | #F7F5F0 / #101729 | ? by value | no dedicated chip bg; value equals sem-chatBg |
| `chat.chip.border` | #DCD8CB | `sem-borders-dark` | #DCD8CB / #22314F | ? by value | no dedicated chip border; value equals sem-chatBorder |
| `chat.shadow` | #2D292628 | `sem-chatShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `nav.shadow` | #2D292628 | `sem-navShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `chat.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.bubble.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.chip.radius` | 24 | `radius-md` | 24 | ✓ exact |  |
| `chat.voice.active.bg` | #3A6AF8 | `sem-chatVoiceActiveBg` | #3A6AF8 / #9BB3FC | ◐ light matches | dark differs: #3A6AF8 vs #9BB3FC |
| `chat.voice.active.icon` | #FFFFFF | `sem-chatVoiceActiveIcon` | #FFFFFF / #000000 | ◐ light matches | dark differs: #FFFFFF vs #000000 |
| `chat.voice.waveform` | #7094FB | `sem-chatVoiceWaveform` | #7094FB / #9BB3FC | ◐ light matches | dark differs: #7094FB vs #9BB3FC |
| `chat.voice.timer` | #5E5954 | `sem-chatVoiceTimer` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.voice.pulse` | #3A6AF828 | `sem-chatVoicePulse` | #3A6AF828 / #7094FB28 | ◐ light matches | dark differs: #3A6AF828 vs #7094FB28 |
| `chat.icon` | #5E5954 | `sem-chatIcon` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.close.hover.bg` | #EDEAE3 | `sem-chatCloseHoverBg` | #EBF0FE / #22314F | ~ role match | value updated by design: #EDEAE3 vs #EBF0FE / #22314F |
| `chat.close.pressed.bg` | #E3DFD6 | `sem-chatClosePressedBg` | #C8D6FD / #2E4066 | ~ role match | value updated by design: #E3DFD6 vs #C8D6FD / #2E4066 |
| `chat.send.icon` | #FFFFFF | `sem-chatSendIcon` | #FFFFFF | ✓ exact |  |
| `chat.send.bg.hover` | #4F4F4F | `sem-chatSendBgHover` | #2952CC / #9BB3FC | ~ role match | value updated by design: #4F4F4F vs #2952CC / #9BB3FC |
| `chat.send.bg.pressed` | #2A2A2A | `sem-chatSendBgPressed` | #163196 / #3A6AF8 | ~ role match | value updated by design: #2A2A2A vs #163196 / #3A6AF8 |
| `chat.send.bg.disabled` | #D4D1CA | `sem-chatSendBgDisabled` | #C8D6FD / #152354 | ~ role match | value updated by design: #D4D1CA vs #C8D6FD / #152354 |
| `chat.chip.hover.bg` | #EDEAE3 | `sem-chatChipHover` | #EDEAE3 / #172642 | ◐ light matches | dark differs: #EDEAE3 vs #172642 |
| `nav.hover.bg` | #EDEAE3 | `sem-navHoverBg` | #EDEAE3 / #0C1222 | ◐ light matches | dark differs: #EDEAE3 vs #0C1222 |
| `chat.chip.pressed.bg` | #E3DFD6 | `sem-chatChipPressed` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `nav.pressed.bg` | #E3DFD6 | `sem-navPressedBg` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `chat.voice.cancel.icon` | #8A8680 | `sem-chatVoiceCancelIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `chat.input.border` | #E8E6E0 | `sem-chatInputBorder` | #E8E6E0 / #22314F | ◐ light matches | dark differs: #E8E6E0 vs #22314F |
| `chat.input.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.input.border.active` | #C0BAB2 | `sem-chatInputBorderActive` | #C0BAB2 / #33476E | ◐ light matches | dark differs: #C0BAB2 vs #33476E |
| `chat.bubble.ai.bg` | #FFFFFF00 | `sem-chatBubbleAi` | #FFFFFF00 / #FFFFFF00 | ✓ exact | resolved 2026-08-20: token minted (transparent in both modes) |
| `nav.text.disabled` | #B5B1AB | `sem-navTextDisabled` | #B5B1AB / #697DA0 | ◐ light matches | dark differs: #B5B1AB vs #697DA0 |
| `nav.icon` | #8A8680 | `sem-navIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `nav.active.bg` | #DCD8CB | `sem-navActiveBg` | #DCD8CB / #18223A | ◐ light matches | dark differs: #DCD8CB vs #18223A |
| `nav.hover.text` | #2D2926 | `sem-navHoverText` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |

---

## Part B — chat-nav-refresh.pen (1412 tokens)

### Summary

| Status | Count |
|---|---|
| ✓ exact | 731 |
| ◐ light matches | 120 |
| ~ role match (value updated) | 179 |
| ? suggested by value | 39 |
| ✗ no equivalent | 343 |


### Local tokens (`chat.*`, `nav.*`, `blue.*`) (64)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `chat.text.primary` | #2D2926 | `sem-chatTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `nav.text.primary` | #2D2926 | `sem-navTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `chat.text.secondary` | #5E5954 | `sem-chatTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `nav.text.secondary` | #5E5954 | `sem-navTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.bg` | #F7F5F0 | `sem-chatBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `nav.bg` | #F7F5F0 | `sem-navBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `chat.border` | #DCD8CB | `sem-chatBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `nav.border` | #DCD8CB | `sem-navBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `chat.divider` | #E8E6E0 | `sem-chatDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `nav.divider` | #E8E6E0 | `sem-navDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `chat.text.placeholder` | #A8A49E | `sem-chatPlaceholder` | #A8A49E / #3A485F | ◐ light matches | dark differs: #A8A49E vs #3A485F |
| `chat.input.bg` | #FFFFFF | `sem-chatInputBg` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #FFFFFF vs #1C2943 |
| `chat.send.bg` | #3A6AF8 | `sem-chatSendBg` | #3A6AF8 / #7094FB | ◐ light matches | dark differs: #3A6AF8 vs #7094FB |
| `blue.600` | #3A6AF8 | `prim-blue-600` | #3A6AF8 | ✓ exact |  |
| `chat.bubble.user.bg` | #F7F5F0 | `sem-chatBubbleUser` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `chat.bubble.user.border` | #DCD8CB | `sem-chatBubbleUserBorder` | #DCD8CB / #00000000 | ✓ exact | resolved 2026-08-20: dedicated token minted |
| `chat.chip.bg` | #F7F5F0 | `sem-background-main` | #F7F5F0 / #101729 | ? by value | no dedicated chip bg; value equals sem-chatBg |
| `chat.chip.border` | #DCD8CB | `sem-borders-dark` | #DCD8CB / #22314F | ? by value | no dedicated chip border; value equals sem-chatBorder |
| `chat.shadow` | #2D292628 | `sem-chatShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `nav.shadow` | #2D292628 | `sem-navShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `chat.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.bubble.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.chip.radius` | 24 | `radius-md` | 24 | ✓ exact |  |
| `chat.voice.active.bg` | #3A6AF8 | `sem-chatVoiceActiveBg` | #3A6AF8 / #9BB3FC | ◐ light matches | dark differs: #3A6AF8 vs #9BB3FC |
| `chat.voice.active.icon` | #FFFFFF | `sem-chatVoiceActiveIcon` | #FFFFFF / #000000 | ◐ light matches | dark differs: #FFFFFF vs #000000 |
| `chat.voice.waveform` | #7094FB | `sem-chatVoiceWaveform` | #7094FB / #9BB3FC | ◐ light matches | dark differs: #7094FB vs #9BB3FC |
| `blue.500` | #7094FB | `prim-blue-500` | #5A82F9 / #7094FB | ~ role match | value updated by design: #7094FB vs #5A82F9 / #7094FB |
| `chat.voice.timer` | #5E5954 | `sem-chatVoiceTimer` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.voice.pulse` | #3A6AF828 | `sem-chatVoicePulse` | #3A6AF828 / #7094FB28 | ◐ light matches | dark differs: #3A6AF828 vs #7094FB28 |
| `chat.icon` | #5E5954 | `sem-chatIcon` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `chat.close.hover.bg` | #EBF0FE | `sem-chatCloseHoverBg` | #EBF0FE / #22314F | ◐ light matches | dark differs: #EBF0FE vs #22314F |
| `blue.50` | #EBF0FE | `sem-btnPrimaryInvertedBgHover` | #EBF0FE / #22314F | ? by value | matched by light value only; confirm role |
| `chat.close.pressed.bg` | #C8D6FD | `sem-chatClosePressedBg` | #C8D6FD / #2E4066 | ◐ light matches | dark differs: #C8D6FD vs #2E4066 |
| `blue.100` | #C8D6FD | `prim-blue-100` | #EBF0FE | ~ role match | value updated by design: #C8D6FD vs #EBF0FE |
| `chat.send.icon` | #FFFFFF | `sem-chatSendIcon` | #FFFFFF | ✓ exact |  |
| `chat.send.bg.hover` | #2952CC | `sem-chatSendBgHover` | #2952CC / #9BB3FC | ◐ light matches | dark differs: #2952CC vs #9BB3FC |
| `blue.700` | #2952CC | `prim-blue-700` | #2952CC | ✓ exact |  |
| `chat.send.bg.pressed` | #163196 | `sem-chatSendBgPressed` | #163196 / #3A6AF8 | ◐ light matches | dark differs: #163196 vs #3A6AF8 |
| `blue.800` | #163196 | `prim-blue-800` | #163196 / #152354 | ◐ light matches | dark differs: #163196 vs #152354 |
| `chat.send.bg.disabled` | #C8D6FD | `sem-chatSendBgDisabled` | #C8D6FD / #152354 | ◐ light matches | dark differs: #C8D6FD vs #152354 |
| `chat.chip.hover.bg` | #EDEAE3 | `sem-chatChipHover` | #EDEAE3 / #172642 | ◐ light matches | dark differs: #EDEAE3 vs #172642 |
| `nav.hover.bg` | #EDEAE3 | `sem-navHoverBg` | #EDEAE3 / #0C1222 | ◐ light matches | dark differs: #EDEAE3 vs #0C1222 |
| `chat.chip.pressed.bg` | #E3DFD6 | `sem-chatChipPressed` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `nav.pressed.bg` | #E3DFD6 | `sem-navPressedBg` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `chat.voice.cancel.icon` | #8A8680 | `sem-chatVoiceCancelIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `chat.input.border` | #E8E6E0 | `sem-chatInputBorder` | #E8E6E0 / #22314F | ◐ light matches | dark differs: #E8E6E0 vs #22314F |
| `chat.input.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `chat.input.border.active` | #C0BAB2 | `sem-chatInputBorderActive` | #C0BAB2 / #33476E | ◐ light matches | dark differs: #C0BAB2 vs #33476E |
| `chat.bubble.ai.bg` | #FFFFFF00 | `sem-chatBubbleAi` | #FFFFFF00 / #FFFFFF00 | ✓ exact | resolved 2026-08-20: token minted (transparent in both modes) |
| `nav.text.disabled` | #B5B1AB | `sem-navTextDisabled` | #B5B1AB / #697DA0 | ◐ light matches | dark differs: #B5B1AB vs #697DA0 |
| `nav.icon` | #8A8680 | `sem-navIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `nav.active.bg` | #DCD8CB | `sem-navActiveBg` | #DCD8CB / #18223A | ◐ light matches | dark differs: #DCD8CB vs #18223A |
| `nav.hover.text` | #2D2926 | `sem-navHoverText` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `nav.font` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `chat.voice.bg.disabled` | #C8D6FD | `sem-chatVoiceBgDisabled` | #C8D6FD / #152354 | ◐ light matches | dark differs: #C8D6FD vs #152354 |
| `chat.navtoggle.bg` | #FFFFFF | `sem-navToggleBg` | #FFFFFF / #18223A | ◐ light matches | dark differs: #FFFFFF vs #18223A |
| `chat.navtoggle.border` | #A5BCFC | `sem-navToggleBorder` | #A5BCFC / #152354 | ◐ light matches | dark differs: #A5BCFC vs #152354 |
| `blue.200` | #A5BCFC | `prim-blue-200` | #C8D6FD | ~ role match | value updated by design: #A5BCFC vs #C8D6FD |
| `chat.navtoggle.icon` | #3A6AF8 | `sem-navToggleIcon` | #3A6AF8 / #9BB3FC | ◐ light matches | dark differs: #3A6AF8 vs #9BB3FC |
| `chat.navtoggle.hover.bg` | #EBF0FE | `sem-navToggleHoverBg` | #EBF0FE / #22314F | ◐ light matches | dark differs: #EBF0FE vs #22314F |
| `chat.navtoggle.hover.border` | #A5BCFC | `sem-navToggleHoverBorder` | #A5BCFC / #2952CC | ◐ light matches | dark differs: #A5BCFC vs #2952CC |
| `chat.navtoggle.pressed.bg` | #C8D6FD | `sem-navTogglePressedBg` | #C8D6FD / #2E4066 | ◐ light matches | dark differs: #C8D6FD vs #2E4066 |
| `chat.navtoggle.pressed.border` | #A5BCFC | `sem-navTogglePressedBorder` | #A5BCFC / #2952CC | ◐ light matches | dark differs: #A5BCFC vs #2952CC |
| `chat.navtoggle.pressed.icon` | #2952CC | `sem-navTogglePressedIcon` | #2952CC / #A5BCFC | ◐ light matches | dark differs: #2952CC vs #A5BCFC |

### `p:` page tokens (imported chat/nav page snapshot) (47)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `p:chat.text.primary` | #2D2926 | `sem-chatTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `p:nav.text.primary` | #2D2926 | `sem-navTextPrimary` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |
| `p:chat.text.secondary` | #5E5954 | `sem-chatTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `p:nav.text.secondary` | #5E5954 | `sem-navTextSecondary` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `p:chat.bg` | #F7F5F0 | `sem-chatBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `p:nav.bg` | #F7F5F0 | `sem-navBg` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `p:chat.border` | #DCD8CB | `sem-chatBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `p:nav.border` | #DCD8CB | `sem-navBorder` | #DCD8CB / #2A3A5C | ◐ light matches | dark differs: #DCD8CB vs #2A3A5C |
| `p:chat.divider` | #E8E6E0 | `sem-chatDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `p:nav.divider` | #E8E6E0 | `sem-navDivider` | #E8E6E0 / #16223C | ◐ light matches | dark differs: #E8E6E0 vs #16223C |
| `p:chat.text.placeholder` | #A8A49E | `sem-chatPlaceholder` | #A8A49E / #3A485F | ◐ light matches | dark differs: #A8A49E vs #3A485F |
| `p:chat.input.bg` | #FFFFFF | `sem-chatInputBg` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #FFFFFF vs #1C2943 |
| `p:chat.send.bg` | #3C3C3C | `sem-chatSendBg` | #3A6AF8 / #7094FB | ~ role match | value updated by design: #3C3C3C vs #3A6AF8 / #7094FB |
| `p:chat.bubble.user.bg` | #F7F5F0 | `sem-chatBubbleUser` | #F7F5F0 / #090E1B | ◐ light matches | dark differs: #F7F5F0 vs #090E1B |
| `p:chat.bubble.user.border` | #DCD8CB | `sem-chatBubbleUserBorder` | #DCD8CB / #00000000 | ✓ exact | resolved 2026-08-20: dedicated token minted |
| `p:chat.chip.bg` | #F7F5F0 | `sem-background-main` | #F7F5F0 / #101729 | ? by value | no dedicated chip bg; value equals sem-chatBg |
| `p:chat.chip.border` | #DCD8CB | `sem-borders-dark` | #DCD8CB / #22314F | ? by value | no dedicated chip border; value equals sem-chatBorder |
| `p:chat.shadow` | #2D292628 | `sem-chatShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `p:nav.shadow` | #2D292628 | `sem-navShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `p:chat.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `p:chat.bubble.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `p:chat.chip.radius` | 24 | `radius-md` | 24 | ✓ exact |  |
| `p:chat.voice.active.bg` | #3A6AF8 | `sem-chatVoiceActiveBg` | #3A6AF8 / #9BB3FC | ◐ light matches | dark differs: #3A6AF8 vs #9BB3FC |
| `p:chat.voice.active.icon` | #FFFFFF | `sem-chatVoiceActiveIcon` | #FFFFFF / #000000 | ◐ light matches | dark differs: #FFFFFF vs #000000 |
| `p:chat.voice.waveform` | #7094FB | `sem-chatVoiceWaveform` | #7094FB / #9BB3FC | ◐ light matches | dark differs: #7094FB vs #9BB3FC |
| `p:chat.voice.timer` | #5E5954 | `sem-chatVoiceTimer` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `p:chat.voice.pulse` | #3A6AF828 | `sem-chatVoicePulse` | #3A6AF828 / #7094FB28 | ◐ light matches | dark differs: #3A6AF828 vs #7094FB28 |
| `p:chat.icon` | #5E5954 | `sem-chatIcon` | #5E5954 / #9DAFCD | ◐ light matches | dark differs: #5E5954 vs #9DAFCD |
| `p:chat.close.hover.bg` | #EDEAE3 | `sem-chatCloseHoverBg` | #EBF0FE / #22314F | ~ role match | value updated by design: #EDEAE3 vs #EBF0FE / #22314F |
| `p:chat.close.pressed.bg` | #E3DFD6 | `sem-chatClosePressedBg` | #C8D6FD / #2E4066 | ~ role match | value updated by design: #E3DFD6 vs #C8D6FD / #2E4066 |
| `p:chat.send.icon` | #FFFFFF | `sem-chatSendIcon` | #FFFFFF | ✓ exact |  |
| `p:chat.send.bg.hover` | #4F4F4F | `sem-chatSendBgHover` | #2952CC / #9BB3FC | ~ role match | value updated by design: #4F4F4F vs #2952CC / #9BB3FC |
| `p:chat.send.bg.pressed` | #2A2A2A | `sem-chatSendBgPressed` | #163196 / #3A6AF8 | ~ role match | value updated by design: #2A2A2A vs #163196 / #3A6AF8 |
| `p:chat.send.bg.disabled` | #D4D1CA | `sem-chatSendBgDisabled` | #C8D6FD / #152354 | ~ role match | value updated by design: #D4D1CA vs #C8D6FD / #152354 |
| `p:chat.chip.hover.bg` | #EDEAE3 | `sem-chatChipHover` | #EDEAE3 / #172642 | ◐ light matches | dark differs: #EDEAE3 vs #172642 |
| `p:nav.hover.bg` | #EDEAE3 | `sem-navHoverBg` | #EDEAE3 / #0C1222 | ◐ light matches | dark differs: #EDEAE3 vs #0C1222 |
| `p:chat.chip.pressed.bg` | #E3DFD6 | `sem-chatChipPressed` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `p:nav.pressed.bg` | #E3DFD6 | `sem-navPressedBg` | #E3DFD6 / #22314F | ◐ light matches | dark differs: #E3DFD6 vs #22314F |
| `p:chat.voice.cancel.icon` | #8A8680 | `sem-chatVoiceCancelIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `p:chat.input.border` | #E8E6E0 | `sem-chatInputBorder` | #E8E6E0 / #22314F | ◐ light matches | dark differs: #E8E6E0 vs #22314F |
| `p:chat.input.radius` | 12 | `radius-xs` | 12 | ✓ exact | resolved 2026-08-20: `radius-xs` = 12 exists in the final scale |
| `p:chat.input.border.active` | #C0BAB2 | `sem-chatInputBorderActive` | #C0BAB2 / #33476E | ◐ light matches | dark differs: #C0BAB2 vs #33476E |
| `p:chat.bubble.ai.bg` | #FFFFFF00 | `sem-chatBubbleAi` | #FFFFFF00 / #FFFFFF00 | ✓ exact | resolved 2026-08-20: token minted (transparent in both modes) |
| `p:nav.text.disabled` | #B5B1AB | `sem-navTextDisabled` | #B5B1AB / #697DA0 | ◐ light matches | dark differs: #B5B1AB vs #697DA0 |
| `p:nav.icon` | #8A8680 | `sem-navIcon` | #8A8680 / #889CBF | ◐ light matches | dark differs: #8A8680 vs #889CBF |
| `p:nav.active.bg` | #DCD8CB | `sem-navActiveBg` | #DCD8CB / #18223A | ◐ light matches | dark differs: #DCD8CB vs #18223A |
| `p:nav.hover.text` | #2D2926 | `sem-navHoverText` | #2D2926 / #C8D4E9 | ◐ light matches | dark differs: #2D2926 vs #C8D4E9 |

### `g:` palette primitives (`g:color-*`) (129)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `g:color-base-white` | #FFFFFF | `prim-base-white` | #FFFFFF | ✓ exact |  |
| `g:color-base-black` | #000000 | `prim-base-black` | #000000 | ✓ exact |  |
| `g:color-gray-900` | #0E0E0E | `prim-gray-900` | #0E0E0E | ✓ exact |  |
| `g:color-gray-800` | #2D2926 | `prim-gray-800` | #2D2926 | ✓ exact |  |
| `g:color-gray-700` | #403D3A | `prim-gray-700` | #403D3A | ✓ exact |  |
| `g:color-gray-600` | #5E5954 | `prim-gray-600` | #5E5954 | ✓ exact |  |
| `g:color-gray-500` | #716E6A | `prim-gray-500` | #716E6A | ✓ exact |  |
| `g:color-gray-400` | #8A8680 | `prim-gray-400` | #8A8680 | ✓ exact |  |
| `g:color-gray-300` | #B5B1AB | `prim-gray-300` | #B5B1AB | ✓ exact |  |
| `g:color-gray-200` | #D5D3D0 | `prim-gray-200` | #D5D3D0 | ✓ exact |  |
| `g:color-gray-100` | #EEEDEB | `prim-gray-100` | #EEEDEB | ✓ exact |  |
| `g:color-gray-50` | #F8F7F6 | `prim-gray-50` | #F8F7F6 | ✓ exact |  |
| `g:color-green-900` | #020A04 | `prim-green-900` | #020A04 | ✓ exact |  |
| `g:color-green-800` | #062811 | `prim-green-800` | #062811 | ✓ exact |  |
| `g:color-green-700` | #0B461E | `prim-green-700` | #0B461E | ✓ exact |  |
| `g:color-green-600` | #10642B | `prim-green-600` | #10642B | ✓ exact |  |
| `g:color-green-500` | #148338 | `prim-green-500` | #148338 | ✓ exact |  |
| `g:color-green-400` | #1EBF51 | `prim-green-400` | #1EBF51 | ✓ exact |  |
| `g:color-green-300` | #27FB6B / #5FE0A8 | `prim-green-300` | #27FB6B / #5FE0A8 | ✓ exact |  |
| `g:color-green-200` | #68FC97 | `prim-green-200` | #68FC97 | ✓ exact |  |
| `g:color-green-100` | #A9FDC4 | `prim-green-100` | #A9FDC4 | ✓ exact |  |
| `g:color-green-50` | #E9FFF0 | `prim-green-50` | #E9FFF0 | ✓ exact |  |
| `g:color-sky-900` | #081B28 | `prim-sky-900` | #081B28 | ✓ exact |  |
| `g:color-sky-800` | #10324C | `prim-sky-800` | #10324C | ✓ exact |  |
| `g:color-sky-700` | #174A6F | `prim-sky-700` | #174A6F | ✓ exact |  |
| `g:color-sky-600` | #1F6193 | `prim-sky-600` | #1F6193 | ✓ exact |  |
| `g:color-sky-500` | #2679B6 | `prim-sky-500` | #2679B6 | ✓ exact |  |
| `g:color-sky-400` | #2E90DA | `prim-sky-400` | #2E90DA | ✓ exact |  |
| `g:color-sky-300` | #35A8FD | `prim-sky-300` | #35A8FD | ✓ exact |  |
| `g:color-sky-200` | #72C2FE | `prim-sky-200` | #72C2FE | ✓ exact |  |
| `g:color-sky-100` | #AEDCFE | `prim-sky-100` | #AEDCFE | ✓ exact |  |
| `g:color-sky-50` | #EBF6FF | `prim-sky-50` | #EBF6FF | ✓ exact |  |
| `g:color-red-900` | #320908 | `prim-red-900` | #320908 | ✓ exact |  |
| `g:color-red-800` | #641210 | `prim-red-800` | #641210 | ✓ exact |  |
| `g:color-red-700` | #961A18 | `prim-red-700` | #961A18 | ✓ exact |  |
| `g:color-red-600` | #C82320 | `prim-red-600` | #C82320 | ✓ exact |  |
| `g:color-red-500` | #FA2C28 | `prim-red-500` | #FA2C28 | ✓ exact |  |
| `g:color-red-400` | #FB5653 | `prim-red-400` | #FB5653 | ✓ exact |  |
| `g:color-red-300` | #FC807E / #FCA5A5 | `prim-red-300` | #FC807E / #FCA5A5 | ✓ exact |  |
| `g:color-red-200` | #FDABA9 | `prim-red-200` | #FDABA9 | ✓ exact |  |
| `g:color-red-100` | #FED5D4 | `prim-red-100` | #FED5D4 | ✓ exact |  |
| `g:color-red-50` | #FFEAEA | `prim-red-50` | #FFEAEA | ✓ exact |  |
| `g:color-taupe-900` | #322C20 | `prim-taupe-900` | #322C20 | ✓ exact |  |
| `g:color-taupe-800` | #4B4435 | `prim-taupe-800` | #4B4435 | ✓ exact |  |
| `g:color-taupe-700` | #6C6451 | `prim-taupe-700` | #6C6451 | ✓ exact |  |
| `g:color-taupe-600` | #877F68 | `prim-taupe-600` | #877F68 | ✓ exact |  |
| `g:color-taupe-500` | #9D937B | `prim-taupe-500` | #9D937B | ✓ exact |  |
| `g:color-taupe-400` | #BCB49E | `prim-taupe-400` | #BCB49E | ✓ exact |  |
| `g:color-taupe-300` | #E3DFD6 | `prim-taupe-300` | #E3DFD6 | ✓ exact |  |
| `g:color-taupe-200` | #EDEAE3 | `prim-taupe-200` | #EDEAE3 | ✓ exact |  |
| `g:color-taupe-100` | #F7F5F0 | `prim-taupe-100` | #F7F5F0 | ✓ exact |  |
| `g:color-blue-100` | #EBF0FE | `prim-blue-100` | #EBF0FE | ✓ exact |  |
| `g:color-blue-200` | #C8D6FD | `prim-blue-200` | #C8D6FD | ✓ exact |  |
| `g:color-blue-300` | #A5BCFC | `prim-blue-300` | #A5BCFC | ✓ exact |  |
| `g:color-blue-400` | #7094FB / #9BB3FC | `prim-blue-400` | #7094FB / #9BB3FC | ✓ exact |  |
| `g:color-blue-500` | #5A82F9 / #7094FB | `prim-blue-500` | #5A82F9 / #7094FB | ✓ exact |  |
| `g:color-blue-600` | #3A6AF8 | `prim-blue-600` | #3A6AF8 | ✓ exact |  |
| `g:color-blue-700` | #2952CC | `prim-blue-700` | #2952CC | ✓ exact |  |
| `g:color-blue-800` | #163196 / #152354 | `prim-blue-800` | #163196 / #152354 | ✓ exact |  |
| `g:color-blue-900` | #031E64 | `prim-blue-900` | #031E64 | ✓ exact |  |
| `g:color-orange-50` | #FFF1E9 | `prim-orange-50` | #FFF1E9 | ✓ exact |  |
| `g:color-orange-100` | #FEE4D2 | `prim-orange-100` | #FEE4D2 | ✓ exact |  |
| `g:color-orange-200` | #FDC9A6 | `prim-orange-200` | #FDC9A6 | ✓ exact |  |
| `g:color-orange-300` | #FCAD79 | `prim-orange-300` | #FCAD79 | ✓ exact |  |
| `g:color-orange-400` | #FB924D / #FB923C | `prim-orange-400` | #FB924D / #FB923C | ✓ exact |  |
| `g:color-orange-500` | #FA7720 | `prim-orange-500` | #FA7720 | ✓ exact |  |
| `g:color-orange-600` | #C85F1A | `prim-orange-600` | #C85F1A | ✓ exact |  |
| `g:color-orange-700` | #964713 | `prim-orange-700` | #964713 | ✓ exact |  |
| `g:color-orange-800` | #64300D | `prim-orange-800` | #64300D | ✓ exact |  |
| `g:color-orange-900` | #321806 | `prim-orange-900` | #321806 | ✓ exact |  |
| `g:color-navy-raised` | #18223A | `prim-navy-raised` | #18223A | ✓ exact |  |
| `g:color-navy-surface` | #131C31 | `prim-navy-surface` | #1C2943 | ~ role match | value updated by design: #131C31 vs #1C2943 |
| `g:color-navy-825` | #101729 | `prim-navy-825` | #101729 | ✓ exact |  |
| `g:color-navy-app` | #090E1B | `prim-navy-app` | #090E1B | ✓ exact |  |
| `g:color-navy-border-100` | #131E34 | `prim-navy-border-100` | #131E34 | ✓ exact |  |
| `g:color-navylight-200` | #52637F | `prim-navylight-200` | #52637F | ✓ exact |  |
| `g:color-navy-600` | #52637F | `prim-navy-600` | #52637F | ✓ exact |  |
| `g:color-taupe-350` | #DCD8CB | `prim-taupe-350` | #DCD8CB | ✓ exact |  |
| `g:color-navy-border-300` | #22314F | `prim-navy-border-300` | #22314F | ✓ exact |  |
| `g:color-navylight-400` | #889CBF | `prim-navylight-400` | #889CBF | ✓ exact |  |
| `g:color-navy-400` | #889CBF | `prim-navy-400` | #889CBF | ✓ exact |  |
| `g:color-navy-border-600` | #33476E | `prim-navy-border-600` | #33476E | ✓ exact |  |
| `g:color-navylight-800` | #D8E1F0 | `prim-navylight-800` | #D8E1F0 | ✓ exact |  |
| `g:color-navy-150` | #D8E1F0 | `prim-navy-150` | #D8E1F0 | ✓ exact |  |
| `g:color-semantic-loss-dark` | #F87171 | `prim-red-350` | #F87171 | ? by value | matched by light value only; confirm role |
| `g:color-navy-250` | #B3C1DB | `prim-navy-250` | #B3C1DB | ✓ exact |  |
| `g:color-navylight-600` | #B3C1DB | `prim-navylight-600` | #B3C1DB | ✓ exact |  |
| `g:color-navy-500` | #697DA0 | `prim-navy-500` | #697DA0 | ✓ exact |  |
| `g:color-semantic-gain-dark` | #4ADE80 | `prim-green-350` | #4ADE80 | ? by value | matched by light value only; confirm role |
| `g:color-navy-700` | #3A485F | `prim-navy-700` | #3A485F | ✓ exact |  |
| `g:color-navylight-300` | #697DA0 | `prim-navylight-300` | #697DA0 | ✓ exact |  |
| `g:color-navylight-700` | #C8D4E9 | `prim-navylight-700` | #C8D4E9 | ✓ exact |  |
| `g:color-navy-200` | #C8D4E9 | `prim-navy-200` | #C8D4E9 | ✓ exact |  |
| `g:color-navylight-900` | #E9EEF7 | `prim-navylight-900` | #E9EEF7 | ✓ exact |  |
| `g:color-navy-100` | #E9EEF7 | `prim-navy-100` | #E9EEF7 | ✓ exact |  |
| `g:color-navy-border-500` | #2E4066 | `prim-navy-border-500` | #2E4066 | ✓ exact |  |
| `g:color-navy-border-200` | #16223C | `prim-navy-border-200` | #16223C | ✓ exact |  |
| `g:color-navy-border-400` | #2A3A5C | `prim-navy-border-400` | #2A3A5C | ✓ exact |  |
| `g:color-navylight-100` | #3A485F | `prim-navylight-100` | #3A485F | ✓ exact |  |
| `g:color-red-250` | #FCA5A5 | `prim-red-250` | #FCA5A5 | ✓ exact |  |
| `g:color-taupe-250` | #E8E6E0 | `prim-taupe-250` | #E8E6E0 | ✓ exact |  |
| `g:color-gray-350` | #A8A49E | `prim-gray-350` | #A8A49E | ✓ exact |  |
| `g:color-navy-300` | #9DAFCD | `prim-navy-300` | #9DAFCD | ✓ exact |  |
| `g:color-navylight-500` | #9DAFCD | `prim-navylight-500` | #9DAFCD | ✓ exact |  |
| `g:color-navy-chat` | #0C1222 | `prim-navy-chat` | #0C1222 | ✓ exact |  |
| `g:color-navy-hover` | #172642 | `prim-navy-hover` | #172642 | ✓ exact |  |
| `g:color-navyblue-seq-100` | #1F3F99 | `prim-navyblue-seq-100` | #1F3F99 | ✓ exact |  |
| `g:color-navyblue-seq-200` | #2952CC | `prim-navyblue-seq-200` | #2952CC | ✓ exact |  |
| `g:color-navyblue-seq-300` | #3A6AF8 | `prim-navyblue-seq-300` | #3A6AF8 | ✓ exact |  |
| `g:color-navyblue-seq-400` | #5A82F9 | `prim-navyblue-seq-400` | #5A82F9 | ✓ exact |  |
| `g:color-navyblue-seq-500` | #7094FB | `prim-navyblue-seq-500` | #7094FB | ✓ exact |  |
| `g:color-navyblue-seq-600` | #A5BCFC | `prim-navyblue-seq-600` | #A5BCFC | ✓ exact |  |
| `g:color-navyblue-seq-700` | #C8D6FD | `prim-navyblue-seq-700` | #C8D6FD | ✓ exact |  |
| `g:color-reddark-300` | #2C1518 | `prim-reddark-300` | #2C1518 | ✓ exact |  |
| `g:color-skydark-200` | #10263C | `prim-skydark-200` | #10263C | ✓ exact |  |
| `g:color-skydark-100` | #16304A | `prim-skydark-100` | #16304A | ✓ exact |  |
| `g:color-sky-250` | #38BDF8 | `prim-sky-250` | #38BDF8 | ✓ exact |  |
| `g:color-greendark-300` | #12291C | `prim-greendark-300` | #12291C | ✓ exact |  |
| `g:color-greendark-200` | #1A3A26 | `prim-greendark-200` | #1A3A26 | ✓ exact |  |
| `g:color-greendark-100` | #245234 | `prim-greendark-100` | #245234 | ✓ exact |  |
| `g:color-orangedark-300` | #33200F | `prim-orangedark-300` | #33200F | ✓ exact |  |
| `g:color-orangedark-100` | #5E3A18 | `prim-orangedark-100` | #5E3A18 | ✓ exact |  |
| `g:color-orangedark-200` | #472C13 | `prim-orangedark-200` | #472C13 | ✓ exact |  |
| `g:color-reddark-100` | #542427 | `prim-reddark-100` | #542427 | ✓ exact |  |
| `g:color-reddark-200` | #3A1B1E | `prim-reddark-200` | #3A1B1E | ✓ exact |  |
| `g:color-gray-250` | #C0BAB2 | `prim-gray-250` | #C0BAB2 | ✓ exact |  |
| `g:color-navy-950` | #070A10 | — | — | ✗ no equivalent |  |
| `g:color-violet-300` | #C3B4FF | — | — | ✗ no equivalent |  |
| `g:color-violet-400` | #9A86FF | — | — | ✗ no equivalent |  |

### `g:` semantic colors (`g:colors-*`) (197)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `g:colors-background-light` | #F8F7F6 / #18223A | `sem-background-light` | #F8F7F6 / #18223A | ✓ exact |  |
| `g:colors-background-surface` | #FFFFFF / #131C31 | `sem-background-surface` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #131C31 vs #1C2943 |
| `g:colors-background-main` | #F7F5F0 / #101729 | `sem-background-main` | #F7F5F0 / #101729 | ✓ exact |  |
| `g:colors-borders-light` | #EEEDEB / #131E34 | `sem-borders-light` | #EEEDEB / #131E34 | ✓ exact |  |
| `g:colors-borders-dark` | #DCD8CB / #22314F | `sem-borders-dark` | #DCD8CB / #22314F | ✓ exact |  |
| `g:colors-borders-focus` | #0E0E0E / #7094FB | `sem-borders-focus` | #0E0E0E / #7094FB | ✓ exact |  |
| `g:colors-borders-error` | #C82320 / #F87171 | `sem-borders-error` | #C82320 / #F87171 | ✓ exact |  |
| `g:colors-borders-focus-inverted` | #FFFFFF | `sem-borders-focus-inverted` | #FFFFFF | ✓ exact |  |
| `g:colors-text-header` | #0E0E0E / #D8E1F0 | `sem-text-header` | #0E0E0E / #D8E1F0 | ✓ exact |  |
| `g:colors-text-body` | #403D3A / #B3C1DB | `sem-text-body` | #403D3A / #B3C1DB | ✓ exact |  |
| `g:colors-text-meta` | #5E5954 / #697DA0 | `sem-text-meta` | #5E5954 / #889CBF | ◐ light matches | dark differs: #697DA0 vs #889CBF |
| `g:colors-text-placeholder` | #716E6A / #52637F | `sem-text-placeholder` | #716E6A / #889CBF | ◐ light matches | dark differs: #52637F vs #889CBF |
| `g:colors-text-error` | #C82320 / #F87171 | `sem-text-error` | #C82320 / #F87171 | ✓ exact |  |
| `g:colors-text-action` | #3A6AF8 / #7094FB | `sem-text-action` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-text-reverse` | #FFFFFF / #0E0E0E | `sem-text-reverse` | #FFFFFF / #0E0E0E | ✓ exact |  |
| `g:colors-text-body-error` | #641210 / #F87171 | `sem-text-body-error` | #641210 / #E5807E | ◐ light matches | dark differs: #F87171 vs #E5807E |
| `g:colors-text-deposit` | #148338 / #4ADE80 | `sem-text-deposit` | #148338 / #74D791 | ◐ light matches | dark differs: #4ADE80 vs #74D791 |
| `g:colors-text-disabled` | #B5B1AB / #3A485F | `sem-text-disabled` | #B5B1AB / #3A485F | ✓ exact |  |
| `g:colors-icons-muted` | #B5B1AB / #889CBF | `sem-icons-muted` | #B5B1AB / #889CBF | ✓ exact |  |
| `g:colors-icons-full` | #0E0E0E / #D8E1F0 | `sem-icons-full` | #0E0E0E / #D8E1F0 | ✓ exact |  |
| `g:colors-icons-error` | #C82320 / #F87171 | `sem-icons-error` | #C82320 / #F87171 | ✓ exact |  |
| `g:colors-icons-action` | #3A6AF8 / #7094FB | `sem-icons-action` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-icons-meta` | #5E5954 / #889CBF | `sem-icons-meta` | #5E5954 / #889CBF | ✓ exact |  |
| `g:colors-icons-reverse` | #FFFFFF | `sem-icons-reverse` | #FFFFFF | ✓ exact |  |
| `g:colors-btnPrimaryBg` | #3A6AF8 / #7094FB | `sem-btnPrimaryBg` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-btnPrimaryBgDisabled` | #C8D6FD / #152354 | `sem-btnPrimaryBgDisabled` | #C8D6FD / #152354 | ✓ exact |  |
| `g:colors-btnPrimaryBgActive` | #163196 / #3A6AF8 | `sem-btnPrimaryBgActive` | #163196 / #3A6AF8 | ✓ exact |  |
| `g:colors-btnPrimaryBgHover` | #2952CC / #9BB3FC | `sem-btnPrimaryBgHover` | #2952CC / #9BB3FC | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBg` | #FFFFFF / #18223A | `sem-btnPrimaryInvertedBg` | #FFFFFF / #18223A | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBgDisabled` | #FFFFFF / #090E1B | `sem-btnPrimaryInvertedBgDisabled` | #FFFFFF / #090E1B | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBgActive` | #C8D6FD / #2E4066 | `sem-btnPrimaryInvertedBgActive` | #C8D6FD / #2E4066 | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBgHover` | #EBF0FE / #22314F | `sem-btnPrimaryInvertedBgHover` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-btnPrimaryText` | #FFFFFF / #090E1B | `sem-btnPrimaryText` | #FFFFFF / #000000 | ◐ light matches | dark differs: #090E1B vs #000000 |
| `g:colors-btnPrimaryTextDisabled` | #FFFFFF / #7094FB | `sem-btnPrimaryTextDisabled` | #FFFFFF / #7094FB | ✓ exact |  |
| `g:colors-btnPrimaryTextActive` | #FFFFFF / #090E1B | `sem-btnPrimaryTextActive` | #FFFFFF / #000000 | ◐ light matches | dark differs: #090E1B vs #000000 |
| `g:colors-btnPrimaryTextHover` | #FFFFFF / #090E1B | `sem-btnPrimaryTextHover` | #FFFFFF / #090E1B | ✓ exact |  |
| `g:colors-btnPrimaryInvertedText` | #3A6AF8 / #9BB3FC | `sem-btnPrimaryInvertedText` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-btnPrimaryInvertedTextDisabled` | #A5BCFC / #2952CC | `sem-btnPrimaryInvertedTextDisabled` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-btnPrimaryInvertedTextActive` | #2952CC / #A5BCFC | `sem-btnPrimaryInvertedTextActive` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-btnPrimaryInvertedTextHover` | #2952CC / #A5BCFC | `sem-btnPrimaryInvertedTextHover` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-btnSecondaryBg` | #00000000 | `sem-btnSecondaryBg` | #00000000 | ✓ exact |  |
| `g:colors-btnSecondaryBgDisabled` | #00000000 | `sem-btnSecondaryBgDisabled` | #00000000 | ✓ exact |  |
| `g:colors-btnSecondaryBgActive` | #C8D6FD / #2E4066 | `sem-btnSecondaryBgActive` | #C8D6FD / #2E4066 | ✓ exact |  |
| `g:colors-btnSecondaryBgHover` | #EBF0FE / #22314F | `sem-btnSecondaryBgHover` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBg` | #00000000 | `sem-btnSecondaryInvertedBg` | #00000000 | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBgDisabled` | #00000000 | `sem-btnSecondaryInvertedBgDisabled` | #00000000 | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBgActive` | #FFFFFF1A | `sem-btnSecondaryInvertedBgActive` | #FFFFFF1A | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBgHover` | #FFFFFF1A | `sem-btnSecondaryInvertedBgHover` | #FFFFFF1A | ✓ exact |  |
| `g:colors-btnSecondaryText` | #3A6AF8 / #7094FB | `sem-btnSecondaryText` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-btnSecondaryTextDisabled` | #A5BCFC / #2952CC | `sem-btnSecondaryTextDisabled` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-btnSecondaryTextActive` | #2952CC / #A5BCFC | `sem-btnSecondaryTextActive` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-btnSecondaryTextHover` | #2952CC / #A5BCFC | `sem-btnSecondaryTextHover` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-btnSecondaryInvertedText` | #FFFFFF / #E9EEF7 | `sem-btnSecondaryInvertedText` | #FFFFFF / #E9EEF7 | ✓ exact |  |
| `g:colors-btnSecondaryInvertedTextDisabled` | #B5B1AB / #889CBF | `sem-btnSecondaryInvertedTextDisabled` | #B5B1AB / #889CBF | ✓ exact |  |
| `g:colors-btnSecondaryInvertedTextActive` | #D5D3D0 / #B3C1DB | `sem-btnSecondaryInvertedTextActive` | #D5D3D0 / #B3C1DB | ✓ exact |  |
| `g:colors-btnSecondaryInvertedTextHover` | #FFFFFF / #E9EEF7 | `sem-btnSecondaryInvertedTextHover` | #FFFFFF / #E9EEF7 | ✓ exact |  |
| `g:colors-btnSecondaryBorder` | #A5BCFC / #152354 | `sem-btnSecondaryBorder` | #A5BCFC / #152354 | ✓ exact |  |
| `g:colors-btnSecondaryBorderDisabled` | #EBF0FE / #22314F | `sem-btnSecondaryBorderDisabled` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-btnSecondaryBorderActive` | #A5BCFC / #2952CC | `sem-btnSecondaryBorderActive` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-btnSecondaryBorderHover` | #A5BCFC / #2952CC | `sem-btnSecondaryBorderHover` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBorder` | #D5D3D0 / #2A3A5C | `sem-btnSecondaryInvertedBorder` | #D5D3D0 / #2A3A5C | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBorderDisabled` | #B5B1AB / #16223C | `sem-btnSecondaryInvertedBorderDisabled` | #B5B1AB / #16223C | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBorderActive` | #00000000 | `sem-btnSecondaryInvertedBorderActive` | #00000000 | ✓ exact |  |
| `g:colors-btnSecondaryInvertedBorderHover` | #FFFFFF / #D8E1F0 | `sem-btnSecondaryInvertedBorderHover` | #FFFFFF / #D8E1F0 | ✓ exact |  |
| `g:colors-btnDestructionBg` | #C82320 / #F87171 | `sem-btnDestructionBg` | #C82320 / #F87171 | ✓ exact |  |
| `g:colors-btnDestructionBgDisabled` | #D5D3D0 / #3A485F | `sem-btnDestructionBgDisabled` | #D5D3D0 / #3A485F | ✓ exact |  |
| `g:colors-btnDestructionBgActive` | #961A18 / #FB5653 | `sem-btnDestructionBgActive` | #961A18 / #E56D66 | ◐ light matches | dark differs: #FB5653 vs #E56D66 |
| `g:colors-btnDestructionBgHover` | #FA2C28 / #FCA5A5 | `sem-btnDestructionBgHover` | #FA2C28 / #FCA5A5 | ✓ exact |  |
| `g:colors-btnDestructionText` | #EEEDEB / #090E1B | `sem-btnDestructionText` | #EEEDEB / #090E1B | ✓ exact |  |
| `g:colors-btnDestructionTextDisabled` | #5E5954 / #B3C1DB | `sem-btnDestructionTextDisabled` | #5E5954 / #B3C1DB | ✓ exact |  |
| `g:colors-btnDestructionTextActive` | #FFFFFF / #090E1B | `sem-btnDestructionTextActive` | #FFFFFF / #090E1B | ✓ exact |  |
| `g:colors-btnDestructionTextHover` | #FFFFFF / #090E1B | `sem-btnDestructionTextHover` | #FFFFFF / #090E1B | ✓ exact |  |
| `g:colors-btnLinkText` | #3A6AF8 / #9BB3FC | `sem-btnLinkText` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-btnLinkTextDisabled` | #A5BCFC / #2952CC | `sem-btnLinkTextDisabled` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-btnLinkTextActive` | #163196 / #C8D6FD | `sem-btnLinkTextActive` | #163196 / #C8D6FD | ✓ exact |  |
| `g:colors-btnLinkTextHover` | #2952CC / #A5BCFC | `sem-btnLinkTextHover` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-chatBg` | #F7F5F0 / #090E1B | `sem-chatBg` | #F7F5F0 / #090E1B | ✓ exact |  |
| `g:colors-chatBorder` | #DCD8CB / #2A3A5C | `sem-chatBorder` | #DCD8CB / #2A3A5C | ✓ exact |  |
| `g:colors-chatBubbleUser` | #F7F5F0 / #090E1B | `sem-chatBubbleUser` | #F7F5F0 / #090E1B | ✓ exact |  |
| `g:colors-chatDivider` | #E8E6E0 / #16223C | `sem-chatDivider` | #E8E6E0 / #16223C | ✓ exact |  |
| `g:colors-chatInputBg` | #FFFFFF / #131C31 | `sem-chatInputBg` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #131C31 vs #1C2943 |
| `g:colors-chatPlaceholder` | #A8A49E / #3A485F | `sem-chatPlaceholder` | #A8A49E / #3A485F | ✓ exact |  |
| `g:colors-chatSendBg` | #3A6AF8 / #7094FB | `sem-chatSendBg` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-chatShadow` | #2D292628 / #00000066 | `sem-chatShadow` | #2D292628 / #00000066 | ✓ exact |  |
| `g:colors-chatTextPrimary` | #2D2926 / #C8D4E9 | `sem-chatTextPrimary` | #2D2926 / #C8D4E9 | ✓ exact |  |
| `g:colors-chatTextSecondary` | #5E5954 / #9DAFCD | `sem-chatTextSecondary` | #5E5954 / #9DAFCD | ✓ exact |  |
| `g:colors-navActiveBg` | #DCD8CB / #18223A | `sem-navActiveBg` | #DCD8CB / #18223A | ✓ exact |  |
| `g:colors-navBg` | #F7F5F0 / #090E1B | `sem-navBg` | #F7F5F0 / #090E1B | ✓ exact |  |
| `g:colors-navBorder` | #DCD8CB / #2A3A5C | `sem-navBorder` | #DCD8CB / #2A3A5C | ✓ exact |  |
| `g:colors-navDivider` | #E8E6E0 / #16223C | `sem-navDivider` | #E8E6E0 / #16223C | ✓ exact |  |
| `g:colors-navHoverBg` | #EDEAE3 / #0C1222 | `sem-navHoverBg` | #EDEAE3 / #0C1222 | ✓ exact |  |
| `g:colors-navHoverText` | #2D2926 / #C8D4E9 | `sem-navHoverText` | #2D2926 / #C8D4E9 | ✓ exact |  |
| `g:colors-navIcon` | #8A8680 / #889CBF | `sem-navIcon` | #8A8680 / #889CBF | ✓ exact |  |
| `g:colors-navPressedBg` | #E3DFD6 / #22314F | `sem-navPressedBg` | #E3DFD6 / #22314F | ✓ exact |  |
| `g:colors-navShadow` | #2D292628 | `sem-navShadow` | #2D292628 / #00000066 | ◐ light matches | dark differs: #2D292628 vs #00000066 |
| `g:colors-navTextDisabled` | #B5B1AB / #697DA0 | `sem-navTextDisabled` | #B5B1AB / #697DA0 | ✓ exact |  |
| `g:colors-navTextPrimary` | #2D2926 / #C8D4E9 | `sem-navTextPrimary` | #2D2926 / #C8D4E9 | ✓ exact |  |
| `g:colors-navTextSecondary` | #5E5954 / #9DAFCD | `sem-navTextSecondary` | #5E5954 / #9DAFCD | ✓ exact |  |
| `g:colors-chatVoiceActiveBg` | #3A6AF8 / #9BB3FC | `sem-chatVoiceActiveBg` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-chatVoiceActiveIcon` | #FFFFFF / #090E1B | `sem-chatVoiceActiveIcon` | #FFFFFF / #000000 | ◐ light matches | dark differs: #090E1B vs #000000 |
| `g:colors-chatVoicePulse` | #3A6AF828 / #7094FB28 | `sem-chatVoicePulse` | #3A6AF828 / #7094FB28 | ✓ exact |  |
| `g:colors-chatVoiceTimer` | #5E5954 / #9DAFCD | `sem-chatVoiceTimer` | #5E5954 / #9DAFCD | ✓ exact |  |
| `g:colors-chatVoiceWaveform` | #7094FB / #9BB3FC | `sem-chatVoiceWaveform` | #7094FB / #9BB3FC | ✓ exact |  |
| `g:colors-btnLinkTextPressed` | #163196 / #C8D6FD | `sem-btnLinkTextPressed` | #163196 / #C8D6FD | ✓ exact |  |
| `g:colors-chatChipHover` | #EDEAE3 / #172642 | `sem-chatChipHover` | #EDEAE3 / #172642 | ✓ exact |  |
| `g:colors-chatChipPressed` | #E3DFD6 / #22314F | `sem-chatChipPressed` | #E3DFD6 / #22314F | ✓ exact |  |
| `g:colors-background-error` | #FFEAEA / #2C1518 | `sem-background-error` | #FFEAEA / #2C1518 | ✓ exact |  |
| `g:colors-background-disabled` | #F8F7F6 / #18223A | `sem-background-disabled` | #F8F7F6 / #18223A | ✓ exact |  |
| `g:colors-background-hover` | #F8F7F6 / #172642 | `sem-background-hover` | #F8F7F6 / #172642 | ✓ exact |  |
| `g:colors-borders-disabled` | #B5B1AB / #16223C | `sem-borders-disabled` | #B5B1AB / #16223C | ✓ exact |  |
| `g:colors-borders-hover` | #8A8680 / #2A3A5C | `sem-borders-hover` | #8A8680 / #2A3A5C | ✓ exact |  |
| `g:colors-borders-error-strong` | #961A18 / #FB5653 | `sem-borders-error-strong` | #961A18 / #E56D66 | ◐ light matches | dark differs: #FB5653 vs #E56D66 |
| `g:colors-icons-subtle` | #8A8680 / #889CBF | `sem-icons-subtle` | #8A8680 / #889CBF | ✓ exact |  |
| `g:colors-toggleKnob` | #FFFFFF | `sem-toggleKnob` | #FFFFFF | ✓ exact |  |
| `g:colors-toggleKnobOn` | #3A6AF8 / #9BB3FC | `sem-toggleKnobOn` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-toggleLoadingTrack` | #EEEDEB / #22314F | `sem-toggleLoadingTrack` | #EEEDEB / #22314F | ✓ exact |  |
| `g:colors-toggleTrackOff` | #EDEAE3 / #22314F | `sem-toggleTrackOff` | #EDEAE3 / #22314F | ✓ exact |  |
| `g:colors-toggleTrackOn` | #EBF0FE / #2952CC | `sem-toggleTrackOn` | #EBF0FE / #2952CC | ✓ exact |  |
| `g:colors-background-rowHover` | #F7F5F0 / #172642 | `sem-background-rowHover` | #F7F5F0 / #172642 | ✓ exact |  |
| `g:colors-background-rowPressed` | #EDEAE3 / #0C1222 | `sem-background-rowPressed` | #EDEAE3 / #0C1222 | ✓ exact |  |
| `g:colors-background-sunken` | #F7F5F0 / #090E1B | `sem-background-sunken` | #F7F5F0 / #090E1B | ✓ exact |  |
| `g:colors-background-subtle` | #EEEDEB / #22314F | `sem-background-subtle` | #EEEDEB / #22314F | ✓ exact |  |
| `g:colors-background-muted` | #D5D3D0 / #2A3A5C | `sem-background-muted` | #D5D3D0 / #2A3A5C | ✓ exact |  |
| `g:colors-background-action` | #3A6AF8 / #7094FB | `sem-background-action` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-borders-action` | #3A6AF8 / #7094FB | `sem-borders-action` | #3A6AF8 / #7094FB | ✓ exact |  |
| `g:colors-background-info` | #EBF6FF / #10263C | `sem-background-info` | #EBF6FF / #10263C | ✓ exact |  |
| `g:colors-background-info-strong` | #AEDCFE / #16304A | `sem-background-info-strong` | #AEDCFE / #16304A | ✓ exact |  |
| `g:colors-borders-info` | #AEDCFE / #16304A | `sem-borders-info` | #AEDCFE / #16304A | ✓ exact |  |
| `g:colors-icons-info` | #35A8FD | `sem-icons-info` | #35A8FD | ✓ exact |  |
| `g:colors-icons-info-strong` | #2E90DA / #38BDF8 | `sem-icons-info-strong` | #2E90DA / #38BDF8 | ✓ exact |  |
| `g:colors-text-info-title` | #1F6193 / #35A8FD | `sem-text-info-title` | #1F6193 / #5CA8E7 | ◐ light matches | dark differs: #35A8FD vs #5CA8E7 |
| `g:colors-background-success` | #E9FFF0 / #12291C | `sem-background-success` | #E9FFF0 / #12291C | ✓ exact |  |
| `g:colors-background-success-soft` | #A9FDC4 / #1A3A26 | `sem-background-success-soft` | #A9FDC4 / #1A3A26 | ✓ exact |  |
| `g:colors-background-success-strong` | #68FC97 / #245234 | `sem-background-success-strong` | #68FC97 / #245234 | ✓ exact |  |
| `g:colors-background-success-bold` | #10642B / #4ADE80 | `sem-background-success-bold` | #10642B / #74D791 | ◐ light matches | dark differs: #4ADE80 vs #74D791 |
| `g:colors-borders-success` | #A9FDC4 / #1A3A26 | `sem-borders-success` | #A9FDC4 / #1A3A26 | ✓ exact |  |
| `g:colors-icons-success` | #1EBF51 / #4ADE80 | `sem-icons-success` | #1EBF51 / #4ADE80 | ✓ exact |  |
| `g:colors-icons-success-strong` | #10642B / #4ADE80 | `sem-icons-success-strong` | #10642B / #74D791 | ◐ light matches | dark differs: #4ADE80 vs #74D791 |
| `g:colors-text-success-title` | #10642B / #4ADE80 | `sem-text-success-title` | #10642B / #74D791 | ◐ light matches | dark differs: #4ADE80 vs #74D791 |
| `g:colors-text-success-body` | #0B461E / #4ADE80 | `sem-text-success-body` | #0B461E / #74D791 | ◐ light matches | dark differs: #4ADE80 vs #74D791 |
| `g:colors-background-warning` | #FFF1E9 / #33200F | `sem-background-warning` | #FFF1E9 / #33200F | ✓ exact |  |
| `g:colors-background-warning-strong` | #FDC9A6 / #5E3A18 | `sem-background-warning-strong` | #FDC9A6 / #5E3A18 | ✓ exact |  |
| `g:colors-borders-warning` | #FEE4D2 / #472C13 | `sem-borders-warning` | #FEE4D2 / #472C13 | ✓ exact |  |
| `g:colors-icons-warning` | #FB924D / #FB923C | `sem-icons-warning` | #FB924D / #EA9C62 | ◐ light matches | dark differs: #FB923C vs #EA9C62 |
| `g:colors-icons-warning-strong` | #C85F1A / #FA7720 | `sem-icons-warning-strong` | #C85F1A / #E68550 | ◐ light matches | dark differs: #FA7720 vs #E68550 |
| `g:colors-text-warning-title` | #C85F1A / #FA7720 | `sem-text-warning-title` | #C85F1A / #E68550 | ◐ light matches | dark differs: #FA7720 vs #E68550 |
| `g:colors-text-warning-body` | #964713 / #FB923C | `sem-text-warning-body` | #964713 / #EA9C62 | ◐ light matches | dark differs: #FB923C vs #EA9C62 |
| `g:colors-background-error-strong` | #FDABA9 / #542427 | `sem-background-error-strong` | #FDABA9 / #542427 | ✓ exact |  |
| `g:colors-borders-error-subtle` | #FED5D4 / #3A1B1E | `sem-borders-error-subtle` | #FED5D4 / #3A1B1E | ✓ exact |  |
| `g:colors-icons-error-soft` | #FB5653 / #F87171 | `sem-icons-error-soft` | #FB5653 / #F87171 | ✓ exact |  |
| `g:colors-text-error-title` | #C82320 / #F87171 | `sem-text-error-title` | #C82320 / #F87171 | ✓ exact |  |
| `g:colors-text-error-body-strong` | #961A18 / #FB5653 | `sem-text-error-body-strong` | #961A18 / #E56D66 | ◐ light matches | dark differs: #FB5653 vs #E56D66 |
| `g:colors-text-strong` | #2D2926 / #C8D4E9 | `sem-text-strong` | #2D2926 / #C8D4E9 | ✓ exact |  |
| `g:colors-dragHandle` | #0E0E0E / #D8E1F0 | `sem-dragHandle` | #0E0E0E / #D8E1F0 | ✓ exact |  |
| `g:colors-scrollbarThumb` | #B5B1AB / #697DA0 | `sem-scrollbarThumb` | #B5B1AB / #697DA0 | ✓ exact |  |
| `g:colors-tagBg` | #EBF0FE / #1F3F99 | `sem-tagBg` | #EBF0FE / #1F3F99 | ✓ exact |  |
| `g:colors-tagText` | #2952CC / #A5BCFC | `sem-tagText` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-sliderTrack` | #D5D3D0 / #2A3A5C | `sem-sliderTrack` | #D5D3D0 / #2A3A5C | ✓ exact |  |
| `g:colors-sliderAccent` | #3A6AF8 / #9BB3FC | `sem-sliderAccent` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-sliderAccentDisabled` | #B5B1AB / #697DA0 | `sem-sliderAccentDisabled` | #B5B1AB / #697DA0 | ✓ exact |  |
| `g:colors-paginationDot` | #D5D3D0 / #2A3A5C | `sem-paginationDot` | #D5D3D0 / #2A3A5C | ✓ exact |  |
| `g:colors-paginationDotActive` | #403D3A / #B3C1DB | `sem-paginationDotActive` | #403D3A / #B3C1DB | ✓ exact |  |
| `g:colors-borders-action-subtle` | #A5BCFC | `sem-borders-action-subtle` | #A5BCFC | ✓ exact |  |
| `g:colors-background-highlight` | #EBF0FE / #1F3F99 | `sem-background-highlight` | #EBF0FE / #1F3F99 | ✓ exact |  |
| `g:colors-text-subtle` | #8A8680 / #9DAFCD | `sem-text-subtle` | #8A8680 / #9DAFCD | ✓ exact |  |
| `g:colors-borders-muted` | #D5D3D0 / #16223C | `sem-borders-muted` | #D5D3D0 / #16223C | ✓ exact |  |
| `g:colors-btnSecondaryBorderPressed` | #A5BCFC / #2952CC | `sem-btnSecondaryBorderPressed` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-progressFill` | #163196 / #3A6AF8 | `sem-progressFill` | #163196 / #3A6AF8 | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBorder` | #A5BCFC / #33476E | `sem-btnPrimaryInvertedBorder` | #A5BCFC / #33476E | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBorderHover` | #A5BCFC / #33476E | `sem-btnPrimaryInvertedBorderHover` | #A5BCFC / #33476E | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBorderActive` | #A5BCFC / #33476E | `sem-btnPrimaryInvertedBorderActive` | #A5BCFC / #33476E | ✓ exact |  |
| `g:colors-btnPrimaryInvertedBorderDisabled` | #EBF0FE / #16223C | `sem-btnPrimaryInvertedBorderDisabled` | #EBF0FE / #16223C | ✓ exact |  |
| `g:colors-btnLinkBg` | #00000000 | `sem-btnLinkBg` | #00000000 | ✓ exact |  |
| `g:colors-btnLinkBgHover` | #EBF0FE / #22314F | `sem-btnLinkBgHover` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-btnLinkBgActive` | #C8D6FD / #2E4066 | `sem-btnLinkBgActive` | #C8D6FD / #2E4066 | ✓ exact |  |
| `g:colors-btnLinkBgDisabled` | #00000000 | `sem-btnLinkBgDisabled` | #00000000 | ✓ exact |  |
| `g:colors-btnLinkBorderPressed` | #2952CC / #7094FB | `sem-btnLinkBorderPressed` | #2952CC / #7094FB | ✓ exact |  |
| `g:colors-chatIcon` | #5E5954 / #9DAFCD | `sem-chatIcon` | #5E5954 / #9DAFCD | ✓ exact |  |
| `g:colors-chatInputBorder` | #E8E6E0 / #22314F | `sem-chatInputBorder` | #E8E6E0 / #22314F | ✓ exact |  |
| `g:colors-chatInputBorderActive` | #C0BAB2 / #33476E | `sem-chatInputBorderActive` | #C0BAB2 / #33476E | ✓ exact |  |
| `g:colors-chatSendBgHover` | #2952CC / #9BB3FC | `sem-chatSendBgHover` | #2952CC / #9BB3FC | ✓ exact |  |
| `g:colors-chatSendBgPressed` | #163196 / #3A6AF8 | `sem-chatSendBgPressed` | #163196 / #3A6AF8 | ✓ exact |  |
| `g:colors-chatSendBgDisabled` | #C8D6FD / #152354 | `sem-chatSendBgDisabled` | #C8D6FD / #152354 | ✓ exact |  |
| `g:colors-chatSendIcon` | #FFFFFF | `sem-chatSendIcon` | #FFFFFF | ✓ exact |  |
| `g:colors-chatVoiceBgDisabled` | #C8D6FD / #152354 | `sem-chatVoiceBgDisabled` | #C8D6FD / #152354 | ✓ exact |  |
| `g:colors-chatVoiceCancelIcon` | #8A8680 / #889CBF | `sem-chatVoiceCancelIcon` | #8A8680 / #889CBF | ✓ exact |  |
| `g:colors-chatCloseHoverBg` | #EBF0FE / #22314F | `sem-chatCloseHoverBg` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-chatClosePressedBg` | #C8D6FD / #2E4066 | `sem-chatClosePressedBg` | #C8D6FD / #2E4066 | ✓ exact |  |
| `g:colors-navToggleBg` | #FFFFFF / #18223A | `sem-navToggleBg` | #FFFFFF / #18223A | ✓ exact |  |
| `g:colors-navToggleBorder` | #A5BCFC / #152354 | `sem-navToggleBorder` | #A5BCFC / #152354 | ✓ exact |  |
| `g:colors-navToggleIcon` | #3A6AF8 / #9BB3FC | `sem-navToggleIcon` | #3A6AF8 / #9BB3FC | ✓ exact |  |
| `g:colors-navToggleHoverBg` | #EBF0FE / #22314F | `sem-navToggleHoverBg` | #EBF0FE / #22314F | ✓ exact |  |
| `g:colors-navToggleHoverBorder` | #A5BCFC / #2952CC | `sem-navToggleHoverBorder` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-navTogglePressedBg` | #C8D6FD / #2E4066 | `sem-navTogglePressedBg` | #C8D6FD / #2E4066 | ✓ exact |  |
| `g:colors-navTogglePressedBorder` | #A5BCFC / #2952CC | `sem-navTogglePressedBorder` | #A5BCFC / #2952CC | ✓ exact |  |
| `g:colors-navTogglePressedIcon` | #2952CC / #A5BCFC | `sem-navTogglePressedIcon` | #2952CC / #A5BCFC | ✓ exact |  |
| `g:colors-borders-strong` | #C0BAB2 / #33476E | `sem-borders-strong` | #C0BAB2 / #33476E | ✓ exact |  |

### `g:` typography (`g:typo-*`) (780)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `g:typo-primary-8xl-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-primary-8xl-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-primary-8xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-8xl-bold-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-primary-8xl-bold-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-primary-8xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-8xl-semibold-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-primary-8xl-semibold-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-primary-8xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-8xl-regular-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-primary-8xl-regular-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-primary-8xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-8xl-light-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-primary-8xl-light-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-primary-8xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-8xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-7xl-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-primary-7xl-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-primary-7xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-7xl-bold-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-primary-7xl-bold-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-primary-7xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-7xl-semibold-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-primary-7xl-semibold-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-primary-7xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-7xl-regular-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-primary-7xl-regular-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-primary-7xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-7xl-light-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-primary-7xl-light-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-primary-7xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-7xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-6xl-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-primary-6xl-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-primary-6xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-6xl-bold-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-primary-6xl-bold-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-primary-6xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-6xl-semibold-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-primary-6xl-semibold-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-primary-6xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-6xl-regular-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-primary-6xl-regular-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-primary-6xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-6xl-light-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-primary-6xl-light-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-primary-6xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-6xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-5xl-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-primary-5xl-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-primary-5xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-5xl-bold-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-primary-5xl-bold-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-primary-5xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-5xl-semibold-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-primary-5xl-semibold-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-primary-5xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-5xl-regular-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-primary-5xl-regular-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-primary-5xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-5xl-light-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-primary-5xl-light-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-primary-5xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-5xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-4xl-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-primary-4xl-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-primary-4xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-4xl-bold-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-primary-4xl-bold-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-primary-4xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-4xl-semibold-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-primary-4xl-semibold-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-primary-4xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-4xl-regular-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-primary-4xl-regular-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-primary-4xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-4xl-light-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-primary-4xl-light-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-primary-4xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-4xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-3xl-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-primary-3xl-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-primary-3xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-3xl-bold-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-primary-3xl-bold-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-primary-3xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-3xl-semibold-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-primary-3xl-semibold-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-primary-3xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-3xl-regular-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-primary-3xl-regular-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-primary-3xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-3xl-light-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-primary-3xl-light-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-primary-3xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-3xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xl-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-primary-2xl-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-primary-2xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xl-bold-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-primary-2xl-bold-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-primary-2xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xl-semibold-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-primary-2xl-semibold-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-primary-2xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xl-regular-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-primary-2xl-regular-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-primary-2xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xl-light-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-primary-2xl-light-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-primary-2xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xl-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-primary-xl-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-primary-xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xl-bold-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-primary-xl-bold-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-primary-xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xl-semibold-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-primary-xl-semibold-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-primary-xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xl-regular-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-primary-xl-regular-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-primary-xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xl-light-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-primary-xl-light-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-primary-xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xl-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-lg-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-primary-lg-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-primary-lg-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-lg-bold-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-primary-lg-bold-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-primary-lg-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-lg-semibold-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-primary-lg-semibold-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-primary-lg-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-lg-regular-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-primary-lg-regular-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-primary-lg-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-lg-light-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-primary-lg-light-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-primary-lg-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-lg-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-md-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-primary-md-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-primary-md-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-md-bold-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-primary-md-bold-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-primary-md-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-md-semibold-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-primary-md-semibold-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-primary-md-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-md-regular-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-primary-md-regular-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-primary-md-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-md-light-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-primary-md-light-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-primary-md-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-md-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-bold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-bold-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-semibold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-semibold-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-semibold-link-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-semibold-link-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-semibold-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-regular-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-regular-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-regular-link-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-regular-link-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-regular-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-base-light-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-primary-base-light-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-primary-base-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-base-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-bold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-bold-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-semibold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-semibold-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-semibold-link-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-semibold-link-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-semibold-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-regular-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-regular-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-regular-link-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-regular-link-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-regular-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-sm-light-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-primary-sm-light-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-primary-sm-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-sm-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-bold-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-bold-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-semibold-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-semibold-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-semibold-link-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-semibold-link-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-semibold-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-regular-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-regular-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-regular-link-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-regular-link-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-regular-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-xs-light-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-primary-xs-light-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-primary-xs-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-xs-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-bold-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-bold-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-bold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-semibold-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-semibold-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-semibold-link-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-semibold-link-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-semibold-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-regular-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-regular-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-regular-link-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-regular-link-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-regular-link-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-primary-2xs-light-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-primary-2xs-light-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-primary-2xs-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-primary-2xs-light-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `g:typo-secondary-8xl-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-secondary-8xl-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-secondary-8xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-8xl-bold-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-secondary-8xl-bold-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-secondary-8xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-8xl-semibold-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-secondary-8xl-semibold-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-secondary-8xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-8xl-regular-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-secondary-8xl-regular-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-secondary-8xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-8xl-light-font-size` | 96 | `text-size-8xl` | 96 | ✓ exact |  |
| `g:typo-secondary-8xl-light-line-height` | 96 | `line-height-8xl` | 1 | ~ role match | value updated by design: 96 vs 1 |
| `g:typo-secondary-8xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-8xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-7xl-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-secondary-7xl-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-secondary-7xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-7xl-bold-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-secondary-7xl-bold-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-secondary-7xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-7xl-semibold-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-secondary-7xl-semibold-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-secondary-7xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-7xl-regular-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-secondary-7xl-regular-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-secondary-7xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-7xl-light-font-size` | 80 | `text-size-7xl` | 80 | ✓ exact |  |
| `g:typo-secondary-7xl-light-line-height` | 84 | `line-height-7xl` | 1.05 | ~ role match | value updated by design: 84 vs 1.05 |
| `g:typo-secondary-7xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-7xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-6xl-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-secondary-6xl-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-secondary-6xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-6xl-bold-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-secondary-6xl-bold-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-secondary-6xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-6xl-semibold-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-secondary-6xl-semibold-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-secondary-6xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-6xl-regular-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-secondary-6xl-regular-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-secondary-6xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-6xl-light-font-size` | 64 | `text-size-6xl` | 64 | ✓ exact |  |
| `g:typo-secondary-6xl-light-line-height` | 72 | `line-height-6xl` | 1.125 | ~ role match | value updated by design: 72 vs 1.125 |
| `g:typo-secondary-6xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-6xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-5xl-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-secondary-5xl-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-secondary-5xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-5xl-bold-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-secondary-5xl-bold-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-secondary-5xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-5xl-semibold-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-secondary-5xl-semibold-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-secondary-5xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-5xl-regular-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-secondary-5xl-regular-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-secondary-5xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-5xl-light-font-size` | 56 | `text-size-5xl` | 56 | ✓ exact |  |
| `g:typo-secondary-5xl-light-line-height` | 64 | `line-height-5xl` | 1.1429 | ~ role match | value updated by design: 64 vs 1.1429 |
| `g:typo-secondary-5xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-5xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-4xl-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-secondary-4xl-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-secondary-4xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-4xl-bold-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-secondary-4xl-bold-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-secondary-4xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-4xl-semibold-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-secondary-4xl-semibold-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-secondary-4xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-4xl-regular-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-secondary-4xl-regular-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-secondary-4xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-4xl-light-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `g:typo-secondary-4xl-light-line-height` | 52 | `line-height-4xl` | 1.0833 | ~ role match | value updated by design: 52 vs 1.0833 |
| `g:typo-secondary-4xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-4xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-3xl-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-secondary-3xl-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-secondary-3xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-3xl-bold-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-secondary-3xl-bold-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-secondary-3xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-3xl-semibold-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-secondary-3xl-semibold-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-secondary-3xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-3xl-regular-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-secondary-3xl-regular-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-secondary-3xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-3xl-light-font-size` | 36 | `text-size-3xl` | 36 | ✓ exact |  |
| `g:typo-secondary-3xl-light-line-height` | 40 | `line-height-3xl` | 1.1111 | ~ role match | value updated by design: 40 vs 1.1111 |
| `g:typo-secondary-3xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-3xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xl-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-secondary-2xl-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-secondary-2xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xl-bold-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-secondary-2xl-bold-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-secondary-2xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xl-semibold-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-secondary-2xl-semibold-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-secondary-2xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xl-regular-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-secondary-2xl-regular-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-secondary-2xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xl-light-font-size` | 30 | `text-size-2xl` | 30 | ✓ exact |  |
| `g:typo-secondary-2xl-light-line-height` | 36 | `line-height-2xl` | 1.2 | ~ role match | value updated by design: 36 vs 1.2 |
| `g:typo-secondary-2xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xl-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-secondary-xl-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-secondary-xl-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xl-bold-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-secondary-xl-bold-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-secondary-xl-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xl-semibold-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-secondary-xl-semibold-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-secondary-xl-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xl-regular-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-secondary-xl-regular-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-secondary-xl-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xl-light-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `g:typo-secondary-xl-light-line-height` | 32 | `line-height-xl` | 1.3333 | ~ role match | value updated by design: 32 vs 1.3333 |
| `g:typo-secondary-xl-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xl-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-lg-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-secondary-lg-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-secondary-lg-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-lg-bold-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-secondary-lg-bold-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-secondary-lg-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-lg-semibold-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-secondary-lg-semibold-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-secondary-lg-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-lg-regular-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-secondary-lg-regular-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-secondary-lg-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-lg-light-font-size` | 20 | `text-size-lg` | 20 | ✓ exact |  |
| `g:typo-secondary-lg-light-line-height` | 28 | `line-height-lg` | 1.4 | ~ role match | value updated by design: 28 vs 1.4 |
| `g:typo-secondary-lg-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-lg-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-md-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-secondary-md-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-secondary-md-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-md-bold-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-secondary-md-bold-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-secondary-md-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-md-semibold-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-secondary-md-semibold-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-secondary-md-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-md-regular-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-secondary-md-regular-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-secondary-md-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-md-light-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `g:typo-secondary-md-light-line-height` | 28 | `line-height-md` | 1.5556 | ~ role match | value updated by design: 28 vs 1.5556 |
| `g:typo-secondary-md-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-md-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-bold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-bold-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-semibold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-semibold-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-semibold-link-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-semibold-link-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-semibold-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-regular-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-regular-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-regular-link-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-regular-link-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-regular-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-base-light-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `g:typo-secondary-base-light-line-height` | 24 | `line-height-base` | 1.5 | ~ role match | value updated by design: 24 vs 1.5 |
| `g:typo-secondary-base-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-base-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-bold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-bold-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-semibold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-semibold-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-semibold-link-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-semibold-link-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-semibold-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-regular-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-regular-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-regular-link-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-regular-link-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-regular-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-sm-light-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `g:typo-secondary-sm-light-line-height` | 20 | `line-height-sm` | 1.4286 | ~ role match | value updated by design: 20 vs 1.4286 |
| `g:typo-secondary-sm-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-sm-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-bold-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-bold-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-semibold-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-semibold-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-semibold-link-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-semibold-link-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-semibold-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-regular-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-regular-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-regular-link-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-regular-link-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-regular-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-xs-light-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `g:typo-secondary-xs-light-line-height` | 16 | `line-height-xs` | 1.3333 | ~ role match | value updated by design: 16 vs 1.3333 |
| `g:typo-secondary-xs-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-xs-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-bold-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-bold-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-bold-font-weight` | 700 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-bold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-bold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-semibold-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-semibold-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-semibold-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-semibold-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-semibold-link-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-semibold-link-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-semibold-link-font-weight` | 600 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-semibold-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-semibold-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-regular-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-regular-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-regular-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-regular-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-regular-link-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-regular-link-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-regular-link-font-weight` | 400 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-regular-link-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-regular-link-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |
| `g:typo-secondary-2xs-light-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `g:typo-secondary-2xs-light-line-height` | 14 | `line-height-2xs` | 1.2727 | ~ role match | value updated by design: 14 vs 1.2727 |
| `g:typo-secondary-2xs-light-font-weight` | 300 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-light-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `g:typo-secondary-2xs-light-font-family` | Noto Serif | `font-secondary` | Noto Serif | ✓ exact |  |

### `g:` scales (spacing / radius / shadow / z / motion / text) (54)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `g:spacing-4xs` | 2 | `spacing-4xs` | 2 | ✓ exact |  |
| `g:spacing-3xs` | 4 | `spacing-3xs` | 4 | ✓ exact |  |
| `g:spacing-2xs` | 8 | `spacing-2xs` | 8 | ✓ exact |  |
| `g:spacing-xs` | 12 | `spacing-xs` | 12 | ✓ exact |  |
| `g:spacing-sm` | 16 | `spacing-sm` | 16 | ✓ exact |  |
| `g:spacing-md` | 24 | `spacing-md` | 24 | ✓ exact |  |
| `g:spacing-lg` | 32 | `spacing-lg` | 32 | ✓ exact |  |
| `g:spacing-xl` | 40 | `spacing-xl` | 40 | ✓ exact |  |
| `g:spacing-2xl` | 48 | `spacing-2xl` | 48 | ✓ exact |  |
| `g:spacing-3xl` | 64 | `spacing-3xl` | 64 | ✓ exact |  |
| `g:spacing-4xl` | 72 | `spacing-4xl` | 72 | ✓ exact |  |
| `g:spacing-5xl` | 128 | `spacing-5xl` | 128 | ✓ exact |  |
| `g:font-family-primary` | Heebo | — | — | ✗ no equivalent |  |
| `g:font-family-secondary` | Noto Serif | — | — | ✗ no equivalent |  |
| `g:radius-2xl` | 48 | `radius-2xl` | 48 | ✓ exact |  |
| `g:radius-2xs` | 8 | `radius-2xs` | 8 | ✓ exact |  |
| `g:radius-3xl` | 64 | `radius-3xl` | 64 | ✓ exact |  |
| `g:radius-3xs` | 4 | `radius-3xs` | 4 | ✓ exact |  |
| `g:radius-4xl` | 72 | `radius-4xl` | 72 | ✓ exact |  |
| `g:radius-4xs` | 2 | `radius-4xs` | 2 | ✓ exact |  |
| `g:radius-5xl` | 128 | `radius-5xl` | 128 | ✓ exact |  |
| `g:radius-full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `g:radius-lg` | 32 | `radius-lg` | 32 | ✓ exact |  |
| `g:radius-md` | 24 | `radius-md` | 24 | ✓ exact |  |
| `g:radius-none` | 0 | `radius-none` | 0 | ✓ exact |  |
| `g:radius-sm` | 16 | `radius-sm` | 16 | ✓ exact |  |
| `g:radius-xl` | 40 | `radius-xl` | 40 | ✓ exact |  |
| `g:radius-xs` | 12 | `radius-xs` | 12 | ✓ exact |  |
| `g:shadow-lg-blur` | 24 | `shadow-lg-blur` | 24 | ✓ exact |  |
| `g:shadow-lg-color` | #0000001F / #00000052 | `prim-shadow-lg-color` | #0000001F / #00000073 | ◐ light matches | dark differs: #00000052 vs #00000073 |
| `g:shadow-lg-y` | 8 | `shadow-lg-y` | 8 | ✓ exact |  |
| `g:shadow-md-blur` | 12 | `shadow-md-blur` | 12 | ✓ exact |  |
| `g:shadow-md-color` | #0000001A / #00000047 | `prim-shadow-md-color` | #0000001A / #0000005C | ◐ light matches | dark differs: #00000047 vs #0000005C |
| `g:shadow-md-y` | 4 | `shadow-md-y` | 4 | ✓ exact |  |
| `g:shadow-overlay-blur` | 40 | `shadow-overlay-blur` | 40 | ✓ exact |  |
| `g:shadow-overlay-color` | #00000029 / #0000007A | `prim-shadow-overlay-color` | #00000029 / #000000A3 | ◐ light matches | dark differs: #0000007A vs #000000A3 |
| `g:shadow-overlay-y` | 16 | `shadow-overlay-y` | 16 | ✓ exact |  |
| `g:shadow-sm-blur` | 2 | `shadow-sm-blur` | 2 | ✓ exact |  |
| `g:shadow-sm-color` | #00000014 / #00000038 | `prim-shadow-sm-color` | #00000014 / #00000047 | ◐ light matches | dark differs: #00000038 vs #00000047 |
| `g:shadow-sm-y` | 1 | `shadow-sm-y` | 1 | ✓ exact |  |
| `g:z-base` | 0 | `z-base` | 0 | ✓ exact |  |
| `g:z-dropdown` | 100 | `z-dropdown` | 100 | ✓ exact |  |
| `g:z-modal` | 500 | `z-modal` | 500 | ✓ exact |  |
| `g:z-overlay` | 400 | `z-overlay` | 400 | ✓ exact |  |
| `g:z-popover` | 200 | `z-popover` | 200 | ✓ exact |  |
| `g:z-sticky` | 300 | `z-sticky` | 300 | ✓ exact |  |
| `g:z-toast` | 600 | `z-toast` | 600 | ✓ exact |  |
| `g:z-tooltip` | 700 | `z-tooltip` | 700 | ✓ exact |  |
| `g:duration-base` | 200 | `duration-base` | 200 | ✓ exact |  |
| `g:duration-fast` | 150 | `duration-fast` | 150 | ✓ exact |  |
| `g:duration-slow` | 300 | `duration-slow` | 300 | ✓ exact |  |
| `g:easing-enter` | cubic-bezier(0, 0, 0.2, 1) | `easing-enter` | cubic-bezier(0, 0, 0.2, 1) | ✓ exact |  |
| `g:easing-exit` | cubic-bezier(0.4, 0, 1, 1) | `easing-exit` | cubic-bezier(0.4, 0, 1, 1) | ✓ exact |  |
| `g:easing-standard` | cubic-bezier(0.2, 0, 0, 1) | `easing-standard` | cubic-bezier(0.2, 0, 0, 1) | ✓ exact |  |

### `g:` other (24)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `g:chart-categorical/color-06` | #38BDF8 / #84D2F7 | `prim-sky-250` | #38BDF8 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-07` | #2DD4BF / #84E6CC | `chart-categorical/color-07` | #2DD4BF / #84E6CC | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-08` | #A78BFA / #C7BAF7 | `chart-categorical/color-08` | #A78BFA / #C7BAF7 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-09` | #C026D3 / #DB74E6 | `chart-categorical/color-09` | #C026D3 / #DB74E6 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-10` | #E73CAE / #F485BE | `chart-categorical/color-10` | #E73CAE / #F485BE | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-11` | #E879A8 / #E89FB0 | `chart-categorical/color-11` | #E879A8 / #E89FB0 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-12` | #92400E / #CE7E5B | `chart-categorical/color-12` | #92400E / #CE7E5B | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-13` | #FB923C / #F0985A | `chart-categorical/color-13` | #FB923C / #F0985A | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-14` | #CA8A04 / #D9A02E | `chart-categorical/color-14` | #CA8A04 / #D9A02E | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-15` | #FACC15 / #F3DE6F | `chart-categorical/color-15` | #FACC15 / #F3DE6F | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-100` | #EBF0FE | `sem-btnPrimaryInvertedBgHover` | #EBF0FE / #22314F | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-200` | #C8D6FD / #2952CC | `sem-btnPrimaryBgDisabled` | #C8D6FD / #152354 | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-300` | #A5BCFC / #3A6AF8 | `sem-btnPrimaryInvertedTextDisabled` | #A5BCFC / #2952CC | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-400` | #7094FB / #5A82F9 | `sem-chatVoiceWaveform` | #7094FB / #9BB3FC | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-500` | #5A82F9 / #7094FB | `prim-blue-500` | #5A82F9 / #7094FB | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-600` | #3A6AF8 / #A5BCFC | `sem-text-action` | #3A6AF8 / #7094FB | ? by value | matched by light value only; confirm role |
| `g:chart-sequential/seq-700` | #2952CC / #C8D6FD | `sem-btnPrimaryBgHover` | #2952CC / #9BB3FC | ? by value | matched by light value only; confirm role |
| `g:chart-threshold` | #FA7720 / #FB923C | `prim-orange-500` | #FA7720 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-05` | #0F766E / #4FC0A6 | `chart-categorical/color-05` | #0F766E / #4FC0A6 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-04` | #3B82F6 / #7AA0F5 | `chart-categorical/color-04` | #3B82F6 / #7AA0F5 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-03` | #312E81 / #8480D9 | `chart-categorical/color-03` | #312E81 / #8480D9 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-02` | #06B6D4 / #5FD3E6 | `chart-categorical/color-02` | #06B6D4 / #5FD3E6 | ? by value | matched by light value only; confirm role |
| `g:chart-categorical/color-01` | #8951F0 / #B198F0 | `chart-categorical/color-01` | #8951F0 / #B198F0 | ? by value | matched by light value only; confirm role |
| `g:TEST! primary-base` | 14 | — | — | ✗ no equivalent | junk test variable (themed by Typography axis) — safe to delete at the source |

### Legacy alias namespaces (`y:`, `Q:`, `G:`, `e:`, `k:`, `O:`, misc) (117)

| Old token | Old value (light / dark) | Hemlock target | Target value (light / dark) | Status | Note |
|---|---|---|---|---|---|
| `y:spacing-md` | 24 | `spacing-md` | 24 | ✓ exact |  |
| `y:typo-primary-4xl-font-size` | 48 | `text-size-4xl` | 48 | ✓ exact |  |
| `G:radius.lg` | 8 | `radius-lg` | 32 | ~ role match | value updated by design: 8 vs 32 |
| `G:font.size.xs` | 10 | — | — | ✗ no equivalent |  |
| `G:data.positive` | #15803D / #4ADE80 | — | — | ✗ no equivalent |  |
| `G:green.700` | #15803D | `prim-green-700` | #0B461E | ~ role match | value updated by design: #15803D vs #0B461E |
| `G:green.400` | #4ADE80 | `prim-green-400` | #1EBF51 | ~ role match | value updated by design: #4ADE80 vs #1EBF51 |
| `G:accent.default` | #3A6AF8 / #7094FB | `sem-text-action` | #3A6AF8 / #7094FB | ? by value | matched by light value only; confirm role |
| `G:blue.600` | #3A6AF8 | `prim-blue-600` | #3A6AF8 | ✓ exact |  |
| `G:blue.500` | #7094FB | `prim-blue-500` | #5A82F9 / #7094FB | ~ role match | value updated by design: #7094FB vs #5A82F9 / #7094FB |
| `y:colors-borders-light` | #EEEDEB | `sem-borders-light` | #EEEDEB / #131E34 | ◐ light matches | dark differs: #EEEDEB vs #131E34 |
| `y:color-gray-100` | #EEEDEB | `prim-gray-100` | #EEEDEB | ✓ exact |  |
| `y:shadow-sm-y` | 1 | `shadow-sm-y` | 1 | ✓ exact |  |
| `y:shadow-sm-color` | #00000014 | `prim-shadow-sm-color` | #00000014 / #00000047 | ◐ light matches | dark differs: #00000014 vs #00000047 |
| `y:shadow-sm-blur` | 2 | `shadow-sm-blur` | 2 | ✓ exact |  |
| `y:spacing-xs` | 12 | `spacing-xs` | 12 | ✓ exact |  |
| `y:colors-text-header` | #0E0E0E | `sem-text-header` | #0E0E0E / #D8E1F0 | ◐ light matches | dark differs: #0E0E0E vs #D8E1F0 |
| `y:color-gray-900` | #0E0E0E | `prim-gray-900` | #0E0E0E | ✓ exact |  |
| `y:colors-icons-full` | #0E0E0E | `sem-icons-full` | #0E0E0E / #D8E1F0 | ◐ light matches | dark differs: #0E0E0E vs #D8E1F0 |
| `y:spacing-3xs` | 4 | `spacing-3xs` | 4 | ✓ exact |  |
| `y:colors-text-meta` | #5E5954 | `sem-text-meta` | #5E5954 / #889CBF | ◐ light matches | dark differs: #5E5954 vs #889CBF |
| `y:color-gray-600` | #5E5954 | `prim-gray-600` | #5E5954 | ✓ exact |  |
| `y:typo-primary-xl-semibold-font-size` | 24 | `text-size-xl` | 24 | ✓ exact |  |
| `y:typo-primary-xl-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-xl-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:spacing-4xs` | 2 | `spacing-4xs` | 2 | ✓ exact |  |
| `y:colors-text-body` | #403D3A | `sem-text-body` | #403D3A / #B3C1DB | ◐ light matches | dark differs: #403D3A vs #B3C1DB |
| `y:color-gray-700` | #403D3A | `prim-gray-700` | #403D3A | ✓ exact |  |
| `y:typo-primary-sm-semibold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `y:typo-primary-sm-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-sm-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:typo-primary-sm-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-sm-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:colors-background-surface` | #FFFFFF | `sem-background-surface` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #FFFFFF vs #1C2943 |
| `y:color-base-white` | #FFFFFF | `prim-base-white` | #FFFFFF | ✓ exact |  |
| `y:radius-xs` | 12 | `radius-xs` | 12 | ✓ exact |  |
| `y:typo-primary-base-semibold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `y:typo-primary-base-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-base-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:typo-primary-xs-semibold-font-size` | 12 | `text-size-xs` | 12 | ✓ exact |  |
| `y:typo-primary-xs-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:spacing-2xs` | 8 | `spacing-2xs` | 8 | ✓ exact |  |
| `y:spacing-sm` | 16 | `spacing-sm` | 16 | ✓ exact |  |
| `y:typo-primary-2xs-regular-font-size` | 11 | `text-size-2xs` | 11 | ✓ exact |  |
| `y:typo-primary-2xs-regular-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-2xs-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:typo-primary-md-semibold-font-size` | 18 | `text-size-md` | 18 | ✓ exact |  |
| `y:typo-primary-md-semibold-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `y:typo-primary-md-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:radius-2xs` | 8 | `radius-2xs` | 8 | ✓ exact |  |
| `y:typo-primary-sm-regular-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `y:color-green-50` | #E9FFF0 | `prim-green-50` | #E9FFF0 | ✓ exact |  |
| `y:colors-text-deposit` | #148338 | `sem-text-deposit` | #148338 / #74D791 | ◐ light matches | dark differs: #148338 vs #74D791 |
| `y:color-green-500` | #148338 | `prim-green-500` | #148338 | ✓ exact |  |
| `Q:colors-btnPrimaryInvertedBg` | #F8F7F6 | `sem-btnPrimaryInvertedBg` | #FFFFFF / #18223A | ~ role match | value updated by design: #F8F7F6 vs #FFFFFF / #18223A |
| `Q:color-gray-50` | #F8F7F6 | `prim-gray-50` | #F8F7F6 | ✓ exact |  |
| `Q:colors-borders-dark` | #D5D3D0 | `sem-borders-dark` | #DCD8CB / #22314F | ~ role match | value updated by design: #D5D3D0 vs #DCD8CB / #22314F |
| `Q:color-gray-200` | #D5D3D0 | `prim-gray-200` | #D5D3D0 | ✓ exact |  |
| `Q:radius-full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `Q:spacing-2xs` | 8 | `spacing-2xs` | 8 | ✓ exact |  |
| `Q:colors-btnPrimaryInvertedText` | #403D3A | `sem-btnPrimaryInvertedText` | #3A6AF8 / #9BB3FC | ~ role match | value updated by design: #403D3A vs #3A6AF8 / #9BB3FC |
| `Q:color-gray-700` | #403D3A | `prim-gray-700` | #403D3A | ✓ exact |  |
| `Q:typo-primary-base-letter-spacing` | 0 | — | — | ✗ no equivalent |  |
| `Q:typo-primary-base-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:color-blue-600` | #3A6AF8 | `prim-blue-600` | #3A6AF8 | ✓ exact |  |
| `G:radius-full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `y:colors-text-reverse` | #FFFFFF | `sem-text-reverse` | #FFFFFF / #0E0E0E | ◐ light matches | dark differs: #FFFFFF vs #0E0E0E |
| `y:typo-primary-base-regular-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `y:font-family-primary` | Heebo | — | — | ✗ no equivalent |  |
| `y:colors-icons-reverse` | #FFFFFF | `sem-icons-reverse` | #FFFFFF | ✓ exact |  |
| `y:typo-primary-sm-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `G:base.canvas` | #FFFFFF / #0E0E0E | `sem-background-surface` | #FFFFFF / #1C2943 | ? by value | matched by light value only; confirm role |
| `G:radius.full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `G:chart.cat.5` | #0F766E / #14B8A6 | `chart-categorical/color-05` | #0F766E / #4FC0A6 | ? by value | matched by light value only; confirm role |
| `G:data.negative` | #B91C1C / #F87171 | — | — | ✗ no equivalent |  |
| `G:red.700` | #B91C1C | `prim-red-700` | #961A18 | ~ role match | value updated by design: #B91C1C vs #961A18 |
| `G:red.400` | #F87171 | `prim-red-400` | #FB5653 | ~ role match | value updated by design: #F87171 vs #FB5653 |
| `G:chart.cat.2` | #06B6D4 | `chart-categorical/color-02` | #06B6D4 / #5FD3E6 | ? by value | matched by light value only; confirm role |
| `G:text.primary` | #0E0E0E / #F7F7F8 | `sem-borders-focus` | #0E0E0E / #7094FB | ? by value | matched by light value only; confirm role |
| `G:gray.900` | #0E0E0E / #F7F7F8 | `prim-gray-900` | #0E0E0E | ◐ light matches | dark differs: #F7F7F8 vs #0E0E0E |
| `G:font.primary` | Heebo | — | — | ✗ no equivalent |  |
| `G:text.tertiary` | #6C6C70 / #8E8E93 | — | — | ✗ no equivalent |  |
| `G:gray.500` | #6C6C70 / #8E8E93 | `prim-gray-500` | #716E6A | ~ role match | value updated by design: #6C6C70 / #8E8E93 vs #716E6A |
| `G:font.size.sm` | 12 | — | — | ✗ no equivalent |  |
| `G:text.secondary` | #535356 / #AEAEB2 | — | — | ✗ no equivalent |  |
| `G:gray.600` | #535356 / #AEAEB2 | `prim-gray-600` | #5E5954 | ~ role match | value updated by design: #535356 / #AEAEB2 vs #5E5954 |
| `G:border.primary` | #E8E8EA / #535356 | — | — | ✗ no equivalent |  |
| `G:gray.100` | #E8E8EA / #1A1A1A | `prim-gray-100` | #EEEDEB | ~ role match | value updated by design: #E8E8EA / #1A1A1A vs #EEEDEB |
| `G:gray.300` | #AEAEB2 / #535356 | `prim-gray-300` | #B5B1AB | ~ role match | value updated by design: #AEAEB2 / #535356 vs #B5B1AB |
| `G:font.size.md` | 14 | — | — | ✗ no equivalent |  |
| `O:spacing-3xs` | 4 | `spacing-3xs` | 4 | ✓ exact |  |
| `e:colors-background-surface` | #FFFFFF | `sem-background-surface` | #FFFFFF / #1C2943 | ◐ light matches | dark differs: #FFFFFF vs #1C2943 |
| `e:colors-borders-light` | #EEEDEB | `sem-borders-light` | #EEEDEB / #131E34 | ◐ light matches | dark differs: #EEEDEB vs #131E34 |
| `e:radius-sm` | 16 | `radius-sm` | 16 | ✓ exact |  |
| `e:spacing-xs` | 12 | `spacing-xs` | 12 | ✓ exact |  |
| `e:spacing-md` | 24 | `spacing-md` | 24 | ✓ exact |  |
| `e:colors-text-header` | #0E0E0E | `sem-text-header` | #0E0E0E / #D8E1F0 | ◐ light matches | dark differs: #0E0E0E vs #D8E1F0 |
| `e:typo-primary-base-semibold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `e:typo-primary-base-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `e:colors-text-meta` | #5E5954 | `sem-text-meta` | #5E5954 / #889CBF | ◐ light matches | dark differs: #5E5954 vs #889CBF |
| `e:typo-primary-sm-regular-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `e:typo-primary-sm-regular-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `e:spacing-2xs` | 8 | `spacing-2xs` | 8 | ✓ exact |  |
| `e:radius-full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `e:spacing-sm` | 16 | `spacing-sm` | 16 | ✓ exact |  |
| `e:typo-primary-sm-semibold-font-size` | 14 | `text-size-sm` | 14 | ✓ exact |  |
| `e:typo-primary-sm-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `y:color-taupe-100` | #F7F5F0 | `prim-taupe-100` | #F7F5F0 | ✓ exact |  |
| `O:spacing-2xs` | 8 | `spacing-2xs` | 8 | ✓ exact |  |
| `k:colors-btnSecondaryBg` | #00000000 | `sem-btnSecondaryBg` | #00000000 | ✓ exact |  |
| `k:radius-full` | 9999 | `radius-full` | 9999 | ✓ exact |  |
| `k:color-blue-600` | #3A6AF8 | `prim-blue-600` | #3A6AF8 | ✓ exact |  |
| `8:spacing-xs` | 12 | `spacing-xs` | 12 | ✓ exact |  |
| `k:typo-primary-base-semibold-font-size` | 16 | `text-size-base` | 16 | ✓ exact |  |
| `k:typo-primary-sm-semibold-font-family` | Heebo | `font-primary` | Heebo | ✓ exact |  |
| `color` | #F7F5F0 / #101729 | `sem-background-main` | #F7F5F0 / #101729 | ? by value | matched by light value only; confirm role |
| `color-2` | #DCD8CB / #000000 | `sem-borders-dark` | #DCD8CB / #22314F | ? by value | matched by light value only; confirm role |

---

## Resolution — migration executed (2026-08-20)

The migration this map was drafted for has been **completed**:

- `chat-nav-refresh.pen` no longer defines any local variables or theme axes. All 296 color/radius/font binding sites reference `hemlock-library.lib.pen` tokens (`g:` import). Light-mode rendering verified 1:1 against the pre-migration baseline.
- `chat-ui.lib.pen` import was removed (it had zero live usages).
- Local palette swatch rows were relabeled to `prim-blue-*` and bound to Hemlock primitives; hard values unchanged.
- `sem-chatShadow` **light** value was corrected in Hemlock to `#2D292628` (was transparent), matching the original chat/nav input shadow.

### Tokens minted in Hemlock during execution (21)

| New token | Light | Dark |
|---|---|---|
| `sem-chatVoiceIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` |
| `sem-chatVoiceHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` |
| `sem-chatVoicePressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` |
| `sem-chatVoicePressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` |
| `sem-chatVoiceBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` |
| `sem-chatCloseIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` |
| `sem-chatCloseBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` |
| `sem-chatClosePressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` |
| `sem-chatStopBg` | `$sem-btnPrimaryBg` → `#3a6af8` | `$sem-btnPrimaryBg` → `#5A82F9` |
| `sem-chatStopBgHover` | `$sem-btnPrimaryBgHover` → `#2952cc` | `$sem-btnPrimaryBgHover` → `#7094FB` |
| `sem-chatStopBgPressed` | `$sem-btnPrimaryBgActive` → `#163196` | `$sem-btnPrimaryBgActive` → `#3A6AF8` |
| `sem-chatStopIcon` | `$sem-btnPrimaryText` → `#ffffff` | `$sem-btnPrimaryText` → `#000000` |
| `sem-chatInputBorderRecording` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` |
| `sem-chatRecordingDot` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-500` → `#5A82F9` |
| `sem-chatBubbleAi` | `#FFFFFF00` → `#FFFFFF00` | `#FFFFFF00` → `#FFFFFF00` |
| `sem-chatBubbleUserBorder` | `$prim-taupe-350` → `#DCD8CB` | `#00000000` → `#00000000` |
| `sem-tagBorder` | `$prim-blue-300` → `#a5bcfc` | `$prim-navy-50` → `#33476E` |
| `sem-navSettingsIcon` | `$prim-blue-600` → `#3a6af8` | `$prim-blue-400` → `#7094FB` |
| `sem-navSettingsHoverBg` | `$prim-blue-100` → `#ebf0fe` | `$prim-navy-500` → `#172642` |
| `sem-navSettingsPressedBg` | `$prim-blue-200` → `#c8d6fd` | `$prim-navy-400` → `#202C4E` |
| `sem-navSettingsPressedIcon` | `$prim-blue-700` → `#2952cc` | `$prim-blue-300` → `#A5BCFC` |

### Gap dispositions

- **12px radius** (`chat.radius`, `chat.bubble.radius`, `chat.input.radius`) → `radius-xs` (12px) — the final Hemlock radius scale includes it. 24px chip radius → `radius-md`.
- **Fonts** (`font.primary`, `font-family-*`) → `font-primary` (Heebo) / `font-secondary` (Noto Serif).
- **Granular typography** (`typo-*-font-weight`, `typo-*-letter-spacing`) → intentionally **not tokenized**. Hemlock exposes `text-size-*` and `line-height-*`; weights and letter-spacing are set per text style in the design. The old `g:typo-*` imports were removed with the migration.
- **AI bubble transparent bg** (`chat.bubble.ai.bg`) → `sem-chatBubbleAi` (transparent in both modes), minted so the role stays explicit for gen-UI/front-end implementers.
- **Legacy alias namespaces** (`y:`, `Q:`, `G:`, `e:`, `k:`, `O:`, `p:`) → all removed; nothing binds to them anymore.
