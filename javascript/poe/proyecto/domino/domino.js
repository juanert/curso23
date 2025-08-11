/**
 * @typedef {Object} Carta
 * @property {number} arriba - Valor de la parte superior de la ficha.
 * @property {number} abajo - Valor de la parte inferior de la ficha.
 */

/**
 * @typedef {Object} Jugador
 * @property {string} nombre - Nombre del jugador.
 * @property {Carta[]} mano - Fichas que posee el jugador.
 */

/** @type {Carta[]} Conjunto de todas las fichas de dominó (doble seis). */
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

/** @type {Jugador[]} Lista de jugadores en la partida. */
let jugadores = [
  { nombre: "Jugador 1", mano: [] },
  { nombre: "Jugador 2", mano: [] },
  { nombre: "Jugador 3", mano: [] },
  { nombre: "Jugador 4", mano: [] },
];

/** @type {number} Número de turno actual (1 a 4). */
let turno = 1;

/**
 * Estado actual del tablero.
 * @type {{arriba: number|null, abajo: number|null, historial: {carta:Carta, jugador:number}[]}}
 */
let tablero = { arriba: null, abajo: null, historial: [] };

/**
 * Baraja las fichas y reparte 7 a cada jugador.
 * @returns {void}
 */
function repartirCartas() {
  let barajaMezclada = [...cartas].sort(() => Math.random() - 0.5);
  for (let i = 0; i < jugadores.length; i++) {
    jugadores[i].mano = barajaMezclada.slice(i * 7, i * 7 + 7);
  }
}

/**
 * Elimina una ficha específica de la mano de un jugador.
 * @param {Carta[]} mano - Mano del jugador.
 * @param {Carta} carta - Carta a eliminar.
 * @returns {void}
 */
function eliminarCarta(mano, carta) {
  let indice = mano.indexOf(carta);
  if (indice !== -1) {
    mano.splice(indice, 1);
    console.log(`Carta ${carta.arriba}-${carta.abajo} eliminada de la mano.`);
  } else {
    console.log("La carta no se encuentra en la mano del jugador.");
  }
}

/**
 * Determina las cartas que un jugador puede jugar en el turno actual.
 * Si el tablero está vacío, solo devuelve el doble seis (6-6).
 * @param {Jugador} jugador - Jugador a evaluar.
 * @returns {Carta[]} Lista de cartas jugables.
 */
function posiblesCartasJugador(jugador) {
  let posibles = [];
  if (tablero.historial.length === 0) {
    for (let c of jugador.mano)
      if (c.arriba === 6 && c.abajo === 6) posibles.push(c);
    return posibles;
  }
  for (let c of jugador.mano) {
    if (
      c.arriba === tablero.arriba ||
      c.abajo === tablero.arriba ||
      c.arriba === tablero.abajo ||
      c.abajo === tablero.abajo
    ) {
      posibles.push(c);
    }
  }
  return posibles;
}

/**
 * Intenta jugar una carta válida para el jugador.
 * Si no puede, pasa el turno.
 * @param {Jugador} jugador - Jugador que va a jugar.
 * @returns {void}
 */
function jugarCarta(jugador) {
  let posibles = posiblesCartasJugador(jugador);

  if (tablero.historial.length === 0 && posibles.length === 0) {
    console.log(`${jugador.nombre} no tiene 6-6 para iniciar. Pasa.`);
    actualizarTurno();
    return;
  }

  if (posibles.length > 0) {
    let cartaAJugar = posibles[Math.floor(Math.random() * posibles.length)];
    agregarCartaAlTablero(cartaAJugar);
    eliminarCarta(jugador.mano, cartaAJugar);
  } else {
    console.log(`${jugador.nombre} no puede jugar ninguna carta. Pasa.`);
  }
  actualizarTurno();
}

/**
 * Cambia el turno al siguiente jugador (circular 1..4).
 * @returns {void}
 */
function actualizarTurno() {
  turno = turno < 4 ? turno + 1 : 1;
}

/**
 * Evalúa si el juego debe finalizar por victoria o tranca.
 * @returns {boolean} `true` si el juego termina.
 */
function evaluarVictoria() {
  if (evaluarSinCartas()) return true;
  if (evaluarTrancado()) {
    const puntajes = jugadores.map((j) =>
      j.mano.reduce((acc, c) => acc + c.arriba + c.abajo, 0)
    );
    const menor = Math.min(...puntajes);
    const idx = puntajes.indexOf(menor);
    console.log(
      `\nJuego trancado. Puntos: ${puntajes
        .map((p, i) => `${jugadores[i].nombre}=${p}`)
        .join(" | ")}`
    );
    console.log(
      `Ganador por menor puntaje: ${jugadores[idx].nombre} (${menor} puntos)`
    );
    return true;
  }
  return false;
}

/**
 * Determina si algún jugador se ha quedado sin cartas.
 * @returns {boolean} `true` si un jugador ha ganado.
 */
function evaluarSinCartas() {
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i].mano.length === 0) {
      console.log(`\n${jugadores[i].nombre} ha ganado!`);
      return true;
    }
  }
  return false;
}

