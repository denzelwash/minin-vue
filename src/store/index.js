import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import category from './category'
import record from './record'
import errors from '@/utils/firebase-error-messages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    error: state => state.error
  },
  mutations: {
    setError(state, error) {
      state.error = errors[error.code] ? errors[error.code] : 'Что-то пошло не так..'
    },
    clearError(state) {
      state.error = null
    }
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
    info,
    category,
    record
  }
})
