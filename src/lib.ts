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
