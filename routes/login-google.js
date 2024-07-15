const express = require('express');
const router = express.Router();
const axios = require('axios');
const { connection2 } = require('../public/chat/js/db.js');

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

            // Resgatando informações do usuario
            const userinfo_url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`;
            const userinfoResponse = await axios.get(userinfo_url);
            const userinfo = userinfoResponse.data;

            // Verificando se o usuario já existe no banco de dados
            connection2.query('SELECT * FROM usuario WHERE email = ?', [userinfo.email], (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    if (results.length > 0) {
                        req.session.user = results[0];

                        if (!req.session.user){
                            res.redirect('http://localhost:3000/not-found/front-end/HTML/notfound.html');
                        }

                        res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/padr%c3%a3o.html');
                    } else {
                        // Inserir novo usuário
                        connection2.query('INSERT INTO usuario (google_id, email, name, profile_picture) VALUES (?, ?, ?, ?)', [
                            userinfo.id,
                            userinfo.email,
                            userinfo.name,
                            userinfo.picture
                        ], (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            req.session.user = userinfo;

                            if (!req.session.user){
                                res.redirect('http://localhost:3000/not-found/front-end/HTML/notfound.html');
                            }

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

module.exports = router;
