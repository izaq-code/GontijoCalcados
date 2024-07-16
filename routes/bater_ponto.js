const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js'); 
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const horaAtual = moment().format('YYYY-MM-DD HH:mm:ss');
    const dataAtual = moment().format('YYYY-MM-DD');
    const usuario_id = req.query.usuario_id;

    if (!usuario_id) {
        return res.status(400).send('Usuário ID não encontrado');
    }

    connection2.query(
        'SELECT * FROM bater_ponto WHERE id_funcionario = ? AND DATE(ini_ponto) = ? ORDER BY ini_ponto DESC LIMIT 1',
        [usuario_id, dataAtual],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao consultar banco de dados:', erro); 
                return res.status(500).send('Erro ao consultar banco de dados');
            }

            let ponto = resultado[0];
            let update;

            if (ponto) {
                if (!ponto.ini_ponto) {
                    update = 'ini_ponto';
                } else if (!ponto.ini_intervalo) {
                    update = 'ini_intervalo';
                } else if (!ponto.fim_intervalo) {
                    update = 'fim_intervalo';
                } else if (!ponto.fim_ponto) {
                    update = 'fim_ponto';
                } else {
                    update = null;
                }

                if (update) {
                    connection2.query(
                        `UPDATE bater_ponto SET ${update} = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?`,
                        [horaAtual, usuario_id, dataAtual],
                        (erro, resultado) => {
                            if (erro) {
                                console.error('Erro ao atualizar registro:', err);
                                return res.status(500).send('Erro ao atualizar registro');
                            }
                            res.send('Ponto registrado com sucesso');
                        }
                    );
                } else {
                    connection2.query(
                        'INSERT INTO bater_ponto (id_funcionario, ini_ponto) VALUES (?, ?)',
                        [usuario_id, horaAtual],
                        (erro, resultado) => {
                            if (erro) {
                                console.error('Erro ao criar novo registro:', erro); 
                                return res.status(500).send('Erro ao criar novo registro');
                            }
                            res.send('Novo registro criado e ponto registrado com sucesso');
                        }
                    );
                }
            } else {
                connection2.query(
                    'INSERT INTO bater_ponto (id_funcionario, ini_ponto) VALUES (?, ?)',
                    [usuario_id, horaAtual],
                    (erro, resultado) => {
                        if (erro) {
                            console.error('Erro ao criar novo registro:', erro); 
                            return res.status(500).send('Erro ao criar novo registro');
                        }
                        res.send('Ponto registrado com sucesso');
                    }
                );
            }
        }
    );
});

module.exports = router;
