(function() {
    var idUsuarioLogado;
    var funcaoUsuarioLogado;
    var deviceType; 

    const permissoes = {
        'Diretor': ['/configuracao/front-end/html/configuracao.html', '/tela_inicial_adm/front-end/html/tela_inicial_adm.html', 
        '/chat/html/chat.html', '/info_produtos/front-end/html/selecao.html', '/funcionarios/front-end/html/funcionarios.html', 
        '/Graficos/front-end/html/Graficos.html', '/feedbacks/feedbacks.html'],

        'Supervisor': ['/configuracao/front-end/html/configuracao.html', '/tela_inicial_adm/front-end/html/tela_inicial_adm.html', '/chat/html/chat.html', 
        '/info_produtos/front-end/html/selecao.html', '/funcionarios/front-end/html/funcionarios.html', '/Graficos/front-end/html/Graficos.html', '/feedbacks/feedbacks.html'],

        'Funcionário comum': ['/tela_inicial_adm/front-end/html/tela_inicial_adm.html', '/info_produtos/front-end/html/selecao.html', '/chat/html/chat.html', 
        '/Graficos/front-end/html/Graficos.html']
    };
    
    function carregarInformacoes() {
        $.ajax({
            url: '/mostrarUsuarioLogado',
            type: 'GET',
            dataType: 'json',
            success: function(usuario) {
                idUsuarioLogado = usuario.id;
                funcaoUsuarioLogado = usuario.funcao;
                mostrarUsuarioLogado(usuario);
                permissoesExibidas();
                removeDiv(); 
            },
            error: function() {
            }
        });
    }

    function mostrarUsuarioLogado(response) {
        if (deviceType === 'Desktop') {
            $('#nome_user-desk').text(response.nome);
            $('#foto_user-desk').html($('<img>').attr('src', response.foto));
        } else {
            $('#nome_user').text(response.nome);
            $('#foto_user').html($('<img>').attr('src', response.foto));
        }
    }

    function permissoesExibidas() {
        const permissoesUsuario = permissoes[funcaoUsuarioLogado] || [];

        if (deviceType === 'Desktop') {
            $('.submenu-item').each(function() {
                const link = $(this).closest('a').attr('href');
                const isAllowed = permissoesUsuario.some(permission => link.includes(permission));
                $(this).parent().toggle(isAllowed);
            });
        } else {
            $('.mobile-navbar li').each(function() {
                const link = $(this).find('a').attr('href');
                const isAllowed = permissoesUsuario.some(permission => link.includes(permission));
                $(this).toggle(isAllowed);
            });
        }
    }

    function applyStylesForDeviceType() {
        deviceType = window.innerWidth > 768 ? 'Desktop' : 'Mobile';
        permissoesExibidas(); 
    }

    function updateDeviceType() {
        applyStylesForDeviceType();
    }

    function removeDiv() {
        if (funcaoUsuarioLogado === 'Supervisor') {
            $('#config-container .cartao-config').each(function() {
                const textoDiv = $(this).find('h1').text().trim();
                if (textoDiv.includes('Cadastrar Usuário')) { 
                    $(this).hide();
                }
            });
        }
    }

    $(document).ready(function() {
        applyStylesForDeviceType(); 
        carregarInformacoes();
        $(window).on('resize', updateDeviceType); 
    });
})();
