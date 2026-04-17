const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db/database");
const doadoresRoutes = require("./routes/doadores");
const beneficiariosRoutes = require("./routes/beneficiarios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Rotas principais da API
app.use("/api/doadores", doadoresRoutes);
app.use("/api/beneficiarios", beneficiariosRoutes);

// Rota de status para checagem rápida do servidor
app.get("/api/status", (req, res) => {
  res.json({ ok: true });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicializa o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
