document.getElementById('adicionarLinha').addEventListener('click', adicionarLinha);
document.getElementById('desconto').addEventListener('input', aplicarDesconto);

let totalOrcamento = 0;

function adicionarLinha() {
    const tbody = document.getElementById('orcamentoBody');

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" placeholder="Descrição"></td>
        <td><input type="number" class="quantidade" value="1"></td>
        <td><input type="number" class="valorUnitario" value="0.00"></td>
        <td class="subtotal">0.00</td>
        <td><button class="removerLinha">Remover</button></td>
    `;
    
    tbody.appendChild(tr);
    atualizarSubtotal(tr);

    tr.querySelector('.quantidade').addEventListener('input', () => atualizarSubtotal(tr));
    tr.querySelector('.valorUnitario').addEventListener('input', () => atualizarSubtotal(tr));

    tr.querySelector('.removerLinha').addEventListener('click', () => {
        tbody.removeChild(tr);
        atualizarTotalOrcamento();
    });
}

function atualizarSubtotal(tr) {
    const quantidade = parseFloat(tr.querySelector('.quantidade').value) || 0;
    const valorUnitario = parseFloat(tr.querySelector('.valorUnitario').value) || 0;
    const subtotal = quantidade * valorUnitario;
    
    tr.querySelector('.subtotal').textContent = subtotal.toFixed(2);
    atualizarTotalOrcamento();
}

function atualizarTotalOrcamento() {
    const subtotais = document.querySelectorAll('.subtotal');
    totalOrcamento = Array.from(subtotais).reduce((acc, subtotal) => acc + parseFloat(subtotal.textContent), 0);
    
    document.getElementById('totalOrcamento').textContent = totalOrcamento.toFixed(2);
    aplicarDesconto();
}

function aplicarDesconto() {
    const desconto = parseFloat(document.getElementById('desconto').value) || 0;
    const totalComDesconto = totalOrcamento - (totalOrcamento * (desconto / 100));
    
    document.getElementById('totalComDesconto').textContent = totalComDesconto.toFixed(2);
}

document.getElementById('gerarOrcamento').addEventListener('click', function() {
    window.print(); 
});
