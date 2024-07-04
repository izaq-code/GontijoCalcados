<?php
session_start();
require 'conexao.php';

if (!isset($_SESSION['user'])) {
    header('Location: login.html');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $email = $_SESSION['user']['email'];

    $query = $pdo->prepare("UPDATE usuario SET senha = :password WHERE email = :email");
    $query->execute(['password' => $password, 'email' => $email]);

    $_SESSION['user']['password'] = $password;

    header('Location: http://localhost/fono/src/inicio/inicio.html');
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../cadastro.css">
    <link rel="stylesheet" href="../../assets/css/padrao.css">
    <title>Configurar Senha</title>
</head>
<body>

<h2>Configurar Senha</h2>
<form method="POST" action="col-dados.php">

<div class="input">
    <input type="password" id="password" name="password" required>
    <label for="input-senha">Senha</label>
</div>
    <button type="submit">Salvar Senha</button>
</form>

</body>
</html>
