#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = '/Users/amanda/Evergreen Cursor Project/design-specs/reviews/pfm-activity-v2-comparison';

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
  designDefault: requireEmbed('assets/design/Io4Op.png'),
  designAccountSelected: requireEmbed('assets/design/pjJJD.png'),
  designAccountHovered: requireEmbed('assets/design/CV0bG.png'),
  designTxnHovered: requireEmbed('assets/design/YpOyI.png'),
  designTxnSelectedPopup: requireEmbed('assets/design/bAspM.png'),
  designDepositPopup: requireEmbed('assets/design/bDcIO.png'),
  designTxnPressed: requireEmbed('assets/design/OBWVi.png'),
  designMobileDefault: requireEmbed('assets/design/v4sVMe.png'),
  designMobileNavOpen: requireEmbed('assets/design/TVCWB.png'),
  designMobileAccountSelect: requireEmbed('assets/design/ie8B0.png'),
  designMobileAccountSelectScroll: requireEmbed('assets/design/g1e3f.png'),
  designMobileTransactionDetail: requireEmbed('assets/design/PcHUT.png'),
  designMobileDefaultAlt: requireEmbed('assets/design/TrawO.png'),
  devFull: requireEmbed('assets/dev/full-page-clean.png'),
  devFullWide: embed('assets/dev/full-page-wide.png'),
  devNarrow: embed('assets/dev/table-narrow-1024.png'),
  devHover: embed('assets/dev/hover-row.png'),
  devPressed: embed('assets/dev/pressed-row.png'),
  devDetailWithdrawal: requireEmbed('assets/dev/detail-popup-withdrawal.png'),
  devDetailDeposit: requireEmbed('assets/dev/detail-popup-deposit.png'),
  devMobileDefault: requireEmbed('assets/dev/mobile-default.png'),
  devMobileAccountSelect: requireEmbed('assets/dev/mobile-account-select.png'),
  devMobileDetailWithdrawal: requireEmbed('assets/dev/mobile-detail-withdrawal.png'),
  devMobileDetailDeposit: requireEmbed('assets/dev/mobile-detail-deposit.png'),
  devTablet768: requireEmbed('assets/dev/tablet-768-broken.png'),
  devTablet768ChatClosed: requireEmbed('assets/dev/tablet-768-chat-closed.png'),
  devTablet900: requireEmbed('assets/dev/tablet-900-overlap.png'),
  devTablet640: requireEmbed('assets/dev/tablet-640-3col.png'),
  devSelectDefaultClosed: requireEmbed('assets/dev/select-default-closed.png'),
  devSelectOpen: requireEmbed('assets/dev/select-dropdown-open.png'),
  devSelectHover: requireEmbed('assets/dev/select-dropdown-hover.png'),
  devSelectAccountSelected: requireEmbed('assets/dev/select-account-selected.png'),
  devSelectReselection: requireEmbed('assets/dev/select-reselection.png'),
};

const modalCompareStyle = 'object-fit:contain;max-height:520px;background:#fff;padding:12px;';
const modalImageStyle = 'object-fit:contain;background:#fff;';

const T = {
  bgMain: 'colors-background-main (#F7F5F0)',
  bgSurface: 'colors-background-surface (#FFFFFF)',
  borderLight: 'colors-borders-light (#EEEDEB)',
  gray100: 'color-gray-100 (#F5F5F4)',
  gray500: 'color-gray-500 (#716E6A)',
  gray700: 'color-gray-700 (#403D3A)',
  gray900: 'color-gray-900 (#0E0E0E)',
  textHeader: 'colors-text-header (#0E0E0E)',
  textBody: 'colors-text-body (#403D3A)',
  textMeta: 'colors-text-meta (#5E5954)',
  taupe100: 'color-taupe-100 (#F7F5F0)',
  orange600: 'color-orange-600',
  depositGreen: 'MoneyText/positive — colors-text-deposit (#148338)',
  s3xs: 'spacing-3xs (4px)',
  s2xs: 'spacing-2xs (8px)',
  xs: 'spacing-xs (12px)',
  sm: 'spacing-sm (16px)',
  md: 'spacing-md (24px)',
  lg: 'spacing-lg (32px)',
  xl: 'spacing-xl (40px)',
  r2xs: 'radius-2xs (8px)',
  rXs: 'radius-xs (16px)',
  rFull: 'radius-full (9999px)',
};

const layoutRows = [
  ['Content column padding', `spacing-xl (40px) horizontal, 20px top (custom — between spacing-sm and spacing-md)`, '0px — no padding on content wrapper', 'Apply padding: 20px top/bottom, $spacing-xl (40px) left/right on activity content column', 'Gap'],
  ['Gap: content sections', `${T.md} between account selector, tabs, and table`, 'No explicit gap — sections flow with default spacing', 'Set gap: $spacing-md (24px) between account selector → tabs → table', 'Gap'],
  ['Table container corner radius', `${T.r2xs}`, '14px border-radius on table', 'Reduce border-radius from 14px to $radius-2xs (8px)', 'Gap'],
  ['Table container border', 'Disabled (no visible border in design)', '1px solid (faint border around table)', 'Remove table container border', 'Gap'],
];

const pageTitleRows = [
  ['Title text', '"Net Worth | Activity" — page header', '"Net Worth | Activity"', 'No change — same copy', 'Match'],
  ['Title placement', 'Inside headerRef bar with padding [20px, spacing-xl (40px), spacing-2xs (8px), spacing-xl (40px)]', 'Title present in header bar — padding not verified at container level', 'Ensure header bar padding: 20px top, $spacing-xl (40px) sides, $spacing-2xs (8px) bottom', 'Gap'],
];

const accountSelectorRows = [
  ['Component', 'Custom frame using Hemlock tokens ($O:) — follows Select pattern visually', 'Custom combobox — not a Hemlock Select ref', 'Align with Hemlock Select component specs (both are custom implementations — ensure token consistency)', 'Gap'],
  ['Width', '375px fixed (custom design value — no token)', '928px (full-width, fills entire content area)', 'Constrain to max-width: 375px', 'Gap'],
  ['Height', '58px (custom design value — derived from padding + content)', '58px', 'No change — matches. Ensure height is not hardcoded; derive from padding + line-height', 'Match'],
  ['Corner radius', `${T.r2xs} (8px)`, '8px', 'No change — value matches. Ensure dev uses $radius-2xs token, not hardcoded 8px', 'Match'],
  ['Padding', '[0, spacing-xs (12px), 0, 17px] — 17px is custom right padding for chevron space', '0px 12px 0px 17px', 'No change — values match. Ensure 12px uses $spacing-xs token', 'Match'],
  ['Border', '1px solid color-gray-200 (#D5D3D0)', '1px solid rgb(213, 211, 208) (#D5D3D0)', 'No change — value matches. Ensure dev uses $color-gray-200 token, not hardcoded rgb()', 'Match'],
  ['Background', 'color-base-white (#FFFFFF) or colors-background-surface — transparent/white', 'oklch(0.164 0 89.88 / 0.02) — 2% dark tint (barely visible)', 'Remove subtle tint; use $color-base-white or $colors-background-surface token', 'Gap'],
  ['Floating label ("Account")', '"Account" label visible above value when dropdown is open/focused', 'No floating label — only aria-label "Filter by account" for accessibility, not visible', 'Add visible floating "Account" label above value text per Hemlock Select pattern', 'Gap'],
  ['Value text', 'typo-primary-base-regular (Heebo 16px, weight 400, line-height 24px)', '"All Accounts" — Heebo Variable 16px, weight 400', 'No change — values match. Ensure dev uses $typo-primary-base-regular token set', 'Match'],
  ['Chevron icon', 'Down-chevron, color-gray-400 (#8A8680), rotates to up on open', 'Chevron present, rotates on open — color inherits text color (dark, near-black)', 'Set chevron fill to $color-gray-400 (#8A8680) instead of inheriting body text color', 'Gap'],
];

