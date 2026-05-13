<p align="center">
  <img
    loading="lazy"
    src="https://img.shields.io/static/v1?label=STATUS&message=%20CONCLUIDO&color=GREEN&style=for-the-badge"
  />
</p>

<h1 align="center">DoeJa</h1>

<p align="center">
  Aplicacao web com landing page, API em Node.js, Express, TypeScript e banco
  SQLite para conectar doadores a pessoas e familias em situacao de necessidade.
</p>

## Sobre o projeto

O **DoeJa** e um projeto de portifolio criado para praticar o desenvolvimento de
uma aplicacao full stack simples, combinando front-end institucional, back-end
com `Node.js + Express + TypeScript` e persistencia local com `SQLite`.

A ideia central do projeto e facilitar a conexao entre pessoas que desejam ajudar
com doacoes e pessoas ou familias que precisam receber apoio, reunindo essas
informacoes em uma plataforma unica e mais organizada.

## Funcionalidades

- Landing page institucional do projeto
- Cadastro de doadores
- Cadastro de beneficiarios
- Listagem de registros salvos
- Busca de doadores e beneficiarios por nome
- API para consulta e criacao de dados
- Persistencia em banco `SQLite`

## Tecnologias utilizadas

- `HTML5`
- `CSS3`
- `JavaScript` no front-end
- `TypeScript`
- `Node.js`
- `Express`
- `SQLite3`
- `tsx`

## Estrutura do projeto

```text
DoeJa/
|- db/
|  |- database.db
|- dist/
|  |- arquivos compilados pelo TypeScript
|- public/
|  |- app.js
|  |- index.html
|  |- style.css
|- src/
|  |- db/
|  |  |- database.ts
|  |  |- seed.ts
|  |- migrations/
|  |  |- init.ts
|  |- models/
|  |  |- beneficiarios.ts
|  |  |- doadores.ts
|  |- routes/
|  |  |- beneficiarios.ts
|  |  |- doadores.ts
|  |- types/
|  |  |- entities.ts
|  |- index.ts
|- package.json
|- tsconfig.json
|- README.md
```

## Arquitetura

O projeto foi organizado em camadas simples para separar interface, rotas,
tipos de dominio, acesso ao banco e inicializacao da persistencia.

### Front-end

- Landing page e formularios em `public/index.html`
- Estilos centralizados em `public/style.css`
- Interacao com a API feita por `public/app.js`

### Back-end

- Servidor Express em `src/index.ts`
- Rotas da API em `src/routes/`
- Models de acesso ao banco em `src/models/`
- Tipos de doadores e beneficiarios em `src/types/`
- Conexao SQLite em `src/db/database.ts`
- Criacao da estrutura inicial em `src/migrations/init.ts`
- Build compilado em `dist/`

## Como executar localmente

1. Instale as dependencias:

```bash
npm install
```

2. Gere os dados iniciais no banco:

```bash
npm run seed
```

3. Inicie o servidor em modo desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```text
http://localhost:3000
```

## Build e producao

Compile o projeto TypeScript:

```bash
npm run build
```

Inicie a API compilada:

```bash
npm start
```

## Scripts disponiveis

```bash
npm run dev
npm run build
npm start
npm run seed
npm run seed:prod
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
- `GET /api/beneficiarios?nome=maria`
- `POST /api/beneficiarios`

## Deploy no Render

A migracao para TypeScript mantem o deploy compativel com Render desde que o
servico execute o build antes do start.

Configuracao recomendada:

```text
Build Command: npm install && npm run build
Start Command: npm start
```

O `npm start` executa `node dist/index.js`, entao o diretorio `dist/` precisa
ser gerado durante o build. Os arquivos estaticos continuam em `public/` e o
banco SQLite continua em `db/database.db`.

## Objetivos de aprendizado demonstrados

- Estruturacao de API com `Express`
- Migracao de back-end JavaScript para `TypeScript`
- Tipagem de rotas, models e entidades de dominio
- Persistencia de dados com `SQLite`
- Separacao entre front-end, rotas, models, banco e migrations
- Organizacao de projeto full stack para portifolio

## Deploy

Deploy atual do projeto:

[https://doeja.onrender.com/](https://doeja.onrender.com/)
