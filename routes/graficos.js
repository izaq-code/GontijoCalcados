const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const { connection2 } = require('../public/chat/js/db.js');


router.get('/grafico1', async (req, res) => {

    connection2.query(`SELECT 
                        calcado.nome AS nome,
                        controle.data AS data,
                        COUNT(controle.id) AS finalizado
                        FROM calcado 
                        LEFT JOIN 
                        controle ON calcado.id = controle.id_calcado
                        WHERE calcado.inProd = true
                        GROUP BY calcado.id, controle.data`, (error, results) => {
        if (error) {
            console.error(error);
        } else {
            const prod = results;

            connection2.query(`SELECT 
                        calcado.nome AS nome,
                        controle.data AS data,
                        COUNT(controle.id) AS finalizado
                        FROM calcado 
                        LEFT JOIN 
                        controle ON calcado.id = controle.id_calcado
                        WHERE calcado.inProd = false
                        GROUP BY calcado.id, controle.data`, (error, results) => {
                if (error) {
                    console.error(error);
                } else {

                    const erro = results;
                    res.json({ prod, erro });
                }
            });
        }
    });

});


module.exports = router;