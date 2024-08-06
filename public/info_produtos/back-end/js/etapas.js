const corMap = {
    '#FFD700': 'Dourado',
    '#4B0082': 'Índigo',
    '#00FFFF': 'Ciano',
    '#7FFF00': 'Verde Limão',
    '#FF6347': 'Tomate',
    '#40E0D0': 'Turquesa',
    '#FF1493': 'Deep Pink',
    '#1E90FF': 'Azul Dodger',
    '#32CD32': 'Lime Green',
    '#FFDAB9': 'Pêssego',
    '#D3D3D3': 'Cinza Claro',
    '#A0522D': 'Marrom',
    '#FF4500': 'Laranja Vermelho',
    '#DAA520': 'Ouro Escuro',
    '#FF69B4': 'Hot Pink',
    '#7CFC00': 'Verde Claro',
    '#FF8C00': 'Laranja Escuro',
    '#800080': 'Roxo',
    '#00FF00': 'Verde Neon',
    '#FF00FF': 'Magenta'
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
                <div class="informacoes-demanda">
                    <p><strong>Nome:</strong></p>
                    <p>${demanda.nome}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Tipo de Tinta:</strong></p>
                    <p>${demanda.tipotinta}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Espelinha:</strong></p>
                    <p>${demanda.espelinha}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Espaçamento da Costura:</strong></p>
                    <p>${demanda.espacamento_da_costura}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Tamanho Costura Calçado:</strong></p>
                    <p>${demanda.tamcosturacalcado}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Linha:</strong></p>
                    <p>${getNomeCor(demanda.cor_linha)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Tempo Calçado:</strong></p>
                    <p>${demanda.tempocalcado}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Tempo Secagem:</strong></p>
                    <p>${demanda.tempsec}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Registro Equipamento:</strong></p>
                    <p>${demanda.reg_equip}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Solado:</strong></p>
                    <p>${getNomeCor(demanda.cor_solado)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Logo do Solado:</strong></p>
                    <p>${getNomeCor(demanda.cor_logo_solado)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Cadarço:</strong></p>
                    <p>${getNomeCor(demanda.cor_cadarco)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Malha:</strong></p>
                    <p>${getNomeCor(demanda.cor_malha)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Língua:</strong></p>
                    <p>${getNomeCor(demanda.cor_lingua)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Linha da Língua:</strong></p>
                    <p>${getNomeCor(demanda.cor_linha_lingua)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Couro:</strong></p>
                    <p>${getNomeCor(demanda.cor_couro)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Logo:</strong></p>
                    <p>${getNomeCor(demanda.cor_logo)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Espuma Interna:</strong></p>
                    <p>${getNomeCor(demanda.cor_espuma_interna)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor da Etiqueta:</strong></p>
                    <p>${getNomeCor(demanda.cor_etiqueta)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Cor do Bagulho do Cadarço:</strong></p>
                    <p>${getNomeCor(demanda.cor_bagulho_cardaco)}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Nome da Tinta:</strong></p>
                    <p>${demanda.nometinta}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Nome do Material:</strong></p>
                    <p>${demanda.nome_material}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Nome do Cadraço:</strong></p>
                    <p>${demanda.nomecadarco}</p>
                </div>
                <div class="informacoes-demanda">
                    <p><strong>Nome do Solado:</strong></p>
                    <p>${demanda.nomesolado}</p>
                </div>
                `;

                container.innerHTML += item;
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar feedbacks:', error);
        }
    });
}

$(document).ready(function () {
    getEtapas();
});