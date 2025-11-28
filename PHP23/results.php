<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    if(isset($_POST['nombre']) && isset($_POST['edad'])) {
      $nombre = $_POST['nombre'];
      $edad = $_POST['edad'];
      echo "<h1>Hola, mi nombre es $nombre y tengo $edad años.</h1>";
    } else {
      echo "<h1>No se han recibido datos del formulario.</h1>";
    }
  ?>
</body>
</html>