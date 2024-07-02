
function buscarModelo() {
    $.ajax({
        url: './PHP/padrão.php',
        type: 'POST',
        dataType: 'json',
        success: function (e) {
            e.success ? t(e) : w(e.message);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', errorMessage);
        }
    });
}

$(document).ready(function () {

});


function t(e) {

    selection = e.result;

    var divprincipal = $('#info');

        var q = $('<img>').attr('src', selection.caminho);
        var w = $('<input>').attr('type', 'hidden').val(selection.id);
        divprincipal.append(q, w);


}

function w(message) {
    alert('Erro ao enviar o formulário: ' + message);
}