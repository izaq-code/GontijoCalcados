var idUsuarioLogado;

function carregarInformacoes() {
    $.ajax({
        url: '/mostrarUsuarioLogado',
        type: 'GET',
        dataType: 'json',
        success: function (usuario) {
            idUsuarioLogado = usuario.id;
            listarfuncionarios();
        },
        error: function () {
            console.error('Erro ao carregar informações do usuário logado');
        }
    });
}


function listarfuncionarios() {
    var container = $('#perfil');


    $.ajax({
        url: '/meu_perfil',
        type: 'POST',
        dataType: 'json',
        success: function (perfil) {
            console.log("Perfil retornado:", perfil); 

            container.empty();

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idUsuarioLogado;
            });

            console.log("Perfil do funcionário encontrado:", perfil_funcionario); 
            
            if (perfil_funcionario) {
                var item = $('<div>').addClass('produto');

                //exibi nome
                var nome = $('<h3>').addClass('perfil-nome').text(perfil_funcionario.nome);
                item.append(nome);
                
                //exibi email
                var email = $('<h3>').addClass('perfil-email').text(perfil_funcionario.email);
                item.append(email);

                //exibi imagem
                var imgContainer = $('<div>').addClass('img-container');
                var imagem = $('<img>').attr('src', perfil_funcionario.imagem);
                imgContainer.append(imagem);
                item.append(imgContainer);

                var funcao = $('<h2>').addClass('perfil-funcao').text('Função: ' + perfil_funcionario.funcao);
                item.append(funcao);
                //fim de exibição

                var entrada = $('<h2>').addClass('entrada').text('Entrada: ' + perfil_funcionario.ponto_inicial);
                item.append(entrada);

                var saida = $('<h2>').addClass('saida').text('saida: '  + perfil_funcionario.ponto_final);
                item.append(saida);
                
                var banco = $('<h2>').addClass('saida').text('Banco de Horas: '  + perfil_funcionario.banco);
                item.append(banco);

                // Adicionar botão Bater Ponto
                var baterPontoButton = $('<button>').addClass('bater-ponto-button').text('Bater Ponto');
                item.append(baterPontoButton);

                container.append(item);

                // Evento de clique para bater ponto
                baterPontoButton.on('click', function () {
                    $.ajax({
                        url: '/bater_ponto',
                        type: 'POST',
                        dataType: 'json',
                        data: { 
                            usuario_id: idFuncionario
                        },
                        success: function (response) {

                        },
                    });
                });
            } 
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Erro na requisição AJAX:", textStatus, errorThrown);
        }
    });
}

$(document).ready(function () {
    carregarInformacoes();
});
