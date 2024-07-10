# <img align="center" alt="PHP" height="30" width="40" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg" /> Documentação da API de Cadastro com o Google

## Visão Geral
A API de cadastro com o Google é utilizada no projeto da Calçados Gontijo para permitir aos usuários realizar autenticação e gerenciamento de contas utilizando as credenciais do Google. Esta integração simplifica o processo de login e registro no sistema, garantindo segurança e praticidade.

## Funcionalidades
- **Autenticação via Google:** Permite que os usuários façam login utilizando suas contas do Google.
- **Gerenciamento de Contas:** Facilita o registro e a gestão de contas de usuário através da API do Google.

## Tecnologias Utilizadas
- **OAuth 2.0:** Protocolo utilizado para autenticação.
- **Google APIs Client Library for JavaScript:** Biblioteca JavaScript para facilitar a integração com as APIs do Google.

## Como Utilizar
Para utilizar a API de cadastro com o Google no projeto, é necessário configurar corretamente as credenciais OAuth fornecidas pelo Google Cloud Console. As etapas básicas são:

1. **Configuração das Credenciais:**
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/).
   - Crie um novo projeto ou utilize um projeto existente.
   - Adicione a API necessária ao seu projeto e gere as credenciais OAuth.

2. **Integração no Código:**
   - Utilize a biblioteca Google APIs Client Library for JavaScript para realizar as chamadas necessárias à API do Google.
   - Implemente a autenticação OAuth no frontend e no backend, conforme necessário para as funcionalidades do projeto.

3. **Exemplos de Uso:**
   - Exemplo de código para realizar login com Google usando JavaScript:
     ```javascript
     function signInWithGoogle() {
       // Configuração da biblioteca Google API Client
       const auth2 = gapi.auth2.getAuthInstance();
       // Inicia o processo de login
       auth2.signIn().then(() => {
         // Sucesso: usuário autenticado
         console.log('Usuário autenticado com sucesso.');
       }).catch(error => {
         // Tratamento de erro
         console.error('Erro ao autenticar usuário:', error);
       });
     }
     ```

## Mais Informações
Para mais detalhes sobre a API de Cadastro com o Google e suas funcionalidades, consulte a documentação oficial da [Google Identity Platform](https://developers.google.com/identity/). Lá você encontrará guias detalhados, exemplos de código e tutoriais para ajudar na integração e uso das APIs do Google em seus projetos.

## Contato
Para suporte adicional ou dúvidas sobre a integração com a API do Google no projeto Calçados Gontijo, entre em contato conosco através do email contato@calcadosgontijo.com.br.

