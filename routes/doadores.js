// Rotas da API para gerenciar doadores
const express = require("express");
const doadores = require("../models/doadores");

const router = express.Router();

// GET: retorna lista de doadores (com filtro opcional por nome)
router.get("/", async (req, res) => {
  try {
    const lista = await doadores.getAll(req.query.nome || "");
    res.json(lista);
  } catch {
    res.status(500).json({ error: "Erro ao buscar doadores." });
  }
});

// POST: cadastra um novo doador
router.post("/", async (req, res) => {
  const { nome, email, telefone, cidade, observacoes } = req.body;

  // Valida campos obrigatórios
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email sao obrigatorios." });
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
  } catch {
    res.status(500).json({ error: "Erro ao criar doador." });
  }
});

module.exports = router;
