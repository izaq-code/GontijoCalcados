# Documentação de Pacotes npm e Node.js

## Introdução ao Node.js

Node.js é uma plataforma de desenvolvimento de código aberto baseada no mecanismo V8 do Google Chrome. Ele permite que você execute JavaScript no servidor, o que possibilita criar aplicações web escaláveis e de alto desempenho. O Node.js é conhecido por seu modelo de I/O não-bloqueante e orientado a eventos, o que o torna eficiente para aplicações que requerem alta escalabilidade e performance.

## Pacotes npm Utilizados

### 1. `express`

- **Descrição**: Express é um framework minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para criar aplicações web e APIs.
- **Instalação**: `npm install express`
- **Exemplo de Uso**:
    ```javascript
    const express = require('express');
    const app = express();

    app.get('/', (req, res) => {
        res.send('Hello World');
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    ```
- **Funcionalidades**:
    - Configuração de rotas
    - Middleware para manipulação de requisições/respostas
    - Gerenciamento de servidores web

### 2. `body-parser`

- **Descrição**: Middleware para Express que facilita a leitura e interpretação dos corpos das requisições HTTP, especialmente útil para parsing de dados JSON e URL-encoded.
- **Instalação**: `npm install body-parser`
- **Exemplo de Uso**:
    ```javascript
    const bodyParser = require('body-parser');
    const express = require('express');
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.post('/submit', (req, res) => {
        res.send(`Dados recebidos: ${req.body}`);
    });
    ```
- **Funcionalidades**:
    - Parsing de dados URL-encoded
    - Parsing de dados JSON
    - Facilita a manipulação de dados de formulários

### 3. `express-session`

- **Descrição**: Middleware para Express que facilita o gerenciamento de sessões de usuário. Permite armazenar e recuperar dados entre requisições.
- **Instalação**: `npm install express-session`
- **Exemplo de Uso**:
    ```javascript
    const session = require('express-session');
    const express = require('express');
    const app = express();

    app.use(session({
        secret: 'chave_secreta',
        resave: false,
        saveUninitialized: true
    }));

    app.get('/', (req, res) => {
        if (!req.session.views) {
            req.session.views = 1;
        } else {
            req.session.views++;
        }
        res.send(`Você visitou esta página ${req.session.views} vezes`);
    });
    ```
- **Funcionalidades**:
    - Gerenciamento de sessões de usuário
    - Armazenamento e recuperação de dados entre requisições
    - Suporte a várias opções de armazenamento de sessão

### 4. `mysql`

- **Descrição**: Cliente MySQL para Node.js que permite a conexão e interação com bancos de dados MySQL.
- **Instalação**: `npm install mysql`
- **Exemplo de Uso**:
    ```javascript
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'senha',
        database: 'nome_do_banco'
    });

    connection.connect();

    connection.query('SELECT * FROM tabela', (error, results, fields) => {
        if (error) throw error;
        console.log(results);
    });

    connection.end();
    ```
- **Funcionalidades**:
    - Conexão com bancos de dados MySQL
    - Execução de consultas SQL
    - Gerenciamento de conexões

### 5. `http`

- **Descrição**: Módulo nativo do Node.js para criar servidores e clientes HTTP.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Exemplo de Uso**:
    ```javascript
    const http = require('http');

    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World\n');
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    ```
- **Funcionalidades**:
    - Criação de servidores HTTP básicos
    - Manipulação de requisições e respostas

### 6. `socket.io`

- **Descrição**: Biblioteca que permite comunicação em tempo real bidirecional entre clientes e servidores.
- **Instalação**: `npm install socket.io`
- **Exemplo de Uso**:
    ```javascript
    const http = require('http');
    const socketIo = require('socket.io');
    const express = require('express');
    const app = express();

    const server = http.createServer(app);
    const io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('Usuário conectado');
        socket.on('message', (msg) => {
            io.emit('message', msg);
        });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    ```
- **Funcionalidades**:
    - Comunicação em tempo real
    - Suporte a eventos personalizados
    - Emissão e recebimento de mensagens em tempo real

### 7. `axios`

