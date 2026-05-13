import db from "../db/database";
import type { Beneficiario, CriarBeneficiarioDTO } from "../types/entities";

function normalizarTamanhoFamilia(
  valor: CriarBeneficiarioDTO["familia_tamanho"],
): number | null {
  if (valor === undefined || valor === null || valor === "") {
    return null;
  }

  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : null;
}

export async function getAll(nome = ""): Promise<Beneficiario[]> {
  const filtros: string[] = [];
  let query = "SELECT * FROM beneficiarios";

  if (nome) {
    query += " WHERE nome LIKE ?";
    filtros.push(`%${nome}%`);
  }

  return db.all<Beneficiario>(query, filtros);
}

export async function create(
  dadosDoBeneficiario: CriarBeneficiarioDTO,
): Promise<Beneficiario> {
  const {
    nome,
    cpf,
    telefone = null,
    endereco = null,
    familia_tamanho,
    necessidade = null,
  } = dadosDoBeneficiario;
  const tamanhoFamilia = normalizarTamanhoFamilia(familia_tamanho);

  const resultadoDaInsercao = await db.run(
    `
      INSERT INTO beneficiarios (
        nome,
        cpf,
        telefone,
        endereco,
        familia_tamanho,
        necessidade
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [nome, cpf, telefone, endereco, tamanhoFamilia, necessidade],
  );

  return {
    id: resultadoDaInsercao.lastID,
    nome,
    cpf,
    telefone,
    endereco,
    familia_tamanho: tamanhoFamilia,
    necessidade,
  };
}

export const buscarTodosOsBeneficiarios = getAll;
export const criarNovoBeneficiario = create;
