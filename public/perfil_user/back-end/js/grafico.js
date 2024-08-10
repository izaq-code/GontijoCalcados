$(document).ready(function () {
    var idFuncionario = localStorage.getItem('idFuncionario');
    $.ajax({
        url: '/graficoUser2',
        type: 'POST',
        data: {idFuncionario},
        success: function (response) {
            grafico3(response);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', errorMessage);
        }
    });
});

function grafico3 (dados) {

    const conc = dados[0].conc;
    const erros = dados[0].erro;
    const total = conc + erros;

    const ctx = document.getElementById('graf').getContext('2d');
            const data = {
                labels: ['Concluídos', 'Erros'],
                datasets: [{
                    label: 'total : ' + total ,
                    data: [conc, erros], // Substitua pelos valores dinâmicos se necessário
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)', // Cor para "Concluídos"
                        'rgba(255, 99, 132, 0.2)'  // Cor para "Erros"
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)', // Cor de borda para "Concluídos"
                        'rgba(255, 99, 132, 1)'  // Cor de borda para "Erros"
                    ],
                    borderWidth: 1
                }]
            };

            const config = {
                type: 'bar', // Tipo de gráfico: 'bar' para gráfico de barras
                data: data,
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: 'black', // Cor do texto da legenda
                                generateLabels: function(chart) {
                                    // Gera os labels sem caixas de cor
                                    return Chart.defaults.plugins.legend.labels.generateLabels(chart).map(label => {
                                        label.strokeStyle = 'transparent'; // Remove a cor da borda
                                        label.fillStyle = 'transparent'; // Remove a cor de preenchimento
                                        return label;
                                    });
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.raw !== null) {
                                        label += context.raw;
                                    }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Categoria'
                            }
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Quantidade'
                            }
                        }
                    }
                }
            };
                        
            

            new Chart(ctx, config);
}