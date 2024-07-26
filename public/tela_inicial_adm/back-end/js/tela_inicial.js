function listarCalcados() {
    var container = document.getElementById('exibir_calcados');
    
    $.ajax({
        url: '/calcados', 
        type: 'GET',
        dataType: 'json',
        success: function (calcado) {
            container.innerHTML = '';
            
            calcado.forEach(function (calcado) {
                var item =  `<div class="card-calcados">
                                <img src="${calcado.img}">
                                <h3 class="nome-calcado"> ${calcado.nome} </h3>
                            </div>`;
                
                container.innerHTML += item;
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar calcados:', error);
        }
    });
}

$(document).ready(function () {
    listarCalcados();
});
