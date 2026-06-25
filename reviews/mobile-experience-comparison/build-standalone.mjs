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
  designConversation: requireEmbed('assets/design/VJysN.png'),
  designEmpty: requireEmbed('assets/design/LCYKi.png'),
  designError: requireEmbed('assets/design/EpRMp.png'),
  devConversationTop: requireEmbed('assets/dev/conversation-top.png'),
  devConversationScrolled: requireEmbed('assets/dev/conversation-scrolled.png'),
  devEmptyState: requireEmbed('assets/dev/empty-state.png'),
  devLoginPage: requireEmbed('assets/dev/login-page-button-scroll.png'),
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
  ['Panel background', '$chat.bg → $nav.bg = #F7F5F0', 'bg-taupe-100 = #F7F5F0', '—', 'Match'],
  ['Panel border', '$chat.border = 1px solid #DCD8CB', 'border border-[#DCD8CB] = 1px solid #DCD8CB', '—', 'Match'],
  ['Panel corner radius', '$chat.radius = 12px', 'rounded-xl = 12px (inner); 0px on outer wrapper at mobile full-width', 'On mobile, outer wrapper has rounded-none because panel fills viewport — acceptable', 'Match'],
  ['Panel shadow', '0 2px 28px 2px rgba(45,41,38,0.157) ($chat.shadow)', 'shadow-[0_2px_28px_2px_rgba(45,41,38,0.16)]', '—', 'Match'],
  ['Panel width (mobile)', '360px (design artboard)', '390px (fills viewport)', 'Panel fills available width — correct responsive behavior', 'Match'],
  ['Panel height', '844px (design artboard)', '907px (fills viewport height)', 'Panel fills available height — correct responsive behavior', 'Match'],
  ['Panel layout', 'vertical, justify: space-between, clip: true', 'flex flex-col, overflow-hidden', '—', 'Match'],
];

const headerRows = [
  ['Header padding', '16px vertical, 20px horizontal', 'py-4 px-5 = 16px 20px', '—', 'Match'],
  ['Header border-bottom', '0.5px solid $chat.divider (#E8E6E0)', '0.5px solid #E8E6E0', '—', 'Match'],
  ['Header layout', 'flex, space-between, align-items: center', 'flex items-center justify-between', '—', 'Match'],
  ['Header title font', 'Noto Serif 16px/400 (regular)', 'typo-secondary-base-regular = Noto Serif 16px/400', '—', 'Match'],
  ['Header title color', '$chat.text.primary = #2D2926', 'text-[#2D2926] = #2D2926', '—', 'Match'],
  ['Close button size', '28×28px (design component)', 'w-7 h-7 = 28×28px', '—', 'Match'],
  ['Close button radius', '6px', 'rounded-[6px] = 6px', '—', 'Match'],
  ['Close button icon color', '$chat.icon = $nav.text.secondary = #5E5954', 'text-gray-600 = #5E5954', '—', 'Match'],
  ['Close button hover bg', '$chat.close.hover.bg = #EDEAE3', 'hover:bg-taupe-200 = #EDEAE3', '—', 'Match'],
  ['Close button pressed bg', '$chat.close.pressed.bg = #E3DFD6', 'active:bg-taupe-300 = #E3DFD6', '—', 'Match'],
];

const messagesAreaRows = [
  ['Messages container gap', '14px', 'gap: 14px (copilotKitMessagesContainer)', '—', 'Match'],
  ['Messages container padding', '16px vertical, 20px horizontal', 'padding: 16px 20px', '—', 'Match'],
  ['Messages layout', 'vertical, justify: end (messages anchor to bottom)', 'flex-col with justify-end in copilotKitMessagesContainer — confirmed', '—', 'Match'],
  ['Messages scroll', 'Scrollable area between header and input', 'copilotKitMessages with overflow-y-auto', '—', 'Match'],
];

