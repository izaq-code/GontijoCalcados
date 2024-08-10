const idCalcado = localStorage.getItem('id');

$(document).ready(function () {
    $.ajax({
        url: '/graficoCalcado',
        type: 'POST',
        data: { idCalcado },
        success: function (response) {
            // Extrai os dados de produção e erro do response
            let dadosProd = response.prod || [];
            let dadosErro = response.erro || [];
            let sucessoData = calcularDados(dadosProd);
            let erroData = calcularDados(dadosErro);

            // Gera o gráfico com os dados calculados
            grafProducaoErro(sucessoData, erroData);
        },
        error: function (xhr, status, error) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error('Erro ao enviar o formulário:', error);
        }
    });
});

// Função para calcular dados por período
function calcularDados(dados) {
    // Função para calcular intervalos de data
    function calcularIntervalo(meses) {
        let hoje = new Date();
        hoje.setMonth(hoje.getMonth() - meses);
        return hoje.toISOString().split('T')[0];
    }

    // Calcula as datas de início para os intervalos de 2 em 2 meses, totalizando 10 meses
    let intervalos = [2, 4, 6, 8, 10].map(meses => calcularIntervalo(meses));
    
    // Inicializa um objeto para armazenar os dados por período
    let dadosPorPeriodo = {
        '2meses': 0,
        '4meses': 0,
        '6meses': 0,
        '8meses': 0,
        '10meses': 0
    };

    // Função para agregar dados ao período correspondente
    function agregarDados(item) {
        if (item.data >= intervalos[0]) dadosPorPeriodo['2meses'] += item.finalizado || 0;
        if (item.data >= intervalos[1]) dadosPorPeriodo['4meses'] += item.finalizado || 0;
        if (item.data >= intervalos[2]) dadosPorPeriodo['6meses'] += item.finalizado || 0;
        if (item.data >= intervalos[3]) dadosPorPeriodo['8meses'] += item.finalizado || 0;
        if (item.data >= intervalos[4]) dadosPorPeriodo['10meses'] += item.finalizado || 0;
    }

    // Agrega dados
    dados.forEach(item => agregarDados(item));

    return [
        dadosPorPeriodo['2meses'],
        dadosPorPeriodo['4meses'],
        dadosPorPeriodo['6meses'],
        dadosPorPeriodo['8meses'],
        dadosPorPeriodo['10meses']
    ];
}

function grafProducaoErro(sucessoData, erroData) {
    const data = {
        labels: ['Últimos 2 meses', 'Últimos 4 meses', 'Últimos 6 meses', 'Últimos 8 meses', 'Últimos 10 meses'],
        datasets: [
            {
                label: 'Concluído',
                data: sucessoData,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: false
            },
            {
                label: 'Erro',
                data: erroData,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 1,
                fill: false
            }
        ]
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
    const ctx = document.getElementById('graficoCalcado').getContext('2d');
    const myChart = new Chart(ctx, config);
}
