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
  devFull: requireEmbed('assets/dev/full-page.png'),
  devDetailHolding: requireEmbed('assets/dev/detail-popup-holding.png'),
  devTableBelow640: requireEmbed('assets/dev/table-below-640px.png'),
  designMobileTable: requireEmbed('assets/design/zoKIL.png'),
};

const modalCompareStyle = 'object-fit:contain;width:100%;background:#fff;padding:12px;';

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
  ['Content column padding', `[20px top, ${T.xl} (40px) sides] — padding: [20, 40]`, '20px 40px — padding matches design values', 'Values match but code must use $spacing-xl (40px) for left/right padding instead of hardcoded 40px. Top 20px is custom.', 'Gap'],
  ['Gap: content sections', `${T.md} (24px) between value block, account selector, filter tabs, and table`, 'gap: normal (not explicitly set on flex column)', 'Add gap: $spacing-md (24px) on the content column flex container. Currently no gap is set — sections rely on implicit spacing.', 'Gap'],
  ['Table container corner radius', `${T.r2xs} (8px)`, '0px', 'Add border-radius: $radius-2xs (8px) on table container. Currently 0px — no rounding.', 'Gap'],
  ['Table container border', 'None (design has no visible outer border on table wrapper)', '0px none (no border)', 'No change — matches', 'Match'],
  ['Page header padding', '[20px, spacing-xl (40px), spacing-2xs (8px), spacing-xl (40px)]', '20px 40px (verified on wrapper)', 'Code must use $spacing-xl (40px) for left/right and $spacing-2xs (8px) for bottom instead of hardcoded pixel values. Top 20px is custom.', 'Gap'],
];

const totalValueRows = [
  ['Label text', '"TOTAL VALUE" — uppercase', '"TOTAL VALUE" (uppercase)', 'No change — same copy', 'Match'],
  ['Label font', '$typo-primary-sm-semibold (Heebo 14px/600)', '14px, weight 600', 'Size and weight match but code must reference $typo-primary-sm-semibold token — not hardcoded font-size: 14px; font-weight: 600.', 'Gap'],
  ['Label color', `$color-gray-500 (#716E6A)`, 'rgb(94, 89, 84) = #5E5954', 'Change color from #5E5954 to $color-gray-500 (#716E6A). Dev is using $colors-text-meta (#5E5954) — wrong token.', 'Gap'],
  ['Label letter-spacing', '1px (custom — adds slight tracking to uppercase label)', '0.35px', 'Change letter-spacing from 0.35px to 1px. This is a custom value, not a token.', 'Gap'],
  ['Value font', '$typo-primary-4xl-semibold (Heebo 36px/600)', '36px, weight 600', 'Size and weight match but code must reference $typo-primary-4xl-semibold token — not hardcoded font-size: 36px; font-weight: 600.', 'Gap'],
  ['Value color', `$color-gray-900 (#0E0E0E)`, 'rgb(14, 14, 14) = #0E0E0E', 'Color matches but code must reference $color-gray-900 token — not hardcoded rgb(14, 14, 14).', 'Gap'],
  ['Value letter-spacing', '-0.5px (custom — no Hemlock token for letter-spacing)', '-0.5px', 'No change — value matches. Letter-spacing has no Hemlock token; hardcoded -0.5px is correct.', 'Match'],
  ['Holdings subtitle font', '$typo-primary-sm-regular (Heebo 14px/400)', '14px, weight 400', 'Size and weight match but code must reference $typo-primary-sm-regular token — not hardcoded font-size: 14px; font-weight: 400.', 'Gap'],
  ['Holdings subtitle color', `$colors-text-meta (#5E5954)`, 'rgb(94, 89, 84) = #5E5954', 'Color matches but code must reference $colors-text-meta token — not hardcoded rgb(94, 89, 84).', 'Gap'],
  ['Value section gap', `$spacing-3xs (4px) between label, value, and subtitle`, '4px', 'Value matches but code must use $spacing-3xs token — not hardcoded 4px.', 'Gap'],
];

