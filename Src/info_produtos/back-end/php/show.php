<?php

require '../../../assets/php/conexaop.php';

// //codigo em que puxa as imagens 
// if (isset($_GET['code'])) {
//   $id = 1; //$_POST['id'];

//   // Prepare a instrução SQL
//   $stmt = $pdo->prepare('SELECT img_calcado FROM id = :q WHERE calcado');

//   // Execute a instrução com o parâmetro
//   $stmt->execute(['q' => $id]);

//   // Busque os resultados
//   $results = $stmt->fetchAll();

//   // Faça algo com os resultados
//   foreach ($results as $row) {
//     header('Content-Type: image/jpg'); // ou outro tipo de imagem
//     echo $row['img_calcado'];
// }
// }

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $sql = $pdo->prepare("SELECT 
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
  
  ");

    $sql->execute();

    $resultado = array();

    if ($sql->rowCount() > 0) {

        while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
            $resultado[] = $row;
        }

    } else {
        echo json_encode(false);
        exit;
    }
    echo json_encode($resultado, JSON_UNESCAPED_SLASHES);

    $pdo = null;
}

?>