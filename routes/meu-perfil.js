const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

router.get('/meu_perfil', (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({ error: 'ID do usuário é necessário' });
    }

    const query = `
        SELECT u.id AS id, u.email AS email, u.name AS nome, u.funcao AS funcao, u.profile_picture AS imagem,DATE_FORMAT(bp.ini_ponto, '%d-%m-%Y %H:%i:%s') AS ponto_inicial,
        DATE_FORMAT(bp.fim_ponto, '%d-%m-%Y %H:%i:%s') AS ponto_final,
        bp.banco_de_horas AS banco
        FROM usuario u LEFT JOIN bater_ponto bp ON 
        u.id = bp.id_funcionario 
        AND bp.ini_ponto = (
        SELECT MAX(ini_ponto)
        FROM bater_ponto
        WHERE id_funcionario = u.id
)  WHERE u.id = ?;`;

    connection2.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

 
        const perfilFormatado = results.map(result => {
            return {
                id: result.id || "",
                email: result.email || "",
                nome: result.nome || "",
                funcao: result.funcao || "",
                imagem: result.imagem || "",
                ponto_inicial: result.ponto_inicial ? moment(result.ponto_inicial, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss') : "",
                ponto_final: result.ponto_final ? moment(result.ponto_final, 'DD-MM-YYYY HH:mm:ss').format('DD-MM-YYYY HH:mm:ss') : "",
                banco: result.banco || ""
            };
        });

        res.json(perfilFormatado);
    });
});

module.exports = router;
