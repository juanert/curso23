<?php
  require 'connection.php';
  if(isset($_GET['id'])){
    $id = $_GET['id'];
    $database = $con->prepare("UPDATE products SET nombre = ?, descripcion = ?, inventario = ?, precio = ? WHERE id = ?");
    if($database){
      $database->bind_param('ssddi', $nombre, $descripcion, $inventario, $precio, $id);
      if($database->execute()){
        echo "<p>Producto actualizado exitosamente.</p>";
      } else {
        echo "<p>Error al actualizar el producto: " . $database->error . "</p>";
      }
      $database->close();
    }
  } else {
    echo "<p>ID de producto no proporcionado.</p>";
  }
  $con->close();