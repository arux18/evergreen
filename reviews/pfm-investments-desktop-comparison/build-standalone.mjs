#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = '/Users/amanda/Evergreen Cursor Project/design-specs/reviews/pfm-investments-desktop-comparison';

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
  designMain: requireEmbed('assets/design/JsL9R.png'),
  designHoldingPopup: requireEmbed('assets/design/Uipye.png'),
  designOptionsPopup: requireEmbed('assets/design/sOb4u.png'),
  designFixedIncomePopup: requireEmbed('assets/design/uIigF.png'),
  designCryptoPopup: requireEmbed('assets/design/hJAHp.png'),
  devFull: requireEmbed('assets/dev/full-page.png'),
  devDetailHolding: requireEmbed('assets/dev/detail-popup-holding.png'),
};

const modalCompareStyle = 'object-fit:contain;max-height:600px;width:100%;background:#fff;padding:12px;';

const T = {
  bgMain: 'colors-background-main (#F7F5F0)',
  bgSurface: 'colors-background-surface (#FFFFFF)',
  borderLight: 'colors-borders-light (#EEEDEB)',
  gray100: 'color-gray-100 (#F5F5F4)',
  gray200: 'color-gray-200 (#D5D3D0)',
  gray500: 'color-gray-500 (#716E6A)',
  gray700: 'color-gray-700 (#403D3A)',
  gray900: 'color-gray-900 (#0E0E0E)',
  textHeader: 'colors-text-header (#0E0E0E)',
  textBody: 'colors-text-body (#403D3A)',
  textMeta: 'colors-text-meta (#5E5954)',
  taupe100: 'color-taupe-100 (#F7F5F0)',
  s3xs: 'spacing-3xs (4px)',
  s2xs: 'spacing-2xs (8px)',
  xs: 'spacing-xs (12px)',
  sm: 'spacing-sm (16px)',
  md: 'spacing-md (24px)',
  lg: 'spacing-lg (32px)',
  xl: 'spacing-xl (40px)',
  r2xs: 'radius-2xs (8px)',
  rXs: 'radius-xs (12px)',
  rFull: 'radius-full (9999px)',
};

const layoutRows = [
  ['Text truncation (GLOBAL)', 'Text always wraps — never truncate with ellipsis', '17 elements have text-overflow: ellipsis + white-space: nowrap + overflow: hidden (all security names truncated at 89px)', 'Remove ALL instances of text-overflow: ellipsis, white-space: nowrap, overflow: hidden on text elements. Text must wrap fully — never clip.', 'Gap'],
  ['Responsive table (< 640px)', 'Below 640px table width, switch to mobile card/stack layout — no horizontal table with cramped columns', 'Table stays in horizontal layout at all widths — columns compress to ~89px causing truncation and illegibility (see screenshot)', 'Add 640px breakpoint: below 640px, switch to stacked card layout per mobile design pattern (one holding per card, vertical labels). This is a known pattern from other PFM reviews.', 'Gap'],
  ['Content column padding', `[20px top, ${T.xl} (40px) sides] — padding: [20, 40]`, '20px 40px — padding matches design values', 'Ensure code uses $spacing-xl token for sides (not hardcoded 40px)', 'Gap'],
  ['Gap: content sections', `${T.md} (24px) between value block, account selector, filter tabs, and table`, 'gap: normal (not explicitly set on flex column)', 'Set gap: $spacing-md (24px) between all content sections', 'Gap'],
  ['Table container corner radius', `${T.r2xs} (8px)`, '0px', 'Add border-radius: $radius-2xs (8px) on table container', 'Gap'],
  ['Table container border', 'None (design has no visible outer border on table wrapper)', '0px none (no border)', 'No change — matches', 'Match'],
  ['Page header padding', '[20px, spacing-xl (40px), spacing-2xs (8px), spacing-xl (40px)]', '20px 40px (verified on wrapper)', 'Ensure code uses $spacing-xl and $spacing-2xs tokens (not hardcoded)', 'Gap'],
];

const totalValueRows = [
  ['Label text', '"TOTAL VALUE" — uppercase', '"TOTAL VALUE" (uppercase)', 'No change — same copy', 'Match'],
  ['Label font', 'Heebo 14px, weight 600 (semibold)', '14px, weight 600', 'Ensure code uses $typo-primary-sm-semibold token (not hardcoded 14px/600)', 'Gap'],
  ['Label color', `${T.gray500} (#716E6A)`, 'rgb(94, 89, 84) = #5E5954', 'Change label color from #5E5954 to $color-gray-500 (#716E6A)', 'Gap'],
  ['Label letter-spacing', '1px (custom — adds slight tracking to uppercase label)', '0.35px', 'Increase letter-spacing from 0.35px to 1px per design', 'Gap'],
  ['Value font', 'Heebo 36px, weight 600 (semibold)', '36px, weight 600', 'Ensure code uses $typo-primary-4xl-semibold token (not hardcoded 36px/600)', 'Gap'],
  ['Value color', `${T.gray900} (#0E0E0E)`, 'rgb(14, 14, 14) = #0E0E0E', 'Ensure code uses $color-gray-900 token (not hardcoded rgb())', 'Gap'],
  ['Value letter-spacing', '-0.5px (custom negative tracking for large numbers)', '-0.5px', 'Ensure code uses design token for letter-spacing (not hardcoded -0.5px)', 'Gap'],
  ['Holdings subtitle font', 'Heebo 14px, weight 400 (regular)', '14px, weight 400', 'Ensure code uses $typo-primary-sm-regular token (not hardcoded)', 'Gap'],
  ['Holdings subtitle color', `${T.textMeta} (#5E5954)`, 'rgb(94, 89, 84) = #5E5954', 'Ensure code uses $colors-text-meta token (not hardcoded rgb())', 'Gap'],
  ['Value section gap', `${T.s3xs} (4px) between label, value, and subtitle`, '4px', 'Ensure code uses $spacing-3xs token (not hardcoded 4px)', 'Gap'],
];

