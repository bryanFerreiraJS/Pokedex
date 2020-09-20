<template>
  <div class="list">
    <article :id="pokemon.name" v-for="(pokemon, index) of pokemons"
    :key="'value' + index"
    @click.self="displayFavoriteDetail(pokemon)">
      <img @click.self="displayFavoriteDetail(pokemon)" :src="imageUrl + pokemon.id + '.png'" :alt="'Picture of ' + capitalize(pokemon.name)">
      <h2 @click.self="displayFavoriteDetail(pokemon)" >{{ capitalize(pokemon.name) }}</h2>
      <div class="favorite">
        <i @click.self="deleteFavorite(pokemon)" class="fas fa-heart" :id="pokemon.name + '-button'"></i>
      </div>
    </article>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  props: [
    'imageUrl',
    'apiUrl',
  ],
  data: () => {
    return {
      pokemons: [],
    };
  },
  computed: {
    ...mapGetters({
      getFavoritePokemons: 'getFavoritePokemons',
    }),
  },
  methods: {
    capitalize(word) {
      // Si word n'est pas une string, je retourne une chaîne vide. Ce cas de figure n'est pas censé arriver.
      if (typeof word !== 'string') {
        return '';
      }
      // Si la string représente un mot composé (par exemple "special-attack"), je crée un tableau qui comporte chaque mot isolé du trait d'union qui les lie, et je passe leur première lettre en majuscule.
      let array = word.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));
      let transformedWord  = '';
      // Je concatène les mots dans une variable, en les séparant par un espace.
      for (const element of array) {
        transformedWord += element;
        transformedWord += ' ';
      }
      // Je retourne cette variable, en prenant soin de supprimer le dernier espace.
      return transformedWord.substring(0, transformedWord.length - 1);
    },
    deleteFavorite(pokemon) {
      // Je supprime l'article correspondant au pokémon passé en paramètre.
      document.getElementById(pokemon.name).remove();
      this.$emit('delete-favorite', pokemon.name);
    },
    displayFavoriteDetail(pokemon) {
      this.$emit('display-favorite-detail', pokemon);
    },
  },
  created() {
    // On récupère les pokémons du state pour les ajouter à this.pokemons.
    this.pokemons = this.getFavoritePokemons;
  },
}
</script>

<style scoped>
.list {
	display: flex;
  flex-wrap: wrap;
  justify-content: center;
	width: 100%;
	max-width: 645px;
}

.list article {
  width: 165px;
	height: 165px;
  margin: 25px;
	background-color: #efefef;
	text-align: center;
	border-radius: 5px;
	cursor: pointer;
	box-shadow: 0 10px 10px rgba(0, 0, 0, .2);
}

.list img {
  width: 96px;
  height: 96px;
  padding-top: 10px;
}

.list h2 {
	margin: 0;
  font-size: 16px;
}

.favorite {
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
}

.fas {
  font-size: 24px;
  color: black;
}

.fa-heart {
  color: red;
}

#infinite-scroll-trigger {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 150px;
	font-size: 2rem;
  color: #efefef;
}
 
</style>