const userMessageRows = [
  ['User bubble background', '$chat.bubble.user.bg → $nav.bg = #F7F5F0', 'bg: rgb(247,245,240) = #F7F5F0', '—', 'Match'],
  ['User bubble border', '1px solid $chat.bubble.user.border = #DCD8CB', 'border: 1px solid rgb(220,216,203) = #DCD8CB', '—', 'Match'],
  ['User bubble corner radius', '$chat.bubble.radius = 12px', 'border-radius: 12px', '—', 'Match'],
  ['User bubble padding', '12px vertical, 16px horizontal (from component)', 'padding: 12px 16px', '—', 'Match'],
  ['User bubble max-width', '80% of container', 'max-width: 80%', '—', 'Match'],
  ['User bubble alignment', 'Right-aligned (pushed to right edge)', 'margin-left: auto (68.8px offset for 275px bubble in 344px container)', '—', 'Match'],
  ['User message font', 'Heebo 14px/400', 'font: 14px/22.4px Heebo, weight 400', '—', 'Match'],
  ['User message color', '$chat.text.secondary = #5E5954', 'color: rgb(94,89,84) = #5E5954', '—', 'Match'],
  ['User message line-height', '1.6 (22.4px at 14px)', 'line-height: 22.4px (1.6×14)', '—', 'Match'],
];

const aiMessageRows = [
  ['AI message background', '$chat.bubble.ai.bg = transparent (#FFFFFF00)', 'background: rgba(0,0,0,0) = transparent', '—', 'Match'],
  ['AI message border', 'None (transparent bubble)', 'border: 0px none', '—', 'Match'],
  ['AI message max-width', '100% of container', 'max-width: 100%', '—', 'Match'],
  ['AI message font', 'Heebo 14px/400', 'font: 14px/22.4px Heebo, weight 400', '—', 'Match'],
  ['AI message color', '$chat.text.primary = #2D2926', 'color: rgb(45,41,38) = #2D2926', '—', 'Match'],
  ['AI message line-height', '1.6 (22.4px at 14px)', 'line-height: 22.4px (1.6×14)', '—', 'Match'],
  ['AI message padding', '0px (no bubble padding)', 'padding: 0px', '—', 'Match'],
  ['AI message margin-bottom', '14px (from container gap)', 'margin: 0 0 8px — individual message margin is 8px, not 14px', 'Spacing between messages is 8px instead of design 14px gap. Increase margin-bottom or rely on container gap.', 'Gap'],
];

const inputFieldRows = [
  ['Input area padding', '12px/12px/20px/12px (design) or 20px (dev)', 'px-5 py-5 = 20px all around — acceptable', '—', 'Match'],
  ['Input field background', '$chat.input.bg = #FFFFFF (white)', 'bg-white = rgb(255,255,255) — confirmed match', '—', 'Match'],
  ['Input field border', '1.5px solid $chat.input.border = #E8E6E0', 'border-[1.5px] border-[#e8e6e0] = 1.5px solid #E8E6E0 — matches', '—', 'Match'],
  ['Input field corner radius', '$chat.input.radius = 12px', 'rounded-xl = 12px — confirmed match', '—', 'Match'],
  ['Input field internal gap', '16px between textarea and buttons', 'gap-4 = 16px — acceptable', '—', 'Match'],
  ['Textarea font', 'Heebo 14px/400', 'font: 14px Heebo, weight 400 — confirmed match', '—', 'Match'],
  ['Textarea color', '$chat.text.primary = #2D2926', 'color: #2D2926 — confirmed match', '—', 'Match'],
  ['Placeholder text', '"Ask me any financial question..."', '"Ask me any financial question..."', '—', 'Match'],
  ['Placeholder color', '$chat.text.placeholder = #A8A49E', 'placeholder:text-[#A8A49E] class present — matches', '—', 'Match'],
];

const sendButtonRows = [
  ['Send button size', '34×34px (circular)', 'w: 34px, h: 34px — confirmed match', '—', 'Match'],
  ['Send button shape', 'Circle (border-radius: 50%)', 'rounded-full = 9999px — confirmed match', '—', 'Match'],
  ['Send button bg (enabled)', '$chat.send.bg = #3C3C3C', 'Verify — need to test with text entered (send button only enables when text is typed)', 'If not #3C3C3C, update bg to bg-[#3C3C3C]', 'Verify'],
  ['Send button bg (disabled)', '$chat.send.bg.disabled = #D4D1CA', 'bg: rgb(227,223,214) = #E3DFD6 — wrong token, too light', 'Change disabled bg from #E3DFD6 to #D4D1CA ($chat.send.bg.disabled)', 'Gap'],
  ['Send button bg (hover)', '$chat.send.bg.hover = #4F4F4F', 'Verify — requires enabled state + hover (cannot test in empty panel)', 'If not #4F4F4F, update hover:bg-[#4F4F4F]', 'Verify'],
  ['Send button bg (pressed)', '$chat.send.bg.pressed = #2A2A2A', 'Verify — requires enabled state + click (cannot test in empty panel)', 'If not #2A2A2A, update active:bg-[#2A2A2A]', 'Verify'],
  ['Send button icon color', '$chat.send.icon = #FFFFFF', 'color: rgb(255,255,255) = #FFFFFF — confirmed match', '—', 'Match'],
  ['Send button border', 'None', 'border: 0px none — confirmed match', '—', 'Match'],
];

