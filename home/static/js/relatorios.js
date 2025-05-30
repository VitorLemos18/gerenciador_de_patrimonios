document.addEventListener('DOMContentLoaded', () => {
  const patrimoniosKey = 'patrimonios';
  const unidadesKey = 'unidades';

  let patrimonios = JSON.parse(localStorage.getItem(patrimoniosKey)) || [];
  let unidades = JSON.parse(localStorage.getItem(unidadesKey)) || [];

  const filtroTipo = document.getElementById('filtroTipo');
  const filtroUnidade = document.getElementById('filtroUnidade');
  const tabela = document.getElementById('tabelaRelatorios');
  const btnExportCSV = document.getElementById('btnExportCSV');
  const btnExportPDF = document.getElementById('btnExportPDF');

  // Preenche os selects de filtro (tipo e unidade)
  function popularFiltros() {
    const tipos = [...new Set(patrimonios.map(p => p.tipo))].sort();
    filtroTipo.innerHTML = '<option value="">Todos os Tipos</option>' +
      tipos.map(t => `<option value="${t}">${t}</option>`).join('');

    filtroUnidade.innerHTML = '<option value="">Todas as Unidades</option>' +
      unidades.map((u, i) => `<option value="${i}">${u.nome}</option>`).join('');
  }

  // Filtra patrimônios conforme filtros
  function aplicarFiltros() {
    let listaFiltrada = patrimonios;

    const tipo = filtroTipo.value;
    const unidade = filtroUnidade.value;

    if (tipo) {
      listaFiltrada = listaFiltrada.filter(p => p.tipo === tipo);
    }
    if (unidade) {
      listaFiltrada = listaFiltrada.filter(p => p.unidadeIndex == unidade);
    }

    return listaFiltrada;
  }

  // Renderiza tabela com dados filtrados
  function renderizarTabela(lista) {
    tabela.innerHTML = '';
    if (lista.length === 0) {
      tabela.innerHTML = `<tr><td colspan="4" class="text-center fst-italic">Nenhum patrimônio encontrado.</td></tr>`;
      return;
    }

    lista.forEach(p => {
      const unidadeNome = unidades[p.unidadeIndex]?.nome || 'N/A';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.tipo}</td>
        <td>${p.modelo}</td>
        <td>${unidadeNome}</td>
        <td>${p.codigo}</td>
      `;
      tabela.appendChild(tr);
    });
  }

  // Exporta tabela filtrada para CSV
  function exportarCSV(lista) {
    if (lista.length === 0) {
      alert('Nenhum dado para exportar.');
      return;
    }

    const cabecalho = ['Tipo', 'Modelo', 'Unidade', 'Código'];
    const linhas = lista.map(p => [
      p.tipo,
      p.modelo,
      unidades[p.unidadeIndex]?.nome || 'N/A',
      p.codigo
    ]);

    let csvContent = cabecalho.join(';') + '\n';
    linhas.forEach(linha => {
      csvContent += linha.join(';') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_patrimonios.csv';
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Exporta tabela filtrada para PDF (usando jsPDF + autotable)
  function exportarPDF(lista) {
    if (lista.length === 0) {
      alert('Nenhum dado para exportar.');
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Relatório de Patrimônios', 14, 20);

    const colunas = ['Tipo', 'Modelo', 'Unidade', 'Código'];
    const linhas = lista.map(p => [
      p.tipo,
      p.modelo,
      unidades[p.unidadeIndex]?.nome || 'N/A',
      p.codigo
    ]);

    doc.autoTable({
      startY: 30,
      head: [colunas],
      body: linhas,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [0, 123, 255] }
    });

    doc.save('relatorio_patrimonios.pdf');
  }

  // Atualiza UI (tabela)
  function atualizarUI() {
    const filtrado = aplicarFiltros();
    renderizarTabela(filtrado);
  }

  popularFiltros();
  atualizarUI();

  filtroTipo.addEventListener('change', atualizarUI);
  filtroUnidade.addEventListener('change', atualizarUI);

  btnExportCSV.addEventListener('click', () => {
    exportarCSV(aplicarFiltros());
  });

  btnExportPDF.addEventListener('click', () => {
    exportarPDF(aplicarFiltros());
  });
});
