# <img align="center" alt="PHP" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" />  Documentação de Implementação de Autenticação com Google e Login Normal (Node.js)

## Visão Geral

Este sistema de autenticação permite o login de usuários por meio de duas abordagens:
1. **Login com Google** - Utiliza OAuth 2.0 para autenticação com o Google.
2. **Login Normal** - Utiliza um identificador `ra` (registro acadêmico ou equivalente) e uma senha para autenticação.

O sistema é implementado usando Node.js com Express para o servidor web, bcrypt para hashing e verificação de senhas, e axios para comunicação HTTP com APIs externas.

## Configuração Inicial

### Dependências

Instale as dependências necessárias utilizando o npm:

```bash
npm install express body-parser bcrypt axios
```

### Estrutura do Projeto

- **server.js**: Configuração principal do servidor Express.
- **routes/login.js**: Roteador para lidar com autenticação.
- **public/login_register/back-end/js/login.js**: Script de front-end para o login com Google.

## Configuração do Servidor Express

### Arquivo: `server.js`

Este arquivo configura o servidor Express e utiliza o roteador de autenticação.

```javascript
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require('./routes/auth'); // Importa o roteador de autenticação

// Middleware para analisar dados codificados em URL
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração de sessão
app.use(session({
    secret: 'seu-segredo-de-sessao',
    resave: false,
    saveUninitialized: true
}));

// Uso do roteador de autenticação
app.use('/', authRouter);

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
```

## Implementação do Roteador de Autenticação

### Arquivo: `routes/auth.js`

Este arquivo lida com a lógica de autenticação, incluindo login com Google e login normal.

```javascript
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const axios = require('axios');
const { connection2 } = require('../public/chat/js/db.js');

const saltRounds = 10;
const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
const client_secret = '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';
const redirect_uri = 'http://localhost:3000/login-google';

// Função para criar hash da senha
const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log('Senha com hash:', hash);
        return hash;
    } catch (error) {
        console.error('Erro ao criar hash:', error);
    }
};

// Função para verificar senha
const verifyPassword = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

// Rota para login com Google
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
            const userinfo_url = `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token.access_token}`;
            const userinfoResponse = await axios.get(userinfo_url);
            const userinfo = userinfoResponse.data;

            // Tratamento de primeiro login
            if (req.session.tempUser) {
                if (req.session.tempUser.pl === true) {
                    const tuser = req.session.tempUser;
                    connection2.query('UPDATE usuario SET google_id = ?, email = ? , profile_picture = ?, pl = false WHERE id = ?', [
                        userinfo.id,
                        userinfo.email,
                        userinfo.picture,
                        tuser.id
                    ], (error, results) => {
                        if (error) {
                            console.error(error);
                        } else {
                            connection2.query('SELECT * FROM usuario WHERE id = ?', [tuser.id], (error, results) => {
                                if (error) {
                                    console.error(error);
                                } else {
                                    const user = results[0];
                                    req.session.user = user;

                                    if (!req.session.user) {
                                        res.redirect('http://localhost:3000/not-found/front-end/HTML/notfound.html');
                                    }

                                    res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html');
                                }
                            });
                        }
                    });
                }
            }

            // Verificação e inserção de usuário
            connection2.query('SELECT * FROM usuario WHERE email = ?', [userinfo.email], (error, results) => {
                if (error) {
                    console.error(error);
                } else {
                    if (results.length > 0) {
                        req.session.user = results[0];

                        if (!req.session.user) {
                            res.redirect('http://localhost:3000/not-found/front-end/HTML/notfound.html');
                        }

                        res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html');
                    } else {
                        connection2.query('INSERT INTO usuario (google_id, email, name, profile_picture, pl) VALUES (?, ?, ?, ?, ?)', [
                            userinfo.id,
                            userinfo.email,
                            userinfo.name,
                            userinfo.picture,
                            'false'
                        ], (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            req.session.user = userinfo;

                            if (!req.session.user) {
                                res.redirect('http://localhost:3000/not-found/front-end/HTML/notfound.html');
                            }

                            res.redirect('http://localhost:3000/tela_inicial_adm/front-end/HTML/tela_inicial_adm.html');
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

// Rota para login normal
router.post('/login_normal', async (req, res) => {
    if (req.body) {
        console.log(req.body.ra); // Mudado para 'ra'
    }

    connection2.query('SELECT * FROM usuario WHERE ra = ?', [req.body.ra], (error, results) => {
        if (error) {
            console.error(error);
        } else {
            if (results.length > 0) {
                const user = results[0];

                // Verificar a senha
                verifyPassword(req.body.senha, user.senha, (err, isMatch) => {
                    if (err) {
                        console.error('Erro ao verificar a senha:', err);
                        return res.status(500).json({ error: 'Erro interno do servidor' });
                    }

                    if (isMatch) {
                        // Senha correta
                        req.session.tempUser = user;
                        if (!user.pl) {
                            req.session.user = user;
                        }
                        res.json({ success: true, message: 'Login bem sucedido', pl: user.pl });
                    } else {
                        // Senha incorreta
                        res.json({ success: false, message: 'Senha incorreta' });
                    }
                });
            } else {
                // Usuário não encontrado
                res.json({ success: false, message: 'Usuário não encontrado' });
            }
        }
    });
});

module.exports = router;
```

