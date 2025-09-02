<?php
class conexion{
    static public function conectar(){
        $link = new PDO('mysql:host=localhost;dbname=persa_db', 'developer', 'developer');
        return $link;
    }
}