const db = require("../db/database");

async function getAll() {
  return db.all("SELECT * FROM beneficiarios");
}

async function create(dadosDoBeneficiario) {
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    dadosDoBeneficiario;

  const resultadoDaInsercao = await db.run(
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
    id: resultadoDaInsercao.lastID,
    nome,
    cpf,
    telefone,
    endereco,
    familia_tamanho,
    necessidade,
  };
}

const buscarTodosOsBeneficiarios = getAll;
const criarNovoBeneficiario = create;

module.exports = {
  getAll,
  create,
  buscarTodosOsBeneficiarios,
  criarNovoBeneficiario,
};
