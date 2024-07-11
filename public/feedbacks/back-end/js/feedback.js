function listarFeedbacks() {
    var container = document.getElementById('exibir_feedbacks');

    $.ajax({
        url: '/feedbacks', 
        type: 'GET',
        dataType: 'json',
        success: function (feedbacks) {
            container.innerHTML = '';

            feedbacks.forEach(function (feedback) {
                var item = '<div class="usuario-card">' +
                               '<h3 class="funcionarios-nome">' + feedback.name + '</h3>' +
                               '<p class="avaliacao">Avaliação: ' + feedback.avaliacao + '</p>' +
                               '<p class="comentario">Comentário: ' + feedback.comentario + '</p>' +
                           '</div>';

                container.innerHTML += item;
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    });
}

$(document).ready(function () {
    listarFeedbacks();
});
