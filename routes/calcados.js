const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');
const moment = require('moment');

// Rota POST para inserir uma demanda de calçado no banco de dados ProductEase
router.post('/calcado', (req, res) => {
  const { nome, espe_linha, espacamento_da_costura, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, tresd_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta } = req.body;

  console.log(req.body);

  const data = moment().format('YYYY-MM-DD');

  const query = `INSERT INTO calcado (nome, espacamento_da_costura, espe_linha, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, 3d_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection2.query(query, [nome, espacamento_da_costura, espe_linha, temp_equi, cor_linha, tam_costura, temp_sec, reg_equip, img_calcado, tresd_calcado, id_tinta, id_material, id_cadarco, id_solado, id_adesivo, id_tip_tinta, data], (err) => {
    if (err) {
      console.error('Erro ao inserir calcado no banco de dados:', err);
      res.status(500).send('Erro ao enviar calcado');
      return;
    }
    res.status(201).send('Calcado enviado com sucesso');
  });
});

// esta parte aqui mostra todas as imagens do banco de dados
router.get('/imagens', (req, res) => {
  const id = req.query.id;

  const query = `
     SELECT 
  img_calcado as img,id
  FROM 
  calcado;

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

// agora essa é a parte em que mostra os reultados após o clique 
router.get('/info_produtos', (req, res) => {
  const id = req.query.id;

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
          calcado
          INNER JOIN material ON material.id = calcado.id_material
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