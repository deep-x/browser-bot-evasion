import { z } from "zod";

const timezoneSchema = z.object({
  timezone: z.string(),
});

export async function suspendForever() {
  while (true) {
    await sleep(1000);
  }
}
export function parseProxyCredentials(value: string) {
  const [host, port, user, pass] = value.split(":");
  return { host: host!, port: port!, user: user!, pass: pass! };
}

export async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}

export function getBrowserscanCookieDialogButtonSelector() {
  "button.fc-button.fc-cta-do-not-consent";
}

export async function getTimezoneId(ip: string): Promise<string | null> {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json`);
    const json = await res.json();
    const data = timezoneSchema.parse(json);
    return data.timezone;
  } catch (e) {}

  try {
    const res = await fetch(`https://ipinfo.io/${ip}/json`);
    const json = await res.json();
    const data = timezoneSchema.parse(json);
    return data.timezone;
  } catch (e) {}

  return null;
}

export const chromiumDefaultArgs = [
  "--flag-switches-begin",
  "--flag-switches-end",
  "--origin-trial-disabled-features=WebGPU",
  "--disable-blink-features=AutomationControlled",
  "--window-position=0,0",
  "--hide-crash-restore-bubble",
  "--enable-automation",
  "--no-sandbox",
  "--no-default-browser-check",

  // Graphics/GPU related
  "--enable-webgl",
  "--use-gl=swiftshader",
  "--enable-accelerated-2d-canvas",
  "--force-gpu-rasterization",
  "--high-dpi-support=1",

  // Features and APIs
  "--force-dark-mode",
  "--enable-features=WebContentsForceDark,ContentIndex,ContactsManager,WindowControlsOverlay,NetworkServiceInProcess,DarkMode",
  "--enable-system-notifications",
  "--disable-zero-copy",
  "--force-color-profile=srgb",

  // WebRTC protection
  "--disable-webrtc",
  "--enforce-webrtc-ip-permission-check",
  "--disable-webrtc-hw-encoding",
  "--disable-webrtc-hw-decoding",
  "--force-webrtc-ip-handling-policy=default_public_interface_only",
];
