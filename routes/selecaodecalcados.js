const express = require('express');
const router = express.Router();
const { connection2 } = require('../public/chat/js/db.js');

 router.get('/info_produtos', (req, res) => {
//     const id = req.query.id;

//     const query = `
//        SELECT 
//     img_calcado as img
//     FROM 
//     calcado;

//     `;

//     connection2.query(query, [id], (err, results) => {
//         if (err) {
//             console.error('Erro ao buscar dados:', err);
//             res.status(500).send({ message: 'Erro ao buscar dados' });
//         } else {
//          res.json(results);
            
//         }
//     });
// 
});




module.exports = router;
