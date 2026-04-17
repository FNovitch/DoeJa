// Configuração e funções do banco de dados SQLite
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.db");
const connection = new sqlite3.Database(dbPath);

// Executa uma query de inserção, atualização ou exclusão
function run(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.run(query, params, function onRun(error) {
      if (error) {
        reject(error);
        return;
      }

      resolve({
        lastID: this.lastID,
        changes: this.changes,
      });
    });
  });
}

// Executa uma query de consulta e retorna todos os resultados
function all(query, params = []) {
  return new Promise((resolve, reject) => {
    connection.all(query, params, (error, rows) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function close() {
  return new Promise((resolve, reject) => {
    connection.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });
}

module.exports = {
  connection,
  dbPath,
  run,
  all,
  close,
};
