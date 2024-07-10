
// funcoes para buscar as informações de acordo com os botoes 

// buscar modelos
function buscarModelo() {
    $.ajax({
        url: './PHP/modelo.php',
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


// buscar cores
function buscarTinta() {
    $.ajax({
        url: './PHP/tinta.php',
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


// buscar adesivos
function buscarAdesivo() {
    $.ajax({
        url: './PHP/adesivo.php',
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



//funcoes para retornar os valores

// sucess
function t(e) {

    selection = e.result;

    var divprincipal = $('#info');

    for (e in selection) {
        var q = $('<img>').attr('src', e['caminho']);
        var w = $('<input>').attr('type', 'hidden').val(e['id']);
        divprincipal.append(q, w);
    }

}


// error
function w(message) {
    alert('Erro ao enviar o formulário: ' + message);
}



// eventos de click

$('#modelo').on('click', function(e){
    e.preventDefault();
    buscarModelo();
    
})

$('#tinta').on('click', function(e){
    e.preventDefault();
    buscarTinta();
    
})

$('#adesivo').on('click', function(e){
    e.preventDefault();
    buscarAdesivo();
    
})

$(document).ready(function () {

});