const socket = io();
const chat = document.getElementById('chat');
const entradaMensagem = document.getElementById('entradaMensagem');
const botaoEnviar = document.getElementById('botaoEnviar');
const listaUsuarios = document.getElementById('listaUsuarios');
const nomeConversaAtual = document.getElementById('nomeConversaAtual');

let usuarioAtual = localStorage.getItem('usuarioAtual') || 'Anônimo';
let emailAtual = localStorage.getItem('emailAtual') || 'Anônimo';
let fotoAtual = localStorage.getItem('fotoAtual') || 'null';

let privateChatWith = null;

function carregarUsuarios() {
    fotoPadrao = '../../assets/imagens/logo-G.svg';

    const globalChatDiv = document.createElement('div');
    globalChatDiv.classList.add('usuario');
    globalChatDiv.textContent = 'Chat Global';
    globalChatDiv.addEventListener('click', () => {
        privateChatWith = null;

        nomeConversaAtual.innerHTML = '';

        const fotoCont = document.createElement('div');
        fotoCont.classList.add('foto-cont');

        const fotoUsuarioAtual = document.createElement('img');
        fotoUsuarioAtual.src = fotoPadrao;
        fotoUsuarioAtual.alt = 'Foto do Chat Global';
        fotoUsuarioAtual.classList.add('foto-usuario-conversa');

        fotoCont.appendChild(fotoUsuarioAtual);
        nomeConversaAtual.appendChild(fotoCont);
        nomeConversaAtual.appendChild(document.createTextNode('Chat Global'));


        carregarMensagens();
    });
    listaUsuarios.innerHTML = '';
    listaUsuarios.appendChild(globalChatDiv);

    carregarInformacoesDaConversa(null, globalChatDiv, 'Chat Global', fotoPadrao, true);

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('usuario');

                carregarInformacoesDaConversa(user.email_user, userDiv, user.user_nome, user.foto_user);

                userDiv.addEventListener('click', () => {
                    iniciarChatPrivado(user.email_user, user.user_nome, user.foto_user);
                });
                listaUsuarios.appendChild(userDiv);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar usuários:', error);
        });
}

function iniciarChatPrivado(email, usuario, foto) {
    privateChatWith = email;

    const fotoUsuarioAtual = document.createElement('img');
    fotoUsuarioAtual.src = foto;
    fotoUsuarioAtual.alt = `Foto de ${usuario}`;
    fotoUsuarioAtual.classList.add('foto-usuario-conversa');
    const fotoCont = document.createElement('div');
    fotoCont.classList.add('foto-cont');
    fotoCont.appendChild(fotoUsuarioAtual);

    nomeConversaAtual.innerHTML = '';
    nomeConversaAtual.appendChild(fotoCont);
    nomeConversaAtual.appendChild(document.createTextNode(usuario));

    carregarMensagens();
}

function carregarInformacoesDaConversa(email, userDiv, nomeUsuario, fotoUsuario, isGlobal = false) {
    const url = isGlobal ? '/ultimaMensagem' : `/ultimaMensagem?privateChatWith=${email}`;
    fetch(url)
        .then(response => response.json())
        .then(ultimaMensagem => {
            const nomeDiv = document.createElement('div');
            nomeDiv.textContent = nomeUsuario;
            nomeDiv.classList.add('nome-usuario');

            const mensagemDiv = document.createElement('div');
            mensagemDiv.textContent = ultimaMensagem.length > 0 ? (isGlobal ? `${ultimaMensagem[0].nome_usuario}: ${ultimaMensagem[0].message}` : ultimaMensagem[0].message) : 'Sem mensagens';
            mensagemDiv.classList.add('ultima-mensagem');

            const fotoDiv = document.createElement('div');
            const fotoImg = document.createElement('img');
            fotoImg.src = fotoUsuario;
            fotoImg.alt = `Foto de ${nomeUsuario}`;
            fotoImg.classList.add('foto-usuario');
            fotoDiv.appendChild(fotoImg);
            fotoDiv.classList.add('foto-container');

            userDiv.innerHTML = '';
            userDiv.appendChild(fotoDiv);
            userDiv.appendChild(nomeDiv);
            userDiv.appendChild(mensagemDiv);

            notificarMensagemNaoLida(email, userDiv, isGlobal);
        })
        .catch(error => {
            console.error('Erro ao carregar última mensagem:', error);
        });
}

function notificarMensagemNaoLida(email, userDiv, isGlobal) {
    const url = isGlobal ? '/messages1' : `/messages1?privateChatWith=${email}`;
    fetch(url)
        .then(response => response.json())
        .then(mensagens => {
            if (mensagens[0] && !mensagens[0].is_read && mensagens[0].user !== usuarioAtual && !isGlobal) {
                const notificaDot = document.createElement('div');
                notificaDot.classList.add('bolinha-notificacao');
                userDiv.appendChild(notificaDot);
            }
        })
        .catch(error => {
            console.error('Erro ao carregar mensagens:', error);
        });
}

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
            messages.reverse().forEach(msg => {
                adicionarMensagem(msg.user, msg.message, msg.privateChatWith !== null, msg.foto_usuario);

                if (msg.privateChatWith && msg.user !== usuarioAtual) {
                    fetch('/messages/read', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ messageId: msg.id })
                    });
                }
            });
        })
        .catch(error => {
            console.error('Erro ao buscar mensagens:', error);
        });
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
                entradaMensagem.value = '';
            } else {
                response.text().then(text => console.error('Erro ao enviar mensagem:', text));
            }
        }).catch(error => {
            console.error('Erro ao enviar mensagem:', error);
        });
    }
}

entradaMensagem.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && entradaMensagem.value.trim() !== '') {
        enviarMensagem();
    }
});

botaoEnviar.addEventListener('click', () => {
    enviarMensagem();
});

function adicionarMensagem(usuario, mensagem, isPrivate, fotoUsuario) {
    const containerMensagem = document.createElement('div');
    containerMensagem.classList.add('mensagem-container');

    const fotoPerfil = document.createElement('div');
    const fotomg = document.createElement('img');
    fotomg.src = fotoUsuario;
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

socket.on('connect', () => {
    fetch('/mostrarUsuarioLogado')
        .then(response => response.json())
        .then(nome => {
            usuarioAtual = nome.nome;
            localStorage.setItem('usuarioAtual', usuarioAtual);
            emailAtual = nome.email
            localStorage.setItem('emailAtual', emailAtual);
            fotoAtual = nome.foto;
            localStorage.setItem('fotoAtual', fotoAtual);
        })

        .catch(error => {
            console.error('Erro ao obter o nome do usuário:', error);
            usuarioAtual = 'Anônimo';
        });
});

socket.on('initialMessages', (messages) => {
    messages.reverse().forEach(msg => {
        carregarMensagens();
    });
});

socket.on('chatMessage', (msg) => {
    carregarMensagens();
});

carregarUsuarios();
carregarMensagens();