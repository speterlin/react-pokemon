import React, { Component } from "react";
import './Pokemon.css';

class Pokemon extends Component {

  constructor(props) {
    super(props);
    console.log(props);

    this.state = {
      // not sure if want this to be a state item
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`
    };

  }

  handleClick() {
    this.hasMore = false;
    this.setState({data: []});
    console.log('hello');
  }

  render() {
    return (
      <div className="pokemon"
        data={this.props.id}
        onClick={((e) => this.props.handlePokemonOpen(e, this.props.id))}
      >
        <div className="image">
          <img src={this.state.image} className="" alt="" />
        </div>
        <div className="text">
          <p> ID: {this.props.id}</p>
          <h2>{this.props.name}</h2>

        </div>
      </div>
    );
  }
}

export default Pokemon;
