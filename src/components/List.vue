<template>
  <div class="list">
    <article :id="pokemon.name" v-for="(pokemon, index) of pokemons"
    :key="'value' + index"
    @click.self="setPokemonUrl(pokemon.url)">
      <img @click.self="setPokemonUrl(pokemon.url)" :src="imageUrl + pokemon.id + '.png'" :alt="'Picture of ' + capitalize(pokemon.name)">
      <h2 @click.self="setPokemonUrl(pokemon.url)" >{{ capitalize(pokemon.name) }}</h2>
      <div class="favorite">
        <i @click.self="addOrDeleteFavorite(pokemon, $event)" :class="isNotAFavorite(pokemon.name)" :id="pokemon.name + '-button'"></i>
      </div>
    </article>
    <div id="infinite-scroll-trigger" ref="infinitescrolltrigger">
      <i class="fas fa-spinner fa-pulse"></i>
    </div>
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
      nextUrl: '',
      currentUrl: '',
    };
  },
  computed: {
    ...mapGetters({
      getFavoritePokemons: 'getFavoritePokemons',
    })
  },
  methods: {
    async requestData() {
      try {
        const response = await axios.get(this.currentUrl);
        // Si l'URL est "l'URL limite", on supprime this.nextUrl, sinon on actualise la valeur.
        if (this.currentUrl === `${this.apiUrl}?offset=700&limit=21`) {
          this.nextUrl = '';
        } else {
          this.nextUrl = response.data.next;
        }
        // On stocke l'ID du pokemon dans le retour en l'isolant du lien grâce à une série de fonctions, et on ajoute le pokémon au tableau this.pokemons.
        response.data.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/').filter(item => item !== '').pop();
          this.pokemons.push(pokemon);
        });
      } catch (error) {
        console.log(error);
      };
    },
    scrollTrigger() {
      // Si le loader est visible à 60%, on lance une nouvelle requête, jusqu'à atteindre "l'URL limite", auquel cas le loader laisse place au message "FINISHED !"
      const observer = new IntersectionObserver((observables) => {
        observables.forEach((observable) => {
          if(observable.intersectionRatio > 0.6 && this.nextUrl) {
            this.nextPage();
          } else if (observable.intersectionRatio > 0.6 && this.currentUrl === `${this.apiUrl}?offset=700&limit=21`) {
            this.$refs.infinitescrolltrigger.innerHTML = '<p>FINISHED !</p>';
          }
        });
      }, {
        threshold: [0.6]
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    },
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
    nextPage() {
      // Comportement particulier pour un url particulier, pour récupérer le dernier pokémon de la sixième génération.
      // On actualise la valeur de this.currentUrl et on lance la requête.
      if (this.nextUrl === `${this.apiUrl}?offset=700&limit=20`) {
        this.currentUrl = `${this.apiUrl}?offset=700&limit=21`;
      } else  {
        this.currentUrl = this.nextUrl;
      }
      this.requestData();
    },
    isNotAFavorite(name) {
      // Si le pokémon est en favori, on affiche un coeur plein rouge, un coeur noir brisé sinon.
      for (const favoritePokemon of this.getFavoritePokemons) {
        if (name === favoritePokemon.name) {
          return 'fas fa-heart';
        }
      }
      return 'fas fa-heart-broken';
    },
    setPokemonUrl(url) {
      this.$emit('set-pokemon-url', url);
    },
    addOrDeleteFavorite(pokemon, event) {
      // Si le bouton était un coeur brisé, il devient un coeur plein rouge et on ajoute le pokémon des favoris.
      // Si le bouton était un coeur plein rouge, il devient un coeur brisé noir et on supprime le pokémon des favoris.
      if (event.target.className === "fas fa-heart-broken") {
        event.target.classList.remove("fa-heart-broken");
        event.target.classList.add("fa-heart");
        this.$emit('add-favorite', pokemon.url);
      } else if (event.target.className === "fas fa-heart") {
        event.target.classList.remove("fa-heart");
        event.target.classList.add("fa-heart-broken");
        this.$emit('delete-favorite', pokemon.name);
      }
    },
  },
  created() {
    this.currentUrl = this.apiUrl;
    this.requestData();
  },
  mounted() {
    this.scrollTrigger();
  }
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
  color: black;
}

.favorite {
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
}

.favorite .fas {
  font-size: 24px;
}

.favorite .fa-heart {
  color: red;
}

.favorite .fa-heart-broken {
  color: black;
}

#infinite-scroll-trigger {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 150px;
	font-size: 32px;
  color: white;
}
 
</style>