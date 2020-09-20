<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from  '@/components/Header.vue'
import Footer from  '@/components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  },
}
</script>

<style>
@import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-size: 80vw;
  background-image: url('~@/assets/background-pokeball.jpg');
}

@media screen and (min-width: 768px) {
  #app {
    background-size: 50vw;
  }
}
</style>