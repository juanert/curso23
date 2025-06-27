let numero1 = Number(prompt("Ingrese el primer número:"));
let numero2 = Number(prompt("Ingrese el segundo número:"));
let operacion = prompt(
  "Ingrese la operación a realizar (suma, resta, multiplicación, división):"
).toLowerCase();

if (operacion === "suma") {
  alert("El resultado de la suma es: " + (numero1 + numero2));
} else if (operacion === "resta") {
  alert("El resultado de la resta es: " + (numero1 - numero2));
} else if (operacion === "multiplicación" || operacion === "multiplicacion") {
  alert("El resultado de la multiplicación es: " + numero1 * numero2);
} else if (operacion === "división" || operacion === "division") {
  if (numero2 !== 0) {
    alert("El resultado de la división es: " + numero1 / numero2);
  } else {
    alert("Error: No se puede dividir por cero.");
  }
} else {
  alert("Operación no válida. Por favor, ingrese una operación válida.");
}
