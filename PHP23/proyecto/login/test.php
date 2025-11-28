<?php
  session_start();
  if (!isset($_SESSION['nombre'])) {
    echo "No has iniciado sesión.";
    header("Location: index.php");
    exit();
  }
  echo "Hola, " . $_SESSION['nombre'];
?>