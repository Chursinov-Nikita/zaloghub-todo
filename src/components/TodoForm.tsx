import { useState } from 'react'

type TodoFormProps = {
  onAdd: (text: string) => void
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [value, setValue] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (value.trim() === '') return
    onAdd(value.trim())
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Новая задача"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button disabled={value.trim() === ''} type="submit">
        Добавить задачу
      </button>
    </form>
  )
}

export default TodoForm
