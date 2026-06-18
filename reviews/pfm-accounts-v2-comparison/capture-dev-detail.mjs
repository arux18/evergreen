#!/usr/bin/env node
/**
 * Capture account-detail dialog screenshots from app.eg-dev.ai.
 *
 * Prerequisite: logged-in session. Either:
 *   - Place Playwright storage state at .auth-state.json (run once while logged in), or
 *   - Set AUTH_STATE_PATH to your storage state file.
 *
 * Usage:
 *   node capture-dev-detail.mjs
 */
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const dir = import.meta.dirname;
const outDir = path.join(dir, 'assets/dev');
const authPath = process.env.AUTH_STATE_PATH || path.join(dir, '.auth-state.json');
const url = 'https://app.eg-dev.ai/net-worth/accounts';

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const contextOpts = { viewport: { width: 1440, height: 900 } };
  if (fs.existsSync(authPath)) {
    contextOpts.storageState = authPath;
    console.log('Using auth:', authPath);
  } else {
    console.warn('No .auth-state.json — page may redirect to login.');
    console.warn('Save screenshots manually; see capture-dev-detail.md');
  }

  const context = await browser.newContext(contextOpts);
  const page = await context.newPage();

  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);

  if (!page.url().includes('/net-worth/accounts')) {
    console.error('Not on accounts page:', page.url());
    await page.screenshot({ path: path.join(outDir, 'account-detail-debug-login.png'), fullPage: true });
    await browser.close();
    process.exit(1);
  }

  const row = page.locator('[data-testid="account-row"], button:has-text("Checking"), a[href*="account"]').first();
  const rowFallback = page.getByRole('button').filter({ hasText: /\(\s*x\s*\d/i }).first();

  const target = (await row.count()) ? row : rowFallback;
  await target.click({ timeout: 15000 });
  await page.waitForTimeout(800);

  const dialog = page.getByRole('dialog').first();
  await dialog.waitFor({ state: 'visible', timeout: 10000 });

  await page.screenshot({
    path: path.join(outDir, 'account-detail-full.png'),
    fullPage: false,
  });

  const box = await dialog.boundingBox();
  if (box) {
    await page.screenshot({
      path: path.join(outDir, 'account-detail-popup.png'),
      clip: {
        x: Math.max(0, box.x - 8),
        y: Math.max(0, box.y - 8),
        width: Math.min(1440, box.width + 16),
        height: Math.min(900, box.height + 16),
      },
    });
  } else {
    fs.copyFileSync(
      path.join(outDir, 'account-detail-full.png'),
      path.join(outDir, 'account-detail-popup.png'),
    );
  }

  console.log('Wrote account-detail-full.png and account-detail-popup.png');
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
