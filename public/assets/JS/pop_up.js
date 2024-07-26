document.addEventListener("DOMContentLoaded", async () => {
    const html = `
        <button id="AbrirChat" class="btn btn-primary">
            <i class="bi bi-chat-dots-fill"></i>
            <span id="notificacao" class="notificacao" style="display: none;">0</span>
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

    function AtualizarOcount(count) {
        const notificacao = document.getElementById("notificacao");
        notificacao.textContent = count;
        notificacao.style.display = count > 0 ? 'block' : 'none';
        localStorage.setItem('notificacaoCount', count);
    }

    try {
        await loadScript('/socket.io/socket.io.js');
        await loadScript('../../../chat.js');

        const chatPopup = document.getElementById("chatPopup");
        const AbrirChatButton = document.getElementById("AbrirChat");
        const FecharChatButton = document.getElementById("FecharChat");
        const notificacao = document.getElementById("notificacao");

        const Salvarnotificacao = localStorage.getItem('notificacaoCount');
        if (Salvarnotificacao) {
            AtualizarOcount(parseInt(Salvarnotificacao, 10));
        }

        AbrirChatButton.addEventListener("click", () => {
            AbrirChatButton.style.display = "none";
            chatPopup.style.display = "block";
            AtualizarOcount(0); // CREIO EU QUE TA INDO
            carregarUsuarios();
        });

        FecharChatButton.addEventListener("click", () => {
            chatPopup.style.display = "none";
            AbrirChatButton.style.display = "block";
        });

        // NOTIFICACAO EM TEMPO REAL MEU NOBRE
        socket.on('chatMessage', (msg) => {
            const FoiAberto = chatPopup.style.display === "block";

            if (!FoiAberto) {
                let count = parseInt(localStorage.getItem('notificacaoCount'), 10) || 0;
                count += 1;
                AtualizarOcount(count);
            }
        });
    } catch (error) {
        console.error('Erro ao carregar os scripts:', error);
    }
});
