const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const usuario_id = req.query.usuario_id;
    const hora = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment().format('YYYY-MM-DD');

    if (!usuario_id) {
        return res.status(400).json({ status: 'error', message: 'ID do usuário não fornecido.' });
    }

    let sql = `SELECT * FROM bater_ponto 
               WHERE DATE(ini_ponto) = ? AND id_funcionario = ? ORDER BY id DESC LIMIT 1`;

    connection2.query(sql, [data, usuario_id], (err, resultados) => {
        if (err) {
            console.error('Erro ao buscar ponto:', err);
            return res.status(500).json({ status: "error", message: "Erro ao buscar ponto" });
        }

        if (resultados.length > 0) {
            const registro = resultados[0];

            if (!registro.ini_ponto) {
                sql = `UPDATE bater_ponto 
                       SET ini_ponto = ? WHERE id = ?`;
            } else if (!registro.ini_intervalo) {
                sql = `UPDATE bater_ponto 
                       SET ini_intervalo = ? WHERE id = ?`;
            } else if (!registro.fim_intervalo) {
                sql = `UPDATE bater_ponto 
                       SET fim_intervalo = ? WHERE id = ?`;
            } else if (!registro.fim_ponto) {
                sql = `UPDATE bater_ponto 
                       SET fim_ponto = ? WHERE id = ?`;
            } else {
                sql = `INSERT INTO bater_ponto (ini_ponto, id_funcionario) VALUES (?, ?)`;
            }

            connection2.query(sql, [hora, registro.id], (err, resultado) => {
                if (err) {
                    console.error('Erro ao atualizar/inserir ponto:', err);
                    return res.status(500).json({ status: "error", message: "Erro ao atualizar o ponto." });
                }
                res.json({ status: "success", message: "Ponto registrado com sucesso!" });
            });

        } else {
            sql = `INSERT INTO bater_ponto (ini_ponto, id_funcionario) VALUES (?, ?)`;
            connection2.query(sql, [hora, usuario_id], (err, resultado) => {
                if (err) {
                    console.error('Erro ao inserir novo ponto:', err);
                    return res.status(500).json({ status: "error", message: "Erro ao inserir novo ponto." });
                }
                res.json({ status: "success", message: "Ponto registrado com sucesso!" });
            });
        }
    });
});

module.exports = router;
