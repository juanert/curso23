<?php
  if(isset($_GET['id']) && isset($_POST['nombre']) && isset($_POST['descripcion']) && isset($_POST['inventario']) && isset($_POST['precio'])){
    $id = $_GET['id'];
    $nombre = $_POST['nombre'];
    $descripcion = $_POST['descripcion'];
    $inventario = $_POST['inventario'];
    $precio = $_POST['precio'];
    $nombre_regex = "/^[a-zA-Z0-9\s]+$/";
    $descripcion_regex = "/^[a-zA-Z0-9,:;\s]+$/";
    $error = false;
    if(!preg_match($nombre_regex, $nombre)){
      echo "<p>Nombre invalido</p>";
      $error = true;
    }

    if(!preg_match($descripcion_regex, $descripcion)){
      echo "<p>Descripcion invalida</p>";
      $error = true;
    }

    if($inventario < 0 || !is_numeric($inventario)){
      echo "<p>Inventario invalido</p>";
      $error = true;
    }

    if($precio < 0 || !is_numeric($precio)){
      echo "<p>Precio invalido</p>";
      $error = true;
    }

    if(!$error){
      include '../model/edit-product-model.php';
    }

  }