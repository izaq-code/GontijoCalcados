function checkWindowWidth() {
    let reloadDone495 = false; // Variável para controlar se o reload para largura < 495 já foi feito
    let reloadDone600 = false; // Variável para controlar se o reload para largura > 600 e <= 610 já foi feito

    let resizeTimer; // Timer para controlar o atraso no resize

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer); // Limpa o timer anterior, se houver

        resizeTimer = setTimeout(function() {
            console.log('Width:', window.innerWidth); // Log para depuração

            if (window.innerWidth < 495 && !reloadDone495) {
                reloadDone495 = true; // Marca o reload para largura < 495 como feito
                location.reload(); // Reload da página
            }

            if (window.innerWidth > 600 && window.innerWidth <= 610 && !reloadDone600) {
                reloadDone600 = true; // Marca o reload para largura > 600 e <= 610 como feito
                location.reload(); // Reload da página
            }

            if (window.innerWidth > 730 && window.innerWidth <= 740 && !reloadDone600) {
                reloadDone600 = true; // Marca o reload para largura > 600 e <= 610 como feito
                location.reload(); // Reload da página
            }

            if (window.innerWidth > 1910 && window.innerWidth <= 2000 && !reloadDone600) {
                reloadDone600 = true; // Marca o reload para largura > 600 e <= 610 como feito
                location.reload(); // Reload da página
            }
        }, ); // Atraso de 200ms antes de verificar e executar o reload
    });
}

checkWindowWidth();
