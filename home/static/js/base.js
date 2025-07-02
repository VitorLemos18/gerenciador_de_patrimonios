document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) {
    window.location.href = urlLogin;
    return;
  }


  const links = document.querySelectorAll('.sidebar .nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href') || '';

    if (usuario.perfil === 'funcionario') {

      if (!href.includes('patrimonios')) {
        link.style.display = 'none';
      }
    } else if (usuario.perfil === 'staff') {

      if (href.includes('relatorios') || href.includes('usuarios')) {
        link.style.display = 'none';
      }
    }

  });

  const sairBtn = document.querySelector('.nav-sair');
  if (sairBtn) {
    sairBtn.addEventListener('click', () => {
      localStorage.removeItem('usuario');
      window.location.href = urlLogin;
    });
  }
});
