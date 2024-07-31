const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter a quantidade de demandas do banco de dados ProductEase
router.get('/quantidade-demandas', (req, res) => {
    const query =  `SELECT COUNT(id) as quantidade
                    FROM calcado`;
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar demandas:', err);
            res.status(500).send('Erro ao buscar demandas');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
