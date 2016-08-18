<?php

require 'connector.php';

$JSON       = file_get_contents("php://input");
$request    = json_decode($JSON);
$usuario    = $request->usuario; 
$password = $request->password;
consultarLogin($usuario,$password);
function consultarLogin($usuario,$password){
    $sql ="SELECT * FROM usuario WHERE USUARIO = '$usuario' AND PASSWORD = '$password' "; 
    try {
        $db = getConnection();
        $stmt = $db->query($sql);  
        $usuario = $stmt->fetchObject();
        $db = null;
        echo  json_encode($usuario);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
}
?>