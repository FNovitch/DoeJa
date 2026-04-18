<p align="center">
<img loading="lazy" src="http://img.shields.io/static/v1?label=STATUS&message=%20EM%20ANDAMENTO&color=orange&style=for-the-badge"/>
</p>

# DoeJa

Landing page e sistema simples para conectar doadores a pessoas e familias em situacao de necessidade.

## Visao geral

O projeto combina:

- landing page institucional em `HTML`, `CSS` e `JavaScript`
- backend leve com `Node.js + Express`
- banco local com `SQLite`
- API para cadastrar e listar doadores e beneficiarios

## Ideia do projeto

Criar uma plataforma simples para aproximar pessoas que desejam ajudar de pessoas e familias que precisam receber doacoes, deixando o processo mais visivel, organizado e acessivel.

## Problema escolhido

Muitas iniciativas solidarias enfrentam dificuldade para organizar informacoes de doadores e beneficiarios em um so lugar. Isso atrasa o contato, dificulta a triagem e reduz a eficiencia das doacoes.

## Solucao proposta

O DoeJa resolve esse problema com uma aplicacao leve que:

- cadastra doadores
- cadastra beneficiarios
- lista os registros salvos
- permite busca de doadores por nome
- centraliza as informacoes em um banco local simples

## Estrutura da solucao

A solução foi dividida em quatro partes principais:

- `landing page`: apresenta o projeto, gera interesse e direciona para a participacao
- `front-end`: envia os dados dos formularios e exibe as listagens
- `API`: recebe as requisicoes e organiza a comunicacao com o banco
- `SQLite`: armazena os dados de doadores e beneficiarios

## Stack

- `Node.js`
- `Express`
- `SQLite3`
- `HTML`
- `CSS`
- `JavaScript`

## Estrutura

```text
DoeJa/
|-- db/
|   |-- database.js
|   |-- database.db
|   `-- seed.js
|-- migrations/
|   `-- init.js
|-- models/
|   |-- beneficiarios.js
|   `-- doadores.js
|-- public/
|   |-- app.js
|   |-- index.html
|   `-- style.css
|-- routes/
|   |-- beneficiarios.js
|   `-- doadores.js
|-- index.js
|-- package.json
`-- README.md
```

## O que cada pasta faz

- `public/`: Interface da landing page e scripts do front-end
- `routes/`: Endpoints da API
- `models/`: Acesso aos dados no banco
- `db/`: Conexao SQLite e seed de dados
- `migrations/`: Criacao das tabelas

## Como rodar

```bash
npm install
npm run seed
npm run dev
```

Depois acesse [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev`: sobe o projeto com `nodemon`
- `npm start`: sobe o projeto normalmente
- `npm run seed`: recria os dados de exemplo no banco

## Fluxo do backend

1. `index.js` inicializa o banco e sobe o servidor.
2. As rotas em `routes/` recebem a requisicao.
3. Os models em `models/` executam as consultas no SQLite.
4. O front-end em `public/` consome a API.

## Endpoints

### Status

- `GET /api/status`

### Doadores

- `GET /api/doadores`
- `GET /api/doadores?nome=ana`
- `POST /api/doadores`

Exemplo de corpo:

```json
{
  "nome": "Maria",
  "email": "maria@email.com",
  "telefone": "21999999999",
  "cidade": "Rio de Janeiro",
  "observacoes": "Disponivel para ajudar aos finais de semana."
}
```

### Beneficiarios

- `GET /api/beneficiarios`
- `POST /api/beneficiarios`

Exemplo de corpo:

```json
{
  "nome": "Joao",
  "cpf": "000.000.000-00",
  "telefone": "21988888888",
  "endereco": "Rua Exemplo, 100",
  "familia_tamanho": 3,
  "necessidade": "Necessita de apoio com alimentos."
}
```

## Testes manuais

```bash
curl http://localhost:3000/api/status
curl http://localhost:3000/api/doadores
curl "http://localhost:3000/api/doadores?nome=Ana"
curl http://localhost:3000/api/beneficiarios
```