## Código de Front-End para Login com Google

### Arquivo: `public/js/login.js`

Este script gerencia a ação de login com Google no front-end.

```javascript
$(document).ready(function () {
    $('#login-google').click(function (e) {
        e.preventDefault();
        const redirecionar = callback();
        window.location.href = redirecionar;
    });
});

// Função callback para criar a URL de autenticação
function callback() {
    const client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:3000/login-google';
    const scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
    const auth_url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=' + client_id + '&redirect_uri=' + encodeURIComponent(redirect_uri) + '&scope=' + encodeURIComponent(scope);
    return auth_url;
}
```

## Boas Práticas e Segurança

1. **Segurança dos Segredos:**
   - **Não exponha `client_id` e `client_secret` diretamente no código fonte.

** Use variáveis de ambiente para armazená-los com segurança. Utilize pacotes como `dotenv` para gerenciar variáveis de ambiente.

2. **Proteção de Senhas:**
   - **Use `bcrypt` para hashing e verificação de senhas**. O hashing protege as senhas armazenadas contra vazamentos e ataques.

3. **Validação e Sanitização de Dados:**
   - **Sempre valide e sanitize dados de entrada** para evitar ataques de injeção SQL e outros tipos de vulnerabilidades. Considere usar bibliotecas de validação e sanitização, como `validator` ou `express-validator`.

4. **Gerenciamento de Sessão:**
   - **Configure sessões com um segredo forte** e considere usar um armazenamento de sessão persistente para aplicações em produção.

5. **Tratamento de Erros:**
   - **Gerencie e registre erros de forma adequada** para ajudar na depuração e na manutenção da aplicação. Não exponha detalhes sensíveis em mensagens de erro para o usuário final.


## Fontes e Recursos Adicionais

### 1. **Autenticação com Google (OAuth 2.0)**
   - **Documentação Oficial do Google Identity Platform**: [Google Identity Platform Documentation](https://developers.google.com/identity/protocols/oauth2)
   - **Tutorial de OAuth 2.0 no Google Developers**: [OAuth 2.0 Overview](https://developers.google.com/identity/protocols/oauth2)
   - **Guia Prático de Autenticação com Google**: [Quickstart Guide](https://developers.google.com/identity/sign-in/web/sign-in)

### 2. **Node.js e Express**
   - **Documentação Oficial do Node.js**: [Node.js Documentation](https://nodejs.org/en/docs/)
   - **Documentação Oficial do Express.js**: [Express.js Documentation](https://expressjs.com/en/)
   - **Tutorial de Introdução ao Express.js**: [Express.js Getting Started](https://expressjs.com/en/starter/installing.html)

### 3. **Gerenciamento de Sessões em Express**
   - **Documentação do `express-session`**: [express-session Documentation](https://www.npmjs.com/package/express-session)
   - **Tutorial sobre Gerenciamento de Sessões com Express**: [Express Session Management](https://www.digitalocean.com/community/tutorials/how-to-use-express-session)

### 4. **Hashing e Verificação de Senhas com bcrypt**
   - **Documentação do `bcrypt`**: [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
   - **Tutorial sobre como usar bcrypt para Hashing de Senhas**: [bcrypt Tutorial](https://www.npmjs.com/package/bcrypt#usage)

### 5. **Comunicação HTTP com Axios**
   - **Documentação Oficial do Axios**: [Axios Documentation](https://axios-http.com/docs/intro)
   - **Tutorial sobre Axios**: [Axios Guide](https://www.digitalocean.com/community/tutorials/how-to-use-axios-to-make-http-requests)

### 6. **Segurança e Boas Práticas**
   - **Práticas Recomendadas para Segurança em Aplicações Web**: [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
   - **Documentação sobre Validação e Sanitização com Express Validator**: [Express Validator Documentation](https://express-validator.github.io/docs/)
   - **Guia de Proteção de Senhas e Criptografia**: [How to Protect Passwords](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet)

### 7. **Uso de Variáveis de Ambiente**
   - **Documentação do dotenv para Node.js**: [dotenv Documentation](https://www.npmjs.com/package/dotenv)
   - **Tutorial sobre como usar variáveis de ambiente com Node.js**: [Node.js Environment Variables](https://www.digitalocean.com/community/tutorials/how-to-use-environment-variables-with-node-js)

