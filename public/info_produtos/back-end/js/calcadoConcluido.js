$('#calcadoCad').click(function(){
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
            swalWithBootstrapButtons.fire({
                title: 'Criado com Sucesso!',
                text: 'Você será redirecionado em breve.',
                icon: 'success',
                timer: 2000, 
                showConfirmButton: false
            }).then(() => {
                // Função de conclusão do processo
                calcadoConcluido();
                window.location.href = 'http://localhost:3000/info_produtos/front-end/html/selecao.html';
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelado",
                text: "A ação foi cancelada",
                icon: "error"
            });
        }
    });
})

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