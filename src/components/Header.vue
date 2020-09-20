<template>
<header>
  <router-link to="/">
    <img :src="require('@/assets/pokeball.png')" alt="Pokeball" />
  </router-link>
  <div id="nav-right">
    <router-link to="/home">Main</router-link>
    <router-link to="/favorite">Favorite</router-link>
  </div>
</header>
</template>

<style scoped>
header {
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  height: 80px;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  -webkit-box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 0px 40px 0px rgba(0,0,0,0.75);
}

img {
  width: 55px;
}

#nav-right a{
  margin: 10px;
}

header a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

header a.router-link-exact-active {
  color: #fe3d31;
}
</style>