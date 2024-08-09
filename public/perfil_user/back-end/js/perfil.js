function listarfuncionarios() {
    var container = document.getElementById('perfil');
    var idFuncionario = localStorage.getItem('idFuncionario');

    fetch('/funcionarios')
        .then(response => response.json())
        .then(perfil => {
            container.innerHTML = '';

            var perfil_funcionario = perfil.find(funcionario => funcionario.id == idFuncionario);

            if (perfil_funcionario) {
                var item = `
                    <div class="funcionario">
                        <div id="container-informacoes-principais">
                            <div class="img-container">
                                <img src="${perfil_funcionario.profile_picture}" alt="Imagem do perfil">
                            </div>
                            <div id="informacoes-principais">
                                <h2 class="perfil-nome">${perfil_funcionario.name}</h2>
                                <h3 class="perfil-email">${perfil_funcionario.email}</h3>
                                <h3 class="perfil-ra">${perfil_funcionario.RA}</h3>
                            </div>
                        </div>
                        <div id="container-funcoes">
                            <h3> Função</h3>
                            <h3 class="perfil-funcao">${perfil_funcionario.funcao}</h3>
                        </div>
                    </div>
                `;
                
                container.innerHTML = item;
            } 
        })
        .catch(error => console.error('Erro ao buscar funcionários:', error));
}

document.addEventListener('DOMContentLoaded', function () {
    listarfuncionarios();
});
