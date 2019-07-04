import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index.js'
import {
  unregister as unregisterServiceWorker
} from '@/registerServiceWorker'

Vue.config.productionTip = false

import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

import Toasted from 'vue-toasted'
Vue.use(Toasted)

import VueMask from 'v-mask'
Vue.use(VueMask)

import VueProgressBar from 'vue-progressbar'
Vue.use(VueProgressBar, {
  color: 'rgb(255, 255, 255)',
  failedColor: 'rgb(255, 255, 255)',
  height: '4px',
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
