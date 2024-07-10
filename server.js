const express = require('express');
const bodyParser = require('body-parser');
const { connection1, connection2 } = require('./public/chat/js/db.js');  
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


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

// Rota GET para obter funcionários do banco de dados ProductEase
app.get('/funcionarios', (req, res) => {
    const query = 'SELECT * FROM usuario';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            res.status(500).send('Erro ao buscar funcionários');
            return;
        }
        res.json(results);
    });
});

// Configuração do Socket.io para conexões de clientes
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Exemplo de uso do segundo banco de dados (ProductEase)
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


server.listen(port, () => {
    console.log(`Servidor Node.js escutando na porta ${port}`);
});
