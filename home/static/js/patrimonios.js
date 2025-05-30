document.addEventListener('DOMContentLoaded', () => {
  const patrimoniosKey = 'patrimonios';
  const pendentesKey = 'patrimoniosPendentes';
  const unidadesKey = 'unidades';

  let patrimonios = JSON.parse(localStorage.getItem(patrimoniosKey)) || [];
  let patrimoniosPendentes = JSON.parse(localStorage.getItem(pendentesKey)) || [];
  let unidades = JSON.parse(localStorage.getItem(unidadesKey)) || [];

  const tbody = document.getElementById('patrimoniosTabela');
  const inputFiltro = document.getElementById('inputFiltro');
  const modalEl = document.getElementById('modalPatrimonio');
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById('formPatrimonio');
  const modalTitle = document.getElementById('modalPatrimonioLabel');

  const tipoInput = document.getElementById('tipo');
  const modeloInput = document.getElementById('modelo');
  const unidadeSelect = document.getElementById('unidade');
  const codigoInput = document.getElementById('codigo');

  const btnCriar = document.getElementById('btnCriarPatrimonio');
  const btnEditar = document.getElementById('btnEditarPatrimonio');
  const btnExcluir = document.getElementById('btnExcluirPatrimonio');

  let modoEdicao = false;
  let indiceEditando = null;
  let indiceSelecionado = null;

  function carregarUnidades() {
    unidadeSelect.innerHTML = '<option value="" disabled selected>Selecione uma unidade</option>';
    unidades.forEach((u, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = u.nome;
      unidadeSelect.appendChild(opt);
    });
  }

  function mostrarTabela(lista) {
    tbody.innerHTML = '';
    if (lista.length === 0) {
      tbody.innerHTML = `<tr><td colspan="4" class="text-center fst-italic">Nenhum patrimônio encontrado.</td></tr>`;
      desabilitarBotoesAcao();
      return;
    }
    lista.forEach((p, i) => {
      const unidadeNome = unidades[p.unidadeIndex]?.nome || 'N/A';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.tipo}</td>
        <td>${p.modelo}</td>
        <td>${unidadeNome}</td>
        <td>${p.codigo}</td>
      `;
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
    modalTitle.textContent = 'Editar Patrimônio';
    const p = patrimonios[index];
    tipoInput.value = p.tipo;
    modeloInput.value = p.modelo;
    unidadeSelect.value = p.unidadeIndex;
    codigoInput.value = p.codigo;
    form.classList.remove('was-validated');
    modal.show();
  }

  function abrirCriacao() {
    modoEdicao = false;
    indiceEditando = null;
    modalTitle.textContent = 'Criar Patrimônio (vai para pendentes)';
    form.reset();
    form.classList.remove('was-validated');
    modal.show();
  }

  btnCriar.addEventListener('click', abrirCriacao);

  btnEditar.addEventListener('click', () => {
    if (indiceSelecionado === null) return alert('Selecione um patrimônio para editar.');
    abrirEdicao(indiceSelecionado);
  });

  btnExcluir.addEventListener('click', () => {
    if (indiceSelecionado === null) return alert('Selecione um patrimônio para excluir.');
    if (confirm('Deseja realmente excluir este patrimônio?')) {
      patrimonios.splice(indiceSelecionado, 1);
      localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));
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

    const tipo = tipoInput.value.trim();
    const modelo = modeloInput.value.trim();
    const unidadeIndex = unidadeSelect.value;
    const codigo = codigoInput.value.trim();

    if (unidadeIndex === "") {
      alert('Selecione uma unidade válida!');
      return;
    }

    // Verifica duplicidade de código em ativos e pendentes
    const codigoExisteAtivo = patrimonios.some((p, idx) => p.codigo === codigo && (!modoEdicao || idx !== indiceEditando));
    const codigoExistePendente = patrimoniosPendentes.some(p => p.codigo === codigo);

    if (codigoExisteAtivo || codigoExistePendente) {
      alert('Código de patrimônio já existe!');
      return;
    }

    const patrimonio = { tipo, modelo, unidadeIndex: parseInt(unidadeIndex), codigo };

    if (modoEdicao) {
      patrimonios[indiceEditando] = patrimonio;
      localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));
    } else {
      patrimoniosPendentes.push(patrimonio);
      localStorage.setItem(pendentesKey, JSON.stringify(patrimoniosPendentes));
      alert('Patrimônio enviado para aprovação (pendente).');
    }

    modal.hide();
    desabilitarBotoesAcao();
    mostrarTabela(patrimonios);
  });

  inputFiltro.addEventListener('input', () => {
    mostrarTabela(filtrar());
    desabilitarBotoesAcao();
  });

  function filtrar() {
    const termo = inputFiltro.value.trim().toLowerCase();
    if (!termo) return patrimonios;
    return patrimonios.filter(p => {
      const unidadeNome = unidades[p.unidadeIndex]?.nome || '';
      return (
        p.tipo.toLowerCase().includes(termo) ||
        p.modelo.toLowerCase().includes(termo) ||
        unidadeNome.toLowerCase().includes(termo) ||
        p.codigo.toLowerCase().includes(termo)
      );
    });
  }

  // Inicialização
  carregarUnidades();
  mostrarTabela(patrimonios);
  desabilitarBotoesAcao();
});
