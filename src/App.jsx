import { useEffect, useState } from 'react'
import * as api from './services'

export default function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  // 获取 Todo 列表
  useEffect(() => {
    api.getGist().then(todos => {
      setTodos(todos)
    })
  }, [])

  // 添加 Todo
  const addTodo = () => {
    if (!newTodo.trim()) return
    const updatedTodos = [...todos, { name: newTodo.trim() }]
    api.updateGist(updatedTodos).then(todos => setTodos(todos))
    setNewTodo('')
  }

  // 删除 Todo
  const deleteTodo = index => {
    const updatedTodos = todos.filter((_, i) => i !== index)
    api.updateGist(updatedTodos).then(todos => setTodos(todos))
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">GitHub Gist Todo List</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="flex-1 p-2 border rounded-l"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="添加新的任务"
        />
        <button onClick={addTodo} className="p-2 bg-blue-500 text-white rounded-r">
          添加
        </button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            {todo.name}
            <button onClick={() => deleteTodo(index)} className="text-red-500 hover:underline">
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
