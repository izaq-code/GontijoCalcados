function listarfuncionarios() {
    var container = $('#perfil');

    var idFuncionario = localStorage.getItem('idFuncionario');

    $.ajax({
        url: '/funcionarios/',
        type: 'GET',
        dataType: 'json',
        success: function (perfil) {
            console.log("Perfil retornado:", perfil); // Verifique o que está sendo retornado

            container.empty();

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idFuncionario;
            });

            console.log("Perfil do funcionário encontrado:", perfil_funcionario); // Verifique se o funcionário foi encontrado
            
            if (perfil_funcionario) {
                var item = $('<div>').addClass('produto');

                //exibi nome
                var nome = $('<h3>').addClass('perfil-nome').text(perfil_funcionario.nome);
                item.append(nome);
                
                //exibi email
                var email = $('<h3>').addClass('perfil-email').text(perfil_funcionario.email);
                item.append(email);

                //exibi telefone
                var telefone = $('<h3>').addClass('perfil-telefone').text(perfil_funcionario.telefone);
                item.append(telefone);
                
                //exibi imagem
                var imgContainer = $('<div>').addClass('img-container');
                var imagem = $('<img>').attr('src', perfil_funcionario.profile_picture);
                imgContainer.append(imagem);
                item.append(imgContainer);

                var funcao = $('<h2>').addClass('perfil-funcao').text('Função: ' + perfil_funcionario.funcao);
                item.append(funcao);
            
                container.append(item);
                //fim de exibiução
            } 
        },
    });
}

$(document).ready(function () {
    listarfuncionarios();
});
