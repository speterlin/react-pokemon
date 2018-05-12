import React, { Component } from 'react';
// not using this but might in future
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import PokemonDetail from "./Pokemon/PokemonDetail";
import InfiniteScroll from 'react-infinite-scroller';
import SearchPokemon from "./Pokemon/SearchPokemon";
import PokemonList from "./Pokemon/PokemonList";
import {searchPokemons} from '../actions/mainActions';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.offset = 0;
    this.hasMore = true;

    this.loadMore = this.loadMore.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePokemonOpen = this.handlePokemonOpen.bind(this);
    this.handlePokemonClose = this.handlePokemonClose.bind(this);

    this.state = {
      pokemons: [],
      showPokemonDetail: false,
      pokemonID: null
    }
  }

  // would like to refactor and put this in mainActions but need to setState in promise
  fetchPokemons(offset = 0) {
    // could also get info for each pokemon at this url: http://pokeapi.co/ ... api/v2/ability/34/
    const url = `http://pokeapi.salestock.net/api/v2/pokemon/?offset=${offset}`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        var newPokemons = this.state.pokemons.concat(json.results);
        this.setState({ pokemons: newPokemons });
    });
  }

  loadMore() {
    this.fetchPokemons(this.offset);
    this.offset += 20;
  }

  handleSearch(event) {
    event.preventDefault();
    if (event.target.value) {
      this.hasMore = false;
      this.setState({ pokemons: searchPokemons(event.target.value, this.state.pokemons) });
    } else {
      this.hasMore = true;
      this.offset = 0;
      this.setState({pokemons: []});
      this.loadMore();
    }
  }

  handlePokemonOpen(event, pokemonID) {
    event.preventDefault();
    this.hasMore = false;
    this.setState({pokemons: [], showPokemonDetail: true, pokemonID: pokemonID});
  }

  handlePokemonClose(event) {
    event.preventDefault();
    this.hasMore = true;
    this.offset = 0;
    // precautionary, pokemons should already be set at []
    this.setState({pokemons: [], showPokemonDetail: false});
  }

  render() {

    const { pokemons, showPokemonDetail, pokemonID } = this.state;

    if (showPokemonDetail) {
      return (
        <PokemonDetail handlePokemonClose={this.handlePokemonClose} id={pokemonID}  />
      )
    } else {
      return (
        // maybe refactor and put this into PokemonList component
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMore}
          loader={<div className="loader" key={0}>Loading ...</div>}
          hasMore={this.hasMore}
          useWindow={true}
        >
          <SearchPokemon handleSearch={this.handleSearch} />
          <PokemonList pokemons={pokemons} handlePokemonOpen={this.handlePokemonOpen} />
        </InfiniteScroll>
      )
    }
  }
}

export default App;
