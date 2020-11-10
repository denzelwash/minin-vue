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
    },
    async getRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`users/${uid}/records`).once('value')).val()
        return records ?
          Object.keys(records).map((key) => ({...records[key], id: key})) :
          []
      } catch(e) {
        commit('setError', err)
        throw err
      }
    },
    async getRecord({dispatch, commit}, payload) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`users/${uid}/records/${payload}`).once('value')).val()
        return record
      } catch(e) {
        commit('setError', err)
        throw err
      }
    }
  }
}
