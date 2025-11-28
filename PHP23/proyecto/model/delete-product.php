<?php
  require 'connection.php';
  if(isset($_GET['id'])){
    $id = $_GET['id'];
    $database = $con->prepare("DELETE FROM products WHERE id = ?");
    if($database){
      $database->bind_param("i", $id);
      if($database->execute()){
        header("Location: ../view-products/");
        exit();
      } else {
        echo "<p>Error al eliminar el producto: " . $database->error . "</p>";
      }
      $database->close();
    } else {
      echo "<p>Error en la preparación de la consulta: " . $con->error . "</p>";
    }
  } else {
    echo "<p>ID de producto no proporcionado.</p>";
    header("Location: ../view-products/");
  }