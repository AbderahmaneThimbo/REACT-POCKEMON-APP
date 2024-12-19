import React, { FunctionComponent, useState, useEffect } from "react";
import Pokemon from "../models/pokemon";
import { Link } from "react-router-dom";
import PokemonCard from "../components/pokemon-card";
import PokemonService from "../services/pokemon-service";
import PokemonSearch from "./pokemon-search";

const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    PokemonService.getPokemons().then((pokemons) => setPokemons(pokemons));
  }, []);

  return (
    <div>
      <h1 className="center">Pokédex</h1>
      <div className="row">
        <PokemonSearch />
      </div>
      <Link to={"/pokemons/add"}>
        <button
          className="waves-effect waves-light btn blue btn-floating z-depth-3"
          style={{ position: "fixed", right: "25px", bottom: "25px" }}
        >
          <i className="material-icons">add</i>
        </button>
      </Link>
      <div className="container">
        <div className="row">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
