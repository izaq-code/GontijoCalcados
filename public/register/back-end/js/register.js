$(document).ready(function () {
    $('#register').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            url: '/register',
            type: 'POST',
            data: formData,
            success: function (response) {
                sim = response.true
                sim == true ? q(response) :
                    w(response.mensage);
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor

            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao enviar o formulário:', error);

            }
        });
    });
});

function q(response){

    var nome = response.nome
    var ra = response.ra
    var funcao = response.funcao
    divPrincipal = $('#response');
    divPrincipal.empty();

    mensagem = $('<h2>').text('Usuário Cadastrado com sucesso !');
    divPrincipal.append(mensagem);


    preNome = $('<h4>').text('nome:');
    nomeUser = $('<p>').text(nome);
    divPrincipal.append(preNome, nomeUser);

    preRa = $('<h4>').text('RA:');
    raUser = $('<p>').text(ra);
    divPrincipal.append(preRa, raUser);

    preFuncao = $('<h4>').text('nome:');
    funcaoUser = $('<p>').text(funcao);
    divPrincipal.append(preFuncao, funcaoUser);

}

function w (mensage) {
    alert(mensage);
}