const voiceButtonRows = [
  ['Voice button size', '34×34px (circular)', 'w: 34px, h: 34px — confirmed match', '—', 'Match'],
  ['Voice button shape', 'Circle (border-radius: 50%)', 'rounded-full = 9999px — confirmed match', '—', 'Match'],
  ['Voice button bg (default)', 'Transparent', 'bg: rgba(0,0,0,0) = transparent — confirmed match', '—', 'Match'],
  ['Voice button border', '1px solid $chat.border = #DCD8CB', 'border: 1px solid rgb(220,216,203) = #DCD8CB — confirmed match', '—', 'Match'],
  ['Voice button icon color', '$chat.icon = #5E5954', 'color: rgb(94,89,84) = #5E5954 — confirmed match', '—', 'Match'],
  ['Voice button active bg', '$chat.voice.active.bg = #3A6AF8', 'Verify — requires triggering recording state (microphone permission)', '—', 'Verify'],
  ['Voice button active icon', '$chat.voice.active.icon = #FFFFFF', 'Verify — requires triggering recording state (microphone permission)', '—', 'Verify'],
];

const promptChipRows = [
  ['Prompt chip background', '$chat.chip.bg → $nav.bg = #F7F5F0', 'bg: rgb(247,245,240) = #F7F5F0 — confirmed match', '—', 'Match'],
  ['Prompt chip border', '1px solid $chat.chip.border = #DCD8CB', 'border: 1px solid rgb(220,216,203) = #DCD8CB — confirmed match', '—', 'Match'],
  ['Prompt chip corner radius', '$chat.chip.radius = 24px (pill shape)', 'border-radius: 24px — confirmed match', '—', 'Match'],
  ['Prompt chip font', 'Heebo 14px/400', 'font: Heebo 14px, weight 400 — confirmed match', '—', 'Match'],
  ['Prompt chip color', '$chat.text.secondary = #5E5954', 'color: rgb(94,89,84) = #5E5954 — confirmed match', '—', 'Match'],
  ['Prompt chip padding', '12px 16px (from measured component)', 'padding: 12px 16px — confirmed match', '—', 'Match'],
  ['Prompt chip hover bg', '$chat.chip.hover.bg → $nav.hover.bg = #EDEAE3', 'Verify — hover states require mouse interaction testing', '—', 'Verify'],
  ['Prompt chip pressed bg', '$chat.chip.pressed.bg → $nav.pressed.bg = #E3DFD6', 'Verify — active states require click interaction testing', '—', 'Verify'],
];

const richContentRows = [
  ['Card grid overflow (5+ columns)', 'Design shows max 2-col data tables that fit within 320px content width', '5-column comparison cards overflow panel — "New Hampshire" column text hard-cut at right edge, no scroll affordance', 'Add horizontal scroll wrapper with overflow-x: auto to card grids, OR limit grid to max 3-4 columns and stack remaining below', 'Gap'],
  ['Card grid overflow (4 columns)', 'Design shows compact tables fitting within panel', '4-column grid barely fits (each card ~80px) — content area is ~344px but 4 cards + gaps = tight fit', 'At 4+ columns, switch to horizontal scroll with visible scroll indicator OR use stacked/list layout', 'Gap'],
  ['No horizontal scroll indicator on card grids', 'Design does not address wide content overflow explicitly', 'Data table (State/Structure) has a ">" chevron indicating horizontal scroll, but card grid above has NO affordance', 'Apply same scroll affordance pattern (chevron or fade) to ALL horizontally-overflowing containers', 'Gap'],
  ['Inconsistent overflow handling', 'All content should handle overflow consistently', 'openui-table uses scroll indicator (">"); comparison cards just clip', 'Unify overflow behavior — all wide content should use the same scroll pattern with visible indicator', 'Gap'],
  ['Text truncation without ellipsis', 'Text should never hard-clip on mobile (per chat design principles)', '"New Hampshir" is hard-clipped at container edge — no ellipsis, no fade, no indication content continues', 'Prevent hard-clip: either wrap text, show ellipsis, or add scroll container', 'Gap'],
  ['AI heading typography', 'Headings should fit within 320px content width without issues', '"State Tax Code Comparison — 2026" heading fits but uses large bold text — acceptable', '—', 'Match'],
  ['AI paragraph text wrapping', 'Text wraps naturally within message width', 'Body text wraps correctly within container', '—', 'Match'],
  ['Data table (State/Structure) scroll', 'Table should be scrollable when wider than panel', 'Has ">" chevron affordance indicating horizontal scroll works', '—', 'Match'],
];

