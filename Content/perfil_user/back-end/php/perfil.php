<?php
include_once("../../../assets/php/conexao.php");

$sql = "SELECT id, profile_picture, name, funcao, email, telefone
         FROM usuario";

$resultado = $conexao->query($sql);

$perfil = array();

if ($resultado->num_rows > 0) {
    while ($row = $resultado->fetch_assoc()) {
        $perfil[] = array(
            'id' => $row['id'],
            'nome' => $row['name'],
            'imagem' => $row['profile_picture'],
            'funcao' => $row['funcao'],
            'email' => $row['email'],
            'telefone' => $row['telefone']
        );
    }
} else {
    echo "Nenhum produto encontrado.";
}

echo json_encode($perfil);
