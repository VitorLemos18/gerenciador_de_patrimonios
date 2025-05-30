document.getElementById('sidebarSearch').addEventListener('input', e => {
  const termo = e.target.value.toLowerCase();

  // Exemplo simples: se o termo tiver "patrimonio", redirecione para /patrimonios
  if (termo.includes('patrimonio')) {
    window.location.href = '/patrimonios/';
  } else if (termo.includes('unidade')) {
    window.location.href = '/unidade/';
  } else if (termo.includes('relatório') || termo.includes('relatorios')) {
    window.location.href = '#'; // ou página de relatório
  }
});
