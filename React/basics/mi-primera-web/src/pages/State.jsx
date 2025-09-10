/*
  Los Hooks son funciones espciales que permiten "enganchar" (hook)
  funcionalidades de React a componentes funcionales.

  Un componente funcional es un componente que tiene una logica (No simplemente
  una representacion visual).

  El hook mas importante es useState, que permite a un componente funcional
  tener estado (state).

  Es como una forma de manejar variables en las vistas.
*/

import { useState } from "react";

function State() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => {setCount(count + 1)}}>{count}</button>
  )
}

export { State }