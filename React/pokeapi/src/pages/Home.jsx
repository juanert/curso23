import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [link, setLink] = useState('https://pokeapi.co/api/v2/pokemon');
  const [page, setPage] = useState(1);
  const input = useRef(null);

  useEffect(
    () => {
      fetch(link)
        .then((res) => res.json())
        .then((res) => setPokemons(res))
        .catch((err) => console.log(err));
    },
    [link]
  )

  const updateStates = (pageNumber, newLink) => {
    setPage(pageNumber);
    setLink(newLink);
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPokemonID = (pokemon) => {
    const id = pokemon.url.split("/")
    return id[id.length - 2]
  }

  const SearchPokemon = () => {
    // Redirigir a la página del Pokémon buscado
    window.location.href = `/pokemon/${input.current.value.toLowerCase()}`;
  }

  if (!pokemons || pokemons == []) {
    return ("cargando...")
  }

  return (
    <div className="p-4 md:p-8 bg-blue-600 min-h-screen flex flex-col items-center gap-12">
      <h1 className="font-bold text-4xl text-white">Pokemons</h1>
      <div className="flex gap-4 items-center justify-center">
        <input ref={input} className="border border-white rounded-2xl px-2 py-1" type="text" name="search" id="search" />
        <button onClick={SearchPokemon}>🔎</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {
          pokemons?.results?.map(
            (pokemon, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded shadow border border-black/50 flex flex-col justify-center items-center text-white">
                <Link to={`/pokemon/${getPokemonID(pokemon)}`}>
                  <h2>{pokemon.name}</h2>
                </Link>
              </div>
            )
          )
        }
      </div>
      <div className="flex justify-center items-center gap-6">
        <button className="bg-white rounded-xl text-blue-600 disabled:bg-gray-400 cursor-pointer px-4 py-2" disabled={!pokemons?.previous} onClick={() => updateStates(page - 1, pokemons.previous)}>Prev</button>
        <p className="text-white">{page}</p>
        <button className="bg-white rounded-xl text-blue-600 disabled:bg-gray-400 cursor-pointer px-4 py-2" disabled={!pokemons?.next} onClick={() => updateStates(page + 1, pokemons.next)}>Next</button>
      </div>
    </div>
  );
}

export { Home };