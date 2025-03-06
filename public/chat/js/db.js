const mysql = require('mysql');

// Configuração da conexão com o banco 'chat_app'
const connection1 = mysql.createConnection({
  host: '189.12.207.45',  // Seu IP público
  user: 'isaque',          // Nome do usuário MySQL
  password: '30115912',    // Senha do usuário MySQL
  database: 'chat_app'     // Nome do banco de dados 'chat_app'
});

// Configuração da conexão com o banco 'ProductEase'
const connection2 = mysql.createConnection({
  host: '189.12.207.45',  // Seu IP público
  user: 'isaque',          // Nome do usuário MySQL
  password: '30115912',    // Senha do usuário MySQL
  database: 'ProductEase'  // Nome do banco de dados 'ProductEase'
});

// Função para conectar e tratar erros
const connectToDB = (connection, dbName) => {
  connection.connect((err) => {
    if (err) {
      console.error(`Erro ao conectar ao banco de dados ${dbName}:`, err);
      return;
    }
    console.log(`Conectado ao banco de dados ${dbName}`);
  });
};

// Conectar aos dois bancos
connectToDB(connection1, 'chat_app');
connectToDB(connection2, 'ProductEase');

// Exportar as conexões para uso em outros arquivos
module.exports = {
  connection1,
  connection2
};
