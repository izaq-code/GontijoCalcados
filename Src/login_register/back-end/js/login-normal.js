$(document).ready(function () {
    $('#login').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            url: 'PHP/login-normal.php',
            type: 'POST',
            data: formData,
            success: function (response) {
                response == true ? q() : w();
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor

            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao enviar o formulário:', error);

            }
        });
    });
});

function q() {
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Enviado com sucesso!',
    //     customClass: {
    //         confirmButton: 'swal-button' 
    //     }
    // }).then((result) => {
    //     if (result.isConfirmed) {
    //         window.location.href = 'http://localhost/fono/src/inicio/inicio.html';
    //     }
    // });
    window.location.href = 'http://localhost/fono/src/Paciente/listar_pacientes.html';
}
function w() {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Erro ao enviar o formulário',
    //       text: 'Por favor, tente novamente mais tarde.',
    //       customClass: {
    //         confirmButton: 'swal-button' 
    //     }
    //     });
}