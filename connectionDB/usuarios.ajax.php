<?php
require_once "controlador.php";
require_once "modelo.php";

class UsuariosAjax {
    public $idUsuario;
    public $email;
    public $nombre;
    public $password;

    public static function mostrarDatos() {
        $result = modeloUsuarios::mostrarDatos();
        echo json_encode($result);
    }

    public function eliminarRegistro() {
        $result = modeloUsuarios::eliminarRegistro($this->idUsuario);
        echo json_encode($result);
    }

    public function actualizarRegistro() {
        $valor = [
            "id" => $this->idUsuario,
            "email" => $this->email,
            "nombre" => $this->nombre
        ];
        $result = modeloUsuarios::actualizarRegistro($valor);
        echo json_encode($result);
    }

    public function crearUsuario() {
        $valor = [
            "id" => $this->idUsuario,
            "email" => $this->email,
            "nombre" => $this->nombre,
            "password" => password_hash($this->password, PASSWORD_DEFAULT)
        ];
        $result = modeloUsuarios::crearUsuario($valor);
        echo json_encode($result);
    }
}

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'mostrar':
            UsuariosAjax::mostrarDatos();
            break;

        case 'eliminar':
            $usuario = new UsuariosAjax;
            $usuario->idUsuario = $_POST['id'];
            $usuario->eliminarRegistro();
            break;

        case 'editar':
            $result = modeloUsuarios::mostrarRegistro($_POST['id']);
            echo json_encode($result);
            break;

        case 'actualizar':
            $usuario = new UsuariosAjax;
            $usuario->idUsuario = $_POST['id'];
            $usuario->nombre = $_POST['nombre'];
            $usuario->email = $_POST['email'];
            $usuario->actualizarRegistro();
            break;

        case 'crear':
            $usuario = new UsuariosAjax;
            $usuario->idUsuario = $_POST['id'] ?? null;
            $usuario->nombre = $_POST['nombre'];
            $usuario->email = $_POST['email'];
            $usuario->password = $_POST['password'];
            $usuario->crearUsuario();
            break;
    }
}