const accountSelectorDropdownRows = [
  ['Dropdown width', '358px fill_container on mobile (confirmed); ~300px on desktop (narrower than trigger)', '375px fixed', 'Reduce dropdown width — mobile should fill container (358px), desktop should be narrower (~300px content-width)', 'Gap'],
  ['Dropdown max-height', 'Full list visible without scrolling (in design frame)', '372px max-height with overflow hidden', 'Ensure dropdown can show all accounts without being cut off (increase max-height or add scroll)', 'Gap'],
  ['Dropdown border-radius', 'radius-2xs (8px) — confirmed: $O:radius-2xs token = 8', '12px', 'Reduce dropdown border-radius from 12px to 8px', 'Gap'],
  ['Dropdown shadow', 'shadow-md (from Hemlock Select dropdown)', 'Multi-layer box-shadow: oklch 0.025 + oklch 0.05 blur 6px + blur 10px', 'Use Hemlock shadow-md token instead of custom multi-layer shadow', 'Gap'],
  ['Dropdown border', '1px solid colors-borders-dark (from Hemlock)', '1px solid oklch(0.164 0 89.88 / 0.06) — 6% dark (very subtle)', 'Use colors-borders-dark token for dropdown border', 'Gap'],
  ['Dropdown inner padding', 'spacing-md (24px) on all sides — confirmed: Dropdown frame padding = $O:spacing-md', '24px padding (matches)', 'No change — inner content padding matches (24px)', 'Match'],
  ['Selected option style', 'DARK background (color-gray-900 #0E0E0E or near-black) with colors-text-reverse (white) — inverted pill', 'LIGHT beige background rgb(237, 234, 227) with DARK text — non-inverted', 'Change selected option to dark ($color-gray-900) bg with $colors-text-reverse (white) text per design', 'Gap'],
  ['Selected option font-size', 'typo-primary-base-regular — Heebo 16px', 'Heebo Variable 16px', 'No change — font-size matches', 'Match'],
  ['Selected option font-weight', '700 (bold) — confirmed: typo-primary-base-bold-font-weight token', '600 (semibold)', 'Increase font-weight from 600 to 700 on selected option', 'Gap'],
  ['Selected option line-height', 'typo-primary-base-bold-line-height = 24px', '24px', 'No change — matches $typo-primary-base-bold-line-height token', 'Match'],
  ['Selected option padding', 'spacing-xs (12px) vertical, spacing-sm (16px) horizontal', '8px 12px (8px top/bottom, 12px left/right)', 'Increase selected option padding — 12px vertical, 16px horizontal per Hemlock Select', 'Gap'],
  ['Selected option height', '~44px (with 12px vertical padding + 24px line-height)', '40px', 'Increase to 44px via padding adjustment', 'Gap'],
  ['Selected option border-radius', 'radius-full (9999px) — full pill matching row height', '8px (rounded-lg)', 'Change to $radius-full (9999px) for pill shape on selected option', 'Gap'],
  ['Option font-family', 'Heebo (typo-primary)', 'Heebo Variable', 'No change — font-family matches', 'Match'],
  ['Option font-size', 'typo-primary-base-regular — 16px', '16px', 'No change — matches', 'Match'],
  ['Option font-weight', 'typo-primary-base-regular-font-weight = 400', '400 (regular)', 'No change — matches $typo-primary-base-regular-font-weight token', 'Match'],
  ['Option line-height', 'typo-primary-base-regular-line-height = 24px', '24px', 'No change — matches $typo-primary-base-regular-line-height token', 'Match'],
  ['Option letter-spacing', 'typo-primary-base-regular-letter-spacing = 0 (normal)', 'normal', 'No change — matches token', 'Match'],
  ['Option text color', 'colors-text-body (#403D3A / color-gray-700) — confirmed via token', 'oklch(0.164 0 89.88) ≈ #0E0E0E (maps to color-gray-900 — header color, not body)', 'Change option text color from gray-900 (#0E0E0E) to colors-text-body gray-700 (#403D3A)', 'Gap'],
  ['Option padding', 'spacing-xs (12px) horizontal, spacing-2xs (8px) vertical per Hemlock Select item', '4px top/bottom, 6px left, 24px right (asymmetric — extra right for checkmark)', 'Use symmetric padding: 8px vertical, 12px horizontal; remove checkmark reserved space', 'Gap'],
  ['Option row height', '~40px (8px + 24px + 8px)', '32px (4px + 24px + 4px)', 'Increase option row height from 32px to 40px via padding adjustment', 'Gap'],
  ['Gap between options (within group)', 'spacing-2xs (8px) between items — confirmed via design export measurement', '2px (gap-0.5 — too tight)', 'Increase inter-item gap from 2px to 8px (spacing-2xs)', 'Gap'],
  ['Gap between category groups', 'spacing-md (24px) — confirmed: Dropdown frame gap property = $O:spacing-md', 'margin-top: 24px on each group', 'No change — group spacing matches (24px)', 'Match'],
  ['Group header font-size', 'typo-primary-xs-semibold — 12px', '11px (!text-[11px])', 'Increase group header font from 11px to 12px per Hemlock token', 'Gap'],
  ['Group header font-weight', 'typo-primary-xs-semibold-font-weight = 600', '600 (semibold)', 'No change — matches $typo-primary-xs-semibold-font-weight token', 'Match'],
  ['Group header letter-spacing', '0 (normal) — confirmed: typo-primary-xs-semibold-letter-spacing token = 0', '1.2px (tracking-wider — too much)', 'Remove letter-spacing: set to 0/normal per Hemlock token (visual tracking comes from uppercase + font, not letter-spacing)', 'Gap'],
  ['Group header color', 'colors-text-meta (#5E5954)', 'rgb(94, 89, 84) = #5E5954', 'No change — matches colors-text-meta', 'Match'],
  ['Group header padding', 'spacing-xs (12px) left, spacing-2xs (8px) top', '8px top, 12px right, 4px bottom, 6px left (asymmetric)', 'Normalize group header padding: 8px top, 12px left per Hemlock pattern', 'Gap'],
  ['Group header text-transform', 'UPPERCASE (from component)', 'Not set in CSS (text is manually uppercase in content)', 'Add text-transform: uppercase to group label style', 'Gap'],
  ['Hover option style', 'Subtle gray highlight background on hovered item', 'oklch(0.164 0 89.88 / 0.04) — 4% dark overlay with border-radius 6px', 'Hover state is very subtle (4%) — compare with design contrast; may need ~8% for visibility', 'Gap'],
  ['Checkmark on current selection', 'No checkmark in design — selected state communicated via dark pill only', 'Checkmark (✓) SVG icon (24×24) shown to the right of the currently selected account', 'Remove checkmark indicator — use inverted pill style only to communicate selection', 'Gap'],
  ['Re-selection state', 'Previously selected account shows NO special indicator — same as other options', 'Previously selected account has data-state="checked" with 4% bg tint + checkmark', 'Remove "checked" state; design communicates selection only through the top "All Accounts" pill', 'Gap'],
];

