const criarBancoDeDados = require("./database");
const { inicializarBancoDeDados } = require("../migrations/init");

const doadores = [
  {
    nome: "Ana Souza",
    email: "ana.souza@email.com",
    telefone: "21999990001",
    cidade: "Rio de Janeiro",
    observacoes: "Prefere contato por email.",
  },
  {
    nome: "Carlos Lima",
    email: "carlos.lima@email.com",
    telefone: "21999990002",
    cidade: "Niteroi",
    observacoes: "",
  },
  {
    nome: "Beatriz Silva",
    email: "beatriz.silva@email.com",
    telefone: "21999990003",
    cidade: "Duque de Caxias",
    observacoes: "Disponivel para doar mensalmente.",
  },
  {
    nome: "Eduardo Santos",
    email: "eduardo.santos@email.com",
    telefone: "21999990004",
    cidade: "Nova Iguacu",
    observacoes: "",
  },
  {
    nome: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    telefone: "21999990005",
    cidade: "Sao Goncalo",
    observacoes: "Aceita contato por WhatsApp.",
  },
  {
    nome: "Gabriel Almeida",
    email: "gabriel.almeida@email.com",
    telefone: "21999990006",
    cidade: "Belford Roxo",
    observacoes: "",
  },
  {
    nome: "Helena Martins",
    email: "helena.martins@email.com",
    telefone: "21999990007",
    cidade: "Itaborai",
    observacoes: "",
  },
  {
    nome: "Igor Pereira",
    email: "igor.pereira@email.com",
    telefone: "21999990008",
    cidade: "Queimados",
    observacoes: "Pode doar apenas em dezembro.",
  },
];

const beneficiarios = [
  {
    nome: "Joao Oliveira",
    cpf: "123.456.789-00",
    telefone: "21988880001",
    endereco: "Rua das Flores, 100",
    familia_tamanho: 4,
    necessidade: "Desemprego recente.",
  },
  {
    nome: "Maria Santos",
    cpf: "987.654.321-00",
    telefone: "21988880002",
    endereco: "Av. Brasil, 200",
    familia_tamanho: 5,
    necessidade: "Problemas de saude.",
  },
  {
    nome: "Pedro Costa",
    cpf: "321.654.987-00",
    telefone: "21988880003",
    endereco: "Rua A, 10",
    familia_tamanho: 3,
    necessidade: "Renda insuficiente.",
  },
  {
    nome: "Luciana Lima",
    cpf: "654.987.321-00",
    telefone: "21988880004",
    endereco: "Rua B, 20",
    familia_tamanho: 2,
    necessidade: "Mae solo.",
  },
  {
    nome: "Rafael Souza",
    cpf: "456.123.789-00",
    telefone: "21988880005",
    endereco: "Rua C, 30",
    familia_tamanho: 6,
    necessidade: "Desemprego.",
  },
  {
    nome: "Patricia Gomes",
    cpf: "789.321.654-00",
    telefone: "21988880006",
    endereco: "Rua D, 40",
    familia_tamanho: 4,
    necessidade: "Problemas de saude.",
  },
  {
    nome: "Thiago Fernandes",
    cpf: "147.258.369-00",
    telefone: "21988880007",
    endereco: "Rua E, 50",
    familia_tamanho: 5,
    necessidade: "Renda insuficiente.",
  },
  {
    nome: "Juliana Rocha",
    cpf: "369.258.147-00",
    telefone: "21988880008",
    endereco: "Rua F, 60",
    familia_tamanho: 3,
    necessidade: "Desemprego.",
  },
  {
    nome: "Bruno Cardoso",
    cpf: "258.369.147-00",
    telefone: "21988880009",
    endereco: "Rua G, 70",
    familia_tamanho: 2,
    necessidade: "Mae solo.",
  },
  {
    nome: "Camila Ribeiro",
    cpf: "963.852.741-00",
    telefone: "21988880010",
    endereco: "Rua H, 80",
    familia_tamanho: 4,
    necessidade: "Problemas de saude.",
  },
  {
    nome: "Felipe Teixeira",
    cpf: "852.741.963-00",
    telefone: "21988880011",
    endereco: "Rua I, 90",
    familia_tamanho: 5,
    necessidade: "Desemprego.",
  },
  {
    nome: "Larissa Mendes",
    cpf: "741.963.852-00",
    telefone: "21988880012",
    endereco: "Rua J, 110",
    familia_tamanho: 3,
    necessidade: "Renda insuficiente.",
  },
];

async function executarSeed() {
  const bancoDeDados = await criarBancoDeDados();

  try {
    await inicializarBancoDeDados();

    await bancoDeDados.executarComandoSql(`
      DELETE FROM doadores;
      DELETE FROM beneficiarios;
    `);

    for (const doador of doadores) {
      await bancoDeDados.inserirAtualizarOuRemover(
        `
          INSERT INTO doadores (nome, email, telefone, cidade, observacoes)
          VALUES (?, ?, ?, ?, ?)
        `,
        [
          doador.nome,
          doador.email,
          doador.telefone,
          doador.cidade,
          doador.observacoes,
        ],
      );
    }

    for (const beneficiario of beneficiarios) {
      await bancoDeDados.inserirAtualizarOuRemover(
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
        [
          beneficiario.nome,
          beneficiario.cpf,
          beneficiario.telefone,
          beneficiario.endereco,
          beneficiario.familia_tamanho,
          beneficiario.necessidade,
        ],
      );
    }

    console.log("Seed concluido com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seed:", error.message);
    process.exitCode = 1;
  } finally {
    await bancoDeDados.fecharConexao();
  }
}

executarSeed();
