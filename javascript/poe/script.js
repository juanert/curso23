// Document Object Model (DOM) y Programación Orientada a Eventos (POE):

/**
 * Recuperar elementos desde el DOM
 *
 * El método querySelector() devuelve el primer elemento que coincide con el selector especificado en el documento.
 * El selector especificado puede ser un nombre de elemento HTML, un nombre de clase, un nombre de ID o un selector CSS.
 *
 * Por ejemplo:
 * - document.querySelector("p") devuelve el primer elemento <p> en el documento
 * - document.querySelector("#title") devuelve el elemento con el ID "title"
 * - document.querySelector(".message") devuelve el primer elemento con la clase "message" en el documento
 *
 * Se trata de una herramienta mucho más versátil que el uso de getElementById() y getElementsByClassName().
 * quienes poseen comportamientos similares.
 */

const title = document.querySelector("#title");
const message = document.querySelector("#message");
const changeTextBtn = document.querySelector("#changeTextBtn");
const changeColorBtn = document.querySelector("#changeColorBtn");
const addItemBtn = document.querySelector("#addItemBtn");
const toggleClassBtn = document.querySelector("#toggleClassBtn");
const itemList = document.querySelector("#itemList");

const alertBtn = document.querySelector("#alertBtn");
const promptBtn = document.querySelector("#promptBtn");

const userForm = document.querySelector("#userForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const submitFormBtn = document.querySelector("#submitFormBtn");
const clearFormBtn = document.querySelector("#clearFormBtn");
const fillFormBtn = document.querySelector("#fillFormBtn");

/**
 * Event listeners:
 *
 * Los event listeners son funciones que se ejecutan cuando un evento específico ocurre en un elemento del DOM.
 * Algunos eventos comunes son:
 * - click: Cuando se hace clic en un elemento
 * - mouseover: Cuando el mouse pasa por encima de un elemento
 * - mouseout: Cuando el mouse sale de un elemento
 * - submit: Cuando se envía un formulario
 * - change: Cuando el valor de un elemento cambia
 *
 * El metodo addEventListener() se utiliza para agregar un event listener a un elemento del DOM.
 * El mismo espera dos párametos:
 * - event: El evento a escuchar.
 * - callback: La función que debe ejecutarse cuando el evento ocurra.
 *
 * El callback puede ser definido como una única función y asignado luego:
 *
 * ```
 *    function callback() {
 *      console.log("Button clicked!");
 *    }
 *
 *    btn.addEventListener("click", callback);
 * ```
 *
 * O enviado directamente como una función anónima:
 *
 * ```
 *    btn.addEventListener("click", () => {
 *      console.log("Button clicked!");
 *    });
 * ```
 */

// Botón que cambia su texto
changeTextBtn.addEventListener("click", () => {
  changeTextBtn.textContent = "¡Texto cambiado!";
});

// Botón que cambia su color
changeColorBtn.addEventListener("click", () => {
  const color = "#267D39"; // <-- ¡Puedes cambiarlo por otro color!
  changeColorBtn.style.backgroundColor = color;
  changeColorBtn.style.color = "white";
});

/**
 * Nota adicional:
 *
 * Usa element.classList.add() o element.classList.remove() para agregar o quitar clases de
 * TailwindCSS de un elemento.
 * También puedes usar element.classList.toggle() para entre clases.
 */

// Botón que crea un nuevo elemento en el DOM
addItemBtn.addEventListener("click", () => {
  const newItem = document.createElement("li"); // <-- .createElement permite crear un nuevo elemento en el DOM
  newItem.textContent = "Nuevo elemento";
  itemList.appendChild(newItem); // <-- .appendChild permite agregar un nuevo elemento al DOM
});

// Botón que manipula las clases de otro elemento
toggleClassBtn.addEventListener("click", () => {
  message.classList.toggle("highlight");

  const status = message.classList.contains("highlight"); // <-- .contains devuelve `true` si el elemento tiene la clase especificada

  if (status) {
    toggleClassBtn.textContent = "Desactivar Clase";
    message.textContent = message.textContent + " (highlighted)";
  } else {
    toggleClassBtn.textContent = "Activar Clase";
    message.textContent = message.textContent.replace(" (highlighted)", ""); // <-- .replace reemplaza el texto especificado por otro
  }
});

/**
 * Alerts y Prompts
 * 
 * Los alert() y prompt() son funciones que se utilizan para mostrar alertas y prompts en la pantalla del navegador.
 * Se trata de pequeños avisos que se muestran en la parte superior de la pantalla.
 * No son lo más recomendable de utilizar según los conceptos de UI/UX, pero hacen el trabajo.
 */

// Botón que muestra un alert
alertBtn.addEventListener("click", () => {
  alert("¡Alerta!");
});

// Botón que muestra un prompt
promptBtn.addEventListener("click", () => {
  const input = prompt("Ingresa un texto"); // <-- Es igual que alert, pero te permite capturar el texto ingresado por el usuario
  alert(input);
});

// Botón que crea un elemento en el DOM basado en el input que tenga el Focus (Descomentar las líneas 141 y 142 para probar)
function createNewElementBasedOnInput() {
  const newElement = document.createElement("p");
  const inputId = this.id;

  newElement.textContent = `El focus se produjo en el input ${inputId}`;
  document.body.appendChild(newElement);
}

// nameInput.addEventListener("focus", createNewElementBasedOnInput);
// emailInput.addEventListener("focus", createNewElementBasedOnInput);

/**
 * Manipulación del DOM (Document Object Model) en Formularios
 * 
 * Los formularios son elementos que permiten a los usuarios enviar datos a un servidor.
 */

// Botón que limpia el formulario interactúando con sus inputs
clearFormBtn.addEventListener("click", () => {
  nameInput.value = "";
  emailInput.value = "";
});

// Botón que llena el formulario con valores predefinidos
fillFormBtn.addEventListener("click", () => {
  nameInput.value = "John Doe";
  emailInput.value = "s4T4C@example.com";
});

/**
 * Nota importante:
 * 
 * .textContent - permite obtener o establecer el texto de un elemento
 * .value - permite obtener o establecer el valor de un input
 */

// Botón que envía el formulario
// El addEventListener no se agrega el botón en sí, sino al formulario.
// Como el botón en el HTML es de tipo submit, JS sabe que debe enviar el formulario y realizar las acciones correspondientes.
userForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const email = emailInput.value;

  if (name === "" || email === "") {
    alert("Por favor, completa todos los campos.");
    return;
  }
  alert(
    `¡Felicidades, ${name}! ¡Te has ganado un iPhone 16! Ingresa al enlace que tedejamos en tu correo (${email}). Para nada es un virus.`
  );
});

// Ejercicio de POE
// Realizar una calculadora que permita sumar, restar, multiplicar y dividir dos números ingresados por el usuario a través de un formulario.
// El formulario debe contar con un botón para limpiar sus campos.
// El resultado debe de desplegarse en un tercer input con propiedad readonly.
// Si el usuario intenta enviar el formulario sin ingresar los dos números, mostrar un mensaje de error (*) indicando que todos los campos son obligatorios.
// El estudiante tiene total libertad para definir como recolectará los datos que definan el tipo de operación a realizar.

// (*) Los mensajes de error se pueden mostrar con alert, pero el primero en mostrarlos en el DOM con createElement, le pone nombre al gatito por 3 días.
