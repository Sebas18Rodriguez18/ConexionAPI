<?php   

require_once 'controlador.php';
require_once 'modelo.php';

class UsuariosAjax{

    public $idUsuario;
    public $email;
    public $nombre;

    public static function mostrarDatos(){
        $result = modeloUsuarios::mostrarDatos();
        echo json_encode($result);
    }

    public function eliminarRegistro(){
        $valor = $this->idUsuario;
        $result = modeloUsuarios::eliminarRegistro($valor);
        echo json_encode($result);
    }

    public function actualizarRegistro(){
        $valor = [
            "id" => $this->idUsuario,
            "email" => $this->email,
            "nombre" => $this->nombre
        ];
        $result = modeloUsuarios::actualizarRegistro($valor);
        echo json_encode($result);
    }
}

if (isset($_POST['action']) && $_POST['action'] == 'mostrar') {
    UsuariosAjax::mostrarDatos();
}

if (isset($_POST['action']) && $_POST['action'] == 'eliminar') {
    $usuario = new UsuariosAjax;
    $usuario->idUsuario = $_POST['id'];

    $usuario->eliminarRegistro();
}

if (isset($_POST['action']) && $_POST['action'] == 'editar') {
  $usuario = new UsuariosAjax;
  $usuario->idUsuario = $_POST['id'];
  
  $result = modeloUsuarios::mostrarRegistro($usuario->idUsuario);
  echo json_encode($result);
}

if (isset($_POST['action']) && $_POST['action'] == 'guardar') {
    $usuario = new UsuariosAjax;
    $usuario->idUsuario = $_POST['id'];
    $usuario->nombre = $_POST['nombre'];
    $usuario->email = $_POST['email'];
    $usuario->actualizarRegistro();
}