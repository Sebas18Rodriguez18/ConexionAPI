<?php   

require_once 'controlador.php';
require_once 'modelo.php';

class usuariosFetch{
    static public function mostrarDatos(){
        $result = controladorUsuarios::mostrarDatos();
        // return $result;
        echo json_encode($result);
    }
}

if (isset($_POST['action']) && $_POST['action'] == 'mostrar') {
    $usuario = new usuariosFetch;
    $usuario->mostrarDatos();


    // usuariosFetch::mostrarDatos();
}