import firebase from 'firebase/app'
import errors from '@/utils/firebase-error-messages'

export default {
  actions: {
    async addCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUid')
        // const info = getters.info
        // console.log(uid, info)
        const category = firebase.database().ref(`users/${uid}/categories`).push({
          title,
          limit
        })
        return {title, limit, id: category.key}
      } catch(e) {
        commit('setError', err)
        throw err
      }
    }
  }
}
