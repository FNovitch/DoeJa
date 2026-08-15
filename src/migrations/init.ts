import db from "../db/database";

interface TableColumn {
  name: string;
}

async function ensureColumn(
  table: "doadores" | "beneficiarios",
  column: string,
  definition: string,
): Promise<void> {
  const columns = await db.all<TableColumn>(`PRAGMA table_info(${table})`);
  if (!columns.some(({ name }) => name === column)) {
    await db.exec(`ALTER TABLE ${table} ADD COLUMN ${definition}`);
  }
}

export async function initializeDatabase(): Promise<void> {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS doadores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT,
      cidade TEXT,
      observacoes TEXT,
      consentimento INTEGER NOT NULL DEFAULT 0,
      consentido_em TEXT
    );

    CREATE TABLE IF NOT EXISTS beneficiarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      cpf TEXT NOT NULL,
      telefone TEXT,
      endereco TEXT,
      familia_tamanho INTEGER,
      necessidade TEXT,
      consentimento INTEGER NOT NULL DEFAULT 0,
      consentido_em TEXT
    );
  `);

  await ensureColumn(
    "doadores",
    "consentimento",
    "consentimento INTEGER NOT NULL DEFAULT 0",
  );
  await ensureColumn("doadores", "consentido_em", "consentido_em TEXT");
  await ensureColumn(
    "beneficiarios",
    "consentimento",
    "consentimento INTEGER NOT NULL DEFAULT 0",
  );
  await ensureColumn(
    "beneficiarios",
    "consentido_em",
    "consentido_em TEXT",
  );
}

export const inicializarBancoDeDados = initializeDatabase;
