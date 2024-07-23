$(document).ready(function () {
    function carregarOpcoesSelect(url, selectId) {
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                $(selectId).empty();
                $(selectId).append('<option value="">Selecione...</option>');
                data.forEach(function (item) {
                    $(selectId).append('<option value="' + item.id + '">' + item.nome + '</option>');
                });
            },
            error: function () {
                console.error('Erro ao carregar opções para ' + selectId);
            }
        });
    }

    carregarOpcoesSelect('/tintas', '#select-tinta');
    carregarOpcoesSelect('/materiais', '#select-material');
    carregarOpcoesSelect('/cadarcos', '#select-cadarco');
    carregarOpcoesSelect('/solados', '#select-solado');
    carregarOpcoesSelect('/adesivos', '#select-adesivo');
    carregarOpcoesSelect('/tipo-de-tintas', '#select-tipo-de-tinta');

    $('#cadastrar-calcado').submit(function (e) {
        e.preventDefault();

        var formData = $(this).serialize();

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
                }).then(function () {
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