const filterTabsRows = [
  ['Container shape', `${T.rFull} (pill) — segmented control`, 'border-radius: 9999px (pill)', 'No change — matches', 'Match'],
  ['Container fill', `${T.taupe100} (#F7F5F0) background`, 'rgb(247, 245, 240) = #F7F5F0', 'No change — matches color-taupe-100', 'Match'],
  ['Container padding', `${T.s3xs} inner padding`, '4px', 'No change — value matches. Ensure dev uses $spacing-3xs (4px) token', 'Match'],
  ['Container width', '520px fixed (custom design value)', '566px (auto/content-sized — wider than design)', 'Constrain tab container width to 520px', 'Gap'],
  ['Active tab fill', `${T.bgSurface} with shadow-sm`, 'White fill with shadow present on "All Types"', 'No change — matches. Ensure dev uses $colors-background-surface token', 'Match'],
  ['Active tab radius', `${T.rFull} (pill)`, 'border-radius: 9999px on active tab', 'No change — matches', 'Match'],
  ['Tab padding', `[${T.s2xs}, ${T.md}] = [8px vertical, 24px horizontal]`, 'Padding present — tabs are sized proportionally', 'Each tab: padding $spacing-2xs (8px) vertical, $spacing-md (24px) horizontal', 'Match'],
  ['Tab labels', 'All Types, Banking, Credit Cards, Investments, Loans — 5 tabs', 'All Types, Banking, Credit Cards, Investments, Loans', 'No change — same labels', 'Match'],
];

const tableHeaderRows = [
  ['Header fill', `${T.taupe100} — warm off-white`, 'rgba(0,0,0,0) — transparent (no background)', 'Add background: $color-taupe-100 (#F7F5F0) on table header row', 'Gap'],
  ['Header corner radius', `${T.r2xs} on ALL 4 corners — header is a standalone rounded bar`, 'Only top-left and top-right corners are rounded (inherited from table container 14px radius) — bottom corners are square', 'Set border-radius: $radius-2xs (8px) on all 4 corners of the header row itself (independent of table container)', 'Gap'],
  ['Header padding', '[10px, spacing-xs (12px)] — 10px top/bottom (custom), spacing-xs left/right on header row', '12px on individual th cells (row-level padding 0)', 'Set row-level padding: 10px $spacing-xs(12px). 10px vertical is custom (between spacing-2xs and spacing-xs)', 'Gap'],
  ['Column gap', `${T.sm} between columns`, '0px — columns touch edge-to-edge (causes visual crowding)', 'Add $spacing-sm (16px) gap between columns (or cell padding-right)', 'Gap'],
  ['Gap: header → first row', `${T.s2xs} space between header bar and first data row`, '0px — rows start immediately after header (no gap)', 'Add $spacing-2xs (8px) margin-bottom or gap after header row', 'Gap'],
  ['Header bottom border', `1px solid ${T.gray100} — bottom only`, 'Border present on table container, not header-specific', 'Set border-bottom: 1px solid $color-gray-100 (#EEEDEB) on header row only', 'Gap'],
  ['Header font size', 'typo-primary-xs-semibold (12px, weight 600, line-height 16px)', '14px (too large)', 'Reduce header font-size from 14px to 12px per $typo-primary-xs-semibold', 'Gap'],
  ['Header font weight', 'typo-primary-xs-semibold — 600 (semibold)', '700 (bold)', 'Reduce weight from 700 (bold) to 600 (semibold) per $typo-primary-xs-semibold-font-weight', 'Gap'],
  ['Header color', `${T.gray500}`, 'oklch(0.164 0 89.88) ≈ near-black (same as body text)', 'Change header text color to $color-gray-500 (#716E6A)', 'Gap'],
  ['Header letter-spacing', 'typo-primary-xs-semibold-letter-spacing = 0 (normal)', 'normal (no letter-spacing)', 'No change — matches token (letter-spacing: 0)', 'Match'],
  ['Sort icons', 'Lucide arrows 10×10, color-gray-500 (#716E6A)', '14×14 SVG sort icons, dark color', 'Reduce sort icons to 10×10 and set color to $color-gray-500 (#716E6A)', 'Gap'],
  ['Date column width', '44px fixed (custom design value)', '76px (nearly 2× design)', 'Reduce Date column from 76px to 44px', 'Gap'],
  ['Description column width', 'fill_container (flex grow — no fixed width)', '538px (fills remaining — correct behavior)', 'No change — flex grows correctly', 'Match'],
  ['Category column width', '130px fixed (custom design value)', '130px', 'No change — matches', 'Match'],
  ['Account column width', '140px fixed (custom design value)', '200px (too wide)', 'Reduce Account column from 200px to 140px', 'Gap'],
  ['Amount column width', '100px fixed, right-aligned (custom design value)', '130px, right-aligned', 'Reduce Amount column from 130px to 100px', 'Gap'],
];

const txnRowDescRows = [
  ['Row background', 'color-base-white (#FFFFFF) — no alternating stripe', 'Alternating zebra stripe: odd rows transparent, even rows oklch(0.164 0 89.88 / 0.02) — subtle 2% gray tint', 'Remove nth-child alternating background; all rows should be $color-base-white', 'Gap'],
  ['Row height', '~60px (derived from spacing-xs padding + content — no fixed token)', '64px row height', 'Reduce row height slightly — derive from padding + content, not hardcoded height', 'Gap'],
  ['Cell padding (td)', `${T.xs} (12px)`, '12px on each td', 'No change — value matches. Ensure dev uses $spacing-xs token, not hardcoded 12px', 'Match'],
  ['Column gap', `${T.sm} between cells`, '0px gap between cells (columns touch)', 'Add $spacing-sm (16px) gap between cells', 'Gap'],
  ['Row bottom border', `1px solid ${T.gray100} — divider between rows`, '1px solid oklch(0.164 0 89.88 / 0.06) — very faint divider', 'Use $color-gray-100 (#EEEDEB) for row dividers', 'Match'],
  ['Avatar size', '32×32px (custom design value — no token)', '28×28px (smaller than design)', 'Increase avatar from 28px to 32px', 'Gap'],
  ['Avatar corner radius', '6px (custom — between radius-4xs=2 and radius-2xs=8)', '9999px (full circle — design is slightly rounded square)', 'Change border-radius from circle to 6px rounded square', 'Gap'],
  ['Avatar border', `1px solid ${T.gray100} — stroke inner`, 'No visible border on avatar', 'Add border: 1px solid $color-gray-100 (#EEEDEB) on avatar', 'Gap'],
  ['Avatar ↔ name gap', '10px (custom — between spacing-2xs=8 and spacing-xs=12)', 'Gap present — appears ~8-10px', 'Set gap: 10px in description cell (custom value, no exact token)', 'Match'],
  ['Description font weight', 'typo-primary-sm-semibold (14px, weight 600, line-height 20px)', '14px weight 400 (regular — NOT semibold)', 'Change font-weight from 400 to 600 per $typo-primary-sm-semibold-font-weight', 'Gap'],
  ['Description color', `${T.gray700}`, 'rgb(45, 41, 38) = #2D2926 (close but not exact — should be #403D3A)', 'Use exact $color-gray-700 (#403D3A) token', 'Gap'],
];

