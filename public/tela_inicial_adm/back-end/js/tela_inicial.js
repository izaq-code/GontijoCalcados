$(document).ready(function () {
    function fetchData(url) {
        return $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json'
        });
    }

    function getInformacoes() {
        var containerInformacoes = document.getElementById('informacoes-principais-container');
        var htmlContent = '';

        Promise.all([
            fetchData('/quantidade-demandas'),
            fetchData('/quantidade-mensagens'),
            fetchData('/quantidade-erros'),
            fetchData('/quantidade-funcionarios')
        ]).then(function (results) {
            var demandas = results[0];
            var mensagens = results[1];
            var erros = results[2];
            var funcionarios = results[3];

            demandas.forEach(function (informacao) {
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

            mensagens.forEach(function (informacao) {
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

            erros.forEach(function (informacao) {
                var item = `<div class="card-informacoes">
                                <div class="card-icone">
                                    <i class="bi bi-x-lg"></i>
                                </div>
                                <div class="informacoes-card">
                                    <h3>Erros em demandas</h3>
                                    <h1>${informacao.erros} erro(s)</h1>
                                </div>
                            </div>`;
                htmlContent += item; 
            });

            funcionarios.forEach(function (informacao) {
                var item = `<div class="card-informacoes">
                                <div class="card-icone">
                                    <i class="bi bi-briefcase"></i>
                                </div>
                                <div class="informacoes-card">
                                    <h3>Colaboradores ativos</h3>
                                    <h1>${informacao.funcionarios} funcionario(s)</h1>
                                </div>
                            </div>`;
                htmlContent += item; 
            });

            containerInformacoes.innerHTML = htmlContent;
            
        }).catch(function (error) {
            console.error('Erro ao carregar informações:', error);
        });
    }

    getInformacoes();
});
