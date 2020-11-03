import firebase from 'firebase/app'
import errors from '@/utils/firebase-error-messages'

export default {
  actions: {
    async addCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        const category = firebase.database().ref(`users/${uid}/categories`).push({
          title,
          limit
        })
        return {title, limit, id: category.key}
      } catch(e) {
        commit('setError', err)
        throw err
      }
    },
    async getCategories({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val()
        return categories ?
          Object.keys(categories).map((key) => ({...categories[key], id: key})) :
          []
      } catch(e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`users/${uid}/categories/${id}`).update({
          title,
          limit
        })
      } catch(e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
