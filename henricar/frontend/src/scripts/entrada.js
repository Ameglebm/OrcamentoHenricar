async function adicionarEntrada() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    if (!descricao || isNaN(valor) || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Enviar a entrada para o servidor
    await fetch('http://localhost:3000/entrada', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ descricao, valor, data })
    });

    // Atualizar o gráfico
    atualizarGrafico();
}

// Função para atualizar o gráfico
async function atualizarGrafico() {
    const response = await fetch('http://localhost:3000/entrada');
    const entradas = await response.json();

    const ctx = document.getElementById('graficoEntrada').getContext('2d');
    const descricaoEntradas = entradas.map(e => e.descricao);
    const valoresEntradas = entradas.map(e => e.valor);

    const grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: descricaoEntradas,
            datasets: [{
                label: 'Entradas',
                data: valoresEntradas,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }]
        },
    });
}

// Carregar dados iniciais no gráfico ao abrir a página
window.onload = atualizarGrafico;
