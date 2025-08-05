let cartas = [
  { arriba: 0, abajo: 0 },
  { arriba: 0, abajo: 1 },
  { arriba: 0, abajo: 2 },
  { arriba: 0, abajo: 3 },
  { arriba: 0, abajo: 4 },
  { arriba: 0, abajo: 5 },
  { arriba: 0, abajo: 6 },
  { arriba: 1, abajo: 1 },
  { arriba: 1, abajo: 2 },
  { arriba: 1, abajo: 3 },
  { arriba: 1, abajo: 4 },
  { arriba: 1, abajo: 5 },
  { arriba: 1, abajo: 6 },
  { arriba: 2, abajo: 2 },
  { arriba: 2, abajo: 3 },
  { arriba: 2, abajo: 4 },
  { arriba: 2, abajo: 5 },
  { arriba: 2, abajo: 6 },
  { arriba: 3, abajo: 3 },
  { arriba: 3, abajo: 4 },
  { arriba: 3, abajo: 5 },
  { arriba: 3, abajo: 6 },
  { arriba: 4, abajo: 4 },
  { arriba: 4, abajo: 5 },
  { arriba: 4, abajo: 6 },
  { arriba: 5, abajo: 5 },
  { arriba: 5, abajo: 6 },
  { arriba: 6, abajo: 6 },
];

let jugadores = [
  { nombre: "Jugador 1", mano: [] },
  { nombre: "Jugador 2", mano: [] },
  { nombre: "Jugador 3", mano: [] },
  { nombre: "Jugador 4", mano: [] },
];
let turno = 1;
let tablero = { arriba: null, abajo: null, historial: [] };

/**
 * @description Se encarga de iniciar de aleatorizar las cartas y repartirlas a los jugadores.
 * Cada jugador recibe 7 cartas.
 * @returns {void}
 */
function repartirCartas() {
  // Esto lo que hace es ir colocando las cartas en un orden aleatorio
  /*
    Ejemplo de cómo funciona:
    Si tenemos un array de cartas y lo queremos mezclar, podemos usar
    una función de orden aleatorio. La función sort() con una función
    que devuelve un número aleatorio entre -0.5 y 0.5, lo que
    permite que los elementos del array se reordenen de manera aleatoria.
    Esto es útil para barajar un mazo de cartas antes de repartirlas.
  */
  let barajaMezclada = cartas.sort(() => Math.random() - 0.5);
  // Repartir 7 cartas a cada jugador
  for (let i = 0; i < 4; i++) {
    jugadores[i].mano = barajaMezclada.slice(i * 7, i * 7 + 7);
  }
}

/**
 * @description Esta función se encarga de eliminar una carta de la mano del jugador.
 * @param {Array} jugador - La mano del jugador del que se eliminará la carta.
 * @param {Object} carta - La carta que se eliminará de la mano del jugador.
 */
function eliminarCarta(jugador, carta) {
  // Encuentro el índice de la carta en la mano del jugador
  let indice = jugador.indexOf(carta);
  // Si la carta está en la mano del jugador, la elimino
  if (indice !== -1) {
    jugador.splice(indice, 1);
    console.log(`Carta ${carta.arriba}-${carta.abajo} eliminada de la mano.`);
  } else {
    console.log("La carta no se encuentra en la mano del jugador.");
  }
}

function posiblesCartasJugador(jugador) {
  // Esta función devuelve las cartas que el jugador puede jugar
  let posiblesCartas = [];
  for (let carta of jugador.mano) {
    if (
      carta.arriba === tablero.arriba ||
      carta.abajo === tablero.arriba ||
      carta.arriba === tablero.abajo ||
      carta.abajo === tablero.abajo
    ) {
      posiblesCartas.push(carta);
    }
  }
  return posiblesCartas;
}

/**
 * @description Esta función se encarga de jugar una carta de la mano del jugador.
 * @param {Array} jugador - La mano del jugador que está jugando.
 */
function jugarCarta(jugador) {
  // Obtengo las cartas posibles que el jugador puede jugar
  let posiblesCartas = posiblesCartasJugador(jugador);
  // Si hay cartas posibles, juego la primera
  if (posiblesCartas.length > 0) {
    // Elijo una carta al azar de las posibles cartas
    let cartaAJugar =
      posiblesCartas[Math.floor(Math.random() * posiblesCartas.length)];
    // Agrego la carta al tablero
    agregarCartaAlTablero(cartaAJugar);
    // Elimino la carta del jugador
    eliminarCarta(jugador, cartaAJugar);
  } else {
    console.log(`El jugador ${turno} no puede jugar ninguna carta.`);
  }
  actualizarTurno();
}

/**
 * @description Esta función se encarga de actualizar el turno del jugador.
 */
function actualizarTurno() {
  turno = turno < 4 ? turno + 1 : 1;
}

/**
 * @description Esta función se encarga de evaluar si algún jugador ha ganado o si el juego está trancado.
 * Si un jugador se queda sin cartas, ese jugador gana.
 * Si el juego está trancado, se cuentan los puntos de las cartas restantes en las manos de los jugadores y se determina el ganador con menos puntos.
 * Si no hay ganador, el juego continúa.
 */
function evaluarVictoria() {
  // Evaluar si algún jugador ha ganado
  if (evaluarSinCartas()) {
    return true;
  }
  
}

function evaluarSinCartas() {
  // Evaluar si algún jugador se ha quedado sin cartas
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i].mano.length === 0) {
      console.log(`El jugador ${i + 1} ha ganado!`);
      return true;
    }
  }
}

function evaluarTrancado() {
  let 
}
function mostrarTablero() {
  for (let i = 0; i < tablero.historial.length; i++) {
    const jugada = tablero.historial[i];
    console.log(
      `\n
      -----------\n
      -    ${jugada.carta.arriba}    -\n
      -    ${jugada.carta.abajo}    -\n
      -----------\n
      `
    );
  }
}

function agregarCartaAlTablero(carta) {
  // Actualizar los valores de arriba y abajo del tablero
  if (carta) {
    if (carta.arriba === tablero.arriba || carta.abajo === tablero.arriba) {
      tablero.arriba = carta.arriba;
      tablero.historial.unshift({ carta: carta, jugador: turno });
    }
    if (carta.arriba === tablero.abajo || carta.abajo === tablero.abajo) {
      tablero.abajo = carta.abajo;
      tablero.historial.push({ carta: carta, jugador: turno });
    }
    // Mostrar el estado del tablero
    console.log(
      `Carta jugada por el jugador ${turno}: ${carta.arriba}-${carta.abajo}`
    );
    mostrarTablero();
  }
}

function iniciarJuego() {
  repartirCartas();
  do {
    console.log(`Turno del jugador ${turno}`);
    jugarCarta(eval(`jugador${turno}`));
    mostrarTablero();
  } while (!evaluarVictoria());
  console.log("El juego ha terminado.");
}

iniciarJuego();
