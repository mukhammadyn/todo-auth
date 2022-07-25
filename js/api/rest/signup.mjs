import makeRequest from "../make-request.mjs";
import URL from "../URL.mjs";

export const signUp = (headers, body) => makeRequest(`${URL}/signup`, 'POST', headers, body)