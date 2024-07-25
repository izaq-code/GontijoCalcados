document.addEventListener("DOMContentLoaded", async () => {
    const html = `
        <button id="AbrirChat" class="btn btn-primary">
           <i class="bi bi-chat-dots"></i>
        </button>
        <div id="chatPopup" class="popup" style="display: none;">
            <div class="popup-content">
                <span class="Fechar" id="FecharChat">&times;</span>
                <div id="nomeConversaAtual">
                    <div class="foto-cont">
                       <img src="../../../assets/imagens/logo-G.svg" alt="Foto do Chat Global" class="foto-usuario-conversa">
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

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    try {
        await loadScript('/socket.io/socket.io.js');
        await loadScript('../../../chat.js');

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
    } catch (error) {
        console.error('Erro ao carregar os scripts:', error);
    }
});
