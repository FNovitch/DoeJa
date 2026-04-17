// Rotas da API para gerenciar beneficiários
const express = require("express");
const beneficiarios = require("../models/beneficiarios");

const router = express.Router();

// GET: retorna lista de todos os beneficiários
router.get("/", async (req, res) => {
  try {
    const lista = await beneficiarios.getAll();
    res.json(lista);
  } catch {
    res.status(500).json({ error: "Erro ao buscar beneficiarios." });
  }
});

router.post("/", async (req, res) => {
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    req.body;

  if (!nome || !cpf) {
    return res.status(400).json({ error: "Nome e CPF sao obrigatorios." });
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
  } catch {
    res.status(500).json({ error: "Erro ao criar beneficiario." });
  }
});

module.exports = router;
