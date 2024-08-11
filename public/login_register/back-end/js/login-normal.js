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
     redirecionar = callback() + '&prompt=select_account';
    } else {
     redirecionar = 'http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html';
    }
    window.location.href = redirecionar;
}
function w(mensage) {

   
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Erro ao efetuar o login :' + mensage,
        showConfirmButton: false,
        timer: 1500
    });
   
   
}

function callback() {
    const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000/login-google'; // URL de redirecionamento autorizado
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const prompt = 'select_account'; // Força a seleção de conta
    const auth_url = 'https://accounts.google.com/o/oauth2/auth?' +
                     'response_type=code' +
                     '&client_id=' + encodeURIComponent(client_id) +
                     '&redirect_uri=' + encodeURIComponent(redirect_uri) +
                     '&scope=' + encodeURIComponent(scope);
    return auth_url;
}