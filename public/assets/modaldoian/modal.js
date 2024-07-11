document.getElementById("btnMostrarModal").addEventListener("click", function() {
    mostrarModal();
});

function mostrarModal() {
    const modal = document.getElementById("modal");

    const conteudoModal = `
        <div class="conteudo-modal">
            <span id="x" class="x">&times;</span>
            <i class="far fa-check-circle"></i>
            <h2>Cadastro Concluído</h2>
            <p>O cadastro da quadra foi concluído com sucesso!</p>
            <button id="fechar-modal" class="btn-fechar">Fechar</button>
        </div>
    `;

    modal.innerHTML = conteudoModal;
    modal.style.display = "block";

    const btnFechar = document.getElementById("fechar-modal");
    btnFechar.addEventListener("click", function () {
        modal.style.display = "none";
        window.location.href = "";
    });

    const x = document.getElementById("x");
    x.addEventListener("click", function () {
        modal.style.display = "none";
        window.location.href = "";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
            window.location.href = "";
        }
    });
}
