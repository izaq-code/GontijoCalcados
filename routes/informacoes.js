const express = require('express');
const router = express.Router();
const { connection1, connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter a quantidade de demandas do banco de dados ProductEase
router.get('/quantidade-demandas', (req, res) => {
    const query = `SELECT COUNT(id) as quantidade
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

// Rota GET para obter a quantidade de mensagens não lidas no banco de dados ProductEase
router.get('/quantidade-mensagens', (req, res) => {
    const email = req.session.user.email;

    const query = `SELECT COUNT(id) AS mensagens_pendentes
                    FROM messages
                    WHERE privateChatWith = ?
                    AND is_read = 0;`;
    connection1.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao buscar mensagens:', err);
            res.status(500).send('Erro ao buscar mensagens');
            return;
        }
        res.json(results);
    });
});


module.exports = router;
