<?php
require '../../conexao.php'; 

if($_SERVER["REQUEST_METHOD"] == "POST") {

    $sql = $pdo->query("SELECT cod_paciente AS cod, nome_paciente AS nome 
    FROM dados_paciente");

    $resultado = array();

    if ($sql -> rowCount() > 0){
        
        while($row = $sql->fetch(PDO::FETCH_ASSOC)) {
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