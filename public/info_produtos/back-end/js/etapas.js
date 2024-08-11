
const corMap = {
    '#000000': 'Preto',
    '#FFFFFF': 'Branco',
    '#FFB6C1': 'Rosa Claro',
    '#FF69B4': 'Rosa',
    '#8B0000': 'Vermelho Escuro',
    '#FF0000': 'Vermelho',
    '#FF4500': 'Laranja Escuro',
    '#FFA07A': 'Laranja Claro',
    '#FFFF00': 'Amarelo',
    '#FFFACD': 'Amarelo Canário',
    '#A9A9A9': 'Cinza Escuro',
    '#D3D3D3': 'Cinza Claro',
    '#90EE90': 'Verde Claro',
    '#228B22': 'Verde Folha',
    '#008000': 'Verde',
    '#40E0D0': 'Verde Turquesa',
    '#0000FF': 'Azul',
    '#0047AB': 'Azul Cobalto',
    '#00CED1': 'Azul Turquesa',
    '#960018': 'Carmim',
    '#8A2BE2': 'Violeta',
    '#D02090': 'Vermelho Violeta',
    '#4B5320': 'Marrom Terra',
    '#4d3201': 'Marrom',
    '#D2B48C': 'Marrom Claro',
    '#FFD700': 'Dourado',
    '#B8860B': 'Dourado Escuro'
};