const accountSelectorRows = [
  ['Width', '375px fixed (custom design value)', '375px', 'No change — matches', 'Match'],
  ['Height', '58px (custom design value)', '58px', 'No change — matches', 'Match'],
  ['Corner radius', `$radius-2xs (8px)`, '8px', 'Value matches but code must reference $radius-2xs token — not hardcoded border-radius: 8px.', 'Gap'],
  ['Padding', '[$spacing-none (0), $spacing-xs (12px), $spacing-none (0), 17px custom]', '0px 12px 0px 17px', 'Values match but left padding must use $spacing-xs (12px) token — not hardcoded 12px. Right 17px is custom (chevron offset).', 'Gap'],
  ['Border', `1px solid $color-gray-200 (#D5D3D0)`, '1px solid rgb(220, 216, 203) = #DCD8CB', 'Change border-color from #DCD8CB to $color-gray-200 (#D5D3D0). Wrong gray — dev is using a warmer tone.', 'Gap'],
  ['Background', '$color-base-white (#FFFFFF)', 'rgb(255, 255, 255) = white', 'Color matches but code must reference $color-base-white token — not hardcoded white or rgb(255,255,255).', 'Gap'],
  ['Value text', '$typo-primary-base-regular (Heebo 16px/400), color $color-gray-900 (#0E0E0E), "All Accounts" (capital A)', '16px, weight 400, "All accounts" (lowercase a)', 'Two changes: (1) Capitalize to "All Accounts" (capital A). (2) Code must reference $typo-primary-base-regular token and $color-gray-900 for color — not hardcoded values.', 'Gap'],
  ['Chevron icon', '20×20px Lucide chevron-down, color #8A8680, $icon-md sizing', 'Chevron inherits text color rgb(45, 41, 38) = #2D2926', 'Change chevron fill from #2D2926 to #8A8680. Set size to 20×20px via $icon-md token. Current color is too dark — inheriting body text instead of using its own fill.', 'Gap'],
];

const filterTabsRows = [
  ['Component', 'Hemlock $component/SegmentedControl ref', 'Segmented control: inline-flex, bg rgb(247,245,240), padding 4px, gap 2px, border-radius 9999px', 'Replace hand-built frame with Hemlock $component/SegmentedControl ref. Dev visually matches but must use the component ref, not raw divs.', 'Gap'],
  ['Container width', 'fill_container (100% of parent column)', 'inline-flex (hugs content, does not fill)', 'Change from inline-flex to width: 100% (fill_container). Design stretches SegmentedControl to full content column width.', 'Gap'],
  ['Container fill', `$color-taupe-100 (#F7F5F0)`, 'rgb(247, 245, 240) = #F7F5F0', 'Color matches but code must reference $color-taupe-100 token — not hardcoded rgb(247, 245, 240).', 'Gap'],
  ['Container padding', `$spacing-3xs (4px)`, '4px', 'Value matches but code must reference $spacing-3xs token — not hardcoded padding: 4px.', 'Gap'],
  ['Container corner radius', `$radius-full (9999px)`, '9999px', 'Value matches but code must reference $radius-full token — not hardcoded border-radius: 9999px.', 'Gap'],
  ['Container gap', '0 between segments (segments touch)', '2px', 'Change gap from 2px to 0. Segments should touch with no gap between them per SegmentedControl spec.', 'Gap'],
  ['Tab font size', '$typo-primary-sm (Heebo 14px) — inherited by SegmentItem', '14px', 'Value matches but code must reference $typo-primary-sm token — not hardcoded font-size: 14px.', 'Gap'],
  ['Tab letter-spacing', '0 (normal)', 'normal', 'No change — matches', 'Match'],
  ['Tab padding', '[8px, 24px] from SegmentItem component spec', '8px 24px', 'Values match but padding must come from the SegmentItem component token — not hardcoded padding: 8px 24px.', 'Gap'],
  ['Active tab fill', `$colors-background-surface (#FFFFFF)`, 'bg white', 'Color matches but code must reference $colors-background-surface token — not hardcoded white.', 'Gap'],
  ['Active tab shadow', '$shadow-sm (0px 1px 2px rgba(0,0,0,0.08))', 'No visible shadow on active tab', 'Add box-shadow: $shadow-sm on active/selected segment. Currently missing entirely — no shadow renders.', 'Gap'],
  ['Active tab font', '$typo-primary-sm-semibold (14px/600), color $colors-text-header (#0E0E0E)', '14px, weight 600', 'Weight matches but code must use $typo-primary-sm-semibold for font and $colors-text-header (#0E0E0E) for color — not hardcoded values.', 'Gap'],
  ['Inactive tab font', '$typo-primary-sm-regular (14px/400), color $colors-text-body (#403D3A)', '14px, weight 400', 'Weight matches but code must use $typo-primary-sm-regular for font and $colors-text-body (#403D3A) for color — not hardcoded values.', 'Gap'],
  ['Tab labels', 'All, Equity, ETF, Fund, Crypto, Treasury, Corporate Bond, REIT — 8 segments', 'All, Equity, ETF, Fund, Crypto, Treasury, Corporate Bond, REIT — 8 tabs', 'No change — same labels', 'Match'],
  ['Tab border-radius', `$radius-full (9999px) per SegmentItem`, '9999px', 'Value matches but code must reference $radius-full token — not hardcoded border-radius: 9999px.', 'Gap'],
];

