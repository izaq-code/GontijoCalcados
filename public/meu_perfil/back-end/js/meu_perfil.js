var idUsuarioLogado;

function carregarInformacoes(callback) {
    $.ajax({
        url: '/mostrarUsuarioLogado',
        type: 'GET',
        dataType: 'json',
        success: function (usuario) {
            if (usuario && usuario.id) {
                idUsuarioLogado = usuario.id;
                if (callback && typeof callback === 'function') {
                    callback(); 
                }
                console.log(usuario);
            } else {
                console.error('Dados do usuário logado não estão no formato esperado.');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao carregar informações do usuário logado:', textStatus, errorThrown);
        }
    });
}

function listarfuncionarios() {
    console.log("ID do Usuário Logado:", idUsuarioLogado);
    if (typeof idUsuarioLogado === 'undefined') {
        console.error('ID do usuário logado não está definido.');
        return;
    }

    var container = document.getElementById('perfil');
    $.ajax({
        url: '/meu_perfil',
        type: 'GET',
        dataType: 'json',
        data: {
            id: idUsuarioLogado 
        },
        success: function (perfil) {
            console.log("Perfil retornado:", perfil);

            container.innerHTML = '';

            if (!Array.isArray(perfil) || perfil.length === 0) {
                console.error("Nenhum perfil encontrado ou resposta não é um array:", perfil);
                return;
            }

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idUsuarioLogado;
            });

            console.log("Perfil do funcionário encontrado:", perfil_funcionario);

            if (perfil_funcionario) {
                var item = `
                    <div class="perfil-usuario">
                        <div id="container-informacoes-gerais">
                            <div id="container-informacoes-esquerda">
                                <img src="${perfil_funcionario.imagem}" alt="Imagem do funcionário">
                                <div id="informacoes-usuario">
                                    <h2 class="perfil-nome">${perfil_funcionario.nome}</h2>
                                    <h4 class="perfil-email">${perfil_funcionario.email}</h4>
                                    <h4 class="perfil-cpf">${perfil_funcionario.cpf}</h4>
                                </div>
                            </div>
                            <div id="container-informacoes-direita">
                                <h3 class="perfil-funcao">Função</h3>
                                <h4>${perfil_funcionario.funcao}</h4>
                            </div>
                        </div>
                        <div id="container-ponto">
                            <div class="card-ponto">
                                <h3 class="entrada">Entrada</h3> 
                                <h1 class="conteudo-ponto">${perfil_funcionario.ponto_inicial}</h1>
                            </div>
                            <div class="card-ponto">
                                <h3 class="saida">Saída</h3>
                                <h1 class="conteudo-ponto">${perfil_funcionario.ponto_final}</h1>
                            </div>
                             <div class="card-ponto">
                                <h3 class="saida">Horas Trabalhadas</h3>
                                <h1 class="conteudo-ponto">${perfil_funcionario.horas_trabalhadas}</h1>
                            </div>
                            <div class="card-ponto">
                                <h3 class="banco">Banco de Horas</h3>
                                <h1 class="conteudo-ponto">${perfil_funcionario.banco}</h1>
                            </div>
                        </div>
                        <button class="bater-ponto-button">Bater Ponto</button>
                        <button class="historico_de_pontos">Histórico de Pontos</button>
                    </div>
                `;
                container.innerHTML = item;

                var baterPontoButton = container.querySelector('.bater-ponto-button');
                baterPontoButton.addEventListener('click', function () {
                    $.ajax({
                        url: '/bater_ponto',
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            usuario_id: idUsuarioLogado
                        },
                        success: function (response) {
                            console.log("Ponto batido com sucesso:", response);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.error("Erro ao bater ponto:", textStatus, errorThrown);
                        }
                    });
                });

                
                var botao = container.querySelector('.historico_de_pontos');
                botao.addEventListener('click', function () {
                    window.location.href = '../../front-end/HTML/historico_de_pontos.html?usuario_id=' + idUsuarioLogado;
                });
                
            } else {
                console.log("Funcionário não encontrado.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Erro na requisição AJAX:", textStatus, errorThrown);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    carregarInformacoes(listarfuncionarios);
});
