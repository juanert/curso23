import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";

function Pokemon() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <img src={data?.sprites?.front_default} alt={data?.name} />
      <h2>{data?.name}</h2>
    </div>
  );
}

export { Pokemon };