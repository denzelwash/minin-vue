import firebase from 'firebase/app'
import errors from '@/utils/firebase-error-messages'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async login({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(err) {
        commit('setError', err, { root: true })
        throw err
      }
    },
    async register({commit, dispatch}, {email, password, name}) {
      try {
        const data = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        firebase.database().ref(`users/${uid}/info`).set({
          name,
          bill: 10000
        })
      } catch(err) {
        commit('setError', err, { root: true })
        throw err
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout(context) {
      await firebase.auth().signOut()
    }
  }
}
