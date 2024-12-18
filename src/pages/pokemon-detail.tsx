import React, { FunctionComponent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";

const PokemonsDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(
    () => {
      POKEMONS.forEach(pokemon => {
        if (id === pokemon.id.toString()) {
          setPokemon(pokemon);
        }
      });
    },
    [id]
  );

  return (
    <div>
      {pokemon
        ? <div className="row">
          <div className="col s12 m8 offset-m2">
            <h2 className="header center">
              {pokemon.name}
            </h2>
            <div className="card hoverable">
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
              </div>
              <div className="card-action">
                <Link to={`/pokemons/edit/${pokemon.id}`} ><button className="waves-effect waves-light btn btn-floating">
                  <i className="material-icons">edit</i>
                </button></Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr>
                        <td>Nom</td>
                        <td>
                          <strong>
                            {pokemon.name}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Points de vie</td>
                        <td>
                          <strong>
                            {pokemon.hp}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Dégâts</td>
                        <td>
                          <strong>
                            {pokemon.cp}
                          </strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Types</td>
                        <td>
                          {pokemon.types.map(type =>
                            <span key={type} className={formatType(type)}>
                              {type}
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Date de création</td>
                        <td>
                          {formatDate(pokemon.created)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <h4 className="center">Aucun pokémon à afficher !</h4>}
    </div>
  );
};

export default PokemonsDetail;
