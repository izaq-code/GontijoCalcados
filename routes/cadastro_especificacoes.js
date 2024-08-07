const { connection2 } = require('../public/chat/js/db.js');
const express = require('express');
const router = express.Router();


router.post('/cadastro_especificacoes', (req, res) => {
    const { tinta, cadarco, adesivo, material, solado, tipo_tinta } = req.body;

    const promises = [];

    if (tinta) {
        promises.push(inserttable('tinta', tinta));
    }
    if (cadarco) {
        promises.push(inserttable('cadarco', cadarco));
    }
    if (adesivo) {
        promises.push(inserttable('adesivo', adesivo));
    }
    if (material) {
        promises.push(inserttable('material', material));
    }
    if (solado) {
        promises.push(inserttable('solado', solado));
    }   
    if (tipo_tinta) {
        promises.push(inserttable('tipo_tinta', tipo_tinta));
    }

    Promise.all(promises)
        .then(() => res.send('Dados enviados com sucesso'))
        .catch(err => {
            console.error(err);
            res.status(500).send('Erro ao inserir dados.');
        });
});

function inserttable(tableName, value) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${tableName} (nome) VALUES (?)`;
        connection2.query(query, [value], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`Dados inseridos na tabela ${tableName}`);
                resolve(result);
            }
        });
    });
}

module.exports = router;
