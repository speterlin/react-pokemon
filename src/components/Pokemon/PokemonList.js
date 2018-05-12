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

// maybe refactor and add propType requirements throughout (like PokemonList.propTypes = { pokemons: React.PropTypes.array.isRequired }), could also add defaultProps, see https://daveceddia.com/watch-out-for-undefined-state/

export default PokemonList;
