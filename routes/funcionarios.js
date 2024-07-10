const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter funcionários do banco de dados ProductEase
router.get('/funcionarios', (req, res) => {
    const query = 'SELECT * FROM usuario';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar funcionários:', err);
            res.status(500).send('Erro ao buscar funcionários');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
