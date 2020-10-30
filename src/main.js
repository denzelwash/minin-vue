import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import MessagePlugin from './utils/message.plugin'
import currencyFilter from './utils/currency.filter'
import formatDate from './utils/format-date.filter'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(Vuelidate)
Vue.use(MessagePlugin)
Vue.filter('currencyFilter', currencyFilter)
Vue.filter('formatDate', formatDate)

import 'materialize-css/dist/css/materialize.min.css'
import './assets/index.css'
import 'materialize-css/dist/js/materialize.min.js'


Vue.config.productionTip = false

firebase.initializeApp({
  apiKey: "AIzaSyC2BhmEseswfr-aoP6L4j2A5AoxGVPXoqo",
  authDomain: "denzel-firebase.firebaseapp.com",
  databaseURL: "https://denzel-firebase.firebaseio.com",
  projectId: "denzel-firebase",
  storageBucket: "denzel-firebase.appspot.com",
  messagingSenderId: "103182615361",
  appId: "1:103182615361:web:b848c781c65b6d13c657c0"
});

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
});
