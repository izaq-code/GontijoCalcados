const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const dataAtual = moment().format('YYYY-MM-DD');
    const horaAtual = moment().format('HH:mm:ss');
    const dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');
    const usuario_id = req.query.usuario_id;

    if (!usuario_id) {
        return res.status(400).json({ error: 'Usuário ID não encontrado' });
    }

    connection2.query(
        'SELECT * FROM bater_ponto WHERE id_funcionario = ? AND data = ? ORDER BY ini_ponto DESC LIMIT 1',
        [usuario_id, dataAtual],
        (erro, resultado) => {
            if (erro) {
                console.error('Erro ao consultar banco de dados:', erro);
                return res.status(500).json({ error: 'Erro ao consultar banco de dados' });
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
                        `UPDATE bater_ponto SET ${update} = ? WHERE id_funcionario = ? AND data = ?`,
                        [horaAtual, usuario_id, dataAtual],
                        (erro) => {
                            if (erro) {
                                console.error('Erro ao atualizar registro:', erro);
                                return res.status(500).json({ error: 'Erro ao atualizar registro' });
                            }

                            if (update === 'fim_ponto') {
                                const iniPonto = moment(`${dataAtual} ${ponto.ini_ponto}`);
                                const fimPonto = moment(dataHoraAtual);

                                const saldoTrabalhado = fimPonto.diff(iniPonto, 'seconds', true);
                                const saldoMinutos = saldoTrabalhado - (9 * 60 * 60 - 60 * 60);

                                const horasTrabalhadasFormatado = formatarHoras(saldoTrabalhado);
                                const saldoHorasFormatado = formatarHoras(saldoMinutos);

                                connection2.query(
                                    'UPDATE bater_ponto SET horas_trabalhadas = ?, saldo_horas = ? WHERE id_funcionario = ? AND data = ?',
                                    [horasTrabalhadasFormatado, saldoMinutos / 60, usuario_id, dataAtual], 
                                    (erro) => {
                                        if (erro) {
                                            console.error('Erro ao atualizar saldo de horas atual:', erro);
                                            return res.status(500).json({ error: 'Erro ao atualizar saldo de horas atual' });
                                        }

                                        connection2.query(
                                            'SELECT SUM(COALESCE(saldo_horas, 0)) AS saldo_acumulado FROM bater_ponto WHERE id_funcionario = ?',
                                            [usuario_id],
                                            (erro, resultado) => {
                                                if (erro) {
                                                    console.error('Erro ao consultar saldo acumulado:', erro);
                                                    return res.status(500).json({ error: 'Erro ao consultar saldo acumulado' });
                                                }

                                                const saldoAcumulado = resultado[0].saldo_acumulado || 0;
                                                const saldoAcumuladoMinutos = saldoAcumulado * 60;
                                                const saldoAcumuladoFormatado = formatarHoras(saldoAcumuladoMinutos);

                                                connection2.query(
                                                    'UPDATE bater_ponto SET banco_de_horas = ? WHERE id_funcionario = ? AND data = ?',
                                                    [saldoAcumuladoFormatado, usuario_id, dataAtual],
                                                    (erro) => {
                                                        if (erro) {
                                                            console.error('Erro ao atualizar banco de horas:', erro);
                                                            return res.status(500).json({ error: 'Erro ao atualizar banco de horas' });
                                                        }
                                                        res.json({
                                                            message: 'Ponto registrado e saldo de horas atualizado com sucesso',
                                                            saldoHoras: saldoMinutos / 60,
                                                            bancoHoras: saldoAcumuladoFormatado
                                                        });
                                                    }
                                                );
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.json({ message: 'Ponto registrado com sucesso' });
                            }
                        }
                    );
                } else {
                    res.json({ message: 'Registro já completo para hoje' });
                }
            } else {
                connection2.query(
                    'INSERT INTO bater_ponto (id_funcionario, ini_ponto, data) VALUES (?, ?, ?)',
                    [usuario_id, horaAtual, dataAtual],
                    (erro) => {
                        if (erro) {
                            console.error('Erro ao criar novo registro:', erro);
                            return res.status(500).json({ error: 'Erro ao criar novo registro' });
                        }
                        res.json({ message: 'Ponto registrado com sucesso' });
                    }
                );
            }
        }
    );
});

function formatarHoras(segundos) {
    const sinal = segundos < 0 ? '-' : '';
    const segundosAbs = Math.abs(segundos);
    const horas = Math.floor(segundosAbs / 3600);
    const minutos = Math.floor((segundosAbs % 3600) / 60);
    const segundosRestantes = segundosAbs % 60;

    return `${sinal}${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

module.exports = router;
