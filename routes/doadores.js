const express = require("express");
const router = express.Router();
const Doadores = require("../models/doadores");

// Rota para buscar todos os doadores, com filtro opcional por nome
router.get("/", (req, res) => {
  const { nome } = req.query;
  Doadores.getAll(nome, (err, rows) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar doadores." });
    res.json(rows); // Retorna todos os doadores encontrados
  });
});

// Rota para criar um novo doador

router.post("/", (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, email, telefone, cidade, observacoes } = req.body;
  // Valida se os campos obrigatórios foram preenchidos
  if (!nome || !email) {
    return res.status(400).json({ error: "Nome e email são obrigatórios." });
  }
  // Chama a função de criação no model
  Doadores.create(
    { nome, email, telefone, cidade, observacoes },
    (err, doador) => {
      if (err) return res.status(500).json({ error: "Erro ao criar doador." });
      res.status(201).json(doador); // Retorna o doador criado
    },
  );
});

// Exporta o router para ser usado no app principal
module.exports = router;
