//Funciones
/*
  Las funciones son bloques de código que realizan una tarea específica y 
  pueden ser reutilizadas.
*/

// Declaración de una función
function holaMundo() {
  console.log("¡Hola, mundo!");
}

// Llamada a la función
holaMundo(); // Esto ejecuta la función y muestra "¡Hola, mundo!" en la consola
holaMundo(); // Puedes llamarla tantas veces como quieras

// Función con parámetros
/*
  Los parametros son variables que se pasan a una función para que pueda
*/
function saludar(nombre = "amigo") {
  console.log("¡Hola, " + nombre + "!");
}

// Llamada a la función con un argumento
saludar("Juan"); // Esto muestra "¡Hola, Juan!" en la consola
saludar("María"); // Esto muestra "¡Hola, María!" en la consola
saludar(); // Esto muestra "¡Hola, Pedro!" en la consola

// Función con multiples parámetros
function sumar(num1 = 0, num2 = 0) {
  console.log(num1 + num2);
}

sumar(10, 5); // Esto muestra 15 en la consola

/*
  Ejercicios para practicar funciones:
  1. Crea una función llamada semaforo que reciba un número del 1 al 3 y muestre un mensaje según el semáforo:
  - 1: "Rojo, detente"
  - 2: "Amarillo, precaución"
  - 3: "Verde, avanza"

  Ejecutala 3 veces con diferentes números, debes realizar validaciones para que al
  enviar un numero fuera del rango 1-3, se muestre un mensaje de error.

  2. Crea una función llamada calculadora que reciba dos números y un operador
  (suma, resta, multiplicación o división) y realice la operación correspondiente.
  - Si el operador no es válido, muestra un mensaje de error.
  Ejecutala 3 veces con diferentes números y operadores, debes realizar validaciones
*/
