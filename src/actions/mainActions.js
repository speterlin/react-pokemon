
export function searchPokemons(str, pokemons) {
  var results = [];
  for (var i=0; i<pokemons.length; i++) {
    if (pokemons[i].name.match(str)) results.push(pokemons[i]);
  }
  return results;
}

export const getPokemonId = (url) => {
  return url.match(/\/[0-9]+\/?$/g)[0].replace(/\//g, '');
}
