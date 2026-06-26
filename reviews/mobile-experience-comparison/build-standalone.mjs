#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = '/Users/amanda/Evergreen Cursor Project/design-specs/reviews/mobile-experience-comparison';

function flattenDesignPngs() {
  const designDir = path.join(dir, 'assets/design');
  if (!fs.existsSync(designDir)) return;
  const pyPath = path.join(dir, '.flatten-design-pngs.py');
  fs.writeFileSync(
    pyPath,
    `from pathlib import Path
from PIL import Image
for p in Path(${JSON.stringify(designDir)}).glob("*.png"):
    img = Image.open(p).convert("RGBA")
    white = Image.new("RGBA", img.size, (255, 255, 255, 255))
    white.paste(img, mask=img.split()[3])
    white.convert("RGB").save(p)
`,
  );
  try {
    execSync(`python3 "${pyPath}"`, { stdio: 'pipe' });
  } catch {
    console.warn('Warning: could not flatten design PNGs onto white (pip install Pillow)');
  }
}

flattenDesignPngs();

function embed(rel) {
  const full = path.join(dir, rel);
  if (!fs.existsSync(full)) return null;
  const buf = fs.readFileSync(full);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function requireEmbed(rel) {
  const data = embed(rel);
  if (!data) throw new Error(`Missing required asset: ${rel}`);
  return data;
}

const images = {
  designConversation: requireEmbed('assets/design/k8DxI.png'),
  designEmpty: requireEmbed('assets/design/LCYKi.png'),
  designError: requireEmbed('assets/design/EpRMp.png'),
  designHeader: requireEmbed('assets/design/dZHCb.png'),
  designInput: requireEmbed('assets/design/TdYxI.png'),
  designUserMessage: requireEmbed('assets/design/uTENT.png'),
  designAiMessage: requireEmbed('assets/design/Dvxep.png'),
  designNavPanel: requireEmbed('assets/design/wTMEm.png'),
  designThinking: requireEmbed('assets/design/qpDy0.png'),
  designLogin: requireEmbed('assets/design/login-page-design.png'),
  devConversationTop: requireEmbed('assets/dev/conversation-top.png'),
  devConversationScrolled: requireEmbed('assets/dev/conversation-scrolled.png'),
  devEmptyState: requireEmbed('assets/dev/empty-state.png'),
  devLoginWelcome: requireEmbed('assets/dev/login-welcome-mobile.png'),
  devLoginEmpty: requireEmbed('assets/dev/login-empty-input.png'),
  devNavSidebar: requireEmbed('assets/dev/nav-sidebar-collapsed.png'),
  devThinking1: requireEmbed('assets/dev/thinking-state-duplicated.png'),
  devThinking2: requireEmbed('assets/dev/thinking-state-duplicated-2.png'),
};

// Design tokens from chat-ui.lib.pen
const T = {
  'chat.bg': '#F7F5F0',
  'chat.border': '#DCD8CB',
  'chat.radius': '12px',
  'chat.shadow': '0 2px 28px 2px #2D292628',
  'chat.divider': '#E8E6E0',
  'chat.text.primary': '#2D2926',
  'chat.text.secondary': '#5E5954',
  'chat.text.placeholder': '#A8A49E',
  'chat.bubble.user.bg': '#F7F5F0',
  'chat.bubble.user.border': '#DCD8CB',
  'chat.bubble.radius': '12px',
  'chat.bubble.ai.bg': 'transparent (#FFFFFF00)',
  'chat.input.bg': '#FFFFFF',
  'chat.input.border': '#E8E6E0',
  'chat.input.border.active': '#C0BAB2',
  'chat.input.radius': '12px',
  'chat.send.bg': '#3C3C3C',
  'chat.send.bg.disabled': '#D4D1CA',
  'chat.send.bg.hover': '#4F4F4F',
  'chat.send.bg.pressed': '#2A2A2A',
  'chat.send.icon': '#FFFFFF',
  'chat.icon': '#5E5954',
  'chat.chip.bg': '#F7F5F0',
  'chat.chip.border': '#DCD8CB',
  'chat.chip.radius': '24px',
  'chat.chip.hover.bg': '#EDEAE3',
  'chat.chip.pressed.bg': '#E3DFD6',
  'chat.close.hover.bg': '#EDEAE3',
  'chat.close.pressed.bg': '#E3DFD6',
  'chat.voice.active.bg': '#3A6AF8',
  'chat.voice.active.icon': '#FFFFFF',
  'chat.voice.cancel.icon': '#8A8680',
  'chat.voice.pulse': '#3A6AF828',
  'chat.voice.timer': '#5E5954',
  'chat.voice.waveform': '#7094FB',
};

// ------- Comparison data -------

const panelShellRows = [
  ['Panel background', '$chat.bg (→ $nav.bg → #F7F5F0)', 'bg-taupe-100 — uses Tailwind token class ✓', '—', 'Match'],
  ['Panel border', '$chat.border (→ 1px solid #DCD8CB)', 'border-[#DCD8CB] — hard-coded hex instead of token class', 'Use semantic border class mapped to $chat.border token. Hard-coded value will drift if token changes.', 'Gap'],
  ['Panel corner radius', '$chat.radius (→ 12px)', 'rounded-xl = 12px (inner); 0px on outer wrapper at mobile full-width', 'Uses Tailwind scale class ✓ — mobile full-width with rounded-none is acceptable', 'Match'],
  ['Panel shadow', '$chat.shadow (→ 0 2px 28px 2px rgba(45,41,38,0.157))', 'shadow-[0_2px_28px_2px_rgba(45,41,38,0.16)] — hard-coded arbitrary value', 'Use semantic shadow class mapped to $chat.shadow token. Hard-coded value will drift if token changes.', 'Gap'],
  ['Panel width (mobile)', '360px (design artboard)', '390px (fills viewport) — correct responsive behavior', '—', 'Match'],
  ['Panel height', '844px (design artboard)', '907px (fills viewport height) — correct responsive behavior', '—', 'Match'],
  ['Panel layout', 'vertical, justify: space-between, clip: true', 'flex flex-col, overflow-hidden — semantic utilities ✓', '—', 'Match'],
];

const headerRows = [
  ['Header background', '$chat.bg (→ #F7F5F0 taupe, inherited from panel)', 'Verify — must be taupe (#F7F5F0), not white (#FFFFFF)', 'If header has bg-white or background: #fff, change to inherit panel bg or use bg-taupe-100', 'Verify'],
  ['Header padding', '$spacing-sm (16px) vertical, 20px horizontal', 'py-4 px-5 — uses Tailwind spacing scale ✓', '—', 'Match'],
  ['Header border-bottom', '$chat.divider (→ 0.5px solid #E8E6E0)', '0.5px solid #E8E6E0 — verify if class uses token or inline/arbitrary', 'Confirm border-color references $chat.divider token, not hard-coded hex', 'Verify'],
  ['Header layout', 'flex, space-between, align-items: center', 'flex items-center justify-between — semantic utilities ✓', '—', 'Match'],
  ['Header title font', 'Noto Serif 16px/400 (regular)', 'typo-secondary-base-regular — uses typography token class ✓', '—', 'Match'],
  ['Header title color', '$chat.text.primary (→ #2D2926)', 'text-[#2D2926] — hard-coded hex instead of token class', 'Use semantic text color class mapped to $chat.text.primary. Hard-coded value will drift if token changes.', 'Gap'],
  ['Close button size', '28×28px', 'w-7 h-7 — uses Tailwind spacing scale ✓', '—', 'Match'],
  ['Close button radius', '6px', 'rounded-[6px] — hard-coded arbitrary value', 'Define a token-based radius utility or use closest scale value (rounded-md = 6px if configured)', 'Gap'],
  ['Close button icon color', '$chat.icon (→ $nav.text.secondary → #5E5954)', 'text-gray-600 — uses Tailwind color scale ✓', '—', 'Match'],
  ['Close button hover bg', '$chat.close.hover.bg (→ #EDEAE3)', 'hover:bg-taupe-200 — uses Tailwind color token ✓', '—', 'Match'],
  ['Close button pressed bg', '$chat.close.pressed.bg (→ #E3DFD6)', 'active:bg-taupe-300 — uses Tailwind color token ✓', '—', 'Match'],
];

const messagesAreaRows = [
  ['Messages container gap', '$spacing-sm (16px)', 'gap: 14px (matches design artboard; confirm token vs hard-coded)', 'Use $spacing-sm (16px) token for message spacing; confirm dev references the token, not arbitrary [14px]', 'Verify'],
  ['Messages container padding', '$spacing-sm (16px) vertical, 20px horizontal', 'padding: 16px 20px — check token usage (p-4 px-5 or hard-coded)', 'Confirm padding uses Tailwind spacing utilities, not arbitrary values', 'Verify'],
  ['Messages layout', 'vertical, justify: end (messages anchor to bottom)', 'flex-col justify-end — semantic utilities ✓', '—', 'Match'],
  ['Messages scroll', 'Scrollable area between header and input', 'overflow-y-auto — semantic utility ✓', '—', 'Match'],
];

const userMessageRows = [
  ['User bubble background', '$chat.bubble.user.bg (→ $nav.bg → #F7F5F0)', 'bg: rgb(247,245,240) — verify if class uses token (bg-taupe-100) or hard-coded', 'Confirm uses bg-taupe-100 or semantic class, not arbitrary bg-[#F7F5F0]', 'Verify'],
  ['User bubble border', '$chat.bubble.user.border (→ #DCD8CB)', 'border: 1px solid rgb(220,216,203) — verify if class uses token or hard-coded [#hex]', 'Should use border-color token class, not arbitrary border-[#DCD8CB]', 'Verify'],
  ['User bubble corner radius', '$chat.bubble.radius (→ 12px)', 'border-radius: 12px — verify if using rounded-xl (token scale) or [12px]', 'Should use rounded-xl from Tailwind scale, not arbitrary rounded-[12px]', 'Verify'],
  ['User bubble padding', '$spacing-xs (12px) vertical, $spacing-sm (16px) horizontal', 'padding: 12px 16px — check uses py-3 px-4 (scale) or arbitrary', 'Should use Tailwind spacing scale utilities', 'Verify'],
  ['User bubble max-width', '80% of container', 'max-width: 80%', '—', 'Match'],
  ['User bubble alignment', 'Right-aligned (pushed to right edge)', 'margin-left: auto — semantic utility ✓', '—', 'Match'],
  ['User message font', 'Heebo 14px/400', 'font: 14px/22.4px Heebo, weight 400 — verify uses typography token class', 'Should use typo-* utility if available, not raw font-size/weight', 'Verify'],
  ['User message color', '$chat.text.secondary (→ #5E5954)', 'color: rgb(94,89,84) — verify if class uses token (text-gray-600) or hard-coded', 'Should use semantic text color class mapped to $chat.text.secondary', 'Verify'],
  ['User message line-height', '1.6 (22.4px at 14px)', 'line-height: 22.4px — should come from typography token', '—', 'Match'],
  ['User bubble token usage', 'Bubble styled via Hemlock tokens (semantic Tailwind classes)', 'Element uses CopilotKit classes (.copilotKitUserMessage) — no Tailwind token classes on bubble itself. Computed values match design exactly (bg #F7F5F0, border #DCD8CB, 12px radius, 12/16 padding, #5E5954 text) but token backing unconfirmed in CSS source.', 'Confirm the .copilotKitUserMessage CSS rule references Hemlock tokens (e.g. $chat.bubble.user.*) and not hard-coded hex values', 'Verify'],
  ['User bubble bottom margin', '$spacing-sm (16px)', 'margin-bottom: 8px — wrong value (should be $spacing-sm 16px) AND likely hard-coded', 'Use $spacing-sm (16px) token for message spacing. Current 8px is the same gap discrepancy seen on AI messages.', 'Gap'],
];

const aiMessageRows = [
  ['AI message background', '$chat.bubble.ai.bg (→ transparent)', 'background: transparent — correct', '—', 'Match'],
  ['AI message border', 'None (transparent bubble)', 'border: 0px none — correct', '—', 'Match'],
  ['AI message max-width', '100% of container', 'max-width: 100% — correct', '—', 'Match'],
  ['AI message font', 'Heebo 14px/400', 'font: 14px/22.4px Heebo — verify uses typography token class', 'Should use typo-* utility if available', 'Verify'],
  ['AI message color', '$chat.text.primary (→ #2D2926)', 'color: rgb(45,41,38) — verify if class uses token (text-taupe-900) or hard-coded [#hex]', 'Should use semantic text color class mapped to $chat.text.primary', 'Verify'],
  ['AI message line-height', '1.6 (22.4px at 14px)', 'line-height: 22.4px — should come from typography token', '—', 'Match'],
  ['AI message padding', '0px (no bubble padding)', 'padding: 0px — correct', '—', 'Match'],
  ['AI message margin-bottom', '$spacing-sm (16px)', 'margin: 0 0 8px — 8px instead of $spacing-sm (16px)', 'Use $spacing-sm (16px) token for message spacing. Current 8px is wrong value AND likely hard-coded.', 'Gap'],
];

const inputFieldRows = [
  ['Input area padding', '20px', 'px-5 py-5 — uses Tailwind spacing scale ✓', '—', 'Match'],
  ['Input field background', '$chat.input.bg (→ #FFFFFF)', 'bg-white — uses Tailwind color token ✓', '—', 'Match'],
  ['Input field border color', '$chat.input.border (→ #E8E6E0)', 'border-[#e8e6e0] — hard-coded hex instead of token class', 'Use semantic border class mapped to $chat.input.border token', 'Gap'],
  ['Input field border width', '1.5px', 'border-[1.5px] — hard-coded arbitrary width', 'Define border-width token in Tailwind config or use closest scale value', 'Gap'],
  ['Input field corner radius', '$chat.input.radius (→ 12px)', 'rounded-xl — uses Tailwind radius scale ✓', '—', 'Match'],
  ['Input field internal gap', '$spacing-sm (16px)', 'gap-4 — uses Tailwind spacing scale ✓', '—', 'Match'],
  ['Textarea font', 'Heebo 14px/400', 'font: 14px Heebo, weight 400 — verify uses typography token class', 'Should use typo-* utility if available', 'Verify'],
  ['Textarea color', '$chat.text.primary (→ #2D2926)', 'color: #2D2926 — verify if class uses token or hard-coded [#hex]', 'Should use semantic text color class mapped to $chat.text.primary', 'Verify'],
  ['Placeholder text', '"Ask me any financial question..."', '"Ask me any financial question..." — correct', '—', 'Match'],
  ['Placeholder color', '$chat.text.placeholder (→ #A8A49E)', 'placeholder:text-[#A8A49E] — hard-coded hex instead of token class', 'Use semantic placeholder color class mapped to $chat.text.placeholder token', 'Gap'],
];

const sendButtonRows = [
  ['Send button size', '34×34px (circular)', 'w: 34px, h: 34px — verify uses token class (w-[34px] is hard-coded)', 'Should use a named size token if available, not arbitrary [34px]', 'Verify'],
  ['Send button shape', 'Circle (border-radius: 50%)', 'rounded-full — uses Tailwind scale ✓', '—', 'Match'],
  ['Send button bg (enabled)', '$chat.send.bg (→ #3C3C3C)', 'Verify — need enabled state to inspect. Must use token class, not bg-[#3C3C3C]', 'Must use semantic class mapped to $chat.send.bg, not hard-coded hex', 'Verify'],
  ['Send button bg (disabled)', '$chat.send.bg.disabled (→ #D4D1CA)', 'bg: #E3DFD6 — WRONG value AND likely hard-coded', 'Wrong value (#E3DFD6 vs #D4D1CA) AND must use token class mapped to $chat.send.bg.disabled', 'Gap'],
  ['Send button bg (hover)', '$chat.send.bg.hover (→ #4F4F4F)', 'Verify — requires enabled state. Must use token class, not hover:bg-[#4F4F4F]', 'Must use semantic hover class mapped to $chat.send.bg.hover', 'Verify'],
  ['Send button bg (pressed)', '$chat.send.bg.pressed (→ #2A2A2A)', 'Verify — requires enabled + click. Must use token class, not active:bg-[#2A2A2A]', 'Must use semantic active class mapped to $chat.send.bg.pressed', 'Verify'],
  ['Send button icon color', '$chat.send.icon (→ #FFFFFF)', 'color: #FFFFFF — verify uses token class (text-white) not hard-coded', 'Should use text-white or semantic icon color class', 'Verify'],
  ['Send button icon glyph', 'lucide `arrow-up` icon (per chat-ui.lib.pen Chat / Send Button component)', 'Heroicons solid `arrow-up` (24px viewBox, fill=currentColor, path M11.47 2.47...). Wrong icon library — app standardizes on lucide, not Heroicons.', 'Replace with lucide `arrow-up`. Standardize on lucide for ALL app icons, not Heroicons.', 'Gap'],
  ['Send button border', 'None', 'border: 0px none — correct', '—', 'Match'],
];

const voiceButtonRows = [
  ['Voice button size', '34×34px (circular)', 'w: 34px, h: 34px — verify uses token class not arbitrary [34px]', 'Should use named size token if available', 'Verify'],
  ['Voice button shape', 'Circle (border-radius: 50%)', 'rounded-full — uses Tailwind scale ✓', '—', 'Match'],
  ['Voice button bg (default)', 'Transparent', 'bg: transparent — correct', '—', 'Match'],
  ['Voice button border', '$chat.border (→ 1px solid #DCD8CB)', 'border: 1px solid #DCD8CB — verify uses token class not hard-coded [#hex]', 'Should use semantic border class mapped to $chat.border token', 'Verify'],
  ['Voice button icon color', '$chat.icon (→ #5E5954)', 'color: #5E5954 — verify uses token class (text-gray-600) not [#hex]', 'Should use semantic class mapped to $chat.icon', 'Verify'],
  ['Voice button active bg', '$chat.voice.active.bg (→ #3A6AF8)', 'Verify — requires recording state. Must use token class not bg-[#3A6AF8]', 'Must use semantic class mapped to $chat.voice.active.bg', 'Verify'],
  ['Voice button active icon', '$chat.voice.active.icon (→ #FFFFFF)', 'Verify — requires recording state. Must use token class', 'Must use semantic class mapped to $chat.voice.active.icon', 'Verify'],
];

const promptChipRows = [
  ['Prompt chip background', '$chat.chip.bg (→ $nav.bg → #F7F5F0)', 'bg: #F7F5F0 — verify uses token class (bg-taupe-100) not hard-coded', 'Should use semantic class mapped to $chat.chip.bg', 'Verify'],
  ['Prompt chip border', '$chat.chip.border (→ #DCD8CB)', 'border: 1px solid #DCD8CB — verify uses token class not hard-coded [#hex]', 'Should use semantic border class mapped to $chat.chip.border', 'Verify'],
  ['Prompt chip corner radius', '$chat.chip.radius (→ 24px)', 'border-radius: 24px — verify uses rounded-3xl (token) or hard-coded [24px]', 'Should use rounded-3xl or semantic chip radius class', 'Verify'],
  ['Prompt chip font', 'Heebo 14px/400', 'font: Heebo 14px — verify uses typography token class', 'Should use typo-* utility if available', 'Verify'],
  ['Prompt chip color', '$chat.text.secondary (→ #5E5954)', 'color: #5E5954 — verify uses token class (text-gray-600) not [#hex]', 'Should use semantic class mapped to $chat.text.secondary', 'Verify'],
  ['Prompt chip padding', '$spacing-xs (12px) / $spacing-sm (16px)', 'padding: 12px 16px — check uses py-3 px-4 (scale) or hard-coded', 'Should use Tailwind spacing utilities from scale', 'Verify'],
  ['Prompt chip hover bg', '$chat.chip.hover.bg (→ #EDEAE3)', 'Verify — hover state. Must use token class (hover:bg-taupe-200)', 'Must use semantic hover class mapped to $chat.chip.hover.bg', 'Verify'],
  ['Prompt chip pressed bg', '$chat.chip.pressed.bg (→ #E3DFD6)', 'Verify — active state. Must use token class (active:bg-taupe-300)', 'Must use semantic active class mapped to $chat.chip.pressed.bg', 'Verify'],
];

const richContentRows = [
  ['Card grid layout on mobile', 'On mobile (390px), multi-column comparison grids should stack into a single column with each state as its own card', '4-5 columns shown side-by-side overflow the panel — "New Hampshire" text hard-cut, content inaccessible', 'Switch to single-column stacked layout on mobile. Each comparison item (Florida, Georgia, etc.) gets its own full-width card stacked vertically.', 'Gap'],
  ['No horizontal scroll indicator on card grids', 'Design does not address wide content overflow explicitly', 'Data table (State/Structure) has a ">" chevron indicating horizontal scroll, but card grid above has NO affordance', 'Apply same scroll affordance pattern (chevron or fade) to ALL horizontally-overflowing containers', 'Gap'],
  ['Inconsistent overflow handling', 'All content should handle overflow consistently', 'openui-table uses scroll indicator (">"); comparison cards just clip', 'Unify overflow behavior — all wide content should use the same scroll pattern with visible indicator', 'Gap'],
  ['Text truncation without ellipsis', 'Text should never hard-clip on mobile (per chat design principles)', '"New Hampshir" is hard-clipped at container edge — no ellipsis, no fade, no indication content continues', 'Prevent hard-clip: either wrap text, show ellipsis, or add scroll container', 'Gap'],
  ['AI heading typography', 'Headings should fit within 320px content width without issues', '"State Tax Code Comparison — 2026" heading fits but uses large bold text — acceptable', '—', 'Match'],
  ['AI paragraph text wrapping', 'Text wraps naturally within message width', 'Body text wraps correctly within container', '—', 'Match'],
  ['Data table (State/Structure) scroll', 'Table should be scrollable when wider than panel', 'Has ">" chevron affordance indicating horizontal scroll works', '—', 'Match'],
  ['Visible horizontal scrollbar on tables', 'Scrollbars should be hidden (use overflow-x: auto with scrollbar-width: none or ::-webkit-scrollbar { display: none })', 'Visible orange/tan scrollbar appears at bottom of table sections — looks out of place on mobile', 'Hide native scrollbar. Use CSS scrollbar-width: none and ::-webkit-scrollbar { display: none } while keeping overflow-x: auto for swipe gesture support', 'Gap'],
];

const navigationRows = [
  ['Nav sections default state', 'Nav / Section Header (expanded ∨) is default component. Nav / Panel shows all sections expanded with child items visible.', 'Sections default to COLLAPSED on both mobile and desktop — user must manually expand each section to see nav items', 'Set defaultOpen={true} or equivalent on all nav section accordions. The collapsed state (Nav / Section Header Collapsed) should only appear after user explicitly collapses.', 'Gap'],
];

const loginPageRows = [
  ['Continue button component', 'Hemlock component/Button (bMlax)', 'OpenUI button — classes `openui-button-base openui-button-base-primary openui-button-base-medium`. Not the Hemlock Button component.', 'Use Hemlock component/Button (bMlax) instead of openui-button-base. Per Hemlock design-system rule, use Hemlock components, not OpenUI equivalents.', 'Gap'],
  ['Continue button background', '$colors-btnPrimaryBg ($color-gray-900 → #0E0E0E)', 'rgb(60,60,60) = #3C3C3C — wrong color (this is the chat send-button color, not the Hemlock primary)', 'Use $colors-btnPrimaryBg (#0E0E0E). Current #3C3C3C is wrong.', 'Gap'],
  ['Continue button text color', '$colors-btnPrimaryText ($color-gray-100 → #EEEDEB)', 'rgb(255,255,255) = #FFFFFF — pure white, not the spec off-white #EEEDEB', 'Use $colors-btnPrimaryText (#EEEDEB). Current #FFFFFF is wrong.', 'Gap'],
  ['Continue button corner radius', '$radius-full (9999px, pill)', '9999px — matches', '—', 'Match'],
  ['Continue button font family', 'Heebo', '"Heebo Variable", sans-serif — correct', '—', 'Match'],
  ['Continue button font size', '16px', '14px — 2px smaller than spec', 'Use 16px per component/Button spec', 'Gap'],
  ['Continue button font weight', '600 (semibold)', '600 — matches', '—', 'Match'],
  ['Continue button height', '48px min-height ($spacing-2xl)', '46px — 2px short of spec (passes 44px touch target but not 48px)', 'Set min-height 48px per component/Button spec', 'Gap'],
  ['Continue button padding', '$spacing-xs (12px) / $spacing-md (24px)', '12px 24px — matches', '—', 'Match'],
  ['Continue button text alignment', 'Centered (justify-content: center, align-items: center)', 'Left-aligned — text sits at the left padding (offset 24px in a 326px-wide button; justify-content: normal). NOT centered.', 'Set justify-content: center so the label centers within the full-width button.', 'Gap'],
  ['Continue button width', 'Content-width or full-width in flow', 'w-full (326px) on mobile — acceptable responsive behavior', '—', 'Match'],
  ['Continue button disabled state (empty input)', 'Button is DISABLED when the email input is empty — design frame shows the disabled state (light grey button, no email entered)', 'Button stays ENABLED when input is empty — disabled=false, no disabled attribute, bg #3C3C3C (enabled color), cursor: pointer. Verified via real input clear (React state confirmed empty).', 'Disable the Continue button when the email input is empty. Use the Hemlock disabled state ($colors-btnPrimaryBgDisabled / $color-gray-200) so the button renders light grey and non-interactive until valid text is entered.', 'Gap'],
  ['Page scroll behavior', 'Login page content scrolls on device — legal/disclaimer text below the fold is reachable by scrolling. The static design frame shows the disclosure ending mid-paragraph because it extends past the viewport, but it is accessible via scroll.', 'Screen does NOT scroll at all — overflow: hidden on both <html> and <body>; scrollHeight (844) == clientHeight (844); canScroll=false. Footer disclosure text is literally cut off mid-sentence ("…Historical returns, expected" truncated) — user cannot reach the rest of the legal text.', 'Remove overflow: hidden; make the login page scrollable so all legal/disclaimer text is reachable. Design intends scroll; dev hard-locks the viewport.', 'Gap'],
  ['"Welcome to Evergreen" heading', 'Hemlock heading typography (verify token + weight)', '24px / weight 300 (light) / Heebo, color #000000 — weight 300 (light) may not match the Hemlock heading spec', 'Verify heading typography token; confirm weight 300 is intended (Hemlock heading may specify a heavier weight).', 'Verify'],
  ['Subheading ("Access your personalized…")', 'Hemlock secondary text token (verify)', '16px / weight 400 / color rgb(57,54,51) #393633 — verify against Hemlock text token', 'Verify subheading size/color against Hemlock typography tokens.', 'Verify'],
  ['Email input component', 'Hemlock component/Input', 'Native <input> with custom styling — not the Hemlock Input component', 'Use Hemlock component/Input; verify token usage.', 'Verify'],
  ['Email input border radius', 'Hemlock Input radius (verify token)', '4px — small; verify against Hemlock Input radius token', 'Verify input radius against Hemlock Input component spec.', 'Verify'],
  ['Email input border', 'Hemlock Input border token (verify)', '1px solid rgb(213,211,208) #D5D3D0 — verify against token', 'Verify border color references Hemlock token, not hard-coded.', 'Verify'],
  ['Email input height', 'Hemlock Input height (verify)', '46px — verify against Hemlock Input spec', 'Verify input height against Hemlock Input component spec.', 'Verify'],
  ['Phone link color', 'Hemlock link color token (verify)', 'rgb(58,106,248) #3A6AF8 — verify against Hemlock link token', 'Verify phone link color references Hemlock link token.', 'Verify'],
  ['Phone link underline', 'Link underline per Hemlock (verify)', 'text-decoration: none — not underlined (earlier render appeared underlined; verify state)', 'Verify link underline behavior against Hemlock link spec.', 'Verify'],
  ['Legal disclaimer accessibility', 'All legal/compliance text fully reachable via scroll', 'Disclaimer clipped by overflow:hidden — user cannot scroll to read full legal text (cut off mid-sentence)', 'Critical compliance issue — legal disclaimers must be fully accessible before Continue. Tied to the scroll gap above.', 'Gap'],
];

const panelStatesRows = [
  ['Empty state: centered prompt', '"Ask me any financial question..." centered in messages area', 'Noto Serif 20px/400, vertically centered — correct layout', '—', 'Match'],
  ['Empty state: prompt chips visible', 'Suggested questions shown below centered prompt text', 'Chip "What\'s a donor-advised fund?" visible below prompt — correct', '—', 'Match'],
  ['Empty state prompt font', 'Noto Serif 20px/400', 'typo-secondary-lg-regular — verify uses typography token class ✓', '—', 'Match'],
  ['Empty state prompt color', '$chat.text.primary (→ #2D2926)', 'color: #2D2926 — verify uses token class (text-taupe-900) not hard-coded [#hex]', 'Should use semantic class mapped to $chat.text.primary', 'Verify'],
  ['Error state: error bubble', 'Blue-tinted bubble with error message', 'Verify — requires triggering error state. Check token usage when visible.', '—', 'Verify'],
  ['Thinking status text: no duplication', 'Chat / Message / AI Thinking (p6LC4S): ONE set of dots + ONE status text line. When a new status arrives, it replaces the previous text — never stacks.', 'Multiple status text messages stacked/duplicated. "Formulating response..." appears 2× in sequence. "Checking current market price..." and "Fetching Apple\'s price history..." shown as separate lines simultaneously. The dots themselves are fine — it is the text lines that duplicate.', 'Only render ONE status text line below the dots. When a new status message arrives, REPLACE the previous text — do not stack multiple lines. The three-dot animation stays as-is.', 'Gap'],
  ['Thinking dots styling', 'Three dots in gray/taupe gradient (animated pulsing) — uses $chat.text.secondary tones', 'Dots appear in correct gray/taupe tones — matches design', '—', 'Match'],
  ['Thinking status text color', 'Status text in $chat.text.placeholder (→ #A8A49E) — light, secondary appearance', 'Status text in lighter color — appears correct', '—', 'Match'],
];

// ------- Build HTML -------

function statusClass(s) {
  if (s === 'Gap') return 'status-gap';
  if (s === 'Match') return 'status-match';
  return 'status-verify';
}

function compareSection(id, title, rows, opts = {}) {
  const { images: imgs } = opts;
  let imgHtml = '';
  if (imgs) {
    imgHtml = '<div class="screenshots">';
    if (imgs.design) {
      imgHtml += `<div class="screenshot-panel"><div class="panel-label design">Design</div><img src="${imgs.design}" alt="Design"></div>`;
    }
    if (imgs.dev) {
      const devImgs = Array.isArray(imgs.dev) ? imgs.dev : [imgs.dev];
      for (const d of devImgs) {
        imgHtml += `<div class="screenshot-panel"><div class="panel-label dev">Dev</div><img src="${d}" alt="Dev"></div>`;
      }
    }
    imgHtml += '</div>';
  }

  const tableRows = rows.map(([item, design, dev, change, status]) => `
    <tr>
      <td>${item}</td>
      <td class="mono">${design}</td>
      <td class="mono">${dev}</td>
      <td>${change}</td>
      <td class="${statusClass(status)}">${status}</td>
    </tr>`).join('');

  return `
  <section id="${id}">
    <h2>${title}</h2>
    ${imgHtml}
    <table>
      <thead><tr><th>Property</th><th>Design token</th><th>Dev implementation</th><th>Required change</th><th>Status</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </section>`;
}

const allRows = [panelShellRows, headerRows, messagesAreaRows, userMessageRows, aiMessageRows, inputFieldRows, sendButtonRows, voiceButtonRows, promptChipRows, richContentRows, navigationRows, loginPageRows, panelStatesRows].flat();
const gapCount = allRows.filter(r => r[4] === 'Gap').length;
const matchCount = allRows.filter(r => r[4] === 'Match').length;
const verifyCount = allRows.filter(r => r[4] === 'Verify').length;
const totalCount = gapCount + matchCount + verifyCount;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mobile Experience — Design vs Dev Comparison</title>
<style>
:root { --sidebar-w: 200px; --gap: #d32f2f; --match: #2e7d32; --verify: #f57c00; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Heebo', system-ui, sans-serif; color: #2D2926; background: #fafaf8; line-height: 1.5; padding: 32px 40px; margin-left: var(--sidebar-w); }
h1 { font-size: 28px; margin-bottom: 8px; }
h2 { font-size: 20px; margin: 32px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #E8E6E0; }
section { margin-bottom: 48px; }
table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 16px; }
th, td { padding: 10px 12px; border: 1px solid #E8E6E0; text-align: left; vertical-align: top; }
th { background: #F7F5F0; font-weight: 600; white-space: nowrap; }
td.mono { font-family: 'SF Mono', 'Fira Code', monospace; font-size: 12px; }
.status-gap { background: #ffebee; color: var(--gap); font-weight: 700; text-align: center; }
.status-match { background: #e8f5e9; color: var(--match); font-weight: 700; text-align: center; }
.status-verify { background: #fff3e0; color: var(--verify); font-weight: 700; text-align: center; }
.screenshots { display: flex; gap: 16px; flex-wrap: wrap; margin: 16px 0; }
.screenshot-panel { flex: 1; min-width: 200px; max-width: 400px; }
.screenshot-panel img { width: 100%; border: 1px solid #E8E6E0; border-radius: 8px; }
.panel-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 6px; }
.panel-label.design { background: #e8f5e9; color: #2e7d32; }
.panel-label.dev { background: #ffebee; color: #d32f2f; }
.overview { background: #fff; border: 1px solid #E8E6E0; border-radius: 12px; padding: 24px 32px; margin-bottom: 32px; }
.overview p { margin: 8px 0; }
.stats { display: flex; gap: 24px; margin-top: 16px; }
.stat { text-align: center; }
.stat-num { font-size: 28px; font-weight: 700; }
.stat-label { font-size: 12px; color: #8A8680; }
.token-map { background: #F7F5F0; border: 1px solid #E8E6E0; border-radius: 8px; padding: 16px; margin: 16px 0; font-family: monospace; font-size: 12px; }
.token-map dt { font-weight: 700; color: #2D2926; margin-top: 8px; }
.token-map dd { color: #5E5954; margin-left: 16px; }

/* Side navigation */
.side-nav { position: fixed; top: 0; left: 0; width: var(--sidebar-w); height: 100vh; overflow-y: auto; background: #fff; border-right: 1px solid #E8E6E0; padding: 16px 12px; z-index: 100; transition: transform 0.2s; }
.side-nav a { display: block; font-size: 12px; color: #5E5954; text-decoration: none; padding: 4px 8px; border-radius: 4px; margin-bottom: 2px; }
.side-nav a:hover { background: #F7F5F0; }
.nav-top { font-weight: 700; margin-bottom: 12px; }
.side-nav-title { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin: 12px 0 4px 8px; }
.nav-sub { display: block; font-size: 10px; color: #A8A49E; text-transform: uppercase; letter-spacing: 0.3px; margin: 8px 0 2px 8px; }
.t-panel { color: #2d6a4f; }
.t-messages { color: #6366f1; }
.t-input { color: #b8860b; }
.t-states { color: #7c3aed; }
.t-modals { color: #9b2226; }
.t-ref { color: #2563eb; }
#nav-toggle { position: fixed; top: 12px; left: 12px; z-index: 101; width: 32px; height: 32px; border: 1px solid #E8E6E0; background: #fff; border-radius: 6px; cursor: pointer; display: none; font-size: 18px; line-height: 30px; text-align: center; }
@media (max-width: 1199px) {
  body { margin-left: 0; }
  .side-nav { transform: translateX(-100%); }
  .side-nav.open { transform: translateX(0); }
  #nav-toggle { display: block; }
  #nav-toggle.shifted { left: 192px; }
}
</style>
</head>
<body id="top">

<button id="nav-toggle" onclick="document.querySelector('.side-nav').classList.toggle('open'); this.classList.toggle('shifted');">☰</button>

<nav class="side-nav">
  <a href="#top" class="nav-link nav-top">↑ Overview</a>
  <span class="side-nav-title t-panel">Panel &amp; Layout</span>
  <a href="#s1" class="nav-link">1. Panel shell</a>
  <a href="#s2" class="nav-link">2. Header bar</a>
  <span class="side-nav-title t-messages">Messages</span>
  <a href="#s3" class="nav-link">3. Messages area</a>
  <a href="#s4" class="nav-link">4. User message</a>
  <a href="#s5" class="nav-link">5. AI message</a>
  <span class="side-nav-title t-input">Input &amp; Actions</span>
  <a href="#s6" class="nav-link">6. Input field</a>
  <a href="#s7" class="nav-link">7. Send button</a>
  <a href="#s8" class="nav-link">8. Voice button</a>
  <a href="#s9" class="nav-link">9. Prompt chips</a>
  <span class="side-nav-title t-states">Rich Content</span>
  <a href="#s10" class="nav-link">10. Rich content rendering</a>
  <span class="side-nav-title t-panel">Navigation</span>
  <a href="#s11" class="nav-link">11. Navigation sidebar</a>
  <span class="side-nav-title t-modals">Login / Auth</span>
  <a href="#s12" class="nav-link">12. Login page</a>
  <span class="side-nav-title t-states">Panel States</span>
  <a href="#s13" class="nav-link">13. Panel states</a>
  <span class="side-nav-title t-ref">Reference</span>
  <a href="#tokens" class="nav-link">Token map</a>
</nav>

<div class="overview">
  <h1>Mobile Experience — Design vs Dev Comparison</h1>
  <p><strong>Design sources:</strong> <code>pencil/design-system/complete/chat-ui.lib.pen</code> + <code>pencil/design-system/in-progress/hemlock-library.lib.pen</code> + <code>pencil/designs/4-approved/app-shell-dashboard-view.pen</code></p>
  <p><strong>Dev URL:</strong> <code>https://app.eg-dev.ai</code> (mobile 390px viewport)</p>
  <p><strong>Date:</strong> June 26, 2026</p>
  <div class="stats">
    <div class="stat"><div class="stat-num" style="color:var(--gap)">${gapCount}</div><div class="stat-label">Gaps</div></div>
    <div class="stat"><div class="stat-num" style="color:var(--match)">${matchCount}</div><div class="stat-label">Matches</div></div>
    <div class="stat"><div class="stat-num" style="color:var(--verify)">${verifyCount}</div><div class="stat-label">To verify</div></div>
    <div class="stat"><div class="stat-num">${totalCount}</div><div class="stat-label">Total</div></div>
  </div>
  <p style="margin-top:16px;font-size:13px;color:#8A8680"><strong>How to read:</strong> <span style="color:var(--gap)">Gap</span> = mismatch OR hard-coded value where token should be used, <span style="color:var(--match)">Match</span> = correct value AND uses token-backed class, <span style="color:var(--verify)">Verify</span> = needs code inspection to confirm token usage (not just value match).</p>
</div>

${compareSection('s1', '1. Panel shell', panelShellRows, { images: { design: images.designConversation, dev: images.devConversationTop } })}

${compareSection('s2', '2. Header bar', headerRows, { images: { design: images.designConversation, dev: images.devConversationTop } })}

${compareSection('s3', '3. Messages area', messagesAreaRows, { images: { design: images.designConversation, dev: images.devConversationTop } })}

${compareSection('s4', '4. User message bubble', userMessageRows, { images: { design: images.designUserMessage, dev: images.devConversationTop } })}

${compareSection('s5', '5. AI message', aiMessageRows, { images: { design: images.designAiMessage, dev: images.devConversationScrolled } })}

${compareSection('s6', '6. Input field', inputFieldRows, { images: { design: images.designInput, dev: images.devEmptyState } })}

${compareSection('s7', '7. Send button', sendButtonRows, { images: { design: images.designInput, dev: images.devEmptyState } })}

${compareSection('s8', '8. Voice button', voiceButtonRows, { images: { design: images.designInput, dev: images.devEmptyState } })}

${compareSection('s9', '9. Prompt chips (empty state)', promptChipRows, { images: { design: images.designEmpty, dev: images.devEmptyState } })}

${compareSection('s10', '10. Rich content rendering', richContentRows, { images: { dev: [images.devConversationScrolled, images.devConversationTop] } })}

${compareSection('s11', '11. Navigation sidebar', navigationRows, { images: { design: images.designNavPanel, dev: images.devNavSidebar } })}

${compareSection('s12', '12. Login page', loginPageRows, { images: { design: images.designLogin, dev: [images.devLoginWelcome, images.devLoginEmpty] } })}

${compareSection('s13', '13. Panel states', panelStatesRows, { images: { design: images.designThinking, dev: [images.devThinking1, images.devThinking2] } })}

<section id="tokens">
  <h2>Design Token Reference</h2>
  <p>Tokens from <code>chat-ui.lib.pen</code> variables:</p>
  <dl class="token-map">
    ${Object.entries(T).map(([k, v]) => `<dt>$${k}</dt><dd>${v}</dd>`).join('\n    ')}
  </dl>
  <h3 style="margin-top:32px">Hemlock Button Tokens <span style="font-weight:400;font-size:13px;color:#8A8680">(component/Button · bMlax · hemlock-library.lib.pen)</span></h3>
  <dl class="token-map">
    <dt>$colors-btnPrimaryBg</dt><dd>$color-gray-900 → #0E0E0E</dd>
    <dt>$colors-btnPrimaryBgHover</dt><dd>$color-gray-800 → #2D2926</dd>
    <dt>$colors-btnPrimaryBgActive</dt><dd>$color-gray-700</dd>
    <dt>$colors-btnPrimaryBgDisabled</dt><dd>$color-gray-200</dd>
    <dt>$colors-btnPrimaryText</dt><dd>$color-gray-100 → #EEEDEB</dd>
    <dt>$colors-btnPrimaryTextHover</dt><dd>$color-base-white → #FFFFFF</dd>
    <dt>$colors-btnPrimaryTextDisabled</dt><dd>$color-gray-400</dd>
    <dt>$radius-full</dt><dd>9999px (pill shape)</dd>
    <dt>$spacing-xs</dt><dd>12px (button vertical padding)</dd>
    <dt>$spacing-md</dt><dd>24px (button horizontal padding)</dd>
    <dt>Button height (medium)</dt><dd>48px min-height</dd>
    <dt>Button font</dt><dd>Heebo 16px / weight 600 (semibold)</dd>
    <dt>Button text alignment</dt><dd>centered (justify-content: center, align-items: center)</dd>
    <dt>Button layout</dt><dd>display: flex, flex-direction: row, gap: 8px</dd>
  </dl>
</section>

</body>
</html>`;

const outPath = path.join(dir, 'Mobile-Experience-Design-vs-Dev.html');
fs.writeFileSync(outPath, html);
console.log(`✓ Written: ${outPath}`);
console.log(`  Gaps: ${gapCount} | Matches: ${matchCount} | Verify: ${verifyCount} | Total: ${totalCount}`);
