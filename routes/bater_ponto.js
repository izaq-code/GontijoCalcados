const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const dataAtual = moment().format('YYYY-MM-DD');
    const dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');
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
                } else if (!ponto.fim_ponto) {
                    update = 'fim_ponto';
                } else {
                    update = null;
                }

                if (update) {
                    connection2.query(
                        `UPDATE bater_ponto SET ${update} = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?`,
                        [dataHoraAtual, usuario_id, dataAtual],
                        (erro) => {
                            if (erro) {
                                console.error('Erro ao atualizar registro:', erro);
                                return res.status(500).send('Erro ao atualizar registro');
                            }

                            if (update === 'fim_ponto') {
                                const iniPonto = moment(ponto.ini_ponto);
                                const fimPonto = moment(dataHoraAtual);

                                const horasTrabalhadas = fimPonto.diff(iniPonto, 'hours', true) - 1;
                                const minutosTrabalhados = horasTrabalhadas * 60;
                                const saldoMinutos = minutosTrabalhados - (8 * 60);

                                console.log(`Horas trabalhadas: ${horasTrabalhadas}`);
                                console.log(`Minutos trabalhados: ${minutosTrabalhados}`);
                                console.log(`Saldo minutos: ${saldoMinutos}`);

                                const saldoHoras = saldoMinutos / 60;

                                
                                connection2.query(
                                    'UPDATE bater_ponto SET saldo_horas = SEC_TO_TIME(?) WHERE id_funcionario = ? AND DATE(ini_ponto) = ?',
                                    [saldoHoras * 3600, usuario_id, dataAtual],
                                    (erro) => {
                                        if (erro) {
                                            console.error('Erro ao atualizar saldo de horas atual:', erro);
                                            return res.status(500).send('Erro ao atualizar saldo de horas atual');
                                        }

                                        
                                        connection2.query(
                                            'SELECT SUM(COALESCE(TIME_TO_SEC(saldo_horas), 0)) AS saldo_acumulado FROM bater_ponto WHERE id_funcionario = ?',
                                            [usuario_id],
                                            (erro, resultado) => {
                                                if (erro) {
                                                    console.error('Erro ao consultar saldo acumulado:', erro);
                                                    return res.status(500).send('Erro ao consultar saldo acumulado');
                                                }

                                                let saldoAcumuladoSegundos = resultado[0].saldo_acumulado || 0;
                                                const saldoHorasFormatado = moment.utc(Math.abs(saldoAcumuladoSegundos) * 1000).format('HH:mm:ss');
                                                const saldoHorasComSinal = saldoAcumuladoSegundos >= 0 ? `${saldoHorasFormatado}` : `-${saldoHorasFormatado}`;

                                               
                                                connection2.query(
                                                    'UPDATE bater_ponto SET banco_de_horas = SEC_TO_TIME(?) WHERE id_funcionario = ? AND DATE(ini_ponto) = ?',
                                                    [saldoAcumuladoSegundos, usuario_id, dataAtual],
                                                    (erro) => {
                                                        if (erro) {
                                                            console.error('Erro ao atualizar banco de horas:', erro);
                                                            return res.status(500).send('Erro ao atualizar banco de horas');
                                                        }
                                                        res.send(`Ponto registrado e saldo de horas atualizado com sucesso. Saldo de horas: ${saldoHorasComSinal}, Banco de horas: ${saldoHorasComSinal}`);
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.send('Ponto registrado com sucesso');
                            }
                        }
                    );
                } else {
                    connection2.query(
                        'INSERT INTO bater_ponto (id_funcionario, ini_ponto) VALUES (?, ?)',
                        [usuario_id, dataHoraAtual],
                        (erro) => {
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
                    [usuario_id, dataHoraAtual],
                    (erro) => {
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