- **Descrição**: Cliente HTTP baseado em Promises para fazer requisições HTTP a partir do navegador e do Node.js.
- **Instalação**: `npm install axios`
- **Exemplo de Uso**:
    ```javascript
    const axios = require('axios');

    axios.get('https://api.exemplo.com/dados')
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    ```
- **Funcionalidades**:
    - Realização de chamadas HTTP
    - Suporte a Promises para tratamento assíncrono
    - Processamento de respostas de APIs

### 8. `path`

- **Descrição**: Módulo nativo do Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Exemplo de Uso**:
    ```javascript
    const path = require('path');

    const caminhoArquivo = path.join(__dirname, 'diretorio', 'arquivo.txt');
    console.log(caminhoArquivo);
    ```
- **Funcionalidades**:
    - Manipulação e resolução de caminhos de arquivos e diretórios
    - Normalização de caminhos

### 9. `crypto`

- **Descrição**: Módulo nativo do Node.js que fornece funcionalidades de criptografia, como hashing e criptografia simétrica e assimétrica.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Exemplo de Uso**:
    ```javascript
    const crypto = require('crypto');

    const hash = crypto.createHash('sha256').update('mensagem').digest('hex');
    console.log(hash);
    ```
- **Funcionalidades**:
    - Criação de hashes
    - Criptografia e descriptografia de dados
    - Geração de chaves criptográficas

### 10. `moment`

- **Descrição**: Biblioteca para manipulação e formatação de datas e horas de maneira fácil e intuitiva.
- **Instalação**: `npm install moment`
- **Exemplo de Uso**:
    ```javascript
    const moment = require('moment');

    const agora = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(agora);
    ```
- **Funcionalidades**:
    - Manipulação de datas e horas
    - Formatação de datas e horas
    - Cálculos de tempo

### 11. `express-fileupload`

- **Descrição**: Middleware para Express que facilita o upload de arquivos através de formulários.
- **Instalação**: `npm install express-fileupload`
- **Exemplo de Uso**:
    ```javascript
    const express = require('express');
    const fileUpload = require('express-fileupload');
    const app = express();

    app.use(fileUpload());

    app.post('/upload', (req, res) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('Nenhum arquivo foi enviado.');
        }

        let sampleFile = req.files.sampleFile;
        sampleFile.mv('/algum/diretorio/arquivo.jpg', (err) => {
            if (err) return res.status(500).send(err);
            res.send('Arquivo enviado!');
        });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
    ```
- **Funcionalidades**:
    - Gerenciamento de uploads de arquivos
    - Manipulação de arquivos enviados através de formulários

### 12. `bcrypt`

- **Descrição**: Biblioteca para hashing de senhas e comparação de hashes, usando o algoritmo bcrypt.
- **Instalação**: `npm install bcrypt`
- **Exemplo de Uso**:
    ```javascript
    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    // Hashing de senha
    bcrypt.hash('minhaSenha', saltRounds, (err, hash) => {
        if (err) throw err;
        console.log('Hash gerado:', hash);

        // Comparação de senha
        bcrypt.compare('minhaSenha', hash, (err, result) => {
            if (err) throw err;
            console.log('A senha corresponde:', result);
        });
    });
    ```
- **Funcionalidades**:
    - Hashing de senhas
    - Comparação de hashes
    - Segurança na manipulação de senhas

---
## Links Úteis

- **Express**
  - [Documentação do Express](https://expressjs.com/)
  - [Express no npm](https://www.npmjs.com/package/express)

- **Body-Parser**
  - [Documentação do Body-Parser](https://www.npmjs.com/package/body-parser)

- **Express-Session**
  - [Documentação do Express-Session](https://www.npmjs.com/package/express-session)

- **MySQL**
  - [Documentação do MySQL](https://www.npmjs.com/package/mysql)

- **Socket.io**
  - [Documentação do Socket.io](https://socket.io/docs/v4/)
  - [Socket.io no npm](https://www.npmjs.com/package/socket.io)

- **Axios**
  - [Documentação do Axios](https://axios-http.com/docs/intro)
  - [Axios no npm](https://www.npmjs.com/package/axios)

- **Moment**
  - [Documentação do Moment](https://momentjs.com/docs/)
  - [Moment no npm](https://www.npmjs.com/package/moment)

- **Express-Fileupload**
  - [Documentação do Express-Fileupload](https://www.npmjs.com/package/express-fileupload)

- **Bcrypt**
  - [Documentação do Bcrypt](https://www.npmjs.com/package/bcrypt)
