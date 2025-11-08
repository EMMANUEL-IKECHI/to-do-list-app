import React from 'react'
import TodoItem from './TodoItem'

const TodoList = ({ tasks, handleRemoveTask, toggleComplete }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} handleRemoveTask={handleRemoveTask} toggleComplete={toggleComplete} />
      ))}
    </div>
  )
}

export default TodoList
