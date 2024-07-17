const socket = io();
const chat = document.getElementById('chat');
const entradaMensagem = document.getElementById('entradaMensagem');
const botaoEnviar = document.getElementById('botaoEnviar');
const listaUsuarios = document.getElementById('listaUsuarios');

let usuarioAtual = localStorage.getItem('usuarioAtual') || 'Anônimo';
let fotoAtual = localStorage.getItem('fotoAtual') || 'null';

let privateChatWith = null;

entradaMensagem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && entradaMensagem.value.trim() !== '') {
        enviarMensagem();
    }
});

botaoEnviar.addEventListener('click', () => {
    enviarMensagem();
});

function adicionarMensagem(usuario, mensagem, isPrivate) {
    const containerMensagem = document.createElement('div');
    containerMensagem.classList.add('mensagem-container');

    const fotoPerfil = document.createElement('div');
    const fotomg = document.createElement('img');
    fotomg.src = fotoAtual;
    fotoPerfil.appendChild(fotomg);
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

    if (isPrivate) {
        containerMensagem.classList.add('mensagem-privada');
    }

    chat.appendChild(containerMensagem);
    chat.scrollTop = chat.scrollHeight;
}

function enviarMensagem() {
    const usuario = usuarioAtual;
    const mensagem = entradaMensagem.value.trim();
    if (mensagem !== '') {
        fetch('/messages1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: usuario, message: mensagem, privateChatWith })
        }).then(response => {
            if (response.ok) {
                console.log('Mensagem enviada com sucesso');
                entradaMensagem.value = '';
            } else {
                response.text().then(text => console.error('Erro ao enviar mensagem:', text));
            }
        }).catch(error => {
            console.error('Erro ao enviar mensagem:', error);
        });
    }
}

function carregarUsuarios() {
    const globalChatDiv = document.createElement('div');
    globalChatDiv.classList.add('usuario');
    globalChatDiv.textContent = 'Chat Global';
    globalChatDiv.addEventListener('click', () => {
        privateChatWith = null;
        carregarMensagens();
    });
    listaUsuarios.innerHTML = '';
    listaUsuarios.appendChild(globalChatDiv);

    carregarUltimaMensagem(null, globalChatDiv, 'Chat Global', true);

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('usuario');

                carregarUltimaMensagem(user.email_user, userDiv, user.user_nome);
                console.log(user.user_nome);

                userDiv.addEventListener('click', () => {
                    iniciarChatPrivado(user.email_user);
                });
                listaUsuarios.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
}

function carregarUltimaMensagem(email, userDiv, nomeUsuario, isGlobal = false) {
    const url = isGlobal ? '/ultimaMensagem' : `/ultimaMensagem?privateChatWith=${email}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar última mensagem');
            }
            return response.json();
        })
        .then(ultimaMensagem => {
            const nomeDiv = document.createElement('div');
            nomeDiv.textContent = nomeUsuario;
            nomeDiv.classList.add('nome-usuario');

            const mensagemDiv = document.createElement('div');
            
            mensagemDiv.textContent = ultimaMensagem.length > 0 ? (isGlobal ? `${ultimaMensagem[0].nome_usuario}: ${ultimaMensagem[0].message}` : ultimaMensagem[0].message) : 'Sem mensagens';

            mensagemDiv.classList.add('ultima-mensagem');

            userDiv.innerHTML = '';
            userDiv.appendChild(nomeDiv);
            userDiv.appendChild(mensagemDiv);
        })
        .catch(error => {
            console.error('Erro ao carregar última mensagem:', error);
        });
}


function iniciarChatPrivado(email) {
    privateChatWith = email;
    carregarMensagens();
}

function iniciarChatPrivado(email) {
    privateChatWith = email;
    carregarMensagens();
}

socket.on('connect', () => {
    console.log('Conectado ao servidor Socket.io');

    fetch('/mostrarUsuarioLogado')
        .then(response => response.json())
        .then(nome => {
            usuarioAtual = nome.nome;
            localStorage.setItem('usuarioAtual', usuarioAtual); // Salva no localStorage
            console.log('Usuário atual:', usuarioAtual);
            fotoAtual = nome.foto;
            localStorage.setItem('fotoAtual', fotoAtual); // Salva no localStorage
        })

        .catch(error => {
            console.error('Erro ao obter o nome do usuário:', error);
            usuarioAtual = 'Anônimo';
        });
});
socket.on('initialMessages', (messages) => {
    console.log('Mensagens iniciais recebidas:', messages);
    messages.reverse().forEach(msg => adicionarMensagem(msg.user, msg.message, msg.privateChatWith !== null));
});

socket.on('chatMessage', (msg) => {
    console.log('Nova mensagem recebida:', msg);
    adicionarMensagem(msg.user, msg.message, msg.privateChatWith !== null);
});

socket.on('disconnect', () => {
    console.log('Desconectado do servidor Socket.io');
});

function carregarMensagens() {
    fetch(`/messages1?privateChatWith=${privateChatWith || ''}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(messages => {
            chat.innerHTML = '';
            messages.reverse().forEach(msg => adicionarMensagem(msg.user, msg.message, msg.privateChatWith !== null));
        })
        .catch(error => {
            console.error('Erro ao buscar mensagens:', error);
        });
}

carregarUsuarios();
carregarMensagens();
