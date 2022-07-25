export const token = JSON.parse(localStorage.getItem('token')) ?? false

export const setToken = (token) => {
  localStorage.setItem('token', JSON.stringify(token))
}

export const changeLocation = (address) => {
  if(!token) {
    location.pathname = address
  }
}