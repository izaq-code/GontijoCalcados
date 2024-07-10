<?php
include_once("../../../assets/php/conexao.php");

$sql = "SELECT id, profile_picture, name
         FROM usuario";

$resultado = $conexao->query($sql);

$funcionarios = array();

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $funcionarios[] = array(
            'id' => $row['id'],
            'nome' => $row['name'],
            'imagem' => $row['profile_picture'],
        );
    }
} else {
    echo "Nenhum produto encontrado.";
}

echo json_encode($funcionarios);
