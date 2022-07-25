import makeRequest from "../make-request.mjs";
import URL from "../URL.mjs";

export const getTodos = (headers) => makeRequest(`${URL}/todos`, 'GET', headers)
export const makeTodo = (headers, body) => makeRequest(`${URL}/todos`, 'POST', headers, body)
export const changeTodo = (headers, id) => makeRequest(`${URL}/todos/${id}`, 'PUT', headers)
export const removeTodo = (headers, id) => makeRequest(`${URL}/todos/${id}`, 'DELETE', headers)