const loginPageRows = [
  ['Continue button background', '$colors-btnPrimaryBg = $color-gray-900 (#0E0E0E)', 'rgb(14,14,14) = #0E0E0E — exact match', '—', 'Match'],
  ['Continue button text color', '$colors-btnPrimaryText = $color-gray-100 (#EEEDEB)', 'rgb(238,237,235) = #EEEDEB — exact match', '—', 'Match'],
  ['Continue button corner radius', 'Hemlock Button: pill shape ($radius-full = 9999px)', 'border-radius: 9999px — matches pill shape', '—', 'Match'],
  ['Continue button font family', 'Heebo', '"Heebo Variable", sans-serif — correct', '—', 'Match'],
  ['Continue button font size', '16px', '16px — correct', '—', 'Match'],
  ['Continue button height', 'Hemlock Button: 48px (standard touch target for medium size)', 'height: 32px — 16px too short, fails WCAG touch target (44px minimum)', 'Set min-height: 48px on the button. Current 32px fails accessibility touch target guidelines.', 'Gap'],
  ['Continue button font weight', 'Hemlock Button: 600 (semibold)', 'font-weight: 400 (regular) — text appears too thin', 'Change font-weight to 600 per Hemlock Button component spec', 'Gap'],
  ['Continue button padding', 'Hemlock Button: 12px top/bottom, 24px left/right ($spacing-xs / $spacing-md)', 'padding: 5px 16px — undersized vertical padding causes the 32px height', 'Change to padding: 12px 24px per Hemlock Button spec (this will also fix height)', 'Gap'],
  ['Page scroll behavior', 'Page must be scrollable — all content including legal disclaimers must be accessible', 'overflow: hidden on html, body, AND parent container div. Form content is 1096px but viewport is 907px — 189px of content completely inaccessible', 'Remove overflow: hidden from html/body/container. Allow natural page scrolling.', 'Gap'],
  ['Continue button position (fixed)', 'Button should be in content flow or sticky with scrollable content behind it', 'Button parent uses position: fixed; bottom: 0 (class: "fixed bottom-0 left-0 right-0 z-1 p-lg bg-white"). Content behind it cannot scroll.', 'Either make content area scrollable with padding-bottom for fixed button, or make button position: sticky/relative within scrollable flow', 'Gap'],
  ['Legal disclaimer accessibility', 'All legal/compliance text must be fully readable by users', 'Disclaimer text ("Nothing herein should be construed as an offer, recommendation, or solicitation...") starts rendering but is clipped by overflow:hidden. User cannot scroll to read full text.', 'Critical compliance issue — remove overflow:hidden, add scroll capability. Legal disclaimers must be fully accessible before user clicks Continue.', 'Gap'],
];

