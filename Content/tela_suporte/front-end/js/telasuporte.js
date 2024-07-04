function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    const icon = document.querySelector('.icone');
    menuMobile.classList.toggle('open');
    icon.src = menuMobile.classList.contains('open') ? "../../../assets/imagens/fechar-menu.svg" : "../../../assets/imagens/menu.svg";
}

function Deslogar() {
    window.location = "../login";
}

document.getElementById('submit').addEventListener('click', () => {
    const rating = document.querySelector('input[name="rating"]:checked');
    if (rating) {
        alert(`Você avaliou com ${rating.value} estrela(s)!`);
    } else {
        alert('Por favor, selecione uma avaliação.');
    }
});
