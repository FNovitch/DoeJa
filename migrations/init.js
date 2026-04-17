// Cria as tabelas doadores e beneficiarios se não existirem
const db = require("../db/database");

// Criação das tabelas principais do sistema
db.serialize(() => {
  // Cria a tabela de doadores
  db.run(`CREATE TABLE IF NOT EXISTS doadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    telefone TEXT,
    cidade TEXT,
    observacoes TEXT
  )`);

  // Cria a tabela de beneficiários
  db.run(`CREATE TABLE IF NOT EXISTS beneficiarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cpf TEXT NOT NULL,
    telefone TEXT,
    endereco TEXT,
    familia_tamanho INTEGER,
    necessidade TEXT
  )`);
});

// Fecha a conexão após a migração
setTimeout(() => db.close(), 500);
