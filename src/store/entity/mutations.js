import _ from 'lodash'

export default {
  // Ajoute un pokémon et trie le tableau par ID
  ADD_FAVORITE_POKEMON: (state, pokemon) => {
    state.favoritePokemons.push(pokemon);
    state.favoritePokemons.sort((current, next) => current.id - next.id);
  },
  // Supprime l'élément du tableau "sans laisser de trous"
  DELETE_FAVORITE_POKEMON: (state, pokemonName) => {
    _.remove(state.favoritePokemons, (elem) => {
      return elem.name === pokemonName;
    })
  },
}