#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dir = '/Users/amanda/Evergreen Cursor Project/design-specs/reviews/pfm-accounts-v2-comparison';

/** Pencil exports use transparent/dark canvas; composite onto white so HTML matches the design mainPanel. */
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
  designContent: requireEmbed('assets/design/nbXRN.png'),
  designHeadline: requireEmbed('assets/design/qCXx8.png'),
  designNetWorthLabel: requireEmbed('assets/design/net-worth-label-closeup.png'),
  designNetWorthValue: requireEmbed('assets/design/net-worth-value-closeup.png'),
  designButton: requireEmbed('assets/design/b9y1P-padded.png'),
  designRow: requireEmbed('assets/design/dVY3g.png'),
  designBanking: requireEmbed('assets/design/BuM7M.png'),
  designHoverScreen: requireEmbed('assets/design/eWQkU.png'),
  designHoverRow: requireEmbed('assets/design/g2UJK.png'),
  designPressedRow: requireEmbed('assets/design/Pv3zG.png'),
  designPressedScreen: requireEmbed('assets/design/TShbt.png'),
  designDetailScreen: requireEmbed('assets/design/xGRDX.png'),
  designDetailPopup: requireEmbed('assets/design/hIBWD.png'),
  designAddAccountModal: requireEmbed('assets/design/i0Ih1j-modal.png'),
  designRemoveInstitutionModal: requireEmbed('assets/design/fG4nj.png'),
  devFull: requireEmbed('assets/dev/full-page.png'),
  devHeadline: requireEmbed('assets/dev/headline-area.png'),
  devNetWorthLabel: requireEmbed('assets/dev/net-worth-label-closeup.png'),
  devNetWorthValue: requireEmbed('assets/dev/net-worth-value-closeup.png'),
  devAddAccountButton: requireEmbed('assets/dev/add-account-button-closeup.png'),
  devRow: requireEmbed('assets/dev/single-row-closeup.png'),
  devSectionHeader: requireEmbed('assets/dev/section-header-closeup.png'),
  devRowMeta: requireEmbed('assets/dev/row-meta-closeup.png'),
  devRowSync: requireEmbed('assets/dev/row-sync-closeup.png'),
  devRowBalance: requireEmbed('assets/dev/row-balance-closeup.png'),
  devRowsBanking: requireEmbed('assets/dev/rows-banking-closeup.png'),
  devRowsInvestments: requireEmbed('assets/dev/rows-investments-closeup.png'),
  devAddAccountModal: requireEmbed('assets/dev/modals/add-account-dialog.png'),
  devRemoveInstitutionModal: requireEmbed('assets/dev/modals/remove-institution-dialog.png'),
  devPlaidErrorModal: requireEmbed('assets/dev/modals/plaid-error.png'),
  devDetailFull: embed('assets/dev/account-detail-full.png'),
  devDetailPopup: embed('assets/dev/account-detail-popup.png'),
  devDetailMobile: requireEmbed('assets/dev/modals/account-detail-mobile.png'),
  designDetailMobile: requireEmbed('assets/design/a52MXP.png'),
  designDetailMobileViewport: requireEmbed('assets/design/xOF5t.png'),
  designPlaidError: requireEmbed('assets/design/SXiFh.png'),
  designAddAccountMobile: requireEmbed('assets/design/ugE8p.png'),
  designRemoveInstitutionMobile: requireEmbed('assets/design/FOSbt.png'),
  designPlaidErrorMobile: requireEmbed('assets/design/zNPDv.png'),
  devAddAccountMobile: requireEmbed('assets/dev/modals/add-account-mobile.png'),
  devRemoveInstitutionMobile: requireEmbed('assets/dev/modals/remove-institution-mobile.png'),
  devPlaidErrorMobile: requireEmbed('assets/dev/modals/plaid-error-mobile.png'),
  designHomeMobile: requireEmbed('assets/design/TuZJ5.png'),
  designPressMobile: requireEmbed('assets/design/EehZZ.png'),
  devHomeMobile: requireEmbed('assets/dev/modals/accounts-home-mobile.png'),
  devPressMobile: requireEmbed('assets/dev/modals/accounts-press-mobile.png'),
};

/** Pre-cropped closeup assets live in assets/dev/ and assets/design/ — no runtime CSS cropping */
const modalCompareStyle = 'object-fit:contain;max-height:520px;background:#fff;padding:12px;';

const devDetailFull = images.devDetailFull;
const devDetailPopup = images.devDetailPopup ?? images.devDetailFull;
const devDetailFallbackNote =
  '<p><strong>Dev screenshot needed:</strong> Save <code>assets/dev/account-detail-full.png</code> and <code>account-detail-popup.png</code> with the dialog open — see <code>capture-dev-detail.md</code>.</p>';
/** Full modal / dialog — no CSS crop; both panels show the complete asset */
const modalImageStyle = 'object-fit:contain;background:#fff;';
const modalPanelNote =
  '<p class="note"><strong>Both panels show the full modal uncropped.</strong> The spec table below covers the region for this section — header (§15), balance &amp; actions (§16), or detail tables (§17).</p>';

/** Hemlock token shorthand — design and dev both reference hemlock-library.lib.pen */
const T = {
  bgMain: 'colors-background-main (#F7F5F0)',
  bgSurface: 'colors-background-surface (#FFFFFF)',
  borderLight: 'colors-borders-light (#EEEDEB)',
  textHeader: 'colors-text-header / color-gray-900 (#0E0E0E)',
  textBody: 'colors-text-body (#403D3A)',
  textMeta: 'colors-text-meta (#5E5954)',
  textGray500: 'color-gray-500 (#716E6A)',
  textGray800: 'color-gray-800 (#2D2926)',
  textError: 'colors-text-error',
  textDeposit: 'colors-text-deposit (#148338)',
  btnSecondaryText: 'colors-btnSecondaryText (#2D2926)',
  btnSecondaryBorder: 'colors-btnSecondaryBorder (#D5D3D0)',
  /** List-page meta (NET WORTH, section headers, acctSubtype, refreshTime) — NOT colors-text-meta */
  listMeta: 'color-gray-500 (#716E6A) → dev: text-gray-500',
  /** Modal / detail-table labels only */
  detailMeta: 'colors-text-meta (#5E5954) → dev: text-text-meta',
  s3xs: 'spacing-3xs (4px)',
  s2xs: 'spacing-2xs (8px)',
  xs: 'spacing-xs (12px)',
  sm: 'spacing-sm (16px)',
  md: 'spacing-md (24px)',
  lg: 'spacing-lg (32px)',
  xl: 'spacing-xl (40px)',
  r2xs: 'radius-2xs (8px)',
  btnPrimaryBg: 'colors-btnPrimaryBg (#0E0E0E)',
  btnPrimaryText: 'colors-btnPrimaryText (#F7F5F0)',
  actionBlue: 'color-blue-600 (#2563EB)',
};

/** Full token-level rows for Hemlock outline buttons (0:aFIzk) */
function outlineButtonSpec(name, { nodeId, instanceName, devSource, devVariant, labelColorDesign, labelColorFix, paddingDesign }) {
  const labelDev = '`.eg-button-outline { color: rgb(var(--color-gray-800)) }` — or filled secondary text';
  const labelFix = labelColorFix ?? 'Use `colors-btnSecondaryText` — not gray-800 / filled secondary';
  return [
    [`${name} — Hemlock ref`, `${nodeId} · ${instanceName} → ref \`component/Button/outline\` (0:aFIzk)`, 'React `@money-evergreen/components/button` — not Pencil ref', 'Use Hemlock outline ref; override label only', 'Gap'],
    [`${name} — dev implementation`, 'Pencil ref · descendant overrides on `O:NRjjr`', devSource, 'Replace with Hemlock outline ref instance', 'Gap'],
    [`${name} — label font size`, 'Instance `typo-primary-sm-font-size` (14px) on `O:NRjjr`', 'OpenUI `.openui-button-base-small` → `--openui-text-body-sm` (14px)', 'No change — 14px sm slot', 'Match'],
    [`${name} — label font weight`, 'Label `fontWeight: 500` (medium) on `O:NRjjr`', 'OpenUI small body weight from theme bridge', 'Set label `fontWeight: 500`', 'Gap'],
    [`${name} — label color`, labelColorDesign ?? T.btnSecondaryText, labelDev, labelFix, 'Gap'],
    [`${name} — border color`, T.btnSecondaryBorder, '`.eg-button-outline { border-color: rgb(var(--color-gray-800)) }` (#2D2926) — or no border on filled secondary', 'Use `colors-btnSecondaryBorder` (#D5D3D0) — not gray-800', 'Gap'],
    [`${name} — border radius`, '`radius-full` (9999 pill)', '`.openui-button-base-small { border-radius: var(--openui-radius-full) }`', 'No change — same token', 'Match'],
    [`${name} — padding`, paddingDesign ?? 'Instance `[spacing-2xs, spacing-sm]` (8×16px)', '`.openui-button-base-small { padding: calc(var(--openui-space-2xs) - 1px) var(--openui-space-s) }`', 'Match Hemlock instance padding on outline ref', 'Gap'],
    [`${name} — background`, 'Transparent (outline variant)', '`.openui-button-base-secondary` filled gray-50 — when using Secondary variant', 'Outline ref must stay transparent — not filled secondary', 'Gap'],
    [`${name} — variant mapping`, 'Hemlock outline + btnSecondary token set', devVariant, 'Use `ButtonVariant.Outline` + Hemlock outline ref — not filled Secondary', 'Gap'],
  ];
}

/** Full token-level rows for Hemlock primary buttons (0:bMlax) */
function primaryButtonSpec(name, { nodeId, instanceName, devSource, devVariant, destructive = false }) {
  const fillDesign = destructive
    ? 'Instance fill override `colors-text-error` (destructive red in design export)'
    : `${T.btnPrimaryBg} · ${T.btnPrimaryText}`;
  const fillDev = '`.openui-button-base-primary { background-color: rgb(var(--color-gray-900)) }` — black primary';
  const fillFix = destructive
    ? 'Use Hemlock primary ref with destructive/error fill tokens — not default gray-900'
    : 'Use `colors-btnPrimaryBg` + `colors-btnPrimaryText` via ref (0:bMlax)';
  return [
    [`${name} — Hemlock ref`, `${nodeId} · ${instanceName} → ref \`component/Button\` (0:bMlax)`, 'React `@money-evergreen/components/button` — not Pencil ref', 'Use Hemlock primary ref instance', 'Gap'],
    [`${name} — dev implementation`, 'Pencil ref · descendant override on `O:sFmUs`', devSource, 'Replace with Hemlock primary ref instance', 'Gap'],
    [`${name} — label font size`, 'Component `typo-primary-base-font-size` (16px) on `O:sFmUs`', 'OpenUI `.openui-button-base-medium` / default size (16px)', 'No change — base size', 'Match'],
    [`${name} — label font weight`, 'Label `fontWeight: 500` (medium)', 'OpenUI primary body weight from theme bridge', 'Set label weight 500', 'Gap'],
    [`${name} — label color`, T.btnPrimaryText, '`.openui-button-base-primary { color: rgb(var(--color-gray-100)) }`', 'Use `colors-btnPrimaryText` — not raw gray-100', 'Gap'],
    [`${name} — fill / background`, fillDesign, fillDev, fillFix, 'Gap'],
    [`${name} — border radius`, '`radius-full` (9999 pill)', '`.openui-button-base { border-radius: var(--openui-radius-full) }`', 'No change — same token', 'Match'],
    [`${name} — padding`, 'Component `[spacing-xs, spacing-md]` (12×24px) — default on 0:bMlax', 'OpenUI `.openui-button-base-medium` bridge padding', 'Match Hemlock primary ref padding', 'Gap'],
    [`${name} — variant mapping`, 'Hemlock primary (0:bMlax)', devVariant, 'Wire to Hemlock primary ref — not generic Button Primary wrapper only', 'Gap'],
  ];
}

