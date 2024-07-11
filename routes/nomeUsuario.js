const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter funcionários do banco de dados ProductEase
router.get('/nomeUsuario', (req, res) => {
    nome = req.session.user.name;
    res.json(nome);
});

module.exports = router;
