import { launch } from "puppeteer-core";

const executablePath = import.meta.env["CHROMIUM_PATH"]!;

const args = [
  "--flag-switches-begin",
  "--flag-switches-end",
  "--origin-trial-disabled-features=WebGPU",
  "--enable-webgl",
  "--use-gl=swiftshader",
  "--enable-accelerated-2d-canvas",
  "--disable-blink-features=AutomationControlled",
  "--window-position=0,0",
  "--hide-crash-restore-bubble",
  "--enable-automation",
  "--no-sandbox",
  "--no-default-browser-check",
];

// TEST PUPPETEER
const browser = await launch({
  executablePath,
  args,
  headless: false,
});
const page = await browser.newPage();

await page.goto("https://bot-detector.rebrowser.net/");
await page.waitForNetworkIdle();

await page.evaluate(() => (window as any).dummyFn());
await page.exposeFunction("exposedFn", () => {
  console.log("exposedFn call");
});
await page.evaluate(() => document.getElementById("detections-json"));
await page
  .mainFrame()
  .isolatedRealm()
  .evaluate(() => document.getElementsByClassName("div"));

await Bun.sleep(1000);
await page.screenshot({
  path: "REBROWSER.jpeg",
  fullPage: true,
  type: "jpeg",
});

await page.close();
await browser.close();

// TEST PLAYWRIGHT
