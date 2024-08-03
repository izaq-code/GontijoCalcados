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

    var container = $('#perfil');
    $.ajax({
        url: '/meu_perfil',
        type: 'GET',
        dataType: 'json',
        data: {
            id: idUsuarioLogado 
        },
        success: function (perfil) {
            console.log("Perfil retornado:", perfil);

            container.empty();

            
            if (!Array.isArray(perfil) || perfil.length === 0) {
                console.error("Nenhum perfil encontrado ou resposta não é um array:", perfil);
                return;
            }

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idUsuarioLogado;
            });

            console.log("Perfil do funcionário encontrado:", perfil_funcionario);

            if (perfil_funcionario) {
                var item = $('<div>').addClass('produto');

                var nome = $('<h3>').addClass('perfil-nome').text(perfil_funcionario.nome);
                item.append(nome);

                var email = $('<h3>').addClass('perfil-email').text(perfil_funcionario.email);
                item.append(email);

                var imgContainer = $('<div>').addClass('img-container');
                var imagem = $('<img>').attr('src', perfil_funcionario.imagem);
                imgContainer.append(imagem);
                item.append(imgContainer);

                var funcao = $('<h2>').addClass('perfil-funcao').text('Função: ' + perfil_funcionario.funcao);
                item.append(funcao);

                var entrada = $('<h2>').addClass('entrada').text('Entrada: ' + perfil_funcionario.ponto_inicial);
                item.append(entrada);


                var saida = $('<h2>').addClass('saida').text('Saída: ' + perfil_funcionario.ponto_final);
                item.append(saida);
 
                var banco = $('<h2>').addClass('banco').text('Banco de Horas: ' + perfil_funcionario.banco);
                item.append(banco);

                var baterPontoButton = $('<button>').addClass('bater-ponto-button').text('Bater Ponto');
                item.append(baterPontoButton);

                container.append(item);

            
                baterPontoButton.on('click', function () {
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
                
            } else {
                console.log("Funcionário não encontrado.");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Erro na requisição AJAX:", textStatus, errorThrown);
        }
    });
}

$(document).ready(function () {
    carregarInformacoes(listarfuncionarios);
});
