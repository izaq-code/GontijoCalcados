const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

router.get('/bater_ponto', (req, res) => {
    const dataAtual = moment().format('YYYY-MM-DD');
    const dataHoraAtual = moment().format('YYYY-MM-DD HH:mm:ss');
    const usuario_id = req.query.usuario_id;

    if (!usuario_id) {
        return res.status(400).json({ error: 'Usuário ID não encontrado' });
    }

    connection2.query(
        'SELECT * FROM bater_ponto WHERE id_funcionario = ? AND DATE(ini_ponto) = ? ORDER BY ini_ponto DESC LIMIT 1',
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
                        `UPDATE bater_ponto SET ${update} = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?`,
                        [dataHoraAtual, usuario_id, dataAtual],
                        (erro) => {
                            if (erro) {
                                console.error('Erro ao atualizar registro:', erro);
                                return res.status(500).json({ error: 'Erro ao atualizar registro' });
                            }

                            if (update === 'fim_ponto') {
                                const iniPonto = moment(ponto.ini_ponto);
                                const fimPonto = moment(dataHoraAtual);

                                // Calculando horas trabalhadas
                                const horasTrabalhadas = fimPonto.diff(iniPonto, 'minutes', true); // Em minutos
                                const saldoMinutos = horasTrabalhadas - (8 * 60); // Subtrai 8 horas em minutos

                                console.log(`Horas trabalhadas: ${horasTrabalhadas / 60}`);
                                console.log(`Saldo minutos: ${saldoMinutos}`);

                                // Formatando saldo de minutos para o formato HH:mm:ss
                                const saldoHorasFormatado = formatarHoras(saldoMinutos);

                                connection2.query(
                                    'UPDATE bater_ponto SET saldo_horas = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?',
                                    [saldoHorasFormatado, usuario_id, dataAtual],
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

                                                let saldoAcumulado = resultado[0].saldo_acumulado || 0;
                                                const saldoAcumuladoFormatado = formatarHoras(saldoAcumulado * 60);

                                                connection2.query(
                                                    'UPDATE bater_ponto SET banco_de_horas = ? WHERE id_funcionario = ? AND DATE(ini_ponto) = ?',
                                                    [saldoAcumuladoFormatado, usuario_id, dataAtual],
                                                    (erro) => {
                                                        if (erro) {
                                                            console.error('Erro ao atualizar banco de horas:', erro);
                                                            return res.status(500).json({ error: 'Erro ao atualizar banco de horas' });
                                                        }
                                                        res.json({
                                                            message: 'Ponto registrado e saldo de horas atualizado com sucesso',
                                                            saldoHoras: saldoAcumuladoFormatado,
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
                    'INSERT INTO bater_ponto (id_funcionario, ini_ponto) VALUES (?, ?)',
                    [usuario_id, dataHoraAtual],
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

function formatarHoras(minutos) {
    const horas = Math.floor(Math.abs(minutos) / 60);
    const minutosRestantes = Math.abs(minutos) % 60;
    const horasFormatadas = horas.toString().padStart(2, '0');
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');

    const sinal = minutos < 0 ? '-' : '';
    return `${sinal}${horasFormatadas}:${minutosFormatados}:00`;
}

module.exports = router;
