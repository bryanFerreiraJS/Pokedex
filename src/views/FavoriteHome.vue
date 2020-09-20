<template>
  <div class="container">
    <Alert
      v-if="alertMessage"
      :alertMessage="alertMessage"
      @close-alert="closeAlert" />
    <h1>Your Favorites Pokemons</h1>
    <FavoriteList 
      :imageUrl="imageUrl" 
      :apiUrl="apiUrl"
      @display-favorite-detail="displayFavoriteDetail"
      @add-favorite="addFavorite" 
      @delete-favorite="deleteFavorite" />
    <FavoriteDetail 
      v-if="showFavoriteDetail"
      :pokemon="pokemon"
      :imageUrl="imageUrl"
      @close-favorite-detail="closeFavoriteDetail"
      @add-favorite="addFavorite" 
      @delete-favorite="deleteFavorite" />
  </div>
</template>

<script>
  import Alert from '@/components/Alert.vue'
  import FavoriteList from '@/components/FavoriteList.vue';
  import FavoriteDetail from '@/components/FavoriteDetail.vue';

  import { mapActions } from 'vuex';
  import axios from 'axios'

  export default {
    data: () => {
      return {
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
        apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
        pokemon: {},
        showFavoriteDetail: false,
        alertMessage: '',
      }
    },
    components: {
      Alert,
      FavoriteList,
      FavoriteDetail
    },
    methods: {
      ...mapActions({
        addFavoritePokemon: 'addFavoritePokemon',
        deleteFavoritePokemon: 'deleteFavoritePokemon',
      }),
      async addFavorite(urlOrPokemon) {
        try {
          if (typeof(urlOrPokemon) === "string") {
            // Si le paramètre est un URL, on lance une requête et on l'ajoute au state.
            // Un message apparaît pour tenir l'utilisateur informé.
            const response = await axios.get(urlOrPokemon);
            this.addFavoritePokemon(response.data);
            this.alertMessage = `${response.data.name} has been successfully added to your favorites !`;
          } else {
            // Sinon, ça veut dire que la requête a déjà été effectuée dans la vue des détails, pas besoin de faire de requête. On ajoute directement le pokemon dans le state.
            // Un message apparaît pour tenir l'utilisateur informé.
            this.addFavoritePokemon(urlOrPokemon);
            this.alertMessage = `${urlOrPokemon.name} has been successfully added to your favorites !`;
          }
        } catch (error) {
          console.log(error);
        };
      },
      deleteFavorite(pokemonName) {
        // On supprime le pokémon du state.
        // Un message apparaît pour tenir l'utilisateur informé.
        this.deleteFavoritePokemon(pokemonName);
        this.alertMessage = `${pokemonName} has been successfully deleted to your favorites !`;
      },
      displayFavoriteDetail(pokemon){
        this.pokemon = pokemon;
        this.showFavoriteDetail = true;
      },
      closeFavoriteDetail() {
        this.pokemon = {};
        this.showFavoriteDetail = false;
      },
      closeAlert() {
        this.alertMessage = '';
      },
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 240px);
  font-family: arial;
  padding-top: 120px;
}

h1 {
  color: black;
  padding: 10px;
  border: 3px solid black;
  border-radius: 5px;
  background-color: white;
  margin: 0 10px;
}
</style>
