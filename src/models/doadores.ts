import db from "../db/database";
import type { CriarDoadorDTO, Doador } from "../types/entities";

export async function getAll(nome = ""): Promise<Doador[]> {
  const filtros: string[] = [];
  let query = "SELECT * FROM doadores";

  if (nome) {
    query += " WHERE nome LIKE ?";
    filtros.push(`%${nome}%`);
  }

  return db.all<Doador>(query, filtros);
}

export async function create(doador: CriarDoadorDTO): Promise<Doador> {
  const { nome, email, telefone = null, cidade = null, observacoes = null } =
    doador;

  const result = await db.run(
    `
      INSERT INTO doadores (nome, email, telefone, cidade, observacoes)
      VALUES (?, ?, ?, ?, ?)
    `,
    [nome, email, telefone, cidade, observacoes],
  );

  return {
    id: result.lastID,
    nome,
    email,
    telefone,
    cidade,
    observacoes,
  };
}
