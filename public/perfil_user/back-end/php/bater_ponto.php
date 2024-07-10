<?php
    include_once("../../../assets/php/conexao.php");

    $hora = date('Y-m-d H:i:s'); 
    $data = date('Y-m-d');

    
    $sql = "SELECT * FROM bater_ponto 
            WHERE DATE(ini_ponto) = '$data' ORDER BY id DESC LIMIT 1";

    $resultado = mysqli_query($conexao, $sql);
    $registro = mysqli_fetch_assoc($resultado);

    if ($registro) {
        
        if (!$registro['ini_ponto']) {
            $sql = "UPDATE bater_ponto 
                    SET ini_ponto = '$hora' WHERE id = '{$registro['id']}'";

        } elseif (!$registro['ini_intervalo']) {
            $sql = "UPDATE bater_ponto 
                    SET ini_intervalo = '$hora' WHERE id = '{$registro['id']}'";

        } elseif (!$registro['fim_intervalo']) {
            $sql = "UPDATE bater_ponto 
                    SET fim_intervalo = '$hora' WHERE id = '{$registro['id']}'";

        } elseif (!$registro['fim_ponto']) {
            $sql = "UPDATE bater_ponto 
                    SET fim_ponto = '$hora' WHERE id = '{$registro['id']}'";

        } else {
            
            $sql = "INSERT INTO bater_ponto (ini_ponto) VALUES ('$hora')";
        }
    } else {
       
        $sql = "INSERT INTO bater_ponto (ini_ponto) VALUES ('$hora')";
    }

    if (mysqli_query($conexao, $sql)) {
        echo json_encode(["status" => "success", "message" => "Ponto registrado com sucesso!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao atualizar o ponto: " . mysqli_error($conexao)]);
    }

    // Fechar a conexão
    mysqli_close($conexao);
?>
