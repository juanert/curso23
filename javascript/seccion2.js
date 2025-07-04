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

//Hoisting
/*
  El hoisting es un comportamiento de JavaScript donde las declaraciones de variables y funciones
  son elevadas al inicio de su contexto de ejecución. Esto significa que puedes llamar a una función
  antes de haberla declarado en el código.
*/

saludarHoisting("Juan"); // Esto funciona gracias al hoisting

function saludarHoisting(nombre) {
  console.log("¡Hola, " + nombre + "!");
}

// Alcance (Scope)
/*
  El alcance se refiere a la visibilidad de las variables en diferentes partes del código.
  Hay dos tipos principales de alcance:
  - Alcance global: Las variables declaradas fuera de cualquier función son accesibles en todo el código.
  - Alcance local: Las variables declaradas dentro de una función solo son accesibles dentro de esa función.
*/

let saludos = "¡Hola!"; // Variable global

if (true) {
  var variableGlobal = "Soy global"; // Esta variable es global
  let variableLocal = "Soy local"; // Esta variable es local
  const constante = "Soy constante"; // Esta constante es local
  console.log(variableGlobal, variableLocal, constante);
}

if (true) {
  let variableLocal = "Nuevo valor local"; // Esta variable es local y no afecta a la anterior
  const constante = "Nueva constante"; // Esta constante es local y no afecta a la anterior
}
console.log(variableGlobal, variableLocal, constante);

//Funciones con retorno
/*
  Las funciones pueden devolver un valor utilizando la palabra clave `return`.
  Esto permite que la función produzca un resultado que puede ser utilizado posteriormente.
*/

function multiplicarConRetono(num1, num2) {
  let multiplicacion = num1 * num2;
  console.log(multiplicacion);
  return multiplicacion; // Devuelve el resultado de la multiplicación
}

console.log(multiplicarConRetono(5, 3)); // Esto muestra 15 en la consola
let resultado = multiplicarConRetono(10, 3) + 5;

// Es muy distinto a

function multiplicarSinRetorno(num1, num2) {
  num1 * num2; // No devuelve nada, solo realiza la operación
}

console.log(multiplicarSinRetorno(5, 3)); // Esto muestra undefined en la consola
console.log(multiplicarSinRetorno(10, 3) + 5);

//Recursion
/*
  La recursión es una técnica en la que una función se llama a sí misma para resolver un problema.
  Es útil para problemas que pueden dividirse en subproblemas más pequeños.
*/

/*
  Ejemplo: Imprimir números del 1 al 5 usando recursión
*/
function imprimirNumerosRecursivo(num) {
  if (num > 5) return; // Caso base: si num es mayor que 5, termina la recursión
  console.log(num); // Imprime el número actual
  imprimirNumerosRecursivo(num + 1); // Llama a la función con el siguiente número
}

imprimirNumerosRecursivo(0); // Llama a la función para iniciar la recursión

/*
  Ejercicios de recursión

  Nivel fácil:
  1. Crea una función recursiva que imprima los números pares del 0 al 100.

  Nivel medio:
  2. Crea una función que reciba un array de frutas e imprima uno a uno cada fruta.

  Nivel difícil:
  3. Crea una función recursiva que calcule el factorial de un número dado.

  Nivel experto:
  4. Crea una función recursiva que imprima la sucesión de Fibonacci hasta un número dado.
*/

//1
function imprimir_numeros(numero, limite = 2) {
  if (numero <= limite) {
    if (numero % 2 === 0) console.log(numero);
    imprimir_numeros(numero + 1, limite);
  }
}

imprimir_numeros(0, 100);

//2
let frutas = ["uva", "melon", "tomate", "banana", "maiz"];

function imprimir_array(lista = [], numero = 0) {
  if (numero < lista.length) {
    console.log(lista[numero]);
    imprimir_array(lista, numero + 1);
  }
}

imprimir_array(frutas);

//3

function calcular_factorial(numero, acumulador = 1) {
  if (numero >= 1) {
    acumulador = acumulador * numero;
    if (numero === 1) {
      console.log("El factorial es: " + acumulador);
      return;
    }
    calcular_factorial(numero - 1, acumulador);
  } else if (numero === 0) {
    console.log("El factorial de 0 es 1");
    return;
  } else {
    console.log("Ingresa un valor valido");
  }
}

calcular_factorial(7);

/*
  Ejercicio extra de dificultad media
  Crea una función recursiva que basado en un array de notas, te muestre el promedio.
*/

// Loops
/*
  Los loops (bucles) son estructuras que permiten repetir un bloque de código varias veces.
  Los tipos más comunes son `for`, `while` y `do...while`.
*/
// Bucle for
let motos = ["Honda", "Yamaha", "Kawasaki", "Suzuki", "Ducati"];
for (let i = 0; i <= 100; i += 5) {
  //console.log("La moto es: " + motos[i]);
  console.log(i);
}

/*
  Ciclo for in
  El ciclo `for...in` se utiliza para iterar sobre las propiedades enumerables de un objeto.
  Es útil cuando necesitas acceder a las claves de un objeto.
*/
let persona = {
  nombre: "Juan",
  edad: 30,
  ciudad: "Madrid",
};

for (let propiedad in persona) {
  console.log(propiedad + ": " + persona[propiedad]); // Muestra cada clave y su valor
}

/*
  Ciclo for of
  El ciclo `for...of` se utiliza para iterar sobre los elementos de un iterable, como un array o una cadena de texto.
  Es útil cuando necesitas acceder a los valores de un iterable.
*/
let canciones = ["Despacito", "Shape of You", "Blinding Lights"];
for (let cancion of canciones) {
  console.log("Canción: " + cancion); // Muestra cada canción
}

/*
  Ciclo while
  El ciclo `while` ejecuta un bloque de código mientras una condición sea verdadera.
  Es útil cuando no sabes cuántas veces necesitas iterar.
*/

let contador = 0;
while (contador < 5) {
  console.log("Contador: " + contador); // Muestra el valor del contador
  contador++; // Incrementa el contador
}

/*
  Ciclo do...while
  El ciclo `do...while` ejecuta un bloque de código al menos una vez y luego verifica la condición.
  Es útil cuando necesitas asegurarte de que el código se ejecute al menos una vez.
*/
let numero = 0;
do {
  console.log("Número: " + numero); // Muestra el valor del número
  numero++; // Incrementa el número
} while (numero < 3); // Continúa mientras el número sea menor que 3

/*
  Ejercicios para practicar en clases
  1. Segun el siguiente array de numeros, crea un bucle que imprima cada número multiplicado por 2.
  - [1, 2, 3, 4, 5]
  2. Según el siguiente objeto
    {
      verduras: ["lechuga", "pepino", "cebolla"],
      frutas: ["manzana", "mazorca", "tomate"],
      carnes: ["pollo", "res", "cerdo"]
    }
  Imprime todas las verduras.
  3. Según el objeto anterior, imprime todas las verduras, frutas y carnes.
*/