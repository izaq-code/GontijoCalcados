<?php
session_start();

$client_id = '686746649529-s1bjq6d0rjpl129etdr05ugps0n8a07b.apps.googleusercontent.com';
$client_secret = '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';
$redirect_uri = 'http://localhost/GONTIJOCALCADOS/Src/login_register/back-end/php/login-google.php';  // URL de redirecionamento autorizado
$scope = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

$auth_url = 'https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=' . $client_id . '&redirect_uri=' . urlencode($redirect_uri) . '&scope=' . urlencode($scope);

echo json_encode(array("redirectUrl" => $auth_url));
?>
