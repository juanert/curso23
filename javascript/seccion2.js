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

const supermercado = {
  verduras: ["lechuga", "pepino", "cebolla"],
  frutas: ["manzana", "mazorca", "tomate"],
  carnes: ["pollo", "res", "cerdo"],
};

// Resolución con For-in y For-of
for (let categoria in supermercado) {
  for (let elemento of supermercado[categoria]) {
    console.log(elemento);
  }
}

// Resolución con For-in y forEach (función de flecha)
for (let categoria in supermercado) {
  supermercado[categoria].forEach((elemento) => {
    console.log(elemento);
  });
}

/**
 * Ejercicio 4:
 * Segun el siguiente arreglo de arreglos (matriz), crea:
 * - Un bucle que imprima la suma de todos los numeros.
 * - Un bucle que imprima la suma de cada fila.
 */
const numeros = [
  [1, 2, 3, 0],
  [4, 5, 6, 8],
  [7, 8, 9, 6],
];

// Suma de todos los números
let suma = 0;
for (let i = 0; i < numeros.length; i++) {
  for (let j = 0; j < numeros[i].length; j++) {
    suma += numeros[i][j];
  }
}
console.log("La suma de todos los números es: " + suma); // Usamos i para identificar la fila

// Suma de cada fila
let sumaFila = 0;
for (let i = 0; i < numeros.length; i++) {
  for (let j = 0; j < numeros[i].length; j++) {
    sumaFila += numeros[i][j];
  }
  console.log("La suma de la fila " + i + " es: " + sumaFila);
  sumaFila = 0;
}

/*
  Que son los prototipos y como funcionan
  Los prototipos son una característica de JavaScript que permite la herencia y la reutilización de código.
  Cada objeto en JavaScript tiene un prototipo, que es otro objeto del cual hereda propiedades y métodos.
  Puedes agregar propiedades y métodos a un prototipo para que todos los objetos que heredan de
  ese prototipo tengan acceso a ellos.
*/
let aviones = [
  { marca: "Boeing", modelo: "747" },
  { marca: "Airbus", modelo: "A380" },
  { marca: "Cessna", modelo: "172" },
];

console.log(aviones.length);

/*
  Metodos de strings
  Los métodos de strings son funciones que se pueden aplicar a cadenas de texto para realizar diversas operaciones.
  Algunos de los métodos más comunes son:
  - `toUpperCase()`: Convierte la cadena a mayúsculas.
  - `toLowerCase()`: Convierte la cadena a minúsculas.
  - `substring()`: Extrae una parte de la cadena.
  - `indexOf()`: Busca la posición de un carácter o subcadena en la cadena
  - `replace()`: Reemplaza una parte de la cadena por otra.
  - `split()`: Divide la cadena en un array de subcadenas.
  - `trim()`: Elimina los espacios en blanco al inicio y al final de la cadena.
  - `includes()`: Verifica si una subcadena está presente en la cadena.
  - `charAt()`: Devuelve el carácter en una posición específica.
  - `length`: Propiedad que devuelve la longitud de la cadena.
  - `startsWith()`: Verifica si la cadena comienza con una subcadena específica.
  - `endsWith()`: Verifica si la cadena termina con una subcadena específica.
  - `repeat()`: Repite la cadena un número específico de veces.
  - `concat()`: Une dos o más cadenas.
*/
let texto = "  Hola, JavaScript!  ";
console.log(texto.toUpperCase()); // Convierte a mayúsculas
console.log(texto.toLowerCase()); // Convierte a minúsculas
console.log(texto.substring(2, 10)); // Extrae una parte de la cadena
console.log(texto.indexOf("JavaScript")); // Busca la posición de "JavaScript"
console.log(texto.replace("JavaScript", "mundo")); // Reemplaza "JavaScript" por "mundo"
console.log(texto.replaceAll(" ", "")); // Reemplaza todos los espacios en blanco por nada
console.log(texto.split("a")); // Divide la cadena en un array
console.log(texto.trim()); // Elimina los espacios en blanco al inicio y al final
console.log(texto.includes("Hola")); // Verifica si "Hola" está presente
console.log(texto.charAt(3)); // Devuelve el carácter en la posición 3
console.log(texto.length); // Devuelve la longitud de la cadena
console.log(texto.startsWith("  Hola")); // Verifica si comienza con "  Hola"
console.log(texto.endsWith("!  ")); // Verifica si termina con "!
console.log(texto.repeat(2)); // Repite la cadena dos veces
console.log(texto.concat(" ¡Bienvenido!")); // Une " ¡Bienvenido!" a la cadena original

// Ejercicios de strings
/*
  1. Crea una función que reciba un string pero retorne cuantas palabras tiene.
  2. Crea una función que reciba un string y cuente cuantas vocales tiene
  3. Crea una función que reciba un string y retorne el string al revés.
  4. Crea una función que reciba un string y retorne si este es un palíndromo o no.
*/

//1
function contar_palabras(texto) {
  return texto.trim().split(" ").length;
}

console.log(contar_palabras("Hola a todos en la clase"));

//2
function contar_vocales(texto) {
  contador = 0;
  for (let letra of texto.toLowerCase()) {
    if ("aeiouáéíóú".includes(letra)) {
      contador++;
    }
  }
  return contador;
}

console.log(contar_vocales("Este mensaje es Supercalifragilisticoexpialidoso"));

//3
function invertir_texto(texto) {
  let palabraInvertida = "";
  for (let i = texto.length - 1; i >= 0; i--) {
    palabraInvertida += texto[i];
    //palabraInvertida = palabraInvertida + texto[i]
  }
  return palabraInvertida;
}

