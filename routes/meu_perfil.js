const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');


router.post('/meu_perfil', (req, res) => {
    const usuario_id = req.body.usuario_id; 
    const query = 'SELECT u.email AS email, u.name AS nome, u.funcao AS funcao, u.profile_picture AS imagem, bp.ini_ponto AS ponto_inicial, bp.fim_ponto AS ponto_final, bp.banco_de_horas AS banco FROM usuario u INNER JOIN bater_ponto bp ON u.id = bp.id_funcionario INNER JOIN ( SELECT id_funcionario, MAX(ini_ponto) AS ultimo_ponto FROM bater_ponto GROUP BY id_funcionario) ultimo ON bp.id_funcionario = ultimo.id_funcionario AND bp.ini_ponto = ultimo.ultimo_ponto WHERE u.id = ?;'
    connection2.query(query, [usuario_id], (error, results) => {
       
        const user = results[0]; 
        res.json({
            email: user.email,
            nome: user.nome,
            funcao: user.funcao,
            imagem: user.imagem,
            ponto_inicial: user.ponto_inicial,
            ponto_final: user.ponto_final,
            banco: user.banco
        });
    });
});
module.exports = router;