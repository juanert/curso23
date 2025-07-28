let operacion = "";

/*
Forma de colocar los eventos de los botones de la calculadora con javaScript:
document.getElementsByTagName("button").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const caracter = event.target.textContent.trim();
    if (caracter === "=") {
      calcular();
    } else if (caracter === "AC") {
      reiniciar();
    } else if (caracter === "DEL") {
      borrar();
    } else {
      calculadora(caracter);
    }
  });
});
*/

function calculadora(caracter) {
  operacion += caracter;
  document.getElementById("operation").value = operacion;
}

function reiniciar() {
  operacion = "";
  document.getElementById("operation").value = operacion;
}

function borrar() {
  operacion = operacion.slice(0, -1);
  document.getElementById("operation").value = operacion;
}

function calcular() {
  try{
    operacion = eval(operacion);
    if (operacion === "") {
      throw new Error("Operación vacía");
    } else if( operacion.includes("undefined") || Number(operacion).isNaN()) {
      throw new Error("Operación inválida");
    } else{
      document.getElementById("operation").value = operacion;
    }
  } catch (error) {
    alert(error.message);
  }
}
