
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: '../../back-end/php/padrão.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function(data){
                console.log(data);
                
                data == false ? alert('Nenhum modelo encontrado.') : exibir(data);
            }

        });
    });

0
function exibir(data){
    console.log('me chamaram');
    
    q = $('#nome');

    w = $('#tipo_tinta');


    
    data.forEach(function(e){
        var table = $('<p>').text(e['nome']);//"<p>" + e['nome'] + "</p>"
        q.append(table); 
        var table = $('<p>').text(e['tipotinta']);
        w.append(table); 


    });

}
//  t = (q, w, e, r)
// array (var t, var y)