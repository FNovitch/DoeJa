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
    consentimento,
  } = dadosDoBeneficiario;
  const tamanhoFamilia = normalizarTamanhoFamilia(familia_tamanho);
  const consentidoEm = new Date().toISOString();

  const resultadoDaInsercao = await db.run(
    `
      INSERT INTO beneficiarios (
        nome,
        cpf,
        telefone,
        endereco,
        familia_tamanho,
        necessidade,
        consentimento,
        consentido_em
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nome,
      cpf,
      telefone,
      endereco,
      tamanhoFamilia,
      necessidade,
      consentimento ? 1 : 0,
      consentidoEm,
    ],
  );

  return {
    id: resultadoDaInsercao.lastID,
    nome,
    cpf,
    telefone,
    endereco,
    familia_tamanho: tamanhoFamilia,
    necessidade,
    consentimento,
    consentido_em: consentidoEm,
  };
}
