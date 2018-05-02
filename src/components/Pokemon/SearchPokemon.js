import React, { Component } from "react";
import './SearchPokemon.css';

class SearchPokemon extends Component {

  // here and in PokemonList don't need to call constructor and super(props) if just have search function

  render () {
    return (
      <div className="search">
        <input
        type="text"
        className="search-pokemon"
        placeholder="Search Pokemon"
        onChange={((e) => this.props.handleSearch(e))}
        />
      </div>
    )
  }

}


export default SearchPokemon;
