<?php
class conexion {
    static public function conectar() {
        try {
            $link = new PDO("mysql:host=localhost;dbname=persa_db;charset=utf8", "developer", "developer");
            $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $link->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            return $link;
        } catch (PDOException $e) {
            die("Error de conexión: " . $e->getMessage());
        }
    }
}