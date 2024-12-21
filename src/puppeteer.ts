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

const browser = await launch({
  executablePath,
  args,
  headless: false,
  defaultViewport: {
    width: 1322,
    height: 804,
  },
});
const page = await browser.newPage();

await page.goto("https://bot-detector.rebrowser.net/");
await page.waitForNetworkIdle();

await page.evaluate(() => (window as any).dummyFn());
await page.evaluate(() => document.getElementById("detections-json"));
await page
  .mainFrame()
  //@ts-ignore
  .isolatedRealm()
  .evaluate(() => document.getElementsByClassName("div"));

await Bun.sleep(1000);
await page.screenshot({
  path: "screenshots/puppeteer-rebrowser.jpeg",
  fullPage: true,
  type: "jpeg",
});

await page.goto("https://abrahamjuliot.github.io/creepjs/");
await page.waitForNetworkIdle();

await Bun.sleep(1000);
await page.screenshot({
  path: "screenshots/puppeteer-creepjs.jpeg",
  fullPage: true,
  type: "jpeg",
});

await page.close();
await browser.close();
