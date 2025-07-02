document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formUsuario');
  const tabelaBody = document.querySelector('#tabelaUsuarios tbody');

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  function renderizarUsuarios() {
    tabelaBody.innerHTML = '';
    usuarios.forEach((u, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.username}</td>
        <td>${u.perfil}</td>
        <td>
          <button class="btn btn-danger btn-sm btn-excluir" data-index="${index}">Excluir</button>
        </td>
      `;
      tabelaBody.appendChild(tr);
    });


    tabelaBody.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.target.getAttribute('data-index'));
        usuarios.splice(i, 1);
        salvarUsuarios();
        renderizarUsuarios();
      });
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Submit capturado!');

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
      
    }

    const username = form.username.value.trim();
    const password = form.password.value.trim();
    const perfil = form.perfil.value;

    if (usuarios.some(u => u.username === username)) {
      alert('Usuário já existe!');
      return;
     
    }

    usuarios.push({ username, password, perfil });
    salvarUsuarios();
    renderizarUsuarios();

    form.reset();
    form.classList.remove('was-validated');
  });

  renderizarUsuarios();
});
