import { Router, type Request, type Response } from "express";
import * as beneficiarios from "../models/beneficiarios";
import type { CriarBeneficiarioDTO } from "../types/entities";

const router = Router();

router.get("/", (_req: Request, res: Response): void => {
  res.status(405).json({ error: "Consulta pública não disponível." });
});

router.post(
  "/",
  async (
    req: Request<Record<string, never>, unknown, CriarBeneficiarioDTO>,
    res: Response,
  ): Promise<void> => {
    const {
      nome,
      cpf,
      telefone,
      endereco,
      familia_tamanho,
      necessidade,
      consentimento,
    } = req.body;

    if (!nome || !cpf) {
      res.status(400).json({ error: "Nome e CPF sao obrigatorios." });
      return;
    }

    if (consentimento !== true) {
      res.status(400).json({ error: "O consentimento é obrigatório." });
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
        consentimento,
      });

      res.status(201).json(novoBeneficiario);
    } catch (error) {
      console.error("Erro ao criar beneficiario:", error);
      res.status(500).json({ error: "Erro ao criar beneficiario." });
    }
  },
);

export default router;
