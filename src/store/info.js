import firebase from 'firebase/app'
import errors from '@/utils/firebase-error-messages'

export default {
  state: {
    info: {}
  },
  getters: {
    info: state => state.info
  },
  mutations: {
    setUserInfo(state, info) {
      state.info = info
    },
    clearUserInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async loadUserInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`users/${uid}/info/`).once('value')).val()
        commit('setUserInfo', info)
      } catch(err) {
        commit('setError', err)
        throw err
      }
    }
  }
}
