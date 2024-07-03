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
                var item = $('<div>').addClass('produto');

                var nome = $('<h3>').addClass('funcionarios-nome').text(funcionario.nome);
                item.append(nome);

                var imgContainer = $('<div>').addClass('img-container');
                var imagem = $('<img>').attr('src', funcionario.imagem); 
                imgContainer.append(imagem);
                item.append(imgContainer);

                // Div para ver perfil do usuário
                var divPerfil = $('<div>').addClass('perfil-container');
                var botaoPerfil = $('<input>').addClass('perfil').attr('type', 'button').val('Ver informações').data('id', funcionario.id);
                divPerfil.append(botaoPerfil);
                item.append(divPerfil);

                container.append(item);

                //evento para ver o perfil do usuário
                botaoPerfil.on('click', function() {
                    var idFuncionario = $(this).data('id');
                    window.location.href = '../../../perfil_user/front-end/HTML/perfil.html?id=' + idFuncionario;
                });
            });
        }
    });
}

$(document).ready(function () {
    listarfuncionarios();
});
