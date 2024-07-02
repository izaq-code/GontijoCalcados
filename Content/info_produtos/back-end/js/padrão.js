document.addEventListener("DOMContentLoaded", tabela);
// window.addEventListener("load", tabela);
function tabela(){
    $(document).ready(function(){
        $.ajax({
            type: 'POST',
            url: './PHP/tabela.php',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            dataType: 'json',
            success: function(data){
                
                data == false ? alert('nenhum usuario encontrado') : exibir(data);
            }

        });
    });
}

function exibir(data){
    console.log('me chamaram');
    
    t = $('#select');
    
    data.forEach(function(e){
        var table = "<option value='" + e['cod'] + "'>" + e['nome'] + "</option>";
        t.append(table); 
    })
}