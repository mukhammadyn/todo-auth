import { token } from "./config.mjs";

export default (URL, method = "GET", headers = {}, body = false) => {

  if (headers && headers.token) {
    headers.token = token;
  }

  if (body) {
    return fetch(URL, {
      method,
      headers,
      body,
    })
  } else {
    return fetch(URL, {
      method,
      headers
    })
  }
}
