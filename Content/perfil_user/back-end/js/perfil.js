function listarfuncionarios() {
    var container = $('#perfil');

    var idFuncionario = localStorage.getItem('idFuncionario');

    $.ajax({
        url: '../../../perfil_user/back-end/php/perfil.php',
        type: 'POST',
        dataType: 'json',
        success: function (perfil) {
            container.empty();

            console.log(perfil);

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idFuncionario;
            });

            if (perfil_funcionario) {
                var item = $('<div>').addClass('produto');

                var nome = $('<h3>').addClass('perfil-nome').text(perfil_funcionario.nome);
                item.append(nome);

                var email = $('<h3>').addClass('perfil-email').text(perfil_funcionario.email);
                item.append(email);

                var telefone = $('<h3>').addClass('perfil-telefone').text(perfil_funcionario.telefone);
                item.append(telefone);

                var imgContainer = $('<div>').addClass('img-container');
                var imagem = $('<img>').attr('src', perfil_funcionario.imagem);
                imgContainer.append(imagem);
                item.append(imgContainer);

                var funcao = $('<h2>').addClass('perfil-funcao').text('Função: ' + perfil_funcionario.funcao);
                item.append(funcao);

                container.append(item);
            } else {
                container.text('Funcionário não encontrado.');
            }
        }
    });
}

$(document).ready(function () {
    listarfuncionarios();
});
