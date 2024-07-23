 $(document).ready(function() {
 
        $.ajax({
            type: 'GET',
            url: '/imagens',
            success: function(data) {
                console.log(data);
                if (data&& data.length > 0) {
                    exibirImagens(data);// função para buscar as chamadas
                } else {
                    alert('Nenhum imagem encontrada.');
                }
            },
            error: function(err) {
                console.error('Erro na requisição AJAX:', err);
                alert('Erro ao buscar dados');
            }
        });
    });

// Adiciona um evento de clique global em todas as imagens
    $(document).on('click', 'img', function() {
        var id = $(this).data('id'); // Obtém o ID do atributo data-id da imagem clicada
        localStorage.setItem('id', id);
        window.location.href = 'http://localhost:3000/info_produtos/front-end/html/show.html';
    });





function exibirImagens(data){
    console.log('Exibindo imagens');
    
   
   // Essa aqui é a div que irá exibir as nossas imagens do banco de dados
    var imgContainer = $('#imgContainer');

  // limpa conteúdos pré existentes (se preciso)
  imgContainer.empty();


   // Itera sobre os dados recebidos (imagens)
    
    data.forEach(function(item){

        var img = $('<img>').attr('src', item['img']).attr('data-id', item['id']);// Elemeto que definido pela URL da imagem
       imgContainer.append(img);  // Adiciona a imagem á div  imgContainer

    });


 
}