/** Full token-level rows for Hemlock text + icon-right buttons (0:sA6O0) */
function textIconButtonSpec(name, { nodeId, instanceName, devSource }) {
  return [
    [`${name} — Hemlock ref`, `${nodeId} · ${instanceName} → ref \`component/Button/text/icon-right\` (0:sA6O0)`, 'Plain `<button>` — not Pencil ref', 'Use Hemlock text/icon-right ref', 'Gap'],
    [`${name} — dev implementation`, 'Pencil ref · overrides on `O:PwKh4` + `O:IgL1c`', devSource, 'Replace hand-built button with Hemlock ref', 'Gap'],
    [`${name} — label font size`, 'Instance `typo-primary-sm-font-size` (14px) on `O:PwKh4`', 'Plain button · no OpenUI size class', 'Use ref label slot at sm (14px)', 'Gap'],
    [`${name} — label font weight`, 'Label `fontWeight: 500` (medium)', 'typo-primary-sm-regular (400)', 'Use medium (500) on text button ref', 'Gap'],
    [`${name} — label color`, T.actionBlue, 'text-text-action (semantic action token)', 'Use `color-blue-600` — not text-text-action alias alone', 'Gap'],
    [`${name} — icon slot`, 'Lucide chevron-right 16×16 · `color-blue-600`', 'Heroicons ChevronRightIcon h-4 w-4 · inherits text-text-action', 'Override icon to chevron-right 16×16 · color-blue-600', 'Match'],
    [`${name} — label ↔ icon gap`, 'Component gap `spacing-2xs` (8px)', 'Inner `gap-2xs` (spacing-2xs = 8px)', 'No change — same token', 'Match'],
    [`${name} — padding`, 'Component `[spacing-xs, 0]` — vertical xs, no horizontal pad on ref', 'py-xs on hand-built button', 'Match ref padding `[spacing-xs, 0]`', 'Gap'],
    [`${name} — border / background`, 'No border · transparent (text button variant)', 'No border · transparent', 'No change — text button only', 'Match'],
  ];
}

/** [property, design, dev, requiredChange, status] — Match when same Hemlock token resolves to same value */
const layoutRows = [
  ['Content column padding', `${T.md} vertical · ${T.xl} horizontal`, 'Shell wrapper — not py-md px-xl on content column', 'Apply py-md px-xl on accounts content column', 'Gap'],
  ['Headline row alignment', 'items-end (headline + CTA)', 'md:items-end on flex row', 'No change', 'Match'],
  ['Gap: NET WORTH label → value', T.s3xs, 'No gap-3xs on headline stack', 'Add gap-3xs on headline text stack', 'Gap'],
  ['Gap: headline block → first section', T.xl, 'gap-lg (spacing-lg = 32px)', 'Change page root gap-lg → gap-xl', 'Gap'],
  ['Gap: between sections', T.xl, 'gap-xl', 'No change — same token', 'Match'],
  ['Gap: section header → row list', T.xs, 'mb-xs (spacing-xs = 12px)', 'No change — same token', 'Match'],
  ['Gap: between rows', `${T.xs} + ${T.borderLight} divider`, 'mb-2xs wrapper; no row divider', 'spacing-xs between rows + border-borders-light divider', 'Gap'],
];

