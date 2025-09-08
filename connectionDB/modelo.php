<?php
require_once 'conexion.php';

class modeloUsuarios {
    static public function mostrarDatos() {
        $link = conexion::conectar();
        $sql = $link->prepare("SELECT id, document, fullname, email, status, role_id FROM users");
        $sql->execute();
        return $sql->fetchAll(PDO::FETCH_ASSOC);
    }

    static public function eliminarRegistro($id) {
        $link = conexion::conectar();
        $sql = $link->prepare("DELETE FROM users WHERE id = :id");
        $sql->bindParam(':id', $id, PDO::PARAM_INT);
        return $sql->execute() ? 'ok' : $sql->errorInfo();
    }

    static public function actualizarRegistro($datos) {
        $link = conexion::conectar();

        if (!empty($datos["password"])) {
            $sql = $link->prepare("UPDATE users 
                SET fullname = :nombre, email = :email, document = :document, status = :status, role_id = :role_id, password = :password 
                WHERE id = :id");
            $sql->bindParam(':password', $datos["password"], PDO::PARAM_STR);
        } else {
            $sql = $link->prepare("UPDATE users 
                SET fullname = :nombre, email = :email, document = :document, status = :status, role_id = :role_id 
                WHERE id = :id");
        }

        $sql->bindParam(':id', $datos["id"], PDO::PARAM_INT);
        $sql->bindParam(':nombre', $datos["nombre"], PDO::PARAM_STR);
        $sql->bindParam(':email', $datos["email"], PDO::PARAM_STR);
        $sql->bindParam(':document', $datos["document"], PDO::PARAM_STR);
        $sql->bindParam(':status', $datos["status"], PDO::PARAM_STR);
        $sql->bindParam(':role_id', $datos["role_id"], PDO::PARAM_INT);

        return $sql->execute() ? 'ok' : $sql->errorInfo();
    }

    static public function crearUsuario($datos) {
        $link = conexion::conectar();
        $sql = $link->prepare("INSERT INTO users (document, fullname, email, password, status, role_id) 
                               VALUES (:document, :nombre, :email, :password, :status, :role_id)");
        $sql->bindParam(':document', $datos["document"], PDO::PARAM_STR);
        $sql->bindParam(':nombre', $datos["nombre"], PDO::PARAM_STR);
        $sql->bindParam(':email', $datos["email"], PDO::PARAM_STR);
        $sql->bindParam(':password', $datos["password"], PDO::PARAM_STR);
        $sql->bindParam(':status', $datos["status"], PDO::PARAM_STR);
        $sql->bindParam(':role_id', $datos["role_id"], PDO::PARAM_INT);

        return $sql->execute() ? 'ok' : $sql->errorInfo();
    }
}