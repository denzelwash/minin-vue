import store from '../store/'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'
console.log(en)
const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function(key) {
  console.log(store.getters.info.locale)
  let locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `Localize error: key ${key} not found`
}

