import { useState } from "react";

function Practica() {
  const [color, setColor] = useState("Color");
  return (
    <div>
      <h1 className={color === "Rojo" ? "text-red-600" : color === "Verde" ? "text-green-600" : "text-blue-600"}>{color}</h1>
      <div>
        <button onClick={() => { setColor("Rojo") }}>Rojo</button>
        <button onClick={() => { setColor("Verde") }}>Verde</button>
        <button onClick={() => { setColor("Azul") }}>Azul</button>
      </div>
    </div>
  )
}

export { Practica }