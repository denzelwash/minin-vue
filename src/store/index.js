import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import info from './info'
import errors from '@/utils/firebase-error-messages'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  getters: {
    getError: state => state.error
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

  },
  modules: {
    auth,
    info
  }
})
