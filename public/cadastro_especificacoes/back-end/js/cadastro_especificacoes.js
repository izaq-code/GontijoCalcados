$(document).ready(function() {
    $('#cadastrar-especificacoes').on('submit', function(e) {
        e.preventDefault(); 

        var formData = $(this).serialize(); 

        $.ajax({
            type: 'POST',  
            url: '/cadastro_especificacoes',
            data: formData,
            success: function (response) {
                
           

            }
        });
    });
})
