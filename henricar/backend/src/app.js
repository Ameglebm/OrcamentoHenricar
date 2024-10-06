const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

// Importando as rotas
const entradaRoutes = require('./routes/entrada'); // Rota de entradas
const saidaRoutes = require('./routes/saida');     // Rota de saídas

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Usando as rotas para entrada e saída
app.use('/entrada', entradaRoutes);
app.use('/saida', saidaRoutes);

// Total em caixa com detalhes de entradas e saídas
app.get('/caixa', async (req, res) => {
    try {
        // Buscar entradas e saídas
        const entradas = await prisma.entrada.findMany();
        const saidas = await prisma.saida.findMany();

        // Calcular o total de entradas e saídas
        const totalEntradas = entradas.reduce((acc, entrada) => acc + entrada.valor, 0);
        const totalSaidas = saidas.reduce((acc, saida) => acc + saida.valor, 0);
        const totalCaixa = totalEntradas - totalSaidas;

        // Retornar os dados de entradas, saídas e o total
        res.json({ 
            entradas, 
            saidas, 
            totalCaixa 
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do caixa' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
