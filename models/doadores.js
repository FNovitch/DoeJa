// Importa a conexão com o banco de dados SQLite
const db = require("../db/database");

// Busca todos os doadores cadastrados, com filtro opcional por nome
exports.getAll = (nome, callback) => {
  let query = "SELECT * FROM doadores";
  let params = [];
  // Se um nome for fornecido, filtra pelo nome
  if (nome) {
    query += " WHERE nome LIKE ?";
    params.push(`%${nome}%`);
  }
  db.all(query, params, callback);
};

// Cria um novo doador no banco de dados
exports.create = (doador, callback) => {
  // Extrai os campos do objeto recebido
  const { nome, email, telefone, cidade, observacoes } = doador;
  // Executa o comando SQL para inserir o novo doador
  db.run(
    "INSERT INTO doadores (nome, email, telefone, cidade, observacoes) VALUES (?, ?, ?, ?, ?)",
    [nome, email, telefone, cidade, observacoes],
    function (err) {
      if (err) return callback(err); // Em caso de erro, retorna o erro
      // Retorna o novo doador criado, incluindo o id gerado
      callback(null, { id: this.lastID, ...doador });
    },
  );
};
