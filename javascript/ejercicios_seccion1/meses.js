let numero = Number(prompt("Ingrese un número:"));
let meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

if (numero >= 1 && numero <= 12) {
  alert("El mes es: " + meses[numero - 1]);
} else {
  alert("Número no válido. Por favor, ingrese un número entre 1 y 12.");
}

/*
switch (numero) {
  case 1:
    alert("Enero");
    break;
  case 2:
    alert("Febrero");
    break;
  case 3:
    alert("Marzo");
    break;
  case 4:
    alert("Abril");
    break;
  case 5:
    alert("Mayo");
    break;
  case 6:
    alert("Junio");
    break;
  case 7:
    alert("Julio");
    break;
  case 8:
    alert("Agosto");
    break;
  case 9:
    alert("Septiembre");
    break;
  case 10:
    alert("Octubre");
    break;
  case 11:
    alert("Noviembre");
    break;
  case 12:
    alert("Diciembre");
    break;
  default:
    alert("Número no válido. Por favor, ingrese un número entre 1 y 12.");
    break;
}
*/