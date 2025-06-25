const express = require("express");
const router = express.Router();
const db = require("../database");

// CREATE
router.post("/", (req, res) => {
  const {
    id_cliente, data_abertura, status, prioridade,
    tipo_problema, descricao_problema, tipo_equipamento,
    modelo_equipamento, tecnico
  } = req.body;

  db.run(`
    INSERT INTO chamados (
      id_cliente, data_abertura, status, prioridade,
      tipo_problema, descricao_problema, tipo_equipamento,
      modelo_equipamento, tecnico
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    id_cliente, data_abertura, status, prioridade,
    tipo_problema, descricao_problema, tipo_equipamento,
    modelo_equipamento, tecnico
  ], function (err) {
    if (err) return res.status(500).send(err.message);
    res.status(201).send({ id: this.lastID });
  });
});

// READ
router.get("/", (req, res) => {
  db.all("SELECT * FROM chamados", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});

// UPDATE (atribuir técnico ou mudar status)
router.put("/:id", (req, res) => {
  const { tecnico, status } = req.body;
  db.run("UPDATE chamados SET tecnico = ?, status = ? WHERE id = ?",
    [tecnico, status, req.params.id],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.sendStatus(200);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  db.run("DELETE FROM chamados WHERE id = ?", req.params.id, function (err) {
    if (err) return res.status(500).send(err.message);
    res.sendStatus(200);
  });
});

module.exports = router;
