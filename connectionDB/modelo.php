<?php

require_once 'conexion.php';

class modeloUsuarios{
    static public function mostrarDatos(){
        $link = conexion::conectar();
        $sql = $link->prepare("SELECT id, fullname, email FROM users");

        $sql->execute();
        $result = $sql->fetchAll();

        return $result;
    }

    static public function eliminarRegistro($id){
        $link = conexion::conectar();
        $sql = $link->prepare("DELETE FROM users WHERE id = :id");
        $sql->bindParam(':id', $id, PDO::PARAM_INT);
        $result = $sql->execute();

        if($result){
            return 'ok';
        }
        else{
            return 'error';
        }
    }

    static public function mostrarRegistro($id) {
        $link = conexion::conectar();
        $sql = $link->prepare("SELECT id, fullname, email FROM users WHERE id = :id");
        
        $sql->bindParam(':id', $id, PDO::PARAM_INT);
        $sql->execute();
        $result = $sql->fetch();

        return $result;
    }

    static public function actualizarRegistro($datos) {
        $link = conexion::conectar();
        $sql = $link->prepare("UPDATE users SET fullname = :nombre, email = :email WHERE id = :id");
        $sql->bindParam(':id', $datos["id"], PDO::PARAM_INT);
        $sql->bindParam(':nombre', $datos["nombre"], PDO::PARAM_STR);
        $sql->bindParam(':email', $datos["email"], PDO::PARAM_STR);
        $result = $sql->execute();
        if($result){
            return 'ok';
        } else {
            return 'error';
        }
    }
}