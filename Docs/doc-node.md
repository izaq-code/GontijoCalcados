# Documentação de Pacotes npm e Node.js

## Introdução ao Node.js

Node.js é uma plataforma de desenvolvimento de código aberto baseada no mecanismo V8 do Google Chrome. Ele permite que você execute JavaScript no servidor, o que possibilita criar aplicações web escaláveis e de alto desempenho. O Node.js é conhecido por seu modelo de I/O não-bloqueante e orientado a eventos, o que o torna eficiente para aplicações que requerem alta escalabilidade e performance.

## Pacotes npm Utilizados

### 1. `express`

- **Descrição**: Express é um framework minimalista e flexível para Node.js que fornece um conjunto robusto de recursos para criar aplicações web e APIs.
- **Instalação**: `npm install express`
- **Uso Comum**: Configuração de rotas, middleware e servidores web.

### 2. `body-parser`

- **Descrição**: Middleware para Express que facilita a leitura e interpretação dos corpos das requisições HTTP, especialmente útil para parsing de dados JSON e URL-encoded.
- **Instalação**: `npm install body-parser`
- **Uso Comum**: Utilizado para processar dados de formulários e requisições JSON.

### 3. `express-session`

- **Descrição**: Middleware para Express que facilita o gerenciamento de sessões de usuário. Permite armazenar e recuperar dados entre requisições.
- **Instalação**: `npm install express-session`
- **Uso Comum**: Gerenciamento de sessões de usuários, como autenticação e dados temporários.

### 4. `mysql`

- **Descrição**: Cliente MySQL para Node.js que permite a conexão e interação com bancos de dados MySQL.
- **Instalação**: `npm install mysql`
- **Uso Comum**: Execução de consultas SQL e gerenciamento de conexões com banco de dados MySQL.

### 5. `http`

- **Descrição**: Módulo nativo do Node.js para criar servidores e clientes HTTP.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Uso Comum**: Criação de servidores HTTP básicos e manipulação de requisições e respostas.

### 6. `socket.io`

- **Descrição**: Biblioteca que permite comunicação em tempo real bidirecional entre clientes e servidores.
- **Instalação**: `npm install socket.io`
- **Uso Comum**: Criação de chat em tempo real, atualizações instantâneas e outras interações em tempo real.

### 7. `axios`

- **Descrição**: Cliente HTTP baseado em Promises para fazer requisições HTTP a partir do navegador e do Node.js.
- **Instalação**: `npm install axios`
- **Uso Comum**: Realizar chamadas HTTP e processar respostas de APIs.

### 8. `path`

- **Descrição**: Módulo nativo do Node.js que fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Uso Comum**: Manipulação e resolução de caminhos de arquivos e diretórios.

### 9. `crypto`

- **Descrição**: Módulo nativo do Node.js que fornece funcionalidades de criptografia, como hashing e criptografia simétrica e assimétrica.
- **Instalação**: Já incluído no Node.js, não requer instalação adicional.
- **Uso Comum**: Criação de hashes, criptografia e descriptografia de dados.

### 10. `moment`

- **Descrição**: Biblioteca para manipulação e formatação de datas e horas de maneira fácil e intuitiva.
- **Instalação**: `npm install moment`
- **Uso Comum**: Manipulação de datas e horas, formatação e cálculos de tempo.

### 11. `express-fileupload`

- **Descrição**: Middleware para Express que facilita o upload de arquivos através de formulários.
- **Instalação**: `npm install express-fileupload`
- **Uso Comum**: Gerenciamento de uploads de arquivos em aplicações Express.

### 12. `bcrypt`

- **Descrição**: Biblioteca para hashing de senhas e comparação de hashes, usando o algoritmo bcrypt.
- **Instalação**: `npm install bcrypt`
- **Uso Comum**: Proteção de senhas através de hashing seguro.
