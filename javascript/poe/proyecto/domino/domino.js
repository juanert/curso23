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

let jugador1,
  jugador2,
  jugador3,
  jugador4 = [];
let turno = 1;
let tablero = {arriba: 6, abajo: 6, historial: []};

/**
 * @description Se encarga de iniciar de aleatorizar las cartas y repartirlas a los jugadores.
 * Cada jugador recibe 7 cartas.
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
  jugador1 = barajaMezclada.slice(0, 7);
  jugador2 = barajaMezclada.slice(7, 14);
  jugador3 = barajaMezclada.slice(14, 21);
  jugador4 = barajaMezclada.slice(21, 28);
}

/**
 * @description Se encarga de determinar quien inicia el juego.
 * Revisa las cartas de cada jugador y encuentra la que tiene arriba y abajo 6.
 */
function elegirSalida() {
  // Creo un array con los jugadores
  let jugadores = [jugador1, jugador2, jugador3, jugador4];
  // Recorro la mano de cada jugador
  for (let i = 0; i < jugadores.length; i++) {
    //Reviso cada carta de la mano del jugador
    for (let carta of jugadores[i]) {
      // Si la carta tiene arriba y abajo 6, entonces es el jugador que inicia
      if (carta.arriba === 6 && carta.abajo === 6) {
        // Guardo que valor puede ser jugado en la parte de arriba
        tablero.arriba = carta.arriba;
        // Guardo que valor puede ser jugado en la parte de abajo
        tablero.abajo = carta.abajo;
        // Agrego la carta al historial del tablero, ademas de guardar quien jugo este turno
        tablero.historial.push({ carta: carta, jugador: i + 1});
        //El primer jugador ya jugo, por lo que el turno pasa al siguiente jugador
        // Si el jugador que inicio es el 1, entonces el turno pasa al 2
        // Si el jugador que inicio es el 2, entonces el turno pasa al 3
        // Si el jugador que inicio es el 3, entonces el turno pasa al 4
        // Si el jugador que inicio es el 4, entonces el turno pasa al 1
        if(i < 3) {
          turno = i + 2;
        } else {
          turno = 1;
        }
        // Eliminar la carta del jugador que inicio el juego
        eliminarCarta(jugadores[i], carta);
      }
    }
  }
}

/**
 * @description Esta función se encarga de eliminar una carta de la mano del jugador.
 * @param {Array} jugador - La mano del jugador del que se eliminará la carta.
 * @param {Object} carta - La carta que se eliminará de la mano del jugador.
 */
function eliminarCarta(jugador, carta) {
  // Encuentra el índice de la carta en la mano del jugador
  const index = jugador.findIndex(c => c.arriba === carta.arriba && c.abajo === carta.abajo);
  // Si la carta existe, la elimina
  if (index !== -1) {
    jugador.splice(index, 1);
  }
}

/**
 * @description Esta función se encarga de jugar una carta de la mano del jugador.
 * @param {Array} jugador - La mano del jugador que está jugando.
 */
function jugarCarta(jugador) {
  let posiblesCartas = [];
  // Recorro las cartas del jugador
  for (let carta of jugador) {
    // Verifico si la carta se puede jugar
    if (carta.arriba === tablero.arriba || carta.arriba === tablero.abajo || carta.abajo === tablero.arriba || carta.abajo === tablero.abajo) {
      posiblesCartas.push(carta);
    }
  }
  // Si hay cartas posibles, juego la primera
  if (posiblesCartas.length > 0) {
    let cartaAJugar = posiblesCartas[Math.floor(Math.random() * posiblesCartas.length)];
    // Determino si la carta se juega en la parte de arriba o abajo del tablero
    if (cartaAJugar.arriba === tablero.arriba || cartaAJugar.abajo === tablero.arriba) {
      tablero.arriba = cartaAJugar.arriba;
    } else {
      tablero.abajo = cartaAJugar.abajo;
    }
    // Agrego la carta al historial del tablero
    tablero.historial.push({ carta: cartaAJugar, jugador: turno });
    // Elimino la carta del jugador
    eliminarCarta(jugador, cartaAJugar);
    console.log(`El jugador ${turno} ha jugado la carta: ${cartaAJugar.arriba}-${cartaAJugar.abajo}`);
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

function evaluarVictoria() {
  // Evaluar si algún jugador ha ganado
  for (let i = 0; i < jugadores.length; i++) {
    if (jugadores[i].length === 0) {
      console.log(`El jugador ${i + 1} ha ganado!`);
      return true;
    }
  }
  // Verificar si el juego esta trancado
  let jugadores = [jugador1, jugador2, jugador3, jugador4];
  let trancado = true;
  for (let manoJugador of jugadores) {
    for (let carta of manoJugador) {
      if (carta.arriba === tablero.arriba || carta.arriba === tablero.abajo || carta.abajo === tablero.arriba || carta.abajo === tablero.abajo) {
        trancado = false;
      }
    }
  }
  if( trancado ) {
    let puntos = {puntosJugador1: 0, puntosJugador2: 0, puntosJugador3: 0, puntosJugador4: 0};
    // Contar los puntos de cada cartas restantes en las manos de los jugadores
    for (let manoJugador of jugadores) {
      for (let carta of manoJugador) {
        puntos[`puntosJugador${jugadores.indexOf(manoJugador) + 1}`] += carta.arriba + carta.abajo;
      }
    }
    // Determinar el jugador con menos puntos
    let ganador = "jugador1";
    for (let jugador in puntos) {
      if (puntos[jugador] < puntos[ganador]) {
        ganador = jugador;
      }
    }
    console.log(`El juego esta trancado. El jugador ${ganador} ha ganado con ${puntos[ganador]} puntos!`);
  }
}
