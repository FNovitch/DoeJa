export interface Doador {
  id: number;
  nome: string;
  email: string;
  telefone: string | null;
  cidade: string | null;
  observacoes: string | null;
}

export interface CriarDoadorDTO {
  nome: string;
  email: string;
  telefone?: string | null;
  cidade?: string | null;
  observacoes?: string | null;
}

export interface Beneficiario {
  id: number;
  nome: string;
  cpf: string;
  telefone: string | null;
  endereco: string | null;
  familia_tamanho: number | null;
  necessidade: string | null;
}

export interface CriarBeneficiarioDTO {
  nome: string;
  cpf: string;
  telefone?: string | null;
  endereco?: string | null;
  familia_tamanho?: number | string | null;
  necessidade?: string | null;
}

export interface NomeQuery {
  nome?: string;
}
