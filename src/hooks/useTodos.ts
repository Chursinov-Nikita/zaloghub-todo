import { useEffect, useState } from 'react'
import { type Todo } from '../types'

const storageKey = 'todos'

function loadTodosFromLocalStorage(): Todo[] {
  try {
    const saved = localStorage.getItem(storageKey)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromLocalStorage)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(todos))
  }, [todos])

  function addTodo(text: string) {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTodos((prev) => [...prev, newTodo])
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  return {
    todos,
    addTodo,
    removeTodo,
    toggleTodo,
  }
}
