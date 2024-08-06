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
        SELECT u.id AS id, u.email AS email, u.name AS nome, u.cpf AS cpf, u.funcao AS funcao, u.profile_picture AS imagem,
        TIME_FORMAT(bp.ini_ponto, '%H:%i:%s') AS ponto_inicial,
        TIME_FORMAT(bp.fim_ponto, '%H:%i:%s') AS ponto_final,
        COALESCE(bp.banco_de_horas, bh.banco_de_horas) AS banco,
      	bp.horas_trabalhadas AS horas_trabalhadas
    FROM usuario u
    LEFT JOIN bater_ponto bp 
    ON u.id = bp.id_funcionario AND bp.data = CURDATE()
    LEFT JOIN bater_ponto bh
    ON u.id = bh.id_funcionario
    WHERE u.id = ?
    ORDER BY bp.ini_ponto DESC  
    LIMIT 1;`

    connection2.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        const perfilFormatado = results.map(result => {
            return {
                id: result.id || "Sem ID cadastrado",
                email: result.email || "Sem email cadastrado",
                nome: result.nome || "Sem nome cadastrado",
                cpf: result.cpf || "Sem CPF cadastrado",
                funcao: result.funcao || "Sem função cadastrada",
                imagem: result.imagem || "Sem foto cadastrada",
                ponto_inicial: result.ponto_inicial ? moment(result.ponto_inicial, 'HH:mm:ss').format('HH:mm:ss') : "Sem Registro",
                ponto_final: result.ponto_final ? moment(result.ponto_final, 'HH:mm:ss').format('HH:mm:ss') : "Sem Registro",
                horas_trabalhadas: result.horas_trabalhadas || "Sem Registro",
                banco: result.banco || "Sem Registro"
            };
        });

        res.json(perfilFormatado);
    });
});

module.exports = router;
