export default function(value) {
  return value.toLocaleString("ru", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) 
}
