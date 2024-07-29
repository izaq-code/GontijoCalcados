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
});
