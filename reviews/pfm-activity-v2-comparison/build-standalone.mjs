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
  devFull: requireEmbed('assets/dev/full-page.png'),
  devHover: embed('assets/dev/hover-row.png'),
  devPressed: embed('assets/dev/pressed-row.png'),
  devDetailPopup: embed('assets/dev/modals/transaction-detail.png'),
  devMobileDefault: embed('assets/dev/mobile-default.png'),
  devMobileAccountSelect: embed('assets/dev/mobile-account-select.png'),
  devMobileDetail: embed('assets/dev/modals/transaction-detail-mobile.png'),
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
  ['Content column padding', `${T.md} vertical (20px top, 40px horizontal)`, 'Verify: padding on main content area', 'Apply padding: 20px top/bottom, 40px left/right on activity content column', 'Check'],
  ['Gap: content sections', `${T.md} (24px) between account selector, tabs, and table`, 'Verify: gap between major sections', 'Set gap-md (24px) between account selector → tabs → table', 'Check'],
  ['Table container corner radius', `${T.r2xs} (8px)`, 'Verify: table wrapper border-radius', 'Set border-radius: 8px on table container', 'Check'],
  ['Table internal gap', `${T.s2xs} (8px) between header and first row`, 'Verify: spacing between header and row list', 'Set gap: 8px between tableHeader and transactionList', 'Check'],
];

const pageTitleRows = [
  ['Title text', '"Net Worth | Activity" — page header', '"Net Worth | Activity"', 'No change — same copy', 'Match'],
  ['Title placement', 'Inside headerRef bar with padding [20,40,8,40]', 'Verify: header bar padding matches', 'Apply padding: 20px top, 40px sides, 8px bottom', 'Check'],
];

const accountSelectorRows = [
  ['Component', 'Hemlock `component/Select` ref (O:jncEi)', 'Custom dropdown (non-Hemlock)', 'Use Hemlock Select component ref', 'Gap'],
  ['Width', '375px fixed width', 'Full-width (fills container)', 'Set max-width: 375px on account selector', 'Gap'],
  ['Height', '58px', 'Verify current height', 'Set height: 58px', 'Check'],
  ['Corner radius', '8px', 'Verify', 'Set border-radius: 8px', 'Check'],
  ['Padding', '[0, 12, 0, 17] — asymmetric horizontal', 'Verify padding values', 'Set padding: 0 12px 0 17px', 'Check'],
  ['Label text', '"All Accounts" — typo-primary-base-regular (16px), weight normal', 'Verify: font-size and weight', 'Use 16px regular weight for selector label', 'Check'],
  ['Label color', `${T.textHeader} (#0E0E0E)`, 'Verify: text color', 'Use colors-text-header', 'Check'],
  ['Chevron icon color', '#8A8680 (gray muted)', 'Verify: chevron color', 'Set chevron fill to #8A8680', 'Check'],
];

const filterTabsRows = [
  ['Container shape', `${T.rFull} (pill) — segmented control`, 'Rounded tabs without pill container', 'Wrap tabs in pill-shaped container with radius-full', 'Gap'],
  ['Container fill', `${T.taupe100} (#F7F5F0) background`, 'No background fill on tab group', 'Add background: color-taupe-100 on tab container', 'Gap'],
  ['Container padding', `${T.s3xs} (4px) inner padding`, 'Verify', 'Set padding: 4px on tab container', 'Check'],
  ['Container width', '520px', 'Full-width or auto', 'Constrain tab container width to 520px', 'Gap'],
  ['Active tab fill', `${T.bgSurface} (#FFFFFF) with shadow-sm`, 'Verify: active tab background', 'Active tab: white fill + shadow-sm elevation', 'Check'],
  ['Active tab radius', `${T.rFull} (pill)`, 'Verify: active tab border-radius', 'Set radius-full on active tab', 'Check'],
  ['Tab padding', '[spacing-2xs, spacing-md] = [8px, 24px]', 'Verify: individual tab padding', 'Each tab: padding 8px vertical, 24px horizontal', 'Check'],
  ['Tab labels', 'All Types, Banking, Credit Cards, Investments, Loans — 5 tabs', 'All Types, Banking, Credit Cards, Investments, Loans', 'No change — same labels', 'Match'],
];

