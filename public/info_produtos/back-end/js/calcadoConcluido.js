const idCalcado = localStorage.getItem('id');

function calcadoConcluido () {
    $.ajax({
        url: '/calcadoConcluido',
        type: 'POST',
        data: { idCalcado },
        success: function () {
            window.location.href = 'http://localhost:3000/info_produtos/front-end/html/selecao.html';
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', error);
            return;
        }
    });   
};