const accountSelectorRows = [
  ['Width', '375px fixed (custom design value)', '375px', 'No change — matches', 'Match'],
  ['Height', '58px (custom design value)', '58px', 'No change — matches', 'Match'],
  ['Corner radius', `${T.r2xs} (8px)`, '8px', 'Ensure code uses $radius-2xs token (not hardcoded 8px)', 'Gap'],
  ['Padding', '[0, spacing-xs (12px), 0, 17px] — 17px is custom right padding for chevron', '0px 12px 0px 17px', 'Ensure left padding uses $spacing-xs token (not hardcoded 12px). 17px right is custom.', 'Gap'],
  ['Border', `1px solid ${T.gray200} (#D5D3D0)`, '1px solid rgb(220, 216, 203) = #DCD8CB', 'Change border color from #DCD8CB to $color-gray-200 (#D5D3D0)', 'Gap'],
  ['Background', 'color-base-white (#FFFFFF) or transparent — no tint', 'rgb(255, 255, 255) = white', 'Ensure code uses $color-base-white token (not hardcoded rgb)', 'Gap'],
  ['Value text', 'Heebo 16px, weight 400, "All Accounts" (capital A)', '16px, weight 400, "All accounts" (lowercase a)', 'Capitalize to "All Accounts" (capital A) per design. Ensure font uses $typo-primary-base-regular token.', 'Gap'],
  ['Chevron icon color', `${T.gray500} (#8A8680 or #716E6A)`, 'Chevron inherits text color rgb(45, 41, 38) = #2D2926', 'Set chevron fill to $color-gray-500 (not body text color)', 'Gap'],
];

const filterTabsRows = [
  ['Container shape', 'No container — individual pills side-by-side with gap 8px', 'Segmented control: inline-flex, bg rgb(247,245,240), padding 4px, gap 2px, border-radius 9999px', 'Remove tab container background and padding. Design shows standalone pill buttons without wrapper bg.', 'Gap'],
  ['Tab type', 'Button component refs — "All" uses primary ($O:bMlax), others use outline ($O:aFIzk)', '"All": bg white, weight 600; others: bg transparent, weight 400', 'Active = $component/Button (filled), inactive = $component/Button/outline', 'Gap'],
  ['Tab font size', 'Heebo 12px (custom — set in descendants override)', '14px', 'Reduce filter tab font-size from 14px to 12px', 'Gap'],
  ['Tab letter-spacing', '0 (normal)', 'normal', 'No change — both inherit normal', 'Match'],
  ['Tab padding', '[4px, 16px] vertical/horizontal', '8px 24px', 'Reduce tab padding from 8px 24px to 4px 16px', 'Gap'],
  ['Tab gap', `${T.s2xs} (8px) between tabs`, '2px (container gap)', 'Increase gap from 2px to $spacing-2xs (8px) between filter tabs', 'Gap'],
  ['Active tab style', 'Filled button (solid background)', 'bg white, border-radius 9999px', 'Ensure active uses $component/Button (filled) component ref', 'Gap'],
  ['Active tab font weight', '600 (semibold — from Button component)', '600', 'Ensure code inherits weight from $component/Button token (not hardcoded 600)', 'Gap'],
  ['Inactive tab font weight', '400 (regular — from Button/outline)', '400', 'Ensure code inherits weight from $component/Button/outline token (not hardcoded 400)', 'Gap'],
  ['Tab labels', 'All, Equity, ETF, Fund, Crypto, Treasury, Corporate Bond, REIT — 8 tabs', 'All, Equity, ETF, Fund, Crypto, Treasury, Corporate Bond, REIT — 8 tabs', 'No change — same labels', 'Match'],
  ['Tab border-radius', `${T.rFull} (9999px) — pill shape`, '9999px', 'Ensure code uses $radius-full token (not hardcoded 9999px)', 'Gap'],
];

