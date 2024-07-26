const bcrypt = require('bcrypt');
const saltRounds = 10;

// Função para criar um hash da senha
const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Senha com hash:', hash);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
    }
};

// Função para verificar a senha
const verifyPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        console.log('Senha correta?', isMatch);
        return isMatch;
    } catch (error) {
        console.error('Erro ao verificar a senha:', error);
    }
};

// Exemplo de uso
const password = 'admin';

// Cria o hash da senha
hashPassword(password).then((hashedPassword) => {
    // Verifica a senha com o hash gerado
    verifyPassword(password, hashedPassword);
});
