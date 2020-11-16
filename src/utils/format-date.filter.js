import store from '../store/'

export default function(value, type) {
  const options = getOptions(type)
  const locale = store.getters.info.locale
  return (new Intl.DateTimeFormat(locale, options).format(value))
}

function getOptions(type) {
  switch (type) {
    case 'date':
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    default:
      return {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
  }
}
