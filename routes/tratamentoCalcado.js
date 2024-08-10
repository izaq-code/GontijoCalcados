const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const { connection2 } = require('../public/chat/js/db.js');

//Middleware para analisar dados codificados em URL
app.use(bodyParser.urlencoded({ extended: true }));

router.post('/calcadoConcluido', async (req, res) => {

    if (req.body.idCalcado) {
        const idCalcado = req.body.idCalcado;
        const idUser = req.session.user.id;

        connection2.query(`INSERT INTO controle (id_user, id_calcado, conc0OrErro1, data)
                            VALUES (?, ?, 0, curdate())`, [idUser, idCalcado], (error, results) => {
            if (error) {
                console.error(error);
            } else {

                res/*ouve */.json({ mensage: 'inserção realizada com sucesso' });
            }
        });
    }

});

router.post('/calcadoErro', async (req, res) => {

    if (req.body.idCalcado) {
        const idCalcado = req.body.idCalcado;
        const idUser = req.session.user.id;

        connection2.query(`INSERT INTO controle (id_user, id_calcado, conc0OrErro1, data)
                            VALUES (?, ?, 1, curdate())`, [idUser, idCalcado], (error, results) => {
            if (error) {
                console.error(error);
            } else {

                res/*ouve */.json({ mensage: 'inserção realizada com sucesso' });
            }
        });
    }

});


module.exports = router;