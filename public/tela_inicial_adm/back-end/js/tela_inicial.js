function getInformacoes() {
    var containerInformacoes = document.getElementById('informacoes-principais-container');
    var htmlContent = '';

    $.ajax({
        url: '/quantidade-demandas',
        type: 'GET',
        dataType: 'json',
        success: function (informacoes) {
            informacoes.forEach(function (informacao) {
                var item = `<div class="card-informacoes">
                                <div class="card-icone">
                                    <i class="bi bi-box2"></i>
                                </div>
                                <div class="informacoes-card">
                                    <h3>Produção geral</h3>
                                    <h1>${informacao.quantidade} demanda(s)</h1>
                                </div>
                            </div>`;
                htmlContent += item;
            });

            $.ajax({
                url: '/quantidade-mensagens',
                type: 'GET',
                dataType: 'json',
                success: function (informacoes) {
                    informacoes.forEach(function (informacao) {
                        var item = `<div class="card-informacoes">
                                        <div class="card-icone">
                                            <i class="bi bi-chat"></i>
                                        </div>
                                        <div class="informacoes-card">
                                            <h3>Mensagens não lidas</h3>
                                            <h1>${informacao.mensagens_pendentes} mensagens</h1>
                                        </div>
                                    </div>`;
                        htmlContent += item; 
                    });

                    containerInformacoes.innerHTML = htmlContent;
                },
                error: function (xhr, status, error) {
                    console.error('Erro ao carregar mensagens:', error);
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar produção:', error);
        }
    });
}

$(document).ready(function () {
    getInformacoes();
});
