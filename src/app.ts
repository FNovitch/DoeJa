import cors from "cors";
import express, { type Request, type Response } from "express";
import path from "path";
import beneficiariosRoutes from "./routes/beneficiarios";
import doadoresRoutes from "./routes/doadores";

const app = express();
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

export default app;
