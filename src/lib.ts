export async function suspendForever() {
  while (true) {
    await Bun.sleep(1000);
  }
}
export function parseProxyCredentials(value: string) {
  const [host, port, user, pass] = value.split(":");
  return { host: host!, port: port!, user: user!, pass: pass! };
}
