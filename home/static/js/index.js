document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    window.location.href = '/login/';
    return;
  }

  const patrimoniosKey = 'patrimonios';
  const patrimonios = JSON.parse(localStorage.getItem(patrimoniosKey)) || [];
  const unidades = JSON.parse(localStorage.getItem('unidades')) || [];

  const qntPatrimonios = document.getElementById('patrimonios-quantity');
  const qntUnidades = document.getElementById('unidades-quantity');
  const qntPendentes = document.getElementById('pendentes-quantity');

  if (qntPatrimonios) qntPatrimonios.textContent = patrimonios.length;
  if (qntUnidades) qntUnidades.textContent = unidades.length;


  const popupAviso = document.getElementById('popupAviso');
  const fundoAviso = document.getElementById('fundoAviso');
  const mensagemAviso = document.getElementById('mensagemAviso');
  const btnFecharAviso = document.getElementById('fecharAviso');

  function mostrarPopupAviso(mensagem) {
    mensagemAviso.textContent = mensagem;
    popupAviso.style.display = 'flex';
    fundoAviso.style.display = 'block';
  }
  function esconderPopupAviso() {
    popupAviso.style.display = 'none';
    fundoAviso.style.display = 'none';
  }
  btnFecharAviso.onclick = esconderPopupAviso;
  fundoAviso.onclick = esconderPopupAviso;

  const modalEl = document.getElementById('modalPendentes');
  const modal = new bootstrap.Modal(modalEl);
  const tabelaPendentesBody = document.querySelector('#tabelaPendentes tbody');
  const btnAbrirModal = document.getElementById('abrirModalPendentes');


  function atualizarQuantidadePendentes() {
    const pendentes = patrimonios.filter(p => !p.codigo || p.codigo.length < 13);
    if (qntPendentes) qntPendentes.textContent = pendentes.length;
  }
  atualizarQuantidadePendentes();

  function atualizarTabelaPendentes() {
    const pendentes = patrimonios.filter(p => !p.codigo || p.codigo.length < 13);
    tabelaPendentesBody.innerHTML = '';

    pendentes.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.tipo || ''}</td>
        <td>${p.modelo || ''}</td>
        <td>${p.codigo || ''}</td>
        <td><input type="text" class="form-control codigo-input" data-index="${i}" value="${p.codigo || ''}" minlength="13" /></td>
        <td>
          <button class="btn btn-success btn-sm btn-salvar" data-index="${i}">Salvar</button>
          <button class="btn btn-danger btn-sm btn-rejeitar" data-index="${i}">Rejeitar</button>
        </td>
      `;
      tabelaPendentesBody.appendChild(tr);
    });

    tabelaPendentesBody.querySelectorAll('.btn-salvar').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.target.getAttribute('data-index'));
        const input = tabelaPendentesBody.querySelector(`.codigo-input[data-index="${i}"]`);
        const novoCodigo = input.value.trim();

        if (novoCodigo.length < 13) {
          alert('Código deve ter ao menos 13 caracteres.');
          return;
        }

        const pendentesAtualizados = patrimonios.filter(p => !p.codigo || p.codigo.length < 13);
        const pendente = pendentesAtualizados[i];
        const idxOriginal = patrimonios.findIndex(item => item.tipo === pendente.tipo && item.modelo === pendente.modelo);
        if (idxOriginal >= 0) {
          patrimonios[idxOriginal].codigo = novoCodigo;
          localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));
          alert('Código salvo com sucesso!');
          atualizarTabelaPendentes();
          atualizarQuantidadePendentes();
        }
      });
    });

    tabelaPendentesBody.querySelectorAll('.btn-rejeitar').forEach(btn => {
      btn.addEventListener('click', e => {
        const i = parseInt(e.target.getAttribute('data-index'));
        const pendentesAtualizados = patrimonios.filter(p => !p.codigo || p.codigo.length < 13);
        const pendente = pendentesAtualizados[i];
        const idxOriginal = patrimonios.findIndex(item => item.tipo === pendente.tipo && item.modelo === pendente.modelo);
        if (idxOriginal >= 0) {
          patrimonios.splice(idxOriginal, 1);
          localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));
          alert('Patrimônio rejeitado e removido com sucesso!');
          atualizarTabelaPendentes();
          atualizarQuantidadePendentes();
        }
      });
    });
  }

  if (btnAbrirModal) {
    btnAbrirModal.addEventListener('click', e => {
      e.preventDefault();
      if (usuario.perfil === 'gestor' || usuario.perfil === 'staff') {
        atualizarTabelaPendentes();
        modal.show();
      } else {
        mostrarPopupAviso('Você não tem acesso a essa funcionalidade.');
      }
    });
    btnAbrirModal.style.cursor = 'pointer';
  }

  // Controle de cards com permissão
  const linkPatrimonios = document.getElementById('linkPatrimonios');
  if (linkPatrimonios) {
    linkPatrimonios.addEventListener('click', e => {
      e.preventDefault();
      window.location.href = urlPatrimonios;
    });
    linkPatrimonios.style.cursor = 'pointer';
  }

  const linkUnidades = document.getElementById('linkUnidades');
  if (linkUnidades) {
    linkUnidades.addEventListener('click', e => {
      e.preventDefault();
      if (usuario.perfil === 'gestor' || usuario.perfil === 'staff') {
        window.location.href = urlUnidade;
      } else {
        mostrarPopupAviso('Você não tem acesso a essa funcionalidade.');
      }
    });
    linkUnidades.style.cursor = 'pointer';
  }

  // Renderiza gráfico com Chart.js
  if (typeof Chart !== 'undefined') {
    const tipos = patrimonios.reduce((acc, p) => {
      acc[p.tipo] = (acc[p.tipo] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(tipos);
    const data = Object.values(tipos);

    const canvasGrafico = document.getElementById('patrimonioPieChart');
    if (canvasGrafico) {
      new Chart(canvasGrafico.getContext('2d'), {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Distribuição de Tipos de Patrimônios',
            data: data,
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.raw} itens` } }
          }
        }
      });
    }
  }
});
