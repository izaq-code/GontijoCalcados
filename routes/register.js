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
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
        throw error;
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
router.post('/register', async (req, res) => {
    try {

         const {nome, senha, nivel} = req.body;
        const nivelEscolhido = escolherNivel(nivel);
        
        // Tenta gerar um RA único
        const raUnico = await gerarRAUnico(nivelEscolhido.nivel);
        const ra = raUnico.numero;
        const funcao = raUnico.nivel;


        //criando a senha com hash
        const hashedPassword = await hashPassword(senha);

        const emailPadrao = ra + '@gmail.com';
        const fotoPadrao = "../../../assets/imagens/sem-foto.png";

        // Obtenha outros dados do corpo da requisição
        //continua aqui ... (amanhã, já bati ponto hoje)
        connection2.query(
            'INSERT INTO usuario (RA, name, email,  senha, funcao, profile_picture) VALUES (?, ?, ?, ?, ?, ?)',
            [ra, nome, emailPadrao, hashedPassword, funcao, fotoPadrao],
            (error) => {
                if (error) {
                    console.error('Erro ao inserir dados no banco de dados:', error);
                    res.status(500).send('Erro ao registrar usuário');
                    res.json('Erro ao registrar usuário');
                } else {
                    res.json({true: true, response: 'cadastrado com sucesso', ra, nome, emailPadrao, funcao, fotoPadrao }); // Responde com dados do usuário registrado
                }
            }
        );




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
