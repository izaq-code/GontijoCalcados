function search() {
  const searchInput = document.getElementById('searchInputUsuario').value.toLowerCase();
  const UsuariosItems = document.querySelectorAll('.usuario-card');
  let hasResults = false;

  UsuariosItems.forEach(item => {
      const nomeFuncionario = item.querySelector('.funcionarios-nome').innerText.toLowerCase();
      const botaoPerfil = item.querySelector('.verinformacoes');

      if (nomeFuncionario.includes(searchInput)) {
          item.style.display = 'block';
          botaoPerfil.style.display = 'inline-block';
          hasResults = true;
      } else {
          item.style.display = 'none';
          botaoPerfil.style.display = 'none'; 
      }
  });

  const mensagemErro = document.getElementById('errorMessage');

  if (searchInput === '') {
      UsuariosItems.forEach(item => {
          item.style.display = 'block';
          item.querySelector('.verinformacoes').style.display = 'inline-block';
      });
      mensagemErro.style.display = 'none';
  } else {
      if (!hasResults) {
          mensagemErro.style.display = 'block';
      } else {
          mensagemErro.style.display = 'none';
      }
  }
}
