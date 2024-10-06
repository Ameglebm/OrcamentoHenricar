const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

// Rota para adicionar uma saída
router.post('/', async (req, res) => {
    const { descricao, valor, data } = req.body;
    const saida = await prisma.saida.create({
        data: { descricao, valor, data: new Date(data) }
    });
    res.json(saida);
});

module.exports = router;
