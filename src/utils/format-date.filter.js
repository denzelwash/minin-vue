export default function(value, type) {
  const options = getOptions(type)
  return (new Intl.DateTimeFormat('ru-RU', options).format(value))
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
