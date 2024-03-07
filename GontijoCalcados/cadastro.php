<?php

include_once("conexao.php");


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ra = $_POST['ra_funcionario'];
    $email = $_POST['email_funcionario'];
    $senha = $_POST['senha_funcionario'];

    $sql = "SELECT ra_funcionario FROM ramal WHERE ra_funcionario = '$ra'";

    $result = mysqli_query($conexao, $sql);
    if (mysqli_num_rows($result) > 0) {
        $cadastro = "INSERT INTO funcionario (ra_funcionario, email_funcionario, senha_funcionario) VALUES ('$ra', '$email', '$senha')";

        if ($conexao->query($cadastro) === TRUE) {
            echo "Inserção realizada com sucesso";
        } else {
            echo "Erro na inserção: " . $conexao->error;
        }
    } else {
        echo 'ferrou';
    }
}
$conexao->close();
?>