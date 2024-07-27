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
    var container = $('#exibir_funcionarios');

    $.ajax({
        url: '/funcionarios',
        type: 'GET',
        dataType: 'json',
        success: function (funcionarios) {
            container.empty();

            funcionarios.forEach(function (funcionario) {
                if (funcionario.id !== idUsuarioLogado) {
                    var item = $('<div>').addClass('usuario-card');

                    var imgContainer = $('<div>').addClass('usuario-imagem');
                    var imagem = $('<img>').attr('src', funcionario.profile_picture);
                    imgContainer.append(imagem);
                    item.append(imgContainer);

                    var nome = $('<h3>').addClass('funcionarios-nome').text(funcionario.name);
                    item.append(nome);

                    var divPerfil = $('<div>').addClass('perfil-container');
                    var botaoPerfil = $('<input>').addClass('verinformacoes').attr('type', 'button').val('Ver informações ↪').data('id', funcionario.id);
                    divPerfil.append(botaoPerfil);
                    item.append(divPerfil);

                    container.append(item);

                    botaoPerfil.on('click', function () {
                        var idFuncionario = $(this).data('id');
                        localStorage.setItem('idFuncionario', idFuncionario);
                        window.location.href = '../../../perfil_user/front-end/HTML/perfil.html';
                    });
                }
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar funcionários:', error);
        }
    });
}

$(document).ready(function () {
    carregarInformacoes();
});
