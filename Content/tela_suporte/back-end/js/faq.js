$(document).ready(function () {
    $('#fac').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: '../../../tela_suporte/back-end/php/faq.php',
            data: formData,
            contentType: false,
            processData: false,
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
