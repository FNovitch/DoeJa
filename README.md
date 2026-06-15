# DoeJa

![Status](https://img.shields.io/badge/status-concluido-16a34a?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-111827?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003b57?style=for-the-badge&logo=sqlite&logoColor=white)

DoeJa e uma aplicacao web fullstack demonstrativa para conectar doadores a pessoas e familias em situacao de necessidade.

O projeto combina landing page, API em Node.js/Express, TypeScript e persistencia local com SQLite.

## Visao Geral

- Landing page institucional para apresentar a proposta.
- Cadastro de doadores.
- Cadastro de beneficiarios.
- Listagem e busca de registros.
- API propria para consulta e criacao de dados.
- Persistencia local em SQLite.

## Tecnologias

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express
- TypeScript
- SQLite3
- tsx

## Funcionalidades

- Cadastro de doadores.
- Cadastro de beneficiarios.
- Busca por nome.
- Listagem de registros salvos.
- Endpoint de status da API.
- Seed para popular dados iniciais.
- Build TypeScript para producao.

## Estrutura

```bash
.
├── db
├── public
│   ├── app.js
│   ├── index.html
│   └── style.css
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

- Node.js 18
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

## Status

Projeto concluido para portfólio, com foco em fundamentos de API, persistencia local, TypeScript e organizacao de uma aplicacao fullstack simples.
