document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    window.location.href = urlLogin;
    return;
  }

  // Seleciona todos os links do sidebar
  const links = document.querySelectorAll('.sidebar .nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';

    if (usuario.perfil === 'funcionario') {
      // Funcionário só vê Patrimônios
      if (!href.includes('patrimonios')) {
        link.style.display = 'none';
      }
    } else if (usuario.perfil === 'staff') {
      // Staff não vê Relatórios nem Usuários
      if (href.includes('relatorios') || href.includes('usuarios')) {
        link.style.display = 'none';
      }
    }
    // Gestor vê todos os links, sem restrição
  });

  // Botão sair — remove usuário e redireciona para login
  const sairBtn = document.querySelector('.nav-sair');
  if (sairBtn) {
    sairBtn.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      window.location.href = urlLogin;
    });
  }
});
