const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const { connection2 } = require('../public/chat/js/db.js');

//Middleware para analisar dados codificados em URL
app.use(bodyParser.urlencoded({ extended: true }));


router.get('/grafico1', async (req, res) => {

    connection2.query(`SELECT 
                        calcado.nome AS nome,
                        DATE_FORMAT(controle.data, '%Y-%m') AS data, -- Formata a data para ano e mês
                        COUNT(controle.id) AS finalizado
                        FROM calcado 
                        LEFT JOIN controle ON calcado.id = controle.id_calcado
                        WHERE controle.conc0OrErro1 = false
                        AND controle.data >= CURDATE() - INTERVAL 10 MONTH
                        GROUP BY calcado.nome, data
                        ORDER BY calcado.nome, data;
`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            const prod = results;

            connection2.query(`SELECT 
            calcado.nome AS nome,
            DATE_FORMAT(controle.data, '%Y-%m') AS data, -- Formata a data para ano e mês
            COUNT(controle.id) AS finalizado
            FROM calcado 
            LEFT JOIN controle ON calcado.id = controle.id_calcado
            WHERE controle.conc0OrErro1 = true
            AND controle.data >= CURDATE() - INTERVAL 10 MONTH
            GROUP BY calcado.nome, data
            ORDER BY calcado.nome, data;`, (error, results) => {
                if (error) {
                    console.error(error);
                } else {

                    const erro = results;
                    res/*ouve */.json({ prod, erro });
                }
            });
        }
    });

});


router.post('/graficoCalcado', async (req, res) => {

    if (req.body.idCalcado) {
        const id = req.body.idCalcado


        connection2.query(`SELECT 
        calcado.nome AS nome,
        DATE_FORMAT(controle.data, '%Y-%m') AS data, -- Formata a data para ano e mês
        COUNT(controle.id) AS finalizado
        FROM calcado 
        LEFT JOIN controle ON calcado.id = controle.id_calcado
        WHERE controle.conc0OrErro1 = false
        AND controle.data >= CURDATE() - INTERVAL 10 MONTH
        AND calcado.id = ?
        GROUP BY calcado.nome, data
        ORDER BY calcado.nome, data;`, [id], (error, results) => {
            if (error) {
                console.error(error);
            } else {
                const prod = results;

                connection2.query(`SELECT 
                calcado.nome AS nome,
                DATE_FORMAT(controle.data, '%Y-%m') AS data, -- Formata a data para ano e mês
                COUNT(controle.id) AS finalizado
                FROM calcado 
                LEFT JOIN controle ON calcado.id = controle.id_calcado
                WHERE controle.conc0OrErro1 = true
                AND controle.data >= CURDATE() - INTERVAL 10 MONTH
                AND calcado.id = ?
                GROUP BY calcado.nome, data
                ORDER BY calcado.nome, data;`, [id], (error, results) => {
                    if (error) {
                        console.error(error);
                    } else {

                        const erro = results;
                        res/*ouve */.json({ prod, erro });
                    }
                });
            }
        });
    }

});


router.get('/graficoUser', async (req, res) => {

    const user = req.session.user.id;

    connection2.query(`SELECT 
                        SUM(conc0OrErro1 = 0) AS conc,
                        SUM(conc0OrErro1 = 1) AS erro
                        FROM controle
                        WHERE id_user = ?;
`, [user], (error, results) => {
        if (error) {
            console.error(error);
        } else {
            sucess = results
            res/*ouve */.json(sucess);

        }
    });

});

router.post('/graficoUser2', async (req, res) => {

    if(req.body.idFuncionario){
    const user = req.body.idFuncionario;

    connection2.query(`SELECT 
                        SUM(conc0OrErro1 = 0) AS conc,
                        SUM(conc0OrErro1 = 1) AS erro
                        FROM controle
                        WHERE id_user = ?;
`, [user], (error, results) => {
        if (error) {
            console.error(error);
        } else {
            sucess = results
            res/*ouve */.json(sucess);

        }
    });
    }
});


module.exports = router;