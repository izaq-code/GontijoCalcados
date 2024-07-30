const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

router.get('/meu_perfil', (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: 'ID do usuário é necessário' });
    }

    const query = ` 
        SELECT u.id AS id, u.email AS email, u.name AS nome, u.funcao AS funcao, u.profile_picture AS imagem, 
               bp.ini_ponto AS ponto_inicial, bp.fim_ponto AS ponto_final, bp.banco_de_horas AS banco 
        FROM usuario u 
        INNER JOIN bater_ponto bp ON u.id = bp.id_funcionario 
        INNER JOIN (
            SELECT id_funcionario, MAX(ini_ponto) AS ultimo_ponto 
            FROM bater_ponto 
            GROUP BY id_funcionario
        ) ultimo ON bp.id_funcionario = ultimo.id_funcionario 
                AND bp.ini_ponto = ultimo.ultimo_ponto 
        WHERE u.id = ?;`;

    connection2.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        res.json(results);
    });
});

module.exports = router;
