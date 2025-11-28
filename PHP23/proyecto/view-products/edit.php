<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
  <?php 
    include '../view/ui/navbar.php';
    include '../model/get-product.php';
  ?>
  <form method="POST">
    <label for="nombre">Nombre del producto</label>
    <input type="text" name="nombre" id="nombre" required value="<?php if(isset($fila)) echo $fila['nombre']; ?>">
    <label for="descripcion">Descripcion</label>
    <input type="text" name="descripcion" id="descripcion" required value="<?php if(isset($fila)) echo $fila['descripcion']; ?>">
    <label for="inventario">Inventario</label>
    <input type="number" name="inventario" id="inventario" required value="<?php if(isset($fila)) echo $fila['inventario']; ?>">
    <label for="precio">Precio</label>
    <input type="number" name="precio" id="precio" step="0.01" required value="<?php if(isset($fila)) echo $fila['precio']; ?>">
    <button type="submit">Actualizar</button>
  </form>
  <?php
    include '../controller/edit-product-controller.php';
  ?>
</body>
</html>