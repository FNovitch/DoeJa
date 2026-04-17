// Rotas relacionadas aos beneficiários
const express = require("express");
const router = express.Router();
const Beneficiarios = require("../models/beneficiarios");

// Rota para buscar todos os beneficiários
// GET /api/beneficiarios
router.get("/", (req, res) => {
  Beneficiarios.getAll((err, rows) => {
    if (err)
      return res.status(500).json({ error: "Erro ao buscar beneficiários." });
    res.json(rows); // Retorna todos os beneficiários encontrados
  });
});

// Rota para criar um novo beneficiário
// POST /api/beneficiarios
router.post("/", (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    req.body;
  // Valida se os campos obrigatórios foram preenchidos
  if (!nome || !cpf) {
    return res.status(400).json({ error: "Nome e CPF são obrigatórios." });
  }
  // Chama a função de criação no model
  Beneficiarios.create(
    { nome, cpf, telefone, endereco, familia_tamanho, necessidade },
    (err, beneficiario) => {
      if (err)
        return res.status(500).json({ error: "Erro ao criar beneficiário." });
      res.status(201).json(beneficiario); // Retorna o beneficiário criado
    },
  );
});

// Exporta o router para ser usado no app principal
module.exports = router;
