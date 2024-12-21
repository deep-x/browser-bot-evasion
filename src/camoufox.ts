import { parseProxyCredentials, suspendForever } from "./lib";
import { Builder, By, Capabilities } from "selenium-webdriver";
import firefox from "selenium-webdriver/firefox";

// const proxy = parseProxyCredentials(process.env["SOCKS_PROXY"]!);
// const caps = new Capabilities().setProxy({
//   proxyType: "manual",
//   socksProxy: `${proxy.host}:${proxy.port}`,
//   socksUsername: proxy.user,
//   socksPassword: proxy.pass,
// });

const options = new firefox.Options()
  .setBinary("/Applications/Camoufox.app/Contents/MacOS/camoufox")
  .addArguments("--marionette")
  .addArguments("--remote-debugging-port=9222")
  .setPreference("marionette.port", 2828)
  .setPreference("marionette.enabled", true);
// .setBinary("/Applications/Firefox.app/Contents/MacOS/firefox");
// .addArguments("--headless")
// .setPreference("devtools.debugger.remote-enabled", true)
// .setPreference("devtools.chrome.enabled", true);
// .merge(caps);

const geckoPath = "/opt/homebrew/bin/geckodriver"; // Update this with actual path
const service = new firefox.ServiceBuilder(geckoPath)
  .setStdio("inherit") // Show us the logs
  .setPort(4444)
  .enableVerboseLogging(); // More detailed logs

const driver = await new Builder()
  .forBrowser("firefox")
  .setFirefoxOptions(options)
  .setFirefoxService(service)
  .build();

// === === === === === === === === === === === === === === === === === ===

console.log("https://www.browserscan.net/bot-detection");
await driver.get("https://www.browserscan.net/bot-detection");
await Bun.sleep(5000);
let screenshot = await driver.takeScreenshot();
let buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-browserscan.png", buffer);

console.log("https://bot-detector.rebrowser.net/");
await driver.get("https://bot-detector.rebrowser.net/");
await Bun.sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-bot-detector.png", buffer);

console.log("https://bot.sannysoft.com/");
await driver.get("https://bot.sannysoft.com/");
await Bun.sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-sannysoft.png", buffer);

console.log("https://abrahamjuliot.github.io/creepjs/");
await driver.get("https://abrahamjuliot.github.io/creepjs/");
await Bun.sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-creepjs.png", buffer);

console.log("https://www.browserscan.net/webrtc");
await driver.get("https://www.browserscan.net/webrtc");
await Bun.sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-webrtc.png", buffer);

console.log("https://proxy.incolumitas.com/proxy_detect.html");
await driver.get("https://proxy.incolumitas.com/proxy_detect.html");
await Bun.sleep(5000);
screenshot = await driver.takeScreenshot();
buffer = new Uint8Array(Buffer.from(screenshot, "base64"));
await Bun.write("screenshots/camoufox-selenium-proxy.png", buffer);

console.log("http://httpbin.org/ip");
await driver.get("http://httpbin.org/ip");
const pageSource = await driver.findElement(By.css("body"));
console.log("Current IP:", await pageSource.getText());

// await suspendForever();
await driver.close();
