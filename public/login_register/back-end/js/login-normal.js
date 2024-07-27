$(document).ready(function () {
    $('#login').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            url: '/login_normal',
            type: 'POST',
            data: formData,
            success: function (response) {
                sim = response.success
                pl = response.pl
                sim == true ? q(pl) :
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


function q(pl) {

    var redirecionar;
    if(pl) { 
     redirecionar = callback();
    } else {
     redirecionar = 'http://localhost:3000/tela_inicial_adm/front-end/HTML/padr%c3%a3o.html';
    }
    window.location.href = redirecionar;
}
function w(mensage) {

    alert('erro ao logar : ' + mensage);
    location.reload();
}

function callback() {
    const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000/login-google'; // URL de redirecionamento autorizado
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const auth_url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scope);
    return auth_url;
}