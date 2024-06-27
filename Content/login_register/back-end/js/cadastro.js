$(document).ready(function(){
    $('#cadastro-funcionario').submit(function(e){
        e.preventDefault();

        var formData = $(this).serialize();

        $.ajax({
            type: 'POST',
            url: 'cadastro.php',
            data: formData,
            success: function(resposta){
                console.log(resposta);
            }
        })
    })
})

function cadastro(resposta){
    t = $('#resposta');
    t.empty();
    resp = (
        '<p>' + resposta + '</p>' 
    )
    t.append(resp);
}