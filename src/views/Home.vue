<template>
  <div class="container">
    <Alert
      v-if="alertMessage"
      :alertMessage="alertMessage"
      @close-alert="closeAlert" />
    <h1>The List of Pokemons</h1>
    <List 
      :imageUrl="imageUrl" 
      :apiUrl="apiUrl"
      @set-pokemon-url="setPokemonUrl"
      @add-favorite="addFavorite" 
      @delete-favorite="deleteFavorite" />
    <Detail 
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @close-detail="closeDetail"
      @add-favorite="addFavorite" 
      @delete-favorite="deleteFavorite" />
  </div>
</template>

<script>
  import Alert from '@/components/Alert.vue'
  import List from '@/components/List.vue';
  import Detail from '@/components/Detail.vue';

  import { mapActions } from 'vuex';
  import axios from 'axios'

  export default {
    data: () => {
      return {
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
        apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
        alertMessage: '',
        pokemonUrl: '',
        showDetail: false,
      }
    },
    components: {
      Alert,
      List,
      Detail
    },
    methods: {
      ...mapActions({
        addFavoritePokemon: 'addFavoritePokemon',
        deleteFavoritePokemon: 'deleteFavoritePokemon',
      }),
      setPokemonUrl(url) {
        this.pokemonUrl = url;
        this.showDetail = true;
      },
      closeDetail() {
        this.pokemonUrl = '';
        this.showDetail = false;
      },
      closeAlert() {
        this.alertMessage = '';
      },
      async addFavorite(urlOrPokemon) {
        try {
          if (typeof(urlOrPokemon) === "string") {
            // Si le paramètre est un URL, on lance une requête et on l'ajoute au state.
            // Un message apparaît pour tenir l'utilisateur informé.
            const response = await axios.get(urlOrPokemon);
            this.addFavoritePokemon(response.data);
            this.alertMessage = `${response.data.name} has been successfully added to your favorites !`
          } else {
            // Sinon, ça veut dire que la requête a déjà été effectuée dans la vue des détails, pas besoin de faire de requête. On ajoute directement le pokemon dans le state.
            // Un message apparaît pour tenir l'utilisateur informé.
            this.addFavoritePokemon(urlOrPokemon);
            this.alertMessage = `${urlOrPokemon.name} has been successfully added to your favorites !`
          }
        } catch (error) {
          console.log(error);
        };
      },
      deleteFavorite(pokemonName) {
        // On supprime le pokémon du state.
        // Un message apparaît pour tenir l'utilisateur informé.
        this.deleteFavoritePokemon(pokemonName);
        this.alertMessage = `${pokemonName} has been successfully deleted to your favorites !`
      },
    }
  }
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
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
