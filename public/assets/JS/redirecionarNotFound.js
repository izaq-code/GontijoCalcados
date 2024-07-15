document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: '/redirecionarNotFound',
        type: 'GET',
        success: function (data){
            // Verificar se a URL atual não é a página de redirecionamento
            if (!data.autenticado && window.location.pathname !== '/not-found/front-end/HTML/notfound.html') {
                window.location.href = data.notFound;
            }
        },
        error: function (xhr, status, error) {
            console.error('erro ao redirecionar : ' + error);
        }
    });
});
