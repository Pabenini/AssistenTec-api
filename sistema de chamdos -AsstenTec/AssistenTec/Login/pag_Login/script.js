document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("mensagemErro");

    // Exemplo simples (ideal: usar autenticação real)
    if (usuario === "cliente" && senha === "123") {
        window.location.href = "../../chamadosCliente/index_chamdosc.html";
    } else if (usuario === "tecnico" && senha === "123") {
        window.location.href = "../../chamados/index_chamdosadm.html";
    } else {
        erro.textContent = "Usuário ou senha inválidos!";
    }
});
