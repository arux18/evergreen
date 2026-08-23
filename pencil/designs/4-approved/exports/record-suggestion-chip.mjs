// Screen-records the suggestion-chip prototype animations with Playwright.
// Walks through: auto-cycling chips, hover pause/resume, chip click -> input
// fill + send enable, and icon hover states. A fake cursor is injected so
// pointer movement is visible in the video.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire("/Users/amanda/node_modules/");
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const prototypePath = path.resolve(here, "..", "suggestion-chip-prototype.html");
const outDir = path.join(here, "video-tmp");

const VIEWPORT = { width: 720, height: 880 };

const CURSOR_SCRIPT = `
  window.addEventListener("DOMContentLoaded", () => {
    const c = document.createElement("div");
    c.id = "__fake_cursor";
    c.style.cssText = [
      "position:fixed", "top:0", "left:0", "width:22px", "height:22px",
      "border-radius:50%", "background:rgba(45,41,38,0.35)",
      "border:2px solid rgba(45,41,38,0.75)", "z-index:999999",
      "pointer-events:none", "transform:translate(-50%,-50%)",
      "transition:width 120ms, height 120ms, background 120ms",
    ].join(";");
    document.body.appendChild(c);
    document.addEventListener("mousemove", (e) => {
      c.style.left = e.clientX + "px";
      c.style.top = e.clientY + "px";
    }, true);
    document.addEventListener("mousedown", () => {
      c.style.width = "16px"; c.style.height = "16px";
      c.style.background = "rgba(45,41,38,0.7)";
    }, true);
    document.addEventListener("mouseup", () => {
      c.style.width = "22px"; c.style.height = "22px";
      c.style.background = "rgba(45,41,38,0.35)";
    }, true);
  });
`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function glide(page, from, to, steps = 24) {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const e = t * t * (3 - 2 * t); // smoothstep easing
    await page.mouse.move(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e);
    await sleep(14);
  }
}

const center = (box) => ({ x: box.x + box.width / 2, y: box.y + box.height / 2 });

async function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: { dir: outDir, size: VIEWPORT },
  });
  await context.addInitScript(CURSOR_SCRIPT);

  const page = await context.newPage();
  await page.goto("file://" + prototypePath);
  await page.evaluate(() => document.fonts.ready);

  let pos = { x: VIEWPORT.width / 2, y: VIEWPORT.height - 60 };
  await page.mouse.move(pos.x, pos.y);

  // 1. Let the chip auto-cycle through three suggestions (3s per cycle).
  await sleep(9800);

  // 2. Hover the chip: hover state + cycling pauses.
  const chip = center(await page.locator("#suggestionChip").boundingBox());
  await glide(page, pos, chip);
  pos = chip;
  await sleep(2600);

  // 3. Move away: cycling resumes; watch one full rotation.
  const parked = { x: VIEWPORT.width / 2 + 240, y: chip.y + 140 };
  await glide(page, pos, parked);
  pos = parked;
  await sleep(4200);

  // 4. Click the chip: pressed state, question fills input, send enables.
  const chip2 = center(await page.locator("#suggestionChip").boundingBox());
  await glide(page, pos, chip2);
  pos = chip2;
  await sleep(700);
  await page.mouse.down();
  await sleep(220);
  await page.mouse.up();
  await sleep(2200);

  // 5. Hover the voice (mic) button, then the now-enabled send button.
  const mic = center(await page.locator('.icon-btn[aria-label="Voice"]').boundingBox());
  await glide(page, pos, mic);
  pos = mic;
  await sleep(1500);

  const send = center(await page.locator("#sendBtn").boundingBox());
  await glide(page, pos, send);
  pos = send;
  await sleep(1800);

  await context.close();
  const video = await page.video().path();
  await browser.close();
  console.log("VIDEO:" + video);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
