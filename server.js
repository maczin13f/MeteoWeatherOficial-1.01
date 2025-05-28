const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fetch = require('node-fetch');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Conectado ao MongoDB!"))
.catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

const BuscaSchema = new mongoose.Schema({
  user_id: String,
  cidade: String,
  codigo_iso: String,
  estado: String,
  temperatura: String,
  data: String,
  hora: String,
});

const Busca = mongoose.model("Busca", BuscaSchema);



app.post("/save-search", async (req, res) => {
  try {
    const busca = new Busca(req.body);
    await busca.save();
    res.status(201).json({ message: "Busca salva com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao salvar busca:", err);
    res.status(500).json({ error: "Erro ao salvar busca" });
  }
});

app.get("/buscas", async (req, res) => {
  try {
    const buscas = await Busca.find().sort({ _id: -1 });
    res.json(buscas);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados" });
  }
});

app.delete("/apagar-busca/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Busca.findByIdAndDelete(id);
    res.status(200).json({ message: "Busca apagada com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao apagar busca:", err);
    res.status(500).json({ error: "Erro ao apagar busca" });
  }
});

app.delete("/apagar-buscas/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    await Busca.deleteMany({ user_id });
    res.status(200).json({ message: "Buscas apagadas com sucesso!" });
  } catch (err) {
    console.error("❌ Erro ao apagar buscas:", err);
    res.status(500).json({ error: "Erro ao apagar buscas" });
  }
});

// servidor.js



app.get('/inmet-alertas', async (req, res) => {
  try {
    const response = await fetch('https://apiprevmet3.inmet.gov.br/avisos/ativos');

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}`);
    }

    const json = await response.json();
    res.json(json);
  } catch (error) {
    console.error("❌ Erro ao buscar alertas do INMET (JSON):", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

