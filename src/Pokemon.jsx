import { useEffect, useState } from "react";

export const Pokemon = ()=> {
    const [pokemon, setPokemon] = useState([]);
    const API = "https://pokeapi.co/api/v2/pokemon?limit=124";

    const pokemonFetch = async()=> {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setPokemon(data);
            console.log(data);

            const pokemonData = data.results.map((currPokemon)=> {
                //console.log(currPokemon.url);
                
            })
            
        } catch (error) {
            console.log(error);
            
        };
    };

    useEffect(()=> {
        pokemonFetch();
    },[])
    return(
        <>
        <section>
            <header>
                <h1> Lets Catch Pokémon </h1>
                <div>
                    <ul>
                        {pokemon.map((currPokemon)=> {
                            console.log(currPokemon);
                            
                        })}
                    </ul>
                </div>
            </header>
        </section>
        </>
    )
}