const express = require("express");
const cors = require("cors");
const path = require("path");

const doadoresRoutes = require("./routes/doadores");
const beneficiariosRoutes = require("./routes/beneficiarios");
const { initializeDatabase } = require("./migrations/init");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/doadores", doadoresRoutes);
app.use("/api/beneficiarios", beneficiariosRoutes);

app.get("/api/status", (req, res) => {
  res.json({ ok: true });
});

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

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
