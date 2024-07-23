const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connection1, connection2 } = require('./public/chat/js/db.js');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

const secretKey = crypto.randomBytes(64).toString('hex');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('/messages1', (req, res) => {
    const { user, message, privateChatWith } = req.body;
    const email = req.session.user.email;

    const query = 'INSERT INTO messages (user, id_user, message, privateChatWith, is_read) VALUES (?, ?, ?, ?, FALSE)';
    connection1.query(query, [user, email, message, privateChatWith], (err, results) => {
        if (err) {
            console.error('Erro ao inserir mensagem no banco de dados:', err);
            res.status(500).send('Erro ao inserir mensagem');
            return;
        }
        const mensagemInserida = { user, message, privateChatWith };
        io.emit('chatMessage', mensagemInserida);
        res.status(201).send('Mensagem inserida com sucesso');
    });
});

app.get('/messages1', (req, res) => {
    const privateChatWith = req.query.privateChatWith;
    const emailUsuarioAtual = req.session.user.email;

    let query;
    let queryParams;

    if (privateChatWith) {
        query = `SELECT messages.*, users.foto_user AS foto_usuario, users.user_nome AS nome_usuario
                 FROM messages
                 LEFT JOIN users ON messages.id_user = users.email_user
                 WHERE (id_user = ? AND privateChatWith = ?) 
                 OR (id_user = ? AND privateChatWith = ?) 
                 ORDER BY timestamp DESC`;
        queryParams = [emailUsuarioAtual, privateChatWith, privateChatWith, emailUsuarioAtual];
    } else {
        query = `SELECT messages.*, users.foto_user AS foto_usuario, users.user_nome AS nome_usuario
                 FROM messages
                 LEFT JOIN users ON messages.id_user = users.email_user
                 WHERE privateChatWith IS NULL
                 ORDER BY timestamp DESC`;
        queryParams = [];
    }

    connection1.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens do banco de dados:', err);
            res.status(500).send('Erro ao buscar mensagens');
            return;
        }
        res.json(results);
    });
});

app.post('/messages/read', (req, res) => {
    const { messageId } = req.body;
    const emailUsuarioAtual = req.session.user.email;

    const query = 'UPDATE messages SET is_read = TRUE WHERE id = ? AND privateChatWith = ?';
    connection1.query(query, [messageId, emailUsuarioAtual], (err) => {
        if (err) {
            console.error('Erro ao atualizar status de leitura da mensagem:', err);
            res.status(500).send('Erro ao atualizar status de leitura');
            return;
        }
        res.status(200).send('Status de leitura atualizado com sucesso');
    });
});

app.get('/users', (req, res) => {
    const currentUserEmail = req.session.user.email;

    const query = 'SELECT * FROM users WHERE email_user != ?';
    connection1.query(query, [currentUserEmail], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro ao buscar usuários' });
            return;
        }
        res.json(results);
    });
});

app.get('/ultimaMensagem', (req, res) => {
    const privateChatWith = req.query.privateChatWith;
    const currentUserEmail = req.session.user.email;

    let query;
    let queryParams;

    if (privateChatWith) {
        query = `SELECT * 
                 FROM messages 
                 WHERE (id_user = ? AND privateChatWith = ?) OR (id_user = ? AND privateChatWith = ?) 
                 ORDER BY timestamp DESC 
                 LIMIT 1
                `;
        queryParams = [currentUserEmail, privateChatWith, privateChatWith, currentUserEmail];
    } else {
        query = `SELECT messages.*, users.user_nome AS nome_usuario
                 FROM messages 
                 LEFT JOIN users ON messages.id_user = users.email_user
                 WHERE privateChatWith IS NULL 
                 ORDER BY timestamp DESC 
                 LIMIT 1
                `;
        queryParams = [];
    }

    connection1.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Erro ao buscar última mensagem do banco de dados:', err);
            res.status(500).send('Erro ao buscar última mensagem');
            return;
        }
        res.json(results);
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});