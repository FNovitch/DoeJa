# DoeJá - Gestão de Doações de Cestas Básicas

Sistema completo para cadastro e gerenciamento de doadores e beneficiários de cestas básicas, com backend Node.js (Express + sqlite3) e front-end simples (HTML/CSS/JS).

## Funcionalidades

- Cadastro e listagem de doadores e beneficiários
- Busca de doadores por nome
- Banco de dados local SQLite3
- API RESTful
- Front-end responsivo e acessível

## Estrutura de Pastas

```
DoeJa/
├── db/
│   ├── database.js         # Conexão com o banco sqlite3
│   └── seed.js             # Popula o banco com dados de exemplo
├── migrations/
│   └── init.js             # Criação das tabelas
├── models/
│   ├── doadores.js         # Funções de acesso para doadores
│   └── beneficiarios.js    # Funções de acesso para beneficiários
├── routes/
│   ├── doadores.js         # Rotas dos doadores
│   └── beneficiarios.js    # Rotas dos beneficiários
├── public/
│   ├── index.html          # Página principal
│   ├── style.css           # Estilos
│   └── app.js              # JS do front-end
├── package.json
├── index.js                # Entry point do servidor
└── README.md
```

## Instalação

1. Clone o repositório e acesse a pasta:
   ```sh
   git clone <repo-url>
   cd DoeJa
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```

## Inicialização do Banco e Seed

1. Execute as migrações e popule o banco com dados de exemplo:
   ```sh
   npm run seed
   ```

## Execução em Desenvolvimento

1. Inicie o servidor com nodemon:
   ```sh
   npm run dev
   ```
2. Acesse o sistema em [http://localhost:3000](http://localhost:3000)

## Scripts disponíveis

- `npm run dev` — Executa o servidor com nodemon
- `npm start` — Executa o servidor normalmente
- `npm run seed` — Popula o banco com dados de exemplo

## Endpoints da API

- `GET /api/doadores` — Lista todos os doadores (parâmetro opcional: `nome` para busca)
- `POST /api/doadores` — Cria um doador (campos obrigatórios: nome, email)
- `GET /api/beneficiarios` — Lista todos os beneficiários
- `POST /api/beneficiarios` — Cria um beneficiário (campos obrigatórios: nome, cpf)
- `GET /api/status` — Checagem de status

## Exemplos de Testes Manuais (curl)

```sh
# Listar doadores
curl http://localhost:3000/api/doadores

# Buscar doador por nome
curl "http://localhost:3000/api/doadores?nome=Ana"

# Criar doador
curl -X POST http://localhost:3000/api/doadores -H "Content-Type: application/json" -d '{"nome":"Novo Doador","email":"novo@email.com"}'

# Listar beneficiários
curl http://localhost:3000/api/beneficiarios

# Criar beneficiário
curl -X POST http://localhost:3000/api/beneficiarios -H "Content-Type: application/json" -d '{"nome":"Novo Benef","cpf":"000.000.000-00"}'
```

## Observações

- O banco de dados é salvo em `db/database.db`.
- O front-end é servido automaticamente em `/`.
- O código está comentado para facilitar manutenção e entendimento.

---

Projeto desenvolvido para fins didáticos — VaiNaWeb 2026.