const tableHeaderRows = [
  ['Header fill', `${T.taupe100} (#F7F5F0) — warm off-white`, 'Verify: header background color', 'Set background: color-taupe-100 on table header', 'Check'],
  ['Header corner radius', '8px', 'Verify', 'Set border-radius: 8px on header row', 'Check'],
  ['Header padding', '[10px, 12px] vertical/horizontal', 'Verify: header cell padding', 'Set padding: 10px 12px on header row', 'Check'],
  ['Column gap', '16px between columns', 'Verify: gap between header cells', 'Set gap: 16px between columns', 'Check'],
  ['Header bottom border', `${T.gray100} 1px bottom only`, 'Verify: border under header', 'Set border-bottom: 1px solid color-gray-100', 'Check'],
  ['Header font', 'typo-primary-xs-semibold (12px weight 600) — uppercase', 'Verify: header text style', 'Use 12px semibold, uppercase, color-gray-500', 'Check'],
  ['Header color', `${T.gray500} (#716E6A)`, 'Verify: header text color', 'Set color: color-gray-500', 'Check'],
  ['Sort icons', 'Lucide arrows 10×10, color-gray-500', 'Sort arrows visible', 'Use 10×10 Lucide sort icons in gray-500', 'Check'],
  ['Date column width', '44px fixed', 'Verify', 'Set Date column: width 44px', 'Check'],
  ['Description column width', 'fill_container (flex grow)', 'Verify', 'Description column: flex-grow', 'Check'],
  ['Category column width', '130px fixed', 'Verify', 'Set Category column: width 130px', 'Check'],
  ['Account column width', '140px fixed', 'Verify', 'Set Account column: width 140px', 'Check'],
  ['Amount column width', '100px fixed, right-aligned', 'Verify', 'Set Amount column: width 100px, text-align right', 'Check'],
];

const txnRowDescRows = [
  ['Row padding', '12px all sides (spacing-xs)', 'Verify: row padding', 'Set padding: 12px on each transaction row', 'Check'],
  ['Row gap', '16px between cells', 'Verify: gap between row cells', 'Set gap: 16px between cells', 'Check'],
  ['Row bottom border', `${T.gray100} 1px — divider between rows`, 'Verify: row divider', 'Set border-bottom: 1px solid color-gray-100', 'Check'],
  ['Avatar size', '32×32px', 'Verify avatar dimensions', 'Set avatar: 32×32px', 'Check'],
  ['Avatar corner radius', '6px', 'Verify', 'Set avatar border-radius: 6px', 'Check'],
  ['Avatar border', `${T.gray100} 1px stroke inner`, 'Verify: avatar border', 'Set border: 1px solid color-gray-100 on avatar', 'Check'],
  ['Avatar ↔ name gap', '10px', 'Verify: space between avatar and text', 'Set gap: 10px in description cell', 'Check'],
  ['Description font', 'typo-primary-sm-semibold (14px weight 600)', 'Verify: merchant name font', 'Use 14px semibold for merchant/description name', 'Check'],
  ['Description color', `${T.gray700} (#403D3A)`, 'Verify: name text color', 'Set color: color-gray-700', 'Check'],
];

const txnRowDateRows = [
  ['Date layout', 'Vertical stack, width 44px, center-aligned', 'Verify: date cell layout', 'Date cell: vertical stack, 44px width, center aligned', 'Check'],
  ['Month text', 'typo-primary-2xs-regular (10px weight 400), color-gray-500', 'Verify: month text style', 'Month: 10px regular, color-gray-500 (e.g., "May")', 'Check'],
  ['Day number', 'typo-primary-md-semibold (18px weight 600), color-gray-700', 'Verify: day number style', 'Day: 18px semibold, color-gray-700 (e.g., "13")', 'Check'],
  ['Date format — design', '"May" + "13" (short month + day number)', '"MAY" + "30" (uppercase month + day number)', 'Use sentence-case month name ("May" not "MAY")', 'Gap'],
];

