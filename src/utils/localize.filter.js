import store from '../store/'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'

const locales = {
  'ru-RU': ru,
  'en-US': en
}

export default function(key) {
  let locale = store.getters.info.locale || 'ru-RU'
  return locales[locale][key] || `Localize error: key ${key} not found`
}

