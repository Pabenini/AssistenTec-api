let chamados = [];

function carregarChamados() {
  fetch("http://localhost:3000/api/chamados")
    .then(res => res.json())
    .then(data => {
      console.log("Chamados da API:", data); // Veja se tem `id`
      chamados = data;
      renderTabela();
    });
}


function getStatusClass(status) {
  switch (status.toLowerCase()) {
    case "aberto":
      return "status-aberto";
    case "em andamento":
      return "status-andamento";
    case "encerrado":
      return "status-encerrado";
    default:
      return "";
  }
}

const tbody = document.getElementById("tabelaChamados");
const campoPesquisa = document.getElementById("filtroInput");

function renderTabela(filtro = "") {
  tbody.innerHTML = "";
  const chamadosFiltrados = chamados.filter(c => {
    return (
      c.id_cliente.toLowerCase().includes(filtro.toLowerCase()) ||
      c.tipo_problema.toLowerCase().includes(filtro.toLowerCase()) ||
      c.tecnico.toLowerCase().includes(filtro.toLowerCase())
    );
  });

  chamadosFiltrados.forEach(chamado => {
    const row = document.createElement("tr");
    const statusClass = getStatusClass(chamado.status);

    row.innerHTML = `
      <td>${chamado.id || chamado.id_chamado}</td>
      <td>${chamado.id_cliente}</td>
      <td>${chamado.data_abertura}</td>
      <td>${chamado.prioridade}</td>
      <td><span class="${statusClass}">${chamado.status}</span></td>
      <td>${chamado.tecnico}</td>
      <td>${chamado.tipo_problema}</td>
      <td>${chamado.descricao_problema}</td>
      <td>
        <button onclick="abrirModal(${chamado.id})">Atribuir Técnico</button>
        <button class="encerrar" onclick="encerrarChamado(${chamado.id})">Encerrar</button>
        <button class="cinza" onclick="abrirModalFotos(${chamado.id})">Anexar Fotos</button>
        <button class="verde" onclick="gerarRAT(${chamado.id})">RAT</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Modal de Atribuição
function abrirModal(id) {
  fecharTodosOsModais();
  const chamado = chamados.find(c => c.id === id);
  if (!chamado) {
    alert("Chamado não encontrado.");
    return;
  }

  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalIdChamado").textContent = chamado.id || chamado.id_chamado;
  document.getElementById("modalTipo").textContent = chamado.tipo_problema;
  document.getElementById("modalDescricao").textContent = chamado.descricao_problema;
  document.getElementById("modalTecnico").value = "";
  document.getElementById("modalMensagem").textContent = "";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
}

// Modal de Fotos
function abrirModalFotos(id) {
  fecharTodosOsModais();
  document.getElementById("modalFotos").style.display = "flex";
  document.getElementById("modalIdChamadoFotos").textContent = id;
}

function fecharModalFotos() {
  document.getElementById("modalFotos").style.display = "none";
}

function fecharTodosOsModais() {
  fecharModal();
  fecharModalFotos();
}

function confirmarAtribuicao() {
  const idText = document.getElementById("modalIdChamado").textContent.trim();
  const id = parseInt(idText);

  const tecnico = document.getElementById("modalTecnico").value;
  const msg = document.getElementById("modalMensagem");

  if (!tecnico) {
    msg.textContent = "Selecione um técnico.";
    msg.style.color = "red";
    return;
  }

  if (isNaN(id)) {
    msg.textContent = "ID do chamado inválido.";
    msg.style.color = "red";
    return;
  }

  fetch(`http://localhost:3000/api/chamados/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tecnico: tecnico,
      status: "Em andamento"
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar chamado");
      msg.textContent = `Chamado ${id} atribuído ao ${tecnico}!`;
      msg.style.color = "green";
      setTimeout(() => {
        fecharModal();
        carregarChamados(); // Recarrega a lista da API
      }, 1000);
    })
    .catch(err => {
      msg.textContent = "Erro ao salvar.";
      msg.style.color = "red";
      console.error(err);
    });
}



function encerrarChamado(id) {
  const chamado = chamados.find(c => c.id === id);
  if (chamado) {
    fetch(`http://localhost:3000/api/chamados/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Encerrado",
        tecnico: chamado.tecnico || "" // mantém o técnico, se já tiver
      })
    })
    .then(() => {
      alert(`Chamado ${id} encerrado com sucesso.`);
      carregarChamados(); // Atualiza a lista
    })
    .catch(err => {
      alert("Erro ao encerrar chamado.");
      console.error(err);
    });
  }
}

function anexarFotos() {
  alert("Fotos anexadas com sucesso (simulado).");
  fecharModalFotos();
}

function gerarRAT(id) {
  const chamado = chamados.find(c => c.id == id);

  if (!chamado) {
    alert("Chamado não encontrado.");
    return;
  }

  const ratHTML = `
    <html>
    <head><title>RAT Chamado ${id}</title></head>
    <body>
      <h1>Relatório de Atendimento Técnico - Chamado ${id}</h1>
      <p><strong>Cliente:</strong> ${chamado.id_cliente}</p>
      <p><strong>Data de Abertura:</strong> ${chamado.data_abertura}</p>
      <p><strong>Prioridade:</strong> ${chamado.prioridade}</p>
      <p><strong>Status:</strong> ${chamado.status}</p>
      <p><strong>Técnico:</strong> ${chamado.tecnico || "Não atribuído"}</p>
      <p><strong>Tipo de Problema:</strong> ${chamado.tipo_problema}</p>
      <p><strong>Descrição:</strong> ${chamado.descricao_problema}</p>
    </body>
    </html>
  `;

  const novaJanela = window.open("", "_blank");
  novaJanela.document.write(ratHTML);
  novaJanela.document.close();
}


// Filtro de busca
campoPesquisa.addEventListener("input", () => {
  renderTabela(campoPesquisa.value);
});

// Inicializar
carregarChamados();
