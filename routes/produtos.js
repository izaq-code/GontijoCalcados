const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

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
