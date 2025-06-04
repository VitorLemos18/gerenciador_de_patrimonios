document.addEventListener('DOMContentLoaded', () => {
  const pendentesKey = 'patrimoniosPendentes';
  const patrimoniosKey = 'patrimonios';

  let patrimoniosPendentes = JSON.parse(localStorage.getItem(pendentesKey)) || [];
  let patrimonios = JSON.parse(localStorage.getItem(patrimoniosKey)) || [];

  const tbody = document.getElementById('pendentesTabela');

  function salvarPendentes() {
    localStorage.setItem(pendentesKey, JSON.stringify(patrimoniosPendentes));
  }

  function salvarPatrimonios() {
    localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));
  }

  function renderizarTabela() {
    tbody.innerHTML = '';
    if (patrimoniosPendentes.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="text-center fst-italic">Nenhum patrimônio pendente.</td></tr>`;
      return;
    }

    patrimoniosPendentes.forEach((p, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.tipo}</td>
        <td>${p.modelo}</td>
        <td>${p.unidade || 'N/A'}</td>
        <td>${p.codigo || ''}</td>
        <td>
          <button class="btn btn-sm btn-success btn-aceitar" data-index="${i}">Aceitar</button>
          <button class="btn btn-sm btn-danger btn-recusar" data-index="${i}">Recusar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Evento aceitar - move do pendente para ativos
    document.querySelectorAll('.btn-aceitar').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = Number(e.target.dataset.index);
        const patrimonioAceito = patrimoniosPendentes[idx];

        patrimonios.push(patrimonioAceito);
        patrimoniosPendentes.splice(idx, 1);

        salvarPatrimonios();
        salvarPendentes();
        renderizarTabela();
      });
    });

    // Evento recusar - remove do pendente
    document.querySelectorAll('.btn-recusar').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = Number(e.target.dataset.index);
        patrimoniosPendentes.splice(idx, 1);
        salvarPendentes();
        renderizarTabela();
      });
    });
  }

  renderizarTabela();
});
