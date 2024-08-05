const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { connection2 } = require('../public/chat/js/db.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Configuração do Nodemailer
var transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "70a8bd7767a2d1204fe3fd003fcfeb8d"
  }
});


// owpt duzy kcwz tvot
function generateRandomCode() {
  return crypto.randomBytes(3).toString('hex'); // Gera um código aleatório de 6 caracteres
}

// Middleware para analisar dados codificados em URL e JSON
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/rec_senha', (req, res) => {
  const { email } = req.body;
  connection2.query('SELECT * FROM USUARIO WHERE email = ?', [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: 'Erro ao acessar o banco de dados', error });
    }
    
    if (results.length === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
    
    const resetCode = generateRandomCode();

    const mailOptions = {
      from: 'mailtrap@demomailtrap.com',
      to: 'goncalvestiago397@gmail.com',
      subject: 'Recuperação de Senha',
      text: `Seu código de recuperação de senha é: ${resetCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send({ message: 'Erro ao enviar e-mail', error });
      }
      res.status(200).send({ message: 'E-mail enviado com sucesso' }); // Você pode armazenar o resetCode em seu banco de dados
    });
  });
});

module.exports = router;
