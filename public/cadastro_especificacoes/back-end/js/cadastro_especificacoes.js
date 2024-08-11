$(document).ready(function() {
    $('.cadastrar-especificacoes').on('submit', function(e) {
        e.preventDefault(); 

        const nome = $(this).data('table');
        const valor = $(this).find('input').val();


        if (valor) { 
            $.ajax({
                type: 'POST',
                url: '/cadastro_especificacoes',
                data: { 
                    [nome]: valor 
                }, 
                success: function(response) {
                    $(this).find('input').val(''); 
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cadastrado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(function () {
                        $('#cadastrar-calcado')[0].reset();
                    });
                }.bind(this), 

                error: function(xhr, status, error) {
                }
            });
        }
    });
});