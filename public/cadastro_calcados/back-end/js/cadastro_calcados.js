$(document).ready(function () {
    $('#cadastrar-calcado').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();
        console.log(formData);

        $.ajax({
            type: 'POST',
            url: '/calcado',
            data: formData,
            success: function () {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Enviado com sucesso",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    $('#cadastrar-calcado')[0].reset();
                });
            },
            error: function () {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Erro ao enviar",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });
});
