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
    async getCategories({dispatch}) {
      const uid = await dispatch('getUid')
      const categories = (await firebase.database().ref(`users/${uid}/categories`).once('value')).val()
      return Object.keys(categories).map((key) => ({...categories[key], id: key}))
    }
  }
}
