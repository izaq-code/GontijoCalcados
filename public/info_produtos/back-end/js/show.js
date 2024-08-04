document.addEventListener('DOMContentLoaded', () => {
    const modelViewer = document.querySelector("#visualizadorSapato");

    if (!modelViewer) {
        console.error('Elemento #visualizadorSapato não encontrado.');
        return;
    }

    function logMaterials() {
        if (modelViewer.model && modelViewer.model.materials) {
            const materials = modelViewer.model.materials;
            console.log("Materiais disponíveis no modelo:");
            materials.forEach((material, index) => {
                console.log(`Material ${index + 1}: Nome: ${material.name}`);
            });
        } else {
            console.error('Modelo ou materiais não encontrados.');
        }
    }

    function updateMaterialColor(materialName, color) {
        if (modelViewer.model && modelViewer.model.materials) {
            const materials = modelViewer.model.materials;

            let materialFound = false;
            for (const material of materials) {
                if (material.name === materialName) {
                    material.pbrMetallicRoughness.setBaseColorFactor(color);
                    materialFound = true;
                    console.log(`Atualizado a cor de ${materialName} para ${color}`);
                    break;
                }
            }

            if (!materialFound) {
                console.warn(`Material ${materialName} não encontrado.`);
            }
        }
    }

    function setupColorPicker(id, color) {
        const materialNameMapping = {
            solado: 'Scene_-_Root_1_1.018',
            logoSolado: 'Scene_-_Root_1_1.019',
            cadarco: 'Default_Topstitch_2348.009',
            malha: 'Topstitch_1_1860109.009',
            lingua: 'Leather_Copy_1_1748881.018',
            linha: 'Leather_Copy_1_1748881.020',
            linhaLingua: 'Cotton_Twill_1680397.030',
            couro: 'Leather_2226.012',
            logo: 'Leather_Copy_1_1748881.019',
            espumainterna: 'Cotton_Twill_1463669.009',
            etiqueta: 'Cotton_Twill_1680397.031',
            bagulhodocardaco: 'Cotton_Twill_1680397.032'
        };

        const materialName = materialNameMapping[id];
        if (!materialName) {
            console.warn(`Nome do material para ${id} não encontrado no mapeamento.`);
            return;
        }

        const modelViewer = document.querySelector("#visualizadorSapato");

        if (modelViewer && modelViewer.model && modelViewer.model.materials) {
            const material = modelViewer.model.materials.find(mat => mat.name === materialName);

            if (material) {
                material.pbrMetallicRoughness.setBaseColorFactor(color);
                console.log(`Cor ${color} aplicada ao material ${materialName}.`);
            } else {
                console.warn(`Material ${materialName} não encontrado no modelo.`);
            }
        } else {
            console.error('Modelo ou materiais não encontrados.');
        }
    }

    function atualizarSelects(item) {
        const corOptions = {
            solado: item['cor_solado'],
            logoSolado: item['cor_logo_solado'],
            cadarco: item['cor_cadarco'],
            malha: item['cor_malha'],
            lingua: item['cor_lingua'],
            linha: item['cor_linha'],
            linhaLingua: item['cor_linha_lingua'],
            couro: item['cor_couro'],
            logo: item['cor_logo'],
            espumainterna: item['cor_espuma_interna'],
            etiqueta: item['cor_etiqueta'],
            bagulhodocardaco: item['cor_bagulho_cardaco']
        };

        function setSelectColor(id, color) {
            const select = document.getElementById(id);
            if (select) {
                select.innerHTML = ''; 
                const option = document.createElement('option');
                option.value = color;
                option.textContent = color;
                select.appendChild(option);


                select.value = color;
            }
        }

        for (const [key, color] of Object.entries(corOptions)) {
            setSelectColor(key, color);
        }
    }

    function exibir(item) {
        $('#img').html($('<img>').attr('src', item['img']));
        $('#nome').text('Nome: ' + item['nome']);
        $('#tipo_tinta').text('Tipo de Tinta: ' + item['tipotinta']);
        $('#espe_linha').text('Espessura da Linha: ' + item['espelinha']);
        $('#nome_solado').text('Nome do Solado: ' + item['nomesolado']);
        $('#nome_cadarco').text('Nome do Cadarço: ' + item['nomecadarco']);
        $('#tempo_calcado').text('Tempo do Calçado: ' + item['tempocalcado']);
        $('#nome_tinta').text('Nome da Tinta: ' + item['nometinta']);
        $('#corlinhacalcado').text('Cor da Linha do Calçado: ' + item['corlinhacalcado']);
        $('#temcosturacalcado').text('Tempo de Costura do Calçado: ' + item['temcosturacalcado']);
        $('#temp_sec').text('Tempo de Secagem: ' + item['tempsec']);
    }

    $.ajax({
        type: 'GET',
        url: '/info_produtos',
        data: { id: localStorage.getItem('id') },
        dataType: 'json',
        success: function(data) {
            console.log(data)
            if (data && data.length > 0) {
                exibir(data[0]);
                atualizarSelects(data[0]);
                modelViewer.addEventListener('load', () => {
                    logMaterials();
                    const corOptions = {
                        solado: document.querySelector("#solado").value,
                        logoSolado: document.querySelector("#logoSolado").value,
                        cadarco: document.querySelector("#cadarco").value,
                        malha: document.querySelector("#malha").value,
                        lingua: document.querySelector("#lingua").value,
                        linha: document.querySelector("#linha").value,
                        linhaLingua: document.querySelector("#linhaLingua").value,
                        couro: document.querySelector("#couro").value,
                        logo: document.querySelector("#logo").value,
                        espumainterna: document.querySelector("#espumainterna").value,
                        etiqueta: document.querySelector("#etiqueta").value,
                        bagulhodocardaco: document.querySelector("#bagulhodocardaco").value
                    };

                    for (const [key, color] of Object.entries(corOptions)) {
                        setupColorPicker(key, color);
                    }
                });
            } else {
                alert('Nenhum modelo encontrado.');
            }
        },
        error: function(err) {
            console.error('Erro na requisição AJAX:', err);
            alert('Erro ao buscar dados. Verifique o console para mais detalhes.');
        }
    });


    document.querySelectorAll("#cores select").forEach(select => {
        select.addEventListener("change", event => {
            const id = event.target.id;
            const color = event.target.value;
            setupColorPicker(id, color);
        });
    });
});
