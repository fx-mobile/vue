export function setItem(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function getItem(key) {
  return window.localStorage.getItem(key)
}
