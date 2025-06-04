document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('formUsuario');
  const tabelaBody = document.querySelector('#tabelaUsuarios tbody');

  // Lista de usuários do localStorage ou vazia
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Salva a lista atualizada no localStorage
  function salvarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  // Renderiza a tabela de usuários
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

    // Evento para excluir usuário
    tabelaBody.querySelectorAll('.btn-excluir').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.target.getAttribute('data-index'));
        usuarios.splice(i, 1);
        salvarUsuarios();
        renderizarUsuarios();
      });
    });
  }

  // Validação e cadastro do usuário
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
    alert('oi')

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
