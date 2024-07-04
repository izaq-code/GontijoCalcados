<?php   
    include_once("../../../assets/php/conexao.php");

    if($_SERVER["REQUEST_METHOD"] == 'POST'){

    $nome = $_POST['nome'];
    $comentario = $_POST['comentario'];
    $valor = $_POST['rating'];

    $sql = "INSERT INTO faq (name, comentario, avaliacao)
            VALUES ('$nome', '$comentario', '$valor')";
    }

    if($conexao->query($sql) === TRUE) {
        echo "Enviado com sucesso";
    } else {
        echo "Erro não enviado";
    }

    $conexao->close();
?>