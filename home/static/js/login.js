document.addEventListener('DOMContentLoaded', () => {
  const formLogin = document.getElementById('loginForm');
  if (!formLogin) return;

  function mostrarPopup(mensagem) {
    const popupErro = document.getElementById('popupErro');
    const mensagemPopup = document.getElementById('mensagemPopup');
    const fundoPopup = document.getElementById('fundoPopup');
    const fecharPopup = document.getElementById('fecharPopup');

    if (!popupErro || !mensagemPopup || !fundoPopup || !fecharPopup) {
      alert(mensagem);
      return;
    }

    mensagemPopup.textContent = mensagem;
    popupErro.style.display = 'block';
    fundoPopup.style.display = 'block';

    fecharPopup.onclick = () => {
      popupErro.style.display = 'none';
      fundoPopup.style.display = 'none';
    };

    fundoPopup.onclick = () => {
      popupErro.style.display = 'none';
      fundoPopup.style.display = 'none';
    };
  }

  formLogin.addEventListener('submit', e => {
    e.preventDefault();

    const username = formLogin.username.value.trim();
    const password = formLogin.password.value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(u => u.username === username && u.password === password);

    if (usuario) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
      window.location.href = urlHome;
    } else {
      mostrarPopup('Usuário ou senha incorretos!');
    }
  });
});
