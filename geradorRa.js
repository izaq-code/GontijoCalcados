// gerarRA.js

const readline = require('readline');

// Configuração para ler a entrada do console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calcularNivel(soma) {
    if (soma === 17) return 'Funcionário comum';
    if (soma === 23) return 'Supervisor';
    if (soma === 31) return 'Diretor';
    return 'Nível desconhecido';
}

function gerarRA(desejado) {
    let numero = '';
    let soma = 0;

    while (true) {
        numero = '';
        soma = 0;

        for (let i = 0; i < 6; i++) {
            const digito = gerarNumeroAleatorio(0, 9);
            numero += digito;
            soma += digito;
        }

        const nivel = calcularNivel(soma);

        // Se o nível corresponde ao desejado, retorne o RA
        if (nivel === desejado) {
            return {
                numero,
                soma,
                nivel
            };
        }
    }
}

// Função para escolher o nível do usuário
function escolherNivel() {
    rl.question('Escolha o nível (1 - Funcionário comum, 2 - Supervisor, 3 - Diretor): ', (resposta) => {
        let nivelEscolhido;

        switch (resposta.trim()) {
            case '1':
                nivelEscolhido = 'Funcionário comum';
                break;
            case '2':
                nivelEscolhido = 'Supervisor';
                break;
            case '3':
                nivelEscolhido = 'Diretor';
                break;
            default:
                console.log('Opção inválida. Tente novamente.');
                rl.close();
                return;
        }

        const ra = gerarRA(nivelEscolhido);
        console.log(`RA: ${ra.numero}`);
        console.log(`Soma: ${ra.soma}`);
        console.log(`Nível: ${ra.nivel}`);

        rl.close();
    });
}

// Inicia o processo de escolha de nível
escolherNivel();
