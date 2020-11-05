import firebase from 'firebase/app'
import errors from '@/utils/firebase-error-messages'
export default {
  actions: {
    async addRecord({dispatch, commit}, payload) {
      try {
        const uid = await dispatch('getUid')
        const newRecord = await firebase.database().ref(`users/${uid}/records`).push(payload)
      } catch(e) {
        commit('setError', err)
        throw err
      }
    }
  }
}
