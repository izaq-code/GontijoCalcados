const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios');
const { connection2 } = require('../public/chat/js/db.js');

// Hash de senha (se necessário)
const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Senha com hash:', hash);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
    }
};

// Verificação de senha
const verifyPassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Middleware para analisar dados codificados em URL
app.use(bodyParser.urlencoded({ extended: true }));

// Parâmetros para montar o token
const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'http://localhost:3000/login-google';

// Primeira query
router.get('/login-google', async (req, res) => {
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

            // Resgatando informações do usuário
            const userinfo_url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`;
            const userinfoResponse = await axios.get(userinfo_url);
            const userinfo = userinfoResponse.data;

            // Testando primeiro login
            if (req.session.tempUser && req.session.tempUser.pl) {
                const tuser = req.session.tempUser;

                connection2.query('SELECT * FROM usuario WHERE email = ?', [userinfo.email], (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Erro ao consultar usuário');
                    } 

                    if (results.length > 0) {
                        return res.redirect('http://localhost:3000/userJaCadastrado/front-end/HTML/userJaCadastrado.html');
                    } 

                    connection2.query('UPDATE usuario SET google_id = ?, email = ? , profile_picture = ?, pl = false WHERE id = ?', [
                        userinfo.id,
                        userinfo.email,
                        userinfo.picture,
                        tuser.id
                    ], (error, results) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send('Erro ao atualizar usuário');
                        }

                        connection2.query('SELECT * FROM usuario WHERE id = ?', [tuser.id], (error, results) => {
                            if (error) {
                                console.error(error);
                                return res.status(500).send('Erro ao consultar usuário');
                            }

                            const user = results[0];
                            req.session.user = user;

                            return res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html');
                        });
                    });
                });
            } else {
                // Verificando se o usuário já existe no banco de dados
                connection2.query('SELECT * FROM usuario WHERE email = ?', [userinfo.email], (error, results) => {
                    if (error) {
                        console.error(error);
                        return res.status(500).send('Erro ao consultar usuário');
                    }

                    if (results.length > 0) {
                        req.session.user = results[0];
                        return res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html');
                    } else {
                        return res.redirect('http://localhost:3000/userNotFound/front-end/HTML/userNotFound.html');
                    }
                });
            }
        } catch (error) {
            console.error('Erro ao obter o token:', error);
            return res.status(500).send('Erro ao obter o token');
        }
    } else {
        return res.status(400).send('Código não encontrado');
    }
});

router.post('/login_normal', (req, res) => {
    connection2.query('SELECT * FROM usuario WHERE ra = ?', [req.body.email], (error, results) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        if (results.length > 0) {
            const user = results[0];

            // Verificar a senha
            verifyPassword(req.body.senha, user.senha, (err, isMatch) => {
                if (err) {
                    console.error('Erro ao verificar a senha:', err);
                    return res.status(500).json({ error: 'Erro interno do servidor' });
                }

                if (isMatch) {
                    user.pl ? req.session.tempUser = user : req.session.user = user;
                    return res.json({ success: true, message: 'Login bem-sucedido', pl: user.pl });
                } else {
                    return res.json({ success: false, message: '404' });
                }
            });
        } else {
            return res.json({ success: false, message: '404' });
        }
    });
});

module.exports = router;
