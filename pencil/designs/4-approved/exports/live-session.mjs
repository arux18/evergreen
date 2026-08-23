// Opens a visible, video-recorded browser for the live app demo.
// The user logs in manually; the agent then drives the session by
// connecting over CDP (port 9333). The session ends when a stop file
// appears, which flushes the videos to disk.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire("/Users/amanda/node_modules/");
const { chromium } = require("playwright");

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "live-video-tmp");
const profileDir = path.join(outDir, "profile");
const stopFile = path.join(outDir, "STOP");

const VIEWPORT = { width: 1280, height: 800 };

const CURSOR_SCRIPT = `
  (() => {
    const attach = () => {
      if (document.getElementById("__fake_cursor") || !document.body) return;
      const c = document.createElement("div");
      c.id = "__fake_cursor";
      c.style.cssText = [
        "position:fixed", "top:-40px", "left:-40px", "width:22px", "height:22px",
        "border-radius:50%", "background:rgba(45,41,38,0.35)",
        "border:2px solid rgba(45,41,38,0.75)", "z-index:2147483647",
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
    };
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", attach);
    } else {
      attach();
    }
  })();
`;

async function main() {
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    recordVideo: { dir: outDir, size: VIEWPORT },
    args: ["--remote-debugging-port=9333"],
  });
  await context.addInitScript(CURSOR_SCRIPT);

  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto("https://app.evergreen.ai/welcome");
  console.log("READY: log in via the opened browser window");

  // Track page -> video path mapping as pages are created.
  const logVideo = async (p) => {
    try {
      const v = await p.video()?.path();
      if (v) console.log("PAGE_VIDEO:" + p.url() + " -> " + v);
    } catch {}
  };
  context.on("page", (p) => p.once("close", () => logVideo(p)));

  // Wait for the stop file, then close to flush videos.
  while (!fs.existsSync(stopFile)) {
    await new Promise((r) => setTimeout(r, 1000));
  }
  for (const p of context.pages()) {
    try {
      const v = await p.video()?.path();
      if (v) console.log("PAGE_VIDEO:" + p.url() + " -> " + v);
    } catch {}
  }
  await context.close();
  console.log("DONE: videos flushed to " + outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