const txnRowDateRows = [
  ['Date layout', 'Vertical stack, width 44px (custom design value), center-aligned', 'Vertical stack present — inner div IS 44px (w-[44px]) but td cell is 76px wide', 'Reduce td cell width from 76px to match inner 44px content (remove extra cell padding)', 'Gap'],
  ['Month font-size', 'typo-primary-2xs-regular (Heebo 10px, weight 400, line-height 14px)', '11px (text-[11px]) — 1px larger than design', 'Reduce month font-size from 11px to 10px per $typo-primary-2xs-regular-font-size', 'Gap'],
  ['Month color', `${T.gray500}`, '#716E6A (text-[#716E6A]) — correct, matches $color-gray-500', 'No change — matches $color-gray-500 token', 'Match'],
  ['Month casing', '"May" (sentence case — no text-transform)', '"MAY" — CSS text-transform: uppercase applied', 'Remove text-transform: uppercase from month span; display natural "May"', 'Gap'],
  ['Day font-size', 'typo-primary-md-semibold (Heebo 18px, weight 600, line-height 26px)', '15px (text-[15px]) — 3px smaller than design', 'Increase day font-size from 15px to 18px per $typo-primary-md-semibold-font-size', 'Gap'],
  ['Day font-weight', 'typo-primary-md-semibold — 600 (semibold)', 'font-semibold (600)', 'No change — matches $typo-primary-md-semibold-font-weight', 'Match'],
  ['Day color', `${T.gray700}`, '#2D2926 (text-[#2D2926]) — close but NOT exact gray-700', 'Change to exact $color-gray-700 (#403D3A) token', 'Gap'],
];

const txnRowCatAcctRows = [
  ['Category font', 'typo-primary-sm-regular (Heebo 14px, weight 400, line-height 20px)', '14px weight 400', 'No change — values match. Ensure dev uses $typo-primary-sm-regular token set', 'Match'],
  ['Category color', `${T.gray500}`, 'oklch(0.164 0 89.88) ≈ near-black #0E0E0E (NOT gray-500)', 'Change category text color from near-black to $color-gray-500 (#716E6A)', 'Gap'],
  ['Category width', '130px fixed (custom design value)', '130px', 'No change — matches', 'Match'],
  ['Category content', '"Food & Drink", "Income", "Entertainment" — Plaid categories', '"General Services", "Income", "Payroll" — labels present', 'Use Plaid personal_finance_category detail label', 'Match'],
  ['Account font', 'typo-primary-sm-regular (Heebo 14px, weight 400, line-height 20px)', '14px weight 400', 'No change — values match. Ensure dev uses $typo-primary-sm-regular token set', 'Match'],
  ['Account color', `${T.gray500}`, 'oklch(0.164 0 89.88) ≈ near-black #0E0E0E (NOT gray-500)', 'Change account text color from near-black to $color-gray-500 (#716E6A)', 'Gap'],
  ['Account width', '140px fixed (custom design value)', '200px (60px wider than design)', 'Reduce Account column from 200px to 140px', 'Gap'],
  ['Account format', '"WF Checking (x1234)" — short institution + type, mask in parentheses', '"Schwab One Brokerage Accountx3587" — full Plaid name, no space before mask, NO parentheses', 'Use short format: "{Institution} {SubType} (x{mask})" — parentheses around mask are required', 'Gap'],
];

const txnRowAmountRows = [
  ['Amount width', '100px fixed, right-aligned (custom design value)', '130px, right-aligned (text-align: right)', 'Reduce Amount column from 130px to 100px', 'Gap'],
  ['Negative amount color', `${T.textBody} — default dark text for withdrawals`, 'rgb(45, 41, 38) = #2D2926 (close to gray-700)', 'Use exact $colors-text-body / $color-gray-700 (#403D3A) token for negative amounts', 'Match'],
  ['Positive amount color', `${T.depositGreen}`, 'rgb(42, 125, 79) = #2A7D4F (different green shade)', 'Use exact $colors-text-deposit (#148338) token for positive amounts', 'Gap'],
  ['Pending amount color', `${T.orange600} for pending transactions`, 'Not visible in current data (no pending txns loaded)', 'Ensure pending transactions use $color-orange-600 token', 'Verify'],
  ['Amount font', 'typo-primary-sm-regular (Heebo 14px, weight 400, line-height 20px) — inherits from MoneyText', '14px weight 400', 'No change — values match. Ensure dev uses $typo-primary-sm-regular token set', 'Match'],
];

const responsiveTableRows = [
  ['Column visibility breakpoint', 'Desktop (5 cols): DATE, DESCRIPTION, CATEGORY, ACCOUNT, AMOUNT. Mobile (4 cols): hide CATEGORY only', 'Desktop (5 cols) → Mobile (3 cols): hides both CATEGORY and ACCOUNT columns below breakpoint', 'At mobile breakpoint, hide only CATEGORY — keep ACCOUNT visible', 'Gap'],
  ['Description truncation', 'Text should wrap or fill available space — never truncate with ellipsis', 'At ≤1024px viewport, DESCRIPTION truncates with "..." (e.g. "SWVXX I...", "Wall Stree...")', 'Remove text-overflow: ellipsis; allow text to wrap or increase min-width', 'Gap'],
  ['Account name truncation', 'Full short-format account name visible (e.g. "WF Checking (x1234)")', 'Account names truncated at narrow widths — "Schwab One Brokerage Accou" cut off', 'Use short account format AND ensure no text truncation', 'Gap'],
  ['Column min-widths', 'Columns should maintain readable minimum widths', 'Columns compress freely — no min-width constraints causing text overflow', 'Set min-width on each column to prevent unreadable truncation', 'Gap'],
  ['Table horizontal scroll', 'Design does not show horizontal scroll — table fits container', 'Table overflows container at narrow viewports without scrolling', 'Add overflow-x: auto on table container for graceful handling', 'Gap'],
  ['Mobile text wrapping', 'At mobile widths, text wraps to multiple lines (row height grows)', 'white-space: nowrap at ALL viewports — text never wraps, always truncates', 'Switch to white-space: normal below mobile breakpoint to allow wrapping', 'Gap'],
];

const tabletResponsiveRows = [
  ['Header overlap (768–1024px)', 'Column headers must never overlap — reduce columns or allow scroll', 'DESCRIPTION column collapses to 10px at 900px → header text "DESCRIPTION" overlaps "CATEGORY" header', 'Add min-width: 120px on DESCRIPTION column OR hide CATEGORY at ≤1024px', 'Gap'],
  ['DESCRIPTION column collapse', 'DESCRIPTION always visible and readable (most important column)', 'At 900px: DESCRIPTION width = 10px (invisible). CATEGORY takes its space with 130px.', 'DESCRIPTION must have min-width priority over CATEGORY — reverse column priority', 'Gap'],
  ['AMOUNT column cut off (768px)', 'AMOUNT column always visible regardless of viewport', 'At 768px with chat open: only DATE column visible. Chat panel consumes >50% viewport', 'Chat panel must collapse/hide at ≤1024px or use a bottom drawer pattern', 'Gap'],
  ['Chat panel at tablet widths', 'Chat should collapse to icon/button at tablet widths (≤1024px)', 'Chat panel renders at full width (~350px) at all viewport sizes, stealing space from table', 'Auto-collapse chat panel below 1024px; show only the "Open chat" button', 'Gap'],
  ['Column transition strategy', 'Graceful transition: 5 cols → 4 cols → 3 cols at defined breakpoints', 'Abrupt jump from 5 cols (with collapsed DESCRIPTION) straight to 3 cols at <640px', 'Add intermediate 4-column breakpoint (hide CATEGORY at ≤1024px, then hide ACCOUNT at ≤640px)', 'Gap'],
  ['Sidebar + table conflict', 'Sidebar must not force table content below readable minimum', 'At 768px with sidebar: sidebar (180px) + 5-col table = content overflow/collapse', 'Collapse sidebar to icon rail at ≤1024px, or hide entirely', 'Gap'],
];

