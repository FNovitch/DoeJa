import cors from "cors";
import express, { type Request, type Response } from "express";
import path from "path";
import beneficiariosRoutes from "./routes/beneficiarios";
import doadoresRoutes from "./routes/doadores";
import { initializeDatabase } from "./migrations/init";

const app = express();
const PORT = process.env.PORT ?? 3000;
const publicPath = path.join(process.cwd(), "public");

app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

app.use("/api/doadores", doadoresRoutes);
app.use("/api/beneficiarios", beneficiariosRoutes);

app.get("/api/status", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use((_req: Request, res: Response) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

async function startServer(): Promise<void> {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    const mensagem = error instanceof Error ? error.message : String(error);
    console.error("Erro ao inicializar o banco de dados:", mensagem);
    process.exit(1);
  }
}

void startServer();

export default app;
