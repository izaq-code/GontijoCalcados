$(document).ready(function() {
    var amostar = localStorage.getItem('id');

    $.ajax({
        type: 'GET',
        url: '/info_produtos',
        data: { id: amostar },
        dataType: 'json',
        success: function(data) {
            if (data && data.length > 0) {
                exibir(data);
            } else {
                alert('Nenhum modelo encontrado.');
            }
        },
        error: function(err) {
            console.error('Erro na requisição AJAX:', err);
            alert('Erro ao buscar dados');
        }
    });
});

function exibir(data) {
    var modelViewer = document.getElementById('modelViewer');
    var item = data[0];

    // Ensure the path is correct
    var modelPath = item['modelo3d'].startsWith('http') ? item['modelo3d'] : new URL(item['modelo3d'], window.location.origin).href;
    console.log('Modelo 3D Path:', modelPath);

    // Update the model viewer
    modelViewer.setAttribute('src', modelPath);

    // Update other information
    $('#img').html($('<img>').attr('src', item['img']));
    $('#nome').text('Nome: ' + item['nome']);
    $('#tipo_tinta').text('Tipo de Tinta: ' + item['tipotinta']);
    $('#espe_linha').text('Espessura de Linha: ' + item['espelinha']);
    $('#nome_solado').text('Nome do Solado: ' + item['nomesolado']);
    $('#nome_cadarco').text('Nome do Cadarço: ' + item['nomecadarco']);
    $('#tempo_calcado').text('Tempo de Calçado: ' + item['tempocalcado']);
    $('#nome_tinta').text('Nome da Tinta: ' + item['nometinta']);
    $('#corlinhacalcado').text('Cor da Linha do Calçado: ' + item['corlinhacalcado']);
    $('#temcosturacalcado').text('Tempo de Costura do Calçado: ' + item['temcosturacalcado']);
    $('#temp_sec').text('Tempo de Secagem: ' + item['tempsec']);
}
