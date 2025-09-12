import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Pokemon() {
  const [pokemon, setPokemon] = useState(null);
  const { id } = useParams();
  
  useEffect(
    () => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((res) => res.json())
        .then((res) => setPokemon(res))
        .catch((err) => console.log(err));
    },
    []
  )

  return (
    <div>
      <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
      <h2>{pokemon?.name}</h2>
    </div>
  );
}

export { Pokemon };