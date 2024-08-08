$(document).ready(function() {
    $('#cadastrar-especificacoes').on('submit', function(e) {
        e.preventDefault(); 

        var formData = $(this).serializeArray();
        var dataToSend = {};

        // Filtra apenas os campos preenchidos
        $.each(formData, function(i, field) {
            if (field.value) {
                dataToSend[field.name] = field.value;
            }
        });

        $.ajax({
            type: 'POST',
            url: '/cadastro_especificacoes',
            data: dataToSend,
            success: function(response) {
                console.log('Sucesso:', response);
            },
            error: function(xhr, status, error) {
                console.log('Erro:', error);
            }
        });
    });
});
