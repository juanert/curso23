<?php
  include '../model/connection.php';
  $database = $con->prepare("INSERT INTO products (nombre, descripcion, inventario, precio) VALUES (?, ?, ?, ?)");
  var_dump($database);
  if($database){
    $database->bind_param("ssdd", $nombre, $descripcion, $inventario, $precio);
    if($database->execute()){
      echo "<p>Producto creado exitosamente</p>";
    } else {
      echo "<p>Error al crear el producto: " . $database->error . "</p>";
    }
    $database->close();
  }
  $con->close();