$(document).ready(function () {
    $('#faq').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();
        console.log(formData); 

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
                    $('#faq')[0].reset(); 
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
