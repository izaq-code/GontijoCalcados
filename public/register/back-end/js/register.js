$(document).ready(function () {
    $('#register').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            url: '/register',
            type: 'POST',
            data: formData,
            success: function (response) {
                var nome = response.nome;
                var ra = response.ra;
                var funcao = response.funcao;
  
                Swal.fire({
                    icon: "success",
                    title: "Cadastrado com sucesso",
                    footer: ` <div>
                            Nome: ${nome} <br>
                            RA: ${ra} <br>
                            Função: ${funcao} <br>
                        </div>`,
                        confirmButtonText: 'Ok',
                        customClass: {
                            confirmButton: 'btn-blue', 
                        }
                });
                
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao enviar o formulário:', errorMessage);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Erro ao enviar o formulário. Tente novamente.",
                    footer: '<a href="#">Por que estou tendo esse problema?</a>'
                });
            }
        });
    });
});
