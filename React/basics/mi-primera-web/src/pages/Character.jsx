import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

function Character() {
  const [character, setCharacter] = useState(null)
  //useParams me sirve para traer una variable de la URL
  const { id } = useParams()
  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then(res => res.json())
      .then(res => setCharacter(res))
      .catch(error => console.log(error))
  }, []) // El efecto se ejecuta una sola vez al montar el componente

  if (!character) {
    return <p>Cargando...</p>
  }

  return (
    <div className="border p-4 rounded flex flex-col items-center gap-2">
      <img src={character.image} alt={character.name} />
      <h2 className="font-bold">{character.name}</h2>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <Link to="/effect" className="mt-4 text-blue-500 underline">Volver al listado</Link>
    </div>
  )
}

export { Character }