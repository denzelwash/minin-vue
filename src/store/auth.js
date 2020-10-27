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
        console.log(err.code)
        throw err
      }
    },
    async register({dispatch}, {email, password, name}) {
      try {
        const data = await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        firebase.database().ref(`users/${uid}/info`).set({
          name,
          bill: 10000
        })
      } catch(err) {
        console.log(err)
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
