document.addEventListener("DOMContentLoaded", () => {
    // Crie o HTML do popup e do botão
    const html = `
        <button id="AbrirChat" class="btn btn-primary">
           <i class="bi bi-chat-dots-fill"></i>
        </button>
        <div id="chatPopup" class="popup" style="display: none;">
            <div class="popup-content">
                <span class="Fechar" id="FecharChat">&times;</span>
                <div id="nomeConversaAtual">
                    <div class="foto-cont">
                        <img src="../../assets/imagens/logo-G.svg" alt="Foto do Chat Global" class="foto-usuario-conversa">
                    </div>
                    Chat Global
                </div>
                <div id="chat" class="chat-container">
                    <div id="mensagens" class="mensagens"></div>
                </div>
                <div class="campo-envio">
                    <input id="entradaMensagem" type="text" placeholder="Digite sua mensagem...">
                    <button id="botaoEnviar"><i id="icone-enviar" class="bi bi-send"></i></button>
                </div>
                <div id="titulo-chats">Chats</div>
                <div id="chats">
                    <div class="usuarios" id="listaUsuarios"></div>
                </div>
            </div>
        </div>
        
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    const script = document.createElement('script');
    script.src = '../js/chat.js';
    document.head.appendChild(script);

    const sockett = document.createElement('script');
    sockett.src = '/socket.io/socket.io.js';
    document.head.appendChild(sockett);


    const chatPopup = document.getElementById("chatPopup");
    const AbrirChatButton = document.getElementById("AbrirChat");
    const FecharChatButton = document.getElementById("FecharChat");

    AbrirChatButton.addEventListener("click", () => {
        AbrirChatButton.style.display = "none";
        chatPopup.style.display = "block";
        carregarUsuarios(); 
    });

    FecharChatButton.addEventListener("click", () => {
        chatPopup.style.display = "none";
        AbrirChatButton.style.display = "block";
    });
});
