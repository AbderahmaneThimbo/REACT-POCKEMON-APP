import React, { FunctionComponent, useState } from "react";
import Pokemon from "../models/pokemon";
import formatType from "../helpers/format-type";
import { useNavigate } from "react-router-dom";
import PokemonService from "../services/pokemon-service";

type Props = {
  pokemon: Pokemon;
  isEditForm: boolean;
};

type field = {
  value?: any;
  error?: string;
  isValid?: boolean;
};

type form = {
  picture: field;
  name: field;
  hp: field;
  cp: field;
  types: field;
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon, isEditForm }) => {
  const [form, setform] = useState<form>({
    picture: { value: pokemon.picture },
    name: { value: pokemon.name, isValid: true },
    hp: { value: pokemon.hp, isValid: true },
    cp: { value: pokemon.cp, isValid: true },
    types: { value: pokemon.types, isValid: true },
  });

  const types: string[] = [
    "Plante",
    "Feu",
    "Eau",
    "Insecte",
    "Normal",
    "Electrik",
    "Poison",
    "Fée",
    "Vol",
    "Combat",
    "Psy",
  ];

  const hasType = (type: string): boolean => {
    return form.types.value.includes(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName: string = e.target.name;
    const fieldValue: string = e.target.value;
    const newField: field = { [fieldName]: { value: fieldValue } };

    setform({ ...form, ...newField });
  };

  const selectType = (
    type: string,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const checked = e.target.checked;
    let newField: field;

    if (checked) {
      const newTypes: string[] = form.types.value.concat([type]);
      newField = { value: newTypes };
    } else {
      const newTypes: string[] = form.types.value.filter(
        (currentType: string) => currentType !== type
      );
      newField = { value: newTypes };
    }

    setform({ ...form, ...{ types: newField } });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormaValid = validateForm();

    if (isFormaValid) {
      pokemon.picture = form.picture.value;
      pokemon.name = form.name.value;
      pokemon.hp = form.hp.value;
      pokemon.cp = form.cp.value;
      pokemon.types = form.types.value;

      isEditForm ? updatePokemon() : addPokemon();
    }
  };
  const addPokemon = () => {
    PokemonService.addPokemon(pokemon).then(() => navigate("/pokemons"));
  };

  const updatePokemon = () => {
    PokemonService.editPokemon(pokemon).then(() =>
      navigate(`/pokemons/${pokemon.id}`)
    );
  };

  const isAddForm = () => {
    return !isEditForm;
  };
  const validateForm = () => {
    let newForm: form = form;

    if (isAddForm()) {
      const start =
        "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
      const end = ".png";

      if (
        !form.picture.value.startsWith(start) ||
        !form.picture.value.endsWith(end)
      ) {
        const errorMsg: string = "L'url n'est pas valide.";
        const newField: field = {
          value: form.picture.value,
          error: errorMsg,
          isValid: false,
        };
        newForm = { ...form, ...{ picture: newField } };
      } else {
        const newField: field = {
          value: form.picture.value,
          error: "",
          isValid: true,
        };
        newForm = { ...form, ...{ picture: newField } };
      }
    }

    if (!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)) {
      const errorMsg: string = "le nom du pokemon est requis (1-2).";
      const newField: field = {
        value: form.name.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ name: newField } };
    } else {
      const newField: field = {
        value: form.name.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ name: newField } };
    }

    if (!/^[0-9]{1,3}$/.test(form.hp.value)) {
      const errorMsg: string =
        "Les points de vie du pokemon sont compris entre 0 et 999";
      const newField: field = {
        value: form.hp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: field = {
        value: form.hp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    }

    if (!/^[0-9]{1,2}$/.test(form.cp.value)) {
      const errorMsg: string =
        "Les degats du pokemon sont compris entre 0 et 99";
      const newField: field = {
        value: form.cp.value,
        error: errorMsg,
        isValid: false,
      };
      newForm = { ...newForm, ...{ hp: newField } };
    } else {
      const newField: field = {
        value: form.cp.value,
        error: "",
        isValid: true,
      };
      newForm = { ...newForm, ...{ cp: newField } };
    }

    setform(newForm);
    return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
  };

  const isTypesValid = (type: string): boolean => {
    if (form.types.value.length === 1 && hasType(type)) {
      return false;
    }
    if (form.types.value.length >= 3 && !hasType(type)) {
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable">
            {isEditForm && (
              <div className="card-image">
                <img
                  src={pokemon.picture}
                  alt={pokemon.name}
                  style={{ width: "250px", margin: "0 auto" }}
                />
              </div>
            )}

            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon picture */}
                {isAddForm() && (
                  <div className="form-group">
                    <label htmlFor="picture">Image</label>
                    <input
                      id="picture"
                      name="picture"
                      type="url"
                      className="form-control"
                      value={form.picture.value}
                      onChange={(e) => handleInputChange(e)}
                    ></input>
                    {form.picture.error && (
                      <div className="card-panel red accent-1">
                        {form.picture.error}
                      </div>
                    )}
                  </div>
                )}

                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-control"
                    value={form.name.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.name.error && (
                    <div className="card-panel red accent-1">
                      {form.name.error}
                    </div>
                  )}
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input
                    id="hp"
                    name="hp"
                    type="number"
                    className="form-control"
                    value={form.hp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.hp.error && (
                    <div className="card-panel red accent-1">
                      {form.hp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input
                    id="cp"
                    name="cp"
                    type="number"
                    className="form-control"
                    value={form.cp.value}
                    onChange={(e) => handleInputChange(e)}
                  ></input>
                  {form.cp.error && (
                    <div className="card-panel red accent-1">
                      {form.cp.error}
                    </div>
                  )}
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map((type) => (
                    <div key={type} style={{ marginBottom: "10px" }}>
                      <label>
                        <input
                          id={type}
                          type="checkbox"
                          className="filled-in"
                          value={type}
                          disabled={!isTypesValid(type)}
                          checked={hasType(type)}
                          onChange={(e) => selectType(type, e)}
                        ></input>
                        <span>
                          <p className={formatType(type)}>{type}</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">
                  Valider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PokemonForm;
