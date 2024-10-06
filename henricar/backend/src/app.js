const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const entradaRoutes = require('./routes/entrada'); 
const saidaRoutes = require('./routes/saida');     

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/entrada', entradaRoutes);
app.use('/saida', saidaRoutes);

app.get('/caixa', async (req, res) => {
    try {
        const entradas = await prisma.entrada.findMany();
        const saidas = await prisma.saida.findMany();

        const totalEntradas = entradas.reduce((acc, entrada) => acc + entrada.valor, 0);
        const totalSaidas = saidas.reduce((acc, saida) => acc + saida.valor, 0);
        const totalCaixa = totalEntradas - totalSaidas;

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
