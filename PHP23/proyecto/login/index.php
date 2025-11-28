<?php
  /*
    Al inicio de todos los archivos que necesiten utilizar la variable global
    $_SESSION se debe colocar la función session_start().  Esta función
    inicia una nueva sesión o reanuda la sesión existente.
  */
  session_start();
  $_SESSION['nombre'] = 'Juan Pérez';
  $password = '12345';
  //cifrado de la contraseña
  $hash = password_hash($password, PASSWORD_BCRYPT);
  echo "El hash generado es: " . $hash;
  //verificación de la contraseña
  if (password_verify('12345', $hash)) {
    echo "<br>¡Contraseña correcta!";
  } else {
    echo "<br>Contraseña incorrecta.";
  }
?>