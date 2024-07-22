![Header - Gontijo](https://github.com/iannovais/GontijoCalcados/assets/136115980/b42f75aa-b9ce-4acd-8d39-62bb0226ada7)

# GontijoCalcados

O Sistema de Gestão para Montagem de Sapatos é uma plataforma projetada para simplificar e otimizar o processo de produção de calçados, focando na eficiência e na qualidade. Nosso sistema visa proporcionar uma solução intuitiva que permite aos fabricantes de calçados agendar etapas de produção com facilidade, encontrar os materiais e mão de obra mais adequados para cada fase do processo, e promover a integração eficiente de todos os envolvidos na cadeia produtiva.

Visamos melhorar a utilização de recursos, reduzir desperdícios e custos, e aumentar a eficiência da produção. Além disso, nosso sistema fortalece a colaboração entre fornecedores, designers e fabricantes, facilitando a comunicação e garantindo um fluxo contínuo de produção. Ao implementar o sistema, a Gontijo Calçados pode alcançar maior produtividade, qualidade consistente dos produtos e, consequentemente, maior satisfação dos clientes finais.

## 👥 Integrantes

* Andre Cardoso Pereira.
* Eduarda Ferreira Vilaça.
* Eduarda Vieira Gonçalves.
* Ian dos Reis Novais.
* Isaque Gomes Azevedo.
* Tiago Gonçalves Alcântara Ferreira.

## 👨‍🏫 Professor

* Wíverson Feliciano Gomes.

## 📂 Documentação

Clique [aqui](https://link-da-documentação) para acessar a documentação completa do projeto.

## 💻 Instruções de utilização

**Pré-requisitos**

Para utilizar nossos sistema é necessário ter instalado na sua maquina:
- Clique [Xamp](https://link-da-documentação) para acessar
- Clique [Node.js](https://www.apachefriends.org/pt_br/index.html) para acessar

**Passo 1: Clone o projeto**

```bash
  git clone https://github.com/iannovais/GontijoCalcados.git
```

**Passo 2: Cadastre o banco de dados no xamp**ㅤ

Atenção! Cadastre os dois banco de dados `ProductEase` e `chat_app`

**Passo 3: No xamp, vá nas configurações do Apache:**
- Vá no httpd.conf
- Em seguida inisira no final do arquivo txt
  

```bash
  
<VirtualHost *:80>
    ServerName redePI
    DocumentRoot "C:/xampp/htdocs/GontijoCalcados/public"

    ProxyPass /Gontijocalcados http://localhost:3000/
    ProxyPassReverse /Gontijocalcados http://localhost:3000/

    Alias /backend "C:/xampp/htdocs/GontijoCalcados/backend"
    <Directory "C:/xampp/htdocs/GontijoCalcados/backend">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    <Directory "C:/xampp/htdocs/GontijoCalcados/public">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog "logs/redePI-error.log"
    CustomLog "logs/redePI-access.log" common
</VirtualHost>
```

**Passo 4: Instalar os pacotes node:**

```bash
npm install express body-parser express-session mysql http socket.io axios path crypto
```
**Passo 5: Inicializar o servidor:**

```bash
  node server.js
```
**Passo 6: Para encontrar a página:**

```bash
  http://localhost:3000/
```
**Passo 7: Para finalizar o servidor procure quem esta na porta 3000 com o:**

```bash
  netstat -ano | findstr :3000
```
**Passo 8: Finalaze colocando quem esta na porta com esse comando:**

```bash
  taskkill /PID <porta> /F
```
## API's / LIB's Referência

 - [Sweet Alert](https://sweetalert2.github.io/)
 - [API Google](https://developers.google.com/apis-explorer?hl=pt-br)
 - [Socket IO](https://developers.google.com/apis-explorer?hl=pt-br)

## 📜 Licença

[MIT](https://choosealicense.com/licenses/mit/)
