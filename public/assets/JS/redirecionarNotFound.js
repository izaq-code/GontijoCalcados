document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: '/redirecionarNotFound',
        type: 'GET',
        success: function (data){
            // Verificar se a URL atual não é a página de redirecionamento
            if (!data.autenticado && window.location.pathname !== '/login_register/front-end/HTML/login.html') {
                window.location.href = '/login_register/front-end/HTML/login.html';
            }
        },
        error: function (xhr, status, error) {
            console.error('erro ao redirecionar : ' + error);
        }
    });
});
