$(document).ready(function () {
    $.ajax({
        url: '/graficoUser',
        type: 'GET',
        success: function (response) {
            grafico3(response);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', errorMessage);
        }
    });
});

function grafico3(dados) {

    const conc = dados[0].conc;
    const erros = dados[0].erro;
    const total = conc + erros;

    const ctx = document.getElementById('grafico3').getContext('2d');
    const data = {
        labels: ['Concluídos', 'Erros'],
        datasets: [{
            label: 'Total: ' + total,
            data: [conc, erros],
            backgroundColor: [
                'rgb(34, 93, 153)',
                'rgb(228, 64, 64)'
            ],
            borderColor: [
                'rgb(34, 93, 153)',
                'rgb(228, 64, 64)'
            ],
            borderWidth: 1
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'black',
                        generateLabels: function (chart) {
                            return Chart.defaults.plugins.legend.labels.generateLabels(chart).map(label => {
                                label.strokeStyle = 'transparent';
                                label.fillStyle = 'transparent';
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