const express = require('express');
const { PrismaClient } = require('@prisma/client');

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    const { descricao, valor, data } = req.body;
    const entrada = await prisma.entrada.create({
        data: { descricao, valor, data: new Date(data) }
    });
    res.json(entrada);
});

module.exports = router;
