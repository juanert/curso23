<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!--
    Post: Este metodo sirve para enviar datos de forma segura ya que no se muestran en la URL
    Get: Este metodo envia los datos a traves de la URL, no es seguro para enviar datos sensibles
  -->
  <form action="results.php" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required><br><br>
    <label for="edad">Edad:</label>
    <input type="number" id="edad" name="edad" required><br><br>
    <input type="submit" value="Enviar">
  </form>
</body>
</html>