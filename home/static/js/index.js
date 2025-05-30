document.addEventListener('DOMContentLoaded', () => {
  // Pega os arrays do localStorage ou usa array vazio
  const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
  const unidades = JSON.parse(localStorage.getItem('unidades')) || [];
  const faltam = JSON.parse(localStorage.getItem('faltam')) || [];

  // Atualiza as quantidades nos cards
  document.getElementById('patrimonios-quantity').textContent = patrimonios.length;
  document.getElementById('unidades-quantity').textContent = unidades.length;
  document.getElementById('faltam-quantity').textContent = faltam.length;
});
// Função para gerar o gráfico de pizza na página inicial
document.addEventListener('DOMContentLoaded', () => {
  // Pega os dados de patrimonios do localStorage
  const patrimonios = JSON.parse(localStorage.getItem('patrimonios')) || [];
  
  // Contagem dos tipos de patrimônio
  const tipos = patrimonios.reduce((acc, patrimonio) => {
    acc[patrimonio.tipo] = (acc[patrimonio.tipo] || 0) + 1;
    return acc;
  }, {});

  // Labels e dados para o gráfico
  const labels = Object.keys(tipos);
  const data = Object.values(tipos);

  // Criando o gráfico
  const ctx = document.getElementById('patrimonioPieChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels, // Tipos de patrimônio
      datasets: [{
        label: 'Distribuição de Tipos de Patrimônios',
        data: data, // Quantidade de cada tipo
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'], // Cores do gráfico
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => {
              return `${tooltipItem.label}: ${tooltipItem.raw} itens`;
            }
          }
        }
      }
    }
  });
});
