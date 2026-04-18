const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const caminhoDoBanco = path.join(__dirname, "database.db");
let bancoDeDados = null;

function abrirConexaoComOBanco() {
  return new Promise((resolve, reject) => {
    const conexaoComOBanco = new sqlite3.Database(
      caminhoDoBanco,
      (erroNaConexao) => {
        if (erroNaConexao) {
          reject(erroNaConexao);
          return;
        }

        resolve(conexaoComOBanco);
      },
    );
  });
}

async function criarBancoDeDados() {
  if (bancoDeDados) {
    return bancoDeDados;
  }

  const conexaoComOBanco = await abrirConexaoComOBanco();

  bancoDeDados = {
    executarComandoSql(comandoSql) {
      return new Promise((resolve, reject) => {
        conexaoComOBanco.exec(comandoSql, (erroAoExecutar) => {
          if (erroAoExecutar) {
            reject(erroAoExecutar);
            return;
          }

          resolve();
        });
      });
    },

    inserirAtualizarOuRemover(comandoSql, parametros = []) {
      return new Promise((resolve, reject) => {
        conexaoComOBanco.run(
          comandoSql,
          parametros,
          function aoExecutarComando(erroAoExecutar) {
            if (erroAoExecutar) {
              reject(erroAoExecutar);
              return;
            }

            resolve({
              lastID: this.lastID,
              changes: this.changes,
            });
          },
        );
      });
    },

    buscarUmRegistro(comandoSql, parametros = []) {
      return new Promise((resolve, reject) => {
        conexaoComOBanco.get(
          comandoSql,
          parametros,
          (erroAoBuscar, registroEncontrado) => {
            if (erroAoBuscar) {
              reject(erroAoBuscar);
              return;
            }

            resolve(registroEncontrado);
          },
        );
      });
    },

    buscarVariosRegistros(comandoSql, parametros = []) {
      return new Promise((resolve, reject) => {
        conexaoComOBanco.all(
          comandoSql,
          parametros,
          (erroAoBuscar, registrosEncontrados) => {
            if (erroAoBuscar) {
              reject(erroAoBuscar);
              return;
            }

            resolve(registrosEncontrados);
          },
        );
      });
    },

    fecharConexao() {
      return new Promise((resolve, reject) => {
        conexaoComOBanco.close((erroAoFechar) => {
          if (erroAoFechar) {
            reject(erroAoFechar);
            return;
          }

          bancoDeDados = null;
          resolve();
        });
      });
    },
  };

  return bancoDeDados;
}

module.exports = criarBancoDeDados;
