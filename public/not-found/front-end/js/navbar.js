function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    const icon = document.querySelector('.icone');
    menuMobile.classList.toggle('open');
    icon.src = menuMobile.classList.contains('open') ? "../../../assets/imagens/fechar-menu.svg" : "../../../assets/imagens/menu.svg";
}

function Deslogar() {
    window.location = "../login";
}


