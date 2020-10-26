import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import MessagePlugin from './utils/message.plugin'

Vue.use(Vuelidate)
Vue.use(MessagePlugin)

import 'materialize-css/dist/css/materialize.min.css'
import './assets/index.css'
import 'materialize-css/dist/js/materialize.min.js'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
