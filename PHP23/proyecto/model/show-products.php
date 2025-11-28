<?php
  require 'connection.php';
  $database = $con->prepare("SELECT * FROM products ORDER BY id DESC");
  if($database){
    if($database->execute()){
      $result = $database->get_result();
      while($fila = $result->fetch_assoc()){
        echo "<tr>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['id'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['nombre'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['descripcion'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['inventario'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['precio'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['fecha_creacion'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>" . $fila['fecha_actualizacion'] . "</td>";
        echo "<td class='py-2 px-4 border-b border-gray-200'>
                <a href='../view-products/edit.php?id=" . $fila['id'] . "' class='text-blue-500 hover:underline mr-2'>Editar</a>
                <a href='../model/delete-product.php?id=" . $fila['id'] . "' class='text-red-500 hover:underline'>Eliminar</a>
              </td>";
        echo "</tr>";
      }
    } else {
      echo "<p>Error al obtener los productos: " . $database->error . "</p>";
    }
  } else{
    echo "<p>Error en la preparación de la consulta: " . $con->error . "</p>";
  } 
  $database->close();
  $con->close();