const txnRowCatAcctRows = [
  ['Category font', 'typo-primary-sm-regular (14px weight 400)', 'Verify: category text style', 'Category: 14px regular', 'Check'],
  ['Category color', `${T.gray500} (#716E6A)`, 'Verify: category text color', 'Set color: color-gray-500', 'Check'],
  ['Category width', '130px fixed', 'Verify', 'Set Category cell: 130px', 'Check'],
  ['Category content', '"Food & Drink", "Income", "Entertainment" — Plaid categories', 'Shows categories like "General Services", "Income"', 'Use Plaid personal_finance_category detail label', 'Check'],
  ['Account font', 'typo-primary-sm-regular (14px weight 400)', 'Verify: account text style', 'Account: 14px regular', 'Check'],
  ['Account color', `${T.gray500} (#716E6A)`, 'Verify: account text color', 'Set color: color-gray-500', 'Check'],
  ['Account width', '140px fixed', 'Verify', 'Set Account cell: 140px', 'Check'],
  ['Account format', '"WF Checking (x1234)" — short institution name + mask', '"Chase Sapphire Reserve x9104" — long name, no parens', 'Use short format: "{Institution} {SubType} (x{mask})"', 'Gap'],
];

const txnRowAmountRows = [
  ['Amount width', '100px fixed, right-aligned (justifyContent: end)', 'Verify: amount cell width and alignment', 'Set Amount cell: width 100px, text-align right', 'Check'],
  ['Negative amount', 'component/MoneyText (O:AXiZv) — "-$82.14", default color (gray-700)', '"-$50.90" — plain text, dark color', 'Use MoneyText component; negative = default dark text', 'Check'],
  ['Positive amount', 'component/MoneyText/positive (O:E9XA30) — "+$4,250.00", green (#148338)', '"+$675.30" — green color', 'Use MoneyText/positive ref; deposit amounts in green', 'Match'],
  ['Pending amount', 'component/MoneyText with color-orange-600 override — pending transactions', 'Verify: pending transaction color', 'Use color-orange-600 for pending transaction amounts', 'Check'],
  ['Amount font', 'MoneyText inherits typo-primary-sm-regular (14px weight 400)', 'Verify: amount font-size', 'Amount: 14px regular (inherits from MoneyText component)', 'Check'],
];

const hoverStateRows = [
  ['Row background', 'TransactionRow/hover (O:tzdWt) — warm background on hover', 'hover:bg-gray-50 or similar', 'Use Hemlock TransactionRow/hover component color token', 'Gap'],
  ['Row corner radius', 'Hemlock TransactionRow hover radius (likely 8px or radius-2xs)', 'Verify: hover radius', 'Match TransactionRow/hover corner radius', 'Check'],
  ['Cursor', 'pointer', 'pointer', 'No change', 'Match'],
  ['Transition', 'Smooth background transition', 'Verify', 'Add transition: background-color 0.15s ease', 'Check'],
];

const pressedStateRows = [
  ['Row background', 'TransactionRow/pressed (O:MSEcE) — deeper warm background on press', 'No distinct :active styling', 'Use Hemlock TransactionRow/pressed component color token', 'Gap'],
  ['Visual feedback', 'Darker background than hover — user confirmation of click', 'No pressed state visible', 'Add :active pseudo-class with TransactionRow/pressed fill', 'Gap'],
];

