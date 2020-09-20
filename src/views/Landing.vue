<template>
  <div class="landing">
    <div class="container">
      <h1>Welcome to my Pokemon Project !</h1>
      <p>This website shows pokemons from the first to the sixth generation !</p>
      <p>You can click on a pokemon to display his information, as well as add it to your favorites !</p> 
      <p>Just click on the favorite button to keep a personal record of your favorite pokemon, enjoy ! &lt;3</p>
    </div>
  </div>
</template>

<style scoped>
.landing {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 90vw;
  margin: auto;
  height: calc(100vh - 120px); /* Pour ferrer le footer au pied de page */
}

.container {
  display: flex;
  align-items: center;
  flex-direction: column;
  color: black;
  padding: 10px;
  border: 3px solid black;
  border-radius: 5px;
  background-color: white;
  margin: 0 10px;
}

h1 {
  margin: 20px 0 30px 0;
}
</style>