const tableHeaderRows = [
  ['Header fill', `$color-taupe-100 (#F7F5F0)`, 'rgb(247, 245, 240) = #F7F5F0', 'Color matches but code must reference $color-taupe-100 token — not hardcoded rgb(247, 245, 240) or #F7F5F0.', 'Gap'],
  ['Header corner radius', `$radius-2xs (8px)`, '0px', 'Add border-radius: $radius-2xs (8px) on header row. Currently 0px — no rounding.', 'Gap'],
  ['Header padding', '[10px custom, $spacing-xs (12px) horizontal]', '10px 12px', 'Values match but horizontal padding must use $spacing-xs (12px) token — not hardcoded 12px. Top/bottom 10px is custom.', 'Gap'],
  ['Header bottom border', `1px solid $colors-borders-light (#EEEDEB)`, '0px none (no visible border)', 'Add border-bottom: 1px solid $colors-borders-light (#EEEDEB). Currently no border renders.', 'Gap'],
  ['Column gap', `$spacing-sm (16px) between columns`, 'All columns equal 109px — no explicit gap', 'Add $spacing-sm (16px) gap between header columns. Currently columns are equally divided with no gap.', 'Gap'],
  ['Header font', '$typo-primary-xs-semibold (Heebo 12px/600)', '14px, weight 700', 'Two changes: (1) Reduce font-size from 14px to 12px. (2) Reduce font-weight from 700 to 600. Use $typo-primary-xs-semibold token — not hardcoded values.', 'Gap'],
  ['Header text color', `$color-gray-500 (#716E6A)`, 'oklch(0.164 0 89.88) = near-black #0E0E0E', 'Change text color from #0E0E0E to $color-gray-500 (#716E6A). Currently using near-black instead of medium gray.', 'Gap'],
  ['Sort icons size', '10×10px, Lucide icons', '14×14 or larger', 'Reduce sort icon dimensions from 14×14px to 10×10px per design.', 'Gap'],
  ['Sort icons color', `$color-gray-500 (#716E6A)`, 'Inherits header text color (#0E0E0E)', 'Set sort icon fill to $color-gray-500 (#716E6A). Currently inheriting near-black from header text.', 'Gap'],
  ['SECURITY column width', 'fill_container (flex-grow — takes remaining space)', '109px (equal division)', 'Set SECURITY column to flex-grow: 1 (fill remaining space). Currently fixed at 109px like all other columns.', 'Gap'],
  ['SECURITY column text truncation', 'Text always wraps — never truncate', 'Column is 109px with no overflow handling — text will clip or truncate at this width', 'Remove any text-overflow: ellipsis, white-space: nowrap, overflow: hidden on SECURITY header. Column must grow to fit content.', 'Gap'],
  ['TYPE column width', '70px fixed', '109px', 'Reduce TYPE column from 109px to 70px.', 'Gap'],
  ['ACCOUNT column width', '160px fixed', '109px', 'Increase ACCOUNT column from 109px to 160px.', 'Gap'],
  ['MARKET VALUE column width', '110px fixed, right-aligned', '109px', 'Set MARKET VALUE column to 110px, text-align: right.', 'Gap'],
  ['PORTFOLIO % column width', '90px fixed, right-aligned', '109px', 'Set PORTFOLIO % column to 90px, text-align: right.', 'Gap'],
];

