const chamados = [
  {
    id_chamado: 1,
    id_cliente: "Cliente A",
    data_abertura: "2025-06-15",
    prioridade: "Alta",
    status: "Aberto",
    tecnico: "-",
    tipo_problema: "Hardware",
    descricao_problema: "Impressora não liga"
  },
  {
    id_chamado: 2,
    id_cliente: "Cliente B",
    data_abertura: "2025-06-16",
    prioridade: "Média",
    status: "Em andamento",
    tecnico: "Técnico Ana",
    tipo_problema: "Software",
    descricao_problema: "Erro ao abrir sistema"
  },
  {
    id_chamado: 3,
    id_cliente: "Cliente C",
    data_abertura: "2025-06-14",
    prioridade: "Baixa",
    status: "Encerrado",
    tecnico: "Técnico Bruno",
    tipo_problema: "Rede",
    descricao_problema: "Instabilidade de conexão"
  }
];

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
      <td>${chamado.id_chamado}</td>
      <td>${chamado.id_cliente}</td>
      <td>${chamado.data_abertura}</td>
      <td>${chamado.prioridade}</td>
      <td><span class="${statusClass}">${chamado.status}</span></td>
      <td>${chamado.tecnico}</td>
      <td>${chamado.tipo_problema}</td>
      <td>${chamado.descricao_problema}</td>
      <td>
        <button onclick="abrirModal(${chamado.id_chamado})">Atribuir Técnico</button>
        <button class="encerrar" onclick="encerrarChamado(${chamado.id_chamado})">Encerrar</button>
        <button class="cinza" onclick="abrirModalFotos(${chamado.id_chamado})">Anexar Fotos</button>
        <button class="verde" onclick="gerarRAT(${chamado.id_chamado})">RAT</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Modal de Atribuição
function abrirModal(id) {
  fecharTodosOsModais();
  const chamado = chamados.find(c => c.id_chamado === id);
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modalIdChamado").textContent = chamado.id_chamado;
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
  const id = parseInt(document.getElementById("modalIdChamado").textContent);
  const tecnico = document.getElementById("modalTecnico").value;
  const msg = document.getElementById("modalMensagem");

  if (!tecnico) {
    msg.textContent = "Selecione um técnico.";
    msg.style.color = "red";
    return;
  }

  const chamado = chamados.find(c => c.id_chamado === id);
  chamado.tecnico = tecnico;
  chamado.status = "Em andamento";

  msg.textContent = `Chamado ${id} atribuído ao ${tecnico}!`;
  msg.style.color = "green";

  renderTabela(campoPesquisa.value);
  setTimeout(fecharModal, 1500);
}

function encerrarChamado(id) {
  const chamado = chamados.find(c => c.id_chamado === id);
  if (chamado) {
    chamado.status = "Encerrado";
    alert(`Chamado ${id} encerrado com sucesso.`);
    renderTabela(campoPesquisa.value);
  }
}

function anexarFotos() {
  alert("Fotos anexadas com sucesso (simulado).");
  fecharModalFotos();
}

function gerarRAT(id) {
  alert(`Relatório do Chamado ${id} gerado com sucesso (simulado).`);
}

// Filtro de busca
campoPesquisa.addEventListener("input", () => {
  renderTabela(campoPesquisa.value);
});

// Inicializar
renderTabela();
