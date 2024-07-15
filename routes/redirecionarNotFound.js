const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota GET para obter funcionários do banco de dados ProductEase
router.get('/redirecionarNotFound', (req, res) => {
    var autenticado = true;
    var notFound = '';
    if (!req.session.user) {
        autenticado = false;
        notFound = 'http://localhost:3000/not-found/front-end/HTML/notfound.html';

    }
    const results = {autenticado, notFound};
    
    res.json(results);
});

module.exports = router;
