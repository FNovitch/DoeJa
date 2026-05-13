import { Router, type Request, type Response } from "express";
import * as doadores from "../models/doadores";
import type { CriarDoadorDTO, NomeQuery } from "../types/entities";

const router = Router();

router.get(
  "/",
  async (
    req: Request<Record<string, never>, unknown, unknown, NomeQuery>,
    res: Response,
  ): Promise<void> => {
    try {
      const nome = req.query.nome ?? "";
      const lista = await doadores.getAll(nome);
      res.json(lista);
    } catch (error) {
      console.error("Erro ao buscar doadores:", error);
      res.status(500).json({ error: "Erro ao buscar doadores." });
    }
  },
);

router.post(
  "/",
  async (
    req: Request<Record<string, never>, unknown, CriarDoadorDTO>,
    res: Response,
  ): Promise<void> => {
    const { nome, email, telefone, cidade, observacoes } = req.body;

    if (!nome || !email) {
      res.status(400).json({ error: "Nome e email sao obrigatorios." });
      return;
    }

    try {
      const novoDoador = await doadores.create({
        nome,
        email,
        telefone,
        cidade,
        observacoes,
      });

      res.status(201).json(novoDoador);
    } catch (error) {
      console.error("Erro ao criar doador:", error);
      res.status(500).json({ error: "Erro ao criar doador." });
    }
  },
);

export default router;
