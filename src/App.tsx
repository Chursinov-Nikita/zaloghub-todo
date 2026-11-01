import { useState } from 'react'
import { useTodos } from './hooks/useTodos'
import { type Filter } from './types'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

const FILTERS: Filter[] = ['all', 'active', 'completed']
const FILTER_TEXT: Record<Filter, string> = {
  all: 'Все',
  active: 'Активные',
  completed: 'Выполненные',
}

function App() {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos()
  const [filter, setFilter] = useState<Filter>('all')

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  return (
    <>
      <h1>Список задач от @nikita_chursinov</h1>

      <TodoForm onAdd={addTodo} />

      <div className="filters">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={filter === item ? 'filter filter--active' : 'filter'}
          >
            {FILTER_TEXT[item]}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
          />
        ))}
      </ul>

      {todos.length === 0 && <p>Список задач пуст</p>}
      {visibleTodos.length === 0 && todos.length > 0 && (
        <p>В этом фильтре нет задач</p>
      )}
    </>
  )
}

export default App
