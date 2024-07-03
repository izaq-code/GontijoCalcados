<?php

require '../../conexao.php'; // Arquivo com a conexão ao banco de dados

header('Content-Type: application/json');

$response = array('success' => false, 'message' => '', 'result' => null);

try{

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $query = $pdo->query("SELECT id, caminho FROM tinta");


    if ($query->rowCount() > 0) {

        while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
            $resp = $row;
        };
        $response['result'] = $resp;
        $response['success'] = true;
        $response['message'] = '';
    } else {
        $response['message'] = 'Por favor, cadastre uma tinta ou entre em contato com o suporte ! ';
    }

} else {
    $response['message'] = 'Invalid request method';
}

echo json_encode($response);
} catch (PDOException $e){
    $response['message'] = $e;

echo json_encode($response);

}