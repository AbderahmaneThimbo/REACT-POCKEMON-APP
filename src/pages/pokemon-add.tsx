import React, { FunctionComponent, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import PokemonForm from "../components/pokemon-form";
import Pokemon from "../models/pokemon";
import PokemonService from "../services/pokemon-service";

type Params = { id: string };

const PokemonAdd: FunctionComponent = () => {
  const [id] = useState<number>(new Date().getTime());
  const [pokemon,] = useState<Pokemon | null>(null);

  return (
    <div>
      {pokemon ? (
        <div className="row">
          <h2 className="header center">Ajouter un pokemon {pokemon.name}</h2>
          <PokemonForm pokemon={pokemon}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
};

export default PokemonAdd;
