<?php

require_once 'modelo.php';

class controladorUsuarios{
    static public function mostrarDatos(){
        $result = modeloUsuarios::mostrarDatos();
        return $result;
    }
}