const netWorthLabelRows = [
  ['Font family', 'Heebo (typo-primary-sm-semibold)', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-sm-semibold (14px)', 'typo-primary-xs-regular (12px)', 'Use typo-primary-sm-semibold', 'Gap'],
  ['Font weight', '600 semibold', '400 regular', 'Use semibold (600)', 'Gap'],
  ['Color', T.textGray500, 'text-text-meta (colors-text-meta)', 'Use text-gray-500 — not text-text-meta', 'Gap'],
  ['Letter-spacing', '1px (hardcoded in design)', 'tracking-wide (~0.025em)', 'tracking-[1px]', 'Gap'],
  ['Text transform', 'ALL CAPS', 'CSS uppercase', 'No change if renders ALL CAPS', 'Match'],
];

const netWorthValueRows = [
  ['Font family', 'Heebo (typo-primary-3xl-semibold)', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-3xl-semibold (36px)', 'typo-primary-2xl-regular (30px)', 'Use typo-primary-3xl-semibold', 'Gap'],
  ['Font weight', '600 semibold', '400 regular', 'Use semibold (600)', 'Gap'],
  ['Color', T.textHeader, 'text-text-header', 'No change — same token', 'Match'],
  ['Letter-spacing', '−0.5px (hardcoded in design)', 'Not set', 'tracking-[-0.5px]', 'Gap'],
  ['Fraction digits', '0 (whole dollars in design sample)', '2 decimal places shown', 'maximumFractionDigits: 0 for headline', 'Gap'],
];

const buttonRows = [
  [
    'Hemlock component ref',
    'G2cAS · addBankBtn → ref `component/Button/outline/icon-right` (0:URoI8)',
    'React `@money-evergreen/components/button` — not a Pencil library ref',
    'Use Hemlock ref instance; override label + icon slot only',
    'Gap',
  ],
  [
    'Dev implementation',
    'Pencil ref with descendant overrides on 0:URoI8',
    '`pfm-accounts/index.tsx` — `Button variant={ButtonVariant.Outline} size="small"` + inner `<span className="flex items-center gap-2xs">`',
    'Replace hand-built OpenUI wrapper with Hemlock outline/icon-right ref',
    'Gap',
  ],
  ['Label text', '"Add Account"', '`t("accounts_page.add_account")`', 'No change — same copy slot', 'Match'],
  [
    'Icon slot',
    'Lucide `plus` 16×16 in `O:Rfqnh` (replaces default chevron-right 20×20)',
    '`PlusIcon` `@heroicons/react/20/solid` `h-4 w-4` (16px) after label',
    'Override ref icon slot to plus 16×16 icon-right',
    'Match',
  ],
  [
    'Content alignment',
    '`justifyContent: start` on ref G2cAS',
    'OpenUI `.openui-button-base` default (centered)',
    'Set `justifyContent: start` on outline/icon-right ref',
    'Gap',
  ],
  ['Label ↔ icon gap', 'Component gap `spacing-2xs` (8px)', 'Inner span `gap-2xs` (spacing-2xs = 8px)', 'No change — same token', 'Match'],
  [
    'Label font size',
    'Instance override `typo-primary-sm-font-size` (14px) on `O:HgzWB`',
    'OpenUI `.openui-button-base-small` → `--openui-text-body-sm` (14px)',
    'No change — 14px sm slot',
    'Match',
  ],
  [
    'Label font weight',
    'Label node `fontWeight: 500` (medium) on `O:HgzWB`',
    'OpenUI small body weight from theme bridge (not explicitly 500)',
    'Set label `fontWeight: 500` on outline/icon-right ref',
    'Gap',
  ],
  [
    'Label color',
    T.btnSecondaryText,
    '`.eg-button-outline { color: rgb(var(--color-gray-800)) }` — resolves #2D2926 but wrong token',
    'Use `colors-btnSecondaryText` — not raw `--color-gray-800` in button.css',
    'Gap',
  ],
  [
    'Icon color',
    T.btnSecondaryText,
    'Inherits `color-gray-800` from `.eg-button-outline` parent',
    'Icon slot uses `colors-btnSecondaryText` via ref — not gray-800 override',
    'Gap',
  ],
  [
    'Border color',
    T.btnSecondaryBorder,
    '`.eg-button-outline { border-color: rgb(var(--color-gray-800)) }` (#2D2926)',
    'Use `colors-btnSecondaryBorder` (#D5D3D0 / gray-200) — not gray-800',
    'Gap',
  ],
  ['Border width', '1px inner stroke on ref', '1px (OpenUI default + `.eg-button-outline`)', 'No change', 'Match'],
  [
    'Border radius',
    '`radius-full` (9999 pill)',
    '`.openui-button-base-small { border-radius: var(--openui-radius-full) }`',
    'No change — same token',
    'Match',
  ],
  [
    'Padding vertical',
    'Instance override `spacing-2xs` (8px) — padding `[2xs, xs]`',
    '`.openui-button-base-small { padding: calc(var(--openui-space-2xs) - 1px) … }` (~7px)',
    'Match Hemlock instance vertical padding `spacing-2xs` (8px)',
    'Gap',
  ],
  [
    'Padding horizontal',
    'Instance override `spacing-xs` (12px) — padding `[2xs, xs]`',
    '`.openui-button-base-small { … var(--openui-space-s) }` (OpenUI bridge token — not `spacing-xs`)',
    'Use `spacing-xs` (12px) horizontal on outline/icon-right ref',
    'Gap',
  ],
  [
    'Background',
    'Transparent (outline variant — no fill)',
    '`.eg-button-outline { background-color: transparent }`',
    'No change',
    'Match',
  ],
  [
    'Variant mapping',
    'Hemlock outline + btnSecondary token set',
    '`ButtonVariant.Outline` → OpenUI `secondary` + `.eg-button-outline` modifier (`button.tsx`)',
    'Outline must map to btnSecondary border/text tokens — not gray-800 border override',
    'Gap',
  ],
  ['Not allowed', '—', '—', 'Not filled primary · not ghost/link · not hand-built frame', '—'],
];

const sectionHeaderRows = [
  ['Font family', 'Heebo (typo-primary-sm-semibold)', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-sm-semibold (14px)', 'typo-primary-xs-regular (12px)', 'Use typo-primary-sm-semibold', 'Gap'],
  ['Font weight', '600 semibold', '400 regular', 'Use semibold (600)', 'Gap'],
  ['Color', T.textGray500, 'text-text-meta', 'Use text-gray-500 — not text-text-meta', 'Gap'],
  ['Letter-spacing', '1.5px (hardcoded in design)', 'tracking-wide', 'tracking-[1.5px]', 'Gap'],
  ['Text transform', 'ALL CAPS', 'CSS uppercase', 'No change if renders ALL CAPS', 'Match'],
  ['Space below header', T.xs, 'mb-xs (spacing-xs)', 'No change — same token', 'Match'],
];

const rowNameRows = [
  ['Font family', 'Heebo (typo-primary-sm-semibold)', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-sm-semibold (14px)', 'typo-primary-sm-regular (14px)', 'Use typo-primary-sm-semibold', 'Gap'],
  ['Font weight', '600 semibold', '400 regular', 'Use semibold (600)', 'Gap'],
  ['Color', T.textGray800, 'text-text-header (gray-900)', 'Use text-gray-800 — not text-text-header', 'Gap'],
  ['Mask punctuation spacing', '(x1234) — no spaces inside parens', '(x2204) — no spaces inside parens', 'No change', 'Match'],
  ['Trailing chevron (default state)', 'None on FglEA default rows', 'ChevronRightIcon always visible', 'Hide in default; show on hover only', 'Gap'],
];

const rowMetaLineRows = [
  ['Data source + slot', 'Line 2 — Plaid `subtype` (e.g. "Checking", "Brokerage", "Credit Card")', 'Line 2 — Plaid `type` (e.g. "Banking", "Investments") — wrong field', 'Use Plaid `subtype` — not top-level `type`. For example, "Brokerage" not "Investments", "Checking" not "Banking"', 'Gap'],
  ['Font family', 'Heebo', 'Heebo', 'No change', 'Match'],
  ['Font size', '14px (typo-primary-xs-regular family)', 'typo-primary-xs-regular (12px)', 'Use 14px / typo-primary-sm-regular', 'Gap'],
  ['Font weight', '400 regular', '400 regular', 'No change', 'Match'],
  ['Color', T.textGray500, 'text-text-meta', 'Use text-gray-500 — not text-text-meta', 'Gap'],
  ['Line height', '1.4286 (20px at 14px)', '16px line box at 12px', 'Use sm line-height (14/20)', 'Gap'],
];

const rowSyncLineRows = [
  ['Applies to', 'Line 3 (refresh timestamp)', 'Line 3 (sync badge)', 'Same typography slot', '—'],
  ['Font family', 'Heebo', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-xs-regular (12px)', 'typo-primary-xs-regular (12px)', 'No change', 'Match'],
  ['Font weight', '400 regular', '400 regular', 'No change', 'Match'],
  ['Color', T.textGray500, 'text-text-meta', 'Use text-gray-500 — not text-text-meta', 'Gap'],
  ['Line height', '1.3333 (16px at 12px)', 'xs default 12/16', 'No change', 'Match'],
];

const rowBalanceRows = [
  ['Alignment', 'Right-aligned in row', 'Right-aligned', 'No change', 'Match'],
  ['Font family', 'Heebo (typo-primary-sm-semibold)', 'Heebo', 'No change', 'Match'],
  ['Font size', 'typo-primary-sm-semibold (14px)', 'typo-primary-sm-regular (14px)', 'Use typo-primary-sm-semibold', 'Gap'],
  ['Font weight', '600 semibold', '400 regular', 'Use semibold (600)', 'Gap'],
  ['Color (positive balances)', T.textGray800, 'text-text-header (gray-900)', 'Use text-gray-800 — not text-text-header', 'Gap'],
  ['Color (negative / liability balances)', `${T.textGray800} — not error red`, 'text-text-header (not red)', 'No change', 'Match'],
  ['Fraction digits', '0 in design samples', 'May show cents', 'maximumFractionDigits: 0 on row amounts', 'Gap'],
];

const rowDefaultStateRows = [
  ['Design frame', 'FglEA / dVY3g (Accounts — Default)', 'Default list before interaction', 'Baseline resting row chrome', '—'],
  ['Background fill', 'Transparent', 'Transparent until hover', 'No change', 'Match'],
  ['Row vertical padding', T.xs, 'py-2xs (spacing-2xs = 8px)', 'Use py-xs (spacing-xs = 12px)', 'Gap'],
  ['Row horizontal padding', '0', 'px-2xs (spacing-2xs = 8px)', 'Use px-0 in default state', 'Gap'],
  ['Logo ↔ text ↔ balance gap', T.xs, 'gap-sm (spacing-sm = 16px)', 'Use gap-xs (spacing-xs = 12px)', 'Gap'],
  ['Info column line gap', T.s3xs, 'Stacked p tags — implicit', 'flex flex-col gap-3xs', 'Gap'],
  ['Row divider', T.borderLight, 'None', 'border-b border-borders-light per row', 'Gap'],
  ['Row corner radius', T.r2xs, 'rounded-lg (radius-2xs = 8px)', 'No change — same token', 'Match'],
  ['Chevron', 'None', 'Always visible', 'Hide in default; show on hover only', 'Gap'],
];

const rowHoverStateRows = [
  ['Design frame', 'eWQkU · row g2UJK (O:e19L89)', 'Ally row highlighted', 'Implement AccountRow hover variant', '—'],
  ['Background fill', T.bgMain, 'hover:bg-gray-50 (#F9FAFB)', 'Use bg-background-main — not gray-50', 'Gap'],
  ['Corner radius', '12px (spacing-xs)', 'rounded-lg (8px) on hover', 'Use rounded-xl (12px) on hover', 'Gap'],
  ['Padding', T.xs, 'Same as default (~8px)', 'py-xs px-xs on hover', 'Gap'],
  ['Chevron icon', '14×14 chevron-right · colors-text-header', 'Chevron always visible (wrong timing)', 'Show on hover only; 14px', 'Gap'],
  ['Title color (hover row)', 'typo-primary-sm-semibold · colors-text-header', 'text-text-header · regular weight', 'Use semibold on hover', 'Gap'],
  ['Meta line 2 color', T.textGray500, 'text-text-meta', 'Use text-gray-500 — acctSubtype uses color-gray-500 on hover too', 'Gap'],
  ['Meta line 3 color', T.textGray500, 'text-text-meta', 'Use text-gray-500 on sync line in hover/pressed', 'Gap'],
  ['Balance color', 'typo-primary-sm-semibold · colors-text-header', 'text-text-header · regular', 'Use semibold on hover', 'Gap'],
  ['Transition', 'Instant state swap in design', 'transition-colors on button', 'Optional subtle transition', 'Verify'],
];

const rowPressedStateRows = [
  ['Design frame', 'TShbt · row Pv3zG (O:W8aOnw)', 'Ally row active/pressed', 'Implement :active / pressed state', '—'],
  ['Background fill', 'color-taupe-200 (#EDEAE3)', 'No distinct pressed state', 'Use bg-taupe-200 or equivalent pressed surface', 'Gap'],
  ['Corner radius', T.xs, 'Same as hover (8px)', 'rounded-xl (12px) when pressed', 'Gap'],
  ['Padding', T.xs, 'Same as default', 'py-xs px-xs when pressed', 'Gap'],
  ['Typography', 'Same as hover state', 'Same as hover', 'Match hover typography; only background changes', 'Match'],
  ['Chevron', '14×14 · colors-text-header (visible)', 'Always visible', 'Keep visible while pressed', 'Gap'],
];

const detailShellRows = [
  ['Design frame', 'xGRDX · popup hIBWD', 'AccountDetailDialog on row click', 'Match modal shell to design', '—'],
  ['Scrim / overlay', '#000000 at 40%', 'bg-black/40', 'No change — same value', 'Match'],
  ['Modal width', '560px', 'w-[560px] max-w-full', 'No change', 'Match'],
  ['Modal corner radius', 'radius-xs (12px)', 'Dialog panel radius', 'Verify rounded-xl matches radius-xs', 'Verify'],
  ['Modal shadow', 'shadow-lg token', 'Dialog shadow token', 'Verify matches design elevation', 'Verify'],
  ['Modal background', T.bgSurface, 'White dialog surface', 'No change — same token', 'Match'],
  ['Body padding', T.xl, 'md:px-md pb-md (not uniform p-xl)', 'Use p-xl on scroll body', 'Gap'],
  ['Section gap inside body', T.lg, 'gap-lg (spacing-lg = 32px)', 'No change — same token', 'Match'],
  ['Scroll behavior', 'Single vertical scroll on modal body — no horizontal scroll, no nested scrollable regions', 'Double scroll: outer dialog + inner content both scrollable; horizontal scrollbar visible on modal body', 'Remove nested overflow-auto; set single `overflow-y: auto; overflow-x: hidden` on the modal body container only', 'Gap'],
  ['Horizontal overflow', 'No horizontal scroll — content fits within 560px modal width', 'Horizontal scrollbar appears (content or padding exceeds container width)', 'Fix content/padding so nothing overflows horizontally; add `overflow-x: hidden` as safeguard', 'Gap'],
];

const detailHeaderRows = [
  ['Title font', 'font-family-secondary · typo-primary-xl-semibold (24px) · colors-text-header', 'typo-secondary-xl-semibold · text-text-header', 'Noto Serif 24/600 via typo-secondary-xl-semibold', 'Verify'],
  ['Title section padding', `0 vertical · ${T.sm} horizontal`, 'px-sm py-sm', 'No change — spacing-sm horizontal', 'Match'],
  ['Institution logo size', '36 × 36px (modal) · 32 × 32px (list row)', 'w-9 h-9 modal · w-8 h-8 list', 'No change', 'Match'],
  ['Logo shape / border', 'Out of scope — user priority is logo source, not chrome', 'rounded-full + border on fallback', 'No formatting action', '—'],
  ['Close icon', 'Lucide X · 24×24 · colors-icons-meta', 'XMarkIcon h-5 w-5 (20px)', 'Use 24px icon; colors-icons-meta', 'Gap'],
  ['Header item gap', T.xs, 'gap-xs (spacing-xs = 12px)', 'No change — same token', 'Match'],
];

const detailBalanceRows = [
  ['Eyebrow label', 'typo-primary-2xs-regular · colors-text-meta · tracking 1.5px', 'typo-primary-xs-regular · text-text-meta', 'Color matches; use typo-primary-2xs-regular + tracking 1.5px', 'Gap'],
  ['Eyebrow → value gap', T.s3xs, 'gap-3xs', 'No change — same token', 'Match'],
  ['Balance value', 'typo-primary-2xl-semibold · colors-text-header (Heebo)', 'typo-secondary-xl-semibold (serif)', 'Use typo-primary-2xl-semibold — not serif', 'Gap'],
  ['Balance row padding', `${T.s2xs} vertical · 0 horizontal`, 'p-sm pb-0', 'Use py-2xs px-0', 'Gap'],
  ...outlineButtonSpec('Manage', {
    nodeId: 'qsmXG',
    instanceName: 'Manage Button',
    devSource: '`account-detail-connection-actions.tsx` — `Button variant={ButtonVariant.Secondary}` (`account-detail-manage-btn`)',
    devVariant: '`ButtonVariant.Secondary` → OpenUI filled secondary (gray-50 bg) — not outline',
    paddingDesign: 'Instance `[spacing-2xs, spacing-sm]` (8×16px)',
  }),
  ...outlineButtonSpec('Remove', {
    nodeId: 'p48Qbb',
    instanceName: 'Remove Button',
    devSource: '`Button variant={ButtonVariant.Secondary}` + `className="!text-text-error"` (`account-detail-remove-btn`)',
    devVariant: '`ButtonVariant.Secondary` filled + error text override — not outline ref',
    labelColorDesign: `${T.btnSecondaryText} label override → ${T.textError} on \`O:NRjjr\` only`,
    labelColorFix: 'Same outline ref as Manage; override label fill to `colors-text-error` only',
    paddingDesign: 'Instance `[spacing-2xs, spacing-sm]` (8×16px)',
  }),
  ['Action button gap', T.s2xs, 'gap-xs (spacing-xs = 12px)', 'Use gap-2xs between Manage and Remove', 'Gap'],
];

const detailTableRows = [
  ['Design frame', 'hIBWD · DetailSection groups (Account Details, Balances, Recent Activity)', 'identity-section · balance-section · recent-transactions-section', 'Match DetailRow pattern to design tables', '—'],
  ['Section header background', T.bgMain, 'bg-background-main', 'No change — same token', 'Match'],
  ['Section header padding', `${T.xs} vertical · ${T.sm} horizontal`, 'py-xs px-sm', 'No change — same tokens', 'Match'],
  ['Section header radius', `${T.r2xs} top corners only`, 'rounded-t-lg', 'No change — same token', 'Match'],
  ['Section header border', T.borderLight, 'border-b border-borders-light', 'No change — same token', 'Match'],
  ['Section title weight', 'typo-primary-sm-semibold (600)', 'typo-primary-sm-semibold class but renders bold/heavy (≈700)', 'Ensure section titles resolve to 600 — not bold', 'Gap'],
  ['Section title color', T.textHeader, 'text-text-header', 'No change — same token', 'Match'],
  ['Detail row padding', T.sm, 'h-[52px] px-sm', 'No change — spacing-sm', 'Match'],
  ['Detail row gap (label ↔ value)', T.xl, 'gap-sm (spacing-sm = 16px)', 'Use gap-xl (spacing-xl = 40px)', 'Gap'],
  ['Label column width', '140px fixed', 'w-[140px]', 'No change', 'Match'],
  ['Label typography', 'typo-primary-sm-regular · colors-text-meta', 'typo-primary-sm-regular · text-text-meta', 'Verify meta color reads at #5E5954 — not body gray', 'Verify'],
  ['Value typography (text rows)', 'typo-primary-sm-regular · colors-text-body', 'typo-primary-sm-regular · text-text-body', 'No change for nickname, institution, type, etc.', 'Match'],
  ['Value typography (money rows in Balances)', 'typo-primary-sm-regular · colors-text-body — same size as other values', 'typo-primary-base-semibold · text-text-header on Current/Available Balance', 'Use sm-regular + text-text-body — not base-semibold', 'Gap'],
  ['Account number row', 'Masked x1234 + 16px eye icon · colors-text-action (blue)', 'Plain x2204 text — no eye toggle', 'Add masked display + eye icon button (colors-text-action)', 'Gap'],
  ['Last Refreshed format', 'Date + time — e.g. May 13, 2026, 9:12 AM', 'Date only — May 17, 2026', 'Include time in last-refreshed formatter', 'Gap'],
  ['Recent Activity — date column', 'typo-primary-sm-regular · colors-text-meta · 80px', 'typo-primary-sm-regular · text-text-meta · w-[140px]', 'Use 80px date column width to match design', 'Gap'],
  ['Recent Activity — amount color', 'colors-text-body for debits (not red)', 'text-text-error (red) on negative amounts', 'Use text-text-body — do not call out negatives in red', 'Gap'],
  ['Recent Activity — amount weight/size', 'typo-primary-sm-regular · colors-text-body (inline with row)', 'typo-primary-base-semibold — larger than date/description', 'Use sm-regular + text-text-body — same scale as other row text', 'Gap'],
  ['Recent Activity — positive amounts', 'colors-text-deposit for credits (+$4,250)', 'text-text-deposit on positive (when present)', 'Keep deposit green only for positive credits', 'Match'],
  ['View All Activity alignment', 'Left-aligned with table — padding xs/sm, not centered', 'justify-center on Link row', 'Remove justify-center; left-align with Recent Activity table', 'Gap'],
  ['View All Activity styling', 'typo-primary-sm-medium · color-blue-600 · arrow-right icon', 'typo-primary-sm-regular · text-text-action · centered chevron', 'Left-align; match sm-medium + blue-600 action color', 'Gap'],
  ['Last row divider (all tables)', 'No bottom border on final row in each section — breathing room before next table', 'border-b on every row including last (identity-section omits isLast)', 'Pass isLast on final DetailRow; omit border on last transaction row', 'Gap'],
  ['Row divider (non-final rows)', T.borderLight, 'border-b border-borders-light', 'Keep dividers between rows — not after last', 'Match'],
];

const hemlockButtonRefRows = [
  ['G2cAS', 'addBankBtn (list CTA)', 'component/Button/outline/icon-right', 'Outline + right icon (0:URoI8)', 'Button Outline small + PlusIcon', 'Use Hemlock ref; override label + icon slot'],
  ['qsmXG', 'Manage Button', 'component/Button/outline', 'Outline text only (0:aFIzk)', 'Button Secondary (outline appearance)', 'Replace with Hemlock outline ref'],
  ['p48Qbb', 'Remove Button', 'component/Button/outline', 'Outline text only (0:aFIzk)', 'Secondary + error text styling', 'Same outline ref as Manage; label → colors-text-error'],
  ['kc5Be', 'Link Institution Button', 'component/Button/text/icon-right', 'Text action + chevron (0:sA6O0)', 'Plain `<button>` + text-text-action + ChevronRightIcon', 'Use Hemlock text/icon-right ref; label + icon → color-blue-600'],
  ['F1Qob', 'Cancel (remove confirm)', 'component/Button/outline', 'Outline text only (0:aFIzk)', 'Button Secondary', 'Use Hemlock outline ref; label "Cancel"'],
  ['x26EV', 'Remove Institution (confirm)', 'component/Button', 'Primary filled (0:bMlax)', 'Button Primary', 'Use Hemlock primary ref; label "Remove Institution"'],
  ['—', 'Cancel (Plaid error)', 'component/Button/outline', 'Outline text only (0:aFIzk)', 'Button Secondary (`plaid-error.tsx`)', 'Use Hemlock outline ref — no design frame in pen yet'],
  ['—', 'Try again (Plaid error)', 'component/Button', 'Primary filled (0:bMlax)', 'Button Primary (`plaid-error.tsx`)', 'Use Hemlock primary ref — no design frame in pen yet'],
];

const addAccountModalRows = [
  ['Design frame', 'i0Ih1j (desktop) · ugE8p (mobile)', 'AddAccountModal in PlaidLinkWrapper', 'Match ModalDrawer shell + body slots', '—'],
  ['Modal title', 'typo-primary-lg-font-size · typo-secondary-md-semibold · colors-text-header', 'Dialog title from PlaidLinkWrapper context', 'Serif lg semibold title "Add Account"', 'Gap'],
  ['Description', 'typo-primary-base-font-size · colors-text-body', 'typo-primary-base-regular · text-text-body', 'No change — same scale', 'Match'],
  ['Section label', 'typo-primary-sm-semibold · color-gray-500 · tracking 1.5px · ALL CAPS', 'typo-primary-sm-semibold · text-text-meta · tracking-[0.15em]', 'Use color-gray-500 — not text-text-meta', 'Gap'],
  ['Institution tiles', 'Logo grid in design — InstitutionLogoCard pattern', 'InstitutionLogoCard flex-wrap gap-sm', 'Match tile layout when logoUrl present', 'Verify'],
  ...textIconButtonSpec('Link new institution', {
    nodeId: 'kc5Be',
    instanceName: 'Link Institution Button',
    devSource: '`add-account-modal.tsx` — plain `<button>` + text-text-action + ChevronRightIcon',
  }),
];

const removeInstitutionModalRows = [
  ['Design frame', 'G9xXUO (desktop) · FOSbt (mobile) · panel fG4nj', 'InstitutionRemoveConfirmView', 'Wire to Hemlock ModalDrawer footer refs', '—'],
  [
    'Title copy',
    '"Remove Institution?" (EdW3A)',
    '"Remove Institution Connection" (`remove_confirm_title`)',
    'Align copy to design — or update design if dev copy is canonical',
    'Gap',
  ],
  [
    'Title typography',
    'typo-primary-lg-bold (700) · colors-text-header · left-aligned',
    'typo-secondary-lg-semibold · text-text-header · text-center',
    'Use typo-primary-lg-bold left-aligned — or match updated copy spec',
    'Gap',
  ],
  [
    'Body copy',
    'Lists accounts to remove + re-link note (AHRMS)',
    'Short confirm: "Are you sure you want to remove {{institution}}?"',
    'Match design body pattern with account list — not one-line confirm',
    'Gap',
  ],
  ...outlineButtonSpec('Cancel', {
    nodeId: 'F1Qob',
    instanceName: 'Secondary Action',
    devSource: '`institution-remove-confirm-dialog.tsx` — `Button variant={ButtonVariant.Secondary}` (`remove-cancel-btn`)',
    devVariant: '`ButtonVariant.Secondary` → filled secondary — not outline ref',
    paddingDesign: 'Default on 0:aFIzk (component `[spacing-xs, spacing-md]` asymmetric) — footer ref',
  }),
  ...primaryButtonSpec('Remove Institution', {
    nodeId: 'x26EV',
    instanceName: 'Primary Action',
    devSource: '`institution-remove-confirm-dialog.tsx` — `Button variant={ButtonVariant.Primary}` (`remove-confirm-btn`)',
    devVariant: '`ButtonVariant.Primary` → OpenUI gray-900 primary — not destructive fill',
    destructive: true,
  }),
  ['Footer button gap', '12px hardcoded in footerSlot', 'gap-sm (spacing-sm = 16px)', 'Use spacing-sm (12px) or match design footer gap', 'Verify'],
  ['Footer alignment', 'justifyContent: end on footerSlot', 'justify-center on button row', 'Right-align footer actions — match design', 'Gap'],
];

const plaidErrorModalRows = [
  ['Design frame', 'SXiFh "Accounts - Plaid Linking Error" in pfm-accounts-v2.pen', 'PlaidError · plaid-error.tsx', 'Compare design to dev implementation', '—'],
  ['Modal title', '"Account Linking Unavailable"', 'setModalTitle → "Plaid Linking Error"', 'Match design title: "Account Linking Unavailable"', 'Gap'],
  [
    'Error body',
    '"We were unable to start the connection. Please try again later."',
    'typo-primary-base-regular · text-text-body',
    'Match design copy exactly',
    'Gap',
  ],
  ...outlineButtonSpec('Cancel (Plaid error)', {
    nodeId: 'SXiFh',
    instanceName: 'Cancel button — outline style',
    devSource: '`plaid-error.tsx` — `Button variant={ButtonVariant.Secondary}` · `w-full` (`plaid-link-error-cancel-button`)',
    devVariant: '`ButtonVariant.Secondary` filled — not outline ref',
    paddingDesign: 'Outline ref (0:aFIzk)',
  }),
  ...primaryButtonSpec('Try Again (Plaid error)', {
    nodeId: 'SXiFh',
    instanceName: 'Try Again button — primary black filled',
    devSource: '`plaid-error.tsx` — `Button variant={ButtonVariant.Primary}` · `w-full` · isLoading (`plaid-link-error-retry-button`)',
    devVariant: '`ButtonVariant.Primary` → gray-900 primary',
    destructive: false,
  }),
  ['Button layout', 'Stacked vertically — Try Again on top, Cancel below', 'flex justify-end gap-sm · both buttons `w-full`', 'Stack buttons vertically per design', 'Gap'],
];

const mobileDetailRows = [
  ['Presentation', 'Full-screen takeover (bottom sheet or full page) at mobile breakpoints', 'Centered floating dialog — same as desktop; does not adapt to viewport', 'Use full-screen modal or bottom sheet pattern below sm breakpoint (640px)', 'Gap'],
  ['Title truncation', 'Account name fully visible or wraps gracefully', 'Account name truncated with text-overflow: ellipsis — context lost', 'Allow title to wrap to 2 lines or use a smaller font-size at mobile widths', 'Gap'],
  ['Double scroll', 'Single vertical scroll on modal body (same as §14 desktop fix)', 'Outer dialog + inner content both scrollable — worse on small viewport', 'Same fix as §14 — remove nested overflow-auto; single overflow-y: auto on body', 'Gap'],
  ['Horizontal overflow', 'No horizontal scroll — content fits within viewport width', 'Horizontal scrollbar visible — content or padding exceeds mobile viewport', 'Ensure content respects 100vw minus modal padding; add overflow-x: hidden as safeguard', 'Gap'],
  ['Responsive padding', 'Reduced horizontal padding at narrow viewports (e.g. p-md instead of p-xl)', 'Desktop p-xl (24px) padding applied regardless of viewport width', 'Add responsive padding: p-md (16px) below sm breakpoint', 'Gap'],
  ['Touch targets', 'Manage / Remove buttons meet 44px minimum touch target height', 'Buttons render at desktop height (~36px) — may be too small for touch', 'Ensure min-height: 44px on action buttons at mobile breakpoints', 'Gap'],
  ['Detail table cell padding', 'spacing-xs (12px) left + right padding on header and body rows in mini detail tables (e.g. Account Details, Balance, Identity)', 'spacing-sm (16px) — desktop value applied at all viewports', 'Below sm breakpoint: reduce cell px from spacing-sm (16px) to spacing-xs (12px). Applies to modal detail tables only — not account list rows, not desktop.', 'Gap'],
  ['Typography — meta labels', 'Same tokens as desktop (§15–17) — no mobile-specific change', 'Same tokens as desktop — no mobile-specific issue', 'No change — same as desktop sections §15–17', 'Match'],
  ['Typography — values', 'Same tokens as desktop — no mobile-specific change', 'Same tokens as desktop — no mobile-specific issue', 'No change', 'Match'],
];

const mobileHomeRows = [
  ['Page title', '"Accounts" — typo-primary-lg-semibold · left-aligned next to hamburger icon', '"Net Worth | Accounts" — typo-primary-base-semibold · centered between hamburger and chat icons', 'Match design: just "Accounts" without "Net Worth |" prefix at mobile; increase size to lg', 'Gap'],
  ['Nav header', 'Hamburger icon (left) + "Accounts" title (left) + Chat icon (right) — single row', 'Hamburger icon (left) + "Net Worth | Accounts" (center) + Chat icon (right)', 'Left-align title beside hamburger; drop "Net Worth |" prefix', 'Gap'],
  ['Net Worth label', '"NET WORTH" — typo-primary-xs-semibold · color-text-meta · tracking uppercase', '"NET WORTH" — same treatment', 'Match — no change needed', 'Match'],
  ['Net Worth value', '$1,169,200 — typo-primary-3xl-light (~30px) · colors-text-header', '$3,575,547.32 — typo-primary-2xl-regular', 'Use 3xl light (larger, thinner weight) to match design prominence', 'Gap'],
  ['Net Worth decimal', 'No decimal places shown — round number "$1,169,200"', 'Shows cents "$3,575,547.32"', 'Hide decimal/cents for cleaner mobile presentation (match design)', 'Gap'],
  ['Add Account button', 'Outline pill button "Add Account +" — typo-primary-sm-regular · 1px border · rounded-full', 'Same outline pill "Add Account +" — slightly different sizing', 'Verify button height and padding match design proportions', 'Check'],
  ['Section headers (BANKING, INVESTMENTS, etc.)', 'typo-primary-xs-semibold · color-gray-500 · tracking ~1.5px · ALL CAPS — generous top margin', 'typo-primary-xs-semibold · text-text-meta · ALL CAPS — similar', 'Match color-gray-500 token; verify spacing above each section', 'Check'],
  ['Account row — name', 'Full name visible: "Wells Fargo Checking (x1234)" — typo-primary-base-semibold', 'Truncated: "Marcus Online Savings (..." with ellipsis — typo-primary-sm-semibold', 'Show full name (no truncation) or allow wrap; use base (not sm) size', 'Gap'],
  ['Account row — type', '"Checking", "Savings", etc. — typo-primary-sm-regular · color-text-body', '"Banking" for all — generic category instead of specific type', 'Use Plaid subtype (Checking, Savings, Brokerage) not generic category', 'Gap'],
  ['Account row — sync line', '"Refreshed Jun 3, 2026 at 9:12 AM" — typo-primary-xs-regular · color-gray-500', '"Last synced May 17, 2026" — typo-primary-xs-regular · color-gray-500', 'Match design date format: "Refreshed {date} at {time}"', 'Gap'],
  ['Account row — balance', 'Right-aligned · typo-primary-base-semibold · colors-text-header · no decimals ("$12,400")', 'Right-aligned · typo-primary-sm-regular · "$325,000.00" with decimals', 'Use base-semibold (bolder, larger); hide decimal cents to match design', 'Gap'],
  ['Account row — balance decimals', 'No decimal: "$12,400", "$32,000", "$485,000"', 'Full cents: "$325,000.00", "$145,000.00"', 'Remove .00 decimals for whole-dollar balances', 'Gap'],
  ['Account row — logo size', '~32px circles with actual institution logos', '~32px circles — letter initials or logos', 'Match — when logoUrl available, display actual logo', 'Check'],
  ['Account row — chevron', 'No visible chevron arrow — row is tappable without indicator', '"> " chevron indicator after account name', 'Per design: no chevron indicator on mobile rows (tap affordance is implicit)', 'Gap'],
  ['Row vertical spacing', 'Generous py (~16px) between rows — spacious list feel', 'Tighter py (~8px) between rows — compact', 'Increase row vertical padding to match design spaciousness', 'Gap'],
  ['Row separator', 'No visible dividers between rows — spacing alone separates', 'No dividers — spacing separates', 'Match — no change needed', 'Match'],
  ['Content padding (horizontal)', '~16px left/right page padding', '~16px left/right — similar', 'Match — verify exact px value', 'Check'],
  ['Bottom area', 'List ends cleanly — no extra elements below last row', 'Large empty white space below last row + chat input bar', 'Verify chat input does not overlap content area', 'Check'],
];

const mobilePressMobileRows = [
  ['Press feedback', 'Row highlights with warm beige/tan background (#e8e0d4 or similar Hemlock token) on touch-down', 'Row shows same beige/tan background on :active state', 'Match — verify color matches Hemlock pressed token exactly', 'Check'],
  ['Press color token', 'Warm tan/beige — appears to be color-surface-pressed or similar Hemlock token', 'Similar tan — using bg-surface-pressed or inline style', 'Verify exact Hemlock token: should be same as desktop pressed state (§12)', 'Check'],
  ['Press border-radius', 'Pressed highlight has rounded-lg corners matching row shape', 'Pressed highlight has rounded corners — appears rounded-lg', 'Match — same radius as desktop', 'Check'],
  ['Press covers full row', 'Background fill spans entire row width including logo and balance', 'Same — background covers full row width', 'Match', 'Match'],
  ['Press timing', 'Immediate feedback on touch-down — no delay', 'Verify touch-start triggers :active immediately (no 300ms delay from tap-highlight)', 'Ensure -webkit-tap-highlight-color is disabled; use :active for instant feedback', 'Check'],
  ['Press transition', 'Appears as instant fill (no fade-in visible in design)', 'May use transition — check CSS', 'Match design: instant or very fast (< 50ms) background change on press', 'Check'],
  ['Row text during press', 'All text (name, type, sync, balance) remains unchanged during press — no color shift', 'Same — text colors stable during active state', 'Match — no text color change needed', 'Match'],
  ['Release → navigate', 'On release, row returns to default and navigates to account detail', 'On tap (mouseup/touchend), opens account detail dialog', 'Behavior match — press shows feedback, release navigates', 'Match'],
];

const mobileAddAccountRows = [
  ['Modal presentation', 'Bottom sheet anchored to bottom of viewport — rounded top corners, no scrim gap at top', 'Centered floating dialog with scrim — same as desktop; does not adapt to mobile viewport', 'Use bottom sheet pattern (anchored to bottom, full-width, rounded top corners) below sm breakpoint', 'Gap'],
  ['Modal width', 'Full viewport width (edge-to-edge minus small side margin)', 'Narrow centered dialog ~280px — does not fill mobile viewport', 'Modal should span full width at 390px viewport', 'Gap'],
  ['Title typography', 'typo-primary-lg-bold (serif "Add Account") — large, left-aligned', 'typo-primary-base-semibold — smaller than design', 'Use larger title size to match design; bold serif weight', 'Gap'],
  ['Title padding / spacing', 'Generous top padding (~24px) above title inside modal', 'Tighter padding (~16px) above title', 'Increase top internal padding to match design spacing', 'Gap'],
  ['Description text', '"Add accounts from your linked institutions." — typo-primary-base-regular · left-aligned', 'Same copy, same alignment', 'Match — no change needed', 'Match'],
  ['Section label ("LINKED INSTITUTIONS")', 'typo-primary-sm-semibold · color-gray-500 · tracking 1.5px · ALL CAPS — with spacing above', 'Same treatment — ALL CAPS, gray', 'Verify tracking and color token match', 'Check'],
  ['Institution logo tiles', '5 logos per row in a grid, wrapping to second row (6 total shown); logos are actual institution images', 'Circular avatars in a row of 3, wrapping to second row (4 total); letter initials or logos', 'Match design grid — show actual logos when logoUrl available; fit 5 per row', 'Gap'],
  ['Logo tile size', '~48px circles with actual institution branding', '~56px circles — slightly larger than design', 'Match design size (~48px) and ensure consistent sizing', 'Gap'],
  ['Logo tile labels', 'No text labels under logos — logo images are self-explanatory', 'Institution name labels below each circle ("Chase", "Marcus by Goldman Sachs", etc.)', 'Remove labels under logos to match design — logos should be recognizable without text', 'Gap'],
  ['"Link New Institution" button', 'Blue text link with chevron-right icon — left-aligned · typo-primary-base-regular · color-text-action', 'Blue text "Link new institution ›" — same style', 'Match — verify touch target is ≥44px tall', 'Match'],
  ['Close button (X)', 'Top-right X icon, right-aligned with title row', 'Same placement — top-right X', 'Ensure 44×44px touch target at mobile', 'Check'],
  ['Bottom spacing', 'Ample bottom padding below "Link New Institution" link before modal edge', 'Similar bottom padding', 'Match design spacing', 'Check'],
];

const mobileRemoveInstitutionRows = [
  ['Modal presentation', 'Bottom sheet overlaying account detail (itself full-screen) — rounded top corners, vertically centered content', 'Centered floating dialog (~280px wide) over account detail dialog — same as desktop', 'Use bottom sheet at mobile; account detail should already be full-screen takeover', 'Gap'],
  ['Modal width', 'Full viewport width (edge-to-edge minus small side margin) — content fills available width', 'Narrow centered dialog — does not fill mobile viewport', 'Modal should span full width at 390px viewport', 'Gap'],
  ['Background context', 'Account detail (full-screen) visible behind the bottom sheet scrim', 'Account list page visible behind — account detail is also a floating dialog', 'Account detail must be full-screen first; remove confirmation overlays on top', 'Gap'],
  ['Title copy', '"Remove Institution?" — concise question form', '"Remove Institution Connection" — longer, centered', 'Match design copy: "Remove Institution?"', 'Gap'],
  ['Title typography', 'typo-primary-lg-bold · left-aligned · colors-text-header', 'typo-primary-base-bold · text-center · text-text-header', 'Use larger bold left-aligned title to match design', 'Gap'],
  ['Title alignment', 'Left-aligned with close X on same row', 'Center-aligned, close X separate or absent', 'Left-align title with X on right, same row as design', 'Gap'],
  ['Body copy', 'Multi-line description listing affected accounts: "The following accounts linked to {{Institution Name}} will be removed. To keep specific accounts, you must re-link them individually after removal."', '"Are you sure you want to remove Marcus by Goldman Sachs? Evergreen will stop syncing data from this institution." — short single paragraph', 'Match design copy pattern — explain consequences and list affected accounts', 'Gap'],
  ['Body typography', 'typo-primary-base-regular · colors-text-body · left-aligned', 'typo-primary-sm-regular · text-text-body · text-center', 'Use base (not sm) font-size, left-align to match design', 'Gap'],
  ['Affected accounts list', 'Lists each account with logo + name + last4 + type (e.g., Wells Fargo Checking x1234, Checking)', 'No account list — only institution name in body text', 'Add affected accounts list with logo + account name + type per design', 'Gap'],
  ['Account list item style', 'Logo (40px circle) + account name (bold) + type (regular) — vertically stacked rows', 'N/A — not present in dev', 'Implement account row items per design layout', 'Gap'],
  ['Button layout', 'Stacked full-width: red "Remove Institution" primary on TOP, outline "Cancel" below — vertical gap between', 'Side-by-side: outline "Cancel" on left, filled "Remove Institution" on right — horizontal layout', 'Stack buttons vertically at full width; destructive action on top', 'Gap'],
  ['Primary button (Remove)', 'Full-width · red fill (destructive) · white text · rounded-full · ~48px height', 'Small pill ~140px · black fill · white text "Remove Institution"', 'Full-width red destructive button with sufficient height for touch', 'Gap'],
  ['Secondary button (Cancel)', 'Full-width · outline style (1px border) · "Cancel" text · rounded-full · ~48px height', 'Small pill ~80px · outline style · "Cancel"', 'Full-width outline button below destructive button', 'Gap'],
  ['Button spacing', 'spacing-sm (12px) gap between stacked buttons', 'spacing-xs gap between side-by-side buttons', 'Use 12px vertical gap between stacked buttons', 'Gap'],
  ['Close button (X)', 'Top-right X icon in title row', 'X present — same position', 'Ensure 44×44px touch target', 'Check'],
  ['Internal padding', 'Generous horizontal padding (~24px) — content comfortably inset from edges', 'Tighter padding (~16px)', 'Increase horizontal padding to match design proportions', 'Gap'],
];

const mobilePlaidErrorRows = [
  ['Modal presentation', 'Bottom sheet anchored to bottom — rounded top corners, generous internal padding, no scrim gap at top', 'Centered floating dialog (~280px wide) — same as desktop; does not adapt to mobile viewport', 'Use bottom sheet pattern at mobile viewport', 'Gap'],
  ['Modal width', 'Full viewport width (edge-to-edge minus small side margin)', 'Narrow centered dialog — does not fill mobile viewport', 'Modal should span full width at 390px viewport', 'Gap'],
  ['Title copy', '"Account Linking Unavailable" — wraps to two lines at narrow width', '"Plaid Linking Error" — single line, different wording', 'Match design title: "Account Linking Unavailable"', 'Gap'],
  ['Title typography', 'typo-primary-lg-bold · left-aligned · colors-text-header', 'typo-primary-sm-semibold · left-aligned', 'Use larger bold title size to match design', 'Gap'],
  ['Title size', 'Large (~20px+) — prominent heading that wraps naturally', 'Small (~14px) — reads as a secondary label', 'Increase title font-size to match design prominence', 'Gap'],
  ['Error icon + headline', 'No error icon or red headline — just title + body text', 'Red clock/error icon + red headline "Instant linking is unavailable" between title and body', 'Remove red icon + headline — not in design. OR update design to include it.', 'Gap'],
  ['Body copy', '"We were unable to start the connection. Please try again later." — typo-primary-base-regular · left-aligned', 'Same copy — "We were unable to start the connection. Please try again later." · smaller font', 'Match design typography: base size, left-aligned', 'Gap'],
  ['Body font size', 'typo-primary-base-regular (~16px)', 'typo-primary-sm-regular (~14px)', 'Use base (16px) not sm (14px) for body copy', 'Gap'],
  ['Vertical spacing (title → body)', '~24px gap between title and body text', '~12px gap — tighter vertical rhythm', 'Increase spacing between title and body to match design generosity', 'Gap'],
  ['Button layout', 'Stacked full-width vertically: black "Try Again" primary on TOP, outline "Cancel" below', 'Side-by-side: outline "Cancel" on left, filled "Try again" on right — horizontal', 'Stack buttons vertically at full width; primary action on top', 'Gap'],
  ['Primary button (Try Again)', 'Full-width · black fill · white text "Try Again" · rounded-full · ~48px height', 'Small pill ~120px · black fill · "Try again"', 'Full-width black primary button', 'Gap'],
  ['Secondary button (Cancel)', 'Full-width · outline style (1px border) · "Cancel" · rounded-full · ~48px height', 'Small pill ~100px · outline style · "Cancel"', 'Full-width outline button below primary', 'Gap'],
  ['Button spacing', 'spacing-sm (12px) vertical gap between stacked buttons', 'spacing-xs horizontal gap between side-by-side buttons', 'Use 12px vertical gap between stacked buttons', 'Gap'],
  ['Close button (X)', 'Top-right X icon, vertically centered with title — slightly lower due to title wrap', 'Top-right X icon, aligned with title', 'Ensure 44×44px touch target; position relative to first line of title', 'Check'],
  ['Internal padding', 'Generous padding (~24px horizontal, ~32px top, ~24px bottom)', 'Tighter padding (~16px all around)', 'Increase internal padding to match design proportions', 'Gap'],
];

function hemlockRefTable(rows) {
  const head = ['Node ID', 'Instance name', 'Hemlock component', 'Variant / ref', 'Dev today', 'Required change in dev']
    .map((h) => `<th>${h}</th>`)
    .join('');
  const body = rows
    .map(([a, b, c, d, e, f]) => `<tr><td><code>${a}</code></td><td>${b}</td><td><code>${c}</code></td><td>${d}</td><td>${e}</td><td>${f}</td></tr>`)
    .join('\n');
  return `<table class="spec-table hemlock-ref-table"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function refSection(num, title, subtitle, tableHtml, noteHtml = '') {
  return `
  <section class="page" id="s${num}">
    <h2>${num}. ${title}</h2>
    <p class="subtitle">${subtitle}</p>
    ${tableHtml}
    ${noteHtml}
  </section>`;
}

const logoRows = [
  ['Data source', 'Plaid institution logo URL on every linked institution', 'logoUrl present for Fidelity + Schwab only; Marcus, Chase, etc. fall back to letter avatars', 'Backend must populate LinkedExternalInstitution.logoUrl from Plaid for all linked items — not a frontend formatting fix', 'Gap'],
  ['Frontend render path (list rows)', 'Show logo image when URL present', 'account-row.tsx: img when institution.logoUrl, else initial letter — logic is correct', 'Fix data pipeline; no row component change needed unless URL arrives empty', 'Match'],
  ['Frontend render path (account detail header)', 'Institution logo in modal header beside account name', 'account-detail-dialog.tsx: same logoUrl conditional render', 'Same fix — once backend populates logoUrl, detail header shows logo', 'Match'],
  ['Frontend render path (Add Account modal tiles)', 'Institution logo tiles in linked-institutions grid', 'InstitutionLogoCard: renders logoUrl when present, letter fallback otherwise', 'Same fix — backend must supply logoUrl for all institutions', 'Match'],
  ['GraphQL field', 'logoUrl on externalAccounts.institutions', 'customerDetails / profile queries already request logoUrl', 'Ensure backend resolver returns Plaid logo for every institution', 'Gap'],
  ['List row dimensions', '32 × 32px', 'w-8 h-8 (32px)', 'No change once logo URL is present', 'Match'],
  ['Account detail header dimensions', '36 × 36px', 'w-9 h-9 (36px)', 'No change once logo URL is present', 'Match'],
  ['Add Account modal tile dimensions', '48 × 48px (circle)', 'w-12 h-12 rounded-full (48px)', 'No change once logo URL is present', 'Match'],
];

const devFiles = [
  ['Net worth label + value', 'packages/features/external-accounts/src/components/net-worth-headline/net-worth-headline.tsx'],
  ['Add Account button + page gaps', 'packages/features/external-accounts/src/pages/pfm-accounts/index.tsx'],
  ['Outline button border/text overrides', 'shared-packages/packages/components/src/button/button.css → `.eg-button-outline`'],
  ['Section header typography', 'packages/features/external-accounts/src/components/account-group-section/account-group-section.tsx'],
  ['Row default / hover / pressed', 'packages/features/external-accounts/src/components/account-row/account-row.tsx'],
  ['Institution logoUrl (Plaid → GraphQL)', 'Backend: LinkedExternalInstitution.logoUrl resolver · Plaid /institutions/get logo field'],
  ['Sync line typography', 'packages/features/external-accounts/src/components/last-synced-badge/last-synced-badge.tsx'],
  ['Account detail dialog shell + header', 'packages/features/external-accounts/src/components/account-detail-dialog/account-detail-dialog.tsx'],
  ['Detail sections + rows', 'identity-section.tsx · detail-row.tsx · balance-section.tsx · recent-transactions-section.tsx'],
  ['Manage / Remove buttons (Hemlock outline refs)', 'packages/features/external-accounts/src/components/account-detail-dialog/account-detail-connection-actions.tsx'],
  ['Add Account modal', 'packages/features/external-accounts/src/components/plaid-link/add-account-modal/add-account-modal.tsx'],
  ['Remove institution confirm', 'packages/features/external-accounts/src/components/account-detail-dialog/institution-remove-confirm-dialog.tsx'],
  ['Plaid linking error', 'packages/features/external-accounts/src/components/plaid-link/plaid-error/plaid-error.tsx'],
  ['Hemlock library', 'hemlock-library.lib.pen → component/Button/outline · outline/icon-right · text/icon-right · primary'],
];

function table(rows) {
  const head = ['Property', 'Design (Hemlock token)', 'Dev (Hemlock token / class)', 'Required change in dev', 'Status']
    .map((h) => `<th>${h}</th>`)
    .join('');
  const body = rows
    .map(([a, b, c, d, status]) => {
      const badge =
        status === 'Match'
          ? '<span class="badge match">Match</span>'
          : status === 'Verify'
            ? '<span class="badge warn">Verify</span>'
            : status === '—'
              ? '—'
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
    : `<div class="dev-note">${devNote || 'Dev screenshot needed.'}</div>`;
  const designPanel = designImg
    ? `<img src="${designImg}" alt="Design: ${title}" ${designStyle} />`
    : `<div class="dev-note">${designNote || 'Design export needed.'}</div>`;
  return `
  <section class="page" id="s${num}">
    <h2>${num}. ${title}</h2>
    <p class="subtitle">${subtitle}</p>
    <div class="compare">
      <div class="panel design-panel">
        <div class="panel-label design">Design — pfm-accounts-v2.pen</div>
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
  ...netWorthLabelRows,
  ...netWorthValueRows,
  ...buttonRows,
  ...sectionHeaderRows,
  ...rowNameRows,
  ...rowMetaLineRows,
  ...rowSyncLineRows,
  ...rowBalanceRows,
  ...rowDefaultStateRows,
  ...rowHoverStateRows,
  ...rowPressedStateRows,
  ...logoRows,
  ...detailShellRows,
  ...detailHeaderRows,
  ...detailBalanceRows,
  ...detailTableRows,
  ...addAccountModalRows,
  ...removeInstitutionModalRows,
  ...plaidErrorModalRows,
  ...mobileHomeRows,
  ...mobilePressMobileRows,
  ...mobileDetailRows,
  ...mobileAddAccountRows,
  ...mobileRemoveInstitutionRows,
  ...mobilePlaidErrorRows,
  ...hemlockButtonRefRows.map(([node, inst, comp, variant, dev, req]) => [
    `Hemlock ref — ${inst}`,
    `${node} → ${comp} (${variant})`,
    dev,
    req,
    'Gap',
  ]),
];

const gapCount = masterRows.filter((r) => r[4] === 'Gap').length;
const matchCount = masterRows.filter((r) => r[4] === 'Match').length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PFM Accounts v2 — Formatting: Design vs Dev</title>
  <style>
    :root {
      --bg: #f4f2ee;
      --paper: #fff;
      --text: #1a1a1a;
      --muted: #5c5c5c;
      --line: #e0ddd6;
      --design: #2d6a4f;
      --dev: #9b2226;
      --match: #386641;
      --gap: #bc4749;
      --warn: #b8860b;
    }
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; background: var(--bg); color: var(--text); font: 15px/1.55 "Helvetica Neue", Helvetica, Arial, sans-serif; }
    .doc { max-width: 1360px; margin: 0 auto; padding: 32px 28px 64px 28px; }
    .cover { background: var(--paper); border: 1px solid var(--line); padding: 40px 48px; margin-bottom: 28px; }
    .cover h1 { margin: 0 0 8px; font-size: 28px; font-weight: 600; line-height: 1.25; }
    .cover .meta { color: var(--muted); font-size: 14px; margin-bottom: 16px; }
    .cover p { margin: 0 0 10px; font-size: 14px; max-width: 960px; }
    .stats { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0 8px; }
    .stat { padding: 10px 16px; border-radius: 8px; font-size: 13px; border: 1px solid var(--line); background: #faf8f4; }
    .stat strong { display: block; font-size: 22px; margin-bottom: 2px; }
    .stat.gaps strong { color: var(--gap); }
    .stat.matches strong { color: var(--match); }
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
    .hemlock-ref-table td:first-child { width: 8%; }
    .hemlock-ref-table td:nth-child(2) { width: 12%; }
    .hemlock-ref-table td:nth-child(3) { width: 22%; }
    .hemlock-ref-table td:nth-child(4) { width: 16%; }
    .hemlock-ref-table td:nth-child(5) { width: 18%; }
    .hemlock-ref-table td:nth-child(6) { width: 24%; white-space: normal; }
    .spec-table code, .file-table code { font-size: 11px; word-break: break-all; }
    .dev-note { padding: 24px 20px; font-size: 13px; line-height: 1.6; color: var(--muted); min-height: 120px; background: #faf8f4; }
    .note { background: #f0f7ff; border-left: 3px solid #4a7c9b; padding: 10px 14px; font-size: 13px; margin: 12px 0 0; }
    .toc { columns: 2; font-size: 13px; line-height: 1.75; margin-top: 14px; }
    .footer { text-align: center; color: var(--muted); font-size: 12px; margin-top: 24px; }
    .side-nav { position: fixed; top: 0; left: 0; width: 180px; height: 100vh; overflow-y: auto; background: var(--paper); border-right: 1px solid var(--line); padding: 16px 12px; z-index: 100; display: flex; flex-direction: column; gap: 2px; }
    .side-nav-title { font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 8px 8px 4px; margin-top: 8px; border-top: 1px solid var(--line); }
    .side-nav-title:first-child { margin-top: 0; border-top: none; }
    .side-nav-title.t-list { color: #2d6a4f; }
    .side-nav-title.t-states { color: #b8860b; }
    .side-nav-title.t-data { color: #6366f1; }
    .side-nav-title.t-detail { color: #0891b2; }
    .side-nav-title.t-modals { color: #9b2226; }
    .side-nav-title.t-mobile { color: #7c3aed; }
    .side-nav-title.t-ref { color: #2563eb; }
    .nav-link { display: block; padding: 5px 8px; border-radius: 6px; font-size: 12px; font-weight: 400; color: var(--text); text-decoration: none; transition: background 0.12s; line-height: 1.35; }
    .nav-link:hover { background: #eae7e1; }
    @media (min-width: 1600px) { .doc { margin-left: 200px; } }
    @media (max-width: 1599px) { .side-nav { display: none; } }
    @page { size: landscape; margin: 0.35in; }
    @media print {
      body { background: white; }
      .doc { padding: 0; max-width: none; margin-left: 0; }
      .side-nav { display: none; }
      section.page, .cover { page-break-after: always; border: none; box-shadow: none; }
      section.page:last-of-type { page-break-after: auto; }
    }
    @media (max-width: 900px) { .compare, .toc { columns: 1; grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <nav class="side-nav">
    <span class="side-nav-title t-list">List page</span>
    <a href="#s1" class="nav-link">1. Layout &amp; spacing</a>
    <a href="#s2" class="nav-link">2. NET WORTH label</a>
    <a href="#s3" class="nav-link">3. Net worth value</a>
    <a href="#s4" class="nav-link">4. Add Account button</a>
    <a href="#s4a" class="nav-link">4a. Hemlock button refs</a>
    <a href="#s5" class="nav-link">5. Section headers</a>
    <a href="#s6" class="nav-link">6. Account name</a>
    <a href="#s7" class="nav-link">7. Meta text</a>
    <a href="#s8" class="nav-link">8. Sync text</a>
    <a href="#s9" class="nav-link">9. Balance</a>
    <span class="side-nav-title t-states">Row states</span>
    <a href="#s10" class="nav-link">10. Default</a>
    <a href="#s11" class="nav-link">11. Hover</a>
    <a href="#s12" class="nav-link">12. Pressed</a>
    <span class="side-nav-title t-data">Data</span>
    <a href="#s13" class="nav-link">13. Institution logos</a>
    <span class="side-nav-title t-detail">Detail modal</span>
    <a href="#s14" class="nav-link">14. Full screen</a>
    <a href="#s15" class="nav-link">15. Header</a>
    <a href="#s16" class="nav-link">16. Balance &amp; actions</a>
    <a href="#s17" class="nav-link">17. Detail tables</a>
    <span class="side-nav-title t-modals">Other modals</span>
    <a href="#s18" class="nav-link">18. Add Account</a>
    <a href="#s19" class="nav-link">19. Remove Institution</a>
    <a href="#s20" class="nav-link">20. Plaid Linking Error</a>
    <span class="side-nav-title t-mobile">Mobile</span>
    <a href="#s21" class="nav-link">21. Home screen</a>
    <a href="#s22" class="nav-link">22. Press state</a>
    <a href="#s23" class="nav-link">23. Account details</a>
    <a href="#s24" class="nav-link">24. Add Account</a>
    <a href="#s25" class="nav-link">25. Remove Institution</a>
    <a href="#s26" class="nav-link">26. Plaid Linking Error</a>
    <span class="side-nav-title t-ref">Reference</span>
    <a href="#s27" class="nav-link">27. Files to change</a>
    <a href="#s28" class="nav-link">28. Master checklist</a>
  </nav>
  <div class="doc">
    <header class="cover">
      <h1>PFM Accounts v2 — Formatting differences (Design vs Dev)</h1>
      <p class="meta">Design source of truth: <strong>pfm-accounts-v2.pen</strong> · frames <strong>FglEA</strong> (default), <strong>eWQkU</strong> (hover), <strong>TShbt</strong> (pressed), <strong>xGRDX</strong> (account details) · Dev: app.eg-dev.ai · js-mono develop</p>
      <p><strong>Scope:</strong> Typography, color, spacing, borders, interaction states (hover / pressed), account-detail modal styling, and <strong>Hemlock component refs</strong> for all buttons. Section inventory and copy wording are out of scope unless they affect measured typography.</p>
      <p><strong>Token rule:</strong> Design and dev both use Hemlock tokens from <code>hemlock-library.lib.pen</code>. A row is <strong>Match</strong> when dev uses the same token as design. Status = <strong>Gap</strong> only when the token differs or resolves differently. Letter-spacing may be hardcoded in design.</p>
      <p><strong>Color split (updated design):</strong> The <strong>accounts list</strong> uses primitive <code>color-gray-500</code> (#716E6A) for NET WORTH, section headers, account subtype, and sync lines. The <strong>account-detail modal</strong> uses semantic <code>colors-text-meta</code> (#5E5954) for table labels — do not conflate the two.</p>
      <p><strong>Rule:</strong> Design wins. Buttons must be Hemlock library refs — not hand-built frames or wrong variants (filled primary, ghost, link).</p>
      <div class="stats">
        <div class="stat gaps"><strong>${gapCount}</strong> formatting gaps to fix</div>
        <div class="stat matches"><strong>${matchCount}</strong> already match</div>
        <div class="stat"><strong>${masterRows.length}</strong> total spec rows</div>
      </div>
      <div class="toc">
        <div>1–9. List page typography (layout → balance)</div>
        <div>4a. Hemlock button component refs (all CTAs)</div>
        <div>10. Row — default state (FglEA)</div>
        <div>11. Row — hover state (eWQkU)</div>
        <div>12. Row — pressed state (TShbt)</div>
        <div>13. Institution logos (Plaid data — not shape)</div>
        <div>14–17. Account details modal (xGRDX)</div>
        <div>18. Add Account modal (i0Ih1j)</div>
        <div>19. Remove Institution confirmation (G9xXUO)</div>
        <div>20. Plaid Linking Error (SXiFh)</div>
        <div>21. Mobile — Home screen (TuZJ5)</div>
        <div>22. Mobile — Press state (EehZZ)</div>
        <div>23. Mobile — Account details</div>
        <div>24. Mobile — Add Account</div>
        <div>25. Mobile — Remove Institution</div>
        <div>26. Mobile — Plaid Linking Error</div>
        <div>27. Files to change</div>
        <div>28. Master checklist</div>
      </div>
    </header>

    ${compareSection('1', 'Layout &amp; spacing', 'Content column padding and vertical rhythm', images.designContent, images.devFull, 'object-fit:cover;object-position:28% 18%;max-height:480px;', table(layoutRows))}

    ${compareSection('2', 'NET WORTH label', 'Eyebrow above total — node ozOU0 · list meta uses color-gray-500 (not colors-text-meta)', images.designNetWorthLabel, images.devNetWorthLabel, '', table(netWorthLabelRows))}

    ${compareSection('3', 'Net worth numerical value', 'Total amount — node NH57T', images.designNetWorthValue, images.devNetWorthValue, '', table(netWorthValueRows))}

    ${compareSection('4', 'Add Account button', 'Outline pill CTA — node b9y1P / G2cAS · Hemlock outline/icon-right', images.designButton, images.devAddAccountButton, '', table(buttonRows))}

    ${refSection(
      '4a',
      'Hemlock button component references',
      'Every button on this page must be a Hemlock library ref — override label, icon, or text color only; never substitute filled primary, secondary solid, ghost, or link buttons.',
      hemlockRefTable(hemlockButtonRefRows),
      `<div class="note"><strong>Token naming:</strong> In Hemlock, <em>outline</em> is the <strong>component variant</strong>; <em>secondary</em> is the <strong>token set</strong> (<code>colors-btnSecondaryText</code>, <code>colors-btnSecondaryBorder</code>) applied to outline buttons.<br/><br/>
      <strong>List page — G2cAS (Add Account):</strong> <code>component/Button/outline/icon-right</code> (0:URoI8) — padding <code>[spacing-2xs, spacing-xs]</code>; plus 16×16 icon-right.<br/>
      <strong>Account detail — qsmXG / p48Qbb:</strong> <code>component/Button/outline</code> (0:aFIzk) — Remove label → <code>colors-text-error</code> only.<br/>
      <strong>Add Account modal — kc5Be:</strong> <code>component/Button/text/icon-right</code> (0:sA6O0) — "Link New Institution" + chevron; <code>color-blue-600</code>.<br/>
      <strong>Remove confirm — F1Qob / x26EV:</strong> Cancel → outline (0:aFIzk); Remove Institution → primary (0:bMlax).<br/>
      <strong>Plaid error — Cancel / Try again:</strong> Same outline + primary refs — design frame not yet in <code>pfm-accounts-v2.pen</code>.</div>`,
    )}

    ${compareSection('5', 'Section headers', 'BANKING, CREDIT CARDS, etc. — 14px semibold meta caps', images.designBanking, images.devSectionHeader, '', table(sectionHeaderRows))}

    ${compareSection('6', 'Row line 1 — account name', 'Primary row label — node dQRJV', images.designRow, images.devRow, '', table(rowNameRows))}

    ${compareSection('7', 'Row line 2 — meta text', 'Secondary line typography — design node O8QSz (14px meta)', images.designRow, images.devRowMeta, '', table(rowMetaLineRows))}

    ${compareSection('8', 'Row line 3 — sync text', 'Tertiary line typography — design node Pz6Xz (12px meta)', images.designRow, images.devRowSync, '', table(rowSyncLineRows))}

    ${compareSection('9', 'Balance (right column)', 'Amount typography — node RlJfv', images.designRow, images.devRowBalance, '', table(rowBalanceRows))}

    ${compareSection('10', 'Account row — default state', 'Resting row before interaction — FglEA / dVY3g', images.designRow, images.devRow, '', table(rowDefaultStateRows))}

    ${compareSection('11', 'Account row — hover state', 'Pointer over row — frame eWQkU · highlighted row g2UJK (O:e19L89)', images.designHoverRow, images.devRowsBanking, '', table(rowHoverStateRows), '<p><strong>Dev today:</strong> <code>hover:bg-gray-50</code> on the row button — wrong color (#F9FAFB vs #F7F5F0), wrong radius (8px vs 12px), chevron always visible. Hover any row in dev and compare visually to the design crop (left).</p>')}

    ${compareSection('12', 'Account row — pressed state', 'Active / mouse-down — frame TShbt · row Pv3zG (O:W8aOnw)', images.designPressedRow, null, '', table(rowPressedStateRows), '<p><strong>Dev today:</strong> No distinct <code>:active</code> pressed styling — row stays on hover gray or default. Press and hold a row in dev; background should deepen to <strong>#EDEAE3</strong> with 12px padding and 12px radius per design (left).</p><p>Full-screen design reference: frame <strong>TShbt</strong> in <code>assets/design/TShbt.png</code>.</p>')}

    ${compareSection('13', 'Institution logos — Plaid data', 'Design expects Plaid institution logos on list rows, account-detail header, and Add Account modal tiles. Dev shows logos only when logoUrl is populated (Fidelity, Schwab); letter avatars appear when it is missing.', images.designRow, images.devRowsInvestments, '', table(logoRows), '<p><strong>Not a formatting gap:</strong> All three render paths (<code>account-row.tsx</code>, <code>account-detail-dialog.tsx</code>, <code>InstitutionLogoCard</code>) correctly render <code>&lt;img src={institution.logoUrl}&gt;</code> when the API returns a URL. Letter avatars (M, C) mean <code>logoUrl</code> is null — backend must populate Plaid logos for all institutions.</p>')}

    ${compareSection('14', 'Account details — full screen', 'Row click opens modal — frame xGRDX (design) vs dev viewport with dialog open', images.designDetailScreen, devDetailFull ?? devDetailPopup, modalImageStyle, table(detailShellRows), devDetailFull ? '' : devDetailFallbackNote, modalImageStyle)}

    ${compareSection('15', 'Account details — header', 'Title bar — popup hIBWD / HmYtb · modal labels use colors-text-meta (not list-page gray-500)', images.designDetailPopup, devDetailPopup, modalImageStyle, table(detailHeaderRows), modalPanelNote, modalImageStyle)}

    ${compareSection('16', 'Account details — balance &amp; actions', 'CURRENT BALANCE block + Manage / Remove — Qe4Vv · Hemlock outline refs qsmXG / p48Qbb', images.designDetailPopup, devDetailPopup, modalImageStyle, table(detailBalanceRows), `${modalPanelNote}<p>See also <strong>§4a</strong> for Hemlock component ref mapping.</p>`, modalImageStyle)}

    ${compareSection('17', 'Account details — detail tables', 'Identity / Balances / Recent Activity — DetailSection pattern in hIBWD', images.designDetailPopup, devDetailPopup, modalImageStyle, table(detailTableRows), `${modalPanelNote}<p><strong>Essential:</strong> The last row in each table section has <strong>no bottom divider</strong> in design — breathing room between Account Details, Balances, and Recent Activity. Dev draws <code>border-b</code> on the last identity row and uses red, oversized amounts in Recent Activity.</p>`, modalImageStyle)}

    ${compareSection('18', 'Add Account modal', 'Linked-institution picker — desktop i0Ih1j · mobile ugE8p', images.designAddAccountModal, images.devAddAccountModal, modalCompareStyle, table(addAccountModalRows), '<p class="note">Dev screenshot: Add Account modal open on accounts page. Design: cropped panel from frame <code>i0Ih1j</code>.</p>', modalCompareStyle)}

    ${compareSection('19', 'Remove Institution confirmation', 'Remove flow confirm dialog — desktop G9xXUO / panel fG4nj · mobile FOSbt', images.designRemoveInstitutionModal, images.devRemoveInstitutionModal, modalCompareStyle, table(removeInstitutionModalRows), '<p class="note">Design frame lists accounts to be removed. Dev today uses a shorter single-message confirm — see copy + body rows. Buttons: Hemlock outline Cancel + primary Remove Institution.</p>', modalCompareStyle)}

    ${compareSection('20', 'Plaid Linking Error', 'Plaid token / link failure — desktop SXiFh · mobile zNPDv; dev from plaid-error.tsx', images.designPlaidError, images.devPlaidErrorModal, modalCompareStyle, table(plaidErrorModalRows), '', modalCompareStyle)}

    ${compareSection('21', 'Mobile — Home screen', 'Accounts list page at 390px viewport — design TuZJ5 · dev mobile capture', images.designHomeMobile, images.devHomeMobile, modalCompareStyle, table(mobileHomeRows), '', modalCompareStyle)}

    ${compareSection('22', 'Mobile — Press state', 'Row active/pressed feedback at 390px — design EehZZ · dev simulated :active', images.designPressMobile, images.devPressMobile, modalCompareStyle, table(mobilePressMobileRows), '<p class="note">Mobile has no hover — the equivalent interaction feedback is the press/active state shown during touch-down. Design shows a warm beige background highlight (same token as desktop pressed in §12). Dev shows similar but verify exact token match.</p>', modalCompareStyle)}

    <section class="page" id="s23">
      <h2>23. Mobile — Account details</h2>
      <p class="subtitle">Account detail modal at mobile viewport (&lt;640px) — responsive layout, scroll, and touch-target gaps</p>
      <div class="compare">
        <div class="panel design-panel">
          <div class="panel-label design">Design — pfm-accounts-v2.pen (initial view + full scroll)</div>
          <div style="display:flex;gap:8px;padding:12px;background:#fff;align-items:flex-start;">
            <img src="${images.designDetailMobileViewport}" alt="Design: Mobile — initial viewport" style="${modalCompareStyle}flex:1;min-width:0;" />
            <img src="${images.designDetailMobile}" alt="Design: Mobile — full scroll" style="${modalCompareStyle}flex:1;min-width:0;" />
          </div>
        </div>
        <div class="panel dev-panel">
          <div class="panel-label dev">Dev — app.eg-dev.ai (scrolled)</div>
          <img src="${images.devDetailMobile}" alt="Dev: Mobile — Account details" style="${modalCompareStyle}" />
        </div>
      </div>
      ${table(mobileDetailRows)}
      <p class="note">Mobile viewport surfaces additional UX issues beyond desktop: floating dialog instead of full-screen takeover, title truncation, and padding that doesn't scale down. Typography tokens are unchanged from desktop (§15–17).</p>
    </section>

    ${compareSection('24', 'Mobile — Add Account', 'Add Account modal at 390px viewport — design ugE8p · dev mobile capture', images.designAddAccountMobile, images.devAddAccountMobile, modalCompareStyle, table(mobileAddAccountRows), '', modalCompareStyle)}

    ${compareSection('25', 'Mobile — Remove Institution', 'Remove Institution at 390px viewport — design FOSbt · dev mobile capture', images.designRemoveInstitutionMobile, images.devRemoveInstitutionMobile, modalCompareStyle, table(mobileRemoveInstitutionRows), '', modalCompareStyle)}

    ${compareSection('26', 'Mobile — Plaid Linking Error', 'Plaid Linking Error at 390px viewport — design zNPDv · dev mobile capture', images.designPlaidErrorMobile, images.devPlaidErrorMobile, modalCompareStyle, table(mobilePlaidErrorRows), '', modalCompareStyle)}

    <section class="page" id="s27">
      <h2>27. Files to change in js-mono</h2>
      <p class="subtitle">Map formatting fixes to implementation files on develop.</p>
      ${fileTable()}
      <div class="note">Shared tokens: use Hemlock typography classes and Tailwind aliases. <strong>List page meta</strong> → <code>text-gray-500</code> (<code>color-gray-500</code>). <strong>Modal detail labels</strong> → <code>text-text-meta</code> (<code>colors-text-meta</code>). Row names/balances → <code>text-gray-800</code>.</div>
    </section>

    <section class="page" id="s28">
      <h2>28. Master formatting checklist</h2>
      <p class="subtitle">Engineering sign-off — every row below must match design before merge. Out of scope: section inventory, account data, copy wording except where it affects typography slots.</p>
      ${table(masterRows)}
    </section>

    <p class="footer">Self-contained HTML — share this single file with engineering.<br/>Open in browser · Print → Landscape for PDF · Source: pfm-accounts-v2.pen · app.eg-dev.ai/net-worth/accounts</p>
  </div>
</body>
</html>`;

const out = path.join(dir, 'PFM-Accounts-v2-Design-vs-Dev.html');
fs.writeFileSync(out, html);
console.log('Wrote', out, `(${(fs.statSync(out).size / 1024 / 1024).toFixed(2)} MB)`);
