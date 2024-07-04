<?php

require 'conexao.php'; // Arquivo com a conexão ao banco de dados
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    
    $query = $pdo->prepare("SELECT * FROM usuario WHERE email = :email");

    $query->execute([
        'email' => $email
    ]);

    if($query -> rowCount() > 0) {
        $user = $query->fetch(PDO::FETCH_ASSOC);
        if(password_verify($senha, $user['senha'])){
            $_SESSION['user'] = $user;
        echo true;
        }
    } else {
        echo false;
    }
}
?>
