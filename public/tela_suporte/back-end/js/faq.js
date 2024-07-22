$(document).ready(function () {
    $('#faq').submit(function (e) {
        e.preventDefault();

        // Serializando os dados do formulário
        var formData = $(this).serialize();
        console.log(formData);  // Verifique o que está sendo enviado

        $.ajax({
            type: 'POST',
            url: '/feedback',
            data: formData,
            success: function () {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Enviado com sucesso",
                    showConfirmButton: false,
                    timer: 1500
                }).then(function() {
                    $('#faq')[0].reset();  // Limpa o formulário
                });
            },
            error: function () {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Erro ao enviar feedback",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });
});
