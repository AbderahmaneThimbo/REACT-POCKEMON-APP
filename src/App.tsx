import React, { FunctionComponent } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PokemonList from "./pages/pokemon-list";
import PokemonsDetail from "./pages/pokemon-detail";
import PokemonEdit from "./pages/pokemon-edit";
import PageNotFound from "./pages/page-not-found";
import PokemonAdd from "./pages/pokemon-add";

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        <nav>
          <div className="nav-wrapper teal">
            <Link to="/" className="brand-logo center">Pokedex</Link>
          </div>
        </nav>
        <Routes>

          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemons" element={<PokemonList />} />
          <Route path="/pokemons/:id" element={<PokemonsDetail />} />
          <Route path="/pokemons/edit/:id" element={<PokemonEdit />} />
          <Route path="/pokemons/add" element={<PokemonAdd />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
