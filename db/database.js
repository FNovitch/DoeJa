// Configuracao e funcoes do banco de dados
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath = path.join(__dirname, "database.db");
const connection = new sqlite3.Database(dbPath);

// Executa uma query de insercao, atualizacao ou exclusao
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

// Executa um script SQL com um ou mais comandos
function exec(query) {
  return new Promise((resolve, reject) => {
    connection.exec(query, (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
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

async function createDatabase() {
  return createDatabase;
}

createDatabase.connection = connection;
createDatabase.dbPath = dbPath;
createDatabase.run = run;
createDatabase.exec = exec;
createDatabase.all = all;
createDatabase.close = close;

// Aliases para compatibilidade com a API antiga.
createDatabase.executarComandoSql = exec;
createDatabase.buscarVariosRegistros = all;
createDatabase.inserirAtualizarOuRemover = run;
createDatabase.fecharConexao = close;

module.exports = createDatabase;
