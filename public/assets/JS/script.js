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

    function setupColorPicker(id, materialName) {
        const categoria = document.querySelector(`#${id}`);

        if (!categoria) {
            console.warn(`Elemento ${id} não encontrado.`);
            return;
        }

        categoria.addEventListener('change', (event) => {
            const corSelecionada = event.target.value;
            updateMaterialColor(materialName, corSelecionada);
            
        });
    }

    modelViewer.addEventListener('load', () => {
        logMaterials();

        setupColorPicker("solado", "Scene_-_Root_1_1.018");
        setupColorPicker("logoSolado", "Scene_-_Root_1_1.019");
        setupColorPicker("cadarco", "Cotton_Twill_1680397.030");
        setupColorPicker("malha", "Leather_2226.012");
        setupColorPicker("lingua", "Leather_Copy_1_1748881.019");
        setupColorPicker("linha", "Default_Topstitch_2348.009");
        setupColorPicker("linhaLingua", "Topstitch_1_1860109.009");
        setupColorPicker("couro", "Leather_Copy_1_1748881.018");
        setupColorPicker("logo", "Leather_Copy_1_1748881.020");
        setupColorPicker("espumainterna", "Cotton_Twill_1463669.009");
        setupColorPicker("etiqueta", "Cotton_Twill_1680397.031");
        setupColorPicker("bagulhodocardaco", "Cotton_Twill_1680397.032");
    });
});