const detailPopupShellRows = [
  ['Popup width', '560px', 'Verify: detail drawer/popup width', 'Set transaction detail popup width: 560px', 'Check'],
  ['Popup corner radius', `${T.rXs} (radius-xs = 16px)`, 'Verify', 'Set border-radius: 16px (radius-xs)', 'Check'],
  ['Popup shadow', 'shadow-lg-blur, color #0000001a', 'Verify: popup elevation', 'Use shadow-lg with #0000001a color', 'Check'],
  ['Popup fill', `${T.bgSurface} (#FFFFFF)`, 'Verify: popup background', 'Set background: colors-background-surface (white)', 'Check'],
  ['Popup position', 'Absolute, x:440 y:140 from container', 'Verify: popup position/trigger', 'Position popup at center-right of viewport', 'Check'],
  ['Body padding', `${T.xl} (spacing-xl = 40px) all sides`, 'Verify: inner content padding', 'Set padding: 40px (spacing-xl) inside popup body', 'Check'],
  ['Section gap', `${T.lg} (spacing-lg = 32px) between sections`, 'Verify: gap between detail sections', 'Set gap: 32px (spacing-lg) between title/amount/detail sections', 'Check'],
  ['Backdrop overlay', '#00000066 (40% black) covers main content', 'Verify: overlay behind popup', 'Apply semi-transparent black overlay behind popup', 'Check'],
];

const detailPopupContentRows = [
  ['Title section padding', '[0, spacing-sm] = [0, 16px] sides', 'Verify', 'Set title section padding: 0 16px', 'Check'],
  ['Title ↔ content gap', 'spacing-xs (12px) within title section', 'Verify', 'Set gap: 12px in title section', 'Check'],
  ['Amount section padding', '[0, spacing-sm] = [0, 16px] sides', 'Verify', 'Set amount section padding: 0 16px', 'Check'],
  ['Amount section gap', 'spacing-3xs (4px) between label and value', 'Verify', 'Set gap: 4px between amount label and value', 'Check'],
  ['Detail sections', 'DetailSection pattern — same as Account detail (Hemlock pKk6B)', 'Verify: uses DetailSection component', 'Use Hemlock DetailSection component for structured data', 'Check'],
  ['Deposit popup', 'Same layout, positive MoneyText/positive (#148338) for amount', 'Verify: deposit detail shows green amount', 'Use MoneyText/positive for deposit amounts in detail view', 'Check'],
];

const mobileDefaultRows = [
  ['Status bar', '54px height, padding [16, 20]', 'Verify: mobile status bar presence/spacing', 'Maintain 54px status bar area', 'Check'],
  ['Mobile header', '48px height, padding [0, 16], gap 12', 'Verify: mobile header layout', 'Header: 48px tall, px-16, gap-12 between elements', 'Check'],
  ['Content area padding', '16px padding, gap 16px between sections', 'Verify: content padding on mobile', 'Content area: padding 16px, gap 16px', 'Check'],
  ['Text wrapping', 'All text must wrap — never truncate on mobile', 'Verify: no ellipsis truncation', 'Ensure overflow-wrap: break-word; no text-overflow: ellipsis', 'Check'],
  ['Touch targets', 'Minimum 44px height for interactive elements', 'Verify: row tap targets', 'All tappable rows ≥ 44px height', 'Check'],
];

const mobileAccountSelectRows = [
  ['Dropdown container', 'Absolute positioned, width fill (358px), padding spacing-md (24px)', 'Verify: dropdown overlay', 'Account dropdown: fill-width with 24px padding, positioned over content', 'Check'],
  ['Dropdown corner radius', 'radius-2xs (8px)', 'Verify', 'Set border-radius: 8px on dropdown', 'Check'],
  ['Dropdown shadow', 'shadow-md-blur + shadow-md-color', 'Verify: dropdown elevation', 'Apply shadow-md to account selector dropdown', 'Check'],
  ['Dropdown border', 'colors-borders-dark 1px inner stroke', 'Verify: dropdown border', 'Set border: 1px solid colors-borders-dark', 'Check'],
  ['Dropdown fill', `${T.bgSurface} (white)`, 'Verify', 'Background: white', 'Check'],
  ['Gap between items', 'spacing-md (24px)', 'Verify: gap between account options', 'Set gap: 24px between account items in dropdown', 'Check'],
  ['Scrollbar', 'Thin scrollbar indicator (5px wide, gray-300, radius 3)', 'Verify: custom scrollbar on long lists', 'Show scroll indicator when list overflows', 'Check'],
];

