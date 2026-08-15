# DoeJa

![Status](https://img.shields.io/badge/status-concluido-16a34a?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-111827?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003b57?style=for-the-badge&logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)

DoeJa e uma aplicacao web fullstack demonstrativa para conectar doadores a pessoas e familias em situacao de necessidade.

O projeto combina landing page, API em Node.js/Express, TypeScript e persistencia local com SQLite.

## Visao Geral

- Landing page institucional para apresentar a proposta.
- Cadastro de doadores.
- Cadastro de beneficiarios.
- Landing page sem listagem de cadastros individuais.
- API própria para criação de cadastros, sem listagens públicas.
- Persistencia local em SQLite.

## Tecnologias

### Frontend

- HTML5
- Tailwind CSS v4
- JavaScript
- ES Modules

### Backend

- Node.js
- Express
- TypeScript
- SQLite3

## Funcionalidades

- Cadastro de doadores.
- Cadastro de beneficiarios.
- Validação acessível e feedback de envio nos formulários.
- Consentimento obrigatório validado e registrado pelo servidor.
- Listagens de dados pessoais bloqueadas na API pública.
- Endpoint de status da API.
- Migração não destrutiva para bancos criados em versões anteriores.
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
│   └── styles          # app.css gerado e ignorado pelo Git
├── styles
│   └── tailwind.css    # tema e folha-fonte do Tailwind
├── src
│   ├── db
│   ├── migrations
│   ├── models
│   ├── routes
│   ├── types
│   ├── app.ts
│   └── index.ts
├── tests
│   ├── e2e
│   ├── integration
│   └── unit
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

Esse comando acompanha a compilação TypeScript, reinicia o servidor quando o
JavaScript compilado muda e gera o Tailwind em modo watch.
O CSS de produção é gerado automaticamente pelo `postinstall` ou por
`npm run build`; não edite `public/styles/app.css` manualmente.

Acesse:

```txt
http://localhost:3000
```

## Scripts

```bash
npm run dev
npm run build
npm run build:server
npm run build:css
npm run check
npm run test:e2e
npm start
npm run seed
npm run seed:prod
```

## API

Rotas principais:

- `GET /api/status`
- `POST /api/doadores`
- `POST /api/beneficiarios`

Os endpoints `GET /api/doadores` e `GET /api/beneficiarios` respondem `405` e
não retornam dados pessoais. Os dois endpoints de cadastro exigem
`consentimento: true` no payload.

## Deploy

Deploy atual:

[https://doeja.onrender.com/](https://doeja.onrender.com/)

O serviço atual usa a instância Free do Render, sem disco persistente. Nesse plano,
o SQLite é armazenado em filesystem efêmero: reinícios e redeploys podem apagar os
cadastros realizados depois do último backup. Essa limitação foi mantida por opção
do responsável pelo projeto para evitar custos recorrentes.

O `postinstall` compila o TypeScript e gera o CSS Tailwind minificado. O arquivo
`index.js` na raiz encaminha a inicialização para `dist/index.js`. Assim, os
comandos atuais do Render — `npm install` e `node index.js` — continuam
compatíveis. A migração de consentimento adiciona colunas com valores padrão e
preserva os registros existentes no arquivo SQLite usado pelo processo.

## Status

Projeto concluido para portfólio, com foco em fundamentos de API, persistencia local, TypeScript e organizacao de uma aplicacao fullstack simples.
