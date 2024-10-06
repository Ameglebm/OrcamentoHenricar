async function mostrarTotalCaixa() {
    const response = await fetch('http://localhost:3000/caixa');
    const { entradas, saidas, totalCaixa } = await response.json();

    // Mostrar o total em caixa
    document.getElementById('totalCaixa').innerText = `Total em Caixa: R$ ${totalCaixa.toFixed(2)}`;

    // Preencher a tabela de entradas
    const tabelaEntradas = document.getElementById('tabelaEntradas').getElementsByTagName('tbody')[0];
    entradas.forEach(entrada => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entrada.descricao}</td><td>R$ ${entrada.valor.toFixed(2)}</td><td>${new Date(entrada.data).toLocaleDateString()}</td>`;
        tabelaEntradas.appendChild(tr);
    });

    // Preencher a tabela de saídas
    const tabelaSaidas = document.getElementById('tabelaSaidas').getElementsByTagName('tbody')[0];
    saidas.forEach(saida => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${saida.descricao}</td><td>R$ ${saida.valor.toFixed(2)}</td><td>${new Date(saida.data).toLocaleDateString()}</td>`;
        tabelaSaidas.appendChild(tr);
    });

    // Gerar o gráfico de pizza
    gerarGraficoPizza(entradas, saidas, totalCaixa);
}

// Função para gerar o gráfico de pizza
function gerarGraficoPizza(entradas, saidas, totalCaixa) {
    const ctx = document.getElementById('graficoPizza').getContext('2d');

    const totalEntradas = entradas.reduce((acc, entrada) => acc + entrada.valor, 0);
    const totalSaidas = saidas.reduce((acc, saida) => acc + saida.valor, 0);

    const dados = {
        labels: ['Entradas', 'Saídas', 'Total em Caixa'],
        datasets: [{
            data: [totalEntradas, totalSaidas, totalCaixa],
            backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: dados,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Entradas, Saídas e Total em Caixa'
                }
            }
        }
    });
}

// Carregar o total em caixa e exibir a tabela e o gráfico ao carregar a página
window.onload = mostrarTotalCaixa;
