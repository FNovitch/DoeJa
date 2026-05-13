import { Router, type Request, type Response } from "express";
import * as beneficiarios from "../models/beneficiarios";
import type { CriarBeneficiarioDTO, NomeQuery } from "../types/entities";

const router = Router();

router.get(
  "/",
  async (
    req: Request<Record<string, never>, unknown, unknown, NomeQuery>,
    res: Response,
  ): Promise<void> => {
    try {
      const nome = req.query.nome ?? "";
      const lista = await beneficiarios.getAll(nome);
      res.json(lista);
    } catch (error) {
      console.error("Erro ao buscar beneficiarios:", error);
      res.status(500).json({ error: "Erro ao buscar beneficiarios." });
    }
  },
);

router.post(
  "/",
  async (
    req: Request<Record<string, never>, unknown, CriarBeneficiarioDTO>,
    res: Response,
  ): Promise<void> => {
    const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
      req.body;

    if (!nome || !cpf) {
      res.status(400).json({ error: "Nome e CPF sao obrigatorios." });
      return;
    }

    try {
      const novoBeneficiario = await beneficiarios.create({
        nome,
        cpf,
        telefone,
        endereco,
        familia_tamanho,
        necessidade,
      });

      res.status(201).json(novoBeneficiario);
    } catch (error) {
      console.error("Erro ao criar beneficiario:", error);
      res.status(500).json({ error: "Erro ao criar beneficiario." });
    }
  },
);

export default router;
