$('#calcadoErro').click(function(){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },

    });

    swalWithBootstrapButtons.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, enviar!",
        cancelButtonText: "Não, cancelar!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            //aqui eu chamo a função pra reportar uma conclusão de calçado 
            calcadoErro();
            window.location.href = 'http://localhost:3000/info_produtos/front-end/html/selecao.html';
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "A ação foi cancelada",
                icon: "error"
            });
        }
    });
})

function calcadoErro () {
    $.ajax({
        url: '/calcadoErro',
        type: 'POST',
        //esse id já está declarado em outro js dependente dessa pagina
        data: { idCalcado },
        success: function () {
            window.location.href = 'http://localhost:3000/info_produtos/front-end/html/selecao.html';
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', error);
        }
    });   
};