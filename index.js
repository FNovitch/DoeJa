// Arquivo principal do servidor Express
const express = require("express");
const cors = require("cors");
const path = require("path");

// Importa rotas e inicialização do banco
const doadoresRoutes = require("./routes/doadores");
const beneficiariosRoutes = require("./routes/beneficiarios");
const { inicializarBancoDeDados } = require("./migrations/init");

const app = express(); // Instância do app Express
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas principais da API
app.use("/api/doadores", doadoresRoutes);
app.use("/api/beneficiarios", beneficiariosRoutes);

// Endpoint de status
app.get("/api/status", (req, res) => {
  res.json({ ok: true });
});

// Fallback: envia a landing page para qualquer rota não mapeada
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicializa o banco de dados e inicia o servidor
async function startServer() {
  try {
    await inicializarBancoDeDados();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error.message);
    process.exit(1);
  }
}
startServer();
