import { firefox } from "playwright";
import { sleep } from "./lib";

const executablePath = process.env["FIREFOX_PATH"]!;

const browser = await firefox.launchPersistentContext("/tmp/camoufox", {
  headless: true,
});

console.log("creating new page...");
const page = await browser.newPage();
console.log("got page!");

console.log("going to google...");
await page.goto("https://google.com");
console.log("went to google!");
await sleep(3000);

await page.close();
await browser.close();
