import { changeLocation } from "./api/config.mjs";
import { changeTodo, getTodos, makeTodo, removeTodo } from "./api/rest/todos.mjs";

changeLocation('auth.html')

const todoList = JSON.parse(localStorage.getItem('todos')) || []

const elTodoTemp = document.querySelector("#todo-temp").content;
const elTodoList = document.querySelector(".todo__list");

const elMakeTodo = document.querySelector(".add-todo");
const elMakeTodoText = document.querySelector(".add-todo__input");
const elMakeTodoBtn = document.querySelector(".add-todo__btn");

const renderTodos = (todos) => {
  elTodoList.innerHTML = null
  
  const todoFragment = document.createDocumentFragment()

  todos.forEach(todo => {
    const todoTemp = elTodoTemp.cloneNode(true)

    todoTemp.querySelector('.todo__checkbox').dataset.id = todo.id
    todoTemp.querySelector('.todo__checkbox').checked = todo.is_checked
    todoTemp.querySelector('.todo__text').textContent = todo.body
    todoTemp.querySelector('.todo__btn').dataset.id = todo.id

    todoFragment.append(todoTemp)
  })

  elTodoList.append(todoFragment)
}

(async () => {
  try {
    const headers = { 'token': true };
    const res = await getTodos(headers);
    if(res.ok) {
      const data = await res.json();
      localStorage.setItem('todos', JSON.stringify(data))
      renderTodos(data);
    }
  } catch(error) {
    throw new Error(error.message)
  }
})()

elMakeTodo.addEventListener('submit', async(e) => {
  e.preventDefault()

  elMakeTodoBtn.disabled = true
  
  const newTodo = elMakeTodoText.value
  if(newTodo.trim()) {

    try {
      const headers = {
        'Content-type': 'application/json',
        'token': true
      }
      
      const body = JSON.stringify({text: newTodo})
      const res = await makeTodo(headers, body)

      if(res.ok) {
        const {body, is_checked, id} = await res.json()

        const todo = {
          body,
          is_checked,
          id
        }

        todoList.push(todo)
        renderTodos(todoList)
        localStorage.setItem('todos', JSON.stringify(todoList))
      }

      elMakeTodoText.value = ''
    }
    catch(error) {
      throw new Error(error.message)
    }
    finally {
      elMakeTodoBtn.disabled = false
    }
  }
})

elTodoList.addEventListener('change', async(e) => {
  const todo = e.target
  const todoId = todo.dataset.id

  try {
    const headers = {
      'Content-type': 'application/json',
      'token': true
    }
    const res = await changeTodo(headers, todoId)

    if(res.ok) {

      const data = await res.json()
    
      const currentTodo = todoList.findIndex(todo => todo.id === data.id)

      todoList.splice(currentTodo, 1, data)
      localStorage.setItem('todos', JSON.stringify(todoList))
    }
  }
  catch(error) {
    todo.checked = !todo.checked
    throw new Error(error.message)
  }

})

elTodoList.addEventListener('click', async(e) => {
  
  if(e.target.matches('.todo__btn')) {
    const todoBtn = e.target
    const todoId = todoBtn.dataset.id


    try {
      const headers = {
        'token': true
      }
      const res = await removeTodo(headers, todoId)

      if(res.ok) {
        const currentTodo = todoList.findIndex(todo => todo.id === +todoId)
        todoList.splice(currentTodo, 1)
        localStorage.setItem('todos', JSON.stringify(todoList))
        renderTodos(todoList)
      }
    }
    catch(error) {
      todo.checked = !todo.checked
      throw new Error(error.message)
    }

  }

})
