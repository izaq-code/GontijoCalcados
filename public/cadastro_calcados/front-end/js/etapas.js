$(document).ready(function () {
    let passoAtual = 1;
    const totalPassos = $('.numero').length;
    const barraProgresso = $('.progresso');
    const passos = $('.passo');

    function atualizarPasso() {
        const larguraProgresso = (passoAtual / totalPassos) * 100 + '%';
        barraProgresso.css('width', larguraProgresso);

        $('.numero').removeClass('ativo');
        passos.removeClass('ativo');

        for (let i = 0; i < passoAtual; i++) {
            $('.numero').eq(i).addClass('ativo');
        }
        passos.eq(passoAtual - 1).addClass('ativo');

        if (passoAtual === totalPassos) {
            $('#proximo').attr('type', 'button').text('Enviar');
        } else {
            $('#proximo').attr('type', 'button').text('Próximo');
        }
    }

    $('#proximo').on('click', function () {
        if (passoAtual < totalPassos) {
            passoAtual++;
            atualizarPasso();
        } else if (passoAtual === totalPassos) {
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
                   
                    $('#cadastrar-calcado').submit();
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
        }
    });

    $('#voltar').on('click', function () {
        if (passoAtual > 1) {
            passoAtual--;
            atualizarPasso();
        }
    });

    atualizarPasso();
});