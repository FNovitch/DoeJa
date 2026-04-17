const db = require("../db/database");

// Busca todos os beneficiários cadastrados no banco
exports.getAll = (callback) => {
  db.all("SELECT * FROM beneficiarios", [], callback);
};

// Cria um novo beneficiário no banco de dados
exports.create = (beneficiario, callback) => {
  // Extrai os campos do objeto recebido
  const { nome, cpf, telefone, endereco, familia_tamanho, necessidade } =
    beneficiario;
  // Executa o comando SQL para inserir o novo beneficiário
  db.run(
    "INSERT INTO beneficiarios (nome, cpf, telefone, endereco, familia_tamanho, necessidade) VALUES (?, ?, ?, ?, ?, ?)",
    [nome, cpf, telefone, endereco, familia_tamanho, necessidade],
    function (err) {
      if (err) return callback(err); // Em caso de erro, retorna o erro
      // Retorna o novo beneficiário criado, incluindo o id gerado
      callback(null, { id: this.lastID, ...beneficiario });
    },
  );
};
