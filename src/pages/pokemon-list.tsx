import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
// import POKEMONS from "../models/mock-pokemon";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));

    // fetch('http://localhost:3001/pokemons')
    // .then(Response => Response.json())
    // .then((pokemons) => {
    //   setPokemons(pokemons)
    // });
  }, []);

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="container">
        <div className="row">
          {pokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              //   borderColor="black"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
