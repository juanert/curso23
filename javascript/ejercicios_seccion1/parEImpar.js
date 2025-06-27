number = Number(prompt("Ingrese un número:"));

if (number % 2 === 0) {
  alert("El número " + number + " es par.");
} else if (number % 2 === 1) {
  alert("El número " + number + " es impar.");
} else {
  alert("El número ingresado no es un entero válido.");
}