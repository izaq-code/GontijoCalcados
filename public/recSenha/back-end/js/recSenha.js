$(document).ready(function () {
    $('#recSenha').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            url: '/rec_senha',
            type: 'POST',
            data: formData,
            success: function (response) {
                alert(response);
            }
        })
    })
})