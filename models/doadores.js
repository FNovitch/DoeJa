const db = require("../db/database");

// Retorna lista de doadores, com filtro opcional por nome
async function getAll(nome = "") {
  const filtros = [];
  let query = "SELECT * FROM doadores";
  if (nome) {
    query += " WHERE nome LIKE ?";
    filtros.push(`%${nome}%`);
  }
  return db.all(query, filtros);
}

// Cria um novo doador no banco de dados
async function create(doador) {
  const { nome, email, telefone, cidade, observacoes } = doador;
  const result = await db.run(
    `
      INSERT INTO doadores (nome, email, telefone, cidade, observacoes)
      VALUES (?, ?, ?, ?, ?)
    `,
    [nome, email, telefone, cidade, observacoes],
  );
  return {
    id: result.lastID,
    nome,
    email,
    telefone,
    cidade,
    observacoes,
  };
}

module.exports = {
  getAll,
  create,
};
