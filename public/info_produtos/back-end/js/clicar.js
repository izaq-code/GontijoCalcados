$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/calcados',
        success: function (data) {
            console.log(data);
            if (data && data.length > 0) {
                exibirImagens(data);
            } else {
                alert('Nenhuma imagem encontrada.');
            }
        },
        error: function (err) {
            console.error('Erro na requisição AJAX:', err);
            alert('Erro ao buscar dados');
        }
    });
});

$(document).on('click', 'img', function () {
    var id = $(this).data('id');
    localStorage.setItem('id', id);
    window.location.href = 'http://localhost:3000/info_produtos/front-end/html/show.html';
});

function exibirImagens(data) {
    console.log('Exibindo imagens');

    var imgContainer = $('#imgContainer');

    imgContainer.empty();

    data.forEach(function (item) {
        var card = $('<div>').addClass('card-calcados').attr('data-id', item['id']);
        var img = $('<img>').attr('src', item['img']).attr('data-id', item['id']);
        var nome = $('<h3>').addClass('nome-calcado').text(item['nome']);

        card.append(img).append(nome);
        imgContainer.append(card);
    });
}