const tableHeaderRows = [
  ['Header fill', `${T.taupe100} (#F7F5F0) background`, 'rgb(247, 245, 240) = #F7F5F0', 'Ensure code uses $color-taupe-100 token (not hardcoded rgb/hex)', 'Gap'],
  ['Header corner radius', `${T.r2xs} (8px)`, '0px', 'Add border-radius: $radius-2xs (8px) on header row', 'Gap'],
  ['Header padding', '[10px, spacing-xs (12px)] — 10px top/bottom, 12px left/right', '10px 12px', 'Ensure horizontal padding uses $spacing-xs token (not hardcoded 12px)', 'Gap'],
  ['Header bottom border', `1px solid ${T.borderLight} (#EEEDEB)`, '0px none (no visible border)', 'Add border-bottom: 1px solid $colors-borders-light (#EEEDEB) on header', 'Gap'],
  ['Column gap', `${T.sm} (16px) between columns`, 'All columns equal 109px — no explicit gap', 'Add $spacing-sm (16px) gap between header columns OR set column widths per design', 'Gap'],
  ['Header font size', 'typo-primary-xs-semibold: Heebo 12px', '14px', 'Reduce header font-size from 14px to 12px per $typo-primary-xs-semibold', 'Gap'],
  ['Header font weight', '600 (semibold)', '700 (bold)', 'Reduce weight from 700 to 600 per $typo-primary-xs-semibold-font-weight', 'Gap'],
  ['Header text color', `${T.gray500} (#716E6A)`, 'oklch(0.164 0 89.88) = near-black #0E0E0E', 'Change header text color to $color-gray-500 (#716E6A)', 'Gap'],
  ['Sort icons size', '10×10px, Lucide icons', '14×14 or larger', 'Reduce sort icons to 10×10px', 'Gap'],
  ['Sort icons color', `${T.gray500} (#716E6A)`, 'Inherits header text color (#0E0E0E)', 'Set sort icon fill to $color-gray-500 (#716E6A)', 'Gap'],
  ['SECURITY column width', 'fill_container (flex-grow — takes remaining space)', '109px (equal division)', 'Set SECURITY to flex-grow (fill remaining space)', 'Gap'],
  ['TYPE column width', '70px fixed', '109px', 'Reduce TYPE column from 109px to 70px', 'Gap'],
  ['ACCOUNT column width', '160px fixed', '109px', 'Increase ACCOUNT column to 160px', 'Gap'],
  ['MARKET VALUE column width', '110px fixed, right-aligned', '109px', 'Set MARKET VALUE to 110px, text-align: right', 'Gap'],
  ['PORTFOLIO % column width', '90px fixed, right-aligned', '109px', 'Set PORTFOLIO % to 90px, text-align: right', 'Gap'],
];

const holdingRowRows = [
  ['Row padding', `${T.xs} (12px) all sides`, '12px 8px 12px 12px (first cell), 12px 8px (middle cells), 12px 12px 12px 8px (last cell)', 'Standardize to $spacing-xs (12px) uniform padding on all cells', 'Gap'],
  ['Row gap (inter-cell)', `${T.sm} (16px) between cells`, '0px — cells touch (table layout)', 'Add $spacing-sm (16px) gap between row cells (or equivalent column padding)', 'Gap'],
  ['Row bottom border', `1px solid ${T.borderLight} (#EEEDEB) — separating each row`, '1px solid rgb(238, 237, 235) = #EEEDEB', 'Ensure code uses $colors-borders-light token (not hardcoded rgb())', 'Gap'],
  ['Row height', 'Content-derived — height adjusts to wrapped text content', '88px (text wrapping causes taller rows — acceptable if text is not truncated)', 'Row height is acceptable as long as text wraps fully. Once account format is shortened, rows will naturally be shorter.', 'Gap'],
  ['Ticker text (SECURITY col)', 'Heebo 14px, weight 600, $color-gray-700 (#403D3A)', '14px, weight 600, color rgb(57, 54, 51) = #393633', 'Change ticker color from #393633 to $color-gray-700 (#403D3A)', 'Gap'],
  ['Ticker color', `${T.gray700} (#403D3A)`, 'rgb(57, 54, 51) = #393633', 'Use exact $color-gray-700 (#403D3A) token', 'Gap'],
  ['Security name (subtitle)', 'Heebo 11px, weight 400, $color-gray-500 (#716E6A) — text wraps, never truncates', '11px, weight 400, color #716E6A — BUT text-overflow: ellipsis, white-space: nowrap, overflow: hidden (TRUNCATED at 89px)', 'REMOVE text-overflow: ellipsis, white-space: nowrap, overflow: hidden. Text must wrap. 17 security names are being clipped (e.g. "Vanguard To..." instead of "Vanguard Total Stock Market ETF").', 'Gap'],
  ['Security name gap below ticker', '2px gap between ticker and security name', 'Gap not explicitly measured', 'Set gap: 2px between ticker badge and security name text', 'Gap'],
  ['TYPE cell font', 'Heebo 14px, weight 400, $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change TYPE text color from #393633 to $color-gray-500 (#716E6A)', 'Gap'],
  ['ACCOUNT cell font', 'Heebo 14px, weight 400, $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change ACCOUNT text color from #393633 to $color-gray-500 (#716E6A)', 'Gap'],
  ['ACCOUNT cell format', '"Fidelity Brokerage (x4372)" — short format with mask', '"Fidelity · Fidelity 403(b) Tax-Deferred" — full Plaid name with dot separator', 'Use short format: "{Institution} {SubType} (x{mask})" or design-matching compact format', 'Gap'],
  ['ACCOUNT cell truncation', 'Text wraps — never truncate with ellipsis', 'Text wraps to multiple lines (correct behavior)', 'Ensure NO text-overflow: ellipsis or line-clamp anywhere. Text must always wrap fully.', 'Gap'],
  ['MARKET VALUE font', 'Heebo 14px, weight 600, $color-gray-700 (#403D3A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change MARKET VALUE font-weight from 400 to 600, color to $color-gray-700 (#403D3A)', 'Gap'],
  ['MARKET VALUE alignment', 'Right-aligned (justifyContent: end)', 'text-align: right', 'Ensure code uses $color-gray-700 token for color. Alignment correct.', 'Gap'],
  ['PORTFOLIO % font', 'Heebo 14px, weight 400, $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change PORTFOLIO % text color from #393633 to $color-gray-500 (#716E6A)', 'Gap'],
  ['PORTFOLIO % alignment', 'Right-aligned (justifyContent: end)', 'text-align: right', 'Alignment correct. Ensure code uses $color-gray-500 token.', 'Gap'],
  ['Ticker badge (ETF/Stock chip)', 'Visible in design — cornerRadius 4px, fill #ebf0fe, padding [2,6]', 'No badge chip visible', 'Add ticker type badge chip beside ticker text: bg #ebf0fe, radius 4px, padding 2px 6px', 'Gap'],
];

