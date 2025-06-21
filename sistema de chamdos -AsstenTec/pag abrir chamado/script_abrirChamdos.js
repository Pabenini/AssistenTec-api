document.getElementById("formChamado").addEventListener("submit", function(e) {
  e.preventDefault();

  const chamado = {
    id_cliente: document.getElementById("id_cliente").value,
    data_abertura: new Date().toISOString().split("T")[0],
    status: "Aberto",
    prioridade: document.getElementById("prioridade").value,
    tipo_problema: document.getElementById("tipo_problema").value,
    descricao_problema: document.getElementById("descricao_problema").value
  };

  if (chamado.prioridade && chamado.tipo_problema && chamado.descricao_problema) {
    console.log("Chamado criado:", chamado); // Simula envio
    document.getElementById("mensagemSucesso").textContent = "Chamado aberto com sucesso!";
    this.reset();
  } else {
    document.getElementById("mensagemSucesso").textContent = "Preencha todos os campos!";
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

  // Se for Hardware, adiciona os campos de equipamento
  if (chamado.tipo_problema === "Hardware") {
    chamado.tipo_equipamento = document.getElementById("tipo_equipamento").value;
    chamado.modelo_equipamento = document.getElementById("modelo_equipamento").value;

    if (!chamado.tipo_equipamento || !chamado.modelo_equipamento) {
      alert("Por favor, preencha os dados do equipamento.");
      return;
    }
  }

  console.log("Chamado criado:", chamado); // Aqui você pode substituir por POST para API
  document.getElementById("mensagemSucesso").textContent = "Chamado aberto com sucesso!";
  document.getElementById("mensagemSucesso").style.color = "green";
  this.reset();
  verificarProblema(); // Reseta visibilidade dos campos
});
