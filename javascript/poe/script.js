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
