var amostar = localStorage.getItem('id');



    $(document).ready(function() {
 
        $.ajax({
            type: 'GET',
            url: '/info_produtos',
            data: {
                id : amostar
            }, // Envia formData como dados da requisição
            dataType: 'json',
            success: function(data) {
                console.log(data);
                if (data) {
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


function exibir(data){
    console.log('me chamaram');
    
    a = $('#nome');

    b = $('#tipo_tinta');

    c = $('#espe_linha');

    d = $('#nome_solado');

    q = $('#img');

    x = $('#nome_cadarco');

    f = $('#tempo_calcado');

    g = $('#nome_tinta');

    h = $('#corlinhacalcado');

    i = $('#temcosturacalcado');

    j = $('#temp_sec');


    
    data.forEach(function(e){

        var table = $('<img>').attr('src', e['img']);
        q.append(table);

        var table = $('<p>').text(e['nome']);//"<p>" + e['nome'] + "</p>"
        a.append(table); 

        var table = $('<p>').text(e['tipotinta']);
        b.append(table); 

        var table = $('<p>').text(e['espelinha']);
        c.append(table);

        var table = $('<p>').text(e['nomesolado']);
        d.append(table);

        var table = $('<p>').text(e['nomecadarco']);
        x.append(table);

        var table = $('<p>').text(e['tempocalcado']);
        f.append(table);

        var table = $('<p>').text(e['nometinta']);
        g.append(table);

        var table = $('<p>').text(e['corlinhacalcado']);
        h.append(table);

        var table = $('<p>').text(e['temcosturacalcado']);
        i.append(table);

        var table = $('<p>').text(e['tempsec']);
        j.append(table);


    });

}

