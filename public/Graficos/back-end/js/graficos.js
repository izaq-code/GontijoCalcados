$(document).ready(function () {
    $.ajax({
        url: '/grafico1',
        type: 'GET',
        success: function (response) {
            grafSuccess(response.prod);
            grafError(response.erro);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', error);
        }
    });

});

function grafSuccess(dados) {
    // Função para calcular intervalos de data
    function calcularIntervalo(meses) {
        let hoje = new Date();
        hoje.setMonth(hoje.getMonth() - meses);
        return hoje.toISOString().split('T')[0];
    }

    // Calcula as datas de início para os intervalos de 2 em 2 meses, totalizando 10 meses
    let intervalos = [2, 4, 6, 8, 10].map(meses => calcularIntervalo(meses));
    
    // Inicializa um objeto para armazenar os dados de produção por período e por tipo de tênis
    let producaoPorPeriodo = {
        '2meses': {},
        '4meses': {},
        '6meses': {},
        '8meses': {},
        '10meses': {}
    };

    // Função para agregar a produção por período
    function agregarProducao(item, periodo) {
        if (!producaoPorPeriodo[periodo][item.nome]) {
            producaoPorPeriodo[periodo][item.nome] = 0;
        }
        producaoPorPeriodo[periodo][item.nome] += item.finalizado;
    }

    // Agrupa as quantidades de calçados por dia e intervalo
    dados.forEach(item => {
        if (item.data >= intervalos[0]) {
            agregarProducao(item, '2meses');
        }
        if (item.data >= intervalos[1]) {
            agregarProducao(item, '4meses');
        }
        if (item.data >= intervalos[2]) {
            agregarProducao(item, '6meses');
        }
        if (item.data >= intervalos[3]) {
            agregarProducao(item, '8meses');
        }
        if (item.data >= intervalos[4]) {
            agregarProducao(item, '10meses');
        }
    });

    // Extrai os nomes dos calçados e os dados para os datasets
    let nomesCalcados = [...new Set(dados.map(item => item.nome))];
    let datasets = nomesCalcados.map(nome => {
        return {
            label: nome,
            data: [
                producaoPorPeriodo['2meses'][nome] || 0,
                producaoPorPeriodo['4meses'][nome] || 0,
                producaoPorPeriodo['6meses'][nome] || 0,
                producaoPorPeriodo['8meses'][nome] || 0,
                producaoPorPeriodo['10meses'][nome] || 0
            ],
            borderColor: 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',1)',
            borderWidth: 1,
            fill: false
        };
    });

    const data = {
        labels: ['Últimos 2 meses', 'Últimos 4 meses', 'Últimos 6 meses', 'Últimos 8 meses', 'Últimos 10 meses'],
        datasets: datasets
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
}

function grafError(dados) {
    function calcularIntervalo(meses) {
        let hoje = new Date();
        hoje.setMonth(hoje.getMonth() - meses);
        return hoje.toISOString().split('T')[0];
    }

    // Calcula as datas de início para os intervalos de 2 em 2 meses, totalizando 10 meses
    let intervalos = [2, 4, 6, 8, 10].map(meses => calcularIntervalo(meses));
    
    // Inicializa um objeto para armazenar os dados de produção por período e por tipo de tênis
    let producaoPorPeriodo = {
        '2meses': {},
        '4meses': {},
        '6meses': {},
        '8meses': {},
        '10meses': {}
    };

    // Função para agregar a produção por período
    function agregarProducao(item, periodo) {
        if (!producaoPorPeriodo[periodo][item.nome]) {
            producaoPorPeriodo[periodo][item.nome] = 0;
        }
        producaoPorPeriodo[periodo][item.nome] += item.finalizado;
    }

    // Agrupa as quantidades de calçados por dia e intervalo
    dados.forEach(item => {
        if (item.data >= intervalos[0]) {
            agregarProducao(item, '2meses');
        }
        if (item.data >= intervalos[1]) {
            agregarProducao(item, '4meses');
        }
        if (item.data >= intervalos[2]) {
            agregarProducao(item, '6meses');
        }
        if (item.data >= intervalos[3]) {
            agregarProducao(item, '8meses');
        }
        if (item.data >= intervalos[4]) {
            agregarProducao(item, '10meses');
        }
    });

    // Extrai os nomes dos calçados e os dados para os datasets
    let nomesCalcados = [...new Set(dados.map(item => item.nome))];
    let datasets = nomesCalcados.map(nome => {
        return {
            label: nome,
            data: [
                producaoPorPeriodo['2meses'][nome] || 0,
                producaoPorPeriodo['4meses'][nome] || 0,
                producaoPorPeriodo['6meses'][nome] || 0,
                producaoPorPeriodo['8meses'][nome] || 0,
                producaoPorPeriodo['10meses'][nome] || 0
            ],
            borderColor: 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',1)',
            borderWidth: 1,
            fill: false
        };
    });

    const data = {
        labels: ['Últimos 2 meses', 'Últimos 4 meses', 'Últimos 6 meses', 'Últimos 8 meses', 'Últimos 10 meses'],
        datasets: datasets
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
    const ctx = document.getElementById('graficoError').getContext('2d');
    const myChart = new Chart(ctx, config);
}
