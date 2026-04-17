// Arquivo principal do servidor Express
const express = require("express");
const cors = require("cors");
const path = require("path");

const doadoresRoutes = require("./routes/doadores");
const beneficiariosRoutes = require("./routes/beneficiarios");
const { initializeDatabase } = require("./migrations/init");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir requisições externas, interpretar JSON e servir arquivos estáticos
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API para gerenciar doadores e beneficiários
app.use("/api/doadores", doadoresRoutes);
app.use("/api/beneficiarios", beneficiariosRoutes);

// Rota para verificar se o servidor está funcionando
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
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error.message);
    process.exit(1);
  }
}

startServer();
