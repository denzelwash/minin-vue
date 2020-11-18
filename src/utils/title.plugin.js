import localizeFilter from '@/utils/localize.filter'

export default {
  install(Vue) {
    Vue.prototype.$title = function(html) {
      return `${localizeFilter(html)} | ${process.env.VUE_APP_TITLE}`
    }
  }
}
