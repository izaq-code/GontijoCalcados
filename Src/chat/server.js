const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'chat', 'js')));
app.use(express.static(path.join(__dirname, 'public', 'chat', 'css')));
// Rota para servir a página index.html (deve estar fora do escopo do diretório 'Src')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  './public','./chat','./html', 'chat.html'));   
});


// Rota POST para receber novas mensagens no primeiro banco de dados (chat_app)
app.post('/messages1', (req, res) => {
    const { user, message } = req.body;
    const query = 'INSERT INTO messages (user, message) VALUES (?, ?)';
    connection1.query(query, [user, message], (err, results) => {
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

// Rota POST para receber novas mensagens no segundo banco de dados (ProductEase)
app.post('/messages1', (req, res) => {
    const { user, message } = req.body;
    const query = 'INSERT INTO messages (user, message) VALUES (?, ?)';
    connection2.query(query, [user, message], (err, results) => {
        if (err) {
            console.error('Erro ao inserir mensagem no segundo banco de dados:', err);
            res.status(500).send('Erro ao inserir mensagem');
            return;
        }
        const insertedMessage = { user, message };
        io.emit('chatMessage', insertedMessage);
        res.status(201).send('Mensagem inserida com sucesso');
    });
});

// Rota GET para obter todas as mensagens do primeiro banco de dados (chat_app)
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

// Rota GET para obter todas as mensagens do segundo banco de dados (ProductEase)
app.get('/messages1', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY timestamp DESC';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens do segundo banco de dados:', err);
            res.status(500).send('Erro ao buscar mensagens');
            return;
        }
        res.json(results);
    });
});

// Configuração do Socket.io para conexões de clientes
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Enviar mensagens iniciais do primeiro banco de dados ao cliente
    connection1.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens iniciais do primeiro banco de dados:', err);
            return;
        }
        socket.emit('initialMessages', results);
    });

    // Enviar mensagens iniciais do segundo banco de dados ao cliente
    connection1.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens iniciais do segundo banco de dados:', err);
            return;
        }
        socket.emit('initialMessages', results);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar o servidor Node.js
server.listen(port, () => {
    console.log(`Servidor Node.js escutando na porta ${port}`);
});
