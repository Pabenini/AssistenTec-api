document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const erro = document.getElementById("mensagemErro");

    // Exemplo simples (ideal: usar autenticação real)
    if (usuario === "cliente" && senha === "123") {
        window.location.href = "cliente-dashboard.html";
    } else if (usuario === "tecnico" && senha === "123") {
        window.location.href = "tecnico-dashboard.html";
    } else {
        erro.textContent = "Usuário ou senha inválidos!";
    }
});
