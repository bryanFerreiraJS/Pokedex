export default {
  addFavoritePokemon: (store, pokemon) => {
    store.commit('ADD_FAVORITE_POKEMON', pokemon)
  },
  deleteFavoritePokemon: (store, pokemon) => {
    store.commit('DELETE_FAVORITE_POKEMON', pokemon)
  },
}