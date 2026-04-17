// Modelo para operações com a tabela 'beneficiários' no banco de dados
const db = require("../db/database");

// Retorna lista de todos os beneficiários
async function getAll() {
  return db.all("SELECT * FROM beneficiarios");
}

// Cria um novo beneficiário no banco de dados
async function create(beneficiario) {
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    beneficiario;

  const result = await db.run(
    `
      INSERT INTO beneficiarios (
        nome,
        cpf,
        telefone,
        endereco,
        familia_tamanho,
        necessidade
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nome, cpf, telefone, endereco, familia_tamanho, necessidade],
  );

  return {
    id: result.lastID,
    nome,
    cpf,
    telefone,
    endereco,
    familia_tamanho,
    necessidade,
  };
}

module.exports = {
  getAll,
  create,
};
