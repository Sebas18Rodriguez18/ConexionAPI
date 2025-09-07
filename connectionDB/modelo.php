<?php
require_once 'conexion.php';

class modeloUsuarios {
    static public function mostrarDatos() {
        $link = conexion::conectar();
        $sql = $link->prepare("SELECT id, fullname, email FROM users");
        $sql->execute();
        return $sql->fetchAll();
    }

    static public function eliminarRegistro($id) {
        $link = conexion::conectar();
        $sql = $link->prepare("DELETE FROM users WHERE id = :id");
        $sql->bindParam(':id', $id, PDO::PARAM_INT);
        return $sql->execute() ? 'ok' : 'error';
    }

    static public function mostrarRegistro($id) {
        $link = conexion::conectar();
        $sql = $link->prepare("SELECT id, fullname, email FROM users WHERE id = :id");
        $sql->bindParam(':id', $id, PDO::PARAM_INT);
        $sql->execute();
        return $sql->fetch();
    }

    static public function actualizarRegistro($datos) {
        $link = conexion::conectar();
        $sql = $link->prepare("UPDATE users SET fullname = :nombre, email = :email WHERE id = :id");
        $sql->bindParam(':id', $datos["id"], PDO::PARAM_INT);
        $sql->bindParam(':nombre', $datos["nombre"], PDO::PARAM_STR);
        $sql->bindParam(':email', $datos["email"], PDO::PARAM_STR);
        return $sql->execute() ? 'ok' : 'error';
    }

    static public function crearUsuario($datos) {
        $link = conexion::conectar();
        $sql = $link->prepare("INSERT INTO users (fullname, email, `password`) 
                               VALUES (:nombre, :email, :password)");
        $sql->bindParam(':nombre', $datos["nombre"], PDO::PARAM_STR);
        $sql->bindParam(':email', $datos["email"], PDO::PARAM_STR);
        $sql->bindParam(':password', $datos["password"], PDO::PARAM_STR);
        return $sql->execute() ? 'ok' : 'error';
    }
}