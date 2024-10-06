async function adicionarSaida() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;

    if (!descricao || isNaN(valor) || !data) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Enviar a saída para o servidor
        const response = await fetch('http://localhost:3000/saida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ descricao, valor, data })
        });

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        // Alerta de sucesso
        alert("Adicionado");

        // Atualizar o gráfico
        atualizarGrafico();
    } catch (error) {
        // Alerta de erro
        alert("Houve um erro, tente novamente");
    }
}

// Função para atualizar o gráfico
async function atualizarGrafico() {
    const response = await fetch('http://localhost:3000/saida');
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

// Carregar dados iniciais no gráfico ao abrir a página
window.onload = atualizarGrafico;
