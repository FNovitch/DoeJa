export default async function globalTeardown(): Promise<void> {
  try {
    await fetch("http://127.0.0.1:3000/__e2e/shutdown", { method: "POST" });
  } catch {
    // O Playwright também encerra o processo se o servidor já tiver parado.
  }
}
