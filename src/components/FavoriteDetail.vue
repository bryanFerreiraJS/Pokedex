<template>
  <div class="detail-container">
    <div class="detail">
			<h2>{{ capitalize(pokemon.name) }}</h2>
      <div v-if="pokemon" class="image-container">
        <img :src="imageUrl + pokemon.id + '.png'" :alt="'Picture of ' + capitalize(pokemon.name)">
      </div>
      <div v-if="pokemon" class="data">
				<ul class="left">
					<li class="types">Types:
						<ul>
							<li class="type" 
								v-for="(value, index) in pokemon.types"
								:key="'value'+index">
								<img :src="require('../assets/types/'+ value.type.name + '.png')" :alt="capitalize(value.type.name) + ' (Type)'" :title="capitalize(value.type.name) + ' (Type)'" />
							</li>
						</ul>
					</li>
					<li class="abilities">Abilities: 
						<ul>
							<li class="ability" 
								v-for="(value, index) in pokemon.abilities"
								:key="'value'+index">
								<a :href="'https://www.smogon.com/dex/xy/abilities/' + value.ability.name" target="_blank">
                  {{ capitalize(value.ability.name) }}
                </a>
							</li>
						</ul>
					</li>
					<li class="height">Height: {{ pokemon.height / 10 }} m</li>
					<li class="weight">Weight: {{ pokemon.weight / 10 }} kg</li>
          <li class="cry">
            Cry: <i @click="playCry()" class="fas fa-volume-up"></i>
          </li>
				</ul>
				<ul class="right">
					<li class="type" 
						v-for="(value, index) in pokemon.stats"
						:key="'value'+index">
						{{ capitalize(value.stat.name) + ": " + value.base_stat }}
					</li>
				</ul>
      </div>
			<p>Description: {{ description }}</p>
			<div class="buttons-container">
				<button class="close" @click="closeFavoriteDetail">Close</button>
				<button @click="deleteFavorite(pokemon)" class="favorite">
          <i class="fas fa-heart"></i>
        </button>
			</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from 'axios'

export default {
  props: [
    'pokemon',
    'imageUrl'
  ],
  data: () => {
    return {
      description: null,
      cryAudio: null,
    }      
  },
  computed: {
    ...mapGetters({
      getFavoritePokemons: 'getFavoritePokemons',
    })
  },
  methods: {
    closeFavoriteDetail() {
      this.$emit('close-favorite-detail');
    },
    capitalize(word) {
      // Si word est égal à 'hp', on retourne 'HP', parce que je n'aimais pas afficher 'Hp'.
      if (word === 'hp') {
        return 'HP';
      }
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
      return transformedWord.substring(0,transformedWord.length - 1);
    },
    async descriptionFromY(array) {
      // Cette fonction permet de récupérer uniquement a description du pokémon provenant du jeu "Pokemon Y" en anglais.
      try {
        const responseDescription = await axios.get(this.pokemon.species.url);
        for (const element of responseDescription.data.flavor_text_entries) {
          if (element.language.name === 'en' && element.version.name === 'y') {
            this.description = element.flavor_text
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    deleteFavorite(pokemon) {
      // Je supprime l'article correspondant au pokémon passé en paramètre et je ferme la vue des détails.
      document.getElementById(pokemon.name).remove();
      this.closeFavoriteDetail();
      this.$emit('delete-favorite', pokemon.name);
    },
    addFavorite(pokemon) {
      this.$emit('add-favorite', pokemon);
    },
    playCry() {
      // Lance le fichier audio du cri du pokémon.
      this.cryAudio.play();
    }
  },
  created() {
    // On récupère la description du pokémon provenant du jeu "Pokemon Y" en anglais.
    this.descriptionFromY(this.pokemon);
    // On crée un HTMLAudioElement qui va permettre de lire le fichier audio contenant le cri du pokémon.
    this.cryAudio = new Audio(require(`@/assets/cries/${this.pokemon.id}.ogg`))
  }
}
</script>

<style scoped>
.detail-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, .7);
  font-size: 18px;
}

.detail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 85vw;
  max-width: 510px;
  background-color: white;
  color: black;
  padding: 15px;
  border-radius: 5px;
}

.image-container {
  background-color: white;
  border: 3px solid #333;
  border-radius: 15px;
}

.data {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
}

ul {
  padding-left: 0;
}

li {
  list-style-type: none;
}

.left > li, .right > li {
  margin: 20px 0;
}

.left > li {
  text-align: left;
}

.right > li {
  text-align: right;
}

.types, .abilities {
  display: flex;
}

.types ul, .abilities ul {
  margin-left: 5px;
}

.types ul {
  margin-top: 3px;
}

.abilities ul{
  margin-top: 1px
}

.abilities a {
  outline: none;
}

.abilities a:visited {
  color: #1717ef
}

p {
  width: 85%;
}

.buttons-container {
  display: flex;
  justify-content: space-between;
  width: 225px;
}

.buttons-container button {
  outline: none;
  border: none;
  width: 95px;
  border-radius: 5px;
  background-color: #333;
  color: #efefef;
  padding: 10px 20px;
  margin-bottom: 20px;
  font-size: 20px;
  cursor: pointer;
}

.fa-volume-up {
  cursor: pointer;
}

.fa-heart {
  color: red;
}

</style>