import { parseProxyCredentials, sleep, suspendForever } from "./lib";
import {
  Builder,
  By,
  Capabilities,
  type ProxyConfig,
} from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";
import fs from "fs-extra";

const proxy = parseProxyCredentials(process.env["HTTP_PROXY"]!);

const options = new firefox.Options()
  .setBinary(process.env["FIREFOX_PATH"]!)
  .addArguments("--headless")
  .setPreference("devtools.debugger.remote-enabled", true)
  .setPreference("devtools.chrome.enabled", true)
  .setPreference("config.geoip", true)
  .setPreference("config.proxy.server", `http://${proxy.host}:${proxy.port}`)
  .setPreference("config.proxy.username", proxy.user)
  .setPreference("config.proxy.password", proxy.pass);
// .setPreference("network.proxy.type", 1)
// .setPreference("network.proxy.socks", proxy.host)
// .setPreference("network.proxy.socks_port", parseInt(proxy.port))
// .setPreference("network.proxy.socks_version", 5)
// .setPreference("network.proxy.socks_username", proxy.user)
// .setPreference("network.proxy.socks_password", proxy.pass);

const driver = await new Builder()
  .forBrowser("firefox")
  .setFirefoxOptions(options)
  .build();

// === === === === === === === === === === === === === === === === === ===

console.log("https://www.browserscan.net/bot-detection");
await driver.get("https://www.browserscan.net/bot-detection");
await sleep(5000);
let screenshot = await driver.takeScreenshot();
let buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-browserscan.png", buffer);

console.log("https://bot-detector.rebrowser.net/");
await driver.get("https://bot-detector.rebrowser.net/");
await sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-bot-detector.png", buffer);

console.log("https://bot.sannysoft.com/");
await driver.get("https://bot.sannysoft.com/");
await sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-sannysoft.png", buffer);

console.log("https://abrahamjuliot.github.io/creepjs/");
await driver.get("https://abrahamjuliot.github.io/creepjs/");
await sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-creepjs.png", buffer);

console.log("https://www.browserscan.net/webrtc");
await driver.get("https://www.browserscan.net/webrtc");
await sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-webrtc.png", buffer);

console.log("https://proxy.incolumitas.com/proxy_detect.html");
await driver.get("https://proxy.incolumitas.com/proxy_detect.html");
await sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await fs.writeFile("screenshots/camoufox-selenium-proxy.png", buffer);

console.log("http://httpbin.org/ip");
await driver.get("http://httpbin.org/ip");
const pageSource = await driver.findElement(By.css("body"));
console.log("Current IP:", await pageSource.getText());

await driver.close();
// await suspendForever();
