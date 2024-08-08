var idUsuarioLogado;

function carregarInformacoes(callback) {
    $.ajax({
        url: '/mostrarUsuarioLogado',
        type: 'GET',
        dataType: 'json',
        success: function (usuario) {
            if (usuario && usuario.id) {
                idUsuarioLogado = usuario.id;
                if (callback && typeof callback === 'function') {
                    callback();
                }
                console.log(usuario);
            } else {
                console.error('Dados do usuário logado não estão no formato esperado.');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao carregar informações do usuário logado:', textStatus, errorThrown);
        }
    });
}

function carregarPerfil() {
    var container = document.getElementById('perfil');
    $.ajax({
        url: '/meu_perfil',
        type: 'GET',
        dataType: 'json',
        data: {
            id: idUsuarioLogado 
        },
        success: function (perfil) {
            console.log("Perfil retornado:", perfil);

            container.innerHTML = '';

            if (!Array.isArray(perfil) || perfil.length === 0) {
                console.error("Nenhum perfil encontrado ou resposta não é um array:", perfil);
                return;
            }

            var perfil_funcionario = perfil.find(function (funcionario) {
                return funcionario.id == idUsuarioLogado;
            });

            console.log("Perfil do funcionário encontrado:", perfil_funcionario);

            if (perfil_funcionario) {
                var item = `
                    <div id="container-ponto">
                        <div class="card-ponto">
                            <h3 class="entrada">Entrada</h3> 
                            <h1 class="conteudo-ponto">${perfil_funcionario.ponto_inicial}</h1>
                        </div>
                        <div class="card-ponto">
                            <h3 class="saida">Saída</h3>
                            <h1 class="conteudo-ponto">${perfil_funcionario.ponto_final}</h1>
                        </div>
                        <div class="card-ponto">
                            <h3 class="saida">Horas Trabalhadas</h3>
                            <h1 class="conteudo-ponto">${perfil_funcionario.banco}</h1>
                        </div>
                    </div>
                `;
                container.innerHTML = item;
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao carregar perfil:', textStatus, errorThrown);
        }
    });
}

function listarFuncionarios() {
    console.log("ID do Usuário Logado:", idUsuarioLogado);
    if (typeof idUsuarioLogado === 'undefined') {
        console.error('ID do usuário logado não está definido.');
        return;
    }

    var container = document.getElementById('historico_1');
    container.innerHTML = ''; 

    var cabeçalho = `
        <div class='container'>
     
            <div class='cabecalho-historico'>
                <i class="bi bi-calendar-week"></i><h1>Espelho de ponto</h1>
            
             <div id="filtro">
                <label class="filtro-label" for="data_ini">Data Início:</label>
                <input class="filtro-input" type="date" id="data_ini">
                <label class="filtro-label" for="data_fim">Data Fim:</label>
                <input class="filtro-input" type="date" id="data_fim">
                <button class="filtro-botao" id="filtrar">Filtrar</button>
                <button class="filtro-botao" id="mostrar-todos">Mostrar Todos</button>
            </div>
            </div>
             <div class="table-wrapper">
            <table class='tabela-historico'>
                <thead>
                    <tr class="linha-abaixo">
                        <th>Data</th>
                        <th>Entrada e Saída</th>
                        <th>Horas Trabalhadas</th>
                        <th>Banco de Horas Anterior</th>
                        <th>Banco de Horas</th>
                    </tr>
                </thead>
                <tbody id='historico'>
                </tbody>
            </table>
        </div>
    </div>
    `;

    container.innerHTML = cabeçalho;

    function atualizarHistorico() {
        var data_ini = document.getElementById('data_ini').value;
        var data_fim = document.getElementById('data_fim').value;

        console.log("Data Início:", data_ini);
        console.log("Data Fim:", data_fim);

        $.ajax({
            url: '/historico',
            type: 'GET',
            dataType: 'json',
            data: {
                id: idUsuarioLogado,
                data_ini: data_ini,
                data_fim: data_fim
            },
            success: function (historico) {
                console.log("Historico:", historico);

                var tbody = document.getElementById('historico');

                tbody.innerHTML = ''; 

                if (Array.isArray(historico) && historico.length > 0) {
                    historico.forEach(item => {
                        var ponto_inicial = item.ponto_inicial || '00:00:00';
                        var ponto_final = item.ponto_final || '00:00:00';
                        var banco = item.banco || '00:00:00';
                        var data = item.data || '00-00-0000';
                        var horas_trabalhadas = item.horas_trabalho || '00:00:00';
                        var banco_de_horas_anterior = item.banco_de_horas_anterior || '00:00:00';

                        var row = `
                            <tr class="linha-abaixo">
                                <td>${data}</td>
                                <td>${ponto_inicial} - ${ponto_final}</td>
                                <td>${horas_trabalhadas}</td>
                                <td>${banco_de_horas_anterior}</td>
                                <td>${banco}</td>
                            </tr>
                        `;

                        tbody.innerHTML += row;
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="5">Histórico não encontrado.</td></tr>';
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Erro ao listar o histórico:', textStatus, errorThrown);
                container.innerHTML += '<p>Erro ao carregar histórico.</p>';
            }
        });
    }

    document.getElementById('filtrar').addEventListener('click', atualizarHistorico);
    document.getElementById('mostrar-todos').addEventListener('click', function() {
        document.getElementById('data_ini').value = '';
        document.getElementById('data_fim').value = '';
        atualizarHistorico();
    });

   
    atualizarHistorico();
}

carregarInformacoes(function() {
    carregarPerfil();
    listarFuncionarios();
});
