import db from "../db/database";
import type { CriarDoadorDTO, Doador } from "../types/entities";

export async function create(doador: CriarDoadorDTO): Promise<Doador> {
  const {
    nome,
    email,
    telefone = null,
    cidade = null,
    observacoes = null,
    consentimento,
  } = doador;
  const consentidoEm = new Date().toISOString();

  const result = await db.run(
    `
      INSERT INTO doadores (
        nome,
        email,
        telefone,
        cidade,
        observacoes,
        consentimento,
        consentido_em
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      email,
      telefone,
      cidade,
      observacoes,
      consentimento ? 1 : 0,
      consentidoEm,
    ],
  );

  return {
    id: result.lastID,
    nome,
    email,
    telefone,
    cidade,
    observacoes,
    consentimento,
    consentido_em: consentidoEm,
  };
}
