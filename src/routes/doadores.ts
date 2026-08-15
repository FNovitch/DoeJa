import { Router, type Request, type Response } from "express";
import * as doadores from "../models/doadores";
import type { CriarDoadorDTO } from "../types/entities";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.status(405).json({ error: "Consulta pública não disponível." });
});

router.post(
  "/",
  async (
    req: Request<Record<string, never>, unknown, CriarDoadorDTO>,
    res: Response,
  ): Promise<void> => {
    const { nome, email, telefone, cidade, observacoes, consentimento } =
      req.body;

    if (!nome || !email) {
      res.status(400).json({ error: "Nome e email sao obrigatorios." });
      return;
    }

    if (consentimento !== true) {
      res.status(400).json({ error: "O consentimento é obrigatório." });
      return;
    }

    try {
      const novoDoador = await doadores.create({
        nome,
        email,
        telefone,
        cidade,
        observacoes,
        consentimento,
      });

      res.status(201).json(novoDoador);
    } catch (error) {
      console.error("Erro ao criar doador:", error);
      res.status(500).json({ error: "Erro ao criar doador." });
    }
  },
);

export default router;