const panelStatesRows = [
  ['Empty state: centered prompt', '"Ask me any financial question..." centered in messages area', 'Confirmed — Noto Serif 20px/400, color #2D2926, vertically centered', '—', 'Match'],
  ['Empty state: prompt chips visible', 'Suggested questions shown below centered prompt text', 'Confirmed — chip "What\'s a donor-advised fund?" visible below prompt', '—', 'Match'],
  ['Empty state prompt font', 'Noto Serif 20px/400, color $chat.text.primary', 'Noto Serif 20px/400, color rgb(45,41,38) = #2D2926 — confirmed match', '—', 'Match'],
  ['Error state: error bubble', 'Blue-tinted bubble with error message', 'Verify — requires triggering error state (network disconnect)', '—', 'Verify'],
  ['Thinking state: animated indicator', 'Three pulsing dots in AI message bubble', 'Verify — requires triggering thinking state (send a message)', '—', 'Verify'],
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
      <thead><tr><th>Property</th><th>Design (token)</th><th>Dev (measured)</th><th>Required change</th><th>Status</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
  </section>`;
}

const allRows = [panelShellRows, headerRows, messagesAreaRows, userMessageRows, aiMessageRows, inputFieldRows, sendButtonRows, voiceButtonRows, promptChipRows, richContentRows, loginPageRows, panelStatesRows].flat();
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
.token-map { background: #F7F5F0; border: 1px solid #E8E6E0; border-radius: 8px; padding: 16px; margin: 16px 0; font-family: monospace; font-size: 12px; max-height: 300px; overflow-y: auto; }
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
  <span class="side-nav-title t-modals">Login / Auth</span>
  <a href="#s11" class="nav-link">11. Login page</a>
  <span class="side-nav-title t-states">Panel States</span>
  <a href="#s12" class="nav-link">12. Panel states</a>
  <span class="side-nav-title t-ref">Reference</span>
  <a href="#tokens" class="nav-link">Token map</a>
</nav>

<div class="overview">
  <h1>Mobile Experience — Design vs Dev Comparison</h1>
  <p><strong>Design sources:</strong> <code>pencil/design-system/complete/chat-ui.lib.pen</code> + <code>pencil/design-system/in-progress/hemlock-library.lib.pen</code></p>
  <p><strong>Dev URL:</strong> <code>https://app.eg-dev.ai</code> (mobile 390px viewport)</p>
  <p><strong>Date:</strong> June 24, 2026</p>
  <div class="stats">
    <div class="stat"><div class="stat-num" style="color:var(--gap)">${gapCount}</div><div class="stat-label">Gaps</div></div>
    <div class="stat"><div class="stat-num" style="color:var(--match)">${matchCount}</div><div class="stat-label">Matches</div></div>
    <div class="stat"><div class="stat-num" style="color:var(--verify)">${verifyCount}</div><div class="stat-label">To verify</div></div>
    <div class="stat"><div class="stat-num">${totalCount}</div><div class="stat-label">Total</div></div>
  </div>
  <p style="margin-top:16px;font-size:13px;color:#8A8680"><strong>How to read:</strong> <span style="color:var(--gap)">Gap</span> = confirmed mismatch, <span style="color:var(--match)">Match</span> = confirmed correct, <span style="color:var(--verify)">Verify</span> = needs live measurement (session expired before complete audit).</p>
</div>

${compareSection('s1', '1. Panel shell', panelShellRows, { images: { design: images.designConversation, dev: images.devConversationTop } })}

${compareSection('s2', '2. Header bar', headerRows)}

${compareSection('s3', '3. Messages area', messagesAreaRows)}

${compareSection('s4', '4. User message bubble', userMessageRows)}

${compareSection('s5', '5. AI message', aiMessageRows)}

${compareSection('s6', '6. Input field', inputFieldRows)}

${compareSection('s7', '7. Send button', sendButtonRows)}

${compareSection('s8', '8. Voice button', voiceButtonRows)}

${compareSection('s9', '9. Prompt chips (empty state)', promptChipRows, { images: { design: images.designEmpty, dev: images.devEmptyState } })}

${compareSection('s10', '10. Rich content rendering', richContentRows, { images: { dev: [images.devConversationScrolled, images.devConversationTop] } })}

${compareSection('s11', '11. Login page', loginPageRows, { images: { dev: images.devLoginPage } })}

${compareSection('s12', '12. Panel states', panelStatesRows, { images: { design: images.designError } })}

<section id="tokens">
  <h2>Design Token Reference</h2>
  <p>All tokens from <code>chat-ui.lib.pen</code> variables:</p>
  <dl class="token-map">
    ${Object.entries(T).map(([k, v]) => `<dt>$${k}</dt><dd>${v}</dd>`).join('\n    ')}
  </dl>
</section>

</body>
</html>`;

const outPath = path.join(dir, 'Mobile-Experience-Design-vs-Dev.html');
fs.writeFileSync(outPath, html);
console.log(`✓ Written: ${outPath}`);
console.log(`  Gaps: ${gapCount} | Matches: ${matchCount} | Verify: ${verifyCount} | Total: ${totalCount}`);