/**
 * Comprueba si el juego está trancado (ningún jugador puede jugar).
 * @returns {boolean} `true` si está trancado.
 */
function evaluarTrancado() {
  if (tablero.historial.length === 0) return false;
  for (let j of jugadores)
    if (posiblesCartasJugador(j).length > 0) return false;
  return true;
}

/**
 * Muestra el estado actual del tablero en consola.
 * @returns {void}
 */
function mostrarTablero() {
  if (tablero.historial.length === 0) {
    console.log("\n[Tablero vacío]\n");
    return;
  }
  console.log("\n=== TABLERO ===");
  for (let i = 0; i < tablero.historial.length; i++) {
    const jugada = tablero.historial[i];
    console.log(
      `Jugador: ${jugada.jugador}\n` +
        `---------\n` +
        `|   ${jugada.carta.arriba}   |\n` +
        `|-------|\n` +
        `|   ${jugada.carta.abajo}   |\n` +
        `---------\n`
    );
  }
  console.log(`Extremos: [${tablero.arriba}] ... [${tablero.abajo}]\n`);
}

/**
 * Obtiene el valor opuesto de una ficha dado un valor coincidente.
 * @param {Carta} carta - Carta a evaluar.
 * @param {number} valorCoincidente - Valor que coincide con un extremo del tablero.
 * @returns {number|null} Valor opuesto o `null` si no coincide.
 */
function caraOpuesta(carta, valorCoincidente) {
  if (carta.arriba === valorCoincidente) return carta.abajo;
  if (carta.abajo === valorCoincidente) return carta.arriba;
  return null;
}

/**
 * Coloca una carta en el tablero y actualiza los extremos.
 * @param {Carta} carta - Carta a colocar.
 * @returns {void}
 */
function agregarCartaAlTablero(carta) {
  if (tablero.historial.length === 0) {
    tablero.arriba = carta.arriba;
    tablero.abajo = carta.abajo;
    tablero.historial.push({ carta: { ...carta }, jugador: turno });
    console.log(
      `Carta inicial jugada por el jugador ${turno}: ${carta.arriba}-${carta.abajo}`
    );
    mostrarTablero();
    return;
  }

  const coincideArriba =
    carta.arriba === tablero.arriba || carta.abajo === tablero.arriba;
  const coincideAbajo =
    carta.arriba === tablero.abajo || carta.abajo === tablero.abajo;

  if (!coincideArriba && !coincideAbajo) {
    console.log("La carta no coincide con ningún extremo (no debería pasar).");
    return;
  }

  const lado =
    coincideArriba && coincideAbajo
      ? Math.random() < 0.5
        ? "arriba"
        : "abajo"
      : coincideArriba
      ? "arriba"
      : "abajo";

  if (lado === "arriba") {
    const valorQueConecta = tablero.arriba;
    const nuevoExterno = caraOpuesta(carta, valorQueConecta);
    if (nuevoExterno == null) {
      console.log("Error de lógica al colocar en ARRIBA.");
      return;
    }
    tablero.arriba = nuevoExterno;
    const orientada = { arriba: nuevoExterno, abajo: valorQueConecta };
    tablero.historial.unshift({ carta: orientada, jugador: turno });
  } else {
    const valorQueConecta = tablero.abajo;
    const nuevoExterno = caraOpuesta(carta, valorQueConecta);
    if (nuevoExterno == null) {
      console.log("Error de lógica al colocar en ABAJO.");
      return;
    }
    tablero.abajo = nuevoExterno;
    const orientada = { arriba: valorQueConecta, abajo: nuevoExterno };
    tablero.historial.push({ carta: orientada, jugador: turno });
  }

  console.log(
    `Carta jugada por el jugador ${turno}: ${carta.arriba}-${
      carta.abajo
    } en ${lado.toUpperCase()}`
  );
  mostrarTablero();
}

/**
 * Inicia el juego buscando quién tiene 6-6 y realizando turnos
 * hasta que alguien gane o el juego se trabe.
 * @returns {void}
 */
function iniciarJuego() {
  repartirCartas();

  let startIndex = -1;
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i].mano.some((c) => c.arriba === 6 && c.abajo === 6)) {
      startIndex = i;
      break;
    }
  }
  if (startIndex === -1) {
    console.log("Nadie tiene 6-6. Repartiendo de nuevo...");
    return iniciarJuego();
  }

  turno = startIndex + 1;
  const jugadorInicial = jugadores[startIndex];
  const dobleSeis = jugadorInicial.mano.find(
    (c) => c.arriba === 6 && c.abajo === 6
  );
  agregarCartaAlTablero(dobleSeis);
  eliminarCarta(jugadorInicial.mano, dobleSeis);

  actualizarTurno();

  while (!evaluarVictoria()) {
    const jugadorActual = jugadores[turno - 1];
    console.log(`Turno de ${jugadorActual.nombre}`);
    jugarCarta(jugadorActual);
  }

  console.log("El juego ha terminado.");
}

// Ejecutar juego
iniciarJuego();
