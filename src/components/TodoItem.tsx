import { type Todo } from '../types'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

const TodoItem = ({ todo, onToggle, onRemove }: TodoItemProps) => {
  return (
    <li className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        <span>{todo.text}</span>
      </label>
      <button
        onClick={() => onRemove(todo.id)}
        type="button"
        aria-label={`Удалить "${todo.text}"`}
      >
        Удалить
      </button>
    </li>
  )
}

export default TodoItem
