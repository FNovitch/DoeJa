const criarBancoDeDados = require("../db/database");

async function buscarTodosOsDoadores(nome = "") {
  const bancoDeDados = await criarBancoDeDados();
  let comandoSql = "SELECT * FROM doadores";
  const parametrosDaBusca = [];

  if (nome) {
    comandoSql += " WHERE nome LIKE ?";
    parametrosDaBusca.push(`%${nome}%`);
  }

  return bancoDeDados.buscarVariosRegistros(comandoSql, parametrosDaBusca);
}

async function criarNovoDoador(dadosDoDoador) {
  const bancoDeDados = await criarBancoDeDados();
  const { nome, email, telefone, cidade, observacoes } = dadosDoDoador;

  const resultadoDaInsercao = await bancoDeDados.inserirAtualizarOuRemover(
    `
      INSERT INTO doadores (nome, email, telefone, cidade, observacoes)
      VALUES (?, ?, ?, ?, ?)
    `,
    [nome, email, telefone, cidade, observacoes],
  );

  return {
    id: resultadoDaInsercao.lastID,
    nome,
    email,
    telefone,
    cidade,
    observacoes,
  };
}

module.exports = {
  buscarTodosOsDoadores,
  criarNovoDoador,
};
