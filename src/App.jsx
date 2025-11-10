import React, { useEffect, useState } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

const App = () => {
  const [tasks, setTasks] = useState([]);
  
  // Load tasks from local storage once
useEffect(() => {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    try {
      setTasks(JSON.parse(savedTasks));
    } catch (e) {
      console.error("Error parsing tasks from localStorage:", e);
    }
  }
}, []);

// Save tasks whenever they change
useEffect(() => {
  if (tasks.length >= 0) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks]);


  //Add tasks to the state
  const addTasks = (task) => {
    if (!task.trim()) return
    const newTask = {
      id: Date.now(),
      taskText: task,
      completed: false,
    }
    setTasks([newTask, ...tasks])
  }

  const removeTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  const handleReset = () => {
    setTasks([]);
    localStorage.clear();
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => (task.id === id ? {...task, completed: !task.completed} : task)))
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center min-h-screen bg-gray-50 p-4">
      <section>
        <TodoInput addTasks={addTasks} />
      </section>
      <section className="w-full max-w-md bg-white min-h-40 rounded flex flex-col justify-center items-center px-6 py-4 shadow">

        {tasks.length === 0 ? (
          <i>No tasks yet</i>
        ) : (
          <TodoList tasks={tasks} handleRemoveTask={removeTask} toggleComplete={toggleComplete} />
        )}
        {tasks.length > 0 ? 
        <button 
          onClick={handleReset} 
          className='bg-red-400 
          text-white 
            h-fit 
            px-4 py-2 
            m-4
            hover:cursor-pointer 
            hover:bg-blue-500 
            transition-all 
            active:scale-90 ' >Reset</button> : ''}
      </section>
    </div>
  )
}

export default App
