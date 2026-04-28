import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "site");
const host = "127.0.0.1";
const preferredPort = Number(process.env.PORT || 5173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function resolvePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0] || "/");
  const pathname = decoded === "/" ? "/index.html" : decoded;
  return path.resolve(root, `.${pathname}`);
}

const server = http.createServer(async (req, res) => {
  const target = resolvePath(req.url || "/");

  if (!target.startsWith(root)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    await access(target);
    const info = await stat(target);
    const filePath = info.isDirectory() ? path.join(target, "index.html") : target;
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    const stream = createReadStream(filePath);
    stream.on("error", () => {
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      }
      res.end("File stream error");
    });
    stream.pipe(res);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
});

function listenWithFallback(port) {
  const onError = (error) => {
    if (error.code === "EADDRINUSE") {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy, trying ${nextPort}...`);
      server.removeListener("listening", onListening);
      listenWithFallback(nextPort);
      return;
    }

    throw error;
  };

  const onListening = () => {
    const address = server.address();
    if (address && typeof address === "object") {
      console.log(`GPT Image Wiki running at http://${address.address}:${address.port}`);
    }
  };

  server.once("error", onError);
  server.once("listening", onListening);
  server.listen(port, host);
}

listenWithFallback(preferredPort);
