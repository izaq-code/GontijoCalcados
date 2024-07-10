

$(document).ready(function () {
    $('#login-google').click(function (e) {
        e.preventDefault();

        // $.ajax({
        //     url: '../../../login_register/back-end/php/callback-log.php',
        //     type: 'GET',
        //     success: function(response) {
        //         var data = JSON.parse(response);
        //         window.location.href = data.redirectUrl;
        //     },
        //     error: function(xhr, status, error) {
        //         console.error(error);
        //     }
        // });

        const redirecionar = callback();

        window.location.href = redirecionar;

    });
});

//funcao callback
function callback() {

    const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
    const client_secret = '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';
    const redirect_uri = 'http://localhost:3000/login-google'; // URL de redirecionamento autorizado
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const auth_url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scope);

    return auth_url;
}
