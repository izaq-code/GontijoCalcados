document.addEventListener("DOMContentLoaded", () => {
    const senhaInput = document.getElementById("senha");
    const barrasSenha = document.querySelectorAll(".bar");
    const forcaSenhaIndicator = document.getElementById("forcaSenhaIndicator");
    const forcaTexto = document.getElementById("forcaTexto");
    let senhaAtual = "";

    function verificarEAtualizarForca(senha) {
        const forca = verificarForcaSenha(senha);

        barrasSenha.forEach((bar) => {
            bar.classList.remove("fraco", "medio", "forte", "vazio");
        });

        if (senha === "") {
            forcaTexto.textContent = "Vazio";
            return;
        }

        if (forca === "fraco") {
            barrasSenha[0].classList.add("fraco");
            forcaTexto.textContent = "Fraco";
        } else if (forca === "medio") {
            barrasSenha[0].classList.add("fraco");
            barrasSenha[1].classList.add("medio");
            forcaTexto.textContent = "Médio";
        } else if (forca === "forte") {
            barrasSenha[0].classList.add("fraco");
            barrasSenha[1].classList.add("medio");
            barrasSenha[2].classList.add("forte");
            forcaTexto.textContent = "Forte";
        }
    }

    senhaInput.addEventListener("input", () => {
        senhaAtual = senhaInput.value.trim();
        verificarEAtualizarForca(senhaAtual);
    });

    senhaInput.addEventListener("focus", () => {
        verificarEAtualizarForca(senhaAtual);
        forcaSenhaIndicator.style.display = "flex";
    });

    senhaInput.addEventListener("blur", () => {
        if (senhaInput.value.trim() === "") {
            barrasSenha.forEach((bar) => {
                bar.classList.remove("fraco", "medio", "forte");
                bar.classList.add("vazio");
            });
            forcaTexto.textContent = "Vazio";
        } else {
            barrasSenha.forEach((bar) => {
                bar.classList.remove("vazio");
            });
        }
    });

    document.addEventListener("click", (event) => {
        const clickedElement = event.target;
        if (clickedElement.tagName.toLowerCase() !== "input" || clickedElement === senhaInput) {
            return;
        }
        forcaSenhaIndicator.style.display = "none";
    });

    function verificarForcaSenha(senha) {
        const comprimentoMinimo = 8;
        const possuiLetraMaiuscula = /[A-Z]/.test(senha);
        const possuiLetraMinuscula = /[a-z]/.test(senha);
        const possuiNumero = /[0-9]/.test(senha);
        const possuiCaracterEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(senha);

        if (
            senha.length >= comprimentoMinimo &&
            possuiLetraMaiuscula &&
            possuiLetraMinuscula &&
            possuiNumero &&
            possuiCaracterEspecial
        ) {
            return "forte";
        } else if (
            senha.length >= comprimentoMinimo &&
            (possuiLetraMaiuscula ||
                possuiLetraMinuscula ||
                possuiNumero ||
                possuiCaracterEspecial)
        ) {
            return "medio";
        } else {
            return "fraco";
        }
    }
});