const holdingRowRows = [
  ['Row padding', `$spacing-xs (12px) all sides`, '12px 8px 12px 12px (first cell), 12px 8px (middle cells), 12px 12px 12px 8px (last cell)', 'Padding is inconsistent across cells. Standardize all cells to $spacing-xs (12px) uniform padding — not hardcoded mixed values.', 'Gap'],
  ['Row gap (inter-cell)', `$spacing-sm (16px) between cells`, '0px — cells touch (table layout)', 'Add $spacing-sm (16px) gap between row cells. Currently 0px — cells have no spacing between them.', 'Gap'],
  ['Row bottom border', `1px solid $colors-borders-light (#EEEDEB)`, '1px solid rgb(238, 237, 235) = #EEEDEB', 'Color matches but code must reference $colors-borders-light token — not hardcoded rgb(238, 237, 235).', 'Gap'],
  ['Row height', 'Content-derived — height adjusts to wrapped text content', '88px (text wrapping causes taller rows — acceptable if text is not truncated)', 'No change — content-driven height is correct. Rows will shorten once account format is shortened.', 'Match'],
  ['Ticker text (SECURITY col)', '$typo-primary-sm-semibold (Heebo 14px/600), color $color-gray-700 (#403D3A)', '14px, weight 600, color rgb(57, 54, 51) = #393633', 'Change ticker color from #393633 to $color-gray-700 (#403D3A). Code must use $typo-primary-sm-semibold for font and $color-gray-700 for color.', 'Gap'],
  ['Security name (subtitle)', '$typo-primary-xs-regular (Heebo 11px/400), color $color-gray-500 (#716E6A) — text wraps, never truncates', '11px, weight 400, color #716E6A — BUT text-overflow: ellipsis, white-space: nowrap, overflow: hidden (TRUNCATED at 89px)', 'REMOVE text-overflow: ellipsis, white-space: nowrap, overflow: hidden. Text must wrap. 17 security names are being clipped (e.g. "Vanguard To..." instead of "Vanguard Total Stock Market ETF"). Code must use $typo-primary-xs-regular for font and $color-gray-500 for color.', 'Gap'],
  ['Security name truncation', 'Text MUST wrap fully — never truncate with ellipsis', 'text-overflow: ellipsis, white-space: nowrap, overflow: hidden — 17 of 17 security names are clipped', 'Remove text-overflow: ellipsis, white-space: nowrap, overflow: hidden on .security-name (or equivalent class). Set white-space: normal; overflow: visible. Every name must be fully readable.', 'Gap'],
  ['Security name gap below ticker', '2px gap between ticker and security name (no Hemlock spacing token for 2px — smallest is $spacing-3xs 4px)', 'Gap not explicitly measured', 'Set gap: 2px between ticker badge and security name text. No Hemlock token for 2px — hardcoded is acceptable until $spacing-4xs (2px) is added.', 'Gap'],
  ['TYPE cell font', '$typo-primary-sm-regular (Heebo 14px/400), color $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change TYPE text color from #393633 to $color-gray-500 (#716E6A). Code must use $typo-primary-sm-regular for font and $color-gray-500 for color.', 'Gap'],
  ['TYPE cell truncation', 'Text wraps — never truncate', 'Column is 109px — short values like "ETF" fit but longer types may clip', 'Remove any text-overflow: ellipsis, white-space: nowrap, overflow: hidden on TYPE cells. Text must wrap.', 'Gap'],
  ['ACCOUNT cell font', '$typo-primary-sm-regular (Heebo 14px/400), color $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change ACCOUNT text color from #393633 to $color-gray-500 (#716E6A). Code must use $typo-primary-sm-regular for font and $color-gray-500 for color.', 'Gap'],
  ['ACCOUNT cell truncation', 'Text wraps — never truncate', 'Full account names like "Fidelity · Fidelity 403(b) Tax-Deferred" wrap to 2-3 lines — no ellipsis observed (correct)', 'Currently correct — text wraps. Preserve this. Never add text-overflow: ellipsis, white-space: nowrap, overflow: hidden.', 'Match'],
  ['ACCOUNT cell format', '"Fidelity Brokerage (x4372)" — short format with mask', '"Fidelity · Fidelity 403(b) Tax-Deferred" — full Plaid name with dot separator', 'Change to short format: "{Institution} {SubType} (x{mask})" per design. Current format shows full Plaid name which is too verbose.', 'Gap'],
  ['MARKET VALUE font', '$typo-primary-sm-semibold (Heebo 14px/600), color $color-gray-700 (#403D3A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Two changes: (1) Change font-weight from 400 to 600 via $typo-primary-sm-semibold. (2) Change color from #393633 to $color-gray-700 (#403D3A).', 'Gap'],
  ['MARKET VALUE alignment', 'Right-aligned (justifyContent: end)', 'text-align: right', 'Alignment correct. No change needed.', 'Match'],
  ['PORTFOLIO % font', '$typo-primary-sm-regular (Heebo 14px/400), color $color-gray-500 (#716E6A)', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change PORTFOLIO % text color from #393633 to $color-gray-500 (#716E6A). Code must use $color-gray-500 token.', 'Gap'],
  ['PORTFOLIO % alignment', 'Right-aligned (justifyContent: end)', 'text-align: right', 'Alignment correct. No change needed.', 'Match'],
  ['Ticker badge (ETF/Stock chip)', 'cornerRadius 4px, fill #ebf0fe, padding [2, 6]', 'No badge chip visible', 'Add ticker type badge chip next to ticker text: background #ebf0fe, border-radius 4px, padding 2px 6px. Currently missing entirely.', 'Gap'],
];

const showMoreRows = [
  ['"Show More" button', 'Hemlock $component/Button/text ref — "Show More" using $typo-primary-sm-regular (14px)', 'NOT PRESENT — all 22 rows displayed at once, no pagination', 'Add "Show More" button using Hemlock $component/Button/text ref below initial visible rows. Currently shows all 22 rows at once — needs pagination.', 'Gap'],
  ['Footer border', `1px solid $colors-borders-light (#EEEDEB) — top border only`, 'N/A — no show more footer exists', 'Add footer container with border-top: 1px solid $colors-borders-light (#EEEDEB). Footer does not exist yet.', 'Gap'],
  ['Footer padding', `$spacing-2xs (8px)`, 'N/A — no show more footer exists', 'Set footer container padding: $spacing-2xs (8px). Footer does not exist yet.', 'Gap'],
  ['Footer alignment', 'Centered (justifyContent: center)', 'N/A — no show more footer exists', 'Center "Show More" button horizontally in footer. Footer does not exist yet.', 'Gap'],
];

const detailPopupShellRows = [
  ['Popup width', '560px (custom design value)', '560px', 'No change — matches', 'Match'],
  ['Popup corner radius', '$radius-xs (12px)', '12px', 'Value matches but code must reference $radius-xs token — not hardcoded border-radius: 12px.', 'Gap'],
  ['Popup shadow', 'blur 24px, color rgba(0,0,0,0.1) — no y-offset', 'rgba(0, 0, 0, 0.2) 0px 16px 48px 0px', 'Change shadow: blur from 48px to 24px, opacity from 0.2 to 0.1, remove y-offset 16px. Current shadow is too dark and offset.', 'Gap'],
  ['Popup fill', `$colors-background-surface (#FFFFFF)`, 'oklch(1 0 89.88) = white', 'Color matches but code must reference $colors-background-surface token — not oklch(1 0 89.88) or hardcoded white.', 'Gap'],
  ['Popup overflow', 'hidden', 'overflow: hidden', 'No change — matches', 'Match'],
  ['Popup position', 'Centered in viewport (modal pattern)', 'position: fixed, centered via openui-modal', 'No change — centered modal pattern matches', 'Match'],
  ['Backdrop overlay', 'rgba(0,0,0,0.4) (#00000066) covers main content behind popup', 'No visible backdrop — content behind popup not dimmed', 'Add backdrop overlay: background rgba(0,0,0,0.4) covering viewport when popup is open. Currently no dimming.', 'Gap'],
  ['Body padding', `$spacing-xl (40px) all sides`, 'padding: 40px (uniform on scrollable content container)', 'Value matches but code must use $spacing-xl token — not hardcoded p-10.', 'Gap'],
];

const detailPopupContentRows = [
  ['Header: titleSection padding', '[0, $spacing-sm (16px)] — 0px vertical, 16px horizontal', '40px 32px 0px 40px on body only — no separate titleSection padding', 'Add titleSection padding: 0px $spacing-sm (16px). This adds inner horizontal padding within the body\'s 40px, for 56px effective side padding on the header.', 'Gap'],
  ['Header: Institution/security logo', '36×36px, border-radius $radius-2xs (8px) — real logos from Plaid API', 'No logo element rendered', 'Pull institution/security logo from Plaid API (logo_uri from /institutions/get). Display at 36×36px with border-radius: $radius-2xs (8px). Currently missing entirely.', 'Gap'],
  ['Header: Ticker label', '$typo-primary-xs-semibold (Heebo 11px/600), color #8A8680, letter-spacing 0.5px', '11px, weight 600, color rgb(138, 134, 128) = #8A8680, letter-spacing 0.5px', 'Values match but code must reference $typo-primary-xs-semibold token for font — not hardcoded font-size: 11px; font-weight: 600. Color #8A8680 is custom (no token).', 'Gap'],
  ['Header: Security name', '$typo-secondary-lg-semibold (Noto Serif 18px/600), color $colors-text-header (#0E0E0E), letter-spacing -0.3px', 'Heebo 18px, weight 600, color rgb(14, 14, 14) = #0E0E0E', 'Switch font from Heebo to $typo-secondary-lg-semibold (Noto Serif 18px/600). Add letter-spacing: -0.3px. Set color to $colors-text-header (#0E0E0E). Same pattern as activity detail popup header.', 'Gap'],
  ['Header: Security name truncation', 'Text wraps — never truncate', 'whiteSpace: normal, overflow: visible — no truncation', 'No change — text wraps correctly. No truncation applied.', 'Match'],
  ['Header: titleColumn gap', '2px gap between ticker label and security name (no Hemlock spacing token for 2px — smallest is $spacing-3xs 4px)', 'gap: 2px (flex-col gap-0.5)', 'Value matches design but 2px has no Hemlock spacing token. Hardcoded Tailwind gap-0.5 is acceptable until a $spacing-4xs (2px) token is added to the design system.', 'Gap'],
  ['Header: Close button (X)', 'Lucide "x" icon, $icon-md (24×24px), fill $colors-text-meta (#5E5954)', '28×28px button, 16×16px SVG icon, color rgb(94, 89, 84) = #5E5954', 'Reduce button from 28×28px to 24×24px and SVG icon from 16×16px to 24×24px using $icon-md (24px) sizing token. Color matches $colors-text-meta.', 'Gap'],
  ['Header: row gap', '$spacing-xs (12px) between logo, titleColumn, and close button', 'gap: 12px (flex gap-3)', 'Value matches but code must use $spacing-xs (12px) token — not hardcoded Tailwind gap-3.', 'Gap'],
  ['Popup title', 'NOT in design — popup has no separate title bar', '"Holding details" — 20px, weight 700, color black', 'Remove "Holding details" title text entirely. Design has no popup title — goes straight to ticker/name/value.', 'Gap'],
  ['Amount section padding', '[0, $spacing-sm (16px)] — 0px vertical, 16px horizontal', 'No separate amountSection padding', 'Add amountSection padding: 0px $spacing-sm (16px) to match header pattern.', 'Gap'],
  ['Amount label', '$typo-primary-xs-regular (Heebo 11px/400), color $colors-text-meta (#5E5954), letter-spacing 1.5px, uppercase', '11px, weight 400, color rgb(94, 89, 84) = #5E5954, letter-spacing 1.5px, uppercase', 'Values match but code must reference $typo-primary-xs-regular for font and $colors-text-meta for color — not hardcoded values.', 'Gap'],
  ['Amount value', 'Hemlock $component/MoneyText/lg ref (Heebo 24px/600), color $colors-text-header (#0E0E0E)', '24px, weight 600, color rgb(14, 14, 14) = #0E0E0E', 'Values match but code must use $component/MoneyText/lg ref — not hardcoded font-size: 24px; font-weight: 600. Set color via $colors-text-header.', 'Gap'],
  ['Amount section gap', '$spacing-3xs (4px) between label and value', 'gap: 4px (flex-col gap-1)', 'Value matches but code must use $spacing-3xs token — not hardcoded gap-1.', 'Gap'],
  ['Body section gap', '$spacing-lg (32px) between titleSection, amountSection, and detail sections', 'gap: 32px (flex-col gap-8)', 'Value matches but code must use $spacing-lg (32px) token — not hardcoded Tailwind gap-8.', 'Gap'],
  ['Section header (Holding Details)', '$color-taupe-100 (#F7F5F0) bg, padding [$spacing-xs (12px), $spacing-sm (16px)], radius [8,8,0,0], border-bottom 1px $colors-borders-light (#EEEDEB), $typo-primary-sm-semibold (14px/600)', '14px, weight 600, color #0E0E0E, bg rgb(247, 245, 240), padding 12px 16px, border-radius 8px 8px 0 0', 'Values match but code must reference tokens: $color-taupe-100 for bg, $colors-borders-light for border, $typo-primary-sm-semibold for font, $spacing-xs/$spacing-sm for padding — not hardcoded values.', 'Gap'],
  ['Detail row: label font', '$typo-primary-sm-regular (Heebo 14px/400), color $colors-text-meta (#5E5954), fixed-width 140px', '14px, weight 400, color rgb(94, 89, 84) = #5E5954', 'Color matches but code must reference $typo-primary-sm-regular for font and $colors-text-meta for color. Add fixed width: 140px on label column.', 'Gap'],
  ['Detail row: value font', '$typo-primary-sm-regular (Heebo 14px/400), color $colors-text-body (#403D3A), fill_container width', '14px, weight 400, color rgb(57, 54, 51) = #393633', 'Change value color from #393633 to $colors-text-body (#403D3A). Code must use $typo-primary-sm-regular for font. Value column should flex-grow to fill remaining width.', 'Gap'],
  ['Detail row: value truncation', 'Text wraps — never truncate', 'whiteSpace: normal, overflow: visible, textOverflow: clip — no truncation on any of 11 detail rows', 'No change — text wraps correctly on all detail row values. No truncation applied.', 'Match'],
  ['Detail row: padding', '$spacing-sm (16px) all sides', '16px', 'Value matches but code must reference $spacing-sm token — not hardcoded padding: 16px.', 'Gap'],
  ['Detail row: internal gap', '40px ($spacing-xl) gap between label and value', 'gap: 40px (flex gap-10), label width: 140px fixed', 'Value matches. Code must use $spacing-xl (40px) token — not hardcoded gap-10.', 'Gap'],
  ['Detail row: divider', `1px solid $colors-borders-light (#EEEDEB) between rows`, '1px solid rgb(238, 237, 235) = #EEEDEB', 'Color matches but code must reference $colors-borders-light token — not hardcoded rgb(238, 237, 235).', 'Gap'],
  ['Holding fields', 'Security, Security Type, Account, Quantity, Last Price, Price As Of, Cost Basis, Currency', 'Security, Security Type, Account, Quantity (all present — verified)', 'No change — all fields present', 'Match'],
  ['Performance section header', '$color-taupe-100 bg, $typo-primary-sm-semibold (14px/600), $colors-borders-light border', '14px, weight 600, color #0E0E0E — section present', 'Section exists but code must reference tokens: $color-taupe-100 for bg, $typo-primary-sm-semibold for font, $colors-borders-light for border — not hardcoded values.', 'Gap'],
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
    <a href="#s1b" class="nav-link">1b. Responsive breakpoint</a>
    <a href="#s2" class="nav-link">2. Total value section</a>
    <a href="#s3" class="nav-link">3. Account selector</a>
    <a href="#s4" class="nav-link">4. SegmentedControl filter</a>
    <a href="#s5" class="nav-link">5. Table header</a>
    <a href="#s6" class="nav-link">6. Holding row</a>
    <a href="#s7" class="nav-link">7. Show More footer</a>
    <span class="side-nav-title t-detail">Holding detail</span>
    <a href="#s8" class="nav-link">8. Detail popup — shell</a>
    <a href="#s9" class="nav-link">9. Detail popup — content</a>
    <span class="side-nav-title t-ref">Reference</span>
    <a href="#s10" class="nav-link">10. Files to change</a>
    <a href="#s11" class="nav-link">11. Master checklist</a>
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

    ${compareSection('1b', 'Responsive table breakpoint (< 640px)', 'Table does not switch to mobile layout below 640px — columns compress to ~89px causing truncation and illegibility', images.designMobileTable, images.devTableBelow640, '', table([['Responsive table (< 640px)', 'Below 640px table width, switch to mobile card/stack layout — no horizontal table with cramped columns', 'Table stays in horizontal layout at all widths — columns compress to ~89px causing truncation and illegibility', 'Add 640px breakpoint: below 640px, switch to stacked card layout per mobile design pattern (one holding per card, vertical labels). This is a known pattern from other PFM reviews.', 'Gap']]))}

    ${compareSection('2', 'Total value section', 'TOTAL VALUE label + dollar amount + holdings count — valueCol as85C', images.designMain, images.devFull, '', table(totalValueRows))}

    ${compareSection('3', 'Account selector', 'Hemlock Select component (O:jncEi) — "All Accounts" dropdown — RcFdy', images.designMain, images.devFull, '', table(accountSelectorRows))}

    ${compareSection('4', 'SegmentedControl filter', 'Hemlock SegmentedControl component (typeFilterTabs AkPN9) — replaces previous individual pill buttons. fill_container width, $color-taupe-100 track, 8 segments.', images.designMain, images.devFull, '', table(filterTabsRows))}

    ${compareSection('5', 'Table header', 'Column labels with sort icons — tableHeader j6Adz', images.designMain, images.devFull, '', table(tableHeaderRows))}

    ${compareSection('6', 'Holding row', 'Security ticker + name, type, account, market value, portfolio % — holdingRow', images.designMain, images.devFull, '', table(holdingRowRows))}

    ${compareSection('7', 'Show More footer', '"Show More" text button below holdings list — showMoreFooter ixx0J', images.designMain, images.devFull, '', table(showMoreRows))}

    <section class="page" id="s8">
      <h2>8. Detail popup — shell</h2>
      <p class="subtitle">Holding detail overlay — popup (560px, $radius-xs, blur 24px rgba(0,0,0,0.1))</p>
      <div class="compare-grid">
        <div class="col"><div class="panel-label design">Design — Holding popup</div><img src="${images.designHoldingPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label dev">Dev — Holding detail popup</div><img src="${images.devDetailHolding}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(detailPopupShellRows)}
    </section>

    <section class="page" id="s9">
      <h2>9. Detail popup — content</h2>
      <p class="subtitle">Header, amount, and detail sections inside holding popup</p>
      <div class="compare-grid">
        <div class="col"><div class="panel-label design">Design — Holding (equity/ETF)</div><img src="${images.designHoldingPopup}" style="${modalCompareStyle}" /></div>
        <div class="col"><div class="panel-label dev">Dev — Holding detail popup</div><img src="${images.devDetailHolding}" style="${modalCompareStyle}" /></div>
      </div>
      ${table(detailPopupContentRows)}
    </section>

    <section class="page" id="s10">
      <h2>10. Files to change in js-mono</h2>
      <p class="subtitle">Map formatting fixes to implementation files on develop. File paths are approximate — verify in codebase.</p>
      ${fileTable()}
      <div class="note"><strong>Note:</strong> File paths above are estimates based on naming conventions. Verify actual paths in the <code>js-mono</code> repository. The Investments feature may live under <code>pfm-investments</code>, <code>investments</code>, or <code>net-worth/investments</code> depending on the project structure.</div>
    </section>

    <section class="page" id="s11">
      <h2>11. Master formatting checklist</h2>
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