const hoverStateRows = [
  ['Row background on hover', `TransactionRow/hover (O:tzdWt) — ${T.taupe100} background (pronounced contrast)`, 'rgb(248, 247, 246) via --color-gray-50 (#F8F7F6) — extremely subtle, nearly invisible against white', 'Use $color-taupe-100 (#F7F5F0) not $color-gray-50 for more visible hover feedback', 'Gap'],
  ['Row corner radius on hover', `TransactionRow hover applies ${T.r2xs}`, 'No border-radius change on hover (stays rectangular)', 'Add border-radius: $radius-2xs (8px) on hover state', 'Gap'],
  ['Cursor', 'pointer', 'pointer (cursor: pointer on .eg-row-clickable)', 'No change — matches', 'Match'],
  ['Transition', 'Smooth background transition (motion token)', 'Transition present via CSS', 'No change — matches', 'Match'],
];

const pressedStateRows = [
  ['Row background on press', 'TransactionRow/pressed (O:MSEcE) — color-taupe-200 or deeper warm fill (darker than hover taupe-100)', 'No :active CSS rule exists — hover and pressed render identically at rgb(248, 247, 246)', 'Add :active pseudo-class with TransactionRow/pressed fill — use deeper token than $color-taupe-100', 'Gap'],
  ['Visual feedback', 'Visible press confirmation — background must be visually darker than hover state', 'No pressed state differentiation — user gets no visual confirmation of tap/click', 'Add separate :active background (e.g., $color-taupe-200 or color-gray-100) darker than hover', 'Gap'],
];

const detailPopupShellRows = [
  ['Popup width', '560px (custom design value — no token)', 'Detail popup not triggered via CDP — unable to measure (click blocked)', 'Set transaction detail popup width: 560px', 'Verify'],
  ['Popup corner radius', `${T.rXs}`, 'Not measurable — popup not triggered', 'Set border-radius: $radius-xs (16px)', 'Verify'],
  ['Popup shadow', 'shadow-lg (Hemlock shadow token), color #0000001a', 'Not measurable — popup not triggered', 'Use $shadow-lg token with #0000001a color', 'Verify'],
  ['Popup fill', `${T.bgSurface}`, 'Not measurable — popup not triggered', 'Set background: $colors-background-surface (#FFFFFF)', 'Verify'],
  ['Popup position', 'Absolute, x:440 y:140 from container (design-specific position)', 'Not measurable — popup not triggered', 'Position popup at center-right of viewport', 'Verify'],
  ['Body padding', `${T.xl} all sides`, 'Not measurable — popup not triggered', 'Set padding: $spacing-xl (40px) inside popup body', 'Verify'],
  ['Section gap', `${T.lg} between sections`, 'Not measurable — popup not triggered', 'Set gap: $spacing-lg (32px) between title/amount/detail sections', 'Verify'],
  ['Backdrop overlay', '#00000066 (40% black) covers main content', 'Not measurable — popup not triggered', 'Apply semi-transparent black overlay (#00000066) behind popup', 'Verify'],
];

const detailPopupContentRows = [
  ['Title section padding', `[0, ${T.sm}] = [0, 16px] sides`, 'Not measurable — popup not triggered', 'Set title section padding: 0 $spacing-sm (16px)', 'Verify'],
  ['Title ↔ content gap', `${T.xs} within title section`, 'Not measurable — popup not triggered', 'Set gap: $spacing-xs (12px) in title section', 'Verify'],
  ['Amount section padding', `[0, ${T.sm}] = [0, 16px] sides`, 'Not measurable — popup not triggered', 'Set amount section padding: 0 $spacing-sm (16px)', 'Verify'],
  ['Amount section gap', `${T.s3xs} between label and value`, 'Not measurable — popup not triggered', 'Set gap: $spacing-3xs (4px) between amount label and value', 'Verify'],
  ['Detail sections', 'DetailSection pattern — same as Account detail (Hemlock pKk6B)', 'Not measurable — popup not triggered', 'Use Hemlock DetailSection component for structured data', 'Verify'],
  ['Deposit popup', `Same layout, positive ${T.depositGreen} for amount`, 'Not measurable — popup not triggered', 'Use MoneyText/positive with $colors-text-deposit (#148338) for deposit amounts', 'Verify'],
];

const mobileDefaultRows = [
  ['Page title', '"Activity" only on mobile (shorter than desktop)', '"Net Worth | Activity" — same as desktop, not shortened for mobile', 'Shorten title to just "Activity" on mobile viewport', 'Gap'],
  ['Column count', '4 columns visible: DATE, DESCRIPTION, ACCOUNT, AMOUNT (Category hidden)', 'Only 3 columns: DATE, DESCRIPTION, AMOUNT — ACCOUNT column is hidden', 'Show ACCOUNT column on mobile between DESCRIPTION and AMOUNT', 'Gap'],
  ['Text wrapping', 'Text wraps to multiple lines — "Whole Foods Market", "Transfer: Savings Deposit" wrap freely', 'white-space: nowrap + text-overflow: ellipsis on all cells — text truncates instead of wrapping', 'Remove truncation CSS on mobile; set white-space: normal to allow multi-line text', 'Gap'],
  ['Filter tabs overflow', 'Tabs scroll horizontally — "Investm..." partially visible indicating scrollability', 'Only 3 tabs visible (All Types, Banking, Credit Cards) — rest cut off, no scroll', 'Add overflow-x: auto on filter tab container at mobile widths', 'Gap'],
  ['"Show More" button', '"Show More" link visible at bottom of transaction list', '"Show More" button present (confirmed in accessibility tree)', 'No change — matches', 'Match'],
  ['Date casing (mobile)', '"Jul", "Jun", "May" — sentence case month', '"MAY" — uppercase via CSS text-transform', 'Remove text-transform: uppercase; show sentence case on mobile', 'Gap'],
  ['Table header (mobile)', `DATE ↕, DESCRIPTION ↕, ACCOUNT ↕, AMOUNT ↕ — header text in ${T.gray500}`, 'DATE ↓, DESCRIPTION ↕, AMOUNT ↕ — dark header text, Account header missing', 'Add ACCOUNT column header; use $color-gray-500 (#716E6A) for header text', 'Gap'],
  ['Row height (mobile)', 'Variable — taller rows for wrapping text (≥60px)', '~52px fixed row height per visible row', 'Allow rows to grow with content; minimum 44px for touch targets', 'Gap'],
  ['Content area padding', `${T.sm} horizontal padding`, 'Content has 16px horizontal padding (correct)', 'No change — value matches. Ensure dev uses $spacing-sm (16px) token', 'Match'],
];

