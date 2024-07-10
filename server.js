const express = require('express');
const bodyParser = require('body-parser');
const { connection1, connection2 } = require('./public/chat/js/db.js');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const axios = require('axios');

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

// (prestes a descobrir o que só os loucos sabem)
//rota para buscar as paradas do login

// parametros para montar o token

const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'http://localhost:3000/login-google';

//fim dos parametros

//primeira query
app.get('/login-google', async (req, res) => {
    if (req.query.code) {
        const code = req.query.code;

        const token_url = 'https://accounts.google.com/o/oauth2/token';
        const params = new URLSearchParams();
        params.append('code', code);
        params.append('client_id', client_id);
        params.append('client_secret', client_secret);
        params.append('redirect_uri', redirect_uri);
        params.append('grant_type', 'authorization_code');

        try {
            const response = await axios.post(token_url, params);
            const token = response.data;

            //resgatando informações do usuario

            const userinfo_url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`;
            const userinfoResponse = await axios.get(userinfo_url);
            const userinfo = userinfoResponse.data;

            //verifcando se o usuario já existe no banco de dados

            connection2.query('SELECT * FROM usuario WHERE email = ?', [userinfo.email], (error, results) => {

                if (error) {
                    console.error(error)
                } else {
                    if (results.length > 0) {
                        req.session.user = results[0];
                        res.redirect('http://localhost/GONTIJOCALCADOS/src/padr%c3%a3o/front-end/HTML/padr%c3%a3o.html');
                    } else {
                        // Inserir novo usuário
                        connection2.query('INSERT INTO usuario (google_id, email, name, profile_picture) VALUES (?, ?, ?, ?)', [
                            userinfo.id,
                            userinfo.email,
                            userinfo.name,
                            userinfo.picture
                        ], (error, results) => {

                            if (error){
                                console.log(error);
                            }

                            req.session.user = userinfo;
                            res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/padr%c3%a3o.html');
                        });


                    }
                }
            });



        } catch (error) {
            console.error('Erro ao obter o token:', error);
            res.status(500).send('Erro ao obter o token');
        }
    } else {
        res.status(400).send('Código não encontrado');
    }
});

//favela venceu, fim 

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
