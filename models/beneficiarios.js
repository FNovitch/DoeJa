const criarBancoDeDados = require("../db/database");

async function buscarTodosOsBeneficiarios() {
  const bancoDeDados = await criarBancoDeDados();
  return bancoDeDados.buscarVariosRegistros("SELECT * FROM beneficiarios");
}

async function criarNovoBeneficiario(dadosDoBeneficiario) {
  const bancoDeDados = await criarBancoDeDados();
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    dadosDoBeneficiario;

  const resultadoDaInsercao = await bancoDeDados.inserirAtualizarOuRemover(
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

module.exports = {
  buscarTodosOsBeneficiarios,
  criarNovoBeneficiario,
};
