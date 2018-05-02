import React, { Component } from "react";
// import * as mainActions from '../../actions/mainActions';
import './PokemonDetail.css';

class PokemonDetail extends Component {

  constructor(props) {
    super(props)

    this.fetchPokemonInfo();

    this.state = {
      loading: true,
      name: null,
      abilities: null,
      types: null,
      // couldn't find evolution information, maybe refactor
      species: null,
      // repeat here and in Pokemon.js, probably refactor
      image:  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`
    }
  }

  fetchPokemonInfo() {
    const url = `http://pokeapi.salestock.net/api/v2/pokemon/${this.props.id}/`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        this.setState({
          loading: false,
          name: json.name,
          abilities: json.abilities.map(function(object, i){ return object.ability.name;}),
          types: json.types.map(function(object, i){ return object.type.name;}),
          species: json.species.name
        });
    });
  }

  render() {

    if (this.state.loading) {
      return <div>Loading ...</div>;
    } else {
      return (
        <div className="pokemon-detail"
          onClick={((e) => this.props.handlePokemonClose(e))}
        >
          <div className="image">
            <img src={this.state.image} className="" alt="" />
          </div>
          <h2>{this.state.name}</h2>
          <p>{this.state.species}</p>
          <h3>Abilities:</h3>
          <ul>
            {this.state.abilities
              .map((ability,i) => <li key={i}>{ability}</li>) }
          </ul>
          <h3>Types:</h3>
          <ul>
            {this.state.types
              .map((type,i) => <li key={i}>{type}</li>) }
          </ul>
        </div>
      );
    }
  }
}

export default PokemonDetail;
