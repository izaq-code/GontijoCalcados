
const { connection2 } = require('../public/chat/js/db.js');
const express = require('express');
const router = express.Router();
const moment = require('moment');
const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, '../public/assets/uploads');

// Rota POST para inserir uma demanda de calçado no banco de dados ProductEase
router.post('/calcado', (req, res) => {
    const {  nome, espe_linha, espacamento_da_costura, temp_equi, tam_costura, temp_sec, reg_equip, 
        img_calcadoPath, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, solado, logoSolado, linha, cadarco,  malha, 
        lingua, linhaLingua, couro, logo, etiqueta, espumainterna, bagulhodocardaco  } = req.body;

    console.log('Valores recebidos:', { nome, espe_linha, espacamento_da_costura, temp_equi, tam_costura, temp_sec, reg_equip, 
        img_calcadoPath, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, solado, logoSolado, linha, cadarco, malha, 
        lingua, linhaLingua, couro, logo, etiqueta, espumainterna, bagulhodocardaco });

    const img_calcado = req.files.img_calcado;

    const data = moment().format('YYYY-MM-DD');

    img_calcado.mv(path.join(uploadsDir, img_calcado.name), (err) => {
        if (err) {
            console.error('Erro ao mover imagem calcado:', err);
            return res.status(500).send('Erro ao enviar calcado');
        } else {
            insertCalcado();
        }
    });

    function insertCalcado() {
        const img_calcadoPath = path.join('../../../assets/uploads', img_calcado.name);

        const query = `INSERT INTO calcado (nome, espe_linha, espacamento_da_costura, temp_equi, tam_costura, temp_sec, reg_equip, img_calcado, id_tinta, id_material,
        id_cadarco, id_solado, id_adesivo, id_tip_tinta, data, cor_solado, cor_logo_solado, cadarco, cor_malha, cor_lingua,
        cor_linha, cor_linha_lingua, cor_couro, cor_logo, cor_espuma_interna, cor_etiqueta, cor_bagulho_cardaco) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

connection2.query(query, [nome, espe_linha, espacamento_da_costura, temp_equi, tam_costura, temp_sec, reg_equip, img_calcadoPath,
id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data, solado, logoSolado, cadarco, malha, lingua, linha, linhaLingua, 
couro, logo, etiqueta, espumainterna, bagulhodocardaco], (err) => {
if (err) {
   console.error('Erro ao inserir calcado no banco de dados:', err);
   return res.status(500).send('Erro ao enviar calcado');
}
res.status(201).send('Calcado enviado com sucesso');
});

    }
});




// Rota GET para receber os calçados do banco de dados ProductEase
router.get('/calcados', (req, res) => {
    const id = req.query.id;

    const query = `
        SELECT img_calcado as img, id, nome
        FROM calcado;
    `;

    connection2.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send({ message: 'Erro ao buscar dados' });
        } else {
            res.json(results);

        }
    });
});

router.get('/info_produtos', (req, res) => {
    const id = req.query.id;

    const query = `
        SELECT 
            calcado.nome AS nome,
            tipo_tinta.nome AS tipotinta,
            calcado.espe_linha AS espelinha,
            calcado.espacamento_da_costura AS espacamento_da_costura,
            calcado.temp_equi AS tempocalcado,
            calcado.tam_costura AS tamcosturacalcado,
            calcado.temp_sec AS tempsec,
            calcado.reg_equip AS reg_equip,
            calcado.img_calcado AS img,
            calcado.cor_solado AS cor_solado,
            calcado.cor_logo_solado AS cor_logo_solado,
            calcado.cadarco AS cor_cadarco,
            calcado.cor_malha AS cor_malha,
            calcado.cor_lingua AS cor_lingua,
            calcado.cor_linha AS cor_linha,
            calcado.cor_linha_lingua AS cor_linha_lingua,
            calcado.cor_couro AS cor_couro,
            calcado.cor_logo AS cor_logo,
            calcado.cor_espuma_interna AS cor_espuma_interna,
            calcado.cor_etiqueta AS cor_etiqueta,
            calcado.cor_bagulho_cardaco AS cor_bagulho_cardaco,
            tinta.nome AS nometinta,
            material.nome AS nome_material,
            cadarco.nome AS nomecadarco,
            solado.nome AS nomesolado
        FROM 
            calcado
            INNER JOIN tipo_tinta ON calcado.id_tip_tinta = tipo_tinta.id
            INNER JOIN tinta ON calcado.id_tinta = tinta.id
            INNER JOIN material ON calcado.id_material = material.id
            INNER JOIN cadarco ON calcado.id_cadarco = cadarco.id
            INNER JOIN solado ON calcado.id_solado = solado.id
        WHERE 
            calcado.id = ?
    `;

    connection2.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            res.status(500).send({ message: 'Erro ao buscar dados' });
        } else {
            if (results.length === 0) {
                res.json(false);
            } else {
                res.json(results);
            }
        }
    });
});


// Rota GET para obter os adesivos do banco de dados ProductEase
router.get('/adesivos', (req, res) => {
    const query = 'SELECT * FROM adesivo';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os adesivos:', err);
            res.status(500).send('Erro ao buscar adesivos');
            return;
        }
        res.json(results);
    });
});

// Rota GET para obter os cardaços do banco de dados ProductEase
router.get('/cadarcos', (req, res) => {
    const query = 'SELECT * FROM cadarco';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os cadarços:', err);
            res.status(500).send('Erro ao buscar cadarços');
            return;
        }
        res.json(results);
    });
});

// Rota GET para obter as tintas do banco de dados ProductEase
router.get('/tintas', (req, res) => {
    const query = 'SELECT * FROM tinta';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar as tintas:', err);
            res.status(500).send('Erro ao buscar tintas');
            return;
        }
        res.json(results);
    });
});

// Rota GET para obter os materiais do banco de dados ProductEase
router.get('/materiais', (req, res) => {
    const query = 'SELECT * FROM material';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os materiais:', err);
            res.status(500).send('Erro ao buscar materiais');
            return;
        }
        res.json(results);
    });
});

// Rota GET para obter os solados do banco de dados ProductEase
router.get('/solados', (req, res) => {
    const query = 'SELECT * FROM solado';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os solados:', err);
            res.status(500).send('Erro ao buscar solados');
            return;
        }
        res.json(results);
    });
});

// Rota GET para obter os tipos de tinta do banco de dados ProductEase
router.get('/tipo-de-tintas', (req, res) => {
    const query = 'SELECT * FROM tipo_tinta';
    connection2.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar os tipos de tinta:', err);
            res.status(500).send('Erro ao buscar tipos de tinta');
            return;
        }
        res.json(results);
    });
});

module.exports = router;