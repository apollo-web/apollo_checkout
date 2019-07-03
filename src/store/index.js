import Vue from 'vue'
import Vuex from 'vuex'

import {
  state
} from '@/store/state.js'
import {
  getters
} from '@/store/getters.js'
import {
  mutations
} from '@/store/mutations.js'
import {
  actions
} from '@/store/actions.js'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // plugins: [
  //   createPersistedState(),
  // ],
  state,
  getters,
  mutations,
  actions,
})
