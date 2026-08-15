import type { Server } from "http";
import app from "./app";
import db from "./db/database";
import { initializeDatabase } from "./migrations/init";

const PORT = process.env.PORT ?? 3000;
let server: Server | undefined;
let isShuttingDown = false;

async function startServer(): Promise<void> {
  try {
    await initializeDatabase();
    server = app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : String(error);
    console.error("Erro ao inicializar o banco de dados:", mensagem);
    process.exit(1);
  }
}

async function shutdown(signal: NodeJS.Signals): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  try {
    if (server) {
      await new Promise<void>((resolve, reject) => {
        server?.close((error) => (error ? reject(error) : resolve()));
      });
    }
    await db.close();
    console.log(`Servidor encerrado por ${signal}.`);
    process.exit(0);
  } catch (error) {
    console.error("Erro ao encerrar o servidor:", error);
    process.exit(1);
  }
}

process.once("SIGINT", () => void shutdown("SIGINT"));
process.once("SIGTERM", () => void shutdown("SIGTERM"));

void startServer();

export default app;