const mobileAccountSelectRows = [
  ['Dropdown style', 'Full-screen overlay dropdown — takes over the content area with backdrop', 'Inline dropdown below selector — overlaps table rows, does not take full screen', 'Convert to full-screen overlay/sheet pattern on mobile', 'Gap'],
  ['Category headers', 'Uppercase section headers: "BANKING", "CREDIT CARDS", "INVESTMENTS", "LOANS"', 'Uppercase category headers present and correct (BANKING, CREDIT CARDS, INVESTMENTS)', 'No change — matches', 'Match'],
  ['Account format in dropdown', '"{Institution} {Type} (x{mask})" — e.g. "Chase Sapphire Checking (x4821)"', '"Chase Private Client Checking (x4821)" etc. — format matches', 'No change — matches', 'Match'],
  ['Selected state', `"All Accounts" highlighted with ${T.taupe100} background (rectangular pill)`, '"All Accounts" highlighted with taupe/beige background', 'No change — matches. Ensure dev uses $color-taupe-100 (#F7F5F0) token', 'Match'],
  ['Chevron direction', 'Up-chevron (∧) when dropdown is open', 'Up-chevron visible when dropdown is open', 'No change — matches', 'Match'],
  ['Scrollbar visibility', 'Thin scrollbar (5px) visible when list overflows — design shows scroll indicator', 'No visible scrollbar — dropdown extends below fold, user must scroll entire page', 'Add max-height with overflow-y: auto and thin scrollbar indicator', 'Gap'],
  ['Dropdown width', 'Full-width (fills content area minus padding)', 'Dropdown width matches selector width (~270px) — correct', 'No change — matches', 'Match'],
];

const mobileDetailRows = [
  ['Presentation style', 'Bottom sheet (slides up from bottom) — top corners rounded, rest of screen visible with dark backdrop', 'Left-side panel/drawer — pushes into content area inline, no dark backdrop, no bottom sheet animation', 'Convert to bottom sheet pattern on mobile with slide-up animation', 'Gap'],
  ['Backdrop overlay', '#000000 at 50% opacity (confirmed: bottomSheet backdrop opacity=0.5)', 'No backdrop overlay — table content visible behind/below the detail panel', 'Add backdrop: rgba(0,0,0,0.5) when detail panel is open', 'Gap'],
  ['Top corner radius', 'radius-md (24px) on top-left and top-right corners — confirmed: $O:radius-md = 24', 'No visible corner radius on detail panel', 'Add border-radius: $radius-md (24px) on top-left and top-right corners of bottom sheet', 'Gap'],
  ['Header', 'Merchant logo (32px) + merchant name (typo-primary-base-semibold: 16px/600) + close button (X) at top-right', 'Letter avatar (circle, 32px) + merchant name (16px semibold) + X button — correct', 'No change — values match. Ensure name uses $typo-primary-base-semibold token', 'Match'],
  ['Amount display', '"TRANSACTION AMOUNT" label (typo-primary-xs-semibold: 12px uppercase) above amount value (typo-primary-lg-bold)', '"TRANSACTION AMOUNT" label + large bold amount — correct layout', 'No change — matches. Use $typo-primary-xs-semibold for label, $typo-primary-lg-bold for value', 'Match'],
  ['Deposit amount color', `${T.depositGreen} for positive amounts`, '+$1,153.51 rendered in green — correct', 'No change — matches. Ensure dev uses $colors-text-deposit (#148338) token', 'Match'],
  ['Withdrawal amount color', `${T.textBody} for negative amounts`, '-$50.90 rendered in dark text — correct', 'No change — matches. Ensure dev uses $colors-text-body (#403D3A) token', 'Match'],
  ['Detail sections', '3 sections: "Transaction Details", "Merchant Details", "Classification" — each with color-taupe-100 (#F7F5F0) header bar', 'All 3 sections present with taupe/beige background header bars', 'No change — matches. Ensure header bars use $color-taupe-100 token', 'Match'],
  ['Transaction fields', 'Transaction ID, Amount, Currency, Date Processed, Date Authorized — key/value pairs', 'All fields present with correct key/value layout', 'No change — matches', 'Match'],
  ['Transaction ID truncation', 'Full ID visible or accessible', 'ID truncates with "..." (bank:tj__user-6f03d6d8-6...)', 'Allow wrapping or add copy-to-clipboard for full ID', 'Gap'],
  ['Panel width', 'Bottom sheet spans full viewport width (minus padding)', 'Panel is ~270px — does not fill full 390px viewport width', 'Bottom sheet should span full viewport width', 'Gap'],
];

