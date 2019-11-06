export function setItem(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data))
}

export function getItem(key) {
  return JSON.parse(window.localStorage.getItem(key))
}

export function removeItem(key){
  window.localStorage.removeItem(key)
}