const showMoreRows = [
  ['"Show More" button', 'Text button ref (component/Button/text) — "Show More" 14px', 'NOT PRESENT — all 22 rows displayed at once, no pagination', 'Add "Show More" button using Hemlock text button component below initial set of rows', 'Gap'],
  ['Footer border', `1px solid ${T.borderLight} (#EEEDEB) — top border only (strokeWidth: top)`, 'N/A — no show more footer exists', 'Add footer with border-top: 1px solid $colors-borders-light (#EEEDEB)', 'Gap'],
  ['Footer padding', `${T.s2xs} (8px) padding`, 'N/A — no show more footer exists', 'Set padding: $spacing-2xs (8px) on "Show More" footer container', 'Gap'],
  ['Footer alignment', 'Centered (justifyContent: center)', 'N/A — no show more footer exists', 'Center "Show More" button horizontally', 'Gap'],
];

const detailPopupShellRows = [
  ['Popup width', '560px (custom design value)', '560px', 'No change — matches', 'Match'],
  ['Popup corner radius', '$radius-xs (12px)', '12px', 'Ensure code uses $radius-xs token (not hardcoded 12px)', 'Gap'],
  ['Popup shadow', 'shadow-lg — rgba(0,0,0,0.2) 0px 16px 48px', 'rgba(0, 0, 0, 0.2) 0px 16px 48px 0px', 'Ensure code uses $shadow-lg token (not hardcoded shadow values)', 'Gap'],
  ['Popup fill', `${T.bgSurface} (white)`, 'oklch(1 0 89.88) = white', 'Ensure code uses $colors-background-surface token (not oklch())', 'Gap'],
  ['Popup overflow', 'hidden', 'overflow: hidden', 'No change — both use overflow: hidden', 'Match'],
  ['Popup position', 'Centered in viewport (modal pattern)', 'position: fixed, centered via openui-modal', 'No change — centered modal pattern matches', 'Match'],
  ['Backdrop overlay', '#00000066 (40% black) covers main content behind popup', 'No visible backdrop — content behind popup not dimmed', 'Add semi-transparent backdrop overlay (#00000066 or rgba(0,0,0,0.4)) when popup is open', 'Gap'],
  ['Body padding', `${T.xl} (40px) all sides`, '40px 32px 0px 40px (right=32px, bottom=0px — asymmetric)', 'Standardize to $spacing-xl (40px) on all sides. Right is 32px (should be 40px), bottom is 0px (needs padding).', 'Gap'],
];

