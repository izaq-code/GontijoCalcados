const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Importar o módulo 'path'

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota POST para receber novas mensagens
app.post('/messages', (req, res) => {
    const { user, message } = req.body;
    const query = 'INSERT INTO messages (user, message) VALUES (?, ?)';
    db.query(query, [user, message], (err, results) => {
        if (err) {
            console.error('Erro ao inserir mensagem:', err);
            res.status(500).send('Erro ao inserir mensagem');
            return;
        }
        const insertedMessage = { user, message };
        io.emit('chatMessage', insertedMessage); // Emitir para todos os clientes conectados
        res.status(201).send('Mensagem inserida com sucesso');
    });
});

// Rota GET para obter todas as mensagens
app.get('/messages', (req, res) => {
    const query = 'SELECT * FROM messages ORDER BY timestamp DESC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens:', err);
            res.status(500).send('Erro ao buscar mensagens');
            return;
        }
        res.json(results);
    });
});

// Configuração do Socket.io para conexões de clientes
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Enviar mensagens iniciais ao cliente
    db.query('SELECT * FROM messages ORDER BY timestamp DESC', (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens iniciais:', err);
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
