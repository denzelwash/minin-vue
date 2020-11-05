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
    },
    async updateInfo({commit, getters, dispatch}, payload) {
      try {
        const info = {...getters.info, ...payload}
        console.log(info)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/info`).update(info)
        commit('setUserInfo', info)
      } catch(e) {
        commit('setError', err)
        throw err
      }
    }
  }
}
