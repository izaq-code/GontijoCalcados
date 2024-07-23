const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

// Rota POST para inserir uma demanda de calçado no banco de dados ProductEase
router.post('/calcado', (req, res) => {
  const { nome, espe_linha, espacamento_da_costura, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data } = req.body;

  const query = `INSERT INTO calcado (nome, espacamento_da_costura, espe_linha, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection2.query(query, [nome, espacamento_da_costura, espe_linha, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data], (err) => {
      if (err) {
          console.error('Erro ao inserir calcado no banco de dados:', err);
          res.status(500).send('Erro ao enviar calcado');
          return;
      }
      res.status(201).send('Calcado enviado com sucesso');
  });
});

router.get('/info_produtos/:id', (req, res) => {
    const id = req.params.id;
  
    const query = `
      SELECT 
        material.nome as nome,
        tipo_tinta.nome as tipotinta,
        calcado.espe_linha as espelinha,
        solado.nome as nomesolado,
        cadarco.nome as nomecadarco,
        calcado.temp_equi  as tempocalcado,
        tinta.nome as nometinta,
        calcado.cor_linha as corlinhacalcado,
        calcado.tam_costura as temcosturacalcado,
        calcado.temp_sec as tempsec,
        calcado.img_calcado as img,
        calcado.reg_equip
      FROM 
        material
        INNER JOIN calcado ON material.id = calcado.id_material
        INNER JOIN tipo_tinta ON calcado.id_tip_tinta = tipo_tinta.id
        INNER JOIN solado ON calcado.id_solado = solado.id
        INNER JOIN cadarco ON calcado.id_cadarco = cadarco.id
        INNER JOIN tinta ON calcado.id_tinta = tinta.id
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



module.exports = router;