const detailPopupContentRows = [
  ['Header: Institution/security logo', 'Placeholder image in design — real logos should come from Plaid API', 'No logo element rendered', 'Pull institution/security logo from Plaid API (logo_uri from /institutions/get or equivalent). Design placeholder is not the source of truth — Plaid is.', 'Gap'],
  ['Header: Ticker label', 'typo-primary-xs-semibold (12px/600), $color-gray-500', '11px, weight 600, color rgb(138, 134, 128) = #8A8680, letter-spacing 0.5px', 'Change ticker label to 12px/600 per $typo-primary-xs-semibold. Color should be $color-gray-500 (#716E6A) not #8A8680.', 'Gap'],
  ['Header: Security name', 'Heebo 16px, weight 600 (typo-primary-base-semibold)', '18px, weight 600, color rgb(14, 14, 14) = #0E0E0E', 'Reduce security name from 18px to 16px per $typo-primary-base-semibold', 'Gap'],
  ['Header: Close button (X)', '24×24px icon, cursor: pointer', '0×0px rendered size (button exists but not visually sized)', 'Fix close button: ensure 24×24px visible clickable area using Hemlock icon sizing', 'Gap'],
  ['Popup title', 'NOT in design — popup has no separate title bar', '"Holding details" — 20px, weight 700, color black', 'Remove "Holding details" title text. Design has no popup title — goes straight to ticker/name/value.', 'Gap'],
  ['Amount label', 'typo-primary-xs-semibold (12px/600), uppercase, $color-gray-500 (#716E6A)', '11px, weight 400, color rgb(94, 89, 84) = #5E5954, letter-spacing 1.5px, uppercase', 'Change to 12px/600 per $typo-primary-xs-semibold. Color from #5E5954 to $color-gray-500 (#716E6A). Weight from 400 to 600.', 'Gap'],
  ['Amount value', 'Heebo 20px, weight 700 (typo-primary-lg-bold)', '24px, weight 600, color rgb(14, 14, 14) = #0E0E0E', 'Reduce from 24px/600 to 20px/700 per $typo-primary-lg-bold', 'Gap'],
  ['Section header (Holding Details)', 'Full-width bar: $color-taupe-100 (#F7F5F0), padding $spacing-xs (12px), typo-primary-sm-semibold (14px/600), $colors-text-header (#0E0E0E)', '14px, weight 600, color #0E0E0E, bg rgb(247, 245, 240), padding 12px 16px, border-radius 8px 8px 0 0', 'Padding should be $spacing-xs (12px) uniform — currently 12px 16px (horizontal is 16px, should be 12px). Ensure tokens used.', 'Gap'],
  ['Detail row: label font', 'Heebo 14px, weight 400, $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(94, 89, 84) = #5E5954', 'Change label color from #5E5954 to $color-gray-500 (#716E6A)', 'Gap'],
  ['Detail row: value font', 'Heebo 14px, weight 400, $colors-text-body (#403D3A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change value color from #393633 to $colors-text-body (#403D3A)', 'Gap'],
  ['Detail row: padding', '$spacing-xs (12px) vertical per row', '16px', 'Reduce row padding from 16px to $spacing-xs (12px)', 'Gap'],
  ['Detail row: divider', `1px solid ${T.borderLight} (#EEEDEB) between rows`, '1px solid rgb(238, 237, 235) = #EEEDEB', 'Ensure code uses $colors-borders-light token (not hardcoded rgb())', 'Gap'],
  ['Holding fields', 'Security, Security Type, Account, Quantity, Last Price, Price As Of, Cost Basis, Currency', 'Security, Security Type, Account, Quantity (all present — verified)', 'All fields present — no change needed', 'Match'],
  ['Performance section', 'Section header "Performance" with detail rows', '14px, weight 600, color #0E0E0E — section present', 'Ensure header uses $color-taupe-100 bg token (not hardcoded hex/rgb)', 'Gap'],
  ['Classification section', 'Section header "Classification" with Category and Sub-category', 'NOT FOUND — section does not render', 'Add "Classification" section with Category and Sub-category fields', 'Gap'],
];

const popupVariantsRows = [
  ['Holding popup (Equity/ETF/Fund)', 'Sections: Holding Details + Performance + Classification', 'Holding Details shown, Performance visible', 'Verify all 3 sections present for equity/ETF/fund holdings', 'Verify'],
  ['Options popup', 'Sections: Holding Details + Contract Details + Performance + Classification', 'Not tested (no options in data set)', 'Ensure Options variant shows Contract Details with Strike, Expiration, Contract Type', 'Gap'],
  ['Fixed Income popup', 'Sections: Holding Details + Coupon/Maturity Details + Performance + Classification', 'Not tested (no fixed income in data set)', 'Ensure Fixed Income variant shows Coupon/Maturity with Coupon Rate, Maturity Date, Face Value', 'Gap'],
  ['Crypto popup', 'Sections: Holding Details + Performance + Classification', 'Not tested (no crypto in data set)', 'Ensure Crypto variant shows simplified Holding Details (no Price As Of)', 'Gap'],
];

const devFiles = [
  ['Page layout', 'apps/web/src/features/pfm-investments/index.tsx'],
  ['Holdings table', 'apps/web/src/features/pfm-investments/components/holdings-table.tsx'],
  ['Holding row', 'apps/web/src/features/pfm-investments/components/holding-row.tsx'],
  ['Account selector', 'apps/web/src/features/pfm-investments/components/account-selector.tsx'],
  ['Type filter', 'apps/web/src/features/pfm-investments/components/type-filter.tsx'],
  ['Holding detail', 'apps/web/src/features/pfm-investments/components/holding-detail.tsx'],
];

