import { useEffect, useState } from "react";
import "./pokemon.css";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=200";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      //   console.log(data);

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });
      //console.log(detailedPokemonData);

      const responseDetails = await Promise.all(detailedPokemonData);
      console.log(responseDetails);
      setPokemon(responseDetails);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  //search functionality

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return(
        <div>
            <h1>Loading.....</h1>
        </div>
    )
  }

  if (error) {
    return(
        <div>
            <h1>{error.message}</h1>
        </div>
    )
  }

  return (
    <>
      <section className="container">
        <header>
          <h1> Lets Catch Pokémon</h1>
        </header>
        <div>
            <ul className="cards">
                {pokemon.map((curPokemon)=> {
                    return <PokemonCards key={curPokemon.id} pokemonData={curPokemon} />
                })
                }
            </ul>
        </div>
      </section>
    </>
  );
};