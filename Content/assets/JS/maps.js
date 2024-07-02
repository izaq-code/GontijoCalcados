// Função para transformar os valores de acordo com condições específicas
function transformarValores(valores) {
    return valores.map(valor => 
        valor === 'apple' ? 'APPLE' :
        valor === 'banana' ? 'BANANA' :
        valor === 'cherry' ? 'CHERRY' :
        valor // Mantém o valor original se não atender a nenhuma condição
    );
}

// Array de exemplo recebido do banco de dados
const valores = ['apple', 'banana', 'cherry', 'date'];

// Chama a função para transformar os valores
const valoresTransformados = transformarValores(valores);

console.log(valoresTransformados); // ['APPLE', 'BANANA', 'CHERRY', 'date']

// caso precise de condições mais especificas

// Função para transformar um valor específico
function transformarValor(valor) {
    return valor === 'apple' ? 'APPLE' :
           valor === 'banana' ? 'BANANA' :
           valor === 'cherry' ? 'CHERRY' :
           valor; // Mantém o valor original se não atender a nenhuma condição
}

// Função para transformar os valores de acordo com condições específicas
function transformarValores(valores) {
    return valores.map(transformarValor);
}

// Array de exemplo recebido do banco de dados
const valore = ['apple', 'banana', 'cherry', 'date'];

// Chama a função para transformar os valores
const valoreTransformados = transformarValores(valores);

console.log(valoresTransformados); // ['APPLE', 'BANANA', 'CHERRY', 'date']
