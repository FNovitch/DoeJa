# DoeJa

![Status](https://img.shields.io/badge/status-concluido-16a34a?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-111827?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003b57?style=for-the-badge&logo=sqlite&logoColor=white)

DoeJa e uma aplicacao web fullstack demonstrativa para conectar doadores a pessoas e familias em situacao de necessidade.

O projeto combina landing page, API em Node.js/Express, TypeScript e persistencia local com SQLite.

## Visao Geral

- Landing page institucional para apresentar a proposta.
- Cadastro de doadores.
- Cadastro de beneficiarios.
- Landing page sem listagem de cadastros individuais.
- API propria para consulta e criacao de dados.
- Persistencia local em SQLite.

## Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript
- ES Modules

### Backend

- Node.js
- Express
- TypeScript
- SQLite3
- tsx

## Funcionalidades

- Cadastro de doadores.
- Cadastro de beneficiarios.
- Validação acessível e feedback de envio nos formulários.
- Consulta e listagem mantidas conforme a API original.
- Endpoint de status da API.
- Seed para popular dados iniciais.
- Build TypeScript para producao.

## Estrutura

```bash
.
├── db
├── public
│   ├── assets
│   ├── index.html
│   ├── scripts
│   └── styles
├── src
│   ├── db
│   ├── migrations
│   ├── models
│   ├── routes
│   ├── types
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Como Rodar

### Pre-requisitos

- Node.js 22
- npm

### Instalacao

```bash
npm install
```

### Banco de dados

```bash
npm run seed
```

### Desenvolvimento

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm start
npm run seed
npm run seed:prod
```

## API

Rotas principais:

- `GET /api/status`
- `GET /api/doadores`
- `POST /api/doadores`
- `GET /api/beneficiarios`
- `POST /api/beneficiarios`

## Deploy

Deploy atual:

[https://doeja.onrender.com/](https://doeja.onrender.com/)

O serviço atual usa a instância Free do Render, sem disco persistente. Nesse plano,
o SQLite é armazenado em filesystem efêmero: reinícios e redeploys podem apagar os
cadastros realizados depois do último backup. Essa limitação foi mantida por opção
do responsável pelo projeto para evitar custos recorrentes.

O `postinstall` compila o TypeScript e o arquivo `index.js` na raiz encaminha a
inicialização para `dist/index.js`. Assim, os comandos atuais do Render —
`npm install` e `node index.js` — continuam compatíveis sem alterar o backend.

## Status

Projeto concluido para portfólio, com foco em fundamentos de API, persistencia local, TypeScript e organizacao de uma aplicacao fullstack simples.
