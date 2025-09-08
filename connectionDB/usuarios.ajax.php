<?php
require_once "modelo.php";

class UsuariosAjax {
    public $idUsuario;
    public $document;
    public $email;
    public $nombre;
    public $password;
    public $status;
    public $role_id;

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
            "document" => $this->document,
            "email" => $this->email,
            "nombre" => $this->nombre,
            "status" => $this->status,
            "role_id" => $this->role_id
        ];

        if (!empty($this->password)) {
            $valor["password"] = password_hash($this->password, PASSWORD_DEFAULT);
        }

        $result = modeloUsuarios::actualizarRegistro($valor);
        echo json_encode($result);
    }

    public function crearRegistro() {
        $valor = [
            "document" => $this->document,
            "email" => $this->email,
            "nombre" => $this->nombre,
            "status" => $this->status,
            "role_id" => $this->role_id,
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

        case 'actualizar':
            $usuario = new UsuariosAjax;
            $usuario->idUsuario = $_POST['id'];
            $usuario->document = $_POST['document'];
            $usuario->nombre = $_POST['nombre'];
            $usuario->email = $_POST['email'];
            $usuario->status = $_POST['status'];
            $usuario->role_id = $_POST['role_id'];
            $usuario->password = $_POST['password'] ?? '';
            $usuario->actualizarRegistro();
            break;

        case 'crear':
            $usuario = new UsuariosAjax;
            $usuario->document = $_POST['document'];
            $usuario->nombre = $_POST['nombre'];
            $usuario->email = $_POST['email'];
            $usuario->status = $_POST['status'];
            $usuario->role_id = $_POST['role_id'];
            $usuario->password = $_POST['password'];
            $usuario->crearRegistro();
            break;
    }
}