const db = require("../db/database");

async function getAll() {
  return db.all("SELECT * FROM beneficiarios");
}

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