console.log(invertir_texto("Yo soy tu padre"));

//4
function verificar_palindromo(texto) {
  let acentos = ["á", "é", "í", "ó", "ú"];
  let vocales = ["a", "e", "i", "o", "u"];
  for (let i = 0; i < acentos.length; i++) {
    texto = texto.toLowerCase().replaceAll(acentos[i], vocales[i]);
    console.log("Remplazando acentos", texto);
  }
  texto = texto.replaceAll(" ", "").replaceAll(",", "").replaceAll(".", "");
  console.log("Replazandos ',', ' ', '.'", texto);
  if (texto === invertir_texto(texto)) {
    console.log("Es un palindromo");
  } else {
    console.log("No es un palindromo");
  }
}

verificar_palindromo("A ti no, bonita.");

//Metodos de arrays
/*
  Los métodos de arrays son funciones que se pueden aplicar a arrays para realizar diversas operaciones.
  Algunos de los métodos más comunes son:
  - `push()`: Agrega uno o más elementos al final del array.
  - `pop()`: Elimina el último elemento del array y lo devuelve.
  - `shift()`: Elimina el primer elemento del array y lo devuelve.
  - `unshift()`: Agrega uno o más elementos al inicio del array.
  - `splice()`: Cambia el contenido de un array eliminando o reemplazando elementos existentes y/o agregando nuevos elementos en su lugar.
  - `slice()`: Devuelve una copia superficial de una porción del array dentro de un nuevo array.
  - `forEach()`: Ejecuta una función proporcionada una vez por cada elemento del array.
  - `map()`: Crea un nuevo array con los resultados de la llamada a la función proporcionada en cada elemento del array.
  - `filter()`: Crea un nuevo array con todos los elementos que cumplan la condición implementada por la función proporcionada.
  - `find()`: Devuelve el primer elemento del array que cumple con la condición proporcionada en la función.
  - `includes()`: Verifica si un elemento está presente en el array.
*/
let frutasArray = ["melon", "tomate", "banana", "manzana", "pera"];
frutasArray.push("uva"); // Agrega "uva" al final del array
frutasArray.pop(); // Elimina el último elemento y lo devuelve
frutasArray.shift(); // Elimina el primer elemento y lo devuelve
frutasArray.unshift("fresa"); // Agrega "fresa" al inicio del array
frutasArray.splice(2, 1, "Kiwi"); // Elimina el elemento en el índice 2 y agrega "kiwi"
let nuevoArray = frutasArray.slice(1, 4); // Crea un nuevo array con los elementos del índice 1 al 3
frutasArray.forEach((fruta) => {
  console.log("Fruta: " + fruta); // Ejecuta una función por cada elemento
});
frutasArray.map((fruta) => {
  console.log("Fruta mapeada: " + fruta);
});
let frutasFiltradas = frutasArray.filter((fruta) => fruta.includes("a")); // Filtra las frutas que contienen "a"
console.log("Frutas filtradas: ", frutasFiltradas); // Muestra las frutas filtradas
console.log(frutasArray.find((fruta) => fruta === "banana")); // Encuentra la primera fruta que sea "banana"
console.log(frutasArray.includes("pera")); // Verifica si "pera" está en el array

/*
  Arrow function o funciones anonimas
  Las arrow functions son una forma concisa de escribir funciones anonimas en JavaScript.
*/

let sumar = (num1, num2) => {
  return num1 + num2;
}

sumar(5, 10); // Esto devuelve 15
sumar(6, 20); // Esto devuelve 26

/*
  Los callbacks
  Los callbacks son funciones que se pasan como argumentos a otras funciones y se ejecutan después de que se completa una tarea.
*/
function registro(nombre, callback) {
  if (callback(nombre)) {
    console.log("Registro exitoso para: " + nombre);
  }
}

/*
let funcion = validarNombre;
funcion("juan")
registro("juan", validarNombre); // Esto llama a la función validarNombre como callback
*/
//validarNombre("juan"); // Esto valida el nombre y muestra mensajes de error si es necesario
//validarNombre // La funcion simplemente se pasa como argumento sin ejecutarla

console.log(validarNombre);

function validarNombre(nombre) {
  if (typeof nombre !== "string") {
    console.log("El nombre debe ser una cadena de texto.");
    return false;
  } else if (nombre.length < 3) {
    console.log("El nombre debe tener al menos 3 caracteres.");
    return false;
  } else if (nombre.length > 20) {
    console.log("El nombre no puede tener más de 20 caracteres.");
    return false;
  }
  return true;
}

/*
  1. Crea una función que reciba un texto o parrafo y verifique si contiene alguna las siguientes malas palabras:
  - "tonto"
  - "chispas"
  - "recorcholis"
  - "rayos"
  - "caracoles"
  - "cielos"
  Si el texto contiene alguna de estas palabras, sustituye por "****" y retorna el texto modificado.
  Si no contiene ninguna, retorna el texto original.

  2. Según el siguiente array de objetos
  let personas = [
    { nombre: "Juan", edad: 25, pais: "España", sexo: "masculino" },
    { nombre: "María", edad: 30, pais: "México", sexo: "femenino" },
    { nombre: "Pedro", edad: 22, pais: "Argentina", sexo: "masculino" },
    { nombre: "Ana", edad: 28, pais: "Chile", sexo: "femenino" },
    { nombre: "Luis", edad: 35, pais: "España", sexo: "masculino" },
  ];

  Crea un código que me haga un filtro del array creando un nuevo array que contenga solo
  las personas que sean mayores de 25 años.

  Luego haz un código que me cree un nuevo array con las personas sean de españa y sean hombres

  Fecha de entrega: 11/07/25
*/