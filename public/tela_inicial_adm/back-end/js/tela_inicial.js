function getInformacoes() {
    var container = document.getElementById('informacoes-principais-container');

    $.ajax({
        url: '/quantidade-demandas',
        type: 'GET',
        dataType: 'json',
        success: function (informacoes) {
            container.innerHTML = '';

            informacoes.forEach(function (informacao) {
                var item = `<div class="card-informacoes">
                                <div class="card-icone">
                                    <i class="bi bi-box2"></i>
                                </div>
                                <div class="informacoes-card">
                                    <h3>Produção geral</h3>
                                    <h1>${informacao.quantidade} demanda(s)</h1>
                                </div>
                            </div>`
                ;
                container.innerHTML += item;
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    });
}

$(document).ready(function () {
    getInformacoes();
});