const mobileDetailRows = [
  ['Bottom sheet presentation', 'Slides up from bottom — cornerRadius [radius-md, radius-md, 0, 0] on top', 'Verify: modal presentation style', 'Use bottom sheet (not centered dialog) with top corners rounded', 'Check'],
  ['Bottom sheet fill', `${T.bgSurface} (colors-background-surface)`, 'Verify', 'Background: white', 'Check'],
  ['Bottom sheet padding', 'spacing-md (24px) top, 0 sides — content has own padding', 'Verify: bottom sheet top padding', 'Set padding-top: 24px (spacing-md) on bottom sheet container', 'Check'],
  ['Backdrop', '#000000 at 50% opacity', 'Verify: backdrop behind bottom sheet', 'Apply rgba(0,0,0,0.5) backdrop overlay', 'Check'],
  ['Backdrop starts at', 'y:0 (full screen from top)', 'Verify: backdrop coverage', 'Backdrop covers entire viewport', 'Check'],
  ['Text wrapping', 'All text wraps — no truncation or ellipsis', 'Verify', 'No text-overflow: ellipsis on any mobile text', 'Check'],
  ['Scroll behavior', 'Single scroll region within bottom sheet content only', 'Verify: no nested scrolls', 'Only ONE scroll region — the bottom sheet body', 'Check'],
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
          : status === 'Check'
            ? '<span class="badge warn">Check</span>'
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
  ...filterTabsRows,
  ...tableHeaderRows,
  ...txnRowDescRows,
  ...txnRowDateRows,
  ...txnRowCatAcctRows,
  ...txnRowAmountRows,
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
const checkCount = masterRows.filter(([, , , , s]) => s === 'Check').length;

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
    <a href="#s3" class="nav-link">3. Account selector</a>
    <a href="#s4" class="nav-link">4. Category filter tabs</a>
    <a href="#s5" class="nav-link">5. Table header</a>
    <a href="#s6" class="nav-link">6. Transaction row — description</a>
    <a href="#s7" class="nav-link">7. Transaction row — date</a>
    <a href="#s8" class="nav-link">8. Transaction row — category &amp; account</a>
    <a href="#s9" class="nav-link">9. Transaction row — amount</a>
    <span class="side-nav-title t-states">Row states</span>
    <span class="nav-sub">Desktop</span>
    <a href="#s10" class="nav-link">10. Hover state</a>
    <a href="#s11" class="nav-link">11. Pressed state</a>
    <span class="side-nav-title t-detail">Transaction detail</span>
    <span class="nav-sub">Desktop</span>
    <a href="#s12" class="nav-link">12. Detail popup — shell</a>
    <a href="#s13" class="nav-link">13. Detail popup — content</a>
    <span class="side-nav-title t-mobile">Mobile</span>
    <a href="#s14" class="nav-link">14. Default layout</a>
    <a href="#s15" class="nav-link">15. Account selector</a>
    <a href="#s16" class="nav-link">16. Transaction detail</a>
    <span class="side-nav-title t-ref">Reference</span>
    <a href="#s17" class="nav-link">17. Files to change</a>
    <a href="#s18" class="nav-link">18. Master checklist</a>
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
        <li><strong>Comparison table</strong> — row-by-row differences with status: <span class="badge-gap">Gap</span> = confirmed difference, <span class="badge-match">Match</span> = already correct, <span class="badge-check">Check</span> = needs verification against live dev</li>
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

    ${compareSection('3', 'Account selector', 'Hemlock Select component (O:jncEi) — "All Accounts" dropdown — Q5tbaN', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 8%;max-height:160px;', table(accountSelectorRows), '', 'object-fit:cover;object-position:30% 8%;max-height:160px;')}

    ${compareSection('4', 'Category filter tabs', 'Segmented control — All Types / Banking / Credit Cards / Investments / Loans — A6epW', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 12%;max-height:130px;', table(filterTabsRows), '', 'object-fit:cover;object-position:30% 12%;max-height:130px;')}

    ${compareSection('5', 'Table header', 'Column labels with sort icons — tableHeader T8Ao4', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 16%;max-height:120px;', table(tableHeaderRows), '', 'object-fit:cover;object-position:30% 16%;max-height:120px;')}

    ${compareSection('6', 'Transaction row — description', 'Avatar + merchant name cell — descCell ldFZ5 in txWholeFoods', images.designDefault, images.devFull, 'object-fit:cover;object-position:30% 25%;max-height:200px;', table(txnRowDescRows), '', 'object-fit:cover;object-position:30% 25%;max-height:200px;')}

    ${compareSection('7', 'Transaction row — date', 'Date column with month + day stack — dateStack RAj0k', images.designDefault, images.devFull, 'object-fit:cover;object-position:20% 30%;max-height:250px;', table(txnRowDateRows), '', 'object-fit:cover;object-position:20% 30%;max-height:250px;')}

    ${compareSection('8', 'Transaction row — category &amp; account', 'Category and account text cells — 14px regular gray-500', images.designDefault, images.devFull, 'object-fit:cover;object-position:50% 30%;max-height:250px;', table(txnRowCatAcctRows), '', 'object-fit:cover;object-position:50% 30%;max-height:250px;')}

    ${compareSection('9', 'Transaction row — amount', 'MoneyText component — positive (green), negative (dark), pending (orange)', images.designDefault, images.devFull, 'object-fit:cover;object-position:85% 30%;max-height:250px;', table(txnRowAmountRows), '', 'object-fit:cover;object-position:85% 30%;max-height:250px;')}

    ${compareSection('10', 'Hover state', 'TransactionRow/hover (O:tzdWt) — warm background on pointer hover', images.designTxnHovered, images.devHover, modalCompareStyle, table(hoverStateRows), 'Hover any transaction row in dev to compare background color and radius.', modalCompareStyle)}

    ${compareSection('11', 'Pressed state', 'TransactionRow/pressed (O:MSEcE) — deeper background on click/active', images.designTxnPressed, images.devPressed, modalCompareStyle, table(pressedStateRows), 'Press and hold a transaction row — the background should deepen beyond hover.', modalCompareStyle)}

    ${compareSection('12', 'Detail popup — shell', 'Transaction detail overlay — popup Qjfm2 (560×905, radius-xs, shadow-lg)', images.designTxnSelectedPopup, images.devDetailPopup, modalCompareStyle, table(detailPopupShellRows), '', modalCompareStyle)}

    ${compareSection('13', 'Detail popup — content', 'Title section, amount section, and detail sections inside popup — QXsSg', images.designDepositPopup, images.devDetailPopup, modalCompareStyle, table(detailPopupContentRows), '<p class="note">Design has two detail popup variants: <strong>withdrawal</strong> (bAspM) shows negative amount in default dark text; <strong>deposit</strong> (bDcIO) shows positive amount in green (#148338). Both use the same layout structure.</p>', modalCompareStyle)}

    ${compareSection('14', 'Mobile — Default layout', 'Activity list at 390px viewport — design v4sVMe / TrawO', images.designMobileDefault, images.devMobileDefault, modalCompareStyle, table(mobileDefaultRows), '', modalCompareStyle)}

    ${compareSection('15', 'Mobile — Account selector', 'Account dropdown at mobile — ie8B0 / g1e3f with scrollbar', images.designMobileAccountSelect, images.devMobileAccountSelect, modalCompareStyle, table(mobileAccountSelectRows), '', modalCompareStyle)}

    ${compareSection('16', 'Mobile — Transaction detail', 'Bottom sheet transaction detail — PcHUT with backdrop overlay', images.designMobileTransactionDetail, images.devMobileDetail, modalCompareStyle, table(mobileDetailRows), '', modalCompareStyle)}

    <section class="page" id="s17">
      <h2>17. Files to change in js-mono</h2>
      <p class="subtitle">Map formatting fixes to implementation files on develop. File paths are approximate — verify in codebase.</p>
      ${fileTable()}
      <div class="note"><strong>Note:</strong> File paths above are estimates based on naming conventions. Verify actual paths in the <code>js-mono</code> repository. The Activity feature may live under <code>pfm-activity</code>, <code>activity</code>, or <code>net-worth/activity</code> depending on the project structure.</div>
    </section>

    <section class="page" id="s18">
      <h2>18. Master formatting checklist</h2>
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
