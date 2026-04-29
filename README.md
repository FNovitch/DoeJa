<p align="center">
  <img
    loading="lazy"
    src="https://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge"
  />
</p>

<h1 align="center">DoeJa</h1>

<p align="center">
  Aplicacao web com landing page, API em Node.js e banco SQLite para conectar
  doadores a pessoas e familias em situacao de necessidade.
</p>

## Sobre o projeto

O **DoeJa** e um projeto de portifolio criado para praticar o desenvolvimento de
uma aplicacao full stack simples, combinando front-end institucional, back-end
com `Node.js + Express` e persistencia local com `SQLite`.

A ideia central do projeto e facilitar a conexao entre pessoas que desejam ajudar
com doacoes e pessoas ou familias que precisam receber apoio, reunindo essas
informacoes em uma plataforma unica e mais organizada.

## Funcionalidades

- Landing page institucional do projeto
- Cadastro de doadores
- Cadastro de beneficiarios
- Listagem de registros salvos
- Busca de doadores por nome
- API local para consulta e criacao de dados
- Persistencia em banco `SQLite`

## Tecnologias utilizadas

- `HTML5`
- `CSS3`
- `JavaScript`
- `Node.js`
- `Express`
- `SQLite3`

## Estrutura do projeto

```text
DoeJa/
|- db/
|  |- database.db
|  |- database.js
|  |- seed.js
|- migrations/
|  |- init.js
|- models/
|  |- beneficiarios.js
|  |- doadores.js
|- public/
|  |- app.js
|  |- index.html
|  |- style.css
|- routes/
|  |- beneficiarios.js
|  |- doadores.js
|- index.js
|- package.json
|- README.md
```

## Arquitetura atual

O projeto foi organizado em camadas simples para separar interface, regras de
rota, acesso ao banco e persistencia.

### Front-end

- Landing page e formularios em `public/index.html`
- Estilos centralizados em `public/style.css`
- Interacao com a API feita por `public/app.js`

### Back-end

- Servidor em `index.js`
- Rotas da API em `routes/`
- Models de acesso ao banco em `models/`
- Banco local e seed em `db/`
- Criacao de estrutura inicial em `migrations/`

## Como executar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Gere os dados iniciais no banco:

```bash
npm run seed
```

3. Inicie o servidor:

```bash
npm run dev
```

4. Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponiveis

```bash
npm run dev
npm start
npm run seed
```

## Endpoints principais

### Status

- `GET /api/status`

### Doadores

- `GET /api/doadores`
- `GET /api/doadores?nome=ana`
- `POST /api/doadores`

### Beneficiarios

- `GET /api/beneficiarios`
- `POST /api/beneficiarios`

## Objetivos de aprendizado demonstrados

- Estruturacao de API com `Express`
- Persistencia de dados com `SQLite`
- Separacao entre front-end, rotas e models
- Integracao entre formulario e API
- Organizacao de projeto full stack para portifolio

## Melhorias realizadas nesta versao

- Reestruturacao do README para apresentacao mais profissional
- Documentacao mais clara da arquitetura e do fluxo da aplicacao
- Organizacao das funcionalidades em secoes objetivas
- Melhor alinhamento com o restante do portfolio

## Deploy

Deploy atual do projeto:

[https://doeja.onrender.com/](https://doeja.onrender.com/)