function getEtapas() {
    var container = document.getElementById('mostrar-etapas');

    $.ajax({
        url: '/info_produtos',
        type: 'GET',
        data: { id: localStorage.getItem('id') },
        dataType: 'json',
        success: function (demandas) {
            container.innerHTML = '';

            demandas.forEach(function (demanda) {
                console.log(demanda.nome);

                function getNomeCor(codigoCor) {
                    return corMap[codigoCor] || 'Cor Desconhecida';
                }

                var item = `
                <div class="container-progresso">
                    <div class="barra-progresso">
                        <div class="progresso"></div>
                    </div>
                    <div class="numeros-progresso">
                        <div class="numero">1</div>
                        <div class="numero">2</div>
                        <div class="numero">3</div>
                        <div class="numero">4</div>
                        <div class="numero">5</div>
                        <div class="numero">6</div>
                    </div>
                    <div id="conteudo">
                        <div class="passo"> 
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-box"></i></p>
                                <p class="texto-demanda">Você está fabricando o sapato <strong>${demanda.nome}</strong></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-gear"></i></i></p>
                                <p class="texto-demanda">Ajuste a temperatura da máquina para <strong>${demanda.tempocalcado}</strong>°C</p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-gear"></i></i></p>
                                <p class="texto-demanda">Ajuste a regulagem do equipamento para <strong>${demanda.reg_equip}</strong></p>
                            </div>
                        </div>
                        <div class="passo"> 
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-paint-bucket"></i></p>
                                <p class="texto-demanda">Pegue a tinta <strong>${demanda.tipotinta}</strong></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-crosshair"></i></p>
                                <p class="texto-demanda">Pegue o material ${demanda.nome_material}</p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-crosshair"></i></p>
                                <p class="texto-demanda">Pegue o solado ${demanda.nomesolado}</p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue o solado do sapato da coloração <span span style="color: ${demanda.cor_solado}; font-weight: bolder;">${getNomeCor(demanda.cor_solado)}<span></p>
                            </div>
                        </div>
                        <div class="passo">
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue o logo do solado do sapato da coloração <span span style="color: ${demanda.cor_logo_solado}; font-weight: bolder;">${getNomeCor(demanda.cor_logo_solado)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a malha do sapato da coloração <span span style="color: ${demanda.cor_malha}; font-weight: bolder;">${getNomeCor(demanda.cor_malha)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue o couro do sapato da coloração <span span style="color: ${demanda.cor_couro}; font-weight: bolder;">${getNomeCor(demanda.cor_couro)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a logo do sapato da coloração <span span style="color: ${demanda.cor_logo}; font-weight: bolder;">${getNomeCor(demanda.cor_logo)}<span></p>
                            </div>
                        </div>
                        <div class="passo">
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a linha da coloração <span style="color: ${demanda.cor_linha}; font-weight: bolder;">${getNomeCor(demanda.cor_linha)}</span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-command"></i></p>
                                <p class="texto-demanda">Faça costuras com a espessura de <strong>${demanda.espelinha}</strong> u.m.</p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-command"></i></p>
                                <p class="texto-demanda">Faça as costuras com o tamanho de <strong>${demanda.tamcosturacalcado}</strong> u.m.</p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-command"></i></p>
                                <p class="texto-demanda">Faça as costuras com o espaçamento de <strong>${demanda.espacamento_da_costura}</strong> u.m.</p>
                            </div>
                        </div>
                        <div class="passo"> 
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a espuma interna do sapato da coloração <span span style="color: ${demanda.cor_espuma_interna}; font-weight: bolder;">${getNomeCor(demanda.cor_espuma_interna)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a língua do sapato da coloração <span span style="color: ${demanda.cor_lingua}; font-weight: bolder;">${getNomeCor(demanda.cor_lingua)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a linha para a lingua do sapato da coloração <span span style="color: ${demanda.cor_linha_lingua}; font-weight: bolder;">${getNomeCor(demanda.cor_linha_lingua)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a etiqueta do sapato da coloração <span span style="color: ${demanda.cor_etiqueta}; font-weight: bolder;">${getNomeCor(demanda.cor_etiqueta)}<span></p>
                            </div>
                        </div>

                        <div class="passo"> 
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-crosshair"></i></p>
                                <p class="texto-demanda">Pegue o cadarço <strong>${demanda.nomecadarco}</strong></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue o cadarço do sapato da coloração <span span style="color: ${demanda.cor_cadarco}; font-weight: bolder;">${getNomeCor(demanda.cor_cadarco)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-palette"></i></p>
                                <p class="texto-demanda">Pegue a etiqueta cadarço do sapato da coloração <span span style="color: ${demanda.cor_bagulho_cardaco}; font-weight: bolder;">${getNomeCor(demanda.cor_bagulho_cardaco)}<span></p>
                            </div>
                            <div class="informacoes-demanda">
                                <p><i class="bi bi-clock"></i></p>
                                <p class="texto-demanda">Deixe o sapato secar por <strong>${demanda.tempsec}</strong> horas</p>
                            </div>
                        </div>

                    </div>
                    <div id="conteiner-botao">
                        <button id="voltar">Voltar</button>
                        <button id="proximo">Próximo</button>
                    </div>
                </div>
                `;
                container.innerHTML += item;
            });

            iniciarNavegacao();
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    });
}
function iniciarNavegacao() {
    $(document).ready(function () {
        let passoAtual = 1;
        const totalPassos = $('.numero').length;
        const barraProgresso = $('.progresso');
        const passos = $('.passo');

        function atualizarPasso() {
            const larguraProgresso = (passoAtual / totalPassos) * 100 + '%';
            barraProgresso.css('width', larguraProgresso);

            $('.numero').removeClass('ativo');
            passos.removeClass('ativo');

            for (let i = 0; i < passoAtual; i++) {
                $('.numero').eq(i).addClass('ativo');
            }
            passos.eq(passoAtual - 1).addClass('ativo');

            if (passoAtual === totalPassos) {
                $('#proximo').attr('type', 'button').text('Enviar');
            } else {
                $('#proximo').attr('type', 'button').text('Próximo');
            }
        }

        $('#proximo').on('click', function () {
            if (passoAtual < totalPassos) {
                passoAtual++;
                atualizarPasso();
            } else if (passoAtual === totalPassos) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: "btn btn-success",
                        cancelButton: "btn btn-danger"
                    },
                });

                swalWithBootstrapButtons.fire({
                    title: "Tem certeza?",
                    text: "Você não poderá reverter isso!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sim, enviar!",
                    cancelButtonText: "Não, cancelar!",
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire({
                            title: 'Enviado com Sucesso!',
                            text: 'Você será redirecionado em breve.',
                            icon: 'success',
                            timer: 2000, 
                            showConfirmButton: false
                        }).then(() => {
                            // Função de conclusão do processo
                            calcadoConcluido();
                            window.location.href = 'http://localhost:3000/info_produtos/front-end/html/selecao.html';
                        });
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire({
                            title: "Cancelado",
                            text: "A ação foi cancelada",
                            icon: "error"
                        });
                    }
                });
            }
        });

        $('#voltar').on('click', function (event) {
            event.preventDefault();
            if (passoAtual > 1) {
                passoAtual--;
                atualizarPasso();
            }
        });

        atualizarPasso();
    });
}


$(document).ready(function () {
    getEtapas();
});