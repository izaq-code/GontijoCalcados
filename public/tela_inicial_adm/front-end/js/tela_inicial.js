function listarCalcados() {
    var container = document.getElementById('exibir_calcados');
    
    $.ajax({
        url: '/calcados', 
        type: 'GET',
        dataType: 'json',
        success: function (calcados) {
            container.innerHTML = '';
            
            calcados.forEach(function (item) {
                var itemHtml = `<div class="card-calcados" data-id="${item['id']}">
                                    <img src="${item['img']}">
                                    <h3 class="nome-calcado">${item['nome']}</h3>
                                </div>`;
                container.innerHTML += itemHtml;
            });

       
              let items = container.innerHTML;
              container.innerHTML += items;
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar calcados:', error);
        }
    });
}

$(document).on('click', '.card-calcados', function () {
    var idImagem = $(this).data('id');
    localStorage.setItem('id', idImagem);
    window.location.href = 'http://localhost:3000/info_produtos/front-end/html/show.html';
});

$(document).ready(function () {
    listarCalcados();

    let container = $('#exibir_calcados');
    let scrollAmount = 200; // Ajuste conforme necessário

    $('#next').on('click', function () {
        container.animate({ scrollLeft: '+=' + scrollAmount + 'px' }, 'fast');
    });

    $('#prev').on('click', function () {
        container.animate({ scrollLeft: '-=' + scrollAmount + 'px' }, 'fast');
    });

    let isDragging = false;
    let startX;
    let scrollLeft;

    container.on('mousedown touchstart', function (e) {
        isDragging = true;
        startX = e.pageX || e.originalEvent.touches[0].pageX;
        scrollLeft = container.scrollLeft();
    });

    container.on('mousemove touchmove', function (e) {
        if (!isDragging) return;
        const x = e.pageX || e.originalEvent.touches[0].pageX;
        const walk = (x - startX);
        container.scrollLeft(scrollLeft - walk);
    });

    container.on('mouseup touchend', function () {
        isDragging = false;
    });

    setInterval(function () {
        let containerWidth = container.width();
        let scrollLeft = container.scrollLeft();
        let maxScrollLeft = container[0].scrollWidth - containerWidth;
        
        if (scrollLeft >= maxScrollLeft) {
            container.scrollLeft(0); 
        } else {
            container.animate({ scrollLeft: '+=' + scrollAmount + 'px' }, 'fast');
        }
    }, 10000); 
});
