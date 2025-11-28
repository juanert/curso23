<?php
  $host = "localhost";
  $user = "root";
  $password = "";
  $database = "pruebaphp";  

  // Crear conexion SQLI
  $con = new mysqli($host, $user, $password, $database);
  // Verificar conexion
  if ($con->connect_error) {
    die("Conexion fallida: " . $con->connect_error);
  }
