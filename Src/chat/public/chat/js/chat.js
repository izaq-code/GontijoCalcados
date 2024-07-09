const socket = io();
const chat = document.getElementById('chat');
const entradaMensagem = document.getElementById('entradaMensagem');
const botaoEnviar = document.getElementById('botaoEnviar');

let usuarioAtual = localStorage.getItem('usuarioAtual');

entradaMensagem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && entradaMensagem.value.trim() !== '') {
        enviarMensagem();
    }
});

botaoEnviar.addEventListener('click', () => {
    enviarMensagem();
});

function adicionarMensagem(usuario, mensagem) {
    const containerMensagem = document.createElement('div');
    containerMensagem.classList.add('mensagem-container');

    const fotoPerfil = document.createElement('div');
    fotoPerfil.classList.add('foto-perfil');

    const conteudoMensagem = document.createElement('div');
    conteudoMensagem.classList.add('conteudo-mensagem');

    const nomeUsuarioDiv = document.createElement('div');
    nomeUsuarioDiv.textContent = usuario;
    nomeUsuarioDiv.classList.add('nome-usuario');

    const mensagemDiv = document.createElement('div');
    mensagemDiv.textContent = mensagem;
    mensagemDiv.classList.add('texto-mensagem');

    conteudoMensagem.appendChild(nomeUsuarioDiv);
    conteudoMensagem.appendChild(fotoPerfil);
    conteudoMensagem.appendChild(mensagemDiv);

    containerMensagem.appendChild(conteudoMensagem);

    if (usuario === usuarioAtual) {
        containerMensagem.classList.add('mensagem-propria');
    } else {
        containerMensagem.classList.add('mensagem-outro');
    }

    chat.appendChild(containerMensagem);
    chat.scrollTop = chat.scrollHeight;
}

function enviarMensagem() {
    const usuario = usuarioAtual;
    const mensagem = entradaMensagem.value.trim();
    if (mensagem !== '') {
        fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: usuario, message: mensagem })
        }).then(response => {
            if (response.ok) {
                console.log('Mensagem enviada com sucesso');
                entradaMensagem.value = '';
            } else {
                console.error('Erro ao enviar mensagem');
            }
        }).catch(error => {
            console.error('Erro ao enviar mensagem:', error);
        });
    }
}

socket.on('connect', () => {
    console.log('Conectado ao servidor Socket.io');
    if (!usuarioAtual) {
        usuarioAtual = prompt('Por favor, digite seu nome de usuário:');
        if (usuarioAtual) {
            localStorage.setItem('usuarioAtual', usuarioAtual);
        } else {
            usuarioAtual = 'Anônimo';
        }
    }
});

socket.on('initialMessages', (messages) => {
    console.log('Mensagens iniciais recebidas:', messages);
    messages.reverse().forEach(msg => adicionarMensagem(msg.user, msg.message));
});

socket.on('chatMessage', (msg) => {
    console.log('Nova mensagem recebida:', msg);
    adicionarMensagem(msg.user, msg.message);
});

socket.on('disconnect', () => {
    console.log('Desconectado do servidor Socket.io');
});

fetch('/messages')
    .then(response => response.json())
    .then(messages => {
        console.log('Mensagens do servidor HTTP recebidas:', messages);
        messages.reverse().forEach(msg => adicionarMensagem(msg.user, msg.message));
    })
    .catch(error => {
        console.error('Erro ao buscar mensagens:', error);
    });
