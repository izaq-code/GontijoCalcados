const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connection1, connection2 } = require('./public/chat/js/db.js');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const axios = require('axios');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

app.use(bodyParser.json());

// Gerar uma chave secreta segura
const crypto = require('crypto');// pede pro Node.js para gerar uma sequência aleatória de bytes.
const secretKey = crypto.randomBytes(64).toString('hex');//crypto.randomBytes(64) gera 64 bytes de dados aleatórios.
//.toString('hex') converte esses bytes em uma string hexadecimal, que é mais fácil de gerenciar e armazenar.

// Session middleware setup
app.use(session({ //Aqui, está sendo configurado o middleware de sessão para o Express usando app.use(session({...})).
    secret: secretKey, // Use a chave secreta gerada //secret: secretKey: Utiliza a chave secreta gerada anteriormente para assinar os cookies de sessão. Isso garante que os cookies só possam ser lidos e modificados pelo servidor.
    resave: false,//resave: false: Evita salvar sessões que não foram modificadas durante o pedido. Isso ajuda a otimizar o desempenho.
    saveUninitialized: true,//saveUninitialized: true: Salva sessões mesmo que elas não tenham sido inicializadas com dados. Pode ser útil para criar sessões automaticamente.
    cookie: { secure: false } // Set to true if using HTTPS

    //cookie: { secure: false }: Configurações do cookie de sessão. secure: false significa que o cookie será enviado via HTTP, não apenas HTTPS. Se estiver usando HTTPS, deve ser definido como true para garantir a segurança.
}));


app.post('/messages1', (req, res) => {
    const { user, message } = req.body;
    const email = req.session.user.email;
    const query = 'INSERT INTO messages (user, id_user, message) VALUES (?, ?, ?)';
    connection1.query(query, [user, email ,message], (err, results) => {
        if (err) {
            console.error('Erro ao inserir mensagem no primeiro banco de dados:', err);
            res.status(500).send('Erro ao inserir mensagem');
            return;
        }
        const insertedMessage = { user, message };
        io.emit('chatMessage', insertedMessage);
        res.status(201).send('Mensagem inserida com sucesso');
    });
});

app.get('/messages1', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY timestamp DESC';
    connection1.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens do primeiro banco de dados:', err);
            res.status(500).send('Erro ao buscar mensagens');
            return;
        }
        res.json(results);
    });
});
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// carregegar as rotas no modo dinamico
fs.readdirSync(path.join(__dirname, 'routes')).forEach((file) => {
    const route = require(`./routes/${file}`);
    app.use('/', route);
});

app.use((req, res) => {
    res.status(404).redirect('/not-found/front-end/html/notfound.html');
});

server.listen(port, () => {
    console.log(`Servidor Node.js escutando na porta ${port}`);
});

// Configuração do Socket.io para conexões de clientes
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    connection2.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados do segundo banco de dados:', err);
            return;
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

