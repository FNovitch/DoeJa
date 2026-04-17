const db = require("../db/database");

async function initializeDatabase() {
  await db.run(`
    CREATE TABLE IF NOT EXISTS doadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      cidade TEXT,
      observacoes TEXT
    )
  `);

  await db.run(`
    CREATE TABLE IF NOT EXISTS beneficiarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL,
      telefone TEXT,
      endereco TEXT,
      familia_tamanho INTEGER,
      necessidade TEXT
    )
  `);
}

module.exports = { initializeDatabase };
