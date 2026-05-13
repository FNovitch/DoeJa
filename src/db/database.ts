import path from "path";
import sqlite3 from "sqlite3";

type SqlParameter = string | number | null;
type SqlParameters = SqlParameter[];

interface RunResult {
  lastID: number;
  changes: number;
}

export interface DatabaseClient {
  connection: sqlite3.Database;
  dbPath: string;
  run(query: string, params?: SqlParameters): Promise<RunResult>;
  exec(query: string): Promise<void>;
  all<T>(query: string, params?: SqlParameters): Promise<T[]>;
  close(): Promise<void>;
  executarComandoSql(query: string): Promise<void>;
  buscarVariosRegistros<T>(query: string, params?: SqlParameters): Promise<T[]>;
  inserirAtualizarOuRemover(
    query: string,
    params?: SqlParameters,
  ): Promise<RunResult>;
  fecharConexao(): Promise<void>;
}

const sqlite = sqlite3.verbose();
const dbPath = path.join(process.cwd(), "db", "database.db");
const connection = new sqlite.Database(dbPath);

function run(query: string, params: SqlParameters = []): Promise<RunResult> {
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

function exec(query: string): Promise<void> {
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

function all<T>(query: string, params: SqlParameters = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    connection.all(query, params, (error, rows: T[]) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(rows);
    });
  });
}

function close(): Promise<void> {
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

async function createDatabase(): Promise<DatabaseClient> {
  return database;
}

const database = Object.assign(createDatabase, {
  connection,
  dbPath,
  run,
  exec,
  all,
  close,
  executarComandoSql: exec,
  buscarVariosRegistros: all,
  inserirAtualizarOuRemover: run,
  fecharConexao: close,
});

export default database;
