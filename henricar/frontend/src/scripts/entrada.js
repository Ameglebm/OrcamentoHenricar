async function adicionarEntrada() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    if (!descricao || isNaN(valor) || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`${siteAcesso}/entrada`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor, data })
        });

        if (response.ok) {
            alert("Adicionado");
        } else {
            alert("Ocorreu um erro. Tente novamente.");
        }

        atualizarGrafico();
    } catch (error) {
        alert("Ocorreu um erro. Tente novamente.");
        console.error('Erro:', error);
    }
}

async function atualizarGrafico() {
    const response = await fetch(`${siteAcesso}/entrada`);
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

window.onload = atualizarGrafico;
