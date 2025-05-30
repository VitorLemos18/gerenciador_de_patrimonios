document.addEventListener('DOMContentLoaded', () => {
  const patrimoniosKey = 'patrimonios';
  let patrimonios = JSON.parse(localStorage.getItem(patrimoniosKey)) || [];

  // Função para atualizar quantidade no card
  function atualizarQuantidadePendentes() {
    const pendentes = patrimonios.filter(p => !p.codigo || p.codigo.length < 13);
    document.getElementById('pendentes-quantity').textContent = pendentes.length;
    return pendentes;
  }

  // Atualiza ao carregar
  let pendentes = atualizarQuantidadePendentes();

  // Modal bootstrap e elementos
  const modalEl = document.getElementById('modalPendentesRapido');
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById('formPendentesRapido');
  const inputCodigo = document.getElementById('inputCodigoRapido');
  const pendenteInfo = document.getElementById('pendenteInfo');

  let indiceEditando = null;

  // Abrir modal ao clicar no card
  document.getElementById('abrirModalPendentes').addEventListener('click', e => {
    e.preventDefault();
    if (pendentes.length === 0) {
      alert('Não há patrimônios pendentes para corrigir.');
      return;
    }
    // Edita o primeiro pendente da lista
    indiceEditando = patrimonios.indexOf(pendentes[0]);
    const p = patrimonios[indiceEditando];
    pendenteInfo.textContent = `Tipo: ${p.tipo}, Modelo: ${p.modelo}`;
    inputCodigo.value = p.codigo || '';
    form.classList.remove('was-validated');
    modal.show();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const novoCodigo = inputCodigo.value.trim();
    if (novoCodigo.length < 13) {
      inputCodigo.classList.add('is-invalid');
      return;
    } else {
      inputCodigo.classList.remove('is-invalid');
    }

    patrimonios[indiceEditando].codigo = novoCodigo;
    localStorage.setItem(patrimoniosKey, JSON.stringify(patrimonios));

    // Atualiza pendentes e quantidade
    pendentes = atualizarQuantidadePendentes();

    modal.hide();
  });

  // Atualiza quantidade na inicialização e depois que salvar
  atualizarQuantidadePendentes();
});
