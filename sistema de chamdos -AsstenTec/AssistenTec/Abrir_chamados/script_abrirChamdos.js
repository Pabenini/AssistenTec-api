document.getElementById("formChamado").addEventListener("submit", function (e) {
  e.preventDefault();

  const chamado = {
    id_cliente: document.getElementById("id_cliente").value,
    data_abertura: new Date().toISOString().split("T")[0],
    status: "Aberto",
    prioridade: document.getElementById("prioridade").value,
    tipo_problema: document.getElementById("tipo_problema").value,
    descricao_problema: document.getElementById("descricao_problema").value
  };

  // Se for problema de hardware, adiciona os campos extras
  if (chamado.tipo_problema === "Hardware") {
    chamado.tipo_equipamento = document.getElementById("tipo_equipamento").value;
    chamado.modelo_equipamento = document.getElementById("modelo_equipamento").value;

    if (!chamado.tipo_equipamento || !chamado.modelo_equipamento) {
      alert("Por favor, preencha os dados do equipamento.");
      return;
    }
  }

  // Validação simples
  if (chamado.prioridade && chamado.tipo_problema && chamado.descricao_problema) {
    fetch("http://localhost:3000/api/chamados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chamado)
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById("mensagemSucesso").textContent = "Chamado aberto com sucesso!";
        document.getElementById("mensagemSucesso").style.color = "green";
        document.getElementById("formChamado").reset();
        verificarProblema(); // Reseta os campos de hardware
      })
      .catch(err => {
        console.error(err);
        document.getElementById("mensagemSucesso").textContent = "Erro ao abrir chamado.";
        document.getElementById("mensagemSucesso").style.color = "red";
      });
  } else {
    document.getElementById("mensagemSucesso").textContent = "Preencha todos os campos obrigatórios!";
    document.getElementById("mensagemSucesso").style.color = "red";
  }
});
function verificarProblema() {
  const tipoProblema = document.getElementById("tipo_problema").value;
  const camposHardware = document.getElementById("camposHardware");

  if (tipoProblema === "Hardware") {
    camposHardware.style.display = "block";
  } else {
    camposHardware.style.display = "none";
  }
}
