import { chromium } from "playwright-core";
import { parseProxyCredentials } from "./lib";

const executablePath = import.meta.env["CHROMIUM_PATH"]!;
const proxy = import.meta.env["HTTP_PROXY"];

const proxyCreds = proxy === undefined ? null : parseProxyCredentials(proxy);
const browser = await chromium.launchPersistentContext("/tmp/playwright", {
  executablePath,
  args,
  headless: false,
  timezoneId: "Europe/Berlin",
  viewport: {
    width: 1322,
    height: 804,
  },
  proxy:
    proxyCreds === null
      ? undefined
      : {
          server: `${proxyCreds.host}:${proxyCreds.port}`,
          username: proxyCreds.user,
          password: proxyCreds.pass,
        },
});

await browser.addInitScript(() => {
  delete (window as any).__pwInitScripts;

  const originalRTCPeerConnection = window.RTCPeerConnection;
  window.RTCPeerConnection = function (...args) {
    if (args[0]?.iceServers) {
      args[0].iceServers = [];
    }
    const pc = new originalRTCPeerConnection(...args);

    // Modify ICE candidate behavior
    const originalAddIceCandidate = pc.addIceCandidate.bind(pc);
    pc.addIceCandidate = function (candidate) {
      if (candidate && candidate.candidate) {
        // Filter out local network candidates
        if (candidate.candidate.indexOf("host") !== -1) {
          return Promise.resolve();
        }
      }
      return originalAddIceCandidate(candidate);
    };
    return pc;
  };
});

const page = await browser.newPage();

await page.goto("https://bot-detector.rebrowser.net/");
await page.waitForLoadState();

await page.evaluate(() => (window as any).dummyFn());
await page.evaluate(() => document.getElementById("detections-json"));
await page.evaluate(() => document.getElementsByClassName("div"));

await Bun.sleep(1000);
await page.screenshot({
  path: "screenshots/playwright-rebrowser.jpeg",
  fullPage: true,
  type: "jpeg",
});

// await page.goto("https://abrahamjuliot.github.io/creepjs/");
// await page.waitForLoadState();
// await Bun.sleep(10000);
// await page.screenshot({
//   path: "screenshots/playwright-creepjs.jpeg",
//   fullPage: true,
//   type: "jpeg",
// });

// await page.goto("https://tcpip.incolumitas.com/classify?by_ip=1&detail=1");
// await page.waitForLoadState();
// await Bun.sleep(1000);
// await page.screenshot({
//   path: "screenshots/playwright-tcpip.jpeg",
//   fullPage: true,
//   type: "jpeg",
// });

// await page.goto("https://antcpt.com/score_detector/");
// await page.waitForLoadState();
// await Bun.sleep(10000);
// await page.screenshot({
//   path: "screenshots/playwright-recaptcha-score.jpeg",
//   fullPage: true,
//   type: "jpeg",
// });

if (proxy !== "undefined") {
  await page.goto("https://proxy.incolumitas.com/proxy_detect.html");
  await page.waitForLoadState();
  await Bun.sleep(10000);
  await page.screenshot({
    path: "screenshots/playwright-proxy.jpeg",
    fullPage: true,
    type: "jpeg",
  });
}

// source: https://cpa.rip/stati/antidetect-palivo/
// if( Object.getOwnPropertyNames(navigator)[0] ) alert('fake parameters detected');
// navigator.plugins === PluginArray {0: Plugin, 1: Plugin, 2: Plugin, 3: Plugin}
// navigator.plugins.length === 4

while (true) {
  await Bun.sleep(1000);
}
// await page.close();
// await browser.close();
