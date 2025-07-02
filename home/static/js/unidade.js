document.addEventListener('DOMContentLoaded', () => {
  const unidadesKey = 'unidades';

  let unidades = JSON.parse(localStorage.getItem(unidadesKey)) || [];
  localStorage.setItem(unidadesKey, JSON.stringify(unidades)); 

  const tbody = document.getElementById('unidadesTabela');
  const inputFiltro = document.getElementById('inputFiltro');
  const modalEl = document.getElementById('modalUnidade');
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById('formUnidade');
  const modalTitle = document.getElementById('modalUnidadeLabel');

  const nomeInput = document.getElementById('nome');
  const responsavelInput = document.getElementById('responsavel');

  const btnCriar = document.getElementById('btnCriarUnidade');
  const btnEditar = document.getElementById('btnEditarUnidade');
  const btnExcluir = document.getElementById('btnExcluirUnidade');

  let modoEdicao = false;
  let indiceEditando = null;
  let indiceSelecionado = null;

  function mostrarTabela(lista) {
    tbody.innerHTML = '';
    if (lista.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="text-center fst-italic">Nenhuma unidade encontrada.</td></tr>`;
      desabilitarBotoesAcao();
      return;
    }
    lista.forEach((u, i) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${i + 1}</td><td>${u.nome}</td><td>${u.responsavel}</td>`;
      tr.style.cursor = 'pointer';
      tr.addEventListener('click', () => selecionarLinha(i));
      tbody.appendChild(tr);
    });
  }

  function selecionarLinha(index) {
    indiceSelecionado = index;
    habilitarBotoesAcao();
    Array.from(tbody.children).forEach((tr, i) => {
      tr.classList.toggle('table-primary', i === index);
    });
  }

  function habilitarBotoesAcao() {
    btnEditar.disabled = false;
    btnExcluir.disabled = false;
  }

  function desabilitarBotoesAcao() {
    btnEditar.disabled = true;
    btnExcluir.disabled = true;
    indiceSelecionado = null;
    Array.from(tbody.children).forEach(tr => tr.classList.remove('table-primary'));
  }

  function abrirEdicao(index) {
    modoEdicao = true;
    indiceEditando = index;
    modalTitle.textContent = 'Editar Unidade';
    const u = unidades[index];
    nomeInput.value = u.nome;
    responsavelInput.value = u.responsavel;
    form.classList.remove('was-validated');
    modal.show();
  }

  function abrirCriacao() {
    modoEdicao = false;
    indiceEditando = null;
    modalTitle.textContent = 'Criar Unidade';
    form.reset();
    form.classList.remove('was-validated');
    modal.show();
  }

  btnCriar.addEventListener('click', abrirCriacao);

  btnEditar.addEventListener('click', () => {
    if (indiceSelecionado === null) return alert('Selecione uma unidade para editar.');
    abrirEdicao(indiceSelecionado);
  });

  btnExcluir.addEventListener('click', () => {
    if (indiceSelecionado === null) return alert('Selecione uma unidade para excluir.');
    if (confirm('Deseja realmente excluir esta unidade?')) {
      unidades.splice(indiceSelecionado, 1);
      localStorage.setItem(unidadesKey, JSON.stringify(unidades));
      indiceSelecionado = null;
      mostrarTabela(filtrar());
    }
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const nome = nomeInput.value.trim();
    const responsavel = responsavelInput.value.trim();

    const novaUnidade = { nome, responsavel };

    if (modoEdicao) {
      unidades[indiceEditando] = novaUnidade;
    } else {
      unidades.push(novaUnidade);
    }

    localStorage.setItem(unidadesKey, JSON.stringify(unidades));
    modal.hide();
    desabilitarBotoesAcao();
    mostrarTabela(filtrar());
  });

  inputFiltro.addEventListener('input', () => {
    mostrarTabela(filtrar());
    desabilitarBotoesAcao();
  });

  function filtrar() {
    const termo = inputFiltro.value.trim().toLowerCase();
    if (!termo) return unidades;
    return unidades.filter(u =>
      u.nome.toLowerCase().includes(termo) ||
      u.responsavel.toLowerCase().includes(termo)
    );
  }


  mostrarTabela(unidades);
  desabilitarBotoesAcao();
});
