import firebase from 'firebase/app'

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    async login(context, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch(err) {
        throw err
      }
    }
  },
  modules: {

  }
}
