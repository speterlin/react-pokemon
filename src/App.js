import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import PokemonList from "./Pokemon/PokemonList";
import './App.css';

class App extends Component {

  render() {
    return (
      <PokemonList />
    );
  }
}

export default App;