const devFiles = [
  ['Page layout', 'apps/web/src/features/pfm-activity/index.tsx'],
  ['Transaction table', 'apps/web/src/features/pfm-activity/components/transaction-table.tsx'],
  ['Transaction row', 'apps/web/src/features/pfm-activity/components/transaction-row.tsx'],
  ['Account selector', 'apps/web/src/features/pfm-activity/components/account-selector.tsx'],
  ['Category filter', 'apps/web/src/features/pfm-activity/components/category-filter.tsx'],
  ['Transaction detail', 'apps/web/src/features/pfm-activity/components/transaction-detail.tsx'],
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

function compareSection(num, title, subtitle, designImg, devImg, devCrop, tableHtml, devNote = '', designCrop = '', designNote = '') {
  const devStyle = devCrop ? `style="${devCrop}"` : '';
  const designStyle = designCrop ? `style="${designCrop}"` : '';
  const devPanel = devImg
    ? `<img src="${devImg}" alt="Dev: ${title}" ${devStyle} />`
    : `<div class="dev-note">${devNote || 'Dev screenshot needed — capture from app.eg-dev.ai/net-worth/activity'}</div>`;
  const designPanel = designImg
    ? `<img src="${designImg}" alt="Design: ${title}" ${designStyle} />`
    : `<div class="dev-note">${designNote || 'Design export needed.'}</div>`;
  return `
  <section class="page" id="s${num}">
    <h2>${num}. ${title}</h2>
    <p class="subtitle">${subtitle}</p>
    <div class="compare">
      <div class="panel design-panel">
        <div class="panel-label design">Design — pfm-activity-v2.pen</div>
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
  ...pageTitleRows,
  ...accountSelectorRows,
  ...accountSelectorDropdownRows,
  ...filterTabsRows,
  ...tableHeaderRows,
  ...txnRowDescRows,
  ...txnRowDateRows,
  ...txnRowCatAcctRows,
  ...txnRowAmountRows,
  ...responsiveTableRows,
  ...tabletResponsiveRows,
  ...hoverStateRows,
  ...pressedStateRows,
  ...detailPopupShellRows,
  ...detailPopupContentRows,
  ...mobileDefaultRows,
  ...mobileAccountSelectRows,
  ...mobileDetailRows,
];

const gapCount = masterRows.filter(([, , , , s]) => s === 'Gap').length;
const matchCount = masterRows.filter(([, , , , s]) => s === 'Match').length;
const checkCount = masterRows.filter(([, , , , s]) => s === 'Verify').length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>PFM Activity v2 — Design vs Dev</title>
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
    .panel img { display: block; width: 100%; height: auto; background: #ffffff; }
    .panel-label { padding: 7px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid var(--line); }
    .panel-label.design { background: #edf7f1; color: var(--design); }
    .panel-label.dev { background: #fdecec; color: var(--dev); }
    .compare-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 14px; }
    .compare-grid .col { border: 1px solid var(--line); overflow: hidden; background: #fff; }
    .compare-grid .col h3 { padding: 7px 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; border-bottom: 1px solid var(--line); background: #f8f8f8; margin: 0; }
    .compare-grid .col img { display: block; width: 100%; height: auto; }
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
    .side-nav-title.t-states { color: #b8860b; }
    .side-nav-title.t-detail { color: #0891b2; }
    .side-nav-title.t-mobile { color: #7c3aed; }
    .side-nav-title.t-ref { color: #2563eb; }
    .nav-link { display: block; padding: 5px 8px; border-radius: 6px; font-size: 12px; font-weight: 400; color: var(--text); text-decoration: none; transition: background 0.12s; line-height: 1.35; }
    .nav-link:hover { background: #eae7e1; }
    .nav-top { font-weight: 600; font-size: 13px; padding: 8px 8px; margin-bottom: 8px; border-bottom: 1px solid var(--line); border-radius: 0; color: #1a1a1a; }
    .nav-sub { display: block; font-size: 10px; font-weight: 600; color: #78716c; padding: 4px 8px 2px; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.04em; }
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
    <span class="side-nav-title t-list">Activity list</span>
    <span class="nav-sub">Desktop</span>
    <a href="#s1" class="nav-link">1. Layout &amp; spacing</a>
    <a href="#s2" class="nav-link">2. Page title</a>
    <a href="#s3" class="nav-link">3. Account selector (closed)</a>
    <a href="#s3b" class="nav-link">3b. Selector dropdown states</a>
    <a href="#s4" class="nav-link">4. Category filter tabs</a>
    <a href="#s5" class="nav-link">5. Table header</a>
    <a href="#s6" class="nav-link">6. Txn row — description</a>
    <a href="#s7" class="nav-link">7. Txn row — date</a>
    <a href="#s8" class="nav-link">8. Txn row — cat &amp; account</a>
    <a href="#s9" class="nav-link">9. Txn row — amount</a>
    <a href="#s10" class="nav-link">10. Responsive truncation</a>
    <a href="#s11" class="nav-link">11. Tablet — header overlap</a>
    <span class="side-nav-title t-states">Row states</span>
    <span class="nav-sub">Desktop</span>
    <a href="#s12" class="nav-link">12. Hover state</a>
    <a href="#s13" class="nav-link">13. Pressed state</a>
    <span class="side-nav-title t-detail">Transaction detail</span>
    <span class="nav-sub">Desktop</span>
    <a href="#s14" class="nav-link">14. Detail popup — shell</a>
    <a href="#s15" class="nav-link">15. Detail popup — content</a>
    <span class="side-nav-title t-mobile">Mobile (390px)</span>
    <a href="#s16" class="nav-link">16. Default layout</a>
    <a href="#s17" class="nav-link">17. Account selector</a>
    <a href="#s18" class="nav-link">18. Transaction detail</a>
    <span class="side-nav-title t-ref">Reference</span>
    <a href="#s19" class="nav-link">19. Files to change</a>
    <a href="#s20" class="nav-link">20. Master checklist</a>
  </nav>
  <div class="doc">
    <header class="cover" id="top">
      <h1>PFM Activity v2 — Design vs Dev</h1>
      <p class="purpose">This document identifies every formatting difference between the approved Pencil designs and the current dev implementation on <code>app.eg-dev.ai/net-worth/activity</code>. Use it as a checklist to bring dev into pixel-perfect alignment with design.</p>

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
        <li><strong>Hemlock components.</strong> Transaction rows use <code>TransactionRow</code>, amounts use <code>MoneyText</code>, account selector uses <code>Select</code> — all from the Hemlock component library.</li>
        <li><strong>Account format.</strong> Account column shows short form: "{Institution} {SubType} (x{mask})" — not the full Plaid account name.</li>
        <li><strong>Date format.</strong> Sentence-case month ("May" not "MAY") with large day number below.</li>
      </ul>

      <h3>Sources</h3>
      <ul class="how-to">
        <li><strong>Design:</strong> <code>pfm-activity-v2.pen</code> (7 desktop frames + 6 mobile frames)</li>
        <li><strong>Dev:</strong> <code>app.eg-dev.ai/net-worth/activity</code> on develop branch</li>
        <li><strong>Tokens:</strong> <code>hemlock-library.lib.pen</code></li>
      </ul>
    </header>

    ${compareSection('1', 'Layout &amp; spacing', 'Content column padding and vertical rhythm — contentColumn P0KOT8', images.designDefault, images.devFull, 'object-fit:cover;object-position:25% 0%;max-height:500px;', table(layoutRows))}

    ${compareSection('2', 'Page title', '"Net Worth | Activity" header bar — headerRef YRPZr', images.designDefault, images.devFull, 'object-fit:cover;object-position:25% 0%;max-height:120px;', table(pageTitleRows), '', 'object-fit:cover;object-position:25% 0%;max-height:120px;')}

    <section class="page" id="s3">
      <h2>3. Account selector — closed state</h2>
      <p class="subtitle">Hemlock Select component (O:jncEi) — "All Accounts" dropdown — Q5tbaN</p>
      <div class="compare-grid">
        <div class="col"><h3>Design (default closed)</h3><img src="${images.designDefault}" style="object-fit:cover;object-position:15% 5%;max-height:140px;" /></div>
        <div class="col"><h3>Dev (default closed)</h3><img src="${images.devSelectDefaultClosed}" style="object-fit:cover;object-position:15% 5%;max-height:140px;" /></div>
        <div class="col"><h3>Dev (account selected closed)</h3><img src="${images.devSelectAccountSelected}" style="object-fit:cover;object-position:15% 5%;max-height:140px;" /></div>
      </div>
      ${table(accountSelectorRows)}
    </section>

    <section class="page" id="s3b">
      <h2>3b. Account selector — dropdown states</h2>
      <p class="subtitle">Open dropdown with selected option, hover state, and re-selection behavior</p>
      <div class="compare-grid">
        <div class="col"><h3>Design — dropdown open (selected)</h3><img src="${images.designAccountSelected}" style="object-fit:cover;object-position:5% 3%;max-height:500px;" /></div>
        <div class="col"><h3>Dev — dropdown open (All Accounts)</h3><img src="${images.devSelectOpen}" style="object-fit:cover;object-position:5% 3%;max-height:500px;" /></div>
      </div>
      <div class="compare-grid" style="margin-top:14px;">
        <div class="col"><h3>Design — account hovered</h3><img src="${images.designAccountHovered}" style="object-fit:cover;object-position:5% 3%;max-height:500px;" /></div>
        <div class="col"><h3>Dev — account hovered</h3><img src="${images.devSelectHover}" style="object-fit:cover;object-position:5% 3%;max-height:500px;" /></div>
      </div>
      <div class="compare-grid" style="margin-top:14px;">
        <div class="col"><h3>Dev — re-selection (checkmark on current)</h3><img src="${images.devSelectReselection}" style="object-fit:cover;object-position:5% 3%;max-height:500px;" /></div>
      </div>
      ${table(accountSelectorDropdownRows)}
      <p class="note"><strong>Major difference:</strong> Design uses a <strong>dark/inverted pill</strong> (near-black background, white text) to indicate the selected item in the dropdown. Dev uses a <strong>light beige</strong> background (rgb 237,234,227) with dark text plus a checkmark icon. The design communicates selection purely through color inversion — no checkmark is present.</p>
    </section>

    ${compareSection('4', 'Category filter tabs', 'Segmented control — All Types / Banking / Credit Cards / Investments / Loans — A6epW', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 12%;max-height:130px;', table(filterTabsRows), '', 'object-fit:cover;object-position:30% 12%;max-height:130px;')}

    ${compareSection('5', 'Table header', 'Column labels with sort icons — tableHeader T8Ao4', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 16%;max-height:120px;', table(tableHeaderRows), '', 'object-fit:cover;object-position:30% 16%;max-height:120px;')}

    ${compareSection('6', 'Transaction row — description', 'Avatar + merchant name cell — descCell ldFZ5 in txWholeFoods', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 25%;max-height:200px;', table(txnRowDescRows), '', 'object-fit:cover;object-position:30% 25%;max-height:200px;')}

    ${compareSection('7', 'Transaction row — date', 'Date column with month + day stack — dateStack RAj0k', images.designDefault, images.devFull, 'object-fit:cover;object-position:20% 30%;max-height:250px;', table(txnRowDateRows), '', 'object-fit:cover;object-position:20% 30%;max-height:250px;')}

    ${compareSection('8', 'Transaction row — category &amp; account', 'Category and account text cells — 14px regular gray-500', images.designDefault, images.devFull, 'object-fit:cover;object-position:50% 30%;max-height:250px;', table(txnRowCatAcctRows), '', 'object-fit:cover;object-position:50% 30%;max-height:250px;')}

    ${compareSection('9', 'Transaction row — amount', 'MoneyText component — positive (green), negative (dark), pending (orange)', images.designDefault, images.devFull, 'object-fit:cover;object-position:85% 30%;max-height:250px;', table(txnRowAmountRows), '', 'object-fit:cover;object-position:85% 30%;max-height:250px;')}

    ${compareSection('10', 'Responsive table — truncation issues', 'At viewports ≤1024px, description and account text truncate with ellipsis', images.designDefault, images.devNarrow, 'object-fit:cover;object-position:30% 25%;max-height:400px;', table(responsiveTableRows), '<p class="note"><strong>Key finding:</strong> At 1280px (clean screenshot, primary reference) all columns render without truncation. At ≤1024px, DESCRIPTION and ACCOUNT columns aggressively truncate text with "..." — this does not match the design intent where text wraps or columns maintain minimum widths.</p>', 'object-fit:cover;object-position:30% 25%;max-height:400px;')}

    <section class="page" id="s11">
      <h2>11. Tablet responsive — header overlap &amp; column collapse</h2>
      <p class="subtitle">Between 640px and 1024px, the DESCRIPTION column collapses causing header text overlap and invisible content</p>
      <div class="compare-grid">
        <div class="col"><h3>768px — Chat open (broken)</h3><img src="${images.devTablet768}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>768px — Chat closed (overlap visible)</h3><img src="${images.devTablet768ChatClosed}" style="${modalCompareStyle}" /></div>
      </div>
      <div class="compare-grid" style="margin-top:24px;">
        <div class="col"><h3>900px — DESCRIPTION at 10px width</h3><img src="${images.devTablet900}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>640px — 3-column layout (no overlap)</h3><img src="${images.devTablet640}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(tabletResponsiveRows)}
      <p class="note"><strong>Critical finding:</strong> The 3-column breakpoint fires at &lt;640px, but between 640–1024px the 5-column layout persists. The DESCRIPTION column has no min-width and shrinks to 10px at 900px, making it invisible while its header text overflows into the adjacent CATEGORY header. The chat panel exacerbates this at 768px by consuming &gt;50% of the viewport.</p>
    </section>

    ${compareSection('12', 'Hover state', 'TransactionRow/hover (O:tzdWt) — warm background on pointer hover', images.designTxnHovered, images.devHover, modalCompareStyle, table(hoverStateRows), 'Hover any transaction row in dev to compare background color and radius.', modalCompareStyle)}

    ${compareSection('13', 'Pressed state', 'TransactionRow/pressed (O:MSEcE) — deeper background on click/active', images.designTxnPressed, images.devPressed, modalCompareStyle, table(pressedStateRows), 'Press and hold a transaction row — the background should deepen beyond hover.', modalCompareStyle)}

    ${compareSection('14', 'Detail popup — shell', 'Transaction detail overlay — popup Qjfm2 (560×905, radius-xs, shadow-lg)', images.designTxnSelectedPopup, images.devDetailWithdrawal, modalCompareStyle, table(detailPopupShellRows), '', modalCompareStyle)}

    <section class="page" id="s15">
      <h2>15. Detail popup — content</h2>
      <p class="subtitle">Title section, amount section, and detail sections inside popup — QXsSg</p>
      <div class="compare-grid">
        <div class="col"><h3>Design (target)</h3><img src="${images.designDepositPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>Dev — Withdrawal</h3><img src="${images.devDetailWithdrawal}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>Dev — Deposit</h3><img src="${images.devDetailDeposit}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(detailPopupContentRows)}
      <p class="note">Design has two detail popup variants: <strong>withdrawal</strong> (bAspM) shows negative amount in default dark text; <strong>deposit</strong> (bDcIO) shows positive amount in green (#148338). Both use the same layout structure.</p>
    </section>

    ${compareSection('16', 'Mobile — Default layout', 'Activity list at 390px viewport — design v4sVMe / TrawO', images.designMobileDefault, images.devMobileDefault, modalCompareStyle, table(mobileDefaultRows), '', modalCompareStyle)}

    ${compareSection('17', 'Mobile — Account selector', 'Account dropdown at mobile — ie8B0 / g1e3f with scrollbar', images.designMobileAccountSelect, images.devMobileAccountSelect, modalCompareStyle, table(mobileAccountSelectRows), '', modalCompareStyle)}

    <section class="page" id="s18">
      <h2>18. Mobile — Transaction detail</h2>
      <p class="subtitle">Bottom sheet transaction detail — PcHUT with backdrop overlay</p>
      <div class="compare-grid">
        <div class="col"><h3>Design (target)</h3><img src="${images.designMobileTransactionDetail}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>Dev — Withdrawal</h3><img src="${images.devMobileDetailWithdrawal}" style="${modalCompareStyle}" /></div>
        <div class="col"><h3>Dev — Deposit</h3><img src="${images.devMobileDetailDeposit}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(mobileDetailRows)}
      <p class="note">Design specifies a <strong>bottom sheet</strong> pattern (slides up from bottom with rounded top corners and dark backdrop). Dev currently renders a left-side panel/drawer. The deposit variant shows +amount in green (#148338).</p>
    </section>

    <section class="page" id="s19">
      <h2>19. Files to change in js-mono</h2>
      <p class="subtitle">Map formatting fixes to implementation files on develop. File paths are approximate — verify in codebase.</p>
      ${fileTable()}
      <div class="note"><strong>Note:</strong> File paths above are estimates based on naming conventions. Verify actual paths in the <code>js-mono</code> repository. The Activity feature may live under <code>pfm-activity</code>, <code>activity</code>, or <code>net-worth/activity</code> depending on the project structure.</div>
    </section>

    <section class="page" id="s20">
      <h2>20. Master formatting checklist</h2>
      <p class="subtitle">Engineering sign-off — every row below must match design before merge.</p>
      ${table(masterRows)}
    </section>

    <p class="footer">Self-contained HTML — share this single file with engineering.<br/>Open in browser · Source: pfm-activity-v2.pen · app.eg-dev.ai/net-worth/activity</p>
  </div>
</body>
</html>`;

const out = path.join(dir, 'PFM-Activity-v2-Design-vs-Dev.html');
fs.writeFileSync(out, html);
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024 / 1024).toFixed(2)} MB)`);
