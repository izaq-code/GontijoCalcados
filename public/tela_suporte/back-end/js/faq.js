$(document).ready(function () {
    $('#faq').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../../../tela_suporte/back-end/php/faq.php',
            data: formData,
            success: function (data) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Enviado com sucesso",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                     window.location.reload();
                });
            }
        });
    });
});
