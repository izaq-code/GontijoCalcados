const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter os feedbacks do banco de dados ProductEase
router.get('/feedbacks', (req, res) => {
    const query = 'SELECT * FROM faq';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os feedbacks:', err);
            res.status(500).send('Erro ao buscar feedbacks');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
