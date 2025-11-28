<?php
  require 'connection.php';
  if(isset($_GET['id'])){
    $id = $_GET['id'];
    $database = $con->prepare("SELECT * FROM products WHERE id = ?");
    if($database){
      $database->bind_param("i", $id);
      if($database->execute()){
        $result = $database->get_result();
        if($fila = $result->fetch_assoc()){
         
        } else {
          echo "<p>Producto no encontrado.</p>";
        }
      } else {
        echo "<p>Error al eliminar el producto: " . $database->error . "</p>";
      }
      $database->close();
    } else {
      echo "<p>Error en la preparación de la consulta: " . $con->error . "</p>";
    }
  } else {
    echo "<p>ID de producto no proporcionado.</p>";
  }