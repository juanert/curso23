import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

/*
  Hook useEffect
  - Sirve para ejecutar efectos secundarios en componentes funcionales.
  - Se ejecuta despues de que el componente se haya renderizado.
  - Se puede usar para manejar ciclos de vida del componente.
*/

function Effect() {
  const [data, setData] = useState(null)
  const [link, setLink] = useState("https://rickandmortyapi.com/api/character?page=1")
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch(link)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(error => console.log(error))
  }, [link]) // El efecto se ejecuta cada vez que el valor de link cambie

  const updateStates = (link, page) => {
    setLink(link)
    setPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="p-8">
      <h1>Rick and morty characters</h1>
      <div className="grid grid-cols-4 gap-4">
        {
          data?.results.map((character, index) => (
            <Link to={`/character/${character.id}`} key={index} className="border p-4 rounded flex flex-col items-center gap-2 hover:shadow-lg hover:scale-105 transition-all">
              <img src={character.image} alt={character.name} />
              <h2 className="font-bold">{character.name}</h2>
            </Link>
          ))
        }
      </div>
      <div className="flex justify-center items-center gap-8 mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!data?.info.prev}
          onClick={() => { updateStates(data?.info.prev, page - 1) }}>
          Prev
        </button>
        <p>{page}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!data?.info.next}
          onClick={() => { updateStates(data?.info.next, page + 1) }}>Next</button>
      </div>
    </div>
  )
}

export { Effect }