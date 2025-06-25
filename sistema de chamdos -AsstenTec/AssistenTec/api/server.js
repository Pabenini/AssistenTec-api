const express = require("express");
const cors = require("cors");
const chamadosRoutes = require("./routes/chamados");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chamados", chamadosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
