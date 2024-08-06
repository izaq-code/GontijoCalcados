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

function listarFuncionarios() {
    console.log("ID do Usuário Logado:", idUsuarioLogado);
    if (typeof idUsuarioLogado === 'undefined') {
        console.error('ID do usuário logado não está definido.');
        return;
    }

    var container = document.getElementById('historico');

    $.ajax({
        url: '/historico',
        type: 'GET',
        dataType: 'json',
        data: {
            id: idUsuarioLogado
        },
        success: function (historico) {
            console.log("Perfil retornado:", historico);

            container.innerHTML = '';

            if (Array.isArray(historico) && historico.length > 0) {
                historico.forEach(item => {
                   
                    var ponto_inicial = item.ponto_inicial || '00:00:00';
                    var ponto_final = item.ponto_final || '00:00:00';
                    var banco = item.banco || '00:00:00';
                    var data = item.data || '00-00-0000';
                    var horas_trabalhadas = item.horas_trabalho || '00:00:00'; 
                    var banco_de_horas_anterior = item.banco_de_horas_anterior || '00:00:00';

                    
                    var html = `
                        <div class="perfil-usuario">
                            <div id="container-ponto">
                                <div class="card-ponto">
                                    <h3 class="entrada">Entrada</h3> 
                                    <h1 class="conteudo-ponto">${ponto_inicial}</h1>
                                </div>
                                <div class="card-ponto">
                                    <h3 class="saida">Saída</h3>
                                    <h1 class="conteudo-ponto">${ponto_final}</h1>
                                </div>
                                <div class="card-ponto">
                                    <h3 class="banco">Banco de Horas</h3>
                                    <h1 class="conteudo-ponto">${banco}</h1>
                                </div>
                                <table>
                                    <tbody>  
                                        <tr>
                                            <td class="Data">
                                                <h3>Data</h3>
                                            </td>
                                            <td class="Data">
                                                <h4>${data}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="Entrada e Saida">
                                                <h4>Entrada e Saída</h4>
                                            </td>
                                            <td class="Entrada e Saida">
                                                <h4>${ponto_inicial} - ${ponto_final}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="horas_trabalhadas">
                                                <h4>Horas Trabalhadas</h4>
                                            </td>
                                            <td class="horas_trabalhadas">
                                                <h4>${horas_trabalhadas}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="saldo_anterior">
                                                <h4>Banco de Horas Anterior</h4>
                                            </td>
                                            <td class="saldo_anterior">
                                                <h4>${banco_de_horas_anterior}</h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="banco_de_horas">
                                                <h4>Banco de Horas</h4>
                                            </td>
                                            <td class="banco_de_horas">
                                                <h4>${banco}</h4>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;

                    
                    container.innerHTML += html;
                });
            } 
        },
    
    });
}

document.addEventListener('DOMContentLoaded', function () {
    carregarInformacoes(listarFuncionarios);
});
