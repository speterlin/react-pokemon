import React, { Component } from 'react';
import Pokemon from "./Pokemon";
import PokemonDetail from "./PokemonDetail";
import InfiniteScroll from 'react-infinite-scroller';
import './PokemonList.css';

class PokemonList extends Component {

  constructor(props) {
    super(props);

    this.loadMore = this.loadMore.bind(this);

    this.offset = 0;
    this.hasMore = true;
    // probably refactor, not great
    this.showPokemonDetail = false;
    this.pokemonDetail = null;

    this.handlePokemonOpen = this.handlePokemonOpen.bind(this);
    this.handlePokemonClose = this.handlePokemonClose.bind(this);

    this.state = {
      // not sure if want this to be a state item
      data: []
    };
  }


  fetchPokemon(offset = 0) {
    const url = `http://pokeapi.salestock.net/api/v2/pokemon/?offset=${offset}`;

    fetch(url)
      .then(response => response.json())
      .then(json => {
        var newData = this.state.data.concat(json.results);
        this.setState({ data: newData });
    });
  }

  searchPokemons(str) {
    // probably refactor and move this to it's own component
    var results = [];
    for (var i=0; i<this.state.data.length; i++) {
      if (this.state.data[i].name.match(str)) results.push(this.state.data[i]);
    }
    return results;
  }

  loadMore() {
    this.fetchPokemon(this.offset);
    this.offset += 20;
  }

  handleChange(event) {
    event.preventDefault();
    if (event.target.value) {
      this.hasMore = false;
      this.setState({
        data: this.searchPokemons(event.target.value)
      });
    } else {
      // bug not fetching 0-40... pokemon, fetching 0-20 and then whatever was leftover i.e. 60-80
      this.hasMore = true;
      this.setState({data: []});
      this.fetchPokemon();
    }
  }

  handlePokemonOpen(event, pokemonID) {
    event.preventDefault();
    this.hasMore = false;
    this.setState({data: []});
    this.showPokemonDetail=true;
    this.pokemonDetail = <PokemonDetail handlePokemonClose={this.handlePokemonClose} id={pokemonID} />
  }

  handlePokemonClose(event) {
    event.preventDefault();
    this.hasMore = true;
    // assuming this.state.data is already empty array
    console.log('hello world');
    this.showPokemonDetail = false;
    // probably refactor, not great
    window.location.reload();
  }

  render() {

    const getPokemonId = (url) => {
      return url.match(/\/[0-9]+\/?$/g)[0].replace(/\//g, '');
    }

    var pokemons = [];
    this.state.data.forEach((object, i) => {
      pokemons.push(
        <Pokemon url={object.url} id={getPokemonId(object.url)} name={object.name} key={i} handlePokemonOpen={this.handlePokemonOpen} />
      )
    })

    if (this.showPokemonDetail) {
      return (
        this.pokemonDetail
      )
    } else {
      return (
        <InfiniteScroll
        pageStart={0}
        loadMore={this.loadMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        hasMore={this.hasMore}
        useWindow={true}
        >
        <div className="search">
          <input
          type="text"
          className="search-pokemon"
          placeholder="Search Pokemon"
          onChange={this.handleChange.bind(this)}
          />
        </div>
        <div className="pokemons">
          {pokemons}
        </div>
        </InfiniteScroll>
      );
    }
  }
}


export default PokemonList;
