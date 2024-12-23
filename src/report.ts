import {
  chromium as chromiumVanilla,
  firefox,
  type Browser,
} from "playwright-core";
import { chromium as rebrowser } from "playwright-core-patched";
import { addExtra } from "playwright-extra";
import stealth from "puppeteer-extra-plugin-stealth";

const chromiumStealth = addExtra(chromiumVanilla);
chromiumStealth.use(stealth());

async function runVanillaFirefox() {
  const executablePath = ""; // todo
  const browser = await firefox.launch({
    headless: true,
  });
  await runReport(browser);
}

async function runVanillaChromium() {
  const browser = await chromiumVanilla.launch({
    headless: true,
  });
  await runReport(browser);
}

// puppeteer-extra-plugin-stealth
async function runChromiumPluginStealth() {
  const browser = await chromiumStealth.launch({
    headless: true,
  });
  await runReport(browser);
}

async function runVanillaBrave() {
  const executablePath = ""; // todo
  const browser = await chromiumVanilla.launch({
    headless: true,
    executablePath,
  });
  await runReport(browser);
}

async function runCamoufox() {
  const executablePath = ""; // todo
  const browser = await firefox.launch({
    headless: true,
    executablePath,
  });
  await runReport(browser);
}

async function runRebrowser() {
  const executablePath = ""; // todo
  const browser = await chromiumVanilla.launch({
    headless: true,
    executablePath,
  });
  await runReport(browser);
}

async function runCombination() {
  // adds custom stealth methods

  const executablePath = ""; // todo
  const browser = await chromiumVanilla.launch({
    headless: true,
    executablePath,
  });
  await runReport(browser);
}

async function runReport(browser: Browser) {
  // todo
}
