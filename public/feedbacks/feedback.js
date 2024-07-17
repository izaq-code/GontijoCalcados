function listarFeedbacks() {
    var container = document.getElementById('exibir_feedbacks');
    
    $.ajax({
        url: '/feedbacks', 
        type: 'GET',
        dataType: 'json',
        success: function (feedbacks) {
            container.innerHTML = '';
            
            feedbacks.forEach(function (feedback) {
                var estrelas = setEstrelas(feedback.avaliacao);
                var avaliacaoFormatada = feedback.avaliacao.toFixed(1).replace('.', ',');

                var item =  '<div class="usuario-card">' +
                                '<h3 class="nome-feedback">' + feedback.name + '</h3>' +
                                '<div class="container-avaliacao">' +
                                    '<p>' + avaliacaoFormatada + '</p>' +
                                    estrelas +
                                '</div>' +
                                '<p class="comentario">' + feedback.comentario + '</p>' +
                            '</div>';
                
                container.innerHTML += item;
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    });
}

function setEstrelas(avaliacao) {
    var estrelas = '';
    for (var i = 5; i > 0; i--) {
        if (i <= avaliacao) {
            estrelas += '<label class="estrela-cheia"></label>';
        } else {
            estrelas += '<label></label>'; 
        }
    }
    return '<div class="avaliacao">' + estrelas + '</div>';
}

$(document).ready(function () {
    listarFeedbacks();
});
