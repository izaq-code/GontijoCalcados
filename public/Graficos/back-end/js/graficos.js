$(document).ready(function () {

        $.ajax({
            url: '/grafico1',
            type: 'GET',
            success: function (response) {

                grafSuccess(response.prod);
                grafError(response.erro);
                console.log(response.erro)

                
                console.log('Resposta do servidor:', response); // Verifica a resposta do servidor

            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText;
                console.error('Erro ao enviar o formulário:', error);

            }
        });
});

function grafSuccess(dados){

     // Agrupa as quantidades de calçados por dia
     let producaoPorDia = {};
     dados.forEach(item => {
         if (!producaoPorDia[item.data]) {
             producaoPorDia[item.data] = 0;
         }
         producaoPorDia[item.data] += item.finalizado;
     });
 
     // Extrai os dias e as quantidades para os eixos do gráfico
     let dias = Object.keys(producaoPorDia);
     let quantidades = Object.values(producaoPorDia);
 
     const data = {
         labels: dias,
         datasets: [{
             label: 'Calçados Produzidos',
             data: quantidades,
             backgroundColor: 'rgba(75, 192, 192, 0.2)',
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 1,
             fill: false
         }]
     };
 
     // Configurações do gráfico
     const config = {
         type: 'line', // Tipo de gráfico: 'line'
         data: data,
         options: {
             responsive: true,
             plugins: {
                 legend: {
                     position: 'top',
                 },
                 tooltip: {
                     callbacks: {
                         label: function (context) {
                             let label = context.dataset.label || '';
                             if (label) {
                                 label += ': ';
                             }
                             if (context.parsed.y !== null) {
                                 label += context.parsed.y;
                             }
                             return label;
                         }
                     }
                 }
             },
             scales: {
                 x: {
                     beginAtZero: true
                 },
                 y: {
                     beginAtZero: true
                 }
             }
         }
     };
 
     // Criação do gráfico
     const ctx = document.getElementById('graficoSuccess').getContext('2d');
     const myChart = new Chart(ctx, config);
 
    
};

function grafError(dados){

 
    let nomeCalcado = Object.values(dados).map(i => i.nome);
    
    console.log(nomeCalcado);
    var quant = Object.values(dados).map(i => i.error);

    


    const data2 = {
        labels: nomeCalcado,
        datasets: [{
            label: 'Erros Reportados',
            data: quant,
            backgroundColor: 'rgba(75, 255, 192, 0.2)',
            borderColor: 'rgba(75, 255, 192, 1)',
            borderWidth: 1
        }]
    };

    // Configurações do gráfico
    const config2 = {
        type: 'bar', // Tipo de gráfico: 'line', 'bar', 'radar', 'doughnut', etc.
        data: data2,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Criação do gráfico
    const ctx2 = document.getElementById('graficoError').getContext('2d');
    const myChart2 = new Chart(ctx2, config2);
};