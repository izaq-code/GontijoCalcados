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
                ponto_inicial: result.ponto_inicial ? moment(result.ponto_inicial, 'HH:mm:ss').format('HH:mm:ss') : "00:00:00",
                ponto_final: result.ponto_final ? moment(result.ponto_final, 'HH:mm:ss').format('HH:mm:ss') : "00:00:00",
                horas_trabalhadas: result.horas_trabalhadas || "00:00:00",
                banco: result.banco || "00:00:00"
            };
        });

        res.json(perfilFormatado);
    });
});


router.get('/historico', (req, res) => {
    const id = req.query.id;

    console.log('ID recebido:', id); 

    if (!id) {
        return res.status(400).json({ error: 'ID do usuário é necessário' });
    }

    const query2 = `
        SELECT bp.id AS id, bp.id_funcionario AS id_funcionario, bp.data AS data, bp.ini_ponto AS ponto_inicial, bp.fim_ponto AS ponto_final, 
        bp.horas_trabalhadas AS horas_trabalho, bp.banco_de_horas AS banco, 
   COALESCE( ( 
        SELECT bp_prev.banco_de_horas 
        FROM bater_ponto bp_prev 
        WHERE bp_prev.id_funcionario = bp.id_funcionario 
         AND bp_prev.data = DATE_SUB(bp.data, INTERVAL 1 DAY)
          ), '00:00:00' ) AS banco_de_horas_anterior 
    FROM bater_ponto bp 
    WHERE bp.id_funcionario = ?
    ORDER BY bp.data, bp.id_funcionario;
    `;

    connection2.query(query2, [id], (err, resultado) => {
        if (err) {
            console.error('Erro na consulta SQL:', err);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }

        console.log('Resultado da consulta SQL:', resultado); 

        const historicoFormatado = resultado.map(resultado => {
            return {
                id: resultado.id || "",
                id_funcionario: resultado.id_funcionario || "",
                data: resultado.data ? moment(resultado.data).format('DD-MM-YYYY') : "00-00-0000",
                ponto_inicial: resultado.ponto_inicial ? moment(resultado.ponto_inicial, 'HH:mm:ss').format('HH:mm:ss') : "00:00:00",
                ponto_final: resultado.ponto_final ? moment(resultado.ponto_final, 'HH:mm:ss').format('HH:mm:ss') : "00:00:00",
                horas_trabalho: resultado.horas_trabalho || "00:00:00",
                banco_de_horas_anterior: resultado.banco_de_horas_anterior || "00:00:00",
                banco: resultado.banco || "00:00:00",
            }
        });

        res.json(historicoFormatado);
    });
});
module.exports = router;
