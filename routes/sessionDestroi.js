const express = require('express');
const router = express.Router();

// Rota GET para obter funcionários do banco de dados ProductEase
router.get('/sessionDestroi', (req, res) => {
 
        
        req.session.destroy((err) =>{
            if (err) {
                console.error('Erro ao destruir sessão', err);
                res.status(500).send('Erro ao destruir sessão');
                return;
            }
        });
        res.send('Sessão destruída com sucesso');

});

module.exports = router;
