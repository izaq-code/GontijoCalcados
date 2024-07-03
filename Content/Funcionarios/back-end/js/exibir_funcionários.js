function listarfuncionarios() {
    var container = $('#exibir_funcionarios');

    $.ajax({
        url: '../../../Funcionarios/back-end/php/exibir_funcionários.php',
        type: 'POST',
        dataType: 'json',
        success: function (funcionarios) {
            container.empty();
            console.log(funcionarios);

            funcionarios.forEach(function (funcionario) {
                var item = $('<div>').addClass('usuario-card');

                var imgContainer = $('<div>').addClass('usuario-imagem');
                var imagem = $('<img>').attr('src', funcionario.imagem);
                imgContainer.append(imagem);
                item.append(imgContainer);

                var nome = $('<h3>').addClass('funcionarios-nome').text(funcionario.nome);
                item.append(nome);

                // Div para ver perfil do usuário
                var divPerfil = $('<div>').addClass('perfil-container');
                var botaoPerfil = $('<input>').addClass('perfil').attr('type', 'button').val('Ver informações ↪').data('id', funcionario.id);
                divPerfil.append(botaoPerfil);
                item.append(divPerfil);

                container.append(item);

        
                botaoPerfil.on('click', function () {
                    var idFuncionario = $(this).data('id');
                    localStorage.setItem('idFuncionario', idFuncionario);
                    window.location.href = '../../../perfil_user/front-end/HTML/perfil.html';
                });
            });
        }
    });
}

$(document).ready(function () {
    listarfuncionarios();
});
