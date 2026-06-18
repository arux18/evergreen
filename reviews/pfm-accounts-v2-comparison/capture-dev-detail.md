# Dev account-detail screenshots (for sections 14–17)

The comparison HTML needs **two PNGs** from app.eg-dev.ai with the account detail dialog open.

## 1. Full screen (section 14)

**File:** `assets/dev/account-detail-full.png`

- Open https://app.eg-dev.ai/net-worth/accounts
- Click any account row so **AccountDetailDialog** is open
- Viewport ~1440×900 (resize browser or use full window)
- Capture the **entire browser viewport** — dimmed page + modal + scrim (like design frame `xGRDX`)

## 2. Modal crop (sections 15–17)

**File:** `assets/dev/account-detail-popup.png`

Either:

- **Tight crop:** screenshot just the white modal card (title through detail tables), or
- **Same as full:** reuse the full viewport shot — the HTML crops with `object-position` like the design side

## How to save (fastest)

1. With the dialog open, take a screenshot (macOS: **Cmd+Shift+4**, drag to select)
2. Save/rename into this folder:

```
reviews/pfm-accounts-v2-comparison/assets/dev/account-detail-full.png
reviews/pfm-accounts-v2-comparison/assets/dev/account-detail-popup.png
```

3. Tell Cursor to regenerate: `node reviews/pfm-accounts-v2-comparison/build-standalone.mjs`

**Or** drag both PNGs into the chat — the agent can save them and rebuild.

## Optional: Playwright (repeatable)

If you export a logged-in session once:

```bash
# In Chrome: log into app.eg-dev.ai, then export cookies (e.g. EditThisCookie → JSON)
# Save as reviews/pfm-accounts-v2-comparison/.auth-state.json

node reviews/pfm-accounts-v2-comparison/capture-dev-detail.mjs
```

Requires: `npx playwright install chromium`
