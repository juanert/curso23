<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <?php
    # Este es un comentario de una sola línea en PHP
    // Otro comentario de una sola línea en PHP
    /*
      Este es un comentario
      de múltiples líneas en PHP
    */

    // variables y tipos de datos
    $nombre = "Juan"; // cadena de texto
    $edad = 30; // entero (number)
    $altura = 1.75; // flotante (number)
    $es_estudiante = true; // booleano (true/false)
    $nulo = null; // valor nulo
    $colores = ["rojo","azul","verde"]; // array
    $persona = [ // array asociativo
      "nombre" => "Ana",
      "edad" => 25,
      "altura" => 1.65
    ];
    $persona["nombre"];

    //imprimir variables
    echo "<h1>Hola, mi nombre es $nombre</h1>";
    echo "<h2>me gusta los colores $colores[0] $colores[1]</h2>";
    var_dump($persona);

    //Operadores aritméticos
    $a = 10;
    $b = 5;
    $suma = $a + $b;
    $resta = $a - $b;
    $multiplicacion = $a * $b;
    $division = $a / $b;
    $mod = $a % $b;
    $exponenciacion = $a ** $b;
    echo "<p>Suma: $suma</p>";
    echo "<p>Resta: $resta</p>";
    echo "<p>Multiplicación: $multiplicacion</p>";
    echo "<p>División: $division</p>";
    echo "<p>Módulo: $mod</p>";
    echo "<p>Exponenciación: $exponenciacion</p>";

    //Operadores de comparación
    $x = 10;
    $y = 20;
    var_dump($x == $y); // igual
    var_dump($x != $y); // diferente
    var_dump($x < $y); // menor que
    var_dump($x > $y); // mayor que
    var_dump($x <= $y); // menor o igual que
    var_dump($x >= $y); // mayor o igual que

    //Operadores lógicos
    $p = true;
    $q = false;
    var_dump($p && $q); // AND
    var_dump($p || $q); // OR
    var_dump(!$p); // NOT

    //Constantes
    define("PI", 3.1416);
    echo "<p>El valor de PI es: " . PI . "</p>";

    // Condicionales
    $edad = 18;
    if($edad >= 0 && $edad <18){
      echo "<p>Eres menor de edad</p>";
    } elseif($edad >=18 && $edad <120){
      echo "<p>Eres mayor de edad</p>";
    } else{
      echo "<p>Edad invalida</p>";
    }

    // SWITCH
    $dia = 3;
    switch($dia){
      case 1:
        echo "<p>Hoy es Lunes</p>";
        break;
      case 2:
        echo "<p>Hoy es Martes</p>";
        break;
      case 3:
        echo "<p>Hoy es Miércoles</p>";
        break;
      case 4:
        echo "<p>Hoy es Jueves</p>";
        break;
      case 5:
        echo "<p>Hoy es Viernes</p>";
        break;
      case 6:
        echo "<p>Hoy es Sábado</p>";
        break;
      case 7:
        echo "<p>Hoy es Domingo</p>";
        break;
      default:
        echo "<p>Día inválido</p>";
    }

    // Bucles
    // Bucle while
    $contador = 1;
    while($contador <= 5){
      echo "<p>Contador while: $contador</p>";
      $contador++;
    }

    // Bucle do...while
    $contador2 = 1;
    do{
      echo "<p>Contador do...while: $contador2</p>";
      $contador2++;
    } while($contador2 <= 5);

    // Bucle for
    for($i = 1; $i <= 5; $i++){
      echo "<p>Contador for: $i</p>";
    }

    // Bucle foreach
    $frutas = ["manzana", "banana", "cereza"];
    foreach($frutas as $fruta){
      echo "<p>Fruta: $fruta</p>";
    }

    // Funciones
    function saludar($nombre){
      return "Hola, $nombre!";
    }

    echo "<p>" . saludar("Carlos") . "</p>";

    //Variables superglobales
    /*
      Las variables superglobales en PHP son arrays predefinidos que pueden
      ser accedidos desde cualquier parte del script, independientemente del ámbito.
      $_GET: Contiene datos enviados mediante el método GET.
      $_POST: Contiene datos enviados mediante el método POST.
      $_SERVER: Contiene información del servidor y del entorno de ejecución.
      $_SESSION: Contiene datos de la sesión actual del usuario.
      $_COOKIE: Contiene datos almacenados en cookies.
    */

    //Regex
    $email = "hola@gmail.com";
    if(preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email)){
      echo "<p>El email es válido</p>";
    } else{
      echo "<p>El email no es válido</p>";
    }

    // Manejo de errores
    function dividir($numerador, $denominador){
      try
      {
        if($denominador == 0){
          throw new Exception("Error: División por cero");
        }
        return $numerador / $denominador;
      }
      catch(Exception $e)
      {
        return $e->getMessage();
      }
    }

    //Objetos
    class Coche{
      public $marca;
      public $modelo;

      public function __construct($marca, $modelo){
        $this->marca = $marca;
        $this->modelo = $modelo;
      }

      public function getInfo(){
        return "Coche: $this->marca $this->modelo";
      }
    }

    //Herencia
    class Deportivo extends Coche{
      public $velocidadMaxima;

      public function __construct($marca, $modelo, $velocidadMaxima){
        parent::__construct($marca, $modelo);
        $this->velocidadMaxima = $velocidadMaxima;
      }

      public function getInfo(){
        return parent::getInfo() . ", Velocidad Máxima: $this->velocidadMaxima km/h";
      }
    }
  ?>
</body>
</html>