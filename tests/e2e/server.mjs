import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const publicDirectory = path.resolve("public");
const port = Number(process.env.PORT ?? 3000);
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
};

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host}`);

  if (request.method === "POST" && url.pathname === "/__e2e/shutdown") {
    response.writeHead(204).end();
    setImmediate(() => server.close());
    return;
  }

  if (url.pathname === "/api/status") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ ok: true }));
    return;
  }

  const requestedPath =
    url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname);
  let filePath = path.resolve(
    publicDirectory,
    requestedPath.replace(/^\/+/, ""),
  );

  if (!filePath.startsWith(`${publicDirectory}${path.sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  try {
    const file = await stat(filePath);
    if (!file.isFile()) throw new Error("Not a file");
  } catch {
    filePath = path.join(publicDirectory, "index.html");
  }

  response.writeHead(200, {
    "Content-Type":
      mimeTypes[path.extname(filePath)] ?? "application/octet-stream",
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Servidor E2E rodando em http://127.0.0.1:${port}`);
});
