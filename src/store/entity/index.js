import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import init from './init'

export default {
  state: init(),
  mutations,
  actions,
  getters
}
