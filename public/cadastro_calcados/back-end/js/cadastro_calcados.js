$(document).ready(function () {
    function carregarOpcoesSelect(url, selectId, item) {
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                $(selectId).empty();
                $(selectId).append(`<option value="">${item}</option>`);
                data.forEach(function (item) {
                    $(selectId).append('<option value="' + item.id + '">' + item.nome + '</option>');
                });
            },
            error: function () {
                console.error('Erro ao carregar opções para ' + selectId);
            }
        });
    }

    carregarOpcoesSelect('/tintas', '#select-tinta', 'Selecione a Tinta');
    carregarOpcoesSelect('/materiais', '#select-material', 'Selecione o Material');
    carregarOpcoesSelect('/cadarcos', '#select-cadarco', 'Selecione o cadarço');
    carregarOpcoesSelect('/solados', '#select-solado', 'Selecione o solado');
    carregarOpcoesSelect('/adesivos', '#select-adesivo', 'Selecione o adesivo');
    carregarOpcoesSelect('/tipo-de-tintas', '#select-tipo-de-tinta', 'Selecione o tipo de tinta');

    $('#cadastrar-calcado').submit(function (e) {
        e.preventDefault(); 
        var formData = new FormData(this); 
    
        $.ajax({
            type: 'POST',
            url: '/calcado',
            data: formData,
            contentType: false,
            processData: false, 
            success: function (response) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Enviado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                }).then(function () {
                    $('#cadastrar-calcado')[0].reset();
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Erro:', textStatus, errorThrown);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Erro ao enviar',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });    
});
