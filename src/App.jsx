import React, { useState } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const App = () => {
  const [tasks, setTasks] = useState([])

  const addTasks = (task) => {
    if (!task.trim()) return
    const newTask = {
      id: Date.now(),
      taskText: task,
      completed: false,
    }
    setTasks([...tasks, newTask])
  }

  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id == id ? {...task, completed: !task.completed} : task)))
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-screen bg-gray-50 p-4">
      <section>
        <TodoInput addTasks={addTasks} />
      </section>
      <section className="w-full md:w-1/2 bg-white min-h-40 rounded flex flex-col justify-center items-center px-6 py-4 shadow">
        {tasks.length === 0 ? (
          <i>No tasks yet</i>
        ) : (
          <TodoList tasks={tasks} handleRemoveTask={removeTask} toggleComplete={toggleComplete} />
        )}
      </section>
    </div>
  )
}

export default App
