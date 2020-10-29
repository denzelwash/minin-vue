import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import errors from '@/utils/firebase-error-messages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    // loader: false
  },
  getters: {
    error: state => state.error,
    // loader: state => state.loader
  },
  mutations: {
    setError(state, error) {
      state.error = errors[error.code] ? errors[error.code] : 'Что-то пошло не так..'
    },
    clearError(state) {
      state.error = null
    },
    // enableLoader(state) {
    //   state.loader = true
    // },
    // disableLoader(state) {
    //   state.loader = false
    // }
  },
  actions: {
    async fetchCurrency({}) {
      const key = process.env.VUE_APP_FIXER
      const currency = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,RUB,EUR&format=1`)
        .then(response => response.json())
      return currency
    }
  },
  modules: {
    auth,
    info
  }
})
