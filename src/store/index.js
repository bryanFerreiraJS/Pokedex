import Vue from 'vue'
import Vuex from 'vuex'
import createdPersistedState from 'vuex-persistedstate'

import entity from './entity'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    entity
  },
  plugins: [createdPersistedState()]
})

export default store