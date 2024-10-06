document.getElementById('adicionarProduto').addEventListener('click', function() {
    const tbody = document.getElementById('orcamentoProdutosBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" required></td>
        <td><input type="number" class="quantidade" value="1" min="1" required></td>
        <td><input type="number" class="valorUnitario" value="0" min="0" required></td>
        <td class="subtotal">0.00</td>
        <td><button type="button" class="removerLinha">Remover</button></td>
    `;
    tbody.appendChild(tr);
    atualizarTotaisProdutos();
});

document.getElementById('adicionarServico').addEventListener('click', function() {
    const tbody = document.getElementById('orcamentoServicosBody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td><input type="text" required></td>
        <td><input type="number" class="quantidade" value="1" min="1" required></td>
        <td><input type="number" class="valorUnitario" value="0" min="0" required></td>
        <td class="subtotal">0.00</td>
        <td><button type="button" class="removerLinha">Remover</button></td>
    `;
    tbody.appendChild(tr);
    atualizarTotaisServicos();
});

// Função para atualizar os totais de produtos
function atualizarTotaisProdutos() {
    const linhas = document.querySelectorAll('#orcamentoProdutosBody tr');
    let total = 0;
    linhas.forEach(row => {
        const quantidade = row.querySelector('.quantidade').value;
        const valorUnitario = row.querySelector('.valorUnitario').value;
        const subtotal = quantidade * valorUnitario;
        row.querySelector('.subtotal').textContent = subtotal.toFixed(2);
        total += subtotal;
    });
    document.getElementById('totalProdutos').textContent = total.toFixed(2);
    atualizarTotalOrcamento();
}

// Função para atualizar os totais de serviços
function atualizarTotaisServicos() {
    const linhas = document.querySelectorAll('#orcamentoServicosBody tr');
    let total = 0;
    linhas.forEach(row => {
        const quantidade = row.querySelector('.quantidade').value;
        const valorUnitario = row.querySelector('.valorUnitario').value;
        const subtotal = quantidade * valorUnitario;
        row.querySelector('.subtotal').textContent = subtotal.toFixed(2);
        total += subtotal;
    });
    document.getElementById('totalServicos').textContent = total.toFixed(2);
    atualizarTotalOrcamento();
}

function atualizarTotalOrcamento() {
    const totalProdutos = parseFloat(document.getElementById('totalProdutos').textContent) || 0;
    const totalServicos = parseFloat(document.getElementById('totalServicos').textContent) || 0;
    const desconto = parseFloat(document.getElementById('desconto').value) || 0;
    const totalOrcamento = totalProdutos + totalServicos;
    const totalComDesconto = totalOrcamento - (totalOrcamento * (desconto / 100));

    document.getElementById('totalOrcamento').textContent = totalOrcamento.toFixed(2);
    document.getElementById('totalComDesconto').textContent = totalComDesconto.toFixed(2);
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('removerLinha')) {
        e.target.closest('tr').remove();
        atualizarTotaisProdutos();
        atualizarTotaisServicos();
    }
});

// Gerar PDF
document.getElementById('gerarOrcamento').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Estilo e fonte
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(`Orçamento - Henricar`, 105, 10, { align: 'center' });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Informações do cliente
    const clienteInfo = [
        [`Nome: ${document.getElementById('nome').value}`],
        [`Endereço: ${document.getElementById('endereco').value}`],
        [`Contato: ${document.getElementById('contato').value}`],
        [`Placa do Carro: ${document.getElementById('placa').value}`],
        [`Modelo do Carro: ${document.getElementById('modelo').value}`],
        [`Cor do Carro: ${document.getElementById('cor').value}`],
        [`Ano do Carro: ${document.getElementById('ano').value}`],
        [`Data: ${document.getElementById('data').value}`]
    ];

    const clienteColumns = ["Informação"];
    const clienteRows = clienteInfo;
    
    doc.autoTable(clienteColumns, clienteRows, { startY: 20, theme: 'striped', headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, styles: { halign: 'left' } });

    let yOffset = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text("Orçamento de Produtos", 105, yOffset, { align: 'center' });
    yOffset += 10;
    const produtosColumn = ["Descrição", "Quantidade", "Valor Unitário (R$)", "Subtotal (R$)"];
    const produtosRows = [];

    const produtosRowsElement = document.querySelectorAll('#orcamentoProdutosBody tr');
    produtosRowsElement.forEach(row => {
        const descricao = row.querySelector('input[type="text"]').value;
        const quantidade = row.querySelector('.quantidade').value;
        const valorUnitario = row.querySelector('.valorUnitario').value;
        const subtotal = row.querySelector('.subtotal').textContent;
        
        produtosRows.push([descricao, quantidade, valorUnitario, subtotal]);
    });

    doc.autoTable(produtosColumn, produtosRows, { startY: yOffset, theme: 'striped', headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, styles: { halign: 'center' } });
    yOffset = doc.autoTable.previous.finalY + 10;

    doc.setFontSize(14);
    doc.text("Orçamento de Serviços", 105, yOffset, { align: 'center' });
    yOffset += 10;
    const servicosColumn = ["Descrição", "Quantidade", "Valor Unitário (R$)", "Subtotal (R$)"];
    const servicosRows = [];

    const servicosRowsElement = document.querySelectorAll('#orcamentoServicosBody tr');
    servicosRowsElement.forEach(row => {
        const descricao = row.querySelector('input[type="text"]').value;
        const quantidade = row.querySelector('.quantidade').value;
        const valorUnitario = row.querySelector('.valorUnitario').value;
        const subtotal = row.querySelector('.subtotal').textContent;
        
        servicosRows.push([descricao, quantidade, valorUnitario, subtotal]);
    });

    doc.autoTable(servicosColumn, servicosRows, { startY: yOffset, theme: 'striped', headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }, styles: { halign: 'center' } });
    
    const totalProdutos = document.getElementById('totalProdutos').textContent;
    const totalServicos = document.getElementById('totalServicos').textContent;
    const totalOrcamento = document.getElementById('totalOrcamento').textContent;
    const totalComDesconto = document.getElementById('totalComDesconto').textContent;

    yOffset = doc.autoTable.previous.finalY + 20; 
    doc.setFontSize(12);
    doc.text(`Total de Produtos: R$ ${totalProdutos}`, 10, yOffset);
    doc.text(`Total de Serviços: R$ ${totalServicos}`, 10, yOffset + 10);
    doc.text(`Total do Orçamento: R$ ${totalOrcamento}`, 10, yOffset + 20);
    doc.text(`Total com Desconto: R$ ${totalComDesconto}`, 10, yOffset + 30);

    doc.save('orcamento.pdf');
});
