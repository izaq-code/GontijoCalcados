<?php
require '../../../assets/php/conexaop.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = $pdo->prepare("SELECT 
    material.nome as nome,
    tipo_tinta.nome as tipotinta,
    calcado.espe_linha,
    solado.nome,
    cadarco.nome,
    calcado.temp_equi,
    tinta.nome,
    calcado.cor_linha,
    calcado.tam_costura,
    calcado.temp_sec,
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