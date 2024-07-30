const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { connection2 } = require('../public/chat/js/db.js');

// Middleware para análise de dados codificados em URL
router.use(bodyParser.urlencoded({ extended: true }));

// Função para criar hash da senha
const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Senha com hash:', hash);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw error; // Propaga o erro para quem chamou a função
    }
};

// Função para verificar se o RA já existe no banco de dados
const verificarRAExistente = (ra) => {
    return new Promise((resolve, reject) => {
        connection2.query('SELECT * FROM usuario WHERE RA = ?', [ra], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0); // Retorna true se o RA já existe
            }
        });
    });
};

// Função para gerar um novo RA garantido único
const gerarRAUnico = async (nivelDesejado, maxTentativas = 10) => {
    for (let tentativa = 0; tentativa < maxTentativas; tentativa++) {
        const ra = gerarRA(nivelDesejado);
        const raExiste = await verificarRAExistente(ra.numero);

        if (!raExiste) {
            return ra; // Retorna o RA se ele não existe
        }
    }
    throw new Error('Não foi possível gerar um RA único após múltiplas tentativas');
};

// Rota de registro
router.get('/register', async (req, res) => {
    try {
        const nivel = req.body.nivel || 2; // Default para 2 se não fornecido
        const nivelEscolhido = escolherNivel(nivel);
        
        // Tenta gerar um RA único
        const raUnico = await gerarRAUnico(nivelEscolhido.nivel);

        // Obtenha outros dados do corpo da requisição
        //continua aqui ... (amanhã, já bati ponto hoje)

        res.json(raUnico)


    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
});

// Função para escolher o nível com base no valor fornecido
function escolherNivel(nivel) {
    const niveis = {
        '1': 'Funcionário comum',
        '2': 'Supervisor',
        '3': 'Diretor'
    };

    const nivelEscolhido = niveis[nivel] || 'Nível desconhecido';
    const ra = gerarRA(nivelEscolhido);

    console.log(`RA: ${ra.numero}`);
    console.log(`Soma: ${ra.soma}`);
    console.log(`Nível: ${ra.nivel}`);

    return ra;
}

// Função para gerar RA com base no nível desejado
function gerarRA(desejado) {
    let numero;
    let soma;

    while (true) {
        numero = '';
        soma = 0;

        for (let i = 0; i < 6; i++) {
            const digito = gerarNumeroAleatorio(0, 9);
            numero += digito;
            soma += digito;
        }

        const nivel = calcularNivel(soma);

        if (nivel === desejado) {
            return {
                numero,
                soma,
                nivel
            };
        }
    }
}

// Função para calcular o nível baseado na soma
function calcularNivel(soma) {
    if (soma === 17) return 'Funcionário comum';
    if (soma === 23) return 'Supervisor';
    if (soma === 31) return 'Diretor';
    return 'Nível desconhecido';
}

// Função para gerar um número aleatório entre min e max
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = router;
