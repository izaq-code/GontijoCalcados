const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js'); 
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const horaAtual = moment().format('HH:mm:ss');
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
                        (erro, resultado) => {
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

                          
                                let bancoHorasMinutos = saldoMinutos;
                                if (ponto.banco_de_horas) {
                                    const [bancoHoras, bancoMinutos] = ponto.banco_de_horas.split(':').map(Number);
                                    bancoHorasMinutos += (bancoHoras * 60) + bancoMinutos; 
                                }

                        
                                const saldoHoras = moment.utc(Math.abs(saldoMinutos) * 60 * 1000).format('HH:mm');
                                const saldoHorasComSinal = saldoMinutos >= 0 ? `+${saldoHoras}` : `-${saldoHoras}`;

                          
                                const bancoHoras = moment.utc(Math.abs(bancoHorasMinutos) * 60 * 1000).format('HH:mm');
                                const bancoHorasComSinal = bancoHorasMinutos >= 0 ? `+${bancoHoras}` : `-${bancoHoras}`;

                                connection2.query(
                                    'UPDATE bater_ponto SET saldo_horas = ?, banco_de_horas = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?',
                                    [saldoHorasComSinal, bancoHorasComSinal, usuario_id, dataAtual],
                                    (erro, resultado) => {
                                        if (erro) {
                                            console.error('Erro ao atualizar saldo de horas:', erro);
                                            return res.status(500).send('Erro ao atualizar saldo de horas');
                                        }
                                        res.send(`Ponto registrado e saldo de horas atualizado com sucesso. Saldo de horas: ${saldoHorasComSinal}, Banco de horas: ${bancoHorasComSinal}`);
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
                    [usuario_id, dataHoraAtual],
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
