
    var t = 1; //localStorage.getItem('id');

    
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../../back-end/php/show.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            data: {
                id: t
            },
            success: function(data){
                console.log(data);
                
                data == false ? alert('Nenhum modelo encontrado.') : exibir(data);
            }

        });
    });

0
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
//  t = (q, w, e, r)
// array (var t, var y)