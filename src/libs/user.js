const storeKey = 'loginUser';

export function setUser (user) {
  return localStorage.setItem(storeKey, JSON.stringify(user));
}

export function getUser () {
  return JSON.parse(localStorage.getItem(storeKey));
}

export function removeUser () {
  return localStorage.removeItem(storeKey);
}