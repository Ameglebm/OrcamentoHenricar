async function adicionarSaida() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    if (!descricao || isNaN(valor) || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`${siteAcesso}/saida`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor, data })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        alert("Adicionado");

        atualizarGrafico();
    } catch (error) {
        alert("Houve um erro, tente novamente");
    }
}

async function atualizarGrafico() {
    const response = await fetch(`${siteAcesso}/saida`);
    const saidas = await response.json();

    const ctx = document.getElementById('graficoSaida').getContext('2d');
    const descricaoSaidas = saidas.map(s => s.descricao);
    const valoresSaidas = saidas.map(s => s.valor);

    const grafico = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: descricaoSaidas,
            datasets: [{
                label: 'Saídas',
                data: valoresSaidas,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            }]
        },
    });
}

window.onload = atualizarGrafico;
