// src/utils/api.js
const BASE_URL = 'https://jsonplaceholder.typicode.com/todos'

async function request(url, options = {}) {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
  return response.json()
}

// Fetch limited todos
export const getTodos = (limit = 10) =>
  request(`${BASE_URL}?_limit=${limit}`)

// Create new todo (make sure the param name is "todo")
export const createTodo = (todo) =>
  request(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  })

// Update existing todo (param names: id, updates)
export const updateTodo = (id, updates) =>
  request(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })

// Delete todo
export const deleteTodo = (id) =>
  request(`${BASE_URL}/${id}`, { method: 'DELETE' })
