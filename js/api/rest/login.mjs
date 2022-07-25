import makeRequest from "../make-request.mjs";
import URL from "../URL.mjs";

export const signIn = (headers, body) => makeRequest(`${URL}/login`, 'POST', headers, body)