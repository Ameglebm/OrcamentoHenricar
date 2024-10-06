async function mostrarTotalCaixa() {
    const response = await fetch(`${siteAcesso}/caixa`);
    const { entradas, saidas, totalCaixa } = await response.json();

    document.getElementById('totalCaixa').innerText = ` R$ ${totalCaixa.toFixed(2)}`;

    const tabelaEntradas = document.getElementById('tabelaEntradas').getElementsByTagName('tbody')[0];
    entradas.forEach(entrada => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${entrada.descricao}</td><td>R$ ${entrada.valor.toFixed(2)}</td><td>${new Date(entrada.data).toLocaleDateString()}</td>`;
        tabelaEntradas.appendChild(tr);
    });

    const tabelaSaidas = document.getElementById('tabelaSaidas').getElementsByTagName('tbody')[0];
    saidas.forEach(saida => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${saida.descricao}</td><td>R$ ${saida.valor.toFixed(2)}</td><td>${new Date(saida.data).toLocaleDateString()}</td>`;
        tabelaSaidas.appendChild(tr);
    });

    gerarGraficoPizza(entradas, saidas, totalCaixa);
}

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

window.onload = mostrarTotalCaixa;
