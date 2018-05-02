import React, { Component } from 'react';
import {getPokemonId} from '../../actions/mainActions';
import Pokemon from "./Pokemon";


class PokemonList extends Component {

  render() {

    var pokemons = [];
    this.props.pokemons.forEach((pokemon, i) => {
      pokemons.push(
        <Pokemon url={pokemon.url} id={getPokemonId(pokemon.url)} name={pokemon.name} key={i} handlePokemonOpen={this.props.handlePokemonOpen} />
      )
    })

    return (
      <div className="pokemons">
        {pokemons}
      </div>
    );

  }
}


export default PokemonList;
