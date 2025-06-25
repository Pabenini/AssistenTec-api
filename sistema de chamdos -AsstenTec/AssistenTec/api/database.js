const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./chamados.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS chamados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente TEXT,
      data_abertura TEXT,
      status TEXT,
      prioridade TEXT,
      tipo_problema TEXT,
      descricao_problema TEXT,
      tipo_equipamento TEXT,
      modelo_equipamento TEXT,
      tecnico TEXT
    )
  `);
});

module.exports = db;
