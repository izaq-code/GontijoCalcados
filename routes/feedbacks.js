const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota POST para inserir os feedbacks do banco de dados ProductEase
app.post('/feedback', (req, res) => {
    const { nome, comentario, avaliacao } = req.body;

    console.log('Nome:', nome);
    console.log('Comentário:', comentario);
    console.log('Avaliação:', avaliacao);

    if (!nome || !comentario || !avaliacao) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const query = 'INSERT INTO faq (name, comentario, avaliacao) VALUES (?, ?, ?)';
    connection2.query(query, [nome, comentario, avaliacao], (err) => {
        if (err) {
            console.error('Erro ao inserir feedback no banco de dados:', err);
            res.status(500).send('Erro ao enviar feedback');
            return;
        }
        res.status(201).send('Feedback enviado com sucesso');
    });
});

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
