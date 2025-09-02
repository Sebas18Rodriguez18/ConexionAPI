<?php

$usuario = $_POST['nombre'];
$password = $_POST['password'];

if ($usuario === '' || $password === ''){
    echo json_encode('error');

}
else{
    echo json_encode("Datos recibidos correctamente: $usuario, $password");
}