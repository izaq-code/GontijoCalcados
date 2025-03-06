const mysql = require('mysql');

const connection1 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chat_app'
});

const connection2 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ProductEase'
});

connection1.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao primeiro banco de dados:', err);
    return;
  }
  console.log('Conectado ao primeiro banco de dados');
});

connection2.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao segundo banco de dados:', err);
    return;
  }
  console.log('Conectado ao segundo banco de dados');
});

module.exports = {
  connection1,
  connection2
};