function table(rows) {
  const head = ['Property', 'Design (Hemlock token)', 'Dev (current)', 'Required change in dev', 'Status']
    .map((h) => `<th>${h}</th>`)
    .join('');
  const body = rows
    .map(([a, b, c, d, status]) => {
      const badge =
        status === 'Match'
          ? '<span class="badge match">Match</span>'
          : status === 'Verify'
            ? '<span class="badge warn">Verify</span>'
            : '<span class="badge gap">Gap</span>';
      return `<tr><td>${a}</td><td>${b}</td><td>${c}</td><td>${d}</td><td>${badge}</td></tr>`;
    })
    .join('\n');
  return `<table class="spec-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function fileTable() {
  return `<table class="spec-table file-table"><thead><tr><th>Area</th><th>js-mono file (develop)</th></tr></thead><tbody>${devFiles
    .map(([a, b]) => `<tr><td>${a}</td><td><code>${b}</code></td></tr>`)
    .join('')}</tbody></table>`;
}

function compareSection(num, title, subtitle, designImg, devImg, devCrop, tableHtml, devNote = '', designCrop = '') {
  const devStyle = devCrop ? `style="${devCrop}"` : '';
  const designStyle = designCrop ? `style="${designCrop}"` : '';
  const devPanel = devImg
    ? `<img src="${devImg}" alt="Dev: ${title}" ${devStyle} />`
    : `<div class="dev-note">${devNote || 'Dev screenshot needed — capture from app.eg-dev.ai/net-worth/investments'}</div>`;
  const designPanel = designImg
    ? `<img src="${designImg}" alt="Design: ${title}" ${designStyle} />`
    : `<div class="dev-note">Design export needed.</div>`;
  return `
  <section class="page" id="s${num}">
    <h2>${num}. ${title}</h2>
    <p class="subtitle">${subtitle}</p>
    <div class="compare">
      <div class="panel design-panel">
        <div class="panel-label design">Design — pfm-investments-v2.pen</div>
        ${designPanel}
      </div>
      <div class="panel dev-panel">
        <div class="panel-label dev">Dev — app.eg-dev.ai</div>
        ${devPanel}
      </div>
    </div>
    ${tableHtml}
  </section>`;
}

const masterRows = [
  ...layoutRows,
  ...totalValueRows,
  ...accountSelectorRows,
  ...filterTabsRows,
  ...tableHeaderRows,
  ...holdingRowRows,
  ...showMoreRows,
  ...detailPopupShellRows,
  ...detailPopupContentRows,
  ...popupVariantsRows,
];

const gapCount = masterRows.filter(([, , , , s]) => s === 'Gap').length;
const matchCount = masterRows.filter(([, , , , s]) => s === 'Match').length;
const checkCount = masterRows.filter(([, , , , s]) => s === 'Verify').length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>PFM Investments Desktop — Design vs Dev</title>
  <style>
    :root { --gap: #b91c1c; --match: #166534; --warn: #b45309; --design: #2d6a4f; --dev: #9b2226; --text: #403D3A; --muted: #716E6A; --line: #EEEDEB; --paper: #FFFFFF; }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Heebo', system-ui, sans-serif; background: #faf8f4; margin: 0; padding: 24px; color: var(--text); font-size: 14px; line-height: 1.55; }
    .doc { max-width: 1200px; margin: 0 auto; }
    .cover { background: var(--paper); border: 1px solid var(--line); padding: 40px 48px; margin-bottom: 28px; }
    .cover h1 { margin: 0 0 12px; font-size: 28px; font-weight: 600; line-height: 1.25; }
    .cover .purpose { font-size: 15px; color: var(--text); margin-bottom: 20px; line-height: 1.5; }
    .cover h3 { font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #716E6A; margin: 20px 0 8px; }
    .cover .how-to { margin: 0 0 12px; padding-left: 20px; font-size: 14px; line-height: 1.6; }
    .cover .how-to li { margin-bottom: 4px; }
    .badge-gap { background: #fef2f2; color: #b91c1c; padding: 1px 6px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .badge-match { background: #f0fdf4; color: #166534; padding: 1px 6px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .badge-check { background: #fffbeb; color: #b45309; padding: 1px 6px; border-radius: 4px; font-size: 12px; font-weight: 600; }
    .cover .meta { color: var(--muted); font-size: 14px; margin-bottom: 16px; }
    .cover p { margin: 0 0 10px; font-size: 14px; max-width: 960px; }
    .stats { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0 8px; }
    .stat { padding: 10px 16px; border-radius: 8px; font-size: 13px; border: 1px solid var(--line); background: #faf8f4; }
    .stat strong { display: block; font-size: 22px; margin-bottom: 2px; }
    .stat.gaps strong { color: var(--gap); }
    .stat.matches strong { color: var(--match); }
    .stat.checks strong { color: var(--warn); }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
    .badge.gap { background: #fde8e8; color: var(--gap); }
    .badge.match { background: #e8f5e9; color: var(--match); }
    .badge.warn { background: #fff8e1; color: var(--warn); }
    section.page { background: var(--paper); border: 1px solid var(--line); padding: 28px 36px; margin-bottom: 22px; break-inside: avoid; scroll-margin-top: 16px; }
    section.page h2 { margin: 0 0 4px; font-size: 19px; font-weight: 600; }
    section.page .subtitle { color: var(--muted); font-size: 13px; margin: 0 0 14px; }
    .compare { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
    .panel { border: 1px solid var(--line); overflow: hidden; background: #fff; }
    .panel.design-panel, .panel.design-panel img { background: #ffffff; }
    .panel.dev-panel, .panel.dev-panel img { background: #fafafa; }
    .panel img { display: block; width: 100%; height: auto; background: #ffffff; object-fit: contain; }
    .panel-label { padding: 7px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid var(--line); }
    .panel-label.design { background: #edf7f1; color: var(--design); }
    .panel-label.dev { background: #fdecec; color: var(--dev); }
    .compare-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 14px; }
    .compare-grid .col { border: 1px solid var(--line); overflow: hidden; background: #fff; }
    .compare-grid .col h3 { padding: 7px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid var(--line); background: #f8f8f8; margin: 0; }
    .compare-grid .col img { display: block; width: 100%; height: auto; object-fit: contain; }
    .spec-table { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-top: 2px; }
    .spec-table th, .spec-table td { text-align: left; padding: 7px 9px; border-bottom: 1px solid var(--line); vertical-align: top; }
    .spec-table th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); background: #faf8f4; }
    .spec-table td:first-child { font-weight: 500; width: 16%; }
    .spec-table td:nth-child(2), .spec-table td:nth-child(3) { width: 22%; }
    .spec-table td:nth-child(4) { width: 28%; color: #333; }
    .spec-table td:last-child { width: 8%; white-space: nowrap; }
    .spec-table code { font-size: 11px; word-break: break-all; }
    .dev-note { padding: 24px 20px; font-size: 13px; line-height: 1.6; color: var(--muted); min-height: 120px; background: #faf8f4; }
    .note { background: #f0f7ff; border-left: 3px solid #4a7c9b; padding: 10px 14px; font-size: 13px; margin: 12px 0 0; }
    .footer { text-align: center; color: var(--muted); font-size: 12px; margin-top: 24px; }
    .side-nav { position: fixed; top: 0; left: 0; width: 180px; height: 100vh; overflow-y: auto; background: var(--paper); border-right: 1px solid var(--line); padding: 16px 12px; z-index: 100; display: flex; flex-direction: column; gap: 2px; }
    .side-nav-title { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 8px 8px 4px; margin-top: 8px; border-top: 1px solid var(--line); }
    .side-nav-title:first-child { margin-top: 0; border-top: none; }
    .side-nav-title.t-list { color: #2d6a4f; }
    .side-nav-title.t-data { color: #6366f1; }
    .side-nav-title.t-detail { color: #0891b2; }
    .side-nav-title.t-ref { color: #2563eb; }
    .nav-link { display: block; padding: 5px 8px; border-radius: 6px; font-size: 12px; font-weight: 400; color: var(--text); text-decoration: none; transition: background 0.12s; line-height: 1.35; }
    .nav-link:hover { background: #eae7e1; }
    .nav-top { font-weight: 600; font-size: 13px; padding: 8px 8px; margin-bottom: 8px; border-bottom: 1px solid var(--line); border-radius: 0; color: #1a1a1a; }
    .nav-toggle { position: fixed; top: 12px; left: 12px; z-index: 200; width: 36px; height: 36px; border-radius: 8px; border: 1px solid var(--line); background: var(--paper); cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.08); transition: left 0.2s ease; }
    .nav-toggle svg { width: 18px; height: 18px; stroke: var(--text); }
    .nav-toggle.shifted { left: 192px; }
    .side-nav.open { display: flex !important; }
    @media (min-width: 1200px) { .doc { margin-left: 200px; } .nav-toggle { display: none; } }
    @media (max-width: 1199px) { .side-nav { display: none; } }
    @media (max-width: 900px) { .compare { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <button class="nav-toggle" onclick="document.querySelector('.side-nav').classList.toggle('open');this.classList.toggle('shifted')" aria-label="Toggle navigation">
    <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  </button>
  <nav class="side-nav">
    <a href="#top" class="nav-link nav-top">&#8593; Overview</a>
    <span class="side-nav-title t-list">Investments list</span>
    <a href="#s1" class="nav-link">1. Layout &amp; spacing</a>
    <a href="#s2" class="nav-link">2. Total value section</a>
    <a href="#s3" class="nav-link">3. Account selector</a>
    <a href="#s4" class="nav-link">4. Type filter tabs</a>
    <a href="#s5" class="nav-link">5. Table header</a>
    <a href="#s6" class="nav-link">6. Holding row</a>
    <a href="#s7" class="nav-link">7. Show More footer</a>
    <span class="side-nav-title t-detail">Holding detail</span>
    <a href="#s8" class="nav-link">8. Detail popup — shell</a>
    <a href="#s9" class="nav-link">9. Detail popup — content</a>
    <a href="#s10" class="nav-link">10. Popup variants</a>
    <span class="side-nav-title t-ref">Reference</span>
    <a href="#s11" class="nav-link">11. Files to change</a>
    <a href="#s12" class="nav-link">12. Master checklist</a>
  </nav>
  <div class="doc">
    <header class="cover" id="top">
      <h1>PFM Investments Desktop — Design vs Dev</h1>
      <p class="purpose">This document identifies every formatting difference between the approved Pencil designs and the current dev implementation on <code>app.eg-dev.ai/net-worth/investments</code>. Use it as a checklist to bring dev into pixel-perfect alignment with design.</p>

      <div class="stats">
        <div class="stat gaps"><strong>${gapCount}</strong> gaps to fix</div>
        <div class="stat matches"><strong>${matchCount}</strong> already match</div>
        <div class="stat checks"><strong>${checkCount}</strong> to verify</div>
        <div class="stat"><strong>${masterRows.length}</strong> total items</div>
      </div>

      <h3>How to read each section</h3>
      <ul class="how-to">
        <li><strong>Design panel</strong> (left) — the approved Pencil frame, cropped to the relevant area</li>
        <li><strong>Dev panel</strong> (right) — screenshot from <code>app.eg-dev.ai</code> at the same area</li>
        <li><strong>Comparison table</strong> — row-by-row differences with status: <span class="badge-gap">Gap</span> = confirmed difference, <span class="badge-match">Match</span> = already correct, <span class="badge-check">Verify</span> = needs verification against live dev</li>
        <li><strong>Required change</strong> column — exactly what dev needs to do to match design</li>
      </ul>

      <h3>Key rules</h3>
      <ul class="how-to">
        <li><strong>Design wins.</strong> Where design and dev differ, dev must change to match design.</li>
        <li><strong>Hemlock tokens.</strong> Both use tokens from <code>hemlock-library.lib.pen</code>. A "Match" means the same token is used.</li>
        <li><strong>Column widths.</strong> SECURITY: fill (flex-grow), TYPE: 70px, ACCOUNT: 160px, MARKET VALUE: 110px, PORTFOLIO %: 90px.</li>
        <li><strong>Account format.</strong> Account column uses compact format: "{Institution} {SubType} (x{mask})".</li>
      </ul>

      <h3>Sources</h3>
      <ul class="how-to">
        <li><strong>Design:</strong> <code>pfm-investments-v2.pen</code> (5 desktop frames + 4 popup variants)</li>
        <li><strong>Dev:</strong> <code>app.eg-dev.ai/net-worth/investments</code> on develop branch</li>
        <li><strong>Tokens:</strong> <code>hemlock-library.lib.pen</code></li>
      </ul>
    </header>

    ${compareSection('1', 'Layout &amp; spacing', 'Content column padding and vertical rhythm — contentColumn ZpdOH', images.designMain, images.devFull, '', table(layoutRows))}

    ${compareSection('2', 'Total value section', 'TOTAL VALUE label + dollar amount + holdings count — valueCol as85C', images.designMain, images.devFull, '', table(totalValueRows))}

    ${compareSection('3', 'Account selector', 'Hemlock Select component (O:jncEi) — "All Accounts" dropdown — RcFdy', images.designMain, images.devFull, '', table(accountSelectorRows))}

    ${compareSection('4', 'Type filter tabs', 'Security type pill buttons — filterRow g1Djl (All, Equity, ETF, Fund, Crypto, Treasury, etc.)', images.designMain, images.devFull, '', table(filterTabsRows))}

    ${compareSection('5', 'Table header', 'Column labels with sort icons — tableHeader j6Adz', images.designMain, images.devFull, '', table(tableHeaderRows))}

    ${compareSection('6', 'Holding row', 'Security ticker + name, type, account, market value, portfolio % — holdingRow', images.designMain, images.devFull, '', table(holdingRowRows))}

    ${compareSection('7', 'Show More footer', '"Show More" text button below holdings list — showMoreFooter ixx0J', images.designMain, images.devFull, '', table(showMoreRows))}

    <section class="page" id="s8">
      <h2>8. Detail popup — shell</h2>
      <p class="subtitle">Holding detail overlay — popup (560px, radius-xs, shadow-lg)</p>
      <div class="compare-grid">
        <div class="col"><div class="panel-label design">Design — Holding popup</div><img src="${images.designHoldingPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label dev">Dev — VTI popup</div><img src="${images.devDetailHolding}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(detailPopupShellRows)}
    </section>

    <section class="page" id="s9">
      <h2>9. Detail popup — content</h2>
      <p class="subtitle">Header, amount, and detail sections inside holding popup</p>
      <div class="compare-grid">
        <div class="col"><div class="panel-label design">Design — Holding (equity/ETF)</div><img src="${images.designHoldingPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label dev">Dev — VTI holding detail</div><img src="${images.devDetailHolding}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(detailPopupContentRows)}
    </section>

    <section class="page" id="s10">
      <h2>10. Popup variants</h2>
      <p class="subtitle">Design defines 4 popup variants based on security type: Holding (equity/ETF/fund), Options, Fixed Income, Crypto</p>
      <div class="compare-grid">
        <div class="col"><div class="panel-label design">Design — Options popup</div><img src="${images.designOptionsPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label design">Design — Fixed Income popup</div><img src="${images.designFixedIncomePopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label design">Design — Crypto popup</div><img src="${images.designCryptoPopup}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(popupVariantsRows)}
      <p class="note"><strong>Design defines 4 popup variants:</strong> Each security type renders a different detail popup layout. The <em>Options</em> variant adds Contract Details (Strike, Expiration, Type). The <em>Fixed Income</em> variant adds Coupon/Maturity Details (Coupon Rate, Maturity Date, Face Value, Yield). The <em>Crypto</em> variant simplifies the holding section. Dev should conditionally render the appropriate sections based on <code>security_type</code>.</p>
    </section>

    <section class="page" id="s11">
      <h2>11. Files to change in js-mono</h2>
      <p class="subtitle">Map formatting fixes to implementation files on develop. File paths are approximate — verify in codebase.</p>
      ${fileTable()}
      <div class="note"><strong>Note:</strong> File paths above are estimates based on naming conventions. Verify actual paths in the <code>js-mono</code> repository. The Investments feature may live under <code>pfm-investments</code>, <code>investments</code>, or <code>net-worth/investments</code> depending on the project structure.</div>
    </section>

    <section class="page" id="s12">
      <h2>12. Master formatting checklist</h2>
      <p class="subtitle">Engineering sign-off — every row below must match design before merge.</p>
      ${table(masterRows)}
    </section>

    <p class="footer">Self-contained HTML — share this single file with engineering.<br/>Open in browser · Source: pfm-investments-v2.pen · app.eg-dev.ai/net-worth/investments</p>
  </div>
</body>
</html>`;

const out = path.join(dir, 'PFM-Investments-Desktop-Design-vs-Dev.html');
fs.writeFileSync(out, html);
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024 / 1024).toFixed(2)} MB)`);
