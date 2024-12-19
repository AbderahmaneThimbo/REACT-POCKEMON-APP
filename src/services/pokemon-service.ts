import Pokemon from "../models/pokemon";

export default class PokemonService {
  static getPokemons(): Promise<Pokemon[]> {
    return fetch("http://localhost:3001/pokemons")
      .then((response) => response.json())
      .catch((error) => this.handaleError(error));
  }

  static getPokemon(id: number): Promise<Pokemon | null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then((response) => response.json())
      .then((data) => (this.isEmpty(data) ? null : data))
      .catch((error) => this.handaleError(error));
  }

  static editPokemon(pokemon: Pokemon): Promise<Pokemon> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    })
      .then((response) => response.json())
      .catch((error) => this.handaleError(error));
  }

  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {
    delete (pokemon as { created?: Date }).created;
    return fetch(`http://localhost:3001/pokemons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon),
    })
      .then((response) => response.json())
      .catch((error) => this.handaleError(error));
  }

  static deletePokemon(pokemon: Pokemon): Promise<void> {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .catch((error) => this.handaleError(error));
  }

  static searchPokemon(term: string): Promise<Pokemon[]> {
    return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then((response) => response.json())
      .catch((error) => this.handaleError(error));
  }

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handaleError(error: Error): void {
    console.error(error);
  }
}
